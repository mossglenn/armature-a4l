# The A4L bridge: plan

*Status: accepted 2026-11-22, nothing built but the manifest's columns. The whole design (why the bridge exists, what A4L gives a tool, the manifest and the stamp, evidence back, privacy, the build order and the thirteen decided questions) is Armature's [`docs/a4l-bridge-plan.md`](https://github.com/mossglenn/armature/blob/main/docs/a4l-bridge-plan.md). This file holds what is the bridge's alone: where each milestone stands, the decisions taken in this repository, and the choices made while building.*

## 1. Where it stands

| Milestone | What | State |
| --- | --- | --- |
| Before M0 | A short note to the A4L team, built from the design's §1 and §5 | Not drafted; Amos sends it or approves it first |
| **M0** | Check the facts with A4L: whether Caliper `extensions` and `learningObjectives` survive its validation, how results can leave it, whether a manifest can be joined in an analysis payload, whether its payload schema is published | Not started |
| M1 | The core and `manifest`: mapping from `ExternalRef`s and confirmed names, the manifest table, the instance profile | The columns and the CSV writer only (`src/manifest.ts`) |
| M2 | `pull`: the dataset, its attachments, metrics and findings from a results table, against a seeded hub | Not started |
| M3 | `compare` and the refinement loop | Not started |
| M4 | The page the desktop program launches, shared with the other bridges | Not started |
| M5 | A real A4L course | Waits for M0 and a course willing to share |

If M0 finds results cannot leave A4L at all, the bridge stops at M1 and evidence back waits.

## 2. Decisions taken (2026-11-22, Amos)

1. **This repository:** `mossglenn/armature-a4l`, public, MIT, beside `armature-mcp` and `armature-lint`.
2. **The design's thirteen questions** (its §17), all as recommended: a bridge rather than a pipeline in Armature; the manifest joined in an A4L analysis payload first, enrichment at A4L's ingestion when the A4L team wants it, stamps only from tools built from Armature; a stamp's commit in `extensions.armature`, never Caliper's `version`; no IRI for a record until a tool stamps; results back as tables someone exports from A4L, an API if M0 finds one, never a query of A4L's warehouse; no metric for a group under 10, or under A4L's threshold where stricter; the person confirms `asOf`, the manifest's commit offered as the default; `compare` computed here, not in the hub; an AI learning tool as one `LearningActivity` per tool per module; the papers' "AI agents" called *AI learning tools*, since *agent* is a chosen term in `@armature/vocabulary`; no record of an intervention for one learner; the note to the A4L team after acceptance.

## 3. Choices made in building, open to overrule

- **The pin.** `@armature/client` and `@armature/types` at Armature's `b41f89e`, the commit that merged the design. It moves when a step needs a newer route.
- **The manifest as CSV**, header row first, RFC 4180 quoting, CRLF line endings: the form a warehouse loads without a schema. Parquet waits for an A4L team that prefers it (M0).
- **One row per runtime identifier and objective**, as the design's §5 has it, so a payload's merge needs no list parsing; a record aligned to no objective keeps one row with the objective empty.
- **Tooling as in `armature-lint`:** pnpm 10, Node 22, TypeScript with NodeNext, Vitest; CI type-checks and tests. A contract job against a seeded Armature hub comes with `pull` (M2).

## 4. Sources

- Goel, A., & Thajchayapong, P. (2026). On why learning engineering needs data architecture. *Journal of Learning Engineering, 1*(1), 27–41. https://doi.org/10.68597/a.143023
- Thajchayapong, P., Carbonaro, S., Couper, T., Helmick, B., Rugaber, S., & Goel, A. K. (2025). *Evolution of A4L: A data architecture for AI-augmented learning.* arXiv:2511.11877.
- Goel, A., Thajchayapong, P., Nandan, V., Sikka, H., & Rugaber, S. (2025). *A4L: An architecture for AI-augmented learning.* arXiv:2505.06314.
- 1EdTech. *Caliper Analytics 1.2.* https://www.imsglobal.org/spec/caliper/v1p2
