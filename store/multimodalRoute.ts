import { MultiModalLeg, MultiModalRoute, Trip } from '@/constants/data';

const MODE_COLOR: Record<MultiModalLeg['mode'], string> = {
  flight: '#2563EB',
  train: '#16A34A',
  bus: '#F59E0B',
  metro: '#7C3AED',
  taxi: '#EF4444',
  walk: '#0EA5E9',
  ferry: '#0F766E',
};

const MODE_CO2_KG_PER_KM: Record<MultiModalLeg['mode'], number> = {
  flight: 0.255,
  train: 0.041,
  bus: 0.105,
  metro: 0.035,
  taxi: 0.192,
  walk: 0,
  ferry: 0.115,
};

const MODE_SPEED_KMH: Record<MultiModalLeg['mode'], number> = {
  flight: 760,
  train: 95,
  bus: 60,
  metro: 40,
  taxi: 35,
  walk: 5,
  ferry: 30,
};

function parseDurationToMinutes(duration: string): number {
  const text = duration.toLowerCase();
  const daysMatch = text.match(/(\d+)\s*д/);
  const hoursMatch = text.match(/(\d+)\s*ч/);
  const minutesMatch = text.match(/(\d+)\s*мин/);

  const days = daysMatch ? Number(daysMatch[1]) : 0;
  const hours = hoursMatch ? Number(hoursMatch[1]) : 0;
  const minutes = minutesMatch ? Number(minutesMatch[1]) : 0;
  const total = days * 24 * 60 + hours * 60 + minutes;

  return total > 0 ? total : 120;
}

function estimateDistanceKm(mode: MultiModalLeg['mode'], durationMinutes: number): number {
  const speed = MODE_SPEED_KMH[mode];
  return Number(((durationMinutes / 60) * speed).toFixed(1));
}

function formatDurationMinutes(minutes: number): string {
  const safe = Math.max(0, Math.round(minutes));
  const h = Math.floor(safe / 60);
  const m = safe % 60;
  if (h === 0) return `${m} мин`;
  return m > 0 ? `${h} ч ${m} мин` : `${h} ч`;
}

function buildFromLegacyTransport(trip: Trip): MultiModalRoute | null {
  if (!trip.transport.length) return null;

  const segments: MultiModalLeg[] = trip.transport.map((item, index) => {
    const mode = item.type;
    const durationMinutes = parseDurationToMinutes(item.duration);
    const distanceKm = estimateDistanceKm(mode, durationMinutes);
    const co2Kg = Number((distanceKm * MODE_CO2_KG_PER_KM[mode]).toFixed(1));

    return {
      id: `legacy-mm-${trip.id}-${index + 1}`,
      mode,
      from: item.from,
      to: item.to,
      departure: item.departure,
      arrival: item.arrival,
      durationMinutes,
      distanceKm,
      price: Number(item.price) || 0,
      carrier: item.carrier,
      line: item.class,
      color: MODE_COLOR[mode],
      co2Kg,
    };
  });

  const totalDistanceKm = Number(segments.reduce((sum, s) => sum + s.distanceKm, 0).toFixed(1));
  const totalDurationMinutes = segments.reduce((sum, s) => sum + s.durationMinutes, 0);
  const totalPrice = segments.reduce((sum, s) => sum + s.price, 0);
  const totalCo2Kg = Number(segments.reduce((sum, s) => sum + s.co2Kg, 0).toFixed(1));
  const directFlightCo2Kg = Number((totalDistanceKm * MODE_CO2_KG_PER_KM.flight).toFixed(1));

  return {
    id: `legacy-mm-${trip.id}`,
    summary: `${trip.from} → ${trip.to} · ${formatDurationMinutes(totalDurationMinutes)}`,
    totalDurationMinutes,
    totalDistanceKm,
    totalPrice,
    totalCo2Kg,
    directFlightCo2Kg,
    transfers: Math.max(0, segments.length - 1),
    segments,
  };
}

export function getMultimodalRoute(trip: Trip): MultiModalRoute | null {
  return trip.multimodalRoute ?? buildFromLegacyTransport(trip);
}

