import { Plus_Jakarta_Sans, Noto_Sans_Arabic } from 'next/font/google';

export const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

export const notoArabic = Noto_Sans_Arabic({
  subsets: ['arabic'],
  variable: '--font-arabic',
  display: 'swap',
});
