/**
 * Blog Tag Archive Page
 */

import { Metadata } from 'next';
import Link from 'next/link';
import { PageLayout } from '@/components/layout/Layout';
import { AdBanner } from '@/components/ads/AdBanner';
import { MultiplexAd } from '@/components/ads/MultiplexAd';
import { getBlogTag, getBlogArticlesByTag, BLOG_TAGS } from '@/data/blog';
import { formatDate } from '@/lib/blog/content';

interface Props {
  params: {
    tag: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tag = getBlogTag(params.tag);
  if (!tag) {
    return {
      title: 'Tag Not Found',
    };
  }
  return {
    title: `${tag.name} Articles | SEO Blog`,
    description: tag.description || `Browse all articles tagged with "${tag.name}"`,
  };
}

export async function generateStaticParams() {
  return BLOG_TAGS.map(tag => ({
    tag: tag.slug,
  }));
}

export default function TagPage({ params }: Props) {
  const tag = getBlogTag(params.tag);
  const articles = getBlogArticlesByTag(params.tag);

  if (!tag) {
    return (
      <PageLayout>
        <div className="container-section py-12">
          <h1 className="text-3xl font-bold text-center">Tag Not Found</h1>
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
          <h1 className="tool-title">#{tag.name}</h1>
          <p className="tool-subtitle">
            {articles.length} article{articles.length !== 1 ? 's' : ''} tagged with "{tag.name}"
          </p>
        </div>
      </div>

      <div className="container-section py-12">
        {/* Top Ad */}
        <AdBanner placement="blog_top_leaderboard" />

        {/* Breadcrumb */}
        <div className="my-6 flex items-center gap-2 text-sm text-gray-600">
          <Link href="/blog" className="hover:text-blue-600">
            Blog
          </Link>
          <span>/</span>
          <span>Tags</span>
          <span>/</span>
          <span>{tag.name}</span>
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
            <p className="text-gray-600 text-lg">No articles found with this tag.</p>
            <Link href="/blog" className="text-blue-600 hover:underline mt-4 inline-block">
              View all articles
            </Link>
          </div>
        )}

        {/* Middle Ad */}
        <AdBanner placement="blog_inline_rectangle" />

        {/* Related Tags */}
        {BLOG_TAGS.filter(t => t.id !== tag.id).length > 0 && (
          <section className="my-12">
            <h2 className="text-2xl font-bold mb-6">Related Tags</h2>
            <div className="flex flex-wrap gap-2">
              {BLOG_TAGS.filter(t => t.id !== tag.id)
                .slice(0, 8)
                .map(relatedTag => (
                  <Link
                    key={relatedTag.id}
                    href={`/blog/tag/${relatedTag.slug}`}
                    className="px-4 py-2 bg-gray-100 text-gray-900 rounded-lg hover:bg-blue-100 hover:text-blue-900 transition font-medium"
                  >
                    #{relatedTag.name}
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
