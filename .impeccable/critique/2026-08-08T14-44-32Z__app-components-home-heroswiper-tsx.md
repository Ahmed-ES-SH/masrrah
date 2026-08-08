---
target: critique @app/components/home/heroSwiper.tsx
total_score: 23
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 3
p2_count: 3
timestamp: 2026-08-08T14-44-32Z
slug: app-components-home-heroswiper-tsx
---
# Critique — HeroSwiper (`app/components/home/heroSwiper.tsx`)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2 | Active slide is marked, but autoplay gives no countdown/state and AT users get zero announcement on slide change |
| 2 | Match System / Real World | 4 | RTL Arabic-first, formal register, real KSA destinations — grounded copy, no jargon |
| 3 | User Control and Freedom | 2 | Autoplay (6.5s) has no pause on hover/focus and no pause button — `pause`/`resume` copy exists in both locales but is never rendered |
| 4 | Consistency and Standards | 3 | Tokens faithfully applied, but `role="tablist"` without `tabpanel`/`aria-controls` breaks the ARIA tab pattern; `tracking-[0.14em]` drifts off the 0.08em label spec |
| 5 | Error Prevention | 2 | CTA labels and hrefs swap under the pointer at 6.5s — a visitor aims at one service and can land on another |
| 6 | Recognition Rather Than Recall | 3 | Desktop tabs labeled; mobile tabs are bare "01/02/03" — zero recognition for a first-time visitor |
| 7 | Flexibility and Efficiency | n/a | Marketing hero: single conversion flow, no expert-user acceleration exists |
| 8 | Aesthetic and Miniminist Design | 3 | Lovely restraint, but ~5 gold marks in one viewport exceed the seal rule; the frost strip is glassmorphism-lite, which DESIGN.md bans |
| 9 | Error Recovery | 4 | No input errors; all destinations are real routes; visible 2px gold focus rings |
| 10 | Help and Documentation | n/a | Hero is not a workflow surface |
| **Total** | | **23/32** | **Good (71%)** |

n/a: #7, #10 (marketing hero). All 8 scored heuristics honest.

## Design Specificity Verdict

**Coherent and specific — not category-interchangeable.** Amiri serif display, gold spine rail on the copy column, champagne hairlines instead of shadows, 10px radii (no pills), navy fabric with ≥50% navy martial scrim, logical-property RTL mirroring, and a wipe transition with an official, unhurried 0.8s cadence — this reads "a document signed at a chancery," not a startup template. It could not be spliced into a SaaS hero without breaking; the brand grammar is enforced at the token level (`min-h-12` CTAs, 2px gold focus rings, `rounded-md`, `rtl:scale-x-[-1]` arrow flip, reduced-motion prewired).

**Deterministic scan**: 0 findings in the target (exit 0). Control run over `app/components/home/` emitted 5 findings (`design-system-font-size` off the DESIGN.md type ramp) — all in sibling files (blogSection.tsx:143, countriesSection.tsx:104, HeroSectionV2.tsx:80 ×2, packagesSection.tsx:202), none in this component. The detector can emit findings; the target is a true clean.

**Visual overlays**: unavailable — no browser automation exists in this session; the carousel's runtime render and console errors remain unverified. Static/mechanical analysis only. (Fallback signal.)

## Overall Impression
A genuinely specific, emotionally smart, token-disciplined hero with two real accessibility failures (no pause, broken ARIA tab contract), one Arabic layout hazard on mobile, and a handful of polish gaps — no P0s, and everything is fixable inside the existing design language. The single biggest opportunity: the autoplay motion is quietly arguing against a brand promise of "no surprises."

## What's Working
1. **The slides are a story, not a Swiss-army hero** — constant → contract → aftercare (hero-sliders.ts + `hero.slides`), which follows the product's trust-first mission; the metric capstone lands each slide on a confident crest (peak-end).
2. **Token discipline at the CTA optics** — primary gold/navy with `shadow-apparatus`, secondary champagne hairline + chancery hover, both 48px, both with gold visible focus; the single gold seam (line 113) ties the column into one instrument.
3. **RTL/LTR parity without a second layout** — gradient mirrored with `rtl:lg:`/`ltr:lg:` (line 100) and the arrow with `scale-x-[-1]` (line 135), exactly per DESIGN.md.

## Priority Issues
| Sev | Issue | Context | Suggested command |
|-----|-------|---------|--------------------|
| P1 | **Autoplay cannot be stopped**, paused, or held — WCAG 2.2.2 failure. 6500ms > 5s with no mechanism; no pause on hover/focus; CTA label+href can swap between aiming and clicking | Lines 43–53; the fix is essentially bought and paid for — `pause`/`resume` strings exist in en.json:69–70 / ar.json:70–71, never rendered | `/impeccable polish` |
| P1 | **ARIA tablist without a tab panel** — `role="tablist"`/`role="tab"` + `aria-selected` with no `tabpanel`, `aria-controls`, or arrow-key roving. Screen-reader users hear "tab 2 selected" while content silently swaps behind them. Fix: implement the full tabs pattern, or drop `role="tab"` on directional buttons + add `aria-live="polite"` with `aria-atomic` on the copy container | Lines 162–178 | `/impeccable polish` |
| P1 | **Arabic headline measure on 360px** — `max-w-[11ch]` assumes Latin digit shaping; Amiri's Arabic shaping compresses the measure, so the headline wraps 4–6 lines at 28px with a tight `leading-[1.08]` (DESIGN.md says lh 1.2). Measure in `rem` and loosen line height | Lines 120–121 | `/impeccable adapt` |
| P2 | **Contrast over imagery can't be certified** at the `lg:items-center` stop — copy sits at the ~50% mark of a `via-embassy/55` gradient over a bright photo; `text-parchment/80` and `/65` are not AA-guaranteed there. Strengthen the gradient via stop to ≥70%, or set the copy on a chancery-tinted panel | Lines 100, 124, 147 | `/impeccable audit` |
| P2 | **Strip overlaps the content** on short viewports (~640–700px tall): content bottom `pb-xxl` (64px) vs. the ~73px bar at `z-20` above `z-10` — the metric row can slip under the motorcade | Lines 105, 158 | `/impeccable adapt` |
| P2 | **Tab targets are 40px tall**, under the 44px AA guideline, on the one interactive strip in the fold | Line 177 | `/impeccable adapt` |

## Persona Red Flags

**Jordan (first-timer, mobile 360px):** headline wraps to 4–6 lines on the held `ch` measure; mobile tabs are bare "01/02/03" numbers that tell nothing of what's behind each slide (his only option is "wait and read"); both CTAs and tabs live at ~40px-thumb extremes under the bar while autoplay keeps changing the content underneath.

**Sam (keyboard + AT + reduced-motion):** reduced-motion is the one clean corner (autoplay dies instantly, transitions zero). Then: the fake tablist ignores the arrow keys; the copy under his cursor is swapped by autoplay mid-activation (fails focus-pause); the copy container announces nothing between slides (`aria-live` absent). The photo `alt` strings are properly buried under `aria-hidden` — don't let anyone "fix" that later.

**Casey (distracted, one hand):** no swipe gesture; only the 40px number strip at the thumb zone; tap → slide rotates just before commit → he lands on a different service flow; the `bottom-[-13px]` gold marker bleeds over the hairline and crowds his tap area.

## Minor Observations
- `AnimatePresence` mismatched phases: images `mode="sync"` (line 80) vs. copy `mode="wait"` (line 106) — watch for a double-flash on entry.
- The gold marker sits `bottom-[-13px]` over the strip's hairline — intentional bleed or let the strip embrace the hairline deliberately.
- Metric row is a slogan, not a metric — correct restraint per PRODUCT (no invented stats); reserve the seat for a confirmed license number.
- `tracking-[0.14em]` drifts from the system's 0.08em label tracking (line 115).
- `virtual triggers: only the `preload` first image preloads — slow-mobile slide changes jump-cut (acceptable, but be aware).

## Questions to Consider
- If the hero were one static statement ("a trusted worker starts with one step") with the gold CTA pinned, and slides 2–3 demoted below, would conversion rise? The hero can't promise "one unambiguous next step" while rotating six destinations.
- Who is the slide chrome for — the visitor or the owner? Three CTAs to three different services makes the hero a landing and a sitemap simultaneously.
- Gold never rotates in an embassy; should a trust-first brand's hero rotate at 6.5s at all — or should the spare, unhurried register have its message stand still?
