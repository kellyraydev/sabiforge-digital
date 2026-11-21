import { useState } from 'react';

interface ServiceOption {
  slug: string;
  name: string;
}

interface Props {
  services: ServiceOption[];
}

export default function ProjectEnquirySelector({ services }: Props) {
  const [selected, setSelected] = useState('');
  const contactHref = selected
    ? `/contact?${new URLSearchParams({ service: selected }).toString()}`
    : '/contact';

  return (
    <section
      id="project-enquiry"
      className="border-ivory-100/10 bg-midnight-950 border-y py-20 sm:py-28"
      aria-labelledby="project-enquiry-title"
    >
      <div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div data-reveal>
          <p className="meta text-mint-300">04 / Project enquiry</p>
          <h2
            id="project-enquiry-title"
            className="text-display-lg text-ivory-50 mt-4 max-w-lg font-semibold"
          >
            Where should we start?
          </h2>
          <p className="text-ivory-100/70 mt-5 max-w-md text-lg leading-relaxed">
            Choose the service that best fits your project. Your choice will be preselected in the
            enquiry form, where you can share more detail.
          </p>
        </div>
        <div className="glass-panel rounded-[var(--radius-card)] p-6 sm:p-10" data-reveal>
          <fieldset>
            <legend className="text-ivory-50 text-lg font-semibold">
              What kind of help are you looking for?
            </legend>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {services.map((service) => (
                <label
                  key={service.slug}
                  className={`flex min-h-14 cursor-pointer items-center gap-3 rounded-xl border px-4 text-sm font-medium transition ${selected === service.slug ? 'border-mint-300/60 bg-mint-300/10 text-ivory-50' : 'border-ivory-100/15 text-ivory-100/75 hover:border-ivory-100/35'}`}
                >
                  <input
                    type="radio"
                    name="project-service"
                    value={service.slug}
                    checked={selected === service.slug}
                    onChange={() => setSelected(service.slug)}
                    className="accent-mint-300 size-4 shrink-0"
                  />
                  {service.name}
                </label>
              ))}
              <label
                className={`flex min-h-14 cursor-pointer items-center gap-3 rounded-xl border px-4 text-sm font-medium transition ${selected === '' ? 'border-mint-300/60 bg-mint-300/10 text-ivory-50' : 'border-ivory-100/15 text-ivory-100/75 hover:border-ivory-100/35'}`}
              >
                <input
                  type="radio"
                  name="project-service"
                  value=""
                  checked={selected === ''}
                  onChange={() => setSelected('')}
                  className="accent-mint-300 size-4 shrink-0"
                />
                I’m not sure yet
              </label>
            </div>
          </fieldset>
          <a
            href={contactHref}
            className="bg-mint-300 text-midnight-950 hover:bg-mint-200 focus-visible:outline-mint-300 mt-8 flex min-h-12 items-center justify-center rounded-full px-6 text-center font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-4"
          >
            Continue to project enquiry
            <span aria-hidden="true" className="ml-2">
              ↗
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
