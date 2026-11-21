import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const read = (path: string) => readFileSync(path, 'utf8');

const productionOrigin = 'https://sabiforge-digital.vercel.app';
const stagingOrigin = 'https://sabiforge-digital-staging.pages.dev';

describe('production origin and staging isolation', () => {
  it('allows only the approved Vercel origin for production', () => {
    const config = read('astro.config.mjs');
    const policy = read('scripts/check-site-url-policy.mjs');
    const ci = read('.github/workflows/ci.yml');

    expect(config).toContain(`const configuredProductionOrigin = '${productionOrigin}'`);
    expect(policy).toContain(`check('production', '${productionOrigin}', true)`);
    expect(policy).toContain("'https://sabiforge.digital'");
    expect(ci).toContain(`SITE_URL: ${productionOrigin}`);
    expect(ci).not.toContain('SITE_URL: https://sabiforge.digital');
  });

  it('keeps staging noindex and blocks every crawler', () => {
    const robots = read('src/pages/robots.txt.ts');
    const stagingCheck = read('scripts/check-staging-output.mjs');
    const ci = read('.github/workflows/ci.yml');

    expect(robots).toContain("siteEnvironment === 'production'");
    expect(robots).toContain('Allow: /');
    expect(robots).toContain('Disallow: /');
    expect(stagingCheck).toContain('noindex,nofollow');
    expect(stagingCheck).toContain('Disallow:');
    expect(ci).toContain(`SITE_URL: ${stagingOrigin}`);
    expect(ci).toContain('npm run verify:staging-output');
  });
});
