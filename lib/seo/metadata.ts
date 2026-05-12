/**
 * SEO Utilities
 * Generate SEO metadata, canonical URLs, structured data, etc.
 */

import { SEOMetadata, ToolRegistry, ToolCategory, BlogPost } from '@/types';

const DOMAIN = 'https://seotools.example.com';

/**
 * Generate canonical URL
 */
export function generateCanonicalUrl(path: string): string {
  return `${DOMAIN}${path}`;
}

/**
 * Generate structured data for Tool page
 */
export function generateToolStructuredData(tool: ToolRegistry) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.name,
    description: tool.seo.description,
    url: generateCanonicalUrl(`/tools/${tool.slug}/`),
    applicationCategory: 'UtilityApplication',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '1250',
    },
  };
}

/**
 * Generate structured data for Category page
 */
export function generateCategoryStructuredData(category: ToolCategory) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: category.name,
    description: category.seo.description,
    url: generateCanonicalUrl(`/${category.slug}/`),
  };
}

/**
 * Generate structured data for BlogPost
 */
export function generateBlogStructuredData(post: BlogPost) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    image: '/og-image.png',
    datePublished: post.publishedAt.toISOString(),
    dateModified: post.updatedAt?.toISOString() || post.publishedAt.toISOString(),
    author: {
      '@type': 'Person',
      name: post.author,
    },
    mainEntity: {
      '@type': 'WebPage',
      '@id': generateCanonicalUrl(`/blog/${post.slug}/`),
    },
  };
}

/**
 * Generate FAQ structured data
 */
export function generateFAQStructuredData(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate meta tags for page
 */
export function generateMetaTags(seo: SEOMetadata) {
  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords.join(', '),
    canonical: seo.canonical || '',
    ogTitle: seo.title,
    ogDescription: seo.description,
    ogImage: seo.ogImage || '/og-image.png',
    ogType: 'website',
  };
}

/**
 * Generate metadata for a programmatic SEO variant page
 */
export function generateProgrammaticMetadata(tool: ToolRegistry, variant: any): SEOMetadata {
  return {
    title: variant.title || `${tool.name} ${variant.variant}`,
    description: variant.description || tool.description,
    keywords: variant.keywords || tool.seo.keywords,
    canonical: generateCanonicalUrl(`/use-cases/${tool.slug}/${variant.variant}/`),
    ogImage: variant.ogImage || tool.seo.ogImage,
  };
}

export function generateProgrammaticStructuredData(tool: ToolRegistry, variant: any) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: variant.title || `${tool.name} ${variant.variant}`,
    description: variant.description || tool.description,
    url: generateCanonicalUrl(`/use-cases/${tool.slug}/${variant.variant}/`),
    about: {
      '@type': 'Thing',
      name: tool.name,
      description: tool.description,
    },
  };
}

/**
 * Generate breadcrumb structured data
 */
export function generateBreadcrumbStructuredData(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Format for social sharing
 */
export function formatForSharing(
  title: string,
  description: string,
  url: string,
  imageUrl?: string
) {
  return {
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      image: imageUrl || '/og-image.png',
    },
    facebook: {
      title,
      description,
      image: imageUrl || '/og-image.png',
      url,
    },
    linkedin: {
      title,
      description,
      url,
    },
  };
}

/**
 * Generate robots meta tag
 */
export function generateRobotsMeta(indexed: boolean = true, followed: boolean = true) {
  const parts: string[] = [];
  
  if (indexed) parts.push('index');
  else parts.push('noindex');
  
  if (followed) parts.push('follow');
  else parts.push('nofollow');

  return parts.join(', ');
}
