import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ForecastCard } from './ForecastCard';
import type { DayForecast } from '../../types/weather.types';

const buildForecast = (overrides: Partial<DayForecast> = {}): DayForecast => ({
  date: '2026-08-19',
  dayLabel: 'Wed',
  condition: 0,
  tempMax: 20,
  tempMin: 12,
  ...overrides,
});

describe('ForecastCard', () => {
  it('renders the day label, condition and temperature range', () => {
    render(<ForecastCard forecast={buildForecast()} />);

    expect(screen.getByText('Wed')).toBeInTheDocument();
    expect(screen.getByText('20° / 12°')).toBeInTheDocument();
    expect(screen.getByText('Clear sky')).toBeInTheDocument();
  });

  it('derives its own theme from the forecast condition code, without a WeatherThemeProvider', () => {
    const { container } = render(<ForecastCard forecast={buildForecast({ condition: 95 })} />);

    expect(container.firstChild).toHaveClass('from-slate-700', 'to-slate-900');
  });
});
