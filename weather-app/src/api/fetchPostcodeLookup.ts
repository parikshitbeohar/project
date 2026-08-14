import { fetchJson } from "./fetchJson";
import type { PostcodeResponse, LocationResult } from "../types/location.types";
import { POSTCODE_API_BASE } from "../config/apiConfig.ts";

export const fetchPostcodeLookup = async (query: string): Promise<LocationResult[]> => {
  try {
    const data = await fetchJson<PostcodeResponse>(
      `${POSTCODE_API_BASE}/${encodeURIComponent(query)}`
    );
    return [{
      name: `${data.result.admin_district}, ${data.result.postcode}`,
      latitude: data.result.latitude,
      longitude: data.result.longitude,
    }];
  } catch {
    return [];
  }
}