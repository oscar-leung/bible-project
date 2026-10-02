// js/battle.js — window.BattleView (Game Dev)
// "The Battle of Gibeon" — interactive retelling of 2 Samuel 2:12–32,
// rendered entirely inside #view-battle. Plain script globals, no modules.
// Data lives in data/battle-gibeon.js (window.BATTLE_GIBEON); this file is
// engine + rendering only. Defensive: missing section or data never throws.
(function () {
  "use strict";

  // ---------- helpers ----------

  function root() {
    return document.getElementById("view-battle");
  }

  function data() {
    var d = window.BATTLE_GIBEON;
    if (d && d.context && d.contest && d.pursuit && d.aftermath &&
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
    var card = el("blockquote", "bg-verse" + (extraClass ? " " + extraClass : ""));
    if (quote && quote.text) card.appendChild(el("p", "bg-verse-text", "&ldquo;" + esc(quote.text) + "&rdquo;"));
    if (quote && quote.ref) card.appendChild(el("cite", "bg-verse-ref", "&mdash; " + esc(quote.ref) + " (KJV)"));
    return card;
  }

  function noteCard(note) {
    // note: { title, text }
    var card = el("div", "card bg-note bg-fade");
    card.appendChild(el("h4", "bg-note-title", esc((note && note.title) || "Historian's note 📜")));
    card.appendChild(el("p", "bg-note-text", esc((note && note.text) || "")));
    return card;
  }

  function actionsRow() {
    return el("div", "bg-actions");
  }

  function btn(label, onClick, extraClass) {
    var b = el("button", "btn bg-btn" + (extraClass ? " " + extraClass : ""), label);
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

  // ---------- state ----------

  var state = {
    stage: 0,          // index into data().stages
    unlocked: 0,       // highest stage reached (chips up to here are clickable)
    poolClicks: 0,     // easter-egg counter (persists across re-renders)
    eggFound: false,
    contest: null,     // per-run contest sub-state
    pursuit: null      // per-run pursuit sub-state
  };

  // ---------- styles (every rule scoped under #view-battle) ----------

  var STYLE_ID = "battle-gibeon-style";
  var CSS = [
    "#view-battle .bg-wrap { max-width: 760px; margin: 0 auto; padding: 8px 0 40px; }",
    "#view-battle .bg-title { font-family: Georgia, 'Times New Roman', serif; color: var(--gold, #b8860b); text-align: center; font-size: 2rem; margin: 12px 0 2px; letter-spacing: .03em; }",
    "#view-battle .bg-sub { text-align: center; color: var(--muted, #7a6f5d); font-style: italic; margin: 0 0 18px; }",
    "#view-battle .bg-stagenav { display: flex; gap: 8px; flex-wrap: wrap; justify-content: center; margin: 0 0 20px; }",
    "#view-battle .bg-stagechip { border: 1px solid var(--line, #d8cdb8); background: var(--panel, #fdf8ec); color: var(--muted, #7a6f5d); border-radius: 999px; padding: 6px 14px; font-size: .85rem; cursor: default; transition: border-color .2s ease, color .2s ease; }",
    "#view-battle .bg-stagechip.bg-open { cursor: pointer; color: var(--ink, #2b2417); }",
    "#view-battle .bg-stagechip.bg-open:hover { border-color: var(--gold, #b8860b); }",
    "#view-battle .bg-stagechip.bg-here { border-color: var(--gold, #b8860b); color: var(--gold, #b8860b); font-weight: 700; }",
    "#view-battle .bg-stagechip.bg-locked { opacity: .5; }",
    "#view-battle .bg-heading { font-family: Georgia, serif; color: var(--accent, #1f3a5f); font-size: 1.4rem; margin: 0 0 12px; }",
    "#view-battle .bg-verse { margin: 14px 0; padding: 12px 16px; border-left: 4px solid var(--gold, #b8860b); background: var(--panel, #fdf8ec); border-radius: 0 8px 8px 0; }",
    "#view-battle .bg-verse-text { font-family: Georgia, serif; font-style: italic; margin: 0 0 6px; line-height: 1.55; }",
    "#view-battle .bg-verse-ref { display: block; font-size: .85rem; color: var(--muted, #7a6f5d); font-style: normal; }",
    "#view-battle .bg-note { border: 1px dashed var(--gold, #b8860b); background: var(--panel, #fdf8ec); margin: 16px 0; }",
    "#view-battle .bg-note-title { font-family: Georgia, serif; color: var(--gold, #b8860b); margin: 0 0 8px; }",
    "#view-battle .bg-note-text { margin: 0; line-height: 1.55; }",
    "#view-battle .bg-actions { margin-top: 18px; display: flex; gap: 10px; flex-wrap: wrap; justify-content: center; }",
    "#view-battle .bg-fade { animation: bg-fade .4s ease; }",
    "@keyframes bg-fade { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }",
    "#view-battle .bg-pop { animation: bg-pop .35s ease; }",
    "@keyframes bg-pop { 0% { transform: scale(.95); } 60% { transform: scale(1.03); } 100% { transform: scale(1); } }",
    /* mini-map */
    "#view-battle .bg-map-card { text-align: center; }",
    "#view-battle .bg-map svg { width: 100%; max-width: 420px; height: auto; }",
    "#view-battle .bg-map-caption { font-size: .85rem; color: var(--muted, #7a6f5d); font-style: italic; margin: 6px 0 0; }",
    "#view-battle .bg-route { fill: none; stroke-width: 2.5; stroke-dasharray: 6 5; animation: bg-march 1.6s linear infinite; }",
    "@keyframes bg-march { to { stroke-dashoffset: -22; } }",
    "#view-battle .bg-route-israel { stroke: #a0522d; }",
    "#view-battle .bg-route-judah { stroke: var(--accent, #1f3a5f); }",
    "#view-battle .bg-jordan { fill: none; stroke: var(--accent, #1f3a5f); stroke-width: 3; opacity: .35; }",
    "#view-battle .bg-place-dot { fill: var(--gold, #b8860b); }",
    "#view-battle .bg-place-dot.bg-meeting { fill: #b71c1c; }",
    "#view-battle .bg-place-label { font: 700 12px Georgia, serif; fill: var(--ink, #2b2417); }",
    "#view-battle .bg-place-note { font: italic 9px Georgia, serif; fill: var(--muted, #7a6f5d); }",
    /* the pool (clickable easter-egg target) */
    "#view-battle .bg-pool { width: 88px; height: 88px; border-radius: 50%; margin: 0 auto; background: radial-gradient(circle at 35% 30%, #9ec9e8, var(--accent, #1f3a5f)); border: 4px solid var(--line, #d8cdb8); box-shadow: inset 0 4px 10px rgba(0,0,0,.35); cursor: pointer; position: relative; flex: 0 0 auto; transition: transform .15s ease; }",
    "#view-battle .bg-pool:hover { transform: scale(1.04); }",
    "#view-battle .bg-pool::after { content: '≈'; position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; color: rgba(255,255,255,.75); font-size: 1.6rem; }",
    "#view-battle .bg-pool-ripple { animation: bg-ripple .45s ease; }",
    "@keyframes bg-ripple { 0% { transform: scale(1); } 40% { transform: scale(1.12); } 100% { transform: scale(1); } }",
    "#view-battle .bg-egg { border: 2px solid var(--accent, #1f3a5f); background: var(--panel, #fdf8ec); }",
    /* contest arena */
    "#view-battle .bg-arena { display: flex; align-items: center; justify-content: center; gap: 26px; padding: 22px 8px; }",
    "#view-battle .bg-champ { font-size: 2.3rem; line-height: 1; position: relative; transition: transform .5s ease, opacity .5s ease; }",
    "#view-battle .bg-champ .bg-champ-tag { display: block; font-size: .7rem; text-align: center; color: var(--muted, #7a6f5d); font-family: Georgia, serif; }",
    "#view-battle .bg-champ.bg-enter-l { animation: bg-enter-l .5s ease; }",
    "#view-battle .bg-champ.bg-enter-r { animation: bg-enter-r .5s ease; }",
    "@keyframes bg-enter-l { from { opacity: 0; transform: translateX(-36px); } to { opacity: 1; transform: none; } }",
    "@keyframes bg-enter-r { from { opacity: 0; transform: translateX(36px); } to { opacity: 1; transform: none; } }",
    "#view-battle .bg-champ.bg-fallen-l { transform: rotate(-80deg) translateY(10px); opacity: .35; }",
    "#view-battle .bg-champ.bg-fallen-r { transform: rotate(80deg) translateY(10px); opacity: .35; }",
    "#view-battle .bg-tally { display: flex; justify-content: space-between; gap: 8px; font-size: .9rem; color: var(--muted, #7a6f5d); margin-bottom: 10px; flex-wrap: wrap; }",
    "#view-battle .bg-tally strong { color: var(--accent, #1f3a5f); }",
    "#view-battle .bg-flavor { font-family: Georgia, serif; font-style: italic; text-align: center; min-height: 2.6em; margin: 4px 0 8px; line-height: 1.5; }",
    "#view-battle .bg-grapple { display: block; margin: 8px auto 0; font-size: 1.05rem; padding: 12px 26px; animation: bg-pulse 1.1s ease infinite; }",
    "@keyframes bg-pulse { 0%,100% { box-shadow: 0 0 0 0 rgba(184,134,11,.5); } 50% { box-shadow: 0 0 0 9px rgba(184,134,11,0); } }",
    "#view-battle .bg-result { text-align: center; color: var(--muted, #7a6f5d); font-size: .92rem; margin: 10px 0 0; }",
    "#view-battle .bg-fallen-row { text-align: center; font-size: 1rem; letter-spacing: 3px; min-height: 1.4em; margin-top: 10px; opacity: .8; word-break: break-all; }",
    /* pursuit chase track */
    "#view-battle .bg-track { position: relative; height: 74px; margin: 14px 0 4px; border-bottom: 3px dashed var(--line, #d8cdb8); overflow: hidden; }",
    "#view-battle .bg-runner { position: absolute; bottom: 2px; font-size: 2rem; line-height: 1; transition: left 1s ease, transform .6s ease, opacity .6s ease; }",
    "#view-battle .bg-runner .bg-runner-tag { display: block; font-size: .68rem; text-align: center; color: var(--muted, #7a6f5d); font-family: Georgia, serif; }",
    "#view-battle .bg-runner.bg-down { transform: rotate(90deg); opacity: .4; }",
    "#view-battle .bg-runner.bg-bob { animation: bg-bob .5s ease infinite alternate; }",
    "@keyframes bg-bob { from { bottom: 2px; } to { bottom: 8px; } }",
    "#view-battle .bg-choices { display: grid; gap: 10px; margin-top: 12px; }",
    "#view-battle .bg-choice { text-align: left; padding: 12px 14px; font-size: 1rem; cursor: pointer; border-radius: 8px; border: 1px solid var(--line, #d8cdb8); background: var(--panel, #fdf8ec); color: var(--ink, #2b2417); transition: border-color .15s ease, transform .1s ease; }",
    "#view-battle .bg-choice:hover:not(:disabled) { border-color: var(--accent, #1f3a5f); transform: translateX(3px); }",
    "#view-battle .bg-choice:disabled { cursor: default; opacity: .8; }",
    "#view-battle .bg-choice.bg-picked { border-color: var(--gold, #b8860b); font-weight: 600; }",
    "#view-battle .bg-mercy { border-left: 4px solid var(--accent, #1f3a5f); padding: 10px 14px; background: var(--panel, #fdf8ec); border-radius: 0 8px 8px 0; margin-top: 12px; font-style: italic; }",
    /* aftermath */
    "#view-battle .bg-beat { margin-bottom: 14px; }",
    "#view-battle .bg-beat h4 { font-family: Georgia, serif; color: var(--accent, #1f3a5f); margin: 0 0 6px; }",
    "#view-battle .bg-tallycard { text-align: center; }",
    "#view-battle .bg-tally-sides { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; margin: 12px 0; }",
    "#view-battle .bg-tally-side { flex: 1 1 200px; max-width: 280px; border: 1px solid var(--line, #d8cdb8); border-radius: 10px; padding: 14px 10px; background: var(--panel, #fdf8ec); }",
    "#view-battle .bg-tally-num { font-family: Georgia, serif; font-size: 2.2rem; color: var(--gold, #b8860b); margin: 4px 0; }",
    "#view-battle .bg-tally-name { font-weight: 700; color: var(--accent, #1f3a5f); }",
    "#view-battle .bg-tally-detail { font-size: .85rem; color: var(--muted, #7a6f5d); }",
    "#view-battle .bg-chips { display: flex; gap: 10px; flex-wrap: wrap; justify-content: center; margin-top: 14px; }",
    "#view-battle .bg-chip { display: inline-block; border: 1px solid var(--gold, #b8860b); color: var(--accent, #1f3a5f); background: var(--panel, #fdf8ec); border-radius: 999px; padding: 8px 16px; font-size: .9rem; cursor: pointer; transition: transform .15s ease, box-shadow .15s ease; }",
    "#view-battle .bg-chip:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,.12); }",
    "@media (max-width: 720px) { #view-battle .bg-title { font-size: 1.5rem; } #view-battle .bg-arena { gap: 14px; } #view-battle .bg-pool { width: 70px; height: 70px; } }"
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

  // ---------- easter egg (the pool of Gibeon) ----------

  function makePool() {
    var pool = el("div", "bg-pool");
    pool.setAttribute("title", "The pool of Gibeon");
    pool.setAttribute("role", "img");
    pool.setAttribute("aria-label", "The pool of Gibeon");
    pool.addEventListener("click", function () {
      try {
        pool.classList.remove("bg-pool-ripple");
        void pool.offsetWidth; // restart ripple animation
        pool.classList.add("bg-pool-ripple");
        if (state.eggFound) return;
        state.poolClicks++;
        var d = data();
        var need = (d && d.easterEgg && d.easterEgg.clicksNeeded) || 3;
        if (state.poolClicks >= need && d && d.easterEgg) {
          state.eggFound = true;
          var host = pool.parentNode;
          // climb to the nearest card so the egg lands after it
          while (host && host.parentNode && !/\bcard\b/.test(host.className || "")) host = host.parentNode;
          var egg = el("div", "card bg-egg bg-fade");
          egg.appendChild(el("h4", "bg-note-title", esc(d.easterEgg.title || "You found something.")));
          egg.appendChild(el("p", "bg-note-text", esc(d.easterEgg.text || "")));
          if (host && host.parentNode) host.parentNode.insertBefore(egg, host.nextSibling);
          else pool.parentNode.appendChild(egg);
        }
      } catch (e) { /* the pool keeps its secrets */ }
    });
    return pool;
  }

  // ---------- shell: title + stage nav ----------

  function renderShell() {
    var host = root();
    var d = data();
    if (!host) return null;
    host.innerHTML = "";
    var wrap = el("div", "bg-wrap bg-fade");
    if (window.BattleHub && typeof window.BattleHub.home === "function") {
      var back = el("button", "bg-stagechip bg-open", "🏰 All battles");
      back.style.cssText = "display:block;margin:0 auto 6px;";
      back.addEventListener("click", function () { window.BattleHub.home(); });
      wrap.appendChild(back);
    }
    wrap.appendChild(el("h2", "bg-title", "⚔️ " + esc((d && d.title) || "The Battle of Gibeon")));
    wrap.appendChild(el("p", "bg-sub", esc((d && d.subtitle) || "")));

    if (d) {
      var nav = el("div", "bg-stagenav");
      d.stages.forEach(function (st, i) {
        var open = i <= state.unlocked;
        var cls = "bg-stagechip" + (i === state.stage ? " bg-here" : "") + (open ? " bg-open" : " bg-locked");
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
      else if (id === "contest") renderContestIntro();
      else if (id === "pursuit") renderPursuitIntro();
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
    host.innerHTML = "";
    var wrap = el("div", "bg-wrap bg-fade");
    var card = el("div", "card", null);
    card.appendChild(el("h3", "bg-heading", "🕊️ The messengers have not yet arrived"));
    card.appendChild(el("p", null,
      "The account of the battle of Gibeon (data/battle-gibeon.js) has not been delivered yet. Check back soon &mdash; the armies are still on the road."));
    var actions = actionsRow();
    actions.appendChild(btn("Back to the story", function () { guardShowView("story"); }));
    card.appendChild(actions);
    wrap.appendChild(card);
    host.appendChild(wrap);
  }

  function renderErrorCard() {
    var host = root();
    if (!host) return;
    host.innerHTML = "<div class=\"card\"><p>The battle of Gibeon could not be staged. Please reload the page.</p></div>";
  }

  // ---------- Stage 1: CONTEXT ----------

  function renderContext() {
    var wrap = renderShell();
    var d = data();
    if (!wrap || !d) { renderPlaceholder(); return; }
    var c = d.context;

    var card = el("div", "card bg-fade");
    card.appendChild(el("h3", "bg-heading", esc(c.heading || "Two Kings, One Land")));
    (c.paragraphs || []).forEach(function (p) { card.appendChild(el("p", null, esc(p))); });
    if (c.keyVerse) card.appendChild(verseCard(c.keyVerse));
    wrap.appendChild(card);

    // mini-map
    if (c.map && Array.isArray(c.map.places)) {
      var mapCard = el("div", "card bg-map-card bg-fade");
      mapCard.appendChild(el("h4", "bg-note-title", "🗺️ The road to Gibeon"));
      var mapBox = el("div", "bg-map");
      mapBox.innerHTML = buildMiniMapSVG(c.map);
      mapCard.appendChild(mapBox);
      if (c.map.caption) mapCard.appendChild(el("p", "bg-map-caption", esc(c.map.caption)));
      wrap.appendChild(mapCard);
    }

    if (c.historianNote) wrap.appendChild(noteCard(c.historianNote));

    var actions = actionsRow();
    actions.appendChild(btn("To the pool of Gibeon →", advanceStage, "bg-pop"));
    wrap.appendChild(actions);
  }

  function buildMiniMapSVG(map) {
    try {
      var byId = {};
      (map.places || []).forEach(function (p) { if (p && p.id) byId[p.id] = p; });
      var out = [];
      out.push("<svg viewBox=\"0 0 320 260\" xmlns=\"http://www.w3.org/2000/svg\" aria-label=\"Map: forces converging on Gibeon\">");
      // Jordan river flavor line
      if (Array.isArray(map.jordan) && map.jordan.length > 1) {
        var pts = map.jordan.map(function (pt) { return pt[0] + "," + pt[1]; }).join(" ");
        out.push("<polyline class=\"bg-jordan\" points=\"" + esc(pts) + "\"/>");
        out.push("<text class=\"bg-place-note\" x=\"" + (map.jordan[1][0] + 6) + "\" y=\"" + (map.jordan[1][1] + 30) + "\">Jordan</text>");
      }
      // marching routes
      (map.routes || []).forEach(function (r) {
        var a = byId[r.from], b = byId[r.to];
        if (!a || !b) return;
        var mx = (a.x + b.x) / 2 + (r.side === "israel" ? -14 : 18);
        var my = (a.y + b.y) / 2 + (r.side === "israel" ? -10 : 6);
        out.push("<path class=\"bg-route bg-route-" + esc(r.side || "judah") + "\" d=\"M" +
          a.x + " " + a.y + " Q" + mx + " " + my + " " + b.x + " " + b.y + "\"/>");
      });
      // places
      (map.places || []).forEach(function (p) {
        var meeting = p.side === "meeting";
        out.push("<circle class=\"bg-place-dot" + (meeting ? " bg-meeting" : "") + "\" cx=\"" + p.x + "\" cy=\"" + p.y + "\" r=\"" + (meeting ? 7 : 5) + "\"/>");
        out.push("<text class=\"bg-place-label\" x=\"" + (p.x + 10) + "\" y=\"" + (p.y + 4) + "\">" + esc(p.name || p.id) + "</text>");
        if (p.note) out.push("<text class=\"bg-place-note\" x=\"" + (p.x + 10) + "\" y=\"" + (p.y + 16) + "\">" + esc(p.note) + "</text>");
      });
      out.push("</svg>");
      return out.join("");
    } catch (e) {
      return "";
    }
  }

  // ---------- Stage 2: THE CONTEST ----------

  function renderContestIntro() {
    var wrap = renderShell();
    var d = data();
    if (!wrap || !d) { renderPlaceholder(); return; }
    var c = d.contest;

    var card = el("div", "card bg-fade");
    card.appendChild(el("h3", "bg-heading", esc(c.heading || "The Contest")));
    (c.intro || []).forEach(function (p) { card.appendChild(el("p", null, esc(p))); });
    if (c.proposal) {
      card.appendChild(verseCard({ ref: c.proposal.ref, text: "Abner: " + (c.proposal.abner || "") }));
      if (c.proposal.joab) card.appendChild(verseCard({ ref: c.proposal.ref, text: "Joab: " + c.proposal.joab }));
    }
    var actions = actionsRow();
    actions.appendChild(btn("⚔️ Let them arise", beginContest, "bg-pop"));
    card.appendChild(actions);
    wrap.appendChild(card);
  }

  function beginContest() {
    var d = data();
    if (!d) { renderPlaceholder(); return; }
    state.contest = {
      round: 0,
      fallen: 0,
      total: Math.max(1, d.contest.pairsCount || 12),
      swift: 0,
      startedAt: 0
    };
    renderContestRound();
  }

  function renderContestRound() {
    var wrap = renderShell();
    var d = data();
    var cs = state.contest;
    if (!wrap || !d || !cs) { renderPlaceholder(); return; }
    var c = d.contest;

    var card = el("div", "card bg-fade");

    var tally = el("div", "bg-tally");
    tally.appendChild(el("span", null, "🦁 Champion <strong>" + (cs.round + 1) + "</strong> of " + cs.total));
    tally.appendChild(el("span", null, "Fallen: <strong>" + cs.fallen + "</strong> of " + (cs.total * 2)));
    card.appendChild(tally);

    var rounds = Array.isArray(c.rounds) && c.rounds.length ? c.rounds : ["Two young men step out to the pool."];
    card.appendChild(el("p", "bg-flavor", esc(rounds[cs.round % rounds.length])));

    var arena = el("div", "bg-arena");
    var left = el("div", "bg-champ bg-enter-l", "🤺<span class=\"bg-champ-tag\">Judah</span>");
    var pool = makePool();
    var right = el("div", "bg-champ bg-enter-r", "🤺<span class=\"bg-champ-tag\">Benjamin</span>");
    arena.appendChild(left);
    arena.appendChild(pool);
    arena.appendChild(right);
    card.appendChild(arena);

    var result = el("p", "bg-result", "");
    card.appendChild(result);
    var fallenRow = el("div", "bg-fallen-row", fallenGlyphs(cs.fallen));
    card.appendChild(fallenRow);

    cs.startedAt = Date.now();
    var done = false;
    var grapple = btn("⚔️ Seize him — by the head!", function () {
      if (done) return;
      done = true;
      var elapsed = Date.now() - cs.startedAt;
      grapple.disabled = true;
      grapple.classList.remove("bg-grapple");
      left.classList.add("bg-fallen-l");
      right.classList.add("bg-fallen-r");
      cs.fallen += 2;
      if (elapsed < 1500) cs.swift++;
      var speedNote = elapsed < 900 ? " Swift as thought —" :
                      elapsed < 2000 ? " In a single heartbeat —" : " After a long grapple —";
      result.innerHTML = esc(speedNote + " " + (c.grappleResult || "They fall together."));
      fallenRow.innerHTML = fallenGlyphs(cs.fallen);
      fallenRow.classList.add("bg-pop");

      var actions = actionsRow();
      var last = cs.round + 1 >= cs.total;
      actions.appendChild(btn(last ? "All twenty-four have fallen →" : "Field the next man →", function () {
        if (last) { renderContestEnd(); }
        else { cs.round++; renderContestRound(); }
      }, "bg-pop"));
      card.appendChild(actions);
    }, "bg-grapple");
    card.appendChild(grapple);

    card.appendChild(el("p", "bg-map-caption",
      "Psst &mdash; the pool itself is worth a closer look. Per the text, each pair catches hold and falls together; no champion prevails."));
    wrap.appendChild(card);
  }

  function fallenGlyphs(n) {
    var out = "";
    for (var i = 0; i < n; i++) out += "🗡";
    return out;
  }

  function renderContestEnd() {
    var wrap = renderShell();
    var d = data();
    if (!wrap || !d) { renderPlaceholder(); return; }
    var c = d.contest;

    var card = el("div", "card bg-fade");
    card.appendChild(el("h3", "bg-heading", "The Field of Sword-Edges"));
    if (c.outcome) card.appendChild(verseCard(c.outcome));
    if (c.aetiology) {
      card.appendChild(el("p", null,
        "<strong>" + esc(c.aetiology.name || "Helkath-hazzurim") + "</strong> &mdash; " +
        esc(c.aetiology.meaning || "") + ". " + esc(c.aetiology.text || "")));
    }
    wrap.appendChild(card);

    if (c.historianNote) wrap.appendChild(noteCard(c.historianNote));

    var actions = actionsRow();
    actions.appendChild(btn("The battle erupts →", advanceStage, "bg-pop"));
    wrap.appendChild(actions);
  }

  // ---------- Stage 3: THE PURSUIT ----------

  function renderPursuitIntro() {
    var wrap = renderShell();
    var d = data();
    if (!wrap || !d) { renderPlaceholder(); return; }
    var p = d.pursuit;

    var card = el("div", "card bg-fade");
    card.appendChild(el("h3", "bg-heading", esc(p.heading || "The Pursuit")));
    if (p.intro) card.appendChild(verseCard(p.intro));
    if (p.asahel) {
      card.appendChild(verseCard(p.asahel));
      if (p.asahel.note) card.appendChild(el("p", null, esc(p.asahel.note)));
    }
    var actions = actionsRow();
    actions.appendChild(btn("🏃 Give chase", beginPursuit, "bg-pop"));
    card.appendChild(actions);
    wrap.appendChild(card);
  }

  function beginPursuit() {
    var d = data();
    if (!d || !Array.isArray(d.pursuit.steps) || !d.pursuit.steps.length) {
      renderPlaceholder();
      return;
    }
    state.pursuit = { step: 0, choices: {} };
    renderPursuitStep();
  }

  function chaseTrack(gap, asahelDown) {
    // gap: 100 (far behind) → 0 (caught). Abner sits near the right edge;
    // Asahel's position closes on him as gap shrinks.
    var track = el("div", "bg-track");
    var abnerLeft = 78; // percent
    var asahelLeft = Math.max(2, abnerLeft - 8 - (gap * 0.62));
    var abner = el("span", "bg-runner" + (asahelDown ? "" : " bg-bob"), "🛡️<span class=\"bg-runner-tag\">Abner</span>");
    abner.style.left = abnerLeft + "%";
    var asahel = el("span", "bg-runner " + (asahelDown ? "bg-down" : "bg-bob"), "🏃<span class=\"bg-runner-tag\">Asahel</span>");
    asahel.style.left = asahelLeft + "%";
    track.appendChild(abner);
    track.appendChild(asahel);
    return track;
  }

  function renderPursuitStep() {
    var wrap = renderShell();
    var d = data();
    var ps = state.pursuit;
    if (!wrap || !d || !ps) { renderPlaceholder(); return; }
    var steps = d.pursuit.steps;
    var step = steps[ps.step];
    if (!step) { renderPursuitEnd(); return; }

    var card = el("div", "card bg-fade");
    card.appendChild(chaseTrack(typeof step.gap === "number" ? step.gap : 50, step.type === "outcome"));
    if (step.text) card.appendChild(el("p", null, esc(step.text)));
    if (step.quote) card.appendChild(verseCard(step.quote));

    function next() {
      ps.step++;
      if (ps.step < steps.length) renderPursuitStep();
      else renderPursuitEnd();
    }

    if (step.type === "decision" && Array.isArray(step.choices) && step.choices.length) {
      card.appendChild(el("p", null, "<strong>" + esc(step.prompt || "Choose:") + "</strong>"));
      var box = el("div", "bg-choices");
      var buttons = [];
      step.choices.forEach(function (choice) {
        var b = el("button", "bg-choice", esc(choice.label || ""));
        b.addEventListener("click", function () {
          try {
            buttons.forEach(function (x) { x.disabled = true; });
            b.classList.add("bg-picked");
            ps.choices[step.id || ("step" + ps.step)] = choice.id;
            // The player chooses — but the text decides the story.
            var resp = el("div", choice.mercy ? "bg-mercy bg-fade" : "bg-fade");
            resp.appendChild(el("p", null, esc(choice.response || "")));
            card.appendChild(resp);
            if (step.landing) card.appendChild(verseCard(step.landing, "bg-fade"));
            var actions = actionsRow();
            actions.appendChild(btn("The chase goes on →", next, "bg-pop"));
            card.appendChild(actions);
          } catch (e) { /* keep the view alive */ }
        });
        buttons.push(b);
        box.appendChild(b);
      });
      card.appendChild(box);
    } else {
      if (step.type === "outcome" && step.epitaph) {
        card.appendChild(el("p", "bg-flavor", esc(step.epitaph)));
      }
      var actions = actionsRow();
      var isLast = ps.step + 1 >= steps.length;
      actions.appendChild(btn(esc(step.button || (isLast ? "Onward →" : "Continue →")), next, "bg-pop"));
      card.appendChild(actions);
    }

    wrap.appendChild(card);
  }

  function renderPursuitEnd() {
    var wrap = renderShell();
    var d = data();
    if (!wrap || !d) { renderPlaceholder(); return; }

    if (d.pursuit.historianNote) wrap.appendChild(noteCard(d.pursuit.historianNote));

    var actions = actionsRow();
    actions.appendChild(btn("Sundown at the hill of Ammah →", advanceStage, "bg-pop"));
    wrap.appendChild(actions);
  }

  // ---------- Stage 4: AFTERMATH ----------

  function renderAftermath() {
    var wrap = renderShell();
    var d = data();
    if (!wrap || !d) { renderPlaceholder(); return; }
    var a = d.aftermath;

    var card = el("div", "card bg-fade");
    card.appendChild(el("h3", "bg-heading", esc(a.heading || "Aftermath")));
    (a.beats || []).forEach(function (beat) {
      var b = el("div", "bg-beat");
      if (beat.title) b.appendChild(el("h4", null, esc(beat.title)));
      if (beat.quote) b.appendChild(verseCard(beat.quote));
      if (beat.text) b.appendChild(el("p", null, esc(beat.text)));
      card.appendChild(b);
    });
    wrap.appendChild(card);

    if (a.tally) {
      var t = el("div", "card bg-tallycard bg-fade");
      t.appendChild(el("h4", "bg-note-title", esc(a.tally.title || "The count") +
        (a.tally.ref ? " · " + esc(a.tally.ref) : "")));
      var sides = el("div", "bg-tally-sides");
      (a.tally.sides || []).forEach(function (s) {
        var box = el("div", "bg-tally-side");
        box.appendChild(el("div", null, esc(s.emblem || "")));
        box.appendChild(el("div", "bg-tally-name", esc(s.name || "")));
        box.appendChild(el("div", "bg-tally-num", esc(String(s.dead != null ? s.dead : "?"))));
        box.appendChild(el("div", "bg-tally-detail", esc(s.detail || "")));
        sides.appendChild(box);
      });
      t.appendChild(sides);
      if (a.tally.note) t.appendChild(el("p", "bg-map-caption", esc(a.tally.note)));
      wrap.appendChild(t);
    }

    if (a.historianNote) wrap.appendChild(noteCard(a.historianNote));

    if (a.reflection) {
      var r = el("div", "card bg-fade");
      r.appendChild(el("h4", "bg-note-title", esc(a.reflection.title || "Reflection")));
      (a.reflection.paragraphs || []).forEach(function (p) { r.appendChild(el("p", null, esc(p))); });
      var chips = el("div", "bg-chips");
      if (a.reflection.continueChip) {
        var cont = el("button", "bg-chip chip", esc(a.reflection.continueChip.label || "Continue your study"));
        cont.addEventListener("click", function () {
          // The story view covers 1 Samuel; onward study lives in the reader's
          // own Bible — but return them to the app's story shelf if we can.
          if (window.App && typeof window.App.showView === "function") window.App.showView("story");
        });
        chips.appendChild(cont);
      }
      if (a.reflection.mapChip) {
        var m = el("button", "bg-chip chip", esc(a.reflection.mapChip.label || "View the map"));
        m.addEventListener("click", function () { guardFocusLocation(a.reflection.mapChip.locId); });
        chips.appendChild(m);
      }
      var replay = el("button", "bg-chip chip", "↻ Stage the battle again");
      replay.addEventListener("click", function () {
        state.stage = 0; state.contest = null; state.pursuit = null;
        showStage(0);
      });
      chips.appendChild(replay);
      r.appendChild(chips);
      wrap.appendChild(r);
    }
  }

  // ---------- public API ----------

  window.BattleView = {
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
