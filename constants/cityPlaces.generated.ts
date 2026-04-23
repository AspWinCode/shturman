import { TimeSlot } from './cityPlacesOsm';

export interface GeneratedPlaceTemplate {
  name: string;
  category: string;
  description: string;
  emoji: string;
  duration: string;
  price: string;
  rating: number;
  interests: string[];
  timeSlot: TimeSlot;
  address?: string;
  lat?: number;
  lng?: number;
  source?: 'osm';
  sourceId?: string;
  placeType?: string;
  internalTags?: string[];
}

export const GENERATED_CITY_PLACES: Record<string, GeneratedPlaceTemplate[]> = {
  "москва": [
    {
      name: "Креветка",
      category: "Еда",
      placeType: "food",
      description: "Креветка — объект категории «еда» в городе Москва.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 55.651703,
      lng: 37.527154,
      source: "osm",
      sourceId: "node/112549000"
    },
    {
      name: "Боровицкие ворота",
      category: "История",
      placeType: "history",
      description: "Боровицкие ворота — объект категории «история» в городе Москва.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 55.748944,
      lng: 37.61241,
      source: "osm",
      sourceId: "node/241895605"
    },
    {
      name: "Южный речной вокзал",
      category: "Достопримечательность",
      placeType: "architecture",
      description: "Южный речной вокзал — объект категории «достопримечательность» в городе Москва.",
      emoji: "📍",
      duration: "1-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "architecture",
        "history"
      ],
      internalTags: [
        "type:architecture",
        "interest:architecture",
        "interest:history",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 55.689419,
      lng: 37.676835,
      source: "osm",
      sourceId: "node/249719606"
    },
    {
      name: "Покорителям космоса",
      category: "История",
      placeType: "history",
      description: "Покорителям космоса — объект категории «история» в городе Москва.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 55.822676,
      lng: 37.639719,
      source: "osm",
      sourceId: "node/250525422"
    },
    {
      name: "Кириллу и Мефодию",
      category: "История",
      placeType: "history",
      description: "Кириллу и Мефодию — объект категории «история» в городе Москва.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 55.754611,
      lng: 37.633933,
      source: "osm",
      sourceId: "node/252934686"
    },
    {
      name: "Музей Рерихов",
      category: "Музей",
      placeType: "museum",
      description: "Музей Рерихов — объект категории «музей» в городе Москва.",
      emoji: "🏛️",
      duration: "2-3 часа",
      price: "500 ₽",
      rating: 4.5,
      interests: [
        "museums",
        "art",
        "history"
      ],
      internalTags: [
        "type:museum",
        "interest:museums",
        "interest:art",
        "interest:history",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 55.830728,
      lng: 37.627528,
      source: "osm",
      sourceId: "node/253038783"
    },
    {
      name: "Н. В. Гоголю",
      category: "История",
      placeType: "history",
      description: "Н. В. Гоголю — объект категории «история» в городе Москва.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 55.750688,
      lng: 37.600445,
      source: "osm",
      sourceId: "node/253043145"
    },
    {
      name: "Ополченцам Пролетарского района, погибшим в Великой Отечественной войне",
      category: "История",
      placeType: "history",
      description: "Ополченцам Пролетарского района, погибшим в Великой Отечественной войне — объект категории «история» в городе Москва.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 55.707523,
      lng: 37.658654,
      source: "osm",
      sourceId: "node/253068132"
    },
    {
      name: "Юрию Долгорукому",
      category: "История",
      placeType: "history",
      description: "Юрию Долгорукому — объект категории «история» в городе Москва.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 55.76181,
      lng: 37.610161,
      source: "osm",
      sourceId: "node/253124200"
    },
    {
      name: "П. И. Багратиону",
      category: "История",
      placeType: "history",
      description: "П. И. Багратиону — объект категории «история» в городе Москва.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 55.745254,
      lng: 37.547634,
      source: "osm",
      sourceId: "node/253221694"
    },
    {
      name: "Vasilchuki Chaihona №1",
      category: "Еда",
      placeType: "food",
      description: "Vasilchuki Chaihona №1 — объект категории «еда» в городе Москва.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 55.724178,
      lng: 37.66297,
      source: "osm",
      sourceId: "node/253509255"
    },
    {
      name: "Спорт-бар Торнадо",
      category: "Ночная жизнь",
      placeType: "nightlife",
      description: "Спорт-бар Торнадо — объект категории «ночная жизнь» в городе Москва.",
      emoji: "🍸",
      duration: "2-3 часа",
      price: "1 500–3 000 ₽",
      rating: 4.5,
      interests: [
        "nightlife",
        "food"
      ],
      internalTags: [
        "type:nightlife",
        "interest:nightlife",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "evening",
      address: "",
      lat: 55.723392,
      lng: 37.664474,
      source: "osm",
      sourceId: "node/253509287"
    },
    {
      name: "Тануки",
      category: "Еда",
      placeType: "food",
      description: "Тануки — объект категории «еда» в городе Москва.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 55.721646,
      lng: 37.664423,
      source: "osm",
      sourceId: "node/253509334"
    },
    {
      name: "Кружка",
      category: "Ночная жизнь",
      placeType: "nightlife",
      description: "Кружка — объект категории «ночная жизнь» в городе Москва.",
      emoji: "🍸",
      duration: "2-3 часа",
      price: "1 500–3 000 ₽",
      rating: 4.5,
      interests: [
        "nightlife",
        "food"
      ],
      internalTags: [
        "type:nightlife",
        "interest:nightlife",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "evening",
      address: "",
      lat: 55.659523,
      lng: 37.752383,
      source: "osm",
      sourceId: "node/255742565"
    },
    {
      name: "Чайхана Ош",
      category: "Еда",
      placeType: "food",
      description: "Чайхана Ош — объект категории «еда» в городе Москва.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 55.705221,
      lng: 37.688884,
      source: "osm",
      sourceId: "node/255742571"
    },
    {
      name: "Кружка",
      category: "Ночная жизнь",
      placeType: "nightlife",
      description: "Кружка — объект категории «ночная жизнь» в городе Москва.",
      emoji: "🍸",
      duration: "2-3 часа",
      price: "1 500–3 000 ₽",
      rating: 4.5,
      interests: [
        "nightlife",
        "food"
      ],
      internalTags: [
        "type:nightlife",
        "interest:nightlife",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "evening",
      address: "",
      lat: 55.6302,
      lng: 37.51505,
      source: "osm",
      sourceId: "node/255742577"
    },
    {
      name: "Полная кружка",
      category: "Ночная жизнь",
      placeType: "nightlife",
      description: "Полная кружка — объект категории «ночная жизнь» в городе Москва.",
      emoji: "🍸",
      duration: "2-3 часа",
      price: "1 500–3 000 ₽",
      rating: 4.5,
      interests: [
        "nightlife",
        "food"
      ],
      internalTags: [
        "type:nightlife",
        "interest:nightlife",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "evening",
      address: "",
      lat: 55.651214,
      lng: 37.744426,
      source: "osm",
      sourceId: "node/255742601"
    },
    {
      name: "Salden's Taphouse",
      category: "Ночная жизнь",
      placeType: "nightlife",
      description: "Salden's Taphouse — объект категории «ночная жизнь» в городе Москва.",
      emoji: "🍸",
      duration: "2-3 часа",
      price: "1 500–3 000 ₽",
      rating: 4.5,
      interests: [
        "nightlife",
        "food"
      ],
      internalTags: [
        "type:nightlife",
        "interest:nightlife",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "evening",
      address: "Мясницкая улица, 32/1 с1",
      lat: 55.765614,
      lng: 37.638895,
      source: "osm",
      sourceId: "node/255742645"
    },
    {
      name: "В. И. Ленину",
      category: "История",
      placeType: "history",
      description: "В. И. Ленину — объект категории «история» в городе Москва.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 55.729432,
      lng: 37.613225,
      source: "osm",
      sourceId: "node/257089557"
    },
    {
      name: "Холодный родник",
      category: "Природа",
      placeType: "nature",
      description: "Холодный родник — объект категории «природа» в городе Москва.",
      emoji: "🌄",
      duration: "2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "nature"
      ],
      internalTags: [
        "type:nature",
        "interest:nature",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 55.63254,
      lng: 37.504998,
      source: "osm",
      sourceId: "node/259781280"
    },
    {
      name: "ПивКо",
      category: "Еда",
      placeType: "food",
      description: "ПивКо — объект категории «еда» в городе Москва.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 55.780489,
      lng: 37.480676,
      source: "osm",
      sourceId: "node/264895419"
    },
    {
      name: "Жилой дом на Котельнической набережной",
      category: "Достопримечательность",
      placeType: "architecture",
      description: "Жилой дом на Котельнической набережной — объект категории «достопримечательность» в городе Москва.",
      emoji: "📍",
      duration: "1-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "architecture",
        "history"
      ],
      internalTags: [
        "type:architecture",
        "interest:architecture",
        "interest:history",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 55.747084,
      lng: 37.642654,
      source: "osm",
      sourceId: "node/266720662"
    },
    {
      name: "Хоумбар",
      category: "Еда",
      placeType: "food",
      description: "Хоумбар — объект категории «еда» в городе Москва.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 55.724694,
      lng: 37.664542,
      source: "osm",
      sourceId: "node/271383987"
    },
    {
      name: "Галерея искусства стран Европы и Америки XIX—XX веков",
      category: "Музей",
      placeType: "museum",
      description: "Галерея искусства стран Европы и Америки XIX—XX веков — объект категории «музей» в городе Москва.",
      emoji: "🏛️",
      duration: "2-3 часа",
      price: "500 ₽",
      rating: 4.5,
      interests: [
        "museums",
        "art",
        "history"
      ],
      internalTags: [
        "type:museum",
        "interest:museums",
        "interest:art",
        "interest:history",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 55.746488,
      lng: 37.605305,
      source: "osm",
      sourceId: "node/273354762"
    },
    {
      name: "Государственный музей А.С.Пушкина",
      category: "Музей",
      placeType: "museum",
      description: "Государственный музей А.С.Пушкина — объект категории «музей» в городе Москва.",
      emoji: "🏛️",
      duration: "2-3 часа",
      price: "500 ₽",
      rating: 4.5,
      interests: [
        "museums",
        "art",
        "history"
      ],
      internalTags: [
        "type:museum",
        "interest:museums",
        "interest:art",
        "interest:history",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "Москва, улица Пречистенка, 12/2",
      lat: 55.744069,
      lng: 37.596899,
      source: "osm",
      sourceId: "node/273355916"
    },
    {
      name: "Государственный центральный театральный музей им. А. А. Бахрушина",
      category: "Музей",
      placeType: "museum",
      description: "Государственный центральный театральный музей им. А. А. Бахрушина — объект категории «музей» в городе Москва.",
      emoji: "🏛️",
      duration: "2-3 часа",
      price: "500 ₽",
      rating: 4.5,
      interests: [
        "museums",
        "art",
        "history"
      ],
      internalTags: [
        "type:museum",
        "interest:museums",
        "interest:art",
        "interest:history",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 55.731789,
      lng: 37.638094,
      source: "osm",
      sourceId: "node/273356351"
    },
    {
      name: "Шоколадница",
      category: "Еда",
      placeType: "food",
      description: "Шоколадница — объект категории «еда» в городе Москва.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 55.789623,
      lng: 37.67866,
      source: "osm",
      sourceId: "node/277085827"
    },
    {
      name: "Государственный Дарвиновский музей",
      category: "Музей",
      placeType: "museum",
      description: "Государственный Дарвиновский музей — объект категории «музей» в городе Москва.",
      emoji: "🏛️",
      duration: "2-3 часа",
      price: "500 ₽",
      rating: 4.5,
      interests: [
        "museums",
        "art",
        "history"
      ],
      internalTags: [
        "type:museum",
        "interest:museums",
        "interest:art",
        "interest:history",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 55.690714,
      lng: 37.561495,
      source: "osm",
      sourceId: "node/288506766"
    },
    {
      name: "Рыбацкое подворье",
      category: "Еда",
      placeType: "food",
      description: "Рыбацкое подворье — объект категории «еда» в городе Москва.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 55.838324,
      lng: 37.626261,
      source: "osm",
      sourceId: "node/297976962"
    },
    {
      name: "Эрнсту Тельману",
      category: "История",
      placeType: "history",
      description: "Эрнсту Тельману — объект категории «история» в городе Москва.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 55.801502,
      lng: 37.531514,
      source: "osm",
      sourceId: "node/302500295"
    },
    {
      name: "Com",
      category: "Еда",
      placeType: "food",
      description: "Com — объект категории «еда» в городе Москва.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 55.76828,
      lng: 37.644618,
      source: "osm",
      sourceId: "node/302501273"
    },
    {
      name: "С.Н. Фёдорову",
      category: "История",
      placeType: "history",
      description: "С.Н. Фёдорову — объект категории «история» в городе Москва.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 55.866432,
      lng: 37.548904,
      source: "osm",
      sourceId: "node/309329363"
    },
    {
      name: "Rostic's",
      category: "Еда",
      placeType: "food",
      description: "Rostic's — объект категории «еда» в городе Москва.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 55.653769,
      lng: 37.620673,
      source: "osm",
      sourceId: "node/309860239"
    },
    {
      name: "Rostic's",
      category: "Еда",
      placeType: "food",
      description: "Rostic's — объект категории «еда» в городе Москва.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 55.612873,
      lng: 37.719936,
      source: "osm",
      sourceId: "node/309863670"
    },
    {
      name: "Rostic's",
      category: "Еда",
      placeType: "food",
      description: "Rostic's — объект категории «еда» в городе Москва.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 55.622858,
      lng: 37.605569,
      source: "osm",
      sourceId: "node/309864829"
    },
    {
      name: "Царь-пушка",
      category: "История",
      placeType: "history",
      description: "Царь-пушка — объект категории «история» в городе Москва.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 55.751467,
      lng: 37.617921,
      source: "osm",
      sourceId: "node/311999396"
    },
    {
      name: "Царь-колокол",
      category: "Достопримечательность",
      placeType: "architecture",
      description: "Царь-колокол — объект категории «достопримечательность» в городе Москва.",
      emoji: "📍",
      duration: "1-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "architecture",
        "history"
      ],
      internalTags: [
        "type:architecture",
        "interest:architecture",
        "interest:history",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 55.750767,
      lng: 37.618437,
      source: "osm",
      sourceId: "node/311999397"
    },
    {
      name: "Аврора",
      category: "Еда",
      placeType: "food",
      description: "Аврора — объект категории «еда» в городе Москва.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 55.888725,
      lng: 37.691859,
      source: "osm",
      sourceId: "node/312453742"
    },
    {
      name: "Му-Му",
      category: "Еда",
      placeType: "food",
      description: "Му-Му — объект категории «еда» в городе Москва.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 55.757854,
      lng: 37.406983,
      source: "osm",
      sourceId: "node/314446809"
    },
    {
      name: "А. А. Андреев",
      category: "История",
      placeType: "history",
      description: "А. А. Андреев — объект категории «история» в городе Москва.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 55.724688,
      lng: 37.554625,
      source: "osm",
      sourceId: "node/315098634"
    },
    {
      name: "Ю. Н. Рерих",
      category: "История",
      placeType: "history",
      description: "Ю. Н. Рерих — объект категории «история» в городе Москва.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 55.725534,
      lng: 37.554556,
      source: "osm",
      sourceId: "node/315098673"
    },
    {
      name: "Р. М. Глиэр",
      category: "История",
      placeType: "history",
      description: "Р. М. Глиэр — объект категории «история» в городе Москва.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 55.725491,
      lng: 37.55405,
      source: "osm",
      sourceId: "node/315098818"
    },
    {
      name: "Пронто",
      category: "Еда",
      placeType: "food",
      description: "Пронто — объект категории «еда» в городе Москва.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 55.568746,
      lng: 37.585898,
      source: "osm",
      sourceId: "node/317215611"
    },
    {
      name: "Вкусно — и точка",
      category: "Еда",
      placeType: "food",
      description: "Вкусно — и точка — объект категории «еда» в городе Москва.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "Москва, улица Грина, 5А",
      lat: 55.566354,
      lng: 37.573006,
      source: "osm",
      sourceId: "node/317290202"
    },
    {
      name: "Вкусно — и точка",
      category: "Еда",
      placeType: "food",
      description: "Вкусно — и точка — объект категории «еда» в городе Москва.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 55.822888,
      lng: 37.588477,
      source: "osm",
      sourceId: "node/317352907"
    },
    {
      name: "Грин Пелас",
      category: "Еда",
      placeType: "food",
      description: "Грин Пелас — объект категории «еда» в городе Москва.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 55.568404,
      lng: 37.564624,
      source: "osm",
      sourceId: "node/317558920"
    },
    {
      name: "Фомичёва К. Я.",
      category: "История",
      placeType: "history",
      description: "Фомичёва К. Я. — объект категории «история» в городе Москва.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 55.858845,
      lng: 37.448843,
      source: "osm",
      sourceId: "node/317636006"
    },
    {
      name: "Вкусно — и точка",
      category: "Еда",
      placeType: "food",
      description: "Вкусно — и точка — объект категории «еда» в городе Москва.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 55.667556,
      lng: 37.658543,
      source: "osm",
      sourceId: "node/323107082"
    },
    {
      name: "Б. В. Иогансону",
      category: "История",
      placeType: "history",
      description: "Б. В. Иогансону — объект категории «история» в городе Москва.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 55.721896,
      lng: 37.585169,
      source: "osm",
      sourceId: "node/335853995"
    },
    {
      name: "О. Н. Ефремову",
      category: "История",
      placeType: "history",
      description: "О. Н. Ефремову — объект категории «история» в городе Москва.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 55.759371,
      lng: 37.611128,
      source: "osm",
      sourceId: "node/353047567"
    },
    {
      name: "Чоботы",
      category: "История",
      placeType: "history",
      description: "Чоботы — объект категории «история» в городе Москва.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 55.652792,
      lng: 37.358809,
      source: "osm",
      sourceId: "node/360002197"
    },
    {
      name: "Н.Э. Бауману",
      category: "История",
      placeType: "history",
      description: "Н.Э. Бауману — объект категории «история» в городе Москва.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 55.766118,
      lng: 37.683961,
      source: "osm",
      sourceId: "node/364081958"
    },
    {
      name: "Св. князю Даниилу",
      category: "История",
      placeType: "history",
      description: "Св. князю Даниилу — объект категории «история» в городе Москва.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 55.712879,
      lng: 37.623033,
      source: "osm",
      sourceId: "node/365393846"
    },
    {
      name: "ТрактирЪ Лефортово",
      category: "Еда",
      placeType: "food",
      description: "ТрактирЪ Лефортово — объект категории «еда» в городе Москва.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 55.756483,
      lng: 37.715506,
      source: "osm",
      sourceId: "node/379767816"
    },
    {
      name: "М.И. Калинину",
      category: "История",
      placeType: "history",
      description: "М.И. Калинину — объект категории «история» в городе Москва.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 55.752895,
      lng: 37.717515,
      source: "osm",
      sourceId: "node/380403043"
    },
    {
      name: "Вкусно — и точка",
      category: "Еда",
      placeType: "food",
      description: "Вкусно — и точка — объект категории «еда» в городе Москва.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "Москва",
      lat: 55.706028,
      lng: 37.766913,
      source: "osm",
      sourceId: "node/386179754"
    },
    {
      name: "Тануки",
      category: "Еда",
      placeType: "food",
      description: "Тануки — объект категории «еда» в городе Москва.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 55.642493,
      lng: 37.361208,
      source: "osm",
      sourceId: "node/411299606"
    },
    {
      name: "Ёрш",
      category: "Еда",
      placeType: "food",
      description: "Ёрш — объект категории «еда» в городе Москва.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 55.642497,
      lng: 37.36147,
      source: "osm",
      sourceId: "node/411299607"
    },
    {
      name: "Вкусно — и точка",
      category: "Еда",
      placeType: "food",
      description: "Вкусно — и точка — объект категории «еда» в городе Москва.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 55.885106,
      lng: 37.602362,
      source: "osm",
      sourceId: "node/411303460"
    },
    {
      name: "В. Г. Шухову",
      category: "История",
      placeType: "history",
      description: "В. Г. Шухову — объект категории «история» в городе Москва.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 55.766113,
      lng: 37.635708,
      source: "osm",
      sourceId: "node/416562785"
    },
    {
      name: "А. С. Грибоедову",
      category: "История",
      placeType: "history",
      description: "А. С. Грибоедову — объект категории «история» в городе Москва.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 55.764461,
      lng: 37.639259,
      source: "osm",
      sourceId: "node/416562786"
    },
    {
      name: "Н. К. Крупской",
      category: "История",
      placeType: "history",
      description: "Н. К. Крупской — объект категории «история» в городе Москва.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 55.766622,
      lng: 37.632292,
      source: "osm",
      sourceId: "node/416562788"
    },
    {
      name: "В. С. Высоцкому",
      category: "История",
      placeType: "history",
      description: "В. С. Высоцкому — объект категории «история» в городе Москва.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 55.76817,
      lng: 37.61292,
      source: "osm",
      sourceId: "node/416562789"
    },
    {
      name: "А. С. Пушкину",
      category: "История",
      placeType: "history",
      description: "А. С. Пушкину — объект категории «история» в городе Москва.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 55.765335,
      lng: 37.605486,
      source: "osm",
      sourceId: "node/416562790"
    },
    {
      name: "К. А. Тимирязеву",
      category: "История",
      placeType: "history",
      description: "К. А. Тимирязеву — объект категории «история» в городе Москва.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 55.757903,
      lng: 37.598588,
      source: "osm",
      sourceId: "node/416562791"
    },
    {
      name: "Александру II",
      category: "История",
      placeType: "history",
      description: "Александру II — объект категории «история» в городе Москва.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 55.745752,
      lng: 37.606857,
      source: "osm",
      sourceId: "node/416562794"
    },
    {
      name: "Хо Ши Мину",
      category: "История",
      placeType: "history",
      description: "Хо Ши Мину — объект категории «история» в городе Москва.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 55.687961,
      lng: 37.574847,
      source: "osm",
      sourceId: "node/417283706"
    },
    {
      name: "Монумент Победы",
      category: "История",
      placeType: "history",
      description: "Монумент Победы — объект категории «история» в городе Москва.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 55.731699,
      lng: 37.507008,
      source: "osm",
      sourceId: "node/420424302"
    },
    {
      name: "Wild Athletic Club",
      category: "Активности",
      placeType: "sport",
      description: "Wild Athletic Club — объект категории «активности» в городе Москва.",
      emoji: "🏃",
      duration: "2 часа",
      price: "800 ₽",
      rating: 4.5,
      interests: [
        "sport",
        "wellness"
      ],
      internalTags: [
        "type:sport",
        "interest:sport",
        "interest:wellness",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "Москва, Фестивальная улица, 53",
      lat: 55.860701,
      lng: 37.495255,
      source: "osm",
      sourceId: "node/427262972"
    },
    {
      name: "Чешска пивница",
      category: "Ночная жизнь",
      placeType: "nightlife",
      description: "Чешска пивница — объект категории «ночная жизнь» в городе Москва.",
      emoji: "🍸",
      duration: "2-3 часа",
      price: "1 500–3 000 ₽",
      rating: 4.5,
      interests: [
        "nightlife",
        "food"
      ],
      internalTags: [
        "type:nightlife",
        "interest:nightlife",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "evening",
      address: "",
      lat: 55.612254,
      lng: 37.721315,
      source: "osm",
      sourceId: "node/429453905"
    },
    {
      name: "Старый дуб",
      category: "Еда",
      placeType: "food",
      description: "Старый дуб — объект категории «еда» в городе Москва.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 55.697688,
      lng: 37.785774,
      source: "osm",
      sourceId: "node/429610873"
    },
    {
      name: "Погибшим воинам села Троице-лыково",
      category: "История",
      placeType: "history",
      description: "Погибшим воинам села Троице-лыково — объект категории «история» в городе Москва.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 55.78944,
      lng: 37.403827,
      source: "osm",
      sourceId: "node/430405323"
    },
    {
      name: "Шоколадница",
      category: "Еда",
      placeType: "food",
      description: "Шоколадница — объект категории «еда» в городе Москва.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "улица Дмитрия Ульянова, 24",
      lat: 55.686673,
      lng: 37.572991,
      source: "osm",
      sourceId: "node/431245873"
    },
    {
      name: "Manana",
      category: "Еда",
      placeType: "food",
      description: "Manana — объект категории «еда» в городе Москва.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 55.616142,
      lng: 37.720156,
      source: "osm",
      sourceId: "node/433333411"
    },
    {
      name: "М. В. Ломоносову",
      category: "История",
      placeType: "history",
      description: "М. В. Ломоносову — объект категории «история» в городе Москва.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 55.701189,
      lng: 37.527634,
      source: "osm",
      sourceId: "node/438004955"
    },
    {
      name: "Вечный огонь",
      category: "История",
      placeType: "history",
      description: "Вечный огонь — объект категории «история» в городе Москва.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 55.698274,
      lng: 37.53896,
      source: "osm",
      sourceId: "node/438033166"
    },
    {
      name: "Вкусно — и точка",
      category: "Еда",
      placeType: "food",
      description: "Вкусно — и точка — объект категории «еда» в городе Москва.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 55.612125,
      lng: 37.731993,
      source: "osm",
      sourceId: "node/440956478"
    },
    {
      name: "Дом Культуры Железнодорожников",
      category: "История",
      placeType: "history",
      description: "Дом Культуры Железнодорожников — объект категории «история» в городе Москва.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 55.775663,
      lng: 37.658141,
      source: "osm",
      sourceId: "node/442603544"
    },
    {
      name: "Джорджия",
      category: "Еда",
      placeType: "food",
      description: "Джорджия — объект категории «еда» в городе Москва.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 55.640876,
      lng: 37.603491,
      source: "osm",
      sourceId: "node/442618546"
    },
    {
      name: "Подъезд",
      category: "Еда",
      placeType: "food",
      description: "Подъезд — объект категории «еда» в городе Москва.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 55.656732,
      lng: 37.597374,
      source: "osm",
      sourceId: "node/447355505"
    }
  ],
  "санкт-петербург": [
    {
      name: "Центр круглого зала",
      category: "История",
      placeType: "history",
      description: "Центр круглого зала — объект категории «история» в городе Санкт-Петербург.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 59.771793,
      lng: 30.32611,
      source: "osm",
      sourceId: "node/2"
    },
    {
      name: "Башмаки неизвестного дачника (2009)",
      category: "Достопримечательность",
      placeType: "architecture",
      description: "Башмаки неизвестного дачника (2009) — объект категории «достопримечательность» в городе Санкт-Петербург.",
      emoji: "📍",
      duration: "1-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "architecture",
        "history"
      ],
      internalTags: [
        "type:architecture",
        "interest:architecture",
        "interest:history",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 60.189557,
      lng: 29.700233,
      source: "osm",
      sourceId: "node/238809"
    },
    {
      name: "В. И. Ленин",
      category: "История",
      placeType: "history",
      description: "В. И. Ленин — объект категории «история» в городе Санкт-Петербург.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 59.946264,
      lng: 30.395801,
      source: "osm",
      sourceId: "node/21626280"
    },
    {
      name: "Озёрная",
      category: "Достопримечательность",
      placeType: "architecture",
      description: "Озёрная — объект категории «достопримечательность» в городе Санкт-Петербург.",
      emoji: "📍",
      duration: "1-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "architecture",
        "history"
      ],
      internalTags: [
        "type:architecture",
        "interest:architecture",
        "interest:history",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 60.0392,
      lng: 30.296405,
      source: "osm",
      sourceId: "node/21751966"
    },
    {
      name: "М. И. Калинин",
      category: "История",
      placeType: "history",
      description: "М. И. Калинин — объект категории «история» в городе Санкт-Петербург.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 59.970296,
      lng: 30.386136,
      source: "osm",
      sourceId: "node/80317281"
    },
    {
      name: "Калипсо",
      category: "Еда",
      placeType: "food",
      description: "Калипсо — объект категории «еда» в городе Санкт-Петербург.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 60.123195,
      lng: 29.941696,
      source: "osm",
      sourceId: "node/147897795"
    },
    {
      name: "Родина-Мать",
      category: "История",
      placeType: "history",
      description: "Родина-Мать — объект категории «история» в городе Санкт-Петербург.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 59.997581,
      lng: 30.423875,
      source: "osm",
      sourceId: "node/242160221"
    },
    {
      name: "Фитнес",
      category: "Активности",
      placeType: "sport",
      description: "Фитнес — объект категории «активности» в городе Санкт-Петербург.",
      emoji: "🏃",
      duration: "2 часа",
      price: "800 ₽",
      rating: 4.5,
      interests: [
        "sport",
        "wellness"
      ],
      internalTags: [
        "type:sport",
        "interest:sport",
        "interest:wellness",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 60.01199,
      lng: 30.411555,
      source: "osm",
      sourceId: "node/248465159"
    },
    {
      name: "Петру Великому",
      category: "История",
      placeType: "history",
      description: "Петру Великому — объект категории «история» в городе Санкт-Петербург.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 59.936408,
      lng: 30.302177,
      source: "osm",
      sourceId: "node/249082841"
    },
    {
      name: "Александр Невский",
      category: "История",
      placeType: "history",
      description: "Александр Невский — объект категории «история» в городе Санкт-Петербург.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 59.923601,
      lng: 30.385356,
      source: "osm",
      sourceId: "node/249235969"
    },
    {
      name: "ДОТ (КНП) № 124 КаУР («Серебряный»)",
      category: "История",
      placeType: "history",
      description: "ДОТ (КНП) № 124 КаУР («Серебряный») — объект категории «история» в городе Санкт-Петербург.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 60.115061,
      lng: 29.966558,
      source: "osm",
      sourceId: "node/249284660"
    },
    {
      name: "Т. Г. Шевченко",
      category: "История",
      placeType: "history",
      description: "Т. Г. Шевченко — объект категории «история» в городе Санкт-Петербург.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 59.966901,
      lng: 30.306439,
      source: "osm",
      sourceId: "node/252128651"
    },
    {
      name: "Русская рыбалка",
      category: "Еда",
      placeType: "food",
      description: "Русская рыбалка — объект категории «еда» в городе Санкт-Петербург.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 59.969275,
      lng: 30.233143,
      source: "osm",
      sourceId: "node/256129802"
    },
    {
      name: "Сквер",
      category: "Ночная жизнь",
      placeType: "nightlife",
      description: "Сквер — объект категории «ночная жизнь» в городе Санкт-Петербург.",
      emoji: "🍸",
      duration: "2-3 часа",
      price: "1 500–3 000 ₽",
      rating: 4.5,
      interests: [
        "nightlife",
        "food"
      ],
      internalTags: [
        "type:nightlife",
        "interest:nightlife",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "evening",
      address: "",
      lat: 59.961836,
      lng: 30.310421,
      source: "osm",
      sourceId: "node/256915769"
    },
    {
      name: "Mama Roma",
      category: "Еда",
      placeType: "food",
      description: "Mama Roma — объект категории «еда» в городе Санкт-Петербург.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 59.962815,
      lng: 30.306843,
      source: "osm",
      sourceId: "node/257411870"
    },
    {
      name: "Слойка",
      category: "Еда",
      placeType: "food",
      description: "Слойка — объект категории «еда» в городе Санкт-Петербург.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 59.95924,
      lng: 30.31186,
      source: "osm",
      sourceId: "node/258122668"
    },
    {
      name: "Мама Рада",
      category: "Еда",
      placeType: "food",
      description: "Мама Рада — объект категории «еда» в городе Санкт-Петербург.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 59.932524,
      lng: 30.347579,
      source: "osm",
      sourceId: "node/258371164"
    },
    {
      name: "Снежинка",
      category: "Еда",
      placeType: "food",
      description: "Снежинка — объект категории «еда» в городе Санкт-Петербург.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 59.963163,
      lng: 30.301681,
      source: "osm",
      sourceId: "node/259668470"
    },
    {
      name: "Г. К. Жукову",
      category: "История",
      placeType: "history",
      description: "Г. К. Жукову — объект категории «история» в городе Санкт-Петербург.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 59.858009,
      lng: 30.384967,
      source: "osm",
      sourceId: "node/262615345"
    },
    {
      name: "Хачо и Пури",
      category: "Еда",
      placeType: "food",
      description: "Хачо и Пури — объект категории «еда» в городе Санкт-Петербург.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 59.966687,
      lng: 30.28602,
      source: "osm",
      sourceId: "node/267408554"
    },
    {
      name: "ТаймАут",
      category: "Еда",
      placeType: "food",
      description: "ТаймАут — объект категории «еда» в городе Санкт-Петербург.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 60.104587,
      lng: 29.97727,
      source: "osm",
      sourceId: "node/276792102"
    },
    {
      name: "Контакт Бар",
      category: "Ночная жизнь",
      placeType: "nightlife",
      description: "Контакт Бар — объект категории «ночная жизнь» в городе Санкт-Петербург.",
      emoji: "🍸",
      duration: "2-3 часа",
      price: "1 500–3 000 ₽",
      rating: 4.5,
      interests: [
        "nightlife",
        "food"
      ],
      internalTags: [
        "type:nightlife",
        "interest:nightlife",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "evening",
      address: "Санкт-Петербург, 2-я Красноармейская улица, 9/3",
      lat: 59.915397,
      lng: 30.313205,
      source: "osm",
      sourceId: "node/291553157"
    },
    {
      name: "Низами Гянджеви",
      category: "История",
      placeType: "history",
      description: "Низами Гянджеви — объект категории «история» в городе Санкт-Петербург.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 59.963834,
      lng: 30.314417,
      source: "osm",
      sourceId: "node/292325680"
    },
    {
      name: "Западная стрелка Елагина острова",
      category: "Природа",
      placeType: "nature",
      description: "Западная стрелка Елагина острова — объект категории «природа» в городе Санкт-Петербург.",
      emoji: "🌄",
      duration: "2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "nature"
      ],
      internalTags: [
        "type:nature",
        "interest:nature",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 59.980258,
      lng: 30.2364,
      source: "osm",
      sourceId: "node/300951745"
    },
    {
      name: "Н. Г. Чернышевский",
      category: "История",
      placeType: "history",
      description: "Н. Г. Чернышевский — объект категории «история» в городе Санкт-Петербург.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 59.868902,
      lng: 30.319551,
      source: "osm",
      sourceId: "node/302252549"
    },
    {
      name: "Больше Кофе",
      category: "Еда",
      placeType: "food",
      description: "Больше Кофе — объект категории «еда» в городе Санкт-Петербург.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "Александровский парк, 3Г",
      lat: 59.954505,
      lng: 30.320509,
      source: "osm",
      sourceId: "node/305880722"
    },
    {
      name: "maSKa",
      category: "Еда",
      placeType: "food",
      description: "maSKa — объект категории «еда» в городе Санкт-Петербург.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 59.924773,
      lng: 30.289133,
      source: "osm",
      sourceId: "node/311101157"
    },
    {
      name: "Музей-институт семьи Рерихов",
      category: "Музей",
      placeType: "museum",
      description: "Музей-институт семьи Рерихов — объект категории «музей» в городе Санкт-Петербург.",
      emoji: "🏛️",
      duration: "2-3 часа",
      price: "500 ₽",
      rating: 4.5,
      interests: [
        "museums",
        "art",
        "history"
      ],
      internalTags: [
        "type:museum",
        "interest:museums",
        "interest:art",
        "interest:history",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 59.931619,
      lng: 30.272,
      source: "osm",
      sourceId: "node/311367818"
    },
    {
      name: "Подводная лодка",
      category: "История",
      placeType: "history",
      description: "Подводная лодка — объект категории «история» в городе Санкт-Петербург.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 59.983225,
      lng: 30.399296,
      source: "osm",
      sourceId: "node/316059655"
    },
    {
      name: "Михаил Кутузов",
      category: "История",
      placeType: "history",
      description: "Михаил Кутузов — объект категории «история» в городе Санкт-Петербург.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 59.934983,
      lng: 30.325964,
      source: "osm",
      sourceId: "node/318501546"
    },
    {
      name: "Михаил Барклай-де-Толли",
      category: "История",
      placeType: "history",
      description: "Михаил Барклай-де-Толли — объект категории «история» в городе Санкт-Петербург.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 59.935247,
      lng: 30.324264,
      source: "osm",
      sourceId: "node/318501570"
    },
    {
      name: "Василию Ивановичу Чапаеву",
      category: "История",
      placeType: "history",
      description: "Василию Ивановичу Чапаеву — объект категории «история» в городе Санкт-Петербург.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 60.011192,
      lng: 30.372669,
      source: "osm",
      sourceId: "node/320034011"
    },
    {
      name: "Veli Cafe",
      category: "Еда",
      placeType: "food",
      description: "Veli Cafe — объект категории «еда» в городе Санкт-Петербург.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 59.955419,
      lng: 30.296153,
      source: "osm",
      sourceId: "node/322049855"
    },
    {
      name: "Теремок",
      category: "Еда",
      placeType: "food",
      description: "Теремок — объект категории «еда» в городе Санкт-Петербург.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 59.962094,
      lng: 30.305672,
      source: "osm",
      sourceId: "node/322050442"
    },
    {
      name: "Лестр",
      category: "Ночная жизнь",
      placeType: "nightlife",
      description: "Лестр — объект категории «ночная жизнь» в городе Санкт-Петербург.",
      emoji: "🍸",
      duration: "2-3 часа",
      price: "1 500–3 000 ₽",
      rating: 4.5,
      interests: [
        "nightlife",
        "food"
      ],
      internalTags: [
        "type:nightlife",
        "interest:nightlife",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "evening",
      address: "Санкт-Петербург, улица Ленина, 25",
      lat: 59.963119,
      lng: 30.302541,
      source: "osm",
      sourceId: "node/330932918"
    },
    {
      name: "Вкусно — и точка",
      category: "Еда",
      placeType: "food",
      description: "Вкусно — и точка — объект категории «еда» в городе Санкт-Петербург.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 59.966808,
      lng: 30.311029,
      source: "osm",
      sourceId: "node/332269021"
    },
    {
      name: "Rostic`s",
      category: "Еда",
      placeType: "food",
      description: "Rostic`s — объект категории «еда» в городе Санкт-Петербург.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "Каменноостровский проспект, 37 литД",
      lat: 59.966663,
      lng: 30.31141,
      source: "osm",
      sourceId: "node/332269029"
    },
    {
      name: "свитер",
      category: "Еда",
      placeType: "food",
      description: "свитер — объект категории «еда» в городе Санкт-Петербург.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 59.966404,
      lng: 30.301122,
      source: "osm",
      sourceId: "node/334305843"
    },
    {
      name: "А. В. Суворову",
      category: "История",
      placeType: "history",
      description: "А. В. Суворову — объект категории «история» в городе Санкт-Петербург.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 59.945902,
      lng: 30.329877,
      source: "osm",
      sourceId: "node/334791500"
    },
    {
      name: "Зелёный кабинет",
      category: "История",
      placeType: "history",
      description: "Зелёный кабинет — объект категории «история» в городе Санкт-Петербург.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 60.08162,
      lng: 30.030698,
      source: "osm",
      sourceId: "node/336033656"
    },
    {
      name: "Шалаш Владимира Ильича Ленина",
      category: "История",
      placeType: "history",
      description: "Шалаш Владимира Ильича Ленина — объект категории «история» в городе Санкт-Петербург.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 60.081675,
      lng: 30.031333,
      source: "osm",
      sourceId: "node/336033659"
    },
    {
      name: "Тбилисо",
      category: "Еда",
      placeType: "food",
      description: "Тбилисо — объект категории «еда» в городе Санкт-Петербург.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "Сытнинская улица, 10",
      lat: 59.95767,
      lng: 30.308041,
      source: "osm",
      sourceId: "node/339394780"
    },
    {
      name: "Цветочные часы",
      category: "Достопримечательность",
      placeType: "architecture",
      description: "Цветочные часы — объект категории «достопримечательность» в городе Санкт-Петербург.",
      emoji: "📍",
      duration: "1-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "architecture",
        "history"
      ],
      internalTags: [
        "type:architecture",
        "interest:architecture",
        "interest:history",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 59.955685,
      lng: 30.309908,
      source: "osm",
      sourceId: "node/339816775"
    },
    {
      name: "Стерегущий",
      category: "История",
      placeType: "history",
      description: "Стерегущий — объект категории «история» в городе Санкт-Петербург.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 59.955473,
      lng: 30.320804,
      source: "osm",
      sourceId: "node/339816778"
    },
    {
      name: "Nothing Fancy",
      category: "Еда",
      placeType: "food",
      description: "Nothing Fancy — объект категории «еда» в городе Санкт-Петербург.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 59.959487,
      lng: 30.302996,
      source: "osm",
      sourceId: "node/343474180"
    },
    {
      name: "Дамаск",
      category: "Еда",
      placeType: "food",
      description: "Дамаск — объект категории «еда» в городе Санкт-Петербург.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 59.957106,
      lng: 30.313079,
      source: "osm",
      sourceId: "node/355280520"
    },
    {
      name: "Карл Маркс",
      category: "История",
      placeType: "history",
      description: "Карл Маркс — объект категории «история» в городе Санкт-Петербург.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 59.9461,
      lng: 30.393105,
      source: "osm",
      sourceId: "node/356880631"
    },
    {
      name: "Фридрих Энгельс",
      category: "История",
      placeType: "history",
      description: "Фридрих Энгельс — объект категории «история» в городе Санкт-Петербург.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 59.946593,
      lng: 30.393148,
      source: "osm",
      sourceId: "node/356880633"
    },
    {
      name: "Г. К. Жукову",
      category: "История",
      placeType: "history",
      description: "Г. К. Жукову — объект категории «история» в городе Санкт-Петербург.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 59.86904,
      lng: 30.328724,
      source: "osm",
      sourceId: "node/360040747"
    },
    {
      name: "Героическому Комсомолу",
      category: "История",
      placeType: "history",
      description: "Героическому Комсомолу — объект категории «история» в городе Санкт-Петербург.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 59.874302,
      lng: 30.259748,
      source: "osm",
      sourceId: "node/367972278"
    },
    {
      name: "Ôpetit",
      category: "Еда",
      placeType: "food",
      description: "Ôpetit — объект категории «еда» в городе Санкт-Петербург.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 59.952285,
      lng: 30.297308,
      source: "osm",
      sourceId: "node/394830180"
    },
    {
      name: "Динер холл",
      category: "Еда",
      placeType: "food",
      description: "Динер холл — объект категории «еда» в городе Санкт-Петербург.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 59.913657,
      lng: 30.375439,
      source: "osm",
      sourceId: "node/401627284"
    },
    {
      name: "Амилен",
      category: "Еда",
      placeType: "food",
      description: "Амилен — объект категории «еда» в городе Санкт-Петербург.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 59.914076,
      lng: 30.376812,
      source: "osm",
      sourceId: "node/401627386"
    },
    {
      name: "The Templet Bar",
      category: "Ночная жизнь",
      placeType: "nightlife",
      description: "The Templet Bar — объект категории «ночная жизнь» в городе Санкт-Петербург.",
      emoji: "🍸",
      duration: "2-3 часа",
      price: "1 500–3 000 ₽",
      rating: 4.5,
      interests: [
        "nightlife",
        "food"
      ],
      internalTags: [
        "type:nightlife",
        "interest:nightlife",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "evening",
      address: "",
      lat: 59.938606,
      lng: 30.363226,
      source: "osm",
      sourceId: "node/414011338"
    },
    {
      name: "Bier König",
      category: "Ночная жизнь",
      placeType: "nightlife",
      description: "Bier König — объект категории «ночная жизнь» в городе Санкт-Петербург.",
      emoji: "🍸",
      duration: "2-3 часа",
      price: "1 500–3 000 ₽",
      rating: 4.5,
      interests: [
        "nightlife",
        "food"
      ],
      internalTags: [
        "type:nightlife",
        "interest:nightlife",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "evening",
      address: "",
      lat: 59.927391,
      lng: 30.323888,
      source: "osm",
      sourceId: "node/414689525"
    },
    {
      name: "Петру Первому, основателю Кронштадта",
      category: "История",
      placeType: "history",
      description: "Петру Первому, основателю Кронштадта — объект категории «история» в городе Санкт-Петербург.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 59.987075,
      lng: 29.768835,
      source: "osm",
      sourceId: "node/416678214"
    },
    {
      name: "Адмиралу Степану Осиповичу Макарову",
      category: "История",
      placeType: "history",
      description: "Адмиралу Степану Осиповичу Макарову — объект категории «история» в городе Санкт-Петербург.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 59.991478,
      lng: 29.775203,
      source: "osm",
      sourceId: "node/416678240"
    },
    {
      name: "Кронштадтский футшток",
      category: "Достопримечательность",
      placeType: "architecture",
      description: "Кронштадтский футшток — объект категории «достопримечательность» в городе Санкт-Петербург.",
      emoji: "📍",
      duration: "1-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "architecture",
        "history"
      ],
      internalTags: [
        "type:architecture",
        "interest:architecture",
        "interest:history",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 59.989199,
      lng: 29.762327,
      source: "osm",
      sourceId: "node/425285546"
    },
    {
      name: "Пури",
      category: "Еда",
      placeType: "food",
      description: "Пури — объект категории «еда» в городе Санкт-Петербург.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 59.943893,
      lng: 30.479272,
      source: "osm",
      sourceId: "node/427101772"
    },
    {
      name: "Барселона",
      category: "Еда",
      placeType: "food",
      description: "Барселона — объект категории «еда» в городе Санкт-Петербург.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 59.96699,
      lng: 30.475417,
      source: "osm",
      sourceId: "node/432501052"
    },
    {
      name: "Евразия",
      category: "Еда",
      placeType: "food",
      description: "Евразия — объект категории «еда» в городе Санкт-Петербург.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 59.918996,
      lng: 30.472425,
      source: "osm",
      sourceId: "node/441595403"
    },
    {
      name: "Владимир Ильич Ленин",
      category: "История",
      placeType: "history",
      description: "Владимир Ильич Ленин — объект категории «история» в городе Санкт-Петербург.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 59.749094,
      lng: 30.612438,
      source: "osm",
      sourceId: "node/442017683"
    },
    {
      name: "Мики",
      category: "Еда",
      placeType: "food",
      description: "Мики — объект категории «еда» в городе Санкт-Петербург.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 59.875562,
      lng: 30.459232,
      source: "osm",
      sourceId: "node/442971495"
    },
    {
      name: "Камелот",
      category: "Еда",
      placeType: "food",
      description: "Камелот — объект категории «еда» в городе Санкт-Петербург.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 59.911957,
      lng: 30.468618,
      source: "osm",
      sourceId: "node/443212284"
    },
    {
      name: "Wahaha",
      category: "Еда",
      placeType: "food",
      description: "Wahaha — объект категории «еда» в городе Санкт-Петербург.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 59.930488,
      lng: 30.364213,
      source: "osm",
      sourceId: "node/444776758"
    },
    {
      name: "Блокадный колодец",
      category: "История",
      placeType: "history",
      description: "Блокадный колодец — объект категории «история» в городе Санкт-Петербург.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 60.0084,
      lng: 30.375303,
      source: "osm",
      sourceId: "node/444986433"
    },
    {
      name: "Героям Октябрьской революции",
      category: "История",
      placeType: "history",
      description: "Героям Октябрьской революции — объект категории «история» в городе Санкт-Петербург.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 59.991153,
      lng: 30.345969,
      source: "osm",
      sourceId: "node/444997399"
    },
    {
      name: "Военному аэродрому Сосновка",
      category: "История",
      placeType: "history",
      description: "Военному аэродрому Сосновка — объект категории «история» в городе Санкт-Петербург.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 60.018943,
      lng: 30.351014,
      source: "osm",
      sourceId: "node/445108711"
    },
    {
      name: "Flat White",
      category: "Еда",
      placeType: "food",
      description: "Flat White — объект категории «еда» в городе Санкт-Петербург.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 59.918387,
      lng: 30.346403,
      source: "osm",
      sourceId: "node/446064736"
    },
    {
      name: "Simple Food Cafe",
      category: "Еда",
      placeType: "food",
      description: "Simple Food Cafe — объект категории «еда» в городе Санкт-Петербург.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 59.917966,
      lng: 30.34875,
      source: "osm",
      sourceId: "node/446064740"
    },
    {
      name: "Branch garage",
      category: "Ночная жизнь",
      placeType: "nightlife",
      description: "Branch garage — объект категории «ночная жизнь» в городе Санкт-Петербург.",
      emoji: "🍸",
      duration: "2-3 часа",
      price: "1 500–3 000 ₽",
      rating: 4.5,
      interests: [
        "nightlife",
        "food"
      ],
      internalTags: [
        "type:nightlife",
        "interest:nightlife",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "evening",
      address: "Санкт-Петербург, улица Печатника Григорьева, 12",
      lat: 59.919097,
      lng: 30.350674,
      source: "osm",
      sourceId: "node/446064741"
    },
    {
      name: "Жертвам Советско-Финляндской войны",
      category: "История",
      placeType: "history",
      description: "Жертвам Советско-Финляндской войны — объект категории «история» в городе Санкт-Петербург.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 59.955981,
      lng: 30.350392,
      source: "osm",
      sourceId: "node/446272328"
    },
    {
      name: "С. П. Боткин",
      category: "История",
      placeType: "history",
      description: "С. П. Боткин — объект категории «история» в городе Санкт-Петербург.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 59.958804,
      lng: 30.346487,
      source: "osm",
      sourceId: "node/446273164"
    },
    {
      name: "Rostic's",
      category: "Еда",
      placeType: "food",
      description: "Rostic's — объект категории «еда» в городе Санкт-Петербург.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "проспект Энгельса, 154",
      lat: 60.058868,
      lng: 30.337377,
      source: "osm",
      sourceId: "node/446896006"
    },
    {
      name: "Место дуэли Новосильцева и Чернова 14 сентября 1825 г.",
      category: "История",
      placeType: "history",
      description: "Место дуэли Новосильцева и Чернова 14 сентября 1825 г. — объект категории «история» в городе Санкт-Петербург.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 59.997039,
      lng: 30.334673,
      source: "osm",
      sourceId: "node/448465650"
    },
    {
      name: "Э. Л. Вольфу",
      category: "История",
      placeType: "history",
      description: "Э. Л. Вольфу — объект категории «история» в городе Санкт-Петербург.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 59.992599,
      lng: 30.341443,
      source: "osm",
      sourceId: "node/448509913"
    },
    {
      name: "Вкусно — и точка",
      category: "Еда",
      placeType: "food",
      description: "Вкусно — и точка — объект категории «еда» в городе Санкт-Петербург.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 59.900143,
      lng: 30.272139,
      source: "osm",
      sourceId: "node/451568012"
    },
    {
      name: "Mendeleev",
      category: "Ночная жизнь",
      placeType: "nightlife",
      description: "Mendeleev — объект категории «ночная жизнь» в городе Санкт-Петербург.",
      emoji: "🍸",
      duration: "2-3 часа",
      price: "1 500–3 000 ₽",
      rating: 4.5,
      interests: [
        "nightlife",
        "food"
      ],
      internalTags: [
        "type:nightlife",
        "interest:nightlife",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "evening",
      address: "",
      lat: 59.93029,
      lng: 30.324867,
      source: "osm",
      sourceId: "node/455268752"
    },
    {
      name: "Старгород",
      category: "Еда",
      placeType: "food",
      description: "Старгород — объект категории «еда» в городе Санкт-Петербург.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 59.932076,
      lng: 30.321169,
      source: "osm",
      sourceId: "node/455274074"
    },
    {
      name: "Тара Бруч",
      category: "Ночная жизнь",
      placeType: "nightlife",
      description: "Тара Бруч — объект категории «ночная жизнь» в городе Санкт-Петербург.",
      emoji: "🍸",
      duration: "2-3 часа",
      price: "1 500–3 000 ₽",
      rating: 4.5,
      interests: [
        "nightlife",
        "food"
      ],
      internalTags: [
        "type:nightlife",
        "interest:nightlife",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "evening",
      address: "",
      lat: 59.93055,
      lng: 30.372639,
      source: "osm",
      sourceId: "node/455297491"
    }
  ],
  "казань": [
    {
      name: "Бургер Кинг",
      category: "Еда",
      placeType: "food",
      description: "Бургер Кинг — объект категории «еда» в городе Казань.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "улица Пушкина, 4",
      lat: 55.7864,
      lng: 49.121915,
      source: "osm",
      sourceId: "node/639037258"
    },
    {
      name: "Вкусно — и точка",
      category: "Еда",
      placeType: "food",
      description: "Вкусно — и точка — объект категории «еда» в городе Казань.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 55.788984,
      lng: 49.118001,
      source: "osm",
      sourceId: "node/698271118"
    },
    {
      name: "Вкусно — и точка",
      category: "Еда",
      placeType: "food",
      description: "Вкусно — и точка — объект категории «еда» в городе Казань.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "улица Дементьева, 1В",
      lat: 55.847783,
      lng: 49.084761,
      source: "osm",
      sourceId: "node/711877071"
    },
    {
      name: "Зодчим Казанского кремля",
      category: "История",
      placeType: "history",
      description: "Зодчим Казанского кремля — объект категории «история» в городе Казань.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 55.799442,
      lng: 49.106243,
      source: "osm",
      sourceId: "node/764556467"
    },
    {
      name: "Дербышки",
      category: "Еда",
      placeType: "food",
      description: "Дербышки — объект категории «еда» в городе Казань.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 55.862482,
      lng: 49.215068,
      source: "osm",
      sourceId: "node/768040645"
    },
    {
      name: "Паровоз",
      category: "История",
      placeType: "history",
      description: "Паровоз — объект категории «история» в городе Казань.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 55.826231,
      lng: 48.897015,
      source: "osm",
      sourceId: "node/838930870"
    },
    {
      name: "В. И. Ленину",
      category: "История",
      placeType: "history",
      description: "В. И. Ленину — объект категории «история» в городе Казань.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 55.796556,
      lng: 49.125044,
      source: "osm",
      sourceId: "node/892767318"
    },
    {
      name: "В.И. Ульянову-Ленину",
      category: "История",
      placeType: "history",
      description: "В.И. Ульянову-Ленину — объект категории «история» в городе Казань.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 55.791184,
      lng: 49.122189,
      source: "osm",
      sourceId: "node/966489790"
    },
    {
      name: "Refettorio",
      category: "Еда",
      placeType: "food",
      description: "Refettorio — объект категории «еда» в городе Казань.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 55.795426,
      lng: 49.123684,
      source: "osm",
      sourceId: "node/966495557"
    },
    {
      name: "Воинам, погибшим в ВОВ",
      category: "История",
      placeType: "history",
      description: "Воинам, погибшим в ВОВ — объект категории «история» в городе Казань.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 55.82776,
      lng: 49.105561,
      source: "osm",
      sourceId: "node/969126382"
    },
    {
      name: "Н. И. Лобачевскому",
      category: "История",
      placeType: "history",
      description: "Н. И. Лобачевскому — объект категории «история» в городе Казань.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 55.792093,
      lng: 49.120451,
      source: "osm",
      sourceId: "node/1012203858"
    },
    {
      name: "Picasso",
      category: "Еда",
      placeType: "food",
      description: "Picasso — объект категории «еда» в городе Казань.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "Чистопольская улица, 20",
      lat: 55.81791,
      lng: 49.111202,
      source: "osm",
      sourceId: "node/1013114947"
    },
    {
      name: "Шамилю Усманову",
      category: "История",
      placeType: "history",
      description: "Шамилю Усманову — объект категории «история» в городе Казань.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 55.796571,
      lng: 49.122244,
      source: "osm",
      sourceId: "node/1042262704"
    },
    {
      name: "Древняя Бухара",
      category: "Еда",
      placeType: "food",
      description: "Древняя Бухара — объект категории «еда» в городе Казань.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 55.792848,
      lng: 49.107602,
      source: "osm",
      sourceId: "node/1069187417"
    },
    {
      name: "Л. Н. Толстому",
      category: "История",
      placeType: "history",
      description: "Л. Н. Толстому — объект категории «история» в городе Казань.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 55.795497,
      lng: 49.139328,
      source: "osm",
      sourceId: "node/1110717751"
    },
    {
      name: "С.М. Кирову",
      category: "История",
      placeType: "history",
      description: "С.М. Кирову — объект категории «история» в городе Казань.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 55.794546,
      lng: 49.141214,
      source: "osm",
      sourceId: "node/1141214285"
    },
    {
      name: "В.А. Котельникову",
      category: "История",
      placeType: "history",
      description: "В.А. Котельникову — объект категории «история» в городе Казань.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 55.79416,
      lng: 49.142331,
      source: "osm",
      sourceId: "node/1141214313"
    },
    {
      name: "Н. Е. Ершову",
      category: "История",
      placeType: "history",
      description: "Н. Е. Ершову — объект категории «история» в городе Казань.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 55.792975,
      lng: 49.148591,
      source: "osm",
      sourceId: "node/1142913208"
    },
    {
      name: "П. Н. Нестерову",
      category: "История",
      placeType: "history",
      description: "П. Н. Нестерову — объект категории «история» в городе Казань.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 55.852475,
      lng: 49.087443,
      source: "osm",
      sourceId: "node/1144278950"
    },
    {
      name: "К. Э. Циолковскому",
      category: "История",
      placeType: "history",
      description: "К. Э. Циолковскому — объект категории «история» в городе Казань.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 55.85248,
      lng: 49.086903,
      source: "osm",
      sourceId: "node/1144279051"
    },
    {
      name: "П. В. Дементьеву",
      category: "История",
      placeType: "history",
      description: "П. В. Дементьеву — объект категории «история» в городе Казань.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 55.853914,
      lng: 49.085366,
      source: "osm",
      sourceId: "node/1144279211"
    },
    {
      name: "В. И. Ленину",
      category: "История",
      placeType: "history",
      description: "В. И. Ленину — объект категории «история» в городе Казань.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 55.852558,
      lng: 49.088477,
      source: "osm",
      sourceId: "node/1144279303"
    },
    {
      name: "М. В. Ломоносову",
      category: "История",
      placeType: "history",
      description: "М. В. Ломоносову — объект категории «история» в городе Казань.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 55.852724,
      lng: 49.085895,
      source: "osm",
      sourceId: "node/1144279395"
    },
    {
      name: "В. П. Чкалову",
      category: "История",
      placeType: "history",
      description: "В. П. Чкалову — объект категории «история» в городе Казань.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 55.852699,
      lng: 49.087473,
      source: "osm",
      sourceId: "node/1144279459"
    },
    {
      name: "Д. И. Менделееву",
      category: "История",
      placeType: "history",
      description: "Д. И. Менделееву — объект категории «история» в городе Казань.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 55.852494,
      lng: 49.085859,
      source: "osm",
      sourceId: "node/1144279502"
    },
    {
      name: "Н. Е. Жуковскому",
      category: "История",
      placeType: "history",
      description: "Н. Е. Жуковскому — объект категории «история» в городе Казань.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 55.852718,
      lng: 49.086413,
      source: "osm",
      sourceId: "node/1144279510"
    },
    {
      name: "С. А. Чаплыгину",
      category: "История",
      placeType: "history",
      description: "С. А. Чаплыгину — объект категории «история» в городе Казань.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 55.852708,
      lng: 49.086939,
      source: "osm",
      sourceId: "node/1144279543"
    },
    {
      name: "А. Ф. Можайскому",
      category: "История",
      placeType: "history",
      description: "А. Ф. Можайскому — объект категории «история» в городе Казань.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 55.852483,
      lng: 49.086382,
      source: "osm",
      sourceId: "node/1144279607"
    },
    {
      name: "Л. Н. Гумилёву",
      category: "История",
      placeType: "history",
      description: "Л. Н. Гумилёву — объект категории «история» в городе Казань.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 55.78687,
      lng: 49.122529,
      source: "osm",
      sourceId: "node/1145710203"
    },
    {
      name: "Ф. И. Шаляпину",
      category: "История",
      placeType: "history",
      description: "Ф. И. Шаляпину — объект категории «история» в городе Казань.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 55.78809,
      lng: 49.119743,
      source: "osm",
      sourceId: "node/1145710437"
    },
    {
      name: "М. Вахитову",
      category: "История",
      placeType: "history",
      description: "М. Вахитову — объект категории «история» в городе Казань.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 55.787595,
      lng: 49.125593,
      source: "osm",
      sourceId: "node/1145710770"
    },
    {
      name: "М. Т. Нужин",
      category: "История",
      placeType: "history",
      description: "М. Т. Нужин — объект категории «история» в городе Казань.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 55.791052,
      lng: 49.123123,
      source: "osm",
      sourceId: "node/1148615512"
    },
    {
      name: "А. М. Бутлерову",
      category: "История",
      placeType: "history",
      description: "А. М. Бутлерову — объект категории «история» в городе Казань.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 55.793044,
      lng: 49.124289,
      source: "osm",
      sourceId: "node/1148615601"
    },
    {
      name: "Салих Сайдашев",
      category: "История",
      placeType: "history",
      description: "Салих Сайдашев — объект категории «история» в городе Казань.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 55.784561,
      lng: 49.117461,
      source: "osm",
      sourceId: "node/1149020757"
    },
    {
      name: "Мусе Джалилю",
      category: "История",
      placeType: "history",
      description: "Мусе Джалилю — объект категории «история» в городе Казань.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 55.796116,
      lng: 49.108521,
      source: "osm",
      sourceId: "node/1153018102"
    },
    {
      name: "М. Горький",
      category: "История",
      placeType: "history",
      description: "М. Горький — объект категории «история» в городе Казань.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 55.793178,
      lng: 49.142245,
      source: "osm",
      sourceId: "node/1172762528"
    },
    {
      name: "Д.М. Карбышев",
      category: "История",
      placeType: "history",
      description: "Д.М. Карбышев — объект категории «история» в городе Казань.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 55.755562,
      lng: 49.178818,
      source: "osm",
      sourceId: "node/1172762716"
    },
    {
      name: "А.В. Вишневскому",
      category: "История",
      placeType: "history",
      description: "А.В. Вишневскому — объект категории «история» в городе Казань.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 55.789957,
      lng: 49.13786,
      source: "osm",
      sourceId: "node/1172763282"
    },
    {
      name: "Габдулла Тукай",
      category: "История",
      placeType: "history",
      description: "Габдулла Тукай — объект категории «история» в городе Казань.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 55.785234,
      lng: 49.120045,
      source: "osm",
      sourceId: "node/1185938872"
    },
    {
      name: "Мастер вкуса",
      category: "Еда",
      placeType: "food",
      description: "Мастер вкуса — объект категории «еда» в городе Казань.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 55.826358,
      lng: 49.126102,
      source: "osm",
      sourceId: "node/1197789382"
    },
    {
      name: "Городу-герою Волгограду",
      category: "История",
      placeType: "history",
      description: "Городу-герою Волгограду — объект категории «история» в городе Казань.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 55.831012,
      lng: 49.091189,
      source: "osm",
      sourceId: "node/1204172975"
    },
    {
      name: "Бакинский Дворик",
      category: "Еда",
      placeType: "food",
      description: "Бакинский Дворик — объект категории «еда» в городе Казань.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 55.781423,
      lng: 49.170376,
      source: "osm",
      sourceId: "node/1210352753"
    },
    {
      name: "Дублин",
      category: "Ночная жизнь",
      placeType: "nightlife",
      description: "Дублин — объект категории «ночная жизнь» в городе Казань.",
      emoji: "🍸",
      duration: "2-3 часа",
      price: "1 500–3 000 ₽",
      rating: 4.5,
      interests: [
        "nightlife",
        "food"
      ],
      internalTags: [
        "type:nightlife",
        "interest:nightlife",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "evening",
      address: "",
      lat: 55.7868,
      lng: 49.119396,
      source: "osm",
      sourceId: "node/1219532683"
    },
    {
      name: "Музей-квартира Мусы Джалиля",
      category: "Музей",
      placeType: "museum",
      description: "Музей-квартира Мусы Джалиля — объект категории «музей» в городе Казань.",
      emoji: "🏛️",
      duration: "2-3 часа",
      price: "500 ₽",
      rating: 4.5,
      interests: [
        "museums",
        "art",
        "history"
      ],
      internalTags: [
        "type:museum",
        "interest:museums",
        "interest:art",
        "interest:history",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 55.794341,
      lng: 49.13239,
      source: "osm",
      sourceId: "node/1230992846"
    },
    {
      name: "Национальный музей Республики Татарстан",
      category: "Музей",
      placeType: "museum",
      description: "Национальный музей Республики Татарстан — объект категории «музей» в городе Казань.",
      emoji: "🏛️",
      duration: "2-3 часа",
      price: "500 ₽",
      rating: 4.5,
      interests: [
        "museums",
        "art",
        "history"
      ],
      internalTags: [
        "type:museum",
        "interest:museums",
        "interest:art",
        "interest:history",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 55.795857,
      lng: 49.109673,
      source: "osm",
      sourceId: "node/1348003477"
    },
    {
      name: "Каштан",
      category: "Ночная жизнь",
      placeType: "nightlife",
      description: "Каштан — объект категории «ночная жизнь» в городе Казань.",
      emoji: "🍸",
      duration: "2-3 часа",
      price: "1 500–3 000 ₽",
      rating: 4.5,
      interests: [
        "nightlife",
        "food"
      ],
      internalTags: [
        "type:nightlife",
        "interest:nightlife",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "evening",
      address: "улица Декабристов, 100Б",
      lat: 55.825361,
      lng: 49.086523,
      source: "osm",
      sourceId: "node/1356847165"
    },
    {
      name: "Ашхана",
      category: "Еда",
      placeType: "food",
      description: "Ашхана — объект категории «еда» в городе Казань.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 55.816551,
      lng: 49.090146,
      source: "osm",
      sourceId: "node/1363749829"
    },
    {
      name: "Добрая столовая",
      category: "Еда",
      placeType: "food",
      description: "Добрая столовая — объект категории «еда» в городе Казань.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "улица Адоратского, 12 к1",
      lat: 55.832516,
      lng: 49.148458,
      source: "osm",
      sourceId: "node/1524672653"
    },
    {
      name: "Троя",
      category: "Еда",
      placeType: "food",
      description: "Троя — объект категории «еда» в городе Казань.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 55.829502,
      lng: 49.146883,
      source: "osm",
      sourceId: "node/1524672836"
    },
    {
      name: "Столовая",
      category: "Еда",
      placeType: "food",
      description: "Столовая — объект категории «еда» в городе Казань.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 55.854342,
      lng: 49.198661,
      source: "osm",
      sourceId: "node/1524762344"
    },
    {
      name: "Семерочка",
      category: "Ночная жизнь",
      placeType: "nightlife",
      description: "Семерочка — объект категории «ночная жизнь» в городе Казань.",
      emoji: "🍸",
      duration: "2-3 часа",
      price: "1 500–3 000 ₽",
      rating: 4.5,
      interests: [
        "nightlife",
        "food"
      ],
      internalTags: [
        "type:nightlife",
        "interest:nightlife",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "evening",
      address: "Казань, улица Маршала Чуйкова, 12А",
      lat: 55.835541,
      lng: 49.122208,
      source: "osm",
      sourceId: "node/1526908055"
    },
    {
      name: "Тихая гавань",
      category: "Еда",
      placeType: "food",
      description: "Тихая гавань — объект категории «еда» в городе Казань.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 55.836738,
      lng: 49.13461,
      source: "osm",
      sourceId: "node/1526908084"
    },
    {
      name: "Столовая",
      category: "Еда",
      placeType: "food",
      description: "Столовая — объект категории «еда» в городе Казань.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "Казань, улица Толстого, 8",
      lat: 55.793634,
      lng: 49.13873,
      source: "osm",
      sourceId: "node/1563722344"
    },
    {
      name: "Благотворителю",
      category: "История",
      placeType: "history",
      description: "Благотворителю — объект категории «история» в городе Казань.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 55.798686,
      lng: 49.102433,
      source: "osm",
      sourceId: "node/1577985990"
    },
    {
      name: "SПБ",
      category: "Ночная жизнь",
      placeType: "nightlife",
      description: "SПБ — объект категории «ночная жизнь» в городе Казань.",
      emoji: "🍸",
      duration: "2-3 часа",
      price: "1 500–3 000 ₽",
      rating: 4.5,
      interests: [
        "nightlife",
        "food"
      ],
      internalTags: [
        "type:nightlife",
        "interest:nightlife",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "evening",
      address: "",
      lat: 55.791614,
      lng: 49.112712,
      source: "osm",
      sourceId: "node/1665281699"
    },
    {
      name: "Фиалка",
      category: "Еда",
      placeType: "food",
      description: "Фиалка — объект категории «еда» в городе Казань.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 55.861831,
      lng: 49.086258,
      source: "osm",
      sourceId: "node/1669264415"
    },
    {
      name: "Карл Фукс",
      category: "История",
      placeType: "history",
      description: "Карл Фукс — объект категории «история» в городе Казань.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 55.799752,
      lng: 49.129984,
      source: "osm",
      sourceId: "node/1699973093"
    },
    {
      name: "Бар 24",
      category: "Ночная жизнь",
      placeType: "nightlife",
      description: "Бар 24 — объект категории «ночная жизнь» в городе Казань.",
      emoji: "🍸",
      duration: "2-3 часа",
      price: "1 500–3 000 ₽",
      rating: 4.5,
      interests: [
        "nightlife",
        "food"
      ],
      internalTags: [
        "type:nightlife",
        "interest:nightlife",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "evening",
      address: "",
      lat: 55.766036,
      lng: 49.181796,
      source: "osm",
      sourceId: "node/1715812703"
    },
    {
      name: "В. М. Бехтереву",
      category: "История",
      placeType: "history",
      description: "В. М. Бехтереву — объект категории «история» в городе Казань.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 55.789741,
      lng: 49.142884,
      source: "osm",
      sourceId: "node/1716034665"
    },
    {
      name: "Кабинет",
      category: "Еда",
      placeType: "food",
      description: "Кабинет — объект категории «еда» в городе Казань.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 55.797875,
      lng: 49.124743,
      source: "osm",
      sourceId: "node/1741088355"
    },
    {
      name: "Лакомка",
      category: "Еда",
      placeType: "food",
      description: "Лакомка — объект категории «еда» в городе Казань.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 55.795596,
      lng: 49.130219,
      source: "osm",
      sourceId: "node/1748846970"
    },
    {
      name: "Стела в честь Универсиады 2013",
      category: "История",
      placeType: "history",
      description: "Стела в честь Универсиады 2013 — объект категории «история» в городе Казань.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 55.787078,
      lng: 49.164154,
      source: "osm",
      sourceId: "node/1755959925"
    },
    {
      name: "Марусовка",
      category: "Еда",
      placeType: "food",
      description: "Марусовка — объект категории «еда» в городе Казань.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 55.792103,
      lng: 49.13279,
      source: "osm",
      sourceId: "node/1757056050"
    },
    {
      name: "Turkish grill",
      category: "Еда",
      placeType: "food",
      description: "Turkish grill — объект категории «еда» в городе Казань.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 55.795592,
      lng: 49.135313,
      source: "osm",
      sourceId: "node/1770434372"
    },
    {
      name: "Белый Аист (Куйлюк)",
      category: "Еда",
      placeType: "food",
      description: "Белый Аист (Куйлюк) — объект категории «еда» в городе Казань.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 55.783205,
      lng: 49.16424,
      source: "osm",
      sourceId: "node/1786371055"
    },
    {
      name: "Шаурма & гриль",
      category: "Еда",
      placeType: "food",
      description: "Шаурма & гриль — объект категории «еда» в городе Казань.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "Волгоградская улица, 37А",
      lat: 55.830982,
      lng: 49.09609,
      source: "osm",
      sourceId: "node/1805428302"
    },
    {
      name: "Харчевня трёх пескарей",
      category: "Еда",
      placeType: "food",
      description: "Харчевня трёх пескарей — объект категории «еда» в городе Казань.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 55.763533,
      lng: 49.232287,
      source: "osm",
      sourceId: "node/1805738500"
    },
    {
      name: "Дворец развлечений",
      category: "Достопримечательность",
      placeType: "other",
      description: "Дворец развлечений — объект категории «достопримечательность» в городе Казань.",
      emoji: "📍",
      duration: "1.5 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history"
      ],
      internalTags: [
        "type:other",
        "interest:history",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "Казань, улица Баумана, 31",
      lat: 55.78984,
      lng: 49.117026,
      source: "osm",
      sourceId: "node/1839788818"
    },
    {
      name: "Дом-Музей Василия Аксёнова",
      category: "Музей",
      placeType: "museum",
      description: "Дом-Музей Василия Аксёнова — объект категории «музей» в городе Казань.",
      emoji: "🏛️",
      duration: "2-3 часа",
      price: "500 ₽",
      rating: 4.5,
      interests: [
        "museums",
        "art",
        "history"
      ],
      internalTags: [
        "type:museum",
        "interest:museums",
        "interest:art",
        "interest:history",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 55.795412,
      lng: 49.135095,
      source: "osm",
      sourceId: "node/1841672230"
    },
    {
      name: "Ностальгия",
      category: "Еда",
      placeType: "food",
      description: "Ностальгия — объект категории «еда» в городе Казань.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "Казань, улица Лобачевского, 6",
      lat: 55.793537,
      lng: 49.121566,
      source: "osm",
      sourceId: "node/1843290516"
    },
    {
      name: "Добрая столовая",
      category: "Еда",
      placeType: "food",
      description: "Добрая столовая — объект категории «еда» в городе Казань.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 55.826333,
      lng: 49.113769,
      source: "osm",
      sourceId: "node/1897920023"
    },
    {
      name: "Золотой Микрофон",
      category: "Еда",
      placeType: "food",
      description: "Золотой Микрофон — объект категории «еда» в городе Казань.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 55.799255,
      lng: 49.178113,
      source: "osm",
      sourceId: "node/1903622311"
    },
    {
      name: "Пицца хаус",
      category: "Еда",
      placeType: "food",
      description: "Пицца хаус — объект категории «еда» в городе Казань.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 55.824967,
      lng: 49.095753,
      source: "osm",
      sourceId: "node/1905429930"
    },
    {
      name: "El Viento",
      category: "Еда",
      placeType: "food",
      description: "El Viento — объект категории «еда» в городе Казань.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 55.800469,
      lng: 48.976782,
      source: "osm",
      sourceId: "node/1919698440"
    },
    {
      name: "Старый Амбар",
      category: "Еда",
      placeType: "food",
      description: "Старый Амбар — объект категории «еда» в городе Казань.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 55.786979,
      lng: 49.170193,
      source: "osm",
      sourceId: "node/1924771224"
    },
    {
      name: "Chafalls",
      category: "Еда",
      placeType: "food",
      description: "Chafalls — объект категории «еда» в городе Казань.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 55.789007,
      lng: 49.123691,
      source: "osm",
      sourceId: "node/1924771225"
    },
    {
      name: "Старый Амбар",
      category: "Еда",
      placeType: "food",
      description: "Старый Амбар — объект категории «еда» в городе Казань.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "проспект Ямашева, 69В",
      lat: 55.825045,
      lng: 49.134592,
      source: "osm",
      sourceId: "node/1924771228"
    },
    {
      name: "Старый амбар",
      category: "Еда",
      placeType: "food",
      description: "Старый амбар — объект категории «еда» в городе Казань.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "проспект Ямашева, 17",
      lat: 55.826699,
      lng: 49.100212,
      source: "osm",
      sourceId: "node/1924771229"
    },
    {
      name: "Добропек",
      category: "Еда",
      placeType: "food",
      description: "Добропек — объект категории «еда» в городе Казань.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "улица Абжалилова, 1",
      lat: 55.786741,
      lng: 49.160478,
      source: "osm",
      sourceId: "node/1924831723"
    },
    {
      name: "Визит",
      category: "Еда",
      placeType: "food",
      description: "Визит — объект категории «еда» в городе Казань.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 55.816497,
      lng: 49.181813,
      source: "osm",
      sourceId: "node/1928633022"
    }
  ],
  "сочи": [
    {
      name: "Пингвин",
      category: "Еда",
      placeType: "food",
      description: "Пингвин — объект категории «еда» в городе Сочи.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 43.908224,
      lng: 39.332231,
      source: "osm",
      sourceId: "node/290725591"
    },
    {
      name: "Кавказская кухня \"Хаш\"",
      category: "Еда",
      placeType: "food",
      description: "Кавказская кухня \"Хаш\" — объект категории «еда» в городе Сочи.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 44.005065,
      lng: 39.192365,
      source: "osm",
      sourceId: "node/290728060"
    },
    {
      name: "Памятник героям Великой Отечественной войны",
      category: "История",
      placeType: "history",
      description: "Памятник героям Великой Отечественной войны — объект категории «история» в городе Сочи.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 44.012623,
      lng: 39.179443,
      source: "osm",
      sourceId: "node/636111764"
    },
    {
      name: "А. С. Пушкину",
      category: "История",
      placeType: "history",
      description: "А. С. Пушкину — объект категории «история» в городе Сочи.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 44.008599,
      lng: 39.183735,
      source: "osm",
      sourceId: "node/640198615"
    },
    {
      name: "В. В. Маяковскому",
      category: "История",
      placeType: "history",
      description: "В. В. Маяковскому — объект категории «история» в городе Сочи.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 44.008542,
      lng: 39.183825,
      source: "osm",
      sourceId: "node/640198624"
    },
    {
      name: "Променад",
      category: "Еда",
      placeType: "food",
      description: "Променад — объект категории «еда» в городе Сочи.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 43.58594,
      lng: 39.719214,
      source: "osm",
      sourceId: "node/647222017"
    },
    {
      name: "Старый Базар",
      category: "Еда",
      placeType: "food",
      description: "Старый Базар — объект категории «еда» в городе Сочи.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "Несебрская улица, 4",
      lat: 43.583388,
      lng: 39.718044,
      source: "osm",
      sourceId: "node/647222251"
    },
    {
      name: "Вкусно — и точка",
      category: "Еда",
      placeType: "food",
      description: "Вкусно — и точка — объект категории «еда» в городе Сочи.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 43.582458,
      lng: 39.720641,
      source: "osm",
      sourceId: "node/647223645"
    },
    {
      name: "Coffee",
      category: "Еда",
      placeType: "food",
      description: "Coffee — объект категории «еда» в городе Сочи.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 43.549283,
      lng: 39.78249,
      source: "osm",
      sourceId: "node/649449501"
    },
    {
      name: "Банкир",
      category: "Еда",
      placeType: "food",
      description: "Банкир — объект категории «еда» в городе Сочи.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 43.587243,
      lng: 39.71951,
      source: "osm",
      sourceId: "node/654194647"
    },
    {
      name: "Оливье",
      category: "Еда",
      placeType: "food",
      description: "Оливье — объект категории «еда» в городе Сочи.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 43.592247,
      lng: 39.72286,
      source: "osm",
      sourceId: "node/654208082"
    },
    {
      name: "Столовая на Роз",
      category: "Еда",
      placeType: "food",
      description: "Столовая на Роз — объект категории «еда» в городе Сочи.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 43.593192,
      lng: 39.727429,
      source: "osm",
      sourceId: "node/654226616"
    },
    {
      name: "А. Н. Островскому",
      category: "История",
      placeType: "history",
      description: "А. Н. Островскому — объект категории «история» в городе Сочи.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 43.579657,
      lng: 39.724234,
      source: "osm",
      sourceId: "node/656072385"
    },
    {
      name: "В. И. Ленину",
      category: "История",
      placeType: "history",
      description: "В. И. Ленину — объект категории «история» в городе Сочи.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 43.577315,
      lng: 39.72704,
      source: "osm",
      sourceId: "node/656378961"
    },
    {
      name: "Пушка",
      category: "История",
      placeType: "history",
      description: "Пушка — объект категории «история» в городе Сочи.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 43.575562,
      lng: 39.72459,
      source: "osm",
      sourceId: "node/659727682"
    },
    {
      name: "Яръ",
      category: "Ночная жизнь",
      placeType: "nightlife",
      description: "Яръ — объект категории «ночная жизнь» в городе Сочи.",
      emoji: "🍸",
      duration: "2-3 часа",
      price: "1 500–3 000 ₽",
      rating: 4.5,
      interests: [
        "nightlife",
        "food"
      ],
      internalTags: [
        "type:nightlife",
        "interest:nightlife",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "evening",
      address: "",
      lat: 43.593402,
      lng: 39.733178,
      source: "osm",
      sourceId: "node/662816185"
    },
    {
      name: "Панорама",
      category: "Ночная жизнь",
      placeType: "nightlife",
      description: "Панорама — объект категории «ночная жизнь» в городе Сочи.",
      emoji: "🍸",
      duration: "2-3 часа",
      price: "1 500–3 000 ₽",
      rating: 4.5,
      interests: [
        "nightlife",
        "food"
      ],
      internalTags: [
        "type:nightlife",
        "interest:nightlife",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "evening",
      address: "",
      lat: 43.608694,
      lng: 39.707233,
      source: "osm",
      sourceId: "node/668087434"
    },
    {
      name: "Маяк",
      category: "Еда",
      placeType: "food",
      description: "Маяк — объект категории «еда» в городе Сочи.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 43.609003,
      lng: 39.707147,
      source: "osm",
      sourceId: "node/668087451"
    },
    {
      name: "Хабиби",
      category: "Еда",
      placeType: "food",
      description: "Хабиби — объект категории «еда» в городе Сочи.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 43.557383,
      lng: 39.79409,
      source: "osm",
      sourceId: "node/673351446"
    },
    {
      name: "Василий Михайлович Куканов",
      category: "История",
      placeType: "history",
      description: "Василий Михайлович Куканов — объект категории «история» в городе Сочи.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 43.511818,
      lng: 39.86828,
      source: "osm",
      sourceId: "node/676008992"
    },
    {
      name: "Архангел Михаил",
      category: "История",
      placeType: "history",
      description: "Архангел Михаил — объект категории «история» в городе Сочи.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 43.582217,
      lng: 39.722437,
      source: "osm",
      sourceId: "node/724303210"
    },
    {
      name: "Памятник М. Горькому",
      category: "История",
      placeType: "history",
      description: "Памятник М. Горькому — объект категории «история» в городе Сочи.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 43.589149,
      lng: 39.726501,
      source: "osm",
      sourceId: "node/724401911"
    },
    {
      name: "Восток",
      category: "Еда",
      placeType: "food",
      description: "Восток — объект категории «еда» в городе Сочи.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 43.62723,
      lng: 39.718298,
      source: "osm",
      sourceId: "node/733542611"
    },
    {
      name: "Магнат",
      category: "Ночная жизнь",
      placeType: "nightlife",
      description: "Магнат — объект категории «ночная жизнь» в городе Сочи.",
      emoji: "🍸",
      duration: "2-3 часа",
      price: "1 500–3 000 ₽",
      rating: 4.5,
      interests: [
        "nightlife",
        "food"
      ],
      internalTags: [
        "type:nightlife",
        "interest:nightlife",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "evening",
      address: "",
      lat: 43.627124,
      lng: 39.717834,
      source: "osm",
      sourceId: "node/733543346"
    },
    {
      name: "Федина дача",
      category: "Еда",
      placeType: "food",
      description: "Федина дача — объект категории «еда» в городе Сочи.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 43.567885,
      lng: 39.735324,
      source: "osm",
      sourceId: "node/736671630"
    },
    {
      name: "Фитнес-центр \"Валентин\"",
      category: "Активности",
      placeType: "sport",
      description: "Фитнес-центр \"Валентин\" — объект категории «активности» в городе Сочи.",
      emoji: "🏃",
      duration: "2 часа",
      price: "800 ₽",
      rating: 4.5,
      interests: [
        "sport",
        "wellness"
      ],
      internalTags: [
        "type:sport",
        "interest:sport",
        "interest:wellness",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 43.573248,
      lng: 39.734938,
      source: "osm",
      sourceId: "node/736694946"
    },
    {
      name: "Белые ночи",
      category: "Еда",
      placeType: "food",
      description: "Белые ночи — объект категории «еда» в городе Сочи.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 43.576863,
      lng: 39.726094,
      source: "osm",
      sourceId: "node/736705291"
    },
    {
      name: "Чёрный жемчуг",
      category: "Еда",
      placeType: "food",
      description: "Чёрный жемчуг — объект категории «еда» в городе Сочи.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 43.575783,
      lng: 39.723726,
      source: "osm",
      sourceId: "node/736707864"
    },
    {
      name: "Калифорния",
      category: "Еда",
      placeType: "food",
      description: "Калифорния — объект категории «еда» в городе Сочи.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 43.575702,
      lng: 39.723905,
      source: "osm",
      sourceId: "node/736707868"
    },
    {
      name: "Бабаева",
      category: "Еда",
      placeType: "food",
      description: "Бабаева — объект категории «еда» в городе Сочи.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 43.575522,
      lng: 39.723998,
      source: "osm",
      sourceId: "node/736718802"
    },
    {
      name: "Восточный квартал",
      category: "Еда",
      placeType: "food",
      description: "Восточный квартал — объект категории «еда» в городе Сочи.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 43.571328,
      lng: 39.728879,
      source: "osm",
      sourceId: "node/736770730"
    },
    {
      name: "Шаурма у Артура",
      category: "Еда",
      placeType: "food",
      description: "Шаурма у Артура — объект категории «еда» в городе Сочи.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 43.585952,
      lng: 39.721118,
      source: "osm",
      sourceId: "node/737839224"
    },
    {
      name: "Эдем",
      category: "Еда",
      placeType: "food",
      description: "Эдем — объект категории «еда» в городе Сочи.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "Зелёный переулок, 13",
      lat: 43.588129,
      lng: 39.722013,
      source: "osm",
      sourceId: "node/737839263"
    },
    {
      name: "Музей истории Сочи",
      category: "Музей",
      placeType: "museum",
      description: "Музей истории Сочи — объект категории «музей» в городе Сочи.",
      emoji: "🏛️",
      duration: "2-3 часа",
      price: "500 ₽",
      rating: 4.5,
      interests: [
        "museums",
        "art",
        "history"
      ],
      internalTags: [
        "type:museum",
        "interest:museums",
        "interest:art",
        "interest:history",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 43.590293,
      lng: 39.72345,
      source: "osm",
      sourceId: "node/738220461"
    },
    {
      name: "Seafood market",
      category: "Еда",
      placeType: "food",
      description: "Seafood market — объект категории «еда» в городе Сочи.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 43.58046,
      lng: 39.719329,
      source: "osm",
      sourceId: "node/738603651"
    },
    {
      name: "Катюша",
      category: "Еда",
      placeType: "food",
      description: "Катюша — объект категории «еда» в городе Сочи.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 43.557836,
      lng: 39.765489,
      source: "osm",
      sourceId: "node/738800311"
    },
    {
      name: "У Карлоса",
      category: "Ночная жизнь",
      placeType: "nightlife",
      description: "У Карлоса — объект категории «ночная жизнь» в городе Сочи.",
      emoji: "🍸",
      duration: "2-3 часа",
      price: "1 500–3 000 ₽",
      rating: 4.5,
      interests: [
        "nightlife",
        "food"
      ],
      internalTags: [
        "type:nightlife",
        "interest:nightlife",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "evening",
      address: "",
      lat: 43.594374,
      lng: 39.720585,
      source: "osm",
      sourceId: "node/740620321"
    },
    {
      name: "Шанталь",
      category: "Еда",
      placeType: "food",
      description: "Шанталь — объект категории «еда» в городе Сочи.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 43.565265,
      lng: 39.76015,
      source: "osm",
      sourceId: "node/746744860"
    },
    {
      name: "Стела «Сочи — город-орденоносец»",
      category: "История",
      placeType: "history",
      description: "Стела «Сочи — город-орденоносец» — объект категории «история» в городе Сочи.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 43.585353,
      lng: 39.718717,
      source: "osm",
      sourceId: "node/758634663"
    },
    {
      name: "Nippon House",
      category: "Еда",
      placeType: "food",
      description: "Nippon House — объект категории «еда» в городе Сочи.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 43.589573,
      lng: 39.722576,
      source: "osm",
      sourceId: "node/758648893"
    },
    {
      name: "Неро",
      category: "Еда",
      placeType: "food",
      description: "Неро — объект категории «еда» в городе Сочи.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 43.587661,
      lng: 39.722845,
      source: "osm",
      sourceId: "node/758651411"
    },
    {
      name: "Бытха",
      category: "Природа",
      placeType: "nature",
      description: "Бытха — объект категории «природа» в городе Сочи.",
      emoji: "🌄",
      duration: "2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "nature"
      ],
      internalTags: [
        "type:nature",
        "interest:nature",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 43.560282,
      lng: 39.781057,
      source: "osm",
      sourceId: "node/760612030"
    },
    {
      name: "Здравствуй",
      category: "Ночная жизнь",
      placeType: "nightlife",
      description: "Здравствуй — объект категории «ночная жизнь» в городе Сочи.",
      emoji: "🍸",
      duration: "2-3 часа",
      price: "1 500–3 000 ₽",
      rating: 4.5,
      interests: [
        "nightlife",
        "food"
      ],
      internalTags: [
        "type:nightlife",
        "interest:nightlife",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "evening",
      address: "",
      lat: 43.626268,
      lng: 39.718568,
      source: "osm",
      sourceId: "node/761039010"
    },
    {
      name: "Прохлада",
      category: "Еда",
      placeType: "food",
      description: "Прохлада — объект категории «еда» в городе Сочи.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 43.896147,
      lng: 39.347332,
      source: "osm",
      sourceId: "node/789794762"
    },
    {
      name: "Небеса",
      category: "Еда",
      placeType: "food",
      description: "Небеса — объект категории «еда» в городе Сочи.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 43.896694,
      lng: 39.34879,
      source: "osm",
      sourceId: "node/789797890"
    },
    {
      name: "Натали",
      category: "Еда",
      placeType: "food",
      description: "Натали — объект категории «еда» в городе Сочи.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "Речная улица, 3/2",
      lat: 43.904348,
      lng: 39.335284,
      source: "osm",
      sourceId: "node/789836433"
    },
    {
      name: "Пушкин А.С.",
      category: "История",
      placeType: "history",
      description: "Пушкин А.С. — объект категории «история» в городе Сочи.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 43.575003,
      lng: 39.726038,
      source: "osm",
      sourceId: "node/797335357"
    },
    {
      name: "Н. А. Островскому",
      category: "История",
      placeType: "history",
      description: "Н. А. Островскому — объект категории «история» в городе Сочи.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 43.574451,
      lng: 39.732547,
      source: "osm",
      sourceId: "node/797340511"
    },
    {
      name: "Аурум",
      category: "Еда",
      placeType: "food",
      description: "Аурум — объект категории «еда» в городе Сочи.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 43.5763,
      lng: 39.723794,
      source: "osm",
      sourceId: "node/799104911"
    },
    {
      name: "Cinema",
      category: "Еда",
      placeType: "food",
      description: "Cinema — объект категории «еда» в городе Сочи.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 43.575758,
      lng: 39.725387,
      source: "osm",
      sourceId: "node/799321767"
    },
    {
      name: "Бали",
      category: "Еда",
      placeType: "food",
      description: "Бали — объект категории «еда» в городе Сочи.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 43.548511,
      lng: 39.792178,
      source: "osm",
      sourceId: "node/800142186"
    },
    {
      name: "Аквариум",
      category: "Достопримечательность",
      placeType: "other",
      description: "Аквариум — объект категории «достопримечательность» в городе Сочи.",
      emoji: "📍",
      duration: "1.5 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history"
      ],
      internalTags: [
        "type:other",
        "interest:history",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 43.548298,
      lng: 39.79342,
      source: "osm",
      sourceId: "node/800144833"
    },
    {
      name: "Индус",
      category: "Еда",
      placeType: "food",
      description: "Индус — объект категории «еда» в городе Сочи.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 43.572763,
      lng: 39.735254,
      source: "osm",
      sourceId: "node/800906097"
    },
    {
      name: "Палуба Ресторан",
      category: "Еда",
      placeType: "food",
      description: "Палуба Ресторан — объект категории «еда» в городе Сочи.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 43.548037,
      lng: 39.777163,
      source: "osm",
      sourceId: "node/813760643"
    },
    {
      name: "Mocco",
      category: "Еда",
      placeType: "food",
      description: "Mocco — объект категории «еда» в городе Сочи.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 43.578405,
      lng: 39.728797,
      source: "osm",
      sourceId: "node/814663100"
    },
    {
      name: "Фидан",
      category: "Еда",
      placeType: "food",
      description: "Фидан — объект категории «еда» в городе Сочи.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 43.577409,
      lng: 39.730954,
      source: "osm",
      sourceId: "node/814664843"
    },
    {
      name: "Дядя Саша",
      category: "Еда",
      placeType: "food",
      description: "Дядя Саша — объект категории «еда» в городе Сочи.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "Сочи, Ялтинская улица",
      lat: 43.512306,
      lng: 39.870583,
      source: "osm",
      sourceId: "node/837532388"
    },
    {
      name: "Вареники",
      category: "Еда",
      placeType: "food",
      description: "Вареники — объект категории «еда» в городе Сочи.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 43.509166,
      lng: 39.871901,
      source: "osm",
      sourceId: "node/837532706"
    },
    {
      name: "Панорама",
      category: "Ночная жизнь",
      placeType: "nightlife",
      description: "Панорама — объект категории «ночная жизнь» в городе Сочи.",
      emoji: "🍸",
      duration: "2-3 часа",
      price: "1 500–3 000 ₽",
      rating: 4.5,
      interests: [
        "nightlife",
        "food"
      ],
      internalTags: [
        "type:nightlife",
        "interest:nightlife",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "evening",
      address: "",
      lat: 43.910365,
      lng: 39.323177,
      source: "osm",
      sourceId: "node/847071251"
    },
    {
      name: "Самсун",
      category: "Еда",
      placeType: "food",
      description: "Самсун — объект категории «еда» в городе Сочи.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 43.426733,
      lng: 39.916539,
      source: "osm",
      sourceId: "node/877654580"
    },
    {
      name: "Буревестник",
      category: "Ночная жизнь",
      placeType: "nightlife",
      description: "Буревестник — объект категории «ночная жизнь» в городе Сочи.",
      emoji: "🍸",
      duration: "2-3 часа",
      price: "1 500–3 000 ₽",
      rating: 4.5,
      interests: [
        "nightlife",
        "food"
      ],
      internalTags: [
        "type:nightlife",
        "interest:nightlife",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "evening",
      address: "",
      lat: 44.007044,
      lng: 39.179944,
      source: "osm",
      sourceId: "node/885281049"
    },
    {
      name: "Диско",
      category: "Еда",
      placeType: "food",
      description: "Диско — объект категории «еда» в городе Сочи.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 43.428533,
      lng: 39.912766,
      source: "osm",
      sourceId: "node/885508371"
    },
    {
      name: "Садко",
      category: "Ночная жизнь",
      placeType: "nightlife",
      description: "Садко — объект категории «ночная жизнь» в городе Сочи.",
      emoji: "🍸",
      duration: "2-3 часа",
      price: "1 500–3 000 ₽",
      rating: 4.5,
      interests: [
        "nightlife",
        "food"
      ],
      internalTags: [
        "type:nightlife",
        "interest:nightlife",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "evening",
      address: "",
      lat: 43.430887,
      lng: 39.911416,
      source: "osm",
      sourceId: "node/885509081"
    },
    {
      name: "Прайд",
      category: "Еда",
      placeType: "food",
      description: "Прайд — объект категории «еда» в городе Сочи.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 43.614027,
      lng: 39.739208,
      source: "osm",
      sourceId: "node/886130589"
    },
    {
      name: "Япона Мама",
      category: "Еда",
      placeType: "food",
      description: "Япона Мама — объект категории «еда» в городе Сочи.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 43.574821,
      lng: 39.728738,
      source: "osm",
      sourceId: "node/913880296"
    },
    {
      name: "Форма",
      category: "Активности",
      placeType: "sport",
      description: "Форма — объект категории «активности» в городе Сочи.",
      emoji: "🏃",
      duration: "2 часа",
      price: "800 ₽",
      rating: 4.5,
      interests: [
        "sport",
        "wellness"
      ],
      internalTags: [
        "type:sport",
        "interest:sport",
        "interest:wellness",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 43.606173,
      lng: 39.737723,
      source: "osm",
      sourceId: "node/913912339"
    },
    {
      name: "Del Mar",
      category: "Еда",
      placeType: "food",
      description: "Del Mar — объект категории «еда» в городе Сочи.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 43.574763,
      lng: 39.725072,
      source: "osm",
      sourceId: "node/925347373"
    },
    {
      name: "Сказка Востока",
      category: "Еда",
      placeType: "food",
      description: "Сказка Востока — объект категории «еда» в городе Сочи.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 43.575009,
      lng: 39.724919,
      source: "osm",
      sourceId: "node/925351206"
    },
    {
      name: "Black Sea Burger",
      category: "Еда",
      placeType: "food",
      description: "Black Sea Burger — объект категории «еда» в городе Сочи.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 43.568228,
      lng: 39.733062,
      source: "osm",
      sourceId: "node/925504171"
    },
    {
      name: "Пивной Арсенал",
      category: "Ночная жизнь",
      placeType: "nightlife",
      description: "Пивной Арсенал — объект категории «ночная жизнь» в городе Сочи.",
      emoji: "🍸",
      duration: "2-3 часа",
      price: "1 500–3 000 ₽",
      rating: 4.5,
      interests: [
        "nightlife",
        "food"
      ],
      internalTags: [
        "type:nightlife",
        "interest:nightlife",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "evening",
      address: "",
      lat: 43.61593,
      lng: 39.743118,
      source: "osm",
      sourceId: "node/929924941"
    },
    {
      name: "Lariot",
      category: "Еда",
      placeType: "food",
      description: "Lariot — объект категории «еда» в городе Сочи.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 43.431168,
      lng: 39.917153,
      source: "osm",
      sourceId: "node/934845677"
    },
    {
      name: "Nippon House",
      category: "Еда",
      placeType: "food",
      description: "Nippon House — объект категории «еда» в городе Сочи.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 43.42311,
      lng: 39.923908,
      source: "osm",
      sourceId: "node/934856427"
    },
    {
      name: "London",
      category: "Еда",
      placeType: "food",
      description: "London — объект категории «еда» в городе Сочи.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 43.582068,
      lng: 39.71895,
      source: "osm",
      sourceId: "node/934962588"
    },
    {
      name: "ДереWня",
      category: "Еда",
      placeType: "food",
      description: "ДереWня — объект категории «еда» в городе Сочи.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 43.566568,
      lng: 39.738689,
      source: "osm",
      sourceId: "node/958223876"
    },
    {
      name: "Русалка",
      category: "Еда",
      placeType: "food",
      description: "Русалка — объект категории «еда» в городе Сочи.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 43.552965,
      lng: 39.775464,
      source: "osm",
      sourceId: "node/959123755"
    },
    {
      name: "Дом 1934 г",
      category: "Еда",
      placeType: "food",
      description: "Дом 1934 г — объект категории «еда» в городе Сочи.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "Морской переулок, 3",
      lat: 43.576372,
      lng: 39.72542,
      source: "osm",
      sourceId: "node/960199171"
    },
    {
      name: "Дольмен",
      category: "История",
      placeType: "history",
      description: "Дольмен — объект категории «история» в городе Сочи.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 43.87516,
      lng: 39.412544,
      source: "osm",
      sourceId: "node/960403899"
    },
    {
      name: "Дольмен",
      category: "История",
      placeType: "history",
      description: "Дольмен — объект категории «история» в городе Сочи.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 43.870448,
      lng: 39.408802,
      source: "osm",
      sourceId: "node/960403904"
    },
    {
      name: "Мандаринка",
      category: "Еда",
      placeType: "food",
      description: "Мандаринка — объект категории «еда» в городе Сочи.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 43.597165,
      lng: 39.717051,
      source: "osm",
      sourceId: "node/974455816"
    },
    {
      name: "Алаверды",
      category: "Еда",
      placeType: "food",
      description: "Алаверды — объект категории «еда» в городе Сочи.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 43.596738,
      lng: 39.72193,
      source: "osm",
      sourceId: "node/974490081"
    }
  ],
  "калининград": [
    {
      name: "Иммануил Кант",
      category: "История",
      placeType: "history",
      description: "Иммануил Кант — объект категории «история» в городе Калининград.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 54.706492,
      lng: 20.512887,
      source: "osm",
      sourceId: "node/471928293"
    },
    {
      name: "М. И. Калинину",
      category: "История",
      placeType: "history",
      description: "М. И. Калинину — объект категории «история» в городе Калининград.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 54.695597,
      lng: 20.499212,
      source: "osm",
      sourceId: "node/471928335"
    },
    {
      name: "Лётчикам Балтики",
      category: "История",
      placeType: "history",
      description: "Лётчикам Балтики — объект категории «история» в городе Калининград.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 54.731036,
      lng: 20.490363,
      source: "osm",
      sourceId: "node/536782605"
    },
    {
      name: "Люнет Беттхерсхофен",
      category: "История",
      placeType: "history",
      description: "Люнет Беттхерсхофен — объект категории «история» в городе Калининград.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 54.728451,
      lng: 20.51466,
      source: "osm",
      sourceId: "node/537519417"
    },
    {
      name: "Дон Ченто",
      category: "Еда",
      placeType: "food",
      description: "Дон Ченто — объект категории «еда» в городе Калининград.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 54.694468,
      lng: 20.50217,
      source: "osm",
      sourceId: "node/579958934"
    },
    {
      name: "Памятник Комсомольцам",
      category: "История",
      placeType: "history",
      description: "Памятник Комсомольцам — объект категории «история» в городе Калининград.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 54.693451,
      lng: 20.509885,
      source: "osm",
      sourceId: "node/597387153"
    },
    {
      name: "Герцог Альбрехт",
      category: "История",
      placeType: "history",
      description: "Герцог Альбрехт — объект категории «история» в городе Калининград.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 54.706618,
      lng: 20.513058,
      source: "osm",
      sourceId: "node/601369708"
    },
    {
      name: "След от снаряда на ферме моста",
      category: "Достопримечательность",
      placeType: "architecture",
      description: "След от снаряда на ферме моста — объект категории «достопримечательность» в городе Калининград.",
      emoji: "📍",
      duration: "1-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "architecture",
        "history"
      ],
      internalTags: [
        "type:architecture",
        "interest:architecture",
        "interest:history",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 54.706364,
      lng: 20.489163,
      source: "osm",
      sourceId: "node/601372005"
    },
    {
      name: "Родина-Мать",
      category: "История",
      placeType: "history",
      description: "Родина-Мать — объект категории «история» в городе Калининград.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 54.717229,
      lng: 20.50162,
      source: "osm",
      sourceId: "node/601373825"
    },
    {
      name: "Памятник Петру I",
      category: "История",
      placeType: "history",
      description: "Памятник Петру I — объект категории «история» в городе Калининград.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 54.720324,
      lng: 20.495037,
      source: "osm",
      sourceId: "node/601374808"
    },
    {
      name: "Памятный знак в виде верстового столба к 750-летию города от Санкт-Петербурга",
      category: "Достопримечательность",
      placeType: "architecture",
      description: "Памятный знак в виде верстового столба к 750-летию города от Санкт-Петербурга — объект категории «достопримечательность» в городе Калининград.",
      emoji: "📍",
      duration: "1-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "architecture",
        "history"
      ],
      internalTags: [
        "type:architecture",
        "interest:architecture",
        "interest:history",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 54.718523,
      lng: 20.493949,
      source: "osm",
      sourceId: "node/601374994"
    },
    {
      name: "Британника",
      category: "Ночная жизнь",
      placeType: "nightlife",
      description: "Британника — объект категории «ночная жизнь» в городе Калининград.",
      emoji: "🍸",
      duration: "2-3 часа",
      price: "1 500–3 000 ₽",
      rating: 4.5,
      interests: [
        "nightlife",
        "food"
      ],
      internalTags: [
        "type:nightlife",
        "interest:nightlife",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "evening",
      address: "",
      lat: 54.72171,
      lng: 20.508273,
      source: "osm",
      sourceId: "node/610480031"
    },
    {
      name: "Калининград",
      category: "История",
      placeType: "history",
      description: "Калининград — объект категории «история» в городе Калининград.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 54.754168,
      lng: 20.448391,
      source: "osm",
      sourceId: "node/618296917"
    },
    {
      name: "Villa Ченто",
      category: "Еда",
      placeType: "food",
      description: "Villa Ченто — объект категории «еда» в городе Калининград.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 54.704763,
      lng: 20.517303,
      source: "osm",
      sourceId: "node/618809905"
    },
    {
      name: "Танк Т-34",
      category: "История",
      placeType: "history",
      description: "Танк Т-34 — объект категории «история» в городе Калининград.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 54.716515,
      lng: 20.509384,
      source: "osm",
      sourceId: "node/619345474"
    },
    {
      name: "Иммануил Кант",
      category: "История",
      placeType: "history",
      description: "Иммануил Кант — объект категории «история» в городе Калининград.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 54.713872,
      lng: 20.510546,
      source: "osm",
      sourceId: "node/619356419"
    },
    {
      name: "Дон Ченто",
      category: "Еда",
      placeType: "food",
      description: "Дон Ченто — объект категории «еда» в городе Калининград.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 54.743208,
      lng: 20.504058,
      source: "osm",
      sourceId: "node/655308263"
    },
    {
      name: "Самолёт ИЛ-28",
      category: "История",
      placeType: "history",
      description: "Самолёт ИЛ-28 — объект категории «история» в городе Калининград.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 54.768426,
      lng: 20.447787,
      source: "osm",
      sourceId: "node/665303013"
    },
    {
      name: "Памятный знак советско-польской дружбы",
      category: "История",
      placeType: "history",
      description: "Памятный знак советско-польской дружбы — объект категории «история» в городе Калининград.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 54.695787,
      lng: 20.509688,
      source: "osm",
      sourceId: "node/676785933"
    },
    {
      name: "Мельница",
      category: "Еда",
      placeType: "food",
      description: "Мельница — объект категории «еда» в городе Калининград.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 54.713294,
      lng: 20.536531,
      source: "osm",
      sourceId: "node/691739604"
    },
    {
      name: "Могила Фридриха Бесселя",
      category: "История",
      placeType: "history",
      description: "Могила Фридриха Бесселя — объект категории «история» в городе Калининград.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 54.71312,
      lng: 20.494411,
      source: "osm",
      sourceId: "node/700933296"
    },
    {
      name: "Могила С.С. Гурьева",
      category: "История",
      placeType: "history",
      description: "Могила С.С. Гурьева — объект категории «история» в городе Калининград.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 54.711029,
      lng: 20.489993,
      source: "osm",
      sourceId: "node/700951830"
    },
    {
      name: "Могила С.И.Полецкого",
      category: "История",
      placeType: "history",
      description: "Могила С.И.Полецкого — объект категории «история» в городе Калининград.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 54.711336,
      lng: 20.489999,
      source: "osm",
      sourceId: "node/700951863"
    },
    {
      name: "Астер",
      category: "Еда",
      placeType: "food",
      description: "Астер — объект категории «еда» в городе Калининград.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 54.722288,
      lng: 20.526775,
      source: "osm",
      sourceId: "node/736487929"
    },
    {
      name: "Памятник Николаю Чудотворцу",
      category: "История",
      placeType: "history",
      description: "Памятник Николаю Чудотворцу — объект категории «история» в городе Калининград.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 54.706365,
      lng: 20.505081,
      source: "osm",
      sourceId: "node/743036011"
    },
    {
      name: "Памятник воинам первой мировой войны",
      category: "История",
      placeType: "history",
      description: "Памятник воинам первой мировой войны — объект категории «история» в городе Калининград.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 54.721091,
      lng: 20.548039,
      source: "osm",
      sourceId: "node/753688575"
    },
    {
      name: "Шенфлиз",
      category: "Еда",
      placeType: "food",
      description: "Шенфлиз — объект категории «еда» в городе Калининград.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 54.663824,
      lng: 20.539148,
      source: "osm",
      sourceId: "node/792777569"
    },
    {
      name: "Воинам-освободителям",
      category: "История",
      placeType: "history",
      description: "Воинам-освободителям — объект категории «история» в городе Калининград.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 54.729574,
      lng: 20.479584,
      source: "osm",
      sourceId: "node/803581630"
    },
    {
      name: "Якитория",
      category: "Еда",
      placeType: "food",
      description: "Якитория — объект категории «еда» в городе Калининград.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 54.732402,
      lng: 20.481098,
      source: "osm",
      sourceId: "node/804064612"
    },
    {
      name: "Визави",
      category: "Еда",
      placeType: "food",
      description: "Визави — объект категории «еда» в городе Калининград.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 54.732258,
      lng: 20.479644,
      source: "osm",
      sourceId: "node/804064640"
    },
    {
      name: "Наутилус",
      category: "Еда",
      placeType: "food",
      description: "Наутилус — объект категории «еда» в городе Калининград.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 54.732126,
      lng: 20.481115,
      source: "osm",
      sourceId: "node/804064815"
    },
    {
      name: "Могила Пауля Кебера",
      category: "История",
      placeType: "history",
      description: "Могила Пауля Кебера — объект категории «история» в городе Калининград.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 54.737495,
      lng: 20.52075,
      source: "osm",
      sourceId: "node/811609091"
    },
    {
      name: "Воинам освободителям",
      category: "История",
      placeType: "history",
      description: "Воинам освободителям — объект категории «история» в городе Калининград.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 54.7387,
      lng: 20.516992,
      source: "osm",
      sourceId: "node/811609454"
    },
    {
      name: "Дон Ченто",
      category: "Еда",
      placeType: "food",
      description: "Дон Ченто — объект категории «еда» в городе Калининград.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 54.672586,
      lng: 20.501601,
      source: "osm",
      sourceId: "node/829967824"
    },
    {
      name: "Съешка",
      category: "Еда",
      placeType: "food",
      description: "Съешка — объект категории «еда» в городе Калининград.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 54.722657,
      lng: 20.488954,
      source: "osm",
      sourceId: "node/907128902"
    },
    {
      name: "Аусфальские ворота",
      category: "История",
      placeType: "history",
      description: "Аусфальские ворота — объект категории «история» в городе Калининград.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 54.712336,
      lng: 20.490464,
      source: "osm",
      sourceId: "node/916965869"
    },
    {
      name: "Солнечный камень",
      category: "Еда",
      placeType: "food",
      description: "Солнечный камень — объект категории «еда» в городе Калининград.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 54.721994,
      lng: 20.523645,
      source: "osm",
      sourceId: "node/926631043"
    },
    {
      name: "Мемориальный камень на месте Кёнигсберсгского университета \"Альбертина\"",
      category: "История",
      placeType: "history",
      description: "Мемориальный камень на месте Кёнигсберсгского университета \"Альбертина\" — объект категории «история» в городе Калининград.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 54.70657,
      lng: 20.513058,
      source: "osm",
      sourceId: "node/926631143"
    },
    {
      name: "Смотровая площадка начала20го века",
      category: "Достопримечательность",
      placeType: "architecture",
      description: "Смотровая площадка начала20го века — объект категории «достопримечательность» в городе Калининград.",
      emoji: "📍",
      duration: "1-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "architecture",
        "history"
      ],
      internalTags: [
        "type:architecture",
        "interest:architecture",
        "interest:history",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 54.722235,
      lng: 20.504311,
      source: "osm",
      sourceId: "node/944054952"
    },
    {
      name: "Памятный знак землякам-космонавтам",
      category: "История",
      placeType: "history",
      description: "Памятный знак землякам-космонавтам — объект категории «история» в городе Калининград.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 54.720384,
      lng: 20.482171,
      source: "osm",
      sourceId: "node/950326673"
    },
    {
      name: "Универсал",
      category: "Еда",
      placeType: "food",
      description: "Универсал — объект категории «еда» в городе Калининград.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 54.720617,
      lng: 20.48275,
      source: "osm",
      sourceId: "node/950326758"
    },
    {
      name: "Цезарь",
      category: "Еда",
      placeType: "food",
      description: "Цезарь — объект категории «еда» в городе Калининград.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 54.709599,
      lng: 20.519152,
      source: "osm",
      sourceId: "node/1025168294"
    },
    {
      name: "У быков",
      category: "Еда",
      placeType: "food",
      description: "У быков — объект категории «еда» в городе Калининград.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 54.720654,
      lng: 20.497006,
      source: "osm",
      sourceId: "node/1025298784"
    },
    {
      name: "Дредноут",
      category: "Ночная жизнь",
      placeType: "nightlife",
      description: "Дредноут — объект категории «ночная жизнь» в городе Калининград.",
      emoji: "🍸",
      duration: "2-3 часа",
      price: "1 500–3 000 ₽",
      rating: 4.5,
      interests: [
        "nightlife",
        "food"
      ],
      internalTags: [
        "type:nightlife",
        "interest:nightlife",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "evening",
      address: "",
      lat: 54.721857,
      lng: 20.496135,
      source: "osm",
      sourceId: "node/1025298900"
    },
    {
      name: "Киевское",
      category: "Еда",
      placeType: "food",
      description: "Киевское — объект категории «еда» в городе Калининград.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 54.681385,
      lng: 20.47548,
      source: "osm",
      sourceId: "node/1123367285"
    },
    {
      name: "Пруссия",
      category: "Еда",
      placeType: "food",
      description: "Пруссия — объект категории «еда» в городе Калининград.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 54.67995,
      lng: 20.483,
      source: "osm",
      sourceId: "node/1124599301"
    },
    {
      name: "Старый мастер",
      category: "Еда",
      placeType: "food",
      description: "Старый мастер — объект категории «еда» в городе Калининград.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 54.679076,
      lng: 20.471823,
      source: "osm",
      sourceId: "node/1124714574"
    },
    {
      name: "Galaxy",
      category: "Ночная жизнь",
      placeType: "nightlife",
      description: "Galaxy — объект категории «ночная жизнь» в городе Калининград.",
      emoji: "🍸",
      duration: "2-3 часа",
      price: "1 500–3 000 ₽",
      rating: 4.5,
      interests: [
        "nightlife",
        "food"
      ],
      internalTags: [
        "type:nightlife",
        "interest:nightlife",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "evening",
      address: "",
      lat: 54.669067,
      lng: 20.501121,
      source: "osm",
      sourceId: "node/1193232220"
    },
    {
      name: "Планета",
      category: "Еда",
      placeType: "food",
      description: "Планета — объект категории «еда» в городе Калининград.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "Калининград, улица Черняховского, 26",
      lat: 54.719703,
      lng: 20.507568,
      source: "osm",
      sourceId: "node/1217536998"
    },
    {
      name: "Угли",
      category: "Еда",
      placeType: "food",
      description: "Угли — объект категории «еда» в городе Калининград.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "проспект Мира, 19-21",
      lat: 54.719191,
      lng: 20.487677,
      source: "osm",
      sourceId: "node/1231377302"
    },
    {
      name: "ЧеснОК",
      category: "Еда",
      placeType: "food",
      description: "ЧеснОК — объект категории «еда» в городе Калининград.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "улица Горького",
      lat: 54.74502,
      lng: 20.501967,
      source: "osm",
      sourceId: "node/1236203852"
    },
    {
      name: "Просуши",
      category: "Еда",
      placeType: "food",
      description: "Просуши — объект категории «еда» в городе Калининград.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 54.720513,
      lng: 20.517035,
      source: "osm",
      sourceId: "node/1236211823"
    },
    {
      name: "Геркулес",
      category: "Еда",
      placeType: "food",
      description: "Геркулес — объект категории «еда» в городе Калининград.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "Калининград, проспект Мира, 105",
      lat: 54.720859,
      lng: 20.455654,
      source: "osm",
      sourceId: "node/1236235277"
    },
    {
      name: "Блинца-ца",
      category: "Еда",
      placeType: "food",
      description: "Блинца-ца — объект категории «еда» в городе Калининград.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 54.721679,
      lng: 20.509311,
      source: "osm",
      sourceId: "node/1306687813"
    },
    {
      name: "Токио",
      category: "Еда",
      placeType: "food",
      description: "Токио — объект категории «еда» в городе Калининград.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 54.742388,
      lng: 20.472528,
      source: "osm",
      sourceId: "node/1319408309"
    },
    {
      name: "Ростерхит",
      category: "Еда",
      placeType: "food",
      description: "Ростерхит — объект категории «еда» в городе Калининград.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "Калининград, улица Черняховского, 2",
      lat: 54.718549,
      lng: 20.502138,
      source: "osm",
      sourceId: "node/1324126077"
    },
    {
      name: "Эривань",
      category: "Еда",
      placeType: "food",
      description: "Эривань — объект категории «еда» в городе Калининград.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 54.724891,
      lng: 20.49691,
      source: "osm",
      sourceId: "node/1324139686"
    },
    {
      name: "Круассан",
      category: "Еда",
      placeType: "food",
      description: "Круассан — объект категории «еда» в городе Калининград.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 54.719801,
      lng: 20.48661,
      source: "osm",
      sourceId: "node/1415712767"
    },
    {
      name: "Папаше Беппе",
      category: "Еда",
      placeType: "food",
      description: "Папаше Беппе — объект категории «еда» в городе Калининград.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "улица Космонавта Леонова, 66А",
      lat: 54.734206,
      lng: 20.48161,
      source: "osm",
      sourceId: "node/1417198874"
    },
    {
      name: "Zötler",
      category: "Ночная жизнь",
      placeType: "nightlife",
      description: "Zötler — объект категории «ночная жизнь» в городе Калининград.",
      emoji: "🍸",
      duration: "2-3 часа",
      price: "1 500–3 000 ₽",
      rating: 4.5,
      interests: [
        "nightlife",
        "food"
      ],
      internalTags: [
        "type:nightlife",
        "interest:nightlife",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "evening",
      address: "Ленинский проспект, 3",
      lat: 54.718339,
      lng: 20.502222,
      source: "osm",
      sourceId: "node/1419109605"
    },
    {
      name: "Хмель",
      category: "Еда",
      placeType: "food",
      description: "Хмель — объект категории «еда» в городе Калининград.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 54.719581,
      lng: 20.502791,
      source: "osm",
      sourceId: "node/1419118456"
    },
    {
      name: "Анна Францевна",
      category: "Еда",
      placeType: "food",
      description: "Анна Францевна — объект категории «еда» в городе Калининград.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 54.721077,
      lng: 20.470789,
      source: "osm",
      sourceId: "node/1419118460"
    },
    {
      name: "Мама Мия",
      category: "Еда",
      placeType: "food",
      description: "Мама Мия — объект категории «еда» в городе Калининград.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 54.727035,
      lng: 20.529163,
      source: "osm",
      sourceId: "node/1419118461"
    },
    {
      name: "Subway",
      category: "Еда",
      placeType: "food",
      description: "Subway — объект категории «еда» в городе Калининград.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "проспект Мира, 61",
      lat: 54.720663,
      lng: 20.473426,
      source: "osm",
      sourceId: "node/1419118462"
    },
    {
      name: "Круассан",
      category: "Еда",
      placeType: "food",
      description: "Круассан — объект категории «еда» в городе Калининград.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 54.726912,
      lng: 20.528085,
      source: "osm",
      sourceId: "node/1419118465"
    },
    {
      name: "Вкусный Дом",
      category: "Еда",
      placeType: "food",
      description: "Вкусный Дом — объект категории «еда» в городе Калининград.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 54.731273,
      lng: 20.530421,
      source: "osm",
      sourceId: "node/1419122617"
    },
    {
      name: "Россгартен",
      category: "Ночная жизнь",
      placeType: "nightlife",
      description: "Россгартен — объект категории «ночная жизнь» в городе Калининград.",
      emoji: "🍸",
      duration: "2-3 часа",
      price: "1 500–3 000 ₽",
      rating: 4.5,
      interests: [
        "nightlife",
        "food"
      ],
      internalTags: [
        "type:nightlife",
        "interest:nightlife",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "evening",
      address: "",
      lat: 54.720463,
      lng: 20.518664,
      source: "osm",
      sourceId: "node/1419136857"
    },
    {
      name: "Шарк",
      category: "Еда",
      placeType: "food",
      description: "Шарк — объект категории «еда» в городе Калининград.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 54.720985,
      lng: 20.517476,
      source: "osm",
      sourceId: "node/1419136858"
    },
    {
      name: "Круассан",
      category: "Еда",
      placeType: "food",
      description: "Круассан — объект категории «еда» в городе Калининград.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 54.720217,
      lng: 20.513703,
      source: "osm",
      sourceId: "node/1419136893"
    },
    {
      name: "Кано",
      category: "Еда",
      placeType: "food",
      description: "Кано — объект категории «еда» в городе Калининград.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 54.721199,
      lng: 20.507099,
      source: "osm",
      sourceId: "node/1419137351"
    },
    {
      name: "Бухара",
      category: "Еда",
      placeType: "food",
      description: "Бухара — объект категории «еда» в городе Калининград.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 54.720861,
      lng: 20.50601,
      source: "osm",
      sourceId: "node/1419137354"
    },
    {
      name: "Театральное",
      category: "Еда",
      placeType: "food",
      description: "Театральное — объект категории «еда» в городе Калининград.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 54.718748,
      lng: 20.495142,
      source: "osm",
      sourceId: "node/1419137529"
    },
    {
      name: "Круассан",
      category: "Еда",
      placeType: "food",
      description: "Круассан — объект категории «еда» в городе Калининград.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 54.713018,
      lng: 20.507656,
      source: "osm",
      sourceId: "node/1422326160"
    },
    {
      name: "Якитория",
      category: "Еда",
      placeType: "food",
      description: "Якитория — объект категории «еда» в городе Калининград.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 54.71386,
      lng: 20.505456,
      source: "osm",
      sourceId: "node/1422337706"
    },
    {
      name: "Sky бар",
      category: "Ночная жизнь",
      placeType: "nightlife",
      description: "Sky бар — объект категории «ночная жизнь» в городе Калининград.",
      emoji: "🍸",
      duration: "2-3 часа",
      price: "1 500–3 000 ₽",
      rating: 4.5,
      interests: [
        "nightlife",
        "food"
      ],
      internalTags: [
        "type:nightlife",
        "interest:nightlife",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "evening",
      address: "",
      lat: 54.713761,
      lng: 20.504752,
      source: "osm",
      sourceId: "node/1422338539"
    },
    {
      name: "Лола",
      category: "Еда",
      placeType: "food",
      description: "Лола — объект категории «еда» в городе Калининград.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "Театральная улица, 21",
      lat: 54.716802,
      lng: 20.50033,
      source: "osm",
      sourceId: "node/1422339342"
    },
    {
      name: "Кавказ",
      category: "Еда",
      placeType: "food",
      description: "Кавказ — объект категории «еда» в городе Калининград.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 54.719,
      lng: 20.50024,
      source: "osm",
      sourceId: "node/1422344711"
    },
    {
      name: "SFC",
      category: "Еда",
      placeType: "food",
      description: "SFC — объект категории «еда» в городе Калининград.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 54.721656,
      lng: 20.509088,
      source: "osm",
      sourceId: "node/1422345519"
    },
    {
      name: "Додо Пицца",
      category: "Еда",
      placeType: "food",
      description: "Додо Пицца — объект категории «еда» в городе Калининград.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "Советский проспект, 1",
      lat: 54.720287,
      lng: 20.498194,
      source: "osm",
      sourceId: "node/1422353202"
    },
    {
      name: "Катарсис",
      category: "Еда",
      placeType: "food",
      description: "Катарсис — объект категории «еда» в городе Калининград.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 54.724563,
      lng: 20.505984,
      source: "osm",
      sourceId: "node/1422359581"
    }
  ],
  "владивосток": [
    {
      name: "мыс Трех Камней",
      category: "Природа",
      placeType: "nature",
      description: "мыс Трех Камней — объект категории «природа» в городе Владивосток.",
      emoji: "🌄",
      duration: "2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "nature"
      ],
      internalTags: [
        "type:nature",
        "interest:nature",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 43.150193,
      lng: 132.066599,
      source: "osm",
      sourceId: "node/246544322"
    },
    {
      name: "В.И. Ленину",
      category: "История",
      placeType: "history",
      description: "В.И. Ленину — объект категории «история» в городе Владивосток.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 43.111595,
      lng: 131.880116,
      source: "osm",
      sourceId: "node/258074584"
    },
    {
      name: "Монумент Борцам за власть Советов на Дальнем Востоке 1917-1922 гг.",
      category: "История",
      placeType: "history",
      description: "Монумент Борцам за власть Советов на Дальнем Востоке 1917-1922 гг. — объект категории «история» в городе Владивосток.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 43.115458,
      lng: 131.8854,
      source: "osm",
      sourceId: "node/258844585"
    },
    {
      name: "Триумфальная арка",
      category: "История",
      placeType: "history",
      description: "Триумфальная арка — объект категории «история» в городе Владивосток.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 43.113919,
      lng: 131.892432,
      source: "osm",
      sourceId: "node/296115500"
    },
    {
      name: "Конечный пункт Транссибирской магистрали",
      category: "История",
      placeType: "history",
      description: "Конечный пункт Транссибирской магистрали — объект категории «история» в городе Владивосток.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 43.112339,
      lng: 131.882225,
      source: "osm",
      sourceId: "node/302270181"
    },
    {
      name: "Еа-3306",
      category: "История",
      placeType: "history",
      description: "Еа-3306 — объект категории «история» в городе Владивосток.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 43.112054,
      lng: 131.882059,
      source: "osm",
      sourceId: "node/302274760"
    },
    {
      name: "Памятный знак на месте высадки основателей Владивостока",
      category: "История",
      placeType: "history",
      description: "Памятный знак на месте высадки основателей Владивостока — объект категории «история» в городе Владивосток.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 43.113204,
      lng: 131.889534,
      source: "osm",
      sourceId: "node/333774915"
    },
    {
      name: "Адмиралу Макарову",
      category: "История",
      placeType: "history",
      description: "Адмиралу Макарову — объект категории «история» в городе Владивосток.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 43.116067,
      lng: 131.87705,
      source: "osm",
      sourceId: "node/333777116"
    },
    {
      name: "г. Буссе",
      category: "Природа",
      placeType: "nature",
      description: "г. Буссе — объект категории «природа» в городе Владивосток.",
      emoji: "🌄",
      duration: "2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "nature"
      ],
      internalTags: [
        "type:nature",
        "interest:nature",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 43.12061,
      lng: 131.917895,
      source: "osm",
      sourceId: "node/408744883"
    },
    {
      name: "сопка Орлиное гнездо",
      category: "Природа",
      placeType: "nature",
      description: "сопка Орлиное гнездо — объект категории «природа» в городе Владивосток.",
      emoji: "🌄",
      duration: "2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "nature"
      ],
      internalTags: [
        "type:nature",
        "interest:nature",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 43.122376,
      lng: 131.899051,
      source: "osm",
      sourceId: "node/414170281"
    },
    {
      name: "Сопка Бурачка",
      category: "Природа",
      placeType: "nature",
      description: "Сопка Бурачка — объект категории «природа» в городе Владивосток.",
      emoji: "🌄",
      duration: "2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "nature"
      ],
      internalTags: [
        "type:nature",
        "interest:nature",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 43.097174,
      lng: 131.917218,
      source: "osm",
      sourceId: "node/441733261"
    },
    {
      name: "Противолодочный вертолёт Ка-25",
      category: "История",
      placeType: "history",
      description: "Противолодочный вертолёт Ка-25 — объект категории «история» в городе Владивосток.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 43.168132,
      lng: 131.914805,
      source: "osm",
      sourceId: "node/599901161"
    },
    {
      name: "Памятник приморцам, погибшим в ходе локальных войн и военных конфликтов",
      category: "История",
      placeType: "history",
      description: "Памятник приморцам, погибшим в ходе локальных войн и военных конфликтов — объект категории «история» в городе Владивосток.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 43.162101,
      lng: 131.91201,
      source: "osm",
      sourceId: "node/599901162"
    },
    {
      name: "Памятник Кириллу и Мефодию",
      category: "История",
      placeType: "history",
      description: "Памятник Кириллу и Мефодию — объект категории «история» в городе Владивосток.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 43.117593,
      lng: 131.898308,
      source: "osm",
      sourceId: "node/601373596"
    },
    {
      name: "Studio Coffee",
      category: "Еда",
      placeType: "food",
      description: "Studio Coffee — объект категории «еда» в городе Владивосток.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 43.116214,
      lng: 131.881468,
      source: "osm",
      sourceId: "node/606415825"
    },
    {
      name: "Столовая",
      category: "Еда",
      placeType: "food",
      description: "Столовая — объект категории «еда» в городе Владивосток.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 43.125239,
      lng: 131.955696,
      source: "osm",
      sourceId: "node/614107634"
    },
    {
      name: "Корейская кухня",
      category: "Еда",
      placeType: "food",
      description: "Корейская кухня — объект категории «еда» в городе Владивосток.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 43.126145,
      lng: 131.942828,
      source: "osm",
      sourceId: "node/614121824"
    },
    {
      name: "Памятник Танковой колонне \"Приморский комсомолец\"",
      category: "История",
      placeType: "history",
      description: "Памятник Танковой колонне \"Приморский комсомолец\" — объект категории «история» в городе Владивосток.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 43.163291,
      lng: 131.912247,
      source: "osm",
      sourceId: "node/618643013"
    },
    {
      name: "Азия",
      category: "Еда",
      placeType: "food",
      description: "Азия — объект категории «еда» в городе Владивосток.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 43.168439,
      lng: 131.909354,
      source: "osm",
      sourceId: "node/619015002"
    },
    {
      name: "Музей автомотостарины",
      category: "Музей",
      placeType: "museum",
      description: "Музей автомотостарины — объект категории «музей» в городе Владивосток.",
      emoji: "🏛️",
      duration: "2-3 часа",
      price: "500 ₽",
      rating: 4.5,
      interests: [
        "museums",
        "art",
        "history"
      ],
      internalTags: [
        "type:museum",
        "interest:museums",
        "interest:art",
        "interest:history",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 43.096979,
      lng: 131.965997,
      source: "osm",
      sourceId: "node/631419058"
    },
    {
      name: "Панда сад",
      category: "Еда",
      placeType: "food",
      description: "Панда сад — объект категории «еда» в городе Владивосток.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 43.105488,
      lng: 131.938049,
      source: "osm",
      sourceId: "node/636877213"
    },
    {
      name: "Памятник минёрам Владивостокской крепости",
      category: "История",
      placeType: "history",
      description: "Памятник минёрам Владивостокской крепости — объект категории «история» в городе Владивосток.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 43.092181,
      lng: 131.928122,
      source: "osm",
      sourceId: "node/638045888"
    },
    {
      name: "Точка Суши",
      category: "Еда",
      placeType: "food",
      description: "Точка Суши — объект категории «еда» в городе Владивосток.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 43.112088,
      lng: 131.920833,
      source: "osm",
      sourceId: "node/653115329"
    },
    {
      name: "Лётчикам-жертвам американской агрессии 1953 года",
      category: "История",
      placeType: "history",
      description: "Лётчикам-жертвам американской агрессии 1953 года — объект категории «история» в городе Владивосток.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 43.114331,
      lng: 131.911799,
      source: "osm",
      sourceId: "node/661642495"
    },
    {
      name: "Герою гражданской войны Виталию Баневуру",
      category: "История",
      placeType: "history",
      description: "Герою гражданской войны Виталию Баневуру — объект категории «история» в городе Владивосток.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 43.116436,
      lng: 131.908296,
      source: "osm",
      sourceId: "node/661656636"
    },
    {
      name: "Политехникам, героически павшим в боях за родину",
      category: "История",
      placeType: "history",
      description: "Политехникам, героически павшим в боях за родину — объект категории «история» в городе Владивосток.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 43.11608,
      lng: 131.901138,
      source: "osm",
      sourceId: "node/661943175"
    },
    {
      name: "Нобелевскому лауреату академику Г.Е.Тамму",
      category: "История",
      placeType: "history",
      description: "Нобелевскому лауреату академику Г.Е.Тамму — объект категории «история» в городе Владивосток.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 43.11744,
      lng: 131.8921,
      source: "osm",
      sourceId: "node/661967171"
    },
    {
      name: "Арт-кафе \"Станиславский\"",
      category: "Еда",
      placeType: "food",
      description: "Арт-кафе \"Станиславский\" — объект категории «еда» в городе Владивосток.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 43.115223,
      lng: 131.891445,
      source: "osm",
      sourceId: "node/665686327"
    },
    {
      name: "Кафетория",
      category: "Еда",
      placeType: "food",
      description: "Кафетория — объект категории «еда» в городе Владивосток.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 43.113972,
      lng: 131.895783,
      source: "osm",
      sourceId: "node/676359699"
    },
    {
      name: "Военно-исторический музей Тихоокеанского флота",
      category: "Музей",
      placeType: "museum",
      description: "Военно-исторический музей Тихоокеанского флота — объект категории «музей» в городе Владивосток.",
      emoji: "🏛️",
      duration: "2-3 часа",
      price: "500 ₽",
      rating: 4.5,
      interests: [
        "museums",
        "art",
        "history"
      ],
      internalTags: [
        "type:museum",
        "interest:museums",
        "interest:art",
        "interest:history",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 43.114457,
      lng: 131.900915,
      source: "osm",
      sourceId: "node/676375880"
    },
    {
      name: "Royal Burger",
      category: "Еда",
      placeType: "food",
      description: "Royal Burger — объект категории «еда» в городе Владивосток.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 43.12008,
      lng: 131.877446,
      source: "osm",
      sourceId: "node/747644191"
    },
    {
      name: "Хортица",
      category: "Еда",
      placeType: "food",
      description: "Хортица — объект категории «еда» в городе Владивосток.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 43.163328,
      lng: 131.91565,
      source: "osm",
      sourceId: "node/748450673"
    },
    {
      name: "Крестовая",
      category: "Природа",
      placeType: "nature",
      description: "Крестовая — объект категории «природа» в городе Владивосток.",
      emoji: "🌄",
      duration: "2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "nature"
      ],
      internalTags: [
        "type:nature",
        "interest:nature",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 43.094341,
      lng: 131.868203,
      source: "osm",
      sourceId: "node/792540179"
    },
    {
      name: "VladRock",
      category: "Активности",
      placeType: "sport",
      description: "VladRock — объект категории «активности» в городе Владивосток.",
      emoji: "🏃",
      duration: "2 часа",
      price: "800 ₽",
      rating: 4.5,
      interests: [
        "sport",
        "wellness"
      ],
      internalTags: [
        "type:sport",
        "interest:sport",
        "interest:wellness",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 43.114458,
      lng: 131.945779,
      source: "osm",
      sourceId: "node/841829759"
    },
    {
      name: "BeerЛога",
      category: "Ночная жизнь",
      placeType: "nightlife",
      description: "BeerЛога — объект категории «ночная жизнь» в городе Владивосток.",
      emoji: "🍸",
      duration: "2-3 часа",
      price: "1 500–3 000 ₽",
      rating: 4.5,
      interests: [
        "nightlife",
        "food"
      ],
      internalTags: [
        "type:nightlife",
        "interest:nightlife",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "evening",
      address: "",
      lat: 43.128032,
      lng: 131.939018,
      source: "osm",
      sourceId: "node/907986102"
    },
    {
      name: "7 футов",
      category: "Еда",
      placeType: "food",
      description: "7 футов — объект категории «еда» в городе Владивосток.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 43.108488,
      lng: 131.8736,
      source: "osm",
      sourceId: "node/921126973"
    },
    {
      name: "Столовая \"Копейка\"",
      category: "Еда",
      placeType: "food",
      description: "Столовая \"Копейка\" — объект категории «еда» в городе Владивосток.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 43.111644,
      lng: 131.93699,
      source: "osm",
      sourceId: "node/934035886"
    },
    {
      name: "Китайская пища",
      category: "Еда",
      placeType: "food",
      description: "Китайская пища — объект категории «еда» в городе Владивосток.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 43.125103,
      lng: 131.959088,
      source: "osm",
      sourceId: "node/945925528"
    },
    {
      name: "Трапеза",
      category: "Еда",
      placeType: "food",
      description: "Трапеза — объект категории «еда» в городе Владивосток.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 43.125445,
      lng: 131.959289,
      source: "osm",
      sourceId: "node/945927972"
    },
    {
      name: "У тёти Люды",
      category: "Еда",
      placeType: "food",
      description: "У тёти Люды — объект категории «еда» в городе Владивосток.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 43.125213,
      lng: 131.958522,
      source: "osm",
      sourceId: "node/945927973"
    },
    {
      name: "Шаурма",
      category: "Еда",
      placeType: "food",
      description: "Шаурма — объект категории «еда» в городе Владивосток.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 43.12497,
      lng: 131.95741,
      source: "osm",
      sourceId: "node/945927974"
    },
    {
      name: "Чор-Минор",
      category: "Еда",
      placeType: "food",
      description: "Чор-Минор — объект категории «еда» в городе Владивосток.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "Владивосток",
      lat: 43.125272,
      lng: 131.957408,
      source: "osm",
      sourceId: "node/946442346"
    },
    {
      name: "BeerLoga",
      category: "Ночная жизнь",
      placeType: "nightlife",
      description: "BeerLoga — объект категории «ночная жизнь» в городе Владивосток.",
      emoji: "🍸",
      duration: "2-3 часа",
      price: "1 500–3 000 ₽",
      rating: 4.5,
      interests: [
        "nightlife",
        "food"
      ],
      internalTags: [
        "type:nightlife",
        "interest:nightlife",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "evening",
      address: "",
      lat: 43.121499,
      lng: 131.953247,
      source: "osm",
      sourceId: "node/949551947"
    },
    {
      name: "Сопка Суворова",
      category: "Природа",
      placeType: "nature",
      description: "Сопка Суворова — объект категории «природа» в городе Владивосток.",
      emoji: "🌄",
      duration: "2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "nature"
      ],
      internalTags: [
        "type:nature",
        "interest:nature",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 43.126384,
      lng: 131.982708,
      source: "osm",
      sourceId: "node/949644705"
    },
    {
      name: "Сопка Шошина",
      category: "Природа",
      placeType: "nature",
      description: "Сопка Шошина — объект категории «природа» в городе Владивосток.",
      emoji: "🌄",
      duration: "2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "nature"
      ],
      internalTags: [
        "type:nature",
        "interest:nature",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 43.12578,
      lng: 131.931125,
      source: "osm",
      sourceId: "node/954541313"
    },
    {
      name: "Сопка Варгина",
      category: "Природа",
      placeType: "nature",
      description: "Сопка Варгина — объект категории «природа» в городе Владивосток.",
      emoji: "🌄",
      duration: "2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "nature"
      ],
      internalTags: [
        "type:nature",
        "interest:nature",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 43.158299,
      lng: 132.017943,
      source: "osm",
      sourceId: "node/954597829"
    },
    {
      name: "г. Попова",
      category: "Природа",
      placeType: "nature",
      description: "г. Попова — объект категории «природа» в городе Владивосток.",
      emoji: "🌄",
      duration: "2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "nature"
      ],
      internalTags: [
        "type:nature",
        "interest:nature",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 43.151599,
      lng: 131.997343,
      source: "osm",
      sourceId: "node/954597832"
    },
    {
      name: "Сопка Седанка",
      category: "Природа",
      placeType: "nature",
      description: "Сопка Седанка — объект категории «природа» в городе Владивосток.",
      emoji: "🌄",
      duration: "2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "nature"
      ],
      internalTags: [
        "type:nature",
        "interest:nature",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 43.193006,
      lng: 131.955458,
      source: "osm",
      sourceId: "node/954597836"
    },
    {
      name: "Сопка Холодильник",
      category: "Природа",
      placeType: "nature",
      description: "Сопка Холодильник — объект категории «природа» в городе Владивосток.",
      emoji: "🌄",
      duration: "2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "nature"
      ],
      internalTags: [
        "type:nature",
        "interest:nature",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 43.145446,
      lng: 131.937533,
      source: "osm",
      sourceId: "node/954597846"
    },
    {
      name: "Сопка Комарова",
      category: "Природа",
      placeType: "nature",
      description: "Сопка Комарова — объект категории «природа» в городе Владивосток.",
      emoji: "🌄",
      duration: "2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "nature"
      ],
      internalTags: [
        "type:nature",
        "interest:nature",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 43.119542,
      lng: 131.948954,
      source: "osm",
      sourceId: "node/954597851"
    },
    {
      name: "Сопка Монастырская",
      category: "Природа",
      placeType: "nature",
      description: "Сопка Монастырская — объект категории «природа» в городе Владивосток.",
      emoji: "🌄",
      duration: "2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "nature"
      ],
      internalTags: [
        "type:nature",
        "interest:nature",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 43.085511,
      lng: 131.937429,
      source: "osm",
      sourceId: "node/955618227"
    },
    {
      name: "СУДС",
      category: "Природа",
      placeType: "nature",
      description: "СУДС — объект категории «природа» в городе Владивосток.",
      emoji: "🌄",
      duration: "2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "nature"
      ],
      internalTags: [
        "type:nature",
        "interest:nature",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 43.068193,
      lng: 131.920147,
      source: "osm",
      sourceId: "node/955620325"
    },
    {
      name: "Две палочки",
      category: "Еда",
      placeType: "food",
      description: "Две палочки — объект категории «еда» в городе Владивосток.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 43.196636,
      lng: 132.122265,
      source: "osm",
      sourceId: "node/961206890"
    },
    {
      name: "Алёна",
      category: "Еда",
      placeType: "food",
      description: "Алёна — объект категории «еда» в городе Владивосток.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 43.195211,
      lng: 132.110495,
      source: "osm",
      sourceId: "node/961206910"
    },
    {
      name: "Кошкин дом",
      category: "Еда",
      placeType: "food",
      description: "Кошкин дом — объект категории «еда» в городе Владивосток.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 43.112593,
      lng: 131.936483,
      source: "osm",
      sourceId: "node/976303848"
    },
    {
      name: "Старое кафе",
      category: "Еда",
      placeType: "food",
      description: "Старое кафе — объект категории «еда» в городе Владивосток.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 43.09975,
      lng: 131.944531,
      source: "osm",
      sourceId: "node/985224129"
    },
    {
      name: "Интернет Кафе",
      category: "Еда",
      placeType: "food",
      description: "Интернет Кафе — объект категории «еда» в городе Владивосток.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 43.104765,
      lng: 131.937705,
      source: "osm",
      sourceId: "node/989626252"
    },
    {
      name: "Золотой петушок",
      category: "Еда",
      placeType: "food",
      description: "Золотой петушок — объект категории «еда» в городе Владивосток.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 43.148537,
      lng: 131.952648,
      source: "osm",
      sourceId: "node/995585344"
    },
    {
      name: "Inter@zone",
      category: "Еда",
      placeType: "food",
      description: "Inter@zone — объект категории «еда» в городе Владивосток.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 43.111777,
      lng: 131.938215,
      source: "osm",
      sourceId: "node/1002264110"
    },
    {
      name: "Гонконг",
      category: "Еда",
      placeType: "food",
      description: "Гонконг — объект категории «еда» в городе Владивосток.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 43.112239,
      lng: 131.937863,
      source: "osm",
      sourceId: "node/1002264122"
    },
    {
      name: "Масис",
      category: "Еда",
      placeType: "food",
      description: "Масис — объект категории «еда» в городе Владивосток.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 43.111342,
      lng: 131.937673,
      source: "osm",
      sourceId: "node/1002264125"
    },
    {
      name: "Рестоград",
      category: "Еда",
      placeType: "food",
      description: "Рестоград — объект категории «еда» в городе Владивосток.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 43.124625,
      lng: 131.886543,
      source: "osm",
      sourceId: "node/1003547177"
    },
    {
      name: "Вечная слава героям-морякам Тихоокеанского флота, павшим в боях с японскими империалистами за честь и победу нашей РОДИНЫ. Август 1945 г.",
      category: "История",
      placeType: "history",
      description: "Вечная слава героям-морякам Тихоокеанского флота, павшим в боях с японскими империалистами за честь и победу нашей РОДИНЫ. Август 1945 г. — объект категории «история» в городе Владивосток.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 43.112608,
      lng: 131.92519,
      source: "osm",
      sourceId: "node/1006194672"
    },
    {
      name: "Ceska Pivince",
      category: "Ночная жизнь",
      placeType: "nightlife",
      description: "Ceska Pivince — объект категории «ночная жизнь» в городе Владивосток.",
      emoji: "🍸",
      duration: "2-3 часа",
      price: "1 500–3 000 ₽",
      rating: 4.5,
      interests: [
        "nightlife",
        "food"
      ],
      internalTags: [
        "type:nightlife",
        "interest:nightlife",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "evening",
      address: "",
      lat: 43.113492,
      lng: 131.931562,
      source: "osm",
      sourceId: "node/1010492498"
    },
    {
      name: "Via-Vai",
      category: "Еда",
      placeType: "food",
      description: "Via-Vai — объект категории «еда» в городе Владивосток.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 43.168864,
      lng: 131.925161,
      source: "osm",
      sourceId: "node/1041038246"
    },
    {
      name: "Китайский ресторан",
      category: "Еда",
      placeType: "food",
      description: "Китайский ресторан — объект категории «еда» в городе Владивосток.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 43.16891,
      lng: 131.92577,
      source: "osm",
      sourceId: "node/1041038272"
    },
    {
      name: "Мона",
      category: "Еда",
      placeType: "food",
      description: "Мона — объект категории «еда» в городе Владивосток.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 43.168727,
      lng: 131.932044,
      source: "osm",
      sourceId: "node/1041106573"
    },
    {
      name: "Музей истории Дальнего Востока им. В.К. Арсеньева",
      category: "Музей",
      placeType: "museum",
      description: "Музей истории Дальнего Востока им. В.К. Арсеньева — объект категории «музей» в городе Владивосток.",
      emoji: "🏛️",
      duration: "2-3 часа",
      price: "500 ₽",
      rating: 4.5,
      interests: [
        "museums",
        "art",
        "history"
      ],
      internalTags: [
        "type:museum",
        "interest:museums",
        "interest:art",
        "interest:history",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 43.116361,
      lng: 131.882171,
      source: "osm",
      sourceId: "node/1042556860"
    },
    {
      name: "\"У Хасана\"",
      category: "Еда",
      placeType: "food",
      description: "\"У Хасана\" — объект категории «еда» в городе Владивосток.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 43.150374,
      lng: 131.954097,
      source: "osm",
      sourceId: "node/1046952012"
    },
    {
      name: "Медитерия",
      category: "Еда",
      placeType: "food",
      description: "Медитерия — объект категории «еда» в городе Владивосток.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 43.150703,
      lng: 131.954483,
      source: "osm",
      sourceId: "node/1046952069"
    },
    {
      name: "Грилль, Горячие обеды",
      category: "Еда",
      placeType: "food",
      description: "Грилль, Горячие обеды — объект категории «еда» в городе Владивосток.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 43.224433,
      lng: 131.992815,
      source: "osm",
      sourceId: "node/1048666814"
    },
    {
      name: "Рим-Токио",
      category: "Еда",
      placeType: "food",
      description: "Рим-Токио — объект категории «еда» в городе Владивосток.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 43.110885,
      lng: 131.938298,
      source: "osm",
      sourceId: "node/1090214703"
    },
    {
      name: "Армения",
      category: "Еда",
      placeType: "food",
      description: "Армения — объект категории «еда» в городе Владивосток.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 43.134385,
      lng: 131.94863,
      source: "osm",
      sourceId: "node/1096073252"
    },
    {
      name: "DISCO BAR",
      category: "Ночная жизнь",
      placeType: "nightlife",
      description: "DISCO BAR — объект категории «ночная жизнь» в городе Владивосток.",
      emoji: "🍸",
      duration: "2-3 часа",
      price: "1 500–3 000 ₽",
      rating: 4.5,
      interests: [
        "nightlife",
        "food"
      ],
      internalTags: [
        "type:nightlife",
        "interest:nightlife",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "evening",
      address: "",
      lat: 43.111763,
      lng: 131.938573,
      source: "osm",
      sourceId: "node/1096104446"
    },
    {
      name: "Пирожки, торты, кофе",
      category: "Еда",
      placeType: "food",
      description: "Пирожки, торты, кофе — объект категории «еда» в городе Владивосток.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 43.111431,
      lng: 131.937923,
      source: "osm",
      sourceId: "node/1096115229"
    },
    {
      name: "Grand Prix",
      category: "Еда",
      placeType: "food",
      description: "Grand Prix — объект категории «еда» в городе Владивосток.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 43.134152,
      lng: 131.937555,
      source: "osm",
      sourceId: "node/1214391874"
    },
    {
      name: "PRADO",
      category: "Еда",
      placeType: "food",
      description: "PRADO — объект категории «еда» в городе Владивосток.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 43.136713,
      lng: 131.934175,
      source: "osm",
      sourceId: "node/1214391884"
    },
    {
      name: "Столовая",
      category: "Еда",
      placeType: "food",
      description: "Столовая — объект категории «еда» в городе Владивосток.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 43.118137,
      lng: 131.89369,
      source: "osm",
      sourceId: "node/1224924890"
    },
    {
      name: "С. Лазо",
      category: "История",
      placeType: "history",
      description: "С. Лазо — объект категории «история» в городе Владивосток.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 43.114987,
      lng: 131.892957,
      source: "osm",
      sourceId: "node/1226547117"
    },
    {
      name: "Cinema",
      category: "Еда",
      placeType: "food",
      description: "Cinema — объект категории «еда» в городе Владивосток.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 43.197738,
      lng: 132.131047,
      source: "osm",
      sourceId: "node/1227591448"
    }
  ],
  "иркутск": [
    {
      name: "Александру III",
      category: "История",
      placeType: "history",
      description: "Александру III — объект категории «история» в городе Иркутск.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 52.275486,
      lng: 104.277207,
      source: "osm",
      sourceId: "node/410838185"
    },
    {
      name: "Огни Енисея",
      category: "Еда",
      placeType: "food",
      description: "Огни Енисея — объект категории «еда» в городе Иркутск.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 52.275698,
      lng: 104.341577,
      source: "osm",
      sourceId: "node/622205526"
    },
    {
      name: "Берег",
      category: "Еда",
      placeType: "food",
      description: "Берег — объект категории «еда» в городе Иркутск.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 52.256949,
      lng: 104.311744,
      source: "osm",
      sourceId: "node/715076922"
    },
    {
      name: "А. В. Вампилову",
      category: "История",
      placeType: "history",
      description: "А. В. Вампилову — объект категории «история» в городе Иркутск.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 52.278566,
      lng: 104.281099,
      source: "osm",
      sourceId: "node/920058001"
    },
    {
      name: "В. И. Ленину",
      category: "История",
      placeType: "history",
      description: "В. И. Ленину — объект категории «история» в городе Иркутск.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 52.279425,
      lng: 104.282702,
      source: "osm",
      sourceId: "node/1249894844"
    },
    {
      name: "Столовка.ру",
      category: "Еда",
      placeType: "food",
      description: "Столовка.ру — объект категории «еда» в городе Иркутск.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 52.240345,
      lng: 104.274232,
      source: "osm",
      sourceId: "node/1331973099"
    },
    {
      name: "Коре Дуо",
      category: "Еда",
      placeType: "food",
      description: "Коре Дуо — объект категории «еда» в городе Иркутск.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 52.24424,
      lng: 104.270472,
      source: "osm",
      sourceId: "node/1331973101"
    },
    {
      name: "Столовка.ру",
      category: "Еда",
      placeType: "food",
      description: "Столовка.ру — объект категории «еда» в городе Иркутск.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 52.248113,
      lng: 104.263949,
      source: "osm",
      sourceId: "node/1331973114"
    },
    {
      name: "Мандарин",
      category: "Еда",
      placeType: "food",
      description: "Мандарин — объект категории «еда» в городе Иркутск.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 52.249484,
      lng: 104.259804,
      source: "osm",
      sourceId: "node/1333153945"
    },
    {
      name: "Изюм",
      category: "Еда",
      placeType: "food",
      description: "Изюм — объект категории «еда» в городе Иркутск.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 52.249386,
      lng: 104.259905,
      source: "osm",
      sourceId: "node/1333153948"
    },
    {
      name: "Бургер сити",
      category: "Еда",
      placeType: "food",
      description: "Бургер сити — объект категории «еда» в городе Иркутск.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "Иркутск, улица Лермонтова, 77",
      lat: 52.265395,
      lng: 104.259136,
      source: "osm",
      sourceId: "node/1459503140"
    },
    {
      name: "Пиццерия",
      category: "Еда",
      placeType: "food",
      description: "Пиццерия — объект категории «еда» в городе Иркутск.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 52.263087,
      lng: 104.311836,
      source: "osm",
      sourceId: "node/1463683065"
    },
    {
      name: "Старое мусульманское кладбище",
      category: "История",
      placeType: "history",
      description: "Старое мусульманское кладбище — объект категории «история» в городе Иркутск.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 52.258921,
      lng: 104.31816,
      source: "osm",
      sourceId: "node/1463788359"
    },
    {
      name: "Европа",
      category: "Еда",
      placeType: "food",
      description: "Европа — объект категории «еда» в городе Иркутск.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 52.274694,
      lng: 104.304819,
      source: "osm",
      sourceId: "node/1463835622"
    },
    {
      name: "House Mafia",
      category: "Ночная жизнь",
      placeType: "nightlife",
      description: "House Mafia — объект категории «ночная жизнь» в городе Иркутск.",
      emoji: "🍸",
      duration: "2-3 часа",
      price: "1 500–3 000 ₽",
      rating: 4.5,
      interests: [
        "nightlife",
        "food"
      ],
      internalTags: [
        "type:nightlife",
        "interest:nightlife",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "evening",
      address: "",
      lat: 52.260734,
      lng: 104.310703,
      source: "osm",
      sourceId: "node/1463835689"
    },
    {
      name: "Лайм",
      category: "Еда",
      placeType: "food",
      description: "Лайм — объект категории «еда» в городе Иркутск.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 52.292131,
      lng: 104.283747,
      source: "osm",
      sourceId: "node/1524344909"
    },
    {
      name: "Танк \"Иркутский комсомолец\"",
      category: "История",
      placeType: "history",
      description: "Танк \"Иркутский комсомолец\" — объект категории «история» в городе Иркутск.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 52.279087,
      lng: 104.317518,
      source: "osm",
      sourceId: "node/1524641470"
    },
    {
      name: "Monet",
      category: "Еда",
      placeType: "food",
      description: "Monet — объект категории «еда» в городе Иркутск.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 52.281378,
      lng: 104.273899,
      source: "osm",
      sourceId: "node/1525969656"
    },
    {
      name: "Памятник Солдатам Правопорядка",
      category: "История",
      placeType: "history",
      description: "Памятник Солдатам Правопорядка — объект категории «история» в городе Иркутск.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 52.28309,
      lng: 104.270845,
      source: "osm",
      sourceId: "node/1525994529"
    },
    {
      name: "Позная",
      category: "Еда",
      placeType: "food",
      description: "Позная — объект категории «еда» в городе Иркутск.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 52.28232,
      lng: 104.296724,
      source: "osm",
      sourceId: "node/1529090670"
    },
    {
      name: "Веранда",
      category: "Еда",
      placeType: "food",
      description: "Веранда — объект категории «еда» в городе Иркутск.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 52.281861,
      lng: 104.295319,
      source: "osm",
      sourceId: "node/1529090676"
    },
    {
      name: "Harat`s pub",
      category: "Ночная жизнь",
      placeType: "nightlife",
      description: "Harat`s pub — объект категории «ночная жизнь» в городе Иркутск.",
      emoji: "🍸",
      duration: "2-3 часа",
      price: "1 500–3 000 ₽",
      rating: 4.5,
      interests: [
        "nightlife",
        "food"
      ],
      internalTags: [
        "type:nightlife",
        "interest:nightlife",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "evening",
      address: "",
      lat: 52.266033,
      lng: 104.308481,
      source: "osm",
      sourceId: "node/1529197344"
    },
    {
      name: "WorldGym",
      category: "Активности",
      placeType: "sport",
      description: "WorldGym — объект категории «активности» в городе Иркутск.",
      emoji: "🏃",
      duration: "2 часа",
      price: "800 ₽",
      rating: 4.5,
      interests: [
        "sport",
        "wellness"
      ],
      internalTags: [
        "type:sport",
        "interest:sport",
        "interest:wellness",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 52.23215,
      lng: 104.280214,
      source: "osm",
      sourceId: "node/1529624365"
    },
    {
      name: "Столовка",
      category: "Еда",
      placeType: "food",
      description: "Столовка — объект категории «еда» в городе Иркутск.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 52.285164,
      lng: 104.268634,
      source: "osm",
      sourceId: "node/1582720943"
    },
    {
      name: "Радищевское кладбище",
      category: "История",
      placeType: "history",
      description: "Радищевское кладбище — объект категории «история» в городе Иркутск.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 52.32021,
      lng: 104.331826,
      source: "osm",
      sourceId: "node/1652588002"
    },
    {
      name: "Traveler's Coffee",
      category: "Еда",
      placeType: "food",
      description: "Traveler's Coffee — объект категории «еда» в городе Иркутск.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "Киевская улица, 7",
      lat: 52.281769,
      lng: 104.287454,
      source: "osm",
      sourceId: "node/1684400104"
    },
    {
      name: "Red Grot",
      category: "Еда",
      placeType: "food",
      description: "Red Grot — объект категории «еда» в городе Иркутск.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 52.247428,
      lng: 104.360713,
      source: "osm",
      sourceId: "node/1731623837"
    },
    {
      name: "Амрита",
      category: "Еда",
      placeType: "food",
      description: "Амрита — объект категории «еда» в городе Иркутск.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 52.284694,
      lng: 104.319641,
      source: "osm",
      sourceId: "node/1759677738"
    },
    {
      name: "Адмиралу Колчаку",
      category: "История",
      placeType: "history",
      description: "Адмиралу Колчаку — объект категории «история» в городе Иркутск.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 52.300018,
      lng: 104.295063,
      source: "osm",
      sourceId: "node/1789792316"
    },
    {
      name: "М. Горькому",
      category: "История",
      placeType: "history",
      description: "М. Горькому — объект категории «история» в городе Иркутск.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 52.282682,
      lng: 104.281387,
      source: "osm",
      sourceId: "node/1894590223"
    },
    {
      name: "Жёнам декабристов",
      category: "История",
      placeType: "history",
      description: "Жёнам декабристов — объект категории «история» в городе Иркутск.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 52.288322,
      lng: 104.305835,
      source: "osm",
      sourceId: "node/1908542960"
    },
    {
      name: "Волна",
      category: "Еда",
      placeType: "food",
      description: "Волна — объект категории «еда» в городе Иркутск.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 52.245254,
      lng: 104.351636,
      source: "osm",
      sourceId: "node/2034396663"
    },
    {
      name: "Г. К. Жукову",
      category: "История",
      placeType: "history",
      description: "Г. К. Жукову — объект категории «история» в городе Иркутск.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 52.248878,
      lng: 104.352422,
      source: "osm",
      sourceId: "node/2034396672"
    },
    {
      name: "Кочевник",
      category: "Еда",
      placeType: "food",
      description: "Кочевник — объект категории «еда» в городе Иркутск.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 52.283674,
      lng: 104.283625,
      source: "osm",
      sourceId: "node/2132253471"
    },
    {
      name: "Легенда",
      category: "Еда",
      placeType: "food",
      description: "Легенда — объект категории «еда» в городе Иркутск.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 52.267796,
      lng: 104.223615,
      source: "osm",
      sourceId: "node/2150451600"
    },
    {
      name: "Контактный детский зоопарк",
      category: "Достопримечательность",
      placeType: "other",
      description: "Контактный детский зоопарк — объект категории «достопримечательность» в городе Иркутск.",
      emoji: "📍",
      duration: "1.5 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history"
      ],
      internalTags: [
        "type:other",
        "interest:history",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 52.263211,
      lng: 104.246273,
      source: "osm",
      sourceId: "node/2361513001"
    },
    {
      name: "Суши студио",
      category: "Еда",
      placeType: "food",
      description: "Суши студио — объект категории «еда» в городе Иркутск.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 52.278886,
      lng: 104.281439,
      source: "osm",
      sourceId: "node/2468166276"
    },
    {
      name: "Бистро \"Избушка\"",
      category: "Еда",
      placeType: "food",
      description: "Бистро \"Избушка\" — объект категории «еда» в городе Иркутск.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 52.286335,
      lng: 104.276539,
      source: "osm",
      sourceId: "node/2507167503"
    },
    {
      name: "Геологический музей",
      category: "Музей",
      placeType: "museum",
      description: "Геологический музей — объект категории «музей» в городе Иркутск.",
      emoji: "🏛️",
      duration: "2-3 часа",
      price: "500 ₽",
      rating: 4.5,
      interests: [
        "museums",
        "art",
        "history"
      ],
      internalTags: [
        "type:museum",
        "interest:museums",
        "interest:art",
        "interest:history",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 52.286155,
      lng: 104.276442,
      source: "osm",
      sourceId: "node/2507167504"
    },
    {
      name: "Killfish",
      category: "Ночная жизнь",
      placeType: "nightlife",
      description: "Killfish — объект категории «ночная жизнь» в городе Иркутск.",
      emoji: "🍸",
      duration: "2-3 часа",
      price: "1 500–3 000 ₽",
      rating: 4.5,
      interests: [
        "nightlife",
        "food"
      ],
      internalTags: [
        "type:nightlife",
        "interest:nightlife",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "evening",
      address: "Иркутск, улица Чкалова, 36",
      lat: 52.288825,
      lng: 104.276861,
      source: "osm",
      sourceId: "node/2583116462"
    },
    {
      name: "Трудовая слава ИАЗ",
      category: "История",
      placeType: "history",
      description: "Трудовая слава ИАЗ — объект категории «история» в городе Иркутск.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 52.355336,
      lng: 104.210115,
      source: "osm",
      sourceId: "node/2618562519"
    },
    {
      name: "Основателям Иркутска от горожан",
      category: "История",
      placeType: "history",
      description: "Основателям Иркутска от горожан — объект категории «история» в городе Иркутск.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 52.292644,
      lng: 104.281622,
      source: "osm",
      sourceId: "node/2618935635"
    },
    {
      name: "Тюльпан",
      category: "История",
      placeType: "history",
      description: "Тюльпан — объект категории «история» в городе Иркутск.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 52.329953,
      lng: 104.233108,
      source: "osm",
      sourceId: "node/2640357343"
    },
    {
      name: "London Pub",
      category: "Ночная жизнь",
      placeType: "nightlife",
      description: "London Pub — объект категории «ночная жизнь» в городе Иркутск.",
      emoji: "🍸",
      duration: "2-3 часа",
      price: "1 500–3 000 ₽",
      rating: 4.5,
      interests: [
        "nightlife",
        "food"
      ],
      internalTags: [
        "type:nightlife",
        "interest:nightlife",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "evening",
      address: "Иркутск, улица Сухэ-Батора, 7",
      lat: 52.287208,
      lng: 104.282196,
      source: "osm",
      sourceId: "node/2910301680"
    },
    {
      name: "Subway",
      category: "Еда",
      placeType: "food",
      description: "Subway — объект категории «еда» в городе Иркутск.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 52.287743,
      lng: 104.286438,
      source: "osm",
      sourceId: "node/2910301697"
    },
    {
      name: "Леониду Гайдаю",
      category: "История",
      placeType: "history",
      description: "Леониду Гайдаю — объект категории «история» в городе Иркутск.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 52.286864,
      lng: 104.287239,
      source: "osm",
      sourceId: "node/2910301698"
    },
    {
      name: "Аппетит",
      category: "Еда",
      placeType: "food",
      description: "Аппетит — объект категории «еда» в городе Иркутск.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "Иркутск, улица Горького, 42",
      lat: 52.285518,
      lng: 104.288713,
      source: "osm",
      sourceId: "node/2911141870"
    },
    {
      name: "А.П. Белобородову",
      category: "История",
      placeType: "history",
      description: "А.П. Белобородову — объект категории «история» в городе Иркутск.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 52.291742,
      lng: 104.280029,
      source: "osm",
      sourceId: "node/2911486374"
    },
    {
      name: "Ю. А. Гагарину",
      category: "История",
      placeType: "history",
      description: "Ю. А. Гагарину — объект категории «история» в городе Иркутск.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 52.277276,
      lng: 104.276468,
      source: "osm",
      sourceId: "node/2911619460"
    },
    {
      name: "Позы на Канадзавы",
      category: "Еда",
      placeType: "food",
      description: "Позы на Канадзавы — объект категории «еда» в городе Иркутск.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "улица Канадзавы, 3",
      lat: 52.285584,
      lng: 104.278995,
      source: "osm",
      sourceId: "node/2912360980"
    },
    {
      name: "Памятник русско-японской дружбы",
      category: "История",
      placeType: "history",
      description: "Памятник русско-японской дружбы — объект категории «история» в городе Иркутск.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 52.285387,
      lng: 104.27811,
      source: "osm",
      sourceId: "node/2912362075"
    },
    {
      name: "Антарес",
      category: "Еда",
      placeType: "food",
      description: "Антарес — объект категории «еда» в городе Иркутск.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "Иркутск, улица Некрасова, 3",
      lat: 52.289018,
      lng: 104.284222,
      source: "osm",
      sourceId: "node/2913694735"
    },
    {
      name: "Ю. А. Ножикову",
      category: "История",
      placeType: "history",
      description: "Ю. А. Ножикову — объект категории «история» в городе Иркутск.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 52.284111,
      lng: 104.28425,
      source: "osm",
      sourceId: "node/2913728569"
    },
    {
      name: "Traveler's Coffee",
      category: "Еда",
      placeType: "food",
      description: "Traveler's Coffee — объект категории «еда» в городе Иркутск.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "Иркутск, улица Желябова, 3",
      lat: 52.287427,
      lng: 104.284067,
      source: "osm",
      sourceId: "node/2976858307"
    },
    {
      name: "Погибшим в ВОВ",
      category: "История",
      placeType: "history",
      description: "Погибшим в ВОВ — объект категории «история» в городе Иркутск.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 52.257367,
      lng: 104.325733,
      source: "osm",
      sourceId: "node/3008207847"
    },
    {
      name: "Пицца Домино",
      category: "Еда",
      placeType: "food",
      description: "Пицца Домино — объект категории «еда» в городе Иркутск.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 52.279694,
      lng: 104.283321,
      source: "osm",
      sourceId: "node/3008449804"
    },
    {
      name: "Pop Cafe",
      category: "Еда",
      placeType: "food",
      description: "Pop Cafe — объект категории «еда» в городе Иркутск.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 52.279478,
      lng: 104.283355,
      source: "osm",
      sourceId: "node/3008452339"
    },
    {
      name: "УРАГШАА этноклуб-ресторан",
      category: "Еда",
      placeType: "food",
      description: "УРАГШАА этноклуб-ресторан — объект категории «еда» в городе Иркутск.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 52.352299,
      lng: 104.167135,
      source: "osm",
      sourceId: "node/3009799494"
    },
    {
      name: "Смайк",
      category: "Еда",
      placeType: "food",
      description: "Смайк — объект категории «еда» в городе Иркутск.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 52.286601,
      lng: 104.298201,
      source: "osm",
      sourceId: "node/3069999367"
    },
    {
      name: "Столовая ВСЖД",
      category: "Еда",
      placeType: "food",
      description: "Столовая ВСЖД — объект категории «еда» в городе Иркутск.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 52.279072,
      lng: 104.281055,
      source: "osm",
      sourceId: "node/3076626716"
    },
    {
      name: "Братья Гримм",
      category: "Еда",
      placeType: "food",
      description: "Братья Гримм — объект категории «еда» в городе Иркутск.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "Иркутск",
      lat: 52.261416,
      lng: 104.212354,
      source: "osm",
      sourceId: "node/3081521352"
    },
    {
      name: "Винкель Бир",
      category: "Еда",
      placeType: "food",
      description: "Винкель Бир — объект категории «еда» в городе Иркутск.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "Иркутск, улица Ширямова, 9",
      lat: 52.275321,
      lng: 104.356999,
      source: "osm",
      sourceId: "node/3218845391"
    },
    {
      name: "Винкель Клуб",
      category: "Еда",
      placeType: "food",
      description: "Винкель Клуб — объект категории «еда» в городе Иркутск.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "Иркутск, улица Лермонтова, 257",
      lat: 52.250427,
      lng: 104.265771,
      source: "osm",
      sourceId: "node/3218854683"
    },
    {
      name: "КОДО",
      category: "Еда",
      placeType: "food",
      description: "КОДО — объект категории «еда» в городе Иркутск.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "Иркутск, улица Ширямова, 19Б",
      lat: 52.261958,
      lng: 104.351123,
      source: "osm",
      sourceId: "node/3218862162"
    },
    {
      name: "Воинам, умершим от ран в госпиталях Иркутска 1941—1945",
      category: "История",
      placeType: "history",
      description: "Воинам, умершим от ран в госпиталях Иркутска 1941—1945 — объект категории «история» в городе Иркутск.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 52.262439,
      lng: 104.338481,
      source: "osm",
      sourceId: "node/3333758622"
    },
    {
      name: "Ривьера",
      category: "Еда",
      placeType: "food",
      description: "Ривьера — объект категории «еда» в городе Иркутск.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 52.268082,
      lng: 104.319688,
      source: "osm",
      sourceId: "node/3663363995"
    },
    {
      name: "Основателям Иркутска",
      category: "История",
      placeType: "history",
      description: "Основателям Иркутска — объект категории «история» в городе Иркутск.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 52.291125,
      lng: 104.281796,
      source: "osm",
      sourceId: "node/3711863628"
    },
    {
      name: "Subjoy",
      category: "Еда",
      placeType: "food",
      description: "Subjoy — объект категории «еда» в городе Иркутск.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 52.26342,
      lng: 104.311825,
      source: "osm",
      sourceId: "node/3808725792"
    },
    {
      name: "Старый Стамбул",
      category: "Еда",
      placeType: "food",
      description: "Старый Стамбул — объект категории «еда» в городе Иркутск.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 52.257377,
      lng: 104.328333,
      source: "osm",
      sourceId: "node/3878251595"
    },
    {
      name: "У истока",
      category: "Еда",
      placeType: "food",
      description: "У истока — объект категории «еда» в городе Иркутск.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 52.253086,
      lng: 104.363136,
      source: "osm",
      sourceId: "node/3878413572"
    },
    {
      name: "СССР",
      category: "Еда",
      placeType: "food",
      description: "СССР — объект категории «еда» в городе Иркутск.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "Иркутск, Красноярская улица, 11А",
      lat: 52.282748,
      lng: 104.330145,
      source: "osm",
      sourceId: "node/3910163571"
    },
    {
      name: "мама",
      category: "История",
      placeType: "history",
      description: "мама — объект категории «история» в городе Иркутск.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 52.327849,
      lng: 104.168712,
      source: "osm",
      sourceId: "node/4186730689"
    },
    {
      name: "Алтан",
      category: "Еда",
      placeType: "food",
      description: "Алтан — объект категории «еда» в городе Иркутск.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "Иркутск, Советская улица, 85А",
      lat: 52.280231,
      lng: 104.334076,
      source: "osm",
      sourceId: "node/4234151240"
    },
    {
      name: "Позная \"На Угольной\"",
      category: "Еда",
      placeType: "food",
      description: "Позная \"На Угольной\" — объект категории «еда» в городе Иркутск.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "Иркутск, Космический проезд, 1/1",
      lat: 52.283944,
      lng: 104.342213,
      source: "osm",
      sourceId: "node/4234192124"
    },
    {
      name: "Бууза (позная)",
      category: "Еда",
      placeType: "food",
      description: "Бууза (позная) — объект категории «еда» в городе Иркутск.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 52.271651,
      lng: 104.25831,
      source: "osm",
      sourceId: "node/4243839190"
    },
    {
      name: "Сабвэй",
      category: "Еда",
      placeType: "food",
      description: "Сабвэй — объект категории «еда» в городе Иркутск.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 52.271598,
      lng: 104.257926,
      source: "osm",
      sourceId: "node/4243839689"
    },
    {
      name: "Набережная",
      category: "Достопримечательность",
      placeType: "architecture",
      description: "Набережная — объект категории «достопримечательность» в городе Иркутск.",
      emoji: "📍",
      duration: "1-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "architecture",
        "history"
      ],
      internalTags: [
        "type:architecture",
        "interest:architecture",
        "interest:history",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 52.257035,
      lng: 104.30707,
      source: "osm",
      sourceId: "node/4248790591"
    },
    {
      name: "Нам Ням",
      category: "Еда",
      placeType: "food",
      description: "Нам Ням — объект категории «еда» в городе Иркутск.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 52.291879,
      lng: 104.24967,
      source: "osm",
      sourceId: "node/4293697989"
    },
    {
      name: "Арлекино",
      category: "Еда",
      placeType: "food",
      description: "Арлекино — объект категории «еда» в городе Иркутск.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 52.287336,
      lng: 104.309364,
      source: "osm",
      sourceId: "node/4294253290"
    },
    {
      name: "ТеRRитория Coffe",
      category: "Еда",
      placeType: "food",
      description: "ТеRRитория Coffe — объект категории «еда» в городе Иркутск.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 52.291365,
      lng: 104.30201,
      source: "osm",
      sourceId: "node/4320666704"
    }
  ],
  "новосибирск": [
    {
      name: "Героям Великой Отечественной войны",
      category: "История",
      placeType: "history",
      description: "Героям Великой Отечественной войны — объект категории «история» в городе Новосибирск.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 55.019631,
      lng: 82.923305,
      source: "osm",
      sourceId: "node/279700664"
    },
    {
      name: "Вечный огонь",
      category: "История",
      placeType: "history",
      description: "Вечный огонь — объект категории «история» в городе Новосибирск.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 54.987,
      lng: 82.874,
      source: "osm",
      sourceId: "node/280116191"
    },
    {
      name: "Памятник Покрышкину",
      category: "История",
      placeType: "history",
      description: "Памятник Покрышкину — объект категории «история» в городе Новосибирск.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 54.982231,
      lng: 82.89467,
      source: "osm",
      sourceId: "node/312009385"
    },
    {
      name: "Библиотека",
      category: "Еда",
      placeType: "food",
      description: "Библиотека — объект категории «еда» в городе Новосибирск.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 55.031964,
      lng: 82.916183,
      source: "osm",
      sourceId: "node/318186992"
    },
    {
      name: "Коляда",
      category: "Еда",
      placeType: "food",
      description: "Коляда — объект категории «еда» в городе Новосибирск.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 55.05699,
      lng: 82.891472,
      source: "osm",
      sourceId: "node/323072014"
    },
    {
      name: "Марио пицца",
      category: "Еда",
      placeType: "food",
      description: "Марио пицца — объект категории «еда» в городе Новосибирск.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 55.02509,
      lng: 82.917628,
      source: "osm",
      sourceId: "node/327399136"
    },
    {
      name: "Старая улица",
      category: "Еда",
      placeType: "food",
      description: "Старая улица — объект категории «еда» в городе Новосибирск.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 55.025065,
      lng: 82.917637,
      source: "osm",
      sourceId: "node/327399143"
    },
    {
      name: "Оливка",
      category: "Еда",
      placeType: "food",
      description: "Оливка — объект категории «еда» в городе Новосибирск.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 55.020037,
      lng: 82.922584,
      source: "osm",
      sourceId: "node/329440298"
    },
    {
      name: "Архитектору Крячкову",
      category: "История",
      placeType: "history",
      description: "Архитектору Крячкову — объект категории «история» в городе Новосибирск.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 55.020516,
      lng: 82.923907,
      source: "osm",
      sourceId: "node/329440881"
    },
    {
      name: "Фургон",
      category: "Ночная жизнь",
      placeType: "nightlife",
      description: "Фургон — объект категории «ночная жизнь» в городе Новосибирск.",
      emoji: "🍸",
      duration: "2-3 часа",
      price: "1 500–3 000 ₽",
      rating: 4.5,
      interests: [
        "nightlife",
        "food"
      ],
      internalTags: [
        "type:nightlife",
        "interest:nightlife",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "evening",
      address: "",
      lat: 54.984677,
      lng: 82.894374,
      source: "osm",
      sourceId: "node/386039614"
    },
    {
      name: "Звезда",
      category: "История",
      placeType: "history",
      description: "Звезда — объект категории «история» в городе Новосибирск.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 54.977641,
      lng: 82.896139,
      source: "osm",
      sourceId: "node/418172952"
    },
    {
      name: "Поклонный крест",
      category: "История",
      placeType: "history",
      description: "Поклонный крест — объект категории «история» в городе Новосибирск.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 54.981164,
      lng: 83.00925,
      source: "osm",
      sourceId: "node/419149699"
    },
    {
      name: "Подорожник",
      category: "Еда",
      placeType: "food",
      description: "Подорожник — объект категории «еда» в городе Новосибирск.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 55.024882,
      lng: 82.924237,
      source: "osm",
      sourceId: "node/429342796"
    },
    {
      name: "People's",
      category: "Ночная жизнь",
      placeType: "nightlife",
      description: "People's — объект категории «ночная жизнь» в городе Новосибирск.",
      emoji: "🍸",
      duration: "2-3 часа",
      price: "1 500–3 000 ₽",
      rating: 4.5,
      interests: [
        "nightlife",
        "food"
      ],
      internalTags: [
        "type:nightlife",
        "interest:nightlife",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "evening",
      address: "",
      lat: 54.982534,
      lng: 82.892219,
      source: "osm",
      sourceId: "node/517351585"
    },
    {
      name: "БирМаг",
      category: "Ночная жизнь",
      placeType: "nightlife",
      description: "БирМаг — объект категории «ночная жизнь» в городе Новосибирск.",
      emoji: "🍸",
      duration: "2-3 часа",
      price: "1 500–3 000 ₽",
      rating: 4.5,
      interests: [
        "nightlife",
        "food"
      ],
      internalTags: [
        "type:nightlife",
        "interest:nightlife",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "evening",
      address: "",
      lat: 54.982461,
      lng: 82.892047,
      source: "osm",
      sourceId: "node/517351986"
    },
    {
      name: "Кофе Хаус",
      category: "Еда",
      placeType: "food",
      description: "Кофе Хаус — объект категории «еда» в городе Новосибирск.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 54.983889,
      lng: 82.895824,
      source: "osm",
      sourceId: "node/517353442"
    },
    {
      name: "Вкусно - И Точка",
      category: "Еда",
      placeType: "food",
      description: "Вкусно - И Точка — объект категории «еда» в городе Новосибирск.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 54.9642,
      lng: 82.935662,
      source: "osm",
      sourceId: "node/517358383"
    },
    {
      name: "БМП-2",
      category: "История",
      placeType: "history",
      description: "БМП-2 — объект категории «история» в городе Новосибирск.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 54.962229,
      lng: 82.845496,
      source: "osm",
      sourceId: "node/566133024"
    },
    {
      name: "Вилка-ложка",
      category: "Еда",
      placeType: "food",
      description: "Вилка-ложка — объект категории «еда» в городе Новосибирск.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 54.838767,
      lng: 83.095944,
      source: "osm",
      sourceId: "node/567123669"
    },
    {
      name: "Пельменная",
      category: "Еда",
      placeType: "food",
      description: "Пельменная — объект категории «еда» в городе Новосибирск.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 55.034413,
      lng: 82.899134,
      source: "osm",
      sourceId: "node/570742174"
    },
    {
      name: "Подорожник",
      category: "Еда",
      placeType: "food",
      description: "Подорожник — объект категории «еда» в городе Новосибирск.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 55.03394,
      lng: 82.89858,
      source: "osm",
      sourceId: "node/571343903"
    },
    {
      name: "Хюгге",
      category: "Еда",
      placeType: "food",
      description: "Хюгге — объект категории «еда» в городе Новосибирск.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 55.024014,
      lng: 82.922567,
      source: "osm",
      sourceId: "node/575631062"
    },
    {
      name: "Блинок",
      category: "Еда",
      placeType: "food",
      description: "Блинок — объект категории «еда» в городе Новосибирск.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 55.029656,
      lng: 82.917994,
      source: "osm",
      sourceId: "node/575631102"
    },
    {
      name: "Печки-лавочки",
      category: "Еда",
      placeType: "food",
      description: "Печки-лавочки — объект категории «еда» в городе Новосибирск.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 55.029727,
      lng: 82.918675,
      source: "osm",
      sourceId: "node/575631107"
    },
    {
      name: "Рыба.Рис",
      category: "Еда",
      placeType: "food",
      description: "Рыба.Рис — объект категории «еда» в городе Новосибирск.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 54.839857,
      lng: 83.09442,
      source: "osm",
      sourceId: "node/582920594"
    },
    {
      name: "Амиго",
      category: "Еда",
      placeType: "food",
      description: "Амиго — объект категории «еда» в городе Новосибирск.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "улица Мусы Джалиля, 11",
      lat: 54.863401,
      lng: 83.089301,
      source: "osm",
      sourceId: "node/582976135"
    },
    {
      name: "Беладжо",
      category: "Еда",
      placeType: "food",
      description: "Беладжо — объект категории «еда» в городе Новосибирск.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 54.98855,
      lng: 82.897178,
      source: "osm",
      sourceId: "node/617827953"
    },
    {
      name: "О'Кей",
      category: "Активности",
      placeType: "sport",
      description: "О'Кей — объект категории «активности» в городе Новосибирск.",
      emoji: "🏃",
      duration: "2 часа",
      price: "800 ₽",
      rating: 4.5,
      interests: [
        "sport",
        "wellness"
      ],
      internalTags: [
        "type:sport",
        "interest:sport",
        "interest:wellness",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 55.156415,
      lng: 82.956206,
      source: "osm",
      sourceId: "node/618790806"
    },
    {
      name: "Памятник В.И. Ленину",
      category: "История",
      placeType: "history",
      description: "Памятник В.И. Ленину — объект категории «история» в городе Новосибирск.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 55.158791,
      lng: 82.960987,
      source: "osm",
      sourceId: "node/618791118"
    },
    {
      name: "Памятник солдатам ВОВ",
      category: "История",
      placeType: "history",
      description: "Памятник солдатам ВОВ — объект категории «история» в городе Новосибирск.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 55.159348,
      lng: 82.962033,
      source: "osm",
      sourceId: "node/618814678"
    },
    {
      name: "Beerлога",
      category: "Ночная жизнь",
      placeType: "nightlife",
      description: "Beerлога — объект категории «ночная жизнь» в городе Новосибирск.",
      emoji: "🍸",
      duration: "2-3 часа",
      price: "1 500–3 000 ₽",
      rating: 4.5,
      interests: [
        "nightlife",
        "food"
      ],
      internalTags: [
        "type:nightlife",
        "interest:nightlife",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "evening",
      address: "",
      lat: 54.989506,
      lng: 82.900312,
      source: "osm",
      sourceId: "node/620781970"
    },
    {
      name: "Хлеб и Нино",
      category: "Еда",
      placeType: "food",
      description: "Хлеб и Нино — объект категории «еда» в городе Новосибирск.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "улица Терешковой, 12А",
      lat: 54.841778,
      lng: 83.103531,
      source: "osm",
      sourceId: "node/639169021"
    },
    {
      name: "Арт П.А.Б",
      category: "Ночная жизнь",
      placeType: "nightlife",
      description: "Арт П.А.Б — объект категории «ночная жизнь» в городе Новосибирск.",
      emoji: "🍸",
      duration: "2-3 часа",
      price: "1 500–3 000 ₽",
      rating: 4.5,
      interests: [
        "nightlife",
        "food"
      ],
      internalTags: [
        "type:nightlife",
        "interest:nightlife",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "evening",
      address: "Новосибирск, улица Терешковой, 12А",
      lat: 54.841744,
      lng: 83.103451,
      source: "osm",
      sourceId: "node/639169023"
    },
    {
      name: "Кофейня",
      category: "Еда",
      placeType: "food",
      description: "Кофейня — объект категории «еда» в городе Новосибирск.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "улица Ильича, 4",
      lat: 54.838171,
      lng: 83.097174,
      source: "osm",
      sourceId: "node/644711990"
    },
    {
      name: "Солянка",
      category: "Еда",
      placeType: "food",
      description: "Солянка — объект категории «еда» в городе Новосибирск.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "улица Мусы Джалиля, 3/1",
      lat: 54.863222,
      lng: 83.090888,
      source: "osm",
      sourceId: "node/652350546"
    },
    {
      name: "Морской волк",
      category: "Еда",
      placeType: "food",
      description: "Морской волк — объект категории «еда» в городе Новосибирск.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "Полевая улица, 3",
      lat: 54.865802,
      lng: 83.098588,
      source: "osm",
      sourceId: "node/652414081"
    },
    {
      name: "Формула еды",
      category: "Еда",
      placeType: "food",
      description: "Формула еды — объект категории «еда» в городе Новосибирск.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 54.836089,
      lng: 83.108923,
      source: "osm",
      sourceId: "node/652423552"
    },
    {
      name: "ТБК Лонж",
      category: "Еда",
      placeType: "food",
      description: "ТБК Лонж — объект категории «еда» в городе Новосибирск.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "Золотодолинская улица, 11",
      lat: 54.836269,
      lng: 83.105897,
      source: "osm",
      sourceId: "node/652423578"
    },
    {
      name: "Ресторан Дома учёных СО РАН",
      category: "Еда",
      placeType: "food",
      description: "Ресторан Дома учёных СО РАН — объект категории «еда» в городе Новосибирск.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 54.836237,
      lng: 83.102651,
      source: "osm",
      sourceId: "node/652423581"
    },
    {
      name: "Музей истории и культуры народов Сибири и Дальнего Востока",
      category: "Музей",
      placeType: "museum",
      description: "Музей истории и культуры народов Сибири и Дальнего Востока — объект категории «музей» в городе Новосибирск.",
      emoji: "🏛️",
      duration: "2-3 часа",
      price: "500 ₽",
      rating: 4.5,
      interests: [
        "museums",
        "art",
        "history"
      ],
      internalTags: [
        "type:museum",
        "interest:museums",
        "interest:art",
        "interest:history",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 54.833152,
      lng: 83.103628,
      source: "osm",
      sourceId: "node/652425125"
    },
    {
      name: "Столовая НГУ",
      category: "Еда",
      placeType: "food",
      description: "Столовая НГУ — объект категории «еда» в городе Новосибирск.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 54.846494,
      lng: 83.093396,
      source: "osm",
      sourceId: "node/652425439"
    },
    {
      name: "Чашка кофе",
      category: "Еда",
      placeType: "food",
      description: "Чашка кофе — объект категории «еда» в городе Новосибирск.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "Морской проспект, 54",
      lat: 54.835233,
      lng: 83.097333,
      source: "osm",
      sourceId: "node/652432084"
    },
    {
      name: "Памятник воину-победителю в ВОВ",
      category: "История",
      placeType: "history",
      description: "Памятник воину-победителю в ВОВ — объект категории «история» в городе Новосибирск.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 55.077901,
      lng: 82.95645,
      source: "osm",
      sourceId: "node/662948447"
    },
    {
      name: "Печки-лавочки",
      category: "Еда",
      placeType: "food",
      description: "Печки-лавочки — объект категории «еда» в городе Новосибирск.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 55.038531,
      lng: 82.960512,
      source: "osm",
      sourceId: "node/663310838"
    },
    {
      name: "Паровоз \"Проворный\"",
      category: "История",
      placeType: "history",
      description: "Паровоз \"Проворный\" — объект категории «история» в городе Новосибирск.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 55.034926,
      lng: 82.89655,
      source: "osm",
      sourceId: "node/663762774"
    },
    {
      name: "Хот-доги",
      category: "Еда",
      placeType: "food",
      description: "Хот-доги — объект категории «еда» в городе Новосибирск.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 54.988456,
      lng: 82.903914,
      source: "osm",
      sourceId: "node/663927523"
    },
    {
      name: "Суши маке",
      category: "Еда",
      placeType: "food",
      description: "Суши маке — объект категории «еда» в городе Новосибирск.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 55.035235,
      lng: 83.002528,
      source: "osm",
      sourceId: "node/663950488"
    },
    {
      name: "Нью-Йорк пицца",
      category: "Еда",
      placeType: "food",
      description: "Нью-Йорк пицца — объект категории «еда» в городе Новосибирск.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 55.03502,
      lng: 83.002667,
      source: "osm",
      sourceId: "node/663950495"
    },
    {
      name: "Traveler's Coffee",
      category: "Еда",
      placeType: "food",
      description: "Traveler's Coffee — объект категории «еда» в городе Новосибирск.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "Красный проспект, 2/1",
      lat: 55.014643,
      lng: 82.926073,
      source: "osm",
      sourceId: "node/663972034"
    },
    {
      name: "Ясная поляна",
      category: "Еда",
      placeType: "food",
      description: "Ясная поляна — объект категории «еда» в городе Новосибирск.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 55.031484,
      lng: 82.968594,
      source: "osm",
      sourceId: "node/664104708"
    },
    {
      name: "шашлычная",
      category: "Еда",
      placeType: "food",
      description: "шашлычная — объект категории «еда» в городе Новосибирск.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 55.052117,
      lng: 82.893351,
      source: "osm",
      sourceId: "node/666176142"
    },
    {
      name: "Грильница",
      category: "Еда",
      placeType: "food",
      description: "Грильница — объект категории «еда» в городе Новосибирск.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 55.06031,
      lng: 82.913714,
      source: "osm",
      sourceId: "node/670456384"
    },
    {
      name: "Музей НГПУ",
      category: "Музей",
      placeType: "museum",
      description: "Музей НГПУ — объект категории «музей» в городе Новосибирск.",
      emoji: "🏛️",
      duration: "2-3 часа",
      price: "500 ₽",
      rating: 4.5,
      interests: [
        "museums",
        "art",
        "history"
      ],
      internalTags: [
        "type:museum",
        "interest:museums",
        "interest:art",
        "interest:history",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 55.000501,
      lng: 83.017933,
      source: "osm",
      sourceId: "node/670707209"
    },
    {
      name: "Краеведческий музей",
      category: "Музей",
      placeType: "museum",
      description: "Краеведческий музей — объект категории «музей» в городе Новосибирск.",
      emoji: "🏛️",
      duration: "2-3 часа",
      price: "500 ₽",
      rating: 4.5,
      interests: [
        "museums",
        "art",
        "history"
      ],
      internalTags: [
        "type:museum",
        "interest:museums",
        "interest:art",
        "interest:history",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 55.000714,
      lng: 83.018444,
      source: "osm",
      sourceId: "node/670707210"
    },
    {
      name: "IFMIEO",
      category: "Еда",
      placeType: "food",
      description: "IFMIEO — объект категории «еда» в городе Новосибирск.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 55.000135,
      lng: 83.017641,
      source: "osm",
      sourceId: "node/670707767"
    },
    {
      name: "Шафран",
      category: "Еда",
      placeType: "food",
      description: "Шафран — объект категории «еда» в городе Новосибирск.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 55.031252,
      lng: 82.912518,
      source: "osm",
      sourceId: "node/671899276"
    },
    {
      name: "People's",
      category: "Ночная жизнь",
      placeType: "nightlife",
      description: "People's — объект категории «ночная жизнь» в городе Новосибирск.",
      emoji: "🍸",
      duration: "2-3 часа",
      price: "1 500–3 000 ₽",
      rating: 4.5,
      interests: [
        "nightlife",
        "food"
      ],
      internalTags: [
        "type:nightlife",
        "interest:nightlife",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "evening",
      address: "",
      lat: 55.03157,
      lng: 82.914077,
      source: "osm",
      sourceId: "node/671899313"
    },
    {
      name: "Ангар",
      category: "Ночная жизнь",
      placeType: "nightlife",
      description: "Ангар — объект категории «ночная жизнь» в городе Новосибирск.",
      emoji: "🍸",
      duration: "2-3 часа",
      price: "1 500–3 000 ₽",
      rating: 4.5,
      interests: [
        "nightlife",
        "food"
      ],
      internalTags: [
        "type:nightlife",
        "interest:nightlife",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "evening",
      address: "",
      lat: 55.031411,
      lng: 82.914894,
      source: "osm",
      sourceId: "node/671899314"
    },
    {
      name: "Трамвайный вагон КТМ-1",
      category: "История",
      placeType: "history",
      description: "Трамвайный вагон КТМ-1 — объект категории «история» в городе Новосибирск.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 55.049984,
      lng: 82.946253,
      source: "osm",
      sourceId: "node/674092560"
    },
    {
      name: "Кофейня",
      category: "Еда",
      placeType: "food",
      description: "Кофейня — объект категории «еда» в городе Новосибирск.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "улица Мусы Джалиля, 14/1",
      lat: 54.860874,
      lng: 83.091784,
      source: "osm",
      sourceId: "node/674523480"
    },
    {
      name: "Ф.Э. Дзержинский",
      category: "История",
      placeType: "history",
      description: "Ф.Э. Дзержинский — объект категории «история» в городе Новосибирск.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 55.062097,
      lng: 82.98925,
      source: "osm",
      sourceId: "node/674930342"
    },
    {
      name: "М.А. Лаврентьеву",
      category: "История",
      placeType: "history",
      description: "М.А. Лаврентьеву — объект категории «история» в городе Новосибирск.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 54.841944,
      lng: 83.112852,
      source: "osm",
      sourceId: "node/676312584"
    },
    {
      name: "В.А. Коптюгу",
      category: "История",
      placeType: "history",
      description: "В.А. Коптюгу — объект категории «история» в городе Новосибирск.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 54.847269,
      lng: 83.107502,
      source: "osm",
      sourceId: "node/676312585"
    },
    {
      name: "5 элементов",
      category: "Еда",
      placeType: "food",
      description: "5 элементов — объект категории «еда» в городе Новосибирск.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 55.043698,
      lng: 82.939008,
      source: "osm",
      sourceId: "node/678584644"
    },
    {
      name: "Штыки",
      category: "История",
      placeType: "history",
      description: "Штыки — объект категории «история» в городе Новосибирск.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 54.964026,
      lng: 82.901325,
      source: "osm",
      sourceId: "node/679671584"
    },
    {
      name: "Скоморохи",
      category: "Еда",
      placeType: "food",
      description: "Скоморохи — объект категории «еда» в городе Новосибирск.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 55.042197,
      lng: 82.910288,
      source: "osm",
      sourceId: "node/683408949"
    },
    {
      name: "Кофемолка",
      category: "Еда",
      placeType: "food",
      description: "Кофемолка — объект категории «еда» в городе Новосибирск.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 55.042338,
      lng: 82.916605,
      source: "osm",
      sourceId: "node/683408967"
    },
    {
      name: "Танк Т-34-85",
      category: "История",
      placeType: "history",
      description: "Танк Т-34-85 — объект категории «история» в городе Новосибирск.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 54.987658,
      lng: 82.880223,
      source: "osm",
      sourceId: "node/686199475"
    },
    {
      name: "БМ-13 \"Катюша\"",
      category: "История",
      placeType: "history",
      description: "БМ-13 \"Катюша\" — объект категории «история» в городе Новосибирск.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 54.987682,
      lng: 82.880725,
      source: "osm",
      sourceId: "node/686199476"
    },
    {
      name: "Гаубица М-30",
      category: "История",
      placeType: "history",
      description: "Гаубица М-30 — объект категории «история» в городе Новосибирск.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 54.986958,
      lng: 82.880308,
      source: "osm",
      sourceId: "node/686199477"
    },
    {
      name: "Истребитель Як-9",
      category: "История",
      placeType: "history",
      description: "Истребитель Як-9 — объект категории «история» в городе Новосибирск.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 54.986989,
      lng: 82.880826,
      source: "osm",
      sourceId: "node/686199478"
    },
    {
      name: "САУ ИСУ-152",
      category: "История",
      placeType: "history",
      description: "САУ ИСУ-152 — объект категории «история» в городе Новосибирск.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 54.987706,
      lng: 82.881244,
      source: "osm",
      sourceId: "node/686199897"
    },
    {
      name: "Противотанковая пушка ЗиС-2",
      category: "История",
      placeType: "history",
      description: "Противотанковая пушка ЗиС-2 — объект категории «история» в городе Новосибирск.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 54.987028,
      lng: 82.881345,
      source: "osm",
      sourceId: "node/686199898"
    },
    {
      name: "Ассоль",
      category: "Еда",
      placeType: "food",
      description: "Ассоль — объект категории «еда» в городе Новосибирск.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 55.032434,
      lng: 82.906901,
      source: "osm",
      sourceId: "node/690406290"
    },
    {
      name: "Гудман",
      category: "Еда",
      placeType: "food",
      description: "Гудман — объект категории «еда» в городе Новосибирск.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "Новосибирск, Советская улица, 5",
      lat: 55.021769,
      lng: 82.917942,
      source: "osm",
      sourceId: "node/690657566"
    },
    {
      name: "Скамейка-шпаргалка",
      category: "Достопримечательность",
      placeType: "architecture",
      description: "Скамейка-шпаргалка — объект категории «достопримечательность» в городе Новосибирск.",
      emoji: "📍",
      duration: "1-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "architecture",
        "history"
      ],
      internalTags: [
        "type:architecture",
        "interest:architecture",
        "interest:history",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 54.843002,
      lng: 83.093067,
      source: "osm",
      sourceId: "node/697224276"
    },
    {
      name: "Баязет",
      category: "Ночная жизнь",
      placeType: "nightlife",
      description: "Баязет — объект категории «ночная жизнь» в городе Новосибирск.",
      emoji: "🍸",
      duration: "2-3 часа",
      price: "1 500–3 000 ₽",
      rating: 4.5,
      interests: [
        "nightlife",
        "food"
      ],
      internalTags: [
        "type:nightlife",
        "interest:nightlife",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "evening",
      address: "",
      lat: 54.989374,
      lng: 82.914321,
      source: "osm",
      sourceId: "node/702440672"
    },
    {
      name: "Respublica",
      category: "Ночная жизнь",
      placeType: "nightlife",
      description: "Respublica — объект категории «ночная жизнь» в городе Новосибирск.",
      emoji: "🍸",
      duration: "2-3 часа",
      price: "1 500–3 000 ₽",
      rating: 4.5,
      interests: [
        "nightlife",
        "food"
      ],
      internalTags: [
        "type:nightlife",
        "interest:nightlife",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "evening",
      address: "",
      lat: 55.036651,
      lng: 82.917221,
      source: "osm",
      sourceId: "node/737743989"
    },
    {
      name: "Каприччио",
      category: "Еда",
      placeType: "food",
      description: "Каприччио — объект категории «еда» в городе Новосибирск.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 54.999218,
      lng: 82.95948,
      source: "osm",
      sourceId: "node/750395317"
    },
    {
      name: "Самолет",
      category: "История",
      placeType: "history",
      description: "Самолет — объект категории «история» в городе Новосибирск.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 55.026636,
      lng: 82.975081,
      source: "osm",
      sourceId: "node/762293753"
    }
  ],
  "екатеринбург": [
    {
      name: "Графская пристань (остатки)",
      category: "Достопримечательность",
      placeType: "architecture",
      description: "Графская пристань (остатки) — объект категории «достопримечательность» в городе Екатеринбург.",
      emoji: "📍",
      duration: "1-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "architecture",
        "history"
      ],
      internalTags: [
        "type:architecture",
        "interest:architecture",
        "interest:history",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 56.863395,
      lng: 60.41587,
      source: "osm",
      sourceId: "node/176389851"
    },
    {
      name: "В. Н. Татищеву и В. де Геннину",
      category: "История",
      placeType: "history",
      description: "В. Н. Татищеву и В. де Геннину — объект категории «история» в городе Екатеринбург.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 56.838187,
      lng: 60.605855,
      source: "osm",
      sourceId: "node/181285908"
    },
    {
      name: "С. М. Кирову",
      category: "История",
      placeType: "history",
      description: "С. М. Кирову — объект категории «история» в городе Екатеринбург.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 56.843736,
      lng: 60.651346,
      source: "osm",
      sourceId: "node/186663360"
    },
    {
      name: "Ленин",
      category: "История",
      placeType: "history",
      description: "Ленин — объект категории «история» в городе Екатеринбург.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 56.837861,
      lng: 60.59629,
      source: "osm",
      sourceId: "node/192224751"
    },
    {
      name: "М.П. Одинцову",
      category: "История",
      placeType: "history",
      description: "М.П. Одинцову — объект категории «история» в городе Екатеринбург.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 56.844278,
      lng: 60.648427,
      source: "osm",
      sourceId: "node/223144638"
    },
    {
      name: "Европа — Азия",
      category: "История",
      placeType: "history",
      description: "Европа — Азия — объект категории «история» в городе Екатеринбург.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 56.832149,
      lng: 60.350643,
      source: "osm",
      sourceId: "node/331055232"
    },
    {
      name: "Чёрный тюльпан",
      category: "История",
      placeType: "history",
      description: "Чёрный тюльпан — объект категории «история» в городе Екатеринбург.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 56.84315,
      lng: 60.617339,
      source: "osm",
      sourceId: "node/411671596"
    },
    {
      name: "Директору УЗТМ Б. Г. Музрукову",
      category: "История",
      placeType: "history",
      description: "Директору УЗТМ Б. Г. Музрукову — объект категории «история» в городе Екатеринбург.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 56.888698,
      lng: 60.588687,
      source: "osm",
      sourceId: "node/418930382"
    },
    {
      name: "Чудо Печка",
      category: "Еда",
      placeType: "food",
      description: "Чудо Печка — объект категории «еда» в городе Екатеринбург.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 56.886768,
      lng: 60.591731,
      source: "osm",
      sourceId: "node/446061062"
    },
    {
      name: "300 лет Российскому флоту",
      category: "История",
      placeType: "history",
      description: "300 лет Российскому флоту — объект категории «история» в городе Екатеринбург.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 56.846719,
      lng: 60.600843,
      source: "osm",
      sourceId: "node/454043204"
    },
    {
      name: "Малышеву",
      category: "История",
      placeType: "history",
      description: "Малышеву — объект категории «история» в городе Екатеринбург.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 56.834212,
      lng: 60.604319,
      source: "osm",
      sourceId: "node/454056918"
    },
    {
      name: "Памятник Я.М. Свердлову",
      category: "История",
      placeType: "history",
      description: "Памятник Я.М. Свердлову — объект категории «история» в городе Екатеринбург.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 56.839815,
      lng: 60.616415,
      source: "osm",
      sourceId: "node/454103127"
    },
    {
      name: "Г. К. Жукову",
      category: "История",
      placeType: "history",
      description: "Г. К. Жукову — объект категории «история» в городе Екатеринбург.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 56.841055,
      lng: 60.624404,
      source: "osm",
      sourceId: "node/454103280"
    },
    {
      name: "Балкан-гриль",
      category: "Еда",
      placeType: "food",
      description: "Балкан-гриль — объект категории «еда» в городе Екатеринбург.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 56.84354,
      lng: 60.646761,
      source: "osm",
      sourceId: "node/455211071"
    },
    {
      name: "Музей изобразительных искусств",
      category: "Музей",
      placeType: "museum",
      description: "Музей изобразительных искусств — объект категории «музей» в городе Екатеринбург.",
      emoji: "🏛️",
      duration: "2-3 часа",
      price: "500 ₽",
      rating: 4.5,
      interests: [
        "museums",
        "art",
        "history"
      ],
      internalTags: [
        "type:museum",
        "interest:museums",
        "interest:art",
        "interest:history",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 56.835181,
      lng: 60.60324,
      source: "osm",
      sourceId: "node/457304363"
    },
    {
      name: "Добровольцам-танкистам",
      category: "История",
      placeType: "history",
      description: "Добровольцам-танкистам — объект категории «история» в городе Екатеринбург.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 56.857284,
      lng: 60.606126,
      source: "osm",
      sourceId: "node/459436046"
    },
    {
      name: "Свердлов",
      category: "История",
      placeType: "history",
      description: "Свердлов — объект категории «история» в городе Екатеринбург.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 56.856551,
      lng: 60.603801,
      source: "osm",
      sourceId: "node/459439981"
    },
    {
      name: "А. С. Пушкину",
      category: "История",
      placeType: "history",
      description: "А. С. Пушкину — объект категории «история» в городе Екатеринбург.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 56.842042,
      lng: 60.607206,
      source: "osm",
      sourceId: "node/469185996"
    },
    {
      name: "Советско-Чехословацкой дружбе",
      category: "История",
      placeType: "history",
      description: "Советско-Чехословацкой дружбе — объект категории «история» в городе Екатеринбург.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 56.837891,
      lng: 60.578682,
      source: "osm",
      sourceId: "node/469188955"
    },
    {
      name: "А. С. Попову",
      category: "История",
      placeType: "history",
      description: "А. С. Попову — объект категории «история» в городе Екатеринбург.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 56.839578,
      lng: 60.607769,
      source: "osm",
      sourceId: "node/470138069"
    },
    {
      name: "Студентам и преподавателям УПИ",
      category: "История",
      placeType: "history",
      description: "Студентам и преподавателям УПИ — объект категории «история» в городе Екатеринбург.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 56.842529,
      lng: 60.648971,
      source: "osm",
      sourceId: "node/470351900"
    },
    {
      name: "Соловьёву А.А.",
      category: "История",
      placeType: "history",
      description: "Соловьёву А.А. — объект категории «история» в городе Екатеринбург.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 56.854174,
      lng: 60.661416,
      source: "osm",
      sourceId: "node/470353054"
    },
    {
      name: "Памятник Блюхеру",
      category: "История",
      placeType: "history",
      description: "Памятник Блюхеру — объект категории «история» в городе Екатеринбург.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 56.856823,
      lng: 60.653721,
      source: "osm",
      sourceId: "node/470353430"
    },
    {
      name: "Сотрудникам органов внутренних дел погибшим на боевом посту",
      category: "История",
      placeType: "history",
      description: "Сотрудникам органов внутренних дел погибшим на боевом посту — объект категории «история» в городе Екатеринбург.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 56.845033,
      lng: 60.601704,
      source: "osm",
      sourceId: "node/470363835"
    },
    {
      name: "Ерёмин",
      category: "История",
      placeType: "history",
      description: "Ерёмин — объект категории «история» в городе Екатеринбург.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 56.849164,
      lng: 60.598666,
      source: "osm",
      sourceId: "node/470365679"
    },
    {
      name: "Воинский мемориал",
      category: "История",
      placeType: "history",
      description: "Воинский мемориал — объект категории «история» в городе Екатеринбург.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 56.815032,
      lng: 60.526298,
      source: "osm",
      sourceId: "node/471266451"
    },
    {
      name: "Готика",
      category: "Еда",
      placeType: "food",
      description: "Готика — объект категории «еда» в городе Екатеринбург.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 56.797808,
      lng: 60.63269,
      source: "osm",
      sourceId: "node/471542881"
    },
    {
      name: "The Rosy Jane",
      category: "Ночная жизнь",
      placeType: "nightlife",
      description: "The Rosy Jane — объект категории «ночная жизнь» в городе Екатеринбург.",
      emoji: "🍸",
      duration: "2-3 часа",
      price: "1 500–3 000 ₽",
      rating: 4.5,
      interests: [
        "nightlife",
        "food"
      ],
      internalTags: [
        "type:nightlife",
        "interest:nightlife",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "evening",
      address: "",
      lat: 56.837942,
      lng: 60.60802,
      source: "osm",
      sourceId: "node/473602051"
    },
    {
      name: "Дебют",
      category: "Еда",
      placeType: "food",
      description: "Дебют — объект категории «еда» в городе Екатеринбург.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 56.838709,
      lng: 60.598072,
      source: "osm",
      sourceId: "node/474653055"
    },
    {
      name: "Свердловский областной краеведческий музей",
      category: "Музей",
      placeType: "museum",
      description: "Свердловский областной краеведческий музей — объект категории «музей» в городе Екатеринбург.",
      emoji: "🏛️",
      duration: "2-3 часа",
      price: "500 ₽",
      rating: 4.5,
      interests: [
        "museums",
        "art",
        "history"
      ],
      internalTags: [
        "type:museum",
        "interest:museums",
        "interest:art",
        "interest:history",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 56.834114,
      lng: 60.602915,
      source: "osm",
      sourceId: "node/474949599"
    },
    {
      name: "Музей радио им. Попова",
      category: "Музей",
      placeType: "museum",
      description: "Музей радио им. Попова — объект категории «музей» в городе Екатеринбург.",
      emoji: "🏛️",
      duration: "2-3 часа",
      price: "500 ₽",
      rating: 4.5,
      interests: [
        "museums",
        "art",
        "history"
      ],
      internalTags: [
        "type:museum",
        "interest:museums",
        "interest:art",
        "interest:history",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 56.833251,
      lng: 60.613017,
      source: "osm",
      sourceId: "node/474949812"
    },
    {
      name: "Музей истории камнерезного и ювелирного искусства",
      category: "Музей",
      placeType: "museum",
      description: "Музей истории камнерезного и ювелирного искусства — объект категории «музей» в городе Екатеринбург.",
      emoji: "🏛️",
      duration: "2-3 часа",
      price: "500 ₽",
      rating: 4.5,
      interests: [
        "museums",
        "art",
        "history"
      ],
      internalTags: [
        "type:museum",
        "interest:museums",
        "interest:art",
        "interest:history",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 56.839087,
      lng: 60.606948,
      source: "osm",
      sourceId: "node/474949912"
    },
    {
      name: "37-му пехотному Екатеринбургскому полку",
      category: "История",
      placeType: "history",
      description: "37-му пехотному Екатеринбургскому полку — объект категории «история» в городе Екатеринбург.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 56.838956,
      lng: 60.60699,
      source: "osm",
      sourceId: "node/474949992"
    },
    {
      name: "Музей истории Екатеринбурга",
      category: "Музей",
      placeType: "museum",
      description: "Музей истории Екатеринбурга — объект категории «музей» в городе Екатеринбург.",
      emoji: "🏛️",
      duration: "2-3 часа",
      price: "500 ₽",
      rating: 4.5,
      interests: [
        "museums",
        "art",
        "history"
      ],
      internalTags: [
        "type:museum",
        "interest:museums",
        "interest:art",
        "interest:history",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 56.840729,
      lng: 60.611312,
      source: "osm",
      sourceId: "node/474950054"
    },
    {
      name: "Комсомолу Урала",
      category: "История",
      placeType: "history",
      description: "Комсомолу Урала — объект категории «история» в городе Екатеринбург.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 56.844634,
      lng: 60.610555,
      source: "osm",
      sourceId: "node/474950570"
    },
    {
      name: "Городские цветы",
      category: "Еда",
      placeType: "food",
      description: "Городские цветы — объект категории «еда» в городе Екатеринбург.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 56.831153,
      lng: 60.602825,
      source: "osm",
      sourceId: "node/474951725"
    },
    {
      name: "KFC",
      category: "Еда",
      placeType: "food",
      description: "KFC — объект категории «еда» в городе Екатеринбург.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 56.831009,
      lng: 60.601403,
      source: "osm",
      sourceId: "node/474951727"
    },
    {
      name: "Кардиган",
      category: "Еда",
      placeType: "food",
      description: "Кардиган — объект категории «еда» в городе Екатеринбург.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 56.829672,
      lng: 60.585458,
      source: "osm",
      sourceId: "node/474951728"
    },
    {
      name: "Рич",
      category: "Ночная жизнь",
      placeType: "nightlife",
      description: "Рич — объект категории «ночная жизнь» в городе Екатеринбург.",
      emoji: "🍸",
      duration: "2-3 часа",
      price: "1 500–3 000 ₽",
      rating: 4.5,
      interests: [
        "nightlife",
        "food"
      ],
      internalTags: [
        "type:nightlife",
        "interest:nightlife",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "evening",
      address: "улица Радищева, 33",
      lat: 56.829053,
      lng: 60.588734,
      source: "osm",
      sourceId: "node/474951729"
    },
    {
      name: "IL Патио",
      category: "Еда",
      placeType: "food",
      description: "IL Патио — объект категории «еда» в городе Екатеринбург.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 56.834729,
      lng: 60.599341,
      source: "osm",
      sourceId: "node/474951901"
    },
    {
      name: "Cash Flow",
      category: "Еда",
      placeType: "food",
      description: "Cash Flow — объект категории «еда» в городе Екатеринбург.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 56.835402,
      lng: 60.590943,
      source: "osm",
      sourceId: "node/474951902"
    },
    {
      name: "IL Патио",
      category: "Еда",
      placeType: "food",
      description: "IL Патио — объект категории «еда» в городе Екатеринбург.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 56.838358,
      lng: 60.581731,
      source: "osm",
      sourceId: "node/474951903"
    },
    {
      name: "Счастливые люди",
      category: "Еда",
      placeType: "food",
      description: "Счастливые люди — объект категории «еда» в городе Екатеринбург.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "Екатеринбург, проспект Ленина, 68",
      lat: 56.841728,
      lng: 60.642223,
      source: "osm",
      sourceId: "node/475949957"
    },
    {
      name: "Pizza Mia",
      category: "Еда",
      placeType: "food",
      description: "Pizza Mia — объект категории «еда» в городе Екатеринбург.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 56.84184,
      lng: 60.63761,
      source: "osm",
      sourceId: "node/475949962"
    },
    {
      name: "Вилы",
      category: "Еда",
      placeType: "food",
      description: "Вилы — объект категории «еда» в городе Екатеринбург.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 56.842655,
      lng: 60.644857,
      source: "osm",
      sourceId: "node/475949989"
    },
    {
      name: "Дудки",
      category: "Еда",
      placeType: "food",
      description: "Дудки — объект категории «еда» в городе Екатеринбург.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 56.840525,
      lng: 60.608367,
      source: "osm",
      sourceId: "node/476261045"
    },
    {
      name: "ТриО",
      category: "Еда",
      placeType: "food",
      description: "ТриО — объект категории «еда» в городе Екатеринбург.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 56.835771,
      lng: 60.600189,
      source: "osm",
      sourceId: "node/476456008"
    },
    {
      name: "Maccheroni",
      category: "Еда",
      placeType: "food",
      description: "Maccheroni — объект категории «еда» в городе Екатеринбург.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 56.838969,
      lng: 60.612474,
      source: "osm",
      sourceId: "node/491113510"
    },
    {
      name: "Поль Бейкери",
      category: "Еда",
      placeType: "food",
      description: "Поль Бейкери — объект категории «еда» в городе Екатеринбург.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 56.83361,
      lng: 60.596904,
      source: "osm",
      sourceId: "node/491113565"
    },
    {
      name: "Пан Сметан",
      category: "Ночная жизнь",
      placeType: "nightlife",
      description: "Пан Сметан — объект категории «ночная жизнь» в городе Екатеринбург.",
      emoji: "🍸",
      duration: "2-3 часа",
      price: "1 500–3 000 ₽",
      rating: 4.5,
      interests: [
        "nightlife",
        "food"
      ],
      internalTags: [
        "type:nightlife",
        "interest:nightlife",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "evening",
      address: "",
      lat: 56.834313,
      lng: 60.634249,
      source: "osm",
      sourceId: "node/491803096"
    },
    {
      name: "SteakHouse",
      category: "Еда",
      placeType: "food",
      description: "SteakHouse — объект категории «еда» в городе Екатеринбург.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 56.840874,
      lng: 60.620562,
      source: "osm",
      sourceId: "node/496173602"
    },
    {
      name: "Хмели Сунели",
      category: "Еда",
      placeType: "food",
      description: "Хмели Сунели — объект категории «еда» в городе Екатеринбург.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "Екатеринбург, проспект Ленина, 69",
      lat: 56.840902,
      lng: 60.622225,
      source: "osm",
      sourceId: "node/496173603"
    },
    {
      name: "Аллея памяти в честь 35 годовщины Победы",
      category: "История",
      placeType: "history",
      description: "Аллея памяти в честь 35 годовщины Победы — объект категории «история» в городе Екатеринбург.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 56.808664,
      lng: 60.677429,
      source: "osm",
      sourceId: "node/498847504"
    },
    {
      name: "Family House",
      category: "Еда",
      placeType: "food",
      description: "Family House — объект категории «еда» в городе Екатеринбург.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "Зимняя улица, 27",
      lat: 56.774158,
      lng: 60.64571,
      source: "osm",
      sourceId: "node/503401286"
    },
    {
      name: "Уктус",
      category: "Природа",
      placeType: "nature",
      description: "Уктус — объект категории «природа» в городе Екатеринбург.",
      emoji: "🌄",
      duration: "2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "nature"
      ],
      internalTags: [
        "type:nature",
        "interest:nature",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 56.770359,
      lng: 60.648626,
      source: "osm",
      sourceId: "node/503401342"
    },
    {
      name: "Шарташские каменные палатки",
      category: "Природа",
      placeType: "nature",
      description: "Шарташские каменные палатки — объект категории «природа» в городе Екатеринбург.",
      emoji: "🌄",
      duration: "2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "nature"
      ],
      internalTags: [
        "type:nature",
        "interest:nature",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 56.843041,
      lng: 60.678644,
      source: "osm",
      sourceId: "node/504394251"
    },
    {
      name: "Кировское",
      category: "Еда",
      placeType: "food",
      description: "Кировское — объект категории «еда» в городе Екатеринбург.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 56.850497,
      lng: 60.684204,
      source: "osm",
      sourceId: "node/514618908"
    },
    {
      name: "Шарташ",
      category: "Еда",
      placeType: "food",
      description: "Шарташ — объект категории «еда» в городе Екатеринбург.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 56.862564,
      lng: 60.689136,
      source: "osm",
      sourceId: "node/515663595"
    },
    {
      name: "Школа виндсёрфинга и кайтинга",
      category: "Активности",
      placeType: "sport",
      description: "Школа виндсёрфинга и кайтинга — объект категории «активности» в городе Екатеринбург.",
      emoji: "🏃",
      duration: "2 часа",
      price: "800 ₽",
      rating: 4.5,
      interests: [
        "sport",
        "wellness"
      ],
      internalTags: [
        "type:sport",
        "interest:sport",
        "interest:wellness",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 56.849869,
      lng: 60.715317,
      source: "osm",
      sourceId: "node/518496323"
    },
    {
      name: "Лесничка",
      category: "Природа",
      placeType: "nature",
      description: "Лесничка — объект категории «природа» в городе Екатеринбург.",
      emoji: "🌄",
      duration: "2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "nature"
      ],
      internalTags: [
        "type:nature",
        "interest:nature",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 56.785992,
      lng: 60.572569,
      source: "osm",
      sourceId: "node/528045080"
    },
    {
      name: "Седой Урал",
      category: "История",
      placeType: "history",
      description: "Седой Урал — объект категории «история» в городе Екатеринбург.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 56.823173,
      lng: 60.629292,
      source: "osm",
      sourceId: "node/533559606"
    },
    {
      name: "Золотая середина",
      category: "Еда",
      placeType: "food",
      description: "Золотая середина — объект категории «еда» в городе Екатеринбург.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 56.761054,
      lng: 60.803114,
      source: "osm",
      sourceId: "node/538132691"
    },
    {
      name: "Памятный камень",
      category: "История",
      placeType: "history",
      description: "Памятный камень — объект категории «история» в городе Екатеринбург.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 56.81126,
      lng: 60.673924,
      source: "osm",
      sourceId: "node/539653248"
    },
    {
      name: "Никита",
      category: "Еда",
      placeType: "food",
      description: "Никита — объект категории «еда» в городе Екатеринбург.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "Екатеринбург, улица Коминтерна, 5",
      lat: 56.837336,
      lng: 60.656648,
      source: "osm",
      sourceId: "node/563963842"
    },
    {
      name: "Танк Т-34-85",
      category: "История",
      placeType: "history",
      description: "Танк Т-34-85 — объект категории «история» в городе Екатеринбург.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 56.901664,
      lng: 60.567726,
      source: "osm",
      sourceId: "node/568515246"
    },
    {
      name: "Краеведческий музей",
      category: "Музей",
      placeType: "museum",
      description: "Краеведческий музей — объект категории «музей» в городе Екатеринбург.",
      emoji: "🏛️",
      duration: "2-3 часа",
      price: "500 ₽",
      rating: 4.5,
      interests: [
        "museums",
        "art",
        "history"
      ],
      internalTags: [
        "type:museum",
        "interest:museums",
        "interest:art",
        "interest:history",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 56.840853,
      lng: 60.622421,
      source: "osm",
      sourceId: "node/571136731"
    },
    {
      name: "Макдоналдс",
      category: "Еда",
      placeType: "food",
      description: "Макдоналдс — объект категории «еда» в городе Екатеринбург.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 56.816079,
      lng: 60.586319,
      source: "osm",
      sourceId: "node/571138406"
    },
    {
      name: "Памятник дятловцам",
      category: "История",
      placeType: "history",
      description: "Памятник дятловцам — объект категории «история» в городе Екатеринбург.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 56.849897,
      lng: 60.642293,
      source: "osm",
      sourceId: "node/573386418"
    },
    {
      name: "Воинам, умершим от ран в 1941-1943 г.",
      category: "История",
      placeType: "history",
      description: "Воинам, умершим от ран в 1941-1943 г. — объект категории «история» в городе Екатеринбург.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 56.849624,
      lng: 60.639738,
      source: "osm",
      sourceId: "node/573394920"
    },
    {
      name: "Глухомань",
      category: "Еда",
      placeType: "food",
      description: "Глухомань — объект категории «еда» в городе Екатеринбург.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 56.798075,
      lng: 60.598429,
      source: "osm",
      sourceId: "node/579373272"
    },
    {
      name: "Тёплые коты",
      category: "Еда",
      placeType: "food",
      description: "Тёплые коты — объект категории «еда» в городе Екатеринбург.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 56.84012,
      lng: 60.546658,
      source: "osm",
      sourceId: "node/585857565"
    },
    {
      name: "ЦКиИ Верх-Исетский",
      category: "Достопримечательность",
      placeType: "other",
      description: "ЦКиИ Верх-Исетский — объект категории «достопримечательность» в городе Екатеринбург.",
      emoji: "📍",
      duration: "1.5 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history"
      ],
      internalTags: [
        "type:other",
        "interest:history",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 56.838457,
      lng: 60.554371,
      source: "osm",
      sourceId: "node/586032285"
    },
    {
      name: "СЦ Верх-Исетский",
      category: "Активности",
      placeType: "sport",
      description: "СЦ Верх-Исетский — объект категории «активности» в городе Екатеринбург.",
      emoji: "🏃",
      duration: "2 часа",
      price: "800 ₽",
      rating: 4.5,
      interests: [
        "sport",
        "wellness"
      ],
      internalTags: [
        "type:sport",
        "interest:sport",
        "interest:wellness",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 56.839631,
      lng: 60.550841,
      source: "osm",
      sourceId: "node/586032289"
    },
    {
      name: "Планета Суши",
      category: "Еда",
      placeType: "food",
      description: "Планета Суши — объект категории «еда» в городе Екатеринбург.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 56.838044,
      lng: 60.581861,
      source: "osm",
      sourceId: "node/586185532"
    },
    {
      name: "Планета Суши",
      category: "Еда",
      placeType: "food",
      description: "Планета Суши — объект категории «еда» в городе Екатеринбург.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 56.834927,
      lng: 60.599282,
      source: "osm",
      sourceId: "node/586185546"
    },
    {
      name: "Нигора",
      category: "Еда",
      placeType: "food",
      description: "Нигора — объект категории «еда» в городе Екатеринбург.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 56.826941,
      lng: 60.599369,
      source: "osm",
      sourceId: "node/586185554"
    },
    {
      name: "Чёртово Городище",
      category: "Природа",
      placeType: "nature",
      description: "Чёртово Городище — объект категории «природа» в городе Екатеринбург.",
      emoji: "🌄",
      duration: "2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "nature"
      ],
      internalTags: [
        "type:nature",
        "interest:nature",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 56.941547,
      lng: 60.347054,
      source: "osm",
      sourceId: "node/588364949"
    },
    {
      name: "Крест в память жертв репрессий",
      category: "История",
      placeType: "history",
      description: "Крест в память жертв репрессий — объект категории «история» в городе Екатеринбург.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 56.828064,
      lng: 60.431354,
      source: "osm",
      sourceId: "node/588384808"
    },
    {
      name: "Мак Пик",
      category: "Еда",
      placeType: "food",
      description: "Мак Пик — объект категории «еда» в городе Екатеринбург.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 56.831342,
      lng: 60.59707,
      source: "osm",
      sourceId: "node/588996526"
    },
    {
      name: "Вкусно — и точка",
      category: "Еда",
      placeType: "food",
      description: "Вкусно — и точка — объект категории «еда» в городе Екатеринбург.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 56.824232,
      lng: 60.504823,
      source: "osm",
      sourceId: "node/601638024"
    }
  ],
  "нижний-новгород": [
    {
      name: "М. Горькому",
      category: "История",
      placeType: "history",
      description: "М. Горькому — объект категории «история» в городе Нижний Новгород.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 56.31348,
      lng: 43.990713,
      source: "osm",
      sourceId: "node/262652256"
    },
    {
      name: "Козьме Минину",
      category: "История",
      placeType: "history",
      description: "Козьме Минину — объект категории «история» в городе Нижний Новгород.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 56.326768,
      lng: 44.006882,
      source: "osm",
      sourceId: "node/262652496"
    },
    {
      name: "В. П. Чкалову",
      category: "История",
      placeType: "history",
      description: "В. П. Чкалову — объект категории «история» в городе Нижний Новгород.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 56.33003,
      lng: 44.009419,
      source: "osm",
      sourceId: "node/262652551"
    },
    {
      name: "Максиму Горькому",
      category: "История",
      placeType: "history",
      description: "Максиму Горькому — объект категории «история» в городе Нижний Новгород.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 56.32446,
      lng: 43.983497,
      source: "osm",
      sourceId: "node/479501527"
    },
    {
      name: "Ф. В. Плотникову",
      category: "История",
      placeType: "history",
      description: "Ф. В. Плотникову — объект категории «история» в городе Нижний Новгород.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 56.260622,
      lng: 43.859961,
      source: "osm",
      sourceId: "node/494398340"
    },
    {
      name: "Героям-краснодонцам",
      category: "История",
      placeType: "history",
      description: "Героям-краснодонцам — объект категории «история» в городе Нижний Новгород.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 56.244533,
      lng: 43.848764,
      source: "osm",
      sourceId: "node/494862118"
    },
    {
      name: "Нижегородцам, павшим в Афганистане и Чечне",
      category: "История",
      placeType: "history",
      description: "Нижегородцам, павшим в Афганистане и Чечне — объект категории «история» в городе Нижний Новгород.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 56.271869,
      lng: 43.974563,
      source: "osm",
      sourceId: "node/497277234"
    },
    {
      name: "Лопасть рабочего колеса гидравлической турбины Горьковской ГЭС",
      category: "История",
      placeType: "history",
      description: "Лопасть рабочего колеса гидравлической турбины Горьковской ГЭС — объект категории «история» в городе Нижний Новгород.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 56.318685,
      lng: 43.987136,
      source: "osm",
      sourceId: "node/597408721"
    },
    {
      name: "Павшим студентам и преподавателям ГИСИ",
      category: "История",
      placeType: "history",
      description: "Павшим студентам и преподавателям ГИСИ — объект категории «история» в городе Нижний Новгород.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 56.31923,
      lng: 43.987063,
      source: "osm",
      sourceId: "node/597408727"
    },
    {
      name: "Вкусно — и точка",
      category: "Еда",
      placeType: "food",
      description: "Вкусно — и точка — объект категории «еда» в городе Нижний Новгород.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 56.315464,
      lng: 43.991568,
      source: "osm",
      sourceId: "node/601268264"
    },
    {
      name: "Столовая НГТУ",
      category: "Еда",
      placeType: "food",
      description: "Столовая НГТУ — объект категории «еда» в городе Нижний Новгород.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 56.326249,
      lng: 44.026237,
      source: "osm",
      sourceId: "node/610280711"
    },
    {
      name: "Додо пицца",
      category: "Еда",
      placeType: "food",
      description: "Додо пицца — объект категории «еда» в городе Нижний Новгород.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 56.317364,
      lng: 43.995394,
      source: "osm",
      sourceId: "node/610285182"
    },
    {
      name: "Biblioteca",
      category: "Еда",
      placeType: "food",
      description: "Biblioteca — объект категории «еда» в городе Нижний Новгород.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 56.317089,
      lng: 43.995359,
      source: "osm",
      sourceId: "node/610285265"
    },
    {
      name: "Столовая НИУ",
      category: "Еда",
      placeType: "food",
      description: "Столовая НИУ — объект категории «еда» в городе Нижний Новгород.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 56.305282,
      lng: 43.990207,
      source: "osm",
      sourceId: "node/610297987"
    },
    {
      name: "Едок",
      category: "Еда",
      placeType: "food",
      description: "Едок — объект категории «еда» в городе Нижний Новгород.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 56.320782,
      lng: 43.947574,
      source: "osm",
      sourceId: "node/610304028"
    },
    {
      name: "Едок",
      category: "Еда",
      placeType: "food",
      description: "Едок — объект категории «еда» в городе Нижний Новгород.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 56.306702,
      lng: 43.983108,
      source: "osm",
      sourceId: "node/610305990"
    },
    {
      name: "Штолле",
      category: "Еда",
      placeType: "food",
      description: "Штолле — объект категории «еда» в городе Нижний Новгород.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 56.325593,
      lng: 44.00574,
      source: "osm",
      sourceId: "node/610322222"
    },
    {
      name: "Бронепоезд",
      category: "История",
      placeType: "history",
      description: "Бронепоезд — объект категории «история» в городе Нижний Новгород.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 56.311081,
      lng: 43.945856,
      source: "osm",
      sourceId: "node/610534295"
    },
    {
      name: "Минину и Пожарскому",
      category: "История",
      placeType: "history",
      description: "Минину и Пожарскому — объект категории «история» в городе Нижний Новгород.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 56.329866,
      lng: 43.996891,
      source: "osm",
      sourceId: "node/611572059"
    },
    {
      name: "Нестеров П.Н.",
      category: "История",
      placeType: "history",
      description: "Нестеров П.Н. — объект категории «история» в городе Нижний Новгород.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 56.328549,
      lng: 44.019068,
      source: "osm",
      sourceId: "node/611577989"
    },
    {
      name: "Чайхана \"Тюбетейка\"",
      category: "Еда",
      placeType: "food",
      description: "Чайхана \"Тюбетейка\" — объект категории «еда» в городе Нижний Новгород.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 56.327343,
      lng: 43.983802,
      source: "osm",
      sourceId: "node/611852983"
    },
    {
      name: "Карамель",
      category: "Еда",
      placeType: "food",
      description: "Карамель — объект категории «еда» в городе Нижний Новгород.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 56.311848,
      lng: 43.99067,
      source: "osm",
      sourceId: "node/611852999"
    },
    {
      name: "Корчма \"Весёлая кума\"",
      category: "Еда",
      placeType: "food",
      description: "Корчма \"Весёлая кума\" — объект категории «еда» в городе Нижний Новгород.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 56.312013,
      lng: 43.990658,
      source: "osm",
      sourceId: "node/611853002"
    },
    {
      name: "Столовая бизнес-центра",
      category: "Еда",
      placeType: "food",
      description: "Столовая бизнес-центра — объект категории «еда» в городе Нижний Новгород.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 56.313087,
      lng: 44.001049,
      source: "osm",
      sourceId: "node/611853003"
    },
    {
      name: "Чико",
      category: "Еда",
      placeType: "food",
      description: "Чико — объект категории «еда» в городе Нижний Новгород.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 56.318044,
      lng: 43.996867,
      source: "osm",
      sourceId: "node/611853110"
    },
    {
      name: "Мемориальный комплекс \"Танки \"Борец за свободу товарищ Ленин\" и Т-34\"",
      category: "История",
      placeType: "history",
      description: "Мемориальный комплекс \"Танки \"Борец за свободу товарищ Ленин\" и Т-34\" — объект категории «история» в городе Нижний Новгород.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 56.362236,
      lng: 43.86296,
      source: "osm",
      sourceId: "node/627857849"
    },
    {
      name: "Шашлычная N2",
      category: "Еда",
      placeType: "food",
      description: "Шашлычная N2 — объект категории «еда» в городе Нижний Новгород.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 56.249862,
      lng: 43.852405,
      source: "osm",
      sourceId: "node/633532018"
    },
    {
      name: "Соло",
      category: "Еда",
      placeType: "food",
      description: "Соло — объект категории «еда» в городе Нижний Новгород.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 56.249393,
      lng: 43.8584,
      source: "osm",
      sourceId: "node/633532050"
    },
    {
      name: "Чкалову",
      category: "История",
      placeType: "history",
      description: "Чкалову — объект категории «история» в городе Нижний Новгород.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 56.389207,
      lng: 43.76133,
      source: "osm",
      sourceId: "node/639150761"
    },
    {
      name: "барельеф",
      category: "История",
      placeType: "history",
      description: "барельеф — объект категории «история» в городе Нижний Новгород.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 56.356832,
      lng: 43.86535,
      source: "osm",
      sourceId: "node/678400875"
    },
    {
      name: "Набатный колокол",
      category: "История",
      placeType: "history",
      description: "Набатный колокол — объект категории «история» в городе Нижний Новгород.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 56.32939,
      lng: 43.998503,
      source: "osm",
      sourceId: "node/695152386"
    },
    {
      name: "Закусочная \"Три пескаря\"",
      category: "Ночная жизнь",
      placeType: "nightlife",
      description: "Закусочная \"Три пескаря\" — объект категории «ночная жизнь» в городе Нижний Новгород.",
      emoji: "🍸",
      duration: "2-3 часа",
      price: "1 500–3 000 ₽",
      rating: 4.5,
      interests: [
        "nightlife",
        "food"
      ],
      internalTags: [
        "type:nightlife",
        "interest:nightlife",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "evening",
      address: "",
      lat: 56.274917,
      lng: 43.940891,
      source: "osm",
      sourceId: "node/853630032"
    },
    {
      name: "Скоропечатная мастерская М.И. Свердлова",
      category: "История",
      placeType: "history",
      description: "Скоропечатная мастерская М.И. Свердлова — объект категории «история» в городе Нижний Новгород.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 56.324404,
      lng: 44.003074,
      source: "osm",
      sourceId: "node/925666793"
    },
    {
      name: "Я. М. Свердлову",
      category: "История",
      placeType: "history",
      description: "Я. М. Свердлову — объект категории «история» в городе Нижний Новгород.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 56.321663,
      lng: 44.000487,
      source: "osm",
      sourceId: "node/925666794"
    },
    {
      name: "Спарта",
      category: "Активности",
      placeType: "sport",
      description: "Спарта — объект категории «активности» в городе Нижний Новгород.",
      emoji: "🏃",
      duration: "2 часа",
      price: "800 ₽",
      rating: 4.5,
      interests: [
        "sport",
        "wellness"
      ],
      internalTags: [
        "type:sport",
        "interest:sport",
        "interest:wellness",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 56.286898,
      lng: 44.077417,
      source: "osm",
      sourceId: "node/930348305"
    },
    {
      name: "Garden",
      category: "Еда",
      placeType: "food",
      description: "Garden — объект категории «еда» в городе Нижний Новгород.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 56.287073,
      lng: 44.077348,
      source: "osm",
      sourceId: "node/930349289"
    },
    {
      name: "Кафе",
      category: "Еда",
      placeType: "food",
      description: "Кафе — объект категории «еда» в городе Нижний Новгород.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 56.299512,
      lng: 44.075324,
      source: "osm",
      sourceId: "node/941872333"
    },
    {
      name: "До ре ми",
      category: "Еда",
      placeType: "food",
      description: "До ре ми — объект категории «еда» в городе Нижний Новгород.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 56.293708,
      lng: 43.978386,
      source: "osm",
      sourceId: "node/975872168"
    },
    {
      name: "Fitness Life",
      category: "Активности",
      placeType: "sport",
      description: "Fitness Life — объект категории «активности» в городе Нижний Новгород.",
      emoji: "🏃",
      duration: "2 часа",
      price: "800 ₽",
      rating: 4.5,
      interests: [
        "sport",
        "wellness"
      ],
      internalTags: [
        "type:sport",
        "interest:sport",
        "interest:wellness",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 56.29393,
      lng: 43.979106,
      source: "osm",
      sourceId: "node/975872169"
    },
    {
      name: "Чёрная жемчужина",
      category: "Еда",
      placeType: "food",
      description: "Чёрная жемчужина — объект категории «еда» в городе Нижний Новгород.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 56.290538,
      lng: 43.984487,
      source: "osm",
      sourceId: "node/977644923"
    },
    {
      name: "Николай I",
      category: "История",
      placeType: "history",
      description: "Николай I — объект категории «история» в городе Нижний Новгород.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 56.330621,
      lng: 44.017015,
      source: "osm",
      sourceId: "node/979462188"
    },
    {
      name: "Ростиславу Алексееву",
      category: "История",
      placeType: "history",
      description: "Ростиславу Алексееву — объект категории «история» в городе Нижний Новгород.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 56.347611,
      lng: 43.868601,
      source: "osm",
      sourceId: "node/982787301"
    },
    {
      name: "Судно на подводных крыльях \"Метеор\"",
      category: "История",
      placeType: "history",
      description: "Судно на подводных крыльях \"Метеор\" — объект категории «история» в городе Нижний Новгород.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 56.344585,
      lng: 43.863995,
      source: "osm",
      sourceId: "node/982787326"
    },
    {
      name: "Танк Т-34",
      category: "История",
      placeType: "history",
      description: "Танк Т-34 — объект категории «история» в городе Нижний Новгород.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 56.328637,
      lng: 44.000067,
      source: "osm",
      sourceId: "node/994364730"
    },
    {
      name: "Истребитель ЛА-7",
      category: "История",
      placeType: "history",
      description: "Истребитель ЛА-7 — объект категории «история» в городе Нижний Новгород.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 56.327226,
      lng: 44.004802,
      source: "osm",
      sourceId: "node/994364733"
    },
    {
      name: "Рубка подводной лодки С-13",
      category: "История",
      placeType: "history",
      description: "Рубка подводной лодки С-13 — объект категории «история» в городе Нижний Новгород.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 56.32698,
      lng: 44.003992,
      source: "osm",
      sourceId: "node/994449607"
    },
    {
      name: "Основателям города",
      category: "История",
      placeType: "history",
      description: "Основателям города — объект категории «история» в городе Нижний Новгород.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 56.327957,
      lng: 44.001977,
      source: "osm",
      sourceId: "node/994449615"
    },
    {
      name: "К. Минин",
      category: "История",
      placeType: "history",
      description: "К. Минин — объект категории «история» в городе Нижний Новгород.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 56.328815,
      lng: 44.008863,
      source: "osm",
      sourceId: "node/995772435"
    },
    {
      name: "Героям-комсомольцам, погибшим в годы Гражданской и Великой Отечественной войн",
      category: "История",
      placeType: "history",
      description: "Героям-комсомольцам, погибшим в годы Гражданской и Великой Отечественной войн — объект категории «история» в городе Нижний Новгород.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 56.310358,
      lng: 43.943462,
      source: "osm",
      sourceId: "node/1001227309"
    },
    {
      name: "Жертвам чернобыльской катастрофы",
      category: "История",
      placeType: "history",
      description: "Жертвам чернобыльской катастрофы — объект категории «история» в городе Нижний Новгород.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 56.330579,
      lng: 43.955899,
      source: "osm",
      sourceId: "node/1037008279"
    },
    {
      name: "Мир Пиццы",
      category: "Еда",
      placeType: "food",
      description: "Мир Пиццы — объект категории «еда» в городе Нижний Новгород.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "улица Максима Горького, 158",
      lat: 56.316992,
      lng: 44.008703,
      source: "osm",
      sourceId: "node/1056634097"
    },
    {
      name: "Мама дома",
      category: "Еда",
      placeType: "food",
      description: "Мама дома — объект категории «еда» в городе Нижний Новгород.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "улица Максима Горького, 156",
      lat: 56.316784,
      lng: 44.007634,
      source: "osm",
      sourceId: "node/1056903074"
    },
    {
      name: "Мир Пиццы",
      category: "Еда",
      placeType: "food",
      description: "Мир Пиццы — объект категории «еда» в городе Нижний Новгород.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 56.316506,
      lng: 44.019626,
      source: "osm",
      sourceId: "node/1056933605"
    },
    {
      name: "Жертвам и мученикам революции 1905 года",
      category: "История",
      placeType: "history",
      description: "Жертвам и мученикам революции 1905 года — объект категории «история» в городе Нижний Новгород.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 56.31684,
      lng: 44.01601,
      source: "osm",
      sourceId: "node/1056966401"
    },
    {
      name: "И. П. Кулибину",
      category: "История",
      placeType: "history",
      description: "И. П. Кулибину — объект категории «история» в городе Нижний Новгород.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 56.315104,
      lng: 44.006044,
      source: "osm",
      sourceId: "node/1061662241"
    },
    {
      name: "Улей",
      category: "Еда",
      placeType: "food",
      description: "Улей — объект категории «еда» в городе Нижний Новгород.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 56.321576,
      lng: 44.009289,
      source: "osm",
      sourceId: "node/1061841261"
    },
    {
      name: "Вечный огонь",
      category: "История",
      placeType: "history",
      description: "Вечный огонь — объект категории «история» в городе Нижний Новгород.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 56.329738,
      lng: 43.850037,
      source: "osm",
      sourceId: "node/1104343410"
    },
    {
      name: "Орджоникидзе",
      category: "История",
      placeType: "history",
      description: "Орджоникидзе — объект категории «история» в городе Нижний Новгород.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 56.32827,
      lng: 43.858066,
      source: "osm",
      sourceId: "node/1104343613"
    },
    {
      name: "МИГ-17",
      category: "История",
      placeType: "history",
      description: "МИГ-17 — объект категории «история» в городе Нижний Новгород.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 56.334586,
      lng: 43.848576,
      source: "osm",
      sourceId: "node/1104350858"
    },
    {
      name: "столовая",
      category: "Еда",
      placeType: "food",
      description: "столовая — объект категории «еда» в городе Нижний Новгород.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 56.334854,
      lng: 43.813016,
      source: "osm",
      sourceId: "node/1107326086"
    },
    {
      name: "Айвенго",
      category: "Еда",
      placeType: "food",
      description: "Айвенго — объект категории «еда» в городе Нижний Новгород.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 56.332385,
      lng: 43.847014,
      source: "osm",
      sourceId: "node/1107390345"
    },
    {
      name: "Пляж",
      category: "Еда",
      placeType: "food",
      description: "Пляж — объект категории «еда» в городе Нижний Новгород.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 56.334684,
      lng: 43.854687,
      source: "osm",
      sourceId: "node/1108836087"
    },
    {
      name: "Сормовская организация большевиков",
      category: "История",
      placeType: "history",
      description: "Сормовская организация большевиков — объект категории «история» в городе Нижний Новгород.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 56.352641,
      lng: 43.866682,
      source: "osm",
      sourceId: "node/1117370630"
    },
    {
      name: "Н. К. Крупской",
      category: "История",
      placeType: "history",
      description: "Н. К. Крупской — объект категории «история» в городе Нижний Новгород.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 56.34947,
      lng: 43.865493,
      source: "osm",
      sourceId: "node/1117371337"
    },
    {
      name: "В. Ф. Овчинникову",
      category: "История",
      placeType: "history",
      description: "В. Ф. Овчинникову — объект категории «история» в городе Нижний Новгород.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 56.350762,
      lng: 43.868105,
      source: "osm",
      sourceId: "node/1128620721"
    },
    {
      name: "А. П. Удалову",
      category: "История",
      placeType: "history",
      description: "А. П. Удалову — объект категории «история» в городе Нижний Новгород.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 56.353065,
      lng: 43.863016,
      source: "osm",
      sourceId: "node/1128621459"
    },
    {
      name: "Бармалей",
      category: "Ночная жизнь",
      placeType: "nightlife",
      description: "Бармалей — объект категории «ночная жизнь» в городе Нижний Новгород.",
      emoji: "🍸",
      duration: "2-3 часа",
      price: "1 500–3 000 ₽",
      rating: 4.5,
      interests: [
        "nightlife",
        "food"
      ],
      internalTags: [
        "type:nightlife",
        "interest:nightlife",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "evening",
      address: "",
      lat: 56.330718,
      lng: 43.842807,
      source: "osm",
      sourceId: "node/1153141878"
    },
    {
      name: "Пивная гавань",
      category: "Ночная жизнь",
      placeType: "nightlife",
      description: "Пивная гавань — объект категории «ночная жизнь» в городе Нижний Новгород.",
      emoji: "🍸",
      duration: "2-3 часа",
      price: "1 500–3 000 ₽",
      rating: 4.5,
      interests: [
        "nightlife",
        "food"
      ],
      internalTags: [
        "type:nightlife",
        "interest:nightlife",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "evening",
      address: "",
      lat: 56.332614,
      lng: 43.848177,
      source: "osm",
      sourceId: "node/1153141889"
    },
    {
      name: "Неолит",
      category: "Еда",
      placeType: "food",
      description: "Неолит — объект категории «еда» в городе Нижний Новгород.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 56.343082,
      lng: 43.835958,
      source: "osm",
      sourceId: "node/1157924796"
    },
    {
      name: "Источник",
      category: "Еда",
      placeType: "food",
      description: "Источник — объект категории «еда» в городе Нижний Новгород.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 56.343634,
      lng: 43.836025,
      source: "osm",
      sourceId: "node/1157925202"
    },
    {
      name: "Птичье Молоко",
      category: "Еда",
      placeType: "food",
      description: "Птичье Молоко — объект категории «еда» в городе Нижний Новгород.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 56.344138,
      lng: 43.856746,
      source: "osm",
      sourceId: "node/1166965454"
    },
    {
      name: "Алые паруса",
      category: "Еда",
      placeType: "food",
      description: "Алые паруса — объект категории «еда» в городе Нижний Новгород.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 56.365748,
      lng: 43.822833,
      source: "osm",
      sourceId: "node/1193038579"
    },
    {
      name: "Сова",
      category: "Еда",
      placeType: "food",
      description: "Сова — объект категории «еда» в городе Нижний Новгород.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 56.285217,
      lng: 43.92993,
      source: "osm",
      sourceId: "node/1214658915"
    },
    {
      name: "Не горюй",
      category: "Еда",
      placeType: "food",
      description: "Не горюй — объект категории «еда» в городе Нижний Новгород.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 56.280667,
      lng: 44.080133,
      source: "osm",
      sourceId: "node/1228054566"
    },
    {
      name: "Белый попугай",
      category: "Еда",
      placeType: "food",
      description: "Белый попугай — объект категории «еда» в городе Нижний Новгород.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 56.279341,
      lng: 44.080991,
      source: "osm",
      sourceId: "node/1228054587"
    },
    {
      name: "У Александра",
      category: "Еда",
      placeType: "food",
      description: "У Александра — объект категории «еда» в городе Нижний Новгород.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 56.321322,
      lng: 44.064498,
      source: "osm",
      sourceId: "node/1228982954"
    },
    {
      name: "АВС Cafe",
      category: "Еда",
      placeType: "food",
      description: "АВС Cafe — объект категории «еда» в городе Нижний Новгород.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 56.315658,
      lng: 44.069069,
      source: "osm",
      sourceId: "node/1238462207"
    },
    {
      name: "Участникам первых маёвок",
      category: "История",
      placeType: "history",
      description: "Участникам первых маёвок — объект категории «история» в городе Нижний Новгород.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 56.256899,
      lng: 43.97062,
      source: "osm",
      sourceId: "node/1243276402"
    },
    {
      name: "Макет самолёта \"Ньюпор\"",
      category: "История",
      placeType: "history",
      description: "Макет самолёта \"Ньюпор\" — объект категории «история» в городе Нижний Новгород.",
      emoji: "🏰",
      duration: "1.5-2 часа",
      price: "Бесплатно",
      rating: 4.5,
      interests: [
        "history",
        "architecture"
      ],
      internalTags: [
        "type:history",
        "interest:history",
        "interest:architecture",
        "source:osm"
      ],
      timeSlot: "morning",
      address: "",
      lat: 56.329243,
      lng: 44.019108,
      source: "osm",
      sourceId: "node/1248877770"
    },
    {
      name: "Goden House",
      category: "Еда",
      placeType: "food",
      description: "Goden House — объект категории «еда» в городе Нижний Новгород.",
      emoji: "🍽️",
      duration: "1.5 часа",
      price: "1 000–2 000 ₽",
      rating: 4.5,
      interests: [
        "food"
      ],
      internalTags: [
        "type:food",
        "interest:food",
        "source:osm"
      ],
      timeSlot: "afternoon",
      address: "",
      lat: 56.316292,
      lng: 43.867914,
      source: "osm",
      sourceId: "node/1289262357"
    }
  ]
};
