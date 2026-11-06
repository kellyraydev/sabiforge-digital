import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const siteUrl = new URL(process.env.SITE_URL);
const dist = resolve('dist');
const index = await readFile(resolve(dist, 'sitemap-index.xml'), 'utf8');
const sitemapFiles = [...index.matchAll(/<loc>(.*?)<\/loc>/g)].map(([, url]) => new URL(url));
assert.ok(sitemapFiles.length > 0, 'sitemap index must reference at least one sitemap');

const xmlFiles = await Promise.all(
  sitemapFiles.map(async (url) => {
    assert.equal(url.origin, siteUrl.origin, `sitemap URL must use SITE_URL: ${url}`);
    return readFile(resolve(dist, url.pathname.slice(1)), 'utf8');
  }),
);
const urls = xmlFiles.flatMap((xml) =>
  [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(([, url]) => new URL(url)),
);
assert.ok(urls.length > 0, 'generated sitemap XML must contain URLs');
for (const url of urls) {
  assert.equal(url.origin, siteUrl.origin, `sitemap page must use SITE_URL: ${url}`);
  assert.doesNotMatch(url.pathname, /^\/hero-lab(?:\/|$)/i, 'hero lab routes must not be listed');
  assert.doesNotMatch(
    url.pathname,
    /^\/(?:privacy|terms)\/?$/i,
    'draft legal routes must not be listed',
  );
  assert.doesNotMatch(
    url.pathname,
    /^\/(?:404|500|error|errors)(?:\/|$)/i,
    'error routes must not be listed',
  );
}
console.log(
  `Verified ${urls.length} generated sitemap URLs from ${sitemapFiles.length} XML file(s).`,
);
