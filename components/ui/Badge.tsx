import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import Colors from '@/constants/colors';
import { BorderRadius, Typography } from '@/constants/theme';

interface BadgeProps {
  label: string;
  variant?: 'primary' | 'success' | 'warning' | 'error' | 'neutral' | 'outline';
  size?: 'sm' | 'md';
  style?: ViewStyle;
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'primary',
  size = 'md',
  style,
}) => {
  const variantStyles = {
    primary: { bg: '#EEF2FF', text: Colors.primary },
    success: { bg: '#D1FAE5', text: '#059669' },
    warning: { bg: '#FEF3C7', text: '#D97706' },
    error: { bg: '#FEE2E2', text: Colors.error },
    neutral: { bg: Colors.surfaceAlt, text: Colors.textSecondary },
    outline: { bg: 'transparent', text: Colors.textSecondary },
  };

  const sizeStyles = {
    sm: { paddingHorizontal: 8, paddingVertical: 2, fontSize: Typography.sizes.xs },
    md: { paddingHorizontal: 10, paddingVertical: 4, fontSize: Typography.sizes.sm },
  };

  const { bg, text } = variantStyles[variant];
  const { paddingHorizontal, paddingVertical, fontSize } = sizeStyles[size];

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: bg,
          paddingHorizontal,
          paddingVertical,
          borderWidth: variant === 'outline' ? 1 : 0,
          borderColor: Colors.border,
        },
        style,
      ]}
    >
      <Text style={[styles.text, { color: text, fontSize }]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    borderRadius: BorderRadius.full,
    alignSelf: 'flex-start',
  },
  text: {
    fontWeight: '600',
  },
});
