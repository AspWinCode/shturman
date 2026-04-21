import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@/components/ui/Button';
import { CitySearchInput } from '@/components/ui/CitySearchInput';
import { DatePickerInput } from '@/components/ui/DatePickerInput';
import Colors from '@/constants/colors';
import { BorderRadius, Spacing, Typography } from '@/constants/theme';
import { INTERESTS, TRAVEL_STYLES, TravelStyle, POPULAR_CITIES } from '@/constants/data';
import { useStore } from '@/store/useStore';

const BUDGET_PRESETS = [15000, 30000, 60000, 120000];
const INTEREST_MAP: Record<string, string[]> = {
  history: ['history'],
  nature: ['nature'],
  beach: ['beach'],
  hiking: ['hiking', 'nature'],
  architecture: ['architecture'],
  museums: ['museums'],
  food: ['food'],
  shopping: ['shopping'],
  art: ['art'],
  nightlife: ['nightlife'],
  sport: ['sport'],
  wellness: ['wellness'],
};

function toIsoDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function parseDurationDays(raw?: string): number | null {
  if (!raw) return null;
  const match = raw.match(/\d+/);
  if (!match) return null;
  const days = Number(match[0]);
  return Number.isFinite(days) && days > 0 ? days : null;
}

function parseBudget(raw?: string): number | null {
  if (!raw) return null;
  const values = (raw.match(/\d[\d\s]*/g) ?? [])
    .map((v) => Number(v.replace(/\s+/g, '')))
    .filter((v) => Number.isFinite(v) && v > 0);

  if (values.length === 0) return null;
  if (values.length === 1) return values[0];
  return Math.round((values[0] + values[1]) / 2);
}

function inferStyleFromRoute(budget: number | null, days: number | null): TravelStyle | null {
  if (!budget) return null;

  if (days && days > 0) {
    const dailyBudget = budget / days;
    if (dailyBudget < 3000) return 'budget';
    if (dailyBudget < 8000) return 'standard';
    if (dailyBudget < 15000) return 'comfort';
    return 'luxury';
  }

  if (budget < 20000) return 'budget';
  if (budget < 50000) return 'standard';
  if (budget < 90000) return 'comfort';
  return 'luxury';
}

export default function CreateTripScreen() {
  const updateTripForm = useStore((s) => s.updateTripForm);
  const generateTrip = useStore((s) => s.generateTrip);
  const params = useLocalSearchParams<{
    to?: string;
    routeDuration?: string;
    routeBudget?: string;
    routeTags?: string;
  }>();

  const [from, setFrom] = useState('Москва');
  const [to, setTo] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [budget, setBudget] = useState(30000);
  const [budgetText, setBudgetText] = useState('30000');
  const [travelers, setTravelers] = useState(1);
  const [interests, setInterests] = useState<string[]>([]);
  const [style, setStyle] = useState<TravelStyle>('standard');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const budgetInputRef = useRef<TextInput>(null);
  const prefillAppliedRef = useRef(false);

  useEffect(() => {
    const hasPrefill = Boolean(
      params.to || params.routeDuration || params.routeBudget || params.routeTags
    );
    if (!hasPrefill || prefillAppliedRef.current) return;

    if (params.to?.trim()) {
      setTo(params.to.trim());
    }

    const parsedDurationDays = parseDurationDays(params.routeDuration);
    const parsedBudget = parseBudget(params.routeBudget);
    if (parsedBudget) {
      setBudget(parsedBudget);
      setBudgetText(String(parsedBudget));
    }

    if (parsedDurationDays) {
      const start = toIsoDate(new Date());
      const endDateValue = new Date(start);
      endDateValue.setDate(endDateValue.getDate() + Math.max(parsedDurationDays - 1, 1));
      setStartDate(start);
      setEndDate(toIsoDate(endDateValue));
    }

    const inferredStyle = inferStyleFromRoute(parsedBudget, parsedDurationDays);
    if (inferredStyle) {
      setStyle(inferredStyle);
    }

    if (params.routeTags) {
      const mappedInterests = params.routeTags
        .split(',')
        .map((tag) => tag.trim().toLowerCase())
        .flatMap((tag) => {
          if (INTEREST_MAP[tag]) return INTEREST_MAP[tag];
          if (INTERESTS.some((interest) => interest.id === tag)) return [tag];
          return [];
        });
      if (mappedInterests.length > 0) {
        setInterests(Array.from(new Set(mappedInterests)));
      }
    }

    prefillAppliedRef.current = true;
  }, [params.to, params.routeDuration, params.routeBudget, params.routeTags]);

  const toggleInterest = (id: string) => {
    setInterests((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleBudgetChange = (v: string) => {
    const clean = v.replace(/[^0-9]/g, '');
    setBudgetText(clean);
    const num = Number(clean) || 0;
    setBudget(num);
  };

  const handleBudgetPreset = (preset: number) => {
    setBudget(preset);
    setBudgetText(String(preset));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!from.trim()) e.from = 'Введите город отправления';
    if (!to.trim()) e.to = 'Введите город назначения';
    if (from.trim() && to.trim() && from.trim().toLowerCase() === to.trim().toLowerCase()) {
      e.to = 'Город назначения должен отличаться от отправления';
    }
    if (!startDate) e.startDate = 'Выберите дату начала';
    if (!endDate) e.endDate = 'Выберите дату окончания';
    if (startDate && endDate && endDate < startDate) {
      e.endDate = 'Дата окончания не может быть раньше даты начала';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleGenerate = () => {
    if (!validate()) return;
    const nextForm = { from, to, startDate, endDate, budget, travelers, interests, travelStyle: style };
    updateTripForm(nextForm);
    generateTrip(nextForm);
    router.push('/trip/generating');
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
          <Text style={styles.headerTitle}>Новая поездка</Text>
          <Text style={styles.headerSubtitle}>Заполните форму и получите план за минуту</Text>
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Section: Route */}
        <View style={styles.section}>
          <SectionTitle icon="navigate-outline" title="Маршрут" />

          <CitySearchInput
            label="Откуда"
            placeholder="Город отправления"
            value={from}
            onSelect={setFrom}
            leftIcon="airplane-outline"
            error={errors.from}
          />

          <CitySearchInput
            label="Куда"
            placeholder="Город назначения"
            value={to}
            onSelect={setTo}
            leftIcon="location-outline"
            error={errors.to}
          />

          {/* Быстрый выбор города */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.cityScroll}>
            {POPULAR_CITIES.map((city) => (
              <TouchableOpacity
                key={city.id}
                onPress={() => setTo(city.name)}
                style={[styles.cityChip, to === city.name && styles.cityChipSelected]}
              >
                <Text style={[styles.cityChipText, to === city.name && styles.cityChipTextSelected]}>
                  {city.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Section: Dates */}
        <View style={styles.section}>
          <SectionTitle icon="calendar-outline" title="Даты" />
          <View style={styles.dateRow}>
            <View style={styles.dateField}>
              <DatePickerInput
                label="Откуда"
                value={startDate}
                onChange={(d) => {
                  setStartDate(d);
                  if (endDate && d > endDate) setEndDate('');
                }}
                error={errors.startDate}
                placeholder="Дата начала"
              />
            </View>
            <View style={styles.dateArrow}>
              <Ionicons name="arrow-forward" size={18} color={Colors.textTertiary} />
            </View>
            <View style={styles.dateField}>
              <DatePickerInput
                label="Конец"
                value={endDate}
                onChange={setEndDate}
                minDate={startDate || undefined}
                error={errors.endDate}
                placeholder="Дата окончания"
              />
            </View>
          </View>

          <View style={styles.datePresets}>
            {[
              { label: '3 дня', days: 3 },
              { label: '5 дней', days: 5 },
              { label: '7 дней', days: 7 },
              { label: '10 дней', days: 10 },
            ].map(({ label, days }) => (
              <TouchableOpacity
                key={label}
                style={styles.datePreset}
                onPress={() => {
                  const start = startDate || new Date().toISOString().split('T')[0];
                  const endD = new Date(start);
                  endD.setDate(endD.getDate() + days);
                  const end = endD.toISOString().split('T')[0];
                  if (!startDate) setStartDate(start);
                  setEndDate(end);
                }}
              >
                <Text style={styles.datePresetText}>{label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Section: Budget */}
        <View style={styles.section}>
          <SectionTitle icon="wallet-outline" title="Бюджет" />

          <TouchableOpacity
            style={styles.budgetDisplay}
            onPress={() => budgetInputRef.current?.focus()}
            activeOpacity={0.8}
          >
            <View style={styles.budgetInputRow}>
              <TextInput
                ref={budgetInputRef}
                style={styles.budgetValueInput}
                value={budgetText}
                onChangeText={handleBudgetChange}
                keyboardType="numeric"
                selectTextOnFocus
                selectionColor={Colors.primary}
              />
              <Text style={styles.budgetCurrencyBig}>₽</Text>
            </View>
            <Text style={styles.budgetLabel}>На весь маршрут с учетом проживания и активностей</Text>
          </TouchableOpacity>

          {/* Preset buttons */}
          <View style={styles.budgetPresets}>
            {BUDGET_PRESETS.map((preset) => {
              const isActive = budget === preset;
              return (
                <TouchableOpacity
                  key={preset}
                  onPress={() => handleBudgetPreset(preset)}
                  style={[styles.budgetBtn, isActive && styles.budgetBtnSelected]}
                >
                  {isActive && (
                    <View style={[StyleSheet.absoluteFill, { backgroundColor: Colors.primary }]} />
                  )}
                  <Text style={[styles.budgetBtnText, isActive && styles.budgetBtnTextSelected]}>
                    {(preset / 1000).toLocaleString('ru-RU')}k ₽
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Section: Travelers */}
        <View style={styles.section}>
          <SectionTitle icon="people-outline" title="Путешественники" />
          <View style={styles.travelersRow}>
            <TouchableOpacity
              style={styles.counterBtn}
              onPress={() => setTravelers(Math.max(1, travelers - 1))}
            >
              <Ionicons name="remove" size={20} color={Colors.primary} />
            </TouchableOpacity>
            <View style={styles.counterValueWrap}>
              <Text style={styles.counterValue}>{travelers}</Text>
              <Text style={styles.counterLabel}>
                {travelers === 1 ? 'человек' : travelers <= 4 ? 'человека' : 'человек'}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.counterBtn}
              onPress={() => setTravelers(Math.min(10, travelers + 1))}
            >
              <Ionicons name="add" size={20} color={Colors.primary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Section: Travel Style */}
        <View style={styles.section}>
          <SectionTitle icon="star-outline" title="Стиль поездки" />
          <View style={styles.stylesGrid}>
            {TRAVEL_STYLES.map((item) => (
              <TouchableOpacity
                key={item.id}
                onPress={() => setStyle(item.id as TravelStyle)}
                style={[
                  styles.styleCard,
                  style === item.id && { borderColor: item.color, borderWidth: 2, backgroundColor: item.color + '10' },
                ]}
              >
                <Text style={[styles.styleCardLabel, style === item.id && { color: item.color }]}>
                  {item.label}
                </Text>
                <Text style={styles.styleCardDesc}>{item.desc}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Section: Interests */}
        <View style={styles.section}>
          <SectionTitle icon="heart-outline" title="Интересы" optional />
          <View style={styles.interestsGrid}>
            {INTERESTS.map((item) => {
              const isSelected = interests.includes(item.id);
              return (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => toggleInterest(item.id)}
                  style={[styles.interestChip, isSelected && styles.interestChipSelected]}
                >
                  <Text style={[styles.interestChipLabel, isSelected && styles.interestChipLabelSelected]}>
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
        <Button title="Сгенерировать маршрут" onPress={handleGenerate} size="lg" />
      </View>
    </KeyboardAvoidingView>
  );
}

function SectionTitle({
  icon,
  title,
  optional,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  optional?: boolean;
}) {
  return (
    <View style={sectionStyles.row}>
      <View style={sectionStyles.iconWrap}>
        <Ionicons name={icon} size={16} color={Colors.primary} />
      </View>
      <Text style={sectionStyles.title}>{title}</Text>
      {optional && <Text style={sectionStyles.optional}>(необязательно)</Text>}
    </View>
  );
}

const sectionStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: Spacing.md,
  },
  iconWrap: {
    width: 28,
    height: 28,
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
  optional: {
    fontSize: Typography.sizes.sm,
    color: Colors.textTertiary,
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
  cityScroll: { marginTop: Spacing.xs, marginHorizontal: -4 },
  cityChip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    backgroundColor: Colors.surfaceAlt,
    borderRadius: BorderRadius.full,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cityChipSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary + '15',
  },
  cityChipText: {
    fontSize: Typography.sizes.sm,
    color: Colors.textSecondary,
    fontWeight: Typography.weights.medium,
  },
  cityChipTextSelected: {
    color: Colors.primary,
    fontWeight: Typography.weights.semibold,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  dateField: {
    flex: 1,
  },
  dateArrow: {
    width: 26,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 36,
  },
  datePresets: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  datePreset: {
    width: '48.5%',
    paddingVertical: 8,
    backgroundColor: Colors.surfaceAlt,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.sm,
  },
  datePresetText: {
    fontSize: Typography.sizes.sm,
    color: Colors.textSecondary,
    fontWeight: Typography.weights.medium,
  },
  // Budget
  budgetDisplay: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.xl,
    backgroundColor: Colors.primary + '0D',
    borderRadius: BorderRadius.xl,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.primary + '25',
  },
  budgetInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  budgetValueInput: {
    fontSize: Typography.sizes['2xl'],
    fontWeight: Typography.weights.extrabold,
    color: Colors.primary,
    letterSpacing: -0.5,
    textAlign: 'center',
    padding: 0,
    minWidth: 40,
    maxWidth: 200,
    // @ts-ignore web only
    outlineStyle: 'none',
  },
  budgetCurrencyBig: {
    fontSize: Typography.sizes['2xl'],
    fontWeight: Typography.weights.extrabold,
    color: Colors.primary,
  },
  budgetLabel: {
    fontSize: Typography.sizes.xs,
    color: Colors.textTertiary,
    marginTop: 4,
  },
  budgetPresets: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  budgetBtn: {
    width: '48.5%',
    paddingVertical: 10,
    backgroundColor: Colors.surfaceAlt,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: Spacing.sm,
  },
  budgetBtnSelected: { borderColor: 'transparent' },
  budgetBtnText: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.semibold,
    color: Colors.textSecondary,
  },
  budgetBtnTextSelected: { color: '#fff' },
  // Travelers
  travelersRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.xl,
    backgroundColor: Colors.surfaceAlt,
    borderRadius: BorderRadius.xl,
    padding: Spacing.base,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  counterBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: Colors.primary,
  },
  counterValueWrap: { alignItems: 'center', minWidth: 60 },
  counterValue: {
    fontSize: Typography.sizes['2xl'],
    fontWeight: Typography.weights.bold,
    color: Colors.text,
  },
  counterLabel: {
    fontSize: Typography.sizes.xs,
    color: Colors.textSecondary,
    marginTop: 1,
  },
  // Styles
  stylesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  styleCard: {
    width: '48.5%',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.sm,
  },
  styleCardLabel: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.bold,
    color: Colors.text,
    marginBottom: 2,
  },
  styleCardDesc: {
    fontSize: Typography.sizes.xs,
    color: Colors.textTertiary,
  },
  // Interests
  interestsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  interestChip: {
    paddingHorizontal: 14,
    paddingVertical: 9,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  interestChipSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary + '15',
  },
  interestChipLabel: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.medium,
    color: Colors.textSecondary,
  },
  interestChipLabelSelected: {
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
});


