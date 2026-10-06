# run-with-kai

**Run with Kai** — Kai's running site, organised by training block, served by GitHub Pages
from `main` at https://kyhuber.github.io/run-with-kai/ (moving to https://run.kaihuber.dev in
Phase 6 of the refactor). Unlisted: shared by link with Kai's running friends, who use it to see
upcoming runs they can join and to talk about results.

- `data.js` — the continuous run log (`SEEDED_ACTUALS`, `CROSS_TRAINING`, `RESTING_HR`, `HRV`),
  `DATA_THROUGH`, and `GOAL_PACE` (now only the Orca block's goal, read by `blocks.js`). This is
  the file that changes when new runs land.
- `blocks.js` — every training block: dates, test, goal pace (or `null`), pace zones, plan
  sessions, optional race-day plan. The file that changes when a plan changes. Its header
  documents the shape.
- `index.html` — `HR_ZONES` and all rendering. Shows the block containing today's Pacific
  date (else the next one to start, else the last), with a picker for past blocks. Changes
  only when the rendering changes.
- `orca-2026/` — the Orca Half dashboard frozen at its post-race state. Never receives new runs.
- `skills/run-training-analysis/SKILL.md` — **the canonical generic reference.** Read it before
  touching either file. It carries the training context, the Drive export pipeline, the merge
  rules, and a **monitoring rule that is a safety rule, not an analysis preference** — pain that
  alters Kai's stride, or swelling after a run, means stop and report, never run through. It is
  the authority where this file is silent. Its **personal counterpart**, which adds Kai's health
  history and medical context, lives in the claude.ai Running project and is never committed here.
- `schema/health-export.schema.json` — machine-readable contract for the Drive exports.
- `TODO.md` — what Kai needs to do next to advance the project.

## Ground rules

From the site refactor brief of Oct 1, 2026. Where the skill conflicts with the brief on site
structure, the brief wins. On data rules, the skill wins.

- **History is sacred.** Edit `data.js` in place and never regenerate it. Every entry in
  `SEEDED_ACTUALS` and `CROSS_TRAINING` survives a refactor unchanged unless a phase says otherwise.
- **Pacific time.** The container clock is UTC, so get dates with `TZ=America/Los_Angeles date`.
  Keep `PLAN_TZ` and `todayISO()`, and route all new date logic through them.
- **No estimation.** No synthesized values anywhere, including new charts. Missing data shows as
  missing, and elevation is never estimated. `mins` means moving time. Weather gives context and
  never corrects a value.
- **One goal pace per block.** Never hardcode a pace or finish time outside that block's config.
- **Stay unlisted.** Keep `<meta name="robots" content="noindex, nofollow">` on every page,
  including the archive and any new view.
- **Phone first.** Kai and his friends mostly view the site on phones, so every view must work at
  about 380px wide.
- **Branch per phase.** `main` deploys on push, so open a branch and PR for each phase and wait
  for Kai's review. Verify a deploy through the `pages build and deployment` workflow run. Don't
  curl the live site, because the sandbox blocks it.
- **Pipeline untouched.** Leave the export pipeline and the Drive workflow alone, apart from the
  names and URLs changed in Phase 0 and the schema addition in Phase 4.
- **Privacy.** This repo is public. Diagnoses and clinical findings, injury and surgical history,
  clinician names, age and body metrics, work schedule, home location and GPS routes never land in
  a commit. What happened on a run (pain at mile 6, slowed, walked, finished) is fine, and so is
  the bare fact that a PT was consulted. The personal skill copy holds the rest. Before pushing,
  grep the branch for anything on that list.

## Kai is in Seattle. Every date here is Pacific.

`America/Los_Angeles`, and this is the single easiest thing to get wrong in this repo.

The plan, the run dates, `DATA_THROUGH`, the export filenames, and the day Kai means when he
says "today" are all **Pacific** dates. A Claude Code container's clock is **UTC** — 7 hours
ahead in PDT, 8 in PST — so from 17:00 Pacific onward the container has already rolled over to
tomorrow. Kai runs in the evening often enough that this is the normal case, not an edge case.

It has already caused two real errors: an export written to Drive under a Sep 9 filename for a
Sep 8 run, and a Sep 10 run reported back to Kai as "yesterday's run" by a session that trusted
its own clock.

**Before reasoning about recency, setting `DATA_THROUGH`, or telling Kai when a run happened:**

```sh
TZ=America/Los_Angeles date
```

Never say "today", "yesterday", or "last night" from the environment's date. Drive's
`createdTime` is UTC too — the export filename and `pulledAt` are the Pacific truth, and
`createdTime` is good only for ordering.

`index.html` already handles this correctly via `PLAN_TZ` and `todayISO()`. If your sense of
"today" disagrees with the page, the page is right.

## Conventions worth knowing before an edit

- **Never hardcode a goal pace.** Each block's `goalPace` in `blocks.js` is the only source (the
  Orca block reads `window.GOAL_PACE` from `data.js`, as the brief asked); the projected finish,
  the pace-chart goal line, the goal-pace session targets and the race-day plan all derive from
  it, and `null` renders none of them. Phone-side export
  notes have repeatedly carried a stale `7:56` — correct them in a comment, but keep the flag
  text verbatim.
- **`mins` is moving time**, not elapsed, wherever the two differ. Where a run has a real
  standstill the entry says so; do not "correct" it to elapsed.
- **Never estimate a missing measurement.** Omit `elevGainFt`, `cadenceAvg`, `hrAvg` and the
  rest rather than back-filling them. An absent field is fine; an invented one corrupts the
  analysis.
- **Bump `?v=` on the `data.js` script tag in `index.html` on every data change, and on the
  `blocks.js` tag on every plan change.** The files cache separately, and a fresh page paired
  with a stale dataset will call synced sessions missed.
- **Runs under 1.0 mi stay out**, and every `SEEDED_ACTUALS` row needs a `dist`. A
  `CROSS_TRAINING` entry may omit `dist` (strength sessions have none) and renders as minutes.

## Checking a change

There are no tests and no CI. Validate directly:

```sh
node --check data.js blocks.js
python3 -m http.server 8899    # then load index.html headless at 380px wide and check for page errors
```

The Chart.js CDN is blocked from the sandbox, so a headless load needs it stubbed or it will
throw `Chart is not defined`. Don't curl the live site to verify a deploy — `kyhuber.github.io`
is blocked and returns a misleading HTTP 000; check the `pages build and deployment` run for
the merged SHA instead. `raw.githubusercontent.com` is reachable and works for confirming file
contents on `main`.
