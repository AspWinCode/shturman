# RELEASE DAY 10 INTERNAL RELEASE

Дата: 2026-04-23

## Android Internal Testing

1. Сборка:
`eas build --platform android --profile production`
2. Загрузка в Internal testing трек Google Play.
3. Добавить тестовую группу (команда + пилот).

## iOS TestFlight Internal

1. Сборка:
`eas build --platform ios --profile production`
2. Загрузка в App Store Connect.
3. Раздать TestFlight Internal группе.

## Сбор фидбэка

1. Формат:
- шаги воспроизведения
- ожидание/факт
- скрин/видео
- severity (P0/P1/P2/P3)

2. Канал:
- единый трекер (issues/таблица)
- SLA на hotfix triage: <= 24ч
