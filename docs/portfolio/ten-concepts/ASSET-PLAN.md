# Image-production and website-use plan — all ten concept projects
This document is the **current** image handoff. See `project-register.json` for exact IDs, names, categories and states; see `CURSOR-NEW-TASK.md` for the new task. Supersedes provisional three-project-only and legacy four-study imagery directions.

## Image use per project (all ten)
| Asset | Target | Where used | Critical rule |
|---|---|---|---|
| `cover.webp` (+ master PNG/JPEG) | approx. 1600×1067, 3:2 | homepage Selected Work and `/work` card | photorealistic and category-correct; descriptive alt; overlay `Concept Project` as real HTML |
| `detail-hero.webp` (+ master) | approx. 1920×1080, 16:9 | corresponding `/work#slug` detail section | visually distinct from card, accurate finished concept UI in photographic context |
| `desktop-ui.webp` | actual coded screenshot, typically 1440px or wider | detail page supporting image | screen content must be crisp and correct, NOT generative nonsense |
| `mobile-ui.webp` | actual coded screenshot at 390px viewport or appropriate | detail page responsive demonstration | physical device framing optional, but screen readable |
| `og.png` | 1200×630 | general `/work` metadata or future approved dedicated concept route | URL fragments are not separate OG pages; never claim unique per-concept previews for hash links |

**Owner-approved visual subjects**: Maison Vale — interiors; AURA — fashion e-commerce; FlowDesk — business SaaS; CampusOne — student portal; Bloom — wellness bookings; RoutePilot — delivery and logistics; Big Beerah — modest fashion/hijabs, NOT beverages; Amzlat — beauty/cosmetics; Opeyemi — phones/laptops/watches; Corporate — business website modernization.

## Exact seven pending generation commissions
| Project | Scene and device/layout | Distinct palette | Stock/AI and typography caution |
|---|---|---|---|
| Maison Vale Studios | Sunlit architectural living room, light-stone desk, editorial monitor showing designer portfolio, no person required | Warm cream, olive, walnut | One original 1536×1024 AI draft exists in the review pack; QA before accept |
| AURA Clothing | Distinct fashion boutique photoshoot with apparel, editorial product website presented as a real handheld tablet or large vertical store display | Black, off-white, champagne/seasonal accent | No copied runway brands/logos; avoid another horizontal laptop scene |
| FlowDesk OS | Industrial-chic team operations desk with professional monitor showing real coded productivity dashboard | Slate, cobalt, neutral teal | Never embed fabricated revenue figures or customer count in generated art |
| CampusOne Portal | Daylit library or campus study table, student-facing portal with actual course navigation on tablet | Academic blue, porcelain, ochre | Don't imply an actual university endorsement or reuse Lens University identity |
| Bloom Wellness Studio | Spa reception/therapy room, appointment mobile app in hands or on a counter, realistic botanical scene | Sage, linen, muted clay | Do not fabricate licensed clinical services, appointments or staff |
| RoutePilot Logistics | Dispatch operations at a warehouse with real photographed trucks/pallets and accurate tracking interface on rugged tablet | Steel gray, navy, amber | No delivery guarantees/tracking numbers or invented claims |
| Corporate Website Redesign & Digital Modernization | Architectural corporate office/atrium and an enterprise desktop website displayed on a conference screen | Graphite, stone, deep green | No real client logo, invented award, or before/after outcome |

**Updated source status (2026-11-21):** Six independent 1536×1024 AI-generated **multi-panel concept presentation drafts** now exist for Maison Vale, AURA, FlowDesk, CampusOne, Bloom and RoutePilot, plus an earlier Maison single-scene master. They are included in `sabiforge-ten-concepts-review-v2.zip` (not GitHub binary attachments). Corporate still lacks a standalone full-resolution draft and appears only in group mosaics. No concept cover/detail/OG set is fully QA-approved; generated text and metrics must be corrected and screenshots recreated in code before use.\n\nThe following are **NOT** seven approved production images:
- One AI-generated ten-concept mosaic and an alternative mosaic (moodboards/overview references only).
- Low-resolution individual crops derived from those mosaics (~300×300 each).
- Unverified image-generation jobs in Canva (some have started but not been visually inspected).

**To generate production masters:** source a legitimately licensed photograph or generate original photographic scene; independently build each distinctive interface as accurate HTML/CSS; capture real browser screenshots; composite without damaging readable UI; retain original photographic sources, screenshots and layered export; inspect pixel artifacts; add alt/provenance; export optimized formats. Do not falsely call an upscaled image full-resolution.

## Three owner-supplied reference identities
See `../three-concepts/ASSET-MANIFEST.csv` and the attached `sabiforge-three-concepts-handoff.zip` (binary files are **not** in this GitHub branch):
- **Big Beerah Collection:** owner-supplied fashion flyer; e-commerce products hijabs, abayas, jersey scarves, necklaces, fabrics, gift sets. Blush/burgundy/gold. Do not turn into a beverage brand.
- **Amzlat World of Beauty:** owner-supplied website screenshot; beauty, skin care, hair care, cosmetics and fashion. Pink/cream/black/gold.
- **Opeyemi Phones & Gadgets:** owner-supplied live demo photograph plus earlier website screenshot; blue/white electronics with WhatsApp-green enquiry; phones, laptops, smartwatches. Use the standalone HTML prototype `../three-concepts/opeyemi-v2/index.html` for reference only.
Owner attachments show real contact details and shop promises that must NOT be copied into unverified fictional website claims without separate approval.

## QA checklist for each project
Check **source availability; authorized use/licensing; correct product/industry; exact name without accents; realism; readable interface; no deformed merchandise/hands/devices; independent composition; correct card/detail crop; keyboard-accessible HTML disclosure; alt text; provenance; file-size target with quality check; consistent colors within each concept; no stock watermark; no misleading social/price/contact/metrics.** Mark PASS/NEEDS FIX/MISSING. Report images individually.

## File path convention after approval
`src/assets/concepts/<id>/cover.webp`, `detail-hero.webp`, `desktop-ui.webp`, `mobile-ui.webp`.
Store master/provenance in the verified visual assets repository or agreed location. Do not hotlink external images in production.

**As of this handoff:** The only downloadable source bundle here is a **review** archive; seven independently generated production covers, ten detail views, and real website integration have not been verified. Do not mark those tasks complete.
