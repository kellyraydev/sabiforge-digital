/**
 * Keyboard and interaction smoke tests for every interactive component.
 * Usage: BASE_URL=http://localhost:4321 node scripts/interactions.cjs
 */
const { chromium } = require('playwright');
const assert = require('node:assert/strict');

const BASE_URL = (process.env.BASE_URL ?? 'http://localhost:4321').replace(/\/$/, '');
const pass = (msg) => console.log(`✓ ${msg}`);

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

  // Hero capability selector
  await page.goto(BASE_URL + '/', { waitUntil: 'networkidle' });
  const commerce = page.getByRole('button', { name: 'Commerce', exact: true });
  await commerce.click();
  assert.equal(await commerce.getAttribute('aria-pressed'), 'true');
  assert.equal(await page.locator('.hero-stage').getAttribute('data-active'), 'commerce');
  assert.match(await page.locator('[data-caption]').innerText(), /Kòrà Home/);
  pass('hero capability selector updates plate, pressed state and caption');

  // Pathway selector (radio group, arrow keys)
  const pathway = page.getByRole('radiogroup');
  await pathway.scrollIntoViewIfNeeded();
  await page.locator('#services astro-island:not([ssr])').waitFor();
  await pathway.getByRole('radio').first().focus();
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('ArrowDown');
  assert.equal(
    await pathway.getByRole('radio', { checked: true }).innerText(),
    'Our current website needs a redesign',
  );
  assert.ok(
    await page
      .getByRole('link', { name: 'Website Redesign & Digital Modernization' })
      .first()
      .isVisible(),
  );
  pass('pathway selector moves with arrow keys and shows matching services');

  // Approach tabs
  const approach = page.locator('#approach');
  await approach.scrollIntoViewIfNeeded();
  await approach.locator('astro-island:not([ssr])').waitFor();
  await approach.getByRole('tab', { name: /Define/ }).click();
  assert.match(await approach.getByRole('tabpanel').innerText(), /Define/);
  await page.keyboard.press('ArrowDown');
  assert.match(await approach.getByRole('tabpanel').innerText(), /Design/);
  await page.keyboard.press('End');
  assert.match(await approach.getByRole('tabpanel').innerText(), /Launch & Support/);
  pass('approach tabs respond to click, ArrowDown and End');

  // Concept design notes disclosure
  const notes = page.locator('#work details').first();
  await notes.locator('summary').click();
  assert.equal(await notes.evaluate((d) => d.open), true);
  pass('concept design notes expand');

  // Pricing toggle
  await page.goto(BASE_URL + '/pricing', { waitUntil: 'networkidle' });
  await page.locator('astro-island:not([ssr])').first().waitFor();
  const cards = page.locator('section[aria-labelledby="packages-title"]');
  assert.ok(await cards.getByText('₦120,000').first().isVisible(), 'standard price default');
  assert.equal(await cards.getByText('₦108,000').count(), 0);
  await page.getByText('Founding rate', { exact: false }).first().click();
  assert.ok(await cards.getByText('₦108,000').isVisible());
  assert.ok(await cards.getByText('Not part of the founding offer').isVisible());
  pass('pricing defaults to standard prices; founding toggle shows eligible discounts only');

  // FAQ
  const faq = page.locator('details', { hasText: 'Are these prices fixed?' });
  await faq.locator('summary').click();
  assert.equal(await faq.evaluate((d) => d.open), true);
  pass('pricing FAQ expands');

  // Contact form: validation, focus, preselect, conditional fields, review
  await page.goto(BASE_URL + '/contact?service=shopify-ecommerce-development', {
    waitUntil: 'networkidle',
  });
  await page.locator('form').waitFor();
  await page.waitForTimeout(300);
  assert.equal(
    await page.getByLabel('Service you’re interested in').inputValue(),
    'shopify-ecommerce-development',
  );
  assert.ok(await page.getByLabel('Where do you sell today?').isVisible(), 'commerce field shown');
  pass('contact form preselects service from URL and shows commerce field');

  await page.getByRole('button', { name: /Review my brief/ }).click();
  const alert = page.getByRole('alert');
  assert.ok(await alert.isVisible());
  assert.match(await alert.innerText(), /4 fields/);
  assert.equal(await page.evaluate(() => document.activeElement?.getAttribute('role')), 'alert');
  assert.equal(await page.getByLabel(/Your name/).getAttribute('aria-invalid'), 'true');
  pass('empty submit shows error summary, focuses it and marks invalid fields');

  await page.getByRole('radio', { name: 'Yes' }).check({ force: true });
  assert.ok(await page.getByLabel('Current website address').isVisible());
  await page.getByLabel(/Your name/).fill('Ada Obi');
  await page.getByLabel(/^Email/).fill('ada@example.com');
  await page.getByLabel('Current website address').fill('adaandco.ng');
  await page
    .getByLabel(/What would you like to achieve/)
    .fill('A store for our hand-made bags, with delivery across Lagos.');
  await page.getByRole('checkbox').check();
  await page.getByRole('button', { name: /Review my brief/ }).click();
  const heading = page.getByRole('heading', { name: /Thanks, Ada/ });
  assert.ok(await heading.isVisible());
  const mail = await page.getByRole('link', { name: 'Send by email' }).getAttribute('href');
  const wa = await page.getByRole('link', { name: /Send on WhatsApp/ }).getAttribute('href');
  assert.ok(mail.startsWith('mailto:kellyray.dev@gmail.com?subject='));
  assert.ok(decodeURIComponent(mail).includes('Name: Ada Obi'));
  assert.ok(wa.startsWith('https://wa.me/2349038430068?text='));
  pass('valid brief reaches review step with working email and WhatsApp hand-off links');

  await page.getByRole('button', { name: 'Edit details' }).click();
  assert.equal(await page.getByLabel(/Your name/).inputValue(), 'Ada Obi');
  pass('edit returns to the form with details kept');

  // Header current state and keyboard skip link
  assert.equal(
    await page.locator('nav[aria-label="Primary"] a[aria-current="page"]').innerText(),
    'Contact',
  );
  await page.goto(BASE_URL + '/services', { waitUntil: 'networkidle' });
  await page.keyboard.press('Tab');
  assert.equal(
    await page.evaluate(() => document.activeElement?.textContent?.trim()),
    'Skip to content',
  );
  pass('skip link is first in tab order; nav marks the current page');

  // Mobile menu focus cycling
  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true });
  await mobile.goto(BASE_URL + '/', { waitUntil: 'networkidle' });
  await mobile.evaluate(() => window.scrollTo(0, 3000));
  await mobile.waitForTimeout(300);
  assert.equal(await mobile.locator('#site-header').getAttribute('data-hidden'), 'true');
  await mobile.mouse.wheel(0, -200);
  await mobile.waitForTimeout(400);
  assert.equal(await mobile.locator('#site-header').getAttribute('data-hidden'), 'false');
  pass('smart header hides on scroll down and returns on scroll up');
  await mobile.getByRole('button', { name: 'Menu' }).click();
  await mobile.waitForTimeout(200);
  const close = mobile.getByRole('button', { name: 'Close' });
  const box = await close.boundingBox();
  const topEl = await mobile.evaluate(
    ({ x, y }) => document.elementFromPoint(x, y)?.closest('button')?.textContent?.trim(),
    { x: box.x + box.width / 2, y: box.y + box.height / 2 },
  );
  assert.equal(topEl, 'Close', 'close button is visible above the open menu');
  pass('open menu keeps the header and Close button visible, even after scrolling');
  for (let i = 0; i < 12; i++) await mobile.keyboard.press('Tab');
  const inside = await mobile.evaluate(
    () =>
      document.getElementById('mobile-menu')?.contains(document.activeElement) ||
      document.activeElement?.getAttribute('aria-controls') === 'mobile-menu',
  );
  assert.ok(inside, 'focus stays within menu');
  await mobile.keyboard.press('Escape');
  assert.ok(await mobile.locator('#mobile-menu').isHidden());
  pass('mobile menu keeps focus inside and closes on Escape');

  const res = await page.goto(`${BASE_URL}/does-not-exist`);
  assert.equal(res.status(), 404);
  pass('unknown routes return the 404 page');

  await browser.close();
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
