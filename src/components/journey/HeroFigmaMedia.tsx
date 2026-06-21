'use client';

import type { RefObject } from 'react';
import { useEffect, useRef } from 'react';
import { HERO_SLIDES, HERO_VIDEO_START_SEC, HERO_VIDEO_YT_ID } from '@/content/heroSlides';

/**
 * Minimal control surface the hero uses to drive the stepper from the video.
 * Backed by the YouTube IFrame player, but kept generic on purpose.
 */
export type HeroMediaController = {
  getCurrentTime: () => number;
  getDuration: () => number;
  seek: (seconds: number) => void;
  play: () => void;
  pause: () => void;
};

type HeroFigmaMediaProps = {
  controllerRef: RefObject<HeroMediaController | null>;
  reduceMotion: boolean;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    YT?: any;
    onYouTubeIframeAPIReady?: () => void;
  }
}

let ytApiPromise: Promise<void> | null = null;

/** Load the YouTube IFrame API once and resolve when YT.Player is available. */
function loadYouTubeApi(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve();
  if (window.YT && window.YT.Player) return Promise.resolve();
  if (ytApiPromise) return ytApiPromise;

  ytApiPromise = new Promise<void>((resolve) => {
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      prev?.();
      resolve();
    };
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.head.appendChild(tag);
  });
  return ytApiPromise;
}

/**
 * Full-bleed cinematic background. The YouTube clip plays muted/looping from
 * HERO_VIDEO_START_SEC and is cover-cropped to hide the player chrome. Its
 * playback time drives the card's stepper (see HeroAuthority), so footage and
 * the Global / National / Trusted beats stay in sync. Reduced-motion users get
 * a static poster instead of the moving video.
 */
export default function HeroFigmaMedia({ controllerRef, reduceMotion }: HeroFigmaMediaProps) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduceMotion) return;

    let cancelled = false;
    let player: any = null;

    loadYouTubeApi().then(() => {
      if (cancelled || !hostRef.current || !window.YT) return;

      player = new window.YT.Player(hostRef.current, {
        videoId: HERO_VIDEO_YT_ID,
        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 0,
          start: HERO_VIDEO_START_SEC,
          modestbranding: 1,
          rel: 0,
          playsinline: 1,
          disablekb: 1,
          fs: 0,
          iv_load_policy: 3,
          origin: window.location.origin,
        },
        events: {
          onReady: (e: any) => {
            e.target.mute();
            e.target.playVideo();
          },
          onStateChange: (e: any) => {
            // Loop back to the start offset (the `loop` param would restart at 0).
            if (e.data === window.YT.PlayerState.ENDED) {
              e.target.seekTo(HERO_VIDEO_START_SEC, true);
              e.target.playVideo();
            }
          },
        },
      });

      controllerRef.current = {
        getCurrentTime: () => player?.getCurrentTime?.() ?? 0,
        getDuration: () => player?.getDuration?.() ?? 0,
        seek: (seconds: number) => player?.seekTo?.(seconds, true),
        play: () => player?.playVideo?.(),
        pause: () => player?.pauseVideo?.(),
      };
    });

    return () => {
      cancelled = true;
      controllerRef.current = null;
      try {
        player?.destroy?.();
      } catch {
        /* player may already be gone */
      }
    };
  }, [reduceMotion, controllerRef]);

  if (reduceMotion) {
    return (
      <div className="hero-figma-media" aria-hidden>
        <div className="hero-figma-media-inner">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="hero-figma-video-el" src={HERO_SLIDES[0].image} alt="" />
        </div>
        <div className="hero-figma-yt-veil" />
        <div className="hero-figma-media-scrim" />
        <div className="hero-figma-media-grain" />
      </div>
    );
  }

  return (
    <div className="hero-figma-media" aria-hidden>
      <div className="hero-figma-media-inner hero-figma-yt-wrap">
        <div ref={hostRef} className="hero-figma-yt" />
      </div>
      {/* Sits above the player: absorbs clicks so the video can't be paused (the
          YouTube play/pause button never appears) and carries a light tint that
          lifts the card text off the footage. */}
      <div className="hero-figma-yt-veil" />
      <div className="hero-figma-media-scrim" />
      <div className="hero-figma-media-grain" />
    </div>
  );
}
