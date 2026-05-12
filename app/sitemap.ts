/**
 * Sitemap - SEO critical for crawlability
 */

import { MetadataRoute } from 'next';
import { getSitemapData } from '@/lib/tools/registry';
// hello
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://seotools.example.com';
  const data = getSitemapData();
  const entries: MetadataRoute.Sitemap = [];

  // Homepage
  entries.push({
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 1.0,
  });

  // Tool pages
  data.tools.forEach(tool => {
    entries.push({
      url: `${baseUrl}/tools/${tool.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    });
  });

  // Category pages
  data.categories.forEach(category => {
    entries.push({
      url: `${baseUrl}/${category.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    });
  });

  // Programmatic SEO pages
  data.programmaticPages.forEach(page => {
    entries.push({
      url: `${baseUrl}/use-cases/${page.toolSlug}-${page.variant.variant}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    });
  });

  // Blog pages
  entries.push({
    url: `${baseUrl}/blog`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.8,
  });

  // All tools page
  entries.push({
    url: `${baseUrl}/tools`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  });

  return entries;
}
