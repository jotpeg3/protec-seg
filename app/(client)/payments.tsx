/**
 * PROTEC SEG — Payments Screen (Client)
 */

import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { Badge, Button, Card } from '../../src/components/ui';
import { BorderRadius, Colors, Spacing, TextStyles } from '../../src/theme';

const MOCK_INVOICES = [
    { id: 'INV-001', month: 'Março 2026', amount: 99.0, status: 'pending', dueDate: '05 Abr 2026', plan: 'Premium' },
    { id: 'INV-002', month: 'Fevereiro 2026', amount: 99.0, status: 'paid', dueDate: '05 Mar 2026', paidDate: '03 Mar 2026', plan: 'Premium' },
    { id: 'INV-003', month: 'Janeiro 2026', amount: 49.0, status: 'paid', dueDate: '05 Fev 2026', paidDate: '01 Fev 2026', plan: 'Básico' },
];

export default function PaymentsScreen() {
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

            <Text style={styles.titleText}>Faturas & Pagamentos</Text>

            {/* Current Plan */}
            <Card variant="elevated" padding="xl" style={styles.planCard}>
                <View style={styles.planRow}>
                    <View>
                        <Text style={styles.planLabel}>PLANO ATUAL</Text>
                        <Text style={styles.planName}>Premium 🛡️</Text>
                        <Text style={styles.planPrice}>
                            R$ 99<Text style={styles.planPeriod}>/mês</Text>
                        </Text>
                    </View>
                    <Badge label="ATIVO" variant="success" size="md" dot />
                </View>
                <View style={styles.planFeatures}>
                    {['Monitoramento 24h', 'Resposta prioritária', 'Chat ilimitado', 'Relatórios mensais'].map((f, i) => (
                        <Text key={i} style={styles.planFeature}>✓ {f}</Text>
                    ))}
                </View>
                <Button
                    title="Gerenciar Plano"
                    onPress={() => { }}
                    variant="outline"
                    size="md"
                    fullWidth
                    style={styles.planButton}
                />
            </Card>

            {/* Payment Methods */}
            <Text style={styles.sectionTitle}>Formas de pagamento</Text>
            <View style={styles.paymentMethods}>
                {[
                    { icon: '📱', label: 'Pix', desc: 'Pagamento instantâneo' },
                    { icon: '💳', label: 'Cartão de Crédito', desc: '•••• 4242' },
                    { icon: '📄', label: 'Boleto', desc: 'Vencimento em 3 dias' },
                ].map((method, i) => (
                    <TouchableOpacity key={i} style={styles.paymentCard} activeOpacity={0.7}>
                        <Text style={styles.paymentIcon}>{method.icon}</Text>
                        <View style={styles.paymentInfo}>
                            <Text style={styles.paymentLabel}>{method.label}</Text>
                            <Text style={styles.paymentDesc}>{method.desc}</Text>
                        </View>
                        <Text style={styles.paymentArrow}>›</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Invoices */}
            <Text style={styles.sectionTitle}>Histórico de faturas</Text>
            {MOCK_INVOICES.map((inv) => (
                <Card key={inv.id} variant="default" padding="base" style={styles.invoiceCard}>
                    <View style={styles.invoiceHeader}>
                        <View>
                            <Text style={styles.invoiceMonth}>{inv.month}</Text>
                            <Text style={styles.invoiceId}>{inv.id} • {inv.plan}</Text>
                        </View>
                        <Badge
                            label={inv.status === 'paid' ? 'Pago' : 'Pendente'}
                            variant={inv.status === 'paid' ? 'success' : 'warning'}
                            dot
                        />
                    </View>
                    <View style={styles.invoiceFooter}>
                        <Text style={styles.invoiceAmount}>
                            R$ {inv.amount.toFixed(2)}
                        </Text>
                        <Text style={styles.invoiceDate}>
                            {inv.status === 'paid'
                                ? `Pago em ${inv.paidDate}`
                                : `Venc: ${inv.dueDate}`}
                        </Text>
                    </View>
                    {inv.status === 'pending' && (
                        <Button
                            title="Pagar agora"
                            onPress={() => { }}
                            variant="secondary"
                            size="sm"
                            fullWidth
                            style={styles.payButton}
                        />
                    )}
                </Card>
            ))}
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
    planCard: {
        backgroundColor: Colors.white,
        borderColor: '#E5E7EB',
        borderWidth: 1,
        marginBottom: Spacing.xl,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 6,
        elevation: 3,
    },
    planRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: Spacing.lg,
    },
    planLabel: { ...TextStyles.label, color: '#374151' },
    planName: { ...TextStyles.h3, color: '#111827', marginTop: 4 },
    planPrice: { ...TextStyles.h2, color: Colors.emerald[600], marginTop: 4 },
    planPeriod: { ...TextStyles.body, color: '#1F2937' },
    planFeatures: { marginBottom: Spacing.lg },
    planFeature: {
        ...TextStyles.bodySm,
        color: '#1F2937',
        marginBottom: 4,
    },
    planButton: { borderColor: Colors.navy[500] },
    sectionTitle: {
        ...TextStyles.h4,
        color: '#1E3A8A',
        marginBottom: Spacing.md,
    },
    paymentMethods: { marginBottom: Spacing.xl },
    paymentCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.white,
        borderRadius: BorderRadius.lg,
        padding: Spacing.md,
        marginBottom: Spacing.sm,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    paymentIcon: { fontSize: 24, marginRight: Spacing.md },
    paymentInfo: { flex: 1 },
    paymentLabel: { ...TextStyles.bodyMedium, color: '#111827' },
    paymentDesc: { ...TextStyles.caption, color: '#374151' },
    paymentArrow: { fontSize: 24, color: '#1F2937' },
    invoiceCard: {
        marginBottom: Spacing.sm,
        backgroundColor: Colors.white,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 6,
        elevation: 3,
    },
    invoiceHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: Spacing.sm,
    },
    invoiceMonth: { ...TextStyles.bodyMedium, color: '#111827', fontWeight: 'bold' },
    invoiceId: { ...TextStyles.caption, color: '#374151', marginTop: 2 },
    invoiceFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    invoiceAmount: { ...TextStyles.h4, color: '#111827' },
    invoiceDate: { ...TextStyles.caption, color: '#374151' },
    payButton: { marginTop: Spacing.md },
});
