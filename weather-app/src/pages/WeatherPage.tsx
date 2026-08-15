import { useState } from 'react';
import { useWeather } from '../hooks/useWeather';
import type { LocationResult } from '../types/location.types';
import { WeatherProvider as WeatherProvider } from '../context/WeatherContext';
import { WeatherDashboard } from '../components/weather-dashboard/WeatherDashboard';
import { Footer } from '../components/footer/footer';
import Header from '../components/header/Header';

export const WeatherPage = () => {
  const DEFAULT_LOCATION: LocationResult = {
    name: 'London, United Kingdom',
    latitude: 51.5074,
    longitude: -0.1278,
  };

  const [selectedLocation, setSelectedLocation] = useState<LocationResult | null>(DEFAULT_LOCATION);

  const { data, isLoading, error, retry } = useWeather(selectedLocation ?? DEFAULT_LOCATION);

  const renderDashboard = () => {
    return (
      <WeatherProvider
        weatherData={data}
        isWeatherLoading={isLoading}
      >
        <WeatherDashboard
          error={error}
          retry={retry}
          onLocationSelect={setSelectedLocation}
        />
      </WeatherProvider>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-amber-100 via-sky-200 to-blue-300">
      <Header />
      {renderDashboard()}
      <Footer />
    </div>
  );
};
