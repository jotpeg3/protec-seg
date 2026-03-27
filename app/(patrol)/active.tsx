/**
 * PROTECT SEG — Active Ticket (Patrol)
 */

import React, { useState } from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { Badge, Button, Card } from '../../src/components/ui';
import { BorderRadius, Colors, LightTheme, Spacing, TextStyles } from '../../src/theme';

type TicketPhase = 'en_route' | 'arrived' | 'resolving';

export default function ActiveTicketScreen() {
    const [phase, setPhase] = useState<TicketPhase>('en_route');

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

            <Text style={styles.titleText}>Chamado Ativo</Text>

            {/* Status Progress */}
            <View style={styles.progressRow}>
                {[
                    { label: 'Aceito', done: true },
                    { label: 'A caminho', done: phase !== 'en_route' || true },
                    { label: 'No local', done: phase === 'arrived' || phase === 'resolving' },
                    { label: 'Concluído', done: false },
                ].map((step, i) => (
                    <View key={i} style={styles.progressStep}>
                        <View style={[styles.progressDot, step.done && styles.progressDotDone]} />
                        <Text style={[styles.progressLabel, step.done && styles.progressLabelDone]}>
                            {step.label}
                        </Text>
                    </View>
                ))}
            </View>

            {/* Map Placeholder */}
            <View style={styles.mapArea}>
                <Text style={styles.mapIcon}>🗺️</Text>
                <Text style={styles.mapText}>Mapa com rota para o cliente</Text>
                <View style={styles.mapInfo}>
                    <View style={styles.mapInfoItem}>
                        <Text style={styles.mapInfoValue}>2.1 km</Text>
                        <Text style={styles.mapInfoLabel}>Distância</Text>
                    </View>
                    <View style={styles.mapInfoItem}>
                        <Text style={styles.mapInfoValue}>5 min</Text>
                        <Text style={styles.mapInfoLabel}>ETA</Text>
                    </View>
                </View>
            </View>

            {/* Client Info Card */}
            <Card variant="default" padding="base" style={styles.clientCard}>
                <Text style={styles.cardTitle}>Informações do Cliente</Text>
                <View style={styles.clientRow}>
                    <View style={styles.clientAvatar}>
                        <Text style={styles.clientAvatarText}>JS</Text>
                    </View>
                    <View style={styles.clientInfo}>
                        <Text style={styles.clientName}>João Silva</Text>
                        <Text style={styles.clientAddress}>
                            📍 Rua das Palmeiras, 234 - Paulista
                        </Text>
                    </View>
                </View>
                <View style={styles.clientActions}>
                    <Button title="💬 Chat" onPress={() => { }} variant="outline" size="sm" style={{ flex: 1, marginRight: 8 }} />
                    <Button title="📞 Ligar" onPress={() => { }} variant="primary" size="sm" style={{ flex: 1 }} />
                </View>
            </Card>

            {/* Ticket Details */}
            <Card variant="default" padding="base" style={styles.detailCard}>
                <Text style={styles.cardTitle}>Detalhes do chamado</Text>
                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Tipo</Text>
                    <Text style={styles.detailValue}>SOS - Emergência</Text>
                </View>
                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Urgência</Text>
                    <Badge label="🔴 Crítica" variant="danger" size="sm" />
                </View>
                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Descrição</Text>
                    <Text style={styles.detailValue}>Emergência pessoal ativada</Text>
                </View>
                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Horário</Text>
                    <Text style={styles.detailValue}>14:30 - 25 Mar 2026</Text>
                </View>
            </Card>

            {/* Phase Actions */}
            <View style={styles.phaseActions}>
                {phase === 'en_route' && (
                    <Button
                        title="📍 CHEGUEI NO LOCAL"
                        onPress={() => setPhase('arrived')}
                        variant="secondary"
                        size="xl"
                        fullWidth
                    />
                )}
                {phase === 'arrived' && (
                    <>
                        <Button
                            title="📷 Enviar Foto/Vídeo"
                            onPress={() => { }}
                            variant="outline"
                            size="lg"
                            fullWidth
                            style={{ marginBottom: Spacing.sm }}
                        />
                        <Button
                            title="✅ RESOLVER CHAMADO"
                            onPress={() => setPhase('resolving')}
                            variant="secondary"
                            size="xl"
                            fullWidth
                        />
                    </>
                )}
                {phase === 'resolving' && (
                    <Card variant="elevated" padding="lg" style={styles.resolveCard}>
                        <Text style={styles.resolveIcon}>✅</Text>
                        <Text style={styles.resolveTitle}>Chamado resolvido!</Text>
                        <Text style={styles.resolveText}>
                            Relatório será gerado automaticamente
                        </Text>
                        <Button
                            title="Voltar ao feed"
                            onPress={() => setPhase('en_route')}
                            variant="primary"
                            size="lg"
                            fullWidth
                            style={{ marginTop: Spacing.lg }}
                        />
                    </Card>
                )}
            </View>
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
    progressRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: Spacing.xl,
    },
    progressStep: { alignItems: 'center', flex: 1 },
    progressDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#E5E7EB',
        marginBottom: 4,
    },
    progressDotDone: { backgroundColor: Colors.emerald[600] },
    progressLabel: { ...TextStyles.caption, color: LightTheme.text.tertiary, textAlign: 'center' },
    progressLabelDone: { color: Colors.emerald[600] },
    mapArea: {
        height: 200,
        backgroundColor: '#FFFFFF',
        borderRadius: BorderRadius.xl,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        marginBottom: Spacing.lg,
    },
    mapIcon: { fontSize: 40, marginBottom: Spacing.sm },
    mapText: { ...TextStyles.bodySm, color: LightTheme.text.tertiary },
    mapInfo: {
        flexDirection: 'row',
        gap: Spacing.xl,
        marginTop: Spacing.md,
    },
    mapInfoItem: { alignItems: 'center' },
    mapInfoValue: { ...TextStyles.bodyMedium, color: Colors.emerald[600], fontWeight: '700' },
    mapInfoLabel: { ...TextStyles.caption, color: LightTheme.text.tertiary },
    clientCard: {
        marginBottom: Spacing.md,
        backgroundColor: '#FFFFFF',
        borderColor: '#E5E7EB',
        borderWidth: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    cardTitle: { ...TextStyles.bodyMedium, color: '#1E3A8A', marginBottom: Spacing.md, fontWeight: '700' },
    clientRow: { flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.md },
    clientAvatar: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: Colors.navy[500],
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: Spacing.md,
    },
    clientAvatarText: { ...TextStyles.bodyMedium, color: Colors.white, fontWeight: '700' },
    clientInfo: { flex: 1 },
    clientName: { ...TextStyles.bodyMedium, color: Colors.navy[600] },
    clientAddress: { ...TextStyles.caption, color: LightTheme.text.tertiary, marginTop: 2 },
    clientActions: { flexDirection: 'row' },
    detailCard: {
        marginBottom: Spacing.xl,
        backgroundColor: '#FFFFFF',
        borderColor: '#E5E7EB',
        borderWidth: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: Spacing.sm,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },
    detailLabel: { ...TextStyles.bodySm, color: LightTheme.text.tertiary },
    detailValue: { ...TextStyles.bodySm, color: Colors.navy[600], fontWeight: '500' },
    phaseActions: {},
    resolveCard: {
        backgroundColor: Colors.emerald[500] + '10',
        borderColor: Colors.emerald[500] + '30',
        borderWidth: 1,
        alignItems: 'center',
    },
    resolveIcon: { fontSize: 48, marginBottom: Spacing.sm },
    resolveTitle: { ...TextStyles.h3, color: Colors.emerald[600] },
    resolveText: { ...TextStyles.body, color: LightTheme.text.secondary, marginTop: 4 },
});
