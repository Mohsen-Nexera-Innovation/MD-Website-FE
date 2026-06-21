'use client';

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';

type PartnerSliderProps = {
  label: string;
  children: ReactNode;
  autoAdvanceMs?: number;
};

export default function PartnerSlider({
  label,
  children,
  autoAdvanceMs = 4800,
}: PartnerSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [reduced, setReduced] = useState(false);
  const [paused, setPaused] = useState(false);

  const update = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  }, []);

  const scrollByStep = useCallback((dir: number) => {
    const el = trackRef.current;
    if (!el) return;
    const slide = el.querySelector<HTMLElement>('.partner-slider-slide');
    const step = slide ? slide.offsetWidth + 16 : 280;
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    update();
    el.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      el.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [update, children]);

  useEffect(() => {
    if (reduced || paused || !canNext) return;
    const timer = window.setInterval(() => {
      const el = trackRef.current;
      if (!el) return;
      if (el.scrollLeft >= el.scrollWidth - el.clientWidth - 8) {
        el.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        scrollByStep(1);
      }
    }, autoAdvanceMs);
    return () => window.clearInterval(timer);
  }, [reduced, paused, canNext, autoAdvanceMs, scrollByStep]);

  return (
    <div
      className="partner-slider"
      aria-label={label}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="partner-slider-controls">
        <button
          type="button"
          className="partner-slider-arrow partner-slider-arrow--prev"
          aria-label="Previous partners"
          disabled={!canPrev}
          onClick={() => scrollByStep(-1)}
        >
          <span aria-hidden>‹</span>
        </button>
        <button
          type="button"
          className="partner-slider-arrow partner-slider-arrow--next"
          aria-label="Next partners"
          disabled={!canNext}
          onClick={() => scrollByStep(1)}
        >
          <span aria-hidden>›</span>
        </button>
      </div>
      <div ref={trackRef} className="partner-slider-track">
        {children}
      </div>
    </div>
  );
}
