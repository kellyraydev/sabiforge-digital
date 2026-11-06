import { useId, useRef, useState, type KeyboardEvent } from 'react';

/**
 * "Anatomy of a storefront": a schematic wireframe whose zones are selectable tabs.
 * The wireframe is illustrative. It is not a client store and shows no real data.
 */
const zones = [
  {
    id: 'nav',
    label: 'Navigation',
    title: 'Navigation and search',
    body: 'Menus that follow how customers shop, not how the stockroom is organised. A visible search and short category names.',
    check: 'Can a first-time visitor find a category in two taps?',
  },
  {
    id: 'collection',
    label: 'Collections',
    title: 'Collection pages and filters',
    body: 'Filters that match real decisions (size, colour, price, room), clear product names and consistent images so comparing is easy.',
    check: 'Does the filter list reflect questions customers really ask?',
  },
  {
    id: 'product',
    label: 'Product page',
    title: 'Product page',
    body: 'Price, variants, delivery and returns information close to the button. Honest, specific descriptions and photography that shows the product as it is.',
    check: 'Is every question a buyer would ask answered without leaving the page?',
  },
  {
    id: 'mobile',
    label: 'Mobile',
    title: 'Mobile experience',
    body: 'A buy button in thumb reach, readable text at default size, images sized for phones and a bag that is easy to review.',
    check: 'Can you complete a test order with one hand on a mid-range phone?',
  },
  {
    id: 'speed',
    label: 'Performance',
    title: 'Performance',
    body: 'Optimised images, few scripts, fonts that load without jumping layouts. We measure before and after and report both.',
    check: 'Which apps and scripts are costing load time, and are they worth it?',
  },
] as const;

type ZoneId = (typeof zones)[number]['id'];

const zoneBox = (id: ZoneId, active: ZoneId) =>
  `transition-all duration-300 ${
    active === id
      ? 'fill-mint-300/40 stroke-midnight-900'
      : 'fill-transparent stroke-midnight-900/35'
  }`;

export default function StoreAnatomy() {
  const [active, setActive] = useState<ZoneId>('nav');
  const base = useId();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const index = zones.findIndex((z) => z.id === active);
  const zone = zones[index];

  const onKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    const map: Record<string, number> = {
      ArrowRight: index + 1,
      ArrowDown: index + 1,
      ArrowLeft: index - 1,
      ArrowUp: index - 1,
      Home: 0,
      End: zones.length - 1,
    };
    if (e.key in map) {
      e.preventDefault();
      const next = (map[e.key] + zones.length) % zones.length;
      setActive(zones[next].id);
      refs.current[next]?.focus();
    }
  };

  return (
    <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16">
      <svg
        viewBox="0 0 300 360"
        className="text-midnight-900 mx-auto w-full max-w-sm"
        role="img"
        aria-label={`Schematic storefront wireframe. Highlighted area: ${zone.title}.`}
      >
        <rect
          x="6"
          y="6"
          width="288"
          height="348"
          rx="14"
          className="fill-ivory-50 stroke-midnight-900/50"
          strokeWidth="1.5"
        />
        {/* nav */}
        <rect
          x="16"
          y="16"
          width="268"
          height="34"
          rx="6"
          className={zoneBox('nav', active)}
          strokeWidth="1.5"
        />
        <rect x="26" y="28" width="46" height="10" rx="3" className="fill-midnight-900/60" />
        <rect x="130" y="28" width="90" height="10" rx="5" className="fill-midnight-900/20" />
        <circle cx="262" cy="33" r="7" className="fill-midnight-900/50" />
        {/* collection */}
        <rect
          x="16"
          y="60"
          width="268"
          height="110"
          rx="6"
          className={zoneBox('collection', active)}
          strokeWidth="1.5"
        />
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <rect
              x={26 + i * 88}
              y="70"
              width="78"
              height="62"
              rx="4"
              className="fill-midnight-900/15"
            />
            <rect
              x={26 + i * 88}
              y="138"
              width="50"
              height="7"
              rx="2"
              className="fill-midnight-900/45"
            />
            <rect
              x={26 + i * 88}
              y="150"
              width="30"
              height="7"
              rx="2"
              className="fill-midnight-900/25"
            />
          </g>
        ))}
        {/* product */}
        <rect
          x="16"
          y="180"
          width="168"
          height="126"
          rx="6"
          className={zoneBox('product', active)}
          strokeWidth="1.5"
        />
        <rect x="26" y="190" width="70" height="70" rx="4" className="fill-midnight-900/15" />
        <rect x="106" y="192" width="68" height="9" rx="2" className="fill-midnight-900/50" />
        <rect x="106" y="208" width="40" height="8" rx="2" className="fill-midnight-900/30" />
        {[0, 1, 2].map((i) => (
          <circle key={i} cx={112 + i * 16} cy="232" r="6" className="fill-midnight-900/30" />
        ))}
        <rect x="106" y="248" width="68" height="16" rx="8" className="fill-coral-500" />
        <rect x="26" y="272" width="148" height="7" rx="2" className="fill-midnight-900/20" />
        <rect x="26" y="284" width="110" height="7" rx="2" className="fill-midnight-900/20" />
        {/* mobile */}
        <rect
          x="194"
          y="180"
          width="90"
          height="126"
          rx="6"
          className={zoneBox('mobile', active)}
          strokeWidth="1.5"
        />
        <rect
          x="214"
          y="190"
          width="50"
          height="106"
          rx="8"
          className="fill-ivory-50 stroke-midnight-900/55"
          strokeWidth="1.5"
        />
        <rect x="222" y="200" width="34" height="34" rx="3" className="fill-midnight-900/15" />
        <rect x="222" y="272" width="34" height="14" rx="7" className="fill-coral-500" />
        {/* performance */}
        <rect
          x="16"
          y="316"
          width="268"
          height="28"
          rx="6"
          className={zoneBox('speed', active)}
          strokeWidth="1.5"
        />
        <rect x="26" y="327" width="140" height="6" rx="3" className="fill-midnight-900/20" />
        <rect x="26" y="327" width="96" height="6" rx="3" className="fill-midnight-900/55" />
      </svg>

      <div>
        <div role="tablist" aria-label="Parts of a storefront" className="flex flex-wrap gap-2">
          {zones.map((z, i) => (
            <button
              key={z.id}
              ref={(el) => {
                refs.current[i] = el;
              }}
              id={`${base}-tab-${z.id}`}
              type="button"
              role="tab"
              aria-selected={active === z.id}
              aria-controls={`${base}-panel`}
              tabIndex={active === z.id ? 0 : -1}
              onClick={() => setActive(z.id)}
              onKeyDown={onKey}
              className={`min-h-11 rounded-full border px-4 text-sm font-semibold transition ${
                active === z.id
                  ? 'border-midnight-900 bg-midnight-900 text-mint-300'
                  : 'border-midnight-900/40 hover:border-midnight-900'
              }`}
            >
              {z.label}
            </button>
          ))}
        </div>
        <div
          id={`${base}-panel`}
          role="tabpanel"
          aria-labelledby={`${base}-tab-${zone.id}`}
          tabIndex={0}
          className="stage-panel mt-8 rounded-sm"
          key={zone.id}
        >
          <h3 className="font-display text-display-sm font-semibold">{zone.title}</h3>
          <p className="text-midnight-800/85 mt-4">{zone.body}</p>
          <p className="border-mint-700 text-midnight-800 mt-5 border-l-2 pl-4">
            <span className="meta text-mint-800 block">The question we ask</span>
            {zone.check}
          </p>
        </div>
      </div>
    </div>
  );
}
