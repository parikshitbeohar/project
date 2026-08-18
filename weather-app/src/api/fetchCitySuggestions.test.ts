import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchCitySuggestions } from './fetchCitySuggestions';
import { fetchJson } from './fetchJson';
import { CITY_API_BASE } from '../config/apiConfig.ts';

vi.mock('./fetchJson', () => ({
  fetchJson: vi.fn(),
}));

const mockFetchJson = vi.mocked(fetchJson);

describe('fetchCitySuggestions', () => {
  beforeEach(() => {
    mockFetchJson.mockReset();
  });

  it('requests the city endpoint with the query URL-encoded and a result cap', async () => {
    mockFetchJson.mockResolvedValue({ results: [] });

    await fetchCitySuggestions('New York');

    expect(mockFetchJson).toHaveBeenCalledWith(
      `${CITY_API_BASE}?name=${encodeURIComponent('New York')}&count=5`
    );
  });

  it('maps the response through mapCitySearchResponse', async () => {
    mockFetchJson.mockResolvedValue({
      results: [
        { name: 'London', country: 'United Kingdom', latitude: 51.5074, longitude: -0.1278 },
      ],
    });

    const result = await fetchCitySuggestions('London');

    expect(result).toEqual([
      { name: 'London, United Kingdom', latitude: 51.5074, longitude: -0.1278 },
    ]);
  });
});
