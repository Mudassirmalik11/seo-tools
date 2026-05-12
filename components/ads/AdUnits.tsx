/**
 * AdSense Components
 * Optimized ad placement system for monetization
 */

'use client';

export function AdBannerTop() {
  return (
    <div className="ad-container bg-white border-b border-gray-200">
      <div className="ad-label">Advertisement</div>
      <div>
        {/* 
          Replace with actual AdSense code:
          <ins className="adsbygoogle"
            style={{display: 'block'}}
            data-ad-client="ca-pub-YOUR-ADSENSE-ID"
            data-ad-slot="1234567890"
            data-ad-format="horizontal"
            data-full-width-responsive="true"></ins>
          <script>
            (adsbygoogle = window.adsbygoogle || []).push({});
          </script>
        */}
        <div className="h-[250px] flex items-center justify-center bg-gray-50 rounded">
          <p className="text-gray-500">Responsive Ad Space (728x90 or 300x250)</p>
        </div>
      </div>
    </div>
  );
}

export function AdBannerMiddle() {
  return (
    <div className="ad-container">
      <div className="ad-label">Advertisement</div>
      <div>
        <div className="h-[300px] flex items-center justify-center bg-gray-50 rounded">
          <p className="text-gray-500">Responsive Ad Space</p>
        </div>
      </div>
    </div>
  );
}

export function AdBannerBottom() {
  return (
    <div className="ad-container">
      <div className="ad-label">Advertisement</div>
      <div>
        <div className="h-[250px] flex items-center justify-center bg-gray-50 rounded">
          <p className="text-gray-500">Responsive Ad Space</p>
        </div>
      </div>
    </div>
  );
}

export function AdSidebar() {
  return (
    <aside className="hidden lg:block lg:col-span-1">
      <div className="sticky top-20">
        <div className="ad-container">
          <div className="ad-label">Advertisement</div>
          <div className="h-[600px] flex items-center justify-center bg-gray-50 rounded">
            <p className="text-gray-500">Sidebar Ad (300x600)</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

export function AdStickyAnchor() {
  return (
    <div className="fixed bottom-0 left-0 right-0 lg:hidden bg-white border-t border-gray-200 ad-container">
      <div className="ad-label">Advertisement</div>
      <div>
        <div className="h-[100px] flex items-center justify-center bg-gray-50 rounded">
          <p className="text-gray-500">Mobile Sticky Ad (320x50)</p>
        </div>
      </div>
    </div>
  );
}

/**
 * Props-based ad component for flexible placement
 */
interface AdProps {
  slot?: string;
  format?: 'responsive' | 'vertical' | 'horizontal' | 'square' | 'native';
  layout?: 'inline' | 'block' | 'in-article';
  className?: string;
}

export function AdUnit({ slot, format = 'responsive', layout = 'in-article', className = '' }: AdProps) {
  return (
    <div className={`ad-container ${className}`}>
      <div className="ad-label">Advertisement</div>
      <div>
        {/* 
          Replace with actual AdSense code:
          <ins className="adsbygoogle"
            style={{display: layout === 'in-article' ? 'block' : 'inline-block'}}
            data-ad-client="ca-pub-YOUR-ADSENSE-ID"
            data-ad-slot={slot || '0000000000'}
            data-ad-format={format}
            data-full-width-responsive="true"></ins>
          <script>
            (adsbygoogle = window.adsbygoogle || []).push({});
          </script>
        */}
        <div className="h-[250px] flex items-center justify-center bg-gray-50 rounded">
          <p className="text-gray-500">Ad Space - {format} / {layout} {slot ? `(${slot})` : ''}</p>
        </div>
      </div>
    </div>
  );
}
