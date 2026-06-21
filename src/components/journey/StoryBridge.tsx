import type { JourneyNext } from '@/content/journey';

type StoryBridgeProps = {
  next: JourneyNext;
  isLast?: boolean;
};

export default function StoryBridge({ next, isLast }: StoryBridgeProps) {
  if (isLast) return null;

  return (
    <a href={`#${next.id}`} className="story-bridge reveal" aria-label={`Continue to ${next.label}`}>
      <span className="story-bridge-line" aria-hidden />
      <span className="story-bridge-copy">
        <small>Next chapter</small>
        <strong>{next.label}</strong>
        <span>{next.hint}</span>
      </span>
      <span className="story-bridge-arrow" aria-hidden>
        ↓
      </span>
    </a>
  );
}
