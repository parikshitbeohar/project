import { useState } from 'react';
import { useWeather } from '../hooks/useWeather';
import type { LocationResult } from '../types/location.types';
import { WeatherThemeProvider } from '../context/WeatherThemeContext';
import { WeatherDashboard } from '../components/weather-dashboard/WeatherDashboard';
import { Loader } from '../components/loader/loader';
import { Footer } from '../components/footer/footer';
import Header from '../components/header/Header';


export const WeatherPage = () => {

  const DEFAULT_LOCATION: LocationResult = {
  name: "London, United Kingdom",
  latitude: 51.5074,
  longitude: -0.1278,
};

  const [selectedLocation, setSelectedLocation] = useState<LocationResult | null>(DEFAULT_LOCATION);

  const { data, isLoading, error, retry } = useWeather(
     selectedLocation ?? DEFAULT_LOCATION
  );

  if(isLoading && !data) 
    return <Loader />;

  return (
    <WeatherThemeProvider
      conditionCode={data?.currentCondition ?? null}
      isDaytime={data?.isDaytime ?? null}
    >
    <div className="min-h-screen bg-gradient-to-b from-amber-100 via-sky-200 to-blue-300">
      <Header />
      <WeatherDashboard
        error={error}
        data={data}
        retry={retry}
        onLocationSelect={setSelectedLocation}
      />
      <Footer />
    </div>
    </WeatherThemeProvider>
  );
};
