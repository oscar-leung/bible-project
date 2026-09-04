/* characters.js — window.CharactersView: card grid of the people of 1 Samuel.
   Renders into #view-characters from window.CHARACTERS. Plain script global. */

(function () {
  "use strict";

  window.CharactersView = {
    init: function () {
      var root = document.getElementById("view-characters");
      if (!root) return;
      root.innerHTML = ""; // idempotent-safe

      var heading = document.createElement("h2");
      heading.textContent = "People of 1 Samuel";
      root.appendChild(heading);

      var data = window.CHARACTERS;
      if (!data || !data.length) {
        var placeholder = document.createElement("div");
        placeholder.className = "card";
        placeholder.innerHTML =
          '<h3>Characters coming soon</h3>' +
          '<p class="muted">Character data has not loaded yet. ' +
          "Check that <code>data/characters.js</code> is present.</p>";
        root.appendChild(placeholder);
        return;
      }

      var intro = document.createElement("p");
      intro.className = "muted";
      intro.textContent =
        "Prophets, priests, kings, and shepherds — tap a chapter to read their story.";
      root.appendChild(intro);

      var grid = document.createElement("div");
      grid.className = "grid";

      for (var i = 0; i < data.length; i++) {
        var c = data[i];

        var card = document.createElement("div");
        card.className = "card char-card";

        var name = document.createElement("h3");
        name.textContent = c.name || "Unknown";
        card.appendChild(name);

        if (c.title) {
          var title = document.createElement("p");
          title.className = "char-title";
          title.textContent = c.title;
          card.appendChild(title);
        }

        if (c.description) {
          var desc = document.createElement("p");
          desc.textContent = c.description;
          card.appendChild(desc);
        }

        if (c.chapters && c.chapters.length) {
          var chapWrap = document.createElement("div");
          chapWrap.className = "char-chapters";

          var label = document.createElement("span");
          label.className = "chips-label";
          label.textContent = "Appears in";
          chapWrap.appendChild(label);

          for (var j = 0; j < c.chapters.length; j++) {
            (function (num) {
              var chip = document.createElement("button");
              chip.className = "chip";
              chip.textContent = "Ch. " + num;
              chip.addEventListener("click", function () {
                if (window.App) window.App.goToChapter(num);
              });
              chapWrap.appendChild(chip);
            })(c.chapters[j]);
          }
          card.appendChild(chapWrap);
        }

        grid.appendChild(card);
      }

      root.appendChild(grid);
    }
  };
})();
