/**
 * Маппинг названий российских городов в коды IATA аэропортов/городов.
 * Используется для поиска авиабилетов через Aviasales API.
 */
export const CITY_IATA: Record<string, string> = {
  'Москва': 'MOW',
  'Санкт-Петербург': 'LED',
  'Казань': 'KZN',
  'Сочи': 'AER',
  'Екатеринбург': 'SVX',
  'Новосибирск': 'OVB',
  'Владивосток': 'VVO',
  'Калининград': 'KGD',
  'Нижний Новгород': 'GOJ',
  'Краснодар': 'KRR',
  'Ростов-на-Дону': 'ROV',
  'Уфа': 'UFA',
  'Самара': 'KUF',
  'Пермь': 'PEE',
  'Красноярск': 'KJA',
  'Омск': 'OMS',
  'Иркутск': 'IKT',
  'Хабаровск': 'KHV',
  'Минеральные Воды': 'MRV',
  'Мурманск': 'MMK',
  'Архангельск': 'ARH',
  'Барнаул': 'BAX',
  'Тюмень': 'TJM',
  'Анапа': 'AAQ',
  'Геленджик': 'GDZ',
  'Симферополь': 'SIP',
  'Воронеж': 'VOZ',
  'Волгоград': 'VOG',
  'Саратов': 'RTW',
  'Томск': 'TOF',
  'Якутск': 'YKS',
  'Магадан': 'GDX',
  'Петропавловск-Камчатский': 'PKC',
  'Южно-Сахалинск': 'UUS',
  'Чита': 'HTA',
  'Улан-Удэ': 'UUD',
  'Абакан': 'ABA',
  'Кызыл': 'KYZ',
  'Нальчик': 'NAL',
  'Махачкала': 'MCX',
  'Грозный': 'GRV',
  'Ставрополь': 'STW',
  'Белгород': 'EGO',
  'Липецк': 'LPK',
  'Тамбов': 'TBW',
  'Курск': 'URS',
  'Орёл': 'OEL',
  'Брянск': 'BZK',
  'Смоленск': 'LNX',
  'Псков': 'PKV',
  'Великий Новгород': 'NVR',
  'Петрозаводск': 'PES',
  'Сыктывкар': 'SCW',
  'Нарьян-Мар': 'NNM',
  'Салехард': 'SLY',
  'Сургут': 'SGC',
  'Ханты-Мансийск': 'HMA',
  'Нижневартовск': 'NJC',
  'Тобольск': 'TOX',
  'Новый Уренгой': 'NUX',
  'Ноябрьск': 'NOJ',
  'Нижнекамск': 'NBC',
  'Набережные Челны': 'NBC',
  'Оренбург': 'REN',
  'Орск': 'OSW',
  'Ульяновск': 'ULV',
  'Пенза': 'PEZ',
  'Саранск': 'SKX',
  'Чебоксары': 'CSY',
  'Йошкар-Ола': 'JOK',
  'Ижевск': 'IJK',
  'Киров': 'KVX',
  'Кострома': 'KMW',
  'Иваново': 'IWA',
  'Ярославль': 'IAR',
  'Владимир': 'VNK',
  'Рязань': 'RZN',
  'Тула': 'TYA',
  'Калуга': 'KLF',
  'Тверь': 'KLD',
  'Вологда': 'VGD',
  'Череповец': 'CEE',
  'Ухта': 'UCT',
};

/**
 * Маппинг IATA-кодов авиакомпаний в русские названия.
 */
export const AIRLINE_NAMES: Record<string, string> = {
  SU: 'Аэрофлот',
  S7: 'S7 Airlines',
  DP: 'Победа',
  U6: 'Уральские авиалинии',
  FV: 'Россия',
  WZ: 'Red Wings',
  Y7: 'NordStar',
  '5N': 'Северный ветер',
  N4: 'Нордавиа',
  '7R': 'RusLine',
  IK: 'Azimuth',
  A4: 'Azimuth',
  IO: 'IrAero',
  '6W': 'Saratov Airlines',
  '2B': 'AlbaWings',
  QD: 'J-Air',
  EO: 'Pegas Fly',
  NW: 'Nordwind Airlines',
  '5W': 'UTair',
  UT: 'UTair',
  '7Q': 'Саратовские авиалинии',
};

/**
 * Возвращает IATA-код города или null если не найден.
 * Поиск нечувствителен к регистру.
 */
export function getCityIata(cityName: string): string | null {
  // Точное совпадение
  if (CITY_IATA[cityName]) return CITY_IATA[cityName];
  // Поиск без учёта регистра
  const lower = cityName.toLowerCase();
  const entry = Object.entries(CITY_IATA).find(([k]) => k.toLowerCase() === lower);
  return entry ? entry[1] : null;
}

/**
 * Возвращает читаемое название авиакомпании по IATA-коду.
 */
export function getAirlineName(iataCode: string): string {
  return AIRLINE_NAMES[iataCode] ?? iataCode;
}
