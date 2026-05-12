/**
 * All Tools Page - /tools
 */

import { Metadata } from 'next';
import Link from 'next/link';
import { getAllTools } from '@/lib/tools/registry';
import { PageLayout } from '@/components/layout/Layout';
import { AdBanner } from '@/components/ads/AdBanner';
import { MultiplexAd } from '@/components/ads/MultiplexAd';

export const metadata: Metadata = {
  title: 'All Free Online Tools - Complete Collection',
  description: 'Browse our complete collection of 100+ free online tools for SEO, writing, images, and development.',
};

export default function AllToolsPage() {
  const tools = getAllTools();

  return (
    <PageLayout>
      {/* Header */}
      <div className="tool-header">
        <div className="container-section">
          <h1 className="tool-title">All Tools</h1>
          <p className="tool-subtitle">
            Browse our complete collection of {tools.length}+ free online tools
          </p>
        </div>
      </div>

      <div className="container-section py-12">
        {/* Top Ad */}
        <AdBanner placement="tool_top_banner" />

        {/* Tools Grid */}
        <div className="my-12">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-4">Complete Tool Collection</h2>
            <p className="text-gray-700 max-w-2xl">
              All {tools.length} tools are completely free to use with no registration required.
              Each tool is optimized for performance and privacy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map(tool => (
              <Link
                key={tool.id}
                href={`/tools/${tool.slug}`}
                className="card group h-full hover:shadow-lg transition"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold group-hover:text-blue-600 transition">{tool.name}</h3>
                    <span className="text-xs text-gray-500 uppercase tracking-wider">{tool.category.name}</span>
                  </div>
                  {tool.isFeatured && <span className="badge">Featured</span>}
                </div>

                <p className="text-gray-700 mb-4 flex-grow">{tool.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {tool.tags?.slice(0, 2).map(tag => (
                    <span key={tag} className="text-xs px-2 py-1 bg-gray-200 text-gray-700 rounded">
                      {tag}
                    </span>
                  ))}
                  {tool.tags && tool.tags.length > 2 && (
                    <span className="text-xs px-2 py-1 bg-gray-200 text-gray-700 rounded">
                      +{tool.tags.length - 2}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{tool.popularity}% popular</span>
                  <span className="text-blue-600 font-bold group-hover:translate-x-1 transition">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Middle Ad */}
        <AdBanner placement="tool_after_tool" />

        {/* Info Section */}
        <section className="seo-content my-12">
          <h2 className="text-3xl font-bold mb-4">Complete Tool Suite</h2>
          <p className="mb-4">
            Our comprehensive platform brings together the most useful and powerful free tools.
            Whether you need to analyze content, process images, or format code, we have you covered.
          </p>

          <h3 className="text-2xl font-bold mb-4 mt-8">Why Choose Our Tools?</h3>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li><strong>Completely Free</strong> - No hidden fees or premium tiers</li>
            <li><strong>No Registration</strong> - Start using tools immediately</li>
            <li><strong>Privacy First</strong> - All processing done in your browser</li>
            <li><strong>Fast & Reliable</strong> - Optimized performance for quick results</li>
            <li><strong>Regularly Updated</strong> - New tools and features added frequently</li>
            <li><strong>Mobile Friendly</strong> - Works perfectly on all devices</li>
          </ul>

          <h3 className="text-2xl font-bold mb-4 mt-8">Popular Use Cases</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
            <div>
              <h4 className="font-bold mb-2">📝 Content Creation</h4>
              <p className="text-gray-700 text-sm">
                Analyze keyword density, count words, and optimize your content for search engines.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-2">🖼️ Image Processing</h4>
              <p className="text-gray-700 text-sm">
                Resize, compress, and optimize images for web and social media platforms.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-2">👨‍💻 Development</h4>
              <p className="text-gray-700 text-sm">
                Format JSON, minify code, and validate syntax for your development projects.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-2">📊 Data Analysis</h4>
              <p className="text-gray-700 text-sm">
                Analyze text metrics, extract insights, and generate reports quickly.
              </p>
            </div>
          </div>

          <h3 className="text-2xl font-bold mb-4 mt-8">How to Get Started</h3>
          <ol className="list-decimal pl-6 space-y-2 mb-4">
            <li>Browse the tools above or use the search function</li>
            <li>Click on any tool to open its dedicated page</li>
            <li>Follow the instructions and input your data</li>
            <li>Get instant results without waiting</li>
            <li>Copy, download, or share your results</li>
          </ol>
        </section>

        <MultiplexAd />
      </div>
    </PageLayout>
  );
}
