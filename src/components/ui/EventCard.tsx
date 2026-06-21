import Link from 'next/link';
import Image from 'next/image';
import type { CatalogEvent } from '@/content/events';
import { formatEventDate } from '@/content/events';

type EventCardProps = {
  event: CatalogEvent;
};

function typeClass(type: CatalogEvent['type']): string {
  if (type === 'WORKSHOP') return 'event-workshop';
  if (type === 'WEBINAR') return 'event-webinar';
  return 'event-conference';
}

export default function EventCard({ event }: EventCardProps) {
  const past = event.status === 'PAST';

  return (
    <Link href={`/events/${event.id}`} className="event-card event-card--link">
      <div className="event-card-media">
        <Image
          src={event.image}
          alt={event.imageAlt}
          width={480}
          height={280}
          className="event-card-img"
          sizes="(max-width: 700px) 100vw, 200px"
        />
      </div>
      <div className="event-card-date">
        <span className="event-card-day">{formatEventDate(event.startDate)}</span>
        {event.isVirtual ? <span className="event-virtual-badge">Online</span> : null}
      </div>
      <div className="event-card-body">
        <span className={`tag ${typeClass(event.type)}`}>{event.typeLabel}</span>
        <h3>{event.title}</h3>
        <p className="event-card-excerpt">{event.excerpt}</p>
        <div className="meta">
          {event.isVirtual ? 'Virtual' : event.location}
          {past ? ' · Past event' : ''}
        </div>
      </div>
    </Link>
  );
}
