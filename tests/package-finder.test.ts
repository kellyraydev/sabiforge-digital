import { describe, expect, it } from 'vitest';
import { isComplete, questionsFor, recommend } from '../src/lib/package-finder';
import { packages } from '../src/data/packages';

describe('package finder', () => {
  it('asks follow-up questions only for a presence website', () => {
    expect(questionsFor({})).toEqual(['goal']);
    expect(questionsFor({ goal: 'sell' })).toEqual(['goal']);
    expect(questionsFor({ goal: 'present' })).toEqual(['goal', 'pages', 'selfEdit']);
    expect(isComplete({ goal: 'present', pages: 'few' })).toBe(false);
  });

  it('maps answers to the approved packages', () => {
    expect(recommend({ goal: 'sell' })?.packageId).toBe('store');
    expect(recommend({ goal: 'system' })?.packageId).toBe('custom');
    expect(recommend({ goal: 'present', pages: 'few', selfEdit: 'no' })?.packageId).toBe('starter');
    expect(recommend({ goal: 'present', pages: 'unsure', selfEdit: 'unsure' })?.packageId).toBe(
      'starter',
    );
    expect(recommend({ goal: 'present', pages: 'more', selfEdit: 'no' })?.packageId).toBe(
      'business',
    );
    expect(recommend({ goal: 'present', pages: 'few', selfEdit: 'yes' })?.packageId).toBe(
      'business',
    );
    expect(recommend({ goal: 'present' })).toBeNull();
  });

  it('every recommendation is a real package with at least one reason', () => {
    const ids = new Set(packages.map((p) => p.id));
    const cases = [
      { goal: 'sell' as const },
      { goal: 'system' as const },
      { goal: 'present' as const, pages: 'few' as const, selfEdit: 'no' as const },
      { goal: 'present' as const, pages: 'more' as const, selfEdit: 'yes' as const },
    ];
    for (const answers of cases) {
      const result = recommend(answers)!;
      expect(ids.has(result.packageId)).toBe(true);
      expect(result.reasons.length).toBeGreaterThan(0);
    }
  });
});
