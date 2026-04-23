const RASP_BASE = 'https://api.rasp.yandex-net.ru/v3.0';
const API_KEY = process.env.YANDEX_RASP_API_KEY || '';

const CITY_CODE = {
  'москва': 'c213',
  'санкт-петербург': 'c2',
  'казань': 'c43',
  'сочи': 'c239',
  'калининград': 'c22',
  'владивосток': 'c75',
  'иркутск': 'c63',
  'новосибирск': 'c65',
  'екатеринбург': 'c54',
  'нижний новгород': 'c47',
  'самара': 'c51',
  'уфа': 'c172',
  'ростов на дону': 'c39',
  'красноярск': 'c62',
  'тюмень': 'c55',
};

function normalizeCity(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[.,/#!$%^&*;:{}=\\_`~()]/g, ' ')
    .replace(/\s+/g, ' ')
    .replace('санкт петербург', 'санкт-петербург')
    .replace('питер', 'санкт-петербург')
    .replace('спб', 'санкт-петербург')
    .replace('байкал', 'иркутск')
    .replace('ростов-на-дону', 'ростов на дону');
}

function mapTransportType(raspType) {
  if (raspType === 'plane') return 'flight';
  if (raspType === 'train') return 'train';
  if (raspType === 'bus') return 'bus';
  return null;
}

function estimatePrice(type, durationMinutes) {
  const mins = Math.max(40, Number(durationMinutes) || 120);
  if (type === 'flight') return Math.round(2800 + mins * 35);
  if (type === 'train') return Math.round(1400 + mins * 12);
  return Math.round(900 + mins * 8);
}

function parseDurationMinutes(raw) {
  const value = String(raw || '');
  const h = value.match(/(\d+)\s*ч/);
  const m = value.match(/(\d+)\s*мин/);
  const hours = h ? Number(h[1]) : 0;
  const minutes = m ? Number(m[1]) : 0;
  const total = hours * 60 + minutes;
  return total > 0 ? total : 120;
}

function extractOneWayPrice(segment) {
  const candidates = [
    segment?.tickets_info?.places?.[0]?.price?.whole,
    segment?.tickets_info?.places?.[0]?.price?.value,
    segment?.tickets_info?.et_marker_price?.whole,
    segment?.tickets_info?.et_marker_price?.value,
    segment?.price?.whole,
    segment?.price?.value,
  ];
  for (const value of candidates) {
    const num = Number(value);
    if (Number.isFinite(num) && num > 0) return num;
  }
  return 0;
}

function mapTrainClass(classCode) {
  const value = String(classCode || '').toLowerCase();
  if (value.includes('platzkarte') || value.includes('third')) return 'Плацкарт';
  if (value.includes('compartment') || value.includes('second')) return 'Купе';
  if (value.includes('first') || value.includes('lux')) return 'СВ';
  if (value.includes('sitting')) return 'Сидячий';
  return classCode || 'Тариф';
}

function extractTariffs(segment) {
  const places = Array.isArray(segment?.tickets_info?.places) ? segment.tickets_info.places : [];
  return places
    .map((item) => {
      const price = Number(item?.price?.whole ?? item?.price?.value ?? 0);
      if (!Number.isFinite(price) || price <= 0) return null;
      const seats = Number(item?.seats) || 0;
      return {
        className: mapTrainClass(item?.type || item?.name || item?.title || 'Тариф'),
        price,
        seats,
      };
    })
    .filter(Boolean)
    .slice(0, 3);
}

async function fetchYandexRaspOffers({ from, to, date, travelers }) {
  const fromCode = CITY_CODE[normalizeCity(from)];
  const toCode = CITY_CODE[normalizeCity(to)];

  if (!API_KEY) {
    return { ok: false, message: 'YANDEX_RASP_API_KEY is not configured' };
  }
  if (!fromCode || !toCode) {
    return { ok: false, message: 'Unsupported city for Yandex Rasp mapping' };
  }

  const params = new URLSearchParams({
    apikey: API_KEY,
    from: fromCode,
    to: toCode,
    date: String(date || ''),
    lang: 'ru_RU',
    transport_types: 'plane,train,bus',
    limit: '25',
  });

  const res = await fetch(`${RASP_BASE}/search/?${params.toString()}`);
  if (!res.ok) {
    return { ok: false, message: `Yandex Rasp HTTP ${res.status}` };
  }

  const json = await res.json();
  const segments = Array.isArray(json?.segments) ? json.segments : [];
  const safeTravelers = Math.max(1, Math.min(8, Number(travelers) || 1));

  const offers = segments
    .map((segment, index) => {
      const type = mapTransportType(segment?.thread?.transport_type);
      if (!type) return null;

      const durationMinutes = Number(segment?.duration) || parseDurationMinutes(segment?.duration_text);
      const oneWayLive = extractOneWayPrice(segment);
      const oneWay = oneWayLive > 0 ? oneWayLive : estimatePrice(type, durationMinutes);
      const pricePerPersonRoundTrip = Math.round(oneWay * 2);
      const priceSource = oneWayLive > 0 ? 'live' : 'estimated';

      return {
        id: `yr-${segment?.thread?.uid || segment?.thread?.number || index}`,
        source: 'yandex_rasp',
        type,
        carrier: String(segment?.thread?.carrier?.title || segment?.thread?.title || 'Перевозчик'),
        threadNumber: String(segment?.thread?.number || ''),
        threadTitle: String(segment?.thread?.title || ''),
        fromStation: String(segment?.from?.title || from),
        toStation: String(segment?.to?.title || to),
        departureAt: segment?.departure || null,
        arrivalAt: segment?.arrival || null,
        durationMinutes,
        pricePerPersonRoundTrip,
        totalPrice: pricePerPersonRoundTrip * safeTravelers,
        priceSource,
        tariffs: extractTariffs(segment),
      };
    })
    .filter(Boolean)
    .slice(0, 12);

  return { ok: true, offers };
}

module.exports = {
  fetchYandexRaspOffers,
};
