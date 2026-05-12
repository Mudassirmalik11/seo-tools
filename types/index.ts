/**
 * Tool Registry Type Definitions
 * Defines the structure for all tool metadata and configuration
 */

export interface SEOMetadata {
  title: string;
  description: string;
  keywords: string[];
  canonical?: string;
  ogImage?: string;
}

export interface ToolRegistry {
  id: string;
  slug: string;
  name: string;
  category: ToolCategory;
  subcategory?: string;
  description: string;
  icon?: string;
  component: string; // Dynamic import path
  seo: SEOMetadata;
  apiEndpoint?: string;
  popularity?: number;
  isNew?: boolean;
  isFeatured?: boolean;
  tags?: string[];
  relatedTools?: string[]; // Tool slugs
}

export interface ToolCategory {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon?: string;
  count: number;
  seo: SEOMetadata;
}

export interface ProgrammaticPage {
  id: string;
  baseToolSlug: string;
  variant: string; // e.g., "for-students", "to-100kb"
  seo: SEOMetadata;
  context?: Record<string, any>;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  category: string;
  tags: string[];
  author: string;
  publishedAt: Date;
  updatedAt?: Date;
  relatedTools?: string[];
  seo: SEOMetadata;
}

export interface InternalLink {
  tool?: string; // Tool slug
  category?: string; // Category slug
  blog?: string; // Blog slug
  anchor: string;
  text: string;
}

export interface ToolProcessingOptions {
  [key: string]: any;
}

export interface ToolResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  processingTime?: number;
}
