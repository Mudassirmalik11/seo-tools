import type { TopicalCluster } from '@/types/blog';
import { TOPICAL_CLUSTERS, getBlogArticles } from '@/data/blog';

export function getClusterInfo(slug: string): TopicalCluster | undefined {
  return TOPICAL_CLUSTERS.find(c => c.slug === slug);
}

export function getAllClusters(): TopicalCluster[] {
  return TOPICAL_CLUSTERS;
}

export function getClusterArticles(slug: string) {
  const cluster = getClusterInfo(slug);
  if (!cluster) return [];

  const articles = getBlogArticles();
  return articles.filter(
    a => (a.cluster === slug && a.status === 'published') || a.id === cluster.pillarArticle
  );
}

export function getClusterRelatedTools(slug: string): string[] {
  const cluster = getClusterInfo(slug);
  return cluster?.relatedTools || [];
}

export function getClusterDescription(slug: string): string {
  const cluster = getClusterInfo(slug);
  return cluster?.description || '';
}
