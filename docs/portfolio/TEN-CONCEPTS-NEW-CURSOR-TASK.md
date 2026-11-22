# NEW Cursor Task — SabiForge V2 Ten-Concept Portfolio (start from scratch)

## First read

1. `AGENTS.md` and `docs/REBUILD-BRIEF.md`.
2. `docs/portfolio/TEN-CONCEPTS-MASTER-SPEC.md` on branch `redesign/v2-ten-concepts-handoff`. This is authoritative for new portfolio scope.
3. `docs/portfolio/three-concepts/README.md` and `docs/portfolio/three-concepts/SOURCE-CURSOR-BRIEF.md` for real owner-provided references and the original Opeyemi prototype.
4. Extract the attached `sabiforge-ten-concept-review-pack.zip` (provided separately to your Cursor task). Verify the file manifest and all reference images. If you cannot access the ZIP, mark binary assets BLOCKED and still plan/code against the approved data without pretending images exist.
5. Examine actual PR #12 base/head, `src/data/concepts.ts`, homepage and `/work`, all tests, layout, assets and documentation. Do not assume a previous Cursor prompt has already been applied; **the owner has not run any previous Cursor prompt**.

## Goal

Implement a premium, credible TEN-concept portfolio with a single typed data register powering both homepage and /work, visually aligned with the current approved navy/turquoise/violet SabiForge V2 frame while preserving individually distinct fictional concept brands.

## Register — exact values

1. `maison-vale-studios` — Maison Vale Studios — Interior Design / Creative Studio
2. `aura-clothing` — AURA Clothing — Fashion / E-commerce
3. `flowdesk-os` — FlowDesk OS — Business Software / SaaS
4. `campusone-portal` — CampusOne Portal — Education / Student Portal
5. `bloom-wellness-studio` — Bloom Wellness Studio — Wellness / Booking Website
6. `routepilot-logistics` — RoutePilot Logistics — Logistics / Business Platform
7. `big-beerah-collection` — Big Beerah Collection — Modest Fashion & Accessories / E-commerce (**NOT beverages**)
8. `amzlat-world-of-beauty` — Amzlat World of Beauty — Beauty, Cosmetics & Fashion Retail
9. `opeyemi-phones-gadgets` — Opeyemi Phones & Gadgets — Electronics Retail / Buy, Sell & Swap
10. `corporate-digital-modernization` — Corporate Website Redesign & Digital Modernization — Corporate / Digital Transformation

### Destructive portfolio migration (limited)

Remove from active /work and homepage the four obsolete studies:

- Àdùn Table / adun-table
- Kòrà Home / kora-home
- Mend Physio Studio / mend-physio
- Tallyhouse / tallyhouse

Delete obsolete components, sample copy and links only when verified no longer used. Preserve historical Git commit history and accurate historical records. Keep all ten modern entries **clearly marked "Concept Project"**; no paid-client, real deployment, stock, guarantee, testimonial or performance claim.

### Naming

All NEW project names use plain English letters, no accents/diacritics (e.g. Maison Vale, NOT Maison Valé; don't introduce À in new names). Preserve original business-supplied logo/content only in cited reference art; use clean new display name in site components.

### Assets / creative production

Treat the ZIP's seven AI-generated photographic collage panels as **review drafts only**. Cropped 500–766px drafts are not independent, full-resolution production assets. The source images of Big Beerah, Amzlat and Opeyemi are visual authority. For all TEN concepts, create:

- Realistic individual 3:2 photographic cover with a **real coded website screenshot**, then show it in physical context. Target ~1600×1067, no upscaling-as-original.
- A different realistic 16:9 detail hero (~1920×1080); add relevant mobile view.
- 1200×630 OG art where an actual route supports it; don't invent individual metadata routes for /work#hash.
- Responsive WebP/AVIF derivatives and alt text; retain original masters and provenance and licensing records.

Each concept needs separate palette, scene, typography and device styling. The website interfaces must be implemented accurately in HTML/CSS (rather than illegible AI text inside the generated image). Do not bake SabiForge marketing copy into imagery. Do not use unverified contact info, pricing, claims, social profiles, product inventory, business registrations or warranties. Review every image, regenerate or revise failed ones and get owner approval BEFORE publishing.

### Opeyemi prototype

Use `docs/portfolio/three-concepts/opeyemi-v2/index.html` plus package files to adapt a responsive electronics retail demo, not copy the old demo's obsolete details:

- Blue/white identity, prominent hero with phones/laptops/watches, green WhatsApp CTA as disabled/local demo until contact verification.
- Browse iPhones, MacBooks and Watches, product filters/specs, enquiry-first flow, Buy/Sell/Swap section, mobile nav.
- All sample devices clearly illustrative and no invented real prices, warranties or purchase checkout.
  Big Beerah uses real modest-fashion categories from the flyer. Amzlat uses its reference's beauty/hair/cosmetics and fashion taxonomy.

### Technology positioning

Include in on-page SabiForge narrative (NOT in imagery):
"At SabiForge, we do not just build websites. We build with the latest technology and modern design standards: fast, responsive, accessible, and conversion-focused. We never ship outdated or legacy design."

Support it accurately with Astro, TypeScript, Tailwind CSS, React islands, custom design systems, conversion pathways, honest published prices/scopes/turnaround, and post-launch support.

### Workflow

Work in small, reviewable commits on a new implementation branch based on the verified current V2 PR #12 head; do **not** auto-merge it. Phase A inspect/plan; B migrate typed data and routes; C make correct coded concepts and visual assets; D integrate homepage and /work; E QA/screenshots; F owner review. Record any asset that needs verification as MISSING/BLOCKED, not as a guessed fact. Don't modify PR #12 directly unless expressly approved.

Run `npm run verify`, relevant visual and interaction QA, validate 375/390/430/768/1280/1440/1920, keyboard, no-JS, reduced motion, contrast, correct concept labels and URLs, broken assets/links, and check no old active concept studies. Report precise commands, PASS/FAIL/NOT RUN and committed SHA. No production deploy, branch merge, DNS, accounts, payment, price or unrelated changes.

## Deliverable

A review-ready TEN concept portfolio implementation on a dedicated branch, full asset mapping and provenance, screenshot comparison and QA report, and PR draft for user approval. When image masters are unavailable or artwork isn't approved, stop those integrations rather than publishing lower-quality placeholders.
