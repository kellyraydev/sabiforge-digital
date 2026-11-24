# Image requests

> **Status (22 Nov 2026): all 12 delivered** in `36fc322` and in use. See `docs/IMAGE-PROVENANCE.md`. The list below is kept so they can be regenerated at native high resolution later.

Images the v2 homepage still needs. Until each one arrives, the page shows a designed
gradient placeholder (`src/components/ui/ImageSlot.astro`), so nothing looks broken.

**How to deliver:** generate each image, keep the exact file name below, and send it in
chat (or commit it to `src/assets/` at the path shown). Claude then wires it in, checks the
crop at every screen width, and records it in `docs/IMAGE-PROVENANCE.md`.

**Rules for every image** (`AGENTS.md` §4):

- **Style:** dark navy background (#04061a to #0f1433), violet (#7c3aed) and cyan (#22d3ee) light, soft glow, premium and clean. It should match `docs/references/hero-target-v2.jpeg`.
- **No real brands:** no real logos, brand names or app icons. Apple-style devices are fine, but without visible logos.
- **Screens:** UI text should be minimal and readable. Use only the fictional names given.
- **People:** generated people must look natural and must never be presented as SabiForge staff, clients or testimonials.
- **Format:** PNG or high-quality JPG, at or above the size shown, with no watermark.

| #   | Slot id                                          | Save as                                         | Size (min)      | Where it shows             |
| --- | ------------------------------------------------ | ----------------------------------------------- | --------------- | -------------------------- |
| 1   | `service-custom-website-design-development`      | `src/assets/services/business-websites.png`     | 1600×900 (16:9) | Services card 1            |
| 2   | `service-shopify-ecommerce-development`          | `src/assets/services/online-stores.png`         | 1600×900        | Services card 2            |
| 3   | `service-custom-software-and-business-platforms` | `src/assets/services/custom-software.png`       | 1600×900        | Services card 3            |
| 4   | `service-website-redesign-modernization`         | `src/assets/services/redesign-support.png`      | 1600×900        | Services card 4            |
| 5   | `concept-maison-vale-studios`                    | `src/assets/concepts/maison-vale-studios.png`   | 1200×900 (4:3)  | Selected work              |
| 6   | `concept-aura-clothing`                          | `src/assets/concepts/aura-clothing.png`         | 1200×900        | Selected work              |
| 7   | `concept-flowdesk-os`                            | `src/assets/concepts/flowdesk-os.png`           | 1200×900        | Selected work              |
| 8   | `concept-campusone-portal`                       | `src/assets/concepts/campusone-portal.png`      | 1200×900        | Selected work              |
| 9   | `concept-bloom-wellness-studio`                  | `src/assets/concepts/bloom-wellness-studio.png` | 1200×900        | Selected work              |
| 10  | `concept-routepilot-logistics`                   | `src/assets/concepts/routepilot-logistics.png`  | 1200×900        | Selected work              |
| 11  | `why-sabiforge`                                  | `src/assets/home/why-sabiforge.png`             | 1400×1200       | "Why work with SabiForge?" |
| 12  | hero (optional upgrade)                          | `src/assets/hero/v2-devices@2x.png`             | 1600×1400       | Sharper hero devices       |

## Prompts (paste into Grok)

**1. Business Websites**

> Photorealistic product shot of an open silver laptop at a slight three-quarter angle on a dark navy background, soft violet and cyan rim light. The screen shows an elegant, modern small-business website homepage with a large hero photo of a warm interior, a clean navigation bar and a "Get in touch" button. No real logos or brand names. Premium, minimal, 16:9.

**2. Online Stores**

> Photorealistic tablet propped at a slight angle on a dark navy background with soft violet and cyan glow. The screen shows a clean online-store product page: a tan leather handbag on a white background, price in naira (₦), an "Add to cart" button and small thumbnails. No real logos or brand names. Premium, minimal, 16:9.

**3. Custom Software and Business Platforms**

> Photorealistic laptop on a dark navy background with violet and cyan light, the screen showing a dark-themed business dashboard: sidebar menu, three stat cards, a glowing purple-to-cyan area chart and a small table of orders. Fictional app name "FlowDesk". No real logos. Premium, minimal, 16:9.

**4. Website Redesign and Ongoing Support**

> Photorealistic laptop on a dark navy background with violet and cyan light. On the screen, a split "before and after" of the same small-business website: left half dated and cluttered, right half modern and clean with a large photo and clear buttons. A subtle glowing divider line between them. No real logos. Premium, minimal, 16:9.

**5. Maison Valé Studios** (interior design studio website)

> Website homepage mockup, slightly angled browser window floating on a soft dark navy background. The site, "Maison Valé Studios", is a calm, luxurious interior design studio: large photo of a sunlit living room with neutral tones, serif heading "Spaces that feel like home", minimal navigation. 4:3.

**6. AURA Clothing** (e-commerce fashion store)

> Website homepage mockup in an angled browser window on a dark navy background. Fashion store "AURA Clothing" with a cream-coloured layout, an elegant serif "AURA" logo, a hero photo of a stylish Black woman in a camel coat against a warm backdrop, and a "Shop the collection" button. 4:3.

**7. FlowDesk OS** (business operations platform)

> Dark-themed web app dashboard in an angled browser window on a navy background. App name "FlowDesk". Sidebar, KPI cards, a glowing violet-to-cyan line chart, tasks list. Clean, modern SaaS look. 4:3.

**8. CampusOne Portal** (student and academic portal)

> Website mockup in an angled browser window on a navy background. Bright, friendly university portal "CampusOne" with a photo of a red-brick campus building under blue sky, heading "Your campus, one portal", and quick links for courses, results and fees. 4:3.

**9. Bloom Wellness Studio** (wellness and booking website)

> Website mockup in an angled browser window on a navy background. Calm wellness and spa site "Bloom Wellness Studio" with soft sage-green tones, a photo of stacked smooth stones and green leaves, heading "Book your moment of calm" and a "Book a session" button. 4:3.

**10. RoutePilot Logistics** (logistics management platform)

> Dark-themed logistics web app in an angled browser window on a navy background. App name "RoutePilot". A city map with glowing cyan delivery routes and violet location pins, a sidebar of active deliveries with status chips. 4:3.

**11. Why work with SabiForge?**

> Cinematic photo of a thoughtful young Nigerian man with glasses, wearing a dark sweater, sitting at a desk with a laptop in a dim modern office, hand on chin, considering the screen. Soft violet and cyan ambient light. A subtle floating glass "</>" code icon beside him. Dark navy tones, shallow depth of field, landscape 7:6. He is a generic illustrative person, not a real individual.

**12. Hero devices (optional, sharper version)**

> Recreate the attached image (`docs/references/hero-target-v2.jpeg`, right half only) at higher resolution: open laptop showing the "BizFlow" dashboard and a phone showing the "AURA" store, on a dark navy background with sweeping blue and violet light waves. No headline text, nothing on the left third, 8:7.

## Not needed from Grok

The three owner-supplied concepts named after real businesses already have prepared images. They are kept outside this public repository until each business agrees (ledger 17).

## Demo images: AURA Clothing (task T1, requested 22 Nov 2026)

The AURA demo at `/work/aura-clothing/demo` shows a tonal placeholder for each piece until its photo exists. **No code change is needed:** commit a file at the path below and the demo picks it up on the next build. Then record it in `docs/IMAGE-PROVENANCE.md`.

**Shared style for all nine:** studio product photograph, portrait 4:5, at least 1200×1500 px, PNG or high-quality JPG. Warm ivory backdrop (#F7F3EE) with soft daylight and a gentle shadow. Palette limited to black, ivory, champagne (#CDB89A) and stone (#8A8175). Garments on an invisible mannequin ("ghost mannequin") or flat-laid, **no faces, no people, no hands**. No logos, labels, text or watermarks. Consistent lighting and camera height across the set so the grid looks like one shoot.

| #   | Save as                                                  | Prompt (add the shared style above)                                                                        |
| --- | -------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| A1  | `src/assets/demos/aura-clothing/ivory-wrap-blazer.png`   | Ivory wool-crepe wrap blazer with soft shoulders and a tie belt, shown closed on a ghost mannequin.        |
| A2  | `src/assets/demos/aura-clothing/black-wide-trouser.png`  | Black high-waisted wide-leg trousers with a sharp front crease, ghost mannequin, full length visible.      |
| A3  | `src/assets/demos/aura-clothing/champagne-waistcoat.png` | Fitted collarless champagne satin-crepe waistcoat with covered buttons, ghost mannequin.                   |
| A4  | `src/assets/demos/aura-clothing/silk-slip-dress.png`     | Bias-cut midi slip dress in washed champagne-stone silk with thin straps, hanging on a slim wooden hanger. |
| A5  | `src/assets/demos/aura-clothing/linen-shirt-dress.png`   | Relaxed ivory linen shirt dress with self belt and patch pockets, ghost mannequin.                         |
| A6  | `src/assets/demos/aura-clothing/knit-co-ord.png`         | Dark stone rib-knit fitted top and matching straight midi skirt, flat-laid together from above.            |
| A7  | `src/assets/demos/aura-clothing/structured-tote.png`     | Structured black smooth-leather tote bag, three-quarter angle, standing upright, no hardware logos.        |
| A8  | `src/assets/demos/aura-clothing/gold-cuff.png`           | Open brushed-gold cuff bracelet resting on an ivory linen fold, close-up, soft reflections.                |
| A9  | `src/assets/demos/aura-clothing/silk-square-scarf.png`   | Ivory and black silk twill square scarf with a simple geometric border, loosely folded, from above.        |

## Project blueprint images: AURA preview (requested 24 Nov 2026)

The AURA blueprint preview at `/preview/aura-clothing` shows a themed placeholder for each image until the file exists. **No code change needed:** commit a file at the path below and it appears on the next build. Record each in `docs/IMAGE-PROVENANCE.md`.

**Shared style:** warm ivory (#F7F3EE) studio background, soft daylight, gentle shadow. Palette: black, ivory, champagne (#CDB89A), stone (#8A8175). No logos, text or watermarks. Consistent lighting across the set.

| #    | Save as                                                                                                                                                                                                                   | Prompt (add the shared style)                                                                                                                                               |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | `src/assets/projects/aura-clothing/hero.webp`                                                                                                                                                                             | Portrait 4:5. A model (face optional, editorial) in an ivory wrap blazer against a warm studio wall, calm and minimal.                                                      |
| 2    | `src/assets/projects/aura-clothing/look-01.webp`                                                                                                                                                                          | Ivory wrap blazer worn open over a silk slip dress, full-length, editorial.                                                                                                 |
| 3    | `src/assets/projects/aura-clothing/look-02.webp`                                                                                                                                                                          | Black wide-leg trousers with a champagne waistcoat, editorial.                                                                                                              |
| 4    | `src/assets/projects/aura-clothing/look-03.webp`                                                                                                                                                                          | Rib-knit co-ord in dark stone, full length.                                                                                                                                 |
| 5    | `src/assets/projects/aura-clothing/look-04.webp`                                                                                                                                                                          | Structured black leather tote on a linen bench, still life.                                                                                                                 |
| 6    | `src/assets/projects/aura-clothing/look-05.webp`                                                                                                                                                                          | Champagne silk slip dress on a wooden hanger in daylight.                                                                                                                   |
| 7    | `src/assets/projects/aura-clothing/look-06.webp`                                                                                                                                                                          | Brushed gold cuff on folded ivory linen, close-up.                                                                                                                          |
| 8    | `src/assets/projects/aura-clothing/about.webp`                                                                                                                                                                            | Folded garments and fabric swatches on a studio table, overhead.                                                                                                            |
| 9–16 | `src/assets/projects/aura-clothing/product-blazer.webp`, `product-trouser.webp`, `product-waistcoat.webp`, `product-slip.webp`, `product-shirtdress.webp`, `product-coord.webp`, `product-tote.webp`, `product-cuff.webp` | Ghost-mannequin or flat-lay product shots of each piece named in the blueprint, portrait 4:5. (Same set as the AURA demo prompts; reuse those images if already generated.) |

## Project blueprint images: remaining concepts (requested 24 Nov 2026)

For the 8 concepts moving to blueprint previews (`docs/BLUEPRINT-CONVERSION.md`). Save each at
`src/assets/projects/<slug>/<file>.webp`. Until a file exists the slot shows a themed placeholder,
so blueprints build and merge without the art. **Every set:** no logos, brand names, UI text or
watermarks; consistent lighting; generated people are never SabiForge staff/clients. Hero and
room/space shots portrait 4:5; UI mockups landscape 4:3 (mobile mockups portrait 4:5) with only the
fictional name shown and minimal readable text. Record each delivered file in `docs/IMAGE-PROVENANCE.md`.

### maison-vale-studios — palette ivory #F6F1E8 / walnut #6B4A32 / stone #C8BBA8 / olive #5E6B45

| Save as (`.../maison-vale-studios/`) | Prompt                                                                                                                                                              |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `hero.webp`                          | Sunlit interior studio corner, travertine and linen, warm minimal, editorial.                                                                                       |
| `room-01.webp`..`room-06.webp`       | Six interiors: residential living room; hospitality lounge; commercial reception; walnut kitchen; stone bathroom; styled reading nook. Material-led, warm daylight. |
| `studio.webp`                        | Material swatches, walnut and olive fabric, stone samples on a studio table, overhead.                                                                              |

### flowdesk-os — palette slate #1C2430 / navy #243B5A / cloud #F4F7FB / teal #3E7C78

| Save as (`.../flowdesk-os/`)                            | Prompt                                                                                                                                    |
| ------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `hero.webp`                                             | Slate office desk, laptop angled, calm dark workspace, soft teal light. No readable UI.                                                   |
| `board-now.webp`, `board-next.webp`, `board-later.webp` | UI mockups of a dark task board (Now / Next / Later columns). Sample task names only, "FlowDesk OS" wordmark, no numbers or metrics. 4:3. |
| `board-mobile.webp`                                     | Mobile mockup of the same board, portrait 4:5.                                                                                            |

### campusone-portal — palette navy #12315C / porcelain #F4F7FB / sky #D5E4F5 / ochre #C4A15A

| Save as (`.../campusone-portal/`)           | Prompt                                                                                                                                                |
| ------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `hero.webp`                                 | Library study table with laptop, daylight, calm academic, no readable UI.                                                                             |
| `home.webp`, `module.webp`, `schedule.webp` | UI mockups of a student portal: current-module home; module page; week schedule. Sample content, "CampusOne" wordmark, no crest, no real grades. 4:3. |
| `mobile.webp`                               | Mobile mockup of the portal home, portrait 4:5.                                                                                                       |

### bloom-wellness-studio — palette sage #D7E4D4 / linen #F7F3EC / clay #8C5A45 / leaf #3E5C45

| Save as (`.../bloom-wellness-studio/`) | Prompt                                                                                                                                 |
| -------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `hero.webp`                            | Calm sage-and-linen wellness studio interior, soft daylight, plants, minimal.                                                          |
| `space-01.webp`..`space-04.webp`       | Four interiors: movement room; rest/recovery room; reception with plants; detail of linen and clay textures. No people posed as staff. |

### routepilot-logistics — palette graphite #2A3138 / navy #1C2B3A / steel #E8EEF2 / amber #E39B3A

| Save as (`.../routepilot-logistics/`)           | Prompt                                                                                                                                                                              |
| ----------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `hero.webp`                                     | Warehouse dispatch desk at dusk, rugged tablet, amber light, industrial calm. No readable UI.                                                                                       |
| `board.webp`, `lane-detail.webp`, `status.webp` | UI mockups of a dark dispatch board: lane board; lane detail; status view. Fake lane names (North, East, Yard), status words only, no tracking numbers, "RoutePilot" wordmark. 4:3. |
| `mobile.webp`                                   | Mobile mockup of the lane board, portrait 4:5.                                                                                                                                      |

### amzlat-world-of-beauty — palette pink #F3D5E0 / cream #FFF8F3 / black #161616 / gold #C6A15B — **unbranded**

| Save as (`.../amzlat-world-of-beauty/`)                                                    | Prompt                                                                                                                                                                       |
| ------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `hero.webp`                                                                                | Pink-and-black beauty still life, unbranded bottles and a gold tray, cream backdrop, soft light.                                                                             |
| `makeup.webp`, `skincare.webp`, `hair.webp`, `fashion.webp`, `bodycare.webp`, `nails.webp` | Six category still lifes, all products **unbranded** (blank bottles/tools, no logos or labels): makeup; skincare; hair tools; folded clothing; body-care jars; manicure set. |

### opeyemi-phones-gadgets — palette cobalt #123CC9 / deep #0A215F / white / green #079344 — **unbranded devices**

| Save as (`.../opeyemi-phones-gadgets/`)                        | Prompt                                                                                                            |
| -------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `hero.webp`                                                    | A phone, laptop and watch on a cobalt-and-white counter, clean studio light. Screens blank, **no visible logos**. |
| `device-phone.webp`, `device-laptop.webp`, `device-watch.webp` | Three device still lifes — generic phone, laptop, smartwatch — blank screens, no brand marks.                     |

### corporate-digital-modernization — palette graphite #1E2421 / stone #F3F1EC / forest #1F4D3A / brass #B7A48A

| Save as (`.../corporate-digital-modernization/`) | Prompt                                                                                                                                                             |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `hero.webp`                                      | Stone-and-glass corporate atrium, calm institutional, daylight, no signage or logos.                                                                               |
| `before.webp`, `after.webp`                      | UI mockups of a corporate homepage: a plain "before" layout and a clearer "after" layout. Neutral placeholder org name "Meridian", no real logos, no metrics. 4:3. |
| `mobile.webp`                                    | Mobile mockup of the "after" homepage, portrait 4:5.                                                                                                               |
