import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Loader } from './Loader';

describe('Loader', () => {
  it('renders a default label with an accessible, live status role', () => {
    render(<Loader />);

    const status = screen.getByRole('status');
    expect(status).toHaveAttribute('aria-live', 'polite');
    expect(screen.getByText('Loading weather…')).toBeInTheDocument();
  });

  it('renders a custom label when one is provided', () => {
    render(<Loader label="Fetching forecast…" />);

    expect(screen.getByText('Fetching forecast…')).toBeInTheDocument();
    expect(screen.queryByText('Loading weather…')).not.toBeInTheDocument();
  });

  it('hides the decorative spinner from assistive tech', () => {
    const { container } = render(<Loader />);

    expect(container.querySelector('[aria-hidden="true"]')).toBeInTheDocument();
  });
});
