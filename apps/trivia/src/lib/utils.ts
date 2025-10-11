import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind classes with clsx
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format date to localized string
 */
export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString('es-AR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Copy text to clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
}

/**
 * Get client IP (best effort)
 */
export function getClientInfo() {
  return {
    user_agent:
      typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
    // IP will be set by the API from request headers
  };
}

/**
 * Calculate score percentage
 */
export function getScorePercentage(correct: number, total: number): number {
  return total > 0 ? Math.round((correct / total) * 100) : 0;
}

/**
 * Get score emoji based on percentage
 */
export function getScoreEmoji(correct: number, total: number): string {
  const percentage = getScorePercentage(correct, total);
  if (percentage === 100) return '🎉';
  if (percentage >= 80) return '🌟';
  if (percentage >= 60) return '👍';
  if (percentage >= 40) return '😊';
  return '💪';
}
