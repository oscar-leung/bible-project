/* app.js — window.App: view switching + cross-view links.
   Plain script global, no modules. See ARCHITECTURE.md. */

(function () {
  "use strict";

  var VIEWS = ["story", "map", "characters", "timeline", "game"];

  window.App = {
    showView: function (name) {
      if (VIEWS.indexOf(name) === -1) return;

      var views = document.querySelectorAll(".view");
      for (var i = 0; i < views.length; i++) {
        views[i].classList.toggle("active", views[i].id === "view-" + name);
      }

      var tabs = document.querySelectorAll(".tab");
      for (var j = 0; j < tabs.length; j++) {
        tabs[j].classList.toggle("active", tabs[j].getAttribute("data-view") === name);
      }
    },

    focusLocation: function (locId) {
      window.App.showView("map");
      if (window.MapView && typeof window.MapView.focus === "function") {
        window.MapView.focus(locId);
      }
    },

    goToChapter: function (num) {
      window.App.showView("story");
      if (window.StoryView && typeof window.StoryView.show === "function") {
        window.StoryView.show(num);
      }
    }
  };

  document.addEventListener("DOMContentLoaded", function () {
    // Wire tab clicks.
    var tabs = document.querySelectorAll(".tab");
    for (var i = 0; i < tabs.length; i++) {
      (function (tab) {
        tab.addEventListener("click", function () {
          window.App.showView(tab.getAttribute("data-view"));
        });
      })(tabs[i]);
    }

    // Init each view module independently — one broken/missing module
    // must not take down the rest.
    var modules = [
      ["StoryView", window.StoryView],
      ["MapView", window.MapView],
      ["CharactersView", window.CharactersView],
      ["TimelineView", window.TimelineView],
      ["GameView", window.GameView]
    ];
    for (var m = 0; m < modules.length; m++) {
      try {
        var mod = modules[m][1];
        if (mod && typeof mod.init === "function") {
          mod.init();
        } else {
          console.error("App: module " + modules[m][0] + " missing or has no init()");
        }
      } catch (err) {
        console.error("App: " + modules[m][0] + ".init() failed", err);
      }
    }

    window.App.showView("story");
  });
})();
