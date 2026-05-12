import type { BlogArticle, InternalLink } from '@/types/blog';
import { getBlogArticles, getTopicalCluster } from '@/data/blog';

function calculateRelevanceScore(source: BlogArticle, target: BlogArticle): number {
  let score = 0;

  // Same cluster
  if (source.cluster && source.cluster === target.cluster) {
    score += 50;
  }

  // Same category
  if (source.category === target.category) {
    score += 30;
  }

  // Shared tags
  const sharedTags = source.tags.filter(tag => target.tags.includes(tag));
  score += sharedTags.length * 10;

  // Same related tools
  if (source.relatedTools && target.relatedTools) {
    const sharedTools = source.relatedTools.filter(tool => target.relatedTools?.includes(tool));
    score += sharedTools.length * 5;
  }

  return score;
}

export function findRelatedArticles(article: BlogArticle, limit = 5): BlogArticle[] {
  const articles = getBlogArticles();

  const scored = articles
    .filter(a => a.id !== article.id && a.status === 'published')
    .map(a => ({
      article: a,
      score: calculateRelevanceScore(article, a),
    }))
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map(item => item.article);
}

export function generateInternalLinks(article: BlogArticle): InternalLink[] {
  const links: InternalLink[] = [];

  // Link to cluster
  if (article.cluster) {
    const cluster = getTopicalCluster(article.cluster);
    if (cluster) {
      links.push({
        targetSlug: cluster.slug,
        targetType: 'cluster',
        anchor: `${cluster.name} Cluster`,
        relevanceScore: 100,
      });
    }
  }

  // Link to related posts
  if (article.relatedPosts) {
    article.relatedPosts.forEach(slug => {
      links.push({
        targetSlug: slug,
        targetType: 'article',
        anchor: 'Related Article',
        relevanceScore: 80,
      });
    });
  }

  // Link to related tools
  if (article.relatedTools) {
    article.relatedTools.forEach(slug => {
      links.push({
        targetSlug: slug,
        targetType: 'tool',
        anchor: 'Related Tool',
        relevanceScore: 75,
      });
    });
  }

  // Link to category
  links.push({
    targetSlug: article.category,
    targetType: 'category',
    anchor: 'View Category',
    relevanceScore: 60,
  });

  // Link to tags
  article.tags.forEach(tag => {
    links.push({
      targetSlug: tag,
      targetType: 'tag',
      anchor: `${tag} Articles`,
      relevanceScore: 50,
    });
  });

  return links;
}

export function suggestInternalLinks(article: BlogArticle): InternalLink[] {
  const related = findRelatedArticles(article, 3);
  const suggestedLinks: InternalLink[] = [];

  related.forEach(a => {
    suggestedLinks.push({
      targetSlug: a.slug,
      targetType: 'article',
      anchor: a.title,
      relevanceScore: calculateRelevanceScore(article, a),
    });
  });

  return suggestedLinks;
}
