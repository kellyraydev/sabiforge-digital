import type { DemoDefinition } from './types';

/**
 * Reference demo for the shared demo shell (task T11). Fictional organisation
 * ("Meridian Group"), no metrics, awards or client claims.
 */
export const corporateDemo: DemoDefinition = {
  slug: 'corporate-digital-modernization',
  title: 'Old site versus redesigned site',
  intro:
    'Switch between a dated corporate homepage and its redesign to see what modernization changes: structure, clarity and the next step.',
  reserve: { base: '58rem', sm: '42rem' },
  review: [
    {
      focus: 'Layout',
      title: 'Lead with what the organisation does',
      body: 'The old page opens on a welcome message and a news ticker. The redesign answers “what do you do, and for whom?” in one headline and one line underneath.',
    },
    {
      focus: 'Conversion path',
      title: 'One clear next step',
      body: 'Seven competing links become one primary action and one secondary one, so a visitor always knows where to go next.',
    },
    {
      focus: 'Information design',
      title: 'Review, redesign, support',
      body: 'Services are grouped into the three moves a modernization project actually follows, instead of a long list of departments.',
    },
    {
      focus: 'Accessibility',
      title: 'Readable on any screen',
      body: 'Small grey text on patterned backgrounds is replaced by high-contrast type, real headings and buttons large enough to tap on a phone.',
    },
    {
      focus: 'Performance',
      title: 'Less to download',
      body: 'Sliders and decorative images are removed from the first screen, so the page shows useful content sooner on mobile data.',
    },
  ],
};

export type CorporateView = 'old' | 'new';
export const corporateContent = {
  name: 'Meridian Group',
  oldNav: [
    'Home',
    'About Us',
    'Our History',
    'Departments',
    'News',
    'Downloads',
    'Careers',
    'Contact Us',
  ],
  oldTicker:
    'Welcome to our official website!!! Please browse our pages for more information about our company and its activities.',
  newNav: ['What we do', 'Approach', 'Contact'],
  services: [
    {
      title: 'Review',
      body: 'We look at what your website does today and where people get stuck.',
    },
    {
      title: 'Redesign',
      body: 'A clearer structure, modern design and pages that work on phones.',
    },
    { title: 'Support', body: 'Updates, security and improvements after launch.' },
  ],
};
