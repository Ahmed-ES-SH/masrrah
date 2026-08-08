---
target: app\components\home\packagesSection.tsx
total_score: 25
max_score: 40
na_heuristics: 
p0_count: 0
p1_count: 3
timestamp: 2026-08-08T07-13-18Z
slug: app-components-home-packagessection-tsx
---
⚠️ DEGRADED: single-context (spawn_agent unavailable in this session)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2/4 | The selected route is visible, but keyboard selection does not move focus and the external WhatsApp action has no in-page confirmation or fallback. |
| 2 | Match System / Real World | 3/4 | The dossier/route metaphor fits a formal recruitment house, though “package” and “route” are not fully explained in the interaction itself. |
| 3 | User Control and Freedom | 3/4 | Users can change routes and navigate the tablist, but keyboard focus can remain on a now-inactive tab. |
| 4 | Consistency and Standards | 3/4 | Tokens, icons, borders, and motion align with the system; the CTA behavior does not match the brief’s form-first conversion model. |
| 5 | Error Prevention | 3/4 | Three clearly labeled choices and no public pricing reduce decision risk; the CTA does not preserve the selected route as context. |
| 6 | Recognition Rather Than Recall | 3/4 | Labels, short descriptions, best-for copy, and included items are visible; the missing private-pricing note removes an important recognition cue. |
| 7 | Flexibility and Efficiency of Use | 2/4 | Arrow/Home/End support is a good start, but the roving-tab interaction is incomplete and there is no direct route deep-linking. |
| 8 | Aesthetic and Minimalist Design | 2/4 | The authored visual language is strong, but the missing desktop grid collapses the intended hierarchy and unused reassurance copy weakens the composition. |
| 9 | Error Recovery | 1/4 | There is no local state for an unavailable messaging channel and no visible recovery path after the external action. |
| 10 | Help and Documentation | 3/4 | The section explains each route inline, but users are not told what happens after requesting or how private pricing works. |
| **Total** |  | **25/40** | **Acceptable — significant improvements needed before users are happy.** |

## Design Specificity Verdict

This feels authored for Masarrah rather than category-interchangeable. The “recruitment dossier” panel, restrained navy/parchment/gold palette, diamond marker, and route-based information architecture support the embassy-grade institutional brief. The main loss of specificity is not visual; it is behavioral: the section currently behaves like a generic tabbed product selector while the product promises a guided private request.

The deterministic detector reported no findings for `app/components/home/packagesSection.tsx` (`[]`). That is a clean scan, but it does not catch the missing `grid` display utility, incomplete tab focus management, or the unused translation keys. No false positives were identified.

## Overall Impression

The content model and visual direction are good: three routes are easy to understand, and the active panel has a credible “case file” feel. The biggest opportunity is to make the section’s behavior match its promise. First restore the intended desktop composition, then make the selected route carry through to a clear request action with reassurance about the next step.

## What’s Working

- The three-choice architecture is appropriately restrained for a high-consideration service: household, care, and business are easy to scan without exposing public prices.
- The active panel has strong internal hierarchy: dossier label, route title, description, “best for,” included items, then one CTA.
- The implementation respects the project’s core technical conventions: translations are used, Framer Motion is gated with `useReducedMotion()`, icons come from `react-icons`, and the layout uses logical properties for RTL mirroring.

## Priority Issues

### [P1] The desktop two-column composition is not active

**Why it matters:** The outer wrapper at line 64 has `lg:grid-cols-[…]` and `lg:gap-xxl`, but no `grid` class. At large widths, the heading block and the chooser/panel therefore remain normal-flow blocks instead of forming the intended sticky editorial column plus content column. This makes the section much longer, dilutes the heading’s role, and prevents the `lg:sticky` behavior from delivering its intended effect.

**Fix:** Add the missing display utility to the outer wrapper and verify the intended column proportions at desktop and tablet widths. Keep the mobile stack unchanged.

**Suggested command:** `$impeccable layout`

### [P1] The CTA is not aligned with the product’s form-first conversion model

**Why it matters:** “Request this route” sends every choice to one generic WhatsApp URL. The selected package is not passed as context, and there is no primary request form entry point. A visitor may have to restate which route they chose, while the product brief says the form is primary and WhatsApp is the fallback.

**Fix:** Link the CTA to the request form with the selected package prefilled or encoded, and keep WhatsApp as a clearly labeled secondary fallback. If WhatsApp remains primary for this surface, include the route label in the deep link message and explicitly explain what happens next.

**Suggested command:** `$impeccable clarify`

### [P1] The custom tab interaction does not complete the roving-focus pattern

**Why it matters:** Arrow/Home/End changes `activePackage`, but focus is not moved to the newly active button. A keyboard user can end up focused on a button with `tabIndex={-1}` while a different tab is visually selected, which makes the control feel inconsistent and can make the active route hard to locate.

**Fix:** Keep refs for the tab buttons and focus the newly selected tab after keyboard navigation; add `aria-orientation="horizontal"` and ensure the active tab is scrolled into view on the mobile strip. Preserve the existing RTL-aware arrow logic.

**Suggested command:** `$impeccable audit`

### [P2] Private-pricing reassurance is authored but never rendered

**Why it matters:** `privateLabel` and `privateNote` exist in both translation files but are not used in the component. The section then presents a package-like selector without the strongest explanation of what “private request” means. This creates avoidable uncertainty at exactly the point where a visitor is deciding whether to proceed.

**Fix:** Place the reassurance beside the index or immediately above the CTA, with restrained secondary styling. Keep it visible in both Arabic and English and ensure it does not compete with the single primary action.

**Suggested command:** `$impeccable clarify`

### [P2] Mobile route selection has weak overflow affordance

**Why it matters:** The tab row becomes horizontally scrollable, but there is no cue that more routes exist beyond the viewport and no guarantee that keyboard-selected tabs are brought into view. On a 360px Arabic viewport, the compact cards can also make the short descriptions feel cramped before the user reaches the detail panel.

**Fix:** Give the strip a subtle edge fade or visible continuation cue, keep each tab at a predictable minimum width, and call `scrollIntoView({ block: "nearest", inline: "nearest" })` when selection changes. Confirm the panel begins close enough to the strip that the relationship remains obvious after a thumb tap.

**Suggested command:** `$impeccable adapt`

## Persona Red Flags

### Jordan — confused first-timer

- The heading promises a clear route, but the section does not explain what happens after “Request this route.” The missing private-pricing note makes the next step ambiguous.
- “Route,” “package,” and “dossier” create a formal tone, but without one plain sentence about the request process they may feel like internal business language.

### Riley — deliberate stress tester

- Switching to a route and then opening WhatsApp loses the selected route as machine-readable context; Riley must verify manually that the request is about the intended service.
- Keyboarding through the tablist can leave focus on a visually inactive button, exposing a state/interaction mismatch.

### Casey — distracted mobile user

- The horizontally scrolling selector gives no strong indication that all choices are available, and a selected item may be off-screen after keyboard or assistive-technology navigation.
- The primary next step is an external messaging handoff rather than a preserved request flow, increasing context switching on mobile.

## Minor Observations

- The outer wrapper has repeated whitespace in its class string and uses `mt-12`, `min-h-[28rem]`, and `min-h-[25rem]` instead of the project’s named spacing/size tokens. This is primarily maintainability and system-discipline debt, but it makes the section harder to tune consistently.
- The visible CTA label is generic. A more specific accessible name such as “Request the Household route” would make the action clearer to screen-reader users, especially if more actions are later added.
- The arrow icon’s hover translation is not gated by the reduced-motion preference, while the Framer Motion transitions are. The effect is small, but the component should have one coherent reduced-motion policy.

## Questions to Consider

- What should be the one definitive next step here: a prefilled request form, or a WhatsApp conversation with the selected route already included?
- Does the “dossier” metaphor help Saudi households understand the service, or should the wording become more direct while keeping the formal visual treatment?
- Should the package selector remain a tabbed chooser, or would three compact route cards with a single form CTA create a clearer mobile path?
