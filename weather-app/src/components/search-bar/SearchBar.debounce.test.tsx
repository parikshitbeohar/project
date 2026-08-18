import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { SearchBar } from './SearchBar';
import { useLocationSearch } from '../../hooks/useLocationSearch';

vi.mock('../../hooks/useLocationSearch', () => ({
  useLocationSearch: vi.fn(),
}));

const mockUseLocationSearch = vi.mocked(useLocationSearch);

const suggestions = [{ name: 'Leeds, United Kingdom', latitude: 53.8008, longitude: -1.5491 }];

describe('SearchBar debounce timing', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    mockUseLocationSearch.mockReturnValue({ suggestions: [], isLoading: false, error: undefined });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('does not re-query the selected location while clearing the input and the debounce timer is still catching up', () => {
    mockUseLocationSearch.mockReturnValue({ suggestions, isLoading: false, error: undefined });
    render(<SearchBar onLocationSelect={vi.fn()} />);

    const input = screen.getByRole('combobox');
    fireEvent.change(input, { target: { value: 'Leeds' } });
    act(() => {
      vi.advanceTimersByTime(500);
    });

    fireEvent.click(screen.getByRole('option'));
    act(() => {
      vi.advanceTimersByTime(500);
    });

    mockUseLocationSearch.mockClear();

    fireEvent.change(input, { target: { value: '' } });
    act(() => {
      vi.advanceTimersByTime(100);
    });

    expect(mockUseLocationSearch).not.toHaveBeenCalledWith('Leeds, United Kingdom', 'city');

    act(() => {
      vi.advanceTimersByTime(500);
    });
  });
});
