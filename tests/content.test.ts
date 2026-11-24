import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { packages, foundingPrice, comparisonRows, engagementModels } from '../src/data/packages';
import { services, serviceFamilies, getService } from '../src/data/services';
import { concepts, getConcept, CONCEPT_LABEL, TECHNOLOGY_POSITIONING } from '../src/data/concepts';
import { pathways, processSteps, serviceCardCopy, stages, whyPoints } from '../src/data/home';
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
  it('uses one ten-concept register for the homepage and /work', () => {
    expect(concepts.map((concept) => [concept.id, concept.name, concept.category])).toEqual([
      ['maison-vale-studios', 'Maison Vale Studios', 'Interior Design / Creative Studio'],
      ['aura-clothing', 'AURA Clothing', 'Fashion / E-commerce'],
      ['flowdesk-os', 'FlowDesk OS', 'Business Software / SaaS'],
      ['campusone-portal', 'CampusOne Portal', 'Education / Student Portal'],
      ['bloom-wellness-studio', 'Bloom Wellness Studio', 'Wellness / Booking Website'],
      ['routepilot-logistics', 'RoutePilot Logistics', 'Logistics / Business Platform'],
      [
        'big-beerah-collection',
        'Big Beerah Collection',
        'Modest Fashion & Accessories / E-commerce',
      ],
      ['amzlat-world-of-beauty', 'Amzlat World of Beauty', 'Beauty, Cosmetics & Fashion Retail'],
      [
        'opeyemi-phones-gadgets',
        'Opeyemi Phones & Gadgets',
        'Electronics Retail / Buy, Sell & Swap',
      ],
      [
        'corporate-digital-modernization',
        'Corporate Website Redesign & Digital Modernization',
        'Corporate / Digital Transformation',
      ],
    ]);
    expect(CONCEPT_LABEL).toBe('Concept Project');
    for (const concept of concepts.filter((c) => c.basis !== 'client')) {
      expect(concept.label).toBe(CONCEPT_LABEL);
      expect(concept.conceptOnly).toBe(true);
      expect(concept.summary).toMatch(/Not a client project/);
    }
    for (const concept of concepts) {
      expect([...concept.name].every((char) => char.charCodeAt(0) < 128)).toBe(true);
    }
    expect(
      ['adun-table', 'kora-home', 'mend-physio', 'tallyhouse'].some((id) =>
        concepts.some((concept) => concept.id === id),
      ),
    ).toBe(false);
    expect(TECHNOLOGY_POSITIONING).toMatch(/design approach and the thinking behind each project/);
    expect(TECHNOLOGY_POSITIONING).not.toMatch(/latest technology|fast|secure|never ship/i);
    expect(serviceCardCopy['shopify-ecommerce-development'].blurb).toMatch(
      /product pages, checkout and payment integration/,
    );
    expect(serviceCardCopy['shopify-ecommerce-development'].blurb).not.toMatch(/secure|smooth/i);
    expect(serviceCardCopy['website-redesign-modernization'].blurb).not.toMatch(
      /secure|running smoothly/i,
    );
    expect(JSON.stringify(whyPoints)).not.toMatch(
      /most of your customers|checked for speed|fast|secure/i,
    );
    expect(whyPoints.find((point) => point.title === 'Usability checks')?.body).toMatch(
      /review mobile layouts and keyboard access/,
    );
  });

  it('does not publish unsupported popularity, privacy, history, or duration claims', () => {
    const packagePreview = readFileSync('src/components/home/v2/PackagesPreview.astro', 'utf8');
    expect(packagePreview).toContain('const FEATURED =');
    expect(packagePreview).not.toMatch(/\bpopular\b/i);
    expect(packagePreview).toContain("first {foundingSlotsLabel()}.{' '}");
    const publicCopy = [
      'src/components/home/v2/PackagesPreview.astro',
      'src/pages/about.astro',
      'src/pages/contact.astro',
      'src/data/home.ts',
      'src/data/process.ts',
      'src/pages/terms.astro',
    ]
      .map((file) => readFileSync(file, 'utf8'))
      .join('\n');
    expect(publicCopy).not.toMatch(
      /Most popular|private staging|private link|three minutes|new studio|account management|most common cause/i,
    );
    const locationCopy = [
      'src/components/ui/EditorialSignal.astro',
      'src/components/hero-lab/HeroPrototype.astro',
    ]
      .map((file) => readFileSync(file, 'utf8'))
      .join('\n');
    expect(locationCopy).not.toMatch(/LAGOS|06°31|03°22/);
    expect(locationCopy).toContain("locationLine.split(' · ')[0]");
    expect(concepts.filter((concept) => concept.basis === 'reference')).toHaveLength(2);
    expect(concepts.filter((concept) => concept.basis === 'client')).toHaveLength(1);
    expect(concepts.filter((concept) => concept.basis === 'fictional')).toHaveLength(7);
  });

  it('has no social profiles until real ones are added', () => {
    expect(site.social).toEqual([]);
  });

  it('has six approach stages ending in launch & support', () => {
    const names = ['Discover', 'Plan', 'Design', 'Build', 'Review', 'Launch and Support'];
    expect(stages.map((s) => s.name)).toEqual(names);
    expect(processSteps.map((s) => s.title)).toEqual(names);
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
