/**
 * PROTECT SEG — Badge Component
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, DarkTheme, BorderRadius, Spacing, TextStyles } from '../../theme';

type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info' | 'navy';

interface BadgeProps {
    label: string;
    variant?: BadgeVariant;
    size?: 'sm' | 'md';
    dot?: boolean;
}

const variantColors: Record<BadgeVariant, { bg: string; text: string; dot: string }> = {
    default: {
        bg: DarkTheme.surfaceElevated,
        text: DarkTheme.text.secondary,
        dot: Colors.neutral[400],
    },
    success: {
        bg: Colors.emerald[900] + '40',
        text: Colors.emerald[300],
        dot: Colors.emerald[400],
    },
    warning: {
        bg: Colors.warning[900] + '40',
        text: Colors.warning[300],
        dot: Colors.warning[400],
    },
    danger: {
        bg: Colors.danger[900] + '40',
        text: Colors.danger[300],
        dot: Colors.danger[400],
    },
    info: {
        bg: Colors.navy[800] + '60',
        text: Colors.navy[200],
        dot: Colors.navy[300],
    },
    navy: {
        bg: Colors.navy[500],
        text: Colors.white,
        dot: Colors.white,
    },
};

export function Badge({ label, variant = 'default', size = 'sm', dot = false }: BadgeProps) {
    const colors = variantColors[variant];

    return (
        <View
            style={[
                styles.base,
                size === 'md' && styles.sizeMd,
                { backgroundColor: colors.bg },
            ]}
        >
            {dot && (
                <View
                    style={[styles.dot, { backgroundColor: colors.dot }]}
                />
            )}
            <Text
                style={[
                    size === 'sm' ? styles.textSm : styles.textMd,
                    { color: colors.text },
                ]}
            >
                {label}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    base: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Spacing.sm,
        paddingVertical: Spacing.xxs,
        borderRadius: BorderRadius.full,
        alignSelf: 'flex-start',
    },
    sizeMd: {
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.xs,
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        marginRight: Spacing.xs,
    },
    textSm: {
        ...TextStyles.caption,
        fontWeight: '600',
    },
    textMd: {
        ...TextStyles.bodySm,
        fontWeight: '600',
    },
});
