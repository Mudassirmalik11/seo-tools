/**
 * Tool Page - Dynamic Route
 * /tools/[slug]
 */

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getToolBySlug } from '@/lib/tools/registry';
import { generateToolStructuredData, generateMetaTags, generateBreadcrumbStructuredData } from '@/lib/seo/metadata';
import { DynamicToolComponent } from '@/lib/tools/loader';
import { PageLayout } from '@/components/layout/Layout';
import { RelatedTools, CategoryTools } from '@/components/layout/InternalLinks';
import { AdSlot } from '@/components/ads/AdSlot';
import { SidebarAd } from '@/components/ads/SidebarAd';
import { MultiplexAd } from '@/components/ads/MultiplexAd';

interface Props {
  params: { slug: string };
  searchParams: Record<string, string>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tool = getToolBySlug(params.slug);

  if (!tool) return { title: 'Tool Not Found' };

  const meta = generateMetaTags(tool.seo);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    metadataBase: new URL(meta.canonical),
    openGraph: {
      title: meta.ogTitle,
      description: meta.ogDescription,
      url: meta.canonical,
      images: [{ url: meta.ogImage }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.ogTitle,
      description: meta.ogDescription,
      images: [meta.ogImage],
    },
  };
}

export async function generateStaticParams() {
  const { getAllTools } = await import('@/lib/tools/registry');
  const tools = getAllTools();

  return tools.map(tool => ({
    slug: tool.slug,
  }));
}

export default function ToolPage({ params }: Props) {
  const tool = getToolBySlug(params.slug);

  if (!tool) {
    notFound();
  }

  const structuredData = generateToolStructuredData(tool);
  const breadcrumbData = generateBreadcrumbStructuredData([
    { name: 'Home', url: 'https://seotools.example.com' },
    { name: tool.category.name, url: `https://seotools.example.com/${tool.category.slug}` },
    { name: tool.name, url: `https://seotools.example.com/tools/${tool.slug}/` },
  ]);

  return (
    <PageLayout>
      {/* Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }} />

      {/* Tool Header */}
      <div className="tool-header">
        <div className="container-section">
          <h1 className="tool-title">{tool.name}</h1>
          <p className="tool-subtitle">{tool.description}</p>
          <div className="flex gap-4 mt-6">
            <span className="badge">{tool.category.name}</span>
            {tool.tags?.map(tag => (
              <span key={tag} className="badge">{tag}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="container-section py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Top Ad */}
          <AdSlot placement="tool_top_banner" />

          {/* Tool Interface */}
          <div className="tool-interface">
            <DynamicToolComponent componentName={tool.component} />
          </div>

          {/* Middle Ad */}
          <AdSlot placement="tool_after_tool" />

          {/* SEO Content Section */}
          <section className="seo-content">
            <h2 className="text-3xl font-bold mb-4">About {tool.name}</h2>
            <p className="mb-4 text-gray-700">
              The {tool.name} is a powerful online tool designed to help you {tool.description.toLowerCase()}. 
              Whether you're a content creator, marketer, or developer, this tool provides instant, accurate results 
              to improve your workflow and productivity.
            </p>

            <h3 className="text-2xl font-bold mb-4 mt-8">Key Features</h3>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Fast and accurate processing</li>
              <li>No installation required - works in your browser</li>
              <li>Free to use without registration</li>
              <li>Supports multiple input formats</li>
              <li>Results are processed on-device for privacy</li>
            </ul>

            <h3 className="text-2xl font-bold mb-4 mt-8">How to Use</h3>
            <ol className="list-decimal pl-6 space-y-2 mb-4">
              <li>Enter or upload your content</li>
              <li>Configure any settings if needed</li>
              <li>Click the analyze or process button</li>
              <li>Get instant results</li>
              <li>Copy or download your results</li>
            </ol>

            <h3 className="text-2xl font-bold mb-4 mt-8">FAQ</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-bold mb-2">Is this tool free?</h4>
                <p className="text-gray-700">Yes, {tool.name} is completely free to use with no registration required.</p>
              </div>
              <div>
                <h4 className="font-bold mb-2">Is my data safe?</h4>
                <p className="text-gray-700">All processing happens in your browser. We don't store any of your data on our servers.</p>
              </div>
              <div>
                <h4 className="font-bold mb-2">Does it work offline?</h4>
                <p className="text-gray-700">Once the page loads, the tool works entirely in your browser and doesn't require an internet connection.</p>
              </div>
            </div>
          </section>

          {/* Bottom Ad */}
          <AdSlot placement="tool_bottom_content" />
          <MultiplexAd />

          {/* Related Tools */}
          <RelatedTools currentToolSlug={tool.slug} limit={3} />

          {/* Category Tools */}
          <CategoryTools categorySlug={tool.category.slug} currentToolSlug={tool.slug} limit={6} />
        </div>

        {/* Sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-20 space-y-6">
            <SidebarAd />

            {/* Quick Info Card */}
            <div className="card">
              <h3 className="font-bold text-lg mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div>
                  <div className="text-sm text-gray-600">Category</div>
                  <div className="font-bold">{tool.category.name}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Popularity</div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${tool.popularity || 75}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Type</div>
                  <div className="font-bold">Web-based Tool</div>
                </div>
              </div>
            </div>

            {/* Share Card */}
            <div className="card">
              <h3 className="font-bold text-lg mb-4">Share</h3>
              <div className="space-y-2">
                <button className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm font-medium">
                  Share on Facebook
                </button>
                <button className="w-full px-4 py-2 bg-sky-400 text-white rounded hover:bg-sky-500 text-sm font-medium">
                  Share on Twitter
                </button>
                <button className="w-full px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 text-sm font-medium">
                  Copy Link
                </button>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </PageLayout>
  );
}
