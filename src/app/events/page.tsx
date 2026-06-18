import type { Metadata } from 'next';
import PageHero from '@/components/layout/PageHero';
import EventsCatalog from '@/components/catalog/EventsCatalog';
import { EVENTS_INTRO } from '@/content/events';

export const metadata: Metadata = {
  title: 'Events | MD Dental',
  description:
    'MD Dental workshops, webinars, and conferences across Egypt — clinical education and partner showcases.',
};

export default function EventsPage() {
  return (
    <div className="inner-page inner-page--reach inner-page--catalog">
      <div className="wrap">
        <PageHero
          breadcrumbLabel="Events"
          eyebrow={EVENTS_INTRO.eyebrow}
          title={EVENTS_INTRO.title}
          lead={EVENTS_INTRO.lead}
        />
        <EventsCatalog />
      </div>
    </div>
  );
}
