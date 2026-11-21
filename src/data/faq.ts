import { FOUNDING_DISCOUNT_RATE, foundingSlotsLabel } from '@/lib/pricing';

export const pricingFaq: { q: string; a: string }[] = [
  {
    q: 'Are these prices fixed?',
    a: 'Starter, Business and Online Store are fixed package prices. Custom Software shows a starting price and is never a fixed quote. The final figure follows a discovery conversation.',
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
    a: 'Yes. Many businesses start with Starter and grow into a larger site. We build with that in mind, so moving up is an extension rather than a restart where possible.',
  },
  {
    q: 'Can I update the website myself?',
    a: 'Whether you can edit the site yourself depends on the package and is written into your proposal. It is not assumed from the package name.',
  },
  {
    q: 'How does the founding-client rate work?',
    a: `The founding offer is ${Math.round(FOUNDING_DISCOUNT_RATE * 100)}% off Starter, Business or Online Store for ${foundingSlotsLabel()}. Custom Software is a starting price and is not discounted. Eligibility is confirmed in writing in your proposal.`,
  },
  {
    q: 'I don’t know which package I need. What should I do?',
    a: 'Start a project or send a WhatsApp message describing your business and what you want the website to do. We will recommend the smallest sensible scope.',
  },
];
