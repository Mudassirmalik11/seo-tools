import type { BlogArticle } from '@/types/blog';

export function generateArticleSchema(article: BlogArticle) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    image: article.seo.ogImage || '/og-image.png',
    datePublished: article.publishedAt.toISOString(),
    dateModified: article.updatedAt?.toISOString() || article.publishedAt.toISOString(),
    author: {
      '@type': 'Person',
      name: article.author.name,
      url: article.author.url,
    },
    publisher: {
      '@type': 'Organization',
      name: 'SEO Tools Platform',
      logo: {
        '@type': 'ImageObject',
        url: '/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://seotools.example.com/blog/${article.slug}`,
    },
  };
}

export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  if (!faqs || faqs.length === 0) {
    return null;
  }

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

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
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

export function generateArticleWithFAQSchema(article: BlogArticle) {
  const articleSchema = generateArticleSchema(article);

  if (!article.faq || article.faq.length === 0) {
    return [articleSchema];
  }

  const faqSchema = generateFAQSchema(article.faq);
  return [articleSchema, faqSchema];
}
