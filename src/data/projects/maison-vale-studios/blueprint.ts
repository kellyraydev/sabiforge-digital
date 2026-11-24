import { defineBlueprint } from '@/lib/blueprint';

/**
 * Maison Vale Studios: fictional interior / creative studio. Editorial business site that leads
 * with the kind of space and the materials, not a stock hero. Images resolve from
 * src/assets/projects/maison-vale-studios/ when present; until then each slot shows a themed
 * placeholder. Required images are in docs/IMAGE-REQUESTS.md. Spec: docs/BLUEPRINT-CONVERSION.md.
 */
export default defineBlueprint({
  slug: 'maison-vale-studios',
  name: 'Maison Vale',
  basis: 'fictional',
  tagline: 'An interior studio, read by the kind of space.',
  theme: {
    bg: '#F6F1E8',
    surface: '#FFFFFF',
    ink: '#2C241C',
    muted: '#6B4A32',
    accent: '#5E6B45',
    accentInk: '#F6F1E8',
    display: 'instrument-serif',
    body: 'inter',
    radius: '0.5rem',
  },
  share: { subdomain: 'maisonvale', noindex: true },
  nav: [
    { label: 'Work', to: '/' },
    { label: 'Studio', to: '/studio' },
    { label: 'Enquire', to: '/enquire' },
  ],
  pages: [
    {
      path: '/',
      title: 'Work',
      sections: [
        {
          type: 'hero',
          eyebrow: 'Interior studio',
          headline: 'Rooms, made to last.',
          sub: 'An interior practice working across residential, hospitality and commercial spaces — led by materials, not a template.',
          image: {
            file: 'hero.webp',
            alt: 'Sunlit interior studio corner in travertine and linen',
          },
          cta: { label: 'Start a project', to: '/enquire' },
          secondaryCta: { label: 'The studio', to: '/studio' },
        },
        {
          type: 'gallery',
          title: 'Selected rooms',
          images: [
            { file: 'room-01.webp', alt: 'Residential living room in warm neutral tones' },
            { file: 'room-02.webp', alt: 'Hospitality lounge with layered textures' },
            { file: 'room-03.webp', alt: 'Commercial reception in stone and walnut' },
            { file: 'room-04.webp', alt: 'Walnut kitchen with natural daylight' },
            { file: 'room-05.webp', alt: 'Stone bathroom with soft shadow' },
            { file: 'room-06.webp', alt: 'Styled reading nook with linen seating' },
          ],
        },
        {
          type: 'cta',
          headline: 'Planning a space?',
          sub: 'Tell us the kind of project and roughly what you have in mind.',
          cta: { label: 'Enquire', to: '/enquire' },
        },
      ],
    },
    {
      path: '/studio',
      title: 'Studio',
      sections: [
        {
          type: 'hero',
          eyebrow: 'Our approach',
          headline: 'Materials first.',
          sub: 'We start from the rooms and the materials, and let the palette follow. The work carries the page.',
          image: {
            file: 'studio.webp',
            alt: 'Walnut and olive fabric swatches with stone samples on a studio table',
          },
        },
        {
          type: 'feature-grid',
          title: 'How we work',
          items: [
            {
              title: 'Lead with the space',
              body: 'Residential, hospitality and commercial come first, so you can tell whether we work on your kind of project.',
            },
            {
              title: 'Let materials set the palette',
              body: 'Ivory, walnut, stone and olive come from the rooms themselves. The interface stays quiet.',
            },
            {
              title: 'Ask for the project',
              body: 'The enquiry asks which space is being planned. It does not promise a timeline or a result.',
            },
          ],
        },
      ],
    },
    {
      path: '/enquire',
      title: 'Enquire',
      sections: [
        {
          type: 'hero',
          eyebrow: 'Enquire',
          headline: 'Tell us about the space.',
          sub: 'A short note is enough to start. This is a design concept — no timeline or result is promised here.',
        },
        {
          type: 'feature-grid',
          title: 'What to include',
          items: [
            {
              title: 'Kind of space',
              body: 'Residential, hospitality or commercial — and where it is.',
            },
            { title: 'Rough scope', body: 'One room, a whole home, or a full fit-out.' },
            { title: 'Timeframe', body: 'When you would like to begin, even approximately.' },
          ],
        },
      ],
    },
  ],
});
