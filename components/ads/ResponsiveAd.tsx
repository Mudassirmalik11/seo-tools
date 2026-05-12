'use client';

import type { ReactNode } from 'react';
import { getAdDimensions } from '@/lib/ads/breakpoints';
import type { AdConfigEntry, AdPlacement } from '@/types/ads';

interface ResponsiveAdProps {
  placement: AdPlacement;
  config: AdConfigEntry;
  breakpoint: 'mobile' | 'tablet' | 'desktop';
  children: ReactNode;
}

export function ResponsiveAd({ placement: _placement, config, breakpoint, children }: ResponsiveAdProps) {
  const dimensions = getAdDimensions(config, breakpoint);

  return (
    <div
      className="relative overflow-hidden rounded-2xl bg-white shadow-sm"
      style={{
        minHeight: dimensions.height,
        minWidth: dimensions.width,
        width: dimensions.width,
      }}
    >
      {children}
    </div>
  );
}
