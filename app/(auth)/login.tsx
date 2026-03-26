/**
 * PROTECT SEG — Login Screen
 */

import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    Dimensions,
    Image,
} from 'react-native';
import { router } from 'expo-router';
import { Colors, LightTheme, Spacing, TextStyles, BorderRadius } from '../../src/theme';
import { Button, Input } from '../../src/components/ui';

const { width } = Dimensions.get('window');

export default function LoginScreen() {
    const [cpfCnpj, setCpfCnpj] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loginType, setLoginType] = useState<'client' | 'patrol'>('client');

    const handleLogin = async () => {
        setLoading(true);
        // Simulated login — replace with actual API call
        setTimeout(() => {
            setLoading(false);
            if (loginType === 'client') {
                router.replace('/(client)');
            } else {
                router.replace('/(patrol)');
            }
        }, 1500);
    };

    const formatCpfCnpj = (text: string) => {
        const cleaned = text.replace(/\D/g, '');
        if (cleaned.length <= 11) {
            // CPF: 000.000.000-00
            return cleaned
                .replace(/(\d{3})(\d)/, '$1.$2')
                .replace(/(\d{3})(\d)/, '$1.$2')
                .replace(/(\d{3})(\d{1,2})/, '$1-$2')
                .replace(/(-\d{2})\d+?$/, '$1');
        } else {
            // CNPJ: 00.000.000/0001-00
            return cleaned
                .replace(/(\d{2})(\d)/, '$1.$2')
                .replace(/(\d{3})(\d)/, '$1.$2')
                .replace(/(\d{3})(\d)/, '$1/$2')
                .replace(/(\d{4})(\d{1,2})/, '$1-$2')
                .replace(/(-\d{2})\d+?$/, '$1');
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.flex}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <ScrollView
                style={styles.flex}
                contentContainerStyle={styles.container}
                keyboardShouldPersistTaps="handled"
            >
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.logoRow}>
                        <Image
                            source={require('../../assets/images/logo.png')}
                            style={styles.logoIconImage}
                            resizeMode="contain"
                        />
                        <Text style={styles.logoText}>PROTECT SEG</Text>
                    </View>
                    <Text style={styles.headerTitle}>Bem-vindo de volta</Text>
                    <Text style={styles.headerSubtitle}>
                        Entre na sua conta para acessar a segurança em tempo real
                    </Text>
                </View>

                {/* Login Type Toggle */}
                <View style={styles.toggleContainer}>
                    <TouchableOpacity
                        style={[
                            styles.toggleButton,
                            loginType === 'client' && styles.toggleActive,
                        ]}
                        onPress={() => setLoginType('client')}
                    >
                        <Text
                            style={[
                                styles.toggleText,
                                loginType === 'client' && styles.toggleTextActive,
                            ]}
                        >
                            👤 Cliente
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.toggleButton,
                            loginType === 'patrol' && styles.toggleActive,
                        ]}
                        onPress={() => setLoginType('patrol')}
                    >
                        <Text
                            style={[
                                styles.toggleText,
                                loginType === 'patrol' && styles.toggleTextActive,
                            ]}
                        >
                            🏍️ Patrulheiro
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Form */}
                <View style={styles.form}>
                    <Input
                        label="CPF ou CNPJ"
                        placeholder="000.000.000-00"
                        value={cpfCnpj}
                        onChangeText={(text) => setCpfCnpj(formatCpfCnpj(text))}
                        keyboardType="numeric"
                        maxLength={18}
                        icon={<Text style={styles.inputIcon}>📋</Text>}
                    />

                    <Input
                        label="Senha"
                        placeholder="Sua senha segura"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!showPassword}
                        icon={<Text style={styles.inputIcon}>🔒</Text>}
                        rightIcon={
                            <Text style={styles.inputIcon}>
                                {showPassword ? '👁️' : '👁️‍🗨️'}
                            </Text>
                        }
                        onRightIconPress={() => setShowPassword(!showPassword)}
                    />

                    <TouchableOpacity style={styles.forgotPassword}>
                        <Text style={styles.forgotText}>Esqueceu a senha?</Text>
                    </TouchableOpacity>

                    <Button
                        title={loading ? 'ENTRANDO...' : 'ENTRAR'}
                        onPress={handleLogin}
                        variant="primary"
                        size="xl"
                        fullWidth
                        loading={loading}
                        style={styles.loginButton}
                    />

                    {/* Biometric Login */}
                    <TouchableOpacity style={styles.biometricButton}>
                        <View style={styles.biometricCircle}>
                            <Text style={styles.biometricIcon}>📱</Text>
                        </View>
                        <Text style={styles.biometricText}>Entrar com Biometria</Text>
                    </TouchableOpacity>
                </View>

                {/* Divider */}
                <View style={styles.dividerRow}>
                    <View style={styles.dividerLine} />
                    <Text style={styles.dividerText}>OU</Text>
                    <View style={styles.dividerLine} />
                </View>

                {/* OTP Login */}
                <Button
                    title="📲 Entrar com código SMS"
                    onPress={() => { }}
                    variant="outline"
                    size="lg"
                    fullWidth
                    style={styles.otpButton}
                />

                {/* Register Link */}
                <View style={styles.registerRow}>
                    <Text style={styles.registerText}>Não tem uma conta? </Text>
                    <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
                        <Text style={styles.registerLink}>Criar conta</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    flex: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    container: {
        flexGrow: 1,
        paddingHorizontal: Spacing.xl,
        paddingTop: Spacing['5xl'],
        paddingBottom: Spacing['3xl'],
    },

    // Header
    header: {
        marginBottom: Spacing['2xl'],
    },
    logoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: Spacing.lg,
    },
    logoIconImage: {
        width: 44,
        height: 44,
        marginRight: Spacing.md,
    },
    logoText: {
        ...TextStyles.h4,
        color: '#0A1C43',
        letterSpacing: 1.5,
        fontWeight: '900',
    },
    headerTitle: {
        ...TextStyles.h2,
        color: '#0A1C43',
        marginBottom: Spacing.sm,
    },
    headerSubtitle: {
        ...TextStyles.body,
        color: '#1F2937',
        lineHeight: 22,
    },

    // Toggle
    toggleContainer: {
        flexDirection: 'row',
        backgroundColor: '#F3F4F6',
        borderRadius: BorderRadius.lg,
        padding: 4,
        marginBottom: Spacing.xl,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    toggleButton: {
        flex: 1,
        paddingVertical: Spacing.md,
        borderRadius: BorderRadius.md,
        alignItems: 'center',
    },
    toggleActive: {
        backgroundColor: Colors.navy[500],
    },
    toggleText: {
        ...TextStyles.bodyMedium,
        color: '#1F2937',
    },
    toggleTextActive: {
        color: Colors.white,
        fontWeight: '600',
    },

    // Form
    form: {
        marginBottom: Spacing.xl,
    },
    inputIcon: {
        fontSize: 18,
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        marginBottom: Spacing.xl,
    },
    forgotText: {
        ...TextStyles.bodySm,
        color: Colors.navy[600],
        fontWeight: '600',
    },
    loginButton: {
        marginBottom: Spacing.xl,
    },

    // Biometric
    biometricButton: {
        alignItems: 'center',
        paddingVertical: Spacing.md,
    },
    biometricCircle: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#F3F4F6',
        borderWidth: 2,
        borderColor: Colors.navy[500],
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: Spacing.sm,
    },
    biometricIcon: {
        fontSize: 24,
    },
    biometricText: {
        ...TextStyles.bodySm,
        color: '#1F2937',
    },

    // Divider
    dividerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: Spacing.lg,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#E5E7EB',
    },
    dividerText: {
        ...TextStyles.caption,
        color: LightTheme.text.tertiary,
        marginHorizontal: Spacing.base,
        letterSpacing: 2,
    },

    // OTP
    otpButton: {
        marginBottom: Spacing.xl,
        borderColor: '#E5E7EB',
    },

    // Register
    registerRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    registerText: {
        ...TextStyles.body,
        color: '#1F2937',
    },
    registerLink: {
        ...TextStyles.bodyMedium,
        color: Colors.emerald[400],
        fontWeight: '600',
    },
});
