import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { WeatherDashboard } from './WeatherDashboard';
import { useLocationSearch } from '../../hooks/useLocationSearch';
import type { WeatherData } from '../../types/weather.types';

vi.mock('../../hooks/useLocationSearch', () => ({
  useLocationSearch: vi.fn(),
}));
vi.mock('../../hooks/useDebounce', () => ({
  useDebounce: (value: string) => value,
}));

const mockUseLocationSearch = vi.mocked(useLocationSearch);

const weatherData: WeatherData = {
  location: 'London, United Kingdom',
  currentTemp: 18,
  currentCondition: 0,
  windSpeed: 12,
  humidity: 55,
  isDaytime: true,
  forecast: [{ date: '2026-08-19', dayLabel: 'Wed', condition: 0, tempMax: 20, tempMin: 12 }],
};

describe('WeatherDashboard', () => {
  beforeEach(() => {
    mockUseLocationSearch.mockReturnValue({ suggestions: [], isLoading: false, error: undefined });
  });

  it('always renders the search bar, even before any weather data has loaded', () => {
    render(<WeatherDashboard onLocationSelect={vi.fn()} weatherData={undefined} />);

    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('renders nothing from CurrentWeather or ForecastList while weatherData is undefined', () => {
    render(<WeatherDashboard onLocationSelect={vi.fn()} weatherData={undefined} />);

    expect(screen.queryByText(/km\/h/)).not.toBeInTheDocument();
    expect(screen.queryByText('Wed')).not.toBeInTheDocument();
  });

  it('renders current conditions and the forecast once weatherData arrives', () => {
    render(<WeatherDashboard onLocationSelect={vi.fn()} weatherData={weatherData} />);

    expect(screen.getByText('London, United Kingdom')).toBeInTheDocument();
    expect(screen.getByText('Wed')).toBeInTheDocument();
    expect(screen.getByText('20° / 12°')).toBeInTheDocument();
  });
});
