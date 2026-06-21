'use client';

/** Cairo-hub ripple waves — no silhouette; sits over the National stage slide. */
export default function HeroCoverageWaves({ reduced }: { reduced: boolean }) {
  const hub = { cx: 50, cy: 42 };

  const dots = [
    [50, 42], [44, 38], [56, 45], [38, 44], [62, 48], [48, 52], [58, 38],
    [42, 50], [54, 58], [46, 62], [52, 68], [60, 55], [36, 56], [64, 42],
    [50, 32], [45, 28], [55, 30], [40, 35], [58, 62], [48, 72],
  ] as const;

  return (
    <div className="hero-coverage-waves" aria-hidden>
      <svg className="hero-coverage-svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="coverageGlow" cx="50%" cy="42%" r="55%">
            <stop offset="0%" stopColor="#22C55E" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#3050A0" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="100" height="100" fill="rgba(0,16,80,0.35)" />

        <circle cx={hub.cx} cy={hub.cy} r="48" fill="url(#coverageGlow)" className="hero-coverage-glow" />

        {!reduced &&
          [0, 1, 2, 3].map((i) => (
            <circle
              key={i}
              cx={hub.cx}
              cy={hub.cy}
              r="4"
              className="hero-coverage-ring"
              style={{ animationDelay: `${i * 0.9}s` }}
            />
          ))}

        {dots.map(([x, y], i) => (
          <circle
            key={`${x}-${y}`}
            cx={x}
            cy={y}
            r="1.4"
            className="hero-coverage-dot"
            style={{ animationDelay: `${0.1 + i * 0.05}s` }}
          />
        ))}

        <circle cx={hub.cx} cy={hub.cy} r="2.8" className="hero-coverage-hub" />
      </svg>

      <div className="hero-coverage-label">
        <strong>27</strong>
        <span>Governorates · Cairo hub</span>
      </div>
    </div>
  );
}
