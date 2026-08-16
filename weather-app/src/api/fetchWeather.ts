import { WEATHER_API_BASE } from '../config/apiConfig.ts';
import type { WeatherApiResponse, WeatherData } from '../types/weather.types.ts';
import { fetchJson } from './fetchJson.ts';

export const fetchWeather = async (
  latitude: number,
  longitude: number,
  locationName: string
): Promise<WeatherData> => {
  const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const url =
    `${WEATHER_API_BASE}?latitude=${latitude}&longitude=${longitude}` +
    `&current=temperature_2m,weather_code,wind_speed_10m,relative_humidity_2m` +
    `&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset` +
    `&timezone=auto`;

  const raw = await fetchJson<WeatherApiResponse>(url);

  const now = new Date();
  const todaySunrise = new Date(raw.daily.sunrise[0]);
  const todaySunset = new Date(raw.daily.sunset[0]);
  const isDaytime = now >= todaySunrise && now < todaySunset;

  return {
    location: locationName,
    currentTemp: Math.round(raw.current.temperature_2m),
    currentCondition: raw.current.weather_code,
    windSpeed: raw.current.wind_speed_10m,
    humidity: raw.current.relative_humidity_2m,
    isDaytime,
    forecast: raw.daily.time.map((dateStr, index) => ({
      date: dateStr,
      dayLabel: DAY_LABELS[new Date(dateStr).getDay()],
      condition: raw.daily.weather_code[index],
      tempMax: Math.round(raw.daily.temperature_2m_max[index]),
      tempMin: Math.round(raw.daily.temperature_2m_min[index]),
    })),
  };
}
