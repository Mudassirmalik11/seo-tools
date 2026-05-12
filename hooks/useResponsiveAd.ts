'use client';

import { useEffect, useState } from 'react';
import { getAdBreakpoint } from '@/lib/ads/breakpoints';
import type { AdBreakpoint } from '@/lib/ads/breakpoints';

export function useResponsiveAd() {
  const [breakpoint, setBreakpoint] = useState<AdBreakpoint>('desktop');

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const updateBreakpoint = () => {
      setBreakpoint(getAdBreakpoint(window.innerWidth));
    };

    updateBreakpoint();
    window.addEventListener('resize', updateBreakpoint);

    return () => {
      window.removeEventListener('resize', updateBreakpoint);
    };
  }, []);

  return { breakpoint };
}
