import React, { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/colors';
import { BorderRadius, Spacing, Typography } from '@/constants/theme';
import { Place, Trip, TripDocument } from '@/constants/data';
import { useStore } from '@/store/useStore';
import { getCachedTrip } from '@/store/offlineService';
import { getEmergencyContacts } from '@/constants/emergency';
import { openTripDocument } from '@/store/walletViewer';
import { track } from '@/store/analyticsService';

function getCurrentDayIndex(trip: Trip): number {
  const today = new Date().toISOString().slice(0, 10);
  const startDate = new Date(trip.startDate);
  const todayDate = new Date(today);
  const diffDays = Math.floor((todayDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  return Math.max(0, Math.min(diffDays, trip.days.length - 1));
}

function formatDayHeader(dateIsoOrLabel: string): string {
  const d = new Date(dateIsoOrLabel);
  if (Number.isNaN(d.getTime())) return dateIsoOrLabel;
  return d.toLocaleDateString('ru-RU', { weekday: 'long', day: 'numeric', month: 'long' });
}

export default function TravelModeScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const trips = useStore((s) => s.trips);
  const getDocumentsForTrip = useStore((s) => s.getDocumentsForTrip);
  const [cachedTrip, setCachedTrip] = useState<Trip | null>(null);
  const [dayIndex, setDayIndex] = useState(0);
  const [tripDocs, setTripDocs] = useState<TripDocument[]>([]);

  const liveTrip = trips.find((t) => t.id === id);
  const trip = liveTrip ?? cachedTrip;

  useEffect(() => {
    if (!id) return;
    getCachedTrip(id).then(setCachedTrip).catch(() => setCachedTrip(null));
  }, [id, trips.length]);

  useEffect(() => {
    if (!trip) return;
    setDayIndex(getCurrentDayIndex(trip));
  }, [trip?.id, trip?.startDate, trip?.days.length]);

  useEffect(() => {
    if (!trip?.id) return;
    void track('travel_mode_entered', { tripId: trip.id, to: trip.to });
  }, [trip?.id, trip?.to]);

  useEffect(() => {
    if (!id) return;
    getDocumentsForTrip(id).then(setTripDocs).catch(() => setTripDocs([]));
  }, [id, getDocumentsForTrip]);

  const ticketDoc = useMemo(
    () => tripDocs.find((doc) => doc.type === 'flight_ticket' || doc.type === 'train_ticket'),
    [tripDocs]
  );
  const hotelDoc = useMemo(() => tripDocs.find((doc) => doc.type === 'hotel_booking'), [tripDocs]);

  if (!trip) {
    return (
      <View style={[styles.container, styles.center]}>
        <Text style={styles.emptyTitle}>Поездка не найдена</Text>
        <TouchableOpacity style={styles.exitBtn} onPress={() => router.back()}>
          <Text style={styles.exitBtnText}>Назад</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const currentDay = trip.days[dayIndex];
  const contacts = getEmergencyContacts(trip.toCountry);

  const openPlaceRoute = async (place: Place) => {
    void track('yandex_navi_click', { tripId: trip.id, placeId: place.id, placeName: place.name });
    const query = `${place.name}, ${trip.to}`;
    const encoded = encodeURIComponent(query);
    const yandexNaviUrl =
      typeof place.lat === 'number' && typeof place.lng === 'number'
        ? `yandexnavi://build_route_on_map?lat_to=${place.lat}&lon_to=${place.lng}`
        : `yandexnavi://search?text=${encoded}`;
    const yandexWebUrl = `https://yandex.ru/maps/?text=${encoded}&rtext=~${encoded}&rtt=auto`;
    const googleMapsUrl =
      typeof place.lat === 'number' && typeof place.lng === 'number'
        ? `https://maps.google.com/maps?daddr=${place.lat},${place.lng}`
        : `https://maps.google.com/maps?daddr=${encoded}`;

    try {
      if (Platform.OS !== 'web') {
        const canOpenNative = await Linking.canOpenURL(yandexNaviUrl);
        if (canOpenNative) {
          await Linking.openURL(yandexNaviUrl);
          return;
        }
      }
      await Linking.openURL(yandexWebUrl);
    } catch {
      await Linking.openURL(googleMapsUrl);
    }
  };

  const openEmergency = async (phone: string) => {
    const telUrl = `tel:${phone}`;
    try {
      await Linking.openURL(telUrl);
    } catch {
      Alert.alert('Номер', phone);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconBtn} onPress={() => router.back()} accessibilityRole="button" accessibilityLabel="Выйти из Travel Mode">
          <Ionicons name="arrow-back" size={20} color="#fff" />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.cityText}>{trip.to}</Text>
          <Text style={styles.subText}>Travel Mode · {trip.toCountry}</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.dayCard}>
          <Text style={styles.dayLabel}>ДЕНЬ {dayIndex + 1} из {trip.days.length}</Text>
          <Text style={styles.dayDate}>{formatDayHeader(currentDay?.date ?? '')}</Text>
        </View>

        {currentDay?.places.map((place) => (
          <View key={place.id} style={styles.placeCard}>
            <View style={styles.placeTop}>
              <Text style={styles.placeTitle}>{place.emoji} {place.time} · {place.name}</Text>
              <Text style={styles.placeRating}>★ {place.rating.toFixed(1)}</Text>
            </View>
            <Text style={styles.placeMeta}>{place.duration}{place.price ? ` · ${place.price}` : ''}</Text>
            <TouchableOpacity
              style={styles.routeBtn}
              onPress={() => void openPlaceRoute(place)}
              accessibilityRole="button"
              accessibilityLabel={`Маршрут до ${place.name}`}
            >
              <Text style={styles.routeBtnText}>Маршрут →</Text>
            </TouchableOpacity>
          </View>
        ))}

        <View style={styles.dayNavRow}>
          <TouchableOpacity
            style={[styles.dayNavBtn, dayIndex === 0 && styles.disabledBtn]}
            onPress={() => setDayIndex((v) => Math.max(0, v - 1))}
            disabled={dayIndex === 0}
          >
            <Text style={styles.dayNavText}>← Пред. день</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.dayNavBtn, dayIndex === trip.days.length - 1 && styles.disabledBtn]}
            onPress={() => setDayIndex((v) => Math.min(trip.days.length - 1, v + 1))}
            disabled={dayIndex === trip.days.length - 1}
          >
            <Text style={styles.dayNavText}>След. день →</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.emergencyBox}>
          <Text style={styles.emergencyTitle}>🚨 Экстренные контакты</Text>
          <View style={styles.emergencyRow}>
            {contacts.map((contact) => (
              <TouchableOpacity
                key={`${contact.label}-${contact.number}`}
                style={styles.emergencyChip}
                onPress={() => void openEmergency(contact.number)}
              >
                <Text style={styles.emergencyChipText}>{contact.label}: {contact.number}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.docsRow}>
          <TouchableOpacity
            style={styles.docBtn}
            onPress={() => {
              if (!ticketDoc) {
                Alert.alert('Нет билета', 'Добавьте билет в Travel Wallet для этой поездки.');
                return;
              }
              void openTripDocument(ticketDoc);
            }}
          >
            <Text style={styles.docBtnText}>🎫 Мой билет</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.docBtn}
            onPress={() => {
              if (!hotelDoc) {
                Alert.alert('Нет брони', 'Добавьте бронь отеля в Travel Wallet для этой поездки.');
                return;
              }
              void openTripDocument(hotelDoc);
            }}
          >
            <Text style={styles.docBtnText}>🏨 Мой отель</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xl,
  },
  emptyTitle: {
    fontSize: Typography.sizes.lg,
    color: Colors.text,
    fontWeight: Typography.weights.bold,
  },
  header: {
    backgroundColor: Colors.primary,
    paddingTop: 52,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  iconBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerInfo: {
    flex: 1,
  },
  cityText: {
    color: '#fff',
    fontSize: Typography.sizes['2xl'],
    fontWeight: Typography.weights.bold,
  },
  subText: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: Typography.sizes.md,
    marginTop: 2,
  },
  content: {
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  dayCard: {
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
    padding: Spacing.md,
  },
  dayLabel: {
    fontSize: Typography.sizes.md,
    color: Colors.primary,
    fontWeight: Typography.weights.bold,
  },
  dayDate: {
    marginTop: 4,
    fontSize: Typography.sizes.lg,
    color: Colors.text,
    fontWeight: Typography.weights.semibold,
  },
  placeCard: {
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
    padding: Spacing.md,
  },
  placeTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  placeTitle: {
    flex: 1,
    fontSize: Typography.sizes.md,
    color: Colors.text,
    fontWeight: Typography.weights.bold,
  },
  placeRating: {
    fontSize: Typography.sizes.md,
    color: Colors.warning,
    fontWeight: Typography.weights.bold,
  },
  placeMeta: {
    marginTop: 6,
    fontSize: Typography.sizes.md,
    color: Colors.textSecondary,
  },
  routeBtn: {
    marginTop: 10,
    height: 42,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  routeBtnText: {
    color: '#fff',
    fontSize: Typography.sizes.md,
    fontWeight: Typography.weights.semibold,
  },
  dayNavRow: {
    flexDirection: 'row',
    gap: 8,
  },
  dayNavBtn: {
    flex: 1,
    height: 44,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.surface,
  },
  dayNavText: {
    color: Colors.text,
    fontSize: Typography.sizes.md,
    fontWeight: Typography.weights.medium,
  },
  disabledBtn: {
    opacity: 0.45,
  },
  emergencyBox: {
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
    padding: Spacing.md,
  },
  emergencyTitle: {
    color: Colors.text,
    fontSize: Typography.sizes.md,
    fontWeight: Typography.weights.bold,
    marginBottom: 8,
  },
  emergencyRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  emergencyChip: {
    borderRadius: 999,
    backgroundColor: Colors.surfaceAlt,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  emergencyChipText: {
    color: Colors.text,
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.medium,
  },
  docsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  docBtn: {
    flex: 1,
    height: 44,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
  },
  docBtnText: {
    color: '#fff',
    fontSize: Typography.sizes.md,
    fontWeight: Typography.weights.semibold,
  },
  exitBtn: {
    marginTop: 12,
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.md,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  exitBtnText: {
    color: '#fff',
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.semibold,
  },
});
