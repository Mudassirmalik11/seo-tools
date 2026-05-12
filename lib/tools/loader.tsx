/**
 * Dynamic Tool Loader
 * Loads tool components on-demand
 */

import React from 'react';
import dynamic from 'next/dynamic';
import { ReactNode } from 'react';

// Dynamically import all tool components
const TOOL_COMPONENTS: Record<string, () => Promise<{ default: () => ReactNode }>> = {
  WordCounter: () => import('@/components/tools/WordCounter').then(m => ({ default: m.WordCounter })),
  KeywordDensityChecker: () => import('@/components/tools/KeywordDensityChecker').then(m => ({ default: m.KeywordDensityChecker })),
  ImageResizer: () => import('@/components/tools/ImageResizer').then(m => ({ default: m.ImageResizer })),
  TextCaseConverter: () => import('@/components/tools/TextCaseConverter').then(m => ({ default: m.TextCaseConverter })),
  JSONFormatter: () => import('@/components/tools/JSONFormatter').then(m => ({ default: m.JSONFormatter })),
};

/**
 * Load tool component dynamically
 */
export function loadToolComponent(componentName: string) {
  const loader = TOOL_COMPONENTS[componentName];
  
  if (!loader) {
    console.warn(`Tool component not found: ${componentName}`);
    // Return a simple component instead of trying to dynamically create one
    const Fallback = () => React.createElement(
      'div',
      { className: 'p-6 bg-yellow-50 border border-yellow-200 rounded' },
      `Tool component not found: ${componentName}`
    );
    return Fallback;
  }

  return dynamic(() => loader(), {
    ssr: true,
    loading: () => React.createElement('div', { className: 'p-6 bg-blue-50 border border-blue-200 rounded animate-pulse' }, 'Loading tool...'),
  });
}

/**
 * Load tool component with suspense fallback
 */
export function DynamicToolComponent({ componentName }: { componentName: string }) {
  const Component = loadToolComponent(componentName);
  return <Component />;
}
