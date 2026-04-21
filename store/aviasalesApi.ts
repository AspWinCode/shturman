/**
 * Aviasales / Travelpayouts API integration.
 * Документация: https://travelpayouts.github.io/slate/
 */

const TOKEN = process.env.EXPO_PUBLIC_AVIASALES_TOKEN ?? '';
const BASE_URL = 'https://api.travelpayouts.com';
const BOOKING_BASE = 'https://www.aviasales.ru';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface AviasalesFlight {
  origin: string;
  destination: string;
  origin_airport: string;
  destination_airport: string;
  price: number;
  airline: string;
  flight_number: string;
  departure_at: string;   // ISO-8601, e.g. "2025-06-15T10:30:00+03:00"
  transfers: number;
  duration: number;       // total minutes
  duration_to: number;    // outbound minutes
  link: string;           // relative path on aviasales.ru
}

interface SearchResponse {
  success: boolean;
  data: AviasalesFlight[];
  currency: string;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Форматирует ISO-дату в строку "ЧЧ:ММ".
 */
export function formatTime(iso: string): string {
  try {
    const d = new Date(iso);
    const h = String(d.getHours()).padStart(2, '0');
    const m = String(d.getMinutes()).padStart(2, '0');
    return `${h}:${m}`;
  } catch {
    return '—';
  }
}

/**
 * Форматирует минуты в строку "Xч Yмин" или "Xч".
 */
export function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (m === 0) return `${h}ч`;
  return `${h}ч ${m}мин`;
}

/**
 * Возвращает дату в формате "15 янв" по ISO-строке.
 */
export function formatDateShort(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' });
  } catch {
    return '';
  }
}

/**
 * Строит полный URL для бронирования на Aviasales.
 */
export function buildBookingUrl(link: string): string {
  return `${BOOKING_BASE}${link}`;
}

/**
 * Если дата уже прошла — возвращает ближайшие 2 недели вперёд.
 * Aviasales не возвращает данные по прошедшим датам.
 */
function ensureFutureDate(dateStr: string): string {
  const today = new Date().toISOString().split('T')[0];
  if (dateStr && dateStr >= today) return dateStr;
  const future = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000);
  return future.toISOString().split('T')[0];
}

// ─── API calls ───────────────────────────────────────────────────────────────

/**
 * Ищет дешёвые авиабилеты по заданному направлению и дате.
 *
 * @param originIata      IATA-код города отправления (напр. "MOW")
 * @param destinationIata IATA-код города назначения (напр. "LED")
 * @param departureDate   дата вылета YYYY-MM-DD
 * @param limit           максимальное количество вариантов (по умолчанию 5)
 */
export async function searchFlights(
  originIata: string,
  destinationIata: string,
  departureDate: string,
  limit = 5,
): Promise<AviasalesFlight[]> {
  if (!TOKEN) {
    throw new Error('EXPO_PUBLIC_AVIASALES_TOKEN не задан');
  }

  const effectiveDate = ensureFutureDate(departureDate);

  const params = new URLSearchParams({
    origin: originIata,
    destination: destinationIata,
    departure_at: effectiveDate,
    currency: 'rub',
    sorting: 'price',
    direct: 'false',
    limit: String(limit),
    token: TOKEN,
  });

  const url = `${BASE_URL}/aviasales/v3/prices_for_dates?${params.toString()}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Aviasales API HTTP ${response.status}`);
  }

  const json: SearchResponse = await response.json();

  if (!json.success) {
    throw new Error('Aviasales API вернул success: false');
  }

  return json.data ?? [];
}

/**
 * Возвращает дешевейшие билеты на месяц (без привязки к конкретной дате).
 * Используется для виджета "Лучшие цены" на главном экране.
 */
export async function getCheapestForMonth(
  originIata: string,
  destinationIata: string,
  yearMonth: string, // "YYYY-MM"
): Promise<AviasalesFlight[]> {
  if (!TOKEN) return [];

  const params = new URLSearchParams({
    origin: originIata,
    destination: destinationIata,
    departure_at: yearMonth,
    currency: 'rub',
    sorting: 'price',
    limit: '3',
    token: TOKEN,
  });

  try {
    const response = await fetch(
      `${BASE_URL}/aviasales/v3/prices_for_dates?${params.toString()}`,
    );
    if (!response.ok) return [];
    const json: SearchResponse = await response.json();
    return json.success ? (json.data ?? []) : [];
  } catch {
    return [];
  }
}
