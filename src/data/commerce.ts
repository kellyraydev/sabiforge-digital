import type { IconKey } from '@/lib/icons';

/**
 * Commerce offerings for /shopify. Copy states the business value and the limits of each
 * offering and promises no measured outcome: results depend on products, pricing, traffic,
 * fulfilment and many things outside a website build.
 */
export interface Offering {
  id: string;
  icon: IconKey;
  name: string;
  /** Who it is for. */
  forWhom: string;
  /** What we do. */
  what: string;
  /** Why it matters to the business. */
  value: string;
  /** Honest limits and dependencies. */
  limits: string[];
}

export const offerings: Offering[] = [
  {
    id: 'launch',
    icon: 'rocket',
    name: 'New Shopify store launch',
    forWhom:
      'First-time merchants, including dropshipping businesses, and sellers moving off WhatsApp and Instagram.',
    what: 'Store structure, collections, navigation, product templates, essential pages and policies, payments and delivery set up within platform limits, then a test order on a phone.',
    value:
      'A store that looks trustworthy on day one and that you can run yourself, instead of a half-configured admin that never quite launches.',
    limits: [
      'Shopify plan, theme, apps and payment fees are third-party costs, quoted separately.',
      'Payment and delivery options depend on your country and chosen providers; we confirm these before building.',
      'Product photography and bulk data entry are quoted separately.',
    ],
  },
  {
    id: 'redesign',
    icon: 'layers',
    name: 'Storefront redesign',
    forWhom: 'Existing stores that look dated, feel generic or lose people on mobile.',
    what: 'A review of the current storefront, then a redesigned structure and presentation, built on your existing store so products and orders stay in place.',
    value:
      'A storefront that matches the quality of the products and is easier for first-time visitors to understand.',
    limits: [
      'We review before promising anything: some problems are product, price or traffic, not design.',
      'Redesign cannot fix supplier, stock or delivery issues.',
      'Changes are bounded by what the theme and platform allow.',
    ],
  },
  {
    id: 'theme',
    icon: 'code',
    name: 'Custom theme enhancements',
    forWhom: 'Stores happy with their theme but needing particular sections, layouts or behaviour.',
    what: 'Targeted additions to a Shopify theme: custom sections, product page components, collection layouts and refinements, built to be editable by you.',
    value:
      'The distinctive details of a custom store without the cost of building a theme from nothing.',
    limits: [
      'Theme updates from the theme vendor can affect customisations, so we document what was changed.',
      'Some behaviour needs apps, which add cost and weight.',
      'Checkout customisation is limited by Shopify and by your plan.',
    ],
  },
  {
    id: 'discovery',
    icon: 'compass',
    name: 'Product discovery and navigation',
    forWhom: 'Stores whose customers cannot find or compare what they want.',
    what: 'Collection structure, menus, filters, search behaviour, product naming conventions and merchandising layouts, planned around how your customers shop.',
    value: 'People get to the right product in fewer steps, which matters most on small screens.',
    limits: [
      'Filtering depends on tidy product data (tags, types, metafields); cleaning data is a separate task.',
      'Advanced search needs an app or a higher plan in some cases.',
      'A large catalogue takes longer to restructure.',
    ],
  },
  {
    id: 'mobile',
    icon: 'phone',
    name: 'Mobile shopping experience',
    forWhom: 'Stores where most visitors arrive from social media on a phone.',
    what: 'Design and testing for small screens first: thumb-reach buttons, readable product details, sensible image sizes, and a path through cart and checkout that works one-handed.',
    value: 'The way most of your customers will actually meet your store is the way we design it.',
    limits: [
      'Shopify’s own checkout pages are controlled by the platform.',
      'We test on a range of phones, but cannot test every device in the market.',
      'Slow mobile networks affect every store; we reduce weight but can’t remove the network.',
    ],
  },
  {
    id: 'performance',
    icon: 'gauge',
    name: 'Performance optimisation',
    forWhom: 'Stores that feel slow, usually because of heavy images, apps or theme code.',
    what: 'Measure the current store, rank the issues by effect on real visitors, fix what is within our control, then measure again and show you the before and after.',
    value:
      'Faster pages are easier to use, and the measurements show whether the work made a difference.',
    limits: [
      'Third-party apps and scripts you rely on may limit what we can improve.',
      'We report measured results, not promised scores. Lab tests are not the same as real-user data.',
      'Speed is one input among many and doesn’t guarantee more sales.',
    ],
  },
  {
    id: 'conversion',
    icon: 'chart',
    name: 'Conversion-focused design',
    forWhom: 'Stores with visitors who browse and then leave.',
    what: 'Product pages that answer questions, clear delivery and returns information, trust signals you can honestly support, and fewer distractions between product and bag.',
    value:
      'Removes avoidable friction, so customers who already want to buy find it easy to do so.',
    limits: [
      'We don’t promise a conversion rate or percentage improvement.',
      'Trust signals must be real: we don’t invent reviews or badges.',
      'Meaningful testing needs enough traffic to judge.',
    ],
  },
  {
    id: 'support',
    icon: 'support',
    name: 'Integrations and ongoing support',
    forWhom: 'Stores connecting to other tools, or wanting someone to call after launch.',
    what: 'Connect supported tools where the platform allows, such as email, analytics or delivery services, and optional care for updates, fixes and small improvements.',
    value: 'Fewer manual steps, and a known person to ask when something stops working.',
    limits: [
      'We only integrate tools that are supported and appropriate; each is scoped separately.',
      'Third-party subscriptions and API changes are outside our control.',
      'Care plan terms and response times are defined per agreement.',
    ],
  },
];

export const platformRealities = [
  {
    title: 'What Shopify decides',
    detail:
      'Checkout flow, available payment methods in your region, plan features and what a theme can do.',
  },
  {
    title: 'What the apps decide',
    detail:
      'Each app adds capability, monthly cost and page weight. We recommend the fewest that do the job.',
  },
  {
    title: 'What your business decides',
    detail:
      'Product quality, pricing, photography, stock, delivery reliability and marketing, none of which a storefront can substitute for.',
  },
];
