/* ==========================================================================
   eastereggs.js — hidden biblical delights for the 1 Samuel app.
   window.EasterEggs = { init() }
   Fully self-contained: document-level event delegation only; no hooks in
   any other module; safe over file://; every handler wrapped so failures
   are silent. All injected DOM/CSS is scoped under the .egg- prefix.
   ========================================================================== */
(function () {
  "use strict";

  var STORAGE_KEY = "samuel1.eggs.found";
  var TOAST_MS = 16000;          // auto-dismiss time
  var MAX_TOASTS = 3;            // stack cap
  var IDLE_MS = 3 * 60 * 1000;   // 3 minutes

  /* ---------------------------------------------------------------------
     Egg registry: ids, and cryptic hints for the "eggs" index card.
     --------------------------------------------------------------------- */
  var EGGS = [
    { id: "ebenezer", hint: "Raise a stone of help — spell it out, all eight letters." },
    { id: "stones",   hint: "Provoke the giant of Gath five times, and count your stones." },
    { id: "messiah",  hint: "Cry “Come, Lord” in Aramaic — or knock seven times at the foot of the page." },
    { id: "greatsea", hint: "Touch the great western waters a runaway prophet once sailed." },
    { id: "selah",    hint: "Pause the way the psalmist pauses. Type his rest." },
    { id: "heart",    hint: "Man looks up, up, down, down, left, right. The LORD looks elsewhere." },
    { id: "gazelle",  hint: "Speak of one swift as a wild roe, and watch your step." },
    { id: "listen",   hint: "Say nothing at all for a little while. The app is listening too." }
  ];

  var state = {
    inited: false,
    found: {},              // id -> true
    keyBuf: "",             // letters typed outside inputs
    konamiIdx: 0,           // progress through the arrow sequence
    goliathClicks: 0,
    footerClicks: 0,
    lastActivity: Date.now(),
    idleShown: false,       // once per session
    idleTimer: null,
    stack: null             // toast container element
  };

  var KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight"];

  /* ------------------------------ storage ------------------------------ */
  function loadFound() {
    try {
      var raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        var arr = JSON.parse(raw);
        if (Object.prototype.toString.call(arr) === "[object Array]") {
          for (var i = 0; i < arr.length; i++) state.found[String(arr[i])] = true;
        }
      }
    } catch (e) { /* private mode etc. — eggs still work, just unremembered */ }
  }

  function saveFound() {
    try {
      var arr = [];
      for (var k in state.found) if (state.found[k]) arr.push(k);
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
    } catch (e) { /* silent */ }
  }

  function foundCount() {
    var n = 0;
    for (var i = 0; i < EGGS.length; i++) if (state.found[EGGS[i].id]) n++;
    return n;
  }

  function markFound(id) {
    if (!state.found[id]) {
      state.found[id] = true;
      saveFound();
    }
  }

  /* ------------------------------ styles ------------------------------- */
  function injectStyles() {
    if (document.getElementById("egg-styles")) return;
    var css = "" +
      ".egg-stack{position:fixed;right:16px;bottom:16px;z-index:9999;display:flex;" +
        "flex-direction:column;align-items:flex-end;gap:10px;max-width:min(360px,calc(100vw - 32px));" +
        "pointer-events:none;}" +
      ".egg-toast{pointer-events:auto;background:var(--panel,#fdf9ee);color:var(--ink,#2e2418);" +
        "border:1px solid var(--line,#dccfae);border-left:4px solid var(--gold,#b8860b);" +
        "border-radius:10px;box-shadow:var(--shadow,0 6px 18px rgba(70,50,20,.15));" +
        "padding:14px 16px 12px;width:min(360px,calc(100vw - 32px));position:relative;" +
        "font-family:var(--sans,sans-serif);font-size:14px;line-height:1.5;" +
        "animation:egg-in .35s ease both;}" +
      ".egg-toast.egg-out{animation:egg-fade .4s ease both;}" +
      "@keyframes egg-in{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}" +
      "@keyframes egg-fade{from{opacity:1}to{opacity:0;transform:translateY(8px)}}" +
      ".egg-kicker{font-size:11px;letter-spacing:.14em;text-transform:uppercase;" +
        "color:var(--gold,#b8860b);margin:0 0 4px;}" +
      ".egg-title{font-family:var(--serif,Georgia,serif);font-size:17px;margin:0 0 8px;" +
        "color:var(--ink,#2e2418);padding-right:20px;}" +
      ".egg-verse{margin:0 0 8px;padding:8px 10px;border-left:3px solid var(--accent,#1f4e79);" +
        "background:rgba(31,78,121,.06);border-radius:0 6px 6px 0;font-family:var(--serif,Georgia,serif);" +
        "font-style:italic;}" +
      ".egg-verse cite{display:block;font-style:normal;font-size:12px;color:var(--muted,#8a7a62);" +
        "margin-top:4px;}" +
      ".egg-body{color:var(--ink,#2e2418);}" +
      ".egg-body p{margin:0 0 6px;}" +
      ".egg-body ul{margin:4px 0 6px;padding-left:18px;}" +
      ".egg-body li{margin:2px 0;}" +
      ".egg-progress{margin-top:8px;padding-top:8px;border-top:1px dashed var(--line,#dccfae);" +
        "font-size:12px;color:var(--muted,#8a7a62);}" +
      ".egg-close{position:absolute;top:8px;right:8px;border:0;background:none;cursor:pointer;" +
        "color:var(--muted,#8a7a62);font-size:16px;line-height:1;padding:4px;border-radius:6px;}" +
      ".egg-close:hover{color:var(--ink,#2e2418);background:rgba(0,0,0,.06);}" +
      ".egg-deer{position:fixed;bottom:12vh;left:-80px;z-index:9998;font-size:44px;" +
        "pointer-events:none;animation:egg-dash 2.2s cubic-bezier(.25,.6,.35,1) forwards;}" +
      "@keyframes egg-dash{0%{transform:translateX(0) scaleX(-1)}" +
        "20%{transform:translateX(22vw) translateY(-4vh) scaleX(-1)}" +
        "40%{transform:translateX(44vw) translateY(0) scaleX(-1)}" +
        "60%{transform:translateX(66vw) translateY(-4vh) scaleX(-1)}" +
        "100%{transform:translateX(115vw) translateY(0) scaleX(-1)}}" +
      "@media (prefers-reduced-motion:reduce){" +
        ".egg-toast,.egg-toast.egg-out{animation:none}" +
        ".egg-deer{animation:none;display:none}}";
    var style = document.createElement("style");
    style.id = "egg-styles";
    style.appendChild(document.createTextNode(css));
    (document.head || document.documentElement).appendChild(style);
  }

  /* ------------------------------ toasts ------------------------------- */
  function getStack() {
    if (state.stack && state.stack.parentNode) return state.stack;
    var el = document.createElement("div");
    el.className = "egg-stack";
    el.setAttribute("aria-live", "polite");
    document.body.appendChild(el);
    state.stack = el;
    return el;
  }

  function dismiss(toast) {
    try {
      if (!toast || !toast.parentNode) return;
      toast.className += " egg-out";
      window.setTimeout(function () {
        try { if (toast.parentNode) toast.parentNode.removeChild(toast); } catch (e) {}
      }, 450);
    } catch (e) { /* silent */ }
  }

  /* opts: { eggId, kicker, title, verse, ref, bodyHtml, sticky } */
  function showCard(opts) {
    try {
      injectStyles();
      var stack = getStack();

      // stacking-safe: cap the pile, oldest goes first
      while (stack.children.length >= MAX_TOASTS) {
        stack.removeChild(stack.children[0]);
      }

      var toast = document.createElement("div");
      toast.className = "egg-toast";
      toast.setAttribute("role", "status");

      var html = "";
      html += '<div class="egg-kicker">' + (opts.kicker || "Hidden treasure") + "</div>";
      html += '<h3 class="egg-title">' + opts.title + "</h3>";
      if (opts.verse) {
        html += '<blockquote class="egg-verse">“' + opts.verse + "”" +
                "<cite>— " + opts.ref + "</cite></blockquote>";
      }
      if (opts.bodyHtml) html += '<div class="egg-body">' + opts.bodyHtml + "</div>";
      if (opts.eggId) {
        html += '<div class="egg-progress">✦ Mystery found — ' +
                foundCount() + " of " + EGGS.length + "</div>";
      } else if (opts.progressHtml) {
        html += '<div class="egg-progress">' + opts.progressHtml + "</div>";
      }
      toast.innerHTML = html;

      var close = document.createElement("button");
      close.className = "egg-close";
      close.setAttribute("aria-label", "Close");
      close.appendChild(document.createTextNode("×"));
      close.addEventListener("click", function () { dismiss(toast); });
      toast.appendChild(close);

      stack.appendChild(toast);

      window.setTimeout(function () { dismiss(toast); }, opts.sticky ? TOAST_MS * 2 : TOAST_MS);
    } catch (e) { /* silent */ }
  }

  /* ------------------------------ the eggs ----------------------------- */
  function eggEbenezer() {
    markFound("ebenezer");
    showCard({
      eggId: "ebenezer",
      kicker: "Stone of Help",
      title: "Ebenezer — “thus far”",
      verse: "Then Samuel took a stone... and called the name of it Ebenezer, saying, Hitherto hath the LORD helped us.",
      ref: "1 Samuel 7:12",
      bodyHtml:
        "<p><em>Eben-ezer</em> is Hebrew for “stone of help.” After the rout of the " +
        "Philistines at Mizpah, Samuel set up a standing stone as a public, permanent witness: " +
        "every traveler who passed it was reminded that Israel’s survival was God’s doing, " +
        "not their own.</p>" +
        "<p>That is why the hymn <em>Come Thou Fount</em> sings, “Here I raise my Ebenezer; " +
        "hither by Thy help I’m come” — the singer plants their own memorial stone.</p>"
    });
  }

  function eggStones() {
    markFound("stones");
    showCard({
      eggId: "stones",
      kicker: "Armory of a Shepherd",
      title: "Why five smooth stones?",
      verse: "And he took his staff in his hand, and chose him five smooth stones out of the brook... and his sling was in his hand: and he drew near to the Philistine.",
      ref: "1 Samuel 17:40",
      bodyHtml:
        "<p>David needed only one stone — so why pick five? One traditional explanation " +
        "notes that Goliath was not the only giant of Gath: 2 Samuel 21:15–22 records " +
        "<strong>four more</strong> descendants of the giants — Ishbi-benob, Saph, a second " +
        "Goliath-figure, and a six-fingered giant — later felled by David and his men. " +
        "A stone for Goliath, and one ready for each of his kin.</p>" +
        "<p>Whatever David intended, the sling itself was no toy: ancient slingers were " +
        "battlefield artillery, accurate “at an hair breadth” (Judges 20:16).</p>"
    });
  }

  function eggMessiah() {
    markFound("messiah");
    showCard({
      eggId: "messiah",
      kicker: "Maranatha — the hidden line",
      title: "The line to the Messiah",
      verse: "The book of the generation of Jesus Christ, the son of David...",
      ref: "Matthew 1:1, 5–6",
      bodyHtml:
        "<p>The story of 1 Samuel sits inside a much longer story:</p>" +
        "<p style=\"font-family:var(--serif,Georgia,serif)\">Ruth &amp; Boaz → Obed → " +
        "Jesse → <strong>David</strong> → Solomon → … → " +
        "<strong>Jesus the Messiah</strong></p>" +
        "<p>The shepherd anointed in Bethlehem (1 Samuel 16) is the ancestor of the one born " +
        "in Bethlehem a thousand years later — “the Lion of the tribe of Judah, the " +
        "Root of David” (Revelation 5:5). <em>Maranatha</em> is Aramaic: “Our Lord, " +
        "come!” (1 Corinthians 16:22).</p>"
    });
  }

  function eggGreatSea() {
    markFound("greatsea");
    showCard({
      eggId: "greatsea",
      kicker: "The Great Sea",
      title: "Same waters, another prophet",
      verse: "But Jonah rose up to flee unto Tarshish... and went down to Joppa; and he found a ship going to Tarshish.",
      ref: "Jonah 1:3",
      bodyHtml:
        "<p>The Mediterranean on this map — “the Great Sea” of the Hebrew Bible " +
        "(Numbers 34:6) — is where, centuries after Samuel, the prophet Jonah boarded a " +
        "ship at Joppa to run from his calling. Joppa lies on this very coast, just south of " +
        "the Philistine plain where so much of 1 Samuel unfolds.</p>" +
        "<p>Israel was never a seafaring people; the sea was the edge of the known world — " +
        "which is exactly why Jonah headed for it.</p>"
    });
  }

  function eggSelah() {
    markFound("selah");
    showCard({
      eggId: "selah",
      kicker: "Selah",
      title: "The psalms hidden inside 1 Samuel",
      verse: "Be merciful unto me, O God... in the shadow of thy wings will I make my refuge, until these calamities be overpast. Selah.",
      ref: "Psalm 57:1",
      bodyHtml:
        "<p><em>Selah</em> — likely a musical rest or a cue to pause and weigh what was " +
        "just sung — appears 71 times in the Psalms. Several psalm titles pin their poems " +
        "to the very flights drawn on this map:</p>" +
        "<ul>" +
        "<li><strong>Psalm 34</strong> — “when he changed his behaviour before " +
        "Abimelech” (Achish of Gath, 1 Sam 21)</li>" +
        "<li><strong>Psalm 57 &amp; 142</strong> — “when he fled from Saul in the " +
        "cave” (Adullam / En-gedi, 1 Sam 22, 24)</li>" +
        "<li><strong>Psalm 59</strong> — “when Saul sent, and they watched the house " +
        "to kill him” (1 Sam 19)</li>" +
        "<li><strong>Psalm 54</strong> — “when the Ziphims came and said... Doth not " +
        "David hide himself with us?” (1 Sam 23)</li>" +
        "</ul>" +
        "<p>David’s darkest chapters became Israel’s songbook.</p>"
    });
  }

  function eggHeart() {
    markFound("heart");
    showCard({
      eggId: "heart",
      kicker: "↑↑↓↓←→",
      title: "The LORD looketh on the heart",
      verse: "For the LORD seeth not as man seeth; for man looketh on the outward appearance, but the LORD looketh on the heart.",
      ref: "1 Samuel 16:7",
      bodyHtml:
        "<p>Seven sons of Jesse passed before Samuel — tall, impressive, and all passed " +
        "over. The eighth was out with the sheep.</p>" +
        "<p>You just looked beneath the surface of this app; God has been doing that with " +
        "people all along.</p>"
    });
  }

  function eggGazelle() {
    markFound("gazelle");
    runDeer();
    showCard({
      eggId: "gazelle",
      kicker: "Light of foot",
      title: "Asahel, swift as a wild gazelle",
      verse: "And Asahel was as light of foot as a wild roe.",
      ref: "2 Samuel 2:18",
      bodyHtml:
        "<p>Asahel, nephew of David and brother of Joab, was famed for his speed — the " +
        "Hebrew compares him to the <em>tsebi</em>, the gazelle of the Judean hills. His " +
        "swiftness carried him straight after Abner at the battle of Gibeon, a chase that " +
        "ended in tragedy and a blood-feud that shadowed David’s early reign.</p>" +
        "<p>In Scripture, speed is a gift — and, unrestrained, a peril.</p>"
    });
  }

  function eggListen() {
    if (state.idleShown) return;
    state.idleShown = true;
    markFound("listen");
    showCard({
      eggId: "listen",
      kicker: "In the quiet",
      title: "Speak, LORD; for thy servant heareth",
      verse: "Therefore Eli said unto Samuel, Go, lie down: and it shall be, if he call thee, that thou shalt say, Speak, LORD; for thy servant heareth.",
      ref: "1 Samuel 3:9",
      bodyHtml:
        "<p>The boy Samuel heard his name in the stillness of the sanctuary at Shiloh — " +
        "in an age when “the word of the LORD was precious... there was no open " +
        "vision” (1 Sam 3:1). He heard because he was quiet enough, and willing enough, " +
        "to answer.</p>" +
        "<p>You went still for a few minutes; the page waited with you, like Samuel " +
        "listening in the dark.</p>",
      sticky: true
    });
  }

  function eggIndex() {
    var items = "";
    for (var i = 0; i < EGGS.length; i++) {
      var e = EGGS[i];
      var mark = state.found[e.id] ? "✓ " : "✦ ";
      items += "<li>" + mark + e.hint + "</li>";
    }
    showCard({
      kicker: "Seek and ye shall find",
      title: "Hidden mysteries of this app",
      bodyHtml: "<ul>" + items + "</ul>",
      progressHtml: foundCount() + " of " + EGGS.length + " mysteries found",
      sticky: true
    });
  }

  /* --------------------------- deer animation -------------------------- */
  function runDeer() {
    try {
      injectStyles();
      if (document.querySelector(".egg-deer")) return; // one at a time
      var deer = document.createElement("div");
      deer.className = "egg-deer";
      deer.setAttribute("aria-hidden", "true");
      deer.appendChild(document.createTextNode("🦌"));
      document.body.appendChild(deer);
      var cleanup = function () {
        try { if (deer.parentNode) deer.parentNode.removeChild(deer); } catch (e) {}
      };
      deer.addEventListener("animationend", cleanup);
      window.setTimeout(cleanup, 4000); // safety net (reduced-motion: no animationend)
    } catch (e) { /* silent */ }
  }

  /* ----------------------------- listeners ----------------------------- */
  function isTypingContext(t) {
    if (!t || !t.tagName) return false;
    var tag = t.tagName.toUpperCase();
    if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return true;
    if (t.isContentEditable) return true;
    return false;
  }

  function onKeydown(e) {
    try {
      if (e.defaultPrevented) return;
      if (isTypingContext(e.target)) { state.keyBuf = ""; state.konamiIdx = 0; return; }
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      var key = e.key || "";

      // Konami-style arrows: ↑ ↑ ↓ ↓ ← →
      if (key.indexOf("Arrow") === 0) {
        if (key === KONAMI[state.konamiIdx]) {
          state.konamiIdx++;
          if (state.konamiIdx >= KONAMI.length) {
            state.konamiIdx = 0;
            eggHeart();
          }
        } else {
          state.konamiIdx = (key === KONAMI[0]) ? 1 : 0;
        }
        return;
      }

      // Letter buffer for typed words
      if (key.length === 1 && /[a-zA-Z]/.test(key)) {
        state.keyBuf = (state.keyBuf + key.toLowerCase()).slice(-12);
        var buf = state.keyBuf;
        if (buf.slice(-8) === "ebenezer") { state.keyBuf = ""; eggEbenezer(); }
        else if (buf.slice(-9) === "maranatha") { state.keyBuf = ""; eggMessiah(); }
        else if (buf.slice(-5) === "selah") { state.keyBuf = ""; eggSelah(); }
        else if (buf.slice(-4) === "eggs") { state.keyBuf = ""; eggIndex(); }
      } else if (key.length === 1 || key === "Backspace" || key === "Enter" || key === " ") {
        state.keyBuf = "";
      }
    } catch (err) { /* silent */ }
  }

  function elementText(t) {
    // cheap: only inspect small leaf-ish targets, never huge containers
    if (!t || t.nodeType !== 1) return "";
    var txt = t.textContent || "";
    if (txt.length > 120) return "";
    return txt;
  }

  function closestMatch(t, fn, maxHops) {
    // tiny closest() over at most a few ancestors, SVG-safe
    var hops = 0;
    while (t && t.nodeType === 1 && hops <= maxHops) {
      if (fn(t)) return t;
      t = t.parentNode;
      hops++;
    }
    return null;
  }

  function onClick(e) {
    try {
      var t = e.target;
      if (!t || t.nodeType !== 1) return;

      // never trip eggs on our own toasts
      if (closestMatch(t, function (n) {
        return n.className && String(n.className.baseVal || n.className).indexOf("egg-") !== -1;
      }, 6)) return;

      var txt = elementText(t);

      // 2) Goliath, five cumulative clicks
      if (txt.indexOf("Goliath") !== -1) {
        state.goliathClicks++;
        if (state.goliathClicks >= 5) {
          state.goliathClicks = 0;
          eggStones();
          return;
        }
      }

      // 4) SVG "Great Sea" map label
      var isSvgText = typeof SVGElement !== "undefined" && t instanceof SVGElement &&
        (t.tagName === "text" || t.tagName === "tspan");
      if (isSvgText && (t.textContent || "").indexOf("Great Sea") !== -1) {
        eggGreatSea();
        return;
      }

      // 7) gazelle / Asahel
      if (/gazelle/i.test(txt) || txt.indexOf("Asahel") !== -1) {
        eggGazelle();
        return;
      }

      // 3) footer clicked 7 times
      if (closestMatch(t, function (n) {
        return n.className && String(n.className.baseVal || n.className).indexOf("app-footer") !== -1;
      }, 6)) {
        state.footerClicks++;
        if (state.footerClicks >= 7) {
          state.footerClicks = 0;
          eggMessiah();
        }
      }
    } catch (err) { /* silent */ }
  }

  /* ------------------------------- idle -------------------------------- */
  function noteActivity() { state.lastActivity = Date.now(); }

  function startIdleWatch() {
    // click/keydown already delegated; add cheap passive extras
    try {
      document.addEventListener("scroll", noteActivity, { passive: true, capture: true });
      document.addEventListener("pointerdown", noteActivity, { passive: true });
    } catch (e) {
      document.addEventListener("scroll", noteActivity, true);
      document.addEventListener("pointerdown", noteActivity, false);
    }
    state.idleTimer = window.setInterval(function () {
      try {
        if (state.idleShown) { window.clearInterval(state.idleTimer); return; }
        if (document.visibilityState && document.visibilityState !== "visible") {
          noteActivity(); // don't count hidden-tab time as quiet listening
          return;
        }
        if (Date.now() - state.lastActivity >= IDLE_MS) eggListen();
      } catch (e) { /* silent */ }
    }, 20000);
  }

  /* ------------------------------- init -------------------------------- */
  function start() {
    if (state.inited) return;
    state.inited = true;
    try {
      loadFound();
      injectStyles();
      document.addEventListener("keydown", function (e) { onKeydown(e); noteActivity(); });
      document.addEventListener("click", function (e) { noteActivity(); onClick(e); });
      startIdleWatch();
    } catch (e) { /* a broken egg basket must never break the app */ }
  }

  window.EasterEggs = {
    init: function () {
      try {
        if (!document.body || document.readyState === "loading") {
          document.addEventListener("DOMContentLoaded", start);
        } else {
          start();
        }
      } catch (e) { /* silent */ }
    }
  };
})();
