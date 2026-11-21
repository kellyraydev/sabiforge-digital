import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const publicServiceSlugs = new Set([
  'custom-website-design-development',
  'shopify-ecommerce-development',
  'website-redesign-modernization',
  'website-care-maintenance',
]);
const pendingServiceSlugs = [
  'brand-identity-creative-direction',
  'website-strategy-ux-ui-design',
  'design-systems',
  'conversion-experience-optimization',
  'performance-accessibility-technical-seo',
  'digital-integrations-workflows',
];

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
  const serviceRoute = url.pathname.match(/^\/services\/([^/]+)\/?$/)?.[1];
  if (serviceRoute) {
    assert.ok(
      publicServiceSlugs.has(serviceRoute),
      `only approved service routes may be listed: ${url}`,
    );
  }
  for (const slug of pendingServiceSlugs) {
    assert.ok(!url.pathname.includes(slug), `pending service route must not be listed: ${url}`);
  }
}
const listedServiceRoutes = urls.filter((url) => /^\/services\/[^/]+\/?$/.test(url.pathname));
assert.equal(
  listedServiceRoutes.length,
  publicServiceSlugs.size,
  'sitemap must contain all four approved service pages',
);
for (const slug of publicServiceSlugs) {
  assert.ok(
    listedServiceRoutes.some((url) => url.pathname.includes(`/services/${slug}`)),
    `approved service must be in sitemap: ${slug}`,
  );
}
console.log(
  `Verified ${urls.length} generated sitemap URLs from ${sitemapFiles.length} XML file(s).`,
);
