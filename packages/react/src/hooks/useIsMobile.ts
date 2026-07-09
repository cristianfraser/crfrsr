import { useEffect, useState } from 'react';

/**
 * Returns true when the viewport width is below `breakpoint` (default 768px),
 * updating on resize. SSR-safe (returns false when `window` is unavailable).
 *
 * Replaces the app-level StyleContext dependency the Combobox previously relied
 * on, so the component is self-contained.
 */
export function useIsMobile(breakpoint = 768): boolean {
  const [isMobile, setIsMobile] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.innerWidth < breakpoint : false
  );

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, [breakpoint]);

  return isMobile;
}
