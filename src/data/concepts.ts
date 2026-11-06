/**
 * Studio concepts — fictional brands designed by SabiForge to explore
 * design problems. These are NOT client projects and must always be
 * labelled as concepts wherever they appear.
 */
export type PlateVariant = 'editorial' | 'commerce' | 'service' | 'product' | 'brand';

export interface Concept {
  id: string;
  name: string;
  category: string;
  plate: PlateVariant;
  challenge: string;
  approach: string;
  explores: string[];
}

export const CONCEPT_LABEL = 'Studio concept';
export const CONCEPT_DISCLAIMER =
  'Fictional brand created by SabiForge to explore a design problem. Not a client project.';

export const concepts: Concept[] = [
  {
    id: 'adun-table',
    name: 'Àdùn Table',
    category: 'Brand-led business website',
    plate: 'editorial',
    challenge:
      'A restaurant and events caterer whose menus circulate as blurry WhatsApp images, with catering enquiries arriving without dates, guest numbers or budgets.',
    approach:
      'An editorial menu that reads well on a phone, photography-led storytelling, and a short catering enquiry flow that asks for the details the kitchen needs.',
    explores: ['Editorial art direction', 'Menu information design', 'Structured enquiries'],
  },
  {
    id: 'kora-home',
    name: 'Kòrà Home',
    category: 'E-commerce storefront',
    plate: 'commerce',
    challenge:
      'A homeware brand selling hand-dyed textiles, where customers on mobile struggle to compare colours, sizes and care details before buying.',
    approach:
      'Collection filters by colour and room, product pages that answer questions up front, and a checkout path with as few steps as the platform allows.',
    explores: ['Product discovery', 'Product page clarity', 'Mobile checkout'],
  },
  {
    id: 'mend-physio',
    name: 'Mend Physio Studio',
    category: 'Service-business experience',
    plate: 'service',
    challenge:
      'A physiotherapy clinic where first-time patients are anxious, unsure which treatment they need and hesitant to call.',
    approach:
      'Plain-language condition guides, transparent “what to expect” content and an appointment request that works without a phone call.',
    explores: ['Trust-building content', 'Service navigation', 'Booking request flow'],
  },
  {
    id: 'tallyhouse',
    name: 'Tallyhouse',
    category: 'Product interface',
    plate: 'product',
    challenge:
      'An invoicing tool for small businesses whose owners mostly work from their phones, between customers.',
    approach:
      'A dashboard that leads with what needs attention today, large touch targets and a design system that keeps dense financial data readable.',
    explores: ['Dashboard hierarchy', 'Responsive data', 'Design-system components'],
  },
];

export function getConcept(id: string): Concept | undefined {
  return concepts.find((concept) => concept.id === id);
}
