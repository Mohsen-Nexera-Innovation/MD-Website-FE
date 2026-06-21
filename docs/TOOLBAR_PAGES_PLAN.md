# MD Dental — Toolbar Sections Development Plan

**Scope:** Nav items from `src/content/nav.ts` — **Products**, **MD Community** (`/articles`), **Events**, **Careers**  
**Identity:** Blue + gold, tricolor ribbon, light clinical canvas — same system as homepage + auth pages  
**References:** `docs/INNER_PAGES_PLAN.md`, `md-brand-identity` skill, SRS EPIC-R1-03 / EPIC-R1-04  
**Status:** Products, articles, events, careers are **stubs**; login/register **done** (Sprint A)

---

## Shared foundation (build once, use on all four hubs)

Before page-specific work, ship these primitives so every toolbar section feels identical.

| Component | Path | Used on |
|-----------|------|---------|
| `CatalogLayout` | `layout/CatalogLayout.tsx` | Products, Articles, Events |
| `FilterPanel` + `FilterChips` | `ui/FilterPanel.tsx` | All three hubs |
| `SearchBar` | `ui/SearchBar.tsx` | Products, Articles (Events optional) |
| `SortSelect` | `ui/SortSelect.tsx` | All three |
| `Pagination` | `ui/Pagination.tsx` | All three |
| `EmptyState` | `ui/EmptyState.tsx` | All three |
| `PageHero` | `layout/PageHero.tsx` | All inner pages — breadcrumb + tricolor stripe + eyebrow/H1/lead |
| `ContentCard` | `ui/ContentCard.tsx` | Articles, Events |
| `ProductCard` | `ui/ProductCard.tsx` | Products grid |
| `ProseArticle` | `ui/ProseArticle.tsx` | Article detail |
| `DetailSidebar` | `layout/DetailSidebar.tsx` | Product + article detail |

**CSS block:** `.catalog-layout`, `.catalog-filters`, `.catalog-grid`, `.catalog-toolbar`, `.detail-layout` in `md.css` — mirror auth form spacing and card radius (`--md-radius`).

**Data (R1 prototype):** expand `src/content/` with typed JSON modules until CMS is live:

- `articles.ts` — 12+ articles (not just 3 previews)
- `events.ts` — upcoming + past events with full detail fields
- `products.ts` — full SKU list with `specs_json` samples
- `careers.ts` — roles + culture copy

**URL state:** filters, search, sort, page → query params (client updates, SSR reads initial state).

**Consistency gate:** every page passes the checklist in `INNER_PAGES_PLAN.md` §10.

---

## Build order

```
1. Products hub + detail     ← homepage coverflow CTA, shop handoff, highest SRS priority
2. MD Community (articles)   ← education pillar, organic traffic, CONTENT-001/002
3. Events                    ← same catalog patterns, EVENT-001/002
4. Careers                   ← standalone HR page, no SRS blocker
```

---

## 1. Products (`/products`)

**Nav label:** Products  
**SRS:** CONTENT-004 (browser), CONTENT-005 (detail), CONTENT-006 (IFU PDF), CONTENT-007 (shop deep-link)  
**Conversion:** Dentist finds spec → downloads IFU → registers or “Buy on MD Shop” (R2)

### Purpose

Searchable catalog of **1,000+ SKUs** with published technical specs — MD Dental’s content-to-commerce entry. Must feel like an extension of the homepage **Our Products** coverflow, not a separate catalog skin.

### Page template

**Catalog** + full-width filter toolbar; body wider than default `inner-body` (max ~1100px).

### Identity on this page

- Hero lead echoes `PRODUCT_INTRO` from `productCategories.ts`
- Category imagery style matches homepage category cards (real product photos, blue brand tags)
- Gold **Browse** / **Register to order** CTAs; blue filter chips and specialty badges
- Tricolor stripe on `PageHero`

### `/products` — sections (top to bottom)

| # | Section | Content / behavior |
|---|---------|-------------------|
| 1 | **Page hero** | Eyebrow: “Product Catalog”. H1: “Technical specifications”. Lead: factory-direct, CE-certified, 1,000+ SKUs. |
| 2 | **Toolbar** | Search (name, brand) · Sort (relevance / newest / A–Z) · Grid density toggle optional |
| 3 | **Filters** | Multi-select chips: **Specialty** (7 SRS enums), **Brand** (8 partners), **Subcategory** (contextual per specialty) |
| 4 | **Active filters** | Removable chips + “Clear all” |
| 5 | **Product grid** | 12/page desktop, 6 mobile — `ProductCard`: image, name, brand logo/monogram, specialty badge, one key spec highlight |
| 6 | **Pagination** | Numbered + prev/next; URL `?page=` |
| 7 | **Empty state** | “No products match” + clear filters |
| 8 | **CTA band** | Navy strip: “Need help choosing?” → `/why-md-dental` or contact |

### `/products/[id]` — sections

| # | Section | Content / behavior |
|---|---------|-------------------|
| 1 | **Breadcrumb** | Products → [Brand] → [Product name] |
| 2 | **Hero row** | Gallery (3–8 images, lightbox) + title, brand link to `/partners/[slug]`, specialty badge |
| 3 | **Spec table** | Category-driven `specs_json` blocks (ortho brackets, composites, endo files, impressions, implants) |
| 4 | **Clinical block** | Indications, usage protocol, storage, contraindications (when data exists) |
| 5 | **Certifications** | ISO / CE / FDA badge row |
| 6 | **Downloads** | IFU + datasheet buttons (CONTENT-006 stub → pre-signed URL later) |
| 7 | **CTA row** | **Register to order** (guest) · **Buy on MD Shop** (disabled “Coming soon” until R2) with AUTH handoff stub |
| 8 | **Related** | 3 related products (same brand or specialty) |
| 9 | **Related articles** | 2–3 article cards linking to `/articles/[slug]` |

### Components to build / reuse

- Reuse: `ProductGallery` visual language, `MANUFACTURERS` from `home.ts`, `PRODUCT_CATEGORIES`
- New: `ProductCard`, `ProductSpecTable`, `ProductGalleryLightbox`, `CertificationBadges`, `DownloadButton`

### R1 prototype data

Extend `FEATURED_PRODUCTS` → `products.ts` with `id`, `slug`, `images[]`, `specs`, `ifuUrl`, `keySpec`, `subcategory`.

### SEO

- Listing: `WebPage` + `ItemList`
- Detail: `Product` JSON-LD, title `[Name] - [Brand] | MD Dental`

### Out of scope (R1 UI)

- Live price, shop inventory, PostgreSQL tsvector (use client filter on static JSON first)

### Estimate

**2 sessions** — hub + detail + shared catalog components (partially reused by articles/events)

---

## 2. MD Community (`/articles`)

**Nav label:** MD Community  
**Route:** `/articles` (not `/community` — keep nav label vs URL documented)  
**SRS:** CONTENT-001 (listing), CONTENT-002 (detail)  
**Conversion:** Organic search → read article → related products → register / future shop

### Purpose

**Educational hub** — clinical knowledge by specialty and brand. Primary organic traffic driver. Tied to homepage **Education** path card (`pathCards.ts` → `/articles`).

### Identity on this page

- Eyebrow: “MD Community” or “Educational Hub”
- Article cards reuse `.content-card` styling with specialty tag colors (blue/gold soft backgrounds)
- Optional featured hero card for latest article (image + frosted overlay like path value cards)
- Voice: evidence-backed, clinical — not marketing fluff

### `/articles` — sections

| # | Section | Content / behavior |
|---|---------|-------------------|
| 1 | **Page hero** | H1: “Clinical articles & guides”. Lead: learning organized by specialty and partner brand. |
| 2 | **Featured article** | Latest or pinned article — large card with image, reading time, specialty |
| 3 | **Toolbar** | Search (full-text later) · Sort (date / popular / A–Z) · Grid/list toggle |
| 4 | **Filters** | Specialty (7) · Brand (8) · Content type (Clinical guide, Case study, Product focus, News, Protocol) |
| 5 | **Article grid** | 12/page — `ContentCard`: tag, title, excerpt, date, reading time, author optional |
| 6 | **Pagination** | URL-synced |
| 7 | **Sidebar promo** (desktop) | “New to MD Dental?” → `/register` |
| 8 | **Cross-link** | “Upcoming events” strip → 3 event cards → `/events` |

### `/articles/[slug]` — sections

| # | Section | Content / behavior |
|---|---------|-------------------|
| 1 | **Metadata** | Author, published date, reading time, specialty + brand tags |
| 2 | **Prose body** | `ProseArticle` — headings, lists, images, pull quotes; RTL-ready |
| 3 | **Share row** | WhatsApp, Facebook, LinkedIn, email (CONTENT-002 S6) |
| 4 | **Related products** | Top 3 `ProductCard` + “Buy on MD Shop” stub |
| 5 | **Related articles** | Sticky sidebar (desktop) — same specialty or brand |
| 6 | **Bottom CTA** | Gold band: “Browse products mentioned” → `/products` |

### Components

- `ArticleCard`, `ArticleFeatured`, `ProseArticle`, `ShareButtons`, reuse `DetailSidebar`

### R1 prototype data

`articles.ts`: minimum **12 articles** across specialties (SRS seed goal: 20); each with `slug`, `body` (markdown or HTML string), `relatedProductIds`, `manufacturerSlug`.

### SEO

- Listing: `ItemList`, meta for “Dental articles Egypt”
- Detail: `Article` schema, OG image from hero image

### Out of scope (R1 UI)

- PostgreSQL tsvector, view-count analytics, Arabic `/ar/articles` (stub button only)

### Estimate

**2 sessions** after catalog primitives exist

---

## 3. Events (`/events`)

**Nav label:** Events  
**SRS:** EVENT-001 (listing), EVENT-002 (detail) — **Should** priority  
**Note:** SRS uses `/events/[slug]`; current app uses `[id]` — **migrate to `[slug]`** for SEO

### Purpose

Proof of market leadership — workshops, webinars, conferences. Separates **calendar** from articles but shares community visual language.

### Identity on this page

- Event type tags use existing CSS: `.event-workshop` (gold), `.event-webinar` (purple), `.event-conference` (blue)
- Timeline feel: upcoming section on white, past section on `--md-surface`
- Virtual events: “Online” badge with blue-soft pill

### `/events` — sections

| # | Section | Content / behavior |
|---|---------|-------------------|
| 1 | **Page hero** | H1: “Events & clinical days”. Lead: workshops, webinars, and partner showcases across Egypt. |
| 2 | **Upcoming** | Cards sorted by `startDate` ASC — date block (day/month), title, type tag, location/virtual, “View details” |
| 3 | **Filters** | Event type (Conference, Workshop, Webinar, Course, Networking) · Specialty · Location |
| 4 | **Past events** | Collapsible or second section, sorted DESC |
| 5 | **Empty upcoming** | “No upcoming events” + link to past + `/articles` |
| 6 | **CTA** | “Register your clinic” → `/register` for event notifications (stub) |

### `/events/[slug]` — sections

| # | Section | Content / behavior |
|---|---------|-------------------|
| 1 | **Event header** | Title, type badge, date/time **EET**, location or Virtual |
| 2 | **Registration** | Open → external link or `/register` stub; Closed / Sold out states |
| 3 | **Description** | Rich text — agenda, capacity, what to expect |
| 4 | **Speakers** | Names, titles, org (optional bios) |
| 5 | **Past event extras** | Photo gallery grid, recap, attendee count |
| 6 | **Related** | Articles + products by event specialty |
| 7 | **Map** | Static map embed or link for physical venues (Cairo, Alexandria, etc.) |

### Components

- `EventCard`, `EventTimeline`, `EventDateBadge`, `SpeakerList`, `EventRegistrationCta`
- Reuse `CatalogLayout` filters (lighter set than products)

### R1 prototype data

`events.ts`: 3 upcoming (from `EVENTS_PREVIEW`) + 4–6 past events with `slug`, `status`, `registrationUrl`, `speakers[]`, `gallery[]`.

### SEO

- `Event` JSON-LD with `startDate`, `location`, `organizer: MD Dental`

### Estimate

**1–2 sessions** after catalog primitives

---

## 4. Careers (`/careers`)

**Nav label:** Careers  
**SRS:** Not specified — **Figma / nav** requirement  
**Conversion:** Talent pipeline → application email or form; secondary brand trust for manufacturers

### Purpose

Show MD Dental as a growing employer aligned with core values — **Innovation, Customer Centricity, Integrity, Teamwork, Excellence** (brand skill). Field reps, clinical support, logistics, digital.

### Page template

**Standard** inner page with **multiple `inner-sec` bands** (not a catalog).

### Identity on this page

- Opening hero matches other inner pages
- Values grid mirrors `VisionValues` homepage component (reuse or extract)
- Role cards: navy header strip + white body (academic academy tile pattern from `PathAcademicProof`)
- Tricolor ribbon on hero only — keep page mostly light

### `/careers` — sections

| # | Section | Content / behavior |
|---|---------|-------------------|
| 1 | **Page hero** | Eyebrow: “Join the team”. H1: “Careers at MD Dental”. Lead: build Egypt’s dental knowledge platform. |
| 2 | **Culture strip** | 3 metrics: 27 governorates, 8 brands, team growth since 2019 |
| 3 | **Values** | 5 value cards (reuse VisionValues content) |
| 4 | **Open roles** | List of role cards: title, location, type (Field / Office / Remote), short description, “Apply” |
| 5 | **No roles state** | “We’re always looking for talent” + register interest |
| 6 | **Application** | Simple form: name, email, role interest, CV upload (PDF ≤ 5MB) — mirrors verification upload UI |
| 7 | **CTA band** | Navy: “Questions?” → `GetInTouch` contact details or `/` contact section |

### Open roles (R1 static)

| Role | Location | Type |
|------|----------|------|
| Field Sales Representative | Multiple governorates | Field |
| Clinical Support Specialist | Cairo | Office |
| Logistics Coordinator | Cairo | Office |
| Digital Marketing Associate | Cairo / Hybrid | Office |

### Components

- `RoleCard`, `CareersApplicationForm` (reuse `FormField`, `AlertBanner`, upload zone from register)
- Extract or reuse `VisionValues` as shared `ValuesGrid`

### SEO

- `WebPage` + `JobPosting` schema per open role when live API exists

### Out of scope

- ATS integration (Greenhouse, etc.) — email to `careers@mddental.com` or API later

### Estimate

**1 session** — no catalog dependency; can parallelize with Events

---

## Cross-page navigation map

```
Homepage Our Products  ──→  /products
Homepage Education card ──→  /articles
Nav Events              ──→  /events
Nav Careers             ──→  /careers

/products/[id]  ──→  /partners/[slug], /articles/[slug], shop (R2)
/articles/[slug] ──→  /products/[id], /events/[slug]
/events/[slug]  ──→  /register, /articles
/careers        ──→  /register (interest), contact
```

---

## Sprint breakdown

| Sprint | Deliverable | Pages |
|--------|-------------|--------|
| **B1** | Shared catalog primitives + `products.ts` seed | — |
| **B2** | Products hub + detail | `/products`, `/products/[id]` |
| **B3** | Articles hub + detail + `articles.ts` seed | `/articles`, `/articles/[slug]` |
| **B4** | Events hub + detail; rename `[id]` → `[slug]` | `/events`, `/events/[slug]` |
| **B5** | Careers full page + `careers.ts` | `/careers` |
| **B6** | SEO metadata, empty states polish, mobile QA | all |

---

## Mobile requirements (all four)

- Filters: collapsible drawer / accordion on `< 768px`
- Grids: 1 col phone, 2 col tablet, 3–4 col desktop
- Sticky filter button on mobile catalog pages
- Touch-friendly pagination
- Event date badges readable at 360px width

---

## Content needed from MD team

| Page | Assets |
|------|--------|
| Products | Product images WebP, IFU PDFs, spec sheets per SKU |
| Articles | 12–20 clinical articles, hero images, author names |
| Events | Dates, venues, registration URLs, speaker bios, past event photos |
| Careers | Approved role descriptions, HR contact, application policy |

---

## Definition of done (per page)

- [ ] Uses `PageHero` + identity checklist
- [ ] No placeholder paragraph stubs
- [ ] Static content module with realistic seed data
- [ ] Works on mobile 360px
- [ ] Metadata `title` + `description`
- [ ] `npm run build` passes
- [ ] Reduced-motion: no animation required to use filters or read content

---

*Toolbar items **About MD** and **Partners** are covered in `docs/INNER_PAGES_PLAN.md` Sprint B / D.*
