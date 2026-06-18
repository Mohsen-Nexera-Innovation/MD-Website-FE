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
  cn: (
    <svg viewBox="0 0 38 24" aria-hidden className="globe-flag-svg">
      <rect width="38" height="24" fill="#de2910" />
      <g fill="#ffde00">
        <g transform="translate(7.5 7) scale(3.4)">
          <polygon points="0,-1 0.2245,-0.309 0.951,-0.309 0.3633,0.118 0.5878,0.809 0,0.382 -0.5878,0.809 -0.3633,0.118 -0.951,-0.309 -0.2245,-0.309" />
        </g>
        <g transform="translate(14.5 3.2) scale(1.1)">
          <polygon points="0,-1 0.2245,-0.309 0.951,-0.309 0.3633,0.118 0.5878,0.809 0,0.382 -0.5878,0.809 -0.3633,0.118 -0.951,-0.309 -0.2245,-0.309" />
        </g>
        <g transform="translate(16.8 5.6) scale(1.1)">
          <polygon points="0,-1 0.2245,-0.309 0.951,-0.309 0.3633,0.118 0.5878,0.809 0,0.382 -0.5878,0.809 -0.3633,0.118 -0.951,-0.309 -0.2245,-0.309" />
        </g>
        <g transform="translate(16.8 9) scale(1.1)">
          <polygon points="0,-1 0.2245,-0.309 0.951,-0.309 0.3633,0.118 0.5878,0.809 0,0.382 -0.5878,0.809 -0.3633,0.118 -0.951,-0.309 -0.2245,-0.309" />
        </g>
        <g transform="translate(14.5 11.4) scale(1.1)">
          <polygon points="0,-1 0.2245,-0.309 0.951,-0.309 0.3633,0.118 0.5878,0.809 0,0.382 -0.5878,0.809 -0.3633,0.118 -0.951,-0.309 -0.2245,-0.309" />
        </g>
      </g>
    </svg>
  ),
  kr: (
    <svg viewBox="0 0 38 24" aria-hidden className="globe-flag-svg">
      <rect width="38" height="24" fill="#fff" />
      <circle cx="19" cy="12" r="4.4" fill="#0047a0" />
      <path d="M19,7.6 a4.4,4.4 0 0,1 0,8.8 a2.2,2.2 0 0,1 0,-4.4 a2.2,2.2 0 0,0 0,-4.4" fill="#cd2e3a" />
      <g fill="#000">
        <rect x="6.2" y="4" width="4" height="0.8" />
        <rect x="6.2" y="5.4" width="4" height="0.8" />
        <rect x="6.2" y="6.8" width="4" height="0.8" />
        <rect x="27.8" y="4" width="4" height="0.8" />
        <rect x="27.8" y="5.4" width="4" height="0.8" />
        <rect x="27.8" y="6.8" width="4" height="0.8" />
        <rect x="6.2" y="16.4" width="4" height="0.8" />
        <rect x="6.2" y="17.8" width="4" height="0.8" />
        <rect x="6.2" y="19.2" width="4" height="0.8" />
        <rect x="27.8" y="16.4" width="4" height="0.8" />
        <rect x="27.8" y="17.8" width="4" height="0.8" />
        <rect x="27.8" y="19.2" width="4" height="0.8" />
      </g>
    </svg>
  ),
  it: (
    <svg viewBox="0 0 38 24" aria-hidden className="globe-flag-svg">
      <rect width="38" height="24" fill="#fff" />
      <rect width="12.67" height="24" fill="#009246" />
      <rect x="25.33" width="12.67" height="24" fill="#ce2b37" />
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
