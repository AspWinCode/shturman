import * as SQLite from 'expo-sqlite';
import { Trip, TravelStyle } from '@/constants/data';
import {
  deleteTripFromApi,
  fetchTripsFromApi,
  reseedDemoTripsApi,
  resetTripsApi,
  upsertTripToApi,
} from '@/store/tripsApi';
import { getCurrentSessionUser } from '@/store/authStorage';
import { generateTripFromForm } from '@/store/tripGenerator';

const DB_NAME = 'travel_app.db';
const TRIPS_TABLE = 'trips';
const META_TABLE = 'app_meta';
const SEED_VERSION = '2026-04-20-v2';

let dbPromise: Promise<SQLite.SQLiteDatabase> | null = null;

type TripRow = {
  id: string;
  payload: string;
  status: Trip['status'];
  start_date: string;
};

function getDb() {
  if (!dbPromise) {
    dbPromise = SQLite.openDatabaseAsync(DB_NAME);
  }
  return dbPromise;
}

async function shouldUseApi() {
  const sessionUser = await getCurrentSessionUser();
  return Boolean(sessionUser);
}

function addDays(dateIso: string, days: number) {
  const date = new Date(dateIso);
  date.setDate(date.getDate() + days);
  return date.toISOString().split('T')[0];
}

function parseTripRows(rows: TripRow[]): Trip[] {
  const trips: Trip[] = [];
  for (const row of rows) {
    try {
      const parsed = JSON.parse(row.payload) as Trip;
      trips.push({
        ...parsed,
        id: row.id,
        status: row.status,
        startDate: parsed.startDate ?? row.start_date,
      });
    } catch (error) {
      console.warn('Failed to parse trip from row', row.id, error);
    }
  }
  return trips;
}

function buildSeedTrips(): Trip[] {
  const series: Array<{
    key: string;
    from: string;
    to: string;
    status: Trip['status'];
    startDate: string;
    count: number;
    stepDays: number;
    budget: number;
    travelStyle: TravelStyle;
    travelers: number;
    interests: string[];
  }> = [
    {
      key: 'spb-upcoming',
      from: 'Москва',
      to: 'Санкт-Петербург',
      status: 'upcoming',
      startDate: '2026-04-20',
      count: 4,
      stepDays: 14,
      budget: 52000,
      travelStyle: 'standard',
      travelers: 2,
      interests: ['museums', 'architecture', 'food'],
    },
    {
      key: 'kazan-upcoming',
      from: 'Москва',
      to: 'Казань',
      status: 'upcoming',
      startDate: '2026-05-01',
      count: 4,
      stepDays: 12,
      budget: 48000,
      travelStyle: 'standard',
      travelers: 2,
      interests: ['history', 'food', 'architecture'],
    },
    {
      key: 'sochi-upcoming',
      from: 'Москва',
      to: 'Сочи',
      status: 'upcoming',
      startDate: '2026-05-15',
      count: 4,
      stepDays: 13,
      budget: 76000,
      travelStyle: 'comfort',
      travelers: 2,
      interests: ['beach', 'nature', 'food'],
    },
    {
      key: 'kaliningrad-upcoming',
      from: 'Москва',
      to: 'Калининград',
      status: 'upcoming',
      startDate: '2026-06-10',
      count: 3,
      stepDays: 15,
      budget: 54000,
      travelStyle: 'comfort',
      travelers: 2,
      interests: ['architecture', 'history', 'food'],
    },
    {
      key: 'vladivostok-upcoming',
      from: 'Москва',
      to: 'Владивосток',
      status: 'upcoming',
      startDate: '2026-06-20',
      count: 3,
      stepDays: 16,
      budget: 90000,
      travelStyle: 'comfort',
      travelers: 2,
      interests: ['nature', 'food', 'architecture'],
    },
    {
      key: 'baikal-upcoming',
      from: 'Москва',
      to: 'Байкал',
      status: 'upcoming',
      startDate: '2026-07-01',
      count: 2,
      stepDays: 18,
      budget: 98000,
      travelStyle: 'comfort',
      travelers: 2,
      interests: ['nature', 'hiking', 'food'],
    },
    {
      key: 'moscow-past',
      from: 'Казань',
      to: 'Москва',
      status: 'past',
      startDate: '2025-01-10',
      count: 3,
      stepDays: 22,
      budget: 45000,
      travelStyle: 'standard',
      travelers: 1,
      interests: ['history', 'museums', 'architecture'],
    },
    {
      key: 'spb-past',
      from: 'Москва',
      to: 'Санкт-Петербург',
      status: 'past',
      startDate: '2025-02-01',
      count: 3,
      stepDays: 24,
      budget: 42000,
      travelStyle: 'standard',
      travelers: 2,
      interests: ['museums', 'history', 'food'],
    },
    {
      key: 'sochi-past',
      from: 'Казань',
      to: 'Сочи',
      status: 'past',
      startDate: '2025-03-05',
      count: 3,
      stepDays: 26,
      budget: 68000,
      travelStyle: 'comfort',
      travelers: 2,
      interests: ['beach', 'nature', 'food'],
    },
    {
      key: 'draft-mix',
      from: 'Москва',
      to: 'Казань',
      status: 'draft',
      startDate: '2026-08-01',
      count: 2,
      stepDays: 20,
      budget: 35000,
      travelStyle: 'budget',
      travelers: 1,
      interests: ['food', 'history'],
    },
  ];

  const trips: Trip[] = [];

  for (const item of series) {
    for (let idx = 0; idx < item.count; idx += 1) {
      const startDate = addDays(item.startDate, idx * item.stepDays);
      const endDate = addDays(startDate, 3 + (idx % 3));
      const budget = item.budget + idx * 2200;
      const travelers = Math.max(1, Math.min(5, item.travelers + (idx % 2)));

      const trip = generateTripFromForm({
        from: item.from,
        to: item.to,
        startDate,
        endDate,
        budget,
        travelers,
        interests: item.interests,
        travelStyle: item.travelStyle,
      });

      trip.id = `seed-${item.key}-${idx + 1}`;
      trip.status = item.status;
      trip.startDate = startDate;
      trip.endDate = endDate;
      trip.budget = budget;
      trip.travelStyle = item.travelStyle;
      trip.travelers = travelers;

      trips.push(trip);
    }
  }

  return trips;
}

async function seedTripsIfNeeded(db: SQLite.SQLiteDatabase) {
  const currentVersionRow = await db.getFirstAsync<{ value: string }>(
    `SELECT value FROM ${META_TABLE} WHERE key = ?`,
    'seed_version'
  );
  const currentVersion = currentVersionRow?.value ?? null;
  if (currentVersion === SEED_VERSION) return;

  const seedTrips = buildSeedTrips();

  for (const trip of seedTrips) {
    await db.runAsync(
      `INSERT INTO ${TRIPS_TABLE} (id, payload, status, start_date, updated_at)
       VALUES (?, ?, ?, ?, ?)
       ON CONFLICT(id) DO UPDATE SET
         payload = excluded.payload,
         status = excluded.status,
         start_date = excluded.start_date,
         updated_at = excluded.updated_at`,
      trip.id,
      JSON.stringify(trip),
      trip.status,
      trip.startDate,
      new Date().toISOString()
    );
  }

  await db.runAsync(
    `INSERT INTO ${META_TABLE} (key, value, updated_at)
     VALUES (?, ?, ?)
     ON CONFLICT(key) DO UPDATE SET
       value = excluded.value,
       updated_at = excluded.updated_at`,
    'seed_version',
    SEED_VERSION,
    new Date().toISOString()
  );
}

export async function initializeTripsDb() {
  const db = await getDb();
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS ${TRIPS_TABLE} (
      id TEXT PRIMARY KEY NOT NULL,
      payload TEXT NOT NULL,
      status TEXT NOT NULL,
      start_date TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS ${META_TABLE} (
      key TEXT PRIMARY KEY NOT NULL,
      value TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_trips_status ON ${TRIPS_TABLE} (status);
    CREATE INDEX IF NOT EXISTS idx_trips_start_date ON ${TRIPS_TABLE} (start_date);
  `);
  await seedTripsIfNeeded(db);
}

export async function fetchTripsFromDb(): Promise<Trip[]> {
  if (await shouldUseApi()) {
    const apiResult = await fetchTripsFromApi();
    if (apiResult.ok) {
      return parseTripRows(apiResult.data.trips);
    }
  }

  const db = await getDb();
  const rows = await db.getAllAsync<TripRow>(
    `SELECT id, payload, status, start_date
     FROM ${TRIPS_TABLE}
     ORDER BY start_date ASC`
  );

  return parseTripRows(rows);
}

export async function upsertTripToDb(trip: Trip) {
  if (await shouldUseApi()) {
    const apiResult = await upsertTripToApi(trip);
    if (apiResult.ok) return;
  }

  const db = await getDb();
  const now = new Date().toISOString();
  await db.runAsync(
    `INSERT INTO ${TRIPS_TABLE} (id, payload, status, start_date, updated_at)
     VALUES (?, ?, ?, ?, ?)
     ON CONFLICT(id) DO UPDATE SET
       payload = excluded.payload,
       status = excluded.status,
       start_date = excluded.start_date,
       updated_at = excluded.updated_at`,
    trip.id,
    JSON.stringify(trip),
    trip.status,
    trip.startDate,
    now
  );
}

export async function deleteTripFromDb(id: string) {
  if (await shouldUseApi()) {
    const apiResult = await deleteTripFromApi(id);
    if (apiResult.ok) return;
  }

  const db = await getDb();
  await db.runAsync(`DELETE FROM ${TRIPS_TABLE} WHERE id = ?`, id);
}

export async function resetTripsDb(options?: { reseed?: boolean }) {
  const reseed = options?.reseed ?? true;

  if (await shouldUseApi()) {
    const apiResult = reseed ? await reseedDemoTripsApi() : await resetTripsApi();
    if (apiResult.ok) return;
  }

  const db = await getDb();

  await db.runAsync(`DELETE FROM ${TRIPS_TABLE}`);
  await db.runAsync(`DELETE FROM ${META_TABLE} WHERE key = ?`, 'seed_version');

  if (reseed) {
    await seedTripsIfNeeded(db);
  }
}
