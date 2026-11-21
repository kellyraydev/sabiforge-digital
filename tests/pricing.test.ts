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

  it('publishes five founding client slots', () => {
    expect(FOUNDING_CLIENT_SLOTS).toBe(5);
    expect(foundingSlotsLabel()).toBe('5 founding client slots');
    expect(foundingSlotsLabel(null)).toBe('a limited number of founding clients');
  });
});

describe('applyDiscount', () => {
  it('matches the approved package prices', () => {
    expect(applyDiscount(150_000)).toBe(135_000);
    expect(applyDiscount(350_000)).toBe(315_000);
    expect(applyDiscount(750_000)).toBe(675_000);
  });

  it('rejects invalid rates', () => {
    expect(() => applyDiscount(1000, -0.1)).toThrow(RangeError);
    expect(() => applyDiscount(1000, 1)).toThrow(RangeError);
  });
});

describe('formatNaira', () => {
  it('uses the naira sign and thousands separators', () => {
    expect(formatNaira(135_000)).toBe('₦135,000');
    expect(formatNaira(1_500_000)).toBe('₦1,500,000');
  });

  it('rejects negative or non-finite values', () => {
    expect(() => formatNaira(-1)).toThrow(RangeError);
    expect(() => formatNaira(Number.NaN)).toThrow(RangeError);
  });
});
