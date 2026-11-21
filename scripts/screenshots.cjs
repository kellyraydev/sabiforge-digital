/**
 * Browser QA across every route and seven viewport widths.
 * Checks: horizontal overflow, console/page errors, broken in-page anchors,
 * internal link status, axe-core WCAG 2.x A/AA rules, mobile menu behaviour.
 * Saves full-page screenshots for 390px and 1440px.
 *
 * Usage: BASE_URL=http://localhost:4321 node scripts/screenshots.cjs
 * Uses the system Playwright install (require('playwright')).
 */
const playwright = require('playwright');
const fs = require('node:fs');
const path = require('node:path');
const { configureStagingAuth, stagingAuthHeaders } = require('./staging-auth.cjs');

const BASE_URL = (process.env.BASE_URL ?? 'http://localhost:4321').replace(/\/$/, '');
const OUT = process.env.OUT_DIR ?? path.join(__dirname, '..', 'screenshots');
const SCALE = Number(process.env.SCALE ?? 1);
const WIDTHS = [375, 390, 430, 768, 1280, 1440, 1920];
const SHOT_WIDTHS = new Set([390, 1440]);
const BROWSER = process.env.BROWSER ?? 'chromium';
const browserType = playwright[BROWSER];
if (!browserType || !['chromium', 'firefox', 'webkit'].includes(BROWSER)) {
  throw new Error('BROWSER must be chromium, firefox or webkit');
}

async function discoverRoutes() {
  const res = await fetch(`${BASE_URL}/sitemap-0.xml`, { headers: stagingAuthHeaders() }).catch(
    () => null,
  );
  if (res?.ok) {
    const xml = await res.text();
    const routes = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
    if (routes.length) return routes;
  }
  return ['/', '/services', '/pricing', '/contact'];
}

// Noindex draft pages are deliberately kept out of the sitemap but must still be checked.
const EXTRA_ROUTES = ['/privacy', '/terms'];

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const routes = process.env.ROUTES
    ? process.env.ROUTES.split(',')
    : [...new Set([...(await discoverRoutes()), ...EXTRA_ROUTES])];
  routes.push('/404');
  const browser = await browser_launch();
  const problems = [];
  const linkStatus = new Map();
  let checks = 0;

  for (const route of routes) {
    for (const width of WIDTHS) {
      const context = await browser.newContext({
        viewport: { width, height: width < 768 ? 844 : 900 },
        deviceScaleFactor: SHOT_WIDTHS.has(width) ? SCALE : 1,
        isMobile: width < 768,
        hasTouch: width < 768,
      });
      await configureStagingAuth(context);
      const page = await context.newPage();
      const errors = [];
      page.on('console', (msg) => msg.type() === 'error' && errors.push(msg.text()));
      page.on('pageerror', (err) => errors.push(err.message));
      // Privacy claim: pages make no requests to any other origin.
      const external = [];
      page.on('request', (req) => {
        const u = req.url();
        if (!u.startsWith(BASE_URL) && !u.startsWith('data:') && !u.startsWith('blob:'))
          external.push(u);
      });
      const tag = `[${route} @${width}]`;

      await page.goto(BASE_URL + route, { waitUntil: 'networkidle' });
      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += 600) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 40));
        }
        window.scrollTo(0, 0);
      });
      await page.waitForTimeout(700);

      const overflow = await page.evaluate(() => {
        const w = document.documentElement.clientWidth;
        if (document.documentElement.scrollWidth > w + 1) {
          return [...document.querySelectorAll('body *')]
            .filter((el) => {
              const r = el.getBoundingClientRect();
              return r.width > 0 && r.right > w + 1 && !el.closest('[aria-hidden="true"]');
            })
            .slice(0, 4)
            .map((el) => `${el.tagName.toLowerCase()}.${String(el.className).slice(0, 50)}`);
        }
        return [];
      });
      if (overflow.length) problems.push(`${tag} horizontal overflow: ${overflow.join(' | ')}`);

      // Complete the intended reveal transitions before accessibility checks so
      // the contrast analyzer samples the rendered colors rather than opacity-zero text.
      await page.evaluate(() =>
        document.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('is-revealed')),
      );
      await page.addStyleTag({
        content: '*{content-visibility:visible!important;transition:none!important}',
      });
      await page.waitForTimeout(750);

      const { anchors, links } = await page.evaluate(() => {
        const hrefs = [...document.querySelectorAll('a[href]')].map((a) => a.getAttribute('href'));
        const anchors = hrefs
          .filter((h) => h.startsWith('#') && h.length > 1)
          .map((h) => h.slice(1))
          .filter((id) => !document.getElementById(id));
        const links = hrefs.filter((h) => h.startsWith('/'));
        const empty = hrefs.filter((h) => h === '' || h === '#');
        return { anchors: [...anchors, ...empty.map(() => '(empty href)')], links };
      });
      if (anchors.length)
        problems.push(`${tag} broken anchors: ${[...new Set(anchors)].join(', ')}`);
      for (const link of links) {
        const [p, hash] = link.split('#');
        const key = p || '/';
        if (!linkStatus.has(key)) {
          const r = await fetch(BASE_URL + key);
          linkStatus.set(key, { status: r.status, html: r.ok ? await r.text() : '' });
        }
        const { status, html } = linkStatus.get(key);
        if (status !== 200) problems.push(`${tag} link ${link} → ${status}`);
        else if (hash && !html.includes(`id="${hash}"`))
          problems.push(`${tag} link ${link} → missing #${hash}`);
      }

      await page.addScriptTag({ path: require.resolve('axe-core/axe.min.js') });
      const violations = await page.evaluate(async () => {
        // eslint-disable-next-line no-undef
        const result = await axe.run(document, {
          runOnly: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'],
        });
        return result.violations.map(
          (v) => `${v.id} (${v.nodes.length}): ${v.nodes[0].target.join(' ')}`,
        );
      });
      if (violations.length) problems.push(`${tag} axe: ${violations.join(' | ')}`);

      if (SHOT_WIDTHS.has(width)) {
        const name = `${route === '/' ? 'home' : route.slice(1).replace(/\//g, '_')}-${width}`;
        await page.evaluate(() =>
          document
            .querySelectorAll('[data-reveal]')
            .forEach((el) => el.classList.add('is-revealed')),
        );
        // Capture artefacts: let reveal transitions finish and render deferred sections.
        await page.addStyleTag({
          content:
            '*{content-visibility:visible!important}[data-reveal]{transition:none!important}',
        });
        await page.waitForTimeout(500);
        await page.screenshot({ path: path.join(OUT, `${name}.png`), fullPage: true });
      }

      if (width === 390 && route === '/') {
        await page.getByRole('button', { name: 'Menu' }).click();
        await page.waitForTimeout(400);
        await page.screenshot({ path: path.join(OUT, 'menu-390.png') });
        const focused = await page.evaluate(() => document.activeElement?.textContent?.trim());
        if (!focused?.includes('Home')) problems.push(`${tag} menu did not focus first link`);
        await page.keyboard.press('Escape');
        if (!(await page.locator('#mobile-menu').isHidden()))
          problems.push(`${tag} menu did not close on Escape`);
      }

      if (external.length)
        problems.push(`${tag} third-party requests: ${[...new Set(external)].join(', ')}`);
      if (errors.length) problems.push(`${tag} console errors: ${errors.join(' | ')}`);
      checks += 1;
      await context.close();
    }
  }

  await browser.close();
  console.log(`Checked ${routes.length} routes × ${WIDTHS.length} widths = ${checks} page loads.`);
  if (problems.length) {
    console.error(`QA problems found (${problems.length}):\n- ` + problems.join('\n- '));
    process.exitCode = 1;
  } else {
    console.log(`QA passed. Screenshots written to ${OUT}`);
  }
})();

function browser_launch() {
  const executablePath =
    process.env.PLAYWRIGHT_EXECUTABLE_PATH ??
    (BROWSER === 'chromium' ? process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH : undefined);
  return browserType.launch(executablePath ? { executablePath } : undefined);
}
