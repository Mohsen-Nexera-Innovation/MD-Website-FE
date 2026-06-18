import type { Metadata } from 'next';
import PageHero from '@/components/layout/PageHero';
import AboutView from '@/components/catalog/AboutView';
import { ABOUT_INTRO } from '@/content/about';

export const metadata: Metadata = {
  title: 'About MD Dental',
  description:
    'Founded in 2019 — Egypt\'s exclusive distributor of 8 global dental brands across 27 governorates.',
};

export default function AboutPage() {
  return (
    <div className="inner-page inner-page--vision inner-page--catalog">
      <div className="wrap">
        <PageHero
          breadcrumbLabel="About MD"
          eyebrow={ABOUT_INTRO.eyebrow}
          title={ABOUT_INTRO.title}
          lead={ABOUT_INTRO.lead}
        />
        <AboutView />
      </div>
    </div>
  );
}
