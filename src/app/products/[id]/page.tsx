import InnerPage, { InnerCta } from '@/components/InnerPage';

type Props = { params: Promise<{ id: string }> };

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  const title = id.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <InnerPage
      eyebrow="Product Spec"
      title={title}
      lead="Full specification sheet, IFU download, and Buy on MD Shop CTA — 1 click from homepage featured grid."
      journeyFrom="catalog"
    >
      <p>Spec detail template (CONTENT-005) — product schema, related articles, and shop handoff.</p>
      <InnerCta href="/register" label="Register to order" />
    </InnerPage>
  );
}
