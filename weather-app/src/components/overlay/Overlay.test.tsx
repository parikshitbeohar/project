import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Overlay } from './Overlay';

describe('Overlay', () => {
  it('renders its children', () => {
    render(
      <Overlay>
        <p>Loading…</p>
      </Overlay>
    );

    expect(screen.getByText('Loading…')).toBeInTheDocument();
  });

  it('moves focus to the first focusable descendant on mount', () => {
    render(
      <Overlay>
        <button>Try again</button>
      </Overlay>
    );

    expect(screen.getByRole('button', { name: 'Try again' })).toHaveFocus();
  });

  it('falls back to focusing the overlay itself when nothing inside is focusable', () => {
    const { container } = render(
      <Overlay>
        <span>Loading weather…</span>
      </Overlay>
    );

    expect(container.firstChild).toHaveFocus();
  });
});
