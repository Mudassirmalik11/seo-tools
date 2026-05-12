/**
 * Layout Components
 */

'use client';

import Link from 'next/link';
import { ReactNode } from 'react';
import { StickyMobileAd } from '@/components/ads/StickyMobileAd';

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <nav className="container-section py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          🛠️ SEO Tools
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          <Link href="/writing-tools" className="hover:text-blue-600 transition">
            Writing
          </Link>
          <Link href="/seo-tools" className="hover:text-blue-600 transition">
            SEO
          </Link>
          <Link href="/image-tools" className="hover:text-blue-600 transition">
            Images
          </Link>
          <Link href="/blog" className="hover:text-blue-600 transition">
            Blog
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <input
            type="search"
            placeholder="Search tools..."
            className="px-4 py-2 bg-gray-100 rounded-lg hidden sm:block focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <Link href="/tools" className="btn-primary">
            All Tools
          </Link>
        </div>
      </nav>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="container-section py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold mb-4">🛠️ SEO Tools</h3>
            <p className="text-gray-400 text-sm">
              Free online tools for SEO optimization, content analysis, and productivity.
            </p>
          </div>

          {/* Tools */}
          <div>
            <h4 className="font-bold mb-4">Popular Tools</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/tools/word-counter" className="hover:text-white">Word Counter</Link></li>
              <li><Link href="/tools/keyword-density-checker" className="hover:text-white">Keyword Density</Link></li>
              <li><Link href="/tools/image-resizer" className="hover:text-white">Image Resizer</Link></li>
              <li><Link href="/tools/text-case-converter" className="hover:text-white">Text Case</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-bold mb-4">Categories</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/writing-tools" className="hover:text-white">Writing Tools</Link></li>
              <li><Link href="/seo-tools" className="hover:text-white">SEO Tools</Link></li>
              <li><Link href="/image-tools" className="hover:text-white">Image Tools</Link></li>
              <li><Link href="/developer-tools" className="hover:text-white">Developer Tools</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-bold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
              <li><Link href="#" className="hover:text-white">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-white">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-white">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2024 SEO Tools Platform. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

/**
 * Main page layout wrapper
 */
export function PageLayout({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <>
      <Header />
      <main className={`flex-1 ${className}`}>
        {children}
      </main>
      <Footer />
      <StickyMobileAd />
    </>
  );
}

/**
 * Tool page layout with sidebar
 */
export function ToolPageLayout({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">{children}</div>
      <aside className="hidden lg:block">
        <div className="sticky top-20">
          {/* Sidebar will include ads, related tools, etc */}
        </div>
      </aside>
    </div>
  );
}
