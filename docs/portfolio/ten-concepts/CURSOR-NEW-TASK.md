# Cursor NEW TASK — SabiForge V2 complete ten-concept portfolio
**Owner brief date:** 2026-11-21  
**Implementation status:** NOT RUN. This is a verified handoff, not a claim that the website is finished or published.

## One task; read all sources before editing
Repository: `kellyraydev/sabiforge-digital`  
Current handoff branch: `redesign/v2-three-concepts-handoff` (already based on PR #12's `redesign/v2-foundation`).  
PR #12: `https://github.com/kellyraydev/sabiforge-digital/pull/12`.  
Read `AGENTS.md`, `docs/REBUILD-BRIEF.md`, `docs/portfolio/ten-concepts/project-register.json`, `docs/portfolio/ten-concepts/ASSET-PLAN.md`, and `docs/portfolio/three-concepts/` **in full**; then inspect current site components, links, images and test scripts. Verify branch heads again: they may have advanced.

The **10-entry register is the single authoritative approved set**, replacing both the old `concepts[]` and six-entry `homepageConcepts[]` (after resolving consumers). Do not assume `/work` has ten cases yet; it still contains legacy case studies until you implement and verify migration.

### Exact approved names, IDs and categories
1. `maison-vale-studios` — Maison Vale Studios — Interior Design / Creative Studio
2. `aura-clothing` — AURA Clothing — Fashion / E-commerce
3. `flowdesk-os` — FlowDesk OS — Business Software / SaaS
4. `campusone-portal` — CampusOne Portal — Education / Student Portal
5. `bloom-wellness-studio` — Bloom Wellness Studio — Wellness / Booking Website
6. `routepilot-logistics` — RoutePilot Logistics — Logistics / Business Platform
7. `big-beerah-collection` — Big Beerah Collection — **Modest Fashion / E-commerce, NOT beverages**
8. `amzlat-world-of-beauty` — Amzlat World of Beauty — Beauty / Cosmetics Retail
9. `opeyemi-phones-gadgets` — Opeyemi Phones & Gadgets — Electronics Retail
10. `corporate-digital-modernization` — Corporate Website Redesign & Digital Modernization — Corporate / Digital Transformation

**All ten must be called “Concept Project”** and explicitly presented as fictional design demonstrations, not client work. Do not add accents or diacritical marks to new studio names: **Maison Vale**, not “Maison Valé”, etc.

### Remove old studies, no partial coexistence
Remove active cards/studies/demo routes and anchors for:
- Àdùn Table — `adun-table`
- Kòrà Home — `kora-home`
- Mend Physio Studio — `mend-physio`
- Tallyhouse — `tallyhouse`

Preserve accurate historical documentation rather than rewriting repo history. Update tests for actual replacement behavior.

## Design and photography: make ten materially different real-looking sites
**Photography-based, not illustrations or ten identical neon laptop renders.** Every concept requires distinct palette, photographed environment, layout pattern, typography, lighting, and website genre. Build real styled concept UI with coded and readable text, capture desktop/mobile in Playwright, and place those authentic screenshots into photorealistic device/environment compositions. Generated or sourced photographs MUST be legitimately usable; save source, license and generation provenance in `docs/IMAGE-PROVENANCE.md`. AI-generated people are not real team/staff/client models. No reused staging/foreground across unrelated concepts.

**Three owner visual authorities (must load JPEGs from supplied ZIP):**
- Big Beerah: supplied modest fashion flyer. Hijabs, abayas, jersey scarves, fabric bundles, necklaces, ready-to-wear; blush/burgundy/gold. Do not change category to beverages.
- Amzlat: supplied beauty-store screenshot. Beauty, cosmetics, skin and hair care and fashion; pink/cream/gold/black.
- Opeyemi: supplied blue-and-white electronics website and real screen photograph. iPhones/MacBooks/Apple Watches, filters, storage/condition, sample catalog, Buy/Sell/Swap and WhatsApp enquiry (only if verified destination). Use `docs/portfolio/three-concepts/opeyemi-v2/index.html` as a **standalone design reference**, not deployed code; it is not a production integration. Do not copy details from Amzlat screenshot into Opeyemi.

**Other seven (create and review each separately, not by slicing a collage):**
- Maison Vale: warm high-end interior photography and editorial project website, warm stone/olive/ivory. A high-res generated draft exists in the chat pack.
- AURA Clothing: editorial fashion/apparel imagery and responsive boutique store; monochrome with seasonal accent; *not* a repeat of the Opeyemi template.
- FlowDesk OS: photorealistic business workstation and a genuinely coded SaaS app screen, slate/blue/teal.
- CampusOne Portal: student library/campus setting and functional-looking student services portal, academic blue/cream.
- Bloom Wellness Studio: welcoming spa room/booking system, sage/cream/clay.
- RoutePilot Logistics: operational dispatch/warehouse scene with precise shipment tracking interface, industrial amber/steel.
- Corporate Website Redesign & Digital Modernization: contemporary enterprise/corporate environment with real-looking business site, graphite/stone/forest; no unverified customer company name or results.

**Image targets (not a claim currently delivered):** per concept (a) high-res original cover 3:2, (b) approved optimized WebP/AVIF cover approximately 1600×1067, (c) independent 16:9 detail art approximately 1920×1080, (d) accurate desktop and mobile UI screenshots, (e) optional 1200×630 metadata image for an actual dedicated route, (f) crop and alt-text guidance. Masters retained without recompression. Separate QA approval for every image: realism, spelling, exact identity, interface accuracy, deformities, reuse, provenance, compression, crops and false claims. Do not upscale a small collage crop and claim high-resolution. Draft boards and Canva jobs are NOT final assets.

**Asset transfer note:** The ChatGPT **`sabiforge-ten-concepts-review-v2.zip`** consolidates the three owner-supplied identity references, standalone Opeyemi prototype, six separate 1536×1024 AI-generated **multi-panel concept drafts**, one standalone full-size Maison scene and portfolio overview references. **The ZIP is not committed as GitHub binary image files by this connector.** Attach it to the new Cursor task and verify its `ASSET-MANIFEST.json`. Corporate has **no independent full-resolution image yet**. The six boards are unapproved review drafts, not ready-to-publish card/detail/OG assets; generated UI details and claims must be replaced with actual coded screenshots and reviewed. Copy only reviewed files to the working branch. Do not pretend these binaries are in GitHub or that final art is complete.

## Architecture and routes
- Source canonical ten project records in one typed data module, preferably the existing `src/data/concepts.ts`, after inspecting consumers.
- Both homepage Selected Work and `/work` must show the identical ten concepts; pagination/show-more is acceptable if all ten are reachable and accessible.
- Each concept gets a detailed, informative, accessible case study (problem, idea, visual approach, screenshot, feature examples, constraints/disclaimer). Avoid “client outcome” language. No bogus live bookings, transactions, shipping promises, sales or dashboards presented as real.
- Keep existing `/work#slug` anchor policy initially. An anchor is not a separate OG route. Propose distinct detail routes and metadata only in review notes unless the owner authorizes route changes.
- Provide understandable HTML content without JavaScript; interactive demos must degrade gracefully.
- Keep SabiForge framing navy/turquoise/violet but concept brands independent.

## Positioning and copy policy
Use this owner-approved positioning as a **content-and-engineering requirement**, not as text baked into graphics:

> At SabiForge, we do not just build websites. We build with the latest technology and modern design standards: fast, responsive, accessible, and conversion-focused. We never ship outdated or legacy design.

Evidence-based differentiators: Astro, TypeScript, Tailwind CSS, React islands with performance-first static architecture where appropriate; original design, conversion-aware navigation, honest published prices/scopes/timelines, and genuine post-launch care. Do not introduce unverified benchmark numbers, client testimonials, revenue results, inventory, warranties, business registration, fabricated contacts or offers.

## Steps (make reviewable commits)
1. Inspect repository/PR #12 and assets. Return source/assumption/missing register without using guessed business facts.
2. Create a `redesign/v2-ten-concepts` working branch from the latest verified handoff branch; do NOT start from `main`.
3. Implement canonical project data and replace old concepts; update all consumers/tests and remove unused legacy demo components safely.
4. Build ten distinct photorealistic concept art/accurate coded mock interfaces and responsive screenshot captures; submit each to an image QA gate before marking it approved.
5. Integrate all ten homepage and /work cards plus concept detail sections; copy optimized approved assets into the website repo; master assets in the visual assets repo if authorized and available.
6. Refresh documentation, `README` portfolio section, accessible alt text, content disclosures and provenance.
7. Run `npm run verify` and actual visual/interaction tests at 375/390/430/768/1280/1440/1920; keyboard, reduced motion, no-JS, contrast, layout, image crops, broken links and routes. Report PASS/FAIL/NOT RUN. Preserve staging/production isolation.
8. Commit and push to GitHub for review. Deliver branch, commits, file inventory, screenshots and missing asset/approval register; do NOT merge or deploy.

**Do not** change production, live DNS, `main`, payments, approved pricing or published claims. No paid services without explicit approval. If quota blocks generation, stop that image and mark MISSING, do not silently substitute a low-quality tile.

## Final acceptance
- Ten project names/IDs match register exactly; 10 on home and /work.
- Four legacy projects absent from active pages and demos.
- All concept cases labeled and truthfully illustrative.
- Ten distinct, reviewed, genuinely photorealistic scene+UI covers (not seven collage slices).
- Real responsive concept detail content and browser screenshots.
- No unapproved public URL or published claims changes.
- Demonstrated tests and visual comparisons, then owner sign-off before deployment.
