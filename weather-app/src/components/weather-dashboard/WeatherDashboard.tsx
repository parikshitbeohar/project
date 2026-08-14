import type { LocationResult } from '../../types/location.types';
import type { WeatherData } from '../../types/weather.types';
import { CurrentWeather } from '../current-weather/CurrentWeather';
import { ErrorState } from '../error-state/ErrorState';

import { ForecastList } from '../forecast-list/ForecastList';


interface WeatherDashboardProps {
  error: unknown;
  data: WeatherData | undefined;
  retry: () => void;
  onLocationSelect: (location: LocationResult) => void;
}

export const WeatherDashboard = ({
  error,
  data,
  retry,
  onLocationSelect,
}: WeatherDashboardProps) => {
  return (  
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 md:flex-row md:items-start bg-gradient-to-b from-amber-100 via-sky-200 to-blue-300">
        <CurrentWeather data={data} onLocationSelect={onLocationSelect} />
        <div className="flex-1">
          {error ? <ErrorState onRetry={retry} /> : <ForecastList forecasts={data?.forecast} />}
        </div>
      </div> 
  );
};
