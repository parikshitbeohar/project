import { useWeatherInfo } from '../../context/WeatherContext';
import { ForecastCard } from './ForecastCard';

export const ForecastList = () => {

  const { weatherData } = useWeatherInfo();
  const forecast = weatherData?.forecast;
  if (!forecast || forecast.length === 0) {
    return null;
  }
  return (
    <div className="flex flex-1 w-full flex-col gap-2">
      {forecast.map((forecast, index) => (
        <ForecastCard key={index} forecast={forecast} />
      ))}
    </div>
  );
};
