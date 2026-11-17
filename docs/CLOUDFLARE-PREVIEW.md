# Cloudflare Workers preview plan

Status: **prepared, not deployed.** No Worker version, preview, DNS record, custom domain, or paid
product has been created from this branch.

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

## Upload sequence (do not run until the owner approves)

1. Confirm the authenticated Cloudflare account owns the existing `sabiforge` Worker and that this
   upload will not change its production version, routes, or custom domains.
2. Build with the real Preview `SITE_URL` and require `npm run verify:preview-output` to pass.
3. Upload with the pinned local CLI: `npx wrangler preview`. Do not run `wrangler deploy`.
4. Open the returned Preview URL and the unique deployment URL while logged out. Both must require
   whatever access control the owner chooses. `noindex` is not access control. Preview URLs are
   public unless Access or an equivalent control is added.
5. Confirm `/` is 200, an unknown path is 404 and shows the site 404 page, canonical and Open Graph
   URLs use the preview origin, and the production origin is absent.
6. Rollback by deleting or rolling back that Preview in the Cloudflare dashboard. Do not promote it
   to production.

## Remaining blockers

- The real `*.workers.dev` account subdomain is assigned by Cloudflare and is not in this
  repository. The first upload has to use that hostname as `SITE_URL`.
- Preview URLs are public by default. Access, reviewer list, and a protected GitHub environment
  are still owner decisions.
- `workers_dev: false` keeps a production hostname out of the config. A dashboard route or custom
  domain already attached to `sabiforge` can still receive a production deploy. Do not deploy.
- This does not decide between Workers and the earlier Cloudflare Pages staging proposal.
- Paid Cloudflare products stay off. No observability, logpush, or other billable bindings are
  configured.
