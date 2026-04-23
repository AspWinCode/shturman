import { Share } from 'react-native';
import { Trip } from '@/constants/data';

export function formatTripForSharing(trip: Trip): string {
  const lines: string[] = [
    `🗺️ Маршрут «${trip.to}»`,
    `📅 ${trip.startDate} — ${trip.endDate}`,
    `💰 Бюджет: ${trip.budget.toLocaleString('ru-RU')} ₽`,
    '',
  ];

  trip.days.forEach((day, idx) => {
    lines.push(`📍 День ${idx + 1}:`);
    day.places.forEach((place) => {
      lines.push(`  ${place.time ?? ''} ${place.name}`.trimEnd());
    });
    lines.push('');
  });

  lines.push('— Составлено в приложении Штурман 🧭');
  return lines.join('\n');
}

export async function shareTrip(trip: Trip): Promise<void> {
  const message = formatTripForSharing(trip);
  await Share.share(
    { message, title: `Маршрут в ${trip.to}` },
    { dialogTitle: `Поделиться маршрутом в ${trip.to}` }
  );
}
