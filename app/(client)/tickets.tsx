/**
 * PROTECT SEG — Tickets Screen (Client)
 */

import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    FlatList,
    Platform,
    StatusBar,
    Image,
} from 'react-native';
import { router } from 'expo-router';
import { Colors, LightTheme, Spacing, TextStyles, BorderRadius } from '../../src/theme';
import { Card, Badge, Button } from '../../src/components/ui';

type TicketStatus = 'all' | 'open' | 'in_progress' | 'resolved';

const MOCK_TICKETS = [
    {
        id: 'TK-001',
        type: 'Invasão',
        description: 'Pessoa suspeita rondando o portão',
        status: 'in_progress',
        urgency: 'high',
        date: '25 Mar 2026',
        time: '14:30',
        patrol: 'Carlos Silva',
        patrolRating: 4.8,
        eta: '3 min',
    },
    {
        id: 'TK-002',
        type: 'Alarme disparado',
        description: 'Sensor da sala ativou sem motivo aparente',
        status: 'open',
        urgency: 'medium',
        date: '24 Mar 2026',
        time: '22:15',
        patrol: null,
        patrolRating: null,
        eta: null,
    },
    {
        id: 'TK-003',
        type: 'Ronda programada',
        description: 'Ronda noturna concluída com sucesso',
        status: 'resolved',
        urgency: 'low',
        date: '23 Mar 2026',
        time: '08:00',
        patrol: 'Ana Oliveira',
        patrolRating: 4.9,
        eta: null,
    },
    {
        id: 'TK-004',
        type: 'Roubo',
        description: 'Tentativa de furto no estacionamento',
        status: 'resolved',
        urgency: 'critical',
        date: '20 Mar 2026',
        time: '03:45',
        patrol: 'Marco Souza',
        patrolRating: 4.7,
        eta: null,
    },
];

const statusConfig = {
    open: { label: 'Aberto', variant: 'info' as const },
    in_progress: { label: 'Em andamento', variant: 'warning' as const },
    resolved: { label: 'Resolvido', variant: 'success' as const },
    cancelled: { label: 'Cancelado', variant: 'danger' as const },
};

const urgencyConfig = {
    low: { label: '🟢 Baixa', color: Colors.emerald[500] },
    medium: { label: '🟡 Média', color: Colors.warning[500] },
    high: { label: '🟠 Alta', color: Colors.warning[600] },
    critical: { label: '🔴 Crítica', color: Colors.danger[500] },
};

export default function TicketsScreen() {
    const [filter, setFilter] = useState<TicketStatus>('all');

    const filtered = MOCK_TICKETS.filter(
        (t) => filter === 'all' || t.status === filter
    );

    const filters: { key: TicketStatus; label: string; count: number }[] = [
        { key: 'all', label: 'Todos', count: MOCK_TICKETS.length },
        { key: 'open', label: 'Abertos', count: MOCK_TICKETS.filter((t) => t.status === 'open').length },
        { key: 'in_progress', label: 'Em andamento', count: MOCK_TICKETS.filter((t) => t.status === 'in_progress').length },
        { key: 'resolved', label: 'Resolvidos', count: MOCK_TICKETS.filter((t) => t.status === 'resolved').length },
    ];

    return (
        <View style={styles.container}>
            {/* Header Background */}
            <View style={styles.headerBackground} />

            <View style={styles.headerBar}>
                <View style={styles.headerCenter}>
                    <View style={[styles.brandShieldContainer, { backgroundColor: '#E0E2E5', borderRadius: 0, padding: 4 }]}>
                        <Image
                            source={require('../../assets/images/logo.png')}
                            style={{ height: 60, width: 60 }}
                            resizeMode="contain"
                        />
                    </View>
                    <Text style={styles.brandTitle}>PROTECT SEG</Text>
                </View>
            </View>

            {/* Content Area */}
            <View style={styles.header}>
                <Text style={styles.titleText}>Meus Chamados</Text>
                <Button
                    title="+ Novo"
                    onPress={() => { }}
                    variant="primary"
                    size="sm"
                    style={{ backgroundColor: '#22C55E' }}
                />
            </View>

            {/* Filter Tabs */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.filterScroll}
                contentContainerStyle={styles.filterContainer}
            >
                {filters.map((f) => (
                    <TouchableOpacity
                        key={f.key}
                        style={[styles.filterTab, filter === f.key && styles.filterTabActive]}
                        onPress={() => setFilter(f.key)}
                    >
                        <Text
                            style={[
                                styles.filterText,
                                filter === f.key && styles.filterTextActive,
                            ]}
                        >
                            {f.label}
                        </Text>
                        <View
                            style={[
                                styles.filterBadge,
                                filter === f.key && styles.filterBadgeActive,
                            ]}
                        >
                            <Text
                                style={[
                                    styles.filterCount,
                                    filter === f.key && styles.filterCountActive,
                                ]}
                            >
                                {f.count}
                            </Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Tickets List */}
            <FlatList
                data={filtered}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <Card variant="default" padding="base" style={styles.ticketCard}>
                        <View style={styles.ticketHeader}>
                            <View style={styles.ticketIdRow}>
                                <Text style={styles.ticketId}>{item.id}</Text>
                                <Badge
                                    label={urgencyConfig[item.urgency as keyof typeof urgencyConfig]?.label || ''}
                                    variant={
                                        item.urgency === 'critical'
                                            ? 'danger'
                                            : item.urgency === 'high'
                                                ? 'warning'
                                                : 'default'
                                    }
                                    size="sm"
                                />
                            </View>
                            <Badge
                                label={statusConfig[item.status as keyof typeof statusConfig]?.label || ''}
                                variant={statusConfig[item.status as keyof typeof statusConfig]?.variant || 'default'}
                                dot
                                size="md"
                            />
                        </View>

                        <Text style={styles.ticketType}>{item.type}</Text>
                        <Text style={styles.ticketDesc}>{item.description}</Text>

                        <View style={styles.ticketFooter}>
                            <Text style={styles.ticketDate}>📅 {item.date} • {item.time}</Text>
                            {item.patrol && (
                                <Text style={styles.ticketPatrol}>
                                    🏍️ {item.patrol} {item.patrolRating && `⭐${item.patrolRating}`}
                                </Text>
                            )}
                            {item.eta && (
                                <View style={styles.etaBadge}>
                                    <Text style={styles.etaText}>ETA: {item.eta}</Text>
                                </View>
                            )}
                        </View>
                    </Card>
                )}
                ListEmptyComponent={
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyIcon}>📋</Text>
                        <Text style={styles.emptyText}>Nenhum chamado encontrado</Text>
                        <Text style={styles.emptyHint}>
                            Seus chamados aparecerão aqui
                        </Text>
                    </View>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F8FA',
    },
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
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: Spacing.xl,
        marginTop: 20,
        marginBottom: Spacing.lg,
        zIndex: 11,
    },
    titleText: { ...TextStyles.h2, color: '#FFFFFF' },
    filterScroll: { maxHeight: 48, marginBottom: Spacing.md },
    filterContainer: {
        paddingHorizontal: Spacing.xl,
        gap: Spacing.sm,
    },
    filterTab: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.sm,
        borderRadius: BorderRadius.full,
        backgroundColor: Colors.white,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    filterTabActive: {
        backgroundColor: Colors.navy[500],
        borderColor: Colors.navy[500],
    },
    filterText: {
        ...TextStyles.bodySm,
        color: '#1F2937',
        marginRight: Spacing.xs,
    },
    filterTextActive: { color: Colors.white, fontWeight: '600' },
    filterBadge: {
        backgroundColor: '#E5E7EB',
        borderRadius: 10,
        paddingHorizontal: 6,
        paddingVertical: 1,
    },
    filterBadgeActive: { backgroundColor: Colors.navy[400] },
    filterCount: {
        ...TextStyles.caption,
        color: '#1F2937',
        fontWeight: '700',
    },
    filterCountActive: { color: Colors.white },
    listContent: {
        paddingHorizontal: Spacing.xl,
        paddingBottom: Spacing['5xl'],
    },
    ticketCard: {
        marginBottom: Spacing.md,
        backgroundColor: Colors.white,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 6,
        elevation: 3,
    },
    ticketHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: Spacing.sm,
    },
    ticketIdRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.sm,
    },
    ticketId: {
        ...TextStyles.caption,
        color: Colors.navy[500],
        fontWeight: '700',
        letterSpacing: 1,
    },
    ticketType: {
        ...TextStyles.bodyMedium,
        color: '#111827',
        fontWeight: 'bold',
        marginBottom: 2,
    },
    ticketDesc: {
        ...TextStyles.bodySm,
        color: '#1F2937',
        marginBottom: Spacing.md,
    },
    ticketFooter: {
        borderTopWidth: 1,
        borderTopColor: '#F3F4F6',
        paddingTop: Spacing.sm,
        gap: 4,
    },
    ticketDate: {
        ...TextStyles.caption,
        color: '#374151',
    },
    ticketPatrol: {
        ...TextStyles.caption,
        color: '#374151',
        fontWeight: '600',
    },
    etaBadge: {
        alignSelf: 'flex-start',
        backgroundColor: Colors.emerald[500] + '20',
        borderRadius: BorderRadius.sm,
        paddingHorizontal: 8,
        paddingVertical: 2,
        marginTop: 2,
    },
    etaText: {
        ...TextStyles.caption,
        color: Colors.emerald[600],
        fontWeight: '700',
    },
    emptyState: {
        alignItems: 'center',
        paddingVertical: Spacing['5xl'],
    },
    emptyIcon: { fontSize: 48, marginBottom: Spacing.md },
    emptyText: {
        ...TextStyles.bodyMedium,
        color: '#111827',
        marginBottom: Spacing.xs,
        fontWeight: '700',
    },
    emptyHint: {
        ...TextStyles.bodySm,
        color: '#4B5563',
    },
});
