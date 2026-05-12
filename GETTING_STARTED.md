/**
 * GETTING_STARTED.md - Quick Developer Guide
 */

# Getting Started - Developer Guide

## Quick Start (5 minutes)

### 1. Install & Setup

```bash
# Clone repository
git clone <your-repo-url>
cd website_seo_tools

# Install dependencies
npm install

# Setup environment
cp .env.example .env.local

# Start development
npm run dev
```

Visit `http://localhost:3000` ✅

## File Organization

```
📦 website_seo_tools
├── 📁 app/                    # Next.js App Router
│   ├── page.tsx              # Homepage
│   ├── layout.tsx            # Root layout with metadata
│   ├── globals.css           # Global styles
│   ├── sitemap.ts            # Dynamic sitemap
│   ├── robots.ts             # Robots.txt
│   ├── tools/[slug]/         # Dynamic tool pages
│   ├── [category]/           # Category pages
│   ├── use-cases/[variant]/  # Programmatic SEO pages
│   ├── blog/                 # Blog pages
│   └── api/tools/[slug]/     # Tool APIs
│
├── 📁 components/            # React components
│   ├── tools/               # Tool UI components
│   ├── ads/                 # AdSense components
│   └── layout/              # Layout components
│
├── 📁 lib/                  # Business logic
│   ├── tools/
│   │   ├── registry.ts      # Tool registry functions
│   │   ├── processor.ts     # Tool processing logic
│   │   └── loader.ts        # Dynamic loader
│   ├── seo/
│   │   └── metadata.ts      # SEO metadata
│   └── utils/
│       └── string.ts        # String utilities
│
├── 📁 data/                 # Data files
│   └── tools.ts            # Tool registry, categories, variants
│
├── 📁 types/               # TypeScript types
│   └── index.ts
│
├── 📄 README.md            # Overview
├── 📄 ARCHITECTURE.md      # System design
├── 📄 DEPLOYMENT.md        # Deployment guide
├── 📄 package.json         # Dependencies
├── 📄 tsconfig.json        # TypeScript config
├── 📄 next.config.js       # Next.js config
└── 📄 tailwind.config.js   # Tailwind config
```

## Key Concepts

### 1. Tool Registry

All tools are defined in **ONE FILE**: `data/tools.ts`

```typescript
// Adding a new tool:
{
  id: 'tool-006',
  slug: 'my-awesome-tool',
  name: 'My Awesome Tool',
  component: 'MyAwesomeTool',
  seo: { title: '...', description: '...', keywords: [...] }
}
```

### 2. Dynamic Routing

Route `/tools/[slug]` automatically loads ANY tool:

```
/tools/word-counter        → loads WordCounter component
/tools/keyword-density     → loads KeywordDensityChecker
/tools/my-awesome-tool     → loads MyAwesomeTool
```

### 3. Component Lazy Loading

Tools are loaded on-demand, not upfront:

```typescript
// Only loads when needed!
const Component = loadToolComponent('WordCounter');
```

## Common Tasks

### Task 1: Add a New Tool (15 min)

**Step 1: Create component** (`components/tools/MyTool.tsx`)

```typescript
'use client';

import { useState } from 'react';
import { processMyTool } from '@/lib/tools/processor';

export function MyTool() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);

  const handleProcess = async () => {
    const response = await processMyTool(input);
    setResult(response);
  };

  return (
    <div className="space-y-6">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Your input here..."
        rows={8}
        className="w-full px-4 py-3 border rounded-lg"
      />
      
      <button onClick={handleProcess} className="btn-primary">
        Process
      </button>

      {result && (
        <div className="bg-green-50 p-6 rounded-lg">
          {/* Display results */}
        </div>
      )}
    </div>
  );
}
```

**Step 2: Add processing logic** (`lib/tools/processor.ts`)

```typescript
export async function processMyTool(data: string): Promise<ToolResponse> {
  try {
    // Your processing logic here
    const result = doSomethingWith(data);
    
    return {
      success: true,
      data: result
    };
  } catch (error) {
    return {
      success: false,
      error: 'Processing failed'
    };
  }
}

// Add case to processTool dispatcher:
case 'my-tool':
  return await processMyTool(data.input);
```

**Step 3: Register tool** (`data/tools.ts`)

```typescript
{
  id: 'tool-006',
  slug: 'my-tool',
  name: 'My Tool',
  category: { 
    id: 'cat-001', 
    slug: 'writing-tools', 
    name: 'Writing Tools',
    description: '',
    count: 0,
    seo: { title: '', description: '', keywords: [] }
  },
  description: 'A useful tool for doing something',
  component: 'MyTool',
  seo: {
    title: 'Free My Tool Online',
    description: 'Use our free My Tool to accomplish tasks',
    keywords: ['my tool', 'online', 'free']
  },
  apiEndpoint: '/api/tools/my-tool',
  popularity: 70,
  tags: ['useful', 'online'],
}
```

**Step 4: Register component** (`lib/tools/loader.ts`)

```typescript
const TOOL_COMPONENTS = {
  MyTool: () => import('@/components/tools/MyTool').then(m => ({ default: m.MyTool as any })),
  // ... other tools
};
```

**Done!** Your tool is now available at:
- `/tools/my-tool` - Main page
- `/api/tools/my-tool` - API endpoint

### Task 2: Create Programmatic SEO Pages (10 min)

Add variants in `data/tools.ts`:

```typescript
PROGRAMMATIC_VARIANTS: {
  'my-tool': [
    {
      variant: 'for-professionals',
      title: 'My Tool for Professionals | Expert Edition',
      description: 'Professional version of My Tool for business users',
      keywords: ['my tool professional', 'expert my tool']
    },
    {
      variant: 'for-students',
      title: 'My Tool for Students | Academic Edition',
      description: 'Student-friendly version of My Tool',
      keywords: ['my tool students', 'academic my tool']
    }
  ]
}
```

Pages created automatically:
- `/use-cases/my-tool-for-professionals`
- `/use-cases/my-tool-for-students`

### Task 3: Add Blog Post (10 min)

Edit `app/blog/[slug]/page.tsx`:

```typescript
const BLOG_POSTS = {
  'my-awesome-article': {
    title: 'My Awesome Article Title',
    author: 'Your Name',
    date: '2024-01-20',
    category: 'SEO',
    content: `
      <h2>Article heading</h2>
      <p>Your article content here...</p>
      
      <h3>Section heading</h3>
      <p>More content...</p>
    `,
    relatedTools: ['word-counter', 'my-tool'],
    image: '📝',
  }
};
```

Post accessible at: `/blog/my-awesome-article`

### Task 4: Update SEO Metadata

All SEO is in ONE FILE: `data/tools.ts`

```typescript
seo: {
  title: 'Free My Tool | Online Editor',              // 50-60 chars
  description: 'Use our free My Tool online...',      // 150-160 chars
  keywords: ['my tool', 'online', 'free'],            // 3-5 keywords
  canonical: 'https://yourdomain.com/tools/my-tool/'
}
```

### Task 5: Add Category

`data/tools.ts`:

```typescript
{
  id: 'cat-005',
  slug: 'my-category',
  name: 'My Category',
  description: 'Tools for my specific purpose',
  icon: '🎯',
  count: 0,
  seo: {
    title: 'Free My Category Tools',
    description: 'Collection of tools for my category',
    keywords: ['my category', 'tools']
  }
}
```

## Styling Guide

### Tailwind Classes Used

```css
/* Layout */
.container-section      /* Max width + padding */
.card                   /* Card styling */

/* Buttons */
.btn-primary           /* Blue button */
.btn-secondary         /* Gray button */

/* Text */
.badge                 /* Small tag/badge */

/* Responsive Grid */
.grid-responsive       /* 1→2→3 column grid */
```

### Common Patterns

```jsx
// Card
<div className="card">
  <h3 className="font-bold text-lg mb-4">Title</h3>
  <p className="text-gray-700">Content</p>
</div>

// Button
<button className="btn-primary">Click Me</button>

// Grid
<div className="grid-responsive">
  {/* 3 columns on desktop */}
</div>

// Ad Placement
<AdBannerTop />
<AdBannerMiddle />
<AdBannerBottom />
```

## Performance Tips

### 1. Image Optimization

```jsx
import Image from 'next/image';

<Image
  src="/logo.png"
  alt="Logo"
  width={200}
  height={100}
  priority // For above fold
/>
```

### 2. Dynamic Imports

```typescript
// Lazy load heavy components
const HeavyComponent = dynamic(() => 
  import('@/components/Heavy'),
  { loading: () => <div>Loading...</div> }
);
```

### 3. Server-Side Processing

```typescript
// Heavy processing on server, not client
export async function processTool(data) {
  // This runs on server
  return expensiveOperation(data);
}
```

## Testing

```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Build test
npm run build

# Performance test
npm run lighthouse
```

## Debugging

### Common Issues

**1. Tool not showing**
- Check if registered in `TOOL_COMPONENTS`
- Verify component file exists
- Check console for errors

**2. SEO not updating**
- Clear Next.js cache: `rm -rf .next`
- Rebuild: `npm run build`
- Check `generateMetadata()`

**3. Styling not applying**
- Check Tailwind config
- Verify class names
- Clear Tailwind cache

### Debug Mode

```typescript
// Add to page.tsx
console.log('Tool:', tool);
console.log('Metadata:', generateMetaTags(tool.seo));
```

## Resource Links

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript Docs](https://www.typescriptlang.org/docs/)
- [SEO Guide](https://developers.google.com/search)

## Common Commands

```bash
# Development
npm run dev           # Start dev server

# Production
npm run build         # Build for production
npm start            # Run production build

# Maintenance
npm install          # Install dependencies
npm update           # Update packages
npm audit            # Check security
npm audit fix        # Fix vulnerabilities

# Linting
npm run lint         # Run ESLint
npm run format       # Format with Prettier
npm run type-check   # Check TypeScript
```

## Next Steps

1. ✅ Add 10 more tools
2. ✅ Create 20 blog posts
3. ✅ Set up AdSense
4. ✅ Add Google Analytics
5. ✅ Deploy to production
6. ✅ Submit to search engines
7. ✅ Monitor performance
8. ✅ Scale based on traffic

## Getting Help

**Error?** Check:
1. Console logs (browser DevTools)
2. Terminal output
3. GitHub Issues
4. Next.js Discord

**Performance?** Check:
1. Lighthouse report
2. Core Web Vitals
3. Images optimization
4. Bundle size

**SEO?** Check:
1. Google Search Console
2. Meta tags in inspector
3. Structured data (JSON-LD)
4. Mobile usability

---

**You're ready!** Start building! 🚀
