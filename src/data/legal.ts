/**
 * Owner decisions required before the Privacy Policy and Terms can be finalised.
 * The draft pages state only facts verified against this website and the approved
 * pricing; everything else is a placeholder pointing at one of these decisions.
 * Options listed are neutral prompts for the owner and legal adviser, not advice.
 */
export interface OwnerDecision {
  id: string;
  document: 'privacy' | 'terms';
  topic: string;
  question: string;
  why: string;
  options?: string[];
}

export const LEGAL_STATUS = {
  version: 'Draft 0.1',
  drafted: '6 November 2026',
  approved: false,
  reviewedByCounsel: false,
} as const;

export const decisions: OwnerDecision[] = [
  {
    id: 'P1',
    document: 'privacy',
    topic: 'Who is the organisation?',
    question:
      'What is the registered business name, any registration number and the business address to publish?',
    why: 'A privacy policy must say who is responsible for the information. The site currently names only “SabiForge Digital” with an email address and WhatsApp number.',
  },
  {
    id: 'P2',
    document: 'privacy',
    topic: 'Privacy contact',
    question: 'Which email address should handle privacy questions and requests?',
    why: 'The only verified address is the studio’s enquiry email. A dedicated address is common, but it is your choice.',
    options: ['Keep the existing enquiry email', 'Create a dedicated privacy address'],
  },
  {
    id: 'P3',
    document: 'privacy',
    topic: 'Retention of enquiries',
    question:
      'How long will you keep enquiry emails and WhatsApp conversations, and when are they deleted?',
    why: 'Enquiries contain names, contact details and project information. A retention period must be stated and then followed.',
  },
  {
    id: 'P4',
    document: 'privacy',
    topic: 'Applicable data-protection law',
    question:
      'Which laws and registration or filing duties apply to SabiForge, and to visitors from other countries?',
    why: 'Nigerian data-protection law and any regulator registration duties should be confirmed by a qualified Nigerian legal adviser. This draft does not state what the law requires.',
  },
  {
    id: 'P5',
    document: 'privacy',
    topic: 'Client data and credentials',
    question:
      'How will client files, customer lists and account access (domain, hosting, platform) be received, stored, shared and deleted after a project?',
    why: 'Project work will involve client data and credentials. Clients will expect the rules in writing.',
    options: [
      'A password manager or access-sharing method',
      'Deletion or return of files after handover',
      'Named people who may access client data',
    ],
  },
  {
    id: 'P6',
    document: 'privacy',
    topic: 'Third-party tools',
    question:
      'Which third-party tools will the studio or this website use (hosting, analytics, forms, email, CRM, payments, scheduling)?',
    why: 'Each tool that handles personal information must be named in the policy with what it receives. The site currently uses none that run in the visitor’s browser.',
  },
  {
    id: 'P7',
    document: 'privacy',
    topic: 'Analytics and cookies',
    question:
      'Will you add analytics, advertising pixels or any cookies? If so, which, and how will visitors consent?',
    why: 'The site sets no cookies and uses no analytics today. Adding any changes this policy and may need a consent notice.',
  },
  {
    id: 'P8',
    document: 'privacy',
    topic: 'Contact-form delivery',
    question:
      'Keep the email and WhatsApp hand-off, or approve a form provider and its data retention?',
    why: 'Today the browser sends nothing. A hosted form would make the studio and the provider responsible for the submitted data.',
    options: [
      'Keep email and WhatsApp hand-off',
      'Approve a form provider (name, region, retention)',
    ],
  },
  {
    id: 'P9',
    document: 'privacy',
    topic: 'International transfers and data location',
    question:
      'Where are enquiry and client data stored (email provider, WhatsApp, cloud storage), and is that disclosed?',
    why: 'Tools used for email and messaging may store data outside Nigeria.',
  },
  {
    id: 'P10',
    document: 'privacy',
    topic: 'Individual rights',
    question:
      'How will people ask to see, correct or delete their information, and how quickly will you respond?',
    why: 'The policy must describe a workable process you can honour.',
  },
  {
    id: 'P11',
    document: 'privacy',
    topic: 'Children',
    question: 'Is the website and service intended only for adults and businesses?',
    why: 'Many policies state an intended audience. The site’s content is addressed to business owners.',
  },
  {
    id: 'T1',
    document: 'terms',
    topic: 'Contracting party',
    question:
      'Which legal person contracts with clients, and how do these terms relate to the written proposal?',
    why: 'The proposal is where scope and price are agreed. The terms must say which document prevails if they conflict.',
  },
  {
    id: 'T2',
    document: 'terms',
    topic: 'Payment terms',
    question:
      'What are the deposit, milestone payments, due dates, accepted payment methods, late-payment rules and tax treatment?',
    why: 'The site says only that payment schedules are set out in each proposal. Prices are in naira and exclude third-party costs.',
    options: ['Deposit before work starts', 'Payments at stage approvals', 'Payment on launch'],
  },
  {
    id: 'T3',
    document: 'terms',
    topic: 'Revisions',
    question:
      'How many revision rounds does each package include, and what counts as a revision rather than a change in scope?',
    why: 'The site says revision rounds are written into each proposal, but no number has been approved.',
  },
  {
    id: 'T4',
    document: 'terms',
    topic: 'Refunds and cancellation',
    question:
      'What happens to payments if a client cancels or pauses a project, or if SabiForge cannot deliver?',
    why: 'Nothing about refunds has been approved. Clients will ask.',
  },
  {
    id: 'T5',
    document: 'terms',
    topic: 'Intellectual property',
    question:
      'When does ownership of the finished website pass to the client? What do clients own, what is licensed, and may SabiForge show the work in its portfolio?',
    why: 'Ownership, licence of third-party fonts, images and code, and portfolio rights are separate questions.',
    options: [
      'Transfer on final payment',
      'Licence for specific components',
      'Portfolio use with permission only',
    ],
  },
  {
    id: 'T6',
    document: 'terms',
    topic: 'Client-supplied content',
    question: 'Who is responsible for the rights to text, images and products the client supplies?',
    why: 'Clients normally confirm they have the right to use what they provide.',
  },
  {
    id: 'T7',
    document: 'terms',
    topic: 'Support and warranty',
    question:
      'Is there a post-launch fix period? What do care plans include, and what are their response times and prices?',
    why: 'The site says care options exist and are agreed per project. No period, level or price is approved.',
  },
  {
    id: 'T8',
    document: 'terms',
    topic: 'Third-party platforms and costs',
    question:
      'Who owns accounts with Shopify, hosting and domain providers, and who is responsible when a platform changes or fails?',
    why: 'The site says third-party costs are quoted separately. Responsibility for platform changes is not yet stated.',
  },
  {
    id: 'T9',
    document: 'terms',
    topic: 'Liability and disclaimers',
    question:
      'What limits, if any, apply to liability, and what outcomes are expressly not guaranteed (traffic, rankings, sales)?',
    why: 'The site does not promise results, but a binding limitation of liability needs legal drafting.',
  },
  {
    id: 'T10',
    document: 'terms',
    topic: 'Governing law and disputes',
    question: 'Which law governs, which courts or arbitration apply and how are disputes raised?',
    why: 'Jurisdiction cannot be assumed. A qualified legal adviser should confirm it.',
  },
  {
    id: 'T11',
    document: 'terms',
    topic: 'Confidentiality',
    question:
      'Will each party keep the other’s project information confidential, and for how long?',
    why: 'Clients may share unreleased products or financial information.',
  },
  {
    id: 'T12',
    document: 'terms',
    topic: 'Founding-client offer',
    question:
      'How many founding places exist (3 or 5), how long does the offer last, and which packages and conditions apply?',
    why: 'The site shows a 10% founding rate on Launch, Business and Online Catalog (not Full E-commerce) and says places are limited, without a number.',
  },
  {
    id: 'T13',
    document: 'terms',
    topic: 'Delays, pausing and termination',
    question: 'What happens if a client stops responding, or either side wants to end the project?',
    why: 'The process page says delays depend on content and feedback. Consequences are not yet defined.',
  },
];

export const decisionsFor = (doc: OwnerDecision['document']) =>
  decisions.filter((d) => d.document === doc);
export const getDecision = (id: string) => decisions.find((d) => d.id === id)!;
