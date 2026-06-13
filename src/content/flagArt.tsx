import type { ReactNode } from 'react';
import type { GlobeStop } from '@/content/heroGlobeStops';

export type FlagCode = GlobeStop['flag'];

/** Inline SVG flags shared by the 3D globe markers and the partner gallery. */
export const FLAG_ART: Record<FlagCode, ReactNode> = {
  br: (
    <svg viewBox="0 0 38 24" aria-hidden className="globe-flag-svg">
      <rect width="38" height="24" fill="#009c3b" />
      <polygon points="19,2.5 35,12 19,21.5 3,12" fill="#ffdf00" />
      <circle cx="19" cy="12" r="5.2" fill="#002776" />
      <circle cx="19" cy="12" r="2.2" fill="#fff" opacity="0.15" />
    </svg>
  ),
  de: (
    <svg viewBox="0 0 38 24" aria-hidden className="globe-flag-svg">
      <rect width="38" height="8" fill="#000" />
      <rect y="8" width="38" height="8" fill="#dd0000" />
      <rect y="16" width="38" height="8" fill="#ffce00" />
    </svg>
  ),
  us: (
    <svg viewBox="0 0 38 24" aria-hidden className="globe-flag-svg">
      <rect width="38" height="24" fill="#b22234" />
      <rect y="2" width="38" height="2" fill="#fff" />
      <rect y="6" width="38" height="2" fill="#fff" />
      <rect y="10" width="38" height="2" fill="#fff" />
      <rect y="14" width="38" height="2" fill="#fff" />
      <rect y="18" width="38" height="2" fill="#fff" />
      <rect width="15" height="13" fill="#3c3b6e" />
      <g fill="#fff" opacity="0.85">
        <circle cx="3" cy="2.5" r="0.7" />
        <circle cx="7" cy="2.5" r="0.7" />
        <circle cx="11" cy="2.5" r="0.7" />
        <circle cx="5" cy="5" r="0.7" />
        <circle cx="9" cy="5" r="0.7" />
      </g>
    </svg>
  ),
  my: (
    <svg viewBox="0 0 38 24" aria-hidden className="globe-flag-svg">
      <rect width="38" height="24" fill="#cc0001" />
      <rect y="4" width="38" height="4" fill="#fff" />
      <rect y="12" width="38" height="4" fill="#fff" />
      <rect y="20" width="38" height="4" fill="#fff" />
      <rect width="17" height="12" fill="#010066" />
      <circle cx="9" cy="6" r="3.2" fill="#ffcc00" />
      <circle cx="10.2" cy="6" r="2.5" fill="#010066" />
    </svg>
  ),
  eg: (
    <svg viewBox="0 0 38 24" aria-hidden className="globe-flag-svg">
      <rect width="38" height="8" fill="#ce1126" />
      <rect y="8" width="38" height="8" fill="#fff" />
      <rect y="16" width="38" height="8" fill="#000" />
      <rect x="15" y="9.5" width="8" height="5" fill="#c09300" rx="0.5" />
    </svg>
  ),
};
