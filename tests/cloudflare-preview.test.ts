import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const read = (path: string) => readFileSync(path, 'utf8');

const wrangler = JSON.parse(
  read('wrangler.jsonc')
    .replace(/^\s*\/\/.*$/gm, '')
    .replace(/,(\s*[}\]])/g, '$1'),
) as {
  name: string;
  account_id: string;
  compatibility_date: string;
  workers_dev: boolean;
  preview_urls: boolean;
  main?: string;
  route?: string;
  routes?: unknown[];
  assets: {
    directory: string;
    html_handling: string;
    not_found_handling: string;
    binding?: string;
    run_worker_first?: boolean | string[];
  };
  previews: Record<string, unknown>;
};

describe('Cloudflare Workers preview configuration', () => {
  it('serves the static Astro build from the sabiforge Worker without a production route', () => {
    expect(wrangler.name).toBe('sabiforge');
    expect(wrangler.account_id).toBe('8849002c70945027fdb2e4169da6802e');
    expect(wrangler.compatibility_date).toBe('2026-11-17');
    expect(wrangler.workers_dev).toBe(false);
    expect(wrangler.preview_urls).toBe(true);
    expect(wrangler.main).toBeUndefined();
    expect(wrangler.route).toBeUndefined();
    expect(wrangler.routes).toBeUndefined();
    expect(wrangler.assets).toEqual({
      directory: './dist',
      html_handling: 'auto-trailing-slash',
      not_found_handling: '404-page',
    });
    expect(wrangler.previews).toEqual({});
    expect(read('wrangler.jsonc')).not.toMatch(
      /vercel\.app|sabiforge\.digital|workers_dev"\s*:\s*true/,
    );
  });

  it('pins Wrangler at 4.135.0 or newer and does not deploy from CI', () => {
    const pkg = JSON.parse(read('package.json')) as {
      devDependencies: { wrangler: string };
      scripts: Record<string, string>;
    };
    const lock = JSON.parse(read('package-lock.json')) as {
      packages: { 'node_modules/wrangler': { version: string } };
    };
    const pinned = pkg.devDependencies.wrangler;
    expect(pinned.startsWith('^') || pinned.startsWith('~')).toBe(false);
    expect(lock.packages['node_modules/wrangler'].version).toBe(pinned);
    const [major, minor] = pinned.split('.').map(Number);
    expect(major).toBe(4);
    expect(minor).toBeGreaterThanOrEqual(135);
    expect(pkg.scripts['build:preview']).toBe('node scripts/build-preview.mjs');
    expect(pkg.scripts['verify:preview-output']).toBe('node scripts/check-preview-output.mjs');
    expect(pkg.scripts.build).toBe('astro check && astro build');

    const ci = read('.github/workflows/ci.yml');
    expect(ci).toContain('SITE_ENV: preview');
    expect(ci).toContain('node scripts/build-preview.mjs');
    expect(ci).toContain('SITE_URL: https://sabiforge-digital.vercel.app');
    expect(ci).toContain('npm run verify:staging-output');
    expect(ci).not.toMatch(/wrangler (deploy|preview|versions upload)/);
  });

  it('keeps preview builds noindex and off the production origin', () => {
    const config = read('astro.config.mjs');
    const policy = read('scripts/check-site-url-policy.mjs');
    const previewCheck = read('scripts/check-preview-output.mjs');
    const layout = read('src/layouts/BaseLayout.astro');
    const robots = read('src/pages/robots.txt.ts');

    expect(config).toContain("'preview'");
    expect(config).toContain('Preview SITE_URL must name the sabiforge Worker');
    expect(config).toContain(
      "const configuredProductionOrigin = 'https://sabiforge-digital.vercel.app'",
    );
    expect(policy).toMatch(/badPreviewUrl[\s\S]*https:\/\/sabiforge-digital\.vercel\.app/);
    expect(policy).toContain(
      "check('preview', 'https://codex-sabiforge.preview.workers.dev', true)",
    );
    expect(previewCheck).toContain('noindex,nofollow');
    expect(previewCheck).toContain('sabiforge-digital.vercel.app');
    expect(layout).toContain("siteEnvironment === 'production' && !noindex");
    expect(robots).toContain("siteEnvironment === 'production'");
  });
});
