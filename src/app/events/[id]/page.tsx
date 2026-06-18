import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import EventDetailView from '@/components/catalog/EventDetailView';
import { getEventById } from '@/content/events';

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const event = getEventById(id);
  if (!event) return { title: 'Event | MD Dental' };
  return {
    title: `${event.title} | MD Dental Events`,
    description: event.excerpt,
  };
}

export default async function EventDetailPage({ params }: Props) {
  const { id } = await params;
  const event = getEventById(id);
  if (!event) notFound();

  return (
    <div className="inner-page inner-page--reach inner-page--catalog">
      <div className="wrap">
        <EventDetailView event={event} />
      </div>
    </div>
  );
}
