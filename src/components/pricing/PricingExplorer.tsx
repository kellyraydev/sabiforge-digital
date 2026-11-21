import { useId, useState } from 'react';
import Icon from '@/components/ui/Icon';
import { foundingSlotsLabel } from '@/lib/pricing';

export interface PackageCard {
  id: string;
  name: string;
  modelName: string;
  scope: string;
  bestFor: string;
  objective: string;
  standard: string | null;
  founding: string | null;
  fromPrice: boolean;
  foundingEligible: boolean;
  typically: string[];
  enquiryHref: string;
}

interface Props {
  cards: PackageCard[];
  discountLabel: string;
}

type Mode = 'standard' | 'founding';

/**
 * Package overview with an accessible standard / founding-rate switch.
 * Standard prices are shown by default; the founding rate is opt-in.
 */
export default function PricingExplorer({ cards, discountLabel }: Props) {
  const [mode, setMode] = useState<Mode>('standard');
  const id = useId();
  const options: { value: Mode; label: string }[] = [
    { value: 'standard', label: 'Standard' },
    { value: 'founding', label: `Founding rate −${discountLabel}` },
  ];

  return (
    <div>
      <fieldset className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <legend className="meta text-ivory-100/70 float-left sm:float-none">Show prices as</legend>
        <div className="bg-midnight-950/70 ring-ivory-100/12 grid grid-cols-2 rounded-full p-1 ring-1 sm:inline-grid">
          {options.map((option) => {
            const inputId = `${id}-${option.value}`;
            const checked = mode === option.value;
            return (
              <div key={option.value}>
                <input
                  type="radio"
                  id={inputId}
                  name={`${id}-mode`}
                  value={option.value}
                  checked={checked}
                  onChange={() => setMode(option.value)}
                  className="peer sr-only"
                />
                <label
                  htmlFor={inputId}
                  className={`peer-focus-visible:outline-mint-300 flex min-h-10 cursor-pointer items-center justify-center rounded-full px-4 py-2 text-center text-sm font-semibold transition peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 ${
                    checked
                      ? 'bg-ivory-50 text-midnight-900'
                      : 'text-ivory-100/75 hover:text-ivory-50'
                  }`}
                >
                  {option.label}
                </label>
              </div>
            );
          })}
        </div>
      </fieldset>
      {mode === 'founding' && (
        <p className="text-ivory-100/75 mt-4 text-sm" role="status">
          Founding-client rates apply to Starter, Business and Online Store for{' '}
          {foundingSlotsLabel()}. Custom Software is not discounted. Eligibility is confirmed in
          writing.{' '}
          <a
            href="#founding-offer"
            className="text-mint-300 rounded-sm underline underline-offset-4"
          >
            Read the terms
          </a>
          .
        </p>
      )}

      <ul className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const discounted = mode === 'founding' && card.foundingEligible && card.founding;
          return (
            <li
              key={card.id}
              className="border-ivory-100/12 bg-midnight-800/50 flex flex-col rounded-[var(--radius-card)] border p-6 sm:p-7"
            >
              <p className="meta text-mint-300">{card.modelName}</p>
              <h3 className="font-display text-ivory-50 mt-3 text-3xl font-semibold">
                {card.name}
              </h3>
              <p className="text-ivory-100/85 mt-2">{card.scope}</p>

              <div
                className="border-ivory-100/12 mt-6 min-h-[5.5rem] border-y py-5"
                aria-live="polite"
              >
                {discounted ? (
                  <>
                    <p className="text-ivory-100/70 text-sm">
                      <span className="sr-only">Standard price: </span>
                      <s>{card.standard}</s>
                      <span className="bg-mint-300/15 text-mint-200 ml-2 rounded-full px-2 py-0.5 text-xs font-semibold">
                        Founding rate
                      </span>
                    </p>
                    <p className="font-display text-ivory-50 mt-1 text-4xl font-semibold tracking-tight">
                      <span className="sr-only">Founding-client price: </span>
                      {card.founding}
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-ivory-100/70 text-sm">
                      {mode === 'founding' && !card.foundingEligible
                        ? 'Not part of the founding offer'
                        : card.fromPrice
                          ? 'Starting price · custom quote after discovery'
                          : 'Fixed package price'}
                    </p>
                    <p className="font-display text-ivory-50 mt-1 text-4xl font-semibold tracking-tight">
                      {card.fromPrice && <span className="text-xl">From </span>}
                      {card.standard}
                    </p>
                  </>
                )}
              </div>

              <dl className="mt-5 space-y-4 text-sm">
                <div>
                  <dt className="meta text-ivory-100/60">Best for</dt>
                  <dd className="text-ivory-100/85 mt-1">{card.bestFor}</dd>
                </div>
                <div>
                  <dt className="meta text-ivory-100/60">Objective</dt>
                  <dd className="text-ivory-100/85 mt-1">{card.objective}</dd>
                </div>
              </dl>

              <p className="meta text-ivory-100/60 mt-6">Typically includes</p>
              <ul className="text-ivory-100/85 mt-3 space-y-2 text-sm">
                {card.typically.map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <Icon
                      name="check"
                      className="text-mint-300 mt-0.5 size-4 shrink-0"
                      strokeWidth={2.5}
                    />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-8">
                <a
                  href={card.enquiryHref}
                  className="border-ivory-100/25 text-ivory-50 hover:border-mint-300 hover:text-mint-200 flex min-h-11 items-center justify-center gap-2 rounded-full border font-semibold transition"
                >
                  {card.fromPrice ? 'Request a quote' : 'Enquire'}
                  <span className="sr-only"> about {card.name}</span>
                  <Icon name="arrow-right" className="size-4" />
                </a>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
