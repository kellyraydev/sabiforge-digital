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

/** Homepage card thumbnails generated for the v2 homepage (docs/IMAGE-REQUESTS.md, slots 5-10). */
const homepageThumbs = import.meta.glob<ImageMetadata>('../assets/concepts/*.png', {
  eager: true,
  import: 'default',
});

/** Homepage card image: the v2 homepage thumbnail when one exists, otherwise the concept cover. */
export function conceptThumb(id: string): ImageMetadata {
  const match = Object.entries(homepageThumbs).find(([key]) =>
    key.replaceAll('\\', '/').endsWith(`/concepts/${id}.png`),
  );
  return match ? match[1] : conceptImage(id, 'cover');
}
