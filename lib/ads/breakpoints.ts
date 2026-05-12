import type { AdConfigEntry } from '@/types/ads';

export const AD_BREAKPOINTS = {
  mobile: 0,
  tablet: 768,
  desktop: 1280,
} as const;

export type AdBreakpoint = keyof typeof AD_BREAKPOINTS;

export function getAdBreakpoint(width: number): AdBreakpoint {
  if (width >= AD_BREAKPOINTS.desktop) {
    return 'desktop';
  }
  if (width >= AD_BREAKPOINTS.tablet) {
    return 'tablet';
  }
  return 'mobile';
}

export function getAdDimensions(config: AdConfigEntry, breakpoint: AdBreakpoint) {
  const fallback = { width: '100%', height: 250 };
  return config.breakpoints?.[breakpoint] ?? fallback;
}
