import type { Metadata } from 'next';
import { plusJakarta, notoArabic } from './fonts';
import './globals.css';
import Header from '@/components/Header';
import HeroLogoDock from '@/components/HeroLogoDock';
import Footer from '@/components/Footer';
import MdMotion from '@/components/MdMotion';

export const metadata: Metadata = {
  title: 'MD Dental — Egypt\'s Exclusive Distributor of Global Dental Brands',
  description:
    'MD Dental distributes 8 world-class dental brands across Egypt\'s 27 governorates. Authentic products, nationwide delivery, and expert clinical support.',
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
