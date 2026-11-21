import { useMemo, useState } from 'react';

type Category = 'E-Commerce' | 'Brand Sites' | 'Service Business';
type Study = { name: string; category: Category; problem: string; accent: string; detail: string };

const studies: Study[] = [
  {
    name: 'Matrix Gadgets',
    category: 'E-Commerce',
    problem:
      'Stock lived in Instagram DMs, creating constant availability questions and buyer trust anxiety.',
    accent: '#8bd8c4',
    detail: 'Computer Village retailer',
  },
  {
    name: 'Zari Atelier',
    category: 'E-Commerce',
    problem: 'Size confusion abandoned carts while manual transfers stalled dispatch.',
    accent: '#e9aa8b',
    detail: 'Lekki fashion boutique',
  },
  {
    name: 'Kòrà Home',
    category: 'E-Commerce',
    problem:
      'Mobile shoppers could not compare artisan palettes or read care instructions before checkout.',
    accent: '#d4af37',
    detail: 'Hand-dyed textiles',
  },
  {
    name: 'Àdùn Table',
    category: 'Brand Sites',
    problem:
      'Menus circulated as blurry WhatsApp screenshots and catering enquiries missed key details.',
    accent: '#e8a24a',
    detail: 'Lagos restaurant & caterer',
  },
  {
    name: 'GidiRoute Haulage',
    category: 'Service Business',
    problem: 'Customers called to track drivers while agents priced cargo by hand.',
    accent: '#9ab7e8',
    detail: 'Inter-state logistics',
  },
  {
    name: 'Mend Physio Studio',
    category: 'Service Business',
    problem: 'First-time patients felt anxious, chose the wrong procedure and abandoned booking.',
    accent: '#a6d6ad',
    detail: 'Physio & wellness clinic',
  },
];

function Widget({ study }: { study: Study }) {
  const [value, setValue] = useState(0);
  if (study.name === 'Matrix Gadgets')
    return (
      <div className="case-widget">
        <span className="meta">IN STOCK · IPHONE 15 PRO</span>
        <strong>₦1,180,000</strong>
        <select aria-label="Device condition" defaultValue="Pristine">
          <option>Pristine</option>
          <option>Grade A</option>
          <option>Grade B</option>
        </select>
        <a
          href="https://wa.me/2348000000000?text=Hi%20I%27m%20interested%20in%20the%20iPhone%2015%20Pro"
          target="_blank"
          rel="noreferrer"
        >
          Instant WhatsApp Checkout ↗
        </a>
      </div>
    );
  if (study.name === 'Zari Atelier')
    return (
      <div className="case-widget">
        <span className="meta">DEMO CHECKOUT</span>
        <div className="flex gap-2">
          <button
            aria-label="Clay colour"
            onClick={() => setValue(1)}
            className="swatch"
            style={{ background: '#c66d54' }}
          />
          <button
            aria-label="Indigo colour"
            onClick={() => setValue(2)}
            className="swatch"
            style={{ background: '#273d70' }}
          />
          <button
            aria-label="Butter colour"
            onClick={() => setValue(3)}
            className="swatch"
            style={{ background: '#e8c98b' }}
          />
        </div>
        <label>
          UK {value || 8}{' '}
          <input
            aria-label="UK size"
            type="range"
            min="6"
            max="14"
            defaultValue="8"
            onChange={(e) => setValue(Number(e.target.value))}
          />
        </label>
        <button className="widget-action" onClick={() => setValue(10)}>
          Verify payment · {value === 10 ? 'Demo success' : '10 sec demo'}
        </button>
      </div>
    );
  if (study.name === 'Kòrà Home')
    return (
      <div className="case-widget">
        <span className="meta">CHOOSE A PALETTE</span>
        <div className="flex gap-2">
          {['Indigo', 'Ochre', 'Charcoal'].map((s) => (
            <button key={s} className="chip" onClick={() => setValue(s.length)}>
              {s}
            </button>
          ))}
        </div>
        <div className="progress">
          <span style={{ width: `${value ? 66 : 33}%` }} />
        </div>
        <span className="text-xs">{value ? '2 of 3 · Delivery' : '1 of 3 · Product'}</span>
      </div>
    );
  if (study.name === 'Àdùn Table')
    return (
      <div className="case-widget phone-widget">
        <span className="meta">TODAY&apos;S MENU</span>
        <p>
          Suya-spiced short rib <b>₦12,000</b>
        </p>
        <p>
          Smoked plantain salad <b>₦6,500</b>
        </p>
        <button className="widget-action" onClick={() => setValue((value + 1) % 3)}>
          Booking step {value + 1} of 3
        </button>
      </div>
    );
  if (study.name === 'GidiRoute Haulage')
    return (
      <div className="case-widget">
        <span className="meta">WAYBILL QUOTE</span>
        <label>
          Weight{' '}
          <input
            aria-label="Weight in kilograms"
            type="range"
            min="5"
            max="100"
            defaultValue="25"
            onChange={(e) => setValue(Number(e.target.value))}
          />
        </label>
        <strong>₦{(8500 + value * 120).toLocaleString()}</strong>
        <div className="progress">
          <span style={{ width: '72%' }} />
        </div>
        <span className="text-xs">GR-2408 · In transit</span>
      </div>
    );
  return (
    <div className="case-widget">
      <span className="meta">PLAIN-LANGUAGE GUIDE</span>
      <p>“I have a new back ache”</p>
      <div className="slot-grid">
        {['Tue 10:00', 'Wed 14:30', 'Fri 09:00'].map((slot) => (
          <button
            key={slot}
            className={value === slot.length ? 'selected-slot' : ''}
            onClick={() => setValue(slot.length)}
          >
            {slot}
          </button>
        ))}
      </div>
      <span className="text-xs">{value ? 'Opening reserved for you' : 'Live opening slots'}</span>
    </div>
  );
}

export default function CaseStudies() {
  const [filter, setFilter] = useState<'All Work' | Category>('All Work');
  const visible = useMemo(
    () => (filter === 'All Work' ? studies : studies.filter((study) => study.category === filter)),
    [filter],
  );
  return (
    <section
      id="case-studies"
      className="border-ivory-100/10 bg-midnight-950 border-t py-24 lg:py-36"
      aria-labelledby="case-studies-title"
    >
      <div className="container-page">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="meta text-mint-300">02 / Selected concepts</p>
            <h2
              id="case-studies-title"
              className="text-display-lg text-ivory-50 mt-4 max-w-2xl font-semibold"
            >
              Ideas built for <em>real</em> friction.
            </h2>
            <p className="text-ivory-100/70 mt-5 max-w-xl text-lg">
              Illustrative concept projects, designed around the questions Nigerian customers
              actually ask.
            </p>
          </div>
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter case studies">
            {['All Work', 'E-Commerce', 'Brand Sites', 'Service Business'].map((item) => (
              <button
                key={item}
                role="tab"
                aria-selected={filter === item}
                onClick={() => setFilter(item as typeof filter)}
                className={`min-h-11 rounded-full border px-4 text-sm font-semibold transition ${filter === item ? 'border-mint-300 bg-mint-300/10 text-mint-200' : 'border-ivory-100/15 text-ivory-100/65 hover:border-ivory-100/40'}`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {visible.map((study) => (
            <article
              key={study.name}
              className="glass-panel overflow-hidden rounded-[var(--radius-card)] transition hover:-translate-y-1"
              style={{ borderTopColor: study.accent }}
            >
              <div className="bg-midnight-800 h-40 overflow-hidden">
                <img
                  src="/placeholder.svg?height=400&width=600"
                  alt={`${study.name} concept preview`}
                  className="h-full w-full object-cover opacity-70 transition duration-500 hover:scale-105"
                />
              </div>
              <div className="p-6">
                <p className="meta text-mint-300">Concept project · {study.category}</p>
                <h3 className="text-ivory-50 mt-3 text-2xl font-semibold">{study.name}</h3>
                <p className="text-ivory-100/70 mt-3 text-sm leading-relaxed">
                  <strong className="text-ivory-50">Problem. </strong>
                  {study.problem}
                </p>
                <Widget study={study} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
