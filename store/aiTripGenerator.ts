import { DayPlan, Place, Trip } from '@/constants/data';
import { ensureAccessToken } from '@/store/authStorage';
import type { TripForm } from '@/store/useStore';

const API_BASE = process.env.EXPO_PUBLIC_AUTH_API_URL || 'http://localhost:8787';
const API_TIMEOUT_MS = 35000;

type GenerateApiResponse = { ok: boolean; data?: unknown; message?: string };

function toStringOr<T>(value: unknown, fallback: T): string | T {
  return typeof value === 'string' && value.trim().length > 0 ? value : fallback;
}

function parsePlaceFromAi(raw: unknown, index: number): Place | null {
  if (!raw || typeof raw !== 'object') return null;
  const value = raw as Record<string, unknown>;
  if (typeof value.name !== 'string' || !value.name.trim()) return null;

  const id =
    typeof value.id === 'string' && value.id.trim()
      ? value.id
      : `ai-place-${Date.now()}-${index}`;

  return {
    id,
    name: value.name.trim(),
    category: typeof value.category === 'string' ? value.category : 'Достопримечательность',
    description: typeof value.description === 'string' ? value.description : '',
    duration: typeof value.duration === 'string' ? value.duration : '1.5 часа',
    time: typeof value.time === 'string' ? value.time : '10:00',
    rating: typeof value.rating === 'number' && Number.isFinite(value.rating) ? value.rating : 4.5,
    address: typeof value.address === 'string' ? value.address : '',
    emoji: typeof value.emoji === 'string' ? value.emoji : '📍',
    price: typeof value.price === 'string' ? value.price : undefined,
    lat: typeof value.lat === 'number' && Number.isFinite(value.lat) ? value.lat : undefined,
    lng: typeof value.lng === 'number' && Number.isFinite(value.lng) ? value.lng : undefined,
  };
}

function parseDaysFromAi(raw: unknown): DayPlan[] | null {
  if (!Array.isArray(raw)) return null;
  const result: DayPlan[] = [];

  raw.forEach((dayRaw, dayIndex) => {
    if (!dayRaw || typeof dayRaw !== 'object') return;
    const dayValue = dayRaw as Record<string, unknown>;
    const placesRaw = Array.isArray(dayValue.places) ? dayValue.places : [];
    const places = placesRaw
      .map((placeRaw, placeIndex) => parsePlaceFromAi(placeRaw, dayIndex * 10 + placeIndex))
      .filter((item): item is Place => Boolean(item));

    if (!places.length) return;
    result.push({
      day: typeof dayValue.day === 'number' && Number.isFinite(dayValue.day) ? dayValue.day : dayIndex + 1,
      date: toStringOr(dayValue.date, `День ${dayIndex + 1}`) as string,
      places,
    });
  });

  return result.length ? result : null;
}

async function callGenerateApi(form: TripForm): Promise<GenerateApiResponse> {
  const token = await ensureAccessToken();
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT_MS);

  try {
    const res = await fetch(`${API_BASE}/api/generate-trip`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(form),
      signal: controller.signal,
    });
    const body = (await res.json()) as GenerateApiResponse;
    return body;
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      return { ok: false, message: 'AI timeout' };
    }
    return { ok: false, message: error instanceof Error ? error.message : 'AI network error' };
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function generateTripWithAI(
  form: TripForm,
  fallback: () => Trip
): Promise<{ trip: Trip; generatedByAI: boolean }> {
  const fallbackTrip = fallback();

  try {
    const response = await callGenerateApi(form);
    if (!response.ok || !response.data || typeof response.data !== 'object') {
      return { trip: fallbackTrip, generatedByAI: false };
    }

    const data = response.data as Record<string, unknown>;
    const parsedDays = parseDaysFromAi(data.days);
    if (!parsedDays || parsedDays.length === 0) {
      return { trip: fallbackTrip, generatedByAI: false };
    }

    const trip: Trip = {
      ...fallbackTrip,
      days: parsedDays,
      coverImage: typeof data.coverImage === 'string' && data.coverImage.trim()
        ? data.coverImage
        : fallbackTrip.coverImage,
      totalActivities: typeof data.totalActivities === 'number' && Number.isFinite(data.totalActivities)
        ? Math.max(0, Math.round(data.totalActivities))
        : fallbackTrip.totalActivities,
      totalFood: typeof data.totalFood === 'number' && Number.isFinite(data.totalFood)
        ? Math.max(0, Math.round(data.totalFood))
        : fallbackTrip.totalFood,
    };

    return { trip, generatedByAI: true };
  } catch (error) {
    console.warn('[AI] generateTripWithAI failed, fallback used', error);
    return { trip: fallbackTrip, generatedByAI: false };
  }
}
