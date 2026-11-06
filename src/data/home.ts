import type { IconKey } from '@/lib/icons';

/** Section 03 — the ingredients of a strong website. */
export const ingredients = [
  { name: 'Brand perception', detail: 'What people believe about you in the first few seconds.' },
  { name: 'Business strategy', detail: 'What the website must achieve, and how you will know.' },
  { name: 'Customer understanding', detail: 'The questions visitors arrive with, in their words.' },
  { name: 'Visual communication', detail: 'Typography, imagery and layout that carry meaning.' },
  { name: 'User experience', detail: 'Clear paths from interest to action, on every screen.' },
  { name: 'Engineering quality', detail: 'Fast, accessible, maintainable code underneath.' },
  {
    name: 'Conversion fundamentals',
    detail: 'Offers, proof and next steps placed where they matter.',
  },
];

/** Section 06 — project lifecycle. */
export interface Stage {
  id: string;
  name: string;
  summary: string;
  happens: string;
  youBring: string[];
  weDeliver: string[];
  gate: string;
}

export const stages: Stage[] = [
  {
    id: 'discover',
    name: 'Discover',
    summary: 'Understand the business before designing anything.',
    happens:
      'A focused conversation about your goals, customers, competitors and constraints. For larger projects this includes a short review of your current site and materials.',
    youBring: [
      'Your goals and priorities',
      'Examples you like and dislike',
      'Access to any existing site',
    ],
    weDeliver: ['A recommended approach', 'Honest advice on scope and budget'],
    gate: 'You decide whether to request a proposal.',
  },
  {
    id: 'define',
    name: 'Define',
    summary: 'Agree scope, structure and cost in writing.',
    happens:
      'We turn what we learned into a written proposal: pages or templates, features, content responsibilities, timeline, price and third-party costs.',
    youBring: ['Feedback on the proposal', 'Decisions on priorities'],
    weDeliver: ['Written proposal', 'Sitemap or feature list', 'Project timeline'],
    gate: 'Proposal approved before design begins.',
  },
  {
    id: 'design',
    name: 'Design',
    summary: 'Shape the experience in your brand.',
    happens:
      'Key pages are designed for mobile and desktop, building on your brand. You see real layouts with real content, not just mood boards.',
    youBring: ['Content and images, or a plan for them', 'Consolidated feedback'],
    weDeliver: ['Responsive page designs', 'Design rationale'],
    gate: 'Designs approved before development.',
  },
  {
    id: 'develop',
    name: 'Develop',
    summary: 'Build it properly.',
    happens:
      'The approved design is built with modern, maintainable tooling. You get a private staging link to follow progress on your own devices.',
    youBring: ['Platform and domain access where needed', 'Final content'],
    weDeliver: ['Staging website', 'Content management setup where included'],
    gate: 'Staging review.',
  },
  {
    id: 'refine',
    name: 'Refine',
    summary: 'Test, polish and fix before anyone else sees it.',
    happens:
      'We test across phones, tablets and desktops, check keyboard access and contrast, test forms and checkout flows, and work through your agreed revisions.',
    youBring: ['Review on your own devices', 'Final revision list'],
    weDeliver: ['Tested, revised website', 'Launch checklist'],
    gate: 'Launch approval.',
  },
  {
    id: 'launch',
    name: 'Launch & Support',
    summary: 'Go live, hand over and keep improving.',
    happens:
      'We connect your domain, run final checks, confirm enquiries or orders reach you and walk you through managing the site. Ongoing care is available if you want it.',
    youBring: ['Domain and account access', 'Time for the handover session'],
    weDeliver: ['Live website', 'Handover walkthrough and notes', 'Care options'],
    gate: 'Project closed, or moved to ongoing care.',
  },
];

/** Section 07 — differentiators phrased as client benefits. */
export const differentiators: { title: string; benefit: string; icon: IconKey }[] = [
  {
    title: 'Design grounded in business goals',
    benefit:
      'Every major design decision is tied to something the website must achieve, so you can see why it is there.',
    icon: 'compass',
  },
  {
    title: 'Custom creative direction',
    benefit:
      'Your site is designed for your brand and customers, not adapted from a template other businesses also use.',
    icon: 'sparkle',
  },
  {
    title: 'Responsive by default',
    benefit:
      'Layouts are designed for phones first, because that is where most of your customers will meet you.',
    icon: 'phone',
  },
  {
    title: 'Transparent scope',
    benefit:
      'Pages, features, responsibilities and third-party costs are written down before work starts.',
    icon: 'clipboard',
  },
  {
    title: 'Collaborative development',
    benefit:
      'Staging links and approval gates mean you see progress and make decisions at the right moments.',
    icon: 'chat',
  },
  {
    title: 'Performance and accessibility awareness',
    benefit:
      'Pages are checked for speed, contrast and keyboard access, so more people can use them comfortably.',
    icon: 'gauge',
  },
  {
    title: 'Clear handover',
    benefit:
      'You get a walkthrough and notes on how to manage your website, so you are not dependent on us for every change.',
    icon: 'graduation',
  },
  {
    title: 'Room to keep improving',
    benefit:
      'Care and optimisation options are there when you need them, without being a condition of the project.',
    icon: 'chart',
  },
];

/** Section 05 — audience pathways. */
export interface Pathway {
  id: string;
  label: string;
  situation: string;
  recommendation: string;
  services: string[];
  packageHint?: string;
}

export const pathways: Pathway[] = [
  {
    id: 'founder',
    label: 'I’m launching my first business website',
    situation:
      'You need to look credible and be easy to contact, without over-investing on day one.',
    recommendation: 'Start with a focused, well-designed site you can grow into.',
    services: ['custom-website-design-development', 'brand-identity-creative-direction'],
    packageHint: 'The Launch package (₦120,000) is designed for this.',
  },
  {
    id: 'small-business',
    label: 'My business has no proper website yet',
    situation:
      'Customers find you through referrals and social media, but there is nowhere to send them.',
    recommendation: 'A multi-page site that explains each service and captures enquiries.',
    services: ['custom-website-design-development', 'website-strategy-ux-ui-design'],
    packageHint: 'The Business package (₦280,000) covers up to six pages with a CMS.',
  },
  {
    id: 'redesign',
    label: 'Our current website needs a redesign',
    situation: 'The site looks dated, is hard to update or does not work well on phones.',
    recommendation: 'Review what works, then redesign the structure and presentation together.',
    services: ['website-redesign-modernization', 'performance-accessibility-technical-seo'],
  },
  {
    id: 'merchant',
    label: 'I sell products, or run a Shopify store',
    situation: 'You want customers to browse, compare and buy more easily, including on mobile.',
    recommendation: 'A catalogue or store built around how your customers shop.',
    services: ['shopify-ecommerce-development', 'conversion-experience-optimization'],
    packageHint: 'Online Catalog ₦500,000 · Full E-commerce from ₦900,000.',
  },
  {
    id: 'growing',
    label: 'We’re a growing brand that needs to stand out',
    situation: 'The business has momentum, but the brand and website feel generic.',
    recommendation: 'Sharpen the identity, then express it consistently across the site.',
    services: [
      'brand-identity-creative-direction',
      'design-systems',
      'conversion-experience-optimization',
    ],
  },
  {
    id: 'complex',
    label: 'Our requirements are more complex',
    situation: 'Portals, integrations, multiple audiences or ongoing product work.',
    recommendation: 'A tailored studio partnership, scoped after discovery.',
    services: [
      'website-strategy-ux-ui-design',
      'digital-integrations-workflows',
      'website-care-maintenance',
    ],
  },
];
