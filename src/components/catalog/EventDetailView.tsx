import Link from 'next/link';
import Image from 'next/image';
import type { CatalogEvent } from '@/content/events';
import { formatEventDate, isEventPast } from '@/content/events';
import { getRelatedArticles } from '@/content/articles';
import { getRelatedProducts } from '@/content/products';
import ProductCard from '@/components/ui/ProductCard';
import ArticleCard from '@/components/ui/ArticleCard';

type EventDetailViewProps = {
  event: CatalogEvent;
};

export default function EventDetailView({ event }: EventDetailViewProps) {
  const past = isEventPast(event);
  const relatedProducts = getRelatedProducts(event.relatedProductIds);
  const relatedArticles = getRelatedArticles(event.relatedArticleSlugs);

  return (
    <div className="event-detail reveal">
      <nav className="inner-breadcrumb event-detail-breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden>/</span>
        <Link href="/events">Events</Link>
        <span aria-hidden>/</span>
        <span>{event.title}</span>
      </nav>

      <div className="event-detail-hero">
        <div className="event-detail-media">
          <Image
            src={event.image}
            alt={event.imageAlt}
            width={720}
            height={400}
            className="event-detail-img"
            priority
            sizes="(max-width: 900px) 100vw, 520px"
          />
        </div>
        <header className="event-detail-header">
        <span className={`tag event-type-${event.type.toLowerCase()}`}>{event.typeLabel}</span>
        <h1>{event.title}</h1>
        <div className="event-detail-meta">
          <span>{formatEventDate(event.startDate)}</span>
          <span>{event.timeLabel}</span>
          <span>{event.isVirtual ? 'Virtual (Online)' : event.location}</span>
          {event.capacity ? <span>Capacity: {event.capacity}</span> : null}
        </div>
        <p className="event-detail-excerpt">{event.excerpt}</p>

        {!past && event.status === 'OPEN' && event.registrationUrl ? (
          <a href={event.registrationUrl} className="md-btn md-btn-primary" target="_blank" rel="noopener noreferrer">
            Register now
          </a>
        ) : null}
        {!past && event.status === 'CLOSED' ? (
          <button type="button" className="md-btn md-btn-disabled" disabled>Registration closed</button>
        ) : null}
        {!past && event.status === 'SOLD_OUT' ? (
          <button type="button" className="md-btn md-btn-disabled" disabled>Sold out</button>
        ) : null}
        </header>
      </div>

      <div className="event-detail-body">
        {event.description.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      {event.speakers.length > 0 ? (
        <section className="event-speakers">
          <h2>Speakers</h2>
          <ul className="event-speaker-list">
            {event.speakers.map((s) => (
              <li key={s.name}>
                <strong>{s.name}</strong>
                <span>{s.title} · {s.organization}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {past && event.recap ? (
        <section className="event-recap">
          <h2>Event recap</h2>
          <p>{event.recap}</p>
          {event.attendeeCount ? <p className="event-attendees">{event.attendeeCount} attendees</p> : null}
        </section>
      ) : null}

      {past && event.galleryImages?.length ? (
        <section className="event-gallery">
          <h2>Photos</h2>
          <div className="event-gallery-grid">
            {event.galleryImages.map((src) => (
              <div key={src} className="event-gallery-item">
                <Image src={src} alt="" width={400} height={280} className="event-gallery-img" />
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {relatedProducts.length > 0 ? (
        <section className="event-related">
          <h2>Related products</h2>
          <div className="catalog-grid catalog-grid--related">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      ) : null}

      {relatedArticles.length > 0 ? (
        <section className="event-related">
          <h2>Related articles</h2>
          <div className="catalog-grid catalog-grid--related">
            {relatedArticles.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
