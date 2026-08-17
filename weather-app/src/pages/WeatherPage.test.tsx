import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SWRConfig } from 'swr';
import { WeatherPage } from './WeatherPage';
import { fetchWeather } from '../api/fetchWeather';
import { fetchCitySuggestions } from '../api/fetchCitySuggestions';
import type { WeatherData } from '../types/weather.types';

vi.mock('../api/fetchWeather', () => ({
  fetchWeather: vi.fn(),
}));

vi.mock('../api/fetchCitySuggestions', () => ({
  fetchCitySuggestions: vi.fn(),
}));

vi.mock('../hooks/useDebounce', () => ({
  useDebounce: (value: string) => value,
}));

const mockFetchWeather = vi.mocked(fetchWeather);
const mockFetchCitySuggestions = vi.mocked(fetchCitySuggestions);

const buildWeatherData = (overrides: Partial<WeatherData> = {}): WeatherData => ({
  location: 'London, United Kingdom',
  currentTemp: 18,
  currentCondition: 0,
  windSpeed: 12,
  humidity: 55,
  isDaytime: true,
  forecast: [],
  ...overrides,
});

const renderWeatherPage = () =>
  render(
    <SWRConfig value={{ provider: () => new Map(), dedupingInterval: 0 }}>
      <WeatherPage />
    </SWRConfig>
  );

describe('WeatherPage', () => {
  beforeEach(() => {
    mockFetchWeather.mockReset();
    mockFetchCitySuggestions.mockReset();
  });

  it('loads the default location on mount, showing a loading overlay first and the weather once it resolves', async () => {
    mockFetchWeather.mockResolvedValue(buildWeatherData());

    renderWeatherPage();

    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(mockFetchWeather).toHaveBeenCalledWith(51.5074, -0.1278, 'London, United Kingdom');

    await waitFor(() => expect(screen.queryByRole('status')).not.toBeInTheDocument());

    expect(screen.getByText('London, United Kingdom')).toBeInTheDocument();
    expect(screen.getByText('18°')).toBeInTheDocument();
  });

  it('shows an error overlay when the fetch fails, and recovers once "Try again" succeeds', async () => {
    mockFetchWeather.mockRejectedValueOnce(new Error('Request failed: 500 Internal Server Error'));
    mockFetchWeather.mockResolvedValueOnce(buildWeatherData());

    const user = userEvent.setup();
    renderWeatherPage();

    await waitFor(() => expect(screen.getByRole('alert')).toBeInTheDocument());
    expect(screen.getByRole('alert')).toHaveTextContent(
      "We couldn't load the weather for this location. Please try again."
    );

    await user.click(screen.getByRole('button', { name: 'Try again' }));

    await waitFor(() => expect(screen.queryByRole('alert')).not.toBeInTheDocument());
    expect(screen.getByText('London, United Kingdom')).toBeInTheDocument();
  });

  it('fetches and displays weather for a location selected from the search bar', async () => {
    mockFetchWeather.mockResolvedValueOnce(buildWeatherData());
    mockFetchCitySuggestions.mockResolvedValue([
      { name: 'Paris, France', latitude: 48.8566, longitude: 2.3522 },
    ]);

    const user = userEvent.setup();
    renderWeatherPage();

    await waitFor(() => expect(screen.queryByRole('status')).not.toBeInTheDocument());

    mockFetchWeather.mockResolvedValueOnce(
      buildWeatherData({ location: 'Paris, France', currentTemp: 24 })
    );

    await user.type(screen.getByRole('combobox'), 'Paris');
    const option = await screen.findByRole('option', { name: 'Paris, France' });
    await user.click(option);

    await waitFor(() => expect(screen.getByText('Paris, France')).toBeInTheDocument());

    expect(mockFetchWeather).toHaveBeenLastCalledWith(48.8566, 2.3522, 'Paris, France');
    expect(screen.getByText('24°')).toBeInTheDocument();
  });
});
