import useSWR from 'swr';
import type { WeatherData } from '../types/weather.types';
import { fetchWeather } from '../api/fetchWeather';
import type { LocationResult } from '../types/location.types';

interface UseWeatherResult {
  data: WeatherData | undefined;
  isLoading: boolean;
  error: unknown;
  retry: () => void;
}

export const useWeather = (location: LocationResult): UseWeatherResult => {
  const shouldFetch = location.latitude !== null && location.longitude !== null;

  const FIFTEEN_MINUTES_MS = 15 * 60 * 1000;

  const { data, error, isLoading, mutate } = useSWR(
    shouldFetch ? ['weather', location.latitude, location.longitude] : null,
    () => fetchWeather(location.latitude!, location.longitude!, location.name),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateIfStale: false,
      refreshInterval: FIFTEEN_MINUTES_MS,
    }
  );

  return { data, isLoading, error, retry: () => mutate() };
};
