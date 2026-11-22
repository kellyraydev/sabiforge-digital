# Concept demos

Interactive demos for the ten concept projects live at `/work/<slug>/demo`. Each demo has a guided review mode at `/work/<slug>/demo?review=1`. Both are linked from the concept's entry on `/work`.

## How it fits together

| Piece                                                        | File                                       |
| ------------------------------------------------------------ | ------------------------------------------ |
| Shared shell (badge, back link, review mode, no-JS fallback) | `src/pages/work/[slug]/demo.astro`         |
| Demo registry and badge wording                              | `src/data/demos/index.ts`                  |
| Demo data (copy, review steps, reserved height)              | `src/data/demos/<slug>.ts`                 |
| Lazy island (one code-split chunk per demo)                  | `src/components/demo/DemoIsland.tsx`       |
| Demo component                                               | `src/components/demo/demos/<Name>Demo.tsx` |

Pages are generated only for slugs listed in `demos`. A concept without a demo has no demo page and no demo links.

## Adding a demo (tasks T1–T10)

1. Add `src/data/demos/<slug>.ts` exporting a `DemoDefinition`. The `slug` must match the concept id. Include at least three review steps.
2. Add the component in `src/components/demo/demos/` and register it in `DemoIsland.tsx` with `lazy(() => import(...))`.
3. Add the definition to `demos` in `src/data/demos/index.ts`.
4. Measure the demo's default height at 390px and at 1280px, and set `reserve` to match. This keeps layout shift at zero while the island loads.
5. Run `npm run verify`, `qa:visual` and `qa:interactions`, and extend `scripts/interactions.cjs` with the demo's main flow.

## Rules

- The badge stays visible on every demo page. For `basis: 'fictional'` concepts it reads "fictional brand, not a live client". For the two `basis: 'reference'` concepts (Amzlat, Opeyemi) it says the demo is uncommissioned and is not the business's official website. Big Beerah Collection is client work (`basis: 'client'`, ledger item 19), so its badge says it is a client project shown with permission.
- Demo buttons that would leave the demo (checkout, contact, booking) show an on-page "Demo:" message instead. No real forms submit, no payments, no real contact details.
- No metrics, awards, client logos or testimonials inside demos.
- Mock headings inside a demo start at `h2`, so the page heading order stays valid.

## Not yet decided

- Individual case-study pages at `/work/<slug>` do not exist. Case studies are sections of `/work`, reached at `/work#<slug>`, and the demo's back link goes there. Separate pages would be a new set of URLs, so the owner should approve them first.
