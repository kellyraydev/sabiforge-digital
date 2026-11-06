import { applyDiscount } from '@/lib/pricing';

export type IconName =
  | 'monitor'
  | 'cart'
  | 'truck'
  | 'shopify'
  | 'layers'
  | 'wrench'
  | 'handshake'
  | 'compass'
  | 'sparkle'
  | 'chart'
  | 'chat'
  | 'clipboard'
  | 'pen'
  | 'code'
  | 'rocket'
  | 'support'
  | 'map'
  | 'phone'
  | 'shield'
  | 'graduation'
  | 'gauge'
  | 'tag';

export interface Service {
  id: string;
  icon: IconName;
  title: string;
  summary: string;
  points: string[];
}

export const services: Service[] = [
  {
    id: 'business-websites',
    icon: 'monitor',
    title: 'Business websites',
    summary: 'A credible, fast home for your brand that turns searches into enquiries.',
    points: ['Mobile-first layouts', 'WhatsApp & call buttons', 'Search-ready structure'],
  },
  {
    id: 'ecommerce',
    icon: 'cart',
    title: 'E-commerce stores',
    summary: 'Online stores with product management, checkout and order handling.',
    points: ['Naira pricing & checkout', 'Payment gateway setup', 'Order notifications'],
  },
  {
    id: 'dropshipping',
    icon: 'truck',
    title: 'Dropshipping websites',
    summary: 'Niche stores structured for supplier catalogues and repeatable launches.',
    points: ['Niche store setup', 'Product import workflow', 'Conversion-focused pages'],
  },
  {
    id: 'shopify',
    icon: 'shopify',
    title: 'Shopify redesigns',
    summary: 'Refresh an existing Shopify store so it looks sharper and sells better.',
    points: ['Theme customisation', 'Navigation clean-up', 'Speed & UX fixes'],
  },
  {
    id: 'custom-apps',
    icon: 'layers',
    title: 'Custom web applications',
    summary: 'Booking tools, dashboards and portals built around how you work.',
    points: ['Discovery & scoping', 'Secure user accounts', 'Built to grow'],
  },
  {
    id: 'maintenance',
    icon: 'wrench',
    title: 'Maintenance & support',
    summary: 'Updates, backups, fixes and content changes after your site goes live.',
    points: ['Content updates', 'Monitoring & fixes', 'Ongoing improvements'],
  },
  {
    id: 'collaboration',
    icon: 'handshake',
    title: 'Developer collaboration',
    summary: 'Extra frontend capacity for agencies and developers with client work to deliver.',
    points: ['Frontend builds', 'UI implementation', 'Clear hand-off'],
  },
];

export interface Benefit {
  icon: IconName;
  title: string;
  body: string;
}

export const benefits: Benefit[] = [
  {
    icon: 'map',
    title: 'Built for the Nigerian market',
    body: 'Naira pricing, WhatsApp-first contact and pages designed for how your customers actually browse — mostly on their phones.',
  },
  {
    icon: 'gauge',
    title: 'Fast on real connections',
    body: 'Lean pages, optimised images and modern tooling so your site loads quickly on mobile data, not just office Wi-Fi.',
  },
  {
    icon: 'tag',
    title: 'Clear, upfront pricing',
    body: 'Published starting prices and a written proposal before work begins. Third-party costs are itemised separately.',
  },
  {
    icon: 'graduation',
    title: 'You stay in control',
    body: 'Hands-on training so you can update products, prices and content yourself — without waiting on a developer.',
  },
  {
    icon: 'chart',
    title: 'Designed to convert',
    body: 'Every layout decision points visitors toward a call, a WhatsApp chat, an enquiry or a purchase.',
  },
  {
    icon: 'support',
    title: 'Support after launch',
    body: 'Launch is the beginning. Ongoing maintenance and improvement options keep your site working as you grow.',
  },
];

export interface WebsitePackage {
  id: string;
  icon: IconName;
  name: string;
  summary: string;
  /** Standard price in naira. */
  price: number;
  /** Eligible for the founding-client discount. */
  foundingEligible: boolean;
  /** Price is a starting point; final figure comes from discovery. */
  fromPrice?: boolean;
  features: string[];
  featured?: boolean;
}

export const packages: WebsitePackage[] = [
  {
    id: 'launch',
    icon: 'monitor',
    name: 'Launch',
    summary: 'One-page professional business website.',
    price: 120_000,
    foundingEligible: true,
    features: [
      'Single scrolling page',
      'Mobile-first, responsive design',
      'WhatsApp, call & email buttons',
      'Basic on-page SEO setup',
    ],
  },
  {
    id: 'business',
    icon: 'layers',
    name: 'Business',
    summary: 'Up to 6 pages with an easy-to-use CMS.',
    price: 280_000,
    foundingEligible: true,
    featured: true,
    features: [
      'Up to 6 custom pages',
      'Content you can edit yourself',
      'Enquiry form & Google Maps',
      'Training session included',
    ],
  },
  {
    id: 'catalog',
    icon: 'tag',
    name: 'Online Catalog',
    summary: 'Products, filters and owner-editable listings.',
    price: 500_000,
    foundingEligible: true,
    features: [
      'Product catalogue with filters',
      'Owner-editable listings',
      'Order-by-WhatsApp enquiries',
      'Category & search pages',
    ],
  },
  {
    id: 'ecommerce',
    icon: 'cart',
    name: 'Full E-commerce',
    summary: 'Checkout, payments, products and orders.',
    price: 900_000,
    foundingEligible: false,
    fromPrice: true,
    features: [
      'Cart & secure checkout',
      'Payment gateway integration',
      'Product & order management',
      'Customer order notifications',
    ],
  },
];

export function foundingPrice(pkg: WebsitePackage): number {
  return pkg.foundingEligible ? applyDiscount(pkg.price) : pkg.price;
}

export interface ProcessStep {
  id: string;
  icon: IconName;
  title: string;
  summary: string;
  detail: string;
  youGet: string[];
}

export const processSteps: ProcessStep[] = [
  {
    id: 'consult',
    icon: 'chat',
    title: 'Consult',
    summary: 'Tell us your goals and needs.',
    detail:
      'A focused conversation — on WhatsApp, a call or in writing — about your business, customers and what the website must achieve.',
    youGet: ['Clarity on the right package', 'Honest advice on scope'],
  },
  {
    id: 'plan',
    icon: 'clipboard',
    title: 'Plan',
    summary: 'A clear proposal and timeline.',
    detail:
      'We confirm pages, features, content and third-party costs in a written proposal so there are no surprises later.',
    youGet: ['Written scope & price', 'Agreed timeline'],
  },
  {
    id: 'design',
    icon: 'pen',
    title: 'Design',
    summary: 'A modern, branded website design.',
    detail:
      'Layouts are designed around your brand and your customers, then shared for feedback before development starts.',
    youGet: ['Design preview to approve', 'Revision rounds'],
  },
  {
    id: 'build',
    icon: 'code',
    title: 'Build',
    summary: 'Develop and test your website.',
    detail:
      'The approved design is built with modern tooling and tested on real phones and browsers for speed and usability.',
    youGet: ['Staging link to review', 'Mobile & browser testing'],
  },
  {
    id: 'launch',
    icon: 'rocket',
    title: 'Launch',
    summary: 'Go live and start attracting customers.',
    detail:
      'We connect your domain, run final checks and make sure enquiries and payments reach you before announcing the launch.',
    youGet: ['Domain & hosting setup', 'Launch checklist'],
  },
  {
    id: 'support',
    icon: 'support',
    title: 'Support',
    summary: 'Training, updates and ongoing help.',
    detail:
      'You get a walkthrough of managing your site, plus options for maintenance and improvements as the business grows.',
    youGet: ['Owner training', 'Maintenance options'],
  },
];
