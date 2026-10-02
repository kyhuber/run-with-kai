# TODO — what Kai needs to do to advance the project

Claude Code can only work inside this repo. Everything below is a step only you can take, in the
order it needs to happen. Tick items off as you go; Claude Code updates this file at the end of
each phase.

## Phase 0 — done (Oct 1–2)

- [x] Import merged, GitHub Pages live at https://kyhuber.github.io/run-with-kai/
- [x] Personal `run-training-analysis` skill uploaded to claude.ai; the Orca skill removed
- [x] Drive folder renamed to `run-health-exports` (same folder ID)
- [x] `ORCA-Dashboard` private and archived
- [x] Official chip time (1:45:51.49) recorded on the Sep 19 row

## Phase 1 — done (Oct 2)

- [x] Orca dashboard frozen at https://kyhuber.github.io/run-with-kai/orca-2026/

## Phase 2 — in review

- [ ] **Review and merge the Phase 2 PR** (blocks as the unit: `blocks.js`, the block picker,
      Block 1 as current). After the Pages run finishes, open the root page on your phone: it
      should read "Run with Kai · Speed block", count down to the Nov 15 time trial, show no goal
      pace, and list the four pre-Orca runs under Between Blocks. Pick "Orca Half" in the header
      to see the Orca block in the new shape.
- [ ] **Block 1 sessions.** The block ships with an empty plan. Paste the sessions from the
      Running project (date, type, description, distance, and a meeting point where friends can
      join) and Claude Code adds them to `blocks.js`; or ask Claude Code to draft them from the
      skill's principles for you to approve.
- [ ] **Block 1 goal pace**, if you want one. It is `null` today, which the brief allows: no goal
      lines, no projected finish. The two benchmarks already project a 5K of roughly 22–23 minutes.
- [x] **The Sep 19 evening exports are merged** (data PR after Phase 2). They corrected Kai's
      account of the Sep 13 pause, added running dynamics for both runs, and recorded the
      mid-race painkiller that may have masked the closing miles. The archive copy is left as
      the snapshot it is.

## Before Phase 3 (new views)

- [ ] **`Z2_BAND`** for the aerobic-efficiency chart. Your project notes conflict between
      136–142 bpm and ≤149 bpm. Pick one.
- [ ] **Meeting-point wording** for the Upcoming view: what a session shows when it has a
      `meetingPoint`, and the default when it does not (the brief proposes "ask Kai"). Never a home
      address, GPS route or start coordinates.

## Before Phase 4 (feel score in the schema)

- [ ] **A few recent exports from `run-health-exports`** for the backward-compatibility check,
      because real exports are never committed to the repo. Share them into the session when
      Phase 4 starts (or confirm the Drive connector can read the folder).

## Phase 6 (move to run.kaihuber.dev) — all yours apart from two small commits

- [ ] **Verify `kaihuber.dev`** in your GitHub account settings under Pages. GitHub shows a TXT
      record to add at GoDaddy. This stops any other repo from claiming a subdomain of your domain.
- [ ] **Add the GoDaddy record:** type CNAME, host `run`, value `kyhuber.github.io`. A real DNS
      record, not GoDaddy forwarding.
- [ ] **Set the custom domain** in `run-with-kai` → Settings → Pages → Custom domain:
      `run.kaihuber.dev`, save. GitHub commits the `CNAME` file to `main` itself.
- [ ] **Enforce HTTPS** once the DNS check passes and the certificate provisions. Browsers force
      HTTPS on every `.dev` domain, so the subdomain will not load at all until the certificate
      exists. That is expected, not a failure. Then open https://run.kaihuber.dev and `/orca-2026/`
      on your phone.
- [ ] Then start a session for Claude Code's part: pull `main` to pick up the `CNAME` commit, add
      `robots.txt`, and update the site URL in the README and the generic skill.
- [ ] **Decide whether `run.kaihuber.dev` appears on the public `kaihuber.dev` landing page.**
      Listing it there works against the friends-only intent.
- [ ] **Share the link with friends.** Old `kyhuber.github.io/ORCA-Dashboard/` links stop working
      once that repo is private.

## Optional

- [ ] Clone the repo locally: `git clone https://github.com/kyhuber/run-with-kai.git`. Preview
      with `python3 -m http.server 8000` in the folder. Run `git pull` before any local edit,
      because cloud sessions push their own branches. Keep any old local clone of `ORCA-Dashboard`
      as an extra backup; it cannot push once that repo is archived.
- [ ] Commit the refactor brief into the repo (for example as `docs/refactor-brief.md`) so future
      sessions do not depend on it being pasted. Say so in a session and Claude Code will add it.

## Open after the Orca block (not blocking the refactor)

- [ ] **Late-October PT visit.** Two things come out of it: her review of the race-day knee
      episode, which the run log says must happen before the next block is built in earnest, and
      a **new strength plan oriented to running and skiing**. Until then, rows 3–10 of her 2024
      sheet are the starting point, as she suggested. Both go in the personal skill, not here.

- [ ] The Sep 19 race entry in `data.js` carries the watch time (1:45:45 for 13.22 mi). Swap in
      the official chip time when you have it.
- [ ] The PT review of the race-day knee episode, which the run log says must happen before the
      next block is built. Whatever comes of it goes in the personal skill, not here.
