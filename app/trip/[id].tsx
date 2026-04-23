import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Linking,
  ActivityIndicator,
  TextInput,
  Alert,
  useWindowDimensions,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Colors from '@/constants/colors';
import { BorderRadius, Shadows, Spacing, Typography } from '@/constants/theme';
import { useStore } from '@/store/useStore';
import { Badge } from '@/components/ui/Badge';
import { AddPlaceModal } from '@/components/AddPlaceModal';
import { AccessibilityPopup } from '@/components/AccessibilityPopup';
import { AddReviewModal } from '@/components/AddReviewModal';
import { ReviewsList } from '@/components/ReviewsList';
import { TripMap } from '@/components/TripMap';
import { WeatherWidget } from '@/components/WeatherWidget';
import { Place, Review, Trip } from '@/constants/data';
import { getMultimodalRoute } from '@/store/multimodalRoute';
import { buildInCityTransitByPlace } from '@/store/inCityMobility';
import { searchYandexRasp, YandexRaspOffer } from '@/store/yandexRaspApi';
import {
  buildYandexBusesLink,
  buildYandexFlightsLink,
  buildOstrovokHotelsLink,
  buildOstrovokMainLink,
  buildYandexTravelMainLink,
  buildYandexTrainsLink,
  buildYandexHotelsLink,
} from '@/store/deepLinksService';
import { OstrovokOffer, searchOstrovok } from '@/store/ostrovokApi';
import { getWeatherForecast, WeatherForecast } from '@/store/weatherApi';
import { useNetworkStatus } from '@/hooks/useNetworkStatus';
import { cacheTrip, getCachedTrip, removeCachedTrip } from '@/store/offlineService';
import { shareTrip } from '@/store/shareService';

type TabId = 'plan' | 'transport' | 'hotels' | 'budget' | 'map';

function buildIsoDates(startDate: string, daysCount: number): string[] {
  const start = new Date(startDate);
  if (Number.isNaN(start.getTime()) || daysCount <= 0) return [];
  const dates: string[] = [];
  for (let i = 0; i < daysCount; i += 1) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    dates.push(d.toISOString().slice(0, 10));
  }
  return dates;
}

export default function TripDetailScreen() {
  const insets = useSafeAreaInsets();
  const { height } = useWindowDimensions();
  const heroHeight = Math.max(240, Math.min(320, Math.round(height * 0.34)));

  const { id } = useLocalSearchParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<TabId>('plan');
  const trips = useStore((s) => s.trips);
  const [cachedTrip, setCachedTrip] = useState<Trip | null>(null);
  const [isCached, setIsCached] = useState(false);
  const { isOnline } = useNetworkStatus();
  const liveTrip = trips.find((t) => t.id === id);
  const trip = liveTrip ?? cachedTrip;
  const [weather, setWeather] = useState<WeatherForecast | null>(null);

  useEffect(() => {
    if (!id) return;
    getCachedTrip(id).then((cached) => {
      setCachedTrip(cached);
      setIsCached(Boolean(cached));
    }).catch(() => {
      setCachedTrip(null);
      setIsCached(false);
    });
  }, [id, trips]);

  useEffect(() => {
    let mounted = true;

    const loadWeather = async () => {
      if (!trip) {
        if (mounted) setWeather(null);
        return;
      }
      const dates = buildIsoDates(trip.startDate, trip.days.length);
      const forecast = await getWeatherForecast(trip.to, dates);
      if (mounted) setWeather(forecast);
    };

    void loadWeather();

    return () => {
      mounted = false;
    };
  }, [trip?.id, trip?.to, trip?.startDate, trip?.days.length]);

  if (!trip) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text style={styles.notFoundEmoji}>🧭</Text>
        <Text style={styles.notFoundTitle}>Поездка не найдена</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.notFoundBackBtn}>
          <Text style={styles.notFoundBackText}>Назад</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleOfflineToggle = async () => {
    if (!id) return;
    if (isCached) {
      await removeCachedTrip(id);
      setIsCached(false);
      if (!liveTrip) {
        setCachedTrip(null);
      }
      return;
    }

    await cacheTrip(trip);
    setIsCached(true);
    setCachedTrip(trip);
  };

  const tabs: { id: TabId; label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
    { id: 'plan', label: 'Маршрут', icon: 'calendar-outline' },
    { id: 'transport', label: 'Транспорт', icon: 'airplane-outline' },
    { id: 'hotels', label: 'Отели', icon: 'bed-outline' },
    { id: 'budget', label: 'Бюджет', icon: 'wallet-outline' },
    { id: 'map', label: 'Карта', icon: 'map-outline' },
  ];

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <View style={[styles.heroContainer, { height: heroHeight }]}>
        <Image source={{ uri: trip.coverImage }} style={styles.heroImage} />
        <View style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(0,0,0,0.35)' }]} />
        <View style={[styles.heroTopBar, { top: insets.top + 8 }]}>
          <TouchableOpacity
            style={styles.heroBtn}
            onPress={() => router.back()}
            accessibilityRole="button"
            accessibilityLabel="Назад"
          >
            <Ionicons name="arrow-back" size={22} color="#fff" />
          </TouchableOpacity>
          <View style={styles.heroTopRight}>
            <TouchableOpacity
              style={styles.heroBtn}
              onPress={() => router.push(`/(wallet)/trip/${trip.id}` as never)}
              accessibilityRole="button"
              accessibilityLabel="Документы поездки"
            >
              <Ionicons name="wallet-outline" size={22} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.heroBtn}
              onPress={() => void handleOfflineToggle()}
              accessibilityRole="button"
              accessibilityLabel={isCached ? 'Удалить из оффлайн' : 'Сохранить для оффлайн'}
            >
              <Ionicons
                name={isCached ? 'checkmark-circle' : 'cloud-download-outline'}
                size={22}
                color={isCached ? '#86EFAC' : '#fff'}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.heroBtn}
              onPress={() => {
                void shareTrip(trip).catch(() => {
                  Alert.alert('Ошибка', 'Не удалось открыть окно шаринга.');
                });
              }}
              accessibilityRole="button"
              accessibilityLabel="Поделиться поездкой"
            >
              <Ionicons name="share-outline" size={22} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.heroBtn} accessibilityRole="button" accessibilityLabel="Добавить в избранное">
              <Ionicons name="heart-outline" size={22} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.heroInfo}>
          <Badge
            label={trip.status === 'upcoming' ? 'Предстоящая' : trip.status === 'past' ? 'Завершенная' : 'Черновик'}
            variant={trip.status === 'upcoming' ? 'success' : 'neutral'}
            size="sm"
          />
          <Text style={styles.heroCity}>{trip.to}</Text>
          <Text style={styles.heroCountry}>{trip.toCountry}</Text>
          <View style={styles.heroMeta}>
            <View style={styles.heroMetaItem}>
              <Ionicons name="calendar-outline" size={14} color="rgba(255,255,255,0.85)" />
              <Text style={styles.heroMetaText}>{trip.startDate} — {trip.endDate}</Text>
            </View>
            <View style={styles.heroMetaItem}>
              <Ionicons name="people-outline" size={14} color="rgba(255,255,255,0.85)" />
              <Text style={styles.heroMetaText}>{trip.travelers} чел.</Text>
            </View>
            <View style={styles.heroMetaItem}>
              <Ionicons name="wallet-outline" size={14} color="rgba(255,255,255,0.85)" />
              <Text style={styles.heroMetaText}>{trip.budget.toLocaleString('ru-RU')} ₽</Text>
            </View>
          </View>
          <WeatherWidget variant="summary" weather={weather?.days[0] ?? null} />
          {(trip.status === 'upcoming' || trip.status === 'past') && (
            <TouchableOpacity
              style={styles.travelModeBtn}
              onPress={() => router.push(`/travel-mode/${trip.id}`)}
              accessibilityLabel="Войти в режим поездки"
              accessibilityRole="button"
            >
              <Ionicons name="navigate" size={16} color="#fff" />
              <Text style={styles.travelModeBtnText}>Travel Mode</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View style={styles.tabs}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            onPress={() => setActiveTab(tab.id)}
            style={[styles.tab, activeTab === tab.id && styles.tabActive]}
            accessibilityRole="tab"
            accessibilityLabel={`Вкладка ${tab.label}`}
            accessibilityState={{ selected: activeTab === tab.id }}
          >
            <Ionicons
              name={tab.icon}
              size={18}
              color={activeTab === tab.id ? Colors.primary : Colors.textSecondary}
              style={styles.tabIcon}
            />
            <Text style={[styles.tabLabel, activeTab === tab.id && styles.tabLabelActive]}>{tab.label}</Text>
            {activeTab === tab.id && <View style={styles.tabIndicator} />}
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView
        contentContainerStyle={[styles.contentInner, { paddingBottom: 32 + insets.bottom }]}
        showsVerticalScrollIndicator={false}
      >
        {activeTab === 'plan' && <DayPlanBlock trip={trip} weather={weather} />}
        {activeTab === 'transport' && <TransportBlock trip={trip} isOnline={isOnline} />}
        {activeTab === 'hotels' && <HotelsBlock trip={trip} isOnline={isOnline} />}
        {activeTab === 'budget' && <BudgetBlock trip={trip} />}
        {activeTab === 'map' && <TripMap days={trip.days} initialCity={trip.to} />}
        <View style={{ height: 24 }} />
      </ScrollView>
    </View>
  );
}

function DayPlanBlock({ trip, weather }: { trip: Trip; weather: WeatherForecast | null }) {
  const multimodalRoute = trip.multimodalRoute ?? getMultimodalRoute(trip);
  const addPlaceToDay = useStore((s) => s.addPlaceToDay);
  const removePlaceFromDay = useStore((s) => s.removePlaceFromDay);
  const movePlaceInDay = useStore((s) => s.movePlaceInDay);
  const addReview = useStore((s) => s.addReview);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [addModalDayIndex, setAddModalDayIndex] = useState(0);
  const [accessiblePopupPlace, setAccessiblePopupPlace] = useState<Place | null>(null);
  const [reviewModalVisible, setReviewModalVisible] = useState(false);
  const [reviewPlace, setReviewPlace] = useState<Place | null>(null);
  const [reviewsRefresh, setReviewsRefresh] = useState(0);
  const modeLabel: Record<string, string> = {
    metro: '🚇 Метро',
    bus: '🚌 Автобус',
    taxi: '🚕 Такси',
    walk: '🚶 Пешком',
    ferry: '⛴️ Паром',
  };

  const typeConfig: Record<string, { emoji: string; label: string; color: string }> = {
    flight: { emoji: '✈️', label: 'Самолёт', color: Colors.primary },
    train: { emoji: '🚆', label: 'Поезд', color: Colors.success },
    bus: { emoji: '🚌', label: 'Автобус', color: Colors.warning },
    metro: { emoji: '🚇', label: 'Метро', color: '#7C3AED' },
    taxi: { emoji: '🚕', label: 'Такси', color: '#EF4444' },
    walk: { emoji: '🚶', label: 'Пешком', color: '#0EA5E9' },
    ferry: { emoji: '⛴️', label: 'Паром', color: '#0F766E' },
  };

  const handleRemovePlace = (dayIndex: number, placeId: string) => {
    Alert.alert(
      'Удалить место?',
      'Место будет убрано из маршрута этого дня.',
      [
        { text: 'Отмена', style: 'cancel' },
        {
          text: 'Удалить',
          style: 'destructive',
          onPress: () => removePlaceFromDay(trip.id, dayIndex, placeId),
        },
      ]
    );
  };

  const handleMovePlace = (dayIndex: number, fromIndex: number, toIndex: number) => {
    movePlaceInDay(trip.id, dayIndex, fromIndex, toIndex);
  };

  return (
    <View>
      {/* ── Как добраться — мультимодальный маршрут ── */}
      {multimodalRoute && (
        <View style={styles.howToGetCard}>
          <View style={styles.howToGetHeader}>
            <Text style={styles.howToGetTitle}>🗺️ Как добраться</Text>
            <View style={styles.howToGetStats}>
              <Text style={styles.howToGetStat}>⏱ {Math.round(multimodalRoute.totalDurationMinutes / 60)} ч</Text>
              <Text style={styles.howToGetStat}>💰 {multimodalRoute.totalPrice.toLocaleString('ru-RU')} ₽</Text>
              <Text style={styles.howToGetStat}>🌿 {multimodalRoute.totalCo2Kg} кг CO₂</Text>
            </View>
          </View>
          <Text style={styles.howToGetSummary}>{multimodalRoute.summary}</Text>
          <View style={styles.howToGetSegments}>
            {multimodalRoute.segments.map((seg, idx) => {
              const cfg = typeConfig[seg.mode] ?? { emoji: '🚗', label: seg.mode, color: Colors.textSecondary };
              return (
                <View key={`${seg.id}-${idx}`} style={styles.howToGetSegment}>
                  <View style={[styles.howToGetSegDot, { backgroundColor: seg.color ?? cfg.color }]} />
                  {idx < multimodalRoute.segments.length - 1 && <View style={styles.howToGetSegLine} />}
                  <View style={styles.howToGetSegContent}>
                    <View style={styles.howToGetSegHeader}>
                      <Text style={styles.howToGetSegMode}>{cfg.emoji} {cfg.label}</Text>
                      {seg.carrier && <Text style={styles.howToGetSegCarrier}>{seg.carrier}</Text>}
                      <Text style={styles.howToGetSegPrice}>{seg.price > 0 ? `${seg.price.toLocaleString('ru-RU')} ₽` : 'Бесплатно'}</Text>
                    </View>
                    <Text style={styles.howToGetSegRoute}>{seg.from} → {seg.to}</Text>
                    <Text style={styles.howToGetSegMeta}>{seg.departure} – {seg.arrival} · {seg.durationMinutes} мин</Text>
                  </View>
                </View>
              );
            })}
          </View>
          {multimodalRoute.directFlightCo2Kg > 0 && (
            <View style={styles.ecoRow}>
              <Ionicons name="leaf-outline" size={14} color={Colors.success} />
              <Text style={styles.ecoText}>
                Экономия CO₂ vs прямой перелёт: {Math.max(0, multimodalRoute.directFlightCo2Kg - multimodalRoute.totalCo2Kg)} кг
              </Text>
            </View>
          )}
        </View>
      )}

      {/* ── Дни маршрута ── */}
      {trip.days.map((day, dayIndex) => (
        <View key={day.day} style={styles.daySection}>
          {(() => {
            const transitByPlace = buildInCityTransitByPlace(day, trip.to);
            return (
              <>
          <View style={styles.dayHeader}>
            <View style={styles.dayBadge}>
              <Text style={styles.dayBadgeText}>День {day.day}</Text>
            </View>
            <Text style={styles.dayDate}>{day.date}</Text>
            <WeatherWidget variant="day" weather={weather?.days[dayIndex] ?? null} />
          </View>
          {day.places.map((place, index) => (
            <Swipeable
              key={`${place.id}-${dayIndex}-${index}`}
              overshootLeft={false}
              renderLeftActions={() => (
                <TouchableOpacity style={styles.deleteAction} onPress={() => handleRemovePlace(dayIndex, place.id)}>
                  <Ionicons name="trash-outline" size={20} color={Colors.textInverse} />
                  <Text style={styles.deleteActionText}>Удалить</Text>
                </TouchableOpacity>
              )}
            >
            <View style={styles.placeCard}>
              <View style={styles.placeTimeline}>
                <Text style={styles.placeTime}>{place.time}</Text>
                <View style={styles.timelineDot} />
                {index < day.places.length - 1 && <View style={styles.timelineLine} />}
              </View>
              <View style={styles.placeContent}>
                <View style={styles.placeHeader}>
                  <Text style={styles.placeEmoji}>{place.emoji}</Text>
                  <View style={styles.placeTitleRow}>
                    <Text style={styles.placeName}>{place.name}</Text>
                    <View style={styles.placeHeaderActions}>
                      <View style={styles.placeRating}>
                        <Ionicons name="star" size={12} color={Colors.warning} />
                        <Text style={styles.placeRatingText}>{place.rating}</Text>
                      </View>
                      {place.accessible?.wheelchair && (
                        <TouchableOpacity
                          style={styles.accessibleBadge}
                          onPress={() => setAccessiblePopupPlace(place)}
                          accessibilityLabel="Место доступно для людей с ОВЗ. Нажмите для подробностей"
                          accessibilityRole="button"
                        >
                          <Text style={styles.accessibleBadgeText}>♿</Text>
                        </TouchableOpacity>
                      )}
                      <View style={styles.moveControls}>
                        <TouchableOpacity
                          style={[styles.moveBtn, index === 0 && styles.moveBtnDisabled]}
                          onPress={() => handleMovePlace(dayIndex, index, index - 1)}
                          disabled={index === 0}
                          accessibilityRole="button"
                          accessibilityLabel="Переместить место выше"
                        >
                          <Ionicons name="chevron-up" size={14} color={index === 0 ? Colors.textTertiary : Colors.primary} />
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={[styles.moveBtn, index === day.places.length - 1 && styles.moveBtnDisabled]}
                          onPress={() => handleMovePlace(dayIndex, index, index + 1)}
                          disabled={index === day.places.length - 1}
                          accessibilityRole="button"
                          accessibilityLabel="Переместить место ниже"
                        >
                          <Ionicons
                            name="chevron-down"
                            size={14}
                            color={index === day.places.length - 1 ? Colors.textTertiary : Colors.primary}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
                <Badge label={place.category} variant="primary" size="sm" style={{ marginBottom: 6 }} />
                <Text style={styles.placeDescription}>{place.description}</Text>
                {transitByPlace[place.id] && (
                  <View style={styles.placeTransitBox}>
                    <Text style={styles.placeTransitTitle}>Как добраться: {transitByPlace[place.id].from} → {transitByPlace[place.id].to}</Text>
                    <Text style={styles.placeTransitLegs}>
                      {transitByPlace[place.id].legs.map((leg) => `${modeLabel[leg.mode]} ${leg.durationMinutes} мин`).join(' · ')}
                    </Text>
                    <Text style={styles.placeTransitMeta}>
                      ~{transitByPlace[place.id].totalDurationMinutes} мин · {transitByPlace[place.id].totalPrice > 0 ? `${transitByPlace[place.id].totalPrice.toLocaleString('ru-RU')} ₽` : 'бесплатно'}
                    </Text>
                  </View>
                )}
                <View style={styles.placeMeta}>
                  <View style={styles.placeMetaItem}>
                    <Ionicons name="time-outline" size={13} color={Colors.textSecondary} />
                    <Text style={styles.placeMetaText}>{place.duration}</Text>
                  </View>
                  {place.price && (
                    <View style={styles.placeMetaItem}>
                      <Ionicons name="ticket-outline" size={13} color={Colors.textSecondary} />
                      <Text style={styles.placeMetaText}>{place.price}</Text>
                    </View>
                  )}
                </View>
                {trip.status === 'past' && (
                  <TouchableOpacity
                    onPress={() => {
                      setReviewPlace(place);
                      setReviewModalVisible(true);
                    }}
                    style={styles.reviewBtn}
                    accessibilityLabel={`Оставить отзыв о ${place.name}`}
                    accessibilityRole="button"
                  >
                    <Ionicons name="chatbubble-outline" size={16} color={Colors.primary} />
                    <Text style={styles.reviewBtnText}>Отзыв</Text>
                  </TouchableOpacity>
                )}
                <ReviewsList placeId={place.id} refreshToken={reviewsRefresh} />
              </View>
            </View>
            </Swipeable>
          ))}
          <TouchableOpacity
            style={styles.addPlaceBtn}
            onPress={() => {
              setAddModalDayIndex(dayIndex);
              setAddModalVisible(true);
            }}
            accessibilityRole="button"
            accessibilityLabel={`Добавить место в день ${day.day}`}
          >
            <Ionicons name="add-circle-outline" size={18} color={Colors.primary} />
            <Text style={styles.addPlaceBtnText}>Добавить место</Text>
          </TouchableOpacity>
          {day.places.length === 0 && (
            <View style={styles.emptyDayCard}>
              <Text style={styles.emptyDayTitle}>Свободный блок</Text>
              <Text style={styles.emptyDayText}>В этот день нет фиксированных точек. Добавьте свои активности перед поездкой.</Text>
            </View>
          )}
              </>
            );
          })()}
        </View>
      ))}
      <AddPlaceModal
        visible={addModalVisible}
        onClose={() => setAddModalVisible(false)}
        onAdd={(place: Place) => {
          addPlaceToDay(trip.id, addModalDayIndex, place);
          setAddModalVisible(false);
        }}
        city={trip.to}
        existingPlaceIds={trip.days[addModalDayIndex]?.places.map((p) => p.id) ?? []}
        existingPlaceNames={trip.days[addModalDayIndex]?.places.map((p) => p.name) ?? []}
      />
      <AccessibilityPopup place={accessiblePopupPlace} onClose={() => setAccessiblePopupPlace(null)} />
      <AddReviewModal
        visible={reviewModalVisible}
        tripId={trip.id}
        place={reviewPlace}
        onClose={() => {
          setReviewModalVisible(false);
          setReviewPlace(null);
        }}
        onSubmit={(review: Review) => {
          void addReview(review).then(() => {
            setReviewModalVisible(false);
            setReviewPlace(null);
            setReviewsRefresh((v) => v + 1);
          });
        }}
      />
    </View>
  );
}

function TransportBlock({ trip, isOnline }: { trip: Trip; isOnline: boolean }) {
  const multimodalRoute = getMultimodalRoute(trip);
  const [liveOffers, setLiveOffers] = useState<YandexRaspOffer[]>([]);
  const [liveLoading, setLiveLoading] = useState(false);
  const [liveError, setLiveError] = useState<string | null>(null);

  const typeConfig = {
    flight: { emoji: '✈️', label: 'Самолет', color: Colors.primary },
    train: { emoji: '🚆', label: 'Поезд', color: Colors.success },
    bus: { emoji: '🚌', label: 'Автобус', color: Colors.warning },
    metro: { emoji: '🚇', label: 'Метро', color: '#7C3AED' },
    taxi: { emoji: '🚕', label: 'Такси', color: '#EF4444' },
    walk: { emoji: '🚶', label: 'Пешком', color: '#0EA5E9' },
    ferry: { emoji: '⛴️', label: 'Паром', color: '#0F766E' },
  };

  useEffect(() => {
    if (!isOnline) {
      setLiveLoading(false);
      setLiveOffers([]);
      setLiveError('Нет интернета — показаны локальные данные');
      return;
    }
    setLiveLoading(true);
    setLiveError(null);
    searchYandexRasp({
      from: trip.from,
      to: trip.to,
      date: trip.startDate,
      travelers: trip.travelers,
    })
      .then((res) => {
        if (!res.ok) {
          setLiveError(res.message);
          setLiveOffers([]);
          return;
        }
        setLiveOffers(res.offers.slice(0, 6));
      })
      .catch(() => setLiveError('Не удалось загрузить расписание'))
      .finally(() => setLiveLoading(false));
  }, [isOnline, trip.from, trip.to, trip.startDate, trip.travelers]);

  const openTransportPartner = async (type: 'flight' | 'train' | 'bus') => {
    if (!isOnline) {
      Alert.alert('Нет интернета', 'Подключитесь к сети для поиска билетов и расписания.');
      return;
    }
    const link =
      type === 'flight'
        ? buildYandexFlightsLink(trip.from, trip.to, trip.startDate, trip.travelers)
        : type === 'train'
          ? buildYandexTrainsLink(trip.from, trip.to, trip.startDate, trip.travelers)
          : buildYandexBusesLink(trip.from, trip.to, trip.startDate, trip.travelers);
    try {
      await Linking.openURL(link);
    } catch {
      await Linking.openURL(buildYandexTravelMainLink());
    }
  };

  const showScheduleApiSetup = () => {
    Alert.alert(
      'Live-расписание недоступно',
      'Добавьте YANDEX_RASP_API_KEY в .env backend и перезапустите API, чтобы показывать актуальные варианты.',
      [{ text: 'Понятно' }]
    );
  };

  return (
    <View>
      <View style={styles.realFlightsSection}>
        <View style={styles.realFlightsHeader}>
          <Text style={styles.tabSectionTitle}>Расписание Яндекс</Text>
          <View style={styles.aviasalesBadge}>
            <Text style={styles.aviasalesBadgeText}>live</Text>
          </View>
        </View>
        <Text style={styles.realFlightsSubtitle}>Актуальные варианты на {trip.from} → {trip.to}</Text>

        {liveLoading && (
          <View style={styles.flightsLoader}>
            <ActivityIndicator color={Colors.primary} />
            <Text style={styles.flightsLoaderText}>Загружаем транспорт...</Text>
          </View>
        )}

        {liveError && !liveLoading && (
          <View style={styles.flightsError}>
            <Text style={styles.flightsErrorText}>⚠️ {liveError}</Text>
            <View style={styles.fallbackActionsRow}>
              <TouchableOpacity style={styles.fallbackActionBtn} onPress={() => void openTransportPartner('train')} activeOpacity={0.85}>
                <Text style={styles.fallbackActionBtnText}>Открыть расписание в Яндексе</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.fallbackActionBtn, styles.fallbackActionBtnAlt]} onPress={showScheduleApiSetup} activeOpacity={0.85}>
                <Text style={[styles.fallbackActionBtnText, styles.fallbackActionBtnTextAlt]}>Как включить live API</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {!liveLoading && !liveError && liveOffers.length === 0 && (
          <View style={styles.flightsError}>
            <Text style={styles.flightsErrorText}>На выбранную дату live-варианты не найдены</Text>
            <View style={styles.fallbackActionsRow}>
              <TouchableOpacity style={styles.fallbackActionBtn} onPress={() => void openTransportPartner('flight')} activeOpacity={0.85}>
                <Text style={styles.fallbackActionBtnText}>Открыть авиабилеты в Яндексе</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.fallbackActionBtn, styles.fallbackActionBtnAlt]} onPress={() => void openTransportPartner('train')} activeOpacity={0.85}>
                <Text style={[styles.fallbackActionBtnText, styles.fallbackActionBtnTextAlt]}>Открыть поезда в Яндексе</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {liveOffers.map((offer, index) => (
          <View key={`${offer.id}-${offer.departureAt ?? 'dep'}-${index}`} style={styles.realFlightCard}>
            <View style={styles.realFlightTop}>
              <View style={styles.realFlightAirline}>
                <Text style={styles.realFlightAirlineText}>
                  {offer.type === 'flight' ? '✈️' : offer.type === 'train' ? '🚆' : '🚌'} {offer.carrier}
                </Text>
                {offer.threadNumber ? (
                  <View style={styles.directBadge}>
                    <Text style={styles.directBadgeText}>№{offer.threadNumber}</Text>
                  </View>
                ) : null}
              </View>
              <Text style={styles.realFlightPrice}>{offer.totalPrice.toLocaleString('ru-RU')} ₽</Text>
            </View>

            <View style={styles.realFlightRoute}>
              <View style={styles.realFlightCity}>
                <Text style={styles.realFlightTime}>
                  {offer.departureAt
                    ? new Date(offer.departureAt).toLocaleTimeString('ru-RU', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })
                    : '—'}
                </Text>
                <Text style={styles.realFlightCityName}>{offer.fromStation || trip.from}</Text>
              </View>

              <View style={styles.realFlightMiddle}>
                <Text style={styles.realFlightDuration}>{Math.max(1, Math.round(offer.durationMinutes / 60))} ч</Text>
                <View style={styles.realFlightLine}>
                  <View style={styles.transportDot} />
                  <View style={styles.transportDash} />
                  <Text style={styles.transportPlane}>{offer.type === 'flight' ? '✈️' : offer.type === 'train' ? '🚆' : '🚌'}</Text>
                  <View style={styles.transportDash} />
                  <View style={styles.transportDot} />
                </View>
              </View>

              <View style={[styles.realFlightCity, { alignItems: 'flex-end' }]}>
                <Text style={styles.realFlightTime}>
                  {offer.arrivalAt
                    ? new Date(offer.arrivalAt).toLocaleTimeString('ru-RU', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })
                    : '—'}
                </Text>
                <Text style={styles.realFlightCityName}>{offer.toStation || trip.to}</Text>
              </View>
            </View>

            <TouchableOpacity
              style={[styles.buyBtn, !isOnline && styles.bookBtnDisabled]}
              onPress={() => void openTransportPartner(offer.type)}
              activeOpacity={0.85}
            >
              <Text style={styles.buyBtnText}>Купить на Яндекс Путешествиях →</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* ── Мультимодальный маршрут ── */}
      {multimodalRoute && (
        <View style={styles.multimodalCard}>
          <Text style={styles.tabSectionTitle}>Мультимодальный маршрут</Text>
          <Text style={styles.multimodalSummary}>{multimodalRoute.summary}</Text>
          <View style={styles.multimodalStats}>
            <Text style={styles.multimodalStat}>⏱ {Math.round(multimodalRoute.totalDurationMinutes / 60)} ч</Text>
            <Text style={styles.multimodalStat}>🔁 {multimodalRoute.transfers} перес.</Text>
            <Text style={styles.multimodalStat}>🧪 CO₂ {multimodalRoute.totalCo2Kg} кг</Text>
          </View>
          <Text style={styles.multimodalEco}>Прямой перелет: ~{multimodalRoute.directFlightCo2Kg} кг CO₂</Text>

          {multimodalRoute.segments.map((segment) => {
            const cfg = typeConfig[segment.mode as keyof typeof typeConfig] ?? { emoji: '🚗', label: segment.mode, color: Colors.textSecondary };
            return (
              <View key={segment.id} style={styles.segmentRow}>
                <View style={[styles.segmentDot, { backgroundColor: segment.color }]} />
                <View style={styles.segmentMain}>
                  <View style={styles.segmentHeader}>
                    <Text style={styles.segmentMode}>{cfg.emoji} {cfg.label}</Text>
                    <Text style={styles.segmentPrice}>{segment.price.toLocaleString('ru-RU')} ₽</Text>
                  </View>
                  <Text style={styles.segmentRoute}>{segment.from} → {segment.to}</Text>
                  <Text style={styles.segmentMeta}>
                    {segment.departure}–{segment.arrival} · {segment.durationMinutes} мин · {segment.distanceKm} км
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      )}

      {/* ── Яндекс Путешествия ── */}
      <View style={[styles.partnerCard, styles.yandexCard]}>
        <View style={styles.partnerCardHeader}>
          <Text style={styles.partnerCardTitle}>🟡 Яндекс Путешествия</Text>
          <View style={[styles.partnerBadge, { backgroundColor: '#FFFDE7' }]}>
            <Text style={[styles.partnerBadgeText, { color: '#F57F17' }]}>Всё в одном</Text>
          </View>
        </View>
        <Text style={styles.partnerCardSubtitle}>
          Авиабилеты, поезда и отели в одном приложении
        </Text>
        <View style={styles.partnerBtns}>
          <TouchableOpacity
            style={[styles.partnerBtn, !isOnline && styles.bookBtnDisabled]}
            onPress={() => void openTransportPartner('flight')}
            activeOpacity={0.85}
          >
            <Text style={styles.partnerBtnText}>✈️ Авиа →</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.partnerBtn, { backgroundColor: Colors.surface, borderWidth: 1, borderColor: Colors.border }, !isOnline && styles.bookBtnDisabled]}
            onPress={() => void openTransportPartner('train')}
            activeOpacity={0.85}
          >
            <Text style={[styles.partnerBtnText, { color: Colors.text }]}>🚆 Поезда →</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* ── Альтернативные варианты ── */}
      <Text style={styles.tabSectionTitle}>Альтернативные варианты</Text>
      {trip.transport.map((t) => {
        const cfg = typeConfig[t.type as keyof typeof typeConfig] ?? { emoji: '🚗', label: t.type, color: Colors.textSecondary };
        return (
          <View key={t.id} style={styles.transportCard}>
            <View style={styles.transportHeader}>
              <View style={[styles.transportTypeBadge, { backgroundColor: cfg.color + '20' }]}>
                <Text style={styles.transportTypeEmoji}>{cfg.emoji}</Text>
                <Text style={[styles.transportTypeLabel, { color: cfg.color }]}>{cfg.label}</Text>
              </View>
              <Text style={styles.transportCarrier}>{t.carrier}</Text>
            </View>

            <View style={styles.transportRoute}>
              <View style={styles.transportCity}>
                <Text style={styles.transportTime}>{t.departure}</Text>
                <Text style={styles.transportCityName}>{t.from}</Text>
              </View>
              <View style={styles.transportMiddle}>
                <Text style={styles.transportDuration}>{t.duration}</Text>
                <View style={styles.transportLine}>
                  <View style={styles.transportDot} />
                  <View style={styles.transportDash} />
                  <Text style={styles.transportPlane}>{cfg.emoji}</Text>
                  <View style={styles.transportDash} />
                  <View style={styles.transportDot} />
                </View>
                {t.class && <Text style={styles.transportClass}>{t.class}</Text>}
              </View>
              <View style={[styles.transportCity, styles.transportCityRight]}>
                <Text style={styles.transportTime}>{t.arrival}</Text>
                <Text style={styles.transportCityName}>{t.to}</Text>
              </View>
            </View>

            <View style={styles.transportFooter}>
              <Text style={styles.transportPrice}>{Number(t.price).toLocaleString('ru-RU')} ₽</Text>
              <TouchableOpacity style={styles.bookBtn}>
                <View style={styles.bookBtnGradient}>
                  <Text style={styles.bookBtnText}>Смотреть →</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        );
      })}
    </View>
  );
}

function HotelsBlock({ trip, isOnline }: { trip: Trip; isOnline: boolean }) {
  const [liveHotels, setLiveHotels] = useState<OstrovokOffer[]>([]);
  const [hotelsLoading, setHotelsLoading] = useState(false);
  const nights = Math.max(1, Math.round(
    (new Date(trip.endDate).getTime() - new Date(trip.startDate).getTime()) / 86400000
  ));
  const bookUrl = buildOstrovokHotelsLink(trip.to, trip.startDate, trip.endDate, trip.travelers);

  const openHotelsLink = async () => {
    if (!isOnline) {
      Alert.alert('Нет интернета', 'Подключитесь к сети для поиска отелей.');
      return;
    }
    try {
      await Linking.openURL(bookUrl);
    } catch {
      await Linking.openURL(buildOstrovokMainLink());
    }
  };

  const showHotelsApiSetup = () => {
    Alert.alert(
      'Live-отели недоступны',
      'Добавьте OSTROVOK_KEY_ID и OSTROVOK_API_KEY (или OSTROVOK_AUTH_HEADER) в .env backend и перезапустите API.',
      [{ text: 'Понятно' }]
    );
  };

  useEffect(() => {
    if (!isOnline) {
      setHotelsLoading(false);
      setLiveHotels([]);
      return;
    }
    setHotelsLoading(true);
    searchOstrovok({
      city: trip.to,
      checkin: trip.startDate,
      checkout: trip.endDate,
      adults: trip.travelers,
    })
      .then((res) => setLiveHotels(res.ok ? res.offers : []))
      .catch(() => setLiveHotels([]))
      .finally(() => setHotelsLoading(false));
  }, [isOnline, trip.to, trip.startDate, trip.endDate, trip.travelers]);

  return (
    <View>
      <View style={styles.hotelLiveHeader}>
        <Text style={styles.tabSectionTitle}>Отели на ваши даты</Text>
        <View style={styles.aviasalesBadge}>
          <Text style={styles.aviasalesBadgeText}>live</Text>
        </View>
      </View>
      <Text style={styles.hotelLiveSubtitle}>
        {nights} {nights === 1 ? 'ночь' : nights < 5 ? 'ночи' : 'ночей'} · {trip.to}
      </Text>

      {hotelsLoading && (
        <View style={styles.flightsLoader}>
          <ActivityIndicator color={Colors.primary} />
          <Text style={styles.flightsLoaderText}>Ищем отели...</Text>
        </View>
      )}

      {!hotelsLoading && liveHotels.length > 0 && liveHotels.map((hotel, index) => {
        return (
          <TouchableOpacity key={`${hotel.id}-${hotel.hotelName}-${index}`} style={[styles.hotelCard, !isOnline && styles.bookBtnDisabled]} activeOpacity={0.93} onPress={() => void openHotelsLink()}>
            <Image source={{ uri: hotel.photoUrl || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400' }}
              style={styles.hotelImage}
              defaultSource={{ uri: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400' }} />
            <View style={styles.hotelInfo}>
              <Text style={styles.hotelName} numberOfLines={2}>{hotel.hotelName}</Text>
              <View style={styles.hotelStars}>
                {Array.from({ length: Math.min(5, hotel.stars) }).map((_, i) => (
                  <Ionicons key={i} name="star" size={12} color={Colors.warning} />
                ))}
              </View>
              <View style={styles.hotelRating}>
                <View style={styles.hotelRatingBadge}>
                  <Text style={styles.hotelRatingBadgeText}>{hotel.rating.toFixed(1)}</Text>
                </View>
                <Text style={styles.hotelRatingLabel}>B2B.Ostrovok</Text>
              </View>
              <View style={styles.hotelFooter}>
                <View>
                  <Text style={styles.hotelPrice}>{hotel.pricePerNight.toLocaleString('ru-RU')} ₽</Text>
                  <Text style={styles.hotelPriceLabel}>/ночь · {hotel.totalPrice.toLocaleString('ru-RU')} ₽</Text>
                </View>
                <View style={styles.bookBtnGradient}><Text style={styles.bookBtnText}>Забронировать →</Text></View>
              </View>
            </View>
          </TouchableOpacity>
        );
      })}

      {!hotelsLoading && liveHotels.length === 0 && (
        <>
          <View style={styles.flightsError}>
            <Text style={styles.flightsErrorText}>Live временно недоступен: показаны локальные варианты отелей и ссылки на партнёров</Text>
            <View style={styles.fallbackActionsRow}>
              <TouchableOpacity style={styles.fallbackActionBtn} onPress={() => void openHotelsLink()} activeOpacity={0.85}>
                <Text style={styles.fallbackActionBtnText}>Открыть отели в Островке</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.fallbackActionBtn, styles.fallbackActionBtnAlt]} onPress={showHotelsApiSetup} activeOpacity={0.85}>
                <Text style={[styles.fallbackActionBtnText, styles.fallbackActionBtnTextAlt]}>Как включить live API</Text>
              </TouchableOpacity>
            </View>
          </View>
          {trip.hotels.map((hotel, index) => (
            <TouchableOpacity key={`${hotel.id}-${hotel.name}-${index}`} style={[styles.hotelCard, !isOnline && styles.bookBtnDisabled]} activeOpacity={0.93} onPress={() => void openHotelsLink()}>
              <Image source={{ uri: hotel.image }} style={styles.hotelImage} />
              <View style={styles.hotelInfo}>
                <Text style={styles.hotelName}>{hotel.name}</Text>
                <View style={styles.hotelStars}>
                  {Array.from({ length: hotel.stars }).map((_, i) => (
                    <Ionicons key={i} name="star" size={12} color={Colors.warning} />
                  ))}
                </View>
                <View style={styles.hotelFooter}>
                  <View>
                    <Text style={styles.hotelPrice}>{hotel.pricePerNight.toLocaleString('ru-RU')} ₽</Text>
                    <Text style={styles.hotelPriceLabel}>/ночь</Text>
                  </View>
                  <View style={styles.bookBtnGradient}><Text style={styles.bookBtnText}>Найти →</Text></View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </>
      )}

      <TouchableOpacity style={[styles.hotellookBtn, !isOnline && styles.bookBtnDisabled]} onPress={() => void openHotelsLink()} activeOpacity={0.85}>
        <Text style={styles.hotellookBtnText}>🔍 Все отели в Островке →</Text>
      </TouchableOpacity>

      <View style={[styles.partnerCard, styles.yandexCard]}>
        <View style={styles.partnerCardHeader}>
          <Text style={styles.partnerCardTitle}>🟡 Яндекс Путешествия</Text>
          <View style={[styles.partnerBadge, { backgroundColor: '#FFFDE7' }]}>
            <Text style={[styles.partnerBadgeText, { color: '#F57F17' }]}>Отели</Text>
          </View>
        </View>
        <Text style={styles.partnerCardSubtitle}>Сравните тысячи вариантов жилья</Text>
        <TouchableOpacity
          style={[styles.partnerBtnFull, !isOnline && styles.bookBtnDisabled]}
          onPress={() => {
            if (!isOnline) {
              Alert.alert('Нет интернета', 'Подключитесь к сети для поиска отелей.');
              return;
            }
            void Linking.openURL(buildYandexHotelsLink(trip.to, trip.startDate, trip.endDate, trip.travelers));
          }}
          activeOpacity={0.85}
        >
          <Text style={styles.partnerBtnText}>🏨 Найти отели на Яндексе →</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function BudgetBlock({ trip }: { trip: Trip }) {
  const setTripExpense = useStore((s) => s.setTripExpense);
  const [inputValues, setInputValues] = useState<Record<string, string>>({
    transport: String(trip.expenses?.transport ?? ''),
    hotel: String(trip.expenses?.hotel ?? ''),
    activities: String(trip.expenses?.activities ?? ''),
    food: String(trip.expenses?.food ?? ''),
  });

  const planned = useMemo(
    () => trip.totalTransport + trip.totalHotel + trip.totalActivities + trip.totalFood,
    [trip.totalTransport, trip.totalHotel, trip.totalActivities, trip.totalFood]
  );
  const expTransport = trip.expenses?.transport ?? 0;
  const expHotel = trip.expenses?.hotel ?? 0;
  const expActivities = trip.expenses?.activities ?? 0;
  const expFood = trip.expenses?.food ?? 0;
  const actualTotal = expTransport + expHotel + expActivities + expFood;
  const hasAny = actualTotal > 0;

  const categories = [
    { key: 'transport' as const, label: 'Транспорт', plan: trip.totalTransport, fact: expTransport, emoji: '✈️', color: '#6366F1' },
    { key: 'hotel' as const, label: 'Отели', plan: trip.totalHotel, fact: expHotel, emoji: '🏨', color: '#EC4899' },
    { key: 'activities' as const, label: 'Активности', plan: trip.totalActivities, fact: expActivities, emoji: '🎟️', color: '#10B981' },
    { key: 'food' as const, label: 'Питание', plan: trip.totalFood, fact: expFood, emoji: '🍽️', color: '#F59E0B' },
  ];

  const handleExpenseChange = (key: keyof NonNullable<Trip['expenses']>, value: string) => {
    setInputValues((prev) => ({ ...prev, [key]: value }));
    const num = parseInt(value.replace(/\D/g, ''), 10);
    setTripExpense(trip.id, key, isNaN(num) ? 0 : num);
  };

  return (
    <View>
      <Text style={styles.tabSectionTitle}>Бюджет поездки</Text>
      <View style={styles.budgetSummary}>
        <View style={styles.budgetSummaryRow}>
          <Text style={styles.budgetSummaryLabel}>Запланированный бюджет</Text>
          <Text style={styles.budgetSummaryValue}>{trip.budget.toLocaleString('ru-RU')} ₽</Text>
        </View>
        <View style={styles.budgetSummaryRow}>
          <Text style={styles.budgetSummaryLabel}>Смета (план)</Text>
          <Text style={[styles.budgetSummaryValue, { color: Colors.text }]}>{planned.toLocaleString('ru-RU')} ₽</Text>
        </View>
        {hasAny && (
          <View style={styles.budgetSummaryRow}>
            <Text style={styles.budgetSummaryLabel}>Фактические расходы</Text>
            <Text style={[styles.budgetSummaryValue, { color: actualTotal <= trip.budget ? Colors.success : Colors.error }]}>
              {actualTotal.toLocaleString('ru-RU')} ₽
            </Text>
          </View>
        )}
        <View style={styles.budgetSummaryDivider} />
        <View style={styles.budgetSummaryRow}>
          <Text style={[styles.budgetSummaryLabel, { fontWeight: '700' }]}>
            {hasAny ? 'Остаток (факт)' : 'Остаток (план)'}
          </Text>
          <Text style={[styles.budgetSummaryValue, {
            color: (trip.budget - (hasAny ? actualTotal : planned)) >= 0 ? Colors.success : Colors.error,
            fontWeight: '700'
          }]}>
            {(() => { const r = trip.budget - (hasAny ? actualTotal : planned); return `${r >= 0 ? '+' : ''}${r.toLocaleString('ru-RU')} ₽`; })()}
          </Text>
        </View>
      </View>

      <View style={styles.budgetHint}>
        <Ionicons name="pencil-outline" size={14} color={Colors.primary} />
        <Text style={styles.budgetHintText}>Вводите фактические расходы — увидите план vs факт</Text>
      </View>

      {categories.map((cat) => {
        const planPct = planned > 0 ? Math.round((cat.plan / planned) * 100) : 0;
        const isOver = cat.fact > cat.plan && cat.fact > 0;
        return (
          <View key={cat.key} style={styles.budgetCategoryCard}>
            <View style={styles.budgetCategoryHeader}>
              <View style={styles.budgetCategoryLeft}>
                <Text style={styles.budgetCategoryEmoji}>{cat.emoji}</Text>
                <Text style={styles.budgetCategoryLabel}>{cat.label}</Text>
              </View>
              <View style={styles.budgetCategoryRight}>
                <Text style={styles.budgetPlanAmount}>{cat.plan.toLocaleString('ru-RU')} ₽</Text>
                <Text style={styles.budgetPlanLabel}>план</Text>
              </View>
            </View>
            <View style={styles.budgetBarBg}>
              <View style={[styles.budgetBarFill, { width: `${planPct}%`, backgroundColor: cat.color + '60' }]} />
            </View>
            <View style={styles.budgetFactRow}>
              <Text style={styles.budgetFactLabel}>Факт:</Text>
              <View style={[styles.budgetFactInput, isOver && { borderColor: Colors.error }]}>
                <TextInput
                  style={styles.budgetFactInputText}
                  value={inputValues[cat.key]}
                  onChangeText={(v) => handleExpenseChange(cat.key, v)}
                  keyboardType="numeric"
                  placeholder="0"
                  placeholderTextColor={Colors.textSecondary}
                />
                <Text style={styles.budgetFactCurrency}>₽</Text>
              </View>
              {cat.fact > 0 && (
                <Text style={[styles.budgetFactDiff, { color: isOver ? Colors.error : Colors.success }]}>
                  {isOver ? '+' : '-'}{Math.abs(cat.fact - cat.plan).toLocaleString('ru-RU')} ₽
                </Text>
              )}
            </View>
            {cat.fact > 0 && (
              <View style={styles.budgetBarBg}>
                <View style={[styles.budgetBarFill, {
                  width: `${Math.min(100, cat.plan > 0 ? Math.round((cat.fact / cat.plan) * 100) : 0)}%`,
                  backgroundColor: isOver ? Colors.error : cat.color,
                }]} />
              </View>
            )}
            <Text style={styles.budgetPct}>{planPct}% от сметы</Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  centered: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xl,
  },
  notFoundEmoji: {
    fontSize: 48,
  },
  notFoundTitle: {
    fontSize: Typography.sizes.lg,
    color: Colors.text,
    marginTop: 16,
    textAlign: 'center',
  },
  notFoundBackBtn: {
    marginTop: 14,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  notFoundBackText: {
    color: Colors.primary,
    fontWeight: Typography.weights.semibold,
  },
  heroContainer: {
    height: 280,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  heroTopBar: {
    position: 'absolute',
    top: 56,
    left: Spacing.base,
    right: Spacing.base,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  heroTopRight: {
    flexDirection: 'row',
    gap: 8,
  },
  heroBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroInfo: {
    position: 'absolute',
    bottom: Spacing.base,
    left: Spacing.base,
    right: Spacing.base,
    gap: 4,
  },
  heroCity: {
    fontSize: Typography.sizes['3xl'],
    fontWeight: Typography.weights.bold,
    color: '#fff',
  },
  heroCountry: {
    fontSize: Typography.sizes.base,
    color: 'rgba(255,255,255,0.8)',
  },
  heroMeta: {
    flexDirection: 'row',
    gap: Spacing.md,
    flexWrap: 'wrap',
  },
  heroMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  heroMetaText: {
    fontSize: Typography.sizes.sm,
    color: 'rgba(255,255,255,0.85)',
  },
  travelModeBtn: {
    marginTop: 8,
    alignSelf: 'flex-start',
    height: 34,
    borderRadius: 999,
    backgroundColor: 'rgba(15,37,72,0.85)',
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.28)',
  },
  travelModeBtnText: {
    color: '#fff',
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.semibold,
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    gap: 2,
    position: 'relative',
  },
  tabActive: {},
  tabIcon: {
    fontSize: 16,
  },
  tabLabel: {
    fontSize: Typography.sizes.xs,
    color: Colors.textSecondary,
    fontWeight: Typography.weights.medium,
  },
  tabLabelActive: {
    color: Colors.primary,
  },
  tabIndicator: {
    position: 'absolute',
    bottom: 0,
    left: '10%',
    right: '10%',
    height: 2,
    backgroundColor: Colors.primary,
    borderRadius: 1,
  },
  contentInner: {
    padding: Spacing.xl,
  },
  tabSectionTitle: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.bold,
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  daySection: {
    marginBottom: Spacing.xl,
  },
  dayHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: Spacing.md,
  },
  dayBadge: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: Colors.primary,
  },
  dayBadgeText: {
    color: '#fff',
    fontWeight: Typography.weights.bold,
    fontSize: Typography.sizes.sm,
  },
  dayDate: {
    fontSize: Typography.sizes.base,
    color: Colors.textSecondary,
    fontWeight: Typography.weights.medium,
  },
  placeCard: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: Spacing.md,
  },
  placeTimeline: {
    width: 48,
    alignItems: 'center',
  },
  placeTime: {
    fontSize: Typography.sizes.xs,
    color: Colors.textSecondary,
    fontWeight: Typography.weights.semibold,
    marginBottom: 4,
  },
  timelineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.primary,
    marginBottom: 4,
  },
  timelineLine: {
    flex: 1,
    width: 2,
    backgroundColor: Colors.border,
    marginBottom: -16,
  },
  placeContent: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    padding: Spacing.md,
    ...Shadows.card,
    marginBottom: 4,
  },
  placeHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginBottom: 6,
  },
  placeEmoji: {
    fontSize: 24,
  },
  placeTitleRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  placeHeaderActions: {
    alignItems: 'flex-end',
    gap: 6,
  },
  accessibleBadge: {
    minWidth: 24,
    height: 24,
    borderRadius: BorderRadius.full,
    paddingHorizontal: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary + '18',
    borderWidth: 1,
    borderColor: Colors.primary + '40',
  },
  accessibleBadgeText: {
    fontSize: 12,
    color: Colors.primary,
    fontWeight: Typography.weights.bold,
  },
  placeName: {
    flex: 1,
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.bold,
    color: Colors.text,
    marginRight: 8,
  },
  placeRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  placeRatingText: {
    fontSize: Typography.sizes.xs,
    color: Colors.warning,
    fontWeight: Typography.weights.semibold,
  },
  moveControls: {
    flexDirection: 'row',
    gap: 6,
  },
  moveBtn: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1,
    borderColor: Colors.primary + '40',
    backgroundColor: Colors.primary + '12',
    alignItems: 'center',
    justifyContent: 'center',
  },
  moveBtnDisabled: {
    borderColor: Colors.border,
    backgroundColor: Colors.surfaceAlt,
  },
  placeDescription: {
    fontSize: Typography.sizes.sm,
    color: Colors.textSecondary,
    lineHeight: 20,
    marginBottom: 8,
  },
  placeTransitBox: {
    backgroundColor: Colors.surfaceAlt,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  placeTransitTitle: {
    fontSize: Typography.sizes.xs,
    color: Colors.text,
    fontWeight: Typography.weights.semibold,
    marginBottom: 2,
  },
  placeTransitLegs: {
    fontSize: Typography.sizes.xs,
    color: Colors.textSecondary,
  },
  placeTransitMeta: {
    fontSize: Typography.sizes.xs,
    color: Colors.primary,
    marginTop: 2,
    fontWeight: Typography.weights.medium,
  },
  placeMeta: {
    flexDirection: 'row',
    gap: 12,
  },
  placeMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  placeMetaText: {
    fontSize: Typography.sizes.xs,
    color: Colors.textSecondary,
  },
  reviewBtn: {
    marginTop: 8,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.primary + '33',
    backgroundColor: Colors.primary + '10',
  },
  reviewBtnText: {
    color: Colors.primary,
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.semibold,
  },
  emptyDayCard: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  emptyDayTitle: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.semibold,
    color: Colors.text,
    marginBottom: 4,
  },
  emptyDayText: {
    fontSize: Typography.sizes.sm,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  addPlaceBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: Colors.primary + '10',
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.primary + '30',
    paddingVertical: 10,
    marginBottom: Spacing.sm,
  },
  addPlaceBtnText: {
    color: Colors.primary,
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.semibold,
  },
  deleteAction: {
    width: 104,
    borderRadius: BorderRadius.lg,
    marginRight: 8,
    marginBottom: Spacing.md,
    backgroundColor: Colors.error,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  deleteActionText: {
    color: Colors.textInverse,
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.semibold,
  },
  transportCard: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    padding: Spacing.base,
    marginBottom: Spacing.md,
    ...Shadows.card,
  },
  transportHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  transportTypeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  transportTypeEmoji: {
    fontSize: 14,
  },
  transportTypeLabel: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.semibold,
  },
  transportCarrier: {
    fontSize: Typography.sizes.sm,
    color: Colors.textSecondary,
    fontWeight: Typography.weights.medium,
  },
  transportRoute: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  transportCity: {
    width: 80,
  },
  transportCityRight: {
    alignItems: 'flex-end',
  },
  transportTime: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.bold,
    color: Colors.text,
  },
  transportCityName: {
    fontSize: Typography.sizes.xs,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  transportMiddle: {
    flex: 1,
    alignItems: 'center',
    gap: 2,
  },
  transportDuration: {
    fontSize: Typography.sizes.xs,
    color: Colors.textSecondary,
  },
  transportLine: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  transportDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.border,
  },
  transportDash: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.border,
  },
  transportPlane: {
    fontSize: 16,
    marginHorizontal: 4,
  },
  transportClass: {
    fontSize: Typography.sizes.xs,
    color: Colors.textTertiary,
  },
  transportFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  transportPrice: {
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.bold,
    color: Colors.primary,
  },
  multimodalCard: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    padding: Spacing.base,
    marginBottom: Spacing.lg,
    ...Shadows.card,
  },
  multimodalSummary: {
    color: Colors.text,
    fontWeight: Typography.weights.semibold,
    marginBottom: 8,
  },
  multimodalStats: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 6,
  },
  multimodalStat: {
    fontSize: Typography.sizes.sm,
    color: Colors.textSecondary,
  },
  multimodalEco: {
    fontSize: Typography.sizes.xs,
    color: Colors.textTertiary,
    marginBottom: 10,
  },
  segmentRow: {
    flexDirection: 'row',
    gap: 10,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  segmentDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginTop: 6,
  },
  segmentMain: {
    flex: 1,
    gap: 2,
  },
  segmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  segmentMode: {
    color: Colors.text,
    fontWeight: Typography.weights.semibold,
    fontSize: Typography.sizes.sm,
  },
  segmentPrice: {
    color: Colors.primary,
    fontWeight: Typography.weights.bold,
    fontSize: Typography.sizes.sm,
  },
  segmentRoute: {
    color: Colors.textSecondary,
    fontSize: Typography.sizes.sm,
  },
  segmentMeta: {
    color: Colors.textTertiary,
    fontSize: Typography.sizes.xs,
  },
  bookBtn: {
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
  },
  bookBtnDisabled: {
    opacity: 0.5,
  },
  bookBtnGradient: {
    paddingHorizontal: Spacing.base,
    paddingVertical: 8,
    borderRadius: BorderRadius.lg,
    backgroundColor: Colors.primary,
  },
  bookBtnText: {
    color: '#fff',
    fontWeight: Typography.weights.semibold,
    fontSize: Typography.sizes.sm,
  },
  hotelCard: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    marginBottom: Spacing.md,
    ...Shadows.card,
  },
  hotelImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  hotelInfo: {
    padding: Spacing.md,
  },
  hotelName: {
    fontSize: Typography.sizes.md,
    fontWeight: Typography.weights.bold,
    color: Colors.text,
    marginBottom: 4,
  },
  hotelStars: {
    flexDirection: 'row',
    gap: 2,
    marginBottom: 4,
  },
  hotelRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  hotelRatingValue: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.bold,
    color: Colors.warning,
  },
  hotelReviews: {
    fontSize: Typography.sizes.sm,
    color: Colors.textSecondary,
  },
  hotelMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: Spacing.sm,
  },
  hotelDistance: {
    fontSize: Typography.sizes.sm,
    color: Colors.textSecondary,
  },
  hotelAmenities: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
    marginBottom: Spacing.md,
  },
  amenityChip: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    backgroundColor: Colors.surfaceAlt,
    borderRadius: 999,
  },
  amenityText: {
    fontSize: Typography.sizes.xs,
    color: Colors.textSecondary,
  },
  hotelFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  hotelPrice: {
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.bold,
    color: Colors.primary,
  },
  hotelPriceLabel: {
    fontSize: Typography.sizes.xs,
    color: Colors.textSecondary,
  },
  // Partner cards (Yandex Travel)
  partnerCard: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    padding: Spacing.base,
    marginBottom: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadows.sm,
  },
  yandexCard: {
    borderColor: '#FFE082',
  },
  partnerCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  partnerCardTitle: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.bold,
    color: Colors.text,
  },
  partnerBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
  },
  partnerBadgeText: {
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.semibold,
  },
  partnerCardSubtitle: {
    fontSize: Typography.sizes.sm,
    color: Colors.textSecondary,
    marginBottom: Spacing.md,
    lineHeight: 18,
  },
  partnerBtns: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  partnerBtn: {
    flex: 1,
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.lg,
    paddingVertical: 10,
    alignItems: 'center',
  },
  partnerBtnFull: {
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.lg,
    paddingVertical: 12,
    alignItems: 'center',
  },
  partnerBtnText: {
    color: '#fff',
    fontWeight: Typography.weights.bold,
    fontSize: Typography.sizes.sm,
  },

  // Real transport offers (Yandex Rasp)
  realFlightsSection: {
    marginBottom: Spacing.xl,
  },
  realFlightsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 2,
  },
  aviasalesBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    backgroundColor: Colors.accent,
    borderRadius: 999,
  },
  aviasalesBadgeText: {
    color: '#fff',
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.bold,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  realFlightsSubtitle: {
    fontSize: Typography.sizes.sm,
    color: Colors.textSecondary,
    marginBottom: Spacing.md,
  },
  flightsLoader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: Spacing.lg,
    justifyContent: 'center',
  },
  flightsLoaderText: {
    fontSize: Typography.sizes.sm,
    color: Colors.textSecondary,
  },
  flightsError: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.base,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.md,
  },
  flightsErrorText: {
    fontSize: Typography.sizes.sm,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  fallbackActionsRow: {
    marginTop: Spacing.sm,
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  fallbackActionBtn: {
    backgroundColor: '#E8EEF9',
    borderColor: '#C8D6F1',
    borderWidth: 1,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  fallbackActionBtnAlt: {
    backgroundColor: Colors.surface,
    borderColor: Colors.border,
  },
  fallbackActionBtnText: {
    color: Colors.primary,
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.semibold,
  },
  fallbackActionBtnTextAlt: {
    color: Colors.text,
  },
  realFlightCard: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    padding: Spacing.base,
    marginBottom: Spacing.md,
    borderWidth: 1.5,
    borderColor: Colors.primary + '30',
    ...Shadows.card,
  },
  realFlightTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  realFlightAirline: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  realFlightAirlineText: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.semibold,
    color: Colors.text,
  },
  directBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    backgroundColor: '#D1FAE5',
    borderRadius: 999,
  },
  directBadgeText: {
    fontSize: Typography.sizes.xs,
    color: '#065F46',
    fontWeight: Typography.weights.semibold,
  },
  realFlightPrice: {
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.bold,
    color: Colors.primary,
  },
  realFlightRoute: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  realFlightCity: {
    width: 80,
  },
  realFlightTime: {
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.bold,
    color: Colors.text,
  },
  realFlightCityName: {
    fontSize: Typography.sizes.xs,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  realFlightDate: {
    fontSize: Typography.sizes.xs,
    color: Colors.textTertiary,
    marginTop: 1,
  },
  realFlightMiddle: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  realFlightDuration: {
    fontSize: Typography.sizes.xs,
    color: Colors.textSecondary,
  },
  realFlightLine: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  buyBtn: {
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.lg,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buyBtnText: {
    color: '#fff',
    fontWeight: Typography.weights.bold,
    fontSize: Typography.sizes.base,
  },

  budgetSummary: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    padding: Spacing.base,
    marginBottom: Spacing.xl,
    ...Shadows.card,
  },
  budgetSummaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  budgetSummaryLabel: {
    fontSize: Typography.sizes.base,
    color: Colors.textSecondary,
  },
  budgetSummaryValue: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.semibold,
    color: Colors.primary,
  },
  budgetSummaryDivider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: 4,
  },
  budgetCategory: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    padding: Spacing.base,
    marginBottom: Spacing.md,
    ...Shadows.sm,
  },
  budgetCategoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  budgetCategoryLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  budgetCategoryEmoji: {
    fontSize: 20,
  },
  budgetCategoryLabel: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.semibold,
    color: Colors.text,
  },
  budgetCategoryAmount: {
    fontSize: Typography.sizes.md,
    fontWeight: Typography.weights.bold,
    color: Colors.text,
  },
  budgetBarBg: {
    height: 8,
    backgroundColor: Colors.surfaceAlt,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 4,
  },
  budgetBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  budgetPct: {
    fontSize: Typography.sizes.xs,
    color: Colors.textTertiary,
    textAlign: 'right',
  },
  // New hotel styles
  hotelLiveHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  hotelLiveSubtitle: {
    fontSize: Typography.sizes.sm,
    color: Colors.textSecondary,
    marginBottom: Spacing.md,
  },
  hotelRatingBadge: {
    backgroundColor: Colors.success,
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  hotelRatingBadgeText: {
    color: '#fff',
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.bold,
  },
  hotelRatingLabel: {
    fontSize: Typography.sizes.xs,
    color: Colors.textSecondary,
  },
  hotellookBtn: {
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.xl,
    padding: Spacing.base,
    alignItems: 'center',
    marginBottom: Spacing.md,
    marginTop: 4,
  },
  hotellookBtnText: {
    color: '#fff',
    fontWeight: Typography.weights.bold,
    fontSize: Typography.sizes.base,
  },
  // New budget styles
  budgetHint: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.primary + '10',
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    borderLeftWidth: 3,
    borderLeftColor: Colors.primary,
  },
  budgetHintText: {
    fontSize: Typography.sizes.sm,
    color: Colors.text,
    flex: 1,
  },
  budgetCategoryCard: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    padding: Spacing.base,
    marginBottom: Spacing.md,
    ...Shadows.sm,
  },
  budgetCategoryRight: {
    alignItems: 'flex-end',
  },
  budgetPlanAmount: {
    fontSize: Typography.sizes.md,
    fontWeight: Typography.weights.bold,
    color: Colors.text,
  },
  budgetPlanLabel: {
    fontSize: Typography.sizes.xs,
    color: Colors.textSecondary,
  },
  budgetFactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: Spacing.sm,
    marginBottom: 6,
  },
  budgetFactLabel: {
    fontSize: Typography.sizes.sm,
    color: Colors.textSecondary,
    width: 40,
  },
  budgetFactInput: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: BorderRadius.md,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: Colors.surfaceAlt,
  },
  budgetFactInputText: {
    flex: 1,
    fontSize: Typography.sizes.base,
    color: Colors.text,
    fontWeight: Typography.weights.semibold,
  },
  budgetFactCurrency: {
    fontSize: Typography.sizes.sm,
    color: Colors.textSecondary,
  },
  budgetFactDiff: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.bold,
    minWidth: 70,
    textAlign: 'right',
  },

  // ── How to get there (multimodal) ──
  howToGetCard: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    padding: Spacing.base,
    marginBottom: Spacing.xl,
    ...Shadows.card,
    borderLeftWidth: 3,
    borderLeftColor: Colors.primary,
  },
  howToGetHeader: {
    marginBottom: 6,
  },
  howToGetTitle: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.bold,
    color: Colors.text,
    marginBottom: 6,
  },
  howToGetStats: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 4,
  },
  howToGetStat: {
    fontSize: Typography.sizes.sm,
    color: Colors.textSecondary,
  },
  howToGetSummary: {
    fontSize: Typography.sizes.sm,
    color: Colors.text,
    marginBottom: Spacing.md,
    lineHeight: 20,
  },
  howToGetSegments: {
    gap: 0,
    marginBottom: 4,
  },
  howToGetSegment: {
    flexDirection: 'row',
    gap: 10,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  howToGetSegDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginTop: 6,
    flexShrink: 0,
  },
  howToGetSegLine: {
    // decorative — handled by border
  },
  howToGetSegContent: {
    flex: 1,
    gap: 2,
  },
  howToGetSegHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 4,
  },
  howToGetSegMode: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.semibold,
    color: Colors.text,
  },
  howToGetSegCarrier: {
    fontSize: Typography.sizes.xs,
    color: Colors.textSecondary,
    flex: 1,
    textAlign: 'center',
  },
  howToGetSegPrice: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.bold,
    color: Colors.primary,
  },
  howToGetSegRoute: {
    fontSize: Typography.sizes.sm,
    color: Colors.textSecondary,
  },
  howToGetSegMeta: {
    fontSize: Typography.sizes.xs,
    color: Colors.textTertiary,
  },
  ecoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingTop: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    marginTop: 4,
  },
  ecoText: {
    fontSize: Typography.sizes.xs,
    color: Colors.success,
    flex: 1,
  },
});



