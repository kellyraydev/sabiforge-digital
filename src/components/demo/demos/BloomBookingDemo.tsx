import { useEffect, useMemo, useRef, useState } from 'react';
import { bloomDays, bloomSessions, bloomTimes } from '@/data/demos/bloom-wellness-studio';

/**
 * Bloom Wellness Studio demo: request a visit. Fictional studio; nothing is booked or sent.
 * Palette: sage #D7E4D4, linen #F7F3EC, clay #8C5A45, leaf #3E5C45.
 */
type Step = 0 | 1 | 2 | 3 | 4;
const STEPS = ['Session', 'Day', 'Time', 'Details'] as const;

const ring =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3E5C45]';

const dayLabel = (iso: string, style: 'short' | 'long') => {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString('en-GB', {
    weekday: style === 'short' ? 'short' : 'long',
    day: 'numeric',
    month: style === 'short' ? 'short' : 'long',
  });
};

export default function BloomBookingDemo() {
  const [step, setStep] = useState<Step>(0);
  const [sessionId, setSessionId] = useState('');
  const [day, setDay] = useState('');
  const [time, setTime] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [note, setNote] = useState('');
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const heading = useRef<HTMLHeadingElement>(null);
  const root = useRef<HTMLDivElement>(null);
  const mounted = useRef(false);

  const days = useMemo(() => bloomDays(new Date()), []);
  const session = bloomSessions.find((s) => s.id === sessionId);
  const times = day && sessionId ? bloomTimes(day, sessionId) : [];

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    root.current?.scrollIntoView({ block: 'start' });
    heading.current?.focus({ preventScroll: true });
  }, [step]);

  const submit = () => {
    const next: typeof errors = {};
    if (name.trim().length < 2) next.name = 'Enter your name.';
    if (!/^\+?[\d\s()-]{7,}$/.test(phone.trim()))
      next.phone = 'Enter a phone or WhatsApp number, for example 0803 123 4567.';
    setErrors(next);
    if (Object.keys(next).length === 0) setStep(4);
    // Take keyboard and screen-reader users straight to the first field to fix.
    else document.getElementById(next.name ? 'bloom-name' : 'bloom-phone')?.focus();
  };

  const restart = () => {
    setStep(0);
    setSessionId('');
    setDay('');
    setTime('');
    setName('');
    setPhone('');
    setNote('');
    setErrors({});
  };

  const titles: Record<Step, string> = {
    0: 'Which session would you like?',
    1: 'Which day suits you?',
    2: 'Choose a time',
    3: 'Your details',
    4: 'Request sent (demo)',
  };

  return (
    <div
      ref={root}
      className="scroll-mt-40 bg-[#F7F3EC] font-sans text-[#1f2a22]"
      data-bloom
      data-step={step}
    >
      <header className="flex items-center justify-between bg-[#3E5C45] px-4 py-3 text-[#F7F3EC] sm:px-6">
        <span className="font-display text-lg font-semibold tracking-wide">Bloom</span>
        <span className="text-xs text-[#D7E4D4]">Wellness studio · Request a visit</span>
      </header>

      <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-8">
        {step < 4 && (
          <ol className="mb-6 grid grid-cols-4 gap-2" aria-label="Progress">
            {STEPS.map((label, i) => (
              <li key={label} aria-current={i === step ? 'step' : undefined}>
                <span
                  className={`block h-1.5 rounded-full ${i <= step ? 'bg-[#3E5C45]' : 'bg-[#D7E4D4]'}`}
                />
                <span
                  className={`mt-1.5 block text-xs ${i === step ? 'font-semibold text-[#1f2a22]' : 'text-[#4d5a50]'}`}
                >
                  {i + 1}. {label}
                </span>
              </li>
            ))}
          </ol>
        )}

        <h2
          ref={heading}
          tabIndex={-1}
          className="font-display text-2xl font-semibold text-[#1f2a22] outline-none sm:text-3xl"
        >
          {titles[step]}
        </h2>

        {step === 0 && (
          <ul className="mt-5 grid gap-3 sm:grid-cols-2" data-bloom-sessions>
            {bloomSessions.map((s) => (
              <li key={s.id}>
                <button
                  type="button"
                  aria-pressed={sessionId === s.id}
                  onClick={() => {
                    setSessionId(s.id);
                    setTime('');
                    setStep(1);
                  }}
                  className={`h-full w-full rounded-2xl border bg-white p-4 text-left transition hover:border-[#3E5C45] ${ring} ${
                    sessionId === s.id ? 'border-[#3E5C45]' : 'border-[#1f2a22]/10'
                  }`}
                >
                  <span className="flex items-baseline justify-between gap-3">
                    <span className="font-semibold">{s.name}</span>
                    <span className="shrink-0 text-sm text-[#4d5a50]">{s.minutes} min</span>
                  </span>
                  <span className="mt-1.5 block text-sm text-[#3b463e]">{s.summary}</span>
                  <span className="mt-2 block text-xs font-semibold text-[#7a4a37]">
                    Suits: {s.suits}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}

        {step === 1 && (
          <>
            <p className="mt-2 text-sm text-[#3b463e]">
              {session?.name} · {session?.minutes} min. The studio is closed on Sundays.
            </p>
            <ul className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4" data-bloom-days>
              {days.map((d) => (
                <li key={d.iso}>
                  <button
                    type="button"
                    disabled={d.closed}
                    aria-pressed={day === d.iso}
                    onClick={() => {
                      setDay(d.iso);
                      setTime('');
                      setStep(2);
                    }}
                    className={`min-h-14 w-full rounded-xl border px-3 py-2 text-sm font-semibold ${ring} ${
                      d.closed
                        ? 'cursor-not-allowed border-dashed border-[#1f2a22]/20 text-[#6b746d]'
                        : day === d.iso
                          ? 'border-[#3E5C45] bg-[#3E5C45] text-[#F7F3EC]'
                          : 'border-[#1f2a22]/15 bg-white hover:border-[#3E5C45]'
                    }`}
                  >
                    {dayLabel(d.iso, 'short')}
                    {d.closed && <span className="block text-xs font-normal">Closed</span>}
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}

        {step === 2 && (
          <>
            <p className="mt-2 text-sm text-[#3b463e]">
              {session?.name} on {dayLabel(day, 'long')}. Greyed-out times are already taken.
            </p>
            <ul className="mt-5 grid grid-cols-3 gap-2 sm:grid-cols-4" data-bloom-times>
              {times.map((t) => (
                <li key={t.time}>
                  <button
                    type="button"
                    disabled={t.taken}
                    aria-pressed={time === t.time}
                    onClick={() => {
                      setTime(t.time);
                      setStep(3);
                    }}
                    className={`min-h-12 w-full rounded-xl border text-sm font-semibold ${ring} ${
                      t.taken
                        ? 'cursor-not-allowed border-[#1f2a22]/10 bg-[#ece8e0] text-[#6b746d] line-through'
                        : time === t.time
                          ? 'border-[#3E5C45] bg-[#3E5C45] text-[#F7F3EC]'
                          : 'border-[#1f2a22]/15 bg-white hover:border-[#3E5C45]'
                    }`}
                  >
                    {t.time}
                    <span className="sr-only">{t.taken ? ', taken' : ', available'}</span>
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}

        {step === 3 && (
          <form
            className="mt-5 grid gap-4"
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              submit();
            }}
          >
            <p className="rounded-xl bg-[#D7E4D4]/60 p-3 text-sm">
              <strong>{session?.name}</strong>, {dayLabel(day, 'long')} at {time}
            </p>
            <Field
              id="bloom-name"
              label="Your name"
              value={name}
              onChange={setName}
              error={errors.name}
              autoComplete="name"
            />
            <Field
              id="bloom-phone"
              label="Phone or WhatsApp number"
              value={phone}
              onChange={setPhone}
              error={errors.phone}
              autoComplete="tel"
              inputMode="tel"
            />
            <div>
              <label htmlFor="bloom-note" className="text-sm font-semibold">
                Anything we should know? <span className="font-normal">(optional)</span>
              </label>
              <textarea
                id="bloom-note"
                rows={3}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className={`mt-1.5 w-full rounded-xl border border-[#1f2a22]/20 bg-white p-3 text-sm ${ring}`}
              />
            </div>
            <p className="text-xs text-[#4d5a50]">
              Demo only: nothing you type here is sent or saved.
            </p>
            <button
              type="submit"
              className={`min-h-12 rounded-full bg-[#8C5A45] px-6 text-sm font-semibold text-white hover:bg-[#764a38] sm:justify-self-start ${ring}`}
            >
              Send request
            </button>
          </form>
        )}

        {step === 4 && (
          <div className="mt-4" data-bloom-confirmation>
            <p className="text-[#3b463e]">
              Thank you{name.trim() ? `, ${name.trim().split(' ')[0]}` : ''}. Here is the request
              that would go to the studio:
            </p>
            <dl className="mt-4 grid gap-2 rounded-2xl border border-[#1f2a22]/10 bg-white p-4 text-sm sm:grid-cols-[8rem_1fr]">
              <dt className="font-semibold">Session</dt>
              <dd>
                {session?.name} ({session?.minutes} min)
              </dd>
              <dt className="font-semibold">When</dt>
              <dd>
                {dayLabel(day, 'long')} at {time}
              </dd>
              <dt className="font-semibold">Contact</dt>
              <dd>{phone}</dd>
              {note.trim() && (
                <>
                  <dt className="font-semibold">Note</dt>
                  <dd>{note.trim()}</dd>
                </>
              )}
            </dl>
            <p
              role="status"
              className="mt-4 rounded-xl border-l-4 border-[#8C5A45] bg-[#f3e6da] p-3 text-sm"
            >
              <strong>Nothing has been booked.</strong> Bloom is a fictional studio. On a real site
              this request goes to the studio, who confirm the time with you on WhatsApp.
            </p>
          </div>
        )}

        <div className="mt-6 flex flex-wrap gap-3">
          {step > 0 && step < 4 && (
            <button
              type="button"
              onClick={() => setStep((s) => (s - 1) as Step)}
              className={`min-h-11 text-sm font-semibold underline underline-offset-4 ${ring}`}
            >
              Back
            </button>
          )}
          {step === 4 && (
            <button
              type="button"
              onClick={restart}
              className={`min-h-11 rounded-full border border-[#3E5C45] px-5 text-sm font-semibold ${ring}`}
            >
              Start a new request
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  ...input
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
} & Pick<React.InputHTMLAttributes<HTMLInputElement>, 'autoComplete' | 'inputMode'>) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold">
        {label}
      </label>
      <input
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`mt-1.5 min-h-12 w-full rounded-xl border bg-white px-3 text-sm ${ring} ${
          error ? 'border-[#a3341f]' : 'border-[#1f2a22]/20'
        }`}
        {...input}
      />
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1 text-sm font-semibold text-[#a3341f]">
          {error}
        </p>
      )}
    </div>
  );
}
