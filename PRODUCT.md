# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Primary — Saudi households** recruiting domestic labor from abroad (housekeepers, drivers, nannies, elder/home care). Likely on mobile, values clarity and a fast path to contact; price is asked privately after they file a request, not browsed.
- **Secondary — small/medium companies** seeking a labor-sourcing partner for commercial roles. More likely on desktop; weighs credibility signals (licensing, experience, process clarity) before contacting.
- Both audiences are served by the **same two pages**; no individual/company navigation split in this phase.

## Product Purpose

Masarrah ("مسرة للاستقدام", Masarrah HR Recruitment) is a Saudi HR recruitment brand that helps households and companies obtain workers recruited from abroad. This phase is a single-domain, two-page marketing website whose job is to present the brand, list the launch service catalog, and turn a visitor into a contact/inquiry. Success = a visitor understands who Masarrah is within 5 seconds, can open any service in ≤ 2 clicks, and reaches a single unambiguous next step (request form, call, or WhatsApp).

## Positioning

A formal, institutional, trust-first KSA labor-recruitment brand (navy + gold identity) whose conversion mechanic is a **private request**: no public prices are shown anywhere; each service closes with a form that sends the visitor's required information to the admin, with WhatsApp and tap-to-call as the zero-dependency fallback. Trust signals — licensing, experience, process clarity — are the content that must back this positioning.

## Operating Context

- Mobile-first; the design must be fully functional at 360px width (common KSA viewport).
- Arabic is the default language and RTL; English (LTR) is a full toggle. Arabic and English copy are always authored together.
- WhatsApp deep-links (`wa.me`) and `tel:` links are the contact channels visitors know; they must keep working even if the backend is down.
- Conversion happens through a **request form** (name, phone, message) submitted to the admin — the form is the primary mechanism; WhatsApp and call support it.
- No login, dashboard, booking, payment, worker profiles, or CMS in this phase.

## Capabilities and Constraints

- Exactly two page types: `/` (home) and `/services/[slug]` (one reusable detail template driven by structured service data — all services share the template).
- Service data must be structured and admin-ready (content file or simple content API), never hardcoded per page.
- Home page presents all services without pagination (design for up to ~12 cards). No pricing displayed anywhere; pricing is requested privately via the form.
- Contact: WhatsApp + tap-to-call + request inquiry form (form needs a lightweight endpoint to receive/store submissions; no review dashboard required yet).
- Localization on both pages: all copy including FAQ and CTA in Arabic and English; icons mirror for RTL/LTR.
- SEO: unique title, meta description, and OG image per service page.
- Basic analytics: page-view + CTA tracking (WhatsApp click / call click / form submit).
- 404/fallback defined for invalid service slugs.
- Technical stack: Next.js App Router, React, TypeScript, Tailwind CSS; static/ISR rendering since content changes infrequently.
- Accessibility: WCAG 2.1 AA baseline; 44×44px touch targets; keyboard-navigable accordion; reduced-motion respected.

## Brand Commitments

- Name: **Masarrah (مسرة)** — "Masarrah HR Recruitment Company", tagline "للاستقدام".
- Logo (confirmed, an existing asset): a gold negative-space "M" rendered as two sweeping arcs that read as a person in a necktie, on deep navy, with "HR" small-caps, diamond (◆) dividers, and the Arabic wordmark "مسرة". The visual world derived from the mark is recorded in DESIGN.md (navy `#0B1B3A` + gold `#C9A227` institutional system). This world is binding.
- Voice register: formal, institutional, premium — a regulated, trust-driven business, not a startup.
- (Open) A vector/SVG logo and exact logo file are not yet supplied; the raster asset is referenced in PRD.md.

## Evidence on Hand

- `PRD.md` — the explicit product brief for this phase (read at session start).
- `DESIGN.md` — visual system derived from the Masarrah logo and a maharah.com UX walkthrough; contains the committed color/typography/component tokens.
- Placeholder bilingual (Arabic + English) copy is being used for the ~4 initial services pending real content — placeholder is marked as such.
- No public pricing is confirmed or fabricated anywhere; pricing lives behind the private request form.
- Do **not** invent licensing numbers, client counts, years of experience, or testimonials; the trust band must use only client-supplied content.

## Product Principles

1. **Trust before lead** — credibility (who Masarrah is, licensing, process) comes before the ask; the ask is a single unambiguous contact step.
2. **Private pricing, fast contact** — no public prices; the request form is the primary mechanism, WhatsApp and call the unbreakable fallback.
3. **Mobile Arabic first** — 360px RTL is the baseline; English is a faithful mirror, not a second layout.
4. **Data-driven services** — one detail template driven by structured service data, ready for a future admin surface.
5. **No fabricated evidence** — stats, licensing, and testimonials only from client-supplied content.

## Accessibility & Inclusion

- WCAG 2.1 AA baseline; 44×44px touch targets; keyboard-navigable FAQ accordion; sufficient contrast per DESIGN.md tokens (gold-on-navy reserved for large/bold text, never small body copy); respects `prefers-reduced-motion`; bilingual parity — no page exists in only one language.