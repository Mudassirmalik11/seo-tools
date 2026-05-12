'use client';

import { useCallback, useEffect, useMemo, type ReactNode } from 'react';
import { AD_CONFIG } from '@/lib/ads/config';
import { getNetworkAdapter } from '@/lib/ads/network';
import { useLazyAd } from '@/hooks/useLazyAd';
import { useAdViewability } from '@/hooks/useAdViewability';
import { useResponsiveAd } from '@/hooks/useResponsiveAd';
import { AdPlaceholder } from '@/components/ads/AdPlaceholder';
import { AdProvider, useAdContext } from '@/components/ads/AdProvider';
import { ResponsiveAd } from '@/components/ads/ResponsiveAd';
import type { AdSlotProps } from '@/types/ads';

export function AdSlot({ placement, className = '' }: AdSlotProps) {
  const config = AD_CONFIG[placement];
  const adapter = getNetworkAdapter(config.network);
  const { elementRef: lazyRef, shouldLoad } = useLazyAd();
  const { elementRef: viewRef, isViewable } = useAdViewability({ threshold: 0.25, minVisibleTime: 300 });
  const { breakpoint } = useResponsiveAd();
  const { trackEvent } = useAdContext();

  const combinedRef = useCallback(
    (node: HTMLElement | null) => {
      lazyRef(node);
      viewRef(node);
    },
    [lazyRef, viewRef]
  );

  useEffect(() => {
    if (shouldLoad) {
      adapter.loadNetworkScript();
      adapter.pushAdSlot?.();
    }
  }, [adapter, shouldLoad]);

  useEffect(() => {
    if (shouldLoad && isViewable) {
      trackEvent({
        type: 'adImpression',
        placement,
        breakpoint,
        timestamp: Date.now(),
      });
    }
  }, [breakpoint, isViewable, placement, shouldLoad, trackEvent]);

  const adContent = useMemo(() => {
    if (!shouldLoad) {
      return <AdPlaceholder />;
    }

    return adapter.renderAdSlot({ placement, config });
  }, [adapter, placement, config, shouldLoad]);

  return (
    <div ref={combinedRef} className={`w-full ${className}`}>
      <ResponsiveAd placement={placement} config={config} breakpoint={breakpoint}>
        {adContent}
      </ResponsiveAd>
    </div>
  );
}

export function AdSlotProvider({ children }: { children: ReactNode }) {
  return <AdProvider>{children}</AdProvider>;
}
