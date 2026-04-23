# RELEASE DAY 4 UI POLISH

Дата: 2026-04-23

## Сделано

1. Theme-adaptation Wallet
- Обновлены экраны:
  - `app/(wallet)/index.tsx`
  - `app/(wallet)/trip/[id].tsx`
  - `components/DocumentCard.tsx`
- Что изменено:
  - динамические цвета через `useTheme()`;
  - корректный `StatusBar` для светлой/тёмной темы;
  - цветовые контрасты для карточек/кнопок под обе темы.

2. Исправление текстов и кодировки в hotel-select
- Файл: `app/trip/hotel-select.tsx`
- Восстановлены повреждённые строки интерфейса (русский текст, символы `₽`, `★`, разделители).
- Проверены CTA/фильтры/empty-state/подписи карточек.

3. Graceful fallback с понятным CTA
- Унифицированы fallback-тексты:
  - `app/trip/transport-select.tsx`
  - `app/trip/hotel-select.tsx`
  - `app/trip/result.tsx`
  - `app/trip/[id].tsx`
- Формулировка теперь явно объясняет, что live временно недоступен и предлагает действие (партнёрские ссылки / включение API).

## Верификация

- `npx tsc --noEmit` — passed
- `npm run smoke:content` — passed
- `npm run smoke:api` — passed

## Итог

День 4 закрыт: устранены остаточные проблемы с темой Wallet, исправлены «квакозябры» на hotel-select и приведён к единому UX fallback для live-данных.
