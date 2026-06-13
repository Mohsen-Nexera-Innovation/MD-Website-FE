'use client';

import { useEffect, useRef } from 'react';
import { JOURNEY_STEPS } from '@/content/home';

/** Sections whose background is dark — spine flips to light neutrals over these. */
const DARK_SECTIONS = new Set<string>(['partners', 'action']);

/** Left vertical story-spine — scroll fill, active dot, hover label, tone-aware color. */
export default function Spine() {
  const fillRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const sc = doc.scrollTop / (doc.scrollHeight - doc.clientHeight) || 0;
      if (fillRef.current) fillRef.current.style.height = `${sc * 100}%`;

      const vh = window.innerHeight;
      const centerY = vh / 2;
      let toneDark = false;

      navRef.current?.querySelectorAll<HTMLButtonElement>('button').forEach((btn) => {
        const tgt = document.querySelector(btn.dataset.target ?? '');
        if (!tgt) return;
        const r = tgt.getBoundingClientRect();
        btn.classList.toggle('on', r.top < vh * 0.5 && r.bottom > vh * 0.4);
      });

      // Tone = background of whichever section sits behind the spine (viewport center).
      for (const step of JOURNEY_STEPS) {
        const el = document.getElementById(step.id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top <= centerY && r.bottom >= centerY) {
          toneDark = DARK_SECTIONS.has(step.id);
          break;
        }
      }

      navRef.current?.classList.toggle('spine--dark', toneDark);
    };

    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll);
    onScroll();
    return () => {
      removeEventListener('scroll', onScroll);
      removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <nav className="spine" ref={navRef} aria-label="Story journey">
      <div className="track" aria-hidden />
      <div className="trackfill" ref={fillRef} aria-hidden />
      {JOURNEY_STEPS.map((step) => (
        <button
          key={step.id}
          type="button"
          data-target={`#${step.id}`}
          data-label={step.label}
          aria-label={step.label}
        />
      ))}
    </nav>
  );
}
