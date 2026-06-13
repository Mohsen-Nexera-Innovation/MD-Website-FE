'use client';

type HeroJourneyWavesProps = {
  beat: number;
  reduced: boolean;
};

const STATIONS = [
  { id: 'global', num: '01', label: 'Global brands' },
  { id: 'national', num: '02', label: 'Egypt hub' },
  { id: 'trusted', num: '03', label: 'Your clinic' },
] as const;

/** Animated wave field + 3-station distribution flow — MD journey, not abstract circles. */
export default function HeroJourneyWaves({ beat, reduced }: HeroJourneyWavesProps) {
  const beatId = STATIONS[beat]?.id ?? 'global';

  return (
    <>
      {/* Full-hero wave field */}
      <div className="hero-waves-field" aria-hidden data-beat={beatId}>
        <svg className="hero-waves-svg" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="heroWaveGold" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#EBB428" stopOpacity="0" />
              <stop offset="40%" stopColor="#EBB428" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#EBB428" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="heroWaveBlue" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#90B0F0" stopOpacity="0" />
              <stop offset="50%" stopColor="#90B0F0" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#90B0F0" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="heroWaveGreen" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22C55E" stopOpacity="0" />
              <stop offset="50%" stopColor="#22C55E" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#22C55E" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="heroFlowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#90B0F0" />
              <stop offset="50%" stopColor="#EBB428" />
              <stop offset="100%" stopColor="#22C55E" />
            </linearGradient>
          </defs>

          {/* Layer 1 — deep swell */}
          <g className={reduced ? '' : 'hero-wave-drift hero-wave-drift--slow'}>
            <path
              className="hero-wave-path hero-wave-path--deep"
              d="M-120,620 C180,560 360,680 600,620 S960,560 1200,620 S1440,680 1560,620 L1560,900 L-120,900 Z"
              fill="url(#heroWaveBlue)"
            />
            <path
              className="hero-wave-path hero-wave-path--deep"
              d="M-120,620 C180,560 360,680 600,620 S960,560 1200,620 S1440,680 1560,620 L1560,900 L-120,900 Z"
              fill="url(#heroWaveBlue)"
              transform="translate(720 0)"
            />
          </g>

          {/* Layer 2 — mid ribbon tricolor */}
          <g className={reduced ? '' : 'hero-wave-drift hero-wave-drift--mid'}>
            <path
              className="hero-wave-path hero-wave-path--mid"
              d="M-80,680 C200,720 400,640 640,680 S920,740 1160,680 S1380,640 1520,680 L1520,900 L-80,900 Z"
              fill="url(#heroWaveGold)"
            />
            <path
              className="hero-wave-path hero-wave-path--mid"
              d="M-80,680 C200,720 400,640 640,680 S920,740 1160,680 S1380,640 1520,680 L1520,900 L-80,900 Z"
              fill="url(#heroWaveGreen)"
              transform="translate(640 0)"
              opacity="0.7"
            />
          </g>

          {/* Layer 3 — surface ripples across split */}
          <g className={reduced ? '' : 'hero-wave-drift hero-wave-drift--fast'}>
            <path
              className="hero-wave-path hero-wave-path--surface"
              d="M0,760 Q360,720 720,760 T1440,760 L1440,900 L0,900 Z"
              fill="rgba(235,180,40,0.08)"
            />
            <path
              className="hero-wave-path hero-wave-path--surface"
              d="M0,760 Q360,720 720,760 T1440,760 L1440,900 L0,900 Z"
              fill="rgba(235,180,40,0.08)"
              transform="translate(-480 0)"
            />
          </g>

          {/* Journey flow arc — global → hub → clinic */}
          <path
            id="heroJourneyPath"
            className="hero-journey-path"
            d="M 120 780 C 320 680, 520 720, 720 640 S 960 560, 1120 600 S 1280 680, 1320 740"
            fill="none"
            stroke="url(#heroFlowGrad)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="6 8"
            opacity="0.55"
          />
          <path
            className={`hero-journey-path-fill${reduced ? ' hero-journey-path-fill--static' : ''}`}
            d="M 120 780 C 320 680, 520 720, 720 640 S 960 560, 1120 600 S 1280 680, 1320 740"
            fill="none"
            stroke="url(#heroFlowGrad)"
            strokeWidth="3"
            strokeLinecap="round"
            pathLength={100}
            strokeDasharray={`${((beat + 1) / 3) * 100} 100`}
            style={{ transition: 'stroke-dasharray 1s cubic-bezier(0.22, 1, 0.36, 1)' }}
          />

          {!reduced && (
            <circle r="5" fill="#EBB428" className="hero-journey-pulse">
              <animateMotion
                dur="4.5s"
                repeatCount="indefinite"
                keyPoints="0;0.5;1"
                keyTimes="0;0.5;1"
                calcMode="linear"
              >
                <mpath href="#heroJourneyPath" />
              </animateMotion>
            </circle>
          )}
        </svg>
      </div>

      {/* Copy-panel journey spine */}
      <div className="hero-journey-spine" aria-hidden>
        {STATIONS.map((s, i) => (
          <div
            key={s.id}
            className={`hero-journey-station${i === beat ? ' is-active' : ''}${i < beat ? ' is-done' : ''}`}
          >
            <span className="hero-journey-station-dot">
              <span className="hero-journey-station-ring" />
            </span>
            <span className="hero-journey-station-num">{s.num}</span>
            <span className="hero-journey-station-label">{s.label}</span>
          </div>
        ))}
        <div className="hero-journey-spine-track">
          <div
            className="hero-journey-spine-fill"
            style={{ width: `${(beat / (STATIONS.length - 1)) * 100}%` }}
          />
        </div>
      </div>

      {/* Light sweep on photo beat change */}
      <div className={`hero-light-sweep${reduced ? ' hero-light-sweep--off' : ''}`} key={beatId} aria-hidden />
    </>
  );
}
