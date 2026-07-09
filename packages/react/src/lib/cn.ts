import { clsx, type ClassValue } from 'clsx';

/**
 * Class-name combiner for the design system. Uses clsx only — the library ships
 * plain CSS class names (no Tailwind), so there is nothing for tailwind-merge to
 * resolve. Consumer-provided classes are appended last and win by source order.
 */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}
