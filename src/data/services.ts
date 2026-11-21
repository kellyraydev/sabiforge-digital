import type { IconKey } from '@/lib/icons';

/**
 * The current homepage and footer still lay services out in three groups.
 * Those groups are only a layout holder until the visual rebuild.
 * The approved catalogue is the four services below.
 */
export type ServiceFamilyId = 'websites' | 'platforms' | 'care';

export interface ServiceFamily {
  id: ServiceFamilyId;
  index: string;
  name: string;
  /** Short line used in directories. */
  promise: string;
  description: string;
}

export const serviceFamilies: ServiceFamily[] = [
  {
    id: 'websites',
    index: '01',
    name: 'Business websites',
    promise: 'A professional website that explains the business and makes contact easy.',
    description:
      'Business websites for a first public presence or a fuller site. Page count and features are confirmed in the written proposal.',
  },
  {
    id: 'platforms',
    index: '02',
    name: 'Stores and software',
    promise: 'Sell products online, or build software the business runs on.',
    description:
      'Online stores at a package price, and custom software quoted from a starting price. Platform and feature scope are confirmed in the proposal.',
  },
  {
    id: 'care',
    index: '03',
    name: 'Redesign and support',
    promise: 'Improve a site you already have, and keep it useful after launch.',
    description:
      'Website redesign and ongoing support. The work is scoped after a look at the current site.',
  },
];

/**
 * confirmed — offered in the approved 20 November 2026 catalogue.
 * pending  — not approved for public marketing.
 */
export type ApprovalStatus = 'confirmed' | 'pending';

export interface Service {
  slug: string;
  family: ServiceFamilyId;
  icon: IconKey;
  name: string;
  /** Short name for navigation and chips. */
  shortName: string;
  /** Headline; may contain one <em> for the editorial accent. */
  headline: string;
  summary: string;
  problem: string;
  idealFor: { stage: string; detail: string }[];
  includes: string[];
  deliverables: string[];
  approach: { title: string; detail: string }[];
  limitations: string[];
  related: string[];
  conceptId?: string;
  pricing: string;
  approval: ApprovalStatus;
}

export const services: Service[] = [
  {
    slug: 'business-websites',
    family: 'websites',
    icon: 'monitor',
    name: 'Business Websites',
    shortName: 'Business websites',
    headline: 'A business website built to be <em>clear</em> and credible.',
    summary:
      'Professional business websites that explain what you do and give customers a straightforward way to get in touch.',
    problem:
      'Without a proper website, customers who hear about a business have nowhere reliable to check what it offers or how to reach it.',
    idealFor: [
      {
        stage: 'First website',
        detail: 'Businesses that need a credible public site sized to what they need now.',
      },
      {
        stage: 'Established businesses',
        detail: 'Teams that need more room to explain their services.',
      },
    ],
    includes: [
      'A business website planned around your services and customers',
      'Layouts that work on phones and larger screens',
      'Clear contact actions',
      'Pages and features confirmed in a written proposal before work starts',
    ],
    deliverables: [
      'Written proposal',
      'Designs for review',
      'Staging link',
      'Live website and handover walkthrough',
    ],
    approach: [
      {
        title: 'Discover',
        detail: 'Understand the business, the customer and the goal of the site.',
      },
      { title: 'Plan', detail: 'Agree scope, pages and price in writing.' },
      { title: 'Build', detail: 'Design and develop the approved site.' },
      { title: 'Launch', detail: 'Test, connect the domain and hand the site over.' },
    ],
    limitations: [
      'Domain, hosting and paid plugins are third-party costs.',
      'Copywriting and photography are included only when the proposal says so.',
      'The Starter and Business package prices cover the published package, not unlimited extra pages.',
    ],
    related: [
      'online-stores',
      'website-redesign-and-support',
      'custom-software-and-business-platforms',
    ],
    conceptId: 'adun-table',
    pricing: 'Starter ₦150,000 · Business ₦350,000.',
    approval: 'confirmed',
  },
  {
    slug: 'online-stores',
    family: 'platforms',
    icon: 'cart',
    name: 'Online Stores',
    shortName: 'Online stores',
    headline: 'An online store that makes products easier to <em>browse</em>.',
    summary:
      'Online stores for businesses that sell products. The selling platform, checkout and payments are confirmed in the proposal.',
    problem:
      'A business that sells products needs a store customers can understand on a phone, with a clear path from product to purchase. Platform setup, payments and delivery choices are easy to get wrong without a written scope.',
    idealFor: [
      {
        stage: 'New stores',
        detail: 'Businesses launching a first online store.',
      },
      {
        stage: 'Existing stores',
        detail: 'Merchants who need a clearer, more trustworthy storefront.',
      },
    ],
    includes: [
      'Store structure and product presentation',
      'A path toward purchase, within the limits of the chosen platform',
      'Essential store pages agreed in the proposal',
      'A handover on how to manage products',
    ],
    deliverables: [
      'Written proposal',
      'Configured store',
      'Staging or preview for review',
      'Handover walkthrough',
    ],
    approach: [
      {
        title: 'Discover',
        detail: 'Understand the products, customers and how orders are fulfilled.',
      },
      { title: 'Plan', detail: 'Agree platform, catalogue scope and payment approach in writing.' },
      { title: 'Build', detail: 'Design and configure the storefront.' },
      { title: 'Test', detail: 'Check the agreed purchase path before launch.' },
    ],
    limitations: [
      'Platform subscriptions, apps, themes and payment fees are third-party costs.',
      'Checkout limits depend on the platform and plan. That choice is an open scope item until the proposal names it.',
      'Product photography and bulk data entry are quoted separately.',
    ],
    related: [
      'business-websites',
      'custom-software-and-business-platforms',
      'website-redesign-and-support',
    ],
    conceptId: 'kora-home',
    pricing: 'Online Store ₦750,000.',
    approval: 'confirmed',
  },
  {
    slug: 'custom-software-and-business-platforms',
    family: 'platforms',
    icon: 'code',
    name: 'Custom Software and Business Platforms',
    shortName: 'Custom software',
    headline: 'Custom software, scoped from a <em>starting</em> price.',
    summary:
      'Custom software and business platforms for work that does not fit a standard website or store package. The published figure is a starting price, never a fixed quote.',
    problem:
      'Some businesses need a tool, portal or workflow that a brochure site or a standard store cannot cover. That work has to be scoped before anyone can name a final price.',
    idealFor: [
      {
        stage: 'Operational tools',
        detail: 'Teams that need software for a specific business process.',
      },
      {
        stage: 'Platforms',
        detail: 'Projects with more than one audience, such as a portal or internal tool.',
      },
    ],
    includes: [
      'A discovery conversation before any build',
      'A written scope and a quoted price based on that scope',
      'The agreed software, built and reviewed in stages',
      'Handover notes for the agreed system',
    ],
    deliverables: [
      'Discovery notes',
      'Written proposal with a quoted price',
      'Staged build for review',
      'Handover for the agreed scope',
    ],
    approach: [
      { title: 'Discover', detail: 'Map the problem, the users and the constraints.' },
      {
        title: 'Quote',
        detail: 'Turn the starting price into a fixed proposal only after scope is clear.',
      },
      { title: 'Build', detail: 'Develop the agreed system.' },
      { title: 'Hand over', detail: 'Review, document and hand over what was agreed.' },
    ],
    limitations: [
      '₦1,500,000 is a starting price. It is not a fixed quote.',
      'The founding-client discount does not apply to this starting price.',
      'Third-party services, licences and hosting are quoted separately.',
    ],
    related: ['online-stores', 'business-websites', 'website-redesign-and-support'],
    conceptId: 'tallyhouse',
    pricing: 'From ₦1,500,000. Final price follows discovery.',
    approval: 'confirmed',
  },
  {
    slug: 'website-redesign-and-support',
    family: 'care',
    icon: 'wrench',
    name: 'Website Redesign and Ongoing Support',
    shortName: 'Redesign and support',
    headline: 'Redesign the site you have, then <em>support</em> it.',
    summary:
      'Website redesign for a site that no longer fits the business, plus ongoing support after launch when you want it.',
    problem:
      'An older site can be hard to use on a phone, hard to update, or no longer a fair picture of the business. After launch, someone still has to look after it.',
    idealFor: [
      {
        stage: 'Redesign',
        detail: 'Businesses whose current site looks dated or is difficult to change.',
      },
      {
        stage: 'After launch',
        detail: 'Teams that want agreed support once a site is live.',
      },
    ],
    includes: [
      'A review of the current site before recommending a redesign',
      'A redesigned site scoped in a written proposal',
      'Ongoing support only when a support arrangement is agreed',
      'Handover so routine updates are understood',
    ],
    deliverables: [
      'Site review and recommendation',
      'Written proposal',
      'Redesigned site, if approved',
      'Support arrangement, if agreed',
    ],
    approach: [
      { title: 'Review', detail: 'Look at what the current site does well and where it fails.' },
      { title: 'Plan', detail: 'Agree what will change, and what will wait.' },
      { title: 'Redesign', detail: 'Design and build the approved changes.' },
      { title: 'Support', detail: 'Hand over, then continue only under an agreed support scope.' },
    ],
    limitations: [
      'There is no published fixed price for redesign or support. Both are scoped per site.',
      'Support does not include unlimited new features.',
      'Third-party platform fees stay with the client.',
    ],
    related: ['business-websites', 'online-stores', 'custom-software-and-business-platforms'],
    conceptId: 'mend-physio',
    pricing: 'Scoped in a written proposal. Not a fixed package price.',
    approval: 'confirmed',
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

export function servicesInFamily(family: ServiceFamilyId): Service[] {
  return services.filter((service) => service.family === family);
}

export const serviceHref = (slug: string) => `/services/${slug}`;
