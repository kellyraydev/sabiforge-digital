import type { ImageMetadata } from 'astro';

const files = import.meta.glob<ImageMetadata>('../assets/concepts/*/*.webp', {
  eager: true,
  import: 'default',
});

export type ConceptImageKind = 'cover' | 'detail-hero' | 'desktop-ui' | 'mobile-ui';

export function conceptImage(id: string, kind: ConceptImageKind): ImageMetadata {
  const match = Object.entries(files).find(([key]) =>
    key.replaceAll('\\', '/').endsWith(`/concepts/${id}/${kind}.webp`),
  );
  if (!match) throw new Error(`Missing concept image for ${id}/${kind}`);
  return match[1];
}
