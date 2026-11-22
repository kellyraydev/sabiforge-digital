import type { Concept } from '@/data/concepts';
import type { DemoDefinition } from './types';
import { corporateDemo } from './corporate-digital-modernization';

export type { DemoDefinition, ReviewStep } from './types';

/**
 * Concepts with a live demo at /work/<slug>/demo. Tasks T1-T10 add one entry each,
 * plus a component in src/components/demo/DemoIsland.tsx.
 */
export const demos: DemoDefinition[] = [corporateDemo];

export function getDemo(slug: string): DemoDefinition | undefined {
  return demos.find((demo) => demo.slug === slug);
}

/**
 * Persistent honesty badge. Concepts based on an existing business are not "fictional",
 * so they get wording that says what they actually are.
 */
export function demoBadge(concept: Pick<Concept, 'basis'>): string {
  return concept.basis === 'reference'
    ? 'Concept demo: uncommissioned, not this business’s official website'
    : 'Concept demo: fictional brand, not a live client';
}
