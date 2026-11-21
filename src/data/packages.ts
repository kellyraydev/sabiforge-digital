import { applyDiscount } from '@/lib/pricing';

/**
 * Approved packages (source: SabiForge flyer). Names, prices and the
 * one-line scope are owner-approved. Anything marked AGREED is not yet
 * defined by the owner and is shown as "Agreed in your proposal".
 */
export const AGREED = 'Agreed in your proposal';
export const NOT_STANDARD = 'Not in standard scope';

export type EngagementModel = 'launch' | 'growth' | 'commerce' | 'partnership';

export interface WebsitePackage {
  id: string;
  name: string;
  model: EngagementModel;
  /** Approved one-line scope from the flyer. */
  scope: string;
  bestFor: string;
  objective: string;
  /** Standard price in naira; null = custom quote. */
  price: number | null;
  fromPrice: boolean;
  foundingEligible: boolean;
  /** Indicative inclusions — drafted, pending owner confirmation. */
  typically: string[];
  serviceSlug: string;
}

export const packages: WebsitePackage[] = [
  {
    id: 'launch',
    name: 'Launch',
    model: 'launch',
    scope: 'One-page professional business website',
    bestFor: 'Founders and small businesses getting online for the first time',
    objective: 'Look credible, explain what you do and make it easy to contact you.',
    price: 120_000,
    fromPrice: false,
    foundingEligible: true,
    typically: [
      'A single, well-structured scrolling page',
      'Mobile-first responsive design',
      'WhatsApp, call and email actions',
      'Search-friendly page structure',
    ],
    serviceSlug: 'custom-website-design-development',
  },
  {
    id: 'business',
    name: 'Business',
    model: 'growth',
    scope: 'Up to 6 pages, business website + CMS',
    bestFor: 'Established small businesses that need room to explain services properly',
    objective: 'Give each service its own page and let your team update content.',
    price: 280_000,
    fromPrice: false,
    foundingEligible: true,
    typically: [
      'Up to six designed pages',
      'Content management so you can edit text and images',
      'Enquiry routes for each service',
      'Handover walkthrough',
    ],
    serviceSlug: 'custom-website-design-development',
  },
  {
    id: 'catalog',
    name: 'Online Catalog',
    model: 'commerce',
    scope: 'Products, filters, owner-editable listings',
    bestFor: 'Product businesses that sell through conversation, showroom or WhatsApp',
    objective: 'Help customers browse and shortlist products before they get in touch.',
    price: 500_000,
    fromPrice: false,
    foundingEligible: true,
    typically: [
      'Product catalogue with categories and filters',
      'Listings you can add and edit yourself',
      'Product enquiry actions',
      'Handover walkthrough',
    ],
    serviceSlug: 'shopify-ecommerce-development',
  },
  {
    id: 'ecommerce',
    name: 'Full E-commerce',
    model: 'commerce',
    scope: 'Checkout, payments, products + orders',
    bestFor: 'Merchants ready to take orders and payments online',
    objective: 'Run a complete store: products, cart, checkout, payments and order handling.',
    price: 900_000,
    fromPrice: true,
    foundingEligible: false,
    typically: [
      'Storefront, cart and checkout',
      'Payment gateway integration',
      'Product and order management',
      'Custom quote after discovery',
    ],
    serviceSlug: 'shopify-ecommerce-development',
  },
];

export function foundingPrice(pkg: WebsitePackage): number | null {
  if (pkg.price === null) return null;
  return pkg.foundingEligible ? applyDiscount(pkg.price) : pkg.price;
}

export interface EngagementModelInfo {
  id: EngagementModel;
  name: string;
  forWhom: string;
  packages: string[];
  priceLabel: string;
}

export const engagementModels: EngagementModelInfo[] = [
  {
    id: 'launch',
    name: 'Launch',
    forWhom: 'A first, professional presence that is quick to get right.',
    packages: ['Launch'],
    priceLabel: '₦120,000',
  },
  {
    id: 'growth',
    name: 'Growth',
    forWhom: 'A fuller website for a business that has outgrown a single page.',
    packages: ['Business'],
    priceLabel: '₦280,000',
  },
  {
    id: 'commerce',
    name: 'Commerce',
    forWhom: 'Catalogues and stores for businesses that sell products.',
    packages: ['Online Catalog', 'Full E-commerce'],
    priceLabel: 'From ₦500,000',
  },
  {
    id: 'partnership',
    name: 'Custom scope',
    forWhom: 'One of our services when a published package is not a fit.',
    packages: ['Custom scope'],
    priceLabel: 'Custom quote',
  },
];

/** Comparison matrix — values use approved wording where it exists. */
export interface ComparisonRow {
  label: string;
  values: Record<WebsitePackage['id'], string | boolean>;
  note?: string;
}

export const comparisonRows: ComparisonRow[] = [
  {
    label: 'Scope',
    values: {
      launch: 'One-page professional business website',
      business: 'Up to 6 pages, business website + CMS',
      catalog: 'Products, filters, owner-editable listings',
      ecommerce: 'Checkout, payments, products + orders',
    },
  },
  {
    label: 'Pages or templates',
    values: {
      launch: '1 scrolling page',
      business: 'Up to 6 pages',
      catalog: AGREED,
      ecommerce: AGREED,
    },
  },
  {
    label: 'Responsive design',
    values: { launch: true, business: true, catalog: true, ecommerce: true },
  },
  {
    label: 'Edit content yourself',
    values: {
      launch: NOT_STANDARD,
      business: 'CMS included',
      catalog: 'Owner-editable listings',
      ecommerce: 'Product & order management',
    },
  },
  {
    label: 'Product catalogue & filters',
    values: { launch: false, business: false, catalog: true, ecommerce: true },
  },
  {
    label: 'Checkout & online payments',
    values: { launch: false, business: false, catalog: false, ecommerce: true },
  },
  {
    label: 'Handover & training',
    values: { launch: true, business: true, catalog: true, ecommerce: true },
  },
  {
    label: 'Revision rounds',
    values: { launch: AGREED, business: AGREED, catalog: AGREED, ecommerce: AGREED },
  },
  {
    label: 'Timeline',
    values: { launch: AGREED, business: AGREED, catalog: AGREED, ecommerce: AGREED },
  },
  {
    label: 'Post-launch support',
    values: { launch: AGREED, business: AGREED, catalog: AGREED, ecommerce: AGREED },
  },
  {
    label: 'Third-party costs',
    values: {
      launch: 'Quoted separately',
      business: 'Quoted separately',
      catalog: 'Quoted separately',
      ecommerce: 'Quoted separately',
    },
  },
];

export const thirdPartyCosts = [
  'Domain name registration and renewal',
  'Hosting or platform subscriptions (for example a Shopify plan)',
  'Premium themes, plugins and apps',
  'Payment-gateway transaction fees',
  'Licensed photography, illustration or fonts',
  'Email, SMS or messaging service charges',
];

export const commonExclusions = [
  'Copywriting and product photography, unless agreed',
  'Bulk product data entry beyond the agreed amount',
  'Paid advertising and ad spend',
  'Ongoing maintenance after the agreed support period',
];

export const addOns = [
  { name: 'Additional pages or templates', detail: 'For content beyond the package scope.' },
  { name: 'Brand identity', detail: 'Logo refinement, colour and type system, guidelines.' },
  { name: 'Content and copy support', detail: 'Structuring and writing page content with you.' },
  { name: 'Extra integrations', detail: 'Booking, CRM, messaging or other connected tools.' },
  { name: 'Website care plan', detail: 'Updates, monitoring and improvements after launch.' },
];
