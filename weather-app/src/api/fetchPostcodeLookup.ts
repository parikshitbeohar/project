import { fetchJson } from './fetchJson';
import type { PostcodeResponse, LocationResult } from '../types/location.types';
import { POSTCODE_API_BASE } from '../config/apiConfig.ts';
import { mapPostcodeResponse } from '../mappers/locationMapper';

export const fetchPostcodeLookup = async (query: string): Promise<LocationResult[]> => {
  try {
    const data = await fetchJson<PostcodeResponse>(
      `${POSTCODE_API_BASE}/${encodeURIComponent(query)}`
    );
    return mapPostcodeResponse(data);
  } catch (error) {
    if (error instanceof Error && error.message.startsWith('Request failed: 404')) {
      return [];
    }
    throw error;
  }
};
