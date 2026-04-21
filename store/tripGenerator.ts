import {
  DayPlan,
  Hotel,
  MultiModalLeg,
  MultiModalRoute,
  Place,
  Transport,
  Trip,
  TravelStyle,
  POPULAR_CITIES,
} from '@/constants/data';

interface TripFormInput {
  from: string;
  to: string;
  startDate: string;
  endDate: string;
  budget: number;
  travelers: number;
  interests: string[];
  travelStyle: TravelStyle;
}

type TimeSlot = 'morning' | 'afternoon' | 'evening';

interface PlaceTemplate {
  name: string;
  category: string;
  description: string;
  emoji: string;
  duration: string;
  price: string;
  rating: number;
  interests: string[];
  timeSlot: TimeSlot;
}

interface HotelTemplate {
  name: string;
  stars: number;
  rating: number;
  reviews: number;
  pricePerNight: number;
  distanceFromCenter: string;
  address: string;
  amenities: string[];
  image: string;
  styles: TravelStyle[];
}

interface RouteTransport {
  type: 'flight' | 'train' | 'bus';
  carrier: string;
  departure: string;
  arrival: string;
  duration: string;
  priceBase: number;
  class: string;
}

interface MultiModalTemplateLeg {
  mode: MultiModalLeg['mode'];
  from: string;
  to: string;
  departure: string;
  arrival: string;
  durationMinutes: number;
  distanceKm: number;
  priceBase: number;
  carrier?: string;
  line?: string;
}

const BUDGET_RATIOS: Record<TravelStyle, { transport: number; hotel: number; activities: number; food: number }> = {
  budget: { transport: 0.15, hotel: 0.38, activities: 0.17, food: 0.3 },
  standard: { transport: 0.18, hotel: 0.4, activities: 0.2, food: 0.22 },
  comfort: { transport: 0.2, hotel: 0.42, activities: 0.22, food: 0.16 },
  luxury: { transport: 0.22, hotel: 0.44, activities: 0.22, food: 0.12 },
};

const MIN_HOTEL_STARS: Record<TravelStyle, number> = {
  budget: 2,
  standard: 3,
  comfort: 4,
  luxury: 5,
};

const DEFAULT_PLACES: PlaceTemplate[] = [
  {
    name: 'Центральная площадь',
    category: 'Достопримечательность',
    description: 'Главная площадь города с исторической застройкой.',
    emoji: '🏛️',
    duration: '1.5 часа',
    price: 'Бесплатно',
    rating: 4.6,
    interests: ['history', 'architecture'],
    timeSlot: 'morning',
  },
  {
    name: 'Городской парк',
    category: 'Природа',
    description: 'Прогулка по зелёным аллеям и видовым точкам.',
    emoji: '🌳',
    duration: '2 часа',
    price: 'Бесплатно',
    rating: 4.5,
    interests: ['nature'],
    timeSlot: 'afternoon',
  },
  {
    name: 'Локальный ресторан',
    category: 'Еда',
    description: 'Знакомство с местной кухней в популярном ресторане.',
    emoji: '🍽️',
    duration: '1.5 часа',
    price: '1 000 ₽',
    rating: 4.7,
    interests: ['food'],
    timeSlot: 'evening',
  },
];

const CITY_PLACES: Record<string, PlaceTemplate[]> = {
  'санкт-петербург': [
    {
      name: 'Эрмитаж',
      category: 'Музей',
      description: 'Один из крупнейших музеев мира.',
      emoji: '🏛️',
      duration: '3-4 часа',
      price: '500 ₽',
      rating: 4.9,
      interests: ['museums', 'art', 'history'],
      timeSlot: 'morning',
    },
    {
      name: 'Невский проспект',
      category: 'Прогулка',
      description: 'Главная улица города с архитектурой и кафе.',
      emoji: '🚶',
      duration: '2 часа',
      price: 'Бесплатно',
      rating: 4.7,
      interests: ['architecture', 'shopping'],
      timeSlot: 'afternoon',
    },
    {
      name: 'Разводные мосты',
      category: 'Вечерняя программа',
      description: 'Ночной символ Петербурга.',
      emoji: '🌉',
      duration: '2 часа',
      price: 'Бесплатно',
      rating: 4.8,
      interests: ['architecture', 'nature'],
      timeSlot: 'evening',
    },
  ],
  москва: [
    {
      name: 'Красная площадь',
      category: 'История',
      description: 'Главная площадь страны и исторический центр.',
      emoji: '🧱',
      duration: '2 часа',
      price: 'Бесплатно',
      rating: 4.9,
      interests: ['history', 'architecture'],
      timeSlot: 'morning',
    },
    {
      name: 'ВДНХ',
      category: 'Архитектура',
      description: 'Большой выставочный комплекс и парки.',
      emoji: '🚀',
      duration: '3 часа',
      price: 'Бесплатно',
      rating: 4.7,
      interests: ['architecture', 'museums'],
      timeSlot: 'afternoon',
    },
    {
      name: 'Смотровая Москва-Сити',
      category: 'Вечерняя программа',
      description: 'Панорамный вид на вечерний город.',
      emoji: '🏙️',
      duration: '1.5 часа',
      price: '1 200 ₽',
      rating: 4.6,
      interests: ['architecture'],
      timeSlot: 'evening',
    },
  ],
  казань: [
    {
      name: 'Казанский Кремль',
      category: 'История',
      description: 'Исторический центр и объект ЮНЕСКО.',
      emoji: '🏰',
      duration: '2-3 часа',
      price: '200 ₽',
      rating: 4.8,
      interests: ['history', 'architecture'],
      timeSlot: 'morning',
    },
    {
      name: 'Улица Баумана',
      category: 'Прогулка',
      description: 'Пешеходная улица с кафе и сувенирами.',
      emoji: '🛍️',
      duration: '2 часа',
      price: 'Бесплатно',
      rating: 4.6,
      interests: ['shopping', 'food'],
      timeSlot: 'afternoon',
    },
    {
      name: 'Татарский ужин',
      category: 'Еда',
      description: 'Национальная кухня в центре города.',
      emoji: '🥘',
      duration: '1.5 часа',
      price: '1 500 ₽',
      rating: 4.7,
      interests: ['food'],
      timeSlot: 'evening',
    },
  ],
  сочи: [
    {
      name: 'Олимпийский парк',
      category: 'Достопримечательность',
      description: 'Наследие Олимпиады и прогулочные зоны.',
      emoji: '🏟️',
      duration: '2-3 часа',
      price: 'Бесплатно',
      rating: 4.7,
      interests: ['architecture', 'history'],
      timeSlot: 'morning',
    },
    {
      name: 'Роза Хутор',
      category: 'Природа',
      description: 'Горные виды и канатные дороги.',
      emoji: '🏔️',
      duration: '5 часов',
      price: '2 000 ₽',
      rating: 4.8,
      interests: ['nature', 'hiking'],
      timeSlot: 'afternoon',
    },
    {
      name: 'Набережная Сочи',
      category: 'Вечерняя программа',
      description: 'Вечерняя прогулка у моря.',
      emoji: '🌊',
      duration: '2 часа',
      price: 'Бесплатно',
      rating: 4.6,
      interests: ['beach', 'nature'],
      timeSlot: 'evening',
    },
  ],
  калининград: [
    {
      name: 'Остров Канта',
      category: 'История',
      description: 'Кафедральный собор и музейная зона.',
      emoji: '⛪',
      duration: '2 часа',
      price: '300 ₽',
      rating: 4.7,
      interests: ['history', 'architecture'],
      timeSlot: 'morning',
    },
    {
      name: 'Район Амалиенау',
      category: 'Архитектура',
      description: 'Историческая немецкая застройка.',
      emoji: '🏘️',
      duration: '2 часа',
      price: 'Бесплатно',
      rating: 4.6,
      interests: ['architecture'],
      timeSlot: 'afternoon',
    },
    {
      name: 'Рыбная деревня',
      category: 'Еда',
      description: 'Рестораны и набережная Преголи.',
      emoji: '🐟',
      duration: '1.5 часа',
      price: '1 300 ₽',
      rating: 4.5,
      interests: ['food'],
      timeSlot: 'evening',
    },
  ],
  владивосток: [
    {
      name: 'Токаревский маяк',
      category: 'Природа',
      description: 'Один из символов Владивостока на берегу Японского моря.',
      emoji: '🗼',
      duration: '1.5 часа',
      price: 'Бесплатно',
      rating: 4.8,
      interests: ['nature'],
      timeSlot: 'morning',
    },
    {
      name: 'Русский мост и кампус ДВФУ',
      category: 'Архитектура',
      description: 'Современный мост и видовые точки на острове Русский.',
      emoji: '🌉',
      duration: '2.5 часа',
      price: 'Бесплатно',
      rating: 4.7,
      interests: ['architecture', 'nature'],
      timeSlot: 'afternoon',
    },
    {
      name: 'Набережная Цесаревича',
      category: 'Прогулка',
      description: 'Вечерняя прогулка у залива и портовой панорамы.',
      emoji: '⚓',
      duration: '2 часа',
      price: 'Бесплатно',
      rating: 4.6,
      interests: ['nature', 'food'],
      timeSlot: 'evening',
    },
  ],
  иркутск: [
    {
      name: 'Листвянка и Байкал',
      category: 'Природа',
      description: 'Поездка к Байкалу и прогулка вдоль озера.',
      emoji: '🏞️',
      duration: '5 часов',
      price: '1 500 ₽',
      rating: 4.9,
      interests: ['nature', 'hiking'],
      timeSlot: 'morning',
    },
    {
      name: '130-й квартал',
      category: 'Архитектура',
      description: 'Реконструированный исторический квартал Иркутска.',
      emoji: '🏘️',
      duration: '2 часа',
      price: 'Бесплатно',
      rating: 4.5,
      interests: ['architecture', 'shopping'],
      timeSlot: 'afternoon',
    },
    {
      name: 'Ужин с байкальской кухней',
      category: 'Еда',
      description: 'Локальные блюда, включая рыбу омуль.',
      emoji: '🍲',
      duration: '1.5 часа',
      price: '1 400 ₽',
      rating: 4.6,
      interests: ['food'],
      timeSlot: 'evening',
    },
  ],
};

const DEFAULT_HOTELS: HotelTemplate[] = [
  {
    name: 'City Hotel',
    stars: 4,
    rating: 4.5,
    reviews: 1200,
    pricePerNight: 6500,
    distanceFromCenter: '0.8 км',
    address: 'Центральная улица, 10',
    amenities: ['WiFi', 'Завтрак', 'Ресторан'],
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400',
    styles: ['standard', 'comfort'],
  },
  {
    name: 'Budget Inn',
    stars: 3,
    rating: 4.2,
    reviews: 980,
    pricePerNight: 3400,
    distanceFromCenter: '1.5 км',
    address: 'Улица Мира, 22',
    amenities: ['WiFi', 'Завтрак'],
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400',
    styles: ['budget', 'standard'],
  },
  {
    name: 'Grand Resort',
    stars: 5,
    rating: 4.8,
    reviews: 1500,
    pricePerNight: 14000,
    distanceFromCenter: '0.4 км',
    address: 'Набережная, 1',
    amenities: ['WiFi', 'SPA', 'Бассейн', 'Ресторан'],
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400',
    styles: ['luxury', 'comfort'],
  },
];

const CITY_HOTELS: Record<string, HotelTemplate[]> = {
  москва: [
    {
      name: 'Marriott Moscow',
      stars: 5,
      rating: 4.7,
      reviews: 2200,
      pricePerNight: 13500,
      distanceFromCenter: '0.5 км',
      address: 'Тверская, 11',
      amenities: ['WiFi', 'SPA', 'Ресторан', 'Фитнес'],
      image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400',
      styles: ['comfort', 'luxury'],
    },
  ],
  'санкт-петербург': [
    {
      name: 'Невский Гранд Отель',
      stars: 4,
      rating: 4.6,
      reviews: 1900,
      pricePerNight: 7200,
      distanceFromCenter: '0.6 км',
      address: 'Невский проспект, 22',
      amenities: ['WiFi', 'Завтрак', 'Ресторан'],
      image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=400',
      styles: ['standard', 'comfort'],
    },
  ],
  казань: [
    {
      name: 'Korston Kazan',
      stars: 4,
      rating: 4.5,
      reviews: 1600,
      pricePerNight: 6800,
      distanceFromCenter: '0.8 км',
      address: 'Улица Ершова, 1A',
      amenities: ['WiFi', 'Завтрак', 'Фитнес'],
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400',
      styles: ['standard', 'comfort'],
    },
  ],
  сочи: [
    {
      name: 'Sochi Park Hotel',
      stars: 4,
      rating: 4.4,
      reviews: 1800,
      pricePerNight: 7600,
      distanceFromCenter: '1.2 км',
      address: 'Олимпийский проспект, 21',
      amenities: ['WiFi', 'Бассейн', 'Завтрак'],
      image: 'https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?w=400',
      styles: ['standard', 'comfort'],
    },
  ],
  калининград: [
    {
      name: 'Kaliningrad Hotel',
      stars: 4,
      rating: 4.4,
      reviews: 1100,
      pricePerNight: 5900,
      distanceFromCenter: '0.9 км',
      address: 'Ленинский проспект, 81',
      amenities: ['WiFi', 'Завтрак'],
      image: 'https://images.unsplash.com/photo-1600011689032-8b628b8a8747?w=400',
      styles: ['standard', 'comfort'],
    },
  ],
  владивосток: [
    {
      name: 'Azimut Vladivostok',
      stars: 4,
      rating: 4.5,
      reviews: 1700,
      pricePerNight: 7200,
      distanceFromCenter: '0.7 км',
      address: 'Набережная, 10',
      amenities: ['WiFi', 'Завтрак', 'Фитнес'],
      image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=400',
      styles: ['standard', 'comfort'],
    },
  ],
  иркутск: [
    {
      name: 'Angara Hotel',
      stars: 4,
      rating: 4.4,
      reviews: 1400,
      pricePerNight: 5600,
      distanceFromCenter: '0.5 км',
      address: 'Сухэ-Батора, 7',
      amenities: ['WiFi', 'Завтрак', 'Парковка'],
      image: 'https://images.unsplash.com/photo-1543489822-c49534f3271f?w=400',
      styles: ['standard', 'comfort'],
    },
  ],
};

const TRANSPORT_ROUTES: Partial<Record<string, RouteTransport[]>> = {
  'москва>санкт-петербург': [
    { type: 'flight', carrier: 'Аэрофлот', departure: '07:00', arrival: '08:25', duration: '1 ч 25 мин', priceBase: 4500, class: 'Эконом' },
    { type: 'train', carrier: 'Сапсан', departure: '06:45', arrival: '10:10', duration: '3 ч 25 мин', priceBase: 2800, class: 'Эконом' },
  ],
  'москва>казань': [
    { type: 'flight', carrier: 'Победа', departure: '08:30', arrival: '10:30', duration: '2 ч', priceBase: 3200, class: 'Эконом' },
    { type: 'train', carrier: 'РЖД', departure: '22:00', arrival: '08:10', duration: '10 ч 10 мин', priceBase: 1800, class: 'Купе' },
  ],
  'москва>сочи': [
    { type: 'flight', carrier: 'S7 Airlines', departure: '06:15', arrival: '09:30', duration: '2 ч 15 мин', priceBase: 5500, class: 'Эконом' },
  ],
  'москва>калининград': [
    { type: 'flight', carrier: 'Аэрофлот', departure: '07:30', arrival: '09:15', duration: '1 ч 45 мин', priceBase: 5800, class: 'Эконом' },
  ],
  'москва>владивосток': [
    { type: 'flight', carrier: 'Аэрофлот', departure: '09:00', arrival: '22:55', duration: '8 ч 55 мин', priceBase: 14000, class: 'Эконом' },
  ],
  'москва>иркутск': [
    { type: 'flight', carrier: 'S7 Airlines', departure: '07:00', arrival: '13:50', duration: '5 ч 50 мин', priceBase: 9500, class: 'Эконом' },
    { type: 'train', carrier: 'РЖД', departure: '21:30', arrival: '12:45+3', duration: '3 дня 15 ч', priceBase: 6000, class: 'Плацкарт' },
  ],
};

const MODE_COLOR: Record<MultiModalLeg['mode'], string> = {
  flight: '#2563EB',
  train: '#16A34A',
  bus: '#F59E0B',
  metro: '#7C3AED',
  taxi: '#EF4444',
  walk: '#0EA5E9',
  ferry: '#0F766E',
};

const MODE_CO2_KG_PER_KM: Record<MultiModalLeg['mode'], number> = {
  flight: 0.255,
  train: 0.041,
  bus: 0.105,
  metro: 0.035,
  taxi: 0.192,
  walk: 0,
  ferry: 0.115,
};

const MULTIMODAL_ROUTES: Partial<Record<string, MultiModalTemplateLeg[]>> = {
  'москва>санкт-петербург': [
    { mode: 'metro', from: 'Москва, центр', to: 'Ленинградский вокзал', departure: '06:20', arrival: '06:45', durationMinutes: 25, distanceKm: 9, priceBase: 80, line: 'МЦД/метро' },
    { mode: 'train', from: 'Москва', to: 'Санкт-Петербург', departure: '06:55', arrival: '10:45', durationMinutes: 230, distanceKm: 650, priceBase: 3200, carrier: 'Сапсан' },
    { mode: 'metro', from: 'Московский вокзал', to: 'Невский проспект', departure: '11:00', arrival: '11:20', durationMinutes: 20, distanceKm: 6, priceBase: 70, line: 'Метро' },
    { mode: 'walk', from: 'Невский проспект', to: 'Отель', departure: '11:20', arrival: '11:35', durationMinutes: 15, distanceKm: 1.2, priceBase: 0 },
  ],
  'москва>казань': [
    { mode: 'taxi', from: 'Москва, центр', to: 'Казанский вокзал', departure: '21:00', arrival: '21:35', durationMinutes: 35, distanceKm: 13, priceBase: 850, carrier: 'Яндекс Go' },
    { mode: 'train', from: 'Москва', to: 'Казань', departure: '22:00', arrival: '08:10', durationMinutes: 610, distanceKm: 820, priceBase: 2500, carrier: 'РЖД' },
    { mode: 'bus', from: 'ЖД вокзал Казань-1', to: 'Кремль', departure: '08:20', arrival: '08:45', durationMinutes: 25, distanceKm: 8, priceBase: 55, line: 'Автобус 10а' },
    { mode: 'walk', from: 'Кремль', to: 'Отель', departure: '08:45', arrival: '09:00', durationMinutes: 15, distanceKm: 1, priceBase: 0 },
  ],
  'москва>владивосток': [
    { mode: 'metro', from: 'Москва, центр', to: 'Шереметьево', departure: '06:20', arrival: '07:15', durationMinutes: 55, distanceKm: 28, priceBase: 120, line: 'Аэроэкспресс' },
    { mode: 'flight', from: 'Москва', to: 'Владивосток', departure: '08:10', arrival: '23:05', durationMinutes: 535, distanceKm: 6420, priceBase: 15500, carrier: 'Аэрофлот' },
    { mode: 'bus', from: 'Аэропорт Кневичи', to: 'Центр Владивостока', departure: '23:20', arrival: '00:20', durationMinutes: 60, distanceKm: 46, priceBase: 180, line: 'Автобус 107' },
    { mode: 'taxi', from: 'Центр Владивостока', to: 'Отель', departure: '00:20', arrival: '00:40', durationMinutes: 20, distanceKm: 7, priceBase: 520, carrier: 'Яндекс Go' },
  ],
  'москва>иркутск': [
    { mode: 'metro', from: 'Москва, центр', to: 'Домодедово', departure: '06:10', arrival: '07:00', durationMinutes: 50, distanceKm: 42, priceBase: 120, line: 'Аэроэкспресс' },
    { mode: 'flight', from: 'Москва', to: 'Иркутск', departure: '07:55', arrival: '18:00', durationMinutes: 365, distanceKm: 4200, priceBase: 9800, carrier: 'S7 Airlines' },
    { mode: 'bus', from: 'Аэропорт Иркутск', to: '130-й квартал', departure: '18:15', arrival: '18:45', durationMinutes: 30, distanceKm: 10, priceBase: 45, line: 'Автобус 20' },
    { mode: 'walk', from: '130-й квартал', to: 'Отель', departure: '18:45', arrival: '18:55', durationMinutes: 10, distanceKm: 0.8, priceBase: 0 },
  ],
  'москва>калининград': [
    { mode: 'metro', from: 'Москва, центр', to: 'Аэропорт Шереметьево', departure: '06:30', arrival: '07:20', durationMinutes: 50, distanceKm: 26, priceBase: 120, line: 'Аэроэкспресс' },
    { mode: 'flight', from: 'Москва', to: 'Калининград', departure: '08:20', arrival: '10:10', durationMinutes: 110, distanceKm: 1090, priceBase: 6200, carrier: 'Аэрофлот' },
    { mode: 'bus', from: 'Аэропорт Храброво', to: 'Остров Канта', departure: '10:25', arrival: '11:05', durationMinutes: 40, distanceKm: 23, priceBase: 95, line: 'Автобус 244э' },
    { mode: 'walk', from: 'Остров Канта', to: 'Отель', departure: '11:05', arrival: '11:20', durationMinutes: 15, distanceKm: 1.3, priceBase: 0 },
  ],
  'москва>сочи': [
    { mode: 'taxi', from: 'Москва, центр', to: 'Внуково', departure: '05:50', arrival: '06:35', durationMinutes: 45, distanceKm: 33, priceBase: 1100, carrier: 'Яндекс Go' },
    { mode: 'flight', from: 'Москва', to: 'Сочи', departure: '07:30', arrival: '10:00', durationMinutes: 150, distanceKm: 1360, priceBase: 6800, carrier: 'S7 Airlines' },
    { mode: 'bus', from: 'Аэропорт Сочи', to: 'Адлер', departure: '10:15', arrival: '10:45', durationMinutes: 30, distanceKm: 11, priceBase: 50, line: 'Автобус 105' },
    { mode: 'walk', from: 'Адлер', to: 'Отель', departure: '10:45', arrival: '11:00', durationMinutes: 15, distanceKm: 1.1, priceBase: 0 },
  ],
};

function normalizeCity(value: string): string {
  const city = value
    .trim()
    .toLowerCase()
    .replace(/[.,/#!$%^&*;:{}=\\_`~()]/g, ' ')
    .replace(/\s+/g, ' ');

  const aliases: Record<string, string> = {
    питер: 'санкт-петербург',
    'санкт петербург': 'санкт-петербург',
    спб: 'санкт-петербург',
    байкал: 'иркутск',
    vladivostok: 'владивосток',
    moscow: 'москва',
    kazan: 'казань',
    sochi: 'сочи',
    kaliningrad: 'калининград',
    irkutsk: 'иркутск',
  };

  if (aliases[city]) return aliases[city];
  if (city.includes('владивост')) return 'владивосток';
  if (city.includes('казан')) return 'казань';
  if (city.includes('калининград')) return 'калининград';
  if (city.includes('сочи')) return 'сочи';
  if (city.includes('москв')) return 'москва';
  if (city.includes('иркут')) return 'иркутск';
  if (city.includes('петербург')) return 'санкт-петербург';
  if (city.includes('байкал')) return 'иркутск';

  return city.replace(/\s+/g, '-');
}

function getDaysCount(startDate: string, endDate: string): number {
  if (!startDate || !endDate) return 3;
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diff = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  if (!Number.isFinite(diff)) return 3;
  return Math.max(1, Math.min(10, diff));
}

function formatDate(dateStr: string, offsetDays: number): string {
  const d = new Date(dateStr || new Date().toISOString().split('T')[0]);
  d.setDate(d.getDate() + offsetDays);
  const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
  return `${d.getDate()} ${months[d.getMonth()]}`;
}

function interestScore(place: PlaceTemplate, interests: string[]): number {
  if (!interests.length) return 0;
  return place.interests.filter((item) => interests.includes(item)).length;
}

function pickPlace(
  pool: PlaceTemplate[],
  used: Set<string>,
  interests: string[],
  slot: TimeSlot,
  rotateOffset = 0
): PlaceTemplate | null {
  const available = pool.filter((p) => !used.has(p.name));
  if (!available.length) return null;

  available.sort((a, b) => {
    const slotA = a.timeSlot === slot ? 1 : 0;
    const slotB = b.timeSlot === slot ? 1 : 0;
    if (slotB !== slotA) return slotB - slotA;
    const scoreA = interestScore(a, interests);
    const scoreB = interestScore(b, interests);
    if (scoreB !== scoreA) return scoreB - scoreA;
    return b.rating - a.rating;
  });

  return available[rotateOffset % available.length];
}

function buildDayPlans(city: string, startDate: string, daysCount: number, interests: string[]): DayPlan[] {
  const cityKey = normalizeCity(city);
  const cityPool = CITY_PLACES[cityKey] ?? [];
  const pool = cityPool.length > 0 ? cityPool : DEFAULT_PLACES.map((p) => ({ ...p, name: `${p.name} (${city})` }));
  const slots: TimeSlot[] = ['morning', 'afternoon', 'evening'];
  const times = ['10:00', '14:30', '19:00'];

  const days: DayPlan[] = [];

  for (let day = 0; day < daysCount; day += 1) {
    const usedInDay = new Set<string>();
    const places: Place[] = [];

    for (let slot = 0; slot < 3; slot += 1) {
      if (day === daysCount - 1 && slot === 2) break;

      const picked = pickPlace(pool, usedInDay, interests, slots[slot], day + slot);
      if (!picked) continue;

      usedInDay.add(picked.name);
      places.push({
        id: `gen-d${day + 1}-s${slot + 1}`,
        name: picked.name,
        category: picked.category,
        description: picked.description,
        duration: picked.duration,
        time: times[slot],
        rating: picked.rating,
        address: `${city}, центр`,
        emoji: picked.emoji,
        price: picked.price,
      });
    }

    days.push({
      day: day + 1,
      date: formatDate(startDate, day),
      places,
    });
  }

  return days;
}

function buildTransport(from: string, to: string, transportBudget: number, style: TravelStyle): Transport[] {
  const fromKey = normalizeCity(from);
  const toKey = normalizeCity(to);
  const directKey = `${fromKey}>${toKey}`;
  const reverseKey = `${toKey}>${fromKey}`;

  const templates = TRANSPORT_ROUTES[directKey] ?? TRANSPORT_ROUTES[reverseKey] ?? null;

  const multiplier = style === 'luxury' ? 1.4 : style === 'comfort' ? 1.15 : style === 'budget' ? 0.85 : 1;

  if (templates) {
    return templates.map((t, index) => ({
      id: `gen-t${index + 1}-${Date.now()}`,
      type: t.type,
      from,
      to,
      departure: t.departure,
      arrival: t.arrival,
      duration: t.duration,
      price: Math.round(t.priceBase * multiplier),
      carrier: t.carrier,
      class: style === 'luxury' ? 'Бизнес' : t.class,
    }));
  }

  return [
    {
      id: `gen-t1-${Date.now()}`,
      type: 'flight',
      from,
      to,
      departure: '09:20',
      arrival: '13:10',
      duration: '3 ч 50 мин',
      price: Math.max(4000, Math.round(transportBudget * 0.55)),
      carrier: 'Аэрофлот',
      class: 'Эконом',
    },
    {
      id: `gen-t2-${Date.now()}`,
      type: 'train',
      from,
      to,
      departure: '22:15',
      arrival: '08:40',
      duration: '10 ч 25 мин',
      price: Math.max(2500, Math.round(transportBudget * 0.38)),
      carrier: 'РЖД',
      class: 'Купе',
    },
  ];
}

function formatDurationMinutes(minutes: number): string {
  const safe = Math.max(0, Math.round(minutes));
  const h = Math.floor(safe / 60);
  const m = safe % 60;
  if (h === 0) return `${m} мин`;
  return m > 0 ? `${h} ч ${m} мин` : `${h} ч`;
}

function parseClockToMinutes(value: string): number {
  const match = value.match(/^(\d{1,2}):(\d{2})$/);
  if (!match) return 0;
  return Number(match[1]) * 60 + Number(match[2]);
}

function minutesToClock(total: number): string {
  const normalized = ((Math.round(total) % 1440) + 1440) % 1440;
  const h = Math.floor(normalized / 60);
  const m = normalized % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

function estimateDistanceBetweenCities(fromKey: string, toKey: string): number {
  const directKey = `${fromKey}>${toKey}`;
  const reverseKey = `${toKey}>${fromKey}`;
  const knownDistanceKm: Record<string, number> = {
    'москва>санкт-петербург': 650,
    'москва>казань': 820,
    'москва>сочи': 1360,
    'москва>калининград': 1090,
    'москва>владивосток': 6420,
    'москва>иркутск': 4200,
  };

  return knownDistanceKm[directKey] ?? knownDistanceKm[reverseKey] ?? 1200;
}

function buildFallbackMultimodalTemplate(from: string, to: string): MultiModalTemplateLeg[] {
  const distanceKm = estimateDistanceBetweenCities(normalizeCity(from), normalizeCity(to));
  const mainMode: MultiModalLeg['mode'] = distanceKm > 1400 ? 'flight' : distanceKm > 450 ? 'train' : 'bus';
  const mainSpeedKmh = mainMode === 'flight' ? 760 : mainMode === 'train' ? 95 : 68;
  const mainDurationMinutes = Math.round((distanceKm / mainSpeedKmh) * 60);
  const startMinutes = parseClockToMinutes('08:00');

  return [
    {
      mode: distanceKm > 1800 ? 'metro' : 'bus',
      from: `${from}, центр`,
      to: mainMode === 'flight' ? `Аэропорт ${from}` : `Вокзал ${from}`,
      departure: minutesToClock(startMinutes),
      arrival: minutesToClock(startMinutes + 35),
      durationMinutes: 35,
      distanceKm: 14,
      priceBase: distanceKm > 1800 ? 120 : 70,
      line: distanceKm > 1800 ? 'Аэроэкспресс' : 'Городской автобус',
    },
    {
      mode: mainMode,
      from,
      to,
      departure: minutesToClock(startMinutes + 55),
      arrival: minutesToClock(startMinutes + 55 + mainDurationMinutes),
      durationMinutes: mainDurationMinutes,
      distanceKm,
      priceBase: mainMode === 'flight'
        ? Math.max(5200, Math.round(distanceKm * 2.6))
        : mainMode === 'train'
          ? Math.max(2800, Math.round(distanceKm * 1.6))
          : Math.max(1400, Math.round(distanceKm * 1.2)),
      carrier: mainMode === 'flight' ? 'S7 Airlines' : mainMode === 'train' ? 'РЖД' : 'Межгород',
    },
    {
      mode: 'bus',
      from: mainMode === 'flight' ? `Аэропорт ${to}` : `Вокзал ${to}`,
      to: `${to}, центр`,
      departure: minutesToClock(startMinutes + 55 + mainDurationMinutes + 20),
      arrival: minutesToClock(startMinutes + 55 + mainDurationMinutes + 55),
      durationMinutes: 35,
      distanceKm: 12,
      priceBase: 80,
      line: 'Городской автобус',
    },
    {
      mode: 'walk',
      from: `${to}, центр`,
      to: 'Отель',
      departure: minutesToClock(startMinutes + 55 + mainDurationMinutes + 55),
      arrival: minutesToClock(startMinutes + 55 + mainDurationMinutes + 68),
      durationMinutes: 13,
      distanceKm: 0.9,
      priceBase: 0,
    },
  ];
}

function buildMultimodalRoute(from: string, to: string, style: TravelStyle): MultiModalRoute {
  const fromKey = normalizeCity(from);
  const toKey = normalizeCity(to);
  const directKey = `${fromKey}>${toKey}`;
  const reverseKey = `${toKey}>${fromKey}`;

  const template = MULTIMODAL_ROUTES[directKey]
    ?? MULTIMODAL_ROUTES[reverseKey]
    ?? buildFallbackMultimodalTemplate(from, to);
  const styleMultiplier = style === 'luxury' ? 1.35 : style === 'comfort' ? 1.12 : style === 'budget' ? 0.85 : 1;

  const seed = Date.now();
  const segments: MultiModalLeg[] = template.map((leg, index) => {
    const price = Math.max(0, Math.round(leg.priceBase * styleMultiplier));
    const co2Kg = Number((leg.distanceKm * MODE_CO2_KG_PER_KM[leg.mode]).toFixed(1));
    return {
      id: `gen-mm-${index + 1}-${seed}`,
      mode: leg.mode,
      from: leg.from,
      to: leg.to,
      departure: leg.departure,
      arrival: leg.arrival,
      durationMinutes: leg.durationMinutes,
      distanceKm: leg.distanceKm,
      price,
      carrier: leg.carrier,
      line: leg.line,
      color: MODE_COLOR[leg.mode],
      co2Kg,
    };
  });

  const totalDistanceKm = Number(segments.reduce((sum, s) => sum + s.distanceKm, 0).toFixed(1));
  const totalDurationMinutes = segments.reduce((sum, s) => sum + s.durationMinutes, 0);
  const totalPrice = segments.reduce((sum, s) => sum + s.price, 0);
  const totalCo2Kg = Number(segments.reduce((sum, s) => sum + s.co2Kg, 0).toFixed(1));
  const directFlightCo2Kg = Number((estimateDistanceBetweenCities(fromKey, toKey) * MODE_CO2_KG_PER_KM.flight).toFixed(1));
  const transfers = Math.max(0, segments.length - 1);
  const summary = `${segments[0]?.from ?? from} → ${segments[segments.length - 1]?.to ?? to} · ${formatDurationMinutes(totalDurationMinutes)}`;

  return {
    id: `mm-${fromKey}-${toKey}-${seed}`,
    summary,
    totalDurationMinutes,
    totalDistanceKm,
    totalPrice,
    totalCo2Kg,
    directFlightCo2Kg,
    transfers,
    segments,
  };
}

function buildHotels(city: string, hotelBudget: number, nights: number, style: TravelStyle): Hotel[] {
  const cityKey = normalizeCity(city);
  const cityHotels = CITY_HOTELS[cityKey] ?? [];
  const minStars = MIN_HOTEL_STARS[style];
  const maxNightly = Math.max(2000, nights > 0 ? Math.floor(hotelBudget / nights) : hotelBudget);

  let candidates = cityHotels.filter((h) => h.styles.includes(style) && h.stars >= minStars);
  if (!candidates.length) candidates = cityHotels.length ? cityHotels : DEFAULT_HOTELS;

  candidates.sort((a, b) => Math.abs(a.pricePerNight - maxNightly) - Math.abs(b.pricePerNight - maxNightly));

  const primary = candidates[0];
  const secondary = candidates[1] ?? candidates[0];

  return [
    {
      id: `gen-h1-${Date.now()}`,
      name: primary.name,
      stars: primary.stars,
      rating: primary.rating,
      reviews: primary.reviews,
      pricePerNight: primary.pricePerNight,
      distanceFromCenter: primary.distanceFromCenter,
      address: primary.address,
      amenities: primary.amenities,
      image: primary.image,
    },
    {
      id: `gen-h2-${Date.now()}`,
      name: secondary.name,
      stars: secondary.stars,
      rating: secondary.rating,
      reviews: secondary.reviews,
      pricePerNight: secondary.pricePerNight,
      distanceFromCenter: secondary.distanceFromCenter,
      address: secondary.address,
      amenities: secondary.amenities,
      image: secondary.image,
    },
  ];
}

export function generateTripFromForm(form: TripFormInput): Trip {
  const from = (form.from || 'Москва').trim();
  const to = (form.to || 'Санкт-Петербург').trim();
  const startDate = form.startDate || new Date().toISOString().split('T')[0];
  const endDate = form.endDate || (() => {
    const d = new Date(startDate);
    d.setDate(d.getDate() + 3);
    return d.toISOString().split('T')[0];
  })();

  const budget = Math.max(8000, form.budget || 30000);
  const travelers = Math.max(1, form.travelers || 1);
  const travelStyle = form.travelStyle || 'standard';
  const interests = form.interests || [];

  const ratios = BUDGET_RATIOS[travelStyle];
  const transportBudget = Math.round(budget * ratios.transport);
  const hotelBudget = Math.round(budget * ratios.hotel);
  const activitiesBudget = Math.round(budget * ratios.activities);
  const foodBudget = Math.round(budget * ratios.food);

  const daysCount = getDaysCount(startDate, endDate);
  const nights = Math.max(1, daysCount - 1);

  const matchedCity = POPULAR_CITIES.find((city) => normalizeCity(city.name) === normalizeCity(to));

  const coverImage = matchedCity?.image ?? 'https://images.unsplash.com/photo-1548834925-e48f8a27d7b2?w=800';

  const days = buildDayPlans(to, startDate, daysCount, interests);
  const multimodalRoute = buildMultimodalRoute(from, to, travelStyle);
  const transport = buildTransport(from, to, transportBudget, travelStyle);
  const hotels = buildHotels(to, hotelBudget, nights, travelStyle);

  return {
    id: `trip-gen-${Date.now()}`,
    from,
    to,
    toCountry: matchedCity?.country ?? 'Россия',
    startDate,
    endDate,
    budget,
    currency: '₽',
    travelers,
    interests,
    travelStyle,
    status: 'draft',
    coverImage,
    days,
    transport,
    multimodalRoute,
    hotels,
    totalTransport: multimodalRoute.totalPrice > 0 ? multimodalRoute.totalPrice : (transport.length > 0 ? Math.min(...transport.map((item) => item.price)) : transportBudget),
    totalHotel: hotels[0].pricePerNight * nights,
    totalActivities: activitiesBudget,
    totalFood: foodBudget,
  };
}





