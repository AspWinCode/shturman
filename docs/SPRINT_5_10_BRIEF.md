# Техническое задание для разработчика
## Спринты 5–10: Доступность, Dark Mode, Push, Wallet, Offline, Travel Mode, Шаринг, Отзывы

**Проект:** Штурман — AI Travel Planner  
**Стек:** React Native (Expo ~51), TypeScript strict, Zustand, expo-router, expo-sqlite, Node.js backend (порт 8787)  
**Дата документа:** Апрель 2026

---

## Читай это первым — контекст проекта

**Штурман** — мобильное приложение, которое генерирует маршрут путешествия по дням с транспортом и жильём. Пользователь вводит: откуда, куда, даты, бюджет, интересы → получает маршрут.

**Ключевые файлы:**

```
app/
  _layout.tsx            ← root layout, Bootstrap: initDB → hydrateAuth → hydrateTrips
  (tabs)/
    _layout.tsx          ← нижняя навигация (home, маршруты, поездки, профиль)
    index.tsx            ← главная
    trips.tsx            ← список поездок пользователя
    discover.tsx         ← готовые маршруты (Discovery)
    profile.tsx          ← профиль, настройки, выход
  trip/[id].tsx          ← просмотр СОХРАНЁННОЙ поездки (вкладки: маршрут/транспорт/жильё/бюджет/карта)
  result.tsx             ← просмотр ТОЛЬКО ЧТО СГЕНЕРИРОВАННОЙ поездки (те же вкладки)

constants/
  data.ts                ← все TypeScript-типы: Trip, Day, Place, ...
  cityPlaces.ts          ← база мест (17+ городов, ~200 объектов)
  colors.ts              ← Colors.primary, Colors.background, ...
  theme.ts               ← Spacing, Typography, BorderRadius, Shadows

store/
  useStore.ts            ← Zustand store (главный state: user, trips, tripForm, ...)
  authStorage.ts         ← AsyncStorage + JWT сессия
  authApi.ts             ← HTTP-клиент к backend API
  tripsDb.ts             ← SQLite CRUD + sync с backend
  tripGenerator.ts       ← генерация Trip из TripForm (шаблонная логика)
  deepLinksService.ts    ← buildYandexFlightsLink(), buildOstrovokHotelsLink(), ...

api/                     ← Node.js backend
  server.js              ← маршруты: /auth/*, /trips/*, /transport/*, /hotels/*
  storage.js             ← Storage class: JSON-файл или PostgreSQL
```

**Запуск:**
```bash
# Backend
node --env-file=.env api/server.js   # → http://localhost:8787

# Expo
npx expo start --clear               # → http://localhost:8081 (web) / QR
```

**Проверка типов:** `npx tsc --noEmit` — должно быть 0 ошибок после каждой задачи.

**Правила кода (обязательно):**
- Цвета — только из `Colors` (`import Colors from '@/constants/colors'`)
- Отступы — только из `Spacing`, `Typography`, `BorderRadius` (`import { ... } from '@/constants/theme'`)
- Стили — только `StyleSheet.create({})`, не inline объекты
- Состояние — Zustand (`useStore`), без лишних context/redux
- Навигация — `router.push/replace` из `expo-router`
- TypeScript — никаких `any`, для неизвестных типов использовать `unknown`

---

---

# СПРИНТ 5 — Доступность (♿) + Dark Mode

**Цель:** Полноценная поддержка пользователей с инвалидностью + тёмная тема.  
**Срок:** 2 недели

---

## Блок A — Accessibility (♿)

### A1. Расширить тип Place

Файл: `constants/data.ts`

Найди интерфейс `Place` и добавь:

```typescript
interface AccessibilityInfo {
  wheelchair: boolean;       // пандусы, широкие проходы
  audioGuide: boolean;       // аудиогид для слабовидящих
  braille: boolean;          // таблички Брайля
  parkingNearby: boolean;    // парковка для инвалидов рядом
  notes?: string;            // произвольный комментарий ("лифт на ремонте")
}

interface Place {
  // ... существующие поля (id, name, description, duration, cost, ...) ...
  lat?: number;              // добавлено в Sprint 3
  lng?: number;              // добавлено в Sprint 3
  accessible?: AccessibilityInfo;  // ← ДОБАВИТЬ
}
```

Также расширь `TripForm` (в `useStore.ts` и `constants/data.ts` если там есть) полем:
```typescript
interface TripForm {
  // ... существующие поля ...
  needsAccessibility: boolean;   // ← ДОБАВИТЬ (по умолчанию false)
}
```

Добавь `needsAccessibility: false` в `defaultTripForm` в `useStore.ts`.

---

### A2. Добавить accessible-данные в базу мест

Файл: `constants/cityPlaces.ts`

Пройдись по всем местам и добавь поле `accessible`. Минимум 30–40 мест должны иметь `wheelchair: true`. Пример:

```typescript
{
  id: 'msk-tretyakov',
  name: 'Третьяковская галерея',
  // ...
  accessible: {
    wheelchair: true,
    audioGuide: true,
    braille: false,
    parkingNearby: true,
    notes: 'Есть лифт, пандусы у всех входов',
  }
}
```

---

### A3. Фильтр в генераторе маршрутов

Файл: `store/tripGenerator.ts`

Найди место где выбираются места для маршрута (выборка из `cityPlaces.ts`). Добавь условие:

```typescript
const filteredPlaces = allCityPlaces.filter((place) => {
  // если пользователь запросил доступные места — фильтруем
  if (tripForm.needsAccessibility) {
    return place.accessible?.wheelchair === true;
  }
  return true;
});
```

---

### A4. Иконка ♿ на карточке места

Файлы: `app/result.tsx` и `app/trip/[id].tsx`

В компоненте карточки места (где рендерится название, время, длительность) добавь иконку ♿:

```tsx
{place.accessible?.wheelchair && (
  <TouchableOpacity
    style={styles.accessibleBadge}
    onPress={() => setAccessiblePopupPlace(place)}
    accessibilityLabel="Место доступно для людей с ОВЗ. Нажмите для подробностей"
    accessibilityRole="button"
  >
    <Text style={styles.accessibleIcon}>♿</Text>
  </TouchableOpacity>
)}
```

---

### A5. Попап доступности

Создай компонент `components/AccessibilityPopup.tsx`:

**Пропсы:**
```typescript
interface Props {
  place: Place | null;
  onClose: () => void;
}
```

**Что показывает:**
- Заголовок: `♿ Доступность: {place.name}`
- Список атрибутов в виде строк с иконкой ✅/❌:
  - `wheelchair` → «Доступно для колясочников»
  - `audioGuide` → «Аудиогид для слабовидящих»
  - `braille` → «Таблички Брайля»
  - `parkingNearby` → «Парковка для инвалидов рядом»
  - `notes` → текстовый комментарий
- Реализовать как `Modal` снизу (аналогично `OAuthButtons.tsx` — там уже есть паттерн нижнего sheet-модала)

---

### A6. Чекбокс «Нужны доступные места ♿» в форме поездки

Файл: `app/(tabs)/index.tsx` или экран создания поездки (`app/(tabs)/create.tsx` если существует)

Найди форму создания поездки (где пользователь вводит даты, бюджет, интересы). Добавь переключатель:

```tsx
<TouchableOpacity
  style={styles.accessibilityToggle}
  onPress={() => updateTripForm({ needsAccessibility: !tripForm.needsAccessibility })}
  accessibilityLabel="Фильтр доступных мест"
  accessibilityRole="switch"
  accessibilityState={{ checked: tripForm.needsAccessibility }}
>
  <Text style={styles.accessibilityToggleLabel}>♿ Только доступные места</Text>
  <View style={[styles.toggle, tripForm.needsAccessibility && styles.toggleActive]}>
    <View style={[styles.toggleThumb, tripForm.needsAccessibility && styles.toggleThumbActive]} />
  </View>
</TouchableOpacity>
```

---

### A7. Фильтр ♿ в Discovery

Файл: `app/(tabs)/discover.tsx`

Найди логику фильтрации маршрутов. Добавь кнопку-фильтр «♿ Доступные». При активном фильтре показывать только маршруты, где все дни содержат хотя бы одно `wheelchair: true` место.

---

### A8. Экстренные контакты в профиле

Файл: `app/(tabs)/profile.tsx`

В секции «Поддержка» (найди `menuGroups`) добавь новый пункт:

```typescript
{
  icon: 'call-outline' as const,
  label: 'Экстренные контакты',
  subtitle: '112, скорая, полиция',
  onPress: () => Alert.alert(
    '🚨 Экстренные контакты',
    '112 — Единый экстренный\n103 — Скорая помощь\n102 — Полиция\n101 — Пожарная служба\n+7 (499) 921-78-00 — МИД РФ (за рубежом)',
    [
      { text: 'Позвонить 112', onPress: () => Linking.openURL('tel:112') },
      { text: 'Закрыть', style: 'cancel' },
    ]
  ),
}
```

---

### A9. accessibilityLabel на всех интерактивных элементах

Пройди по экранам и убедись, что все `TouchableOpacity`, `Pressable`, иконки-кнопки имеют:

```tsx
<TouchableOpacity
  accessibilityLabel="Описание действия"
  accessibilityRole="button"  // или "link", "tab", "switch"
  accessibilityHint="Опциональная подсказка что произойдёт"
>
```

Особенно важно для:
- Кнопок навигации (вкладки, стрелки назад)
- Иконок рядом с числами (непонятны без метки)
- Кнопок «Лайк», «Удалить», «Добавить»

Минимальная зона нажатия — **44×44pt**. Если кнопка меньше — добавь `minWidth: 44, minHeight: 44` или `hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}`.

---

## Блок B — Dark Mode

### B1. Расширить colors.ts

Файл: `constants/colors.ts`

Текущая структура — плоский объект `Colors`. Нужно добавить dark-вариант:

```typescript
export const LightColors = {
  primary: '#1B3A6B',
  primaryDark: '#0F2548',
  primaryLight: '#2D5A9B',
  secondary: '#1565C0',
  accent: '#E8472B',
  success: '#1B7A4A',
  warning: '#B45309',
  error: '#C0392B',

  background: '#F4F6FA',
  surface: '#FFFFFF',
  surfaceAlt: '#EEF1F7',
  card: '#FFFFFF',

  text: '#0D1B2E',
  textSecondary: '#3D4F6B',
  textTertiary: '#8896AA',
  textInverse: '#FFFFFF',

  border: '#D0D8E8',
  borderLight: '#E8ECF4',
  divider: '#D0D8E8',

  tabBar: {
    active: '#1B3A6B',
    inactive: '#8896AA',
    background: '#FFFFFF',
    border: '#D0D8E8',
  },

  gradient: {
    primary: ['#2D5A9B', '#1B3A6B', '#0F2548'] as string[],
    dark: ['#1E1B4B', '#312E81', '#4338CA'] as string[],
  },
};

export const DarkColors: typeof LightColors = {
  primary: '#4A7FD4',
  primaryDark: '#2D5A9B',
  primaryLight: '#6A9FE8',
  secondary: '#5B9BD5',
  accent: '#FF6B4A',
  success: '#3DB87A',
  warning: '#F0A832',
  error: '#E05252',

  background: '#0D1117',
  surface: '#161B22',
  surfaceAlt: '#1C2128',
  card: '#1C2128',

  text: '#E6EDF3',
  textSecondary: '#8B949E',
  textTertiary: '#6E7681',
  textInverse: '#0D1117',

  border: '#30363D',
  borderLight: '#21262D',
  divider: '#30363D',

  tabBar: {
    active: '#4A7FD4',
    inactive: '#6E7681',
    background: '#161B22',
    border: '#30363D',
  },

  gradient: {
    primary: ['#2D5A9B', '#1B3A6B', '#0F2548'] as string[],
    dark: ['#0D1117', '#161B22', '#1C2128'] as string[],
  },
};

// Обратная совместимость — по умолчанию светлая тема
export const Colors = LightColors;
export default Colors;
export type AppColors = typeof LightColors;
```

---

### B2. Создать ThemeContext и хук useTheme

**Файл:** `hooks/useTheme.ts` (создать, папку `hooks/` создать если нет)

```typescript
import { createContext, useContext } from 'react';
import { AppColors, LightColors, DarkColors } from '@/constants/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appearance } from 'react-native';

export type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextValue {
  colors: AppColors;
  mode: ThemeMode;
  isDark: boolean;
  setMode: (mode: ThemeMode) => Promise<void>;
}

export const ThemeContext = createContext<ThemeContextValue>({
  colors: LightColors,
  mode: 'system',
  isDark: false,
  setMode: async () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}
```

**Файл:** `providers/ThemeProvider.tsx` (создать)

```typescript
import React, { useState, useEffect, useCallback } from 'react';
import { Appearance, ColorSchemeName } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeContext, ThemeMode } from '@/hooks/useTheme';
import { LightColors, DarkColors } from '@/constants/colors';

const THEME_KEY = 'app.theme.mode';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>('system');
  const [systemScheme, setSystemScheme] = useState<ColorSchemeName>(
    Appearance.getColorScheme()
  );

  useEffect(() => {
    // Читаем сохранённую тему при запуске
    AsyncStorage.getItem(THEME_KEY).then((saved) => {
      if (saved === 'light' || saved === 'dark' || saved === 'system') {
        setModeState(saved);
      }
    });

    // Слушаем системную тему
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setSystemScheme(colorScheme);
    });
    return () => subscription.remove();
  }, []);

  const setMode = useCallback(async (newMode: ThemeMode) => {
    setModeState(newMode);
    await AsyncStorage.setItem(THEME_KEY, newMode);
  }, []);

  const isDark =
    mode === 'dark' || (mode === 'system' && systemScheme === 'dark');
  const colors = isDark ? DarkColors : LightColors;

  return (
    <ThemeContext.Provider value={{ colors, mode, isDark, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
}
```

---

### B3. Подключить ThemeProvider в root layout

Файл: `app/_layout.tsx`

Найди `return (...)` с `<GestureHandlerRootView>` и оберни в `<ThemeProvider>`:

```tsx
import { ThemeProvider } from '@/providers/ThemeProvider';

// В return:
return (
  <ThemeProvider>
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        {/* ... остальное ... */}
      </SafeAreaProvider>
    </GestureHandlerRootView>
  </ThemeProvider>
);
```

---

### B4. Заменить Colors на colors из контекста

Это самая трудоёмкая задача. В каждом экране и компоненте нужно:

**Было:**
```typescript
import Colors from '@/constants/colors';
// ...
const styles = StyleSheet.create({
  container: { backgroundColor: Colors.background },
});
```

**Стало:**
```typescript
import { useTheme } from '@/hooks/useTheme';
// ...
function MyScreen() {
  const { colors } = useTheme();
  // ...
  return <View style={{ backgroundColor: colors.background }} />;
}
```

> **Важно:** `StyleSheet.create` плохо работает с динамическими цветами. Паттерн проекта — статические стили для layout (flexDirection, padding, borderRadius) + инлайн-стили только для цветов:
> ```tsx
> <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]} />
> ```

Файлы для прохода: все экраны в `app/`, все компоненты в `components/`.

---

### B5. Настройка темы в профиле

Файл: `app/(tabs)/profile.tsx`

В группе «Предпочтения» замени заглушку на рабочий переключатель:

```typescript
{
  icon: 'contrast-outline' as const,
  label: 'Тема оформления',
  subtitle: mode === 'system' ? 'Системная' : mode === 'dark' ? 'Тёмная' : 'Светлая',
  onPress: () => {
    Alert.alert(
      'Тема оформления',
      'Выберите тему',
      [
        { text: 'Светлая', onPress: () => setMode('light') },
        { text: 'Тёмная', onPress: () => setMode('dark') },
        { text: 'Системная', onPress: () => setMode('system') },
        { text: 'Отмена', style: 'cancel' },
      ]
    );
  },
}
```

Для этого нужно добавить `const { mode, setMode } = useTheme();` в компонент.

---

## Критерии готовности Sprint 5

- [ ] `npx tsc --noEmit` — 0 ошибок
- [ ] На карточках мест с `wheelchair: true` видна иконка ♿
- [ ] Тап на ♿ открывает попап с атрибутами доступности
- [ ] Чекбокс «♿ Только доступные места» в форме создания поездки работает
- [ ] При генерации с фильтром ♿ — в маршруте только доступные места
- [ ] Фильтр ♿ в Discovery работает
- [ ] Экстренные контакты видны в профиле
- [ ] Dark Mode переключается по системной настройке
- [ ] Ручное переключение темы в профиле сохраняется после перезапуска
- [ ] Основные экраны (home, trips, trip/[id], profile) корректно отображаются в обеих темах

---

---

# СПРИНТ 6 — Push-уведомления

**Цель:** Напоминания о поездках, уведомление в день старта, запрос отзыва после возвращения.  
**Срок:** 2 недели

---

### 6.1. Установка expo-notifications

```bash
npx expo install expo-notifications
```

В `app.json` добавь в `plugins`:
```json
[
  "expo-notifications",
  {
    "icon": "./assets/notification-icon.png",
    "color": "#1B3A6B",
    "sounds": []
  }
]
```

> **Для FCM (Android push):** Нужно создать проект в Firebase Console, скачать `google-services.json` и положить в корень проекта. Добавь в `app.json`:
> ```json
> "android": {
>   "googleServicesFile": "./google-services.json"
> }
> ```

---

### 6.2. Создать store/notificationsService.ts

```typescript
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NOTIF_IDS_KEY = 'notif.tripIds';  // Map<tripId, notificationId[]>

// Настройка отображения уведомлений пока приложение открыто
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: true,
  }),
});

export async function requestNotificationPermission(): Promise<boolean> {
  if (Platform.OS === 'web') return false;

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  if (existingStatus === 'granted') return true;

  const { status } = await Notifications.requestPermissionsAsync();
  return status === 'granted';
}

export async function scheduleTrip Notifications(trip: {
  id: string;
  to: string;
  startDate: string;  // 'YYYY-MM-DD'
  endDate?: string;
}): Promise<void> {
  const granted = await requestNotificationPermission();
  if (!granted) return;

  const start = new Date(trip.startDate);
  const ids: string[] = [];

  // Уведомление за 7 дней
  const sevenDaysBefore = new Date(start);
  sevenDaysBefore.setDate(sevenDaysBefore.getDate() - 7);
  if (sevenDaysBefore > new Date()) {
    const id7 = await Notifications.scheduleNotificationAsync({
      content: {
        title: `✈️ До поездки в ${trip.to} — 7 дней!`,
        body: 'Пора подготовить документы и купить билеты.',
        data: { tripId: trip.id, type: 'reminder_7d' },
      },
      trigger: { date: sevenDaysBefore },
    });
    ids.push(id7);
  }

  // Уведомление за 1 день
  const oneDayBefore = new Date(start);
  oneDayBefore.setDate(oneDayBefore.getDate() - 1);
  if (oneDayBefore > new Date()) {
    const id1 = await Notifications.scheduleNotificationAsync({
      content: {
        title: `🧳 Завтра в ${trip.to}!`,
        body: 'Проверьте документы, распечатайте билеты и упакуйте чемодан.',
        data: { tripId: trip.id, type: 'reminder_1d' },
      },
      trigger: { date: oneDayBefore },
    });
    ids.push(id1);
  }

  // Уведомление в день старта
  const startOfDay = new Date(start);
  startOfDay.setHours(9, 0, 0, 0);
  if (startOfDay > new Date()) {
    const idStart = await Notifications.scheduleNotificationAsync({
      content: {
        title: `🚀 Ваше путешествие в ${trip.to} начинается!`,
        body: 'Хорошей поездки! Откройте приложение для маршрута.',
        data: { tripId: trip.id, type: 'trip_start' },
      },
      trigger: { date: startOfDay },
    });
    ids.push(idStart);
  }

  // Запрос отзыва через день после возвращения
  if (trip.endDate) {
    const end = new Date(trip.endDate);
    const reviewDate = new Date(end);
    reviewDate.setDate(reviewDate.getDate() + 1);
    reviewDate.setHours(18, 0, 0, 0);
    if (reviewDate > new Date()) {
      const idReview = await Notifications.scheduleNotificationAsync({
        content: {
          title: `💬 Как прошла поездка в ${trip.to}?`,
          body: 'Оставьте отзыв о местах — это поможет другим путешественникам.',
          data: { tripId: trip.id, type: 'review_request' },
        },
        trigger: { date: reviewDate },
      });
      ids.push(idReview);
    }
  }

  // Сохраняем id уведомлений для возможной отмены
  const raw = await AsyncStorage.getItem(NOTIF_IDS_KEY);
  const map: Record<string, string[]> = raw ? JSON.parse(raw) : {};
  map[trip.id] = ids;
  await AsyncStorage.setItem(NOTIF_IDS_KEY, JSON.stringify(map));
}

export async function cancelTripNotifications(tripId: string): Promise<void> {
  const raw = await AsyncStorage.getItem(NOTIF_IDS_KEY);
  if (!raw) return;
  const map: Record<string, string[]> = JSON.parse(raw);
  const ids = map[tripId] ?? [];
  await Promise.all(ids.map((id) => Notifications.cancelScheduledNotificationAsync(id)));
  delete map[tripId];
  await AsyncStorage.setItem(NOTIF_IDS_KEY, JSON.stringify(map));
}
```

> **Важно:** Исправь имя функции `scheduleTrip Notifications` — там пробел закрался при написании, должно быть `scheduleTripNotifications`.

---

### 6.3. Подключить уведомления при сохранении поездки

Файл: `store/useStore.ts`

Найди экшен `saveTrip`:
```typescript
saveTrip: (trip) => {
  // ... существующая логика ...
},
```

Добавь вызов сервиса уведомлений:
```typescript
import { scheduleTripNotifications } from '@/store/notificationsService';

saveTrip: (trip) => {
  set((state) => ({ trips: sortTripsForUi([...state.trips, trip]) }));
  void upsertTripToDb(trip);
  // Планируем уведомления
  void scheduleTripNotifications({
    id: trip.id,
    to: trip.to,
    startDate: trip.startDate,
    endDate: trip.endDate,
  });
},
```

---

### 6.4. Отмена уведомлений при удалении поездки

Файл: `store/useStore.ts`

Найди экшен `deleteTrip` и добавь:
```typescript
import { cancelTripNotifications } from '@/store/notificationsService';

deleteTrip: (id) => {
  void cancelTripNotifications(id);  // ← ДОБАВИТЬ
  set((state) => ({ trips: state.trips.filter((t) => t.id !== id) }));
  void deleteTripFromDb(id);
},
```

---

### 6.5. Обработка тапа на уведомление

Файл: `app/_layout.tsx`

В `RootLayout` добавь обработчик:
```typescript
import * as Notifications from 'expo-notifications';
import { useRouter } from 'expo-router';

// Внутри компонента RootLayout:
const router = useRouter();

useEffect(() => {
  // Обработка тапа на уведомление когда приложение открыто
  const sub = Notifications.addNotificationResponseReceivedListener((response) => {
    const data = response.notification.request.content.data;
    if (data?.tripId && typeof data.tripId === 'string') {
      router.push(`/trip/${data.tripId}`);
    }
  });
  return () => sub.remove();
}, []);

// Обработка если приложение было закрыто (запущено через тап уведомления)
useEffect(() => {
  Notifications.getLastNotificationResponseAsync().then((response) => {
    if (!response) return;
    const data = response.notification.request.content.data;
    if (data?.tripId && typeof data.tripId === 'string') {
      router.replace(`/trip/${data.tripId}`);
    }
  });
}, []);
```

---

### 6.6. Экран настроек уведомлений

Файл: `app/(profile)/notifications.tsx` (создать; папку `(profile)` создать если нет)

Простой экран с тогглами:

| Тоггл | Ключ в AsyncStorage | По умолчанию |
|-------|---------------------|--------------|
| За 7 дней до поездки | `notif.pref.7days` | true |
| За 1 день до поездки | `notif.pref.1day` | true |
| В день старта | `notif.pref.departure` | true |
| Запрос отзыва | `notif.pref.review` | true |

Добавь ссылку на этот экран в `profile.tsx` в секцию «Предпочтения»:
```typescript
{
  icon: 'notifications-outline',
  label: 'Уведомления',
  subtitle: 'Напоминания о поездках',
  onPress: () => router.push('/(profile)/notifications' as never),
}
```

---

## Критерии готовности Sprint 6

- [ ] Разрешения запрашиваются корректно (iOS: системный диалог)
- [ ] При сохранении поездки с датой > 7 дней — уведомление за 7 дней планируется
- [ ] При удалении поездки — все уведомления отменяются
- [ ] Тап на уведомление открывает нужную поездку (проверить через симулятор уведомлений)
- [ ] Экран настроек уведомлений открывается из профиля

---

---

# СПРИНТ 7 — Travel Wallet

**Цель:** Хранение билетов, броней и документов в виде PDF/фото, привязанных к поездкам.  
**Срок:** 2 недели

---

### 7.1. Установка зависимостей

```bash
npx expo install expo-document-picker expo-file-system expo-sharing
```

---

### 7.2. Добавить тип TripDocument

Файл: `constants/data.ts`

```typescript
export type DocumentType =
  | 'flight_ticket'
  | 'train_ticket'
  | 'hotel_booking'
  | 'insurance'
  | 'visa'
  | 'other';

export const DOCUMENT_TYPE_LABELS: Record<DocumentType, string> = {
  flight_ticket: '✈️ Авиабилет',
  train_ticket: '🚂 Ж/д билет',
  hotel_booking: '🏨 Бронь отеля',
  insurance: '🛡️ Страховка',
  visa: '📋 Виза',
  other: '📎 Другое',
};

export interface TripDocument {
  id: string;
  tripId: string;
  type: DocumentType;
  name: string;          // имя файла или пользовательское название
  uri: string;           // локальный путь в FileSystem.documentDirectory
  mimeType: string;      // 'application/pdf' | 'image/jpeg' | 'image/png'
  sizeBytes: number;
  uploadedAt: string;    // ISO 8601
}
```

---

### 7.3. Создать store/walletDb.ts

Хранилище документов в SQLite (отдельная таблица, не хранить в JSON поездок — файлы большие).

```typescript
import * as SQLite from 'expo-sqlite';
import * as FileSystem from 'expo-file-system';
import { TripDocument } from '@/constants/data';

const DB_NAME = 'travel_app.db';  // тот же файл БД что и поездки

async function getDb() {
  return SQLite.openDatabaseAsync(DB_NAME);
}

export async function initWalletDb(): Promise<void> {
  const db = await getDb();
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS documents (
      id TEXT PRIMARY KEY,
      trip_id TEXT NOT NULL,
      type TEXT NOT NULL,
      name TEXT NOT NULL,
      uri TEXT NOT NULL,
      mime_type TEXT NOT NULL,
      size_bytes INTEGER NOT NULL,
      uploaded_at TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_documents_trip ON documents(trip_id);
  `);
}

export async function addDocument(doc: TripDocument): Promise<void> {
  const db = await getDb();
  await db.runAsync(
    `INSERT OR REPLACE INTO documents
     (id, trip_id, type, name, uri, mime_type, size_bytes, uploaded_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [doc.id, doc.tripId, doc.type, doc.name, doc.uri, doc.mimeType, doc.sizeBytes, doc.uploadedAt]
  );
}

export async function getDocuments(tripId: string): Promise<TripDocument[]> {
  const db = await getDb();
  const rows = await db.getAllAsync<{
    id: string; trip_id: string; type: string; name: string;
    uri: string; mime_type: string; size_bytes: number; uploaded_at: string;
  }>('SELECT * FROM documents WHERE trip_id = ? ORDER BY uploaded_at DESC', [tripId]);
  return rows.map((r) => ({
    id: r.id,
    tripId: r.trip_id,
    type: r.type as TripDocument['type'],
    name: r.name,
    uri: r.uri,
    mimeType: r.mime_type,
    sizeBytes: r.size_bytes,
    uploadedAt: r.uploaded_at,
  }));
}

export async function deleteDocument(docId: string): Promise<void> {
  const db = await getDb();
  // Получаем URI перед удалением чтобы удалить файл
  const row = await db.getFirstAsync<{ uri: string }>(
    'SELECT uri FROM documents WHERE id = ?', [docId]
  );
  await db.runAsync('DELETE FROM documents WHERE id = ?', [docId]);
  // Удаляем физический файл
  if (row?.uri) {
    await FileSystem.deleteAsync(row.uri, { idempotent: true });
  }
}
```

---

### 7.4. Добавить документы в useStore

Файл: `store/useStore.ts`

В интерфейс `AppStore` добавь:
```typescript
addDocument: (tripId: string, asset: { uri: string; name: string; mimeType: string; size: number }, type: DocumentType) => Promise<{ ok: boolean; message?: string }>;
removeDocument: (docId: string) => Promise<void>;
getDocumentsForTrip: (tripId: string) => Promise<TripDocument[]>;
```

Импортируй из `walletDb.ts` и реализуй:

```typescript
addDocument: async (tripId, asset, type) => {
  try {
    const ext = asset.mimeType === 'application/pdf' ? '.pdf'
      : asset.mimeType === 'image/png' ? '.png' : '.jpg';
    const fileName = `doc_${Date.now()}${ext}`;
    const destUri = `${FileSystem.documentDirectory}wallet/${fileName}`;

    // Убедимся что папка существует
    await FileSystem.makeDirectoryAsync(
      `${FileSystem.documentDirectory}wallet/`,
      { intermediates: true }
    );

    // Копируем файл в наше хранилище
    await FileSystem.copyAsync({ from: asset.uri, to: destUri });

    const doc: TripDocument = {
      id: `doc_${Date.now()}_${Math.random().toString(36).slice(2)}`,
      tripId,
      type,
      name: asset.name,
      uri: destUri,
      mimeType: asset.mimeType,
      sizeBytes: asset.size,
      uploadedAt: new Date().toISOString(),
    };

    await addDocumentDb(doc);
    return { ok: true };
  } catch (e) {
    return { ok: false, message: 'Не удалось сохранить документ' };
  }
},

removeDocument: async (docId) => {
  await deleteDocumentDb(docId);
},

getDocumentsForTrip: async (tripId) => {
  return getDocumentsDb(tripId);
},
```

> Переименуй импорты из `walletDb.ts` чтобы не конфликтовать с именами в store: `addDocument as addDocumentDb` и т.д.

Также добавь `initWalletDb()` в `app/_layout.tsx` в блок bootstrap рядом с `initializeTripsDb()`.

---

### 7.5. Экран Travel Wallet

Файл: `app/(wallet)/index.tsx` (создать; папку `(wallet)` создать)

**Структура экрана:**
1. Шапка с заголовком «Travel Wallet»
2. Список поездок у которых есть документы (или все поездки с кнопкой добавить)
3. Для каждой поездки — карточки документов

**Компонент DocumentCard** (`components/DocumentCard.tsx`):

```tsx
interface Props {
  doc: TripDocument;
  onOpen: () => void;
  onDelete: () => void;
}
```

Отображает:
- Иконку типа документа (из `DOCUMENT_TYPE_LABELS`)
- Название файла
- Размер в КБ/МБ
- Дату загрузки
- Кнопки «Открыть» и «Удалить»

**Кнопка «Открыть»:**
```typescript
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';

const openDocument = async (doc: TripDocument) => {
  const canShare = await Sharing.isAvailableAsync();
  if (canShare) {
    await Sharing.shareAsync(doc.uri, {
      mimeType: doc.mimeType,
      dialogTitle: doc.name,
    });
  } else {
    Alert.alert('Ошибка', 'Просмотр файлов недоступен на этом устройстве');
  }
};
```

---

### 7.6. Кнопка «+ Добавить документ»

Использует `expo-document-picker`:

```typescript
import * as DocumentPicker from 'expo-document-picker';

const handlePickDocument = async (tripId: string) => {
  const result = await DocumentPicker.getDocumentAsync({
    type: ['application/pdf', 'image/jpeg', 'image/png'],
    copyToCacheDirectory: true,
  });

  if (result.canceled || !result.assets[0]) return;
  const asset = result.assets[0];

  // Показать sheet выбора типа документа
  Alert.alert(
    'Тип документа',
    'Выберите тип документа',
    Object.entries(DOCUMENT_TYPE_LABELS).map(([type, label]) => ({
      text: label,
      onPress: () => addDocument(tripId, {
        uri: asset.uri,
        name: asset.name,
        mimeType: asset.mimeType ?? 'application/octet-stream',
        size: asset.size ?? 0,
      }, type as DocumentType),
    }))
  );
};
```

---

### 7.7. Кнопка «Документы» в поездке

Файл: `app/trip/[id].tsx`

Добавь кнопку в шапку или нижнюю область экрана:
```tsx
<TouchableOpacity
  onPress={() => router.push(`/(wallet)/trip/${trip.id}` as never)}
  accessibilityLabel="Документы поездки"
  accessibilityRole="button"
>
  <Ionicons name="wallet-outline" size={22} color={Colors.primary} />
  <Text>Документы</Text>
</TouchableOpacity>
```

Также добавь вкладку «Wallet» в `profile.tsx` → ссылка на `/(wallet)/index`.

---

## Критерии готовности Sprint 7

- [ ] PDF/фото добавляются через picker и сохраняются локально
- [ ] Документы привязаны к конкретной поездке
- [ ] Документ открывается через системный просмотрщик
- [ ] Удаление документа удаляет файл с диска
- [ ] Документы видны без интернета (локальные файлы)
- [ ] Экран Wallet открывается из профиля и из карточки поездки

---

---

# СПРИНТ 8 — Оффлайн-режим

**Цель:** Приложение работает в авиарежиме — поездки открываются, документы доступны, UI корректно реагирует на отсутствие сети.  
**Срок:** 2 недели

---

### 8.1. Установка @react-native-community/netinfo

```bash
npx expo install @react-native-community/netinfo
```

---

### 8.2. Создать хук useNetworkStatus

Файл: `hooks/useNetworkStatus.ts`

```typescript
import { useEffect, useState } from 'react';
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';

export function useNetworkStatus() {
  const [isOnline, setIsOnline] = useState(true);
  const [isConnected, setIsConnected] = useState<boolean | null>(null);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state: NetInfoState) => {
      const online = state.isConnected === true && state.isInternetReachable !== false;
      setIsOnline(online);
      setIsConnected(state.isConnected);
    });

    // Начальная проверка
    NetInfo.fetch().then((state) => {
      const online = state.isConnected === true && state.isInternetReachable !== false;
      setIsOnline(online);
      setIsConnected(state.isConnected);
    });

    return () => unsubscribe();
  }, []);

  return { isOnline, isConnected };
}
```

---

### 8.3. Компонент OfflineBanner

Файл: `components/OfflineBanner.tsx`

```tsx
import { useNetworkStatus } from '@/hooks/useNetworkStatus';

export function OfflineBanner() {
  const { isOnline } = useNetworkStatus();

  if (isOnline) return null;

  return (
    <View style={styles.banner} accessibilityLiveRegion="polite">
      <Ionicons name="cloud-offline-outline" size={16} color="#fff" />
      <Text style={styles.text}>Нет интернета — оффлайн режим</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    backgroundColor: '#374151',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: Spacing.base,
  },
  text: {
    color: '#fff',
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.medium,
  },
});
```

Добавь `<OfflineBanner />` в `app/_layout.tsx` — в `<Stack>` перед `<Stack.Screen>`, чтобы баннер был виден на всех экранах.

---

### 8.4. Отключить кнопки Яндекс/Островок при оффлайн

Файлы: `app/result.tsx` и `app/trip/[id].tsx`

В компонентах вкладок «Транспорт» и «Жильё»:

```typescript
const { isOnline } = useNetworkStatus();

// На кнопке deep link:
<TouchableOpacity
  onPress={() => isOnline ? Linking.openURL(link) : Alert.alert('Нет интернета', 'Подключитесь к сети для поиска билетов и отелей.')}
  style={[styles.bookBtn, !isOnline && styles.bookBtnDisabled]}
  disabled={!isOnline}
>
  <Text>Искать на Яндекс Путешествиях</Text>
</TouchableOpacity>
```

---

### 8.5. Создать store/offlineService.ts

```typescript
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Trip } from '@/constants/data';

const OFFLINE_PREFIX = 'offline_trip_';

export async function cacheTrip(trip: Trip): Promise<void> {
  await AsyncStorage.setItem(
    `${OFFLINE_PREFIX}${trip.id}`,
    JSON.stringify(trip)
  );
}

export async function getCachedTrip(tripId: string): Promise<Trip | null> {
  const raw = await AsyncStorage.getItem(`${OFFLINE_PREFIX}${tripId}`);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as Trip;
  } catch {
    return null;
  }
}

export async function removeCachedTrip(tripId: string): Promise<void> {
  await AsyncStorage.removeItem(`${OFFLINE_PREFIX}${tripId}`);
}

export async function getCachedTripIds(): Promise<string[]> {
  const keys = await AsyncStorage.getAllKeys();
  return keys
    .filter((k) => k.startsWith(OFFLINE_PREFIX))
    .map((k) => k.replace(OFFLINE_PREFIX, ''));
}
```

---

### 8.6. Кнопка «Сохранить для оффлайн»

Файл: `app/trip/[id].tsx`

```tsx
const [isCached, setIsCached] = useState(false);

useEffect(() => {
  getCachedTrip(trip.id).then((cached) => setIsCached(Boolean(cached)));
}, [trip.id]);

const handleOfflineToggle = async () => {
  if (isCached) {
    await removeCachedTrip(trip.id);
    setIsCached(false);
  } else {
    await cacheTrip(trip);
    setIsCached(true);
  }
};

// В шапке экрана:
<TouchableOpacity onPress={handleOfflineToggle} accessibilityLabel={isCached ? 'Удалить из оффлайн' : 'Сохранить для оффлайн'}>
  <Ionicons
    name={isCached ? 'checkmark-circle' : 'cloud-download-outline'}
    size={22}
    color={isCached ? Colors.success : Colors.primary}
  />
</TouchableOpacity>
```

---

### 8.7. Индикатор «Доступна оффлайн» в списке поездок

Файл: `app/(tabs)/trips.tsx`

```tsx
// В компоненте карточки поездки:
const [cachedIds, setCachedIds] = useState<string[]>([]);
useEffect(() => { getCachedTripIds().then(setCachedIds); }, []);

// На карточке:
{cachedIds.includes(trip.id) && (
  <View style={styles.offlineBadge}>
    <Ionicons name="cloud-done-outline" size={12} color={Colors.success} />
    <Text style={styles.offlineBadgeText}>Оффлайн</Text>
  </View>
)}
```

---

## Критерии готовности Sprint 8

- [ ] В авиарежиме: баннер «Нет интернета» появляется
- [ ] В авиарежиме: кнопки Яндекс/Островок заблокированы с сообщением
- [ ] Поездка, сохранённая для оффлайн, открывается без сети
- [ ] Иконка «Доступна оффлайн» видна в списке поездок
- [ ] Документы в Wallet открываются без сети (они хранятся локально)

---

---

# СПРИНТ 9 — Travel Mode + Шаринг

**Цель:** Упрощённый режим «в поездке» с текущим днём и крупным текстом. Поделиться маршрутом через системный Share.  
**Срок:** 2 недели

---

## Блок A — Travel Mode

### 9.1. Экран Travel Mode

Файл: `app/travel-mode/[id].tsx` (создать папку `travel-mode`)

Это полностью отдельный экран. Он сознательно прост — пользователь видит только текущий день поездки.

**Логика «текущий день»:**
```typescript
function getCurrentDayIndex(trip: Trip): number {
  const today = new Date().toISOString().slice(0, 10);
  const startDate = new Date(trip.startDate);
  const todayDate = new Date(today);
  const diffDays = Math.floor(
    (todayDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
  );
  return Math.max(0, Math.min(diffDays, trip.days.length - 1));
}
```

**Структура экрана:**

```
┌─────────────────────────────────────┐
│ ← Выйти из Travel Mode              │
│                                     │
│ Санкт-Петербург  🌤 +18°            │
│ ──────────────────────────────────  │
│   ДЕНЬ 2 из 5  •  Среда, 18 июня    │
│                                     │
│  📍 10:00  Эрмитаж                  │
│      2.5 часа   · Бесплатно          │
│      [Маршрут →]                    │
│                                     │
│  🍽 13:30  Ресторан «Пушкин»        │
│      1 час                          │
│      [Маршрут →]                    │
│                                     │
│ [← Пред. день]  [След. день →]      │
│                                     │
│  🚨 Экстренные: 112  103  102       │
│                                     │
│ [🎫 Мой билет]  [🏨 Мой отель]      │
└─────────────────────────────────────┘
```

**Кнопка «Маршрут →»** открывает deep link на Яндекс Навигатор (аналогично `TripMap` из Sprint 3).

**Кнопки «Мой билет» / «Мой отель»** → открывают Wallet-документы типа `flight_ticket` или `hotel_booking` для этой поездки.

**Стиль:** Увеличенный шрифт (`Typography.sizes.md` и крупнее), высокий контраст. Для ♿ режима — ещё больше:
```typescript
const { accessibilitySettings } = useStore();
const fontSize = accessibilitySettings?.largeText
  ? Typography.sizes.lg
  : Typography.sizes.md;
```

---

### 9.2. Кнопка «Войти в Travel Mode» в trip/[id].tsx

```tsx
// В шапке экрана поездки:
{trip.status === 'upcoming' || trip.status === 'past' ? (
  <TouchableOpacity
    style={styles.travelModeBtn}
    onPress={() => router.push(`/travel-mode/${trip.id}`)}
    accessibilityLabel="Войти в режим поездки"
    accessibilityRole="button"
  >
    <Ionicons name="navigate" size={18} color="#fff" />
    <Text style={styles.travelModeBtnText}>Travel Mode</Text>
  </TouchableOpacity>
) : null}
```

---

### 9.3. Экстренные контакты в Travel Mode

Жёстко заданные в константе (можно вынести в `constants/emergency.ts`):

```typescript
export const EMERGENCY_CONTACTS = {
  russia: [
    { label: 'Единый', number: '112' },
    { label: 'Скорая', number: '103' },
    { label: 'Полиция', number: '102' },
    { label: 'Пожарная', number: '101' },
  ],
  // Добавить 3-5 популярных стран
  turkey: [
    { label: 'Экстренный', number: '112' },
    { label: 'Полиция', number: '155' },
    { label: 'Скорая', number: '112' },
  ],
  // ...
};
```

В Travel Mode — маленькая строка с номерами, при нажатии → `Linking.openURL('tel:112')`.

---

## Блок B — Шаринг

### 9.4. Создать store/shareService.ts

```typescript
import { Share } from 'react-native';
import { Trip } from '@/constants/data';

export function formatTripForSharing(trip: Trip): string {
  const lines: string[] = [
    `🗺️ Маршрут «${trip.to}»`,
    `📅 ${trip.startDate} — ${trip.endDate}`,
    `💰 Бюджет: ${trip.budget.toLocaleString('ru-RU')} ₽`,
    '',
  ];

  trip.days.forEach((day, idx) => {
    lines.push(`📍 День ${idx + 1}:`);
    day.places.forEach((place) => {
      lines.push(`  ${place.time ?? ''} ${place.name}`);
    });
    lines.push('');
  });

  lines.push('— Составлено в приложении Штурман 🧭');
  return lines.join('\n');
}

export async function shareTrip(trip: Trip): Promise<void> {
  const message = formatTripForSharing(trip);
  await Share.share(
    { message, title: `Маршрут в ${trip.to}` },
    { dialogTitle: `Поделиться маршрутом в ${trip.to}` }
  );
}
```

---

### 9.5. Кнопка «Поделиться» в result.tsx и trip/[id].tsx

```tsx
import { shareTrip } from '@/store/shareService';

// В шапке или футере экрана:
<TouchableOpacity
  onPress={() => shareTrip(trip)}
  accessibilityLabel="Поделиться маршрутом"
  accessibilityRole="button"
>
  <Ionicons name="share-outline" size={22} color={Colors.primary} />
</TouchableOpacity>
```

---

## Критерии готовности Sprint 9

- [ ] Travel Mode открывается из экрана поездки
- [ ] Показывается текущий день (вычисляется по дате)
- [ ] Кнопка «Маршрут» в каждой точке открывает навигацию
- [ ] Кнопки «Мой билет» / «Мой отель» открывают документы из Wallet
- [ ] Экстренные контакты видны и кликабельны
- [ ] Кнопка «Поделиться» открывает системный Share с текстом маршрута
- [ ] Текст шаринга читабелен (имена мест, даты, бюджет)

---

---

# СПРИНТ 10 — Отзывы и рейтинги

**Цель:** Пользователь может оставить оценку и отзыв на место. Есть блок ♿-доступности.  
**Срок:** 2 недели

---

### 10.1. Добавить тип Review

Файл: `constants/data.ts`

```typescript
export interface Review {
  id: string;
  tripId: string;
  placeId: string;
  placeName: string;     // денормализованное имя для отображения
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
  photos: string[];      // uri локальных фото (пока пустой массив — фото в следующей версии)
  createdAt: string;

  // ♿ Блок доступности
  accessibilityRating?: 'yes' | 'no' | 'partial' | 'unknown';
  accessibilityComment?: string;
}
```

---

### 10.2. Создать store/reviewsDb.ts

Аналогично `walletDb.ts` — SQLite таблица `reviews`:

```typescript
export async function initReviewsDb(): Promise<void>
export async function addReview(review: Review): Promise<void>
export async function getReviewsForPlace(placeId: string): Promise<Review[]>
export async function getReviewsForTrip(tripId: string): Promise<Review[]>
export async function deleteReview(reviewId: string): Promise<void>
```

Схема таблицы:
```sql
CREATE TABLE IF NOT EXISTS reviews (
  id TEXT PRIMARY KEY,
  trip_id TEXT NOT NULL,
  place_id TEXT NOT NULL,
  place_name TEXT NOT NULL,
  rating INTEGER NOT NULL,
  text TEXT NOT NULL,
  photos TEXT NOT NULL DEFAULT '[]',
  created_at TEXT NOT NULL,
  accessibility_rating TEXT,
  accessibility_comment TEXT
);
CREATE INDEX IF NOT EXISTS idx_reviews_place ON reviews(place_id);
CREATE INDEX IF NOT EXISTS idx_reviews_trip ON reviews(trip_id);
```

Добавь `initReviewsDb()` в bootstrap в `app/_layout.tsx`.

---

### 10.3. Добавить экшены в useStore

Файл: `store/useStore.ts`

```typescript
addReview: (review: Review) => Promise<void>;
getReviewsForPlace: (placeId: string) => Promise<Review[]>;
getMyReviews: () => Promise<Review[]>;
deleteReview: (reviewId: string) => Promise<void>;
```

Реализация — тонкая обёртка над `reviewsDb.ts`.

---

### 10.4. Компонент AddReviewModal

Файл: `components/AddReviewModal.tsx`

**Пропсы:**
```typescript
interface Props {
  visible: boolean;
  tripId: string;
  place: Place;
  onClose: () => void;
  onSubmit: (review: Review) => void;
}
```

**Структура формы:**

```
┌─────────────────────────────────────────┐
│  Отзыв о: Эрмитаж                       │
│                                         │
│  Оценка:  ★ ★ ★ ★ ☆                    │
│                                         │
│  Комментарий:                           │
│  ┌─────────────────────────────────┐    │
│  │ Введите впечатления...          │    │
│  └─────────────────────────────────┘    │
│                                         │
│  ♿ Доступность:                        │
│  ○ Полностью доступно                   │
│  ● Частично доступно                    │
│  ○ Недоступно                           │
│  ○ Не знаю                              │
│                                         │
│  Комментарий о доступности:             │
│  ┌─────────────────────────────────┐    │
│  │ Лифт не работал...              │    │
│  └─────────────────────────────────┘    │
│                                         │
│  [Отмена]           [Опубликовать]      │
└─────────────────────────────────────────┘
```

**Звёздный рейтинг** — реализуй как 5 кнопок-звёзд:
```tsx
{[1, 2, 3, 4, 5].map((star) => (
  <TouchableOpacity
    key={star}
    onPress={() => setRating(star as 1 | 2 | 3 | 4 | 5)}
    accessibilityLabel={`${star} звезд из 5`}
    accessibilityRole="radio"
    accessibilityState={{ selected: rating === star }}
  >
    <Ionicons
      name={star <= rating ? 'star' : 'star-outline'}
      size={28}
      color={star <= rating ? '#F59E0B' : Colors.border}
    />
  </TouchableOpacity>
))}
```

---

### 10.5. Кнопка «Оставить отзыв» на карточках мест

Файлы: `app/result.tsx` и `app/trip/[id].tsx`

Показывать кнопку только для прошедших или текущих поездок (`trip.status === 'past'`):

```tsx
{trip.status === 'past' && (
  <TouchableOpacity
    onPress={() => { setReviewPlace(place); setReviewModalVisible(true); }}
    style={styles.reviewBtn}
    accessibilityLabel={`Оставить отзыв о ${place.name}`}
    accessibilityRole="button"
  >
    <Ionicons name="chatbubble-outline" size={16} color={Colors.primary} />
    <Text style={styles.reviewBtnText}>Отзыв</Text>
  </TouchableOpacity>
)}
```

---

### 10.6. Отображение отзывов под карточкой места

Создай компонент `components/ReviewsList.tsx`:

```typescript
interface Props {
  placeId: string;
}
```

Компонент при монтировании загружает отзывы через `getReviewsForPlace(placeId)` и показывает их списком. Каждый отзыв — небольшая карточка: звёзды, текст, дата, и если есть — блок ♿.

---

### 10.7. «Мои отзывы» в профиле

Файл: `app/(tabs)/profile.tsx`

Добавь пункт в меню:
```typescript
{
  icon: 'chatbubbles-outline' as const,
  label: 'Мои отзывы',
  subtitle: 'История отзывов на места',
  onPress: () => router.push('/(profile)/my-reviews' as never),
}
```

Создай экран `app/(profile)/my-reviews.tsx` — список всех отзывов пользователя с возможностью удалить каждый.

---

## Критерии готовности Sprint 10

- [ ] Модал AddReviewModal открывается из карточки места в завершённой поездке
- [ ] Звёздный рейтинг и текст сохраняются
- [ ] Блок ♿ в форме отзыва заполняется и сохраняется
- [ ] Отзывы отображаются под карточкой места
- [ ] В профиле есть раздел «Мои отзывы» со списком
- [ ] Удаление отзыва из «Мои отзывы» работает

---

---

## Зависимости между спринтами

```
Sprint 5 (♿ атрибуты Place)
  └─► Sprint 10 (♿ в форме отзыва использует accessible из Place)

Sprint 6 (Push — запрос отзыва через день после поездки)
  └─► Sprint 10 (нотификация ведёт на форму отзыва)

Sprint 7 (Wallet — локальные файлы)
  └─► Sprint 8 (оффлайн: файлы доступны без сети — это уже факт)
  └─► Sprint 9 (Travel Mode: «Мой билет» из Wallet)

Sprint 9 (Travel Mode)
  └─► Sprint 10 (отзывы оставляются после завершения поездки)
```

---

## Переменные окружения — итог по спринтам 5–10

```bash
# Sprint 5 — Dark Mode (не нужны ключи, только код)

# Sprint 6 — Push (FCM для Android)
# google-services.json — файл скачать из Firebase Console

# Sprint 8 — Нет новых ключей

# Sprint 9 — Нет новых ключей

# Sprint 10 — Нет новых ключей
```

---

## Новые npm-пакеты по спринтам

| Спринт | Пакет | Команда |
|--------|-------|---------|
| 6 | expo-notifications | `npx expo install expo-notifications` |
| 7 | expo-document-picker | `npx expo install expo-document-picker` |
| 7 | expo-file-system | `npx expo install expo-file-system` |
| 7 | expo-sharing | `npx expo install expo-sharing` |
| 8 | @react-native-community/netinfo | `npx expo install @react-native-community/netinfo` |

> **Всегда используй `npx expo install`, не `npm install`** — это обеспечивает совместимые версии пакетов с текущим SDK Expo 51.

---

*Документ подготовлен: Апрель 2026. Штурман v2.0.*
