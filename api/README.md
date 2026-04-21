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
- `POST /trips/reseed-demo` (Bearer access token, только для `demo@travelai.app`, можно отключить)

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
