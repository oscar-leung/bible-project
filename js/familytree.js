/* js/familytree.js — window.FamilyTreeView ("Family Lines")
   Interactive SVG genealogy of the houses of David and Saul.
   Plain script global, no modules (see ARCHITECTURE.md). Renders only inside
   #view-family. Reads window.FAMILY (may be absent — degrade gracefully).
   Cross-view links are guarded: window.App && App.goToChapter / App.showView. */

(function () {
  "use strict";

  var SVG_NS = "http://www.w3.org/2000/svg";

  // ---- geometry -----------------------------------------------------------
  var VIEW_W = 2510;
  var VIEW_H = 880;
  var RENDER_W = VIEW_W;                     // rendered px width (scrolls inside its box); 1:1 with viewBox so labels stay legible
  var RENDER_H = Math.round(VIEW_H * RENDER_W / VIEW_W);
  var SCALE = RENDER_W / VIEW_W;
  var NODE_W = 118, NODE_H = 54;             // default node box (SVG units)

  // Hand-tuned layout: id -> { x, y (center), w?, h?, lines? (label lines), sub? }
  var LAYOUT = {
    // ancestry chain (inside the David panel)
    "salmon-rahab":   { x: 175,  y: 70,  w: 150, lines: ["Salmon ⚭ Rahab"], sub: "of Jericho's walls" },
    "boaz":           { x: 100,  y: 170, lines: ["Boaz"], sub: "kinsman-redeemer" },
    "ruth":           { x: 255,  y: 170, lines: ["Ruth"], sub: "the Moabitess" },
    "obed":           { x: 175,  y: 268, lines: ["Obed"], sub: "Naomi's joy" },
    "jesse":          { x: 175,  y: 366, lines: ["Jesse"], sub: "of Bethlehem" },
    // Jesse's children
    "eliab":          { x: 80,   y: 470, lines: ["Eliab"], sub: "firstborn" },
    "abinadab-jesse": { x: 208,  y: 470, lines: ["Abinadab"], sub: "second son" },
    "shimea":         { x: 336,  y: 470, lines: ["Shimea"], sub: "(Shammah)" },
    "nethanel":       { x: 464,  y: 470, lines: ["Nethanel"], sub: "fourth son" },
    "raddai":         { x: 592,  y: 470, lines: ["Raddai"], sub: "fifth son" },
    "ozem":           { x: 720,  y: 470, lines: ["Ozem"], sub: "sixth son" },
    "david":          { x: 880,  y: 470, w: 132, h: 62, lines: ["DAVID"], sub: "shepherd-king" },
    "zeruiah":        { x: 1340, y: 470, lines: ["Zeruiah"], sub: "sister" },
    "abigail-sister": { x: 1475, y: 470, lines: ["Abigail"], sub: "sister" },
    "jether":         { x: 1605, y: 470, lines: ["Jether"], sub: "the Ishmaelite" },
    // David's wives (y=590) — each mother sits directly above her son.
    // Deliberate 140px gap between x=810 and x=950 so David's descent trunk
    // (a vertical at x=880) threads between abital and eglah without touching.
    "ahinoam":        { x: 290,  y: 590, lines: ["Ahinoam"], sub: "of Jezreel" },
    "abigail-carmel": { x: 420,  y: 590, lines: ["Abigail"], sub: "of Carmel" },
    "maacah":         { x: 550,  y: 590, lines: ["Maacah"], sub: "princess of Geshur" },
    "haggith":        { x: 680,  y: 590, lines: ["Haggith"], sub: "mother of Adonijah" },
    "abital":         { x: 810,  y: 590, lines: ["Abital"], sub: "mother of Shephatiah" },
    "eglah":          { x: 950,  y: 590, lines: ["Eglah"], sub: "mother of Ithream" },
    "bathsheba":      { x: 1080, y: 590, lines: ["Bathsheba"], sub: "mother of Solomon" },
    // the sons of Zeruiah + Amasa
    "joab":           { x: 1280, y: 590, lines: ["Joab"], sub: "commander" },
    "abishai":        { x: 1405, y: 590, lines: ["Abishai"], sub: "the spear" },
    "asahel":         { x: 1530, y: 590, lines: ["Asahel"], sub: "swift gazelle" },
    "amasa":          { x: 1605, y: 700, lines: ["Amasa"], sub: "nephew-general" },
    // David's sons (y=700), the six Hebron sons in 2 Samuel 3:2–5 order + Solomon
    "amnon":          { x: 290,  y: 700, lines: ["Amnon"], sub: "firstborn at Hebron" },
    "chileab":        { x: 420,  y: 700, lines: ["Chileab"], sub: "(Daniel), second son" },
    "absalom":        { x: 550,  y: 700, lines: ["Absalom"], sub: "the rebel prince" },
    "adonijah":       { x: 680,  y: 700, lines: ["Adonijah"], sub: "the almost-king" },
    "shephatiah":     { x: 810,  y: 700, lines: ["Shephatiah"], sub: "fifth son" },
    "ithream":        { x: 950,  y: 700, lines: ["Ithream"], sub: "sixth son" },
    "solomon":        { x: 1080, y: 700, lines: ["Solomon"], sub: "temple builder" },
    "tamar":          { x: 160,  y: 700, lines: ["Tamar"], sub: "Absalom's sister" },
    "uriah":          { x: 1210, y: 700, lines: ["Uriah"], sub: "the Hittite" },
    // house of Saul
    "abiel":          { x: 2110, y: 70,  lines: ["Abiel"], sub: "of Benjamin" },
    "kish":           { x: 1980, y: 170, lines: ["Kish"], sub: "father of Saul" },
    "ner":            { x: 2240, y: 170, lines: ["Ner"], sub: "father of Abner" },
    "saul":           { x: 1980, y: 268, w: 132, h: 62, lines: ["SAUL"], sub: "first king" },
    "abner":          { x: 2240, y: 268, lines: ["Abner"], sub: "commander" },
    "michal":         { x: 1795, y: 400, lines: ["Michal"], sub: "David's wife" },
    "merab":          { x: 1920, y: 400, lines: ["Merab"], sub: "elder daughter" },
    "jonathan":       { x: 2045, y: 400, lines: ["Jonathan"], sub: "covenant friend" },
    "abinadab-saul":  { x: 2170, y: 400, lines: ["Abinadab"], sub: "son of Saul" },
    "malchishua":     { x: 2295, y: 400, lines: ["Malchi-shua"], sub: "son of Saul" },
    "ishbosheth":     { x: 2420, y: 400, lines: ["Ish-bosheth"], sub: "(Eshbaal)" },
    "mephibosheth":   { x: 2045, y: 510, lines: ["Mephibosheth"], sub: "(Merib-baal)" },
    "phaltiel":       { x: 1795, y: 510, lines: ["Phaltiel"], sub: "the weeping husband" }
  };

  var HOUSES = {
    david: { x: 20,   y: 20, w: 1690, h: 840, cls: "ft-house-david", title: "House of David", sub: "Bethlehem — tribe of Judah" },
    saul:  { x: 1725, y: 20, w: 765,  h: 840, cls: "ft-house-saul",  title: "House of Saul",  sub: "Gibeah — tribe of Benjamin" }
  };

  var ZERUIAH_SONS = ["joab", "abishai", "asahel"];
  var SPOT_KEEP = ["zeruiah", "joab", "abishai", "asahel"];
  // Ruth's Easter-egg lineage (Ruth → … → Solomon → the Messiah note)
  var MESSIAH_CHAIN = ["ruth", "boaz", "obed", "jesse", "david", "solomon", "messiah-note"];

  // ---- module state -------------------------------------------------------
  var state = {
    inited: false,
    selected: null,       // person id or null
    spotlight: false,
    pendingFocus: null,
    scrollTarget: null    // {x, y} in SVG units; re-applied when the view shows
  };
  var visObserver = null; // watches #view-family for .active so scroll can apply
  var els = {};           // cached DOM refs, rebuilt each init()

  // ---- tiny DOM helpers (map.js conventions) ------------------------------
  function el(tag, attrs, text) {
    var n = document.createElement(tag);
    if (attrs) for (var k in attrs) if (Object.prototype.hasOwnProperty.call(attrs, k)) n.setAttribute(k, attrs[k]);
    if (text != null) n.textContent = text;
    return n;
  }
  function svgEl(tag, attrs, text) {
    var n = document.createElementNS(SVG_NS, tag);
    if (attrs) for (var k in attrs) if (Object.prototype.hasOwnProperty.call(attrs, k)) n.setAttribute(k, attrs[k]);
    if (text != null) n.textContent = text;
    return n;
  }
  function clear(node) { while (node.firstChild) node.removeChild(node.firstChild); }

  function getPeople() {
    return (window.FAMILY && Array.isArray(window.FAMILY.people)) ? window.FAMILY.people : null;
  }
  function personById(id) {
    var ppl = getPeople();
    if (!ppl) return null;
    for (var i = 0; i < ppl.length; i++) if (ppl[i] && ppl[i].id === id) return ppl[i];
    return null;
  }
  function hasTag(p, tag) {
    return !!(p && Array.isArray(p.tags) && p.tags.indexOf(tag) !== -1);
  }
  function boxOf(id) {
    var L = LAYOUT[id];
    if (!L) return null;
    var w = L.w || NODE_W, h = L.h || NODE_H;
    return { x: L.x, y: L.y, w: w, h: h, left: L.x - w / 2, right: L.x + w / 2, top: L.y - h / 2, bottom: L.y + h / 2 };
  }

  // ---- scoped styles (every rule prefixed #view-family) -------------------
  var CSS = "" +
    "#view-family{--ft-david:var(--gold,#b8860b);--ft-saul:var(--accent,#1f4e79);" +
    "--ft-node:var(--panel,#fdf9ee);--ft-dim:.18;}" +

    "#view-family .ft-intro{margin:0 0 .6rem;color:var(--muted,#8a7a62);font-style:italic;}" +
    "#view-family .ft-toolbar{display:flex;align-items:center;gap:.6rem;flex-wrap:wrap;margin-bottom:.55rem;}" +
    "#view-family .ft-toolbar .ft-hint{color:var(--muted,#8a7a62);font-size:.85rem;}" +
    "#view-family .ft-legend{display:flex;gap:1rem;flex-wrap:wrap;align-items:center;" +
    "color:var(--muted,#8a7a62);font-size:.8rem;margin:0 0 .7rem;}" +
    "#view-family .ft-legend .ft-key{display:inline-flex;align-items:center;gap:.35rem;}" +
    "#view-family .ft-legend svg{display:inline-block;vertical-align:middle;}" +

    "#view-family .ft-layout{display:flex;gap:1rem;align-items:flex-start;flex-wrap:wrap;}" +
    "#view-family .ft-treecol{flex:1 1 560px;min-width:280px;max-width:100%;}" +
    "#view-family .ft-sidecol{flex:1 1 260px;min-width:250px;display:flex;flex-direction:column;gap:1rem;}" +

    /* the tree pans inside its own scroll box; the page never scrolls sideways */
    "#view-family .ft-scroll{overflow:auto;max-width:100%;border:1px solid var(--line,#dccfae);" +
    "border-radius:10px;background:var(--panel,#fdf9ee);box-shadow:0 2px 10px rgba(0,0,0,.08);" +
    "cursor:grab;-webkit-overflow-scrolling:touch;}" +
    "#view-family .ft-scroll.ft-dragging{cursor:grabbing;user-select:none;}" +
    /* max-width:none overrides the global `img,svg{max-width:100%}` rule — without it the
       SVG is squeezed to the box width while its height attribute stands, and the drawing
       letterboxes into a small centered band with dead space above it. */
    "#view-family svg.ft-svg{display:block;max-width:none;}" +
    "#view-family .ft-scroll{max-height:74vh;}" +

    /* houses */
    "#view-family .ft-house{stroke-width:1.5;rx:14;}" +
    "#view-family .ft-house-david .ft-house-bg{fill:rgba(184,134,11,.06);stroke:rgba(184,134,11,.45);}" +
    "#view-family .ft-house-saul .ft-house-bg{fill:rgba(31,78,121,.06);stroke:rgba(31,78,121,.45);}" +
    "#view-family .ft-house-title{font-family:var(--serif,Georgia,serif);font-size:26px;fill:var(--ink,#2e2418);}" +
    "#view-family .ft-house-sub{font-size:12px;font-style:italic;fill:var(--muted,#8a7a62);}" +

    /* edges */
    "#view-family .ft-edge{fill:none;stroke-linecap:round;stroke-linejoin:round;}" +
    "#view-family .ft-edge-descent{stroke-width:1.8;}" +
    "#view-family .ft-house-edges-david .ft-edge-descent{stroke:var(--ft-david);opacity:.75;}" +
    "#view-family .ft-house-edges-saul .ft-edge-descent{stroke:var(--ft-saul);opacity:.75;}" +
    "#view-family .ft-edge-marriage{stroke-width:1.6;stroke-dasharray:5 4;stroke:var(--muted,#8a7a62);opacity:.9;}" +
    "#view-family .ft-edge-bridge{stroke-width:3;stroke-dasharray:8 5;}" +
    "#view-family .ft-edge-note{stroke:var(--ft-david);stroke-width:1.4;stroke-dasharray:2 4;opacity:.8;}" +
    "#view-family .ft-bridge-label{font-size:12px;font-style:italic;fill:var(--muted,#8a7a62);}" +

    /* nodes */
    "#view-family .ft-node{cursor:pointer;}" +
    "#view-family .ft-node rect{fill:var(--ft-node);stroke:var(--line,#dccfae);stroke-width:1.4;rx:9;" +
    "transition:stroke .15s,filter .15s;}" +
    "#view-family .ft-node.ft-h-david rect{stroke:var(--ft-david);}" +
    "#view-family .ft-node.ft-h-saul rect{stroke:var(--ft-saul);}" +
    "#view-family .ft-node.ft-h-ancestry rect{stroke:var(--ft-david);stroke-dasharray:3 3;}" +
    "#view-family .ft-node text{pointer-events:none;}" +
    "#view-family .ft-node .ft-name{font-family:var(--serif,Georgia,serif);font-size:16px;font-weight:bold;" +
    "fill:var(--ink,#2e2418);text-anchor:middle;}" +
    "#view-family .ft-node .ft-sub{font-size:11.5px;fill:var(--muted,#8a7a62);text-anchor:middle;}" +
    "#view-family .ft-node .ft-badge{font-size:13px;text-anchor:middle;}" +
    "#view-family .ft-node:hover rect,#view-family .ft-node:focus rect{stroke-width:2.6;}" +
    "#view-family .ft-node:focus{outline:none;}" +
    "#view-family .ft-node:focus-visible{outline:2.5px solid var(--gold,#b08a2e);outline-offset:3px;}" +
    "#view-family .ft-node.ft-selected rect{stroke-width:3;filter:drop-shadow(0 0 5px rgba(184,134,11,.55));}" +
    "#view-family .ft-node.ft-gilboa rect{stroke-dasharray:2 2;}" +
    "#view-family .ft-node.ft-bridge-node rect{stroke:url(#ftBridgeGrad);stroke-width:2.2;}" +

    /* Sons of Zeruiah spotlight: dim everything else */
    "#view-family svg.ft-spot .ft-node,#view-family svg.ft-spot .ft-edge{opacity:var(--ft-dim);" +
    "transition:opacity .3s;}" +
    "#view-family svg.ft-spot .ft-node.ft-spot-keep{opacity:1;}" +
    "#view-family svg.ft-spot .ft-edge.ft-spot-keep{opacity:1;}" +
    "#view-family svg.ft-spot .ft-node.ft-spot-keep rect{stroke:var(--ft-david);stroke-width:3;" +
    "filter:drop-shadow(0 0 7px rgba(184,134,11,.6));}" +

    /* Ruth's Easter egg: the whole royal line glows */
    "@keyframes ft-glow-pulse{0%,100%{filter:drop-shadow(0 0 3px rgba(184,134,11,.5));}" +
    "50%{filter:drop-shadow(0 0 11px rgba(184,134,11,.95));}}" +
    "#view-family .ft-node.ft-lineage rect{stroke:var(--ft-david);stroke-width:3;" +
    "animation:ft-glow-pulse 1.6s ease-in-out infinite;}" +
    "#view-family .ft-edge.ft-lineage{stroke:var(--ft-david)!important;stroke-width:3.4!important;opacity:1!important;" +
    "animation:ft-glow-pulse 1.6s ease-in-out infinite;}" +
    "#view-family .ft-messiah-note.ft-lineage text{animation:ft-glow-pulse 1.6s ease-in-out infinite;}" +
    "#view-family .ft-messiah-note{cursor:default;}" +
    "#view-family .ft-messiah-note text{font-style:italic;fill:var(--ft-david);text-anchor:middle;}" +
    "#view-family .ft-messiah-note .ft-note-1{font-family:var(--serif,Georgia,serif);font-size:14px;}" +
    "#view-family .ft-messiah-note .ft-note-2{font-size:11px;opacity:.85;}" +

    /* detail panel (scrolls internally when the neuron map runs long) */
    "#view-family .ft-detail{max-height:74vh;overflow-y:auto;overscroll-behavior:contain;}" +
    "#view-family .ft-detail h3{margin-bottom:.15rem;}" +
    "#view-family .ft-meaning{font-style:italic;color:var(--muted,#8a7a62);margin:0 0 .1rem;font-size:.9rem;}" +
    "#view-family .ft-role{color:var(--muted,#8a7a62);font-size:.85rem;margin:0 0 .6rem;}" +
    "#view-family .ft-chips{display:flex;flex-wrap:wrap;gap:.35rem;margin:.5rem 0 0;}" +
    "#view-family .ft-chips .chip{cursor:default;}" +
    "#view-family .ft-chips .chip.ft-link{cursor:pointer;border-color:var(--accent,#1f4e79);}" +
    "#view-family .ft-chips .chip.ft-kin{cursor:pointer;}" +
    "#view-family .ft-kin-label{color:var(--muted,#8a7a62);font-size:.78rem;margin:.6rem 0 0;" +
    "text-transform:uppercase;letter-spacing:.06em;}" +
    "#view-family .ft-egg{margin-top:.6rem;color:var(--ft-david);font-style:italic;font-family:var(--serif,Georgia,serif);}" +

    /* neuron map: 🧠 every mention */
    "#view-family .ft-sec-label{color:var(--muted,#8a7a62);font-size:.78rem;margin:.85rem 0 0;" +
    "text-transform:uppercase;letter-spacing:.06em;}" +
    "#view-family .ft-mentions{display:flex;flex-direction:column;gap:.55rem;margin:.45rem 0 0;}" +
    "#view-family .ft-mention{border-left:2px solid var(--ft-david);padding:.05rem 0 .05rem .55rem;}" +
    "#view-family .ft-mention-head{display:flex;align-items:baseline;gap:.45rem;flex-wrap:wrap;margin-bottom:.15rem;}" +
    "#view-family .chip.ft-mref{border-color:var(--ft-david);color:var(--ft-david);" +
    "font-size:.72rem;padding:.08rem .45rem;}" +
    "#view-family button.chip.ft-mref{cursor:pointer;}" +
    "#view-family .ft-when{color:var(--muted,#8a7a62);font-size:.72rem;font-style:italic;}" +
    "#view-family .ft-what{margin:0;font-size:.85rem;line-height:1.35;}" +
    "#view-family .ft-why{margin:.12rem 0 0;font-size:.8rem;font-style:italic;color:var(--muted,#8a7a62);line-height:1.3;}" +

    /* neuron map: 🔗 connections (click to hop node-to-node) */
    "#view-family .ft-conns{display:flex;flex-direction:column;gap:.4rem;margin:.45rem 0 0;}" +
    "#view-family .ft-conn{display:block;text-align:left;background:none;border:1px solid var(--line,#dccfae);" +
    "border-radius:8px;padding:.4rem .55rem;cursor:pointer;font:inherit;color:inherit;width:100%;" +
    "transition:border-color .15s,box-shadow .15s;}" +
    "#view-family .ft-conn:hover,#view-family .ft-conn:focus{border-color:var(--ft-david);" +
    "box-shadow:0 0 4px rgba(184,134,11,.35);outline:none;}" +
    "#view-family .ft-conn-name{display:block;font-weight:bold;font-size:.85rem;" +
    "font-family:var(--serif,Georgia,serif);color:var(--accent,#1f4e79);}" +
    "#view-family .ft-conn-how{display:block;font-size:.8rem;color:var(--muted,#8a7a62);margin-top:.12rem;line-height:1.3;}" +
    "#view-family .ft-spotcard h3{margin-bottom:.3rem;}" +

    "@media (max-width:720px){#view-family .ft-layout{flex-direction:column;}" +
    "#view-family .ft-treecol,#view-family .ft-sidecol{flex:1 1 auto;width:100%;min-width:0;}}";

  function injectStyles() {
    if (document.getElementById("ft-style")) return;
    var s = el("style", { id: "ft-style" });
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  // ---- edge construction --------------------------------------------------
  // Returns [{ type, from, to, d, house }]
  function buildEdges(people) {
    var edges = [];
    var i, p;
    var seenPair = {};

    for (i = 0; i < people.length; i++) {
      p = people[i];
      if (!p || p.deprecated || !LAYOUT[p.id]) continue;

      // marriage edges
      var spouses = Array.isArray(p.spouses) ? p.spouses : [];
      for (var s = 0; s < spouses.length; s++) {
        var sp = spouses[s];
        if (!LAYOUT[sp]) continue;
        var key = p.id < sp ? p.id + "|" + sp : sp + "|" + p.id;
        if (seenPair[key]) continue;
        seenPair[key] = true;
        var A = boxOf(p.id), B = boxOf(sp);
        var pair = [p.id, sp];
        var isBridge = pair.indexOf("david") !== -1 && pair.indexOf("michal") !== -1;
        if (isBridge) {
          // the marriage that ties the two houses together
          var dv = boxOf("david"), mi = boxOf("michal");
          edges.push({
            type: "bridge", from: "david", to: "michal",
            d: "M" + dv.right + "," + (dv.y - 8) +
               " C" + (dv.right + 160) + "," + (mi.y - 4) + " " +
               (mi.left - 150) + "," + (mi.y - 12) + " " + mi.left + "," + mi.y
          });
        } else if (A.y === B.y) {
          var L2 = A.x < B.x ? A : B, R2 = A.x < B.x ? B : A;
          edges.push({ type: "marriage", from: p.id, to: sp,
            d: "M" + L2.right + "," + L2.y + " L" + R2.left + "," + R2.y });
        } else {
          var top2 = A.y < B.y ? A : B, bot = A.y < B.y ? B : A;
          edges.push({ type: "marriage", from: p.id, to: sp,
            d: "M" + top2.x + "," + top2.bottom +
               " C" + top2.x + "," + (top2.bottom + 30) + " " +
               bot.x + "," + (bot.top - 30) + " " + bot.x + "," + bot.top });
        }
      }

      // descent edges (into p from its parents)
      var parents = Array.isArray(p.parents) ? p.parents : [];
      var placed = [];
      for (var q = 0; q < parents.length; q++) if (LAYOUT[parents[q]]) placed.push(parents[q]);
      if (!placed.length) continue;
      var C = boxOf(p.id);
      var midY = C.top - 28;
      var housePerson = personById(placed[0]);
      var house = housePerson ? housePerson.house : p.house;

      var coupleMid = null;
      if (placed.length === 2) {
        var pa = personById(placed[0]);
        if (pa && Array.isArray(pa.spouses) && pa.spouses.indexOf(placed[1]) !== -1) {
          var P0 = boxOf(placed[0]), P1 = boxOf(placed[1]);
          if (P0.y === P1.y) coupleMid = { x: (P0.x + P1.x) / 2, y: P0.y };
        }
      }
      if (coupleMid) {
        edges.push({ type: "descent", from: placed.join(","), to: p.id, house: house,
          d: "M" + coupleMid.x + "," + coupleMid.y + " V" + midY + " H" + C.x + " V" + C.top });
      } else {
        for (var r = 0; r < placed.length; r++) {
          var P = boxOf(placed[r]);
          edges.push({ type: "descent", from: placed[r], to: p.id, house: house,
            d: "M" + P.x + "," + P.bottom + " V" + midY + " H" + C.x + " V" + C.top });
        }
      }
    }

    // Amasa's descent needs a custom route so it clears Asahel's node
    for (i = 0; i < edges.length; i++) {
      if (edges[i].to === "amasa" && edges[i].type === "descent") {
        var am = boxOf("amasa");
        var as1 = boxOf("abigail-sister"), jt = boxOf("jether");
        var cmx = (as1 && jt) ? (as1.x + jt.x) / 2 : am.x;
        edges[i].d = "M" + cmx + "," + (as1 ? as1.y : 470) + " V520 H" + am.x + " V" + am.top;
      }
    }

    // dotted "line to the Messiah" tail under Solomon
    var so = boxOf("solomon");
    edges.push({ type: "note", from: "solomon", to: "messiah-note",
      d: "M" + so.x + "," + so.bottom + " V" + (so.bottom + 43) });
    return edges;
  }

  // ---- SVG rendering ------------------------------------------------------
  function renderSvg(people) {
    var svg = svgEl("svg", {
      "class": "ft-svg",
      viewBox: "0 0 " + VIEW_W + " " + VIEW_H,
      width: RENDER_W, height: RENDER_H,
      role: "img",
      "aria-label": "Family tree of the houses of David and Saul"
    });

    // defs: gold→blue gradient for the bridge marriage + Michal's node
    var defs = svgEl("defs");
    var grad = svgEl("linearGradient", { id: "ftBridgeGrad", x1: "0", y1: "0", x2: "1", y2: "0" });
    grad.appendChild(svgEl("stop", { offset: "0%", "stop-color": "#b8860b" }));
    grad.appendChild(svgEl("stop", { offset: "100%", "stop-color": "#1f4e79" }));
    defs.appendChild(grad);
    svg.appendChild(defs);

    // house panels
    var hk, H;
    for (hk in HOUSES) if (Object.prototype.hasOwnProperty.call(HOUSES, hk)) {
      H = HOUSES[hk];
      var hg = svgEl("g", { "class": "ft-house " + H.cls });
      hg.appendChild(svgEl("rect", { "class": "ft-house-bg", x: H.x, y: H.y, width: H.w, height: H.h, rx: 14 }));
      hg.appendChild(svgEl("text", { "class": "ft-house-title", x: H.x + 22, y: H.y + 38 }, H.title));
      hg.appendChild(svgEl("text", { "class": "ft-house-sub", x: H.x + 22, y: H.y + 58 }, H.sub));
      svg.appendChild(hg);
    }

    // edges (grouped per house so descent strokes take house colors)
    var edges = buildEdges(people);
    var gD = svgEl("g", { "class": "ft-house-edges-david" });
    var gS = svgEl("g", { "class": "ft-house-edges-saul" });
    var gX = svgEl("g");
    for (var i = 0; i < edges.length; i++) {
      var e = edges[i];
      var path = svgEl("path", {
        "class": "ft-edge ft-edge-" + e.type,
        d: e.d, "data-from": e.from, "data-to": e.to
      });
      if (e.type === "bridge") {
        path.setAttribute("stroke", "url(#ftBridgeGrad)");
        gX.appendChild(path);
      } else if (e.type === "marriage" || e.type === "note") {
        gX.appendChild(path);
      } else {
        (e.house === "saul" ? gS : gD).appendChild(path);
      }
    }
    svg.appendChild(gD); svg.appendChild(gS); svg.appendChild(gX);

    // bridge label — centered along the David↔Michal bridge curve
    var bdv = boxOf("david"), bmi = boxOf("michal");
    var blx = Math.round((bdv.right + bmi.left) / 2);
    svg.appendChild(svgEl("text", { "class": "ft-bridge-label", x: blx, y: 372, "text-anchor": "middle" },
      "⚭ the bridge between the houses — 1 Sam 18:27"));

    // messiah note (annotation, not a person)
    var note = svgEl("g", { "class": "ft-messiah-note", "data-note": "messiah-note" });
    note.appendChild(svgEl("text", { "class": "ft-note-1", x: so().x, y: 768 }, "✶ the line runs on to the Messiah"));
    note.appendChild(svgEl("text", { "class": "ft-note-2", x: so().x, y: 786 }, "Matthew 1:1–16"));
    svg.appendChild(note);

    // nodes
    var gNodes = svgEl("g");
    for (var n = 0; n < people.length; n++) {
      var p = people[n];
      if (!p || p.deprecated || !LAYOUT[p.id]) continue;
      gNodes.appendChild(renderNode(p));
    }
    svg.appendChild(gNodes);
    return svg;

    function so() { return boxOf("solomon"); }
  }

  function renderNode(p) {
    var L = LAYOUT[p.id];
    var B = boxOf(p.id);
    var cls = "ft-node ft-h-" + (p.house || "david");
    if (hasTag(p, "gilboa")) cls += " ft-gilboa";
    if (hasTag(p, "bridge")) cls += " ft-bridge-node";
    var g = svgEl("g", {
      "class": cls, "data-id": p.id,
      tabindex: "0", role: "button", "aria-label": p.name
    });
    var tip = svgEl("title", null, p.name + (p.title ? " — " + p.title : ""));
    g.appendChild(tip);
    g.appendChild(svgEl("rect", { x: B.left, y: B.top, width: B.w, height: B.h, rx: 9 }));

    var lines = L.lines || [p.name];
    var twoNames = lines.length > 1;
    var nameY = twoNames ? B.y - 8 : (L.sub ? B.y - 1 : B.y + 5);
    for (var i = 0; i < lines.length; i++) {
      g.appendChild(svgEl("text", {
        "class": "ft-name", x: B.x, y: nameY + i * 16,
        style: twoNames ? "font-size:13px" : ""
      }, lines[i]));
    }
    if (L.sub) {
      g.appendChild(svgEl("text", { "class": "ft-sub", x: B.x, y: (twoNames ? B.bottom - 6 : B.y + 15) }, L.sub));
    }
    if (hasTag(p, "gilboa")) {
      g.appendChild(svgEl("text", { "class": "ft-badge", x: B.right - 10, y: B.top + 5 }, "⚔"));
    }
    if (hasTag(p, "messiah-line")) {
      g.appendChild(svgEl("text", { "class": "ft-badge", x: B.left + 10, y: B.top + 5, fill: "#b8860b" }, "✶"));
    }
    return g;
  }

  // ---- detail panel -------------------------------------------------------
  function refChip(ref) {
    var m = /^([12]) Samuel (\d+)/.exec(ref);
    if (m) {
      var book = m[1] === "2" ? "samuel2" : undefined;
      var chapter = parseInt(m[2], 10);
      var b = el("button", { "class": "chip ft-link", type: "button", "data-chapter": chapter }, ref + " ↗");
      b.addEventListener("click", function () {
        if (window.App && App.goToChapter) App.goToChapter(chapter, book);
      });
      return b;
    }
    return el("span", { "class": "chip" }, ref);
  }

  function shortName(name) {
    return String(name || "").replace(/ \(.*\)$/, "");
  }

  // gold verse-chip for the mentions list; "1/2 Samuel N" refs cross-link
  function mentionRefChip(ref) {
    var m = /^([12]) Samuel (\d+)/.exec(ref);
    if (m) {
      var book = m[1] === "2" ? "samuel2" : undefined;
      var chapter = parseInt(m[2], 10);
      var b = el("button", { "class": "chip ft-mref", type: "button", "data-chapter": chapter }, ref + " ↗");
      b.addEventListener("click", function () {
        if (window.App && App.goToChapter) App.goToChapter(chapter, book);
      });
      return b;
    }
    return el("span", { "class": "chip ft-mref" }, ref);
  }

  function kinChip(id, label) {
    var p = personById(id);
    if (!p || p.deprecated || !LAYOUT[id]) return null;
    var b = el("button", { "class": "chip ft-kin", type: "button", "data-kin": id },
      p.name.replace(/ \(.*\)$/, "") + (label ? " · " + label : ""));
    b.addEventListener("click", function () { selectPerson(id); });
    return b;
  }

  function kinOf(p) {
    // parents / spouses / children / siblings (siblings derived from shared parents)
    var people = getPeople() || [];
    var out = { parents: p.parents || [], spouses: p.spouses || [], children: [], siblings: [] };
    for (var i = 0; i < people.length; i++) {
      var q = people[i];
      if (!q || q.id === p.id) continue;
      var qp = q.parents || [];
      for (var j = 0; j < qp.length; j++) {
        if (qp[j] === p.id && out.children.indexOf(q.id) === -1) out.children.push(q.id);
      }
      var pp = p.parents || [];
      for (var k = 0; k < pp.length; k++) {
        if (qp.indexOf(pp[k]) !== -1 && out.siblings.indexOf(q.id) === -1) out.siblings.push(q.id);
      }
    }
    return out;
  }

  function renderDetail(p) {
    var box = els.detail;
    clear(box);
    box.appendChild(el("h3", null, p.name));
    if (p.meaning) box.appendChild(el("p", { "class": "ft-meaning" }, p.meaning));
    if (p.title) box.appendChild(el("p", { "class": "ft-role" }, p.title));
    if (p.description) box.appendChild(el("p", null, p.description));

    if (Array.isArray(p.refs) && p.refs.length) {
      var chips = el("div", { "class": "ft-chips" });
      for (var i = 0; i < p.refs.length; i++) chips.appendChild(refChip(p.refs[i]));
      box.appendChild(chips);
    }

    // 🧠 neuron map: every significant mention
    if (Array.isArray(p.mentions) && p.mentions.length) {
      box.appendChild(el("p", { "class": "ft-sec-label" }, "🧠 Every mention"));
      var mlist = el("div", { "class": "ft-mentions" });
      for (var m = 0; m < p.mentions.length; m++) {
        var mn = p.mentions[m];
        if (!mn) continue;
        var item = el("div", { "class": "ft-mention" });
        var head = el("div", { "class": "ft-mention-head" });
        if (mn.ref) head.appendChild(mentionRefChip(mn.ref));
        if (mn.when) head.appendChild(el("span", { "class": "ft-when" }, mn.when));
        item.appendChild(head);
        if (mn.what) item.appendChild(el("p", { "class": "ft-what" }, mn.what));
        if (mn.why) item.appendChild(el("p", { "class": "ft-why" }, mn.why));
        mlist.appendChild(item);
      }
      box.appendChild(mlist);
    }

    // 🔗 neuron map: associative links — click to hop through the web
    if (Array.isArray(p.connections) && p.connections.length) {
      var clist = el("div", { "class": "ft-conns" });
      var anyConn = false;
      for (var c = 0; c < p.connections.length; c++) {
        var cn = p.connections[c];
        var target = cn && cn.to ? personById(cn.to) : null;
        if (!target || target.deprecated) continue;   // unknown / retired id — skip gracefully
        anyConn = true;
        var row = el("button", { "class": "ft-conn", type: "button", "data-conn": target.id });
        row.appendChild(el("span", { "class": "ft-conn-name" }, shortName(target.name) + " →"));
        if (cn.how) row.appendChild(el("span", { "class": "ft-conn-how" }, cn.how));
        row.addEventListener("click", (function (tid) {
          return function () { selectPerson(tid); };
        })(target.id));
        clist.appendChild(row);
      }
      if (anyConn) {
        box.appendChild(el("p", { "class": "ft-sec-label" }, "🔗 Connections"));
        box.appendChild(clist);
      }
    }

    var kin = kinOf(p);
    var groups = [["Parents", kin.parents], ["Spouses", kin.spouses], ["Children", kin.children], ["Siblings", kin.siblings]];
    for (var g = 0; g < groups.length; g++) {
      var ids = groups[g][1];
      var row = el("div", { "class": "ft-chips" });
      var any = false;
      for (var j = 0; j < ids.length; j++) {
        var c = kinChip(ids[j]);
        if (c) { row.appendChild(c); any = true; }
      }
      if (any) {
        box.appendChild(el("p", { "class": "ft-kin-label" }, groups[g][0]));
        box.appendChild(row);
      }
    }

    if (p.id === "ruth") {
      box.appendChild(el("p", { "class": "ft-egg" },
        "✶ A Moabite grandmother in the royal line — watch her whole descent glow, " +
        "down through David toward the Messiah (Matthew 1:5)."));
    }
  }

  function renderSpotlightCard() {
    var box = els.detail;
    clear(box);
    var wrap = el("div", { "class": "ft-spotcard" });
    wrap.appendChild(el("h3", null, "⚔ The Sons of Zeruiah"));
    wrap.appendChild(el("p", { "class": "ft-meaning" }, "Joab · Abishai · Asahel — David's sister's sons (1 Chronicles 2:16)"));
    wrap.appendChild(el("p", null,
      "Three brothers stand at David's shoulder through the whole story. Joab, the ruthless " +
      "commander, wins David's wars and does his darkest errands — and murders Abner and Amasa " +
      "in cold blood. Abishai, fierce and devoted, creeps with David into Saul's sleeping camp " +
      "and begs for one spear-thrust. Asahel, swift as a wild gazelle, chases Abner from the " +
      "battle of Gibeon and will not turn aside — and dies on the butt of a spear, starting " +
      "the blood-feud between the houses."));
    var chips = el("div", { "class": "ft-chips" });

    var c1 = el("button", { "class": "chip ft-link", type: "button" }, "Into Saul's camp — 1 Sam 26:6 ↗");
    c1.addEventListener("click", function () {
      if (window.App && App.goToChapter) App.goToChapter(26);
    });
    chips.appendChild(c1);

    var c2 = el("button", { "class": "chip ft-link", type: "button", "data-action": "battle" },
      "▶ Play the Battle of Gibeon");
    c2.addEventListener("click", function () {
      if (window.App && App.showView) App.showView("battle");
    });
    chips.appendChild(c2);

    chips.appendChild(el("span", { "class": "chip" }, "2 Samuel 2:18–23"));
    wrap.appendChild(chips);

    var meet = el("div", { "class": "ft-chips" });
    for (var i = 0; i < ZERUIAH_SONS.length; i++) {
      var c = kinChip(ZERUIAH_SONS[i]);
      if (c) meet.appendChild(c);
    }
    wrap.appendChild(el("p", { "class": "ft-kin-label" }, "Meet the brothers"));
    wrap.appendChild(meet);
    box.appendChild(wrap);
  }

  // ---- selection / spotlight / lineage ------------------------------------
  function eachNode(fn) {
    var nodes = els.svg.querySelectorAll(".ft-node");
    for (var i = 0; i < nodes.length; i++) fn(nodes[i], nodes[i].getAttribute("data-id"));
  }
  function eachEdge(fn) {
    var edges = els.svg.querySelectorAll(".ft-edge");
    for (var i = 0; i < edges.length; i++) fn(edges[i]);
  }
  function rmClassAll(cls) {
    var marked = els.svg.querySelectorAll("." + cls);
    for (var i = 0; i < marked.length; i++) {
      marked[i].setAttribute("class", (marked[i].getAttribute("class") || "").replace(" " + cls, ""));
    }
  }
  function addClass(node, cls) {
    var c = node.getAttribute("class") || "";
    if (c.indexOf(" " + cls) === -1) node.setAttribute("class", c + " " + cls);
  }

  function clearSpotlight() {
    state.spotlight = false;
    if (!els.svg) return;
    els.svg.setAttribute("class", "ft-svg");
    rmClassAll("ft-spot-keep");
  }

  function clearLineage() {
    if (!els.svg) return;
    rmClassAll("ft-lineage");
  }

  function applyLineageGlow() {
    eachNode(function (node, id) {
      if (MESSIAH_CHAIN.indexOf(id) !== -1) addClass(node, "ft-lineage");
    });
    eachEdge(function (edge) {
      var to = edge.getAttribute("data-to");
      var froms = (edge.getAttribute("data-from") || "").split(",");
      if (MESSIAH_CHAIN.indexOf(to) === -1) return;
      for (var i = 0; i < froms.length; i++) {
        if (MESSIAH_CHAIN.indexOf(froms[i]) !== -1) { addClass(edge, "ft-lineage"); return; }
      }
    });
    var note = els.svg.querySelector(".ft-messiah-note");
    if (note) addClass(note, "ft-lineage");
  }

  function scrollToX(svgX, svgY) {
    if (!els.scroll) return;
    state.scrollTarget = { x: svgX, y: svgY };
    applyScrollTarget();
  }

  // While #view-family is display:none, scroll positions don't stick — so the
  // target is remembered and re-applied when the view becomes visible.
  function applyScrollTarget() {
    var t = state.scrollTarget;
    if (!t || !els.scroll) return;
    try {
      var cw = els.scroll.clientWidth;
      if (!cw) return;                      // hidden: wait for the view to activate
      els.scroll.scrollLeft = Math.max(0, t.x * SCALE - cw / 2);
      if (t.y != null) {
        var chH = els.scroll.clientHeight || 400;
        els.scroll.scrollTop = Math.max(0, t.y * SCALE - chH / 2);
      }
    } catch (err) { /* non-scrolling environments */ }
  }

  function selectPerson(id) {
    var p = personById(id);
    if (!p || p.deprecated || !els.svg) return;
    clearSpotlight();
    clearLineage();
    state.selected = id;
    rmClassAll("ft-selected");
    var node = els.svg.querySelector('.ft-node[data-id="' + id + '"]');
    if (node) addClass(node, "ft-selected");
    renderDetail(p);
    if (id === "ruth") applyLineageGlow();  // Easter egg
    var B = boxOf(id);
    if (B) scrollToX(B.x, B.y);
  }

  function applySpotlight() {
    if (!els.svg) return;
    clearLineage();
    rmClassAll("ft-selected");
    state.selected = null;
    state.spotlight = true;
    els.svg.setAttribute("class", "ft-svg ft-spot");
    eachNode(function (node, id) {
      if (SPOT_KEEP.indexOf(id) !== -1) addClass(node, "ft-spot-keep");
    });
    eachEdge(function (edge) {
      var to = edge.getAttribute("data-to");
      var from = edge.getAttribute("data-from");
      if (SPOT_KEEP.indexOf(to) !== -1 && SPOT_KEEP.indexOf(from) !== -1) addClass(edge, "ft-spot-keep");
      else if (from === "zeruiah" && SPOT_KEEP.indexOf(to) !== -1) addClass(edge, "ft-spot-keep");
    });
    renderSpotlightCard();
    var ab = boxOf("abishai");
    scrollToX(ab ? ab.x : 1405, ab ? ab.y : 590);
  }

  // ---- drag-to-pan --------------------------------------------------------
  function wirePan(scroll) {
    var down = false, moved = false, sx = 0, sy = 0, sl = 0, st = 0;
    scroll.addEventListener("mousedown", function (ev) {
      down = true; moved = false;
      sx = ev.clientX; sy = ev.clientY;
      sl = scroll.scrollLeft; st = scroll.scrollTop;
    });
    scroll.addEventListener("mousemove", function (ev) {
      if (!down) return;
      var dx = ev.clientX - sx, dy = ev.clientY - sy;
      if (Math.abs(dx) + Math.abs(dy) > 6) {
        moved = true;
        addClass2(scroll, "ft-dragging");
        scroll.scrollLeft = sl - dx;
        scroll.scrollTop = st - dy;
      }
    });
    var end = function () {
      down = false;
      rmClass2(scroll, "ft-dragging");
      // If the drag ends outside the box no click follows to consume the
      // flag — clear it a tick later so the next real click isn't eaten.
      window.setTimeout(function () { moved = false; }, 0);
    };
    scroll.addEventListener("mouseup", end);
    scroll.addEventListener("mouseleave", end);
    // swallow the click that follows a real drag so nodes don't fire
    scroll.addEventListener("click", function (ev) {
      if (moved) { moved = false; ev.stopPropagation(); ev.preventDefault(); }
    }, true);

    function addClass2(n, c) { if ((" " + n.className + " ").indexOf(" " + c + " ") === -1) n.className += " " + c; }
    function rmClass2(n, c) { n.className = (" " + n.className + " ").replace(" " + c + " ", " ").replace(/^\s+|\s+$/g, ""); }
  }

  // ---- init ---------------------------------------------------------------
  function init() {
    var root = document.getElementById("view-family");
    if (!root) return;                       // section not in the shell yet — stay quiet
    injectStyles();
    clear(root);
    els = {};

    root.appendChild(el("h2", null, "Family Lines"));
    root.appendChild(el("p", { "class": "ft-intro" },
      "Two houses, one throne. The house of David (gold) and the house of Saul (blue), " +
      "joined by a single marriage — and torn by a single spear-thrust at Gibeon."));

    var people = getPeople();
    if (!people || !people.length) {
      var ph = el("div", { "class": "card" });
      ph.appendChild(el("h3", null, "The scrolls are missing"));
      ph.appendChild(el("p", null,
        "The family data (data/family.js) hasn't loaded, so the genealogy can't be drawn. " +
        "Make sure the data scripts are included before the view scripts, then reload."));
      root.appendChild(ph);
      state.inited = true;
      return;
    }

    // toolbar
    var bar = el("div", { "class": "ft-toolbar" });
    var spotBtn = el("button", { "class": "btn", type: "button", id: "ft-spotlight-btn" }, "⚔ Sons of Zeruiah");
    spotBtn.addEventListener("click", applySpotlight);
    bar.appendChild(spotBtn);
    bar.appendChild(el("span", { "class": "ft-hint" }, "drag to pan · click a name for the story"));
    root.appendChild(bar);

    // legend
    var legend = el("div", { "class": "ft-legend" });
    legend.appendChild(legendKey("M2,8 H30", "stroke:#b8860b;stroke-width:2", "descent"));
    legend.appendChild(legendKey("M2,8 H30", "stroke:#8a7a62;stroke-width:2;stroke-dasharray:5 4", "marriage"));
    legend.appendChild(legendKey("M2,8 H30", "stroke:#1f4e79;stroke-width:3;stroke-dasharray:8 5", "the bridge (Michal ⚭ David)"));
    legend.appendChild(el("span", { "class": "ft-key" }, "⚔ fell at Gilboa"));
    legend.appendChild(el("span", { "class": "ft-key" }, "✶ line to the Messiah"));
    root.appendChild(legend);

    // layout: tree + side panel
    var layout = el("div", { "class": "ft-layout" });
    var treecol = el("div", { "class": "ft-treecol" });
    var scroll = el("div", { "class": "ft-scroll", id: "ft-scroll" });
    var svg = renderSvg(people);
    scroll.appendChild(svg);
    treecol.appendChild(scroll);
    layout.appendChild(treecol);

    var sidecol = el("div", { "class": "ft-sidecol" });
    var detail = el("div", { "class": "card ft-detail", id: "ft-detail" });
    sidecol.appendChild(detail);
    layout.appendChild(sidecol);
    root.appendChild(layout);

    els.root = root; els.svg = svg; els.scroll = scroll; els.detail = detail;

    // node clicks + keyboard
    svg.addEventListener("click", function (ev) {
      var t = ev.target;
      while (t && t !== svg && !(t.getAttribute && t.getAttribute("data-id"))) t = t.parentNode;
      if (t && t !== svg && t.getAttribute) {
        var id = t.getAttribute("data-id");
        if (id) selectPerson(id);
      }
    });
    svg.addEventListener("keydown", function (ev) {
      if (ev.key !== "Enter" && ev.key !== " ") return;
      var t = ev.target;
      if (t && t.getAttribute && t.getAttribute("data-id")) {
        ev.preventDefault();
        selectPerson(t.getAttribute("data-id"));
      }
    });
    wirePan(scroll);

    // when the tab activates, honor any scroll target set while hidden
    if (visObserver) { try { visObserver.disconnect(); } catch (e) {} }
    if (typeof MutationObserver === "function") {
      visObserver = new MutationObserver(function () {
        if (root.classList && root.classList.contains("active")) applyScrollTarget();
      });
      visObserver.observe(root, { attributes: true, attributeFilter: ["class"] });
    }

    state.inited = true;

    // default focus: the sons of Zeruiah — unless a focus was queued
    if (state.pendingFocus && personById(state.pendingFocus)) {
      var pid = state.pendingFocus;
      state.pendingFocus = null;
      selectPerson(pid);
    } else {
      applySpotlight();
    }

    function legendKey(d, style, label) {
      var span = el("span", { "class": "ft-key" });
      var s = svgEl("svg", { width: 32, height: 16, viewBox: "0 0 32 16", "aria-hidden": "true" });
      s.appendChild(svgEl("path", { d: d, fill: "none", style: style }));
      span.appendChild(s);
      span.appendChild(document.createTextNode(label));
      return span;
    }
  }

  function focus(personId) {
    if (!state.inited || !els.svg) {
      state.pendingFocus = personId;
      return;
    }
    if (personById(personId)) selectPerson(personId);
  }

  window.FamilyTreeView = { init: init, focus: focus };
})();
