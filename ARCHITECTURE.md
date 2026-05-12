/**
 * ARCHITECTURE.md - Complete System Design
 */

# SEO Tools Platform - Complete Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────┐
│                    Frontend Layer                        │
│  (Next.js 14, React 18, Tailwind CSS)                   │
├─────────────────────────────────────────────────────────┤
│                    Routing Layer                         │
│  ├─ /tools/[slug]       → Dynamic Tool Pages            │
│  ├─ /[category]         → Category Pages                │
│  ├─ /use-cases/[variant] → Programmatic SEO Pages       │
│  ├─ /blog/[slug]        → Blog Posts                    │
│  └─ /api/tools/[slug]   → Tool APIs                     │
├─────────────────────────────────────────────────────────┤
│                   Engine Layer                           │
│  ├─ Tool Registry      (data/tools.ts)                  │
│  ├─ Tool Processor     (lib/tools/processor.ts)         │
│  ├─ Tool Loader        (lib/tools/loader.ts)           │
│  └─ Registry Utils     (lib/tools/registry.ts)          │
├─────────────────────────────────────────────────────────┤
│                    SEO Layer                             │
│  ├─ Metadata Generator  (lib/seo/metadata.ts)           │
│  ├─ Structured Data                                     │
│  ├─ Internal Linking                                    │
│  └─ Sitemap/Robots                                      │
├─────────────────────────────────────────────────────────┤
│                   Component Layer                        │
│  ├─ Tool Components    (components/tools/)              │
│  ├─ Ad Components      (components/ads/)                │
│  ├─ Layout Components  (components/layout/)             │
│  └─ Utility Components                                  │
└─────────────────────────────────────────────────────────┘
```

## Data Flow

### 1. Tool Request Flow

```
User visits /tools/word-counter
    ↓
generateStaticParams() retrieves all tools
    ↓
[slug]/page.tsx loads tool by slug
    ↓
getToolBySlug() returns tool registry entry
    ↓
loadToolComponent() dynamically imports component
    ↓
Render WordCounter component
    ↓
User interacts with tool
    ↓
Component calls processWordCounter()
    ↓
Results displayed
```

### 2. API Request Flow

```
POST /api/tools/word-counter
{
  "text": "sample text"
}
    ↓
POST handler receives request
    ↓
processTool('word-counter', data)
    ↓
processWordCounter() executes logic
    ↓
Returns ToolResponse
    ↓
JSON response to client
```

### 3. Programmatic SEO Flow

```
/use-cases/word-counter-for-students
    ↓
parseVariant() extracts tool slug + variant
    ↓
getToolBySlug() + getProgrammaticVariants()
    ↓
Loads variant metadata (title, description, keywords)
    ↓
Renders page with variant context
    ↓
Same tool component, different SEO
```

## Registry System

### Tool Registry Structure

```typescript
ToolRegistry {
  id: string;              // Unique identifier
  slug: string;            // URL slug
  name: string;            // Display name
  category: ToolCategory;  // Category reference
  description: string;     // Short description
  component: string;       // React component name
  seo: SEOMetadata;        // SEO data
  apiEndpoint: string;     // API path
  popularity: number;      // 0-100
  tags: string[];          // Search tags
  relatedTools: string[];  // Related tool slugs
}
```

### Category System

```typescript
ToolCategory {
  id: string;
  slug: string;
  name: string;
  description: string;
  count: number;
  seo: SEOMetadata;
}
```

### Programmatic Variants

```typescript
ProgrammaticVariant {
  variant: string;           // URL segment
  title: string;             // SEO title
  description: string;       // SEO description
  keywords: string[];        // SEO keywords
}
```

## Dynamic Routing Strategy

### Route Patterns

| Route | Type | Params | Example |
|-------|------|--------|---------|
| `/` | Static | none | Homepage |
| `/tools` | Static | none | All tools listing |
| `/tools/[slug]` | Dynamic | slug | /tools/word-counter |
| `/[category]` | Dynamic | category | /writing-tools |
| `/use-cases/[variant]` | Dynamic | variant | /use-cases/word-counter-for-students |
| `/blog` | Static | none | Blog listing |
| `/blog/[slug]` | Dynamic | slug | /blog/what-is-keyword-density |
| `/api/tools/[slug]` | API | slug | /api/tools/word-counter |

### Static Generation

- `generateStaticParams()` pre-renders all possible routes
- For 100 tools + 3 variants each + blog posts = 500+ pre-rendered pages
- ISR invalidates cache on demand
- Incremental Static Regeneration for new tools

## Tool Lifecycle

### Adding a New Tool

1. **Define in Registry** (`data/tools.ts`)
   ```typescript
   {
     id: 'tool-006',
     slug: 'my-tool',
     component: 'MyTool',
     // ...
   }
   ```

2. **Create Component** (`components/tools/MyTool.tsx`)
   ```typescript
   'use client';
   export function MyTool() { ... }
   ```

3. **Add Processing Logic** (`lib/tools/processor.ts`)
   ```typescript
   export async function processMyTool(data) { ... }
   
   case 'my-tool':
     return await processMyTool(data);
   ```

4. **Register Component** (`lib/tools/loader.ts`)
   ```typescript
   MyTool: () => import('@/components/tools/MyTool')
   ```

5. **Deploy**
   - Build regenerates routes
   - New tool available immediately

## SEO Architecture

### Metadata Generation

All SEO metadata generated via `generateMetaTags()`:

```typescript
{
  title: string;           // Page title (50-60 chars)
  description: string;     // Meta description (150-160 chars)
  keywords: string[];      // Target keywords
  canonical: string;       // Canonical URL
  ogImage: string;         // Open Graph image
}
```

### Structured Data

Implemented for:
- **ToolPage** - Tool-specific app data
- **CategoryPage** - Collection page schema
- **BlogPost** - Article schema
- **FAQPage** - FAQ schema
- **BreadcrumbList** - Navigation schema

### Internal Linking

Three-tier linking strategy:

1. **Related Tools** - Similar tools (same category)
2. **Category Links** - All tools in category
3. **Blog Links** - Related articles

## Performance Optimization

### Core Web Vitals

- **LCP** (Largest Contentful Paint)
  - Dynamic imports for tools
  - Image optimization
  - Lazy loading

- **FID** (First Input Delay)
  - Server-side processing
  - Optimized React
  - Debouncing

- **CLS** (Cumulative Layout Shift)
  - Fixed ad placeholders
  - Defined image sizes
  - Skeleton loaders

### Caching Strategy

```
Static Routes      → Full SSG (24h+ cache)
Dynamic Tool Pages → ISR (5-60s revalidation)
API Routes         → no-store (always fresh)
Images             → 30-day cache
Assets             → immutable cache
```

## Monetization

### AdSense Placement

```
┌──────────────────────────┐
│     Top Banner Ad        │  (728x90 / 300x250)
├──────────────────────────┤
│    Tool Interface        │
├──────────────────────────┤
│    Mid-Content Ad        │  (300x250)
├──────────────────────────┤
│   SEO Content (Text)     │
├──────────────────────────┤
│    Bottom Banner Ad      │  (728x90)
├──────────────────────────┤
│  Sidebar Ad (Desktop)    │  (300x600)
└──────────────────────────┘
```

### Revenue Optimization

- Multiple ad formats
- Strategic placement
- Responsive design
- A/B testing ready
- Non-intrusive design

## Scalability

### Current Capacity

- 100+ tools supported
- 1000+ programmatic pages
- 500+ blog posts
- 100k+ monthly visitors

### Scaling Path

**Phase 1: Optimize** (Current)
- Add 50+ more tools
- Create 50+ blog posts
- Target 10k monthly visitors

**Phase 2: Expand** (Q2)
- 200+ tools
- Programmatic variants: 3000+ pages
- 50k monthly visitors
- API tier

**Phase 3: Scale** (Q3)
- 500+ tools
- 10,000+ programmatic pages
- 500k monthly visitors
- Multiple monetization

**Phase 4: Global** (Q4+)
- 1000+ tools
- 50,000+ programmatic pages
- 1M+ monthly visitors
- International expansion

## Database Considerations

Currently JSON-based (data/tools.ts). For scaling to 1000+ tools:

```typescript
// Switch to Prisma + PostgreSQL
// ./prisma/schema.prisma

model Tool {
  id       String @id @default(cuid())
  slug     String @unique
  name     String
  // ... other fields
}

model Category {
  id       String @id @default(cuid())
  slug     String @unique
  // ... other fields
}

model BlogPost {
  id       String @id @default(cuid())
  slug     String @unique
  // ... other fields
}
```

## Security Considerations

- ✅ No user authentication (public tools)
- ✅ Client-side processing (no data storage)
- ✅ HTTPS enforcement
- ✅ Content Security Policy (CSP)
- ✅ Rate limiting on APIs
- ✅ Input validation
- ✅ XSS protection (React escaping)
- ✅ CSRF protection (Next.js default)

## API Rate Limiting

```typescript
// Rate limiting per IP
// 100 requests per minute for tool APIs
// 1000 requests per hour for bulk APIs
```

## Monitoring & Analytics

- Google Analytics 4
- Core Web Vitals monitoring
- Error tracking (Sentry)
- Performance monitoring
- User behavior tracking
- Conversion tracking

## Future Enhancements

- [ ] User accounts
- [ ] Saved results
- [ ] API tier
- [ ] Bulk operations
- [ ] Integrations
- [ ] Browser extension
- [ ] Mobile app
- [ ] Premium features
- [ ] WhiteLabel solution
- [ ] Custom branding

---

This architecture is production-ready and designed to scale from 10k to 1M+ monthly visitors.
