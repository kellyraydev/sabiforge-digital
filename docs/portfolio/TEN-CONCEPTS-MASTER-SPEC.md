# SabiForge Digital — TEN concept projects (single authoritative handoff)
**Owner update:** 2026-11-21. **Status:** implementation brief only; no live changes, merge or publication authorized.
**Use this instruction over older four-study, six-homepage and three-concept handoff material when conflicts exist.**

## Scope
One canonical, typed `concepts` dataset feeding **both homepage Selected Work and /work** (with deliberate homepage curation/pagination if needed). Ten concepts, each clearly and permanently marked **Concept Project**. These are *not* customer projects, testimonials, live inventory, validated deployments or evidence of measurable outcomes. Remove all active references, anchors and unused demos for the superseded four: Àdùn Table (adun-table), Kòrà Home (kora-home), Mend Physio Studio (mend-physio), Tallyhouse (tallyhouse). Do not silently alter historical Git records; update old prose/doc references to point to this decision when appropriate.

## Approved register
| ID | Exact display name | Category | Creative direction |
|---|---|---|---|
| maison-vale-studios | Maison Vale Studios | Interior Design / Creative Studio | Warm luxury interiors; architectural photography; ivory/oak/stone/charcoal, desktop design studio site |
| aura-clothing | AURA Clothing | Fashion / E-commerce | Fashion/editorial product photography; black/white with restrained accent; shop/category UI |
| flowdesk-os | FlowDesk OS | Business Software / SaaS | Authentic office context with real coded dashboard, task boards, projects; slate/navy/pale blue |
| campusone-portal | CampusOne Portal | Education / Student Portal | Library/campus photography, laptop with portal UI; academic navy/white/sky |
| bloom-wellness-studio | Bloom Wellness Studio | Wellness / Booking Website | Spa photography, natural beige/sage, real booking screen |
| routepilot-logistics | RoutePilot Logistics | Logistics / Business Platform | Dispatch desk/warehouse, shipment-tracking UI; steel blue/orange/graphite |
| big-beerah-collection | Big Beerah Collection | **Modest Fashion & Accessories / E-commerce** | **Owner photo is authority: hijabs, abayas, jersey scarves, fabrics, necklaces**; blush/burgundy/gold; NOT beverages |
| amzlat-world-of-beauty | Amzlat World of Beauty | Beauty, Cosmetics & Fashion Retail | Owner screenshot authority: makeup/skincare/hair/fashion; pink/cream/black/gold |
| opeyemi-phones-gadgets | **Opeyemi Phones & Gadgets** | Electronics Retail | Owner photos/site authority: cobalt blue/white/green WhatsApp; iPhone/MacBook/Apple Watch, Buy/Sell/Swap |
| corporate-digital-modernization | Corporate Website Redesign & Digital Modernization | Corporate / Digital Transformation | Photographic corporate workplace, trustworthy enterprise website; graphite/stone/dark forest |

**Naming:** New concept names contain no accents or diacritics (A not À; e not é). The owner supplied project labels above are authoritative; don't rewrite them. Keep existing URL slugs if they remain stable. Do not invent dedicated detail-page routes without approval.

## Assets
A separate **sabiforge-ten-concept-review-pack.zip** was assembled in ChatGPT on 2026-11-21, with:
- 4 **original user-uploaded reference JPEGs** for Big Beerah, Amzlat and Opeyemi
- standalone Opeyemi responsive HTML prototype and screenshot/asset files in `three-concepts-source/`
- full-resolution **AI-generated composite** seven-project style direction and ten-project overview in `seven-new/master-collages/`
- **7 individually named cropped draft PNGs** and 7 matching WebP files in `seven-new/draft-crops/` and `seven-new/draft-webp/`
- SHA-256 and true crop dimensions in `ASSET-MANIFEST-SEVEN-DRAFTS.csv`

**Transfer boundary:** The actual binary ZIP/photos/PNGs/WebPs are **not committed on this branch**. Cursor must receive the ZIP as an attachment/download and verify it. This branch contains the source Opeyemi HTML and text instructions inherited from the three-concept handoff. DO NOT claim the draft crops are full-resolution independent masters. The seven crop drafts measure roughly 500–766 pixels wide and are for review, not production. AI-rendered interface text can be incorrect.

**Production imagery:** For each of 10 concepts, make one approved native 3:2 cover (target ~1600×1067), a distinct 16:9 detail view (~1920×1080), and a 1200×630 OG/metadata crop *when backed by an actual supported route*. Use photo-quality licensed/original imagery combined with **actual browser screenshots of coded concept UIs**. Each industry uses its own photographic context, palette, device framing, typography; no repeated neon laptop mockup. Review every item for realism, category fit, legible UI, errors, artifacts, rights/provenance and copy before public use. Never invent inventory, pricing, address, phone, endorsements, registration, warranties, conversion metrics, testimonials, staff or client claims. Maintain `docs/IMAGE-PROVENANCE.md`. Hashed `/work#slug` sections do not get separate OG metadata; a shared /work OG is fine without approved separate routes.

## Source of truth and implementation
Start from the actual PR #12 head and approved design ledger, read `AGENTS.md`, `docs/REBUILD-BRIEF.md`, `src/data/concepts.ts`, homepage and /work components, their tests, and project asset paths. **Do not execute a previous prompt as if it had been run**. The owner says no prior Cursor prompt was run.

Make one typed data register of ten concepts, replace both competing arrays/old data, remove old /work studies, anchors and unused demos, migrate links/filters and tests, keep concept detail behavior accessible without JS. Reuse real client-reference design context ONLY as visual guidance; don't imply contracts or active store affiliations. On-site marketing copy and pricing remain in semantic HTML, not baked into image assets.

**Approved positioning statement for implementation decisions:**
"At SabiForge, we do not just build websites. We build with the latest technology and modern design standards: fast, responsive, accessible, and conversion-focused. We never ship outdated or legacy design."

Supporting verifiable differentiation: Astro + TypeScript + Tailwind CSS + React islands; original systems, conversion-aware CTAs, approved published pricing/scope/turnaround, real post-launch care offering.

## Approval and QA
Before integrating each new production image, label Approved / Needs Revision / Rejected; provide full asset mapping (project ID, usage, route, alt text, licensing, exact image size, source, status). Do not publish AI composite drafts unreviewed.

Run `npm run verify` and relevant interaction/visual/SEO checks. Verify 375, 390, 430, 768, 1280, 1440, 1920 widths; keyboard, no-JS, accessible content, image crops, motion, broken links, page metadata, no old studies, all ten concepts present. Record PASS/FAIL/NOT RUN accurately. Keep production, main, PR #12, prices, DNS and deployments unchanged. Commit changes on a review branch and request owner approval before merge.

## Cursor instructions
Open `docs/portfolio/TEN-CONCEPTS-NEW-CURSOR-TASK.md` in THIS branch and follow it exactly. The earlier `docs/portfolio/three-concepts/` source is subordinate to this master ten-concept direction.
