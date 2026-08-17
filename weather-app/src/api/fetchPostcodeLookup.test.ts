import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchPostcodeLookup } from './fetchPostcodeLookup';
import { fetchJson } from './fetchJson';
import { POSTCODE_API_BASE } from '../config/apiConfig.ts';

vi.mock('./fetchJson', () => ({
  fetchJson: vi.fn(),
}));

const mockFetchJson = vi.mocked(fetchJson);

const rawResponse = {
  status: 200,
  result: {
    postcode: 'SW1A 1AA',
    admin_district: 'Westminster',
    region: 'London',
    country: 'England',
    latitude: 51.501,
    longitude: -0.1416,
  },
};

describe('fetchPostcodeLookup', () => {
  beforeEach(() => {
    mockFetchJson.mockReset();
  });

  it('requests the postcode endpoint with the query URL-encoded', async () => {
    mockFetchJson.mockResolvedValue(rawResponse);

    await fetchPostcodeLookup('SW1A 1AA');

    expect(mockFetchJson).toHaveBeenCalledWith(
      `${POSTCODE_API_BASE}/${encodeURIComponent('SW1A 1AA')}`
    );
  });

  it('maps a successful response through mapPostcodeResponse', async () => {
    mockFetchJson.mockResolvedValue(rawResponse);

    const result = await fetchPostcodeLookup('SW1A 1AA');

    expect(result).toEqual([
      { name: 'Westminster, SW1A 1AA', latitude: 51.501, longitude: -0.1416 },
    ]);
  });

  it('treats a 404 as "no results" instead of an error', async () => {
    mockFetchJson.mockRejectedValue(new Error('Request failed: 404 Not Found'));

    await expect(fetchPostcodeLookup('ZZ99 9ZZ')).resolves.toEqual([]);
  });

  it('re-throws any non-404 error', async () => {
    mockFetchJson.mockRejectedValue(new Error('Request failed: 500 Internal Server Error'));

    await expect(fetchPostcodeLookup('SW1A 1AA')).rejects.toThrow(
      'Request failed: 500 Internal Server Error'
    );
  });

  it('re-throws non-Error rejections untouched', async () => {
    mockFetchJson.mockRejectedValue('not an Error instance');

    await expect(fetchPostcodeLookup('SW1A 1AA')).rejects.toBe('not an Error instance');
  });
});
