import InnerPage, { InnerCta } from '@/components/InnerPage';

type Props = { params: Promise<{ slug: string }> };

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params;
  const title = slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <InnerPage
      eyebrow="Clinical Article"
      title={title}
      lead="Rich article detail with related products and social sharing — 1 click from homepage proof section."
      journeyFrom="proof"
    >
      <p>Article body template (CONTENT-002) with related products sidebar and Buy on MD Shop links.</p>
      <InnerCta href="/products" label="Browse related products" />
    </InnerPage>
  );
}
