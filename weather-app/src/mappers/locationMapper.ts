import type { CitySearchResponse, PostcodeResponse, LocationResult } from '../types/location.types';

// The only place that knows the shape of the city-search provider's JSON.
// Swap providers or reshape the response and only this function changes —
// hooks/components only ever see `LocationResult[]`.
export const mapCitySearchResponse = (data: CitySearchResponse): LocationResult[] => {
  if (!data.results) return [];

  return data.results.map((result) => ({
    name: `${result.name}, ${result.country}`,
    latitude: result.latitude,
    longitude: result.longitude,
  }));
};

// Same idea for the postcode-lookup provider.
export const mapPostcodeResponse = (data: PostcodeResponse): LocationResult[] => {
  return [
    {
      name: `${data.result.admin_district}, ${data.result.postcode}`,
      latitude: data.result.latitude,
      longitude: data.result.longitude,
    },
  ];
};
