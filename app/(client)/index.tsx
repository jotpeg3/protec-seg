/**
 * PROTECT SEG — Client Dashboard (Home) - Redesigned Light Theme
 */

import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import {
    Animated,
    Dimensions,
    Image,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { Colors, Spacing } from '../../src/theme';

const { width, height } = Dimensions.get('window');

// Top header background percentage
const HEADER_HEIGHT = height * 0.28;

export default function ClientDashboard() {
    const pulseAnim1 = useRef(new Animated.Value(1)).current;
    const pulseAnim2 = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        // SOS rings slow pulse animation
        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim1, { toValue: 1.25, duration: 2000, useNativeDriver: true }),
                Animated.timing(pulseAnim1, { toValue: 1, duration: 2000, useNativeDriver: true }),
            ])
        ).start();

        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim2, { toValue: 1.5, duration: 2500, useNativeDriver: true }),
                Animated.timing(pulseAnim2, { toValue: 1, duration: 2500, useNativeDriver: true }),
            ])
        ).start();
    }, []);

    const recentTickets = [
        { id: '1', title: 'Intruso Detectado', subtitle: 'Em Andamento • ETA 3 min', icon: 'shield-alert', iconColor: Colors.danger[500], isDanger: true },
        { id: '2', title: 'Roubo Relatado', subtitle: 'Resolvido • 13/01/22', icon: 'shield-check', iconColor: Colors.emerald[500], isDanger: false },
    ];

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />

            {/* Absolute White Background for the Header */}
            <View style={styles.headerBackground} />

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Header Top Bar */}
                <View style={styles.headerBar}>
                    <View style={styles.headerCenter}>
                        <View style={styles.brandShieldContainer}>
                            <Image
                                source={require('../../assets/images/logo.png')}
                                style={{ height: 60, width: 60 }}
                                resizeMode="contain"
                            />
                        </View>
                        <Text style={styles.brandName}>PROTECT SEG</Text>
                    </View>
                    <View style={styles.headerRight}>
                        <TouchableOpacity style={styles.avatarContainer}>
                            <Text style={styles.avatarText}>J</Text>
                            {/* In a real app, replace with <Image> */}
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Greeting */}
                <Text style={styles.greetingText}>
                    Olá, <Text style={styles.greetingBold}>João.</Text>
                </Text>

                {/* Status Overlapping Card */}
                <View style={styles.statusCard}>
                    <View style={styles.statusTopRow}>
                        <View style={styles.statusIconHouseBg}>
                            <Ionicons name="home" size={18} color="#0A1C43" />
                        </View>
                        <Text style={styles.statusTextLabel}>Status:</Text>
                        <Text style={styles.statusTextValue}>Seguro</Text>
                        <View style={styles.statusCheck}>
                            <Ionicons name="checkmark-circle" size={24} color="#22C55E" />
                        </View>
                        <View style={{ flex: 1 }} />
                        <TouchableOpacity style={styles.questionButton}>
                            <Ionicons name="help" size={18} color="#FFFFFF" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.statusDivider} />
                    <View style={styles.statusBottomRow}>
                        <Ionicons name="home" size={20} color="#FFFFFF" style={{ marginRight: 12 }} />
                        <Text style={styles.statusLocation}>Loja Paulista, PE</Text>
                        <View style={{ flex: 1 }} />
                        <Ionicons name="chevron-down" size={20} color="#FFFFFF" />
                    </View>
                </View>

                {/* Main SOS Button Area */}
                <View style={styles.sosContainer}>
                    {/* Pulsing Rings */}
                    <Animated.View style={[styles.sosRing, styles.sosRingOuter, { transform: [{ scale: pulseAnim2 }] }]} />
                    <Animated.View style={[styles.sosRing, styles.sosRingInner, { transform: [{ scale: pulseAnim1 }] }]} />

                    {/* The Button */}
                    <TouchableOpacity
                        style={styles.sosButton}
                        activeOpacity={0.8}
                        onPress={() => router.push('/(client)/sos')}
                    >
                        {/* Fake 3D inner shadow effect with pseudo views */}
                        <View style={styles.sosButtonInner}>
                            <Text style={styles.sosMainText}>SOS</Text>
                            <Text style={styles.sosSubText}>APERTE EMERGÊNCIA</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                {/* Quick Actions Menu (Horizontal layout as seen in mock) */}
                <View style={styles.quickActionsCard}>
                    {[
                        { icon: 'document-text', label: 'Abrir Chamado', action: () => router.push('/(client)/tickets') },
                        { icon: 'add-circle', label: 'Chamados', action: () => router.push('/(client)/tickets') },
                        { icon: 'wallet', label: 'Pagamentos', action: () => router.push('/(client)/payments') },
                        { icon: 'location', label: 'Localizar', action: () => { }, isGreen: true },
                    ].map((item, idx) => (
                        <TouchableOpacity key={idx} style={styles.actionItem} onPress={item.action}>
                            <View style={[styles.actionIconBox, item.isGreen && styles.actionIconBoxGreen]}>
                                <Ionicons
                                    name={item.icon as any}
                                    size={24}
                                    color={Colors.white}
                                />
                            </View>
                            <Text style={styles.actionLabel}>{item.label}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Recent Tickets List */}
                <View style={styles.recentSection}>
                    <Text style={styles.recentTitle}>Chamados Recentes</Text>

                    {recentTickets.map((ticket, idx) => (
                        <TouchableOpacity key={ticket.id} style={styles.ticketCard} activeOpacity={0.7}>
                            <View style={styles.ticketIconContainer}>
                                <View style={[styles.ticketBadge, ticket.isDanger ? styles.ticketBadgeDanger : styles.ticketBadgeSuccess]}>
                                    <Ionicons
                                        name={ticket.isDanger ? "alert-outline" : "shield-checkmark-outline"}
                                        size={20}
                                        color={ticket.isDanger ? Colors.white : Colors.white}
                                    />
                                </View>
                            </View>
                            <View style={styles.ticketInfo}>
                                <Text style={styles.ticketItemTitle}>{ticket.title}</Text>
                                <Text style={styles.ticketItemSub}>{ticket.subtitle}</Text>
                            </View>
                            <View style={styles.ticketArrow}>
                                <Ionicons name="chevron-forward" size={24} color={Colors.neutral[400]} />
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Bottom Padding for scroll area */}
                <View style={{ height: 40 }} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F8FA', // Very light grey/off-white background matching design
    },
    headerBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 250, // Longer header
        backgroundColor: '#FFFFFF', // White header
        borderBottomLeftRadius: 40, // Curved bottom
        borderBottomRightRadius: 40, // Curved bottom
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 5,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: Spacing.xl,
    },
    headerBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: Spacing.xl,
        paddingTop: Platform.OS === 'ios' ? 60 : StatusBar.currentHeight ? StatusBar.currentHeight + 10 : 40,
        paddingBottom: Spacing.md,
        zIndex: 10,
    },
    headerCenter: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    brandShieldContainer: {
        marginRight: 0,
    },
    brandName: {
        color: '#0A1C43',
        fontSize: 16,
        fontWeight: '900',
        letterSpacing: 1,
    },
    headerRight: {
        position: 'absolute',
        right: Spacing.xl,
        top: Platform.OS === 'ios' ? 60 : StatusBar.currentHeight ? StatusBar.currentHeight + 10 : 40,
        zIndex: 11,
    },
    avatarContainer: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: Colors.navy[400],
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#1E3A8A',
    },
    avatarText: {
        color: Colors.white,
        fontWeight: 'bold',
        fontSize: 16,
    },
    greetingText: {
        paddingHorizontal: Spacing.xl,
        color: '#0A1C43',
        fontSize: 22,
        marginTop: 10,
        marginBottom: 24,
    },
    greetingBold: {
        fontWeight: 'bold',
    },

    // Status Card
    statusCard: {
        backgroundColor: '#0A1C43', // Back to Navy Blue
        marginHorizontal: Spacing.xl,
        borderRadius: 20, // Rounded
        padding: Spacing.lg,
        shadowColor: '#0A1C43',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 8,
        borderWidth: 0,
        zIndex: 10,
    },
    statusTopRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statusIconHouseBg: {
        backgroundColor: '#22C55E',
        width: 36,
        height: 36,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    statusTextLabel: {
        fontSize: 18,
        color: '#FFFFFF',
        fontWeight: 'bold',
        marginRight: 4,
    },
    statusTextValue: {
        fontSize: 18,
        color: '#FFF0E6',
        fontWeight: '600',
    },
    statusCheck: {
        marginLeft: 6,
        marginTop: 2,
    },
    questionButton: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: '#22C55E',
        alignItems: 'center',
        justifyContent: 'center',
    },
    statusDivider: {
        height: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        marginVertical: 12,
    },
    statusBottomRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 4,
    },
    statusLocation: {
        fontSize: 14,
        color: '#FFFFFF',
        fontWeight: '500',
    },

    // SOS Area
    sosContainer: {
        height: 280,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
    },
    sosRing: {
        position: 'absolute',
        borderRadius: 999,
        backgroundColor: 'rgba(239, 68, 68, 0.15)',
    },
    sosRingOuter: {
        width: 260,
        height: 260,
        backgroundColor: 'rgba(239, 68, 68, 0.08)',
    },
    sosRingInner: {
        width: 200,
        height: 200,
        backgroundColor: 'rgba(239, 68, 68, 0.15)',
    },
    sosButton: {
        width: 160,
        height: 160,
        borderRadius: 80,
        backgroundColor: '#E53E3E',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#DC2626',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 15,
        elevation: 12,
        borderWidth: 4,
        borderColor: '#FC8181', // Lighter red outer border like specular highlight
    },
    sosButtonInner: {
        width: '100%',
        height: '100%',
        borderRadius: 80,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#EF4444',
    },
    sosMainText: {
        color: Colors.white,
        fontSize: 48,
        fontWeight: '900',
        letterSpacing: 2,
        textShadowColor: 'rgba(0,0,0,0.15)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
    },
    sosSubText: {
        color: Colors.white,
        fontSize: 10,
        fontWeight: '700',
        marginTop: 4,
        opacity: 0.9,
    },

    // Quick Actions
    quickActionsCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: Colors.white,
        marginHorizontal: Spacing.xl,
        borderRadius: 24,
        paddingVertical: 18,
        paddingHorizontal: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 5,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        marginBottom: Spacing.xl,
    },
    actionItem: {
        flex: 1,
        alignItems: 'center',
    },
    actionIconBox: {
        width: 48,
        height: 48,
        borderRadius: 14,
        backgroundColor: '#1E3A8A', // Dark blue
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
    },
    actionIconBoxGreen: {
        backgroundColor: Colors.emerald[500],
    },
    actionLabel: {
        fontSize: 11,
        color: '#1F2937',
        fontWeight: '700',
        textAlign: 'center',
    },

    // Recent Tickets
    recentSection: {
        paddingHorizontal: Spacing.xl,
    },
    recentTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: '#1E3A8A', // Deep blue matched to brand
        marginBottom: Spacing.md,
    },
    ticketCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.white,
        borderRadius: 20,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.06,
        shadowRadius: 6,
        elevation: 4,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    ticketIconContainer: {
        marginRight: 16,
    },
    ticketBadge: {
        width: 44,
        height: 44,
        borderRadius: 22,
        alignItems: 'center',
        justifyContent: 'center',
    },
    ticketBadgeDanger: {
        backgroundColor: '#EF4444',
    },
    ticketBadgeSuccess: {
        backgroundColor: Colors.emerald[500],
    },
    ticketInfo: {
        flex: 1,
    },
    ticketItemTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 4,
    },
    ticketItemSub: {
        fontSize: 13,
        color: '#374151',
        fontWeight: '600',
    },
    ticketArrow: {
        marginLeft: 8,
    },
});
