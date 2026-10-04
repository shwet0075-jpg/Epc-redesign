import { useState, useEffect } from 'react';

/**
 * Custom hook to detect mobile viewport.
 * Safe for SSR and reactive to viewport resize.
 * Default breakpoint: 768px.
 */
export function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth <= breakpoint;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const check = () => setIsMobile(window.innerWidth <= breakpoint);
    window.addEventListener('resize', check, { passive: true });
    return () => window.removeEventListener('resize', check);
  }, [breakpoint]);

  return isMobile;
}

export default useIsMobile;
