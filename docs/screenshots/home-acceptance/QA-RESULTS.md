# Production build QA — homepage acceptance

Run against the built static site using Chromium on 6 November 2026.

- `npm run verify`: pass — Prettier, ESLint, 36/36 unit tests, Astro check and production build; 23 pages built. Astro reports 0 errors and 2 existing React `FormEvent` deprecation hints.
- `npm run qa:visual` with `ROUTES=/`: pass — 14 loads across `/` and `/404` at 375, 390, 430, 768, 1280, 1440 and 1920px. No overflow, broken links/anchors, console errors or third-party requests. axe WCAG 2.x A/AA checks pass. Mobile menu keyboard behavior passes.
- `npm run qa:interactions`: pass — homepage portfolio CTA, pathway and process controls, Work demonstrations, pricing toggle and FAQ, contact validation and email/WhatsApp handoff, skip link, primary navigation, reduced motion, focus visibility, no-JavaScript visibility, responsive menu and 404 behavior.
- Four requested viewport screenshots, a hover capture, a Work-section capture, and the render geometry report are in this directory.

The Playwright scripts accept `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` so QA can use the system Chromium in this environment.
