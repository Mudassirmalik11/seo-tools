'use client';

import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { loadAdNetwork } from '@/lib/ads/network';
import { trackAdEvent } from '@/lib/ads/analytics';
import type { AdAnalyticsEvent, AdContextValue } from '@/types/ads';

const AdContext = createContext<AdContextValue | null>(null);

export function AdProvider({ children }: { children: ReactNode }) {
  const [isClientReady, setIsClientReady] = useState(false);

  useEffect(() => {
    setIsClientReady(true);
    loadAdNetwork('adSense');
  }, []);

  const value = useMemo(
    () => ({
      isClientReady,
      trackEvent: (event: AdAnalyticsEvent) => {
        trackAdEvent(event);
      },
    }),
    [isClientReady]
  );

  return <AdContext.Provider value={value}>{children}</AdContext.Provider>;
}

export function useAdContext() {
  const context = useContext(AdContext);
  if (!context) {
    throw new Error('useAdContext must be used within an AdProvider');
  }
  return context;
}
