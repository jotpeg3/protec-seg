/**
 * PROTECT SEG — SOS Emergency Screen
 */

import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Animated,
    Dimensions,
    Alert,
    Vibration,
} from 'react-native';
import { router } from 'expo-router';
import { Colors, DarkTheme, Spacing, TextStyles, BorderRadius, Shadow } from '../../src/theme';
import { Button, Card } from '../../src/components/ui';

const { width, height } = Dimensions.get('window');

type SOSState = 'idle' | 'confirming' | 'sending' | 'sent' | 'patrol_found';

export default function SOSScreen() {
    const [sosState, setSosState] = useState<SOSState>('idle');
    const [countdown, setCountdown] = useState(3);
    const pulseAnim = useRef(new Animated.Value(1)).current;
    const rippleAnim = useRef(new Animated.Value(0)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Pulsing red background
        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 1.15,
                    duration: 800,
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 800,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, []);

    useEffect(() => {
        if (sosState === 'confirming') {
            const timer = setInterval(() => {
                setCountdown((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        triggerSOS();
                        return 0;
                    }
                    Vibration.vibrate(200);
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [sosState]);

    useEffect(() => {
        if (sosState === 'sent') {
            // Simulate finding patrol
            setTimeout(() => {
                setSosState('patrol_found');
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 600,
                    useNativeDriver: true,
                }).start();
            }, 3000);
        }
    }, [sosState]);

    const handleSOSPress = () => {
        setSosState('confirming');
        setCountdown(3);
        Vibration.vibrate([0, 100, 100, 100]);

        // Ripple animation
        Animated.loop(
            Animated.sequence([
                Animated.timing(rippleAnim, {
                    toValue: 1,
                    duration: 1500,
                    useNativeDriver: true,
                }),
                Animated.timing(rippleAnim, {
                    toValue: 0,
                    duration: 0,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    };

    const cancelSOS = () => {
        setSosState('idle');
        setCountdown(3);
        rippleAnim.stopAnimation();
        rippleAnim.setValue(0);
    };

    const triggerSOS = () => {
        setSosState('sending');
        Vibration.vibrate(500);

        // Simulate sending
        setTimeout(() => {
            setSosState('sent');
        }, 2000);
    };

    return (
        <View style={styles.container}>
            {/* Back Button */}
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => {
                    if (sosState === 'idle') router.back();
                    else cancelSOS();
                }}
            >
                <Text style={styles.backIcon}>←</Text>
            </TouchableOpacity>

            {sosState === 'idle' && (
                <>
                    <Text style={styles.title}>Emergência SOS</Text>
                    <Text style={styles.subtitle}>
                        Pressione o botão para enviar alerta{'\n'}para patrulheiros próximos
                    </Text>

                    {/* Main SOS Button */}
                    <View style={styles.sosCenter}>
                        <Animated.View
                            style={[styles.sosGlow, { transform: [{ scale: pulseAnim }] }]}
                        />
                        <TouchableOpacity
                            style={styles.sosButton}
                            onPress={handleSOSPress}
                            activeOpacity={0.7}
                        >
                            <Text style={styles.sosEmoji}>🚨</Text>
                            <Text style={styles.sosText}>SOS</Text>
                            <Text style={styles.sosHint}>PRESSIONE</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.infoCards}>
                        <View style={styles.infoCard}>
                            <Text style={styles.infoIcon}>📍</Text>
                            <Text style={styles.infoText}>GPS será enviado automaticamente</Text>
                        </View>
                        <View style={styles.infoCard}>
                            <Text style={styles.infoIcon}>🎤</Text>
                            <Text style={styles.infoText}>Gravação de áudio automática</Text>
                        </View>
                        <View style={styles.infoCard}>
                            <Text style={styles.infoIcon}>👮</Text>
                            <Text style={styles.infoText}>5 patrulheiros em raio de 5km</Text>
                        </View>
                    </View>
                </>
            )}

            {sosState === 'confirming' && (
                <View style={styles.confirmContainer}>
                    {/* Ripple circles */}
                    <Animated.View
                        style={[
                            styles.ripple,
                            {
                                opacity: rippleAnim.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0.6, 0],
                                }),
                                transform: [
                                    {
                                        scale: rippleAnim.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [1, 3],
                                        }),
                                    },
                                ],
                            },
                        ]}
                    />
                    <View style={styles.countdownCircle}>
                        <Text style={styles.countdownNumber}>{countdown}</Text>
                    </View>
                    <Text style={styles.confirmText}>Enviando SOS em...</Text>
                    <Text style={styles.confirmHint}>Toque em cancelar para interromper</Text>

                    <Button
                        title="CANCELAR"
                        onPress={cancelSOS}
                        variant="outline"
                        size="lg"
                        style={styles.cancelButton}
                    />
                </View>
            )}

            {sosState === 'sending' && (
                <View style={styles.sendingContainer}>
                    <View style={styles.sendingCircle}>
                        <Text style={styles.sendingIcon}>📡</Text>
                    </View>
                    <Text style={styles.sendingText}>Enviando alerta...</Text>
                    <Text style={styles.sendingHint}>
                        Localizando patrulheiros próximos
                    </Text>
                </View>
            )}

            {sosState === 'sent' && (
                <View style={styles.sentContainer}>
                    {sosState === 'sent' && (
                        <>
                            <View style={styles.sentCircle}>
                                <Text style={styles.sentIcon}>✅</Text>
                            </View>
                            <Text style={styles.sentText}>Alerta enviado!</Text>
                            <Text style={styles.sentHint}>
                                Buscando patrulheiro mais próximo...
                            </Text>
                        </>
                    )}
                </View>
            )}

            {sosState === 'patrol_found' && (
                <Animated.View style={[styles.patrolContainer, { opacity: fadeAnim }]}>
                    <Card variant="elevated" padding="xl" style={styles.patrolCard}>
                        <View style={styles.patrolHeader}>
                            <View style={styles.patrolAvatar}>
                                <Text style={styles.patrolAvatarText}>🏍️</Text>
                            </View>
                            <View style={styles.patrolInfo}>
                                <Text style={styles.patrolName}>Carlos Silva</Text>
                                <Text style={styles.patrolRating}>⭐ 4.8 • Patrulheiro Verificado</Text>
                            </View>
                        </View>

                        <View style={styles.patrolStats}>
                            <View style={styles.patrolStat}>
                                <Text style={styles.patrolStatValue}>2km</Text>
                                <Text style={styles.patrolStatLabel}>Distância</Text>
                            </View>
                            <View style={styles.patrolStatDivider} />
                            <View style={styles.patrolStat}>
                                <Text style={styles.patrolStatValue}>5min</Text>
                                <Text style={styles.patrolStatLabel}>ETA</Text>
                            </View>
                            <View style={styles.patrolStatDivider} />
                            <View style={styles.patrolStat}>
                                <Text style={styles.patrolStatValue}>387</Text>
                                <Text style={styles.patrolStatLabel}>Atendimentos</Text>
                            </View>
                        </View>

                        <View style={styles.mapPlaceholder}>
                            <Text style={styles.mapIcon}>🗺️</Text>
                            <Text style={styles.mapText}>Mapa com localização em tempo real</Text>
                        </View>

                        <View style={styles.patrolActions}>
                            <Button
                                title="💬 Chat"
                                onPress={() => { }}
                                variant="outline"
                                size="md"
                                style={{ flex: 1, marginRight: Spacing.sm }}
                            />
                            <Button
                                title="📞 Ligar"
                                onPress={() => { }}
                                variant="primary"
                                size="md"
                                style={{ flex: 1 }}
                            />
                        </View>
                    </Card>

                    <TouchableOpacity
                        style={styles.shareLocation}
                        activeOpacity={0.7}
                    >
                        <Text style={styles.shareIcon}>📍</Text>
                        <Text style={styles.shareText}>
                            Localização compartilhada (28:45 restantes)
                        </Text>
                    </TouchableOpacity>
                </Animated.View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: DarkTheme.background,
        paddingHorizontal: Spacing.xl,
        paddingTop: Spacing['4xl'],
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: DarkTheme.surface,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: DarkTheme.border,
        marginBottom: Spacing.xl,
    },
    backIcon: { fontSize: 20, color: Colors.white },
    title: {
        ...TextStyles.h2,
        color: Colors.white,
        textAlign: 'center',
    },
    subtitle: {
        ...TextStyles.body,
        color: DarkTheme.text.secondary,
        textAlign: 'center',
        marginTop: Spacing.sm,
        lineHeight: 22,
    },

    // SOS Button
    sosCenter: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: Spacing['3xl'],
    },
    sosGlow: {
        position: 'absolute',
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: Colors.danger[500] + '25',
    },
    sosButton: {
        width: 180,
        height: 180,
        borderRadius: 90,
        backgroundColor: Colors.danger[500],
        alignItems: 'center',
        justifyContent: 'center',
        ...Shadow.xl,
        borderWidth: 5,
        borderColor: Colors.danger[300],
    },
    sosEmoji: { fontSize: 40, marginBottom: 4 },
    sosText: {
        fontSize: 38,
        fontWeight: '900',
        color: Colors.white,
        letterSpacing: 6,
    },
    sosHint: {
        ...TextStyles.caption,
        color: Colors.white,
        opacity: 0.7,
        letterSpacing: 2,
        marginTop: 2,
    },

    // Info Cards
    infoCards: { marginTop: Spacing.lg },
    infoCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: DarkTheme.surface,
        borderRadius: BorderRadius.lg,
        padding: Spacing.md,
        marginBottom: Spacing.sm,
        borderWidth: 1,
        borderColor: DarkTheme.border,
    },
    infoIcon: { fontSize: 20, marginRight: Spacing.md },
    infoText: {
        ...TextStyles.bodySm,
        color: DarkTheme.text.secondary,
    },

    // Confirming
    confirmContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    ripple: {
        position: 'absolute',
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: Colors.danger[500],
    },
    countdownCircle: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: Colors.danger[500],
        alignItems: 'center',
        justifyContent: 'center',
        ...Shadow.xl,
        borderWidth: 4,
        borderColor: Colors.danger[300],
        marginBottom: Spacing.xl,
    },
    countdownNumber: {
        fontSize: 52,
        fontWeight: '900',
        color: Colors.white,
    },
    confirmText: {
        ...TextStyles.h3,
        color: Colors.white,
        marginBottom: Spacing.sm,
    },
    confirmHint: {
        ...TextStyles.body,
        color: DarkTheme.text.secondary,
        marginBottom: Spacing['3xl'],
    },
    cancelButton: {
        borderColor: Colors.danger[400],
        minWidth: 200,
    },

    // Sending
    sendingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    sendingCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: Colors.warning[500] + '20',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: Colors.warning[500] + '40',
        marginBottom: Spacing.xl,
    },
    sendingIcon: { fontSize: 40 },
    sendingText: {
        ...TextStyles.h3,
        color: Colors.white,
    },
    sendingHint: {
        ...TextStyles.body,
        color: DarkTheme.text.secondary,
        marginTop: Spacing.sm,
    },

    // Sent
    sentContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    sentCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: Colors.emerald[500] + '20',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: Colors.emerald[500] + '40',
        marginBottom: Spacing.xl,
    },
    sentIcon: { fontSize: 40 },
    sentText: {
        ...TextStyles.h3,
        color: Colors.emerald[400],
    },
    sentHint: {
        ...TextStyles.body,
        color: DarkTheme.text.secondary,
        marginTop: Spacing.sm,
    },

    // Patrol Found
    patrolContainer: {
        flex: 1,
    },
    patrolCard: {
        backgroundColor: DarkTheme.surface,
        borderColor: Colors.emerald[500] + '30',
        borderWidth: 1,
    },
    patrolHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: Spacing.lg,
    },
    patrolAvatar: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: Colors.navy[500] + '30',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: Spacing.md,
        borderWidth: 2,
        borderColor: Colors.emerald[500],
    },
    patrolAvatarText: { fontSize: 24 },
    patrolInfo: { flex: 1 },
    patrolName: { ...TextStyles.h4, color: Colors.white },
    patrolRating: {
        ...TextStyles.bodySm,
        color: Colors.warning[400],
        marginTop: 2,
    },
    patrolStats: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: Spacing.md,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: DarkTheme.border,
        marginBottom: Spacing.lg,
    },
    patrolStat: { alignItems: 'center' },
    patrolStatValue: {
        ...TextStyles.h4,
        color: Colors.emerald[400],
    },
    patrolStatLabel: {
        ...TextStyles.caption,
        color: DarkTheme.text.tertiary,
        marginTop: 2,
    },
    patrolStatDivider: {
        width: 1,
        backgroundColor: DarkTheme.border,
    },
    mapPlaceholder: {
        height: 150,
        borderRadius: BorderRadius.lg,
        backgroundColor: DarkTheme.background,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: Spacing.lg,
        borderWidth: 1,
        borderColor: DarkTheme.border,
    },
    mapIcon: { fontSize: 32, marginBottom: Spacing.sm },
    mapText: {
        ...TextStyles.bodySm,
        color: DarkTheme.text.tertiary,
    },
    patrolActions: {
        flexDirection: 'row',
    },

    // Share Location
    shareLocation: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.emerald[500] + '15',
        borderRadius: BorderRadius.lg,
        padding: Spacing.md,
        marginTop: Spacing.md,
        borderWidth: 1,
        borderColor: Colors.emerald[500] + '30',
    },
    shareIcon: { fontSize: 18, marginRight: Spacing.sm },
    shareText: {
        ...TextStyles.bodySm,
        color: Colors.emerald[300],
    },
});
