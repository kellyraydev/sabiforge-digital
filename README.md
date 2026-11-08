# SabiForge Digital — website

Agency website for **SabiForge Digital** — _Built for business. Ready for what's next._

Built with [Astro](https://astro.build) (static output), TypeScript (strict), Tailwind CSS v4 and
React islands for interactive components.

> Status: **pre-launch readiness review in progress.** The site is not deployed anywhere. Six
> services, the founding-offer conditions, package terms and the legal drafts still require owner
> decisions before public launch.
>
> - Creative direction and audit: [`docs/CREATIVE-DIRECTION.md`](docs/CREATIVE-DIRECTION.md)
> - Results, test evidence, open questions: [`docs/MILESTONE-B-C.md`](docs/MILESTONE-B-C.md)
> - Earlier homepage milestone (superseded): [`docs/HOMEPAGE-MILESTONE.md`](docs/HOMEPAGE-MILESTONE.md)
> - Authoritative current status: [`docs/LAUNCH-READINESS.md`](docs/LAUNCH-READINESS.md)

## Requirements

- Node.js 20.3+ (developed on Node 22)
- npm

## Getting started

```bash
npm install
npm run dev          # http://localhost:4321
```

## Scripts

| Script                    | What it does                                                        |
| ------------------------- | ------------------------------------------------------------------- |
| `npm run dev`             | Astro dev server with hot reload                                    |
| `npm run build`           | Type-checks (`astro check`) then builds static files into `dist/`   |
| `npm run preview`         | Serves the production build locally                                 |
| `npm run check`           | Astro + TypeScript diagnostics                                      |
| `npm run lint`            | ESLint (TypeScript + Astro rules)                                   |
| `npm run format`          | Prettier (with Astro and Tailwind class sorting)                    |
| `npm run test`            | Vitest unit tests (pricing, packages, services, enquiry validation) |
| `npm run qa:visual`       | Every route × 7 widths: overflow, links, console, axe; screenshots  |
| `npm run qa:interactions` | Keyboard and interaction tests for every interactive component      |
| `npm run verify`          | format check → lint → tests → type-check + build                    |

The two `qa:*` scripts drive Chromium through Playwright and need a running server, e.g.
`npm run build && npm run preview` in one terminal and
`BASE_URL=http://localhost:4321 npm run qa:visual` in another. Output goes to `screenshots/`
(git-ignored). Set `BROWSER=firefox` or `BROWSER=webkit` to run either suite in those engines;
Chromium is the default.

## Project structure

```
src/
  components/
    home/        Homepage sections and islands (PathwaySelector, ApproachStages)
    page/        PageHero, CtaPanel (inner pages)
    pricing/     PricingExplorer (standard / founding-rate switch)
    contact/     ProjectEnquiry (brief composer)
    layout/      Header (smart sticky), MobileNav, Footer
    ui/          Button, Icon, Logo, LogoMark, SectionHead, HexLines, Breadcrumbs, ConceptPlate
  data/
    site.ts      Verified agency facts, contact links, navigation
    services.ts  10 services in 3 families (with approval status)
    packages.ts  Approved packages, engagement models, comparison matrix, costs
    concepts.ts  Fictional studio concepts (always labelled as such)
    home.ts      Point of view, approach stages, differentiators, audience pathways
    faq.ts       Pricing FAQ
  layouts/       BaseLayout (SEO meta, JSON-LD, font preload, reveal motion)
  lib/           pricing.ts, enquiry.ts (validation + brief), icons.ts
  pages/         index, services/index, services/[slug], pricing, contact, 404, robots.txt
  styles/        global.css — design tokens and utilities
tests/           Vitest unit tests
scripts/         Playwright QA scripts
docs/            Direction, milestone reports, reviewed screenshots
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

Typography: **Bricolage Grotesque** (display), **Instrument Serif** (italic accents),
**Inter** (body) and **JetBrains Mono** (metadata), with **Outfit** for the wordmark only. All are
self-hosted through Fontsource, so there are no third-party font requests.

Text on coral uses midnight ink rather than white: white on `#FE674F` is 2.9:1 and fails WCAG AA,
while midnight on coral is 5.9:1.

## Business facts and content rules

- Contact details, navigation and offer constants live in one place (`src/data/site.ts`,
  `src/lib/pricing.ts`). Change them there, not in components.
- Founding offer: **10% off** Launch, Business and Online Catalog for a limited number of early
  clients. `FOUNDING_CLIENT_SLOTS` is `null` until the owner settles the conflict between 3 and 5;
  set it in `src/lib/pricing.ts` and the copy updates everywhere. Covered by unit tests.
- New services from the expanded brief are marked `approval: 'pending'` in `src/data/services.ts`.
- The contact form doesn't store or send data; it hands the brief to the visitor's own email or
  WhatsApp app. Connect a backend only after a provider and retention policy are approved.
- No testimonials, clients, portfolio projects, social accounts or registration details are shown.
  All work is labelled "Studio concept" (fictional brands).

## Environment

Copy `.env.example` to `.env` and set both `SITE_ENV` and `SITE_URL` for the target environment.
`SITE_URL` supplies canonical, sitemap and Open Graph URLs. Staging builds emit `noindex,nofollow`
and a disallowing `robots.txt`; production indexing requires `SITE_ENV=production`. HTTPS is
required for both staging and production builds.

## Deployment

The build is a plain static site in `dist/` and can be hosted on any static host. Nothing has been
deployed, no DNS has been changed and no paid services have been configured.
