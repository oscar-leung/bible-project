/* js/study.js — window.StudyKit
 * The study layer inside the story view. story.js calls into it while it
 * builds a chapter panel; it never renders on its own.
 *   guideHtml(book)          -> "Before you read" primer (1 Kings: themes + king scorecard)
 *   memorizeHtml(keyVerse)   -> key-verse memorizer (tap-to-reveal cloze)
 *   chapterHtml(book, ch)    -> study block (big idea, look-for checklist,
 *                               connection, hit home, reflect, prayer) + my notes
 *   onAction(node, book, n)  -> click handler for [data-study]; returns "rerender" when
 *                               story.js should redraw
 * Notes live in localStorage under "<book>.notes.<chapter>" (per viewer, per device);
 * "Copy for my sheet" gives tab-separated rows that paste straight into a
 * two-column Google Sheet (A = chapter, B = note).
 */
(function () {
  "use strict";

  var LABELS = { samuel1: "1 Samuel", samuel2: "2 Samuel", kings1: "1 Kings", kings2: "2 Kings" };
  var GLOBALS = { samuel1: "SAMUEL1", samuel2: "SAMUEL2", kings1: "KINGS1", kings2: "KINGS2" };
  var GUIDES = { kings1: "KINGS1_GUIDE", kings2: "KINGS2_GUIDE" };

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function lsSet(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function noteKey(book, n) { return book + ".notes." + n; }
  function lookKey(book, n) { return book + ".study.look." + n; }

  function lookState(book, n) {
    try { var a = JSON.parse(lsGet(lookKey(book, n)) || "[]"); return Array.isArray(a) ? a : []; }
    catch (e) { return []; }
  }

  function chaptersOf(book) {
    var d = window[GLOBALS[book]];
    return d && Array.isArray(d.chapters) ? d.chapters : [];
  }

  function injectStyles() {
    if (document.getElementById("study-kit-styles")) return;
    var css = "" +
      "#view-story .sk-guide{margin-top:1rem;}" +
      "#view-story .sk-guide>summary{cursor:pointer;font-family:Georgia,'Times New Roman',serif;font-size:1.1rem;color:var(--ink);list-style:none;}" +
      "#view-story .sk-guide>summary::-webkit-details-marker{display:none;}" +
      "#view-story .sk-guide>summary:before{content:'\\25B8';display:inline-block;margin-right:.5rem;color:var(--gold);transition:transform .15s;}" +
      "#view-story .sk-guide[open]>summary:before{transform:rotate(90deg);}" +
      "#view-story .sk-guide .sk-sub{color:var(--muted);font-size:.85rem;font-style:italic;margin-left:1.3rem;}" +
      "#view-story .sk-bridge{line-height:1.65;margin:.9rem 0;}" +
      "#view-story .sk-h{margin:1.2rem 0 .5rem;font-size:.8rem;letter-spacing:.06em;text-transform:uppercase;color:var(--gold);}" +
      "#view-story .sk-shape{display:grid;grid-template-columns:repeat(auto-fit,minmax(9.5rem,1fr));gap:.5rem;}" +
      "#view-story .sk-shape div{border:1px solid var(--line);border-radius:.5rem;padding:.55rem .7rem;background:var(--panel);font-size:.86rem;line-height:1.45;}" +
      "#view-story .sk-shape b{display:block;font-family:Georgia,serif;color:var(--accent);}" +
      "#view-story .sk-shape span{color:var(--muted);font-size:.75rem;}" +
      "#view-story .sk-themes{display:grid;gap:.55rem;}" +
      "#view-story .sk-theme{border-left:3px solid var(--gold);padding:.35rem .8rem;}" +
      "#view-story .sk-theme h5{margin:0 0 .2rem;font-family:Georgia,serif;font-size:1rem;}" +
      "#view-story .sk-theme p{margin:0;line-height:1.55;font-size:.93rem;}" +
      "#view-story .sk-theme small{color:var(--muted);}" +
      "#view-story .sk-filter{display:flex;gap:.35rem;flex-wrap:wrap;margin-bottom:.5rem;}" +
      "#view-story .sk-filter button{font:inherit;font-size:.8rem;border:1px solid var(--line);border-radius:999px;padding:.2rem .7rem;background:var(--panel);color:var(--muted);cursor:pointer;}" +
      "#view-story .sk-filter button.on{border-color:var(--gold);color:var(--gold);font-weight:700;}" +
      "#view-story .sk-kings{width:100%;border-collapse:collapse;font-size:.86rem;}" +
      "#view-story .sk-kings th,#view-story .sk-kings td{text-align:left;padding:.4rem .45rem;border-bottom:1px solid var(--line);vertical-align:top;}" +
      "#view-story .sk-kings th{font-size:.72rem;letter-spacing:.05em;text-transform:uppercase;color:var(--muted);font-weight:600;}" +
      "#view-story .sk-kings .sk-kname{font-family:Georgia,serif;font-weight:700;white-space:nowrap;}" +
      "#view-story .sk-kings .sk-kmeta{display:block;color:var(--muted);font-size:.75rem;font-weight:400;}" +
      "#view-story .sk-verdict{display:inline-block;border-radius:999px;padding:.05rem .55rem;font-size:.72rem;font-weight:700;white-space:nowrap;}" +
      "#view-story .sk-v-good{background:color-mix(in srgb,#2e7d4f 16%,transparent);color:#2e7d4f;}" +
      "#view-story .sk-v-mixed{background:color-mix(in srgb,var(--gold) 18%,transparent);color:var(--gold);}" +
      "#view-story .sk-v-evil{background:color-mix(in srgb,#a23b3b 15%,transparent);color:#b44a4a;}" +
      "#view-story .sk-kings button.sk-klink{font:inherit;font-size:.75rem;border:0;background:none;color:var(--accent);cursor:pointer;padding:0;text-decoration:underline;}" +
      "#view-story .sk-tablewrap{overflow-x:auto;}" +
      "#view-story .sk-exportrow{display:flex;gap:.5rem;flex-wrap:wrap;margin-top:1rem;}" +

      "#view-story .sk-mem{margin:-.4rem 0 1rem;}" +
      "#view-story .sk-mem .sk-membox{margin-top:.5rem;padding:.7rem .9rem;border:1px dashed var(--accent);border-radius:.45rem;font-family:Georgia,serif;line-height:2;}" +
      "#view-story .sk-mem .sk-blank{font:inherit;min-width:3.2em;border:0;border-bottom:2px solid var(--accent);background:color-mix(in srgb,var(--accent) 8%,transparent);color:transparent;cursor:pointer;border-radius:3px 3px 0 0;padding:0 .2rem;margin:0 .1rem;}" +
      "#view-story .sk-mem .sk-blank.shown{color:var(--gold);border-bottom-color:var(--gold);cursor:default;}" +
      "#view-story .sk-mem .sk-memtools{display:flex;gap:.4rem;flex-wrap:wrap;margin-top:.45rem;font-family:inherit;}" +
      "#view-story .sk-mem .sk-memscore{font-size:.8rem;color:var(--muted);align-self:center;}" +

      "#view-story .sk-study{margin:1.2rem 0 .4rem;border:1px solid var(--line);border-radius:.6rem;padding:1rem 1.1rem;background:color-mix(in srgb,var(--accent) 4%,var(--panel));}" +
      "#view-story .sk-study h4.sk-title{margin:0 0 .7rem;font-family:Georgia,serif;font-size:1.05rem;}" +
      "#view-story .sk-big{font-family:Georgia,serif;font-size:1.08rem;line-height:1.5;margin:0 0 .6rem;}" +
      "#view-story .sk-look{list-style:none;margin:0;padding:0;display:grid;gap:.3rem;}" +
      "#view-story .sk-look button{font:inherit;font-size:.93rem;text-align:left;width:100%;display:flex;gap:.55rem;align-items:flex-start;border:1px solid var(--line);border-radius:.4rem;padding:.4rem .6rem;background:var(--panel);color:var(--ink);cursor:pointer;line-height:1.45;}" +
      "#view-story .sk-look button .sk-box{flex:none;width:1.1rem;height:1.1rem;margin-top:.12rem;border:1.5px solid var(--muted);border-radius:.25rem;display:inline-flex;align-items:center;justify-content:center;font-size:.75rem;}" +
      "#view-story .sk-look button.on{border-color:var(--gold);}" +
      "#view-story .sk-look button.on .sk-box{background:var(--gold);border-color:var(--gold);color:#fff;}" +
      "#view-story .sk-look button.on .sk-ltext{color:var(--muted);}" +
      "#view-story .sk-para{margin:.2rem 0 0;line-height:1.6;font-size:.95rem;}" +
      "#view-story .sk-home{border-left:4px solid #b44a4a;padding:.5rem .85rem;background:color-mix(in srgb,#b44a4a 7%,transparent);border-radius:0 .4rem .4rem 0;}" +
      "#view-story .sk-reflect{margin:.3rem 0 0;padding-left:1.2rem;line-height:1.55;}" +
      "#view-story .sk-prayer{font-style:italic;font-family:Georgia,serif;color:var(--muted);margin:.3rem 0 0;}" +
      "#view-story .sk-notes textarea{width:100%;box-sizing:border-box;min-height:6.5rem;font:inherit;font-size:.95rem;line-height:1.5;padding:.6rem .7rem;border:1px solid var(--line);border-radius:.45rem;background:var(--panel);color:var(--ink);resize:vertical;}" +
      "#view-story .sk-notes textarea:focus{outline:2px solid var(--gold);outline-offset:1px;}" +
      "#view-story .sk-notebar{display:flex;gap:.5rem;align-items:center;flex-wrap:wrap;margin-top:.4rem;}" +
      "#view-story .sk-saved{font-size:.78rem;color:var(--muted);}" +
      "#view-story .sk-btn{font:inherit;font-size:.82rem;border:1px solid var(--line);border-radius:.4rem;padding:.3rem .7rem;background:var(--panel);color:var(--ink);cursor:pointer;}" +
      "#view-story .sk-mine{background:color-mix(in srgb,var(--gold) 6%,var(--panel));border-color:color-mix(in srgb,var(--gold) 45%,var(--line));}" +
      "#view-story .sk-hint{font-size:.8rem;color:var(--muted);margin:.2rem 0 .4rem;}" +
      "#view-story .sk-qs{display:grid;gap:.4rem;}" +
      "#view-story .sk-q{border:1px solid var(--line);border-radius:.45rem;background:var(--panel);padding:.45rem .7rem;}" +
      "#view-story .sk-q>summary{cursor:pointer;list-style:none;display:flex;flex-direction:column;gap:.15rem;}" +
      "#view-story .sk-q>summary::-webkit-details-marker{display:none;}" +
      "#view-story .sk-q>summary .sk-qtext{font-family:Georgia,serif;font-size:.98rem;line-height:1.4;}" +
      "#view-story .sk-q>summary .sk-qtext:before{content:'? ';color:var(--gold);font-weight:700;}" +
      "#view-story .sk-q[open]>summary .sk-qtext:before{content:'\\2713  ';}" +
      "#view-story .sk-qmeta{font-size:.74rem;color:var(--muted);}" +
      "#view-story .sk-st{font-weight:700;}" +
      "#view-story .sk-st-answered{color:#2e7d4f;}" +
      "#view-story .sk-st-exploring,#view-story .sk-st-open{color:#b44a4a;}" +
      "#view-story .sk-qa{margin:1.2rem 0 .4rem;border:1px solid var(--line);border-radius:.6rem;padding:1rem 1.1rem;background:var(--panel);}" +
      "#view-story .sk-qtabs{margin:.2rem 0 .8rem;}" +
      "#view-story .sk-myq-form{display:flex;gap:.5rem;margin-bottom:.6rem;}" +
      "#view-story .sk-myq-form input{flex:1;min-width:0;font:inherit;font-size:.95rem;padding:.45rem .65rem;border:1px solid var(--line);border-radius:.45rem;background:var(--bg);color:var(--ink);}" +
      "#view-story .sk-myq-form input:focus{outline:2px solid var(--gold);outline-offset:1px;}" +
      "#view-story .sk-myq li{display:flex;gap:.4rem;align-items:stretch;}" +
      "#view-story .sk-myq li>button:first-child{flex:1;}" +
      "#view-story .sk-x{font:inherit;border:1px solid var(--line);border-radius:.4rem;background:var(--panel);color:var(--muted);cursor:pointer;padding:0 .6rem;}" +
      "#view-story .sk-x:hover{color:#b44a4a;border-color:#b44a4a;}" +
      "#view-story .sk-giscus{min-height:4rem;}" +
      "#view-story .sk-btn:hover{border-color:var(--gold);color:var(--gold);}";
    var st = document.createElement("style");
    st.id = "study-kit-styles";
    st.textContent = css;
    document.head.appendChild(st);
  }

  /* ---------- book primer ---------- */

  var kingFilter = "all";

  function kingRows(g) {
    var h = "";
    for (var i = 0; i < g.kings.length; i++) {
      var k = g.kings[i];
      if (kingFilter !== "all" && k.realm !== kingFilter && k.realm !== "united") continue;
      var realm = { judah: "Judah (south)", israel: "Israel (north)", moab: "Moab (rebel vassal)", aram: "Aram (Damascus)" }[k.realm] || "United kingdom";
      var vtxt = k.verdict === "good" ? "Right in the LORD's sight" : k.verdict === "mixed" ? "Began well, ended badly" : "Evil in the LORD's sight";
      h += "<tr><td class=\"sk-kname\">" + esc(k.name) + "<span class=\"sk-kmeta\">" + esc(realm) + "</span></td>" +
        "<td>" + esc(k.reign) + "<span class=\"sk-kmeta\">" + esc(k.years) + "</span></td>" +
        "<td><span class=\"sk-verdict sk-v-" + esc(k.verdict) + "\">" + esc(vtxt) + "</span></td>" +
        "<td>" + esc(k.note) +
        (k.chapters && k.chapters[0] ? " <button type=\"button\" class=\"sk-klink\" data-study=\"goto\" data-n=\"" + k.chapters[0] + "\">ch. " + k.chapters[0] + "</button>" : "") +
        "</td></tr>";
    }
    return h;
  }

  function guideHtml(book) {
    injectStyles();
    var g = GUIDES[book] && window[GUIDES[book]];
    if (!g) return "";
    var open = lsGet(book + ".guide.open");
    // Open by default until the book's first chapter is marked read.
    var isOpen = open === null ? !(lsGet(book + ".story.readChapters") || "[]").match(/\d/) : open === "1";
    var h = "<details class=\"card sk-guide\" data-study-guide=\"" + esc(book) + "\"" + (isOpen ? " open" : "") + ">" +
      "<summary>\uD83D\uDC51 Before you read " + esc(LABELS[book]) + " <span class=\"sk-sub\">the big ideas, and every king's report card</span></summary>";
    h += "<p class=\"sk-bridge\">" + esc(g.bridge) + "</p>";
    h += "<h4 class=\"sk-h\">The shape of the book</h4><div class=\"sk-shape\">";
    for (var i = 0; i < g.shape.length; i++) {
      var s = g.shape[i];
      h += "<div><span>" + (s.range.indexOf("\u2013") === -1 ? "Chapter " : "Chapters ") + esc(s.range) + "</span><b>" + esc(s.label) + "</b>" + esc(s.note) + "</div>";
    }
    var nums = ["", "One idea", "Two ideas", "Three ideas", "Four ideas", "Five ideas", "Six ideas", "Seven ideas", "Eight ideas", "Nine ideas", "Ten ideas"];
    h += "</div><h4 class=\"sk-h\">" + (nums[g.themes.length] || "Ideas") + " that unlock it</h4><div class=\"sk-themes\">";
    for (var t = 0; t < g.themes.length; t++) {
      var th = g.themes[t];
      h += "<div class=\"sk-theme\"><h5>" + (t + 1) + ". " + esc(th.title) + "</h5><p>" + esc(th.body) +
        " <small>" + esc(th.refs) + "</small></p></div>";
    }
    h += "</div><h4 class=\"sk-h\">The kings' report card</h4>" +
      "<div class=\"sk-filter\" role=\"group\" aria-label=\"Filter kings\">";
    var fs = [["all", "All"], ["judah", "Judah (David's line)"], ["israel", "Israel (the north)"]];
    for (var f = 0; f < fs.length; f++) {
      h += "<button type=\"button\" data-study=\"kfilter\" data-v=\"" + fs[f][0] + "\" class=\"" +
        (kingFilter === fs[f][0] ? "on" : "") + "\">" + fs[f][1] + "</button>";
    }
    h += "</div><div class=\"sk-tablewrap\"><table class=\"sk-kings\"><thead><tr><th>King</th><th>Reign</th><th>Verdict</th><th>Why</th></tr></thead><tbody>" +
      kingRows(g) + "</tbody></table></div>";
    h += "<div class=\"sk-exportrow\">" +
      "<button type=\"button\" class=\"sk-btn\" data-study=\"export-sheet\">\uD83D\uDCCB Copy all my " + esc(LABELS[book]) + " notes for my sheet</button>" +
      "<button type=\"button\" class=\"sk-btn\" data-study=\"export-md\">⬇️ Download my notes (.md)</button>" +
      "</div></details>";
    return h;
  }

  /* ---------- verse memorizer ---------- */

  function memorizeHtml(kv) {
    injectStyles();
    if (!kv || !kv.text) return "";
    return "<div class=\"sk-mem\" data-verse=\"" + esc(kv.text) + "\">" +
      "<button type=\"button\" class=\"sk-btn\" data-study=\"mem\" data-level=\"1\">🧠 Practice this verse</button>" +
      "<div class=\"sk-memarea\"></div></div>";
  }

  function buildCloze(box, level) {
    var text = box.getAttribute("data-verse") || "";
    var words = text.split(/\s+/);
    var area = box.querySelector(".sk-memarea");
    var h = "<div class=\"sk-membox\">";
    var hidden = 0;
    for (var i = 0; i < words.length; i++) {
      var w = words[i];
      var core = w.replace(/[^A-Za-z']/g, "");
      // level 1: every 3rd long word, level 2: every other word, level 3: all
      var hide = core.length > 2 && (level >= 3 || (level === 2 ? i % 2 === 0 : i % 3 === 1));
      if (hide) {
        hidden++;
        h += "<button type=\"button\" class=\"sk-blank\" data-study=\"reveal\" aria-label=\"Reveal word\">" + esc(w) + "</button> ";
      } else {
        h += esc(w) + " ";
      }
    }
    h += "</div><div class=\"sk-memtools\">" +
      "<span class=\"sk-memscore\" data-left=\"" + hidden + "\">" + hidden + " words hidden — say it, then tap to check</span>" +
      (level < 3 ? "<button type=\"button\" class=\"sk-btn\" data-study=\"mem\" data-level=\"" + (level + 1) + "\">Harder →</button>" : "") +
      "<button type=\"button\" class=\"sk-btn\" data-study=\"mem-close\">Done</button></div>";
    area.innerHTML = h;
  }

  /* ---------- "From my study": Oscar's own Notion notes ---------- */
  // window.MY_STUDY[book][chapter] = { theme, questions[], takeaways[], practicalStep }
  // Each question is a <details>: read the question, think, then open it to
  // see what you wrote at the time and what you found.
  function myStudyHtml(book, n) {
    var all = window.MY_STUDY && window.MY_STUDY[book];
    var m = all && all[String(n)];
    if (!m) return "";
    var qs = m.questions || [];
    var h = "<section class=\"sk-study sk-mine\" aria-label=\"From my study\"><h4 class=\"sk-title\">\uD83D\uDCD3 From my study</h4>";
    if (m.theme) h += "<p class=\"sk-big\">" + esc(m.theme) + "</p>";
    if (qs.length) {
      var open = 0;
      for (var c = 0; c < qs.length; c++) if (qs[c].status && qs[c].status !== "Answered") open++;
      h += "<h4 class=\"sk-h\">My questions \u00B7 " + qs.length + (open ? " (" + open + " still open)" : "") +
        "</h4><p class=\"sk-hint\">Answer it in your head first, then tap to see what you found.</p><div class=\"sk-qs\">";
      for (var i = 0; i < qs.length; i++) {
        var q = qs[i];
        var st = q.status || "Answered";
        h += "<details class=\"sk-q\"><summary><span class=\"sk-qtext\">" + esc(q.q) + "</span>" +
          "<span class=\"sk-qmeta\">" + (q.passage ? esc(q.passage) + " \u00B7 " : "") + (q.type ? esc(q.type) + " \u00B7 " : "") +
          "<b class=\"sk-st sk-st-" + esc(st.toLowerCase()) + "\">" + esc(st) + "</b></span></summary>";
        if (q.thinking) h += "<p class=\"sk-para\"><em>My first thought:</em> " + esc(q.thinking) + "</p>";
        h += q.found ? "<p class=\"sk-para\"><em>What I found:</em> " + esc(q.found) + "</p>"
          : "<p class=\"sk-para sk-hint\">Still open \u2014 keep reading and write what you find in your notes below.</p>";
        if (q.refs) h += "<p class=\"sk-hint\">\uD83D\uDD0E " + esc(q.refs) + "</p>";
        h += "</details>";
      }
      h += "</div>";
    }
    if (m.takeaways && m.takeaways.length) {
      h += "<h4 class=\"sk-h\">Why I should care</h4><ol class=\"sk-reflect\">";
      for (var t = 0; t < m.takeaways.length; t++) h += "<li>" + esc(m.takeaways[t]) + "</li>";
      h += "</ol>";
    }
    if (m.practicalStep) h += "<p class=\"sk-para sk-home\"><b>This week:</b> " + esc(m.practicalStep) + "</p>";
    return h + "</section>";
  }

  /* ---------- per-chapter study block ---------- */

  function chapterHtml(book, ch) {
    injectStyles();
    var n = ch.num;
    var s = ch.study;
    var h = "";
    if (s) {
      h += "<section class=\"sk-study\" aria-label=\"Study this chapter\">" +
        "<h4 class=\"sk-title\">✍️ Study this chapter</h4>";
      if (s.bigIdea) h += "<h4 class=\"sk-h\" style=\"margin-top:0\">The big idea</h4><p class=\"sk-big\">" + esc(s.bigIdea) + "</p>";
      if (s.lookFor && s.lookFor.length) {
        var done = lookState(book, n);
        h += "<h4 class=\"sk-h\">Look for as you read</h4><ul class=\"sk-look\">";
        for (var i = 0; i < s.lookFor.length; i++) {
          var on = done.indexOf(i) !== -1;
          h += "<li><button type=\"button\" data-study=\"look\" data-i=\"" + i + "\" class=\"" + (on ? "on" : "") +
            "\" aria-pressed=\"" + on + "\"><span class=\"sk-box\">" + (on ? "✓" : "") + "</span><span class=\"sk-ltext\">" +
            esc(s.lookFor[i]) + "</span></button></li>";
        }
        h += "</ul>";
      }
      if (s.connection) h += "<h4 class=\"sk-h\">🔗 Connect the story</h4><p class=\"sk-para\">" + esc(s.connection) + "</p>";
      if (s.hitHome) h += "<h4 class=\"sk-h\">❤️ Let it hit home</h4><p class=\"sk-para sk-home\">" + esc(s.hitHome) + "</p>";
      if (s.reflect && s.reflect.length) {
        h += "<h4 class=\"sk-h\">Sit with these</h4><ol class=\"sk-reflect\">";
        for (var r = 0; r < s.reflect.length; r++) h += "<li>" + esc(s.reflect[r]) + "</li>";
        h += "</ol>";
      }
      if (s.prayer) h += "<p class=\"sk-prayer\">🙏 " + esc(s.prayer) + "</p>";
      h += "</section>";
    }
    h += myStudyHtml(book, n);
    var note = lsGet(noteKey(book, n)) || "";
    h += "<div class=\"sk-notes\"><h4 class=\"sk-h\">📝 My notes on " + esc(LABELS[book] || "") + " " + n + "</h4>" +
      "<textarea data-study-note=\"" + esc(book) + ":" + n + "\" placeholder=\"What struck you? What is God showing you? One line is enough.\">" +
      esc(note) + "</textarea><div class=\"sk-notebar\">" +
      "<button type=\"button\" class=\"sk-btn\" data-study=\"copy-row\">📋 Copy row for my sheet</button>" +
      "<span class=\"sk-saved\" aria-live=\"polite\">" + (note ? "Saved on this device" : "Saves as you type") + "</span></div></div>";
    h += questionsHtml(book, n);
    return h;
  }

  /* ---------- questions: common questions, discussion, my questions ---------- */
  // window.FAQ["kings1:5"] = [{ q, a, refs }]  (data/kings-faq.js)
  // window.COMMUNITY.giscus = { repo, repoId, category, categoryId } turns on a
  // public comment thread per chapter (GitHub Discussions via giscus); until it
  // is set, the Discussion tab explains and points to "My questions".
  var qTab = {};                       // "book:n" -> "faq" | "discuss" | "mine"
  function myqKey(book, n) { return book + ".myq." + n; }
  function myQuestions(book, n) {
    try { var a = JSON.parse(lsGet(myqKey(book, n)) || "[]"); return Array.isArray(a) ? a : []; } catch (e) { return []; }
  }
  function giscusCfg() {
    var c = window.COMMUNITY && window.COMMUNITY.giscus;
    return c && c.repo && c.repoId && c.category && c.categoryId ? c : null;
  }

  function questionsHtml(book, n) {
    var id = book + ":" + n;
    var faq = (window.FAQ && window.FAQ[id]) || [];
    var mine = myQuestions(book, n);
    var tab = qTab[id] || (faq.length ? "faq" : "mine");
    function tabBtn(key, label) {
      return "<button type=\"button\" role=\"tab\" data-study=\"qtab\" data-v=\"" + key + "\" aria-selected=\"" + (tab === key) +
        "\" class=\"" + (tab === key ? "on" : "") + "\">" + label + "</button>";
    }
    var h = "<section class=\"sk-qa\" aria-label=\"Questions\"><h4 class=\"sk-title\">\u2753 Questions on " + esc(LABELS[book] || "") + " " + n + "</h4>" +
      "<div class=\"sk-filter sk-qtabs\" role=\"tablist\">" +
      tabBtn("faq", "Common questions" + (faq.length ? " \u00B7 " + faq.length : "")) +
      tabBtn("discuss", "\uD83D\uDCAC Discussion") +
      tabBtn("mine", "My questions" + (mine.length ? " \u00B7 " + mine.length : "")) + "</div>";

    if (tab === "faq") {
      if (!faq.length) h += "<p class=\"sk-hint\">No common questions written for this chapter yet. Ask yours under My questions or in the Discussion.</p>";
      else {
        h += "<div class=\"sk-qs\">";
        for (var i = 0; i < faq.length; i++) {
          h += "<details class=\"sk-q\"><summary><span class=\"sk-qtext\">" + esc(faq[i].q) + "</span></summary>" +
            "<p class=\"sk-para\">" + esc(faq[i].a) + "</p>" +
            (faq[i].refs ? "<p class=\"sk-hint\">\uD83D\uDD0E " + esc(faq[i].refs) + "</p>" : "") + "</details>";
        }
        h += "</div>";
      }
    } else if (tab === "discuss") {
      if (giscusCfg()) {
        h += "<p class=\"sk-hint\">Questions and comments here are public, posted with a GitHub account, and shared by everyone reading " +
          esc(LABELS[book]) + " " + n + ".</p><div class=\"sk-giscus\" data-giscus-term=\"" + esc(book + "-" + n) + "\"></div>";
      } else {
        h += "<p class=\"sk-para\">A shared comment thread for this chapter, where readers can ask, answer, and react, is coming soon.</p>" +
          "<p class=\"sk-hint\">Until then, keep your questions under <b>My questions</b>; they stay on this device.</p>";
      }
    } else {
      h += "<form class=\"sk-myq-form\" data-myq=\"" + esc(id) + "\"><input type=\"text\" maxlength=\"300\" placeholder=\"What are you wondering about in this chapter?\" aria-label=\"Add a question\">" +
        "<button type=\"submit\" class=\"sk-btn\">Add</button></form>";
      if (!mine.length) h += "<p class=\"sk-hint\">Questions you add are saved on this device. Tick one off when you find the answer, and note what you found in My notes above.</p>";
      else {
        h += "<ul class=\"sk-look sk-myq\">";
        for (var m = 0; m < mine.length; m++) {
          var done = !!mine[m].done;
          h += "<li><button type=\"button\" data-study=\"myq-done\" data-i=\"" + m + "\" class=\"" + (done ? "on" : "") + "\" aria-pressed=\"" + done + "\">" +
            "<span class=\"sk-box\">" + (done ? "\u2713" : "") + "</span><span class=\"sk-ltext\">" + esc(mine[m].q) + "</span></button>" +
            "<button type=\"button\" class=\"sk-x\" data-study=\"myq-del\" data-i=\"" + m + "\" aria-label=\"Remove question\">\u00D7</button></li>";
        }
        h += "</ul>";
      }
      var nq = window.MY_STUDY && window.MY_STUDY[book] && window.MY_STUDY[book][String(n)];
      if (nq && nq.questions && nq.questions.length) h += "<p class=\"sk-hint\">Plus " + nq.questions.length + " from your Notion study, under \uD83D\uDCD3 From my study above.</p>";
    }
    return h + "</section>";
  }

  // giscus needs a real <script> element; mount it after story.js renders.
  function mountGiscus() {
    var cfg = giscusCfg();
    if (!cfg) return;
    var slots = document.querySelectorAll("#view-story .sk-giscus:not([data-mounted])");
    for (var i = 0; i < slots.length; i++) {
      var slot = slots[i];
      slot.setAttribute("data-mounted", "1");
      var sc = document.createElement("script");
      sc.src = "https://giscus.app/client.js";
      var attrs = {
        "data-repo": cfg.repo, "data-repo-id": cfg.repoId, "data-category": cfg.category, "data-category-id": cfg.categoryId,
        "data-mapping": "specific", "data-term": slot.getAttribute("data-giscus-term"), "data-strict": "1",
        "data-reactions-enabled": "1", "data-emit-metadata": "0", "data-input-position": "top",
        "data-theme": "preferred_color_scheme", "data-lang": "en", "data-loading": "lazy", "crossorigin": "anonymous"
      };
      for (var k in attrs) sc.setAttribute(k, attrs[k]);
      sc.async = true;
      slot.appendChild(sc);
    }
  }
  if (window.MutationObserver) {
    var mo = new MutationObserver(function () { mountGiscus(); });
    var startMo = function () {
      var root = document.getElementById("view-story");
      if (root) mo.observe(root, { childList: true, subtree: true });
    };
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", startMo); else startMo();
  }

  document.addEventListener("submit", function (ev) {
    var f = ev.target;
    if (!f || !f.getAttribute || !f.hasAttribute("data-myq")) return;
    ev.preventDefault();
    var parts = f.getAttribute("data-myq").split(":");
    var input = f.querySelector("input");
    var q = input && input.value.trim();
    if (!q) return;
    var list = myQuestions(parts[0], parts[1]);
    list.push({ q: q, done: false, at: new Date().toISOString().slice(0, 10) });
    lsSet(myqKey(parts[0], parts[1]), JSON.stringify(list));
    qTab[parts[0] + ":" + parts[1]] = "mine";
    if (window.StoryView && window.StoryView.refresh) window.StoryView.refresh();
    var again = document.querySelector("#view-story form[data-myq] input");
    if (again) again.focus();
  });

  /* ---------- export ---------- */

  function sheetCell(t) { return String(t || "").replace(/[\t\r\n]+/g, " ").trim(); }

  function copyText(text, btn) {
    function ok() { flash(btn, "✓ Copied"); }
    function fallback() {
      var ta = document.createElement("textarea");
      ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select();
      try { document.execCommand("copy"); ok(); } catch (e) { flash(btn, "Copy failed"); }
      document.body.removeChild(ta);
    }
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(ok, fallback);
      else fallback();
    } catch (e) { fallback(); }
  }

  function flash(btn, msg) {
    if (!btn) return;
    var old = btn.getAttribute("data-label") || btn.textContent;
    btn.setAttribute("data-label", old);
    btn.textContent = msg;
    setTimeout(function () { btn.textContent = old; }, 1400);
  }

  function allNotes(book) {
    var out = [];
    var list = chaptersOf(book);
    for (var i = 0; i < list.length; i++) {
      var note = lsGet(noteKey(book, list[i].num));
      if (note && note.trim()) out.push({ ch: list[i], note: note });
    }
    return out;
  }

  function exportSheet(book, btn) {
    var notes = allNotes(book);
    if (!notes.length) { flash(btn, "No notes yet"); return; }
    var rows = [];
    for (var i = 0; i < notes.length; i++) rows.push(LABELS[book] + " " + notes[i].ch.num + "\t" + sheetCell(notes[i].note));
    copyText(rows.join("\n"), btn);
  }

  function exportMd(book, btn) {
    var notes = allNotes(book);
    if (!notes.length) { flash(btn, "No notes yet"); return; }
    var md = "# My notes on " + LABELS[book] + "\n";
    for (var i = 0; i < notes.length; i++) {
      var c = notes[i].ch;
      md += "\n## " + LABELS[book] + " " + c.num + (c.title ? " — " + c.title : "") + "\n\n";
      if (c.keyVerse && c.keyVerse.text) md += "> " + c.keyVerse.text + " (" + c.keyVerse.ref + ")\n\n";
      md += notes[i].note.trim() + "\n";
    }
    try {
      var blob = new Blob([md], { type: "text/markdown" });
      var a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = book + "-notes.md";
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
      setTimeout(function () { URL.revokeObjectURL(a.href); }, 2000);
      flash(btn, "✓ Downloaded");
    } catch (e) { copyText(md, btn); }
  }

  /* ---------- actions ---------- */

  function onAction(node, book, n) {
    var act = node.getAttribute("data-study");
    if (act === "look") {
      var i = parseInt(node.getAttribute("data-i"), 10);
      var st = lookState(book, n);
      var at = st.indexOf(i);
      if (at === -1) st.push(i); else st.splice(at, 1);
      lsSet(lookKey(book, n), JSON.stringify(st));
      var on = at === -1;
      node.classList.toggle("on", on);
      node.setAttribute("aria-pressed", String(on));
      node.querySelector(".sk-box").textContent = on ? "✓" : "";
      return;
    }
    if (act === "mem") {
      var box = node.closest(".sk-mem");
      if (box) buildCloze(box, parseInt(node.getAttribute("data-level"), 10) || 1);
      return;
    }
    if (act === "mem-close") {
      var mb = node.closest(".sk-mem");
      if (mb) mb.querySelector(".sk-memarea").innerHTML = "";
      return;
    }
    if (act === "reveal") {
      if (node.classList.contains("shown")) return;
      node.classList.add("shown");
      var score = node.closest(".sk-mem").querySelector(".sk-memscore");
      var left = Math.max(0, (parseInt(score.getAttribute("data-left"), 10) || 1) - 1);
      score.setAttribute("data-left", left);
      score.textContent = left ? left + " to go" : "✨ Whole verse revealed — try 'Harder'";
      return;
    }
    if (act === "copy-row") {
      var ta = node.closest(".sk-notes").querySelector("textarea");
      copyText((LABELS[book] || "") + " " + n + "\t" + sheetCell(ta ? ta.value : ""), node);
      return;
    }
    if (act === "kfilter") {
      kingFilter = node.getAttribute("data-v") || "all";
      return "rerender";
    }
    if (act === "goto") {
      if (window.App) window.App.goToChapter(parseInt(node.getAttribute("data-n"), 10), book);
      return;
    }
    if (act === "qtab") {
      qTab[book + ":" + n] = node.getAttribute("data-v");
      return "rerender";
    }
    if (act === "myq-done" || act === "myq-del") {
      var qi = parseInt(node.getAttribute("data-i"), 10);
      var ql = myQuestions(book, n);
      if (!ql[qi]) return;
      if (act === "myq-del") ql.splice(qi, 1); else ql[qi].done = !ql[qi].done;
      lsSet(myqKey(book, n), JSON.stringify(ql));
      return "rerender";
    }
    if (act === "export-sheet") { exportSheet(book, node); return; }
    if (act === "export-md") { exportMd(book, node); return; }
  }

  // Notes autosave (delegated; the textarea is re-created on every render).
  var timers = {};
  document.addEventListener("input", function (ev) {
    var t = ev.target;
    if (!t || !t.getAttribute || !t.hasAttribute("data-study-note")) return;
    var parts = t.getAttribute("data-study-note").split(":");
    var k = noteKey(parts[0], parts[1]);
    clearTimeout(timers[k]);
    var label = t.parentNode.querySelector(".sk-saved");
    if (label) label.textContent = "Saving…";
    timers[k] = setTimeout(function () {
      lsSet(k, t.value);
      if (label) label.textContent = "Saved on this device";
    }, 400);
  });
  // Remember whether the primer is open.
  document.addEventListener("toggle", function (ev) {
    var t = ev.target;
    if (t && t.getAttribute && t.hasAttribute("data-study-guide")) lsSet(t.getAttribute("data-study-guide") + ".guide.open", t.open ? "1" : "0");
  }, true);

  window.StudyKit = {
    guideHtml: guideHtml,
    memorizeHtml: memorizeHtml,
    chapterHtml: chapterHtml,
    onAction: onAction
  };
})();
