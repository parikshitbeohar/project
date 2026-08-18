import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

  it('does not re-query the selected location while clearing the input and the debounce timer is still catching up', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    mockUseLocationSearch.mockReturnValue({ suggestions, isLoading: false, error: undefined });
    render(<SearchBar onLocationSelect={vi.fn()} />);

    const input = screen.getByRole('combobox');
    await user.type(input, 'Leeds');
    await act(() => vi.advanceTimersByTimeAsync(500));

    const options = screen.getAllByRole('option');
    await user.click(options[0]);
    await act(() => vi.advanceTimersByTimeAsync(500));

    mockUseLocationSearch.mockClear();

    await user.clear(input);
    await act(() => vi.advanceTimersByTimeAsync(100));

    expect(mockUseLocationSearch).not.toHaveBeenCalledWith('Leeds, United Kingdom', 'city');

    await act(() => vi.advanceTimersByTimeAsync(500));
  });
});
