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
      heading.textContent = "People of 1 & 2 Samuel";
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

        var hasS1 = c.chapters && c.chapters.length;
        var hasK1 = c.kings1 && c.kings1.length;
        var hasK2 = c.kings2 && c.kings2.length;
        if (hasS1 || hasK1 || hasK2) {
          var chapWrap = document.createElement("div");
          chapWrap.className = "char-chapters";

          var label = document.createElement("span");
          label.className = "chips-label";
          label.textContent = "Appears in";
          chapWrap.appendChild(label);

          // 1 Samuel chips keep their original "Ch. N" label; 1 Kings chips
          // are prefixed so the two books can't be confused.
          var refs = [];
          for (var j = 0; hasS1 && j < c.chapters.length; j++) refs.push([c.chapters[j], undefined, "Ch. "]);
          for (var k = 0; hasK1 && k < c.kings1.length; k++) refs.push([c.kings1[k], "kings1", "1 Kgs "]);
          for (var k2 = 0; hasK2 && k2 < c.kings2.length; k2++) refs.push([c.kings2[k2], "kings2", "2 Kgs "]);
          for (var r = 0; r < refs.length; r++) {
            (function (num, book, prefix) {
              var chip = document.createElement("button");
              chip.className = "chip";
              chip.textContent = prefix + num;
              chip.addEventListener("click", function () {
                if (window.App) window.App.goToChapter(num, book);
              });
              chapWrap.appendChild(chip);
            })(refs[r][0], refs[r][1], refs[r][2]);
          }
          card.appendChild(chapWrap);
        }

        grid.appendChild(card);
      }

      root.appendChild(grid);
    }
  };
})();
