import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchBar } from './SearchBar';
import { useLocationSearch } from '../../hooks/useLocationSearch';

vi.mock('../../hooks/useLocationSearch', () => ({
  useLocationSearch: vi.fn(),
}));

vi.mock('../../hooks/useDebounce', () => ({
  useDebounce: (value: string) => value,
}));

const mockUseLocationSearch = vi.mocked(useLocationSearch);

const suggestions = [
  { name: 'London, United Kingdom', latitude: 51.5074, longitude: -0.1278 },
  { name: 'London, Canada', latitude: 42.9849, longitude: -81.2453 },
];

describe('SearchBar', () => {
  beforeEach(() => {
    mockUseLocationSearch.mockReturnValue({ suggestions: [], isLoading: false, error: undefined });
  });

  it('shows suggestions returned by the search hook', async () => {
    mockUseLocationSearch.mockReturnValue({ suggestions, isLoading: false, error: undefined });
    const user = userEvent.setup();
    render(<SearchBar onLocationSelect={vi.fn()} />);

    await user.type(screen.getByRole('combobox'), 'London');

    expect(await screen.findAllByRole('option')).toHaveLength(2);
  });

  it('selects a suggestion on click, and fills the input with its name', async () => {
    mockUseLocationSearch.mockReturnValue({ suggestions, isLoading: false, error: undefined });
    const onLocationSelect = vi.fn();
    const user = userEvent.setup();
    render(<SearchBar onLocationSelect={onLocationSelect} />);

    await user.type(screen.getByRole('combobox'), 'London');
    const options = await screen.findAllByRole('option');
    await user.click(options[1]);

    expect(onLocationSelect).toHaveBeenCalledWith(suggestions[1]);
    expect(screen.getByRole('combobox')).toHaveValue('London, Canada');
  });

  it('supports moving through suggestions and selecting with the keyboard', async () => {
    mockUseLocationSearch.mockReturnValue({ suggestions, isLoading: false, error: undefined });
    const onLocationSelect = vi.fn();
    const user = userEvent.setup();
    render(<SearchBar onLocationSelect={onLocationSelect} />);

    const input = screen.getByRole('combobox');
    await user.type(input, 'London');
    await screen.findAllByRole('option');

    await user.keyboard('{ArrowDown}{ArrowDown}{Enter}');

    expect(onLocationSelect).toHaveBeenCalledWith(suggestions[1]);
  });

  it('shows a loading row while a search is in flight', async () => {
    mockUseLocationSearch.mockReturnValue({ suggestions: [], isLoading: true, error: undefined });
    const user = userEvent.setup();
    render(<SearchBar onLocationSelect={vi.fn()} />);

    await user.type(screen.getByRole('combobox'), 'Lon');

    expect(await screen.findByText('Searching...')).toBeInTheDocument();
  });

  it('shows an error row when the search fails', async () => {
    mockUseLocationSearch.mockReturnValue({
      suggestions: [],
      isLoading: false,
      error: new Error('Request failed'),
    });
    const user = userEvent.setup();
    render(<SearchBar onLocationSelect={vi.fn()} />);

    await user.type(screen.getByRole('combobox'), 'Lon');

    expect(await screen.findByText("Couldn't load results. Please try again.")).toBeInTheDocument();
  });

  it('closes the suggestion list once focus leaves the search widget', async () => {
    mockUseLocationSearch.mockReturnValue({ suggestions, isLoading: false, error: undefined });
    const user = userEvent.setup();
    render(
      <>
        <SearchBar onLocationSelect={vi.fn()} />
        <button>outside</button>
      </>
    );

    await user.type(screen.getByRole('combobox'), 'London');
    await screen.findAllByRole('option');

    await user.click(screen.getByRole('button', { name: 'outside' }));

    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });
});
