> **SUPERSEDED AS A STANDALONE TASK (2026-11-21):** This three-project handoff remains a source reference for Big Beerah Collection, Amzlat World of Beauty and Opeyemi Phones & Gadgets. **For implementation, use** `../ten-concepts/CURSOR-NEW-TASK.md` and the ten-project JSON register, not this file by itself. Original JPEG/PNG/WebP binaries remain in the downloadable ZIP, not this branch.

# Cursor brief: SabiForge V2 three-concept alignment

## Owner decision — 2026-11-21
The owner's supplied reference imagery supersedes previous generic/neon art for these identities:
1. `big-beerah-collection` — **Big Beerah Collection**, modest fashion and accessories / e-commerce, NOT beverage; blush, burgundy, gold. Hijabs, abayas, jersey scarves, necklaces, fabric bundles, ready-to-wear.
2. `amzlat-world-of-beauty` — **Amzlat World of Beauty**, beauty, cosmetics, hair, fashion retail; pink, cream, black, gold; broad product categories.
3. `opeyemi-phones-gadgets` — **Opeyemi Phones & Gadgets**, electronics retail / buy, sell, swap; cobalt blue, white, WhatsApp green; phones, MacBooks, Apple Watches.

These names are concept-only; never depict paying work, active services or real verified sales.

## Required asset inspection
Obtain `sabiforge-three-concepts-handoff.zip` from the owner/this chat. It is **not included in this GitHub branch**. Inspect all four `references/*.jpeg` before implementation. The package's `opeyemi-v2/index.html` is a standalone prototype and its `review/opeyemi-responsive-*.png` are existing browser previews, not deployed pages. Use them for design/behavior reference; adapt into Astro/React components in the website repo. `review/*DRAFT-NOT-APPROVED.png` images may contain false claims and are not production assets.

## Opeyemi redesigned layout contract
1. Top-level, visible **Concept Project** disclosure, independent of business header.
2. Responsive header with G mark, blue-and-white branding, Home, Shop, Swap & Sell, About, and a WhatsApp enquiry affordance. Without a verified number, this is a local demo (never a live link).
3. Hero with authentic, properly licensed photo or real product shots of phone/laptop/watch; clear headline and browse + swap CTAs.
4. Four benefit cues based on interface features, **not unverified CAC/warranty/shipping claims**.
5. Three shopping categories (iPhones, MacBooks, Apple Watches).
6. Searchable/filterable sample catalog with no invented live inventory, prices or availability.
7. Swap & Sell flow explaining current device, condition/model and request; no actual purchase or valuation.
8. Complete and accessible mobile layout, clear end-of-page fictional/demo disclosure.

Maintain distinct imagery and colors for Big Beerah and Amzlat. Do not use same neon laptop/phone mockup or apply SabiForge navy/turquoise/violet branding inside the fictional stores. SabiForge's surrounding portfolio UI retains that system.

## Portfolio architecture
Inspect `AGENTS.md`, `docs/REBUILD-BRIEF.md`, PR #12 actual branch and `src/data/concepts.ts`. Create one authoritative ten-project data model shared by homepage and `/work`. Remove the four superseded /work studies and old anchors/unused components. Preserve other approved data, services, prices, form behavior and links. No new routes unless explicitly approved.

Preserve positioning in page text, not images: **"At SabiForge, we do not just build websites. We build with the latest technology and modern design standards: fast, responsive, accessible, and conversion-focused. We never ship outdated or legacy design."** Explain Astro + TypeScript + Tailwind CSS + React islands, original systems, conversion paths, honest scope/pricing and post-launch care only with verified claims.

## Images and metadata
Create a dedicated realistic 3:2 cover, complementary 16:9 detail image, and any appropriate OG artwork for each concept, only after user review. Prefer actual coded UI screenshots composited into photographic environments. Image masters and licenses/provenance in `docs/IMAGE-PROVENANCE.md`, optimized WebP/AVIF derivatives and accurate alt text. Do not fabricate logos, contacts, inventory, paid clients, metrics or results. A `/work#slug` hash is not a separate OG target.

## QA before marking ready
Run `npm run verify`; test seven widths 375/390/430/768/1280/1440/1920, keyboard, image crops, filters, links, no-JavaScript experience, focus, reduced motion and accessibility. Label PASS/FAIL/NOT RUN from observed results only. Check no obsolete studies, no false claims, no broken links. Report source files and final commit refs.

## Guardrails
Review branch only. No live deployment, PR merge, production, DNS, payment, scope or priced offer changes without separate owner approval.