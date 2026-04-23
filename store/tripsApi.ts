import { Trip } from '@/constants/data';
import { ensureAccessToken } from '@/store/authStorage';

const API_BASE = process.env.EXPO_PUBLIC_AUTH_API_URL || 'http://localhost:8787';
const API_TIMEOUT_MS = 7000;

interface TripRow {
  id: string;
  payload: string;
  status: Trip['status'];
  start_date: string;
}

async function authRequest<T>(path: string, init?: RequestInit): Promise<{ ok: true; data: T } | { ok: false; message: string; status?: number }> {
  const accessToken = await ensureAccessToken();
  if (!accessToken) return { ok: false, message: 'No active session' };
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT_MS);

  try {
    const res = await fetch(`${API_BASE}${path}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
        ...(init?.headers || {}),
      },
      signal: controller.signal,
      ...init,
    });
    const body = (await res.json()) as T & { message?: string };
    if (!res.ok) return { ok: false, message: body?.message || `HTTP ${res.status}`, status: res.status };
    return { ok: true, data: body };
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      return { ok: false, message: 'API timeout' };
    }
    return { ok: false, message: error instanceof Error ? error.message : 'Network error' };
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function fetchTripsFromApi() {
  return authRequest<{ ok: true; trips: TripRow[] }>('/trips', { method: 'GET' });
}

export async function upsertTripToApi(trip: Trip) {
  return authRequest<{ ok: true }>('/trips/upsert', {
    method: 'POST',
    body: JSON.stringify({ trip }),
  });
}

export async function deleteTripFromApi(id: string) {
  return authRequest<{ ok: true }>('/trips/delete', {
    method: 'POST',
    body: JSON.stringify({ id }),
  });
}

export async function resetTripsApi() {
  return authRequest<{ ok: true }>('/trips/reset', { method: 'POST' });
}

export async function reseedDemoTripsApi() {
  return authRequest<{ ok: true; count: number }>('/trips/reseed-demo', { method: 'POST' });
}
