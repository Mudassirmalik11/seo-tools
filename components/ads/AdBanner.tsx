'use client';

import { AdSlot } from '@/components/ads/AdSlot';
import type { AdPlacement } from '@/types/ads';

interface AdBannerProps {
  placement: AdPlacement;
  className?: string;
}

export function AdBanner({ placement, className = '' }: AdBannerProps) {
  return (
    <section className={`w-full ${className}`} aria-label="Advertisement banner">
      <div className="container-section">
        <AdSlot placement={placement} />
      </div>
    </section>
  );
}
