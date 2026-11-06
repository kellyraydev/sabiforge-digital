# Supporting pages QA

The supporting-page visual review was captured at 390px and 1440px for Work, About, Services, Pricing, Contact, Process, Shopify and a representative service detail route. `render-review.json` records the route, viewport, content height, reveal state and browser errors.

Final production checks on 6 November 2026:

- `npm run verify`: pass — formatting, ESLint, 36/36 tests, Astro check and static production build. The build reports 0 errors and 2 existing React `FormEvent` deprecation hints.
- `npm run qa:visual`: pass — 23 routes × 7 widths = 161 page loads. Overflow, link/anchor, console, third-party request and axe WCAG A/AA checks passed.
- `npm run qa:interactions`: pass — Work demos, services pathways, process controls, pricing toggle and comparison, enquiry validation and email/WhatsApp handoff, keyboard focus, reduced motion, no-JavaScript visibility, responsive menu, legal drafts and 404 behavior.

The only unresolved owner decisions are listed in [`docs/SUPPORTING-PAGES.md`](../../SUPPORTING-PAGES.md).
