'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import {
  REACH_HUB,
  REACH_MAP_ASSETS,
  REACH_NETWORK_CITIES,
  REACH_ZONES,
  reachCityOverlay,
  reachHubOverlay,
  type ReachCity,
  type ReachMapStyle,
} from '@/content/reachZones';

const CITY_LABEL: Record<string, string> = {
  'Sharm El-Sheikh': 'Sharm',
};

const CITY_CYCLE_MS = 2200;

type Pt = { x: number; y: number };

function arcPct(from: Pt, to: Pt) {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const len = Math.hypot(dx, dy) || 1;
  const bend = Math.min(len * 0.22, 14);
  const mx = (from.x + to.x) / 2;
  const my = (from.y + to.y) / 2;
  const cx = mx - (dy / len) * bend;
  const cy = my + (dx / len) * bend;
  return `M ${from.x} ${from.y} Q ${cx} ${cy} ${to.x} ${to.y}`;
}

function labelFor(city: ReachCity, style: ReachMapStyle) {
  const { x, y } = reachCityOverlay(city, style);
  const above = y > 42;
  const right = x > 72;
  const left = x < 22;
  return {
    x: x + (right ? -1.8 : left ? 1.8 : 0),
    y: above ? y - 3.2 : y + 3.8,
    anchor: (right ? 'end' : left ? 'start' : 'middle') as 'start' | 'middle' | 'end',
    cx: x,
    cy: y,
  };
}

type DigitalEgyptMapProps = {
  activeIndex: number;
  reduced?: boolean;
};

/**
 * National Reach map — two story-reference backgrounds crossfade per zone:
 * story-2021 "Going nationwide" logistics mesh + story-2024 iPad constellation.
 * SVG overlay adds city labels, arced routes and spotlight animation on both.
 */
export default function DigitalEgyptMap({ activeIndex, reduced = false }: DigitalEgyptMapProps) {
  const zone = REACH_ZONES[activeIndex] ?? REACH_ZONES[0];
  const mapStyle = zone.mapStyle;
  const [cityIndex, setCityIndex] = useState(0);

  useEffect(() => {
    setCityIndex(0);
  }, [activeIndex]);

  useEffect(() => {
    if (reduced || zone.cities.length <= 1) return;
    const timer = window.setInterval(() => {
      setCityIndex((prev) => (prev + 1) % zone.cities.length);
    }, CITY_CYCLE_MS);
    return () => window.clearInterval(timer);
  }, [activeIndex, reduced, zone.cities.length]);

  const spotlight = zone.cities[cityIndex] ?? zone.cities[0];
  const zoneNames = useMemo(() => new Set(zone.cities.map((c) => c.name)), [zone]);

  const hub = reachHubOverlay(mapStyle);
  const spot = reachCityOverlay(spotlight, mapStyle);
  const spotlightRoute = spotlight.name === REACH_HUB.name ? null : arcPct(hub, spot);

  const panX = (50 - spot.x) * 0.38;
  const panY = (50 - spot.y) * 0.38;

  return (
    <div className="reach-map" aria-hidden>
      <div className="reach-map-screen">
        <div
          className="reach-map-inner"
          style={{ transform: `translate(${panX}%, ${panY}%) scale(1.12)` }}
        >
          <div className="reach-map-art">
            {(Object.keys(REACH_MAP_ASSETS) as ReachMapStyle[]).map((style) => {
              const asset = REACH_MAP_ASSETS[style];
              const on = mapStyle === style;
              return (
                <Image
                  key={style}
                  src={asset.src}
                  alt=""
                  fill
                  sizes="(max-width: 720px) 100vw, 500px"
                  className={`reach-map-img reach-map-img--${style}${on ? ' is-active' : ''}`}
                  priority={style === 'nationwide'}
                />
              );
            })}

            <svg
              className="reach-map-overlay"
              viewBox="0 0 100 100"
              preserveAspectRatio="xMidYMid meet"
              role="img"
              aria-label={`Egypt coverage — ${zone.title}, spotlight on ${spotlight.name}`}
            >
              <g className="reach-map-routes reach-map-routes--zone">
                {zone.cities.map((c) => {
                  if (c.name === REACH_HUB.name || c.name === spotlight.name) return null;
                  const to = reachCityOverlay(c, mapStyle);
                  return (
                    <path
                      key={`zone-${c.name}`}
                      d={arcPct(hub, to)}
                      className={`reach-map-route reach-map-route--zone${reduced ? ' is-static' : ''}`}
                    />
                  );
                })}
              </g>

              {spotlightRoute && (
                <g className="reach-map-routes">
                  <path
                    d={spotlightRoute}
                    className={`reach-map-route reach-map-route--spot${reduced ? ' is-static' : ''}`}
                  />
                  {!reduced && (
                    <circle r="0.9" className="reach-map-traveler">
                      <animateMotion dur="1.6s" repeatCount="indefinite" path={spotlightRoute} />
                    </circle>
                  )}
                </g>
              )}

              {REACH_NETWORK_CITIES.map((city) => {
                const inZone = zoneNames.has(city.name);
                const isSpot = city.name === spotlight.name;
                const isHub = city.name === REACH_HUB.name;
                const label = labelFor(city, mapStyle);
                const display = CITY_LABEL[city.name] ?? city.name;

                return (
                  <g
                    key={city.name}
                    className={[
                      'reach-map-city',
                      inZone ? 'is-zone' : 'is-dim',
                      isSpot ? 'is-spotlight' : '',
                      isHub ? 'is-hub' : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                  >
                    {(isSpot || isHub) && (
                      <circle
                        cx={label.cx}
                        cy={label.cy}
                        r={isSpot ? 4.2 : 5}
                        className="reach-map-city-glow"
                      />
                    )}
                    {!reduced && isSpot && (
                      <circle
                        cx={label.cx}
                        cy={label.cy}
                        r={1.4}
                        className="reach-map-city-pulse"
                      />
                    )}
                    <circle
                      cx={label.cx}
                      cy={label.cy}
                      r={isHub ? 1.1 : isSpot ? 0.95 : 0.65}
                      className="reach-map-city-dot"
                    />
                    <text
                      x={label.x}
                      y={label.y}
                      textAnchor={label.anchor}
                      className="reach-map-label"
                    >
                      {display}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
