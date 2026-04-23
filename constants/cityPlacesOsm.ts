import { GENERATED_CITY_PLACES, GeneratedPlaceTemplate } from './cityPlaces.generated';

export type TimeSlot = 'morning' | 'afternoon' | 'evening';

export interface PlaceTemplate {
  name: string;
  category: string;
  description: string;
  emoji: string;
  duration: string;
  price: string;
  rating: number;
  interests: string[];
  timeSlot: TimeSlot;
  address?: string;
  lat?: number;
  lng?: number;
  source?: 'osm' | 'seed';
  sourceId?: string;
  placeType?: string;
  internalTags?: string[];
  accessible?: {
    wheelchair: boolean;
    audioGuide: boolean;
    braille: boolean;
    parkingNearby: boolean;
    notes?: string;
  };
}

function normalizeCityKey(value: string): string {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/ё/g, 'е')
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ');
}

const CITY_ALIASES: Record<string, string> = {
  спб: 'санкт-петербург',
  'санкт петербург': 'санкт-петербург',
  'нижний новгород': 'нижний новгород',
  'улан удэ': 'улан-удэ',
  'озеро байкал': 'иркутск',
  байкал: 'иркутск',
};

function inferAccessibility(place: PlaceTemplate): NonNullable<PlaceTemplate['accessible']> {
  const text = `${place.category} ${place.description} ${place.name}`.toLowerCase();
  const museumLike = /муз|галер|театр|кремл|дворец|собор|истор|центр|площад/.test(text);
  const outdoorLike = /парк|гора|набереж|поход|троп|пляж|природ/.test(text);

  return {
    wheelchair: museumLike || !outdoorLike,
    audioGuide: museumLike,
    braille: museumLike && /муз|галер|театр/.test(text),
    parkingNearby: museumLike || /центр|площад/.test(text),
    notes: museumLike
      ? 'Проверьте доступность пандуса и лифта перед посещением.'
      : 'Часть маршрута может проходить по неровному покрытию.',
  };
}

function enrichPlaces(places: GeneratedPlaceTemplate[]): PlaceTemplate[] {
  return places.map((place) => ({
    ...place,
    accessible: inferAccessibility(place),
  }));
}

export const CITY_PLACES: Record<string, PlaceTemplate[]> = Object.fromEntries(
  Object.entries(GENERATED_CITY_PLACES).map(([city, places]) => [city, enrichPlaces(places)])
);

export function getCityPlacesByName(cityName: string): PlaceTemplate[] | null {
  const normalized = normalizeCityKey(cityName);
  const direct = CITY_PLACES[normalized];
  if (direct) return direct;

  const alias = CITY_ALIASES[normalized];
  if (alias && CITY_PLACES[alias]) return CITY_PLACES[alias];

  const fuzzyMatchKey = Object.keys(CITY_PLACES).find((key) => normalizeCityKey(key) === normalized);
  if (fuzzyMatchKey) return CITY_PLACES[fuzzyMatchKey];

  return null;
}

export const DEFAULT_PLACES: PlaceTemplate[] = [
  {
    name: 'Центральная площадь',
    category: 'Архитектура',
    placeType: 'architecture',
    description: 'Исторический центр города с архитектурным ансамблем.',
    emoji: '🏛️',
    duration: '1.5 часа',
    price: 'Бесплатно',
    rating: 4.6,
    interests: ['architecture', 'history'],
    internalTags: ['type:architecture', 'interest:architecture', 'interest:history'],
    timeSlot: 'morning',
    source: 'seed',
  },
  {
    name: 'Городской парк',
    category: 'Природа',
    placeType: 'nature',
    description: 'Прогулка по зелёным аллеям и видовым точкам.',
    emoji: '🌿',
    duration: '2 часа',
    price: 'Бесплатно',
    rating: 4.5,
    interests: ['nature'],
    internalTags: ['type:nature', 'interest:nature'],
    timeSlot: 'afternoon',
    source: 'seed',
  },
  {
    name: 'Ресторан местной кухни',
    category: 'Еда',
    placeType: 'food',
    description: 'Знакомство с региональной кухней в проверенном ресторане.',
    emoji: '🍽️',
    duration: '1.5 часа',
    price: '1 000–2 000 ₽',
    rating: 4.7,
    interests: ['food'],
    internalTags: ['type:food', 'interest:food'],
    timeSlot: 'evening',
    source: 'seed',
  },
];
