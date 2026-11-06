# SabiForge Digital — website

Agency website for **SabiForge Digital** — _Built for business. Ready for what's next._

Built with [Astro](https://astro.build) (static output), TypeScript (strict), Tailwind CSS v4 and
React islands for interactive components.

> Status: **homepage milestone — awaiting visual approval.** Not deployed anywhere.
> See [`docs/HOMEPAGE-MILESTONE.md`](docs/HOMEPAGE-MILESTONE.md) for results, screenshots and the
> plan for the remaining pages.

## Requirements

- Node.js 20.3+ (developed on Node 22)
- npm

## Getting started

```bash
npm install
npm run dev          # http://localhost:4321
```

## Scripts

| Script                    | What it does                                                         |
| ------------------------- | -------------------------------------------------------------------- |
| `npm run dev`             | Astro dev server with hot reload                                     |
| `npm run build`           | Type-checks (`astro check`) then builds static files into `dist/`    |
| `npm run preview`         | Serves the production build locally                                  |
| `npm run check`           | Astro + TypeScript diagnostics                                       |
| `npm run lint`            | ESLint (TypeScript + Astro rules)                                    |
| `npm run format`          | Prettier (with Astro and Tailwind class sorting)                     |
| `npm run test`            | Vitest unit tests (pricing maths, content, contact links)            |
| `npm run qa:visual`       | Browser QA: screenshots, overflow, anchors, console errors, axe a11y |
| `npm run qa:interactions` | Browser smoke test of the pricing toggle, process tabs and links     |
| `npm run verify`          | format check → lint → tests → type-check + build                     |

The two `qa:*` scripts drive Chromium through Playwright and need a running server, e.g.
`npm run build && npm run preview` in one terminal and
`BASE_URL=http://localhost:4321 npm run qa:visual` in another. Output goes to `screenshots/`
(git-ignored).

## Project structure

```
src/
  components/
    home/        Homepage sections (Hero, Services, Benefits, Pricing, Process, Shopify, Contact)
    layout/      Header, MobileNav (React), Footer
    ui/          Design-system primitives: Button, Icon, Logo, LogoMark, SectionHeading
  data/
    site.ts      Verified agency facts, contact links, navigation
    content.ts   Services, benefits, packages, process steps
  layouts/       BaseLayout (SEO meta, JSON-LD, skip link)
  lib/           pricing.ts (naira formatting, founding discount), icons.ts
  pages/         index.astro, 404.astro
  styles/        global.css — Tailwind v4 theme tokens (colours, fonts, radii, motion)
tests/           Vitest unit tests
scripts/         Playwright QA scripts
docs/            Milestone notes and reviewed screenshots
```

## Design system

Colours come from the approved flyer and live as Tailwind tokens in `src/styles/global.css`:

| Token          | Hex       | Use                              |
| -------------- | --------- | -------------------------------- |
| `midnight-900` | `#031F25` | Page background                  |
| `midnight-600` | `#124E47` | Raised teal panels               |
| `mint-300`     | `#86F0D2` | Highlights, icons, focus ring    |
| `coral-500`    | `#FE674F` | Primary actions and emphasis     |
| `ivory-100`    | `#F7F3EA` | Light sections and pricing cards |
| `ember`        | `#FD8C55` | Logo mark only                   |

Typography: **Outfit** (display) and **Inter** (body), both self-hosted variable fonts via
Fontsource — no third-party font requests.

Text on coral uses midnight ink rather than white: white on `#FE674F` is 2.9:1 and fails WCAG AA,
while midnight on coral is 5.9:1.

## Business facts and content rules

- Contact details, navigation and offer constants live in one place (`src/data/site.ts`,
  `src/lib/pricing.ts`). Change them there, not in components.
- Founding offer: **10% off the first three eligible website packages** (Launch, Business, Online
  Catalog). `FOUNDING_CLIENT_SLOTS = 3`, `FOUNDING_DISCOUNT_RATE = 0.1` — covered by unit tests.
- No testimonials, clients, portfolio projects, social accounts or registration details are shown.
  The hero mockup is labelled as an illustrative concept.

## Environment

Copy `.env.example` to `.env` and set `SITE_URL` once a staging/production domain is confirmed. It
is used for canonical URLs and Open Graph tags (defaults to `http://localhost:4321`).

## Deployment

The build is a plain static site in `dist/` and can be hosted on any static host. Nothing has been
deployed, no DNS has been changed and no paid services have been configured.
