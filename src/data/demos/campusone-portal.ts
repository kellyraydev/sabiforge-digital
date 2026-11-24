import type { DemoDefinition } from './types';

export const campusDemo: DemoDefinition = {
  slug: 'campusone-portal',
  title: 'A study home that starts with the current module',
  intro:
    'Mark lessons complete, tick off study tasks and switch between the home, modules and tasks views. Everything is sample content for a fictional institution.',
  reserve: { base: '40rem', sm: '30.75rem', lg: '29.5rem' },
  review: [
    {
      focus: 'Layout',
      title: 'Open on the current module',
      body: 'The first card names the module in progress and the next lesson. Everything else sits below it.',
    },
    {
      focus: 'Usability',
      title: 'One next action',
      body: '“Continue lesson 3” is the main button. Completing it moves the next lesson into place automatically.',
    },
    {
      focus: 'Trust',
      title: 'No real school identity',
      body: 'There is no crest, campus name, grade or enrolment claim. Module names are generic samples.',
    },
    {
      focus: 'Accessibility',
      title: 'Real tabs and checkboxes',
      body: 'Views use proper tab controls and tasks are real checkboxes, so keyboards and screen readers work without extra effort.',
    },
  ],
};
