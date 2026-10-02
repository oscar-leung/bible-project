/* js/stage.js — window.Stage (Game Dev)
   The side-panel scene engine for Journey Mode: stylized, animated 2D
   vignettes in the app's illuminated-parchment language. Plain script
   global, no modules, no assets — every scene is generated SVG.

   API:
     Stage.detect(text)            -> scene type string
     Stage.render(el, type, opts)  -> paints a scene into el
       opts: { actors: ["David","Goliath"], label: "..." }            */

(function () {
  "use strict";

  var SVG = "http://www.w3.org/2000/svg";
  var STYLE_ID = "stage-styles";

  function ensureStyles() {
    if (document.getElementById(STYLE_ID)) return;
    var css = "" +
      ".stage-box{position:relative;width:100%;height:100%;overflow:hidden;border-radius:12px;" +
      "background:linear-gradient(180deg,#f2e7cf 0%,#e8dcc0 55%,#d9c9a4 100%);}" +
      "@media (prefers-color-scheme: dark){.stage-box{background:linear-gradient(180deg,#241d12 0%,#2b2314 55%,#191307 100%);}}" +
      ".stage-box svg{display:block;width:100%;height:100%;}" +
      ".stage-label{position:absolute;left:0;right:0;bottom:8px;text-align:center;font-family:Georgia,serif;" +
      "font-size:.78rem;letter-spacing:.14em;text-transform:uppercase;color:rgba(70,52,22,.75);pointer-events:none;}" +
      "@media (prefers-color-scheme: dark){.stage-label{color:rgba(230,210,160,.7);}}" +
      "@keyframes stg-flicker{0%,100%{opacity:1;transform:scale(1)}40%{opacity:.75;transform:scale(.92)}70%{opacity:.9;transform:scale(1.06)}}" +
      "@keyframes stg-fly{0%{transform:translate(0,0) rotate(8deg);opacity:0}12%{opacity:1}100%{transform:translate(190px,46px) rotate(14deg);opacity:0}}" +
      "@keyframes stg-fly2{0%{transform:translate(0,0) rotate(-10deg);opacity:0}12%{opacity:1}100%{transform:translate(-185px,40px) rotate(-16deg);opacity:0}}" +
      "@keyframes stg-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}" +
      "@keyframes stg-walk{0%{transform:translateX(-40px)}100%{transform:translateX(420px)}}" +
      "@keyframes stg-twinkle{0%,100%{opacity:.9}50%{opacity:.25}}" +
      "@keyframes stg-wave{0%,100%{transform:skewX(0deg)}50%{transform:skewX(-7deg)}}" +
      "@keyframes stg-glow{0%,100%{opacity:.55}50%{opacity:1}}" +
      "@keyframes stg-rain{0%{transform:translateY(-30px);opacity:0}25%{opacity:.6}100%{transform:translateY(60px);opacity:0}}" +
      "@keyframes stg-sway{0%,100%{transform:rotate(-2.5deg)}50%{transform:rotate(2.5deg)}}" +
      ".stg-flicker{animation:stg-flicker 1.1s ease-in-out infinite;transform-origin:center bottom;}" +
      ".stg-fly{animation:stg-fly 2.4s linear infinite;}" +
      ".stg-fly2{animation:stg-fly2 2.6s .7s linear infinite;}" +
      ".stg-bob{animation:stg-bob 2.2s ease-in-out infinite;}" +
      ".stg-walk{animation:stg-walk 14s linear infinite;}" +
      ".stg-twinkle{animation:stg-twinkle 2.8s ease-in-out infinite;}" +
      ".stg-wave{animation:stg-wave 2.4s ease-in-out infinite;transform-origin:left top;}" +
      ".stg-glow{animation:stg-glow 2.6s ease-in-out infinite;}" +
      ".stg-rain{animation:stg-rain 1.6s linear infinite;}" +
      ".stg-sway{animation:stg-sway 3.4s ease-in-out infinite;transform-origin:center bottom;}" +
      "@media (prefers-reduced-motion: reduce){.stage-box *{animation:none !important;}}";
    var s = document.createElement("style");
    s.id = STYLE_ID;
    s.textContent = css;
    document.head.appendChild(s);
  }

  // ---- palette (ink-on-parchment silhouettes, gold accents) ---------------
  var P = {
    ink: "#4a3b22", inkSoft: "rgba(74,59,34,.55)", gold: "#b8860b",
    goldHi: "#e8c76a", red: "#8c3b2e", blue: "#28466e", green: "#4a7c59",
    ground: "rgba(74,59,34,.25)", sky: "rgba(40,70,110,.12)"
  };

  // ---- tiny svg helpers ----------------------------------------------------
  function el(tag, attrs) {
    var n = document.createElementNS(SVG, tag);
    for (var k in attrs) if (Object.prototype.hasOwnProperty.call(attrs, k)) n.setAttribute(k, attrs[k]);
    return n;
  }
  function g(cls, transform) {
    var n = el("g", {});
    if (cls) n.setAttribute("class", cls);
    if (transform) n.setAttribute("transform", transform);
    return n;
  }

  // A robed silhouette figure. size ~ height in px; flip = faces left.
  // CSS transform animations REPLACE an element's transform attribute, so
  // the position lives on an outer group and any animation class on an
  // inner one — never both on the same node.
  function figure(x, y, size, color, opts) {
    opts = opts || {};
    var outer = g("", "translate(" + x + " " + y + ")" + (opts.flip ? " scale(-1,1)" : ""));
    var grp = opts.cls ? g(opts.cls, "") : outer;
    if (grp !== outer) outer.appendChild(grp);
    var s = size / 100;
    // robe
    grp.appendChild(el("path", {
      d: "M" + (-14 * s) + " 0 L" + (-7 * s) + " " + (-52 * s) + " Q0 " + (-60 * s) + " " + (7 * s) + " " + (-52 * s) +
         " L" + (14 * s) + " 0 Z",
      fill: color
    }));
    // head
    grp.appendChild(el("circle", { cx: 0, cy: -68 * s, r: 9 * s, fill: color }));
    // staff / spear / sword
    if (opts.staff) grp.appendChild(el("path", { d: "M" + (12 * s) + " 4 L" + (20 * s) + " " + (-80 * s), stroke: color, "stroke-width": 2.4 * s, "stroke-linecap": "round", fill: "none" }));
    if (opts.spear) grp.appendChild(el("path", { d: "M" + (14 * s) + " 2 L" + (30 * s) + " " + (-86 * s) + " M" + (26 * s) + " " + (-76 * s) + " L" + (30 * s) + " " + (-86 * s) + " L" + (33 * s) + " " + (-75 * s), stroke: color, "stroke-width": 2.6 * s, "stroke-linecap": "round", fill: "none" }));
    if (opts.sling) grp.appendChild(el("path", { d: "M" + (10 * s) + " " + (-46 * s) + " q" + (16 * s) + " " + (-14 * s) + " " + (26 * s) + " " + (-2 * s), stroke: color, "stroke-width": 2 * s, fill: "none", "stroke-linecap": "round" }));
    if (opts.crown) grp.appendChild(el("path", { d: "M" + (-8 * s) + " " + (-76 * s) + " l" + (4 * s) + " " + (-7 * s) + " l" + (4 * s) + " " + (5 * s) + " l" + (4 * s) + " " + (-5 * s) + " l" + (4 * s) + " " + (7 * s) + " z", fill: P.gold }));
    if (opts.bow) grp.appendChild(el("path", { d: "M" + (-16 * s) + " " + (-20 * s) + " q" + (-14 * s) + " " + (-22 * s) + " 0 " + (-44 * s), stroke: color, "stroke-width": 2.2 * s, fill: "none" }));
    if (opts.name) {
      var t = el("text", { x: 0, y: 16, "text-anchor": "middle", "font-size": 11, "font-family": "Georgia,serif", fill: P.inkSoft, "letter-spacing": ".08em" });
      t.textContent = opts.name;
      if (opts.flip) t.setAttribute("transform", "scale(-1,1)");
      grp.appendChild(t);
    }
    return outer;
  }

  function hills(svg, y1, y2) {
    svg.appendChild(el("path", { d: "M0 " + y1 + " Q120 " + (y1 - 42) + " 240 " + y1 + " T480 " + (y1 - 10) + " V360 H0 Z", fill: P.sky }));
    svg.appendChild(el("path", { d: "M0 " + y2 + " Q160 " + (y2 - 30) + " 300 " + y2 + " T480 " + (y2 - 6) + " V360 H0 Z", fill: P.ground }));
  }
  function ground(svg, y) {
    svg.appendChild(el("rect", { x: 0, y: y, width: 480, height: 360 - y, fill: P.ground }));
  }
  function sun(svg, x, y, r, cls) {
    svg.appendChild(el("circle", { cx: x, cy: y, r: r, fill: P.goldHi, opacity: ".8", "class": cls || "" }));
  }
  function tent(x, y, w, color) {
    var grp = g("", "translate(" + x + " " + y + ")");
    grp.appendChild(el("path", { d: "M0 0 L" + (w / 2) + " " + (-w * 0.62) + " L" + w + " 0 Z", fill: color }));
    grp.appendChild(el("path", { d: "M" + (w * 0.38) + " 0 L" + (w / 2) + " " + (-w * 0.3) + " L" + (w * 0.62) + " 0 Z", fill: "rgba(0,0,0,.18)" }));
    return grp;
  }
  function flame(x, y, s, cls) {
    var outer = g("", "translate(" + x + " " + y + ")");
    var grp = g(cls || "stg-flicker", "");
    outer.appendChild(grp);
    grp.appendChild(el("path", { d: "M0 0 C" + (-7 * s) + " " + (-8 * s) + " " + (-3 * s) + " " + (-18 * s) + " 0 " + (-24 * s) + " C" + (3 * s) + " " + (-18 * s) + " " + (7 * s) + " " + (-8 * s) + " 0 0 Z", fill: P.gold }));
    grp.appendChild(el("path", { d: "M0 " + (-3 * s) + " C" + (-3 * s) + " " + (-8 * s) + " " + (-1.5 * s) + " " + (-13 * s) + " 0 " + (-16 * s) + " C" + (1.5 * s) + " " + (-13 * s) + " " + (3 * s) + " " + (-8 * s) + " 0 " + (-3 * s) + " Z", fill: P.goldHi }));
    return outer;
  }
  function arrow(x, y, cls, color) {
    var outer = g("", "translate(" + x + " " + y + ")");
    var grp = g(cls, "");
    outer.appendChild(grp);
    grp.appendChild(el("path", { d: "M0 0 L26 6 M20 1 L26 6 L19 9", stroke: color || P.ink, "stroke-width": 2, fill: "none", "stroke-linecap": "round" }));
    return outer;
  }
  function stars(svg, n) {
    for (var i = 0; i < n; i++) {
      svg.appendChild(el("circle", {
        cx: 20 + Math.round(440 * ((i * 73) % 97) / 97), cy: 16 + Math.round(90 * ((i * 41) % 89) / 89),
        r: 1.6, fill: P.goldHi, "class": "stg-twinkle",
        style: "animation-delay:" + ((i * 0.37) % 2.4) + "s"
      }));
    }
  }
  function banner(x, y, color) {
    var grp = g("", "translate(" + x + " " + y + ")");
    grp.appendChild(el("path", { d: "M0 0 V-74", stroke: P.ink, "stroke-width": 2.5 }));
    var cloth = el("path", { d: "M0 -74 L34 -66 L0 -56 Z", fill: color, "class": "stg-wave" });
    grp.appendChild(cloth);
    return grp;
  }
  function cityWall(svg, x, y, w, h) {
    var grp = g("", "translate(" + x + " " + y + ")");
    grp.appendChild(el("rect", { x: 0, y: -h, width: w, height: h, fill: P.inkSoft }));
    for (var i = 0; i < Math.floor(w / 16); i++) {
      grp.appendChild(el("rect", { x: i * 16 + 3, y: -h - 8, width: 9, height: 8, fill: P.inkSoft }));
    }
    grp.appendChild(el("rect", { x: w * 0.42, y: -h * 0.62, width: w * 0.16, height: h * 0.62, fill: "rgba(0,0,0,.25)", rx: 6 }));
    svg.appendChild(grp);
    return grp;
  }

  // ---- the scenes ----------------------------------------------------------
  var SCENES = {
    shepherd: function (svg, o) {
      sun(svg, 400, 54, 22, "stg-glow"); hills(svg, 236, 282);
      for (var i = 0; i < 5; i++) {
        var sx = 70 + i * 52, sy = 300 + (i % 2) * 14;
        var pen = g("", "translate(" + sx + " " + sy + ")");
        var sheep = g("stg-bob", "");
        pen.appendChild(sheep);
        sheep.appendChild(el("ellipse", { cx: 0, cy: 0, rx: 16, ry: 10, fill: "#efe6d2", stroke: P.inkSoft, "stroke-width": 1.4 }));
        sheep.appendChild(el("circle", { cx: 14, cy: -4, r: 5, fill: P.inkSoft }));
        sheep.style.animationDelay = (i * 0.3) + "s";
        svg.appendChild(pen);
      }
      svg.appendChild(figure(380, 316, 118, P.ink, { staff: true, flip: true, name: o.a1 }));
    },
    duel: function (svg, o) {
      hills(svg, 226, 272);
      svg.appendChild(banner(52, 320, P.blue));
      svg.appendChild(banner(430, 320, P.red));
      // The giant's name belongs to the giant whatever order the prose
      // mentioned the actors in.
      var small = "David", big = "Goliath";
      var both = [o.a1, o.a2];
      if (both.indexOf("Goliath") !== -1) {
        big = "Goliath";
        small = both[0] === "Goliath" ? (both[1] || "David") : (both[0] || "David");
      } else if (o.a1 || o.a2) { small = o.a1 || small; big = o.a2 || big; }
      svg.appendChild(figure(150, 318, 86, P.blue, { sling: true, name: small, cls: "stg-bob" }));
      svg.appendChild(figure(330, 322, 160, P.red, { spear: true, flip: true, name: big }));
      var stone = el("circle", { cx: 176, cy: 246, r: 4, fill: P.ink, "class": "stg-fly" });
      svg.appendChild(stone);
    },
    battle: function (svg, o) {
      hills(svg, 222, 268);
      svg.appendChild(banner(40, 318, P.blue));
      svg.appendChild(banner(442, 318, P.red));
      var i;
      for (i = 0; i < 4; i++) svg.appendChild(figure(74 + i * 34, 320 + (i % 2) * 8, 82 - i * 4, P.blue, { spear: true, cls: i === 0 ? "stg-bob" : "" }));
      for (i = 0; i < 4; i++) svg.appendChild(figure(406 - i * 34, 320 + (i % 2) * 8, 82 - i * 4, P.red, { spear: true, flip: true, cls: i === 0 ? "stg-bob" : "" }));
      svg.appendChild(arrow(130, 196, "stg-fly", P.blue));
      svg.appendChild(arrow(348, 190, "stg-fly2", P.red));
      if (o.a1) svg.appendChild(textLabel(svg, 120, 352, o.a1, P.blue));
      if (o.a2) svg.appendChild(textLabel(svg, 372, 352, o.a2, P.red));
    },
    camp: function (svg, o) {
      stars(svg, 14); hills(svg, 248, 290);
      svg.appendChild(tent(70, 318, 86, P.inkSoft));
      svg.appendChild(tent(330, 322, 104, P.inkSoft));
      svg.appendChild(flame(240, 326, 1.5));
      svg.appendChild(el("ellipse", { cx: 240, cy: 330, rx: 22, ry: 5, fill: "rgba(0,0,0,.18)" }));
      svg.appendChild(figure(192, 328, 84, P.ink, { name: o.a1 }));
      if (o.a2) svg.appendChild(figure(292, 330, 84, P.ink, { flip: true, name: o.a2 }));
    },
    temple: function (svg, o) {
      sun(svg, 240, 64, 26, "stg-glow");
      ground(svg, 300);
      for (var i = 0; i < 2; i++) {
        var px = i ? 352 : 96;
        svg.appendChild(el("rect", { x: px, y: 120, width: 26, height: 180, fill: P.inkSoft }));
        svg.appendChild(el("rect", { x: px - 8, y: 108, width: 42, height: 14, fill: P.inkSoft }));
      }
      svg.appendChild(el("rect", { x: 70, y: 96, width: 340, height: 14, fill: P.inkSoft }));
      // the ark / altar glow
      svg.appendChild(el("rect", { x: 212, y: 252, width: 56, height: 34, fill: P.gold, rx: 4, "class": "stg-glow" }));
      svg.appendChild(el("path", { d: "M212 252 q28 -26 56 0", stroke: P.goldHi, "stroke-width": 3, fill: "none", "class": "stg-glow" }));
      svg.appendChild(figure(168, 312, 92, P.ink, { name: o.a1, cls: "stg-bob" }));
      if (o.a2) svg.appendChild(figure(316, 312, 92, P.ink, { flip: true, name: o.a2 }));
    },
    throne: function (svg, o) {
      ground(svg, 296);
      svg.appendChild(el("rect", { x: 186, y: 182, width: 108, height: 114, fill: P.inkSoft, rx: 8 }));
      svg.appendChild(el("rect", { x: 160, y: 288, width: 160, height: 12, fill: P.inkSoft }));
      svg.appendChild(el("rect", { x: 140, y: 300, width: 200, height: 12, fill: "rgba(0,0,0,.14)" }));
      svg.appendChild(figure(240, 286, 102, P.ink, { crown: true, name: o.a1 }));
      svg.appendChild(figure(118, 314, 82, P.inkSoft, { name: o.a2 }));
      svg.appendChild(figure(362, 314, 82, P.inkSoft, { flip: true }));
      svg.appendChild(banner(70, 312, P.blue));
      svg.appendChild(banner(412, 312, P.blue));
    },
    wilderness: function (svg, o) {
      stars(svg, 18); hills(svg, 232, 280);
      // cave mouth
      svg.appendChild(el("path", { d: "M330 320 q34 -74 92 -58 L480 320 Z", fill: "rgba(0,0,0,.3)" }));
      svg.appendChild(el("path", { d: "M58 318 q6 -34 2 -58", stroke: P.green, "stroke-width": 5, fill: "none", "stroke-linecap": "round", "class": "stg-sway" }));
      svg.appendChild(figure(170, 322, 96, P.ink, { staff: true, name: o.a1, cls: "stg-bob" }));
      if (o.a2) svg.appendChild(figure(260, 326, 88, P.inkSoft, { flip: true, name: o.a2 }));
    },
    travel: function (svg, o) {
      sun(svg, 70, 52, 20, "stg-glow"); hills(svg, 240, 286);
      var caravan = g("stg-walk", "");
      caravan.appendChild(figure(0, 316, 92, P.ink, { staff: true, name: o.a1 }));
      caravan.appendChild(figure(54, 320, 80, P.inkSoft, {}));
      caravan.appendChild(figure(100, 318, 74, P.inkSoft, {}));
      // donkey
      var d = g("", "translate(150 318)");
      d.appendChild(el("ellipse", { cx: 0, cy: -16, rx: 22, ry: 11, fill: P.inkSoft }));
      d.appendChild(el("path", { d: "M18 -22 l12 -12 M-14 -8 V2 M10 -8 V2", stroke: P.inkSoft, "stroke-width": 3.4, "stroke-linecap": "round" }));
      caravan.appendChild(d);
      svg.appendChild(caravan);
    },
    mourning: function (svg, o) {
      hills(svg, 238, 284);
      for (var i = 0; i < 8; i++) {
        svg.appendChild(el("path", {
          d: "M" + (40 + i * 56) + " 20 v16", stroke: P.inkSoft, "stroke-width": 1.6,
          "class": "stg-rain", style: "animation-delay:" + (i * 0.21) + "s", "stroke-linecap": "round"
        }));
      }
      var bow1 = figure(190, 322, 92, P.ink, { name: o.a1 });
      bow1.setAttribute("transform", bow1.getAttribute("transform") + " rotate(14)");
      svg.appendChild(bow1);
      var bow2 = figure(290, 326, 84, P.inkSoft, { flip: true, name: o.a2 });
      bow2.setAttribute("transform", bow2.getAttribute("transform") + " rotate(-13)");
      svg.appendChild(bow2);
      svg.appendChild(el("path", { d: "M216 332 h56", stroke: P.inkSoft, "stroke-width": 7, "stroke-linecap": "round" }));
    },
    siege: function (svg, o) {
      hills(svg, 250, 296);
      cityWall(svg, 262, 318, 170, 92);
      svg.appendChild(flame(372, 226, 1.3));
      svg.appendChild(flame(300, 224, 1.1));
      for (var i = 0; i < 3; i++) svg.appendChild(figure(70 + i * 44, 322 + (i % 2) * 6, 80, P.blue, { spear: true }));
      svg.appendChild(arrow(150, 210, "stg-fly", P.blue));
      if (o.a1) svg.appendChild(textLabel(svg, 110, 352, o.a1, P.blue));
    },
    feast: function (svg, o) {
      ground(svg, 304);
      svg.appendChild(el("rect", { x: 110, y: 268, width: 260, height: 12, fill: P.inkSoft }));
      svg.appendChild(el("rect", { x: 126, y: 280, width: 10, height: 24, fill: P.inkSoft }));
      svg.appendChild(el("rect", { x: 344, y: 280, width: 10, height: 24, fill: P.inkSoft }));
      for (var i = 0; i < 3; i++) {
        svg.appendChild(el("path", { d: "M" + (160 + i * 70) + " 268 v-10 m-7 0 h14", stroke: P.gold, "stroke-width": 3, "stroke-linecap": "round" }));
      }
      svg.appendChild(flame(240, 262, 0.9));
      svg.appendChild(figure(90, 320, 90, P.ink, { name: o.a1 }));
      svg.appendChild(figure(392, 320, 90, P.ink, { flip: true, name: o.a2 }));
    },
    altar: function (svg, o) {
      stars(svg, 10); hills(svg, 246, 292);
      svg.appendChild(el("rect", { x: 206, y: 270, width: 68, height: 40, fill: P.inkSoft }));
      svg.appendChild(el("rect", { x: 196, y: 262, width: 88, height: 10, fill: P.inkSoft }));
      svg.appendChild(flame(240, 262, 2.1));
      svg.appendChild(figure(150, 322, 96, P.ink, { staff: true, name: o.a1, cls: "stg-bob" }));
      if (o.a2) svg.appendChild(figure(330, 324, 90, P.inkSoft, { flip: true, name: o.a2 }));
    },
    scroll: function (svg, o) {
      ground(svg, 312);
      var grp = g("stg-bob", "translate(240 190)");
      grp.appendChild(el("rect", { x: -120, y: -70, width: 240, height: 140, fill: "#efe3c6", stroke: P.inkSoft, "stroke-width": 2, rx: 6 }));
      grp.appendChild(el("rect", { x: -132, y: -74, width: 14, height: 148, fill: P.inkSoft, rx: 7 }));
      grp.appendChild(el("rect", { x: 118, y: -74, width: 14, height: 148, fill: P.inkSoft, rx: 7 }));
      for (var i = 0; i < 6; i++) grp.appendChild(el("path", { d: "M-100 " + (-48 + i * 19) + " h" + (200 - (i % 3) * 30), stroke: P.inkSoft, "stroke-width": 3, "stroke-linecap": "round" }));
      svg.appendChild(grp);
      svg.appendChild(flame(92, 316, 1.2));
      svg.appendChild(el("rect", { x: 84, y: 316, width: 16, height: 18, fill: P.inkSoft }));
    }
  };

  function textLabel(svg, x, y, text, color) {
    var t = el("text", { x: x, y: y, "text-anchor": "middle", "font-size": 11, "font-family": "Georgia,serif", fill: color || P.inkSoft, "letter-spacing": ".08em" });
    t.textContent = text;
    return t;
  }

  // ---- scene detection from prose ------------------------------------------
  var RULES = [
    ["duel", /goliath|single combat|champion|sling|giant/i],
    ["siege", /besieg|siege|burned|burnt|took the city|stronghold|wall|ziklag.*(burn|raid)|raid/i],
    ["battle", /battle|fought|slew|smote|war|armies|philistines.*(gather|drawn)|pursu|spoil|victory|archers/i],
    ["mourning", /mourn|wept|lament|died|death|buried|slain|torn|sackcloth|famine/i],
    ["altar", /altar|sacrific|offering|burnt offering|carmel.*fire|fire of the lord|vow/i],
    ["temple", /ark |temple|tabernacle|shiloh|priest|dedicat|house of the lord|worship/i],
    ["throne", /king|crown|anoint|reign|throne|coronat|made him king|succeed/i],
    ["wilderness", /wilderness|cave|hid|flee|fled|desert|mountain|en-?gedi|strongholds/i],
    ["feast", /feast|banquet|eat|bread|meal|new moon|table/i],
    ["travel", /went up|went down|journey|departed|came to|returned|sent|passed over|carried/i],
    ["shepherd", /shepherd|sheep|flock|pasture/i],
    ["camp", /camp|encamp|tent|night|watch/i]
  ];

  function detect(text) {
    var s = String(text || "");
    for (var i = 0; i < RULES.length; i++) if (RULES[i][1].test(s)) return RULES[i][0];
    return "scroll";
  }

  function render(elHost, type, opts) {
    ensureStyles();
    opts = opts || {};
    var box = elHost.querySelector(".stage-box");
    if (!box) {
      box = document.createElement("div");
      box.className = "stage-box";
      elHost.appendChild(box);
    }
    while (box.firstChild) box.removeChild(box.firstChild);
    var svg = el("svg", { viewBox: "0 0 480 360", preserveAspectRatio: "xMidYMax slice", "aria-hidden": "true" });
    box.appendChild(svg);
    var paint = SCENES[type] || SCENES.scroll;
    var actors = opts.actors || [];
    try {
      paint(svg, { a1: actors[0] || "", a2: actors[1] || "" });
    } catch (e) { /* a scene must never break the journey */ }
    if (opts.label) {
      var lab = document.createElement("div");
      lab.className = "stage-label";
      lab.textContent = opts.label;
      box.appendChild(lab);
    }
    return box;
  }

  window.Stage = { detect: detect, render: render, types: Object.keys(SCENES) };
})();
