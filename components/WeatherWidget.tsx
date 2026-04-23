import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/colors';
import { BorderRadius, Spacing, Typography } from '@/constants/theme';
import { DayWeather } from '@/store/weatherApi';

interface WeatherWidgetProps {
  variant: 'summary' | 'day';
  weather: DayWeather | null;
}

export function WeatherWidget({ variant, weather }: WeatherWidgetProps) {
  if (!weather) return null;

  if (variant === 'day') {
    return (
      <View style={styles.dayWrap}>
        <Image source={{ uri: weather.iconUrl }} style={styles.dayIcon} />
        <Text style={styles.dayText}>
          {weather.tempMin > 0 ? '+' : ''}
          {weather.tempMin}°…{weather.tempMax > 0 ? '+' : ''}
          {weather.tempMax}°
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.summaryWrap}>
      <View style={styles.summaryRow}>
        <Image source={{ uri: weather.iconUrl }} style={styles.summaryIcon} />
        <View style={styles.summaryTextWrap}>
          <Text style={styles.summaryTemp}>
            {weather.tempMin > 0 ? '+' : ''}
            {weather.tempMin}°…{weather.tempMax > 0 ? '+' : ''}
            {weather.tempMax}°
          </Text>
          <Text style={styles.summaryDesc}>{weather.description}</Text>
        </View>
      </View>

      {weather.isExtreme && (
        <View style={styles.extremeBanner}>
          <Ionicons name="warning-outline" size={14} color={Colors.textInverse} />
          <Text style={styles.extremeText}>Экстремальные температуры — будьте осторожны</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  dayWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  dayIcon: {
    width: 20,
    height: 20,
  },
  dayText: {
    fontSize: Typography.sizes.xs,
    color: Colors.text,
    fontWeight: Typography.weights.semibold,
  },
  summaryWrap: {
    marginTop: Spacing.sm,
    backgroundColor: 'rgba(255,255,255,0.14)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.28)',
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 6,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  summaryIcon: {
    width: 28,
    height: 28,
    marginRight: 6,
  },
  summaryTextWrap: {
    flex: 1,
  },
  summaryTemp: {
    fontSize: Typography.sizes.sm,
    color: Colors.textInverse,
    fontWeight: Typography.weights.bold,
  },
  summaryDesc: {
    fontSize: Typography.sizes.xs,
    color: 'rgba(255,255,255,0.9)',
  },
  extremeBanner: {
    marginTop: 6,
    backgroundColor: Colors.error,
    borderRadius: BorderRadius.md,
    paddingHorizontal: 8,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  extremeText: {
    fontSize: Typography.sizes.xs,
    color: Colors.textInverse,
    flex: 1,
    lineHeight: 15,
  },
});
