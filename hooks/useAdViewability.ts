'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

interface UseAdViewabilityOptions {
  threshold?: number;
  minVisibleTime?: number;
}

export function useAdViewability({ threshold = 0.25, minVisibleTime = 500 }: UseAdViewabilityOptions = {}) {
  const [isViewable, setIsViewable] = useState(false);
  const [visiblePercentage, setVisiblePercentage] = useState(0);
  const nodeRef = useRef<HTMLElement | null>(null);
  const timerRef = useRef<number | null>(null);

  const setRef = useCallback((node: HTMLElement | null) => {
    nodeRef.current = node;
  }, []);

  useEffect(() => {
    if (!nodeRef.current || typeof IntersectionObserver === 'undefined') {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const percentage = Math.round((entry.intersectionRatio ?? 0) * 100);
        setVisiblePercentage(percentage);

        if (entry.isIntersecting && (entry.intersectionRatio ?? 0) >= threshold) {
          timerRef.current = window.setTimeout(() => {
            setIsViewable(true);
          }, minVisibleTime);
        } else {
          setIsViewable(false);
          if (timerRef.current) {
            window.clearTimeout(timerRef.current);
          }
        }
      },
      { threshold: [threshold], rootMargin: '0px' }
    );

    observer.observe(nodeRef.current);

    return () => {
      observer.disconnect();
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, [threshold, minVisibleTime]);

  return {
    elementRef: setRef,
    isViewable,
    visiblePercentage,
  };
}
