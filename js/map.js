/* js/map.js — window.MapView (Dev 1)
   Interactive map of ancient Israel for the 1 Samuel story.
   Plain script global, no modules. Renders only inside #view-map.
   Reads window.LOCATIONS and window.JOURNEYS (may be absent — degrade gracefully). */

(function () {
  "use strict";

  // ---- shared projection (see ARCHITECTURE.md) ----------------------------
  var project = function (lat, lon) {
    return { x: (lon - 34.0) * 300, y: (33.0 - lat) * 360 };
  };

  var VIEW_W = 600;
  var VIEW_H = 800;
  var SVG_NS = "http://www.w3.org/2000/svg";

  // ---- module state -------------------------------------------------------
  var state = {
    inited: false,
    selectedLoc: null,     // location id or null
    selectedJourney: null, // journey id or null
    visibleJourneys: {},   // id -> bool
    chapterFilter: 0,      // 0 = all chapters
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
    "#view-map .mv-mapcol{flex:1 1 340px;min-width:280px;max-width:640px;}" +
    "#view-map .mv-sidecol{flex:1 1 260px;min-width:240px;display:flex;flex-direction:column;gap:1rem;}" +

    "#view-map svg.mv-svg{display:block;width:100%;height:auto;max-width:640px;" +
    "border:1px solid var(--line,#d8ccb2);border-radius:10px;background:var(--mv-land);" +
    "box-shadow:0 2px 10px rgba(0,0,0,.08);}" +

    "#view-map .mv-marker{cursor:pointer;}" +
    "#view-map .mv-marker circle.mv-dot{fill:var(--accent,#28466e);stroke:var(--panel,#f7f0df);" +
    "stroke-width:1.6;transition:r .12s ease;}" +
    "#view-map .mv-marker text{fill:var(--ink,#2b2416);font-family:Georgia,'Times New Roman',serif;" +
    "font-size:13px;paint-order:stroke;stroke:var(--mv-land);stroke-width:3px;stroke-linejoin:round;" +
    "pointer-events:none;}" +
    "#view-map .mv-marker:hover circle.mv-dot{fill:var(--gold,#b08a2e);}" +
    "#view-map .mv-marker.mv-selected circle.mv-dot{fill:var(--gold,#b08a2e);}" +
    "#view-map .mv-marker.mv-selected text{fill:var(--gold,#b08a2e);font-weight:bold;}" +
    "#view-map .mv-marker.mv-dim{opacity:.22;}" +
    "#view-map .mv-halo{fill:none;stroke:var(--gold,#b08a2e);stroke-width:2;opacity:.9;pointer-events:none;}" +

    "#view-map .mv-region-label{fill:var(--mv-region);font-family:Georgia,'Times New Roman',serif;" +
    "font-size:15px;letter-spacing:.35em;text-transform:uppercase;pointer-events:none;}" +
    "#view-map .mv-sea-label{fill:var(--mv-shore);font-family:Georgia,'Times New Roman',serif;" +
    "font-style:italic;font-size:13px;letter-spacing:.12em;pointer-events:none;}" +

    "#view-map .mv-stopbadge circle{stroke-width:1.4;stroke:var(--panel,#f7f0df);}" +
    "#view-map .mv-stopbadge text{fill:#fff;font-size:9px;font-family:Georgia,serif;font-weight:bold;" +
    "text-anchor:middle;pointer-events:none;}" +

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
    "#view-map ol.mv-stops .mv-stopnote{color:var(--muted,#6b6152);}";

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
    var sea = svgEl("path", { d: seaD, fill: "var(--mv-water)", stroke: "var(--mv-shore)", "stroke-width": "1.6" });
    svg.appendChild(sea);

    // A softer inner-water band for depth along the west edge.
    var deep = svgEl("path", {
      d: "M0 0 L" + project(33.0, 34.75).x.toFixed(1) + " 0 " +
         "C " + pts([[32.4, 34.55], [31.6, 34.2], [30.8, 34.02]]) +
         " L0 " + VIEW_H + " Z",
      fill: "var(--mv-water-deep)", opacity: "0.45", "pointer-events": "none"
    });
    svg.appendChild(deep);

    // Hill-country shading: soft ellipses along the central ridge + Gilead.
    var hills = [
      [32.55, 35.30, 40, 90], [32.15, 35.25, 46, 110], [31.75, 35.18, 44, 100],
      [31.40, 35.10, 42, 95], [31.05, 34.95, 40, 80],
      [32.45, 35.85, 34, 90], [32.00, 35.80, 34, 90] // Gilead, east of Jordan
    ];
    for (var h = 0; h < hills.length; h++) {
      var c = project(hills[h][0], hills[h][1]);
      svg.appendChild(svgEl("ellipse", {
        cx: c.x.toFixed(1), cy: c.y.toFixed(1), rx: hills[h][2], ry: hills[h][3],
        fill: "var(--mv-hill)", "pointer-events": "none"
      }));
    }

    // Sea of Galilee (~32.8 N, 35.59 E): small pear-shaped lake.
    var galilee = svgEl("path", {
      d: pathThrough([
        [32.89, 35.58], [32.86, 35.63], [32.80, 35.64], [32.73, 35.61],
        [32.71, 35.57], [32.76, 35.545], [32.83, 35.55]
      ], true),
      fill: "var(--mv-water)", stroke: "var(--mv-shore)", "stroke-width": "1.2"
    });
    svg.appendChild(galilee);

    // Jordan River: from Galilee's south tip down to the Dead Sea's north tip.
    var jordan = svgEl("path", {
      d: pathThrough([
        [32.71, 35.585], [32.55, 35.55], [32.40, 35.57], [32.20, 35.55],
        [32.00, 35.53], [31.87, 35.55], [31.76, 35.53]
      ], false),
      fill: "none", stroke: "var(--mv-river)", "stroke-width": "2.4",
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
      fill: "var(--mv-water)", stroke: "var(--mv-shore)", "stroke-width": "1.2"
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
      x: ds.x, y: ds.y, "class": "mv-sea-label", "text-anchor": "middle", "font-size": "10",
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
      if (regions[r][0] === "EPHRAIM") attrs["font-size"] = "11";
      if (regions[r][3]) attrs.transform = "rotate(" + regions[r][3] + " " + rp.x + " " + rp.y + ")";
      svg.appendChild(svgEl("text", attrs, regions[r][0]));
    }
  }

  // ---- marker label placement (avoid collisions) --------------------------
  function placeLabels(locs) {
    // Returns map id -> {dx, dy, anchor}. Greedy: try candidates, keep first
    // whose estimated text box doesn't hit an already placed box or a marker.
    var placed = [];
    var out = {};
    var candidates = [
      { dx: 9, dy: 4, anchor: "start" },
      { dx: -9, dy: 4, anchor: "end" },
      { dx: 0, dy: -10, anchor: "middle" },
      { dx: 0, dy: 17, anchor: "middle" },
      { dx: 11, dy: -7, anchor: "start" },
      { dx: -11, dy: 15, anchor: "end" },
      // Farther fallbacks for dense clusters (e.g. the Benjamin plateau).
      { dx: 16, dy: 4, anchor: "start" },
      { dx: -16, dy: 4, anchor: "end" },
      { dx: 14, dy: 15, anchor: "start" },
      { dx: -14, dy: -7, anchor: "end" },
      { dx: 0, dy: -18, anchor: "middle" },
      { dx: 0, dy: 26, anchor: "middle" },
      { dx: 22, dy: 4, anchor: "start" },
      { dx: -22, dy: 4, anchor: "end" }
    ];
    function boxFor(p, name, c) {
      var w = Math.max(30, name.length * 6.6), h = 13;
      var x = p.x + c.dx;
      if (c.anchor === "end") x -= w;
      else if (c.anchor === "middle") x -= w / 2;
      var y = p.y + c.dy - h + 3;
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
      var pd = project(ld.lat, ld.lon);
      placed.push({ x: pd.x - 6, y: pd.y - 6, w: 12, h: 12 });
    }
    // Place top-to-bottom for stable results.
    var sorted = locs.slice().sort(function (a, b) {
      var ya = typeof a.lat === "number" ? project(a.lat, a.lon).y : 0;
      var yb = typeof b.lat === "number" ? project(b.lat, b.lon).y : 0;
      return ya - yb;
    });
    for (var i = 0; i < sorted.length; i++) {
      var loc = sorted[i];
      if (typeof loc.lat !== "number" || typeof loc.lon !== "number") continue;
      var p = project(loc.lat, loc.lon);
      var chosen = candidates[0], b = null;
      for (var c = 0; c < candidates.length; c++) {
        b = boxFor(p, String(loc.name || loc.id || ""), candidates[c]);
        if (!hits(b) && b.x >= 2 && b.x + b.w <= VIEW_W - 2 && b.y >= 2) { chosen = candidates[c]; break; }
      }
      placed.push(boxFor(p, String(loc.name || loc.id || ""), chosen));
      out[loc.id] = chosen;
    }
    return out;
  }

  // ---- markers ------------------------------------------------------------
  function buildMarkers(layer, locs) {
    var labelPos = placeLabels(locs);
    for (var i = 0; i < locs.length; i++) {
      (function (loc) {
        if (!loc || typeof loc.lat !== "number" || typeof loc.lon !== "number") return;
        var p = project(loc.lat, loc.lon);
        var g = svgEl("g", { "class": "mv-marker", "data-loc": loc.id, tabindex: "0", role: "button" });
        g.appendChild(svgEl("title", null, String(loc.name || loc.id)));
        var halo = svgEl("circle", { "class": "mv-halo", cx: p.x, cy: p.y, r: 10, visibility: "hidden" });
        g.appendChild(halo);
        g.appendChild(svgEl("circle", { "class": "mv-dot", cx: p.x, cy: p.y, r: 5 }));
        var lp = labelPos[loc.id] || { dx: 9, dy: 4, anchor: "start" };
        g.appendChild(svgEl("text", {
          x: p.x + lp.dx, y: p.y + lp.dy, "text-anchor": lp.anchor
        }, String(loc.name || loc.id)));
        g.addEventListener("click", function () { selectLocation(loc.id); });
        g.addEventListener("keydown", function (ev) {
          if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); selectLocation(loc.id); }
        });
        layer.appendChild(g);
      })(locs[i]);
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
        out.push({ loc: s.loc, note: s.note || "", name: loc.name || s.loc, point: project(loc.lat, loc.lon) });
      }
    }
    return out;
  }

  function buildJourneyLayer(layer, journeys) {
    for (var i = 0; i < journeys.length; i++) {
      var j = journeys[i];
      if (!j || !j.id) continue;
      var stops = journeyStops(j);
      var g = svgEl("g", { "class": "mv-journey", "data-journey": j.id });
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
          d: d, fill: "none", stroke: color, "stroke-width": "2.6",
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
          badge.appendChild(svgEl("circle", { cx: bp.x, cy: bp.y, r: 7.5, fill: color }));
          badge.appendChild(svgEl("text", { x: bp.x, y: bp.y + 3.2 }, String(b + 1)));
          g.appendChild(badge);
        }
      }
      g.style.display = state.visibleJourneys[j.id] ? "" : "none";
      layer.appendChild(g);
    }
  }

  function updateJourneyVisibility() {
    if (!els.journeyLayer) return;
    var groups = els.journeyLayer.querySelectorAll(".mv-journey");
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
      if (state.chapterFilter > 0 && !selected) {
        var chs = loc && Array.isArray(loc.chapters) ? loc.chapters : [];
        dim = chs.indexOf(state.chapterFilter) === -1;
      }
      if (dim) m.classList.add("mv-dim"); else m.classList.remove("mv-dim");
    }
  }

  function chapterChips(chapters) {
    var wrap = el("div", { "class": "mv-chips" });
    if (!Array.isArray(chapters)) return wrap;
    for (var i = 0; i < chapters.length; i++) {
      (function (n) {
        if (typeof n !== "number") return;
        var chip = el("button", { "class": "mv-chip", type: "button", title: "Read 1 Samuel " + n }, "Ch. " + n);
        chip.addEventListener("click", function () {
          if (window.App && typeof window.App.goToChapter === "function") window.App.goToChapter(n);
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
        if (Array.isArray(loc.chapters) && loc.chapters.length) {
          panel.appendChild(el("p", { "class": "mv-modern" }, "Appears in:"));
          panel.appendChild(chapterChips(loc.chapters));
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
          panel.appendChild(chapterChips(j.chapters));
        }
        return;
      }
    }

    panel.appendChild(el("h3", null, "Explore the map"));
    panel.appendChild(el("p", { "class": "mv-placeholder" },
      "Click a place marker to learn about it, or toggle a journey in the legend to trace the route."));
  }

  // ---- toolbar ------------------------------------------------------------
  function buildToolbar(container) {
    var bar = el("div", { "class": "mv-toolbar" });
    var label = el("label", { "for": "mv-chapter-filter" }, "Show places from:");
    var sel = el("select", { id: "mv-chapter-filter" });
    sel.appendChild(el("option", { value: "0" }, "All chapters"));
    for (var n = 1; n <= 31; n++) sel.appendChild(el("option", { value: String(n) }, "Chapter " + n));
    sel.value = String(state.chapterFilter);
    sel.addEventListener("change", function () {
      state.chapterFilter = parseInt(sel.value, 10) || 0;
      updateMarkerClasses();
    });
    bar.appendChild(label);
    bar.appendChild(sel);
    container.appendChild(bar);
  }

  // ---- init ---------------------------------------------------------------
  function pickDefaultJourney(journeys) {
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
      "The world of 1 Samuel — from Shiloh's sanctuary to the Philistine plain. " +
      "Click a place, or trace a journey."));

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

    var svg = svgEl("svg", {
      "class": "mv-svg", viewBox: "0 0 " + VIEW_W + " " + VIEW_H,
      role: "img", "aria-label": "Map of ancient Israel during 1 Samuel",
      preserveAspectRatio: "xMidYMid meet"
    });
    mapCol.appendChild(svg);

    buildGeography(svg);

    els.journeyLayer = svgEl("g", { "class": "mv-journeys" });
    svg.appendChild(els.journeyLayer);
    buildJourneyLayer(els.journeyLayer, journeys);

    els.markerLayer = svgEl("g", { "class": "mv-markers" });
    svg.appendChild(els.markerLayer);
    buildMarkers(els.markerLayer, locs);

    els.panel = el("div", { "class": "mv-panel mv-detail", "aria-live": "polite" });
    sideCol.appendChild(els.panel);
    els.legend = buildLegend(sideCol, journeys);

    updateMarkerClasses();
    updateJourneyVisibility();
    renderPanel();

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
    if (!locById(locId)) return;
    selectLocation(locId);
    var m = els.markerLayer.querySelector('.mv-marker[data-loc="' + String(locId).replace(/"/g, '\\"') + '"]');
    if (m && typeof m.scrollIntoView === "function") {
      try { m.scrollIntoView({ block: "nearest", behavior: "smooth" }); } catch (e) { /* older browsers */ }
    }
  }

  window.MapView = { init: init, focus: focus };
})();
