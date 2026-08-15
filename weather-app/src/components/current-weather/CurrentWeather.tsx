import { useWeatherTheme } from '../../context/WeatherThemeContext';
import type { LocationResult } from '../../types/location.types';
import type { WeatherData } from '../../types/weather.types';
import { SearchBar } from '../search-bar/SearchBar';
import { WeatherCondition } from '../weather-condition/WeatherCondition';

export const CurrentWeather = (props: {
  data: WeatherData | undefined;
  onLocationSelect: (location: LocationResult) => void;
}) => {
  if (props.data === undefined) {
    return null;
  }

  const theme = useWeatherTheme();
  const { location, currentTemp, windSpeed, humidity, currentCondition } = props.data;

  const renderInfo = () => {
    return (
      <div
        className={`flex flex-col items-center gap-2 p-4 sm:gap-3 sm:p-6 md:p-8 rounded-xl ${theme.gradient}`}
      >
        <p className={`text-lg font-medium sm:text-xl md:text-2xl ${theme.textColor}`}>
          {location}
        </p>

        <span
          className={`text-xs font-medium uppercase tracking-wide opacity-70 ${theme.accentColor}`}
        >
          Now
        </span>

        <div className="flex items-center gap-3">
          <p className={`text-4xl font-bold sm:text-5xl md:text-6xl ${theme.textColor}`}>
            {currentTemp}°
          </p>

          <WeatherCondition code={currentCondition} textClassName={theme.textColor} iconClassName="h-20 w-20" animate />
        </div>

        <div className={`mt-2 flex gap-6 text-sm ${theme.accentColor}`}>
          <span>💨 {windSpeed} km/h</span>
          <span>💧 {humidity}% humidity</span>
        </div>
      </div>
    );
  };

  return (
 <div className="sticky top-0 z-10 flex flex-col gap-4 bg-gradient-to-b from-amber-100 rounded-xl via-sky-200 to-blue-300 md:top-4 md:w-80 md:flex-shrink-0">
  <SearchBar onLocationSelect={props.onLocationSelect} />
  {renderInfo()}
</div>
  );
};
