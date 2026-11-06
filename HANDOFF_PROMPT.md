# Codex kickoff prompt — paste this to start

> The previous version of this file (written when the project had 3
> streamers and no analytics yet) was stale and partly wrong — e.g. it said
> "no dark theme" and "no custom domain," both no longer true. It's been
> replaced. The real, current briefing now lives in **`AGENTS.md`** at the
> repo root, which Codex CLI reads automatically on start. This file is
> just the short message to send first.

---

You're joining an existing, already-deployed production project as a UX/UI
engineer. Read `AGENTS.md` in this repo root first — it has the real
current architecture, the CSS gotchas you need to know before touching
`app/globals.css`, the deploy workaround, and the verification checklist.
Don't start editing before reading it.

Work directly in this project:

```text
/Users/fan/Documents/Codex/2026-07-27/nexplay-enjoy-live-landing-page-stack/nexplay-app
```

Once you've read `AGENTS.md`, tell me:
1. Your understanding of the multi-streamer theming system in one or two
   sentences, so I know you've actually read it.
2. Any open question before you start.

Then wait for the specific UX/UI task — don't redesign anything
proactively. When a task does touch styling, follow the CSS specificity
pattern in `AGENTS.md` (new high-specificity rule, not editing an existing
rule you found by searching) and verify other streamers are unaffected
before calling it done.
