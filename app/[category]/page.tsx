/**
 * Category Page - /[category]
 */

import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCategoryBySlug, getToolsByCategory, getAllCategories } from '@/lib/tools/registry';
import { generateCategoryStructuredData, generateMetaTags } from '@/lib/seo/metadata';
import { PageLayout } from '@/components/layout/Layout';
import { AdBanner } from '@/components/ads/AdBanner';
import { MultiplexAd } from '@/components/ads/MultiplexAd';

interface Props {
  params: { category: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = getCategoryBySlug(params.category);

  if (!category) return { title: 'Category Not Found' };

  const meta = generateMetaTags(category.seo);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
  };
}

export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map(cat => ({ category: cat.slug }));
}

export default function CategoryPage({ params }: Props) {
  const category = getCategoryBySlug(params.category);

  if (!category) {
    notFound();
  }

  const tools = getToolsByCategory(category.slug);
  const structuredData = generateCategoryStructuredData(category);

  return (
    <PageLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      {/* Header */}
      <div className="tool-header">
        <div className="container-section">
          <h1 className="tool-title">{category.name}</h1>
          <p className="tool-subtitle">{category.description}</p>
          <div className="flex items-center gap-4 mt-6">
            <span className="badge text-lg px-4 py-2">{tools.length} Tools</span>
          </div>
        </div>
      </div>

      <div className="container-section py-12">
        {/* Top Ad */}
        <AdBanner placement="category_top_leaderboard" />

        {/* Category Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 my-8">
          <h2 className="text-2xl font-bold mb-4">About {category.name}</h2>
          <p className="text-gray-700 mb-4">
            Welcome to our comprehensive collection of {category.name}. Whether you're a professional, 
            student, or casual user, you'll find powerful tools to help you accomplish your goals.
          </p>
          <p className="text-gray-700">
            All tools in this category are completely free, require no registration, and work directly in your browser.
          </p>
        </div>

        {/* Middle Ad */}
        <AdBanner placement="category_grid_rectangle" />

        {/* Tools Grid */}
        <div className="my-12">
          <h2 className="text-3xl font-bold mb-8">All {category.name} Tools</h2>

          {tools.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tools.map(tool => (
                <Link
                  key={tool.id}
                  href={`/tools/${tool.slug}`}
                  className="card group h-full"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold group-hover:text-blue-600 transition">{tool.name}</h3>
                    <span className="text-3xl">🛠️</span>
                  </div>
                  <p className="text-gray-700 mb-4 flex-grow">{tool.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {tool.tags?.slice(0, 3).map(tag => (
                      <span key={tag} className="text-xs px-2 py-1 bg-gray-200 text-gray-700 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="inline-block text-blue-600 font-bold group-hover:translate-x-1 transition">
                    Use Tool →
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8 text-center">
              <p className="text-gray-700">No tools available in this category yet.</p>
            </div>
          )}
        </div>

        {/* Bottom Ad */}
        <AdBanner placement="home_bottom_multiplex" />

        <MultiplexAd />

        {/* SEO Content */}
        <section className="seo-content">
          <h2 className="text-3xl font-bold mb-4">Why Use {category.name}?</h2>
          <p className="mb-4">
            {category.name} are essential tools for anyone looking to improve their productivity and efficiency. 
            Our carefully curated collection offers the best solutions for common tasks and specialized workflows.
          </p>

          <h3 className="text-2xl font-bold mb-4 mt-8">Benefits</h3>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Free and easy to use with no registration required</li>
            <li>Fast processing with instant results</li>
            <li>No data collection - all processing done locally</li>
            <li>Mobile-friendly and responsive design</li>
            <li>Regular updates and new features</li>
          </ul>

          <h3 className="text-2xl font-bold mb-4 mt-8">Getting Started</h3>
          <p className="mb-4">
            To get started with any tool in this category, simply click on the tool name above. 
            Each tool has a user-friendly interface and clear instructions on how to use it. 
            Most tools work with just a few clicks!
          </p>
        </section>
      </div>
    </PageLayout>
  );
}
