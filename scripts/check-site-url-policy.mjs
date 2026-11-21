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
  'https://sabiforge-digital.vercel.app.preview.example',
  'https://sabiforge-staging.pages.dev',
  'https://sabiforge.vercel.app',
  'https://10.0.0.7',
  'https://sabiforge-digital.vercel.app:8443',
  'https://sabiforge-digital.vercel.app/private-path',
  'https://preview.sabiforge.digital',
  'https://other-public-host.example',
]) {
  check('production', badUrl, false);
}
check('staging', 'https://sabiforge-digital-staging.pages.dev', true);
check('staging', 'http://staging.sabiforge.digital', false);

const buildEnv = { ...process.env };
delete buildEnv.SITE_ENV;
delete buildEnv.SITE_URL;
const implicitBuild = spawnSync(process.execPath, ['node_modules/astro/bin/astro.mjs', 'build'], {
  env: buildEnv,
  encoding: 'utf8',
});
assert.notEqual(implicitBuild.status, 0, 'Astro build without explicit site settings must fail');
assert.match(
  `${implicitBuild.stderr}\n${implicitBuild.stdout}`,
  /Astro builds require explicit SITE_ENV and SITE_URL values\./,
  'Astro build guard must explain the missing production/staging settings',
);
console.log('Production and staging SITE_URL policy checks passed.');
