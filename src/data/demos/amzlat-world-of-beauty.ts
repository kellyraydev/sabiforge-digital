import type { DemoDefinition } from './types';

export const amzlatDemo: DemoDefinition = {
  slug: 'amzlat-world-of-beauty',
  title: 'Shop by category and build an enquiry',
  intro:
    'Switch between the reference categories, add product types to an enquiry list and review it. Product types are unbranded, with no prices, claims or stock.',
  reserve: { base: '54.5rem', sm: '35.5rem', lg: '38.5rem' },
  review: [
    {
      focus: 'Information design',
      title: 'The reference taxonomy',
      body: 'Makeup, skincare, hair and fashion come first, then body care and manicure and pedicure, as on the supplied reference.',
    },
    {
      focus: 'Trust',
      title: 'Product types, not borrowed brands',
      body: 'Tiles name the type of product only. No third-party brand, ingredient or cosmetic claim appears.',
    },
    {
      focus: 'Conversion path',
      title: 'Enquire instead of checkout',
      body: 'The list ends in an enquiry because prices and stock are not part of this uncommissioned concept.',
    },
    {
      focus: 'Visual design',
      title: 'Pink, cream, black and gold',
      body: 'The palette from the reference keeps the shop recognisable without republishing the old page.',
    },
  ],
};
