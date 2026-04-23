const API_KEY = process.env.EXPO_PUBLIC_OPENWEATHER_KEY ?? '';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export interface DayWeather {
  date: string;
  tempMin: number;
  tempMax: number;
  description: string;
  icon: string;
  iconUrl: string;
  isExtreme: boolean;
}

export interface WeatherForecast {
  city: string;
  days: DayWeather[];
}

const WEATHER_RU: Record<string, string> = {
  'clear sky': 'ясно',
  'few clouds': 'малооблачно',
  'scattered clouds': 'переменная облачность',
  'broken clouds': 'облачно',
  'overcast clouds': 'пасмурно',
  'light rain': 'небольшой дождь',
  'moderate rain': 'дождь',
  'heavy intensity rain': 'сильный дождь',
  thunderstorm: 'гроза',
  snow: 'снег',
  'light snow': 'небольшой снег',
  mist: 'туман',
  fog: 'туман',
};

interface ForecastItem {
  dt_txt?: string;
  main?: {
    temp?: number;
  };
  weather?: Array<{
    description?: string;
    icon?: string;
  }>;
}

interface OpenWeatherForecastResponse {
  list?: ForecastItem[];
}

export async function getWeatherForecast(
  cityName: string,
  dates: string[]
): Promise<WeatherForecast | null> {
  if (!API_KEY) {
    return null;
  }

  try {
    const url =
      `${BASE_URL}/forecast` +
      `?q=${encodeURIComponent(cityName)}` +
      `&appid=${API_KEY}` +
      `&units=metric` +
      `&lang=ru` +
      `&cnt=40`;

    const res = await fetch(url);
    if (!res.ok) {
      return null;
    }

    const data = (await res.json()) as OpenWeatherForecastResponse;
    const list = Array.isArray(data.list) ? data.list : [];
    if (!list.length || !dates.length) {
      return null;
    }

    const byDate: Record<string, { temps: number[]; descriptions: string[]; icons: string[] }> = {};

    for (const item of list) {
      const rawDate = item.dt_txt;
      const date = typeof rawDate === 'string' ? rawDate.slice(0, 10) : '';
      if (!dates.includes(date)) continue;

      const temp = Number(item.main?.temp);
      const description = item.weather?.[0]?.description;
      const icon = item.weather?.[0]?.icon;

      if (!byDate[date]) {
        byDate[date] = { temps: [], descriptions: [], icons: [] };
      }

      if (Number.isFinite(temp)) byDate[date].temps.push(temp);
      if (typeof description === 'string' && description.trim()) byDate[date].descriptions.push(description);
      if (typeof icon === 'string' && icon.trim()) byDate[date].icons.push(icon);
    }

    const days: DayWeather[] = dates
      .map((date) => {
        const entry = byDate[date];
        if (!entry || entry.temps.length === 0) return null;

        const tempMin = Math.round(Math.min(...entry.temps));
        const tempMax = Math.round(Math.max(...entry.temps));
        const midDesc = entry.descriptions[Math.floor(entry.descriptions.length / 2)] ?? 'облачно';
        const midIcon = entry.icons[Math.floor(entry.icons.length / 2)] ?? '03d';
        const normalizedDescription = WEATHER_RU[midDesc] ?? midDesc;

        return {
          date,
          tempMin,
          tempMax,
          description: normalizedDescription,
          icon: midIcon,
          iconUrl: `https://openweathermap.org/img/wn/${midIcon}@2x.png`,
          isExtreme: tempMin < -20 || tempMax > 40,
        };
      })
      .filter((item): item is DayWeather => item !== null);

    if (!days.length) {
      return null;
    }

    return {
      city: cityName,
      days,
    };
  } catch {
    return null;
  }
}
