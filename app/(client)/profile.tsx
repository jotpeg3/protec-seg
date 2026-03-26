/**
 * PROTECT SEG — Profile Screen (Client)
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
import { Colors, LightTheme, Spacing, TextStyles, BorderRadius, Shadow } from '../../src/theme';
import { Card, Badge } from '../../src/components/ui';

export default function ProfileScreen() {
    const menuSections = [
        {
            title: 'CONTA',
            items: [
                { icon: '👤', label: 'Dados pessoais', desc: 'Nome, CPF, email' },
                { icon: '📍', label: 'Endereços', desc: '2 endereços salvos' },
                { icon: '🔔', label: 'Notificações', desc: 'Push, SMS, email' },
                { icon: '🔒', label: 'Segurança', desc: 'Senha, biometria, 2FA' },
            ],
        },
        {
            title: 'PLANO',
            items: [
                { icon: '🛡️', label: 'Meu plano', desc: 'Premium • R$99/mês' },
                { icon: '💳', label: 'Pagamentos', desc: 'Faturas e métodos' },
                { icon: '📄', label: 'Contratos', desc: 'Termos e documentos' },
            ],
        },
        {
            title: 'SUPORTE',
            items: [
                { icon: '💬', label: 'Falar com suporte', desc: 'Chat 24h ou WhatsApp' },
                { icon: '❓', label: 'Perguntas frequentes', desc: 'Dúvidas comuns' },
                { icon: '⭐', label: 'Avaliar o app', desc: 'Ajude-nos a melhorar' },
            ],
        },
    ];

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

            {/* Profile Card */}
            <Card variant="elevated" padding="xl" style={styles.profileCard}>
                <View style={styles.profileRow}>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>JS</Text>
                    </View>
                    <View style={styles.profileInfo}>
                        <Text style={styles.profileName}>João Silva</Text>
                        <Text style={styles.profileCpf}>CPF: •••.•••.456-78</Text>
                        <Badge label="PREMIUM" variant="navy" size="sm" />
                    </View>
                    <TouchableOpacity style={styles.editButton}>
                        <Text style={styles.editIcon}>✏️</Text>
                    </TouchableOpacity>
                </View>
            </Card>

            {/* Menu Sections */}
            {menuSections.map((section, si) => (
                <View key={si}>
                    <Text style={styles.sectionLabel}>{section.title}</Text>
                    <View style={styles.menuGroup}>
                        {section.items.map((item, ii) => (
                            <TouchableOpacity
                                key={ii}
                                style={[
                                    styles.menuItem,
                                    ii < section.items.length - 1 && styles.menuItemBorder,
                                ]}
                                activeOpacity={0.7}
                            >
                                <Text style={styles.menuIcon}>{item.icon}</Text>
                                <View style={styles.menuInfo}>
                                    <Text style={styles.menuLabel}>{item.label}</Text>
                                    <Text style={styles.menuDesc}>{item.desc}</Text>
                                </View>
                                <Text style={styles.menuArrow}>›</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            ))}

            {/* Logout */}
            <TouchableOpacity
                style={styles.logoutButton}
                onPress={() => router.replace('/')}
            >
                <Text style={styles.logoutText}>🚪 Sair da conta</Text>
            </TouchableOpacity>

            <Text style={styles.version}>
                PROTEC SEG v1.0.0{'\n'}© 2026 PROTEC SEG
            </Text>
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
        backgroundColor: Colors.white,
        marginBottom: Spacing.xl,
        borderColor: '#E5E7EB',
        borderWidth: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 6,
        elevation: 3,
    },
    profileRow: { flexDirection: 'row', alignItems: 'center' },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: Colors.navy[500],
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: Spacing.md,
    },
    avatarText: { ...TextStyles.h3, color: Colors.white, fontWeight: '700' },
    profileInfo: { flex: 1 },
    profileName: { ...TextStyles.h4, color: '#111827' },
    profileCpf: { ...TextStyles.caption, color: '#374151', marginBottom: 4 },
    editButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#F3F4F6',
        alignItems: 'center',
        justifyContent: 'center',
    },
    editIcon: { fontSize: 16 },
    sectionLabel: {
        ...TextStyles.label,
        color: '#1F2937',
        marginBottom: Spacing.sm,
        marginTop: Spacing.md,
    },
    menuGroup: {
        backgroundColor: Colors.white,
        borderRadius: BorderRadius.xl,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        overflow: 'hidden',
        marginBottom: Spacing.md,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.03,
        shadowRadius: 2,
        elevation: 1,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: Spacing.base,
    },
    menuItemBorder: {
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    menuIcon: { fontSize: 22, marginRight: Spacing.md },
    menuInfo: { flex: 1 },
    menuLabel: { ...TextStyles.bodyMedium, color: '#111827' },
    menuDesc: { ...TextStyles.caption, color: '#374151', marginTop: 1 },
    menuArrow: { fontSize: 24, color: '#1F2937' },
    logoutButton: {
        backgroundColor: Colors.white,
        borderRadius: BorderRadius.lg,
        padding: Spacing.base,
        alignItems: 'center',
        marginTop: Spacing.lg,
        borderWidth: 1,
        borderColor: Colors.danger[500] + '30',
        shadowColor: Colors.danger[500],
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 1,
    },
    logoutText: {
        ...TextStyles.bodyMedium,
        color: Colors.danger[500],
        fontWeight: 'bold',
    },
    version: {
        ...TextStyles.caption,
        color: '#374151',
        textAlign: 'center',
        marginTop: Spacing.xl,
        lineHeight: 18,
    },
});
