const API_BASE = process.env.EXPO_PUBLIC_AUTH_API_URL || 'http://localhost:8787';
const API_TIMEOUT_MS = 9000;

export interface YandexRaspOffer {
  id: string;
  source: 'yandex_rasp';
  type: 'flight' | 'train' | 'bus';
  carrier: string;
  threadNumber?: string;
  threadTitle?: string;
  fromStation?: string;
  toStation?: string;
  departureAt: string | null;
  arrivalAt: string | null;
  durationMinutes: number;
  pricePerPersonRoundTrip: number;
  totalPrice: number;
  priceSource?: 'live' | 'estimated';
  tariffs?: Array<{
    className: string;
    price: number;
    seats?: number;
  }>;
}

export async function searchYandexRasp(input: {
  from: string;
  to: string;
  date: string;
  travelers: number;
}): Promise<{ ok: true; offers: YandexRaspOffer[] } | { ok: false; message: string; offers: [] }> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT_MS);
  try {
    const res = await fetch(`${API_BASE}/transport/yandex-rasp/search`, {
      method: 'POST',
      signal: controller.signal,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });
    const body = await res.json();
    if (!body?.ok) {
      return { ok: false, message: body?.message || 'Yandex Rasp unavailable', offers: [] };
    }
    return { ok: true, offers: Array.isArray(body.offers) ? body.offers : [] };
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      return { ok: false, message: 'Yandex Rasp timeout', offers: [] };
    }
    return { ok: false, message: error instanceof Error ? error.message : 'Network error', offers: [] };
  } finally {
    clearTimeout(timeoutId);
  }
}
