import { useState } from 'react';
import Icon from '@/components/ui/Icon';

interface Row {
  id: string;
  name: string;
  you: string[];
  us: string[];
}

type View = 'both' | 'you' | 'us';

/** Who does what at each stage. Radio group filters the view; every item stays in the DOM order. */
export default function ResponsibilityMatrix({ rows }: { rows: Row[] }) {
  const [view, setView] = useState<View>('both');
  const options: [View, string][] = [
    ['both', 'Both'],
    ['you', 'Your part'],
    ['us', 'Our part'],
  ];
  const show = (side: 'you' | 'us') => view === 'both' || view === side;

  return (
    <div>
      <div
        role="radiogroup"
        aria-label="Show responsibilities for"
        className="flex flex-wrap gap-2"
      >
        {options.map(([key, label]) => (
          <button
            key={key}
            type="button"
            role="radio"
            aria-checked={view === key}
            tabIndex={view === key ? 0 : -1}
            onClick={() => setView(key)}
            onKeyDown={(e) => {
              const i = options.findIndex(([k]) => k === view);
              const next =
                e.key === 'ArrowRight' || e.key === 'ArrowDown'
                  ? (i + 1) % options.length
                  : e.key === 'ArrowLeft' || e.key === 'ArrowUp'
                    ? (i + options.length - 1) % options.length
                    : -1;
              if (next >= 0) {
                e.preventDefault();
                setView(options[next][0]);
                const sibs =
                  e.currentTarget.parentElement?.querySelectorAll<HTMLElement>('[role=radio]');
                sibs?.[next]?.focus();
              }
            }}
            className={`min-h-11 rounded-full border px-5 text-sm font-semibold transition ${
              view === key
                ? 'border-mint-300 bg-mint-300 text-midnight-900'
                : 'border-ivory-100/25 text-ivory-100 hover:border-mint-300'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <ol className="border-ivory-100/12 mt-8 border-t">
        {rows.map((row, i) => (
          <li key={row.id} className="border-ivory-100/12 border-b py-6">
            <div className="grid gap-5 md:grid-cols-[12rem_1fr_1fr] md:gap-8">
              <h3 className="font-display text-ivory-50 text-xl font-semibold">
                <span className="meta text-mint-300 mr-2">{String(i + 1).padStart(2, '0')}</span>
                {row.name}
              </h3>
              {(['you', 'us'] as const).map((side) =>
                show(side) ? (
                  <div key={side} className={view !== 'both' ? 'md:col-span-2' : ''}>
                    <p className="meta text-mint-300">{side === 'you' ? 'You' : 'SabiForge'}</p>
                    <ul className="text-ivory-100/80 mt-3 space-y-2">
                      {row[side].map((item) => (
                        <li key={item} className="flex gap-2.5">
                          <Icon name="check" className="text-mint-300 mt-1 size-4 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null,
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
