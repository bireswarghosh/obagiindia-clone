import type { Metadata } from 'next';
import './globals.css';
import { getSiteData } from '@/lib/db';

export async function generateMetadata(): Promise<Metadata> {
  const data = getSiteData();
  const seo = data.seo;

  return {
    title: seo.metaTitle,
    description: seo.metaDescription,
    keywords: seo.keywords.split(',').map((k) => k.trim()),
    authors: [{ name: 'Obagi Medical India' }],
    creator: 'Specra Healthcare',
    publisher: 'Obagi Cosmeceuticals LLC',
    metadataBase: new URL(seo.canonicalUrl || 'https://www.obagiindia.com'),
    openGraph: {
      title: seo.metaTitle,
      description: seo.metaDescription,
      url: seo.canonicalUrl,
      siteName: 'Obagi Medical India',
      images: [
        {
          url: seo.ogImage,
          width: 1200,
          height: 630,
          alt: 'Obagi Medical India',
        },
      ],
      locale: 'en_IN',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.metaTitle,
      description: seo.metaDescription,
      images: [seo.ogImage],
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
    name: 'Obagi Medical India',
    url: 'https://www.obagiindia.com',
    logo: 'https://static.wixstatic.com/media/4833d7_49dc6fa64d1d4175a6c782c81c6b7a60f000.jpg',
    description: data.seo.metaDescription,
    telephone: data.footer.phone,
    email: data.footer.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: data.footer.address,
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
