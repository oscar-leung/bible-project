// data/battle-ziklag.js — window.BATTLE_ZIKLAG (Game Dev)
// Scene data for "The Raid on Ziklag" — an interactive retelling of 1 Samuel 30:
// the burned town, the brook Besor, the Egyptian, the dawn-to-dusk rout, and
// David's statute of sharing. All quotes KJV.
//
// The staging follows the beat structure of the Ziklag-aftermath and
// Besor-crossing reenactment scenes in Eric's books-of-samuel project
// (github.com/elinxie/books-of-samuel), which this family study walks
// alongside. Historical side-notes are condensed from that project's
// entity notes, with thanks.
window.BATTLE_ZIKLAG = {
  id: "battle-ziklag",
  title: "The Raid on Ziklag",
  subtitle: "1 Samuel 30 — everything lost at dawn, everything recovered by dusk",
  chapter: 30,
  book: "samuel1",
  mapLocId: "ziklag",
  stages: [
    { id: "ashes", label: "The Smoking Town", emblem: "🔥" },
    { id: "ephod", label: "The Ephod Answers", emblem: "🙏" },
    { id: "besor", label: "The Brook Besor", emblem: "🏞️" },
    { id: "rout", label: "Twilight to Evening", emblem: "⚔️" },
    { id: "statute", label: "Share Alike", emblem: "⚖️" }
  ],

  /* ---------------- Stage 1: THE SMOKING TOWN ---------------- */
  ashes: {
    heading: "The Smoking Town",
    paragraphs: [
      "Three days' march from the Philistine muster at Aphek, David's six hundred come over the last rise and see the smoke. Ziklag — the frontier town Achish gave them, the town holding every wife, son, and daughter they have — is burned to its stones. The Amalekites struck while the fighting men were away.",
      "They search the ruin and find no bodies. That is the strange mercy and the deeper dread of it: the raiders slew no one. They took everyone. Ahinoam. Abigail. All of them — alive, somewhere south, moving further away with every hour.",
      "The six hundred weep until there is no strength left in them to weep. And then grief curdles into something darker: the men speak of stoning David. Every one of them is bitter in soul for his own sons and daughters — and he is the captain who led them away and left the town unguarded."
    ],
    keyVerse: {
      ref: "1 Samuel 30:3–4",
      text: "So David and his men came to the city, and, behold, it was burned with fire; and their wives, and their sons, and their daughters, were taken captives. Then David and the people that were with him lifted up their voice and wept, until they had no more power to weep."
    },
    decision: {
      prompt: "The men are reaching for stones. Everything is gone. What does David do?",
      despair: {
        label: "💔 There is nothing left — let come what comes",
        correction: "For one black moment it could go that way — the greatest soul in Israel ending under a hail of his own men's stones in a burned town. But the verse turns on a single word: BUT. “And David was greatly distressed; for the people spake of stoning him… but David encouraged himself in the LORD his God” (30:6). He does not argue with the mob. He does not run. He goes and finds his God first."
      },
      strengthen: {
        label: "🙏 Strengthen himself in the LORD his God",
        response: "“And David was greatly distressed; for the people spake of stoning him, because the soul of all the people was grieved, every man for his sons and for his daughters: but David encouraged himself in the LORD his God” (30:6). With no psalm-book, no sanctuary, no friendly face in six hundred — he finds the strength that is not in the circumstances."
      }
    },
    historianNote: {
      title: "Historian's note 📜 — A town nobody can find",
      text: "Ziklag's real site is still disputed — several tells compete for the name, and no digging has settled it. What the narrative fixes instead is its character: a small early-Iron-Age frontier town of the Negev, mudbrick houses on stone footings, granted to David by Achish of Gath (27:6) and held by his men's families while the fighting force marched. The raid is Amalek's old way of war — strike the undefended rear (Deuteronomy 25:17–18) — and the detail that no one was killed is economics, not kindness: captives were the cargo."
    }
  },

  /* ---------------- Stage 2: THE EPHOD ANSWERS ---------------- */
  ephod: {
    heading: "The Ephod Answers",
    intro: [
      "Strengthened, David does what he has done at every crossroads since the wilderness: he asks before he moves. Abiathar the priest — the lone survivor of Nob — brings the ephod.",
      "Around them stand six hundred exhausted, grieving, furious men who have just marched three days and found their world in ashes. Whatever the answer is, it must be worth following on empty legs."
    ],
    oracle: {
      ref: "1 Samuel 30:8",
      text: "And David enquired at the LORD, saying, Shall I pursue after this troop? shall I overtake them? And he answered him, Pursue: for thou shalt surely overtake them, and without fail recover all."
    },
    flavor: "Pursue. Overtake. Recover all. Three promises, and not one hour to waste on them.",
    historianNote: {
      title: "Historian's note 📜 — Why the ephod matters here",
      text: "This is the same pattern as Keilah (23:9–12) and, later, Rephaim: David treats inquiry as the first act of war, not the last resort. The ephod came to him through tragedy — Abiathar fled to David with it after Saul massacred the priests of Nob (22:20–23; 23:6) — so the very instrument of guidance in his camp is a standing reminder of what Saul's kingship became without it."
    }
  },

  /* ---------------- Stage 3: THE BROOK BESOR ---------------- */
  besor: {
    heading: "The Brook Besor",
    intro: [
      "South they go, six hundred men on three days' march-weariness, down into the great wadi of the western Negev — the brook Besor. And there two hundred of them simply stop. Their legs are done. They cannot ford the stream.",
      "A third of the army, finished — with the trail going cold on the far bank. The decision is the commander's."
    ],
    decision: {
      prompt: "Two hundred men cannot cross. What does David do?",
      drive: {
        label: "😤 Drive them on — every sword is needed, their families are out there too",
        correction: "A lesser captain would have tried, and arrived at the raiders' camp with six hundred stumbling men instead of four hundred fighting ones. David reads the moment like the shepherd he is: the spent two hundred stay with the baggage at the water, and the pursuit goes on lighter and faster. “But David pursued, he and four hundred men: for two hundred abode behind, which were so faint that they could not go over the brook Besor” (30:10). Remember these two hundred — the chapter is not done with them."
      },
      rest: {
        label: "🏞️ Let the spent two hundred stay with the baggage",
        response: "“But David pursued, he and four hundred men: for two hundred abode behind, which were so faint that they could not go over the brook Besor” (30:10). No speech, no shame — the weary hold the water and the baggage, and four hundred cross. Remember these two hundred — the chapter is not done with them."
      }
    },
    egyptian: {
      intro: "In the open country beyond the wadi they find a young man collapsed in a field — three days and nights without bread or water. An Egyptian, slave of an Amalekite, dumped by his master the moment sickness made him dead weight. Revive him:",
      items: [
        { emoji: "🍞", label: "Bread", line: "“And they found an Egyptian in the field, and brought him to David, and gave him bread, and he did eat” (30:11)." },
        { emoji: "💧", label: "Water", line: "“…and they made him drink water” (30:11)." },
        { emoji: "🌰", label: "A cake of figs", line: "“And they gave him a piece of a cake of figs…” (30:12)." },
        { emoji: "🍇", label: "Two clusters of raisins", line: "“…and two clusters of raisins: and when he had eaten, his spirit came again to him” (30:12)." }
      ],
      revived: "His spirit comes again to him — and with it, everything David needs to know. His master's company raided the Negev and Ziklag; they are south, heavy with spoil, feeling safe. One oath — “neither kill me, nor deliver me to my master” (30:15) — and the abandoned slave becomes the guide to the whole campaign.",
      lesson: "The Amalekite threw a sick slave away and it cost him his army. David spent an hour and a meal on a dying stranger and it bought him everything. The chapter never says it out loud; it just lets the two masters stand side by side."
    },
    historianNote: {
      title: "Historian's note 📜 — The wadi",
      text: "The Besor is widely identified with Nahal Besor, the biggest wadi system of the western Negev — a real obstacle when flowing, a sand-and-gravel trench when dry, either way brutal to cross at the end of a forced march. Depending on which candidate site is adopted for Ziklag, the crossing lies roughly 15–25 km south of the burned town."
    }
  },

  /* ---------------- Stage 4: TWILIGHT TO EVENING ---------------- */
  rout: {
    heading: "From Twilight to the Evening of the Next Day",
    intro: [
      "The Egyptian leads them down — and there the raiders are, spread abroad over all the ground, eating and drinking and dancing in the glow of their fires, fat with the spoil of Ziklag and the whole Philistine and Judean south.",
      "No sentries worth the name. No formation. A camp that believes the only army in range is three days away and broken. Strike the fires while they burn."
    ],
    gameHint: "The camp feasts in waves — strike each fire while it blazes. Four hundred of yours, against a host that never saw you coming.",
    strikeVerse: {
      ref: "1 Samuel 30:17",
      text: "And David smote them from the twilight even unto the evening of the next day: and there escaped not a man of them, save four hundred young men, which rode upon camels, and fled."
    },
    recovery: {
      ref: "1 Samuel 30:18–19",
      text: "And David recovered all that the Amalekites had carried away: and David rescued his two wives. And there was nothing lacking to them, neither small nor great, neither sons nor daughters, neither spoil, nor any thing that they had taken to them: David recovered all."
    },
    tally: {
      left: { name: "Recovered", num: "ALL", detail: "every wife, every son, every daughter, all the spoil — nothing lacking, small or great" },
      right: { name: "Escaped", num: "400", detail: "young men on camels — the only Amalekites to outrun the promise of 30:8" }
    },
    easterEgg: {
      clicksNeeded: 3,
      title: "🐪 The camel-riders' footnote",
      text: "Four hundred young Amalekites escape on camels — and the number is a dark mirror: exactly the count of David's men who crossed the Besor. Amalek survives this day only in the size of the force that broke it. An Amalekite will still manage to talk his way into one more chapter — bringing Saul's crown to Ziklag in 2 Samuel 1, with a story that costs him his life."
    }
  },

  /* ---------------- Stage 5: SHARE ALIKE ---------------- */
  statute: {
    heading: "Share and Share Alike",
    intro: [
      "Back north over the Besor, driving flocks and herds — “This is David's spoil,” the drovers call. And at the water wait the two hundred who could not cross.",
      "Then the ugliness surfaces. The narrative calls them by name: “the wicked men and men of Belial, of those that went with David.” Their proposal: the two hundred get their wives and children back and nothing else. No spoil for the men who sat with the baggage."
    ],
    decision: {
      prompt: "Four hundred fought; two hundred guarded the baggage. Who gets the spoil?",
      fighters: {
        label: "⚔️ The spoil belongs to the men who bled for it",
        correction: "It sounds like justice — it is how every raider-band in the Negev splits its take. But David has just watched God hand him a victory he did not earn, by way of a slave someone else threw away. “Ye shall not do so, my brethren, with that which the LORD hath given us… as his part is that goeth down to the battle, so shall his part be that tarrieth by the stuff: they shall part alike” (30:23–24). The weary who held the water bank share even with the swords."
      },
      alike: {
        label: "⚖️ As his part that goes to battle, so his part that stays by the stuff",
        response: "“For who will hearken unto you in this matter? but as his part is that goeth down to the battle, so shall his part be that tarrieth by the stuff: they shall part alike” (30:24). The grace David has just received, he immediately legislates. “And it was so from that day forward, that he made it a statute and an ordinance for Israel unto this day” (30:25)."
      }
    },
    gifts: {
      intro: "And then David does something no mere raid-captain would think of: he tithes the victory outward. Parcels of the spoil go north “unto the elders of Judah, even to his friends” — to Bethel, Ramoth, Jattir, Aroer, Eshtemoa, Hebron, “and to all the places where David himself and his men were wont to haunt” (30:26–31).",
      note: "Every town that ever sheltered the outlaw gets a share of his triumph. It is gratitude — and it is statecraft. In two chapters, the elders of Judah will anoint him king at Hebron. These gifts are the seed of that crown."
    },
    credit: "This retelling walks the beat-line of the Ziklag-aftermath and Besor-crossing reenactment scenes in the kindred books-of-samuel project — Eric's build, gratefully followed.",
    victory: {
      title: "🌟 Recover All",
      text: "The worst day of David's wilderness years — stoned-at-dawn despair to total recovery — and not one decision in it made before asking. Three chapters from now, the man who shared the spoil with the weary will be crowned at Hebron."
    }
  }
};
