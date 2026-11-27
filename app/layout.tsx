import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import '@fontsource-variable/ibarra-real-nova';
import '@fontsource-variable/ibarra-real-nova/wght-italic.css';
import '@fontsource-variable/sofia-sans';
import '@fontsource-variable/sofia-sans/wght-italic.css';
import { ThemeProvider } from 'jamstacks';
import { ThemeScript } from 'jamstacks/server';
import { SiteHeader } from '../components/site-header';
import { SiteFooter } from '../components/site-footer';
import { business } from '../content/business';
import { site } from '../lib/site';
import './tailwind.input.css';

export const metadata: Metadata = {
  title: { default: business.name, template: `%s — ${business.name}` },
  description: site.description || business.introduction,
  ...(site.url ? { metadataBase: new URL(`${site.url}/`) } : {}),
  openGraph: {
    type: 'website',
    siteName: business.name,
    title: `${business.name} — The Menu Issue`,
    description: site.description || business.introduction,
    images: [{ url: '/og.png', width: 1200, height: 630, alt: `${business.name} — The Menu Issue` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${business.name} — The Menu Issue`,
    description: site.description || business.introduction,
    images: ['/og.png'],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="light dark" />
        <ThemeScript />
      </head>
      <body>
        <ThemeProvider>
          <a className="skip-link" href="#main">
            Skip to content
          </a>
          <SiteHeader />
          <main id="main" tabIndex={-1}>
            {children}
          </main>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
