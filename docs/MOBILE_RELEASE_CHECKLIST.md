# Mobile Release Checklist (Android/iOS)

Дата: 2026-04-23

## 1. Preflight (локально)

1. `npm run preflight:mobile`
2. `npm run smoke:encoding`
3. `npm run smoke:content`
4. `npm run smoke:api`
5. `npx tsc --noEmit`

## 2. Backend readiness

1. Заполнить `api/.env` прод-значениями:
   - `AUTH_JWT_SECRET`
   - `YANDEX_RASP_API_KEY`
   - `OSTROVOK_KEY_ID` + `OSTROVOK_API_KEY` (или `OSTROVOK_AUTH_HEADER`)
   - `OPENAI_API_KEY`
2. Убедиться, что API доступен по HTTPS.
3. Проверить health-endpoint и ответы live-интеграций.

## 3. Frontend env readiness

1. Заполнить `.env`:
   - `EXPO_PUBLIC_AUTH_API_URL`
   - `EXPO_PUBLIC_SHOW_DEMO_CREDENTIALS=false`
   - `EXPO_PUBLIC_ENABLE_DEMO_RESET=false`
2. Проверить, что demo-кнопки не показываются в production-профиле.

## 4. EAS build

1. Логин: `eas login`
2. Проверка: `eas whoami`
3. Android (AAB): `eas build --platform android --profile production`
4. iOS (IPA): `eas build --platform ios --profile production`

## 5. Manual QA before submit

1. Onboarding + auth
2. Create trip -> hotel-select -> transport-select -> generating -> result
3. Wallet upload/open/delete document
4. Premium screen open + purchase flow stub + restore flow
5. Offline fallback на transport/hotels/result/[id]
6. Theme switching (light/dark/system)

## 6. Store submit

1. Android: `eas submit --platform android --profile production`
2. iOS: `eas submit --platform ios --profile production`
3. Проверить release notes, скриншоты, privacy labels.
