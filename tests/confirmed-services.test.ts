import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { publicPathways } from '../src/data/home';
import { FOUNDING_CLIENT_SLOTS } from '../src/lib/pricing';
import { packages } from '../src/data/packages';
import {
  approvedRelated,
  approvedServices,
  confirmedServices,
  enquiryServiceOptions,
  getService,
  publicServiceFamilies,
  services,
  servicesInFamily,
} from '../src/data/services';

const pendingSlugs = [
  'brand-identity-creative-direction',
  'website-strategy-ux-ui-design',
  'design-systems',
  'conversion-experience-optimization',
  'performance-accessibility-technical-seo',
  'digital-integrations-workflows',
] as const;

const confirmedSlugs = [
  'custom-website-design-development',
  'shopify-ecommerce-development',
  'website-redesign-modernization',
  'website-care-maintenance',
] as const;

const publicSurfaces = [
  'src/components/home/Hero.astro',
  'src/components/home/Services.astro',
  'src/components/layout/Footer.astro',
  'src/components/work/Specimen.astro',
  'src/pages/contact.astro',
  'src/pages/services/index.astro',
  'src/pages/services/[slug].astro',
  'src/pages/terms.astro',
];

describe('confirmed public services', () => {
  it('keeps all ten definitions and does not change approval status', () => {
    expect(services).toHaveLength(10);
    expect(approvedServices.map((service) => service.slug)).toEqual([...confirmedSlugs]);
    for (const slug of pendingSlugs) {
      expect(getService(slug)?.approval).toBe('pending');
    }
    for (const slug of confirmedSlugs) {
      expect(getService(slug)?.approval).toBe('confirmed');
    }
    expect(getService('website-care-maintenance')?.name).toBe(
      'Website Care, Maintenance & Retainers',
    );
  });

  it('cannot turn a pending slug into a public route, link, or enquiry option', () => {
    expect(servicesInFamily('strategy')).toEqual([]);
    expect(publicServiceFamilies().map((family) => family.id)).toEqual(['build', 'growth']);
    for (const family of publicServiceFamilies()) {
      for (const service of servicesInFamily(family.id)) {
        expect(service.approval).toBe('confirmed');
        expect(pendingSlugs).not.toContain(service.slug);
      }
    }
    for (const service of approvedServices) {
      for (const related of approvedRelated(service)) {
        expect(related.approval).toBe('confirmed');
      }
    }
    expect(approvedRelated(getService('website-care-maintenance')!)).toEqual([]);
    expect(
      confirmedServices([
        'design-systems',
        'custom-website-design-development',
        'not-a-service',
      ]).map((service) => service.slug),
    ).toEqual(['custom-website-design-development']);

    const options = enquiryServiceOptions();
    expect(options.map((option) => option.value)).toEqual([...confirmedSlugs]);
    for (const slug of pendingSlugs) {
      expect(options.some((option) => option.value === slug)).toBe(false);
    }

    for (const pathway of publicPathways()) {
      expect(pathway.services.length).toBeGreaterThan(0);
      for (const slug of pathway.services) expect(getService(slug)?.approval).toBe('confirmed');
    }
    expect(publicPathways().map((pathway) => pathway.id)).toEqual([
      'founder',
      'small-business',
      'redesign',
      'merchant',
      'complex',
    ]);
    expect(publicPathways().find((pathway) => pathway.id === 'complex')?.services).toEqual([
      'website-care-maintenance',
    ]);

    const slugPage = readFileSync('src/pages/services/[slug].astro', 'utf8');
    expect(slugPage).toContain('approvedServices.map');
    expect(slugPage).not.toContain('services.map');
    const contact = readFileSync('src/pages/contact.astro', 'utf8');
    expect(contact).toContain('enquiryServiceOptions()');
    expect(contact).not.toContain('services.map');

    for (const file of publicSurfaces) {
      const source = readFileSync(file, 'utf8');
      for (const slug of pendingSlugs) {
        expect(source, `${file} mentions ${slug}`).not.toContain(slug);
      }
    }
  });

  it('preserves package prices, founding slots, and the current homepage headline', () => {
    expect(FOUNDING_CLIENT_SLOTS).toBeNull();
    expect(packages.map((pkg) => [pkg.id, pkg.price, pkg.foundingEligible])).toEqual([
      ['launch', 120_000, true],
      ['business', 280_000, true],
      ['catalog', 500_000, true],
      ['ecommerce', 900_000, false],
    ]);
    const hero = readFileSync('src/components/home/Hero.astro', 'utf8');
    expect(hero).toContain('Distinctive websites.');
    expect(hero).not.toContain('Your Business Deserves More Than');
  });
});
