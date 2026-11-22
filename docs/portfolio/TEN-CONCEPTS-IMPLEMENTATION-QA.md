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

## Remediation — 2026-11-21, later the same day

### Source references inspected, not committed

| File                                                               | Present              | Comparison                                                                                                                                                                                                                                          |
| ------------------------------------------------------------------ | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `C:\Users\Chris\Downloads\flyer-04-bigbeerah-collection.png`       | Yes, 3,510,958 bytes | Blush, burgundy, gold. Hijabs, abayas, jersey scarves, fabric bundles, necklaces, ready-to-wear, gift boxes, everyday essentials. Phone number and social handle were not copied.                                                                   |
| `C:\Users\Chris\Downloads\flyer-05-bigbeerah-editorial.png`        | Yes, 3,328,217 bytes | Same categories and palette. Contact row was not copied.                                                                                                                                                                                            |
| `C:\Users\Chris\Downloads\AMZLAT World of Beauty Mobile Store.png` | Yes, 1,884,286 bytes | Pink, cream, black, gold. Makeup, skincare, hair, fashion, body care, manicure and pedicure. Prices, address and phone numbers were not copied.                                                                                                     |
| `C:\Users\Chris\Downloads\sabiforge-three-concepts-handoff.zip`    | Yes, 9,016,638 bytes | Contains the four owner JPEGs, the Opeyemi HTML prototype and review screenshots. Opeyemi reference is cobalt, white and green, with phones, MacBooks, watches, and buy/sell/swap. Registration text, prices and WhatsApp ordering were not copied. |

### Image acceptance

Seven fictional concepts were left as the existing composites. Big Beerah, Amzlat and Opeyemi interface screenshots were replaced so the categories match the references. Their photographic scene sources were kept. `cover.webp` and `detail-hero.webp` are composites, not native-resolution photographs. Scene sources remain the separate `scene-cover.jpg` and `scene-detail.jpg` files. Before images: `docs/portfolio/remediation-before/`.

### Commands this pass

| Command                                                                                      | Result                                                                                                                                                                |
| -------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm run verify` with `SITE_ENV=development` and `SITE_URL=http://localhost:4321`            | PASS. Prettier, lint, 41 tests, and the development build.                                                                                                            |
| `npm test`                                                                                   | PASS — 41 tests, included in verify.                                                                                                                                  |
| `npm run lint`                                                                               | PASS, included in verify.                                                                                                                                             |
| Development build                                                                            | PASS — 16 pages.                                                                                                                                                      |
| `node scripts/screenshots.cjs` full sitemap, 375/390/430/768/1280/1440/1920                  | FAIL then fixed. 14 routes × 7 widths = 98 loads. The only failures were colour contrast on `/work` (Bloom accent, and the same rule on small gold and green labels). |
| Recheck `ROUTES=/work` at the same seven widths after lightening those chapter label colours | PASS.                                                                                                                                                                 |
| `node scripts/interactions.cjs`                                                              | PASS. Keyboard, no-JavaScript headings, reduced motion, filters, and the 390px menu.                                                                                  |
| Retired ids `adun-table`, `kora-home`, `mend-physio`, `tallyhouse` in `dist`                 | Absent.                                                                                                                                                               |

Prettier on the handoff base failed because files are CRLF and Prettier’s default is LF. `endOfLine: auto` fixes that without rewriting the repository. Eleven portfolio documents still failed for wrapping; those were formatted. The preserved Opeyemi prototype HTML is excluded in `.prettierignore`.

The fixed header covered filter buttons when a short browser scrolled them to the top edge. `scroll-padding-top: 5.5rem` on `html`, plus `scroll-mt-24` on the concept section, keeps those controls below the header.

Prices, service catalogue, routes and the ten concept ids were not changed. PR #12 was not merged. Nothing was deployed.
