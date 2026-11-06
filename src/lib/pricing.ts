/** Founding-client offer: 10% off eligible website packages. */
export const FOUNDING_DISCOUNT_RATE = 0.1;

/**
 * Number of founding-client places. Deliberately unset: owner materials
 * conflict (3 in the project brief, 5 on the flyer). Public copy says
 * "a limited number" until the owner confirms a figure here.
 */
export const FOUNDING_CLIENT_SLOTS: number | null = null;

export function foundingSlotsLabel(slots: number | null = FOUNDING_CLIENT_SLOTS): string {
  return slots === null
    ? 'a limited number of founding clients'
    : `our first ${slots} founding clients`;
}

const nairaFormatter = new Intl.NumberFormat('en-NG', {
  style: 'currency',
  currency: 'NGN',
  maximumFractionDigits: 0,
  minimumFractionDigits: 0,
});

/** Formats a whole-naira amount, e.g. 108000 → "₦108,000". */
export function formatNaira(amount: number): string {
  if (!Number.isFinite(amount) || amount < 0) {
    throw new RangeError(`Invalid naira amount: ${amount}`);
  }
  // Some ICU builds render "NGN 108,000"; normalise to the ₦ sign.
  return nairaFormatter.format(Math.round(amount)).replace(/NGN\s?/, '₦');
}

/** Applies a percentage discount and rounds to the nearest naira. */
export function applyDiscount(amount: number, rate: number = FOUNDING_DISCOUNT_RATE): number {
  if (rate < 0 || rate >= 1) throw new RangeError(`Invalid discount rate: ${rate}`);
  return Math.round(amount * (1 - rate));
}

export function discountPercentLabel(rate: number = FOUNDING_DISCOUNT_RATE): string {
  return `${Math.round(rate * 100)}%`;
}
