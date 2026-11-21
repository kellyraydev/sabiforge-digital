# SabiForge Digital: site audit, preservation inventory and next steps

Prepared 21 November 2026 for the owner of SabiForge Digital. Covers the live site at https://sabiforge-digital.vercel.app and the GitHub repo `kellyraydev/sabiforge-digital`.

**Update (later, 21 Nov), after the owner approved:**

- The live site is hidden from search. Vercel `sf-digital` production `SITE_ENV` was set to `staging` and the site was redeployed. `robots.txt` now says `Disallow: /` and every page has `noindex,nofollow`. Set it back to `production` at the v2 launch.
- The gate5 commits were merged into branch `redesign/v2-foundation`, and `npm run verify` passed.
- Service URL decisions: keep the 3 existing URLs, redirect `website-care-maintenance`, and fold `/shopify` into Online Stores.

Each finding is labelled: **[O]** directly observed, **[V]** verified by a test or measurement, **[H]** a guess that needs testing, **[R]** a recommendation.

---

## 1. Capability check

| Capability                           | Status                | Notes                                                                                                                                                                                                                    |
| ------------------------------------ | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Open the live site                   | Yes                   | Reached it over HTTPS and fetched every route.                                                                                                                                                                           |
| See rendered pages at several widths | Yes                   | Ran the repo's own Playwright QA script against the live site in headless Chromium, at 7 widths.                                                                                                                         |
| Read and edit the repo               | Yes                   | Public repo, cloned, with push access. Nothing pushed.                                                                                                                                                                   |
| Run the build and tests              | Yes, locally          | Dependencies installed. Not run on the redesign branch yet (see §5).                                                                                                                                                     |
| Submit the enquiry form              | Partly                | The form only opens the visitor's own email or WhatsApp. It cannot send anything, so there is no delivery to check. Real phone handoff was not tested.                                                                   |
| Analytics or search data             | No                    | The site has no analytics, and Search Console isn't connected.                                                                                                                                                           |
| Deploy                               | Can see, will not use | The Vercel connector lists project `sf-digital`, whose last 5 preview builds are **BLOCKED**. I could not find which Vercel project serves `sabiforge-digital.vercel.app`. Your rules forbid deploying without approval. |
| Safari, iOS, Android, screen readers | No                    | Needs real devices. This is already in your launch checklist.                                                                                                                                                            |

## 2. The most important finding: three versions of the site have drifted apart

- **[V] The live site is not built from `main`.** Its text ("Four approved ways to move forward", only 4 services listed) matches branch `codex/gate5-release-base`, last changed 12 Nov.
- **[V] That branch and `main` have each moved on separately, with 3 commits each and 36 files different.** The live-only commits are:
  - `fix: guard production SEO output and origin`
  - `feat: publish approved services and guided enquiry`
  - `docs: record Gate 5 remediation state`
- **[V] The current redesign branch, `redesign/complete-improvement` (11 commits, last changed 20 Nov), is based on `main`.** Merging it as it stands would **drop the live site's fixes**: the hiding of unapproved services, the guided enquiry and the SEO origin guard.
- **[O] The live site shows prices that your 20 Nov decisions replaced.**

| Package                                   | Live site     | Approved 20 Nov |
| ----------------------------------------- | ------------- | --------------- |
| Starter (live name: Launch)               | ₦120,000      | ₦150,000        |
| Business                                  | ₦280,000      | ₦350,000        |
| Online Store (live name: Commerce)        | from ₦500,000 | ₦750,000        |
| Custom Software (live name: Custom scope) | custom quote  | from ₦1,500,000 |

- **[V] The live site is fully open to search engines:** `robots.txt` says `Allow: /`, there is no `noindex` on public pages, and the sitemap lists 12 URLs. That clashes with the repo's launch register, which says "not ready for public launch… nothing is deployed". Search engines may already be indexing the old prices and wording.
- **[R]** Before any more redesign work, decide (a) whether the live site should be hidden from search until v2 launches, and (b) to bring the 3 live-only commits into the redesign branch first.

## 3. Audit: live site

Automated QA, run on the live site with the repo's `scripts/screenshots.cjs`: **[V] 15 routes × 7 widths = 105 page loads.**

| Check                                    | Result                                                                 |
| ---------------------------------------- | ---------------------------------------------------------------------- |
| Horizontal overflow                      | None                                                                   |
| axe WCAG A/AA violations                 | None                                                                   |
| Broken internal links or in-page anchors | None                                                                   |
| Mobile menu                              | Worked                                                                 |
| Errors                                   | One console "404" on `/404` itself, which is expected and not a defect |

Axe is automated. It does not prove WCAG conformance.

| #   | Page / part               | Issue                                                                                                                                               | Evidence                      | Type               | Severity | Confidence | Fix                                                                         | Effort    | How to check the fix                 |
| --- | ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- | ------------------ | -------- | ---------- | --------------------------------------------------------------------------- | --------- | ------------------------------------ |
| 1   | Whole site                | Old prices and package names are live and indexable                                                                                                 | §2 table                      | Content / business | **High** | O          | Hide from search or move to approved data                                   | S         | View the pricing page and robots.txt |
| 2   | Repo / release            | Live branch, `main` and redesign branch have diverged                                                                                               | §2                            | Technical          | **High** | V          | Bring the gate5 commits into the redesign branch                            | M         | `git log`, plus diff after merge     |
| 3   | Home › Services           | 3-column grid shows an empty grey third column at desktop width, because only 2 service groups are now published                                    | 1440 px screenshot            | Visual             | Med      | O          | Make columns follow the number of groups, or rebuild as the 4-service grid  | S         | Screenshots at 1280 and 1440 px      |
| 4   | Home › Services           | Heading "Four approved ways…" and "approved services" are internal wording                                                                          | Live HTML                     | Copy               | Med      | O          | Replace with customer wording (§6)                                          | XS        | Read the page                        |
| 5   | Home                      | No evidence: no real projects, testimonials or client logos. Only fictional concepts, which are correctly labelled                                  | Live HTML                     | Trust              | **High** | O          | Get one real project or testimonial, even from a discounted founding client | Owner     | Content shows on page                |
| 6   | Home hero                 | Portrait is AI-generated and marked provisional. The "kòrà" storefront in the hero is also one of the concept brands, with no explanation           | Screenshot, `HERO-LAB.md`     | Trust / clarity    | Med      | O          | Replace with v2 hero mockups labelled as illustrations                      | M         | Visual review                        |
| 7   | Footer / legal            | Privacy and Terms are drafts (correctly `noindex`) but linked from a public, indexable site                                                         | `/privacy` meta               | Legal              | **High** | V          | Finish legal review before public launch                                    | Owner     | Pages no longer marked "draft"       |
| 8   | Contact                   | Email is a Gmail address                                                                                                                            | `site.ts`                     | Trust              | Med      | O          | Set up email on your own domain (MX, SPF, DKIM, DMARC), then switch         | Owner + S | Send and receive a test email        |
| 9   | Home                      | Section numbers skip (01–05, 07, 09)                                                                                                                | Live HTML                     | Polish             | Low      | O          | Already fixed on redesign branch (renumbered)                               | —         | Already done                         |
| 10  | Several pages             | Meta descriptions too long: work 189, shopify 197, process 187, home 163 characters (aim ≤ 160)                                                     | Live HTML                     | SEO                | Low      | V          | Shorten                                                                     | XS        | Re-run the title/description script  |
| 11  | Live SEO                  | Canonical, Open Graph and sitemap URLs all point to `sabiforge-digital.vercel.app`, but the code's planned production domain is `sabiforge.digital` | Live HTML, `astro.config.mjs` | SEO                | Med      | V          | Pick the final domain first, then rebuild                                   | Owner     | Canonical matches the chosen domain  |
| 12  | Pricing                   | Live tier names don't match: "Launch / Growth / Commerce / Custom scope", while the founding-offer text still says "Online Catalog"                 | Live HTML                     | Copy               | Med      | O          | Fixed by the approved package migration                                     | S         | Unit tests plus a page read          |
| 13  | Home hero (mobile)        | The device mockup bleeds off the left edge, and the phone text is very small                                                                        | 390 px screenshot             | Visual             | Low      | H          | Review in the v2 hero                                                       | —         | Real-phone check                     |
| 14  | Process, pathway selector | Only the first step or option appears without clicking                                                                                              | Text extraction               | SEO / no-JS        | Low      | H          | Check that the plain HTML has all the steps (repo QA includes a no-JS test) | XS        | View with JS disabled                |

**Correction to my first review:** "BuildBuilt for business" and the missing spaces in the scrolling banner came from how the text-only fetch joined nearby elements. The screenshots show the spacing correctly, so neither is a real defect.

**Not checked yet:**

- Real iOS, Android and Safari
- Screen readers (NVDA, VoiceOver, TalkBack)
- Lighthouse or real-world speed data
- Real email and WhatsApp handoff on a phone
- Firefox and WebKit on the live site
- Search Console indexing status (needs your access)

## 4. Preservation inventory: live routes

| Route                                            | Title / H1                                            | In sitemap | Recommendation                                                                 |
| ------------------------------------------------ | ----------------------------------------------------- | ---------- | ------------------------------------------------------------------------------ |
| `/`                                              | Design & development studio / "Distinctive websites…" | Yes        | **Improve**: v2 headline already approved                                      |
| `/work/`                                         | Studio concepts / "Four invented brands…"             | Yes        | **Keep**: the 4 concepts must stay, per your decision                          |
| `/services/`                                     | Services                                              | Yes        | **Improve**: change to the 4 approved services                                 |
| `/services/custom-website-design-development/`   | Custom Website Design & Development                   | Yes        | **Keep URL**, make it "Business Websites"? (decision Q2)                       |
| `/services/shopify-ecommerce-development/`       | Shopify & E-commerce                                  | Yes        | **Keep URL**, make it "Online Stores"? (Q2)                                    |
| `/services/website-redesign-modernization/`      | Redesign & Digital Modernization                      | Yes        | **Keep URL**, make it "Website Redesign and Ongoing Support"? (Q2)             |
| `/services/website-care-maintenance/`            | Website Care & Maintenance                            | Yes        | **Redirect** to the redesign + support page? (Q2)                              |
| new `/services/custom-software…`                 | —                                                     | —          | **Add**: Custom Software & Business Platforms                                  |
| `/shopify/`                                      | Shopify & e-commerce                                  | Yes        | Keep, or merge into Online Stores? (Q3)                                        |
| `/process/`, `/about/`, `/pricing/`, `/contact/` | —                                                     | Yes        | Keep the URLs. Improve the content                                             |
| `/privacy/`, `/terms/`                           | Drafts, noindex                                       | No         | Keep as drafts until legal review                                              |
| `/hero-lab/*`                                    | Design studies, noindex                               | No         | Remove from the production build (hypothesis: they shouldn't be public at all) |
| `/404`                                           | —                                                     | No         | Keep                                                                           |

**Must not break:**

- WhatsApp link `wa.me/2349038430068`
- Phone +234 903 843 0068
- Email `kellyray.dev@gmail.com`
- The enquiry form's privacy approach: nothing is stored or sent
- The 4 `/work` concepts
- Draft legal pages stay `noindex`
- The unit tests for founding-offer calculations

## 5. Plan for the rebuild (from your 20 Nov brief; nothing new invented)

0. **Clean up branches**: bring `codex/gate5-release-base` into the redesign branch and run `npm run verify`.
1. **Move to the approved data**:
   - 4 services
   - Starter / Business / Online Store / Custom Software prices
   - 5 founding slots (already done on the branch)
   - URL mapping from Q2
   - Updated tests
2. **Design tokens**: dark navy with violet and turquoise. Needs your two reference images.
3. **Homepage**, one section per commit, in the approved order.
4. **Supporting pages.**
5. **QA**:
   - verify suite
   - `qa:visual` and `qa:interactions`
   - side-by-side screenshots against your references
6. **Draft PR for your review.** No merge, no deploy.

## 6. Homepage copy draft (approved facts only)

**Hero**

- H1: More than a website. Built for your business to grow. _(approved)_
- Lede: We build professional websites, online stores and custom software that help businesses reach more customers, work smarter and grow with confidence. _(approved)_
- Buttons: "Start a project" → `/contact` · "See our work" → `/work`

**Who we work with**: [CONTENT REQUIRED: which kinds of business you want to name. Pick only ones you'd honestly claim.]

**Services**: "How we can help"

1. **Business Websites**: a clear, professional site that explains what you do and makes it easy for customers to get in touch. From ₦150,000 (Starter).
2. **Online Stores**: product catalogues, checkout and payments, set up so customers can browse and buy on their phones. ₦750,000. [CONTENT REQUIRED: platforms covered, e.g. Shopify only?]
3. **Custom Software and Business Platforms**: tools built around how your business works: portals, dashboards, booking or invoicing. From ₦1,500,000; final price after a discovery call.
4. **Website Redesign and Ongoing Support**: bring an outdated site up to date, then keep it secure and current. [CONTENT REQUIRED: is support a monthly fee or quoted per project?]

**Selected work**: "Concept projects": Maison Valé Studios, AURA Clothing, FlowDesk OS, CampusOne Portal, Bloom Wellness Studio and RoutePilot Logistics, each labelled "Concept Project". Note under the section: _These are design concepts, not client work._ [CONTENT REQUIRED: one-line problem and approach for each, or approval for me to draft them as fiction]

**Why SabiForge**: [CONTENT REQUIRED: 3–4 differentiators you'll stand behind. Already in the repo and awaiting your sign-off: "direct access to the person doing the work", "nothing moves forward without your approval", "you own the files and the site".]

**Packages**: Starter ₦150,000 · Business ₦350,000 · Online Store ₦750,000 · Custom Software from ₦1,500,000.

- _Founding offer: 10% off Starter, Business and Online Store for our first 5 founding clients. Terms apply._
- [CONTENT REQUIRED: what's included in each new package. The old inclusions were written for the old prices.]

**Process**: Discover → Plan → Design → Build → Review → Launch and support.

**Final call to action**: "Tell us what you're building." Buttons for WhatsApp, Email and a short brief.

### Facts to approve before publishing

- [ ] Which services fall under each URL (Q2)
- [ ] What's included in each package at the new prices
- [ ] Whether Online Store covers Shopify only or other platforms too
- [ ] Whether support is a monthly retainer or a one-off
- [ ] The "Why SabiForge" claims
- [ ] Business types for the audience strip
- [ ] Copy for the six v2 concepts
- [ ] Founding-offer terms (end date, eligibility)
- [ ] The final domain

## 7. Decisions I need from you

1. **Reference images**: please attach `homepage-target.jpeg` and `implementation-blueprint.jpeg`. The redesign plan depends on them, and they aren't in the repo.
2. **Service URLs**: keep the 3 existing service URLs (renamed) and redirect `website-care-maintenance` to the redesign + support page?
3. **`/shopify` page**: keep it, or fold it into Online Stores?
4. **Live site and search engines**: hide the live site from search until v2 is ready, or leave it open?
5. **Branch merge**: OK to bring the live branch's 3 commits into the redesign branch, and push my work to a new `redesign/**` branch as a **draft PR**?
