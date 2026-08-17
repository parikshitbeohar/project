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