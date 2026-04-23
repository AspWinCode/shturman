import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '@/constants/colors';
import { BorderRadius, Shadows, Spacing, Typography } from '@/constants/theme';
import { DayPlan } from '@/constants/data';

interface TripMapProps {
  days: DayPlan[];
  initialCity?: string;
}

export function TripMap({ initialCity }: TripMapProps) {
  return (
    <View style={[styles.mapWrap, styles.placeholder]}>
      <Text style={styles.placeholderTitle}>Карта доступна в мобильном приложении</Text>
      <Text style={styles.placeholderText}>
        Для поездки{initialCity ? ` в ${initialCity}` : ''} откройте экран на iOS или Android.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  mapWrap: {
    height: 430,
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
    ...Shadows.card,
  },
  placeholder: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.lg,
    gap: Spacing.sm,
  },
  placeholderTitle: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.bold,
    color: Colors.text,
    textAlign: 'center',
  },
  placeholderText: {
    fontSize: Typography.sizes.sm,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
});
