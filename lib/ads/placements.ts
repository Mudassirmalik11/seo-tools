import type { AdPageType, AdPlacement } from '@/types/ads';

export const PAGE_AD_LAYOUTS: Record<AdPageType, AdPlacement[]> = {
  homePage: ['home_top_leaderboard', 'home_mid_rectangle', 'home_bottom_multiplex', 'mobile_sticky_anchor'],
  toolPage: ['tool_top_banner', 'tool_after_tool', 'tool_bottom_content', 'tool_sidebar', 'mobile_sticky_anchor'],
  blogPage: ['blog_top_leaderboard', 'blog_inline_rectangle', 'blog_bottom_multiplex', 'blog_sidebar', 'mobile_sticky_anchor'],
  blogPost: ['blog_top_leaderboard', 'blog_paragraph', 'blog_bottom_multiplex', 'blog_sidebar', 'mobile_sticky_anchor'],
  categoryPage: ['category_top_leaderboard', 'category_grid_rectangle', 'category_sidebar', 'mobile_sticky_anchor'],
  seoPage: ['home_top_leaderboard', 'tool_after_tool', 'blog_bottom_multiplex', 'mobile_sticky_anchor'],
};

export function getPageAdLayout(pageType: AdPageType) {
  return PAGE_AD_LAYOUTS[pageType] ?? PAGE_AD_LAYOUTS.homePage;
}

export const PAGE_AD_SLOTS: Record<AdPageType, string> = {
  homePage: 'home_top_leaderboard',
  toolPage: 'tool_top_banner',
  blogPage: 'blog_top_leaderboard',
  blogPost: 'blog_top_leaderboard',
  categoryPage: 'category_top_leaderboard',
  seoPage: 'home_top_leaderboard',
};
