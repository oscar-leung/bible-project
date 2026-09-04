# Bible Project — 1 Samuel Interactive Story

A zero-build, static web app. Open `bible-project/index.html` directly in a browser
(works over `file://`) — no bundler, no server required. Plain script tags, globals,
no ES modules.

Structure (2 Samuel and later books will follow the same pattern):

```
bible-project/
  index.html          — app shell, tab nav, loads everything (Dev 3)
  styles.css          — shared design system (Dev 3)
  js/app.js           — window.App: view switching + cross-view links (Dev 3)
  js/story.js         — window.StoryView (Dev 2)
  js/map.js           — window.MapView (Dev 1)
  js/characters.js    — window.CharactersView (Dev 3)
  js/timeline.js      — window.TimelineView (Dev 3)
  js/game.js          — window.GameView (Game Dev)
  data/samuel1-chapters.js  — window.SAMUEL1 (Historian)
  data/characters.js        — window.CHARACTERS (Historian)
  data/locations.js         — window.LOCATIONS (Historian)
  data/journeys.js          — window.JOURNEYS (Historian)
  data/timeline.js          — window.TIMELINE (Historian)
  data/quiz.js              — window.QUIZ (Game Dev)
  dist/1-samuel-interactive.html — single-file bundle (QA)
```

## Shell contract (index.html)

```html
<header class="app-header"> title + <nav> buttons class="tab" data-view="story|map|characters|timeline|game" </header>
<main>
  <section id="view-story" class="view"></section>
  <section id="view-map" class="view"></section>
  <section id="view-characters" class="view"></section>
  <section id="view-timeline" class="view"></section>
  <section id="view-game" class="view"></section>
</main>
```

Script load order: data/*.js first, then js/app.js, then the view modules, in this
order: story, map, characters, timeline, game. `js/app.js` runs on DOMContentLoaded,
calls each module's `init()` inside try/catch (a broken module must not kill the app),
then `App.showView('story')`.

`.view` is hidden by default; `.view.active` is visible. Active tab gets `.tab.active`.

## Global API

```js
window.App = {
  showView(name),        // 'story' | 'map' | 'characters' | 'timeline' | 'game'
  focusLocation(locId),  // switches to map view, then MapView.focus(locId) if defined
  goToChapter(num),      // switches to story view, then StoryView.show(num) if defined
}
```

Every view module exposes `window.XxxView = { init() { /* renders into its section */ } }`.
`init()` must be idempotent-safe and must only touch its own `#view-*` section.
Modules may READ any data global; never write to another module's DOM.

## Data schemas (all plain script files assigning window globals)

```js
window.SAMUEL1 = {
  book: "1 Samuel",
  chapters: [{
    num: 1, title: "Hannah's Prayer",
    summary: "3–5 sentence narrative summary.",
    keyVerse: { ref: "1 Samuel 1:27", text: "..." },
    locations: ["shiloh"],        // ids into LOCATIONS
    characters: ["hannah","eli"], // ids into CHARACTERS
    historianNote: "historical/cultural/archaeological context, 2–4 sentences",
    era: "c. 1105 BC"
  }]  // ALL 31 chapters
};

window.CHARACTERS = [{ id, name, title, description, chapters: [1,2,3] }];

window.LOCATIONS = [{
  id: "shiloh", name: "Shiloh", modernName: "Khirbet Seilun",
  lat: 32.055, lon: 35.289,       // real-world approx coordinates
  description: "...", chapters: [1,2,3,4]
}];

window.JOURNEYS = [{
  id, title, color,              // color: any CSS color
  description,
  stops: [{ loc: "ramah", note: "..." }],  // ordered; loc ids into LOCATIONS
  chapters: [19,20,21]
}];

window.TIMELINE = [{ year: "c. 1105 BC", event: "...", chapters: [1] }];
```

## Map projection (js/map.js)

SVG viewBox `0 0 600 800`. Linear projection shared by geography art and markers:

```js
const project = (lat, lon) => ({ x: (lon - 34.0) * 300, y: (33.0 - lat) * 360 });
```

(lon 34.0→x 0, lon 36.0→x 600; lat 33.0→y 0, lat 30.8→y 792.) Draw the
Mediterranean coast, Sea of Galilee, Jordan River, and Dead Sea with this same
projection so markers land correctly.

## Design system (styles.css)

CSS custom properties on `:root`:
`--bg` (page), `--panel` (cards), `--ink` (text), `--muted`, `--accent` (deep blue),
`--gold` (accents/highlights), `--line` (borders).
Warm parchment/ancient-manuscript feel, dark-mode friendly via
`prefers-color-scheme`. Shared classes: `.card`, `.chip`, `.btn`, `.grid`.
Serif display font for headings (Georgia stack), system sans for body. Responsive:
single column under 720px; the map SVG scales to container width.
