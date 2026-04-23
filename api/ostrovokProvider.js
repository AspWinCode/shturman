const API_BASE_URL = process.env.OSTROVOK_API_BASE_URL || 'https://api.worldota.net/api/b2b/v3';
const SEARCH_URL_OVERRIDE = process.env.OSTROVOK_API_URL || '';
const AUTH_HEADER = process.env.OSTROVOK_AUTH_HEADER || '';
const TOKEN = process.env.OSTROVOK_TOKEN || '';
const KEY_ID = process.env.OSTROVOK_KEY_ID || '';
const API_KEY = process.env.OSTROVOK_API_KEY || '';
const REQUEST_TIMEOUT_MS = Number(process.env.OSTROVOK_TIMEOUT_MS || 12000);

function toNum(value, fallback = 0) {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

function safeString(value, fallback = '') {
  const s = String(value ?? '').trim();
  return s || fallback;
}

function normalizeUrl(url) {
  return String(url || '').trim().replace(/\/+$/, '');
}

function authHeaderValue() {
  if (AUTH_HEADER) return AUTH_HEADER;
  if (TOKEN) return `Bearer ${TOKEN}`;
  if (KEY_ID && API_KEY) return `Basic ${Buffer.from(`${KEY_ID}:${API_KEY}`).toString('base64')}`;
  return '';
}

function pickHotelsArray(json) {
  if (Array.isArray(json?.data?.hotels)) return json.data.hotels;
  if (Array.isArray(json?.hotels)) return json.hotels;
  if (Array.isArray(json?.result?.hotels)) return json.result.hotels;
  if (Array.isArray(json?.data?.results)) return json.data.results;
  return [];
}

function pickRatesArray(hotel) {
  if (Array.isArray(hotel?.rates)) return hotel.rates;
  if (Array.isArray(hotel?.rooms)) return hotel.rooms;
  if (Array.isArray(hotel?.offers)) return hotel.offers;
  if (Array.isArray(hotel?.room_rates)) return hotel.room_rates;
  return [];
}

function pickOneWayRateValue(rate) {
  return (
    toNum(rate?.payment_options?.payment_types?.[0]?.amount) ||
    toNum(rate?.payment_options?.payment_types?.[0]?.show_amount) ||
    toNum(rate?.amount) ||
    toNum(rate?.price) ||
    toNum(rate?.daily_price) ||
    toNum(rate?.total_price)
  );
}

function pickPhotoUrl(hotel) {
  const images = Array.isArray(hotel?.images) ? hotel.images : [];
  const first = images[0];
  if (typeof first === 'string') return first;
  if (first && typeof first === 'object') {
    return safeString(first.url || first.original || first.image || first.src);
  }
  return safeString(hotel?.main_image || hotel?.photo || '');
}

function pickAmenities(hotel) {
  const raw = hotel?.amenities || hotel?.facilities || hotel?.services || [];
  if (!Array.isArray(raw)) return [];
  return raw
    .map((item) => {
      if (typeof item === 'string') return safeString(item);
      if (item && typeof item === 'object') return safeString(item.name || item.title || item.value);
      return '';
    })
    .filter(Boolean)
    .slice(0, 6);
}

function simplifyHotels(json, nights, adults) {
  const hotels = pickHotelsArray(json);
  const out = [];

  for (const hotel of hotels) {
    const hotelName = safeString(hotel?.name, 'Отель');
    const stars = Math.max(0, Math.min(5, Math.round(toNum(hotel?.stars || hotel?.star_rating))));
    const rating = toNum(hotel?.rating || hotel?.review_score || hotel?.popularity, 0);
    const photoUrl = pickPhotoUrl(hotel);
    const amenities = pickAmenities(hotel);
    const distanceKm = toNum(
      hotel?.distance_km ??
      hotel?.distance?.value ??
      hotel?.distance_to_center ??
      hotel?.location?.distance_km
    );

    const rates = pickRatesArray(hotel);
    if (rates.length === 0) {
      const fallbackPerNight = Math.max(2500, Math.round(toNum(hotel?.min_price || hotel?.price_from || 0)));
      if (fallbackPerNight > 0) {
        out.push({
          id: `ost-h-${safeString(hotel?.id || hotel?.hid || hotel?.hotel_id || hotelName)}`,
          hotelName,
          stars,
          rating: rating > 0 ? Number((rating > 5 ? rating / 2 : rating).toFixed(1)) : 4.2,
          distanceFromCenterKm: distanceKm > 0 ? Number(distanceKm.toFixed(1)) : 1.2,
          roomName: adults > 1 ? 'Double' : 'Single',
          refundable: false,
          meal: '',
          photoUrl,
          amenities,
          pricePerNight: fallbackPerNight,
          totalPrice: fallbackPerNight * nights,
          source: 'ostrovok',
        });
      }
      continue;
    }

    for (const rate of rates) {
      const roomName = safeString(rate?.room_name || rate?.name || rate?.room_type_name, adults > 1 ? 'Double' : 'Single');
      const refundable = Boolean(rate?.payment_options?.payment_types?.[0]?.cancellation_penalties?.free_cancellation_before);
      const meal = safeString(rate?.meal || rate?.board_name || rate?.meal_name || '');
      const oneWay = pickOneWayRateValue(rate);
      if (oneWay <= 0) continue;
      const perNight = Math.max(1000, Math.round(oneWay / Math.max(1, nights)));

      out.push({
        id: `ost-r-${safeString(rate?.rate_id || rate?.id || roomName)}-${safeString(hotel?.id || hotel?.hid || hotelName)}`,
        hotelName,
        stars,
        rating: rating > 0 ? Number((rating > 5 ? rating / 2 : rating).toFixed(1)) : 4.2,
        distanceFromCenterKm: distanceKm > 0 ? Number(distanceKm.toFixed(1)) : 1.2,
        roomName,
        refundable,
        meal,
        photoUrl,
        amenities,
        pricePerNight: perNight,
        totalPrice: perNight * nights,
        source: 'ostrovok',
      });
    }
  }

  return out
    .filter((x) => x.pricePerNight > 0)
    .sort((a, b) => a.totalPrice - b.totalPrice)
    .slice(0, 40);
}

async function fetchWithTimeout(url, init, timeoutMs) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timeoutId);
  }
}

async function postJson(url, payload, headers) {
  const response = await fetchWithTimeout(
    url,
    {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    },
    REQUEST_TIMEOUT_MS
  );
  if (!response.ok) {
    return { ok: false, status: response.status, json: null };
  }
  const json = await response.json();
  return { ok: true, status: response.status, json };
}

function basePayload(input) {
  return {
    checkin: input.checkin,
    checkout: input.checkout,
    residency: 'ru',
    language: 'ru',
    guests: [{ adults: input.adults }],
    currency: 'RUB',
  };
}

function parseRegionId(multicompleteJson) {
  const regions = Array.isArray(multicompleteJson?.data?.regions) ? multicompleteJson.data.regions : [];
  const region = regions[0];
  const regionId = region?.id ?? region?.region_id ?? region?.rid;
  if (regionId) return regionId;

  const hotels = Array.isArray(multicompleteJson?.data?.hotels) ? multicompleteJson.data.hotels : [];
  const hotelRegionId = hotels[0]?.region_id ?? hotels[0]?.region?.id;
  return hotelRegionId || '';
}

async function searchViaConfiguredUrl(input, headers) {
  if (!SEARCH_URL_OVERRIDE) return { ok: false, message: 'no override url', offers: [] };
  const payload = {
    ...basePayload(input),
    region_name: input.city,
    query: input.city,
  };
  const resp = await postJson(SEARCH_URL_OVERRIDE, payload, headers);
  if (!resp.ok) return { ok: false, message: `Ostrovok API HTTP ${resp.status}`, offers: [] };
  return { ok: true, offers: simplifyHotels(resp.json, input.nights, input.adults) };
}

async function searchViaRegionFlow(input, headers) {
  const base = normalizeUrl(API_BASE_URL);
  const suggestUrl = `${base}/search/multicomplete/`;
  const suggestResp = await postJson(
    suggestUrl,
    { query: input.city, language: 'ru' },
    headers
  );
  if (!suggestResp.ok) {
    return { ok: false, message: `Ostrovok multicomplete HTTP ${suggestResp.status}`, offers: [] };
  }

  const regionId = parseRegionId(suggestResp.json);
  if (!regionId) {
    return { ok: false, message: 'Ostrovok region not found for city', offers: [] };
  }

  const searchUrl = `${base}/search/serp/region/`;
  const searchResp = await postJson(
    searchUrl,
    { ...basePayload(input), region_id: regionId },
    headers
  );
  if (!searchResp.ok) {
    return { ok: false, message: `Ostrovok region search HTTP ${searchResp.status}`, offers: [] };
  }

  return { ok: true, offers: simplifyHotels(searchResp.json, input.nights, input.adults) };
}

async function searchOstrovokHotels(input) {
  const city = safeString(input?.city);
  const checkin = safeString(input?.checkin);
  const checkout = safeString(input?.checkout);
  const adults = Math.max(1, Math.min(8, toNum(input?.adults, 1)));

  if (!city || !checkin || !checkout) {
    return { ok: false, message: 'city, checkin and checkout are required', offers: [] };
  }

  const auth = authHeaderValue();
  if (!auth) {
    return { ok: false, message: 'Ostrovok API credentials are not configured', offers: [] };
  }

  const headers = {
    'Content-Type': 'application/json',
    Authorization: auth,
  };

  const start = new Date(checkin);
  const end = new Date(checkout);
  const diff = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  const nights = Math.max(1, Number.isFinite(diff) ? diff : 1);

  try {
    const commonInput = { city, checkin, checkout, adults, nights };

    const byUrl = await searchViaConfiguredUrl(commonInput, headers);
    if (byUrl.ok && byUrl.offers.length > 0) {
      return { ok: true, offers: byUrl.offers };
    }

    const byRegion = await searchViaRegionFlow(commonInput, headers);
    if (byRegion.ok && byRegion.offers.length > 0) {
      return { ok: true, offers: byRegion.offers };
    }

    return {
      ok: false,
      message: byRegion.message || byUrl.message || 'Ostrovok API returned no hotels for this request',
      offers: [],
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Network error';
    return { ok: false, message, offers: [] };
  }
}

module.exports = {
  searchOstrovokHotels,
};
