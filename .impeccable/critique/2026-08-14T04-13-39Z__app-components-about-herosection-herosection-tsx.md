---
target: about heroSection + storySection
total_score: 26
max_score: 40
na_heuristics: 
p0_count: 0
p1_count: 2
timestamp: 2026-08-14T04-13-39Z
slug: app-components-about-herosection-herosection-tsx
---
# Critique: About page — heroSection.tsx + storySection.tsx

Method: dual-agent (A: ses_0018a0504ffemFQVYbiRSOml · B: ses_00189f868ffePb41hx3uvxe7MM)

## Design Health Score: 26/40 (Acceptable)

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Static page; no cue that conversion lives at the top on a long page |
| 2 | Match System / Real World | 2 | Copy speaks institution-greek ("developing the Kingdom's HR sector"); Musaned — the word the audience knows — is absent from this page |
| 3 | User Control and Freedom | 3 | Locale-aware CTA works; no way back to the CTA from page bottom |
| 4 | Consistency and Standards | 2 | ◆ vs ◈ eyebrow glyphs; leading-7/leading-8 drift on one body token; shadow-apparatus (FAB's reserved seal) on a static card; story+vision both parchment |
| 5 | Error Prevention | 3 | No inputs; deep link uses stored locale — low risk |
| 6 | Recognition Rather Than Recall | 3 | Eyebrow→display→body→CTA mirrors home hero; system memory works |
| 7 | Flexibility and Efficiency | 3 | Single simple path; nothing needed beyond it |
| 8 | Aesthetic and Minimalist Design | 2 | Ghost marble band, duplicate vision/mission, blur+shadow+brackets+arch stacking on one card |
| 9 | Error Recovery | 3 | Nothing errors here |
| 10 | Help and Documentation | 2 | License/verification lives only on home (en.json:494-499); the institution's documenting page documents nothing verifiable |
| **Total** | | **26/40** | **Acceptable** |

## Design Specificity Verdict

**Specific in material, category-interchangeable in voice.**

The navy estate, gold-as-seal discipline, locale-mirrored scrim, arch keystone and charter panel are bespoke — no white-SaaS template. But the serif voice DESIGN.md reserves for hero moments is never loaded: `globals.css:21-25` binds display/headline to Inter, and `html[lang="ar"]` (lines 108-109) uses Thmanyah Sans for every token. Amiri/Cormorant are absent. The hero h1 renders in the same geometric sans as the body — strip the navy/gold and the page is any Arabic corporate boilerplate.

Deterministic scan (detect.mjs): **0 findings, exit 0** — clean. Reduced-motion gating, decorative-image ARIA, and aria-labelledby wiring all pass. No false positives.

Browser visualization: skipped — no browser automation tool exposed in this harness.

## Overall Impression

The embassy material is real and the gradient scrim thinking is genuinely smart, but the page's own rules aren't enforced against it: four gold gestures on one hero, the serif crown missing, duplicate vision/mission, and zero verifiable trust evidence on the most trust-dependent surface of the site.

## What's Working

1. **Locale-mirrored scrim** (heroSection.tsx:49) — `bg-gradient-to-t` mobile + `rtl/ltr:lg:` side variants; the darkest scrim always lands behind the card in either direction. The most thoughtful line in both files.
2. **Reduced-motion gating done correctly** (heroSection.tsx:30,60,63) — instant fully-visible content, no frozen half-states.
3. **The charter panel's structure** (storySection.tsx:69-89) — hairline gold rules, `ps-md`, watermark ◆, dt/dd intent: the closest thing on the page to the "document/state's word" language.

## Priority Issues

### P1 — The trust page has no trust evidence
- **What**: The only verifiable facts the company owns (license + Musaned, keys in the home trust band, en.json:148-159) render nowhere on this page.
- **Why**: A cautious Saudi household deciding to hand over their home and salary reads story+vision+values and finds nothing to check.
- **Fix**: Add a license line + "Verify via Musaned" row in the charter panel, reusing the existing license/musaned translation keys.
- **Command**: /impeccable delight, /impeccable harden

### P1 — The serif voice of the world is absent
- **What**: `--font-display`/`--font-headline` map to Inter/Thmanyah Sans; no Amiri (AR) or Cormorant (EN) is loaded anywhere (globals.css:21-25, 108-112).
- **Why**: The one moment DESIGN.md crowns with serif — the hero h1 — renders as body type at a bigger size; the "state's word" is undifferentiated.
- **Fix**: Load Amiri + Cormorant, bind to display/headline tokens, then enforce one display crown per page (story h2 → headline scale).
- **Command**: /impeccable typeset, /impeccable document

### P2 — Duplicate content across adjacent sections
- **What**: Vision/mission appear verbatim in the story charter (ar/en.json ~522-527) and again in VisionSection (~535-537); both hero and story eyebrows read "من نحن" (ar.json:508, 514).
- **Why**: Arabic readers see "رؤيتنا/رسالتنا" twice in two scrolls and the same section label twice; feels like two documents or one.
- **Fix**: Cut vision/mission from the charter (let it carry license + process promise instead) or collapse VisionSection; retitle one eyebrow.
- **Command**: /impeccable distill

### P2 — Hero card violates the elevation vocabulary
- **What**: `shadow-apparatus` (storySection.adjacent — DESIGN.md's reserved single floating seal for the WhatsApp FAB) and `backdrop-blur-md` (banned glassmorphism) on heroSection.tsx:64, plus corner brackets (lines 66-73) — free-standing geometry outside the ◆/necktie rule.
- **Why**: The fold is busy with four gold gestures (CTA, brackets, hairline, arch) on a system whose rule is "one seal" and "borders over shadows".
- **Fix**: Drop shadow+blur for `bg-embassy/75` + existing hairline; either bless the brackets as a document-seal motif or remove them.
- **Command**: /impeccable quieter, /impeccable distill

### P3 — Keystone renders the wrong material
- **What**: `GateArchMotif` (heroSection.tsx:12-25) only sets `stroke-court-gold/20`; the keystone's `fill="currentColor"` inherits parchment. The arch strokes gold-at-20% while its keystone is solid parchment — VisionSection's arch does this correctly.
- **Why**: A visual artifact on the page's most symbolic stone.
- **Fix**: Add `text-court-gold/55` (or explicit fill) to the svg.
- **Command**: /impeccable polish

### P3 — Flat ending, no closing beat
- **What**: The page terminates on value cards; ~1,500 words of trust-building with no repeat path after the hero CTA.
- **Why**: Peak-end rule violated — the journey ends on the weakest beat with no reassurance or next step.
- **Fix**: A quiet secondary link under values ("Start your request").
- **Command**: /impeccable polish

## Persona Red Flags

**Jordan (first-time Saudi household client, Arabic, 360px phone)**
- The single gold action (`min-h-12 w-full`, heroSection.tsx:90) lands at/below the 640px fold (hero budget 72svh + pt-32); he must scroll to find the "unambiguous next step" the product promises in 5 seconds.
- His primary question — "هل هذي مرخّصة؟" — has no answer on this page. No Musaned path exists from the only page built to earn his trust.

**Sam (screen reader / reduced-motion)**
- Reduced-motion handling is excellent. But the charter panel's `dt`/`dd` (storySection.tsx:73-89) sit in plain divs, not a `<dl>` — invalid structure; screen readers may announce vision/mission as stray text.

**Casey (mobile touch, English)**
- 48px target ✓ — but she gets the full sensory stack (blur + shadow + brackets + arch) on a 328px card; backdrop-blur over a full-bleed photo costs iOS Safari repaints mid-scroll.

## Minor Observations

- `Section`'s `py-xxl` overridden by `pt-32 pb-24` (heroSection.tsx:37) — correct only by Tailwind ordering luck.
- Body leading drift: `leading-8` hero/story vs `leading-7` charter dd — three spacings for one token.
- Section banding: story + vision both parchment — dark→light→light→dark, the DESIGN.md "walk" breaks.
- `bg-marble/50` ghost band (storySection.tsx:20) — near-invisible, no purpose a visitor could name.
- Eyebrow glyph drift: ◆ (hero/story) vs ◈ (vision).
- `useLocale() ?? "ar"` (heroSection.tsx:29) is dead code — the hook default is `"en"`.
- Hero arrow hover translates the RTL-flipped arrow *toward* the text (heroSection.tsx:94) — wrong direction in Arabic.

## Questions to Consider

1. If Amiri was supposed to make the "state's word" legible and nothing loads it, what — besides navy and gold pixels — stops the hero h1 from being any consultancy's headline?
2. Would any household client say "نطوّر قطاع إدارة الموارد البشرية في المملكة" while deciding whom to trust their home to — and why is that the h1 at the emotional peak?
3. The license + Musaned content already exists in the home trust band — why does the most trust-dependent page not reuse those exact keys?
4. Four gold gestures on one hero: if the rule is "one seal per screen," which of CTA, brackets, hairline, and arch are decoration?
5. The keystone quietly renders parchment instead of gold — what else is rendering the wrong material without anyone looking?
