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
  assert.ok(
    await page
      .getByRole('heading', { name: /Your business deserves more than just a website/ })
      .isVisible(),
  );
  assert.equal(
    await page.getByRole('link', { name: 'Explore our work' }).getAttribute('href'),
    '/work',
  );
  // v2 homepage sections (docs/references/homepage-target.jpeg)
  const serviceLinks = await page
    .locator('#services a', { hasText: 'Learn more' })
    .evaluateAll((els) => els.map((a) => a.getAttribute('href')));
  assert.deepEqual(serviceLinks, [
    '/services/custom-website-design-development',
    '/services/shopify-ecommerce-development',
    '/services/custom-software-and-business-platforms',
    '/services/website-redesign-modernization',
  ]);
  const conceptCards = page.locator('#work li');
  assert.equal(await conceptCards.count(), 10);
  assert.equal(await page.locator('#work li', { hasText: 'Concept Project' }).count(), 9);
  assert.match(
    await conceptCards.first().innerText(),
    /Client Project[\s\S]*Big Beerah Collection/,
  );
  assert.equal(
    await page
      .locator('#work li', { hasText: 'Uncommissioned, based on an existing business' })
      .count(),
    2,
  );
  const planLinks = await page
    .locator('#packages a', { hasText: 'Start with' })
    .evaluateAll((els) => els.map((a) => a.getAttribute('href')));
  assert.deepEqual(planLinks, [
    '/contact?package=starter',
    '/contact?package=business',
    '/contact?package=store',
    '/contact?package=custom',
  ]);
  assert.equal(await page.locator('#process ol > li').count(), 6);
  const foundingCopy = await page
    .locator('#packages p')
    .filter({ hasText: 'Founding offer:' })
    .innerText();
  assert.match(foundingCopy, /slots\. See terms/);
  const paymentCopy = await page.locator('[data-payment-terms]').innerText();
  assert.match(paymentCopy, /milestones\. Payment and timeline questions/);
  pass('homepage sections: service links, ten labelled concepts, plan links, six process steps');

  // Concept filter (moved to /work)
  await page.goto(BASE_URL + '/work', { waitUntil: 'networkidle' });
  assert.equal(await page.locator('#case-studies article').count(), 10);
  const conceptFilters = page.getByRole('group', { name: 'Filter the work' });
  await conceptFilters.getByRole('button', { name: 'E-commerce' }).click();
  assert.equal(await page.locator('#case-studies article:visible').count(), 4);
  assert.equal(
    await page.locator('#case-studies article:visible h3').first().innerText(),
    'AURA Clothing',
  );
  await conceptFilters.getByRole('button', { name: 'Product interfaces' }).focus();
  await page.keyboard.press('Enter');
  assert.equal(await page.locator('#case-studies article:visible').count(), 3);
  await conceptFilters.getByRole('button', { name: 'All work' }).click();
  assert.equal(await page.locator('#case-studies article').count(), 10);
  pass('work concept filter uses pressed buttons and shows the shared Work concept data');

  // Project enquiry selector (moved to /services) uses approved services and prefills contact.
  await page.goto(BASE_URL + '/services', { waitUntil: 'networkidle' });
  const selector = page.locator('#project-enquiry');
  await selector.scrollIntoViewIfNeeded();
  await page.waitForFunction(() => {
    const island = document.querySelector('astro-island[component-url*="ProjectEnquirySelector"]');
    return island && !island.hasAttribute('ssr');
  });
  assert.equal(await selector.getByRole('radio').count(), 5);
  await selector.getByRole('radio', { name: 'Online Stores' }).check();
  assert.equal(
    await selector.getByRole('link', { name: 'Continue to project enquiry' }).getAttribute('href'),
    '/contact?service=shopify-ecommerce-development',
  );
  pass('services enquiry selector provides four approved services and service prefill');

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
  await page.goto(BASE_URL + '/contact?service=shopify-ecommerce-development', {
    waitUntil: 'networkidle',
  });
  await page.locator('form').waitFor();
  await page.waitForTimeout(300);
  assert.equal(
    await page.getByLabel('Service you’re interested in').inputValue(),
    'shopify-ecommerce-development',
  );
  assert.equal(await page.getByLabel('Service you’re interested in').locator('option').count(), 5);
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
  // Needs checklist: counter, and service suggestion does not override a chosen service.
  const needs = page.locator('[data-needs]');
  await needs.getByLabel('Sell products online').check();
  await needs.getByLabel('Get enquiries by WhatsApp or email').check();
  assert.match(await needs.locator('legend').innerText(), /2 selected/);
  assert.equal(
    await page.getByLabel('Service you’re interested in').inputValue(),
    'shopify-ecommerce-development',
  );
  await page.locator('input[id$="-consent"]').check();
  await page.getByRole('button', { name: /Review my brief/ }).click();
  const heading = page.getByRole('heading', { name: /Thanks, Ada/ });
  assert.ok(await heading.isVisible());
  const mail = await page.getByRole('link', { name: 'Send by email' }).getAttribute('href');
  const wa = await page.getByRole('link', { name: /Send on WhatsApp/ }).getAttribute('href');
  assert.ok(mail.startsWith('mailto:kellyray.dev@gmail.com?subject='));
  assert.ok(decodeURIComponent(mail).includes('Name: Ada Obi'));
  assert.ok(
    decodeURIComponent(mail).includes(
      'Needs: Sell products online; Get enquiries by WhatsApp or email',
    ),
  );
  assert.ok(wa.startsWith('https://wa.me/2349038430068?text='));
  pass('valid brief reaches review step with working email and WhatsApp hand-off links');

  await page.getByRole('button', { name: 'Edit details' }).click();
  assert.equal(await page.getByLabel(/Your name/).inputValue(), 'Ada Obi');
  pass('edit returns to the form with details kept');

  // A fresh form: ticking needs suggests a service, choosing one stops the suggestions.
  await page.goto(BASE_URL + '/contact', { waitUntil: 'networkidle' });
  await page.locator('[data-needs]').getByLabel('Redesign or modernise my current site').check();
  assert.equal(
    await page.getByLabel('Service you’re interested in').inputValue(),
    'website-redesign-modernization',
  );
  await page
    .getByLabel('Service you’re interested in')
    .selectOption('custom-software-and-business-platforms');
  await page.locator('[data-needs]').getByLabel('Sell products online').check();
  assert.equal(
    await page.getByLabel('Service you’re interested in').inputValue(),
    'custom-software-and-business-platforms',
  );
  pass('needs checklist counts ticks, suggests a service, never overrides a chosen one');

  // Growth blueprint: homepage process shows the client's part, mid-page dual CTA
  await page.goto(BASE_URL + '/', { waitUntil: 'networkidle' });
  assert.equal(await page.locator('#process li', { hasText: 'Your part' }).count(), 6);
  const pair = page.locator('[data-cta-pair]');
  assert.equal(
    await pair.getByRole('link', { name: 'Start your project' }).getAttribute('href'),
    '/contact',
  );
  assert.ok(
    (await pair.getByRole('link', { name: /WhatsApp/ }).getAttribute('href')).startsWith(
      'https://wa.me/2349038430068',
    ),
  );
  pass('homepage process lists the client part of all six steps; mid-page CTA pair works');

  // /work studies: meta line, four steps, tags, next-concept loop
  await page.goto(BASE_URL + '/work', { waitUntil: 'networkidle' });
  assert.equal(await page.locator('[data-study-meta]').count(), 10);
  assert.equal(await page.locator('[data-study-steps] > li').count(), 40);
  assert.equal(await page.locator('[data-study-tags]').count(), 10);
  const nexts = await page
    .locator('[data-next-concept]')
    .evaluateAll((links) => links.map((a) => a.getAttribute('href')));
  const ids = await page.locator('article[id]').evaluateAll((items) => items.map((a) => a.id));
  assert.deepEqual(
    nexts,
    [...ids.slice(1), ids[0]].map((id) => `#${id}`),
  );
  assert.equal(
    await page
      .locator('#amzlat-world-of-beauty [data-study-meta]')
      .innerText()
      .then((t) => /uncommissioned/i.test(t)),
    true,
  );
  pass('every /work study has meta, four steps, tags and a next-concept link that loops');

  // Audit follow-ups: client-work filter, header WhatsApp below xl, footer call link
  await page.goto(BASE_URL + '/work', { waitUntil: 'networkidle' });
  await page.locator('[data-concept-filter="Client work"]').click();
  const visibleWork = await page
    .locator('[data-concept-category]')
    .evaluateAll((cards) => cards.filter((c) => !c.hidden && c.offsetParent !== null).length);
  assert.equal(visibleWork, 1);
  await page.locator('[data-concept-filter="All work"]').click();
  await page.setViewportSize({ width: 390, height: 844 });
  assert.ok(await page.locator('[data-header-whatsapp]').isVisible());
  assert.ok(
    (await page.locator('[data-header-whatsapp]').getAttribute('href')).startsWith(
      'https://wa.me/',
    ),
  );
  assert.equal(await page.locator('footer a[href="tel:+2349038430068"]').count(), 1);
  await page.setViewportSize({ width: 1440, height: 900 });
  assert.ok(await page.locator('[data-header-whatsapp]').isHidden());
  pass('client-work filter shows one study; WhatsApp in header below xl; footer call link');

  // Package finder: branching questions, recommendation, prefilled contact, restart
  await page.goto(BASE_URL + '/pricing', { waitUntil: 'networkidle' });
  const finder = page.locator('#finder [data-package-finder][data-ready="true"]');
  await finder.waitFor();
  await finder.scrollIntoViewIfNeeded();
  await finder.getByRole('button', { name: /Show my business/ }).click();
  assert.match(await finder.locator('[data-finder-progress]').innerText(), /Question 2 of 3/);
  await finder.getByRole('button', { name: /^5 or fewer/ }).click();
  await finder.getByRole('button', { name: /Yes, I want to edit/ }).click();
  assert.match(await finder.locator('[data-finder-result] h3').innerText(), /Business/);
  assert.equal(
    await finder.getByRole('link', { name: 'Start with Business' }).getAttribute('href'),
    '/contact?package=business',
  );
  await finder.getByRole('button', { name: 'Start again' }).click();
  await finder.getByRole('button', { name: /Sell products online/ }).click();
  assert.match(await finder.locator('[data-finder-result] h3').innerText(), /Online Store/);
  assert.match(
    await finder.getByRole('link', { name: /Ask on WhatsApp/ }).getAttribute('href'),
    /^https:\/\/wa\.me\/2349038430068\?text=.*Online%20Store/,
  );
  assert.equal(await page.locator('#packages [data-package-finder]').count(), 0);
  await page.goto(BASE_URL + '/', { waitUntil: 'networkidle' });
  assert.equal(await page.locator('#packages [data-package-finder]').count(), 1);
  pass('package finder branches, recommends, links to contact/WhatsApp, restarts');

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
  assert.deepEqual(navHrefs, ['/', '/services', '/work', '/pricing', '/process', '/about']);
  pass('primary navigation links to Work, Services, Process, About and Pricing pages');

  // Work: concept demos
  await page.goto(BASE_URL + '/work', { waitUntil: 'networkidle' });
  assert.equal(
    await page.locator('nav[aria-label="Primary"] a[aria-current="page"]').innerText(),
    'Work',
  );
  const conceptIds = [
    'maison-vale-studios',
    'aura-clothing',
    'flowdesk-os',
    'campusone-portal',
    'bloom-wellness-studio',
    'routepilot-logistics',
    'big-beerah-collection',
    'amzlat-world-of-beauty',
    'opeyemi-phones-gadgets',
    'corporate-digital-modernization',
  ];
  for (const id of conceptIds) {
    await page.locator(`#${id}`).scrollIntoViewIfNeeded();
    assert.equal(await page.locator(`#${id}`).count(), 1);
  }
  assert.equal(await page.locator('#adun-table, #kora-home, #mend-physio, #tallyhouse').count(), 0);
  assert.match(await page.locator('body').innerText(), /Concept Project/);
  assert.match(
    await page.locator('body').innerText(),
    /latest technology and modern design standards/,
  );
  pass('work: ten concept studies are present without the retired studies');

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
  for (const route of [
    '/work',
    '/process',
    '/about',
    '/services/shopify-ecommerce-development',
    '/privacy',
    '/terms',
  ]) {
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
  for (const route of ['/work', '/process', '/about', '/services/shopify-ecommerce-development']) {
    await njp.goto(BASE_URL + route);
    const hidden = await njp.evaluate(
      () =>
        [...document.querySelectorAll('h1, h2, h3')].filter((h) => {
          const cs = getComputedStyle(h);
          return cs.visibility === 'hidden' || parseFloat(cs.opacity) < 1;
        }).length,
    );
    assert.equal(hidden, 0, `${route}: headings hidden without JavaScript`);
    if (route === '/work') assert.equal(await njp.locator('article[id]').count(), 10);
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

  // AURA Clothing demo (T1): filter, open a piece, size guard, enquiry bag, focus.
  const auraUrl = `${BASE_URL}/work/aura-clothing/demo`;
  await page.goto(auraUrl, { waitUntil: 'networkidle' });
  assert.match(await page.locator('[data-demo-badge]').innerText(), /fictional brand/);
  const grid = page.locator('[data-aura-grid] > li');
  assert.equal(await grid.count(), 9);
  await page
    .locator('[data-aura-filters]')
    .getByRole('button', { name: /^Accessories/ })
    .click();
  assert.equal(await grid.count(), 3);
  await page
    .locator('[data-aura-filters]')
    .getByRole('button', { name: /^Tailoring/ })
    .click();
  await page.getByRole('button', { name: /Ivory wrap blazer/ }).click();
  assert.equal(await page.evaluate(() => document.activeElement?.textContent), 'Ivory wrap blazer');
  await page.getByRole('button', { name: 'Add to enquiry bag' }).click();
  assert.match(await page.locator('#aura-size-hint').innerText(), /Choose a size first/);
  await page.locator('[data-aura-sizes]').getByRole('button', { name: 'M', exact: true }).click();
  await page.getByRole('button', { name: 'Add to enquiry bag' }).click();
  assert.match(await page.locator('[data-aura-bag-button]').innerText(), /\(1\)/);
  await page.getByRole('button', { name: 'Back to the collection', exact: true }).click();
  assert.equal(
    await page.evaluate(() => document.activeElement?.id),
    'aura-card-ivory-wrap-blazer',
  );
  await page.locator('[data-aura-bag-button]').click();
  assert.match(
    await page.locator('[data-aura-bag]').innerText(),
    /Ivory wrap blazer[\s\S]*Size: M/,
  );
  await page.getByRole('button', { name: 'Send enquiry' }).click();
  assert.match(await page.locator('[data-aura-bag] [role="status"]').innerText(), /^Demo:/);
  await page.getByRole('button', { name: /Remove/ }).click();
  assert.match(await page.locator('[data-aura-bag]').innerText(), /Nothing here yet/);
  pass('AURA demo: filters, size guard, enquiry bag, focus return and demo send');

  // Bloom booking demo (T2): session, day (Sunday closed), time (taken disabled), validation,
  // honest confirmation, restart.
  await page.goto(`${BASE_URL}/work/bloom-wellness-studio/demo`, { waitUntil: 'networkidle' });
  const bloom = page.locator('[data-bloom]');
  await bloom.waitFor();
  await bloom.getByRole('button', { name: /Restorative yoga/ }).click();
  const closedDays = await bloom.locator('[data-bloom-days] button:disabled').count();
  assert.ok(closedDays <= 1, 'at most one closed day (Sunday) in a week');
  await bloom.locator('[data-bloom-days] button:not(:disabled)').first().click();
  assert.ok((await bloom.locator('[data-bloom-times] button:disabled').count()) > 0, 'some taken');
  await bloom.locator('[data-bloom-times] button:not(:disabled)').first().click();
  await bloom.getByRole('button', { name: 'Send request' }).click();
  assert.equal(await bloom.getByRole('alert').count(), 2);
  assert.equal(await page.evaluate(() => document.activeElement?.id), 'bloom-name');
  await bloom.getByLabel('Your name').fill('Ada Obi');
  await bloom.getByLabel('Phone or WhatsApp number').fill('0803 123 4567');
  await bloom.getByRole('button', { name: 'Send request' }).click();
  const confirmation = bloom.locator('[data-bloom-confirmation]');
  assert.match(await confirmation.innerText(), /Restorative yoga[\s\S]*0803 123 4567/);
  assert.match(await confirmation.getByRole('status').innerText(), /Nothing has been booked/);
  await bloom.getByRole('button', { name: 'Start a new request' }).click();
  assert.equal(await bloom.getAttribute('data-step'), '0');
  pass('Bloom demo: session, day, time, validation, honest confirmation, restart');

  // Remaining concept demos: each one's main flow, badge wording and honesty note.
  const openDemo = async (slug, root) => {
    await page.goto(`${BASE_URL}/work/${slug}/demo`, { waitUntil: 'networkidle' });
    const el = page.locator(root);
    await el.waitFor();
    return el;
  };

  const fd = await openDemo('flowdesk-os', '[data-flowdesk]');
  await fd.getByRole('button', { name: 'Add to Later' }).click();
  assert.equal(await page.evaluate(() => document.activeElement?.id), 'fd-title');
  await fd.getByLabel('New task').fill('Call back the caterer');
  await fd.getByRole('button', { name: 'Add to Later' }).click();
  const later = fd.locator('[data-column="later"]');
  assert.match(await later.innerText(), /Call back the caterer/);
  await later.getByRole('button', { name: /← Next\s*: Call back the caterer/ }).click();
  assert.match(await fd.locator('[data-column="next"]').innerText(), /Call back the caterer/);
  await fd.getByRole('button', { name: /Done\s*: Call back the caterer/ }).click();
  assert.match(await fd.locator('[data-done] summary').innerText(), /Done \(1\)/);
  assert.doesNotMatch(await fd.innerText(), /%|₦|\$|revenue/i);
  pass('FlowDesk demo: add with validation, move, done; no scores or totals');

  const route = await openDemo('routepilot-logistics', '[data-routepilot]');
  await route.locator('[data-lanes]').getByRole('button', { name: /^Yard/ }).click();
  assert.equal(await route.locator('[data-jobs] tbody tr').count(), 2);
  await route.getByRole('button', { name: /Mark moving\s*: Sample job 06/ }).click();
  await route.getByRole('button', { name: /Mark arrived\s*: Sample job 06/ }).click();
  assert.match(
    await route.locator('[data-job="Sample job 06"]').innerText(),
    /Arrived[\s\S]*Complete/,
  );
  assert.match(
    await route.locator('[data-activity]').innerText(),
    /Sample job 06: Moving → Arrived/,
  );
  assert.doesNotMatch(await route.innerText(), /\bETA\b|tracking number/i);
  pass('RoutePilot demo: lane filter, status steps, activity log; fake identifiers');

  const co = await openDemo('campusone-portal', '[data-campus]');
  assert.match(await co.locator('[data-lesson-progress]').innerText(), /2 of 5/);
  await co.getByRole('button', { name: 'Complete lesson 3' }).click();
  assert.match(await co.locator('[data-lesson-progress]').innerText(), /3 of 5.*Lesson 4/);
  await co.getByRole('tab', { name: 'Home' }).focus();
  await page.keyboard.press('ArrowRight');
  await page.keyboard.press('ArrowRight');
  assert.equal(await co.getByRole('tab', { name: /Tasks/ }).getAttribute('aria-selected'), 'true');
  await co.getByLabel('Read the lesson 3 notes').check();
  assert.match(await co.getByRole('tab', { name: /Tasks/ }).innerText(), /Tasks\s*1/);
  pass('CampusOne demo: lesson progress, keyboard tabs, task checkboxes');

  const mv = await openDemo('maison-vale-studios', '[data-maison]');
  await mv.locator('[data-maison-filters]').getByRole('button', { name: 'Hospitality' }).click();
  assert.equal(await mv.locator('[data-maison-projects] > li').count(), 2);
  await mv.getByRole('button', { name: /Boutique hotel lobby/ }).click();
  assert.match(await mv.innerText(), /Travertine/);
  await mv.getByRole('button', { name: 'Review my enquiry' }).click();
  assert.match(await mv.getByRole('status').innerText(), /Choose an answer for each question/);
  await mv.getByRole('button', { name: /Residential\s*\(space\)/ }).click();
  await mv.getByRole('button', { name: /A single room\s*\(size\)/ }).click();
  await mv.getByRole('button', { name: /Ready to plan\s*\(stage\)/ }).click();
  await mv.getByRole('button', { name: 'Review my enquiry' }).click();
  assert.match(
    await mv.locator('[data-maison-summary]').innerText(),
    /Residential[\s\S]*No timeline or result is\s+promised/,
  );
  pass('Maison Vale demo: space filter, materials, enquiry validation and honest summary');

  const am = await openDemo('amzlat-world-of-beauty', '[data-amzlat]');
  assert.match(await page.locator('[data-demo-badge]').innerText(), /uncommissioned/);
  assert.equal(await am.locator('[data-amzlat-categories] button').count(), 6);
  await am.locator('[data-amzlat-categories]').getByRole('button', { name: 'Skincare' }).click();
  await am.getByRole('button', { name: /Add to list\s*: Cleanser/ }).click();
  await am.locator('[data-amzlat-categories]').getByRole('button', { name: 'Hair' }).click();
  await am.getByRole('button', { name: /Add to list\s*: Hair oil/ }).click();
  await am.locator('[data-amzlat-list-button]').click();
  assert.match(
    await am.locator('[data-amzlat-list]').innerText(),
    /Skincare: Cleanser[\s\S]*Hair: Hair oil/,
  );
  assert.doesNotMatch(await am.innerText(), /₦|\$|in stock/i);
  pass('Amzlat demo: six reference categories, enquiry list, no prices or stock');

  const op = await openDemo('opeyemi-phones-gadgets', '[data-opeyemi]');
  await op.getByRole('button', { name: 'Laptops' }).click();
  assert.match(await op.locator('[data-opeyemi-listings]').innerText(), /13-inch laptop/);
  await op.getByRole('button', { name: 'Sell or swap' }).click();
  await op.getByRole('button', { name: 'Review my device' }).click();
  assert.match(await op.getByRole('status').innerText(), /Choose a device type/);
  await op.getByLabel('Device type').selectOption('Phones');
  await op.getByLabel('Model and storage').fill('128 GB, black');
  await op.getByLabel('Condition').selectOption('Good');
  await op.getByRole('button', { name: 'Review my device' }).click();
  assert.match(
    await op.locator('[data-opeyemi-summary]').innerText(),
    /Swap: phone · 128 GB, black · good/,
  );
  assert.ok(await op.getByRole('button', { name: 'Send on WhatsApp' }).isDisabled());
  assert.doesNotMatch(await op.innerText(), /₦|warranty included|\+234/i);
  pass('Opeyemi demo: browse, separate sell/swap form, WhatsApp stays disabled');

  // Concept demo shell (T11): badge, way back, lazy island, review mode, no-JS fallback.
  const demoUrl = `${BASE_URL}/work/corporate-digital-modernization/demo`;
  await page.goto(BASE_URL + '/work', { waitUntil: 'networkidle' });
  const demoLink = page.locator('#corporate-digital-modernization [data-demo-links] a').first();
  assert.equal(await demoLink.getAttribute('href'), '/work/corporate-digital-modernization/demo');
  pass('/work links the corporate concept to its demo and review mode');

  await page.goto(demoUrl, { waitUntil: 'networkidle' });
  const badge = page.locator('[data-demo-badge]');
  assert.match(await badge.innerText(), /fictional brand, not a live client/);
  await page.mouse.wheel(0, 1500);
  await page.waitForTimeout(300);
  assert.ok(await badge.isVisible(), 'badge stays visible after scrolling');
  pass('demo badge is present and stays visible while scrolling');

  await page.getByRole('button', { name: 'Old website' }).click();
  assert.ok(await page.getByTestId('old-site').isVisible());
  assert.equal(
    await page.getByRole('button', { name: 'Old website' }).getAttribute('aria-pressed'),
    'true',
  );
  await page.getByRole('button', { name: 'Redesigned website' }).click();
  assert.ok(await page.getByTestId('new-site').isVisible());
  await page.getByRole('button', { name: 'Talk to our team' }).click();
  assert.match(
    await page.getByRole('status').filter({ hasText: 'Demo:' }).innerText(),
    /contact page/,
  );
  pass('demo switches between old and redesigned site, and buttons give feedback');

  const toggle = page.locator('[data-review-toggle]');
  await toggle.click();
  assert.equal(await toggle.getAttribute('aria-expanded'), 'true');
  assert.ok(await page.locator('#demo-review').isVisible());
  assert.match(await page.locator('[data-review-status]').innerText(), /Step 1 of 5/);
  await page.locator('[data-review-next]').click();
  assert.match(
    await page.locator('[data-review-step][aria-current="step"]').innerText(),
    /One clear next step/,
  );
  await page.keyboard.press('Escape');
  assert.ok(await page.locator('#demo-review').isHidden());
  assert.equal(
    await page.evaluate(() => document.activeElement?.hasAttribute('data-review-toggle')),
    true,
  );
  pass('review mode opens, steps forward, closes on Escape and returns focus');

  await page.goto(demoUrl + '?review=1', { waitUntil: 'networkidle' });
  assert.ok(await page.locator('#demo-review').isVisible());
  pass('?review=1 opens the guided review directly');

  await page.getByRole('link', { name: 'Back to the case study' }).click();
  await page.waitForURL(/\/work#corporate-digital-modernization$/);
  pass('back link returns to the case study entry');

  const demoNoJs = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  await configureStagingAuth(demoNoJs);
  const demoPlain = await demoNoJs.newPage();
  await demoPlain.goto(demoUrl, { waitUntil: 'load' });
  assert.ok(await demoPlain.locator('[data-demo-badge]').isVisible());
  assert.ok(await demoPlain.locator('#demo-review').isVisible(), 'walkthrough readable without JS');
  assert.equal(await demoPlain.locator('[data-review-step]').count(), 5);
  assert.ok(await demoPlain.locator('[data-review-toggle]').isHidden(), 'JS-only toggle hidden');
  assert.ok(await demoPlain.locator('section img').first().isVisible(), 'static picture fallback');
  await demoNoJs.close();
  pass('without JavaScript the demo page shows the picture, badge and full walkthrough');

  const noJsContext = await browser.newContext({ javaScriptEnabled: false });
  await configureStagingAuth(noJsContext);
  const noJsPage = await noJsContext.newPage();
  await noJsPage.goto(`${BASE_URL}/pricing#finder`, { waitUntil: 'load' });
  const finderFallback = noJsPage
    .locator('noscript p')
    .filter({ hasText: 'The finder needs JavaScript' });
  assert.match(
    await finderFallback.innerText(),
    /JavaScript\. Message us on WhatsApp and we’ll suggest a package/,
  );
  await noJsPage.goto(`${BASE_URL}/contact`, { waitUntil: 'load' });
  const contactFallback = noJsPage
    .locator('noscript p')
    .filter({ hasText: 'email us directly at' });
  assert.match(await contactFallback.innerText(), /directly at kellyray\.dev@gmail\.com\./);
  await noJsContext.close();
  pass('no-JavaScript finder and contact fallbacks have readable word spacing');

  const res = await page.goto(`${BASE_URL}/does-not-exist`);
  assert.equal(res.status(), 404);
  pass('unknown routes return the 404 page');

  await browser.close();
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
