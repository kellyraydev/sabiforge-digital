import type { Blueprint } from '@/lib/blueprint';
import auraClothing from './aura-clothing/blueprint';

/** Every project with a blueprint preview. Add a blueprint file and one line here. */
export const blueprints: Blueprint[] = [auraClothing];

export function getBlueprint(slug: string): Blueprint | undefined {
  return blueprints.find((b) => b.slug === slug);
}
