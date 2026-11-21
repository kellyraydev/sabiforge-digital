import { describe, expect, it } from 'vitest';
import { packages, foundingPrice, comparisonRows, engagementModels } from '../src/data/packages';
import { services, serviceFamilies, getService } from '../src/data/services';
import {
  concepts,
  getConcept,
  homepageConcepts,
  HOMEPAGE_CONCEPT_LABEL,
} from '../src/data/concepts';
import { pathways, stages } from '../src/data/home';
import { navigation, whatsappLink, mailtoLink, site } from '../src/data/site';

describe('approved packages', () => {
  it('keeps the four approved packages and prices', () => {
    expect(packages.map((p) => [p.name, p.price, p.fromPrice])).toEqual([
      ['Starter', 150_000, false],
      ['Business', 350_000, false],
      ['Online Store', 750_000, false],
      ['Custom Software', 1_500_000, true],
    ]);
  });

  it('applies the founding rate only to eligible packages', () => {
    expect(Object.fromEntries(packages.map((p) => [p.id, foundingPrice(p)]))).toEqual({
      starter: 135_000,
      business: 315_000,
      store: 675_000,
      custom: 1_500_000,
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
  it('defines the four approved services across three layout groups with unique slugs', () => {
    expect(services.map((s) => s.name)).toEqual([
      'Business Websites',
      'Online Stores',
      'Custom Software and Business Platforms',
      'Website Redesign and Ongoing Support',
    ]);
    expect(services.every((s) => s.approval === 'confirmed')).toBe(true);
    expect(new Set(services.map((s) => s.slug)).size).toBe(4);
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
  it('keeps the four /work studies and adds six homepage concept projects', () => {
    expect(concepts.map((concept) => concept.name)).toEqual([
      'Àdùn Table',
      'Kòrà Home',
      'Mend Physio Studio',
      'Tallyhouse',
    ]);
    expect(homepageConcepts.map((concept) => concept.name)).toEqual([
      'Maison Valé Studios',
      'AURA Clothing',
      'FlowDesk OS',
      'CampusOne Portal',
      'Bloom Wellness Studio',
      'RoutePilot Logistics',
    ]);
    for (const concept of homepageConcepts) {
      expect(concept.label).toBe(HOMEPAGE_CONCEPT_LABEL);
      expect(concept.conceptOnly).toBe(true);
      expect(concept.summary).toMatch(/Not a client project/);
    }
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

  it('navigation only targets built pages', () => {
    const built = ['/', '/work', '/services', '/process', '/about', '/pricing', '/contact'];
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
