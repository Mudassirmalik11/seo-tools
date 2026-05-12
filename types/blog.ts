export interface BlogAuthor {
  id: string;
  name: string;
  email: string;
  bio?: string;
  image?: string;
  url?: string;
}

export interface BlogSEO {
  title: string;
  description: string;
  keywords: string[];
  canonical?: string;
  ogImage?: string;
  ogTitle?: string;
  ogDescription?: string;
  robots?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ContentBlock {
  type: 'text' | 'heading' | 'image' | 'faq' | 'tool-cta' | 'related-links' | 'comparison' | 'callout';
  content: any;
}

export interface BlogArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  contentBlocks?: ContentBlock[];
  category: string;
  tags: string[];
  cluster?: string;
  relatedTools?: string[];
  relatedPosts?: string[];
  faq?: FAQItem[];
  seo: BlogSEO;
  author: BlogAuthor;
  featuredImage?: string;
  publishedAt: Date;
  updatedAt?: Date;
  readingTime?: number;
  wordCount?: number;
  status: 'draft' | 'published' | 'scheduled' | 'archived';
  scheduledPublishAt?: Date;
}

export interface BlogCategory {
  id: string;
  slug: string;
  name: string;
  description: string;
  featuredImage?: string;
  seo: BlogSEO;
  parentCategory?: string;
  icon?: string;
}

export interface BlogTag {
  id: string;
  slug: string;
  name: string;
  description?: string;
  seo?: BlogSEO;
}

export interface TopicalCluster {
  id: string;
  slug: string;
  name: string;
  description: string;
  pillarArticle: string;
  relatedArticles: string[];
  relatedTools?: string[];
  seo: BlogSEO;
  icon?: string;
}

export interface BlogSearch {
  query: string;
  category?: string;
  tag?: string;
  cluster?: string;
  limit?: number;
  offset?: number;
}

export interface BlogSearchResult {
  articles: BlogArticle[];
  total: number;
  limit: number;
  offset: number;
}

export interface RelatedContent {
  posts: BlogArticle[];
  tools: string[];
  categories: string[];
}

export interface InternalLink {
  targetSlug: string;
  targetType: 'article' | 'tool' | 'category' | 'cluster' | 'tag';
  anchor: string;
  relevanceScore: number;
}

export interface BlogMetadata {
  title: string;
  description: string;
  canonical: string;
  ogImage: string;
  keywords: string[];
  robots: string;
}
