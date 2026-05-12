'use client';

import { AdSlot } from '@/components/ads/AdSlot';

export function SidebarAd() {
  return (
    <div className="hidden xl:block">
      <div className="sticky top-20 space-y-4">
        <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-600">Sponsored</h2>
          <div className="mt-4">
            <AdSlot placement="blog_sidebar" />
          </div>
        </div>
      </div>
    </div>
  );
}
