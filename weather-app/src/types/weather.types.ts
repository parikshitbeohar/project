export interface WeatherApiResponse {
  current: {
    temperature_2m: number;
    weather_code: number;
    wind_speed_10m: number;
    relative_humidity_2m: number;
  };
  daily: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    sunrise: string[]; 
    sunset: string[]; 
  };
}

export interface WeatherData {
  location: string;
  currentTemp: number;
  currentCondition: number;
  windSpeed: number;
  humidity: number;
  isDaytime: boolean; 
  forecast: DayForecast[];
}


export interface DayForecast {
  date: string;
  dayLabel: string;
  condition: number;
  tempMax: number;
  tempMin: number;
}

export interface WeatherTheme {
  gradient: string;
  textColor: string;
  accentColor: string;
}

export interface WeatherProviderProps {
  weatherData: WeatherData | undefined;
  children: React.ReactNode;
}


export interface UseWeatherThemeOptions {
  conditionCode?: number;
}
