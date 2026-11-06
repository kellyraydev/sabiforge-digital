# Milestone A: audit and creative direction

Date: 2026-11-06. This document covers the repository audit, the creative direction and the plan
for milestones B (flagship homepage) and C (core conversion pages). It is the reference for the
build.

---

## 1. Audit of the existing build (milestone 1)

### Worth keeping

| Area                                                               | Why it stays                                                                                             |
| ------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------- |
| Astro static output with React islands                             | Correct architecture: content pages ship HTML, and JavaScript only runs where there is real interaction. |
| `src/lib/pricing.ts` and its tests                                 | Pricing maths (₦120k→₦108k, ₦280k→₦252k, ₦500k→₦450k) is verified. Keep it and extend it.                |
| `src/data/site.ts` contact facts                                   | Verified WhatsApp, phone and email; single source of truth.                                              |
| Brand tokens (midnight, mint, coral, ivory, ember)                 | Approved palette. Values are unchanged.                                                                  |
| `LogoMark.astro`                                                   | Provisional rebuild of the S-hexagon. Still provisional; no change.                                      |
| Ink-on-coral contrast rule                                         | Found and fixed through axe; it stays a system rule.                                                     |
| Mobile menu behaviour (focus cycling, Escape, scroll lock, portal) | Works; it gets a visual upgrade and keeps its logic.                                                     |
| Accessible process tabs (`ProcessSteps.tsx`)                       | Correct WAI-ARIA tab pattern; rebuilt with richer content (see below).                                   |
| QA scripts (overflow, anchors, console, axe)                       | Extended to every page and seven viewports.                                                              |

### What needs improving, and why

| Issue                                                                                  | Evidence                                                                | Direction                                                                                                           |
| -------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| The hero reads as a conventional startup layout (headline, two buttons, store mockup). | Shows only Shopify-style commerce, which undersells the broader studio. | Replace it with an art-directed "capability composition" spanning editorial, commerce, brand system and product UI. |
| Positioning is discount-led.                                                           | The founding-offer badge is the first thing in the hero.                | Move promotional terms to the pricing page and present them calmly.                                                 |
| Founding offer states "first 3".                                                       | Owner materials conflict (flyer: 5).                                    | Publish no definitive slot count until the owner decides (`slots: null`).                                           |
| Services are seven interchangeable cards.                                              | Same card treatment, generic summaries.                                 | Reorganise into three families with problem → solution → deliverable.                                               |
| Typography is competent but generic (Outfit + Inter).                                  | Geometric sans throughout; no editorial voice.                          | Introduce an editorial type system (below). Outfit stays for the wordmark only, as on the flyer.                    |
| No visual signature beyond colour.                                                     | Grid texture and skyline are borrowed motifs.                           | Build a signature language from the logo's 30° hexagon geometry.                                                    |
| No pages beyond the homepage; nav links are only anchors.                              | 2 routes.                                                               | Add services, ten service pages, pricing and contact.                                                               |
| Package inclusions are drafts I wrote, not owner-approved.                             | Flagged in milestone 1 and still unconfirmed.                           | Show approved flyer descriptions; mark unconfirmed scope "agreed in proposal".                                      |
| No sitemap, robots or per-page metadata.                                               |                                                                         | Add sitemap, robots, per-page titles, descriptions, breadcrumbs and JSON-LD.                                        |

---

## 2. Creative direction: Editorial Precision × Digital Craftsmanship

**Idea:** The site should read like a well-edited design publication that happens to be built by
engineers. Two voices run through every page:

- **The editorial voice:** large, confident headlines with occasional italic serif words, generous
  margins, numbered sections, and asymmetric columns that leave meaningful negative space.
- **The engineering voice:** monospaced metadata (section indexes, labels, specifications), precise
  hairline rules, specification tables, and coded interface plates instead of stock imagery.

Why it fits SabiForge: "sabi" means _to know_ and "forge" means _to make_. The editorial voice
carries the knowing (point of view, strategy, clarity) and the engineering voice carries the
making (craft, build quality). It signals premium quality without enterprise coldness, and it
needs no photography of people, offices or laptops.

### Typography system

| Role     | Typeface                                                   | Use                                                                                                                  |
| -------- | ---------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| Display  | **Bricolage Grotesque** (variable; optical size and width) | Headlines and large numerals. A characterful grotesk with ink-trap details: confident, slightly warm, not corporate. |
| Accent   | **Instrument Serif** (italic)                              | One or two words per headline for editorial emphasis. Never used for body copy.                                      |
| Body     | **Inter** (variable)                                       | Paragraphs and UI. Kept from milestone 1 for readability.                                                            |
| Metadata | **JetBrains Mono** (variable)                              | Section indexes `(02)`, labels, specification values and concept tags. Sentence case, small sizes, used sparingly.   |
| Wordmark | Outfit                                                     | Logo lockup only, matching the approved flyer.                                                                       |

All fonts are self-hosted through Fontsource under the SIL Open Font License. The type scale is
fluid with `clamp()`: display from about 2.6rem on 375 px to about 6rem on 1440 px+, with body at
1.0625rem and a 1.65 line height.

### Signature visual language: the forge geometry

All derived from the logo's hexagon (30°/60° angles) and its S-channel:

1. **Chamfered corners:** key panels have one 30°-cut corner (CSS `clip-path`), recognisably from
   the mark. Used on featured panels only, never on every card.
2. **Hex line work:** fine architectural line drawings made of 30° isometric strokes, forming
   section backdrops and transitions at very low opacity.
3. **Interface plates:** coded (HTML/CSS/SVG) interface compositions for fictional concept brands,
   always labelled "Studio concept".
4. **Section indexes:** monospaced `(01)–(11)` numbering with a short label. This creates editorial
   rhythm and helps orientation.

### Colour usage

- Dark pages on midnight; ivory "paper" sections for reading-heavy content (pricing details, service
  deliverables).
- Mint is the precision colour: links, focus rings, highlights, data.
- Coral is reserved for action and single emphatic moments, at most one coral accent per viewport.
  This is the main tool for de-emphasising "discount" energy.
- Text on coral is always midnight ink (5.9:1 contrast).

### Motion principles

- Reveal-on-enter (opacity plus 12–16 px rise, 600 ms, staggered) applied through a tiny
  IntersectionObserver script. Content is fully visible without JavaScript and under
  `prefers-reduced-motion`.
- Header: hides on scroll down and returns on scroll up; it is always visible when focus is inside it.
- Hero plates: the selected plate comes forward with a transform/opacity transition, driven by
  explicit controls rather than auto-advance, so nothing moves without user intent.
- No scroll hijacking, no parallax libraries, no WebGL. No animation library dependency.

---

## 3. Information architecture

```
/                         Home (flagship)
/work                     Milestone D. Until then "Work" links to /#work (concepts on the homepage)
/services                 Services directory (3 families)
/services/[slug]          10 service pages
/pricing                  Packages, comparison, add-ons, FAQ, offer terms
/process                  Milestone D. Until then "Process" links to /#approach
/about                    Milestone D. Not in the nav until it exists
/shopify                  Milestone D
/contact                  Start a project (enquiry composer)
/privacy, /terms          Milestone D (drafts for owner review)
```

Primary nav for milestones B and C: **Work · Services · Pricing · Process · Contact** plus a
**Start a project** button. About joins when its page exists; the brief rules out links to
unfinished pages.

---

## 4. Homepage content hierarchy

| #   | Section                 | Purpose                     | Treatment                                                                                                                                           |
| --- | ----------------------- | --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| 01  | Navigation              | Orientation                 | Hide-on-scroll header, active states, refined mobile sheet                                                                                          |
| 02  | Hero                    | Relevance in 5 seconds      | Headline: _"Design that earns attention. Websites that move business forward."_ Capability composition with four plates and selectable capabilities |
| 03  | Point of view           | Establish thinking          | Editorial statement plus an index of seven ingredients of a strong website                                                                          |
| 04  | Studio concepts (#work) | Demonstrate range honestly  | Asymmetric editorial layout with four fictional concepts, each with challenge and approach in an expandable note                                    |
| 05  | Services as solutions   | Help visitors self-select   | Three families, each listing services with the problem they solve                                                                                   |
| 06  | Approach (#approach)    | Reduce uncertainty          | Six stages, Discover → Launch & Support; each shows what happens, what you bring and what you get                                                   |
| 07  | Why SabiForge           | Differentiate               | Eight differentiators phrased as client benefits                                                                                                    |
| 08  | Ways to work together   | Set expectations            | Four engagement models with starting prices; links to /pricing                                                                                      |
| 09  | Studio method           | Evidence without fake proof | Live design-system preview, plus how every page is checked (accessibility, responsiveness, performance method)                                      |
| 10  | Closing                 | Momentum                    | Editorial conclusion with Start a project and Contact                                                                                               |
| 11  | Footer                  | Completeness                | Large wordmark, sitemap, contact. No social links until profiles exist                                                                              |

**Audience pathways:** a "Where are you starting from?" selector in section 05 routes first-time
founders, small businesses, redesigns, merchants, growing brands and complex projects to the
relevant service. It is one proposition with targeted entry points, not six sites.

---

## 5. Service architecture

| Family                     | Service                                    | Status                                                    |
| -------------------------- | ------------------------------------------ | --------------------------------------------------------- |
| Strategy & Brand           | Brand Identity & Creative Direction        | **New — owner to confirm delivery capability**            |
|                            | Website Strategy & UX/UI Design            | **New — confirm**                                         |
|                            | Design Systems                             | **New — confirm**                                         |
| Development & Commerce     | Custom Website Design & Development        | Confirmed (business websites, custom apps)                |
|                            | Shopify & E-commerce Development           | Confirmed (e-commerce, Shopify redesigns, dropshipping)   |
|                            | Website Redesign & Digital Modernization   | Confirmed (Shopify redesign); general redesign to confirm |
| Optimization & Partnership | Conversion-Focused Experience Optimization | **New — confirm**                                         |
|                            | Performance, Accessibility & Technical SEO | **New — confirm**                                         |
|                            | Website Care, Maintenance & Retainers      | Confirmed (maintenance); retainer terms undefined         |
|                            | Digital Integrations & Workflow Solutions  | **New — confirm**                                         |

Developer collaboration (an approved service) appears on the services directory as a partnership
note for agencies and developers.

Each service page has: positioning, the problem it addresses, who it is for (with business
stages), what is included, deliverables, approach, dependencies and exclusions, related services,
a relevant studio concept, and a next step. Data lives in `src/data/services.ts` with an
`approval` field, so unconfirmed services can be hidden by setting one flag.

---

## 6. Pricing: approved data and gaps

**Approved (flyer):**

| Package         | Description (flyer)                        | Price                                       |
| --------------- | ------------------------------------------ | ------------------------------------------- |
| Launch          | One-page professional business website     | ₦120,000                                    |
| Business        | Up to 6 pages, business website + CMS      | ₦280,000                                    |
| Online Catalog  | Products, filters, owner-editable listings | ₦500,000                                    |
| Full E-commerce | Checkout, payments, products + orders      | From ₦900,000, custom quote after discovery |

Founding offer: 10% off (Launch, Business, Online Catalog). Full E-commerce is excluded.

**Reconciliation with the brief's engagement models.** Approved package names and prices stay;
they are grouped under the brief's models:

| Engagement model   | Approved package(s)                    |
| ------------------ | -------------------------------------- |
| Launch             | Launch                                 |
| Growth             | Business                               |
| Commerce           | Online Catalog, Full E-commerce        |
| Studio Partnership | Custom quote (new; no price published) |

**Open approval gaps**, shown on the site as "Agreed in your proposal" rather than invented:

1. Founding-offer slot count (3 or 5). The site says "a limited number of founding clients".
2. Revision rounds per package.
3. Typical timelines per package.
4. Post-launch support period included.
5. Specific CMS and e-commerce platforms per package.
6. The detailed feature bullets drafted in milestone 1. They are now shown only as "typically
   includes", and the comparison matrix uses the flyer's wording.
7. Pricing or retainer rates for care plans and the new services, which are custom quote until
   approved.

---

## 7. Component and technical plan

- **Tokens:** extend `global.css` with type families, a fluid type scale, a spacing rhythm, the
  chamfer utility, hairline colours and the reveal motion.
- **Primitives (as built):** `SectionHead` (index plus label plus heading), `Button` (primary,
  secondary, ink, outline-ink, link), the `.chamfer` utility, `HexLines`, `Breadcrumbs`,
  `PageHero`, `CtaPanel`, and `ConceptPlate` (five interface variants reused by the hero, work and
  service pages).
- **Islands (React, as built):** `MobileNav`, `PathwaySelector`, `ApproachStages` (tabs),
  `PricingExplorer` (standard/founding switch) and `ProjectEnquiry` (contact form). The hero plate
  selector turned out simple enough for a few lines of vanilla script, and the mobile pricing
  comparison uses native `<details>`, so neither needs React. Everything else is Astro HTML.
- **Contact delivery:** no backend or third-party form service is activated. The form validates
  in the browser, then hands the composed brief to the visitor's own email client (mailto) or
  WhatsApp, or copies it to the clipboard. Nothing is stored by the site. A backend can replace
  this once a provider and retention policy are approved.
- **SEO:** `@astrojs/sitemap`, `robots.txt`, a per-page `<title>`, description and canonical,
  `BreadcrumbList` and `Service` JSON-LD with no address, ratings or reviews.
- **QA:** extend `scripts/screenshots.cjs` to crawl every route at 375, 390, 430, 768, 1280, 1440
  and 1920 px with axe, overflow, console, link and anchor checks. Extend `interactions.cjs` for
  the new islands. Run Lighthouse in lab mode on representative pages.
