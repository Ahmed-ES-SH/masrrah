---
target: critique @app/components/home/govermentsLogos.tsx
total_score: 20
max_score: 32
na_heuristics: 9,10
p0_count: 1
p1_count: 2
timestamp: 2026-08-10T23-59-49Z
slug: app-components-home-govermentslogos-tsx
---
## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2 | Motion shows "alive" but no pause indication; hover state never fires (dead code) |
| 2 | Match System / Real World | 3 | Ministry names natural; Arabic logo alts leak into EN mode |
| 3 | User Control and Freedom | 2 | Autoplay loops forever with no stop; pauses only on mouse enter, not keyboard focus (WCAG 2.2.2) |
| 4 | Consistency and Standards | 3 | Token-true to sister sections; quieter title size (`text-headline` vs siblings' `text-display`), duplicate section naming |
| 5 | Error Prevention | 3 | Decorative surface, nothing can error; pass |
| 6 | Recognition Rather Than Recall | 2 | 2.2 s autoplay forces speed-reading dimmed logos; 4 repeats cycle faster than first-time proof can sink in |
| 7 | Flexibility and Efficiency | 2 | Drag + arrow keys, but no visible nav, no pause affordance, no preference persistence |
| 8 | Aesthetic and Minimalist Design | 3 | Gold discipline respected; 16 repeating slides + 80 % dimming of the only content adds noise |
| 9 | Error Recovery | n/a | Nothing can error — decorative band |
| 10 | Help and Documentation | n/a | Nothing to help on — decorative band |
| **Total** | | **20/32** | **Acceptable (62.5 %)** |

## Design Specificity Verdict

**LLM assessment — category-interchangeable.** The chrome is genuinely Masarrah: `bg-diplomacy`, champagne-gilt eyebrow flanked by gold hairlines, Amiri section title, parchment text, reduced-motion gating — all token-verified against globals.css. But the *content* is a generic Saudi trust band: "licensed and registered" + four standard ministry lockups, unlinked and dimmed at 80 % opacity, is the exact strip any bank, school, or staffing firm could ship unchanged. Nothing ties it to Masarrah — no MUSANED registration number, no "verify our licence" path, no Masarrah-specific phrasing. The one claim this section exists to prove cannot be validated by the visitor. For a trust-first persuasive surface, the proof is generic while the claim is specific-sounding.

**Deterministic scan.** Target file clean: `detect.mjs` exit 0, zero findings. A directory scan over `app/components/home/` surfaced 7 `design-system-font-size` advisories (`text-[9rem]` etc.), all in *other* sections (blogSection.tsx:147, countriesSection.tsx:102/139, packagesSection.tsx:199, testimonialsSection.tsx:84/114/160) — decorative watermark glyphs, real but out of scope for this target. No findings reference the target; no inline-ignore syntax used anywhere.

**Visual overlays.** No browser automation tool is exposed in this harness, so no live-server/injection overlay was possible. This critique is source-evidence + token-verified CSS math; the P0 contrast claim was re-verified directly in globals.css (`--background: #ffffff`, `--color-diplomacy: #1b335e`).

## Overall Impression

This is the strongest credibility beat on the page and it is quietly defeating itself: `bg-diplomacy/50` over the white body renders as a pale slate band (#8D99AE), so the embassy-dark surface the design system promises ships as a washed-out wash — the parchment heading sits at ~2.5:1 contrast. The section's motion (2.2 s autoplay) is faster than the hero's, its only interaction is dead code, and Sam hears 16 repeated slide announcements for 4 logos. The single biggest opportunity: make this a still, ceremonial strip of official seals on solid navy — formal stillness is the design language, and the logos are the one thing a Saudi household stops to read.

## What's Working

1. **Reduced-motion handling is exemplary** — `useReducedMotion()` gates `initial` states, forces zero-duration transitions, disables autoplay, and zeroes swipe speed (govermentsLogos.tsx:47, 62, 95, 112, 118).
2. **RTL correctness** — `dir={locale === "ar" ? "rtl" : "ltr"}` on the Swiper, logical properties throughout, locale-change remount via `key={locale}`; no hand-built LTR path.
3. **Token and gold discipline** — every utility class verified against globals.css (all exist), zero hardcoded colors, gold confined to hairlines + label flourish; `unoptimized` correctly set for SVGs.

## Priority Issues

1. **[P0] The section renders as a pale slate, not an embassy surface.** `bg-diplomacy/50` blends #1B335E at 50 % over the white body background → effective #8D99AE. Computed contrast: heading ≈ 2.5:1, body at `text-parchment/75` ≈ 2.1:1 — both fail WCAG AA 4.5:1 by roughly half. DESIGN.md promises deep-navy surfaces.
   - **Why it matters:** the page's central proof element is illegible and reads as washed-out, not official. Sam fails it outright; the Saudi household's whole trust moment is greyed.
   - **Fix:** solid `bg-embassy` (or `bg-chancery`), same as platformSection.tsx:46; nudge body copy to `text-parchment` full opacity. Re-check contrast after.
   - **Suggested command:** /impeccable polish (or /impeccable adapt)

2. **[P1] Autoplay never pauses on keyboard focus and has no stop control.** 2200 ms delay, `disableOnInteraction: false`, `pauseOnMouseEnter` only (govermentsLogos.tsx:118–127). A keyboard user gets continuous motion while navigating — WCAG 2.2.2 fail.
   - **Why it matters:** proof content that speeds past while the user tries to read it. Also Casey's eye is stolen by a *trust element* mid-scroll on mobile.
   - **Fix:** add `pauseOnFocus: true` (or better, `disableOnInteraction: true`), or drop autoplay entirely — the DESIGN language's formal stillness argues for a still, drag-only strip of seals.
   - **Suggested command:** /impeccable animate

3. **[P1] Hover interaction is dead code.** `pointer-events-none` on the `Image` (govermentsLogos.tsx:144) means `hover:opacity-100` can never fire — logos stay at 80 % forever. Dimmed *proof* is a self-contradiction.
   - **Why it matters:** Jordan hovers and nothing happens; the marks read as old/unofficial at 80 % opacity.
   - **Fix:** move hover to the slide wrapper, or drop the interaction and raise base opacity to 95–100 %.
   - **Suggested command:** /impeccable polish

4. **[P2] a11y tree noise: duplicate naming + 16 slide announcements.** `aria-label` + `aria-labelledby` both set (one wins, other is dead; inherited pattern from servicesSection), plus Swiper's `containerRoleDescriptionMessage` and `slideRole: "listitem"` — the section is named twice, then 16 duplicate slide announcements for 4 logos.
   - **Why it matters:** screen-reader users get a wall of redundant nav. Sam's trust moment is noise.
   - **Fix:** keep `aria-labelledby` only; drop the duplicate `aria-label` and role-description; mark the 12 repeated slides `aria-hidden="true"` (or render 4 unique slides + an sr-only "أخرى/and more" note).
   - **Suggested command:** /impeccable audit

5. **[P2] EN mode announces Arabic ministry names.** `alt={t.logoAlt + logo.alt}` concatenates hardcoded Arabic (`وزارة الخارجية`) even in the English locale → "Logo of وزارة الخارجية".
   - **Why it matters:** bilingual parity broken at the one accessible surface of the section.
   - **Fix:** per-locale alt map keyed by logo id in translations, or keep the single Arabic alt deliberately and drop the prefix splice.
   - **Suggested command:** /impeccable harden

## Persona Red Flags

**Sam (a11y):** four independent failures in a section whose entire purpose is reassurance — P0 contrast (2.1–2.5:1), autoplay not pausing on focus (WCAG 2.2.2), 16 repeated slide announcements, and duplicated section labelling.

**Jordan (first-timer):** cannot verify the core claim — no licence numbers, no links to click, no "verify" path; the ministry logos are the product for this audience and they render dimmed and moving. Hover expectations (80 % → 100 %) never fire.

**Casey (distracted mobile, 360px):** the carousel moves itself every ~2.9 s while she scrolls; `grabCursor` + loop can hijack vertical scroll gestures. Worst case she retains "something was moving" and never the copy.

**Saudi-household persona:** official-recognition culture makes these marks near-seals — rendering the single most persuasive element at 80 % opacity on a diluted slate band, sandwiched between light sections, quietly negates the navy/gold formality this audience associates with officialdom.

## Minor Observations

- `speed: 700` + `delay: 2200` ≈ 2.9 s cycle — faster than the hero's 6.5 s, against DESIGN.md's 150–250 ms formal stillness.
- `spaceBetween: 72` at ≥1024 px leaves 6 logos drifting sparsely in a wide band.
- 1000×1000 SVGs (~115 KB for وزارة الخارجية) with `unoptimized` and no `decoding="async"` hint.
- Uneven lockups: 276×155 (مساند) vs 1000×1000 squares all forced to the same height → alternating big/small weight in the strip.
- Alt granularity inconsistent: brand name ("مساند") vs institution ("وزارة الخارجية").
- The `slides.length > 0` empty-state branch is unreachable (constant 16-slide array) and `useLocale() ?? "ar"` never nulls; P3 dead code.
- `text-headline` makes this the quietest section title on the page (siblings use `text-display`).

## Questions to Consider

- **You animate the proof at 2.2 s and dim it to 80 % — but the logos are the one thing a Saudi household actually stops to read.** If this section exists to be believed slowly, why is it engineered to be hard to look at?
- **Verification or decoration?** If Jordan can't click through to a MUSANED profile or licence page, the ministries are ornament — so would a still, ceremonial strip of seals (formal stillness, no motion) say "official" harder than a carousel?
- **Which surface is real?** DESIGN.md promises a deep-navy embassy band; the delivered blend over white is a pale slate that fails WCAG AA. Does this section belong as the page's one dark beat (solid navy), or should it surrender to the light banding?
