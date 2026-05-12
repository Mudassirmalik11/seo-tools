/**
 * Internal Linking Component
 * Display related tools and cross-content links
 */

'use client';

import Link from 'next/link';
import { getRelatedTools, getToolsByCategory } from '@/lib/tools/registry';
import { ToolRegistry } from '@/types';

interface RelatedToolsProps {
  currentToolSlug: string;
  limit?: number;
}

export function RelatedTools({ currentToolSlug, limit = 3 }: RelatedToolsProps) {
  const related = getRelatedTools(currentToolSlug, limit);

  if (!related.length) return null;

  return (
    <section className="my-12 p-6 bg-blue-50 border border-blue-200 rounded-lg">
      <h3 className="text-2xl font-bold mb-6">Related Tools</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {related.map(tool => (
          <Link
            key={tool.id}
            href={`/tools/${tool.slug}`}
            className="card bg-white hover:shadow-md transition"
          >
            <h4 className="font-bold text-lg mb-2">{tool.name}</h4>
            <p className="text-gray-600 text-sm">{tool.description}</p>
            <span className="text-blue-600 text-sm font-medium mt-4 inline-block">
              Try Now →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

interface CategoryToolsProps {
  categorySlug: string;
  currentToolSlug?: string;
  limit?: number;
}

export function CategoryTools({ categorySlug, currentToolSlug, limit = 6 }: CategoryToolsProps) {
  const tools = getToolsByCategory(categorySlug);
  const filtered = tools
    .filter(tool => tool.slug !== currentToolSlug)
    .slice(0, limit);

  if (!filtered.length) return null;

  return (
    <section className="my-12">
      <h3 className="text-2xl font-bold mb-6">More {tools[0]?.category.name} Tools</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(tool => (
          <Link
            key={tool.id}
            href={`/tools/${tool.slug}`}
            className="card"
          >
            <h4 className="font-bold mb-2">{tool.name}</h4>
            <p className="text-gray-600 text-sm">{tool.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

/**
 * Internal linking widget for blog posts
 */
interface InternalLinksProps {
  tools?: ToolRegistry[];
  categories?: any[];
  blogs?: any[];
}

export function InternalLinksWidget({ tools = [], categories = [], blogs = [] }: InternalLinksProps) {
  return (
    <div className="space-y-6">
      {tools.length > 0 && (
        <div>
          <h4 className="font-bold mb-3 text-lg">Related Tools</h4>
          <ul className="space-y-2">
            {tools.map(tool => (
              <li key={tool.id}>
                <Link
                  href={`/tools/${tool.slug}`}
                  className="text-blue-600 hover:underline"
                >
                  {tool.name} →
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {categories.length > 0 && (
        <div>
          <h4 className="font-bold mb-3 text-lg">Browse Categories</h4>
          <ul className="space-y-2">
            {categories.map((cat: any) => (
              <li key={cat.id}>
                <Link
                  href={`/${cat.slug}`}
                  className="text-blue-600 hover:underline"
                >
                  {cat.name} ({cat.count} tools) →
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {blogs.length > 0 && (
        <div>
          <h4 className="font-bold mb-3 text-lg">Related Articles</h4>
          <ul className="space-y-2">
            {blogs.map((blog: any) => (
              <li key={blog.id}>
                <Link
                  href={`/blog/${blog.slug}`}
                  className="text-blue-600 hover:underline"
                >
                  {blog.title} →
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
