import InnerPage, { InnerCta } from '@/components/InnerPage';

type Props = { params: Promise<{ id: string }> };

export default async function EventDetailPage({ params }: Props) {
  const { id } = await params;
  const title = id.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <InnerPage
      eyebrow="Event Detail"
      title={title}
      lead="Event registration and calendar export — linked from homepage community preview."
      journeyFrom="proof"
    >
      <p>Event detail template (EPIC-R1-04) with registration form and location map.</p>
      <InnerCta href="/register" label="Register for events" />
    </InnerPage>
  );
}
