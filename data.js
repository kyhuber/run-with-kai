// Run with Kai — training data
// Edit this file to update run data; index.html reads these as globals.

// The Orca block's goal race pace, min:sec per mile. blocks.js reads it into that block,
// where it drives the projected finish, the goal-pace session bands, the dashed line on
// the pace chart and the race-day plan. Later blocks carry their own goalPace (or null)
// in blocks.js, so this value never applies beyond the Orca half.
// Set from the Aug 22 benchmark: 6.01 mi in 44.16 (7:21/mi) projects to 1:40:56
// via Riegel. Riegel assumes endurance scales with speed; the longest run this
// cycle is 9.02 mi, so this target leads the endurance base rather than reflecting it.
window.GOAL_PACE = "7:42";

// The last date a health export covers in full. Everything on or before it is
// known: a planned session with nothing logged against it really was missed.
// After it the dashboard knows nothing either way, so those sessions read
// "Awaiting data" instead of being called missed on no evidence.
//
// Set this to the last COMPLETE day a pull covers, not the day the pull ran --
// the Aug 30 13:33 pull covers Aug 29 in full but says nothing about the rest of
// Aug 30. Move it on every merge, along with the ?v= on the data.js script tag in
// index.html.
//
// The Sep 14 pull ran at 00:54 Pacific over a Sep 11-14 window, so it closes Sep 13 in full
// and says nothing about the rest of Sep 14 -- the same shape as the Aug 26 00:18 pull. Week 7
// is now fully logged.
//
// Sep 16, not Sep 17, and not from an export. The Sep 17 pull ran at 21:40 Pacific over a
// Sep 17-only window: it closes no day in full and covers nothing between Sep 14 and Sep 16.
// What closes those three days is Kai's own account -- he did not run Monday Sep 14, having
// been in pain and gone to his PT instead, and Tue/Wed were rest by design. His word on his
// own week is better evidence than an export, and the pipeline has no other way to record a
// day that produced no workout. Sep 17 itself stays outside the window because the day was
// still running at the pull; the run on it is logged regardless, so nothing is lost.
//
// Monday now reads "Not run" with the reason attached rather than a bare "Missed" -- see the
// `skipped` field on that session in index.html. The distinction matters: the standing rule
// is never to frame a missed run as a failure, and this one was the correct call.
// Sep 18, not Sep 19. The race-day pulls ran at 10:42 and 11:05 Pacific with the day still
// going, so they close Sep 18 in full and say nothing about the rest of Sep 19. The race
// itself is logged regardless -- DATA_THROUGH only decides how a session with NO data reads,
// and there is no such session left. Nothing is lost by being strict here, and the rule is
// the rule: the last COMPLETE day, never the day the pull ran.
//
// Oct 1, from the Oct 2 pulls: 1256 covers Sep 20-30 in full (three workouts, no runs before
// Sep 27), and 1259 covers Oct 1 in full. Oct 2 itself was still running at the 12:59 pull, so
// it stays outside. Nothing is logged for Oct 2-5; Block 1 has no sessions on those days.
//
// Oct 4, from the Oct 5 pull at 19:47 Pacific. HealthKit returned no workouts from Oct 2 00:00
// until the Monday-evening run, so Oct 2-4 are complete days with nothing in them -- the
// first three days of Block 1, which had no sessions anyway. Oct 5 was still running at the
// pull; its run is logged regardless.
//
// Oct 6, from the Oct 7 pull at 18:17 Pacific. HealthKit returned exactly two workouts between
// Oct 5 19:00 and Oct 7 18:30 -- the Oct 5 run already logged and the Wednesday-evening run -- so
// the rest of Oct 5 and all of Oct 6 are complete, and Oct 6 had no workout. Oct 7 was still
// running at the pull; its run is logged regardless.
window.DATA_THROUGH = "2026-10-06";

// Logged runs. Seeded from Apple Health; latest merge Oct 7, 2026 (the Oct 7 exports) via the
// run-health-exports Drive pipeline (see skills/run-training-analysis/SKILL.md).
// Runs under 1.0 mi are excluded (accidental / partial recordings).
// Fields: date (YYYY-MM-DD), dist (mi), mins — hrAvg / hrMax / elev optional.
window.SEEDED_ACTUALS = [
  {date:"2026-06-11", dist:3.05, mins:31.78},
  {date:"2026-06-12", dist:4.02, mins:34.43},
  {date:"2026-06-13", dist:9.14, mins:96.11},
  {date:"2026-07-23", dist:3.14, mins:30.35},
  {date:"2026-07-27", dist:4.35, mins:36.96},
  {date:"2026-07-29", dist:3.02, mins:25.07},
  {date:"2026-07-30", dist:3.16, mins:28.84},
  {date:"2026-08-02", dist:6.14, mins:59.57, hrAvg:145, hrMax:170, elev:"~430 ft gain"},
  {date:"2026-08-13", dist:5.08, mins:42.68, hrAvg:157, hrMax:185, elev:"~110 ft gain"},
  {date:"2026-08-16", dist:9.02, mins:77.10, hrAvg:154, hrMax:175, elev:"~440 ft gain"},
  {date:"2026-08-18", dist:4.04, mins:35.38, hrAvg:153, hrMax:171, elev:"~320 ft gain"},
  {date:"2026-08-21", dist:3.02, mins:27.55, hrAvg:126, hrMax:157, elev:"~80 ft gain"},
  {date:"2026-08-22", segment:"warmup", dist:1.02, mins:10.34, hrAvg:118, hrMax:135},
  // 6.01 mi, not 6.21: the watch was set to miles and the effort was run as a 6-mile
  // trial — kicked at the 5-mile mark for a perceived final mile and stopped there.
  // A genuine all-out effort for the distance covered, so Riegel scales from it cleanly.
  // Mid-70s, direct sun, breeze outbound and still air after the turnaround.
  // Splits read from the Apple Fitness splits screen. Miles 1-3 were run alongside
  // Doug, who was slowing; Kai held back to stay with him, so they are not a
  // maximal effort. The final entry is inferred (total time less miles 1-5) and
  // carries no HR. Nothing renders these yet — they are here so the highest
  // resolution record of the benchmark is not lost to a Drive file.
  {date:"2026-08-22", segment:"benchmark", dist:6.01, mins:44.16, hrAvg:161, hrMax:179, elev:"flat — no gain recorded",
   splits:[
     {mi:1, mins:7.450, hrAvg:149},
     {mi:2, mins:7.583, hrAvg:156},
     {mi:3, mins:7.717, hrAvg:161},
     {mi:4, mins:7.500, hrAvg:162},
     {mi:5, mins:7.233, hrAvg:167},
     {mi:6.01, mins:6.677},
   ]},
  // Club run, moved to Sunday. Ran 5.32 easy in place of the planned 7.5 mi
  // decoupling test — a sound call the day after an all-out 10K. HR drifted
  // 132->162 while pace slowed 41 s/mi: 9:55/mi at 162 bpm here against
  // 7:21/mi at 161 the day before. Next-day fatigue, not a fitness reading.
  // The closing 0.32 mi is inferred; over so short a remainder the rounding
  // on miles 1-5 swings it between 9:02 and 9:19, so treat it as indicative.
  {date:"2026-08-23", dist:5.32, mins:50.19, hrAvg:144, hrMax:162, elev:"275 ft gain",
   splits:[
     {mi:1, mins:9.233, hrAvg:132},
     {mi:2, mins:9.283, hrAvg:138},
     {mi:3, mins:9.450, hrAvg:144},
     {mi:4, mins:9.367, hrAvg:154},
     {mi:5, mins:9.917, hrAvg:162},
     {mi:5.32, mins:2.937},
   ]},
  // Week 5 Tuesday tempo: 1mi WU + 2mi @ goal pace + 1mi CD. Run solo
  // at 10:51pm. The structure was hit exactly -- easy mile, two hard miles, easy
  // mile -- but the two middle miles were not run at goal pace. They were run at
  // 6:54 and 6:37 against a 7:37-7:47 target, roughly 55 s/mi too fast.
  //
  // Read the average with care: 7:45/mi overall lands dead centre of the goal band
  // and looks like textbook execution. It is an artifact of averaging 8:27 / 6:54 /
  // 6:37 / 8:57. Nothing on the page renders splits yet, so the Actual line on this
  // session will read as a perfect hit. It wasn't one -- it was an interval session.
  //
  // Apple's own zone boundaries for Kai, captured for the first time here:
  // Z1 <140, Z2 141-149, Z3 150-159, Z4 160-169, Z5 170+. Time in zone:
  // 3:04 / 6:24 / 5:02 / 7:43 / 8:49. That is 8:49 above 170 bpm on a session meant
  // to be comfortably hard. These are now the dashboard's zones -- see HR_ZONES in
  // index.html, which previously capped Zone 2 by hand at 142 bpm. Apple recomputes
  // them as fitness changes, so a later export reporting different boundaries
  // should update HR_ZONES rather than be reconciled against this entry.
  //
  // hrMax 181 is a block high, past the Aug 22 benchmark's 179. Post-run HR fell
  // 144 -> 120 -> 114 over two minutes; a 24 bpm first-minute drop is strong.
  // Miles 1-4 read off the Apple Fitness splits screen sum to 30:55 against a 31:04
  // total; the ~9 s remainder is a 0.01 mi end-of-run fragment plus split rounding,
  // too small to carry as a segment. Elevation and cadence weren't retrieved -- the
  // HealthKit pull timed out mid-export -- so no gain figure is recorded here.
  {date:"2026-08-25", dist:4.01, mins:31.07, hrAvg:159, hrMax:181,
   elev:"flat overall — a downhill stretch in mile 2, uphill in mile 3; no gain figure recorded",
   splits:[
     {mi:1, mins:8.450, hrAvg:141, powerW:235},
     {mi:2, mins:6.900, hrAvg:163, powerW:311},
     {mi:3, mins:6.617, hrAvg:177, powerW:321},
     {mi:4, mins:8.950, hrAvg:160, powerW:271},
   ]},
  // Week 5 Thursday, run solo around Delridge / Westcrest Park at 7:27pm. The plan
  // asked for an easy 4 mi in true Zone 2, holding back. He ran 3.86 and did it.
  // The export hedges that Thursday is "typically the Westies 5K group run" -- that
  // was the pre-Aug-23 week 5. The rebuilt plan programs this day as a solo Zone 2
  // run, so this is the session, run as written.
  //
  // Time in zone, on Apple's boundaries (unchanged from Aug 25):
  // 6:25 / 25:39 / 3:52 / 0:03 / 0:00. About 70% of the run inside Zone 2, the
  // drift falling to both sides rather than one, and three seconds above 160 bpm.
  // Kai's read was that he kept slipping out of the band; the data says he held it
  // better than it felt, and that he erred low more often than high -- 6:25 too
  // easy against 3:52 too hard. That is the opposite of Aug 13 and Aug 18, which
  // ran easy days at 157 and 153 bpm avg.
  //
  // The number worth keeping: HR read 142 / 144 / 145 / 146 across the four splits
  // while pace moved 9:45 -> 9:05 -> 9:40. Four beats of drift across 37 minutes,
  // and mile 2 bought 40 s/mi for two of them. Compare Aug 23 -- the same 144
  // average, but arrived at by climbing 132 -> 162. That run was inside 24 hours of
  // an all-out 10K, so fatigue explains part of the gap; the flat 10 mi on Aug 30
  // is the honest decoupling test, not a 37-minute evening run.
  //
  // No hrMax: the export did not carry one, so none is recorded rather than
  // estimated. The 0:03 in Zone 4 puts the peak just over 160, which is a floor,
  // not a maximum. Post-run HR fell 138 -> 126 -> 120. The 12 bpm first minute
  // reads smaller than Aug 25's 24, but that drop started from 144 at the end of a
  // Zone 5 session -- recovery scales with how high the finish was, so the two
  // numbers are not comparable.
  //
  // Mile 4 is a real 0.86 mi read off the splits screen (8:18), not inferred by
  // subtraction as on Aug 22 and Aug 23. The ~5 s it leaves against the 36:53 total
  // is rounding across the four displayed splits.
  {date:"2026-08-27", dist:3.86, mins:36.89, hrAvg:144,
   elev:"no significant elevation change — no gain figure recorded",
   splits:[
     {mi:1, mins:9.750, hrAvg:142},
     {mi:2, mins:9.083, hrAvg:144},
     {mi:3, mins:9.667, hrAvg:145},
     {mi:3.86, mins:8.300, hrAvg:146},
   ]},
  // Week 5 Sunday, the peak long run: 10.18 mi in 89:47 (8:47/mi), and the longest
  // run in the file -- past the 9.14 from June and the 9.02 in August. Run the
  // morning after a three-hour hike.
  //
  // The session it was written against: 8 easy miles, then the closing 2 at goal
  // pace, banded 7:42-7:50 with 7:35 as a floor after Aug 25 came back 55 s/mi hot.
  // Miles 9 and 10 were 7:33 and 7:52 -- mile 9 two seconds under the floor, mile 10
  // two seconds past the slow end, and a two-mile average of 7:42.6 against a 7:42
  // goal. That is the cap held, not missed. The comparison is Aug 25, which asked
  // for 7:37-7:47 and returned 6:54 and 6:37 with 8:49 spent above 170 bpm. Today
  // peaked at 168 and never entered Zone 5.
  //
  // The durability read matters more than the finish. Miles 1-8 averaged 9:02/mi at
  // about 139 bpm, and the heart rate did not trend: 140, 139, 134, 139, 138, 139,
  // 136, 145, while pace moved from 9:18 down to 8:56. Eight miles with effectively
  // no cardiac drift, the day after three hours on foot. 49:29 of the 89 minutes sat
  // in Zone 1. This is the decoupling test the Aug 27 entry said was still owed, and
  // it came back clean.
  //
  // Against the Zone 2 anchor of 10:00-10:30 at 136-142 bpm, 9:02/mi at 139 is 60-90
  // s/mi faster at the same heart rate. Terrain and conditions are not controlled
  // between those two, and no elevation figure was retrievable here, so read it as a
  // strong signal rather than a measurement.
  //
  // The export's planMatch calls this "last 3mi @ goal pace"; the plan says 2, and 2
  // is what was run. It also scores the closing miles against a 7:56 goal, which has
  // been 7:42 since the Aug 22 benchmark reset. Both are stale notes on the phone
  // side; the measurements themselves are sound.
  //
  // Splits sum to 89:26 against the 89:28 total -- rounding across eleven segments.
  // No elevation: flightsClimbed came back inconsistent and nothing was estimated
  // from it. The closing 0.18 mi at 9:53/mi is the easy finish after the effort.
  {date:"2026-08-30", dist:10.18, mins:89.47, hrAvg:142, hrMax:168,
   splits:[
     {mi:1, mins:9.300, hrAvg:140},
     {mi:2, mins:9.050, hrAvg:139},
     {mi:3, mins:9.420, hrAvg:134},
     {mi:4, mins:8.930, hrAvg:139},
     {mi:5, mins:8.850, hrAvg:138},
     {mi:6, mins:8.630, hrAvg:139},
     {mi:7, mins:9.120, hrAvg:136},
     {mi:8, mins:8.930, hrAvg:145},
     {mi:9, mins:7.550, hrAvg:158},
     {mi:10, mins:7.870, hrAvg:156},
     {mi:10.18, mins:1.780, hrAvg:148},
   ]},
  // Week 6 Tuesday, the peak-week tempo: 1mi WU + 3mi @ goal pace + 1mi CD. Run solo
  // in the evening, started 9:38pm. 4.52 mi against 5 planned -- the missing half mile
  // is all cool-down, so the session's quality volume was hit in full.
  //
  // The three quality miles came back 8:00 / 8:02 / 7:54, averaging 7:59/mi against a
  // 7:37-7:47 band. That is 12 s/mi outside the slow edge and 17 s/mi off the 7:42 goal.
  // Read the whole-run average with the same care Aug 25 needed, for the opposite
  // reason: 8:34/mi overall folds in a 9:45 warm-up and a 9:13 cool-down and makes the
  // session look far worse than it was.
  //
  // The heart rate is the story, not the pace. Mile 4 ran 7:54 at 170 bpm; on Aug 30,
  // two days earlier, mile 10 ran 7:52 at 156 -- the same pace for 14 more beats, and
  // 170 is the floor of Zone 5. The cool-down then held 170 bpm while pace fell away to
  // 9:13/mi, which is not what a recovered runner's heart does when the effort stops.
  // Resting HR that morning was 86 against a 79 median over the preceding week.
  // Everything here reads as accumulated load: a 3-hour hike on Aug 29, the longest run
  // of the cycle on Aug 30, then a hard evening session on Sep 1.
  //
  // Merged from two watch recordings with a ~6.5 min stop between them, sitting between
  // mile 2 and mile 3. Kai's account, which settles it: the watch was not recording the
  // way he wanted and he stopped to sort it out. So the stop was a full standing recovery
  // rather than anything the session asked for, and the "3 continuous miles" of the
  // export's planMatch is not what happened -- it was 1 mi at pace, a break, then 2 mi at
  // pace. That is an easier session than the continuous three that were written.
  //
  // Which makes the heart rate worse, not better, and corrects the reading first recorded
  // here: mile 3's 166 is a mean across a restart ramp, not a steady state. HR fell
  // through the break and climbed back over the opening minutes of the mile, so 8:02/mi
  // was costing more than 166 by the end of it. Mile 2's 150 understates the cost the
  // same way from the other side -- it came straight off the 9:45 warm-up with HR still
  // catching up. Mile 4 is the one split carrying neither artifact, and it says 7:54/mi
  // cost 170 bpm. Read the progression as two ramps around a genuine ~170 steady state,
  // not as 150 -> 166 -> 170 of drift.
  //
  // The export scores mile 4 against a 7:56 goal pace and calls the session an interval
  // workout of 4x1mi. Both are stale phone-side notes -- GOAL_PACE has been 7:42 since
  // the Aug 22 benchmark, and the plan has asked for 3 continuous goal-pace miles since
  // the Aug 23 rebuild. The measurements themselves are sound.
  //
  // Splits sum to 38:06 against the 38:45 total; the ~39 s difference is a 0.04 mi tail
  // at the end of the first recording that has no split of its own. That tail also means
  // the closing partial covers 0.48 mi rather than 0.52, putting it at ~9:13/mi against
  // the 9:17 the export states -- indicative either way over so short a remainder.
  // Cadence averaged 168 spm. No elevation or weather: neither was retrievable.
  {date:"2026-09-01", dist:4.52, mins:38.75, hrAvg:160, hrMax:180,
   splits:[
     {mi:1, mins:9.750, hrAvg:151},
     {mi:2, mins:8.000, hrAvg:150},
     {mi:3, mins:8.030, hrAvg:166},
     {mi:4, mins:7.900, hrAvg:170},
     {mi:4.52, mins:4.420, hrAvg:170},
   ]},
  // Week 6 Thursday, the easy day: 4 mi solo in true Zone 2, hold back. Run exactly
  // that way -- solo, 7:13pm, Delridge / West Duwamish Greenbelt. 4.02 mi at 141 bpm
  // average against a Zone 2 that tops out at 149, and at the top of the 136-142 band
  // that counts as genuinely easy.
  //
  // The export files this as "Westies club run" and matches it to a Group session.
  // Both are wrong: Kai had a scheduling conflict and ran alone, and the plan has
  // programmed this day as a solo Zone 2 run since the Aug 23 rebuild. It is the same
  // failure mode as the Aug 27 export, which also assumed the Thursday club run, and
  // the same family as the stale goal paces -- the phone cannot read the repo, so it
  // reconstructs context from memory and gets it wrong. The measurements are sound.
  //
  // It matters here because it changes what the run demonstrates. A club run at
  // 9:58/mi would mean the group happened to go out easy; running 9:58 alone, with
  // nobody setting the pace, is a deliberate choice to hold back. That is the harder
  // version and the one that transfers.
  //
  // This is the run the Sep 1 entry said was owed. Resting HR came back 74 on both
  // Sep 2 and Sep 3 against 86 on Sep 1 -- the lowest two readings in the series, and
  // the fatigue behind Tuesday's 170 bpm at 8:00/mi has cleared rather than compounded.
  //
  // No cardiac drift, and the claim rests on miles 2-4: 10:01 / 10:08 / 10:00 while HR
  // read 145 / 139 / 141. Heart rate falling while pace holds flat is the opposite of
  // decoupling. Mile 1's 145 is the one figure here not to lean on -- see below.
  //
  // Worth holding next to the easy days from three weeks ago. Aug 13 ran 8:24/mi at
  // 157 bpm and Aug 18 ran 8:45/mi at 153, both programmed easy and neither of them
  // easy. Tonight is 141. Most of that is discipline rather than physiology -- he is
  // choosing to hold back where he used to drift -- but it is the change that makes
  // the aerobic base actually accumulate.
  //
  // Two data caveats, both from the export and neither affecting the read above.
  // Kai confirmed the watch lost wrist contact from 19:16:23 to 19:21:44 and he
  // adjusted it mid-run; those 52 samples read 92-110 bpm while he was running and are
  // invalid. They were dropped, not backfilled -- a synthesized sample is
  // indistinguishable from a measured one downstream. hrAvg 141 survives it: the 282
  // clean samples mean 141.59 against Apple's time-weighted 141, two methods agreeing
  // inside 0.6 bpm. The bad window sits entirely inside mile 1 (which ended 19:22:59),
  // so mile 1's displayed 145 comes from Apple's smoothed stream rather than the raw
  // one, and this session's Apple zone breakdown -- Zone 1 in particular -- is
  // contaminated and must stay out of any time-in-zone trend.
  //
  // mins is moving time. Wall clock was 43:53 against 40:01 of movement, about 3:52 of
  // pauses at traffic lights; the splits reconcile to moving time within half a second,
  // and pace analysis wants the time he was actually running. Cadence 168 spm. No
  // elevation: health_query_v0's workout record does not expose it and flightsClimbed
  // is not a substitute, so this is a tool limit, not a gap in the watch data.
  {date:"2026-09-03", dist:4.02, mins:40.02, hrAvg:141, hrMax:163,
   splits:[
     {mi:1, mins:9.700, hrAvg:145},
     {mi:2, mins:10.020, hrAvg:145},
     {mi:3, mins:10.130, hrAvg:139},
     {mi:4, mins:10.000, hrAvg:141},
     {mi:4.02, mins:0.170, hrAvg:141},
   ]},
  // Week 6 Sunday, the peak long run: 11.73 mi, the longest of the cycle by 1.55 mi and
  // the longest in the file. The session asked for 11.5 with goal pace at miles 6-8.
  // What came back is two different runs stapled together, and worth reading that way.
  //
  // The aerobic session was excellent. Miles 1-5 ran 9:37 / 9:43 / 9:42 / 9:41 / 9:38
  // against the 9:00-9:45 band the plan set for them, at 119-130 bpm -- Zone 1 the whole
  // way. Then miles 9-11.73 came home 9:26 / 9:34 / 9:46 / 9:45 at 125-133 bpm. He ran
  // the closing 3.7 miles easy after the hard part, which is the exact habit the mid-run
  // placement of the effort block was built to train and the one Aug 30 and last year's
  // Orca both say he does not have. hrAvg 131 across nearly two hours, hrMax 159 -- one
  // beat under the Zone 4 floor, so this run never left Zone 3.
  //
  // The quality session did not happen. The route turned into an unplanned climb where
  // the goal-pace miles were meant to go, and the fastest mile of the day was mile 8 at
  // 8:15. Miles 6-8 are still where the effort went -- 9:08 / 9:21 / 8:15 at 132 / 146 /
  // 151 bpm against 119-130 for the five before them -- so the page finds them and scores
  // them against the band, which reads 65 s/mi slow. That number is true and the reason
  // it is true is terrain, not fitness. Which is what note and flags below are for.
  //
  // mins is HealthKit MOVING time, deliberately, and this is the one place the file
  // departs from the schema's "elapsed duration" wording. Wall clock was 118.68 min
  // against 111.01 of movement; the 7:39 difference is a genuine standstill, not a
  // sensor fault -- HR sampling is continuous across it and falls to 87-96 bpm for about
  // five minutes around 15:10 local. Reconstructing the splits with the gap inserted at
  // the mile 5/6 boundary lands the final split within 3 s of the recorded end, which is
  // where it sits. 111.01 matches the split sum of 110.97 and gives 9:28/mi. Do not
  // "correct" this to elapsed: 118.68 would render the run at 10:07/mi and charge the
  // pace chart twice for the same stop.
  //
  // The first flag quotes goal pace as 7:56. GOAL_PACE has been 7:42 since the Aug 22
  // benchmark, so the parenthetical is stale -- the same phone-side drift as the Aug 30
  // and Sep 1 exports. The claim itself survives either figure: the fastest mile was
  // 8:15. GOAL_PACE is untouched here; a hilly long run is not benchmark evidence.
  //
  // No elevation. This run is entirely a hills story, which makes it the most tempting
  // entry in the file to put a number on, and there is still no measured one to put --
  // health_query_v0 exposes no feet-based type and flightsClimbed buckets are
  // inconsistent. Power from the splits screen is the only terrain proxy and it is in
  // the flags, not invented into a field. Cadence likewise: two measured segments in the
  // flags rather than a whole-run average the stop would have contaminated.
  {date:"2026-09-06", dist:11.73, mins:111.01, hrAvg:131, hrMax:159,
   // Kai's account of the run. Kept alongside flags rather than merged into them: the
   // two do not fully agree -- this says a brief walk, the flags say a 7:39 standstill
   // and no goal-pace mile -- and the disagreement is the useful part.
   note:"First ~5 mi as approach running to a park, then the goal-pace block was intended. " +
        "Park route was hillier than expected; an unfamiliar path led to a steeper climb. " +
        "Chose to slow and climb rather than hold goal pace, and walked briefly. " +
        "Distance exceeded the 11.5 mi plan.",
   // What the watch recorded, as the export wrote them. Observations, not verdicts.
   flags:[
     "No mile averaged goal pace (7:56/mi). Fastest split was mile 8 at 8:15/mi.",
     "Effort block is miles 6-8: HR avg 132/146/151 vs 119-130 for miles 1-5. HR held 150-159 continuously from 15:26 to 15:42 local, spanning miles 7-8.",
     "hrMax 159 from sample-level query. Apple Fitness zone table reports 00:00 in Zone 4 (160+ bpm) — peak was one beat below the Zone 4 floor.",
     "Zone 1 on this device is <139 bpm, an unusually wide bucket that covers walking through easy running. The 1:30:12 Zone 1 total reflects bucket width, not an unusually low effort.",
     "Closing miles 9-12 (9:26, 9:34, 9:46, 9:49/mi) are the slowest running of the day, with power dropping to 210-242W from 288-296W in the effort block. No goal-pace segment after the climb.",
     "Cadence measured on two segments only: ~170 spm across mile 8 (fastest split), ~162 spm across the final 8.5 minutes. Roughly 8 spm decline into the closing miles.",
     "runningSpeed samples include values as low as 0.47 m/s (~57:00/mi) during the 15:17-16:17 local hour, consistent with walking on the climb separate from the 7:39 standstill.",
     "Wall-clock elapsed 118.68 min against 111.01 moving; the 7:39 gap sits at the mile 5/6 boundary, placed by split reconstruction and corroborated by an HR trough to 87-96 bpm.",
   ],
   splits:[
     {mi:1, mins:9.617, hrAvg:126},
     {mi:2, mins:9.717, hrAvg:130},
     {mi:3, mins:9.700, hrAvg:124},
     {mi:4, mins:9.683, hrAvg:125},
     {mi:5, mins:9.633, hrAvg:119},
     {mi:6, mins:9.133, hrAvg:132},
     {mi:7, mins:9.350, hrAvg:146},
     {mi:8, mins:8.250, hrAvg:151},
     {mi:9, mins:9.433, hrAvg:133},
     {mi:10, mins:9.567, hrAvg:133},
     {mi:11, mins:9.767, hrAvg:128},
     {mi:11.73, mins:7.117, hrAvg:125},
   ]},
  // Week 7 Tuesday, the taper's one quality session: 1mi WU + 2mi @ goal pace + 1mi CD.
  // Confirmed against PLAN, not taken from the export -- both Sep 8 exports say plainly
  // that they could not read index.html and asked for the match to be checked here.
  //
  // It is the session the taper was rebuilt around, and it held. Miles 2-3 came back
  // 7:36 and 7:53 for a 7:44/mi block against a 7:35-7:50 band, at 168 and 165 bpm.
  // Four goal-pace attempts before this one produced exactly one clean execution
  // (Aug 30's two miles); Aug 25 ran 55 s/mi fast, Sep 1 came back 12 s/mi slow around
  // a 6:39 stop, and Sep 6 lost its block to an unplanned climb. This is the second,
  // eleven days out, on the distance race day actually asks him to hold.
  //
  // The bookends did their job too, which is the other half of the session: 9:44 / 9:32
  // and a 9:57 closing partial at 145 / 143 / 140 bpm. The hard effort did not bleed
  // into the miles around it, and the run finished easy rather than kicking -- the habit
  // Aug 30 and last year's Orca both say he does not have.
  //
  // Two exports cover this date and NEITHER supersedes the other; this row is a
  // field-level merge, which the later file asked for explicitly:
  //   export-2026-09-08-2245.json -- transcribed from Apple Fitness screenshots. Sole
  //     source for splits, hrAvg, the zone breakdown and the recovery HR. Its own dist
  //     (4.24) and mins (37.10) were reconstructed by summing screenshot splits.
  //   export-2026-09-08-2319.json -- a HealthKit gap-fill pull. Sole source for dist,
  //     mins, hrMax and calories, all read off the Apple workout record.
  // Taking the richer row whole, as the standing dedupe rule would, keeps the twice-
  // rounded distance and drops the measured one. dist 4.235 mi (6815.99 m) and mins
  // 37.174 (2230.44 s) are Apple's, converted directly. The splits still sum to 37:06,
  // 4 s under, because each screenshot row is rounded to the second -- expected, and the
  // reason the aggregate is not derived from them.
  //
  // A third file, export-2026-09-09-2245.json, carried these same measurements under a
  // Sep 9 date -- a UTC/Pacific slip in the producing session. It has been trashed in
  // Drive and must not be merged if it reappears. Sep 8 is correct: the run ended at
  // 22:38 local.
  //
  // mins is MOVING time, the same convention as Sep 6. Elapsed was 37.683 min against
  // 37.174 of movement, so 30.6 s of pause. Small enough not to change the read; recorded
  // so the next pull does not "correct" it upward and charge the pace chart for the stop.
  //
  // No elevation and no cadence, both deliberately absent rather than estimated. This
  // HealthKit instance exposes no running-cadence type at all; step count over the query
  // window would give anywhere from 161 to 173 spm depending on which denominator you
  // pick, and the step total itself came back fractional (6445.5), so it is a prorated
  // bucket rather than a count. Power from the splits screen is in the flags.
  {date:"2026-09-08", dist:4.235, mins:37.174, hrAvg:153, hrMax:176,
   note:"Night run, 22:00–22:38 local. Easy opener, two continuous miles at goal pace, " +
        "then an easy close. Ran as written.",
   flags:[
     "Goal-pace block held: miles 2-3 at 7:36 and 7:53 average 7:44/mi, inside the 7:35-7:50 band the session was set under.",
     "The 2245 export scores this block against a 7:56/mi goal pace, which is stale -- GOAL_PACE has been 7:42 since the Aug 22 benchmark, the same phone-side drift as the Aug 30, Sep 1 and Sep 6 exports. Against 7:42 the claim that both miles ran at or under goal pace is wrong: mile 2 was 6 s/mi fast, mile 3 was 11 s/mi slow. The block average is what held, not the individual miles.",
     "Fast block was mildly positive-split: mile 2 ran 17 s/mi quicker than mile 3 while carrying only 3 bpm more. One data point over two miles -- not a pacing pattern.",
     "Zone totals (Apple, 37:10): Z1 6:39 · Z2 10:01 · Z3 7:56 · Z4 6:54 · Z5 5:40. So 12:34 (33.8%) above 160 bpm and 5:40 (15.2%) above 170.",
     "Per-mile HR averaged Zone 4 through the block (168, 165), but 5:40 of the session still sat in Zone 5. Less than the 8:49 above 170 that Aug 25 cost, and bought at the right pace rather than 55 s/mi too fast.",
     "Apple's displayed zone floors on this screen were Z1 <139, Z2 140-149, Z3 150-159, Z4 160-169, Z5 170+ -- the same <139 the Sep 6 export reported. HR_ZONES in index.html moved to match.",
     "Easy miles were genuinely easy: 9:44 / 9:32 / 9:57 at 145 / 143 / 140 bpm, at or just under the top of Zone 2.",
     "Two-minute post-workout HR recovery: 139 at the 22:38 finish, 130 at +1 min, 118 at +2 -- a 21 bpm drop. Compare Sep 3 (141 to 98, easy run) and Aug 25 (144 to 114, hard structured effort). The slowest of the three; a harder session in front of it is the ordinary explanation, but it is worth watching rather than dismissing in taper week.",
     "Per-mile running power (Apple Fitness screenshot; schemaVersion 1 splits carry no power field): 221 / 320 / 283 / 215 W, closing partial 222 W. Time-weighted average 253 W.",
     "hrAvg 153 is Apple's own workout average. HealthKit's statistics over the 22:00-22:40 local window give 150.8, but that window is ~92 s wider than the run and includes pre-start and post-finish samples, so the 2319 export declined to write it.",
     "hrMax 176 is a true sample-level maximum from the 2319 pull, obtained with the local-clock workaround; the 2245 file read the same figure off the Fitness chart axis. It sits at the top of the 166-176 band recorded for last year's all-out race effort.",
   ],
   splits:[
     {mi:1, mins:9.730, hrAvg:145},
     {mi:2, mins:7.600, hrAvg:168},
     {mi:3, mins:7.880, hrAvg:165},
     {mi:4, mins:9.530, hrAvg:143},
     {mi:4.235, mins:2.350, hrAvg:140},
   ]},
  // Week 7 Thursday, the easy run, with the Westies in West Seattle. 3.11 mi at 10:03/mi
  // against a 9:30-10:15 band and a plan that said "hold back" -- run as written, and the
  // most quietly encouraging row in the file.
  //
  // The signal is the heart rate. Sep 3 was the same session at effectively the same pace
  // (4.02 mi at 9:57/mi) and cost 141 bpm; this one cost 134. Mile for mile against that
  // run it is 136/133/133 where Sep 3 was 145/145/139 -- down 9, 12 and 6 bpm at a pace
  // within 6 s/mi. Easy-pace HR falling at a held pace across weeks is the aerobic
  // fitness signal this plan has been watching for since the baseline was written, and
  // it is now visible without squinting.
  //
  // It is a taper week, so freshness is part of the explanation and the honest read is
  // "fitness plus recovery", not fitness alone. That does not weaken it: arriving at race
  // week with easy running this cheap is the outcome the taper was for.
  //
  // HR also fell through the run -- 136, 133, 133, 130 -- rather than drifting up, on
  // splits of 10:01 / 10:03 / 9:59. No cardiac drift at all across half an hour, and the
  // evenest pacing of any run in the file.
  //
  // The export's second flag argues with the zone table using a "true zone 2 per project
  // baseline (136-142bpm)". That band is the hand-set ceiling HR_ZONES replaced back in
  // August -- the same stale phone-side figure as the recurring 7:56 goal pace -- and the
  // flag is kept as written rather than edited. Against the zones the page actually uses,
  // 134 bpm is Zone 1, and the plan counts Zone 1 as easy: an easy day run easier than
  // Zone 2 is still an easy day. Nothing here is a miss.
  //
  // The same flag reports the device's own boundaries as Zone 1 <139 and Zone 2 140-149,
  // which is the third export in a row to print them that way. HR_ZONES.asOf moves to
  // Sep 10 on the strength of it; the bands themselves are unchanged.
  //
  // No elevation and no weather, both omitted by the export rather than estimated.
  // Cadence is a derived figure -- HealthKit stepCount over the workout window divided by
  // moving time -- and the export says so plainly, which is the reason it is trustworthy
  // enough to keep where Sep 8's identical derivation was not: that one had a fractional
  // step total over a window 92 s wider than the run, this one is over the exact window.
  {date:"2026-09-10", dist:3.11, mins:31.26, hrAvg:134, hrMax:145,
   note:"Easy run with the Westies, West Seattle. True Zone 2 per plan; " +
        "pace target was 9:30–10:15/mi, actual 10:03/mi average.",
   flags:[
     "Avg HR 134 bpm vs 141 bpm on the Sep 3 Westies run at nearly identical pace (10:03 vs 9:58/mi) — HR trending down at same effort, consistent with taper freshness rather than a harder or easier run.",
     "27:55 of the run logged in the watch's Zone 1 (<139bpm), only 2:03 in Zone 2 (140-149bpm) — device zones are generic/age-based; true zone 2 per project baseline (136-142bpm) matches this effort well despite the device's zone label.",
     "Fast post-run HR recovery: 129 to 115 to 108 bpm within 2 minutes of stopping. Compare Sep 8's 139-130-118 after the goal-pace session -- 21 bpm over two minutes there against 21 here off a much lower starting point.",
     "Avg and max HR were cross-checked two ways before being written: 352 raw heartRate samples over the exact workout window average 133.86, and the Apple Fitness Heart Rate screen shows 134 avg over a 125-145 range. They agree.",
     "Cadence 163 spm is derived -- HealthKit stepCount over the workout window divided by moving time -- not a measured running-cadence sample.",
   ],
   splits:[
     {mi:1, mins:10.020, hrAvg:136},
     {mi:2, mins:10.050, hrAvg:133},
     {mi:3, mins:9.980, hrAvg:133},
     {mi:3.11, mins:1.130, hrAvg:130},
   ]},
  // Week 7 Sunday, the last long run before the race, and the one that changed the plan.
  // 8.01 mi at 9:19/mi. Started at 23:08, late in the evening, so it crossed midnight
  // and ended on the 14th; it is logged under Sep 13 per Kai's call, which is right -- it is
  // Sunday's session and the plan is written in Pacific days.
  //
  // Real knee pain, upper medial side, from about mile 6. First genuine pain during a run
  // this block. He slowed, adjusted foot-strike, paused once to rub it, and finished. That
  // is the headline; the pace numbers below are downstream of it
  // and should not be read as a fitness result.
  //
  // The session asked for the last 2 mi at goal pace and did not get them: the page finds
  // miles 7-8 as the effort and scores them 8:48/mi against a 7:35-7:50 band, 58 s/mi slow.
  // True, and not a pacing miss. Mile 6 (9:35) was the slowest full mile of the run and is
  // where the pain started; mile 7 then came back 8:14, the fastest of the day, before mile 8
  // faded to 9:21. A surge-then-fade shape with a physical interruption through the middle
  // of it is not evidence about his pacing discipline either way.
  //
  // The export's second flag quotes the target band as 7:49-8:04/mi. That is the stale 7:56
  // goal pace again -- the same phone-side drift as the Aug 30, Sep 1, Sep 6 and Sep 10
  // exports -- and it is kept verbatim with the correction here. Against the real 7:42 and
  // the band the session was actually set under, mile 7 was 24 s/mi slow and mile 8 was
  // 91 s/mi slow, so the flag understates the gap rather than inventing one.
  //
  // Reviewed by his PT on Sep 15: not a long-term blocker, and the race is on. The foot-strike
  // adjustment he made mid-run is now understood to have been the wrong focus. The clinical
  // detail lives in the personal skill copy, not in this repo.
  //
  // hrAvg 145 with 9:12 in Zone 4 and nothing at all in Zone 5, on a run that hurt -- the
  // cardiovascular side of this was never the problem.
  //
  // CORRECTED Oct 2, from the Sep 19 evening exports (1622 and 1715b) that were written after
  // the race commit and never merged. Kai's corrected account: he did not just slow and adjust
  // at mile 6 -- he paused the watch and rested, unsure whether he could keep running, and at
  // the time assumed the problem was the joint. He then pushed into miles 7-8, which the plan
  // had at race pace, without quite hitting it. So mile 7's 8:14 is the planned race-pace
  // segment taken straight after the pause, not a pain-driven surge, and its 172 spm is the
  // session's highest cadence. `mins` was already moving time, so the pause changes no
  // measurement. The re-pull read 8.02 mi, 144 avg and 925 kcal against this row's 8.01 and
  // 145 from the Sep 14 pull -- two HealthKit reads of one workout, a beat and a hundredth
  // apart -- and the earlier pull stays as the record rather than reconciling the two. The
  // watch's 9th split, the few steps past 8.00 mi, is confirmed by Kai as an artifact; it
  // stays below as the 0.01 mi fragment it is and carries no weight. Running dynamics for the
  // whole run, from the Workout Details screen (no schema field): vertical oscillation 9.1 cm
  // avg (8.5-10.6), ground contact 283 ms avg (232-323), stride length 1.0 m avg (0.8-1.2).
  // The waveforms show a clean marker at the pause rather than a blank stretch, consistent
  // with the watch being stopped outright -- unlike the race six days later.
  {date:"2026-09-13", dist:8.01, mins:74.67, hrAvg:145, hrMax:169, cadenceAvg:169,
   note:"Started late in the evening, so the run went from 11:08pm into after midnight. " +
        "Knee pain (upper medial) from about mile 6 — the first pain during a run this block. " +
        "Paused the watch and rested, unsure whether he could keep running, then pushed into " +
        "miles 7–8, which the plan had at race pace, without quite hitting it. Finished with no " +
        "further pain, and none since. (Corrected on Sep 19 from an earlier account that said " +
        "he only slowed and adjusted his foot-strike.)",
   flags:[
     "Knee pain (upper medial) at ~mile 6 -- no consistent running before this training block; biking, backpacking and skiing without pain.",
     "Planned quality (last 2mi @ goal pace, target band 7:49-8:04/mi) not held: mile 7 ran 8:14/mi, mile 8 ran 9:21/mi -- both outside the band, most likely tied to the knee pain onset rather than a pacing miss.",
     "Mile 6 (9:35/mi) was the slowest full mile and lines up with where the pain started; mile 7 then jumped to 8:14/mi, the fastest of the run, before fading again on mile 8 -- a negative-split-then-fade shape similar to last year's race, but with a physical interruption as a likely confound this time rather than a pure pacing pattern.",
     "Watch HR zones: Z1 <139 20:25, Z2 140-149 25:47, Z3 150-159 13:59, Z4 160-169 9:12, Z5 170+ 0:00. Nothing above 170 on the whole run.",
     "Running power by mile (W, non-schema metric): 222, 264, 192, 240, 230, 204, 278, 238, 241 (final partial).",
     "Post-workout recovery HR: 157 at 0:27, 128 at 1 min, 116 at 2 min.",
     "Reviewed by his PT on Sep 15 and cleared to race -- not a long-term blocker. The clinical detail is kept out of this repo.",
     "Mile 7's surge (8:14/mi, 172 spm -- the session's highest cadence, above the 167-170 baseline everywhere else) is the planned race-pace segment from the training plan, pushed into right after the pause, not an unplanned or purely pain-driven effort.",
     "Peak HR 169 bpm during this training run, close to the 173 bpm max on race day itself -- the prescribed race-pace miles pushed him nearly to race intensity in training.",
     "A 9th split shown on the watch (8:33/mi, no HR, 157 spm, ~241W) is confirmed by Kai as an artifact of the last few steps past 8.00 mi before he stopped the watch -- disregarded entirely, not entered as a partial split.",
     "Running dynamics, whole-workout avg/range (Workout Details screen, no schema field): vertical oscillation avg 9.1cm (range 8.5-10.6), ground contact time avg 283ms (range 232-323), stride length avg 1.0m (range 0.8-1.2).",
     "Unlike the Sep 19 race -- where the running-dynamics waveforms show a blank gap during the walk, because the watch kept recording through slow continued movement -- this run's waveform shows a clean marker with no blank stretch. Consistent with Kai's corrected account that he paused the watch outright rather than continuing to move; mechanically distinct from the race-day stop.",
     "Both vertical oscillation and ground contact time reach a peak roughly 15-25% above their own day's average near the pause point, proportionally similar to race day despite this run being far easier overall -- suggestive of a repeatable gait signature tied to the developing knee irritation rather than pure fatigue. Can't be cleanly isolated here, though: Kai deliberately pushed into a hard effort (planned race-pace miles) immediately after resuming, which would elevate the same metrics for an unrelated reason.",
   ],
   splits:[
     {mi:1, mins:9.617, hrAvg:133},
     {mi:2, mins:9.417, hrAvg:150},
     {mi:3, mins:9.450, hrAvg:138},
     {mi:4, mins:9.333, hrAvg:144},
     {mi:5, mins:9.467, hrAvg:147},
     {mi:6, mins:9.583, hrAvg:136},
     {mi:7, mins:8.233, hrAvg:161},
     {mi:8, mins:9.350, hrAvg:160},
     {mi:8.01, mins:0.150},
   ]},
  // Thursday Westies group run, two days out. The dress rehearsal for race day, and the
  // first run since the Sep 15 PT visit.
  //
  // The headline is not the pace, it is the heart rate. 9:16/mi at 151 bpm average, which is
  // Zone 3, on a run that was meant to be easy. Set it beside the Sep 13 long run: 9:19/mi at
  // 145 bpm over eight miles. Same pace, a third of the distance, six beats higher. A short run
  // should sit *below* a long one at matched pace, not above it, so this is not a pace artifact.
  // Kai's own read is a stressful day plus afternoon coffee rather than effort or fitness, and
  // that explanation covers the elevated resting HR the same day too -- recorded as reported,
  // and preferred over an inference from the number, but see the RESTING_HR note below for why
  // it is worth one question rather than a silent pass.
  //
  // The favourable half: pace dropped from 9:40 to 8:57 between miles 2 and 3 while HR moved
  // 149 -> 152. Pace improving three beats is the opposite of cardiac drift, and it is the same
  // negative-split habit the project has logged since last year's race.
  //
  // The export's third flag quotes the closing fragment as 8:28/mi; over the 0.14 mi remainder
  // it computes to 8:21/mi. Both are inside the rounding error a fragment that short carries --
  // the flag is kept verbatim per convention, and neither figure should carry any weight.
  //
  // The second flag describes the cue as a single part; the PT's written follow-up the same
  // evening made it two. Flag kept verbatim; whether Thursday rehearsed one part or both is an
  // open question for Kai, not something to infer.
  {date:"2026-09-17", dist:3.14, mins:29.11, hrAvg:151, hrMax:157, cadenceAvg:166,
   note:"Thursday Westies group run, 2 days before the Orca half, and the one dress rehearsal " +
        "before race day. No knee pain at any point. Running Power (Watch-reported, not a " +
        "schema field) ranged ~212-236 W across the splits.",
   flags:[
     "HR average 151 bpm (Zone 3) -- Kai attributes this to a stressful day plus afternoon coffee, not effort or a fitness concern",
     "No knee pain during this run; Kai followed his PT's cue on knee tracking -- his own read, not a clearance from the PT",
     "Splits negative-split (9:16 -> 9:40 -> 8:57 -> 8:28/mi) with HR essentially flat (151 -> 149 -> 152 -> 153) -- consistent with his known negative-split tendency, not cardiac drift",
     "Cadence 166 spm sits at or just under the 167-172 baseline floor. Expected on a slow group run and not read as a finding on its own.",
     "Elevation omitted, not estimated: a flightsClimbed proxy of 3 was available and the export correctly excluded it.",
     "HR for the first ~6.5 minutes is absent from the Watch record. Apple's own zone breakdown for the workout sums to 22:34 against a 29:11 duration, which confirms the gap is in the recording rather than in the query -- so hrAvg 151 is an average over ~22.5 min, not the full run.",
   ],
   splits:[
     {mi:1, mins:9.27, hrAvg:151},
     {mi:2, mins:9.67, hrAvg:149},
     {mi:3, mins:8.95, hrAvg:152},
     {mi:3.14, mins:1.17, hrAvg:153},
   ]},
  // ══ RACE DAY ══ Brooks Orca Half Marathon. The goal race, and the last session of the plan.
  //
  // 1:45:45 for 13.22 mi on the watch — 8:00/mi against a 1:40:56 goal, hrAvg 153, hrMax 173.
  // Official chip time 1:45:51.49, supplied by Kai on Oct 1, over the measured 13.1 mi course
  // (8:05/mi official). Recorded in `officialTime` and `courseMi` as separate facts: `dist`,
  // `mins` and the splits stay the watch's record so they keep reconciling with each other,
  // and the six-second gap between watch and chip is not reconciled by arithmetic.
  //
  // `mins` is the full 105:45 with the eight-minute walk inside it, and that is deliberate.
  // The usual convention here is moving time, but there is a real walk in the middle of this
  // run and it is what the race cost — reporting it out would misstate both the race and the
  // injury. Apple's zone totals sum to 95:04 against the same 105:45; the ~10:41 gap lines up
  // with the walk, so it is a hole in the zone accounting, not a second opinion on duration.
  //
  // THE KNEE FIRST — this is the monitoring rule, not a footnote. Pain from ~mile 6,
  // progressive, and it forced him to stop and walk: "barely able to walk at points." Gait was
  // altered, which is the exact condition the rule names. It is the second mile-6 onset in six
  // days and it is WORSE than the first — on Sep 13 he could adjust and keep running, on
  // Sep 19 he could not. The PT's cue and the pre-race foam rolling were both in force and
  // neither prevented it. This needs his PT's review before the next block is built, and it
  // must not be closed out on the pain-free finish. The export
  // says exactly that itself, and it is right.
  //
  // What the closing miles do to the easy explanations:
  //   Miles 11–13 ran 7:27 / 6:59 / 6:40 — his three fastest of the day — at HR 148/154 and
  //   278/300/314 W, against miles 4–7 at 7:42–7:46, HR 166–168, 258–278 W. Faster, at a lower
  //   heart rate, at higher power, on the leg that could not walk half an hour earlier. A
  //   muscle progressively failing under accumulated load does not do that. Whatever happened
  //   at mile 6 resolved rather than accumulated, and the walk sits between the two states.
  //   Overstriding is not it either: derived stride length was LONGER in the pain-free closing
  //   block (~1.27–1.42 m) than in the block where the pain built (~1.23–1.25 m).
  //
  // elevGainFt is missing from this pull and it is the field that would settle the most
  // interesting question on the page — faster at a lower heart rate usually means terrain, and
  // the course profile is the one thing that could explain miles 11–13 without physiology. Not
  // estimated. Worth a follow-up pull, or one question to Kai.
  //
  // The aerobic verdict, which is the good news and should not get buried under the knee:
  // 8:00/mi at 153 avg, against last year's untrained 8:30/mi at 166–176. Thirty seconds a mile
  // faster at a materially lower heart rate, and the steady block at 7:44/mi sat at 166–168 —
  // roughly where last year's entire race sat, 46 s/mi slower. The engine was never the
  // limiter. This race says so plainly, and it puts the limiter exactly where the project has
  // had it all along: the quad.
  //
  // Cadence held 167–171 throughout and did NOT sag in the closing miles (170/169/170/171),
  // which is the failure mode the music exists to guard. The 150 and 160 on miles 8–9 are the
  // walking values, not a fade.
  //
  // Splits carry powerW and cadenceSpm per mile rather than as prose in a flag, which is a
  // departure from the Sep 13 row. Fourteen paired values do not survive being flattened into
  // a sentence, and cadence is a named intervention in the knee plan — it belongs beside the
  // mile it was measured on. Nothing reads these fields yet; they are recorded, not rendered.
  //
  // CORRECTED Oct 2, from three Sep 19 evening exports (1715a, 1750-corrects, 1805-corrects)
  // written after the race commit and never merged. Two things change the reading above, and
  // one closes a loose end.
  //   Around mile 8, maybe 8.5, with the pain bad enough that he doubted he would finish, Kai
  //   took a painkiller he had carried as a race-day contingency -- the first and only
  //   medication of the block -- rubbed the quad, walked, and worked back into running. His
  //   form felt more natural from there and the knee did not hurt again. So the "resolved
  //   rather than accumulated" read of the closing miles above is now potentially pain-masked
  //   rather than confirmed: what he took typically starts working within 20-30 minutes and
  //   builds over 60-90, which overlaps the remaining 35-40 minutes of the race almost exactly.
  //   The power, HR and pace are still real and measured; only their use as evidence of an
  //   uninjured closing stretch is in question. The pain-free days since stand on their own.
  //   The export names the medication; this repo does not, and the flag below is paraphrased
  //   to the same end rather than kept verbatim.
  //   The mid-race self-massage was the quad, not the joint. "Rubbed the knee" in one of his
  //   accounts was a slip, per Kai.
  //   Running dynamics for the whole race, from the Workout Details screen (no schema field):
  //   vertical oscillation 9.8 cm avg (8.7-12.2), ground contact 252 ms avg (213-312), stride
  //   length 1.2 m avg (0.8-1.5). All three waveforms show a blank gap lining up with the
  //   eight-minute walk -- the watch kept recording through slow movement rather than being
  //   paused, unlike Sep 13 -- and all three trend up into the gap, with a smaller version of
  //   the same rise near the same point on Sep 13. Confounded on both runs by effort changes in
  //   the same window, so suggestive of a gait signature, not confirmed.
  {date:"2026-09-19", segment:"race", dist:13.22, mins:105.75, hrAvg:153, hrMax:173,
   officialTime:"1:45:51.49", courseMi:13.1,
   note:"Brooks Orca Half Marathon, Lincoln Park to Don Armeni. Started deliberately slow, " +
        "settled into race pace and felt strong. Knee pain began around mile 6 and worsened " +
        "progressively until he had to stop and walk — barely able to walk at points — and " +
        "rubbed the quad to settle it. Around mile 8 he thought he would not finish, and took a " +
        "painkiller he had carried for race day — the only medication of the block. He worked " +
        "back into running, his form felt more natural from there, he had no further knee pain " +
        "for the rest of the race, felt strong " +
        "with plenty left, and closed with his three fastest miles. No knee pain at any point " +
        "since finishing. Zone-1 recovery: 170 bpm at stop, 141 at 1 min, 131 at 2 min.",
   flags:[
     "KNEE — pain onset ~mile 6, progressive, forced a walk; gait was altered. Second occurrence at the mile-6 mark in 6 days (prior: Sep 13, 8-mile taper long run, upper medial, eased with pace/foot-strike change). Escalation between the two: Sep 13 he could adjust and keep running, Sep 19 he could not. Pain fully resolved during the race and has not returned post-race. No swelling reported as of 10:42 local. Needs PT review — consumer should not close this out on the pain-free finish alone.",
     "Sample-level HR around the incident: 154 bpm at 08:31:40, falling to 119 by 08:33:10, held 115-126 until ~08:39:30, back through 135 by 08:39:50 and running by ~08:40. Approx 8 min of walking covering ~0.6 mi, spanning the back half of mile 8 and the first third of mile 9.",
     "Closing miles ran faster at lower HR and higher power than the mid-race steady miles: miles 11-13 at 7:27/6:59/6:40, 148/154/- bpm, 278/300/314 W, against miles 4-7 at 7:42-7:46, 166-168 bpm, 258-278 W.",
     "Time lost against his own mile 4-7 steady pace (7:44/mi) across miles 8-10: approx 4:33.",
     "CADENCE — full range across the race is 167-171 spm running (150 spm mile 8 and 160 spm mile 9 are the walking miles). Cadence moved 1.8% while pace moved 15% between mile 7 (7:46, 167 spm) and mile 13 (6:40, 170 spm). Kai changes speed almost entirely through stride length, not turnover.",
     "Derived per-step stride length (pace/cadence, not measured): miles 3-7 approx 1.23-1.25 m; miles 11-13 approx 1.27-1.42 m. Stride was LONGER in the pain-free closing block than in the block where pain developed, so a simple overstriding explanation for the mile-6 onset is not supported by this data.",
     "The 167-170 spm values in miles 3-7 match the 'sagging into the high 160s' pattern already noted in the project baseline, but the spread against the closing miles is small enough (3 spm) that it should be treated as weak evidence, not a cause.",
     "Around mile 8-8.5, with pain severe enough that he doubted he would finish, Kai took a painkiller he had carried as a race-day contingency -- not taken at any earlier point in training -- rubbed the leg, walked briefly, and worked back into running. This means the 'resolved under load' pattern in miles 9-13 -- rising power, falling HR, no reported pain -- should be read as potentially pain-masked rather than confirmed spontaneous resolution; its typical onset and peak overlap the remaining ~35-40 min of the race. The power/HR/pace data itself is still real and measured; only its use as evidence of an efficient, uninjured closing stretch is now in question. Not a diagnosis and not medical advice. (Paraphrased: the export names the medication, this repo does not.)",
     "Resolved: the mid-race self-massage was the quad, not the knee joint. 'Rubbed the knee' in an earlier account was a slip, per Kai.",
     "Running dynamics, whole-workout avg/range (Workout Details screen, no schema field): vertical oscillation avg 9.8cm (range 8.7-12.2), ground contact time avg 252ms (range 213-312), stride length avg 1.2m (range 0.8-1.5).",
     "The vertical-oscillation/ground-contact-time/stride-length waveforms all show a visible blank gap lining up with that ~8 min walk -- independent confirmation of the stop from a different sensor stream than heart rate. This is a blank gap (no data), not a marker -- consistent with Kai continuing to move (walking) rather than pausing the watch, unlike Sep 13.",
     "All three waveforms trend up (more oscillation, more ground contact time, and stride length climbs after) in the stretch leading into the gap, then the pattern partially repeats -- a smaller version of the same rise -- near the same relative point on the Sep 13 run. Confounded on both by effort changes around the same window, so treat as suggestive of a gait signature rather than confirmed.",
     "Derived (pace x cadence, not measured): total footstrikes to mile 6 were ~8,050 on race day vs. ~9,550 on the Sep 13 taper run to its mile 6 -- footstrike count does NOT line up between the two pain-onset points as tightly as raw mileage does (6.0 mi both times), arguing for distance/mileage itself as the trigger over cumulative load cycles.",
     "No swelling, no pain at rest, no pain since finishing, as of the day after.",
   ],
   splits:[
     {mi:1, mins:8.55, hrAvg:149, powerW:241, cadenceSpm:171},
     {mi:2, mins:8.083, hrAvg:160, powerW:297, cadenceSpm:171},
     {mi:3, mins:7.833, hrAvg:166, powerW:278, cadenceSpm:167},
     {mi:4, mins:7.7, hrAvg:166, powerW:262, cadenceSpm:168},
     {mi:5, mins:7.733, hrAvg:168, powerW:258, cadenceSpm:167},
     {mi:6, mins:7.717, hrAvg:158, powerW:269, cadenceSpm:170},
     {mi:7, mins:7.767, hrAvg:154, powerW:263, cadenceSpm:167},
     {mi:8, mins:10.133, hrAvg:141, powerW:203, cadenceSpm:150},
     {mi:9, mins:9.4, hrAvg:139, powerW:219, cadenceSpm:160},
     {mi:10, mins:8.2, hrAvg:145, powerW:254, cadenceSpm:169},
     {mi:11, mins:7.45, hrAvg:148, powerW:278, cadenceSpm:170},
     {mi:12, mins:6.983, hrAvg:154, powerW:300, cadenceSpm:169},
     {mi:13, mins:6.667, powerW:314, cadenceSpm:170},
     {mi:13.22, mins:1.467, powerW:316, cadenceSpm:171},
   ]},
  // ══ BETWEEN BLOCKS ══ The first run after the half, eight days on, on travel in
  // Cincinnati: a hilly 3.14 mi loop at 7:54/mi and 159 bpm average, with about 17 of its 25
  // minutes in Zone 4-5 by Apple's count. Not an easy run by any reading, and it was not meant
  // as one -- there was no plan in force. 299 ft of gain is Apple's figure from the Fitness
  // summary, the first measured elevation in this file since the Aug 23 run; per-mile gain was
  // not on the screens, so the climbing cannot be placed. 73 F and sunny by the Fitness screen
  // (shown as 23 with no unit; read as Celsius, since 23 F is not a late-September afternoon in
  // Ohio). Kai's account came on Oct 2: a little nervous about the knee at the start, little
  // pain during the run. Splits are Apple's own, transcribed; they sum to 24:43 against 24:47,
  // which is display rounding. `mins` is moving time and there was no pause.
  {date:"2026-09-27", dist:3.14, mins:24.79, hrAvg:159, hrMax:172, cadenceAvg:170,
   elevGainFt:299, elev:"299 ft gain",
   note:"A little nervous about the knee at the start, but he didn't experience much pain " +
        "during the run at all. A hilly loop in Cincinnati, on travel, on a 73 F afternoon.",
   flags:[
     "First run in the 8 days after the Sep 19 half marathon.",
     "Hilly: 299 ft of gain over 3.14 mi (about 95 ft/mi). Per-split elevation was not on the screens shared, so the climbing cannot be placed by mile.",
     "Not an easy effort by heart rate: 159 avg, about 17 of 25 minutes in Zone 4-5 per Apple's estimate, miles 2-3 at 166 bpm for 7:51 and 7:37.",
     "Fastest full mile was the last one (7:37), then the final 0.14 mi eased to 8:08/mi at 167 bpm.",
     "Knee/quad, per the monitoring rule: little pain on this run despite 299 ft of climbing (and the matching descent) over 3.14 mi, his first run after the half. No stride change or swelling reported, though neither was asked about directly.",
     "Zone boundaries as displayed on this Heart Rate screen when viewed Oct 2: Z1 <139, Z2 140-149, Z3 150-159, Z4 160-169, Z5 170+.",
     "Weather from the Fitness summary: 73 F, humidity 37%, sun icon, air quality index 34; mid-afternoon local time. Context for the heart rate, not a correction.",
   ],
   splits:[
     {mi:1, mins:8.117, hrAvg:147},
     {mi:2, mins:7.850, hrAvg:166},
     {mi:3, mins:7.617, hrAvg:166},
     {mi:3.14, mins:1.133, hrAvg:167},
   ]},
  // Two days before Block 1 opened: a 4.27 mi progression at home in Seattle, 9:04 / 8:47 /
  // 8:19 / 7:32 and a 6:55 closing 0.27 mi, at 140 bpm average with heart rate at or under 144
  // through mile 4 and 165 only in the finish. Two standing stops, about 30 s just after the
  // start and about 2 min at roughly 1.2 mi, during which HR fell to 104; `mins` is moving
  // time (35:38 against 38:14 elapsed). Kai's account: nervous about the knee and quad at the
  // start and a little pain early, fading as he warmed up and gained confidence, none at all by
  // the finish, and he felt great. Different shape from Sep 13 and Sep 19, where the pain came
  // at mile 6 and built -- noted for the PT visit, not read into. The stops, per Kai on Oct 5:
  // he ran into a neighbour and chatted, and he adjusted his shoes while stopped at a red
  // light. Neither was about the knee. Whether the early pain changed his stride is still
  // unanswered; the flag below stays as the export wrote it.
  // Splits, 140 avg, 168 spm and the 211 ft of gain are Apple's own from the Fitness screens;
  // an earlier derived-split version of this pull was superseded. 48 F, overcast, 95% humidity.
  {date:"2026-10-01", dist:4.27, mins:35.64, hrAvg:140, hrMax:169, cadenceAvg:168,
   elevGainFt:211, elev:"211 ft gain",
   note:"Started nervous about the knee and quad and felt a little pain early on. As he grew " +
        "more confident he began to accelerate, and he finished with no pain at all and felt " +
        "great. Two stops, about 30 s just after starting and about 2 min at roughly 1.2 mi: " +
        "ran into a neighbour and chatted, and adjusted his shoes at a red light. Neither " +
        "was about the knee. (Given Oct 5.)",
   flags:[
     "Knee/quad, per the monitoring rule: a little pain early in the run that faded as he warmed up and gained confidence, gone entirely by the finish. Kai did not say whether it changed his stride, or whether either stop was related to it. No swelling reported, but not asked about directly.",
     "Pain timing differs from the Sep 13 and Sep 19 episodes: those began around mile 6 and built with fatigue; this was early and resolved as the run went on, under increasing pace. Observation only -- one for the PT's review later in October.",
     "Heart rate stayed at 144 or below for miles 1-4 while pace came down from 9:04 to 7:32, reaching 165 only in the final 0.27 mi at 6:55/mi. Apple's estimated time in zone: Z1 14:48, Z2 14:34, Z3 0:55, Z4 1:30, Z5 0:00. Caveat: on a progression this short, HR lags each pace increase.",
     "Conditions differ sharply from the Sep 27 run: this was a 48 F overcast morning at 49 ft of gain per mile; Sep 27 was a 73 F sunny afternoon at about 95 ft per mile, on travel. Context for comparing their heart rates, not a correction.",
     "Cadence 168 spm (Apple) across a pace range from 9:04 to 6:55 -- consistent with the music-anchored fixed-cadence method.",
     "Apple effort rating 'Moderate'; average power 253 W. Weather from the Fitness summary: 48 F, humidity 95%, overcast, air quality index 52.",
   ],
   splits:[
     {mi:1, mins:9.067, hrAvg:129},
     {mi:2, mins:8.783, hrAvg:139},
     {mi:3, mins:8.317, hrAvg:142},
     {mi:4, mins:7.533, hrAvg:144},
     {mi:4.27, mins:1.900, hrAvg:165},
   ]},
  // Mon Oct 5, Block 1 week 1: unscheduled, since the plan has nothing on this Monday. A 4.02 mi
  // progression, 8:51 / 8:27 / 8:06 / 7:30, at 154 bpm average and mostly Zone 3-4 by Apple's
  // estimate. It is the third run since the half and the third to close at tempo pace or faster,
  // which is why Tuesday and Thursday in blocks.js were adjusted the same evening. 296 ft of gain
  // over the loop; per-mile elevation was not on the screens, so whether mile 4 ran downhill is
  // unconfirmed. Distance is HealthKit's 6467 m (4.019 mi) written as 4.02, which reproduces
  // Apple's 8:15/mi; Fitness shows 4.01 because it truncates. `mins` is moving time, 33:08
  // against 33:12 elapsed. Splits are Apple's own, transcribed; they sum to 33:03 against 33:08,
  // which is display rounding. The last split is Apple's measured 9 s fragment, which it shows at
  // 8:11/mi; at this resolution its pace cannot be recomputed from the rounded distance and time.
  // Weather showed 17 degrees with no unit (almost certainly Celsius), so no temperature is
  // entered. Kai's account arrived with the Oct 7 pulls (export-2026-10-07-1830b-corrects): no
  // pain whatsoever in the knee or the quad. It did not cover stride or swelling, and the
  // monitoring-rule flag below is that export's replacement, which says so. Whether mile 4 ran
  // downhill and whether music was on are still unanswered. Resting HR for Oct 5 settled at 76
  // over the full day, not the 71 the 19:47 pull showed; the last flag keeps the export's words.
  {date:"2026-10-05", dist:4.02, mins:33.14, hrAvg:154, hrMax:167, cadenceAvg:164,
   elevGainFt:296, elev:"296 ft gain",
   note:"No pain whatsoever in the knee or the quad. (Given Oct 7.)",
   flags:[
     "Unscheduled run on a Monday. If Tuesday's planned easy run also happens, the two are back-to-back.",
     "A progression: 8:51, 8:27, 8:06, 7:30, then the final 0.02 mi at 8:11/mi. Every full mile ran faster than Block 1's Easy band (9:30-10:15) and Group band (9:00-9:30); mile 4 sits at the fast edge of the Tempo band (7:30-7:51).",
     "Not an easy effort by heart rate: 154 avg, 167 max. Apple's time-in-zone estimate: Z1 1:06, Z2 4:17, Z3 15:21, Z4 7:20, Z5 0:00. Those total 28:04 of 33:08 -- the heart-rate graph is sparse for the first few minutes, so mile 1's 148 bpm rests on fewer samples than the others.",
     "Third run since the Sep 19 half, and the third to close at or faster than tempo effort: Sep 27's last full mile 7:37, Oct 1's mile 4 at 7:32 then a 6:55 close, this run's mile 4 at 7:30. Observation of a pattern only.",
     "Heart rate dips twice with no meaningful pause: early in mile 2 (about 19:01-19:03) and late in mile 4 (about 19:19-19:21), then climbs to 167 at the finish. That is consistent with descents on a loop carrying 296 ft of gain, but per-split elevation was not available, so whether mile 4's 7:30 included a descent is unconfirmed -- ask Kai.",
     "Hilly: 296 ft of gain over 4.02 mi, about 74 ft/mi -- similar to Sep 27's 299 ft over 3.14 mi.",
     "Zone boundaries as displayed on this Heart Rate screen on Oct 5: Z1 <138, Z2 139-148, Z3 149-159, Z4 160-169, Z5 170+. Apple has moved them down one beat from the Oct 2 view (Z1 <139, Z2 140-149) and two from the Aug 25 snapshot (Z1 <140, Z2 141-149): the Zone 2 ceiling is now 148.",
     "Cadence 164 spm average, just under the 165-170 band his music anchors (Oct 1: 168, Sep 27: 170). Whether music was on was not recorded. Observation only, not a target.",
     "Running dynamics (workout averages) of 9.83 cm / 261 ms / 1.21 m sit close to the Sep 19 race averages (9.8 cm / 252 ms / 1.2 m) at a similar average pace. Observation only.",
     "Knee/quad, per the monitoring rule: no pain reported on this run, which carried 296 ft of gain over 4.02 mi and a closing mile at 7:30/mi. Any change to his stride and any swelling were not addressed in his account -- unasked directly, not reported absent.",
     "Resting HR 85 on Sat Oct 3 and 80 on Sun Oct 4, back to 71 on Mon Oct 5. Context only.",
     "Apple effort rating 6, 'Moderate'; average power 258 W. Evening start around sunset, humidity 77%, air quality index 60. Temperature shown without a unit, so not entered.",
   ],
   splits:[
     {mi:1, mins:8.850, hrAvg:148},
     {mi:2, mins:8.450, hrAvg:153},
     {mi:3, mins:8.100, hrAvg:157},
     {mi:4, mins:7.500, hrAvg:157},
     {mi:4.02, mins:0.150, hrAvg:162},
   ]},
  // Wed Oct 7, Block 1 week 1: an easy 3.51 mi on the day blocks.js has strength, the day after
  // Tuesday's recovery run did not happen. 9:30 / 10:00 / 9:11 and 9:15/mi over the closing
  // 0.51 mi, 9:31/mi overall, at 139 bpm with heart rate flat across the splits -- Zone 2 by
  // average, and inside Block 1's Easy band (9:30-10:15). The fourth flag measures it against
  // the 10:00-10:30 baseline from the skill, which is older than that band; it stays as written.
  // Distance is HealthKit's 5646 m (3.508 mi) written as 3.51; Fitness shows 3.50 because it
  // truncates. `mins` is moving time, 33:24 against 36:58 elapsed: the ~3:35 gap is a pause near
  // the end to chat with a neighbour, per Kai. Splits are Apple's own, transcribed; the last is
  // Apple's measured 0.51 mi partial, not inferred. Built from export-2026-10-07-1830-corrects
  // (the full corrected row, replacing the 1817 row) with Kai's answers from 1837-corrects: its
  // cadence flag replaces 1830's, which read 160 spm as a drift with music unrecorded, and its
  // effort flag is added. Weather: sunny, 71% humidity, temperature shown as 18 with no unit
  // (almost certainly Celsius), so no temperature is entered.
  {date:"2026-10-07", dist:3.51, mins:33.4, hrAvg:139, hrMax:156, cadenceAvg:160,
   elevGainFt:151, elev:"151 ft gain",
   note:"Felt very easy. Ran to a 160 BPM playlist on purpose, to see whether he would notice " +
        "the difference. The pause near the end was to chat with a neighbour, after which he ran " +
        "the last 0.2 mi or so to reach 3.5 mi; with a long stop like that he may end the " +
        "workout next time rather than pause it. No pain whatsoever in the knee or the quad. " +
        "Effort rated 2, Easy. (Given Oct 7.)",
   flags:[
     "Easy by heart rate: 139 avg, 156 max. Apple's time-in-zone estimate: Z1 12:08, Z2 16:51, Z3 2:48, Z4 0:00, Z5 0:00 -- 28:59 of the 31:47 tracked sits in Z1-Z2 and nothing is above Z3. The 31:47 total is 1:36 short of the 33:23 workout time, so the heart-rate record is not complete.",
     "Pace 9:30, 10:00, 9:11, then 9:15/mi over the final 0.51 mi, 9:31/mi overall. Heart rate is flat across the splits (136, 141, 138, 136) with no upward drift. Mile 2 was the slowest split and carried the highest heart rate (141); per-split elevation was not available and the whole run had only 151 ft of gain, so whether mile 2 included a climb is unconfirmed.",
     "Cadence 160 spm equals the playlist's 160 BPM: a deliberate experiment, not a drift below the 165-170 band. Observation only, not a target.",
     "151 ft of gain over 3.51 mi, about 43 ft/mi -- flatter than Oct 5 (296 ft over 4.02 mi, about 74 ft/mi) and Sep 27 (299 ft over 3.14 mi, about 95 ft/mi).",
     "Against the 10:00-10:30/mi easy-pace band in the project baseline (calibrated to the old 142 bpm ceiling), this run averaged roughly 30-60 s/mi faster while staying inside the current Zone 2 ceiling of 148. One data point; whether the band is conservative is the consumer's call.",
     "Elapsed time is 0:36:58 against 0:33:23 workout time, so about 3:35 was not counted as moving. Per Kai, that was a pause near the very end of the run to chat with a neighbor, followed by about 0.2 mi more to reach 3.5 mi. A social stop, not a pain stop. The sparse heart-rate stretch the earlier row noted at roughly 17:28-17:31 is not covered by his account.",
     "Zone boundaries as displayed on this Heart Rate screen on Oct 7: Z1 under 138, Z2 139-148, Z3 149-159, Z4 160-169, Z5 170+. Identical to the Oct 5 view, so the HR_ZONES update flagged in the Oct 5 export still stands and nothing further has moved.",
     "Running dynamics (workout averages) of 9.34 cm / 285 ms / 1.05 m against 9.83 cm / 261 ms / 1.21 m on Oct 5, which was run about 76 s/mi faster. Ground contact lengthens and stride shortens at slower paces, so no read is made. No per-mile dynamics were pulled. Observation only.",
     "Knee/quad, per the monitoring rule: Kai reports no pain whatsoever in the knee or the quad on this run. Any change to his stride and any swelling were not addressed in his account -- unasked directly, not reported absent.",
     "Effort is Easy (2), set by Kai in Fitness. The first summary screenshot, taken before he changed it, showed Moderate.",
   ],
   splits:[
     {mi:1, mins:9.500, hrAvg:136},
     {mi:2, mins:10.000, hrAvg:141},
     {mi:3, mins:9.183, hrAvg:138},
     {mi:3.51, mins:4.700, hrAvg:136},
   ]},
];

// Non-running load — counted for training stress, excluded from pace analysis.
// Fields: date, kind, dist (mi), mins — hrAvg / hrMax / note optional.
window.CROSS_TRAINING = [
  {date:"2026-08-01", kind:"Cycling", dist:4.50, mins:19.3, note:"Replaced Sat tempo"},
  {date:"2026-08-01", kind:"Cycling", dist:2.68, mins:11.1, note:""},
  {date:"2026-08-09", kind:"Ruck", dist:4.17, mins:105.2, hrAvg:113, hrMax:151, note:"60+ lb pack · ~430 ft gain"},
  {date:"2026-08-10", kind:"Ruck", dist:4.06, mins:112.4, hrAvg:104, hrMax:149, note:"60+ lb pack · ~650 ft gain"},
  {date:"2026-08-22", kind:"Walking", dist:1.03, mins:20.24, hrAvg:123, hrMax:141, note:"Cool-down after the benchmark — recovery, not load"},
  // Saturday hike, 2h57m at 94 bpm average and 119 max -- aerobic time on feet, well
  // under any running zone. Logged here rather than in SEEDED_ACTUALS because it is
  // not a run and must stay out of pace analysis.
  //
  // The export files it as replacing "Week 5 Sat -- Tempo" and flags that the week's
  // tempo effort did not happen. Both are wrong: the Aug 23 rebuild removed the
  // Saturday tempos, week 5 runs Tue/Thu/Sun, and its tempo was Aug 25, which was
  // run. This hike displaced nothing and is added load on top of a complete week.
  // No elevation figure -- flightsClimbed returned inconsistent totals for the window.
  {date:"2026-08-29", kind:"Hiking", dist:7.25, mins:177.21, hrAvg:94, hrMax:119,
   note:"2h57m easy — added load, not a replacement for any session"},
  // Friday skating, two days before the Sep 13 long run. Only duration, distance and energy
  // were queried -- no HR, cadence or elevation -- because it is cross-training and outside
  // the running analysis. Worth more than a load line now: lateral hopping is exactly the
  // single-leg, side-to-side pattern the strength work targets, so this is a thing he already does.
  {date:"2026-09-11", kind:"Skating", dist:4.60, mins:35.11,
   note:"Cross-training — counts toward load, excluded from pace analysis"},
  // The walk to the start line on race morning. Over a mile, so it clears the 1.0 mi floor,
  // but it is a Walking workout and belongs here rather than in SEEDED_ACTUALS -- a 22:43/mi
  // "pace" in the pace analysis would be worse than useless. Logged because it is part of the
  // race-day record: he was on his feet for 23 minutes before the gun.
  {date:"2026-09-19", kind:"Walking", dist:1.02, mins:23.17,
   note:"Pre-race walk to the start — race-day record, not training load"},
  // The first strength session on the watch, four days after the race. HealthKit records the
  // type and the time, not the exercises; Kai says (Oct 5) it was a core, legs and upper-body
  // mix from Apple Fitness, not the PT's sheet. No distance, which is what a strength session
  // has, so the renderer shows minutes only.
  {date:"2026-09-23", kind:"Strength", mins:10.86, hrAvg:127, hrMax:150,
   note:"Strength training, 11 min — a core, legs and upper-body mix from Apple Fitness, not the PT's sheet"},
  {date:"2026-09-28", kind:"Walking", dist:0.91, mins:17.28, hrAvg:103, hrMax:117,
   note:"Recorded walk — cross-training only"},
];

// Daily resting heart rate, as reported by the exports. It is the cheapest recovery
// signal in the pipeline and until now the page threw it away, so the series starts
// where the exports start rather than where training did -- Aug 27 is the first pull
// that carried it, not the first day it was measured.
//
// A single reading says very little: this series moves 72 -> 80 -> 72 on consecutive
// days that held a run, a hike and nothing at all. What is worth reading is the level
// against the recent run of days, which is why the dashboard shows the latest figure
// beside a trailing median instead of a day-over-day delta.
window.RESTING_HR = [
  {date:"2026-08-27", bpm:72},
  {date:"2026-08-28", bpm:80},
  {date:"2026-08-29", bpm:72},
  {date:"2026-08-30", bpm:79},
  {date:"2026-08-31", bpm:80},
  // 86 is the high of the series, two days after the 10.18 mi long run and three after
  // the hike -- the 80 on Aug 31 is the morning-after reading. Resting HR still climbing
  // on day two is the ordinary shape of a hard weekend, not a warning on its own; what
  // makes it worth reading is that the Sep 1 tempo agrees with it.
  {date:"2026-09-01", bpm:86},
  // The spike resolves. Two days at 74 -- the lowest pair in the series -- and the
  // Sep 3 easy run agrees with them, so Sep 1's 86 was the weekend's load clearing
  // rather than the start of a hole. The Sep 3 export re-reported Aug 28 - Sep 1
  // unchanged, which is the first independent confirmation these readings are stable.
  {date:"2026-09-02", bpm:74},
  // 75, not the 74 first recorded here. The Sep 3 export pulled at 22:02 that evening,
  // before the day was over; the Sep 6 pull reports the settled figure. First time a
  // resting-HR reading has been revised, and the direction to prefer is the later pull --
  // Apple recomputes the day as more of it arrives.
  {date:"2026-09-03", bpm:75},
  {date:"2026-09-04", bpm:80},
  {date:"2026-09-05", bpm:80},
  // 72 on the morning of the peak long run, and the low of the series.
  {date:"2026-09-06", bpm:72},
  {date:"2026-09-07", bpm:74},
  // Sep 8 was held out of this series when it was first seen, on two grounds: the sample
  // spanned only 16:43-22:41 local, a partial evening overlapping a 22:00 run, and the day
  // was still in progress at the 23:19 pull, so the figure was provisional. The Sep 14 pull
  // returns the same 100 bpm six days later, which settles the provisional half -- this is
  // Apple's final answer for the day, not a value still being computed.
  //
  // So it goes in, annotated rather than suppressed. Excluding a twice-confirmed measurement
  // because it is inconvenient is the worse habit, and the partial-window caveat is an
  // interpretation, not grounds for deletion. Read it as what it is: an evening-only sample
  // taken across a hard run, not a resting measurement, and not evidence of illness or
  // overtraining. It costs the card nothing -- the trailing median reads 80 with or without
  // it -- which is exactly why there is no reason to hide it.
  {date:"2026-09-08", bpm:100},
  //
  // 85 the day after the Sep 8 goal-pace session, then 79. The same shape the series
  // showed after the Aug 30 long run -- 80 on the morning after, 86 on day two, back to
  // 74 by day three -- so a hard session costing a day or two of elevated resting HR is
  // this body's ordinary response, not a warning. What would be worth acting on is the
  // spike failing to clear, and it cleared.
  {date:"2026-09-09", bpm:85},
  // 80, not the 79 first recorded. The Sep 10 export pulled at 19:10 that evening, before the
  // day was done; the Sep 14 pull reports the settled figure. Same revision pattern as Sep 3,
  // and the direction to prefer is the later pull.
  {date:"2026-09-10", bpm:80},
  {date:"2026-09-11", bpm:72},
  // 89 on Sep 17, and it needs three caveats before it is read as anything.
  //
  // 1. It is the highest genuine reading in the series -- the prior high is 86 on Sep 1. The 100
  //    on Sep 8 is not the comparison; that one is an evening-only sample taken across a 10pm
  //    run and is annotated above as not a resting measurement.
  // 2. It is provisional. The pull ran at 21:40 Pacific with the day still going, which is
  //    exactly the shape that got revised on Sep 3 (74 -> 75) and Sep 10 (79 -> 80). Both moved
  //    up by one, so expect this to settle at 89-90 rather than to fall.
  // 3. There is a five-day hole in front of it. HealthKit returned nothing for Sep 12 or 13 (the
  //    Sep 14 export says so in `missing`), and no pull covered Sep 14-16 at all. So the last
  //    known value before this is the 72 on Sep 11 -- a series low -- and there is no way to tell
  //    whether 89 climbed gradually or arrived at once. That absence is why this is one question
  //    for Kai rather than a trend.
  //
  // What makes it worth raising at all is that it does not stand alone: the same day's easy run
  // came in six beats above the Sep 13 long run at matched pace. Kai's stressful-day-plus-coffee
  // read explains both, and it is his run to describe. The reason to ask anyway is that early
  // illness explains both identically, and two days before a race the two have different
  // answers. No pain and no swelling, so the monitoring rule is not engaged.
  // CORRECTED Sep 19, and the correction closes the question the block above left open.
  //
  // Sep 17 is 83, not 89. The 89 came from a pull that ran at 21:40 with the day still going,
  // and the note above predicted it would "settle at 89-90 rather than fall." It fell. That
  // prediction was wrong in the one direction it ruled out, which is worth keeping visible:
  // the two prior revisions (Sep 3, Sep 10) both moved up by one, and two samples was not a
  // rule. A provisional reading is provisional in both directions.
  //
  // The five-day hole in front of it is also mostly filled now -- Sep 14, 15 and 16 arrived
  // with the race-day pull. The series reads 72 (Sep 11) -> [12-13 still missing] -> 74, 69,
  // 79, 83, 84. So the 89 was never a spike, and 69 on Sep 15 is a series low sitting right
  // in the middle of what looked like a climb. Read as a whole this is an ordinary taper: low
  // mid-week, drifting up over the last two days before a 7am start, which is what pre-race
  // nights do to resting heart rate.
  //
  // That closes the illness question the Sep 17 note raised. It was worth asking at the time
  // -- early illness and a stressful day explain an elevated reading identically, and two days
  // out they have different answers -- but nothing materialised, the race was run, and Kai's
  // stress-plus-coffee read stands. No follow-up needed.
  {date:"2026-09-14", bpm:74},
  {date:"2026-09-15", bpm:69},
  {date:"2026-09-16", bpm:79},
  {date:"2026-09-17", bpm:83},
  {date:"2026-09-18", bpm:84},
  // Sep 20 onward, from the Oct 2 back-fill. 83 the morning after the race, then a settle into
  // the low 70s with a 66 on Sep 22 -- the series low -- and a 79-83 bump across Sep 23-25 that
  // lines up with the strength session and the travel week rather than with any run. Sep 25-28
  // came back from HealthKit as fractional daily averages and are rounded. 81 on Oct 1 is the
  // morning of the progression run; Oct 2 read 71 at a mid-day pull and is provisional, so it
  // is not entered.
  {date:"2026-09-20", bpm:83},
  {date:"2026-09-21", bpm:71},
  {date:"2026-09-22", bpm:66},
  {date:"2026-09-23", bpm:79},
  {date:"2026-09-24", bpm:83},
  {date:"2026-09-25", bpm:81},
  {date:"2026-09-26", bpm:78},
  {date:"2026-09-27", bpm:73},
  {date:"2026-09-28", bpm:74},
  {date:"2026-09-29", bpm:71},
  {date:"2026-09-30", bpm:72},
  {date:"2026-10-01", bpm:81},
  // Oct 2-4 from the Oct 5 pull, all complete days with no workout. Oct 2 is 72 for the full
  // day, against the provisional 71 the Oct 2 mid-day pull showed. 85 and 80 over the weekend
  // are the highest readings since race week, with no run or recorded workout on either day;
  // context, not a finding. Oct 5 read 71 at the 19:47 pull and is provisional, so not entered.
  {date:"2026-10-02", bpm:72},
  {date:"2026-10-03", bpm:85},
  {date:"2026-10-04", bpm:80},
  // Oct 5-6 from the Oct 7 pull, both complete days. Oct 5 settled at 76 over the full day
  // against the provisional 71 at the 19:47 pull -- the evening of the hard progression. Oct 6,
  // a day with no workout, is 72. Oct 7 was still running at the pull, so not entered.
  {date:"2026-10-05", bpm:76},
  {date:"2026-10-06", bpm:72},
];

// Daily heart-rate variability (SDNN, milliseconds), as reported by the exports. The pipeline
// has been carrying this since the Sep 19 pull and the page was throwing it away, which is the
// same thing that was true of resting HR before it got a card.
//
// Read it the way the resting-HR note says to read that: the level against the recent run of
// days, never a single reading. Day-to-day SDNN is noisy enough that one number means almost
// nothing, and Apple's overnight sampling window varies with how the watch was worn.
//
// The one figure here worth naming is Sep 18: 55.5 ms, against 17-20 for most of race week and
// a low of 13.2 on Sep 13 -- the night of the long run where the knee first hurt. A jump like
// that on the last day of a taper is the textbook parasympathetic rebound, and it is the
// clearest evidence in the dataset that the taper did its job. Sep 6 sat at 57.6 for the same
// reason, ahead of a rest day.
//
// No reading for Sep 12. Not estimated.
window.HRV = [
  {date:"2026-09-06", sdnnMs:57.6},
  {date:"2026-09-07", sdnnMs:28.4},
  {date:"2026-09-08", sdnnMs:11.6},
  {date:"2026-09-09", sdnnMs:29.5},
  {date:"2026-09-10", sdnnMs:26.0},
  {date:"2026-09-11", sdnnMs:26.2},
  {date:"2026-09-13", sdnnMs:13.2},
  {date:"2026-09-14", sdnnMs:18.5},
  {date:"2026-09-15", sdnnMs:28.9},
  {date:"2026-09-16", sdnnMs:17.4},
  {date:"2026-09-17", sdnnMs:19.7},
  {date:"2026-09-18", sdnnMs:55.5},
  // Sep 20 onward, from the Oct 2 pulls, carried in their notes because HRV has no schema
  // field. Back in the 20s after the race-eve 55.5, a 17.7 low on Sep 25 in the travel week,
  // and 41.4 on Oct 1. Oct 2 read 28.3 at a mid-day pull and is provisional, so not entered.
  {date:"2026-09-20", sdnnMs:29.5},
  {date:"2026-09-21", sdnnMs:25.8},
  {date:"2026-09-22", sdnnMs:30.9},
  {date:"2026-09-23", sdnnMs:28.7},
  {date:"2026-09-24", sdnnMs:26.0},
  {date:"2026-09-25", sdnnMs:17.7},
  {date:"2026-09-26", sdnnMs:21.8},
  {date:"2026-09-27", sdnnMs:22.1},
  {date:"2026-09-28", sdnnMs:27.9},
  {date:"2026-09-29", sdnnMs:27.6},
  {date:"2026-09-30", sdnnMs:21.8},
  {date:"2026-10-01", sdnnMs:41.4},
  // Oct 2-4 from the Oct 5 pull's notes. Oct 2 is 52.3 for the full day, where the mid-day pull
  // had shown 28.3 -- the clearest example yet of why a provisional reading stays out. The
  // weekend dip to 22.2 and 28.1 lines up with the resting-HR bump. Oct 5 read 39.8 at the
  // 19:47 pull and is provisional, so not entered.
  {date:"2026-10-02", sdnnMs:52.3},
  {date:"2026-10-03", sdnnMs:22.2},
  {date:"2026-10-04", sdnnMs:28.1},
  // Oct 5-6 from the Oct 7 pull's notes, both complete days. Oct 5 held at 39.8, the figure the
  // 19:47 pull had shown provisionally; Oct 6 is 34.6. No reading yet for Oct 7.
  {date:"2026-10-05", sdnnMs:39.8},
  {date:"2026-10-06", sdnnMs:34.6},
];
