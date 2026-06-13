# MD Dental Informative Website — UI/UX Implementation Plan

**Project:** `MD-informative-website-design`  
**Target domain:** mddental.com  
**Reference:** ODYX site architecture (Next.js, scroll journey, motion system) with **distinct** brand, journey, and palette  
**Source of truth:** `MD/MD-Project-data-and-AI-skills/` (SRS R1, BRAND/CONTENT epics)

---

## 1. Business & audience summary

**MD Dental** is Egypt's exclusive distributor for **8 global dental manufacturers** (Aditek, BMS, Heydent, SIN, Centrix, PROFA, TopGlove, WBT), serving **2,000+ dentists** across **27 governorates** with field reps + Bosta e-commerce delivery.

| Audience | Goal on site |
|----------|----------------|
| Egyptian dentists | Trust, authentic products, education, path to register/shop |
| Global manufacturer VPs | Proof of market maturity, digital ops, exclusive model |
| Med reps / students | Secondary — content and specs discovery |

**Differentiator vs ODYX:** ODYX sells an integrated *workflow* (scan→deliver). MD sells *distribution trust* (brands → coverage → specs → commerce).

---

## 2. Design system (Phase 0 — done in skills)

| Skill | Path |
|-------|------|
| Brand tokens, typography, voice | `.claude/skills/md-brand-identity/SKILL.md` |
| Sitemap & story spine | `.claude/skills/md-journey-ia/SKILL.md` |
| Motion patterns | `.claude/skills/md-motion-system/SKILL.md` |

**Visual direction:** Light clinical premium (white/slate + green), dark navy band for manufacturer story, amber accents — **not** ODYX dark navy + orange/teal.

**Typography:** Plus Jakarta Sans + Noto Sans Arabic (vs ODYX Sora + Space Grotesk).

**Logo:** Wordmark + clinical cross mark (SVG). Replace with official brand assets when marketing supplies files.

---

## 3. Story journey (homepage)

```
Authority → Partners → Reach → Promise → Proof → Catalog → Advantage → Action
```

| Phase | Section | Motion |
|-------|---------|--------|
| 1 | Hero + journey spine | Parallax hero, sticky step nav |
| 2 | Partner orbit | 3D CSS ring, grayscale→color hover |
| 3 | Egypt reach teaser | Map pulse, link to `/coverage` |
| 4 | Dual path cards | Dentist / Manufacturer split |
| 5 | Metrics + content | Count-up stats, article/event cards |
| 6 | Featured products | Build-reveal grid |
| 7 | Why MD Dental teaser | Value prop strip |
| 8 | CTA register + shop soon | Green band |

---

## 4. Phased delivery (aligns with SRS epics)

### Phase 1 — Foundation (current sprint) ✅ initial

- [x] Next.js App Router + Tailwind v4 + tokens (`md.css`)
- [x] Header, footer, homepage journey v1
- [x] Static content modules (`src/content/`)
- [x] Motion shell (`MdMotion`, Lenis)
- [ ] Official logo WebP/SVG from MD marketing
- [ ] Arabic `/ar` routing stub

### Phase 2 — Core brand pages (EPIC-R1-02)

| Page | SRS | Priority |
|------|-----|----------|
| Home (dynamic CMS) | BRAND-001 | Must |
| About | BRAND-002 | Must |
| Coverage map | BRAND-003 | Should |
| Why MD Dental | BRAND-004 | Should |
| Navbar + i18n | BRAND-005/006 | Must |

**Enhancement per section:** Review hero, partners, map interaction, dual-audience blocks together.

### Phase 3 — Content & catalog (EPIC-R1-03)

- Products hub + spec detail + IFU downloads
- Articles hub + rich detail
- Specialties (7) landing pages
- Events module

### Phase 4 — Auth & shop handoff (EPIC-R1-01)

- Register/login, verification, navbar auth state
- Shop CTA activation when `shop.mddental.com` live

### Phase 5 — Performance & SEO (BRAND-007, EPIC-R1-05)

- LCP < 2.5s on 3G, Lighthouse 90+
- Schema.org, sitemap, hreflang

---

## 5. Tech stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 16 App Router |
| Styling | Tailwind v4 + `md.css` component layer |
| Motion | motion + Lenis + GSAP (scroll scrub if needed) |
| i18n | next-intl or next-i18next (per SRS) |
| CMS (prod) | PostgreSQL + Prisma ISR |
| Deploy | Vercel / AWS ECS per architecture doc |

---

## 6. Component library (shared)

```
components/
  layout/     Header, Footer, SkipLink
  journey/    JourneyHero, JourneySpine, PartnerOrbit, CoverageTeaser
  home/       DualPath, MetricsStrip, ContentPreview, FeaturedProducts
  motion/     MdMotion, Reveal, CountUp
  ui/         Button, Badge, Card, SecHead
```

Reuse ODYX **patterns** (SecHead, spine, build-reveal), not ODYX **styles**.

---

## 7. Section-by-section review cadence (with you)

> **Two-Earth globes (Hero + Partners):** see [`docs/TWO_EARTH_GLOBE_PLAN.md`](docs/TWO_EARTH_GLOBE_PLAN.md) for architecture, timings, and implementation status.

After initial deploy, iterate in this order:

1. **Hero + spine** — headline, video/image, step sync  
2. **Partners orbit** — real logos, timing, mobile fallback  
3. **Coverage teaser** → full `/coverage` SVG map  
4. **Dual promise cards** — copy + manufacturer VP track  
5. **Proof band** — live articles/events when CMS ready  
6. **Inner pages** — About, Why MD Dental, Products  

---

## 8. Open inputs needed from MD team

1. Official logo files + brand hex codes (if different from SRS green)  
2. Hero photography or approved stock  
3. Manufacturer logos (8) WebP for carousel/orbit  
4. Arabic copy for hero and value props  
5. Rep territory list (12 governorates) for map seed  

---

## 9. Running locally

```bash
cd MD-informative-website-design
npm install
npm run dev
```

Open http://localhost:3000
