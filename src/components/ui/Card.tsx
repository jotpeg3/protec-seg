/**
 * PROTECT SEG — Card Component
 */

import React from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet,
    ViewStyle,
} from 'react-native';
import { DarkTheme, BorderRadius, Spacing, Shadow } from '../../theme';

interface CardProps {
    children: React.ReactNode;
    onPress?: () => void;
    variant?: 'default' | 'elevated' | 'outlined' | 'gradient';
    padding?: keyof typeof Spacing;
    style?: ViewStyle;
}

export function Card({
    children,
    onPress,
    variant = 'default',
    padding = 'base',
    style,
}: CardProps) {
    const cardStyle = [
        styles.base,
        styles[variant],
        { padding: Spacing[padding] },
        style,
    ];

    if (onPress) {
        return (
            <TouchableOpacity
                onPress={onPress}
                activeOpacity={0.85}
                style={cardStyle}
            >
                {children}
            </TouchableOpacity>
        );
    }

    return <View style={cardStyle}>{children}</View>;
}

const styles = StyleSheet.create({
    base: {
        borderRadius: BorderRadius.xl,
        overflow: 'hidden',
    },
    default: {
        backgroundColor: DarkTheme.surface,
        borderWidth: 1,
        borderColor: DarkTheme.border,
    },
    elevated: {
        backgroundColor: DarkTheme.surfaceElevated,
        ...Shadow.lg,
    },
    outlined: {
        backgroundColor: 'transparent',
        borderWidth: 1.5,
        borderColor: DarkTheme.border,
    },
    gradient: {
        backgroundColor: DarkTheme.card,
        ...Shadow.md,
    },
});
