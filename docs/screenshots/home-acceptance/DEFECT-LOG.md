# Homepage acceptance pass — visual defect log

Reviewed the production build in Chromium at 390, 768, 1280 and 1440 CSS px on 6 November 2026. Full-page images are captured under this directory; `render-review.json` records the measured hero geometry.

| Finding | Resolution | Status |
| --- | --- | --- |
| Fictional-work explanation sat inside the hero, while the hero CTA said “Explore our concepts.” | Removed the explanation from the hero. The second CTA now says “Explore our work”; each featured concept retains its “Studio concept” label. | Fixed |
| Hero headline wrapped into too many short lines on mobile and occupied excess vertical space at tablet widths. | Reduced and bounded the responsive type scale and reset the stacked hero’s desktop minimum height. At 390px the headline is 202px tall and both CTAs finish by 663px. | Fixed |
| Portrait and laptop/phone composition dropped below the fold at 390px; the 768px hero inherited a large desktop minimum height. | Reduced the mobile art stage and corrected the stacked layout. At 390px the portrait begins at 667px, with laptop and phone visible in the same hero composition; hero height is 1,023px. At 768px the hero is 1,171px. | Fixed |
| Four concept projects and duplicate fictional-work explanations made the portfolio block long. | Kept the three featured concepts (Àdùn Table, Kòrà Home, Mend Physio Studio), removed the repeated disclaimer, and retained “Explore all work” to reach `/work`. | Fixed |
| Device mockup lettering scaled with viewport-relative `cqw`, which made type unpredictable at smaller widths and reduced contrast on coral/cream panels. | Set inline-size containers for each device and clamped `cqi` type sizes to readable floors. Darkened the mockup italic accents for accessible contrast. | Fixed; axe A/AA passes |
| Scroll entrance and reduced-motion behavior needed a rendered check. | Verified entrance and hover states in Chromium; reduced-motion mode reveals content immediately, disables smooth scrolling and reduces animation duration. The existing no-JavaScript visibility check also passes. | Pass |

## Remaining observation

The homepage remains a long page because it retains three concept studies, service detail and pathways, process, verified pricing, and contact options. The redundant point-of-view, “why us,” and studio-method sections were removed. No claim, price, form backend, or service functionality was added or changed.

A Playwright video file was not produced: the installed Playwright runtime lacks its required bundled FFmpeg executable. The hover and Work-section captures document those interactions, and the full interaction smoke suite passed.
