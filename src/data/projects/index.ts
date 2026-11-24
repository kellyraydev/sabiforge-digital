import type { Blueprint } from '@/lib/blueprint';
import auraClothing from './aura-clothing/blueprint';
import maisonValeStudios from './maison-vale-studios/blueprint';
import bloomWellnessStudio from './bloom-wellness-studio/blueprint';

/** Every project with a blueprint preview. Add a blueprint file and one line here. */
export const blueprints: Blueprint[] = [auraClothing, maisonValeStudios, bloomWellnessStudio];

export function getBlueprint(slug: string): Blueprint | undefined {
  return blueprints.find((b) => b.slug === slug);
}
