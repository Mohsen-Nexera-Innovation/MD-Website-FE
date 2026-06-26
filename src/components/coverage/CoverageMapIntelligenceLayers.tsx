'use client';

import { useMemo } from 'react';
import {
  COVERAGE_CITIES,
  COVERAGE_HUB_ID,
  type CoverageCity,
} from '@/content/coverageCities';
import { nodePositionFor } from '@/content/coverageMapLayout';
import { mapPercentToSvg } from '@/content/egyptGeo';

type CoverageMapNetworkProps = {
  uid: string;
  selectedId: string | null;
  highlightSet: Set<string> | null;
  reduced?: boolean;
  /** Quieter spokes for homepage night map. */
  quiet?: boolean;
};

function hubPoint() {
  const hub = COVERAGE_CITIES.find((c) => c.id === COVERAGE_HUB_ID);
  if (!hub) return { x: 0, y: 0 };
  const pos = nodePositionFor(hub);
  return mapPercentToSvg(pos.mapX, pos.mapY);
}

function cityPoint(city: CoverageCity) {
  const pos = nodePositionFor(city);
  return mapPercentToSvg(pos.mapX, pos.mapY);
}

/** Animated hub spokes — quiet mode shows a single route pulse when a city is selected. */
export function CoverageMapNetwork({
  uid,
  selectedId,
  highlightSet,
  reduced = false,
  quiet = false,
}: CoverageMapNetworkProps) {
  const hub = hubPoint();

  const spokes = useMemo(
    () =>
      COVERAGE_CITIES.filter((c) => c.id !== COVERAGE_HUB_ID).map((city) => {
        const dot = cityPoint(city);
        const isRouteTarget = selectedId === city.id;
        const isHighlighted =
          highlightSet === null || highlightSet.has(city.id) || highlightSet.has(COVERAGE_HUB_ID);
        const isRep = city.zone === 'REP_TERRITORY';
        return { city, dot, isRouteTarget, isHighlighted, isRep };
      }),
    [selectedId, highlightSet],
  );

  const routeTarget = selectedId && selectedId !== COVERAGE_HUB_ID
    ? spokes.find((s) => s.isRouteTarget)
    : undefined;

  return (
    <g
      className={[
        'coverage-map-network',
        reduced ? 'coverage-map-network--static' : '',
        quiet ? 'coverage-map-network--quiet' : '',
        routeTarget ? 'coverage-map-network--routing' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      aria-hidden
    >
      {!quiet
        ? spokes.map(({ city, dot, isRouteTarget, isHighlighted, isRep }) => (
            <line
              key={city.id}
              x1={hub.x}
              y1={hub.y}
              x2={dot.x}
              y2={dot.y}
              className={[
                'coverage-map-network-line',
                isRep ? 'coverage-map-network-line--rep' : 'coverage-map-network-line--ecom',
                isRouteTarget ? 'is-active' : '',
                !isHighlighted ? 'is-dim' : '',
              ]
                .filter(Boolean)
                .join(' ')}
              stroke={`url(#${uid}-network-grad)`}
            />
          ))
        : null}
      {routeTarget ? (
        <line
          x1={hub.x}
          y1={hub.y}
          x2={routeTarget.dot.x}
          y2={routeTarget.dot.y}
          className={[
            'coverage-map-route-line',
            routeTarget.isRep ? 'coverage-map-route-line--rep' : 'coverage-map-route-line--ecom',
          ]
            .filter(Boolean)
            .join(' ')}
          stroke={`url(#${uid}-network-grad)`}
        />
      ) : null}
      {!quiet ? (
        <>
          <circle cx={hub.x} cy={hub.y} r={18} className="coverage-map-hub-orbit coverage-map-hub-orbit--outer" />
          <circle cx={hub.x} cy={hub.y} r={12} className="coverage-map-hub-orbit coverage-map-hub-orbit--mid" />
          <circle cx={hub.x} cy={hub.y} r={7} className="coverage-map-hub-orbit coverage-map-hub-orbit--inner" />
        </>
      ) : (
        <circle cx={hub.x} cy={hub.y} r={10} className="coverage-map-hub-glow" />
      )}
    </g>
  );
}

type CoverageMapScanProps = {
  viewW: number;
  viewH: number;
  gradId: string;
  reduced?: boolean;
};

/** Vertical scan beam clipped to Egypt silhouette. */
export function CoverageMapScan({ viewW, viewH, gradId, reduced = false }: CoverageMapScanProps) {
  if (reduced) return null;

  return (
    <g className="coverage-map-scan-wrap" aria-hidden>
      <rect
        className="coverage-map-scan-beam"
        x={0}
        y={0}
        width={viewW}
        height={viewH * 0.08}
        fill={`url(#${gradId})`}
      />
    </g>
  );
}

type CoverageMapHudProps = {
  selected: CoverageCity | undefined;
  reduced?: boolean;
};

/** Glass HUD overlay — coverage intelligence readout. */
export function CoverageMapHud({ selected, reduced = false }: CoverageMapHudProps) {
  const hubCount = COVERAGE_CITIES.length;
  const repCount = COVERAGE_CITIES.filter((c) => c.zone === 'REP_TERRITORY').length;

  return (
    <div className={`coverage-map-hud${reduced ? ' coverage-map-hud--static' : ''}`} aria-hidden>
      <div className="coverage-map-hud-top">
        <span className="coverage-map-hud-badge">
          <span className="coverage-map-hud-pulse" />
          Coverage intelligence
        </span>
        <span className="coverage-map-hud-sync">Live sync</span>
      </div>
      <div className="coverage-map-hud-stats">
        <span><strong>27</strong> governorates</span>
        <span className="coverage-map-hud-sep">·</span>
        <span><strong>{hubCount}</strong> hubs</span>
        <span className="coverage-map-hud-sep">·</span>
        <span><strong>{repCount}</strong> field reps</span>
      </div>
      {selected ? (
        <div className="coverage-map-hud-node">
          <span className="coverage-map-hud-node-label">Active node</span>
          <span className="coverage-map-hud-node-value">{selected.name.toUpperCase()}</span>
        </div>
      ) : (
        <p className="coverage-map-hud-hint">Select a city pin to inspect territory routing</p>
      )}
    </div>
  );
}
