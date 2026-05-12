'use client';

import { ReactNode } from 'react';
import { useLazyAd } from '@/hooks/useLazyAd';

interface LazyAdProps {
  children: ReactNode;
  className?: string;
}

export function LazyAd({ children, className = '' }: LazyAdProps) {
  const { elementRef, shouldLoad } = useLazyAd({ rootMargin: '400px', threshold: 0.1, delay: 220 });

  return (
    <div ref={elementRef} className={className}>
      {shouldLoad ? children : <div className="min-h-[250px] w-full" />}
    </div>
  );
}
