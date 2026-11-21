import { applyDiscount } from '@/lib/pricing';

/**
 * Packages approved by the owner on 20 November 2026 (names and prices).
 * Headline inclusions (`typically`) approved by the owner on 21 November 2026,
 * taken from docs/references/homepage-target.jpeg. Anything beyond these
 * headline items stays "Agreed in your proposal".
 *
 * Founding eligibility follows the previous discount rule: fixed package
 * prices qualify, and a "from" starting price does not. Custom Software is
 * a starting price, so it is not discounted.
 */
export const AGREED = 'Agreed in your proposal';
export const NOT_STANDARD = 'Not in standard scope';

export type EngagementModel = 'starter' | 'business' | 'store' | 'custom';

export interface WebsitePackage {
  id: string;
  name: string;
  model: EngagementModel;
  /** One-line description. Detailed scope is still agreed per project. */
  scope: string;
  bestFor: string;
  objective: string;
  /** Standard price in naira; null = custom quote. */
  price: number | null;
  fromPrice: boolean;
  foundingEligible: boolean;
  /** Owner-approved headline inclusions (21 November 2026). */
  typically: string[];
  serviceSlug: string;
}

export const packages: WebsitePackage[] = [
  {
    id: 'starter',
    name: 'Starter',
    model: 'starter',
    scope: 'Starter business website',
    bestFor: 'Businesses getting a first professional website online',
    objective: 'Look credible, explain what you do and make it easy to contact you.',
    price: 150_000,
    fromPrice: false,
    foundingEligible: true,
    typically: [
      'Up to 5 pages',
      'Mobile-friendly design',
      'Contact and WhatsApp enquiry',
      'Basic SEO setup',
    ],
    serviceSlug: 'custom-website-design-development',
  },
  {
    id: 'business',
    name: 'Business',
    model: 'business',
    scope: 'Business website',
    bestFor: 'Businesses that need more room than a starter site',
    objective: 'Explain the business more fully and give customers a clear next step.',
    price: 350_000,
    fromPrice: false,
    foundingEligible: true,
    typically: [
      'Custom page designs',
      'Services and portfolio sections',
      'Content management (CMS)',
      'Analytics setup',
    ],
    serviceSlug: 'custom-website-design-development',
  },
  {
    id: 'store',
    name: 'Online Store',
    model: 'store',
    scope: 'Online store',
    bestFor: 'Businesses that sell products online',
    objective: 'Give customers a store they can browse, with the selling setup agreed in writing.',
    price: 750_000,
    fromPrice: false,
    foundingEligible: true,
    typically: [
      'Product and category pages',
      'Shopping cart and checkout',
      'Payment integration',
      'Order management',
    ],
    serviceSlug: 'shopify-ecommerce-development',
  },
  {
    id: 'custom',
    name: 'Custom Software',
    model: 'custom',
    scope: 'Custom software and business platforms',
    bestFor: 'Businesses that need software or a platform beyond a website or store package',
    objective:
      'Scope the system properly, then quote the build. The published price is only a start.',
    price: 1_500_000,
    fromPrice: true,
    foundingEligible: false,
    typically: [
      'Portals and dashboards',
      'Booking or management systems',
      'Workflow automation',
      'Integrations and ongoing support',
    ],
    serviceSlug: 'custom-software-and-business-platforms',
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
    id: 'starter',
    name: 'Starter',
    forWhom: 'A first professional website, priced as a package.',
    packages: ['Starter'],
    priceLabel: '₦150,000',
  },
  {
    id: 'business',
    name: 'Business',
    forWhom: 'A fuller business website than the starter package.',
    packages: ['Business'],
    priceLabel: '₦350,000',
  },
  {
    id: 'store',
    name: 'Online Store',
    forWhom: 'A store for businesses that sell products.',
    packages: ['Online Store'],
    priceLabel: '₦750,000',
  },
  {
    id: 'custom',
    name: 'Custom Software',
    forWhom: 'Software and business platforms. The figure is a starting price, not a fixed quote.',
    packages: ['Custom Software'],
    priceLabel: 'From ₦1,500,000',
  },
];

/** Comparison matrix. `true` only where the owner approved the inclusion (21 November 2026); everything else stays agreed per proposal. */
export interface ComparisonRow {
  label: string;
  values: Record<WebsitePackage['id'], string | boolean>;
  note?: string;
}

export const comparisonRows: ComparisonRow[] = [
  {
    label: 'Scope',
    values: {
      starter: 'Starter business website',
      business: 'Business website',
      store: 'Online store',
      custom: 'Custom software and business platforms',
    },
  },
  {
    label: 'Price type',
    values: {
      starter: 'Fixed package price',
      business: 'Fixed package price',
      store: 'Fixed package price',
      custom: 'Starting price, not a fixed quote',
    },
  },
  {
    label: 'Pages or templates',
    values: { starter: 'Up to 5 pages', business: AGREED, store: AGREED, custom: AGREED },
  },
  {
    label: 'Responsive design',
    values: { starter: true, business: true, store: true, custom: true },
  },
  {
    label: 'Edit content yourself',
    values: { starter: AGREED, business: true, store: AGREED, custom: AGREED },
  },
  {
    label: 'Product catalogue',
    values: { starter: false, business: false, store: true, custom: AGREED },
  },
  {
    label: 'Checkout and online payments',
    values: { starter: false, business: false, store: true, custom: AGREED },
  },
  {
    label: 'Handover',
    values: { starter: AGREED, business: AGREED, store: AGREED, custom: AGREED },
  },
  {
    label: 'Revision rounds',
    values: { starter: AGREED, business: AGREED, store: AGREED, custom: AGREED },
  },
  {
    label: 'Timeline',
    values: { starter: AGREED, business: AGREED, store: AGREED, custom: AGREED },
  },
  {
    label: 'Post-launch support',
    values: { starter: AGREED, business: AGREED, store: AGREED, custom: true },
  },
  {
    label: 'Third-party costs',
    values: {
      starter: 'Quoted separately',
      business: 'Quoted separately',
      store: 'Quoted separately',
      custom: 'Quoted separately',
    },
  },
];

export const thirdPartyCosts = [
  'Domain name registration and renewal',
  'Hosting or platform subscriptions',
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
  { name: 'Content and copy support', detail: 'Structuring and writing page content with you.' },
  { name: 'Extra integrations', detail: 'Booking, CRM, messaging or other connected tools.' },
  { name: 'Website care plan', detail: 'Updates, monitoring and improvements after launch.' },
];
