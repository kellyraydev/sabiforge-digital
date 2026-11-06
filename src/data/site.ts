/**
 * Single source of truth for agency facts used across the site.
 * Only verified details belong here: no testimonials, clients, projects,
 * social accounts, addresses or registration details until they exist.
 */
export const site = {
  name: 'SabiForge Digital',
  tagline: "Built for business. Ready for what's next.",
  description:
    'SabiForge Digital is a design and development studio creating distinctive websites, online stores and digital experiences for businesses in Nigeria.',
  locale: 'en_NG',
  market: 'Nigeria',
  contact: {
    whatsappDisplay: '+234 903 843 0068',
    whatsappNumber: '2349038430068',
    phoneHref: 'tel:+2349038430068',
    email: 'kellyray.dev@gmail.com',
  },
  /** Add genuine profiles here once they exist; the footer renders only real entries. */
  social: [] as { label: string; href: string }[],
} as const;

export function whatsappLink(
  message = "Hello SabiForge Digital, I'd like to discuss a project.",
): string {
  return `https://wa.me/${site.contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function mailtoLink(subject = 'Project enquiry', body?: string): string {
  const params = [`subject=${encodeURIComponent(subject)}`];
  if (body) params.push(`body=${encodeURIComponent(body)}`);
  return `mailto:${site.contact.email}?${params.join('&')}`;
}

export interface NavItem {
  label: string;
  href: string;
  /** Path prefix that marks this item as current. */
  match?: string;
}

/**
 * Primary navigation. Work and Process point to homepage sections until their
 * dedicated pages ship (milestone D); About is added when its page exists.
 */
export const navigation: NavItem[] = [
  { label: 'Work', href: '/#work' },
  { label: 'Services', href: '/services', match: '/services' },
  { label: 'Pricing', href: '/pricing', match: '/pricing' },
  { label: 'Process', href: '/#approach' },
  { label: 'Contact', href: '/contact', match: '/contact' },
];

export const startProjectHref = '/contact';
