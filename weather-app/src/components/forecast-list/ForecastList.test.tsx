import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ForecastList } from './ForecastList';
import type { WeatherData } from '../../types/weather.types';

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

describe('ForecastList', () => {
  it('renders nothing when weatherData is undefined', () => {
    const { container } = render(<ForecastList weatherData={undefined} />);

    expect(container).toBeEmptyDOMElement();
  });

  it('renders nothing when the forecast array is empty', () => {
    const { container } = render(<ForecastList weatherData={buildWeatherData({ forecast: [] })} />);

    expect(container).toBeEmptyDOMElement();
  });

  it('renders one ForecastCard per day in the forecast', () => {
    const forecast = [
      { date: '2026-08-19', dayLabel: 'Wed', condition: 0, tempMax: 20, tempMin: 12 },
      { date: '2026-08-20', dayLabel: 'Thu', condition: 61, tempMax: 16, tempMin: 9 },
    ];

    render(<ForecastList weatherData={buildWeatherData({ forecast })} />);

    expect(screen.getByText('Wed')).toBeInTheDocument();
    expect(screen.getByText('Thu')).toBeInTheDocument();
    expect(screen.getByText('20° / 12°')).toBeInTheDocument();
    expect(screen.getByText('16° / 9°')).toBeInTheDocument();
  });
});
