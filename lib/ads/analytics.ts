import type { AdAnalyticsEvent } from '@/types/ads';

const supportedTrackers = {
  gtag: typeof window !== 'undefined' ? (window as any).gtag : undefined,
  posthog: typeof window !== 'undefined' ? (window as any).posthog : undefined,
};

export function trackAdEvent(event: AdAnalyticsEvent) {
  if (typeof window === 'undefined') {
    return;
  }

  const payload = {
    event: event.type,
    placement: event.placement,
    placementType: event.placementType,
    pageType: event.pageType,
    device: event.device,
    timestamp: event.timestamp || Date.now(),
    metadata: event.metadata || {},
  };

  if (supportedTrackers.gtag) {
    supportedTrackers.gtag('event', event.type, payload);
  }

  if (supportedTrackers.posthog) {
    supportedTrackers.posthog.capture(event.type, payload);
  }

  if (!supportedTrackers.gtag && !supportedTrackers.posthog) {
    console.debug('[AdAnalytics]', payload);
  }
}
