# Cursor implementation brief — SabiForge V2, three concept corrections

## Scope and authority

The owner's 2026-11-21 references in `references/` supersede any earlier AI art direction for **Big Beerah Collection**, **Amzlat World of Beauty**, and **Opeyemi Phone & Gadgets**. User-verified image direction is authoritative; generated comparison mockups are not. Keep the overall approved *ten-concept* portfolio and the project's established navigation, copy and commercial data; make no unrelated changes.

Do not edit `main`, merge a PR, deploy, change live payments, create real product inventory or publish client claims. Before starting, inspect `AGENTS.md`, `docs/REBUILD-BRIEF.md`, current branch, PR #12 head/base, and current `src/data/concepts.ts` consumers. Existing references and contact information in the site are not automatically verified for the new concept brands.

### Correct project identities

1. `big-beerah-collection` — **Big Beerah Collection**, **Modest Fashion & Accessories / E-commerce**, not beverages. Reference: `references/big-beerah-original-flyer.jpeg`. Use blush, burgundy, gold. Category examples: hijabs, abayas, jersey scarves, necklaces, fabrics, ready-to-wear. Retain fashion identity, do not turn it into a drinks store.
2. `amzlat-world-of-beauty` — **Amzlat World of Beauty**, **Beauty / Cosmetics / Hair / Fashion Retail**. Reference: `references/amzlat-original-website-reference.jpeg`. Honor pink/cream, black wordmark and gold accents, varied beauty and fashion categories, photographic cosmetics.
3. `opeyemi-phones-gadgets` — **Opeyemi Phone & Gadgets**, **Electronics Retail / Buy Sell Swap**. References: `references/opeyemi-existing-laptop-photo.jpeg`, `references/opeyemi-existing-website-screenshot.jpeg`. New direction/prototype: `opeyemi-v2/index.html`; screenshots in `review/`. Brand identity: cobalt blue/white, WhatsApp green, G logo. Device categories: iPhones, MacBooks, Apple Watches; optional accessories only with verified content.

All must be explicitly labeled **Concept Project** and never presented as paying client work. Avoid diacritics in new concept names, including Maison Vale Studios elsewhere in the ten-project register.

### Opeyemi new page structure

1. Clear concept disclosure, separate from brand navigation.
2. Header: G logo / Opeyemi Phone & Gadgets, Home, Shop, Swap & Sell, About, WhatsApp enquiry CTA. Responsive menu with accessible expanded state.
3. Hero: professional photographic phone/laptop/watch cluster, one concise headline, Shop Devices + Swap & Sell CTAs.
4. Four feature cues without unverified registered-status/warranty claims.
5. Three large category cards for iPhones, MacBooks and Apple Watches.
6. Responsive search/filterable sample device catalog. Do not show unverified live inventory, prices, product availability or customer guarantees.
7. Swap & Sell guidance: current device → condition/model → enquiry, with live integration explicitly pending.
8. Clear concept disclosure/footer. Connect WhatsApp only after the actual number and consent are verified.

Port the *semantic HTML and behavior* into reusable Astro/React components following the existing codebase patterns. Do not turn the whole page into a screenshot. The HTML provided is a reference prototype, not a production drop-in. Its generated product cutouts are small and illustrative; replace them with licensed/source-approved higher-resolution product photography for final publication.

### Asset placement

- The four source images are design-evidence/reference assets, not default production marketing banners.
- For each concept, commission/produce a realistic final 3:2 cover, 16:9 detail hero and appropriate screenshot/device view using its specific brand identity.
- Maintain `docs/IMAGE-PROVENANCE.md` (generated status, source, licensing, owner approval), optimized derivatives and descriptive alt text.
- Use actual browser screenshots of completed/functional demo UIs inserted into real photographic scenes, rather than generated text pretending to be a readable website.
- Never reuse identical neon lighting, laptop template or studio background for all three.
- For any future per-project OG image, first approve whether individual detail routes exist. Hash links like `/work#...` share the `/work` metadata.

### Portfolio data and safeguards

Keep the existing six V2 homepage concepts and four additional approved entries, with *one canonical ten-project data source* once the ten-project migration is implemented. Remove the four old legacy `/work` concept studies per user approval, only on the appropriate working branch. When updating this specific three-concept group, do not inadvertently reintroduce them.

Keep positioning, process, technology and differentiation copy in the page content, never embedded in the photographs. Preserve the approved tech-forward SabiForge positioning and current stack: Astro, TypeScript, Tailwind CSS, React islands, performance-first static architecture, original design, conversion pathways, transparent accurate pricing and after-launch support.

### Before marking ready

Verify project names, products, correct category, readable interface screenshots, real-world photographic plausibility, no copy/pasted business contact details, no invented stats, no social/client claims, responsive crops and exact routes. Run `npm run verify`, visual/interaction checks at 375/390/430/768/1280/1440/1920, and test keyboard and no-JS experience. Report PASS/FAIL/NOT RUN. Do not merge or deploy without explicit approval.