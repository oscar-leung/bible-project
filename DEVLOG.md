# Dev Log — The Bible Project (Book of Samuel)

A running log of how this app is being built, session by session, so the
continuous improvements are visible. Newest entries at the bottom.

## 2026-09-04 — Session 1: 1 Samuel, built by a team of agents

**Team:** 3 developers, 1 historian, 1 game developer, 1 QA engineer — each an
agent working in parallel against a shared contract (`ARCHITECTURE.md`), plus a
lead coordinating and integrating.

### Phase 1 — Foundation (parallel build)
- **Architecture contract** written first: zero-build static app, plain script
  globals, shared data schemas, a real lat/lon→SVG map projection, design tokens.
- **Dev 3 (architect):** app shell, parchment/manuscript design system with dark
  mode, Characters and Timeline views, fault-isolated module loader (one broken
  view can't take down the app).
- **Historian:** all 31 chapters of 1 Samuel — summaries, KJV key verses,
  archaeology-grounded historian notes (Shiloh's destruction layer, the
  Philistine pentapolis, the Tel Dan stele, Goliath's LXX height variant…),
  21 characters, 31 real-coordinate locations, 6 journeys, 20-entry timeline.
  All cross-references machine-validated.
- **Dev 1 (map):** interactive SVG map of ancient Israel — coastline, Galilee,
  Jordan, Dead Sea drawn in the same projection as the markers; clickable
  places; 6 toggleable journey routes with bezier paths, arrowheads, numbered
  stops.
- **Dev 2 (story):** chapter reader with navigator, read tracking
  (localStorage), key-verse and historian-note callouts, chips that jump to the
  map/characters.
- **Game dev:** "The Shepherd's Quest" — 30-question quiz (answers audited
  against the text) with ranks from Shepherd to Anointed One, plus a
  journey-ordering game wired to the map.

### Phase 2 — QA round 1
- Full Playwright browser suite: every view, cross-view links, both game modes
  played programmatically, mobile 390×844, file:// operation, blocked-storage
  simulation. **3 bugs found and fixed** (favicon 404; two map label-collision
  bugs in the crowded Benjamin plateau — labels now placed with pre-reserved
  dot zones + hand-tuned overrides). Final pass: zero console errors.
- Screenshots captured to `screenshots/`.

### Phase 3 — Feature requests from the field (mid-session)
User requests while reading: a Battle of Gibeon interactive, a family tree
starting from the sons of Zeruiah, Easter eggs, and spoken dialogue with
commentary.
- **Battle of Gibeon (⚔️):** four-stage playable retelling of 2 Sam 2:12–32 —
  converging-armies mini-map, the 12-vs-12 contest at the pool, the
  Asahel/Abner chase where both player choices land faithfully on the text,
  aftermath with Joab's trumpet. Four historian cards; pool Easter egg.
- **Family Lines (🌳):** two-house SVG genealogy (David gold, Saul blue),
  Michal's marriage drawn as the bridge between houses, sons-of-Zeruiah
  spotlight, honest notes on the genealogy puzzles, Ruth→Messiah glow line.
- **Easter eggs:** 8 hidden biblical delights (type "ebenezer", "selah",
  five clicks on Goliath, the gazelle for Asahel…) + a cryptic hints index
  ("x of 8 mysteries found").
- **Voices (🎭, in progress):** script-style KJV dialogue scenes with
  commentary for every chapter of 1 Sam + 2 Sam 1–2.

### Phase 4 — Integration
- Battle, Family, and Easter eggs wired into the shell as new tabs; all 7
  views verified rendering with zero console errors; battle/family screenshots
  captured.

### Known issues / next up
- Family tree renders undersized with dead space above it — layout fix queued.
- Voices module integration + QA round 2 + rebuilt single-file bundle queued.
- Visual distinctiveness pass ("make it stick out") queued.
- 2 Samuel content: chapter structure ready to extend; user is studying 2 Sam 2.
