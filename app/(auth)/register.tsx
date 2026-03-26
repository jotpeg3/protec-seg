/**
 * PROTECT SEG — Register Screen
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
} from 'react-native';
import { router } from 'expo-router';
import { Colors, LightTheme, Spacing, TextStyles, BorderRadius } from '../../src/theme';
import { Button, Input } from '../../src/components/ui';

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

    const handleRegister = async () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            router.replace('/(client)');
        }, 2000);
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
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <ScrollView
                style={styles.flex}
                contentContainerStyle={styles.container}
                keyboardShouldPersistTaps="handled"
            >
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => router.back()}
                        style={styles.backButton}
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
                                <Text style={styles.typeIcon}>👤</Text>
                                <Text style={[styles.typeLabel, accountType === 'cpf' && styles.typeLabelActive]}>
                                    Pessoa Física
                                </Text>
                                <Text style={styles.typeHint}>CPF</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.typeCard, accountType === 'cnpj' && styles.typeCardActive]}
                                onPress={() => setAccountType('cnpj')}
                            >
                                <Text style={styles.typeIcon}>🏢</Text>
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
                            icon={<Text style={styles.inputIcon}>👤</Text>}
                        />

                        <Input
                            label={accountType === 'cpf' ? 'CPF' : 'CNPJ'}
                            placeholder={accountType === 'cpf' ? '000.000.000-00' : '00.000.000/0001-00'}
                            value={cpfCnpj}
                            onChangeText={setCpfCnpj}
                            keyboardType="numeric"
                            maxLength={accountType === 'cpf' ? 14 : 18}
                            icon={<Text style={styles.inputIcon}>📋</Text>}
                        />

                        <Input
                            label="E-mail"
                            placeholder="seu@email.com"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            icon={<Text style={styles.inputIcon}>✉️</Text>}
                        />

                        <Input
                            label="Telefone"
                            placeholder="(00) 00000-0000"
                            value={phone}
                            onChangeText={(text) => setPhone(formatPhone(text))}
                            keyboardType="phone-pad"
                            maxLength={15}
                            icon={<Text style={styles.inputIcon}>📱</Text>}
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
                            icon={<Text style={styles.inputIcon}>🔒</Text>}
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
                            icon={<Text style={styles.inputIcon}>🔒</Text>}
                            error={
                                confirmPassword.length > 0 && confirmPassword !== password
                                    ? 'As senhas não conferem'
                                    : undefined
                            }
                        />

                        <View style={styles.termsRow}>
                            <TouchableOpacity style={styles.checkbox}>
                                <Text>☑️</Text>
                            </TouchableOpacity>
                            <Text style={styles.termsText}>
                                Li e aceito os{' '}
                                <Text style={styles.termsLink}>Termos de Uso</Text> e{' '}
                                <Text style={styles.termsLink}>Política de Privacidade</Text>
                            </Text>
                        </View>

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
    header: { marginBottom: Spacing.xl },
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
});
