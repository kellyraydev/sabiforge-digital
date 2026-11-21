import { readFileSync, existsSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { approvedServices } from '../src/data/services';

const read = (path: string) => readFileSync(path, 'utf8');

const pendingSlugs = [
  'brand-identity-creative-direction',
  'website-strategy-ux-ui-design',
  'design-systems',
  'conversion-experience-optimization',
  'performance-accessibility-technical-seo',
  'digital-integrations-workflows',
];

describe('homepage service selector', () => {
  it('replaces the price calculator and does not publish an estimate', () => {
    expect(existsSync('src/components/home/ProjectCalculator.tsx')).toBe(false);
    const page = read('src/pages/index.astro');
    const selector = read('src/components/home/ServiceSelector.astro');
    expect(page).toContain('ServiceSelector');
    expect(page).not.toContain('ProjectCalculator');
    expect(selector).not.toMatch(/460[,_]?000/);
    expect(page).not.toMatch(/460[,_]?000/);
    expect(read('src/data/packages.ts')).not.toMatch(/460[,_]?000/);
  });

  it('submits only a confirmed service into the existing enquiry form', () => {
    const selector = read('src/components/home/ServiceSelector.astro');
    expect(selector).toContain('approvedServices');
    expect(selector).toContain('action="/contact"');
    expect(selector).toContain('method="get"');
    expect(selector).toContain('name="service"');
    expect(selector).toContain('required');
    expect(approvedServices).toHaveLength(4);
    for (const slug of pendingSlugs) expect(selector).not.toContain(slug);
    for (const service of approvedServices) expect(service.approval).toBe('confirmed');
  });
});
