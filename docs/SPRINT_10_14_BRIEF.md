# Техническое задание для разработчика
## Спринты 10–14: Отзывы, Premium, AI-генерация, Аналитика/Релиз, Административная панель

**Проект:** Штурман — AI Travel Planner  
**Bundle ID:** `com.travelai.app` · **Scheme:** `travelai`  
**Стек (приложение):** React Native Expo ~51, TypeScript strict, Zustand, expo-router, expo-sqlite, Node.js backend (порт 8787)  
**Стек (Admin Panel, Sprint 14):** Vite + React 18 + TypeScript + TanStack Query + shadcn/ui  
**EAS Project ID:** `17189531-e2e5-4c3f-a9b3-5061cad11d82`  
**Дата документа:** Апрель 2026

---

## Обязательно прочитай перед началом

### Что уже сделано (Спринты 1–9)

- ✅ **1–2:** Email/пароль авторизация + OAuth (Яндекс/Google/Apple demo-режим), JWT-сессия, удаление аккаунта
- ✅ **3:** Интерактивная карта (`react-native-maps`), маркеры/полилинии по дням, попап → Яндекс Навигатор
- ✅ **4:** Редактирование маршрута (`addPlaceToDay`, `removePlaceFromDay`, `movePlaceInDay`), `AddPlaceModal`, swipe-delete, прогноз погоды (`WeatherWidget`)
- ✅ **5:** Модуль доступности ♿ (`AccessibilityInfo` на `Place`, `AccessibilityPopup`, фильтр), Dark Mode (`ThemeProvider`, `useTheme()`, `LightColors`/`DarkColors`)
- ✅ **6:** Push-уведомления (`expo-notifications`, `notificationsService.ts`) — напоминания за 7 дней, 1 день, день отправления, после поездки
- ✅ **7:** Travel Wallet (`walletDb.ts`, `DocumentCard`, привязка PDF/фото к поездке)
- ✅ **8:** Offline-режим (`useNetworkStatus`, `OfflineBanner`, `offlineService.ts` — кэш в AsyncStorage)
- ✅ **9:** Travel Mode (`/travel-mode/[id].tsx`), шаринг маршрута (`shareService.ts`)

### Структура репозитория

```
D:\travel_app\
  app/
    _layout.tsx               # root layout: ThemeProvider, GestureHandler, SafeArea
    (tabs)/                   # home, create, trips, discover, profile
    (auth)/                   # login, register, forgot
    (profile)/
      notifications.tsx       # настройки уведомлений
      my-reviews.tsx          # список своих отзывов ← SPRINT 10 ✅
    (wallet)/                 # Travel Wallet экраны
    (premium)/                # ← создать в SPRINT 11
    trip/
      _layout.tsx
      create.tsx
      generating.tsx
      transport-select.tsx
      hotel-select.tsx
      result.tsx              # только что сгенерированная поездка
      [id].tsx                # сохранённая поездка
    travel-mode/[id].tsx
  components/
    ui/                       # Button, Input, Card, Badge...
    auth/OAuthButtons.tsx
    TripMap.tsx / TripMap.native.tsx / TripMap.web.tsx
    WeatherWidget.tsx
    AccessibilityPopup.tsx
    AddPlaceModal.tsx
    AddReviewModal.tsx        # ← SPRINT 10 ✅
    ReviewsList.tsx           # ← SPRINT 10 ✅
  constants/
    data.ts                   # все TypeScript-типы: Trip, Place, DayPlan, Review, TripDocument...
    cityPlaces.ts             # база мест ~200 объектов, auto-координаты
    colors.ts                 # LightColors, DarkColors
    theme.ts                  # Spacing, Typography, BorderRadius, Shadows
  store/
    useStore.ts               # Zustand AppStore — главный стейт
    authApi.ts                # HTTP-клиент к backend
    authStorage.ts            # JWT сессия (AsyncStorage)
    tripGenerator.ts          # шаблонная генерация Trip
    tripsDb.ts                # SQLite CRUD поездок
    walletDb.ts               # SQLite документы (Sprint 7)
    reviewsDb.ts              # SQLite отзывы ← SPRINT 10 ✅
    notificationsService.ts   # push (Sprint 6)
    offlineService.ts         # кэш оффлайн (Sprint 8)
    shareService.ts           # шаринг текста (Sprint 9)
    deepLinksService.ts       # Яндекс Путешествия / Островок deep links
    weatherApi.ts             # OpenWeatherMap 5-day forecast
  hooks/
    useTheme.ts               # ThemeContext + useTheme()
    useNetworkStatus.ts       # isOnline
  providers/
    ThemeProvider.tsx         # light / dark / system
  api/                        # Node.js backend
    server.js                 # все HTTP-маршруты (порт 8787)
    storage.js                # Storage class (JSON-файл или PostgreSQL)
    emailService.js           # ← создать в SPRINT 13
    tripPromptBuilder.js      # ← создать в SPRINT 12
  .env                        # переменные окружения
  app.json                    # Expo конфиг
```

### Как запустить локально

```bash
# Терминал 1 — backend
node --env-file=.env api/server.js
# → http://localhost:8787

# Терминал 2 — Expo
npx expo start --clear
# QR для телефона или http://localhost:8081 (веб)
```

### Обязательные правила кода

1. `npx tsc --noEmit` = 0 ошибок после каждой задачи
2. Цвета — `const { colors } = useTheme()`, **никогда** не `Colors.xxx` напрямую
3. Стили — `StyleSheet.create({})`, инлайн только для динамических значений
4. Новые пакеты — `npx expo install`, не `npm install`
5. Каждое поле интерфейса, которое может отсутствовать — `optional (?)`

---

---

# СПРИНТ 10 — Отзывы и рейтинги

> **Статус: ✅ РЕАЛИЗОВАН.** Читай этот раздел, чтобы понять, что уже сделано — для следующих спринтов ты будешь опираться на эти компоненты.

---

## Что реализовано

### Тип Review (constants/data.ts)

```typescript
export interface Review {
  id: string;
  tripId: string;
  placeId: string;
  placeName: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
  photos: string[];           // массив URI файлов
  createdAt: string;          // ISO 8601
  accessibilityRating?: 'yes' | 'no' | 'partial' | 'unknown';
  accessibilityComment?: string;
}
```

### store/reviewsDb.ts — SQLite CRUD

Функции, которые уже есть и которые можно импортировать:

```typescript
import {
  initReviewsDb,         // вызывается при старте приложения
  addReview,             // (review: Review) => Promise<void>
  getReviewsForPlace,    // (placeId: string) => Promise<Review[]>
  getReviewsForTrip,     // (tripId: string) => Promise<Review[]>
  getAllReviews,          // () => Promise<Review[]>
  deleteReview,          // (reviewId: string) => Promise<void>
} from '@/store/reviewsDb';
```

На вебе — AsyncStorage (`reviews.list.v1`), на мобиле — SQLite таблица `reviews`.

### store/useStore.ts — actions

В `AppStore` уже есть:

```typescript
addReview: (review: Review) => Promise<void>;
getReviewsForPlace: (placeId: string) => Promise<Review[]>;
getMyReviews: () => Promise<Review[]>;
deleteReview: (reviewId: string) => Promise<void>;
```

### Компоненты

**`components/AddReviewModal.tsx`** — bottom sheet для создания отзыва:
- Звёздный рейтинг (1–5 звёзд)
- Текстовое поле
- ♿-блок: radio-кнопки «Доступно / Частично / Нет / Не знаю» + текстовый комментарий
- Кнопки «Сохранить» / «Отмена»

**`components/ReviewsList.tsx`** — список отзывов для места:
- Карточка с аватаром, именем, датой, звёздами, текстом
- ♿-значок если `accessibilityRating = 'yes'`

**`app/(profile)/my-reviews.tsx`** — список всех отзывов пользователя с возможностью удалить.

### Интеграция в trip/[id].tsx и trip/result.tsx

В обоих файлах:
- Кнопка «Отзыв» на карточке места (только для поездок со статусом `past`)
- При нажатии открывается `AddReviewModal`
- Под каждым местом — `ReviewsList` с отзывами

---

---

# СПРИНТ 11 — Premium-подписка (In-App Purchase)

**Цель:** Монетизация. Free-tier = 3 поездки/месяц. Premium = безлимит + доступ к оффлайн-режиму, Travel Wallet и AI-генерации.  
**Срок:** 2 недели

---

## 11.1. Подготовить продукты в магазинах

### App Store Connect (iOS)
1. [appstoreconnect.apple.com](https://appstoreconnect.apple.com) → My Apps → Штурман
2. In-App Purchases → **+** → Auto-Renewable Subscription
3. Создать два продукта:
   - `com.travelai.app.premium_monthly` — «Premium (месяц)», Tier 3 (~299 ₽)
   - `com.travelai.app.premium_yearly` — «Premium (год)», Tier 10 (~1 990 ₽)
4. Группа подписок: создать «Premium»

### Google Play Console (Android)
1. Play Console → Monetize → Subscriptions
2. Те же два Product ID

### Установить библиотеку

```bash
npx expo install react-native-iap
```

Добавить в `app.json` в секцию `plugins`:
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
  yearly:  'com.travelai.app.premium_yearly',
} as const;

export type SubscriptionPlan = 'none' | 'monthly' | 'yearly';

export interface SubscriptionState {
  plan: SubscriptionPlan;
  expiresAt: string | null;   // ISO 8601
  originalOrderId: string | null;
}

const SUBSCRIPTION_KEY = 'app.subscription.v1';
export const FREE_TRIP_LIMIT = 3;

// ─── Инициализация ────────────────────────────────────────────────────────────

export async function initIAP(): Promise<void> {
  if (Platform.OS === 'web') return;
  try {
    await RNIap.initConnection();
  } catch (err) {
    console.warn('[IAP] initConnection failed', err);
  }
}

export async function destroyIAP(): Promise<void> {
  if (Platform.OS === 'web') return;
  try {
    await RNIap.endConnection();
  } catch { /* ignore */ }
}

// ─── Получить продукты ────────────────────────────────────────────────────────

export async function getSubscriptionProducts(): Promise<RNIap.Subscription[]> {
  if (Platform.OS === 'web') return [];
  try {
    const products = await RNIap.getSubscriptions({
      skus: [PRODUCT_IDS.monthly, PRODUCT_IDS.yearly],
    });
    return products;
  } catch (err) {
    console.warn('[IAP] getSubscriptions failed', err);
    return [];
  }
}

// ─── Купить подписку ──────────────────────────────────────────────────────────

export async function purchaseSubscription(
  productId: string
): Promise<{ ok: boolean; purchase?: RNIap.SubscriptionPurchase; message?: string }> {
  if (Platform.OS === 'web') {
    return { ok: false, message: 'IAP недоступен в браузере' };
  }
  try {
    const purchase = await RNIap.requestSubscription({ sku: productId });
    if (!purchase) return { ok: false, message: 'Покупка не завершена' };
    // Приводим к единому типу (requestSubscription может вернуть массив или объект)
    const p = Array.isArray(purchase) ? purchase[0] : purchase;
    if (!p) return { ok: false, message: 'Покупка не завершена' };
    return { ok: true, purchase: p as RNIap.SubscriptionPurchase };
  } catch (err: unknown) {
    const e = err as { code?: string; message?: string };
    if (e?.code === 'E_USER_CANCELLED') {
      return { ok: false, message: 'Отменено пользователем' };
    }
    console.warn('[IAP] requestSubscription failed', err);
    return { ok: false, message: 'Ошибка покупки. Попробуй позже.' };
  }
}

// ─── Восстановить покупки ─────────────────────────────────────────────────────

export async function restorePurchases(): Promise<{ ok: boolean; active: boolean }> {
  if (Platform.OS === 'web') return { ok: true, active: false };
  try {
    const purchases = await RNIap.getAvailablePurchases();
    const validIds = new Set(Object.values(PRODUCT_IDS) as string[]);
    const activePurchase = purchases.find(
      (p) => validIds.has(p.productId) && 'expirationDateMs' in p
    );
    if (activePurchase) {
      await activateSubscriptionFromPurchase(
        activePurchase as RNIap.SubscriptionPurchase
      );
      return { ok: true, active: true };
    }
    return { ok: true, active: false };
  } catch (err) {
    console.warn('[IAP] restorePurchases failed', err);
    return { ok: false, active: false };
  }
}

// ─── Сохранить/загрузить состояние подписки ───────────────────────────────────

export async function saveSubscriptionState(state: SubscriptionState): Promise<void> {
  await AsyncStorage.setItem(SUBSCRIPTION_KEY, JSON.stringify(state));
}

export async function loadSubscriptionState(): Promise<SubscriptionState> {
  const raw = await AsyncStorage.getItem(SUBSCRIPTION_KEY);
  if (!raw) return { plan: 'none', expiresAt: null, originalOrderId: null };
  try {
    return JSON.parse(raw) as SubscriptionState;
  } catch {
    return { plan: 'none', expiresAt: null, originalOrderId: null };
  }
}

export function isPremiumActive(state: SubscriptionState): boolean {
  if (state.plan === 'none') return false;
  if (!state.expiresAt) return false;
  return new Date(state.expiresAt) > new Date();
}

// ─── Активировать по данным покупки ──────────────────────────────────────────

export async function activateSubscriptionFromPurchase(
  purchase: RNIap.SubscriptionPurchase
): Promise<void> {
  const isMonthly = purchase.productId === PRODUCT_IDS.monthly;
  const expiresAt = 'expirationDateMs' in purchase && purchase.expirationDateMs
    ? new Date(Number(purchase.expirationDateMs)).toISOString()
    : new Date(Date.now() + (isMonthly ? 30 : 365) * 86400_000).toISOString();

  await saveSubscriptionState({
    plan: isMonthly ? 'monthly' : 'yearly',
    expiresAt,
    originalOrderId: purchase.originalOrderId ?? purchase.transactionId ?? null,
  });
}

// ─── Подсчёт поездок в текущем месяце ────────────────────────────────────────

export function countTripsThisMonth(trips: { startDate: string }[]): number {
  const now = new Date();
  return trips.filter((t) => {
    const d = new Date(t.startDate);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }).length;
}
```

---

## 11.3. Расширить AppStore в store/useStore.ts

Добавить в интерфейс `AppStore`:

```typescript
import { SubscriptionState, SubscriptionPlan } from '@/store/subscriptionService';

// В интерфейс AppStore:
subscription: SubscriptionState;
loadSubscription: () => Promise<void>;
activateSubscription: (plan: SubscriptionPlan, expiresAt: string) => Promise<void>;
isPremium: () => boolean;
canCreateTrip: () => boolean;      // false если Free-tier и лимит исчерпан
```

Реализация (добавить в `create<AppStore>()`):

```typescript
subscription: { plan: 'none', expiresAt: null, originalOrderId: null },

loadSubscription: async () => {
  const state = await loadSubscriptionState();
  set({ subscription: state });
},

activateSubscription: async (plan, expiresAt) => {
  const newState: SubscriptionState = {
    plan,
    expiresAt,
    originalOrderId: null,
  };
  await saveSubscriptionState(newState);
  set({ subscription: newState });
},

isPremium: () => {
  return isPremiumActive(get().subscription);
},

canCreateTrip: () => {
  if (isPremiumActive(get().subscription)) return true;
  const count = countTripsThisMonth(get().trips);
  return count < FREE_TRIP_LIMIT;
},
```

Вызвать `loadSubscription()` в `hydrateAuth`:

```typescript
hydrateAuth: async () => {
  // ...существующий код...
  await get().loadSubscription();  // добавить эту строку
},
```

---

## 11.4. Бэкенд — валидация чека (api/server.js)

Добавить endpoint для проверки чека (необходим для надёжной Premium-активации в продакшне):

```javascript
// POST /subscription/validate
// Body: { platform: 'ios' | 'android', receiptData: string, productId: string }
// Headers: Authorization: Bearer <accessToken>
router.post('/subscription/validate', requireAuth, async (req, res) => {
  const { platform, receiptData, productId } = req.body;
  if (!platform || !receiptData || !productId) {
    return res.json({ ok: false, message: 'platform, receiptData и productId обязательны' });
  }

  // В dev-режиме: всегда возвращаем активную подписку (для тестирования)
  if (!IS_PROD) {
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
    return res.json({ ok: true, active: true, expiresAt, plan: 'monthly' });
  }

  // В prod: здесь нужно вызвать Apple/Google API для верификации
  // Apple: POST https://buy.itunes.apple.com/verifyReceipt
  // Google: Google Play Developer API
  // Это сложная интеграция — её можно сделать позже.
  // Пока возвращаем заглушку:
  return res.json({ ok: false, message: 'Валидация чека в production ещё не реализована' });
});
```

> **Примечание:** Полная валидация чеков Apple/Google — отдельная задача. Для MVP достаточно dev-режима и активации на стороне клиента.

---

## 11.5. Экран Premium

**Файл:** `app/(premium)/index.tsx` (создать)

Что должно быть на экране:
- Hero с иконкой ✨ и заголовком «Штурман Premium»
- Список преимуществ Premium (безлимит поездок, AI, оффлайн, wallet)
- Две кнопки: «Месяц — 299 ₽» и «Год — 1 990 ₽»
- Ссылка «Восстановить покупки»
- Если пользователь уже Premium — показывать статус и дату окончания

```typescript
import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/hooks/useTheme';
import { useStore } from '@/store/useStore';
import {
  initIAP, destroyIAP, getSubscriptionProducts,
  purchaseSubscription, restorePurchases,
  activateSubscriptionFromPurchase, PRODUCT_IDS,
} from '@/store/subscriptionService';
import { Spacing, Typography, BorderRadius } from '@/constants/theme';
import type { Subscription } from 'react-native-iap';

const PERKS = [
  { icon: 'infinite-outline',    text: 'Безлимитные поездки' },
  { icon: 'sparkles-outline',    text: 'AI-генерация маршрутов' },
  { icon: 'cloud-offline-outline', text: 'Оффлайн-режим' },
  { icon: 'documents-outline',   text: 'Travel Wallet (документы)' },
  { icon: 'notifications-outline', text: 'Приоритетная поддержка' },
];

export default function PremiumScreen() {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const { subscription, loadSubscription, activateSubscription } = useStore();

  const [products, setProducts] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    let mounted = true;
    const init = async () => {
      await initIAP();
      const subs = await getSubscriptionProducts();
      if (mounted) {
        setProducts(subs);
        setInitializing(false);
      }
    };
    void init();
    return () => {
      mounted = false;
      void destroyIAP();
    };
  }, []);

  const handleBuy = async (productId: string) => {
    setLoading(true);
    const result = await purchaseSubscription(productId);
    if (result.ok && result.purchase) {
      await activateSubscriptionFromPurchase(result.purchase);
      await loadSubscription();
      router.back();
    }
    setLoading(false);
  };

  const handleRestore = async () => {
    setLoading(true);
    const result = await restorePurchases();
    if (result.active) await loadSubscription();
    setLoading(false);
  };

  const isActive = subscription.plan !== 'none' && subscription.expiresAt
    ? new Date(subscription.expiresAt) > new Date()
    : false;

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={[styles.content, { paddingTop: insets.top + 24, paddingBottom: insets.bottom + 32 }]}
    >
      {/* Hero */}
      <View style={styles.hero}>
        <Text style={styles.heroIcon}>✨</Text>
        <Text style={[styles.heroTitle, { color: colors.text }]}>Штурман Premium</Text>
        <Text style={[styles.heroSub, { color: colors.textSecondary }]}>
          {isActive
            ? `Активна до ${new Date(subscription.expiresAt!).toLocaleDateString('ru-RU')}`
            : 'Открой все возможности планировщика'}
        </Text>
      </View>

      {/* Perks */}
      <View style={[styles.perksList, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        {PERKS.map((perk, i) => (
          <View key={perk.text} style={[styles.perkRow, i < PERKS.length - 1 && { borderBottomWidth: 1, borderBottomColor: colors.border }]}>
            <Ionicons name={perk.icon as keyof typeof Ionicons.glyphMap} size={22} color={colors.primary} />
            <Text style={[styles.perkText, { color: colors.text }]}>{perk.text}</Text>
          </View>
        ))}
      </View>

      {/* Buttons */}
      {!isActive && (
        initializing ? (
          <ActivityIndicator color={colors.primary} style={{ marginTop: 32 }} />
        ) : (
          <View style={styles.btnGroup}>
            <TouchableOpacity
              style={[styles.btn, { backgroundColor: colors.primary }, loading && styles.btnDisabled]}
              onPress={() => void handleBuy(PRODUCT_IDS.monthly)}
              disabled={loading}
            >
              <Text style={styles.btnText}>Месяц — 299 ₽</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.btn, styles.btnSecondary, { borderColor: colors.primary }, loading && styles.btnDisabled]}
              onPress={() => void handleBuy(PRODUCT_IDS.yearly)}
              disabled={loading}
            >
              <Text style={[styles.btnText, { color: colors.primary }]}>Год — 1 990 ₽ · экономия 42%</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => void handleRestore()} style={styles.restoreBtn} disabled={loading}>
              <Text style={[styles.restoreText, { color: colors.textSecondary }]}>Восстановить покупки</Text>
            </TouchableOpacity>
          </View>
        )
      )}

      {loading && <ActivityIndicator color={colors.primary} style={{ marginTop: 16 }} />}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { paddingHorizontal: Spacing.lg, gap: Spacing.lg },
  hero: { alignItems: 'center', gap: Spacing.sm, marginBottom: Spacing.md },
  heroIcon: { fontSize: 56 },
  heroTitle: { fontSize: Typography.sizes['2xl'], fontWeight: Typography.weights.bold, textAlign: 'center' },
  heroSub: { fontSize: Typography.sizes.base, textAlign: 'center' },
  perksList: { borderRadius: BorderRadius.xl, borderWidth: 1, overflow: 'hidden' },
  perkRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, padding: Spacing.md },
  perkText: { fontSize: Typography.sizes.base, flex: 1 },
  btnGroup: { gap: Spacing.md },
  btn: { borderRadius: BorderRadius.xl, padding: Spacing.md, alignItems: 'center' },
  btnSecondary: { backgroundColor: 'transparent', borderWidth: 2 },
  btnDisabled: { opacity: 0.5 },
  btnText: { fontSize: Typography.sizes.base, fontWeight: Typography.weights.bold, color: '#fff' },
  restoreBtn: { alignItems: 'center', paddingVertical: Spacing.sm },
  restoreText: { fontSize: Typography.sizes.sm },
});
```

---

## 11.6. Premium-гейты

### Гейт на создание поездки (trip/create.tsx)

В функции «Начать генерацию» проверяй лимит:

```typescript
const canCreateTrip = useStore((s) => s.canCreateTrip);

const handleGenerate = () => {
  if (!canCreateTrip()) {
    Alert.alert(
      'Лимит поездок',
      'В бесплатной версии можно создать 3 поездки в месяц. Оформи Premium для безлимитных путешествий.',
      [
        { text: 'Отмена', style: 'cancel' },
        { text: 'Premium', onPress: () => router.push('/(premium)') },
      ]
    );
    return;
  }
  router.push('/trip/generating');
};
```

### Гейт на Wallet (app/(wallet)/index.tsx)

```typescript
const isPremium = useStore((s) => s.isPremium());

if (!isPremium) {
  return (
    <View style={styles.gate}>
      <Text style={styles.gateEmoji}>🔒</Text>
      <Text style={styles.gateTitle}>Travel Wallet — функция Premium</Text>
      <Button title="Открыть Premium" onPress={() => router.push('/(premium)')} />
    </View>
  );
}
```

### Premium-бейдж в профиле (app/(tabs)/profile.tsx)

Добавить строку в «Мой аккаунт»:

```typescript
const isPremium = useStore((s) => s.isPremium());

// В JSX рядом с именем пользователя:
{isPremium && (
  <View style={styles.premiumBadge}>
    <Text style={styles.premiumBadgeText}>✨ Premium</Text>
  </View>
)}
```

---

## Критерии приёмки Sprint 11

- [ ] `npx tsc --noEmit` — 0 ошибок
- [ ] `store/subscriptionService.ts` создан, все функции экспортированы
- [ ] В `AppStore`: `subscription`, `loadSubscription`, `activateSubscription`, `isPremium`, `canCreateTrip`
- [ ] `app/(premium)/index.tsx` открывается при нажатии на кнопку из профиля
- [ ] На iOS Simulator: продукты загружаются (или заглушка в dev), purchase flow проходит
- [ ] Гейт на 3 поездки/месяц работает
- [ ] Premium-бейдж отображается в профиле после активации

---

---

# СПРИНТ 12 — AI-генерация маршрутов

**Цель:** Замена шаблонного генератора на GPT-4o. При недоступности API — автоматический fallback на шаблонный генератор.  
**Требование:** функция доступна только для Premium-пользователей.  
**Срок:** 2 недели

---

## 12.1. Создать api/tripPromptBuilder.js

```javascript
// api/tripPromptBuilder.js

const SYSTEM_PROMPT = `Ты — профессиональный travel-планировщик для путешествий по России.
Тебе на вход передаётся форма поездки. Ты возвращаешь JSON объекта Trip.
Отвечай СТРОГО JSON-объектом без пояснений и markdown.
Используй только реально существующие места с точными адресами.
Пиши на русском языке.`;

function buildUserPrompt(form) {
  const days = [];
  const start = new Date(form.startDate);
  const end = new Date(form.endDate);
  const diffMs = end.getTime() - start.getTime();
  const daysCount = Math.max(1, Math.min(14, Math.ceil(diffMs / 86400000) + 1));

  return `Создай подробный маршрут для поездки:
- Откуда: ${form.from}
- Куда: ${form.to}
- Даты: ${form.startDate} — ${form.endDate} (${daysCount} дней)
- Бюджет: ${form.budget} ₽ на ${form.travelers} чел.
- Стиль: ${form.travelStyle}
- Интересы: ${(form.interests || []).join(', ')}
- Доступность ♿: ${form.needsAccessibility ? 'требуется' : 'не требуется'}

Верни JSON следующей структуры (заполни полностью):
{
  "days": [
    {
      "day": 1,
      "date": "дата в формате 'DD месяц'",
      "places": [
        {
          "id": "уникальный-id",
          "name": "Название места",
          "category": "Музей|Парк|Ресторан|Достопримечательность|...",
          "description": "2-3 предложения",
          "duration": "2 часа",
          "time": "10:00",
          "rating": 4.7,
          "address": "Точный адрес",
          "emoji": "🏛️",
          "price": "500 ₽",
          "lat": 55.7558,
          "lng": 37.6173
        }
      ]
    }
  ],
  "coverImage": "https://images.unsplash.com/photo-... (реальная ссылка на город)",
  "totalActivities": 15000,
  "totalFood": 12000
}

Требования:
- ${daysCount} дней в массиве days
- 3-5 мест каждый день
- Первое место — утреннее (9:00-11:00), последнее — вечернее
- Координаты lat/lng должны быть точными для каждого места
${form.needsAccessibility ? '- Все места должны быть wheelchair-accessible' : ''}`;
}

module.exports = { SYSTEM_PROMPT, buildUserPrompt };
```

---

## 12.2. Добавить endpoint в api/server.js

```javascript
const { SYSTEM_PROMPT, buildUserPrompt } = require('./tripPromptBuilder');
const https = require('https');

// POST /api/generate-trip
// Headers: Authorization: Bearer <accessToken>
// Body: TripForm
app.post('/api/generate-trip', requireAuth, async (req, res) => {
  const form = req.body;
  if (!form?.to || !form?.from || !form?.startDate) {
    return res.json({ ok: false, message: 'Не хватает полей: from, to, startDate' });
  }

  // В production — проверяем Premium
  if (IS_PROD) {
    const user = await storage.getUserById(req.userId);
    if (!user?.isPremium) {
      return res.json({ ok: false, message: 'Функция доступна только для Premium' });
    }
  }

  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
  if (!OPENAI_API_KEY) {
    return res.json({ ok: false, message: 'OPENAI_API_KEY не задан' });
  }

  const userPrompt = buildUserPrompt(form);
  const requestBody = JSON.stringify({
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: userPrompt },
    ],
    response_format: { type: 'json_object' },
    max_tokens: 4000,
    temperature: 0.7,
  });

  try {
    const result = await new Promise((resolve, reject) => {
      const options = {
        hostname: 'api.openai.com',
        path: '/v1/chat/completions',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Length': Buffer.byteLength(requestBody),
        },
        timeout: 30000,
      };
      const reqHttp = https.request(options, (response) => {
        let data = '';
        response.on('data', (chunk) => { data += chunk; });
        response.on('end', () => {
          try { resolve(JSON.parse(data)); }
          catch (e) { reject(new Error('Невалидный JSON от OpenAI')); }
        });
      });
      reqHttp.on('timeout', () => { reqHttp.destroy(); reject(new Error('Timeout')); });
      reqHttp.on('error', reject);
      reqHttp.write(requestBody);
      reqHttp.end();
    });

    const content = result?.choices?.[0]?.message?.content;
    if (!content) return res.json({ ok: false, message: 'Пустой ответ от OpenAI' });

    const parsed = JSON.parse(content);
    return res.json({ ok: true, data: parsed });
  } catch (err) {
    console.error('[AI] generate-trip error:', err);
    return res.json({ ok: false, message: String(err?.message || 'Ошибка AI') });
  }
});
```

Добавить в `.env`:
```
OPENAI_API_KEY=sk-...
```

---

## 12.3. Создать store/aiTripGenerator.ts

```typescript
import { Trip, DayPlan, Place } from '@/constants/data';
import { TripForm } from '@/store/useStore';  // если экспортируешь тип, иначе определи локально
import { getAccessToken } from '@/store/authStorage';

const API_BASE = process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:8787';

export interface AiGenerationResult {
  ok: boolean;
  days?: DayPlan[];
  coverImage?: string;
  totalActivities?: number;
  totalFood?: number;
  message?: string;
  usedFallback?: boolean;
}

// ─── Вызов API ────────────────────────────────────────────────────────────────

async function callGenerateApi(form: object): Promise<{ ok: boolean; data?: unknown; message?: string }> {
  const token = await getAccessToken();
  const response = await fetch(`${API_BASE}/api/generate-trip`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(form),
    signal: AbortSignal.timeout(35_000),
  });
  return response.json() as Promise<{ ok: boolean; data?: unknown; message?: string }>;
}

// ─── Парсинг ответа AI ────────────────────────────────────────────────────────

function parsePlaceFromAi(raw: unknown): Place | null {
  if (!raw || typeof raw !== 'object') return null;
  const p = raw as Record<string, unknown>;
  if (!p.name || typeof p.name !== 'string') return null;
  return {
    id: String(p.id ?? `ai-${Date.now()}-${Math.random()}`),
    name: String(p.name),
    category: String(p.category ?? 'Достопримечательность'),
    description: String(p.description ?? ''),
    duration: String(p.duration ?? '1.5 часа'),
    time: String(p.time ?? '10:00'),
    rating: typeof p.rating === 'number' ? p.rating : 4.5,
    address: String(p.address ?? ''),
    emoji: String(p.emoji ?? '📍'),
    price: p.price != null ? String(p.price) : undefined,
    lat: typeof p.lat === 'number' ? p.lat : undefined,
    lng: typeof p.lng === 'number' ? p.lng : undefined,
  };
}

function parseDaysFromAi(raw: unknown): DayPlan[] | null {
  if (!Array.isArray(raw)) return null;
  return raw
    .map((dayRaw, i): DayPlan | null => {
      if (!dayRaw || typeof dayRaw !== 'object') return null;
      const d = dayRaw as Record<string, unknown>;
      const places = Array.isArray(d.places)
        ? (d.places.map(parsePlaceFromAi).filter(Boolean) as Place[])
        : [];
      return {
        day: typeof d.day === 'number' ? d.day : i + 1,
        date: String(d.date ?? `День ${i + 1}`),
        places,
      };
    })
    .filter((d): d is DayPlan => d !== null && d.places.length > 0);
}

// ─── Основная функция ─────────────────────────────────────────────────────────

export async function generateTripWithAI(
  form: object,
  fallback: () => Trip
): Promise<Trip & { generatedByAI: boolean }> {
  try {
    const response = await callGenerateApi(form);
    if (response.ok && response.data) {
      const data = response.data as Record<string, unknown>;
      const parsedDays = parseDaysFromAi(data.days);
      if (parsedDays && parsedDays.length > 0) {
        const base = fallback();
        return {
          ...base,
          days: parsedDays,
          coverImage: typeof data.coverImage === 'string' ? data.coverImage : base.coverImage,
          totalActivities: typeof data.totalActivities === 'number' ? data.totalActivities : base.totalActivities,
          totalFood: typeof data.totalFood === 'number' ? data.totalFood : base.totalFood,
          generatedByAI: true,
        };
      }
    }
  } catch (err) {
    console.warn('[AI] generateTripWithAI error, using fallback', err);
  }

  // Fallback на шаблонный генератор
  return { ...fallback(), generatedByAI: false };
}
```

---

## 12.4. Интеграция в store/useStore.ts

Добавить в `AppStore`:

```typescript
generatingWithAI: boolean;
lastGenerationWasAI: boolean;
generateTripAI: () => Promise<void>;
```

Реализация:

```typescript
import { generateTripWithAI } from '@/store/aiTripGenerator';

generatingWithAI: false,
lastGenerationWasAI: false,

generateTripAI: async () => {
  const form = get().tripForm;
  if (!get().isPremium()) {
    // fallback на шаблонный генератор
    get().generateTrip();
    return;
  }

  set({ generatingWithAI: true });
  try {
    const fallback = () => generateTripFromForm(form);
    const trip = await generateTripWithAI(form, fallback);
    set({
      generatedTrip: trip,
      generatingWithAI: false,
      lastGenerationWasAI: trip.generatedByAI,
    });
  } catch {
    get().generateTrip();  // fallback
    set({ generatingWithAI: false, lastGenerationWasAI: false });
  }
},
```

---

## 12.5. Обновить экран generating.tsx

В `app/trip/generating.tsx` замени вызов `generateTrip()` на `generateTripAI()`:

```typescript
const generateTripAI = useStore((s) => s.generateTripAI);
const isPremium = useStore((s) => s.isPremium());

useEffect(() => {
  const run = async () => {
    await generateTripAI();
    router.replace('/trip/result');
  };
  void run();
}, []);
```

---

## 12.6. AI-бейдж на экране result.tsx

Добавить бейдж «✨ Сгенерировано AI» под заголовком поездки:

```typescript
const lastGenerationWasAI = useStore((s) => s.lastGenerationWasAI);

{lastGenerationWasAI && (
  <View style={styles.aiBadge}>
    <Ionicons name="sparkles" size={14} color="#7B1FA2" />
    <Text style={styles.aiBadgeText}>Сгенерировано AI</Text>
  </View>
)}
```

---

## Критерии приёмки Sprint 12

- [ ] `npx tsc --noEmit` — 0 ошибок
- [ ] `api/tripPromptBuilder.js` создан
- [ ] Backend endpoint `POST /api/generate-trip` отвечает `{ ok: true, data: {...} }` при заданном `OPENAI_API_KEY`
- [ ] `store/aiTripGenerator.ts` создан, fallback работает при ошибке API
- [ ] При Premium: `generateTripAI` вызывает AI и показывает бейдж
- [ ] При Free или недоступности AI: автоматически используется шаблонный генератор
- [ ] Нет зависания UI при timeout 35с (ActivityIndicator на экране generating)

---

---

# СПРИНТ 13 — Аналитика, краш-репортинг, email, i18n, E2E, релизная сборка

**Цель:** Подготовить приложение к публикации в App Store и Google Play.  
**Срок:** 2 недели

---

## 13.1. Sentry — краш-репортинг

### Установка

```bash
npx expo install @sentry/react-native
npx sentry-wizard -i reactNative -p ios android
```

Зарегистрируйся на [sentry.io](https://sentry.io) → создай проект React Native → получи DSN.

Добавить в `.env`:
```
EXPO_PUBLIC_SENTRY_DSN=https://xxxxx@oxxxx.ingest.sentry.io/xxxxx
```

### Инициализация (app/_layout.tsx)

```typescript
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: process.env.EXPO_PUBLIC_SENTRY_DSN,
  enableInExpoDevelopment: false,
  debug: false,
  tracesSampleRate: 0.2,
});

// Обернуть корневой компонент:
export default Sentry.wrap(function RootLayout() {
  // ...
});
```

---

## 13.2. Firebase Analytics

### Установка

```bash
npx expo install @react-native-firebase/app @react-native-firebase/analytics
```

Скачай `google-services.json` (Android) и `GoogleService-Info.plist` (iOS) из [console.firebase.google.com](https://console.firebase.google.com).

Добавить в `app.json`:
```json
"plugins": [
  "@react-native-firebase/app",
  "@react-native-firebase/analytics"
]
```

### Создать store/analyticsService.ts

```typescript
import analytics from '@react-native-firebase/analytics';
import { Platform } from 'react-native';

const IS_WEB = Platform.OS === 'web';

export type AnalyticsEvent =
  | 'trip_created'
  | 'trip_saved'
  | 'trip_deleted'
  | 'trip_shared'
  | 'ai_generation_started'
  | 'ai_generation_success'
  | 'ai_generation_fallback'
  | 'yandex_travel_click'
  | 'ostrovok_click'
  | 'yandex_navi_click'
  | 'premium_screen_opened'
  | 'premium_purchase_started'
  | 'premium_purchase_completed'
  | 'premium_restore_success'
  | 'accessibility_filter_used'
  | 'offline_mode_activated'
  | 'review_added'
  | 'wallet_document_added'
  | 'travel_mode_entered'
  | 'onboarding_completed';

export interface TrackParams {
  [key: string]: string | number | boolean | null | undefined;
}

export async function track(event: AnalyticsEvent, params?: TrackParams): Promise<void> {
  if (IS_WEB) return;
  try {
    await analytics().logEvent(event, params ?? {});
  } catch (err) {
    // Никогда не падаем из-за аналитики
    console.warn('[Analytics] track error', event, err);
  }
}

export async function setAnalyticsUser(userId: string | null): Promise<void> {
  if (IS_WEB) return;
  try {
    await analytics().setUserId(userId);
  } catch { /* ignore */ }
}

export async function trackScreen(screenName: string): Promise<void> {
  if (IS_WEB) return;
  try {
    await analytics().logScreenView({ screen_name: screenName, screen_class: screenName });
  } catch { /* ignore */ }
}
```

### Где вызывать track()

| Место | Событие |
|-------|---------|
| `saveTrip()` в useStore | `trip_saved` |
| `deleteTrip()` в useStore | `trip_deleted` |
| После `generateTripAI()` | `trip_created` + `ai_generation_success` или `ai_generation_fallback` |
| Кнопка «Яндекс Путешествия» | `yandex_travel_click` |
| Кнопка «Островок» | `ostrovok_click` |
| Яндекс Навигатор (TripMap) | `yandex_navi_click` |
| `purchaseSubscription()` | `premium_purchase_started` / `premium_purchase_completed` |
| Фильтр ♿ включён | `accessibility_filter_used` |
| `addReview()` | `review_added` |
| Открытие Travel Mode | `travel_mode_entered` |
| `completeOnboarding()` | `onboarding_completed` |

---

## 13.3. Transactional Email (Brevo API)

### Создать api/emailService.js

Зарегистрируйся на [brevo.com](https://brevo.com) → API Keys → получи ключ.

Добавить в `.env`:
```
BREVO_API_KEY=xkeysib-...
BREVO_SENDER_EMAIL=noreply@shturman.app
BREVO_SENDER_NAME=Штурман
```

```javascript
// api/emailService.js
const https = require('https');

const BREVO_API_KEY = process.env.BREVO_API_KEY;
const SENDER_EMAIL = process.env.BREVO_SENDER_EMAIL || 'noreply@shturman.app';
const SENDER_NAME = process.env.BREVO_SENDER_NAME || 'Штурман';

async function sendBrevoEmail({ to, toName, subject, htmlContent }) {
  if (!BREVO_API_KEY) {
    console.warn('[Email] BREVO_API_KEY не задан, письмо не отправлено');
    return;
  }
  const body = JSON.stringify({
    sender: { name: SENDER_NAME, email: SENDER_EMAIL },
    to: [{ email: to, name: toName ?? to }],
    subject,
    htmlContent,
  });

  await new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.brevo.com',
      path: '/v3/smtp/email',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': BREVO_API_KEY,
        'Content-Length': Buffer.byteLength(body),
      },
    };
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => resolve(data));
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

async function sendWelcomeEmail({ to, name }) {
  await sendBrevoEmail({
    to,
    toName: name,
    subject: 'Добро пожаловать в Штурман! 🗺️',
    htmlContent: `
      <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto;">
        <h2 style="color: #1B3A6B;">Привет, ${name}! 👋</h2>
        <p>Добро пожаловать в <strong>Штурман</strong> — твой AI-помощник для путешествий по России.</p>
        <p>Теперь ты можешь:</p>
        <ul>
          <li>🗓️ Создавать маршруты по дням</li>
          <li>🗺️ Смотреть места на карте</li>
          <li>🌤️ Проверять погоду в поездке</li>
          <li>✈️ Искать транспорт и отели</li>
        </ul>
        <p style="margin-top: 24px; color: #666; font-size: 12px;">
          Если ты не регистрировался в Штурмане — просто проигнорируй это письмо.
        </p>
      </div>
    `,
  });
}

async function sendPasswordRecoveryEmail({ to, name, newPassword }) {
  await sendBrevoEmail({
    to,
    toName: name,
    subject: 'Восстановление пароля — Штурман',
    htmlContent: `
      <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto;">
        <h2 style="color: #1B3A6B;">Восстановление пароля</h2>
        <p>Привет, ${name}! Твой временный пароль:</p>
        <p style="font-size: 28px; font-weight: bold; color: #1B3A6B; letter-spacing: 2px; font-family: monospace;">${newPassword}</p>
        <p>Войди с этим паролем и сразу смени его в настройках профиля.</p>
        <p style="color: #e53e3e;">Если ты не запрашивал восстановление пароля — срочно обратись в поддержку.</p>
      </div>
    `,
  });
}

module.exports = { sendWelcomeEmail, sendPasswordRecoveryEmail };
```

### Подключить в server.js

```javascript
const { sendWelcomeEmail, sendPasswordRecoveryEmail } = require('./emailService');

// В обработчике POST /auth/register — после создания пользователя:
try {
  await sendWelcomeEmail({ to: email, name });
} catch (emailErr) {
  console.warn('[Email] Welcome email failed:', emailErr);
  // Не блокируем регистрацию из-за ошибки email
}

// В обработчике POST /auth/recover-password — после смены пароля:
try {
  await sendPasswordRecoveryEmail({ to: email, name: user.name, newPassword });
} catch (emailErr) {
  console.warn('[Email] Recovery email failed:', emailErr);
}
```

---

## 13.4. Оптимизации производительности

### React.memo для тяжёлых компонентов

Оберни в `React.memo` компоненты, которые часто перерисовываются:

```typescript
// components/ui/TripCard.tsx
export const TripCard = React.memo(function TripCard({ trip, onPress }: TripCardProps) {
  // ...
});

// components/ReviewsList.tsx
export const ReviewsList = React.memo(function ReviewsList({ placeId }: { placeId: string }) {
  // ...
});
```

### FlatList вместо ScrollView + map()

В экранах со списком поездок (trips) и мест (discover) замени:

```tsx
// ❌ Было:
<ScrollView>
  {trips.map((trip) => <TripCard key={trip.id} trip={trip} />)}
</ScrollView>

// ✅ Стало:
<FlatList
  data={trips}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => <TripCard trip={item} />}
  initialNumToRender={6}
  maxToRenderPerBatch={4}
  windowSize={5}
  removeClippedSubviews
/>
```

### useMemo для тяжёлых вычислений

```typescript
// В trip/[id].tsx и result.tsx:
const totalBudget = useMemo(
  () => trip.totalTransport + trip.totalHotel + trip.totalActivities + trip.totalFood,
  [trip.totalTransport, trip.totalHotel, trip.totalActivities, trip.totalFood]
);
```

---

## 13.5. Интернационализация (i18n) — базовая

### Установка

```bash
npx expo install i18next react-i18next expo-localization
```

### Создать locales/ru.ts и locales/en.ts

```typescript
// locales/ru.ts
export const ru = {
  common: {
    save: 'Сохранить',
    cancel: 'Отмена',
    delete: 'Удалить',
    loading: 'Загрузка...',
    error: 'Ошибка',
    yes: 'Да',
    no: 'Нет',
    back: 'Назад',
  },
  auth: {
    login: 'Войти',
    register: 'Зарегистрироваться',
    logout: 'Выйти',
    email: 'Email',
    password: 'Пароль',
    name: 'Имя',
    forgotPassword: 'Забыли пароль?',
  },
  trip: {
    createTrip: 'Создать поездку',
    myTrips: 'Мои поездки',
    from: 'Откуда',
    to: 'Куда',
    dates: 'Даты',
    budget: 'Бюджет',
    travelers: 'Путешественники',
    route: 'Маршрут',
    transport: 'Транспорт',
    hotels: 'Отели',
    budgetTab: 'Бюджет',
    map: 'Карта',
    save: 'Сохранить поездку',
    day: 'День',
  },
  premium: {
    title: 'Штурман Premium',
    monthly: 'Месяц — 299 ₽',
    yearly: 'Год — 1 990 ₽',
    restore: 'Восстановить покупки',
    active: 'Активна до',
    upgrade: 'Открыть Premium',
    limitReached: 'Лимит поездок',
    limitMessage: 'В бесплатной версии — 3 поездки в месяц',
  },
} as const;

// locales/en.ts
export const en = {
  common: {
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    loading: 'Loading...',
    error: 'Error',
    yes: 'Yes',
    no: 'No',
    back: 'Back',
  },
  auth: {
    login: 'Log In',
    register: 'Sign Up',
    logout: 'Log Out',
    email: 'Email',
    password: 'Password',
    name: 'Name',
    forgotPassword: 'Forgot password?',
  },
  trip: {
    createTrip: 'Create Trip',
    myTrips: 'My Trips',
    from: 'From',
    to: 'To',
    dates: 'Dates',
    budget: 'Budget',
    travelers: 'Travelers',
    route: 'Itinerary',
    transport: 'Transport',
    hotels: 'Hotels',
    budgetTab: 'Budget',
    map: 'Map',
    save: 'Save Trip',
    day: 'Day',
  },
  premium: {
    title: 'Shturman Premium',
    monthly: 'Monthly — ₽299',
    yearly: 'Yearly — ₽1,990',
    restore: 'Restore Purchases',
    active: 'Active until',
    upgrade: 'Get Premium',
    limitReached: 'Trip Limit',
    limitMessage: 'Free plan: 3 trips per month',
  },
} as const;
```

### Инициализация i18n (store/i18n.ts)

```typescript
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import { ru } from '@/locales/ru';
import { en } from '@/locales/en';

void i18n.use(initReactI18next).init({
  resources: {
    ru: { translation: ru },
    en: { translation: en },
  },
  lng: Localization.getLocales()[0]?.languageCode ?? 'ru',
  fallbackLng: 'ru',
  interpolation: { escapeValue: false },
});

export default i18n;
```

Импортировать в `app/_layout.tsx`:
```typescript
import '@/store/i18n';  // инициализация при старте
```

Использование в компонентах:
```typescript
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation();
  return <Text>{t('trip.createTrip')}</Text>;
}
```

> **Важно:** Не обязательно переводить весь UI в этом спринте — достаточно настроить инфраструктуру и перевести ключевые кнопки и заголовки.

---

## 13.6. EAS Build — настройка сборки

### Установка

```bash
npm install -g eas-cli
eas login
eas build:configure
```

### Создать eas.json

```json
{
  "cli": {
    "version": ">= 7.0.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal",
      "env": {
        "NODE_ENV": "development"
      }
    },
    "preview": {
      "distribution": "internal",
      "android": {
        "buildType": "apk"
      },
      "env": {
        "NODE_ENV": "staging"
      }
    },
    "production": {
      "autoIncrement": true,
      "env": {
        "NODE_ENV": "production"
      }
    }
  },
  "submit": {
    "production": {
      "ios": {
        "appleId": "yourAppleId@example.com",
        "ascAppId": "com.travelai.app",
        "appleTeamId": "YOUR_TEAM_ID"
      },
      "android": {
        "serviceAccountKeyPath": "./google-service-account.json",
        "track": "internal"
      }
    }
  }
}
```

### Команды

```bash
# Сборка для тестирования (APK):
eas build --platform android --profile preview

# Сборка для App Store (IPA):
eas build --platform ios --profile production

# Публикация в магазины:
eas submit --platform ios --latest
eas submit --platform android --latest

# OTA-обновление (без перепубликации):
eas update --branch production --message "Fix: ..."
```

---

## 13.7. Detox E2E — скелет тестов

### Установка

```bash
npm install --save-dev detox @types/detox
npx detox init
```

### .detoxrc.js

```javascript
module.exports = {
  testRunner: { args: { '$0': 'jest', config: 'e2e/jest.config.js' }, jest: { setupTimeout: 120000 } },
  apps: {
    'ios.debug': {
      type: 'ios.app',
      binaryPath: 'ios/build/Build/Products/Debug-iphonesimulator/Shturman.app',
      build: 'xcodebuild ...',
    },
    'android.debug': {
      type: 'android.apk',
      binaryPath: 'android/app/build/outputs/apk/debug/app-debug.apk',
      build: 'cd android && ./gradlew assembleDebug',
    },
  },
  devices: {
    simulator: { type: 'ios.simulator', device: { type: 'iPhone 15' } },
    emulator: { type: 'android.emulator', device: { avdName: 'Pixel_7_API_34' } },
  },
  configurations: {
    'ios.sim.debug': { device: 'simulator', app: 'ios.debug' },
    'android.emu.debug': { device: 'emulator', app: 'android.debug' },
  },
};
```

### e2e/auth.test.ts — базовый тест авторизации

```typescript
import { device, element, by, expect as detoxExpect } from 'detox';

describe('Авторизация', () => {
  beforeAll(async () => {
    await device.launchApp({ newInstance: true });
  });

  it('Открывается экран логина', async () => {
    await detoxExpect(element(by.text('Войти'))).toBeVisible();
  });

  it('Логин с неверным паролем показывает ошибку', async () => {
    await element(by.id('input-email')).typeText('wrong@test.com');
    await element(by.id('input-password')).typeText('WrongPass1!');
    await element(by.id('btn-login')).tap();
    await detoxExpect(element(by.text('Неверный email или пароль'))).toBeVisible();
  });
});
```

### e2e/trip.test.ts — базовый тест создания поездки

```typescript
describe('Создание поездки', () => {
  it('Заполнение формы и переход к результату', async () => {
    // Логин (демо-пользователь)
    await element(by.id('input-email')).typeText('demo@shturman.app');
    await element(by.id('input-password')).typeText('DemoPass1!');
    await element(by.id('btn-login')).tap();

    // Переход к созданию
    await element(by.id('tab-create')).tap();
    await element(by.id('input-from')).typeText('Москва');
    await element(by.id('input-to')).typeText('Казань');
    await element(by.id('btn-generate')).tap();

    // Ждём результата (до 30 секунд)
    await detoxExpect(element(by.id('result-screen'))).toBeVisible(30000);
  });
});
```

> **Примечание:** Добавь `testID` к ключевым элементам UI — кнопкам логина, полям ввода, кнопке генерации. Это нужно для работы Detox.

---

## Критерии приёмки Sprint 13

- [ ] `npx tsc --noEmit` — 0 ошибок
- [ ] Sentry инициализирован, краши отображаются в dashboard
- [ ] Firebase Analytics логирует события (проверить в DebugView)
- [ ] `api/emailService.js` создан; welcome-письмо уходит при регистрации
- [ ] `eas.json` создан, `eas build --platform android --profile preview` успешно запускается
- [ ] `locales/ru.ts` и `locales/en.ts` созданы, `i18n.ts` инициализирован
- [ ] Хотя бы 3 экрана используют `t()` вместо хардкода строк
- [ ] `e2e/auth.test.ts` и `e2e/trip.test.ts` созданы (могут не запускаться без натурального девайса)

---

---

# СПРИНТ 14 — Административная панель

**Цель:** Веб-интерфейс для управления пользователями, местами и отзывами. Отдельный проект.  
**Стек:** Vite + React 18 + TypeScript + TanStack Query + shadcn/ui + recharts  
**Расположение:** `D:\travel_admin\` (отдельная папка рядом с `travel_app`)  
**Срок:** 2 недели

---

## 14.1. Создать проект travel_admin

```bash
cd D:\
npm create vite@latest travel_admin -- --template react-ts
cd travel_admin
npm install
```

### Установить зависимости

```bash
npm install @tanstack/react-query axios recharts
npx shadcn-ui@latest init
npx shadcn-ui@latest add button card table input badge dialog alert-dialog tabs select
```

### Структура проекта

```
D:\travel_admin\
  src/
    api/
      client.ts           # axios instance с JWT
      users.ts            # CRUD пользователей
      places.ts           # CRUD мест
      reviews.ts          # модерация отзывов
      stats.ts            # статистика
    components/
      layout/
        Sidebar.tsx
        Header.tsx
        AuthGuard.tsx
      charts/
        UsersChart.tsx
        TripsChart.tsx
    pages/
      Login.tsx
      Dashboard.tsx
      Users.tsx
      Places.tsx
      Reviews.tsx
    lib/
      utils.ts            # cn() и helpers
    App.tsx
    main.tsx
  index.html
  vite.config.ts
  package.json
```

---

## 14.2. Бэкенд — Admin API (api/server.js)

### Роль admin в JWT

Добавить поле `role` в токен при создании. Если у пользователя `role === 'admin'` — разрешён доступ к admin-endpoints.

```javascript
// В функции signJwt:
function signJwt(payload, expiresIn) {
  // добавить role в payload если есть у пользователя
  const enrichedPayload = { ...payload, role: payload.role ?? 'user' };
  // ...
}

// В функции requireAuth — сохранять role:
req.userId = decoded.sub;
req.userRole = decoded.role ?? 'user';

// Новый middleware:
function requireAdmin(req, res, next) {
  if (req.userRole !== 'admin') {
    return res.json({ ok: false, message: 'Требуются права администратора' }, 403);
  }
  next();
}
```

Чтобы выдать роль admin — вручную поменяй в `data/users.json` поле `"role": "admin"` для нужного пользователя.

### Endpoints

```javascript
// GET /admin/stats
app.get('/admin/stats', requireAuth, requireAdmin, async (req, res) => {
  const users = await storage.getAllUsers();
  const trips = await storage.getAllTrips();
  const now = new Date();
  const thisMonth = trips.filter((t) => {
    const d = new Date(t.startDate);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  });

  res.json({
    ok: true,
    stats: {
      totalUsers: users.length,
      totalTrips: trips.length,
      tripsThisMonth: thisMonth.length,
      activeUsers: users.filter((u) => u.lastLoginAt && new Date(u.lastLoginAt) > new Date(Date.now() - 7 * 86400_000)).length,
    },
  });
});

// GET /admin/users?search=&page=1&limit=20
app.get('/admin/users', requireAuth, requireAdmin, async (req, res) => {
  const { search = '', page = '1', limit = '20' } = req.query;
  let users = await storage.getAllUsers();
  if (search) {
    const q = String(search).toLowerCase();
    users = users.filter((u) => u.email.toLowerCase().includes(q) || u.name.toLowerCase().includes(q));
  }
  const start = (Number(page) - 1) * Number(limit);
  const paginated = users.slice(start, start + Number(limit));
  const sanitized = paginated.map(({ passwordHash, ...rest }) => rest);
  res.json({ ok: true, users: sanitized, total: users.length });
});

// POST /admin/users/:id/block
app.post('/admin/users/:id/block', requireAuth, requireAdmin, async (req, res) => {
  await storage.updateUser(req.params.id, { blocked: true });
  res.json({ ok: true });
});

// DELETE /admin/users/:id
app.delete('/admin/users/:id', requireAuth, requireAdmin, async (req, res) => {
  await storage.deleteUser(req.params.id);
  res.json({ ok: true });
});

// GET /admin/reviews?status=pending
app.get('/admin/reviews', requireAuth, requireAdmin, async (req, res) => {
  // В MVP — возвращаем все отзывы из storage (если есть)
  // Или возвращаем заглушку:
  res.json({ ok: true, reviews: [], total: 0 });
});

// POST /admin/reviews/:id/approve
app.post('/admin/reviews/:id/approve', requireAuth, requireAdmin, (req, res) => {
  res.json({ ok: true });
});

// POST /admin/reviews/:id/reject
app.post('/admin/reviews/:id/reject', requireAuth, requireAdmin, (req, res) => {
  res.json({ ok: true });
});
```

---

## 14.3. API client (src/api/client.ts)

```typescript
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:8787';

export const apiClient = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
});

// Добавлять токен к каждому запросу
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin.token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Редиректить на логин при 401
apiClient.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('admin.token');
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);
```

---

## 14.4. Dashboard (src/pages/Dashboard.tsx)

```tsx
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { apiClient } from '@/api/client';

interface Stats {
  totalUsers: number;
  totalTrips: number;
  tripsThisMonth: number;
  activeUsers: number;
}

function StatCard({ title, value, icon }: { title: string; value: number; icon: string }) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold mt-1">{value.toLocaleString('ru-RU')}</p>
          </div>
          <span className="text-4xl">{icon}</span>
        </div>
      </CardContent>
    </Card>
  );
}

// Генерация демо-данных для графика (за последние 7 дней)
function buildChartData() {
  const data = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    data.push({
      date: d.toLocaleDateString('ru-RU', { day: '2-digit', month: 'short' }),
      trips: Math.floor(Math.random() * 20) + 5,
      users: Math.floor(Math.random() * 10) + 2,
    });
  }
  return data;
}

export function Dashboard() {
  const { data } = useQuery<Stats>({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const res = await apiClient.get<{ ok: boolean; stats: Stats }>('/admin/stats');
      return res.data.stats;
    },
  });

  const chartData = React.useMemo(() => buildChartData(), []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Дашборд</h1>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard title="Всего пользователей" value={data?.totalUsers ?? 0} icon="👤" />
        <StatCard title="Всего поездок" value={data?.totalTrips ?? 0} icon="🗺️" />
        <StatCard title="Поездок в этом месяце" value={data?.tripsThisMonth ?? 0} icon="📅" />
        <StatCard title="Активных (7 дней)" value={data?.activeUsers ?? 0} icon="🔥" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Активность за 7 дней</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="tripsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1B3A6B" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#1B3A6B" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Area type="monotone" dataKey="trips" stroke="#1B3A6B" fill="url(#tripsGrad)" name="Поездки" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
```

---

## 14.5. Страница Users (src/pages/Users.tsx)

```tsx
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { apiClient } from '@/api/client';

interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: string;
  blocked?: boolean;
  createdAt?: string;
}

export function Users() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const qc = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['admin-users', search, page],
    queryFn: async () => {
      const res = await apiClient.get<{ ok: boolean; users: AdminUser[]; total: number }>(
        `/admin/users?search=${encodeURIComponent(search)}&page=${page}&limit=20`
      );
      return res.data;
    },
  });

  const blockMutation = useMutation({
    mutationFn: (userId: string) => apiClient.post(`/admin/users/${userId}/block`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin-users'] }),
  });

  const deleteMutation = useMutation({
    mutationFn: (userId: string) => apiClient.delete(`/admin/users/${userId}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin-users'] }),
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Пользователи</h1>
        <span className="text-muted-foreground text-sm">Всего: {data?.total ?? 0}</span>
      </div>

      <Input
        placeholder="Поиск по email или имени..."
        value={search}
        onChange={(e) => { setSearch(e.target.value); setPage(1); }}
        className="max-w-sm"
      />

      <Card>
        <CardContent className="p-0">
          <table className="w-full">
            <thead className="border-b">
              <tr className="text-left text-sm text-muted-foreground">
                <th className="px-4 py-3">Пользователь</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Роль</th>
                <th className="px-4 py-3">Статус</th>
                <th className="px-4 py-3">Действия</th>
              </tr>
            </thead>
            <tbody>
              {isLoading && (
                <tr><td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">Загрузка...</td></tr>
              )}
              {data?.users.map((user) => (
                <tr key={user.id} className="border-b hover:bg-muted/30">
                  <td className="px-4 py-3 font-medium">{user.name}</td>
                  <td className="px-4 py-3 text-muted-foreground text-sm">{user.email}</td>
                  <td className="px-4 py-3">
                    <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                      {user.role === 'admin' ? 'Админ' : 'Пользователь'}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    {user.blocked
                      ? <Badge variant="destructive">Заблокирован</Badge>
                      : <Badge variant="outline">Активен</Badge>}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      {!user.blocked && user.role !== 'admin' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => blockMutation.mutate(user.id)}
                        >
                          Заблокировать
                        </Button>
                      )}
                      {user.role !== 'admin' && (
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button size="sm" variant="destructive">Удалить</Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Удалить пользователя?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Будут удалены все поездки и данные {user.email}. Действие необратимо.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Отмена</AlertDialogCancel>
                              <AlertDialogAction onClick={() => deleteMutation.mutate(user.id)}>
                                Удалить
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      <div className="flex gap-2 justify-end">
        <Button variant="outline" size="sm" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
          ← Назад
        </Button>
        <span className="text-sm text-muted-foreground self-center">Страница {page}</span>
        <Button variant="outline" size="sm" onClick={() => setPage((p) => p + 1)} disabled={!data?.users.length || data.users.length < 20}>
          Вперёд →
        </Button>
      </div>
    </div>
  );
}
```

---

## 14.6. Страница Reviews (src/pages/Reviews.tsx)

```tsx
import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { apiClient } from '@/api/client';

interface AdminReview {
  id: string;
  placeName: string;
  text: string;
  rating: number;
  createdAt: string;
  status?: 'pending' | 'approved' | 'rejected';
}

const STARS = (n: number) => '⭐'.repeat(n) + '☆'.repeat(5 - n);

export function Reviews() {
  const qc = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['admin-reviews'],
    queryFn: async () => {
      const res = await apiClient.get<{ ok: boolean; reviews: AdminReview[] }>('/admin/reviews');
      return res.data.reviews;
    },
  });

  const approveMutation = useMutation({
    mutationFn: (id: string) => apiClient.post(`/admin/reviews/${id}/approve`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin-reviews'] }),
  });

  const rejectMutation = useMutation({
    mutationFn: (id: string) => apiClient.post(`/admin/reviews/${id}/reject`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin-reviews'] }),
  });

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Модерация отзывов</h1>
      {isLoading && <p className="text-muted-foreground">Загрузка...</p>}
      {!isLoading && (!data || data.length === 0) && (
        <p className="text-muted-foreground">Нет отзывов на модерации</p>
      )}
      {data?.map((review) => (
        <Card key={review.id}>
          <CardContent className="pt-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold">{review.placeName}</span>
              <span className="text-sm text-muted-foreground">
                {new Date(review.createdAt).toLocaleDateString('ru-RU')}
              </span>
            </div>
            <div className="text-sm">{STARS(review.rating)}</div>
            <p className="text-sm">{review.text}</p>
            {review.status && (
              <Badge variant={
                review.status === 'approved' ? 'default' :
                review.status === 'rejected' ? 'destructive' : 'outline'
              }>
                {review.status === 'approved' ? 'Одобрен' :
                 review.status === 'rejected' ? 'Отклонён' : 'На модерации'}
              </Badge>
            )}
            {(!review.status || review.status === 'pending') && (
              <div className="flex gap-2 pt-2">
                <Button size="sm" onClick={() => approveMutation.mutate(review.id)}>Одобрить</Button>
                <Button size="sm" variant="destructive" onClick={() => rejectMutation.mutate(review.id)}>Отклонить</Button>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
```

---

## 14.7. App.tsx и маршрутизация

```tsx
// src/App.tsx
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Users } from './pages/Users';
import { Reviews } from './pages/Reviews';
import { Sidebar } from './components/layout/Sidebar';
import { AuthGuard } from './components/layout/AuthGuard';

const qc = new QueryClient({
  defaultOptions: { queries: { retry: 1, staleTime: 30_000 } },
});

function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 p-6 overflow-auto">{children}</main>
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={qc}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/*"
            element={
              <AuthGuard>
                <AdminLayout>
                  <Routes>
                    <Route index element={<Navigate to="/dashboard" replace />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="users" element={<Users />} />
                    <Route path="reviews" element={<Reviews />} />
                  </Routes>
                </AdminLayout>
              </AuthGuard>
            }
          />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
```

### AuthGuard

```tsx
// src/components/layout/AuthGuard.tsx
import { Navigate } from 'react-router-dom';

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const token = localStorage.getItem('admin.token');
  if (!token) return <Navigate to="/login" replace />;
  return <>{children}</>;
}
```

### Sidebar

```tsx
// src/components/layout/Sidebar.tsx
import { NavLink } from 'react-router-dom';

const NAV = [
  { to: '/dashboard', icon: '📊', label: 'Дашборд' },
  { to: '/users', icon: '👥', label: 'Пользователи' },
  { to: '/reviews', icon: '⭐', label: 'Отзывы' },
];

export function Sidebar() {
  return (
    <aside className="w-56 bg-card border-r flex flex-col py-6 px-3 gap-1">
      <div className="px-3 pb-6">
        <span className="text-xl font-bold">🗺️ Штурман</span>
        <span className="block text-xs text-muted-foreground mt-1">Admin Panel</span>
      </div>
      {NAV.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors
             ${isActive ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`
          }
        >
          <span>{item.icon}</span>
          <span>{item.label}</span>
        </NavLink>
      ))}
    </aside>
  );
}
```

---

## 14.8. Запуск Admin Panel

```bash
cd D:\travel_admin

# Разработка
npm run dev
# → http://localhost:5173

# Сборка для деплоя
npm run build
# → dist/
```

Добавить `.env` в `travel_admin/`:
```
VITE_API_URL=http://localhost:8787
```

---

## Критерии приёмки Sprint 14

- [ ] `travel_admin/` создан, `npm run dev` запускается без ошибок
- [ ] Backend: `/admin/stats`, `/admin/users`, `/admin/users/:id/block`, `DELETE /admin/users/:id`, `/admin/reviews` — все отвечают `{ ok: true }`
- [ ] `requireAdmin` middleware блокирует запросы без роли admin
- [ ] Dashboard показывает 4 карточки со статистикой и график
- [ ] Страница Users: поиск работает, блокировка и удаление меняют данные
- [ ] Страница Reviews: список загружается, кнопки «Одобрить» / «Отклонить» отправляют запрос
- [ ] Неавторизованный пользователь редиректится на `/login`

---

## Итого: что нужно сделать (чеклист по всем спринтам)

| Спринт | Статус | Ключевые файлы |
|--------|--------|----------------|
| 10 — Отзывы | ✅ Готово | `reviewsDb.ts`, `AddReviewModal`, `ReviewsList`, `my-reviews.tsx` |
| 11 — Premium | ❌ Нужно сделать | `subscriptionService.ts`, `app/(premium)/index.tsx`, гейты в create/wallet |
| 12 — AI | ❌ Нужно сделать | `tripPromptBuilder.js`, `/api/generate-trip`, `aiTripGenerator.ts` |
| 13 — Релиз | ❌ Нужно сделать | Sentry, Firebase, `emailService.js`, `eas.json`, `locales/`, `e2e/` |
| 14 — Admin | ❌ Нужно сделать | `travel_admin/` весь проект, admin-endpoints в `server.js` |

**Порядок выполнения:** строго 11 → 12 → 13 → 14. Sprint 12 зависит от Premium-проверки из Sprint 11.
