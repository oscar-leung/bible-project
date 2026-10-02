/* js/progress.js — window.Progress (Game Dev)
   The progression layer: lore-points (XP), ranks named for David's own
   road, badges per book, and reward toasts — so finishing 1 Samuel 1
   *gives* you something. Monotonic ledger in localStorage; awards are
   keyed so nothing is ever granted twice, and unmarking a chapter never
   takes points away. Non-invasive: listens to the story view's own
   read-toggle and exposes Progress.award() for other modules. */

(function () {
  "use strict";

  var LS_KEY = "quest.progress.v1";
  var STYLE_ID = "progress-styles";

  var RANKS = [
    { xp: 0, name: "Shepherd of Bethlehem", mark: "🐑" },
    { xp: 100, name: "Armor-Bearer", mark: "🛡️" },
    { xp: 250, name: "Harpist of the Court", mark: "🎵" },
    { xp: 450, name: "Captain of a Thousand", mark: "⚔️" },
    { xp: 700, name: "Outlaw of Adullam", mark: "🏔️" },
    { xp: 1000, name: "King in Hebron", mark: "👑" },
    { xp: 1400, name: "King of All Israel", mark: "🏛️" },
    { xp: 1900, name: "Builder of the Temple", mark: "🕍" },
    { xp: 2500, name: "Prophet of Fire", mark: "🔥" }
  ];

  var BOOKS = [
    { id: "samuel1", label: "1 Samuel", lsRead: "samuel1.story.readChapters", canonical: 31, badge: "🏺" },
    { id: "samuel2", label: "2 Samuel", lsRead: "samuel2.story.readChapters", canonical: 24, badge: "🎖️" },
    { id: "kings1", label: "1 Kings", lsRead: "kings1.story.readChapters", canonical: 22, badge: "⚜️" },
    { id: "kings2", label: "2 Kings", lsRead: "kings2.story.readChapters", canonical: 25, badge: "🔥" }
  ];

  var state = { xp: 0, awards: {}, badges: {} };

  function load() {
    try {
      var raw = JSON.parse(localStorage.getItem(LS_KEY) || "null");
      if (raw && typeof raw.xp === "number") {
        state.xp = raw.xp;
        state.awards = raw.awards || {};
        state.badges = raw.badges || {};
      }
    } catch (e) { /* fresh pilgrim */ }
  }
  function save() {
    try { localStorage.setItem(LS_KEY, JSON.stringify(state)); } catch (e) { /* private mode */ }
  }

  function rankFor(xp) {
    var r = RANKS[0], next = null;
    for (var i = 0; i < RANKS.length; i++) {
      if (xp >= RANKS[i].xp) r = RANKS[i];
      else { next = RANKS[i]; break; }
    }
    return { rank: r, next: next, level: RANKS.indexOf(r) + 1 };
  }

  function ensureStyles() {
    if (document.getElementById(STYLE_ID)) return;
    var css = "" +
      ".pg-pill{display:inline-flex;align-items:center;gap:.45rem;margin-left:.8rem;padding:.2rem .7rem;" +
      "border:1px solid var(--gold,#b8860b);border-radius:999px;background:color-mix(in srgb,var(--gold,#b8860b) 10%,transparent);" +
      "font-family:var(--sans,sans-serif);font-size:.74rem;color:var(--ink,#2e2418);cursor:pointer;white-space:nowrap;}" +
      ".pg-pill:hover{background:color-mix(in srgb,var(--gold,#b8860b) 22%,transparent);}" +
      ".pg-pill .pg-bar{width:52px;height:5px;border-radius:3px;background:var(--line,#dccfae);overflow:hidden;}" +
      ".pg-pill .pg-fill{display:block;height:100%;background:linear-gradient(90deg,var(--gold,#b8860b),var(--gold-bright,#d9a521));}" +

      ".pg-toasts{position:fixed;left:50%;bottom:18px;transform:translateX(-50%);z-index:80;display:flex;" +
      "flex-direction:column;gap:8px;align-items:center;pointer-events:none;}" +
      ".pg-toast{background:var(--panel,#fdf9ee);border:1px solid var(--gold,#b8860b);border-radius:999px;" +
      "box-shadow:0 8px 24px rgba(40,25,5,.25);padding:.5rem 1.1rem;font-family:var(--sans,sans-serif);" +
      "font-size:.88rem;color:var(--ink,#2e2418);animation:pg-pop .3s ease;}" +
      ".pg-toast b{color:var(--gold-text,#8a6a10);}" +
      ".pg-toast.pg-rankup{border-width:2px;font-size:1rem;padding:.7rem 1.4rem;}" +
      "@keyframes pg-pop{from{opacity:0;transform:translateY(14px) scale(.92)}to{opacity:1;transform:none}}" +
      ".pg-toast.pg-out{transition:opacity .4s ease,transform .4s ease;opacity:0;transform:translateY(8px);}" +
      "@media (prefers-reduced-motion: reduce){.pg-toast{animation:none;}}" +

      ".pg-veil{position:fixed;inset:0;z-index:75;background:rgba(20,14,5,.45);display:flex;align-items:center;justify-content:center;padding:1rem;}" +
      ".pg-panel{background:var(--panel,#fdf9ee);border:1px solid var(--gold,#b8860b);border-radius:14px;max-width:460px;" +
      "width:100%;max-height:86vh;overflow-y:auto;padding:1.2rem 1.4rem;box-shadow:0 18px 60px rgba(0,0,0,.4);" +
      "font-family:var(--sans,sans-serif);color:var(--ink,#2e2418);}" +
      ".pg-panel h3{margin:0 0 .2rem;font-family:Georgia,serif;}" +
      ".pg-panel .pg-ranknow{font-size:1.05rem;margin:.2rem 0 .75rem;color:var(--gold-text,#8a6a10);font-weight:700;}" +
      ".pg-panel .pg-bigbar{height:10px;border-radius:5px;background:var(--line,#dccfae);overflow:hidden;margin:.3rem 0 .2rem;}" +
      ".pg-panel .pg-bigbar span{display:block;height:100%;background:linear-gradient(90deg,var(--gold,#b8860b),var(--gold-bright,#d9a521));}" +
      ".pg-panel .pg-tonext{font-size:.8rem;color:var(--muted,#6e6049);margin:0 0 .9rem;}" +
      ".pg-row{display:flex;align-items:center;gap:.6rem;padding:.3rem 0;font-size:.9rem;}" +
      ".pg-row .pg-mark{width:1.6em;text-align:center;}" +
      ".pg-row.pg-locked{opacity:.45;}" +
      ".pg-row.pg-here{font-weight:700;color:var(--gold-text,#8a6a10);}" +
      ".pg-books{margin:1rem 0 .4rem;border-top:1px solid var(--line,#dccfae);padding-top:.8rem;}" +
      ".pg-bookrow{display:flex;align-items:center;gap:.6rem;padding:.25rem 0;font-size:.88rem;}" +
      ".pg-bookbar{flex:1;height:7px;border-radius:4px;background:var(--line,#dccfae);overflow:hidden;}" +
      ".pg-bookbar span{display:block;height:100%;background:var(--accent,#1f4e79);}" +
      ".pg-bookdone{filter:none;} .pg-bookpending{filter:grayscale(1);opacity:.5;}" +
      ".pg-closebtn{font:inherit;float:right;border:0;background:transparent;cursor:pointer;color:var(--muted,#6e6049);font-size:1.1rem;}";
    var s = document.createElement("style");
    s.id = STYLE_ID;
    s.textContent = css;
    document.head.appendChild(s);
  }

  // ---- toasts ---------------------------------------------------------------
  function toast(html, big) {
    ensureStyles();
    var host = document.querySelector(".pg-toasts");
    if (!host) {
      host = document.createElement("div");
      host.className = "pg-toasts";
      document.body.appendChild(host);
    }
    var t = document.createElement("div");
    t.className = "pg-toast" + (big ? " pg-rankup" : "");
    t.innerHTML = html;
    host.appendChild(t);
    setTimeout(function () { t.classList.add("pg-out"); }, big ? 4200 : 3000);
    setTimeout(function () { if (t.parentNode) t.parentNode.removeChild(t); }, big ? 4800 : 3600);
  }

  // ---- awards ---------------------------------------------------------------
  function award(key, xp, label, silent) {
    if (!key || state.awards[key]) return false;
    var before = rankFor(state.xp).level;
    state.awards[key] = 1;
    state.xp += xp;
    var after = rankFor(state.xp);
    save();
    renderPill();
    if (!silent) {
      toast("<b>+" + xp + " ✦</b> " + label);
      if (after.level > before) {
        setTimeout(function () {
          toast(after.rank.mark + " <b>Rank up!</b> You are now <b>" + after.rank.name + "</b>", true);
        }, 450);
      }
      checkBadges(false);
    } else {
      checkBadges(true);
    }
    return true;
  }

  function readSet(book) {
    try {
      var arr = JSON.parse(localStorage.getItem(book.lsRead) || "[]");
      return Array.isArray(arr) ? arr : [];
    } catch (e) { return []; }
  }

  function sweepReads(silent) {
    for (var b = 0; b < BOOKS.length; b++) {
      var book = BOOKS[b];
      var arr = readSet(book);
      for (var i = 0; i < arr.length; i++) {
        var n = parseInt(arr[i], 10);
        if (n >= 1) award("read:" + book.id + ":" + n, 25, book.label + " " + n + " — chapter read", silent);
      }
    }
  }

  function checkBadges(silent) {
    for (var b = 0; b < BOOKS.length; b++) {
      var book = BOOKS[b];
      if (state.badges[book.id]) continue;
      if (readSet(book).length >= book.canonical) {
        state.badges[book.id] = 1;
        save();
        if (!silent) toast(book.badge + " <b>Book sealed!</b> All of " + book.label + " read", true);
      }
    }
  }

  // ---- header pill + panel ----------------------------------------------------
  function renderPill() {
    ensureStyles();
    var host = document.querySelector(".app-header .titles .title-stack") || document.querySelector(".app-header .titles");
    if (!host) return;
    var pill = document.getElementById("pg-pill");
    if (!pill) {
      pill = document.createElement("button");
      pill.id = "pg-pill";
      pill.className = "pg-pill";
      pill.type = "button";
      pill.setAttribute("aria-label", "Your progression");
      pill.addEventListener("click", openPanel);
      host.appendChild(pill);
    }
    var r = rankFor(state.xp);
    var span = r.next ? (r.next.xp - r.rank.xp) : 1;
    var into = r.next ? (state.xp - r.rank.xp) : 1;
    pill.innerHTML = r.rank.mark + " Lv " + r.level + " · " + r.rank.name +
      " <span class=\"pg-bar\"><span class=\"pg-fill\" style=\"width:" + Math.round(100 * into / span) + "%\"></span></span>";
  }

  function openPanel() {
    ensureStyles();
    closePanel();
    var r = rankFor(state.xp);
    var v = document.createElement("div");
    v.className = "pg-veil";
    var rows = "";
    for (var i = 0; i < RANKS.length; i++) {
      var cls = RANKS[i].xp <= state.xp ? (RANKS[i] === r.rank ? "pg-here" : "") : "pg-locked";
      rows += "<div class=\"pg-row " + cls + "\"><span class=\"pg-mark\">" + RANKS[i].mark + "</span>" +
        "<span style=\"flex:1\">" + RANKS[i].name + "</span><span>" + RANKS[i].xp + " ✦</span></div>";
    }
    var books = "";
    for (var b = 0; b < BOOKS.length; b++) {
      var book = BOOKS[b];
      var read = readSet(book).length;
      var pct = Math.min(100, Math.round(100 * read / book.canonical));
      books += "<div class=\"pg-bookrow\"><span class=\"" + (state.badges[book.id] ? "pg-bookdone" : "pg-bookpending") + "\">" + book.badge + "</span>" +
        "<span style=\"width:76px\">" + book.label + "</span>" +
        "<span class=\"pg-bookbar\"><span style=\"width:" + pct + "%\"></span></span>" +
        "<span style=\"width:56px;text-align:right\">" + read + "/" + book.canonical + "</span></div>";
    }
    var span = r.next ? (r.next.xp - r.rank.xp) : 1;
    var into = r.next ? (state.xp - r.rank.xp) : 1;
    v.innerHTML = "<div class=\"pg-panel\">" +
      "<button type=\"button\" class=\"pg-closebtn\" aria-label=\"Close\">✕</button>" +
      "<h3>Your road so far</h3>" +
      "<p class=\"pg-ranknow\">" + r.rank.mark + " " + r.rank.name + " · " + state.xp + " ✦ lore</p>" +
      "<div class=\"pg-bigbar\"><span style=\"width:" + Math.round(100 * into / span) + "%\"></span></div>" +
      "<p class=\"pg-tonext\">" + (r.next ? (r.next.xp - state.xp) + " ✦ to " + r.next.name : "The road's end — every rank earned.") + "</p>" +
      rows +
      "<div class=\"pg-books\">" + books + "</div>" +
      "<p class=\"pg-tonext\" style=\"margin-top:.7rem\">Earn ✦ by reading chapters (+25), walking a chapter's journey (+40), and sealing whole books.</p>" +
      "</div>";
    document.body.appendChild(v);
    v.addEventListener("click", function (ev) { if (ev.target === v) closePanel(); });
    v.querySelector(".pg-closebtn").addEventListener("click", closePanel);
  }
  function closePanel() {
    var v = document.querySelector(".pg-veil");
    if (v && v.parentNode) v.parentNode.removeChild(v);
  }

  // ---- wiring -----------------------------------------------------------------
  function init() {
    load();
    // Backfill quietly: the chapters already read before this system existed
    // count toward the first shown rank, without a storm of toasts.
    sweepReads(true);
    renderPill();

    // Any read-toggle click may add a chapter; sweep (new ones toast).
    document.addEventListener("click", function (ev) {
      if (ev.target.closest && ev.target.closest(".story-readtoggle")) {
        setTimeout(function () { sweepReads(false); }, 80);
      }
    });
    document.addEventListener("keydown", function (ev) {
      if (ev.key === "Escape") closePanel();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { setTimeout(init, 0); });
  } else {
    setTimeout(init, 0);
  }

  window.Progress = { award: award, open: openPanel };
})();
