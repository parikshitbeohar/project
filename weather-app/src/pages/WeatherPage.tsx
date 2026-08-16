import { useState } from 'react';
import { useWeather } from '../hooks/useWeather';
import type { LocationResult } from '../types/location.types';
import { WeatherThemeProvider as WeatherThemeProvider } from '../context/WeatherContext';
import { WeatherDashboard } from '../components/weather-dashboard/WeatherDashboard';
import { Footer } from '../components/footer/footer';
import Header from '../components/header/Header';
import { ErrorState } from '../components/error-state/ErrorState';

export const WeatherPage = () => {
  const DEFAULT_LOCATION: LocationResult = {
    name: 'London, United Kingdom',
    latitude: 51.5074,
    longitude: -0.1278,
  };

  const [selectedLocation, setSelectedLocation] = useState<LocationResult | null>(DEFAULT_LOCATION);

  const { data: weatherData, isLoading, error, retry } = useWeather(selectedLocation ?? DEFAULT_LOCATION);

  const renderErrorState = () => {
    return error && <div className="absolute top-[40%] left-[50%] transform -translate-x-1/2 -translate-y-1/2"><ErrorState onRetry={retry} /></div>;
  };

  const renderLoader = () => {
    return isLoading && <div className="absolute top-[40%] left-[50%] transform -translate-x-1/2 -translate-y-1/2">Loading...</div>;
  };

  const renderDashboard = () => {
    return (
      <WeatherThemeProvider weatherData={weatherData}>
      {weatherData && <WeatherDashboard onLocationSelect={setSelectedLocation} weatherData={weatherData} />}
      </WeatherThemeProvider>
    );
  };

  return (
    <>
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-amber-100 via-sky-200 to-blue-300">
        <Header />
        {renderDashboard()}
        <Footer />
      </div>
      {renderErrorState()}
      {renderLoader()}
    </>
  );
};
