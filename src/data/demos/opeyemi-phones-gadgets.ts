import type { DemoDefinition } from './types';

export const opeyemiDemo: DemoDefinition = {
  slug: 'opeyemi-phones-gadgets',
  title: 'Browse devices, or describe one to sell or swap',
  intro:
    'Browse sample phones, laptops and watches, or switch to Sell or swap and describe your device. The WhatsApp control stays disabled, as in the concept.',
  reserve: { base: '47rem', sm: '24.75rem', lg: '22rem' },
  review: [
    {
      focus: 'Information design',
      title: 'Browse and swap are separate',
      body: 'Shopping by device type and describing a device to sell or swap are different paths, so neither form gets in the way of the other.',
    },
    {
      focus: 'Trust',
      title: 'No commercial facts',
      body: 'There is no price, warranty, stock count or phone number. Every listing is labelled as a sample.',
    },
    {
      focus: 'Usability',
      title: 'A short swap form',
      body: 'Device type, condition and storage, then a summary. Big buttons and plain words work on a small phone.',
    },
    {
      focus: 'Conversion path',
      title: 'A visible but disabled WhatsApp step',
      body: 'The green control shows where a real shop would hand over to WhatsApp, and says why it is disabled here.',
    },
  ],
};
