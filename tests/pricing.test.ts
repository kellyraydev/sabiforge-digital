import { describe, expect, it } from 'vitest';
import {
  FOUNDING_CLIENT_SLOTS,
  FOUNDING_DISCOUNT_RATE,
  applyDiscount,
  discountPercentLabel,
  formatNaira,
  foundingSlotsLabel,
} from '../src/lib/pricing';

describe('founding offer', () => {
  it('is 10% off', () => {
    expect(FOUNDING_DISCOUNT_RATE).toBe(0.1);
    expect(discountPercentLabel()).toBe('10%');
  });

  it('does not publish a slot count until the owner resolves 3 vs 5', () => {
    expect(FOUNDING_CLIENT_SLOTS).toBeNull();
    expect(foundingSlotsLabel()).toBe('a limited number of founding clients');
    expect(foundingSlotsLabel(3)).toBe('our first 3 founding clients');
  });
});

describe('applyDiscount', () => {
  it('matches the approved package prices', () => {
    expect(applyDiscount(120_000)).toBe(108_000);
    expect(applyDiscount(280_000)).toBe(252_000);
    expect(applyDiscount(500_000)).toBe(450_000);
  });

  it('rejects invalid rates', () => {
    expect(() => applyDiscount(1000, -0.1)).toThrow(RangeError);
    expect(() => applyDiscount(1000, 1)).toThrow(RangeError);
  });
});

describe('formatNaira', () => {
  it('uses the naira sign and thousands separators', () => {
    expect(formatNaira(108_000)).toBe('₦108,000');
    expect(formatNaira(900_000)).toBe('₦900,000');
  });

  it('rejects negative or non-finite values', () => {
    expect(() => formatNaira(-1)).toThrow(RangeError);
    expect(() => formatNaira(Number.NaN)).toThrow(RangeError);
  });
});
