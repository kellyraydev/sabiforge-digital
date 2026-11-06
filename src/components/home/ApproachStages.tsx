import { useId, useRef, useState, type KeyboardEvent } from 'react';
import Icon from '@/components/ui/Icon';
import type { Stage } from '@/data/home';

/** WAI-ARIA tabs (vertical on desktop): arrows, Home/End, automatic activation. */
export default function ApproachStages({ stages }: { stages: Stage[] }) {
  const [active, setActive] = useState(0);
  const baseId = useId();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const stage = stages[active];

  const focusTab = (index: number) => {
    const next = (index + stages.length) % stages.length;
    setActive(next);
    tabs.current[next]?.focus();
  };
  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const map: Record<string, number> = {
      ArrowDown: active + 1,
      ArrowRight: active + 1,
      ArrowUp: active - 1,
      ArrowLeft: active - 1,
      Home: 0,
      End: stages.length - 1,
    };
    if (event.key in map) {
      event.preventDefault();
      focusTab(map[event.key]);
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-14">
      <div
        role="tablist"
        aria-label="Project stages"
        aria-orientation="vertical"
        className="relative grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-1 lg:gap-0"
      >
        <span
          className="bg-ivory-100/12 absolute top-6 bottom-6 left-[1.4rem] hidden w-px lg:block"
          aria-hidden="true"
        />
        <span
          className="bg-mint-300 absolute top-6 left-[1.4rem] hidden w-px transition-[height] duration-500 lg:block"
          style={{
            height: `calc(${(active / (stages.length - 1)) * 100}% - ${(active / (stages.length - 1)) * 3}rem)`,
          }}
          aria-hidden="true"
        />
        {stages.map((item, index) => {
          const selected = index === active;
          return (
            <button
              key={item.id}
              ref={(el) => {
                tabs.current[index] = el;
              }}
              id={`${baseId}-tab-${item.id}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`${baseId}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(index)}
              onKeyDown={onKeyDown}
              className={`relative flex min-h-12 items-center gap-4 rounded-xl px-3 py-3 text-left transition lg:rounded-none lg:px-0 lg:py-4 ${
                selected
                  ? 'bg-midnight-800 lg:bg-transparent'
                  : 'hover:bg-midnight-800/50 lg:hover:bg-transparent'
              }`}
            >
              <span
                className={`relative z-10 flex size-[2.3rem] shrink-0 items-center justify-center rounded-full border font-mono text-xs transition lg:ml-[0.25rem] ${
                  selected
                    ? 'border-mint-300 bg-mint-300 text-midnight-900'
                    : index < active
                      ? 'border-mint-300/60 bg-midnight-900 text-mint-300'
                      : 'border-ivory-100/20 bg-midnight-900 text-ivory-100/70'
                }`}
              >
                {String(index + 1).padStart(2, '0')}
              </span>
              <span
                className={`font-display text-base font-semibold sm:text-lg lg:text-xl ${
                  selected ? 'text-ivory-50' : 'text-ivory-100/70'
                }`}
              >
                {item.name}
              </span>
            </button>
          );
        })}
      </div>

      <div
        id={`${baseId}-panel`}
        role="tabpanel"
        tabIndex={0}
        aria-labelledby={`${baseId}-tab-${stage.id}`}
        className="chamfer bg-midnight-800/80 rounded-[var(--radius-card)] p-7 sm:p-10"
      >
        <div key={stage.id} className="stage-panel">
          <p className="meta text-mint-300">
            Stage {String(active + 1).padStart(2, '0')} / {String(stages.length).padStart(2, '0')}
          </p>
          <h3 className="text-display-md text-ivory-50 mt-3 font-semibold">{stage.name}</h3>
          <p className="text-ivory-100/80 mt-2 text-lg">{stage.summary}</p>
          <p className="text-ivory-100/75 mt-6 max-w-2xl leading-relaxed">{stage.happens}</p>

          <div className="border-ivory-100/12 mt-8 grid gap-6 border-t pt-8 sm:grid-cols-2">
            <div>
              <h4 className="meta text-ivory-100/70">You bring</h4>
              <ul className="mt-3 space-y-2">
                {stage.youBring.map((item) => (
                  <li key={item} className="text-ivory-100/85 flex gap-2.5">
                    <span className="bg-coral-400 mt-2.5 h-px w-3 shrink-0" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="meta text-ivory-100/70">We deliver</h4>
              <ul className="mt-3 space-y-2">
                {stage.weDeliver.map((item) => (
                  <li key={item} className="text-ivory-100/85 flex gap-2.5">
                    <Icon
                      name="check"
                      className="text-mint-300 mt-1 size-4 shrink-0"
                      strokeWidth={2.5}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="bg-midnight-950/60 text-ivory-100/85 mt-8 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm">
            <Icon name="flag" className="text-coral-400 size-4" />
            Approval point: {stage.gate}
          </p>
        </div>
      </div>
    </div>
  );
}
