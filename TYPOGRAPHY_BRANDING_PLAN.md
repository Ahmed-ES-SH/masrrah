# Typography & Branding Visibility Plan — Masarrah HR

## Goals (mapped to requirements)
- R1 Thmanyah everywhere (verified: Thmanyah Sans includes Latin glyphs; Inter kept only as glyph fallback)
- R2 medium weight (500) for headings
- R3 regular weight (400) for body text
- R4 consistent hierarchy: main headings / section headings / subheadings / body / buttons / small supporting text
- R5–6 full company name fully visible and clearly readable, never too small or secondary
- R7 preserve the premium and professional visual direction
- R8 clean Arabic typography, especially on mobile
- R9 no excessive font sizes, excessive font weights, or unnecessary decorative typography
- R10 consistent spacing and line-heights across the website
- No business-content changes
- Recruitment packages section stays commented out (not re-enabled, not refactored)

## Current state (findings)
- Thmanyah Sans already loaded via `localFont` (Regular/Medium/Bold) and applied to Arabic only (`html[lang="ar"]` override in `app/globals.css:109`). Latin coverage verified in the font's charset (full ASCII present).
- `:root` font stacks point at `"Inter", "IBM Plex Sans Arabic"` — the latter is never loaded, so it's a dead fallback.
- `body { font-weight: 500 }` (`app/globals.css:151`) — body renders in Medium, violating R3.
- Heading weights are inconsistent: `font-medium` in ~8 home components, `font-bold` in about/request/package/service/footer headings. Card titles mix `font-semibold` / `font-bold`. Line-heights drift (`leading-[1.08]`, `1.12`, `1.15`, `leading-snug`, `leading-tight`).
- Company name lives **only inside the logo image** in the header. The tall `logo.webp` (766×968) shows the name at ~84px → unreadably small; on scroll/mobile it swaps to square `small-logo.webp` (crest only, no name at all).
- English label typo: `footer.title` = "Masarrah HR **HR** Recruitment"; `navbar.brandSub` is Arabic text inside `en.json` and "HR HR" inside `ar.json`.
- Giant faded initial-letter watermarks (9rem, 6xl) on testimonials/journal/country cards violate R9.

## Phase A — Font foundation (`app/globals.css`)
1. Change all five `:root` font vars to `var(--font-thmanyah-sans), var(--font-inter), sans-serif` (Thmanyah primary for both locales, Inter as glyph fallback).
2. Delete the `html[lang="ar"]` override block and all `"IBM Plex Sans Arabic"` references.
3. Set `body { font-weight: 400 }`.
4. `app/[locale]/layout.tsx`: no structural change (Inter + Thmanyah variables already applied to `<html>`; Inter stays as fallback).

## Phase B — Semantic type scale (`app/globals.css`, `@layer components`)
Single source of truth for the hierarchy; components then use one class instead of scattered `font-*/text-*/leading-*` combos. Colors/spacing stay as utilities.

| Level | Class | Size token | Weight | Line-height |
|---|---|---|---|---|
| Hero H1 | `type-hero-display` | `--text-hero-display` | 500 | 1.15 |
| Page H1 / section H2 | `type-display` | `--text-display` | 500 | 1.12 |
| H3 feature/card | `type-headline` | `--text-headline` | 500 | 1.35 |
| H4 / card sub-title | `type-title` | `--text-title` | 500 | 1.6 |
| Body (cards) | `type-body` | `--text-body` | 400 | 1.75 |
| Body (long prose) | `type-body-lg` | `--text-body` | 400 | 2 (leading-8) |
| Small supporting | `type-label` | `--text-label` | 400 | 1.6 |
| Buttons / CTAs | `type-btn` | `--text-label` | 600 | 1.4 |

- `.type-label` / `.type-btn` get modest letter-spacing on Latin; a `[dir="rtl"]` override zeroes it (letter-spacing degrades Arabic readability — R8). Keep `uppercase` utility on English eyebrows as today.
- Data numerals (prices, license no., rating, step numbers) stay `tabular-nums` at `font-semibold` (max 600 site-wide: 400 regular / 500 medium / 600 buttons+data — satisfies R9).

## Phase C — Component normalization (all rendered sections/pages)
- Replace heading combos with semantic classes; drop every `font-bold` / `font-semibold` from headings and card titles → `font-medium` (R2).
- Body text → `type-body` / `type-body-lg` (regular, R3). Standardize leading: `leading-8` for section-intro prose, `leading-7` for card text (R10).
- Standardize all buttons to `type-btn` (min-h-11/12 preserved). Hero CTAs (`app/components/home/heroSwiper/slideCopy.tsx:11-13`) change `text-title font-semibold` → `text-body font-semibold` so button size never collides with the subheading tier.
- Files: `home/*` (heroSwiper, servicesSection + cards, stepsRecruitmentProcess, recruitmentOperations, countriesSection + card, platformSection + stepItem, faqSection + item, govermentsLogos, blogSection + articleCard, testimonialsSection + card), `about/*` (hero, story, vision, values + item), `request/requestForm`, `service/serviceHero`, `package/packageHero`, `global/Footer`, `global/Navbar`.

## Phase D — Company name visibility (R5–6)
**Header (`app/components/global/Navbar.tsx`):** replace the animated 84px→64px logo-image swap with a fixed brand lockup:
- Crest `small-logo.webp` (~h-10 mobile / h-12 desktop, rounded, `object-contain`) + wordmark column:
  - Line 1: `type-title` `text-embassy` — `t.brand` («مسرة إتش أر» / "Masarah HR"), `whitespace-nowrap`, never truncated.
  - Line 2: `type-label` `text-ink-soft` — `t.brandSub` («للاستقدام» / "Recruitment").
- Static on scroll (name never shrinks); readable over both transparent-hero and solid-header states. Remove `logo.webp` from header (file stays in `public/`).
- Mobile drawer: add the same wordmark beside the existing crest (currently crest-only).

**Footer (`app/components/global/Footer.tsx`):** bump the brand name from `text-title font-semibold` → `type-headline` `text-ink-deep` so the full «مسرة إتش أر للاستقدام» is prominent; tagline stays `type-label`.

**Translation fixes (brand display strings only, not business content):**
- `en.json`: `footer.title` "Masarrah HR HR Recruitment" → "Masarrah HR Recruitment"; `navbar.brandSub` (Arabic) → "Recruitment".
- `ar.json`: `navbar.brandSub` "Masarrah HR HR" → "للاستقدام".

## Phase E — Arabic / mobile polish (R8)
- `.type-label` letter-spacing resets to 0 in RTL (from Phase B).
- Keep existing `text-balance` / `text-pretty` on headings/paragraphs; verify no heading clips ascenders/diacritics at 320px/390px widths.
- The type scale's clamps already keep mobile sizes ≥ body 0.9375rem / label 0.8125rem — no size increases needed.

## Phase F — Decorative typography removal (R9)
Delete the oversized faded initial/code watermarks:
- `app/components/home/testimonialsSection/testimonialsSection.tsx` (9rem featured initial)
- `app/components/home/testimonialsSection/testimonialCard.tsx` (5rem initial)
- `app/components/home/blogSection/articleCard.tsx` (9rem initial)
- `app/components/home/countriesSection/countryCard.tsx` (6xl country code)

Keep the geometric SVG motifs (arches, compass ring, architectural watermark) — those are graphics, not typography.

## Explicitly NOT touched
- Business content (all translation copy except the two brand-string fixes above).
- `PackagesSection` / `PackageCard` remain commented out in `app/[locale]/page.tsx` — not re-enabled, not refactored.

## Phase G — Verification
1. Run `npm run lint` and `npm run build`.
2. Run `npm run dev`; inspect `/ar` & `/en` home, about, request, `services/*`, `packages/*` at 320 / 390 / 768 / 1440px:
   - Header wordmark fully visible & readable in both locales and both header states; no truncation/overlap.
   - Hierarchy reads consistently: hero → section H2 → card H3 → body → label → button; no `bold` headings remain.
   - Arabic labels show no letter-spacing gaps; body text sits at regular weight with consistent leading.

## Files touched
`app/globals.css`, `app/components/global/Navbar.tsx`, `app/components/global/Footer.tsx`, all component files in `app/components/{home,about,request,service,package}/`, `app/translations/{ar,en}.json` (2 string fixes each). No new files, no new dependencies, no config changes.