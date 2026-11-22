import { useState } from 'react';
import {
  corporateContent as c,
  type CorporateView,
} from '@/data/demos/corporate-digital-modernization';

/**
 * Corporate redesign demo: the same fictional organisation before and after.
 * Concept palette: graphite #1E2421, stone #F3F1EC, forest #1F4D3A, brass #B7A48A.
 */
export default function CorporateRedesignDemo() {
  const [view, setView] = useState<CorporateView>('new');
  const [notice, setNotice] = useState('');

  return (
    <div className="bg-[#1E2421] p-4 text-[#F3F1EC] sm:p-6">
      <div
        role="group"
        aria-label="Choose which version of the website to show"
        className="mx-auto flex w-fit rounded-full border border-[#F3F1EC]/20 bg-black/20 p-1"
      >
        {(['old', 'new'] as const).map((option) => (
          <button
            key={option}
            type="button"
            aria-pressed={view === option}
            onClick={() => setView(option)}
            className={`min-h-11 rounded-full px-5 text-sm font-semibold transition focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[#8FBFA8] ${
              view === option
                ? 'bg-[#F3F1EC] text-[#1E2421]'
                : 'text-[#F3F1EC]/80 hover:text-[#F3F1EC]'
            }`}
          >
            {option === 'old' ? 'Old website' : 'Redesigned website'}
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        Showing the {view === 'old' ? 'old' : 'redesigned'} website.
      </p>

      <div className="mx-auto mt-5 max-w-4xl overflow-hidden rounded-xl border border-[#F3F1EC]/15 shadow-2xl">
        <div className="flex items-center gap-1.5 bg-[#2A312D] px-3 py-2" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-[#F3F1EC]/30" />
          <span className="size-2.5 rounded-full bg-[#F3F1EC]/30" />
          <span className="size-2.5 rounded-full bg-[#F3F1EC]/30" />
          <span className="ml-3 truncate rounded bg-black/25 px-3 py-0.5 text-[0.7rem] text-[#F3F1EC]/70">
            meridian-group.example
          </span>
        </div>
        {view === 'old' ? <OldSite /> : <NewSite onAction={setNotice} />}
      </div>
      <p
        role="status"
        className="mx-auto mt-4 min-h-6 max-w-4xl text-center text-sm text-[#8FBFA8]"
      >
        {notice}
      </p>
    </div>
  );
}

function OldSite() {
  return (
    <div className="bg-[#d9d9d9] font-serif text-[#333]" data-testid="old-site">
      <div className="flex items-center justify-between bg-[#003366] px-3 py-2 text-white">
        <span className="text-lg italic">{c.name} Official Website</span>
        <span className="hidden text-[0.65rem] sm:block">Last updated: 14/03/2014</span>
      </div>
      <nav
        aria-label="Old website menu"
        className="flex flex-wrap gap-x-3 gap-y-1 bg-[#336699] px-3 py-1.5"
      >
        {c.oldNav.map((item) => (
          <span key={item} className="text-[0.7rem] text-white underline">
            {item}
          </span>
        ))}
      </nav>
      <p className="overflow-hidden bg-[#ffffcc] px-3 py-1 text-[0.7rem] whitespace-nowrap text-[#990000]">
        {c.oldTicker}
      </p>
      <div className="grid gap-3 p-3 sm:grid-cols-[1fr_10rem]">
        <div>
          <h2 className="text-base font-bold text-[#003366] underline">Welcome</h2>
          <p className="mt-2 text-[0.72rem] leading-snug text-[#555]">
            {c.name} is a company with many years of experience in various sectors. We are committed
            to excellence and to serving our customers. Please use the menu above to find
            information about our departments, history and news. For enquiries, kindly download the
            enquiry form from the Downloads page and send it to our office.
          </p>
          <div className="mt-3 grid grid-cols-3 gap-2" aria-hidden="true">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-14 border border-[#999] bg-[#bbb]" />
            ))}
          </div>
        </div>
        <aside className="border border-[#999] bg-[#eee] p-2 text-[0.65rem]">
          <p className="font-bold">Latest News</p>
          <p className="mt-1 text-[#777]">Annual general meeting held successfully.</p>
          <p className="mt-1 text-[#777]">New office photos uploaded.</p>
          <p className="mt-2 font-bold">Visitor counter: 004213</p>
        </aside>
      </div>
    </div>
  );
}

function NewSite({ onAction }: { onAction: (message: string) => void }) {
  return (
    <div className="bg-[#F3F1EC] font-sans text-[#1E2421]" data-testid="new-site">
      <div className="flex items-center justify-between px-5 py-4">
        <span className="font-semibold tracking-tight">{c.name}</span>
        <nav aria-label="Redesigned website menu" className="hidden gap-5 text-sm sm:flex">
          {c.newNav.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </nav>
      </div>
      <div className="px-5 pt-6 pb-8 sm:pt-10 sm:pb-12">
        <p className="text-xs font-semibold tracking-[0.16em] text-[#1F4D3A] uppercase">
          Digital modernization
        </p>
        <h2 className="mt-2 max-w-lg text-2xl leading-tight font-semibold sm:text-3xl">
          We help established organisations bring their websites up to date.
        </h2>
        <p className="mt-3 max-w-md text-sm text-[#1E2421]/75">
          Clear pages, built for phones, with one obvious way to get in touch.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => onAction('Demo: on a real site this opens the contact page.')}
            className="min-h-11 rounded-full bg-[#1F4D3A] px-4 text-sm font-semibold text-[#F3F1EC] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[#1F4D3A]"
          >
            Talk to our team
          </button>
          <button
            type="button"
            onClick={() => onAction('Demo: on a real site this scrolls to the approach section.')}
            className="min-h-11 rounded-full border border-[#1E2421]/30 px-4 text-sm font-semibold focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[#1F4D3A]"
          >
            See our approach
          </button>
        </div>
      </div>
      <ul className="grid gap-px bg-[#1E2421]/10 sm:grid-cols-3">
        {c.services.map((service) => (
          <li key={service.title} className="bg-[#F3F1EC] p-5">
            <p className="font-semibold">{service.title}</p>
            <p className="mt-1 text-sm text-[#1E2421]/75">{service.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
