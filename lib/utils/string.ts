/**
 * String utilities for tool processing
 */

export function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(w => w.length > 0).length;
}

export function countCharacters(text: string): number {
  return text.length;
}

export function countSentences(text: string): number {
  return text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
}

export function countParagraphs(text: string): number {
  return text.split(/\n\n+/).filter(p => p.trim().length > 0).length;
}

export function calculateReadingTime(wordCount: number): number {
  const wordsPerMinute = 200;
  return Math.ceil(wordCount / wordsPerMinute);
}

export function calculateSpeakingTime(wordCount: number): number {
  const wordsPerMinute = 130;
  return Math.ceil(wordCount / wordsPerMinute);
}

export function sanitizeText(text: string): string {
  return text.trim();
}

export function highlightKeyword(text: string, keyword: string): string {
  const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
  return text.replace(regex, `<mark>${keyword}</mark>`);
}
