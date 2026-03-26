/**
 * PROTECT SEG — Input Component
 */

import React, { useState } from 'react';
import {
    View,
    TextInput,
    Text,
    StyleSheet,
    ViewStyle,
    TouchableOpacity,
} from 'react-native';
import { Colors, LightTheme, BorderRadius, Spacing, TextStyles, FontFamily } from '../../theme';

interface InputProps {
    label?: string;
    placeholder?: string;
    value: string;
    onChangeText: (text: string) => void;
    error?: string;
    secureTextEntry?: boolean;
    keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
    icon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    onRightIconPress?: () => void;
    multiline?: boolean;
    numberOfLines?: number;
    editable?: boolean;
    style?: ViewStyle;
    maxLength?: number;
}

export function Input({
    label,
    placeholder,
    value,
    onChangeText,
    error,
    secureTextEntry,
    keyboardType = 'default',
    autoCapitalize = 'none',
    icon,
    rightIcon,
    onRightIconPress,
    multiline = false,
    numberOfLines = 1,
    editable = true,
    style,
    maxLength,
}: InputProps) {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <View style={[styles.container, style]}>
            {label && <Text style={styles.label}>{label}</Text>}
            <View
                style={[
                    styles.inputWrapper,
                    isFocused && styles.inputFocused,
                    error && styles.inputError,
                    !editable && styles.inputDisabled,
                ]}
            >
                {icon && <View style={styles.iconLeft}>{icon}</View>}
                <TextInput
                    style={[
                        styles.input,
                        multiline && styles.multiline,
                        icon ? { paddingLeft: 0 } : null,
                    ]}
                    placeholder={placeholder}
                    placeholderTextColor={LightTheme.text.tertiary}
                    value={value}
                    onChangeText={onChangeText}
                    secureTextEntry={secureTextEntry}
                    keyboardType={keyboardType}
                    autoCapitalize={autoCapitalize}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    multiline={multiline}
                    numberOfLines={numberOfLines}
                    editable={editable}
                    selectionColor={Colors.navy[400]}
                    maxLength={maxLength}
                />
                {rightIcon && (
                    <TouchableOpacity
                        onPress={onRightIconPress}
                        style={styles.iconRight}
                    >
                        {rightIcon}
                    </TouchableOpacity>
                )}
            </View>
            {error && <Text style={styles.error}>{error}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: Spacing.base,
    },
    label: {
        ...TextStyles.label,
        color: LightTheme.text.secondary,
        marginBottom: Spacing.sm,
        textTransform: 'uppercase',
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.white,
        borderRadius: BorderRadius.lg,
        borderWidth: 1.5,
        borderColor: '#E5E7EB',
        paddingHorizontal: Spacing.base,
        minHeight: 52,
    },
    inputFocused: {
        borderColor: Colors.navy[400],
        backgroundColor: Colors.white,
    },
    inputError: {
        borderColor: Colors.danger[500],
    },
    inputDisabled: {
        opacity: 0.6,
    },
    input: {
        flex: 1,
        color: '#111827',
        fontSize: 15,
        fontFamily: FontFamily.regular,
        paddingVertical: Spacing.md,
    },
    multiline: {
        minHeight: 100,
        textAlignVertical: 'top',
        paddingTop: Spacing.md,
    },
    iconLeft: {
        marginRight: Spacing.md,
    },
    iconRight: {
        marginLeft: Spacing.sm,
        padding: Spacing.xs,
    },
    error: {
        ...TextStyles.caption,
        color: Colors.danger[400],
        marginTop: Spacing.xs,
    },
});
