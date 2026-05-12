/**
 * Tool Registry Utilities
 * Core functions for tool lookup, filtering, and management
 */

import { TOOLS_REGISTRY, CATEGORIES, PROGRAMMATIC_VARIANTS } from '@/data/tools';
import { ToolRegistry, ToolCategory } from '@/types';

/**
 * Get a tool by slug
 */
export function getToolBySlug(slug: string): ToolRegistry | undefined {
  return TOOLS_REGISTRY.find(tool => tool.slug === slug);
}

/**
 * Get all tools
 */
export function getAllTools(): ToolRegistry[] {
  return TOOLS_REGISTRY;
}

/**
 * Get tools by category
 */
export function getToolsByCategory(categorySlug: string): ToolRegistry[] {
  return TOOLS_REGISTRY.filter(tool => tool.category.slug === categorySlug);
}

/**
 * Get featured tools
 */
export function getFeaturedTools(): ToolRegistry[] {
  return TOOLS_REGISTRY.filter(tool => tool.isFeatured).sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
}

/**
 * Get trending tools (sorted by popularity)
 */
export function getTrendingTools(limit: number = 6): ToolRegistry[] {
  return [...TOOLS_REGISTRY].sort((a, b) => (b.popularity || 0) - (a.popularity || 0)).slice(0, limit);
}

/**
 * Get related tools
 */
export function getRelatedTools(toolSlug: string, limit: number = 3): ToolRegistry[] {
  const tool = getToolBySlug(toolSlug);
  if (!tool || !tool.relatedTools) return [];

  return tool.relatedTools
    .map(slug => getToolBySlug(slug))
    .filter((t): t is ToolRegistry => t !== undefined)
    .slice(0, limit);
}

/**
 * Get all categories
 */
export function getAllCategories(): ToolCategory[] {
  return CATEGORIES;
}

/**
 * Get category by slug
 */
export function getCategoryBySlug(slug: string): ToolCategory | undefined {
  return CATEGORIES.find(cat => cat.slug === slug);
}

/**
 * Get programmatic variants for a tool
 */
export function getProgrammaticVariants(toolSlug: string) {
  return PROGRAMMATIC_VARIANTS[toolSlug as keyof typeof PROGRAMMATIC_VARIANTS] || [];
}

/**
 * Get a specific programmatic variant
 */
export function getProgrammaticVariant(toolSlug: string, variantSlug: string) {
  return getProgrammaticVariants(toolSlug).find(variant => variant.variant === variantSlug);
}

/**
 * Get all programmatic pages
 */
export function getAllProgrammaticPages() {
  const pages: Array<{ toolSlug: string; variant: any }> = [];
  
  Object.entries(PROGRAMMATIC_VARIANTS).forEach(([toolSlug, variants]) => {
    variants.forEach(variant => {
      pages.push({ toolSlug, variant });
    });
  });

  return pages;
}

/**
 * Search tools
 */
export function searchTools(query: string): ToolRegistry[] {
  const lowerQuery = query.toLowerCase();
  
  return TOOLS_REGISTRY.filter(tool =>
    tool.name.toLowerCase().includes(lowerQuery) ||
    tool.description.toLowerCase().includes(lowerQuery) ||
    tool.tags?.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
    tool.seo.keywords.some(kw => kw.toLowerCase().includes(lowerQuery))
  );
}

/**
 * Get sitemap data
 */
export function getSitemapData() {
  const tools = getAllTools();
  const categories = getAllCategories();
  const programmaticPages = getAllProgrammaticPages();

  return {
    tools,
    categories,
    programmaticPages,
    totalPages: tools.length + categories.length + programmaticPages.length + 2, // +2 for homepage and blog
  };
}
