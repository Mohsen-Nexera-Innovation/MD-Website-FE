# MD Dental — Section Journey & UX Playbook

**Purpose:** Each homepage section is a **story chapter** tied to business outcomes, brand identity (blue + gold), and a strict **1-click** interaction budget.

**Story arc:** Trust → Partners → Reach → Path → Proof → Catalog → Advantage → Action

---

## Global journey mechanics

| Mechanism | Role |
|-----------|------|
| **Top progress bar** | Gold fill tracks scroll — user always knows story position |
| **Labeled spine (desktop)** | 8 chapters; hover shows name; click = smooth scroll |
| **Chapter badge** | `01 Authority` … `08 Action` on every section |
| **Story bridge** | “Next chapter” card with tricolor accent — links sections narratively |
| **Lenis smooth scroll** | Cinematic pacing between chapters |
| **Reveal / build / count-up** | Sections feel alive on enter (respects reduced motion) |

**Click philosophy:** Every preview card is a **link**. No dead-end tiles. Target: **≤1 click** from homepage section to meaningful next page.

---

## Section-by-section

### 01 — Authority (`#authority`)

| | |
|---|---|
| **Story** | “Who is MD Dental?” — exclusive distributor, not grey-market reseller |
| **Business value** | 5-second trust for VPs + clinicians; supports manufacturer due diligence |
| **Design mechanism** | Full-viewport brand blue hero, official PNG wordmark, gold CTAs, parallax glows, tricolor ribbon, scroll cue |
| **Max clicks** | 1 → `/products` or `/why-md-dental` |
| **Motion** | Parallax layers, rotating ring around hero mark, scroll cue bob |
| **Next** | Partners orbit |

### 02 — Partners (`#partners`)

| | |
|---|---|
| **Story** | “Who do we represent?” — 8 global exclusives |
| **Business value** | Answers #1 manufacturer VP question before the meeting |
| **Design mechanism** | 3D CSS orbit, MD logo hub, chips link to `/partners/[slug]` |
| **Max clicks** | 1 → partner showcase |
| **Motion** | 48s orbit spin, pause on hover |
| **Next** | Egypt reach |

### 03 — Reach (`#reach`)

| | |
|---|---|
| **Story** | “How far do you reach?” — reps + Bosta nationwide |
| **Business value** | Proves 27-governorate penetration; delivery confidence |
| **Design mechanism** | Egypt silhouette + zone legend + pulsing map pins |
| **Max clicks** | 1 → `/coverage` |
| **Motion** | Pin pulse animation, silhouette glow |
| **Next** | Dual path |

### 04 — Promise (`#promise`)

| | |
|---|---|
| **Story** | Fork — dentist discovery vs manufacturer evaluation |
| **Business value** | One site, two audiences; no separate B2B microsite |
| **Design mechanism** | Split cards (blue-top clinician / gold-top manufacturer) |
| **Max clicks** | 1 → `/products` or `/why-md-dental#for-manufacturers` |
| **Motion** | Staggered build reveal |
| **Next** | Proof |

### 05 — Proof (`#proof`)

| | |
|---|---|
| **Story** | “Is this platform alive?” — metrics + fresh content |
| **Business value** | Content-to-commerce pipeline; second-visit freshness for VPs |
| **Design mechanism** | Count-up metrics; article/event cards are full links |
| **Max clicks** | 1 → article, event, or listing hub |
| **Motion** | Count-up on scroll, card lift hover |
| **Next** | Featured products |

### 06 — Catalog (`#catalog`)

| | |
|---|---|
| **Story** | “What can I buy?” — authentic SKUs with specs |
| **Business value** | Spec transparency vs Toothpick/Medista; shop handoff in R2 |
| **Design mechanism** | 6-product grid, brand badge, 1-click to `/products/[id]` |
| **Max clicks** | 1 → product spec |
| **Motion** | Staggered build reveal |
| **Next** | Why MD |

### 07 — Advantage (`#advantage`)

| | |
|---|---|
| **Story** | “Why MD over others?” — four pillars |
| **Business value** | Objection handling before registration |
| **Design mechanism** | Numbered value grid + single deep CTA |
| **Max clicks** | 1 → `/why-md-dental` |
| **Motion** | Staggered build |
| **Next** | Register |

### 08 — Action (`#action`)

| | |
|---|---|
| **Story** | Conversion — register now, shop soon |
| **Business value** | Captures verified accounts for auth + future commerce |
| **Design mechanism** | Blue gradient band, gold register CTA |
| **Max clicks** | 1 → `/register` |
| **Motion** | High-contrast static band (no distraction) |

---

## Linked routes (all wired in v1)

| From section | Route |
|--------------|-------|
| Hero | `/products`, `/why-md-dental` |
| Partners | `/partners/[slug]` |
| Reach | `/coverage` |
| Promise | `/products`, `/why-md-dental` |
| Proof | `/articles/[slug]`, `/events/[id]`, hubs |
| Catalog | `/products/[id]`, `/products` |
| Advantage | `/why-md-dental` |
| Action | `/register` |

Inner pages include breadcrumb + “Continues from homepage chapter” link back to `/#section`.

---

## Brand alignment

- **Colors:** `#3050A0` blue, `#EBB428` gold, tricolor ribbon accents
- **Logo:** Official PNG from Company Profile 2024
- **Tagline:** *Strategically Growing for YOU*

---

## Review cadence (with stakeholder)

1. Hero motion + copy  
2. Partner orbit + real logos  
3. Coverage map (full SVG)  
4. Dual path messaging  
5. Proof band CMS hookup  
6. Product spec templates  

Data model: `src/content/journey.ts` drives chapter metadata in UI.
