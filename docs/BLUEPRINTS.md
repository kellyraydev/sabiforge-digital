# Project Blueprints

Each concept project can be shown as its own **preview mini-site**, built from a single declarative
blueprint file. Inspired by WordPress Studio Blueprints: lightweight, declarative, shareable. This
is an alternative to hand-coded interactive demos; the two can coexist (a blueprint section may
mount a demo island).

## How it fits together

| Piece                                   | File                                                                 |
| --------------------------------------- | -------------------------------------------------------------------- |
| Blueprint schema and image helper       | `src/lib/blueprint.ts`                                               |
| A project's blueprint                   | `src/data/projects/<slug>/blueprint.ts`                              |
| Registry                                | `src/data/projects/index.ts`                                         |
| Section library                         | `src/components/blueprint/sections/`                                 |
| Image slot (placeholder when missing)   | `src/components/blueprint/ImageSlot.astro`                           |
| Preview chrome + theme + honesty banner | `src/layouts/PreviewLayout.astro`                                    |
| Routes                                  | `src/pages/preview/index.astro`, `src/pages/preview/[...path].astro` |
| Images                                  | `src/assets/projects/<slug>/<file>`                                  |

Previews render at `/preview/<slug>/…`. The index gallery is at `/preview`.

## Adding a project

1. Create `src/data/projects/<slug>/blueprint.ts` exporting `defineBlueprint({...})`: identity,
   `basis`, `theme` (colours + font keys from the self-hosted set), and `pages` with `sections`.
2. Add one line to `src/data/projects/index.ts`.
3. List required images in `docs/IMAGE-REQUESTS.md`. Until they exist, slots show a themed
   placeholder, never a blank box.

## Rules

- `basis` drives the banner: client / uncommissioned / fictional. A concept is never shown as a
  live business.
- Previews are always `noindex` and are excluded from the sitemap and the production SEO checks.
- Big Beerah is client work; if it ever gets a blueprint, it uses the owner's real screens.

## Custom-domain share (future, owner action)

Keep one deployment serving `/preview/<slug>`. To give each project a clean URL like
`aura.studio.<domain>`, add the domain in Vercel and a host rewrite in `vercel.json`:

```jsonc
"rewrites": [
  { "source": "/", "has": [{ "type": "host", "value": "(?<slug>[^.]+).studio.<domain>" }],
    "destination": "/preview/:slug" }
]
```

Buying/connecting the domain and the DNS wildcard are owner actions (paid/DNS), so they are not set
up here.
