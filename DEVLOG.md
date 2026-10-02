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

## 2026-09-09 — Session 2: 2 Samuel 3

### Phase 9 — Abner changes sides
- 📖 2 Samuel 3 added to the story view: "Abner Changes Sides — and Falls at
  the Gate." Historian note covers the concubine-as-throne-claim convention
  (Rizpah), Michal's political return, and why Joab pulled Abner *outside*
  the gate of Hebron — a city of refuge — to kill him.
- 🎭 Four new Voices scenes ("Am I a dog's head?", Michal returned /
  Phaltiel weeping, the gate of Hebron, "a prince and a great man fallen").
- New characters Rizpah and Phaltiel; new map location Bahurim (Ras et-Tmim);
  two new timeline entries (Hebron sons, Abner's defection and murder).
- Verified in-browser: real content on 2 Sam 3, both Voices scenes present,
  zero console errors across all 7 tabs; `screenshots/samuel2-ch3.png`.

## 2026-09-20 — Session 3: the whole book

### Phase 10 — 2 Samuel completed (chapters 4–24)
- Five historian agents wrote the remaining 21 chapters in parallel, each
  owning an isolated fragment file (chs 4–8, 9–12, 13–15, 16–19, 20–24);
  the lead merged them with a validating splice script — no shared paths,
  no repeats of the phase-8 mock race.
- 📖 Every chapter of both books now has a summary, KJV key verse, and
  archaeology-grounded historian note (Warren's Shaft and the tsinnor,
  the Tel Dan stele, Rabbah/Amman citadel, Tel Abil el-Qamh, Psalm 18 as
  a doublet of 2 Sam 22, census anxiety from Mari to Exodus 30…).
- 🎭 Voices grew to 55 chapter keys — Michal at the window, Nathan's
  "Thou art the man," Tamar's plea, Ahithophel vs. Hushai, "O my son
  Absalom," Rizpah's vigil, the psalm, Gad's three choices, Araunah.
- New characters (20 more, 48 total): Nathan, Bathsheba, Uriah, Ziba,
  Mephibosheth, Uzzah, Rechab & Baanah, Amnon, Tamar, Absalom, Ahithophel,
  Hushai, Ittai, Zadok, Shimei, Barzillai, Amasa, Sheba, Araunah, Gad.
- New map places: Jerusalem, Rabbah, Geshur, Baal-hazor; new journey
  route "The Revolt of Absalom" (Jerusalem → Bahurim → Mahanaim →
  Gilgal → Jerusalem). Timeline extended to the altar on Araunah's
  threshingfloor — the future temple site.
- Cross-references machine-validated (every character/location id, one
  dialogue key per chapter, all 24 chapters present); full browser sweep.

### Phase 11 — The encore: battles, quest pack, and the last two names
- ⚔️ The Battle tab became an armory: a new battle hub with three playable
  battles and `#battle/<id>` deep links. Two new battles by two game-dev
  agents working in parallel (each owning only its own two files):
  - **The Valley of Rephaim** (2 Sam 5:17–25) — the inquire-of-the-LORD
    mechanic where yesterday's winning plan is not today's guidance, and a
    timing interaction: strike only at "the sound of a going in the tops
    of the mulberry trees." Historian cards on Emek Refaim, Baal-perazim's
    wordplay, the bekha'im-tree debate, and Ebenezer reversed.
  - **The Wood of Ephraim** (2 Sam 18) — the hazard-wood sweep where the
    wood devours more than the sword, the refuse-the-shekels choice at
    the oak, the two-runners race with the watchman's recognition, and a
    quiet final stage in the chamber over the gate: victory for the
    kingdom, desolation for the father. Historian cards on why the wood
    of "Ephraim" is east of Jordan, the royal mule, Absalom's Monument
    misattribution, and the heap of stones.
- 🎮 Quest: 24 new 2 Samuel questions (one per chapter, 54 total); the
  Scroll of Knowledge now draws from both books and links each answer to
  the right book's chapter.
- 🌳 Family Lines: Tamar (the clearest moral voice of 2 Sam 13) and Uriah
  the Hittite (the roll of the mighty men's last name) join the tree with
  full neuron maps — 49 people; 48 rendered boxes, zero overlaps, all
  cross-references machine-validated.
- Verified in-browser: hub → each battle → back, deep link, quest copy,
  both new family nodes, all 7 tabs — zero console errors.

## 2026-09-29 — Session 4: the study notebook, and going public

### Phase 12 — The reader's own notes join the app
- 📓 New "From the study notebook" panel in the story view: 29 chapters
  now carry distilled notes from the family's real chapter-by-chapter
  devotional studies (Living by the Book method) — the studied date,
  the chapter's theme in the reader's own words, where it sits in the
  arc, the sharpest observations, "carrying forward" takeaways, and
  (where they exist) handwritten after-reflections.
- Source: the personal devotional-study database, distilled by three
  parallel agents with a shared spec (public-site privacy rules baked
  in: principles yes, private details no) and merged with a validating
  script — split-passage studies (12, 18, 19, 23, 24:1-7/8-22) merged
  under one chapter key each.
- Coverage: 1 Samuel 20, 21, 22, 24, 31 and every chapter of 2 Samuel.
- Verified in-browser: notebook renders on studied chapters, absent on
  others, zero console errors; `screenshots/study-notebook.png`.

### Phase 13 — Shipped to the public web
- The app now lives at its own public repo (oscar-leung/bible-project,
  per the inventory's Tier A plan) and deploys to GitHub Pages via
  Actions on every push to main.
- The workspace copy remains the working source until the full subtree
  extraction; syncs are wholesale copies.

## 2026-10-02 — Session 5: the big map, and an app for every pocket

### Phase 14 — The map grows up
- The whole atlas now projects at 1.5× (900×1200 viewBox) and the map
  column widened to match, so labels got *actually* bigger on screen —
  the first attempt scaled the viewBox alone and made every label
  effectively smaller; the screenshot caught it, the math confirmed it
  (on-screen px = font px × display width / viewBox width).
- Marker names at 20px with a land-colored halo (`paint-order: stroke`)
  so they stay readable over regions, routes, and water.
- Two-tier labeling for the crowded Benjamin plateau: six minor towns
  (Geba, Nob, Bahurim, Michmash, Mizpah, Gibeah) drop to 15px, majors
  keep 20px, and each plateau label is hand-fanned around its dot via
  `LABEL_OVERRIDES` — anchored left, right, above, or below so the
  text aligns *around* the cities instead of piling up east of them.
- Verification is automated now: a Playwright pass reads every label's
  rendered `getBBox()` and reports pairwise overlaps. Iterated until
  the report read `overlaps: []` with zero console errors, desktop
  and 390px mobile both.
- Regions 25px, seas 21px, dots r7 with wider halos, thicker routes —
  everything rescaled in proportion, not just the text.

### Phase 15 — Installable everywhere (PWA)
- The site is now a Progressive Web App: `manifest.webmanifest`
  (standalone display, parchment theme), a service worker (`sw.js`)
  that precaches all 30 app files on install and serves cache-first
  with background refresh — so the app opens instantly, works fully
  offline, and still picks up new deploys on the next visit.
- Lyre icon set rendered from an SVG at 192/512/maskable-512, wired
  for Android (manifest icons) and iPhone (`apple-touch-icon` + web
  app metas). One codebase: website, Android home-screen app, iPhone
  home-screen app.
- Registration is guarded (https/localhost only), so the zero-build
  file:// workflow still works untouched.
- Verified live: `swRegistered: true`, `swActive: true`,
  `manifestOk: true`, zero console errors.

### Next up
- Full extraction via scripts/extract-bible-project.sh once the dual
  home should end; more Easter eggs; OneNote notes import if they hold
  material beyond the devotional database.
