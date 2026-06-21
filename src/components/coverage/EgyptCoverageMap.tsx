'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import CityCoveragePopover from '@/components/coverage/CityCoveragePopover';
import CoverageCityPanel from '@/components/coverage/CoverageCityPanel';
import {
  COVERAGE_CITIES,
  COVERAGE_HUB_ID,
  ZONE_LABELS_SHORT,
  coverageCityById,
} from '@/content/coverageCities';
import { labelLayoutFor } from '@/content/coverageMapLayout';
import {
  EGYPT_OUTLINE_PATH,
  EGYPT_VIEW_H,
  EGYPT_VIEW_W,
  mapPercentToSvg,
  NILE_RIVER_PATH,
} from '@/content/egyptGeo';

const SHORT_LABEL: Record<string, string> = {
  'Sharm El-Sheikh': 'Sharm',
};

type EgyptCoverageMapProps = {
  highlightZoneId?: string;
  reduced?: boolean;
  className?: string;
  /** Panel = side detail card (coverage page). Overlay = compact float on map (homepage). */
  layout?: 'overlay' | 'panel';
};

function labelWidth(text: string) {
  return Math.max(text.length * 5.4 + 10, 28);
}

function labelRect(anchor: 'start' | 'middle' | 'end', w: number, h: number) {
  if (anchor === 'end') return { x: -w - 4, y: -h / 2 };
  if (anchor === 'start') return { x: 4, y: -h / 2 };
  return { x: -w / 2, y: -h / 2 };
}

function labelTextX(anchor: 'start' | 'middle' | 'end', w: number) {
  if (anchor === 'end') return -6;
  if (anchor === 'start') return 8;
  return 0;
}

export default function EgyptCoverageMap({
  highlightZoneId,
  reduced = false,
  className = '',
  layout = 'overlay',
}: EgyptCoverageMapProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = coverageCityById(selectedId);
  const panelRef = useRef<HTMLDivElement>(null);

  const scrollToPanel = useCallback(() => {
    panelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, []);

  const highlightSet = useMemo(() => {
    if (!highlightZoneId) return null;
    return new Set(
      COVERAGE_CITIES.filter((c) => c.zoneIds.includes(highlightZoneId)).map((c) => c.id),
    );
  }, [highlightZoneId]);

  const close = useCallback(() => setSelectedId(null), []);

  const onMarkerClick = useCallback((id: string) => {
    setSelectedId((prev) => (prev === id ? null : id));
  }, []);

  const onMapClick = useCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
      const target = e.target as SVGElement;
      const id = target.closest('[data-city-id]')?.getAttribute('data-city-id');
      if (!id) close();
    },
    [close],
  );

  useEffect(() => {
    if (!selectedId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selectedId, close]);

  useEffect(() => {
    close();
  }, [highlightZoneId, close]);

  useEffect(() => {
    if (layout !== 'panel' || !selectedId) return;
    const mq = window.matchMedia('(max-width: 859px)');
    if (!mq.matches) return;
    const timer = window.setTimeout(scrollToPanel, 120);
    return () => window.clearTimeout(timer);
  }, [selectedId, layout, scrollToPanel]);

  const mapBlock = (
    <div className={`coverage-map reach-map ${className}`.trim()}>
      <div className="coverage-map-screen reach-map-screen">
        <div className="coverage-map-stage">
          <svg
            className="coverage-map-svg"
            viewBox={`0 0 ${EGYPT_VIEW_W} ${EGYPT_VIEW_H}`}
            role="img"
            aria-label="Egypt coverage map — click a city for area manager details"
            onClick={onMapClick}
          >
            <defs>
              <clipPath id="coverage-egypt-clip">
                <path d={EGYPT_OUTLINE_PATH} />
              </clipPath>
              <pattern
                id="coverage-grid"
                width="14"
                height="14"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 14 0 L 0 0 0 14"
                  fill="none"
                  stroke="rgba(48, 80, 160, 0.07)"
                  strokeWidth="0.5"
                />
              </pattern>
              <linearGradient id="coverage-land-grad" x1="0" y1="0" x2="0.4" y2="1">
                <stop offset="0%" stopColor="#eef4fc" />
                <stop offset="100%" stopColor="#dce8f8" />
              </linearGradient>
              <linearGradient id="coverage-nile-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(48, 80, 160, 0.35)" />
                <stop offset="100%" stopColor="rgba(48, 80, 160, 0.12)" />
              </linearGradient>
              <radialGradient id="coverage-node-core">
                <stop offset="0%" stopColor="#b8d4ff" />
                <stop offset="55%" stopColor="#3050a0" />
                <stop offset="100%" stopColor="#203878" />
              </radialGradient>
              <radialGradient id="coverage-node-hub">
                <stop offset="0%" stopColor="#ffe08a" />
                <stop offset="50%" stopColor="#ebb428" />
                <stop offset="100%" stopColor="#c89410" />
              </radialGradient>
              <filter id="coverage-node-glow" x="-80%" y="-80%" width="260%" height="260%">
                <feGaussianBlur stdDeviation="2.8" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <path
              d={EGYPT_OUTLINE_PATH}
              className="coverage-map-land"
              fill="url(#coverage-land-grad)"
            />
            <g clipPath="url(#coverage-egypt-clip)">
              <rect x="0" y="0" width={EGYPT_VIEW_W} height={EGYPT_VIEW_H} fill="url(#coverage-grid)" />
              <path
                d={NILE_RIVER_PATH}
                className="coverage-map-nile"
                fill="none"
                stroke="url(#coverage-nile-grad)"
              />
            </g>
            <path d={EGYPT_OUTLINE_PATH} className="coverage-map-outline" fill="none" />

            {COVERAGE_CITIES.map((city) => {
              const dot = mapPercentToSvg(city.mapX, city.mapY);
              const layout = labelLayoutFor(city.id);
              const labelPt = layout
                ? mapPercentToSvg(layout.labelX, layout.labelY)
                : { x: dot.x, y: dot.y + 14 };
              const anchor = layout?.anchor ?? 'middle';
              const display = SHORT_LABEL[city.name] ?? city.name;
              const isSelected = selectedId === city.id;
              const isHub = city.id === COVERAGE_HUB_ID;
              const dimmed =
                highlightSet !== null && !highlightSet.has(city.id) && !isSelected;
              const coreR = isHub ? 5.5 : isSelected ? 4.8 : 4.2;
              const hitR = isHub ? 14 : 12;
              const labelH = 13;
              const labelW = labelWidth(display);
              const rect = labelRect(anchor, labelW, labelH);

              return (
                <g
                  key={city.id}
                  data-city-id={city.id}
                  className={[
                    'coverage-map-city',
                    isSelected ? 'is-selected' : '',
                    isHub ? 'is-hub' : '',
                    dimmed ? 'is-dim' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  <line
                    x1={dot.x}
                    y1={dot.y}
                    x2={labelPt.x}
                    y2={labelPt.y}
                    className="coverage-map-leader"
                  />

                  <g
                    role="button"
                    tabIndex={0}
                    className="coverage-map-marker"
                    aria-label={`${city.name} — ${isSelected ? 'close details' : 'view area manager'}`}
                    aria-pressed={isSelected}
                    onClick={(e) => {
                      e.stopPropagation();
                      onMarkerClick(city.id);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onMarkerClick(city.id);
                      }
                    }}
                  >
                    <circle cx={dot.x} cy={dot.y} r={hitR} className="coverage-map-hit" />
                    {!reduced && (
                      <g transform={`translate(${dot.x} ${dot.y})`}>
                        <circle r={isHub ? 11 : 9} className="coverage-map-pulse" />
                      </g>
                    )}
                    <circle cx={dot.x} cy={dot.y} r={isHub ? 9 : 7} className="coverage-map-glow" />
                    <circle
                      cx={dot.x}
                      cy={dot.y}
                      r={coreR}
                      className="coverage-map-dot"
                      fill={isHub ? 'url(#coverage-node-hub)' : 'url(#coverage-node-core)'}
                      filter="url(#coverage-node-glow)"
                    />
                  </g>

                  <g
                    className="coverage-map-label-group"
                    transform={`translate(${labelPt.x} ${labelPt.y})`}
                  >
                    <rect
                      x={rect.x}
                      y={rect.y}
                      width={labelW}
                      height={labelH}
                      rx={6.5}
                      className="coverage-map-label-bg"
                    />
                    <text
                      x={labelTextX(anchor, labelW)}
                      y={1}
                      textAnchor={anchor}
                      dominantBaseline="middle"
                      className="coverage-map-label"
                    >
                      {display}
                    </text>
                  </g>
                </g>
              );
            })}
          </svg>

          {layout === 'overlay' && selected && (
            <CityCoveragePopover city={selected} onClose={close} variant="overlay" />
          )}
        </div>
      </div>
    </div>
  );

  if (layout === 'panel') {
    return (
      <div className="coverage-map-layout coverage-map-layout--panel">
        <div className="coverage-map-panel-map">
          <div className="coverage-page-map-wrap coverage-page-map-wrap--panel">
            {mapBlock}
          </div>
          {selected ? (
            <div className="coverage-mobile-bar" role="status">
              <div className="coverage-mobile-bar-text">
                <strong>{selected.name}</strong>
                <span>{ZONE_LABELS_SHORT[selected.zone]}</span>
              </div>
              <button type="button" className="coverage-mobile-bar-btn" onClick={scrollToPanel}>
                View details
              </button>
            </div>
          ) : null}
        </div>
        <div ref={panelRef} id="coverage-city-panel" className="coverage-city-panel-anchor">
          <CoverageCityPanel city={selected ?? null} onClose={close} />
        </div>
      </div>
    );
  }

  return mapBlock;
}
