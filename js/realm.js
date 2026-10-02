/* js/realm.js — window.Realm
 * The app wears two liveries: the Book of Samuel (lapis ink, David's lyre)
 * and the Books of Kings (Tyrian purple, a gold crown). StoryView calls
 * Realm.set(bookId) whenever it renders; the choice sticks across tabs and
 * reloads (localStorage), so the map, quest and timeline keep the livery of
 * the book you are reading. Styles live in styles.css under [data-realm].
 */
(function () {
  "use strict";
  var KEY = "realm.current";
  var TEXT = {
    samuel: { title: "The Book of Samuel", sub: "The Bible Project · Book of Samuel", doc: "The Book of Samuel — An Interactive Journey" },
    kings: { title: "The Books of Kings", sub: "The Bible Project · Books of Kings", doc: "The Books of Kings — An Interactive Journey" }
  };
  var current = null;

  function realmFor(bookId) {
    return String(bookId || "").indexOf("kings") === 0 ? "kings" : "samuel";
  }

  function apply(realm) {
    if (realm === current) return;
    current = realm;
    try { document.documentElement.setAttribute("data-realm", realm); } catch (e) {}
    var t = TEXT[realm];
    var title = document.getElementById("realm-title");
    var sub = document.getElementById("realm-subtitle");
    if (title) title.textContent = t.title;
    if (sub) sub.textContent = t.sub;
    try { document.title = t.doc; } catch (e) {}
    try { localStorage.setItem(KEY, realm); } catch (e) {}
  }

  // Before first paint of the views: restore the last realm.
  var saved = null;
  try { saved = localStorage.getItem(KEY); } catch (e) {}
  if (saved === "kings" || saved === "samuel") {
    try { document.documentElement.setAttribute("data-realm", saved); } catch (e) {}
  }

  window.Realm = {
    set: function (bookId) { apply(realmFor(bookId)); },
    get: function () { return current || saved || "samuel"; }
  };
})();
