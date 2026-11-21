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
const pendingSlugs = [
  'brand-identity-creative-direction',
  'website-strategy-ux-ui-design',
  'design-systems',
  'conversion-experience-optimization',
  'performance-accessibility-technical-seo',
  'digital-integrations-workflows',
];
assert.ok(files.length > 0, 'staging build must contain HTML pages');
for (const file of files) {
  const html = await readFile(file, 'utf8');
  for (const slug of pendingSlugs) {
    assert.ok(!html.includes(slug), `${file} must not link to pending service ${slug}`);
  }
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
  const structuredData = [
    ...html.matchAll(/<script\s+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi),
  ];
  assert.ok(structuredData.length > 0, `${file} must include organization structured data`);
  for (const [, source] of structuredData) {
    const data = JSON.parse(source);
    for (const item of Array.isArray(data) ? data : [data]) {
      if (item.url)
        assert.equal(
          new URL(item.url).origin,
          siteUrl.origin,
          `${file} structured-data url must use SITE_URL`,
        );
      if (item['@id']?.startsWith('http'))
        assert.equal(
          new URL(item['@id']).origin,
          siteUrl.origin,
          `${file} structured-data @id must use SITE_URL`,
        );
      if (item.provider?.url)
        assert.equal(
          new URL(item.provider.url).origin,
          siteUrl.origin,
          `${file} provider url must use SITE_URL`,
        );
    }
  }
}
const robots = await readFile(resolve('dist/robots.txt'), 'utf8');
assert.match(robots, /User-agent:\s*\*\s*Disallow:\s*\//i, 'robots.txt must disallow crawlers');
console.log(`Verified staging metadata and canonical origins on ${files.length} HTML pages.`);
