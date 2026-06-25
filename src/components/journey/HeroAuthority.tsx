'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import HeroCoverageWaves from '@/components/journey/HeroCoverageWaves';
import HeroFigmaMedia from '@/components/journey/HeroFigmaMedia';
import type { HeroMediaController } from '@/components/journey/HeroFigmaMedia';
import MdLogo from '@/components/MdLogo';
import Typewriter from '@/components/Typewriter';
import { HERO } from '@/content/home';
import { SPECIALTIES } from '@/content/specialties';
import {
  HERO_SLIDES,
  HERO_VIDEO_END_TRIM_SEC,
  HERO_VIDEO_SEGMENTS,
  HERO_VIDEO_START_SEC,
} from '@/content/heroSlides';

// Pinned stretch: how long the hero stays sticky before it releases and the
// next section (Partners) starts scrolling up. Kept short so Partners begins
// rising early instead of after a long dead scroll.
const SCROLL_TRACK_VH = 26;
// Card exit range: the leftward card slide is mapped over a LONGER scroll span
// than the pin, so the card is still sliding off while Partners rises into
// view — the two transitions overlap instead of running back-to-back.
const EXIT_SCROLL_VH = 64;

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

/** End of the playable window, in seconds (duration minus the outro trim). */
function playableEnd(duration: number) {
  return Math.max(duration - HERO_VIDEO_END_TRIM_SEC, HERO_VIDEO_START_SEC + 1);
}

/**
 * Map a video playback time to the active stepper beat + progress within it.
 * Segments are fractions of the PLAYABLE window [start, duration − end-trim],
 * so the Global / National / Trusted nodes stay locked to the footage.
 */
function beatFromTime(time: number, duration: number) {
  if (!duration || Number.isNaN(duration)) return { index: 0, progress: 0 };
  const span = Math.max(playableEnd(duration) - HERO_VIDEO_START_SEC, 0.001);
  const local = clamp((time - HERO_VIDEO_START_SEC) / span, 0, 1);
  let index = 0;
  for (let i = 0; i < HERO_VIDEO_SEGMENTS.length; i += 1) {
    if (local >= HERO_VIDEO_SEGMENTS[i]) index = i;
  }
  const segStart = HERO_VIDEO_SEGMENTS[index];
  const segEnd = index + 1 < HERO_VIDEO_SEGMENTS.length ? HERO_VIDEO_SEGMENTS[index + 1] : 1;
  const progress = segEnd > segStart ? clamp((local - segStart) / (segEnd - segStart), 0, 1) : 0;
  return { index, progress };
}

export default function HeroAuthority() {
  const sectionRef = useRef<HTMLElement>(null);
  const controllerRef = useRef<HeroMediaController | null>(null);
  const lastLoopRef = useRef(0);
  const [active, setActive] = useState(0);
  const [exitProgress, setExitProgress] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  // The video is the master clock: a rAF loop reads the player's currentTime and
  // drives the active beat (React state, changes ~3×/loop) for accent / wave styling.
  useEffect(() => {
    let raf = 0;
    const loop = () => {
      const ctrl = controllerRef.current;
      if (ctrl) {
        const duration = ctrl.getDuration();
        if (duration && !Number.isNaN(duration)) {
          const current = ctrl.getCurrentTime();
          // Loop back to the start offset once we reach the trimmed end, so the
          // outro (last HERO_VIDEO_END_TRIM_SEC seconds) is never shown.
          const now = performance.now();
          if (current >= playableEnd(duration) && now - lastLoopRef.current > 800) {
            lastLoopRef.current = now;
            ctrl.seek(HERO_VIDEO_START_SEC);
          }
          const { index } = beatFromTime(current, duration);
          setActive(index);
        }
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Play only while the hero is on screen (and motion is allowed); pause when
  // scrolled away. Reduced-motion users get a static poster (no player).
  useEffect(() => {
    if (reduceMotion) return;
    const section = sectionRef.current;
    if (!section) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        const ctrl = controllerRef.current;
        if (!ctrl) return;
        if (entry.isIntersecting) ctrl.play();
        else ctrl.pause();
      },
      { threshold: 0.12 },
    );
    io.observe(section);

    return () => io.disconnect();
  }, [reduceMotion]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const updateExit = () => {
      if (reduceMotion) {
        setExitProgress(0);
        return;
      }

      const header = parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue('--md-header-h') || '72',
      );
      // The card slide is mapped over a fixed scroll span (EXIT_SCROLL_VH),
      // independent of the (shorter) pinned track. This lets the card keep
      // sliding off to the left while the hero has already unpinned and the
      // Partners section is scrolling up — so the two motions overlap.
      const track = Math.max((EXIT_SCROLL_VH / 100) * window.innerHeight, 1);
      // The pin sticks at `top: header`, so exit only begins once the section's
      // top reaches that line. For the first section (offsetTop ≈ 0) that point
      // is already at scrollY 0 — clamp to 0 so the card sits at rest (exit = 0)
      // at the top instead of being pre-shifted left by a header's worth.
      const start = Math.max(section.offsetTop - header, 0);
      const scrolled = clamp(window.scrollY - start, 0, track);
      setExitProgress(scrolled / track);
    };

    updateExit();
    window.addEventListener('scroll', updateExit, { passive: true });
    window.addEventListener('resize', updateExit);

    return () => {
      window.removeEventListener('scroll', updateExit);
      window.removeEventListener('resize', updateExit);
    };
  }, [reduceMotion]);

  const step = HERO_SLIDES[active];

  return (
    <section
      ref={sectionRef}
      className="journey-hero hero-figma-scroll"
      id="authority"
      data-journey-step="01"
      data-hero-beat={step.id}
      data-accent={step.accent}
      style={{
        ['--hero-exit' as string]: exitProgress,
        ['--hero-scroll-extra' as string]: `${SCROLL_TRACK_VH}vh`,
      }}
    >
      <div className="hero-figma-pin">
        <HeroFigmaMedia controllerRef={controllerRef} reduceMotion={reduceMotion} />

        {'showWaves' in step && step.showWaves && exitProgress < 0.65 ? (
          <div className="hero-figma-waves" aria-hidden>
            <HeroCoverageWaves reduced={reduceMotion} />
          </div>
        ) : null}

        <motion.div
          className="hero-figma-card"
          style={{ pointerEvents: exitProgress > 0.92 ? 'none' : undefined }}
        >
          <div className="hero-figma-card-inner">
            <div className="hero-figma-card-stack">
              <div className="hero-figma-card-body">
                <div id="hero-logo-anchor" className="hero-logo-anchor">
                  <Link href="/" className="hero-logo-link" aria-label="MD Dental home">
                    <MdLogo variant="brand" className="hero-md-logo" priority />
                  </Link>
                </div>

                <h1 id="authority-title" className="hero-figma-title">
                  <span className="hero-figma-tagline">{HERO.headlineLead}</span>
                  <span className="hero-figma-typed-line">
                    <Typewriter
                      phrases={[HERO.headlineSub]}
                      className="hero-figma-typed"
                      loop={false}
                    />
                  </span>
                </h1>

                <p className="hero-figma-lead">{HERO.lead}</p>

                <div className="hero-figma-stats" aria-label="MD Dental at a glance">
                  {HERO.stats.map((s) => (
                    <div key={s.label} className="hero-figma-statcard">
                      <strong>{s.value}</strong>
                      <span>{s.label}</span>
                    </div>
                  ))}
                </div>

                <div className="hero-figma-trust">
                  <span className="hero-figma-trust-badge" aria-hidden>
                    {HERO.trust.count}
                  </span>
                  <span className="hero-figma-trust-text">
                    <strong>Trusted by {HERO.trust.count} clinics</strong>
                    <span>{HERO.trust.text}</span>
                  </span>
                </div>

                <div className="journey-hero-cta hero-figma-cta">
                  <Link href={HERO.ctaPrimary.href} className="md-btn md-btn-primary">
                    {HERO.ctaPrimary.label}
                  </Link>
                  <Link href={HERO.ctaSecondary.href} className="md-btn md-btn-ghost hero-figma-ghost">
                    {HERO.ctaSecondary.label}
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="hero-figma-card-ribbon" aria-hidden />
          <div className="hero-figma-card-fade" aria-hidden />
        </motion.div>

        <div className="hero-specialty-ribbon" aria-label="Dental specialties we serve">
          <div className="hero-specialty-ribbon-accent" aria-hidden />
          <div className="hero-specialty-ribbon-glow" aria-hidden />
          <div className="hero-specialty-track-wrap">
            <div className={`hero-specialty-track${reduceMotion ? ' is-static' : ''}`}>
              {[...SPECIALTIES, ...SPECIALTIES].map((s, i) => (
                <span key={`${s}-${i}`} className="hero-specialty-chip">
                  <span className="hero-specialty-chip-dot" aria-hidden />
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
