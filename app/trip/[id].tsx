import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Linking,
  ActivityIndicator,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/colors';
import { BorderRadius, Shadows, Spacing, Typography } from '@/constants/theme';
import { useStore } from '@/store/useStore';
import { Badge } from '@/components/ui/Badge';
import { Trip } from '@/constants/data';
import { getMultimodalRoute } from '@/store/multimodalRoute';
import {
  AviasalesFlight,
  searchFlights,
  buildBookingUrl,
  formatTime,
  formatDuration,
  formatDateShort,
} from '@/store/aviasalesApi';
import { getCityIata, getAirlineName } from '@/constants/iata';
import {
  buildTutuTrainLink,
  buildYandexFlightsLink,
  buildYandexTrainsLink,
  buildYandexHotelsLink,
} from '@/store/deepLinksService';

type TabId = 'plan' | 'transport' | 'hotels' | 'budget';

export default function TripDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<TabId>('plan');
  const trips = useStore((s) => s.trips);
  const trip = trips.find((t) => t.id === id);

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

  const tabs: { id: TabId; label: string; icon: string }[] = [
    { id: 'plan', label: 'Маршрут', icon: '🗓️' },
    { id: 'transport', label: 'Транспорт', icon: '✈️' },
    { id: 'hotels', label: 'Отели', icon: '🏨' },
    { id: 'budget', label: 'Бюджет', icon: '💸' },
  ];

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.heroContainer}>
        <Image source={{ uri: trip.coverImage }} style={styles.heroImage} />
        <View style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(0,0,0,0.35)' }]} />
        <View style={styles.heroTopBar}>
          <TouchableOpacity style={styles.heroBtn} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={22} color="#fff" />
          </TouchableOpacity>
          <View style={styles.heroTopRight}>
            <TouchableOpacity style={styles.heroBtn}>
              <Ionicons name="share-outline" size={22} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.heroBtn}>
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
        </View>
      </View>

      <View style={styles.tabs}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            onPress={() => setActiveTab(tab.id)}
            style={[styles.tab, activeTab === tab.id && styles.tabActive]}
          >
            <Text style={styles.tabIcon}>{tab.icon}</Text>
            <Text style={[styles.tabLabel, activeTab === tab.id && styles.tabLabelActive]}>{tab.label}</Text>
            {activeTab === tab.id && <View style={styles.tabIndicator} />}
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.contentInner} showsVerticalScrollIndicator={false}>
        {activeTab === 'plan' && <DayPlanBlock trip={trip} />}
        {activeTab === 'transport' && <TransportBlock trip={trip} />}
        {activeTab === 'hotels' && <HotelsBlock trip={trip} />}
        {activeTab === 'budget' && <BudgetBlock trip={trip} />}
        <View style={{ height: 24 }} />
      </ScrollView>
    </View>
  );
}

function DayPlanBlock({ trip }: { trip: Trip }) {
  return (
    <View>
      {trip.days.map((day) => (
        <View key={day.day} style={styles.daySection}>
          <View style={styles.dayHeader}>
            <View style={styles.dayBadge}>
              <Text style={styles.dayBadgeText}>День {day.day}</Text>
            </View>
            <Text style={styles.dayDate}>{day.date}</Text>
          </View>
          {day.places.map((place, index) => (
            <View key={place.id} style={styles.placeCard}>
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
                    <View style={styles.placeRating}>
                      <Ionicons name="star" size={12} color={Colors.warning} />
                      <Text style={styles.placeRatingText}>{place.rating}</Text>
                    </View>
                  </View>
                </View>
                <Badge label={place.category} variant="primary" size="sm" style={{ marginBottom: 6 }} />
                <Text style={styles.placeDescription}>{place.description}</Text>
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
              </View>
            </View>
          ))}
          {day.places.length === 0 && (
            <View style={styles.emptyDayCard}>
              <Text style={styles.emptyDayTitle}>Свободный блок</Text>
              <Text style={styles.emptyDayText}>В этот день нет фиксированных точек. Добавьте свои активности перед поездкой.</Text>
            </View>
          )}
        </View>
      ))}
    </View>
  );
}

function TransportBlock({ trip }: { trip: Trip }) {
  const multimodalRoute = getMultimodalRoute(trip);
  const [realFlights, setRealFlights] = useState<AviasalesFlight[]>([]);
  const [flightsLoading, setFlightsLoading] = useState(false);
  const [flightsError, setFlightsError] = useState<string | null>(null);

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
    const fromIata = getCityIata(trip.from);
    const toIata = getCityIata(trip.to);
    if (!fromIata || !toIata) return;

    setFlightsLoading(true);
    setFlightsError(null);

    searchFlights(fromIata, toIata, trip.startDate, 5)
      .then((flights) => setRealFlights(flights))
      .catch(() => setFlightsError('Не удалось загрузить билеты'))
      .finally(() => setFlightsLoading(false));
  }, [trip.from, trip.to, trip.startDate]);

  const hasIata = Boolean(getCityIata(trip.from) && getCityIata(trip.to));

  return (
    <View>
      {/* ── Реальные билеты Aviasales ── */}
      {hasIata && (
        <View style={styles.realFlightsSection}>
          <View style={styles.realFlightsHeader}>
            <Text style={styles.tabSectionTitle}>Билеты Aviasales</Text>
            <View style={styles.aviasalesBadge}>
              <Text style={styles.aviasalesBadgeText}>live</Text>
            </View>
          </View>
          <Text style={styles.realFlightsSubtitle}>
            Актуальные цены на {trip.from} → {trip.to}
          </Text>

          {flightsLoading && (
            <View style={styles.flightsLoader}>
              <ActivityIndicator color={Colors.primary} />
              <Text style={styles.flightsLoaderText}>Ищем билеты...</Text>
            </View>
          )}

          {flightsError && !flightsLoading && (
            <View style={styles.flightsError}>
              <Text style={styles.flightsErrorText}>⚠️ {flightsError}</Text>
            </View>
          )}

          {!flightsLoading && !flightsError && realFlights.length === 0 && (
            <View style={styles.flightsError}>
              <Text style={styles.flightsErrorText}>
                Рейсов на выбранную дату не найдено
              </Text>
            </View>
          )}

          {realFlights.map((flight, idx) => {
            const airlineName = getAirlineName(flight.airline);
            const depTime = formatTime(flight.departure_at);
            const arrMinutes = flight.duration_to ?? flight.duration;
            const arrDate = new Date(new Date(flight.departure_at).getTime() + arrMinutes * 60000);
            const arrTime = `${String(arrDate.getHours()).padStart(2, '0')}:${String(arrDate.getMinutes()).padStart(2, '0')}`;
            const dateLabel = formatDateShort(flight.departure_at);
            const bookingUrl = buildBookingUrl(flight.link);

            return (
              <View key={`${flight.airline}-${flight.flight_number}-${idx}`} style={styles.realFlightCard}>
                <View style={styles.realFlightTop}>
                  <View style={styles.realFlightAirline}>
                    <Text style={styles.realFlightAirlineText}>{airlineName}</Text>
                    {flight.transfers === 0 ? (
                      <View style={styles.directBadge}>
                        <Text style={styles.directBadgeText}>Прямой</Text>
                      </View>
                    ) : (
                      <View style={[styles.directBadge, { backgroundColor: '#FEF3C7' }]}>
                        <Text style={[styles.directBadgeText, { color: '#92400E' }]}>
                          {flight.transfers} {flight.transfers === 1 ? 'пересадка' : 'пересадки'}
                        </Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.realFlightPrice}>
                    {flight.price.toLocaleString('ru-RU')} ₽
                  </Text>
                </View>

                <View style={styles.realFlightRoute}>
                  <View style={styles.realFlightCity}>
                    <Text style={styles.realFlightTime}>{depTime}</Text>
                    <Text style={styles.realFlightCityName}>{trip.from}</Text>
                    <Text style={styles.realFlightDate}>{dateLabel}</Text>
                  </View>

                  <View style={styles.realFlightMiddle}>
                    <Text style={styles.realFlightDuration}>{formatDuration(flight.duration_to ?? flight.duration)}</Text>
                    <View style={styles.realFlightLine}>
                      <View style={styles.transportDot} />
                      <View style={styles.transportDash} />
                      <Text style={styles.transportPlane}>✈️</Text>
                      <View style={styles.transportDash} />
                      <View style={styles.transportDot} />
                    </View>
                  </View>

                  <View style={[styles.realFlightCity, { alignItems: 'flex-end' }]}>
                    <Text style={styles.realFlightTime}>{arrTime}</Text>
                    <Text style={styles.realFlightCityName}>{trip.to}</Text>
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.buyBtn}
                  onPress={() => Linking.openURL(bookingUrl)}
                  activeOpacity={0.85}
                >
                  <Text style={styles.buyBtnText}>Купить на Aviasales →</Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      )}

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

      {/* ── Tutu.ru: поезда и автобусы ── */}
      <View style={styles.partnerCard}>
        <View style={styles.partnerCardHeader}>
          <Text style={styles.partnerCardTitle}>🚆 Поезда и автобусы — Tutu.ru</Text>
          <View style={[styles.partnerBadge, { backgroundColor: '#E8F5E9' }]}>
            <Text style={[styles.partnerBadgeText, { color: '#2E7D32' }]}>РЖД</Text>
          </View>
        </View>
        <Text style={styles.partnerCardSubtitle}>
          Расписание, наличие мест и цены на поезда по всей России
        </Text>
        <View style={styles.partnerBtns}>
          <TouchableOpacity
            style={styles.partnerBtn}
            onPress={() => Linking.openURL(buildTutuTrainLink(trip.from, trip.to, trip.startDate))}
            activeOpacity={0.85}
          >
            <Text style={styles.partnerBtnText}>🚆 Поезда →</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.partnerBtn, { backgroundColor: Colors.surface, borderWidth: 1, borderColor: Colors.border }]}
            onPress={() => Linking.openURL(`https://www.tutu.ru/avtobusy/wizard/search/?from=${encodeURIComponent(trip.from)}&to=${encodeURIComponent(trip.to)}&date=${trip.startDate.split('-').reverse().join('.')}`)}
            activeOpacity={0.85}
          >
            <Text style={[styles.partnerBtnText, { color: Colors.text }]}>🚌 Автобусы →</Text>
          </TouchableOpacity>
        </View>
      </View>

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
            style={styles.partnerBtn}
            onPress={() => Linking.openURL(buildYandexFlightsLink(trip.from, trip.to, trip.startDate, trip.travelers))}
            activeOpacity={0.85}
          >
            <Text style={styles.partnerBtnText}>✈️ Авиа →</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.partnerBtn, { backgroundColor: Colors.surface, borderWidth: 1, borderColor: Colors.border }]}
            onPress={() => Linking.openURL(buildYandexTrainsLink(trip.from, trip.to, trip.startDate))}
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

function HotelsBlock({ trip }: { trip: Trip }) {
  return (
    <View>
      <Text style={styles.tabSectionTitle}>Рекомендуемые отели</Text>
      {trip.hotels.map((hotel) => (
        <View key={hotel.id} style={styles.hotelCard}>
          <Image source={{ uri: hotel.image }} style={styles.hotelImage} />
          <View style={styles.hotelInfo}>
            <Text style={styles.hotelName}>{hotel.name}</Text>
            <View style={styles.hotelStars}>
              {Array.from({ length: hotel.stars }).map((_, i) => (
                <Ionicons key={i} name="star" size={13} color={Colors.warning} />
              ))}
            </View>
            <View style={styles.hotelRating}>
              <Text style={styles.hotelRatingValue}>{hotel.rating}</Text>
              <Text style={styles.hotelReviews}>({hotel.reviews} отзывов)</Text>
            </View>
            <View style={styles.hotelMeta}>
              <Ionicons name="location-outline" size={13} color={Colors.textSecondary} />
              <Text style={styles.hotelDistance}>{hotel.distanceFromCenter} от центра</Text>
            </View>
            <View style={styles.hotelAmenities}>
              {hotel.amenities.slice(0, 3).map((a) => (
                <View key={a} style={styles.amenityChip}>
                  <Text style={styles.amenityText}>{a}</Text>
                </View>
              ))}
            </View>
            <View style={styles.hotelFooter}>
              <View>
                <Text style={styles.hotelPrice}>{hotel.pricePerNight.toLocaleString('ru-RU')} ₽</Text>
                <Text style={styles.hotelPriceLabel}>/ночь</Text>
              </View>
              <TouchableOpacity style={styles.bookBtn}>
                <View style={styles.bookBtnGradient}>
                  <Text style={styles.bookBtnText}>Booking →</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ))}

      {/* ── Яндекс Путешествия: отели ── */}
      <View style={[styles.partnerCard, styles.yandexCard]}>
        <View style={styles.partnerCardHeader}>
          <Text style={styles.partnerCardTitle}>🟡 Яндекс Путешествия</Text>
          <View style={[styles.partnerBadge, { backgroundColor: '#FFFDE7' }]}>
            <Text style={[styles.partnerBadgeText, { color: '#F57F17' }]}>Отели</Text>
          </View>
        </View>
        <Text style={styles.partnerCardSubtitle}>
          Сравните тысячи вариантов жилья — отели, апартаменты, хостелы
        </Text>
        <TouchableOpacity
          style={styles.partnerBtnFull}
          onPress={() =>
            Linking.openURL(
              buildYandexHotelsLink(trip.to, trip.startDate, trip.endDate, trip.travelers),
            )
          }
          activeOpacity={0.85}
        >
          <Text style={styles.partnerBtnText}>🏨 Найти отели на Яндексе →</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function BudgetBlock({ trip }: { trip: Trip }) {
  const total = trip.totalTransport + trip.totalHotel + trip.totalActivities + trip.totalFood;
  const remaining = trip.budget - total;
  const categories = [
    { label: 'Транспорт', amount: trip.totalTransport, emoji: '✈️', color: '#6366F1' },
    { label: 'Отели', amount: trip.totalHotel, emoji: '🏨', color: '#EC4899' },
    { label: 'Активности', amount: trip.totalActivities, emoji: '🎟️', color: '#10B981' },
    { label: 'Питание', amount: trip.totalFood, emoji: '🍽️', color: '#F59E0B' },
  ];

  return (
    <View>
      <Text style={styles.tabSectionTitle}>Бюджет поездки</Text>

      <View style={styles.budgetSummary}>
        <View style={styles.budgetSummaryRow}>
          <Text style={styles.budgetSummaryLabel}>Запланированный бюджет</Text>
          <Text style={styles.budgetSummaryValue}>{trip.budget.toLocaleString('ru-RU')} ₽</Text>
        </View>
        <View style={styles.budgetSummaryRow}>
          <Text style={styles.budgetSummaryLabel}>Ожидаемые расходы</Text>
          <Text style={[styles.budgetSummaryValue, { color: Colors.text }]}> {total.toLocaleString('ru-RU')} ₽</Text>
        </View>
        <View style={[styles.budgetSummaryDivider]} />
        <View style={styles.budgetSummaryRow}>
          <Text style={[styles.budgetSummaryLabel, { fontWeight: '700' }]}>Остаток</Text>
          <Text
            style={[
              styles.budgetSummaryValue,
              { color: remaining >= 0 ? Colors.success : Colors.error, fontWeight: '700' },
            ]}
          >
            {remaining >= 0 ? '+' : ''}
            {remaining.toLocaleString('ru-RU')} ₽
          </Text>
        </View>
      </View>

      {categories.map((cat) => {
        const pct = total > 0 ? Math.round((cat.amount / total) * 100) : 0;
        return (
          <View key={cat.label} style={styles.budgetCategory}>
            <View style={styles.budgetCategoryHeader}>
              <View style={styles.budgetCategoryLeft}>
                <Text style={styles.budgetCategoryEmoji}>{cat.emoji}</Text>
                <Text style={styles.budgetCategoryLabel}>{cat.label}</Text>
              </View>
              <Text style={styles.budgetCategoryAmount}>{cat.amount.toLocaleString('ru-RU')} ₽</Text>
            </View>
            <View style={styles.budgetBarBg}>
              <View
                style={[
                  styles.budgetBarFill,
                  { width: `${pct}%`, backgroundColor: cat.color },
                ]}
              />
            </View>
            <Text style={styles.budgetPct}>{pct}%</Text>
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
    width: 40,
    height: 40,
    borderRadius: 20,
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
  placeDescription: {
    fontSize: Typography.sizes.sm,
    color: Colors.textSecondary,
    lineHeight: 20,
    marginBottom: 8,
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
  // Partner cards (Tutu, Yandex)
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

  // Real flights (Aviasales)
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
});
