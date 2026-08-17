import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchWeather } from './fetchWeather';
import { fetchJson } from './fetchJson';
import { WEATHER_API_BASE } from '../config/apiConfig.ts';

vi.mock('./fetchJson', () => ({
  fetchJson: vi.fn(),
}));

const mockFetchJson = vi.mocked(fetchJson);

const rawResponse = {
  current: {
    temperature_2m: 15.6,
    weather_code: 3,
    wind_speed_10m: 12,
    relative_humidity_2m: 80,
  },
  daily: {
    time: ['2026-08-19'],
    weather_code: [3],
    temperature_2m_max: [18.4],
    temperature_2m_min: [10.1],
    sunrise: ['2026-08-19T05:30:00Z'],
    sunset: ['2026-08-19T20:00:00Z'],
  },
};

describe('fetchWeather', () => {
  beforeEach(() => {
    mockFetchJson.mockReset();
    mockFetchJson.mockResolvedValue(rawResponse);
  });

  it('requests the weather endpoint with latitude and longitude in the query string', async () => {
    await fetchWeather(51.5074, -0.1278, 'London, United Kingdom');

    const [calledUrl] = mockFetchJson.mock.calls[0];
    expect(calledUrl).toContain(WEATHER_API_BASE);
    expect(calledUrl).toContain('latitude=51.5074');
    expect(calledUrl).toContain('longitude=-0.1278');
  });

  it('maps the raw response through mapWeatherResponse, using the given location name', async () => {
    const result = await fetchWeather(51.5074, -0.1278, 'London, United Kingdom');

    expect(result.location).toBe('London, United Kingdom');
    expect(result.currentTemp).toBe(16); // 15.6 rounds up
  });
});
