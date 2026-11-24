import { describe, expect, it } from 'vitest';
import { blueprints, getBlueprint } from '../src/data/projects';
import { concepts } from '../src/data/concepts';

describe('project blueprints', () => {
  it('every blueprint matches a concept and a slug lookup', () => {
    const ids = new Set(concepts.map((c) => c.id));
    for (const bp of blueprints) {
      expect(ids.has(bp.slug)).toBe(true);
      expect(getBlueprint(bp.slug)).toBe(bp);
    }
  });

  it('every page has a path, title and at least one section; images carry alt text', () => {
    for (const bp of blueprints) {
      expect(bp.pages.length).toBeGreaterThan(0);
      for (const page of bp.pages) {
        expect(page.path.startsWith('/')).toBe(true);
        expect(page.title.length).toBeGreaterThan(0);
        expect(page.sections.length).toBeGreaterThan(0);
        for (const section of page.sections) {
          if (section.type === 'hero' && section.image) expect(section.image.alt).toBeTruthy();
          if (section.type === 'product-grid')
            for (const p of section.products) if (p.image) expect(p.image.alt).toBeTruthy();
          if (section.type === 'gallery')
            for (const img of section.images) expect(img.alt).toBeTruthy();
        }
      }
    }
  });

  it('a fictional blueprint never claims to be a real business', () => {
    const aura = getBlueprint('aura-clothing')!;
    expect(aura.basis).toBe('fictional');
    expect(JSON.stringify(aura)).not.toMatch(/official website|real client|in stock|₦/i);
  });
});
