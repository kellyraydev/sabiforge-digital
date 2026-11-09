import { useMemo, useState, type CSSProperties } from 'react';

const featureOptions = [
  { id: 'commerce', label: 'Commerce / payments', price: 180000 },
  { id: 'cms', label: 'CMS and content editing', price: 120000 },
  { id: 'motion', label: 'Motion and interaction design', price: 95000 },
  { id: 'seo', label: 'Technical SEO foundation', price: 70000 },
];

export default function ProjectCalculator() {
  const [pages, setPages] = useState(5);
  const [features, setFeatures] = useState<string[]>(['seo']);
  const estimate = useMemo(() => 280000 + Math.max(0, pages - 3) * 55000 + featureOptions.filter((item) => features.includes(item.id)).reduce((total, item) => total + item.price, 0), [pages, features]);
  const toggleFeature = (id: string) => setFeatures((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);

  return (
    <section id="estimate" className="border-y border-ivory-100/10 bg-midnight-950 py-20 sm:py-28" aria-labelledby="estimate-title">
      <div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div data-reveal>
          <p className="meta text-mint-300">04 / Project planner</p>
          <h2 id="estimate-title" className="mt-4 max-w-lg text-display-lg font-semibold text-ivory-50">A clearer first conversation.</h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-ivory-100/70">Shape a rough scope in under a minute. This is a starting point, not a quote — every SabiForge engagement is refined in discovery.</p>
        </div>
        <div className="glass-panel rounded-[var(--radius-card)] p-6 sm:p-10" data-reveal style={{ '--reveal-delay': '120ms' } as React.CSSProperties}>
          <div className="flex items-end justify-between gap-4 border-b border-ivory-100/12 pb-6">
            <div><p className="meta text-ivory-100/55">Indicative range</p><p className="mt-2 font-display text-4xl font-semibold text-ivory-50 sm:text-5xl">₦{estimate.toLocaleString('en-NG')}</p></div>
            <span className="mb-1 rounded-full border border-mint-300/30 px-3 py-1 text-xs text-mint-200">From</span>
          </div>
          <label htmlFor="page-count" className="mt-8 block text-sm font-semibold text-ivory-50">How many pages do you need? <span className="font-normal text-ivory-100/55">{pages}</span></label>
          <input id="page-count" type="range" min="1" max="20" value={pages} onChange={(event) => setPages(Number(event.target.value))} className="mt-4 w-full accent-mint-300" />
          <div className="mt-1 flex justify-between text-xs text-ivory-100/45"><span>1 page</span><span>20 pages</span></div>
          <fieldset className="mt-8"><legend className="text-sm font-semibold text-ivory-50">Add capabilities</legend><div className="mt-4 grid gap-3 sm:grid-cols-2">{featureOptions.map((item) => <label key={item.id} className={`flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border px-4 text-sm transition ${features.includes(item.id) ? 'border-mint-300/60 bg-mint-300/10 text-ivory-50' : 'border-ivory-100/15 text-ivory-100/65 hover:border-ivory-100/35'}`}><input type="checkbox" checked={features.includes(item.id)} onChange={() => toggleFeature(item.id)} className="size-4 accent-mint-300" />{item.label}</label>)}</div></fieldset>
          <a href="/contact" className="mt-8 flex min-h-12 items-center justify-center rounded-full bg-mint-300 px-6 font-semibold text-midnight-950 transition hover:bg-mint-200">Turn this into a brief <span aria-hidden="true" className="ml-2">↗</span></a>
        </div>
      </div>
    </section>
  );
}
