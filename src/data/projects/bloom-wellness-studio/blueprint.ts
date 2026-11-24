import { defineBlueprint } from '@/lib/blueprint';

/**
 * Bloom Wellness Studio: fictional wellness practice. The preview explains kinds of visit and lets
 * someone request a time — it books nothing and names no clinician or licence. Images resolve from
 * src/assets/projects/bloom-wellness-studio/ when present; until then each slot shows a themed
 * placeholder. Required images are in docs/IMAGE-REQUESTS.md. Spec: docs/BLUEPRINT-CONVERSION.md.
 */
export default defineBlueprint({
  slug: 'bloom-wellness-studio',
  name: 'Bloom Wellness',
  basis: 'fictional',
  tagline: 'Request a time — nothing is booked here.',
  theme: {
    bg: '#F7F3EC',
    surface: '#FFFFFF',
    ink: '#2B3A2F',
    muted: '#5F7A5F',
    accent: '#3E5C45',
    accentInk: '#F7F3EC',
    display: 'instrument-serif',
    body: 'inter',
    radius: '0.75rem',
  },
  share: { subdomain: 'bloom', noindex: true },
  nav: [
    { label: 'Studio', to: '/' },
    { label: 'Visits', to: '/visits' },
    { label: 'Request', to: '/request' },
  ],
  pages: [
    {
      path: '/',
      title: 'Studio',
      sections: [
        {
          type: 'hero',
          eyebrow: 'Wellness studio',
          headline: 'Move, rest, recover.',
          sub: 'A calm studio for movement, rest and recovery visits. Browse the space, then ask about a time.',
          image: {
            file: 'hero.webp',
            alt: 'Calm sage-and-linen wellness studio interior with plants',
          },
          cta: { label: 'Ask about a time', to: '/request' },
          secondaryCta: { label: 'Kinds of visit', to: '/visits' },
        },
        {
          type: 'gallery',
          title: 'The space',
          images: [
            { file: 'space-01.webp', alt: 'Movement room with natural light' },
            { file: 'space-02.webp', alt: 'Quiet rest and recovery room' },
            { file: 'space-03.webp', alt: 'Reception area with plants and linen' },
            { file: 'space-04.webp', alt: 'Close-up of linen and clay textures' },
          ],
        },
        {
          type: 'cta',
          headline: 'Nothing is booked here.',
          sub: 'The request below sends an enquiry only. A real studio would connect its own calendar.',
          cta: { label: 'Request a time', to: '/request' },
        },
      ],
    },
    {
      path: '/visits',
      title: 'Visits',
      sections: [
        {
          type: 'hero',
          eyebrow: 'Kinds of visit',
          headline: 'Three ways to come in.',
          sub: 'Visits are described by what they are for. No clinician, licence or clinical claim is named here.',
        },
        {
          type: 'feature-grid',
          title: 'Kinds of visit',
          items: [
            { title: 'Movement', body: 'Guided movement sessions for mobility and strength.' },
            { title: 'Rest', body: 'Quiet sessions focused on breathing and winding down.' },
            { title: 'Recovery', body: 'Slower sessions for recovery between busier weeks.' },
          ],
        },
      ],
    },
    {
      path: '/request',
      title: 'Request',
      sections: [
        {
          type: 'hero',
          eyebrow: 'Request',
          headline: 'Ask for a time.',
          sub: 'This is a design concept, so nothing is booked. Share what suits you and a studio would follow up.',
        },
        {
          type: 'feature-grid',
          title: 'What to include',
          items: [
            { title: 'Kind of visit', body: 'Movement, rest or recovery — whichever fits.' },
            { title: 'Preferred days', body: 'A rough window that works for you.' },
            { title: 'Anything to note', body: 'Anything you would want the studio to know.' },
          ],
        },
      ],
    },
  ],
});
