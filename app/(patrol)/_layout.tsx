/**
 * PROTECT SEG — Patrol Tab Layout
 */

import React from 'react';
import { Tabs } from 'expo-router';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Colors, LightTheme, Spacing, Shadow } from '../../src/theme';

function TabIcon({ icon, label, focused }: { icon: string; label: string; focused: boolean }) {
    return (
        <View style={[styles.tabItem, focused && styles.tabItemActive]}>
            <Text style={[styles.tabIcon, focused && styles.tabIconActive]}>{icon}</Text>
            <Text style={[styles.tabLabel, focused && styles.tabLabelActive]} numberOfLines={1}>
                {label}
            </Text>
            {focused && <View style={styles.tabDot} />}
        </View>
    );
}

export default function PatrolLayout() {
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
                        <TabIcon icon="📋" label="Chamados" focused={focused} />
                    ),
                }}
            />
            <Tabs.Screen
                name="active"
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabIcon icon="🎯" label="Ativo" focused={focused} />
                    ),
                }}
            />
            <Tabs.Screen
                name="history"
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabIcon icon="📊" label="Histórico" focused={focused} />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabIcon icon="👤" label="Perfil" focused={focused} />
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
        borderTopColor: '#E5E7EB',
        height: Platform.OS === 'ios' ? 88 : 68,
        paddingTop: Spacing.sm,
        paddingBottom: Platform.OS === 'ios' ? Spacing.xl : Spacing.sm,
        ...Shadow.lg,
    },
    tabItem: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 2,
        minWidth: 56,
    },
    tabItemActive: {},
    tabIcon: { fontSize: 22, opacity: 0.8 },
    tabIconActive: { opacity: 1 },
    tabLabel: {
        fontSize: 10,
        color: '#1F2937',
        marginTop: 2,
        fontWeight: '500',
    },
    tabLabelActive: { color: Colors.navy[600], fontWeight: '700' },
    tabDot: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: Colors.navy[500],
        marginTop: 3,
    },
});
