import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { WeatherCondition } from './WeatherCondition';

describe('WeatherCondition', () => {
  it('renders clear sky with the filled sun styling', () => {
    const { container } = render(<WeatherCondition code={0} />);

    expect(screen.getByText('Clear sky')).toBeInTheDocument();
    const icon = container.querySelector('svg');
    expect(icon).toHaveClass('text-yellow-400');
    expect(icon).toHaveAttribute('fill', 'currentColor');
  });

  it('renders rain without the sun styling', () => {
    const { container } = render(<WeatherCondition code={60} />);

    expect(screen.getByText('Rain')).toBeInTheDocument();
    const icon = container.querySelector('svg');
    expect(icon).not.toHaveClass('text-yellow-400');
    expect(icon).toHaveAttribute('fill', 'none');
  });

  it('falls through to storm for codes at the top of the range', () => {
    render(<WeatherCondition code={95} />);

    expect(screen.getByText('Storm')).toBeInTheDocument();
  });

  it('uses a static fade-in by default, and the category animation when animate is set', () => {
    const { container: idle } = render(<WeatherCondition code={0} />);
    expect(idle.querySelector('svg')).toHaveClass('animate-fade-in');

    const { container: animated } = render(<WeatherCondition code={0} animate />);
    expect(animated.querySelector('svg')).toHaveClass('animate-sun-spin');
  });
});
