const API_BASE = process.env.EXPO_PUBLIC_AUTH_API_URL || 'http://localhost:8787';
const API_TIMEOUT_MS = 9000;

export interface TrainOffer {
  id: string;
  provider: string;
  carrier: string;
  trainNumber: string;
  trainName: string;
  from: string;
  to: string;
  departureAt: string;
  arrivalAt: string;
  durationMinutes: number;
  carriageClass: string;
  seatsLeft: number;
  refundable: boolean;
  pricePerPerson: number;
  totalPrice: number;
  travelers: number;
  currency: string;
}

export interface TrainBooking {
  id: string;
  status: 'reserved' | 'paid' | 'expired';
  createdAt: string;
  expiresAt: string;
  provider: string;
  travelers: number;
  passengers: Array<{ fullName?: string; birthDate?: string; document?: string }>;
  offer: TrainOffer;
  totalPrice: number;
  currency: string;
  payment: null | {
    id: string;
    method: 'card';
    amount: number;
    paidAt: string;
  };
  ticket: null | {
    number: string;
    issuedAt: string;
    qrPayload: string;
  };
}

async function request<T>(path: string, init?: RequestInit): Promise<{ ok: true; data: T } | { ok: false; message: string }> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT_MS);
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...(init?.headers || {}),
      },
      ...init,
    });
    const body = (await res.json()) as T & { message?: string };
    if (!res.ok) return { ok: false, message: body?.message || `HTTP ${res.status}` };
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

export async function searchTrainOffers(input: {
  from: string;
  to: string;
  date: string;
  travelers: number;
}) {
  return request<{ ok: true; provider: string; offers: TrainOffer[] }>('/transport/trains/search', {
    method: 'POST',
    body: JSON.stringify(input),
  });
}

export async function createTrainBooking(input: {
  offer: TrainOffer;
  travelers: number;
  passengers: Array<{ fullName?: string; birthDate?: string; document?: string }>;
}) {
  return request<{ ok: true; booking: TrainBooking }>('/transport/trains/book', {
    method: 'POST',
    body: JSON.stringify(input),
  });
}

export async function payTrainBooking(input: { bookingId: string }) {
  return request<{ ok: true; booking: TrainBooking }>('/transport/trains/pay', {
    method: 'POST',
    body: JSON.stringify(input),
  });
}

export async function getTrainBooking(bookingId: string) {
  const safe = encodeURIComponent(bookingId);
  return request<{ ok: true; booking: TrainBooking }>(`/transport/trains/booking?bookingId=${safe}`, {
    method: 'GET',
  });
}
