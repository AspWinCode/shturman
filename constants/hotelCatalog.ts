export interface HotelCatalogItem {
  name: string;
  stars: number;
  rating: number;
  distanceFromCenterKm: number;
  basePricePerNight: number;
}

const MOSCOW: HotelCatalogItem[] = [
  { name: 'Marriott Moscow', stars: 5, rating: 4.8, distanceFromCenterKm: 0.6, basePricePerNight: 12800 },
  { name: 'Metropol Moscow', stars: 5, rating: 4.7, distanceFromCenterKm: 0.8, basePricePerNight: 11600 },
  { name: 'AZIMUT Smolenskaya', stars: 4, rating: 4.5, distanceFromCenterKm: 1.3, basePricePerNight: 7800 },
];

const SPB: HotelCatalogItem[] = [
  { name: 'Невский Гранд Отель', stars: 4, rating: 4.6, distanceFromCenterKm: 0.7, basePricePerNight: 7200 },
  { name: 'Domina St. Petersburg', stars: 5, rating: 4.7, distanceFromCenterKm: 0.9, basePricePerNight: 9800 },
  { name: 'AZIMUT Санкт-Петербург', stars: 4, rating: 4.4, distanceFromCenterKm: 1.5, basePricePerNight: 6800 },
];

const KAZAN: HotelCatalogItem[] = [
  { name: 'Korston Kazan', stars: 4, rating: 4.5, distanceFromCenterKm: 0.8, basePricePerNight: 6900 },
  { name: 'Ramada Kazan', stars: 4, rating: 4.6, distanceFromCenterKm: 1.1, basePricePerNight: 7400 },
  { name: 'Kazan Palace by Tasigo', stars: 5, rating: 4.7, distanceFromCenterKm: 1.4, basePricePerNight: 9600 },
];

const SOCHI: HotelCatalogItem[] = [
  { name: 'Sochi Park Hotel', stars: 4, rating: 4.4, distanceFromCenterKm: 1.2, basePricePerNight: 7600 },
  { name: 'Swissotel Resort Sochi Kamelia', stars: 5, rating: 4.8, distanceFromCenterKm: 0.9, basePricePerNight: 12500 },
  { name: 'Radisson Collection Sochi', stars: 5, rating: 4.8, distanceFromCenterKm: 0.7, basePricePerNight: 13900 },
];

const KALININGRAD: HotelCatalogItem[] = [
  { name: 'Kaliningrad Hotel', stars: 4, rating: 4.4, distanceFromCenterKm: 0.9, basePricePerNight: 6100 },
  { name: 'Mercure Kaliningrad', stars: 4, rating: 4.6, distanceFromCenterKm: 1.0, basePricePerNight: 7800 },
  { name: 'Holiday Inn Kaliningrad', stars: 4, rating: 4.5, distanceFromCenterKm: 1.2, basePricePerNight: 7400 },
];

const VLADIVOSTOK: HotelCatalogItem[] = [
  { name: 'AZIMUT Владивосток', stars: 4, rating: 4.5, distanceFromCenterKm: 0.7, basePricePerNight: 7600 },
  { name: 'Lotte Hotel Vladivostok', stars: 5, rating: 4.8, distanceFromCenterKm: 0.8, basePricePerNight: 13200 },
  { name: 'Vladivostok Hotel', stars: 4, rating: 4.3, distanceFromCenterKm: 1.4, basePricePerNight: 6800 },
];

const IRKUTSK: HotelCatalogItem[] = [
  { name: 'Angara Hotel', stars: 4, rating: 4.4, distanceFromCenterKm: 0.5, basePricePerNight: 5600 },
  { name: 'Irkutsk City Center', stars: 4, rating: 4.5, distanceFromCenterKm: 0.9, basePricePerNight: 6900 },
  { name: 'Baikal Forest Hotel', stars: 4, rating: 4.6, distanceFromCenterKm: 1.1, basePricePerNight: 7200 },
];

const NOVOSIBIRSK: HotelCatalogItem[] = [
  { name: 'Marins Park Hotel Новосибирск', stars: 4, rating: 4.3, distanceFromCenterKm: 1.1, basePricePerNight: 6200 },
  { name: 'Domina Novosibirsk', stars: 4, rating: 4.6, distanceFromCenterKm: 0.9, basePricePerNight: 7900 },
  { name: 'DoubleTree by Hilton Novosibirsk', stars: 5, rating: 4.7, distanceFromCenterKm: 1.3, basePricePerNight: 9900 },
];

const TYUMEN: HotelCatalogItem[] = [
  { name: 'Mercure Tyumen Center', stars: 4, rating: 4.6, distanceFromCenterKm: 0.8, basePricePerNight: 7300 },
  { name: 'DoubleTree by Hilton Tyumen', stars: 4, rating: 4.5, distanceFromCenterKm: 1.2, basePricePerNight: 7600 },
  { name: 'Ремезов Отель', stars: 4, rating: 4.4, distanceFromCenterKm: 1.0, basePricePerNight: 6900 },
];

const BAIKAL_AREA: HotelCatalogItem[] = [
  { name: 'Baikal View Hotel (Ольхон)', stars: 4, rating: 4.5, distanceFromCenterKm: 2.2, basePricePerNight: 8400 },
  { name: 'Легенда Байкала (Листвянка)', stars: 4, rating: 4.4, distanceFromCenterKm: 1.7, basePricePerNight: 7800 },
  { name: 'Маяк (Листвянка)', stars: 3, rating: 4.2, distanceFromCenterKm: 1.4, basePricePerNight: 6200 },
];

export const HOTEL_CATALOG_BY_CITY: Record<string, HotelCatalogItem[]> = {
  москва: MOSCOW,
  'санкт-петербург': SPB,
  'санкт петербург': SPB,
  петербург: SPB,
  спб: SPB,
  казань: KAZAN,
  сочи: SOCHI,
  калининград: KALININGRAD,
  владивосток: VLADIVOSTOK,
  иркутск: IRKUTSK,
  новосибирск: NOVOSIBIRSK,
  тюмень: TYUMEN,
  байкал: BAIKAL_AREA,
  листвянка: BAIKAL_AREA,
  ольхон: BAIKAL_AREA,
};
