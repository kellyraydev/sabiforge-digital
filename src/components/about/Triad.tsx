import { useState } from 'react';

const nodes = [
  {
    id: 'design',
    label: 'Design',
    question: 'Will people understand it, trust it and want to continue?',
    contributes:
      'Structure, typography, imagery and tone that carry the business’s meaning in the first few seconds.',
    without: 'Without it: technically sound, and forgettable.',
    x: 50,
    y: 14,
  },
  {
    id: 'technology',
    label: 'Technology',
    question: 'Will it load quickly, work for everyone and stay maintainable?',
    contributes:
      'Fast pages, accessible interactions and code a future developer can read, on a platform that suits the business.',
    without: 'Without it: beautiful in a mock-up, and slow or broken in use.',
    x: 14,
    y: 78,
  },
  {
    id: 'business',
    label: 'Business',
    question: 'What must this website achieve, and how will we know?',
    contributes:
      'A clear job for every page: enquiries, orders, bookings or credibility, so decisions have something to be measured against.',
    without: 'Without it: well made, and pointed at nothing.',
    x: 86,
    y: 78,
  },
];

/** Interactive diagram: three disciplines at the corners of a hexagon, centre text follows selection. */
export default function Triad() {
  const [active, setActive] = useState(nodes[0]);
  const hex = (r: number) =>
    Array.from({ length: 6 }, (_, i) => {
      const a = (Math.PI / 3) * i - Math.PI / 2;
      return `${(50 + r * Math.cos(a)).toFixed(1)},${(50 + r * Math.sin(a)).toFixed(1)}`;
    }).join(' ');

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16">
      <div className="relative mx-auto aspect-square w-full max-w-md">
        <svg
          viewBox="0 0 100 100"
          className="text-mint-800 absolute inset-0 size-full"
          fill="none"
          stroke="currentColor"
          aria-hidden="true"
        >
          <polygon points={hex(46)} strokeWidth="0.6" />
          <polygon points={hex(33)} strokeWidth="0.4" strokeDasharray="1 2.4" />
          <polygon points={hex(20)} strokeWidth="0.4" />
          {nodes.map((n) => (
            <line
              key={n.id}
              x1="50"
              y1="50"
              x2={n.x}
              y2={n.y}
              strokeWidth="0.5"
              strokeDasharray={active.id === n.id ? undefined : '1 2'}
            />
          ))}
        </svg>
        <div className="absolute inset-0 grid place-items-center" aria-hidden="true">
          <span className="font-display text-midnight-900 text-lg font-semibold">Site</span>
        </div>
        {nodes.map((n) => (
          <button
            key={n.id}
            type="button"
            aria-pressed={active.id === n.id}
            onClick={() => setActive(n)}
            style={{ left: `${n.x}%`, top: `${n.y}%` }}
            className={`font-display absolute -translate-x-1/2 -translate-y-1/2 rounded-full border px-5 py-3 text-lg font-semibold transition ${
              active.id === n.id
                ? 'on-ink border-midnight-900 bg-midnight-900 text-mint-300 scale-110'
                : 'border-midnight-900/40 bg-ivory-50 text-midnight-900 hover:border-midnight-900'
            }`}
          >
            {n.label}
          </button>
        ))}
      </div>
      <div aria-live="polite">
        <p className="meta text-mint-800">The question {active.label.toLowerCase()} asks</p>
        <p className="font-display text-display-sm mt-3 font-semibold">{active.question}</p>
        <p className="text-midnight-800/85 mt-5">{active.contributes}</p>
        <p className="border-coral-600 text-midnight-800/85 mt-4 border-l-2 pl-4 italic">
          {active.without}
        </p>
      </div>
    </div>
  );
}
