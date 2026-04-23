import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '@/components/ui/Button';
import Colors from '@/constants/colors';
import { BorderRadius, Spacing, Typography, Shadows } from '@/constants/theme';
import { TRAVEL_STYLES, TRAVELER_TYPES, TravelStyle, TravelerType } from '@/constants/data';
import { useStore } from '@/store/useStore';

export default function TravelStyleScreen() {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const isCompact = width < 370;
  const horizontalPadding = isCompact ? Spacing.lg : Spacing.xl;

  const [selectedStyle, setSelectedStyle] = useState<TravelStyle>('standard');
  const [selectedType, setSelectedType] = useState<TravelerType>('solo');
  const completeOnboarding = useStore((s) => s.completeOnboarding);
  const user = useStore((s) => s.user);

  const handleFinish = () => {
    completeOnboarding(
      user.interests.length > 0 ? user.interests : ['museums', 'food'],
      selectedStyle,
      selectedType
    );
    router.push('/(auth)/login');
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <View style={[styles.header, { paddingTop: insets.top + 10, paddingHorizontal: isCompact ? Spacing.sm : Spacing.base }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '66%' }]} />
        </View>
        <TouchableOpacity onPress={handleFinish}>
          <Text style={styles.skipText}>Пропустить</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingHorizontal: horizontalPadding, paddingBottom: Spacing.lg + 96 + insets.bottom }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <Text style={styles.step}>Шаг 2 из 2</Text>
          <Text style={styles.title}>Ваш стиль путешествий</Text>
          <Text style={styles.subtitle}>
            Это поможет подобрать маршруты, жилье и активности в вашем ценовом диапазоне
          </Text>

          <View style={styles.styleGrid}>
            {TRAVEL_STYLES.map((item) => {
              const isSelected = selectedStyle === item.id;
              return (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => setSelectedStyle(item.id as TravelStyle)}
                  activeOpacity={0.8}
                  style={[styles.styleCard, isCompact && styles.oneColCard, isSelected && { borderColor: item.color, borderWidth: 2 }]}
                >
                  {isSelected && (
                    <View style={[styles.selectedDot, { backgroundColor: item.color }]} />
                  )}
                  <Text style={styles.styleIcon}>{item.icon}</Text>
                  <Text style={[styles.styleLabel, isSelected && { color: item.color }]}>
                    {item.label}
                  </Text>
                  <Text style={styles.styleDesc}>{item.desc}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>С кем путешествуете?</Text>

          <View style={styles.typeGrid}>
            {TRAVELER_TYPES.map((item) => {
              const isSelected = selectedType === item.id;
              return (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => setSelectedType(item.id as TravelerType)}
                  activeOpacity={0.8}
                  style={[styles.typeCard, isCompact && styles.oneColCard, isSelected && styles.typeCardSelected]}
                >
                  {isSelected && (
                    <View style={[StyleSheet.absoluteFill, { backgroundColor: Colors.primary }]} />
                  )}
                  <Text style={styles.typeIcon}>{item.icon}</Text>
                  <Text style={[styles.typeLabel, isSelected && styles.typeLabelSelected]}>
                    {item.label}
                  </Text>
                  <Text style={[styles.typeDesc, isSelected && styles.typeDescSelected]}>
                    {item.desc}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>

      <View style={[styles.footer, { paddingHorizontal: horizontalPadding, paddingBottom: Spacing.lg + Math.max(insets.bottom, 8) }]}>
        <Button
          title="Готово — перейти к входу"
          onPress={handleFinish}
          size="lg"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.base,
    paddingTop: 56,
    paddingBottom: Spacing.base,
    gap: Spacing.md,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressBar: {
    flex: 1,
    height: 4,
    backgroundColor: Colors.border,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 2,
  },
  skipText: {
    fontSize: Typography.sizes.sm,
    color: Colors.textSecondary,
    fontWeight: Typography.weights.medium,
  },
  scrollContent: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing['3xl'],
  },
  section: {
    marginBottom: Spacing['2xl'],
  },
  step: {
    fontSize: Typography.sizes.sm,
    color: Colors.primary,
    fontWeight: Typography.weights.semibold,
    marginBottom: Spacing.xs,
  },
  title: {
    fontSize: Typography.sizes['2xl'],
    fontWeight: Typography.weights.bold,
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  subtitle: {
    fontSize: Typography.sizes.base,
    color: Colors.textSecondary,
    lineHeight: 22,
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.bold,
    color: Colors.text,
    marginBottom: Spacing.base,
  },
  styleGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
  },
  styleCard: {
    width: '47%',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    padding: Spacing.base,
    borderWidth: 1.5,
    borderColor: Colors.border,
    ...Shadows.sm,
    position: 'relative',
    overflow: 'hidden',
  },
  selectedDot: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  styleIcon: {
    fontSize: 32,
    marginBottom: 6,
  },
  styleLabel: {
    fontSize: Typography.sizes.md,
    fontWeight: Typography.weights.bold,
    color: Colors.text,
    marginBottom: 2,
  },
  styleDesc: {
    fontSize: Typography.sizes.sm,
    color: Colors.textSecondary,
  },
  typeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
  },
  typeCard: {
    width: '47%',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    padding: Spacing.base,
    borderWidth: 1.5,
    borderColor: Colors.border,
    alignItems: 'center',
    overflow: 'hidden',
    position: 'relative',
    ...Shadows.sm,
  },
  typeCardSelected: {
    borderColor: 'transparent',
  },
  typeIcon: {
    fontSize: 36,
    marginBottom: 6,
  },
  typeLabel: {
    fontSize: Typography.sizes.md,
    fontWeight: Typography.weights.bold,
    color: Colors.text,
    marginBottom: 2,
  },
  typeLabelSelected: {
    color: '#fff',
  },
  typeDesc: {
    fontSize: Typography.sizes.xs,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  typeDescSelected: {
    color: 'rgba(255,255,255,0.8)',
  },
  footer: {
    padding: Spacing.xl,
    paddingBottom: Spacing['3xl'],
    backgroundColor: Colors.background,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  oneColCard: {
    width: '100%',
  },
});
