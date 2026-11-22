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

describe('real-business concept projects (ledger 17)', () => {
  it('are only published once that business has agreed', async () => {
    const { homepageConcepts, publishedHomepageConcepts } = await import('../src/data/concepts');
    for (const concept of homepageConcepts) {
      const shown = publishedHomepageConcepts.includes(concept);
      expect(shown).toBe(concept.realBusinessConsent !== 'pending');
    }
  });
});
