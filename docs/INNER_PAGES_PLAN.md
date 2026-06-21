# MD Dental — Inner Pages Implementation Plan

**Project:** `MD-informative-website-design`  
**Goal:** Ship consistent inner pages using one shared identity system — **auth first**, then company, catalog, and community sections.  
**Identity source:** Homepage (Figma-aligned) + `.claude/skills/md-brand-identity/SKILL.md`  
**SRS traceability:** EPIC-R1-AUTH (login/register), EPIC-R1-BRAND, EPIC-R1-CONTENT

---

## 1. Why auth first

Login and register set patterns every other inner page inherits:

- Split **auth layout** (focused card, no marketing hero clutter)
- **Form field** styling, validation states, error/success banners
- **Primary / ghost** CTAs matching header (`md-btn-primary`, `md-btn-ghost`)
- **Breadcrumb + page chrome** behavior on non-auth pages
- Future **navbar auth state** (logged-in avatar, logout)

Building these two pages first prevents rework when About, Products, and Articles adopt the same shell.

---

## 2. Site identity — inner-page reference

Use this table as the **consistency checklist** for every new inner page.

### 2.1 Visual language (from homepage)

| Element | Rule | Homepage reference |
|---------|------|------------------|
| **Canvas** | Light clinical: `--md-surface` → `--md-white` gradient top | `.inner-page` in `md.css` |
| **Brand chrome** | Blue headings (`--md-brand`), gold primary CTAs (`--md-gold`) | Header, Promise CTAs |
| **Tricolor accent** | 6px ribbon stripe (red / green / orange) on heroes or card tops | Hero specialty ribbon, academic proof |
| **Typography** | Plus Jakarta Sans; eyebrow uppercase 0.75rem / 0.08em tracking | `.inner-hero .eyebrow`, `sec-head` |
| **H1** | `clamp(2rem, 4vw, 2.8rem)`, −0.02em tracking | `.inner-hero h1` |
| **Body** | `--md-ink-muted`, line-height 1.65 | `.inner-body` |
| **Cards** | `--md-radius` (14px), soft shadow, frosted panels on proof blocks | Path value cards, partner tiles |
| **Spacing** | Section rhythm `clamp(44px, 5.5vh, 64px)` on marketing sections; inner pages `48px / 88px` vertical | `.sec`, `.inner-page` |
| **Motion** | `.reveal` on enter; respect `prefers-reduced-motion` | `MdMotion`, homepage sections |
| **Dark band** | Navy gradient (`--md-blue` → `--md-blue-dark`) for emphasis strips only | VisionValues, academic academies |

**Do not use:** ODYX dark-navy + orange/teal workflow aesthetic. Green is **ribbon / map zones only**, not primary UI chrome.

### 2.2 Voice & audience

| Audience | Tone on inner pages |
|----------|---------------------|
| Dentists / clinic staff | Supportive, clear, evidence-backed — “You are the doctor. We are right behind you.” |
| Manufacturer VPs | Data-oriented proof on About, Why MD Dental, Coverage |
| All | Exclusive, authentic, CE-certified — no grey-market language |

### 2.3 Layout grid

- **Container:** `.wrap` (same max-width as homepage)
- **Content column:** hero max 720px; body max 820px (prose/listing pages)
- **Full-bleed exceptions:** coverage map, product gallery grids, auth split panel

### 2.4 Logo & header

- Inner pages: `MdLogo` **brand** variant (blue on light), header **scrolled** state on load
- Auth pages: simplified header — logo + “Back to home” link; hide main nav optional on mobile

---

## 3. Shared component architecture

Create under `src/components/layout/` and `src/components/ui/`.

```
layout/
  InnerPageLayout.tsx      # wraps InnerPage — metadata, optional sidebar
  AuthLayout.tsx           # split panel: brand story left, form right
  PageHero.tsx             # optional compact hero with tricolor stripe + breadcrumb
  Breadcrumbs.tsx          # reusable breadcrumb (extract from InnerPage)

ui/
  FormField.tsx            # label, input, hint, error — aria-describedby
  FormSection.tsx          # grouped fields + legend
  AlertBanner.tsx          # success / error / info (auth + forms)
  ContentCard.tsx          # article / event / product list tile
  DetailMeta.tsx           # tags, date, brand eyebrow on detail pages
  SecHead.tsx              # homepage-aligned section title for long inner pages
  EmptyState.tsx           # no results, pending verification
  VerifiedBadge.tsx        # “Verified dentist” when AUTH-008 ships

forms/
  LoginForm.tsx
  RegisterForm.tsx         # step 1 account → step 2 clinic → step 3 verification upload
```

### 3.1 Page templates (three types)

| Template | Use | Shell |
|----------|-----|--------|
| **Auth** | `/login`, `/register`, forgot-password (R1+) | `AuthLayout` — no breadcrumb journey link |
| **Standard** | About, Why MD Dental, Careers | `InnerPage` + optional `SecHead` sections |
| **Catalog** | Products, Articles, Events, Partners | `InnerPage` + filter bar + responsive grid |
| **Detail** | `/products/[id]`, `/articles/[slug]`, etc. | `InnerPage` with wider body + sticky spec sidebar |
| **Tool** | `/coverage` | `InnerPage` + full-width map module |

### 3.2 CSS additions (single block in `md.css`)

```text
.auth-layout, .auth-panel, .auth-brand-side
.md-form, .md-field, .md-field--error, .md-field-hint
.md-alert, .md-alert--error, .md-alert--success
.page-filters, .catalog-grid, .detail-sidebar
.inner-sec                          # sub-sections inside long pages
```

Mirror existing tokens — no new colors.

---

## 4. Phase 1 — Login & Register (priority)

**SRS:** AUTH-001 (register), AUTH-002 (email verify), AUTH-003 (login), AUTH-007 (verification upload UI)

### 4.1 `/login`

**Layout:** `AuthLayout` — 40% brand panel / 60% form (stack on mobile: brand strip top).

**Brand panel content:**

- Tagline: *Strategically Growing for YOU*
- 3 proof bullets: 8 global brands · 27 governorates · 2,000+ dentists
- Tricolor stripe at top of panel

**Form fields (AUTH-003):**

| Field | Notes |
|-------|--------|
| Email | required, email format |
| Password | required, show/hide toggle |
| Remember me | optional checkbox |

**Actions:**

- Primary: **Log in** (`md-btn-primary` full width)
- Ghost: **Create an account** → `/register`
- Link: Forgot password (stub → “Contact support” until AUTH ships)

**States:**

- Inline validation on blur
- Rate-limit message after failed attempts (UI placeholder matching SRS: 5 / 15 min)
- Loading spinner on submit button

**R1 prototype:** Client form + mock API or `POST /api/v1/auth/login` when backend ready; store JWT in memory per architecture doc.

### 4.2 `/register`

**Layout:** Same `AuthLayout`; multi-step wizard in form panel.

**Step 1 — Account**

| Field | Notes |
|-------|--------|
| First name, Last name | required |
| Email | required, uniqueness error from API |
| Password | min 8, strength hint |
| Role | select: Dentist, Clinic owner, Procurement manager, Assistant |

**Step 2 — Clinic**

| Field | Notes |
|-------|--------|
| Clinic name | required |
| Governorate | select (27) |
| City | text or select from coverage data |
| Phone | Egyptian format hint |

**Step 3 — Professional verification (AUTH-007 UI)**

| Field | Notes |
|-------|--------|
| Verification type | Syndicate ID / Dental license |
| Document upload | JPG, PNG, PDF ≤ 5 MB; drag-drop zone |
| PDPL notice | short consent text |

**Progress:** Step indicator (1–3) with gold active dot on blue track.

**Actions:**

- Primary: **Continue** / **Submit registration**
- On success: “Check your email” screen (AUTH-002) with resend link stub

**Cross-links:**

- Already have an account? → `/login`
- Browse products while waiting → `/products`

### 4.3 Header auth state (after forms exist)

| State | Header right cluster |
|-------|---------------------|
| Guest | Login + Register (current) |
| Logged in, unverified | Avatar + “Verification pending” badge |
| Logged in, verified | Avatar + dropdown: Profile, Logout |

Stub profile route `/account` in Phase 1 as placeholder.

### 4.4 Phase 1 deliverables checklist

- [ ] `AuthLayout`, `FormField`, `AlertBanner`
- [ ] `LoginForm`, `RegisterForm` (client components)
- [ ] Auth CSS block in `md.css`
- [ ] Replace stub text in `login/page.tsx`, `register/page.tsx`
- [ ] Metadata: `title`, `description` per page
- [ ] RTL-safe form labels (logical properties, no hard-coded `ml`)
- [ ] Reduced-motion: no parallax on auth brand panel
- [ ] Vitest: form validation unit tests (optional but recommended)

**Estimate:** 2–3 focused implementation sessions (UI only; backend integration parallel).

---

## 5. Phase 2 — Company & trust pages

Apply **Standard template** + homepage section patterns.

| Route | Sections to build | Homepage link |
|-------|-------------------|---------------|
| `/about` | Page hero → timeline (reuse `OurStoryTimeline` content) → values grid (reuse `VisionValues`) → metrics strip → leadership/team placeholder → CTA band | Hero / Our Story |
| `/why-md-dental` | Hero → 4 value pillars (align with PromiseShowcase cards, not old dual-path) → dentist proof → manufacturer proof → academic partners snippet → register CTA | Promise / path cards |
| `/careers` | Hero → open roles list (static JSON) → culture values → apply CTA → register interest | Footer / nav |

**Copy source:** `pathCards.ts`, `home.ts`, Company Profile 2024.

**Remove:** Generic placeholder paragraphs; replace `journeyFrom` links where homepage sections were removed (e.g. `proof`, `catalog`, `action`).

---

## 6. Phase 3 — Product catalog

| Route | UI |
|-------|-----|
| `/products` | Filter bar (brand, specialty) + grid using `ProductGallery` / `product-card` styles; pagination stub |
| `/products/[id]` | Hero: brand + name; two-column: spec table + IFU download; related products; “Register to order” CTA |

**Reuse:** `FEATURED_PRODUCTS`, `productCategories.ts`, coverflow visual language from homepage `ProductsShowcase`.

**Detail pattern:** `DetailMeta` + sticky sidebar for specs (desktop).

---

## 7. Phase 4 — Community & partners

| Route | Status | Work |
|-------|--------|------|
| `/partners` | **Missing** | New hub: 8 brand cards → `/partners/[slug]` |
| `/partners/[slug]` | Stub | Brand hero, story, product links, logo on navy tile |
| `/articles` | Minimal grid | Filter by tag/specialty; card = homepage content cards |
| `/articles/[slug]` | Stub | Prose layout, related articles, product CTAs |
| `/events` | Stub | Calendar list + cards |
| `/events/[id]` | Stub | Event detail + register CTA |

**Grid:** `.g3` or `.catalog-grid` — same gap/radius as homepage cards.

---

## 8. Phase 5 — Coverage & polish

| Item | Notes |
|------|--------|
| `/coverage` | Already has `CoverageMapSection` — widen body to full-bleed map; zone legend from brand tokens |
| Journey spine links | Update `InnerPage` `journeyFrom` IDs to match live homepage: `authority`, `partners`, `reach`, `promise` |
| `/specialties/[slug]` | 7 specialty landings (SRS CONTENT) — Phase 5 or R1.1 |
| i18n `/ar/*` | Mirror all inner templates with RTL form layout |
| SEO | `AboutPage`, `WebPage`, `Product` schema per route |

---

## 9. Implementation order (sprint map)

```
Sprint A — Identity shell + Auth
  ├── Auth CSS + FormField + AlertBanner
  ├── AuthLayout + LoginForm + /login
  └── RegisterForm wizard + /register

Sprint B — Company
  ├── /about (timeline + values)
  ├── /why-md-dental (4 pillars)
  └── /careers

Sprint C — Catalog
  ├── /products filters + grid
  └── /products/[id] detail

Sprint D — Community
  ├── /partners hub (new)
  ├── /partners/[slug]
  ├── /articles + /articles/[slug]
  └── /events + /events/[id]

Sprint E — Polish
  ├── Header auth states
  ├── Coverage full-bleed
  ├── journeyFrom sync
  └── Arabic stubs
```

---

## 10. Consistency review gate (per page)

Before marking any inner page done, verify:

1. Uses `.wrap` and inner-page gradient background
2. Eyebrow + H1 + lead match homepage typography scale
3. CTAs use `md-btn-primary` / `md-btn-ghost` only (no ad-hoc colors)
4. Cards use `--md-radius` and `--md-shadow`
5. Tricolor accent appears at least once (hero stripe or card top)
6. Links to register/login/shop follow conversion paths from `md-journey-ia`
7. Mobile: form full-width, grid collapses to 1 col, header actions usable
8. `prefers-reduced-motion`: no required animation to complete tasks

---

## 11. File touch list (Phase 1)

| Action | Path |
|--------|------|
| Create | `src/components/layout/AuthLayout.tsx` |
| Create | `src/components/ui/FormField.tsx` |
| Create | `src/components/ui/AlertBanner.tsx` |
| Create | `src/components/forms/LoginForm.tsx` |
| Create | `src/components/forms/RegisterForm.tsx` |
| Update | `src/app/login/page.tsx` |
| Update | `src/app/register/page.tsx` |
| Update | `src/app/md.css` (auth + form block) |
| Optional | `src/content/auth.ts` (static copy, role options, governorates) |

---

## 12. Out of scope (R1 UI plan — backend parallel)

- Real JWT refresh cookie (`AUTH-004`, `AUTH-005`)
- SendGrid verification emails (`AUTH-002`)
- S3 upload pipeline (`AUTH-007` API)
- Admin verification queue (`AUTH-008`)
- Shop handoff to `shop.mddental.com` (`AUTH-005`)

UI must expose the correct fields and states so API integration is plug-in, not redesign.

---

*Last updated: aligns with homepage section order (Authority → Story → Vision → Partners → Reach → Products → Promise → FAQ → Contact) and Figma-informed Choose Your Path (4 value pillars + academic proof).*
