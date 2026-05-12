/**
 * Homepage
 */

import Link from 'next/link';
import { Metadata } from 'next';
import { getTrendingTools, getFeaturedTools, getAllCategories } from '@/lib/tools/registry';
import { PageLayout } from '@/components/layout/Layout';
import { AdBanner } from '@/components/ads/AdBanner';

export const metadata: Metadata = {
  title: 'Free SEO Tools Platform - 100+ Online Tools',
  description: 'Access 100+ free online SEO tools, word counters, image resizers, and productivity tools. No registration required.',
};

export default function HomePage() {
  const featured = getFeaturedTools();
  const trending = getTrendingTools(6);
  const categories = getAllCategories();

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container-section">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Free Online SEO Tools Platform
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Boost your productivity with 100+ free tools for SEO, content optimization, image processing, and more.
            </p>

            {/* Search Bar */}
            <div className="flex gap-2 mb-8">
              <input
                type="search"
                placeholder="Search tools..."
                className="flex-1 px-6 py-4 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg transition">
                Search
              </button>
            </div>

            <div className="flex flex-wrap gap-3">
              {categories.slice(0, 4).map(cat => (
                <Link
                  key={cat.id}
                  href={`/${cat.slug}`}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-400 rounded-lg text-sm font-medium transition"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Top Ad */}
      <div className="container-section mt-12">
        <AdBanner placement="home_top_leaderboard" />
      </div>

      {/* Featured Tools */}
      <section className="container-section py-16">
        <div className="mb-12">
          <h2 className="text-4xl font-bold mb-4">✨ Featured Tools</h2>
          <p className="text-gray-600 max-w-2xl">
            Our most popular and powerful tools to help you optimize your content and workflow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map(tool => (
            <Link
              key={tool.id}
              href={`/tools/${tool.slug}`}
              className="card group"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold group-hover:text-blue-600 transition">{tool.name}</h3>
                  <span className="text-xs text-gray-500 uppercase">{tool.category.name}</span>
                </div>
                <span className="text-2xl">🎯</span>
              </div>
              <p className="text-gray-700 mb-4">{tool.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  {tool.tags?.slice(0, 2).map(tag => (
                    <span key={tag} className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="text-blue-600 font-bold group-hover:translate-x-1 transition">→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Middle Ad */}
      <div className="container-section">
        <AdBanner placement="home_mid_rectangle" />
      </div>

      {/* Categories Grid */}
      <section className="container-section py-16">
        <div className="mb-12">
          <h2 className="text-4xl font-bold mb-4">📚 Browse by Category</h2>
          <p className="text-gray-600 max-w-2xl">
            Explore our tools organized by category to find exactly what you need.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map(cat => (
            <Link
              key={cat.id}
              href={`/${cat.slug}`}
              className="card text-center group"
            >
              <div className="text-5xl mb-4">{cat.icon}</div>
              <h3 className="text-xl font-bold group-hover:text-blue-600 transition mb-2">{cat.name}</h3>
              <p className="text-sm text-gray-600 mb-4">{cat.description}</p>
              <span className="badge">{cat.count} tools</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending Tools */}
      <section className="bg-gray-50 py-16 my-12">
        <div className="container-section">
          <div className="mb-12">
            <h2 className="text-4xl font-bold mb-4">🔥 Trending Now</h2>
            <p className="text-gray-600 max-w-2xl">
              Most popular and frequently used tools by our community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trending.map((tool, idx) => (
              <Link
                key={tool.id}
                href={`/tools/${tool.slug}`}
                className="card bg-white"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                    #{idx + 1}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{tool.name}</h3>
                    <p className="text-xs text-gray-500">{tool.category.name}</p>
                  </div>
                </div>
                <p className="text-gray-700 text-sm">{tool.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Ad */}
      <div className="container-section">
        <AdBanner placement="home_bottom_multiplex" />
      </div>

      {/* CTA Section */}
      <section className="container-section py-16">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Optimize Your Workflow</h2>
          <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
            Use our comprehensive suite of free online tools to improve your productivity, 
            optimize your content for search engines, and boost your online presence.
          </p>
          <Link href="/tools" className="btn-primary inline-block">
            Explore All Tools →
          </Link>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container-section py-16">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="card">
              <h3 className="font-bold text-lg mb-2">Are all tools completely free?</h3>
              <p className="text-gray-700">Yes, all 100+ tools are completely free with no registration required. We support our platform through advertising.</p>
            </div>
            <div className="card">
              <h3 className="font-bold text-lg mb-2">Do you save my data?</h3>
              <p className="text-gray-700">No, all data processing happens locally in your browser. We don't store any of your personal information.</p>
            </div>
            <div className="card">
              <h3 className="font-bold text-lg mb-2">Can I use these tools for commercial purposes?</h3>
              <p className="text-gray-700">Yes, absolutely! You can use the results from any of our tools for commercial purposes without any restrictions.</p>
            </div>
            <div className="card">
              <h3 className="font-bold text-lg mb-2">Do you have an API?</h3>
              <p className="text-gray-700">Yes, each tool has an API endpoint. Contact us for API documentation and pricing.</p>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
