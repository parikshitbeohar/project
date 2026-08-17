import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor, act } from '@testing-library/react';
import { SWRConfig } from 'swr';
import type { ReactNode } from 'react';
import { useWeather } from './useWeather';
import { fetchWeather } from '../api/fetchWeather';
import type { LocationResult } from '../types/location.types';
import type { WeatherData } from '../types/weather.types';

vi.mock('../api/fetchWeather', () => ({
  fetchWeather: vi.fn(),
}));

const mockFetchWeather = vi.mocked(fetchWeather);

const wrapper = ({ children }: { children: ReactNode }) => (
  <SWRConfig value={{ provider: () => new Map(), dedupingInterval: 0 }}>{children}</SWRConfig>
);

const location: LocationResult = {
  name: 'London, United Kingdom',
  latitude: 51.5074,
  longitude: -0.1278,
};

const weatherData: WeatherData = {
  location: 'London, United Kingdom',
  currentTemp: 18,
  currentCondition: 0,
  windSpeed: 12,
  humidity: 55,
  isDaytime: true,
  forecast: [],
};

describe('useWeather', () => {
  beforeEach(() => {
    mockFetchWeather.mockReset();
  });

  it('fetches weather for the given location', async () => {
    mockFetchWeather.mockResolvedValue(weatherData);

    const { result } = renderHook(() => useWeather(location), { wrapper });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(mockFetchWeather).toHaveBeenCalledWith(51.5074, -0.1278, 'London, United Kingdom');
    expect(result.current.data).toEqual(weatherData);
  });

  it('surfaces a rejected fetch as the error result', async () => {
    mockFetchWeather.mockRejectedValue(new Error('Request failed: 500 Internal Server Error'));

    const { result } = renderHook(() => useWeather(location), { wrapper });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.data).toBeUndefined();
  });

  it('retry triggers a re-fetch via mutate', async () => {
    mockFetchWeather.mockResolvedValue(weatherData);

    const { result } = renderHook(() => useWeather(location), { wrapper });

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(mockFetchWeather).toHaveBeenCalledTimes(1);

    act(() => {
      result.current.retry();
    });

    await waitFor(() => expect(mockFetchWeather).toHaveBeenCalledTimes(2));
  });
});
