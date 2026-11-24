import type { DemoDefinition } from './types';

export const routepilotDemo: DemoDefinition = {
  slug: 'routepilot-logistics',
  title: 'Advance sample jobs across three lanes',
  intro:
    'Filter by lane, open a job and move it from Preparing to Moving to Arrived. Identifiers are obviously fake and nothing is a live shipment.',
  reserve: { base: '49.25rem', sm: '38rem', lg: '38rem' },
  review: [
    {
      focus: 'Information design',
      title: 'Plain status words',
      body: 'Preparing, Moving and Arrived are the only statuses. There are no ETAs, maps or tracking theatre that would read as a promise.',
    },
    {
      focus: 'Usability',
      title: 'Scan by lane',
      body: 'North, East and Yard filters keep the board readable on a rugged tablet at a dim dispatch desk.',
    },
    {
      focus: 'Trust',
      title: 'Fake on purpose',
      body: 'Jobs are named “Sample job 01” and so on, so no label can be mistaken for a real consignment number.',
    },
    {
      focus: 'Accessibility',
      title: 'Status changes are announced',
      body: 'Each change is written to an activity log and announced to screen readers, with the newest entry first.',
    },
  ],
};
