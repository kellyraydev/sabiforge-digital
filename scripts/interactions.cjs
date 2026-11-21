/**
 * Keyboard and interaction smoke tests for every interactive component.
 * Usage: BASE_URL=http://localhost:4321 node scripts/interactions.cjs
 */
const playwright = require('playwright');
const assert = require('node:assert/strict');
const { configureStagingAuth } = require('./staging-auth.cjs');

const BASE_URL = (process.env.BASE_URL ?? 'http://localhost:4321').replace(/\/$/, '');
const BROWSER = process.env.BROWSER ?? 'chromium';
const browserType = playwright[BROWSER];
if (!browserType || !['chromium', 'firefox', 'webkit'].includes(BROWSER)) {
  throw new Error('BROWSER must be chromium, firefox or webkit');
}
const pass = (msg) => console.log(`✓ ${msg}`);

(async () => {
  const executablePath =
    process.env.PLAYWRIGHT_EXECUTABLE_PATH ??
    (BROWSER === 'chromium' ? process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH : undefined);
  const browser = await browserType.launch(executablePath ? { executablePath } : undefined);
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await configureStagingAuth(page.context());

  // Homepage hero links and early concept portfolio
  await page.goto(BASE_URL + '/', { waitUntil: 'networkidle' });
  assert.ok(await page.getByRole('heading', { name: /Distinctive websites/ }).isVisible());
  assert.equal(
    await page.getByRole('link', { name: 'Explore our work' }).getAttribute('href'),
    '/work',
  );
  assert.equal(await page.locator('#work article').count(), 3);
  pass('homepage hero CTA reaches Work and features three labelled concepts');

  // Pathway selector (radio group, arrow keys)
  const pathway = page.getByRole('radiogroup');
  await pathway.evaluate((el) => el.scrollIntoView({ block: 'center' }));
  await page.waitForFunction(() => {
    const island = document.querySelector(
      '#services astro-island[component-url*="PathwaySelector"]',
    );
    return island && !island.hasAttribute('ssr');
  });
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
  await approach.evaluate((el) => el.scrollIntoView({ block: 'center' }));
  await page.waitForFunction(() => {
    const island = document.querySelector(
      '#approach astro-island[component-url*="ApproachStages"]',
    );
    return island && !island.hasAttribute('ssr');
  });
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
  assert.ok(await cards.getByText('₦150,000').first().isVisible(), 'standard price default');
  assert.equal(await cards.getByText('₦135,000').count(), 0);
  await page.getByText('Founding rate', { exact: false }).first().click();
  assert.ok(await cards.getByText('₦135,000').isVisible());
  assert.ok(await cards.getByText('Not part of the founding offer').isVisible());
  pass('pricing defaults to standard prices; founding toggle shows eligible discounts only');

  // FAQ
  const faq = page.locator('details', { hasText: 'Are these prices fixed?' });
  await faq.locator('summary').click();
  assert.equal(await faq.evaluate((d) => d.open), true);
  pass('pricing FAQ expands');

  // Contact form: validation, focus, preselect, conditional fields, review
  await page.goto(BASE_URL + '/contact?service=online-stores', {
    waitUntil: 'networkidle',
  });
  await page.locator('form').waitFor();
  await page.waitForTimeout(300);
  assert.equal(await page.getByLabel('Service you’re interested in').inputValue(), 'online-stores');
  assert.ok(await page.getByLabel('Where do you sell today?').isVisible(), 'commerce field shown');
  pass('contact form preselects service from URL and shows commerce field');

  await page.getByRole('button', { name: /Review my brief/ }).click();
  const alert = page.getByRole('alert');
  assert.ok(await alert.isVisible());
  assert.match(await alert.innerText(), /4 fields/);
  await page.waitForFunction(() => document.activeElement?.getAttribute('role') === 'alert');
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
  await page.goto(BASE_URL + '/services', { waitUntil: 'networkidle' });
  assert.equal(
    await page.locator('nav[aria-label="Primary"] a[aria-current="page"]').innerText(),
    'Services',
  );
  await page.keyboard.press('Tab');
  assert.equal(
    await page.evaluate(() => document.activeElement?.textContent?.trim()),
    'Skip to content',
  );
  pass('skip link is first in tab order; nav marks the current page');

  // ---------- Milestone D ----------
  // Primary navigation points at real pages
  await page.goto(BASE_URL + '/', { waitUntil: 'networkidle' });
  const navHrefs = await page
    .locator('nav[aria-label="Primary"] a')
    .evaluateAll((els) => els.map((a) => a.getAttribute('href')));
  assert.deepEqual(navHrefs, ['/work', '/services', '/process', '/about', '/pricing']);
  pass('primary navigation links to Work, Services, Process, About and Pricing pages');

  // Work: concept demos
  await page.goto(BASE_URL + '/work', { waitUntil: 'networkidle' });
  assert.equal(
    await page.locator('nav[aria-label="Primary"] a[aria-current="page"]').innerText(),
    'Work',
  );
  await page.locator('#adun-table').scrollIntoViewIfNeeded();
  await page.locator('astro-island:not([ssr])').first().waitFor();
  await page.getByRole('button', { name: /Before: a forwarded image/ }).click();
  assert.ok(await page.getByText('Text is not selectable').isVisible());
  await page.getByRole('button', { name: /After: an editorial menu/ }).click();
  assert.ok(await page.getByText('Smoked jollof, party style · Serves 10').isVisible());
  pass('work: menu demo toggles before and after');

  const kora = page.locator('#kora-home');
  await kora.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  // Click the visible implicit labels: Firefox does not reliably toggle a
  // visually-hidden controlled radio when Playwright force-clicks the input.
  await kora.locator('label', { hasText: 'Ochre' }).click();
  await kora.locator('label', { hasText: 'Double' }).click();
  assert.ok(await kora.getByText('₦52,000').first().isVisible());
  assert.ok(await kora.getByText('Ochre', { exact: true }).first().isVisible());
  await kora.getByRole('button', { name: 'Add to bag' }).click();
  assert.equal(await kora.locator('span[aria-live]').innerText(), 'Bag (1)');
  pass('work: product demo changes colour, size, price and bag count');

  const mend = page.locator('#mend-physio');
  await mend.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await mend.getByRole('radio', { name: 'Sports injury' }).click();
  assert.ok(await mend.getByText('shoes or kit').isVisible());
  await mend.getByRole('button', { name: 'Wed 14:30' }).click();
  assert.ok(await mend.getByText('Request noted for Wed 14:30').isVisible());
  pass('work: first-visit demo updates guidance and records a requested slot');

  const tally = page.locator('#tallyhouse');
  await tally.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await tally.getByRole('button', { name: 'Overdue', exact: true }).click();
  assert.equal(await tally.locator('ul[aria-live] li').count(), 2);
  await tally.getByRole('button', { name: 'Paid', exact: true }).click();
  assert.equal(await tally.locator('ul[aria-live] li').count(), 1);
  pass('work: invoice demo filters by status');

  // Process: responsibilities filter + rail marker
  await page.goto(BASE_URL + '/process', { waitUntil: 'networkidle' });
  await page.locator('#stage-design').scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  assert.equal(
    await page.locator('#rail [aria-current="step"]').getAttribute('data-rail'),
    'design',
  );
  pass('process: the sticky rail marks the stage in view');
  const who = page.locator('section[aria-labelledby="who-title"]');
  await who.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await who.getByRole('radio', { name: 'Your part' }).click();
  assert.equal(await who.getByText('SabiForge', { exact: true }).count(), 0);
  await page.keyboard.press('ArrowRight');
  assert.equal(await who.getByRole('radio', { checked: true }).innerText(), 'Our part');
  pass('process: responsibility filter works with click and arrow keys');

  // About: triad
  await page.goto(BASE_URL + '/about', { waitUntil: 'networkidle' });
  const triad = page.locator('#triad-title').locator('xpath=ancestor::section');
  await triad.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await triad.getByRole('button', { name: 'Technology' }).click();
  assert.ok(await triad.getByText('load quickly').isVisible());
  pass('about: triad diagram switches discipline');

  // Shopify: anatomy tabs
  await page.goto(BASE_URL + '/shopify', { waitUntil: 'networkidle' });
  const anatomy = page.locator('#anatomy-title').locator('xpath=ancestor::section');
  await anatomy.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await anatomy.getByRole('tab', { name: 'Navigation' }).focus();
  await page.keyboard.press('ArrowRight');
  assert.match(await anatomy.getByRole('tabpanel').innerText(), /Collection pages and filters/);
  await page.keyboard.press('End');
  assert.match(await anatomy.getByRole('tabpanel').innerText(), /Performance/);
  pass('shopify: store anatomy tabs respond to arrow keys and End');

  // Legal drafts: noindex, banner, decision register
  for (const route of ['/privacy', '/terms']) {
    await page.goto(BASE_URL + route, { waitUntil: 'networkidle' });
    assert.equal(
      await page.locator('meta[name="robots"]').getAttribute('content'),
      'noindex,nofollow',
    );
    assert.ok(await page.getByText('not an approved legal document').isVisible());
    assert.ok((await page.locator('table tbody tr').count()) >= 11);
  }
  pass('legal drafts: noindex, draft banner and owner-decision register present');

  // Keyboard: every new page shows a visible focus indicator on its first 14 tab stops
  for (const route of ['/work', '/process', '/about', '/shopify', '/privacy', '/terms']) {
    await page.goto(BASE_URL + route, { waitUntil: 'networkidle' });
    let lacking = [];
    for (let i = 0; i < 14; i++) {
      await page.keyboard.press('Tab');
      const ok = await page.evaluate(() => {
        const el = document.activeElement;
        if (!el || el === document.body) return true;
        const cs = getComputedStyle(el);
        return (
          (cs.outlineStyle !== 'none' && parseFloat(cs.outlineWidth) > 0) || cs.boxShadow !== 'none'
        );
      });
      if (!ok)
        lacking.push(await page.evaluate(() => document.activeElement?.outerHTML.slice(0, 80)));
    }
    assert.deepEqual(lacking, [], `${route}: focus indicator missing`);
  }
  pass('keyboard: visible focus indicator on the first 14 tab stops of every new page');

  // Reduced motion + no JavaScript: content visible
  const noJs = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 1280, height: 900 },
  });
  await configureStagingAuth(noJs);
  const njp = await noJs.newPage();
  for (const route of ['/work', '/process', '/about', '/shopify']) {
    await njp.goto(BASE_URL + route);
    const hidden = await njp.evaluate(
      () =>
        [...document.querySelectorAll('h1, h2, h3')].filter((h) => {
          const cs = getComputedStyle(h);
          return cs.visibility === 'hidden' || parseFloat(cs.opacity) < 1;
        }).length,
    );
    assert.equal(hidden, 0, `${route}: headings hidden without JavaScript`);
  }
  await noJs.close();
  pass('no JavaScript: headings on every new page remain visible');

  const reduced = await browser.newContext({
    reducedMotion: 'reduce',
    viewport: { width: 1280, height: 900 },
  });
  await configureStagingAuth(reduced);
  const rp = await reduced.newPage();
  await rp.goto(BASE_URL + '/process', { waitUntil: 'networkidle' });
  const opacity = await rp.evaluate(
    () => getComputedStyle(document.querySelector('[data-reveal]')).opacity,
  );
  assert.equal(opacity, '1');
  await reduced.close();
  pass('reduced motion: reveal content is fully visible');

  // Mobile menu focus cycling
  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true });
  await configureStagingAuth(mobile.context());
  await mobile.goto(BASE_URL + '/', { waitUntil: 'networkidle' });
  await mobile.evaluate(() => window.scrollTo(0, 3000));
  await mobile.waitForTimeout(300);
  assert.equal(await mobile.locator('#site-header').getAttribute('data-hidden'), 'true');
  await mobile.evaluate(() => window.scrollBy(0, -200));
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
