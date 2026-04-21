export type TravelStyle = 'budget' | 'standard' | 'comfort' | 'luxury';
export type TravelerType = 'solo' | 'couple' | 'family' | 'group';

export interface Interest {
  id: string;
  label: string;
  icon: string;
}

export const INTERESTS: Interest[] = [
  { id: 'museums', label: 'Музеи', icon: '🏛️' },
  { id: 'nature', label: 'Природа', icon: '🌿' },
  { id: 'food', label: 'Еда', icon: '🍜' },
  { id: 'nightlife', label: 'Ночная жизнь', icon: '🌃' },
  { id: 'shopping', label: 'Шопинг', icon: '🛍️' },
  { id: 'architecture', label: 'Архитектура', icon: '🏙️' },
  { id: 'sport', label: 'Спорт', icon: '⚽' },
  { id: 'beach', label: 'Пляж', icon: '🏖️' },
  { id: 'art', label: 'Искусство', icon: '🎨' },
  { id: 'history', label: 'История', icon: '📚' },
  { id: 'hiking', label: 'Треккинг', icon: '🥾' },
  { id: 'wellness', label: 'Велнес', icon: '🧘' },
];

export const TRAVEL_STYLES = [
  { id: 'budget', label: 'Эконом', desc: 'до 3 000 ₽/день', icon: '💸', color: '#1B7A4A' },
  { id: 'standard', label: 'Стандарт', desc: '3 000–8 000 ₽/день', icon: '🎒', color: '#1B3A6B' },
  { id: 'comfort', label: 'Комфорт', desc: '8 000–15 000 ₽/день', icon: '🛋️', color: '#B45309' },
  { id: 'luxury', label: 'Премиум', desc: 'от 15 000 ₽/день', icon: '✨', color: '#7B1FA2' },
] as const;

export const TRAVELER_TYPES = [
  { id: 'solo', label: 'Соло', icon: '🧍', desc: 'Путешествие в одиночку' },
  { id: 'couple', label: 'Пара', icon: '💑', desc: 'Романтическая поездка' },
  { id: 'family', label: 'Семья', icon: '👨‍👩‍👧‍👦', desc: 'Поездка с детьми' },
  { id: 'group', label: 'Компания', icon: '👥', desc: 'Поездка с друзьями' },
] as const;

export const POPULAR_CITIES = [
  {
    id: 'spb',
    name: 'Санкт-Петербург',
    country: 'Россия',
    emoji: '🏰',
    image: 'https://images.unsplash.com/photo-1548834925-e48f8a27d7b2?w=800',
  },
  {
    id: 'moscow',
    name: 'Москва',
    country: 'Россия',
    emoji: '🧱',
    image: 'https://images.unsplash.com/photo-1513326738677-b964603b136d?w=800',
  },
  {
    id: 'kazan',
    name: 'Казань',
    country: 'Россия',
    emoji: '🕌',
    image: 'https://images.unsplash.com/photo-1595218699680-e9c3acba6e91?w=800',
  },
  {
    id: 'sochi',
    name: 'Сочи',
    country: 'Россия',
    emoji: '🌊',
    image: 'https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=800',
  },
  {
    id: 'kaliningrad',
    name: 'Калининград',
    country: 'Россия',
    emoji: '⚓',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
  },
  {
    id: 'vladivostok',
    name: 'Владивосток',
    country: 'Россия',
    emoji: '🌉',
    image: 'https://images.unsplash.com/photo-1601462904263-f2fa0c851cb9?w=800',
  },
  {
    id: 'baikal',
    name: 'Байкал',
    country: 'Россия',
    emoji: '🏞️',
    image: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=800',
  },
];

export interface CityOption {
  id: string;
  name: string;
  region: string;
}

export const RUSSIAN_CITIES: CityOption[] = [
  { id: 'moscow', name: 'Москва', region: 'Москва' },
  { id: 'spb', name: 'Санкт-Петербург', region: 'Северо-Запад' },
  { id: 'kazan', name: 'Казань', region: 'Татарстан' },
  { id: 'sochi', name: 'Сочи', region: 'Краснодарский край' },
  { id: 'kaliningrad', name: 'Калининград', region: 'Калининградская область' },
  { id: 'vladivostok', name: 'Владивосток', region: 'Приморский край' },
  { id: 'irkutsk', name: 'Иркутск', region: 'Иркутская область' },
  { id: 'novosibirsk', name: 'Новосибирск', region: 'Новосибирская область' },
  { id: 'yekaterinburg', name: 'Екатеринбург', region: 'Свердловская область' },
  { id: 'nizhny_novgorod', name: 'Нижний Новгород', region: 'Нижегородская область' },
  { id: 'samara', name: 'Самара', region: 'Самарская область' },
  { id: 'rostov', name: 'Ростов-на-Дону', region: 'Ростовская область' },
  { id: 'ufa', name: 'Уфа', region: 'Башкортостан' },
  { id: 'omsk', name: 'Омск', region: 'Омская область' },
  { id: 'perm', name: 'Пермь', region: 'Пермский край' },
  { id: 'krasnoyarsk', name: 'Красноярск', region: 'Красноярский край' },
  { id: 'tyumen', name: 'Тюмень', region: 'Тюменская область' },
  { id: 'volgograd', name: 'Волгоград', region: 'Волгоградская область' },
  { id: 'yaroslavl', name: 'Ярославль', region: 'Ярославская область' },
  { id: 'murmansk', name: 'Мурманск', region: 'Мурманская область' },
  { id: 'ulan_ude', name: 'Улан-Удэ', region: 'Бурятия' },
  { id: 'gelendzhik', name: 'Геленджик', region: 'Краснодарский край' },
  { id: 'anapa', name: 'Анапа', region: 'Краснодарский край' },
  { id: 'tomsk', name: 'Томск', region: 'Томская область' },
  { id: 'khabarovsk', name: 'Хабаровск', region: 'Хабаровский край' },
  { id: 'yakutsk', name: 'Якутск', region: 'Саха (Якутия)' },
];

export interface Place {
  id: string;
  name: string;
  category: string;
  description: string;
  duration: string;
  time: string;
  rating: number;
  address: string;
  emoji: string;
  price?: string;
}

export interface DayPlan {
  day: number;
  date: string;
  places: Place[];
}

export interface Transport {
  id: string;
  type: 'flight' | 'train' | 'bus';
  from: string;
  to: string;
  departure: string;
  arrival: string;
  duration: string;
  price: number;
  carrier: string;
  class?: string;
}

export type MultiModalTransportMode = 'flight' | 'train' | 'bus' | 'metro' | 'taxi' | 'walk' | 'ferry';

export interface MultiModalLeg {
  id: string;
  mode: MultiModalTransportMode;
  from: string;
  to: string;
  departure: string;
  arrival: string;
  durationMinutes: number;
  distanceKm: number;
  price: number;
  carrier?: string;
  line?: string;
  color: string;
  co2Kg: number;
}

export interface MultiModalRoute {
  id: string;
  summary: string;
  totalDurationMinutes: number;
  totalDistanceKm: number;
  totalPrice: number;
  totalCo2Kg: number;
  directFlightCo2Kg: number;
  transfers: number;
  segments: MultiModalLeg[];
}

export interface Hotel {
  id: string;
  name: string;
  stars: number;
  rating: number;
  reviews: number;
  pricePerNight: number;
  distanceFromCenter: string;
  address: string;
  amenities: string[];
  image: string;
}

export interface Trip {
  id: string;
  from: string;
  to: string;
  toCountry: string;
  startDate: string;
  endDate: string;
  budget: number;
  currency: string;
  travelers: number;
  interests: string[];
  travelStyle: TravelStyle;
  status: 'upcoming' | 'past' | 'draft';
  coverImage: string;
  days: DayPlan[];
  transport: Transport[];
  multimodalRoute?: MultiModalRoute;
  hotels: Hotel[];
  totalTransport: number;
  totalHotel: number;
  totalActivities: number;
  totalFood: number;
}

export const MOCK_TRIPS: Trip[] = [
  {
    id: 'trip-spb-sample',
    from: 'Москва',
    to: 'Санкт-Петербург',
    toCountry: 'Россия',
    startDate: '2026-05-20',
    endDate: '2026-05-23',
    budget: 48000,
    currency: '₽',
    travelers: 2,
    interests: ['museums', 'architecture', 'food'],
    travelStyle: 'standard',
    status: 'upcoming',
    coverImage: 'https://images.unsplash.com/photo-1548834925-e48f8a27d7b2?w=1200',
    totalTransport: 9000,
    totalHotel: 22000,
    totalActivities: 8000,
    totalFood: 9000,
    days: [
      {
        day: 1,
        date: '20 мая',
        places: [
          {
            id: 'spb-1',
            name: 'Эрмитаж',
            category: 'Музей',
            description: 'Один из крупнейших художественных музеев мира.',
            duration: '3-4 часа',
            time: '10:00',
            rating: 4.9,
            address: 'Дворцовая площадь, 2',
            emoji: '🏛️',
            price: '500 ₽',
          },
          {
            id: 'spb-2',
            name: 'Дворцовая площадь',
            category: 'Достопримечательность',
            description: 'Исторический центр Петербурга и главное место прогулок.',
            duration: '1 час',
            time: '15:00',
            rating: 4.8,
            address: 'Дворцовая площадь',
            emoji: '🏰',
            price: 'Бесплатно',
          },
        ],
      },
      {
        day: 2,
        date: '21 мая',
        places: [
          {
            id: 'spb-3',
            name: 'Петропавловская крепость',
            category: 'История',
            description: 'Старинная крепость на Заячьем острове с панорамами Невы.',
            duration: '2 часа',
            time: '11:00',
            rating: 4.7,
            address: 'Петропавловская крепость',
            emoji: '🧱',
            price: '700 ₽',
          },
        ],
      },
    ],
    transport: [
      {
        id: 'spb-t1',
        type: 'train',
        from: 'Москва',
        to: 'Санкт-Петербург',
        departure: '07:40',
        arrival: '11:30',
        duration: '3 ч 50 мин',
        price: 4500,
        carrier: 'Сапсан',
        class: 'Эконом+',
      },
      {
        id: 'spb-t2',
        type: 'train',
        from: 'Санкт-Петербург',
        to: 'Москва',
        departure: '18:10',
        arrival: '22:00',
        duration: '3 ч 50 мин',
        price: 4500,
        carrier: 'Сапсан',
        class: 'Эконом+',
      },
    ],
    hotels: [
      {
        id: 'spb-h1',
        name: 'Nevsky Grand Hotel',
        stars: 4,
        rating: 4.6,
        reviews: 2180,
        pricePerNight: 6200,
        distanceFromCenter: '0.6 км',
        address: 'Невский пр., 22',
        amenities: ['Wi-Fi', 'Завтрак', 'Трансфер'],
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900',
      },
      {
        id: 'spb-h2',
        name: 'M-Hotel',
        stars: 3,
        rating: 4.4,
        reviews: 1420,
        pricePerNight: 4800,
        distanceFromCenter: '1.1 км',
        address: 'ул. Садовая, 22',
        amenities: ['Wi-Fi', 'Завтрак'],
        image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=900',
      },
    ],
  },
  {
    id: 'trip-sochi-sample',
    from: 'Казань',
    to: 'Сочи',
    toCountry: 'Россия',
    startDate: '2026-06-12',
    endDate: '2026-06-16',
    budget: 64000,
    currency: '₽',
    travelers: 2,
    interests: ['beach', 'food', 'nature'],
    travelStyle: 'comfort',
    status: 'past',
    coverImage: 'https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=1200',
    totalTransport: 18000,
    totalHotel: 26000,
    totalActivities: 9000,
    totalFood: 11000,
    days: [
      {
        day: 1,
        date: '12 июня',
        places: [
          {
            id: 'sochi-1',
            name: 'Имеретинская набережная',
            category: 'Прогулка',
            description: 'Длинная набережная с видом на море и горы.',
            duration: '2 часа',
            time: '17:00',
            rating: 4.8,
            address: 'Имеретинская набережная',
            emoji: '🌊',
            price: 'Бесплатно',
          },
        ],
      },
    ],
    transport: [
      {
        id: 'sochi-t1',
        type: 'flight',
        from: 'Казань',
        to: 'Сочи',
        departure: '08:50',
        arrival: '11:10',
        duration: '2 ч 20 мин',
        price: 9000,
        carrier: 'Аэрофлот',
        class: 'Эконом',
      },
      {
        id: 'sochi-t2',
        type: 'flight',
        from: 'Сочи',
        to: 'Казань',
        departure: '19:45',
        arrival: '22:05',
        duration: '2 ч 20 мин',
        price: 9000,
        carrier: 'Аэрофлот',
        class: 'Эконом',
      },
    ],
    hotels: [
      {
        id: 'sochi-h1',
        name: 'Sea Galaxy Hotel Congress & Spa',
        stars: 4,
        rating: 4.5,
        reviews: 3100,
        pricePerNight: 6500,
        distanceFromCenter: '1.2 км',
        address: 'Черноморская ул., 4',
        amenities: ['Wi-Fi', 'SPA', 'Бассейн', 'Завтрак'],
        image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=900',
      },
    ],
  },
];

export interface Route {
  id: string;
  title: string;
  city: string;
  country: string;
  duration: string;
  budget: string;
  rating: number;
  reviews: number;
  tags: string[];
  image: string;
  description: string;
  season: string;
}

export const MOCK_ROUTES: Route[] = [
  {
    id: 'r1',
    title: 'Уикенд в Санкт-Петербурге',
    city: 'Санкт-Петербург',
    country: 'Россия',
    duration: '3 дня',
    budget: '25 000–40 000 ₽',
    rating: 4.9,
    reviews: 5241,
    tags: ['архитектура', 'музеи', 'гастрономия'],
    image: 'https://images.unsplash.com/photo-1548834925-e48f8a27d7b2?w=1200',
    description: 'Эрмитаж, дворцы, прогулки по Невскому и вечер на набережной.',
    season: 'круглый год',
  },
  {
    id: 'r2',
    title: 'Историческая Москва за 4 дня',
    city: 'Москва',
    country: 'Россия',
    duration: '4 дня',
    budget: '28 000–45 000 ₽',
    rating: 4.8,
    reviews: 4110,
    tags: ['история', 'архитектура', 'еда'],
    image: 'https://images.unsplash.com/photo-1513326738677-b964603b136d?w=1200',
    description: 'Красная площадь, Зарядье, музеи и гастрономические кварталы.',
    season: 'круглый год',
  },
  {
    id: 'r3',
    title: 'Казань: традиции и современность',
    city: 'Казань',
    country: 'Россия',
    duration: '3 дня',
    budget: '22 000–35 000 ₽',
    rating: 4.8,
    reviews: 2890,
    tags: ['история', 'еда', 'культура'],
    image: 'https://images.unsplash.com/photo-1595218699680-e9c3acba6e91?w=1200',
    description: 'Кремль, улица Баумана и национальная кухня Татарстана.',
    season: 'апрель-октябрь',
  },
  {
    id: 'r4',
    title: 'Сочи: море и горы',
    city: 'Сочи',
    country: 'Россия',
    duration: '5 дней',
    budget: '35 000–60 000 ₽',
    rating: 4.7,
    reviews: 6120,
    tags: ['пляж', 'природа', 'активности'],
    image: 'https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=1200',
    description: 'Море, Олимпийский парк, Роза Хутор и вечерние прогулки.',
    season: 'май-октябрь',
  },
  {
    id: 'r5',
    title: 'Балтика: Калининград и побережье',
    city: 'Калининград',
    country: 'Россия',
    duration: '4 дня',
    budget: '26 000–42 000 ₽',
    rating: 4.7,
    reviews: 2140,
    tags: ['архитектура', 'история', 'природа'],
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200',
    description: 'Остров Канта, районы старого города и выезд в Зеленоградск.',
    season: 'май-сентябрь',
  },
  {
    id: 'r6',
    title: 'Владивосток: море, мосты, морепродукты',
    city: 'Владивосток',
    country: 'Россия',
    duration: '4 дня',
    budget: '32 000–55 000 ₽',
    rating: 4.8,
    reviews: 1830,
    tags: ['природа', 'архитектура', 'еда'],
    image: 'https://images.unsplash.com/photo-1601462904263-f2fa0c851cb9?w=1200',
    description: 'Русский мост, Токаревский маяк и гастротур по морским ресторанам.',
    season: 'июнь-сентябрь',
  },
];
