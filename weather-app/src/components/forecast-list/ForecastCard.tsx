import { useWeatherTheme } from '../../context/WeatherContext';
import type { DayForecast } from '../../types/weather.types';
import { WeatherCondition } from '../weather-condition/WeatherCondition';

export const ForecastCard = ({ forecast }: { forecast: DayForecast }) => {
  const theme = useWeatherTheme({ conditionCode: forecast.condition });

  return (
    <div
      className={`grid w-full grid-cols-[80px_1fr_80px] items-center gap-4 rounded-lg border border-white/20 p-4 ${theme.gradient}`}
    >
      <span className={`text-sm font-medium ${theme.textColor}`}>{forecast.dayLabel}</span>

      <WeatherCondition
        code={forecast.condition}
        textClassName={theme.textColor}
        iconClassName="h-10 w-10"
        animate
      />

      <span className={`text-right text-sm font-medium ${theme.textColor}`}>
        {forecast.tempMax}° / {forecast.tempMin}°
      </span>
    </div>
  );
};
