import { describe, expect, it } from 'vitest';
import { foundingPrice, packages, processSteps, services } from '../src/data/content';
import { mailtoLink, site, whatsappLink } from '../src/data/site';

describe('packages', () => {
  it('lists the four approved packages in order', () => {
    expect(packages.map((p) => p.name)).toEqual([
      'Launch',
      'Business',
      'Online Catalog',
      'Full E-commerce',
    ]);
  });

  it('discounts only eligible packages', () => {
    const byId = Object.fromEntries(packages.map((p) => [p.id, foundingPrice(p)]));
    expect(byId).toEqual({
      launch: 108_000,
      business: 252_000,
      catalog: 450_000,
      ecommerce: 900_000,
    });
  });
});

describe('content', () => {
  it('covers every core service with unique anchor ids', () => {
    const ids = services.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(services.map((s) => s.title)).toEqual(
      expect.arrayContaining([
        'Business websites',
        'E-commerce stores',
        'Dropshipping websites',
        'Shopify redesigns',
        'Custom web applications',
        'Maintenance & support',
        'Developer collaboration',
      ]),
    );
  });

  it('has the six process steps', () => {
    expect(processSteps.map((s) => s.title)).toEqual([
      'Consult',
      'Plan',
      'Design',
      'Build',
      'Launch',
      'Support',
    ]);
  });
});

describe('contact links', () => {
  it('builds a wa.me link with an encoded message', () => {
    expect(whatsappLink('Hi there')).toBe('https://wa.me/2349038430068?text=Hi%20there');
  });

  it('builds a mailto link', () => {
    expect(mailtoLink('Hello')).toBe(`mailto:${site.contact.email}?subject=Hello`);
  });
});
