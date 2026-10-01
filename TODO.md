# TODO — what Kai needs to do to advance the project

Claude Code can only work inside this repo. Everything below is a step only you can take, in the
order it needs to happen. Tick items off as you go; Claude Code updates this file at the end of
each phase.

## Now: finish Phase 0 (new repo)

- [ ] **Review and merge the import.** Open a PR from `claude/affectionate-lamport-exlnew` into
      `main` on `kyhuber/run-with-kai`. The diff against the old repo is three things: the
      approved privacy redactions in `data.js` and `index.html`, the repo and Drive-folder renames,
      and the generic skill at `skills/run-training-analysis/SKILL.md`. Merge it.
- [ ] **Turn on GitHub Pages.** Settings → Pages → Build and deployment → Deploy from a branch,
      `main`, `/ (root)`. Then check that https://kyhuber.github.io/run-with-kai/ loads on your
      phone. Until Pages is on, the site URL in the README is a dead link.
- [ ] **Replace the claude.ai skill.** In the claude.ai Running project, remove
      `orca-training-analysis` and add the personal `run-training-analysis` skill from the end of
      the Phase 0 session's final message. The personal copy is the only place Kai's health
      history lives from now on; do not paste it into this repo.
- [ ] **Rename the Drive folder** `orca-health-exports` to `run-health-exports`. The folder ID
      does not change, so existing exports and the pipeline keep working. Do this before the next
      phone export, or the iOS app will be writing to a folder name the skill no longer uses.
- [ ] **Retire the old repo, last.** On `kyhuber/ORCA-Dashboard`: Settings → General → Danger
      Zone → Change visibility → Private, then Archive from the same place. Do this only after
      Pages is live here, because the old site and the old schema URL stop working the moment the
      repo goes private.

## Before Phase 1 and Phase 2 can start (target: before the next block, tentatively Mon Oct 5)

Start a cloud session on `kyhuber/run-with-kai` (base branch `main`) and paste the refactor brief,
or ask for "Phase 1". Each phase lands on its own branch and PR for you to review and merge.

Phase 1 (freeze the Orca dashboard at `/orca-2026/`) needs nothing from you beyond the review.

Phase 2 (blocks as the unit) needs these decisions before Claude Code can seed Block 1. It will
stop and ask rather than guess:

- [ ] **Block 1 dates and test.** Tentatively Oct 5 to Nov 15, 2026, ending in a 5K time trial.
      Confirm or change the dates, the test distance and the test date.
- [ ] **Block 1 sessions.** Claude Code will not invent workouts. Until you supply them from the
      Running project in claude.ai, Block 1 ships with `plan: []` and `goalPace: null`.

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

- [ ] The Sep 19 race entry in `data.js` carries the watch time (1:45:45 for 13.22 mi). Swap in
      the official chip time when you have it.
- [ ] The PT review of the race-day knee episode, which the run log says must happen before the
      next block is built. Whatever comes of it goes in the personal skill, not here.
