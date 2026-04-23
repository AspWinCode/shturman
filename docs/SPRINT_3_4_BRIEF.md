# Техническое задание для разработчика
## Спринт 3 (Интерактивная карта) и Спринт 4 (Редактирование маршрута + Погода)

**Проект:** Штурман — AI Travel Planner  
**Стек:** React Native (Expo ~51), TypeScript, Zustand, expo-router, SQLite (expo-sqlite), Node.js backend  
**Дата документа:** Апрель 2026

---

## Что из себя представляет проект

Мобильное приложение для планирования путешествий. Пользователь заполняет форму (откуда, куда, даты, бюджет, интересы) → приложение генерирует маршрут по дням с достопримечательностями → показывает транспорт и жильё через deep links на Яндекс Путешествия и Островок.

**Структура репозитория:**

```
D:\travel_app\
  app/                      # expo-router экраны
    (auth)/                 # логин, регистрация, восстановление пароля
    (tabs)/                 # нижняя навигация: home, create, trips, discover, profile
    trip/[id].tsx           # ОСНОВНОЙ экран просмотра сохранённой поездки
    result.tsx              # экран только что сгенерированной поездки
  components/               # переиспользуемые компоненты
    ui/                     # Button, Input, Card...
    auth/                   # OAuthButtons
  constants/
    data.ts                 # типы Trip, Place, Day и др.
    cityPlaces.ts           # база мест (17+ российских городов, ~200 объектов)
    colors.ts               # цветовые токены
    theme.ts                # Spacing, Typography, BorderRadius, Shadows
  store/
    useStore.ts             # Zustand store — главный state
    authApi.ts              # HTTP-клиент к backend
    authStorage.ts          # управление сессией (AsyncStorage + JWT)
    tripGenerator.ts        # генерация структуры Trip из формы
    yandexRaspApi.ts        # поиск транспорта (Яндекс Расписания)
    ostrovokApi.ts          # поиск отелей (Островок B2B)
    deepLinksService.ts     # deep links на Яндекс / Островок
    tripsDb.ts              # CRUD поездок в SQLite
  api/                      # Node.js backend (порт 8787)
    server.js               # все API-маршруты
    storage.js              # JSON-файл или PostgreSQL
  .env                      # переменные окружения
```

**Как запустить локально:**
```bash
# Терминал 1 — backend
node --env-file=.env api/server.js
# → http://localhost:8787

# Терминал 2 — Expo
npx expo start --clear
# → http://localhost:8081 (веб), QR для телефона
```

**Проверить TypeScript:** `npx tsc --noEmit` (должно быть 0 ошибок после каждой задачи)

---

## Что уже сделано до тебя

- ✅ Авторизация (email/пароль + OAuth Яндекс/Google/Apple — демо-режим)
- ✅ Форма создания поездки
- ✅ Генерация маршрута по дням (шаблонная, без AI)
- ✅ Экран `result.tsx` — вкладки: Маршрут / Транспорт / Жильё / Бюджет
- ✅ Экран `trip/[id].tsx` — просмотр сохранённой поездки (аналогичные вкладки)
- ✅ Deep links на Яндекс Путешествия и Островок
- ✅ Мультимодальный маршрут («Как добраться»: поезд + пешком + т.д.)
- ✅ Профиль, Discovery, удаление аккаунта

**Чего нет:** карты, редактирования мест в маршруте, прогноза погоды.

---

## Тип Place (важно для обоих спринтов)

Находится в `constants/data.ts`. Текущая структура:

```typescript
interface Place {
  id: string;
  name: string;
  description: string;
  duration: number;          // минут на посещение
  cost: number;              // стоимость ₽
  category: string;          // 'museum' | 'park' | 'restaurant' | 'attraction' | ...
  image?: string;
  rating?: number;
  address?: string;
  // lat и lng НЕ существуют пока — их нужно добавить в Sprint 3
}
```

Тип `Day` содержит `places: Place[]`. Тип `Trip` содержит `days: Day[]`.  
Посмотри файл целиком перед началом работы — там много типов, которые тебе понадобятся.

---

---

# СПРИНТ 3 — Интерактивная карта

**Цель:** Добавить вкладку «Карта» в экраны маршрута. На карте: маркеры всех мест поездки, цветные линии маршрута по дням, попап при тапе на маркер, кнопка навигации.

**Срок:** 2 недели

---

## Задача 3.1 — Установка библиотеки карт

**Что сделать:**
```bash
npx expo install react-native-maps
```

Добавить в `app.json` в секцию `plugins`:
```json
[
  "react-native-maps",
  {
    "googleMapsApiKey": "$(EXPO_PUBLIC_GOOGLE_MAPS_KEY)"
  }
]
```

Добавить в `.env`:
```
EXPO_PUBLIC_GOOGLE_MAPS_KEY=
```

> **Важно:** Для работы на Android нужен реальный API-ключ Google Maps. На iOS карта работает без ключа (Apple Maps). На веб — не работает совсем, это нормально, добавь заглушку.

**Проверка:** `npx tsc --noEmit` — 0 ошибок.

---

## Задача 3.2 — Добавить координаты в тип Place

В `constants/data.ts` найди интерфейс `Place` и добавь поля:

```typescript
interface Place {
  // ... существующие поля ...
  lat?: number;   // широта, например 55.7558
  lng?: number;   // долгота, например 37.6173
}
```

> **Почему `?` (опциональные):** Не все места в базе будут иметь координаты сразу — это нормально, карта просто не покажет их.

---

## Задача 3.3 — Добавить координаты в базу мест

Файл: `constants/cityPlaces.ts`

В этом файле находится массив мест по городам (Москва, СПб, Казань и т.д.). Нужно добавить `lat` и `lng` к каждому объекту. Минимум — покрыть все места в базе приблизительными координатами (точность 2–3 знака после запятой достаточна).

Пример того, что должно получиться:
```typescript
{
  id: 'msk-tretyakov',
  name: 'Третьяковская галерея',
  description: '...',
  lat: 55.7415,
  lng: 37.6208,
  // ...
}
```

Справочные координаты центров городов для ориентира:
| Город | lat | lng |
|-------|-----|-----|
| Москва | 55.7558 | 37.6173 |
| Санкт-Петербург | 59.9311 | 30.3609 |
| Казань | 55.7963 | 49.1088 |
| Сочи | 43.5992 | 39.7257 |
| Екатеринбург | 56.8389 | 60.6057 |
| Новосибирск | 54.9885 | 82.9207 |
| Нижний Новгород | 56.3269 | 44.0059 |
| Калининград | 54.7104 | 20.4522 |
| Владивосток | 43.1155 | 131.8855 |

Координаты конкретных мест ищи через Яндекс Карты или Google Maps — правый клик → «Что здесь?».

---

## Задача 3.4 — Создать компонент TripMap

**Файл:** `components/TripMap.tsx` (создать новый)

Компонент получает на вход список дней `Day[]` и отображает карту.

**Интерфейс пропсов:**
```typescript
interface TripMapProps {
  days: Day[];
  initialCity?: string;  // для начального позиционирования камеры
}
```

**Что должна делать карта:**
1. Отображать `MapView` (весь экран минус паддинг сверху)
2. Для каждого дня — маркеры всех мест этого дня (пропустить места без `lat`/`lng`)
3. Каждый день — свой цвет (массив: синий, зелёный, оранжевый, фиолетовый, красный)
4. Между маркерами одного дня — `<Polyline>` того же цвета
5. При тапе на маркер — показывать попап (используй `<Callout>` из `react-native-maps`)

**Попап маркера должен содержать:**
- Название места
- Категорию места (или время посещения)
- Кнопку «Маршрут» → при нажатии открывает Яндекс Навигатор

**Deep link на Яндекс Навигатор:**  
`yandexnavi://build_route_on_map?lat_to={lat}&lon_to={lng}`  
Если Яндекс не установлен — fallback на Google Maps:  
`https://maps.google.com/maps?daddr={lat},{lng}`

**Работа с `react-native-maps`:**
```typescript
import MapView, { Marker, Polyline, Callout } from 'react-native-maps';
```

**Начальная область карты** (`initialRegion`): Если есть первое место с координатами — центрировать на нём. Иначе — Москва (55.7558, 37.6173).

**Заглушка для веб** (Platform.OS === 'web'):
```tsx
if (Platform.OS === 'web') {
  return (
    <View style={styles.webPlaceholder}>
      <Text>Карта доступна в мобильном приложении</Text>
    </View>
  );
}
```

**Заглушка когда нет мест с координатами:**
```tsx
if (placesWithCoords.length === 0) {
  return (
    <View style={styles.emptyMap}>
      <Text>Координаты мест недоступны</Text>
    </View>
  );
}
```

---

## Задача 3.5 — Добавить вкладку «Карта» в result.tsx

Файл: `app/result.tsx`

В этом файле уже есть вкладки (маршрут, транспорт, жильё, бюджет). Нужно добавить ещё одну — «Карта».

**Что искать в файле:** Массив табов или константу типа:
```typescript
const TABS = ['Маршрут', 'Транспорт', 'Жильё', 'Бюджет'];
```
Добавь `'Карта'` в конец.

В секции рендера — добавь case для вкладки «Карта»:
```tsx
{activeTab === 'Карта' && (
  <TripMap days={generatedTrip.days} initialCity={generatedTrip.to} />
)}
```

Импорт вверху файла:
```typescript
import { TripMap } from '@/components/TripMap';
```

---

## Задача 3.6 — Добавить вкладку «Карта» в trip/[id].tsx

Файл: `app/trip/[id].tsx`

Аналогично задаче 3.5, но для экрана сохранённой поездки.

```tsx
{activeTab === 'Карта' && (
  <TripMap days={trip.days} initialCity={trip.to} />
)}
```

---

## Задача 3.7 — Генератор маршрутов должен добавлять координаты

Файл: `store/tripGenerator.ts`

При генерации поездки места берутся из `cityPlaces.ts`. Убедись, что функция генерации не обрезает поля `lat` и `lng` при создании объектов `Place`. 

Найди место где создаётся/копируется объект `Place` и убедись что `lat` и `lng` сохраняются:
```typescript
const place: Place = {
  ...sourcePlace,      // lat и lng должны сюда попасть
  // ...дополнительные поля
};
```

---

## Задача 3.8 — Кластеризация маркеров (если много точек)

> **Это задача с пометкой «желательно» — делай если останется время.**

`react-native-maps` не поддерживает кластеризацию нативно. Можно использовать `react-native-map-clustering`:
```bash
npx expo install react-native-map-clustering
```
Оберни `MapView` в `ClusteredMapView` из этой библиотеки.

---

## Критерии готовности Sprint 3

- [ ] `npx tsc --noEmit` — 0 ошибок
- [ ] Вкладка «Карта» появилась в `result.tsx` и `trip/[id].tsx`
- [ ] На карте видны маркеры мест из маршрута (проверь на существующей поездке)
- [ ] Маркеры разных дней — разных цветов
- [ ] Линии маршрута соединяют точки каждого дня
- [ ] Тап на маркер → попап с названием места
- [ ] Кнопка «Маршрут» в попапе → открывает Яндекс Навигатор или Google Maps
- [ ] На веб и на устройствах без координат — отображается заглушка без крашей

---

---

# СПРИНТ 4 — Редактирование маршрута + Погода

**Цель:** Пользователь может добавлять и удалять места в каждом дне маршрута. В шапке маршрута и у каждого дня — прогноз погоды.

**Срок:** 2 недели

---

## Блок A — Редактирование маршрута

### Задача 4.1 — Экшены в store для добавления/удаления мест

Файл: `store/useStore.ts`

Нужно добавить два новых экшена в интерфейс `AppStore` и их реализацию.

**Добавить в интерфейс** (найди блок с `saveTrip`, `deleteTrip` и добавь рядом):
```typescript
addPlaceToDay: (tripId: string, dayIndex: number, place: Place) => void;
removePlaceFromDay: (tripId: string, dayIndex: number, placeId: string) => void;
```

**Реализация `addPlaceToDay`:**
```typescript
addPlaceToDay: (tripId, dayIndex, place) => {
  set((state) => {
    const trips = state.trips.map((trip) => {
      if (trip.id !== tripId) return trip;
      const days = trip.days.map((day, idx) => {
        if (idx !== dayIndex) return day;
        // Не добавлять дубликаты
        if (day.places.some((p) => p.id === place.id)) return day;
        return { ...day, places: [...day.places, place] };
      });
      return { ...trip, days };
    });
    return { trips };
  });
  // Сохранить в SQLite
  const updatedTrip = get().trips.find((t) => t.id === tripId);
  if (updatedTrip) void upsertTripToDb(updatedTrip);
},
```

**Реализация `removePlaceFromDay`:**
```typescript
removePlaceFromDay: (tripId, dayIndex, placeId) => {
  set((state) => {
    const trips = state.trips.map((trip) => {
      if (trip.id !== tripId) return trip;
      const days = trip.days.map((day, idx) => {
        if (idx !== dayIndex) return day;
        return { ...day, places: day.places.filter((p) => p.id !== placeId) };
      });
      return { ...trip, days };
    });
    return { trips };
  });
  const updatedTrip = get().trips.find((t) => t.id === tripId);
  if (updatedTrip) void upsertTripToDb(updatedTrip);
},
```

> Функция `upsertTripToDb` уже импортирована в `useStore.ts` из `@/store/tripsDb`.

---

### Задача 4.2 — Аналогичные экшены для generatedTrip (result.tsx)

В `result.tsx` показывается `generatedTrip` — это поездка, которую ещё не сохранили. Для неё нужны отдельные экшены (или единый с флагом).

Добавь в интерфейс и реализацию `useStore.ts`:

```typescript
addPlaceToGeneratedDay: (dayIndex: number, place: Place) => void;
removePlaceFromGeneratedDay: (dayIndex: number, placeId: string) => void;
```

Логика аналогична, только меняется `state.generatedTrip.days`.

---

### Задача 4.3 — Модальное окно AddPlaceModal

**Файл:** `components/AddPlaceModal.tsx` (создать новый)

Это нижний sheet (модал снизу), который показывается при нажатии «+ Добавить место».

**Пропсы:**
```typescript
interface AddPlaceModalProps {
  visible: boolean;
  onClose: () => void;
  onAdd: (place: Place) => void;
  city: string;         // для фильтрации мест по городу
  existingPlaceIds: string[];  // уже добавленные — не показывать или пометить
}
```

**Что делает модал:**
1. Показывает поле поиска (TextInput)
2. Под поиском — список мест из `cityPlaces.ts`, отфильтрованных по `city`
3. Поиск фильтрует по `name` и `category` по мере ввода
4. Уже добавленные места — показывать с галочкой и disabled
5. При тапе на место — вызывает `onAdd(place)` и закрывается

**Как получить список мест по городу:**
```typescript
import { getCityPlaces } from '@/constants/cityPlaces';
// или
import { CITY_PLACES } from '@/constants/cityPlaces';
const places = CITY_PLACES[city.toLowerCase()] ?? [];
```
> Посмотри как устроен `cityPlaces.ts` — там может быть другой экспорт. Адаптируй под реальную структуру.

**Стили:** Используй уже существующие токены из `constants/theme.ts` (Spacing, BorderRadius, Typography) и `constants/colors.ts`. Это критично — весь проект использует их.

---

### Задача 4.4 — Кнопка «+ Добавить место» в result.tsx

В конец каждого дня (после последней карточки места) добавить кнопку:

```tsx
<TouchableOpacity
  style={styles.addPlaceBtn}
  onPress={() => {
    setAddModalDayIndex(dayIndex);
    setAddModalVisible(true);
  }}
>
  <Ionicons name="add-circle-outline" size={20} color={Colors.primary} />
  <Text style={styles.addPlaceBtnText}>Добавить место</Text>
</TouchableOpacity>
```

Состояние для модала добавить в компонент:
```typescript
const [addModalVisible, setAddModalVisible] = useState(false);
const [addModalDayIndex, setAddModalDayIndex] = useState(0);
```

Подключить `AddPlaceModal`:
```tsx
<AddPlaceModal
  visible={addModalVisible}
  onClose={() => setAddModalVisible(false)}
  onAdd={(place) => {
    addPlaceToGeneratedDay(addModalDayIndex, place);
    setAddModalVisible(false);
  }}
  city={generatedTrip.to}
  existingPlaceIds={generatedTrip.days[addModalDayIndex]?.places.map(p => p.id) ?? []}
/>
```

---

### Задача 4.5 — Кнопка «+ Добавить место» в trip/[id].tsx

Аналогично задаче 4.4, но:
- Используй `addPlaceToDay(trip.id, dayIndex, place)` из store
- `city` = `trip.to`

---

### Задача 4.6 — Свайп-удаление места

В обоих файлах (`result.tsx` и `trip/[id].tsx`) карточки мест рендерятся в списке. Нужно добавить удаление свайпом вправо.

**Вариант без новых зависимостей** — использовать `Swipeable` из `react-native-gesture-handler` (уже установлен в проекте):

```typescript
import Swipeable from 'react-native-gesture-handler/Swipeable';
```

Оберни карточку места в `<Swipeable>`:
```tsx
<Swipeable
  renderRightActions={() => (
    <TouchableOpacity
      style={styles.deleteAction}
      onPress={() => handleRemovePlace(dayIndex, place.id)}
    >
      <Ionicons name="trash-outline" size={20} color="#fff" />
      <Text style={styles.deleteActionText}>Удалить</Text>
    </TouchableOpacity>
  )}
>
  {/* карточка места */}
</Swipeable>
```

**Функция удаления с подтверждением:**
```typescript
const handleRemovePlace = (dayIndex: number, placeId: string) => {
  Alert.alert(
    'Удалить место?',
    'Место будет убрано из маршрута этого дня.',
    [
      { text: 'Отмена', style: 'cancel' },
      {
        text: 'Удалить',
        style: 'destructive',
        onPress: () => removePlaceFromDay(trip.id, dayIndex, placeId),
      },
    ]
  );
};
```

---

## Блок B — Прогноз погоды

### Задача 4.7 — Создать weatherApi.ts

**Файл:** `store/weatherApi.ts` (создать новый)

Использует **OpenWeatherMap API** (бесплатный тариф позволяет прогноз на 5 дней).

Добавить в `.env`:
```
EXPO_PUBLIC_OPENWEATHER_KEY=
```

**Код файла:**
```typescript
const API_KEY = process.env.EXPO_PUBLIC_OPENWEATHER_KEY ?? '';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export interface DayWeather {
  date: string;         // 'YYYY-MM-DD'
  tempMin: number;      // °C
  tempMax: number;      // °C
  description: string;  // 'ясно', 'облачно' и т.д.
  icon: string;         // код иконки OpenWeatherMap, напр. '01d'
  iconUrl: string;      // https://openweathermap.org/img/wn/{icon}@2x.png
  isExtreme: boolean;   // tempMin < -20 или tempMax > 40
}

export interface WeatherForecast {
  city: string;
  days: DayWeather[];
}

// Перевод английских описаний погоды на русский
const WEATHER_RU: Record<string, string> = {
  'clear sky': 'ясно',
  'few clouds': 'малооблачно',
  'scattered clouds': 'переменная облачность',
  'broken clouds': 'облачно',
  'overcast clouds': 'пасмурно',
  'light rain': 'небольшой дождь',
  'moderate rain': 'дождь',
  'heavy intensity rain': 'сильный дождь',
  'thunderstorm': 'гроза',
  'snow': 'снег',
  'light snow': 'небольшой снег',
  'mist': 'туман',
  'fog': 'туман',
};

export async function getWeatherForecast(
  cityName: string,
  dates: string[]    // массив 'YYYY-MM-DD'
): Promise<WeatherForecast | null> {
  if (!API_KEY) {
    console.warn('[Weather] EXPO_PUBLIC_OPENWEATHER_KEY is not set');
    return null;
  }

  try {
    const url = `${BASE_URL}/forecast?q=${encodeURIComponent(cityName)}&appid=${API_KEY}&units=metric&lang=ru&cnt=40`;
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = await res.json();

    // API возвращает прогноз каждые 3 часа — нужно агрегировать по дням
    const byDate: Record<string, { temps: number[]; descriptions: string[]; icons: string[] }> = {};

    for (const item of data.list) {
      const date = item.dt_txt.slice(0, 10);
      if (!dates.includes(date)) continue;
      if (!byDate[date]) byDate[date] = { temps: [], descriptions: [], icons: [] };
      byDate[date].temps.push(item.main.temp);
      byDate[date].descriptions.push(item.weather[0].description);
      byDate[date].icons.push(item.weather[0].icon);
    }

    const days: DayWeather[] = dates.map((date) => {
      const d = byDate[date];
      if (!d) return null;
      const tempMin = Math.round(Math.min(...d.temps));
      const tempMax = Math.round(Math.max(...d.temps));
      const desc = d.descriptions[Math.floor(d.descriptions.length / 2)];
      const icon = d.icons[Math.floor(d.icons.length / 2)];
      return {
        date,
        tempMin,
        tempMax,
        description: WEATHER_RU[desc] ?? desc,
        icon,
        iconUrl: `https://openweathermap.org/img/wn/${icon}@2x.png`,
        isExtreme: tempMin < -20 || tempMax > 40,
      };
    }).filter(Boolean) as DayWeather[];

    return { city: cityName, days };
  } catch (err) {
    console.warn('[Weather] fetch error', err);
    return null;
  }
}
```

---

### Задача 4.8 — Создать компонент WeatherWidget

**Файл:** `components/WeatherWidget.tsx` (создать новый)

Компонент отображает погоду. Используется в двух вариантах:
- **summary** — строка из нескольких дней (в шапке маршрута)
- **day** — погода одного дня (рядом с заголовком дня)

**Пропсы:**
```typescript
interface WeatherWidgetProps {
  variant: 'summary' | 'day';
  weather: DayWeather | null;  // null = загрузка / нет данных
}
```

**Variant `day`** (мини-виджет рядом с датой дня):
```
☁️ +18°…+24°
```
- Иконка погоды (`<Image source={{ uri: weather.iconUrl }} style={{ width: 24, height: 24 }} />` или эмодзи-фолбэк)
- Температура диапазоном

**Variant `summary`** (в шапке маршрута):
```
┌─────────────────────────────────────────┐
│ 🌤 Погода в Санкт-Петербурге            │
│  Пн  +12..+18  ясно                     │
│  Вт  +10..+16  дождь           ⚠️       │
└─────────────────────────────────────────┘
```
- Если `weather.isExtreme === true` — показать баннер:
  ```tsx
  <View style={styles.extremeBanner}>
    <Ionicons name="warning-outline" size={16} color="#fff" />
    <Text>Экстремальные температуры — будьте осторожны</Text>
  </View>
  ```

**Null state** (данных нет): не рендери ничего (`return null`) — не ломай верстку.

---

### Задача 4.9 — Погода в result.tsx

В `result.tsx` найди место где рендерится шапка поездки (название города, даты) — добавь под ней `WeatherWidget`.

**Логика:** Прогноз нужно запрашивать при монтировании компонента:
```typescript
const [weather, setWeather] = useState<WeatherForecast | null>(null);

useEffect(() => {
  if (!generatedTrip) return;
  const dates = generatedTrip.days.map((d) => d.date);  // или как хранятся даты
  getWeatherForecast(generatedTrip.to, dates).then(setWeather);
}, [generatedTrip?.id]);
```

> Посмотри как хранится `day.date` в типе `Day` — там может быть строка YYYY-MM-DD или объект. Адаптируй под реальную структуру.

**В шапке маршрута:**
```tsx
<WeatherWidget variant="summary" weather={weather?.days[0] ?? null} />
```

**В заголовке каждого дня:**
```tsx
<WeatherWidget
  variant="day"
  weather={weather?.days.find(w => w.date === day.date) ?? null}
/>
```

---

### Задача 4.10 — Погода в trip/[id].tsx

Аналогично задаче 4.9, но для сохранённой поездки.

```typescript
useEffect(() => {
  if (!trip) return;
  const dates = trip.days.map(d => d.date);
  getWeatherForecast(trip.to, dates).then(setWeather);
}, [trip?.id]);
```

---

## Критерии готовности Sprint 4

- [ ] `npx tsc --noEmit` — 0 ошибок
- [ ] Кнопка «+ Добавить место» видна в конце каждого дня
- [ ] Модал открывается и показывает список мест города
- [ ] Поиск по имени места работает
- [ ] После добавления место появляется в маршруте
- [ ] Свайп вправо на карточке места → кнопка «Удалить»
- [ ] После удаления место исчезает из маршрута
- [ ] Изменения сохраняются после перезапуска приложения (SQLite)
- [ ] Прогноз погоды отображается в шапке маршрута (если есть API-ключ)
- [ ] При отсутствии API-ключа — компонент просто не рендерится, ошибок нет
- [ ] При экстремальной температуре (< −20 или > +40) — виден предупредительный баннер

---

## Общие правила оформления кода

1. **Стили** — только `StyleSheet.create({...})`, никаких inline-стилей кроме динамических.
2. **Цвета** — только из `Colors` (`import Colors from '@/constants/colors'`). Не хардкодить `'#FF0000'`.
3. **Отступы/размеры** — только из `Spacing`, `Typography`, `BorderRadius` (`import { Spacing, Typography, BorderRadius } from '@/constants/theme'`).
4. **Навигация** — только через `expo-router`: `router.push(...)`, `router.replace(...)`.
5. **Алерты** — `Alert.alert(...)` из `react-native`, никаких браузерных `alert()`.
6. **Состояние** — Zustand (`useStore`). Не создавать отдельные redux/context без согласования.
7. **Асинхронность** — `async/await`, не `.then().catch()` (кроме уже существующего кода).
8. **TypeScript strict** — не использовать `any`. Если не знаешь тип — ставь `unknown` и сужай.

---

## Что спросить у тимлида перед началом

1. Нужен ли реальный Google Maps API ключ для тестирования, или тестируем только на iOS (где работает без ключа)?
2. Нужен ли реальный OpenWeatherMap API ключ, или тестируем без него?
3. В каком формате хранятся даты в типе `Day` (строка `'YYYY-MM-DD'` или что-то другое)?
4. Кто отвечает за `.env` файл с реальными ключами?

---

*Документ подготовлен: Апрель 2026. Штурман v2.0.*
