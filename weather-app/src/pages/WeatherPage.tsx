import { useEffect, useRef, useState } from 'react';
import { useWeather } from '../hooks/useWeather';
import type { LocationResult } from '../types/location.types';
import { WeatherThemeProvider as WeatherThemeProvider } from '../context/WeatherContext';
import { WeatherDashboard } from '../components/weather-dashboard/WeatherDashboard';
import { Footer } from '../components/footer/footer';
import Header from '../components/header/Header';
import { ErrorState } from '../components/error-state/ErrorState';
import { Loader } from '../components/loader/Loader';
import { Overlay } from '../components/overlay/Overlay';

export const WeatherPage = () => {

  const DEFAULT_LOCATION: LocationResult = {
    name: 'London, United Kingdom',
    latitude: 51.5074,
    longitude: -0.1278,
  };

  const [selectedLocation, setSelectedLocation] = useState<LocationResult | null>(DEFAULT_LOCATION);

  const { data: weatherData, isLoading, error, retry } = useWeather(selectedLocation ?? DEFAULT_LOCATION);

  const isBlocked = isLoading || Boolean(error);

  const lastFocusedRef = useRef<HTMLElement | null>(null);
  const wasBlockedRef = useRef(isBlocked);

  useEffect(() => {
    if (wasBlockedRef.current && !isBlocked) {
      const target = lastFocusedRef.current;
      if (target && document.contains(target)) {
        target.focus();
      }
    }
    wasBlockedRef.current = isBlocked;
  }, [isBlocked]);

  const renderErrorState = () => {
    if (!error) return null;

    const message = error instanceof Error ? error.message : undefined;

    return (
      <Overlay>
        <ErrorState onRetry={retry} message={message} />
      </Overlay>
    );
  };

  const renderLoader = () => {
    if (!isLoading) return null;

    return (
      <Overlay>
        <Loader />
      </Overlay>
    );
  };

  const renderDashboard = () => {
    return (
      <WeatherThemeProvider weatherData={weatherData}>
      <WeatherDashboard onLocationSelect={setSelectedLocation} weatherData={weatherData} />
      </WeatherThemeProvider>
    );
  };

  return (
    <>
      <div
        className="flex flex-col min-h-screen bg-gradient-to-b from-amber-100 via-sky-200 to-blue-300"
        inert={isBlocked}
        onFocusCapture={(e) => {
          lastFocusedRef.current = e.target as HTMLElement;
        }}
      >
        <Header />
        {renderDashboard()}
        <Footer />
      </div>
      {renderErrorState()}
      {renderLoader()}
    </>
  );
};
