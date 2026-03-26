/**
 * PROTECT SEG — Button Component
 */

import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    ActivityIndicator,
    ViewStyle,
    TextStyle,
    View,
} from 'react-native';
import { Colors, DarkTheme, BorderRadius, Spacing, TextStyles, Shadow } from '../../theme';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'sos';
type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

interface ButtonProps {
    title: string;
    onPress: () => void;
    variant?: ButtonVariant;
    size?: ButtonSize;
    disabled?: boolean;
    loading?: boolean;
    icon?: React.ReactNode;
    iconPosition?: 'left' | 'right';
    fullWidth?: boolean;
    style?: ViewStyle;
    textStyle?: TextStyle;
}

export function Button({
    title,
    onPress,
    variant = 'primary',
    size = 'md',
    disabled = false,
    loading = false,
    icon,
    iconPosition = 'left',
    fullWidth = false,
    style,
    textStyle,
}: ButtonProps) {
    const isDisabled = disabled || loading;

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={isDisabled}
            activeOpacity={0.7}
            style={[
                styles.base,
                styles[variant],
                styles[`size_${size}`],
                fullWidth && styles.fullWidth,
                isDisabled && styles.disabled,
                variant === 'sos' && Shadow.glow(Colors.danger[500]),
                style,
            ]}
        >
            {loading ? (
                <ActivityIndicator
                    color={variant === 'outline' || variant === 'ghost' ? DarkTheme.primary : Colors.white}
                    size="small"
                />
            ) : (
                <View style={styles.content}>
                    {icon && iconPosition === 'left' && <View style={styles.iconLeft}>{icon}</View>}
                    <Text
                        style={[
                            styles.text,
                            styles[`text_${variant}`],
                            styles[`textSize_${size}`],
                            textStyle,
                        ]}
                    >
                        {title}
                    </Text>
                    {icon && iconPosition === 'right' && <View style={styles.iconRight}>{icon}</View>}
                </View>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    base: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: BorderRadius.lg,
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    fullWidth: {
        width: '100%',
    },
    disabled: {
        opacity: 0.5,
    },

    // Variants
    primary: {
        backgroundColor: Colors.navy[500],
        ...Shadow.md,
    },
    secondary: {
        backgroundColor: Colors.emerald[500],
        ...Shadow.md,
    },
    outline: {
        backgroundColor: 'transparent',
        borderWidth: 1.5,
        borderColor: Colors.navy[500],
    },
    ghost: {
        backgroundColor: 'transparent',
    },
    danger: {
        backgroundColor: Colors.danger[500],
        ...Shadow.md,
    },
    sos: {
        backgroundColor: Colors.danger[500],
        borderRadius: BorderRadius.full,
    },

    // Sizes
    size_sm: {
        paddingVertical: Spacing.sm,
        paddingHorizontal: Spacing.base,
        minHeight: 36,
    },
    size_md: {
        paddingVertical: Spacing.md,
        paddingHorizontal: Spacing.xl,
        minHeight: 44,
    },
    size_lg: {
        paddingVertical: Spacing.base,
        paddingHorizontal: Spacing['2xl'],
        minHeight: 52,
    },
    size_xl: {
        paddingVertical: Spacing.lg,
        paddingHorizontal: Spacing['3xl'],
        minHeight: 60,
    },

    // Text base
    text: {
        textAlign: 'center',
    },

    // Text variants
    text_primary: {
        color: Colors.white,
        ...TextStyles.button,
    },
    text_secondary: {
        color: Colors.white,
        ...TextStyles.button,
    },
    text_outline: {
        color: Colors.navy[500],
        ...TextStyles.button,
    },
    text_ghost: {
        color: Colors.navy[500],
        ...TextStyles.button,
    },
    text_danger: {
        color: Colors.white,
        ...TextStyles.button,
    },
    text_sos: {
        color: Colors.white,
        ...TextStyles.button,
        fontSize: 20,
        fontWeight: '800',
        letterSpacing: 2,
    },

    // Text sizes
    textSize_sm: {
        ...TextStyles.buttonSm,
    },
    textSize_md: {
        ...TextStyles.button,
    },
    textSize_lg: {
        ...TextStyles.button,
        fontSize: 17,
    },
    textSize_xl: {
        ...TextStyles.button,
        fontSize: 18,
    },

    iconLeft: {
        marginRight: Spacing.sm,
    },
    iconRight: {
        marginLeft: Spacing.sm,
    },
});
