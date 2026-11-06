# Milestones B and C: flagship homepage and core conversion pages

Date: 2026-11-06 · Branch: `claude/sabiforge-digital-init-kxar7l`
Direction and audit: [`CREATIVE-DIRECTION.md`](CREATIVE-DIRECTION.md) (milestone A)

Status: **built and verified on a local production build. Not deployed.** No DNS, payment,
analytics, form backend or other third-party service has been configured.

---

## 1. Summary of changes

| Area            | Before (milestone 1)                  | Now                                                                                                                                          |
| --------------- | ------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| Positioning     | Shopify-leaning, discount badge first | A design and development studio for businesses at every stage; the offer lives on the pricing page                                           |
| Routes          | 2 (`/`, `/404`)                       | 15: `/`, `/services`, 10 service pages, `/pricing`, `/contact`, `/404`, plus `sitemap-index.xml` and `robots.txt`                            |
| Typography      | Outfit + Inter                        | Bricolage Grotesque (display), Instrument Serif (italic accents), Inter (body), JetBrains Mono (metadata); Outfit kept for the wordmark only |
| Visual language | Colour plus a skyline motif           | Forge geometry: chamfered corners, hex line work, monospaced section indexes, coded interface plates                                         |
| Homepage        | 7 stacked sections                    | 11-part editorial composition (see §2)                                                                                                       |
| Interactivity   | Pricing toggle, process tabs          | Hero capability selector, audience pathway selector, approach tabs, concept notes, pricing switch, FAQ, enquiry composer, smart header       |
| Founding offer  | "First 3 clients"                     | Slot count withheld pending the owner's decision (3 vs 5); `FOUNDING_CLIENT_SLOTS = null`                                                    |

Unchanged: the brand colours, the provisional logo mark, all approved package names and prices, the
discount maths and the contact details.

## 2. Creative direction as implemented

**Editorial Precision × Digital Craftsmanship.** Editorial headlines with one italic serif accent
each; engineering-style metadata in monospace; asymmetric grids; ivory "paper" sections for
reading-heavy content; coral reserved for action.

Homepage sections: (01) hero with an art-directed composition of four concept plates and a
capability selector · (02) point of view and seven ingredients · (03) studio concepts (`#work`) ·
(04) services in three families plus a "Where are you starting from?" pathway selector ·
(05) six-stage approach (`#approach`) · (06) eight differentiators · (07) engagement models with
starting prices · (08) studio method: live design tokens and how the site is checked ·
(09) closing CTA · footer.

**Honesty rules applied**

- All work shown is labelled "Studio concept" with "Fictional brand… not a client project" next to
  it.
- There are no testimonials, clients, results, awards, team members, addresses or social links.
  The footer renders social links only if real ones are added to `site.social`.
- Services that are new in the expanded brief are marked `approval: 'pending'` in
  `src/data/services.ts` (see §8).
- Unconfirmed package details read "Agreed in your proposal" rather than being invented.
- The contact page promises no response time.

## 3. Screenshots

Captured from the production build (`astro preview`) and stored in
[`docs/screenshots/`](screenshots/):

| Page         | Desktop (1440 px)                              | Mobile (390 px)                      |
| ------------ | ---------------------------------------------- | ------------------------------------ |
| Home         | `home-desktop.jpg`, `home-hero-desktop@2x.jpg` | `home-mobile.jpg`, `menu-mobile.jpg` |
| Services     | `services-desktop.jpg`                         | `services-mobile.jpg`                |
| Service page | `service-shopify-desktop.jpg`                  | `service-brand-mobile.jpg`           |
| Pricing      | `pricing-desktop.jpg`                          | `pricing-mobile.jpg`                 |
| Contact      | `contact-desktop.jpg`                          | `contact-mobile.jpg`                 |

Full-page captures for every route at both widths are produced by `npm run qa:visual` into
`/screenshots/` (git-ignored).

## 4. Main source files

- Design system: `src/styles/global.css`, `src/components/ui/*` (`ConceptPlate`, `SectionHead`,
  `HexLines`, `Button`, `Breadcrumbs`, `Logo`, `Icon`)
- Data: `src/data/{site,services,packages,concepts,home,faq}.ts`, `src/lib/{pricing,enquiry,icons}.ts`
- Layout: `src/layouts/BaseLayout.astro`, `src/components/layout/{Header,MobileNav,Footer}`
- Homepage: `src/components/home/*`, `src/pages/index.astro`
- Pages: `src/pages/services/{index,[slug]}.astro`, `src/pages/pricing.astro`,
  `src/pages/contact.astro`, `src/pages/robots.txt.ts`, `src/components/{page,pricing,contact}/*`
- QA: `scripts/screenshots.cjs`, `scripts/interactions.cjs`, `tests/*.test.ts`

## 5. Interactions implemented

| Interaction                                   | Keyboard and accessibility behaviour                                                                                                                                                                                                                                |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Smart header                                  | Hides on scroll down and returns on scroll up; never hides while focus is inside it or the menu is open; `aria-current="page"` on the active item                                                                                                                   |
| Mobile menu                                   | Dialog with focus cycling, Escape to close, scroll lock and focus restored to the toggle; the header and Close button stay visible                                                                                                                                  |
| Hero capability selector                      | Toggle buttons with `aria-pressed`; caption updates in a polite live region                                                                                                                                                                                         |
| Pathway selector                              | Radio group, arrow keys move and select, recommendation in a live region                                                                                                                                                                                            |
| Approach stages                               | WAI-ARIA tabs (arrows, Home, End) showing "you bring", "we deliver" and the approval point for each stage                                                                                                                                                           |
| Concept notes, pricing FAQ, mobile comparison | Native `<details>`                                                                                                                                                                                                                                                  |
| Pricing switch                                | Radio group, **standard prices by default**; the founding rate is opt-in and marks ineligible packages                                                                                                                                                              |
| Comparison table                              | Scrollable region is keyboard-focusable and labelled                                                                                                                                                                                                                |
| Enquiry composer                              | Labelled fields, conditional fields (current website; where you sell), error summary that receives focus with links to fields, `aria-invalid`/`aria-describedby`, review step, then send by email, send on WhatsApp or copy. The site stores and transmits nothing. |
| Reveal motion                                 | IntersectionObserver; content is visible without JS and under reduced motion (both checked)                                                                                                                                                                         |

## 6. Test results (all run on this branch)

| Check                                                                                         | Result                                                                                                                                                                                                                   |
| --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `npm run format:check`                                                                        | Pass                                                                                                                                                                                                                     |
| `npm run lint`                                                                                | Pass, 0 problems                                                                                                                                                                                                         |
| `npm run test` (Vitest)                                                                       | **25 / 25 pass** (pricing, offer config, packages, services, links, enquiry validation and brief)                                                                                                                        |
| `astro check`                                                                                 | 0 errors, 0 warnings                                                                                                                                                                                                     |
| `astro build`                                                                                 | Pass — 15 static pages plus sitemap and robots                                                                                                                                                                           |
| `qa:visual`: 15 routes × 7 widths (375, 390, 430, 768, 1280, 1440, 1920) = **105 page loads** | **Pass**: no horizontal overflow, no console errors, no broken anchors, every internal link and `#hash` target resolves, axe-core WCAG 2.0/2.1/2.2 A + AA with **0 violations** (no rules disabled or elements excluded) |
| `qa:interactions`                                                                             | **15 / 15 pass** (selectors, tabs, pricing, FAQ, form validation and focus, review and hand-off links, skip link, smart header, menu visibility and focus, 404)                                                          |
| Reduced motion (emulated)                                                                     | All content visible; transitions disabled                                                                                                                                                                                |
| JavaScript disabled                                                                           | All content visible; the contact form shows a `noscript` email fallback                                                                                                                                                  |

### Lighthouse (lab data)

Lighthouse 13.6.0, headless Chromium 153, local `astro preview` on the same machine. Mobile uses
the default simulated slow-4G and 4× CPU throttling; desktop uses the desktop preset. Scores are
performance / accessibility / best practices / SEO.

| Page                                      | Mobile                | Mobile LCP · CLS · TBT | Desktop               |
| ----------------------------------------- | --------------------- | ---------------------- | --------------------- |
| `/`                                       | 100 / 100 / 100 / 100 | 0.9 s · 0 · 0 ms       | 100 / 100 / 100 / 100 |
| `/services`                               | 97 / 100 / 100 / 100  | 2.6 s · 0.001 · 0 ms   | 100 / 100 / 100 / 100 |
| `/services/shopify-ecommerce-development` | 100 / 100 / 100 / 100 | 0.9 s · 0 · 0 ms       | 100 / 100 / 100 / 100 |
| `/pricing`                                | 100 / 100 / 100 / 100 | 0.9 s · 0.031 · 0 ms   | 100 / 100 / 100 / 100 |
| `/contact`                                | 100 / 100 / 100 / 100 | 0.9 s · 0.001 · 0 ms   | 100 / 100 / 100 / 100 |

These are lab measurements on localhost, with no network latency to a real host or CDN. They are
not field data. INP cannot be measured until real users visit a deployed site.

**What improved them:** the first mobile homepage run scored 72 (LCP 3.8 s, TBT 680 ms). Fixes:
headlines no longer wait for the reveal script; the display and body fonts are preloaded;
below-the-fold homepage sections use `content-visibility: auto`; inactive hero plates are dimmed
with a filter instead of opacity.

## 7. Accessibility findings

Found and fixed during this milestone:

1. **Logo link name** (WCAG 2.5.3 Label in Name): the `aria-label` didn't contain the visible
   "SabiForge Digital". It now uses visible text plus hidden ", home".
2. **Low-contrast text inside the concept plates.** The plates are now `role="img"` with a written
   description, and the low-contrast text inside them was darkened, so the plates pass contrast
   checks like everything else.
3. **The scrollable comparison table** wasn't keyboard-focusable at 768 px; it is now a labelled,
   focusable region.
4. **Mobile menu covered the header,** hiding the Close button from sighted users. The stacking
   order is fixed and covered by a regression test.
5. **Founding-rate mode** didn't say Full E-commerce is excluded; it now does.

Not yet done: a full manual screen-reader pass with NVDA, VoiceOver and TalkBack. Automated scans
and scripted keyboard tests don't prove WCAG 2.2 AA conformance on their own.

## 8. Questions and approvals needed

1. **Founding-offer places: 3 or 5?** Set `FOUNDING_CLIENT_SLOTS` in `src/lib/pricing.ts`. The
   site currently says "a limited number of founding clients".
2. **New services (pending):** Brand Identity, Strategy & UX/UI, Design Systems, Conversion
   Optimization, Performance/Accessibility/SEO and Integrations. Please confirm SabiForge can
   deliver each one. Any you reject can be removed from `services.ts`.
3. **Package details:** revision rounds, timelines, post-launch support period, platforms, and the
   "typically includes" bullets on the pricing cards (drafted, not approved).
4. **Care plans and retainers:** service levels and pricing (currently "defined per agreement").
5. **Contact delivery:** keep the email/WhatsApp hand-off, or approve a form provider and data
   retention policy before any data is collected by the site.
6. **Original logo vector,** to replace the SVG rebuild.
7. **Social profiles,** if and when they exist.
8. **Production domain** (`SITE_URL`) for canonical URLs and the sitemap.

## 9. Known limitations

- Nav items Work and Process point to homepage sections until those pages exist; About is not in
  the nav yet.
- No legal pages yet. The contact page carries a short privacy explanation instead.
- There is no Open Graph share image yet; the card type is `summary`.
- The `/services` mobile LCP (2.6 s lab) is limited by the revealed directory rows; it is
  acceptable but can be tuned.
- `npm audit` reports moderate advisories in ESLint's development-only dependency chain; nothing
  ships to the browser.
- **Correction to milestone 1:** `.gitignore` had `screenshots/`, which also matched
  `docs/screenshots/`, so the milestone-1 screenshots were never committed. The rule is now
  `/screenshots/`. Those images showed the superseded design and were removed; this milestone's
  screenshots are committed.

## 10. Recommended next milestone (D: agency depth)

1. `/work`: the four concepts as long-form concept studies (problem, structure, design decisions),
   clearly labelled, plus a "client work" section that appears only when real, approved projects
   exist.
2. `/process`: the six stages expanded with approval gates, client responsibilities and a sample
   timeline structure.
3. `/about`: philosophy, values and the meaning of "Sabi". No fabricated team, history or
   credentials.
4. `/shopify`: focused landing page for merchants and dropshippers.
5. `/privacy` and `/terms` as drafts for owner and legal review.
6. Switch the nav to these pages, add About, and add an Open Graph image.

Then milestone E: a manual screen-reader pass, cross-browser checks (Safari and Firefox), and a
staging deploy to a host you choose.
