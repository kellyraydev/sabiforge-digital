import { useEffect, useRef, useState } from 'react';
import {
  questionsFor,
  recommend,
  type FinderAnswers,
  type Goal,
  type Pages,
  type SelfEdit,
} from '@/lib/package-finder';

export interface FinderPackage {
  id: string;
  name: string;
  priceLabel: string;
  /** e.g. "Founding rate ₦135,000", or null when not eligible. */
  foundingLabel: string | null;
}

interface Props {
  packages: FinderPackage[];
  whatsappNumber: string;
}

type Key = 'goal' | 'pages' | 'selfEdit';

const questions: Record<Key, { title: string; options: { value: string; label: string }[] }> = {
  goal: {
    title: 'What should your website mainly do?',
    options: [
      { value: 'present', label: 'Show my business and bring in enquiries' },
      { value: 'sell', label: 'Sell products online, with payments' },
      { value: 'system', label: 'Run part of my business: bookings, records or a dashboard' },
    ],
  },
  pages: {
    title: 'How many pages do you think you need?',
    options: [
      { value: 'few', label: '5 or fewer (home, about, services, contact…)' },
      { value: 'more', label: 'More than 5, or a portfolio of work' },
      { value: 'unsure', label: 'Not sure yet' },
    ],
  },
  selfEdit: {
    title: 'Do you want to update the content yourself?',
    options: [
      { value: 'yes', label: 'Yes, I want to edit pages myself' },
      { value: 'no', label: 'No, I’ll ask you when something changes' },
      { value: 'unsure', label: 'Not sure' },
    ],
  },
};

export default function PackageFinder({ packages, whatsappNumber }: Props) {
  const [answers, setAnswers] = useState<FinderAnswers>({});
  const [step, setStep] = useState(0);
  const heading = useRef<HTMLHeadingElement>(null);
  const started = useRef(false);

  const order = questionsFor(answers);
  const result = step >= order.length ? recommend(answers) : null;
  const current = order[step];

  useEffect(() => {
    // Move focus to each new question or the result, but not on first render.
    if (started.current) heading.current?.focus();
    started.current = true;
  }, [step]);

  const choose = (key: Key, value: string) => {
    const next: FinderAnswers =
      key === 'goal' ? { goal: value as Goal } : { ...answers, [key]: value as Pages | SelfEdit };
    setAnswers(next);
    setStep((s) => s + 1);
  };

  const pkg = result ? packages.find((p) => p.id === result.packageId) : undefined;
  const whatsappHref = pkg
    ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
        `Hello SabiForge Digital, the package finder suggested ${pkg.name} for my business. Can we talk about it?`,
      )}`
    : '#';

  const button =
    'min-h-11 rounded-full px-5 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint-300';

  return (
    <div
      className="border-ivory-100/10 bg-midnight-900/70 rounded-3xl border p-6 sm:p-8"
      data-package-finder
    >
      <p className="meta text-mint-300">Package finder</p>

      {result && pkg ? (
        <div data-finder-result>
          <h3
            ref={heading}
            tabIndex={-1}
            className="font-display text-ivory-50 mt-3 text-2xl font-semibold outline-none"
          >
            We’d suggest <span className="text-mint-300">{pkg.name}</span>
          </h3>
          <p className="text-ivory-100/80 mt-1">
            {pkg.priceLabel}
            {pkg.foundingLabel && <span className="text-ivory-100/60"> · {pkg.foundingLabel}</span>}
          </p>
          <ul className="mt-4 space-y-2">
            {result.reasons.map((reason) => (
              <li key={reason} className="text-ivory-100/80 flex gap-2 text-sm">
                <span aria-hidden="true" className="text-mint-300">
                  ✓
                </span>
                {reason}
              </li>
            ))}
          </ul>
          <p className="text-ivory-100/60 mt-4 text-xs">
            A suggestion, not a quote. Final scope is agreed in your proposal after a free first
            consultation.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={`/contact?package=${pkg.id}`}
              className={`${button} bg-coral-600 hover:bg-coral-700 inline-flex items-center text-white`}
            >
              Start with {pkg.name}
            </a>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className={`${button} border-ivory-100/25 text-ivory-50 hover:border-ivory-100/60 inline-flex items-center border`}
            >
              Ask on WhatsApp<span className="sr-only"> (opens in a new tab)</span>
            </a>
            <button
              type="button"
              onClick={() => {
                setAnswers({});
                setStep(0);
              }}
              className={`${button} text-ivory-100/80 hover:text-ivory-50 underline underline-offset-4`}
            >
              Start again
            </button>
          </div>
        </div>
      ) : current ? (
        <fieldset>
          <legend className="contents">
            <h3
              ref={heading}
              tabIndex={-1}
              className="font-display text-ivory-50 mt-3 text-xl font-semibold outline-none sm:text-2xl"
            >
              {questions[current].title}
            </h3>
          </legend>
          <p className="text-ivory-100/60 mt-1 text-sm" data-finder-progress>
            {step === 0 ? 'Question 1 of up to 3' : `Question ${step + 1} of ${order.length}`}
          </p>
          <div className="mt-5 grid gap-3">
            {questions[current].options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => choose(current, option.value)}
                className="border-ivory-100/15 text-ivory-50 hover:border-mint-300/60 hover:bg-mint-300/5 focus-visible:outline-mint-300 min-h-12 rounded-xl border px-4 py-3 text-left text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                {option.label}
              </button>
            ))}
          </div>
          {step > 0 && (
            <button
              type="button"
              onClick={() => setStep((s) => s - 1)}
              className={`${button} text-ivory-100/80 hover:text-ivory-50 mt-4 px-0 underline underline-offset-4`}
            >
              Back
            </button>
          )}
        </fieldset>
      ) : null}
    </div>
  );
}
