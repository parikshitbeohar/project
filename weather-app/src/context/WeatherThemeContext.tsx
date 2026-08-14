// context/WeatherThemeContext.tsx

import { createContext, useContext } from "react";
import type { UseWeatherThemeOptions, WeatherTheme, WeatherThemeProviderProps } from "../types/weather.types";

const defaultTheme: WeatherTheme = {
 gradient: "bg-purple-900/40",
  textColor: "text-purple-100",
  accentColor: "text-purple-300",
};

const getWeatherTheme = (conditionCode: number, isDaytime: boolean): WeatherTheme => {
  if (conditionCode >= 95) {
    return { gradient: "bg-gradient-to-b from-slate-700 to-slate-900", textColor: "text-white", accentColor: "text-purple-300" };
  }
  if (conditionCode >= 51 && conditionCode <= 82) {
    return isDaytime
      ? { gradient: "bg-gradient-to-b from-slate-400 to-slate-600", textColor: "text-white", accentColor: "text-blue-100" }
      : { gradient: "bg-gradient-to-b from-slate-800 to-slate-950", textColor: "text-white", accentColor: "text-blue-300" };
  }
  if (conditionCode >= 71 && conditionCode <= 86) {
    return { gradient: "bg-gradient-to-b from-sky-100 to-sky-300", textColor: "text-slate-800", accentColor: "text-sky-600" };
  }
  if (conditionCode >= 1 && conditionCode <= 48) {
    return isDaytime
      ? { gradient: "bg-gradient-to-b from-gray-300 to-gray-400", textColor: "text-gray-900", accentColor: "text-gray-600" }
      : { gradient: "bg-gradient-to-b from-gray-700 to-gray-900", textColor: "text-white", accentColor: "text-gray-400" };
  }
  return isDaytime
    ? { gradient: "bg-gradient-to-b from-sky-300 to-sky-500", textColor: "text-white", accentColor: "text-amber-200" }
    : { gradient: "bg-gradient-to-b from-indigo-900 to-slate-950", textColor: "text-white", accentColor: "text-indigo-200" };
}

const WeatherThemeContext = createContext<WeatherTheme>(defaultTheme);


export const WeatherThemeProvider = ({ conditionCode, isDaytime, children }: WeatherThemeProviderProps) => {
  const theme = conditionCode === null || isDaytime === null
    ? defaultTheme
    : getWeatherTheme(conditionCode, isDaytime);

  return <WeatherThemeContext.Provider value={theme}>{children}</WeatherThemeContext.Provider>;
}

export const useWeatherTheme = (options?: UseWeatherThemeOptions): WeatherTheme => {
  const contextTheme = useContext(WeatherThemeContext);

  if (options?.conditionCode !== undefined) {
    return getWeatherTheme(options.conditionCode,true);
  }

  return contextTheme;
};