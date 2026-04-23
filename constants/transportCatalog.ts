export type TransportType = 'flight' | 'train' | 'bus';

export interface TransportCatalogItem {
  type: TransportType;
  carrier: string;
  duration: string;
  pricePerPersonRoundTrip: number;
  comfort: 'base' | 'medium' | 'high';
}

const DEFAULT_OPTIONS: TransportCatalogItem[] = [
  { type: 'flight', carrier: 'Аэрофлот', duration: '2 ч 50 мин', pricePerPersonRoundTrip: 14000, comfort: 'high' },
  { type: 'train', carrier: 'РЖД', duration: '10 ч 20 мин', pricePerPersonRoundTrip: 7000, comfort: 'medium' },
  { type: 'bus', carrier: 'Межгород', duration: '13 ч', pricePerPersonRoundTrip: 4200, comfort: 'base' },
];

export const TRANSPORT_CATALOG_BY_ROUTE: Record<string, TransportCatalogItem[]> = {
  'москва>санкт-петербург': [
    { type: 'flight', carrier: 'Аэрофлот', duration: '1 ч 25 мин', pricePerPersonRoundTrip: 9200, comfort: 'high' },
    { type: 'train', carrier: 'Сапсан', duration: '3 ч 40 мин', pricePerPersonRoundTrip: 6400, comfort: 'high' },
    { type: 'bus', carrier: 'Ecolines', duration: '10 ч 30 мин', pricePerPersonRoundTrip: 3500, comfort: 'base' },
  ],
  'москва>казань': [
    { type: 'flight', carrier: 'Победа', duration: '1 ч 55 мин', pricePerPersonRoundTrip: 8700, comfort: 'medium' },
    { type: 'train', carrier: 'РЖД', duration: '10 ч 10 мин', pricePerPersonRoundTrip: 5900, comfort: 'medium' },
    { type: 'bus', carrier: 'Межгород', duration: '13 ч 40 мин', pricePerPersonRoundTrip: 3700, comfort: 'base' },
  ],
  'москва>сочи': [
    { type: 'flight', carrier: 'S7 Airlines', duration: '2 ч 15 мин', pricePerPersonRoundTrip: 13600, comfort: 'high' },
    { type: 'train', carrier: 'РЖД', duration: '23 ч 40 мин', pricePerPersonRoundTrip: 8200, comfort: 'medium' },
    { type: 'bus', carrier: 'Межгород', duration: '26 ч', pricePerPersonRoundTrip: 5400, comfort: 'base' },
  ],
  'москва>калининград': [
    { type: 'flight', carrier: 'Аэрофлот', duration: '1 ч 45 мин', pricePerPersonRoundTrip: 14400, comfort: 'high' },
    { type: 'train', carrier: 'РЖД', duration: '20 ч 30 мин', pricePerPersonRoundTrip: 9900, comfort: 'medium' },
  ],
  'москва>владивосток': [
    { type: 'flight', carrier: 'Аэрофлот', duration: '8 ч 55 мин', pricePerPersonRoundTrip: 31800, comfort: 'high' },
    { type: 'train', carrier: 'РЖД', duration: '6 дней 22 ч', pricePerPersonRoundTrip: 22800, comfort: 'medium' },
  ],
  'москва>иркутск': [
    { type: 'flight', carrier: 'S7 Airlines', duration: '5 ч 50 мин', pricePerPersonRoundTrip: 19600, comfort: 'high' },
    { type: 'train', carrier: 'РЖД', duration: '3 дня 15 ч', pricePerPersonRoundTrip: 12400, comfort: 'medium' },
  ],
};

function normalizeCity(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[.,/#!$%^&*;:{}=\\_`~()]/g, ' ')
    .replace(/\s+/g, ' ')
    .replace('санкт петербург', 'санкт-петербург')
    .replace('питер', 'санкт-петербург')
    .replace('спб', 'санкт-петербург')
    .replace('байкал', 'иркутск');
}

export function getTransportOptions(from: string, to: string): TransportCatalogItem[] {
  const fromKey = normalizeCity(from);
  const toKey = normalizeCity(to);
  return (
    TRANSPORT_CATALOG_BY_ROUTE[`${fromKey}>${toKey}`]
    ?? TRANSPORT_CATALOG_BY_ROUTE[`${toKey}>${fromKey}`]
    ?? DEFAULT_OPTIONS
  );
}
