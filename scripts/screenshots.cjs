/**
 * Browser QA: captures desktop / tablet / mobile screenshots and checks for
 * horizontal overflow, console errors, broken in-page anchors and the mobile
 * menu. Usage: BASE_URL=http://localhost:4321 node scripts/screenshots.cjs
 * Uses the system Playwright install (require('playwright')).
 */
const { chromium, devices } = require('playwright');
const fs = require('node:fs');
const path = require('node:path');

const BASE_URL = process.env.BASE_URL ?? 'http://localhost:4321';
const OUT = process.env.OUT_DIR ?? path.join(__dirname, '..', 'screenshots');
const SCALE = Number(process.env.SCALE ?? 1);

const viewports = [
  {
    name: 'desktop',
    options: { viewport: { width: 1440, height: 900 }, deviceScaleFactor: SCALE },
  },
  { name: 'tablet', options: { viewport: { width: 820, height: 1180 }, deviceScaleFactor: SCALE } },
  { name: 'mobile', options: { ...devices['iPhone 13'] } },
];

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch();
  const problems = [];

  for (const { name, options } of viewports) {
    const context = await browser.newContext(options);
    const page = await context.newPage();
    const errors = [];
    page.on('console', (msg) => msg.type() === 'error' && errors.push(msg.text()));
    page.on('pageerror', (err) => errors.push(err.message));

    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    // Scroll through so client:visible islands hydrate before capture.
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 600) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 60));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(500);

    const overflow = await page.evaluate(() => {
      const width = document.documentElement.clientWidth;
      return [...document.querySelectorAll('body *')]
        .filter((el) => {
          const r = el.getBoundingClientRect();
          return (
            r.width > 0 &&
            (r.right > width + 1 || r.left < -1) &&
            !el.closest('[aria-hidden="true"]')
          );
        })
        .slice(0, 5)
        .map((el) => `${el.tagName.toLowerCase()}.${String(el.className).slice(0, 60)}`);
    });
    if (overflow.length)
      problems.push(`[${name}] elements overflow viewport: ${overflow.join(' | ')}`);

    const missingAnchors = await page.evaluate(() =>
      [...document.querySelectorAll('a[href^="/#"], a[href^="#"]')]
        .map((a) => a.getAttribute('href').replace(/^\/?#/, ''))
        .filter((id) => id && id !== 'main' && !document.getElementById(id)),
    );
    if (missingAnchors.length)
      problems.push(`[${name}] broken anchors: ${[...new Set(missingAnchors)].join(', ')}`);

    // Automated accessibility scan (WCAG 2.x A/AA rules) with axe-core.
    await page.addScriptTag({ path: require.resolve('axe-core/axe.min.js') });
    const violations = await page.evaluate(async () => {
      // eslint-disable-next-line no-undef
      const result = await axe.run(document, { runOnly: ['wcag2a', 'wcag2aa', 'wcag21aa'] });
      return result.violations.map(
        (v) => `${v.id} (${v.nodes.length}): ${v.nodes[0].target.join(' ')}`,
      );
    });
    if (violations.length) problems.push(`[${name}] axe: ${violations.join(' | ')}`);

    await page.screenshot({ path: path.join(OUT, `home-${name}-full.png`), fullPage: true });
    await page.screenshot({ path: path.join(OUT, `home-${name}-hero.png`) });

    if (name === 'mobile') {
      await page.getByRole('button', { name: 'Open menu' }).click();
      await page.waitForTimeout(300);
      await page.screenshot({ path: path.join(OUT, 'home-mobile-menu.png') });
      await page.keyboard.press('Escape');
      const closed = await page.locator('#mobile-menu').isHidden();
      if (!closed) problems.push('[mobile] menu did not close on Escape');
    }

    if (errors.length) problems.push(`[${name}] console errors: ${errors.join(' | ')}`);
    await context.close();
  }

  await browser.close();
  if (problems.length) {
    console.error('QA problems found:\n- ' + problems.join('\n- '));
    process.exitCode = 1;
  } else {
    console.log(`QA passed. Screenshots written to ${OUT}`);
  }
})();
