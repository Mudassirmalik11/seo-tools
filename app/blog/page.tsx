/**
 * Blog System - Blog Home
 */

import { Metadata } from 'next';
import Link from 'next/link';
import { PageLayout } from '@/components/layout/Layout';
import { AdBanner } from '@/components/ads/AdBanner';
import { MultiplexAd } from '@/components/ads/MultiplexAd';
import { getAllPublishedArticles} from '@/lib/blog/recommendations';
import { getAllClusters as getClusters } from '@/lib/blog/clusters';
import { BLOG_CATEGORIES } from '@/data/blog';
import { formatDate } from '@/lib/blog/content';

export const metadata: Metadata = {
  title: 'Blog - SEO Tips, Content Optimization & Tool Guides',
  description: 'Read our blog for SEO best practices, content optimization tips, and guides on using our tools effectively.',
};

export default function BlogPage() {
  const articles = getAllPublishedArticles(12);
  const clusters = getClusters();
  const categories = BLOG_CATEGORIES;

  return (
    <PageLayout>
      {/* Header */}
      <div className="tool-header">
        <div className="container-section">
          <h1 className="tool-title">Our Blog</h1>
          <p className="tool-subtitle">
            SEO tips, content strategies, and guides to help you succeed
          </p>
        </div>
      </div>

      <div className="container-section py-12">
        {/* Top Ad */}
        <AdBanner placement="blog_top_leaderboard" />

        {/* Category Filter */}
        <div className="my-8">
          <div className="flex flex-wrap gap-2">
            <Link
              href="/blog"
              className="px-4 py-2 rounded-lg font-medium transition bg-blue-600 text-white"
            >
              All Posts
            </Link>
            {categories.map(cat => (
              <Link
                key={cat.id}
                href={`/blog/category/${cat.slug}`}
                className="px-4 py-2 rounded-lg font-medium transition bg-gray-100 text-gray-900 hover:bg-gray-200"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Featured Post */}
        {articles.length > 0 && (
          <div className="my-12 card bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <div className="text-6xl text-center md:text-left">📖</div>
              <div className="md:col-span-2">
                <span className="badge">Featured</span>
                <h2 className="text-3xl font-bold my-4">{articles[0].title}</h2>
                <p className="text-gray-700 mb-4">{articles[0].excerpt}</p>
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-sm text-gray-600">{formatDate(articles[0].publishedAt)}</span>
                  <span className="text-sm text-gray-600">•</span>
                  <span className="text-sm text-gray-600">{articles[0].readingTime} min read</span>
                </div>
                <Link href={`/blog/${articles[0].slug}`} className="btn-primary">
                  Read Article →
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Middle Ad */}
        <AdBanner placement="blog_inline_rectangle" />

        {/* Blog Posts Grid */}
        <div className="my-12">
          <h2 className="text-3xl font-bold mb-8">Latest Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
        </div>

        {/* Topical Clusters */}
        <section className="my-12">
          <h2 className="text-3xl font-bold mb-8">Topical Authority Clusters</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clusters.map(cluster => (
              <Link
                key={cluster.id}
                href={`/blog/cluster/${cluster.slug}`}
                className="card group hover:shadow-lg transition border-l-4 border-blue-500"
              >
                {cluster.icon && <div className="text-4xl mb-3">{cluster.icon}</div>}
                <h3 className="text-xl font-bold group-hover:text-blue-600 transition mb-2">{cluster.name}</h3>
                <p className="text-gray-700 text-sm mb-4">{cluster.description}</p>
                <div className="text-xs text-blue-600 font-semibold">View cluster →</div>
              </Link>
            ))}
          </div>
        </section>

        <MultiplexAd />

        {/* Subscribe Section */}
        <section className="my-12 bg-blue-50 border border-blue-200 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Subscribe to our newsletter to get the latest SEO tips, tool updates, and content strategies delivered to your inbox.
          </p>
          <div className="flex gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email..."
              className="flex-1 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <button className="btn-primary">Subscribe</button>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
