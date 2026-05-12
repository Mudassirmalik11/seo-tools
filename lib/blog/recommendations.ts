import type { BlogArticle, RelatedContent } from '@/types/blog';
import { getBlogArticles } from '@/data/blog';

export function getRelatedArticles(article: BlogArticle, limit = 5): BlogArticle[] {
  const articles = getBlogArticles();

  const scored = articles
    .filter(a => a.id !== article.id && a.status === 'published')
    .map(a => {
      let score = 0;

      // Same cluster (highest priority)
      if (article.cluster === a.cluster && article.cluster) {
        score += 100;
      }

      // Same category
      if (article.category === a.category) {
        score += 50;
      }

      // Shared tags
      const sharedTags = article.tags.filter(tag => a.tags.includes(tag));
      score += sharedTags.length * 20;

      // Shared related tools
      if (article.relatedTools && a.relatedTools) {
        const shared = article.relatedTools.filter(t => a.relatedTools?.includes(t));
        score += shared.length * 15;
      }

      return { article: a, score };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map(item => item.article);
}

export function getRelatedContent(article: BlogArticle): RelatedContent {
  return {
    posts: getRelatedArticles(article, 5),
    tools: article.relatedTools || [],
    categories: [article.category],
  };
}

export function getArticlesByTag(tag: string, limit = 10): BlogArticle[] {
  const articles = getBlogArticles();
  return articles
    .filter(a => a.tags.includes(tag) && a.status === 'published')
    .slice(0, limit);
}

export function getArticlesByCategory(category: string, limit = 10): BlogArticle[] {
  const articles = getBlogArticles();
  return articles
    .filter(a => a.category === category && a.status === 'published')
    .slice(0, limit);
}

export function getArticlesByCluster(cluster: string, limit = 10): BlogArticle[] {
  const articles = getBlogArticles();
  return articles
    .filter(a => a.cluster === cluster && a.status === 'published')
    .slice(0, limit);
}

export function getAllPublishedArticles(limit = 50, offset = 0): BlogArticle[] {
  const articles = getBlogArticles();
  return articles
    .filter(a => a.status === 'published')
    .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime())
    .slice(offset, offset + limit);
}
