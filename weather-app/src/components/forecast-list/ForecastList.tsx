import { ForecastCard } from './ForecastCard';
import type { DayForecast } from '../../types/weather.types';

interface ForecastListProps {
  forecasts: DayForecast[] | undefined;
}

export const ForecastList = ({ forecasts }: ForecastListProps) => {
  if (!forecasts || forecasts.length === 0) {
    return null;
  }
  return (
    <div className="flex flex-1 w-full flex-col gap-2">
      {forecasts.map((forecast, index) => (
        <ForecastCard key={index} forecast={forecast} />
      ))}
    </div>
  );
};
