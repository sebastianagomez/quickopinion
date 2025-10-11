/**
 * Generate a unique coupon code
 * Format: {RESTAURANT_SLUG}-{YYMM}-{RANDOM}
 * Example: DEMO-2510-A3F9
 */
export function generateCouponCode(restaurantSlug: string): string {
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');

  // Generate random 4-character alphanumeric code
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();

  const slug = restaurantSlug.toUpperCase().replace(/[^A-Z0-9]/g, '');

  return `${slug}-${year}${month}-${random}`;
}

/**
 * Calculate expiration date from now
 * @param daysFromNow Number of days until expiration
 * @returns Date object set to end of day (23:59:59)
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
