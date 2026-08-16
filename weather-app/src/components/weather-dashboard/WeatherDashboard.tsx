import type { LocationResult } from '../../types/location.types';
import type { WeatherData } from '../../types/weather.types';
import { CurrentWeather } from '../current-weather/CurrentWeather';
import { ForecastList } from '../forecast-list/ForecastList';
import { SearchBar } from '../search-bar/SearchBar';

interface WeatherDashboardProps {
  onLocationSelect: (location: LocationResult) => void;
  weatherData: WeatherData
}

export const WeatherDashboard = ({ onLocationSelect, weatherData }: WeatherDashboardProps) => {
  return (
    <div className="flex-1 w-full mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 rounded-xl md:flex-row md:items-start bg-gradient-to-b from-amber-100 via-sky-200 to-blue-300">
      <div className="sticky top-0 z-10 flex flex-col gap-4 bg-gradient-to-b from-amber-100 rounded-xl via-sky-200 to-blue-300 md:top-4 md:w-100 md:flex-shrink-0">
        <SearchBar onLocationSelect={onLocationSelect} />
        <CurrentWeather weatherData={weatherData} />
      </div>
      <ForecastList weatherData={weatherData} />
    </div>
  );
};
