import React, { useEffect, useMemo, useState } from 'react';
import { Alert, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Colors from '@/constants/colors';
import { BorderRadius, Shadows, Spacing, Typography } from '@/constants/theme';
import { getTransportOptions, TransportCatalogItem, TransportType } from '@/constants/transportCatalog';
import { searchYandexRasp, YandexRaspOffer } from '@/store/yandexRaspApi';
import {
  buildYandexBusesLink,
  buildYandexFlightsLink,
  buildYandexTrainsLink,
  buildYandexTravelMainLink,
} from '@/store/deepLinksService';
import { useStore } from '@/store/useStore';
import { track } from '@/store/analyticsService';

type TransportOption = {
  id: string;
  type: TransportType;
  carrier: string;
  threadNumber?: string;
  fromStation?: string;
  toStation?: string;
  tariffs?: Array<{ className: string; price: number; seats?: number }>;
  departureAt?: string | null;
  arrivalAt?: string | null;
  duration: string;
  pricePerPersonRoundTrip: number;
  totalPrice: number;
  fitsBudget: boolean;
  source: 'catalog' | 'yandex_rasp';
  priceSource?: 'live' | 'estimated';
};

function getNights(startDate: string, endDate: string): number {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diff = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  return Math.max(1, Number.isFinite(diff) ? diff : 1);
}

function toDurationText(minutes: number): string {
  const safe = Math.max(1, Math.round(minutes || 0));
  const h = Math.floor(safe / 60);
  const m = safe % 60;
  if (h === 0) return `${m} мин`;
  if (m === 0) return `${h} ч`;
  return `${h} ч ${m} мин`;
}

function toClock(iso?: string | null): string {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

function toDateShort(iso?: string | null): string {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleDateString('ru-RU', { day: '2-digit', month: 'short' }).replace('.', '');
}

function typeLabel(type: TransportType): string {
  if (type === 'flight') return 'Самолет';
  if (type === 'train') return 'Поезд';
  return 'Автобус';
}

function typeIcon(type: TransportType): keyof typeof Ionicons.glyphMap {
  if (type === 'flight') return 'airplane';
  if (type === 'train') return 'train';
  return 'bus';
}

function normalizeCatalogOption(
  option: TransportCatalogItem,
  index: number,
  travelers: number,
  availableForTransport: number
): TransportOption {
  const totalPrice = option.pricePerPersonRoundTrip * travelers;
  return {
    id: `cat-${option.type}-${option.carrier}-${index}`,
    source: 'catalog',
    type: option.type,
    carrier: option.carrier,
    departureAt: null,
    arrivalAt: null,
    fromStation: '',
    toStation: '',
    tariffs: [],
    duration: option.duration,
    pricePerPersonRoundTrip: option.pricePerPersonRoundTrip,
    totalPrice,
    fitsBudget: totalPrice <= availableForTransport,
    priceSource: 'estimated',
  };
}

function normalizeYandexOption(
  option: YandexRaspOffer,
  travelers: number,
  availableForTransport: number
): TransportOption {
  const totalPrice = option.totalPrice || option.pricePerPersonRoundTrip * travelers;
  return {
    id: `yr-${option.id}`,
    source: 'yandex_rasp',
    type: option.type,
    carrier: option.carrier,
    threadNumber: option.threadNumber || undefined,
    fromStation: option.fromStation || '',
    toStation: option.toStation || '',
    tariffs: option.tariffs || [],
    departureAt: option.departureAt,
    arrivalAt: option.arrivalAt,
    duration: toDurationText(option.durationMinutes),
    pricePerPersonRoundTrip: option.pricePerPersonRoundTrip,
    totalPrice,
    fitsBudget: totalPrice <= availableForTransport,
    priceSource: option.priceSource || 'estimated',
  };
}

export default function TransportSelectScreen() {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const isCompact = width < 370;
  const horizontalPadding = isCompact ? Spacing.lg : Spacing.xl;
  const scheduleMiddleWidth = isCompact ? 54 : 70;

  const tripForm = useStore((s) => s.tripForm);
  const updateTripForm = useStore((s) => s.updateTripForm);
  const [selectedId, setSelectedId] = useState<string>('');
  const [yandexOffers, setYandexOffers] = useState<YandexRaspOffer[]>([]);
  const [yandexStatus, setYandexStatus] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle');
  const [yandexMessage, setYandexMessage] = useState<string>('');

  const isFormValid = Boolean(
    tripForm.from
      && tripForm.to
      && tripForm.startDate
      && tripForm.endDate
      && tripForm.budget > 0
      && tripForm.preferredHotelPricePerNight > 0
  );

  const nights = getNights(tripForm.startDate, tripForm.endDate);
  const hotelTotal = tripForm.preferredHotelPricePerNight * nights;
  const availableForTransport = Math.max(0, tripForm.budget - hotelTotal);

  useEffect(() => {
    if (!isFormValid) return;
    let cancelled = false;
    setYandexStatus('loading');
    setYandexMessage('');
    searchYandexRasp({
      from: tripForm.from,
      to: tripForm.to,
      date: tripForm.startDate,
      travelers: tripForm.travelers,
    })
      .then((res) => {
        if (cancelled) return;
        if (!res.ok) {
          setYandexStatus('error');
          setYandexOffers([]);
          setYandexMessage(res.message);
          return;
        }
        setYandexStatus('ok');
        setYandexOffers(res.offers);
      })
      .catch(() => {
        if (cancelled) return;
        setYandexStatus('error');
        setYandexOffers([]);
        setYandexMessage('Не удалось получить расписание');
      });
    return () => {
      cancelled = true;
    };
  }, [isFormValid, tripForm.from, tripForm.to, tripForm.startDate, tripForm.travelers]);

  const options = useMemo<TransportOption[]>(() => {
    if (!isFormValid) return [];
    const fromYandex = yandexOffers.map((item) =>
      normalizeYandexOption(item, tripForm.travelers, availableForTransport)
    );
    const fromCatalog = getTransportOptions(tripForm.from, tripForm.to).map((item, index) =>
      normalizeCatalogOption(item, index, tripForm.travelers, availableForTransport)
    );
    const merged = [...fromYandex, ...fromCatalog];
    const unique = new Map<string, TransportOption>();
    for (const item of merged) {
      const key = `${item.type}:${item.carrier}:${item.duration}:${item.pricePerPersonRoundTrip}`;
      if (!unique.has(key)) unique.set(key, item);
    }
    return [...unique.values()].sort((a, b) => a.totalPrice - b.totalPrice);
  }, [
    isFormValid,
    yandexOffers,
    tripForm.travelers,
    tripForm.from,
    tripForm.to,
    availableForTransport,
  ]);

  const selected = options.find((item) => item.id === selectedId);

  const handleGenerate = () => {
    if (!selected) {
      Alert.alert('Выберите транспорт', 'Нужно выбрать один из предложенных вариантов.');
      return;
    }

    const payload = {
      preferredTransportType: selected.type,
      preferredTransportCarrier: selected.carrier,
      preferredTransportTotalPrice: selected.totalPrice,
    };

    updateTripForm(payload);
    router.push('/trip/generating');
  };

  const openTransportPartner = async (type: TransportType) => {
    void track('yandex_travel_click', { source: 'transport_select', type, from: tripForm.from, to: tripForm.to });
    const link =
      type === 'flight'
        ? buildYandexFlightsLink(tripForm.from, tripForm.to, tripForm.startDate, tripForm.travelers)
        : type === 'train'
          ? buildYandexTrainsLink(tripForm.from, tripForm.to, tripForm.startDate, tripForm.travelers)
          : buildYandexBusesLink(tripForm.from, tripForm.to, tripForm.startDate, tripForm.travelers);

    try {
      await Linking.openURL(link);
    } catch {
      await Linking.openURL(buildYandexTravelMainLink());
    }
  };

  const showTransportApiSetupHelp = () => {
    Alert.alert(
      'Live-расписание недоступно',
      'Чтобы получить реальные рейсы/поезда/автобусы, добавьте YANDEX_RASP_API_KEY в .env и перезапустите backend.',
      [{ text: 'Понятно' }]
    );
  };

  if (!isFormValid) {
    return (
      <View style={[styles.container, { justifyContent: 'center', padding: Spacing.xl }]}>
        <Text style={[styles.headerTitle, { color: Colors.text, marginBottom: 8 }]}>Недостаточно данных</Text>
        <Text style={[styles.cardMeta, { marginTop: 0, marginBottom: 16 }]}>Сначала заполните параметры поездки и выберите отель.</Text>
        <TouchableOpacity style={styles.primaryBtn} onPress={() => router.push('/trip/create')} activeOpacity={0.9}>
          <Text style={styles.primaryBtnText}>К созданию поездки</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View
        style={[
          styles.header,
          {
            paddingTop: insets.top + 12,
            paddingHorizontal: horizontalPadding,
          },
        ]}
      >
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>Выбор транспорта</Text>
          <Text style={styles.headerSub}>{tripForm.from} → {tripForm.to} · {tripForm.travelers} чел.</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={[
          styles.content,
          {
            paddingHorizontal: horizontalPadding,
            paddingBottom: 120 + insets.bottom,
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Остаток бюджета после отеля</Text>
          <Text style={styles.summaryValue}>{availableForTransport.toLocaleString('ru-RU')} ₽</Text>
          <Text style={styles.summaryHint}>Отель: {hotelTotal.toLocaleString('ru-RU')} ₽ ({nights} {nights === 1 ? 'ночь' : nights < 5 ? 'ночи' : 'ночей'})</Text>
        </View>

        <View style={styles.liveInfo}>
          <Text style={styles.liveInfoTitle}>Источник расписаний: Яндекс Расписания</Text>
          {yandexStatus === 'loading' && <Text style={styles.liveInfoText}>Загружаем поезда, самолеты и автобусы...</Text>}
          {yandexStatus === 'ok' && <Text style={styles.liveInfoText}>Live-варианты добавлены в список</Text>}
          {yandexStatus === 'error' && (
            <>
              <Text style={styles.liveInfoText}>
                Live временно недоступен ({yandexMessage || 'без деталей'}). Показаны локальные варианты, можно открыть Яндекс для актуального расписания.
              </Text>
              <View style={styles.partnerBtnsRow}>
                <TouchableOpacity
                  style={styles.partnerMiniBtn}
                  onPress={() => void openTransportPartner('train')}
                  activeOpacity={0.85}
                >
                  <Text style={styles.partnerMiniBtnText}>Открыть поезда в Яндексе</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.partnerMiniBtn, styles.partnerMiniBtnAlt]}
                  onPress={showTransportApiSetupHelp}
                  activeOpacity={0.85}
                >
                  <Text style={[styles.partnerMiniBtnText, styles.partnerMiniBtnTextAlt]}>Как включить live API</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>

        {options.map((option, index) => {
          const active = selectedId === option.id;
          return (
            <TouchableOpacity
              key={`${option.id}-${option.type}-${option.carrier}-${option.departureAt ?? 'dep'}-${index}`}
              style={[styles.card, active && styles.cardActive]}
              onPress={() => setSelectedId(option.id)}
              activeOpacity={0.9}
            >
              <View style={styles.cardTop}>
                <View style={styles.modeWrap}>
                  <Ionicons name={typeIcon(option.type)} size={18} color={Colors.primary} />
                  <Text style={styles.cardType}>{typeLabel(option.type)}</Text>
                </View>
                <Text style={styles.cardPrice}>{option.totalPrice.toLocaleString('ru-RU')} ₽</Text>
              </View>
              {option.departureAt && option.arrivalAt ? (
                <View style={styles.scheduleRow}>
                  <View style={styles.scheduleCol}>
                    <Text style={styles.scheduleTime}>{toClock(option.departureAt)}</Text>
                    <Text style={styles.scheduleDate}>{toDateShort(option.departureAt)}</Text>
                    <Text style={styles.schedulePoint}>{option.fromStation || tripForm.from}</Text>
                  </View>
                  <View style={[styles.scheduleMiddle, { width: scheduleMiddleWidth }]}>
                    <Text style={styles.scheduleDuration}>{option.duration}</Text>
                    <Text style={styles.scheduleArrow}>→</Text>
                  </View>
                  <View style={[styles.scheduleCol, { alignItems: 'flex-end' }]}>
                    <Text style={styles.scheduleTime}>{toClock(option.arrivalAt)}</Text>
                    <Text style={styles.scheduleDate}>{toDateShort(option.arrivalAt)}</Text>
                    <Text style={[styles.schedulePoint, { textAlign: 'right' }]}>{option.toStation || tripForm.to}</Text>
                  </View>
                </View>
              ) : (
                <Text style={styles.cardMeta}>{option.carrier} · {option.duration} · туда-обратно</Text>
              )}
              <Text style={styles.cardMeta}>
                {option.carrier}
                {option.threadNumber ? ` · №${option.threadNumber}` : ''}
              </Text>
              {option.type === 'train' && option.tariffs && option.tariffs.length > 0 && (
                <View style={styles.tariffsWrap}>
                  {option.tariffs.map((t) => (
                    <Text key={`${option.id}-${t.className}-${t.price}`} style={styles.tariffText}>
                      {t.className}: от {t.price.toLocaleString('ru-RU')} ₽{t.seats ? ` · ${t.seats} мест` : ''}
                    </Text>
                  ))}
                </View>
              )}
              <Text style={styles.cardMeta}>За 1 человека: {option.pricePerPersonRoundTrip.toLocaleString('ru-RU')} ₽</Text>
              <Text style={styles.cardMeta}>
                {option.source === 'yandex_rasp'
                  ? `Источник: Yandex Rasp (${option.priceSource === 'live' ? 'цена live' : 'цена оценочная'})`
                  : 'Источник: локальный каталог'}
              </Text>
              <TouchableOpacity
                style={styles.partnerInlineBtn}
                onPress={() => openTransportPartner(option.type)}
                activeOpacity={0.85}
              >
                <Text style={styles.partnerInlineBtnText}>Купить на Яндекс Путешествиях →</Text>
              </TouchableOpacity>
              <View style={[styles.badge, option.fitsBudget ? styles.badgeOk : styles.badgeWarn]}>
                <Text style={[styles.badgeText, option.fitsBudget ? styles.badgeTextOk : styles.badgeTextWarn]}>
                  {option.fitsBudget ? 'Вписывается в бюджет' : 'Превышает остаток бюджета'}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <View
        style={[
          styles.footer,
          {
            paddingHorizontal: horizontalPadding,
            paddingBottom: Spacing.lg + Math.max(insets.bottom, 8),
          },
        ]}
      >
        <TouchableOpacity style={styles.primaryBtn} onPress={handleGenerate} activeOpacity={0.9}>
          <Text style={styles.primaryBtnText}>Сгенерировать маршрут</Text>
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
  headerTitle: {
    color: '#fff',
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.bold,
  },
  headerSub: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: Typography.sizes.sm,
    marginTop: 2,
  },
  content: {
    padding: Spacing.xl,
    gap: Spacing.md,
    paddingBottom: 120,
  },
  summaryCard: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    padding: Spacing.base,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadows.sm,
  },
  summaryLabel: {
    color: Colors.textSecondary,
    fontSize: Typography.sizes.sm,
  },
  summaryValue: {
    color: Colors.primary,
    fontSize: Typography.sizes['2xl'],
    fontWeight: Typography.weights.extrabold,
    marginTop: 2,
  },
  summaryHint: {
    color: Colors.textTertiary,
    fontSize: Typography.sizes.xs,
    marginTop: 2,
  },
  liveInfo: {
    backgroundColor: Colors.surfaceAlt,
    borderRadius: BorderRadius.lg,
    padding: Spacing.base,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  liveInfoTitle: {
    color: Colors.text,
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.semibold,
    marginBottom: 4,
  },
  liveInfoText: {
    color: Colors.textSecondary,
    fontSize: Typography.sizes.xs,
  },
  partnerBtnsRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 10,
    flexWrap: 'wrap',
  },
  partnerMiniBtn: {
    backgroundColor: '#E8EEF9',
    borderWidth: 1,
    borderColor: '#C8D6F1',
    borderRadius: BorderRadius.lg,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  partnerMiniBtnAlt: {
    backgroundColor: Colors.surface,
    borderColor: Colors.border,
  },
  partnerMiniBtnText: {
    color: Colors.primary,
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.semibold,
  },
  partnerMiniBtnTextAlt: {
    color: Colors.text,
  },
  scheduleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 6,
    marginBottom: 2,
  },
  scheduleCol: {
    flex: 1,
  },
  scheduleMiddle: {
    width: 70,
    alignItems: 'center',
  },
  scheduleTime: {
    color: Colors.text,
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.bold,
  },
  scheduleDate: {
    color: Colors.textSecondary,
    fontSize: Typography.sizes.xs,
    marginTop: 2,
  },
  schedulePoint: {
    color: Colors.text,
    fontSize: Typography.sizes.sm,
    marginTop: 3,
  },
  scheduleDuration: {
    color: Colors.textSecondary,
    fontSize: Typography.sizes.xs,
    marginTop: 4,
  },
  scheduleArrow: {
    color: Colors.textSecondary,
    fontSize: Typography.sizes.base,
    marginTop: 10,
  },
  tariffsWrap: {
    marginTop: 4,
  },
  tariffText: {
    color: Colors.textSecondary,
    fontSize: Typography.sizes.sm,
    marginTop: 2,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    padding: Spacing.base,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadows.sm,
  },
  cardActive: {
    borderColor: Colors.primary,
    borderWidth: 2,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  modeWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  cardType: {
    color: Colors.text,
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.bold,
  },
  cardPrice: {
    color: Colors.primary,
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.bold,
  },
  cardMeta: {
    color: Colors.textSecondary,
    fontSize: Typography.sizes.sm,
    marginTop: 4,
  },
  badge: {
    alignSelf: 'flex-start',
    borderRadius: BorderRadius.full,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginTop: 8,
  },
  badgeOk: {
    backgroundColor: '#DCFCE7',
  },
  badgeWarn: {
    backgroundColor: '#FEF3C7',
  },
  badgeText: {
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.semibold,
  },
  badgeTextOk: {
    color: '#166534',
  },
  badgeTextWarn: {
    color: '#92400E',
  },
  partnerInlineBtn: {
    marginTop: 10,
    alignSelf: 'flex-start',
    backgroundColor: '#E8EEF9',
    borderRadius: BorderRadius.lg,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#C8D6F1',
  },
  partnerInlineBtnText: {
    color: Colors.primary,
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.semibold,
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    padding: Spacing.xl,
    paddingBottom: Spacing['3xl'],
  },
  primaryBtn: {
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.xl,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryBtnText: {
    color: '#fff',
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.bold,
  },
});
