import { describe, expect, it } from 'vitest';
import { packages, foundingPrice, comparisonRows, engagementModels } from '../src/data/packages';
import { services, serviceFamilies, getService } from '../src/data/services';
import { concepts, getConcept } from '../src/data/concepts';
import { pathways, stages } from '../src/data/home';
import { navigation, whatsappLink, mailtoLink, site } from '../src/data/site';

describe('approved packages', () => {
  it('keeps the four flyer packages, prices and scope wording', () => {
    expect(packages.map((p) => [p.name, p.price, p.scope])).toEqual([
      ['Launch', 120_000, 'One-page professional business website'],
      ['Business', 280_000, 'Up to 6 pages, business website + CMS'],
      ['Online Catalog', 500_000, 'Products, filters, owner-editable listings'],
      ['Full E-commerce', 900_000, 'Checkout, payments, products + orders'],
    ]);
  });

  it('applies the founding rate only to eligible packages', () => {
    expect(Object.fromEntries(packages.map((p) => [p.id, foundingPrice(p)]))).toEqual({
      launch: 108_000,
      business: 252_000,
      catalog: 450_000,
      ecommerce: 900_000,
    });
  });

  it('has a comparison value for every package in every row', () => {
    for (const row of comparisonRows) {
      for (const pkg of packages)
        expect(row.values[pkg.id], `${row.label}/${pkg.id}`).toBeDefined();
    }
  });

  it('maps every package to an engagement model', () => {
    const ids = engagementModels.map((m) => m.id);
    for (const pkg of packages) expect(ids).toContain(pkg.model);
  });
});

describe('services', () => {
  it('defines ten services across three families with unique slugs', () => {
    expect(services).toHaveLength(10);
    expect(new Set(services.map((s) => s.slug)).size).toBe(10);
    for (const family of serviceFamilies) {
      expect(services.some((s) => s.family === family.id)).toBe(true);
    }
  });

  it('only references existing related services and concepts', () => {
    for (const service of services) {
      for (const slug of service.related) expect(getService(slug), slug).toBeDefined();
      if (service.conceptId) expect(getConcept(service.conceptId)).toBeDefined();
      expect(service.related).not.toContain(service.slug);
    }
  });

  it('has at most one editorial accent per headline', () => {
    for (const service of services) {
      expect((service.headline.match(/<em>/g) ?? []).length).toBeLessThanOrEqual(1);
    }
  });

  it('pathways point to real services', () => {
    for (const pathway of pathways) {
      for (const slug of pathway.services) expect(getService(slug), slug).toBeDefined();
    }
  });
});

describe('honesty rules', () => {
  it('labels every concept as fictional via the shared data', () => {
    expect(concepts.length).toBeGreaterThan(0);
    for (const concept of concepts) expect(concept.category.length).toBeGreaterThan(0);
  });

  it('has no social profiles until real ones are added', () => {
    expect(site.social).toEqual([]);
  });

  it('has six approach stages ending in launch & support', () => {
    expect(stages.map((s) => s.name)).toEqual([
      'Discover',
      'Define',
      'Design',
      'Develop',
      'Refine',
      'Launch & Support',
    ]);
  });

  it('navigation only targets built pages or homepage sections', () => {
    const built = ['/services', '/pricing', '/contact', '/#work', '/#approach'];
    for (const item of navigation) expect(built).toContain(item.href);
  });
});

describe('contact links', () => {
  it('builds a wa.me link with an encoded message', () => {
    expect(whatsappLink('Hi there')).toBe('https://wa.me/2349038430068?text=Hi%20there');
  });

  it('builds a mailto link with optional body', () => {
    expect(mailtoLink('Hello')).toBe(`mailto:${site.contact.email}?subject=Hello`);
    expect(mailtoLink('Hi', 'a b')).toBe(`mailto:${site.contact.email}?subject=Hi&body=a%20b`);
  });
});
