import { defineConfig } from 'cf/config';

// Staging-only Workers static assets deployment for the prebuilt Astro output in ./dist.
// Deploy with `cf deploy ./dist` after `SITE_ENV=staging SITE_URL=<origin> npm run build`.
// Production hosting is a separate, gated decision (see AGENTS.md section 7).
export default defineConfig({
  worker: {
    name: 'sabiforges-staging',
    compatibilityDate: '2026-11-24',
    assets: {
      htmlHandling: 'auto-trailing-slash',
      notFoundHandling: '404-page',
    },
  },
});
