# Plan: Convert the Packages slot into a Services Section

## Context (verified)

- `app/[locale]/page.tsx:20` — `PackagesSection` is already commented out (not rendered). It will **not** be touched or recreated.
- The live slot for this work is the existing `ServicesSection` (`app/components/home/servicesSection/`), currently rental-focused with 3 category cards (recruitment / transfer / rental) using PNG images, plus a rental sub-services slider.
- Confirmed decisions: **redesign the existing ServicesSection**, **keep the rental sub-services drill-down**, and **limit `باقة` cleanup to visible UI + hero CTA**.
- The only visible `باقة` label left is the hero secondary CTA `عرض باقاتنا` (ar/en), whose `#packages` anchor is now dead. Everything else (`packages`/`packageDetail` translation blocks, `/packages/*` detail routes, `RECRUITMENT_PACKAGES`, request-form internals) is out of scope per decision.

---

## Phase 1 — Copy & translations

**Files:** `app/translations/ar.json`, `app/translations/en.json`

1. Hero secondary CTA — replace package terminology and fix meaning:
   - ar: `عرض باقاتنا` → `عرض خدماتنا`
   - en: `View our packages` → `View our services`

2. Rework the `services` block for a 3-service section (categories reordered to **recruitment → rental → transfer** to match the spec order):

   | key | ar (proposal) | en (proposal) |
   |---|---|---|
   | `ariaLabel` | `خدمات مسرة إتش أر` | `Masarrah HR services` |
   | `eyebrow` | `خدماتنا` | `Our services` |
   | `title` | `ثلاث خدمات، نُحضّرها لتناسب منزلك.` | `Three services, shaped around your home.` |
   | `body` | `اختر الأنسب لك وسنعمل على توفيرها.` *(required supporting text)* | `Pick what suits you best and we will work to provide it.` |

3. Category entries — exact service names as titles, existing descriptions retained (no invented claims), actions phrased as service requests:
   - `recruitment` → title `الاستقدام` / `Recruitment`; keep description (domestic staffing via licensed corridors); action `اطلب خدمة الاستقدام` / `Request recruitment service`
   - `rental` → title `التأجير` / `Rental`; keep description (hourly/day/week/month); action `عرض خدمات التأجير` / `Show rental services` (keeps drill-down semantics)
   - `transfer` → title `نقل الخدمات` / `Transfer Services`; keep description (documented transfer); action `اطلب خدمة نقل الخدمات` / `Request transfer service`

4. Delete the now-unused `catalogueNote` key; keep all rental-slider keys and `items` unchanged (`serviceLabel`, `rentalEyebrow`, `backToCategories*`, `detailLabel`, `sliderLabel`, `previous`, `next`, `requestService`).
5. Leave `packages` / `packageDetail` blocks untouched (out of scope).

## Phase 2 — Hero CTA retarget

**File:** `app/components/home/heroSwiper/slideCopy.tsx:74`
- `href="#packages"` → `href="#services"` on the secondary CTA (currently a dead anchor).

> Note: primary CTA already links to `#services`, so both CTAs point there after this change. If you'd rather differentiate later, point the secondary one at the request page — flagged as an optional follow-up, not part of this phase.

## Phase 3 — ServicesSection redesign

**Files:** `servicesSection.tsx` (rewrite layout), `categoryCard.tsx` (redesign into a consistent service card), `serviceCard.tsx` (kept for the rental slider, minor consistency only).

- Keep `id="services"` (anchored by navbar, footer, hero, and service-detail back link), client component, framer-motion reveals gated by `useReducedMotion()`, and `bg-parchment text-ink-deep` (maintains the marble→parchment→marble walk).
- **Header** (mirrors the `countriesSection` header pattern): eyebrow (`type-label uppercase text-embassy`) → title (`type-display text-embassy`) → supporting text (`type-body-lg text-ink-soft`), closed by a hairline `border-b border-embassy/15`. No pricing, no comparison, no `popular` badge — none of the old packages logic.
- **Card grid:** `grid gap-sm sm:grid-cols-2 lg:grid-cols-3 lg:gap-md` (1/2/3 columns mobile/tablet/desktop, matching `countriesSection`). Order: الاستقدام → التأجير → نقل الخدمات.
- **Card treatment** (all three identical, replacing PNG image cards):
  - `rounded-lg border border-embassy/15 bg-marble`, hover `-translate-y-0.5` + `hover:border-court-gold/45` + `hover:shadow-float` (per DESIGN.md card rule)
  - icon seal: `h-12 w-12 rounded-md border border-embassy/20 bg-embassy/5 text-embassy` using react-icons — `FiHome` (recruitment), `FiClock` (rental), `FiRepeat` (transfer)
  - `type-title text-embassy` title, `type-body text-ink-soft` description
  - CTA footer: action label + arrow in a bordered square; **rental = chevron** (opens the existing rental slider via button), **recruitment & transfer = arrow-up-right** (Links to `/${locale}/request?package=household` and `/${locale}/request`, reusing existing routes). Whole card is the tap target.
- **Rental drill-down:** keep the existing `view` state, `AnimatePresence` panel, rental slider (dots + prev/next + `serviceCard.tsx` cards linking to `request?package=household&service=…`), and `backToCategories` button — unchanged behavior, visually consistent with the new header.
- Reusable & maintainable: services stay data-driven (`SERVICES` const of `{ key, icon }`), copy driven by the typed `useTranslation("services")` hook; no hardcoded strings.

## Phase 4 — Terminology & dead-link sweep

- Grep for `باقة | باقات | عرض باقاتنا | View our packages | #packages` across `app/` — expect zero hits in **rendered** components. (Expected remaining hits only: orphaned `packageHero.tsx:76`, unrendered `packagesSection/*`, `packages`/`packageDetail` translation blocks — all out of scope.)
- Confirm `page.tsx` still has `PackagesSection` commented and `TestimonialsSection` commented; both remain unmodified.

## Phase 5 — Verification

1. `pnpm lint`
2. `pnpm build`
3. Beige-identity spot check: eyebrows/body in `embassy`/`ink-soft`, gold only in icon/CTA/focus ring, hairline borders not shadows at rest, `prefers-reduced-motion` respected.
4. Responsive check: 1/2/3 column grid, rental slider + back-to-categories on mobile.
5. Functionality: hero secondary CTA scrolls to `#services`; rental card opens slider; recruitment/transfer cards land on the request form; AR/EN parity of all new copy.

**Files touched:** `app/translations/ar.json`, `app/translations/en.json`, `app/components/home/heroSwiper/slideCopy.tsx`, `app/components/home/servicesSection/servicesSection.tsx`, `app/components/home/servicesSection/categoryCard.tsx` (optionally `serviceCard.tsx`). No unrelated sections change.