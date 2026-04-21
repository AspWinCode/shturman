/**
 * Сервис построения deep-link'ов для Tutu.ru и Яндекс Путешествий.
 * Партнёрские ссылки — пользователь нажимает и переходит на сайт для покупки.
 */

// ─── Яндекс: ID городов (геобаза) ────────────────────────────────────────────

const YANDEX_CITY_IDS: Record<string, string> = {
  'Москва': 'c213',
  'Санкт-Петербург': 'c2',
  'Казань': 'c43',
  'Сочи': 'c239',
  'Екатеринбург': 'c54',
  'Новосибирск': 'c65',
  'Владивосток': 'c75',
  'Калининград': 'c22',
  'Нижний Новгород': 'c47',
  'Краснодар': 'c35',
  'Ростов-на-Дону': 'c39',
  'Уфа': 'c172',
  'Самара': 'c51',
  'Пермь': 'c50',
  'Красноярск': 'c62',
  'Омск': 'c66',
  'Иркутск': 'c63',
  'Хабаровск': 'c76',
  'Минеральные Воды': 'c25',
  'Мурманск': 'c23',
  'Архангельск': 'c20',
  'Барнаул': 'c197',
  'Тюмень': 'c55',
  'Анапа': 'c971',
  'Геленджик': 'c970',
  'Симферополь': 'c146',
  'Воронеж': 'c193',
  'Волгоград': 'c38',
  'Саратов': 'c194',
  'Томск': 'c67',
  'Якутск': 'c74',
  'Магадан': 'c79',
  'Петропавловск-Камчатский': 'c78',
  'Южно-Сахалинск': 'c77',
  'Оренбург': 'c56',
  'Ижевск': 'c44',
  'Киров': 'c46',
  'Чита': 'c68',
  'Улан-Удэ': 'c198',
  'Абакан': 'c1095',
  'Нальчик': 'c28',
  'Махачкала': 'c28',
  'Ставрополь': 'c36',
  'Белгород': 'c4',
};

// ─── Яндекс: слаги городов для поиска отелей ─────────────────────────────────

const YANDEX_HOTEL_SLUGS: Record<string, string> = {
  'Москва': 'moscow',
  'Санкт-Петербург': 'saint-petersburg',
  'Казань': 'kazan',
  'Сочи': 'sochi',
  'Екатеринбург': 'yekaterinburg',
  'Новосибирск': 'novosibirsk',
  'Владивосток': 'vladivostok',
  'Калининград': 'kaliningrad',
  'Нижний Новгород': 'nizhny-novgorod',
  'Краснодар': 'krasnodar',
  'Ростов-на-Дону': 'rostov-on-don',
  'Уфа': 'ufa',
  'Самара': 'samara',
  'Пермь': 'perm',
  'Красноярск': 'krasnoyarsk',
  'Омск': 'omsk',
  'Иркутск': 'irkutsk',
  'Хабаровск': 'khabarovsk',
  'Минеральные Воды': 'mineralnye-vody',
  'Мурманск': 'murmansk',
  'Архангельск': 'arkhangelsk',
  'Барнаул': 'barnaul',
  'Тюмень': 'tyumen',
  'Анапа': 'anapa',
  'Геленджик': 'gelendzhik',
  'Симферополь': 'simferopol',
  'Воронеж': 'voronezh',
  'Волгоград': 'volgograd',
  'Саратов': 'saratov',
  'Томск': 'tomsk',
  'Якутск': 'yakutsk',
  'Магадан': 'magadan',
  'Южно-Сахалинск': 'yuzhno-sakhalinsk',
  'Оренбург': 'orenburg',
  'Ижевск': 'izhevsk',
  'Киров': 'kirov',
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Конвертирует YYYY-MM-DD → DD.MM.YYYY (формат Tutu.ru). */
function toTutuDate(iso: string): string {
  if (!iso) return '';
  const parts = iso.split('-');
  if (parts.length !== 3) return '';
  return `${parts[2]}.${parts[1]}.${parts[0]}`;
}

/** Возвращает city ID для Яндекс или само название как fallback. */
function yandexId(city: string): string {
  return YANDEX_CITY_IDS[city] ?? city;
}

/** Возвращает slug отеля для Яндекс или нижний регистр как fallback. */
function yandexHotelSlug(city: string): string {
  return YANDEX_HOTEL_SLUGS[city] ?? city.toLowerCase().replace(/\s+/g, '-');
}

// ─── Tutu.ru ─────────────────────────────────────────────────────────────────

/**
 * Ссылка на поиск поездов Москва → Казань на Tutu.ru.
 * Дата в формате DD.MM.YYYY.
 */
export function buildTutuTrainLink(
  fromCity: string,
  toCity: string,
  departDate: string,
): string {
  const params = new URLSearchParams({
    from: fromCity,
    to: toCity,
    date: toTutuDate(departDate),
  });
  return `https://www.tutu.ru/poezda/wizard/search/?${params.toString()}`;
}

/**
 * Ссылка на поиск автобусов на Tutu.ru.
 */
export function buildTutuBusLink(
  fromCity: string,
  toCity: string,
  departDate: string,
): string {
  const params = new URLSearchParams({
    from: fromCity,
    to: toCity,
    date: toTutuDate(departDate),
  });
  return `https://www.tutu.ru/avtobusy/wizard/search/?${params.toString()}`;
}

// ─── Яндекс Путешествия ───────────────────────────────────────────────────────

/**
 * Ссылка на поиск авиабилетов на Яндекс Путешествиях.
 */
export function buildYandexFlightsLink(
  fromCity: string,
  toCity: string,
  departDate: string,
  adults = 1,
): string {
  const params = new URLSearchParams({
    fromId: yandexId(fromCity),
    toId: yandexId(toCity),
    when: departDate,
    adult_seats: String(adults),
  });
  return `https://travel.yandex.ru/planes/search/?${params.toString()}`;
}

/**
 * Ссылка на поиск поездов на Яндекс Путешествиях.
 */
export function buildYandexTrainsLink(
  fromCity: string,
  toCity: string,
  departDate: string,
): string {
  const params = new URLSearchParams({
    fromId: yandexId(fromCity),
    toId: yandexId(toCity),
    when: departDate,
  });
  return `https://travel.yandex.ru/trains/search/?${params.toString()}`;
}

/**
 * Ссылка на поиск отелей в городе на Яндекс Путешествиях.
 */
export function buildYandexHotelsLink(
  city: string,
  checkin: string,
  checkout: string,
  adults = 1,
): string {
  const slug = yandexHotelSlug(city);
  const params = new URLSearchParams({
    adults: String(adults),
    checkin,
    checkout,
  });
  return `https://travel.yandex.ru/hotels/${slug}/?${params.toString()}`;
}

/**
 * Ссылка на главную страницу Яндекс Путешествий (без параметров).
 */
export function buildYandexTravelMainLink(): string {
  return 'https://travel.yandex.ru/';
}
