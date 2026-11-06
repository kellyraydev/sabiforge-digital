# Private staging — independent engineering review and deployment runbook

Reviewer branch: `claude/sabiforge-staging` (from `codex/sabiforge-premium-visuals` @ `1536a1c`).
Date: 6 November 2026. **Status: staging NOT deployed.** No Cloudflare resource, Access policy,
DNS record, secret or deployment was created. PR #1 untouched; Codex's branch not modified.

## 1. Blockers needing the owner (cannot be done from this session)

1. **Authorise the Cloudflare connector** (claude.ai connector settings → Cloudflare). This session
   only has a deprecated Workers-bindings tool (no deploy, no Access, no Zero Trust API), so Access
   could neither be created nor verified. Do not paste tokens in chat.
2. **Choose Pages or Workers Static Assets** (§3). Hostname, `SITE_URL` and the CI allowlists depend on it.
3. Name the reviewer emails for the Access allow policy.
4. Note: the Cloudflare account already contains unrelated Workers (`kellyray-assistant*`,
   `kr-ng-launch-review`, `amzlat-prev`, …). They were only listed, never touched. Confirm the
   account is the intended one before anything is created.

## 2. Audit findings

Verified on the unmodified branch: Prettier, ESLint, 36/36 Vitest, `astro check` + build (23 pages),
`verify:sitemap` (18 URLs), `verify:staging-output` (23 pages: noindex,nofollow, canonical/og:url on
`SITE_URL`, robots `Disallow: /`). Only external hrefs in the output are `wa.me` links; no external
requests at runtime.

| #   | Severity | Finding                                                                                                                                                 | Action                                                                 |
| --- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| 1   | Medium   | No security headers (no `public/_headers`): no CSP, framing, nosniff, referrer, permissions policy                                                      | **Fixed**: added `public/_headers`                                     |
| 2   | Medium   | Pages `*.pages.dev` and preview URLs are public by default; Access must cover both separately                                                           | Runbook §4; unverified until the connector is authorised               |
| 3   | Low      | Cloudflare now recommends Workers Static Assets for new projects; Pages is in maintenance mode                                                          | Decision §3; `wrangler.jsonc` prepared                                 |
| 4   | Low      | CSP needs `'unsafe-inline'` for script/style (Astro inline scripts, ld+json, style attributes). Tighter hash-based CSP is possible later                | Documented, not changed                                                |
| 5   | Low      | `npm audit`: moderate `minimatch` DoS, dev-only (ESLint toolchain). Fix requires downgrading ESLint (breaking)                                          | Not applied; no production exposure                                    |
| 6   | Info     | `scripts/staging-auth.cjs` and `staging-qa.yml` hardcode `*.pages.dev` / `staging.sabiforge.digital`; a workers.dev host would be rejected by the guard | Update allowlist once host is chosen (do not widen to `*.workers.dev`) |
| 7   | Info     | `staging-qa.yml` installs only the selected browser and relies on the `staging` GitHub environment protections being configured                         | Owner: add required reviewer + branch restriction                      |
| 8   | Info     | Draft/noindex routes (`/privacy`, `/terms`, `/hero-lab/*`) are correctly excluded from the sitemap                                                      | No action                                                              |
| 9   | Info     | `docs/LAUNCH-READINESS.md` §9 lists known stale docs; unchanged                                                                                         | No action                                                              |

Own defect caught and fixed during testing: the first CSP draft used `font-src 'self'`, which blocks
Vite's inlined `data:` fonts (44 console violations across routes). Now `font-src 'self' data:`.

No design, pricing, portfolio or business copy was changed.

## 3. Pages vs Workers Static Assets

Cloudflare docs (Workers best practices, checked 6 Nov 2026): "If you are starting a new project, use
Workers instead of Pages. Pages continues to work, but new features … are focused on Workers."
Workers supports `_headers`/`_redirects` natively, per-version Preview URLs, and one-click Access on
`workers.dev` + Preview URLs (Access policy for previews is shared account-wide).

- **Option A — Workers Static Assets (recommended).** Use the prepared `wrangler.jsonc`. Host will be
  `sabiforge-digital-staging.<account-subdomain>.workers.dev`; `SITE_URL` must be that exact origin.
- **Option B — Pages + Access (previously approved).** Still supported; needs the three-step Access
  coverage (preview policy, `*.pages.dev` Access app, test hash URL). Host `sabiforge-digital-staging.pages.dev`
  matches current `.env.example`/CI with no code changes.

Both are $0 at this scale; Access Free covers 50 users.

## 4. Deployment procedure (run only after owner approval and connector authorisation)

1. Create the project (A: Worker `sabiforge-digital-staging`; B: Pages project, production promotion off).
2. **Before any real build is uploaded**, deploy a placeholder (a single static `index.html` saying
   "SabiForge staging placeholder", `noindex`) and enable Access:
   - A: Settings → Domains & Routes → enable Access for **both** workers.dev and Preview URLs.
   - B: enable Pages access policy (previews) **and** add the Access app for `*.pages.dev`.
   - Policy: Allow → named reviewer emails (one-time PIN). Service token (Service Auth policy) only for CI.
3. Verify unauthenticated: `curl -sI <stable url>` and a hash/preview URL must return 302 to
   `*.cloudflareaccess.com` (or 403), **never 200**, including `/robots.txt`, `/sitemap-0.xml`,
   `/assets/og-sabiforge.png`. Verify with the service token header → 200.
4. Build and deploy: `SITE_ENV=staging SITE_URL=<exact origin> npm run build && npx wrangler deploy`
   (credentials via `wrangler login` or CI secrets, never in chat/source).
5. Re-run step 3 against the real deployment, then the QA workflow
   (`Authenticated staging QA`, chromium → firefox → webkit) with `STAGING_BASE_URL` and
   `CF_ACCESS_CLIENT_ID/SECRET` in the GitHub `staging` environment.
6. Record URL, commit SHA, deployment/version ID, CI run and reviewer.

## 5. Rollback

- Workers: Deployments → select previous version → Roll back (or `npx wrangler rollback <version-id>`).
- Pages: Deployments → previous successful deployment → Rollback.
- Emergency: disable the workers.dev route / delete the staging project; Access stays as a second lock.
- After rollback re-run §4 step 3 and confirm Access still blocks anonymous requests.

## 6. Test results (this session, local)

Served `dist` (staging build) through `wrangler dev`, which applies `_headers`:

| Check                                                                    | Result                                                                                                                                      |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------- |
| Chromium interaction suite (`qa:interactions`)                           | 28/28 pass with CSP active                                                                                                                  |
| Sweep: 22 routes × 390 px and 1280 px (console, CSP, requests, overflow) | 0 problems; no external requests                                                                                                            |
| axe-core WCAG 2.0/2.1 A/AA on the same sweep                             | 0 violations                                                                                                                                |
| Response headers / 404 handling                                          | CSP, nosniff, X-Frame-Options, COOP, Referrer/Permissions-Policy, HSTS present; unknown path returns 404                                    |
| Firefox, WebKit                                                          | **Not run**: browser downloads/host libraries unavailable in this sandbox. Run via the `Authenticated staging QA` workflow after deployment |
| Full 161-load `qa:visual`, Lighthouse, link crawl against live staging   | **Not run** (visual suite exceeds sandbox time limit; Lighthouse and live checks need the deployed URL)                                     |
| Real Safari/iOS/Android, screen readers                                  | Manual, per LAUNCH-READINESS §5                                                                                                             |
| Canonical/OG/sitemap/robots on the live staging host                     | Verified at build time only; recheck on deployed origin                                                                                     |
