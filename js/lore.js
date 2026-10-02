/* js/lore.js — window.Lore (Historian)
   Makes every name in the story text linkable and referenceable: people
   and places get a hover note (who/what they are, where they appear) and
   one-tap ways to jump — a place flies the map there, a person opens
   their card. Non-invasive enhancer over the story view's rendered text;
   builds its index from window.CHARACTERS and window.LOCATIONS. */

(function () {
  "use strict";

  var STYLE_ID = "lore-styles";
  var index = null;    // name -> entry
  var nameRe = null;   // one alternation over all known names
  var tip = null;      // the single floating card
  var pinned = false;  // touch keeps the card open until a tap elsewhere

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function reEsc(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }

  function ensureStyles() {
    if (document.getElementById(STYLE_ID)) return;
    var css = "" +
      ".lore-term{border-bottom:1px dotted var(--gold,#b8860b);cursor:help;border-radius:2px;}" +
      ".lore-term:hover,.lore-term:focus-visible{background:color-mix(in srgb,var(--gold,#b8860b) 14%,transparent);outline:none;}" +
      ".lore-tip{position:fixed;z-index:70;max-width:320px;background:var(--panel,#fdf9ee);border:1px solid var(--gold,#b8860b);" +
      "border-radius:10px;box-shadow:0 10px 30px rgba(40,25,5,.25);padding:.7rem .85rem;font-family:var(--sans,sans-serif);" +
      "font-size:.85rem;line-height:1.5;color:var(--ink,#2e2418);animation:lore-in .15s ease;}" +
      "@keyframes lore-in{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:none}}" +
      "@media (prefers-reduced-motion: reduce){.lore-tip{animation:none;}}" +
      ".lore-tip h4{margin:0 0 .15rem;font-family:Georgia,serif;font-size:1rem;color:var(--ink,#2e2418);}" +
      ".lore-tip .lore-kind{font-size:.72rem;letter-spacing:.1em;text-transform:uppercase;color:var(--gold-text,#8a6a10);margin:0 0 .35rem;}" +
      ".lore-tip p{margin:.2rem 0 .45rem;}" +
      ".lore-tip .lore-go{display:flex;gap:.4rem;flex-wrap:wrap;}" +
      ".lore-tip .lore-btn{font:inherit;font-size:.78rem;cursor:pointer;border:1px solid var(--line,#dccfae);" +
      "background:var(--bg,#f6efdf);color:var(--accent,#1f4e79);border-radius:999px;padding:.25rem .65rem;}" +
      ".lore-tip .lore-btn:hover{background:var(--accent,#1f4e79);color:#fdf9ee;}";
    var s = document.createElement("style");
    s.id = STYLE_ID;
    s.textContent = css;
    document.head.appendChild(s);
  }

  // ---- index ---------------------------------------------------------------
  function shortName(name) { return String(name || "").replace(/ \(.*\)$/, ""); }

  function buildIndex() {
    index = {};
    var names = [];
    function add(name, entry) {
      if (!name || name.length < 3 || index[name]) return;
      index[name] = entry;
      names.push(name);
    }
    var chars = Array.isArray(window.CHARACTERS) ? window.CHARACTERS : [];
    for (var i = 0; i < chars.length; i++) {
      var c = chars[i];
      if (!c || !c.name) continue;
      add(shortName(c.name), {
        kind: "person", id: c.id, name: shortName(c.name),
        title: c.title || "", blurb: c.description || "", chapters: c.chapters
      });
    }
    var locs = Array.isArray(window.LOCATIONS) ? window.LOCATIONS : [];
    for (var j = 0; j < locs.length; j++) {
      var L = locs[j];
      if (!L || !L.name) continue;
      add(shortName(L.name), {
        kind: "place", id: L.id, name: shortName(L.name),
        title: L.modernName ? "modern: " + L.modernName : "",
        blurb: L.description || "", chapters: L.chapters
      });
    }
    if (!names.length) return false;
    names.sort(function (a, b) { return b.length - a.length; }); // longest first
    nameRe = new RegExp("\\b(" + names.map(reEsc).join("|") + ")\\b", "g");
    return true;
  }

  // ---- annotation ----------------------------------------------------------
  var SKIP = { A: 1, BUTTON: 1, SELECT: 1, OPTION: 1, LABEL: 1, H1: 1, H2: 1, SCRIPT: 1, STYLE: 1 };

  function annotate(container) {
    if (!nameRe || !container || container.getAttribute("data-lore-done")) return;
    container.setAttribute("data-lore-done", "1");
    var walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, {
      acceptNode: function (node) {
        var p = node.parentNode;
        for (var up = p; up && up !== container; up = up.parentNode) {
          if (SKIP[up.nodeName] || (up.classList && (up.classList.contains("lore-term") || up.classList.contains("chip")))) {
            return NodeFilter.FILTER_REJECT;
          }
        }
        return node.nodeValue && node.nodeValue.length > 2 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });
    var targets = [];
    while (walker.nextNode()) targets.push(walker.currentNode);
    for (var t = 0; t < targets.length; t++) {
      var node = targets[t];
      var text = node.nodeValue;
      nameRe.lastIndex = 0;
      if (!nameRe.test(text)) continue;
      nameRe.lastIndex = 0;
      var frag = document.createDocumentFragment();
      var last = 0, m;
      while ((m = nameRe.exec(text)) !== null) {
        if (m.index > last) frag.appendChild(document.createTextNode(text.slice(last, m.index)));
        var span = document.createElement("span");
        span.className = "lore-term";
        span.setAttribute("data-lore", m[1]);
        span.setAttribute("tabindex", "0");
        span.textContent = m[1];
        frag.appendChild(span);
        last = m.index + m[1].length;
      }
      if (last < text.length) frag.appendChild(document.createTextNode(text.slice(last)));
      node.parentNode.replaceChild(frag, node);
    }
  }

  function annotateStory() {
    var root = document.getElementById("view-story");
    if (!root) return;
    var zones = root.querySelectorAll(".story-summary, .story-keyverse, .story-histnote, .story-studynote");
    for (var i = 0; i < zones.length; i++) annotate(zones[i]);
  }

  // ---- the hover card --------------------------------------------------------
  function hideTip() {
    if (tip && tip.parentNode) tip.parentNode.removeChild(tip);
    tip = null;
    pinned = false;
  }

  function chapterChipsHtml(entry) {
    if (!Array.isArray(entry.chapters) || !entry.chapters.length) return "";
    var out = "";
    for (var i = 0; i < Math.min(4, entry.chapters.length); i++) {
      out += "<button type=\"button\" class=\"lore-btn\" data-go=\"ch\" data-n=\"" + entry.chapters[i] + "\">Ch. " + entry.chapters[i] + "</button>";
    }
    return out;
  }

  function showTip(term, anchor, pin) {
    var entry = index[term];
    if (!entry) return;
    hideTip();
    ensureStyles();
    tip = document.createElement("div");
    tip.className = "lore-tip";
    tip.setAttribute("role", "tooltip");
    var kindLine = entry.kind === "place" ? "🗺️ Place" : "👤 Person";
    if (entry.title) kindLine += " · " + esc(entry.title);
    var blurb = String(entry.blurb || "");
    if (blurb.length > 220) blurb = blurb.slice(0, 217).replace(/\s+\S*$/, "") + "…";
    tip.innerHTML =
      "<h4>" + esc(entry.name) + "</h4>" +
      "<p class=\"lore-kind\">" + kindLine + "</p>" +
      (blurb ? "<p>" + esc(blurb) + "</p>" : "") +
      "<div class=\"lore-go\">" +
      (entry.kind === "place"
        ? "<button type=\"button\" class=\"lore-btn\" data-go=\"map\">🗺️ Fly there</button>"
        : "<button type=\"button\" class=\"lore-btn\" data-go=\"family\">🌳 Family line</button>" +
          "<button type=\"button\" class=\"lore-btn\" data-go=\"people\">👥 Card</button>") +
      chapterChipsHtml(entry) +
      "</div>";
    document.body.appendChild(tip);

    // Position near the anchor, clamped to the viewport.
    var r = anchor.getBoundingClientRect();
    var tw = tip.offsetWidth, th = tip.offsetHeight;
    var x = Math.max(8, Math.min(window.innerWidth - tw - 8, r.left + r.width / 2 - tw / 2));
    var y = r.top - th - 8;
    if (y < 8) y = r.bottom + 8;
    tip.style.left = x + "px";
    tip.style.top = y + "px";
    pinned = !!pin;

    tip.addEventListener("click", function (ev) {
      var b = ev.target.closest("[data-go]");
      if (!b) return;
      ev.stopPropagation();
      var go = b.getAttribute("data-go");
      hideTip();
      if (go === "map" && window.App) window.App.focusLocation(entry.id);
      else if (go === "family" && window.App) {
        window.App.showView("family");
        if (window.FamilyTreeView && window.FamilyTreeView.focus) window.FamilyTreeView.focus(entry.id);
      } else if (go === "people" && window.App) {
        window.App.showView("characters");
        // best-effort scroll to the card bearing this name
        setTimeout(function () {
          var heads = document.querySelectorAll("#view-characters h3, #view-characters h4");
          for (var i = 0; i < heads.length; i++) {
            if ((heads[i].textContent || "").indexOf(entry.name) !== -1) {
              heads[i].scrollIntoView({ block: "center", behavior: "smooth" });
              break;
            }
          }
        }, 120);
      } else if (go === "ch" && window.App) {
        window.App.goToChapter(parseInt(b.getAttribute("data-n"), 10));
      }
    });
  }

  // ---- wiring ---------------------------------------------------------------
  function init() {
    if (!buildIndex()) return;
    ensureStyles();
    annotateStory();

    var root = document.getElementById("view-story");
    if (root) {
      var mo = new MutationObserver(function () { annotateStory(); });
      mo.observe(root, { childList: true, subtree: true });
    }

    document.addEventListener("mouseover", function (ev) {
      if (pinned) return;
      var term = ev.target.closest ? ev.target.closest(".lore-term") : null;
      if (term) showTip(term.getAttribute("data-lore"), term, false);
    });
    document.addEventListener("mouseout", function (ev) {
      if (pinned || !tip) return;
      var toTip = ev.relatedTarget && tip.contains(ev.relatedTarget);
      var toTerm = ev.relatedTarget && ev.relatedTarget.closest && ev.relatedTarget.closest(".lore-term");
      if (!toTip && !toTerm) hideTip();
    });
    document.addEventListener("click", function (ev) {
      var term = ev.target.closest ? ev.target.closest(".lore-term") : null;
      if (term) { ev.preventDefault(); showTip(term.getAttribute("data-lore"), term, true); return; }
      if (tip && !tip.contains(ev.target)) hideTip();
    });
    document.addEventListener("keydown", function (ev) {
      if (ev.key === "Escape") hideTip();
      if ((ev.key === "Enter" || ev.key === " ") && ev.target.classList && ev.target.classList.contains("lore-term")) {
        ev.preventDefault();
        showTip(ev.target.getAttribute("data-lore"), ev.target, true);
      }
    });
    window.addEventListener("scroll", function () { if (!pinned) hideTip(); }, true);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { setTimeout(init, 0); });
  } else {
    setTimeout(init, 0);
  }

  window.Lore = { refresh: annotateStory };
})();
