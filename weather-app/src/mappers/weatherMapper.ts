import type { WeatherApiResponse, WeatherData } from '../types/weather.types';

const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// The only place in the app that knows the shape of the weather provider's
// JSON response. If the provider's response shape changes — or you switch
// providers entirely — this is the only function that needs to change.
// Everything above this layer (hooks, context, components) only ever sees
// the stable `WeatherData` domain type, never the raw response.
export const mapWeatherResponse = (raw: WeatherApiResponse, locationName: string): WeatherData => {
  const now = new Date();
  const todaySunrise = new Date(raw.daily.sunrise[0]);
  const todaySunset = new Date(raw.daily.sunset[0]);
  const isDaytime = now >= todaySunrise && now < todaySunset;

  return {
    location: locationName,
    currentTemp: Math.round(raw.current.temperature_2m),
    currentCondition: raw.current.weather_code,
    windSpeed: raw.current.wind_speed_10m,
    humidity: raw.current.relative_humidity_2m,
    isDaytime,
    forecast: raw.daily.time.map((dateStr, index) => ({
      date: dateStr,
      dayLabel: DAY_LABELS[new Date(dateStr).getDay()],
      condition: raw.daily.weather_code[index],
      tempMax: Math.round(raw.daily.temperature_2m_max[index]),
      tempMin: Math.round(raw.daily.temperature_2m_min[index]),
    })),
  };
};
