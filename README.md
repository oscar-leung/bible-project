# 1 Samuel — An Interactive Journey

An interactive study app for the book of 1 Samuel: read chapter-by-chapter
summaries with key verses and historian's notes, explore the geography on a
map of ancient Israel, meet the characters, walk the timeline, and test
yourself with a quest-style quiz. Part of an ongoing Bible Project on the
books of Samuel — 2 Samuel is next.

## How to open it

Just open `index.html` in any browser. No build step, no server —
it works straight over `file://`.

## File layout

```
bible-project/
  index.html          app shell and tab navigation
  styles.css          shared design system (parchment theme, dark-mode aware)
  js/
    app.js            view switching + cross-view links (window.App)
    story.js          chapter reader
    map.js            SVG map of ancient Israel with journeys
    characters.js     character card grid
    timeline.js       vertical timeline
    game.js           quiz / quest game
  data/               plain-JS data files (chapters, characters,
                      locations, journeys, timeline, quiz)
  dist/               single-file bundle
```

See `ARCHITECTURE.md` for the module contract and data schemas.

---

Built as a team-of-agents exercise with Claude Code.
