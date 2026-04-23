# Travel API

Локальный backend для auth и поездок.

## Запуск

```powershell
cd D:\travel_app
npm run dev:api
```

По умолчанию API доступен на `http://localhost:8787`.

## Переменные окружения

- `AUTH_API_PORT` — порт (default `8787`)
- `AUTH_API_HOST` — host (default `0.0.0.0`)
- `AUTH_JWT_SECRET` — секрет подписи JWT
- `AUTH_ENABLE_DEMO_USER` — создавать demo-пользователя при старте (`true/false`)
- `AUTH_ENABLE_TRIPS_RESET` — разрешить endpoint `/trips/reset` (`true/false`)
- `AUTH_ENABLE_TRIPS_RESEED` — разрешить endpoint `/trips/reseed-demo` (`true/false`)
- `DATABASE_URL` — строка подключения PostgreSQL
- `PG_SSL` — `true/false`
- `YANDEX_RASP_API_KEY` — API-ключ Яндекс Расписаний (опционально, для live расписаний)
- `OSTROVOK_API_BASE_URL` — базовый URL B2B.Ostrovok API (default `https://api.worldota.net/api/b2b/v3`)
- `OSTROVOK_API_URL` — опциональный override URL поиска (если пусто, используется flow `multicomplete -> search/serp/region`)
- `OSTROVOK_AUTH_HEADER` — полный `Authorization` header для B2B.Ostrovok
- `OSTROVOK_TOKEN` — Bearer token для B2B.Ostrovok (fallback, если не используете `OSTROVOK_AUTH_HEADER`)
- `OSTROVOK_KEY_ID` и `OSTROVOK_API_KEY` — Basic auth для B2B.Ostrovok (fallback, если не заданы `OSTROVOK_AUTH_HEADER/OSTROVOK_TOKEN`)
- `OSTROVOK_TIMEOUT_MS` — timeout запроса к B2B.Ostrovok (default `12000`)
- `OPENAI_API_KEY` — API-ключ OpenAI для AI-генерации маршрута
- `AI_PREMIUM_EMAILS` — список email через запятую, которым разрешена AI-генерация в production
- `BREVO_API_KEY` — ключ Brevo API для transactional email
- `BREVO_SENDER_EMAIL` — email отправителя писем
- `BREVO_SENDER_NAME` — имя отправителя писем

Для клиента (Expo):

- `EXPO_PUBLIC_AUTH_API_URL=http://localhost:8787`
- `EXPO_PUBLIC_SHOW_DEMO_CREDENTIALS=true`
- `EXPO_PUBLIC_ENABLE_DEMO_RESET=true`

## Endpoints

- `GET /health`
- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/refresh`
- `POST /auth/logout`
- `POST /auth/recover`
- `POST /auth/change-password` (Bearer access token)
- `GET /trips` (Bearer access token)
- `POST /trips/upsert` (Bearer access token)
- `POST /trips/delete` (Bearer access token)
- `POST /trips/reset` (Bearer access token, можно отключить)
- `POST /trips/reseed-demo` (Bearer access token, только для `demo@shturman.app`, можно отключить)
- `POST /transport/trains/search` (публично, поиск ЖД-билетов)
- `POST /transport/trains/book` (публично, создание брони)
- `POST /transport/trains/pay` (публично, оплата брони и выпуск e-ticket)
- `GET /transport/trains/booking?bookingId=...` (публично, статус брони/билета)
- `POST /transport/yandex-rasp/search` (публично, live расписания: поезд/самолет/автобус)
- `POST /hotels/ostrovok/search` (публично, live отели через B2B.Ostrovok)
- `POST /api/generate-trip` (Bearer access token, AI-генерация маршрута с fallback на клиенте)

Почтовые уведомления:
- welcome email отправляется после `POST /auth/register`
- recovery email отправляется после `POST /auth/recover`

## PostgreSQL через Docker

```powershell
cd D:\travel_app\api
docker compose -f docker-compose.postgres.yml up -d
```

Пример `DATABASE_URL`:

`postgresql://travel_app:travel_app@localhost:5432/travel_app`

## Безопасность

- В production обязателен сильный `AUTH_JWT_SECRET` (минимум 32 символа, без дефолтного значения).
- Включен rate-limit для всех endpoint, более строгий для auth.
- Включен anti-bruteforce для логина (временная блокировка после серии ошибок).
- Ведется audit-log для `/auth/*` и `/trips/*`.
