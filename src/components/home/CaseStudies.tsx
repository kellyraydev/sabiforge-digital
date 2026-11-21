import { useMemo, useState } from 'react';
import { concepts, CONCEPT_LABEL } from '@/data/concepts';

type Filter = 'All concepts' | (typeof concepts)[number]['filterCategory'];
const filters: Filter[] = ['All concepts', 'Business websites', 'E-commerce', 'Product interfaces'];

export default function CaseStudies() {
  const [filter, setFilter] = useState<Filter>('All concepts');
  const visible = useMemo(
    () =>
      filter === 'All concepts'
        ? concepts
        : concepts.filter((concept) => concept.filterCategory === filter),
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
              These fictional demonstrations explore customer problems. They are not client work or
              live businesses.
            </p>
          </div>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter studio concepts">
            {filters.map((item) => (
              <button
                key={item}
                type="button"
                aria-pressed={filter === item}
                onClick={() => setFilter(item)}
                className={`min-h-11 rounded-full border px-4 text-sm font-semibold transition ${filter === item ? 'border-mint-300 bg-mint-300/10 text-mint-200' : 'border-ivory-100/15 text-ivory-100/65 hover:border-ivory-100/40'}`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {visible.map((concept) => (
            <article
              key={concept.id}
              className="glass-panel rounded-[var(--radius-card)] border-t-2 p-6"
              style={{ borderTopColor: concept.study.theme.accent }}
            >
              <p className="meta text-mint-300">
                {CONCEPT_LABEL} · {concept.category}
              </p>
              <h3 className="text-ivory-50 mt-3 text-2xl font-semibold">{concept.name}</h3>
              <p className="text-ivory-100/70 mt-4 text-sm leading-relaxed">
                <strong className="text-ivory-50">Challenge. </strong>
                {concept.challenge}
              </p>
              <p className="text-ivory-100/70 mt-3 text-sm leading-relaxed">
                <strong className="text-ivory-50">Approach. </strong>
                {concept.approach}
              </p>
              <a
                href={`/work#${concept.id}`}
                className="text-mint-300 decoration-mint-300/40 hover:decoration-mint-300 focus-visible:outline-mint-300 mt-6 inline-flex min-h-11 items-center rounded-sm font-semibold underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4"
              >
                Explore this concept
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
