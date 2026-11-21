import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';

const configImport = "import('./astro.config.mjs')";
function check(environment, url, expectedSuccess) {
  const result = spawnSync(process.execPath, ['--input-type=module', '-e', configImport], {
    env: { ...process.env, SITE_ENV: environment, SITE_URL: url },
    encoding: 'utf8',
  });
  assert.equal(
    result.status === 0,
    expectedSuccess,
    `${environment} with ${url}: ${result.stderr || result.stdout}`,
  );
}

check('production', 'https://sabiforge-digital.vercel.app', true);
for (const badUrl of [
  'http://localhost:4321',
  'https://sabiforge.digital',
  'https://preview.sabiforge.digital',
  'https://sabiforge-digital-staging.pages.dev',
  'https://sabiforge.vercel.app',
  'https://10.0.0.7',
  'https://sabiforge-digital.vercel.app:8443',
  'https://sabiforge-digital.vercel.app/private-path',
  'https://other-public-host.example',
]) {
  check('production', badUrl, false);
}
check('staging', 'https://sabiforge-digital-staging.pages.dev', true);
check('staging', 'http://staging.sabiforge.digital', false);
check('preview', 'https://codex-sabiforge.preview.workers.dev', true);
check('preview', 'https://sabiforge.account.workers.dev', true);
for (const badPreviewUrl of [
  'https://sabiforge-digital.vercel.app',
  'https://sabiforge.digital',
  'https://sabiforge-digital-staging.pages.dev',
  'https://example.workers.dev',
  'https://not-the-worker.preview.workers.dev',
  'http://codex-sabiforge.preview.workers.dev',
]) {
  check('preview', badPreviewUrl, false);
}
check('production', 'https://sabiforge.account.workers.dev', false);
console.log('Production, staging and preview SITE_URL policy checks passed.');
