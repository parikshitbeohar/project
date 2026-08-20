import { describe, it, expect } from 'vitest';
import { mapCitySearchResponse, mapPostcodeResponse } from './locationMapper';
import type { CitySearchResponse, PostcodeResponse } from '../types/location.types';

describe('mapCitySearchResponse', () => {
  it('maps each result to a LocationResult with "name, country"', () => {
    const raw: CitySearchResponse = {
      results: [
        { name: 'London', country: 'United Kingdom', latitude: 51.5074, longitude: -0.1278 },
        { name: 'Paris', country: 'France', latitude: 48.8566, longitude: 2.3522 },
      ],
    };

    expect(mapCitySearchResponse(raw)).toEqual([
      { name: 'London, United Kingdom', latitude: 51.5074, longitude: -0.1278 },
      { name: 'Paris, France', latitude: 48.8566, longitude: 2.3522 },
    ]);
  });

  it('returns an empty array when the response has no results', () => {
    expect(mapCitySearchResponse({} as CitySearchResponse)).toEqual([]);
  });

  it('includes the state/region when present, so same-named places in the same country stay distinct', () => {
    const raw: CitySearchResponse = {
      results: [
        { name: 'Leeds', admin1: 'Alabama', country: 'United States', latitude: 33.548, longitude: -86.5411 },
        { name: 'Leeds', admin1: 'Maine', country: 'United States', latitude: 44.3009, longitude: -70.1445 },
      ],
    };

    expect(mapCitySearchResponse(raw)).toEqual([
      { name: 'Leeds, Alabama, United States', latitude: 33.548, longitude: -86.5411 },
      { name: 'Leeds, Maine, United States', latitude: 44.3009, longitude: -70.1445 },
    ]);
  });
});

describe('mapPostcodeResponse', () => {
  it('maps the result to a single LocationResult with "district, postcode"', () => {
    const raw: PostcodeResponse = {
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

    expect(mapPostcodeResponse(raw)).toEqual([
      { name: 'Westminster, SW1A 1AA', latitude: 51.501, longitude: -0.1416 },
    ]);
  });
});
