'use client';

import { useMemo, useState } from 'react';
import { getPastEvents, getUpcomingEvents } from '@/content/events';
import EventCard from '@/components/ui/EventCard';

type EventFilter = 'all' | 'upcoming' | 'past';

export default function EventsCatalog() {
  const [filter, setFilter] = useState<EventFilter>('all');

  const upcoming = getUpcomingEvents();
  const past = getPastEvents();

  const showUpcoming = filter === 'all' || filter === 'upcoming';
  const showPast = filter === 'all' || filter === 'past';

  return (
    <div className="events-catalog reveal">
      <div className="events-filter-tabs" role="tablist" aria-label="Event timeline">
        {(['all', 'upcoming', 'past'] as EventFilter[]).map((tab) => (
          <button
            key={tab}
            type="button"
            role="tab"
            aria-selected={filter === tab}
            className={`events-filter-tab${filter === tab ? ' is-active' : ''}`}
            onClick={() => setFilter(tab)}
          >
            {tab === 'all' ? 'All' : tab === 'upcoming' ? 'Upcoming' : 'Past'}
          </button>
        ))}
      </div>

      {showUpcoming ? (
        <section className="events-section">
          <h2 className="events-section-title">Upcoming</h2>
          {upcoming.length > 0 ? (
            <div className="events-list">
              {upcoming.map((e) => (
                <EventCard key={e.id} event={e} />
              ))}
            </div>
          ) : (
            <p className="events-empty-msg">No upcoming events — browse past events below.</p>
          )}
        </section>
      ) : null}

      {showPast ? (
        <section className="events-section events-section--past">
          <h2 className="events-section-title">Past events</h2>
          {past.length > 0 ? (
            <div className="events-list">
              {past.map((e) => (
                <EventCard key={e.id} event={e} />
              ))}
            </div>
          ) : (
            <p className="events-empty-msg">No past events yet.</p>
          )}
        </section>
      ) : null}
    </div>
  );
}
