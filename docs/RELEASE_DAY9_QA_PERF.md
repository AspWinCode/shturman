# RELEASE DAY 9 QA ROUND 2 + PERF

Дата: 2026-04-23

## Чек-лист QA round 2

1. Auth:
- login/register/recover/change-password
- logout + повторный вход

2. Trip flow:
- create -> hotel-select -> transport-select -> generating -> result
- сохранение поездки и открытие в `trips`
- `trip/[id]` вкладки: маршрут/транспорт/отели/бюджет/карта

3. Wallet:
- upload pdf/png/jpg
- open/delete
- premium gate

4. Premium:
- open/restore CTA
- корректное переключение темы на экране

5. Fallback UX:
- offline mode и недоступный live API на transport/hotels
- CTA на партнёров/инструкцию включения API

## Perf focus

1. Холодный старт до интерактивности (TTI) на Android mid-device.
2. Скролл `result` и `trip/[id]` без видимых лагов.
3. Сетевая стабильность:
- таймауты API возвращают понятные сообщения;
- нет бесконечных loading-состояний.

## Exit criteria дня

1. Нет P0/P1 UI/flow регрессий.
2. Зафиксирован список P2/P3 и план hotfix-окна (День 11).
