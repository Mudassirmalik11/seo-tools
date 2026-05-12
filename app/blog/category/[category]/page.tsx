/**
 * Blog Category Page
 */

import { Metadata } from 'next';
import Link from 'next/link';
import { PageLayout } from '@/components/layout/Layout';
import { AdBanner } from '@/components/ads/AdBanner';
import { MultiplexAd } from '@/components/ads/MultiplexAd';
import { getBlogCategory, getBlogArticlesByCategory } from '@/data/blog';
import { BLOG_CATEGORIES } from '@/data/blog';
import { formatDate } from '@/lib/blog/content';
import { generateCategoryMetadata } from '@/lib/blog/metadata';

interface Props {
  params: {
    category: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = getBlogCategory(params.category);
  if (!category) {
    return {
      title: 'Category Not Found',
    };
  }
  return generateCategoryMetadata(category);
}

export async function generateStaticParams() {
  return BLOG_CATEGORIES.map(cat => ({
    category: cat.slug,
  }));
}

export default function CategoryPage({ params }: Props) {
  const category = getBlogCategory(params.category);
  const articles = getBlogArticlesByCategory(params.category);

  if (!category) {
    return (
      <PageLayout>
        <div className="container-section py-12">
          <h1 className="text-3xl font-bold text-center">Category Not Found</h1>
          <p className="text-center text-gray-600 mt-4">
            <Link href="/blog" className="text-blue-600 hover:underline">
              Return to Blog
            </Link>
          </p>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      {/* Header */}
      <div className="tool-header">
        <div className="container-section">
          {category.icon && <div className="text-5xl mb-4">{category.icon}</div>}
          <h1 className="tool-title">{category.name}</h1>
          <p className="tool-subtitle">{category.description}</p>
        </div>
      </div>

      <div className="container-section py-12">
        {/* Top Ad */}
        <AdBanner placement="category_top_leaderboard" />

        {/* Breadcrumb */}
        <div className="my-6 flex items-center gap-2 text-sm text-gray-600">
          <Link href="/blog" className="hover:text-blue-600">
            Blog
          </Link>
          <span>/</span>
          <span>{category.name}</span>
        </div>

        {/* Articles Grid */}
        {articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-12">
            {articles.map(article => (
              <Link
                key={article.id}
                href={`/blog/${article.slug}`}
                className="card group hover:shadow-lg transition"
              >
                <div className="text-4xl mb-4">📝</div>
                <span className="inline-block badge mb-3">{article.category}</span>
                <h3 className="text-xl font-bold group-hover:text-blue-600 transition mb-3">
                  {article.title}
                </h3>
                <p className="text-gray-700 text-sm mb-4">{article.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{formatDate(article.publishedAt)}</span>
                  <span>{article.readingTime} min</span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="my-12 text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-600 text-lg">No articles found in this category yet.</p>
            <Link href="/blog" className="text-blue-600 hover:underline mt-4 inline-block">
              View all articles
            </Link>
          </div>
        )}

        {/* Middle Ad */}
        <AdBanner placement="category_grid_rectangle" />

        {/* Related Categories */}
        {BLOG_CATEGORIES.filter(c => c.id !== category.id).length > 0 && (
          <section className="my-12">
            <h2 className="text-2xl font-bold mb-6">Related Categories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {BLOG_CATEGORIES.filter(c => c.id !== category.id)
                .slice(0, 4)
                .map(relatedCat => (
                  <Link
                    key={relatedCat.id}
                    href={`/blog/category/${relatedCat.slug}`}
                    className="p-4 border border-gray-200 rounded-lg hover:border-blue-600 hover:shadow-md transition"
                  >
                    <div className="flex items-center gap-3">
                      {relatedCat.icon && <span className="text-2xl">{relatedCat.icon}</span>}
                      <div>
                        <h3 className="font-semibold text-blue-600">{relatedCat.name}</h3>
                        <p className="text-sm text-gray-600">{relatedCat.description}</p>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </section>
        )}

        <MultiplexAd />
      </div>
    </PageLayout>
  );
}
