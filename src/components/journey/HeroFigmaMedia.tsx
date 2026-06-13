'use client';

import Image from 'next/image';
import { HERO_SLIDE_MS, HERO_SLIDES } from '@/content/heroSlides';

type HeroFigmaMediaProps = {
  activeIndex: number;
  reduceMotion: boolean;
};

/**
 * Step-locked cinematic stills — one AI image per stepper beat.
 * All three layers stay mounted (no mount/unmount flicker); only opacity + CSS Ken Burns on active.
 */
export default function HeroFigmaMedia({ activeIndex, reduceMotion }: HeroFigmaMediaProps) {
  return (
    <div
      className="hero-figma-media"
      aria-hidden
      style={{ ['--hero-slide-ms' as string]: `${HERO_SLIDE_MS}ms` }}
    >
      <div className="hero-figma-media-inner">
        <div className="hero-figma-stills">
          {HERO_SLIDES.map((slide, index) => {
            const isActive = index === activeIndex;

            return (
              <div
                key={slide.id}
                className={`hero-figma-still${isActive ? ' is-active' : ''}${reduceMotion ? ' is-reduced' : ''}`}
                data-step={slide.id}
                aria-hidden={!isActive}
              >
                <Image
                  src={slide.image}
                  alt=""
                  fill
                  priority
                  unoptimized
                  sizes="100vw"
                  className="hero-figma-still-img"
                />
                {isActive && !reduceMotion ? (
                  <div className="hero-figma-still-cinema" aria-hidden>
                    <div className="hero-figma-still-sweep" />
                    <div className="hero-figma-still-vignette" />
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>

        <div className="hero-figma-media-scrim" />
        <div className="hero-figma-media-grain" />
      </div>
    </div>
  );
}
