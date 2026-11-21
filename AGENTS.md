# AGENTS.md — SabiForge Digital

## Mission

Build and maintain the SabiForge Digital agency website with reliable engineering, faithful implementation of approved design references, accurate business information, and explicit release controls.

Stack verified on the repository default branch on 2026-11-20: Astro (static output), React islands, TypeScript (strict), Tailwind CSS v4, npm, Vitest, Playwright. Keep this architecture unless the owner approves a change. Use server-rendered Astro for content; add React only for interaction that requires it.

This file governs *how to work*. `docs/REBUILD-BRIEF.md` records the approved visual rebuild and the authoritative owner decisions ledger, and `docs/references/` holds the two supplied reference images (`homepage-target.jpeg`, `implementation-blueprint.jpeg`), to be committed by the owner if not yet present. Reference images are design direction, **not** evidence for business claims, services, pricing, contact details, or portfolio provenance. Code work happens on `redesign/**` branches.

## 1. Reconcile state before doing work

1. Read the task, this entire file, the rebuild brief, and the relevant code and configuration. Examine `git status`, current branch and commit, tracked files, open PRs, and any known work in progress before editing. Do not assume that the default branch includes changes from outstanding PRs.
2. Read `docs/LAUNCH-READINESS.md` and `docs/CREATIVE-DIRECTION.md` for history, but verify their dates and claims. The old statements that nothing is deployed, that all current work follows an editorial/ivory palette, or that old launch records describe present infrastructure must **not** be treated as automatically current.
3. Verify the target GitHub repository, branch, Vercel project, Cloudflare account, deployment environment, and hostnames before any infrastructure task. The owner has designated the `kellyray-dev` Cloudflare account for SabiForge; verify the actual account ID and access rather than guessing. Existing Vercel deployments and Cloudflare preview infrastructure may have separate states.
4. Report findings as **GIVEN** (direct evidence), **INFERRED** (include confidence), or **MISSING**. Copy exact IDs, prices, contacts and paths from their verified sources. Use `[PLACEHOLDER: required information]` rather than inventing missing details.
5. For substantial UI work, provide a short implementation plan and identify existing PR/worktree conflicts before touching code. Do not silently overwrite other branches, images, or unfinished changes.

## 2. Sources of truth and conflicts

- **Owner approvals and latest explicit task scope** control what changes are authorized.
- **Current repository and deployment evidence** establish what actually exists; do not rely on an outdated status sentence in a document.
- **The owner decisions ledger** in `docs/REBUILD-BRIEF.md` records every explicit owner approval with its date. Where older documents or older rules in this file conflict with the ledger, the ledger controls. Do not re-approve an already recorded decision, and do not block ledged work with superseded guards.
- **`docs/REBUILD-BRIEF.md` and supplied visual references** control the intended design direction for the *rebuild*, subject to owner acceptance. The first reference image is the primary homepage visual target; the second is an implementation blueprint, not a replacement for repository facts.
- **Business data** remains in `src/data/site.ts`, `src/data/services.ts`, `src/data/packages.ts`, and `src/lib/pricing.ts`. Screenshots do not override these files. Business changes beyond the ledger require explicit owner approval; the design brief is not an implicit approval.
- **Previous creative-direction documents** remain historical context. Where they conflict with the approved design direction, flag the conflict and migrate deliberately rather than preserving the old palette by default.
- In an unresolved conflict, preserve existing business facts and release protections, implement only uncontroversial UI work, and make the blocked choice explicit. Do not declare an unapproved decision approved.

## 3. What the rebuild is allowed to change

The owner has requested a full homepage and component-system rebuild. For that scoped work, substantial changes to layout, typography, responsive behavior, component structure, visual assets, spacing, gradients, interaction design, and centralized design tokens are **allowed**. Do not interpret "smallest change" or "follow existing patterns" as a prohibition on the authorized redesign.

Design guidance:

- Dark navy/obsidian canvas; selective violet, purple, cyan, and turquoise gradients; crisp luminous accents; restrained depth and glow; rounded but purposeful cards; clear typography and strong contrast.
- Follow the reference's information hierarchy, service showcases, concept-work treatment, packages, process, and lead-generation CTAs, without making a desktop screenshot the mobile layout.
- Use responsive real HTML and accessible interactive components. Never implement the whole homepage as one screenshot or use fake clickable controls.
- Treat dashboard/device scenes as visual mockups unless functionality is explicitly approved. Keep example metrics and fictional business names clearly conceptual.
- Update design tokens centrally in `src/styles/global.css` and reusable components. Prefer semantic new token names; avoid hard-coded inline colours. Migrate old classes consistently, retaining unaffected styles until replaced.
- Preserve the approved SabiForge logo/wordmark where verified. Do not invent an official logo source or casually replace brand assets. Keep fonts self-hosted and verify licences (Fontsource, no third-party font requests).
- Animations should be purposeful, light, and disabled or reduced under `prefers-reduced-motion`; content must remain visible without JavaScript. Avoid heavy effects that harm load time or accessibility.
- Design all relevant internal pages coherently with the new system; do not make only the homepage match while leaving clashing shared header, footer or CTA components.

## 4. Business and content approval gates

- **Prices and services:** approved by the owner on 20 November 2026 and recorded in the ledger in `docs/REBUILD-BRIEF.md`: four services (Business Websites; Online Stores; Custom Software and Business Platforms; Website Redesign and Ongoing Support) and packages Starter NGN 150,000, Business NGN 350,000, Online Store NGN 750,000, Custom Software from NGN 1,500,000. Apply them in `src/data/services.ts`, `src/data/packages.ts` and `src/lib/pricing.ts` as one separately reviewable commit, updating pricing regression tests in the same commit. Custom Software remains a starting price ("from"), never a fixed quote. Any further commercial change requires a new owner decision.
- **Founding offer:** `FOUNDING_CLIENT_SLOTS = 5` approved by the owner on 20 November 2026. Update the founding-offer copy from "a limited number of founding clients" to state five founding client slots. Discount rules in `src/lib/pricing.ts` remain unchanged.
- **Contacts:** details in `src/data/site.ts` remain authoritative. The email and phone shown in reference images are historical references and must not replace verified data.
- **Provenance discipline:** no testimonials, staff, customers, businesses, official relationships, results, metrics, locations, addresses, social links, business registration details, or live portfolio achievements beyond what is verified in the repository.
- **Concept labelling:** fictional or experimental work must be visibly labelled "Studio concept" (or the existing verified disclosure standard) wherever it appears; do not imply a paying client or launched production platform. The six v2 homepage concepts carry "Concept Project" badges; the existing `/work` concept studies (Àdùn Table, Kòrà Home, Mend Physio Studio, Tallyhouse) must not be removed when the homepage grid switches.
- Draft legal pages (`privacy`, `terms`) stay labelled draft, noindex, and excluded from public sitemaps until separate legal and publication approvals.
- The enquiry flow's privacy model does not change without specific approval: no storage, transfer, retention, analytics, cookies or backend providers. The current browser-only handoff may be visually improved, but a server form or third-party delivery integration is a separate feature and privacy decision.
- **Imagery policy:** AI-generated imagery is approved for hero compositions, concept thumbnails, section art and provisional case-study visuals. Every generated asset gets a provenance record (subject, generated status, tool, date) in `docs/IMAGE-PROVENANCE.md` (created on first use), with master copies in the `sabiforge-visual-assets` repository where applicable. All images are stored locally and served through Astro image assets/optimization; external hotlinks are forbidden because the QA suites keep zero third-party requests green. Review each asset for responsive cropping and accessible alt text before completion; alt text states what the image is (for example, "provisional generated art-direction image"). Generated people must never be presented as actual SabiForge staff, clients or testimonial subjects. Third-party logos, brands and licensed material still require owner approval; the SabiForge logo/brand files come from the owner.

## 5. Code organization and engineering

- `src/data/site.ts`: verified contacts, business information, navigation.
- `src/data/services.ts`: service catalogue. `src/data/packages.ts`, `src/lib/pricing.ts`: packages, prices, discount rules. Concept/project data stays in the file(s) where it lives today; do not rename or split it silently.
- `src/components/`: reusable UI and page sections. `src/pages/`: routes. `src/styles/global.css`: tokens and global styling.
- `tests/`: Vitest; `scripts/`: visual/interaction QA and deployment policy checks; `docs/`: evidence, decisions and reference images.
- Keep TypeScript strict and avoid `any` as a workaround. Keep accessible component semantics, visible focus, keyboard support, and meaningful alt text. Prefer real links and buttons with working destinations/states.
- Reuse proven components and dependencies when suitable, but do not force outdated styling into a redesign. Avoid unrelated refactors and major dependency upgrades; propose them separately with tradeoffs. On `redesign/**` branches, scoped restructuring per the rebuild brief is in scope, landing structure work in its own commits, separate from visual changes.
- Add or update tests for changed logic, data rendering, behavior, navigation, pricing, and service approval gates. Ensure no broken internal links, placeholder destinations, fake contact links, or unhandled form states.

## 6. Commands and validation

- Node >=20.3.0; CI uses Node 22; npm only with committed lockfile. Prefer `npm ci` for clean installs.
- `npm run dev`: Astro dev. `npm run format`: Prettier formatting. Do not hand-reformat unrelated files.
- Before declaring code complete, run `npm run verify` (format check, lint, Vitest, Astro check/build). Run individual scripts when diagnosing: `npm run format:check`, `npm run lint`, `npm test`, `npm run check`, `npm run build`.
- Run relevant policy checks: `npm run verify:site-url`, `npm run verify:sitemap`, `npm run verify:staging-output`. Distinguish production output from staging output and validate the correct environment configuration.
- For visual/interaction changes, run `npm run qa:visual` and `npm run qa:interactions` against a running local preview. Inspect 375, 390, 430, 768, 1280, 1440 and 1920 px layouts, plus representative shorter heights. Check overflow, header/navigation, links, sections, image crop/size, forms, focus, keyboard, motion preferences, contrast and console errors.
- Verify the main navigation and calls to action, responsive menu, service cards, concept disclosures, package cards, project-enquiry flow, and any interactive filters or accordions introduced by the rebuild.
- Aim for Core Web Vitals and accessible, SEO-friendly pages (illustrative lab targets: LCP <=2.5s, CLS <=0.1, Lighthouse mobile >=90 and SEO >=95). Do **not** report targets as measured results, or treat a Lighthouse score as proof of field performance. Report actual metrics and test conditions where available.
- If browsers, credentials or preview infrastructure are unavailable, mark checks **NOT RUN** and explain the exact blocker. Never claim validation that did not occur.

## 7. Release, security and account safeguards

- **No merge, production promotion, deployment, DNS change, account migration, service activation, payment, paid upgrade, or production-environment modification without explicit approval for that action.** A rebuild request is not deployment authorization.
- **Vercel preview deployments of `redesign/**` branches are approved and expected** for owner review. Merge to `main`, production promotion, staging access gates and DNS remain gated.
- Do not push directly to `main`. Check existing draft PRs before creating new ones. Use a dedicated `redesign/**` branch. A draft PR remains unmerged until review gates pass.
- Before pushing, check whether automation would publish a production deployment; if a push would violate the production rule, stop and ask for an authorized route.
- Never put secrets in source control. Use safe `.env.example` placeholders; treat environment values and staging QA tokens as secrets. Do not expose authenticated or staging pages by accident.
- Do not remove Cloudflare Access, noindex staging controls, Vercel deployment protection, production origin policies or other security boundaries merely to make a preview easier to access.
- Confirm account/project ownership and environment names rather than inferring them from remembered account IDs. Keep Vercel production and Cloudflare preview concerns distinct unless a specific approved architecture says otherwise.
- Ask before destructive operations, force pushes, history rewrites, unapproved external API calls that spend money, and major migrations.

## 8. Definition of done and handoff

For each task, provide:

1. **Scope:** exact branch/commit, files changed and what was deliberately left unchanged.
2. **Evidence:** commands and browser checks actually run, with pass/fail/not-run and material warnings.
3. **Visual QA:** reference alignment, mobile behavior, accessibility and screenshot differences when applicable.
4. **Safety:** no unauthorized change to commercial data, service approvals, secrets, hosting or production.
5. **Decisions needed:** `[PLACEHOLDER: ...]` for missing assets/facts and an explicit **Confirm with owner** section for content, legal, prices or capability claims.

Do not call the task finished if critical required checks are blocked. Deliver a precise partial-completion report rather than inventing success.

- CI runs on pushes to `main`, `master`, and `codex/**`, on all pull requests, and on manual `workflow_dispatch`. Preferred branch-name prefix: `redesign/**` (approved by the owner on 20 November 2026).
