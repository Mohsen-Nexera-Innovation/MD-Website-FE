#!/usr/bin/env node
/**
 * Copies curated assets from src/components/MD Data into public/md/
 * and writes src/content/mdMedia.generated.json
 */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const MD_DATA = path.join(ROOT, 'src/components/MD Data');
const MD_PHOTOS = path.join(MD_DATA, 'MD Photos');
const PUBLIC_MD = path.join(ROOT, 'public/md');
const OUT_JSON = path.join(ROOT, 'src/content/mdMedia.generated.json');

const IMAGE_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp']);

const BRAND_FOLDERS = {
  aditek: 'Aditek ALAA',
  bms: 'BMS ALAA',
  centrix: 'Centrix ALAA',
  heydent: 'Heydent',
  profa: 'Profa',
};

const SKIP_PRODUCT_FILES = /^(all products|all back|all-back)/i;

const STORY_YEAR_FOLDERS = {
  '2019': [],
  '2020': ['Conferences 2020'],
  '2021': ['Conferences in 2021'],
  '2022': ['Conferences in 2022'],
  '2023': ['Conferences 2023', 'Work Shop 2023'],
  '2024': ['Conferences in 2024', 'Work Shop 2024'],
};

const EVENT_ROOTS = [
  { year: 2020, folder: 'Conferences 2020' },
  { year: 2021, folder: 'Conferences in 2021' },
  { year: 2022, folder: 'Conferences in 2022' },
  { year: 2023, folder: 'Conferences 2023' },
  { year: 2023, folder: 'Work Shop 2023' },
  { year: 2024, folder: 'Conferences in 2024' },
  { year: 2024, folder: 'Work Shop 2024' },
  { year: 2025, folder: 'Work Shop 2025' },
  { year: 2025, folder: 'Conferences in 2025' },
  { year: 2026, folder: 'Work Shop 2026' },
  { year: 2026, folder: 'Conferences in 2026' },
];

function slugify(input) {
  const ascii = input
    .normalize('NFKD')
    .replace(/\p{M}/gu, '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase()
    .slice(0, 80);

  if (ascii) return ascii;

  return crypto.createHash('sha1').update(input.normalize('NFC'), 'utf8').digest('base64url').slice(0, 10);
}

function uniqueEventId(kind, year, session, usedIds) {
  let base = slugify(session);
  let id = `${kind}-${year}-${base}`;
  let suffix = 2;

  while (usedIds.has(id)) {
    id = `${kind}-${year}-${base}-${suffix}`;
    suffix += 1;
  }

  usedIds.add(id);
  return id;
}

function cleanProductName(filename) {
  return path
    .basename(filename, path.extname(filename))
    .replace(/\(\d+\)/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function copyFile(src, dest) {
  ensureDir(path.dirname(dest));
  fs.copyFileSync(src, dest);
  return dest.replace(path.join(ROOT, 'public'), '').replace(/\\/g, '/');
}

function listImages(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => IMAGE_EXT.has(path.extname(f).toLowerCase()))
    .map((f) => path.join(dir, f))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
}

function listImagesRecursive(dir) {
  if (!fs.existsSync(dir)) return [];
  const out = [];
  const walk = (current) => {
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (IMAGE_EXT.has(path.extname(entry.name).toLowerCase())) out.push(full);
    }
  };
  walk(dir);
  return out.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
}

function extractPptxMedia() {
  const pptx = path.join(MD_PHOTOS, 'Clinical cases 2026/MD Company Profile.pptx');
  const out = path.join(ROOT, '.cache/md-company-profile-pptx');
  const mediaDir = path.join(out, 'ppt/media');
  const marker = path.join(out, '.extracted');

  if (!fs.existsSync(marker)) {
    fs.rmSync(out, { recursive: true, force: true });
    ensureDir(out);
    execSync(`unzip -qo "${pptx}" "ppt/media/*" -d "${out}"`, { stdio: 'pipe' });
    fs.writeFileSync(marker, new Date().toISOString());
  }

  return mediaDir;
}

function brandWordmarkSvg(slug) {
  const labels = {
    sin: { name: 'SIN', sub: 'Dental · Brazil', color: '#0B4F8A' },
    wbt: { name: 'WBT', sub: 'Orthodontics · Korea', color: '#1A2744' },
    topglove: { name: 'TopGlove', sub: 'Malaysia', color: '#006B3F' },
  };
  const { name, sub, color } = labels[slug];
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 80" role="img" aria-label="${name}">
  <rect width="320" height="80" rx="12" fill="#ffffff"/>
  <text x="24" y="46" font-family="Arial, Helvetica, sans-serif" font-size="32" font-weight="700" fill="${color}">${name}</text>
  <text x="24" y="66" font-family="Arial, Helvetica, sans-serif" font-size="12" fill="#64748b">${sub}</text>
</svg>`;
}

function copyBrandLogos() {
  const brandsDir = path.join(PUBLIC_MD, 'brands');
  ensureDir(brandsDir);
  const pptxMedia = extractPptxMedia();

  const sources = {
    aditek: path.join(pptxMedia, 'image10.png'),
    bms: path.join(pptxMedia, 'image11.png'),
    profa: path.join(pptxMedia, 'image12.png'),
    heydent: path.join(
      MD_PHOTOS,
      'Conferences in 2025/launching event for heydent/IMG_8676.JPG',
    ),
    centrix: path.join(MD_PHOTOS, 'Centrix ALAA/SuperCure Original.png'),
  };

  const logos = {};

  for (const [slug, src] of Object.entries(sources)) {
    if (!fs.existsSync(src)) {
      console.warn(`Missing logo source for ${slug}: ${src}`);
      continue;
    }

    const dest = path.join(brandsDir, `${slug}.png`);
    copyFile(src, dest);

    if (slug === 'heydent') {
      execSync(
        `sips -c 280 520 --cropOffset 0 760 "${dest}" --out "${dest}"`,
        { stdio: 'pipe' },
      );
    }

    if (slug === 'centrix') {
      execSync(
        `sips -c 720 1417 --cropOffset 0 0 "${dest}" --out "${dest}"`,
        { stdio: 'pipe' },
      );
    }

    logos[slug] = `/md/brands/${slug}.png`;
  }

  for (const slug of ['sin', 'wbt', 'topglove']) {
    const dest = path.join(brandsDir, `${slug}.svg`);
    fs.writeFileSync(dest, brandWordmarkSvg(slug));
    logos[slug] = `/md/brands/${slug}.svg`;
  }

  return logos;
}

function copyProducts() {
  const products = [];
  const byBrandFile = {};

  for (const [brandSlug, folderName] of Object.entries(BRAND_FOLDERS)) {
    const sourceDir = path.join(MD_PHOTOS, folderName);
    if (!fs.existsSync(sourceDir)) continue;

    byBrandFile[brandSlug] = {};

    for (const src of listImages(sourceDir)) {
      const baseName = path.basename(src);
      if (SKIP_PRODUCT_FILES.test(baseName) || /back\.(png|jpeg|jpg)$/i.test(baseName)) {
        continue;
      }

      const id = `${brandSlug}-${slugify(cleanProductName(baseName))}`;
      const ext = path.extname(src).toLowerCase();
      const dest = path.join(PUBLIC_MD, 'products', brandSlug, `${slugify(cleanProductName(baseName))}${ext}`);
      const publicPath = copyFile(src, dest);

      const entry = {
        id,
        name: cleanProductName(baseName),
        brandSlug,
        sourceFile: baseName,
        image: publicPath,
        images: [publicPath],
      };

      products.push(entry);
      byBrandFile[brandSlug][baseName] = publicPath;
    }
  }

  return { products, byBrandFile };
}

function copyStoryImages() {
  const story = {};
  const pptxMedia = extractPptxMedia();
  const fallback2019 = path.join(pptxMedia, 'image1.jpeg');

  for (const [year, folders] of Object.entries(STORY_YEAR_FOLDERS)) {
    let picked = null;

    for (const folder of folders) {
      const images = listImagesRecursive(path.join(MD_PHOTOS, folder));
      if (images.length > 0) {
        picked = images[0];
        break;
      }
    }

    if (!picked && year === '2019' && fs.existsSync(fallback2019)) {
      picked = fallback2019;
    }

    if (!picked) continue;

    const ext = path.extname(picked).toLowerCase();
    const dest = path.join(PUBLIC_MD, 'story', `${year}${ext}`);
    story[year] = copyFile(picked, dest);
  }

  return story;
}

function inferEventType(parentFolder) {
  return parentFolder.toLowerCase().includes('work') ? 'WORKSHOP' : 'CONFERENCE';
}

function displayTitle(folderName, year) {
  return `${folderName.trim()} (${year})`;
}

function copyEvents() {
  const events = [];
  const usedIds = new Set();

  for (const root of EVENT_ROOTS) {
    const base = path.join(MD_PHOTOS, root.folder);
    if (!fs.existsSync(base)) continue;

    const sessions = fs
      .readdirSync(base, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => d.name);

    for (const session of sessions) {
      const sessionDir = path.join(base, session);
      const images = listImages(sessionDir);
      if (images.length === 0) continue;

      const kind = inferEventType(root.folder).toLowerCase();
      const id = uniqueEventId(kind, root.year, session, usedIds);
      const destDir = path.join(PUBLIC_MD, 'events', String(root.year), id);
      ensureDir(destDir);

      const gallery = images.slice(0, 8).map((src, i) => {
        const ext = path.extname(src).toLowerCase();
        const name = i === 0 ? `cover${ext}` : `gallery-${i}${ext}`;
        return copyFile(src, path.join(destDir, name));
      });

      const type = inferEventType(root.folder);
      events.push({
        id,
        title: displayTitle(session, root.year),
        type,
        typeLabel: type === 'WORKSHOP' ? 'Workshop' : 'Conference',
        year: root.year,
        folder: session,
        image: gallery[0],
        galleryImages: gallery,
        imageCount: images.length,
      });
    }
  }

  return events.sort((a, b) => b.year - a.year || a.title.localeCompare(b.title));
}

function main() {
  if (!fs.existsSync(MD_DATA)) {
    console.error('MD Data folder not found:', MD_DATA);
    process.exit(1);
  }

  ensureDir(PUBLIC_MD);

  const videoSrc = path.join(MD_DATA, 'Global-Trust-Dental-video.mp4');
  let video;
  if (fs.existsSync(videoSrc)) {
    video = copyFile(videoSrc, path.join(PUBLIC_MD, 'video/global-trust-dental.mp4'));
  }

  const logos = copyBrandLogos();
  const { products, byBrandFile } = copyProducts();
  const story = copyStoryImages();
  const events = copyEvents();

  fs.writeFileSync(
    OUT_JSON,
    `${JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        logos,
        video,
        products,
        productFilesByBrand: byBrandFile,
        story,
        events,
      },
      null,
      2,
    )}\n`,
  );

  console.log(
    `Synced ${Object.keys(logos).length} logos, ${products.length} products, ${Object.keys(story).length} story images, ${events.length} events → public/md/`,
  );
}

main();
