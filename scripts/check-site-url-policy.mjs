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

check('production', 'https://sabiforge.digital', true);
for (const badUrl of [
  'http://localhost:4321',
  'https://preview.sabiforge.digital',
  'https://sabiforge-staging.pages.dev',
  'https://sabiforge.vercel.app',
  'https://10.0.0.7',
  'https://sabiforge.digital:8443',
  'https://sabiforge.digital/private-path',
  'https://preview.sabiforge.digital',
  'https://other-public-host.example',
]) {
  check('production', badUrl, false);
}
check('staging', 'https://sabiforge-digital-staging.pages.dev', true);
check('staging', 'http://staging.sabiforge.digital', false);
console.log('Production and staging SITE_URL policy checks passed.');
