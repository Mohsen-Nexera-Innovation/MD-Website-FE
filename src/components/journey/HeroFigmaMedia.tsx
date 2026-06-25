'use client';

import type { RefObject } from 'react';
import { useEffect, useRef } from 'react';
import {
  HERO_SLIDES,
  HERO_VIDEO_END_TRIM_SEC,
  HERO_VIDEO_SRC,
  HERO_VIDEO_START_SEC,
} from '@/content/heroSlides';

/**
 * Minimal control surface the hero uses to drive the stepper from the video.
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

function playableEnd(duration: number) {
  return Math.max(duration - HERO_VIDEO_END_TRIM_SEC, HERO_VIDEO_START_SEC + 0.5);
}

/**
 * Full-bleed cinematic background. Local MP4 (same footage as the original
 * YouTube hero) plays muted/looping with no player chrome. Playback time drives
 * drives the card stepper (see HeroAuthority). Reduced-motion users get a poster.
 */
export default function HeroFigmaMedia({ controllerRef, reduceMotion }: HeroFigmaMediaProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (reduceMotion) return;

    const video = videoRef.current;
    if (!video) return;

    const seekToStart = () => {
      if (Number.isFinite(video.duration)) {
        video.currentTime = Math.min(HERO_VIDEO_START_SEC, playableEnd(video.duration));
      } else {
        video.currentTime = HERO_VIDEO_START_SEC;
      }
    };

    const onLoaded = () => {
      seekToStart();
      void video.play().catch(() => {});
    };

    const onTimeUpdate = () => {
      const duration = video.duration;
      if (!duration || Number.isNaN(duration)) return;
      if (video.currentTime >= playableEnd(duration)) {
        seekToStart();
        void video.play().catch(() => {});
      }
    };

    controllerRef.current = {
      getCurrentTime: () => video.currentTime,
      getDuration: () => video.duration || 0,
      seek: (seconds: number) => {
        video.currentTime = seconds;
      },
      play: () => {
        void video.play().catch(() => {});
      },
      pause: () => video.pause(),
    };

    video.addEventListener('loadedmetadata', onLoaded);
    video.addEventListener('timeupdate', onTimeUpdate);

    if (video.readyState >= 1) onLoaded();

    return () => {
      controllerRef.current = null;
      video.removeEventListener('loadedmetadata', onLoaded);
      video.removeEventListener('timeupdate', onTimeUpdate);
      video.pause();
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
      <div className="hero-figma-media-inner hero-figma-video-wrap">
        <video
          ref={videoRef}
          className="hero-figma-video-el hero-figma-video-el--live"
          muted
          autoPlay
          playsInline
          preload="auto"
          poster={HERO_SLIDES[0].image}
          disablePictureInPicture
          controls={false}
          tabIndex={-1}
        >
          <source src={HERO_VIDEO_SRC} type="video/mp4" />
        </video>
      </div>
      <div className="hero-figma-yt-veil" />
      <div className="hero-figma-media-scrim" />
      <div className="hero-figma-media-grain" />
    </div>
  );
}
