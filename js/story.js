/* story.js — window.StoryView (Dev 2)
 * Renders the Book of Samuel chapter reader inside #view-story.
 * Multi-book: 1 Samuel (window.SAMUEL1, complete) and 2 Samuel (window.SAMUEL2,
 * growing chapter by chapter). If SAMUEL2 is absent the book switcher simply
 * doesn't render and the view behaves exactly as the original 1 Samuel reader.
 * Plain script global, no modules. Reads window.SAMUEL1 / SAMUEL2 / LOCATIONS / CHARACTERS.
 *
 * API: StoryView.show(num)             -> 1 Samuel chapter num (unchanged)
 *      StoryView.show(num, "samuel2")  -> 2 Samuel chapter num
 * The chapter panel <article> carries data-book="samuel1|samuel2" and
 * data-chapter="N" so other modules (voices.js) can read the location.
 */
(function () {
  "use strict";

  var BOOKS = {
    samuel1: {
      label: "1 Samuel",
      global: "SAMUEL1",
      lsLast: "samuel1.story.lastChapter",   // untouched original keys
      lsRead: "samuel1.story.readChapters",
      canonical: 31                          // grid always shows all 31
    },
    samuel2: {
      label: "2 Samuel",
      global: "SAMUEL2",
      lsLast: "samuel2.story.lastChapter",   // parallel keys for book two
      lsRead: "samuel2.story.readChapters",
      canonical: 24                          // full book; data grows toward it
    }
  };

  var root = null;              // #view-story
  var currentBook = "samuel1";  // active book id
  var state = {
    samuel1: { current: 1, readSet: {} },
    samuel2: { current: 1, readSet: {} }
  };

  /* ---------- storage (always wrapped) ---------- */

  function loadBookState(bookId) {
    var cfg = BOOKS[bookId];
    var st = state[bookId];
    try {
      var last = parseInt(localStorage.getItem(cfg.lsLast), 10);
      if (last >= 1 && last <= cfg.canonical) st.current = last;
    } catch (e) { /* private mode etc. */ }
    try {
      var raw = localStorage.getItem(cfg.lsRead);
      if (raw) {
        var arr = JSON.parse(raw);
        if (Object.prototype.toString.call(arr) === "[object Array]") {
          for (var i = 0; i < arr.length; i++) {
            var n = parseInt(arr[i], 10);
            if (n >= 1 && n <= cfg.canonical) st.readSet[n] = true;
          }
        }
      }
    } catch (e) { st.readSet = {}; }
  }

  function loadState() {
    loadBookState("samuel1");
    loadBookState("samuel2");
  }

  function saveLast() {
    try {
      localStorage.setItem(BOOKS[currentBook].lsLast, String(state[currentBook].current));
    } catch (e) {}
  }

  function saveRead() {
    try {
      var readSet = state[currentBook].readSet;
      var arr = [];
      for (var k in readSet) if (readSet[k]) arr.push(parseInt(k, 10));
      arr.sort(function (a, b) { return a - b; });
      localStorage.setItem(BOOKS[currentBook].lsRead, JSON.stringify(arr));
    } catch (e) {}
  }

  function readCount(bookId) {
    var readSet = state[bookId].readSet;
    var c = 0;
    for (var k in readSet) if (readSet[k]) c++;
    return c;
  }

  /* ---------- data helpers ---------- */

  function chapters(bookId) {
    var d = window[BOOKS[bookId].global];
    if (d && Object.prototype.toString.call(d.chapters) === "[object Array]") {
      return d.chapters;
    }
    return null;
  }

  function samuel2Available() {
    var list = chapters("samuel2");
    return !!(list && list.length);
  }

  function chapterByNum(bookId, num) {
    var list = chapters(bookId);
    if (!list) return null;
    for (var i = 0; i < list.length; i++) {
      if (list[i] && list[i].num === num) return list[i];
    }
    return null;
  }

  // Grid size for a book: 1 Samuel always shows all 31; 2 Samuel shows only
  // the chapters available so far (the historian's file grows over time).
  function maxChapter(bookId) {
    var cfg = BOOKS[bookId];
    var list = chapters(bookId);
    if (!list || !list.length) return bookId === "samuel1" ? cfg.canonical : 0;
    var m = 0;
    for (var i = 0; i < list.length; i++) {
      if (list[i] && list[i].num > m) m = list[i].num;
    }
    if (bookId === "samuel1") return m > cfg.canonical ? m : cfg.canonical;
    return Math.min(m, cfg.canonical);
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
      "#view-story .story-books{display:flex;gap:.5rem;flex-wrap:wrap;margin-bottom:.9rem;padding-bottom:.75rem;border-bottom:1px solid var(--line);}" +
      "#view-story .story-bookbtn{font-family:Georgia,'Times New Roman',serif;font-size:.92rem;letter-spacing:.02em;padding:.42rem 1.05rem;border:1px solid var(--line);border-radius:999px;background:var(--panel);color:var(--muted);cursor:pointer;line-height:1.25;transition:border-color .15s,color .15s;}" +
      "#view-story .story-bookbtn:hover{border-color:var(--gold);color:var(--gold);}" +
      "#view-story .story-bookbtn.active{border-color:var(--gold);color:var(--gold);font-weight:700;background:color-mix(in srgb,var(--gold) 10%,var(--panel));box-shadow:inset 0 0 0 1px var(--gold);}" +
      "#view-story .story-bookbtn .story-bookcount{font-family:inherit;font-weight:400;font-size:.78rem;color:var(--muted);font-style:italic;}" +
      "#view-story .story-bookbtn.active .story-bookcount{color:var(--gold);}" +
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

    // If 2 Samuel was active but its data vanished (shouldn't happen, but be
    // defensive), fall back to 1 Samuel.
    if (currentBook === "samuel2" && !samuel2Available()) currentBook = "samuel1";

    var list = chapters(currentBook);
    if (!list || !list.length) {
      root.innerHTML =
        '<div class="card story-placeholder">' +
        "<h3>The scroll is still being copied\u2026</h3>" +
        "<p>Chapter data for " + esc(BOOKS[currentBook].label) + " isn\u2019t loaded yet. " +
        "Make sure <code>data/" + (currentBook === "samuel2" ? "samuel2" : "samuel1") +
        "-chapters.js</code> is included before this script, then reload.</p>" +
        "</div>";
      return;
    }

    var st = state[currentBook];
    var max = maxChapter(currentBook);
    if (st.current < 1) st.current = 1;
    if (st.current > max) st.current = max;

    var ch = chapterByNum(currentBook, st.current) || list[0];
    var num = ch && ch.num ? ch.num : st.current;

    var html = '<div class="card">' + bookSwitcherHtml() + navigatorHtml(list, max, num) + "</div>";
    html += chapterPanelHtml(ch, max);
    root.innerHTML = html;
  }

  function bookSwitcherHtml() {
    // Renders only when 2 Samuel data is present.
    if (!samuel2Available()) return "";
    var h = '<div class="story-books" role="group" aria-label="Choose a book">';
    var ids = ["samuel1", "samuel2"];
    for (var i = 0; i < ids.length; i++) {
      var id = ids[i];
      var cfg = BOOKS[id];
      var label = esc(cfg.label);
      if (id === "samuel2") {
        var avail = maxChapter("samuel2");
        if (avail < cfg.canonical) {
          label += ' <span class="story-bookcount">\u00B7 ' + avail +
            (avail === 1 ? " chapter" : " chapters") + " so far</span>";
        }
      }
      h += '<button type="button" class="story-bookbtn' + (id === currentBook ? " active" : "") +
        '" data-book="' + id + '" aria-pressed="' + (id === currentBook ? "true" : "false") + '">' +
        label + "</button>";
    }
    h += "</div>";
    return h;
  }

  function navigatorHtml(list, max, num) {
    var byNum = {};
    for (var i = 0; i < list.length; i++) {
      if (list[i]) byNum[list[i].num] = true;
    }
    var bookLabel = BOOKS[currentBook].label;
    var partial = currentBook === "samuel2" && max < BOOKS.samuel2.canonical;
    var h =
      '<div class="story-nav-head">' +
      '<span class="story-progress">' + esc(bookLabel) + " \u00B7 Chapter " + num + " of " + max +
      (partial ? " so far" : "") + "</span>" +
      '<span class="story-readcount">' + readCount(currentBook) + " of " + max + " read</span>" +
      "</div>" +
      '<div class="story-chapgrid" role="navigation" aria-label="' + esc(bookLabel) + ' chapters">';
    var readSet = state[currentBook].readSet;
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
    var h = '<article class="card" data-book="' + esc(currentBook) +
      '" data-chapter="' + esc(ch.num) + '">';
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

    var isRead = !!state[currentBook].readSet[ch.num];
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
    var max = maxChapter(currentBook);
    if (max < 1) { render(); return; }
    if (n > max) n = max;
    state[currentBook].current = n;
    saveLast();
    render();
    if (root && typeof root.scrollIntoView === "function") {
      try { root.scrollIntoView({ block: "start", behavior: "smooth" }); } catch (e) {}
    }
  }

  function switchBook(bookId) {
    if (!BOOKS[bookId] || bookId === currentBook) return;
    if (bookId === "samuel2" && !samuel2Available()) return;
    currentBook = bookId;
    render();
  }

  function onClick(ev) {
    // walk up to the nearest actionable element inside #view-story
    var node = ev.target;
    while (node && node !== root) {
      if (node.nodeType === 1) {
        var isBtn = node.tagName === "BUTTON";
        // Only buttons act: the chapter panel <article> also carries
        // data-book/data-chapter (as readable location for other modules)
        // and must not swallow clicks.
        if (isBtn && node.hasAttribute("data-book")) {
          switchBook(node.getAttribute("data-book"));
          return;
        }
        if (isBtn && node.hasAttribute("data-chapter")) {
          select(node.getAttribute("data-chapter"));
          return;
        }
        if (node.hasAttribute("data-nav")) {
          var cur = state[currentBook].current;
          select(node.getAttribute("data-nav") === "prev" ? cur - 1 : cur + 1);
          return;
        }
        if (node.hasAttribute("data-toggleread")) {
          var n = parseInt(node.getAttribute("data-toggleread"), 10);
          var readSet = state[currentBook].readSet;
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
    var cur = state[currentBook].current;
    if (ev.key === "ArrowLeft") {
      if (cur > 1) { select(cur - 1); ev.preventDefault(); }
    } else if (ev.key === "ArrowRight") {
      if (cur < maxChapter(currentBook)) { select(cur + 1); ev.preventDefault(); }
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
    // show(num)            -> 1 Samuel chapter num (original contract, unchanged)
    // show(num, "samuel2") -> 2 Samuel chapter num (ignored if SAMUEL2 absent)
    show: function (chapterNum, book) {
      if (!root) root = document.getElementById("view-story");
      var target = book === "samuel2" ? "samuel2" : "samuel1";
      if (target !== currentBook) {
        if (target === "samuel2" && !samuel2Available()) target = currentBook;
        currentBook = target;
      }
      select(chapterNum);
    },
    // Current location, mirroring the panel's data attributes.
    getLocation: function () {
      return { book: currentBook, chapter: state[currentBook].current };
    }
  };
})();
