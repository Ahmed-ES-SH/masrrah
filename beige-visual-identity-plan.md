# Plan: Beige Global Visual Identity for Masarrah HR

## What was found

- The entire site is **already tokenized**: ~35 component files consume Tailwind utility classes (`bg-embassy`, `text-parchment`, `border-champagne-gilt/20`, …) that map 1:1 to CSS variables in `app/globals.css` (`:root` + `@theme inline`).
- The "purple direction" = the **navy/indigo family** (`#0b1b3a` → `#1b335e`) used for hero, footer band, values section, drawer, toast, cards, plus navy-tinted shadows. Zero hardcoded purple hexes exist in components.
- The **license number area** exists in 3 places: Footer `#license` band, Navbar (already removed, uncommitted), and the About `storySection` facts panel. All will be **left untouched**.
- The removed `PackagesSection`/`TestimonialsSection` files are commented out of `page.tsx` — **not rendered, not modified**.

## New palette (defined in `app/globals.css` only)

| Token | New value | Role |
|---|---|---|
| `embassy` | `#241c12` | deep espresso — dark text, headings, button text, scrollbar |
| `chancery` | `#372c1e` | cocoa — scrollbar, remaining dark seal surfaces |
| `diplomacy` | `#47392a` | walnut — dark hovers |
| `court-gold` | `#b98a45` | caramel-gold accent — buttons, numerals, icons, focus rings (5.5:1 on buttons ✓) |
| `gilded-light` | `#c9a05f` | lighter caramel — button hover |
| `champagne-gilt` | `#e4d7bd` | champagne beige — hairlines/dividers |
| `parchment` | `#f4efe3` | cream — section surfaces, forms, cards |
| `marble` | `#fcf9f2` | ivory — page bg, cards, inputs |
| `ink-deep` | `#2b2318` | warm charcoal — body text (13.6:1 ✓) |
| `ink-soft` | `#6d6153` | taupe — muted text (5.3:1 ✓) |
| `sand` *(new token)* | `#ece3cf` | mid beige for section alternation (keeps "multiple beige shades for sections") |
| `success` / `amendment` / `cerise` | unchanged | status colors (already warm, non-purple) |
| `--background` / `--foreground` | `#fcf9f2` / `#2b2318` | body base |

Shadows/drop-shadows: navy tints `rgba(11,27,58,…)` → warm espresso tints `rgba(36,28,18,…)`. Scrollbar: espresso thumb / cocoa track / walnut hover.

## Enforcement rule (keeps contrast strong)

On light beige surfaces, gold/amber (`court-gold`, `amendment`) is used **only for fills, icons, large numerals ≥18px, and focus rings** — never for small-caps eyebrows or ≤16px text. All eyebrows/labels currently in `text-champagne-gilt` (on dark) convert to **`text-embassy`** after the flip. Any existing small amber text on light (e.g., footer tagline) converts to `text-ink-soft`.

## Files to change

**1. `app/globals.css`** — redefine all tokens + shadows + scrollbar per table; register new `--color-sand` in both `:root` and `@theme inline`.

**2. Dark→light flips (rendered components):**
- `home/heroSwiper/heroSwiper.tsx` — section → `bg-marble text-ink-deep`; photo overlay → beige gradient (`from-parchment via-parchment/80 to-parchment/25`); tabs bar → `bg-marble/90 border-ink-deep/10`.
- `home/heroSwiper/slideCopy.tsx` — eyebrow → `text-embassy`; headline gradient → espresso (`text-embassy`) with the `[text-shadow:…]` class removed; body → `text-ink-soft`; secondary CTA → espresso outline; gold primary CTA kept.
- `home/heroSwiper/slideTabs.tsx` — inactive/active text → `text-ink-soft` / `text-embassy`; focus ring → `outline-court-gold`.
- `global/Navbar.tsx` — solid state → `bg-marble/90 border-ink-deep/10`; links/hamburger/drawer/socials → espresso/ink text on `bg-marble`; overlay → `bg-ink-deep/50`.
- `global/LanguageSwitcher.tsx` — inactive label `text-parchment` → `text-ink-soft` (header/drawer are now light).
- `global/Toast.tsx` — surface → `bg-marble border-ink-deep/10`; title/body/close → espresso/ink.
- `about/valuesSection/*` + `valueItem.tsx` — section → `bg-sand text-ink-deep`; eyebrows → `text-embassy`; cards → beige with espresso text; icon circles → `bg-court-gold/15 text-court-gold`.
- `about/visionSection.tsx` — dark quote card → light card (`bg-marble border-embassy/10`), espresso text.
- `about/heroSection.tsx` — hero → `bg-marble text-ink-deep`; photo overlay → beige gradient; eyebrow → `text-embassy`; remove `[text-shadow:…]`.
- `service/serviceHero.tsx` — hero + inclusions panel flipped light; hairlines → `border-ink-deep/10`; check circles → parchment bg + caramel checks.
- `package/packageHero.tsx` — navy apron + inclusions field → light beige; the existing parchment "letter" field stays.
- `home/govermentsLogos/govermentsLogos.tsx` — strip → `bg-parchment border-y border-embassy/10`; eyebrow → `text-embassy`; body → `text-ink-soft`.

**3. Explicitly untouched:**
- Footer `#license` band + About `storySection` facts panel (the **license number areas** — they inherit the new `embassy` espresso value and remain readable dark seal surfaces by design).
- `packagesSection`/`packageCard`/`testimonialsSection` (not rendered — do not recreate).
- Official government SVG logos (purple `#403f68` MoFA mark) and hero photos — external assets, not UI colors.

**4. Docs + optional:**
- `DESIGN.md` — update palette/color narrative to the beige identity so docs match code.
- `app/api/request/route.ts` — optional: swap the email header `#0f2e3d` → espresso for brand consistency (email only, not the site UI).

## Verification

1. `pnpm lint` then `pnpm build`.
2. Purple sweep: grep for `#0b1b3a|#122451|#1b335e|purple|violet|indigo|rgba(11,27,58` across `app/` — expect zero UI hits (only official logos/DESIGN.md-history remain).
3. Contrast spot-check the new pairs (esp. gold-on-espresso buttons ≥4.5:1, ink-on-beige ≥4.5:1).
4. Manual review at desktop + mobile widths: hero, nav (scrolled + drawer), footer, about page, service/package pages, form, toast.