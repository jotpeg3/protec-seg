/**
 * PROTECT SEG — Forgot Password Screen
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
import { Colors, Spacing, TextStyles } from '../../src/theme';

export default function ForgotPasswordScreen() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleResetPassword = async () => {
        if (!email) {
            Alert.alert('Erro', 'Por favor, informe seu e-mail.');
            return;
        }

        setLoading(true);
        try {
            await authService.resetPassword(email);
            setLoading(false);
            Alert.alert(
                'E-mail Enviado!',
                'Se este e-mail estiver cadastrado, você receberá um link para redefinir sua senha.',
                [{ text: 'OK', onPress: () => router.back() }]
            );
        } catch (error: any) {
            setLoading(false);
            console.error('Reset password error:', error);
            Alert.alert('Erro', error.message || 'Não foi possível enviar o e-mail de recuperação.');
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.flex}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView
                style={styles.flex}
                contentContainerStyle={styles.container}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => router.back()}
                        style={styles.backButton}
                    >
                        <Text style={styles.backIcon}>←</Text>
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Recuperar Senha</Text>
                    <Text style={styles.headerSubtitle}>
                        Informe seu e-mail cadastrado para receber as instruções de recuperação.
                    </Text>
                </View>

                <View style={styles.form}>
                    <Input
                        label="E-mail"
                        placeholder="seu@email.com"
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        icon={<Ionicons name="mail-outline" size={18} color={Colors.navy[400]} />}
                    />

                    <Button
                        title="ENVIAR INSTRUÇÕES"
                        onPress={handleResetPassword}
                        variant="primary"
                        size="xl"
                        fullWidth
                        loading={loading}
                        style={styles.button}
                    />
                </View>

                <TouchableOpacity
                    onPress={() => router.back()}
                    style={styles.footer}
                >
                    <Text style={styles.footerText}>Voltar para o Login</Text>
                </TouchableOpacity>
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
    },
    header: { marginBottom: Spacing['2xl'] },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#F3F4F6',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: Spacing.lg,
    },
    backIcon: { fontSize: 20, color: '#111827' },
    headerTitle: { ...TextStyles.h2, color: '#0A1C43', marginBottom: Spacing.xs },
    headerSubtitle: { ...TextStyles.body, color: '#4B5563' },
    form: { marginBottom: Spacing.xl },
    inputIcon: { fontSize: 16 },
    button: { marginTop: Spacing.lg },
    footer: { marginTop: 'auto', paddingBottom: Spacing.xl },
    footerText: {
        ...TextStyles.bodyMedium,
        color: Colors.emerald[600],
        textAlign: 'center',
        fontWeight: '600',
    },
});
