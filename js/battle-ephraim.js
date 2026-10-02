// js/battle-ephraim.js — window.EphraimView (Game Dev)
// "The Wood of Ephraim" — interactive retelling of 2 Samuel 18 (with Joab's
// rebuke, 19:5–7), rendered entirely inside #view-battle. Plain script
// globals, no modules. Data lives in data/battle-ephraim.js
// (window.BATTLE_EPHRAIM); this file is engine + rendering only.
// Defensive: missing section or data never throws.
(function () {
  "use strict";

  // ---------- helpers ----------

  function root() {
    return document.getElementById("view-battle");
  }

  function data() {
    var d = window.BATTLE_EPHRAIM;
    if (d && d.muster && d.wood && d.oak && d.runners && d.chamber &&
        Array.isArray(d.stages) && d.stages.length) {
      return d;
    }
    return null;
  }

  function el(tag, className, html) {
    var n = document.createElement(tag);
    if (className) n.className = className;
    if (html != null) n.innerHTML = html;
    return n;
  }

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  function verseCard(quote, extraClass) {
    // quote: { ref, text }
    var card = el("blockquote", "be-verse" + (extraClass ? " " + extraClass : ""));
    if (quote && quote.text) card.appendChild(el("p", "be-verse-text", "&ldquo;" + esc(quote.text) + "&rdquo;"));
    if (quote && quote.ref) card.appendChild(el("cite", "be-verse-ref", "&mdash; " + esc(quote.ref) + " (KJV)"));
    return card;
  }

  function noteCard(note) {
    // note: { title, text }
    var card = el("div", "card be-note be-fade");
    card.appendChild(el("h4", "be-note-title", esc((note && note.title) || "Historian's note 📜")));
    card.appendChild(el("p", "be-note-text", esc((note && note.text) || "")));
    return card;
  }

  function actionsRow() {
    return el("div", "be-actions");
  }

  function btn(label, onClick, extraClass) {
    var b = el("button", "btn be-btn" + (extraClass ? " " + extraClass : ""), label);
    b.addEventListener("click", function () {
      try { onClick(); } catch (e) { /* never let a click kill the view */ }
    });
    return b;
  }

  function guardShowView(name) {
    if (window.App && typeof window.App.showView === "function") window.App.showView(name);
  }

  function guardFocusLocation(locId) {
    if (window.App && typeof window.App.focusLocation === "function" && locId) {
      window.App.focusLocation(locId);
    } else {
      guardShowView("map");
    }
  }

  function guardGoToChapter(n, book) {
    if (window.App && typeof window.App.goToChapter === "function") {
      window.App.goToChapter(n, book);
    }
  }

  function guardBattleHub() {
    if (window.BattleHub && typeof window.BattleHub.home === "function") {
      window.BattleHub.home();
    }
    // hub missing → do nothing, per the shared convention
  }

  // ---------- state ----------

  var state = {
    stage: 0,          // index into data().stages
    unlocked: 0,       // highest stage reached (chips up to here are clickable)
    muleClicks: 0,     // easter-egg counter (persists across re-renders)
    eggFound: false,
    sweep: null,       // per-run wood-sweep sub-state
    oakPhase: 0,       // 0 the oak · 1 the offer · 2 the darts · 3 the burial
    runnersPhase: 0,   // 0 choose · 1 the watchman · 2 the arrivals
    runnerChoice: null
  };

  // ---------- styles (every rule scoped under #view-battle) ----------

  var STYLE_ID = "battle-ephraim-style";
  var CSS = [
    "#view-battle .be-wrap { max-width: 760px; margin: 0 auto; padding: 8px 0 40px; }",
    "#view-battle .be-title { font-family: Georgia, 'Times New Roman', serif; color: var(--gold, #b8860b); text-align: center; font-size: 2rem; margin: 12px 0 2px; letter-spacing: .03em; }",
    "#view-battle .be-sub { text-align: center; color: var(--muted, #7a6f5d); font-style: italic; margin: 0 0 14px; }",
    "#view-battle .be-topnav { display: flex; gap: 8px; flex-wrap: wrap; justify-content: center; align-items: center; margin: 0 0 20px; }",
    "#view-battle .be-hubchip { border: 1px solid var(--line, #d8cdb8); background: var(--panel, #fdf8ec); color: var(--accent, #1f3a5f); border-radius: 999px; padding: 6px 14px; font-size: .85rem; cursor: pointer; transition: border-color .2s ease; }",
    "#view-battle .be-hubchip:hover { border-color: var(--gold, #b8860b); }",
    "#view-battle .be-stagechip { border: 1px solid var(--line, #d8cdb8); background: var(--panel, #fdf8ec); color: var(--muted, #7a6f5d); border-radius: 999px; padding: 6px 14px; font-size: .85rem; cursor: default; transition: border-color .2s ease, color .2s ease; }",
    "#view-battle .be-stagechip.be-open { cursor: pointer; color: var(--ink, #2b2417); }",
    "#view-battle .be-stagechip.be-open:hover { border-color: var(--gold, #b8860b); }",
    "#view-battle .be-stagechip.be-here { border-color: var(--gold, #b8860b); color: var(--gold, #b8860b); font-weight: 700; }",
    "#view-battle .be-stagechip.be-locked { opacity: .5; }",
    "#view-battle .be-heading { font-family: Georgia, serif; color: var(--accent, #1f3a5f); font-size: 1.4rem; margin: 0 0 12px; }",
    "#view-battle .be-verse { margin: 14px 0; padding: 12px 16px; border-left: 4px solid var(--gold, #b8860b); background: var(--panel, #fdf8ec); border-radius: 0 8px 8px 0; }",
    "#view-battle .be-verse-text { font-family: Georgia, serif; font-style: italic; margin: 0 0 6px; line-height: 1.55; }",
    "#view-battle .be-verse-ref { display: block; font-size: .85rem; color: var(--muted, #7a6f5d); font-style: normal; }",
    "#view-battle .be-note { border: 1px dashed var(--gold, #b8860b); background: var(--panel, #fdf8ec); margin: 16px 0; }",
    "#view-battle .be-note-title { font-family: Georgia, serif; color: var(--gold, #b8860b); margin: 0 0 8px; }",
    "#view-battle .be-note-text { margin: 0; line-height: 1.55; }",
    "#view-battle .be-actions { margin-top: 18px; display: flex; gap: 10px; flex-wrap: wrap; justify-content: center; }",
    "#view-battle .be-fade { animation: be-fade .4s ease; }",
    "@keyframes be-fade { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }",
    "#view-battle .be-pop { animation: be-pop .35s ease; }",
    "@keyframes be-pop { 0% { transform: scale(.95); } 60% { transform: scale(1.03); } 100% { transform: scale(1); } }",
    /* muster: the three columns */
    "#view-battle .be-columns { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; margin: 14px 0; }",
    "#view-battle .be-column { flex: 1 1 180px; max-width: 230px; border: 1px solid var(--line, #d8cdb8); border-radius: 10px; padding: 12px 10px; background: var(--panel, #fdf8ec); text-align: center; }",
    "#view-battle .be-column-emblem { font-size: 1.6rem; }",
    "#view-battle .be-column-name { font-weight: 700; color: var(--accent, #1f3a5f); font-family: Georgia, serif; margin: 4px 0 2px; }",
    "#view-battle .be-column-detail { font-size: .82rem; color: var(--muted, #7a6f5d); line-height: 1.4; }",
    /* the wood: sweep grid */
    "#view-battle .be-counters { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; font-size: .9rem; color: var(--muted, #7a6f5d); margin-bottom: 10px; }",
    "#view-battle .be-counters strong { color: var(--accent, #1f3a5f); font-size: 1.05rem; }",
    "#view-battle .be-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; margin: 12px 0; }",
    "#view-battle .be-tile { aspect-ratio: 1 / 1; min-height: 56px; font-size: 1.5rem; border: 1px solid var(--line, #d8cdb8); border-radius: 8px; background: var(--panel, #fdf8ec); cursor: pointer; transition: transform .12s ease, border-color .15s ease; }",
    "#view-battle .be-tile:hover:not(:disabled) { transform: scale(1.05); border-color: var(--gold, #b8860b); }",
    "#view-battle .be-tile:disabled { cursor: default; }",
    "#view-battle .be-tile.be-tile-wood { background: #e4ecd9; border-color: #7c8a5e; }",
    "#view-battle .be-tile.be-tile-sword { background: #f0dede; border-color: #a05252; }",
    "#view-battle .be-tile.be-tile-clear { opacity: .75; }",
    "#view-battle .be-sweep-log { min-height: 3.2em; font-family: Georgia, serif; font-style: italic; text-align: center; line-height: 1.5; margin: 8px 0; }",
    "#view-battle .be-sweep-hint { font-size: .85rem; color: var(--muted, #7a6f5d); font-style: italic; text-align: center; margin: 6px 0 0; }",
    /* the oak: hanging scene + wandering mule */
    "#view-battle .be-oakscene { text-align: center; font-size: 2.2rem; line-height: 1.2; margin: 10px 0 0; }",
    "#view-battle .be-oakscene .be-hanging { display: inline-block; animation: be-sway 2.6s ease-in-out infinite; transform-origin: top center; }",
    "@keyframes be-sway { 0%,100% { transform: rotate(-4deg); } 50% { transform: rotate(4deg); } }",
    "#view-battle .be-mulestrip { position: relative; height: 54px; overflow: hidden; margin: 4px 0 0; }",
    "#view-battle .be-mule { position: absolute; bottom: 2px; left: 0; font-size: 1.9rem; line-height: 1; cursor: pointer; animation: be-wander 9s linear infinite; transition: transform .15s ease; }",
    "#view-battle .be-mule:hover { transform: scale(1.12); }",
    "@keyframes be-wander { 0% { left: -12%; } 100% { left: 104%; } }",
    "#view-battle .be-mule-caption { font-size: .85rem; color: var(--muted, #7a6f5d); font-style: italic; text-align: center; margin: 2px 0 0; }",
    "#view-battle .be-egg { border: 2px solid var(--accent, #1f3a5f); background: var(--panel, #fdf8ec); }",
    /* choices */
    "#view-battle .be-choices { display: grid; gap: 10px; margin-top: 12px; }",
    "#view-battle .be-choice { text-align: left; padding: 12px 14px; font-size: 1rem; cursor: pointer; border-radius: 8px; border: 1px solid var(--line, #d8cdb8); background: var(--panel, #fdf8ec); color: var(--ink, #2b2417); transition: border-color .15s ease, transform .1s ease; }",
    "#view-battle .be-choice:hover:not(:disabled) { border-color: var(--accent, #1f3a5f); transform: translateX(3px); }",
    "#view-battle .be-choice:disabled { cursor: default; opacity: .8; }",
    "#view-battle .be-choice.be-picked { border-color: var(--gold, #b8860b); font-weight: 600; }",
    "#view-battle .be-faithful { border-left: 4px solid var(--accent, #1f3a5f); padding: 10px 14px; background: var(--panel, #fdf8ec); border-radius: 0 8px 8px 0; margin-top: 12px; font-style: italic; }",
    /* the runners: road track */
    "#view-battle .be-track { position: relative; height: 74px; margin: 14px 0 4px; border-bottom: 3px dashed var(--line, #d8cdb8); overflow: hidden; }",
    "#view-battle .be-runner { position: absolute; bottom: 2px; font-size: 2rem; line-height: 1; }",
    "#view-battle .be-runner .be-runner-tag { display: block; font-size: .68rem; text-align: center; color: var(--muted, #7a6f5d); font-family: Georgia, serif; }",
    "#view-battle .be-runner.be-bob { animation: be-bob .5s ease infinite alternate; }",
    "@keyframes be-bob { from { bottom: 2px; } to { bottom: 8px; } }",
    "#view-battle .be-arrival { margin: 14px 0; }",
    "#view-battle .be-arrival h4 { font-family: Georgia, serif; color: var(--accent, #1f3a5f); margin: 0 0 6px; }",
    /* the chamber: quiet */
    "#view-battle .be-quiet { border: 1px solid var(--line, #d8cdb8); background: var(--panel, #fdf8ec); }",
    "#view-battle .be-lament { font-family: Georgia, serif; font-style: italic; font-size: 1.15rem; text-align: center; line-height: 1.8; color: var(--ink, #2b2417); margin: 18px 8px; }",
    "#view-battle .be-lament-ref { display: block; font-size: .85rem; color: var(--muted, #7a6f5d); font-style: normal; margin-top: 10px; }",
    "#view-battle .be-hush { text-align: center; color: var(--muted, #7a6f5d); font-style: italic; font-size: .9rem; }",
    "#view-battle .be-slow { animation: be-slowfade 1.6s ease; }",
    "@keyframes be-slowfade { from { opacity: 0; } to { opacity: 1; } }",
    /* tally + aftermath chips */
    "#view-battle .be-tallycard { text-align: center; }",
    "#view-battle .be-tally-sides { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; margin: 12px 0; }",
    "#view-battle .be-tally-side { flex: 1 1 200px; max-width: 280px; border: 1px solid var(--line, #d8cdb8); border-radius: 10px; padding: 14px 10px; background: var(--panel, #fdf8ec); }",
    "#view-battle .be-tally-num { font-family: Georgia, serif; font-size: 2.2rem; color: var(--gold, #b8860b); margin: 4px 0; }",
    "#view-battle .be-tally-name { font-weight: 700; color: var(--accent, #1f3a5f); }",
    "#view-battle .be-tally-detail { font-size: .85rem; color: var(--muted, #7a6f5d); }",
    "#view-battle .be-chips { display: flex; gap: 10px; flex-wrap: wrap; justify-content: center; margin-top: 14px; }",
    "#view-battle .be-chip { display: inline-block; border: 1px solid var(--gold, #b8860b); color: var(--accent, #1f3a5f); background: var(--panel, #fdf8ec); border-radius: 999px; padding: 8px 16px; font-size: .9rem; cursor: pointer; transition: transform .15s ease, box-shadow .15s ease; }",
    "#view-battle .be-chip:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,.12); }",
    "@media (max-width: 720px) { #view-battle .be-title { font-size: 1.5rem; } #view-battle .be-grid { grid-template-columns: repeat(3, 1fr); } #view-battle .be-oakscene { font-size: 1.7rem; } }"
  ].join("\n");

  function injectStyles() {
    try {
      if (document.getElementById(STYLE_ID)) return;
      var s = document.createElement("style");
      s.id = STYLE_ID;
      s.textContent = CSS;
      document.head.appendChild(s);
    } catch (e) { /* styling is optional */ }
  }

  // ---------- easter egg (the mule that went away) ----------

  function makeMule() {
    var mule = el("span", "be-mule", "🐴");
    mule.setAttribute("title", "The mule that was under him went away");
    mule.setAttribute("role", "img");
    mule.setAttribute("aria-label", "The riderless royal mule, walking away");
    mule.addEventListener("click", function () {
      try {
        mule.classList.remove("be-pop");
        void mule.offsetWidth; // restart the little startle animation
        mule.classList.add("be-pop");
        if (state.eggFound) return;
        state.muleClicks++;
        var d = data();
        var need = (d && d.easterEgg && d.easterEgg.clicksNeeded) || 3;
        if (state.muleClicks >= need && d && d.easterEgg) {
          state.eggFound = true;
          var host = mule.parentNode;
          // climb to the nearest card so the egg lands after it
          while (host && host.parentNode && !/\bcard\b/.test(host.className || "")) host = host.parentNode;
          var egg = el("div", "card be-egg be-fade");
          egg.appendChild(el("h4", "be-note-title", esc(d.easterEgg.title || "You found something.")));
          egg.appendChild(el("p", "be-note-text", esc(d.easterEgg.text || "")));
          if (host && host.parentNode) host.parentNode.insertBefore(egg, host.nextSibling);
          else mule.parentNode.appendChild(egg);
        }
      } catch (e) { /* the mule keeps walking */ }
    });
    return mule;
  }

  // ---------- shell: title + hub chip + stage nav ----------

  function renderShell() {
    var host = root();
    var d = data();
    if (!host) return null;
    host.innerHTML = "";
    var wrap = el("div", "be-wrap be-fade");
    wrap.appendChild(el("h2", "be-title", "🌲 " + esc((d && d.title) || "The Wood of Ephraim")));
    wrap.appendChild(el("p", "be-sub", esc((d && d.subtitle) || "")));

    var nav = el("div", "be-topnav");
    var hub = el("button", "be-hubchip", "🏰 All battles");
    hub.addEventListener("click", function () {
      try { guardBattleHub(); } catch (e) { /* stay put */ }
    });
    nav.appendChild(hub);
    if (d) {
      d.stages.forEach(function (st, i) {
        var open = i <= state.unlocked;
        var cls = "be-stagechip" + (i === state.stage ? " be-here" : "") + (open ? " be-open" : " be-locked");
        var chip = el("button", cls, esc((st.emblem || "") + " " + (st.label || st.id || "")));
        chip.disabled = !open;
        if (open) chip.addEventListener("click", function () { showStage(i); });
        nav.appendChild(chip);
      });
    }
    wrap.appendChild(nav);
    host.appendChild(wrap);
    return wrap;
  }

  function showStage(i) {
    var d = data();
    if (!d) { renderPlaceholder(); return; }
    if (i < 0 || i >= d.stages.length) i = 0;
    state.stage = i;
    if (i > state.unlocked) state.unlocked = i;
    var id = d.stages[i].id;
    try {
      if (id === "muster") renderMuster();
      else if (id === "wood") renderWoodIntro();
      else if (id === "oak") { state.oakPhase = 0; renderOak(); }
      else if (id === "runners") { state.runnersPhase = 0; renderRunners(); }
      else if (id === "chamber") renderChamber();
      else renderMuster();
    } catch (e) {
      renderErrorCard();
    }
  }

  function advanceStage() {
    var d = data();
    if (!d) return;
    if (state.stage + 1 < d.stages.length) showStage(state.stage + 1);
  }

  function renderPlaceholder() {
    var host = root();
    if (!host) return;
    host.innerHTML = "";
    var wrap = el("div", "be-wrap be-fade");
    var card = el("div", "card", null);
    card.appendChild(el("h3", "be-heading", "🕊️ The runners have not yet come in"));
    card.appendChild(el("p", null,
      "The account of the wood of Ephraim (data/battle-ephraim.js) has not been delivered yet. Check back soon &mdash; the watchman is still on the roof over the gate."));
    var actions = actionsRow();
    actions.appendChild(btn("Back to the story", function () { guardShowView("story"); }));
    card.appendChild(actions);
    wrap.appendChild(card);
    host.appendChild(wrap);
  }

  function renderErrorCard() {
    var host = root();
    if (!host) return;
    host.innerHTML = "<div class=\"card\"><p>The wood of Ephraim could not be staged. Please reload the page.</p></div>";
  }

  // ---------- Stage 1: THE MUSTER AT MAHANAIM ----------

  function renderMuster() {
    var wrap = renderShell();
    var d = data();
    if (!wrap || !d) { renderPlaceholder(); return; }
    var m = d.muster;

    var card = el("div", "card be-fade");
    card.appendChild(el("h3", "be-heading", esc(m.heading || "The Muster at Mahanaim")));
    (m.paragraphs || []).forEach(function (p) { card.appendChild(el("p", null, esc(p))); });

    if (Array.isArray(m.columns) && m.columns.length) {
      var cols = el("div", "be-columns");
      m.columns.forEach(function (c) {
        var box = el("div", "be-column");
        box.appendChild(el("div", "be-column-emblem", esc(c.emblem || "")));
        box.appendChild(el("div", "be-column-name", esc(c.name || "")));
        box.appendChild(el("div", "be-column-detail", esc(c.detail || "")));
        cols.appendChild(box);
      });
      card.appendChild(cols);
    }

    if (m.refusal) card.appendChild(verseCard(m.refusal));
    if (m.afterRefusal) card.appendChild(el("p", null, esc(m.afterRefusal)));
    if (m.charge) card.appendChild(verseCard(m.charge));
    if (m.chargeNote) card.appendChild(el("p", "be-faithful", esc(m.chargeNote)));
    wrap.appendChild(card);

    if (m.historianNote) wrap.appendChild(noteCard(m.historianNote));

    var actions = actionsRow();
    actions.appendChild(btn("March out by hundreds and by thousands →", advanceStage, "be-pop"));
    wrap.appendChild(actions);
  }

  // ---------- Stage 2: THE WOOD DEVOURS ----------

  function renderWoodIntro() {
    var wrap = renderShell();
    var d = data();
    if (!wrap || !d) { renderPlaceholder(); return; }
    var w = d.wood;

    var card = el("div", "card be-fade");
    card.appendChild(el("h3", "be-heading", esc(w.heading || "The Wood Devours")));
    (w.intro || []).forEach(function (p) { card.appendChild(el("p", null, esc(p))); });
    if (w.opening) card.appendChild(verseCard(w.opening));
    var actions = actionsRow();
    actions.appendChild(btn("🌲 Enter the wood", beginSweep, "be-pop"));
    card.appendChild(actions);
    wrap.appendChild(card);
  }

  function beginSweep() {
    var d = data();
    if (!d || !d.wood.sweep || !Array.isArray(d.wood.sweep.tiles) || !d.wood.sweep.tiles.length) {
      renderPlaceholder();
      return;
    }
    state.sweep = { revealed: {}, woodCount: 0, swordCount: 0, opened: 0 };
    renderSweep();
  }

  function renderSweep() {
    var wrap = renderShell();
    var d = data();
    var sw = state.sweep;
    if (!wrap || !d || !sw) { renderPlaceholder(); return; }
    var sweep = d.wood.sweep;
    var tiles = sweep.tiles;

    var card = el("div", "card be-fade");
    card.appendChild(el("h3", "be-heading", esc(d.wood.heading || "The Wood Devours")));
    card.appendChild(el("p", "be-sweep-hint", esc(sweep.instructions || "Advance tile by tile.")));

    var counters = el("div", "be-counters");
    var woodCounter = el("span", null, "🌲 " + esc(sweep.woodLabel || "By the wood") + ": <strong>" + sw.woodCount + "</strong>");
    var swordCounter = el("span", null, "⚔️ " + esc(sweep.swordLabel || "By the sword") + ": <strong>" + sw.swordCount + "</strong>");
    counters.appendChild(woodCounter);
    counters.appendChild(swordCounter);
    card.appendChild(counters);

    var log = el("p", "be-sweep-log", "The trees close over your squad. Choose your ground.");
    var grid = el("div", "be-grid");
    var doneActions = null;

    tiles.forEach(function (tile, i) {
      var revealed = !!sw.revealed[i];
      var b = el("button", "be-tile" + (revealed ? " be-tile-" + esc(tile.type || "clear") : ""),
        revealed ? esc(tile.icon || "🌲") : "🌲");
      b.disabled = revealed;
      if (!revealed) {
        b.addEventListener("click", function () {
          try {
            if (sw.revealed[i]) return;
            sw.revealed[i] = true;
            sw.opened++;
            b.disabled = true;
            b.className = "be-tile be-tile-" + (tile.type || "clear") + " be-pop";
            b.innerHTML = esc(tile.icon || "🌲");
            if (tile.type === "wood") sw.woodCount++;
            else if (tile.type === "sword") sw.swordCount++;
            woodCounter.innerHTML = "🌲 " + esc(sweep.woodLabel || "By the wood") + ": <strong>" + sw.woodCount + "</strong>";
            swordCounter.innerHTML = "⚔️ " + esc(sweep.swordLabel || "By the sword") + ": <strong>" + sw.swordCount + "</strong>";
            log.innerHTML = esc(tile.text || "");
            if (sw.opened >= tiles.length && !doneActions) {
              if (sweep.summary) card.appendChild(verseCard(sweep.summary, "be-fade"));
              if (sweep.tallyNote) card.appendChild(el("p", "be-fade", esc(sweep.tallyNote)));
              doneActions = actionsRow();
              doneActions.appendChild(btn("Deeper in — toward the great oak →", advanceStage, "be-pop"));
              card.appendChild(doneActions);
            }
          } catch (e) { /* keep sweeping */ }
        });
      }
      grid.appendChild(b);
    });

    card.appendChild(grid);
    card.appendChild(log);
    wrap.appendChild(card);

    if (d.wood.historianNote) wrap.appendChild(noteCard(d.wood.historianNote));
  }

  // ---------- Stage 3: THE OAK ----------

  function renderOak() {
    var wrap = renderShell();
    var d = data();
    if (!wrap || !d) { renderPlaceholder(); return; }
    var o = d.oak;
    var phase = state.oakPhase || 0;

    var card = el("div", "card be-fade");
    card.appendChild(el("h3", "be-heading", esc(o.heading || "The Oak")));

    if (phase === 0) {
      (o.intro || []).forEach(function (p) { card.appendChild(el("p", null, esc(p))); });
      if (o.caught) card.appendChild(verseCard(o.caught));
      // the scene: the man in the oak, and the mule walking away (the egg)
      var scene = el("div", "be-oakscene", "🌳<span class=\"be-hanging\" role=\"img\" aria-label=\"Absalom caught in the oak\">🧍</span>🌳");
      card.appendChild(scene);
      var strip = el("div", "be-mulestrip");
      strip.appendChild(makeMule());
      card.appendChild(strip);
      if (o.muleCaption) card.appendChild(el("p", "be-mule-caption", esc(o.muleCaption)));
      var actions = actionsRow();
      actions.appendChild(btn("You are the man who sees it →", function () {
        state.oakPhase = 1; renderOak();
      }, "be-pop"));
      card.appendChild(actions);
      wrap.appendChild(card);
      return;
    }

    if (phase === 1) {
      (o.discovery || []).forEach(function (p) { card.appendChild(el("p", null, esc(p))); });
      if (o.joabOffer) card.appendChild(verseCard(o.joabOffer));
      var ch = o.choice || {};
      card.appendChild(el("p", null, "<strong>" + esc(ch.prompt || "What do you answer?") + "</strong>"));
      var box = el("div", "be-choices");
      var buttons = [];
      (ch.options || []).forEach(function (opt) {
        var b = el("button", "be-choice", esc(opt.label || ""));
        b.addEventListener("click", function () {
          try {
            buttons.forEach(function (x) { x.disabled = true; });
            b.classList.add("be-picked");
            // The player chooses — but the text decides the story.
            var resp = el("div", opt.faithful ? "be-faithful be-fade" : "be-fade");
            resp.appendChild(el("p", null, esc(opt.response || "")));
            card.appendChild(resp);
            if (ch.landing) card.appendChild(verseCard(ch.landing, "be-fade"));
            var actions = actionsRow();
            actions.appendChild(btn("Joab has heard enough →", function () {
              state.oakPhase = 2; renderOak();
            }, "be-pop"));
            card.appendChild(actions);
          } catch (e) { /* keep the view alive */ }
        });
        buttons.push(b);
        box.appendChild(b);
      });
      card.appendChild(box);
      wrap.appendChild(card);
      return;
    }

    if (phase === 2) {
      var dt = o.darts || {};
      if (dt.lead) card.appendChild(el("p", null, esc(dt.lead)));
      if (dt.quote) card.appendChild(verseCard(dt.quote));
      if (dt.after) card.appendChild(el("p", null, esc(dt.after)));
      var actions2 = actionsRow();
      actions2.appendChild(btn("A pit, and a heap of stones →", function () {
        state.oakPhase = 3; renderOak();
      }, "be-pop"));
      card.appendChild(actions2);
      wrap.appendChild(card);
      return;
    }

    // phase 3: the burial, the pillar, the historians
    var bu = o.burial || {};
    if (bu.quote) card.appendChild(verseCard(bu.quote));
    if (bu.pillar) card.appendChild(verseCard(bu.pillar));
    if (bu.pillarNote) card.appendChild(el("p", "be-faithful", esc(bu.pillarNote)));
    wrap.appendChild(card);

    (o.historianNotes || []).forEach(function (n) { wrap.appendChild(noteCard(n)); });

    var actions3 = actionsRow();
    actions3.appendChild(btn("Now — who will tell the king? →", advanceStage, "be-pop"));
    wrap.appendChild(actions3);
  }

  // ---------- Stage 4: THE TWO RUNNERS ----------

  function roadTrack(lead) {
    // two runners on the road to Mahanaim; Ahimaaz out in front by the plain
    var track = el("div", "be-track");
    var a = el("span", "be-runner be-bob", "🏃<span class=\"be-runner-tag\">Ahimaaz</span>");
    a.style.left = (lead ? 64 : 40) + "%";
    var c = el("span", "be-runner be-bob", "🏃<span class=\"be-runner-tag\">Cushi</span>");
    c.style.left = (lead ? 18 : 8) + "%";
    track.appendChild(c);
    track.appendChild(a);
    return track;
  }

  function renderRunners() {
    var wrap = renderShell();
    var d = data();
    if (!wrap || !d) { renderPlaceholder(); return; }
    var r = d.runners;
    var phase = state.runnersPhase || 0;

    var card = el("div", "card be-fade");
    card.appendChild(el("h3", "be-heading", esc(r.heading || "The Two Runners")));

    if (phase === 0) {
      (r.intro || []).forEach(function (p) { card.appendChild(el("p", null, esc(p))); });
      card.appendChild(roadTrack(true));
      card.appendChild(el("p", null, "<strong>" + esc(r.choicePrompt || "Which runner do you follow?") + "</strong>"));
      var box = el("div", "be-choices");
      var buttons = [];
      (r.choices || []).forEach(function (choice) {
        var b = el("button", "be-choice", esc(choice.label || ""));
        b.addEventListener("click", function () {
          try {
            buttons.forEach(function (x) { x.disabled = true; });
            b.classList.add("be-picked");
            state.runnerChoice = choice.id;
            var resp = el("div", "be-fade");
            resp.appendChild(el("p", null, esc(choice.response || "")));
            card.appendChild(resp);
            var actions = actionsRow();
            actions.appendChild(btn("The walls of Mahanaim rise ahead →", function () {
              state.runnersPhase = 1; renderRunners();
            }, "be-pop"));
            card.appendChild(actions);
          } catch (e) { /* keep the view alive */ }
        });
        buttons.push(b);
        box.appendChild(b);
      });
      card.appendChild(box);
      wrap.appendChild(card);
      return;
    }

    if (phase === 1) {
      var w = r.watchman || {};
      if (w.lead) card.appendChild(el("p", null, esc(w.lead)));
      card.appendChild(roadTrack(true));
      if (w.quote) card.appendChild(verseCard(w.quote));
      if (w.note) card.appendChild(el("p", "be-faithful", esc(w.note)));
      var actions1 = actionsRow();
      actions1.appendChild(btn("The first runner reaches the gate →", function () {
        state.runnersPhase = 2; renderRunners();
      }, "be-pop"));
      card.appendChild(actions1);
      wrap.appendChild(card);
      return;
    }

    // phase 2: both arrivals, in text order — Ahimaaz first, then Cushi
    var order = (r.arrivals || []).slice();
    if (state.runnerChoice === "cushi") {
      // the player ran with Cushi, but Ahimaaz still arrives first; note it
      card.appendChild(el("p", "be-sweep-hint",
        "You ran with Cushi &mdash; and watched Ahimaaz pull away and vanish ahead. By the time you reach the gate, the first interview is already over."));
    }
    order.forEach(function (a) {
      var block = el("div", "be-arrival");
      block.appendChild(el("h4", null, esc((a.emblem || "🏃") + " " + (a.runner || ""))));
      if (a.text) block.appendChild(el("p", null, esc(a.text)));
      if (a.quote) block.appendChild(verseCard(a.quote));
      if (a.note) block.appendChild(el("p", "be-faithful", esc(a.note)));
      card.appendChild(block);
    });
    wrap.appendChild(card);

    var actions2 = actionsRow();
    actions2.appendChild(btn("The king turns toward the stair →", advanceStage, "be-pop"));
    wrap.appendChild(actions2);
  }

  // ---------- Stage 5: THE CHAMBER OVER THE GATE ----------

  function renderChamber() {
    var wrap = renderShell();
    var d = data();
    if (!wrap || !d) { renderPlaceholder(); return; }
    var c = d.chamber;

    var card = el("div", "card be-quiet be-fade");
    card.appendChild(el("h3", "be-heading", esc(c.heading || "The Chamber over the Gate")));
    if (c.lead) card.appendChild(el("p", "be-hush", esc(c.lead)));
    if (c.lament) {
      var lam = el("blockquote", "be-lament");
      lam.appendChild(el("span", null, esc(c.lament.text || "")));
      lam.appendChild(el("cite", "be-lament-ref", "&mdash; " + esc(c.lament.ref || "2 Samuel 18:33") + " (KJV)"));
      card.appendChild(lam);
    }
    wrap.appendChild(card);

    // Quiet: the rest of the stage arrives on its own, unhurried.
    var revealed = false;
    function revealRest() {
      try {
        if (revealed) return;
        revealed = true;
        if (!document.body || !document.body.contains(wrap)) return;

        var m = el("div", "card be-slow");
        (c.mourning || []).forEach(function (p) { m.appendChild(el("p", null, esc(p))); });
        if (c.rebuke) {
          if (c.rebuke.lead) m.appendChild(el("p", null, esc(c.rebuke.lead)));
          if (c.rebuke.quote) m.appendChild(verseCard(c.rebuke.quote));
          if (c.rebuke.after) m.appendChild(el("p", null, esc(c.rebuke.after)));
        }
        wrap.appendChild(m);

        if (c.tally) {
          var t = el("div", "card be-tallycard be-slow");
          t.appendChild(el("h4", "be-note-title", esc(c.tally.title || "The count") +
            (c.tally.ref ? " · " + esc(c.tally.ref) : "")));
          var sides = el("div", "be-tally-sides");
          (c.tally.sides || []).forEach(function (s) {
            var box = el("div", "be-tally-side");
            box.appendChild(el("div", null, esc(s.emblem || "")));
            box.appendChild(el("div", "be-tally-name", esc(s.name || "")));
            box.appendChild(el("div", "be-tally-num", esc(String(s.dead != null ? s.dead : "?"))));
            box.appendChild(el("div", "be-tally-detail", esc(s.detail || "")));
            sides.appendChild(box);
          });
          t.appendChild(sides);
          if (c.tally.note) t.appendChild(el("p", "be-hush", esc(c.tally.note)));
          wrap.appendChild(t);
        }

        var refl = el("div", "card be-slow");
        if (c.reflection) {
          refl.appendChild(el("h4", "be-note-title", esc(c.reflection.title || "Reflection")));
          (c.reflection.paragraphs || []).forEach(function (p) { refl.appendChild(el("p", null, esc(p))); });
        }
        var chips = el("div", "be-chips");
        var replay = el("button", "be-chip chip", "↻ Walk the wood again");
        replay.addEventListener("click", function () {
          state.stage = 0; state.sweep = null; state.oakPhase = 0;
          state.runnersPhase = 0; state.runnerChoice = null;
          showStage(0);
        });
        chips.appendChild(replay);
        var read = el("button", "be-chip chip", "📖 Read 2 Samuel 18");
        read.addEventListener("click", function () { guardGoToChapter(18, "samuel2"); });
        chips.appendChild(read);
        var map = el("button", "be-chip chip", "🗺️ See Mahanaim on the map");
        map.addEventListener("click", function () { guardFocusLocation("mahanaim"); });
        chips.appendChild(map);
        refl.appendChild(chips);
        wrap.appendChild(refl);
      } catch (e) { /* grief needs no error card */ }
    }

    try {
      window.setTimeout(revealRest, 2400);
    } catch (e) {
      revealRest(); // no timers? show it plainly
    }
  }

  // ---------- public API ----------

  window.EphraimView = {
    init: function () {
      try {
        if (!root()) return;   // #view-battle not in the shell yet — do nothing
        injectStyles();
        if (!data()) { renderPlaceholder(); return; }
        state.stage = 0;
        state.unlocked = Math.max(state.unlocked, 0);
        state.sweep = null;
        state.oakPhase = 0;
        state.runnersPhase = 0;
        state.runnerChoice = null;
        showStage(0);
      } catch (e) {
        try { renderErrorCard(); } catch (e2) { /* give up quietly */ }
      }
    }
  };
})();
