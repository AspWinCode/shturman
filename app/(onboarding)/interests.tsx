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
import { BorderRadius, Spacing, Typography } from '@/constants/theme';
import { INTERESTS } from '@/constants/data';
import { useStore } from '@/store/useStore';

export default function InterestsScreen() {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const isCompact = width < 370;
  const horizontalPadding = isCompact ? Spacing.lg : Spacing.xl;
  const itemSize = (width - horizontalPadding * 2 - Spacing.md * 2) / 3;

  const [selected, setSelected] = useState<string[]>([]);
  const setUser = useStore((s) => s.setUser);

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleNext = () => {
    if (selected.length === 0) return;
    setUser({ interests: selected });
    router.push('/(onboarding)/travel-style');
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <View style={[styles.header, { paddingTop: insets.top + 10, paddingHorizontal: isCompact ? Spacing.sm : Spacing.base }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '33%' }]} />
        </View>
        <TouchableOpacity onPress={() => router.push('/(onboarding)/travel-style')}>
          <Text style={styles.skipText}>Пропустить</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingHorizontal: horizontalPadding, paddingBottom: Spacing.lg + 96 + insets.bottom }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.titleSection}>
          <Text style={styles.step}>Шаг 1 из 2</Text>
          <Text style={styles.title}>Что вас интересует?</Text>
          <Text style={styles.subtitle}>
            Выберите минимум один интерес, чтобы маршруты лучше соответствовали вашим предпочтениям
          </Text>
        </View>

        <View style={styles.grid}>
          {INTERESTS.map((item) => {
            const isSelected = selected.includes(item.id);
            return (
              <TouchableOpacity
                key={item.id}
                onPress={() => toggle(item.id)}
                activeOpacity={0.8}
                style={[
                  styles.interestItem,
                  { width: itemSize, height: itemSize * 0.9 },
                  isSelected && styles.interestItemSelected,
                ]}
              >
                {isSelected && (
                  <View style={[StyleSheet.absoluteFill, { backgroundColor: Colors.primary }]} />
                )}
                {isSelected && (
                  <View style={styles.checkMark}>
                    <Ionicons name="checkmark" size={12} color="#fff" />
                  </View>
                )}
                <Text style={styles.interestEmoji}>{item.icon}</Text>
                <Text
                  style={[styles.interestLabel, isSelected && styles.interestLabelSelected]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {selected.length > 0 && (
          <Text style={styles.selectionCount}>Выбрано: {selected.length}</Text>
        )}
      </ScrollView>

      <View style={[styles.footer, { paddingHorizontal: horizontalPadding, paddingBottom: Spacing.lg + Math.max(insets.bottom, 8) }]}>
        <Button
          title="Продолжить"
          onPress={handleNext}
          size="lg"
          disabled={selected.length === 0}
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
  titleSection: {
    marginBottom: Spacing.xl,
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
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
  },
  interestItem: {
    width: 110,
    height: 100,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderWidth: 1.5,
    borderColor: Colors.border,
    overflow: 'hidden',
    position: 'relative',
  },
  interestItemSelected: {
    borderColor: 'transparent',
  },
  checkMark: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: 'rgba(255,255,255,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  interestEmoji: {
    fontSize: 28,
  },
  interestLabel: {
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.medium,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  interestLabelSelected: {
    color: '#fff',
  },
  selectionCount: {
    textAlign: 'center',
    marginTop: Spacing.lg,
    fontSize: Typography.sizes.sm,
    color: Colors.primary,
    fontWeight: Typography.weights.medium,
  },
  footer: {
    padding: Spacing.xl,
    paddingBottom: Spacing['3xl'],
    backgroundColor: Colors.background,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
});
