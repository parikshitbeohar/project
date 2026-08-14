interface ErrorStateProps {
  onRetry: () => void;
  message?: string;
}

export const ErrorState = ({ onRetry, message }: ErrorStateProps) => {
  return (
    <div className="flex flex-col items-center gap-3 p-6 text-center" role="alert">
      <p className="text-sm text-gray-600">
        {message ?? "We couldn't load the weather for this location. Please try again."}
      </p>
      <button
        onClick={onRetry}
        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Try again
      </button>
    </div>
  );
}