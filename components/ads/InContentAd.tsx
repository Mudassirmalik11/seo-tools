'use client';

import { ReactNode, useMemo } from 'react';
import { AdSlot } from '@/components/ads/AdSlot';
import type { AdPlacement } from '@/types/ads';

interface InContentAdProps {
  contentHtml?: string;
  children?: ReactNode;
  placement?: AdPlacement;
  interval?: number;
}

function splitHtmlParagraphs(html: string) {
  const paragraphs = html.match(/<p[\s\S]*?<\/p>/gi) || [html];
  return paragraphs.map((block, index) => (
    <div key={`paragraph-${index}`} dangerouslySetInnerHTML={{ __html: block }} />
  ));
}

export function InContentAd({ contentHtml, children, placement = 'blog_paragraph', interval = 3 }: InContentAdProps) {
  const blocks = useMemo(() => {
    if (contentHtml) {
      return splitHtmlParagraphs(contentHtml);
    }

    return children ? Array.isArray(children) ? children : [children] : [];
  }, [children, contentHtml]);

  const contentWithAds: ReactNode[] = [];
  let paragraphCount = 0;

  blocks.forEach((block, index) => {
    contentWithAds.push(<div key={`content-${index}`}>{block}</div>);
    if (++paragraphCount % interval === 0) {
      contentWithAds.push(
        <div key={`ad-${index}`} className="my-8">
          <AdSlot placement={placement} />
        </div>
      );
    }
  });

  return <>{contentWithAds}</>;
}
