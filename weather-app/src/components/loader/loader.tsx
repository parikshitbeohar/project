// components/Loader/Loader.tsx

export const Loader = () => {
  return (
    <div
      className="w-full animate-pulse"
      aria-hidden="true"
      role="status"
      aria-label="Loading weather"
    >
      {/* Current-weather placeholder */}
      <div className="flex flex-col items-center gap-3 rounded-lg bg-gray-200 p-6">
        <div className="h-5 w-32 rounded-md bg-gray-300" />
        <div className="h-16 w-16 rounded-full bg-gray-300" />
        <div className="h-10 w-20 rounded-md bg-gray-300" />
        <div className="h-4 w-28 rounded-md bg-gray-300" />
      </div>

      {/* Forecast row placeholders — same 3-column grid as the real ForecastCard */}
      <div className="mt-3 flex flex-col gap-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="grid w-full grid-cols-[80px_1fr_80px] items-center gap-4 rounded-lg border border-gray-100 bg-gray-200 p-4"
          >
            <div className="h-4 w-14 rounded-md bg-gray-300" />
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-full bg-gray-300" />
              <div className="h-4 w-20 rounded-md bg-gray-300" />
            </div>
            <div className="h-4 w-16 justify-self-end rounded-md bg-gray-300" />
          </div>
        ))}
      </div>
    </div>
  );
}