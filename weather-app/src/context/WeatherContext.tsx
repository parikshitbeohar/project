import { createContext, useContext } from 'react';
import type {
  UseWeatherThemeOptions,
  WeatherTheme,
  WeatherProviderProps,
} from '../types/weather.types';
import { getWeatherCategory } from '../utils/weatherCategory';

const defaultTheme: WeatherTheme = {
  gradient: 'bg-purple-900/40',
  textColor: 'text-purple-100',
  accentColor: 'text-purple-300',
};

const getWeatherTheme = (conditionCode: number, isDaytime: boolean): WeatherTheme => {
  const category = getWeatherCategory(conditionCode);

  switch (category) {
    case 'storm':
      return {
        gradient: 'bg-gradient-to-b from-slate-700 to-slate-900',
        textColor: 'text-white',
        accentColor: 'text-purple-300',
      };

    case 'drizzle':
    case 'rain':
    case 'rain-showers':
      return isDaytime
        ? {
            gradient: 'bg-gradient-to-b from-slate-400 to-slate-600',
            textColor: 'text-white',
            accentColor: 'text-blue-100',
          }
        : {
            gradient: 'bg-gradient-to-b from-slate-800 to-slate-950',
            textColor: 'text-white',
            accentColor: 'text-blue-300',
          };

    case 'snow':
    case 'snow-showers':
      return {
        gradient: 'bg-gradient-to-b from-sky-100 to-sky-300',
        textColor: 'text-slate-800',
        accentColor: 'text-sky-600',
      };

    case 'cloudy':
    case 'fog':
      return isDaytime
        ? {
            gradient: 'bg-gradient-to-b from-gray-300 to-gray-400',
            textColor: 'text-gray-900',
            accentColor: 'text-gray-600',
          }
        : {
            gradient: 'bg-gradient-to-b from-gray-700 to-gray-900',
            textColor: 'text-white',
            accentColor: 'text-gray-400',
          };

    case 'clear':
    default:
      return isDaytime
        ? {
            gradient: 'bg-gradient-to-b from-sky-300 to-sky-500',
            textColor: 'text-white',
            accentColor: 'text-amber-200',
          }
        : {
            gradient: 'bg-gradient-to-b from-indigo-900 to-slate-950',
            textColor: 'text-white',
            accentColor: 'text-indigo-200',
          };
  }
};

const WeatherContext = createContext<WeatherTheme>(defaultTheme);

export const WeatherThemeProvider = ({ weatherData, children }: WeatherProviderProps) => {
  const conditionCode = weatherData?.currentCondition ?? null;
  const isDaytime = weatherData?.isDaytime ?? null;
  const theme =
    conditionCode === null || isDaytime === null
      ? defaultTheme
      : getWeatherTheme(conditionCode, isDaytime);

  return <WeatherContext.Provider value={theme}>{children}</WeatherContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useWeatherTheme = (options?: UseWeatherThemeOptions): WeatherTheme => {
  const contextTheme = useContext(WeatherContext);

  if (options?.conditionCode !== undefined) {
    return getWeatherTheme(options.conditionCode, true);
  }

  return contextTheme;
};
