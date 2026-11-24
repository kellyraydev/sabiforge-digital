import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { packages, comparisonRows, AGREED } from '../src/data/packages';
import { approvedServices, services } from '../src/data/services';

/** Owner decisions recorded on 21 November 2026 (docs/REBUILD-BRIEF.md ledger). */
describe('21 November 2026 owner decisions', () => {
  it('keeps the three existing service URLs and adds custom software', () => {
    expect(approvedServices.map((service) => service.slug)).toEqual([
      'custom-website-design-development',
      'shopify-ecommerce-development',
      'custom-software-and-business-platforms',
      'website-redesign-modernization',
    ]);
    expect(approvedServices).toHaveLength(services.length);
  });

  it('redirects the retired care page and /shopify permanently at the host', () => {
    const config = JSON.parse(readFileSync(new URL('../vercel.json', import.meta.url), 'utf8'));
    const pairs = [
      ['/services/website-care-maintenance', '/services/website-redesign-modernization'],
      ['/shopify', '/services/shopify-ecommerce-development'],
    ];
    expect(config.redirects).toEqual(
      pairs.flatMap(([source, destination]) =>
        [source, `${source}/`].map((path) => ({ source: path, destination, permanent: true })),
      ),
    );
  });

  it('publishes exactly the approved headline inclusions', () => {
    const byId = Object.fromEntries(packages.map((pkg) => [pkg.id, pkg.typically]));
    expect(byId).toEqual({
      starter: [
        'Up to 5 pages',
        'Mobile-friendly design',
        'Contact and WhatsApp enquiry',
        'Basic SEO setup',
      ],
      business: [
        'Custom page designs',
        'Services and portfolio sections',
        'Content management (CMS)',
        'Analytics setup',
      ],
      store: [
        'Product and category pages',
        'Shopping cart and checkout',
        'Payment integration',
        'Order management',
      ],
      custom: [
        'Portals and dashboards',
        'Booking or management systems',
        'Workflow automation',
        'Integrations and ongoing support',
      ],
    });
  });

  it('only marks comparison cells as included where an inclusion was approved', () => {
    const included = comparisonRows.flatMap((row) =>
      Object.entries(row.values)
        .filter(([, value]) => value === true)
        .map(([id]) => `${row.label}:${id}`),
    );
    expect(included.sort()).toEqual(
      [
        'Responsive design:starter',
        'Responsive design:business',
        'Responsive design:store',
        'Responsive design:custom',
        'Edit content yourself:business',
        'Product catalogue:store',
        'Checkout and online payments:store',
        'Post-launch support:custom',
      ].sort(),
    );
    expect(comparisonRows.some((row) => Object.values(row.values).includes(AGREED))).toBe(true);
  });
});

describe('v2 navigation', () => {
  it('follows the reference order and keeps /pricing behind the Packages label', async () => {
    const { navigation } = await import('../src/data/site');
    expect(
      navigation.filter((item) => item.primary).map((item) => [item.label, item.href]),
    ).toEqual([
      ['Home', '/'],
      ['Services', '/services'],
      ['Work', '/work'],
      ['Packages', '/pricing'],
      ['Our Process', '/process'],
      ['About', '/about'],
    ]);
  });
});

describe('real-business concept projects (ledger 17, updated 22 Nov)', () => {
  it('are published only as clearly labelled, uncommissioned reference concepts', async () => {
    const { concepts, REFERENCE_CONCEPT_DISCLAIMER } = await import('../src/data/concepts');
    const reference = concepts.filter((concept) => concept.basis === 'reference');
    expect(reference.map((concept) => concept.id)).toEqual([
      'amzlat-world-of-beauty',
      'opeyemi-phones-gadgets',
    ]);
    for (const concept of reference) {
      expect(concept.label).toBe('Concept Project');
      expect(concept.summary).toMatch(/Not commissioned work/);
    }
    expect(REFERENCE_CONCEPT_DISCLAIMER).toMatch(/Not commissioned work, not an official website/);
  });
});

describe('Big Beerah Collection is client work (ledger 19, 22 Nov)', () => {
  it('is the only client project, labelled as one, with no concept wording', async () => {
    const { concepts } = await import('../src/data/concepts');
    const client = concepts.filter((concept) => concept.basis === 'client');
    expect(client.map((concept) => concept.id)).toEqual(['big-beerah-collection']);
    const [bb] = client;
    expect(bb.label).toBe('Client Project');
    expect(bb.conceptOnly).toBeUndefined();
    const text = JSON.stringify(bb);
    expect(text).not.toMatch(/uncommissioned|concept project|not a client|fictional/i);
    expect(bb.summary).toMatch(/permission/);
  });

  it('is recorded in the owner ledger', async () => {
    const { readFileSync } = await import('node:fs');
    expect(readFileSync('docs/REBUILD-BRIEF.md', 'utf8')).toMatch(
      /19\. \*\*Owner decision \(22 November 2026\): Big Beerah Collection is client work/,
    );
  });
});

describe('ledger 20: delegated service promises (23 Nov 2026)', () => {
  it('states the agreed promises once, in site data', async () => {
    const { promises } = await import('../src/data/site');
    expect(promises).toEqual({
      consultation: 'Free first consultation',
      reply: 'Reply within one working day',
      payment: 'Pay 50% to start, 50% before launch',
    });
  });

  it('answers payment and free consultation in the pricing FAQ', async () => {
    const { pricingFaq } = await import('../src/data/faq');
    const payment = pricingFaq.find((item) => item.q === 'How does payment work?');
    expect(payment?.a).toMatch(/50% to start and 50% before launch/);
    expect(payment?.a).toMatch(/milestones/);
    expect(pricingFaq.some((item) => /first consultation free/.test(item.q))).toBe(true);
  });
});
