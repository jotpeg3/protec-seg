/**
 * PROTEC SEG — Patrol Profile
 */

import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Platform,
    StatusBar,
    Image,
} from 'react-native';
import { router } from 'expo-router';
import { Colors, LightTheme, Spacing, TextStyles, BorderRadius } from '../../src/theme';
import { Card, Badge } from '../../src/components/ui';

export default function PatrolProfileScreen() {
    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.content}
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

            <Text style={styles.titleText}>Perfil</Text>

            <Card variant="elevated" padding="xl" style={styles.profileCard}>
                <View style={styles.profileRow}>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>CS</Text>
                    </View>
                    <View style={styles.profileInfo}>
                        <Text style={styles.profileName}>Carlos Silva</Text>
                        <Text style={styles.profileId}>Patrulheiro #P-0042</Text>
                        <Badge label="VERIFICADO ✓" variant="success" size="sm" />
                    </View>
                </View>

                <View style={styles.statsGrid}>
                    {[
                        { value: '387', label: 'Atendimentos' },
                        { value: '4.8', label: 'Avaliação' },
                        { value: '98%', label: 'Resolução' },
                        { value: '2 anos', label: 'Experiência' },
                    ].map((stat, i) => (
                        <View key={i} style={styles.statsItem}>
                            <Text style={styles.statsValue}>{stat.value}</Text>
                            <Text style={styles.statsLabel}>{stat.label}</Text>
                        </View>
                    ))}
                </View>
            </Card>

            {/* Menu Items */}
            {[
                { icon: '📅', label: 'Check-in/Check-out', desc: 'Registro de turno' },
                { icon: '🏍️', label: 'Meu veículo', desc: 'Moto Honda CG 160' },
                { icon: '📋', label: 'Documentos', desc: 'CNH, certificados' },
                { icon: '💰', label: 'Ganhos e extratos', desc: 'Relatório financeiro' },
                { icon: '📊', label: 'Desempenho', desc: 'Métricas e metas' },
                { icon: '⚙️', label: 'Configurações', desc: 'Notificações, conta' },
            ].map((item, i) => (
                <TouchableOpacity key={i} style={styles.menuItem} activeOpacity={0.7}>
                    <Text style={styles.menuIcon}>{item.icon}</Text>
                    <View style={styles.menuInfo}>
                        <Text style={styles.menuLabel}>{item.label}</Text>
                        <Text style={styles.menuDesc}>{item.desc}</Text>
                    </View>
                    <Text style={styles.menuArrow}>›</Text>
                </TouchableOpacity>
            ))}

            <TouchableOpacity
                style={styles.logoutButton}
                onPress={() => router.replace('/')}
            >
                <Text style={styles.logoutText}>🚪 Sair da conta</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F7F8FA' },
    headerBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 140,
        backgroundColor: '#0A1C43',
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
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
    brandTitle: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '900',
        letterSpacing: 0.5,
    },
    content: {
        paddingHorizontal: Spacing.xl,
        paddingBottom: Spacing['5xl'],
    },
    titleText: { ...TextStyles.h2, color: '#FFFFFF', marginTop: 20, marginBottom: Spacing.xl, zIndex: 11 },
    profileCard: {
        backgroundColor: '#FFFFFF',
        marginBottom: Spacing.xl,
        borderColor: '#E5E7EB',
        borderWidth: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    profileRow: { flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.xl },
    avatar: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: Colors.emerald[500],
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: Spacing.md,
    },
    avatarText: { ...TextStyles.h3, color: Colors.white, fontWeight: '700' },
    profileInfo: { flex: 1 },
    profileName: { ...TextStyles.h4, color: Colors.navy[600], fontWeight: '700' },
    profileId: { ...TextStyles.caption, color: '#374151', marginBottom: 4 },
    statsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: Spacing.sm,
    },
    statsItem: {
        width: '47%',
        backgroundColor: '#F3F4F6',
        borderRadius: BorderRadius.md,
        padding: Spacing.md,
        alignItems: 'center',
    },
    statsValue: { ...TextStyles.h4, color: Colors.emerald[600] },
    statsLabel: { ...TextStyles.caption, color: '#374151', fontWeight: '600', marginTop: 2 },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: BorderRadius.lg,
        padding: Spacing.base,
        marginBottom: Spacing.sm,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    menuIcon: { fontSize: 22, marginRight: Spacing.md },
    menuInfo: { flex: 1 },
    menuLabel: { ...TextStyles.bodyMedium, color: Colors.navy[600], fontWeight: '700' },
    menuDesc: { ...TextStyles.caption, color: '#374151' },
    menuArrow: { fontSize: 24, color: '#1F2937' },
    logoutButton: {
        backgroundColor: Colors.danger[500] + '10',
        borderRadius: BorderRadius.lg,
        padding: Spacing.base,
        alignItems: 'center',
        marginTop: Spacing.lg,
        borderWidth: 1,
        borderColor: Colors.danger[500] + '30',
    },
    logoutText: { ...TextStyles.bodyMedium, color: Colors.danger[600], fontWeight: '600' },
});
