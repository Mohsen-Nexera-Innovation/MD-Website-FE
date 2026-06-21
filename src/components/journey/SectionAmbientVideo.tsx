'use client';

import { useEffect, useRef } from 'react';
import { MD_CINEMATIC_POSTER, MD_DISTRIBUTION_VIDEO } from '@/content/heroMedia';

const FADE_SEC = 1.5;

type SectionAmbientVideoProps = {
  reduced: boolean;
  /** Section element id — play when intersecting, pause when off-screen */
  sectionId: string;
  src?: string;
  poster?: string;
  /** BEM block class, e.g. hero-stage-bg-video or sec-partners-video */
  blockClass?: string;
  animateEnter?: boolean;
};

/** Dual-layer ambient video — seamless loop crossfade (same as hero cinema). */
export default function SectionAmbientVideo({
  reduced,
  sectionId,
  src = MD_DISTRIBUTION_VIDEO,
  poster = MD_CINEMATIC_POSTER,
  blockClass = 'hero-stage-bg-video',
  animateEnter = true,
}: SectionAmbientVideoProps) {
  const videosRef = useRef<[HTMLVideoElement | null, HTMLVideoElement | null]>([null, null]);
  const activeRef = useRef<0 | 1>(0);
  const fadingRef = useRef(false);

  const wrapClass = [
    blockClass,
    animateEnter ? `${blockClass}--enter` : '',
  ]
    .filter(Boolean)
    .join(' ');

  const elClass = `${blockClass}-el`;

  useEffect(() => {
    if (reduced) return;

    const section = document.getElementById(sectionId);
    const [v0, v1] = videosRef.current;
    if (!v0 || !v1) return;

    const setLayer = (active: 0 | 1) => {
      activeRef.current = active;
      [v0, v1].forEach((v, i) => {
        const on = i === active;
        v.classList.toggle(`${elClass}--active`, on);
        v.classList.toggle(`${elClass}--idle`, !on);
      });
    };

    const startPrimary = async () => {
      fadingRef.current = false;
      v0.currentTime = 0;
      v1.pause();
      v1.currentTime = 0;
      setLayer(0);
      await v0.play().catch(() => {});
    };

    void startPrimary();

    const crossfade = async (from: 0 | 1) => {
      if (fadingRef.current || activeRef.current !== from) return;

      const to = (1 - from) as 0 | 1;
      const fromEl = videosRef.current[from];
      const toEl = videosRef.current[to];
      if (!fromEl || !toEl) return;

      fadingRef.current = true;
      toEl.currentTime = 0;
      setLayer(to);
      await toEl.play().catch(() => {});

      window.setTimeout(() => {
        fromEl.pause();
        fromEl.currentTime = 0;
        fadingRef.current = false;
      }, FADE_SEC * 1000 + 80);
    };

    const onTime0 = () => {
      const v = videosRef.current[0];
      if (!v?.duration || activeRef.current !== 0 || fadingRef.current) return;
      const remaining = v.duration - v.currentTime;
      if (remaining > 0 && remaining <= FADE_SEC) void crossfade(0);
    };

    const onTime1 = () => {
      const v = videosRef.current[1];
      if (!v?.duration || activeRef.current !== 1 || fadingRef.current) return;
      const remaining = v.duration - v.currentTime;
      if (remaining > 0 && remaining <= FADE_SEC) void crossfade(1);
    };

    v0.addEventListener('timeupdate', onTime0);
    v1.addEventListener('timeupdate', onTime1);

    const io = section
      ? new IntersectionObserver(
          ([entry]) => {
            const active = videosRef.current[activeRef.current];
            if (!active) return;
            if (entry.isIntersecting) void active.play().catch(() => {});
            else active.pause();
          },
          { threshold: 0.08 },
        )
      : null;
    if (section) io?.observe(section);

    return () => {
      v0.removeEventListener('timeupdate', onTime0);
      v1.removeEventListener('timeupdate', onTime1);
      if (section) io?.unobserve(section);
      io?.disconnect();
    };
  }, [reduced, sectionId, elClass]);

  if (reduced) {
    return (
      <div
        className={`${blockClass} ${blockClass}--poster`.trim()}
        style={{ backgroundImage: `url(${poster})` }}
        aria-hidden
      />
    );
  }

  return (
    <div className={wrapClass} aria-hidden>
      <video
        ref={(el) => {
          videosRef.current[0] = el;
        }}
        className={`${elClass} ${elClass}--active`}
        muted
        playsInline
        preload="metadata"
        poster={poster}
      >
        <source src={src} type="video/mp4" />
      </video>
      <video
        ref={(el) => {
          videosRef.current[1] = el;
        }}
        className={`${elClass} ${elClass}--idle`}
        muted
        playsInline
        preload="metadata"
        poster={poster}
      >
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
}
