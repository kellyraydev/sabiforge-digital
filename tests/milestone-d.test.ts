import { describe, expect, it } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { concepts, CONCEPT_DISCLAIMER } from '../src/data/concepts';
import { getService } from '../src/data/services';
import { stages } from '../src/data/home';
import { stageDetails, getStageDetail } from '../src/data/process';
import { offerings } from '../src/data/commerce';
import { decisions, getDecision, decisionsFor, LEGAL_STATUS } from '../src/data/legal';
import { navigation } from '../src/data/site';

const pageFor = (href: string) => {
  const path = href.split('#')[0].replace(/^\//, '');
  const direct = `src/pages/${path || 'index'}.astro`;
  return existsSync(direct) ? direct : `src/pages/${path}/index.astro`;
};

describe('studio concept studies', () => {
  it('gives every concept a complete study with real related services', () => {
    for (const c of concepts) {
      const s = c.study;
      expect(s.decisions.length, c.id).toBeGreaterThanOrEqual(3);
      expect(s.palette.length, c.id).toBeGreaterThanOrEqual(4);
      expect(s.limits.length, c.id).toBeGreaterThan(20);
      expect(s.theme.tone).toMatch(/dark|light/);
      for (const slug of s.services) expect(getService(slug), slug).toBeDefined();
      expect((s.headline.match(/<em>/g) ?? []).length, c.id).toBe(1);
    }
  });

  it('keeps fictional and reference disclosures distinct', () => {
    expect(CONCEPT_DISCLAIMER).toMatch(/Fictional/);
    expect(CONCEPT_DISCLAIMER).toMatch(/Not a client project/);
    const reference = concepts.filter((concept) => concept.basis === 'reference');
    const fictional = concepts.filter((concept) => concept.basis === 'fictional');
    expect(reference.map((concept) => concept.id)).toEqual([
      'amzlat-world-of-beauty',
      'opeyemi-phones-gadgets',
    ]);
    expect(fictional).toHaveLength(7);
    for (const concept of reference) {
      expect(`${concept.summary} ${concept.study.brief}`).not.toMatch(/fictional/i);
      expect(concept.summary).toMatch(/existing business/);
    }
  });

  it('uses valid hex colours', () => {
    for (const c of concepts) {
      for (const p of c.study.palette) expect(p.hex).toMatch(/^#[0-9A-F]{6}$/i);
      for (const v of [c.study.theme.bg, c.study.theme.fg, c.study.theme.accent])
        expect(v).toMatch(/^#[0-9a-f]{6}$/i);
    }
  });
});

describe('process page data', () => {
  it('has a detail record for each of the six stages, in order', () => {
    expect(stageDetails.map((d) => d.id)).toEqual(stages.map((s) => s.id));
    for (const s of stages) {
      const d = getStageDetail(s.id)!;
      expect(d.activities.length).toBeGreaterThanOrEqual(3);
      expect(d.responsibility.you.length).toBeGreaterThan(0);
      expect(d.responsibility.us.length).toBeGreaterThan(0);
    }
  });

  it('never promises a number of days, weeks or revision rounds', () => {
    const text = JSON.stringify(stageDetails);
    expect(text).not.toMatch(/\b\d+\s*(days?|weeks?|business days)\b/i);
    expect(text).not.toMatch(/\b(one|two|three|\d)\s+(free\s+)?revision rounds?\b/i);
  });
});

describe('commerce offerings', () => {
  it('states limits for every offering and promises no outcomes', () => {
    expect(offerings).toHaveLength(8);
    for (const o of offerings) {
      expect(o.limits.length, o.id).toBeGreaterThanOrEqual(2);
    }
    const text = JSON.stringify(offerings);
    expect(text).not.toMatch(/\bwe guarantee\b|\bguaranteed\b/i);
    expect(text).not.toMatch(/\d+\s?%/);
  });
});

describe('legal drafts', () => {
  it('has unique decision references covering both documents', () => {
    expect(new Set(decisions.map((d) => d.id)).size).toBe(decisions.length);
    expect(decisionsFor('privacy').length).toBeGreaterThanOrEqual(10);
    expect(decisionsFor('terms').length).toBeGreaterThanOrEqual(12);
  });

  it('is marked as unapproved and unreviewed', () => {
    expect(LEGAL_STATUS.approved).toBe(false);
    expect(LEGAL_STATUS.reviewedByCounsel).toBe(false);
  });

  it('references only decisions that exist, and surfaces every one on its page', () => {
    for (const [file, doc] of [
      ['src/pages/privacy.astro', 'privacy'],
      ['src/pages/terms.astro', 'terms'],
    ] as const) {
      const src = readFileSync(file, 'utf8');
      const used = [...src.matchAll(/<DecisionNote id="([PT]\d+)"/g)].map((m) => m[1]);
      for (const id of used) expect(getDecision(id)?.document, id).toBe(doc);
      for (const d of decisionsFor(doc)) expect(used, `${d.id} unused`).toContain(d.id);
    }
  });

  it('does not state invented legal terms such as a governing law or fixed refund window', () => {
    const src =
      readFileSync('src/pages/terms.astro', 'utf8') +
      readFileSync('src/pages/privacy.astro', 'utf8');
    expect(src).not.toMatch(/governed by the laws of/i);
    expect(src).not.toMatch(/within \d+ days/i);
  });
});

describe('navigation', () => {
  it('links every item to a page that exists', () => {
    for (const item of navigation) expect(existsSync(pageFor(item.href)), item.href).toBe(true);
  });
});
