/**
 * PROTECT SEG — Splash / Welcome Screen
 */

import { router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
    ActivityIndicator,
    Animated,
    Dimensions,
    Image,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { Button } from '../src/components/ui';
import { authService } from '../src/services/authService'; // Added
import { Colors, LightTheme, Spacing, TextStyles } from '../src/theme'; // Added BorderRadius

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen() {
    const [checkingSession, setCheckingSession] = useState(true); // Added

    useEffect(() => {
        const checkSession = async () => {
            try {
                const session = await authService.getCurrentUser();
                if (session) {
                    if (session.profile.role === 'client') {
                        router.replace('/(client)');
                    } else {
                        router.replace('/(patrol)');
                    }
                }
            } catch (error) {
                console.log('Session check error:', error);
            } finally {
                setCheckingSession(false);
            }
        };

        checkSession();
    }, []);

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(50)).current;
    const pulseAnim = useRef(new Animated.Value(1)).current;
    const shieldScale = useRef(new Animated.Value(0.3)).current;

    useEffect(() => {
        // Shield entrance
        Animated.spring(shieldScale, {
            toValue: 1,
            tension: 50,
            friction: 7,
            useNativeDriver: true,
        }).start();

        // Text fade in
        Animated.sequence([
            Animated.delay(400),
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 800,
                    useNativeDriver: true,
                }),
                Animated.timing(slideAnim, {
                    toValue: 0,
                    duration: 800,
                    useNativeDriver: true,
                }),
            ]),
        ]).start();

        // SOS pulse
        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 1.05,
                    duration: 1500,
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 1500,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, []);

    if (checkingSession) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator size="large" color={Colors.navy[500]} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Shield Logo */}
            <Animated.View
                style={[
                    styles.logoContainer,
                    { transform: [{ scale: shieldScale }] },
                ]}
            >
                <Image
                    source={require('../assets/images/logo.png')}
                    style={styles.mainLogo}
                    resizeMode="contain"
                />
            </Animated.View>

            {/* Title */}
            <Animated.View
                style={[
                    styles.titleContainer,
                    {
                        opacity: fadeAnim,
                        transform: [{ translateY: slideAnim }],
                    },
                ]}
            >
                <Text style={styles.title}>PROTECT SEG</Text>
                <Text style={styles.subtitle}>SEGURANÇA 24H • PROTEÇÃO REAL</Text>
                <View style={styles.divider} />
                <Text style={styles.tagline}>
                    Conectando você à segurança que{'\n'}sua família merece
                </Text>
            </Animated.View>

            {/* Action Buttons */}
            <Animated.View
                style={[
                    styles.buttonsContainer,
                    {
                        opacity: fadeAnim,
                        transform: [{ translateY: slideAnim }],
                    },
                ]}
            >
                <Button
                    title="ENTRAR"
                    onPress={() => router.push('/(auth)/login')}
                    variant="primary"
                    size="xl"
                    fullWidth
                    style={styles.loginButton}
                />
                <Button
                    title="CRIAR CONTA"
                    onPress={() => router.push('/(auth)/register')}
                    variant="outline"
                    size="lg"
                    fullWidth
                    style={styles.registerButton}
                />

                <Text style={styles.version}>v1.0.0 • PROTECT SEG © 2026</Text>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: Spacing['2xl'],
    },

    // Logo
    logoContainer: {
        marginBottom: Spacing['3xl'],
        alignItems: 'center',
        justifyContent: 'center',
    },
    mainLogo: {
        width: 180,
        height: 180,
    },

    // Title
    titleContainer: {
        alignItems: 'center',
        marginBottom: Spacing['4xl'],
    },
    title: {
        ...TextStyles.h1,
        color: '#0A1C43',
        letterSpacing: 2,
        fontWeight: '900',
    },
    subtitle: {
        ...TextStyles.bodySm,
        color: Colors.emerald[600],
        marginTop: Spacing.sm,
        letterSpacing: 1,
        fontWeight: 'bold',
    },
    divider: {
        width: 60,
        height: 2,
        backgroundColor: Colors.navy[400],
        marginVertical: Spacing.xl,
        borderRadius: 1,
    },
    tagline: {
        ...TextStyles.body,
        color: LightTheme.text.secondary,
        textAlign: 'center',
        lineHeight: 24,
    },

    // Buttons
    buttonsContainer: {
        width: '100%',
        position: 'absolute',
        bottom: Spacing['5xl'],
        paddingHorizontal: Spacing['2xl'],
        alignItems: 'center',
    },
    loginButton: {
        marginBottom: Spacing.md,
        backgroundColor: Colors.navy[500],
    },
    registerButton: {
        borderColor: Colors.navy[500],
    },
    version: {
        ...TextStyles.caption,
        color: LightTheme.text.tertiary,
        marginTop: Spacing.xl,
    },
});
