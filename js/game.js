// js/game.js — window.GameView (Game Dev)
// "The Shepherd's Quest": quiz + journey-ordering games, rendered entirely in #view-game.
// Plain script globals, no modules. Defensive against missing data globals.
(function () {
  "use strict";

  var QUIZ_LENGTH = 10;           // questions per round (capped by pool size)
  var BEST_KEY = "shepherdsQuestBest";

  // ---------- helpers ----------

  function root() {
    return document.getElementById("view-game");
  }

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function loadBest() {
    try {
      var raw = localStorage.getItem(BEST_KEY);
      if (!raw) return null;
      var v = JSON.parse(raw);
      if (v && typeof v.score === "number" && typeof v.total === "number") return v;
    } catch (e) { /* storage unavailable — ignore */ }
    return null;
  }

  function saveBest(score, total) {
    try {
      var prev = loadBest();
      if (!prev || (total > 0 && score / total > prev.score / prev.total) ||
          (prev && score / total === prev.score / prev.total && score > prev.score)) {
        localStorage.setItem(BEST_KEY, JSON.stringify({ score: score, total: total }));
        return true;
      }
    } catch (e) { /* ignore */ }
    return false;
  }

  function quizData() {
    return (Array.isArray(window.QUIZ) && window.QUIZ.length) ? window.QUIZ : null;
  }

  function journeyData() {
    return (Array.isArray(window.JOURNEYS) && window.JOURNEYS.length) ? window.JOURNEYS : null;
  }

  function locationName(locId) {
    if (Array.isArray(window.LOCATIONS)) {
      for (var i = 0; i < window.LOCATIONS.length; i++) {
        var l = window.LOCATIONS[i];
        if (l && l.id === locId) return l.name || locId;
      }
    }
    // fall back to a prettified id, e.g. "beth-shemesh" -> "Beth-Shemesh"
    return String(locId || "?").replace(/(^|[-_ ])(\w)/g, function (m, sep, c) {
      return (sep ? "-" : "") + c.toUpperCase();
    });
  }

  function rankFor(score, total) {
    var pct = total > 0 ? score / total : 0;
    if (pct >= 0.9) return { title: "Anointed One", note: "Like David at Bethlehem — the LORD looks on the heart, and yours knows this book." };
    if (pct >= 0.7) return { title: "Captain of Thousands", note: "You lead the ranks with skill. A few more watches over the scrolls and the crown awaits." };
    if (pct >= 0.4) return { title: "Armor-bearer", note: "Faithful at your captain's side. Climb the cliff at Michmash again — glory is near." };
    return { title: "Shepherd of Bethlehem", note: "Every anointed king begins among the sheepfolds. Return to the scrolls and try again." };
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

  function goToChapter(num, book) {
    if (window.App && typeof window.App.goToChapter === "function") window.App.goToChapter(num, book);
  }

  // ---------- styles (scoped under #view-game) ----------

  var STYLE_ID = "shepherds-quest-style";
  var CSS = [
    "#view-game .sq-wrap { max-width: 720px; margin: 0 auto; padding: 8px 0 32px; }",
    "#view-game .sq-title { font-family: Georgia, 'Times New Roman', serif; color: var(--gold, #b8860b); text-align: center; font-size: 2rem; margin: 12px 0 4px; letter-spacing: .03em; }",
    "#view-game .sq-sub { text-align: center; color: var(--muted, #7a6f5d); font-style: italic; margin: 0 0 20px; }",
    "#view-game .sq-modes { display: flex; gap: 16px; flex-wrap: wrap; justify-content: center; }",
    "#view-game .sq-mode-card { flex: 1 1 260px; max-width: 330px; text-align: center; cursor: pointer; border: 1px solid var(--line, #d8cdb8); transition: transform .18s ease, box-shadow .18s ease, border-color .18s ease; }",
    "#view-game .sq-mode-card:hover { transform: translateY(-3px); box-shadow: 0 6px 18px rgba(0,0,0,.12); border-color: var(--gold, #b8860b); }",
    "#view-game .sq-mode-card h3 { font-family: Georgia, serif; color: var(--accent, #1f3a5f); margin: 6px 0; }",
    "#view-game .sq-emblem { font-size: 2.2rem; line-height: 1; }",
    "#view-game .sq-best { text-align: center; color: var(--muted, #7a6f5d); margin-top: 18px; font-size: .9rem; }",
    "#view-game .sq-hud { display: flex; justify-content: space-between; align-items: center; gap: 8px; margin-bottom: 12px; flex-wrap: wrap; }",
    "#view-game .sq-hud .sq-stat { font-size: .9rem; color: var(--muted, #7a6f5d); }",
    "#view-game .sq-hud .sq-stat strong { color: var(--accent, #1f3a5f); }",
    "#view-game .sq-streak-hot { color: var(--gold, #b8860b) !important; }",
    "#view-game .sq-progress { height: 6px; background: var(--line, #d8cdb8); border-radius: 3px; overflow: hidden; margin-bottom: 16px; }",
    "#view-game .sq-progress > div { height: 100%; width: 0; background: var(--gold, #b8860b); border-radius: 3px; transition: width .35s ease; }",
    "#view-game .sq-q { font-family: Georgia, serif; font-size: 1.15rem; margin: 0 0 16px; line-height: 1.5; }",
    "#view-game .sq-choices { display: grid; gap: 10px; }",
    "#view-game .sq-choice { text-align: left; padding: 12px 14px; font-size: 1rem; line-height: 1.35; cursor: pointer; border-radius: 8px; border: 1px solid var(--line, #d8cdb8); background: var(--panel, #fdf8ec); color: var(--ink, #2b2417); transition: border-color .15s ease, background .15s ease, transform .1s ease; }",
    "#view-game .sq-choice:hover:not(:disabled) { border-color: var(--accent, #1f3a5f); transform: translateX(3px); }",
    "#view-game .sq-choice:disabled { cursor: default; opacity: .85; }",
    "#view-game .sq-choice.sq-correct { background: #2e7d3222; border-color: #2e7d32; color: inherit; font-weight: 600; }",
    "#view-game .sq-choice.sq-wrong { background: #b71c1c22; border-color: #b71c1c; }",
    "#view-game .sq-shake { animation: sq-shake .4s ease; }",
    "@keyframes sq-shake { 0%,100% { transform: translateX(0); } 20%,60% { transform: translateX(-6px); } 40%,80% { transform: translateX(6px); } }",
    "#view-game .sq-pop { animation: sq-pop .3s ease; }",
    "@keyframes sq-pop { 0% { transform: scale(.96); } 60% { transform: scale(1.02); } 100% { transform: scale(1); } }",
    "#view-game .sq-fade { animation: sq-fade .35s ease; }",
    "@keyframes sq-fade { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }",
    "#view-game .sq-feedback { margin-top: 14px; padding: 12px 14px; border-left: 4px solid var(--gold, #b8860b); background: var(--panel, #fdf8ec); border-radius: 0 8px 8px 0; }",
    "#view-game .sq-feedback .sq-verdict { font-family: Georgia, serif; font-weight: 700; margin: 0 0 6px; }",
    "#view-game .sq-verdict.good { color: #2e7d32; }",
    "#view-game .sq-verdict.bad { color: #b71c1c; }",
    "#view-game .sq-feedback p { margin: 0 0 8px; }",
    "#view-game .sq-linkbtn { background: none; border: none; padding: 0; color: var(--accent, #1f3a5f); text-decoration: underline; cursor: pointer; font-size: .92rem; }",
    "#view-game .sq-actions { margin-top: 16px; display: flex; gap: 10px; flex-wrap: wrap; justify-content: center; }",
    "#view-game .sq-end { text-align: center; }",
    "#view-game .sq-rank { font-family: Georgia, serif; font-size: 1.6rem; color: var(--gold, #b8860b); margin: 8px 0 4px; }",
    "#view-game .sq-score-big { font-size: 2.4rem; font-family: Georgia, serif; color: var(--accent, #1f3a5f); margin: 10px 0; }",
    "#view-game .sq-newbest { display: inline-block; padding: 3px 12px; border-radius: 999px; background: var(--gold, #b8860b); color: #fff; font-size: .8rem; letter-spacing: .05em; margin-bottom: 8px; }",
    "#view-game .sq-journey-list { display: grid; gap: 12px; }",
    "#view-game .sq-journey-pick { text-align: left; cursor: pointer; border: 1px solid var(--line, #d8cdb8); border-left-width: 6px; transition: transform .15s ease, box-shadow .15s ease; }",
    "#view-game .sq-journey-pick:hover { transform: translateY(-2px); box-shadow: 0 4px 14px rgba(0,0,0,.1); }",
    "#view-game .sq-journey-pick h4 { margin: 0 0 4px; font-family: Georgia, serif; color: var(--accent, #1f3a5f); }",
    "#view-game .sq-journey-pick .sq-meta { font-size: .85rem; color: var(--muted, #7a6f5d); }",
    "#view-game .sq-stops { display: flex; flex-wrap: wrap; gap: 10px; margin: 16px 0; }",
    "#view-game .sq-stop { padding: 10px 16px; border-radius: 999px; border: 1px solid var(--line, #d8cdb8); background: var(--panel, #fdf8ec); color: var(--ink, #2b2417); font-size: .95rem; cursor: pointer; transition: background .2s ease, border-color .2s ease, opacity .2s ease; }",
    "#view-game .sq-stop:hover:not(:disabled) { border-color: var(--accent, #1f3a5f); }",
    "#view-game .sq-stop.sq-locked { background: #2e7d32; border-color: #2e7d32; color: #fff; cursor: default; }",
    "#view-game .sq-stop.sq-flash { animation: sq-shake .4s ease; background: #b71c1c33; border-color: #b71c1c; }",
    "#view-game .sq-trail { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; min-height: 30px; margin-bottom: 4px; font-size: .9rem; color: var(--muted, #7a6f5d); }",
    "#view-game .sq-trail .sq-trail-stop { color: var(--accent, #1f3a5f); font-weight: 600; }",
    "#view-game .sq-hint { font-size: .85rem; color: var(--muted, #7a6f5d); font-style: italic; }",
    "@media (max-width: 720px) { #view-game .sq-title { font-size: 1.5rem; } #view-game .sq-modes { flex-direction: column; align-items: stretch; } #view-game .sq-mode-card { max-width: none; } }"
  ].join("\n");

  function injectStyles() {
    if (document.getElementById(STYLE_ID)) return;
    var s = document.createElement("style");
    s.id = STYLE_ID;
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  // ---------- screens ----------

  function renderStart() {
    var host = root();
    if (!host) return;
    host.innerHTML = "";
    var wrap = el("div", "sq-wrap sq-fade");

    wrap.appendChild(el("h2", "sq-title", "⚔️ The Shepherd&rsquo;s Quest"));
    wrap.appendChild(el("p", "sq-sub",
      "From the sheepfolds of Bethlehem to the throne of Israel &mdash; prove your knowledge of 1&nbsp;Samuel."));

    var modes = el("div", "sq-modes");

    var quizCard = el("div", "card sq-mode-card");
    quizCard.setAttribute("role", "button");
    quizCard.setAttribute("tabindex", "0");
    quizCard.appendChild(el("div", "sq-emblem", "📜"));
    quizCard.appendChild(el("h3", null, "Scroll of Knowledge"));
    quizCard.appendChild(el("p", null, quizData()
      ? "Answer " + Math.min(QUIZ_LENGTH, quizData().length) + " questions drawn from both books of Samuel. Build a streak, earn your rank."
      : "The scrolls have not yet arrived&hellip;"));
    function startQuiz() {
      if (quizData()) beginQuiz();
      else renderPlaceholder("The quiz scrolls have not been delivered yet (data/quiz.js is missing or empty). Check back soon!");
    }
    quizCard.addEventListener("click", startQuiz);
    quizCard.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); startQuiz(); } });
    modes.appendChild(quizCard);

    var jCard = el("div", "card sq-mode-card");
    jCard.setAttribute("role", "button");
    jCard.setAttribute("tabindex", "0");
    jCard.appendChild(el("div", "sq-emblem", "🗺️"));
    jCard.appendChild(el("h3", null, "Journey of the Fugitive"));
    jCard.appendChild(el("p", null, journeyData()
      ? "Retrace the great journeys of 1&nbsp;Samuel &mdash; tap the stops in the order they happened."
      : "The maps are still being drawn&hellip;"));
    function startJourney() {
      if (journeyData()) renderJourneyPick();
      else renderPlaceholder("The journey maps are still being drawn (data/journeys.js is missing or empty). Check back soon!");
    }
    jCard.addEventListener("click", startJourney);
    jCard.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); startJourney(); } });
    modes.appendChild(jCard);

    wrap.appendChild(modes);

    var best = loadBest();
    if (best) {
      wrap.appendChild(el("div", "sq-best",
        "🏆 Best scroll score: <strong>" + best.score + " / " + best.total + "</strong> &mdash; " +
        esc(rankFor(best.score, best.total).title)));
    }

    host.appendChild(wrap);
  }

  function renderPlaceholder(msg) {
    var host = root();
    if (!host) return;
    host.innerHTML = "";
    var wrap = el("div", "sq-wrap sq-fade");
    var card = el("div", "card sq-end");
    card.appendChild(el("div", "sq-emblem", "🕊️"));
    card.appendChild(el("p", null, esc(msg)));
    var back = el("button", "btn", "Back to camp");
    back.addEventListener("click", renderStart);
    var actions = el("div", "sq-actions");
    actions.appendChild(back);
    card.appendChild(actions);
    wrap.appendChild(card);
    host.appendChild(wrap);
  }

  // ---------- Mode 1: Scroll of Knowledge ----------

  function beginQuiz() {
    var pool = quizData();
    if (!pool) { renderPlaceholder("The quiz scrolls are missing."); return; }
    var state = {
      questions: shuffle(pool).slice(0, Math.min(QUIZ_LENGTH, pool.length)),
      index: 0,
      score: 0,
      streak: 0,
      bestStreak: 0
    };
    renderQuestion(state);
  }

  function renderQuestion(state) {
    var host = root();
    if (!host) return;
    var q = state.questions[state.index];
    host.innerHTML = "";
    var wrap = el("div", "sq-wrap sq-fade");

    var hud = el("div", "sq-hud");
    hud.appendChild(el("span", "sq-stat", "📜 Question <strong>" + (state.index + 1) + "</strong> of " + state.questions.length));
    hud.appendChild(el("span", "sq-stat", "Score <strong>" + state.score + "</strong>"));
    var streakEl = el("span", "sq-stat" + (state.streak >= 3 ? " sq-streak-hot" : ""),
      (state.streak >= 3 ? "🔥 " : "") + "Streak <strong" + (state.streak >= 3 ? " class=\"sq-streak-hot\"" : "") + ">" + state.streak + "</strong>");
    hud.appendChild(streakEl);
    wrap.appendChild(hud);

    var prog = el("div", "sq-progress");
    var bar = el("div");
    prog.appendChild(bar);
    wrap.appendChild(prog);
    setTimeout(function () { bar.style.width = ((state.index / state.questions.length) * 100) + "%"; }, 20);

    var card = el("div", "card");
    card.appendChild(el("p", "sq-q", esc(q.q)));

    // display the choices in a shuffled order so the right answer moves around
    var order = shuffle((q.choices || []).map(function (_, i) { return i; }));
    var correctPos = order.indexOf(q.answer);

    var choicesBox = el("div", "sq-choices");
    var buttons = [];
    order.forEach(function (origIdx, pos) {
      var b = el("button", "sq-choice", esc(q.choices[origIdx]));
      b.addEventListener("click", function () { answer(pos, b); });
      buttons.push(b);
      choicesBox.appendChild(b);
    });
    card.appendChild(choicesBox);

    var answered = false;
    function answer(pos, btn) {
      if (answered) return;
      answered = true;
      var correct = pos === correctPos;
      buttons.forEach(function (b) { b.disabled = true; });
      if (buttons[correctPos]) buttons[correctPos].classList.add("sq-correct", "sq-pop");
      if (correct) {
        state.score++;
        state.streak++;
        if (state.streak > state.bestStreak) state.bestStreak = state.streak;
      } else {
        state.streak = 0;
        btn.classList.add("sq-wrong", "sq-shake");
      }

      var fb = el("div", "sq-feedback sq-fade");
      fb.appendChild(el("p", "sq-verdict " + (correct ? "good" : "bad"),
        correct ? (state.streak >= 3 ? "🔥 Correct — " + state.streak + " in a row!" : "✓ Correct!")
                : "✗ Not quite."));
      if (q.explain) fb.appendChild(el("p", null, esc(q.explain)));
      if (q.chapter) {
        var bookName = q.book === "samuel2" ? "2 Samuel" : "1 Samuel";
        var link = el("button", "sq-linkbtn", "📖 Read " + bookName + " " + esc(q.chapter));
        link.addEventListener("click", function () { goToChapter(q.chapter, q.book === "samuel2" ? "samuel2" : undefined); });
        fb.appendChild(link);
      }
      card.appendChild(fb);

      var actions = el("div", "sq-actions");
      var last = state.index + 1 >= state.questions.length;
      var next = el("button", "btn", last ? "See your rank →" : "Next question →");
      next.addEventListener("click", function () {
        if (last) { renderQuizEnd(state); }
        else { state.index++; renderQuestion(state); }
      });
      actions.appendChild(next);
      card.appendChild(actions);
      next.focus();
    }

    wrap.appendChild(card);
    host.appendChild(wrap);
  }

  function renderQuizEnd(state) {
    var host = root();
    if (!host) return;
    host.innerHTML = "";
    var total = state.questions.length;
    var isNewBest = saveBest(state.score, total);
    var rank = rankFor(state.score, total);

    var wrap = el("div", "sq-wrap sq-fade");
    var card = el("div", "card sq-end");
    card.appendChild(el("div", "sq-emblem sq-pop", "👑"));
    card.appendChild(el("p", "sq-sub", "The scroll is complete. Your rank in Israel:"));
    card.appendChild(el("h3", "sq-rank", esc(rank.title)));
    card.appendChild(el("div", "sq-score-big", state.score + " / " + total));
    if (isNewBest) card.appendChild(el("div", "sq-newbest", "✦ NEW BEST ✦"));
    card.appendChild(el("p", null, esc(rank.note)));
    if (state.bestStreak >= 3) {
      card.appendChild(el("p", "sq-hint", "Longest streak: " + state.bestStreak + " in a row 🔥"));
    }

    var actions = el("div", "sq-actions");
    var again = el("button", "btn", "Read the scroll again");
    again.addEventListener("click", beginQuiz);
    var back = el("button", "btn", "Back to camp");
    back.addEventListener("click", renderStart);
    actions.appendChild(again);
    actions.appendChild(back);
    card.appendChild(actions);

    wrap.appendChild(card);
    host.appendChild(wrap);
  }

  // ---------- Mode 2: Journey of the Fugitive ----------

  function renderJourneyPick() {
    var host = root();
    var journeys = journeyData();
    if (!host) return;
    if (!journeys) { renderPlaceholder("The journey maps are still being drawn."); return; }

    host.innerHTML = "";
    var wrap = el("div", "sq-wrap sq-fade");
    wrap.appendChild(el("h2", "sq-title", "🗺️ Journey of the Fugitive"));
    wrap.appendChild(el("p", "sq-sub", "Choose a journey, then tap its stops in the order they happened."));

    var list = el("div", "sq-journey-list");
    journeys.forEach(function (j) {
      if (!j || !Array.isArray(j.stops) || j.stops.length < 2) return;
      var pick = el("button", "card sq-journey-pick");
      if (j.color) pick.style.borderLeftColor = j.color;
      pick.appendChild(el("h4", null, esc(j.title || "Untitled journey")));
      pick.appendChild(el("div", "sq-meta", j.stops.length + " stops" +
        (Array.isArray(j.chapters) && j.chapters.length ? " · " + (j.book === "samuel2" ? "2 Samuel " : "1 Samuel ") + esc(j.chapters.join(", ")) : "")));
      pick.addEventListener("click", function () { beginJourney(j); });
      list.appendChild(pick);
    });
    if (!list.children.length) {
      wrap.appendChild(el("p", "sq-sub", "No journeys with enough stops were found."));
    } else {
      wrap.appendChild(list);
    }

    var actions = el("div", "sq-actions");
    var back = el("button", "btn", "Back to camp");
    back.addEventListener("click", renderStart);
    actions.appendChild(back);
    wrap.appendChild(actions);

    host.appendChild(wrap);
  }

  function beginJourney(journey) {
    var state = {
      journey: journey,
      order: journey.stops.map(function (s, i) { return i; }), // correct order = stop indices
      next: 0,           // how many locked in so far
      missteps: 0
    };
    state.shuffled = shuffle(state.order);
    // avoid a trivially pre-solved board when possible
    var same = state.shuffled.every(function (v, i) { return v === i; });
    if (same && state.order.length > 1) state.shuffled.reverse();
    renderJourneyBoard(state);
  }

  function renderJourneyBoard(state) {
    var host = root();
    if (!host) return;
    var j = state.journey;
    host.innerHTML = "";
    var wrap = el("div", "sq-wrap sq-fade");

    wrap.appendChild(el("h2", "sq-title", esc(j.title || "The Journey")));
    wrap.appendChild(el("p", "sq-sub", "Tap the stops in the order the journey happened."));

    var card = el("div", "card");
    var trail = el("div", "sq-trail", "<span class=\"sq-hint\">Your trail:</span>");
    card.appendChild(trail);

    var stopsBox = el("div", "sq-stops");
    card.appendChild(stopsBox);
    card.appendChild(el("p", "sq-hint", "A wrong stop flashes red — the trail waits for the true road."));

    function refreshTrail() {
      var parts = ["<span class=\"sq-hint\">Your trail:</span>"];
      for (var i = 0; i < state.next; i++) {
        if (i > 0) parts.push("→");
        parts.push("<span class=\"sq-trail-stop\">" + esc(locationName(j.stops[i].loc)) + "</span>");
      }
      trail.innerHTML = parts.join(" ");
    }

    state.shuffled.forEach(function (stopIdx) {
      var stop = j.stops[stopIdx];
      var b = el("button", "sq-stop", esc(locationName(stop && stop.loc)));
      b.addEventListener("click", function () {
        if (b.disabled) return;
        if (stopIdx === state.next) {
          b.disabled = true;
          b.classList.remove("sq-flash");
          b.classList.add("sq-locked", "sq-pop");
          state.next++;
          refreshTrail();
          if (state.next >= j.stops.length) {
            setTimeout(function () { renderJourneyEnd(state); }, 550);
          }
        } else {
          state.missteps++;
          b.classList.remove("sq-flash");
          void b.offsetWidth; // restart the animation
          b.classList.add("sq-flash");
          setTimeout(function () { b.classList.remove("sq-flash"); }, 450);
        }
      });
      stopsBox.appendChild(b);
    });

    var actions = el("div", "sq-actions");
    var back = el("button", "btn", "Choose another journey");
    back.addEventListener("click", renderJourneyPick);
    actions.appendChild(back);
    wrap.appendChild(card);
    wrap.appendChild(actions);
    host.appendChild(wrap);
  }

  function renderJourneyEnd(state) {
    var host = root();
    if (!host) return;
    var j = state.journey;
    host.innerHTML = "";
    var wrap = el("div", "sq-wrap sq-fade");

    var card = el("div", "card sq-end");
    card.appendChild(el("div", "sq-emblem sq-pop", state.missteps === 0 ? "🌟" : "🏕️"));
    card.appendChild(el("h3", "sq-rank", "Journey complete!"));
    card.appendChild(el("p", "sq-sub",
      state.missteps === 0 ? "A perfect road — not one wrong turn."
        : "You found the road after " + state.missteps + " wrong turn" + (state.missteps === 1 ? "" : "s") + "."));

    var route = j.stops.map(function (s) { return esc(locationName(s && s.loc)); }).join(" → ");
    card.appendChild(el("p", null, "<strong>" + route + "</strong>"));
    if (j.description) card.appendChild(el("p", null, esc(j.description)));

    var actions = el("div", "sq-actions");
    var firstStop = j.stops[0];
    var mapBtn = el("button", "btn", "🗺️ View on map");
    mapBtn.addEventListener("click", function () {
      if (window.App && typeof window.App.focusLocation === "function" && firstStop && firstStop.loc) {
        window.App.focusLocation(firstStop.loc);
      } else if (window.App && typeof window.App.showView === "function") {
        window.App.showView("map");
      }
    });
    actions.appendChild(mapBtn);

    var again = el("button", "btn", "Another journey");
    again.addEventListener("click", renderJourneyPick);
    actions.appendChild(again);

    var back = el("button", "btn", "Back to camp");
    back.addEventListener("click", renderStart);
    actions.appendChild(back);

    card.appendChild(actions);
    wrap.appendChild(card);
    host.appendChild(wrap);
  }

  // ---------- public API ----------

  window.GameView = {
    init: function () {
      try {
        if (!root()) return;      // shell not ready; nothing to do
        injectStyles();
        renderStart();
      } catch (e) {
        // last-resort: never let the game break the app
        var host = root();
        if (host) host.innerHTML = "<div class=\"card\"><p>The Shepherd's Quest could not be set up. Please reload the page.</p></div>";
      }
    }
  };
})();
