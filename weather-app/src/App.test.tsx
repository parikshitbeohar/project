import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

vi.mock('./pages/WeatherPage', () => ({
  WeatherPage: () => {
    throw new Error('Test error');
  },
}));

describe('App', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('shows the error fallback when a child component throws during render', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});

    render(<App />);

    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText('Something went wrong. Please reload the page.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Reload page' })).toBeInTheDocument();
  });
});
