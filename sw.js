// sw.js — offline service worker for Samuel & Kings (PWA)
// Strategy: precache the whole app on install (it is small and static),
// then serve cache-first with a background network refresh (stale-while-
// revalidate), so the app opens instantly and offline, yet picks up new
// deploys on the next visit.
var CACHE = "samuel-kings-v5";
var CORE = [
  ".", "index.html", "styles.css", "manifest.webmanifest",
  "icons/icon-192.png", "icons/icon-512.png", "icons/icon-maskable-512.png",
  "data/samuel1-chapters.js", "data/samuel2-chapters.js", "data/characters.js",
  "data/locations.js", "data/journeys.js", "data/timeline.js", "data/quiz.js",
  "data/battle-gibeon.js", "data/battle-rephaim.js", "data/battle-ephraim.js",
  "data/family.js", "data/dialogue.js", "data/study-notes.js",
  "data/kings1-chapters.js", "data/kings1-guide.js", "data/kings1-characters.js", "data/kings1-quiz.js",
  "data/kings2-chapters.js", "data/kings2-guide.js", "data/kings2-characters.js", "data/kings2-quiz.js",
  "data/kings-faq.js", "data/community.js", "data/kings1-world.js", "data/kings2-world.js",
  "js/realm.js", "js/study.js",
  "js/app.js", "js/story.js", "js/map.js", "js/characters.js", "js/timeline.js",
  "js/game.js", "js/battle.js", "js/battle-rephaim.js", "js/battle-ephraim.js",
  "js/battlehub.js", "js/familytree.js", "js/voices.js", "js/eastereggs.js"
];

self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(CACHE).then(function (c) { return c.addAll(CORE); })
      .then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.map(function (k) {
        if (k !== CACHE) return caches.delete(k);
      }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function (e) {
  if (e.request.method !== "GET") return;
  var url = new URL(e.request.url);
  if (url.origin !== self.location.origin) return;
  e.respondWith(
    caches.match(e.request).then(function (cached) {
      var refresh = fetch(e.request).then(function (res) {
        if (res && res.ok) {
          var copy = res.clone();
          caches.open(CACHE).then(function (c) { c.put(e.request, copy); });
        }
        return res;
      }).catch(function () { return cached; });
      return cached || refresh;
    })
  );
});
