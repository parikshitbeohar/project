// components/WeatherCondition/WeatherCondition.tsx

import { Sun, Cloud, CloudFog, CloudDrizzle, CloudRain, CloudSnow, CloudLightning } from "lucide-react";

interface ConditionDetails {
  Icon: typeof Sun;
  text: string;
  animationClass: string;
  isClearSky: boolean;
}

const CONDITION_MAP: ConditionDetails[] = [
  { Icon: Sun, text: "Clear sky", animationClass: "animate-sun-spin", isClearSky: true },
  { Icon: Cloud, text: "Partly cloudy", animationClass: "animate-cloud-drift", isClearSky: false },
  { Icon: CloudFog, text: "Foggy", animationClass: "animate-cloud-drift", isClearSky: false },
  { Icon: CloudDrizzle, text: "Drizzle", animationClass: "animate-rain-fall", isClearSky: false },
  { Icon: CloudRain, text: "Rain", animationClass: "animate-rain-fall", isClearSky: false },
  { Icon: CloudSnow, text: "Snow", animationClass: "animate-snow-fall", isClearSky: false },
  { Icon: CloudRain, text: "Rain showers", animationClass: "animate-rain-fall", isClearSky: false },
  { Icon: CloudSnow, text: "Snow showers", animationClass: "animate-snow-fall", isClearSky: false },
  { Icon: CloudLightning, text: "Storm", animationClass: "animate-storm-flash", isClearSky: false },
];

const CODE_THRESHOLDS = [0, 3, 48, 57, 67, 77, 82, 86, Infinity];

function getConditionDetails(code: number): ConditionDetails {
  const index = CODE_THRESHOLDS.findIndex((threshold) => code <= threshold);
  return CONDITION_MAP[index];
}

interface WeatherConditionProps {
  code: number;
  iconClassName?: string;
  textClassName?: string;
  animate?: boolean;
}

export const WeatherCondition = ({ code, iconClassName, textClassName, animate = false }: WeatherConditionProps) => {
  const { Icon, text, animationClass, isClearSky } = getConditionDetails(code);

  return (
    <div className="flex items-center gap-2">
      <Icon
        className={`${iconClassName ?? ""} ${animate ? animationClass : "animate-fade-in"} ${
          isClearSky ? "text-yellow-400" : ""
        }`}
        fill={isClearSky ? "currentColor" : "none"}
      />
      <span className={textClassName}>{text}</span>
    </div>
  );
};