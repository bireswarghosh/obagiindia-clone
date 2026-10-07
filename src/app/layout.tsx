import type { Metadata } from 'next';
import './globals.css';
import { getSiteData } from '@/lib/db';

export async function generateMetadata(): Promise<Metadata> {
  const data = getSiteData();
  const seo = data.seo;

  return {
    title: 'Ryan Dermaceutics | Science That Understands Skin',
    description: 'Ryan Dermaceutics is a specialized dermatology division bringing together topical, oral and supportive products across multiple therapeutic areas.',
    keywords: [
      'Ryan Dermaceutics',
      'Science That Understands Skin',
      'Dermatology India',
      'Therapeutic Resources',
      'Prescribing Information',
      'Product Monographs',
      'Acne Management',
      'Hair and Scalp Disorders',
      'Obagi Medical'
    ],
    authors: [{ name: 'Ryan Dermaceutics' }],
    creator: 'Ryan Dermaceutics Division',
    publisher: 'Ryan Dermaceutics',
    metadataBase: new URL('https://obagiindia.vercel.app'),
    openGraph: {
      title: 'Ryan Dermaceutics | Science That Understands Skin',
      description: 'A specialized dermatology division bringing together topical, oral and supportive products across multiple therapeutic areas.',
      url: 'https://obagiindia.vercel.app',
      siteName: 'Ryan Dermaceutics',
      images: [
        {
          url: '/ryan/ryan-logo.png',
          width: 1200,
          height: 630,
          alt: 'Ryan Dermaceutics',
        },
      ],
      locale: 'en_IN',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Ryan Dermaceutics | Science That Understands Skin',
      description: 'A specialized dermatology division bringing together topical, oral and supportive products across multiple therapeutic areas.',
      images: ['/ryan/ryan-logo.png'],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = getSiteData();
  const theme = data.theme;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalOrganization',
    name: 'Ryan Dermaceutics',
    url: 'https://obagiindia.vercel.app',
    logo: 'https://obagiindia.vercel.app/ryan/ryan-logo.png',
    description: 'Ryan Dermaceutics is a specialized dermatology division bringing together topical, oral and supportive products across multiple therapeutic areas.',
    telephone: '+91 (022) 4890-7800',
    email: 'info@ryandermaceutics.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Mumbai, Maharashtra, India',
      addressCountry: 'IN',
    },
  };


  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `
              :root {
                --obagi-navy: ${theme.primaryNavy};
                --obagi-deep: ${theme.deepNavy};
                --obagi-gold: ${theme.accentGold};
                --obagi-canvas: ${theme.canvasBg};
                --obagi-dark: ${theme.textDark};
                --obagi-muted: ${theme.textMuted};
                --obagi-border: ${theme.borderColor};
              }
            `,
          }}
        />
      </head>
      <body className="antialiased text-slate-900 bg-[#f8f7f5]">
        {children}
      </body>
    </html>
  );
}
