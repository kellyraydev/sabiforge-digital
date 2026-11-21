# SabiForge Digital — complete v2 improvement delivery plan

Status: **IN PROGRESS; NOT RELEASE READY**. Prepared against `redesign/v2-blueprint` and the live-site review dated 20 November 2026. This plan does not authorize deployment, legal publication, paid providers or changes to the approved enquiry privacy model.

## Authoritative sources

- `AGENTS.md` for engineering and release gates.
- `docs/REBUILD-BRIEF.md` for the owner-approved 20 November 2026 design and business decisions.
- Current repository code for actual implementation state; do not presume an open PR has merged.
- `src/data/site.ts` for verified contact details.
- `docs/references/homepage-target.jpeg` and `docs/references/implementation-blueprint.jpeg` for visual direction **when supplied and committed**.

## Baseline and blockers verified

- The starting `redesign/v2-blueprint` branch differed from `main` in documentation only, not in the production application.
- The two primary visual reference image files were absent in `docs/references/` (only `encoding-probe.txt` was present). Two likely matching originals were subsequently located in the owner's ChatGPT Library as `SabiForge Digital Agency Homepage.png` (1024×1536) and `SabiForge Digital AI Blueprint.png` (1199×1312) and visually inspected. The first shows a navy/violet/cyan agency homepage with a laptop/phone mockup, four services, six concept cards, package comparison and a six-step process. The second shows the corresponding UI/architecture blueprint. **The original image bytes are still not committed to GitHub.** The owner or an authorized coding agent must add the exact files, with a provenance note, before reference-based acceptance.
- `src/data/services.ts`, `src/data/packages.ts`, `src/lib/pricing.ts`, `src/data/home.ts` and the associated tests still represented earlier commercial decisions at the start of this branch. A coordinated migration remains required.
- The live URL could not be independently loaded by the available web fetcher during this review. Treat prior textual review as an issue list, not a reproduced visual or interaction test.
- Multiple older PRs exist; reconcile each diff before cherry-picking, merging, or claiming its changes are in `main`.

## Implementation phases and acceptance

### 1. Foundations and owner-approved business data

- Keep the verified site contact details; do not replace the email or phone with values from images.
- Migrate the public service catalogue to exactly these four approved offerings: **Business Websites; Online Stores; Custom Software and Business Platforms; Website Redesign and Ongoing Support**. Preserve any old draft definitions as internal data only if their links, routing, tests, and visibility rules are safe. All public service cards, routes, links, JSON-LD, footer/nav, enquiry selectors, FAQs, concepts and related-service sections must agree.
- Migrate public packages to **Starter ₦150,000; Business ₦350,000; Online Store ₦750,000; Custom Software from ₦1,500,000**. Keep the existing 10% founding discount logic and clearly scope eligibility; do not silently apply it to Custom Software. Migrate `packages.ts`, `pricing.ts`, packages UI, enquiry data, home pathways, comparison matrix, page copy, structured data and unit tests in a reviewable commit.
- Use `FOUNDING_CLIENT_SLOTS = 5` as approved; do **not** claim five places remain available without inventory evidence.
- Keep unconfirmed package inclusions, timelines, fixed results, service levels or third-party fees out of contractual marketing claims.

### 2. Design system and homepage

- Obtain the two absent reference images before final visual implementation. Build against the primary screenshot and use the blueprint for structure/technical criteria.
- Migrate shared tokens in `src/styles/global.css` to dark navy/obsidian, selective violet/purple/cyan/turquoise accents, readable contrast and accessible focus styling; preserve temporary legacy token compatibility until every consumer is migrated.
- Use an approved real SabiForge logo master; do not invent company identity or reuse another brand.
- Approved H1: **More than a website. Built for your business to grow.**
- Implement the approved sequence: sticky accessible header, hero with genuinely illustrative mockups, audience strip, four services, six clearly labelled concept projects, Why SabiForge, four packages, six-step process, closing CTA and footer.
- Six homepage concepts: Maison Valé Studios; AURA Clothing; FlowDesk OS; CampusOne Portal; Bloom Wellness Studio; RoutePilot Logistics. Each visibly says **Concept Project**. Preserve existing four studio concepts on `/work`: Àdùn Table, Kòrà Home, Mend Physio Studio, Tallyhouse.
- Prevent false real-client claims, fake dashboards, fabricated metrics, dead demo controls, unsupported testimonials or implied affiliation. Label decorative data as illustrative.
- Source visual assets only from approved local or properly licensed files. If generating images, keep master assets in the visual repository where applicable and log provenance in `docs/IMAGE-PROVENANCE.md`.

### 3. Supporting pages and conversion

- Reconcile `/services`, all confirmed service detail pages, `/work`, concept detail pages, `/pricing`, `/process`, `/about`, `/contact`, `/shopify` (if still appropriate), and `/404` with the new service catalogue and shared design system.
- Fix internal jargon, spacing glitches, duplicate/skipped section numbers, inconsistent package labels and mixed US/UK spellings; use Nigerian/British English consistently without changing verified names, URLs or identifiers.
- The current two-step contact flow uses a browser-generated email/WhatsApp handoff. Keep that privacy model, make the two-step transition obvious, support keyboard focus and clear errors, and test mailto/WhatsApp URL generation and fallback when JavaScript is absent.
- **Do not** add a server form, CRM, database, analytics, cookies, third-party submitter or storage until the owner explicitly approves the corresponding privacy/infrastructure design.
- Keep `/privacy` and `/terms` labelled draft, `noindex`, and outside the sitemap until separate review and legal approval. Do not disguise draft text as an enacted policy.
- Do not replace existing Gmail contact without verified custom-domain email and MX/SPF/DKIM/DMARC setup.

### 4. SEO, accessibility, performance and QA

- Ensure route-specific canonical URLs, title/meta descriptions, Open Graph metadata, safe structured data, production-only indexing, `robots.txt`, sitemap policy and correct internal linking. Confirm `SITE_ENV`, `SITE_URL` and Vercel environment policy.
- Semantic heading order, real button/link destinations, alt text, visible keyboard focus, mobile menu focus handling, proper filter/accordion semantics, error summaries and `prefers-reduced-motion` support.
- Keep primary content present in the static HTML; don't rely on carousels or JavaScript for discoverability.
- Verify no horizontal overflow at 375, 390, 430, 768, 1280, 1440 and 1920px, with short viewport heights; check images, content clipping, mobile navigation, CTA targets, form handoffs, interactive elements and cross-browser behavior.
- Run `npm ci`, `npm run verify`, production/staging URL/sitemap policy checks, `npm run qa:visual` and `npm run qa:interactions`; record real pass/fail/not-run evidence. Correctly separate Lighthouse lab scores from field Core Web Vitals.
- Compare finished desktop and mobile screenshots side by side against the owner-supplied reference; report deviations and seek owner acceptance.

## Release gate

- Work on `redesign/**` branches and submit a **draft PR**; no direct push to `main`.
- Existing legal draft, contact provider, production DNS, Vercel production alias, Cloudflare preview protection, payments, account settings, access gates and production content remain unchanged without separate explicit approval.
- **Complete** means business data, visual references, internal pages, accessibility, responsive QA, test evidence and owner review have all passed. This plan and the initial copy corrections do **not** satisfy that definition yet.
