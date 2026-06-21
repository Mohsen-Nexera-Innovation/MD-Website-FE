import * as THREE from 'three';

/** Prefer local 4K assets when present; CDN keeps dev from hanging on missing files. */
export const GLOBE_TEXTURE_LOCAL = [
  '/hero/globe/earth-4k.jpg',
  '/hero/globe/earth-lights-4k.jpg',
] as const;

export const GLOBE_TEXTURE_CDN = [
  'https://unpkg.com/three-globe@2.31.1/example/img/earth-blue-marble.jpg',
  'https://unpkg.com/three-globe@2.31.1/example/img/earth-night.jpg',
] as const;

export const GLOBE_TEXTURE_URLS = GLOBE_TEXTURE_CDN;

export function tuneGlobeColorTexture(texture: THREE.Texture, anisotropy: number) {
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = anisotropy;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = true;
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.needsUpdate = true;
}

export function tuneGlobeEmissiveTexture(texture: THREE.Texture, anisotropy: number) {
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = anisotropy;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = true;
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.needsUpdate = true;
}

/** Sphere segments scale with Egypt zoom for smoother silhouettes when close */
export function globeSegmentsForZoom(cityBlend: number) {
  if (cityBlend > 0.55) return 160;
  if (cityBlend > 0.15) return 128;
  return 96;
}
