import type { BlogArticle, BlogCategory, TopicalCluster, BlogTag } from '@/types/blog';

export const BLOG_CATEGORIES: BlogCategory[] = [
  {
    id: 'seo',
    slug: 'seo',
    name: 'SEO & Search',
    description: 'Search engine optimization techniques, keyword research, on-page SEO, and search strategy guides.',
    icon: '🔍',
    seo: {
      title: 'SEO & Search Optimization | Blog',
      description: 'Learn SEO best practices, keyword optimization, and search engine ranking strategies.',
      keywords: ['SEO', 'search optimization', 'keyword research', 'on-page SEO', 'search ranking'],
    },
  },
  {
    id: 'content',
    slug: 'content',
    name: 'Content Strategy',
    description: 'Content creation, optimization, and distribution strategies for maximum reach and engagement.',
    icon: '✍️',
    seo: {
      title: 'Content Strategy & Creation | Blog',
      description: 'Master content creation, optimization, and distribution strategies for your audience.',
      keywords: ['content strategy', 'content creation', 'content optimization', 'writing guides'],
    },
  },
  {
    id: 'images',
    slug: 'images',
    name: 'Image & Media',
    description: 'Image optimization, compression, formats, and visual media best practices.',
    icon: '🖼️',
    seo: {
      title: 'Image Optimization & Media | Blog',
      description: 'Learn image optimization, compression techniques, and visual content best practices.',
      keywords: ['image optimization', 'image compression', 'webp', 'visual content', 'media SEO'],
    },
  },
  {
    id: 'tools',
    slug: 'tools',
    name: 'Tool Guides',
    description: 'Comprehensive guides and tutorials for using our SEO and content tools effectively.',
    icon: '🛠️',
    seo: {
      title: 'Tool Guides & Tutorials | Blog',
      description: 'Complete tutorials and guides for maximizing our free SEO and content tools.',
      keywords: ['tool guides', 'tutorials', 'how-to guides', 'tool tips'],
    },
  },
];

export const BLOG_TAGS: BlogTag[] = [
  {
    id: 'keyword-research',
    slug: 'keyword-research',
    name: 'Keyword Research',
    description: 'Articles about keyword research, keyword density, and keyword optimization.',
  },
  {
    id: 'on-page-seo',
    slug: 'on-page-seo',
    name: 'On-Page SEO',
    description: 'On-page optimization techniques and best practices.',
  },
  {
    id: 'image-compression',
    slug: 'image-compression',
    name: 'Image Compression',
    description: 'Image compression techniques and optimization guides.',
  },
  {
    id: 'web-vitals',
    slug: 'web-vitals',
    name: 'Web Vitals',
    description: 'Core Web Vitals, performance metrics, and optimization.',
  },
  {
    id: 'writing',
    slug: 'writing',
    name: 'Writing Tips',
    description: 'Writing techniques, copywriting, and content improvement.',
  },
  {
    id: 'seo-tools',
    slug: 'seo-tools',
    name: 'SEO Tools',
    description: 'Tool reviews and guides for SEO professionals.',
  },
];

export const TOPICAL_CLUSTERS: TopicalCluster[] = [
  {
    id: 'keyword-optimization',
    slug: 'keyword-optimization',
    name: 'Keyword Optimization',
    description: 'Everything about keywords, keyword density, keyword research, and keyword optimization strategies.',
    pillarArticle: 'complete-guide-keyword-optimization',
    relatedArticles: [
      'what-is-keyword-density',
      'keyword-density-checker-guide',
      'keyword-stuffing-explained',
      'long-tail-keywords-strategy',
      'keyword-research-beginners',
    ],
    relatedTools: ['keyword-density-checker', 'word-counter'],
    seo: {
      title: 'Keyword Optimization | Complete Guide',
      description: 'Master keyword optimization, density, research, and strategy.',
      keywords: ['keyword optimization', 'keyword density', 'keyword research', 'SEO keywords', 'long-tail keywords'],
    },
  },
  {
    id: 'image-optimization',
    slug: 'image-optimization',
    name: 'Image Optimization',
    description: 'Image compression, format selection, sizing, and visual media SEO.',
    pillarArticle: 'complete-guide-image-optimization',
    relatedArticles: [
      'how-to-compress-images',
      'webp-vs-png-comparison',
      'image-size-optimization',
      'image-alt-text-seo',
      'responsive-images-guide',
    ],
    relatedTools: ['image-resizer'],
    seo: {
      title: 'Image Optimization | Complete Guide',
      description: 'Learn image compression, formats, sizing, and SEO best practices.',
      keywords: ['image optimization', 'image compression', 'webp', 'image SEO', 'visual optimization'],
    },
  },
  {
    id: 'content-optimization',
    slug: 'content-optimization',
    name: 'Content Optimization',
    description: 'Writing optimization, content structure, readability, and SEO content best practices.',
    pillarArticle: 'complete-guide-content-optimization',
    relatedArticles: [
      'seo-writing-guide',
      'content-structure-best-practices',
      'readability-optimization',
      'headline-optimization',
    ],
    relatedTools: ['word-counter', 'text-case-converter'],
    seo: {
      title: 'Content Optimization | Complete Guide',
      description: 'Master content optimization, structure, and SEO writing techniques.',
      keywords: ['content optimization', 'SEO writing', 'content structure', 'readability', 'headline optimization'],
    },
  },
];

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    id: 'what-is-keyword-density',
    slug: 'what-is-keyword-density',
    title: 'What Is Keyword Density and Why Does It Matter for SEO?',
    excerpt: 'Keyword density is a fundamental SEO metric. Learn what it is, how to calculate it, and why it matters for your search rankings.',
    content: `
      <h2>Understanding Keyword Density</h2>
      <p>Keyword density is the percentage of times a target keyword appears in your content compared to the total number of words. It's a fundamental concept in SEO that can help improve your rankings.</p>
      
      <h3>How to Calculate Keyword Density</h3>
      <p>The formula is simple: (Number of keyword mentions / Total words in content) × 100 = Keyword Density %</p>
      
      <h3>Optimal Keyword Density</h3>
      <p>While there's no official "perfect" keyword density, most SEO experts recommend keeping it between 1-2% for optimal results. Going above 3% may be considered keyword stuffing.</p>
      
      <h3>Why It Matters</h3>
      <p>Search engines use keyword density as one of many signals to understand what your content is about. Proper keyword density helps your content rank for the target keywords while maintaining natural readability.</p>
    `,
    category: 'seo',
    tags: ['keyword-research', 'on-page-seo'],
    cluster: 'keyword-optimization',
    relatedTools: ['keyword-density-checker', 'word-counter'],
    relatedPosts: ['keyword-density-checker-guide', 'keyword-stuffing-explained'],
    faq: [
      {
        question: 'What is a good keyword density?',
        answer: 'A good keyword density is typically between 1-2%. This provides enough keyword relevance without appearing spammy.',
      },
      {
        question: 'Can too high keyword density hurt my SEO?',
        answer: 'Yes, keyword stuffing (typically above 3% density) can be penalized by search engines and hurt your rankings.',
      },
    ],
    seo: {
      title: 'What Is Keyword Density? | SEO Guide',
      description: 'Learn about keyword density, how to calculate it, and best practices for SEO success.',
      keywords: ['keyword density', 'keyword density SEO', 'optimal keyword density', 'keyword density calculator'],
      canonical: 'https://seotools.example.com/blog/what-is-keyword-density',
      ogImage: '/blog/keyword-density-og.png',
    },
    author: {
      id: 'sarah-johnson',
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      bio: 'SEO specialist with 10+ years of experience',
    },
    status: 'published',
    publishedAt: new Date('2024-01-15'),
    readingTime: 5,
    wordCount: 800,
  },
  {
    id: 'how-to-compress-images',
    slug: 'how-to-compress-images',
    title: 'How to Compress Images for Web: Complete Guide',
    excerpt: 'Learn how to compress images for the web without losing quality. Discover tools, techniques, and best practices.',
    content: `
      <h2>Why Image Compression Matters</h2>
      <p>Image compression is crucial for web performance. Compressed images load faster, improve user experience, and boost your SEO rankings.</p>
      
      <h3>Lossy vs Lossless Compression</h3>
      <p>Lossy compression removes some data but achieves higher compression ratios. Lossless compression preserves all data but achieves lower compression.</p>
      
      <h3>Best Tools for Image Compression</h3>
      <p>Popular tools include TinyPNG, ImageOptim, and our own Image Resizer tool.</p>
    `,
    category: 'images',
    tags: ['image-compression', 'web-vitals'],
    cluster: 'image-optimization',
    relatedTools: ['image-resizer'],
    relatedPosts: ['webp-vs-png-comparison', 'image-size-optimization'],
    seo: {
      title: 'How to Compress Images for Web | Complete Guide',
      description: 'Master image compression techniques to improve page speed and SEO.',
      keywords: ['image compression', 'compress images', 'image optimization', 'web performance'],
      canonical: 'https://seotools.example.com/blog/how-to-compress-images',
    },
    author: {
      id: 'mike-chen',
      name: 'Mike Chen',
      email: 'mike@example.com',
    },
    status: 'published',
    publishedAt: new Date('2024-01-14'),
    readingTime: 7,
    wordCount: 1200,
  },
  {
    id: 'seo-writing-guide',
    slug: 'seo-writing-guide',
    title: 'SEO Writing Guide: How to Write for Search Engines',
    excerpt: 'Learn how to write content optimized for search engines while maintaining readability and engagement.',
    content: `
      <h2>Writing for Search Engines</h2>
      <p>SEO writing is about balancing search engine optimization with user experience. Here's how to write better content.</p>
      
      <h3>Start with Keyword Research</h3>
      <p>Before writing, identify your target keywords and search intent.</p>
      
      <h3>Structure Your Content</h3>
      <p>Use clear headings, short paragraphs, and logical flow to help both users and search engines understand your content.</p>
    `,
    category: 'content',
    tags: ['writing', 'on-page-seo'],
    cluster: 'content-optimization',
    relatedPosts: ['keyword-density-checker-guide', 'readability-optimization'],
    seo: {
      title: 'SEO Writing Guide | Write for Search Engines',
      description: 'Learn professional SEO writing techniques to improve rankings and engagement.',
      keywords: ['SEO writing', 'writing for SEO', 'SEO copywriting', 'content writing'],
    },
    author: {
      id: 'sarah-johnson',
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
    },
    status: 'published',
    publishedAt: new Date('2024-01-13'),
    readingTime: 8,
    wordCount: 1500,
  },
];

export function getBlogArticles(): BlogArticle[] {
  return BLOG_ARTICLES;
}

export function getBlogArticleBySlug(slug: string): BlogArticle | undefined {
  return BLOG_ARTICLES.find(article => article.slug === slug);
}

export function getBlogArticlesByCategory(category: string): BlogArticle[] {
  return BLOG_ARTICLES.filter(article => article.category === category);
}

export function getBlogArticlesByTag(tag: string): BlogArticle[] {
  return BLOG_ARTICLES.filter(article => article.tags.includes(tag));
}

export function getBlogArticlesByCluster(cluster: string): BlogArticle[] {
  return BLOG_ARTICLES.filter(article => article.cluster === cluster);
}

export function getBlogCategory(slug: string): BlogCategory | undefined {
  return BLOG_CATEGORIES.find(cat => cat.slug === slug);
}

export function getBlogTag(slug: string): BlogTag | undefined {
  return BLOG_TAGS.find(tag => tag.slug === slug);
}

export function getTopicalCluster(slug: string): TopicalCluster | undefined {
  return TOPICAL_CLUSTERS.find(cluster => cluster.slug === slug);
}
