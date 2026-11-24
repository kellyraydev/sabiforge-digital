# SabiForge Digital — v2 visual rebuild brief

Status: **APPROVED DESIGN DIRECTION (owner, 20 November 2026). This is not deployment, release or legal approval.**

Source: two owner-supplied reference images in `docs/references/` (commit them with the owner's next local push if not yet present).

## Latest owner supersession — 21 November 2026 (ten-project portfolio)

This later approval **supersedes** the earlier six-homepage-concept / four-retained-`/work` decisions recorded below, including prior planned commit orders. Historical records below are preserved as prior decisions, **not current implementation requirements**. The active homepage and `/work` register on this branch is the ten-concept set. It is not approved for merge or production until the owner reviews it.

Use the single ten-project register `docs/portfolio/ten-concepts/project-register.json` for both homepage and `/work`. Exact IDs/names/categories appear there. All ten are visibly **Concept Project**, never real clients. The four old `/work` studies (Àdùn Table, Kòrà Home, Mend Physio Studio, Tallyhouse) are to be removed from active pages and replaced; no accents/diacritics in NEW concept names. Maison Vale Studios replaces Maison Valé Studios for display. Big Beerah Collection is modest fashion and accessories (hijabs, abayas, scarves, fabric and jewelry), **not beverages**. Amzlat World of Beauty is beauty/cosmetics/fashion; Opeyemi Phones & Gadgets is electronics / Buy-Sell-Swap. Owner-supplied images for the last three are source visual references only, not proof of permission to publish contacts, trademarks or claims.

The implementation must deliver distinct photo-based portfolio covers, accurate coded concept interfaces, accessible detail studies, provenance, visual/image QA and responsive testing. See `docs/portfolio/ten-concepts/CURSOR-NEW-TASK.md` and `ASSET-PLAN.md`. Do not claim these are done based on this spec.

## Visual references and authority

- `docs/references/homepage-target.jpeg` — primary visual reference for the public homepage, section rhythm, treatment and hierarchy.
- `docs/references/implementation-blueprint.jpeg` — supporting blueprint for components, accessibility, layout and performance expectations. Its displayed prices, contact details and example projects are historical illustrations, not facts to publish.
- The owner approves final visual execution and any new commercial or legal content. Repo business data (post-ledger) takes precedence over sample copy.

## Owner decisions ledger (authoritative; overrides older documents where they conflict)

Recorded 20 November 2026:

1. v2 dark design direction approved, replacing the editorial ivory/gold direction on `redesign/**` branches.
2. Four-service catalog approved: Business Websites; Online Stores; Custom Software and Business Platforms; Website Redesign and Ongoing Support.
3. Package prices approved: Starter NGN 150,000; Business NGN 350,000; Online Store NGN 750,000; Custom Software from NGN 1,500,000 (starting price, never a fixed quote). Applied in one reviewable data-migration commit covering `services.ts`, `packages.ts`, `pricing.ts` and the pricing regression tests.
4. Homepage Selected Work shows the six v2 concepts: Maison Valé Studios; AURA Clothing; FlowDesk OS; CampusOne Portal; Bloom Wellness Studio; RoutePilot Logistics. Each is flagged concept-only and labelled "Concept Project". The existing `/work` concept studies (Àdùn Table, Kòrà Home, Mend Physio Studio, Tallyhouse) remain published on `/work` and must not disappear.
5. Contact details in `src/data/site.ts` remain authoritative; the reference images' email and phone are historical.
6. `FOUNDING_CLIENT_SLOTS = 5` approved; founding-offer copy states five founding client slots; discount rules unchanged.
7. Homepage headline approved: "More than a website. Built for your business to grow."

Recorded 21 November 2026 (owner answers in the Claude session; see `docs/SITE-AUDIT-2026-11-21.md`):

8. The live site at `sabiforge-digital.vercel.app` is hidden from search until v2 launches. Vercel production `SITE_ENV` is set to `staging`; restore `production` at launch.
9. Service URLs: keep `/services/custom-website-design-development` (Business Websites), `/services/shopify-ecommerce-development` (Online Stores) and `/services/website-redesign-modernization` (Website Redesign and Ongoing Support). Add `/services/custom-software-and-business-platforms`. Redirect `/services/website-care-maintenance` to the redesign page with a 301.
10. `/shopify` is folded into Online Stores and redirects with a 301 to `/services/shopify-ecommerce-development`.
11. The pricing page stays at `/pricing`. The navigation label may read "Packages".
12. Headline package inclusions are approved as shown in `docs/references/homepage-target.jpeg`:
    - Starter: up to 5 pages; mobile-friendly design; contact and WhatsApp enquiry; basic SEO setup.
    - Business: custom page designs; services and portfolio sections; content management (CMS); analytics setup.
    - Online Store: product and category pages; shopping cart and checkout; payment integration; order management.
    - Custom Software: portals and dashboards; booking or management systems; workflow automation; integrations and ongoing support.
    - Anything beyond these stays "Agreed in your proposal".
13. PR #13's catalogue migration is merged into the v2 foundation line, with the URL decisions above applied on top.
14. Homepage copy (audience strip, "Why SabiForge", footer location line): the owner delegated drafting ("rebuild it the best way"). Use the reference copy as the starting point, without claims of past clients or results. The final wording needs owner sign-off in the PR before merge.

Recorded 22 November 2026:

15. Homepage headline changed to "Your business deserves more than just a website.", with "just a website." as the gradient accent. This replaces item 7. The lede is unchanged.
16. The homepage hero is rebuilt to `docs/references/hero-target-v2.jpeg`, chosen by the owner over a second supplied image. Copy and buttons are real HTML. Only the laptop-and-phone scene is an image (`src/assets/hero/v2-devices.png`), cut from the reference with the overlapping headline text removed. It is labelled "Concept mockup, not client work". Its dashboard figures and fictional brands ("BizFlow", AURA) are illustrative only.
17. Big Beerah Collection, Amzlat World of Beauty and Opeyemi Phones & Gadgets are existing businesses that have not been asked (Big Beerah: superseded by item 19). **Owner decision (22 November 2026): publish them now as clearly labelled uncommissioned concepts** ("Concept Project", plus "Uncommissioned, based on an existing business" on the homepage card and the reference-concept disclaimer on `/work`). No addresses, phone numbers, CAC numbers, prices or logos are copied. This supersedes the earlier hold-until-consent rule. If a business objects, remove its record.
18. The homepage below the hero follows `docs/references/homepage-target.jpeg`: audience strip, four service cards, six fictional Concept Projects, "Why work with SabiForge?", four packages with approved prices and inclusions, and six process steps. The footer band is the closing call to action. The v1 homepage sections are removed. The "Where are you starting from?" enquiry picker moves to `/services` and is kept. Missing pictures use designed placeholders; prompts are in `docs/IMAGE-REQUESTS.md`.
19. **Owner decision (22 November 2026): Big Beerah Collection is client work.** The owner confirmed that Big Beerah Collection is a SabiForge client and that the business owner agreed to be shown on the website, including its name, design, contact details, products and owner identity. It is labelled "Client Project" (`basis: 'client'`), listed first on the homepage, and named in the `/work` client-work section. This supersedes item 17 for Big Beerah only; Amzlat and Opeyemi remain uncommissioned concepts. **Pending from the owner:** the real logo, business contact channels, product photos and prices, and the owner's name or photo. Until they are supplied, nothing is invented: the study shows only the shop design and brand palette, and generated art-direction images stay labelled as generated. **Update, 22 November 2026:** the owner supplied desktop and mobile shop screens (logo, categories, products and naira prices); they replace the coded screens. Still pending: business contact channels, owner name or photo, whether the prices and star ratings shown are real, and whether bigbeerahcollection.com is live.
20. **Owner decision (23 November 2026), delegated: “choose your recommended decision for my site.”** Applied as recommended:
    - **Headline unchanged** (item 15). The hero lede now states the outcome: “Websites, online stores and custom software for Nigerian businesses, built to bring you more customers and save you time.”
    - **Free first consultation**, on WhatsApp, a call or email.
    - **Reply within one working day.**
    - **Payment:** Starter, Business and Online Store 50% to start and 50% before launch; Custom Software in agreed milestones. Prices themselves are unchanged.
    - **Legal pages stay labelled “(draft)”** until legal review.
      These lines live in `promises` in `src/data/site.ts` and in `src/data/faq.ts`. Shown in the hero, the homepage packages, `/contact` and the `/pricing` FAQ.

## Overall art direction

Create a distinctive SabiForge Digital experience that feels polished and technical, not a generic agency template. Dark midnight/navy base, violet and purple highlights, turquoise/cyan illumination, controlled glow, restrained cards and visible hierarchy. Use gradients selectively, not everywhere. Maintain strong text readability and focus states over effects.

This consciously differs from the existing `docs/CREATIVE-DIRECTION.md` editorial/ivory direction and the `midnight-*`, `mint-*`, `coral-*`, `ivory-*` token system. That older system is real repository history, not a reason to block the approved visual migration. **Do not recolour blindly**: review shared components and each page before migrating tokens.

## Homepage sequence — approved design anatomy

1. **Header:** real SabiForge logo; Home, Services, Work, Packages, Our Process, About; conversation/action CTA. Sticky behavior must preserve keyboard focus and mobile navigation. Actual routes match the existing route structure unless a route change is approved.
2. **Hero:** headline "More than a website. Built for your business to grow." Short support paragraph: professional websites, online stores and custom software that help businesses reach more customers, work smarter and grow with confidence. Two real CTAs, branded laptop/dashboard plus phone/store visual composition, subtle violet/turquoise arcs. Mockups illustrate capability, never deployed client products; any metrics shown are fictional.
3. **Audience strip:** types of businesses served. Avoid claiming industries or capacity not approved for public marketing.
4. **Services:** four cards matching the approved catalog above. Only confirmed capabilities are marketed as offered; pending capabilities stay pending. Each live card must have a valid destination.
5. **Selected work:** the six v2 concepts per the ledger, each with a clear, legible "Concept Project" disclosure. Do not present mock brands as real clients or produce fake results.
6. **Why SabiForge:** concise, verifiable differentiators. The human/technology portrait is illustrative generated art; do not imply it depicts the founder or team.
7. **Packages:** four-card comparison pattern with a clearly visible primary CTA. Render packages and pricing from the migrated repository data after the data-migration commit; not from the reference screenshot.
8. **Process:** six-step visual flow (Discover, Plan, Design, Build, Review, Launch and Support), mapped to the approved engagement process and legible on mobile.
9. **Final CTA and footer:** contact routes that work, verified contact data from `site.ts`, legal/social links only when real and authorized.

The reference image is a composition guide, not an instruction to compress all content into one desktop-width page. Preserve section hierarchy with sensible spacing on desktop and mobile.

## Interaction contract

- Meaningful links and buttons, working menus, accordions and filters where implemented, visible focus and active/hover/disabled states.
- Keyboard and touch-friendly navigation; the mobile menu closes properly and does not trap focus.
- The enquiry UI may be improved without changing the privacy model; a backend or delivery service is not authorized by this document.
- Motion supports `prefers-reduced-motion`, and primary content never depends on JavaScript to be visible.
- Responsive images with explicit sizing; no stretching, clipping of key content or unnecessary layout shift.

## Imagery and assets policy

AI-generated imagery is approved for hero compositions, concept thumbnails, section art and provisional case-study visuals. Every generated asset carries a provenance record (subject, generated status, tool, date) in `docs/IMAGE-PROVENANCE.md`, with master copies in the `sabiforge-visual-assets` repository. Images are stored locally and served through Astro image assets; external hotlinks are forbidden. Each asset is reviewed for responsive cropping and accessible alt text; generated people are never represented as staff, clients or testimonial subjects. Third-party logos, brands and licensed material still require owner approval.

## Acceptance evidence

- Side-by-side screenshots against the primary reference at desktop and multiple mobile widths; discrepancies listed, not hidden.
- No horizontal overflow at 375/390/430/768/1280/1440/1920 px; readable typography and usable CTAs.
- No console errors, broken links, missing assets, or misleading portfolio/client badges.
- WCAG AA-oriented contrast, accessible names, keyboard behavior, motion accommodation.
- `npm run verify` plus relevant visual, interaction, URL and sitemap checks. Report actual pass/fail/not run.
- No deployment, DNS, merge, paid service, account switch or business-fact change beyond the ledger without explicit separate authorization.

## Planned commit order

1. Documentation only: this brief, amended `AGENTS.md`, reference images.
2. Data migration: services, packages, pricing, founding-slot copy, regression tests, and the six v2 homepage concepts data (existing `/work` concepts retained).
3. Design tokens: new palette and typography tokens in `global.css` while old tokens still exist.
4. Homepage sections: one commit per section, in the sequence above.
5. Supporting pages: services, work detail pages, packages, process, about, contact, 404.
6. QA pass: verify suite, visual and interaction QA, cross-browser and mobile review, then draft PR review.

## Decisions still requiring owner review

- Final palette token values and typeface pairing.
- Logo master files and final approved visual assets.
- Whether the approved services need any capability-level caveats in copy (for example, e-commerce platform scope).
- Whether to retain or replace the provisional hero/portrait generated art before launch.
- Whether secure first-party enquiry delivery or analytics may be introduced (requires separate approval).
