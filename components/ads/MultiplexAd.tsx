'use client';

import { AdSlot } from '@/components/ads/AdSlot';

export function MultiplexAd() {
  return (
    <section className="my-6 sm:my-10 rounded-3xl border border-slate-200 bg-slate-50 p-4 sm:p-6 shadow-sm w-full overflow-hidden">
      <div className="flex flex-col gap-4 sm:gap-6 lg:flex-row lg:items-start lg:justify-between w-full">
        <div className="flex-1 min-w-0">
          <div className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-slate-600">Sponsored content</div>
          <AdSlot placement="multiplex_leaderboard" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-slate-600">Related ads</div>
          <AdSlot placement="multiplex_rectangle" />
        </div>
      </div>
    </section>
  );
}
