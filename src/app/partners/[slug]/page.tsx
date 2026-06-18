import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PartnerDetailView from '@/components/catalog/PartnerDetailView';
import { getPartnerBySlug } from '@/content/partners';

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const partner = getPartnerBySlug(slug);
  if (!partner) return { title: 'Partner | MD Dental' };
  return {
    title: `${partner.name} — Exclusive in Egypt | MD Dental`,
    description: partner.excerpt,
  };
}

export default async function PartnerPage({ params }: Props) {
  const { slug } = await params;
  const partner = getPartnerBySlug(slug);
  if (!partner) notFound();

  return (
    <div className="inner-page inner-page--partners inner-page--catalog">
      <div className="wrap catalog-page-shell">
        <PartnerDetailView partner={partner} />
      </div>
    </div>
  );
}
