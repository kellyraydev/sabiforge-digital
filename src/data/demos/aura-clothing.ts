import type { DemoDefinition } from './types';

/**
 * AURA Clothing demo (task T1): a lookbook shop that ends in an enquiry, not a checkout,
 * matching the concept's own decision ("Enquire instead of a fake purchase").
 * Fictional brand. No prices, stock counts or delivery promises.
 */
export const auraDemo: DemoDefinition = {
  slug: 'aura-clothing',
  title: 'Browse the lookbook and build an enquiry',
  intro:
    'Filter the collection, open a piece, choose a size and add it to an enquiry bag. The demo ends where a real shopper would ask the label about fit and availability.',
  reserve: { base: '104rem', sm: '76.25rem', lg: '91.25rem' },
  review: [
    {
      focus: 'Layout',
      title: 'Categories before products',
      body: 'Tailoring, ready to wear and accessories are the first choice, with a count on each. A shopper narrows the rail before scrolling, which matters on a small screen.',
    },
    {
      focus: 'Information design',
      title: 'One piece, one clear page',
      body: 'Opening a piece shows a large image, a short description, the fabric and the sizes. Nothing competes with the decision in front of the shopper.',
    },
    {
      focus: 'Usability',
      title: 'Sizes that guard against mistakes',
      body: 'Clothing asks for a size before it can be added; accessories say “One size”. The button explains what is missing instead of failing silently.',
    },
    {
      focus: 'Conversion path',
      title: 'An enquiry bag instead of a fake checkout',
      body: 'The brand is invented, so the demo stops at the honest next step: a list of pieces and sizes that would be sent to the label on WhatsApp.',
    },
    {
      focus: 'Accessibility',
      title: 'Keyboard and screen-reader friendly',
      body: 'Filters and sizes are real buttons with pressed states, focus moves to each new view, and the bag count is announced when it changes.',
    },
  ],
};

export type AuraCategory = 'tailoring' | 'ready-to-wear' | 'accessories';

export interface AuraPiece {
  id: string;
  name: string;
  category: AuraCategory;
  description: string;
  fabric: string;
  sizes: string[];
  /** Placeholder tones until the generated photo arrives (docs/IMAGE-REQUESTS.md). */
  tone: [string, string];
}

export const auraCategories: { id: AuraCategory; label: string }[] = [
  { id: 'tailoring', label: 'Tailoring' },
  { id: 'ready-to-wear', label: 'Ready to wear' },
  { id: 'accessories', label: 'Accessories' },
];

const clothing = ['XS', 'S', 'M', 'L', 'XL'];

export const auraPieces: AuraPiece[] = [
  {
    id: 'ivory-wrap-blazer',
    name: 'Ivory wrap blazer',
    category: 'tailoring',
    description: 'A soft-shouldered blazer that ties at the waist. Wear it open or closed.',
    fabric: 'Wool blend crepe',
    sizes: clothing,
    tone: ['#efe7db', '#cdb89a'],
  },
  {
    id: 'black-wide-trouser',
    name: 'Black wide-leg trouser',
    category: 'tailoring',
    description: 'High-waisted and pressed with a long front crease.',
    fabric: 'Stretch twill',
    sizes: clothing,
    tone: ['#2a2a2a', '#111111'],
  },
  {
    id: 'champagne-waistcoat',
    name: 'Champagne waistcoat',
    category: 'tailoring',
    description: 'A fitted, collarless waistcoat to layer or wear alone.',
    fabric: 'Satin-back crepe',
    sizes: clothing,
    tone: ['#e2d3bb', '#b79e7c'],
  },
  {
    id: 'silk-slip-dress',
    name: 'Silk slip dress',
    category: 'ready-to-wear',
    description: 'A bias-cut midi dress with thin adjustable straps.',
    fabric: 'Washed silk',
    sizes: clothing,
    tone: ['#d9c7ad', '#8a8175'],
  },
  {
    id: 'linen-shirt-dress',
    name: 'Linen shirt dress',
    category: 'ready-to-wear',
    description: 'A relaxed shirt dress with a self belt and deep pockets.',
    fabric: 'Washed linen',
    sizes: clothing,
    tone: ['#f3eee6', '#d4cbbd'],
  },
  {
    id: 'knit-co-ord',
    name: 'Rib-knit co-ord',
    category: 'ready-to-wear',
    description: 'A fitted top and straight skirt that work together or apart.',
    fabric: 'Cotton rib knit',
    sizes: clothing,
    tone: ['#5a524a', '#2b2724'],
  },
  {
    id: 'structured-tote',
    name: 'Structured leather tote',
    category: 'accessories',
    description: 'Room for a laptop, with an inner zip pocket.',
    fabric: 'Smooth leather',
    sizes: ['One size'],
    tone: ['#1c1a18', '#4a3f35'],
  },
  {
    id: 'gold-cuff',
    name: 'Brushed gold cuff',
    category: 'accessories',
    description: 'An open cuff with a soft brushed finish.',
    fabric: 'Gold-plated brass',
    sizes: ['One size'],
    tone: ['#e8d6a8', '#b8975a'],
  },
  {
    id: 'silk-square-scarf',
    name: 'Silk square scarf',
    category: 'accessories',
    description: 'A hand-rolled square in ivory and black.',
    fabric: 'Silk twill',
    sizes: ['One size'],
    tone: ['#f7f3ee', '#8a8175'],
  },
];
