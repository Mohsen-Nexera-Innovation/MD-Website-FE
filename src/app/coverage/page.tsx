import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/layout/PageHero';
import CoverageMapSection from '@/components/coverage/CoverageMapSection';
import Arrow from '@/components/journey/Arrow';

export const metadata: Metadata = {
  title: 'Egypt Coverage Map | MD Dental',
  description:
    'Interactive Egypt coverage map — area managers and Bosta delivery across all MD Dental city hubs.',
};

export default function CoveragePage() {
  return (
    <div className="inner-page inner-page--reach inner-page--catalog inner-page--coverage">
      <div className="wrap">
        <PageHero
          breadcrumbLabel="Coverage Map"
          eyebrow="National Reach"
          title="Egypt coverage map"
          lead="Click a city for your area manager or Bosta delivery details."
          journeyFrom="reach"
        />
      </div>
      <CoverageMapSection />
      <div className="wrap">
        <section className="catalog-cta-band coverage-page-cta reveal">
          <h2>Explore products in your zone</h2>
          <p>Browse authentic specs from every partner brand we distribute.</p>
          <Link href="/products" className="md-btn md-btn-primary">
            View products <Arrow />
          </Link>
        </section>
      </div>
    </div>
  );
}
