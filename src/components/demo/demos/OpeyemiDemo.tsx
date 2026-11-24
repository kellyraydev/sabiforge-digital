import { useState } from 'react';

/**
 * Opeyemi Phones & Gadgets demo: uncommissioned concept for an existing business.
 * Browse sample listings or describe a device to sell or swap. No prices, warranty, stock or
 * phone number; the WhatsApp control is disabled, as the concept specifies.
 * Palette: cobalt #123CC9, deep #0A215F, white, WhatsApp green #079344.
 */
type Mode = 'browse' | 'swap';
type Kind = 'Phones' | 'Laptops' | 'Watches';
const KINDS: Kind[] = ['Phones', 'Laptops', 'Watches'];

const listings: Record<Kind, string[]> = {
  Phones: ['Smartphone, 128 GB', 'Smartphone, 256 GB', 'Compact phone, 64 GB'],
  Laptops: [
    '13-inch laptop, 8 GB memory',
    '14-inch laptop, 16 GB memory',
    '15-inch laptop, 16 GB memory',
  ],
  Watches: ['Smartwatch, 41 mm', 'Smartwatch, 45 mm', 'Fitness band'],
};

const conditions = ['Like new', 'Good', 'Fair (visible wear)', 'Faulty'];

const ring =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#123CC9]';

export default function OpeyemiDemo() {
  const [mode, setMode] = useState<Mode>('browse');
  const [kind, setKind] = useState<Kind>('Phones');
  const [swapKind, setSwapKind] = useState<Kind | ''>('');
  const [model, setModel] = useState('');
  const [condition, setCondition] = useState('');
  const [intent, setIntent] = useState<'Sell' | 'Swap'>('Swap');
  const [summary, setSummary] = useState('');
  const [error, setError] = useState('');

  const review = () => {
    if (!swapKind || model.trim().length < 2 || !condition) {
      setError('Choose a device type, write the model and pick a condition.');
      setSummary('');
      return;
    }
    setError('');
    setSummary(
      `${intent}: ${swapKind.replace(/s$/, '').toLowerCase()} · ${model.trim()} · ${condition.toLowerCase()}`,
    );
  };

  return (
    <div className="bg-white font-sans text-[#0A215F]" data-opeyemi>
      <header className="flex items-center justify-between gap-3 bg-[#123CC9] px-4 py-3 text-white sm:px-6">
        <span className="font-semibold">Opeyemi Phones &amp; Gadgets</span>
        <div role="group" aria-label="Shop or sell" className="flex rounded-full bg-white/15 p-1">
          {(['browse', 'swap'] as const).map((m) => (
            <button
              key={m}
              type="button"
              aria-pressed={mode === m}
              onClick={() => setMode(m)}
              className={`min-h-9 rounded-full px-3 text-xs font-semibold ${ring} ${mode === m ? 'bg-white text-[#123CC9]' : 'text-white'}`}
            >
              {m === 'browse' ? 'Browse' : 'Sell or swap'}
            </button>
          ))}
        </div>
      </header>

      <div className="px-4 py-5 sm:px-6">
        {mode === 'browse' ? (
          <div data-opeyemi-browse>
            <div role="group" aria-label="Device type" className="flex flex-wrap gap-2">
              {KINDS.map((k) => (
                <button
                  key={k}
                  type="button"
                  aria-pressed={kind === k}
                  onClick={() => setKind(k)}
                  className={`min-h-11 rounded-full border px-4 text-sm font-semibold ${ring} ${
                    kind === k
                      ? 'border-[#123CC9] bg-[#123CC9] text-white'
                      : 'border-[#0A215F]/20 hover:border-[#123CC9]'
                  }`}
                >
                  {k}
                </button>
              ))}
            </div>
            <ul className="mt-4 grid gap-3 sm:grid-cols-3" data-opeyemi-listings>
              {listings[kind].map((item) => (
                <li key={item} className="rounded-xl border border-[#0A215F]/10 p-4">
                  <span
                    aria-hidden="true"
                    className="block h-24 rounded-lg bg-gradient-to-br from-[#e8eeff] to-[#c9d4ee]"
                  />
                  <p className="mt-2 font-semibold">{item}</p>
                  <p className="text-xs text-[#3a4a75]">
                    Sample listing · ask for price and availability
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div data-opeyemi-swap>
            <h2 className="text-xl font-semibold">Tell us about your device</h2>
            <div role="group" aria-label="Sell or swap" className="mt-3 flex gap-2">
              {(['Swap', 'Sell'] as const).map((v) => (
                <button
                  key={v}
                  type="button"
                  aria-pressed={intent === v}
                  onClick={() => setIntent(v)}
                  className={`min-h-11 rounded-full border px-4 text-sm font-semibold ${ring} ${intent === v ? 'border-[#0A215F] bg-[#0A215F] text-white' : 'border-[#0A215F]/20'}`}
                >
                  I want to {v.toLowerCase()}
                </button>
              ))}
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              <div>
                <label htmlFor="op-kind" className="text-sm font-semibold">
                  Device type
                </label>
                <select
                  id="op-kind"
                  value={swapKind}
                  onChange={(e) => setSwapKind(e.target.value as Kind)}
                  className={`mt-1 min-h-11 w-full rounded-lg border border-[#0A215F]/20 px-3 text-sm ${ring}`}
                >
                  <option value="">Choose…</option>
                  {KINDS.map((k) => (
                    <option key={k} value={k}>
                      {k.replace(/s$/, '')}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="op-model" className="text-sm font-semibold">
                  Model and storage
                </label>
                <input
                  id="op-model"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  placeholder="e.g. 128 GB, black"
                  className={`mt-1 min-h-11 w-full rounded-lg border border-[#0A215F]/20 px-3 text-sm ${ring}`}
                />
              </div>
              <div>
                <label htmlFor="op-condition" className="text-sm font-semibold">
                  Condition
                </label>
                <select
                  id="op-condition"
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                  className={`mt-1 min-h-11 w-full rounded-lg border border-[#0A215F]/20 px-3 text-sm ${ring}`}
                >
                  <option value="">Choose…</option>
                  {conditions.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>
            <button
              type="button"
              onClick={review}
              className={`mt-4 min-h-12 rounded-full bg-[#123CC9] px-6 text-sm font-semibold text-white ${ring}`}
            >
              Review my device
            </button>
            <div role="status" className="mt-4 text-sm">
              {error && <p className="font-semibold text-[#a3341f]">{error}</p>}
              {summary && (
                <div
                  className="rounded-xl border border-[#123CC9]/30 bg-[#123CC9]/5 p-3"
                  data-opeyemi-summary
                >
                  <p className="font-semibold">{summary}</p>
                  <button
                    type="button"
                    disabled
                    aria-describedby="op-disabled"
                    className="mt-3 min-h-11 cursor-not-allowed rounded-full bg-[#079344] px-5 text-sm font-semibold text-white opacity-60"
                  >
                    Send on WhatsApp
                  </button>
                  <p id="op-disabled" className="mt-2 text-xs text-[#3a4a75]">
                    Disabled in this uncommissioned concept: no phone number is connected and
                    nothing is sent.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
