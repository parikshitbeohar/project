import { WEATHER_API_BASE } from '../config/apiConfig.ts';
import type { WeatherApiResponse, WeatherData } from '../types/weather.types.ts';
import { fetchJson } from './fetchJson.ts';
import { mapWeatherResponse } from '../mappers/weatherMapper.ts';

export const fetchWeather = async (
  latitude: number,
  longitude: number,
  locationName: string
): Promise<WeatherData> => {
  const url =
    `${WEATHER_API_BASE}?latitude=${latitude}&longitude=${longitude}` +
    `&current=temperature_2m,weather_code,wind_speed_10m,relative_humidity_2m` +
    `&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset` +
    `&timezone=auto`;

  const raw = await fetchJson<WeatherApiResponse>(url);

  return mapWeatherResponse(raw, locationName);
};
