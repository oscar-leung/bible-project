# Samuel & Kings — An Interactive Journey

**▶ Play it live: [oscar-leung.github.io/bible-project](https://oscar-leung.github.io/bible-project/)**

An illuminated, interactive family study of 1 & 2 Samuel (all 55 chapters), 1 Kings
(all 22) and 2 Kings (chapters 1–10 so far), built like a manuscript brought to life.
Open a Kings chapter and the manuscript turns royal: a gold crown and Tyrian purple. No build step, no backend, no accounts: one folder of
plain HTML, CSS, and JavaScript that also works offline straight from `file://`.

## What's inside

- **📖 Story** — every chapter with a summary, KJV key verse,
  archaeology-grounded historian's note, and 🎭 *Voices*: script-style KJV dialogue
  scenes with commentary. Chapters the family has studied also carry **📓 From the
  study notebook** — the theme in the reader's own words, the sharpest observations,
  and takeaways from real chapter-by-chapter devotional study (Living by the Book
  method).
- **✍️ Study (Kings)** — every Kings chapter adds the big idea, a "look for as you
  read" checklist, a link back to Samuel, "let it hit home", journaling questions, a
  prayer, a key-verse memorizer, private notes that copy straight into a study sheet,
  and a "Before you read" primer with every king's report card.
- **❓ Questions** — under each chapter: common questions readers ask (the bears, the
  lying spirit, Jehu's bloodshed…) with honest, text-grounded answers; a public
  Discussion thread (GitHub Discussions via giscus, once switched on); and a private
  "My questions" list.
- **🗺️ Map** — an SVG map of ancient Israel in a real lat/lon projection: 72 clickable
  places and 18 toggleable journey routes, from the ark's wanderings to Jehu's ride.
- **⚔️ Battles** — three playable retellings where every choice lands on the text:
  the pool of Gibeon (2 Sam 2), the valley of Rephaim (2 Sam 5), and the wood of
  Ephraim (2 Sam 18).
- **🌳 Family Lines** — a 49-person genealogy of the houses of David and Saul, each
  person carrying a "neuron map" of every mention and connection.
- **👥 Characters · 📜 Timeline** — 94 character studies and an 80-event chronology
  from Hannah's vow to Jehu on the Black Obelisk.
- **🎮 Quest** — a 106-question scroll of knowledge spanning Samuel and Kings, plus a
  journey-ordering game. Eight hidden mysteries await the curious.

The map also keeps a running **Kings trail**: chapters you mark as read light up their
places in order. Deep links work everywhere: `#story/2s18`, `#story/1k18`, `#story/2k5`, `#battle/rephaim`, `#family/david`,
`#map/jerusalem`.

## Running locally

Open `index.html` in a browser. That's it — no install, no server required
(`python3 -m http.server` works too).

## Kinship

This project follows the path of, and gladly points to,
[books-of-samuel](https://github.com/elinxie/books-of-samuel) — a historically
serious 3D visualizer of the same two books
([live](https://elinxie.github.io/books-of-samuel/)). This study companion grew up
alongside that Bible Project's approach — every visual element traceable to the
biblical text, archaeology, or an honest "scholars differ" — and doesn't deviate
from its story. Go see it.

## Colophon

A family bible study project. All scripture quotations are KJV (public domain).
Dates follow a common conservative chronology and are approximate; historian notes
flag where scholarship is divided. See `DEVLOG.md` for how this was built, session
by session, and `ARCHITECTURE.md` for the zero-build design rules.
