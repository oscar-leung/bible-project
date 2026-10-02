/* js/battle-ziklag.js — window.ZiklagView (Game Dev)
   "The Raid on Ziklag" — interactive retelling of 1 Samuel 30.
   Five stages: the smoking town (choice), the ephod, the brook Besor
   (choice + revive-the-Egyptian interaction), the twilight-to-evening
   rout (strike-the-fires minigame), and the statute of sharing (choice).
   Renders only inside #view-battle; reads window.BATTLE_ZIKLAG.
   Staging follows Eric's books-of-samuel reenactment beats (credited
   in-app on the final stage). */

(function () {
  "use strict";

  var state = {
    stage: 0,          // index into data().stages
    unlocked: 1,       // how many stages are reachable
    fed: {},           // which provisions the Egyptian has received
    fires: 0,          // fires struck in the rout
    wave: 0,           // current rout wave
    camelClicks: 0,
    eggFound: false,
    timers: []
  };

  function data() { return window.BATTLE_ZIKLAG || null; }
  function root() { return document.getElementById("view-battle"); }

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
  function later(fn, ms) {
    state.timers.push(setTimeout(function () {
      try { fn(); } catch (e) { /* an ember must never break the view */ }
    }, ms));
  }
  function clearTimers() {
    try { for (var i = 0; i < state.timers.length; i++) clearTimeout(state.timers[i]); } catch (e) { /* none */ }
    state.timers = [];
  }

  // ---------- styles (scoped to #view-battle, zk- prefix) ----------
  var STYLE_ID = "battle-ziklag-style";
  var CSS = [
    // Shared shell classes (hub chip, stage nav, chips) are also declared by
    // the other battle modules; duplicating them here keeps this battle
    // whole when it is the first one opened.
    "#view-battle .br-hubrow { display: flex; justify-content: flex-start; margin: 4px 0 0; }",
    "#view-battle .br-hubchip { border: 1px solid var(--line, #d8cdb8); background: var(--panel, #fdf8ec); color: var(--muted, #7a6f5d); border-radius: 999px; padding: 4px 12px; font-size: .8rem; cursor: pointer; }",
    "#view-battle .br-hubchip:hover { border-color: var(--gold, #b8860b); color: var(--ink, #2b2417); }",
    "#view-battle .br-stagenav { display: flex; gap: 8px; flex-wrap: wrap; justify-content: center; margin: 0 0 20px; }",
    "#view-battle .br-stagechip { border: 1px solid var(--line, #d8cdb8); background: var(--panel, #fdf8ec); color: var(--muted, #7a6f5d); border-radius: 999px; padding: 6px 14px; font-size: .85rem; cursor: default; }",
    "#view-battle .br-stagechip.br-open { cursor: pointer; color: var(--ink, #2b2417); }",
    "#view-battle .br-stagechip.br-open:hover { border-color: var(--gold, #b8860b); }",
    "#view-battle .br-stagechip.br-here { border-color: var(--gold, #b8860b); color: var(--gold, #b8860b); font-weight: 700; }",
    "#view-battle .br-stagechip.br-locked { opacity: .5; }",
    "#view-battle .br-chip { display: inline-block; border: 1px solid var(--gold, #b8860b); color: var(--accent, #1f3a5f); background: var(--panel, #fdf8ec); border-radius: 999px; padding: 8px 16px; font-size: .9rem; cursor: pointer; }",
    "#view-battle .zk-wrap { max-width: 760px; margin: 0 auto; padding: 8px 0 40px; }",
    "#view-battle .zk-title { font-family: Georgia, 'Times New Roman', serif; color: var(--gold, #b8860b); text-align: center; font-size: 2rem; margin: 12px 0 2px; letter-spacing: .03em; }",
    "#view-battle .zk-sub { text-align: center; color: var(--muted, #7a6f5d); font-style: italic; margin: 0 0 18px; }",
    "#view-battle .zk-fade { animation: zk-fade .4s ease; }",
    "@keyframes zk-fade { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }",
    "#view-battle .zk-heading { font-family: Georgia, serif; color: var(--accent, #1f3a5f); font-size: 1.4rem; margin: 0 0 12px; }",
    "#view-battle .zk-verse { margin: 14px 0; padding: 12px 16px; border-left: 4px solid var(--gold, #b8860b); background: var(--panel, #fdf8ec); border-radius: 0 8px 8px 0; }",
    "#view-battle .zk-verse-text { font-family: Georgia, serif; font-style: italic; margin: 0 0 6px; line-height: 1.55; }",
    "#view-battle .zk-verse-ref { display: block; font-size: .85rem; color: var(--muted, #7a6f5d); }",
    "#view-battle .zk-note { border: 1px dashed var(--gold, #b8860b); background: var(--panel, #fdf8ec); margin: 16px 0; }",
    "#view-battle .zk-note-title { font-family: Georgia, serif; color: var(--gold-text, #8a6a10); margin: 0 0 8px; }",
    "#view-battle .zk-note-text { margin: 0; line-height: 1.55; }",
    "#view-battle .zk-choices { display: grid; gap: 10px; margin-top: 12px; }",
    "#view-battle .zk-choice { text-align: left; padding: 12px 14px; font-size: 1rem; cursor: pointer; border-radius: 8px; border: 1px solid var(--line, #d8cdb8); background: var(--panel, #fdf8ec); color: var(--ink, #2b2417); transition: border-color .15s ease, transform .1s ease; }",
    "#view-battle .zk-choice:hover:not(:disabled) { border-color: var(--accent, #1f3a5f); transform: translateX(3px); }",
    "#view-battle .zk-choice:disabled { cursor: default; opacity: .8; }",
    "#view-battle .zk-choice.zk-picked { border-color: var(--gold, #b8860b); font-weight: 600; }",
    "#view-battle .zk-correction { border-left: 4px solid var(--accent, #1f3a5f); padding: 10px 14px; background: var(--panel, #fdf8ec); border-radius: 0 8px 8px 0; margin-top: 12px; font-style: italic; line-height: 1.55; }",
    "#view-battle .zk-actions { margin-top: 18px; display: flex; gap: 10px; flex-wrap: wrap; justify-content: center; }",
    "#view-battle .zk-flavor { font-family: Georgia, serif; font-style: italic; text-align: center; margin: 10px 0; line-height: 1.5; }",
    /* smoke ribbon for stage 1 */
    "#view-battle .zk-smoke { text-align: center; font-size: 1.9rem; letter-spacing: 14px; margin: 4px 0 2px; }",
    "#view-battle .zk-smoke span { display: inline-block; animation: zk-rise 2.6s ease-in-out infinite; }",
    "#view-battle .zk-smoke span:nth-child(2) { animation-delay: .9s; }",
    "#view-battle .zk-smoke span:nth-child(3) { animation-delay: 1.7s; }",
    "@keyframes zk-rise { 0% { transform: translateY(4px); opacity: .4; } 50% { transform: translateY(-4px); opacity: .9; } 100% { transform: translateY(4px); opacity: .4; } }",
    /* the Egyptian's provisions */
    "#view-battle .zk-provisions { display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; margin: 14px 0 6px; }",
    "#view-battle .zk-provision { font-size: 1rem; padding: 10px 16px; border-radius: 10px; border: 1px solid var(--line, #d8cdb8); background: var(--panel, #fdf8ec); cursor: pointer; transition: transform .12s ease, border-color .15s ease; }",
    "#view-battle .zk-provision:hover:not(:disabled) { transform: translateY(-2px); border-color: var(--gold, #b8860b); }",
    "#view-battle .zk-provision:disabled { opacity: .55; cursor: default; }",
    "#view-battle .zk-provision.zk-given { border-color: var(--gold, #b8860b); background: color-mix(in srgb, var(--gold, #b8860b) 12%, var(--panel, #fdf8ec)); }",
    "#view-battle .zk-feedlog { min-height: 2.6em; font-family: Georgia, serif; font-style: italic; text-align: center; color: var(--muted, #7a6f5d); margin: 6px 0; line-height: 1.5; }",
    /* the rout minigame */
    "#view-battle .zk-camp { display: grid; grid-template-columns: repeat(5, 1fr); gap: 8px; max-width: 420px; margin: 14px auto 6px; }",
    "#view-battle .zk-fire { font-size: 1.9rem; line-height: 1.2; background: transparent; border: 0; cursor: default; opacity: .18; transition: opacity .25s ease, transform .15s ease; padding: 4px 0; }",
    "#view-battle .zk-fire.zk-lit { opacity: 1; cursor: pointer; animation: zk-flick .5s ease-in-out infinite alternate; }",
    "@keyframes zk-flick { from { transform: scale(.94); } to { transform: scale(1.08); } }",
    "#view-battle .zk-fire.zk-struck { opacity: .45; animation: none; cursor: default; }",
    "#view-battle .zk-campstatus { text-align: center; font-family: Georgia, serif; font-style: italic; min-height: 2.2em; color: var(--muted, #7a6f5d); margin: 4px 0; }",
    "#view-battle .zk-camel { font-size: 1.6rem; cursor: pointer; display: inline-block; transition: transform .15s ease; background: transparent; border: 0; }",
    "#view-battle .zk-camel:hover { transform: translateX(4px); }",
    "#view-battle .zk-egg { border: 2px solid var(--accent, #1f3a5f); background: var(--panel, #fdf8ec); }",
    /* tally + victory */
    "#view-battle .zk-tally-sides { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; margin: 12px 0; }",
    "#view-battle .zk-tally-side { flex: 1 1 200px; max-width: 300px; border: 1px solid var(--line, #d8cdb8); border-radius: 10px; padding: 14px 10px; background: var(--panel, #fdf8ec); text-align: center; }",
    "#view-battle .zk-tally-num { font-family: Georgia, serif; font-size: 1.7rem; color: var(--gold, #b8860b); margin: 4px 0; }",
    "#view-battle .zk-tally-name { font-weight: 700; color: var(--accent, #1f3a5f); }",
    "#view-battle .zk-tally-detail { font-size: .85rem; color: var(--muted, #7a6f5d); }",
    "#view-battle .zk-credit { font-size: .82rem; color: var(--muted, #7a6f5d); font-style: italic; text-align: center; margin: 16px 0 0; }",
    "#view-battle .zk-chips { display: flex; gap: 10px; flex-wrap: wrap; justify-content: center; margin-top: 14px; }",
    "@media (max-width: 720px) { #view-battle .zk-title { font-size: 1.5rem; } #view-battle .zk-camp { grid-template-columns: repeat(4, 1fr); } }"
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

  // ---------- shared fragments ----------
  function verseCard(v) {
    var box = el("div", "zk-verse");
    box.appendChild(el("p", "zk-verse-text", "“" + esc(v.text) + "”"));
    box.appendChild(el("cite", "zk-verse-ref", "— " + esc(v.ref)));
    return box;
  }
  function noteCard(n) {
    var box = el("div", "card zk-note");
    box.appendChild(el("h4", "zk-note-title", esc(n.title)));
    box.appendChild(el("p", "zk-note-text", esc(n.text)));
    return box;
  }
  function nextButton(label, fn) {
    var b = el("button", "btn zk-choice zk-picked", esc(label));
    b.style.textAlign = "center";
    b.addEventListener("click", fn);
    var row = el("div", "zk-actions");
    row.appendChild(b);
    return row;
  }
  function choiceBlock(dec, keys, onDone) {
    // keys: [goodKey, otherKey] — either order of definition; both end at onDone.
    var box = el("div", "zk-choices");
    var done = false;
    keys.forEach(function (k) {
      var c = dec[k];
      if (!c) return;
      var b = el("button", "zk-choice", esc(c.label));
      b.addEventListener("click", function () {
        if (done) return;
        done = true;
        var btns = box.querySelectorAll(".zk-choice");
        for (var i = 0; i < btns.length; i++) btns[i].disabled = true;
        b.classList.add("zk-picked");
        var after = el("div", "zk-correction zk-fade", esc(c.response || c.correction || ""));
        box.parentNode.insertBefore(after, box.nextSibling);
        onDone(after);
      });
      box.appendChild(b);
    });
    return box;
  }

  function goStage(i) {
    state.stage = i;
    if (i + 1 > state.unlocked) state.unlocked = i + 1;
    render();
  }

  // ---------- shell ----------
  function renderShell() {
    var host = root();
    var d = data();
    if (!host || !d) return null;
    clearTimers();
    host.innerHTML = "";
    var wrap = el("div", "zk-wrap zk-fade");

    var hubRow = el("div", "br-hubrow");
    var hub = el("button", "br-hubchip", "🏰 All battles");
    hub.addEventListener("click", function () {
      try {
        if (window.BattleHub && window.BattleHub.home) window.BattleHub.home();
      } catch (e) { /* stay put */ }
    });
    hubRow.appendChild(hub);
    wrap.appendChild(hubRow);

    wrap.appendChild(el("h2", "zk-title", "🔥 " + esc(d.title)));
    wrap.appendChild(el("p", "zk-sub", esc(d.subtitle)));

    var nav = el("div", "br-stagenav");
    d.stages.forEach(function (st, i) {
      var chip = el("button", "br-stagechip", esc(st.emblem + " " + st.label));
      if (i < state.unlocked) {
        chip.classList.add("br-open");
        if (i === state.stage) chip.classList.add("br-here");
        chip.addEventListener("click", function () { state.stage = i; render(); });
      } else {
        chip.classList.add("br-locked");
        chip.disabled = true;
      }
      nav.appendChild(chip);
    });
    wrap.appendChild(nav);

    host.appendChild(wrap);
    return wrap;
  }

  // ---------- Stage 1: the smoking town ----------
  function renderAshes(wrap) {
    var d = data().ashes;
    var card = el("div", "card zk-fade");
    card.appendChild(el("h3", "zk-heading", esc(d.heading)));
    var smoke = el("div", "zk-smoke");
    smoke.innerHTML = "<span>💨</span><span>💨</span><span>💨</span>";
    smoke.setAttribute("aria-hidden", "true");
    card.appendChild(smoke);
    d.paragraphs.forEach(function (p) { card.appendChild(el("p", null, esc(p))); });
    card.appendChild(verseCard(d.keyVerse));
    card.appendChild(el("p", "zk-flavor", esc(d.decision.prompt)));
    card.appendChild(choiceBlock(d.decision, ["strengthen", "despair"], function (after) {
      after.parentNode.insertBefore(
        nextButton("🙏 Go to the ephod →", function () { goStage(1); }),
        after.nextSibling
      );
    }));
    wrap.appendChild(card);
    wrap.appendChild(noteCard(d.historianNote));
  }

  // ---------- Stage 2: the ephod ----------
  function renderEphod(wrap) {
    var d = data().ephod;
    var card = el("div", "card zk-fade");
    card.appendChild(el("h3", "zk-heading", esc(d.heading)));
    d.intro.forEach(function (p) { card.appendChild(el("p", null, esc(p))); });
    card.appendChild(verseCard(d.oracle));
    card.appendChild(el("p", "zk-flavor", esc(d.flavor)));
    card.appendChild(nextButton("🏞️ South, to the Besor →", function () { goStage(2); }));
    wrap.appendChild(card);
    wrap.appendChild(noteCard(d.historianNote));
  }

  // ---------- Stage 3: the brook Besor ----------
  function renderBesor(wrap) {
    var d = data().besor;
    var card = el("div", "card zk-fade");
    card.appendChild(el("h3", "zk-heading", esc(d.heading)));
    d.intro.forEach(function (p) { card.appendChild(el("p", null, esc(p))); });
    card.appendChild(el("p", "zk-flavor", esc(d.decision.prompt)));
    card.appendChild(choiceBlock(d.decision, ["rest", "drive"], function (after) {
      // Part two of the stage: the Egyptian in the field.
      var eg = el("div", "card zk-fade");
      eg.appendChild(el("p", null, esc(d.egyptian.intro)));
      var row = el("div", "zk-provisions");
      var log = el("p", "zk-feedlog", "He does not stir. Give him something.");
      var given = 0;
      d.egyptian.items.forEach(function (item) {
        var b = el("button", "zk-provision", esc(item.emoji + " " + item.label));
        b.addEventListener("click", function () {
          if (b.disabled) return;
          b.disabled = true;
          b.classList.add("zk-given");
          given++;
          log.innerHTML = esc(item.line);
          if (given === d.egyptian.items.length) {
            var rev = el("div", "zk-correction zk-fade", esc(d.egyptian.revived));
            eg.appendChild(rev);
            eg.appendChild(el("p", "zk-flavor", esc(d.egyptian.lesson)));
            eg.appendChild(nextButton("⚔️ Follow him south →", function () { goStage(3); }));
          }
        });
        row.appendChild(b);
      });
      eg.appendChild(row);
      eg.appendChild(log);
      after.parentNode.parentNode.appendChild(eg);
    }));
    wrap.appendChild(card);
    wrap.appendChild(noteCard(d.historianNote));
  }

  // ---------- Stage 4: the rout ----------
  var WAVES = [4, 5, 6]; // fires per wave

  function renderRout(wrap) {
    var d = data().rout;
    state.fires = 0;
    state.wave = 0;
    var card = el("div", "card zk-fade");
    card.appendChild(el("h3", "zk-heading", esc(d.heading)));
    d.intro.forEach(function (p) { card.appendChild(el("p", null, esc(p))); });

    var camp = el("div", "zk-camp");
    var cells = [];
    for (var i = 0; i < 15; i++) {
      var f = el("button", "zk-fire", "🔥");
      f.setAttribute("aria-label", "Amalekite campfire");
      f.disabled = true;
      (function (fire) {
        fire.addEventListener("click", function () {
          if (!fire.classList.contains("zk-lit")) return;
          fire.classList.remove("zk-lit");
          fire.classList.add("zk-struck");
          fire.innerHTML = "⚔️";
          fire.disabled = true;
          state.fires++;
          maybeAdvance();
        });
      })(f);
      cells.push(f);
      camp.appendChild(f);
    }
    var status = el("p", "zk-campstatus", esc(d.gameHint));
    card.appendChild(camp);
    card.appendChild(status);
    wrap.appendChild(card);

    var litThisWave = 0;

    function lightWave() {
      if (!document.body.contains(camp)) return; // view left — let the fires die
      var free = cells.filter(function (c) { return !c.classList.contains("zk-struck") && !c.classList.contains("zk-lit"); });
      var count = Math.min(WAVES[state.wave] || 4, free.length);
      litThisWave = count;
      for (var k = 0; k < count; k++) {
        var pick = free.splice(Math.floor(Math.random() * free.length), 1)[0];
        pick.classList.add("zk-lit");
        pick.disabled = false;
      }
      status.textContent = "Wave " + (state.wave + 1) + " of " + WAVES.length + " — strike the fires!";
    }

    function maybeAdvance() {
      var lit = camp.querySelectorAll(".zk-fire.zk-lit").length;
      if (lit > 0) return;
      state.wave++;
      if (state.wave < WAVES.length) {
        status.textContent = "The camp stirs — more fires flare up…";
        later(lightWave, 900);
      } else {
        finishRout();
      }
    }

    function finishRout() {
      status.textContent = "From the twilight even unto the evening of the next day…";
      var after = el("div", "zk-fade");
      after.appendChild(verseCard(d.strikeVerse));
      // the four hundred on camels
      var camelRow = el("p", "zk-flavor");
      for (var c = 0; c < 4; c++) {
        var cam = el("button", "zk-camel", "🐪");
        cam.setAttribute("aria-label", "A camel-rider escapes");
        cam.setAttribute("title", "Four hundred young men, on camels");
        cam.addEventListener("click", function () {
          state.camelClicks++;
          if (!state.eggFound && state.camelClicks >= (d.easterEgg.clicksNeeded || 3)) {
            state.eggFound = true;
            var egg = el("div", "card zk-egg zk-fade");
            egg.appendChild(el("h4", "zk-note-title", esc(d.easterEgg.title)));
            egg.appendChild(el("p", "zk-note-text", esc(d.easterEgg.text)));
            after.appendChild(egg);
          }
        });
        camelRow.appendChild(cam);
      }
      camelRow.appendChild(document.createTextNode(" …and only these outran it."));
      after.appendChild(camelRow);
      after.appendChild(verseCard(d.recovery));
      var sides = el("div", "zk-tally-sides");
      [d.tally.left, d.tally.right].forEach(function (t) {
        var side = el("div", "zk-tally-side");
        side.appendChild(el("div", "zk-tally-name", esc(t.name)));
        side.appendChild(el("div", "zk-tally-num", esc(t.num)));
        side.appendChild(el("div", "zk-tally-detail", esc(t.detail)));
        sides.appendChild(side);
      });
      after.appendChild(sides);
      after.appendChild(nextButton("⚖️ Back to the Besor →", function () { goStage(4); }));
      card.appendChild(after);
    }

    later(lightWave, 600);
  }

  // ---------- Stage 5: the statute ----------
  function renderStatute(wrap) {
    var d = data().statute;
    var card = el("div", "card zk-fade");
    card.appendChild(el("h3", "zk-heading", esc(d.heading)));
    d.intro.forEach(function (p) { card.appendChild(el("p", null, esc(p))); });
    card.appendChild(el("p", "zk-flavor", esc(d.decision.prompt)));
    card.appendChild(choiceBlock(d.decision, ["alike", "fighters"], function (after) {
      var out = el("div", "zk-fade");
      out.appendChild(el("p", null, esc(d.gifts.intro)));
      out.appendChild(el("p", "zk-flavor", esc(d.gifts.note)));
      var win = el("div", "card zk-tally-side", null);
      win.style.maxWidth = "none";
      win.appendChild(el("div", "zk-tally-num", esc(d.victory.title)));
      win.appendChild(el("p", "zk-note-text", esc(d.victory.text)));
      out.appendChild(win);

      var chips = el("div", "zk-chips");
      var mapChip = el("button", "br-chip", "🗺️ See Ziklag on the map");
      mapChip.addEventListener("click", function () {
        if (window.App && window.App.focusLocation) window.App.focusLocation("ziklag");
      });
      var readChip = el("button", "br-chip", "📖 Read 1 Samuel 30");
      readChip.addEventListener("click", function () {
        if (window.App && window.App.goToChapter) window.App.goToChapter(30);
      });
      var hubChip = el("button", "br-chip", "🏰 All battles");
      hubChip.addEventListener("click", function () {
        if (window.BattleHub && window.BattleHub.home) window.BattleHub.home();
      });
      chips.appendChild(mapChip);
      chips.appendChild(readChip);
      chips.appendChild(hubChip);
      out.appendChild(chips);
      out.appendChild(el("p", "zk-credit", esc(d.credit)));
      after.parentNode.parentNode.appendChild(out);
      if (window.Progress) window.Progress.award("battle:ziklag", 60, "Fought the Raid on Ziklag");
    }));
    wrap.appendChild(card);
  }

  // ---------- render ----------
  function render() {
    injectStyles();
    var wrap = renderShell();
    if (!wrap) return;
    var id = data().stages[state.stage].id;
    if (id === "ashes") renderAshes(wrap);
    else if (id === "ephod") renderEphod(wrap);
    else if (id === "besor") renderBesor(wrap);
    else if (id === "rout") renderRout(wrap);
    else renderStatute(wrap);
  }

  window.ZiklagView = {
    init: function () {
      state.stage = 0;
      state.unlocked = Math.max(state.unlocked, 1);
      state.fed = {};
      try { render(); } catch (e) { /* view must not take down the app */ }
    }
  };
})();
