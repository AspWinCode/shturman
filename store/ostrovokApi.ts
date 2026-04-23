const API_BASE = process.env.EXPO_PUBLIC_AUTH_API_URL || 'http://localhost:8787';
const API_TIMEOUT_MS = 12000;

export interface OstrovokOffer {
  id: string;
  hotelName: string;
  stars: number;
  rating: number;
  distanceFromCenterKm: number;
  roomName: string;
  refundable: boolean;
  meal: string;
  photoUrl?: string;
  amenities?: string[];
  pricePerNight: number;
  totalPrice: number;
  source: 'ostrovok';
}

export async function searchOstrovok(input: {
  city: string;
  checkin: string;
  checkout: string;
  adults: number;
}): Promise<{ ok: true; offers: OstrovokOffer[] } | { ok: false; message: string; offers: [] }> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT_MS);
  try {
    const res = await fetch(`${API_BASE}/hotels/ostrovok/search`, {
      method: 'POST',
      signal: controller.signal,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });
    const body = await res.json();
    if (!body?.ok) {
      return { ok: false, message: body?.message || 'Ostrovok unavailable', offers: [] };
    }
    return { ok: true, offers: Array.isArray(body.offers) ? body.offers : [] };
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      return { ok: false, message: 'Ostrovok timeout', offers: [] };
    }
    return { ok: false, message: error instanceof Error ? error.message : 'Network error', offers: [] };
  } finally {
    clearTimeout(timeoutId);
  }
}
