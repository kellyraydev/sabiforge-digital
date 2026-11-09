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

| Check                              | Result                                                                                                                                                                                                                                                                                                                          |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Prettier                           | Pass (`npm run format:check`)                                                                                                                                                                                                                                                                                                   |
| ESLint                             | Pass (`npm run lint`)                                                                                                                                                                                                                                                                                                           |
| Vitest                             | Pass: 36/36 tests                                                                                                                                                                                                                                                                                                               |
| Astro check/build                  | Pass: 23 pages; 0 errors, 0 warnings and 2 React `FormEvent` deprecation hints                                                                                                                                                                                                                                                  |
| SITE_URL policy                    | Pass for production and staging                                                                                                                                                                                                                                                                                                 |
| Production sitemap                 | Pass: 18 URLs from generated XML                                                                                                                                                                                                                                                                                                |
| Staging metadata/output            | Pass: 23 HTML pages; canonical origins and staging crawler metadata verified                                                                                                                                                                                                                                                    |
| Chromium interaction and visual QA | Previously passed; screenshots and prior QA logs remain under `docs/screenshots/`                                                                                                                                                                                                                                               |
| GitHub Actions CI                  | The current code head's existing `main` run passed: [run 42576247355](https://github.com/kellyraydev/sabiforge-digital/actions/runs/42576247355). A PR run for this report-only change is pending creation.                                                                                                                     |
| Firefox / WebKit                   | Not verified in this gate. The supported authenticated staging workflow needs the `staging` GitHub environment, `STAGING_BASE_URL`, and Cloudflare Access service-token secrets. The environment lookup returned 404, so no protected staging environment is configured. Do not bypass this gate or send credentials elsewhere. |

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

- Verified code head: `ba002b8db9dc21117e652053c8eaf26a976cca08`.
- Draft PR: pending creation; the remote already has this code head on `main`, so the PR will contain
  this report only.
- Merge acceptance: local checks and the existing Chromium gate pass, but the branch does **not**
  meet full cross-browser acceptance while Firefox and WebKit staging verification remain blocked.
  The report can be reviewed; do not treat it as approval to merge, deploy or change production.
