import { describe, it, expect } from 'vitest';
import { getWeatherCategory } from './weatherCategory';

describe('getWeatherCategory', () => {
  it.each([
    [-5, 'clear'],
    [0, 'clear'],
    [1, 'cloudy'],
    [3, 'cloudy'],
    [4, 'fog'],
    [48, 'fog'],
    [49, 'drizzle'],
    [57, 'drizzle'],
    [58, 'rain'],
    [67, 'rain'],
    [68, 'snow'],
    [77, 'snow'],
    [78, 'rain-showers'],
    [82, 'rain-showers'],
    [83, 'snow-showers'],
    [86, 'snow-showers'],
    [87, 'storm'],
    [200, 'storm'],
  ] as const)('maps code %i to %s', (code, expected) => {
    expect(getWeatherCategory(code)).toBe(expected);
  });

  it('keeps adjacent boundaries in separate categories', () => {
    expect(getWeatherCategory(67)).toBe('rain');
    expect(getWeatherCategory(68)).toBe('snow');
  });
});
