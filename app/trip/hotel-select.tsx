import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
  Linking,
  useWindowDimensions,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Colors from '@/constants/colors';
import { BorderRadius, Shadows, Spacing, Typography } from '@/constants/theme';
import { HOTEL_CATALOG_BY_CITY, HotelCatalogItem } from '@/constants/hotelCatalog';
import { useStore } from '@/store/useStore';
import { TravelStyle } from '@/constants/data';
import { searchOstrovok } from '@/store/ostrovokApi';
import {
  buildOstrovokHotelsLink,
  buildYandexHotelsLink,
  buildOstrovokMainLink,
} from '@/store/deepLinksService';
import { track } from '@/store/analyticsService';

type RoomVariant = {
  title: string;
  maxGuests: number;
  multiplier: number;
  roomsCount: number;
};

type LocalOption = {
  id: string;
  source: 'catalog';
  hotel: HotelCatalogItem;
  room: RoomVariant;
  pricePerNightTotal: number;
  totalForStay: number;
  fitsBudget: boolean;
};

type LiveOption = {
  id: string;
  source: 'ostrovok';
  hotelName: string;
  stars: number;
  rating: number;
  distanceFromCenterKm: number;
  roomName: string;
  meal: string;
  refundable: boolean;
  photoUrl?: string;
  amenities: string[];
  pricePerNightTotal: number;
  totalForStay: number;
  fitsBudget: boolean;
};

type HotelOption = LocalOption | LiveOption;

const HOTEL_RATIO: Record<TravelStyle, number> = {
  budget: 0.38,
  standard: 0.4,
  comfort: 0.42,
  luxury: 0.44,
};

function getNights(startDate: string, endDate: string): number {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diff = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  return Math.max(1, Number.isFinite(diff) ? diff : 1);
}

function formatNights(nights: number): string {
  if (nights === 1) return 'ночь';
  if (nights >= 2 && nights <= 4) return 'ночи';
  return 'ночей';
}

function hasMealIncluded(meal: string): boolean {
  const normalized = meal.trim().toLowerCase();
  if (!normalized) return false;
  if (normalized.includes('без питания')) return false;
  if (normalized === 'none' || normalized === 'no meal') return false;
  return true;
}

function roomVariantsForTravelers(travelers: number): RoomVariant[] {
  if (travelers <= 1) {
    return [
      { title: 'Single', maxGuests: 1, multiplier: 1, roomsCount: 1 },
      { title: 'Double', maxGuests: 2, multiplier: 1.18, roomsCount: 1 },
    ];
  }
  if (travelers === 2) {
    return [
      { title: 'Double', maxGuests: 2, multiplier: 1.2, roomsCount: 1 },
      { title: 'Twin', maxGuests: 2, multiplier: 1.15, roomsCount: 1 },
      { title: 'Family', maxGuests: 3, multiplier: 1.35, roomsCount: 1 },
    ];
  }
  if (travelers === 3) {
    return [
      { title: 'Triple', maxGuests: 3, multiplier: 1.38, roomsCount: 1 },
      { title: 'Family Suite', maxGuests: 4, multiplier: 1.58, roomsCount: 1 },
    ];
  }
  if (travelers === 4) {
    return [
      { title: 'Family Suite', maxGuests: 4, multiplier: 1.62, roomsCount: 1 },
      { title: 'Connected Rooms', maxGuests: 4, multiplier: 1.8, roomsCount: 1 },
    ];
  }
  const roomsCount = Math.ceil(travelers / 4);
  return [{ title: `Family Suite x${roomsCount}`, maxGuests: 4, multiplier: 1.62, roomsCount }];
}

function isLocalOption(option: HotelOption): option is LocalOption {
  return option.source === 'catalog';
}

function FilterChip({ label, active, onPress }: { label: string; active: boolean; onPress: () => void }) {
  return (
    <TouchableOpacity style={[styles.filterChip, active && styles.filterChipActive]} onPress={onPress} activeOpacity={0.9}>
      <Text style={[styles.filterChipText, active && styles.filterChipTextActive]}>{label}</Text>
    </TouchableOpacity>
  );
}

export default function HotelSelectScreen() {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const isCompact = width < 370;
  const horizontalPadding = isCompact ? Spacing.lg : Spacing.xl;

  const tripForm = useStore((s) => s.tripForm);
  const updateTripForm = useStore((s) => s.updateTripForm);

  const [selectedId, setSelectedId] = useState('');
  const [liveStatus, setLiveStatus] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle');
  const [liveMessage, setLiveMessage] = useState('');
  const [liveOptions, setLiveOptions] = useState<LiveOption[]>([]);
  const [minStars, setMinStars] = useState(0);
  const [onlyRefundable, setOnlyRefundable] = useState(false);
  const [onlyMeal, setOnlyMeal] = useState(false);
  const [onlyBudgetFit, setOnlyBudgetFit] = useState(false);

  const isFormValid = Boolean(
    tripForm.from && tripForm.to && tripForm.startDate && tripForm.endDate && tripForm.budget > 0
  );

  const nights = getNights(tripForm.startDate, tripForm.endDate);
  const hotelBudget = Math.round(tripForm.budget * HOTEL_RATIO[tripForm.travelStyle]);
  const hasLive = liveOptions.length > 0;

  useEffect(() => {
    if (!isFormValid) return;
    let cancelled = false;
    setLiveStatus('loading');
    setLiveMessage('');
    setLiveOptions([]);

    searchOstrovok({
      city: tripForm.to,
      checkin: tripForm.startDate,
      checkout: tripForm.endDate,
      adults: tripForm.travelers,
    })
      .then((res) => {
        if (cancelled) return;
        if (!res.ok) {
          setLiveStatus('error');
          setLiveMessage(res.message);
          return;
        }
        const normalized: LiveOption[] = res.offers.map((offer) => ({
          id: `ost-${offer.id}`,
          source: 'ostrovok',
          hotelName: offer.hotelName,
          stars: offer.stars,
          rating: offer.rating,
          distanceFromCenterKm: offer.distanceFromCenterKm,
          roomName: offer.roomName,
          meal: offer.meal,
          refundable: offer.refundable,
          photoUrl: offer.photoUrl,
          amenities: Array.isArray(offer.amenities) ? offer.amenities : [],
          pricePerNightTotal: offer.pricePerNight,
          totalForStay: offer.totalPrice,
          fitsBudget: offer.totalPrice <= hotelBudget,
        }));
        setLiveOptions(normalized);
        setLiveStatus('ok');
      })
      .catch(() => {
        if (cancelled) return;
        setLiveStatus('error');
        setLiveMessage('Не удалось получить live-отели');
      });

    return () => {
      cancelled = true;
    };
  }, [isFormValid, tripForm.to, tripForm.startDate, tripForm.endDate, tripForm.travelers, hotelBudget]);

  const catalogOptions = useMemo<LocalOption[]>(() => {
    if (!isFormValid) return [];
    const cityKey = tripForm.to.trim().toLowerCase();
    const hotels = HOTEL_CATALOG_BY_CITY[cityKey] ?? [
      { name: `${tripForm.to} Hotel Center`, stars: 4, rating: 4.4, distanceFromCenterKm: 1, basePricePerNight: 6800 },
      { name: `${tripForm.to} Plaza`, stars: 4, rating: 4.5, distanceFromCenterKm: 1.2, basePricePerNight: 7400 },
    ];
    const roomVariants = roomVariantsForTravelers(tripForm.travelers);
    const all = hotels.flatMap((hotel) =>
      roomVariants.map((room) => {
        const pricePerNightTotal = Math.round(hotel.basePricePerNight * room.multiplier * room.roomsCount);
        const totalForStay = pricePerNightTotal * nights;
        return {
          id: `cat-${hotel.name}-${room.title}-${room.roomsCount}`,
          source: 'catalog' as const,
          hotel,
          room,
          pricePerNightTotal,
          totalForStay,
          fitsBudget: totalForStay <= hotelBudget,
        };
      })
    );
    return all.sort((a, b) => Math.abs(a.totalForStay - hotelBudget) - Math.abs(b.totalForStay - hotelBudget));
  }, [isFormValid, tripForm.to, tripForm.travelers, nights, hotelBudget]);

  const baseOptions = useMemo<HotelOption[]>(() => {
    if (hasLive) return [...liveOptions].sort((a, b) => a.totalForStay - b.totalForStay);
    return catalogOptions;
  }, [hasLive, liveOptions, catalogOptions]);

  const filteredOptions = useMemo<HotelOption[]>(() => {
    return baseOptions.filter((option) => {
      const stars = isLocalOption(option) ? option.hotel.stars : option.stars;
      if (minStars > 0 && stars < minStars) return false;
      if (onlyBudgetFit && !option.fitsBudget) return false;
      if (!isLocalOption(option)) {
        if (onlyRefundable && !option.refundable) return false;
        if (onlyMeal && !hasMealIncluded(option.meal)) return false;
      }
      return true;
    });
  }, [baseOptions, minStars, onlyRefundable, onlyMeal, onlyBudgetFit]);

  useEffect(() => {
    if (selectedId && !filteredOptions.some((item) => item.id === selectedId)) {
      setSelectedId('');
    }
  }, [selectedId, filteredOptions]);

  if (!isFormValid) {
    return (
      <View style={[styles.container, { justifyContent: 'center', padding: Spacing.xl }]}>
        <Text style={[styles.headerTitle, { color: Colors.text, marginBottom: 8 }]}>Недостаточно данных</Text>
        <Text style={[styles.cardMeta, { marginTop: 0, marginBottom: 16 }]}>Сначала заполните параметры поездки.</Text>
        <TouchableOpacity style={styles.primaryBtn} onPress={() => router.push('/trip/create')} activeOpacity={0.9}>
          <Text style={styles.primaryBtnText}>К созданию поездки</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const selected = filteredOptions.find((item) => item.id === selectedId);

  const handleContinue = () => {
    if (!selected) {
      Alert.alert('Выберите номер', 'Нужно выбрать один из предложенных вариантов отеля.');
      return;
    }

    const preferredHotel = isLocalOption(selected)
      ? `${selected.hotel.name} · ${selected.room.title}`
      : `${selected.hotelName} · ${selected.roomName}`;

    updateTripForm({
      preferredHotel,
      preferredHotelPricePerNight: selected.pricePerNightTotal,
      preferredHotelRoomCapacity: isLocalOption(selected) ? selected.room.maxGuests : Math.max(2, tripForm.travelers),
    });

    router.push('/trip/transport-select');
  };

  const openHotelPartner = async (provider: 'ostrovok' | 'yandex') => {
    void track(provider === 'ostrovok' ? 'ostrovok_click' : 'yandex_travel_click', {
      source: 'hotel_select',
      to: tripForm.to,
      travelers: tripForm.travelers,
    });
    const link =
      provider === 'ostrovok'
        ? buildOstrovokHotelsLink(tripForm.to, tripForm.startDate, tripForm.endDate, tripForm.travelers)
        : buildYandexHotelsLink(tripForm.to, tripForm.startDate, tripForm.endDate, tripForm.travelers);
    try {
      await Linking.openURL(link);
    } catch {
      await Linking.openURL(buildOstrovokMainLink());
    }
  };

  const showHotelsApiSetupHelp = () => {
    Alert.alert(
      'Live-отели недоступны',
      'Чтобы видеть реальные предложения B2B.Ostrovok, добавьте OSTROVOK_KEY_ID и OSTROVOK_API_KEY (или OSTROVOK_AUTH_HEADER) в .env backend и перезапустите API.',
      [{ text: 'Понятно' }]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <View style={[styles.header, { paddingTop: insets.top + 12, paddingHorizontal: horizontalPadding }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>Выбор отеля и номера</Text>
          <Text style={styles.headerSub}>
            {tripForm.to} · {nights} {formatNights(nights)} · {tripForm.travelers} чел.
          </Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingHorizontal: horizontalPadding, paddingBottom: 120 + insets.bottom },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Бюджет на проживание (входит в общий)</Text>
          <Text style={styles.summaryValue}>{hotelBudget.toLocaleString('ru-RU')} ₽</Text>
          <Text style={styles.summaryHint}>Общий бюджет поездки: {tripForm.budget.toLocaleString('ru-RU')} ₽</Text>
        </View>

        <View style={styles.liveInfo}>
          <Text style={styles.liveInfoTitle}>Источник отелей: B2B.Ostrovok</Text>
          {liveStatus === 'loading' && <Text style={styles.liveInfoText}>Загружаем live-варианты...</Text>}
          {liveStatus === 'ok' && hasLive && (
            <Text style={styles.liveInfoText}>Показаны реальные тарифы Ostrovok ({liveOptions.length})</Text>
          )}
          {liveStatus === 'error' && (
            <Text style={styles.liveInfoText}>
              Live временно недоступен ({liveMessage || 'без деталей'}). Показан локальный каталог, можно открыть партнёров для актуальных тарифов.
            </Text>
          )}
          <View style={styles.partnerBtnsRow}>
            <TouchableOpacity style={styles.partnerMiniBtn} onPress={() => void openHotelPartner('ostrovok')} activeOpacity={0.85}>
              <Text style={styles.partnerMiniBtnText}>Открыть в Островке</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.partnerMiniBtn, styles.partnerMiniBtnAlt]} onPress={() => void openHotelPartner('yandex')} activeOpacity={0.85}>
              <Text style={[styles.partnerMiniBtnText, styles.partnerMiniBtnTextAlt]}>Отели в Яндексе</Text>
            </TouchableOpacity>
            {liveStatus === 'error' && (
              <TouchableOpacity style={[styles.partnerMiniBtn, styles.partnerMiniBtnAlt]} onPress={showHotelsApiSetupHelp} activeOpacity={0.85}>
                <Text style={[styles.partnerMiniBtnText, styles.partnerMiniBtnTextAlt]}>Как включить live API</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        <View style={styles.filtersCard}>
          <Text style={styles.filtersTitle}>Фильтры</Text>
          <View style={styles.filtersRow}>
            <FilterChip label="Все" active={minStars === 0} onPress={() => setMinStars(0)} />
            <FilterChip label="3★+" active={minStars === 3} onPress={() => setMinStars((v) => (v === 3 ? 0 : 3))} />
            <FilterChip label="4★+" active={minStars === 4} onPress={() => setMinStars((v) => (v === 4 ? 0 : 4))} />
            <FilterChip label="5★" active={minStars === 5} onPress={() => setMinStars((v) => (v === 5 ? 0 : 5))} />
          </View>

          <View style={styles.filtersRow}>
            <FilterChip label="Только в бюджете" active={onlyBudgetFit} onPress={() => setOnlyBudgetFit((v) => !v)} />
            {hasLive && (
              <>
                <FilterChip label="Refundable" active={onlyRefundable} onPress={() => setOnlyRefundable((v) => !v)} />
                <FilterChip label="С питанием" active={onlyMeal} onPress={() => setOnlyMeal((v) => !v)} />
              </>
            )}
          </View>

          <Text style={styles.filtersSummary}>Показано: {filteredOptions.length} из {baseOptions.length}</Text>
        </View>

        {filteredOptions.length === 0 && (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>По выбранным фильтрам ничего не найдено</Text>
            <Text style={styles.emptyText}>Попробуйте ослабить фильтры.</Text>
          </View>
        )}

        {filteredOptions.map((option, index) => {
          const active = selectedId === option.id;
          const title = isLocalOption(option) ? option.hotel.name : option.hotelName;
          const stars = isLocalOption(option) ? option.hotel.stars : option.stars;
          const rating = isLocalOption(option) ? option.hotel.rating : option.rating;
          const distance = isLocalOption(option) ? option.hotel.distanceFromCenterKm : option.distanceFromCenterKm;
          const roomLabel = isLocalOption(option)
            ? `${option.room.title} · до ${option.room.maxGuests} гостей · ${option.room.roomsCount > 1 ? `${option.room.roomsCount} номера` : '1 номер'}`
            : `${option.roomName}${hasMealIncluded(option.meal) ? ` · ${option.meal}` : ''}${option.refundable ? ' · refundable' : ''}`;

          return (
            <TouchableOpacity
              key={`${option.id}-${title}-${index}`}
              style={[styles.card, active && styles.cardActive]}
              onPress={() => setSelectedId(option.id)}
              activeOpacity={0.9}
            >
              {!isLocalOption(option) && option.photoUrl ? <Image source={{ uri: option.photoUrl }} style={styles.cardImage} /> : null}
              <View style={styles.cardTop}>
                <Text style={styles.cardTitle}>{title}</Text>
                <Text style={styles.cardPrice}>{option.totalForStay.toLocaleString('ru-RU')} ₽</Text>
              </View>
              <Text style={styles.cardMeta}>
                {'★'.repeat(Math.max(0, Math.min(5, stars)))} · рейтинг {rating.toFixed(1)} · {distance} км до центра
              </Text>
              <Text style={styles.cardRoom}>Номер: {roomLabel}</Text>
              {!isLocalOption(option) && option.amenities.length > 0 ? (
                <Text style={styles.cardAmenities}>Удобства: {option.amenities.slice(0, 4).join(', ')}</Text>
              ) : null}
              <Text style={styles.cardNightPrice}>{option.pricePerNightTotal.toLocaleString('ru-RU')} ₽ / ночь</Text>
              <Text style={styles.cardSource}>
                Источник: {option.source === 'ostrovok' ? 'B2B.Ostrovok (live)' : 'локальный каталог'}
              </Text>
              <View style={[styles.badge, option.fitsBudget ? styles.badgeOk : styles.badgeWarn]}>
                <Text style={[styles.badgeText, option.fitsBudget ? styles.badgeTextOk : styles.badgeTextWarn]}>
                  {option.fitsBudget ? 'Вписывается в бюджет' : 'Выше hotel-бюджета'}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <View style={[styles.footer, { paddingHorizontal: horizontalPadding, paddingBottom: Spacing.lg + Math.max(insets.bottom, 8) }]}>
        <TouchableOpacity style={styles.primaryBtn} onPress={handleContinue} activeOpacity={0.9}>
          <Text style={styles.primaryBtnText}>Продолжить к транспорту</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    backgroundColor: Colors.primary,
    paddingTop: 52,
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.lg,
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
  headerTitle: { color: '#fff', fontSize: Typography.sizes.xl, fontWeight: Typography.weights.bold },
  headerSub: { color: 'rgba(255,255,255,0.8)', fontSize: Typography.sizes.sm, marginTop: 2 },
  content: { padding: Spacing.xl, gap: Spacing.md, paddingBottom: 120 },
  summaryCard: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    padding: Spacing.base,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadows.sm,
  },
  summaryLabel: { color: Colors.textSecondary, fontSize: Typography.sizes.sm },
  summaryValue: { color: Colors.primary, fontSize: 44, fontWeight: Typography.weights.bold, marginTop: 8 },
  summaryHint: { color: Colors.textSecondary, fontSize: Typography.sizes.sm, marginTop: 4 },
  liveInfo: {
    backgroundColor: Colors.surfaceAlt,
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.base,
    gap: 6,
  },
  liveInfoTitle: { color: Colors.text, fontSize: Typography.sizes.base, fontWeight: Typography.weights.semibold },
  liveInfoText: { color: Colors.textSecondary, fontSize: Typography.sizes.sm, lineHeight: 20 },
  partnerBtnsRow: { marginTop: 4, gap: 8, flexDirection: 'row', flexWrap: 'wrap' },
  partnerMiniBtn: { backgroundColor: '#E8EEF9', borderColor: '#C8D6F1', borderWidth: 1, borderRadius: BorderRadius.lg, paddingHorizontal: 10, paddingVertical: 8 },
  partnerMiniBtnAlt: { backgroundColor: Colors.surface, borderColor: Colors.border },
  partnerMiniBtnText: { color: Colors.primary, fontSize: Typography.sizes.xs, fontWeight: Typography.weights.semibold },
  partnerMiniBtnTextAlt: { color: Colors.text },
  filtersCard: { backgroundColor: Colors.surface, borderRadius: BorderRadius.xl, borderWidth: 1, borderColor: Colors.border, padding: Spacing.base, ...Shadows.sm },
  filtersTitle: { color: Colors.text, fontSize: Typography.sizes.base, fontWeight: Typography.weights.semibold },
  filtersRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 10 },
  filterChip: { borderWidth: 1, borderColor: Colors.border, backgroundColor: Colors.surfaceAlt, borderRadius: 999, paddingHorizontal: 10, paddingVertical: 7 },
  filterChipActive: { borderColor: Colors.primary, backgroundColor: Colors.primary + '14' },
  filterChipText: { color: Colors.textSecondary, fontSize: Typography.sizes.sm },
  filterChipTextActive: { color: Colors.primary, fontWeight: Typography.weights.semibold },
  filtersSummary: { marginTop: 10, color: Colors.textSecondary, fontSize: Typography.sizes.sm },
  emptyCard: { backgroundColor: Colors.surface, borderWidth: 1, borderColor: Colors.border, borderRadius: BorderRadius.xl, padding: Spacing.base },
  emptyTitle: { color: Colors.text, fontSize: Typography.sizes.base, fontWeight: Typography.weights.semibold },
  emptyText: { color: Colors.textSecondary, fontSize: Typography.sizes.sm, marginTop: 4 },
  card: { backgroundColor: Colors.surface, borderRadius: BorderRadius.xl, borderWidth: 1, borderColor: Colors.border, padding: Spacing.base, gap: 6, ...Shadows.card },
  cardActive: { borderColor: Colors.primary, borderWidth: 2 },
  cardImage: { width: '100%', height: 130, borderRadius: BorderRadius.lg, marginBottom: 6 },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 },
  cardTitle: { color: Colors.text, fontSize: Typography.sizes.xl, fontWeight: Typography.weights.bold, flex: 1 },
  cardPrice: { color: Colors.primary, fontSize: Typography.sizes.xl, fontWeight: Typography.weights.bold },
  cardMeta: { color: Colors.textSecondary, fontSize: Typography.sizes.sm },
  cardRoom: { color: Colors.text, fontSize: Typography.sizes.base, fontWeight: Typography.weights.medium },
  cardAmenities: { color: Colors.textSecondary, fontSize: Typography.sizes.sm },
  cardNightPrice: { color: Colors.primary, fontSize: Typography.sizes.lg, fontWeight: Typography.weights.semibold },
  cardSource: { color: Colors.textSecondary, fontSize: Typography.sizes.xs },
  badge: { alignSelf: 'flex-start', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 5 },
  badgeOk: { backgroundColor: '#D1F2DF' },
  badgeWarn: { backgroundColor: '#F7E4B5' },
  badgeText: { fontSize: Typography.sizes.sm, fontWeight: Typography.weights.semibold },
  badgeTextOk: { color: '#1B7A4A' },
  badgeTextWarn: { color: '#A35A00' },
  footer: { backgroundColor: Colors.surface, borderTopWidth: 1, borderColor: Colors.border, paddingTop: Spacing.md },
  primaryBtn: {
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.xl,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    ...Shadows.md,
  },
  primaryBtnText: { color: '#fff', fontSize: Typography.sizes.lg, fontWeight: Typography.weights.bold },
});
