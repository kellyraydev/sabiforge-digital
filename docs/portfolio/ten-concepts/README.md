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
- Six original 1536×1024 AI-generated **multi-panel concept study boards** (Maison Vale, AURA, FlowDesk, CampusOne, Bloom, RoutePilot): present in updated downloadable **review v2 ZIP**; require separate image/content QA and real coded interface screenshots before publication.
- One additional full-resolution Maison Vale single-scene image: present, still unapproved.
- Corporate Digital Modernization: **no independent full-size image**; only visible in comparison moodboards.
- Three owner-provided reference projects and the Opeyemi standalone HTML prototype: present in ZIP, not uploaded as binaries to GitHub.
- Three ten-concept contact/overview boards and seven low-res crop references: useful for direction **only**; not final portfolio covers.
- Some Canva image requests started but results were not verified or attached. Later Canva generation attempts hit quota; do not count any unfinished jobs as deliverables.

Do not infer that “generated” means “approved and published”; no ten finished independent covers, detail-hero assets, or /work integration has been verified yet.

## Branch status / constraints

The docs and prototype are committed under `redesign/v2-three-concepts-handoff`, which was created from the verified PR #12 head. The code remains unchanged by this handoff. New implementation should occur on a separately reviewable branch derived from this handoff, e.g. `redesign/v2-ten-concepts`, with actual source/image inspection and tests. Do not merge, deploy, publish, change paid services or rewrite approved business facts.
