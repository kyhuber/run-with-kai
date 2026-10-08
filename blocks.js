// Run with Kai — training blocks.
//
// Every block's plan lives here; index.html only renders. data.js loads first, so a block can read
// window.GOAL_PACE where the refactor brief says to (the Orca block does); later blocks carry their
// own goalPace, or null. One goal pace per block, and nowhere else.
//
// Shape of a block:
//   id            URL-safe name, used in the page's #block= hash
//   name          what the header shows after "Run with Kai ·"
//   focus         one line on what the block is for
//   start, end    Pacific dates, inclusive. Weeks are 7-day spans from start, the last clipped
//                 to end, so a block that starts on a Monday has Monday-to-Sunday weeks.
//   test          { date, label, distanceMi } — what the block ends in. Riegel projections target
//                 distanceMi, the countdown counts to date, and a logged run on that date
//                 covering 90% of the distance is the block's result.
//   goalPace      "m:ss" per mile, or null. Null means no goal lines, no bands and no projected
//                 finish — the page renders none of them rather than inventing a number.
//   paceZones     per-type pace bands for the plan's sessions, decimal min/mi (optional)
//   weekPhases    one label per week for the schedule headings (optional)
//   plan          sessions in the shape index.html has always used:
//                 {date, day, type, desc, dist, useGoal?, quality?, easyPace?, skipped?, meetingPoint?,
//                  adjusted?}
//                 Empty until Kai supplies the sessions; the page never invents workouts.
//                 `adjusted` is one line on why a session changed after the plan was written,
//                 starting with the date of the change. The page prints it under the session.
//   raceDayPlan   optional { openSec, segments:[...] }. Renders on the test day only, and only
//                 when the block has a goal pace, because every band is an offset from it.
//   archive       optional path to a frozen copy of the page as it stood when the block ended

window.BLOCKS = [
  {
    id:"orca-2026", name:"Orca Half",
    focus:"Eight weeks from a standing start to the Brooks Orca Half Marathon.",
    start:"2026-07-27", end:"2026-09-19",
    test:{date:"2026-09-19", label:"Orca Half Marathon", distanceMi:13.10938},
    // The brief has this block read its goal from data.js, where it was set from the Aug 22
    // benchmark. Reset it there, not here.
    goalPace: window.GOAL_PACE || null,
    // Easy was 8:50-9:20, which is not easy: it sits ~20 bpm above the true Zone 2
    // anchor of 10:00-10:30 at 136-142 bpm, so following it turned every recovery
    // day into a tempo day and left the aerobic base with nothing to grow on.
    // Reset again on Aug 27 from 10:00-10:30 to 9:30-10:15. That anchor was set at
    // 136-142 bpm; the Aug 27 run held 9:45/mi at 142 and 9:33/mi average at 144,
    // so the old band now reads a legitimate Zone 2 effort as too fast on pace
    // while the heart rate says otherwise. The band is what moved, not the effort:
    // easy days are still judged on HR, and Zone 2 remains the actual target.
    // Long stays 8:40-9:10 -- roughly 60-90 s/mi slower than goal pace, which is
    // where a long run belongs.
    paceZones:{
      Easy:[9.5,10.25], Group:[9.0,9.5], Tempo:[7.667,7.917],
      Long:[8.667,9.167], Interval:[6.917,7.333]
    },
    weekPhases:["Rebuild", "Rebuild", "Build", "Benchmark", "Peak build", "Peak", "Taper begins", "Race week"],
    plan:[
      {date:"2026-07-28", day:"Tue", type:"Easy", desc:"Easy run", dist:3},
      {date:"2026-07-30", day:"Thu", type:"Group", desc:"Group run — fixed pace, 5K", dist:3.1},
      {date:"2026-08-01", day:"Sat", type:"Tempo", desc:"1mi WU + 2mi tempo + 1mi CD", dist:4},
      {date:"2026-08-02", day:"Sun", type:"Long", desc:"Long run, easy pace", dist:6},
      {date:"2026-08-04", day:"Tue", type:"Interval", desc:"1mi WU + 6×400m + 1mi CD", dist:4.75},
      {date:"2026-08-06", day:"Thu", type:"Group", desc:"Group run — fixed pace, 5K", dist:3.1},
      {date:"2026-08-08", day:"Sat", type:"Tempo", desc:"1mi WU + 2mi tempo + 1mi CD", dist:4},
      {date:"2026-08-09", day:"Sun", type:"Long", desc:"Long run, easy pace", dist:7},
      {date:"2026-08-11", day:"Tue", type:"Interval", desc:"1mi WU + 5×800m + 1mi CD", dist:6},
      {date:"2026-08-13", day:"Thu", type:"Group", desc:"Group run — fixed pace, 5K", dist:3.1},
      {date:"2026-08-15", day:"Sat", type:"Tempo", desc:"1mi WU + 3mi tempo + 1mi CD", dist:5},
      {date:"2026-08-16", day:"Sun", type:"Long", desc:"Long run, last 2mi @ goal pace", dist:8},
      {date:"2026-08-17", day:"Mon", type:"Rest", desc:"Rest — recovery from 9 mi Sunday", dist:0},
      {date:"2026-08-18", day:"Tue", type:"Easy", desc:"Easy run — conversational, no pace targets", dist:4},
      {date:"2026-08-20", day:"Thu", type:"Interval", desc:"Sharpener: 1mi WU + 4×400m @ 10K effort + 1mi CD", dist:3.5},
      {date:"2026-08-22", day:"Sat", type:"Benchmark", desc:"10K time trial — flat out-and-back, morning", dist:6.2},
      {date:"2026-08-23", day:"Sun", type:"Long", desc:"Long run — flat, steady effort (decoupling test)", dist:7.5},
    // Weeks 5-7 rebuilt Aug 23, after the benchmark. The original build asked for
    // 26.1 mi in week 5 against the 14.09 actually run in week 4 -- an 85% jump,
    // and the ramp rate is the injury Kai is most exposed to. It also carried
    // three hard sessions a week, including a 4mi tempo the day before the long
    // run. The benchmark settled that speed is not the limiter (7:07/mi for the
    // closing 3.01 mi, alone, in direct sun); untested endurance is. So: the
    // Saturday tempos are gone, 1-mile repeats become goal-pace work at the pace
    // actually being trained for, and the freed volume goes to genuinely easy
    // aerobic miles. Long runs are untouched -- they are the point.
    // 53.6 mi across W5-W7 against the 73.8 originally planned.
      // No band of its own: this session was written before the floor idea existed and
      // is judged on the plain useGoal range it was actually set under. The `quality`
      // block is only what lets the page score the two goal-pace miles instead of the
      // four-mile average -- 8:27 / 6:54 / 6:37 / 8:57 averages to a textbook 7:45.
      {date:"2026-08-25", day:"Tue", type:"Tempo", desc:"1mi WU + 2mi @ goal pace + 1mi CD", dist:4, useGoal:true,
       quality:{dist:2, where:"middle"}},
      {date:"2026-08-27", day:"Thu", type:"Easy", desc:"Easy run — solo, no group. True Zone 2, hold back.", dist:4},
      // The closing 2 mi carry their own band. Two things meet on this run: it is
      // the longest of the cycle, and the last time goal pace was asked for
      // (Aug 25) it came back 55 s/mi hot with 8:49 spent above 170 bpm. Finishing
      // surges are a standing pattern -- last year's Orca closed with a 6:58 mile.
      // The whole-run target cannot say this: 8 easy miles and 2 at goal pace
      // average to a number that describes neither. Offsets are seconds per mile
      // against GOAL_PACE so the band follows the goal and no pace is written twice.
      {date:"2026-08-30", day:"Sun", type:"Long", desc:"Long run — last 2mi @ goal pace, not faster", dist:10,
       quality:{dist:2, where:"last", slowestSec:8, fastestSec:-7}},
      {date:"2026-09-01", day:"Tue", type:"Tempo", desc:"1mi WU + 3mi @ goal pace + 1mi CD", dist:5, useGoal:true,
       quality:{dist:3, where:"middle"}},
      {date:"2026-09-03", day:"Thu", type:"Easy", desc:"Easy run — solo, no group. True Zone 2, hold back.", dist:4},
      // The hardest session in the plan: three goal-pace miles with five still to run
      // after them, at the top of the volume curve. Distance is unchanged -- Aug 30
      // returned eight miles at 9:02/mi with no cardiac drift at all, which is the
      // evidence for going to 11.5, and long runs are what this block is for.
      //
      // What changes is the band. Sep 1 asked for goal pace under the plain range and
      // came back 12 s/mi slow at 166-170 bpm, two days after the long run; Aug 25
      // asked the same way and came back 55 s/mi fast. The band that has actually
      // held is Aug 30's -- a slow edge to aim at and a floor to stop the surge --
      // so it carries over here, where the miles land mid-run and there is a lot of
      // running left to pay for them.
      // startMi pins the effort to miles 6-8. "Middle 3" left the one decision that
      // actually shapes the run -- when to start -- to be made while running it. Five
      // easy miles first puts the block about 45 minutes in, which is close to where
      // mile 6 of the race falls at goal pace, and leaves 3.5 miles to run afterwards.
      // Those 3.5 are the point: finishing easy after a hard effort is the habit Kai
      // does not have, and a block at the end would just be a fitness test he kicks.
      //
      // easyPace bands everything outside the effort. Without it the only pace on the
      // card is the Long zone for the whole run, which is an average across three miles
      // at 7:46 and eight at 9:15 and describes neither. Slightly easier than Aug 30's
      // 9:02 because there is a goal-pace block coming and miles to run after it.
      //
      // startMi is instruction, not scoring: qualitySegment still finds the effort as
      // the fastest contiguous block, so running it at miles 7-9 still reads correctly.
      {date:"2026-09-06", day:"Sun", type:"Long", desc:"Peak long run, goal pace at miles 6-8", dist:11.5,
       quality:{dist:3, where:"middle", startMi:6, slowestSec:8, fastestSec:-7},
       easyPace:[9.0, 9.75]},
      // 4x800m at goal pace is the wrong session for the limiter. Speed was settled by
      // the Aug 22 benchmark -- 7:21/mi for six miles, alone, in direct sun -- and repeats
      // with recovery between them train precisely the thing that is not the problem.
      // What is unsettled is holding a pace. Four goal-pace attempts this cycle have
      // produced one clean execution: Aug 30's two miles. Aug 25 ran 55 s/mi too fast,
      // Sep 1 came back 12 s/mi slow with a 6:39 stop through the middle of it, and Sep 6
      // was taken by an unplanned climb before it started.
      //
      // So: two continuous miles, the distance he has actually executed, eleven days out.
      // It is less total stress than four 800s at the same pace with rest between them,
      // it rehearses the one thing race day asks for, and it is a session he can win --
      // which counts, because pacing confidence is as much the limiter as the legs are.
      // It carries the Aug 30 band and floor rather than the plain useGoal range that
      // Aug 25 and Sep 1 were both set under and both missed.
      {date:"2026-09-08", day:"Tue", type:"Tempo", desc:"1mi WU + 2mi @ goal pace + 1mi CD", dist:4,
       quality:{dist:2, where:"middle", startMi:2, slowestSec:8, fastestSec:-7},
       easyPace:[9.0, 9.75]},
      // Thursdays name the session and say nothing about the company. The Westies meet
      // Thursday or Sunday, Kai rarely knows which until the week is on him, and Sep 3
      // he ran alone on a scheduling conflict -- so whether a run is solo or with the
      // club is not a property the plan can know in advance, and not one it needs. The
      // run gets recorded either way. What the old Group type did was worse than
      // guessing: it scored the day against 3.1 mi at 9:00-9:30, which would have
      // called Sep 3's well-run 4.02 at 9:58 and 141 bpm a miss.
      {date:"2026-09-10", day:"Thu", type:"Easy", desc:"Easy run — true Zone 2, hold back", dist:3.1},
      // Same shape as Aug 30, which is the one goal-pace session that has held its band,
      // so it carries the same floor.
      //
      // Flat and familiar is now part of the session, not a nicety. This is the last
      // rehearsal before the race, and the last two long runs have both had their
      // quality taken by something outside the plan -- a watch that stopped recording
      // on Sep 1, an unfamiliar path that climbed on Sep 6. Neither was a fitness
      // problem and both cost the session anyway. Six days out there is no time to
      // spend on a third.
      {date:"2026-09-13", day:"Sun", type:"Long", desc:"Long run, last 2mi @ goal pace — flat, familiar route", dist:8,
       quality:{dist:2, where:"last", slowestSec:8, fastestSec:-7},
       easyPace:[9.0, 9.75]},
    // Race week as modified after the Sep 15 PT visit. Nothing about the running changes --
    // no distance, type or session moves -- because the plan already had Tue and Wed as rest,
    // which happens to give the quad the recovery it needs before it works again.
    // What changes is what he does on the runs that were already there: foam roll first, then
    // two cues -- knee steered straight ahead, and the landing absorbed rather than stiff. The
    // Sep 13 in-run fix was foot-strike, and both Kai and the PT read that as the wrong focus;
    // it pulled attention off the thing that needed correcting, and foot strike still is not
    // his to manage.
    //
    // This said "one cue, not two" until Sep 17, which was right for as long as the verbal
    // summary of the Sep 15 visit was all there was. Her written follow-up that evening added
    // the second cue. Two parts, both hers.
      // Not run. Kai was in pain and used the day to get in front of his PT instead --
      // which is the monitoring rule working exactly as written, not a lapse. The visit
      // is what produced the cue the rest of this week runs on.
      {date:"2026-09-14", day:"Mon", type:"Easy", desc:"Easy run", dist:3,
       skipped:"Rested and saw the PT — the right call"},
      // Same reasoning as week 7, and it matters more here: the last run before a race
      // should not be contingent on anyone else.
      // Strides are neuromuscular priming, not a workout: four 20-second pickups two
      // days out let him feel race pace on fresh legs at a cost of about 80 seconds of
      // running. They are also the last time he touches that pace before the start.
      // Unchanged in distance and structure, and now also the dress rehearsal: it is the only
      // run between the PT visit and the race, so it is the one chance to find out whether the
      // cue survives the strides, when effort and cadence rise. Also the day to taste the gel --
      // for tolerance, not fatigue, which 3.1 easy miles will not produce.
      // Run, and logged: 3.14 mi at 9:16/mi. No knee pain, which is the answer that mattered.
      // The export describes the cue as knee tracking alone, so whether the soft-landing half
      // got rehearsed is unconfirmed -- see the run note in data.js.
      {date:"2026-09-17", day:"Thu", type:"Easy",
       desc:"Shakeout — foam roll first, easy and short, then 4×20s strides at race pace. Rehearse both cues — knee straight, landing soft; test the race gel.", dist:3.1},
      {date:"2026-09-18", day:"Fri", type:"Rest", desc:"Rest — main carb-loading day, spread across meals", dist:0},
      {date:"2026-09-19", day:"Sat", type:"Race", desc:"🏁 ORCA HALF MARATHON — 7am start. Foam roll in warmup, both cues all day: knee straight, landing soft.", dist:13.1, useGoal:true},
    ],
    // Segment boundaries in miles; the labels are written per unit because
    // "Mile 1" and "the first 1.6 km" are different idioms, not a conversion.
    // Race pacing, as segments with their own bands rather than one number for 13.1 mi.
    // Offsets are seconds against GOAL_PACE, so the whole plan moves if the goal is reset
    // and no pace is ever written twice.
    //
    // Not even pace, deliberately, and for three reasons that are all in the data:
    //
    //   The opening miles climb. Holding goal PACE up a grade means spending more than
    //   goal EFFORT to do it, and buying 20 seconds there costs minutes after mile 10.
    //
    //   Going out fast is his documented failure. Aug 25 asked for goal pace and came
    //   back 55 s/mi quicker, and a start line with adrenaline and a training partner on
    //   it is a stronger pull than a solo Tuesday evening.
    //
    //   Closing hard is his documented strength. Last year's Orca, untrained, negative
    //   split and finished with a 6:58 mile off an 8:30 average; Aug 30 ran mile 9 in
    //   7:33 off eight easy miles. A plan that leaves something for the last 5K is
    //   playing to the thing he actually does.
    //
    // The bands average out to GOAL_PACE across the distance, so this is a redistribution
    // of the same effort, not a slower race.
    //
    // `from`/`to` are the mile markers each segment covers, added Sep 19 so the result card
    // can score the race against these same bands without re-stating them. `to:99` on the
    // closing segment catches the fractional final split whatever the watch measured.
    raceDayPlan:{openSec:8, segments:[
      {mi:"Miles 1–2", km:"First 3.2 km", head:"let the hill have them",
       from:1, to:2, slowSec:18, fastSec:8,
       body:"The only climbing of the day. Run it by effort and let the pace be what it is — "
          + "this is the one place where being slower than goal is the plan working, not failing. "
          + "If mile 1 comes up under {fastest}, you have made the classic mistake: ease off now. "
          + "You cannot bank time in a half, you can only borrow it at a terrible rate."},
      {mi:"Miles 3–6", km:"3.2–9.7 km", head:"settle onto {goal}",
       from:3, to:6, slowSec:3, fastSec:0,
       body:"Flat from here. Find the pace and let it feel almost easy — three or four words at a "
          + "time, not a sentence. Heart rate should sit in the low-to-mid 160s. If you are at "
          + "{hot} bpm by mile 5, you are ahead of yourself: give back 5–10 sec/mi and take it later."},
      {mi:"Miles 7–10", km:"9.7–16.1 km", head:"the honest stretch",
       from:7, to:10, slowSec:0, fastSec:-4,
       body:"This is where it starts costing, and where the race is actually decided. Hold the "
          + "pace, don't chase it. Every mile here past the eighth is longer than any goal-pace "
          + "effort you have run in training."},
      // Softened Sep 15. "Now you empty it" was written before the Sep 13 knee pain and the
      // PT visit that followed, and it sat badly beside a card that now says the default is to
      // finish. The closing speed is real and worth naming -- but it is conditional on the knee
      // being quiet, and the honest version says so rather than making the last two miles a test
      // of nerve. Goal framing is unchanged: solid effort, feel good. The clock was never the point.
      {mi:"Miles 11–13.1", km:"16.1–21.1 km", head:"spend what is left",
       from:11, to:99, slowSec:-4, fastSec:-12,
       body:"If the knee has stayed quiet, this is where you spend it — you have closed hard in "
          + "every genuine effort on record, a 6:58 final mile here last year and 7:33 for mile 9 "
          + "off eight miles on Aug 30. If it has not, let go of the number instead and run it in. "
          + "Finishing this one well is the whole goal; the time is not."},
    ]},
    archive:"orca-2026/",
  },
  {
    id:"speed-2026", name:"Speed block",
    focus:"5K speed on the Orca base, with the long run kept through the block.",
    start:"2026-10-03", end:"2026-11-15",
    // Confirmed by Kai on Oct 1: a time trial on the block's last day. He may register for a
    // named race later, in which case label and date move here.
    test:{date:"2026-11-15", label:"5K time trial", distanceMi:3.10686},
    goalPace:null,
    // Bands for the plan's session types, decimal min/mi. Easy and Long are the Orca block's
    // Zone 2 calibration, with Long eased 20 s/mi because the block starts off a race and a quad
    // episode; heart rate at or under Apple's Zone 2 ceiling (HR_ZONES in index.html, 148 as of
    // Oct 5) stays the real test of an easy day, and the page prints it on every upcoming easy
    // and long run. Interval and
    // Tempo are effort bands, not a goal: the two benchmarks project a 5K between 21:57 (from
    // the Aug 22 10K) and 23:02 (from the Orca half over 13.1 mi, with the walk inside it), so
    // 5K effort sits at 7:00-7:24/mi and 10K effort at 7:30-7:51. They move if the first
    // interval session says they should.
    paceZones:{
      Easy:[9.5,10.25], Group:[9.0,9.5], Long:[9.0,9.75],
      Tempo:[7.5,7.85], Interval:[7.0,7.4]
    },
    weekPhases:["Rebuild", "Rebuild", "Build", "Build", "Peak", "Sharpen", "Test week"],
    // Drafted Oct 5 by Claude Code from the skill's principles and the run log, for Kai to approve
    // or edit: 3-4 runs a week, Tuesday quality, Thursday easy with the club run substituting
    // when it falls there, an optional short Saturday, a Sunday long run that climbs 5-6-7-8 and
    // then backs off, and strength twice a week on Monday and Wednesday -- never the day of or
    // the day before the long run. Nothing is scheduled on Oct 3-4, which were already past when
    // the plan was written. The weeks run Saturday to Friday because the block starts on a
    // Saturday. The PT visit later in October outranks any of this; until then the ramp stays
    // conservative and every run carries the cue.
    //
    // Adjusted Oct 5 after an unscheduled Monday run (4.02 mi, 154 bpm, closing at 7:30), the
    // third run since the half to finish at tempo pace or faster. Tuesday becomes a pure recovery
    // run, its strides move to Thursday, and the first long run asks for an even finish. Week 1
    // is now Mon/Tue/Thu, about 10.5 mi if all three happen, against 7.4 in the Saturday-to-Friday
    // week before it (Sep 27 and Oct 1); still well inside what the Orca block built, and the
    // long-run check is not in play this week.
    plan:[
      // Week 1 (Oct 3-9) — Rebuild. Two runs: the block opens mid-week.
      {date:"2026-10-06", day:"Tue", type:"Easy", desc:"Recovery run — the slowest run of the week, conversational the whole way. If heart rate won't stay in Zone 2, slow down or walk a minute. Foam roll first; cue on.", dist:3,
       adjusted:"Changed Oct 5: strides moved to Thursday, because Monday's unplanned run already closed at 7:30. Skip today if the knee or quad hurts in a way that changes your stride, or if there's any swelling.",
       // The Oct 7 pull shows no workout on Oct 6. Kai gave no reason, so none is written; the
       // line only says where the easy run went, so the row does not read as a bare "Missed".
       skipped:"No run Tuesday. An easy 3.5 mi followed on Wednesday, logged below."},
      {date:"2026-10-07", day:"Wed", type:"Strength", desc:"Strength — 20-30 min of the single-leg base from the PT's sheet (bridges, single-leg squats, lateral lunges, balance, hops)", dist:0},
      {date:"2026-10-08", day:"Thu", type:"Easy", desc:"Easy run + 4×20 s strides — true Zone 2, hold back, then four relaxed pickups on flat ground with a full walk back between. Club run substitutes if it falls on Thursday; skip the strides then", dist:3.5,
       adjusted:"Changed Oct 5: the strides moved here from Tuesday."},
      // Week 2 (Oct 10-16) — Rebuild. First long run of the block and the first reps.
      {date:"2026-10-10", day:"Sat", type:"Easy", desc:"Easy run, short — the optional fourth day. Skip it if the legs say so", dist:3},
      {date:"2026-10-11", day:"Sun", type:"Long", desc:"Long run, easy — flat and familiar, even pace to the end with no fast finish. Carry a gel and use it around 40 min, as on race day", dist:5,
       adjusted:"Changed Oct 5: 'no fast finish' added. All three runs since the half closed at tempo pace or faster."},
      {date:"2026-10-12", day:"Mon", type:"Strength", desc:"Strength — single-leg base, 20-30 min", dist:0},
      {date:"2026-10-13", day:"Tue", type:"Interval", desc:"1 mi WU + 6×400 m at 5K effort (90 s easy jog between) + 1 mi CD — hard but controlled, solo is fine", dist:4},
      {date:"2026-10-14", day:"Wed", type:"Strength", desc:"Strength — single-leg base, 20-30 min", dist:0},
      {date:"2026-10-15", day:"Thu", type:"Easy", desc:"Easy run — true Zone 2, hold back. Club run substitutes", dist:4},
      // Week 3 (Oct 17-23) — Build.
      {date:"2026-10-17", day:"Sat", type:"Easy", desc:"Easy run, short + 4×20 s strides — optional", dist:3},
      {date:"2026-10-18", day:"Sun", type:"Long", desc:"Long run, easy — flat and familiar, finish easy rather than kicking", dist:6},
      {date:"2026-10-19", day:"Mon", type:"Strength", desc:"Strength — single-leg base, 20-30 min", dist:0},
      {date:"2026-10-20", day:"Tue", type:"Interval", desc:"1 mi WU + 5×600 m at 5K effort (2 min easy jog between) + 1 mi CD", dist:4.5},
      {date:"2026-10-21", day:"Wed", type:"Strength", desc:"Strength — single-leg base, 20-30 min", dist:0},
      {date:"2026-10-22", day:"Thu", type:"Easy", desc:"Easy run — true Zone 2, hold back. Club run substitutes", dist:4},
      // Week 4 (Oct 24-30) — Build. The PT visit is expected around here: nothing novel this week,
      // and whatever she says replaces what follows.
      {date:"2026-10-24", day:"Sat", type:"Easy", desc:"Easy run, short — optional", dist:3},
      {date:"2026-10-25", day:"Sun", type:"Long", desc:"Long run, easy — flat and familiar, finish easy; gel around 40 min", dist:7},
      {date:"2026-10-26", day:"Mon", type:"Strength", desc:"Strength — single-leg base, 20-30 min", dist:0},
      {date:"2026-10-27", day:"Tue", type:"Tempo", desc:"1 mi WU + 2 mi at 10K effort (steady and even, not a race) + 1 mi CD", dist:4},
      {date:"2026-10-28", day:"Wed", type:"Strength", desc:"Strength — single-leg base, 20-30 min", dist:0},
      {date:"2026-10-29", day:"Thu", type:"Easy", desc:"Easy run — true Zone 2, hold back. Club run substitutes", dist:4},
      // Week 5 (Oct 31-Nov 6) — Peak. The longest run of the block and the longest reps.
      {date:"2026-10-31", day:"Sat", type:"Easy", desc:"Easy run, short + 4×20 s strides — optional", dist:3},
      {date:"2026-11-01", day:"Sun", type:"Long", desc:"Long run, easy — the longest of the block. Flat, familiar, fuelled; finish easy", dist:8},
      {date:"2026-11-02", day:"Mon", type:"Strength", desc:"Strength — single-leg base, 20-30 min", dist:0},
      {date:"2026-11-03", day:"Tue", type:"Interval", desc:"1 mi WU + 4×800 m at 5K effort (2 min easy jog between) + 1 mi CD — even reps, the last no faster than the first", dist:4.5},
      {date:"2026-11-04", day:"Wed", type:"Strength", desc:"Strength — single-leg base, 20-30 min", dist:0},
      {date:"2026-11-05", day:"Thu", type:"Easy", desc:"Easy run — true Zone 2, hold back. Club run substitutes", dist:4},
      // Week 6 (Nov 7-13) — Sharpen. Volume comes down; one short, quick session to stay sharp.
      {date:"2026-11-07", day:"Sat", type:"Easy", desc:"Easy run, short — optional", dist:3},
      {date:"2026-11-08", day:"Sun", type:"Long", desc:"Long run, easy — shorter on purpose; the taper starts here", dist:6},
      {date:"2026-11-09", day:"Mon", type:"Strength", desc:"Strength — last loaded session before the test; nothing new, nothing heavy", dist:0},
      {date:"2026-11-10", day:"Tue", type:"Interval", desc:"1 mi WU + 4×400 m at 5K effort (full recovery between) + 1 mi CD — sharpen, don't dig", dist:3.5},
      {date:"2026-11-12", day:"Thu", type:"Easy", desc:"Easy run, short — nothing hard. Club run only if it stays easy", dist:3},
      // Week 7 (Nov 14-15) — Test week: the two days the block ends on.
      {date:"2026-11-14", day:"Sat", type:"Easy", desc:"Shakeout — 2 mi easy + 4×20 s strides at 5K effort. Foam roll first", dist:2},
      {date:"2026-11-15", day:"Sun", type:"Benchmark", desc:"5K time trial — flat and measured, all-out but even: settle in the first half mile, hold, then close. Foam roll first, cue on, music on", dist:3.1},
    ],
  },
];
