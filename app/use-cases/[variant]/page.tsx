/**
 * Programmatic SEO Pages - /use-cases/[variant]
 * Generates multiple pages from single tool with different keywords and intent
 * 
 * Example: /use-cases/word-counter-for-students, /use-cases/image-resizer-to-100kb, etc.
 */

import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getToolBySlug, getProgrammaticVariants, getAllProgrammaticPages } from '@/lib/tools/registry';
import { generateBreadcrumbStructuredData } from '@/lib/seo/metadata';
import { DynamicToolComponent } from '@/lib/tools/loader';
import { PageLayout } from '@/components/layout/Layout';
import { AdBanner } from '@/components/ads/AdBanner';
import { MultiplexAd } from '@/components/ads/MultiplexAd';

interface Props {
  params: { variant: string };
}

// Parse variant format: "tool-slug-variant-name"
function parseVariant(variant: string) {
  // Handle multi-word tool slugs like "keyword-density" + variant like "checker"
  // Strategy: Try to match known tool slugs from the end
  
  const possibleToolSlugs = ['word-counter', 'keyword-density-checker', 'image-resizer', 'text-case-converter', 'json-formatter'];
  
  for (const slug of possibleToolSlugs) {
    if (variant.startsWith(slug + '-')) {
      const variantName = variant.slice(slug.length + 1);
      return { toolSlug: slug, variantName };
    }
  }
  
  return null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const parsed = parseVariant(params.variant);
  if (!parsed) return { title: 'Page Not Found' };

  const tool = getToolBySlug(parsed.toolSlug);
  const variants = getProgrammaticVariants(parsed.toolSlug);
  const variant = variants.find(v => v.variant === parsed.variantName);

  if (!tool || !variant) return { title: 'Page Not Found' };

  return {
    title: variant.title,
    description: variant.description,
    keywords: variant.keywords.join(', '),
  };
}

export async function generateStaticParams() {
  const pages = getAllProgrammaticPages();

  return pages.map(page => ({
    variant: `${page.toolSlug}-${page.variant.variant}`,
  }));
}

export default function ProgrammaticPage({ params }: Props) {
  const parsed = parseVariant(params.variant);

  if (!parsed) {
    notFound();
  }

  const tool = getToolBySlug(parsed.toolSlug);
  const variants = getProgrammaticVariants(parsed.toolSlug);
  const variant = variants.find(v => v.variant === parsed.variantName);

  if (!tool || !variant) {
    notFound();
  }

  const breadcrumbData = generateBreadcrumbStructuredData([
    { name: 'Home', url: 'https://seotools.example.com' },
    { name: tool.category.name, url: `https://seotools.example.com/${tool.category.slug}` },
    { name: tool.name, url: `https://seotools.example.com/tools/${tool.slug}/` },
    { name: variant.title.split('|')[0].trim(), url: `https://seotools.example.com/use-cases/${params.variant}/` },
  ]);

  return (
    <PageLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }} />

      {/* Hero Section */}
      <div className="tool-header">
        <div className="container-section">
          <h1 className="tool-title">{variant.title.split('|')[0].trim()}</h1>
          <p className="tool-subtitle">{variant.description}</p>
          <div className="flex gap-2 mt-6">
            <span className="badge">{tool.category.name}</span>
            <Link href={`/tools/${tool.slug}`} className="text-blue-600 hover:underline">
              ← Back to {tool.name}
            </Link>
          </div>
        </div>
      </div>

      <div className="container-section py-12">
        {/* Top Ad */}
        <AdBanner placement="tool_top_banner" />

        {/* Tool */}
        <div className="tool-interface bg-white border border-gray-200 rounded-lg p-8 my-8">
          <DynamicToolComponent componentName={tool.component} />
        </div>

        {/* Middle Ad */}
        <AdBanner placement="tool_after_tool" />

        {/* SEO Content */}
        <section className="seo-content my-12">
          <h2 className="text-3xl font-bold mb-4">How This Tool Helps</h2>
          <p className="mb-4">
            This specialized version of {tool.name} is specifically designed for {variant.description.toLowerCase()}.
            It helps you achieve your goals faster and more efficiently.
          </p>

          <h3 className="text-2xl font-bold mb-4 mt-8">Key Benefits</h3>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Specifically optimized for your use case</li>
            <li>Faster processing with preset configurations</li>
            <li>Professional-grade results</li>
            <li>Perfect for bulk operations</li>
            <li>Completely free with no limitations</li>
          </ul>

          <h3 className="text-2xl font-bold mb-4 mt-8">Use Cases</h3>
          <p className="mb-4">
            This tool is perfect for:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Professionals looking for efficiency</li>
            <li>Students working on projects</li>
            <li>Content creators optimizing work</li>
            <li>Developers building applications</li>
            <li>Teams collaborating on tasks</li>
          </ul>

          <h3 className="text-2xl font-bold mb-4 mt-8">Tips & Tricks</h3>
          <p className="mb-4">
            To get the best results from this tool:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Prepare your input data beforehand</li>
            <li>Follow the step-by-step instructions</li>
            <li>Review the results carefully</li>
            <li>Use keyboard shortcuts for efficiency</li>
            <li>Share results with your team</li>
          </ul>
        </section>

        {/* Bottom Ad */}
        <AdBanner placement="tool_bottom_content" />
        <MultiplexAd />

        {/* Related Resources */}
        <section className="my-12">
          <h2 className="text-2xl font-bold mb-6">Related Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tool.relatedTools?.map(slug => (
              <Link
                key={slug}
                href={`/tools/${slug}`}
                className="card hover:shadow-lg transition"
              >
                <h3 className="font-bold mb-2">View {slug}</h3>
                <p className="text-sm text-gray-600">Explore this related tool</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Other Variants */}
        {variants.length > 1 && (
          <section className="my-12 bg-blue-50 border border-blue-200 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Other Variants</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {variants
                .filter(v => v.variant !== parsed.variantName)
                .map(v => (
                  <Link
                    key={v.variant}
                    href={`/use-cases/${parsed.toolSlug}-${v.variant}`}
                    className="px-4 py-3 bg-white border border-blue-300 rounded hover:bg-blue-100 transition"
                  >
                    <div className="font-bold text-blue-600">{v.title.split('|')[0].trim()}</div>
                    <div className="text-sm text-gray-600">{v.description}</div>
                  </Link>
                ))}
            </div>
          </section>
        )}
      </div>
    </PageLayout>
  );
}
