import { FOUNDING_DISCOUNT_RATE } from '@/lib/pricing';

export const pricingFaq: { q: string; a: string }[] = [
  {
    q: 'Are these prices fixed?',
    a: 'Launch, Business and Online Catalog are fixed package prices for the scope described. Full E-commerce shows a starting price; the final figure follows a discovery conversation. Custom scopes for our services are quoted individually.',
  },
  {
    q: 'What is not included in the price?',
    a: 'Third-party costs such as your domain, hosting or platform subscription, paid themes and apps, payment-gateway fees and licensed images or fonts are quoted separately so you can see exactly what you pay to whom.',
  },
  {
    q: 'How many revisions do I get, and how long will it take?',
    a: 'Revision rounds and timelines depend on the package and how quickly content and feedback arrive. Both are written into your proposal before work begins, so there are no surprises.',
  },
  {
    q: 'How does payment work?',
    a: 'The payment schedule is set out in your proposal and agreed before the project starts.',
  },
  {
    q: 'Can I start small and upgrade later?',
    a: 'Yes. Many businesses start with Launch and grow into a larger site. We build with that in mind, so moving up is an extension rather than a restart where possible.',
  },
  {
    q: 'Can I update the website myself?',
    a: 'Business, Online Catalog and Full E-commerce include content or product management, and every project ends with a handover walkthrough. Launch is a single page; content changes can be handled by us or added as an option.',
  },
  {
    q: 'How does the founding-client rate work?',
    a: `A limited number of early clients receive ${Math.round(FOUNDING_DISCOUNT_RATE * 100)}% off the Launch, Business or Online Catalog package. Full E-commerce and custom work are not included. Eligibility is confirmed in writing in your proposal.`,
  },
  {
    q: 'I don’t know which package I need. What should I do?',
    a: 'Start a project or send a WhatsApp message describing your business and what you want the website to do. We will recommend the smallest sensible scope.',
  },
];
