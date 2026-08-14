# About Us Page — Plan

## Design plan

**Subject pinned:** Masarrah HR is a licensed Saudi recruitment house. The page's single job: *present the company as an institution of record* — who it is, what it promises (vision/mission), and the principles it works by (values). Audience: households and companies considering a recruitment contract, deciding whether to trust this house with their employees.

**The three sections:**
1. **Hero (navy)** — a charter statement: "Developing the Kingdom's human-resources sector."
2. **Story (parchment)** — the two "About Masarah HR" paragraphs + Vision & Mission in a navy charter panel (mirrors the home two-column section shape, `whoUs`'s successor).
3. **Values (navy)** — the PDF's own "Our Values": Teamwork, Visionary, Commitment, Passion, Alignment, with the react-icons the PDF explicitly requests.

## Tokens (all derived from DESIGN.md, no new colors)

- **Colors:** embassy `#0B1B3A` (hero + values + charter panel), chancery `#122451` (cards), court-gold `#C9A227` (seals, icons, numerals), champagne-gilt `#E1BE5E` (hairlines on navy), parchment `#F5EFDD` (story band), ink-deep/ink-soft (light text), marble `#FFFFFF`.
- **Type:** Amiri serif display (hero crown only), Inter/IBM Plex Sans Arabic body, Inter label caps with ◆ eyebrows. Latin numerals everywhere.
- **Banding:** navy → parchment → navy; the page opens and closes on the navy estate (the footer directly follows the values band — one continuous hall).

## Layout concepts (ASCII)

```
1) Hero (navy)                   2) Story (parchment)          3) Values (navy)
┌──────────────────────┐         ┌──────────────────────┐      ┌──────────────────────┐
│ ◆ ABOUT MASARRAH HR  │         │ ◆ WHO WE ARE         │      │ ◆ OUR VALUES         │
│                      │         │ About Masarah HR     │      │ Principles that      │
│ Developing the       │         │ ────────────────     │      │ guide the work.      │
│ Kingdom's HR sector  │  ← serif│ [paragraph 1]  ┌─────┴────┐ │ ┌────┐┌────┐┌────┐    │
│                      │         │ [paragraph 2]  │ Vision   │ │ │ ▣  ││ ▣  ││ ▣  │    │
│ [integrated system   │         │               │ Mission  │ │ │card││card││card│    │
│  paragraph]          │         │               └──────────┘ │ │... ││... ││... │    │
│ [CTA → request]      │         │ [commitment seal ▸]        │ │┌────┘└────┘└────┘   │
└──────────────────────┘         └──────────────────────┘      └──────────────────────┘
```

## Signature — the necktie watermark

DESIGN.md reserves the necktie motif for "a page watermark or a load mark" — *this* is the page for it. A single, ghosted necktie (champagne-gilt at ~6% opacity) floating in the navy hero, opposite the headline. Used exactly once, as the institutional stamp of the charter page. This is the one risk: a nearly-invisible brand motif as the page's identity mark.

## Critique pass (before building)

- ❌ Rejected: numbered markers (01/02/03) — values are *categories*, not a sequence; numbering would be decoration.
- ❌ Rejected: invented stats (years, workers placed) — the PDF has none; fabricating figures on an institutional page is dishonest.
- ❌ Rejected: team photos / timeline — no assets exist; the embassy voice doesn't need them.
- ✅ Kept: the whoUs two-column composition (it's being deleted from home, so this is its natural successor, not a duplicate), gold ≤10% of screen (one CTA in hero, one ◆ per eyebrow, icons), 150–250ms formal transitions, full reduced-motion + focus-visible + 44px targets.

## Implementation

**New files**
1. `app/[locale]/about/page.tsx` — server wrapper: `generateMetadata` (via `getTranslations(locale, "about")` + `getSharedMetadata`) + three section components.
2. `app/components/about/heroSection/heroSection.tsx` — navy hero, ◆ eyebrow, Amiri display title, PDF intro paragraph, gold CTA → `/${locale}/request`, necktie watermark (SVG ghost).
3. `app/components/about/storySection/storySection.tsx` — parchment band, two PDF paragraphs, navy charter panel with Vision + Mission, commitment seal line.
4. `app/components/about/valuesSection/valuesSection.tsx` — navy band, chancery cards ×5 (`xl:grid-cols-5` like whoUs), gold-bordered icon squares.
5. `app/components/about/valuesSection/valueItem.tsx` — light card file (platformSection/stepItem pattern).
6. Icons: `FiUsers`, `FiCompass`, `FiTarget`, `FiHeart`, `FiGitMerge` (kept from whoUs, per PDF's request).

**Edits**
7. `app/components/global/Navbar.tsx` — add `{ href: \`/${locale}/about\`, key: "about" }` (2nd position, after Home) to `NAV_LINKS` + type union; mobile drawer updates automatically.
8. `app/translations/en.json` + `ar.json` — add `about` namespace (meta, hero, story, values with faithful ar mirror of the PDF copy), add `navbar.nav.about`; remove the now-dead `whoUs` namespace.
9. `app/[locale]/page.tsx` — remove WhoUs import + usage.
10. Delete `app/components/home/whoUs/` (dead code).

**Verify:** `npm run lint` + `npm run build`.