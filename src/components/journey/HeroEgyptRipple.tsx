'use client';

import { motion } from 'motion/react';

/** Stylized Egypt silhouette + Cairo hub ripples — visible on National beat only. */
export default function HeroEgyptRipple({ reduced }: { reduced: boolean }) {
  const hub = { cx: 118, cy: 72 };

  const governorateDots = [
    [118, 72], [108, 68], [128, 78], [95, 62], [135, 85],
    [102, 88], [88, 75], [142, 95], [115, 105], [98, 115],
    [125, 118], [108, 130], [132, 140], [95, 145], [118, 155],
    [105, 168], [128, 175], [112, 190], [98, 200], [125, 205],
    [108, 220], [118, 235], [155, 55], [165, 70], [148, 42],
    [72, 55], [85, 48], [78, 68],
  ] as const;

  return (
    <motion.div
      className="hero-map-stage"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      aria-hidden
    >
      <svg className="hero-map-svg" viewBox="0 0 200 280" role="img" aria-label="Egypt coverage map">
        <defs>
          <radialGradient id="mapGlow" cx="50%" cy="30%" r="60%">
            <stop offset="0%" stopColor="#22C55E" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#3050A0" stopOpacity="0" />
          </radialGradient>
          <filter id="mapBlur">
            <feGaussianBlur stdDeviation="2" />
          </filter>
        </defs>

        {/* Egypt silhouette — simplified */}
        <path
          className="hero-map-land"
          d="M 155 18 L 172 42 L 168 58 L 175 72 L 158 88 L 148 105 L 138 118 L 132 135 L 125 155 L 118 175 L 112 195 L 108 215 L 105 235 L 98 248 L 88 252 L 82 240 L 78 220 L 75 200 L 72 178 L 68 155 L 65 130 L 62 108 L 58 88 L 55 72 L 52 58 L 48 45 L 55 32 L 68 22 L 85 18 L 102 16 L 118 14 L 135 15 Z"
        />

        <circle cx={hub.cx} cy={hub.cy} r="90" fill="url(#mapGlow)" className="hero-map-glow" />

        {!reduced &&
          [0, 1, 2, 3].map((i) => (
            <circle
              key={i}
              cx={hub.cx}
              cy={hub.cy}
              r="8"
              className="hero-map-ripple-ring"
              style={{ animationDelay: `${i * 0.85}s` }}
            />
          ))}

        {governorateDots.map(([x, y], i) => (
          <circle
            key={`${x}-${y}`}
            cx={x}
            cy={y}
            r="2.2"
            className="hero-map-dot"
            style={{ animationDelay: `${0.15 + i * 0.06}s` }}
          />
        ))}

        <circle cx={hub.cx} cy={hub.cy} r="5" className="hero-map-hub" />
        <text x={hub.cx} y={hub.cy - 10} className="hero-map-hub-label">
          Cairo hub
        </text>
      </svg>

      <div className="hero-map-stat">
        <span className="hero-map-stat-num">27</span>
        <span className="hero-map-stat-label">Governorates reached</span>
      </div>
    </motion.div>
  );
}
