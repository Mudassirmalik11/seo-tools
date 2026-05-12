import { AD_CONFIG } from '@/lib/ads/config';
import { getNetworkAdapter } from '@/lib/ads/network';
import { getPageAdLayout } from '@/lib/ads/placements';
import type { AdNetworkAdapter, AdPageType, AdPlacement } from '@/types/ads';

export function getAdConfig(placement: AdPlacement) {
  return AD_CONFIG[placement];
}

export function getPageAdLayoutConfig(pageType: AdPageType) {
  return getPageAdLayout(pageType);
}

export function getAdNetworkAdapter(network: string): AdNetworkAdapter {
  return getNetworkAdapter(network);
}
