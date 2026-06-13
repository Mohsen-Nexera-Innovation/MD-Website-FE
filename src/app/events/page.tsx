import Link from 'next/link';
import InnerPage from '@/components/InnerPage';
import { EVENTS_PREVIEW } from '@/content/home';

export default function EventsPage() {
  return (
    <InnerPage
      eyebrow="Community"
      title="Events"
      lead="Workshops, webinars, and conferences — proof that MD Dental is an active market leader."
      journeyFrom="proof"
    >
      <div className="g3">
        {EVENTS_PREVIEW.map((e) => (
          <Link key={e.id} href={`/events/${e.id}`} className="content-card content-card--link">
            <span className="tag">{e.type}</span>
            <h3>{e.title}</h3>
            <div className="meta">{e.date} · {e.location}</div>
          </Link>
        ))}
      </div>
    </InnerPage>
  );
}
