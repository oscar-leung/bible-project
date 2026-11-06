/* js/stage3d.js — the 3D stage for Journey Mode (Game Dev)
   Rebuilds the twelve Stage scene types as living Three.js dioramas in
   the spirit of the reenactment scenes in Eric's books-of-samuel project:
   warm late-afternoon light, fog the color of the land, silhouette
   figures, rising smoke. Loads after js/stage.js and vendor/three.min.js
   and takes over window.Stage.render; if WebGL or THREE is missing (old
   browser, blocked canvas), the original 2D SVG stage renders instead.
   Plain script global, no modules. */

(function () {
  "use strict";

  if (!window.Stage) return;
  var render2d = window.Stage.render; // the SVG fallback, kept whole

  var T = window.THREE || null;
  var reduced = false;
  try { reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches; } catch (e) {}

  // ---- palette (light / dark follow the app theme) -------------------------
  function dark() {
    try { return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches; } catch (e) { return false; }
  }
  function palette(night) {
    var d = dark();
    if (night) return {
      sky: d ? 0x11141f : 0x1d2433, fog: d ? 0x11141f : 0x1d2433,
      ground: d ? 0x241f14 : 0x4a4434, hill: d ? 0x1c1810 : 0x3c362a,
      ink: d ? 0xcbb482 : 0x8a7a5c, sunCol: 0x8fa3cc, sunInt: 0.5, hemi: 0.3
    };
    return {
      sky: d ? 0x241d12 : 0xdcc9a4, fog: d ? 0x241d12 : 0xdcc9a4,
      ground: d ? 0x332a19 : 0xcdb68e, hill: d ? 0x2a2214 : 0xb49a6f,
      ink: d ? 0xcbb482 : 0x4a3b22, sunCol: 0xffd9a8, sunInt: 1.5, hemi: 0.55
    };
  }
  var BLUE = 0x28466e, RED = 0x8c3b2e, GOLD = 0xb8860b, GOLDHI = 0xe8c76a, GREEN = 0x4a7c59, WOOL = 0xefe6d2;

  // ---- singleton renderer + loop -------------------------------------------
  var renderer = null, canvas = null, active = null, rafId = 0;

  function getRenderer() {
    if (renderer) return renderer;
    renderer = new T.WebGLRenderer({ antialias: true, powerPreference: "low-power" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    canvas = renderer.domElement;
    canvas.style.cssText = "position:absolute;inset:0;width:100%;height:100%;display:block;";
    return renderer;
  }

  function disposeScene(scene) {
    try {
      scene.traverse(function (o) {
        if (o.geometry) o.geometry.dispose();
        if (o.material) {
          var mats = Array.isArray(o.material) ? o.material : [o.material];
          for (var i = 0; i < mats.length; i++) {
            if (mats[i].map) mats[i].map.dispose();
            mats[i].dispose();
          }
        }
      });
    } catch (e) { /* GPU housekeeping must never break the journey */ }
  }

  function stopLoop() {
    if (rafId) { cancelAnimationFrame(rafId); rafId = 0; }
    if (active) { disposeScene(active.scene); active = null; }
  }

  function loop(ts) {
    rafId = 0;
    if (!active) return;
    if (!document.body.contains(canvas)) { stopLoop(); return; } // view left — put the stage down
    var t = ts / 1000;
    var a = active;
    try {
      if (a.tick) a.tick(t);
      // a slow drift of the observer's eye, Eric's standing-in-the-field feel
      var ang = a.baseAng + Math.sin(t * 0.11) * 0.16;
      a.camera.position.set(Math.sin(ang) * a.radius, a.height + Math.sin(t * 0.07) * 0.25, Math.cos(ang) * a.radius);
      a.camera.lookAt(a.target);
      for (var i = 0; i < a.labels.length; i++) {
        var L = a.labels[i];
        var v = L.anchor.clone().project(a.camera);
        L.el.style.left = ((v.x * 0.5 + 0.5) * 100) + "%";
        L.el.style.top = ((-v.y * 0.5 + 0.5) * 100) + "%";
      }
      renderer.render(a.scene, a.camera);
    } catch (e) { stopLoop(); return; }
    if (!reduced) rafId = requestAnimationFrame(loop);
  }

  // ---- small builders --------------------------------------------------------
  function lam(color, emissive) {
    var m = new T.MeshLambertMaterial({ color: color });
    if (emissive) { m.emissive = new T.Color(emissive); m.emissiveIntensity = 0.9; }
    return m;
  }

  function terrain(scene, P) {
    var g = new T.PlaneGeometry(70, 48, 44, 30);
    var pos = g.attributes.position;
    for (var i = 0; i < pos.count; i++) {
      var x = pos.getX(i), y = pos.getY(i);
      var h = Math.sin(x * 0.18 + 1.7) * Math.cos(y * 0.14) * 0.9 +
              Math.sin(x * 0.55 + y * 0.33) * 0.22;
      pos.setZ(i, h * (0.35 + Math.min(1, Math.abs(y) / 12)));
    }
    g.computeVertexNormals();
    var m = new T.Mesh(g, lam(P.ground));
    m.rotation.x = -Math.PI / 2;
    scene.add(m);
    // far ridges
    for (var r = 0; r < 3; r++) {
      var ridge = new T.Mesh(new T.SphereGeometry(16 + r * 7, 20, 12), lam(P.hill));
      ridge.scale.set(1.6, 0.22 + r * 0.05, 1);
      ridge.position.set((r - 1) * 20, -1.4, -24 - r * 6);
      scene.add(ridge);
    }
  }

  function lights(scene, P) {
    scene.add(new T.HemisphereLight(0xe8d9b8, 0x6b5a44, P.hemi));
    var sun = new T.DirectionalLight(P.sunCol, P.sunInt);
    sun.position.set(-26, 18, -11); // Eric's late-afternoon angle
    scene.add(sun);
    scene.add(new T.AmbientLight(0xffffff, 0.14));
  }

  function figure(opts) {
    opts = opts || {};
    var h = opts.h || 1.7, color = opts.color || 0x4a3b22;
    var grp = new T.Group();
    var robe = new T.Mesh(new T.ConeGeometry(h * 0.3, h, 8), lam(color));
    robe.position.y = h / 2;
    grp.add(robe);
    var head = new T.Mesh(new T.SphereGeometry(h * 0.14, 10, 8), lam(color));
    head.position.y = h * 1.08;
    grp.add(head);
    if (opts.spear) {
      var sp = new T.Mesh(new T.CylinderGeometry(0.02, 0.02, h * 1.4, 5), lam(color));
      sp.position.set(h * 0.32, h * 0.72, 0);
      sp.rotation.z = -0.12;
      grp.add(sp);
      var tip = new T.Mesh(new T.ConeGeometry(0.06, 0.18, 5), lam(color));
      tip.position.set(h * 0.32 + 0.17 * 0.12, h * 1.42, 0);
      tip.rotation.z = -0.12;
      grp.add(tip);
    }
    if (opts.staff) {
      var st = new T.Mesh(new T.CylinderGeometry(0.025, 0.025, h * 1.25, 5), lam(color));
      st.position.set(h * 0.34, h * 0.62, 0);
      grp.add(st);
    }
    if (opts.crown) {
      var cr = new T.Mesh(new T.TorusGeometry(h * 0.13, 0.035, 6, 12), lam(GOLD, GOLD));
      cr.position.y = h * 1.2;
      cr.rotation.x = Math.PI / 2;
      grp.add(cr);
    }
    if (opts.kneel) { grp.rotation.x = 0.42; grp.position.y = -h * 0.18; }
    return grp;
  }

  function fire(scale) {
    var grp = new T.Group();
    var outer = new T.Mesh(new T.ConeGeometry(0.22 * scale, 0.65 * scale, 7), lam(GOLD, 0xff8a2a));
    outer.position.y = 0.32 * scale;
    grp.add(outer);
    var inner = new T.Mesh(new T.ConeGeometry(0.11 * scale, 0.4 * scale, 7), lam(GOLDHI, 0xffd27a));
    inner.position.y = 0.24 * scale;
    grp.add(inner);
    var light = new T.PointLight(0xffa64d, 1.1 * scale, 9 * scale);
    light.position.y = 0.6 * scale;
    grp.add(light);
    grp.userData.flame = { outer: outer, inner: inner, light: light, seed: Math.random() * 7 };
    return grp;
  }
  function tickFire(grp, t) {
    var f = grp.userData.flame;
    if (!f) return;
    var w = 0.82 + 0.3 * Math.abs(Math.sin(t * 9 + f.seed) * Math.sin(t * 3.7 + f.seed));
    f.outer.scale.set(w, 0.85 + 0.3 * Math.sin(t * 7 + f.seed), w);
    f.light.intensity = f.light.userData_base || (f.light.userData_base = f.light.intensity);
    f.light.intensity = f.light.userData_base * (0.75 + 0.45 * w);
  }

  var smokeTex = null;
  function getSmokeTex() {
    if (smokeTex) return smokeTex;
    var c = document.createElement("canvas");
    c.width = c.height = 64;
    var ctx = c.getContext("2d");
    var grad = ctx.createRadialGradient(32, 32, 2, 32, 32, 30);
    grad.addColorStop(0, "rgba(90,80,66,.55)");
    grad.addColorStop(1, "rgba(90,80,66,0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 64);
    smokeTex = new T.CanvasTexture(c);
    return smokeTex;
  }
  // A rising smoke column — the signature of Eric's Ziklag morning.
  function smokeColumn(n) {
    var grp = new T.Group();
    var sprites = [];
    for (var i = 0; i < n; i++) {
      var m = new T.SpriteMaterial({ map: getSmokeTex(), transparent: true, depthWrite: false });
      var s = new T.Sprite(m);
      s.userData.phase = i / n;
      sprites.push(s);
      grp.add(s);
    }
    grp.userData.smoke = sprites;
    return grp;
  }
  function tickSmoke(grp, t) {
    var sp = grp.userData.smoke;
    if (!sp) return;
    for (var i = 0; i < sp.length; i++) {
      var k = (t * 0.12 + sp[i].userData.phase) % 1;
      sp[i].position.set(Math.sin(k * 9 + i) * (0.25 + k), 0.4 + k * 5.2, 0);
      var sc = 0.7 + k * 2.6;
      sp[i].scale.set(sc, sc, 1);
      sp[i].material.opacity = 0.55 * (1 - k);
    }
  }

  function tent(scale, color) {
    var m = new T.Mesh(new T.ConeGeometry(0.9 * scale, 1.1 * scale, 4), lam(color));
    m.position.y = 0.55 * scale;
    m.rotation.y = Math.PI / 4;
    return m;
  }

  function banner(color) {
    var grp = new T.Group();
    var pole = new T.Mesh(new T.CylinderGeometry(0.03, 0.03, 2.6, 5), lam(0x4a3b22));
    pole.position.y = 1.3;
    grp.add(pole);
    var cloth = new T.Mesh(new T.PlaneGeometry(0.9, 0.5), new T.MeshLambertMaterial({ color: color, side: T.DoubleSide }));
    cloth.position.set(0.47, 2.3, 0);
    grp.add(cloth);
    grp.userData.cloth = cloth;
    return grp;
  }
  function tickBanner(grp, t) {
    var c = grp.userData.cloth;
    if (c) { c.rotation.y = Math.sin(t * 2.1 + grp.position.x) * 0.45; }
  }

  function starField(scene) {
    var g = new T.BufferGeometry();
    var pts = [];
    for (var i = 0; i < 160; i++) {
      var a = Math.random() * Math.PI * 2, r = 20 + Math.random() * 22;
      pts.push(Math.cos(a) * r, 7 + Math.random() * 17, Math.sin(a) * r - 8);
    }
    g.setAttribute("position", new T.Float32BufferAttribute(pts, 3));
    scene.add(new T.Points(g, new T.PointsMaterial({ color: 0xf5e2ae, size: 0.09, sizeAttenuation: true, transparent: true, opacity: 0.9 })));
  }

  function sheep() {
    var grp = new T.Group();
    var body = new T.Mesh(new T.SphereGeometry(0.32, 10, 8), lam(WOOL));
    body.scale.set(1.25, 0.85, 1);
    body.position.y = 0.38;
    grp.add(body);
    var head = new T.Mesh(new T.SphereGeometry(0.12, 8, 6), lam(0x4a3b22));
    head.position.set(0.42, 0.45, 0);
    grp.add(head);
    return grp;
  }

  function rocksAndShrubs(scene, P, n) {
    for (var i = 0; i < n; i++) {
      var x = Math.sin(i * 12.9898) * 14, z = Math.cos(i * 78.233) * 10 - 2;
      if (Math.abs(x) < 3 && Math.abs(z) < 3) continue;
      if (i % 2) {
        var rock = new T.Mesh(new T.IcosahedronGeometry(0.22 + (i % 3) * 0.1, 0), lam(P.hill));
        rock.position.set(x, 0.14, z);
        scene.add(rock);
      } else {
        var shrub = new T.Mesh(new T.ConeGeometry(0.2, 0.42, 6), lam(GREEN));
        shrub.position.set(x, 0.2, z);
        scene.add(shrub);
      }
    }
  }

  function wall(scene, P, burned) {
    var grp = new T.Group();
    var body = new T.Mesh(new T.BoxGeometry(7, 1.9, 0.7), lam(burned ? 0x55483a : P.hill));
    body.position.y = 0.95;
    grp.add(body);
    for (var i = 0; i < 7; i++) {
      var cren = new T.Mesh(new T.BoxGeometry(0.5, 0.4, 0.7), lam(burned ? 0x55483a : P.hill));
      cren.position.set(-3 + i, 2.1, 0);
      grp.add(cren);
    }
    var gate = new T.Mesh(new T.BoxGeometry(1.1, 1.2, 0.8), lam(0x241c10));
    gate.position.y = 0.6;
    grp.add(gate);
    grp.position.set(0, 0, -5);
    scene.add(grp);
    return grp;
  }

  // ---- the scenes -------------------------------------------------------------
  // Each returns { tickers:[], anchors:{a1:Vector3,a2:Vector3}, radius? }
  var NIGHT = { camp: 1, wilderness: 1, mourning: 1, feast: 1, altar: 1, scroll: 1 };
  var SCENES = {
    shepherd: function (s, P, o) {
      rocksAndShrubs(s, P, 10);
      var flock = [];
      for (var i = 0; i < 6; i++) {
        var sh = sheep();
        sh.position.set(-3.4 + (i % 3) * 1.5, 0, -0.5 + Math.floor(i / 3) * 1.6);
        sh.rotation.y = i;
        s.add(sh);
        flock.push(sh);
      }
      var d = figure({ color: P.ink, staff: true, h: 1.8 });
      d.position.set(2.6, 0, 0.8);
      d.rotation.y = -0.8;
      s.add(d);
      return { anchors: { a1: new T.Vector3(2.6, 2.3, 0.8) },
        tickers: [function (t) { for (var i = 0; i < flock.length; i++) flock[i].position.y = Math.abs(Math.sin(t * 1.4 + i)) * 0.05; }] };
    },
    duel: function (s, P, o) {
      var b1 = banner(BLUE); b1.position.set(-5, 0, 1); s.add(b1);
      var b2 = banner(RED); b2.position.set(5, 0, 1); s.add(b2);
      var david = figure({ color: BLUE, h: 1.5 });
      david.position.set(-1.9, 0, 0);
      s.add(david);
      var goliath = figure({ color: RED, spear: true, h: 2.9 });
      goliath.position.set(1.9, 0, 0);
      goliath.rotation.y = Math.PI;
      s.add(goliath);
      var stone = new T.Mesh(new T.SphereGeometry(0.07, 6, 5), lam(0x4a3b22));
      s.add(stone);
      return { anchors: { a1: new T.Vector3(-1.9, 2.1, 0), a2: new T.Vector3(1.9, 3.5, 0) },
        tickers: [function (t) {
          var k = (t * 0.55) % 1;
          stone.position.set(-1.6 + k * 3.1, 1.5 + Math.sin(k * Math.PI) * 1.1, 0.15);
          tickBanner(b1, t); tickBanner(b2, t);
          david.position.y = Math.abs(Math.sin(t * 2.2)) * 0.06;
        }] };
    },
    battle: function (s, P, o) {
      var b1 = banner(BLUE); b1.position.set(-6, 0, -1); s.add(b1);
      var b2 = banner(RED); b2.position.set(6, 0, -1); s.add(b2);
      var arrows = [];
      for (var i = 0; i < 4; i++) {
        var f1 = figure({ color: BLUE, spear: true, h: 1.6 - i * 0.06 });
        f1.position.set(-2.4 - i * 0.9, 0, (i % 2) * 1.2 - 0.5);
        f1.rotation.y = Math.PI / 2;
        s.add(f1);
        var f2 = figure({ color: RED, spear: true, h: 1.6 - i * 0.06 });
        f2.position.set(2.4 + i * 0.9, 0, (i % 2) * 1.2 - 0.5);
        f2.rotation.y = -Math.PI / 2;
        s.add(f2);
      }
      for (var a = 0; a < 5; a++) {
        var ar = new T.Mesh(new T.CylinderGeometry(0.015, 0.015, 0.5, 4), lam(a % 2 ? RED : BLUE));
        ar.userData.phase = a / 5;
        ar.userData.dir = a % 2 ? -1 : 1;
        s.add(ar);
        arrows.push(ar);
      }
      return { anchors: { a1: new T.Vector3(-3, 2.4, 0), a2: new T.Vector3(3, 2.4, 0) },
        tickers: [function (t) {
          tickBanner(b1, t); tickBanner(b2, t);
          for (var i = 0; i < arrows.length; i++) {
            var k = (t * 0.4 + arrows[i].userData.phase) % 1;
            var dir = arrows[i].userData.dir;
            arrows[i].position.set(dir * (-4 + k * 8), 1.4 + Math.sin(k * Math.PI) * 1.8, -0.6 + (i % 3) * 0.6);
            arrows[i].rotation.z = dir * (-Math.PI / 2 + (k - 0.5) * 0.9);
          }
        }] };
    },
    camp: function (s, P, o) {
      var t1 = tent(1.6, P.hill); t1.position.set(-2.8, 0, -1.2); s.add(t1);
      var t2 = tent(2.1, P.hill); t2.position.set(3, 0, -2); s.add(t2);
      var f = fire(1); f.position.set(0, 0, 0.6); s.add(f);
      var w1 = figure({ color: P.ink, h: 1.6 }); w1.position.set(-1.1, 0, 0.9); w1.rotation.y = 0.9; s.add(w1);
      var w2 = figure({ color: P.ink, h: 1.6 }); w2.position.set(1.2, 0, 0.9); w2.rotation.y = -0.9; s.add(w2);
      return { night: true, anchors: { a1: new T.Vector3(-1.1, 2.1, 0.9), a2: new T.Vector3(1.2, 2.1, 0.9) },
        tickers: [function (t) { tickFire(f, t); }] };
    },
    temple: function (s, P, o) {
      for (var i = 0; i < 2; i++) {
        var col = new T.Mesh(new T.CylinderGeometry(0.33, 0.38, 4.1, 10), lam(P.hill));
        col.position.set(i ? 2.6 : -2.6, 2.05, -1.6);
        s.add(col);
        var cap = new T.Mesh(new T.BoxGeometry(1.1, 0.3, 1.1), lam(P.hill));
        cap.position.set(i ? 2.6 : -2.6, 4.2, -1.6);
        s.add(cap);
      }
      var lintel = new T.Mesh(new T.BoxGeometry(6.6, 0.42, 1), lam(P.hill));
      lintel.position.set(0, 4.5, -1.6);
      s.add(lintel);
      var ark = new T.Mesh(new T.BoxGeometry(1.3, 0.75, 0.75), lam(GOLD, GOLD));
      ark.position.set(0, 0.55, -0.7);
      s.add(ark);
      var glow = new T.PointLight(0xffd27a, 1.4, 10);
      glow.position.set(0, 1.4, -0.4);
      s.add(glow);
      var p1 = figure({ color: P.ink, h: 1.65, kneel: true }); p1.position.set(-1.6, 0, 0.9); p1.rotation.y = 0.5; s.add(p1);
      return { anchors: { a1: new T.Vector3(-1.6, 1.9, 0.9) },
        tickers: [function (t) { glow.intensity = 1.1 + Math.sin(t * 1.7) * 0.5; ark.material.emissiveIntensity = 0.6 + Math.sin(t * 1.7) * 0.3; }] };
    },
    throne: function (s, P, o) {
      var dais = new T.Mesh(new T.BoxGeometry(4.4, 0.4, 3), lam(P.hill));
      dais.position.y = 0.2;
      s.add(dais);
      var seat = new T.Mesh(new T.BoxGeometry(1.1, 1.7, 0.5), lam(P.hill));
      seat.position.set(0, 1.25, -0.9);
      s.add(seat);
      var king = figure({ color: P.ink, crown: true, h: 1.75 });
      king.position.set(0, 0.4, -0.3);
      s.add(king);
      var c1 = figure({ color: P.ink, h: 1.5 }); c1.position.set(-2.9, 0, 1.4); c1.rotation.y = 0.6; s.add(c1);
      var c2 = figure({ color: P.ink, h: 1.5 }); c2.position.set(2.9, 0, 1.4); c2.rotation.y = -0.6; s.add(c2);
      var b1 = banner(BLUE); b1.position.set(-4.4, 0, -0.5); s.add(b1);
      var b2 = banner(BLUE); b2.position.set(4.4, 0, -0.5); s.add(b2);
      return { anchors: { a1: new T.Vector3(0, 2.9, -0.3), a2: new T.Vector3(-2.9, 2, 1.4) },
        tickers: [function (t) { tickBanner(b1, t); tickBanner(b2, t); }] };
    },
    wilderness: function (s, P, o) {
      rocksAndShrubs(s, P, 14);
      var cave = new T.Mesh(new T.SphereGeometry(2.6, 14, 10, 0, Math.PI), lam(P.hill));
      cave.position.set(4.2, 0, -3);
      cave.rotation.y = -Math.PI / 2 - 0.6;
      s.add(cave);
      var mouth = new T.Mesh(new T.CircleGeometry(1.1, 12), new T.MeshBasicMaterial({ color: 0x0c0a06 }));
      mouth.position.set(3.1, 0.9, -1.9);
      mouth.lookAt(0, 1, 6);
      s.add(mouth);
      var d = figure({ color: P.ink, staff: true, h: 1.7 });
      d.position.set(-1.6, 0, 0.6);
      d.rotation.y = 0.7;
      s.add(d);
      return { night: true, anchors: { a1: new T.Vector3(-1.6, 2.2, 0.6) },
        tickers: [function (t) { d.position.y = Math.abs(Math.sin(t * 1.1)) * 0.04; }] };
    },
    travel: function (s, P, o) {
      rocksAndShrubs(s, P, 8);
      var caravan = new T.Group();
      var lead = figure({ color: P.ink, staff: true, h: 1.7 });
      caravan.add(lead);
      for (var i = 1; i < 3; i++) {
        var w = figure({ color: P.ink, h: 1.5 });
        w.position.x = -i * 1.1;
        caravan.add(w);
      }
      var donkey = new T.Group();
      var body = new T.Mesh(new T.BoxGeometry(0.9, 0.45, 0.4), lam(P.ink));
      body.position.y = 0.62;
      donkey.add(body);
      var neck = new T.Mesh(new T.CylinderGeometry(0.08, 0.1, 0.55, 6), lam(P.ink));
      neck.position.set(0.5, 0.95, 0);
      neck.rotation.z = -0.7;
      donkey.add(neck);
      for (var l = 0; l < 4; l++) {
        var leg = new T.Mesh(new T.CylinderGeometry(0.045, 0.045, 0.42, 5), lam(P.ink));
        leg.position.set(l < 2 ? 0.32 : -0.32, 0.21, l % 2 ? 0.14 : -0.14);
        donkey.add(leg);
      }
      donkey.position.x = -2.4;
      caravan.add(donkey);
      caravan.rotation.y = Math.PI / 2 * 0.0;
      s.add(caravan);
      return { anchors: { a1: new T.Vector3(0, 2.2, 0) },
        tickers: [function (t) {
          var x = ((t * 0.55) % 16) - 8;
          caravan.position.x = x;
          caravan.children.forEach(function (c, i) { c.position.y = Math.abs(Math.sin(t * 3 + i)) * 0.06; });
        }],
        anchorFollow: function (a) { return a.caravan; }, caravan: caravan };
    },
    mourning: function (s, P, o) {
      var m1 = figure({ color: P.ink, h: 1.7, kneel: true }); m1.position.set(-1, 0, 0.4); s.add(m1);
      var m2 = figure({ color: P.ink, h: 1.6, kneel: true }); m2.position.set(1.1, 0, 0.6); m2.rotation.y = Math.PI; s.add(m2);
      var bier = new T.Mesh(new T.BoxGeometry(1.9, 0.14, 0.6), lam(P.hill));
      bier.position.set(0, 0.35, -0.4);
      s.add(bier);
      // rain
      var g = new T.BufferGeometry();
      var drops = [];
      for (var i = 0; i < 220; i++) drops.push((Math.random() - 0.5) * 24, Math.random() * 12, (Math.random() - 0.5) * 16);
      g.setAttribute("position", new T.Float32BufferAttribute(drops, 3));
      var rain = new T.Points(g, new T.PointsMaterial({ color: 0x8c96a8, size: 0.06, transparent: true, opacity: 0.6 }));
      s.add(rain);
      return { night: true, anchors: { a1: new T.Vector3(-1, 1.6, 0.4), a2: new T.Vector3(1.1, 1.6, 0.6) },
        tickers: [function (t) {
          var pos = rain.geometry.attributes.position;
          for (var i = 0; i < pos.count; i++) {
            var y = pos.getY(i) - 0.14;
            pos.setY(i, y < 0 ? 12 : y);
          }
          pos.needsUpdate = true;
        }] };
    },
    siege: function (s, P, o) {
      wall(s, P, true);
      var smokes = [];
      for (var i = 0; i < 3; i++) {
        var sm = smokeColumn(9);
        sm.position.set(-2.5 + i * 2.4, 1.6, -5);
        s.add(sm);
        smokes.push(sm);
      }
      var ember = new T.PointLight(0xff7a33, 0.9, 12);
      ember.position.set(0, 2.2, -4.4);
      s.add(ember);
      for (var k = 0; k < 3; k++) {
        var at = figure({ color: BLUE, spear: true, h: 1.6 });
        at.position.set(-2.2 + k * 1.6, 0, 2.2 + (k % 2) * 0.9);
        s.add(at);
      }
      return { anchors: { a1: new T.Vector3(-2.2, 2.1, 2.2) },
        tickers: [function (t) {
          for (var i = 0; i < smokes.length; i++) tickSmoke(smokes[i], t + i * 2.1);
          ember.intensity = 0.7 + Math.abs(Math.sin(t * 5.2)) * 0.5;
        }] };
    },
    feast: function (s, P, o) {
      var table = new T.Mesh(new T.BoxGeometry(4.6, 0.16, 1.1), lam(P.hill));
      table.position.y = 0.78;
      s.add(table);
      for (var i = 0; i < 2; i++) {
        var legm = new T.Mesh(new T.BoxGeometry(0.16, 0.7, 0.9), lam(P.hill));
        legm.position.set(i ? 1.9 : -1.9, 0.35, 0);
        s.add(legm);
      }
      for (var c = 0; c < 3; c++) {
        var cup = new T.Mesh(new T.CylinderGeometry(0.09, 0.06, 0.2, 8), lam(GOLD, GOLD));
        cup.position.set(-1.2 + c * 1.2, 0.96, 0);
        s.add(cup);
      }
      var f = fire(0.7); f.position.set(0, 0.86, -0.25); s.add(f);
      var h1 = figure({ color: P.ink, h: 1.65 }); h1.position.set(-3.1, 0, 0.8); h1.rotation.y = 0.7; s.add(h1);
      var h2 = figure({ color: P.ink, h: 1.65 }); h2.position.set(3.1, 0, 0.8); h2.rotation.y = -0.7; s.add(h2);
      return { night: true, anchors: { a1: new T.Vector3(-3.1, 2.1, 0.8), a2: new T.Vector3(3.1, 2.1, 0.8) },
        tickers: [function (t) { tickFire(f, t); }] };
    },
    altar: function (s, P, o) {
      rocksAndShrubs(s, P, 6);
      var base = new T.Mesh(new T.BoxGeometry(1.8, 0.9, 1.3), lam(P.hill));
      base.position.y = 0.45;
      s.add(base);
      var slab = new T.Mesh(new T.BoxGeometry(2.2, 0.22, 1.6), lam(P.hill));
      slab.position.y = 1;
      s.add(slab);
      var f = fire(2.1);
      f.position.y = 1.1;
      s.add(f);
      var sm = smokeColumn(8);
      sm.position.set(0, 2.1, 0);
      s.add(sm);
      var p = figure({ color: P.ink, staff: true, h: 1.75 });
      p.position.set(-2.3, 0, 1);
      p.rotation.y = 0.7;
      s.add(p);
      return { night: true, anchors: { a1: new T.Vector3(-2.3, 2.3, 1) },
        tickers: [function (t) { tickFire(f, t); tickSmoke(sm, t); }] };
    },
    scroll: function (s, P, o) {
      var grp = new T.Group();
      var sheet = new T.Mesh(new T.PlaneGeometry(2.6, 1.7, 1, 1), new T.MeshLambertMaterial({ color: 0xefe3c6, side: T.DoubleSide }));
      grp.add(sheet);
      for (var i = 0; i < 2; i++) {
        var roll = new T.Mesh(new T.CylinderGeometry(0.13, 0.13, 1.9, 10), lam(0x8a7452));
        roll.position.x = i ? 1.33 : -1.33;
        grp.add(roll);
      }
      for (var ln = 0; ln < 5; ln++) {
        var line = new T.Mesh(new T.PlaneGeometry(1.9 - (ln % 3) * 0.25, 0.055), new T.MeshBasicMaterial({ color: 0x6b583a }));
        line.position.set(0, 0.55 - ln * 0.27, 0.01);
        grp.add(line);
      }
      grp.position.set(0, 2.1, 0);
      s.add(grp);
      var f = fire(0.6);
      f.position.set(-3.1, 0.55, 1.4);
      s.add(f);
      var stand = new T.Mesh(new T.BoxGeometry(0.35, 0.55, 0.35), lam(P.hill));
      stand.position.set(-3.1, 0.27, 1.4);
      s.add(stand);
      return { night: true, radius: 8, anchors: {},
        tickers: [function (t) {
          grp.position.y = 2.1 + Math.sin(t * 1.3) * 0.1;
          grp.rotation.y = Math.sin(t * 0.5) * 0.22;
          tickFire(f, t);
        }] };
    }
  };

  // ---- label overlay ----------------------------------------------------------
  var LABEL_CSS_ID = "stage3d-styles";
  function ensureLabelStyles() {
    if (document.getElementById(LABEL_CSS_ID)) return;
    var st = document.createElement("style");
    st.id = LABEL_CSS_ID;
    st.textContent =
      ".stage3d-label{position:absolute;transform:translate(-50%,-100%);font-family:Georgia,serif;" +
      "font-size:.78rem;letter-spacing:.12em;text-transform:uppercase;color:rgba(70,52,22,.85);" +
      "pointer-events:none;text-shadow:0 1px 3px rgba(246,239,223,.8);white-space:nowrap;}" +
      "@media (prefers-color-scheme: dark){.stage3d-label{color:rgba(230,210,160,.85);text-shadow:0 1px 3px rgba(0,0,0,.7);}}";
    document.head.appendChild(st);
  }

  // ---- the takeover -------------------------------------------------------------
  function render3d(elHost, type, opts) {
    opts = opts || {};
    var box = elHost.querySelector(".stage-box");
    if (!box) {
      // let the 2D renderer build the box shell (keeps its gradient + caption)
      render2d(elHost, type, { label: opts.label });
      box = elHost.querySelector(".stage-box");
      if (!box) return;
    }
    // clear everything but keep the shell
    while (box.firstChild) box.removeChild(box.firstChild);
    ensureLabelStyles();

    var r = getRenderer();
    stopLoop();
    box.appendChild(canvas);

    var w = Math.max(80, box.clientWidth || 480), h = Math.max(60, box.clientHeight || 360);
    r.setSize(w, h, false);

    var build = SCENES[type] || SCENES.scroll;
    var night = !!NIGHT[type];
    var P = palette(night);
    var scene = new T.Scene();
    var probe = build(scene, P, opts);
    scene.background = new T.Color(P.sky);
    scene.fog = new T.Fog(P.fog, 14, 46);
    terrain(scene, P);
    lights(scene, P);
    if (night) starField(scene);

    var camera = new T.PerspectiveCamera(42, w / h, 0.1, 120);

    // name labels over the lead figures
    var labels = [];
    var actors = opts.actors || [];
    var anchorKeys = ["a1", "a2"];
    for (var i = 0; i < 2; i++) {
      var anchor = probe && probe.anchors && probe.anchors[anchorKeys[i]];
      if (!anchor || !actors[i]) continue;
      var el = document.createElement("div");
      el.className = "stage3d-label";
      el.textContent = actors[i];
      box.appendChild(el);
      labels.push({ el: el, anchor: anchor });
    }
    if (opts.label) {
      var cap = document.createElement("div");
      cap.className = "stage-label";
      cap.textContent = opts.label;
      box.appendChild(cap);
    }

    active = {
      scene: scene, camera: camera,
      tick: function (t) {
        var ts = (probe && probe.tickers) || [];
        for (var i = 0; i < ts.length; i++) ts[i](t);
      },
      labels: labels,
      baseAng: 0.25, radius: (probe && probe.radius) || 12.5, height: 4.4,
      target: new T.Vector3(0, 1.3, 0)
    };

    if (reduced) {
      // one considered frame, no motion
      active.tick(1.5);
      camera.position.set(Math.sin(0.25) * active.radius, active.height, Math.cos(0.25) * active.radius);
      camera.lookAt(active.target);
      for (var li = 0; li < labels.length; li++) {
        var v = labels[li].anchor.clone().project(camera);
        labels[li].el.style.left = ((v.x * 0.5 + 0.5) * 100) + "%";
        labels[li].el.style.top = ((-v.y * 0.5 + 0.5) * 100) + "%";
      }
      r.render(scene, camera);
    } else {
      rafId = requestAnimationFrame(loop);
    }
    return box;
  }

  // Take over only if WebGL actually works here.
  var ok = false;
  try {
    if (T) {
      var test = document.createElement("canvas");
      ok = !!(test.getContext("webgl2") || test.getContext("webgl") || test.getContext("experimental-webgl"));
    }
  } catch (e) { ok = false; }

  if (ok) {
    window.Stage.render = function (elHost, type, opts) {
      try {
        return render3d(elHost, type, opts);
      } catch (e) {
        try { stopLoop(); } catch (e2) {}
        return render2d(elHost, type, opts); // the parchment never goes dark
      }
    };
    window.Stage.mode = "3d";
  } else {
    window.Stage.mode = "2d";
  }

  window.Stage3D = { stop: stopLoop };
})();
