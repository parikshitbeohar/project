export type QueryType = "postcode" | "city";


export interface LocationResult {
  name: string;        
  latitude: number;
  longitude: number;
}

export interface LocationSearchResult {
  suggestions: LocationResult[];
  isLoading: boolean;
  error: unknown;
}

// Mirrors the full postcodes.io response shape. `status` and `region` aren't
// read by mapPostcodeResponse today, but are kept here (rather than trimmed)
// since this type documents the raw API contract, not just what we consume.
export interface PostcodeResponse {
  status: number;
  result: {
    postcode: string;
    admin_district: string;
    region: string;
    country: string;
    latitude: number;
    longitude: number;
  };
}

export interface CitySearchResponse {
  results: Array<{
    name: string;
    country: string;
    latitude: number;   
    longitude: number;  
  }>;
}