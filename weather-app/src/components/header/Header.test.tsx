import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('Header', () => {
  it('renders the app title as a level-1 heading', () => {
    render(<Header />);

    expect(screen.getByRole('heading', { level: 1, name: '☀️ Sky Check' })).toBeInTheDocument();
  });
});
