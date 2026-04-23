import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import { Platform } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { TripDocument } from '@/constants/data';

const DB_NAME = 'travel_app.db';
const WEB_WALLET_KEY = 'wallet.docs.v1';

let dbPromise: Promise<SQLite.SQLiteDatabase> | null = null;

async function getDb() {
  if (!dbPromise) {
    dbPromise = SQLite.openDatabaseAsync(DB_NAME);
  }
  return dbPromise;
}

async function readWebDocs(): Promise<TripDocument[]> {
  const raw = await AsyncStorage.getItem(WEB_WALLET_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as TripDocument[]) : [];
  } catch {
    return [];
  }
}

async function writeWebDocs(docs: TripDocument[]): Promise<void> {
  await AsyncStorage.setItem(WEB_WALLET_KEY, JSON.stringify(docs));
}

function sortByUploadedAtDesc(docs: TripDocument[]): TripDocument[] {
  return [...docs].sort((a, b) => b.uploadedAt.localeCompare(a.uploadedAt));
}

export async function initWalletDb(): Promise<void> {
  if (Platform.OS === 'web') return;
  const db = await getDb();
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS documents (
      id TEXT PRIMARY KEY,
      trip_id TEXT NOT NULL,
      type TEXT NOT NULL,
      name TEXT NOT NULL,
      uri TEXT NOT NULL,
      mime_type TEXT NOT NULL,
      size_bytes INTEGER NOT NULL,
      uploaded_at TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_documents_trip ON documents(trip_id);
  `);
}

export async function addDocument(doc: TripDocument): Promise<void> {
  if (Platform.OS === 'web') {
    const docs = await readWebDocs();
    const next = [...docs.filter((item) => item.id !== doc.id), doc];
    await writeWebDocs(next);
    return;
  }

  const db = await getDb();
  await db.runAsync(
    `INSERT OR REPLACE INTO documents
      (id, trip_id, type, name, uri, mime_type, size_bytes, uploaded_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [doc.id, doc.tripId, doc.type, doc.name, doc.uri, doc.mimeType, doc.sizeBytes, doc.uploadedAt]
  );
}

export async function getDocuments(tripId: string): Promise<TripDocument[]> {
  if (Platform.OS === 'web') {
    const docs = await readWebDocs();
    return sortByUploadedAtDesc(docs.filter((item) => item.tripId === tripId));
  }

  const db = await getDb();
  const rows = await db.getAllAsync<{
    id: string;
    trip_id: string;
    type: string;
    name: string;
    uri: string;
    mime_type: string;
    size_bytes: number;
    uploaded_at: string;
  }>('SELECT * FROM documents WHERE trip_id = ? ORDER BY uploaded_at DESC', [tripId]);

  return rows.map((row) => ({
    id: row.id,
    tripId: row.trip_id,
    type: row.type as TripDocument['type'],
    name: row.name,
    uri: row.uri,
    mimeType: row.mime_type,
    sizeBytes: row.size_bytes,
    uploadedAt: row.uploaded_at,
  }));
}

export async function getAllDocuments(): Promise<TripDocument[]> {
  if (Platform.OS === 'web') {
    return sortByUploadedAtDesc(await readWebDocs());
  }

  const db = await getDb();
  const rows = await db.getAllAsync<{
    id: string;
    trip_id: string;
    type: string;
    name: string;
    uri: string;
    mime_type: string;
    size_bytes: number;
    uploaded_at: string;
  }>('SELECT * FROM documents ORDER BY uploaded_at DESC');

  return rows.map((row) => ({
    id: row.id,
    tripId: row.trip_id,
    type: row.type as TripDocument['type'],
    name: row.name,
    uri: row.uri,
    mimeType: row.mime_type,
    sizeBytes: row.size_bytes,
    uploadedAt: row.uploaded_at,
  }));
}

export async function deleteDocument(docId: string): Promise<void> {
  if (Platform.OS === 'web') {
    const docs = await readWebDocs();
    await writeWebDocs(docs.filter((item) => item.id !== docId));
    return;
  }

  const db = await getDb();
  const row = await db.getFirstAsync<{ uri: string }>('SELECT uri FROM documents WHERE id = ?', [docId]);
  await db.runAsync('DELETE FROM documents WHERE id = ?', [docId]);
  if (row?.uri) {
    await FileSystem.deleteAsync(row.uri, { idempotent: true });
  }
}

export async function deleteDocumentsByTripId(tripId: string): Promise<void> {
  if (Platform.OS === 'web') {
    const docs = await readWebDocs();
    await writeWebDocs(docs.filter((item) => item.tripId !== tripId));
    return;
  }

  const db = await getDb();
  const rows = await db.getAllAsync<{ uri: string }>('SELECT uri FROM documents WHERE trip_id = ?', [tripId]);
  await db.runAsync('DELETE FROM documents WHERE trip_id = ?', [tripId]);
  await Promise.all(rows.map((row) => FileSystem.deleteAsync(row.uri, { idempotent: true })));
}

export async function clearAllDocuments(): Promise<void> {
  if (Platform.OS === 'web') {
    await AsyncStorage.removeItem(WEB_WALLET_KEY);
    return;
  }

  const db = await getDb();
  const rows = await db.getAllAsync<{ uri: string }>('SELECT uri FROM documents');
  await db.runAsync('DELETE FROM documents');
  await Promise.all(rows.map((row) => FileSystem.deleteAsync(row.uri, { idempotent: true })));
}
