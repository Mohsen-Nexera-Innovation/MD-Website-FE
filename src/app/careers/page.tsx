import type { Metadata } from 'next';
import PageHero from '@/components/layout/PageHero';
import CareersView from '@/components/catalog/CareersView';
import { CAREERS_INTRO } from '@/content/careers';

export const metadata: Metadata = {
  title: 'Careers | MD Dental',
  description:
    'Join MD Dental — field sales, clinical support, logistics, and digital roles across Egypt\'s leading dental distributor.',
};

export default function CareersPage() {
  return (
    <div className="inner-page inner-page--promise inner-page--catalog">
      <div className="wrap">
        <PageHero
          breadcrumbLabel="Careers"
          eyebrow={CAREERS_INTRO.eyebrow}
          title={CAREERS_INTRO.title}
          lead={CAREERS_INTRO.lead}
        />
        <CareersView />
      </div>
    </div>
  );
}
