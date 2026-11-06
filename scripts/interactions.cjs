/**
 * Interaction smoke test for the homepage islands.
 * Usage: BASE_URL=http://localhost:4321 node scripts/interactions.cjs
 */
const { chromium } = require('playwright');
const assert = require('node:assert/strict');

const BASE_URL = process.env.BASE_URL ?? 'http://localhost:4321';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto(BASE_URL, { waitUntil: 'networkidle' });

  // Pricing toggle
  const pricing = page.locator('#pricing');
  await pricing.scrollIntoViewIfNeeded();
  await pricing.locator('astro-island:not([ssr])').waitFor(); // client:visible hydration
  assert.ok(await pricing.getByText('₦108,000').isVisible(), 'founding price shown by default');
  await pricing.getByRole('group').getByText('Standard price').click();
  assert.equal(
    await pricing.getByText('₦108,000').count(),
    0,
    'founding price hidden in standard mode',
  );
  assert.ok(await pricing.getByText('₦120,000').isVisible(), 'standard price shown');
  console.log('✓ pricing toggle switches between founding and standard prices');

  // Process tabs (click + keyboard)
  const process = page.locator('#process');
  await process.scrollIntoViewIfNeeded();
  await process.locator('astro-island:not([ssr])').waitFor();
  await process.getByRole('tab', { name: /Design/ }).click();
  assert.match(await process.getByRole('tabpanel').innerText(), /Design:/);
  await page.keyboard.press('ArrowRight');
  assert.match(await process.getByRole('tabpanel').innerText(), /Build:/);
  await page.keyboard.press('End');
  assert.match(await process.getByRole('tabpanel').innerText(), /Support:/);
  console.log('✓ process tabs respond to click, ArrowRight and End');

  // Contact links
  const hrefs = await page.$$eval('a[href]', (as) => as.map((a) => a.getAttribute('href')));
  assert.ok(
    hrefs.some((h) => h.startsWith('https://wa.me/2349038430068')),
    'WhatsApp link present',
  );
  assert.ok(hrefs.includes('tel:+2349038430068'), 'tel link present');
  assert.ok(
    hrefs.some((h) => h.startsWith('mailto:kellyray.dev@gmail.com')),
    'mailto link present',
  );
  assert.ok(!hrefs.some((h) => h === '#' || h === ''), 'no empty links');
  console.log(`✓ ${hrefs.length} links checked (WhatsApp, tel, mailto present; no empty hrefs)`);

  // 404 page
  const res = await page.goto(`${BASE_URL}/does-not-exist`);
  assert.equal(res.status(), 404);
  console.log('✓ unknown routes return the 404 page');

  await browser.close();
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
