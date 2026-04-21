import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import Colors from '@/constants/colors';
import { BorderRadius, Shadows, Spacing } from '@/constants/theme';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  padding?: number;
  variant?: 'default' | 'elevated' | 'outlined' | 'flat';
}

export const Card: React.FC<CardProps> = ({
  children,
  style,
  padding = Spacing.base,
  variant = 'default',
}) => {
  const variantStyles: Record<string, ViewStyle> = {
    default: {
      backgroundColor: Colors.card,
      ...Shadows.card,
    },
    elevated: {
      backgroundColor: Colors.card,
      ...Shadows.lg,
    },
    outlined: {
      backgroundColor: Colors.card,
      borderWidth: 1,
      borderColor: Colors.border,
    },
    flat: {
      backgroundColor: Colors.surfaceAlt,
    },
  };

  return (
    <View style={[styles.card, variantStyles[variant], { padding }, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
  },
});
