# armature-a4l

A bridge between a learning design kept in an [Armature](https://github.com/mossglenn/armature) hub and **A4L**, the Architecture for AI-Augmented Learning of the National AI Institute for Adult Learning and Online Education at Georgia Tech ([Goel & Thajchayapong, 2026](https://doi.org/10.68597/a.143023)).

A4L collects learning data from the LMS, the student information system and a course's AI learning tools (Jill Watson, SAMI, VERA), pseudonymizes it, and turns it into analytics and dashboards. It does not hold the design: which objectives an activity or an assessment serves, why a tool was placed in a module, or which version of the course a cohort met. Armature holds exactly that. The bridge joins the two without copying either:

- **Design out.** A *manifest* maps each identifier A4L already sees (an LTI resource link, an LMS assignment, a Caliper object) to the Armature record it delivers, with its objectives, module and commit. A4L's analyses join it, so they can group by objective and design version, not only by course and week.
- **Evidence back.** A4L's aggregate results come back as Armature metrics about objectives, activities, items and modules, under a dataset at the commit the cohort met, with findings where the data contradicts the design.
- **Refinement recorded.** A change to the design in response is a commit with its rationale, so the next term's results can be compared across the two commits.

Learner data never enters Armature or stays with the bridge: only aggregates over groups of 10 or more cross, and a person decides every change to the design.

**Status:** accepted 2026-11-22; nothing is built yet beyond the manifest's columns (`src/manifest.ts`). The first step, M0, is checking the plan's facts about A4L with the A4L team. The design, with every decision and its reason, is Armature's [docs/a4l-bridge-plan.md](https://github.com/mossglenn/armature/blob/main/docs/a4l-bridge-plan.md); this repository's own state is [docs/plan.md](docs/plan.md).

This is an independent project, not affiliated with Georgia Tech, AI-ALOE or 1EdTech.

## Developing

Needs Node 22 or later and pnpm 10 (`corepack enable` gives it).

```sh
pnpm install
pnpm run typecheck
pnpm test
```

## License

MIT
