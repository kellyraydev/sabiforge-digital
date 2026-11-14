# AGENTS.md — SabiForge Digital website

Agency website for SabiForge Digital. Astro (static output) + TypeScript (strict) + Tailwind CSS v4 + React islands.
Status: pre-launch. Nothing is deployed. See `docs/LAUNCH-READINESS.md` for the authoritative current status.

## Setup and commands

- Node 20.3+ (CI uses Node 22), npm only (`package-lock.json` is committed; use `npm ci` / `npm install`).
- `npm run dev` — dev server at http://localhost:4321
- `npm run verify` — format check → lint → tests → `astro check` + build. **Run this before saying a task is done.**
- Single steps: `npm run format:check`, `npm run lint`, `npm test`, `npm run check`, `npm run build`
- Also run when relevant: `npm run verify:site-url`, `npm run verify:sitemap`, `npm run verify:staging-output`
- `npm run qa:visual` and `npm run qa:interactions` need Playwright and a running preview server (`npm run build && npm run preview`, then `BASE_URL=http://localhost:4321 ...`). Run them only for UI changes.
- Format with `npm run format` (Prettier, single quotes, width 100, Astro + Tailwind class sorting). Do not hand-reformat.

## Where things live

- `src/data/site.ts` — contact details, navigation, agency facts. Change facts here, never inline in components.
- `src/lib/pricing.ts`, `src/data/packages.ts`, `src/data/services.ts` — prices, founding offer, services (with `approval` status).
- `src/components/*` grouped by area (home, pricing, contact, layout, ui, ...); `src/pages/*` routes; `src/styles/global.css` design tokens.
- `tests/` Vitest unit tests; `scripts/` Playwright QA and build-policy checks; `docs/` direction and launch records.

## Hard rules (owner decisions required — do not change on your own)

- Do not merge, deploy, change DNS, or activate any provider/service. Do not change the production origin in `astro.config.mjs`.
- Do not change prices, package terms, the founding offer (`FOUNDING_CLIENT_SLOTS` stays `null` until the owner decides), or any service's `approval: 'pending'` status.
- Do not add testimonials, client names, portfolio projects, social accounts, registration details or other claims that are not already verified in `src/data/site.ts`. Fictional work stays labelled "Studio concept".
- Draft legal pages (`privacy`, `terms`) stay labelled draft, noindex, and excluded from the sitemap.
- The contact form must not store or transmit data. No backend, analytics or browser storage without owner approval.
- Never commit secrets or real `.env` files. `.env.example` holds placeholders only. Staging QA secrets live in GitHub environment secrets.
- Do not add third-party logos, brands, licensed fonts/images, or code under an incompatible licence without flagging it first. Fonts are self-hosted via Fontsource (no third-party font requests).
- Stop and ask before anything destructive or hard to undo (deleting files/branches, force-push, rewriting history, dependency major upgrades).

## Conventions

- Smallest change that meets the goal. Follow existing patterns; no unrelated refactors or drive-by reformatting.
- Keep strict TypeScript passing; no `any` to silence errors.
- Accessibility is a requirement: keep WCAG AA contrast (text on coral uses midnight ink, not white), visible focus, keyboard operability.
- Use the existing Tailwind tokens (`midnight-*`, `mint-*`, `coral-*`, `ivory-*`); do not introduce new hex colours inline.
- Add or update a Vitest test when changing logic in `src/lib/` or data files.
- Work on a new branch and open a **draft** PR. Never push to `main`.

## Definition of done

Finish every task with: (1) what changed and where, (2) how to verify (commands run, with exact pass/fail, and anything not run), (3) open questions, (4) "Confirm with owner" for any business fact, price, legal wording or claim you touched or were unsure about.

- CI runs on pushes to `main`, `master`, and `codex/**`, on all pull requests, and on manual `workflow_dispatch`. A preferred branch-name prefix is not set and needs an owner decision.
