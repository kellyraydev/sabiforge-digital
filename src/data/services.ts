import type { IconKey } from '@/lib/icons';

export type ServiceFamilyId = 'strategy' | 'build' | 'growth';

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
    id: 'strategy',
    index: '01',
    name: 'Strategy & Brand',
    promise: 'Decide what to say, and how it should look and feel.',
    description:
      'Identity, structure and interface design, worked out before anything is built so the website has a clear job and a consistent voice.',
  },
  {
    id: 'build',
    index: '02',
    name: 'Design & Development',
    promise: 'Build the website or store your business actually needs.',
    description:
      'Custom websites, Shopify and e-commerce builds, and redesigns, engineered to be fast, responsive and easy for your team to maintain.',
  },
  {
    id: 'growth',
    index: '03',
    name: 'Website Care',
    promise: 'Keep your website maintained after launch.',
    description:
      'Practical website care and maintenance, with service levels and response times agreed for each project.',
  },
];

/**
 * confirmed — offered in approved SabiForge materials.
 * pending  — part of the expanded brief; owner to confirm delivery capability
 *            before public launch (see docs/CREATIVE-DIRECTION.md §5).
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
    slug: 'brand-identity-creative-direction',
    family: 'strategy',
    icon: 'sparkle',
    name: 'Brand Identity & Creative Direction',
    shortName: 'Brand identity',
    headline: 'A visual identity that looks <em>intentional</em> everywhere it appears.',
    summary:
      'Identity direction, visual systems, typography, colour and guidelines for businesses that need to look coherent and recognisable.',
    problem:
      'Many businesses grow with a logo made in a hurry, colours that change from flyer to flyer and no rules for how things should look. Customers notice the inconsistency, even when they cannot name it, and it makes a good business look less established than it is.',
    idealFor: [
      {
        stage: 'New businesses',
        detail: 'Founders who want to start with a considered identity rather than redo one later.',
      },
      {
        stage: 'Growing brands',
        detail: 'Businesses whose look no longer matches the quality of what they sell.',
      },
      {
        stage: 'Before a new website',
        detail: 'Teams that want the identity settled before design work begins.',
      },
    ],
    includes: [
      'Discovery conversation about your audience, positioning and competitors',
      'Creative direction: mood, tone and visual principles',
      'Logo refinement or a new mark, depending on the agreed scope',
      'Colour palette with accessible combinations',
      'Typography system for web and print',
      'Key applications such as social templates, stationery or packaging, as agreed',
    ],
    deliverables: [
      'Creative direction document',
      'Logo files for print and screen',
      'Colour and typography specifications',
      'Concise brand guidelines',
    ],
    approach: [
      {
        title: 'Listen',
        detail: 'Understand the business, the customer and what the brand must signal.',
      },
      {
        title: 'Explore',
        detail: 'Present a small number of distinct directions with the reasoning behind each.',
      },
      { title: 'Refine', detail: 'Develop the chosen direction into a working system.' },
      {
        title: 'Document',
        detail: 'Hand over files and guidelines your team and suppliers can follow.',
      },
    ],
    limitations: [
      'Trademark searches and registration are not included; we recommend legal advice.',
      'Photography, illustration commissions and print production are quoted separately.',
      'The number of initial directions and refinement rounds is set in the proposal.',
    ],
    related: [
      'website-strategy-ux-ui-design',
      'design-systems',
      'custom-website-design-development',
    ],
    conceptId: 'adun-table',
    pricing: 'Custom quote, based on the scope of the identity work.',
    approval: 'pending',
  },
  {
    slug: 'website-strategy-ux-ui-design',
    family: 'strategy',
    icon: 'compass',
    name: 'Website Strategy & UX/UI Design',
    shortName: 'Strategy & UX/UI',
    headline: 'Structure and interface design that make the next step <em>obvious</em>.',
    summary:
      'Information architecture, user flows, wireframes and responsive interface design for websites and digital products that need to be easier to use.',
    problem:
      'Websites often grow page by page until visitors cannot find what they came for. Menus get longer, important actions get buried and mobile visitors give up. Good visual design cannot fix a structure that does not match how customers make decisions.',
    idealFor: [
      {
        stage: 'Before a build',
        detail: 'Businesses planning a new website who want the structure right first.',
      },
      {
        stage: 'Redesigns',
        detail: 'Teams whose current site is confusing, cluttered or hard to use on a phone.',
      },
      {
        stage: 'Products and portals',
        detail: 'Businesses designing a tool, dashboard or customer portal.',
      },
    ],
    includes: [
      'Review of goals, audiences and existing content',
      'Sitemap and information architecture',
      'Key user journeys and conversion paths',
      'Wireframes for the main page types',
      'Responsive interface designs',
      'Clickable prototype where it helps decisions',
    ],
    deliverables: [
      'Discovery summary',
      'Sitemap and user-flow diagrams',
      'Wireframes and high-fidelity designs',
      'Prototype link and developer hand-off notes',
    ],
    approach: [
      {
        title: 'Understand',
        detail: 'Clarify who the site serves and which decisions it must support.',
      },
      { title: 'Structure', detail: 'Organise content and journeys before visual design starts.' },
      { title: 'Design', detail: 'Turn the structure into responsive interfaces in your brand.' },
      {
        title: 'Validate',
        detail: 'Walk through the prototype with you and refine what is unclear.',
      },
    ],
    limitations: [
      'Formal usability studies with recruited participants are quoted separately.',
      'Design-only engagements hand over files; development is a separate scope.',
      'Copywriting is not included unless agreed.',
    ],
    related: [
      'design-systems',
      'custom-website-design-development',
      'conversion-experience-optimization',
    ],
    conceptId: 'mend-physio',
    pricing: 'Custom quote, or included within a full website project.',
    approval: 'pending',
  },
  {
    slug: 'design-systems',
    family: 'strategy',
    icon: 'layers',
    name: 'Design Systems',
    shortName: 'Design systems',
    headline: 'Reusable components and rules so every page <em>feels</em> like one product.',
    summary:
      'Component libraries, interface patterns and documentation for businesses that need consistent, scalable digital experiences.',
    problem:
      'As more pages, campaigns and features are added, small inconsistencies multiply: five button styles, three shades of the brand colour, forms that behave differently. Each new page takes longer and looks a little less like the last.',
    idealFor: [
      { stage: 'Growing brands', detail: 'Businesses adding pages and campaigns regularly.' },
      {
        stage: 'Products',
        detail: 'Teams building dashboards, portals or apps with many screens.',
      },
      {
        stage: 'Multiple contributors',
        detail: 'Organisations where several people or suppliers produce digital work.',
      },
    ],
    includes: [
      'Audit of existing interface patterns',
      'Design tokens: colour, type, spacing, radius and motion',
      'Core component designs with states (hover, focus, error, disabled)',
      'Accessibility guidance for each component',
      'Coded components when combined with development',
      'Usage documentation',
    ],
    deliverables: [
      'Token specification',
      'Component library in design files and/or code',
      'Interaction specifications',
      'Documentation for designers and developers',
    ],
    approach: [
      { title: 'Audit', detail: 'Collect what exists and decide what to keep, merge or retire.' },
      { title: 'Define', detail: 'Establish tokens and the rules behind them.' },
      { title: 'Build', detail: 'Design and, where agreed, code the core components.' },
      { title: 'Document', detail: 'Explain when and how to use each part.' },
    ],
    limitations: [
      'Scope is defined by the number of components and platforms covered.',
      'Migrating an existing codebase to the new system is a separate engagement.',
    ],
    related: [
      'website-strategy-ux-ui-design',
      'custom-website-design-development',
      'brand-identity-creative-direction',
    ],
    conceptId: 'tallyhouse',
    pricing: 'Custom quote.',
    approval: 'pending',
  },
  {
    slug: 'custom-website-design-development',
    family: 'build',
    icon: 'monitor',
    name: 'Custom Website Design & Development',
    shortName: 'Custom websites',
    headline: 'Websites designed around your business, <em>not</em> a template.',
    summary:
      'Distinctive, responsive business websites and custom frontend builds, from a one-page launch site to multi-page sites with content management.',
    problem:
      'Templates get a site online quickly, but they rarely fit the way a specific business sells. The result looks like many other sites, loads slowly with features you do not use and is hard to change when the business evolves.',
    idealFor: [
      {
        stage: 'First-time founders',
        detail: 'A credible first website, sized to what you need now.',
      },
      {
        stage: 'Small businesses',
        detail: 'A multi-page site that explains each service and captures enquiries.',
      },
      {
        stage: 'Custom requirements',
        detail: 'Booking tools, portals or interactive features beyond a standard site.',
      },
    ],
    includes: [
      'Page structure and content plan',
      'Custom visual design in your brand',
      'Responsive development for phones, tablets and desktops',
      'Content management where the package includes it',
      'Enquiry, WhatsApp and call actions',
      'Search-friendly structure and metadata',
      'Testing across devices and browsers before launch',
    ],
    deliverables: [
      'Approved designs',
      'Staging link for review',
      'Live website',
      'Handover walkthrough',
    ],
    approach: [
      { title: 'Plan', detail: 'Agree pages, content and features in a written proposal.' },
      { title: 'Design', detail: 'Design key pages for review before development.' },
      {
        title: 'Build',
        detail:
          'Develop with modern tooling (for example Astro, React or a CMS) chosen for your needs.',
      },
      { title: 'Launch', detail: 'Test, connect your domain and hand over.' },
    ],
    limitations: [
      'Domain, hosting and paid plugins are third-party costs.',
      'Copywriting and photography are not included unless agreed.',
      'Complex custom functionality is scoped and quoted separately.',
    ],
    related: [
      'website-redesign-modernization',
      'website-strategy-ux-ui-design',
      'website-care-maintenance',
    ],
    conceptId: 'adun-table',
    pricing: 'Launch ₦120,000 · Business ₦280,000 · custom builds quoted.',
    approval: 'confirmed',
  },
  {
    slug: 'shopify-ecommerce-development',
    family: 'build',
    icon: 'cart',
    name: 'Shopify & E-commerce Development',
    shortName: 'Shopify & e-commerce',
    headline: 'Online stores that make products easy to find <em>and</em> buy.',
    summary:
      'Store setup, Shopify theme customisation, catalogues, checkout and payment integration for merchants launching or improving an online store.',
    problem:
      'Many stores lose customers before checkout: unclear navigation, weak product pages, slow mobile loading or too many steps. Others never launch because platform setup, payments and delivery options feel overwhelming.',
    idealFor: [
      {
        stage: 'New merchants',
        detail: 'Including dropshipping businesses launching their first store.',
      },
      {
        stage: 'Existing Shopify stores',
        detail: 'Merchants who want a sharper, more trustworthy storefront.',
      },
      {
        stage: 'Catalogue sellers',
        detail:
          'Businesses that sell through WhatsApp or showrooms and need a browsable catalogue.',
      },
    ],
    includes: [
      'Store structure: collections, navigation and product templates',
      'Theme customisation or a custom storefront, depending on scope',
      'Product page design for clarity and trust',
      'Payment gateway and checkout setup within platform limits',
      'Store policies and essential pages',
      'Training on managing products and orders',
    ],
    deliverables: [
      'Configured store or catalogue',
      'Customised theme or storefront',
      'Payment and shipping configuration as agreed',
      'Handover walkthrough',
    ],
    approach: [
      {
        title: 'Discover',
        detail: 'Understand products, customers, fulfilment and payment needs.',
      },
      { title: 'Structure', detail: 'Plan collections, filters and navigation.' },
      { title: 'Build', detail: 'Customise the storefront and configure the platform.' },
      { title: 'Test', detail: 'Place test orders and check every step on mobile.' },
    ],
    limitations: [
      'Checkout customisation is limited by the platform; Shopify checkout changes depend on your plan.',
      'Shopify plans, apps, themes and transaction fees are third-party costs.',
      'Product photography and bulk data entry are quoted separately.',
    ],
    related: [
      'conversion-experience-optimization',
      'website-redesign-modernization',
      'digital-integrations-workflows',
    ],
    conceptId: 'kora-home',
    pricing: 'Online Catalog ₦500,000 · Full E-commerce from ₦900,000.',
    approval: 'confirmed',
  },
  {
    slug: 'website-redesign-modernization',
    family: 'build',
    icon: 'pen',
    name: 'Website Redesign & Digital Modernization',
    shortName: 'Redesigns',
    headline: 'Bring an outdated website up to the standard of <em>your</em> business.',
    summary:
      'Redesigns for websites and Shopify stores with dated visuals, confusing journeys, inconsistent branding or poor mobile usability.',
    problem:
      'An old website quietly costs you: customers judge the business by it, important information is hard to find and updating it is a chore. Often the technology underneath also makes the site slow and difficult to change.',
    idealFor: [
      {
        stage: 'Established businesses',
        detail: 'Whose website no longer reflects how they work today.',
      },
      {
        stage: 'Shopify merchants',
        detail: 'With a store that works but looks generic or feels clumsy.',
      },
      {
        stage: 'Rebrands',
        detail: 'Businesses rolling out a new identity across their digital presence.',
      },
    ],
    includes: [
      'Review of the current site: content, structure, usability and performance',
      'Recommendations on what to keep, rewrite or remove',
      'New structure and visual design',
      'Rebuild or theme customisation, depending on platform',
      'Redirects from old pages to protect existing search visibility',
      'Launch checks and handover',
    ],
    deliverables: [
      'Site review summary',
      'Redesigned pages',
      'Redirect map',
      'Live redesigned website and handover',
    ],
    approach: [
      { title: 'Review', detail: 'Assess what works and what is holding the site back.' },
      { title: 'Redefine', detail: 'Agree priorities, structure and content changes.' },
      { title: 'Redesign', detail: 'Design and build the improved experience.' },
      {
        title: 'Relaunch',
        detail: 'Migrate carefully, redirect old URLs and monitor after launch.',
      },
    ],
    limitations: [
      'Content migration volume is agreed in the proposal.',
      'Access to the current site, domain and platform accounts is required.',
      'Search visibility can fluctuate after any relaunch; redirects reduce but cannot eliminate this.',
    ],
    related: [
      'website-strategy-ux-ui-design',
      'shopify-ecommerce-development',
      'performance-accessibility-technical-seo',
    ],
    conceptId: 'mend-physio',
    pricing: 'Custom quote after reviewing the current site.',
    approval: 'confirmed',
  },
  {
    slug: 'conversion-experience-optimization',
    family: 'growth',
    icon: 'chart',
    name: 'Conversion-Focused Experience Optimization',
    shortName: 'Conversion optimisation',
    headline: 'Find where visitors drop off, then <em>remove</em> the friction.',
    summary:
      'Research-led improvements to enquiry forms, product discovery, lead capture and checkout journeys. Changes are tested and measured, never guaranteed.',
    problem:
      'Traffic arrives but too few visitors enquire or buy. The causes are usually specific: an unclear offer, a form that asks too much, a hidden call to action, a product page that leaves questions unanswered. Guessing wastes time; looking at the evidence does not.',
    idealFor: [
      {
        stage: 'Sites with traffic',
        detail: 'Businesses getting visitors but not enough enquiries or sales.',
      },
      {
        stage: 'Online stores',
        detail: 'Merchants with drop-off between product page, cart and checkout.',
      },
      {
        stage: 'After a launch',
        detail: 'Teams ready to improve a new site based on real behaviour.',
      },
    ],
    includes: [
      'Review of analytics and key journeys, where data is available',
      'Heuristic review of pages, forms and calls to action',
      'Prioritised list of improvements with reasoning',
      'Design and implementation of agreed changes',
      'Before-and-after measurement plan',
    ],
    deliverables: [
      'Findings and prioritised recommendations',
      'Implemented improvements',
      'Measurement notes',
    ],
    approach: [
      { title: 'Measure', detail: 'Establish how the key journeys perform today.' },
      { title: 'Diagnose', detail: 'Identify likely causes of friction.' },
      { title: 'Improve', detail: 'Design and ship focused changes.' },
      { title: 'Review', detail: 'Compare results and decide the next round.' },
    ],
    limitations: [
      'Results depend on traffic volume, offer and market; no specific uplift is promised.',
      'Meaningful testing needs enough visitors; low-traffic sites rely more on expert review.',
      'Analytics access, or setup, is required for measurement.',
    ],
    related: [
      'performance-accessibility-technical-seo',
      'shopify-ecommerce-development',
      'website-strategy-ux-ui-design',
    ],
    conceptId: 'kora-home',
    pricing: 'Custom quote.',
    approval: 'pending',
  },
  {
    slug: 'performance-accessibility-technical-seo',
    family: 'growth',
    icon: 'gauge',
    name: 'Performance, Accessibility & Technical SEO',
    shortName: 'Performance & SEO',
    headline: 'A faster, more usable website that search engines can <em>understand</em>.',
    summary:
      'Audits and fixes for loading speed, accessible interactions and technical search foundations. No ranking guarantees.',
    problem:
      'Slow pages lose visitors on mobile data. Inaccessible forms and menus shut out some customers entirely. Missing metadata, broken links and poor structure make it harder for search engines to understand what you offer.',
    idealFor: [
      { stage: 'Existing websites', detail: 'Sites that feel slow or have never been audited.' },
      {
        stage: 'Before a campaign',
        detail: 'Businesses about to drive more traffic to their site.',
      },
      {
        stage: 'Public-facing services',
        detail: 'Organisations that need inclusive, accessible experiences.',
      },
    ],
    includes: [
      'Lab performance testing (Lighthouse and Core Web Vitals indicators)',
      'Image, font and script optimisation',
      'Automated and manual accessibility checks against WCAG 2.2 AA',
      'Keyboard, focus and form usability fixes',
      'Technical SEO: titles, descriptions, headings, sitemaps, structured data',
      'Broken link and redirect clean-up',
    ],
    deliverables: [
      'Audit report with measured results and test conditions',
      'Prioritised fix list',
      'Implemented fixes, as agreed',
      'Before-and-after measurements',
    ],
    approach: [
      { title: 'Measure', detail: 'Record baseline results and how they were tested.' },
      { title: 'Prioritise', detail: 'Rank issues by impact on real users.' },
      { title: 'Fix', detail: 'Implement improvements within the platform’s limits.' },
      { title: 'Verify', detail: 'Re-test and document what changed.' },
    ],
    limitations: [
      'Search rankings depend on many factors outside the website; none are guaranteed.',
      'Automated scans do not prove full accessibility compliance; manual review is part of the work.',
      'Some platform or third-party scripts cannot be fully optimised.',
    ],
    related: [
      'conversion-experience-optimization',
      'website-care-maintenance',
      'website-redesign-modernization',
    ],
    conceptId: 'tallyhouse',
    pricing: 'Custom quote, starting with an audit.',
    approval: 'pending',
  },
  {
    slug: 'website-care-maintenance',
    family: 'growth',
    icon: 'support',
    name: 'Website Care & Maintenance',
    shortName: 'Care & maintenance',
    headline: 'Someone <em>reliable</em> looking after your website after launch.',
    summary:
      'Ongoing technical maintenance, content updates, monitoring and incremental improvements for businesses that want their website looked after.',
    problem:
      'Websites need attention after launch: updates, broken links, new content, small fixes and the occasional emergency. Without someone responsible, small issues pile up until the site needs another redesign.',
    idealFor: [
      { stage: 'After launch', detail: 'Clients who want continuity once their project is live.' },
      { stage: 'Busy teams', detail: 'Businesses without in-house technical staff.' },
      {
        stage: 'Evolving sites',
        detail: 'Businesses that regularly add products, pages or campaigns.',
      },
    ],
    includes: [
      'Platform, theme and dependency updates',
      'Content and product updates within an agreed allowance',
      'Uptime and error monitoring',
      'Backups, where the platform allows',
      'Small improvements and fixes',
      'A regular summary of work done',
    ],
    deliverables: [
      'Agreed monthly allowance of work',
      'Maintenance log',
      'Periodic recommendations',
    ],
    approach: [
      { title: 'Agree', detail: 'Define the allowance, response times and priorities.' },
      { title: 'Maintain', detail: 'Keep the site updated, monitored and working.' },
      { title: 'Improve', detail: 'Use spare allowance for planned improvements.' },
      { title: 'Report', detail: 'Summarise what was done and what is next.' },
    ],
    limitations: [
      'Service levels, response times and monthly allowances are defined per agreement.',
      'Large new features fall outside the care allowance and are quoted separately.',
      'Third-party platform outages are outside our control.',
    ],
    related: [
      'performance-accessibility-technical-seo',
      'conversion-experience-optimization',
      'digital-integrations-workflows',
    ],
    pricing: 'Plans are defined per agreement. Pricing not yet published.',
    approval: 'confirmed',
  },
  {
    slug: 'digital-integrations-workflows',
    family: 'growth',
    icon: 'code',
    name: 'Digital Integrations & Workflow Solutions',
    shortName: 'Integrations',
    headline: 'Connect your website to the tools your business <em>already</em> uses.',
    summary:
      'Scoped integrations such as enquiry workflows, CMS connections, customer messaging tools and supported business automations.',
    problem:
      'Enquiries arrive by email, WhatsApp and phone and get lost between them. Orders are copied by hand into spreadsheets. The website works, but the work around it is manual and error-prone.',
    idealFor: [
      {
        stage: 'Growing teams',
        detail: 'Businesses whose enquiries or orders are handled by several people.',
      },
      {
        stage: 'Online stores',
        detail: 'Merchants connecting stores to messaging, inventory or accounting tools.',
      },
      { stage: 'Service businesses', detail: 'Businesses that need booking or intake workflows.' },
    ],
    includes: [
      'Mapping of the current workflow and the tools involved',
      'Recommendation of a practical, supported integration approach',
      'Implementation of agreed integrations',
      'Testing with real scenarios',
      'Documentation of how the workflow runs',
    ],
    deliverables: ['Workflow map', 'Implemented integration', 'Test record and documentation'],
    approach: [
      { title: 'Map', detail: 'Understand how information moves today.' },
      { title: 'Choose', detail: 'Select supported tools and methods.' },
      { title: 'Connect', detail: 'Build and test the integration.' },
      { title: 'Document', detail: 'Write down how it works and who owns it.' },
    ],
    limitations: [
      'Integrations depend on the third-party service’s API, plan and terms.',
      'Subscription costs for connected tools are third-party costs.',
      'Each integration is scoped individually; there is no “all integrations” package.',
    ],
    related: [
      'shopify-ecommerce-development',
      'website-care-maintenance',
      'custom-website-design-development',
    ],
    conceptId: 'mend-physio',
    pricing: 'Custom quote per integration.',
    approval: 'pending',
  },
];

/** Services approved for public pages. Pending definitions remain available for internal review. */
export const approvedServices = services.filter((service) => service.approval === 'confirmed');

export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

/** Related services that are approved for public pages; pending ones are never linked. */
export function approvedRelated(service: Service): Service[] {
  return service.related
    .map((slug) => getService(slug))
    .filter((item): item is Service => item?.approval === 'confirmed');
}

export function servicesInFamily(family: ServiceFamilyId): Service[] {
  return approvedServices.filter((service) => service.family === family);
}

export const serviceHref = (slug: string) => `/services/${slug}`;
