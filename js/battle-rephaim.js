// js/battle-rephaim.js — window.RephaimView (Game Dev)
// "The Valley of Rephaim" — interactive retelling of 2 Samuel 5:17–25,
// rendered entirely inside #view-battle. Plain script globals, no modules.
// Data lives in data/battle-rephaim.js (window.BATTLE_REPHAIM); this file is
// engine + rendering only. Defensive: missing section or data never throws.
(function () {
  "use strict";

  // ---------- helpers ----------

  function root() {
    return document.getElementById("view-battle");
  }

  function data() {
    var d = window.BATTLE_REPHAIM;
    if (d && d.context && d.perazim && d.mulberry && d.aftermath &&
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
    var card = el("blockquote", "br-verse" + (extraClass ? " " + extraClass : ""));
    if (quote && quote.text) card.appendChild(el("p", "br-verse-text", "&ldquo;" + esc(quote.text) + "&rdquo;"));
    if (quote && quote.ref) card.appendChild(el("cite", "br-verse-ref", "&mdash; " + esc(quote.ref) + " (KJV)"));
    return card;
  }

  function noteCard(note) {
    // note: { title, text }
    var card = el("div", "card br-note br-fade");
    card.appendChild(el("h4", "br-note-title", esc((note && note.title) || "Historian's note 📜")));
    card.appendChild(el("p", "br-note-text", esc((note && note.text) || "")));
    return card;
  }

  function actionsRow() {
    return el("div", "br-actions");
  }

  function btn(label, onClick, extraClass) {
    var b = el("button", "btn br-btn" + (extraClass ? " " + extraClass : ""), label);
    b.addEventListener("click", function () {
      try { onClick(); } catch (e) { /* never let a click kill the view */ }
    });
    return b;
  }

  function guardShowView(name) {
    if (window.App && typeof window.App.showView === "function") window.App.showView(name);
  }

  function guardHubHome() {
    if (window.BattleHub && typeof window.BattleHub.home === "function") window.BattleHub.home();
  }

  function guardGoToChapter(n, book) {
    if (window.App && typeof window.App.goToChapter === "function") window.App.goToChapter(n, book);
  }

  function guardFocusLocation(locId) {
    if (window.App && typeof window.App.focusLocation === "function" && locId) {
      window.App.focusLocation(locId);
    } else {
      guardShowView("map");
    }
  }

  // ---------- state ----------

  var state = {
    stage: 0,           // index into data().stages
    unlocked: 0,        // highest stage reached (chips up to here are clickable)
    perazimChoice: null,  // "attack" | "inquire"
    mulberryChoice: null, // "repeat" | "inquire"
    earlyStrikes: 0,      // times the player bestirred before the sign
    treeClicks: 0,        // easter-egg counter (persists across re-renders)
    eggFound: false,
    grove: null,          // per-run grove sub-state { windy, done }
    groveTimers: []       // pending timeouts for the wind cycle
  };

  function clearGroveTimers() {
    try {
      for (var i = 0; i < state.groveTimers.length; i++) clearTimeout(state.groveTimers[i]);
    } catch (e) { /* nothing to clear */ }
    state.groveTimers = [];
  }

  function later(fn, ms) {
    state.groveTimers.push(setTimeout(function () {
      try { fn(); } catch (e) { /* a gust must never break the view */ }
    }, ms));
  }

  // ---------- styles (every rule scoped under #view-battle) ----------

  var STYLE_ID = "battle-rephaim-style";
  var CSS = [
    "#view-battle .br-wrap { max-width: 760px; margin: 0 auto; padding: 8px 0 40px; }",
    "#view-battle .br-hubrow { display: flex; justify-content: flex-start; margin: 4px 0 0; }",
    "#view-battle .br-hubchip { border: 1px solid var(--line, #d8cdb8); background: var(--panel, #fdf8ec); color: var(--muted, #7a6f5d); border-radius: 999px; padding: 4px 12px; font-size: .8rem; cursor: pointer; transition: border-color .2s ease, color .2s ease; }",
    "#view-battle .br-hubchip:hover { border-color: var(--gold, #b8860b); color: var(--ink, #2b2417); }",
    "#view-battle .br-title { font-family: Georgia, 'Times New Roman', serif; color: var(--gold, #b8860b); text-align: center; font-size: 2rem; margin: 12px 0 2px; letter-spacing: .03em; }",
    "#view-battle .br-sub { text-align: center; color: var(--muted, #7a6f5d); font-style: italic; margin: 0 0 18px; }",
    "#view-battle .br-stagenav { display: flex; gap: 8px; flex-wrap: wrap; justify-content: center; margin: 0 0 20px; }",
    "#view-battle .br-stagechip { border: 1px solid var(--line, #d8cdb8); background: var(--panel, #fdf8ec); color: var(--muted, #7a6f5d); border-radius: 999px; padding: 6px 14px; font-size: .85rem; cursor: default; transition: border-color .2s ease, color .2s ease; }",
    "#view-battle .br-stagechip.br-open { cursor: pointer; color: var(--ink, #2b2417); }",
    "#view-battle .br-stagechip.br-open:hover { border-color: var(--gold, #b8860b); }",
    "#view-battle .br-stagechip.br-here { border-color: var(--gold, #b8860b); color: var(--gold, #b8860b); font-weight: 700; }",
    "#view-battle .br-stagechip.br-locked { opacity: .5; }",
    "#view-battle .br-heading { font-family: Georgia, serif; color: var(--accent, #1f3a5f); font-size: 1.4rem; margin: 0 0 12px; }",
    "#view-battle .br-verse { margin: 14px 0; padding: 12px 16px; border-left: 4px solid var(--gold, #b8860b); background: var(--panel, #fdf8ec); border-radius: 0 8px 8px 0; }",
    "#view-battle .br-verse-text { font-family: Georgia, serif; font-style: italic; margin: 0 0 6px; line-height: 1.55; }",
    "#view-battle .br-verse-ref { display: block; font-size: .85rem; color: var(--muted, #7a6f5d); font-style: normal; }",
    "#view-battle .br-note { border: 1px dashed var(--gold, #b8860b); background: var(--panel, #fdf8ec); margin: 16px 0; }",
    "#view-battle .br-note-title { font-family: Georgia, serif; color: var(--gold, #b8860b); margin: 0 0 8px; }",
    "#view-battle .br-note-text { margin: 0; line-height: 1.55; }",
    "#view-battle .br-actions { margin-top: 18px; display: flex; gap: 10px; flex-wrap: wrap; justify-content: center; }",
    "#view-battle .br-fade { animation: br-fade .4s ease; }",
    "@keyframes br-fade { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }",
    "#view-battle .br-pop { animation: br-pop .35s ease; }",
    "@keyframes br-pop { 0% { transform: scale(.95); } 60% { transform: scale(1.03); } 100% { transform: scale(1); } }",
    /* choices */
    "#view-battle .br-choices { display: grid; gap: 10px; margin-top: 12px; }",
    "#view-battle .br-choice { text-align: left; padding: 12px 14px; font-size: 1rem; cursor: pointer; border-radius: 8px; border: 1px solid var(--line, #d8cdb8); background: var(--panel, #fdf8ec); color: var(--ink, #2b2417); transition: border-color .15s ease, transform .1s ease; }",
    "#view-battle .br-choice:hover:not(:disabled) { border-color: var(--accent, #1f3a5f); transform: translateX(3px); }",
    "#view-battle .br-choice:disabled { cursor: default; opacity: .8; }",
    "#view-battle .br-choice.br-picked { border-color: var(--gold, #b8860b); font-weight: 600; }",
    "#view-battle .br-correction { border-left: 4px solid var(--accent, #1f3a5f); padding: 10px 14px; background: var(--panel, #fdf8ec); border-radius: 0 8px 8px 0; margin-top: 12px; font-style: italic; }",
    /* the breach at Baal-perazim */
    "#view-battle .br-breach { position: relative; height: 30px; max-width: 440px; margin: 14px auto 6px; border: 1px solid var(--line, #d8cdb8); border-radius: 8px; overflow: hidden; background: var(--panel, #fdf8ec); }",
    "#view-battle .br-breach::after { content: ''; position: absolute; top: 0; bottom: 0; left: -40%; width: 40%; background: linear-gradient(90deg, rgba(31,58,95,0), rgba(31,58,95,.5), rgba(31,58,95,0)); animation: br-burst 1.15s linear infinite; }",
    "@keyframes br-burst { from { left: -40%; } to { left: 100%; } }",
    "#view-battle .br-breach-glyphs { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; letter-spacing: 8px; font-size: .95rem; opacity: .85; }",
    "#view-battle .br-flavor { font-family: Georgia, serif; font-style: italic; text-align: center; margin: 4px 0 8px; line-height: 1.5; }",
    /* the grove of bekha'im (timing interaction) */
    "#view-battle .br-grove { display: flex; align-items: flex-end; justify-content: center; gap: 4px; padding: 20px 4px 8px; }",
    "#view-battle .br-tree { font-size: 2.1rem; line-height: 1; display: inline-block; transform-origin: 50% 100%; animation: br-sway 3.4s ease-in-out infinite alternate; cursor: default; }",
    "@keyframes br-sway { from { transform: rotate(-2deg); } to { transform: rotate(2deg); } }",
    "#view-battle .br-grove.br-windy .br-tree { animation: br-rustle .38s ease-in-out infinite alternate; }",
    "@keyframes br-rustle { from { transform: rotate(-9deg); } to { transform: rotate(9deg); } }",
    "#view-battle .br-tree.br-old { font-size: 2.6rem; cursor: pointer; transition: transform .15s ease; }",
    "#view-battle .br-tree.br-old:hover { filter: brightness(1.1); }",
    "#view-battle .br-wind-status { text-align: center; font-family: Georgia, serif; font-style: italic; min-height: 2.4em; margin: 6px 0 2px; color: var(--muted, #7a6f5d); }",
    "#view-battle .br-grove-card.br-windy-card .br-wind-status { color: var(--accent, #1f3a5f); font-weight: 700; }",
    "#view-battle .br-strike { display: block; margin: 10px auto 0; font-size: 1.05rem; padding: 12px 26px; animation: br-pulse 1.1s ease infinite; }",
    "@keyframes br-pulse { 0%,100% { box-shadow: 0 0 0 0 rgba(184,134,11,.5); } 50% { box-shadow: 0 0 0 9px rgba(184,134,11,0); } }",
    "#view-battle .br-lesson { border-left: 4px solid var(--accent, #1f3a5f); padding: 10px 14px; background: var(--panel, #fdf8ec); border-radius: 0 8px 8px 0; margin-top: 12px; font-style: italic; }",
    "#view-battle .br-hintline { font-size: .85rem; color: var(--muted, #7a6f5d); font-style: italic; text-align: center; margin: 10px 0 0; }",
    "#view-battle .br-egg { border: 2px solid var(--accent, #1f3a5f); background: var(--panel, #fdf8ec); }",
    /* aftermath */
    "#view-battle .br-beat { margin-bottom: 14px; }",
    "#view-battle .br-beat h4 { font-family: Georgia, serif; color: var(--accent, #1f3a5f); margin: 0 0 6px; }",
    "#view-battle .br-tallycard { text-align: center; }",
    "#view-battle .br-tally-sides { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; margin: 12px 0; }",
    "#view-battle .br-tally-side { flex: 1 1 200px; max-width: 300px; border: 1px solid var(--line, #d8cdb8); border-radius: 10px; padding: 14px 10px; background: var(--panel, #fdf8ec); }",
    "#view-battle .br-tally-num { font-family: Georgia, serif; font-size: 1.7rem; color: var(--gold, #b8860b); margin: 4px 0; }",
    "#view-battle .br-tally-name { font-weight: 700; color: var(--accent, #1f3a5f); }",
    "#view-battle .br-tally-detail { font-size: .85rem; color: var(--muted, #7a6f5d); }",
    "#view-battle .br-caption { font-size: .85rem; color: var(--muted, #7a6f5d); font-style: italic; margin: 6px 0 0; }",
    "#view-battle .br-chips { display: flex; gap: 10px; flex-wrap: wrap; justify-content: center; margin-top: 14px; }",
    "#view-battle .br-chip { display: inline-block; border: 1px solid var(--gold, #b8860b); color: var(--accent, #1f3a5f); background: var(--panel, #fdf8ec); border-radius: 999px; padding: 8px 16px; font-size: .9rem; cursor: pointer; transition: transform .15s ease, box-shadow .15s ease; }",
    "#view-battle .br-chip:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,.12); }",
    "@media (max-width: 720px) { #view-battle .br-title { font-size: 1.5rem; } #view-battle .br-tree { font-size: 1.7rem; } #view-battle .br-tree.br-old { font-size: 2.1rem; } }"
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

  // ---------- easter egg (the elder tree of the grove) ----------

  function makeOldTree() {
    var tree = el("span", "br-tree br-old", "🌳");
    tree.setAttribute("title", "An old, old tree");
    tree.setAttribute("role", "img");
    tree.setAttribute("aria-label", "The elder tree of the grove");
    tree.addEventListener("click", function () {
      try {
        tree.classList.remove("br-pop");
        void tree.offsetWidth; // restart the pop animation
        tree.classList.add("br-pop");
        if (state.eggFound) return;
        state.treeClicks++;
        var d = data();
        var need = (d && d.easterEgg && d.easterEgg.clicksNeeded) || 3;
        if (state.treeClicks >= need && d && d.easterEgg) {
          state.eggFound = true;
          var host = tree.parentNode;
          // climb to the nearest card so the egg lands after it
          while (host && host.parentNode && !/\bcard\b/.test(host.className || "")) host = host.parentNode;
          var egg = el("div", "card br-egg br-fade");
          egg.appendChild(el("h4", "br-note-title", esc(d.easterEgg.title || "You found something.")));
          egg.appendChild(el("p", "br-note-text", esc(d.easterEgg.text || "")));
          if (host && host.parentNode) host.parentNode.insertBefore(egg, host.nextSibling);
          else tree.parentNode.appendChild(egg);
        }
      } catch (e) { /* the grove keeps its secrets */ }
    });
    return tree;
  }

  // ---------- shell: hub chip + title + stage nav ----------

  function renderShell() {
    var host = root();
    var d = data();
    if (!host) return null;
    clearGroveTimers();
    host.innerHTML = "";
    var wrap = el("div", "br-wrap br-fade");

    var hubRow = el("div", "br-hubrow");
    var hub = el("button", "br-hubchip", "🏰 All battles");
    hub.setAttribute("title", "Back to all battles");
    hub.addEventListener("click", function () {
      try { guardHubHome(); } catch (e) { /* hub missing — stay put */ }
    });
    hubRow.appendChild(hub);
    wrap.appendChild(hubRow);

    wrap.appendChild(el("h2", "br-title", "⚔️ " + esc((d && d.title) || "The Valley of Rephaim")));
    wrap.appendChild(el("p", "br-sub", esc((d && d.subtitle) || "")));

    if (d) {
      var nav = el("div", "br-stagenav");
      d.stages.forEach(function (st, i) {
        var open = i <= state.unlocked;
        var cls = "br-stagechip" + (i === state.stage ? " br-here" : "") + (open ? " br-open" : " br-locked");
        var chip = el("button", cls, esc((st.emblem || "") + " " + (st.label || st.id || "")));
        chip.disabled = !open;
        if (open) chip.addEventListener("click", function () { showStage(i); });
        nav.appendChild(chip);
      });
      wrap.appendChild(nav);
    }
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
      if (id === "context") renderContext();
      else if (id === "perazim") renderPerazimIntro();
      else if (id === "mulberry") renderMulberryIntro();
      else if (id === "aftermath") renderAftermath();
      else renderContext();
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
    clearGroveTimers();
    host.innerHTML = "";
    var wrap = el("div", "br-wrap br-fade");
    var card = el("div", "card", null);
    card.appendChild(el("h3", "br-heading", "🕊️ The watchmen see nothing yet"));
    card.appendChild(el("p", null,
      "The account of the valley of Rephaim (data/battle-rephaim.js) has not been delivered yet. Check back soon &mdash; the Philistines are still on the coast road."));
    var actions = actionsRow();
    actions.appendChild(btn("Back to the story", function () { guardShowView("story"); }));
    card.appendChild(actions);
    wrap.appendChild(card);
    host.appendChild(wrap);
  }

  function renderErrorCard() {
    var host = root();
    if (!host) return;
    host.innerHTML = "<div class=\"card\"><p>The battle of Rephaim could not be staged. Please reload the page.</p></div>";
  }

  // ---------- choice helper (the inquire-of-the-LORD mechanic) ----------
  // Two options; the rash one gets an in-world course-correction, never a
  // fail screen. Either road ends at the same oracle — because in the text,
  // David asks. onward() renders the next scene.

  function renderInquiryChoice(card, decision, rashKey, recordKey, onward) {
    if (!decision) { card.appendChild(actionsRow()).appendChild(btn("🙏 Enquire of the LORD →", onward, "br-pop")); return; }
    card.appendChild(el("p", null, "<strong>" + esc(decision.prompt || "Choose:") + "</strong>"));
    var box = el("div", "br-choices");
    var buttons = [];

    function pick(b, key, opt) {
      try {
        buttons.forEach(function (x) { x.disabled = true; });
        b.classList.add("br-picked");
        state[recordKey] = key;
        var isRash = key === rashKey;
        var resp = el("div", (isRash ? "br-correction" : "br-correction") + " br-fade");
        resp.appendChild(el("p", null, esc((isRash ? opt.correction : opt.response) || "")));
        card.appendChild(resp);
        var actions = actionsRow();
        actions.appendChild(btn(isRash ? "🙏 Kneel with the king →" : "Hear the answer →", onward, "br-pop"));
        card.appendChild(actions);
      } catch (e) { /* keep the view alive */ }
    }

    var rash = decision[rashKey] || {};
    var faithful = decision.inquire || {};
    var bRash = el("button", "br-choice", esc(rash.label || "Attack at once"));
    bRash.addEventListener("click", function () { pick(bRash, rashKey, rash); });
    var bAsk = el("button", "br-choice", esc(faithful.label || "Enquire of the LORD"));
    bAsk.addEventListener("click", function () { pick(bAsk, "inquire", faithful); });
    buttons.push(bRash); buttons.push(bAsk);
    box.appendChild(bRash);
    box.appendChild(bAsk);
    card.appendChild(box);
  }

  // ---------- Stage 1: THE KING IN THE HOLD ----------

  function renderContext() {
    var wrap = renderShell();
    var d = data();
    if (!wrap || !d) { renderPlaceholder(); return; }
    var c = d.context;

    var card = el("div", "card br-fade");
    card.appendChild(el("h3", "br-heading", esc(c.heading || "The King in the Hold")));
    (c.paragraphs || []).forEach(function (p) { card.appendChild(el("p", null, esc(p))); });
    if (c.keyVerse) card.appendChild(verseCard(c.keyVerse));
    wrap.appendChild(card);

    if (c.historianNote) wrap.appendChild(noteCard(c.historianNote));

    var actions = actionsRow();
    actions.appendChild(btn("The Philistines spread in the valley →", advanceStage, "br-pop"));
    wrap.appendChild(actions);
  }

  // ---------- Stage 2: BAAL-PERAZIM ----------

  function renderPerazimIntro() {
    var wrap = renderShell();
    var d = data();
    if (!wrap || !d) { renderPlaceholder(); return; }
    var p = d.perazim;

    var card = el("div", "card br-fade");
    card.appendChild(el("h3", "br-heading", esc(p.heading || "Baal-perazim")));
    (p.intro || []).forEach(function (t) { card.appendChild(el("p", null, esc(t))); });
    if (p.spread) card.appendChild(verseCard(p.spread));
    renderInquiryChoice(card, p.decision, "attack", "perazimChoice", renderPerazimOracle);
    wrap.appendChild(card);
  }

  function renderPerazimOracle() {
    var wrap = renderShell();
    var d = data();
    if (!wrap || !d) { renderPlaceholder(); return; }
    var p = d.perazim;

    var card = el("div", "card br-fade");
    card.appendChild(el("h3", "br-heading", "The Answer"));
    if (p.oracle) card.appendChild(verseCard(p.oracle));
    card.appendChild(el("p", null,
      "No hedge, no condition, no sign to wait for &mdash; today the word is simply <strong>go</strong>. Mark that; it will matter tomorrow."));
    var actions = actionsRow();
    actions.appendChild(btn(esc(p.attackButton || "⚔️ Go up"), renderPerazimVictory, "br-pop"));
    card.appendChild(actions);
    wrap.appendChild(card);
  }

  function renderPerazimVictory() {
    var wrap = renderShell();
    var d = data();
    if (!wrap || !d) { renderPlaceholder(); return; }
    var p = d.perazim;

    var card = el("div", "card br-fade");
    card.appendChild(el("h3", "br-heading", "The Breach of Waters"));
    if (p.breachLine) card.appendChild(el("p", "br-flavor", esc(p.breachLine)));
    var breach = el("div", "br-breach");
    breach.appendChild(el("div", "br-breach-glyphs", "🌊 💥 🌊"));
    breach.setAttribute("role", "img");
    breach.setAttribute("aria-label", "The Philistine line bursting like a breach of waters");
    card.appendChild(breach);
    if (p.victory) card.appendChild(verseCard(p.victory, "br-fade"));
    wrap.appendChild(card);

    if (p.images) {
      var ic = el("div", "card br-fade");
      ic.appendChild(el("h3", "br-heading", "The Abandoned Gods"));
      if (p.images.text) ic.appendChild(el("p", null, esc(p.images.text)));
      if (p.images.quote) ic.appendChild(verseCard(p.images.quote));
      if (p.images.chronicles) ic.appendChild(verseCard(p.images.chronicles));
      ic.appendChild(el("p", "br-caption",
        "Two tellings of one bonfire &mdash; the historian's card below explains the difference in wording."));
      wrap.appendChild(ic);
    }

    if (p.historianNote) wrap.appendChild(noteCard(p.historianNote));

    var actions = actionsRow();
    actions.appendChild(btn("They come up yet again →", advanceStage, "br-pop"));
    wrap.appendChild(actions);
  }

  // ---------- Stage 3: THE MULBERRY TREES ----------

  function renderMulberryIntro() {
    var wrap = renderShell();
    var d = data();
    if (!wrap || !d) { renderPlaceholder(); return; }
    var m = d.mulberry;

    var card = el("div", "card br-fade");
    card.appendChild(el("h3", "br-heading", esc(m.heading || "The Mulberry Trees")));
    if (m.returnVerse) card.appendChild(verseCard(m.returnVerse));
    (m.intro || []).forEach(function (t) { card.appendChild(el("p", null, esc(t))); });
    renderInquiryChoice(card, m.decision, "repeat", "mulberryChoice", renderMulberryOracle);
    wrap.appendChild(card);
  }

  function renderMulberryOracle() {
    var wrap = renderShell();
    var d = data();
    if (!wrap || !d) { renderPlaceholder(); return; }
    var m = d.mulberry;

    var card = el("div", "card br-fade");
    card.appendChild(el("h3", "br-heading", "A Different Answer"));
    if (m.oracle) card.appendChild(verseCard(m.oracle));
    if (m.sign) card.appendChild(verseCard(m.sign));
    card.appendChild(el("p", null,
      "Yesterday: <em>go straight up.</em> Today: <em>do not go up at all</em> &mdash; circle behind them, and do not so much as move until you hear marching in the treetops. Same valley, opposite orders."));
    var actions = actionsRow();
    actions.appendChild(btn(esc(m.flankButton || "🌳 Fetch a compass behind them"), renderGrove, "br-pop"));
    card.appendChild(actions);
    wrap.appendChild(card);
  }

  // The timing interaction: wait for the sound of a going in the tops.

  function renderGrove() {
    var wrap = renderShell();
    var d = data();
    if (!wrap || !d) { renderPlaceholder(); return; }
    var m = d.mulberry;
    var g = m.grove || {};
    state.grove = { windy: false, done: false };
    var gs = state.grove;

    var card = el("div", "card br-fade br-grove-card");
    card.appendChild(el("h3", "br-heading", "In the Tops of the Trees"));
    if (g.instructions) card.appendChild(el("p", null, esc(g.instructions)));

    var grove = el("div", "br-grove");
    grove.setAttribute("role", "img");
    grove.setAttribute("aria-label", "A grove of trees; wait for the wind to move through their tops");
    var TREES = 7, OLD_AT = 4;
    for (var i = 0; i < TREES; i++) {
      var tree = (i === OLD_AT) ? makeOldTree() : el("span", "br-tree", "🌳");
      tree.style.animationDelay = (-(i * 0.47)).toFixed(2) + "s";
      grove.appendChild(tree);
    }
    card.appendChild(grove);

    var status = el("p", "br-wind-status", esc(g.quietLine || "The tops are still."));
    card.appendChild(status);

    var lesson = el("div", "br-lesson br-fade");
    lesson.style.display = "none";
    card.appendChild(lesson);

    var strike = btn(esc(g.strikeLabel || "⚔️ Bestir thyself!"), function () {
      if (gs.done) return;
      if (gs.windy) {
        // Struck on the sign — the rout.
        gs.done = true;
        clearGroveTimers();
        strike.disabled = true;
        strike.classList.remove("br-strike");
        lesson.style.display = "none";
        var rout = el("div", "br-fade");
        if (g.routLine) rout.appendChild(el("p", "br-flavor", esc(g.routLine)));
        if (g.routVerse) rout.appendChild(verseCard(g.routVerse));
        card.appendChild(rout);
        var actions = actionsRow();
        actions.appendChild(btn("Chase them out of the hills →", advanceStage, "br-pop"));
        card.appendChild(actions);
      } else {
        // Too early — the text-faithful lesson, gently. The watch goes on.
        state.earlyStrikes++;
        var lines = (Array.isArray(g.earlyLines) && g.earlyLines.length) ? g.earlyLines :
          ["The tops are still. The sign has not sounded. Wait."];
        lesson.innerHTML = esc(lines[(state.earlyStrikes - 1) % lines.length]);
        lesson.style.display = "";
        lesson.classList.remove("br-pop");
        void lesson.offsetWidth;
        lesson.classList.add("br-pop");
      }
    }, "br-strike");
    card.appendChild(strike);

    if (g.hint) card.appendChild(el("p", "br-hintline", esc(g.hint)));
    wrap.appendChild(card);

    if (m.historianNote) wrap.appendChild(noteCard(m.historianNote));

    // The wind cycle: still air, then the "sound of a going" for a short window.
    function windOn() {
      if (gs.done || state.grove !== gs) return;
      gs.windy = true;
      grove.classList.add("br-windy");
      card.classList.add("br-windy-card");
      status.innerHTML = esc(g.windLine || "🍃 A sound of a going runs through the tops of the trees!");
      later(windOff, 1700);
    }
    function windOff() {
      if (state.grove !== gs) return;
      gs.windy = false;
      grove.classList.remove("br-windy");
      card.classList.remove("br-windy-card");
      if (!gs.done) status.innerHTML = esc(g.quietLine || "The tops are still.");
      later(windOn, 2600 + Math.floor(Math.random() * 2400));
    }
    later(windOn, 3000 + Math.floor(Math.random() * 1800));
  }

  // ---------- Stage 4: FROM GEBA TO GAZER ----------

  function renderAftermath() {
    var wrap = renderShell();
    var d = data();
    if (!wrap || !d) { renderPlaceholder(); return; }
    var a = d.aftermath;

    var card = el("div", "card br-fade");
    card.appendChild(el("h3", "br-heading", esc(a.heading || "Aftermath")));
    (a.beats || []).forEach(function (beat) {
      var b = el("div", "br-beat");
      if (beat.title) b.appendChild(el("h4", null, esc(beat.title)));
      if (beat.quote) b.appendChild(verseCard(beat.quote));
      if (beat.text) b.appendChild(el("p", null, esc(beat.text)));
      card.appendChild(b);
    });
    wrap.appendChild(card);

    if (a.tally) {
      var t = el("div", "card br-tallycard br-fade");
      t.appendChild(el("h4", "br-note-title", esc(a.tally.title || "The reckoning") +
        (a.tally.ref ? " · " + esc(a.tally.ref) : "")));
      var sides = el("div", "br-tally-sides");
      (a.tally.sides || []).forEach(function (s) {
        var box = el("div", "br-tally-side");
        box.appendChild(el("div", null, esc(s.emblem || "")));
        box.appendChild(el("div", "br-tally-name", esc(s.name || "")));
        box.appendChild(el("div", "br-tally-num", esc(s.value != null ? String(s.value) : "?")));
        box.appendChild(el("div", "br-tally-detail", esc(s.detail || "")));
        sides.appendChild(box);
      });
      t.appendChild(sides);
      if (a.tally.note) t.appendChild(el("p", "br-caption", esc(a.tally.note)));
      wrap.appendChild(t);
    }

    if (a.historianNote) wrap.appendChild(noteCard(a.historianNote));

    var r = el("div", "card br-fade");
    r.appendChild(el("h4", "br-note-title", esc((a.reflection && a.reflection.title) || "Reflection")));
    ((a.reflection && a.reflection.paragraphs) || []).forEach(function (p) {
      r.appendChild(el("p", null, esc(p)));
    });
    var chips = el("div", "br-chips");

    var replay = el("button", "br-chip chip", "↻ Fight both battles again");
    replay.addEventListener("click", function () {
      state.stage = 0;
      state.perazimChoice = null;
      state.mulberryChoice = null;
      state.earlyStrikes = 0;
      state.grove = null;
      clearGroveTimers();
      showStage(0);
    });
    chips.appendChild(replay);

    var readChip = el("button", "br-chip chip",
      esc((a.chapterChip && a.chapterChip.label) || "📖 Read 2 Samuel 5"));
    readChip.addEventListener("click", function () {
      guardGoToChapter((d.chapter != null ? d.chapter : 5), d.book || "samuel2");
    });
    chips.appendChild(readChip);

    var mapChip = el("button", "br-chip chip",
      esc((a.mapChip && a.mapChip.label) || "🗺️ See it on the map"));
    mapChip.addEventListener("click", function () {
      guardFocusLocation((a.mapChip && a.mapChip.locId) || d.mapLocId || "jerusalem");
    });
    chips.appendChild(mapChip);

    r.appendChild(chips);
    wrap.appendChild(r);
  }

  // ---------- public API ----------

  window.RephaimView = {
    init: function () {
      try {
        if (!root()) return;   // #view-battle not in the shell yet — do nothing
        injectStyles();
        if (!data()) { renderPlaceholder(); return; }
        state.stage = 0;
        state.unlocked = Math.max(state.unlocked, 0);
        showStage(0);
      } catch (e) {
        try { renderErrorCard(); } catch (e2) { /* give up quietly */ }
      }
    }
  };
})();
