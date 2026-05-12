'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

interface UseLazyAdOptions {
  threshold?: number;
  rootMargin?: string;
  delay?: number;
}

export function useLazyAd({ threshold = 0.1, rootMargin = '300px', delay = 200 }: UseLazyAdOptions = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const elementRef = useRef<HTMLElement | null>(null);
  const timerRef = useRef<number | null>(null);

  const setRef = useCallback((node: HTMLElement | null) => {
    elementRef.current = node;
  }, []);

  useEffect(() => {
    if (!elementRef.current || typeof IntersectionObserver === 'undefined') {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(elementRef.current);

    return () => {
      observer.disconnect();
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, [rootMargin, threshold]);

  useEffect(() => {
    if (!isIntersecting || shouldLoad) {
      return;
    }

    timerRef.current = window.setTimeout(() => {
      setShouldLoad(true);
    }, delay);

    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, [delay, isIntersecting, shouldLoad]);

  return {
    elementRef: setRef,
    shouldLoad,
    isIntersecting,
  };
}
