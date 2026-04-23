const SYSTEM_PROMPT = `Ты — профессиональный travel-планировщик для путешествий по России.
Тебе на вход передаётся форма поездки. Ты возвращаешь JSON объекта Trip.
Отвечай СТРОГО JSON-объектом без пояснений и markdown.
Используй только реально существующие места с точными адресами.
Пиши на русском языке.`;

function getDaysCount(form) {
  const start = new Date(form.startDate);
  const end = new Date(form.endDate);
  const diffMs = end.getTime() - start.getTime();
  return Math.max(1, Math.min(14, Math.ceil(diffMs / 86400000) + 1));
}

function buildUserPrompt(form) {
  const daysCount = getDaysCount(form);
  return `Создай подробный маршрут для поездки:
- Откуда: ${form.from}
- Куда: ${form.to}
- Даты: ${form.startDate} — ${form.endDate} (${daysCount} дней)
- Бюджет: ${form.budget} ₽ на ${form.travelers} чел.
- Стиль: ${form.travelStyle}
- Интересы: ${(form.interests || []).join(', ')}
- Доступность ♿: ${form.needsAccessibility ? 'требуется' : 'не требуется'}

Верни JSON следующей структуры (заполни полностью):
{
  "days": [
    {
      "day": 1,
      "date": "дата в формате 'DD месяц'",
      "places": [
        {
          "id": "уникальный-id",
          "name": "Название места",
          "category": "Музей|Парк|Ресторан|Достопримечательность|...",
          "description": "2-3 предложения",
          "duration": "2 часа",
          "time": "10:00",
          "rating": 4.7,
          "address": "Точный адрес",
          "emoji": "🏛️",
          "price": "500 ₽",
          "lat": 55.7558,
          "lng": 37.6173
        }
      ]
    }
  ],
  "coverImage": "https://images.unsplash.com/photo-... (реальная ссылка на город)",
  "totalActivities": 15000,
  "totalFood": 12000
}

Требования:
- ${daysCount} дней в массиве days
- 3-5 мест каждый день
- Первое место — утреннее (9:00-11:00), последнее — вечернее
- Координаты lat/lng должны быть точными для каждого места
${form.needsAccessibility ? '- Все места должны быть wheelchair-accessible' : ''}`;
}

module.exports = { SYSTEM_PROMPT, buildUserPrompt };
