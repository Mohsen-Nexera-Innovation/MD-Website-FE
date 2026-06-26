'use client';

import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import CityCoveragePopover from '@/components/coverage/CityCoveragePopover';
import CoverageCityPanel from '@/components/coverage/CoverageCityPanel';
import {
  CoverageMapCityTooltip,
  CoverageMapMiniLegend,
} from '@/components/coverage/CoverageMapReachOverlay';
import {
  CoverageMapHud,
  CoverageMapNetwork,
  CoverageMapScan,
} from '@/components/coverage/CoverageMapIntelligenceLayers';
import {
  COVERAGE_CITIES,
  COVERAGE_HUB_ID,
  ZONE_LABELS_SHORT,
  coverageCityById,
} from '@/content/coverageCities';
import { labelLayoutFor, nodePositionFor } from '@/content/coverageMapLayout';
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
  /** Intelligence = AI-style network HUD + scan (default). Classic = prior flat map. */
  visual?: 'classic' | 'intelligence';
  /** Dark canvas for homepage reach gallery; light for coverage page. */
  surface?: 'light' | 'dark';
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
  visual = 'intelligence',
  surface = 'light',
}: EgyptCoverageMapProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const selected = coverageCityById(selectedId);
  const hovered = coverageCityById(hoveredId);
  const panelRef = useRef<HTMLDivElement>(null);
  const uid = useId().replace(/:/g, '');
  const isIntelligence = visual === 'intelligence';
  const isDark = surface === 'dark';
  const isQuietNight = isDark && layout === 'overlay';
  const isZoneFocus = Boolean(highlightZoneId);

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
    setHoveredId(null);
  }, [highlightZoneId, close]);

  useEffect(() => {
    if (layout !== 'panel' || !selectedId) return;
    const mq = window.matchMedia('(max-width: 859px)');
    if (!mq.matches) return;
    const timer = window.setTimeout(scrollToPanel, 120);
    return () => window.clearTimeout(timer);
  }, [selectedId, layout, scrollToPanel]);

  const mapBlock = (
    <div
      className={[
        'coverage-map',
        'reach-map',
        isIntelligence ? 'coverage-map--intelligence' : 'coverage-map--classic',
        isDark ? 'coverage-map--dark' : 'coverage-map--light',
        isQuietNight ? 'coverage-map--night-quiet' : '',
        isZoneFocus ? 'coverage-map--zone-focus' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="coverage-map-screen reach-map-screen">
        {isIntelligence ? <div className="coverage-map-grain" aria-hidden /> : null}
        {isIntelligence && layout === 'panel' ? (
          <CoverageMapHud selected={selected} reduced={reduced} />
        ) : null}
        {isQuietNight ? <CoverageMapMiniLegend /> : null}
        <div className="coverage-map-stage">
          <svg
            className="coverage-map-svg"
            viewBox={`0 0 ${EGYPT_VIEW_W} ${EGYPT_VIEW_H}`}
            role="img"
            aria-label="Egypt coverage map — click a city for area manager details"
            onClick={onMapClick}
          >
            <defs>
              <clipPath id={`${uid}-egypt-clip`}>
                <path d={EGYPT_OUTLINE_PATH} />
              </clipPath>
              <pattern
                id={`${uid}-grid`}
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
              {isIntelligence ? (
                <pattern
                  id={`${uid}-hex`}
                  width="20"
                  height="17.32"
                  patternUnits="userSpaceOnUse"
                  patternTransform="scale(0.9)"
                >
                  <path
                    d="M10 0 L20 5.77 L20 11.55 L10 17.32 L0 11.55 L0 5.77 Z"
                    fill="none"
                    stroke="rgba(72, 120, 220, 0.06)"
                    strokeWidth="0.45"
                  />
                </pattern>
              ) : null}
              <linearGradient id={`${uid}-sky-grad`} x1="0" y1="0" x2="0.2" y2="1">
                <stop offset="0%" stopColor="#c8e8f8" />
                <stop offset="100%" stopColor="#a8d8f0" />
              </linearGradient>
              <linearGradient id={`${uid}-land-grad`} x1="0" y1="0" x2="0.4" y2="1">
                <stop offset="0%" stopColor="#eef8fc" />
                <stop offset="55%" stopColor="#e2f2fa" />
                <stop offset="100%" stopColor="#d4eaf6" />
              </linearGradient>
              <linearGradient id={`${uid}-nile-grad`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={isDark ? 'rgba(140, 210, 255, 0.5)' : 'rgba(48, 80, 160, 0.35)'} />
                <stop offset="100%" stopColor={isDark ? 'rgba(48, 80, 160, 0.18)' : 'rgba(48, 80, 160, 0.12)'} />
              </linearGradient>
              <radialGradient id={`${uid}-city-light-warm`} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={isDark ? 'rgba(255, 220, 150, 0.55)' : 'rgba(255, 230, 170, 0.35)'} />
                <stop offset="45%" stopColor={isDark ? 'rgba(255, 190, 90, 0.18)' : 'rgba(255, 200, 120, 0.12)'} />
                <stop offset="100%" stopColor="rgba(255, 180, 80, 0)" />
              </radialGradient>
              <radialGradient id={`${uid}-city-light-cool`} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={isDark ? 'rgba(180, 220, 255, 0.42)' : 'rgba(160, 200, 255, 0.28)'} />
                <stop offset="55%" stopColor={isDark ? 'rgba(100, 160, 255, 0.12)' : 'rgba(100, 150, 255, 0.08)'} />
                <stop offset="100%" stopColor="rgba(80, 140, 255, 0)" />
              </radialGradient>
              {isIntelligence ? (
                <>
                  <linearGradient id={`${uid}-network-grad`} x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="rgba(48, 80, 160, 0.45)" />
                    <stop offset="100%" stopColor="rgba(120, 180, 255, 0.15)" />
                  </linearGradient>
                  <linearGradient id={`${uid}-scan-grad`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(120, 200, 255, 0)" />
                    <stop offset="45%" stopColor="rgba(120, 200, 255, 0.22)" />
                    <stop offset="55%" stopColor="rgba(48, 80, 160, 0.35)" />
                    <stop offset="100%" stopColor="rgba(120, 200, 255, 0)" />
                  </linearGradient>
                  <radialGradient id={`${uid}-aurora-a`} cx="35%" cy="28%" r="45%">
                    <stop offset="0%" stopColor="rgba(72, 130, 255, 0.14)" />
                    <stop offset="100%" stopColor="rgba(72, 130, 255, 0)" />
                  </radialGradient>
                  <radialGradient id={`${uid}-aurora-b`} cx="72%" cy="62%" r="38%">
                    <stop offset="0%" stopColor="rgba(235, 180, 40, 0.1)" />
                    <stop offset="100%" stopColor="rgba(235, 180, 40, 0)" />
                  </radialGradient>
                  <filter id={`${uid}-nile-glow`} x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="2.2" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </>
              ) : null}
              <radialGradient id={`${uid}-node-core`}>
                <stop offset="0%" stopColor={isDark ? '#fff4d6' : '#b8d4ff'} />
                <stop offset="45%" stopColor={isDark ? '#ffd978' : '#3050a0'} />
                <stop offset="100%" stopColor={isDark ? '#c89410' : '#203878'} />
              </radialGradient>
              <radialGradient id={`${uid}-node-hub`}>
                <stop offset="0%" stopColor="#fff8e8" />
                <stop offset="40%" stopColor="#ffe08a" />
                <stop offset="100%" stopColor="#c89410" />
              </radialGradient>
              <filter id={`${uid}-city-bloom`} x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="3.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id={`${uid}-node-glow`} x="-80%" y="-80%" width="260%" height="260%">
                <feGaussianBlur stdDeviation="2.8" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <rect
              x="0"
              y="0"
              width={EGYPT_VIEW_W}
              height={EGYPT_VIEW_H}
              fill={`url(#${uid}-sky-grad)`}
              aria-hidden
            />

            <path
              d={EGYPT_OUTLINE_PATH}
              className="coverage-map-land"
              fill={`url(#${uid}-land-grad)`}
            />
            <g clipPath={`url(#${uid}-egypt-clip)`}>
              {isIntelligence && !isQuietNight ? (
                <>
                  <rect x="0" y="0" width={EGYPT_VIEW_W} height={EGYPT_VIEW_H} fill={`url(#${uid}-aurora-a)`} />
                  <rect x="0" y="0" width={EGYPT_VIEW_W} height={EGYPT_VIEW_H} fill={`url(#${uid}-aurora-b)`} />
                  <rect x="0" y="0" width={EGYPT_VIEW_W} height={EGYPT_VIEW_H} fill={`url(#${uid}-hex)`} />
                </>
              ) : null}
              <rect x="0" y="0" width={EGYPT_VIEW_W} height={EGYPT_VIEW_H} fill={`url(#${uid}-grid)`} />
              {isIntelligence ? (
                <CoverageMapNetwork
                  uid={uid}
                  selectedId={selectedId}
                  highlightSet={highlightSet}
                  reduced={reduced}
                  quiet={isQuietNight}
                />
              ) : null}
              <path
                d={NILE_RIVER_PATH}
                className="coverage-map-nile"
                fill="none"
                stroke={`url(#${uid}-nile-grad)`}
                filter={isIntelligence ? `url(#${uid}-nile-glow)` : undefined}
              />
              {isIntelligence && !isQuietNight ? (
                <CoverageMapScan
                  viewW={EGYPT_VIEW_W}
                  viewH={EGYPT_VIEW_H}
                  gradId={`${uid}-scan-grad`}
                  reduced={reduced}
                />
              ) : null}
              {isDark ? (
                <g className="coverage-map-city-lights" aria-hidden>
                  {COVERAGE_CITIES.map((city, i) => {
                    const pos = nodePositionFor(city);
                    const pt = mapPercentToSvg(pos.mapX, pos.mapY);
                    const isHub = city.id === COVERAGE_HUB_ID;
                    const inZone = highlightSet?.has(city.id) ?? false;
                    const dimmed =
                      highlightSet !== null && !inZone && selectedId !== city.id;
                    const lightR = isHub ? 16 : city.zone === 'REP_TERRITORY' ? 11 : 8;
                    return (
                      <circle
                        key={`light-${city.id}`}
                        cx={pt.x}
                        cy={pt.y}
                        r={lightR}
                        className={[
                          'coverage-map-city-light',
                          isHub ? 'coverage-map-city-light--hub' : '',
                          inZone ? 'is-zone' : '',
                          dimmed ? 'is-dim' : '',
                        ]
                          .filter(Boolean)
                          .join(' ')}
                        fill={
                          isHub || city.zone === 'REP_TERRITORY'
                            ? `url(#${uid}-city-light-warm)`
                            : `url(#${uid}-city-light-cool)`
                        }
                        style={{ animationDelay: `${(i % 6) * 0.55}s` }}
                      />
                    );
                  })}
                </g>
              ) : null}
            </g>
            <path d={EGYPT_OUTLINE_PATH} className="coverage-map-outline" fill="none" />

            {COVERAGE_CITIES.map((city) => {
              const pos = nodePositionFor(city);
              const dot = mapPercentToSvg(pos.mapX, pos.mapY);
              const layout = labelLayoutFor(city.id);
              const labelPt = layout
                ? mapPercentToSvg(layout.labelX, layout.labelY)
                : { x: dot.x, y: dot.y + 14 };
              const anchor = layout?.anchor ?? 'middle';
              const display = SHORT_LABEL[city.name] ?? city.name;
              const isSelected = selectedId === city.id;
              const isHub = city.id === COVERAGE_HUB_ID;
              const inZone = highlightSet?.has(city.id) ?? false;
              const dimmed =
                highlightSet !== null && !inZone && !isSelected;
              const isHovered = hoveredId === city.id;
              const coreR = isHub ? 4.2 : isSelected ? 3.8 : 3.2;
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
                    inZone ? 'is-zone' : '',
                    isHovered ? 'is-hovered' : '',
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
                    onMouseEnter={() => setHoveredId(city.id)}
                    onMouseLeave={() => setHoveredId((prev) => (prev === city.id ? null : prev))}
                    onFocus={() => setHoveredId(city.id)}
                    onBlur={() => setHoveredId((prev) => (prev === city.id ? null : prev))}
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
                        <circle r={isHub ? 8 : 6.5} className="coverage-map-pulse" />
                      </g>
                    )}
                    <circle cx={dot.x} cy={dot.y} r={isHub ? 7 : 5.5} className="coverage-map-glow" />
                    <circle
                      cx={dot.x}
                      cy={dot.y}
                      r={coreR}
                      className="coverage-map-dot"
                      fill={isHub ? `url(#${uid}-node-hub)` : `url(#${uid}-node-core)`}
                      filter={isDark ? `url(#${uid}-city-bloom)` : `url(#${uid}-node-glow)`}
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

          {layout === 'overlay' && hovered && !selectedId ? (
            <CoverageMapCityTooltip
              city={hovered}
              mapX={nodePositionFor(hovered).mapX}
              mapY={nodePositionFor(hovered).mapY}
            />
          ) : null}

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
