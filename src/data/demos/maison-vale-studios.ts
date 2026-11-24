import type { DemoDefinition } from './types';

export const maisonDemo: DemoDefinition = {
  slug: 'maison-vale-studios',
  title: 'Browse by space and ask about a project',
  intro:
    'Filter the project index by the kind of space, open a room to see its materials, then describe your own project. The enquiry asks about the space and promises no timeline.',
  reserve: { base: '80.25rem', sm: '64.75rem', lg: '64.75rem' },
  review: [
    {
      focus: 'Information design',
      title: 'Lead with the kind of space',
      body: 'Residential, hospitality and commercial come first, so a visitor knows at once whether the studio works on their kind of project.',
    },
    {
      focus: 'Visual design',
      title: 'Materials set the palette',
      body: 'Each project shows its material palette as swatches; the interface stays quiet so the rooms carry the page.',
    },
    {
      focus: 'Conversion path',
      title: 'Ask for the project, not a slogan',
      body: 'Three short questions about the space, its size and its stage. The summary never promises a date or a result.',
    },
    {
      focus: 'Accessibility',
      title: 'Clear states',
      body: 'Filters show their pressed state and the enquiry summary is announced when it appears.',
    },
  ],
};
