'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'motion/react';
import HeroCoverageWaves from '@/components/journey/HeroCoverageWaves';
import HeroFigmaMedia from '@/components/journey/HeroFigmaMedia';
import MdLogo from '@/components/MdLogo';
import { HERO } from '@/content/home';
import { HERO_SLIDE_MS, HERO_SLIDES } from '@/content/heroSlides';

const N = HERO_SLIDES.length;
const EASE = [0.22, 1, 0.36, 1] as const;
const SCROLL_TRACK_VH = 52;

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

export default function HeroAuthority() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [exitProgress, setExitProgress] = useState(0);
  const [slideProgress, setSlideProgress] = useState(0);
  const slideStartRef = useRef(Date.now());
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

  useEffect(() => {
    slideStartRef.current = Date.now();
    setSlideProgress(0);
  }, [active]);

  useEffect(() => {
    if (reduceMotion) {
      setSlideProgress(0);
      return;
    }

    let raf = 0;
    const tick = () => {
      const elapsed = Date.now() - slideStartRef.current;
      setSlideProgress(Math.min(elapsed / HERO_SLIDE_MS, 1));
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, reduceMotion]);

  useEffect(() => {
    if (reduceMotion) return;

    const hero = document.getElementById('authority');
    let playing = true;

    const io = hero
      ? new IntersectionObserver(
          ([entry]) => {
            playing = entry.isIntersecting;
          },
          { threshold: 0.12 },
        )
      : null;
    if (hero) io?.observe(hero);

    const iv = window.setInterval(() => {
      if (playing && exitProgress < 0.35) setActive((a) => (a + 1) % N);
    }, HERO_SLIDE_MS);

    return () => {
      window.clearInterval(iv);
      if (hero) io?.unobserve(hero);
      io?.disconnect();
    };
  }, [reduceMotion, exitProgress, active]);

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
      const pinH = window.innerHeight - header;
      const track = Math.max(section.offsetHeight - pinH, 1);
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

  const onSelect = useCallback((index: number) => {
    setActive(index);
  }, []);

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
        <HeroFigmaMedia activeIndex={active} reduceMotion={reduceMotion} />

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
                  <span className="hero-figma-tagline">
                    {HERO.tagline.replace(' YOU', '')}{' '}
                    <span className="hero-figma-kw hero-figma-kw--gold">YOU</span>
                  </span>
                  <span className="hero-figma-headline">{HERO.headline}</span>
                </h1>

                <AnimatePresence mode="wait">
                  <motion.p
                    key={step.id}
                    className="hero-figma-lead"
                    initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
                    transition={{ duration: 0.4, ease: EASE }}
                  >
                    {step.cap}
                  </motion.p>
                </AnimatePresence>

                <div className="hero-figma-supply" aria-label="Supply chain journey">
                  {HERO.supplyChain.map((node, i) => (
                    <span key={node} className="hero-figma-supply-item">
                      {i > 0 && <span className="hero-figma-supply-arrow" aria-hidden>→</span>}
                      <span className={`hero-figma-supply-node${i === active ? ' is-active' : ''}`}>
                        {node}
                      </span>
                    </span>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={`stat-${step.id}`}
                    className="hero-figma-stat"
                    initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
                    transition={{ duration: 0.35, ease: EASE }}
                  >
                    <strong>{step.stat}</strong>
                    <span>{step.statLabel}</span>
                  </motion.div>
                </AnimatePresence>

                <div className="journey-hero-cta hero-figma-cta">
                  <Link href={HERO.ctaPrimary.href} className="md-btn md-btn-primary">
                    {HERO.ctaPrimary.label}
                  </Link>
                  <Link href={HERO.ctaSecondary.href} className="md-btn md-btn-ghost hero-figma-ghost">
                    {HERO.ctaSecondary.label}
                  </Link>
                </div>
              </div>

              <div className="hero-figma-nav" role="tablist" aria-label="Hero story beats">
                <div className="hero-figma-nav-line" aria-hidden>
                  <motion.div
                    className="hero-figma-nav-fill"
                    animate={{
                      width: `${N <= 1 ? 100 : ((active + slideProgress) / (N - 1)) * 100}%`,
                    }}
                    transition={{ duration: 0.12, ease: 'linear' }}
                  />
                </div>
                {HERO_SLIDES.map((s, i) => (
                  <button
                    key={s.id}
                    type="button"
                    role="tab"
                    aria-selected={i === active}
                    className={`hero-figma-node${i === active ? ' on' : ''}${i < active ? ' done' : ''}`}
                    onClick={() => onSelect(i)}
                  >
                    <span className="hero-figma-node-dot">{i < active ? '✓' : s.no}</span>
                    <span className="hero-figma-node-label">{s.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="hero-figma-card-ribbon" aria-hidden />
          <div className="hero-figma-card-fade" aria-hidden />
        </motion.div>
      </div>
    </section>
  );
}
