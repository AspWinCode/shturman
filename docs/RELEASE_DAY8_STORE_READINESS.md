# RELEASE DAY 8 STORE READINESS

Дата: 2026-04-23

## Что сделано

1. Финализированы идентификаторы и версии:
- `app.json`
  - `version: 1.0.1`
  - `ios.buildNumber: 2`
  - `android.versionCode: 4`
  - `bundleIdentifier/package: com.shturman.app`

2. Добавлены store metadata URL в runtime-конфиг:
- `expo.extra.supportUrl`
- `expo.extra.privacyPolicyUrl`
- `expo.extra.termsUrl`

3. Обновлён EAS профилинг для каналов:
- `eas.json`
  - `development.channel: development`
  - `preview.channel: preview`
  - `production.channel: production`

## Проверка

1. `npm run preflight:mobile`
2. Проверка `app.json` и `eas.json` на консистентность идентификаторов.
