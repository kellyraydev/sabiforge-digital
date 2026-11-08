# Milestone D.1 — Hero lab checkpoint

Two isolated hero directions are available for visual review:

- `/hero-lab/human-digital` — Direction A, Human × Digital. A portrait-led composition with a laptop and phone interface study.
- `/hero-lab/atelier` — Direction B, Editorial Digital Atelier. A typographic composition built from layered coded interface plates.

Neither route replaces the approved homepage hero. The routes are marked `noindex` and are not added to the primary navigation or sitemap.

## Creative rationale

Direction A uses a human point of entry to make the studio feel approachable without making an unverified person part of the SabiForge story. The responsive product mockups then connect warmth to craft: brand-led commerce, editorial type and interface detail share one frame.

Direction B is more authored and system-led. Oversized type establishes a visual world first; the window, mint/coral study cards and specification rail make the design process feel tangible. It is deliberately less photographic and more like an editorial cover crossed with an active design desk.

## Recommendation

Recommend Direction A as the stronger conversion starting point for a first-time visitor: it introduces a human feeling quickly, gives the eye a memorable focal point and still proves interface craft. Direction B is the stronger route if the brand wants to lead with design authorship and attract design-sensitive founders.

## Performance implications

The only raster asset is `editorial-portrait.webp`, generated for this study, resized to 1200px wide and compressed to approximately 96KB. It is loaded eagerly only on Direction A because it is the hero focal asset; Direction B is CSS/SVG-free interface art and has no image request. Both directions use CSS motion only, respect `prefers-reduced-motion`, and avoid third-party requests.

## Image inventory

| Asset                                            | Source / rights                                                                             | Use                                     | Status                                                                                         |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------- | --------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `public/assets/hero-lab/editorial-portrait.webp` | OpenAI image generation, created 2026-11-06 for this repository; no real person represented | Anonymous portrait study in Direction A | Provisional art direction asset; replace with commissioned/licensed photography after approval |

No stock photography, client work, staff claim or fabricated achievement is used in these prototypes.
