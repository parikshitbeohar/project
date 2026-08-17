import { describe, it, expect } from 'vitest';
import { isPostcode } from './postcodeDetector';

describe('isPostcode', () => {
  it('returns false for an empty string', () => {
    expect(isPostcode('')).toBe(false);
  });

  it.each(['SW1A 1AA', 'sw1a1aa', 'EC1A 1BB', 'M1 1AE', ' SW1A 1AA '])(
    'returns true for a valid UK postcode "%s"',
    (input) => {
      expect(isPostcode(input)).toBe(true);
    }
  );

  it.each(['London', 'New York', 'Paris, France', '12345', 'not a postcode'])(
    'returns false for a non-postcode string "%s"',
    (input) => {
      expect(isPostcode(input)).toBe(false);
    }
  );
});
