---
name: Masarrah — مسرة للاستقدام
description: Embassy-grade navy-and-gold trust for a Saudi recruitment house — formal, institutional, ceremonial.
colors:
  embassy: "#0B1B3A"
  chancery: "#122451"
  diplomacy: "#1B335E"
  court-gold: "#C9A227"
  gilded-light: "#E1BE5E"
  champagne-gilt: "#F0D889"
  parchment: "#F5EFDD"
  marble: "#FFFFFF"
  ink-deep: "#111318"
  ink-soft: "#4A4E5A"
  success: "#2E7D5B"
  amendment: "#B8862E"
  cerise: "#B3403A"
typography:
  display:
    fontFamily: "Amiri, Noto Naskh Arabic, Georgia, serif"
    fontSize: "clamp(1.75rem, 5vw, 3rem)"
    fontWeight: 700
    lineHeight: 1.2
  headline:
    fontFamily: "'Amiri', 'Noto Naskh Arabic', Georgia, serif"
    fontSize: "clamp(1.375rem, 2.8vw, 2.125rem)"
    fontWeight: 700
    lineHeight: 1.25
  title:
    fontFamily: "'Inter', 'IBM Plex Sans Arabic', sans-serif"
    fontSize: "clamp(1.125rem, 1.4vw, 1.5rem)"
    fontWeight: 600
    lineHeight: 1.3
  body:
    fontFamily: "'Inter', 'IBM Plex Sans Arabic', sans-serif"
    fontSize: "clamp(0.9375rem, 1vw, 1rem)"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "'Inter', 'IBM Plex Sans Arabic', sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 500
    letterSpacing: "0.08em"
rounded:
  sm: "6px"
  md: "10px"
  lg: "12px"
spacing:
  xxs: "4px"
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "32px"
  xl: "48px"
  xxl: "64px"
components:
  button-primary:
    backgroundColor: "{colors.court-gold}"
    textColor: "{colors.embassy}"
    typography: label
    rounded: "{rounded.md}"
    padding: "14px 32px"
    height: "48px"
  button-on-navy:
    backgroundColor: "{colors.court-gold}"
    textColor: "{colors.embassy}"
    rounded: "{rounded.md}"
    padding: "14px 32px"
    height: "48px"
  input-field:
    backgroundColor: "{colors.marble}"
    textColor: "{colors.ink-soft}"
    rounded: "{rounded.sm}"
    height: "48px"
    padding: "12px 16px"
  card:
    backgroundColor: "{colors.marble}"
    rounded: "{rounded.lg}"
    padding: "24px"
  card-navy:
    backgroundColor: "{colors.chancery}"
    textColor: "{colors.parchment}"
    rounded: "{rounded.lg}"
    padding: "24px"
  stat-number:
    textColor: "{colors.court-gold}"
    typography: display
  fab-whatsapp:
    backgroundColor: "{colors.court-gold}"
    textColor: "{colors.embassy}"
    rounded: "9999px"
    size: "56px"
---

# Design System: Masarrah — مسرة للاستقدام

## Overview

**Creative North Star: "The Embassy Hall"**

Masarrah is not a startup polished white. It is a sovereign room — a place of record where foreign workers are brought into Saudi homes and companies with formality, ceremony, and absolute legal assurance. The brand wears the dress uniform of an embassy: walls of deep mission navy, beading of restrained gold, and a staff that speaks in full, unhurried sentences. Every surface below exists to make a visitor feel *on hallowed ground* — that their household, their employee, and their contract are being handled by an institution, not a middleman.

The system is **monumental but quiet**: one navy canvas, one gold accent, generous white space, hairline borders instead of shadows, and typography that carries the state's word. Density is spare — the recruitment catalog never feels like a marketplace. Depth is conveyed by tonal layering rather than elevation; a card floats only when it must call for attention (a hover, a floating WhatsApp button, a dialog).

The relationship between navy and gold is deliberate and ritualistic: navy is the estate itself, gold is the signature that seals decisions. Gold appears as gilding — an eyebrow, a CTA, a crest — never as a wash across a surface. The mark's two arcs (a gold "M" reading as a figure in a necktie) are not decorative: the necktie is the embassy uniform, and the gold "M" is the only place metallic gradient is ever allowed.

**Key Characteristics:**
- A single navy estate (deep navy surfaces) with gold used as a **seal**, never a palette — ≤10% of any screen.
- Borders over shadows: 1px hairline is the depth language; shadows are reserved for floating elements.
- Formal stillness: restrained 150–250ms transitions, no bounce, no scale-on-hover, no parallax in page chrome.
- Arabic first (RTL), English as a faithful mirror via logical properties — never two hand-built layouts.
- Accessible by default: 44px touch targets, small gold text banned, full `prefers-reduced-motion` support.
- The ◆ diamond and the necktie silhouette are the only recurring brand motifs — used as ceremony, never as filler.

## Colors

The palette is **an embassy at dusk** — a deep, near-black navy estate, gilded gold seals, parchment accents, and ink that never fights the navy.

### Primary
- **The Embassy** `#0B1B3A` — the flagship surface. Header, footer, hero, and every dark UI section. The color a visitor sees first. Text on embassy is always white or parchment; never small gold.
- **The Chancellery** `#122451` — the embassy's interior panels: cards and side panels sitting on navy surfaces, one step lighter than the field.
- **Diplomatic Station** `#1B335E` — the hover state on navy surfaces; a quiet lift rather than a shift.

### Secondary
- **Court Gold** `#C9A227` — the only accent. Primary buttons, active links, the stat numerals, the focus ring, and the WhatsApp seal. Never set small body copy in gold on any background; for text it's reserved for headlines ≥18px/bold, labels, and icons.
- **Gilded Light** `#E1BE5E` — hover pass on gold elements; the touch of warmth on a pressed button.
- **Champagne Gilt** `#F0D889` — hairline accents on navy (30% opacity), badges, and fine dividers.

### Neutral
- **Parchment** `#F5EFDD` — the soft ivory of light-mode section cards and the embassy's letter. The alternative to white.
- **Marble** `#FFFFFF` — page backgrounds in light mode, body text on navy, and the input face.
- **Ink** `#111827` — primary body text on light surfaces. Dense, formal, never gray.
- **Ink Soft** `#4A4E5A` — secondary and muted text; captions under numerals.

### Status
- **In Order** `#2E7D5B` — success and confirmation (contract active, request received).
- **Under Review** `#B8862E` — warm pending, never alarm-red.
- **Needs Attention** `#B3403A` — errors, rejected/cancelled status. Pair every status color with a text label — color is never the sole indicator.

**The Gilding Rule.** Gold is a seal, not a wash. On any screen, gold covers at most ~10% of the visible area: one primary CTA, an eyebrow, a stat numeral. If a section starts to look "gold-themed", gold has been overused.

**The Flat Gilding Rule.** The metallic gradient in the logo is a brand-mark-only effect. In UI, always flat `gold 500` (`#C9A227`) for buttons, links, icons, and numerals. Gradients at small sizes are illegible and fail contrast.

## Typography

**Display font:** Amiri (Arabic serif) · **Latin display:** Cormorant — the cursive-serif voice of the wordmark, reserved for hero moments.
**Body font:** Inter (Latin) · Gestalt of the Arabic body: IBM Plex Sans Arabic — always the working voice, never decorative.
**Numeral rule:** Western (Latin) numerals in all copy — standard for KSA commercial sites (phones, prices, dates).

**Character:** The embassy speaks in serif commands and sans-serif replies. Display is calligraphic and grave; the body is quiet, human, and extremely readable at 15–16px.

### Hierarchy
- **Display** (700, `clamp(1.75rem, 5vw, 3rem)`, lh 1.2): hero lead-in and major section opens on navy. Amiri.
- **Headline** (700, `clamp(1.375rem, 2.8vw, 2.125rem)`, lh 1.25): sub-sections, detail-page headers.
- **Title** (600, `clamp(1.125rem, 1.4vw, 1.5rem)`, lh 1.3): card titles, accordion questions, nav items.
- **Body** (400, `clamp(0.9375rem, 1vw, 1rem)`, lh 1.6, max 65–75ch): the voice of the page. Never set in gold; ink on parchment, parchment on navy.
- **Label (Caps)** (500, 0.8125rem, +0.08em tracking): small-caps eyebrows on section labels, flanked by ◆ diamond dividers, nav meta.

**The Latin Numerals Rule.** Arabic sentences use Western numerals — "27 عاماً" not "٢٧". Phone numbers, prices, stats always appear with Latin digits.

**The One Display Rule.** The serif voice is for hero and section openings only. It must never appear in dense UI copy, labels, or multiple headings on one screen — one serif crown per page.

## Layout

- **Container:** max-width 1280px, centered, 16px gutters on mobile / 24px tablet / 32px desktop.
- **Grid:** 4 columns mobile, 8 tablet, 12 desktop on an 8px baseline (8/16/24/32/40/48/64/96).
- **Section rhythm:** 64px vertical padding mobile, 96–120px desktop. Backgrounds alternate marble → parchment → navy → marble to pace the walk; the light/dark swing is the page's only choreography.
- **RTL is the substrate.** Build with logical properties everywhere (`padding-inline-start/end`, `ms-*`, `pe-*`) so `dir="rtl"` (Arabic, the default) and `dir="ltr"` (English) are the same layout mirrored. Icons with inherent directionality (arrows, chevrons) flip with `dir`; do not hand-build an LTR variant.

## Elevation & Depth

**The Flat-By-Default Rule.** Depth is carried by tonal layering — navy on parchment, chancellery on embassy — never by shadow. Surfaces are flat at rest; elevation and shadow appear **only as a response to state** (hover, an open dialog), never as ambient decoration.

**Hairline over shadow:** prefer a 1px border (parchment-line on light surfaces; gold at 30% opacity on navy) to a drop shadow, for the institutional sheet-metal weight.

### Shadow Vocabulary
- **Float** (`0 8px 24px rgba(11,27,58,0.12)`): the one elevation for floating panels, menus, dialogs — a soft hover lift becomes a gentle float.
- **Apparatus** (`0 6px 16px rgba(11,27,58,0.25)`): the WhatsApp call-to-action, the single floating brand seal on every page.

## Shapes

- **Corner radius is deliberate, not soft.** Cards, buttons, inputs pull a moderate **8–12px** (`rounded.sm 6px`, `rounded.md 10px`, `rounded.lg 12px`). Full-pill shapes are banned — they read as playful consumer apps, and an embassy does not manufacture play.
- **Border over shadow** carries the line: 1px hairlines in parchment (light) or gold at 20–30% opacity (on navy), never heavy black rules.
- **Signatures in geometry:** the ◆ diamond divider (the eyebrow's punctuation) and the necktie silhouette (used once as a page watermark or a load mark) are the only recurring geometry. No free-standing decorative shapes around the site.

## Components

### Buttons
- **Shape:** radius `rounded.md` (10px), min-height 48px, padding 16/32px on desktop.
- **Primary:** fill **Court Gold** `#C9A227`, text **Embassy Navy** `#0B1B3A`, weight 600. The one gold seal per screen. Focus: visible 2px gold ring offset 2px.
- **Hover / Focus:** fill → **Gilded Light** `#E1BE5E`, 150ms ease-out, no scale.
- **Secondary (outline):** 1.5px **Court Gold** border, navy text; on navy sections, parchment text — hover fills gold at 15% (or chancellery on dark).
- **Text link:** navy, underline on hover only, gold only for the active/current item (nav, tabs). On navy: gold-400, underline on hover.

### Cards / Containers
- **Corner:** `rounded.lg` (12px).
- **Style:** Marble bg on light sections or **Chancellery** `#122451` on navy; 1px hairline border in parchment/ink at 15%; no shadow at rest.
- **Inner padding:** 24px (`spacing.md`).
- **Hover**: translateY(-2px) lift + the float shadow, 150ms ease-out — a card that steps one pace toward you, physically measured.
- **Whole card is a tap target** — the service grid slot. Grid: 3–4 columns desktop, 2 tablet, 1 mobile.

### Inputs / Fields
- **Face:** Marble `#FFFFFF` field, 1px border in ink at 15%, radius `rounded.sm` (6px), 48px tall.
- **Focus:** gold 2px ring (`#C9A227`), no glow.
- **Error:** "Needs Attention" `#B3403A` border + a text message; **Disabled:** parchment fill, ink-soft label text.

### Accordion (FAQ)
- **Style:** one open per row (exclusive), ink‑900 question, inside white with a hairline rule between items.
- **State:** chevron in navy, turns **Court Gold** when its item is open; answer set in Ink Soft. Keyboard: arrow keys move, Enter/Space toggles; open item collapses when another opens.

### Stats / Numerals
- **Style:** court-gold color, **Display** 32–48px weight 700, **Latin numerals** always, with `ink-soft` uppercase caption below.

### Navigation (Header)
- **Style:** embassy navy bar, brand left (mirrored right in RTL), and in the trailing cluster the phone `tel:` tap target plus a small gold WhatsApp link — reachable on every breakpoint, including mobile. The rest of the nav is a minimal drawer with the two links (services, contact) — never a mega-menu in this phase.
- **Active/current:** gold text, `◆` + label; nav is minimal by design (2 links), never a mega-menu in this phase.

### Floating WhatsApp
- **Style:** fixed bottom-end, 56px circle, **Court Gold** fill, navy glyph, the `Apparatus` shadow, respects RTL mirror (bottom-inline-end). Zero-dependency: a plain `<a href="https://wa.me/…">` — works even if the backend is down.

## Do's and Don'ts

### Do:
- **Do** reserve Court Gold for the one primary CTA per screen; gold is a seal, and more gold makes it less important gold.
- **Do** set body paragraphs in **Ink** on parchment and **white** on navy — gold never appears under 18px as body text.
- **Do** lead the page's emotional rhythm with the light/dark banding (marble → parchment → navy → marble).
- **Do** keep Arabic default and RTL with logical properties; English is the mirror.
- **Do** give every tappable a 44×44px touch area and respect `prefers-reduced-motion` (disable lifts, fades, and the accordion animation).

### Don't:
- **Don't** use full-pill radius, glassmorphism, heavy gradients — the embassy is not tech-startup retail.
- **Don't** put a necktie motif on every other block; it's the signature stamp, mark of the mark only.
- **Don't** use shadows as background depth; shadow means "this floats now" (dialog, FAB), nothing else.
- **Don't** hand-build a separate English layout — mirror Arabic with logical props.
- **Don't** ship gold text on parchment and don't set small-caps gold anywhere below 18px. Contrast is the seal of the contract.