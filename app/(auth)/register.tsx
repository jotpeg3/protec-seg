/**
 * PROTECT SEG — Register Screen
 */

import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
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

export default function RegisterScreen() {
    const [step, setStep] = useState(1);
    const [name, setName] = useState('');
    const [cpfCnpj, setCpfCnpj] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [accountType, setAccountType] = useState<'cpf' | 'cnpj'>('cpf');
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    // Cross-platform message display (Alert.alert doesn't work on web)
    const showError = (msg: string) => {
        setErrorMsg(msg);
        setSuccessMsg('');
        if (Platform.OS !== 'web') {
            Alert.alert('Erro', msg);
        }
    };
    const showSuccess = (title: string, msg: string, onOk?: () => void) => {
        setSuccessMsg(msg);
        setErrorMsg('');
        if (Platform.OS !== 'web') {
            Alert.alert(title, msg, [{ text: 'ENTENDI', onPress: onOk }]);
        } else if (onOk) {
            // On web, auto-redirect after 3 seconds
            setTimeout(onOk, 3000);
        }
    };


    const formatCpfCnpj = (text: string) => {
        const cleaned = text.replace(/\D/g, '');
        if (cleaned.length <= 11) {
            return cleaned
                .replace(/(\d{3})(\d)/, '$1.$2')
                .replace(/(\d{3})(\d)/, '$1.$2')
                .replace(/(\d{3})(\d{1,2})/, '$1-$2')
                .slice(0, 14);
        } else {
            return cleaned
                .replace(/(\d{2})(\d)/, '$1.$2')
                .replace(/(\d{3})(\d)/, '$1.$2')
                .replace(/(\d{3})(\d)/, '$1/$2')
                .replace(/(\d{4})(\d{1,2})/, '$1-$2')
                .slice(0, 18);
        }
    };

    const handleRegister = async () => {
        console.log('[Register] Button pressed. Step:', step);
        setErrorMsg('');
        setSuccessMsg('');

        if (!name || !cpfCnpj || !email || !phone || !password) {
            showError('Por favor, preencha todos os campos antes de continuar.');
            return;
        }

        if (password !== confirmPassword) {
            showError('As senhas digitadas não conferem. Verifique e tente novamente.');
            return;
        }

        if (password.length < 8) {
            showError('A senha deve ter pelo menos 8 caracteres.');
            return;
        }

        setLoading(true);
        try {
            console.log('[Register] Calling authService.signUp for:', email);
            const user = await authService.signUp(email, password, {
                full_name: name,
                cpf_cnpj: cpfCnpj.replace(/\D/g, ''),
                phone: phone.replace(/\D/g, ''),
                role: 'client',
                email: email
            });

            console.log('[Register] signUp returned user:', user?.id);

            // Supabase edge case: empty identities = user already exists
            if (user && user.identities && user.identities.length === 0) {
                setLoading(false);
                showError('Este e-mail já possui uma conta. Tente fazer login ou use outro e-mail.');
                return;
            }

            setLoading(false);
            showSuccess(
                'Conta Criada!',
                'Enviamos um link de confirmação para o seu e-mail. Por favor, confirme para ativar sua conta.',
                () => router.replace('/(auth)/login')
            );
        } catch (error: any) {
            setLoading(false);
            console.log('[Register] Error caught:', error?.message || error);

            let errorMessage = 'Verifique os dados ou tente novamente.';
            if (error.message) {
                if (error.message.includes('User already registered')) {
                    errorMessage = 'Este e-mail já está cadastrado em nosso sistema.';
                } else if (error.message.includes('Password')) {
                    errorMessage = 'A senha não atende aos requisitos (mínimo 8 caracteres, maiúscula e número).';
                } else if (error.message.includes('rate limit')) {
                    errorMessage = 'Muitas tentativas. Aguarde alguns minutos e tente novamente.';
                } else if (error.message.includes('invalid')) {
                    errorMessage = 'Dados inválidos. Verifique o e-mail e tente novamente.';
                } else {
                    errorMessage = error.message;
                }
            }

            showError(errorMessage);
        }
    };


    const formatPhone = (text: string) => {
        const cleaned = text.replace(/\D/g, '');
        return cleaned
            .replace(/(\d{2})(\d)/, '($1) $2')
            .replace(/(\d{5})(\d)/, '$1-$2')
            .replace(/(-\d{4})\d+?$/, '$1');
    };

    return (
        <KeyboardAvoidingView
            style={styles.flex}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        >
            <ScrollView
                style={styles.flex}
                contentContainerStyle={styles.container}
                keyboardShouldPersistTaps="handled"
            >
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => {
                            if (step === 2) {
                                setStep(1);
                            } else {
                                router.back();
                            }
                        }}
                        style={styles.backButton}
                        activeOpacity={0.7}
                    >
                        <Text style={styles.backIcon}>←</Text>
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Criar Conta</Text>
                    <Text style={styles.headerSubtitle}>
                        Cadastre-se para ter segurança 24 horas
                    </Text>

                    {/* Progress bar */}
                    <View style={styles.progressBar}>
                        <View style={[styles.progressFill, { width: `${(step / 2) * 100}%` }]} />
                    </View>
                    <Text style={styles.stepText}>Passo {step} de 2</Text>
                </View>

                {step === 1 ? (
                    /* Step 1: Personal Info */
                    <View style={styles.form}>
                        {/* Account type */}
                        <Text style={styles.sectionLabel}>TIPO DE CONTA</Text>
                        <View style={styles.typeRow}>
                            <TouchableOpacity
                                style={[styles.typeCard, accountType === 'cpf' && styles.typeCardActive]}
                                onPress={() => setAccountType('cpf')}
                            >
                                <Ionicons name="person-outline" size={28} color={accountType === 'cpf' ? Colors.navy[600] : Colors.neutral[400]} />
                                <Text style={[styles.typeLabel, accountType === 'cpf' && styles.typeLabelActive]}>
                                    Pessoa Física
                                </Text>
                                <Text style={styles.typeHint}>CPF</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.typeCard, accountType === 'cnpj' && styles.typeCardActive]}
                                onPress={() => setAccountType('cnpj')}
                            >
                                <Ionicons name="business-outline" size={28} color={accountType === 'cnpj' ? Colors.navy[600] : Colors.neutral[400]} />
                                <Text style={[styles.typeLabel, accountType === 'cnpj' && styles.typeLabelActive]}>
                                    Pessoa Jurídica
                                </Text>
                                <Text style={styles.typeHint}>CNPJ</Text>
                            </TouchableOpacity>
                        </View>

                        <Input
                            label="Nome completo"
                            placeholder="Seu nome"
                            value={name}
                            onChangeText={setName}
                            autoCapitalize="words"
                            icon={<Ionicons name="person-outline" size={18} color={Colors.navy[400]} />}
                        />

                        <Input
                            label={accountType === 'cpf' ? 'CPF' : 'CNPJ'}
                            placeholder={accountType === 'cpf' ? '000.000.000-00' : '00.000.000/0001-00'}
                            value={cpfCnpj}
                            onChangeText={(text) => setCpfCnpj(formatCpfCnpj(text))}
                            keyboardType="numeric"
                            maxLength={accountType === 'cpf' ? 14 : 18}
                            icon={<Ionicons name="card-outline" size={18} color={Colors.navy[400]} />}
                        />

                        <Input
                            label="E-mail"
                            placeholder="seu@email.com"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            icon={<Ionicons name="mail-outline" size={18} color={Colors.navy[400]} />}
                        />

                        <Input
                            label="Telefone"
                            placeholder="(00) 00000-0000"
                            value={phone}
                            onChangeText={(text) => setPhone(formatPhone(text))}
                            keyboardType="phone-pad"
                            maxLength={15}
                            icon={<Ionicons name="call-outline" size={18} color={Colors.navy[400]} />}
                        />

                        <Button
                            title="CONTINUAR →"
                            onPress={() => setStep(2)}
                            variant="primary"
                            size="xl"
                            fullWidth
                            style={styles.nextButton}
                        />
                    </View>
                ) : (
                    /* Step 2: Security */
                    <View style={styles.form}>
                        <Input
                            label="Senha"
                            placeholder="Mínimo 8 caracteres"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                            icon={<Ionicons name="lock-closed-outline" size={18} color={Colors.navy[400]} />}
                        />

                        {/* Password strength */}
                        <View style={styles.strengthRow}>
                            {[1, 2, 3, 4].map((i) => (
                                <View
                                    key={i}
                                    style={[
                                        styles.strengthBar,
                                        {
                                            backgroundColor:
                                                password.length >= i * 2
                                                    ? password.length >= 8
                                                        ? Colors.emerald[600]
                                                        : Colors.warning[500]
                                                    : '#E5E7EB',
                                        },
                                    ]}
                                />
                            ))}
                        </View>
                        <View style={styles.passwordRules}>
                            <Text style={[styles.ruleText, password.length >= 8 && styles.ruleOk]}>
                                ✓ Mínimo 8 caracteres
                            </Text>
                            <Text style={[styles.ruleText, /[A-Z]/.test(password) && styles.ruleOk]}>
                                ✓ Uma letra maiúscula
                            </Text>
                            <Text style={[styles.ruleText, /[0-9]/.test(password) && styles.ruleOk]}>
                                ✓ Um número
                            </Text>
                        </View>

                        <Input
                            label="Confirmar Senha"
                            placeholder="Repita a senha"
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            secureTextEntry
                            icon={<Ionicons name="lock-closed-outline" size={18} color={Colors.navy[400]} />}
                            error={
                                confirmPassword.length > 0 && confirmPassword !== password
                                    ? 'As senhas não conferem'
                                    : undefined
                            }
                        />

                        <View style={styles.termsRow}>
                            <TouchableOpacity style={styles.checkbox}>
                                <Ionicons name="checkbox" size={20} color={Colors.emerald[600]} />
                            </TouchableOpacity>
                            <Text style={styles.termsText}>
                                Li e aceito os{' '}
                                <Text style={styles.termsLink}>Termos de Uso</Text> e{' '}
                                <Text style={styles.termsLink}>Política de Privacidade</Text>
                            </Text>
                        </View>

                        {/* Visual error/success messages (works on web too) */}
                        {errorMsg ? (
                            <View style={styles.msgBox}>
                                <Ionicons name="alert-circle" size={20} color={Colors.danger[600]} />
                                <Text style={styles.msgError}>{errorMsg}</Text>
                            </View>
                        ) : null}
                        {successMsg ? (
                            <View style={[styles.msgBox, styles.msgBoxSuccess]}>
                                <Ionicons name="checkmark-circle" size={20} color={Colors.emerald[600]} />
                                <Text style={styles.msgSuccess}>{successMsg}</Text>
                            </View>
                        ) : null}

                        <Button
                            title="CRIAR CONTA"
                            onPress={handleRegister}
                            variant="secondary"
                            size="xl"
                            fullWidth
                            loading={loading}
                            style={styles.nextButton}
                        />

                        <TouchableOpacity onPress={() => setStep(1)}>
                            <Text style={styles.backStep}>← Voltar ao passo anterior</Text>
                        </TouchableOpacity>
                    </View>
                )}

                {/* Login Link */}
                <View style={styles.loginRow}>
                    <Text style={styles.loginText}>Já tem uma conta? </Text>
                    <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
                        <Text style={styles.loginLink}>Entrar</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    flex: { flex: 1, backgroundColor: '#FFFFFF' },
    container: {
        flexGrow: 1,
        paddingHorizontal: Spacing.xl,
        paddingTop: Spacing['3xl'],
        paddingBottom: Spacing['3xl'],
    },
    header: { marginBottom: Spacing.xl, zIndex: 10 },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#F3F4F6',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: Spacing.lg,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        zIndex: 20,
    },
    backIcon: { fontSize: 20, color: '#111827' },
    headerTitle: { ...TextStyles.h2, color: '#0A1C43', marginBottom: Spacing.xs },
    headerSubtitle: { ...TextStyles.body, color: '#1F2937' },
    progressBar: {
        height: 4,
        backgroundColor: '#E5E7EB',
        borderRadius: 2,
        marginTop: Spacing.xl,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        backgroundColor: Colors.emerald[500],
        borderRadius: 2,
    },
    stepText: {
        ...TextStyles.caption,
        color: '#374151',
        marginTop: Spacing.xs,
    },
    form: { marginBottom: Spacing.xl },
    sectionLabel: {
        ...TextStyles.label,
        color: '#1F2937',
        marginBottom: Spacing.md,
    },
    typeRow: {
        flexDirection: 'row',
        gap: Spacing.md,
        marginBottom: Spacing.xl,
    },
    typeCard: {
        flex: 1,
        padding: Spacing.base,
        borderRadius: BorderRadius.lg,
        backgroundColor: Colors.white,
        borderWidth: 1.5,
        borderColor: '#E5E7EB',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    typeCardActive: {
        borderColor: Colors.navy[500],
        backgroundColor: '#F3F4F6',
    },
    typeIcon: { fontSize: 28, marginBottom: Spacing.sm },
    typeLabel: {
        ...TextStyles.bodyMedium,
        color: '#1F2937',
        marginBottom: Spacing.xxs,
    },
    typeLabelActive: { color: Colors.navy[600], fontWeight: 'bold' },
    typeHint: { ...TextStyles.caption, color: LightTheme.text.tertiary },
    inputIcon: { fontSize: 18 },
    nextButton: { marginTop: Spacing.lg },
    strengthRow: {
        flexDirection: 'row',
        gap: 4,
        marginBottom: Spacing.sm,
        marginTop: -Spacing.sm,
    },
    strengthBar: {
        flex: 1,
        height: 3,
        borderRadius: 1.5,
    },
    passwordRules: { marginBottom: Spacing.lg },
    ruleText: {
        ...TextStyles.caption,
        color: LightTheme.text.tertiary,
        marginBottom: 2,
    },
    ruleOk: { color: Colors.emerald[600] },
    termsRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: Spacing.lg,
    },
    checkbox: { marginRight: Spacing.sm, marginTop: 2 },
    termsText: {
        ...TextStyles.bodySm,
        color: '#1F2937',
        flex: 1,
    },
    termsLink: { color: Colors.navy[600], fontWeight: '600' },
    backStep: {
        ...TextStyles.body,
        color: '#1F2937',
        textAlign: 'center',
        marginTop: Spacing.lg,
    },
    loginRow: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    loginText: { ...TextStyles.body, color: '#1F2937' },
    loginLink: {
        ...TextStyles.bodyMedium,
        color: Colors.emerald[600],
        fontWeight: '600',
    },
    msgBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.danger[50],
        borderWidth: 1,
        borderColor: Colors.danger[200],
        borderRadius: BorderRadius.md,
        padding: Spacing.md,
        marginBottom: Spacing.md,
        gap: Spacing.sm,
    },
    msgBoxSuccess: {
        backgroundColor: Colors.emerald[50],
        borderColor: Colors.emerald[200],
    },
    msgError: {
        ...TextStyles.bodySm,
        color: Colors.danger[700],
        flex: 1,
    },
    msgSuccess: {
        ...TextStyles.bodySm,
        color: Colors.emerald[700],
        flex: 1,
    },
});
