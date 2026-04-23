const crypto = require('crypto');

const CURRENCY = 'RUB';
const bookings = new Map();

function normalizeCity(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[.,/#!$%^&*;:{}=\\_`~()]/g, ' ')
    .replace(/\s+/g, ' ')
    .replace('санкт петербург', 'санкт-петербург')
    .replace('питер', 'санкт-петербург')
    .replace('спб', 'санкт-петербург')
    .replace('байкал', 'иркутск');
}

function parseDate(dateString) {
  const d = new Date(dateString);
  if (Number.isNaN(d.getTime())) {
    const fallback = new Date();
    fallback.setDate(fallback.getDate() + 7);
    return fallback;
  }
  return d;
}

function isoAtTime(dateString, hhmm) {
  const [h, m] = String(hhmm).split(':').map(Number);
  const d = parseDate(dateString);
  d.setHours(Number.isFinite(h) ? h : 9, Number.isFinite(m) ? m : 0, 0, 0);
  return d.toISOString();
}

function addMinutes(iso, minutes) {
  return new Date(new Date(iso).getTime() + minutes * 60000).toISOString();
}

function routeDistance(from, to) {
  const key = `${normalizeCity(from)}>${normalizeCity(to)}`;
  const reverse = `${normalizeCity(to)}>${normalizeCity(from)}`;
  const dist = {
    'москва>санкт-петербург': 650,
    'москва>казань': 820,
    'москва>нижний новгород': 420,
    'москва>сочи': 1600,
    'москва>иркутск': 4200,
    'москва>владивосток': 9288,
    'санкт-петербург>казань': 1500,
  };
  return dist[key] || dist[reverse] || 900;
}

function classMultiplier(carriageClass) {
  if (carriageClass === 'СВ') return 2.2;
  if (carriageClass === 'Купе') return 1.45;
  if (carriageClass === 'Сидячий') return 0.85;
  return 1;
}

function seededNumber(seed, min, max) {
  const hash = crypto.createHash('sha256').update(seed).digest('hex');
  const raw = parseInt(hash.slice(0, 8), 16);
  const range = max - min + 1;
  return min + (raw % range);
}

function trainTemplates(from, to) {
  const distance = routeDistance(from, to);
  const fast = distance <= 800;
  const mid = distance > 800 && distance <= 2000;
  const slow = distance > 2000;

  const base = [
    {
      number: fast ? '752А' : mid ? '024М' : '001Э',
      name: fast ? 'Сапсан' : 'Фирменный',
      dep: '06:40',
      speed: fast ? 180 : mid ? 90 : 65,
    },
    {
      number: fast ? '758А' : mid ? '056М' : '007Н',
      name: fast ? 'Сапсан' : 'Скорый',
      dep: '13:20',
      speed: fast ? 170 : mid ? 82 : 60,
    },
    {
      number: fast ? '770А' : mid ? '104М' : '099Э',
      name: fast ? 'Ласточка' : 'Ночной',
      dep: '22:10',
      speed: fast ? 150 : mid ? 78 : 58,
    },
  ];

  if (slow) {
    return base.map((t) => ({ ...t, classes: ['Плацкарт', 'Купе', 'СВ'] }));
  }
  return base.map((t) => ({ ...t, classes: ['Сидячий', 'Плацкарт', 'Купе'] }));
}

function buildOffers({ from, to, date, travelers }) {
  const safeTravelers = Math.max(1, Math.min(8, Number(travelers) || 1));
  const distance = routeDistance(from, to);
  const templates = trainTemplates(from, to);
  const day = parseDate(date).getDay();
  const demandMultiplier = day === 5 || day === 0 ? 1.22 : day === 1 ? 0.93 : 1;

  const offers = [];
  for (const train of templates) {
    const baseDurationMinutes = Math.max(95, Math.round((distance / train.speed) * 60));
    const departureAt = isoAtTime(date, train.dep);
    const arrivalAt = addMinutes(departureAt, baseDurationMinutes);

    for (const carriageClass of train.classes) {
      const pricePerPerson = Math.round(
        (distance * 2.1 + 550) * classMultiplier(carriageClass) * demandMultiplier
      );
      const seed = `${from}|${to}|${date}|${train.number}|${carriageClass}`;
      const seatsLeft = seededNumber(seed, 4, carriageClass === 'СВ' ? 18 : 62);
      const id = `trn_${crypto.createHash('sha1').update(seed).digest('hex').slice(0, 24)}`;

      offers.push({
        id,
        provider: 'rzd_mock',
        carrier: 'РЖД',
        trainNumber: train.number,
        trainName: train.name,
        from,
        to,
        departureAt,
        arrivalAt,
        durationMinutes: baseDurationMinutes,
        carriageClass,
        seatsLeft,
        refundable: carriageClass !== 'Сидячий',
        pricePerPerson,
        totalPrice: pricePerPerson * safeTravelers,
        travelers: safeTravelers,
        currency: CURRENCY,
      });
    }
  }

  return offers.sort((a, b) => a.totalPrice - b.totalPrice);
}

function searchTrainTickets(payload) {
  const from = String(payload?.from || '').trim();
  const to = String(payload?.to || '').trim();
  const date = String(payload?.date || '').trim();
  const travelers = Math.max(1, Math.min(8, Number(payload?.travelers) || 1));

  if (!from || !to || !date) {
    return { ok: false, message: 'from, to and date are required' };
  }
  if (normalizeCity(from) === normalizeCity(to)) {
    return { ok: false, message: 'from and to must be different' };
  }

  const offers = buildOffers({ from, to, date, travelers });
  return { ok: true, provider: 'rzd_mock', offers };
}

function createTrainBooking(payload) {
  const offer = payload?.offer;
  if (!offer || !offer.id) {
    return { ok: false, message: 'offer is required' };
  }

  const travelers = Math.max(1, Math.min(8, Number(payload?.travelers || offer.travelers) || 1));
  const passengers = Array.isArray(payload?.passengers) ? payload.passengers : [];
  const bookingId = `trn_${crypto.randomUUID().replace(/-/g, '').slice(0, 16)}`;
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString();

  const booking = {
    id: bookingId,
    status: 'reserved',
    createdAt: new Date().toISOString(),
    expiresAt,
    provider: 'rzd_mock',
    travelers,
    passengers: passengers.slice(0, travelers),
    offer,
    totalPrice: Number(offer.totalPrice) || Number(offer.pricePerPerson) * travelers,
    currency: offer.currency || CURRENCY,
    payment: null,
    ticket: null,
  };

  bookings.set(bookingId, booking);
  return { ok: true, booking };
}

function payTrainBooking(payload) {
  const bookingId = String(payload?.bookingId || '');
  if (!bookingId) {
    return { ok: false, message: 'bookingId is required' };
  }

  const booking = bookings.get(bookingId);
  if (!booking) {
    return { ok: false, message: 'booking not found' };
  }
  if (booking.status === 'paid') {
    return { ok: true, booking };
  }
  if (new Date(booking.expiresAt).getTime() < Date.now()) {
    booking.status = 'expired';
    bookings.set(bookingId, booking);
    return { ok: false, message: 'booking expired' };
  }

  const paymentId = `pay_${crypto.randomUUID().replace(/-/g, '').slice(0, 12)}`;
  const eticket = `ETK-${seededNumber(paymentId, 100000, 999999)}`;
  booking.status = 'paid';
  booking.payment = {
    id: paymentId,
    method: 'card',
    amount: booking.totalPrice,
    paidAt: new Date().toISOString(),
  };
  booking.ticket = {
    number: eticket,
    issuedAt: new Date().toISOString(),
    qrPayload: `RZD|${eticket}|${booking.offer.trainNumber}|${booking.offer.departureAt}`,
  };

  bookings.set(bookingId, booking);
  return { ok: true, booking };
}

function getTrainBooking(bookingId) {
  const id = String(bookingId || '');
  if (!id) return { ok: false, message: 'bookingId is required' };
  const booking = bookings.get(id);
  if (!booking) return { ok: false, message: 'booking not found' };
  return { ok: true, booking };
}

module.exports = {
  searchTrainTickets,
  createTrainBooking,
  payTrainBooking,
  getTrainBooking,
};

