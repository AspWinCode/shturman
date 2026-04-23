import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

const NOTIF_IDS_KEY = 'notif.tripIds';
const PREF_7_DAYS_KEY = 'notif.pref.7days';
const PREF_1_DAY_KEY = 'notif.pref.1day';
const PREF_DEPARTURE_KEY = 'notif.pref.departure';
const PREF_REVIEW_KEY = 'notif.pref.review';

type NotificationPrefs = {
  sevenDays: boolean;
  oneDay: boolean;
  departure: boolean;
  review: boolean;
};

type TripNotificationInput = {
  id: string;
  to: string;
  startDate: string;
  endDate?: string;
};

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: true,
  }),
});

function toDateAtHour(dateIso: string, hour: number): Date {
  const date = new Date(`${dateIso}T00:00:00`);
  date.setHours(hour, 0, 0, 0);
  return date;
}

async function ensureAndroidChannel() {
  if (Platform.OS !== 'android') return;
  await Notifications.setNotificationChannelAsync('travel-reminders', {
    name: 'Напоминания о поездках',
    importance: Notifications.AndroidImportance.DEFAULT,
    vibrationPattern: [0, 200, 200, 200],
    lightColor: '#1B3A6B',
  });
}

export async function requestNotificationPermission(): Promise<boolean> {
  if (Platform.OS === 'web') return false;
  await ensureAndroidChannel();

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  if (existingStatus === 'granted') return true;

  const { status } = await Notifications.requestPermissionsAsync();
  return status === 'granted';
}

export async function getNotificationPrefs(): Promise<NotificationPrefs> {
  const [d7, d1, dep, rev] = await Promise.all([
    AsyncStorage.getItem(PREF_7_DAYS_KEY),
    AsyncStorage.getItem(PREF_1_DAY_KEY),
    AsyncStorage.getItem(PREF_DEPARTURE_KEY),
    AsyncStorage.getItem(PREF_REVIEW_KEY),
  ]);

  return {
    sevenDays: d7 !== 'false',
    oneDay: d1 !== 'false',
    departure: dep !== 'false',
    review: rev !== 'false',
  };
}

export async function setNotificationPref(
  key: 'sevenDays' | 'oneDay' | 'departure' | 'review',
  value: boolean
): Promise<void> {
  const storageKey =
    key === 'sevenDays'
      ? PREF_7_DAYS_KEY
      : key === 'oneDay'
        ? PREF_1_DAY_KEY
        : key === 'departure'
          ? PREF_DEPARTURE_KEY
          : PREF_REVIEW_KEY;
  await AsyncStorage.setItem(storageKey, String(value));
}

export async function scheduleTripNotifications(trip: TripNotificationInput): Promise<void> {
  const granted = await requestNotificationPermission();
  if (!granted) return;

  await cancelTripNotifications(trip.id);

  const prefs = await getNotificationPrefs();
  const now = new Date();
  const start = toDateAtHour(trip.startDate, 9);
  const ids: string[] = [];
  const common = Platform.OS === 'android' ? { channelId: 'travel-reminders' as const } : {};

  if (prefs.sevenDays) {
    const sevenDaysBefore = new Date(start);
    sevenDaysBefore.setDate(sevenDaysBefore.getDate() - 7);
    if (sevenDaysBefore > now) {
      const id = await Notifications.scheduleNotificationAsync({
        content: {
          title: `✈️ До поездки в ${trip.to} — 7 дней`,
          body: 'Пора проверить документы и билеты.',
          data: { tripId: trip.id, type: 'reminder_7d' },
          ...common,
        },
        trigger: sevenDaysBefore,
      });
      ids.push(id);
    }
  }

  if (prefs.oneDay) {
    const oneDayBefore = new Date(start);
    oneDayBefore.setDate(oneDayBefore.getDate() - 1);
    if (oneDayBefore > now) {
      const id = await Notifications.scheduleNotificationAsync({
        content: {
          title: `🧳 Завтра вылет в ${trip.to}`,
          body: 'Проверьте документы и вещи перед поездкой.',
          data: { tripId: trip.id, type: 'reminder_1d' },
          ...common,
        },
        trigger: oneDayBefore,
      });
      ids.push(id);
    }
  }

  if (prefs.departure && start > now) {
    const id = await Notifications.scheduleNotificationAsync({
      content: {
        title: `🚀 Поездка в ${trip.to} начинается`,
        body: 'Откройте маршрут в приложении.',
        data: { tripId: trip.id, type: 'trip_start' },
        ...common,
      },
      trigger: start,
    });
    ids.push(id);
  }

  if (prefs.review && trip.endDate) {
    const reviewDate = toDateAtHour(trip.endDate, 18);
    reviewDate.setDate(reviewDate.getDate() + 1);
    if (reviewDate > now) {
      const id = await Notifications.scheduleNotificationAsync({
        content: {
          title: `💬 Как прошла поездка в ${trip.to}?`,
          body: 'Оставьте отзыв о местах — это поможет другим.',
          data: { tripId: trip.id, type: 'review_request' },
          ...common,
        },
        trigger: reviewDate,
      });
      ids.push(id);
    }
  }

  const raw = await AsyncStorage.getItem(NOTIF_IDS_KEY);
  const map: Record<string, string[]> = raw ? JSON.parse(raw) : {};
  map[trip.id] = ids;
  await AsyncStorage.setItem(NOTIF_IDS_KEY, JSON.stringify(map));
}

export async function cancelTripNotifications(tripId: string): Promise<void> {
  const raw = await AsyncStorage.getItem(NOTIF_IDS_KEY);
  if (!raw) return;
  const map: Record<string, string[]> = JSON.parse(raw);
  const ids = map[tripId] ?? [];
  await Promise.all(ids.map((id) => Notifications.cancelScheduledNotificationAsync(id)));
  delete map[tripId];
  await AsyncStorage.setItem(NOTIF_IDS_KEY, JSON.stringify(map));
}

export async function clearAllTripNotifications(): Promise<void> {
  const raw = await AsyncStorage.getItem(NOTIF_IDS_KEY);
  if (raw) {
    const map: Record<string, string[]> = JSON.parse(raw);
    const allIds = Object.values(map).flat();
    await Promise.all(allIds.map((id) => Notifications.cancelScheduledNotificationAsync(id)));
  }
  await AsyncStorage.removeItem(NOTIF_IDS_KEY);
}
