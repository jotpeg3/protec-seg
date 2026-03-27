/**
 * PROTECT SEG — Login Screen
 */

import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    Dimensions,
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { Button, Input } from '../../src/components/ui';
import { authService } from '../../src/services/authService';
import { BorderRadius, Colors, LightTheme, Spacing, TextStyles } from '../../src/theme';

const { width } = Dimensions.get('window');

export default function LoginScreen() {
    const [cpfCnpj, setCpfCnpj] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loginType, setLoginType] = useState<'client' | 'patrol'>('client');
    const [errorMsg, setErrorMsg] = useState('');

    const showError = (msg: string) => {
        setErrorMsg(msg);
        if (Platform.OS !== 'web') {
            Alert.alert('Erro', msg);
        }
    };

    const handleLogin = async () => {
        setErrorMsg('');
        if (!cpfCnpj || !password) {
            showError('Por favor, preencha todos os campos.');
            return;
        }

        setLoading(true);
        try {
            let userProfile;

            // Check if input is an email
            if (cpfCnpj.includes('@')) {
                userProfile = await authService.signIn(cpfCnpj, password);
            } else {
                userProfile = await authService.signInWithCpfCnpj(
                    cpfCnpj.replace(/\D/g, ''),
                    password
                );
            }

            const { profile } = userProfile;
            setLoading(false);

            // Validate the role matches the toggle
            if (profile.role !== loginType) {
                showError(`Esta conta não está registrada como ${loginType === 'client' ? 'Cliente' : 'Patrulheiro'}.`);
                return;
            }

            if (profile.role === 'client') {
                router.replace('/(client)');
            } else {
                router.replace('/(patrol)');
            }
        } catch (error: any) {
            setLoading(false);
            console.log('[Login] Error:', error?.message || error);

            let msg = 'Credenciais inválidas. Verifique e-mail e senha.';
            if (error.message) {
                if (error.message.includes('Invalid login credentials')) {
                    msg = 'E-mail ou senha incorretos.';
                } else if (error.message.includes('Email not confirmed')) {
                    msg = 'E-mail não confirmado. Verifique sua caixa de entrada.';
                } else {
                    msg = error.message;
                }
            }
            showError(msg);
        }
    };

    const handleForgotPassword = async () => {
        if (!cpfCnpj) {
            Alert.alert('Recuperação', 'Digite seu CPF/CNPJ para identificarmos seu e-mail.');
            return;
        }

        try {
            const { data: email } = await authService.supabase.rpc('get_email_by_cpf_cnpj', {
                p_cpf_cnpj: cpfCnpj.replace(/\D/g, ''),
            });

            if (!email) {
                Alert.alert('Erro', 'CPF/CNPJ não encontrado.');
                return;
            }

            await authService.resetPassword(email);
            Alert.alert('Sucesso', `Um e-mail de recuperação foi enviado para ${email}`);
        } catch (error: any) {
            Alert.alert('Erro', 'Não foi possível enviar o e-mail de recuperação.');
        }
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
                        <Ionicons
                            name="person-outline"
                            size={20}
                            color={loginType === 'client' ? Colors.white : Colors.neutral[600]}
                            style={{ marginRight: 8 }}
                        />
                        <Text
                            style={[
                                styles.toggleText,
                                loginType === 'client' && styles.toggleTextActive,
                            ]}
                        >
                            Cliente
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.toggleButton,
                            loginType === 'patrol' && styles.toggleActive,
                        ]}
                        onPress={() => setLoginType('patrol')}
                    >
                        <Ionicons
                            name="shield-checkmark-outline"
                            size={20}
                            color={loginType === 'patrol' ? Colors.white : Colors.neutral[600]}
                            style={{ marginRight: 8 }}
                        />
                        <Text
                            style={[
                                styles.toggleText,
                                loginType === 'patrol' && styles.toggleTextActive,
                            ]}
                        >
                            Patrulheiro
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Form */}
                <View style={styles.form}>
                    <Input
                        label="E-mail, CPF ou CNPJ"
                        placeholder="seu@email.com ou 000.000.000-00"
                        value={cpfCnpj}
                        onChangeText={(text) => {
                            // Improved logic: if it contains any letter, don't format as CPF/CNPJ
                            if (/[a-zA-Z]/.test(text) || text.includes('@')) {
                                setCpfCnpj(text.toLowerCase());
                            } else {
                                setCpfCnpj(formatCpfCnpj(text));
                            }
                        }}
                        autoCapitalize="none"
                        keyboardType="email-address"
                        icon={<Ionicons name="mail-outline" size={18} color={Colors.navy[400]} />}
                    />

                    <Input
                        label="Senha"
                        placeholder="Sua senha segura"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!showPassword}
                        icon={<Ionicons name="lock-closed-outline" size={18} color={Colors.navy[400]} />}
                        rightIcon={
                            <Text style={styles.inputIcon}>
                                <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={20} color={Colors.navy[400]} />
                            </Text>
                        }
                        onRightIconPress={() => setShowPassword(!showPassword)}
                    />

                    <TouchableOpacity
                        style={styles.forgotPassword}
                        onPress={handleForgotPassword}
                    >
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
                            <Ionicons name="finger-print-outline" size={32} color={Colors.navy[600]} />
                        </View>
                        <Text style={styles.biometricText}>Entrar com Biometria</Text>
                    </TouchableOpacity>
                </View>

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
        marginTop: Spacing.xl,
        marginBottom: Spacing.xl,
    },
    registerText: {
        ...TextStyles.bodyMedium,
        color: '#1F2937',
        fontSize: 18,
    },
    registerLink: {
        ...TextStyles.bodyMedium,
        color: Colors.emerald[400],
        fontWeight: 'bold',
        fontSize: 18,
    },
});
