import { useId, useRef, useState, type KeyboardEvent } from 'react';
import Icon from '@/components/ui/Icon';
import type { IconKey } from '@/lib/icons';

export interface Step {
  id: string;
  icon: IconKey;
  title: string;
  summary: string;
  detail: string;
  youGet: string[];
}

/** WAI-ARIA tabs pattern: arrow keys, Home/End, automatic activation. */
export default function ProcessSteps({ steps }: { steps: Step[] }) {
  const [active, setActive] = useState(0);
  const baseId = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const step = steps[active];

  const focusTab = (index: number) => {
    const next = (index + steps.length) % steps.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const keys: Record<string, () => void> = {
      ArrowRight: () => focusTab(active + 1),
      ArrowDown: () => focusTab(active + 1),
      ArrowLeft: () => focusTab(active - 1),
      ArrowUp: () => focusTab(active - 1),
      Home: () => focusTab(0),
      End: () => focusTab(steps.length - 1),
    };
    const handler = keys[event.key];
    if (handler) {
      event.preventDefault();
      handler();
    }
  };

  return (
    <div>
      <div
        role="tablist"
        aria-label="Project process steps"
        className="relative grid grid-cols-3 gap-2 sm:gap-3 lg:grid-cols-6"
      >
        <div
          className="from-mint-300/0 via-mint-300/40 to-mint-300/0 absolute top-7 right-[8%] left-[8%] hidden h-px bg-gradient-to-r lg:block"
          aria-hidden="true"
        />
        {steps.map((item, index) => {
          const selected = index === active;
          const done = index < active;
          return (
            <button
              key={item.id}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              id={`${baseId}-tab-${item.id}`}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls={`${baseId}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(index)}
              onKeyDown={onKeyDown}
              className={`group relative flex flex-col items-center gap-3 rounded-2xl px-2 py-4 text-center transition ${
                selected ? 'bg-midnight-800' : 'hover:bg-midnight-800/50'
              }`}
            >
              <span
                className={`relative flex size-14 items-center justify-center rounded-2xl border transition ${
                  selected
                    ? 'border-coral-500 bg-coral-500 text-midnight-950 shadow-[0_10px_30px_-10px_rgb(254_103_79/0.8)]'
                    : done
                      ? 'border-mint-300/50 bg-midnight-900 text-mint-300'
                      : 'border-ivory-100/15 bg-midnight-900 text-ivory-100/70 group-hover:text-mint-300'
                }`}
              >
                <Icon name={item.icon} className="size-6" />
              </span>
              <span className="text-ivory-100/60 text-xs font-semibold">Step {index + 1}</span>
              <span
                className={`font-display -mt-2 text-base font-semibold sm:text-lg ${
                  selected ? 'text-ivory-50' : 'text-ivory-100/80'
                }`}
              >
                {item.title}
              </span>
            </button>
          );
        })}
      </div>

      <div
        id={`${baseId}-panel`}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${step.id}`}
        tabIndex={0}
        className="border-ivory-100/10 bg-midnight-800/70 mt-6 grid gap-8 rounded-[var(--radius-card)] border p-6 sm:p-8 lg:grid-cols-[auto_1fr_auto] lg:items-center lg:gap-12"
      >
        <p
          className="font-display text-mint-300/90 text-7xl leading-none font-bold lg:text-8xl"
          aria-hidden="true"
        >
          {String(active + 1).padStart(2, '0')}
        </p>
        <div>
          <h3 className="font-display text-ivory-50 text-2xl font-semibold sm:text-3xl">
            {step.title}: <span className="text-ivory-100/70">{step.summary}</span>
          </h3>
          <p className="text-ivory-100/70 mt-3 max-w-2xl leading-relaxed">{step.detail}</p>
        </div>
        <div className="flex flex-col gap-4">
          <ul className="space-y-2 text-sm">
            {step.youGet.map((item) => (
              <li key={item} className="text-ivory-100/85 flex items-center gap-2">
                <Icon name="check" className="text-mint-300 size-4" strokeWidth={2.5} />
                {item}
              </li>
            ))}
          </ul>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setActive((active - 1 + steps.length) % steps.length)}
              className="border-ivory-100/15 text-ivory-50 hover:border-mint-300 inline-flex size-10 items-center justify-center rounded-full border transition"
              aria-label="Previous step"
            >
              <Icon name="arrow-right" className="size-4 rotate-180" />
            </button>
            <button
              type="button"
              onClick={() => setActive((active + 1) % steps.length)}
              className="border-ivory-100/15 text-ivory-50 hover:border-mint-300 inline-flex size-10 items-center justify-center rounded-full border transition"
              aria-label="Next step"
            >
              <Icon name="arrow-right" className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
