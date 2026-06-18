import type { Metadata } from 'next';
import { plusJakarta, notoArabic } from './fonts';
import './globals.css';
import Header from '@/components/Header';
import HeroLogoDock from '@/components/HeroLogoDock';
import Footer from '@/components/Footer';
import MdMotion from '@/components/MdMotion';
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Egypt's Exclusive Distributor of Global Dental Brands`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    type: 'website',
    locale: 'en_EG',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Egypt's Exclusive Distributor of Global Dental Brands`,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr">
      <body className={`${plusJakarta.variable} ${notoArabic.variable} antialiased`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded focus:bg-white focus:px-4 focus:py-2 focus:shadow"
        >
          Skip to main content
        </a>
        <Header />
        <HeroLogoDock />
        <main id="main-content">{children}</main>
        <Footer />
        <MdMotion />
      </body>
    </html>
  );
}
