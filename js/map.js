/* js/map.js — window.MapView (Dev 1)
   Interactive map of ancient Israel for the 1 Samuel story.
   Plain script global, no modules. Renders only inside #view-map.
   Reads window.LOCATIONS and window.JOURNEYS (may be absent — degrade gracefully). */

(function () {
  "use strict";

  // ---- shared projection (see ARCHITECTURE.md) ----------------------------
  var project = function (lat, lon) {
    return { x: (lon - 34.0) * 450, y: (33.0 - lat) * 540 };
  };

  var VIEW_W = 900;
  var VIEW_H = 1200;

  // Places beyond the frame (Tyre, Damascus, Horeb, Egypt, Sheba…) are pinned
  // to the frame edge; `arrow` points the way they really lie.
  var EDGE = 24;
  function projectLoc(loc) {
    var p = project(loc.lat, loc.lon);
    var x = Math.min(VIEW_W - EDGE, Math.max(EDGE, p.x));
    var y = Math.min(VIEW_H - EDGE, Math.max(EDGE, p.y));
    var dx = p.x - x, dy = p.y - y;
    var off = Math.abs(dx) > 6 || Math.abs(dy) > 6;
    var arrow = "";
    if (off) {
      var a = Math.atan2(dy, dx) * 180 / Math.PI; // 0 = east, 90 = south
      var dirs = ["\u2192", "\u2198", "\u2193", "\u2199", "\u2190", "\u2196", "\u2191", "\u2197"];
      arrow = dirs[((Math.round(a / 45) % 8) + 8) % 8];
    }
    return { x: x, y: y, off: off, arrow: arrow };
  }
  function markerLabel(loc) {
    var name = String(loc.name || loc.id || "");
    var p = projectLoc(loc);
    return p.off ? name + " " + p.arrow : name;
  }
  // The running trail walks both books of Kings in canonical order.
  var TRAIL_BOOKS = [
    { book: "kings1", global: "KINGS1", label: "1 Kings", key: "kings1.story.readChapters" },
    { book: "kings2", global: "KINGS2", label: "2 Kings", key: "kings2.story.readChapters" }
  ];
  var SVG_NS = "http://www.w3.org/2000/svg";

  // ---- module state -------------------------------------------------------
  var state = {
    inited: false,
    selectedLoc: null,     // location id or null
    selectedJourney: null, // journey id or null
    visibleJourneys: {},   // id -> bool
    chapterFilter: "",     // "" = all; "s1:N" = 1 Samuel N; "k1:N" = 1 Kings N
    showTrail: true,       // the 1 Kings reading trail overlay
    pendingFocus: null     // focus() called before init
  };

  var els = {}; // cached DOM references, rebuilt on every init()

  // ---- tiny DOM helpers ---------------------------------------------------
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

  function getLocations() {
    return Array.isArray(window.LOCATIONS) ? window.LOCATIONS : null;
  }
  function getJourneys() {
    return Array.isArray(window.JOURNEYS) ? window.JOURNEYS : [];
  }
  function locById(id) {
    var locs = getLocations();
    if (!locs) return null;
    for (var i = 0; i < locs.length; i++) if (locs[i] && locs[i].id === id) return locs[i];
    return null;
  }

  // ---- styles (scoped to #view-map, injected once per render) -------------
  var CSS = "" +
    "#view-map{--mv-water:#a9c8d6;--mv-water-deep:#8db4c6;--mv-land:#e8ddc3;--mv-land-hi:#ddcfae;" +
    "--mv-hill:rgba(139,110,66,.16);--mv-shore:#7fa3b5;--mv-river:#7fa3b5;--mv-region:rgba(92,74,44,.55);}" +
    "@media (prefers-color-scheme: dark){#view-map{--mv-water:#1d3a4d;--mv-water-deep:#16303f;" +
    "--mv-land:#2e2a20;--mv-land-hi:#37311f;--mv-hill:rgba(214,190,140,.10);--mv-shore:#3f6579;" +
    "--mv-river:#4f7d94;--mv-region:rgba(222,205,164,.45);}}" +

    "#view-map .mv-intro{margin:0 0 .6rem;color:var(--muted,#6b6152);font-style:italic;}" +
    "#view-map .mv-toolbar{display:flex;align-items:center;gap:.6rem;flex-wrap:wrap;margin-bottom:.8rem;}" +
    "#view-map .mv-toolbar label{color:var(--muted,#6b6152);font-size:.9rem;}" +
    "#view-map .mv-toolbar select{font:inherit;color:var(--ink,#2b2416);background:var(--panel,#f7f0df);" +
    "border:1px solid var(--line,#d8ccb2);border-radius:6px;padding:.3rem .5rem;}" +

    "#view-map .mv-layout{display:flex;gap:1rem;align-items:flex-start;flex-wrap:wrap;}" +
    "#view-map .mv-mapcol{flex:2 1 560px;min-width:300px;max-width:820px;}" +
    "#view-map .mv-sidecol{flex:1 1 250px;min-width:230px;display:flex;flex-direction:column;gap:1rem;}" +

    "#view-map svg.mv-svg{display:block;width:100%;height:auto;max-width:820px;" +
    "border:1px solid var(--line,#d8ccb2);border-radius:10px;background:var(--mv-land);" +
    "box-shadow:0 2px 10px rgba(0,0,0,.08);}" +

    "#view-map .mv-marker{cursor:pointer;}" +
    "#view-map .mv-marker circle.mv-dot{fill:var(--accent,#28466e);stroke:var(--panel,#f7f0df);" +
    "stroke-width:2;transition:r .12s ease;}" +
    "#view-map .mv-marker text{fill:var(--ink,#2b2416);font-family:Georgia,'Times New Roman',serif;" +
    "font-size:20px;letter-spacing:.01em;paint-order:stroke;stroke:var(--mv-land);stroke-width:4.5px;stroke-linejoin:round;" +
    "pointer-events:none;}" +
    "#view-map .mv-marker.mv-minor text{font-size:15px;}" +
    "#view-map .mv-marker:hover circle.mv-dot{fill:var(--gold,#b08a2e);}" +
    "#view-map .mv-marker.mv-selected circle.mv-dot{fill:var(--gold,#b08a2e);}" +
    "#view-map .mv-marker.mv-selected text{fill:var(--gold,#b08a2e);font-weight:bold;}" +
    "#view-map .mv-marker.mv-dim{opacity:.22;}" +
    "#view-map .mv-marker.mv-off circle.mv-dot{fill:var(--panel,#f7f0df);stroke:var(--accent,#28466e);stroke-width:2;stroke-dasharray:2 2;}" +
    "#view-map .mv-marker.mv-off text{font-style:italic;}" +
    "#view-map .mv-marker.mv-visited circle.mv-dot{fill:var(--gold,#b08a2e);}" +
    "#view-map .mv-marker.mv-here circle.mv-halo{visibility:visible;animation:mvPulse 1.6s ease-in-out infinite;}" +
    "@keyframes mvPulse{0%,100%{opacity:.25}50%{opacity:1}}" +
    "@media (prefers-reduced-motion: reduce){#view-map .mv-marker.mv-here circle.mv-halo{animation:none;}}" +
    "#view-map .mv-trail path{fill:none;stroke:var(--gold,#b08a2e);stroke-width:3.2;stroke-linecap:round;stroke-linejoin:round;opacity:.85;}" +
    "#view-map .mv-trailbox h3{display:flex;align-items:center;gap:.4rem;}" +
    "#view-map .mv-trailbar{height:6px;border-radius:3px;background:var(--line,#d8ccb2);overflow:hidden;margin:.3rem 0 .5rem;}" +
    "#view-map .mv-trailbar span{display:block;height:100%;background:var(--gold,#b08a2e);}" +
    "#view-map .mv-traillist{list-style:none;margin:.4rem 0 0;padding:0;max-height:15rem;overflow:auto;}" +
    "#view-map .mv-traillist li{font-size:.86rem;padding:.25rem 0;border-top:1px dashed var(--line,#d8ccb2);line-height:1.45;}" +
    "#view-map .mv-traillist .mv-stopname{font:inherit;border:0;background:transparent;padding:0;cursor:pointer;color:var(--accent,#28466e);}" +
    "#view-map .mv-traillist .mv-stopname:hover{color:var(--gold,#b08a2e);}" +
    "#view-map .mv-halo{fill:none;stroke:var(--gold,#b08a2e);stroke-width:2;opacity:.9;pointer-events:none;}" +

    "#view-map .mv-region-label{fill:var(--mv-region);font-family:Georgia,'Times New Roman',serif;" +
    "font-size:25px;letter-spacing:.4em;text-transform:uppercase;pointer-events:none;}" +
    "#view-map .mv-sea-label{fill:var(--mv-shore);font-family:Georgia,'Times New Roman',serif;" +
    "font-style:italic;font-size:21px;letter-spacing:.14em;pointer-events:none;}" +

    "#view-map .mv-stopbadge text{font-size:12px;font-family:Georgia,serif;font-weight:bold;" +
    "text-anchor:middle;pointer-events:none;transition:opacity .2s ease;}" +
    "#view-map .mv-hillstop-c{stop-color:#8b6e42;stop-opacity:.18;}" +
    "#view-map .mv-hillstop-m{stop-color:#8b6e42;stop-opacity:.10;}" +
    "#view-map .mv-hillstop-e{stop-color:#8b6e42;stop-opacity:0;}" +
    "@media (prefers-color-scheme: dark){" +
    "#view-map .mv-hillstop-c{stop-color:#d6be8c;stop-opacity:.11;}" +
    "#view-map .mv-hillstop-m{stop-color:#d6be8c;stop-opacity:.06;}" +
    "#view-map .mv-hillstop-e{stop-color:#d6be8c;stop-opacity:0;}}" +

    "#view-map .mv-panel{background:var(--panel,#f7f0df);border:1px solid var(--line,#d8ccb2);" +
    "border-radius:10px;padding:.9rem 1rem;}" +
    "#view-map .mv-panel h3{margin:0 0 .25rem;font-family:Georgia,'Times New Roman',serif;" +
    "color:var(--ink,#2b2416);}" +
    "#view-map .mv-panel .mv-modern{margin:0 0 .5rem;color:var(--muted,#6b6152);font-size:.85rem;font-style:italic;}" +
    "#view-map .mv-panel p{margin:.4rem 0;color:var(--ink,#2b2416);font-size:.95rem;line-height:1.5;}" +
    "#view-map .mv-panel .mv-placeholder{color:var(--muted,#6b6152);font-style:italic;}" +
    "#view-map .mv-chips{display:flex;flex-wrap:wrap;gap:.35rem;margin-top:.6rem;}" +
    "#view-map .mv-chip{font:inherit;font-size:.8rem;cursor:pointer;border:1px solid var(--line,#d8ccb2);" +
    "background:transparent;color:var(--accent,#28466e);border-radius:999px;padding:.15rem .6rem;}" +
    "#view-map .mv-chip:hover{background:var(--accent,#28466e);color:var(--panel,#f7f0df);}" +
    "#view-map .mv-close{float:right;font:inherit;border:0;background:transparent;cursor:pointer;" +
    "color:var(--muted,#6b6152);font-size:1rem;line-height:1;padding:.1rem .3rem;}" +

    "#view-map .mv-legend h3{margin:0 0 .5rem;font-family:Georgia,'Times New Roman',serif;" +
    "font-size:1rem;color:var(--ink,#2b2416);}" +
    "#view-map .mv-legend-row{display:flex;align-items:center;gap:.5rem;padding:.25rem 0;}" +
    "#view-map .mv-legend-row input{cursor:pointer;}" +
    "#view-map .mv-swatch{display:inline-block;width:1.6em;height:.5em;border-radius:3px;flex:none;}" +
    "#view-map .mv-legend-title{font:inherit;border:0;background:transparent;cursor:pointer;" +
    "color:var(--ink,#2b2416);text-align:left;padding:0;font-size:.92rem;}" +
    "#view-map .mv-legend-title:hover{color:var(--gold,#b08a2e);}" +
    "#view-map .mv-legend-row.mv-active .mv-legend-title{color:var(--gold,#b08a2e);font-weight:bold;}" +

    "#view-map ol.mv-stops{margin:.5rem 0 0;padding-left:1.3rem;}" +
    "#view-map ol.mv-stops li{margin:.35rem 0;font-size:.92rem;color:var(--ink,#2b2416);line-height:1.45;}" +
    "#view-map ol.mv-stops .mv-stopname{font:inherit;border:0;background:transparent;padding:0;cursor:pointer;" +
    "color:var(--accent,#28466e);font-weight:bold;}" +
    "#view-map ol.mv-stops .mv-stopname:hover{color:var(--gold,#b08a2e);}" +
    "#view-map ol.mv-stops .mv-stopnote{color:var(--muted,#6b6152);}" +

    // --- pan & zoom chrome ---
    "#view-map .mv-mapwrap{position:relative;}" +
    "#view-map svg.mv-svg{touch-action:pan-y;cursor:grab;user-select:none;-webkit-user-select:none;}" +
    "#view-map svg.mv-svg:active{cursor:grabbing;}" +
    "#view-map .mv-zoomctl{position:absolute;bottom:14px;right:10px;display:flex;flex-direction:column;gap:6px;z-index:3;}" +
    "#view-map .mv-zbtn{width:38px;height:38px;border-radius:10px;border:1px solid var(--line,#d8ccb2);" +
    "background:var(--panel,#f7f0df);color:var(--ink,#2b2416);font-size:1.15rem;line-height:1;cursor:pointer;" +
    "box-shadow:0 1px 4px rgba(0,0,0,.14);}" +
    "#view-map .mv-zbtn:hover{background:var(--accent,#28466e);color:var(--panel,#f7f0df);}" +
    "#view-map .mv-views{display:flex;flex-wrap:wrap;gap:.35rem;margin:0 0 .55rem;}" +
    "#view-map .mv-viewchip{font:inherit;font-size:.8rem;cursor:pointer;border:1px solid var(--line,#d8ccb2);" +
    "background:var(--panel,#f7f0df);color:var(--accent,#28466e);border-radius:999px;padding:.2rem .65rem;}" +
    "#view-map .mv-viewchip:hover{background:var(--accent,#28466e);color:var(--panel,#f7f0df);}" +
    "#view-map .mv-hint{margin:.4rem 0 0;font-size:.78rem;color:var(--muted,#6b6152);font-style:italic;}" +

    // --- zoom-tiered label visibility (data-level on the svg) ---
    "#view-map .mv-marker text{transition:opacity .25s ease;}" +
    "#view-map .mv-region-label,#view-map .mv-sea-label{transition:opacity .25s ease;}" +
    "#view-map svg[data-level='1'] .mv-marker.mv-t2 text," +
    "#view-map svg[data-level='1'] .mv-marker.mv-minor text{opacity:0;}" +
    "#view-map svg[data-level='2'] .mv-marker.mv-minor text{opacity:0;}" +
    "#view-map .mv-marker.mv-selected text{opacity:1 !important;}" +

    // --- map key ---
    "#view-map .mv-key .mv-key-row{display:flex;align-items:center;gap:.55rem;padding:.24rem 0;" +
    "font-size:.85rem;color:var(--ink,#2b2416);}" +
    "#view-map .mv-key svg{flex:none;}" +
    "#view-map .mv-key .mv-key-note{font-style:italic;color:var(--muted,#6b6152);}";

  // ---- geography ----------------------------------------------------------
  // All shapes are computed with project(lat, lon) so markers land correctly.

  function pts(pairs) { // [[lat,lon],...] -> "x,y x,y ..."
    var out = [];
    for (var i = 0; i < pairs.length; i++) {
      var p = project(pairs[i][0], pairs[i][1]);
      out.push(p.x.toFixed(1) + "," + p.y.toFixed(1));
    }
    return out.join(" ");
  }
  function pathThrough(pairs, close) { // smooth-ish path through projected latlon points
    var d = "";
    for (var i = 0; i < pairs.length; i++) {
      var p = project(pairs[i][0], pairs[i][1]);
      d += (i === 0 ? "M" : "L") + p.x.toFixed(1) + " " + p.y.toFixed(1);
    }
    if (close) d += "Z";
    return d;
  }

  function buildGeography(svg) {
    // Mediterranean coastline, north to south (approx real coords).
    var coast = [
      [33.00, 35.11], [32.92, 35.07], [32.83, 34.96], [32.70, 34.94],
      [32.50, 34.89], [32.30, 34.84], [32.05, 34.74], [31.90, 34.69],
      [31.80, 34.63], [31.66, 34.55], [31.52, 34.46], [31.35, 34.32],
      [31.10, 34.17], [30.80, 34.05]
    ];
    // Sea polygon: coastline plus the west edge of the viewBox.
    var seaD = pathThrough(coast, false);
    var last = project(coast[coast.length - 1][0], coast[coast.length - 1][1]);
    seaD += "L0 " + last.y.toFixed(1) + " L0 0 Z";
    var sea = svgEl("path", { d: seaD, fill: "var(--mv-water)", stroke: "var(--mv-shore)", "stroke-width": "2.2" });
    svg.appendChild(sea);

    // A softer inner-water band for depth along the west edge.
    var deep = svgEl("path", {
      d: "M0 0 L" + project(33.0, 34.75).x.toFixed(1) + " 0 " +
         "C " + pts([[32.4, 34.55], [31.6, 34.2], [30.8, 34.02]]) +
         " L0 " + VIEW_H + " Z",
      fill: "var(--mv-water-deep)", opacity: "0.45", "pointer-events": "none"
    });
    svg.appendChild(deep);

    // Hill-country shading: feathered radial washes along the central ridge
    // and Gilead — a gradient that fades to nothing, so no hard oval edges
    // show at any zoom.
    var defs = svgEl("defs");
    var grad = svgEl("radialGradient", { id: "mv-hillgrad" });
    grad.appendChild(svgEl("stop", { offset: "0%", "class": "mv-hillstop-c" }));
    grad.appendChild(svgEl("stop", { offset: "70%", "class": "mv-hillstop-m" }));
    grad.appendChild(svgEl("stop", { offset: "100%", "class": "mv-hillstop-e" }));
    defs.appendChild(grad);
    svg.appendChild(defs);
    var hills = [
      [32.55, 35.30, 52, 108], [32.15, 35.25, 58, 128], [31.75, 35.18, 56, 118],
      [31.40, 35.10, 54, 112], [31.05, 34.95, 50, 95],
      [32.45, 35.85, 44, 106], [32.00, 35.80, 44, 106] // Gilead, east of Jordan
    ];
    for (var h = 0; h < hills.length; h++) {
      var c = project(hills[h][0], hills[h][1]);
      svg.appendChild(svgEl("ellipse", {
        cx: c.x.toFixed(1), cy: c.y.toFixed(1), rx: hills[h][2], ry: hills[h][3],
        fill: "url(#mv-hillgrad)", "pointer-events": "none"
      }));
    }

    // Sea of Galilee (~32.8 N, 35.59 E): small pear-shaped lake.
    var galilee = svgEl("path", {
      d: pathThrough([
        [32.89, 35.58], [32.86, 35.63], [32.80, 35.64], [32.73, 35.61],
        [32.71, 35.57], [32.76, 35.545], [32.83, 35.55]
      ], true),
      fill: "var(--mv-water)", stroke: "var(--mv-shore)", "stroke-width": "1.8"
    });
    svg.appendChild(galilee);

    // Jordan River: from Galilee's south tip down to the Dead Sea's north tip.
    var jordan = svgEl("path", {
      d: pathThrough([
        [32.71, 35.585], [32.55, 35.55], [32.40, 35.57], [32.20, 35.55],
        [32.00, 35.53], [31.87, 35.55], [31.76, 35.53]
      ], false),
      fill: "none", stroke: "var(--mv-river)", "stroke-width": "3.2",
      "stroke-linecap": "round", "stroke-dasharray": "none"
    });
    svg.appendChild(jordan);

    // Dead Sea (~31.1–31.76 N, ~35.5 E).
    var deadSea = svgEl("path", {
      d: pathThrough([
        [31.76, 35.50], [31.70, 35.56], [31.50, 35.57], [31.35, 35.55],
        [31.20, 35.56], [31.10, 35.52], [31.15, 35.46], [31.35, 35.43],
        [31.55, 35.44], [31.70, 35.45]
      ], true),
      fill: "var(--mv-water)", stroke: "var(--mv-shore)", "stroke-width": "1.8"
    });
    svg.appendChild(deadSea);

    // Water labels.
    var med = project(32.35, 34.35);
    var medLabel = svgEl("text", {
      x: med.x, y: med.y, "class": "mv-sea-label", "text-anchor": "middle",
      transform: "rotate(-72 " + med.x + " " + med.y + ")"
    }, "The Great Sea");
    svg.appendChild(medLabel);
    var ds = project(31.42, 35.50);
    svg.appendChild(svgEl("text", {
      x: ds.x, y: ds.y, "class": "mv-sea-label", "text-anchor": "middle", "font-size": "16",
      transform: "rotate(-80 " + ds.x + " " + ds.y + ")"
    }, "Salt Sea"));

    // Region labels.
    var regions = [
      ["PHILISTIA", 31.55, 34.62, -18],
      ["JUDAH", 31.35, 35.05, 0],
      ["ISRAEL", 32.25, 35.15, 0],
      ["EPHRAIM", 32.02, 35.12, 0],
      ["GILEAD", 32.25, 35.80, 0]
    ];
    for (var r = 0; r < regions.length; r++) {
      var rp = project(regions[r][1], regions[r][2]);
      var attrs = { x: rp.x, y: rp.y, "class": "mv-region-label", "text-anchor": "middle" };
      if (regions[r][0] === "EPHRAIM") attrs["font-size"] = "18";
      if (regions[r][3]) attrs.transform = "rotate(" + regions[r][3] + " " + rp.x + " " + rp.y + ")";
      svg.appendChild(svgEl("text", attrs, regions[r][0]));
    }
  }

  // ---- marker label placement (avoid collisions) --------------------------
  // Hand-tuned placements for the dense Benjamin plateau cluster, where the
  // dots sit too close for any automatic placement to succeed.
  // Minor towns take the smaller atlas type so the Benjamin plateau breathes.
  var MINOR_TOWNS = { geba: 1, nob: 1, bahurim: 1, michmash: 1, mizpah: 1, gibeah: 1 };

  // Anchor places whose names show even when the map is small (a phone at
  // full zoom-out). Everything else labels in as the viewer zooms closer.
  var TIER1 = {
    shiloh: 1, ramah: 1, jerusalem: 1, bethlehem: 1, hebron: 1, gath: 1,
    ziklag: 1, beersheba: 1, "beth-shan": 1, gilgal: 1, mahanaim: 1,
    aphek: 1, "en-gedi": 1, geshur: 1, rabbah: 1
  };

  var LABEL_OVERRIDES = {
    bethel: { dx: 0, dy: -16, anchor: "middle" },
    mizpah: { dx: -14, dy: 2, anchor: "end" },
    michmash: { dx: 15, dy: -14, anchor: "start" },
    geba: { dx: 17, dy: 3, anchor: "start" },
    gibeon: { dx: -20, dy: 6, anchor: "end" },
    ramah: { dx: 18, dy: 17, anchor: "start" },
    gibeah: { dx: -16, dy: 8, anchor: "end" },
    nob: { dx: 0, dy: 24, anchor: "middle" },
    bahurim: { dx: 17, dy: 4, anchor: "start" },
    jerusalem: { dx: 20, dy: 16, anchor: "start" },
    "kiriath-jearim": { dx: -15, dy: 20, anchor: "end" },
    "beth-shemesh": { dx: -15, dy: 12, anchor: "end" }
  };

  function placeLabels(locs, s, isVisible) {
    // Returns map id -> {dx, dy, anchor}. Greedy: try candidates, keep first
    // whose estimated text box doesn't hit an already placed box or a marker.
    // s scales every box and offset with the current label size (1 = the
    // 20px base design); isVisible(loc) filters labels that are hidden at
    // the current zoom tier so they neither claim space nor block others.
    s = s || 1;
    if (!isVisible) isVisible = function () { return true; };
    var placed = [];
    var out = {};
    var candidates = [
      { dx: 15, dy: 6, anchor: "start" },
      { dx: -15, dy: 6, anchor: "end" },
      { dx: 0, dy: -16, anchor: "middle" },
      { dx: 0, dy: 27, anchor: "middle" },
      { dx: 18, dy: -11, anchor: "start" },
      { dx: -18, dy: 24, anchor: "end" },
      // Farther fallbacks for dense clusters (e.g. the Benjamin plateau).
      { dx: 25, dy: 6, anchor: "start" },
      { dx: -25, dy: 6, anchor: "end" },
      { dx: 23, dy: 24, anchor: "start" },
      { dx: -23, dy: -11, anchor: "end" },
      { dx: 0, dy: -29, anchor: "middle" },
      { dx: 0, dy: 41, anchor: "middle" },
      { dx: 35, dy: 6, anchor: "start" },
      { dx: -35, dy: 6, anchor: "end" }
    ];
    function scaled(c) { return { dx: c.dx * s, dy: c.dy * s, anchor: c.anchor }; }
    function boxFor(p, name, c, id) {
      var minor = id && MINOR_TOWNS[id];
      var w = Math.max((minor ? 34 : 44) * s, name.length * (minor ? 7.8 : 10.4) * s);
      var h = (minor ? 16 : 20) * s;
      var x = p.x + c.dx;
      if (c.anchor === "end") x -= w;
      else if (c.anchor === "middle") x -= w / 2;
      var y = p.y + c.dy - h + 3 * s;
      return { x: x, y: y, w: w, h: h };
    }
    function hits(b) {
      for (var i = 0; i < placed.length; i++) {
        var o = placed[i];
        if (b.x < o.x + o.w && o.x < b.x + b.w && b.y < o.y + o.h && o.y < b.y + b.h) return true;
      }
      return false;
    }
    // Reserve every marker dot up front so no label can sit on any dot,
    // including dots of markers placed later in the loop.
    for (var d = 0; d < locs.length; d++) {
      var ld = locs[d];
      if (!ld || typeof ld.lat !== "number" || typeof ld.lon !== "number") continue;
      var pd = projectLoc(ld);
      var rr = 9 * s;
      placed.push({ x: pd.x - rr, y: pd.y - rr, w: rr * 2, h: rr * 2 });
    }
    // Hand-tuned overrides claim their spots first.
    for (var o = 0; o < locs.length; o++) {
      var lo = locs[o];
      if (!lo || !LABEL_OVERRIDES[lo.id] || !isVisible(lo)) continue;
      if (typeof lo.lat !== "number" || typeof lo.lon !== "number") continue;
      out[lo.id] = scaled(LABEL_OVERRIDES[lo.id]);
      placed.push(boxFor(projectLoc(lo), markerLabel(lo), out[lo.id], lo.id));
    }
    // Place top-to-bottom for stable results.
    var sorted = locs.slice().sort(function (a, b) {
      var ya = typeof a.lat === "number" ? projectLoc(a).y : 0;
      var yb = typeof b.lat === "number" ? projectLoc(b).y : 0;
      return ya - yb;
    });
    for (var i = 0; i < sorted.length; i++) {
      var loc = sorted[i];
      if (typeof loc.lat !== "number" || typeof loc.lon !== "number") continue;
      if (out[loc.id] || !isVisible(loc)) continue;
      var p = projectLoc(loc);
      var chosen = scaled(candidates[0]), b = null;
      for (var c = 0; c < candidates.length; c++) {
        var sc = scaled(candidates[c]);
        b = boxFor(p, markerLabel(loc), sc, loc.id);
        if (!hits(b) && b.x >= 12 && b.x + b.w <= VIEW_W - 12 && b.y >= 2) { chosen = sc; break; }
      }
      placed.push(boxFor(p, markerLabel(loc), chosen, loc.id));
      out[loc.id] = chosen;
    }
    return out;
  }

  // ---- markers ------------------------------------------------------------
  function buildMarkers(layer, locs) {
    els.markerRefs = {};
    for (var i = 0; i < locs.length; i++) {
      (function (loc) {
        if (!loc || typeof loc.lat !== "number" || typeof loc.lon !== "number") return;
        var p = projectLoc(loc);
        var minor = !!MINOR_TOWNS[loc.id];
        var tier = minor ? " mv-minor" : (TIER1[loc.id] ? " mv-t1" : " mv-t2");
        var g = svgEl("g", { "class": "mv-marker" + tier + (p.off ? " mv-off" : ""), "data-loc": loc.id, tabindex: "0", role: "button" });
        g.appendChild(svgEl("title", null, String(loc.name || loc.id)));
        var halo = svgEl("circle", { "class": "mv-halo", cx: p.x, cy: p.y, r: 14, visibility: "hidden" });
        g.appendChild(halo);
        var dot = svgEl("circle", { "class": "mv-dot", cx: p.x, cy: p.y, r: 7 });
        g.appendChild(dot);
        var text = svgEl("text", {
          x: p.x + 15, y: p.y + 6, "text-anchor": "start"
        }, markerLabel(loc));
        g.appendChild(text);
        g.addEventListener("click", function () { selectLocation(loc.id); });
        g.addEventListener("keydown", function (ev) {
          if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); selectLocation(loc.id); }
        });
        layer.appendChild(g);
        els.markerRefs[loc.id] = { p: p, minor: minor, text: text, dot: dot, halo: halo };
      })(locs[i]);
    }
  }

  function relayoutLabels() {
    var locs = getLocations();
    if (!locs || !els.markerRefs) return;
    var s = state.labelScale || 1;
    var lvl = state.labelLevel || 2;
    function vis(loc) {
      if (MINOR_TOWNS[loc.id]) return lvl >= 3;
      if (TIER1[loc.id]) return true;
      return lvl >= 2;
    }
    var pos = placeLabels(locs, s, vis);
    for (var id in els.markerRefs) {
      if (!Object.prototype.hasOwnProperty.call(els.markerRefs, id)) continue;
      var ref = els.markerRefs[id];
      var lp = pos[id] || { dx: 15 * s, dy: 6 * s, anchor: "start" };
      ref.text.setAttribute("x", (ref.p.x + lp.dx).toFixed(1));
      ref.text.setAttribute("y", (ref.p.y + lp.dy).toFixed(1));
      ref.text.setAttribute("text-anchor", lp.anchor);
    }
  }

  // ---- journeys -----------------------------------------------------------
  function journeyStops(j) { // resolve stop loc ids -> [{loc, note, point, name}]
    var out = [];
    if (!j || !Array.isArray(j.stops)) return out;
    for (var i = 0; i < j.stops.length; i++) {
      var s = j.stops[i] || {};
      var loc = locById(s.loc);
      if (loc && typeof loc.lat === "number" && typeof loc.lon === "number") {
        out.push({ loc: s.loc, note: s.note || "", name: loc.name || s.loc, point: projectLoc(loc) });
      }
    }
    return out;
  }

  function buildJourneyLayer(layer, journeys, stopLayer) {
    for (var i = 0; i < journeys.length; i++) {
      var j = journeys[i];
      if (!j || !j.id) continue;
      var stops = journeyStops(j);
      var g = svgEl("g", { "class": "mv-journey", "data-journey": j.id });
      // Stop badges live in their own layer ABOVE the city markers, so the
      // milestone number is never swallowed by the dot underneath it.
      var sg = svgEl("g", { "class": "mv-journey-stops", "data-journey": j.id, "pointer-events": "none" });
      var color = j.color || "var(--accent, #28466e)";
      var d = "";
      var arrows = [];
      for (var s = 0; s < stops.length; s++) {
        var p = stops[s].point;
        if (s === 0) {
          d += "M" + p.x.toFixed(1) + " " + p.y.toFixed(1);
        } else {
          var prev = stops[s - 1].point;
          // Quadratic bezier: control at midpoint, nudged perpendicular for a
          // gentle arc; alternate the side per segment so routes weave nicely.
          var mx = (prev.x + p.x) / 2, my = (prev.y + p.y) / 2;
          var dx = p.x - prev.x, dy = p.y - prev.y;
          var len = Math.sqrt(dx * dx + dy * dy) || 1;
          var side = (s % 2 === 0) ? 1 : -1;
          var bow = Math.min(26, len * 0.22) * side;
          var cx = mx + (-dy / len) * bow, cy = my + (dx / len) * bow;
          d += " Q" + cx.toFixed(1) + " " + cy.toFixed(1) + " " + p.x.toFixed(1) + " " + p.y.toFixed(1);
          // Arrow at the curve's midpoint; tangent of a quadratic at t=.5 is p2-p0.
          var ax = 0.25 * prev.x + 0.5 * cx + 0.25 * p.x;
          var ay = 0.25 * prev.y + 0.5 * cy + 0.25 * p.y;
          arrows.push({ x: ax, y: ay, angle: Math.atan2(dy, dx) * 180 / Math.PI });
        }
      }
      if (d) {
        g.appendChild(svgEl("path", {
          d: d, fill: "none", stroke: color, "stroke-width": "3.4",
          "stroke-linecap": "round", "stroke-dasharray": "7 4", opacity: "0.9"
        }));
        for (var a = 0; a < arrows.length; a++) {
          g.appendChild(svgEl("path", {
            d: "M-5 -3.4 L4 0 L-5 3.4 Z", fill: color,
            transform: "translate(" + arrows[a].x.toFixed(1) + " " + arrows[a].y.toFixed(1) +
                       ") rotate(" + arrows[a].angle.toFixed(1) + ")"
          }));
        }
        for (var b = 0; b < stops.length; b++) {
          var bp = stops[b].point;
          var badge = svgEl("g", { "class": "mv-stopbadge", "pointer-events": "none" });
          // A milestone, not a button: parchment disc, journey-colored ring,
          // journey-colored number (inline styles beat the sheet, so the
          // colors survive the dynamic re-sizing).
          var bc = svgEl("circle", { cx: bp.x, cy: bp.y, r: 10.5 });
          bc.style.fill = "var(--panel, #f7f0df)";
          bc.style.stroke = color;
          bc.style.strokeWidth = "2px";
          badge.appendChild(bc);
          var bt = svgEl("text", { x: bp.x, y: bp.y + 4, "data-cy": bp.y }, String(b + 1));
          bt.style.fill = color;
          badge.appendChild(bt);
          sg.appendChild(badge);
        }
      }
      g.style.display = state.visibleJourneys[j.id] ? "" : "none";
      sg.style.display = g.style.display;
      layer.appendChild(g);
      if (stopLayer) stopLayer.appendChild(sg);
    }
  }

  function updateJourneyVisibility() {
    if (!els.journeyLayer) return;
    var scope = els.svg || els.journeyLayer;
    var groups = scope.querySelectorAll(".mv-journey, .mv-journey-stops");
    for (var i = 0; i < groups.length; i++) {
      var id = groups[i].getAttribute("data-journey");
      groups[i].style.display = state.visibleJourneys[id] ? "" : "none";
    }
    var rows = els.legend ? els.legend.querySelectorAll(".mv-legend-row") : [];
    for (var r = 0; r < rows.length; r++) {
      var rid = rows[r].getAttribute("data-journey");
      var cb = rows[r].querySelector("input");
      if (cb) cb.checked = !!state.visibleJourneys[rid];
      if (rid === state.selectedJourney) rows[r].classList.add("mv-active");
      else rows[r].classList.remove("mv-active");
    }
  }

  // ---- legend -------------------------------------------------------------
  function buildLegend(container, journeys) {
    var box = el("div", { "class": "mv-panel mv-legend" });
    box.appendChild(el("h3", null, "Journeys"));
    if (!journeys.length) {
      box.appendChild(el("p", { "class": "mv-placeholder" }, "Journey routes will appear here once the data is loaded."));
      container.appendChild(box);
      return box;
    }
    for (var i = 0; i < journeys.length; i++) {
      (function (j) {
        if (!j || !j.id) return;
        var row = el("div", { "class": "mv-legend-row", "data-journey": j.id });
        var cb = el("input", { type: "checkbox", id: "mv-jt-" + j.id, "aria-label": "Show " + (j.title || j.id) });
        cb.checked = !!state.visibleJourneys[j.id];
        cb.addEventListener("change", function () {
          state.visibleJourneys[j.id] = cb.checked;
          if (cb.checked) selectJourney(j.id);
          else if (state.selectedJourney === j.id) { state.selectedJourney = null; renderPanel(); }
          updateJourneyVisibility();
        });
        var sw = el("span", { "class": "mv-swatch" });
        sw.style.background = j.color || "var(--accent, #28466e)";
        var title = el("button", { "class": "mv-legend-title", type: "button" }, j.title || j.id);
        title.addEventListener("click", function () {
          state.visibleJourneys[j.id] = true;
          selectJourney(j.id);
          updateJourneyVisibility();
        });
        row.appendChild(cb);
        row.appendChild(sw);
        row.appendChild(title);
        box.appendChild(row);
      })(journeys[i]);
    }
    container.appendChild(box);
    return box;
  }

  // ---- selection + side panel --------------------------------------------
  function selectLocation(locId) {
    state.selectedLoc = locId;
    state.selectedJourney = null;
    updateMarkerClasses();
    updateJourneyVisibility();
    renderPanel();
  }

  function selectJourney(jid) {
    state.selectedJourney = jid;
    state.selectedLoc = null;
    updateMarkerClasses();
    updateJourneyVisibility();
    renderPanel();
  }

  function updateMarkerClasses() {
    if (!els.markerLayer) return;
    var markers = els.markerLayer.querySelectorAll(".mv-marker");
    for (var i = 0; i < markers.length; i++) {
      var m = markers[i];
      var id = m.getAttribute("data-loc");
      var loc = locById(id);
      var selected = id === state.selectedLoc;
      if (selected) m.classList.add("mv-selected"); else m.classList.remove("mv-selected");
      var halo = m.querySelector(".mv-halo");
      if (halo) halo.setAttribute("visibility", selected ? "visible" : "hidden");
      // Chapter filter dimming (selected marker never dims).
      var dim = false;
      if (state.chapterFilter && !selected) {
        var fparts = state.chapterFilter.split(":");
        var field = fparts[0] === "k1" ? "kings1" : fparts[0] === "k2" ? "kings2" : "chapters";
        var chs = loc && Array.isArray(loc[field]) ? loc[field] : [];
        dim = chs.indexOf(parseInt(fparts[1], 10)) === -1;
      }
      if (dim) m.classList.add("mv-dim"); else m.classList.remove("mv-dim");
    }
  }

  var BOOK_NAMES = { samuel1: "1 Samuel", samuel2: "2 Samuel", kings1: "1 Kings", kings2: "2 Kings" };
  function chapterChips(chapters, book, wrapIn) {
    var wrap = wrapIn || el("div", { "class": "mv-chips" });
    if (!Array.isArray(chapters)) return wrap;
    var bookName = BOOK_NAMES[book] || "1 Samuel";
    for (var i = 0; i < chapters.length; i++) {
      (function (n) {
        if (typeof n !== "number") return;
        var chip = el("button", { "class": "mv-chip", type: "button", title: "Read " + bookName + " " + n },
          (book === "kings1" ? "1 Kgs " : book === "kings2" ? "2 Kgs " : "Ch. ") + n);
        chip.addEventListener("click", function () {
          if (window.App && typeof window.App.goToChapter === "function") window.App.goToChapter(n, book);
        });
        wrap.appendChild(chip);
      })(chapters[i]);
    }
    return wrap;
  }

  function renderPanel() {
    if (!els.panel) return;
    clear(els.panel);
    var panel = els.panel;

    if (state.selectedLoc) {
      var loc = locById(state.selectedLoc);
      if (!loc) { state.selectedLoc = null; }
      else {
        var closeBtn = el("button", { "class": "mv-close", type: "button", "aria-label": "Close details" }, "✕");
        closeBtn.addEventListener("click", function () { selectLocation(null); });
        panel.appendChild(closeBtn);
        panel.appendChild(el("h3", null, loc.name || loc.id));
        if (loc.modernName) panel.appendChild(el("p", { "class": "mv-modern" }, "modern: " + loc.modernName));
        if (loc.description) panel.appendChild(el("p", null, loc.description));
        var s1 = Array.isArray(loc.chapters) && loc.chapters.length;
        var k1 = Array.isArray(loc.kings1) && loc.kings1.length;
        var k2 = Array.isArray(loc.kings2) && loc.kings2.length;
        if (s1 || k1 || k2) {
          panel.appendChild(el("p", { "class": "mv-modern" }, "Appears in:"));
          var chipWrap = chapterChips(s1 ? loc.chapters : [], "samuel1");
          if (k1) chapterChips(loc.kings1, "kings1", chipWrap);
          if (k2) chapterChips(loc.kings2, "kings2", chipWrap);
          panel.appendChild(chipWrap);
        }
        return;
      }
    }

    if (state.selectedJourney) {
      var journeys = getJourneys();
      var j = null;
      for (var i = 0; i < journeys.length; i++) if (journeys[i] && journeys[i].id === state.selectedJourney) { j = journeys[i]; break; }
      if (j) {
        var closeBtn2 = el("button", { "class": "mv-close", type: "button", "aria-label": "Close details" }, "✕");
        closeBtn2.addEventListener("click", function () { state.selectedJourney = null; updateJourneyVisibility(); renderPanel(); });
        panel.appendChild(closeBtn2);
        var h = el("h3", null, j.title || j.id);
        var dotSw = el("span", { "class": "mv-swatch" });
        dotSw.style.background = j.color || "var(--accent, #28466e)";
        dotSw.style.marginRight = ".45rem";
        h.insertBefore(dotSw, h.firstChild);
        panel.appendChild(h);
        if (j.description) panel.appendChild(el("p", null, j.description));
        var stops = Array.isArray(j.stops) ? j.stops : [];
        if (stops.length) {
          var ol = el("ol", { "class": "mv-stops" });
          for (var s = 0; s < stops.length; s++) {
            (function (stop) {
              var li = el("li");
              var loc2 = locById(stop && stop.loc);
              var nameBtn = el("button", { "class": "mv-stopname", type: "button" }, (loc2 && loc2.name) || (stop && stop.loc) || "?");
              nameBtn.addEventListener("click", function () { if (loc2) selectLocation(loc2.id); });
              li.appendChild(nameBtn);
              if (stop && stop.note) {
                li.appendChild(document.createTextNode(" — "));
                var noteSpan = el("span", { "class": "mv-stopnote" }, stop.note);
                li.appendChild(noteSpan);
              }
              ol.appendChild(li);
            })(stops[s]);
          }
          panel.appendChild(ol);
        }
        if (Array.isArray(j.chapters) && j.chapters.length) {
          panel.appendChild(el("p", { "class": "mv-modern" }, "Chapters:"));
          panel.appendChild(chapterChips(j.chapters, j.book));
        }
        return;
      }
    }

    panel.appendChild(el("h3", null, "Explore the map"));
    panel.appendChild(el("p", { "class": "mv-placeholder" },
      "Click a place marker to learn about it, or toggle a journey in the legend to trace the route."));
  }

  // ---- pan & zoom ---------------------------------------------------------
  // The whole drawn world sits in one <g class="mv-world"> whose transform is
  // translate(tx ty) scale(k). Labels, dots, badges and route widths are
  // re-sized inversely on every zoom change so they hold a constant,
  // readable size on screen while the land itself grows — and more town
  // names fade in the closer the viewer comes.
  var KMAX = 7;
  var view = { k: 1, tx: 0, ty: 0 };
  var dynPending = false;
  var lastLayoutKey = "";
  var anim = null;

  function clampView() {
    view.k = Math.max(1, Math.min(KMAX, view.k));
    view.tx = Math.max(VIEW_W * (1 - view.k), Math.min(0, view.tx));
    view.ty = Math.max(VIEW_H * (1 - view.k), Math.min(0, view.ty));
  }

  function applyView() {
    if (!els.world) return;
    clampView();
    els.world.setAttribute("transform",
      "translate(" + view.tx.toFixed(2) + " " + view.ty.toFixed(2) + ") scale(" + view.k.toFixed(4) + ")");
    if (!dynPending) {
      dynPending = true;
      window.requestAnimationFrame(function () { dynPending = false; updateDynamics(); });
    }
  }

  function displayWidth() {
    var w = 0;
    if (els.svg) { try { w = els.svg.getBoundingClientRect().width; } catch (e) { /* older browsers */ } }
    if (w > 10) return w;
    // Map tab hidden: estimate from the window so first paint is close.
    var iw = window.innerWidth || 900;
    return iw < 860 ? Math.max(260, iw - 48) : Math.min(703, iw * 0.55);
  }

  function updateDynamics() {
    if (!els.svg || !els.markerRefs) return;
    var e = displayWidth() / VIEW_W * view.k; // effective on-screen scale
    var f = Math.max(4.5, Math.min(27, 15 / e));        // major label font (viewBox px)
    var fm = Math.max(3.6, f * 0.72);                   // minor label font
    var dot = Math.max(1.6, Math.min(10, 5.5 / e));
    var badge = Math.max(2.4, Math.min(13, 8 / e));
    var route = Math.max(0.9, Math.min(3.6, 2.6 / e));
    var lvl = e >= 1.02 ? 3 : (e >= 0.58 ? 2 : 1);
    state.labelScale = f / 20;
    state.labelLevel = lvl;
    els.svg.setAttribute("data-level", String(lvl));

    for (var id in els.markerRefs) {
      if (!Object.prototype.hasOwnProperty.call(els.markerRefs, id)) continue;
      var ref = els.markerRefs[id];
      var fs = ref.minor ? fm : f;
      ref.text.style.fontSize = fs.toFixed(2) + "px";
      ref.text.style.strokeWidth = (fs * 0.23).toFixed(2) + "px";
      ref.dot.setAttribute("r", dot.toFixed(2));
      ref.dot.style.strokeWidth = Math.max(0.5, dot * 0.22).toFixed(2) + "px";
      ref.halo.setAttribute("r", (dot + 7 / Math.sqrt(view.k)).toFixed(2));
      ref.halo.style.strokeWidth = Math.max(0.8, dot * 0.3).toFixed(2) + "px";
    }
    if (els.journeyLayer) {
      var lines = els.journeyLayer.querySelectorAll("path[fill='none']");
      for (var i = 0; i < lines.length; i++) lines[i].setAttribute("stroke-width", route.toFixed(2));
      // Milestone rings keep their proportions at every zoom: always a step
      // wider than the city dot they crown, and the number steps aside when
      // the ring is too small to carry it.
      var showNum = badge * e >= 6;
      var ringR = showNum ? Math.max(badge, dot * 1.5) : dot * 1.5;
      var badgeScope = els.stopLayer || els.journeyLayer;
      var bc = badgeScope.querySelectorAll(".mv-stopbadge circle");
      for (var b = 0; b < bc.length; b++) {
        bc[b].setAttribute("r", ringR.toFixed(2));
        bc[b].style.strokeWidth = Math.max(0.6, ringR * 0.22).toFixed(2) + "px";
        bc[b].style.fillOpacity = showNum ? "1" : "0";
      }
      var bt = badgeScope.querySelectorAll(".mv-stopbadge text");
      for (var t = 0; t < bt.length; t++) {
        bt[t].style.opacity = showNum ? "1" : "0";
        bt[t].style.fontSize = (ringR * 1.12).toFixed(2) + "px";
        var cy = parseFloat(bt[t].getAttribute("data-cy") || "0");
        bt[t].setAttribute("y", (cy + ringR * 0.39).toFixed(2));
      }
    }
    // Region & sea names belong to the far view; fade them out up close.
    var ro = Math.max(0, Math.min(1, (2.7 - view.k) / 1.7));
    if (els.world) {
      var rl = els.world.querySelectorAll(".mv-region-label, .mv-sea-label");
      for (var r = 0; r < rl.length; r++) rl[r].setAttribute("opacity", ro.toFixed(2));
    }
    // Re-run label placement only when size or tier actually moved.
    var key = lvl + ":" + Math.round(f * 2);
    if (key !== lastLayoutKey) { lastLayoutKey = key; relayoutLabels(); }
  }

  function svgPoint(clientX, clientY) {
    var r = els.svg.getBoundingClientRect();
    return {
      x: (clientX - r.left) / (r.width || 1) * VIEW_W,
      y: (clientY - r.top) / (r.height || 1) * VIEW_H
    };
  }

  function stopAnim() {
    if (anim) { window.cancelAnimationFrame(anim.raf); anim = null; }
  }

  function zoomAt(ux, uy, newK) {
    stopAnim();
    newK = Math.max(1, Math.min(KMAX, newK));
    var wx = (ux - view.tx) / view.k, wy = (uy - view.ty) / view.k;
    view.k = newK;
    view.tx = ux - newK * wx;
    view.ty = uy - newK * wy;
    applyView();
  }

  function animateTo(k, tx, ty) {
    stopAnim();
    var from = { k: view.k, tx: view.tx, ty: view.ty };
    var start = null, dur = 420, a = {};
    function step(ts) {
      if (start === null) start = ts;
      var t = Math.min(1, (ts - start) / dur);
      var u = 1 - Math.pow(1 - t, 3); // ease-out cubic
      view.k = from.k + (k - from.k) * u;
      view.tx = from.tx + (tx - from.tx) * u;
      view.ty = from.ty + (ty - from.ty) * u;
      applyView();
      if (t < 1) a.raf = window.requestAnimationFrame(step);
      else anim = null;
    }
    anim = a;
    a.raf = window.requestAnimationFrame(step);
  }

  function zoomToRect(x, y, w, h) {
    var k = Math.max(1, Math.min(KMAX, Math.min(VIEW_W / w, VIEW_H / h)));
    var tx = Math.max(VIEW_W * (1 - k), Math.min(0, VIEW_W / 2 - k * (x + w / 2)));
    var ty = Math.max(VIEW_H * (1 - k), Math.min(0, VIEW_H / 2 - k * (y + h / 2)));
    animateTo(k, tx, ty);
  }

  function zoomToPoint(p, k) {
    k = Math.max(1, Math.min(KMAX, k));
    var tx = Math.max(VIEW_W * (1 - k), Math.min(0, VIEW_W / 2 - k * p.x));
    var ty = Math.max(VIEW_H * (1 - k), Math.min(0, VIEW_H / 2 - k * p.y));
    animateTo(k, tx, ty);
  }

  function bindGestures(svg) {
    var pointers = {}, pCount = 0, pinch = null, drag = null, moved = 0;

    svg.addEventListener("pointerdown", function (ev) {
      pointers[ev.pointerId] = { x: ev.clientX, y: ev.clientY };
      pCount++;
      moved = 0;
      stopAnim();
      try { svg.setPointerCapture(ev.pointerId); } catch (e) { /* ok */ }
      if (pCount === 2) {
        var ids = [], pid;
        for (pid in pointers) if (Object.prototype.hasOwnProperty.call(pointers, pid)) ids.push(pid);
        var p1 = pointers[ids[0]], p2 = pointers[ids[1]];
        var mid = svgPoint((p1.x + p2.x) / 2, (p1.y + p2.y) / 2);
        pinch = {
          d0: Math.sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y)) || 1,
          k0: view.k,
          wx: (mid.x - view.tx) / view.k,
          wy: (mid.y - view.ty) / view.k
        };
        drag = null;
      } else if (pCount === 1 && ev.pointerType === "mouse") {
        drag = { x0: ev.clientX, y0: ev.clientY, tx0: view.tx, ty0: view.ty };
      }
    });

    svg.addEventListener("pointermove", function (ev) {
      var p = pointers[ev.pointerId];
      if (!p) return;
      moved += Math.abs(ev.clientX - p.x) + Math.abs(ev.clientY - p.y);
      p.x = ev.clientX; p.y = ev.clientY;
      if (pinch && pCount >= 2) {
        var ids = [], pid;
        for (pid in pointers) if (Object.prototype.hasOwnProperty.call(pointers, pid)) ids.push(pid);
        var a = pointers[ids[0]], b = pointers[ids[1]];
        var d = Math.sqrt((a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y)) || 1;
        var mid = svgPoint((a.x + b.x) / 2, (a.y + b.y) / 2);
        view.k = Math.max(1, Math.min(KMAX, pinch.k0 * d / pinch.d0));
        view.tx = mid.x - view.k * pinch.wx;
        view.ty = mid.y - view.k * pinch.wy;
        applyView();
        if (ev.cancelable) ev.preventDefault();
      } else if (drag) {
        var r = svg.getBoundingClientRect();
        view.tx = drag.tx0 + (ev.clientX - drag.x0) * VIEW_W / (r.width || 1);
        view.ty = drag.ty0 + (ev.clientY - drag.y0) * VIEW_H / (r.height || 1);
        applyView();
      }
    });

    function release(ev) {
      if (pointers[ev.pointerId]) { delete pointers[ev.pointerId]; pCount--; }
      if (pCount < 2) pinch = null;
      if (pCount === 0) drag = null;
    }
    svg.addEventListener("pointerup", release);
    svg.addEventListener("pointercancel", release);

    // A real drag must not fire the marker click underneath it.
    svg.addEventListener("click", function (ev) {
      if (moved > 8) { ev.stopPropagation(); ev.preventDefault(); moved = 0; }
    }, true);

    svg.addEventListener("wheel", function (ev) {
      ev.preventDefault();
      var pt = svgPoint(ev.clientX, ev.clientY);
      zoomAt(pt.x, pt.y, view.k * Math.exp(-ev.deltaY * 0.0016));
    }, { passive: false });

    svg.addEventListener("dblclick", function (ev) {
      ev.preventDefault();
      var pt = svgPoint(ev.clientX, ev.clientY);
      zoomAt(pt.x, pt.y, view.k * 1.7);
    });
  }

  // Quick flights to the story's main stages.
  var PRESETS = [
    { label: "🗺️ Whole land", x: 0, y: 0, w: VIEW_W, h: VIEW_H },
    { label: "Benjamin heartland", x: 440, y: 540, w: 250, h: 190 },
    { label: "Philistia & the Elah", x: 170, y: 470, w: 420, h: 330 },
    { label: "Judah & the south", x: 230, y: 600, w: 500, h: 430 },
    { label: "The north", x: 280, y: 40, w: 520, h: 440 }
  ];

  function buildMapControls(mapCol, mapWrap) {
    var chips = el("div", { "class": "mv-views", role: "group", "aria-label": "Quick map views" });
    for (var i = 0; i < PRESETS.length; i++) {
      (function (p) {
        var c = el("button", { "class": "mv-viewchip", type: "button" }, p.label);
        c.addEventListener("click", function () { zoomToRect(p.x, p.y, p.w, p.h); });
        chips.appendChild(c);
      })(PRESETS[i]);
    }
    mapCol.insertBefore(chips, mapWrap);

    var ctl = el("div", { "class": "mv-zoomctl" });
    var zin = el("button", { "class": "mv-zbtn", type: "button", "aria-label": "Zoom in", title: "Zoom in" }, "+");
    var zout = el("button", { "class": "mv-zbtn", type: "button", "aria-label": "Zoom out", title: "Zoom out" }, "−");
    var zhome = el("button", { "class": "mv-zbtn", type: "button", "aria-label": "Whole land", title: "Whole land" }, "⌂");
    zin.addEventListener("click", function () { zoomAt(VIEW_W / 2, VIEW_H / 2, view.k * 1.5); });
    zout.addEventListener("click", function () { zoomAt(VIEW_W / 2, VIEW_H / 2, view.k / 1.5); });
    zhome.addEventListener("click", function () { zoomToRect(0, 0, VIEW_W, VIEW_H); });
    ctl.appendChild(zin);
    ctl.appendChild(zout);
    ctl.appendChild(zhome);
    mapWrap.appendChild(ctl);

    mapCol.appendChild(el("p", { "class": "mv-hint" },
      "Scroll or pinch to zoom · drag (two fingers on a phone) to move · tap a place for its story. " +
      "Smaller towns appear as you come closer."));
  }

  function buildKey(container) {
    var box = el("div", { "class": "mv-panel mv-key" });
    box.innerHTML =
      '<h3 style="margin:0 0 .35rem;font-family:Georgia,\'Times New Roman\',serif;font-size:1rem;">Map key</h3>' +
      '<div class="mv-key-row"><svg viewBox="0 0 24 16" width="24" height="16" aria-hidden="true">' +
      '<circle cx="9" cy="8" r="5.5" fill="var(--accent,#28466e)" stroke="var(--panel,#f7f0df)" stroke-width="1.6"/></svg>' +
      '<span>A place — tap it for its story</span></div>' +
      '<div class="mv-key-row"><svg viewBox="0 0 24 16" width="24" height="16" aria-hidden="true">' +
      '<circle cx="9" cy="8" r="6.5" fill="var(--panel,#f7f0df)" stroke="#4a7c59" stroke-width="1.6"/>' +
      '<text x="9" y="11" font-size="8.5" fill="#4a7c59" text-anchor="middle" font-family="Georgia,serif" font-weight="bold">1</text></svg>' +
      '<span>Numbered stop on a journey</span></div>' +
      '<div class="mv-key-row"><svg viewBox="0 0 30 10" width="30" height="10" aria-hidden="true">' +
      '<path d="M1 5 H29" stroke="#4a7c59" stroke-width="2.6" stroke-dasharray="5 3" fill="none"/></svg>' +
      '<span>Journey route — toggle under “Journeys”</span></div>' +
      '<div class="mv-key-row"><span class="mv-key-note">Zoom in and the smaller towns label themselves.</span></div>';
    container.appendChild(box);
  }

  // ---- toolbar ------------------------------------------------------------
  function buildToolbar(container) {
    var bar = el("div", { "class": "mv-toolbar" });
    var label = el("label", { "for": "mv-chapter-filter" }, "Show places from:");
    var sel = el("select", { id: "mv-chapter-filter" });
    sel.appendChild(el("option", { value: "" }, "All chapters"));
    var k2n = window.KINGS2 && Array.isArray(window.KINGS2.chapters) ? window.KINGS2.chapters.length : 0;
    var groups = [["s1", "1 Samuel", 31, "Chapter "], ["k1", "1 Kings", 22, "1 Kings "], ["k2", "2 Kings", k2n, "2 Kings "]];
    for (var g = 0; g < groups.length; g++) {
      if (!groups[g][2]) continue;
      var og = el("optgroup", { label: groups[g][1] });
      for (var n = 1; n <= groups[g][2]; n++) og.appendChild(el("option", { value: groups[g][0] + ":" + n }, groups[g][3] + n));
      sel.appendChild(og);
    }
    sel.value = state.chapterFilter;
    sel.addEventListener("change", function () {
      state.chapterFilter = sel.value || "";
      updateMarkerClasses();
      updateTrail();
    });
    bar.appendChild(label);
    bar.appendChild(sel);
    container.appendChild(bar);
  }

  // ---- my reading trail (1 & 2 Kings) -------------------------------------
  // A running map of the study: every place in every Kings chapter marked
  // read turns gold, a gold line joins them in reading order, and the places
  // of the latest chapter pulse — "you are here."
  function readSetFor(key) {
    var out = [];
    try {
      var arr = JSON.parse(localStorage.getItem(key) || "[]");
      if (Array.isArray(arr)) for (var i = 0; i < arr.length; i++) {
        var n = parseInt(arr[i], 10);
        if (n >= 1 && out.indexOf(n) === -1) out.push(n);
      }
    } catch (e) {}
    return out.sort(function (a, b) { return a - b; });
  }
  function bookChapters(tb) {
    var d = window[tb.global];
    return d && Array.isArray(d.chapters) ? d.chapters : [];
  }
  function chapterOf(tb, n) {
    var chs = bookChapters(tb);
    for (var i = 0; i < chs.length; i++) if (chs[i] && chs[i].num === n) return chs[i];
    return null;
  }

  function updateTrail() {
    if (!els.trailLayer || !els.trailBox) return;
    clear(els.trailLayer);
    clear(els.trailBox);
    // Every chapter of both Kings books that exists, and the ones marked read,
    // in canonical order (1 Kings 1 … 22, then 2 Kings 1 …).
    var total = 0, read = [], next = null;
    for (var b = 0; b < TRAIL_BOOKS.length; b++) {
      var tb = TRAIL_BOOKS[b];
      var chs = bookChapters(tb);
      total += chs.length;
      var rs = readSetFor(tb.key);
      for (var c = 0; c < chs.length; c++) {
        var num = chs[c].num;
        if (rs.indexOf(num) !== -1) read.push({ tb: tb, num: num, ch: chs[c] });
        else if (!next) next = { tb: tb, num: num, ch: chs[c] };
      }
    }
    if (!total) { els.trailBox.style.display = "none"; return; }

    var visited = {}, here = {}, seq = [];
    for (var r = 0; r < read.length; r++) {
      var locs0 = Array.isArray(read[r].ch.locations) ? read[r].ch.locations : [];
      for (var l = 0; l < locs0.length; l++) {
        var id = locs0[l];
        if (!locById(id)) continue;
        visited[id] = true;
        if (r === read.length - 1) here[id] = true;
        // The line stays inside the frame; edge-pinned places just light up.
        if (!projectLoc(locById(id)).off && seq[seq.length - 1] !== id) seq.push(id);
      }
    }

    // Line through the places in reading order.
    if (state.showTrail && seq.length > 1) {
      var d = "";
      for (var s = 0; s < seq.length; s++) {
        var p = projectLoc(locById(seq[s]));
        d += (s ? " L" : "M") + p.x.toFixed(1) + " " + p.y.toFixed(1);
      }
      els.trailLayer.appendChild(svgEl("path", { d: d }));
    }
    var markers = els.markerLayer ? els.markerLayer.querySelectorAll(".mv-marker") : [];
    for (var m = 0; m < markers.length; m++) {
      var mid = markers[m].getAttribute("data-loc");
      markers[m].classList.toggle("mv-visited", !!(state.showTrail && visited[mid]));
      markers[m].classList.toggle("mv-here", !!(state.showTrail && here[mid]) && mid !== state.selectedLoc);
    }

    // Side panel.
    var box = els.trailBox;
    box.style.display = "";
    box.appendChild(el("h3", null, "🧭 My Kings trail"));
    var nPlaces = 0;
    for (var k in visited) if (visited[k]) nPlaces++;
    box.appendChild(el("p", { "class": "mv-modern" },
      read.length + " of " + total + " chapters read · " + nPlaces + (nPlaces === 1 ? " place" : " places") + " walked"));
    var bar = el("div", { "class": "mv-trailbar" });
    var fill = el("span");
    fill.style.width = Math.round(read.length / total * 100) + "%";
    bar.appendChild(fill);
    box.appendChild(bar);

    var row = el("label", { "class": "mv-legend-row" });
    var cb = el("input", { type: "checkbox" });
    cb.checked = state.showTrail;
    cb.addEventListener("change", function () { state.showTrail = cb.checked; updateTrail(); });
    row.appendChild(cb);
    row.appendChild(document.createTextNode(" Show my trail on the map"));
    box.appendChild(row);

    if (next) {
      var nb = el("button", { "class": "mv-chip", type: "button" },
        (read.length ? "Next up: " : "Start: ") + next.tb.label + " " + next.num + (next.ch.title ? " — " + next.ch.title : "") + " →");
      nb.addEventListener("click", function () { if (window.App) window.App.goToChapter(next.num, next.tb.book); });
      box.appendChild(nb);
    } else {
      box.appendChild(el("p", null, "✨ You've walked every chapter here so far."));
    }
    if (!read.length) {
      box.appendChild(el("p", { "class": "mv-placeholder" },
        "Mark a Kings chapter as read in the Story tab and its places light up here, joined in the order you read them."));
      return;
    }
    var ul = el("ul", { "class": "mv-traillist" });
    for (var t = read.length - 1; t >= 0; t--) {
      (function (entry) {
        var c2 = entry.ch;
        var li = el("li");
        var go = el("button", { "class": "mv-stopname", type: "button" }, entry.tb.label + " " + entry.num);
        go.addEventListener("click", function () { if (window.App) window.App.goToChapter(entry.num, entry.tb.book); });
        li.appendChild(go);
        li.appendChild(document.createTextNode(c2.title ? " — " + c2.title + ": " : ": "));
        var locs = Array.isArray(c2.locations) ? c2.locations : [];
        for (var q = 0; q < locs.length; q++) {
          (function (lid, last) {
            var lo = locById(lid);
            if (!lo) return;
            var btn = el("button", { "class": "mv-stopname", type: "button" }, lo.name || lid);
            btn.addEventListener("click", function () { selectLocation(lid); });
            li.appendChild(btn);
            if (!last) li.appendChild(document.createTextNode(", "));
          })(locs[q], q === locs.length - 1);
        }
        ul.appendChild(li);
      })(read[t]);
    }
    box.appendChild(ul);
  }

  // ---- init ---------------------------------------------------------------
  function pickDefaultJourney(journeys) {
    for (var q = 0; q < journeys.length; q++) if (journeys[q] && journeys[q].id === "solomon-realm") return "solomon-realm";
    for (var i = 0; i < journeys.length; i++) {
      var j = journeys[i];
      if (!j) continue;
      var t = String(j.title || "").toLowerCase() + " " + String(j.id || "").toLowerCase();
      if (t.indexOf("flight") !== -1 && t.indexOf("david") !== -1) return j.id;
    }
    for (var k = 0; k < journeys.length; k++) if (journeys[k] && journeys[k].id) return journeys[k].id;
    return null;
  }

  function init() {
    var root = document.getElementById("view-map");
    if (!root) return;
    clear(root);
    els = {};

    var style = document.createElement("style");
    style.textContent = CSS;
    root.appendChild(style);

    root.appendChild(el("p", { "class": "mv-intro" },
      "The world of Samuel and Kings — from Shiloh's sanctuary to Solomon's temple and Elijah's Carmel. " +
      "Click a place, trace a journey, or follow your own reading trail. Places beyond the frame sit on its edge, arrow pointing the way."));

    var locs = getLocations();
    if (!locs || !locs.length) {
      var ph = el("div", { "class": "mv-panel" });
      ph.appendChild(el("h3", null, "Map is loading its places…"));
      ph.appendChild(el("p", { "class": "mv-placeholder" },
        "Location data (data/locations.js) isn’t available yet. " +
        "Once it loads, the map of ancient Israel will appear here."));
      root.appendChild(ph);
      state.inited = true;
      return;
    }

    var journeys = getJourneys();
    // Default-visible journey: keep prior toggles across re-init; else pick one.
    var anyVisible = false;
    for (var v = 0; v < journeys.length; v++) {
      if (journeys[v] && state.visibleJourneys[journeys[v].id]) { anyVisible = true; break; }
    }
    if (!anyVisible) {
      var def = pickDefaultJourney(journeys);
      if (def) state.visibleJourneys[def] = true;
    }

    buildToolbar(root);

    var layout = el("div", { "class": "mv-layout" });
    var mapCol = el("div", { "class": "mv-mapcol" });
    var sideCol = el("div", { "class": "mv-sidecol" });
    layout.appendChild(mapCol);
    layout.appendChild(sideCol);
    root.appendChild(layout);

    var mapWrap = el("div", { "class": "mv-mapwrap" });
    mapCol.appendChild(mapWrap);

    var svg = svgEl("svg", {
      "class": "mv-svg", viewBox: "0 0 " + VIEW_W + " " + VIEW_H,
      role: "img", "aria-label": "Map of ancient Israel in the books of Samuel and Kings",
      preserveAspectRatio: "xMidYMid meet"
    });
    mapWrap.appendChild(svg);
    els.svg = svg;

    // Everything drawn lives inside one pannable, zoomable world group.
    els.world = svgEl("g", { "class": "mv-world" });
    svg.appendChild(els.world);

    buildGeography(els.world);

    els.journeyLayer = svgEl("g", { "class": "mv-journeys" });
    els.world.appendChild(els.journeyLayer);

    els.trailLayer = svgEl("g", { "class": "mv-trail" });
    els.world.appendChild(els.trailLayer);

    els.markerLayer = svgEl("g", { "class": "mv-markers" });
    els.world.appendChild(els.markerLayer);
    buildMarkers(els.markerLayer, locs);

    // Stop badges render above the markers so their numbers stay readable.
    els.stopLayer = svgEl("g", { "class": "mv-stops-layer" });
    els.world.appendChild(els.stopLayer);
    buildJourneyLayer(els.journeyLayer, journeys, els.stopLayer);

    buildMapControls(mapCol, mapWrap);
    bindGestures(svg);

    els.panel = el("div", { "class": "mv-panel mv-detail", "aria-live": "polite" });
    sideCol.appendChild(els.panel);
    els.trailBox = el("div", { "class": "mv-panel mv-trailbox" });
    sideCol.appendChild(els.trailBox);
    buildKey(sideCol);
    els.legend = buildLegend(sideCol, journeys);

    updateMarkerClasses();
    updateJourneyVisibility();
    renderPanel();
    updateTrail();

    // Re-read the trail whenever the map tab is opened (chapters may have been
    // marked read in the story view since).
    if (window.MutationObserver && !root.__mvTrailObs) {
      root.__mvTrailObs = new MutationObserver(function () {
        if (root.classList.contains("active")) updateTrail();
      });
      root.__mvTrailObs.observe(root, { attributes: true, attributeFilter: ["class"] });
    }

    // Start on the whole land, then size labels for the real pixels.
    view.k = 1; view.tx = 0; view.ty = 0;
    lastLayoutKey = "";
    applyView();

    // The map tab may be hidden at init (width 0); re-measure when it shows,
    // and on window resizes, so label sizes always match true screen pixels.
    if (state._mo) { try { state._mo.disconnect(); } catch (e) { /* ok */ } }
    if (typeof MutationObserver === "function") {
      state._mo = new MutationObserver(function () {
        if (root.classList.contains("active")) updateDynamics();
      });
      state._mo.observe(root, { attributes: true, attributeFilter: ["class"] });
    }
    if (!state._resizeBound) {
      state._resizeBound = true;
      window.addEventListener("resize", function () {
        if (state.inited) updateDynamics();
      });
    }

    state.inited = true;
    if (state.pendingFocus) {
      var pf = state.pendingFocus;
      state.pendingFocus = null;
      focus(pf);
    }
  }

  function focus(locId) {
    if (!state.inited || !document.getElementById("view-map") || !els.markerLayer) {
      state.pendingFocus = locId;
      return;
    }
    var loc = locById(locId);
    if (!loc) return;
    selectLocation(locId);
    // Fly in close enough that the place and its neighbours are labeled.
    if (typeof loc.lat === "number" && typeof loc.lon === "number") {
      var p = projectLoc(loc);
      zoomToPoint(p, Math.max(view.k, MINOR_TOWNS[locId] ? 2.8 : 2.2));
    }
    var m = els.markerLayer.querySelector('.mv-marker[data-loc="' + String(locId).replace(/"/g, '\\"') + '"]');
    if (m && typeof m.scrollIntoView === "function") {
      try { m.scrollIntoView({ block: "nearest", behavior: "smooth" }); } catch (e) { /* older browsers */ }
    }
  }

  window.MapView = { init: init, focus: focus };
})();
