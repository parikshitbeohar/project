import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { SWRConfig } from 'swr';
import type { ReactNode } from 'react';
import { useLocationSearch } from './useLocationSearch';
import { fetchPostcodeLookup } from '../api/fetchPostcodeLookup';
import { fetchCitySuggestions } from '../api/fetchCitySuggestions';

vi.mock('../api/fetchPostcodeLookup', () => ({
  fetchPostcodeLookup: vi.fn(),
}));
vi.mock('../api/fetchCitySuggestions', () => ({
  fetchCitySuggestions: vi.fn(),
}));

const mockFetchPostcodeLookup = vi.mocked(fetchPostcodeLookup);
const mockFetchCitySuggestions = vi.mocked(fetchCitySuggestions);

const wrapper = ({ children }: { children: ReactNode }) => (
  <SWRConfig value={{ provider: () => new Map(), dedupingInterval: 0 }}>{children}</SWRConfig>
);

describe('useLocationSearch', () => {
  beforeEach(() => {
    mockFetchPostcodeLookup.mockReset();
    mockFetchCitySuggestions.mockReset();
  });

  it('does not fetch when the query is empty', () => {
    renderHook(() => useLocationSearch('', 'city'), { wrapper });

    expect(mockFetchCitySuggestions).not.toHaveBeenCalled();
    expect(mockFetchPostcodeLookup).not.toHaveBeenCalled();
  });

  it('calls fetchCitySuggestions when queryType is "city"', async () => {
    mockFetchCitySuggestions.mockResolvedValue([
      { name: 'London, United Kingdom', latitude: 51.5074, longitude: -0.1278 },
    ]);

    const { result } = renderHook(() => useLocationSearch('London', 'city'), { wrapper });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(mockFetchCitySuggestions).toHaveBeenCalledWith('London');
    expect(mockFetchPostcodeLookup).not.toHaveBeenCalled();
    expect(result.current.suggestions).toEqual([
      { name: 'London, United Kingdom', latitude: 51.5074, longitude: -0.1278 },
    ]);
  });

  it('calls fetchPostcodeLookup when queryType is "postcode"', async () => {
    mockFetchPostcodeLookup.mockResolvedValue([
      { name: 'Westminster, SW1A 1AA', latitude: 51.501, longitude: -0.1416 },
    ]);

    const { result } = renderHook(() => useLocationSearch('SW1A 1AA', 'postcode'), { wrapper });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(mockFetchPostcodeLookup).toHaveBeenCalledWith('SW1A 1AA');
    expect(mockFetchCitySuggestions).not.toHaveBeenCalled();
  });

  it('defaults suggestions to an empty array before data resolves', () => {
    mockFetchCitySuggestions.mockReturnValue(new Promise(() => {})); // never resolves

    const { result } = renderHook(() => useLocationSearch('Lon', 'city'), { wrapper });

    expect(result.current.suggestions).toEqual([]);
    expect(result.current.isLoading).toBe(true);
  });

  it('surfaces a rejected fetch as the error result', async () => {
    mockFetchCitySuggestions.mockRejectedValue(
      new Error('Request failed: 500 Internal Server Error')
    );

    const { result } = renderHook(() => useLocationSearch('Lon', 'city'), { wrapper });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.suggestions).toEqual([]);
  });
});
