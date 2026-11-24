import { useState } from 'react';

/**
 * Maison Vale Studios demo: project index by space type, material palettes, and a short enquiry.
 * Fictional practice; rooms and materials are illustrative. No timeline or result is promised.
 * Palette: ivory #F6F1E8, walnut #6B4A32, stone #C8BBA8, olive #5E6B45, ink #2C241C.
 */
type Space = 'Residential' | 'Hospitality' | 'Commercial';
const SPACES: Space[] = ['Residential', 'Hospitality', 'Commercial'];

const projects: {
  id: string;
  name: string;
  space: Space;
  note: string;
  materials: [string, string][];
}[] = [
  {
    id: 'garden-flat',
    name: 'Garden flat living room',
    space: 'Residential',
    note: 'Low furniture and warm timber for a north-facing room.',
    materials: [
      ['Oiled walnut', '#6B4A32'],
      ['Limewash', '#EFE7DA'],
      ['Olive linen', '#5E6B45'],
    ],
  },
  {
    id: 'family-kitchen',
    name: 'Family kitchen',
    space: 'Residential',
    note: 'Durable stone worktops and open shelving.',
    materials: [
      ['Honed stone', '#C8BBA8'],
      ['Ivory lacquer', '#F6F1E8'],
      ['Brushed brass', '#B8975A'],
    ],
  },
  {
    id: 'boutique-lobby',
    name: 'Boutique hotel lobby',
    space: 'Hospitality',
    note: 'A calm arrival with soft light and a long timber desk.',
    materials: [
      ['Walnut', '#6B4A32'],
      ['Travertine', '#D9CBB8'],
      ['Ink felt', '#2C241C'],
    ],
  },
  {
    id: 'cafe-bar',
    name: 'Neighbourhood café',
    space: 'Hospitality',
    note: 'Banquette seating and a tiled counter.',
    materials: [
      ['Glazed tile', '#5E6B45'],
      ['Oak', '#A9825A'],
      ['Plaster', '#EFE7DA'],
    ],
  },
  {
    id: 'studio-office',
    name: 'Studio office',
    space: 'Commercial',
    note: 'Quiet zones, shared tables and plenty of storage.',
    materials: [
      ['Ash', '#CDB38F'],
      ['Stone', '#C8BBA8'],
      ['Olive', '#5E6B45'],
    ],
  },
];

const sizes = ['A single room', 'A whole home or floor', 'A larger building'];
const stages = ['Just exploring', 'Ready to plan', 'Already have drawings'];

const ring =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5E6B45]';

export default function MaisonValeDemo() {
  const [filter, setFilter] = useState<Space | 'All'>('All');
  const [open, setOpen] = useState<string | null>(null);
  const [space, setSpace] = useState<Space | ''>('');
  const [size, setSize] = useState('');
  const [stage, setStage] = useState('');
  const [summary, setSummary] = useState(false);
  const [missing, setMissing] = useState(false);

  const shown = filter === 'All' ? projects : projects.filter((p) => p.space === filter);

  const choice = (value: string, current: string, set: (v: never) => void, name: string) => (
    <button
      key={value}
      type="button"
      aria-pressed={current === value}
      onClick={() => {
        set(value as never);
        setSummary(false);
      }}
      className={`min-h-11 rounded-full border px-4 text-sm ${ring} ${
        current === value
          ? 'border-[#2C241C] bg-[#2C241C] text-[#F6F1E8]'
          : 'border-[#2C241C]/25 hover:border-[#2C241C]'
      }`}
    >
      {value}
      <span className="sr-only"> ({name})</span>
    </button>
  );

  return (
    <div className="bg-[#F6F1E8] font-sans text-[#2C241C]" data-maison>
      <header className="flex items-center justify-between px-4 py-4 sm:px-6">
        <span className="font-display text-xl tracking-[0.2em]">MAISON VALE</span>
        <span className="text-xs text-[#5a4a3a]">Interior studio · concept</span>
      </header>

      <div className="px-4 pb-6 sm:px-6">
        <h2 className="font-display text-2xl font-semibold sm:text-3xl">Projects by space</h2>
        <div
          role="group"
          aria-label="Filter projects by space"
          className="mt-3 flex flex-wrap gap-2"
          data-maison-filters
        >
          {(['All', ...SPACES] as const).map((s) => (
            <button
              key={s}
              type="button"
              aria-pressed={filter === s}
              onClick={() => {
                setFilter(s);
                setOpen(null);
              }}
              className={`min-h-11 rounded-full border px-4 text-sm font-semibold ${ring} ${
                filter === s
                  ? 'border-[#5E6B45] bg-[#5E6B45] text-white'
                  : 'border-[#2C241C]/25 hover:border-[#2C241C]'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <ul
          className="mt-4 divide-y divide-[#2C241C]/10 border-y border-[#2C241C]/10"
          data-maison-projects
        >
          {shown.map((p) => (
            <li key={p.id}>
              <button
                type="button"
                aria-expanded={open === p.id}
                aria-controls={`mv-${p.id}`}
                onClick={() => setOpen(open === p.id ? null : p.id)}
                className={`flex min-h-14 w-full items-center justify-between gap-3 py-3 text-left ${ring}`}
              >
                <span>
                  <span className="block font-semibold">{p.name}</span>
                  <span className="text-xs text-[#5a4a3a]">{p.space}</span>
                </span>
                <span className="flex shrink-0 gap-1" aria-hidden="true">
                  {p.materials.map(([, hex]) => (
                    <span
                      key={hex}
                      className="size-5 rounded-full border border-[#2C241C]/15"
                      style={{ background: hex }}
                    />
                  ))}
                </span>
              </button>
              {open === p.id && (
                <div id={`mv-${p.id}`} className="pb-4">
                  <p className="text-sm">{p.note}</p>
                  <ul className="mt-3 grid grid-cols-3 gap-2">
                    {p.materials.map(([name, hex]) => (
                      <li key={name}>
                        <span
                          className="block h-14 rounded-lg border border-[#2C241C]/10"
                          style={{ background: hex }}
                        />
                        <span className="mt-1 block text-xs">{name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>

        <section
          aria-labelledby="mv-enquiry"
          className="mt-6 rounded-2xl bg-white p-4 sm:p-5"
          data-maison-enquiry
        >
          <h2 id="mv-enquiry" className="font-display text-xl font-semibold">
            Tell us about your space
          </h2>
          <p className="mt-3 text-sm font-semibold">What kind of space?</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {SPACES.map((s) => choice(s, space, setSpace as never, 'space'))}
          </div>
          <p className="mt-4 text-sm font-semibold">How big is it?</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {sizes.map((s) => choice(s, size, setSize as never, 'size'))}
          </div>
          <p className="mt-4 text-sm font-semibold">Where are you with it?</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {stages.map((s) => choice(s, stage, setStage as never, 'stage'))}
          </div>
          <button
            type="button"
            onClick={() => {
              const ok = Boolean(space && size && stage);
              setMissing(!ok);
              setSummary(ok);
            }}
            className={`mt-5 min-h-12 rounded-full bg-[#6B4A32] px-6 text-sm font-semibold text-white ${ring}`}
          >
            Review my enquiry
          </button>
          <div role="status" className="mt-4 text-sm">
            {missing && (
              <p className="font-semibold text-[#8a2e1d]">Choose an answer for each question.</p>
            )}
            {summary && (
              <div
                className="rounded-xl border border-[#5E6B45]/40 bg-[#5E6B45]/10 p-3"
                data-maison-summary
              >
                <p>
                  <strong>{space}</strong> · {size.toLowerCase()} · {stage.toLowerCase()}.
                </p>
                <p className="mt-1">
                  Demo: a real studio would reply to talk it through. No timeline or result is
                  promised, and nothing has been sent.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
