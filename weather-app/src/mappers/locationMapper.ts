import type { CitySearchResponse, PostcodeResponse, LocationResult } from '../types/location.types';

export const mapCitySearchResponse = (data: CitySearchResponse): LocationResult[] => {
  if (!data.results) return [];

  return data.results.map((result) => ({
    name: `${result.name}, ${result.country}`,
    latitude: result.latitude,
    longitude: result.longitude,
  }));
};

export const mapPostcodeResponse = (data: PostcodeResponse): LocationResult[] => {
  return [
    {
      name: `${data.result.admin_district}, ${data.result.postcode}`,
      latitude: data.result.latitude,
      longitude: data.result.longitude,
    },
  ];
};
