import { ulid } from 'ulid';

/**
 * Generate a unique coupon code
 * Format: RESTO-YYMM-XXXX
 */
export function generateCouponCode(restaurantSlug: string): string {
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const unique = ulid().slice(-4);

  return `${restaurantSlug.toUpperCase()}-${year}${month}-${unique}`;
}

/**
 * Calculate expiration date from now
 */
export function calculateExpirationDate(daysFromNow: number): Date {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  date.setHours(23, 59, 59, 999);
  return date;
}

/**
 * Check if a date is expired
 */
export function isExpired(date: Date): boolean {
  return new Date() > date;
}

