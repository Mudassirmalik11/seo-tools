import '@/app/globals.css';
import { AdProvider } from '@/components/ads/AdProvider';

export const metadata = {
  title: 'SEO Tools Platform - 100+ Free Online Tools',
  description: 'Access 100+ free SEO tools, word counters, image resizers, and productivity tools. Optimize your content for search engines and improve your online presence.',
  metadataBase: new URL('https://seotools.example.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'SEO Tools Platform - Free Online Tools',
    description: 'The ultimate platform for SEO optimization, content analysis, and productivity tools',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'SEO Tools Platform',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        {/* Google Analytics */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-YOUR-GA-ID"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-YOUR-GA-ID');
            `,
          }}
        />
        {/* AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR-ADSENSE-ID"
          crossOrigin="anonymous"
        />
      </head>
      <body className="bg-white text-gray-900">
        <AdProvider>
          <div className="min-h-screen flex flex-col">
            {children}
          </div>
        </AdProvider>
      </body>
    </html>
  );
}
