import type { Metadata } from 'next';
import PageHero from '@/components/layout/PageHero';
import WhyMdDentalView from '@/components/catalog/WhyMdDentalView';
import { WHY_MD_INTRO } from '@/content/whyMd';

export const metadata: Metadata = {
  title: 'Why MD Dental',
  description:
    'Exclusive global brands, nationwide delivery, transparent specs, and scientific support — for dentists and manufacturers in Egypt.',
};

export default function WhyMdDentalPage() {
  return (
    <div className="inner-page inner-page--promise inner-page--catalog">
      <div className="wrap catalog-page-shell">
        <PageHero
          breadcrumbLabel="Why MD Dental"
          eyebrow={WHY_MD_INTRO.eyebrow}
          title={WHY_MD_INTRO.title}
          lead={WHY_MD_INTRO.lead}
        />
        <WhyMdDentalView />
      </div>
    </div>
  );
}
