# Blueprint conversion — remaining 8 concepts

> **Owner decision (24 Nov 2026):** the project showcase moves to **blueprint previews**
> (the themed mini-sites at `/preview/<slug>`), replacing the interactive demos. AURA is the
> built reference. This doc specs the other 8 concepts so they can be built the same way.
> Demos stay live until all blueprints land and the owner confirms; do not delete demo code yet.

## Build order & status (owner: easiest first, 24 Nov)

1. **maison-vale-studios** — ✅ built (Claude), verified green. Awaiting images.
2. **bloom-wellness-studio** — ✅ built (Claude), verified green. Awaiting images.
3. **Cursor to build the remaining six**, in this order: `amzlat-world-of-beauty`,
   `opeyemi-phones-gadgets`, `corporate-digital-modernization`, `flowdesk-os`,
   `campusone-portal`, `routepilot-logistics`. One per push, pull before push.

## Who does what

- **Cursor** builds one `src/data/projects/<slug>/blueprint.ts` per concept from the spec below,
  then adds one import line to `src/data/projects/index.ts`. New files only — no edits to the
  shared section components or `PreviewLayout.astro` (those are Codex's).
- **Grok bot** generates the images listed in `docs/IMAGE-REQUESTS.md`
  (section "Project blueprint images: remaining concepts"), saved to
  `src/assets/projects/<slug>/`. Until a file exists, the slot shows a themed placeholder, so
  blueprints can be built and merged before the art arrives.
- **Codex** refines type, rhythm and motion per blueprint, as it did for AURA.

## Reference pattern

Copy `src/data/projects/aura-clothing/blueprint.ts`. The schema is in `src/lib/blueprint.ts`:

- `Theme`: `bg, surface, ink, muted, accent, accentInk` (hex) + `display, body` (FontKey) + `radius`.
  FontKeys: `inter | outfit | instrument-serif | bricolage | jetbrains-mono`.
- `basis`: `fictional | reference | client`. This alone drives the honesty banner in
  `PreviewLayout` — do not hand-write banner text. Amzlat and Opeyemi are `reference`.
- Section types: `hero`, `feature-grid`, `product-grid` (optional `island: 'enquiry-bag'`),
  `gallery`, `cta`. Internal CTA `to` values are relative (`/shop`); the renderer prefixes
  `/preview/<slug>`.
- Image `file` names resolve from `src/assets/projects/<slug>/<file>`.

## Rules carried from AGENTS.md §4

- **Reference-basis concepts (Amzlat, Opeyemi):** products shown as unbranded types. No copied
  logo, price, stock count, contact or claim from the source business. Opeyemi's WhatsApp control
  stays presentational (no live chat).
- **Product interfaces (FlowDesk, RoutePilot, CampusOne):** sample data only. No revenue, scores,
  real records, school crests or tracking numbers. Label rows as samples in copy.
- **Bloom:** request-a-time only; the copy must say nothing is booked and name no clinician/licence.
- **All:** generated people are never SabiForge staff, clients or testimonial subjects.

---

## 1. maison-vale-studios — `basis: fictional`

Interior / creative studio, editorial business site. Dark concept theme → **light editorial** canvas.

- **name** `Maison Vale` · **tagline** `An interior studio, read by the kind of space.`
- **theme** `bg #F6F1E8, surface #FFFFFF, ink #2C241C, muted #6B4A32, accent #5E6B45, accentInk #F6F1E8, display instrument-serif, body inter, radius 0.5rem`
- **nav** Work `/` · Studio `/studio` · Enquire `/enquire`
- **pages**
  - `/` **Work** — `hero` (eyebrow "Interior studio", headline "Rooms, made to last.", sub on residential/hospitality/commercial, image `hero.webp`, cta → `/enquire`) · `gallery` "Selected rooms" (6 room images `room-01..06.webp`) · `cta` ("Planning a space?", → `/enquire`)
  - `/studio` **Studio** — `hero` (eyebrow "Our approach", headline "Materials first.", image `studio.webp`) · `feature-grid` "How we work" (3: Lead with the space / Let materials set the palette / Ask for the project)
  - `/enquire` **Enquire** — `hero` (headline "Tell us about the space.", sub notes no timeline/result promised) · `feature-grid` "What to include" (3: Kind of space / Rough scope / Timeframe)

## 2. flowdesk-os — `basis: fictional`

Operations SaaS. **Dark** product canvas (faithful to the tool).

- **name** `FlowDesk OS` · **tagline** `The next task, before the dashboard noise.`
- **theme** `bg #1C2430, surface #243B5A, ink #F4F7FB, muted #C5D0DC, accent #7EB8B4, accentInk #0F1720, display outfit, body inter, radius 0.75rem`
- **nav** Overview `/` · Board `/board` · About `/about`
- **pages**
  - `/` **Overview** — `hero` (eyebrow "Operations tool", headline "Now, Next, Later.", sub: sample board, no revenue/customers, image `hero.webp`, cta → `/board`) · `feature-grid` "Built to read" (3: Sort by sequence / Every row is a sample / Working palette) · `cta` ("See a sample board", → `/board`)
  - `/board` **Board** — `gallery` "Sample board" (4 UI mockups `board-now.webp, board-next.webp, board-later.webp, board-mobile.webp`)
  - `/about` **About** — `hero` (headline "A layout study, not a live product.", sub: real product needs permissions/audit/workflow)

## 3. campusone-portal — `basis: fictional`

Student portal. Light porcelain canvas, navy ink.

- **name** `CampusOne` · **tagline** `The current module, not a maze of links.`
- **theme** `bg #F4F7FB, surface #FFFFFF, ink #12315C, muted #51688a, accent #C4A15A, accentInk #12315C, display outfit, body inter, radius 0.75rem`
- **nav** Home `/` · Study `/study` · About `/about`
- **pages**
  - `/` **Home** — `hero` (eyebrow "Student portal", headline "Open on what's next.", sub: not a real institution, sample layout, image `hero.webp`, cta → `/study`) · `feature-grid` "Designed to focus" (3: Current module first / No school identity / Quiet academic colour) · `cta` ("See the study home", → `/study`)
  - `/study` **Study** — `gallery` "Sample portal" (4 UI mockups `home.webp, module.webp, schedule.webp, mobile.webp`)
  - `/about` **About** — `hero` (headline "Not affiliated with any university.", sub: no real grades/records)

## 4. bloom-wellness-studio — `basis: fictional`

Wellness booking site. Calm light canvas.

- **name** `Bloom Wellness` · **tagline** `Request a time — nothing is booked here.`
- **theme** `bg #F7F3EC, surface #FFFFFF, ink #2b3a2f, muted #5f7a5f, accent #3E5C45, accentInk #F7F3EC, display instrument-serif, body inter, radius 0.75rem`
- **nav** Studio `/` · Visits `/visits` · Request `/request`
- **pages**
  - `/` **Studio** — `hero` (eyebrow "Wellness studio", headline "Move, rest, recover.", sub on calm visits, image `hero.webp`, cta → `/request`) · `gallery` "The space" (4 interior images `space-01..04.webp`) · `cta` ("Ask about a time", → `/request`)
  - `/visits` **Visits** — `feature-grid` "Kinds of visit" (3: Movement / Rest / Recovery — described, no clinician named)
  - `/request` **Request** — `hero` (headline "Ask for a time.", sub: nothing is booked; a real studio connects its own calendar) · `feature-grid` "What to include" (3: Kind of visit / Preferred days / Anything to note)

## 5. routepilot-logistics — `basis: fictional`

Dispatch platform. **Dark** warehouse canvas.

- **name** `RoutePilot` · **tagline** `Lane and status, readable across a desk.`
- **theme** `bg #1C2B3A, surface #2A3138, ink #E8EEF2, muted #B7C3CE, accent #E39B3A, accentInk #1C2B3A, display outfit, body inter, radius 0.5rem`
- **nav** Overview `/` · Lanes `/lanes` · About `/about`
- **pages**
  - `/` **Overview** — `hero` (eyebrow "Logistics platform", headline "See which lane needs you.", sub: samples, no live tracking/promises, image `hero.webp`, cta → `/lanes`) · `feature-grid` "Built for dispatch" (3: Status words not tracking theatre / Identifiers obviously fake / Warehouse palette) · `cta` ("See the lane board", → `/lanes`)
  - `/lanes` **Lanes** — `gallery` "Sample lanes" (4 UI mockups `board.webp, lane-detail.webp, status.webp, mobile.webp`)
  - `/about` **About** — `hero` (headline "No shipment is being tracked.", sub: real platform uses operator's own lanes/rules)

## 6. amzlat-world-of-beauty — `basis: reference`

Beauty + fashion retail concept based on an existing business. Light cream canvas. **Unbranded products.**

- **name** `Amzlat` · **tagline** `Makeup, skin, hair and fashion, separated before the scroll.`
- **theme** `bg #FFF8F3, surface #FFFFFF, ink #161616, muted #6a5f63, accent #C6A15B, accentInk #161616, display outfit, body inter, radius 1rem`
- **nav** Shop `/` · Categories `/categories` · About `/about`
- **pages**
  - `/` **Shop** — `hero` (eyebrow "Beauty & fashion", headline "Everything, sorted.", sub: pink/cream/black/gold, image `hero.webp`, cta → `/categories`) · `gallery` "In store" (6 unbranded still lifes `makeup.webp, skincare.webp, hair.webp, fashion.webp, bodycare.webp, nails.webp`) · `cta` ("Enquire about a product", → `/categories`)
  - `/categories` **Categories** — `product-grid` "Shop by type" (`island: enquiry-bag`, 6 unbranded product types: Makeup, Skincare, Hair, Fashion, Body care, Manicure & pedicure — captions are categories, not brands/prices; images reuse the gallery set or `cat-*.webp`)
  - `/about` **About** — `hero` (headline "A concept, not the official shop.", sub: no copied prices/claims; reference is direction only)

## 7. opeyemi-phones-gadgets — `basis: reference`

Electronics retail concept based on an existing business. Light canvas, cobalt accent. **Unbranded devices.**

- **name** `Opeyemi` · **tagline** `Phones, laptops and watches — then ask before you buy.`
- **theme** `bg #F5F7FC, surface #FFFFFF, ink #0A215F, muted #51618a, accent #123CC9, accentInk #FFFFFF, display outfit, body inter, radius 0.75rem`
- **nav** Shop `/` · Sell or swap `/swap` · About `/about`
- **pages**
  - `/` **Shop** — `hero` (eyebrow "Electronics", headline "Find the device, then ask.", sub: samples, enquiry not checkout, image `hero.webp`, cta → `/swap`) · `product-grid` "By device" (`island: enquiry-bag`, 3 unbranded types: Phones, Laptops, Watches — no prices/warranties/stock; images `device-phone.webp, device-laptop.webp, device-watch.webp`) · `cta` ("Describe a device to sell or swap", → `/swap`)
  - `/swap` **Sell or swap** — `hero` (headline "Buy, sell or swap.", sub: WhatsApp control is presentational, no live chat) · `feature-grid` "Three paths" (3: Buy a device / Sell a device / Swap a device)
  - `/about` **About** — `hero` (headline "A concept, not a live store.", sub: no payment/warranty/verified number)

## 8. corporate-digital-modernization — `basis: fictional`

Corporate redesign study. Light stone canvas, forest accent.

- **name** `Meridian` _(neutral placeholder; names no real org)_ · **tagline** `A clearer company site, without invented results.`
- **theme** `bg #F3F1EC, surface #FFFFFF, ink #1E2421, muted #5a615b, accent #1F4D3A, accentInk #F3F1EC, display outfit, body inter, radius 0.5rem`
- **nav** Overview `/` · Approach `/approach` · Contact `/contact`
- **pages**
  - `/` **Overview** — `hero` (eyebrow "Digital modernization", headline "Review, redesign, support.", sub: names no client/outcome, image `hero.webp`, cta → `/contact`) · `feature-grid` "Three moves" (3: Review / Redesign / Support) · `cta` ("Start a conversation", → `/contact`)
  - `/approach` **Approach** — `hero` (headline "No awards, no metrics.", sub: those need a real engagement) · `gallery` "Before to next" (3 UI mockups `before.webp, after.webp, mobile.webp`)
  - `/contact` **Contact** — `hero` (headline "Tell us where you are now.", sub: a real redesign starts from your content and approval)

---

## After building

1. Register each in `src/data/projects/index.ts`.
2. `SITE_ENV=staging SITE_URL=https://sabiforge-digital.vercel.app npm run verify` (66+ tests, lint, build).
3. Add each project to the blueprint preview check in `scripts/interactions.cjs` if desired
   (optional; the generic checks already cover banner/nav/images).
4. Record delivered images in `docs/IMAGE-PROVENANCE.md` (generated, tool, date, honesty basis).
5. Keep one agent per push; pull before push. Codex styles after the data lands.
