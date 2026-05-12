import type { BlogArticle } from '@/types/blog';

export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

export function calculateWordCount(content: string): number {
  return content.split(/\s+/).filter(word => word.length > 0).length;
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '');
}

export function generateExcerpt(content: string, length = 160): string {
  const stripped = stripHtml(content);
  return stripped.substring(0, length) + (stripped.length > length ? '...' : '');
}

export function extractHeadings(content: string): Array<{ level: number; text: string; id: string }> {
  const headings: Array<{ level: number; text: string; id: string }> = [];
  const regex = /<h([1-6])>([^<]+)<\/h\1>/g;
  let match;

  while ((match = regex.exec(content)) !== null) {
    const level = parseInt(match[1]);
    const text = match[2];
    const id = generateSlug(text);

    headings.push({ level, text, id });
  }

  return headings;
}

export function processArticleContent(article: Partial<BlogArticle>) {
  const content = article.content || '';
  const title = article.title || '';

  return {
    readingTime: calculateReadingTime(content),
    wordCount: calculateWordCount(content),
    excerpt: article.excerpt || generateExcerpt(content),
    slug: article.slug || generateSlug(title),
    headings: extractHeadings(content),
  };
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

export function formatRelativeDate(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
  if (days < 365) return `${Math.floor(days / 30)} months ago`;
  return `${Math.floor(days / 365)} years ago`;
}
