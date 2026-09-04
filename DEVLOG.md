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

### Phase 5 — Family-tree fix + illuminated identity pass
- **Family Lines bug fixed:** the global `img,svg{max-width:100%}` rule was
  squeezing the tree SVG's width while its `height` attribute stood, so the
  2160×880 drawing letterboxed into a small band with dead space above it.
  Fixed with a scoped `max-width:none`, 1:1 render scale (labels now legible),
  a capped scroll box, and vertical+horizontal centering that re-applies when
  the hidden tab activates (scroll positions don't stick on `display:none`).
- **Illuminated-manuscript identity:** once-per-session opening moment (title
  ink-fades in over an unfurling gold rule, click to skip, honors
  prefers-reduced-motion); lyre emblem beside the title; colophon-styled
  subtitle and footer; parchment grain (inline SVG feTurbulence data-URI) on
  page/cards/header; gold-leaf drop caps on chapter summaries and the battle's
  opening prose; gold ring on the active tab; thin gold reading-progress bar
  under the header (reads story.js's localStorage key); micro-motion on tabs,
  chips, map markers, and timeline nodes; aged-leather dark mode; og:/theme-color
  social meta. No external fonts — still works offline over file://.
- **QA:** zero console errors/warnings across all 7 tabs, light+dark,
  1280×900 and 390×844 (no page horizontal scroll); all screenshots retaken,
  plus a new `hero.png`.

### Phase 6 — Voices integrated
- 🎭 Voices wired into the shell: 43 KJV dialogue scenes (150 speech lines)
  render as script-style bubbles with commentary inside the story view,
  covering 1 Sam 1–31 and 2 Sam 1–2. Verified in-browser: zero console
  errors, scenes present on ch. 1 and ch. 17; `screenshots/voices.png`.

### Phase 7 — Neuron maps rendered; bundle rebuilt
- Family data grown to 47 people: the six Hebron sons of 2 Sam 3:2–5 as
  individuals under their four mothers (all added as nodes), plus Phaltiel;
  every person carries a "neuron map" — 195 mentions (ref/when/what/why)
  and 148 person-to-person connections, all id-validated.
- Tree canvas widened to 2510×880: wives row + sons row under David, each
  son below his mother, Phaltiel beside Michal (both her marriages drawn).
  Zero box overlaps, verified programmatically.
- Detail panel now shows "🧠 Every mention" and clickable "🔗 Connections"
  rows that hop the selection through the web (asahel → abner → joab chain
  verified).
- Zero-error matrix re-passed (light/dark × desktop/mobile); single-file
  bundle rebuilt with all 19 scripts and verified over file://.

### Phase 8 — The app becomes a two-book study (2 Samuel begins)
- 📖 The story view now has a book switcher: 1 Samuel (31 chapters) and
  2 Samuel (chapters 1–2 so far, growing as the study continues). Per-book
  read tracking; the gold progress bar counts both books; Voices keys to
  the active book so the Gibeon dialogue plays under 2 Samuel 2.
- Historian content for 2 Sam 1 ("The Song of the Bow") and 2 Sam 2
  ("Two Kings: Hebron and Mahanaim"), with Hebron, Mahanaim, and Gibeon
  added to the map and a new "Two Kings, One Land" journey route.
- Incident log: a temporary frontend mock briefly overwrote the historian's
  real chapter file in a same-path race; caught in review, the real file was
  regenerated and re-validated (51/51 assertions). Lesson recorded: one
  owner per file path, mocks live outside the repo.
- Verified in-browser: real content on 2 Sam 2, zero console errors, all
  7 tabs clean; single-file bundle rebuilt with all 20 scripts.

### Next up
- 2 Samuel chapters 3+ as the study continues.
