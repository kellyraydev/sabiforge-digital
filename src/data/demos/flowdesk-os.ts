import type { DemoDefinition } from './types';

export const flowdeskDemo: DemoDefinition = {
  slug: 'flowdesk-os',
  title: 'Move sample work through Now, Next and Later',
  intro:
    'Add a task, move it between columns and mark it done. The board shows order, not scores: there are no totals, percentages or revenue figures.',
  reserve: { base: '74.5rem', sm: '40.25rem', lg: '32.25rem' },
  review: [
    {
      focus: 'Layout',
      title: 'Sequence instead of a dashboard',
      body: 'The board opens on what to do now. Now, Next and Later describe order; nothing on the screen ranks people or reports results.',
    },
    {
      focus: 'Usability',
      title: 'Move work without dragging',
      body: 'Every card has Move and Done buttons, so the board works with a keyboard, a screen reader or a thumb on a phone, not just a mouse.',
    },
    {
      focus: 'Information design',
      title: 'Every row says it is a sample',
      body: 'Task cards carry a Sample label and use team names, not people, so nobody mistakes the board for a live client record.',
    },
    {
      focus: 'Visual design',
      title: 'Colour marks the current column only',
      body: 'Slate and navy stay calm in an office; the teal accent shows where attention belongs.',
    },
  ],
};
