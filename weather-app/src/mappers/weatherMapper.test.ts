import { describe, it, expect, afterEach, vi } from 'vitest';
import { mapWeatherResponse } from './weatherMapper';
import type { WeatherApiResponse } from '../types/weather.types';

// Mirrors the private DAY_LABELS array in weatherMapper.ts. Deriving the
// expected label the same way the source does (rather than hardcoding
// "Wed"/"Thu"/...) keeps this test correct regardless of the machine's
// local timezone.
const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const buildRaw = (overrides: Partial<WeatherApiResponse> = {}): WeatherApiResponse => ({
  current: {
    temperature_2m: 15.6,
    weather_code: 3,
    wind_speed_10m: 12,
    relative_humidity_2m: 80,
  },
  daily: {
    time: ['2026-08-19', '2026-08-20', '2026-08-21'],
    weather_code: [3, 61, 71],
    temperature_2m_max: [18.4, 16.2, 10.9],
    temperature_2m_min: [10.1, 9.8, 4.4],
    sunrise: ['2026-08-19T05:30:00Z'],
    sunset: ['2026-08-19T20:00:00Z'],
  },
  ...overrides,
});

describe('mapWeatherResponse', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('maps current conditions and rounds the temperature', () => {
    const result = mapWeatherResponse(buildRaw(), 'London, United Kingdom');

    expect(result.location).toBe('London, United Kingdom');
    expect(result.currentTemp).toBe(16); // 15.6 rounds up
    expect(result.currentCondition).toBe(3);
    expect(result.windSpeed).toBe(12);
    expect(result.humidity).toBe(80);
  });

  it('marks isDaytime true when now falls between sunrise and sunset', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-08-19T12:00:00Z'));

    expect(mapWeatherResponse(buildRaw(), 'Test City').isDaytime).toBe(true);
  });

  it('marks isDaytime false when now is before sunrise', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-08-19T02:00:00Z'));

    expect(mapWeatherResponse(buildRaw(), 'Test City').isDaytime).toBe(false);
  });

  it('marks isDaytime false when now is after sunset', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-08-19T23:00:00Z'));

    expect(mapWeatherResponse(buildRaw(), 'Test City').isDaytime).toBe(false);
  });

  it('maps each daily entry to a DayForecast, rounding temps and deriving the day label', () => {
    const raw = buildRaw();
    const result = mapWeatherResponse(raw, 'Test City');

    expect(result.forecast).toHaveLength(3);
    result.forecast.forEach((day, index) => {
      expect(day.date).toBe(raw.daily.time[index]);
      expect(day.dayLabel).toBe(DAY_LABELS[new Date(raw.daily.time[index]).getDay()]);
      expect(day.condition).toBe(raw.daily.weather_code[index]);
      expect(day.tempMax).toBe(Math.round(raw.daily.temperature_2m_max[index]));
      expect(day.tempMin).toBe(Math.round(raw.daily.temperature_2m_min[index]));
    });
  });
});
