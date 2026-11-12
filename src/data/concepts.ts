/**
 * Studio concepts — fictional brands designed by SabiForge to explore
 * design problems. These are NOT client projects and must always be
 * labelled as concepts wherever they appear.
 */
export type PlateVariant = 'editorial' | 'commerce' | 'service' | 'product' | 'brand';
export type ConceptFilterCategory = 'Business websites' | 'E-commerce' | 'Product interfaces';

export interface Concept {
  id: string;
  name: string;
  category: string;
  filterCategory: ConceptFilterCategory;
  plate: PlateVariant;
  challenge: string;
  approach: string;
  explores: string[];
  /** Long-form study shown on /work. All content is speculative design material. */
  study: ConceptStudy;
}

export interface ConceptStudy {
  /** Display capability: the single design skill this concept is chosen to demonstrate. */
  capability: string;
  /** Editorial one-liner for the chapter heading. May contain one <em>. */
  headline: string;
  /** The business problem, in the voice of the fictional business. */
  brief: string;
  /** Who the fictional design is for. */
  audience: string;
  decisions: { title: string; detail: string }[];
  palette: { name: string; hex: string }[];
  type: { role: string; face: string }[];
  /** What this concept cannot show, stated plainly. */
  limits: string;
  /** Service pages in the real offer that this concept supports. */
  services: string[];
  /** Chapter surface colours (backgrounds are the concept's own; text is picked for contrast). */
  theme: { bg: string; fg: string; accent: string; muted: string; tone: 'dark' | 'light' };
}

export const CONCEPT_LABEL = 'Studio concept';
export const CONCEPT_DISCLAIMER =
  'Fictional brand created by SabiForge to explore a design problem. Not a client project.';

export const concepts: Concept[] = [
  {
    id: 'adun-table',
    name: 'Àdùn Table',
    category: 'Brand-led business website',
    filterCategory: 'Business websites',
    plate: 'editorial',
    challenge:
      'A restaurant and events caterer whose menus circulate as blurry WhatsApp images, with catering enquiries arriving without dates, guest numbers or budgets.',
    approach:
      'An editorial menu that reads well on a phone, photography-led storytelling, and a short catering enquiry flow that asks for the details the kitchen needs.',
    explores: ['Editorial art direction', 'Menu information design', 'Structured enquiries'],
    study: {
      capability: 'Editorial art direction',
      headline: 'A menu people <em>forward</em>, not one they squint at.',
      brief:
        'Àdùn Table is a fictional Lagos kitchen and events caterer. Its menu lives in screenshots and its catering enquiries start with “how much for 80 people?”, with no date, venue or budget attached.',
      audience:
        'Hosts planning a wedding or birthday, and office managers ordering for a team, mostly browsing on a phone.',
      decisions: [
        {
          title: 'Typeset the menu like a printed one',
          detail:
            'A serif display face for dish names, tabular prices and dotted leaders. It reads like a menu card, and the text stays selectable, searchable and translatable.',
        },
        {
          title: 'Let one image carry the mood',
          detail:
            'A single graphic plate and warm terracotta set the tone. Fewer images load, and the page stays fast on mobile data.',
        },
        {
          title: 'Ask for what the kitchen needs',
          detail:
            'The catering enquiry asks for date, guest count, venue area and budget range up front, so the first reply can be a useful one.',
        },
      ],
      palette: [
        { name: 'Ink', hex: '#2A1A14' },
        { name: 'Terracotta', hex: '#B4532A' },
        { name: 'Amber', hex: '#E8A24A' },
        { name: 'Leaf', hex: '#3F6B2A' },
        { name: 'Paper', hex: '#F6EFE4' },
      ],
      type: [
        { role: 'Display', face: 'Instrument Serif, italic for emphasis' },
        { role: 'Text', face: 'Inter' },
        { role: 'Labels', face: 'JetBrains Mono, capitals, wide tracking' },
      ],
      limits:
        'Photography is represented by a graphic plate. A real project would be built around real food photography, which a concept cannot supply.',
      services: ['brand-identity-creative-direction', 'custom-website-design-development'],
      theme: { bg: '#2a1a14', fg: '#f6efe4', accent: '#e8a24a', muted: '#d8c9b6', tone: 'dark' },
    },
  },
  {
    id: 'kora-home',
    name: 'Kòrà Home',
    category: 'E-commerce storefront',
    filterCategory: 'E-commerce',
    plate: 'commerce',
    challenge:
      'A homeware brand selling hand-dyed textiles, where customers on mobile struggle to compare colours, sizes and care details before buying.',
    approach:
      'Collection filters by colour and room, product pages that answer questions up front, and a checkout path with as few steps as the platform allows.',
    explores: ['Product discovery', 'Product page clarity', 'Mobile checkout'],
    study: {
      capability: 'Product discovery and commerce',
      headline: 'Colour and size, <em>answered</em> before the question is asked.',
      brief:
        'Kòrà Home is a fictional homeware brand selling hand-dyed throws and cushions. Shoppers on phones cannot tell how an indigo differs from a deep blue, which size fits a single bed or how to wash it.',
      audience:
        'Gift buyers and home-makers shopping on mobile, often comparing two or three products at once.',
      decisions: [
        {
          title: 'Make the variant the hero',
          detail:
            'Colour swatches sit directly under the price and change the main image. Selecting a size updates the price immediately, with no hidden step.',
        },
        {
          title: 'Answer care and delivery on the page',
          detail:
            'Washing instructions, dye notes and delivery information are short and sit next to the buy button, not in a footer link.',
        },
        {
          title: 'Keep the add-to-bag target large and stable',
          detail:
            'A full-width button stays in thumb reach on mobile, and the bag count confirms the action without navigating away.',
        },
      ],
      palette: [
        { name: 'Indigo', hex: '#23305E' },
        { name: 'Ink', hex: '#1D2240' },
        { name: 'Ochre', hex: '#B36B2C' },
        { name: 'Marigold', hex: '#D79A2B' },
        { name: 'Linen', hex: '#EFE7DA' },
      ],
      type: [
        { role: 'Display', face: 'Bricolage Grotesque, semibold' },
        { role: 'Text', face: 'Inter' },
        { role: 'Specifications', face: 'JetBrains Mono' },
      ],
      limits:
        'The demonstration runs on sample data. It shows product-page design, not a connected checkout, payment provider or stock system.',
      services: ['shopify-ecommerce-development', 'conversion-experience-optimization'],
      theme: { bg: '#1d2240', fg: '#efe7da', accent: '#d79a2b', muted: '#c9c4d6', tone: 'dark' },
    },
  },
  {
    id: 'mend-physio',
    name: 'Mend Physio Studio',
    category: 'Service-business experience',
    filterCategory: 'Business websites',
    plate: 'service',
    challenge:
      'A physiotherapy clinic where first-time patients are anxious, unsure which treatment they need and hesitant to call.',
    approach:
      'Plain-language condition guides, transparent “what to expect” content and an appointment request that works without a phone call.',
    explores: ['Trust-building content', 'Service navigation', 'Booking request flow'],
    study: {
      capability: 'Trust-building service design',
      headline: 'A first visit that feels <em>explained</em>.',
      brief:
        'Mend Physio Studio is a fictional clinic. First-time patients do not know whether their problem is “the kind you see a physio for”, what the first appointment involves, or whether they must phone.',
      audience:
        'Adults with a new or recurring ache, often worried, researching on their phone before they decide to book.',
      decisions: [
        {
          title: 'Start from the worry, not the service list',
          detail:
            'Entry points are in a patient’s own words: “back and neck”, “sports injury”, “after surgery”. Each leads to a plain-language “what to expect” page.',
        },
        {
          title: 'Describe the visit before, during and after',
          detail:
            'A short three-part outline removes the unknowns: what to bring, what happens in the room and what you leave with.',
        },
        {
          title: 'Let people request rather than call',
          detail:
            'The appointment request offers likely openings and needs only a name and a contact detail, so it works for people who avoid phone calls.',
        },
      ],
      palette: [
        { name: 'Forest', hex: '#173A31' },
        { name: 'Sage', hex: '#E4ECE6' },
        { name: 'Clay', hex: '#E8956D' },
        { name: 'White', hex: '#FFFFFF' },
      ],
      type: [
        { role: 'Display', face: 'Bricolage Grotesque, tight tracking' },
        { role: 'Text', face: 'Inter, generous line height' },
      ],
      limits:
        'The wording is illustrative. Health information on a real clinic site must come from the clinic’s qualified practitioners, and a concept supplies none.',
      services: ['website-strategy-ux-ui-design', 'custom-website-design-development'],
      theme: { bg: '#e4ece6', fg: '#173a31', accent: '#8a3b18', muted: '#2f5c4f', tone: 'light' },
    },
  },
  {
    id: 'tallyhouse',
    name: 'Tallyhouse',
    category: 'Product interface',
    filterCategory: 'Product interfaces',
    plate: 'product',
    challenge:
      'An invoicing tool for small businesses whose owners mostly work from their phones, between customers.',
    approach:
      'A dashboard that leads with what needs attention today, large touch targets and reusable interface patterns for dense financial data.',
    explores: ['Dashboard hierarchy', 'Responsive data', 'Design-system components'],
    study: {
      capability: 'Product interface and reusable patterns',
      headline: 'What needs you today, <em>first</em>.',
      brief:
        'Tallyhouse is a fictional invoicing app. Owners check it between customers on a phone. Existing tools open on a wall of totals and make them hunt for the one overdue invoice.',
      audience:
        'Owners of small businesses who issue invoices themselves and need to know who owes what, quickly.',
      decisions: [
        {
          title: 'Lead with what is outstanding',
          detail:
            'One large figure, a seven-day trend and a short “needs attention” list. Everything else sits one tap away.',
        },
        {
          title: 'Make status unmistakable without relying on colour alone',
          detail:
            'Every status has a text label as well as a colour, so it holds up in sunlight and for colour-blind users.',
        },
        {
          title: 'Build it from a small set of components',
          detail:
            'Cards, rows, chips and one primary button, with spacing and colour defined once as tokens, so the product stays consistent as it grows.',
        },
      ],
      palette: [
        { name: 'Night', hex: '#0B1020' },
        { name: 'Navy', hex: '#14213D' },
        { name: 'Cloud', hex: '#F4F6FB' },
        { name: 'Lime', hex: '#C6F36B' },
        { name: 'Signal', hex: '#A3301F' },
      ],
      type: [
        { role: 'Interface', face: 'Inter, tabular figures for amounts' },
        { role: 'Metadata', face: 'JetBrains Mono' },
      ],
      limits:
        'The demonstration filters sample invoices only. A real product also needs accounting rules, tax handling and security work that a concept does not attempt.',
      services: ['design-systems', 'website-strategy-ux-ui-design'],
      theme: { bg: '#0b1020', fg: '#f4f6fb', accent: '#c6f36b', muted: '#b9c2d9', tone: 'dark' },
    },
  },
];

export function getConcept(id: string): Concept | undefined {
  return concepts.find((concept) => concept.id === id);
}
