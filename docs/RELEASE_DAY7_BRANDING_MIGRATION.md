# RELEASE DAY 7 BRANDING MIGRATION

Дата: 2026-04-23

## Цель дня

Перевести критичные runtime-идентификаторы проекта с legacy-бренда `travelai` на `shturman`, не ломая preflight и smoke-пайплайн.

## Что изменено

1. Mobile app identifiers
- `app.json`:
  - `expo.ios.bundleIdentifier`: `com.shturman.app`
  - `expo.android.package`: `com.shturman.app`

2. IAP product identifiers
- `store/subscriptionService.ts`
- `store/subscriptionService.web.ts`
- Обновлены `PRODUCT_IDS`:
  - `com.shturman.app.premium_monthly`
  - `com.shturman.app.premium_yearly`

3. Demo account domain
- `store/authStorage.ts`: demo email -> `demo@shturman.app`
- `api/server.js`: demo checks -> `demo@shturman.app`
- `api/data/auth-db.json`: demo user email обновлён
- `api/data/app-db.json`: demo email значения обновлены
- `scripts/smoke-api.mjs`: генерация smoke-пользователя + demo login на `@shturman.app`
- `api/README.md`: актуализирована документация для `reseed-demo`

4. Стабилизация quality scripts
- `scripts/smoke-content.mjs`: чтение файлов с удалением BOM
- `scripts/smoke-encoding.mjs`: исключены `api/data/*.json` (runtime DB dump), чтобы убрать ложные фейлы на payload-снимках

## Проверки

- `npm run preflight:mobile` — passed
- `npm run smoke:encoding` — passed
- `npm run smoke:content` — passed
- `npm run smoke:api` — passed
- `npx tsc --noEmit` — passed

## Важное замечание

Смена `bundleIdentifier`/`package` и `PRODUCT_IDS` — это релизно-значимое изменение.
Для production нужно создать/перенастроить продукты подписок в App Store Connect / Google Play под новые product IDs (`com.shturman.app.*`), иначе purchase-flow не получит реальные SKU.
