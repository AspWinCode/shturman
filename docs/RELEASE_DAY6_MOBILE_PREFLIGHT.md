# RELEASE DAY 6 MOBILE PREFLIGHT

Дата: 2026-04-23

## Цель дня

Подготовить релизный preflight для настоящих mobile-сборок (Android/iOS), чтобы перед `eas build` автоматически валидировать критичные настройки.

## Что реализовано

1. Автоматическая preflight-проверка mobile-конфига
- Файл: `scripts/preflight-mobile.mjs`
- Проверяет:
  - `app.json` (name/slug/scheme/version, bundle/package, build/version code),
  - `eas.json` (development/preview/production профили),
  - production env-флаги (`EXPO_PUBLIC_SHOW_DEMO_CREDENTIALS=false`, `EXPO_PUBLIC_ENABLE_DEMO_RESET=false`),
  - наличие обязательных env-ключей в `.env.example` и `api/.env.example`.
- Скрипт также выводит branding-warning, если идентификаторы всё ещё содержат `travelai`.

2. NPM-команда preflight
- Файл: `package.json`
- Добавлен скрипт: `preflight:mobile`.

3. Релизный чек-лист
- Файл: `docs/MOBILE_RELEASE_CHECKLIST.md`
- Содержит пошаговый порядок preflight -> backend/env -> EAS build -> QA -> submit.

## Верификация

- `npm run preflight:mobile` — passed (с branding-warning по bundle/package)
- `npm run smoke:encoding` — passed
- `npm run smoke:content` — passed
- `npm run smoke:api` — passed
- `npx tsc --noEmit` — passed

## Результат

День 6 закрыт: сформирован практический релизный preflight-контур для mobile и единый рабочий чек-лист перед публикацией.
