export type AdPageType = 'homePage' | 'toolPage' | 'blogPage' | 'blogPost' | 'categoryPage' | 'seoPage';

export type AdFormat = 'horizontal' | 'rectangle' | 'vertical' | 'responsive';

export type DeviceType = 'desktop' | 'tablet' | 'mobile';

export type AdPlacement =
  | 'home_top_leaderboard'
  | 'home_mid_rectangle'
  | 'home_bottom_multiplex'
  | 'tool_top_banner'
  | 'tool_after_tool'
  | 'tool_bottom_content'
  | 'tool_sidebar'
  | 'mobile_sticky_anchor'
  | 'blog_top_leaderboard'
  | 'blog_inline_rectangle'
  | 'blog_paragraph'
  | 'blog_sidebar'
  | 'blog_bottom_multiplex'
  | 'category_top_leaderboard'
  | 'category_grid_rectangle'
  | 'category_sidebar'
  | 'multiplex_leaderboard'
  | 'multiplex_rectangle';

export type AdBreakpoint = 'mobile' | 'tablet' | 'desktop';

export interface AdDimensions {
  width: string;
  height: number;
}

export interface AdConfigEntry {
  slot: string;
  network: string;
  format: AdFormat;
  responsive: boolean;
  label: string;
  breakpoints: Record<AdBreakpoint, AdDimensions>;
}

export interface AdSlotProps {
  placement: AdPlacement;
  className?: string;
}

export interface AdSlotRenderParams {
  placement: AdPlacement;
  config: AdConfigEntry;
}

export interface AdAnalyticsEvent {
  type: 'adImpression' | 'adVisibility' | 'adClick' | 'adRender' | string;
  placement: AdPlacement;
  placementType?: string;
  pageType?: AdPageType;
  device?: DeviceType;
  breakpoint?: AdBreakpoint;
  timestamp?: number;
  metadata?: Record<string, any>;
}

export interface AdNetworkAdapter {
  id: string;
  name: string;
  loadNetworkScript: () => void;
  renderAdSlot: (params: AdSlotRenderParams) => React.ReactNode;
  pushAdSlot?: () => void;
}

export interface AdContextValue {
  isClientReady: boolean;
  trackEvent: (event: AdAnalyticsEvent) => void;
}
