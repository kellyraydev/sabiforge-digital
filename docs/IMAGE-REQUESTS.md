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
