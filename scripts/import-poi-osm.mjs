#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';

const ROOT = process.cwd();
const OUTPUT = path.join(ROOT, 'constants', 'cityPlaces.generated.ts');

const DEFAULT_CITIES = [
  'Москва',
  'Санкт-Петербург',
  'Казань',
  'Сочи',
  'Калининград',
  'Владивосток',
  'Иркутск',
  'Новосибирск',
  'Екатеринбург',
  'Нижний Новгород',
];

function parseArgs(argv) {
  const out = { cities: DEFAULT_CITIES, limit: 120 };
  for (let i = 2; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--city' && argv[i + 1]) {
      out.cities = argv[i + 1].split(',').map((s) => s.trim()).filter(Boolean);
      i += 1;
    } else if (arg === '--limit' && argv[i + 1]) {
      const value = Number(argv[i + 1]);
      if (Number.isFinite(value) && value > 0) out.limit = Math.round(value);
      i += 1;
    }
  }
  return out;
}

function normalizeCityKey(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/ё/g, 'е')
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/ /g, '-');
}

function jsonFetch(url, options = {}) {
  return fetch(url, {
    ...options,
    headers: {
      'User-Agent': 'shturman-poi-importer/1.0 (https://github.com)',
      ...(options.headers || {}),
    },
  }).then(async (res) => {
    if (!res.ok) {
      const body = await res.text().catch(() => '');
      throw new Error(`HTTP ${res.status} for ${url}: ${body.slice(0, 200)}`);
    }
    return res.json();
  });
}

function overpassAreaId(osmType, osmId) {
  const id = Number(osmId);
  if (!Number.isFinite(id)) return null;
  if (osmType === 'relation') return 3600000000 + id;
  if (osmType === 'way') return 2400000000 + id;
  return null;
}

async function resolveCityArea(cityName) {
  const url = new URL('https://nominatim.openstreetmap.org/search');
  url.searchParams.set('format', 'jsonv2');
  url.searchParams.set('limit', '1');
  url.searchParams.set('accept-language', 'ru');
  url.searchParams.set('q', `${cityName}, Россия`);

  const results = await jsonFetch(url.toString());
  if (!Array.isArray(results) || results.length === 0) {
    throw new Error(`Город не найден в Nominatim: ${cityName}`);
  }

  const city = results[0];
  const areaId = overpassAreaId(city.osm_type, city.osm_id);
  if (!areaId) {
    throw new Error(`Не удалось построить area id для ${cityName}`);
  }

  return {
    cityName,
    areaId,
    lat: Number(city.lat),
    lon: Number(city.lon),
  };
}

function buildOverpassQuery(areaId) {
  return `[out:json][timeout:120];
area(${areaId})->.searchArea;
(
  node["tourism"~"museum|attraction|gallery|zoo|theme_park"](area.searchArea);
  way["tourism"~"museum|attraction|gallery|zoo|theme_park"](area.searchArea);
  relation["tourism"~"museum|attraction|gallery|zoo|theme_park"](area.searchArea);

  node["amenity"~"restaurant|cafe|bar|pub|fast_food"](area.searchArea);
  way["amenity"~"restaurant|cafe|bar|pub|fast_food"](area.searchArea);
  relation["amenity"~"restaurant|cafe|bar|pub|fast_food"](area.searchArea);

  node["leisure"~"park|garden|nature_reserve|sports_centre|water_park"](area.searchArea);
  way["leisure"~"park|garden|nature_reserve|sports_centre|water_park"](area.searchArea);
  relation["leisure"~"park|garden|nature_reserve|sports_centre|water_park"](area.searchArea);

  node["historic"](area.searchArea);
  way["historic"](area.searchArea);
  relation["historic"](area.searchArea);

  node["natural"~"peak|water|spring|cliff|beach"](area.searchArea);
  way["natural"~"peak|water|spring|cliff|beach"](area.searchArea);
  relation["natural"~"peak|water|spring|cliff|beach"](area.searchArea);
);
out center tags;`;
}

function classify(tags = {}) {
  const tourism = tags.tourism || '';
  const amenity = tags.amenity || '';
  const leisure = tags.leisure || '';
  const historic = tags.historic || '';
  const natural = tags.natural || '';

  if (tourism === 'museum' || tourism === 'gallery') {
    return { placeType: 'museum', category: 'Музей', interests: ['museums', 'art', 'history'], emoji: '🏛️', timeSlot: 'morning' };
  }
  if (historic) {
    return { placeType: 'history', category: 'История', interests: ['history', 'architecture'], emoji: '🏰', timeSlot: 'morning' };
  }
  if (tourism === 'attraction') {
    return { placeType: 'architecture', category: 'Достопримечательность', interests: ['architecture', 'history'], emoji: '📍', timeSlot: 'afternoon' };
  }
  if (amenity && ['restaurant', 'cafe', 'bar', 'pub', 'fast_food'].includes(amenity)) {
    const night = amenity === 'bar' || amenity === 'pub';
    return { placeType: night ? 'nightlife' : 'food', category: night ? 'Ночная жизнь' : 'Еда', interests: night ? ['nightlife', 'food'] : ['food'], emoji: night ? '🍸' : '🍽️', timeSlot: night ? 'evening' : 'afternoon' };
  }
  if (leisure && ['park', 'garden', 'nature_reserve'].includes(leisure)) {
    return { placeType: 'nature', category: 'Природа', interests: ['nature'], emoji: '🌿', timeSlot: 'afternoon' };
  }
  if (leisure && ['sports_centre', 'water_park'].includes(leisure)) {
    return { placeType: 'sport', category: 'Активности', interests: ['sport', 'wellness'], emoji: '🏃', timeSlot: 'afternoon' };
  }
  if (natural) {
    const beach = natural === 'beach';
    return { placeType: beach ? 'beach' : 'nature', category: beach ? 'Пляж' : 'Природа', interests: beach ? ['beach', 'nature'] : ['nature'], emoji: beach ? '🏖️' : '🌄', timeSlot: 'afternoon' };
  }
  return { placeType: 'other', category: 'Достопримечательность', interests: ['history'], emoji: '📍', timeSlot: 'afternoon' };
}

function cleanName(name) {
  return String(name || '').replace(/\s+/g, ' ').trim();
}

function buildAddress(tags = {}) {
  const parts = [tags['addr:city'], tags['addr:street'], tags['addr:housenumber']].filter(Boolean);
  if (parts.length > 0) return parts.join(', ');
  return tags.address || tags['addr:full'] || '';
}

function estimateDuration(placeType) {
  switch (placeType) {
    case 'museum': return '2-3 часа';
    case 'history': return '1.5-2 часа';
    case 'architecture': return '1-2 часа';
    case 'nature': return '2 часа';
    case 'food': return '1.5 часа';
    case 'nightlife': return '2-3 часа';
    case 'sport': return '2 часа';
    case 'beach': return '3-4 часа';
    default: return '1.5 часа';
  }
}

function estimatePrice(placeType) {
  switch (placeType) {
    case 'museum': return '500 ₽';
    case 'food': return '1 000–2 000 ₽';
    case 'nightlife': return '1 500–3 000 ₽';
    case 'sport': return '800 ₽';
    default: return 'Бесплатно';
  }
}

function toPlace(cityName, element) {
  const tags = element.tags || {};
  const name = cleanName(tags.name || tags['name:ru']);
  if (!name || name.length < 2) return null;

  const lat = element.lat ?? element.center?.lat;
  const lng = element.lon ?? element.center?.lon;
  if (typeof lat !== 'number' || typeof lng !== 'number') return null;

  const meta = classify(tags);
  const internalTags = [
    `type:${meta.placeType}`,
    ...meta.interests.map((i) => `interest:${i}`),
    `source:osm`,
  ];

  return {
    name,
    category: meta.category,
    placeType: meta.placeType,
    description: `${name} — объект категории «${meta.category.toLowerCase()}» в городе ${cityName}.`,
    emoji: meta.emoji,
    duration: estimateDuration(meta.placeType),
    price: estimatePrice(meta.placeType),
    rating: 4.5,
    interests: meta.interests,
    internalTags,
    timeSlot: meta.timeSlot,
    address: buildAddress(tags),
    lat: Number(lat.toFixed(6)),
    lng: Number(lng.toFixed(6)),
    source: 'osm',
    sourceId: `${element.type}/${element.id}`,
  };
}

function dedupePlaces(places) {
  const seen = new Set();
  const out = [];
  for (const place of places) {
    const key = `${place.name.toLowerCase()}|${place.placeType}|${place.lat}|${place.lng}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(place);
  }
  return out;
}

async function loadOverpassPlaces(cityName, areaId, limit) {
  const query = buildOverpassQuery(areaId);
  const response = await jsonFetch('https://overpass-api.de/api/interpreter', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
    body: `data=${encodeURIComponent(query)}`,
  });

  const elements = Array.isArray(response.elements) ? response.elements : [];
  const places = elements
    .map((el) => toPlace(cityName, el))
    .filter(Boolean);

  return dedupePlaces(places).slice(0, limit);
}

function renderTs(dataByCity) {
  const body = JSON.stringify(dataByCity, null, 2)
    .replace(/"(\w+)":/g, '$1:')
    .replace(/\n/g, '\n');

  return `import { TimeSlot } from './cityPlacesOsm';

export interface GeneratedPlaceTemplate {
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
  source?: 'osm';
  sourceId?: string;
  placeType?: string;
  internalTags?: string[];
}

export const GENERATED_CITY_PLACES: Record<string, GeneratedPlaceTemplate[]> = ${body};
`;
}

async function main() {
  const { cities, limit } = parseArgs(process.argv);
  console.log(`Импорт OSM POI: ${cities.join(', ')} (limit=${limit})`);

  const result = {};
  let successCount = 0;

  for (const city of cities) {
    try {
      const area = await resolveCityArea(city);
      const places = await loadOverpassPlaces(city, area.areaId, limit);
      result[normalizeCityKey(city)] = places;
      successCount += 1;
      console.log(`✓ ${city}: ${places.length} объектов`);
    } catch (error) {
      console.warn(`⚠ ${city}: ${error.message}`);
    }
  }

  if (successCount === 0) {
    throw new Error('Не удалось загрузить данные ни для одного города. Проверьте интернет и доступ к Overpass/Nominatim.');
  }

  const tsContent = renderTs(result);
  await fs.writeFile(OUTPUT, tsContent, 'utf8');
  console.log(`Готово: ${OUTPUT}`);
}

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
