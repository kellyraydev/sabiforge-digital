/**
 * Single source of truth for agency facts used across the site.
 * Only verified details belong here: no testimonials, clients, projects,
 * social accounts or registration details until they actually exist.
 */
export const site = {
  name: 'SabiForge Digital',
  tagline: "Built for business. Ready for what's next.",
  description:
    'SabiForge Digital designs and builds professional websites, online stores and custom web applications for businesses in Nigeria.',
  locale: 'en_NG',
  market: 'Nigeria',
  contact: {
    whatsappDisplay: '+234 903 843 0068',
    whatsappNumber: '2349038430068',
    phoneHref: 'tel:+2349038430068',
    email: 'kellyray.dev@gmail.com',
  },
} as const;

export function whatsappLink(
  message = "Hello SabiForge Digital, I'd like to discuss a website.",
): string {
  return `https://wa.me/${site.contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function mailtoLink(subject = 'Website enquiry'): string {
  return `mailto:${site.contact.email}?subject=${encodeURIComponent(subject)}`;
}

/** Navigation targets the homepage sections until dedicated pages ship. */
export const navigation = [
  { label: 'Services', href: '/#services' },
  { label: 'Why us', href: '/#why-us' },
  { label: 'Pricing', href: '/#pricing' },
  { label: 'Process', href: '/#process' },
  { label: 'Shopify', href: '/#shopify' },
] as const;
