import React from 'react';
import type { AdSlotRenderParams } from '@/types/ads';

const ADSENSE_SCRIPT_ID = 'adsense-js-script';
const ADSENSE_CLIENT = 'ca-pub-YOUR-ADSENSE-ID';
const ADSENSE_URL = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`;

function injectScript(src: string, id: string) {
  if (typeof window === 'undefined') {
    return;
  }

  if (document.getElementById(id)) {
    return;
  }

  const script = document.createElement('script');
  script.async = true;
  script.src = src;
  script.crossOrigin = 'anonymous';
  script.id = id;
  document.head.appendChild(script);
}

function pushAdSlot() {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    (window as any).adsbygoogle = (window as any).adsbygoogle || [];
    (window as any).adsbygoogle.push({});
  } catch (error) {
    console.warn('AdSense push failed', error);
  }
}

export function loadAdNetwork(network: string) {
  if (network === 'adSense') {
    injectScript(ADSENSE_URL, ADSENSE_SCRIPT_ID);
  }
}

export const AdSenseAdapter = {
  id: 'adSense',
  name: 'Google AdSense',
  loadNetworkScript() {
    loadAdNetwork('adSense');
  },
  renderAdSlot({ config }: AdSlotRenderParams) {
    return React.createElement('ins', {
      className: 'adsbygoogle',
      style: { display: 'block' },
      'data-ad-client': ADSENSE_CLIENT,
      'data-ad-slot': config.slot,
      'data-ad-format': config.format,
      'data-full-width-responsive': config.responsive ? 'true' : 'false',
    });
  },
  pushAdSlot,
};

export const MockAdNetworkAdapter = {
  id: 'mock',
  name: 'Mock Ad Network',
  loadNetworkScript() {
    return;
  },
  renderAdSlot({ config }: AdSlotRenderParams) {
    return React.createElement(
      'div',
      {
        className:
          'flex h-full w-full items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-6 text-center text-sm text-slate-500',
      },
      React.createElement('div', null,
        React.createElement('p', { className: 'font-semibold text-slate-600' }, 'Ad slot'),
        React.createElement('p', null, config.label)
      )
    );
  },
  pushAdSlot() {
    return;
  },
};

export function getNetworkAdapter(network: string) {
  if (network === 'adSense') {
    return AdSenseAdapter;
  }
  return MockAdNetworkAdapter;
}
