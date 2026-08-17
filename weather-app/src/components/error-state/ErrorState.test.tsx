import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ErrorState } from './ErrorState';

describe('ErrorState', () => {
  it('renders a default message with an alert role', () => {
    render(<ErrorState onRetry={vi.fn()} />);

    const alert = screen.getByRole('alert');
    expect(alert).toHaveTextContent(
      "We couldn't load the weather for this location. Please try again."
    );
    expect(alert).not.toHaveAttribute('aria-live');
  });

  it('renders a custom message when one is provided', () => {
    render(<ErrorState onRetry={vi.fn()} message="Location not found." />);

    expect(screen.getByRole('alert')).toHaveTextContent('Location not found.');
  });

  it('calls onRetry when "Try again" is clicked', async () => {
    const onRetry = vi.fn();
    const user = userEvent.setup();
    render(<ErrorState onRetry={onRetry} />);

    await user.click(screen.getByRole('button', { name: 'Try again' }));

    expect(onRetry).toHaveBeenCalledTimes(1);
  });
});
