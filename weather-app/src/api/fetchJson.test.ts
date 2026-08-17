import { describe, it, expect, vi, afterEach } from 'vitest';
import { fetchJson } from './fetchJson';

describe('fetchJson', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('resolves with the parsed JSON body when the response is ok', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ hello: 'world' }),
      } as unknown as Response)
    );

    await expect(fetchJson('/api/test')).resolves.toEqual({ hello: 'world' });
  });

  it('passes the url and init through to fetch unchanged', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({}),
    } as unknown as Response);
    vi.stubGlobal('fetch', fetchMock);

    const init = { headers: { Accept: 'application/json' } };
    await fetchJson('/api/test', init);

    expect(fetchMock).toHaveBeenCalledWith('/api/test', init);
  });

  it('throws an Error describing the status when the response is not ok', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        status: 404,
        statusText: 'Not Found',
        json: () => Promise.resolve({}),
      } as unknown as Response)
    );

    await expect(fetchJson('/api/missing')).rejects.toThrow('Request failed: 404 Not Found');
  });
});
