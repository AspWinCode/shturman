import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import Colors from '@/constants/colors';
import { BorderRadius, Spacing, Typography } from '@/constants/theme';
import { useStore } from '@/store/useStore';
import { TRAVEL_STYLES, INTERESTS, TravelStyle } from '@/constants/data';

export default function EditProfileScreen() {
  const user = useStore((s) => s.user);
  const setUser = useStore((s) => s.setUser);

  const [name, setName] = useState(user.name || '');
  const [selectedInterests, setSelectedInterests] = useState<string[]>(user.interests || []);
  const [selectedStyle, setSelectedStyle] = useState<TravelStyle>(user.travelStyle || 'standard');
  const [errors, setErrors] = useState<{ name?: string }>({});
  const [saved, setSaved] = useState(false);

  const toggleInterest = (id: string) => {
    setSelectedInterests((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const validate = () => {
    const e: typeof errors = {};
    if (!name.trim()) e.name = 'Введите имя';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    setUser({
      name: name.trim(),
      interests: selectedInterests,
      travelStyle: selectedStyle,
    });
    setSaved(true);
    setTimeout(() => router.back(), 800);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar style="light" />

      {/* Header */}
      <View style={[styles.header, { backgroundColor: Colors.primary }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Редактировать профиль</Text>
          <Text style={styles.headerSubtitle}>Имя, интересы, стиль путешествий</Text>
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Name */}
        <View style={styles.section}>
          <SectionLabel icon="person-outline" title="Имя" />
          <Input
            label=""
            placeholder="Ваше имя"
            value={name}
            onChangeText={setName}
            leftIcon="person-outline"
            error={errors.name}
            autoCapitalize="words"
          />
        </View>

        {/* Travel style */}
        <View style={styles.section}>
          <SectionLabel icon="star-outline" title="Стиль путешествий" />
          <View style={styles.stylesGrid}>
            {TRAVEL_STYLES.map((item) => {
              const isSelected = selectedStyle === item.id;
              return (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => setSelectedStyle(item.id as TravelStyle)}
                  style={[
                    styles.styleCard,
                    isSelected && {
                      borderColor: item.color,
                      borderWidth: 2,
                      backgroundColor: item.color + '10',
                    },
                  ]}
                  activeOpacity={0.8}
                >
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

        {/* Interests */}
        <View style={styles.section}>
          <SectionLabel icon="heart-outline" title="Интересы" />
          <View style={styles.interestsGrid}>
            {INTERESTS.map((item) => {
              const isSelected = selectedInterests.includes(item.id);
              return (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => toggleInterest(item.id)}
                  style={[styles.interestChip, isSelected && styles.interestChipSelected]}
                  activeOpacity={0.8}
                >
                  <Text style={styles.interestIcon}>{item.icon}</Text>
                  <Text
                    style={[
                      styles.interestLabel,
                      isSelected && styles.interestLabelSelected,
                    ]}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={{ height: 16 }} />
      </ScrollView>

      <View style={styles.footer}>
        {saved ? (
          <View style={styles.savedBanner}>
            <Ionicons name="checkmark-circle" size={20} color={Colors.success} />
            <Text style={styles.savedText}>Сохранено!</Text>
          </View>
        ) : (
          <Button title="Сохранить изменения" onPress={handleSave} size="lg" />
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

function SectionLabel({
  icon,
  title,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
}) {
  return (
    <View style={labelStyles.row}>
      <View style={labelStyles.iconWrap}>
        <Ionicons name={icon} size={15} color={Colors.primary} />
      </View>
      <Text style={labelStyles.title}>{title}</Text>
    </View>
  );
}

const labelStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: Spacing.md,
  },
  iconWrap: {
    width: 26,
    height: 26,
    borderRadius: 8,
    backgroundColor: Colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  title: {
    fontSize: Typography.sizes.md,
    fontWeight: Typography.weights.bold,
    color: Colors.text,
  },
});

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    paddingTop: 52,
    paddingBottom: Spacing.xl,
    paddingHorizontal: Spacing.xl,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContent: { flex: 1 },
  headerTitle: {
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.bold,
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: Typography.sizes.sm,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 2,
  },
  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing['2xl'],
  },
  section: { marginBottom: Spacing.xl },
  stylesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  styleCard: {
    width: '47.5%',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    padding: Spacing.md,
    borderWidth: 1.5,
    borderColor: Colors.border,
  },
  styleIcon: { fontSize: 28, marginBottom: 4 },
  styleLabel: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.bold,
    color: Colors.text,
    marginBottom: 2,
  },
  styleDesc: {
    fontSize: Typography.sizes.xs,
    color: Colors.textSecondary,
  },
  interestsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  interestChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  interestChipSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary + '15',
  },
  interestIcon: { fontSize: 14 },
  interestLabel: {
    fontSize: Typography.sizes.sm,
    color: Colors.textSecondary,
    fontWeight: Typography.weights.medium,
  },
  interestLabelSelected: {
    color: Colors.primary,
    fontWeight: Typography.weights.semibold,
  },
  footer: {
    padding: Spacing.xl,
    paddingBottom: Spacing['3xl'],
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  savedBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
  },
  savedText: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.bold,
    color: Colors.success,
  },
});
