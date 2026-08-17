export type WeatherCategory =
  | 'clear'
  | 'cloudy'
  | 'fog'
  | 'drizzle'
  | 'rain'
  | 'snow'
  | 'rain-showers'
  | 'snow-showers'
  | 'storm';

export const getWeatherCategory = (code: number): WeatherCategory => {
  if (code <= 0) return 'clear';
  if (code <= 3) return 'cloudy';
  if (code <= 48) return 'fog';
  if (code <= 57) return 'drizzle';
  if (code <= 67) return 'rain';
  if (code <= 77) return 'snow';
  if (code <= 82) return 'rain-showers';
  if (code <= 86) return 'snow-showers';
  return 'storm';
};
