/**
 * PROTECT SEG — Patrol History
 */

import React from 'react';
import { Image, Platform, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { Card } from '../../src/components/ui';
import { BorderRadius, Colors, Spacing, TextStyles } from '../../src/theme';

const MOCK_HISTORY = [
    { id: 'TK-098', type: 'SOS', client: 'João Silva', date: '25 Mar', time: '14:30', rating: 5, earnings: 'R$35' },
    { id: 'TK-097', type: 'Invasão', client: 'Maria Santos', date: '25 Mar', time: '10:15', rating: 4, earnings: 'R$30' },
    { id: 'TK-096', type: 'Ronda', client: 'Comércio ABC', date: '24 Mar', time: '22:00', rating: 5, earnings: 'R$25' },
    { id: 'TK-095', type: 'Alarme', client: 'Ana Oliveira', date: '24 Mar', time: '16:40', rating: 5, earnings: 'R$30' },
    { id: 'TK-094', type: 'Invasão', client: 'Pedro Costa', date: '23 Mar', time: '03:20', rating: 4, earnings: 'R$40' },
];

export default function HistoryScreen() {
    const totalEarnings = 'R$ 284,00';
    const totalCalls = MOCK_HISTORY.length;
    const avgRating = (MOCK_HISTORY.reduce((a, b) => a + b.rating, 0) / MOCK_HISTORY.length).toFixed(1);

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

            <Text style={styles.titleText}>Meu Histórico</Text>

            {/* Summary Cards */}
            <View style={styles.summaryRow}>
                <View style={[styles.summaryCard, { backgroundColor: Colors.emerald[500] + '15' }]}>
                    <Text style={styles.summaryIcon}>💰</Text>
                    <Text style={styles.summaryValue}>{totalEarnings}</Text>
                    <Text style={styles.summaryLabel}>Ganhos da semana</Text>
                </View>
                <View style={[styles.summaryCard, { backgroundColor: Colors.navy[500] + '20' }]}>
                    <Text style={styles.summaryIcon}>📋</Text>
                    <Text style={styles.summaryValue}>{totalCalls}</Text>
                    <Text style={styles.summaryLabel}>Atendimentos</Text>
                </View>
                <View style={[styles.summaryCard, { backgroundColor: Colors.warning[500] + '15' }]}>
                    <Text style={styles.summaryIcon}>⭐</Text>
                    <Text style={styles.summaryValue}>{avgRating}</Text>
                    <Text style={styles.summaryLabel}>Avaliação</Text>
                </View>
            </View>

            {/* History List */}
            <Text style={styles.sectionTitle}>Chamados concluídos</Text>
            {MOCK_HISTORY.map((item) => (
                <Card key={item.id} variant="default" padding="base" style={styles.historyCard}>
                    <View style={styles.historyRow}>
                        <View style={styles.historyInfo}>
                            <View style={styles.historyHeader}>
                                <Text style={styles.historyType}>{item.type}</Text>
                                <Text style={styles.historyId}>{item.id}</Text>
                            </View>
                            <Text style={styles.historyClient}>👤 {item.client}</Text>
                            <Text style={styles.historyDate}>📅 {item.date} • {item.time}</Text>
                        </View>
                        <View style={styles.historyRight}>
                            <Text style={styles.historyEarnings}>{item.earnings}</Text>
                            <Text style={styles.historyRating}>
                                {'⭐'.repeat(item.rating)}
                            </Text>
                        </View>
                    </View>
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
    summaryRow: {
        flexDirection: 'row',
        gap: Spacing.sm,
        marginBottom: Spacing.xl,
    },
    summaryCard: {
        flex: 1,
        borderRadius: BorderRadius.lg,
        padding: Spacing.md,
        alignItems: 'center',
    },
    summaryIcon: { fontSize: 24, marginBottom: 4 },
    summaryValue: { ...TextStyles.h4, color: Colors.navy[600], marginBottom: 2 },
    summaryLabel: { ...TextStyles.caption, color: '#1F2937', fontWeight: '700', textAlign: 'center' },
    sectionTitle: { ...TextStyles.h4, color: '#1E3A8A', marginBottom: Spacing.md },
    historyCard: {
        marginBottom: Spacing.sm,
        backgroundColor: '#FFFFFF',
        borderColor: '#E5E7EB',
        borderWidth: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    historyRow: { flexDirection: 'row', justifyContent: 'space-between' },
    historyInfo: { flex: 1 },
    historyHeader: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, marginBottom: 4 },
    historyType: { ...TextStyles.bodyMedium, color: Colors.navy[600], fontWeight: '600' },
    historyId: { ...TextStyles.caption, color: '#374151' },
    historyClient: { ...TextStyles.bodySm, color: '#1F2937', fontWeight: '600', marginBottom: 2 },
    historyDate: { ...TextStyles.caption, color: '#374151' },
    historyRight: { alignItems: 'flex-end' },
    historyEarnings: { ...TextStyles.bodyMedium, color: Colors.emerald[600], fontWeight: '700', marginBottom: 4 },
    historyRating: { fontSize: 10 },
});
