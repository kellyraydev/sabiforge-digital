# SabiForge V2 portfolio — single ten-project handoff
**Latest owner decision: 2026-11-21.** This is a **specification and source register**, not a completed website migration.

## Cursor: start a **new task** from this folder
1. Open [CURSOR-NEW-TASK.md](./CURSOR-NEW-TASK.md) and use it as the sole new-task brief.
2. Read [project-register.json](./project-register.json) as the exact single source of truth for the ten project names, IDs, categories and identity corrections.
3. Read [ASSET-PLAN.md](./ASSET-PLAN.md) for image requirements, scene directions, per-surface assignments and QA policy.
4. Read [three-concept source references](../three-concepts/README.md) and the downloadable ZIP in ChatGPT. They define Big Beerah, Amzlat and Opeyemi.
5. Verify the current PR #12 head, repository conventions and source-code consumers before implementing.

**Correct total: ten concepts**, not only the seven newly requested and not just three or six. All ten should share a typed source array. Homepage and `/work` must both expose ten; remove active legacy four studies.

**Corrected categories:** Big Beerah Collection = modest fashion/e-commerce (NOT beverage). Amzlat = beauty, cosmetics and fashion retail. Opeyemi Phones & Gadgets = electronics retail and Buy/Sell/Swap.

**Image truth status:**
- Three owner reference sets + Opeyemi standalone HTML prototype: present in the previous ZIP, but JPEG/PNG/WebP binaries not uploaded to GitHub.
- Seven new project directions: included here.
- One full-resolution AI-generated Maison Vale interior image: present in downloadable **review ZIP** and needs QA.
- Two AI-generated 10-up contact boards: present in review ZIP; NOT production images.
- Four additional individual Canva image-generation requests started in this conversation, but final images are not verified/attached to GitHub.
- RoutePilot + Corporate Canva image-generation attempts failed due to credit quota.
- Seven low-resolution visual crops are included in review ZIP as **reference-only**, not production assets.

Do not infer that “generated” means “approved and published”; no ten finished independent covers, detail-hero assets, or /work integration has been verified yet.

## Branch status / constraints
The docs and prototype are committed under `redesign/v2-three-concepts-handoff`, which was created from the verified PR #12 head. The code remains unchanged by this handoff. New implementation should occur on a separately reviewable branch derived from this handoff, e.g. `redesign/v2-ten-concepts`, with actual source/image inspection and tests. Do not merge, deploy, publish, change paid services or rewrite approved business facts.
