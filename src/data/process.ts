import { stages, type Stage } from './home';

/**
 * Extra detail for the /process page. The six stages themselves live in home.ts so the
 * homepage and this page can never drift apart. Nothing here promises a duration:
 * timelines, revision rounds and payment schedules are written into each proposal.
 */
export interface StageDetail {
  id: Stage['id'];
  /** What the client will see during the stage. */
  visible: string;
  /** Concrete activities, in the order they usually happen. */
  activities: string[];
  /** What changes the stage's length. */
  affectedBy: string;
  /** The review point that closes the stage, in plain language. */
  reviewHow: string;
  /** Who is responsible for each kind of work. */
  responsibility: { you: string[]; us: string[] };
}

export const stageDetails: StageDetail[] = [
  {
    id: 'discover',
    visible: 'A conversation, then a short written summary of what we heard.',
    activities: [
      'Talk through your business, customers and what the website must achieve',
      'Look at your current site, competitors and any brand materials',
      'Check practical constraints: budget range, deadlines, platform, content',
      'Recommend the smallest sensible scope, or tell you if you don’t need us yet',
    ],
    affectedBy: 'How quickly you can answer questions and share existing materials.',
    reviewHow:
      'You read our summary and decide whether to ask for a proposal. No charge is implied by a first conversation.',
    responsibility: {
      you: [
        'Describe goals and customers honestly',
        'Share examples you like and dislike',
        'Provide access to anything existing',
      ],
      us: [
        'Ask the questions that change the answer',
        'Give honest advice on scope and budget',
        'Summarise in writing',
      ],
    },
  },
  {
    id: 'define',
    visible: 'A written proposal: pages or templates, features, timeline and price.',
    activities: [
      'Turn the discovery notes into a sitemap or feature list',
      'Write down who provides which content and by when',
      'List third-party costs separately: domain, hosting, platform plan, apps',
      'Agree revision rounds, payment schedule and timeline in the proposal',
    ],
    affectedBy: 'The number of pages and features, and how many decisions are still open.',
    reviewHow:
      'You approve the proposal in writing before any design begins. Changes after approval are discussed as scope changes.',
    responsibility: {
      you: [
        'Read the proposal and ask about anything unclear',
        'Confirm priorities and who supplies content',
        'Approve it, or tell us what to change',
      ],
      us: [
        'Write scope in plain language',
        'Separate our fee from third-party costs',
        'Flag risks and unknowns up front',
      ],
    },
  },
  {
    id: 'design',
    visible: 'Real page layouts for mobile and desktop, in your brand, with real content.',
    activities: [
      'Structure the content and key journeys before choosing visuals',
      'Design the key pages, mobile and desktop',
      'Prepare a short rationale: why each major decision was made',
      'Present the designs and walk through them with you',
    ],
    affectedBy: 'Late content, several decision-makers, and feedback that arrives in pieces.',
    reviewHow:
      'You send one consolidated round of feedback. We revise within the rounds written in the proposal, then you approve the design.',
    responsibility: {
      you: [
        'Provide content and images, or agree a plan for them',
        'Gather feedback from everyone into one list',
        'Approve the design',
      ],
      us: [
        'Design for phones first',
        'Explain the reasoning behind choices',
        'Keep revisions inside agreed scope',
      ],
    },
  },
  {
    id: 'develop',
    visible: 'A private staging link that you can open on your own phone and computer.',
    activities: [
      'Build the approved design with maintainable, accessible code',
      'Set up the content management or store platform where included',
      'Connect forms, product data and agreed integrations',
      'Share the staging link as the build progresses',
    ],
    affectedBy: 'Platform access, final content, and the complexity of features and integrations.',
    reviewHow:
      'You review the staging site on your own devices and note anything that differs from the approved design.',
    responsibility: {
      you: [
        'Provide platform, domain and account access where needed',
        'Supply final content',
        'Check the staging site on your devices',
      ],
      us: [
        'Build to the approved design',
        'Keep the staging site private',
        'Tell you early if a platform limit affects the plan',
      ],
    },
  },
  {
    id: 'refine',
    visible: 'A launch checklist and a tested site, with your agreed revisions applied.',
    activities: [
      'Test across phones, tablets and desktop screens',
      'Check keyboard access, colour contrast and page speed',
      'Test forms, and place test orders on commerce projects',
      'Apply your final revision list',
    ],
    affectedBy: 'The size of your final revision list and whether it stays within agreed rounds.',
    reviewHow:
      'You approve launch. If something is not ready, we agree what waits until after launch.',
    responsibility: {
      you: [
        'Review the whole site on your own devices',
        'Send a single final revision list',
        'Give launch approval',
      ],
      us: [
        'Fix defects found in testing',
        'Share what was tested and how',
        'Prepare the launch checklist',
      ],
    },
  },
  {
    id: 'launch',
    visible: 'Your live website, a handover walkthrough and written notes.',
    activities: [
      'Connect your domain and publish the site',
      'Confirm that enquiries or orders reach you',
      'Walk you through managing content, products or orders',
      'Hand over notes, access and care options',
    ],
    affectedBy: 'How quickly domain and account access can be arranged.',
    reviewHow:
      'The project closes once handover is complete, or moves into ongoing care if you choose it.',
    responsibility: {
      you: [
        'Provide domain and account access',
        'Attend the handover session',
        'Decide whether to add ongoing care',
      ],
      us: [
        'Publish and run final checks',
        'Teach you to manage the site',
        'Leave clear written notes',
      ],
    },
  },
];

export function getStageDetail(id: string): StageDetail | undefined {
  return stageDetails.find((d) => d.id === id);
}

export const handoverItems = [
  { title: 'The live website', detail: 'Published on your domain and checked on real devices.' },
  {
    title: 'A handover walkthrough',
    detail:
      'A session on updating content, managing products or orders, and what to do if something breaks.',
  },
  {
    title: 'Written notes',
    detail: 'Short, plain-language documentation of how your site is set up and where things live.',
  },
  {
    title: 'Your accounts and access',
    detail: 'Domain, hosting and platform accounts in your name wherever the platform allows it.',
  },
  {
    title: 'The launch checklist',
    detail: 'What was tested, what was approved and anything deliberately left for later.',
  },
  {
    title: 'Care options',
    detail:
      'Optional ongoing support, described and priced separately. Never a condition of the project.',
  },
];

export const timelineFactors = [
  {
    title: 'Content that arrives late',
    detail:
      'The most common cause of delay. Real copy and images are needed before design review and again before launch.',
  },
  {
    title: 'Feedback in pieces',
    detail:
      'Consolidated feedback keeps rounds short. Scattered comments from several people extend them.',
  },
  {
    title: 'Scope that grows',
    detail:
      'New pages or features are welcome, and are quoted as changes to the proposal rather than absorbed silently.',
  },
  {
    title: 'Third parties',
    detail:
      'Domain transfers, payment-provider approval and platform reviews run on other people’s schedules.',
  },
];

export { stages };
