import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { Review } from '@/constants/data';

const DB_NAME = 'travel_app.db';
const WEB_REVIEWS_KEY = 'reviews.list.v1';

let dbPromise: Promise<SQLite.SQLiteDatabase> | null = null;

async function getDb() {
  if (!dbPromise) {
    dbPromise = SQLite.openDatabaseAsync(DB_NAME);
  }
  return dbPromise;
}

async function readWebReviews(): Promise<Review[]> {
  const raw = await AsyncStorage.getItem(WEB_REVIEWS_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Review[]) : [];
  } catch {
    return [];
  }
}

async function writeWebReviews(items: Review[]): Promise<void> {
  await AsyncStorage.setItem(WEB_REVIEWS_KEY, JSON.stringify(items));
}

function sortByCreatedAtDesc(items: Review[]): Review[] {
  return [...items].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

function parsePhotos(raw: string): string[] {
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === 'string') : [];
  } catch {
    return [];
  }
}

function mapRowToReview(row: {
  id: string;
  trip_id: string;
  place_id: string;
  place_name: string;
  rating: number;
  text: string;
  photos: string;
  created_at: string;
  accessibility_rating: string | null;
  accessibility_comment: string | null;
}): Review {
  return {
    id: row.id,
    tripId: row.trip_id,
    placeId: row.place_id,
    placeName: row.place_name,
    rating: row.rating as Review['rating'],
    text: row.text,
    photos: parsePhotos(row.photos),
    createdAt: row.created_at,
    accessibilityRating: (row.accessibility_rating ?? undefined) as Review['accessibilityRating'],
    accessibilityComment: row.accessibility_comment ?? undefined,
  };
}

export async function initReviewsDb(): Promise<void> {
  if (Platform.OS === 'web') return;
  const db = await getDb();
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS reviews (
      id TEXT PRIMARY KEY,
      trip_id TEXT NOT NULL,
      place_id TEXT NOT NULL,
      place_name TEXT NOT NULL,
      rating INTEGER NOT NULL,
      text TEXT NOT NULL,
      photos TEXT NOT NULL DEFAULT '[]',
      created_at TEXT NOT NULL,
      accessibility_rating TEXT,
      accessibility_comment TEXT
    );
    CREATE INDEX IF NOT EXISTS idx_reviews_place ON reviews(place_id);
    CREATE INDEX IF NOT EXISTS idx_reviews_trip ON reviews(trip_id);
  `);
}

export async function addReview(review: Review): Promise<void> {
  if (Platform.OS === 'web') {
    const reviews = await readWebReviews();
    const next = [...reviews.filter((item) => item.id !== review.id), review];
    await writeWebReviews(next);
    return;
  }

  const db = await getDb();
  await db.runAsync(
    `INSERT OR REPLACE INTO reviews
      (id, trip_id, place_id, place_name, rating, text, photos, created_at, accessibility_rating, accessibility_comment)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      review.id,
      review.tripId,
      review.placeId,
      review.placeName,
      review.rating,
      review.text,
      JSON.stringify(review.photos ?? []),
      review.createdAt,
      review.accessibilityRating ?? null,
      review.accessibilityComment ?? null,
    ]
  );
}

export async function getReviewsForPlace(placeId: string): Promise<Review[]> {
  if (Platform.OS === 'web') {
    const items = await readWebReviews();
    return sortByCreatedAtDesc(items.filter((item) => item.placeId === placeId));
  }

  const db = await getDb();
  const rows = await db.getAllAsync<{
    id: string;
    trip_id: string;
    place_id: string;
    place_name: string;
    rating: number;
    text: string;
    photos: string;
    created_at: string;
    accessibility_rating: string | null;
    accessibility_comment: string | null;
  }>('SELECT * FROM reviews WHERE place_id = ? ORDER BY created_at DESC', [placeId]);

  return rows.map(mapRowToReview);
}

export async function getReviewsForTrip(tripId: string): Promise<Review[]> {
  if (Platform.OS === 'web') {
    const items = await readWebReviews();
    return sortByCreatedAtDesc(items.filter((item) => item.tripId === tripId));
  }

  const db = await getDb();
  const rows = await db.getAllAsync<{
    id: string;
    trip_id: string;
    place_id: string;
    place_name: string;
    rating: number;
    text: string;
    photos: string;
    created_at: string;
    accessibility_rating: string | null;
    accessibility_comment: string | null;
  }>('SELECT * FROM reviews WHERE trip_id = ? ORDER BY created_at DESC', [tripId]);

  return rows.map(mapRowToReview);
}

export async function getAllReviews(): Promise<Review[]> {
  if (Platform.OS === 'web') {
    return sortByCreatedAtDesc(await readWebReviews());
  }

  const db = await getDb();
  const rows = await db.getAllAsync<{
    id: string;
    trip_id: string;
    place_id: string;
    place_name: string;
    rating: number;
    text: string;
    photos: string;
    created_at: string;
    accessibility_rating: string | null;
    accessibility_comment: string | null;
  }>('SELECT * FROM reviews ORDER BY created_at DESC');

  return rows.map(mapRowToReview);
}

export async function deleteReview(reviewId: string): Promise<void> {
  if (Platform.OS === 'web') {
    const items = await readWebReviews();
    await writeWebReviews(items.filter((item) => item.id !== reviewId));
    return;
  }

  const db = await getDb();
  await db.runAsync('DELETE FROM reviews WHERE id = ?', [reviewId]);
}

export async function clearAllReviews(): Promise<void> {
  if (Platform.OS === 'web') {
    await AsyncStorage.removeItem(WEB_REVIEWS_KEY);
    return;
  }

  const db = await getDb();
  await db.runAsync('DELETE FROM reviews');
}
