import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Icon from '@/components/ui/Icon';

interface NavItem {
  label: string;
  href: string;
  current?: boolean;
}

interface MobileNavProps {
  items: NavItem[];
  ctaHref: string;
  whatsappHref: string;
  email: string;
  phoneDisplay: string;
  phoneHref: string;
}

/** Accessible full-screen mobile menu: focus cycling, Escape to close, scroll lock. */
export default function MobileNav({
  items,
  ctaHref,
  whatsappHref,
  email,
  phoneDisplay,
  phoneHref,
}: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Portalled to <body> so the header's backdrop-filter can't become the
  // panel's containing block. Rendered only after hydration.
  useEffect(() => setMounted(true), []);

  const close = useCallback((restoreFocus = true) => {
    setOpen(false);
    if (restoreFocus) toggleRef.current?.focus();
  }, []);

  useEffect(() => {
    document.documentElement.dataset.menuOpen = String(open);
    if (!open) return;
    // Keep the header (logo + close button) visible above the open menu.
    document.getElementById('site-header')?.setAttribute('data-hidden', 'false');
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
        className="border-ivory-100/20 bg-midnight-950/50 text-ivory-50 hover:border-mint-300/60 relative z-[60] inline-flex h-11 items-center gap-2 rounded-full border pr-4 pl-3 text-sm font-medium backdrop-blur transition"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((value) => !value)}
      >
        <Icon name={open ? 'close' : 'menu'} className="size-5" />
        {open ? 'Close' : 'Menu'}
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
            className="bg-midnight-950 fixed inset-0 z-40 overflow-y-auto px-5 pt-24 pb-10 sm:px-8"
          >
            <svg
              viewBox="0 0 400 400"
              className="text-mint-300/10 pointer-events-none absolute -right-24 -bottom-24 size-96"
              fill="none"
              stroke="currentColor"
              aria-hidden="true"
            >
              {[60, 110, 160].map((r) => (
                <polygon
                  key={r}
                  strokeWidth="1"
                  points={Array.from({ length: 6 }, (_, i) => {
                    const a = (Math.PI / 3) * i - Math.PI / 2;
                    return `${200 + r * Math.cos(a)},${200 + r * Math.sin(a)}`;
                  }).join(' ')}
                />
              ))}
            </svg>
            <nav aria-label="Mobile" className="relative">
              <ul className="flex flex-col">
                {items.map((item, index) => (
                  <li
                    key={item.href}
                    className="mobile-nav-item border-ivory-100/10 border-b"
                    style={{ animationDelay: `${index * 45}ms` }}
                  >
                    <a
                      href={item.href}
                      aria-current={item.current ? 'page' : undefined}
                      onClick={() => close(false)}
                      className="font-display text-ivory-50 hover:text-mint-300 aria-[current=page]:text-mint-300 flex items-baseline gap-4 py-4 text-[2rem] leading-tight font-semibold transition"
                    >
                      <span className="text-ivory-100/60 font-mono text-xs font-medium">
                        0{index + 1}
                      </span>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="relative mt-8 grid gap-3">
              <a
                href={ctaHref}
                onClick={() => close(false)}
                className="bg-coral-600 flex min-h-13 items-center justify-center gap-2 rounded-full font-semibold text-white"
              >
                Start your project
                <Icon name="arrow-up-right" className="size-5" />
              </a>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="border-ivory-100/25 text-ivory-50 flex min-h-13 items-center justify-center gap-2 rounded-full border font-semibold"
              >
                <Icon name="whatsapp" className="size-5" />
                Chat on WhatsApp
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </div>

            <dl className="relative mt-10 grid gap-4 text-sm">
              <div>
                <dt className="text-ivory-100/60 font-mono text-xs">Phone / WhatsApp</dt>
                <dd>
                  <a className="text-ivory-50 hover:text-mint-300" href={phoneHref}>
                    {phoneDisplay}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-ivory-100/60 font-mono text-xs">Email</dt>
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
