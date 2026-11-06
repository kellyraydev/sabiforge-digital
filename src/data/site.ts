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
  /** Shown in the desktop pill. Contact is reached through the "Start a project" button. */
  primary?: boolean;
}

/** Primary navigation. Every item is now a real page. */
export const navigation: NavItem[] = [
  { label: 'Work', href: '/work', match: '/work', primary: true },
  { label: 'Services', href: '/services', match: '/services', primary: true },
  { label: 'Process', href: '/process', match: '/process', primary: true },
  { label: 'About', href: '/about', match: '/about', primary: true },
  { label: 'Pricing', href: '/pricing', match: '/pricing', primary: true },
  { label: 'Contact', href: '/contact', match: '/contact', primary: false },
];

export const startProjectHref = '/contact';
