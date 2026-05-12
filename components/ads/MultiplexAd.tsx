'use client';

import { AdSlot } from '@/components/ads/AdSlot';

export function MultiplexAd() {
  return (
    <section className="my-10 rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex-1">
          <div className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-slate-600">Sponsored content</div>
          <AdSlot placement="multiplex_leaderboard" />
        </div>

        <div className="flex-1">
          <div className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-slate-600">Related ads</div>
          <AdSlot placement="multiplex_rectangle" />
        </div>
      </div>
    </section>
  );
}
