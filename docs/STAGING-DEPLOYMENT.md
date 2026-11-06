# Private staging — independent engineering review and deployment runbook

Reviewer branch: `claude/sabiforge-staging` (from `codex/sabiforge-premium-visuals` @ `1536a1c`).
Date: 6 November 2026. **Status: DEPLOYED to private staging, behind Cloudflare Access.**
Not production. No DNS change, no purchase, no analytics/payment/form backend. PR #1 untouched;
Codex's branch not modified.

## 1. Deployment record

| Item                        | Value                                                                                       |
| --------------------------- | ------------------------------------------------------------------------------------------- |
| Cloudflare account          | `kr-dev` (owner-confirmed)                                                                  |
| Host                        | Workers Static Assets, Worker `sabiforge-digital-staging` (owner-chosen)                    |
| Staging origin              | `https://sabiforge-digital-staging.krdev.workers.dev` (`SITE_ENV=staging`, same `SITE_URL`) |
| Live version ID             | `11eb2eed-520e-4a18-b336-ef3585f89852` (reviewed site)                                      |
| Previous version (rollback) | `b0887766-af02-4d4b-949b-5bf9344aef05` (harmless noindex placeholder)                       |
| Never-promoted version      | `2d8c3926-…` placeholder, used only to test Preview-URL protection                          |
| Authentication              | Cloudflare Access (owner-configured), covers `workers.dev` and Preview URLs                 |
| Source                      | branch `claude/sabiforge-staging` on top of Codex `1536a1c`                                 |

Order followed: placeholder deployed first, Access enabled by the owner, **anonymous requests
verified denied**, and only then the real build uploaded and re-verified.

Protection evidence (anonymous `curl`, no credentials): `/`, `/robots.txt`, `/sitemap-0.xml`,
`/assets/og-sabiforge.png` and an unknown path on the stable hostname, plus `/`, `/robots.txt` and an
unknown path on a hash Preview URL, all returned **302 to `*.cloudflareaccess.com`**, never 200/404.
Re-checked after the real build went live. Before the owner's fix the same requests returned 200
(placeholder only), which is why nothing real was uploaded earlier.

Still open for the owner: the reviewer list/policy is the owner's (not inspected by this session);
no Access **service token** exists, so the `Authenticated staging QA` workflow cannot run yet.
CI/QA allowlists now contain exactly the workers.dev staging host (no wildcard).

## 1a. Former blockers (resolved)

1. Cloudflare authorisation, host choice and account confirmation: done by the owner.
2. The account contains unrelated Workers (`kellyray-assistant*`, `kr-ng-launch-review`, `amzlat-prev`):
   listed only, never touched.

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

## 7. Update: live deployment results (6 November 2026)

Tests ran against the **identical built `dist`** served by `wrangler dev` (applies `_headers`), because
the live URL is behind Access and this session has no service token. Re-run the QA workflow, or
browse the live URL signed in, for final confirmation.

| Check                                          | Result                                                                                                             |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Format (CRLF-agnostic), ESLint, Astro check    | Pass; 36/36 unit tests; 23 pages built                                                                             |
| Sitemap, staging-output, SITE_URL policy       | Pass: 18 sitemap URLs; 23 pages noindex,nofollow with canonical/og on the workers.dev origin; robots `Disallow: /` |
| Interaction suite: Chromium / Firefox / WebKit | **28/28, 28/28, 28/28** (WebKit 27.2 runs on this Windows host)                                                    |
| Route/width sweep (Chromium)                   | 21 routes x 7 widths = 147 loads: no overflow, console errors, broken anchors or axe A/AA violations               |
| Link crawl                                     | 23 pages, 53 internal targets, 0 non-200. Only external links are `wa.me`; no third-party requests                 |
| Lighthouse (local, throttled)                  | Accessibility 100 and Best Practices 100 on all tested pages; SEO 66-69 is expected (noindex). Performance: below  |
| Real Safari/iOS/Android, screen readers        | **Not run** (manual, see LAUNCH-READINESS section 5)                                                               |

### Test-harness change (not a site defect)

WebKit (like Safari by default) does not make links tab stops, so `interactions.cjs` failed its "skip
link is first Tab stop" assertion. For WebKit only, the script now focuses the same focusable elements
in DOM order (`tabStop`); Chromium and Firefox still use real Tab presses. Real Safari needs Option+Tab or
the "Press Tab to highlight each item" setting; verify the skip link manually on a Mac.

### New findings

| Severity | Finding                                                                                                                                                                                                                           | Action                                                                                                                                                                   |
| -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Medium   | Homepage mobile LCP is about 4.3 s (perf 69-77; desktop 99). LCP element is the hero `h1`, hidden until JS adds `is-revealed` (about 1.4 s render delay under 4x CPU throttle). Other pages 94-99 on mobile; `/work/` TBT is high | Owner approved a targeted fix, see section 9. (Original note: not changed, approved design.) Owner to decide whether the hero heading should show without waiting for JS |
| Info     | Lighthouse is noisy on this laptop (one `/services/` desktop run failed; scores moved 60-77 on one page). Treat as indicative                                                                                                     | Re-measure on staging, signed in                                                                                                                                         |
| Info     | Preview URLs exist for every uploaded version and are protected by Access; keep Preview-URL Access enabled                                                                                                                        | None                                                                                                                                                                     |

## 8. Rollback

`npx wrangler rollback b0887766-af02-4d4b-949b-5bf9344aef05` restores the placeholder; any earlier
version works the same (`npx wrangler versions list --name sabiforge-digital-staging`). Emergency stop:
disable the `workers.dev` route in Settings > Domains & Routes. Access remains a second lock. After any
rollback, repeat the anonymous `curl` denial check in section 1.

## 9. Homepage mobile performance correction (owner-approved, 6 November 2026)

**Status: committed on `claude/sabiforge-staging` for review; NOT yet deployed to the staging Worker**
(live version is still `11eb2eed`). Access protection was re-checked and is unchanged. No Access
policy was modified.

### Change (three files, no visual change)

1. `src/components/home/Hero.astro`: removed `data-reveal` from the primary `h1#hero-title`. It was
   `opacity:0` until an end-of-body script's IntersectionObserver fired, so the LCP element waited
   for JavaScript. The kicker, lede, buttons and hero art keep their reveal motion.
2. `src/layouts/BaseLayout.astro`: added an optional named `head` slot (empty on all other pages).
3. `src/pages/index.astro`: preloads the Instrument Serif italic face used by the H1 `<em>`. It was
   discovered only after CSS parsing, so the emphasis rendered in a fallback serif first, then swapped.

Verified unchanged between the original and final builds (computed style and geometry, Chromium):
H1 rect, font family/size/weight/line-height/letter-spacing/colour and `<em>` styling are identical at
390 px, 1440 px and with JavaScript disabled; the H1 is `opacity:1; transform:none` in all three.

### Method

Same machine and server for every run (`wrangler dev` over the staging `dist`), Lighthouse mobile
preset (simulated Slow 4G, 4x CPU), homepage only, performance category. "Before" is the original
build. Medians shown; ranges in brackets. Lighthouse here is noisy (over a third of runs in the
final two batches failed or timed out in the harness and were excluded), so treat as indicative.

| Metric (mobile Lighthouse, median) | Before (5/5 runs)      | H1 fix only (5/5)      | Final: fix + preload (7 of 11 attempted) |
| ---------------------------------- | ---------------------- | ---------------------- | ---------------------------------------- |
| Performance score                  | 74 (70-80)             | 72 (65-78)             | 81 (75-97)                               |
| LCP                                | 4,353 ms (4,347-4,389) | 3,772 ms (2,975-4,359) | 1,569 ms (1,106-3,809)                   |
| FCP                                | 1,127 ms               | 1,136 ms               | 1,127 ms                                 |
| CLS                                | 0                      | 0 (one run 0.011)      | 0 in every run                           |
| TBT                                | 450 ms                 | 1,086 ms (noisy)       | 386 ms                                   |
| LCP element render delay           | 1,493 ms (1,322-1,617) | 655 ms (509-794)       | 646 ms (479-952)                         |
| LCP element                        | `h1#hero-title`        | `h1#hero-title`        | `h1#hero-title`                          |

Second, closer-to-reality probe (Chromium DevTools throttling: 150 ms RTT, 1.6 Mbps, 4x CPU, 412 px
mobile viewport; logs every LCP entry):

| Build       | FCP / LCP entries                                                          | H1 italic font arrives |
| ----------- | -------------------------------------------------------------------------- | ---------------------- |
| Before      | FCP 2.6-2.8 s on a small element; **H1 LCP 3.2-3.4 s** (about 0.6 s later) | about 2.3 s            |
| H1 fix only | single LCP = FCP = 2.5-3.0 s on the H1                                     | about 2.3 s            |
| Final       | single LCP = FCP = **2.4-2.5 s** on the H1                                 | **about 1.0 s**        |

Reading: the H1 now paints with the first frame, saving roughly 0.8-1.0 s of LCP in the throttled
probe and removing the 1.3-1.6 s JS-dependent render delay in Lighthouse. The preload does not change
LCP much on its own but makes the final italic typeface present at first paint.

### Remaining LCP bottlenecks and font review (not changed; need owner decision)

- **Lighthouse LCP is bimodal** (1.1-1.6 s in most final runs, 3.0-3.8 s in the rest). The slow runs
  are the simulator re-reporting the H1 as a later LCP when the web-font swap enlarges it. The
  throttled probe never showed this because both H1 fonts are preloaded and arrive before first
  paint. A robust fix is metric-adjusted fallback fonts (`size-adjust`/`ascent-override`) for
  Bricolage Grotesque, or `font-display: optional` for it. Both touch typography rendering, so they
  need approval and a visual check.
- **Render-blocking CSS**: two stylesheets (about 19 KB + 3 KB, est. 340 ms). Inlining critical CSS
  would help FCP but is a larger build change.
- **Fonts loaded on the homepage**: Bricolage, Inter latin, Instrument Serif italic (now preloaded);
  Outfit, JetBrains Mono and Instrument Serif regular are discovered late but not on the LCP path;
  Inter latin-ext (84 KB) is fetched because the page contains the Naira sign, and an Inter
  vietnamese subset (11 KB) also loads. Subsetting Inter to the glyphs actually used would save about
  95 KB. All faces use `font-display: swap` (no invisible text).
- **JavaScript**: about 64 KB `client.js` plus React chunks for the islands drives TBT (172-987 ms
  across runs); the hero portrait is 96 KB WebP and is no longer the LCP element.
- Conditions are local, not a live edge/field measurement. Re-measure on staging signed in.

### Regression results on the final build

| Check                                                      | Result                                                                                                                                            |
| ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Prettier, ESLint, Astro check, 36/36 unit tests            | Pass                                                                                                                                              |
| Sitemap, staging-output and SITE_URL policy                | Pass (18 URLs; 23 pages; staging origin)                                                                                                          |
| Interactions: Chromium / Firefox / WebKit                  | 28/28, 28/28, 28/28 (WebKit once failed at the contact-form radio, a click-before-hydration timing flake on an untouched page; 3/3 reruns passed) |
| 21 routes x 7 widths, axe A/AA, overflow, console, anchors | Pass, 147 loads, no problems                                                                                                                      |
| No JavaScript / reduced motion                             | Covered by the interaction suite; H1 verified visible with JS disabled                                                                            |

## 10. Cloudflare Access policy: review pending owner confirmation

Reported by the owner; **no policy was changed by this session**: the Allow policy currently admits all
account members (broader than a named-reviewer list), and a full Gmail address was entered as an
email-domain rule instead of an individual email. Needed from the owner: the exact reviewer email
addresses. Then replace both with an Allow rule of type Emails (exact addresses). Preserve protection
while editing: edit the existing application, do not delete it, and re-run the anonymous `curl` denial
check (section 1) afterwards.
