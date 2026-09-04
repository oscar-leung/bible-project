/* story.js — window.StoryView (Dev 2)
 * Renders the 1 Samuel chapter reader inside #view-story.
 * Plain script global, no modules. Reads window.SAMUEL1 / LOCATIONS / CHARACTERS.
 */
(function () {
  "use strict";

  var LS_LAST = "samuel1.story.lastChapter";
  var LS_READ = "samuel1.story.readChapters";
  var TOTAL = 31;

  var root = null;          // #view-story
  var current = 1;          // current chapter num
  var readSet = {};         // { "1": true, ... }

  /* ---------- storage (always wrapped) ---------- */

  function loadState() {
    try {
      var last = parseInt(localStorage.getItem(LS_LAST), 10);
      if (last >= 1 && last <= TOTAL) current = last;
    } catch (e) { /* private mode etc. */ }
    try {
      var raw = localStorage.getItem(LS_READ);
      if (raw) {
        var arr = JSON.parse(raw);
        if (Object.prototype.toString.call(arr) === "[object Array]") {
          for (var i = 0; i < arr.length; i++) {
            var n = parseInt(arr[i], 10);
            if (n >= 1 && n <= TOTAL) readSet[n] = true;
          }
        }
      }
    } catch (e) { readSet = {}; }
  }

  function saveLast() {
    try { localStorage.setItem(LS_LAST, String(current)); } catch (e) {}
  }

  function saveRead() {
    try {
      var arr = [];
      for (var k in readSet) if (readSet[k]) arr.push(parseInt(k, 10));
      arr.sort(function (a, b) { return a - b; });
      localStorage.setItem(LS_READ, JSON.stringify(arr));
    } catch (e) {}
  }

  function readCount() {
    var c = 0;
    for (var k in readSet) if (readSet[k]) c++;
    return c;
  }

  /* ---------- data helpers ---------- */

  function chapters() {
    var d = window.SAMUEL1;
    if (d && Object.prototype.toString.call(d.chapters) === "[object Array]") {
      return d.chapters;
    }
    return null;
  }

  function chapterByNum(num) {
    var list = chapters();
    if (!list) return null;
    for (var i = 0; i < list.length; i++) {
      if (list[i] && list[i].num === num) return list[i];
    }
    return null;
  }

  function maxChapter() {
    var list = chapters();
    if (!list || !list.length) return TOTAL;
    var m = 0;
    for (var i = 0; i < list.length; i++) {
      if (list[i] && list[i].num > m) m = list[i].num;
    }
    return m || TOTAL;
  }

  function prettify(id) {
    // "beth_shemesh" / "beth-shemesh" -> "Beth Shemesh"
    return String(id)
      .replace(/[_-]+/g, " ")
      .replace(/\b\w/g, function (ch) { return ch.toUpperCase(); });
  }

  function locationName(id) {
    var list = window.LOCATIONS;
    if (Object.prototype.toString.call(list) === "[object Array]") {
      for (var i = 0; i < list.length; i++) {
        if (list[i] && list[i].id === id && list[i].name) return list[i].name;
      }
    }
    return prettify(id);
  }

  function characterName(id) {
    var list = window.CHARACTERS;
    if (Object.prototype.toString.call(list) === "[object Array]") {
      for (var i = 0; i < list.length; i++) {
        if (list[i] && list[i].id === id && list[i].name) return list[i].name;
      }
    }
    return prettify(id);
  }

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  /* ---------- scoped styles ---------- */

  function injectStyles() {
    if (document.getElementById("story-view-styles")) return;
    var css = "" +
      "#view-story .story-nav-head{display:flex;align-items:baseline;justify-content:space-between;gap:.75rem;flex-wrap:wrap;margin-bottom:.6rem;}" +
      "#view-story .story-progress{font-size:.9rem;color:var(--muted);}" +
      "#view-story .story-readcount{font-size:.8rem;color:var(--gold);font-weight:600;}" +
      "#view-story .story-chapgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(2.4rem,1fr));gap:.35rem;margin-bottom:.75rem;}" +
      "#view-story .story-chapbtn{padding:.35rem 0;font-size:.85rem;text-align:center;border:1px solid var(--line);border-radius:.4rem;background:var(--panel);color:var(--ink);cursor:pointer;line-height:1.2;}" +
      "#view-story .story-chapbtn:hover{border-color:var(--accent);}" +
      "#view-story .story-chapbtn.current{background:var(--accent);color:#fff;border-color:var(--accent);font-weight:700;}" +
      "#view-story .story-chapbtn.read:not(.current){color:var(--gold);border-color:var(--gold);}" +
      "#view-story .story-chapbtn.read:after{content:\"\\2022\";display:block;font-size:.5rem;line-height:.4;}" +
      "#view-story .story-prevnext{display:flex;justify-content:space-between;align-items:center;gap:.5rem;margin:.75rem 0;}" +
      "#view-story .story-era{display:inline-block;font-size:.78rem;letter-spacing:.05em;text-transform:uppercase;color:var(--gold);border:1px solid var(--gold);border-radius:999px;padding:.15rem .7rem;margin-bottom:.5rem;}" +
      "#view-story .story-title{font-family:Georgia,'Times New Roman',serif;margin:.1rem 0 .75rem;}" +
      "#view-story .story-title .story-chapnum{color:var(--muted);font-weight:400;margin-right:.4rem;}" +
      "#view-story .story-summary{line-height:1.65;margin-bottom:1rem;}" +
      "#view-story .story-keyverse{margin:1rem 0;padding:.85rem 1.1rem;border-left:4px solid var(--accent);background:color-mix(in srgb,var(--accent) 7%,transparent);font-family:Georgia,'Times New Roman',serif;font-style:italic;line-height:1.6;}" +
      "#view-story .story-keyverse cite{display:block;margin-top:.45rem;font-style:normal;font-size:.85rem;color:var(--muted);}" +
      "#view-story .story-histnote{margin:1rem 0;padding:.85rem 1.1rem;border-left:4px solid var(--gold);background:color-mix(in srgb,var(--gold) 9%,transparent);border-radius:0 .4rem .4rem 0;}" +
      "#view-story .story-histnote h4{margin:0 0 .35rem;font-size:.85rem;letter-spacing:.04em;text-transform:uppercase;color:var(--gold);}" +
      "#view-story .story-histnote p{margin:0;line-height:1.6;font-size:.95rem;}" +
      "#view-story .story-chips{margin:.85rem 0 0;}" +
      "#view-story .story-chips h4{margin:0 0 .35rem;font-size:.8rem;letter-spacing:.04em;text-transform:uppercase;color:var(--muted);}" +
      "#view-story .story-chiprow{display:flex;flex-wrap:wrap;gap:.4rem;}" +
      "#view-story .story-chiprow .chip{cursor:pointer;}" +
      "#view-story .story-readtoggle{margin-top:1.1rem;display:inline-flex;align-items:center;gap:.45rem;font-size:.9rem;cursor:pointer;border:1px solid var(--line);border-radius:.45rem;padding:.4rem .8rem;background:var(--panel);color:var(--ink);}" +
      "#view-story .story-readtoggle.on{border-color:var(--gold);color:var(--gold);font-weight:600;}" +
      "#view-story .story-placeholder{text-align:center;padding:2.5rem 1rem;color:var(--muted);}" +
      "#view-story .story-placeholder h3{font-family:Georgia,serif;color:var(--ink);}";
    var style = document.createElement("style");
    style.id = "story-view-styles";
    style.textContent = css;
    document.head.appendChild(style);
  }

  /* ---------- rendering ---------- */

  function render() {
    if (!root) return;
    var list = chapters();
    if (!list || !list.length) {
      root.innerHTML =
        '<div class="card story-placeholder">' +
        "<h3>The scroll is still being copied\u2026</h3>" +
        "<p>Chapter data for 1 Samuel isn\u2019t loaded yet. " +
        "Make sure <code>data/samuel1-chapters.js</code> is included before this script, then reload.</p>" +
        "</div>";
      return;
    }

    var max = maxChapter();
    if (current < 1) current = 1;
    if (current > max) current = max;

    var ch = chapterByNum(current) || list[0];
    var num = ch && ch.num ? ch.num : current;

    var html = '<div class="card">' + navigatorHtml(list, max, num) + "</div>";
    html += chapterPanelHtml(ch, max);
    root.innerHTML = html;
  }

  function navigatorHtml(list, max, num) {
    var byNum = {};
    for (var i = 0; i < list.length; i++) {
      if (list[i]) byNum[list[i].num] = true;
    }
    var h =
      '<div class="story-nav-head">' +
      '<span class="story-progress">Chapter ' + num + " of " + max + "</span>" +
      '<span class="story-readcount">' + readCount() + " of " + max + " read</span>" +
      "</div>" +
      '<div class="story-chapgrid" role="navigation" aria-label="Chapters">';
    for (var n = 1; n <= max; n++) {
      var cls = "story-chapbtn";
      if (n === num) cls += " current";
      if (readSet[n]) cls += " read";
      var dis = byNum[n] ? "" : " disabled";
      h += '<button type="button" class="' + cls + '" data-chapter="' + n + '"' + dis +
        ' aria-label="Chapter ' + n + (readSet[n] ? " (read)" : "") + '"' +
        (n === num ? ' aria-current="true"' : "") + ">" + n + "</button>";
    }
    h += "</div>";
    h +=
      '<div class="story-prevnext">' +
      '<button type="button" class="btn" data-nav="prev"' + (num <= 1 ? " disabled" : "") + ">\u2190 Previous</button>" +
      '<span class="story-progress">Use \u2190 \u2192 arrow keys</span>' +
      '<button type="button" class="btn" data-nav="next"' + (num >= max ? " disabled" : "") + ">Next \u2192</button>" +
      "</div>";
    return h;
  }

  function chapterPanelHtml(ch, max) {
    if (!ch) {
      return '<div class="card story-placeholder"><p>This chapter isn\u2019t available yet.</p></div>';
    }
    var h = '<article class="card">';
    if (ch.era) h += '<span class="story-era">' + esc(ch.era) + "</span>";
    h += '<h2 class="story-title"><span class="story-chapnum">Chapter ' + esc(ch.num) + "</span>" + esc(ch.title || "") + "</h2>";
    if (ch.summary) h += '<p class="story-summary">' + esc(ch.summary) + "</p>";

    if (ch.keyVerse && ch.keyVerse.text) {
      h += '<blockquote class="story-keyverse">\u201C' + esc(ch.keyVerse.text) + "\u201D";
      if (ch.keyVerse.ref) h += "<cite>\u2014 " + esc(ch.keyVerse.ref) + "</cite>";
      h += "</blockquote>";
    }

    if (ch.historianNote) {
      h += '<aside class="story-histnote"><h4>\uD83D\uDCDC Historian\u2019s note</h4><p>' +
        esc(ch.historianNote) + "</p></aside>";
    }

    var i;
    if (ch.locations && ch.locations.length) {
      h += '<div class="story-chips"><h4>Places in this chapter</h4><div class="story-chiprow">';
      for (i = 0; i < ch.locations.length; i++) {
        var lid = ch.locations[i];
        h += '<button type="button" class="chip" data-loc="' + esc(lid) +
          '" title="Show on map">\uD83D\uDCCD ' + esc(locationName(lid)) + "</button>";
      }
      h += "</div></div>";
    }

    if (ch.characters && ch.characters.length) {
      h += '<div class="story-chips"><h4>People in this chapter</h4><div class="story-chiprow">';
      for (i = 0; i < ch.characters.length; i++) {
        var cid = ch.characters[i];
        h += '<button type="button" class="chip" data-char="' + esc(cid) +
          '" title="Open characters view">\uD83D\uDC64 ' + esc(characterName(cid)) + "</button>";
      }
      h += "</div></div>";
    }

    var isRead = !!readSet[ch.num];
    h += '<button type="button" class="story-readtoggle' + (isRead ? " on" : "") +
      '" data-toggleread="' + esc(ch.num) + '">' +
      (isRead ? "\u2713 Marked as read" : "\u25CB Mark as read") + "</button>";

    h += "</article>";
    return h;
  }

  /* ---------- interaction ---------- */

  function select(num) {
    var n = parseInt(num, 10);
    if (!(n >= 1)) return;
    var max = maxChapter();
    if (n > max) n = max;
    current = n;
    saveLast();
    render();
    if (root && typeof root.scrollIntoView === "function") {
      try { root.scrollIntoView({ block: "start", behavior: "smooth" }); } catch (e) {}
    }
  }

  function onClick(ev) {
    // walk up to the nearest actionable element inside #view-story
    var node = ev.target;
    while (node && node !== root) {
      if (node.nodeType === 1) {
        if (node.hasAttribute("data-chapter")) {
          select(node.getAttribute("data-chapter"));
          return;
        }
        if (node.hasAttribute("data-nav")) {
          select(node.getAttribute("data-nav") === "prev" ? current - 1 : current + 1);
          return;
        }
        if (node.hasAttribute("data-toggleread")) {
          var n = parseInt(node.getAttribute("data-toggleread"), 10);
          if (readSet[n]) delete readSet[n]; else readSet[n] = true;
          saveRead();
          render();
          return;
        }
        if (node.hasAttribute("data-loc")) {
          if (window.App && typeof window.App.focusLocation === "function") {
            window.App.focusLocation(node.getAttribute("data-loc"));
          }
          return;
        }
        if (node.hasAttribute("data-char")) {
          if (window.App && typeof window.App.showView === "function") {
            window.App.showView("characters");
          }
          return;
        }
      }
      node = node.parentNode;
    }
  }

  function storyViewActive() {
    return !!(root && root.classList && root.classList.contains("active"));
  }

  function onKeydown(ev) {
    if (!storyViewActive()) return;
    var t = ev.target;
    if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.tagName === "SELECT" || t.isContentEditable)) return;
    if (ev.key === "ArrowLeft") {
      if (current > 1) { select(current - 1); ev.preventDefault(); }
    } else if (ev.key === "ArrowRight") {
      if (current < maxChapter()) { select(current + 1); ev.preventDefault(); }
    }
  }

  /* ---------- public API ---------- */

  window.StoryView = {
    init: function () {
      root = document.getElementById("view-story");
      if (!root) return;
      injectStyles();
      loadState();
      render();
      if (!root.__storyBound) {
        root.addEventListener("click", onClick);
        root.__storyBound = true;
      }
      if (!document.__storyKeysBound) {
        document.addEventListener("keydown", onKeydown);
        document.__storyKeysBound = true;
      }
    },
    show: function (chapterNum) {
      if (!root) root = document.getElementById("view-story");
      select(chapterNum);
    }
  };
})();
