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
      setState(next);
      document.body.setAttribute('data-logo-state', next);
    };

    let raf = 0;

    const update = () => {
      measureDock();

      const heroHeight = heroSection.offsetHeight;
      const range = Math.max(heroHeight * DOCK_RANGE, 140);
      const raw = clamp(window.scrollY / range, 0, 1);

      if (reduceMotionRef.current) {
        if (raw >= 1) {
          applyBodyState('docked');
          setFloatStyle(null);
        } else {
          applyBodyState('rest');
          setFloatStyle(null);
        }
        return;
      }

      if (raw >= 1) {
        applyBodyState('docked');
        setFloatStyle(null);
        return;
      }

      if (raw <= 0.001) {
        measureRest();
        applyBodyState('rest');
        setFloatStyle(null);
        return;
      }

      applyBodyState('floating');

      const t = smoothstep(raw);
      const { left: rLeft, top: rTop, width: rWidth, height: rHeight } = restRef.current;
      const { left: dLeft, top: dTop, width: dWidth, height: dHeight } = dockRef.current;

      const heroTopNow = rTop - window.scrollY;
      const left = rLeft + (dLeft - rLeft) * t;
      const top = heroTopNow + (dTop - heroTopNow) * t;
      const scale = 1 + (dHeight / rHeight - 1) * t;
      const fadeOut = clamp((t - 0.88) / 0.12, 0, 1);

      setFloatStyle({
        left,
        top,
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
        opacity: 1 - fadeOut,
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

  if (!isHome || state !== 'floating' || !floatStyle) return null;

  return (
    <Link
      href="/"
      className="hero-logo-float"
      style={floatStyle}
      aria-label="MD Dental home"
    >
      <MdLogo variant="light" className="hero-md-logo" />
    </Link>
  );
}
