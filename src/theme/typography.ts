/**
 * PROTECT SEG — Typography System
 * Font: Inter (clean, modern, professional)
 */

import { Platform } from 'react-native';

export const FontFamily = {
    regular: Platform.select({
        ios: 'Inter-Regular',
        android: 'Inter-Regular',
        default: 'Inter, system-ui, -apple-system, sans-serif',
    }),
    medium: Platform.select({
        ios: 'Inter-Medium',
        android: 'Inter-Medium',
        default: 'Inter, system-ui, -apple-system, sans-serif',
    }),
    semibold: Platform.select({
        ios: 'Inter-SemiBold',
        android: 'Inter-SemiBold',
        default: 'Inter, system-ui, -apple-system, sans-serif',
    }),
    bold: Platform.select({
        ios: 'Inter-Bold',
        android: 'Inter-Bold',
        default: 'Inter, system-ui, -apple-system, sans-serif',
    }),
} as const;

export const FontSize = {
    xs: 11,
    sm: 13,
    base: 15,
    md: 17,
    lg: 20,
    xl: 24,
    '2xl': 28,
    '3xl': 34,
    '4xl': 40,
    '5xl': 48,
} as const;

export const LineHeight = {
    xs: 16,
    sm: 18,
    base: 22,
    md: 24,
    lg: 28,
    xl: 32,
    '2xl': 36,
    '3xl': 42,
    '4xl': 48,
    '5xl': 56,
} as const;

export const LetterSpacing = {
    tight: -0.5,
    normal: 0,
    wide: 0.5,
    wider: 1,
} as const;

// Pre-built text styles
export const TextStyles = {
    h1: {
        fontFamily: FontFamily.bold,
        fontSize: FontSize['3xl'],
        lineHeight: LineHeight['3xl'],
        letterSpacing: LetterSpacing.tight,
    },
    h2: {
        fontFamily: FontFamily.bold,
        fontSize: FontSize['2xl'],
        lineHeight: LineHeight['2xl'],
        letterSpacing: LetterSpacing.tight,
    },
    h3: {
        fontFamily: FontFamily.semibold,
        fontSize: FontSize.xl,
        lineHeight: LineHeight.xl,
    },
    h4: {
        fontFamily: FontFamily.semibold,
        fontSize: FontSize.lg,
        lineHeight: LineHeight.lg,
    },
    body: {
        fontFamily: FontFamily.regular,
        fontSize: FontSize.base,
        lineHeight: LineHeight.base,
    },
    bodyMedium: {
        fontFamily: FontFamily.medium,
        fontSize: FontSize.base,
        lineHeight: LineHeight.base,
    },
    bodySm: {
        fontFamily: FontFamily.regular,
        fontSize: FontSize.sm,
        lineHeight: LineHeight.sm,
    },
    caption: {
        fontFamily: FontFamily.regular,
        fontSize: FontSize.xs,
        lineHeight: LineHeight.xs,
    },
    button: {
        fontFamily: FontFamily.semibold,
        fontSize: FontSize.base,
        lineHeight: LineHeight.base,
        letterSpacing: LetterSpacing.wide,
    },
    buttonSm: {
        fontFamily: FontFamily.semibold,
        fontSize: FontSize.sm,
        lineHeight: LineHeight.sm,
        letterSpacing: LetterSpacing.wide,
    },
    label: {
        fontFamily: FontFamily.medium,
        fontSize: FontSize.sm,
        lineHeight: LineHeight.sm,
        letterSpacing: LetterSpacing.wide,
    },
} as const;
