import {
  Sun,
  Cloud,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  CloudSnow,
  CloudLightning,
} from 'lucide-react';

interface WeatherConditionProps {
  code: number;
  iconClassName?: string;
  textClassName?: string;
  animate?: boolean;
}

interface ConditionDetails {
  maxCode: number;
  Icon: typeof Sun;
  text: string;
  animationClass: string;
}

const CONDITIONS: ConditionDetails[] = [
  { maxCode: 0, Icon: Sun, text: 'Clear sky', animationClass: 'animate-sun-spin' },
  { maxCode: 3, Icon: Cloud, text: 'Partly cloudy', animationClass: 'animate-cloud-drift' },
  { maxCode: 48, Icon: CloudFog, text: 'Foggy', animationClass: 'animate-cloud-drift' },
  { maxCode: 57, Icon: CloudDrizzle, text: 'Drizzle', animationClass: 'animate-rain-fall' },
  { maxCode: 67, Icon: CloudRain, text: 'Rain', animationClass: 'animate-rain-fall' },
  { maxCode: 77, Icon: CloudSnow, text: 'Snow', animationClass: 'animate-snow-fall' },
  { maxCode: 82, Icon: CloudRain, text: 'Rain showers', animationClass: 'animate-rain-fall' },
  { maxCode: 86, Icon: CloudSnow, text: 'Snow showers', animationClass: 'animate-snow-fall' },
  { maxCode: Infinity, Icon: CloudLightning, text: 'Storm', animationClass: 'animate-storm-flash' },
];

const getConditionDetails = (code: number): ConditionDetails => {
  return (
    CONDITIONS.find((condition) => code <= condition.maxCode) ?? CONDITIONS[CONDITIONS.length - 1]
  );
}

export const WeatherCondition = ({
  code,
  iconClassName,
  textClassName,
  animate = false,
}: WeatherConditionProps) => {
  const { Icon, text, animationClass, maxCode } = getConditionDetails(code);
  const isClearSky = maxCode === 0;
  const iconAnimation = animate ? animationClass : 'animate-fade-in';

  return (
    <div className="flex items-center gap-2">
      <Icon
        className={`${iconClassName ?? ''} ${iconAnimation} ${isClearSky ? 'text-yellow-400' : ''}`}
        fill={isClearSky ? 'currentColor' : 'none'}
      />
      <span className={textClassName}>{text}</span>
    </div>
  );
};
