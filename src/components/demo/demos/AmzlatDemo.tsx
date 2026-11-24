import { useState } from 'react';

/**
 * Amzlat World of Beauty demo: uncommissioned concept for an existing business.
 * Reference taxonomy, unbranded product types, no prices, claims or stock. Enquiry list only.
 * Palette: pink #F3D5E0, cream #FFF8F3, black #161616, gold #C6A15B.
 */
const categories: { id: string; label: string; items: string[] }[] = [
  {
    id: 'makeup',
    label: 'Makeup',
    items: ['Lipstick', 'Foundation', 'Eyeshadow palette', 'Mascara'],
  },
  { id: 'skincare', label: 'Skincare', items: ['Cleanser', 'Face cream', 'Toner', 'Sunscreen'] },
  {
    id: 'hair',
    label: 'Hair',
    items: ['Shampoo', 'Conditioner', 'Hair oil', 'Wig and extensions'],
  },
  { id: 'fashion', label: 'Fashion', items: ['Dresses', 'Handbags', 'Scarves', 'Sandals'] },
  { id: 'body', label: 'Body care', items: ['Body lotion', 'Body wash', 'Body scrub'] },
  {
    id: 'nails',
    label: 'Manicure and pedicure',
    items: ['Nail polish', 'Nail care kit', 'Pedicure set'],
  },
];

const ring =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C6A15B]';

export default function AmzlatDemo() {
  const [active, setActive] = useState(categories[0].id);
  const [list, setList] = useState<string[]>([]);
  const [showList, setShowList] = useState(false);
  const [notice, setNotice] = useState('');

  const category = categories.find((c) => c.id === active)!;

  const toggle = (item: string) => {
    const key = `${category.label}: ${item}`;
    setList((l) => (l.includes(key) ? l.filter((x) => x !== key) : [...l, key]));
    setNotice(
      list.includes(key) ? `${item} removed from your list.` : `${item} added to your list.`,
    );
  };

  return (
    <div className="bg-[#FFF8F3] font-sans text-[#161616]" data-amzlat>
      <header className="flex items-center justify-between gap-3 bg-[#161616] px-4 py-3 text-[#FFF8F3] sm:px-6">
        <span className="font-display text-lg tracking-wide">
          Amzlat <span className="text-[#C6A15B]">World of Beauty</span>
        </span>
        <button
          type="button"
          onClick={() => setShowList((s) => !s)}
          aria-expanded={showList}
          aria-controls="amz-list"
          className={`min-h-11 rounded-full border border-[#C6A15B] px-4 text-sm font-semibold ${ring}`}
          data-amzlat-list-button
        >
          My list ({list.length})
        </button>
      </header>

      <div className="px-4 py-5 sm:px-6">
        <div
          role="group"
          aria-label="Shop by category"
          className="flex flex-wrap gap-2"
          data-amzlat-categories
        >
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              aria-pressed={active === c.id}
              onClick={() => setActive(c.id)}
              className={`min-h-11 rounded-full px-4 text-sm font-semibold ${ring} ${
                active === c.id
                  ? 'bg-[#161616] text-[#FFF8F3]'
                  : 'bg-[#F3D5E0] text-[#161616] hover:bg-[#ecc3d2]'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <h2 className="font-display mt-5 text-2xl font-semibold">{category.label}</h2>
        <ul className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4" data-amzlat-items>
          {category.items.map((item) => {
            const inList = list.includes(`${category.label}: ${item}`);
            return (
              <li key={item} className="rounded-xl border border-[#161616]/10 bg-white p-3">
                <span
                  aria-hidden="true"
                  className="block aspect-square rounded-lg bg-gradient-to-br from-[#F3D5E0] to-[#C6A15B]/60"
                />
                <p className="mt-2 text-sm font-semibold">{item}</p>
                <p className="text-xs text-[#5c5552]">Product type · sample</p>
                <button
                  type="button"
                  aria-pressed={inList}
                  onClick={() => toggle(item)}
                  className={`mt-2 min-h-10 w-full rounded-full border text-xs font-semibold ${ring} ${
                    inList ? 'border-[#161616] bg-[#161616] text-[#FFF8F3]' : 'border-[#161616]/25'
                  }`}
                >
                  {inList ? 'In your list' : 'Add to list'}
                  <span className="sr-only">: {item}</span>
                </button>
              </li>
            );
          })}
        </ul>

        {showList && (
          <section
            id="amz-list"
            aria-labelledby="amz-list-title"
            className="mt-5 rounded-xl bg-[#161616] p-4 text-[#FFF8F3]"
            data-amzlat-list
          >
            <h2 id="amz-list-title" className="font-semibold">
              Your enquiry list
            </h2>
            {list.length === 0 ? (
              <p className="mt-2 text-sm text-[#f0e4dc]">
                Nothing yet. Add product types from any category.
              </p>
            ) : (
              <ul className="mt-2 space-y-1 text-sm">
                {list.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
            )}
            <p className="mt-3 text-xs text-[#f0e4dc]">
              Uncommissioned concept: not Amzlat’s official website. No prices, stock or product
              claims are shown, and nothing is sent.
            </p>
          </section>
        )}
        <p role="status" className="mt-3 min-h-5 text-sm">
          {notice}
        </p>
      </div>
    </div>
  );
}
