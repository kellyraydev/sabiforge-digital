import assert from 'node:assert/strict';
import { access, readdir, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const productionOrigin = 'https://sabiforge-digital.vercel.app';
const siteUrl = new URL(process.env.SITE_URL);
const labels = siteUrl.hostname.toLowerCase().split('.');
assert.equal(process.env.SITE_ENV, 'preview', 'preview output checks require SITE_ENV=preview');
assert.equal(labels.length, 4, 'preview host must be <name>.<account>.workers.dev');
assert.equal(labels[2], 'workers');
assert.equal(labels[3], 'dev');
assert.ok(
  labels[0] === 'sabiforge' || labels[0].endsWith('-sabiforge'),
  'preview host must name the sabiforge Worker',
);
assert.notEqual(siteUrl.origin, productionOrigin);

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

const dist = resolve('dist');
const files = await htmlFiles(dist);
assert.ok(files.length > 0, 'preview build must contain HTML pages');
await access(resolve(dist, 'index.html'));
await access(resolve(dist, '404.html'));
await access(resolve(dist, 'favicon.svg'));

const headers = await readFile(resolve(dist, '_headers'), 'utf8');
assert.match(headers, /X-Robots-Tag:\s*noindex,\s*nofollow/i);

for (const file of files) {
  const html = await readFile(file, 'utf8');
  assert.doesNotMatch(
    html,
    /sabiforge-digital\.vercel\.app/i,
    `${file} leaked the production origin`,
  );
  assert.match(
    html,
    /<meta\s+name="robots"\s+content="noindex,nofollow"\s*\/?>/i,
    `${file} must be noindex`,
  );
  const canonical = html.match(/<link\s+rel="canonical"\s+href="([^"]+)"/i)?.[1];
  assert.ok(canonical, `${file} must have a canonical URL`);
  assert.equal(
    new URL(canonical).origin,
    siteUrl.origin,
    `${file} canonical must use the preview origin`,
  );
  const ogUrl = html.match(/<meta\s+property="og:url"\s+content="([^"]+)"/i)?.[1];
  assert.equal(
    new URL(ogUrl).origin,
    siteUrl.origin,
    `${file} Open Graph URL must use the preview origin`,
  );
}

const robots = await readFile(resolve(dist, 'robots.txt'), 'utf8');
assert.match(robots, /User-agent:\s*\*\s*Disallow:\s*\//i);
assert.doesNotMatch(robots, /(^|\n)Allow:\s*\//);
assert.doesNotMatch(robots, /sabiforge-digital\.vercel\.app/i);

const sitemap = await readFile(resolve(dist, 'sitemap-index.xml'), 'utf8');
assert.doesNotMatch(sitemap, /sabiforge-digital\.vercel\.app/i);
assert.match(sitemap, new RegExp(siteUrl.host.replaceAll('.', '\\.')));

console.log(`Verified preview noindex metadata on ${files.length} HTML pages.`);
