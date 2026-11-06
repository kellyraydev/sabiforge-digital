import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const siteUrl = new URL(process.env.SITE_URL);
async function htmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const path = resolve(directory, entry.name);
      return entry.isDirectory() ? htmlFiles(path) : entry.name.endsWith('.html') ? [path] : [];
    }),
  );
  return files.flat();
}

const files = await htmlFiles(resolve('dist'));
assert.ok(files.length > 0, 'staging build must contain HTML pages');
for (const file of files) {
  const html = await readFile(file, 'utf8');
  assert.match(
    html,
    /<meta\s+name="robots"\s+content="noindex,nofollow"\s*\/?>/i,
    `${file} must be noindex`,
  );
  const canonical = html.match(/<link\s+rel="canonical"\s+href="([^"]+)"/i)?.[1];
  assert.ok(canonical, `${file} must have a canonical URL`);
  assert.equal(new URL(canonical).origin, siteUrl.origin, `${file} canonical must use SITE_URL`);
  const ogUrl = html.match(/<meta\s+property="og:url"\s+content="([^"]+)"/i)?.[1];
  assert.ok(ogUrl, `${file} must have an Open Graph URL`);
  assert.equal(new URL(ogUrl).origin, siteUrl.origin, `${file} Open Graph URL must use SITE_URL`);
}
const robots = await readFile(resolve('dist/robots.txt'), 'utf8');
assert.match(robots, /User-agent:\s*\*\s*Disallow:\s*\//i, 'robots.txt must disallow crawlers');
console.log(`Verified staging metadata and canonical origins on ${files.length} HTML pages.`);
