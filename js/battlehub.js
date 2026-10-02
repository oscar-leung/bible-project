// js/battlehub.js — window.BattleHub (Game Dev)
// The armory: a chooser for the app's playable battles, rendered inside
// #view-battle. Each battle is its own module (BattleView, RephaimView,
// EphraimView) that fully repaints the root when opened; the hub just
// paints the selection screen and delegates. Defensive: a missing battle
// module renders as "coming soon" rather than a broken card.
(function () {
  "use strict";

  var BATTLES = [
    {
      id: "ziklag",
      emblem: "🔥",
      title: "The Raid on Ziklag",
      ref: "1 Samuel 30",
      blurb: "The town burns, the men talk of stoning David — then the ephod speaks, the Besor sorts the army, and a thrown-away slave turns the whole war.",
      module: "ZiklagView"
    },
    {
      id: "gibeon",
      emblem: "⚔️",
      title: "The Battle of Gibeon",
      ref: "2 Samuel 2:12–32",
      blurb: "Two kingdoms meet at the pool. Twelve against twelve, then the chase that starts a blood feud.",
      module: "BattleView"
    },
    {
      id: "rephaim",
      emblem: "🌊",
      title: "The Valley of Rephaim",
      ref: "2 Samuel 5:17–25",
      blurb: "The Philistines come up twice against the new-crowned king — and yesterday's plan is not today's guidance.",
      module: "RephaimView"
    },
    {
      id: "ephraim",
      emblem: "🌳",
      title: "The Wood of Ephraim",
      ref: "2 Samuel 18",
      blurb: "The wood devours more than the sword; a prince hangs in an oak; a father waits between two gates.",
      module: "EphraimView"
    }
  ];

  function root() {
    return document.getElementById("view-battle");
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

  var STYLE_ID = "battle-hub-style";
  var CSS = [
    "#view-battle .bh-wrap { max-width: 760px; margin: 0 auto; padding: 8px 0 40px; animation: bh-fade .4s ease; }",
    "@keyframes bh-fade { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }",
    "#view-battle .bh-title { font-family: Georgia, 'Times New Roman', serif; color: var(--gold, #b8860b); text-align: center; font-size: 2rem; margin: 12px 0 2px; letter-spacing: .03em; }",
    "#view-battle .bh-sub { text-align: center; color: var(--muted, #7a6f5d); font-style: italic; margin: 0 0 22px; }",
    "#view-battle .bh-grid { display: grid; gap: 14px; }",
    "#view-battle .bh-card { display: block; width: 100%; text-align: left; border: 1px solid var(--line, #d8cdb8); background: var(--panel, #fdf8ec); border-radius: 12px; padding: 16px 18px; cursor: pointer; color: var(--ink, #2b2417); transition: transform .15s ease, box-shadow .15s ease, border-color .15s ease; }",
    "#view-battle .bh-card:hover:not(:disabled) { transform: translateY(-2px); border-color: var(--gold, #b8860b); box-shadow: 0 6px 16px rgba(0,0,0,.12); }",
    "#view-battle .bh-card:disabled { opacity: .55; cursor: default; }",
    "#view-battle .bh-card-top { display: flex; align-items: baseline; gap: 10px; flex-wrap: wrap; }",
    "#view-battle .bh-card-emblem { font-size: 1.5rem; line-height: 1; }",
    "#view-battle .bh-card-title { font-family: Georgia, serif; font-size: 1.15rem; color: var(--accent, #1f3a5f); font-weight: 700; }",
    "#view-battle .bh-card-ref { font-size: .82rem; color: var(--muted, #7a6f5d); font-style: italic; }",
    "#view-battle .bh-card-blurb { margin: 8px 0 0; line-height: 1.5; color: var(--muted, #7a6f5d); font-size: .95rem; }",
    "#view-battle .bh-soon { display: inline-block; margin-left: 8px; font-size: .75rem; border: 1px dashed var(--line, #d8cdb8); border-radius: 999px; padding: 2px 10px; color: var(--muted, #7a6f5d); }",
    "@media (max-width: 720px) { #view-battle .bh-title { font-size: 1.5rem; } }"
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

  function moduleFor(b) {
    var m = b && window[b.module];
    return (m && typeof m.init === "function") ? m : null;
  }

  function renderHome() {
    var host = root();
    if (!host) return;
    injectStyles();
    host.innerHTML = "";
    var wrap = el("div", "bh-wrap");
    wrap.appendChild(el("h2", "bh-title", "⚔️ The Battles of Samuel"));
    wrap.appendChild(el("p", "bh-sub", "Playable retellings — every choice lands on the text. Choose your field."));

    var grid = el("div", "bh-grid");
    BATTLES.forEach(function (b) {
      var mod = moduleFor(b);
      var card = el("button", "bh-card");
      var top = el("div", "bh-card-top");
      top.appendChild(el("span", "bh-card-emblem", esc(b.emblem)));
      top.appendChild(el("span", "bh-card-title", esc(b.title)));
      top.appendChild(el("span", "bh-card-ref", esc(b.ref)));
      if (!mod) top.appendChild(el("span", "bh-soon", "coming soon"));
      card.appendChild(top);
      card.appendChild(el("p", "bh-card-blurb", esc(b.blurb)));
      if (mod) {
        card.addEventListener("click", function () { open(b.id); });
      } else {
        card.disabled = true;
      }
      grid.appendChild(card);
    });
    wrap.appendChild(grid);
    host.appendChild(wrap);
  }

  function open(id) {
    try {
      for (var i = 0; i < BATTLES.length; i++) {
        if (BATTLES[i].id === id) {
          var mod = moduleFor(BATTLES[i]);
          if (mod) { mod.init(); return; }
        }
      }
      renderHome();
    } catch (e) {
      try { renderHome(); } catch (e2) { /* give up quietly */ }
    }
  }

  window.BattleHub = {
    init: function () {
      try { renderHome(); } catch (e) { /* root missing — do nothing */ }
    },
    home: function () {
      try { renderHome(); } catch (e) { /* ignore */ }
    },
    open: open
  };
})();
