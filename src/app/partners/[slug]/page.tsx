import InnerPage, { InnerCta } from '@/components/InnerPage';
import { MANUFACTURERS } from '@/content/home';

type Props = { params: Promise<{ slug: string }> };

export default async function PartnerPage({ params }: Props) {
  const { slug } = await params;
  const partner = MANUFACTURERS.find((m) => m.slug === slug);
  const name = partner?.name ?? slug;

  return (
    <InnerPage
      eyebrow="Global Partner"
      title={`${name} — Exclusive in Egypt`}
      lead="Manufacturer showcase for VP due diligence — 1 click from the partner orbit."
      journeyFrom="partners"
    >
      <p>Partner page template (BRAND partner showcase) with certifications, product range, and MD Dental distribution story.</p>
      <InnerCta href="/products" label={`Browse ${name} products`} />
    </InnerPage>
  );
}
