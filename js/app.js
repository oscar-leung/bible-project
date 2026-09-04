/* app.js — window.App: view switching + cross-view links.
   Plain script global, no modules. See ARCHITECTURE.md. */

(function () {
  "use strict";

  var VIEWS = ["story", "map", "battle", "family", "characters", "timeline", "game"];

  window.App = {
    showView: function (name) {
      if (VIEWS.indexOf(name) === -1) return;

      var views = document.querySelectorAll(".view");
      for (var i = 0; i < views.length; i++) {
        views[i].classList.toggle("active", views[i].id === "view-" + name);
      }

      var tabs = document.querySelectorAll(".tab");
      for (var j = 0; j < tabs.length; j++) {
        tabs[j].classList.toggle("active", tabs[j].getAttribute("data-view") === name);
      }
    },

    focusLocation: function (locId) {
      window.App.showView("map");
      if (window.MapView && typeof window.MapView.focus === "function") {
        window.MapView.focus(locId);
      }
    },

    // goToChapter(num) -> 1 Samuel chapter num (unchanged contract).
    // goToChapter(num, "samuel2") -> 2 Samuel chapter num.
    goToChapter: function (num, book) {
      window.App.showView("story");
      if (window.StoryView && typeof window.StoryView.show === "function") {
        window.StoryView.show(num, book);
      }
    }
  };

  document.addEventListener("DOMContentLoaded", function () {
    // Wire tab clicks.
    var tabs = document.querySelectorAll(".tab");
    for (var i = 0; i < tabs.length; i++) {
      (function (tab) {
        tab.addEventListener("click", function () {
          window.App.showView(tab.getAttribute("data-view"));
        });
      })(tabs[i]);
    }

    // Init each view module independently — one broken/missing module
    // must not take down the rest.
    var modules = [
      ["StoryView", window.StoryView],
      ["MapView", window.MapView],
      ["CharactersView", window.CharactersView],
      ["TimelineView", window.TimelineView],
      ["GameView", window.GameView],
      ["BattleView", window.BattleView],
      ["FamilyTreeView", window.FamilyTreeView],
      ["EasterEggs", window.EasterEggs],
      ["Voices", window.Voices]
    ];
    for (var m = 0; m < modules.length; m++) {
      try {
        var mod = modules[m][1];
        if (mod && typeof mod.init === "function") {
          mod.init();
        } else {
          console.error("App: module " + modules[m][0] + " missing or has no init()");
        }
      } catch (err) {
        console.error("App: " + modules[m][0] + ".init() failed", err);
      }
    }

    window.App.showView("story");

    // --- illuminated shell extras (additive; failures must stay silent) ---
    try { window.App.updateReadingProgress(); } catch (e) {}
    try { runOpeningMoment(); } catch (e) {}
  });

  /* ---- thin gold reading-progress bar under the header ------------------
     Counts BOTH books: reads the localStorage keys story.js writes
     ("samuel1.story.readChapters" + "samuel2.story.readChapters"). The total
     is 31 (1 Samuel) plus however many 2 Samuel chapters exist at runtime. */
  var SAMUEL1_CHAPTERS = 31;

  function samuel2ChapterCount() {
    try {
      var d = window.SAMUEL2;
      if (d && Object.prototype.toString.call(d.chapters) === "[object Array]") {
        return d.chapters.length;
      }
    } catch (e) {}
    return 0;
  }

  function countReadKey(key, maxN) {
    var count = 0;
    try {
      var arr = JSON.parse(localStorage.getItem(key) || "[]");
      if (Object.prototype.toString.call(arr) === "[object Array]") {
        for (var i = 0; i < arr.length; i++) {
          var n = parseInt(arr[i], 10);
          if (n >= 1 && n <= maxN) count++;
        }
      }
    } catch (e) { /* private mode etc. — bar just stays empty */ }
    return count;
  }

  window.App.updateReadingProgress = function () {
    var bar = document.getElementById("reading-progress");
    var fill = document.getElementById("reading-progress-fill");
    if (!bar || !fill) return;
    var s2total = samuel2ChapterCount();
    var total = SAMUEL1_CHAPTERS + s2total;
    var count = countReadKey("samuel1.story.readChapters", SAMUEL1_CHAPTERS);
    if (s2total > 0) count += countReadKey("samuel2.story.readChapters", s2total);
    fill.style.width = (count / total * 100) + "%";
    bar.setAttribute("aria-valuemax", String(total));
    bar.setAttribute("aria-valuenow", String(count));
    bar.setAttribute("title", count + " of " + total + " chapters read");
  };

  // Any click may have toggled a chapter's read state; refresh just after.
  document.addEventListener("click", function () {
    window.setTimeout(function () {
      try { window.App.updateReadingProgress(); } catch (e) {}
    }, 60);
  });

  /* ---- opening moment: the title unfurls like a scroll, once per session --- */
  function runOpeningMoment() {
    var reduced = false;
    try {
      reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch (e) {}
    var seen = false;
    try { seen = sessionStorage.getItem("samuel1.openingSeen") === "1"; } catch (e) {}
    if (seen || reduced) return;
    try { sessionStorage.setItem("samuel1.openingSeen", "1"); } catch (e) {}

    var veil = document.createElement("div");
    veil.className = "opening-veil";
    veil.setAttribute("aria-hidden", "true");
    veil.innerHTML =
      '<div class="opening-scroll">' +
        '<div class="opening-rule opening-rule-top"></div>' +
        '<div class="opening-emblem">' +
          '<svg viewBox="0 0 48 48" width="54" height="54" aria-hidden="true" focusable="false">' +
            '<g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
              '<path d="M14 6 C10 13 10 21 14 27"/><path d="M34 6 C38 13 38 21 34 27"/>' +
              '<path d="M14 27 C14 36 34 36 34 27"/><path d="M12 13 H36"/>' +
              '<path d="M19 13 V31.5" stroke-width="1.2"/><path d="M24 13 V33" stroke-width="1.2"/>' +
              '<path d="M29 13 V31.5" stroke-width="1.2"/><path d="M24 38 V41 M20 41 H28"/>' +
            "</g>" +
            '<circle cx="24" cy="3.5" r="1.4" fill="currentColor" stroke="none"/>' +
          "</svg>" +
        "</div>" +
        '<p class="opening-kicker">The Book of</p>' +
        '<h2 class="opening-title">Samuel</h2>' +
        '<p class="opening-colophon">an interactive journey</p>' +
        '<div class="opening-rule opening-rule-bottom"></div>' +
      "</div>";
    document.body.appendChild(veil);

    var gone = false;
    function dismiss() {
      if (gone) return;
      gone = true;
      veil.classList.add("opening-out");
      window.setTimeout(function () {
        if (veil.parentNode) veil.parentNode.removeChild(veil);
      }, 450);
    }
    veil.addEventListener("click", dismiss);
    window.setTimeout(dismiss, 1600);   // ~1.5s of ceremony, then back to the study
  }
})();
