import { ToolRegistry, ToolCategory } from '@/types';

/**
 * Tool Registry - All tools defined here
 * System is data-driven: add tools to registry, not hardcoded pages
 */
export const TOOLS_REGISTRY: ToolRegistry[] = [
  {
    id: 'tool-001',
    slug: 'word-counter',
    name: 'Word Counter',
    category: { id: 'cat-001', slug: 'writing-tools', name: 'Writing Tools', description: '', count: 0, seo: { title: '', description: '', keywords: [] } },
    description: 'Count words, characters, and analyze text instantly',
    component: 'WordCounter',
    seo: {
      title: 'Free Word Counter Tool | Count Words & Characters Online',
      description: 'Fast and accurate word counter. Count words, characters, sentences, paragraphs in real-time. Perfect for essays, blog posts, and content creators.',
      keywords: ['word counter', 'free word counter', 'online word counter', 'character counter', 'text counter'],
      canonical: 'https://seotools.example.com/word-counter/',
    },
    apiEndpoint: '/api/tools/word-counter',
    popularity: 95,
    isFeatured: true,
    tags: ['writing', 'text-analysis', 'seo'],
    relatedTools: ['keyword-density-checker', 'text-case-converter'],
  },
  {
    id: 'tool-002',
    slug: 'keyword-density-checker',
    name: 'Keyword Density Checker',
    category: { id: 'cat-002', slug: 'seo-tools', name: 'SEO Tools', description: '', count: 0, seo: { title: '', description: '', keywords: [] } },
    description: 'Analyze keyword density in your content for SEO optimization',
    component: 'KeywordDensityChecker',
    seo: {
      title: 'Keyword Density Checker | Free SEO Analysis Tool',
      description: 'Check keyword density for better SEO. Analyze your content to find optimal keyword distribution. Improve rankings with data-driven insights.',
      keywords: ['keyword density', 'keyword density checker', 'seo analysis', 'keyword research', 'content optimization'],
      canonical: 'https://seotools.example.com/keyword-density-checker/',
    },
    apiEndpoint: '/api/tools/keyword-density-checker',
    popularity: 85,
    isFeatured: true,
    tags: ['seo', 'keyword-research', 'content-analysis'],
    relatedTools: ['word-counter', 'text-case-converter'],
  },
  {
    id: 'tool-003',
    slug: 'image-resizer',
    name: 'Image Resizer',
    category: { id: 'cat-003', slug: 'image-tools', name: 'Image Tools', description: '', count: 0, seo: { title: '', description: '', keywords: [] } },
    description: 'Resize images to specific dimensions and file sizes',
    component: 'ImageResizer',
    seo: {
      title: 'Free Image Resizer | Resize Images Online',
      description: 'Resize images instantly. Compress, crop, and optimize images for web. Supports all formats. Perfect for social media and web optimization.',
      keywords: ['image resizer', 'resize image', 'image compression', 'crop image', 'image optimization'],
      canonical: 'https://seotools.example.com/image-resizer/',
    },
    apiEndpoint: '/api/tools/image-resizer',
    popularity: 90,
    isFeatured: true,
    tags: ['image', 'optimization', 'web-tools'],
    relatedTools: ['word-counter', 'text-case-converter'],
  },
  {
    id: 'tool-004',
    slug: 'text-case-converter',
    name: 'Text Case Converter',
    category: { id: 'cat-001', slug: 'writing-tools', name: 'Writing Tools', description: '', count: 0, seo: { title: '', description: '', keywords: [] } },
    description: 'Convert text to different cases: UPPERCASE, lowercase, Title Case, etc.',
    component: 'TextCaseConverter',
    seo: {
      title: 'Free Text Case Converter | Convert Text Online',
      description: 'Convert text to uppercase, lowercase, title case, sentence case, and more. Fast online tool for text formatting.',
      keywords: ['text case converter', 'case converter', 'uppercase', 'lowercase', 'title case'],
      canonical: 'https://seotools.example.com/text-case-converter/',
    },
    apiEndpoint: '/api/tools/text-case-converter',
    popularity: 75,
    tags: ['text', 'writing', 'formatter'],
  },
  {
    id: 'tool-005',
    slug: 'json-formatter',
    name: 'JSON Formatter',
    category: { id: 'cat-004', slug: 'developer-tools', name: 'Developer Tools', description: '', count: 0, seo: { title: '', description: '', keywords: [] } },
    description: 'Format, validate, and minify JSON code',
    component: 'JSONFormatter',
    seo: {
      title: 'Free JSON Formatter & Validator | Online Tool',
      description: 'Format and validate JSON instantly. Minify, beautify, and validate JSON code online. For developers and API testing.',
      keywords: ['json formatter', 'json validator', 'json beautifier', 'json minifier'],
      canonical: 'https://seotools.example.com/json-formatter/',
    },
    apiEndpoint: '/api/tools/json-formatter',
    popularity: 80,
    tags: ['developer', 'json', 'code-formatting'],
  },
];

/**
 * Categories - Automatically generated from tools registry
 */
export const CATEGORIES: ToolCategory[] = [
  {
    id: 'cat-001',
    slug: 'writing-tools',
    name: 'Writing Tools',
    description: 'Tools for writers, bloggers, and content creators to analyze and optimize text',
    icon: '✍️',
    count: 2,
    seo: {
      title: 'Free Writing Tools | Word Counter, Case Converter & More',
      description: 'Collection of free writing tools for content creators. Count words, convert text cases, analyze readability, and optimize for SEO.',
      keywords: ['writing tools', 'word counter', 'text tools', 'content tools'],
      canonical: 'https://seotools.example.com/writing-tools/',
    },
  },
  {
    id: 'cat-002',
    slug: 'seo-tools',
    name: 'SEO Tools',
    description: 'Tools for search engine optimization and keyword research',
    icon: '🔍',
    count: 1,
    seo: {
      title: 'Free SEO Tools | Keyword Analysis & Optimization',
      description: 'Professional SEO tools for keyword research, content analysis, and search engine optimization. Improve your rankings with data-driven insights.',
      keywords: ['seo tools', 'keyword research', 'seo analysis', 'optimization'],
      canonical: 'https://seotools.example.com/seo-tools/',
    },
  },
  {
    id: 'cat-003',
    slug: 'image-tools',
    name: 'Image Tools',
    description: 'Image processing tools for resizing, compression, and optimization',
    icon: '🖼️',
    count: 1,
    seo: {
      title: 'Free Image Tools | Resize, Compress & Optimize',
      description: 'Free image tools for resizing, compression, and optimization. Perfect for web design, social media, and content creation.',
      keywords: ['image tools', 'image resizer', 'image compression', 'image optimization'],
      canonical: 'https://seotools.example.com/image-tools/',
    },
  },
  {
    id: 'cat-004',
    slug: 'developer-tools',
    name: 'Developer Tools',
    description: 'Tools for developers and programmers',
    icon: '👨‍💻',
    count: 1,
    seo: {
      title: 'Free Developer Tools | JSON, Code Formatter & More',
      description: 'Essential developer tools for code formatting, validation, and optimization. JSON formatter, minifier, and more.',
      keywords: ['developer tools', 'json formatter', 'code tools', 'developer utilities'],
      canonical: 'https://seotools.example.com/developer-tools/',
    },
  },
];

/**
 * Programmatic SEO Variants - Generate multiple pages from one tool
 */
export const PROGRAMMATIC_VARIANTS = {
  'word-counter': [
    {
      variant: 'for-students',
      title: 'Word Counter for Students | Essay & Assignment Tool',
      description: 'Help with essay and assignment word counts. Track your writing progress for school papers.',
      keywords: ['word counter for students', 'essay word counter', 'assignment word count tool'],
    },
    {
      variant: 'for-bloggers',
      title: 'Word Counter for Bloggers | Blog Post Analyzer',
      description: 'Analyze blog post length and engagement metrics. Perfect for content creators.',
      keywords: ['word counter for bloggers', 'blog post counter', 'content length checker'],
    },
    {
      variant: 'for-seo',
      title: 'Word Counter for SEO | Content Length Analyzer',
      description: 'Optimize content length for search engines. Check word count for better rankings.',
      keywords: ['word counter seo', 'content length seo', 'article word count'],
    },
  ],
  'image-resizer': [
    {
      variant: 'to-100kb',
      title: 'Resize Image to 100KB | Compress Images Online',
      description: 'Resize and compress images to exactly 100KB. Fast, easy, and free.',
      keywords: ['resize image to 100kb', 'compress to 100kb', 'image compression'],
    },
    {
      variant: 'for-instagram',
      title: 'Resize Image for Instagram | Social Media Optimizer',
      description: 'Resize images to perfect Instagram dimensions. Optimized for all Instagram formats.',
      keywords: ['resize for instagram', 'instagram image size', 'social media image tool'],
    },
    {
      variant: 'for-web',
      title: 'Resize Image for Web | Website Optimization',
      description: 'Optimize images for web pages. Improve page speed and performance.',
      keywords: ['resize image for web', 'web image optimization', 'website image tool'],
    },
  ],
};
