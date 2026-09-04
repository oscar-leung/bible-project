/* js/voices.js — window.Voices (Historian)
 * Self-contained enhancer: adds a "🎭 Voices from the chapter" section to the
 * story view, staging window.DIALOGUE as script-style speech bubbles + commentary.
 * Does NOT edit story.js: it wraps StoryView.show (keeping the original) and
 * also watches #view-story with a MutationObserver so re-renders that bypass
 * show() (chapter grid clicks, prev/next, mark-as-read) still get the section.
 * Defensive everywhere: no DIALOGUE / no entry for a chapter -> renders nothing;
 * all entry points are try/catch'd; init is idempotent; never throws.
 */
(function () {
  "use strict";

  var LS_COLLAPSED = "samuel1.voices.collapsed";
  var SECTION_CLASS = "voices-section";
  var initialized = false;
  var observer = null;
  var scheduled = false;

  /* ---------- helpers ---------- */

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function isCollapsed() {
    try { return localStorage.getItem(LS_COLLAPSED) === "1"; } catch (e) { return false; }
  }

  function saveCollapsed(v) {
    try { localStorage.setItem(LS_COLLAPSED, v ? "1" : "0"); } catch (e) {}
  }

  function getRoot() {
    try { return document.getElementById("view-story"); } catch (e) { return null; }
  }

  // Read the currently displayed book+chapter straight from StoryView's DOM.
  // DIALOGUE keys: 1 Samuel chapters are numbers (1–31); 2 Samuel chapters are
  // strings "2s1", "2s2", … The chapter panel <article> carries
  // data-book="samuel1|samuel2" and data-chapter="N" (multi-book StoryView);
  // the old 1 Samuel-only selectors are kept as fallbacks.
  function currentChapterKey(root) {
    try {
      var panel = root.querySelector("article.card[data-book][data-chapter]") ||
        root.querySelector("[data-book][data-chapter]");
      if (panel) {
        var book = panel.getAttribute("data-book");
        var pn = parseInt(panel.getAttribute("data-chapter"), 10);
        if (pn >= 1) return book === "samuel2" ? "2s" + pn : pn;
      }
    } catch (e) {}
    try {
      var btn = root.querySelector(".story-chapbtn.current");
      if (btn && btn.getAttribute("data-chapter")) {
        var n = parseInt(btn.getAttribute("data-chapter"), 10);
        if (n >= 1) return n;
      }
      var numEl = root.querySelector(".story-title .story-chapnum");
      if (numEl) {
        var m = /(\d+)/.exec(numEl.textContent || "");
        if (m) return parseInt(m[1], 10);
      }
    } catch (e) {}
    return null;
  }

  function scenesFor(key) {
    try {
      var d = window.DIALOGUE;
      if (!d || key == null) return null;
      var scenes = d[key];
      if (scenes == null && typeof key === "number") scenes = d[String(key)];
      if (Object.prototype.toString.call(scenes) === "[object Array]" && scenes.length) {
        return scenes;
      }
    } catch (e) {}
    return null;
  }

  /* ---------- styles ---------- */

  function injectStyles() {
    try {
      if (document.getElementById("voices-styles")) return;
      var css = "" +
        "#view-story .voices-section{margin-top:1.4rem;padding-top:1rem;border-top:1px dashed var(--line);}" +
        "#view-story .voices-head{display:flex;align-items:center;justify-content:space-between;gap:.6rem;flex-wrap:wrap;margin-bottom:.4rem;}" +
        "#view-story .voices-title{margin:0;font-family:Georgia,'Times New Roman',serif;font-size:1.05rem;color:var(--ink);letter-spacing:.01em;}" +
        "#view-story .voices-toggle{font-size:.8rem;padding:.28rem .7rem;border:1px solid var(--line);border-radius:999px;background:var(--panel);color:var(--muted);cursor:pointer;line-height:1.2;}" +
        "#view-story .voices-toggle:hover{border-color:var(--gold);color:var(--gold);}" +
        "#view-story .voices-scene{margin:1rem 0 1.25rem;}" +
        "#view-story .voices-scene:last-child{margin-bottom:.25rem;}" +
        "#view-story .voices-scenetitle{display:flex;align-items:center;gap:.6rem;margin:0 0 .7rem;font-size:.8rem;font-weight:700;letter-spacing:.09em;text-transform:uppercase;color:var(--accent);}" +
        "#view-story .voices-scenetitle:before,#view-story .voices-scenetitle:after{content:\"\";flex:1;height:1px;background:var(--line);}" +
        "#view-story .voices-scenetitle:before{max-width:1.6rem;}" +
        "#view-story .voices-lines{display:flex;flex-direction:column;gap:.65rem;}" +
        "#view-story .voices-line{display:flex;flex-direction:column;max-width:88%;align-self:flex-start;align-items:flex-start;}" +
        "#view-story .voices-line.voices-right{align-self:flex-end;align-items:flex-end;}" +
        "#view-story .voices-speaker{font-variant:small-caps;letter-spacing:.06em;font-weight:700;font-size:.85rem;color:var(--gold);margin:0 .35rem .15rem;}" +
        "#view-story .voices-speaker .voices-to{font-variant:normal;font-weight:400;font-size:.75rem;color:var(--muted);letter-spacing:.02em;}" +
        "#view-story .voices-bubble{position:relative;padding:.65rem .95rem;border:1px solid var(--line);border-radius:.9rem;border-bottom-left-radius:.25rem;background:color-mix(in srgb,var(--accent) 7%,var(--panel));font-family:Georgia,'Times New Roman',serif;font-style:italic;line-height:1.6;font-size:.98rem;color:var(--ink);}" +
        "#view-story .voices-line.voices-right .voices-bubble{border-bottom-left-radius:.9rem;border-bottom-right-radius:.25rem;background:color-mix(in srgb,var(--gold) 10%,var(--panel));}" +
        "#view-story .voices-ref{display:inline-block;margin-top:.4rem;font-family:inherit;font-style:normal;font-size:.7rem;letter-spacing:.03em;color:var(--muted);border:1px solid var(--line);border-radius:999px;padding:.06rem .5rem;background:var(--panel);}" +
        "#view-story .voices-commentary{margin:.85rem 0 0;padding:.75rem 1rem;border-left:4px solid var(--accent);border-radius:0 .45rem .45rem 0;background:color-mix(in srgb,var(--accent) 6%,transparent);}" +
        "#view-story .voices-commentary h5{margin:0 0 .3rem;font-size:.72rem;letter-spacing:.08em;text-transform:uppercase;color:var(--accent);}" +
        "#view-story .voices-commentary p{margin:0;font-size:.92rem;line-height:1.62;color:var(--ink);}" +
        "#view-story .voices-body[hidden]{display:none;}" +
        "@media (max-width:720px){#view-story .voices-line{max-width:100%;}}";
      var style = document.createElement("style");
      style.id = "voices-styles";
      style.textContent = css;
      document.head.appendChild(style);
    } catch (e) {}
  }

  /* ---------- rendering ---------- */

  function sceneHtml(scene) {
    if (!scene || Object.prototype.toString.call(scene.lines) !== "[object Array]") return "";
    var h = '<div class="voices-scene">';
    if (scene.scene) h += '<h4 class="voices-scenetitle">' + esc(scene.scene) + "</h4>";
    h += '<div class="voices-lines">';

    // Alternate bubble sides by speaker identity when 2+ speakers converse.
    var order = [];
    var i, ln, sp;
    for (i = 0; i < scene.lines.length; i++) {
      ln = scene.lines[i];
      if (!ln || !ln.quote) continue;
      sp = String(ln.speaker || "");
      var seen = false;
      for (var j = 0; j < order.length; j++) if (order[j] === sp) { seen = true; break; }
      if (!seen) order.push(sp);
    }
    var twoSided = order.length > 1;

    for (i = 0; i < scene.lines.length; i++) {
      ln = scene.lines[i];
      if (!ln || !ln.quote) continue;
      sp = String(ln.speaker || "");
      var idx = 0;
      for (var k = 0; k < order.length; k++) if (order[k] === sp) { idx = k; break; }
      var side = twoSided && idx % 2 === 1 ? " voices-right" : "";
      h += '<div class="voices-line' + side + '">';
      h += '<span class="voices-speaker">' + esc(sp || "Voice");
      if (ln.to) h += ' <span class="voices-to">to ' + esc(ln.to) + "</span>";
      h += "</span>";
      h += '<div class="voices-bubble">“' + esc(ln.quote) + "”";
      if (ln.ref) h += '<br><span class="voices-ref">' + esc(ln.ref) + "</span>";
      h += "</div></div>";
    }
    h += "</div>";
    if (scene.commentary) {
      h += '<aside class="voices-commentary"><h5>💬 Commentary</h5><p>' +
        esc(scene.commentary) + "</p></aside>";
    }
    h += "</div>";
    return h;
  }

  function buildSection(key, scenes) {
    var section = document.createElement("section");
    section.className = SECTION_CLASS;
    section.setAttribute("data-voices-chapter", String(key));
    var collapsed = isCollapsed();
    var h = '<div class="voices-head">' +
      '<h3 class="voices-title">🎭 Voices from the chapter</h3>' +
      '<button type="button" class="voices-toggle" aria-expanded="' + (collapsed ? "false" : "true") + '">' +
      (collapsed ? "Show the voices" : "Hide the voices") + "</button></div>" +
      '<div class="voices-body"' + (collapsed ? " hidden" : "") + ">";
    for (var i = 0; i < scenes.length; i++) h += sceneHtml(scenes[i]);
    h += "</div>";
    section.innerHTML = h;

    var btn = section.querySelector(".voices-toggle");
    var body = section.querySelector(".voices-body");
    if (btn && body) {
      btn.addEventListener("click", function (ev) {
        try {
          if (ev && typeof ev.stopPropagation === "function") ev.stopPropagation();
          var nowHidden = !body.hidden;
          body.hidden = nowHidden;
          btn.textContent = nowHidden ? "Show the voices" : "Hide the voices";
          btn.setAttribute("aria-expanded", nowHidden ? "false" : "true");
          saveCollapsed(nowHidden);
        } catch (e) {}
      });
    }
    return section;
  }

  function render() {
    try {
      var root = getRoot();
      if (!root) return;
      var key = currentChapterKey(root);
      var scenes = scenesFor(key);
      var existing = root.querySelector("." + SECTION_CLASS);

      if (!scenes) {
        // No dialogue for this chapter (or no data at all): render nothing.
        if (existing && existing.parentNode) existing.parentNode.removeChild(existing);
        return;
      }
      // Already rendered for this chapter and still attached? Leave it alone.
      if (existing && existing.getAttribute("data-voices-chapter") === String(key)) return;
      if (existing && existing.parentNode) existing.parentNode.removeChild(existing);

      // Stable anchor: StoryView's chapter panel is the <article class="card">
      // inside #view-story. Fall back to #view-story itself.
      var panel = root.querySelector("article.card") || root;
      panel.appendChild(buildSection(key, scenes));
    } catch (e) { /* never throw */ }
  }

  function scheduleRender() {
    if (scheduled) return;
    scheduled = true;
    setTimeout(function () {
      scheduled = false;
      render();
    }, 0);
  }

  /* ---------- hooks ---------- */

  function wrapStoryView() {
    try {
      var sv = window.StoryView;
      if (!sv || typeof sv.show !== "function" || sv.__voicesWrapped) return;
      var originalShow = sv.show;
      sv.show = function () {
        var result;
        try { result = originalShow.apply(this, arguments); }
        catch (e) { /* let StoryView's own errors stay contained */ }
        scheduleRender();
        return result;
      };
      sv.__voicesWrapped = true;
    } catch (e) {}
  }

  function observeStory() {
    try {
      var root = getRoot();
      if (!root || observer || typeof MutationObserver !== "function") return;
      observer = new MutationObserver(function () {
        // StoryView re-renders via root.innerHTML on grid clicks / prev-next /
        // mark-as-read, which bypass show(). Re-attach when our section is gone
        // or stale. render() is a no-op when the section already matches, so
        // our own appends don't loop.
        scheduleRender();
      });
      observer.observe(root, { childList: true, subtree: false });
    } catch (e) {}
  }

  /* ---------- public API ---------- */

  window.Voices = {
    init: function () {
      try {
        if (initialized) { scheduleRender(); return; }
        initialized = true;
        injectStyles();
        wrapStoryView();
        observeStory();
        render(); // once, for the initially displayed chapter
      } catch (e) { /* never throw */ }
    }
  };

  // Self-bootstrap: wrap after DOMContentLoaded (app.js has run all inits by
  // the time deferred/end-of-body scripts settle; setTimeout lets StoryView.init
  // finish first even if listener order varies).
  function boot() { setTimeout(function () { try { window.Voices.init(); } catch (e) {} }, 0); }
  try {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", boot);
    } else {
      boot();
    }
  } catch (e) {}
})();
