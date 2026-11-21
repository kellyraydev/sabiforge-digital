# Ten-concept implementation QA — 2026-11-21

Branch: `redesign/v2-ten-concepts` (from `redesign/v2-ten-concepts-handoff`, which is PR #12 head `fdeb81f` plus the portfolio docs). PR #12 was not merged. Nothing was deployed.

## Commands

| Command                                                                          | Result                                                                                                                                                                                                                                 |
| -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm test`                                                                       | PASS — 41 tests                                                                                                                                                                                                                        |
| `npm run lint`                                                                   | PASS                                                                                                                                                                                                                                   |
| `npm run build` with `SITE_ENV=development` and `SITE_URL=http://localhost:4321` | PASS — 16 pages, image optimization completed                                                                                                                                                                                          |
| `npm run verify`                                                                 | FAIL at `prettier --check .` before lint. The handoff branch already fails formatting on files this task did not edit (including `README.md`, `package.json`, and `src/components/home/Hero.astro`). Files edited here were formatted. |
| `node scripts/interactions.cjs` against `http://127.0.0.1:4321`                  | PASS, including the ten-concept register, retired-study absence, keyboard, no-JavaScript headings, reduced motion, and the 390px menu                                                                                                  |
| `npm run qa:visual` full width matrix (375, 390, 430, 768, 1280, 1440, 1920)     | NOT RUN as the screenshot suite. Browser review covered the homepage concept grid and a `/work` study. Interaction QA covered 1280 and 390.                                                                                            |

## Browser

Local preview `http://127.0.0.1:4321/`. Homepage lists all ten concepts with Concept Project labels. `/work#maison-vale-studios` shows the ten-item index. A coded AURA desktop and phone preview was visible in the study. The narrow browser pane’s fixed header intercepted one filter click; the same E-commerce filter passed in the interaction script at 1280px.

## Image status

Covers are 1600×1067. Detail heroes are 1920×1080. Desktop screenshots are 1440×900. Mobile screenshots are 390×844. `/work` uses one 1200×630 social image. Inventory: `TEN-CONCEPTS-ASSET-INVENTORY.csv`.

Owner JPEG references for Big Beerah, Amzlat and Opeyemi were named in the ZIP manifest and were not in the ZIP. Opeyemi follows the HTML prototype and the prototype screenshots that were included. Big Beerah and Amzlat follow the written categories and palettes. Generated scenes are not owner-approved for publication.

## Left unchanged

Prices, services catalogue, founding slots, contacts, production, DNS, and PR #12.
