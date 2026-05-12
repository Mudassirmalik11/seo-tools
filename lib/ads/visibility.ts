const MIN_VISIBLE_RATIO = 0.25;

export function getVisiblePercentage(entry: IntersectionObserverEntry) {
  return Math.round((entry.intersectionRatio ?? 0) * 100);
}

export function isViewable(entry: IntersectionObserverEntry) {
  return entry.isIntersecting && (entry.intersectionRatio ?? 0) >= MIN_VISIBLE_RATIO;
}
