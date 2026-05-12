/**
 * Topical Cluster Pillar Page
 */

import { Metadata } from 'next';
import Link from 'next/link';
import { PageLayout } from '@/components/layout/Layout';
import { AdBanner } from '@/components/ads/AdBanner';
import { MultiplexAd } from '@/components/ads/MultiplexAd';
import { getTopicalCluster, getBlogArticleBySlug, TOPICAL_CLUSTERS } from '@/data/blog';
import { getClusterArticles, getAllClusters } from '@/lib/blog/clusters';
import { formatDate } from '@/lib/blog/content';
import { generateClusterMetadata } from '@/lib/blog/metadata';




interface Props {
  params: {
    cluster: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cluster = getTopicalCluster(params.cluster);
  if (!cluster) {
    return {
      title: 'Cluster Not Found',
    };
  }
  return generateClusterMetadata(cluster);
}

export async function generateStaticParams() {
  return TOPICAL_CLUSTERS.map(cluster => ({
    cluster: cluster.slug,
  }));
}

export default function ClusterPage({ params }: Props) {
  const cluster = getTopicalCluster(params.cluster);
  const articles = getClusterArticles(params.cluster);
  const pillarArticle = cluster ? getBlogArticleBySlug(cluster.pillarArticle) : null;

  if (!cluster) {
     


    return (
      <PageLayout>
        <div className="container-section py-12">
          <h1 className="text-3xl font-bold text-center">Cluster Not Found</h1>
          <p className="text-center text-gray-600 mt-4">
            <Link href="/blog" className="text-blue-600 hover:underline">
              Return to Blog
            </Link>
          </p>
        </div>
      </PageLayout>
    );
  }
  const relatedTools = cluster.relatedTools ?? [];

  return (
    <PageLayout>
      {/* Header */}
      <div className="tool-header">
        <div className="container-section">
          {cluster.icon && <div className="text-5xl mb-4">{cluster.icon}</div>}
          <h1 className="tool-title">{cluster.name}</h1>
          <p className="tool-subtitle">{cluster.description}</p>
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
          <span>Clusters</span>
          <span>/</span>
          <span>{cluster.name}</span>
        </div>

        {/* Pillar Article Highlight */}
        {pillarArticle && (
          <section className="my-12 card bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <div className="text-6xl text-center md:text-left">📖</div>
              <div className="md:col-span-2">
                <span className="badge">Pillar Article</span>
                <h2 className="text-3xl font-bold my-4">{pillarArticle.title}</h2>
                <p className="text-gray-700 mb-4">{pillarArticle.excerpt}</p>
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-sm text-gray-600">{formatDate(pillarArticle.publishedAt)}</span>
                  <span className="text-sm text-gray-600">•</span>
                  <span className="text-sm text-gray-600">{pillarArticle.readingTime} min read</span>
                </div>
                <Link href={`/blog/${pillarArticle.slug}`} className="btn-primary">
                  Read Full Article →
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Supporting Articles */}
        {articles.filter(a => a.id !== cluster.pillarArticle).length > 0 && (
          <section className="my-12">
            <h2 className="text-3xl font-bold mb-8">Supporting Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles
                .filter(a => a.id !== cluster.pillarArticle)
                .map(article => (
                  <Link
                    key={article.id}
                    href={`/blog/${article.slug}`}
                    className="card group hover:shadow-lg transition"
                  >
                    <div className="text-4xl mb-4">📚</div>
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
          </section>
        )}

        {/* Middle Ad */}
        <AdBanner placement="blog_inline_rectangle" />

        {/* Cluster Network Visualization */}
        <section className="my-12">
          <h2 className="text-2xl font-bold mb-6">Topical Network</h2>
          <div className="bg-gray-50 rounded-lg p-8 border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{articles.length}</div>
                <p className="text-gray-600 text-sm mt-2">Articles in Cluster</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">{relatedTools.length}</div>
                <p className="text-gray-600 text-sm mt-2">Related Tools</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">{cluster.seo.keywords.length}</div>
                <p className="text-gray-600 text-sm mt-2">Keywords Covered</p>
              </div>
            </div>

            {/* Keywords */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4">Keywords Covered</h3>
              <div className="flex flex-wrap gap-2">
                {cluster.seo.keywords.map((keyword, i) => (
                  <span key={i} className="px-3 py-1 bg-blue-100 text-blue-900 rounded-full text-sm">
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Related Clusters */}
        {getAllClusters().filter(c => c.id !== cluster.id).length > 0 && (
          <section className="my-12">
            <h2 className="text-2xl font-bold mb-6">Related Clusters</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {getAllClusters()
                .filter(c => c.id !== cluster.id)
                .slice(0, 4)
                .map(relatedCluster => (
                  <Link
                    key={relatedCluster.id}
                    href={`/blog/cluster/${relatedCluster.slug}`}
                    className="p-4 border border-gray-200 rounded-lg hover:border-blue-600 hover:shadow-md transition"
                  >
                    <div className="flex items-start gap-3">
                      {relatedCluster.icon && <span className="text-2xl">{relatedCluster.icon}</span>}
                      <div>
                        <h3 className="font-semibold text-blue-600">{relatedCluster.name}</h3>
                        <p className="text-sm text-gray-600">{relatedCluster.description}</p>
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
