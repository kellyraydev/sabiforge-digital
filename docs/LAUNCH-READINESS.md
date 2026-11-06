# SabiForge Digital — authoritative launch-readiness register

Last reviewed: 6 November 2026  
Branch: `codex/sabiforge-premium-visuals` · PR #1 must remain draft  
Release position: **not ready for public launch; conditionally ready for private staging after the
named staging controls are configured.** Do not merge, deploy, change DNS or activate a provider
without owner approval.

This document supersedes milestone status and open-question lists where they conflict. Earlier
milestone documents remain useful implementation history, not current launch authority.

## 1. Launch-readiness checklist

| Area                          | Evidence now                                                                                                                              | Status                                | Owner / next action                                                                                                     |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Visual and functional         | 21 public/draft routes plus two noindex hero studies; responsive captures and interaction tests exist                                     | Verify on final staging               | Owner reviews the private staging build; developer fixes only confirmed defects                                         |
| Service offer                 | Four services confirmed; six are explicitly `pending` in `services.ts`                                                                    | **Launch blocker**                    | Owner decides each row in §2; pending does not mean approved                                                            |
| Packages and commercial terms | Launch ₦120,000; Business ₦280,000; Online Catalog ₦500,000; Full E-commerce from ₦900,000. Calculations are unit-tested                  | Prices preserved; terms incomplete    | Owner/legal adviser decides revisions, payment, timing, support, refunds and IP                                         |
| Founding offer                | 10% gives ₦108,000 / ₦252,000 / ₦450,000; Full E-commerce is ineligible                                                                   | **Launch blocker**                    | Decide 3 vs 5 places, end/eligibility conditions and any other restrictions                                             |
| Privacy and legal             | Draft privacy and terms pages are visibly labelled, noindex and excluded from sitemap; 24 decisions are registered                        | **Launch blocker**                    | Resolve P1–P11 and T1–T13; obtain qualified Nigerian legal review                                                       |
| Branding and provenance       | Palette is derived from approved flyer; CSS artwork is original; portrait provenance is recorded in `HERO-LAB.md`; no client/staff claims | Provisional                           | Supply original logo vector and approve licensed/commissioned replacement portrait or approve continued provisional use |
| Domain and SEO                | Exact HTTPS origin validation, production preview-host rejection, sitemap exclusions and generated XML verification are prepared          | Staging origin proposed; not deployed | Approve hostnames; inspect the CI-produced production sitemap artifact/check and staging output                         |
| Enquiry delivery              | Browser-only review step; email and WhatsApp links use verified constants; the website stores/transmits nothing itself                    | Functional, no delivery confirmation  | Decide whether to keep handoff or approve a provider plus retention policy                                              |
| Cross-browser                 | Chromium and Firefox evidence exists; WebKit engine plus native Safari/device checks remain                                               | Pending final evidence                | Run the authenticated staging QA workflow on WebKit and complete the manual matrix in §5                                |
| Performance                   | Prior local Lighthouse results are 100 on key pages after fixes; no field INP or real-network data exists                                 | Provisional                           | Re-run Lighthouse on staging and collect field data only after an approved privacy-safe plan                            |
| Accessibility                 | Automated axe A/AA and scripted keyboard checks previously passed                                                                         | Manual verification required          | NVDA/Firefox, VoiceOver/Safari, zoom/reflow and voice/switch checks before public launch                                |
| Credentials and third parties | Site has no client secrets/provider; authenticated Playwright workflow uses Cloudflare Access service-token secrets scoped to staging     | Ready for protected staging setup     | Store tokens as staging environment secrets; confirm all Pages hostnames are behind Access                              |
| Rollback and operations       | Static build, immutable commit and host rollback are suitable                                                                             | Host not chosen                       | Adopt §7 runbook and record the last-known-good commit/deployment                                                       |

## 2. Pending service owner-approval table

Every row below is currently unapproved. Public launch requires an explicit approve, amend or remove
decision. Prices shown as “custom quote” are existing copy, not newly proposed commercial terms.

| Pending service                            | Draft capability and deliverables                                                                                            | Stated limitations                                                                                                     | Claims needing explicit owner support                                                                                                             |
| ------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Brand Identity & Creative Direction        | Direction, identity system, logo files, colour/type specifications and concise guidelines; applications only as agreed       | No trademark work; photography, illustration and print production separate; directions/rounds set in proposal          | Ability to create/refine marks and supply production-ready print/screen files; which applications are genuinely deliverable                       |
| Website Strategy & UX/UI Design            | Discovery, sitemap, user flows, wireframes, responsive designs, optional prototype and developer handoff                     | Recruited usability studies separate; development and copy separate unless agreed                                      | Ability to deliver product/portal UX, high-fidelity design and useful handoff at the described depth                                              |
| Design Systems                             | Audit, tokens, component library, states, accessibility guidance, interaction specs and documentation; code only when agreed | Component/platform count controls scope; migration is separate                                                         | Ability to deliver coded libraries, accessibility guidance and maintainable documentation across claimed platforms                                |
| Conversion-Focused Experience Optimization | Analytics/journey review, heuristic findings, prioritised changes, implementation and measurement notes                      | No uplift guarantee; meaningful experiments need traffic; analytics access/setup required                              | Ability to perform research/measurement, implement changes and interpret results without overstating causation                                    |
| Performance, Accessibility & Technical SEO | Audit and fixes for loading, interaction accessibility and technical search foundations; report/checklist                    | No ranking or fixed-score guarantee; hosting/platform/content can limit fixes; legal WCAG conformance not promised     | Tooling and competence for accessibility audits, cross-browser/performance fixes, redirects/schema/indexing work and any scope described publicly |
| Digital Integrations & Workflow Solutions  | Workflow mapping, supported-tool recommendation, scoped integration, testing and handover/documentation                      | APIs, plans and third-party terms constrain work; custom software may be separate; ongoing monitoring/support separate | Which APIs/automation tools are supported, ability to handle credentials/data securely, and what “testing” and handover include                   |

No turnaround time, revision count, response time, support window or guaranteed outcome is approved
for these services. Keep those items proposal-specific until the owner makes a documented decision.

## 3. Commercial and founding-offer facts

| Item            | Confirmed site value                              | Still undecided                                                                 |
| --------------- | ------------------------------------------------- | ------------------------------------------------------------------------------- |
| Launch          | ₦120,000; founding calculation ₦108,000           | Timeline, revisions, payment schedule, support                                  |
| Business        | ₦280,000; founding calculation ₦252,000           | Timeline, revisions, payment schedule, support                                  |
| Online Catalog  | ₦500,000; founding calculation ₦450,000           | Platforms, catalogue limits, timeline, revisions, support                       |
| Full E-commerce | From ₦900,000; not eligible for founding discount | Final scope, platform/cost assumptions, timeline, revisions, support            |
| Founding offer  | 10% on the first three packages only              | 3 vs 5 places; offer period; qualification, payment and cancellation conditions |

Third-party costs, complex custom functionality, copy, photography, migration volume and ongoing care
remain excluded or separately scoped as the existing copy states. This register does not create new
commitments.

## 4. Enquiry-system audit and provider research

Current flow: visitors complete a client-side form, receive validation errors, review a plain-text
brief, then deliberately open their own email client or WhatsApp. The review heading says the brief
is ready—not sent—and no success message or delivery claim appears. Editing retains values only in
React memory; refresh clears them. The site has no form endpoint, database, analytics or browser
storage. Email and WhatsApp destinations come from `src/data/site.ts`; automated interaction tests
verify `kellyray.dev@gmail.com` and `2349038430068`.

Validation covers required name, syntactically valid email, optional phone format, optional website
format when “Yes” is selected, a 20-character project description and explicit handoff consent.
Browser testing must still check long inputs, Unicode, copy failure, missing email/WhatsApp handlers
and mobile app handoff in real environments. `mailto:`/`wa.me` can open a composer but cannot prove
the visitor sent the message; the UI correctly makes no such claim.

Future option for owner review: **Formspark** is a plausible low-cost hosted backend because its
official pricing page currently advertises 250 free submissions and a one-time paid bundle, with
automatic spam filtering. However, it also advertises a “forever” submission archive. That default
conflicts with data-minimisation until the owner confirms deletion controls, data location,
processor terms, breach/security information and a retention schedule. Treat it as a shortlist
candidate, not an approval. Sources checked 6 November 2026:
[pricing](https://formspark.io/pricing),
[limits](https://documentation.formspark.io/troubleshooting/limits-and-plans.html), and
[spam filtering](https://formspark.io/features/spam-filtering). The research service rate-limited
additional vendor checks, so Formspree/Web3Forms were not sufficiently verified for recommendation.

Before any backend is activated: legal approval, processor/DPA review, exact fields, retention and
deletion procedure, access control, spam protection, error/retry states, server-confirmed success,
notification security and a no-secrets-in-client review are mandatory.

## 5. Route inventory and test matrix

Public candidate routes: `/`, `/work`, `/process`, `/about`, `/shopify`, `/services`, ten generated
`/services/[slug]` routes, `/pricing`, `/contact`, and `/404`.

Draft/non-public routes: `/privacy` and `/terms` (visible drafts, noindex, excluded from sitemap),
plus `/hero-lab/human-digital` and `/hero-lab/atelier` (direction studies, noindex, excluded from
navigation and sitemap). Generated resources: `/robots.txt`, `/sitemap-index.xml`,
`/sitemap-0.xml`, `/favicon.svg`, `/assets/og-sabiforge.png`.

| Verification                                                                          | Result / required record                                                                                                                                                |
| ------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Format, lint, unit, Astro check/build                                                 | Pass locally: Prettier, ESLint, 36/36 Vitest tests, Astro 0 errors/2 React type deprecation hints, 23 generated pages                                                   |
| Chromium 151: routes × seven widths, axe, overflow, links, console, external requests | Pass locally: 23 routes × 7 widths = 161 page loads; zero reported problems                                                                                             |
| Interaction suite                                                                     | Navigation, work demos, pricing, enquiry, process/about/Shopify controls, menu, no-JS and reduced motion                                                                |
| Firefox 153 / Playwright                                                              | Pass locally: complete 28-scenario interaction suite, including navigation, pricing, enquiry handoffs, responsive menu, demos, keyboard focus, no-JS and reduced motion |
| WebKit 26.5 / Playwright                                                              | Not runnable here: host lacks GTK4, Graphene, HarfBuzz ICU, Manette, Hyphen and GLES libraries; browser downloaded but launch blocked                                   |
| Real Safari/iOS and Android Chrome                                                    | Not replaceable by desktop emulation; owner/device QA required                                                                                                          |
| Assistive technology                                                                  | NVDA + Firefox and VoiceOver + Safari required; TalkBack/voice/switch recommended                                                                                       |
| Performance                                                                           | Lighthouse staging mobile/desktop; WebPageTest or equivalent real network; field INP later                                                                              |

WebKit/Safari requirements: the automated `staging-qa.yml` workflow supports Playwright WebKit,
but this does not replace native Safari. Verify latest Safari on macOS and Safari on a real iPhone,
including font loading, sticky/header behaviour, reduced motion, form focus and keyboard behavior,
history/back navigation, viewport resizing, touch targets and slow-network loading. Also test at
least one current Android device/browser.

Manual assistive-technology checklist for protected staging:

- [ ] VoiceOver + Safari on macOS: landmarks, heading order, link/button names, menu state, tabs,
      form labels/errors/focus movement and the enquiry review step.
- [ ] VoiceOver + Safari on iPhone: rotor/navigation, swipe order, zoom, orientation changes,
      touch targets and form completion.
- [ ] NVDA + Firefox: same landmarks/forms/interactive controls; verify errors are announced once
      and focus returns correctly after editing.
- [ ] TalkBack + Chrome on Android: navigation order, menu, pricing controls and enquiry handoff.
- [ ] Keyboard only, 200%/400% zoom, reflow at 320 CSS px, visible focus, contrast in active/error
      states, reduced motion and no-JavaScript content visibility.

### CI status

`CI` is configured to run formatting, ESLint, Vitest, Astro check, production and staging builds,
SITE_URL policy checks, a parser check against the actual generated sitemap XML, and a staging
metadata check across every HTML page. The first GitHub push and PR runs on `874b59e` both passed
(runs [42202620136](https://github.com/kellyraydev/sabiforge-digital/actions/runs/42202620136) and
[42202626361](https://github.com/kellyraydev/sabiforge-digital/actions/runs/42202626361)). Those runs
reported non-blocking Node 20 action-runtime and `ubuntu-latest` migration notices; the workflow
now pins Node 24-compatible actions and Ubuntu 24.04. The updated workflow must pass on its new head
commit before the CI gate is considered current. The authenticated staging workflow has not run:
the host, Access policies, environment secrets and staging URL remain unconfigured pending approval.
Local results are not remote CI evidence.

## 6. Performance, accessibility and design findings

- Local assets and self-hosted fonts avoid third-party render dependencies. The generated WebP
  portrait is provisional; the PNG OG image now exists, so older “no OG image” notes are outdated.
- Previous local Lighthouse measurements are useful regression evidence, not production guarantees.
  Legal-page SEO scores are intentionally reduced by `noindex`.
- Environment-output checks pass: staging produces HTTPS absolute canonical/OG/sitemap URLs,
  `noindex,nofollow` and `Disallow: /`; production permits indexing while legal drafts remain
  noindex; an insecure staging `SITE_URL` fails the build.
- Axe and keyboard automation do not establish WCAG conformance. Manual screen-reader, 200%/400%
  zoom, reflow, contrast in every interactive state and touch-target checks remain.
- The current visual direction is coherent across supporting pages. The genuine remaining visual
  risks are the provisional portrait/logo, long Process/Shopify copy, and final animation feel on
  Safari/mobile hardware—not a reason for another redesign.
- The CSS scroll-progress enhancement is allowed to disappear where scroll-driven animation is
  unsupported; content and navigation must remain complete without it.

## 7. Protected staging proposal (not deployed)

### Recommended host and access

Recommend **Cloudflare Pages + Cloudflare Access** for this static Astro site. Pages creates a
separate immutable deployment for each build, serves HTTPS, and supports rollback to a successful
deployment. Cloudflare Access provides real identity-gated authentication (email one-time PIN or an
approved identity provider) and service tokens for automation. Protect both the stable project
hostname and every deployment/preview hostname; verify unauthenticated requests are denied before
sharing any URL. `noindex`, `robots.txt`, and an obscure URL are crawler controls only, not access
protection.

Expected cost: **$0/month** for Pages static hosting at this project's scale and Access Free for up
to 50 users; the published Access pay-as-you-go rate above that is **$7/user/month**. Taxes, domain
registration (not needed for the proposed `pages.dev` hostname) and any account-specific limits are
extra. Pages Free currently allows 500 builds/month and one concurrent build, comfortably above
this static review workflow. Sources: [Pages limits](https://developers.cloudflare.com/pages/platform/limits/),
[Access plans](https://www.cloudflare.com/zero-trust/products/access/), and
[Pages rollbacks](https://developers.cloudflare.com/pages/configuration/rollbacks/).

Alternative: Vercel Pro is a simpler managed workflow for a small team with protected preview
deployments, immutable deployment URLs and rollback, at a published $20 per seat/month ([pricing](https://vercel.com/pricing)). Prefer it
if a paid seat is acceptable and built-in preview protection is more important than minimizing
monthly cost. Recheck current pricing and which deployment-protection features are included before
purchase.

### URL and environment proposal

- Proposed stable staging origin: `https://sabiforge-digital-staging.pages.dev` (already used in
  `.env.example`). It is a proposal until the Pages project exists and its exact hostname is
  confirmed. If an approved business domain is later selected, use a dedicated `staging.` origin.
- Build staging with `SITE_ENV=staging` and `SITE_URL` equal to that exact HTTPS origin. The same
  origin must appear in canonical, Open Graph and sitemap URLs. The generated robots file disallows
  all crawlers; every page emits `noindex,nofollow`.
- Keep production in a separate project and account environment. The production URL guard requires
  an exact match to the current candidate `https://sabiforge.digital`, rejecting every other
  staging, preview, internal or unapproved public origin. This candidate has not been validated as
  an owned domain; after the owner approves a different domain, change the single allowlist value in
  `astro.config.mjs` and the CI fixture together before building production.
- Do not expose any project secrets to build/browser code. This site currently needs no runtime
  secrets. Use Access service tokens only in GitHub Actions environment secrets, never in source,
  workflow logs, URLs or artifacts.

Cloudflare Pages deployment previews are public by default. Enable the Pages **access policy** for
preview deployments, then separately secure the project's `*.pages.dev` hostname in the generated
Access application; Cloudflare documents these as distinct protections. Test both the stable
hostname and a hash-based immutable deployment URL without credentials before inviting reviewers.
Sources: [Pages preview access](https://developers.cloudflare.com/pages/configuration/preview-deployments/)
and [Pages `pages.dev` Access instructions](https://developers.cloudflare.com/pages/platform/known-issues/#enable-access-on-your-pagesdev-domain).

### Verification and rollback

1. After approval, create a dedicated Pages staging project from this PR branch. Disable automatic
   production promotion and ensure the stable hostname plus generated deployment URLs are covered
   by Access policies. Do not add DNS or production services as part of this proposal.
2. Configure `SITE_ENV=staging`, `SITE_URL=https://sabiforge-digital-staging.pages.dev`, an Access
   allow policy for named reviewers, and a separate Access service token for automation.
3. Build the pinned commit. CI runs format, lint, unit tests, Astro checks, production build and
   `scripts/check-sitemap.mjs`, which parses the built XML and rejects hero-lab, draft legal and
   error routes or wrong-origin URLs. Staging verification also checks canonical/OG URLs, robots,
   `noindex,nofollow`, headers, authentication and sitemap.
4. Use the manual GitHub Actions `Authenticated staging QA` workflow. Protect the GitHub `staging`
   environment with branch restrictions and a required reviewer so modified test code cannot
   receive service-token secrets without review. Set
   `STAGING_BASE_URL` in the GitHub `staging` environment and store
   `CF_ACCESS_CLIENT_ID` / `CF_ACCESS_CLIENT_SECRET` as environment secrets. Credentials are sent
   only to the two code-allowlisted HTTPS staging hostnames and are not printed. Run Chromium,
   Firefox and WebKit, then complete the real-device and assistive-technology matrix in §5.
5. Record approved URL, commit SHA, Pages deployment ID, CI run, browser/AT results and reviewer.
6. For rollback, select the previous successful staging deployment in Pages → Deployments →
   **Rollback to this deployment**. Keep a last-known-good deployment ID and source commit in the
   release record; verify the rolled-back URL still returns the expected content and remains Access
   protected. Production requires its own project, approved domain and explicit release approval.

No hosting project, Access policy, DNS record, secret or public deployment has been created in this
milestone.

## 8. Consolidated owner-decision register / launch blockers

| Decision                                                                          | Blocking                          | Source                     |
| --------------------------------------------------------------------------------- | --------------------------------- | -------------------------- |
| Approve/amend/remove each of six pending services                                 | Public launch                     | §2                         |
| Confirm package inclusions and platform limits without changing approved prices   | Public launch                     | `packages.ts`, T2/T3/T7/T8 |
| Set founding places, duration and qualification/termination conditions            | Public launch                     | T12                        |
| Resolve P1–P11 and T1–T13; qualified legal review                                 | Public launch                     | `legal.ts`                 |
| Confirm About claims: direct access, no account layer and stated QA practices     | Public launch                     | Milestone D §6             |
| Confirm Process review gates, consolidated-feedback wording and handover contents | Public launch                     | `process.ts`               |
| Confirm Shopify scope/limits and integrations described                           | Public launch                     | `commerce.ts`              |
| Approve original logo files and portrait policy                                   | Public launch                     | `HERO-LAB.md`              |
| Choose staging/production hostnames and hosting provider                          | Private staging                   | §7                         |
| Choose protected-staging access method and reviewer list                          | Private staging                   | §7                         |
| Keep email/WhatsApp handoff or approve provider, DPA and retention                | Provider activation/public launch | §4, P3/P6/P8/P9            |
| Approve analytics/cookies or continue without them                                | Public launch                     | P7                         |
| Complete Firefox/WebKit plus real-device and AT tests                             | Public launch                     | §5                         |

## 9. Conflicting or outdated documentation

- `README.md` previously called only milestones B/C ready for review; the branch now includes D,
  hero, homepage rebuild and supporting pages. The README now points here.
- `MILESTONE-D.md` says the branch is `claude/sabiforge-digital-init-kxar7l`; current work is on
  `codex/sabiforge-premium-visuals`.
- `MILESTONE-D.md` says there is no Open Graph image; `public/assets/og-sabiforge.png` and metadata
  now exist.
- `MILESTONE-D.md` lists 21 built pages before the two hero studies and describes only Chromium
  coverage. Use §5 for the current inventory/results.
- `HOMEPAGE-MILESTONE.md` proposes a form backend and success/error states as future work. The
  approved current implementation is a browser-only handoff; it must not be described as a sent form.
- Any earlier “first 3 clients” wording is superseded by the unresolved 3-vs-5 decision and the live
  neutral phrase “a limited number of founding clients.”

## 10. Final approval checklist

- [ ] All six pending services have signed owner decisions reflected in code and copy.
- [ ] Package terms and founding-offer conditions are approved; price regression tests still pass.
- [ ] Final privacy/terms are legally reviewed, approved, indexed and added to the sitemap only then.
- [ ] Branding files and every image licence/provenance record are approved.
- [ ] Production domain and separate protected staging configuration are approved.
- [ ] Enquiry delivery and retention are approved and tested without premature success messaging.
- [ ] Full staging QA passes in Chromium, Firefox and WebKit; real Safari/iOS and Android checks pass.
- [ ] Keyboard, NVDA and VoiceOver checks pass with issues documented and repaired.
- [ ] Staging performance/SEO/OG/canonical/sitemap/robots results are recorded.
- [ ] No credentials or unexpected third-party requests appear in source, build output or browser.
- [ ] Rollback target and launch operator are named; owner gives explicit deploy and merge approval.
