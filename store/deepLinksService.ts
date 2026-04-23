const YANDEX_TRAVEL_BASE = 'https://travel.yandex.ru';
const OSTROVOK_BASE = 'https://ostrovok.ru';

type TransportMode = 'flight' | 'train' | 'bus';

function normalizeCity(city: string): string {
  return String(city || '')
    .trim()
    .replace(/\s+/g, ' ');
}

function withTransportCommonParams(
  params: URLSearchParams,
  fromCity: string,
  toCity: string,
  departDate: string,
  adults = 1,
  children = 0
): URLSearchParams {
  params.set('fromName', normalizeCity(fromCity));
  params.set('toName', normalizeCity(toCity));
  params.set('when', departDate);
  params.set('adults', String(Math.max(1, adults)));
  if (children > 0) params.set('children', String(Math.max(0, children)));
  return params;
}

export function buildYandexTransportLink(
  mode: TransportMode,
  fromCity: string,
  toCity: string,
  departDate: string,
  adults = 1,
  children = 0
): string {
  const params = withTransportCommonParams(
    new URLSearchParams(),
    fromCity,
    toCity,
    departDate,
    adults,
    children
  );

  if (mode === 'flight') {
    // TZ v2.0: /avia/search/result with fromName/toName/when/adults/children.
    return `${YANDEX_TRAVEL_BASE}/avia/search/result/?${params.toString()}`;
  }

  if (mode === 'train') {
    return `${YANDEX_TRAVEL_BASE}/trains/?${params.toString()}`;
  }

  return `${YANDEX_TRAVEL_BASE}/buses/?${params.toString()}`;
}

export function buildYandexFlightsLink(
  fromCity: string,
  toCity: string,
  departDate: string,
  adults = 1,
  children = 0
): string {
  return buildYandexTransportLink('flight', fromCity, toCity, departDate, adults, children);
}

export function buildYandexTrainsLink(
  fromCity: string,
  toCity: string,
  departDate: string,
  adults = 1,
  children = 0
): string {
  return buildYandexTransportLink('train', fromCity, toCity, departDate, adults, children);
}

export function buildYandexBusesLink(
  fromCity: string,
  toCity: string,
  departDate: string,
  adults = 1,
  children = 0
): string {
  return buildYandexTransportLink('bus', fromCity, toCity, departDate, adults, children);
}

export function buildOstrovokHotelsLink(
  cityName: string,
  checkin: string,
  checkout: string,
  adults = 1
): string {
  const params = new URLSearchParams({
    query: normalizeCity(cityName),
    arrival: checkin,
    departure: checkout,
    adults: String(Math.max(1, adults)),
  });
  return `${OSTROVOK_BASE}/hotel/search/?${params.toString()}`;
}

export function buildYandexHotelsLink(
  cityName: string,
  checkin: string,
  checkout: string,
  adults = 1
): string {
  const params = new URLSearchParams({
    toName: normalizeCity(cityName),
    checkin,
    checkout,
    adults: String(Math.max(1, adults)),
  });
  return `${YANDEX_TRAVEL_BASE}/hotels/?${params.toString()}`;
}

export function buildYandexTravelMainLink(): string {
  return `${YANDEX_TRAVEL_BASE}/`;
}

export function buildOstrovokMainLink(): string {
  return `${OSTROVOK_BASE}/`;
}
