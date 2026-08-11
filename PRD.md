# PRD — مسرة إتش أر للاستقدام (Masarrah HR HR Recruitment Company)

**Product Requirements Document**
**Scope:** Simple 2-page marketing platform — Home Page + Single Service/Package Detail Page.
**Market:** Kingdom of Saudi Arabia (KSA)
**Stack reference:** Next.js (frontend), Laravel or NestJS (backend, content/lead API only — see §7)

---

## 1. Overview

Masarrah HR is a Saudi HR recruitment brand that helps households and companies obtain workers/labor recruited from abroad (housekeepers, drivers, nannies, elder care, and similar categories). This phase of the product is intentionally minimal: a **single-domain, two-page website** whose sole job is to present the brand, list the available services/packages, and let a visitor open one service to see its full details and take a contact/inquiry action. There is no login, no dashboard, no booking engine, and no payment flow in this scope.

## 2. Goals

| Goal | Success looks like |
|---|---|
| Establish brand trust and legitimacy | Visitor understands who Masarrah HR is and what it does within 5 seconds of landing on the home page |
| Present the service/package catalog clearly | Visitor can scan all offered services and open the one relevant to them in ≤ 2 clicks |
| Drive a contact/inquiry action | Every service detail page ends in a single, unambiguous next step (call, WhatsApp, or inquiry form) |
| Fast, mobile-first, bilingual experience | Home + detail page both load quickly on mobile and read correctly in Arabic (RTL, default) and English (LTR) |

## 3. Non-Goals (explicitly out of scope for this phase)

- No user accounts, login, or role-based portals (client/company/agency dashboards)
- No online booking, scheduling, or checkout/payment flow
- No worker-profile browsing/search (individual worker CVs, photos, filters)
- No admin CMS UI in this phase (content can be hardcoded or managed via a simple backend, per §7)
- No multi-page service catalog with pagination — all services are presented on one home page and each opens the **same reusable detail page template** with different content
- No blog, news section, investor relations, careers, or branch locator

## 4. Target Audience

- **Primary**: Saudi households looking to recruit domestic labor from abroad (housekeepers, drivers, nannies, elder/home care) — likely to browse on mobile, may be less tech-fluent, values clarity and a fast way to call/WhatsApp.
- **Secondary**: Small/medium companies seeking a labor-sourcing partner for commercial roles — likely to browse on desktop, values credibility signals (licensing, experience, process clarity) before making contact.

Both audiences are served by the **same two pages** at this stage — no separate individual/company navigation split (that segmentation is deferred to a later phase).

## 5. Information Architecture

```
/                     Home Page
/services/[slug]      Service / Package Detail Page (same template, dynamic content per service)
```

Two page types only. Every service card on the home page links to its own instance of the detail page template.

---

## 6. Page-by-Page Requirements

### 6.1 Home Page (`/`)

**Purpose**: Introduce the brand and present all services/packages as scannable cards that route to the detail page.

| Section | Requirement |
|---|---|
| Header | Logo, phone number (tap-to-call), WhatsApp icon, language switcher (AR/EN). No mega-menu needed — nav is minimal since there are only two page types. |
| Hero | Headline + short supporting sentence stating what Masarrah HR does, one primary CTA ("Browse services" — scrolls to service grid) and one secondary CTA (WhatsApp/call). |
| Trust band | 3–4 short trust stats or credibility statements (e.g., years of experience, licensing/registration statement, number of clients served) — text-only is acceptable for MVP; no dynamic counters required. |
| Service/Package grid | Card per service: icon or image, title, one-line description, "starting from" price if applicable, entire card links to `/services/[slug]`. Grid must work as single-column on mobile. |
| FAQ (optional, recommended) | 3–6 short Q&As addressing common concerns (contract basics, how the process works, what's included) — static content, accordion UI. |
| Footer | Contact info (phone, WhatsApp, email, address), social links, copyright, privacy policy link if one exists. |

**Acceptance criteria**
- All services available in the system are visible on the home page without pagination (design for up to ~12 cards; if the catalog grows meaningfully beyond that, revisit — out of scope to solve now).
- Every service card is a single tap/click target routing to the correct detail page.
- Page is fully readable and functional at 360px width (common KSA mobile viewport).
- Arabic renders RTL by default; English toggle renders LTR correctly, including mirrored icons (arrows, chevrons).

### 6.2 Service / Package Detail Page (`/services/[slug]`)

**Purpose**: Give a visitor everything they need to decide to contact Masarrah HR about *this specific* service/package, and make that contact action obvious.

| Section | Requirement |
|---|---|
| Breadcrumb / back link | Simple "back to services" link to `/` — no full mega-menu needed here. |
| Title + summary | Service/package name, one-paragraph summary, hero image if available. |
| Price / package tier(s) | Clear price or price range (e.g., monthly rate, one-time recruitment fee) if the business is ready to disclose pricing publicly; otherwise a "contact us for pricing" statement — **content decision needed, see Open Questions**. |
| What's included | Bullet list of what the service/package covers (e.g., contract duration, insurance, replacement policy, support). |
| Process / how it works | Short numbered list (3–5 steps) explaining what happens after the visitor makes contact — sets expectations, reduces support load. |
| FAQ (service-specific, optional) | 2–4 Q&As specific to this service, if different from the home-page FAQ. |
| Primary CTA (repeated) | One consistent, sticky-or-repeated CTA: "Contact us about this service" → opens WhatsApp with a pre-filled message referencing the service name, or a simple inquiry form (name, phone, message) that submits to the backend/email — **decision needed, see §7**. |
| Related services (optional) | 2–3 cards linking to other services, to keep the visitor on-site rather than bouncing after reading one page. |

**Acceptance criteria**
- Page template is fully driven by service data (title, slug, summary, price, inclusions, process steps, images) — not a one-off hand-built page per service, even though there is no CMS UI in this phase (content can live in a structured content file or a minimal database table).
- The primary contact CTA is visible without excessive scrolling on mobile (repeat it at the top and bottom of the page if the content is long).
- 404/fallback behavior defined for an invalid or removed service slug (redirect to `/` or show a "service not found" state with a link back).

---

## 7. Functional Requirements

1. **Content delivery**: service/package data (title, slug, description, price, inclusions, process steps, images, FAQ) must be structured and reusable by the single detail-page template — not hardcoded per page. A simple backend endpoint or structured content file is sufficient; no admin UI is required for this phase, but the data shape should be admin-UI-ready for a later phase.
2. **Contact action**: at minimum, WhatsApp deep-link (`https://wa.me/<number>?text=<prefilled message>`) and tap-to-call (`tel:`) must work on both pages. An on-page inquiry form is optional for this phase — if included, it needs a lightweight backend endpoint to receive submissions (email notification or simple DB insert is sufficient; no dashboard required to view them yet, though storing them is recommended for later use).
3. **Localization**: both pages must support Arabic (default, RTL) and English (LTR) with a language switcher; all copy, including CTA text and FAQ, must exist in both languages.
4. **SEO basics**: each service detail page needs a unique title tag, meta description, and OG image (derived from service data) — important since these pages are the platform's main organic-search surface.
5. **Analytics**: basic page-view and CTA-click tracking (e.g., "WhatsApp click," "Call click," "Form submit") on both page types, to measure which services get the most interest — informs which services to expand first in a later phase.

## 8. Non-Functional Requirements

- **Performance**: home page and detail page should each achieve a good Core Web Vitals score on mobile (this is the primary device for the target audience); use Next.js image optimization and static/ISR rendering since content changes infrequently.
- **Availability of contact channels**: if the backend/API is ever down, WhatsApp and `tel:` links must still work (they don't depend on the backend) — this is the fallback path and must never break.
- **Accessibility**: WCAG 2.1 AA baseline — sufficient color contrast (per the design system in DESIGN.md), minimum 44×44px touch targets, keyboard-navigable FAQ accordion.
- **Bilingual content parity**: no page should ever exist in only one language — Arabic and English content must be authored together.

## 9. Success Metrics (for this phase)

- Number of CTA interactions (WhatsApp clicks, calls, or form submissions) per service — primary signal of which services resonate.
- Home → detail page click-through rate per service card.
- Mobile vs. desktop traffic split (expected to skew mobile for individual/household audience).
- Bounce rate on the detail page (high bounce may indicate unclear pricing or missing information).

## 10. Open Questions (need answers before/at start of build)

1. **Pricing disclosure**: will service/package prices be shown publicly on the detail page, or should every page say "contact us for pricing"? This changes both the design and the sales conversation.
2. **Contact method**: WhatsApp-only, or also an on-page inquiry form? A form requires a backend endpoint and a place to review submissions.
3. **Initial service list**: how many services/packages exist at launch, and do you have final Arabic + English copy, pricing (if public), and images for each?
4. **Domain/hosting**: is `Masarrah HR.com` (or equivalent) available/owned, and is there an existing logo asset in vector (SVG) form beyond the raster image already supplied?
5. **Legal content**: is a Privacy Policy or Terms page required at launch (even a simple one), given this is a labor-recruitment business collecting inquiry contact details?

## 11. Suggested Build Order

1. Build the reusable Service Detail page template first, driven by a placeholder/mock data object — this de-risks the "one template, many services" requirement early.
2. Build the Home page and wire its service cards to the template using real (or realistic placeholder) service data.
3. Wire WhatsApp/`tel:` CTAs — ship this before any inquiry form, since it's the zero-dependency fallback and may be the only contact method needed for launch.
4. Add the inquiry form + backend endpoint only if confirmed in scope (Open Question 2).
5. Add analytics events, SEO metadata, and bilingual QA pass last, before launch.
