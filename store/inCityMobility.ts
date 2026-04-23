import { DayPlan } from '@/constants/data';

export type InCityMode = 'metro' | 'bus' | 'taxi' | 'walk' | 'ferry';

export interface InCityLeg {
  mode: InCityMode;
  durationMinutes: number;
  price: number;
}

export interface InCityTransitPlan {
  from: string;
  to: string;
  totalDurationMinutes: number;
  totalPrice: number;
  legs: InCityLeg[];
}

function hashCode(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function clamp(min: number, value: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function buildLegsByPattern(
  pattern: 'metro' | 'bus' | 'taxi' | 'ferry',
  seed: number
): InCityLeg[] {
  const walk = clamp(6, 6 + (seed % 7), 14);
  if (pattern === 'metro') {
    return [
      { mode: 'metro', durationMinutes: clamp(10, 12 + (seed % 18), 34), price: 70 + (seed % 20) },
      { mode: 'walk', durationMinutes: walk, price: 0 },
    ];
  }
  if (pattern === 'bus') {
    return [
      { mode: 'bus', durationMinutes: clamp(12, 14 + (seed % 20), 38), price: 45 + (seed % 18) },
      { mode: 'walk', durationMinutes: walk, price: 0 },
    ];
  }
  if (pattern === 'ferry') {
    return [
      { mode: 'ferry', durationMinutes: clamp(14, 18 + (seed % 18), 40), price: 120 + (seed % 60) },
      { mode: 'walk', durationMinutes: walk, price: 0 },
    ];
  }
  return [
    { mode: 'taxi', durationMinutes: clamp(10, 11 + (seed % 16), 28), price: 220 + (seed % 260) },
    { mode: 'walk', durationMinutes: walk, price: 0 },
  ];
}

function pickPattern(city: string, placeName: string, index: number): 'metro' | 'bus' | 'taxi' | 'ferry' {
  const cityLower = city.toLowerCase();
  const placeLower = placeName.toLowerCase();

  if (cityLower.includes('владивост') && (placeLower.includes('маяк') || placeLower.includes('остров'))) {
    return 'ferry';
  }
  if (index % 3 === 0) return 'metro';
  if (index % 3 === 1) return 'bus';
  return 'taxi';
}

export function buildInCityTransitByPlace(day: DayPlan, city: string): Record<string, InCityTransitPlan> {
  const result: Record<string, InCityTransitPlan> = {};

  day.places.forEach((place, index) => {
    const from = index === 0 ? 'Отель' : day.places[index - 1].name;
    const seed = hashCode(`${city}|${day.day}|${from}|${place.name}|${place.time}`);
    const pattern = pickPattern(city, place.name, index);
    const legs = buildLegsByPattern(pattern, seed);
    const totalDurationMinutes = legs.reduce((sum, leg) => sum + leg.durationMinutes, 0);
    const totalPrice = legs.reduce((sum, leg) => sum + leg.price, 0);

    result[place.id] = {
      from,
      to: place.name,
      totalDurationMinutes,
      totalPrice,
      legs,
    };
  });

  return result;
}

