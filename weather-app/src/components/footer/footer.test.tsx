import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Footer } from './footer';

describe('Footer', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders the About, FAQ and Contact sections', () => {
    render(<Footer />);

    expect(screen.getByRole('heading', { name: 'About Sky Check' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'FAQ' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Contact' })).toBeInTheDocument();
    expect(screen.getByText('Email: hello@skycheck.example')).toBeInTheDocument();
  });

  it('renders the Privacy Policy and Terms of Use links', () => {
    render(<Footer />);

    expect(screen.getByRole('link', { name: 'Privacy Policy' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Terms of Use' })).toBeInTheDocument();
  });

  it('renders the current year in the copyright line', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2027-03-15T12:00:00Z'));

    render(<Footer />);

    expect(screen.getByText(/© 2027 Sky Check/)).toBeInTheDocument();
  });
});
