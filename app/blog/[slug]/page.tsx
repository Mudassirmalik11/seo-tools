/**
 * Blog Post Page - /blog/[slug]
 */

import { Metadata } from 'next';
import Link from 'next/link';
import { PageLayout } from '@/components/layout/Layout';
import { AdBanner } from '@/components/ads/AdBanner';
import { InContentAd } from '@/components/ads/InContentAd';
import { SidebarAd } from '@/components/ads/SidebarAd';
import { MultiplexAd } from '@/components/ads/MultiplexAd';

interface Props {
  params: { slug: string };
}

// Sample blog posts data
const BLOG_POSTS: Record<string, any> = {
  'what-is-keyword-density': {
    title: 'What Is Keyword Density and Why Does It Matter for SEO?',
    author: 'Sarah Johnson',
    date: '2024-01-15',
    category: 'SEO',
    content: `
      <h2>Understanding Keyword Density</h2>
      <p>Keyword density is the percentage of times a target keyword appears in your content compared to the total number of words. It's a fundamental concept in SEO that can help improve your rankings.</p>
      
      <h3>How to Calculate Keyword Density</h3>
      <p>The formula is simple: (Number of keyword mentions / Total words in content) × 100 = Keyword Density %</p>
      
      <h3>Optimal Keyword Density</h3>
      <p>While there's no official "perfect" keyword density, most SEO experts recommend keeping it between 1-2% for optimal results. Going above 3% may be considered keyword stuffing.</p>
      
      <h3>Why It Matters</h3>
      <p>Search engines use keyword density as one of many signals to understand what your content is about. Proper keyword density helps your content rank for the target keywords while maintaining natural readability.</p>
    `,
    relatedTools: ['keyword-density-checker', 'word-counter'],
    image: '📊',
  },
  'optimize-images-for-seo': {
    title: 'How to Optimize Images for SEO and Web Performance',
    author: 'Mike Chen',
    date: '2024-01-14',
    category: 'SEO',
    content: `
      <h2>Image Optimization is Critical</h2>
      <p>Images are an important part of modern websites, but they can also slow down your site if not optimized properly. Here's how to optimize images for both SEO and performance.</p>
      
      <h3>File Size Matters</h3>
      <p>Large image files slow down your website, which impacts your SEO rankings. Compress your images to reduce file size without compromising quality.</p>
      
      <h3>Use Descriptive File Names</h3>
      <p>Instead of "IMG_2024.jpg", use descriptive names like "best-seo-practices-2024.jpg" to help search engines understand your image content.</p>
      
      <h3>Alt Text is Essential</h3>
      <p>Alt text describes your image to both users and search engines. Use descriptive alt text that includes your target keywords naturally.</p>
      
      <h3>Choose the Right Format</h3>
      <p>Use WebP format for better compression, PNG for graphics with transparency, and JPEG for photographs.</p>
    `,
    relatedTools: ['image-resizer'],
    image: '🖼️',
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = BLOG_POSTS[params.slug];
  if (!post) return { title: 'Post Not Found' };

  return {
    title: post.title,
    description: post.content.substring(0, 160),
  };
}

export async function generateStaticParams() {
  return Object.keys(BLOG_POSTS).map(slug => ({ slug }));
}

export default function BlogPostPage({ params }: Props) {
  const post = BLOG_POSTS[params.slug];

  if (!post) {
    return (
      <PageLayout>
        <div className="container-section py-12">
          <h1 className="text-3xl font-bold">Post Not Found</h1>
          <Link href="/blog" className="btn-primary inline-block mt-6">
            Back to Blog
          </Link>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      {/* Header */}
      <div className="tool-header">
        <div className="container-section">
          <Link href="/blog" className="text-blue-600 hover:underline mb-4 inline-block">
            ← Back to Blog
          </Link>
          <h1 className="tool-title">{post.title}</h1>
          <div className="flex flex-wrap gap-4 mt-6 text-gray-600">
            <span>{post.author}</span>
            <span>•</span>
            <span>{post.date}</span>
            <span>•</span>
            <span className="badge">{post.category}</span>
          </div>
        </div>
      </div>

      <div className="container-section py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Top Ad */}
            <AdBanner placement="blog_top_leaderboard" />

            {/* Content */}
            <article className="prose prose-lg max-w-none my-8">
              <InContentAd contentHtml={post.content} interval={2} placement="blog_paragraph" />
            </article>

            {/* Middle Ad */}
            <AdBanner placement="blog_inline_rectangle" />

            {/* Author Bio */}
            <div className="card my-8 bg-blue-50 border-2 border-blue-200">
              <div className="flex items-center gap-4">
                <div className="text-4xl">👨‍✍️</div>
                <div>
                  <h3 className="font-bold text-lg">{post.author}</h3>
                  <p className="text-gray-700">
                    SEO specialist and content creator with 10+ years of experience helping businesses rank higher.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Ad */}
            <AdBanner placement="blog_bottom_multiplex" />
            <MultiplexAd />

            {/* Related Tools */}
            {post.relatedTools && (
              <section className="my-12 p-6 bg-green-50 border border-green-200 rounded-lg">
                <h3 className="text-2xl font-bold mb-6">Tools Mentioned in This Article</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {post.relatedTools.map((slug: string) => (
                    <Link
                      key={slug}
                      href={`/tools/${slug}`}
                      className="card bg-white hover:shadow-md transition"
                    >
                      <h4 className="font-bold mb-2">Try the {slug} tool</h4>
                      <p className="text-sm text-gray-600">Analyze your content with our free tool</p>
                      <span className="text-blue-600 font-medium">Learn more →</span>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <aside className="hidden lg:block">
            <SidebarAd />
            <div className="sticky top-20 space-y-6">
              {/* Latest Posts */}
              <div className="card">
                <h3 className="font-bold text-lg mb-4">Latest Articles</h3>
                <ul className="space-y-3">
                  {Object.keys(BLOG_POSTS)
                    .slice(0, 3)
                    .map(slug => (
                      <li key={slug}>
                        <Link
                          href={`/blog/${slug}`}
                          className="text-blue-600 hover:underline text-sm"
                        >
                          {BLOG_POSTS[slug].title}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>

              {/* Categories */}
              <div className="card">
                <h3 className="font-bold text-lg mb-4">Categories</h3>
                <div className="space-y-2">
                  <Link href="/blog?category=seo" className="block text-blue-600 hover:underline">
                    SEO Tips
                  </Link>
                  <Link href="/blog?category=content" className="block text-blue-600 hover:underline">
                    Content Strategy
                  </Link>
                  <Link href="/blog?category=tools" className="block text-blue-600 hover:underline">
                    Tool Guides
                  </Link>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </PageLayout>
  );
}
