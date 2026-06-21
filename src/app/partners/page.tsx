import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/layout/PageHero';
import PartnersHub from '@/components/catalog/PartnersHub';
import { PARTNERS_INTRO } from '@/content/partners';
import Arrow from '@/components/journey/Arrow';

export const metadata: Metadata = {
  title: 'Partners | MD Dental',
  description:
    'Global manufacturer partners and Egypt\'s academic dental network — distributed exclusively by MD Dental.',
};

export default function PartnersPage() {
  return (
    <div className="inner-page inner-page--partners inner-page--catalog">
      <div className="wrap catalog-page-shell">
        <PageHero
          breadcrumbLabel="Partners"
          eyebrow={PARTNERS_INTRO.eyebrow}
          title={PARTNERS_INTRO.title}
          lead={PARTNERS_INTRO.lead}
          journeyFrom="partners"
        />
        <PartnersHub />
        <section className="catalog-cta-band partners-cta-band reveal">
          <h2>Browse the full catalog</h2>
          <p>Every partner brand — published specs and IFU downloads.</p>
          <Link href="/products" className="md-btn md-btn-primary">
            View products <Arrow />
          </Link>
        </section>
      </div>
    </div>
  );
}
