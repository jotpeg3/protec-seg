/**
 * PROTECT SEG — Client Tab Layout
 */

import React from 'react';
import { Tabs } from 'expo-router';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Colors, LightTheme, Spacing, Shadow } from '../../src/theme';
import { Ionicons } from '@expo/vector-icons';

function TabIcon({ iconName, label, focused }: { iconName: keyof typeof Ionicons.glyphMap; label: string; focused: boolean }) {
    return (
        <View style={styles.tabItem}>
            <Ionicons
                name={iconName}
                size={24}
                color={focused ? Colors.navy[500] : '#1F2937'}
                style={styles.tabIcon}
            />
            <Text style={[styles.tabLabel, focused && styles.tabLabelActive]} numberOfLines={1}>
                {label}
            </Text>
        </View>
    );
}

export default function ClientLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: styles.tabBar,
                tabBarShowLabel: false,
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabIcon iconName={focused ? "home" : "home-outline"} label="Inicio" focused={focused} />
                    ),
                }}
            />
            <Tabs.Screen
                name="tickets"
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabIcon iconName={focused ? "document-text" : "document-text-outline"} label="Historico" focused={focused} />
                    ),
                }}
            />
            {/* SOS Screen hidden from tab bar */}
            <Tabs.Screen
                name="sos"
                options={{
                    href: null,
                }}
            />
            <Tabs.Screen
                name="payments"
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabIcon iconName={focused ? "wallet" : "wallet-outline"} label="Faturas" focused={focused} />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabIcon iconName={focused ? "person" : "person-outline"} label="Perfil" focused={focused} />
                    ),
                }}
            />
        </Tabs>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#F3F4F6',
        height: Platform.OS === 'ios' ? 88 : 68,
        paddingTop: Spacing.sm,
        paddingBottom: Platform.OS === 'ios' ? Spacing.xl : Spacing.sm,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 10,
    },
    tabItem: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 2,
        minWidth: 56,
    },
    tabIcon: {
        marginBottom: 2,
    },
    tabLabel: {
        fontSize: 11,
        color: '#1F2937',
        marginTop: 2,
        fontWeight: '500',
    },
    tabLabelActive: {
        color: Colors.navy[500],
        fontWeight: '600',
    },
});
