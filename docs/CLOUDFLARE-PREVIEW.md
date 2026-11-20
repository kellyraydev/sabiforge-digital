# Cloudflare Workers preview plan

Status (20 November 2026): **account consolidation in progress; new-account preview uploads suspended**.

**Authoritative Cloudflare account:** `Kellyray.dev@gmail.com's Account` 
(`8849002c70945027fdb2e4169da6802e`, Workers subdomain `kellyray-dev`).
The connected repository is `kellyraydev/sabiforge-digital` and the intended Worker is `sabiforge`.
`wrangler.jsonc` pins the account ID to prevent uploads into another account.

On the authoritative account, the production `workers.dev` hostname, Worker preview URLs, and
Workers Builds preview generation are disabled pending Cloudflare Access setup. Workers Builds'
preview build command is `npm run build:preview`, and no preview `SITE_URL` variable is yet set:
builds must fail closed rather than emit localhost canonicals.

**Legacy `kr-dev` account — not an authorized SabiForge target:**
An earlier preview was uploaded at
`https://codex-cloudflare-preview-readiness-sabiforge.krdev.workers.dev` with unique deployment
`https://216c357d-sabiforge.krdev.workers.dev`. These old URLs were reported public and
must be disabled from the `kr-dev` account; this repository cannot disable them by itself.
The old `https://sabiforge.krdev.workers.dev/` production host returned 404 during that check.

The approved Vercel production origin remains unchanged until a separately verified hosting cutover.
No DNS change, merge, promotion, or paid product is authorized by this preparation.

This plan serves the existing static Astro build from the connected Worker named `sabiforge`. It
does not change the approved production origin in `astro.config.mjs`.

## Configuration

| Setting             | Value                                                                                                                          |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Config              | `wrangler.jsonc`                                                                                                               |
| Worker name         | `sabiforge`                                                                                                                    |
| Tooling             | `wrangler` pinned exactly in `package.json` and `package-lock.json` (4.164.0, newer than the 4.135.0 Workers Previews minimum) |
| Compatibility date  | `2026-11-17`                                                                                                                   |
| Assets              | `./dist` (Astro static output; no Worker script and no Cloudflare adapter)                                                     |
| HTML routing        | `auto-trailing-slash`, matching Astro directory pages such as `dist/about/index.html`                                          |
| Unknown routes      | `not_found_handling: 404-page`, which serves `dist/404.html` with status 404                                                   |
| Production hostname | `workers_dev: false` and no `route` or `routes`, so a later deploy command has no public production hostname in config         |
| Preview URLs        | `preview_urls: true` and an empty `previews` block. Assets stay at the top level, which is where `wrangler preview` reads them |

Sources checked 17 November 2026: [Astro on Workers](https://developers.cloudflare.com/workers/framework-guides/web-apps/astro/),
[static asset routing](https://developers.cloudflare.com/workers/static-assets/routing/),
[HTML handling](https://developers.cloudflare.com/workers/static-assets/routing/advanced/html-handling/),
[headers](https://developers.cloudflare.com/workers/static-assets/headers/),
[Workers Previews](https://developers.cloudflare.com/workers/previews/), and
[preview configuration](https://developers.cloudflare.com/workers/previews/configuration/).

## Build command

Preview builds are separate from production and from the proposed Pages staging build.

```sh
SITE_URL='https://<preview-name>-sabiforge.<account>.workers.dev' npm run build:preview
```

`scripts/build-preview.mjs` forces `SITE_ENV=preview`, runs the existing `npm run build`
(`astro check && astro build`), writes `dist/_headers` with `X-Robots-Tag: noindex, nofollow`, and
runs `npm run verify:sitemap` and `npm run verify:preview-output`.

`SITE_URL` must be the exact `https://<name>.<account>.workers.dev` origin Cloudflare will serve.
The left-most label must be `sabiforge` or end in `-sabiforge`. The production origin, `pages.dev`,
and any other host fail the build. CI uses the fixture
`https://codex-sabiforge.preview.workers.dev` only to prove that guard. Replace it with the real
Preview URL before uploading.

Local asset serving, which does not upload anything:

```sh
npx wrangler dev
```

## What stays noindex

`SITE_ENV=preview` is not production, so every page emits `noindex,nofollow` and `robots.txt`
disallows all crawlers. The preview output check also rejects any HTML, robots, or sitemap file
that contains `https://sabiforge-digital.vercel.app`. Production CI still builds with that exact
origin and is unchanged.

`dist/_headers` is written only by the preview build. It is not in `public/`, so the Vercel
production build does not gain a Cloudflare header rule.

## Upload sequence

The owner approved a preview upload on 17 November 2026. It was run with the pinned Wrangler
`preview` command, not `wrangler deploy`.

Checked after the second upload, which used
`SITE_URL=https://codex-cloudflare-preview-readiness-sabiforge.krdev.workers.dev`:

- `/` returns 200, `noindex,nofollow`, and canonical and Open Graph URLs on that origin.
- A browser navigation to an unknown path returns 404 and the site's "Page not found" page.
- `robots.txt` disallows every crawler. The production Vercel origin is absent.
- `https://sabiforge.krdev.workers.dev/` returns 404, so this upload did not publish the production
  workers.dev hostname.

Rollback: delete the Preview `codex/cloudflare-preview-readiness` in the Cloudflare dashboard, or
run `npx wrangler preview delete --name codex/cloudflare-preview-readiness`. Do not promote it to
production.

## Account-consolidation release gate

1. On the old `kr-dev` account, disable legacy SabiForge GitHub build triggers and public preview
   URLs. Do not delete other projects, credentials, or account resources.
2. On the authoritative `kellyray-dev` account, complete Zero Trust onboarding and establish
   Cloudflare Access for owner-only Worker previews. Do not re-enable preview URLs until policy
   enforcement has been verified.
3. Configure the real branch-preview `SITE_URL` on the new account, retain
   `npm run build:preview`, and verify canonical and Open Graph URLs match the returned host.
4. Require an anonymous request to be denied or redirected to Access before releasing review links.
5. Keep PR #8 and PR #9 in draft; do not change the public Vercel origin or promote a Cloudflare
   production deployment before separate release approval.

## Remaining blockers

- Preview URLs are public by default. Access, reviewer list, and a protected GitHub environment
  are still owner decisions.
- `workers_dev: false` keeps a production hostname out of the config. A dashboard route or custom
  domain already attached to `sabiforge` can still receive a production deploy. Do not deploy.
- Decision: use the existing `sabiforge` Worker in `kellyray-dev` as SabiForge's sole Cloudflare project. The older Pages staging proposal is deferred; do not create a Pages staging project without separate approval.
- Paid Cloudflare products stay off. No observability, logpush, or other billable bindings are
  configured.
