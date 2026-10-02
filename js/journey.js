/* js/journey.js — window.Journey (Game Dev)
   "Walk this chapter": a scene-by-scene, tap-to-advance reading of a
   chapter with a living 2D stage beside the words — story on one side,
   the scene painted and animated on the other, battles linked in where
   a playable battle exists. Non-invasive enhancer: it injects a button
   into the story view and renders its own overlay. Needs window.Stage;
   degrades to nothing without it. */

(function () {
  "use strict";

  var STYLE_ID = "journey-styles";
  var run = null; // { beats, i, book, num, key, label }

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  function ensureStyles() {
    if (document.getElementById(STYLE_ID)) return;
    var css = "" +
      ".story-walk{margin:.9rem .6rem 0 0;display:inline-flex;align-items:center;gap:.5rem;font:inherit;" +
      "font-size:.95rem;cursor:pointer;border:1px solid var(--gold,#b8860b);border-radius:.45rem;" +
      "padding:.45rem .9rem;background:color-mix(in srgb,var(--gold,#b8860b) 12%,transparent);" +
      "color:var(--ink,#2e2418);font-weight:600;}" +
      ".story-walk:hover{background:var(--gold,#b8860b);color:#fff;}" +

      ".jy-veil{position:fixed;inset:0;z-index:60;background:color-mix(in srgb,var(--bg,#f6efdf) 94%,black);" +
      "display:flex;flex-direction:column;}" +
      ".jy-top{display:flex;align-items:center;gap:.75rem;padding:.6rem .9rem;border-bottom:1px solid var(--line,#dccfae);}" +
      ".jy-ref{font-family:Georgia,serif;font-weight:700;color:var(--ink,#2e2418);}" +
      ".jy-dots{display:flex;gap:5px;flex:1;justify-content:center;flex-wrap:wrap;}" +
      ".jy-dot{width:9px;height:9px;border-radius:50%;background:var(--line,#dccfae);transition:background .2s,transform .2s;}" +
      ".jy-dot.on{background:var(--gold,#b8860b);transform:scale(1.25);}" +
      ".jy-dot.done{background:color-mix(in srgb,var(--gold,#b8860b) 55%,var(--line,#dccfae));}" +
      ".jy-close{font:inherit;font-size:1.05rem;border:0;background:transparent;cursor:pointer;color:var(--muted,#6e6049);padding:.2rem .5rem;}" +
      ".jy-close:hover{color:var(--ink,#2e2418);}" +

      ".jy-body{flex:1;display:flex;min-height:0;cursor:pointer;}" +
      ".jy-text{flex:1 1 52%;min-width:0;overflow-y:auto;padding:1.6rem 2rem;display:flex;flex-direction:column;justify-content:center;}" +
      ".jy-stagecol{flex:1 1 48%;min-width:0;padding:1.2rem;display:flex;align-items:center;justify-content:center;}" +
      ".jy-stagecol .jy-stagehost{width:100%;max-width:580px;aspect-ratio:4/3;max-height:100%;}" +
      ".jy-stagehost .stage-box{height:100%;}" +
      "@media (max-width:760px){.jy-body{flex-direction:column;}" +
      ".jy-stagecol{flex:0 0 38vh;padding:.7rem .9rem 0;}" +
      ".jy-text{padding:1rem 1.1rem 4.5rem;justify-content:flex-start;}}" +

      ".jy-kicker{font-size:.78rem;letter-spacing:.14em;text-transform:uppercase;color:var(--gold-text,#8a6a10);margin:0 0 .5rem;}" +
      ".jy-prose{font-family:Georgia,serif;font-size:1.18rem;line-height:1.75;color:var(--ink,#2e2418);margin:0;animation:jy-in .4s ease;}" +
      "@media (max-width:760px){.jy-prose{font-size:1.04rem;}}" +
      "@keyframes jy-in{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}" +
      "@media (prefers-reduced-motion: reduce){.jy-prose{animation:none;}}" +
      ".jy-quote{border-left:4px solid var(--gold,#b8860b);padding:.3rem 0 .3rem 1rem;font-style:italic;}" +
      ".jy-cite{display:block;margin-top:.55rem;font-style:normal;font-size:.85rem;color:var(--muted,#6e6049);}" +
      ".jy-say{margin:.45rem 0;animation:jy-in .4s ease;}" +
      ".jy-who{font-weight:700;color:var(--accent,#1f4e79);font-family:var(--sans,sans-serif);font-size:.85rem;letter-spacing:.04em;}" +
      ".jy-cta{margin-top:1.2rem;display:inline-flex;align-items:center;gap:.5rem;font:inherit;font-size:1rem;" +
      "cursor:pointer;border:0;border-radius:.5rem;padding:.6rem 1.1rem;background:var(--accent,#1f4e79);color:#fdf9ee;font-weight:700;}" +
      ".jy-cta:hover{background:var(--gold,#b8860b);}" +
      ".jy-finish{text-align:center;}" +
      ".jy-finish .jy-bigmark{font-size:3rem;line-height:1;}" +

      ".jy-foot{display:flex;align-items:center;justify-content:space-between;gap:.8rem;padding:.55rem .9rem;" +
      "border-top:1px solid var(--line,#dccfae);color:var(--muted,#6e6049);font-size:.85rem;}" +
      ".jy-nav{font:inherit;border:1px solid var(--line,#dccfae);background:var(--panel,#fdf9ee);border-radius:.45rem;" +
      "padding:.4rem .9rem;cursor:pointer;color:var(--ink,#2e2418);min-width:44px;}" +
      ".jy-nav:hover{border-color:var(--gold,#b8860b);}" +
      ".jy-nav[disabled]{opacity:.35;cursor:default;}";
    var s = document.createElement("style");
    s.id = STYLE_ID;
    s.textContent = css;
    document.head.appendChild(s);
  }

  // ---- chapter lookup ------------------------------------------------------
  var BOOKS = {
    samuel1: { label: "1 Samuel", global: "SAMUEL1", dlgKey: function (n) { return String(n); } },
    samuel2: { label: "2 Samuel", global: "SAMUEL2", dlgKey: function (n) { return "2s" + n; } },
    kings1: { label: "1 Kings", global: "KINGS1", dlgKey: function () { return null; } },
    kings2: { label: "2 Kings", global: "KINGS2", dlgKey: function () { return null; } }
  };
  // Chapters with a playable battle in the hub.
  var BATTLE_FOR = { "samuel2:2": "gibeon", "samuel2:5": "rephaim", "samuel2:18": "ephraim" };

  function chapterData(book, num) {
    var b = BOOKS[book];
    var d = b && window[b.global];
    if (!d || !Array.isArray(d.chapters)) return null;
    for (var i = 0; i < d.chapters.length; i++) {
      if (d.chapters[i] && d.chapters[i].num === num) return d.chapters[i];
    }
    return null;
  }

  function actorsIn(text) {
    // The two names the prose mentions FIRST, in prose order — so the
    // stage casts the scene the way the sentence does.
    var found = [];
    var list = Array.isArray(window.CHARACTERS) ? window.CHARACTERS : [];
    for (var i = 0; i < list.length; i++) {
      var name = list[i] && list[i].name;
      if (!name) continue;
      var short = String(name).replace(/ \(.*\)$/, "");
      var at = text.indexOf(short);
      if (at !== -1) found.push({ at: at, name: short });
    }
    found.sort(function (a, b) { return a.at - b.at; });
    var out = [];
    for (var f = 0; f < found.length && out.length < 2; f++) {
      if (out.indexOf(found[f].name) === -1) out.push(found[f].name);
    }
    return out;
  }

  // ---- beats ---------------------------------------------------------------
  function sentences(text) {
    var m = String(text || "").match(/[^.!?]+[.!?]+(\s|$)/g);
    return m ? m.map(function (s) { return s.trim(); }) : (text ? [text] : []);
  }

  function buildBeats(book, num) {
    var ch = chapterData(book, num);
    if (!ch) return null;
    var label = BOOKS[book].label + " " + num;
    var beats = [];

    beats.push({
      kicker: label + (ch.era ? " · " + ch.era : ""),
      html: "<p class=\"jy-prose\" style=\"font-size:1.6rem;font-weight:700;\">" + esc(ch.title || "") + "</p>",
      scene: window.Stage.detect(ch.summary || ch.title || ""),
      actors: actorsIn((ch.title || "") + ". " + (ch.summary || "")),
      sceneLabel: ch.title || ""
    });

    // The story, two sentences at a time.
    var sents = sentences(ch.summary);
    for (var i = 0; i < sents.length; i += 2) {
      var chunk = sents.slice(i, i + 2).join(" ");
      beats.push({
        kicker: "The story",
        html: "<p class=\"jy-prose\">" + esc(chunk) + "</p>",
        scene: window.Stage.detect(chunk),
        actors: actorsIn(chunk),
        sceneLabel: ""
      });
    }

    // Spoken scenes, where the dialogue data has them.
    var dk = BOOKS[book].dlgKey(num);
    var dlg = dk != null && window.DIALOGUE ? window.DIALOGUE[dk] : null;
    if (Array.isArray(dlg)) {
      for (var d = 0; d < dlg.length; d++) {
        var sc = dlg[d];
        if (!sc || !Array.isArray(sc.lines) || !sc.lines.length) continue;
        var html = "";
        for (var l = 0; l < Math.min(3, sc.lines.length); l++) {
          var ln = sc.lines[l];
          html += "<div class=\"jy-say\"><span class=\"jy-who\">" + esc(ln.speaker) +
            (ln.to ? " → " + esc(ln.to) : "") + "</span><br>" +
            "<span class=\"jy-prose jy-quote\" style=\"display:block;font-size:1.05rem;\">“" + esc(ln.quote) + "”</span></div>";
        }
        var speakers = [];
        for (var sl = 0; sl < sc.lines.length && speakers.length < 2; sl++) {
          var sp = sc.lines[sl].speaker;
          if (sp && speakers.indexOf(sp) === -1 && sp !== "the LORD") speakers.push(sp);
        }
        beats.push({
          kicker: "🗣 " + (sc.scene || "Voices"),
          html: html,
          scene: window.Stage.detect((sc.scene || "") + " " + (sc.commentary || "")),
          actors: speakers,
          sceneLabel: sc.scene || ""
        });
      }
    }

    if (ch.keyVerse && (ch.keyVerse.text || ch.keyVerse.ref || typeof ch.keyVerse === "string")) {
      var kvText = typeof ch.keyVerse === "string" ? ch.keyVerse : (ch.keyVerse.text || "");
      var kvRef = typeof ch.keyVerse === "string" ? "" : (ch.keyVerse.ref || "");
      beats.push({
        kicker: "Key verse",
        html: "<p class=\"jy-prose jy-quote\">“" + esc(kvText) + "”" +
          (kvRef ? "<cite class=\"jy-cite\">— " + esc(kvRef) + "</cite>" : "") + "</p>",
        scene: "scroll", actors: [], sceneLabel: kvRef
      });
    }

    if (ch.historianNote) {
      beats.push({
        kicker: "📜 The historian",
        html: "<p class=\"jy-prose\" style=\"font-size:1.02rem;\">" + esc(ch.historianNote) + "</p>",
        scene: "scroll", actors: [], sceneLabel: "From the historian's desk"
      });
    }

    // Playable battle for this chapter? Give it a beat of its own.
    var battleId = BATTLE_FOR[book + ":" + num];
    if (battleId && window.BattleHub && typeof window.BattleHub.open === "function") {
      beats.push({
        kicker: "⚔️ The battle",
        html: "<p class=\"jy-prose\">This chapter's battle is playable — step onto the field and fight it yourself.</p>" +
          "<button type=\"button\" class=\"jy-cta\" data-battle=\"" + esc(battleId) + "\">⚔️ Play this battle</button>",
        scene: "battle", actors: actorsIn(ch.summary || ""), sceneLabel: ch.title || ""
      });
    }

    beats.push({
      kicker: "Journey complete",
      html: "<div class=\"jy-finish\"><div class=\"jy-bigmark\">🌟</div>" +
        "<p class=\"jy-prose\" style=\"font-weight:700;\">" + esc(label) + " — walked.</p>" +
        "<p class=\"jy-prose\" style=\"font-size:1rem;color:var(--muted,#6e6049);\">Every scene of the chapter, seen through.</p>" +
        "<button type=\"button\" class=\"jy-cta\" data-seal=\"1\">✓ Seal it as read</button></div>",
      scene: "temple", actors: [], sceneLabel: label + " complete", finish: true
    });

    return { beats: beats, label: label };
  }

  // ---- overlay -------------------------------------------------------------
  function closeOverlay() {
    var v = document.querySelector(".jy-veil");
    if (v && v.parentNode) v.parentNode.removeChild(v);
    document.removeEventListener("keydown", onKeys, true);
    run = null;
  }

  function onKeys(ev) {
    if (!run) return;
    if (ev.key === "Escape") { ev.preventDefault(); closeOverlay(); }
    else if (ev.key === "ArrowRight" || ev.key === " ") { ev.preventDefault(); step(1); }
    else if (ev.key === "ArrowLeft") { ev.preventDefault(); step(-1); }
  }

  function step(delta) {
    if (!run) return;
    var next = run.i + delta;
    if (next < 0) return;
    if (next >= run.beats.length) return;
    run.i = next;
    paint();
  }

  function paint() {
    var v = document.querySelector(".jy-veil");
    if (!v || !run) return;
    var beat = run.beats[run.i];

    var dots = v.querySelectorAll(".jy-dot");
    for (var i = 0; i < dots.length; i++) {
      dots[i].className = "jy-dot" + (i === run.i ? " on" : (i < run.i ? " done" : ""));
    }

    var text = v.querySelector(".jy-text");
    text.innerHTML = "<p class=\"jy-kicker\">" + esc(beat.kicker) + "</p>" + beat.html;

    var battleBtn = text.querySelector("[data-battle]");
    if (battleBtn) {
      battleBtn.addEventListener("click", function (ev) {
        ev.stopPropagation();
        var id = battleBtn.getAttribute("data-battle");
        closeOverlay();
        if (window.App) window.App.showView("battle");
        window.BattleHub.open(id);
      });
    }
    var sealBtn = text.querySelector("[data-seal]");
    if (sealBtn) {
      sealBtn.addEventListener("click", function (ev) {
        ev.stopPropagation();
        var t = document.querySelector("#view-story .story-readtoggle");
        if (t && t.className.indexOf(" on") === -1) t.click();
        closeOverlay();
      });
    }

    window.Stage.render(v.querySelector(".jy-stagehost"), beat.scene, {
      actors: beat.actors, label: beat.sceneLabel
    });

    v.querySelector(".jy-back").disabled = run.i === 0;
    v.querySelector(".jy-next").textContent = run.i >= run.beats.length - 1 ? "Done" : "→";
    v.querySelector(".jy-count").textContent = (run.i + 1) + " / " + run.beats.length;

    if (beat.finish && window.Progress) {
      window.Progress.award("journey:" + run.key, 40, "Walked " + run.label);
    }
  }

  function openJourney(book, num) {
    if (!window.Stage) return;
    var built = buildBeats(book, num);
    if (!built) return;
    ensureStyles();
    closeOverlay();
    run = { beats: built.beats, i: 0, book: book, num: num, key: book + ":" + num, label: built.label };

    var v = document.createElement("div");
    v.className = "jy-veil";
    v.setAttribute("role", "dialog");
    v.setAttribute("aria-label", "Journey through " + built.label);
    var dots = "";
    for (var i = 0; i < built.beats.length; i++) dots += "<span class=\"jy-dot\"></span>";
    v.innerHTML =
      "<div class=\"jy-top\"><span class=\"jy-ref\">" + esc(built.label) + "</span>" +
      "<span class=\"jy-dots\">" + dots + "</span>" +
      "<button type=\"button\" class=\"jy-close\" aria-label=\"Close journey\">✕</button></div>" +
      "<div class=\"jy-body\"><div class=\"jy-text\"></div>" +
      "<div class=\"jy-stagecol\"><div class=\"jy-stagehost\"></div></div></div>" +
      "<div class=\"jy-foot\"><button type=\"button\" class=\"jy-nav jy-back\">←</button>" +
      "<span>tap, click, or use ← → to walk the chapter</span>" +
      "<span class=\"jy-count\"></span>" +
      "<button type=\"button\" class=\"jy-nav jy-next\">→</button></div>";
    document.body.appendChild(v);

    v.querySelector(".jy-close").addEventListener("click", closeOverlay);
    v.querySelector(".jy-back").addEventListener("click", function (ev) { ev.stopPropagation(); step(-1); });
    v.querySelector(".jy-next").addEventListener("click", function (ev) {
      ev.stopPropagation();
      if (run && run.i >= run.beats.length - 1) closeOverlay(); else step(1);
    });
    v.querySelector(".jy-body").addEventListener("click", function (ev) {
      if (ev.target.closest("button, a")) return;
      step(1);
    });
    document.addEventListener("keydown", onKeys, true);
    paint();
  }

  // ---- story-view injection -------------------------------------------------
  function currentStoryRef() {
    var bookBtn = document.querySelector("#view-story .story-bookbtn.active");
    var book = bookBtn ? bookBtn.getAttribute("data-book") : "samuel1";
    var numEl = document.querySelector("#view-story .story-chapnum");
    var m = numEl ? /(\d+)/.exec(numEl.textContent || "") : null;
    return { book: book || "samuel1", num: m ? parseInt(m[1], 10) : 1 };
  }

  function injectButton() {
    var toggle = document.querySelector("#view-story .story-readtoggle");
    if (!toggle || document.querySelector("#view-story .story-walk")) return;
    var ref = currentStoryRef();
    if (!chapterData(ref.book, ref.num)) return;
    ensureStyles();
    var b = document.createElement("button");
    b.type = "button";
    b.className = "story-walk";
    b.innerHTML = "▶ Walk this chapter";
    b.setAttribute("title", "Scene by scene, with the stage alongside");
    b.addEventListener("click", function () {
      var r = currentStoryRef();
      openJourney(r.book, r.num);
    });
    toggle.parentNode.insertBefore(b, toggle);
  }

  function init() {
    var root = document.getElementById("view-story");
    if (!root || !window.Stage) return;
    injectButton();
    var mo = new MutationObserver(function () { injectButton(); });
    mo.observe(root, { childList: true, subtree: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { setTimeout(init, 0); });
  } else {
    setTimeout(init, 0);
  }

  window.Journey = { open: openJourney, close: closeOverlay };
})();
