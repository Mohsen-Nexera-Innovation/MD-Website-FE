'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

type GlobeHtmlOverlayOptions = {
  anchorRef: React.RefObject<THREE.Group | null>;
  children: ReactNode;
  distanceFactor?: number;
  portal?: React.RefObject<HTMLElement | null>;
};

function objectScale(el: THREE.Object3D, camera: THREE.Camera) {
  if (camera instanceof THREE.OrthographicCamera) return camera.zoom;
  if (camera instanceof THREE.PerspectiveCamera) {
    const objectPos = new THREE.Vector3().setFromMatrixPosition(el.matrixWorld);
    const cameraPos = new THREE.Vector3().setFromMatrixPosition(camera.matrixWorld);
    const vFOV = (camera.fov * Math.PI) / 180;
    const dist = objectPos.distanceTo(cameraPos);
    return 1 / (2 * Math.tan(vFOV / 2) * dist);
  }
  return 1;
}

function resolvePortalTarget(
  gl: THREE.WebGLRenderer,
  portal?: React.RefObject<HTMLElement | null>,
) {
  if (portal?.current) return portal.current;
  const wrap = gl.domElement.closest('.hero-globe-canvas-wrap');
  if (wrap instanceof HTMLElement) return wrap;
  const parent = gl.domElement.parentElement;
  if (parent instanceof HTMLElement) return parent;
  return gl.domElement;
}

/**
 * Portals DOM content to a screen-aligned overlay, positioned each frame from a
 * 3D anchor. Replaces drei `Html`, which fails to mount under R3F 9.
 */
export function useGlobeHtmlOverlay({
  anchorRef,
  children,
  distanceFactor = 8,
  portal,
}: GlobeHtmlOverlayOptions) {
  const elRef = useRef<HTMLDivElement | null>(null);
  const rootRef = useRef<Root | null>(null);
  const { camera, size, gl } = useThree();
  const worldPos = useRef(new THREE.Vector3());

  useEffect(() => {
    const el = document.createElement('div');
    el.style.cssText =
      'position:absolute;top:0;left:0;pointer-events:none;will-change:transform;transform-origin:bottom center;';
    const target = resolvePortalTarget(gl, portal);
    target.appendChild(el);
    elRef.current = el;
    const root = createRoot(el);
    rootRef.current = root;
    root.render(<>{children}</>);

    return () => {
      root.unmount();
      el.remove();
      elRef.current = null;
      rootRef.current = null;
    };
  }, [gl, portal, portal?.current]);

  useEffect(() => {
    rootRef.current?.render(<>{children}</>);
  }, [children]);

  useFrame(() => {
    const anchor = anchorRef.current;
    const el = elRef.current;
    if (!anchor || !el) return;

    anchor.updateWorldMatrix(true, false);
    anchor.getWorldPosition(worldPos.current);
    const projected = worldPos.current.clone().project(camera);

    const behind = projected.z > 1;
    el.style.display = behind ? 'none' : 'block';
    if (behind) return;

    const x = (projected.x * 0.5 + 0.5) * size.width;
    const y = (-(projected.y * 0.5) + 0.5) * size.height;
    const scale = objectScale(anchor, camera) * distanceFactor;
    const z = Math.round(200 + projected.z * 40);

    el.style.zIndex = String(z);
    el.style.transform = `translate3d(${x}px,${y}px,0) translate(-50%,-100%) scale(${scale})`;
  });
}
