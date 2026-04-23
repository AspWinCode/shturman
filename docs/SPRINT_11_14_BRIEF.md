# Техническое задание для разработчика
## Спринты 11–14: Premium, AI-генерация, Аналитика/Релиз, Административная панель

**Проект:** Штурман — AI Travel Planner  
**Стек (мобильное приложение):** React Native (Expo ~51), TypeScript strict, Zustand, expo-router, expo-sqlite, Node.js backend (порт 8787)  
**Стек (Admin Panel, Sprint 14):** Vite + React 18 + TypeScript + TanStack Query + shadcn/ui  
**Дата документа:** Апрель 2026

---

## Обязательно прочитай перед началом

**Что было сделано в спринтах 1–10:**
- ✅ Sprint 1–2: Яндекс/Островок deep links, OAuth, удаление аккаунта
- ✅ Sprint 3–4: Интерактивная карта, добавление/удаление мест, погода
- ✅ Sprint 5: Модуль доступности ♿, Dark Mode
- ✅ Sprint 6: Push-уведомления
- ✅ Sprint 7: Travel Wallet (PDF/фото привязаны к поездкам)
- ✅ Sprint 8: Offline-режим (NetInfo, кэш, оффлайн-баннер)
- ✅ Sprint 9: Travel Mode, шаринг маршрута
- ✅ Sprint 10: Отзывы и рейтинги с ♿-блоком

**Структура репозитория:**
```
D:\travel_app\
  app/                    # expo-router экраны
    _layout.tsx           # root layout + bootstrap + ThemeProvider
    (tabs)/               # нижняя навигация
    trip/[id].tsx         # просмотр поездки (сохранённой)
    result.tsx            # просмотр только что сгенерированной поездки
    travel-mode/[id].tsx  # Travel Mode
    (premium)/            # экраны Premium (создать в Sprint 11)
    (wallet)/             # Travel Wallet
    (profile)/            # notifications, my-reviews
  constants/
    data.ts               # типы Trip, Place, Day, Review, TripDocument...
    colors.ts             # LightColors, DarkColors
    theme.ts              # Spacing, Typography, BorderRadius, Shadows
  store/
    useStore.ts           # Zustand store
    authApi.ts            # HTTP-клиент к backend
    authStorage.ts        # JWT сессия в AsyncStorage
    tripGenerator.ts      # шаблонная генерация Trip
    tripsDb.ts            # SQLite CRUD поездок
    walletDb.ts           # SQLite документы (Sprint 7)
    reviewsDb.ts          # SQLite отзывы (Sprint 10)
    notificationsService.ts  # push (Sprint 6)
    offlineService.ts        # кэш оффлайн (Sprint 8)
    shareService.ts          # шаринг текста (Sprint 9)
  hooks/
    useTheme.ts           # ThemeContext + useTheme()
    useNetworkStatus.ts   # isOnline / isConnected
  providers/
    ThemeProvider.tsx     # light/dark/system
  api/                    # Node.js backend
    server.js             # все HTTP-маршруты
    storage.js            # Storage class (JSON или PostgreSQL)
```

**Правила кода (обязательно):**
- `npx tsc --noEmit` = 0 ошибок после каждой задачи
- Цвета — `const { colors } = useTheme()`, не хардкодить
- Стили — `StyleSheet.create({})`, инлайн только для динамических цветов
- `npx expo install` для новых пакетов (не `npm install`)

---

---

# СПРИНТ 11 — Premium-подписка

**Цель:** Монетизация через In-App Purchase. Free = 3 поездки/месяц. Premium = безлимит + оффлайн + Wallet + AI.  
**Срок:** 2 недели

---

## 11.1. Подготовка продуктов

### App Store Connect (iOS)
1. Войди в [App Store Connect](https://appstoreconnect.apple.com) → My Apps → Штурман
2. В разделе «In-App Purchases» создай два подписочных продукта:
   - `com.travelai.app.premium_monthly` — Штурман Premium (месяц), цена: Tier 3 (~299 ₽)
   - `com.travelai.app.premium_yearly` — Штурман Premium (год), цена: Tier 10 (~1990 ₽)
3. Тип: «Auto-Renewable Subscription», группа подписок: «Premium»

### Google Play Console (Android)
1. Play Console → Monetize → Products → Subscriptions
2. Аналогично создай два продукта с теми же ID
3. Добавить в `app.json`:
   ```json
   "android": {
     "googleServicesFile": "./google-services.json"
   }
   ```

### Установка библиотеки
```bash
npx expo install react-native-iap
```

Добавить в `app.json` плагины:
```json
["react-native-iap", {}]
```

---

## 11.2. Создать store/subscriptionService.ts

```typescript
import * as RNIap from 'react-native-iap';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

export const PRODUCT_IDS = {
  monthly: 'com.travelai.app.premium_monthly',
  yearly: 'com.travelai.app.premium_yearly',
} as const;

export type SubscriptionPlan = 'none' | 'monthly' | 'yearly';

interface SubscriptionState {
  plan: SubscriptionPlan;
  expiresAt: string | null;   // ISO 8601
  purchaseToken?: string;
}

const SUB_CACHE_KEY = 'subscription.state.v1';

// ── Инициализация IAP ──────────────────────────────────────────────────────
export async function initIAP(): Promise<void> {
  if (Platform.OS === 'web') return;
  await RNIap.initConnection();
}

export async function destroyIAP(): Promise<void> {
  if (Platform.OS === 'web') return;
  await RNIap.endConnection();
}

// ── Получить продукты из магазина ─────────────────────────────────────────
export async function getSubscriptionProducts(): Promise<RNIap.Subscription[]> {
  return RNIap.getSubscriptions({ skus: Object.values(PRODUCT_IDS) });
}

// ── Купить подписку ────────────────────────────────────────────────────────
export async function purchaseSubscription(plan: 'monthly' | 'yearly'): Promise<{ ok: boolean; message?: string }> {
  try {
    await RNIap.requestSubscription({ sku: PRODUCT_IDS[plan] });
    // Результат приходит через purchaseUpdatedListener в useEffect компонента
    return { ok: true };
  } catch (e) {
    const err = e as { code?: string; message?: string };
    if (err.code === 'E_USER_CANCELLED') return { ok: false, message: 'Покупка отменена' };
    return { ok: false, message: err.message || 'Ошибка покупки' };
  }
}

// ── Восстановить покупки ──────────────────────────────────────────────────
export async function restorePurchases(): Promise<SubscriptionState> {
  const purchases = await RNIap.getAvailablePurchases();
  const activeSub = purchases.find((p) =>
    Object.values(PRODUCT_IDS).includes(p.productId as typeof PRODUCT_IDS[keyof typeof PRODUCT_IDS])
  );
  if (!activeSub) return { plan: 'none', expiresAt: null };

  const plan: SubscriptionPlan = activeSub.productId === PRODUCT_IDS.yearly ? 'yearly' : 'monthly';
  const state: SubscriptionState = {
    plan,
    expiresAt: null, // точную дату получаем с backend после валидации receipt
    purchaseToken: activeSub.purchaseToken,
  };
  await saveSubscriptionState(state);
  return state;
}

// ── Локальный кэш состояния подписки ─────────────────────────────────────
export async function saveSubscriptionState(state: SubscriptionState): Promise<void> {
  await AsyncStorage.setItem(SUB_CACHE_KEY, JSON.stringify(state));
}

export async function loadSubscriptionState(): Promise<SubscriptionState> {
  const raw = await AsyncStorage.getItem(SUB_CACHE_KEY);
  if (!raw) return { plan: 'none', expiresAt: null };
  try {
    return JSON.parse(raw) as SubscriptionState;
  } catch {
    return { plan: 'none', expiresAt: null };
  }
}

export function isPremiumActive(state: SubscriptionState): boolean {
  if (state.plan === 'none') return false;
  if (!state.expiresAt) return state.plan !== 'none'; // если нет даты — считаем активной
  return new Date(state.expiresAt) > new Date();
}

// ── Подсчёт поездок за текущий месяц ─────────────────────────────────────
export function countTripsThisMonth(trips: { startDate: string }[]): number {
  const now = new Date();
  const month = now.getMonth();
  const year = now.getFullYear();
  return trips.filter((t) => {
    const d = new Date(t.startDate);
    return d.getMonth() === month && d.getFullYear() === year;
  }).length;
}

export const FREE_TRIP_LIMIT = 3;
```

---

## 11.3. Добавить подписку в useStore

Файл: `store/useStore.ts`

В интерфейс `AppStore` добавь:
```typescript
import { SubscriptionState, SubscriptionPlan } from '@/store/subscriptionService';

interface AppStore {
  // ... существующие поля ...
  subscription: SubscriptionState;
  isPremium: boolean;

  loadSubscription: () => Promise<void>;
  activateSubscription: (state: SubscriptionState) => Promise<void>;
  checkTripLimit: () => { allowed: boolean; message?: string };
}
```

Начальное значение:
```typescript
subscription: { plan: 'none', expiresAt: null },
isPremium: false,
```

Реализация:
```typescript
loadSubscription: async () => {
  const state = await loadSubscriptionState();
  set({ subscription: state, isPremium: isPremiumActive(state) });
},

activateSubscription: async (state) => {
  await saveSubscriptionState(state);
  set({ subscription: state, isPremium: isPremiumActive(state) });
},

checkTripLimit: () => {
  const { trips, isPremium } = get();
  if (isPremium) return { allowed: true };
  const count = countTripsThisMonth(trips);
  if (count >= FREE_TRIP_LIMIT) {
    return {
      allowed: false,
      message: `В бесплатной версии можно создать ${FREE_TRIP_LIMIT} поездки в месяц. Оформите Premium для безлимитного доступа.`
    };
  }
  return { allowed: true };
},
```

Добавь вызов `loadSubscription()` в bootstrap `app/_layout.tsx`.

---

## 11.4. Экран Premium

Файл: `app/(premium)/index.tsx` (создать папку `(premium)`)

**Структура экрана:**

```
┌──────────────────────────────────────────────┐
│  ✨ Штурман Premium                           │
│                                              │
│  Разблокируй все возможности                 │
│                                              │
│  ✅ Безлимитное создание маршрутов           │
│  ✅ AI-генерация маршрутов (GPT-4o)          │
│  ✅ Оффлайн-доступ к поездкам               │
│  ✅ Travel Wallet (билеты и брони)           │
│  ✅ Приоритетная поддержка                   │
│                                              │
│  ┌────────────────┐  ┌─────────────────────┐ │
│  │ 299 ₽ / месяц │  │ 1 990 ₽ / год  🔥   │ │
│  │                │  │  ~166 ₽ / месяц     │ │
│  └────────────────┘  └─────────────────────┘ │
│                                              │
│  [Оформить Premium]                          │
│  [Восстановить покупки]                      │
│                                              │
│  Отмена в любое время. Условия использования │
└──────────────────────────────────────────────┘
```

В компоненте экрана:
```typescript
useEffect(() => {
  initIAP();
  getSubscriptionProducts().then(setProducts);
  
  // Слушатель успешной покупки
  const purchaseListener = RNIap.purchaseUpdatedListener(async (purchase) => {
    // Отправить receipt на backend для валидации
    const result = await validateReceiptOnBackend(purchase);
    if (result.ok) {
      await activateSubscription(result.subscriptionState);
      Alert.alert('Успешно!', 'Premium активирован. Спасибо за поддержку!');
      router.back();
    }
  });

  const errorListener = RNIap.purchaseErrorListener((error) => {
    Alert.alert('Ошибка', error.message);
  });

  return () => {
    purchaseListener.remove();
    errorListener.remove();
    destroyIAP();
  };
}, []);
```

---

## 11.5. Валидация receipt на бэкенде

Файл: `api/server.js`

Добавь эндпоинт `POST /subscription/validate`:

```javascript
if (url.pathname === '/subscription/validate' && req.method === 'POST') {
  const auth = await requireAccessUser(req);
  if (auth.error) return respond(req, res, 401, { ok: false, message: 'Unauthorized' }, {});

  const body = await parseBody(req);
  const { platform, productId, purchaseToken, transactionReceipt } = body;

  let expiresAt = null;
  let valid = false;

  if (platform === 'android' && purchaseToken) {
    // В production: верификация через Google Play Developer API
    // https://developers.google.com/android-publisher/api-ref/rest/v3/purchases.subscriptions/get
    // В dev/demo mode принимаем как валидную:
    valid = true;
    const monthsToAdd = productId?.includes('yearly') ? 12 : 1;
    const exp = new Date();
    exp.setMonth(exp.getMonth() + monthsToAdd);
    expiresAt = exp.toISOString();

  } else if (platform === 'ios' && transactionReceipt) {
    // В production: верификация через Apple App Store
    // POST https://buy.itunes.apple.com/verifyReceipt
    // В dev/demo mode принимаем как валидную:
    valid = true;
    const monthsToAdd = productId?.includes('yearly') ? 12 : 1;
    const exp = new Date();
    exp.setMonth(exp.getMonth() + monthsToAdd);
    expiresAt = exp.toISOString();
  }

  if (!valid) {
    return respond(req, res, 400, { ok: false, message: 'Invalid receipt' }, { event: 'sub_validate_failed', userId: auth.user.id });
  }

  const plan = productId?.includes('yearly') ? 'yearly' : 'monthly';

  // Сохранить статус подписки в базе
  await storage.upsertSubscription(auth.user.id, { plan, expiresAt, productId, platform });

  return respond(req, res, 200,
    { ok: true, subscriptionState: { plan, expiresAt } },
    { event: 'sub_validate_success', userId: auth.user.id, email: auth.user.email, meta: { plan } }
  );
}
```

> **Добавить в `storage.js`** методы `upsertSubscription(userId, data)` и `getSubscription(userId)` — аналогично другим CRUD методам. Для JSON-режима: добавить массив `subscriptions` в схему базы.

---

## 11.6. Гейты Premium-функций

### Лимит поездок при создании

Файл: `store/useStore.ts`, экшен `generateTrip` (или `saveTrip`):

```typescript
generateTrip: (input) => {
  const check = get().checkTripLimit();
  if (!check.allowed) {
    // Нельзя показать Alert из store — выброси ошибку, поймай в UI
    throw new Error(check.message);
  }
  // ... существующая логика генерации ...
},
```

В компоненте экрана создания — обернуть вызов в try/catch:
```typescript
try {
  generateTrip();
} catch (e) {
  Alert.alert(
    '✨ Нужен Premium',
    (e as Error).message,
    [
      { text: 'Оформить Premium', onPress: () => router.push('/(premium)') },
      { text: 'Отмена', style: 'cancel' },
    ]
  );
}
```

### Гейт для Wallet и Offline

В компонентах Wallet и кнопки «Сохранить для оффлайн»:
```typescript
const { isPremium } = useStore((s) => ({ isPremium: s.isPremium }));

if (!isPremium) {
  return (
    <TouchableOpacity onPress={() => router.push('/(premium)')}>
      <Text>🔒 Доступно в Premium</Text>
    </TouchableOpacity>
  );
}
```

---

## 11.7. Бейдж Premium в профиле

Файл: `app/(tabs)/profile.tsx`

Найди блок с `premiumBadge` (уже есть в компоненте). Обнови его:

```tsx
{isGuest ? (
  // ... существующий блок кнопок "Войти" / "Регистрация" ...
) : isPremium ? (
  <View style={styles.activePremiumBadge}>
    <Text style={styles.premiumIcon}>✨</Text>
    <Text style={styles.activePremiumText}>Premium активен</Text>
    {subscription.expiresAt && (
      <Text style={styles.premiumExpiry}>
        до {new Date(subscription.expiresAt).toLocaleDateString('ru-RU')}
      </Text>
    )}
  </View>
) : (
  <TouchableOpacity style={styles.premiumBadge} onPress={() => router.push('/(premium)')}>
    <View style={styles.premiumGradient}>
      <Text style={styles.premiumIcon}>✨</Text>
      <Text style={styles.premiumText}>Перейти на Premium</Text>
      <Ionicons name="chevron-forward" size={14} color="#fff" />
    </View>
  </TouchableOpacity>
)}
```

---

## Критерии готовности Sprint 11

- [ ] `npx tsc --noEmit` — 0 ошибок
- [ ] Экран Premium открывается и показывает продукты (цены из магазина)
- [ ] Покупка в sandbox проходит (проверить на тестовом аккаунте)
- [ ] После покупки `isPremium = true`, бейдж в профиле обновляется
- [ ] При 4-й поездке в месяц у Free-пользователя — Alert с предложением Premium
- [ ] Wallet и Offline для Free-пользователя показывают «Доступно в Premium»
- [ ] Восстановление покупок работает
- [ ] Backend `/subscription/validate` возвращает `{ ok: true }`

---

---

# СПРИНТ 12 — AI-генерация маршрутов

**Цель:** Premium-пользователи получают маршруты от GPT-4o вместо шаблонного генератора.  
**Зависимость:** Sprint 11 (Premium) должен быть готов.  
**Срок:** 2 недели

---

## 12.1. Backend endpoint /api/generate-trip

Файл: `api/server.js`

> **Почему через backend, а не напрямую из приложения?** Ключ OpenAI нельзя хранить в мобильном приложении — его извлекут из APK/IPA. Весь AI-запрос идёт через наш backend, который хранит ключ в переменных окружения.

Добавь в `.env`:
```
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-4o
```

Добавь endpoint в `api/server.js`:

```javascript
if (url.pathname === '/api/generate-trip' && req.method === 'POST') {
  const auth = await requireAccessUser(req);
  if (auth.error) {
    return respond(req, res, 401, { ok: false, message: 'Unauthorized' }, {});
  }

  // Проверяем Premium (опционально в демо-режиме не проверяем)
  if (IS_PROD) {
    const sub = await storage.getSubscription(auth.user.id);
    const isPremium = sub && sub.expiresAt && new Date(sub.expiresAt) > new Date();
    if (!isPremium) {
      return respond(req, res, 403, { ok: false, message: 'Premium subscription required' }, {});
    }
  }

  const OPENAI_KEY = process.env.OPENAI_API_KEY;
  if (!OPENAI_KEY) {
    return respond(req, res, 503, { ok: false, message: 'AI service not configured' }, {});
  }

  const body = await parseBody(req);
  const { from, to, startDate, endDate, budget, travelers, interests, travelStyle, needsAccessibility } = body;

  if (!from || !to || !startDate || !endDate) {
    return respond(req, res, 400, { ok: false, message: 'from, to, startDate, endDate are required' }, {});
  }

  const daysCount = Math.ceil(
    (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)
  ) + 1;

  const systemPrompt = buildTripGenerationPrompt({ to, daysCount, budget, travelers, interests, travelStyle, needsAccessibility });

  try {
    const aiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || 'gpt-4o',
        messages: [
          { role: 'system', content: systemPrompt.system },
          { role: 'user', content: systemPrompt.user },
        ],
        response_format: { type: 'json_object' },
        max_tokens: 4000,
        temperature: 0.7,
      }),
    });

    if (!aiRes.ok) {
      const errBody = await aiRes.text();
      console.error('[AI] OpenAI error:', errBody);
      return respond(req, res, 502, { ok: false, message: 'AI service error' }, {});
    }

    const aiData = await aiRes.json();
    const rawContent = aiData.choices?.[0]?.message?.content;
    if (!rawContent) {
      return respond(req, res, 502, { ok: false, message: 'Empty AI response' }, {});
    }

    const tripJson = JSON.parse(rawContent);
    return respond(req, res, 200, { ok: true, trip: tripJson }, { event: 'ai_trip_generated', userId: auth.user.id });
  } catch (e) {
    console.error('[AI] generate error', e);
    return respond(req, res, 500, { ok: false, message: 'Failed to generate trip' }, {});
  }
}
```

Вынеси промпт в отдельный файл `api/tripPromptBuilder.js`:

```javascript
function buildTripGenerationPrompt({ to, daysCount, budget, travelers, interests, travelStyle, needsAccessibility }) {
  const accessibilityNote = needsAccessibility
    ? 'ВАЖНО: Все места должны быть полностью доступны для людей с ограниченными возможностями (пандусы, лифты, широкие проходы). Укажи accessible.wheelchair: true для каждого места.'
    : '';

  const system = `Ты — опытный тревел-планировщик. Ты создаёшь детальные маршруты путешествий по России и миру.
Отвечай СТРОГО в формате JSON согласно схеме. Никакого текста вне JSON.
Все названия мест, описания и адреса — на русском языке.
${accessibilityNote}`;

  const user = `Создай маршрут путешествия со следующими параметрами:
- Город/направление: ${to}
- Количество дней: ${daysCount}
- Бюджет: ${budget} ₽ на ${travelers} человек
- Стиль: ${travelStyle} (budget=эконом, standard=стандарт, comfort=комфорт, luxury=люкс)
- Интересы: ${(interests || []).join(', ') || 'разнообразные'}

Верни JSON следующей структуры:
{
  "days": [
    {
      "date": "YYYY-MM-DD",
      "title": "Название дня",
      "places": [
        {
          "id": "уникальный_id_строкой",
          "name": "Название места",
          "description": "Описание 1-2 предложения",
          "category": "museum|park|restaurant|attraction|shopping|other",
          "emoji": "🏛️",
          "time": "10:00",
          "duration": "2 часа",
          "cost": 500,
          "rating": 4.7,
          "address": "Улица, дом, город",
          "lat": 55.7415,
          "lng": 37.6208,
          "accessible": {
            "wheelchair": true,
            "audioGuide": false,
            "braille": false,
            "parkingNearby": true,
            "notes": "Есть пандусы"
          }
        }
      ]
    }
  ],
  "summary": "Краткое описание всего маршрута (2-3 предложения)"
}

Начальная дата первого дня: ${new Date().toISOString().slice(0, 10)}.
Не добавляй транспорт и отели в days.places — только достопримечательности, рестораны и активности.`;

  return { system, user };
}

module.exports = { buildTripGenerationPrompt };
```

---

## 12.2. Создать store/aiTripGenerator.ts

```typescript
import { Trip, TripForm } from '@/constants/data'; // или откуда импортируется TripForm
import { generateTripFromForm } from '@/store/tripGenerator';
import { ensureAccessToken } from '@/store/authStorage';

const API_BASE = process.env.EXPO_PUBLIC_AUTH_API_URL || 'http://localhost:8787';

interface AiGenerateInput {
  from: string;
  to: string;
  startDate: string;
  endDate: string;
  budget: number;
  travelers: number;
  interests: string[];
  travelStyle: string;
  needsAccessibility?: boolean;
}

export async function generateTripWithAI(
  input: AiGenerateInput,
  fallbackForm: Parameters<typeof generateTripFromForm>[0]
): Promise<Trip> {
  const accessToken = await ensureAccessToken();

  if (!accessToken) {
    // Нет авторизации — фолбэк на шаблон
    console.log('[AI] No access token, using template generator');
    return generateTripFromForm(fallbackForm);
  }

  try {
    const res = await fetch(`${API_BASE}/api/generate-trip`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify(input),
      signal: AbortSignal.timeout(30000), // 30 секунд — AI медленный
    });

    const data = await res.json() as { ok: boolean; trip?: unknown; message?: string };

    if (!res.ok || !data.ok || !data.trip) {
      console.warn('[AI] Backend error:', data.message || res.status);
      return generateTripFromForm(fallbackForm); // фолбэк
    }

    // Мержим AI-ответ в полную структуру Trip
    return mergeAiResponseToTrip(data.trip, input, fallbackForm);
  } catch (e) {
    console.warn('[AI] Request failed, using fallback:', e);
    return generateTripFromForm(fallbackForm);
  }
}

function mergeAiResponseToTrip(
  aiResponse: unknown,
  input: AiGenerateInput,
  fallbackForm: Parameters<typeof generateTripFromForm>[0]
): Trip {
  // Получаем полную Trip-структуру от шаблонного генератора (транспорт, отель, etc.)
  const baseTrip = generateTripFromForm(fallbackForm);

  // Проверяем структуру AI-ответа
  if (
    !aiResponse ||
    typeof aiResponse !== 'object' ||
    !('days' in aiResponse) ||
    !Array.isArray((aiResponse as { days: unknown }).days)
  ) {
    return baseTrip;
  }

  const aiData = aiResponse as {
    days: Array<{
      date?: string;
      title?: string;
      places?: unknown[];
    }>;
    summary?: string;
  };

  // Заменяем только дни — транспорт, отель, бюджет берём из базового шаблона
  const mergedDays = baseTrip.days.map((baseDay, idx) => {
    const aiDay = aiData.days[idx];
    if (!aiDay?.places?.length) return baseDay;

    return {
      ...baseDay,
      title: aiDay.title || baseDay.title,
      places: aiDay.places.map((p, placeIdx) => {
        const place = p as Record<string, unknown>;
        return {
          id: String(place.id || `ai-place-${idx}-${placeIdx}`),
          name: String(place.name || 'Место'),
          description: String(place.description || ''),
          category: String(place.category || 'attraction'),
          emoji: String(place.emoji || '📍'),
          time: String(place.time || baseDay.places[placeIdx]?.time || '10:00'),
          duration: String(place.duration || '1 час'),
          cost: Number(place.cost) || 0,
          rating: Number(place.rating) || 4.5,
          address: String(place.address || ''),
          lat: typeof place.lat === 'number' ? place.lat : undefined,
          lng: typeof place.lng === 'number' ? place.lng : undefined,
          accessible: place.accessible as Trip['days'][0]['places'][0]['accessible'],
          image: baseDay.places[placeIdx]?.image, // берём изображение из шаблона
        };
      }),
    };
  });

  return {
    ...baseTrip,
    days: mergedDays,
    aiGenerated: true, // добавь поле в тип Trip
    summary: typeof aiData.summary === 'string' ? aiData.summary : baseTrip.summary,
  };
}
```

> **Добавить в тип Trip** (`constants/data.ts`):
> ```typescript
> aiGenerated?: boolean;
> summary?: string;
> ```

---

## 12.3. Интегрировать AI в useStore

Файл: `store/useStore.ts`

Найди экшен `generateTrip`. Сейчас он вызывает `generateTripFromForm`. Измени:

```typescript
import { generateTripWithAI } from '@/store/aiTripGenerator';

generateTrip: async (input) => {  // сделать async
  const current = get().tripForm;
  const nextForm = input ? { ...current, ...input } : current;
  const isPremium = get().isPremium;

  // Показываем состояние загрузки (опционально через отдельный флаг)
  set({ generatingTrip: true, generatingWithAI: isPremium });

  try {
    const trip = isPremium
      ? await generateTripWithAI({
          from: nextForm.from,
          to: nextForm.to,
          startDate: nextForm.startDate,
          endDate: nextForm.endDate,
          budget: nextForm.budget,
          travelers: nextForm.travelers,
          interests: nextForm.interests,
          travelStyle: nextForm.travelStyle,
          needsAccessibility: nextForm.needsAccessibility,
        }, nextForm)
      : generateTripFromForm(nextForm);

    set({ generatedTrip: trip, generatingTrip: false, generatingWithAI: false });
  } catch (e) {
    set({ generatingTrip: false, generatingWithAI: false });
    throw e;
  }
},
```

Добавь в интерфейс и начальное состояние:
```typescript
generatingTrip: boolean;
generatingWithAI: boolean;
```

---

## 12.4. Обновить экран загрузки/генерации

Файл: `app/result.tsx` или экран с лоадером

```tsx
const generatingWithAI = useStore((s) => s.generatingWithAI);

// В компоненте лоадера:
{generatingTrip && (
  <View style={styles.loader}>
    <ActivityIndicator size="large" color={Colors.primary} />
    <Text style={styles.loaderTitle}>
      {generatingWithAI ? '🤖 AI составляет маршрут...' : '🧭 Составляю маршрут...'}
    </Text>
    <Text style={styles.loaderSubtitle}>
      {generatingWithAI
        ? 'GPT-4o анализирует ваши предпочтения'
        : 'Подбираю лучшие места для вас'}
    </Text>
  </View>
)}
```

---

## 12.5. Бейдж AI на маршруте и кнопка «Улучшить AI»

В `app/result.tsx` — если `generatedTrip.aiGenerated === true`:

```tsx
{generatedTrip.aiGenerated && (
  <View style={styles.aiBadge}>
    <Text style={styles.aiBadgeText}>🤖 Создано AI</Text>
  </View>
)}
```

В `app/trip/[id].tsx` — кнопка «Улучшить маршрут AI» (только для Premium):

```tsx
{isPremium && !trip.aiGenerated && (
  <TouchableOpacity
    style={styles.improveWithAIBtn}
    onPress={handleImproveWithAI}
    accessibilityLabel="Улучшить маршрут с помощью AI"
  >
    <Ionicons name="sparkles-outline" size={18} color={Colors.primary} />
    <Text>Улучшить маршрут AI</Text>
  </TouchableOpacity>
)}
```

`handleImproveWithAI` — запускает `generateTripWithAI` с параметрами текущей поездки, результат заменяет дни существующей поездки через `updateTrip`.

---

## Критерии готовности Sprint 12

- [ ] Backend `POST /api/generate-trip` возвращает корректный JSON
- [ ] Premium-пользователь видит лоадер «AI составляет маршрут...»
- [ ] Полученный AI-маршрут имеет реальные названия мест и адреса
- [ ] При ошибке AI — автоматический фолбэк на шаблонный генератор (без crash)
- [ ] Free-пользователь получает шаблонный маршрут (AI не вызывается)
- [ ] `aiGenerated: true` маршруты имеют бейдж «Создано AI»
- [ ] Кнопка «Улучшить маршрут AI» видна в сохранённой поездке у Premium

---

---

# СПРИНТ 13 — Аналитика, мониторинг, финальная шлифовка, релиз

**Цель:** Production-ready приложение. Crash reporting, аналитика, email-нотификации, i18n, E2E-тест, сборка.  
**Срок:** 2 недели

---

## 13.1. Sentry — crash reporting

```bash
npx expo install @sentry/react-native
```

В `app/_layout.tsx`:
```typescript
import * as Sentry from '@sentry/react-native';

// До return, вне компонента:
Sentry.init({
  dsn: process.env.EXPO_PUBLIC_SENTRY_DSN,
  enabled: !__DEV__,
  tracesSampleRate: 0.2,
});

// Обернуть RootLayout:
export default Sentry.wrap(RootLayout);
```

Добавить в `.env`:
```
EXPO_PUBLIC_SENTRY_DSN=https://...@sentry.io/...
```

**Настройка в Sentry:**
1. Создать проект на [sentry.io](https://sentry.io)
2. Выбрать платформу React Native
3. Скопировать DSN

---

## 13.2. Firebase Analytics

```bash
npx expo install @react-native-firebase/app @react-native-firebase/analytics
```

Файл `app.json` — плагины:
```json
"@react-native-firebase/app"
```

Файл `google-services.json` (Android) и `GoogleService-Info.plist` (iOS) — скачать из Firebase Console.

Добавь в `.env`:
```
EXPO_PUBLIC_FIREBASE_PROJECT_ID=shturman-app
```

---

## 13.3. Создать store/analyticsService.ts

Все события через один файл — удобно потом переключить провайдер:

```typescript
import analytics from '@react-native-firebase/analytics';
import { Platform } from 'react-native';

// Безопасный вызов — не крашим если аналитика недоступна
async function track(event: string, params?: Record<string, string | number | boolean>): Promise<void> {
  if (__DEV__) {
    console.log('[Analytics]', event, params);
    return;
  }
  try {
    await analytics().logEvent(event, params);
  } catch (e) {
    // Не крашим приложение из-за аналитики
  }
}

// ── Авторизация ────────────────────────────────────────────────────────────
export const Analytics = {
  userRegistered: (method: 'email' | 'google' | 'yandex' | 'apple') =>
    track('user_registered', { method }),

  userLoggedIn: (method: 'email' | 'google' | 'yandex' | 'apple') =>
    track('user_logged_in', { method }),

  // ── Поездки ───────────────────────────────────────────────────────────────
  tripCreated: (params: { destination: string; days: number; isAI: boolean }) =>
    track('trip_created', params),

  tripSaved: (params: { destination: string; days: number }) =>
    track('trip_saved', params),

  tripDeleted: () => track('trip_deleted'),

  tripRegenerated: () => track('trip_regenerated'),

  // ── Партнёры ──────────────────────────────────────────────────────────────
  yandexTravelClick: (params: { transport_type: string; from: string; to: string }) =>
    track('yandex_travel_click', params),

  ostrovokClick: (params: { city: string }) =>
    track('ostrovok_click', params),

  // ── Premium ────────────────────────────────────────────────────────────────
  premiumScreenOpened: () => track('premium_screen_opened'),

  premiumPurchaseStarted: (plan: 'monthly' | 'yearly') =>
    track('premium_purchase_started', { plan }),

  premiumPurchaseCompleted: (plan: 'monthly' | 'yearly') =>
    track('premium_purchase_completed', { plan }),

  // ── Доступность ────────────────────────────────────────────────────────────
  accessibilityFilterUsed: () => track('accessibility_filter_used'),

  // ── Прочее ─────────────────────────────────────────────────────────────────
  shareTrip: (destination: string) => track('share_trip', { destination }),

  travelModeOpened: () => track('travel_mode_opened'),

  reviewSubmitted: (rating: number, hasAccessibility: boolean) =>
    track('review_submitted', { rating, has_accessibility: hasAccessibility }),
};
```

**Где вызывать события — ключевые точки:**

| Событие | Файл | Место |
|---------|------|-------|
| `tripCreated` | `store/useStore.ts` | после `generateTrip` |
| `tripSaved` | `store/useStore.ts` | в `saveTrip` |
| `yandexTravelClick` | `app/result.tsx` / `app/trip/[id].tsx` | `onPress` кнопок Яндекс |
| `ostrovokClick` | те же файлы | `onPress` кнопок Островок |
| `premiumPurchaseCompleted` | `app/(premium)/index.tsx` | в `purchaseUpdatedListener` |
| `accessibilityFilterUsed` | экран формы поездки | `onChangeText`/`onPress` ♿ |
| `reviewSubmitted` | `components/AddReviewModal.tsx` | после `addReview` |

---

## 13.4. Transactional email на backend

Файл: `api/server.js`

Используем **Brevo** (бывший Sendinblue) — есть бесплатный тариф 300 писем/день.

Добавить в `.env`:
```
BREVO_API_KEY=xkeysib-...
BREVO_SENDER_EMAIL=noreply@shturman.app
BREVO_SENDER_NAME=Штурман
```

Создать `api/emailService.js`:

```javascript
const BREVO_API = 'https://api.brevo.com/v3/smtp/email';
const API_KEY = process.env.BREVO_API_KEY;

async function sendEmail({ to, toName, subject, htmlContent }) {
  if (!API_KEY) {
    console.warn('[Email] BREVO_API_KEY not configured');
    return;
  }
  try {
    await fetch(BREVO_API, {
      method: 'POST',
      headers: {
        'api-key': API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sender: {
          email: process.env.BREVO_SENDER_EMAIL || 'noreply@shturman.app',
          name: process.env.BREVO_SENDER_NAME || 'Штурман',
        },
        to: [{ email: to, name: toName }],
        subject,
        htmlContent,
      }),
    });
  } catch (e) {
    console.error('[Email] send error', e);
  }
}

function welcomeEmail(name) {
  return `
<h2>Привет, ${name}! 👋</h2>
<p>Добро пожаловать в <strong>Штурман</strong> — твой AI-помощник в путешествиях.</p>
<p>Создай свою первую поездку и получи готовый маршрут за 60 секунд.</p>
<p>Удачных путешествий!<br>Команда Штурман 🧭</p>
`;
}

function passwordRecoveryEmail(newPassword) {
  return `
<h2>Восстановление пароля</h2>
<p>Ваш новый временный пароль: <strong>${newPassword}</strong></p>
<p>Пожалуйста, смените его после входа в приложении.</p>
`;
}

module.exports = { sendEmail, welcomeEmail, passwordRecoveryEmail };
```

В `api/server.js` добавь вызовы:

```javascript
const { sendEmail, welcomeEmail, passwordRecoveryEmail } = require('./emailService');

// После успешной регистрации:
void sendEmail({
  to: user.email,
  toName: user.name,
  subject: 'Добро пожаловать в Штурман! 🧭',
  htmlContent: welcomeEmail(user.name),
});

// После успешного recover:
void sendEmail({
  to: user.email,
  toName: user.name,
  subject: 'Штурман: восстановление пароля',
  htmlContent: passwordRecoveryEmail(newPassword),
});
```

---

## 13.5. Performance-оптимизации

### React.memo для тяжёлых компонентов

Оберни компоненты которые часто перерендериваются:

```typescript
// Карточка поездки в списке
export const TripCard = React.memo(function TripCard({ trip, onPress }: TripCardProps) {
  // ...
});

// Карточка места в плане
export const PlaceCard = React.memo(function PlaceCard({ place, onPress }: PlaceCardProps) {
  // ...
});
```

### useMemo для вычислений

```typescript
// В экране списка поездок
const sortedTrips = useMemo(() => sortTripsForUi(trips), [trips]);

// В экране маршрута
const totalCost = useMemo(
  () => trip.days.reduce((sum, day) =>
    sum + day.places.reduce((s, p) => s + (p.cost || 0), 0), 0
  ),
  [trip.days]
);
```

### FlatList вместо ScrollView для длинных списков

Если в `app/(tabs)/trips.tsx` используется `ScrollView` + `.map()` для списка поездок — замени на `FlatList`:

```tsx
<FlatList
  data={sortedTrips}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => <TripCard trip={item} onPress={() => router.push(`/trip/${item.id}`)} />}
  ItemSeparatorComponent={() => <View style={{ height: Spacing.sm }} />}
  removeClippedSubviews
  maxToRenderPerBatch={10}
  windowSize={5}
/>
```

---

## 13.6. Базовая локализация (EN)

Цель — минимальный i18n для последующего расширения.

```bash
npm install i18next react-i18next
```

Создать `i18n/ru.ts` и `i18n/en.ts`:

```typescript
// i18n/ru.ts
export default {
  common: {
    save: 'Сохранить',
    cancel: 'Отмена',
    delete: 'Удалить',
    confirm: 'Подтвердить',
    loading: 'Загрузка...',
    error: 'Ошибка',
    retry: 'Повторить',
    ok: 'Понятно',
  },
  trip: {
    create: 'Создать поездку',
    generate: 'Составить маршрут',
    save: 'Сохранить поездку',
    share: 'Поделиться',
    delete: 'Удалить поездку',
    regenerate: 'Перегенерировать',
    dayTitle: 'День {{number}}',
  },
  auth: {
    login: 'Войти',
    register: 'Регистрация',
    logout: 'Выйти',
    email: 'Email',
    password: 'Пароль',
  },
  premium: {
    upgrade: 'Перейти на Premium',
    active: 'Premium активен',
    monthly: '{{price}} / месяц',
    yearly: '{{price}} / год',
  },
} as const;
```

```typescript
// i18n/en.ts
export default {
  common: {
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    confirm: 'Confirm',
    loading: 'Loading...',
    error: 'Error',
    retry: 'Retry',
    ok: 'OK',
  },
  trip: {
    create: 'Create trip',
    generate: 'Create route',
    save: 'Save trip',
    share: 'Share',
    delete: 'Delete trip',
    regenerate: 'Regenerate',
    dayTitle: 'Day {{number}}',
  },
  auth: {
    login: 'Log in',
    register: 'Sign up',
    logout: 'Log out',
    email: 'Email',
    password: 'Password',
  },
  premium: {
    upgrade: 'Upgrade to Premium',
    active: 'Premium active',
    monthly: '{{price}} / month',
    yearly: '{{price}} / year',
  },
} as const;
```

Конфигурация `i18n/index.ts`:

```typescript
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import ru from './ru';
import en from './en';

i18n.use(initReactI18next).init({
  resources: { ru: { translation: ru }, en: { translation: en } },
  lng: Localization.getLocales()[0]?.languageCode === 'en' ? 'en' : 'ru',
  fallbackLng: 'ru',
  interpolation: { escapeValue: false },
});

export default i18n;
```

Импортировать в `app/_layout.tsx`:
```typescript
import '@/i18n';
```

Использование (постепенно, начни с нескольких ключевых строк):
```typescript
import { useTranslation } from 'react-i18next';
const { t } = useTranslation();
// <Text>{t('trip.save')}</Text>
```

> **На текущий момент можно покрыть 20–30% строк.** Полный перевод — не цель этого спринта.

---

## 13.7. E2E тест — базовый happy path

Используй **Detox** (стандарт для React Native E2E):

```bash
npm install --save-dev detox @types/detox
```

Конфигурация в `package.json`:
```json
{
  "detox": {
    "testRunner": "jest",
    "runnerConfig": "e2e/jest.config.js",
    "configurations": {
      "ios.sim.debug": {
        "device": { "type": "simulator", "device": { "type": "iPhone 15" } },
        "app": { "binaryPath": "ios/build/Build/Products/Debug-iphonesimulator/Shturman.app", "build": "xcodebuild -workspace ios/Shturman.xcworkspace -scheme Shturman -configuration Debug -sdk iphonesimulator -derivedDataPath ios/build" }
      }
    }
  }
}
```

Файл `e2e/happyPath.test.ts`:

```typescript
describe('Happy Path', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  it('should show login screen', async () => {
    await expect(element(by.text('Добро пожаловать'))).toBeVisible();
  });

  it('should login with demo credentials', async () => {
    await element(by.id('email-input')).typeText('demo@travelai.app');
    await element(by.id('password-input')).typeText('Travel123!');
    await element(by.id('login-button')).tap();
    await expect(element(by.text('Главная'))).toBeVisible();
  });

  it('should create a trip', async () => {
    await element(by.text('Создать')).tap();
    await element(by.id('destination-input')).typeText('Санкт-Петербург');
    // ... заполнить форму ...
    await element(by.id('generate-button')).tap();
    await waitFor(element(by.text('День 1'))).toBeVisible().withTimeout(15000);
  });

  it('should save trip and open it', async () => {
    await element(by.id('save-trip-button')).tap();
    await element(by.text('Поездки')).tap();
    await element(by.text('Санкт-Петербург')).tap();
    await expect(element(by.text('Маршрут'))).toBeVisible();
  });
});
```

> **Добавь `testID` к ключевым элементам** в процессе написания теста: `<TextInput testID="email-input" />`, `<TouchableOpacity testID="login-button" />` и т.д.

---

## 13.8. Настройка EAS Build для релиза

Файл `eas.json` (создать или обновить):

```json
{
  "cli": { "version": ">= 7.0.0" },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal",
      "env": { "NODE_ENV": "development" }
    },
    "preview": {
      "distribution": "internal",
      "ios": { "simulator": true },
      "env": { "NODE_ENV": "production" }
    },
    "production": {
      "env": { "NODE_ENV": "production" },
      "ios": { "autoIncrement": true },
      "android": { "autoIncrement": true }
    }
  },
  "submit": {
    "production": {
      "ios": {
        "appleId": "your@apple.id",
        "ascAppId": "17189531-e2e5-4c3f-a9b3-5061cad11d82"
      }
    }
  }
}
```

Команды релиза:
```bash
# Preview сборка для тестирования
eas build --profile preview --platform all

# Production сборка
eas build --profile production --platform all

# Отправить в App Store / Play Console
eas submit --platform all
```

---

## 13.9. Новые переменные окружения Sprint 13

```bash
# Sentry
EXPO_PUBLIC_SENTRY_DSN=https://...@o123456.ingest.sentry.io/...

# Аналитика
EXPO_PUBLIC_FIREBASE_PROJECT_ID=shturman-app
# Файлы: google-services.json (Android) + GoogleService-Info.plist (iOS)

# Email
BREVO_API_KEY=xkeysib-...
BREVO_SENDER_EMAIL=noreply@shturman.app
BREVO_SENDER_NAME=Штурман
```

---

## Критерии готовности Sprint 13

- [ ] Sentry получает тестовое событие (сделать `Sentry.captureMessage('test')` и проверить в дашборде)
- [ ] В Firebase Analytics видно событие `trip_created` после создания поездки
- [ ] Новый пользователь получает welcome email (проверить в почте)
- [ ] Детали паролей не попадают в письма (только факт события)
- [ ] FlatList заменяет ScrollView в `trips.tsx`
- [ ] E2E тест проходит без ошибок
- [ ] `npx tsc --noEmit` — 0 ошибок
- [ ] `eas build --profile preview` завершается успешно

---

---

# СПРИНТ 14 — Административная панель

**⚠️ Это отдельный веб-проект, не мобильное приложение.**  
**Стек:** Vite + React 18 + TypeScript + TanStack Query + shadcn/ui + Tailwind CSS  
**Репозиторий:** `D:\travel_admin\` (отдельная папка, не в travel_app)  
**Срок:** 2 недели

---

## 14.1. Создать проект

```bash
npm create vite@latest travel_admin -- --template react-ts
cd travel_admin
npm install
npm install @tanstack/react-query axios react-router-dom recharts
npx shadcn-ui@latest init
```

Структура:
```
travel_admin/
  src/
    api/          # HTTP-клиенты к backend
    components/   # shadcn компоненты + кастомные
    pages/        # страницы
      Dashboard.tsx
      Users.tsx
      Cities.tsx
      Places.tsx
      Routes.tsx
      Reviews.tsx
    hooks/        # useQuery, useAuth
    types/        # TypeScript типы (копия из mobile)
  .env            # VITE_API_URL=http://localhost:8787
```

---

## 14.2. Новые backend эндпоинты для Admin

Файл: `api/server.js`

Все `/admin/*` маршруты требуют **admin-роль** в JWT. Нужно:

1. Добавить поле `role: 'user' | 'admin'` в таблицу users (миграция в `storage.js`)
2. Создать первого админа вручную (SQL или через JSON):
   ```bash
   # В JSON режиме: открыть api/data/app-db.json и добавить role: "admin" к нужному пользователю
   ```
3. Включить `role` в JWT payload при логине
4. Добавить middleware `requireAdminUser(req)`:

```javascript
async function requireAdminUser(req) {
  const { user, error } = await requireAccessUser(req);
  if (error) return { error };
  if (user.role !== 'admin') return { error: 'FORBIDDEN' };
  return { user };
}
```

### Список admin эндпоинтов:

```
GET    /admin/stats          → DAU, WAU, MAU, кол-во поездок, конверсия Premium
GET    /admin/users          → список пользователей (пагинация, поиск по email)
PATCH  /admin/users/:id      → изменить роль, заблокировать
DELETE /admin/users/:id      → удалить пользователя и все данные

GET    /admin/cities         → список городов с кол-вом мест
POST   /admin/cities         → добавить город
PATCH  /admin/cities/:id     → обновить
DELETE /admin/cities/:id     → удалить

GET    /admin/places?city=   → список мест (с accessible данными)
POST   /admin/places         → добавить место
PATCH  /admin/places/:id     → обновить (включая accessible)
DELETE /admin/places/:id     → удалить

GET    /admin/reviews        → все отзывы (пагинация, статус: pending/approved/rejected)
PATCH  /admin/reviews/:id    → одобрить / отклонить
DELETE /admin/reviews/:id    → удалить
```

> **Важно:** Города и места пока хранятся в `cityPlaces.ts` как JS-константы. Для полноценного admin panel нужно перенести их в базу данных. Это архитектурное изменение — сначала создай таблицы `cities` и `places` в `storage.js`, напиши миграцию импорта из `cityPlaces.ts`.

---

## 14.3. Dashboard страница

```tsx
// pages/Dashboard.tsx
import { useQuery } from '@tanstack/react-query';
import { AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

function Dashboard() {
  const { data: stats } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: () => adminApi.getStats(),
  });

  return (
    <div className="p-6 grid grid-cols-4 gap-4">
      <StatCard title="MAU" value={stats?.mau} icon="👥" trend="+12%" />
      <StatCard title="Поездок сегодня" value={stats?.tripsToday} icon="✈️" />
      <StatCard title="Premium активных" value={stats?.premiumUsers} icon="✨" />
      <StatCard title="Конверсия" value={`${stats?.conversionRate}%`} icon="📈" />

      <div className="col-span-4">
        <h2>Новые пользователи (30 дней)</h2>
        <AreaChart width={800} height={300} data={stats?.dailyUsers}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="count" stroke="#1B3A6B" fill="#EEF1F7" />
        </AreaChart>
      </div>
    </div>
  );
}
```

---

## 14.4. Таблица пользователей

```tsx
// pages/Users.tsx
import { useQuery, useMutation } from '@tanstack/react-query';

function Users() {
  const [search, setSearch] = useState('');
  const { data } = useQuery({
    queryKey: ['admin-users', search],
    queryFn: () => adminApi.getUsers({ search, page: 1 }),
  });

  const blockUser = useMutation({
    mutationFn: (userId: string) => adminApi.patchUser(userId, { blocked: true }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-users'] }),
  });

  return (
    <div>
      <input placeholder="Поиск по email..." value={search} onChange={e => setSearch(e.target.value)} />
      <table>
        <thead><tr><th>Email</th><th>Имя</th><th>Регистрация</th><th>Premium</th><th>Поездок</th><th>Действия</th></tr></thead>
        <tbody>
          {data?.users.map(user => (
            <tr key={user.id}>
              <td>{user.email}</td>
              <td>{user.name}</td>
              <td>{new Date(user.createdAt).toLocaleDateString('ru')}</td>
              <td>{user.isPremium ? '✨' : '—'}</td>
              <td>{user.tripsCount}</td>
              <td>
                <button onClick={() => blockUser.mutate(user.id)}>Заблокировать</button>
                <button onClick={() => adminApi.deleteUser(user.id)}>Удалить</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

---

## 14.5. Редактор мест с ♿ атрибутами

```tsx
// pages/Places.tsx — форма редактирования места
function PlaceEditForm({ place, onSave }: { place: Place; onSave: (p: Place) => void }) {
  const [form, setForm] = useState(place);

  return (
    <form onSubmit={e => { e.preventDefault(); onSave(form); }}>
      <input placeholder="Название" value={form.name} onChange={...} />
      <input placeholder="Адрес" value={form.address} onChange={...} />
      <input type="number" placeholder="lat" value={form.lat} onChange={...} />
      <input type="number" placeholder="lng" value={form.lng} onChange={...} />

      <fieldset>
        <legend>♿ Доступность</legend>
        <label>
          <input type="checkbox" checked={form.accessible?.wheelchair}
            onChange={e => setForm(f => ({ ...f, accessible: { ...f.accessible, wheelchair: e.target.checked } }))} />
          Для колясочников
        </label>
        <label>
          <input type="checkbox" checked={form.accessible?.audioGuide} onChange={...} />
          Аудиогид
        </label>
        <label>
          <input type="checkbox" checked={form.accessible?.braille} onChange={...} />
          Таблички Брайля
        </label>
        <textarea placeholder="Примечания о доступности"
          value={form.accessible?.notes ?? ''} onChange={...} />
      </fieldset>

      <button type="submit">Сохранить</button>
    </form>
  );
}
```

---

## 14.6. Модерация отзывов

```tsx
// pages/Reviews.tsx
function Reviews() {
  const { data } = useQuery({
    queryKey: ['admin-reviews', 'pending'],
    queryFn: () => adminApi.getReviews({ status: 'pending' }),
  });

  const approve = useMutation({ mutationFn: (id: string) => adminApi.approveReview(id) });
  const reject = useMutation({ mutationFn: (id: string) => adminApi.rejectReview(id) });

  return (
    <div>
      {data?.reviews.map(review => (
        <div key={review.id} className="border p-4 mb-4 rounded">
          <div className="flex gap-2">
            {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
            <span>{review.placeName}</span>
            <span>{new Date(review.createdAt).toLocaleDateString('ru')}</span>
          </div>
          <p>{review.text}</p>
          {review.accessibilityRating && (
            <p>♿ {review.accessibilityRating}: {review.accessibilityComment}</p>
          )}
          <div className="flex gap-2 mt-2">
            <button onClick={() => approve.mutate(review.id)} className="bg-green-500 text-white px-4 py-1 rounded">
              Одобрить
            </button>
            <button onClick={() => reject.mutate(review.id)} className="bg-red-500 text-white px-4 py-1 rounded">
              Отклонить
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
```

---

## Критерии готовности Sprint 14

- [ ] Admin panel запускается локально (`npm run dev`)
- [ ] Вход только через аккаунт с `role: "admin"` — обычный пользователь получает 403
- [ ] Dashboard показывает реальные цифры из backend
- [ ] Список пользователей с поиском и пагинацией работает
- [ ] Место можно создать/редактировать/удалить, ♿ атрибуты сохраняются
- [ ] Отзывы можно одобрить или отклонить

---

## Итоговая таблица новых .env переменных по всем спринтам

| Спринт | Переменная | Описание |
|--------|-----------|----------|
| 11 | — | Только `google-services.json`, `GoogleService-Info.plist` |
| 12 | `OPENAI_API_KEY` | Ключ OpenAI (только backend, не EXPO_PUBLIC_) |
| 12 | `OPENAI_MODEL` | Модель: `gpt-4o` или `gpt-4o-mini` |
| 13 | `EXPO_PUBLIC_SENTRY_DSN` | DSN из sentry.io |
| 13 | `BREVO_API_KEY` | Ключ Brevo (только backend) |
| 13 | `BREVO_SENDER_EMAIL` | От кого отправляем письма |
| 14 | `VITE_API_URL` | URL backend для admin panel |

---

## Зависимости между спринтами 11–14

```
Sprint 2 (OAuth — авторизация)
  └─► Sprint 11 (Premium — нужен accessToken для /subscription/validate)
  └─► Sprint 14 (Admin — нужен role в JWT)

Sprint 7 (Wallet — localfiles)
  └─► Sprint 11 (Premium gate для Wallet)

Sprint 8 (Offline)
  └─► Sprint 11 (Premium gate для Offline)

Sprint 11 (Premium)
  └─► Sprint 12 (AI — только для Premium)

Sprint 10 (Reviews — SQLite таблица)
  └─► Sprint 14 (Admin — модерация через API)
```

---

*Документ подготовлен: Апрель 2026. Штурман v2.0.*
