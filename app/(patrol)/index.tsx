/**
 * PROTECT SEG — Patrol Feed (Incoming Tickets)
 */

import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Animated,
    Vibration,
    Image,
    Platform,
    StatusBar,
    Dimensions,
} from 'react-native';
import { Colors, LightTheme, Spacing, TextStyles, BorderRadius, Shadow } from '../../src/theme';
import { Card, Badge, Button } from '../../src/components/ui';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const HEADER_HEIGHT = 180;

const MOCK_CALLS = [
    {
        id: 'TK-001',
        type: 'SOS',
        urgency: 'critical',
        client: 'João Silva',
        address: 'Rua das Palmeiras, 234 - Paulista',
        distance: '1.2km',
        eta: '4min',
        description: 'Emergência pessoal - SOS ativado',
        time: 'Agora mesmo',
        isNew: true,
    },
    {
        id: 'TK-002',
        type: 'Invasão',
        urgency: 'high',
        client: 'Maria Santos',
        address: 'Av. Brasil, 1021 - Centro',
        distance: '2.8km',
        eta: '8min',
        description: 'Pessoa tentando pular muro lateral',
        time: 'Há 3 min',
        isNew: true,
    },
    {
        id: 'TK-003',
        type: 'Alarme',
        urgency: 'medium',
        client: 'Comércio TechStore',
        address: 'Shopping Paulista, Loja 45',
        distance: '4.1km',
        eta: '12min',
        description: 'Alarme disparou sem motivo aparente',
        time: 'Há 8 min',
        isNew: false,
    },
];

const urgencyColors = {
    critical: { bg: Colors.danger[500] + '20', border: Colors.danger[500] + '40', text: Colors.danger[400], icon: '🔴' },
    high: { bg: Colors.warning[600] + '20', border: Colors.warning[500] + '40', text: Colors.warning[400], icon: '🟠' },
    medium: { bg: Colors.warning[500] + '15', border: Colors.warning[500] + '30', text: Colors.warning[300], icon: '🟡' },
    low: { bg: Colors.emerald[500] + '15', border: Colors.emerald[500] + '30', text: Colors.emerald[300], icon: '🟢' },
};

export default function PatrolFeed() {
    const [isOnline, setIsOnline] = useState(true);
    const pulseAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        if (isOnline) {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(pulseAnim, { toValue: 1.2, duration: 800, useNativeDriver: true }),
                    Animated.timing(pulseAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
                ])
            ).start();
        } else {
            pulseAnim.setValue(1);
        }
    }, [isOnline]);

    const handleAccept = (ticketId: string) => {
        Vibration.vibrate(100);
        // Navigate to active ticket
    };

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.contentScroll}
            showsVerticalScrollIndicator={false}
        >
            {/* Header Background */}
            <View style={styles.headerBackground} />

            <View style={styles.headerBar}>
                <View style={styles.headerCenter}>
                    <View style={[styles.brandShieldContainer, { backgroundColor: '#E0E2E5', borderRadius: 0, padding: 4 }]}>
                        <Image
                            source={require('../../assets/images/logo.png')}
                            style={{ height: 26, width: 26 }}
                            resizeMode="contain"
                        />
                    </View>
                    <Text style={styles.brandTitle}>PROTECT SEG</Text>
                </View>
            </View>

            <View style={styles.contentStyle}>
                {/* Header - Greeting & Status */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.greeting}>Olá, Carlos 🏍️</Text>
                        <Text style={styles.greetingSub}>Patrulheiro #P-0042</Text>
                    </View>
                    <TouchableOpacity
                        style={[styles.statusToggle, isOnline && styles.statusOnline]}
                        onPress={() => setIsOnline(!isOnline)}
                    >
                        <Animated.View
                            style={[
                                styles.statusDot,
                                isOnline && styles.statusDotOnline,
                                isOnline && { transform: [{ scale: pulseAnim }] },
                            ]}
                        />
                        <Text style={[styles.statusText, isOnline && styles.statusTextOnline]}>
                            {isOnline ? 'Online' : 'Offline'}
                        </Text>
                    </TouchableOpacity>
                </View>
                {/* Stats Row */}
                <View style={styles.statsRow}>
                    {[
                        { value: '12', label: 'Hoje', icon: '📋' },
                        { value: '4.8', label: 'Rating', icon: '⭐' },
                        { value: 'R$284', label: 'Semana', icon: '💰' },
                    ].map((stat, i) => (
                        <View key={i} style={styles.statCard}>
                            <Text style={styles.statIcon}>{stat.icon}</Text>
                            <Text style={styles.statValue}>{stat.value}</Text>
                            <Text style={styles.statLabel}>{stat.label}</Text>
                        </View>
                    ))}
                </View>

                {/* Incoming Calls */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>
                        Chamados próximos
                    </Text>
                    <Badge label={`${MOCK_CALLS.length} ativos`} variant="danger" dot size="md" />
                </View>

                {
                    MOCK_CALLS.map((call) => {
                        const urgency = urgencyColors[call.urgency as keyof typeof urgencyColors];
                        return (
                            <Card
                                key={call.id}
                                variant="default"
                                padding="base"
                                style={[
                                    styles.callCard,
                                    { borderColor: urgency.border, borderWidth: 1 },
                                    call.isNew && styles.callCardNew,
                                ] as any}
                            >
                                {/* Call Header */}
                                <View style={styles.callHeader}>
                                    <View style={styles.callTypeRow}>
                                        <View style={[styles.urgencyDot, { backgroundColor: urgency.bg }]}>
                                            <Text style={styles.urgencyIcon}>{urgency.icon}</Text>
                                        </View>
                                        <View>
                                            <Text style={styles.callType}>{call.type}</Text>
                                            <Text style={styles.callId}>{call.id} • {call.time}</Text>
                                        </View>
                                    </View>
                                    {call.isNew && (
                                        <Badge label="NOVO" variant="danger" size="sm" />
                                    )}
                                </View>

                                {/* Client Info */}
                                <Text style={styles.callClient}>👤 {call.client}</Text>
                                <Text style={styles.callDesc}>{call.description}</Text>

                                {/* Location */}
                                <View style={styles.callLocation}>
                                    <Text style={styles.callAddress}>📍 {call.address}</Text>
                                    <View style={styles.callDistanceRow}>
                                        <Text style={styles.callDistance}>🛣️ {call.distance}</Text>
                                        <Text style={styles.callEta}>⏱️ ETA {call.eta}</Text>
                                    </View>
                                </View>

                                {/* Actions */}
                                <View style={styles.callActions}>
                                    <Button
                                        title="Rejeitar"
                                        onPress={() => { }}
                                        variant="ghost"
                                        size="md"
                                        style={styles.rejectButton}
                                        textStyle={{ color: '#4B5563' }}
                                    />
                                    <Button
                                        title="✓ Aceitar"
                                        onPress={() => handleAccept(call.id)}
                                        variant={call.urgency === 'critical' ? 'danger' : 'secondary'}
                                        size="md"
                                        style={styles.acceptButton}
                                    />
                                </View>
                            </Card>
                        );
                    })
                }
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F7F8FA' },
    contentScroll: {
        paddingBottom: Spacing['5xl'],
    },
    headerBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: HEADER_HEIGHT,
        backgroundColor: '#0A1C43', // Deep Navy Blue
        borderBottomLeftRadius: 0, // Squared as requested
        borderBottomRightRadius: 0, // Squared as requested
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
        flexDirection: 'row',
        alignItems: 'center',
    },
    brandShieldContainer: {
        marginRight: 8,
    },
    contentStyle: {
        paddingHorizontal: Spacing.xl,
        paddingTop: Spacing.md,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Spacing.xl,
        marginTop: Spacing.sm,
    },
    brandLogo: {
        height: 32,
        width: 32,
        marginRight: 8,
    },
    brandTitle: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '900',
        letterSpacing: 0.5,
    },
    greeting: { ...TextStyles.h3, color: '#FFFFFF', fontWeight: 'bold' },
    greetingSub: { ...TextStyles.caption, color: 'rgba(255, 255, 255, 0.8)', marginTop: 2 },
    statusToggle: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: BorderRadius.full,
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.sm,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    statusOnline: {
        borderColor: Colors.emerald[500] + '40',
        backgroundColor: Colors.emerald[500] + '10',
    },
    statusDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: LightTheme.text.tertiary,
        marginRight: Spacing.xs,
    },
    statusDotOnline: { backgroundColor: Colors.emerald[600] },
    statusText: { ...TextStyles.bodySm, color: '#374151', fontWeight: '700' },
    statusTextOnline: { color: Colors.emerald[600] },
    statsRow: {
        flexDirection: 'row',
        gap: Spacing.md,
        marginBottom: Spacing.xl,
    },
    statCard: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: BorderRadius.lg,
        padding: Spacing.md,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    statIcon: { fontSize: 20, marginBottom: 4 },
    statValue: { ...TextStyles.h4, color: Colors.navy[600] },
    statLabel: { ...TextStyles.caption, color: '#374151', fontWeight: '600' },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Spacing.md,
    },
    sectionTitle: { ...TextStyles.h4, color: '#1E3A8A' },
    callCard: { marginBottom: Spacing.md, backgroundColor: '#FFFFFF' },
    callCardNew: { ...Shadow.md },
    callHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: Spacing.md,
    },
    callTypeRow: { flexDirection: 'row', alignItems: 'center' },
    urgencyDot: {
        width: 36,
        height: 36,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: Spacing.sm,
    },
    urgencyIcon: { fontSize: 14 },
    callType: { ...TextStyles.bodyMedium, color: Colors.navy[600], fontWeight: '700' },
    callId: { ...TextStyles.caption, color: '#374151' },
    callClient: {
        ...TextStyles.bodySm,
        color: '#1F2937',
        fontWeight: '600',
        marginBottom: 4,
    },
    callDesc: {
        ...TextStyles.bodySm,
        color: '#1F2937',
        marginBottom: Spacing.md,
    },
    callLocation: {
        backgroundColor: '#F3F4F6',
        borderRadius: BorderRadius.md,
        padding: Spacing.sm,
        marginBottom: Spacing.md,
    },
    callAddress: {
        ...TextStyles.bodySm,
        color: '#1F2937',
        fontWeight: '600',
        marginBottom: 4,
    },
    callDistanceRow: {
        flexDirection: 'row',
        gap: Spacing.md,
    },
    callDistance: {
        ...TextStyles.caption,
        color: Colors.emerald[600],
        fontWeight: '600',
    },
    callEta: {
        ...TextStyles.caption,
        color: Colors.warning[600],
        fontWeight: '600',
    },
    callActions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: Spacing.sm,
    },
    rejectButton: {},
    acceptButton: { minWidth: 120 },
});
