import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CurrentWeather } from './CurrentWeather';
import { WeatherThemeProvider } from '../../context/WeatherContext';
import type { WeatherData } from '../../types/weather.types';

const buildWeatherData = (overrides: Partial<WeatherData> = {}): WeatherData => ({
  location: 'London, United Kingdom',
  currentTemp: 18,
  currentCondition: 0, // clear
  windSpeed: 12,
  humidity: 55,
  isDaytime: true,
  forecast: [],
  ...overrides,
});

describe('CurrentWeather', () => {
  it('renders nothing while weather data has not loaded yet', () => {
    const { container } = render(<CurrentWeather weatherData={undefined} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders the location, temperature, wind, humidity and condition once data arrives', () => {
    render(<CurrentWeather weatherData={buildWeatherData()} />);

    expect(screen.getByText('London, United Kingdom')).toBeInTheDocument();
    expect(screen.getByText('18°')).toBeInTheDocument();
    expect(screen.getByText('💨 12 km/h')).toBeInTheDocument();
    expect(screen.getByText('💧 55% humidity')).toBeInTheDocument();
    expect(screen.getByText('Clear sky')).toBeInTheDocument();
  });

  it('reflects the weather-driven theme when rendered inside WeatherThemeProvider', () => {
    const stormyData = buildWeatherData({ currentCondition: 95 });

    const { container } = render(
      <WeatherThemeProvider weatherData={stormyData}>
        <CurrentWeather weatherData={stormyData} />
      </WeatherThemeProvider>
    );

    expect(container.firstChild).toHaveClass('from-slate-700', 'to-slate-900');
    expect(screen.getByText('London, United Kingdom')).toHaveClass('text-white');
  });

  it('falls back to the default theme when rendered without a provider', () => {
    const { container } = render(<CurrentWeather weatherData={buildWeatherData()} />);

    expect(container.firstChild).toHaveClass('bg-purple-900/40');
  });
});
