# Milestone D: premium agency experience, supporting pages and creative excellence

Date: 2026-11-06 · Branch: `claude/sabiforge-digital-init-kxar7l`

Status: **built and verified on a local production build. Not deployed.** No DNS, payment provider,
analytics, form backend or other third-party service has been configured or connected.

This milestone is for your design and functionality review. It should not be read as "done": the
pages below are what I believe is strong, and §7 lists what I know is not yet right.

---

## 1. Implementation summary

| Area                 | What changed                                                                                                                                                                                                                                                                                                 |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Review of A–C        | Homepage, services, pricing and contact re-inspected. Structure and pricing preserved. Changes were limited to wiring: navigation now points at real pages, homepage sections link to their full pages, the Shopify service page links to the new landing page, the contact page links to the privacy draft. |
| `/work`              | Four studio concepts as long-form chapters, each with its own colour world and composition, a working demo, design decisions, palette and type spec and a plain statement of what the concept cannot show. A "Client work: not yet, honestly" section replaces any invented portfolio.                       |
| `/process`           | Six-stage journey with a sticky progress rail, a per-stage hex glyph that builds from one ring to six, review points, a "who does what" filter, feedback and timeline factors, and handover contents.                                                                                                        |
| `/about`             | Typographic manifesto ("Sabi is to know. Forge is to make."), four positions, an interactive design/technology/business diagram, audiences, standards, collaboration and a "promises we don't make" list. No staff, biographies or credentials.                                                              |
| `/shopify`           | Landing page covering all eight requested commerce topics. Each states who it is for, what we do, why it matters and its limits. Includes an interactive storefront anatomy and an honest "who decides what" section.                                                                                        |
| `/privacy`, `/terms` | Draft pages stating only verified facts, with 24 numbered owner decisions placed where the missing terms would go. `noindex`, excluded from the sitemap, clearly marked as not legal documents.                                                                                                              |
| Design system        | Section-wide 30° notch transitions, outlined numerals, link-sweep underline, plate lift, reading-progress bar (scroll-driven, progressive), per-concept themes.                                                                                                                                              |
| QA                   | Scripts now cover 21 routes, flag any third-party request, check focus indicators, no-JavaScript and reduced-motion states, and exercise every new interaction.                                                                                                                                              |

Unchanged: brand colours, provisional logo, approved package names and prices, discount maths, contact
details.

## 2. Page inventory (21 built pages)

| Route                                       | Status         | Notes                                                 |
| ------------------------------------------- | -------------- | ----------------------------------------------------- |
| `/`                                         | Updated        | Links to `/work`, `/process`, `/about` added          |
| `/work`                                     | **New**        | Four concept chapters, four demos                     |
| `/process`                                  | **New**        | Rail, gates, responsibilities, handover               |
| `/about`                                    | **New**        |                                                       |
| `/shopify`                                  | **New**        |                                                       |
| `/services`, 10 × `/services/[slug]`        | Existing       | Shopify service links to `/shopify` and concept study |
| `/pricing`, `/contact`                      | Existing       | Contact links to privacy draft                        |
| `/privacy`, `/terms`                        | **New, draft** | noindex, not in sitemap                               |
| `/404`, `/robots.txt`, `/sitemap-index.xml` | Existing       |                                                       |

Primary navigation: Work · Services · Shopify · Process · About · Pricing, plus the "Start a project"
button. Contact remains in the mobile menu and footer. Footer links to the privacy and terms drafts.

## 3. Screenshots

`docs/screenshots/d-<page>-desktop.jpg` (1440 px) and `d-<page>-mobile.jpg` (390 px), full page, for:
home, work, process, about, shopify, privacy, terms. Older milestone images remain alongside. Full-page
captures of every route at both widths are regenerated by `npm run qa:visual` into `/screenshots/`.

## 4. Working interactions

| Page           | Interaction                                                                                              | Keyboard / accessibility                                                       |
| -------------- | -------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| All long pages | Reading-progress bar                                                                                     | Decorative, `aria-hidden`; absent where scroll-driven animation is unsupported |
| Work           | Concept index cards                                                                                      | Anchor links to each chapter                                                   |
| Work           | Àdùn: before/after menu                                                                                  | Toggle buttons with `aria-pressed`; polite status text                         |
| Work           | Kòrà: colour and size selection, price update, add to bag                                                | Native radio inputs; bag count in a live region                                |
| Work           | Mend: condition picker with before/in-room/after, slot request                                           | Radio group; live regions                                                      |
| Work           | Tallyhouse: filter invoices                                                                              | Toggle buttons; list in a live region                                          |
| Process        | Sticky rail follows the stage in view                                                                    | `aria-current="step"`; every link also works as a normal anchor                |
| Process        | Responsibilities filter (Both / Your part / Our part)                                                    | Radio group with arrow-key navigation                                          |
| About          | Design / technology / business diagram                                                                   | Buttons with `aria-pressed`; `noscript` fallback                               |
| Shopify        | Storefront anatomy                                                                                       | WAI-ARIA tabs: arrows, Home, End; SVG labelled with the active zone            |
| Existing       | Hero selector, pathways, approach tabs, pricing switch, FAQ, enquiry composer, smart header, mobile menu | As documented in milestone B-C                                                 |

All demos use sample data, store nothing and call no service. They are labelled as concepts.

## 5. Test results (all run on this branch against a production build)

| Check                                                                                         | Result                                                                                                                                                                                     |
| --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `npm run format:check`                                                                        | Pass                                                                                                                                                                                       |
| `npm run lint`                                                                                | Pass, 0 problems                                                                                                                                                                           |
| `npm run test`                                                                                | **36 / 36 pass** (11 new: concept studies, process data, commerce wording, legal decision register, navigation targets)                                                                    |
| `astro check`                                                                                 | 0 errors (2 existing hints about a deprecated React type)                                                                                                                                  |
| `astro build`                                                                                 | 21 pages plus sitemap and robots                                                                                                                                                           |
| `qa:visual`: 21 routes × 7 widths (375, 390, 430, 768, 1280, 1440, 1920) = **147 page loads** | **Pass**: no horizontal overflow, no console errors, every internal link and `#hash` resolves, axe-core WCAG 2.0/2.1/2.2 A and AA **0 violations**, and **no request to any other origin** |
| `qa:interactions`                                                                             | **28 / 28 pass**, including the focus-indicator check on the first 14 tab stops of each new page, no-JavaScript heading visibility, reduced motion                                         |

Defects found and fixed during this milestone: legal pages overflowed horizontally on phones (grid
track grew to the table's width); heading order skipped a level on `/work` (Lighthouse); the outlined
numerals were invisible because the stroke colour was `transparent`; LCP on `/work` and `/about` was
3 s because above-the-fold paragraphs waited for the reveal script; screenshots caught reveal
transitions mid-fade.

### Lighthouse (lab data)

Lighthouse via headless Chromium, local `astro preview`. Mobile uses default simulated slow-4G and 4×
CPU throttling. Scores are performance / accessibility / best practices / SEO. Pages changed after
the first run were re-measured.

| Page                 | Mobile                | Mobile LCP · CLS · TBT | Desktop                                                                  |
| -------------------- | --------------------- | ---------------------- | ------------------------------------------------------------------------ |
| `/`                  | 100 / 100 / 100 / 100 | 0.9 s · 0 · 0–10 ms    | 100 / 100 / 100 / 100                                                    |
| `/work`              | 100 / 100 / 100 / 100 | 0.9 s · 0 · 10 ms      | 100 / 98 / 100 / 100 (measured before the heading-order fix; not re-run) |
| `/process`           | 100 / 100 / 100 / 100 | 0.9 s · 0.001 · 0 ms   | 100 / 100 / 100 / 100                                                    |
| `/about`             | 100 / 100 / 100 / 100 | 0.9 s · 0.001 · 0 ms   | 100 / 100 / 100 / 100                                                    |
| `/shopify`           | 100 / 100 / 100 / 100 | 0.9 s · 0.001 · 0 ms   | 100 / 100 / 100 / 100                                                    |
| `/privacy`, `/terms` | 100 / 100 / 100 / 66  | 0.9 s · 0 · 0 ms       | 100 / 100 / 100 / 66                                                     |

The SEO score of 66 on the legal drafts is deliberate: they are `noindex`. A cold first run of `/` once
scored 91 (LCP 3.5 s); two repeat runs scored 100, so I treat it as lab noise, but it shows these
numbers are not tight guarantees. These are localhost lab measurements, not field data; INP cannot be
measured until real users visit a deployed site.

### Not tested

- **Browsers:** only Chromium (Playwright) was run. **Firefox and Safari/WebKit were not tested**, nor
  real iOS or Android devices. The reading-progress bar relies on scroll-driven animation, which these
  browsers may not support; it is designed to disappear without harm.
- **Assistive technology:** no manual screen-reader pass (NVDA, VoiceOver, TalkBack), no voice-control
  or switch testing. Automated scans and scripted keyboard tests do not prove WCAG conformance.
- **Contrast of concept colours** is covered by axe at the tested states only.
- No visual-regression baseline, no load testing, no real-network performance.
- `npm audit` still reports moderate advisories in ESLint's dev-only dependency chain.

## 6. Outstanding business decisions

1. **Legal:** 24 numbered decisions (P1-P11 privacy, T1-T13 terms) listed in `src/data/legal.ts` and
   rendered at the bottom of both draft pages. Key ones: legal entity name and address, payment terms,
   revision rounds, refunds, intellectual property and portfolio rights, post-launch support,
   governing law, data retention, and whether to use any third-party form or analytics tool.
   A qualified Nigerian legal adviser should review before publication.
2. **Founding offer:** 3 or 5 places (carried over from B-C; also T12).
3. **Confirm claims written on the About page**, because I could not verify them: that clients deal
   directly with the people doing the work; the listed craft standards as studio policy (scans,
   keyboard walk-throughs and speed tests with results written down); "no account management layer".
4. **Shopify page scope statements:** that dropshipping supplier selection, ad spend and fulfilment are
   out of scope unless agreed; that payment and delivery options depend on country and provider; that
   the optimisation, conversion and integration work is offered in the form described. Services
   marked `pending` in `services.ts` from B-C are still unconfirmed.
5. **Process page:** the review points, "one consolidated round" of feedback and handover contents
   describe a working method I inferred from your brief. Confirm or amend.
6. **Concepts:** are four enough, and do you want a fifth with a different challenge (for example a
   wholesale or marketplace brief)? Do you want any wording changed on the Mend concept, which
   touches health content?
7. **Carried over:** original logo vector, social profiles, production domain (`SITE_URL`), care-plan
   terms, contact-form delivery.

## 7. Unresolved visual and technical issues

- **No photography or real imagery.** Everything is coded interface art. It is distinctive and fast,
  but a real project would add real photography; some visitors may expect human faces.
- **No Open Graph image**; link previews use a plain card.
- **The `/work` hero** leaves empty space at top right on wide screens (the disclaimer panel sits
  low). Acceptable, but not perfect.
- **Process rail** shows only at 1024 px and up; on phones each stage carries its own numbered header
  instead, and there is no sticky progress there beyond the top bar.
- **Concept demos are small**, deliberately. They illustrate a decision; they are not prototypes.
- **Text weight:** `/process` and `/shopify` are long. The structure keeps them scannable, but they
  would benefit from your editing for tone and length.
- **Legal pages** are plain by design.
- **Provisional logo** is still a rebuild of the flyer mark.
- I could not judge animation feel in motion: reviewed through screenshots and scripted tests, not by
  watching it.

## 8. Staging-readiness checklist

Ready:

- [x] Production build passes; verify suite green
- [x] All internal links and anchors resolve (147 page loads)
- [x] axe-core 0 violations at seven widths on every route
- [x] No third-party requests from any page (supports the privacy draft's statements)
- [x] Content visible with JavaScript off and with reduced motion
- [x] Draft legal pages are `noindex` and out of the sitemap
- [x] No testimonials, clients, results, staff, awards or social links invented

Blocking staging or launch (needs you):

- [ ] Set `SITE_URL` to the staging and production domain
- [ ] Decide the 24 legal items and obtain legal review; then remove draft banners, `noindex` and
      sitemap exclusion, and update `LEGAL_STATUS`
- [ ] Confirm the About, Shopify and Process claims in §6
- [ ] Confirm pending services and package details from earlier milestones
- [ ] Choose a staging host; add an access gate (password or `noindex` plus unlisted URL)
- [ ] Re-run the full suite on the staging URL
- [ ] Test in Firefox and Safari and on real phones
- [ ] Manual screen-reader pass
- [ ] Decide on contact delivery (keep hand-off or approve a form provider)
- [ ] Open Graph image, favicon set and final logo files

Not done, by instruction: deployment, DNS, payment providers, paid services, live form backend.
