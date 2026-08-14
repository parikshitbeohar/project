import useSWR from 'swr';
import type { LocationSearchResult, QueryType } from '../types/location.types';
import { fetchPostcodeLookup } from '../api/fetchPostcodeLookup';
import { fetchCitySuggestions } from '../api/fetchCitySuggestions';

export const useLocationSearch = (query: string, queryType: QueryType): LocationSearchResult => {
  const shouldFetch = query.trim().length > 0;

  const { data, error, isLoading } = useSWR(
    shouldFetch ? ['locationSearch', queryType, query] : null,
    () => (queryType === 'postcode' ? fetchPostcodeLookup(query) : fetchCitySuggestions(query))
    ,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      revalidateOnReconnect: false,
    }
  );

  return {
    suggestions: data ?? [],
    isLoading,
    error,
  };
};
