import { useId, useState } from 'react';
import Icon from '@/components/ui/Icon';
import type { IconKey } from '@/lib/icons';

export interface PricingCard {
  id: string;
  icon: IconKey;
  name: string;
  summary: string;
  standard: string;
  founding: string;
  foundingEligible: boolean;
  fromPrice: boolean;
  features: string[];
  featured: boolean;
  enquiryHref: string;
}

interface PricingPreviewProps {
  cards: PricingCard[];
  discountLabel: string;
  slots: number;
}

type Mode = 'founding' | 'standard';

export default function PricingPreview({ cards, discountLabel, slots }: PricingPreviewProps) {
  const [mode, setMode] = useState<Mode>('founding');
  const groupId = useId();
  const options: { value: Mode; label: string }[] = [
    { value: 'founding', label: 'Founding price' },
    { value: 'standard', label: 'Standard price' },
  ];

  return (
    <div>
      <div className="border-coral-500/30 flex flex-col gap-5 rounded-[var(--radius-card)] border bg-[linear-gradient(100deg,rgb(254_103_79/0.18),rgb(254_103_79/0.04))] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="flex items-start gap-4">
          <span className="bg-coral-500 text-midnight-950 flex size-11 shrink-0 items-center justify-center rounded-full">
            <Icon name="tag" className="size-5" />
          </span>
          <div>
            <p className="font-display text-ivory-50 text-lg font-semibold">
              Founding offer: {discountLabel} off for our first {slots} clients
            </p>
            <p className="text-ivory-100/70 mt-1 text-sm">
              Applies to the first {slots} eligible website packages booked (Launch, Business or
              Online Catalog). Full E-commerce is quoted after discovery.
            </p>
          </div>
        </div>

        <fieldset className="shrink-0">
          <legend className="sr-only">Show prices as</legend>
          <div className="bg-midnight-950/60 ring-ivory-100/10 inline-flex rounded-full p-1 ring-1">
            {options.map((option) => {
              const id = `${groupId}-${option.value}`;
              const checked = mode === option.value;
              return (
                <div key={option.value}>
                  <input
                    type="radio"
                    id={id}
                    name={`${groupId}-mode`}
                    value={option.value}
                    checked={checked}
                    onChange={() => setMode(option.value)}
                    className="peer sr-only"
                  />
                  <label
                    htmlFor={id}
                    className={`peer-focus-visible:outline-mint-300 block cursor-pointer rounded-full px-4 py-2 text-sm font-semibold transition peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 ${
                      checked
                        ? 'bg-ivory-50 text-midnight-900'
                        : 'text-ivory-100/70 hover:text-ivory-50'
                    }`}
                  >
                    {option.label}
                  </label>
                </div>
              );
            })}
          </div>
        </fieldset>
      </div>

      <ul className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4" aria-live="polite">
        {cards.map((card) => {
          const showDiscount = mode === 'founding' && card.foundingEligible;
          return (
            <li
              key={card.id}
              className={`relative flex flex-col rounded-[var(--radius-card)] p-6 transition ${
                card.featured
                  ? 'bg-ivory-50 text-midnight-900 ring-mint-300 shadow-[0_30px_60px_-30px_rgb(134_240_210/0.5)] ring-2'
                  : 'bg-ivory-100 text-midnight-900'
              }`}
            >
              {card.featured && (
                <span className="bg-mint-300 text-midnight-900 absolute -top-3 left-6 rounded-full px-3 py-1 text-xs font-bold">
                  Most popular
                </span>
              )}
              <div className="flex items-center gap-3">
                <span className="bg-mint-200/70 text-midnight-900 flex size-11 items-center justify-center rounded-xl">
                  <Icon name={card.icon} className="size-5" />
                </span>
                <h3 className="font-display text-xl font-semibold">{card.name}</h3>
              </div>
              <p className="text-midnight-800/75 mt-4 min-h-12 text-sm leading-relaxed">
                {card.summary}
              </p>

              <div className="border-midnight-900/10 mt-5 min-h-[5.5rem] border-t pt-5">
                {showDiscount ? (
                  <>
                    <p className="text-midnight-800/75 text-sm">
                      <span className="sr-only">Standard price </span>
                      <s>{card.standard}</s>
                      <span className="bg-coral-500/10 text-coral-800 ml-2 rounded-full px-2 py-0.5 text-xs font-semibold">
                        Save {discountLabel}
                      </span>
                    </p>
                    <p className="font-display text-midnight-900 mt-1 text-3xl font-bold tracking-tight">
                      <span className="sr-only">Founding price </span>
                      {card.founding}
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-midnight-800/75 text-sm">
                      {card.fromPrice ? 'Custom quote after discovery' : 'Package price'}
                    </p>
                    <p className="font-display text-midnight-900 mt-1 text-3xl font-bold tracking-tight">
                      {card.fromPrice && <span className="text-lg font-semibold">From </span>}
                      {card.standard}
                    </p>
                  </>
                )}
              </div>

              <ul className="text-midnight-800/85 mt-5 space-y-2.5 text-sm">
                {card.features.map((feature) => (
                  <li key={feature} className="flex gap-2.5">
                    <Icon
                      name="check"
                      className="text-mint-700 mt-0.5 size-4 shrink-0"
                      strokeWidth={2.5}
                    />
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href={card.enquiryHref}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-7 inline-flex h-11 items-center justify-center gap-2 rounded-full text-sm font-semibold transition ${
                  card.featured
                    ? 'bg-coral-500 hover:bg-coral-400 text-midnight-950'
                    : 'bg-midnight-900 text-ivory-50 hover:bg-midnight-700'
                }`}
              >
                {card.fromPrice ? 'Request a quote' : `Choose ${card.name}`}
                <Icon name="arrow-right" className="size-4" />
                <span className="sr-only">(opens WhatsApp in a new tab)</span>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
