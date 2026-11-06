import { useId, useState } from 'react';

/**
 * Small, purposeful interactive demos for the studio concepts on /work.
 * They run on sample data, store nothing and call nothing. Each demonstrates one
 * design decision from its concept study.
 */

const naira = (n: number) => `₦${n.toLocaleString('en-NG')}`;

/* ---------- Àdùn Table: the menu, before and after ---------- */

export function MenuDemo() {
  const [view, setView] = useState<'before' | 'after'>('after');
  const id = useId();
  const dishes: [string, string, string][] = [
    ['Smoked jollof, party style', 'Serves 10', '₦6,500'],
    ['Ofada stew & plantain', 'Serves 8', '₦7,200'],
    ['Suya-spiced short rib', 'Serves 6', '₦12,000'],
  ];
  return (
    <div className="demo">
      <div role="group" aria-label="Menu version" className="flex gap-2">
        {(
          [
            ['before', 'Before: a forwarded image'],
            ['after', 'After: an editorial menu'],
          ] as const
        ).map(([key, label]) => (
          <button
            key={key}
            type="button"
            aria-pressed={view === key}
            onClick={() => setView(key)}
            className={`min-h-11 rounded-full border px-4 text-sm font-semibold transition ${
              view === key
                ? 'border-[#e8a24a] bg-[#e8a24a] text-[#2a1a14]'
                : 'border-[#f6efe4]/40 text-[#f6efe4] hover:border-[#e8a24a]'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div
        id={`${id}-stage`}
        className="mt-5 min-h-[19rem] overflow-hidden rounded-xl bg-[#f6efe4] p-6 text-[#2a1a14]"
      >
        {view === 'before' ? (
          <div
            aria-label="Illustration of a blurred photographed menu"
            role="img"
            className="relative"
          >
            <div className="rotate-[-1.5deg] rounded-md bg-[#d9d0c0] p-5 blur-[1.4px]">
              <p className="font-mono text-sm">MENU 2025 FINAL v3</p>
              {dishes.map(([n, , p]) => (
                <p key={n} className="mt-3 flex justify-between text-sm">
                  <span>{n}</span>
                  <span>{p}</span>
                </p>
              ))}
              <p className="mt-4 text-xs">call or dm for price 80+ ppl</p>
            </div>
            <ul className="mt-5 space-y-2 text-sm text-[#2a1a14]">
              <li>✕ Text is not selectable or translatable</li>
              <li>✕ Unreadable on a small or dim screen</li>
              <li>✕ Out of date the moment prices change</li>
            </ul>
          </div>
        ) : (
          <div>
            <p className="font-mono text-xs tracking-[0.2em] text-[#8a3b18] uppercase">
              Party trays · Lagos
            </p>
            <p className="mt-2 font-serif text-4xl leading-none">
              Food worth <em className="text-[#8a3b18]">gathering</em> for.
            </p>
            <dl className="mt-6 space-y-3">
              {dishes.map(([n, serves, p]) => (
                <div key={n} className="flex items-end gap-3">
                  <dt className="text-sm">
                    {n} <span className="text-[#5b4638]">· {serves}</span>
                  </dt>
                  <span
                    className="mb-1 flex-1 border-b border-dotted border-[#2a1a14]/40"
                    aria-hidden="true"
                  />
                  <dd className="text-sm font-semibold tabular-nums">{p}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-5 text-sm text-[#5b4638]">
              Planning an event? The enquiry asks for date, guests, area and budget range.
            </p>
          </div>
        )}
      </div>
      <p aria-live="polite" className="sr-only">
        Showing the {view === 'before' ? 'before' : 'after'} version.
      </p>
    </div>
  );
}

/* ---------- Kòrà Home: product page variants ---------- */

const colours = [
  { id: 'indigo', name: 'Indigo', hex: '#23305e', note: 'Deepest dye bath, three dips.' },
  { id: 'ochre', name: 'Ochre', hex: '#b36b2c', note: 'Warm, earthy; fades softly with washing.' },
  { id: 'sage', name: 'Sage', hex: '#5f6f52', note: 'Muted green, the most neutral of the three.' },
];
const sizes = [
  { id: 'single', name: 'Single', note: '150 × 200 cm', price: 38000 },
  { id: 'double', name: 'Double', note: '200 × 220 cm', price: 52000 },
];

export function ProductDemo() {
  const [colour, setColour] = useState(colours[0]);
  const [size, setSize] = useState(sizes[0]);
  const [bag, setBag] = useState(0);
  return (
    <div className="demo rounded-xl bg-[#efe7da] p-5 text-[#1d2240] sm:p-6">
      <div className="flex items-center justify-between text-sm">
        <span className="font-display text-2xl font-bold tracking-tight">kòrà</span>
        <span
          aria-live="polite"
          className="rounded-full border border-[#1d2240]/40 px-3 py-1 font-semibold"
        >
          Bag ({bag})
        </span>
      </div>
      <div className="mt-5 grid gap-5 sm:grid-cols-[1fr_1fr]">
        <div
          role="img"
          aria-label={`Swatch of the ${colour.name} Ọ̀run Throw`}
          className="relative aspect-square overflow-hidden rounded-xl transition-colors duration-500"
          style={{ background: colour.hex }}
        >
          <svg
            viewBox="0 0 100 100"
            className="absolute inset-0 size-full opacity-50"
            aria-hidden="true"
          >
            <defs>
              <pattern id="kd" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="6" fill="none" stroke="#efe7da" strokeWidth="1.2" />
                <circle cx="10" cy="10" r="2" fill="#efe7da" />
                <path d="M0 0l20 20M20 0 0 20" stroke="#efe7da" strokeWidth=".4" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#kd)" />
          </svg>
        </div>
        <div className="flex flex-col">
          <p className="font-mono text-xs tracking-[0.15em] uppercase">Throws</p>
          <h3 className="font-display mt-1 text-2xl font-semibold">Ọ̀run Throw</h3>
          <p className="mt-1 text-xl font-semibold tabular-nums">{naira(size.price)}</p>

          <fieldset className="mt-4">
            <legend className="text-sm">
              Colour: <strong>{colour.name}</strong>
            </legend>
            <div className="mt-2 flex gap-3">
              {colours.map((c) => (
                <label key={c.id} className="cursor-pointer">
                  <input
                    type="radio"
                    name="kora-colour"
                    className="peer sr-only"
                    checked={colour.id === c.id}
                    onChange={() => setColour(c)}
                  />
                  <span
                    className="block size-11 rounded-full ring-offset-2 ring-offset-[#efe7da] peer-checked:ring-2 peer-checked:ring-[#1d2240] peer-focus-visible:outline-3 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-[#1d2240]"
                    style={{ background: c.hex }}
                  >
                    <span className="sr-only">{c.name}</span>
                  </span>
                </label>
              ))}
            </div>
            <p className="mt-2 text-sm text-[#3f3d54]">{colour.note}</p>
          </fieldset>

          <fieldset className="mt-4">
            <legend className="text-sm">
              Size: <strong>{size.name}</strong> · {size.note}
            </legend>
            <div className="mt-2 flex gap-2">
              {sizes.map((s) => (
                <label key={s.id} className="cursor-pointer">
                  <input
                    type="radio"
                    name="kora-size"
                    className="peer sr-only"
                    checked={size.id === s.id}
                    onChange={() => setSize(s)}
                  />
                  <span className="flex min-h-11 items-center rounded-lg border border-[#1d2240]/50 px-4 text-sm font-semibold peer-checked:bg-[#1d2240] peer-checked:text-[#efe7da] peer-focus-visible:outline-3 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-[#1d2240]">
                    {s.name}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <button
            type="button"
            onClick={() => setBag((n) => n + 1)}
            className="mt-5 min-h-12 rounded-full bg-[#d79a2b] font-semibold text-[#1d2240] transition hover:bg-[#e3a93f] active:scale-[0.98] sm:mt-auto"
          >
            Add to bag
          </button>
          <p className="mt-3 text-xs text-[#3f3d54]">
            Hand-dyed in small batches. Machine wash cold, wash separately the first time.
          </p>
        </div>
      </div>
      <p className="mt-4 border-t border-[#1d2240]/20 pt-3 text-xs text-[#3f3d54]">
        Sample data. No store, checkout or payment is connected.
      </p>
    </div>
  );
}

/* ---------- Mend Physio Studio: what to expect ---------- */

const visits = [
  {
    id: 'back',
    name: 'Back & neck',
    before: 'Wear comfortable clothes. Bring any earlier scans or notes if you have them.',
    during:
      'A conversation about when it started and what makes it better or worse, then a gentle movement check.',
    after: 'A plain-language explanation of what we found and a plan you can say yes or no to.',
  },
  {
    id: 'sport',
    name: 'Sports injury',
    before: 'Bring the shoes or kit you use. Note what you were doing when it happened.',
    during:
      'We look at how the injured area moves and how it copes with the activity you want to return to.',
    after: 'A sensible order of steps back to your sport, and what to watch for in the meantime.',
  },
  {
    id: 'surgery',
    name: 'After surgery',
    before: 'Bring your surgeon’s notes or discharge letter, and a list of any restrictions.',
    during:
      'We start from what your surgeon advised, and check comfort and movement at a pace that suits you.',
    after: 'A written outline of the next few weeks and who to contact if something feels wrong.',
  },
];

export function ExpectDemo() {
  const [active, setActive] = useState(visits[0]);
  const [slot, setSlot] = useState<string | null>(null);
  const slots = ['Tue 10:00', 'Wed 14:30', 'Fri 09:00'];
  return (
    <div className="demo rounded-xl bg-white/80 p-5 text-[#173a31] sm:p-6">
      <p className="font-semibold">What brings you in?</p>
      <div role="radiogroup" aria-label="What brings you in?" className="mt-3 flex flex-wrap gap-2">
        {visits.map((v) => (
          <button
            key={v.id}
            type="button"
            role="radio"
            aria-checked={active.id === v.id}
            onClick={() => setActive(v)}
            className={`min-h-11 rounded-full border px-4 text-sm font-semibold transition ${
              active.id === v.id
                ? 'border-[#173a31] bg-[#173a31] text-[#e4ece6]'
                : 'border-[#173a31]/50 hover:bg-[#173a31]/5'
            }`}
          >
            {v.name}
          </button>
        ))}
      </div>

      <div aria-live="polite" className="mt-5">
        <ol className="grid gap-3 sm:grid-cols-3">
          {(
            [
              ['Before', active.before],
              ['In the room', active.during],
              ['You leave with', active.after],
            ] as const
          ).map(([label, text], i) => (
            <li key={label} className="rounded-xl bg-[#e4ece6] p-4">
              <span className="font-mono text-xs tracking-wider uppercase">
                {i + 1}. {label}
              </span>
              <span className="mt-2 block text-sm leading-relaxed">{text}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        <span className="text-sm">Request an opening:</span>
        {slots.map((s) => (
          <button
            key={s}
            type="button"
            aria-pressed={slot === s}
            onClick={() => setSlot(slot === s ? null : s)}
            className={`min-h-11 rounded-full border px-4 text-sm font-semibold ${
              slot === s ? 'border-[#8a3b18] bg-[#e8956d] text-[#0f2a23]' : 'border-[#173a31]/50'
            }`}
          >
            {s}
          </button>
        ))}
      </div>
      <p aria-live="polite" className="mt-3 min-h-5 text-sm">
        {slot
          ? `Request noted for ${slot}. In a real build, a name and phone number would be next.`
          : ''}
      </p>
      <p className="mt-3 border-t border-[#173a31]/20 pt-3 text-xs text-[#2f5c4f]">
        Illustrative wording for a fictional clinic. Not clinical advice.
      </p>
    </div>
  );
}

/* ---------- Tallyhouse: filtering what needs attention ---------- */

type Status = 'Overdue' | 'Sent' | 'Paid';
const invoices: { id: string; client: string; amount: number; status: Status; due: string }[] = [
  { id: 'INV-0142', client: 'Bello Prints', amount: 185000, status: 'Overdue', due: '6 days late' },
  { id: 'INV-0141', client: 'Ada & Co.', amount: 92500, status: 'Paid', due: 'Paid 2 Nov' },
  {
    id: 'INV-0140',
    client: 'Okafor Logistics',
    amount: 310000,
    status: 'Sent',
    due: 'Due in 9 days',
  },
  {
    id: 'INV-0139',
    client: 'Sade Interiors',
    amount: 64000,
    status: 'Overdue',
    due: '2 days late',
  },
  {
    id: 'INV-0138',
    client: 'Greenfield Foods',
    amount: 128000,
    status: 'Sent',
    due: 'Due in 3 days',
  },
];
const statusStyle: Record<Status, string> = {
  Overdue: 'bg-[#ffe1d9] text-[#8f2a1a]',
  Paid: 'bg-[#e2f7c4] text-[#34510a]',
  Sent: 'bg-[#e3e8f5] text-[#14213d]',
};

export function InvoiceDemo() {
  const [filter, setFilter] = useState<'All' | Status>('All');
  const list = invoices.filter((i) => filter === 'All' || i.status === filter);
  const outstanding = invoices.filter((i) => i.status !== 'Paid').reduce((a, i) => a + i.amount, 0);
  const shown = list.reduce((a, i) => a + i.amount, 0);
  return (
    <div className="demo mx-auto w-full max-w-sm rounded-[2.2rem] bg-[#161d36] p-2.5 shadow-[0_30px_60px_-20px_rgb(0_0_0/0.8)]">
      <div className="overflow-hidden rounded-[1.8rem] bg-[#f4f6fb] p-4 text-[#14213d]">
        <div className="rounded-2xl bg-[#14213d] p-4 text-[#f4f6fb]">
          <p className="text-xs text-[#c9d1e8]">Outstanding</p>
          <p className="mt-1 text-3xl font-semibold tracking-tight tabular-nums">
            {naira(outstanding)}
          </p>
        </div>
        <div role="group" aria-label="Filter invoices" className="mt-4 flex gap-2">
          {(['All', 'Overdue', 'Sent', 'Paid'] as const).map((f) => (
            <button
              key={f}
              type="button"
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
              className={`min-h-11 flex-1 rounded-full border text-sm font-semibold transition ${
                filter === f
                  ? 'border-[#14213d] bg-[#c6f36b] text-[#14213d]'
                  : 'border-[#14213d]/40'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <ul className="mt-3 min-h-[13.5rem] space-y-2" aria-live="polite">
          {list.map((i) => (
            <li
              key={i.id}
              className="flex items-center justify-between rounded-xl bg-white px-3 py-2.5 text-sm"
            >
              <span>
                <span className="block font-semibold">{i.client}</span>
                <span className="block text-xs text-[#3b4660]">
                  {i.id} · {i.due}
                </span>
              </span>
              <span className="text-right">
                <span className="block font-semibold tabular-nums">{naira(i.amount)}</span>
                <span
                  className={`mt-0.5 inline-block rounded-full px-2 text-xs font-semibold ${statusStyle[i.status]}`}
                >
                  {i.status}
                </span>
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-2 text-xs text-[#3b4660]">
          Showing {list.length} · {naira(shown)} · Sample data
        </p>
      </div>
    </div>
  );
}
