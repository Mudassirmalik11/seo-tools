'use client';

import { useCallback, useState } from 'react';
import { AdSlot } from '@/components/ads/AdSlot';

export function StickyMobileAd() {
  const [isDismissed, setIsDismissed] = useState(false);

  const handleDismiss = useCallback(() => {
    setIsDismissed(true);
  }, []);

  if (isDismissed) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 lg:hidden">
      <div className="mx-4 mb-safe px-3 pb-safe pt-3 backdrop-blur-sm">
        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_-4px_30px_rgba(15,23,42,0.08)]">
          <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">Sponsored</span>
            <button
              type="button"
              onClick={handleDismiss}
              className="text-slate-500 transition hover:text-slate-900"
              aria-label="Dismiss mobile ad"
            >
              ×
            </button>
          </div>

          <div className="px-4 py-3">
            <AdSlot placement="mobile_sticky_anchor" className="min-h-[90px]" />
          </div>
        </div>
      </div>
    </div>
  );
}
