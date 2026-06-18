'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import MdLogo from '@/components/MdLogo';

type LogoState = 'rest' | 'floating' | 'docked';

const DOCK_RANGE = 0.38;

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function smoothstep(t: number) {
  return t * t * (3 - 2 * t);
}

function logoImageRect(anchor: HTMLElement) {
  const mark = anchor.querySelector('svg, img');
  return (mark ?? anchor).getBoundingClientRect();
}

/** Homepage only — hero logo glides into the header toolbar logo on scroll. */
export default function HeroLogoDock() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [state, setState] = useState<LogoState>('rest');
  const [floatStyle, setFloatStyle] = useState<CSSProperties | null>(null);

  const restRef = useRef({ left: 0, top: 0, width: 0, height: 0 });
  const dockRef = useRef({ left: 0, top: 0, width: 0, height: 0 });
  const reduceMotionRef = useRef(false);

  useEffect(() => {
    reduceMotionRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  useEffect(() => {
    if (!isHome) {
      document.body.classList.remove('md-home-hero');
      document.body.removeAttribute('data-logo-state');
      setState('rest');
      setFloatStyle(null);
      return;
    }

    document.body.classList.add('md-home-hero');

    const heroAnchor = document.getElementById('hero-logo-anchor');
    const headerAnchor = document.getElementById('header-logo-anchor');
    const heroSection = document.getElementById('authority');
    if (!heroAnchor || !headerAnchor || !heroSection) return;

    const measureRest = () => {
      const heroRect = logoImageRect(heroAnchor);
      restRef.current = {
        left: heroRect.left,
        top: heroRect.top + window.scrollY,
        width: heroRect.width || 200,
        height: heroRect.height || 72,
      };
    };

    const measureDock = () => {
      const headerRect = logoImageRect(headerAnchor);
      dockRef.current = {
        left: headerRect.left,
        top: headerRect.top,
        width: headerRect.width || 140,
        height: headerRect.height || 40,
      };
    };

    const applyBodyState = (next: LogoState) => {
      setState((prev) => (prev === next ? prev : next));
      document.body.setAttribute('data-logo-state', next);
    };

    // Keep the clone parked over the header dock while hidden so the very first
    // float frame has no positional jump (prevents the start-of-scroll flicker).
    const hiddenStyle = (): CSSProperties => {
      const { left, top, height } = dockRef.current;
      const { height: rHeight } = restRef.current;
      const scale = rHeight && height ? height / rHeight : 1;
      return {
        left,
        top,
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
        opacity: 0,
        ['--dock-brand-o' as string]: 0,
        ['--dock-light-o' as string]: 1,
      };
    };

    let raf = 0;

    const update = () => {
      measureDock();

      const heroHeight = heroSection.offsetHeight;
      const range = Math.max(heroHeight * DOCK_RANGE, 140);
      const raw = clamp(window.scrollY / range, 0, 1);

      if (reduceMotionRef.current) {
        applyBodyState(raw >= 1 ? 'docked' : 'rest');
        setFloatStyle({ opacity: 0 });
        return;
      }

      if (raw >= 1) {
        applyBodyState('docked');
        setFloatStyle(hiddenStyle());
        return;
      }

      if (raw <= 0.001) {
        measureRest();
        applyBodyState('rest');
        // Park the clone over the resting hero logo (brand colour) so there is
        // no colour pop the instant scrolling begins.
        const { left, top } = restRef.current;
        setFloatStyle({
          left,
          top: top - window.scrollY,
          transform: 'scale(1)',
          transformOrigin: 'top left',
          opacity: 0,
          ['--dock-brand-o' as string]: 1,
          ['--dock-light-o' as string]: 0,
        });
        return;
      }

      applyBodyState('floating');

      const t = smoothstep(raw);
      const { left: rLeft, top: rTop, height: rHeight } = restRef.current;
      const { left: dLeft, top: dTop, height: dHeight } = dockRef.current;

      const heroTopNow = rTop - window.scrollY;
      const left = rLeft + (dLeft - rLeft) * t;
      const top = heroTopNow + (dTop - heroTopNow) * t;
      const scale = rHeight ? 1 + (dHeight / rHeight - 1) * t : 1;
      // Crossfade brand → white across the first ~60% of travel so the mark
      // matches the light card at the start and the dark header at the end.
      const colorT = clamp(t * 1.7, 0, 1);
      // Brief fade only at the very end as it settles onto the header logo.
      const fadeOut = clamp((t - 0.9) / 0.1, 0, 1);

      setFloatStyle({
        left,
        top,
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
        opacity: 1 - fadeOut,
        ['--dock-brand-o' as string]: 1 - colorT,
        ['--dock-light-o' as string]: colorT,
      });
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    measureRest();
    measureDock();
    update();

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      document.body.classList.remove('md-home-hero');
      document.body.removeAttribute('data-logo-state');
    };
  }, [isHome]);

  // The clone stays mounted on the homepage (just transparent at rest/docked)
  // so React never tears it down mid-glide — that remount was a flicker source.
  if (!isHome || !floatStyle) return null;

  const interactive = state === 'floating';

  return (
    <Link
      href="/"
      className="hero-logo-float"
      style={floatStyle}
      aria-label="MD Dental home"
      aria-hidden={!interactive}
      tabIndex={interactive ? 0 : -1}
    >
      <MdLogo variant="brand" className="hero-md-logo hero-logo-dock-brand" />
      <MdLogo variant="light" className="hero-md-logo hero-logo-dock-light" />
    </Link>
  );
}
