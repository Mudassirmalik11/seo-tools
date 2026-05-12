import { getPageAdLayout, PAGE_AD_LAYOUTS } from '@/lib/ads/placements';
import type { AdPageType, AdPlacement, DeviceType } from '@/types/ads';

const RPM_WEIGHTS: Record<AdPlacement, number> = {
  home_top_leaderboard: 1,
  home_mid_rectangle: 0.85,
  home_bottom_multiplex: 0.9,
  tool_top_banner: 1,
  tool_after_tool: 0.95,
  tool_bottom_content: 0.85,
  tool_sidebar: 0.7,
  mobile_sticky_anchor: 1,
  blog_top_leaderboard: 0.98,
  blog_inline_rectangle: 0.88,
  blog_paragraph: 0.92,
  blog_sidebar: 0.72,
  blog_bottom_multiplex: 0.9,
  category_top_leaderboard: 0.95,
  category_grid_rectangle: 0.82,
  category_sidebar: 0.7,
  multiplex_leaderboard: 0.9,
  multiplex_rectangle: 0.85,
};

const DEVICE_PRIORITY: Record<DeviceType, number> = {
  desktop: 1,
  tablet: 0.95,
  mobile: 0.9,
};

export function resolvePageAdPlacements(pageType: AdPageType, device: DeviceType) {
  const placements = getPageAdLayout(pageType);
  return placements
    .map((placement) => ({
      placement,
      score: RPM_WEIGHTS[placement] * DEVICE_PRIORITY[device],
    }))
    .sort((a, b) => b.score - a.score)
    .map((entry) => entry.placement);
}

export function getTopRPMPlacements(pageType: AdPageType, device: DeviceType, limit = 3) {
  return resolvePageAdPlacements(pageType, device).slice(0, limit);
}

export function getPageRPMLayout(pageType: AdPageType) {
  return PAGE_AD_LAYOUTS[pageType] ?? PAGE_AD_LAYOUTS.homePage;
}
