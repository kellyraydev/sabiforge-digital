import { useId, useRef, useState, type KeyboardEvent } from 'react';
import Icon from '@/components/ui/Icon';

export interface PathwayOption {
  id: string;
  label: string;
  situation: string;
  recommendation: string;
  packageHint?: string;
  services: { name: string; href: string }[];
}

/**
 * "Where are you starting from?" — a radio group (arrow keys move and select)
 * that routes each audience to relevant services.
 */
export default function PathwaySelector({ options }: { options: PathwayOption[] }) {
  const [active, setActive] = useState(0);
  const groupId = useId();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const option = options[active];

  const move = (index: number) => {
    const next = (index + options.length) % options.length;
    setActive(next);
    refs.current[next]?.focus();
  };
  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
      event.preventDefault();
      move(active + 1);
    } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
      event.preventDefault();
      move(active - 1);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.05fr] lg:gap-10">
      <div role="radiogroup" aria-labelledby={`${groupId}-label`} className="grid gap-2">
        <p id={`${groupId}-label`} className="meta text-midnight-800 mb-2">
          Where are you starting from?
        </p>
        {options.map((item, index) => {
          const checked = index === active;
          return (
            <button
              key={item.id}
              ref={(el) => {
                refs.current[index] = el;
              }}
              type="button"
              role="radio"
              aria-checked={checked}
              tabIndex={checked ? 0 : -1}
              onClick={() => setActive(index)}
              onKeyDown={onKeyDown}
              className={`flex min-h-12 items-center justify-between gap-4 rounded-xl border px-4 py-3 text-left text-[0.95rem] font-medium transition ${
                checked
                  ? 'border-midnight-900 bg-midnight-900 text-ivory-50'
                  : 'border-midnight-900/15 bg-ivory-50 text-midnight-900 hover:border-midnight-900/50'
              }`}
            >
              {item.label}
              <span
                className={`flex size-5 shrink-0 items-center justify-center rounded-full border ${
                  checked
                    ? 'border-mint-300 bg-mint-300 text-midnight-900'
                    : 'border-midnight-900/30'
                }`}
                aria-hidden="true"
              >
                {checked && <Icon name="check" className="size-3.5" strokeWidth={3} />}
              </span>
            </button>
          );
        })}
      </div>

      <div
        className="chamfer bg-midnight-900 text-ivory-50 flex flex-col rounded-[var(--radius-card)] p-7 sm:p-9"
        aria-live="polite"
      >
        <p className="meta text-mint-300">Your situation</p>
        <p className="text-ivory-100/85 mt-3 text-lg leading-relaxed">{option.situation}</p>
        <p className="meta text-mint-300 mt-8">What we’d suggest</p>
        <p className="font-display mt-3 text-2xl leading-snug font-semibold sm:text-3xl">
          {option.recommendation}
        </p>
        {option.packageHint && (
          <p className="text-ivory-100/75 mt-4 text-sm">{option.packageHint}</p>
        )}
        <ul className="border-ivory-100/12 mt-8 grid gap-2 border-t pt-6">
          {option.services.map((service) => (
            <li key={service.href}>
              <a
                href={service.href}
                className="group text-ivory-50 hover:text-mint-300 flex items-center justify-between gap-4 rounded-md py-1.5 font-medium"
              >
                {service.name}
                <Icon name="arrow-right" className="size-4 transition group-hover:translate-x-1" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
