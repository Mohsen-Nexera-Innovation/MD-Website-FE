'use client';

import { useCallback, useEffect, useRef } from 'react';
import { JOURNEY_STEPS } from '@/content/home';

/** Sections with dark backgrounds — spine flips to light neutrals over these. */
const DARK_SECTIONS = new Set<string>(['authority', 'contact']);

/** Left vertical story-spine — scroll fill, active dot, click-to-scroll, tone-aware color. */
export default function Spine() {
  const fillRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);

  const scrollToStep = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const sc = doc.scrollTop / (doc.scrollHeight - doc.clientHeight) || 0;
      if (fillRef.current) fillRef.current.style.height = `${sc * 100}%`;

      const vh = window.innerHeight;
      const centerY = vh / 2;
      let toneDark = false;

      navRef.current?.querySelectorAll<HTMLButtonElement>('button').forEach((btn) => {
        const id = btn.dataset.target?.replace('#', '') ?? '';
        const tgt = id ? document.getElementById(id) : null;
        if (!tgt) return;
        const r = tgt.getBoundingClientRect();
        const isOn = r.top < vh * 0.5 && r.bottom > vh * 0.4;
        btn.classList.toggle('on', isOn);
        btn.setAttribute('aria-current', isOn ? 'step' : 'false');
      });

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
          aria-current="false"
          onClick={() => scrollToStep(step.id)}
        />
      ))}
    </nav>
  );
}
