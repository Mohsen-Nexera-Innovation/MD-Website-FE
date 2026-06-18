import Image from 'next/image';
import Link from 'next/link';
import type { PathValueCard, PathValueIcon } from '@/content/pathCards';
import Arrow from '@/components/journey/Arrow';

type PathValueCardsProps = {
  cards: readonly PathValueCard[];
};

function ValueIcon({ icon }: { icon: PathValueIcon }) {
  if (icon === 'education') {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <path d="M22 10v6M2 10l10-5 10 5-10 5-10-5z" />
        <path d="M6 12v5c0 1.1 2.7 3 6 3s6-1.9 6-3v-5" />
      </svg>
    );
  }
  if (icon === 'support') {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <path d="M9 18h6" />
        <path d="M10 22h4" />
        <path d="M12 2a7 7 0 0 1 4 12.7V17H8v-2.3A7 7 0 0 1 12 2z" />
      </svg>
    );
  }
  if (icon === 'partnership') {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <path d="M7 11v2a3 3 0 0 0 6 0v-2" />
        <path d="M5 11V9a5 5 0 0 1 10 0v2" />
        <path d="M12 17v4" />
        <path d="M8 21h8" />
      </svg>
    );
  }
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M7 7h.01M7 12h.01M7 17h.01M12 12h5M12 7h5M12 17h5" />
    </svg>
  );
}

export default function PathValueCards({ cards }: PathValueCardsProps) {
  return (
    <div className="path-value-grid build-group">
      {cards.map((card, index) => (
        <Link
          key={card.id}
          href={card.href}
          className="path-value-card build reveal"
          style={{ ['--path-i' as string]: index }}
        >
          <div className="path-value-art">
            <Image
              src={card.image}
              alt={card.imageAlt}
              fill
              sizes="(max-width: 640px) 50vw, 25vw"
              className="path-value-img"
              priority={index < 2}
            />
            <span className="path-value-scrim" aria-hidden />
            <span className="path-value-shimmer" aria-hidden />
            <span className="path-value-glow" aria-hidden />
            <span className="path-value-icon" aria-hidden>
              <ValueIcon icon={card.icon} />
            </span>
          </div>
          <div className="path-value-body">
            <h3>{card.title}</h3>
            <p>{card.description}</p>
            <span className="path-value-go">
              Explore <Arrow />
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
