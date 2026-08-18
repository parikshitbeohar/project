export const POSTCODE_API_BASE = 'https://api.postcodes.io/postcodes';
export const CITY_API_BASE = 'https://geocoding-api.open-meteo.com/v1/search';
export const WEATHER_API_BASE = 'https://api.open-meteo.com/v1/forecast';
export const getWeatherApiKey = (): string | undefined => import.meta.env.VITE_WEATHER_API_KEY;
