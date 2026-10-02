# Audit — 2026-10-02 (Tier A gate)

> Scope note: this audit covered the Samuel app as of the morning of
> 2026-10-02. The 1 & 2 Kings expansion merged the same day was not in
> scope; the fixes below were re-applied and re-verified on top of it.

Two agents audited the app ahead of its public Tier A promotion:
**uiux-auditor** (hands-on browser audit, light/dark, desktop/phone,
~45 screenshots) and **rjs-auditor** (line-by-line read of all 13 js/
modules + sw.js + index.html, top findings verified by running code).
Every finding below was fixed the same day and re-verified in-browser;
the Resolution column says how.

## Verdicts as delivered

- **rjs-auditor:** "Promote after one small P1 fix. No P0s. The
  codebase is unusually disciplined for a zero-build app."
- **uiux-auditor:** "High-craft work… not ready for Tier A yet: the
  map's core advertised interaction — tap a place — is silently broken
  for mouse and touch, and the dark-mode active tab is near-illegible.
  Fix the one P0 and the first two P1s and I'd promote it without
  hesitation."

## Code findings (rjs-auditor)

| # | Sev | Finding | Resolution |
|---|-----|---------|------------|
| 1 | P1 | Journey game keyed correctness to hidden stop index; journeys revisiting a place (Absalom's revolt: Jerusalem twice) made a perfect run a coin flip | Clicks now match by place (`game.js`); full Absalom route played: 5 locks, 0 missteps |
| 2 | P2 | Rephaim grove wind timers kept rescheduling against detached DOM after leaving the view | `windOn`/`windOff` bail when the grove is out of the document |
| 3 | P2 | 60% of family-tree verse chips dead — only "1 Samuel N" linked | `refChip`/`mentionRefChip` match `[12] Samuel N` and pass the book; all 5 of David's 2 Samuel chips verified navigating |
| 4 | P2 | Repeated journey stops stacked map milestones invisibly | Repeats share one badge labeled with every stop number ("1·5"), type scaled to fit |
| 5 | P2 | Copy drift: Characters/Timeline/Map/Quest said "1 Samuel" over two-book content | All headings, intros, subtitles and the map filter relabeled "1 & 2 Samuel" / "both books" |
| 6 | P2 | `MapView.focus()` queued forever when location data never loaded | Focus request dropped instead of queued once init ran without markers |
| 7 | P2 | Family-tree drag released outside the box could eat the next click | `moved` flag cleared on drag end a tick later |

## UI/UX findings (uiux-auditor)

| # | Sev | Finding | Resolution |
|---|-----|---------|------------|
| 1 | P0 | Map markers unselectable by mouse/touch: `setPointerCapture` retargeted clicks to the svg, so marker listeners never fired (keyboard worked, masking it) | Capture-phase hit-test on the svg: topmost visible **dot** under the point wins, else nearest hit-pad; verified Ramah/Gibeon/Jerusalem/Hebron by mouse and a 12px near-miss touch tap |
| 2 | P1 | Dark-mode active tab 2.12:1 (hardcoded light text on lightened accent) | Dark ink `#16202e` on the active pill — measured 7.34:1 |
| 3 | P1 | Light-mode muted text 3.96:1 | `--muted` darkened to `#6e6049` — measured 5.34:1 |
| 4 | P1 | Gold small text on parchment 3.09:1 (era badge, historian-note heading) | New `--gold-text` token (`#8a6a10` light, bright gold dark) — measured 4.81:1 |
| 5 | P1 | More "1 Samuel" copy drift (quest subtitle, mode card) | Fixed with code finding #5 |
| 6 | P1 | Mobile tap targets under floor: ~8px map dots, 22px chips | Invisible ~44px hit-pads on every marker (zoom-compensated); chip padding raised (31px desktop, ≥32px coarse-pointer); near-miss touch tap verified |
| 7 | P2 | Family-tree keyboard focus invisible (`outline:none`) | Gold `:focus-visible` outline on nodes |
| 8 | P2 | Tabs had no state semantics | `aria-current="page"` set on the active tab |
| 9 | P2 | Phone: Journeys legend below the fold | Journey toggle chips above the map at phone width, synced with the legend |
| 10 | P2 | Region/sea label contrast (1.99–2.44:1) | Region ink opacity .55→.75 (light) /.6 (dark); dedicated sea-label ink both themes |
| 11 | P2 | Story heading order skipped H2→H4 | All story-panel H4s are H3s |
| 12 | P2 | Sub-44px secondary controls | `(pointer: coarse)` padding bump for tabs/chips; zoom buttons 44px on touch |

## What both audits said to keep

Fault isolation that survives storage being disabled; universal
escaping before every innerHTML sink (no XSS path); the `chapters: []`
convention preventing wrong cross-book links; rAF-batched zoom
dynamics with keyed label re-layout; Voices' re-attach design; the
https/localhost-guarded service worker keeping file:// intact; designed
(not inverted) dark mode; double reduced-motion handling; keyboard
depth; the numbered-badge ↔ numbered-list journey pairing.

## Post-fix verification

Zero console/page errors across desktop and touch contexts; zero
visible label overlaps at every zoom tier; contrast measured at the
values above; the full Absalom journey played clean. 39 location
markers clickable by mouse, touch, and keyboard.
