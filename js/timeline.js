/* timeline.js — window.TimelineView: vertical timeline of 1 Samuel events.
   Renders into #view-timeline from window.TIMELINE. Plain script global. */

(function () {
  "use strict";

  window.TimelineView = {
    init: function () {
      var root = document.getElementById("view-timeline");
      if (!root) return;
      root.innerHTML = ""; // idempotent-safe

      var heading = document.createElement("h2");
      heading.textContent = "Timeline of 1 Samuel";
      root.appendChild(heading);

      var data = window.TIMELINE;
      if (!data || !data.length) {
        var placeholder = document.createElement("div");
        placeholder.className = "card";
        placeholder.innerHTML =
          '<h3>Timeline coming soon</h3>' +
          '<p class="muted">Timeline data has not loaded yet. ' +
          "Check that <code>data/timeline.js</code> is present.</p>";
        root.appendChild(placeholder);
        return;
      }

      var intro = document.createElement("p");
      intro.className = "muted";
      intro.textContent =
        "From Hannah's prayer to the death of Saul — dates are approximate. " +
        "Tap a chapter to read the account.";
      root.appendChild(intro);

      var list = document.createElement("div");
      list.className = "timeline";

      for (var i = 0; i < data.length; i++) {
        var entry = data[i];

        var item = document.createElement("div");
        item.className = "timeline-item";

        var year = document.createElement("div");
        year.className = "timeline-year";
        year.textContent = entry.year || "";
        item.appendChild(year);

        var event = document.createElement("p");
        event.className = "timeline-event";
        event.textContent = entry.event || "";
        item.appendChild(event);

        if (entry.chapters && entry.chapters.length) {
          var chipRow = document.createElement("div");
          for (var j = 0; j < entry.chapters.length; j++) {
            (function (num, book) {
              var chip = document.createElement("button");
              chip.className = "chip";
              chip.textContent = (book === "kings1" ? "1 Kgs " : book === "kings2" ? "2 Kgs " : "Ch. ") + num;
              chip.addEventListener("click", function () {
                if (window.App) window.App.goToChapter(num, book);
              });
              chipRow.appendChild(chip);
            })(entry.chapters[j], entry.book);
          }
          item.appendChild(chipRow);
        }

        list.appendChild(item);
      }

      root.appendChild(list);
    }
  };
})();
