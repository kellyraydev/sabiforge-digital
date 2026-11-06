import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Icon from '@/components/ui/Icon';

interface NavItem {
  label: string;
  href: string;
}

interface MobileNavProps {
  items: readonly NavItem[];
  ctaHref: string;
  email: string;
  phoneDisplay: string;
  phoneHref: string;
}

/** Accessible slide-down mobile menu: focus trap, Escape to close, scroll lock. */
export default function MobileNav({
  items,
  ctaHref,
  email,
  phoneDisplay,
  phoneHref,
}: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // The panel is portalled to <body> so the header's backdrop-filter can't
  // become its containing block. Only render it after hydration.
  useEffect(() => setMounted(true), []);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const close = useCallback((restoreFocus = true) => {
    setOpen(false);
    if (restoreFocus) toggleRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    const panel = panelRef.current;
    panel?.querySelector<HTMLElement>('a, button')?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close();
        return;
      }
      if (event.key !== 'Tab' || !panel) return;
      const focusable = Array.from(panel.querySelectorAll<HTMLElement>('a, button'));
      const all = [toggleRef.current, ...focusable].filter(Boolean) as HTMLElement[];
      // Cycle focus between the toggle (in the header) and the portalled panel.
      event.preventDefault();
      const current = all.indexOf(document.activeElement as HTMLElement);
      const step = event.shiftKey ? -1 : 1;
      const next = current === -1 ? 0 : (current + step + all.length) % all.length;
      all[next].focus();
    };
    const onResize = () => {
      if (window.matchMedia('(min-width: 1024px)').matches) setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [open, close]);

  return (
    <div className="lg:hidden">
      <button
        ref={toggleRef}
        type="button"
        className="border-ivory-100/15 text-ivory-50 hover:border-mint-300/60 relative z-50 inline-flex size-11 items-center justify-center rounded-full border transition"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? 'Close menu' : 'Open menu'}
        onClick={() => setOpen((value) => !value)}
      >
        <Icon name={open ? 'close' : 'menu'} className="size-5" />
      </button>

      {mounted &&
        createPortal(
          <div
            id="mobile-menu"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            hidden={!open}
            className="bg-midnight-950/97 fixed inset-0 z-40 overflow-y-auto px-5 pt-24 pb-10 backdrop-blur-xl sm:px-8"
          >
            <nav aria-label="Mobile">
              <ul className="divide-ivory-100/10 border-ivory-100/10 flex flex-col divide-y border-y">
                {items.map((item, index) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={() => close(false)}
                      className="font-display text-ivory-50 hover:text-mint-300 flex items-center justify-between py-4 text-2xl font-medium transition"
                    >
                      <span>{item.label}</span>
                      <span className="text-ivory-100/40 text-sm" aria-hidden="true">
                        0{index + 1}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <a
              href={ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => close(false)}
              className="bg-coral-500 text-midnight-950 mt-8 flex h-13 items-center justify-center gap-2 rounded-full font-semibold"
            >
              <Icon name="whatsapp" className="size-5" />
              Chat on WhatsApp
              <span className="sr-only">(opens in a new tab)</span>
            </a>

            <dl className="mt-8 grid gap-4 text-sm">
              <div>
                <dt className="text-ivory-100/60">Phone / WhatsApp</dt>
                <dd>
                  <a className="text-ivory-50 hover:text-mint-300" href={phoneHref}>
                    {phoneDisplay}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-ivory-100/60">Email</dt>
                <dd>
                  <a
                    className="text-ivory-50 hover:text-mint-300 break-all"
                    href={`mailto:${email}`}
                  >
                    {email}
                  </a>
                </dd>
              </div>
            </dl>
          </div>,
          document.body,
        )}
    </div>
  );
}
