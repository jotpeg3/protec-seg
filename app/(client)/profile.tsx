/**
 * PROTECT SEG — Profile Screen (Client)
 */

import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Image,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { Badge, Card } from '../../src/components/ui';
import { authService, Profile } from '../../src/services/authService';
import { BorderRadius, Colors, Spacing, TextStyles } from '../../src/theme';

export default function ProfileScreen() {
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await authService.getCurrentUser();
                if (data) setProfile(data.profile);
            } catch (error) {
                console.log('Error fetching profile:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    const handleLogout = async () => {
        try {
            await authService.signOut();
            router.replace('/');
        } catch (error) {
            console.log('Error signing out:', error);
        }
    };
    const menuSections = [
        {
            title: 'CONTA',
            items: [
                { icon: '👤', label: 'Dados Pessoais', desc: 'Edite seu nome, e-mail e CPF' },
                { icon: '📍', label: 'Meus Endereços', desc: 'Gerencie locais protegidos' },
                { icon: '💳', label: 'Pagamentos', desc: 'Cartões salvos e faturas' },
            ],
        },
        {
            title: 'SEGURANÇA',
            items: [
                { icon: '🔔', label: 'Notificações', desc: 'Alertas e avisos push' },
                { icon: '🛡️', label: 'Privacidade', desc: 'Termos e autorizações' },
                { icon: '🔑', label: 'Alterar Senha', desc: 'Mudar senha de acesso' },
            ],
        },
    ];

    if (loading) {
        return (
            <View style={[styles.container, { justifyContent: 'center' }]}>
                <ActivityIndicator size="large" color={Colors.navy[500]} />
            </View>
        );
    }

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
        >
            {/* ... rest of the standard UI ... */}
            <View style={styles.headerBackground} />

            <View style={styles.headerBar}>
                <View style={styles.headerCenter}>
                    <View style={styles.brandShieldContainer}>
                        <Image
                            source={require('../../assets/images/logo.png')}
                            style={{ height: 60, width: 60 }}
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
                        <Text style={styles.avatarText}>
                            {profile?.full_name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
                        </Text>
                    </View>
                    <View style={styles.profileInfo}>
                        <Text style={styles.profileName}>{profile?.full_name || 'Usuário'}</Text>
                        <Text style={styles.profileCpf}>CPF/CNPJ: {profile?.cpf_cnpj || '---'}</Text>
                        <Badge label="PREMIUM" variant="navy" size="sm" />
                    </View>
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
                onPress={handleLogout}
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
    brandTitle: {
        color: '#0A1C43', // Dark Navy Brand
        fontSize: 16,
        fontWeight: '900',
        letterSpacing: 1,
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
