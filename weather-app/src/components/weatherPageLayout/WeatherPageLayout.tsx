// pages/WeatherPageLayout.tsx

import { useWeather } from '../../context/WeatherContext';
import type { LocationResult } from '../../types/location.types';
import type { WeatherData } from '../../types/weather.types';
import { CurrentWeather } from '../current-weather/CurrentWeather';
import { ErrorState } from '../error-state/ErrorState';
import { ForecastList } from '../forecast-list/ForecastList';
import { SearchBar } from '../search-bar/SearchBar';

interface WeatherPageLayoutProps {
  error: unknown;
  data: WeatherData | undefined;
  retry: () => void;
  onLocationSelect: (location: LocationResult) => void;
}

export const WeatherPageLayout = ({
  error,
  data,
  retry,
  onLocationSelect,
}: WeatherPageLayoutProps) => {
  const theme = useWeather();

  return (
    <div className={`min-h-screen transition-colors duration-500 ${theme.gradient}`}>
      <div className={`sticky top-0 z-10 px-4 pt-4 pb-2 ${theme.gradient}`}>
        <SearchBar onLocationSelect={onLocationSelect} />
        {data && <CurrentWeather data={data} />}
      </div>

      <div className="px-4 pb-4 pt-4">
        {error ? (
          <ErrorState onRetry={retry} />
        ) : data ? (
          <ForecastList forecasts={data.forecast} />
        ) : null}
      </div>
    </div>
  );
};
