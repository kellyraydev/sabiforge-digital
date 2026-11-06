> **Superseded** by [`MILESTONE-B-C.md`](MILESTONE-B-C.md). The homepage described here was redesigned in milestone B, and its screenshots were never committed (see the correction in MILESTONE-B-C §9).

# Milestone 1 — Homepage (for visual approval)

Date: 2026-11-06 · Branch: `claude/sabiforge-digital-init-kxar7l`

## What was built

- **App setup:** Astro 7 (static output), TypeScript strict, Tailwind CSS 4 (`@tailwindcss/vite`),
  React 19 islands, ESLint 10, Prettier, Vitest, Playwright-based QA scripts.
- **Design system:** colour, type, radius and motion tokens in `src/styles/global.css`; reusable
  `Button`, `Icon` (Astro + React), `Logo`, `LogoMark`, `SectionHeading`; shared content data.
- **Logo:** `LogoMark.astro` is an SVG rebuild of the "S" hexagon from the flyer (mint top, coral
  bottom). Please send the original vector logo (SVG/AI/PDF) and it will replace the rebuild.
- **Header:** fixed, turns solid with blur on scroll; desktop nav plus a "Start a project" WhatsApp
  CTA; React mobile menu with focus trap, Escape to close, scroll lock, and contact details.
- **Homepage sections**
  1. Hero: founding-offer badge, headline, WhatsApp and packages CTAs, coded store/phone mockup
     (labelled "illustrative concept"), Lagos-style skyline with cable-stayed bridge.
  2. Services: bento grid of all 7 services, each with its own anchor.
  3. Why SabiForge: six benefits on an ivory section.
  4. Pricing preview (React): founding/standard toggle, four packages, WhatsApp enquiry per
     package, note that third-party costs are quoted separately.
  5. Process (React): six steps as an accessible tab interface with arrow-key, Home and End support.
  6. Shopify & dropshipping band.
  7. Contact CTA: WhatsApp, phone and email.
  8. Footer: services, navigation, contact, "Social pages coming soon" (no links).
- **SEO basics:** title and description, canonical, Open Graph, `ProfessionalService` JSON-LD
  (name, email, phone, Nigeria; no address or registration details), SVG favicon, custom 404.

## Decisions for your review

1. **Founding offer = first 3 eligible packages.** The flyer says "first 5 clients"; the site uses
   your instruction (3). Full E-commerce is not discounted, which matches the flyer.
2. **Text on coral is midnight, not white.** White on `#FE674F` fails WCAG AA (2.9:1). Keeping the
   brand coral and switching to dark text passes (5.9:1). The other option is a darker coral
   (`#CF3F2A`) with white text, which changes the brand colour.
3. **Package feature bullets** (e.g. "Training session included", "Enquiry form & Google Maps")
   are my draft scope. Please confirm or correct them before launch.
4. **Imagery:** there are no stock photos or client work. The hero uses a coded mockup with sample
   products, labelled as illustrative. Original photography or real projects can replace it later.

## Verification (all run on this branch)

| Check                                   | Result                                             |
| --------------------------------------- | -------------------------------------------------- |
| `npm run format:check`                  | Pass                                               |
| `npm run lint` (ESLint)                 | Pass, 0 problems                                   |
| `npm run test` (Vitest)                 | 11 / 11 tests pass                                 |
| `astro check` (TypeScript)              | 0 errors, 0 warnings, 0 hints                      |
| `astro build`                           | Pass — 2 static pages                              |
| `qa:visual` on production preview       | Pass at 1440 px, 820 px and iPhone 13 (390 px)     |
| ↳ horizontal overflow / broken anchors  | None                                               |
| ↳ console errors                        | None                                               |
| ↳ axe-core WCAG 2.0/2.1 A + AA          | 0 violations (after fixing contrast — see 2)       |
| ↳ mobile menu opens, closes on Escape   | Pass                                               |
| `qa:interactions` on production preview | Pass — pricing toggle, process tabs, 39 links, 404 |

Payload: the page is static HTML (about 17 KB gzipped). React (about 65 KB gzipped) loads only when
an interactive island scrolls into view or the mobile menu is needed.

Known non-blocking item: `npm audit` reports moderate advisories in ESLint's dev-only dependency
chain (`minimatch` via `@eslint/config-array`). They are not shipped to the browser. Recheck when
ESLint publishes a patched release.

## Screenshots

Reviewed captures are in [`docs/screenshots/`](screenshots/):

- `home-desktop-hero.jpg`, `home-desktop-full.jpg` — 1440 px
- `home-tablet-hero.jpg`, `home-tablet-full.jpg` — 820 px
- `home-mobile-hero.jpg`, `home-mobile-full.jpg`, `home-mobile-menu.jpg` — iPhone 13

Defects found in screenshot review and fixed before this milestone: floating hero chips covering
mockup content and the caption; empty space in the services grid; sticky-column offset in "Why
SabiForge"; redundant "Starting from / From" price label; a muddy translucent contact card and a
cropped watermark; founding badge wrapping on mobile; low-contrast text across several components.

## Recommended plan for the remaining pages

The master brief referenced in the request is not in the repository, so this plan uses the
services and rules from the request. Please add the brief (e.g. `docs/BRIEF.md`) so later
milestones can be checked against it.

| #   | Milestone                   | Pages / work                                                                                                                                                                                                                                                              |
| --- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 2   | Services                    | `/services` overview, plus `/services/[slug]` from `content.ts` via a content collection: business websites, e-commerce, dropshipping, Shopify redesigns, custom apps, maintenance, developer collaboration. Each page: problem, deliverables, process, FAQs, CTA.        |
| 3   | Pricing                     | `/pricing`: full package comparison table, founding-offer terms (3 eligible packages), add-ons, and what counts as a third-party cost; FAQ with `FAQPage` schema.                                                                                                         |
| 4   | Contact & project enquiry   | `/contact`: validated enquiry form (package, budget, timeline) that also opens a pre-filled WhatsApp message. Choose the form backend with you first (e.g. Formspree or a serverless function) — no paid service without approval. Spam protection, success/error states. |
| 5   | About & process             | `/about` (founder story, values, the "sabi" idea; only verified facts) and `/process` (expanded six steps, what clients provide, timelines).                                                                                                                              |
| 6   | Shopify & dropshipping      | `/shopify` landing page for the store-launch and redesign offers.                                                                                                                                                                                                         |
| 7   | Legal & trust               | `/privacy`, `/terms` (NDPA-aware privacy notice for the enquiry form), cookie notice if analytics are added.                                                                                                                                                              |
| 8   | Work / case studies (later) | Template only, published when real, client-approved projects exist.                                                                                                                                                                                                       |
| 9   | Launch readiness            | Sitemap and robots, OG share images, analytics (with your approval), Lighthouse and axe on every page, staging deploy on a host you choose, then DNS only with your sign-off.                                                                                             |

Header links point to homepage sections for now and should switch to the dedicated pages as each
one ships.
