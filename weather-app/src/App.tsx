import { ErrorBoundary } from 'react-error-boundary';
import { WeatherPage } from './pages/WeatherPage';
import { StatusCard } from './components/status-card/StatusCard';

const App = () => {
  const ErrorFallback = () => (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-amber-100 via-sky-200 to-blue-300 p-4">
      <StatusCard role="alert">
        <p className="text-sm text-gray-600">Something went wrong. Please reload the page.</p>
        <button
          onClick={() => window.location.reload()}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Reload page
        </button>
      </StatusCard>
    </div>
  );
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(error, info) => console.error(error, info)}
    >
      <WeatherPage />
    </ErrorBoundary>
  );
};

export default App;
