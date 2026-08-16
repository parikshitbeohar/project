import {
  Sun,
  Cloud,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  CloudSnow,
  CloudLightning,
} from 'lucide-react';
import { getWeatherCategory, type WeatherCategory } from '../../utils/weatherCategory';

interface WeatherConditionProps {
  code: number;
  iconClassName?: string;
  textClassName?: string;
  animate?: boolean;
}

interface ConditionDetails {
  Icon: typeof Sun;
  text: string;
  animationClass: string;
}

const CONDITION_DETAILS: Record<WeatherCategory, ConditionDetails> = {
  clear: { Icon: Sun, text: 'Clear sky', animationClass: 'animate-sun-spin' },
  cloudy: { Icon: Cloud, text: 'Partly cloudy', animationClass: 'animate-cloud-drift' },
  fog: { Icon: CloudFog, text: 'Foggy', animationClass: 'animate-cloud-drift' },
  drizzle: { Icon: CloudDrizzle, text: 'Drizzle', animationClass: 'animate-rain-fall' },
  rain: { Icon: CloudRain, text: 'Rain', animationClass: 'animate-rain-fall' },
  snow: { Icon: CloudSnow, text: 'Snow', animationClass: 'animate-snow-fall' },
  'rain-showers': { Icon: CloudRain, text: 'Rain showers', animationClass: 'animate-rain-fall' },
  'snow-showers': { Icon: CloudSnow, text: 'Snow showers', animationClass: 'animate-snow-fall' },
  storm: { Icon: CloudLightning, text: 'Storm', animationClass: 'animate-storm-flash' },
};

export const WeatherCondition = ({
  code,
  iconClassName,
  textClassName,
  animate = false,
}: WeatherConditionProps) => {
  const category = getWeatherCategory(code);
  const { Icon, text, animationClass } = CONDITION_DETAILS[category];
  const isClearSky = category === 'clear';
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
