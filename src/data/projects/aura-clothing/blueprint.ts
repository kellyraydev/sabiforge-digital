import { defineBlueprint } from '@/lib/blueprint';

/**
 * AURA Clothing: first project blueprint (prototype). Fictional fashion label — minimal tailoring
 * shown as a lookbook. Images resolve from src/assets/projects/aura-clothing/ when present; until
 * then each slot shows a themed placeholder. Required images are in docs/IMAGE-REQUESTS.md.
 */
export default defineBlueprint({
  slug: 'aura-clothing',
  name: 'AURA',
  basis: 'fictional',
  tagline: 'Minimal tailoring and quiet accessories, shown as a lookbook.',
  theme: {
    bg: '#F7F3EE',
    surface: '#FFFFFF',
    ink: '#111111',
    muted: '#5c554d',
    accent: '#111111',
    accentInk: '#F7F3EE',
    display: 'instrument-serif',
    body: 'inter',
    radius: '0.5rem',
  },
  share: { subdomain: 'aura', noindex: true },
  nav: [
    { label: 'Lookbook', to: '/' },
    { label: 'Shop', to: '/shop' },
    { label: 'About', to: '/about' },
  ],
  pages: [
    {
      path: '/',
      title: 'Lookbook',
      sections: [
        {
          type: 'hero',
          eyebrow: 'Autumn collection',
          headline: 'Dress with less.',
          sub: 'A small wardrobe of tailored pieces in ivory, black and champagne. Made to layer, made to last.',
          image: {
            file: 'hero.webp',
            alt: 'Model in an ivory wrap blazer against a warm studio wall',
          },
          cta: { label: 'Shop the collection', to: '/shop' },
          secondaryCta: { label: 'Our story', to: '/about' },
        },
        {
          type: 'gallery',
          title: 'The look',
          images: [
            { file: 'look-01.webp', alt: 'Ivory wrap blazer worn open over a silk slip dress' },
            { file: 'look-02.webp', alt: 'Black wide-leg trousers with a champagne waistcoat' },
            { file: 'look-03.webp', alt: 'Rib-knit co-ord in dark stone, full length' },
            { file: 'look-04.webp', alt: 'Structured leather tote resting on a linen bench' },
            { file: 'look-05.webp', alt: 'Silk slip dress on a wooden hanger in daylight' },
            { file: 'look-06.webp', alt: 'Brushed gold cuff on folded ivory linen' },
          ],
        },
        {
          type: 'cta',
          headline: 'New pieces every season, never many at once.',
          sub: 'Join the list for first access. No noise.',
          cta: { label: 'Shop now', to: '/shop' },
        },
      ],
    },
    {
      path: '/shop',
      title: 'Shop',
      sections: [
        {
          type: 'product-grid',
          title: 'The collection',
          intro: 'Eight pieces, built to work together. Tailoring, ready to wear and accessories.',
          island: 'enquiry-bag',
          products: [
            {
              name: 'Ivory wrap blazer',
              caption: 'Wool-blend crepe',
              image: { file: 'product-blazer.webp', alt: 'Ivory wrap blazer, ghost mannequin' },
            },
            {
              name: 'Black wide-leg trouser',
              caption: 'Stretch twill',
              image: {
                file: 'product-trouser.webp',
                alt: 'Black wide-leg trousers, ghost mannequin',
              },
            },
            {
              name: 'Champagne waistcoat',
              caption: 'Satin-back crepe',
              image: {
                file: 'product-waistcoat.webp',
                alt: 'Champagne collarless waistcoat, ghost mannequin',
              },
            },
            {
              name: 'Silk slip dress',
              caption: 'Washed silk',
              image: { file: 'product-slip.webp', alt: 'Champagne silk slip dress on a hanger' },
            },
            {
              name: 'Linen shirt dress',
              caption: 'Washed linen',
              image: {
                file: 'product-shirtdress.webp',
                alt: 'Ivory linen shirt dress, ghost mannequin',
              },
            },
            {
              name: 'Rib-knit co-ord',
              caption: 'Cotton rib knit',
              image: {
                file: 'product-coord.webp',
                alt: 'Dark stone rib-knit top and skirt, flat-laid',
              },
            },
            {
              name: 'Structured leather tote',
              caption: 'Smooth leather',
              image: {
                file: 'product-tote.webp',
                alt: 'Black structured leather tote, three-quarter angle',
              },
            },
            {
              name: 'Brushed gold cuff',
              caption: 'Gold-plated brass',
              image: { file: 'product-cuff.webp', alt: 'Open brushed-gold cuff on linen' },
            },
          ],
        },
      ],
    },
    {
      path: '/about',
      title: 'About',
      sections: [
        {
          type: 'hero',
          eyebrow: 'Our story',
          headline: 'Fewer, better things.',
          sub: 'AURA is a small studio making considered pieces in natural fabrics. We release little and often, so nothing is wasted.',
          image: {
            file: 'about.webp',
            alt: 'Folded garments and fabric swatches on a studio table',
          },
        },
        {
          type: 'feature-grid',
          title: 'How we work',
          items: [
            {
              title: 'Natural fabrics',
              body: 'Wool, linen, silk and cotton, chosen to wear in rather than out.',
            },
            {
              title: 'Small runs',
              body: 'Limited pieces each season, so colours and fabrics stay considered.',
            },
            { title: 'Made to last', body: 'Classic cuts you can wear for years, not one season.' },
          ],
        },
      ],
    },
  ],
});
