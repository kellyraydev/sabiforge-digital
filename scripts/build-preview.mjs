import { spawnSync } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';

const siteUrl = process.env.SITE_URL;
if (!siteUrl) {
  console.error(
    'Set SITE_URL to the Cloudflare preview origin before building (https://<name>-sabiforge.<account>.workers.dev).',
  );
  process.exit(1);
}

const build = spawnSync('npm', ['run', 'build'], {
  stdio: 'inherit',
  shell: true,
  env: { ...process.env, SITE_ENV: 'preview', SITE_URL: siteUrl },
});
if (build.status !== 0) process.exit(build.status ?? 1);

const sitemap = spawnSync('npm', ['run', 'verify:sitemap'], {
  stdio: 'inherit',
  shell: true,
  env: { ...process.env, SITE_ENV: 'preview', SITE_URL: siteUrl },
});
if (sitemap.status !== 0) process.exit(sitemap.status ?? 1);

mkdirSync('dist', { recursive: true });
writeFileSync('dist/_headers', '/*\n  X-Robots-Tag: noindex, nofollow\n', 'utf8');

const verify = spawnSync('node', ['scripts/check-preview-output.mjs'], {
  stdio: 'inherit',
  shell: true,
  env: { ...process.env, SITE_ENV: 'preview', SITE_URL: siteUrl },
});
process.exit(verify.status ?? 1);
