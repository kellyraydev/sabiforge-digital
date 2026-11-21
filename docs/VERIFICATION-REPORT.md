# Delivery verification report

Reviewed 9 November 2026 on `codex/targeted-remediation`.

## Scope and working-tree review

- The working tree was clean before this report was added. No source changes or untracked files
  were present.
- `codex/targeted-remediation` and `origin/main` both pointed to `ba002b8db9dc21117e652053c8eaf26a976cca08`
  (`ba002b8`). The remediation code is already present on `main`; a new pull request can only carry
  this delivery report.
- Existing Chromium screenshots were preserved. The repository contains 47 files in
  `docs/screenshots/regression-final/` plus the earlier home-acceptance, supporting-page and other
  QA captures. No screenshot was regenerated or overwritten for this delivery gate.

## Verification

| Check                              | Result                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Prettier                           | Pass (`npm run format:check`)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ESLint                             | Pass (`npm run lint`)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| Vitest                             | Pass: 36/36 tests                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| Astro check/build                  | Pass: 23 pages; 0 errors, 0 warnings and 2 React `FormEvent` deprecation hints                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| SITE_URL policy                    | Pass for production and staging                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| Production sitemap                 | Pass: 18 URLs from generated XML                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| Staging metadata/output            | Pass: 23 HTML pages; canonical origins and staging crawler metadata verified                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| Chromium interaction and visual QA | Previously passed; screenshots and prior QA logs remain under `docs/screenshots/`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| GitHub Actions CI                  | Pass: both report-commit CI runs [42597998073](https://github.com/kellyraydev/sabiforge-digital/actions/runs/42597998073) and [42597974176](https://github.com/kellyraydev/sabiforge-digital/actions/runs/42597974176) succeeded. The existing code-head run [42576247355](https://github.com/kellyraydev/sabiforge-digital/actions/runs/42576247355) also passed.                                                                                                                                                                                                                                              |
| Firefox / WebKit                   | Attempted through authenticated staging CI: [Firefox run 42598036485](https://github.com/kellyraydev/sabiforge-digital/actions/runs/42598036485) and [WebKit run 42598040476](https://github.com/kellyraydev/sabiforge-digital/actions/runs/42598040476). Both stopped at the required environment guard after `npm ci`, before browser installation or site access: `STAGING_BASE_URL`, `CF_ACCESS_CLIENT_ID`, and `CF_ACCESS_CLIENT_SECRET` were empty. The `staging` environment lookup returned 404. No protected staging environment is configured; do not bypass this gate or send credentials elsewhere. |
| External preview/build checks      | Vercel status failed (linked to collaboration troubleshooting). Cloudflare Workers Builds for `sabiforge-digital-staging` also failed (Build ID `be1c5e71-3e67-4724-8942-ad3b5fec7b19`; no diagnostic detail was exposed in GitHub). No preview was verified. These checks were triggered automatically by the branch push; no deployment command was run.                                                                                                                                                                                                                                                      |

Earlier Chromium evidence is recorded in [home-acceptance QA results](screenshots/home-acceptance/QA-RESULTS.md),
[supporting-page QA results](screenshots/supporting-pages/QA-RESULTS.md), and the screenshot collections
under [regression-final](screenshots/regression-final/). These are preserved artifacts, not newly
rerun Chromium tests.

## Development dependency advisories

`npm audit` reported 11 moderate development dependency advisories and no high or critical findings.
Affected package nodes are `@eslint/config-array`, `@eslint/js`, `@typescript-eslint/eslint-plugin`,
`@typescript-eslint/parser`, `@typescript-eslint/type-utils`,
`@typescript-eslint/typescript-estree`, `@typescript-eslint/utils`, `eslint`, `eslint-plugin-astro`,
`minimatch`, and `typescript-eslint`. The underlying advisory is
[GHSA-g3hv-75wg-m249](https://github.com/advisories/GHSA-g3hv-75wg-m249) for minimatch denial of
service through globparts amplification.

No dependency versions or lockfile entries were changed. npm's proposed automatic fixes cross
declared major-version boundaries (including its suggested ESLint 9 and Astro ESLint plugin 1.x
versions). Applying those changes during a delivery-only gate could alter the flat ESLint config,
plugin compatibility and lint coverage. Keep this as a separate, reviewed dependency-remediation
change with its own compatibility checks; do not use `npm audit fix --force` as part of this PR.

## Delivery state

- Verified code head: `ba002b8db9dc21117e652053c8eaf26a976cca08`. The report's final commit is the
  head of the draft PR.
- Draft PR: [#3](https://github.com/kellyraydev/sabiforge-digital/pull/3). Since the remote already
  has the code head on `main`, this PR contains the verification report only.
- Merge acceptance: local and GitHub repository CI pass, but the branch does **not** meet the
  requested merge acceptance criteria while Firefox and WebKit remain unverified and the Vercel and
  Cloudflare build checks are failing. The report can be reviewed; do not treat it as approval to
  merge, deploy or change production.
