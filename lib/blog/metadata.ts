import type { BlogArticle, BlogCategory, TopicalCluster } from '@/types/blog';
import { Metadata } from 'next';

export function generateBlogArticleMetadata(article: BlogArticle): Metadata {
  const url = `https://seotools.example.com/blog/${article.slug}`;

  return {
    title: article.seo.title || article.title,
    description: article.seo.description || article.excerpt,
    keywords: article.seo.keywords,
    metadataBase: new URL(url),
    alternates: {
      canonical: article.seo.canonical || url,
    },
    openGraph: {
      title: article.seo.ogTitle || article.title,
      description: article.seo.ogDescription || article.excerpt,
      url,
      type: 'article',
      authors: [article.author.name],
      publishedTime: article.publishedAt.toISOString(),
      modifiedTime: article.updatedAt?.toISOString(),
      images: article.seo.ogImage ? [{ url: article.seo.ogImage, width: 1200, height: 630 }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.seo.ogTitle || article.title,
      description: article.seo.ogDescription || article.excerpt,
      images: article.seo.ogImage ? [article.seo.ogImage] : undefined,
    },
    robots: article.seo.robots || 'index, follow',
  };
}

export function generateCategoryMetadata(category: BlogCategory): Metadata {
  const url = `https://seotools.example.com/blog/category/${category.slug}`;

  return {
    title: category.seo.title,
    description: category.seo.description,
    keywords: category.seo.keywords,
    metadataBase: new URL(url),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: category.seo.title,
      description: category.seo.description,
      url,
      type: 'website',
    },
    robots: 'index, follow',
  };
}

export function generateClusterMetadata(cluster: TopicalCluster): Metadata {
  const url = `https://seotools.example.com/blog/cluster/${cluster.slug}`;

  return {
    title: cluster.seo.title,
    description: cluster.seo.description,
    keywords: cluster.seo.keywords,
    metadataBase: new URL(url),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: cluster.seo.title,
      description: cluster.seo.description,
      url,
      type: 'website',
    },
    robots: 'index, follow',
  };
}
