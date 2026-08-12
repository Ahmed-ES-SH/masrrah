# Masarrah HR — مسرة إتش أر للاستقدام

Marketing website for Masarrah HR, a Saudi recruitment company. It presents recruitment services, packages, destination countries, testimonials, and a contact/request form that emails submissions through [Resend](https://resend.com).

## Tech stack

- [Next.js](https://nextjs.org) 16 (App Router, `output: "standalone"`) with React 19 and TypeScript
- [Tailwind CSS](https://tailwindcss.com) v4 — design tokens defined as CSS variables in `app/globals.css` (`:root` + `@theme inline`); there is no `tailwind.config.js`
- [framer-motion](https://www.framer.com/motion) for animations and [react-icons](https://react-icons.github.io/react-icons) for icons
- [Swiper](https://swiperjs.com) for the hero carousel
- [Resend](https://resend.com) for sending request-form emails

## Features

- **Bilingual (AR/EN) with locale routing** — pages live under `app/[locale]/` (`/ar`, `/en`); `proxy.ts` redirects un-localized paths to Arabic (the default). Arabic renders RTL, English LTR. All user-facing copy is in `app/translations/ar.json` and `app/translations/en.json`, read via the typed `useTranslation` hook.
- **Marketing pages** — landing sections (hero, services, packages, countries, platform, FAQ, government logos, testimonials, blog), plus per-package (`/packages/[packageKey]`) and per-service (`/services/[slug]`) pages with metadata via `getSharedMetadata`.
- **Request form** — `app/[locale]/request/page.tsx` posts to `POST /api/request`, which validates the payload and emails it to `ADMIN_EMAIL` via Resend. The endpoint rate-limits per IP in memory (5 requests / 60 s) and returns `429` with a `Retry-After` header; it is not a substitute for a persistent rate limit in production.
- **Layout chrome** — `Navbar`, `Footer`, `FloatingContactActions` rendered in `app/[locale]/layout.tsx`; fonts are Inter (Latin) and Amiri (Arabic) via `next/font/google`.

## Getting started

Requires Node.js and pnpm (the repo has `pnpm-lock.yaml` and `pnpm-workspace.yaml`; npm works too).

```bash
pnpm install
cp .env.example .env   # fill in your values
pnpm dev
```

Open http://localhost:3000 — the proxy redirects `/` to `/ar`.

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `RESEND_API_KEY` | yes | Resend API key for `POST /api/request` |
| `ADMIN_EMAIL` | yes | Recipient of request-form submissions |
| `EMAIL_FROM` | yes | Sender address (Resend requires a verified domain) |
| `APP_URL` | yes | Your app URL |
| `NEXT_PUBLIC_SITE_URL` | no | Canonical/OG image base URL; defaults to `https://masrrah.vercel.app` in `app/helpers/getSharedMetadata.ts` |

Contact details (phones, WhatsApp, email, address) are placeholders in `app/constants/site.ts` — confirm them before launch.

## Scripts

- `pnpm dev` — development server
- `pnpm build` — production build
- `pnpm start` — run the production build
- `pnpm lint` — ESLint

## Deployment

The site is containerized and self-hosted:

- `Dockerfile` builds a standalone Next.js image; `docker-compose.yml` runs the app behind a [Caddy](https://caddyserver.com) reverse proxy (`Caddyfile` proxies `masarah-hr.com`, Caddy provisions HTTPS automatically).
- `.github/workflows/deploy.yml` deploys on push to `main`: over SSH it pulls, runs `docker compose up -d --build`, and verifies the container is up. Required secrets: `VPS_HOST`, `VPS_USER`, `VPS_SSH_KEY` (optional `VPS_PORT`), and the `VPS_APP_DIR` variable.
- See `docs/CI-CD.md` for pipeline details.

## Documentation

- `PRD.md` — product requirements
- `PRODUCT.md` — product overview
- `DESIGN.md` — design system and tokens
- `docs/CI-CD.md` — CI/CD setup


try CI/CD Action Version 2
