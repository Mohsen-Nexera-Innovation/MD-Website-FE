'use client';

import dynamic from 'next/dynamic';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import {
  GLOBE_STOPS,
  GLOBE_TRAVEL_SEC,
  stopHoldMs,
  type GlobeStop,
} from '@/content/heroGlobeStops';
import HeroAtmosphereFallback from '@/components/journey/HeroAtmosphereFallback';
import GlobeErrorBoundary from '@/components/journey/GlobeErrorBoundary';

const HeroGlobeCanvas = dynamic(() => import('@/components/journey/HeroGlobeCanvas'), {
  ssr: false,
  loading: () => null,
});

type HeroGlobeJourneyProps = {
  reduced: boolean;
  pauseRootId?: string;
  /** Stops to tour. Defaults to the full hero→Egypt journey. */
  stops?: readonly GlobeStop[];
  /** When set, the globe follows this index instead of auto-advancing. */
  controlledIndex?: number;
  /** Hide the floating HUD label (e.g. when an external gallery shows it). */
  showHud?: boolean;
  /** Multiplier on the globe scale (1 = default framing). */
  zoom?: number;
  /**
   * `backdrop` (default) paints the dark space atmosphere behind the Earth.
   * `card` drops the atmosphere + stars so the Earth floats on a transparent
   * canvas that blends with whatever sits behind it (e.g. the gallery card).
   */
  variant?: 'backdrop' | 'card';
};

function hasWebGL() {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    return Boolean(
      canvas.getContext('webgl2') ?? canvas.getContext('webgl') ?? canvas.getContext('experimental-webgl'),
    );
  } catch {
    return false;
  }
}

/** Live 3D Earth when WebGL is available; CSS atmosphere always paints first. */
export default function HeroGlobeJourney({
  reduced,
  pauseRootId = 'authority',
  stops = GLOBE_STOPS,
  controlledIndex,
  showHud = true,
  zoom = 1,
  variant = 'backdrop',
}: HeroGlobeJourneyProps) {
  const isCard = variant === 'card';
  const controlled = controlledIndex != null;
  const [stopIndex, setStopIndex] = useState(0);
  const [prevStopIndex, setPrevStopIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [routing, setRouting] = useState(false);
  const [useGlobe, setUseGlobe] = useState(false);
  const stop: GlobeStop = stops[stopIndex] ?? stops[0];

  useEffect(() => {
    if (reduced) {
      setUseGlobe(false);
      return;
    }

    let cancelled = false;
    const failTimer = window.setTimeout(() => {
      if (!cancelled) setUseGlobe(false);
    }, 8000);

    (async () => {
      const webgl = hasWebGL();
      if (cancelled) return;
      window.clearTimeout(failTimer);
      setUseGlobe(webgl);
    })();

    return () => {
      cancelled = true;
      window.clearTimeout(failTimer);
    };
  }, [reduced]);

  useEffect(() => {
    if (reduced) return;

    const root = document.getElementById(pauseRootId);
    if (!root) return;

    const io = new IntersectionObserver(
      ([entry]) => setPaused(!entry.isIntersecting),
      { threshold: 0.05, rootMargin: '80px 0px' },
    );
    io.observe(root);
    return () => io.disconnect();
  }, [reduced, pauseRootId]);

  useEffect(() => {
    if (prevStopIndex === stopIndex) return;
    setRouting(true);
    const t = window.setTimeout(() => setRouting(false), GLOBE_TRAVEL_SEC * 1000);
    return () => window.clearTimeout(t);
  }, [stopIndex, prevStopIndex]);

  // Controlled mode: follow the external index, tracking the previous one so the
  // route arc animates from the prior country to the new one.
  useEffect(() => {
    if (!controlled) return;
    setStopIndex((prev) => {
      if (prev === controlledIndex) return prev;
      setPrevStopIndex(prev);
      return controlledIndex as number;
    });
  }, [controlled, controlledIndex]);

  useEffect(() => {
    if (controlled || reduced || paused || !useGlobe) return;

    const hold = stopHoldMs(stops[stopIndex]);
    const delay =
      stopIndex === 0 && prevStopIndex === 0 ? hold : GLOBE_TRAVEL_SEC * 1000 + hold;

    const timer = window.setTimeout(() => {
      const next = (stopIndex + 1) % stops.length;
      setPrevStopIndex(stopIndex);
      setStopIndex(next);
    }, delay);

    return () => window.clearTimeout(timer);
  }, [stopIndex, prevStopIndex, reduced, paused, useGlobe, controlled, stops]);

  if (reduced) {
    // On the card the dark atmosphere would clash with the light backdrop, so
    // show a simple transparent static globe instead.
    if (isCard) {
      return (
        <div className="hero-globe-bg hero-globe-bg--card hero-globe-bg--fallback" aria-hidden>
          <div className="partner-globe-static" />
        </div>
      );
    }
    return (
      <div className="hero-globe-bg hero-globe-bg--poster hero-globe-bg--fallback" aria-hidden>
        <HeroAtmosphereFallback />
      </div>
    );
  }

  return (
    <div className={`hero-globe-bg${isCard ? ' hero-globe-bg--card' : ''}`}>
      {isCard ? null : <HeroAtmosphereFallback />}

      {useGlobe ? (
        <GlobeErrorBoundary
          fallback={null}
          onError={() => setUseGlobe(false)}
        >
          <div className="hero-globe-canvas-wrap">
            <HeroGlobeCanvas
              stopIndex={stopIndex}
              prevStopIndex={prevStopIndex}
              paused={paused}
              stops={stops}
              zoom={zoom}
              transparent={isCard}
            />
          </div>
        </GlobeErrorBoundary>
      ) : null}

      {useGlobe && showHud ? (
        <AnimatePresence mode="wait">
          <motion.div
            key={stop.id}
            className="hero-globe-hud"
            data-phase={stop.phase}
            initial={{ opacity: 0, y: 14, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="hero-globe-hud-phase">
              {stop.phase === 'global' ? 'Global partners' : 'Egypt reach'}
            </span>
            <strong className="hero-globe-hud-name">{stop.name}</strong>
            {stop.subtitle && <span className="hero-globe-hud-sub">{stop.subtitle}</span>}
            {stop.phase === 'egypt' && stop.id === 'egypt' && (
              <span className="hero-globe-hud-coverage">Zooming into nationwide coverage</span>
            )}
            <span className="hero-globe-hud-route" aria-hidden>
              {routing ? 'Routing…' : 'Arrived'}
            </span>
          </motion.div>
        </AnimatePresence>
      ) : null}
    </div>
  );
}
