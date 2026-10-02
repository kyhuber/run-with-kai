# Run with Kai

Kai's running site, organised by training block. The current block is on the main page;
finished blocks are archived under their own folder (the first, the Brooks Orca Half Marathon
of Sep 19, 2026, will live at `/orca-2026/`).

Live at https://kyhuber.github.io/run-with-kai/ (moving to https://run.kaihuber.dev). The site
is unlisted: it carries `noindex, nofollow` and is shared by link with friends, who use it to see
upcoming runs they can join and to talk about results.

- `data.js` — the continuous run log, cross-training, resting HR and HRV. The file that changes
  when new runs land.
- `blocks.js` — the training blocks: dates, the test each one ends in, goal pace, and the plan.
  The file that changes when a plan changes.
- `index.html` — rendering only. Shows the current block, with a picker for past ones.
- `orca-2026/` — the Orca Half dashboard, frozen as it stood after the race.
- `schema/health-export.schema.json` — the contract for the HealthKit exports that feed `data.js`.
- `skills/run-training-analysis/SKILL.md` — the generic training-analysis skill. The personal
  copy lives in claude.ai and is never committed here.
- `CLAUDE.md` — ground rules for Claude Code sessions working in this repo.
- `TODO.md` — what Kai needs to do next to advance the project.
