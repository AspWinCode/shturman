import AsyncStorage from '@react-native-async-storage/async-storage';
import { Trip } from '@/constants/data';

const OFFLINE_PREFIX = 'offline_trip_';

export async function cacheTrip(trip: Trip): Promise<void> {
  await AsyncStorage.setItem(`${OFFLINE_PREFIX}${trip.id}`, JSON.stringify(trip));
}

export async function getCachedTrip(tripId: string): Promise<Trip | null> {
  const raw = await AsyncStorage.getItem(`${OFFLINE_PREFIX}${tripId}`);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as Trip;
  } catch {
    return null;
  }
}

export async function removeCachedTrip(tripId: string): Promise<void> {
  await AsyncStorage.removeItem(`${OFFLINE_PREFIX}${tripId}`);
}

export async function getCachedTripIds(): Promise<string[]> {
  const keys = await AsyncStorage.getAllKeys();
  return keys
    .filter((key) => key.startsWith(OFFLINE_PREFIX))
    .map((key) => key.replace(OFFLINE_PREFIX, ''));
}

export async function clearCachedTrips(): Promise<void> {
  const keys = await AsyncStorage.getAllKeys();
  const cacheKeys = keys.filter((key) => key.startsWith(OFFLINE_PREFIX));
  if (cacheKeys.length === 0) return;
  await AsyncStorage.multiRemove(cacheKeys);
}
