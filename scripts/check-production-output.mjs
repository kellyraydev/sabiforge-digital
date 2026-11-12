import assert from 'node:assert/strict';
import { access, readFile, readdir } from 'node:fs/promises';
import { dirname, extname, resolve, sep } from 'node:path';

const siteUrl = new URL('https://sabiforge-digital.vercel.app');
const dist = resolve('dist');
const pendingSlugs = [
  'brand-identity-creative-direction',
  'website-strategy-ux-ui-design',
  'design-systems',
  'conversion-experience-optimization',
  'performance-accessibility-technical-seo',
  'digital-integrations-workflows',
];
const pendingServiceNames = [
  'Brand Identity & Creative Direction',
  'Website Strategy & UX/UI Design',
  'Design Systems',
  'Conversion-Focused Experience Optimization',
  'Performance, Accessibility & Technical SEO',
  'Digital Integrations & Workflow Solutions',
];
const publicSlugs = [
  'custom-website-design-development',
  'shopify-ecommerce-development',
  'website-redesign-modernization',
  'website-care-maintenance',
];

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map((entry) => {
      const path = resolve(directory, entry.name);
      return entry.isDirectory() ? walk(path) : [path];
    }),
  );
  return nested.flat();
}

const files = await walk(dist);
const htmlFiles = files.filter((file) => file.endsWith('.html'));
assert.ok(htmlFiles.length > 0, 'production build must contain HTML pages');

function assertOrigin(value, context) {
  assert.ok(value, `${context} must exist`);
  assert.equal(new URL(value).origin, siteUrl.origin, `${context} must use the production origin`);
}

function checkStructuredData(html, file) {
  const blocks = [
    ...html.matchAll(/<script\s+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi),
  ];
  assert.ok(blocks.length > 0, `${file} must include organization structured data`);
  for (const [, source] of blocks) {
    const data = JSON.parse(source);
    const objects = Array.isArray(data) ? data : [data];
    for (const item of objects) {
      if (item.url) assertOrigin(item.url, `${file} structured-data url`);
      if (item['@id']?.startsWith('http')) assertOrigin(item['@id'], `${file} structured-data @id`);
      if (item.provider?.url)
        assertOrigin(item.provider.url, `${file} structured-data provider url`);
    }
  }
}

async function checkLocalReference(file, reference) {
  const pathname = decodeURIComponent(reference.split(/[?#]/)[0]);
  if (pathname === '/') return;
  const relative = pathname.startsWith('/')
    ? pathname.slice(1)
    : resolve(dirname(file), pathname).slice(dist.length + 1);
  const target = resolve(dist, relative);
  const candidates = extname(target)
    ? [target]
    : [target, resolve(target, 'index.html'), `${target}.html`];
  let exists = false;
  for (const candidate of candidates) {
    try {
      await access(candidate);
      exists = true;
      break;
    } catch {
      // Try the other static-host output forms.
    }
  }
  assert.ok(exists, `broken local reference in ${file}: ${reference}`);
}

for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  const relativeFile = file
    .slice(dist.length + 1)
    .split(sep)
    .join('/');
  const canonical = html.match(/<link\s+rel="canonical"\s+href="([^"]+)"/i)?.[1];
  assertOrigin(canonical, `${relativeFile} canonical`);
  const ogUrl = html.match(/<meta\s+property="og:url"\s+content="([^"]+)"/i)?.[1];
  assertOrigin(ogUrl, `${relativeFile} Open Graph URL`);
  assert.doesNotMatch(
    html,
    /https?:\/\/localhost(?=[:/])/i,
    `${relativeFile} must not contain localhost URLs`,
  );

  const intentionallyNoindex =
    /^(?:privacy|terms)\/index\.html$|^hero-lab\//.test(relativeFile) ||
    relativeFile === '404.html';
  if (!intentionallyNoindex) {
    assert.doesNotMatch(
      html,
      /<meta\s+name="robots"\s+content="noindex,nofollow"/i,
      `${relativeFile} must be indexable in production`,
    );
  }
  checkStructuredData(html, relativeFile);

  for (const slug of pendingSlugs) {
    assert.ok(!html.includes(slug), `${relativeFile} must not link to pending service ${slug}`);
  }
  const searchableHtml = html.replaceAll('&amp;', '&').toLowerCase();
  for (const name of pendingServiceNames) {
    assert.ok(
      !searchableHtml.includes(name.toLowerCase()),
      `${relativeFile} must not advertise pending service ${name}`,
    );
  }

  const attributes = [...html.matchAll(/\b(?:href|src)="([^"]+)"/gi)].map(([, value]) => value);
  for (const reference of attributes) {
    if (/^(?:https?:|mailto:|tel:|data:|javascript:|\/\/|#)/i.test(reference)) continue;
    await checkLocalReference(file, reference);
  }
}

for (const file of files.filter((path) => path.endsWith('.css'))) {
  const css = await readFile(file, 'utf8');
  for (const [, reference] of css.matchAll(/url\((?:"|')?([^"')]+)(?:"|')?\)/gi)) {
    if (/^(?:https?:|data:|#|\/\/)/i.test(reference)) continue;
    await checkLocalReference(file, reference);
  }
}

for (const slug of publicSlugs) {
  await access(resolve(dist, 'services', slug, 'index.html'));
}
for (const slug of pendingSlugs) {
  try {
    await access(resolve(dist, 'services', slug, 'index.html'));
    assert.fail(`pending service route must not be generated: ${slug}`);
  } catch (error) {
    if (error?.code !== 'ENOENT') throw error;
  }
}

const robots = await readFile(resolve(dist, 'robots.txt'), 'utf8');
assert.match(
  robots,
  /User-agent:\s*\*\s*Allow:\s*\//i,
  'production robots.txt must allow crawling',
);
assert.doesNotMatch(
  robots,
  /^Disallow:\s*\/$/im,
  'production robots.txt must not disallow the whole site',
);
assert.ok(
  robots.includes(`Sitemap: ${new URL('/sitemap-index.xml', siteUrl).href}`),
  'robots.txt must reference the production sitemap',
);

console.log(
  `Verified production SEO, structured data, local references and service visibility across ${htmlFiles.length} HTML pages.`,
);
