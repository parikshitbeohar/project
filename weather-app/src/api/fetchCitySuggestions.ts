
import { CITY_API_BASE } from "../config/apiConfig.ts";
import type { CitySearchResponse, LocationResult } from "../types/location.types";
import { fetchJson } from "./fetchJson";

export const fetchCitySuggestions = async (query: string): Promise<LocationResult[]> => {
  const data = await fetchJson<CitySearchResponse>(
    `${CITY_API_BASE}?name=${encodeURIComponent(query)}&count=5`
  );

  if (!data.results) return [];

  return data.results.map((result) => ({
    name: `${result.name}, ${result.country}`,
    latitude: result.latitude,
    longitude: result.longitude,
  }));
}