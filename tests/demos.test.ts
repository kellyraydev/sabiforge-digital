import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { concepts } from '@/data/concepts';
import { demos, demoBadge, getDemo } from '@/data/demos';
import { corporateContent } from '@/data/demos/corporate-digital-modernization';

describe('concept demos (T11 shell)', () => {
  it('every demo belongs to an approved concept', () => {
    const ids = new Set(concepts.map((c) => c.id));
    for (const demo of demos) expect(ids.has(demo.slug)).toBe(true);
  });

  it('every demo has a guided review of at least three steps', () => {
    for (const demo of demos) {
      expect(demo.review.length).toBeGreaterThanOrEqual(3);
      for (const step of demo.review) {
        expect(step.focus && step.title && step.body).toBeTruthy();
      }
    }
  });

  it('every demo is registered in the lazy island', () => {
    const island = readFileSync('src/components/demo/DemoIsland.tsx', 'utf8');
    for (const demo of demos) expect(island).toContain(`'${demo.slug}': lazy(`);
  });

  it('badge says fictional only for fictional concepts', () => {
    expect(demoBadge({ basis: 'fictional' })).toMatch(/fictional brand, not a live client/);
    expect(demoBadge({ basis: 'client' })).toMatch(/^Client project demo/);
    const reference = demoBadge({ basis: 'reference' });
    expect(reference).toMatch(/uncommissioned/);
    expect(reference).not.toMatch(/fictional/);
  });

  it('the reference demo exists and names no real organisation', () => {
    const demo = getDemo('corporate-digital-modernization');
    expect(demo).toBeDefined();
    // The copy a visitor sees: no metrics, awards or client claims.
    const visible = JSON.stringify({ demo, corporateContent });
    expect(visible).not.toMatch(/\d+\s?%|award|clients? (?:include|like)|trusted by/i);
  });

  it('concept names use plain letters without accents', () => {
    for (const c of concepts) expect(c.name).toMatch(/^[\x20-\x7E]+$/);
  });
});
