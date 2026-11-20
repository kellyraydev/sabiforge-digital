# Gate 5 remediation record

Date: 12 November 2026

Scope: Production SEO policy, approved services, homepage concepts, project enquiry selector,
accessibility checks, and deployment documentation.

## Pending service URL history

Before this change, `src/pages/services/[slug].astro` generated routes from all ten service
definitions, including the six marked `pending`. The repository contains historical screenshots
of those service pages under `docs/screenshots/regression-final/` and
`docs/screenshots/supporting-pages/`. Read-only requests to the public Vercel deployment returned
HTTP 200 for all six pending-service paths on 12 November 2026:

- `/services/brand-identity-creative-direction`
- `/services/website-strategy-ux-ui-design`
- `/services/design-systems`
- `/services/conversion-experience-optimization`
- `/services/performance-accessibility-technical-seo`
- `/services/digital-integrations-workflows`

Search Console, external inbound links, and current indexing records were not available during this
implementation. The historical crawl/index state is therefore unresolved. The six pending routes
are no longer generated, and this change introduces no redirects, as required. Until separate
approval and URL-history review, requests to those paths will use the host's not-found behavior.

## Hosting boundary

The production origin policy and CI output checks target
`https://sabiforge-digital.vercel.app`. This repository change does not inspect or change Vercel or
Cloudflare account settings, DNS, or deployments. The currently served deployment may continue to
reflect an earlier build until a separately approved release is made.

## Follow-up checked 20 November 2026

Live HTML on `https://sabiforge-digital.vercel.app` still matched `d83ef02` / `61b730e`: the
homepage heading was “Four approved ways to move forward”, and
`/services/website-care-maintenance/` rendered an empty related-services list. `f24e60c` already
contained those corrections, and also changed terms, package, FAQ and pricing wording plus service
numbering. Those extra edits are not part of this remediation.

This branch keeps the production indexing policy. Public pages stay indexable. Privacy, terms,
hero-lab and the error page stay `noindex`. No prices, legal text, contact path, analytics,
security headers, DNS or hosting configuration were changed. Deployment still requires a separate
owner approval.
