'use client';

type HeroGrowthBgProps = {
  reduced: boolean;
};

/**
 * Strategic growth motif — rising trajectory, milestone steps, reach pulses.
 * Aligns with "Strategically Growing for YOU" (expansion, not clinical workflow).
 */
export default function HeroGrowthBg({ reduced }: HeroGrowthBgProps) {
  return (
    <div className={`hero-growth-bg${reduced ? ' hero-growth-bg--static' : ''}`} aria-hidden>
      <svg className="hero-growth-svg" viewBox="0 0 920 560" preserveAspectRatio="xMaxYMax meet">
        <defs>
          <linearGradient id="growthStroke" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#90B0F0" stopOpacity="0.35" />
            <stop offset="55%" stopColor="#EBB428" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#EBB428" stopOpacity="1" />
          </linearGradient>
          <linearGradient id="growthFill" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3050A0" stopOpacity="0" />
            <stop offset="100%" stopColor="#EBB428" stopOpacity="0.12" />
          </linearGradient>
          <filter id="growthGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Strategic step platforms */}
        {[420, 332, 244, 156].map((y, i) => (
          <line
            key={y}
            x1={120 + i * 48}
            y1={y}
            x2={820 - i * 20}
            y2={y}
            className="hero-growth-step"
            style={{ ['--step-i' as string]: i }}
          />
        ))}

        {/* Area under the growth curve */}
        <path
          d="M 60 460 L 60 420 C 140 400, 200 360, 280 310 C 360 260, 440 210, 540 160 C 640 110, 720 70, 860 36 L 860 460 Z"
          fill="url(#growthFill)"
          className="hero-growth-area"
        />

        {/* Main growth trajectory */}
        <path
          id="growthPath"
          d="M 60 420 C 160 395, 220 350, 300 295 C 380 240, 460 185, 560 135 C 660 85, 740 55, 860 36"
          fill="none"
          stroke="url(#growthStroke)"
          strokeWidth="2.5"
          strokeLinecap="round"
          className="hero-growth-line"
        />

        {/* Milestone nodes: source → hub → reach → you */}
        {[
          { cx: 60, cy: 420, label: 'source' },
          { cx: 300, cy: 295, label: 'hub' },
          { cx: 560, cy: 135, label: 'reach' },
          { cx: 860, cy: 36, label: 'you' },
        ].map((node) => (
          <g key={node.label} className="hero-growth-node" data-node={node.label}>
            <circle cx={node.cx} cy={node.cy} r="14" className="hero-growth-node-ring" />
            <circle cx={node.cx} cy={node.cy} r="5" className="hero-growth-node-core" />
          </g>
        ))}

        {/* Reach rays from hub — nationwide expansion */}
        <g className="hero-growth-rays" transform="translate(300 295)">
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <line
              key={deg}
              x1="0"
              y1="0"
              x2={Math.cos((deg * Math.PI) / 180) * 72}
              y2={Math.sin((deg * Math.PI) / 180) * 72}
              className="hero-growth-ray"
              style={{ ['--ray-deg' as string]: deg }}
            />
          ))}
        </g>

        {!reduced && (
          <>
            <circle r="4" fill="#EBB428" filter="url(#growthGlow)" className="hero-growth-pulse">
              <animateMotion
                dur="11s"
                repeatCount="indefinite"
                path="M 60 420 C 160 395, 220 350, 300 295 C 380 240, 460 185, 560 135 C 660 85, 740 55, 860 36"
              />
            </circle>
            <circle r="3" fill="#90B0F0" opacity="0.9">
              <animateMotion
                dur="11s"
                repeatCount="indefinite"
                begin="3.6s"
                path="M 60 420 C 160 395, 220 350, 300 295 C 380 240, 460 185, 560 135 C 660 85, 740 55, 860 36"
              />
            </circle>
            <circle r="3" fill="#22C55E" opacity="0.85">
              <animateMotion
                dur="11s"
                repeatCount="indefinite"
                begin="7.2s"
                path="M 60 420 C 160 395, 220 350, 300 295 C 380 240, 460 185, 560 135 C 660 85, 740 55, 860 36"
              />
            </circle>
          </>
        )}
      </svg>

      <div className="hero-growth-orbit hero-growth-orbit--1" />
      <div className="hero-growth-orbit hero-growth-orbit--2" />
    </div>
  );
}
