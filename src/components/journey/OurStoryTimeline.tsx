'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'motion/react';
import { STORY_INTRO, STORY_MILESTONES } from '@/content/story';

const ADVANCE_MS = 5500;
const SWIPE_THRESHOLD = 52;

const slideVariants = {
  enter: (dir: number) => ({
    opacity: 0,
    x: dir >= 0 ? 72 : -72,
    scale: 0.96,
  }),
  center: {
    opacity: 1,
    x: 0,
    scale: 1,
  },
  exit: (dir: number) => ({
    opacity: 0,
    x: dir >= 0 ? -72 : 72,
    scale: 0.96,
  }),
};

/**
 * "Our Story" — cinematic chapter carousel. One milestone at a time with
 * AI imagery, year-rail (one-tap jump), swipe/drag, arrows, and gentle auto-advance.
 */
export default function OurStoryTimeline() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const [interacting, setInteracting] = useState(false);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);

  const total = STORY_MILESTONES.length;
  const milestone = STORY_MILESTONES[active];
  const progress = (active / Math.max(total - 1, 1)) * 100;

  const goTo = useCallback((index: number) => {
    setDirection(index > active ? 1 : index < active ? -1 : 0);
    setActive(index);
  }, [active]);

  const step = useCallback((delta: number) => {
    setDirection(delta);
    setActive((prev) => (prev + delta + total) % total);
  }, [total]);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    const root = document.getElementById('story');
    if (!root) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.28 },
    );
    io.observe(root);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (reduced || interacting || !visible) return;
    const timer = window.setInterval(() => step(1), ADVANCE_MS);
    return () => window.clearInterval(timer);
  }, [reduced, interacting, visible, step]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!visible) return;
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [visible, step]);

  return (
    <section id="story" className="sec sec-story">
      <div className="wrap">
        <div className="sec-head sec-head--center reveal">
          <p className="eyebrow">{STORY_INTRO.eyebrow}</p>
          <h2>{STORY_INTRO.heading}</h2>
        </div>

        <div
          className="story-stage reveal"
          onMouseEnter={() => setInteracting(true)}
          onMouseLeave={() => setInteracting(false)}
          onFocusCapture={() => setInteracting(true)}
          onBlurCapture={() => setInteracting(false)}
        >
          <div className="story-rail" role="tablist" aria-label="Company timeline">
            <div className="story-rail-track" aria-hidden>
              <div className="story-rail-fill" style={{ width: `${progress}%` }} />
            </div>
            {STORY_MILESTONES.map((m, i) => (
              <button
                key={m.year}
                type="button"
                role="tab"
                aria-selected={i === active}
                className={`story-rail-year${i === active ? ' is-active' : ''}${i < active ? ' is-done' : ''}`}
                onClick={() => goTo(i)}
              >
                {m.year}
              </button>
            ))}
          </div>

          <div className="story-viewport">
            <button
              type="button"
              className="story-nav story-nav--prev"
              aria-label="Previous chapter"
              onClick={() => step(-1)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <div className="story-stage-card">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.article
                  key={milestone.year}
                  className="story-slide"
                  custom={direction}
                  variants={reduced ? undefined : slideVariants}
                  initial={reduced ? false : 'enter'}
                  animate="center"
                  exit={reduced ? undefined : 'exit'}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  drag={reduced ? false : 'x'}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.14}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -SWIPE_THRESHOLD || info.velocity.x < -420) step(1);
                    else if (info.offset.x > SWIPE_THRESHOLD || info.velocity.x > 420) step(-1);
                  }}
                >
                  <div className="story-slide-media">
                    <Image
                      src={milestone.image}
                      alt={milestone.imageAlt}
                      fill
                      sizes="(max-width: 900px) 96vw, 1100px"
                      className="story-slide-img"
                      priority={active === 0}
                    />
                    <div className="story-slide-shade" aria-hidden />
                    <span className="story-slide-chapter" aria-hidden>
                      {String(active + 1).padStart(2, '0')}
                    </span>
                    <span className="story-slide-year">{milestone.year}</span>
                  </div>

                  <div className="story-slide-body">
                    <h3>{milestone.title}</h3>
                    <p>{milestone.body}</p>
                    {milestone.stat && (
                      <div className="story-slide-goal">
                        <span className="story-slide-goal-val">{milestone.stat.value}</span>
                        <span className="story-slide-goal-label">{milestone.stat.label}</span>
                      </div>
                    )}
                  </div>
                </motion.article>
              </AnimatePresence>
            </div>

            <button
              type="button"
              className="story-nav story-nav--next"
              aria-label="Next chapter"
              onClick={() => step(1)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>

          <div className="story-meta" aria-live="polite">
            <span className="story-meta-count">
              Chapter {active + 1} of {total}
            </span>
            <span className="story-meta-hint">Swipe, use arrows, or tap a year</span>
          </div>
        </div>
      </div>
    </section>
  );
}
