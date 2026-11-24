import type { DemoDefinition } from './types';

/**
 * Bloom Wellness Studio demo (T2): request a visit time. Fictional studio. Matches the concept's
 * decisions: name the visit, not a clinician; say that nothing is booked. No prices, staff,
 * licences or clinical claims.
 */
export const bloomDemo: DemoDefinition = {
  slug: 'bloom-wellness-studio',
  title: 'Request a visit in four steps',
  intro:
    'Choose a session, a day and a time, add your details and send a request. The demo shows how a studio site can make asking for a time easy without pretending anything is booked.',
  reserve: { base: '50rem', sm: '33rem' },
  review: [
    {
      focus: 'Information design',
      title: 'Describe the visit, not the practitioner',
      body: 'Each session says what happens, how long it takes and who it suits. There are no invented staff names, qualifications or health claims.',
    },
    {
      focus: 'Usability',
      title: 'One decision per step',
      body: 'Session, day, time, details. A step indicator shows where you are, and you can go back without losing what you chose.',
    },
    {
      focus: 'Availability',
      title: 'Unavailable times are visible, not hidden',
      body: 'Taken slots stay in the grid but cannot be chosen, so people see the shape of the day and pick a nearby time instead of thinking the studio is empty.',
    },
    {
      focus: 'Conversion path',
      title: 'A request, honestly labelled',
      body: 'The last screen says “Request sent” and explains that the studio confirms by WhatsApp. A real studio would connect its own calendar; the demo never claims a booking.',
    },
    {
      focus: 'Accessibility',
      title: 'Forms that explain themselves',
      body: 'Every field has a visible label, errors appear next to the field and are announced, and each new step moves focus to its heading.',
    },
  ],
};

export interface BloomSession {
  id: string;
  name: string;
  minutes: number;
  summary: string;
  suits: string;
}

export const bloomSessions: BloomSession[] = [
  {
    id: 'gentle-mobility',
    name: 'Gentle mobility class',
    minutes: 50,
    summary: 'Slow, guided movement to loosen the back, hips and shoulders. Small groups.',
    suits: 'Desk days and stiff mornings',
  },
  {
    id: 'restorative-yoga',
    name: 'Restorative yoga',
    minutes: 60,
    summary: 'Supported, held poses with bolsters and blankets. Very little effort, lots of rest.',
    suits: 'Winding down after a long week',
  },
  {
    id: 'breathwork-rest',
    name: 'Breathwork and rest',
    minutes: 45,
    summary: 'A guided breathing practice followed by quiet rest in a dim room.',
    suits: 'A calm reset in the middle of the day',
  },
  {
    id: 'stretch-recover',
    name: 'Stretch and recover',
    minutes: 60,
    summary: 'Assisted stretching and foam-roller work after training or a busy week on your feet.',
    suits: 'Active people and weekend sport',
  },
];

/** Opening hours for the fictional studio: Monday to Saturday; closed Sunday. */
const TIMES = ['08:00', '09:30', '11:00', '12:30', '14:00', '15:30', '17:00', '18:30'];

export interface BloomDay {
  iso: string;
  closed: boolean;
}

/** The next seven days starting tomorrow, from a given date (local time). */
export function bloomDays(from: Date, count = 7): BloomDay[] {
  return Array.from({ length: count }, (_, i) => {
    const d = new Date(from.getFullYear(), from.getMonth(), from.getDate() + 1 + i);
    const iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    return { iso, closed: d.getDay() === 0 };
  });
}

/**
 * Times for a day, with some marked taken. Deterministic per day and session so the demo is
 * stable between visits and testable; not a real calendar.
 */
export function bloomTimes(dayIso: string, sessionId: string): { time: string; taken: boolean }[] {
  const seed = [...`${dayIso}${sessionId}`].reduce(
    (sum, ch) => (sum * 31 + ch.charCodeAt(0)) % 9973,
    7,
  );
  return TIMES.map((time, i) => ({ time, taken: (seed + i * 5) % 3 === 0 }));
}
