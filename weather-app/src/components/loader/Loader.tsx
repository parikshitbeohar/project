import { StatusCard } from '../status-card/StatusCard';

interface LoaderProps {
  label?: string;
}

export const Loader = ({ label = 'Loading weather…' }: LoaderProps) => {
  return (
    <StatusCard role="status" ariaLive="polite">
      <span
        aria-hidden="true"
        className="h-8 w-8 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600"
      />
      <span className="text-sm font-medium text-gray-700">{label}</span>
    </StatusCard>
  );
};
