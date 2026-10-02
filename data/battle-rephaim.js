// data/battle-rephaim.js — window.BATTLE_REPHAIM (Game Dev)
// Scene data for "The Valley of Rephaim" — an interactive retelling of 2 Samuel 5:17–25:
// the double Philistine attack after David is anointed over all Israel.
// Plain script global, no modules. All quotes KJV. Rendered by js/battle-rephaim.js.
window.BATTLE_REPHAIM = {
  id: "battle-rephaim",
  title: "The Valley of Rephaim",
  subtitle: "2 Samuel 5:17–25 — twice the Philistines come up; twice David asks first",
  chapter: 5,
  book: "samuel2",
  mapLocId: "jerusalem",
  stages: [
    { id: "context",   label: "The King in the Hold", emblem: "👑" },
    { id: "perazim",   label: "Baal-perazim",         emblem: "🌊" },
    { id: "mulberry",  label: "The Mulberry Trees",   emblem: "🌳" },
    { id: "aftermath", label: "From Geba to Gazer",   emblem: "🎇" }
  ],

  /* ---------------- Stage 1: THE KING IN THE HOLD ---------------- */
  context: {
    heading: "The King in the Hold",
    paragraphs: [
      "Seven years and six months David has reigned in Hebron over Judah alone. Now the elders of all Israel come to him, and they anoint him king over Israel (2 Samuel 5:1–3). He marches on the Jebusite fortress and takes it: “Nevertheless David took the strong hold of Zion: the same is the city of David” (5:7).",
      "The Philistines could live with a divided Israel — a rebel captain in Hebron quarrelling with Saul's heirs suited them well. A single crowned king in a captured mountain fortress is another matter entirely. The old overlords of the hill country move at once.",
      "Notice what David does not do. The new king of all Israel, fresh from taking an impregnable city, does not ride out to meet them. He goes down to the hold — and waits. The first battle of his united kingdom will not begin until he has asked a question."
    ],
    keyVerse: {
      ref: "2 Samuel 5:17",
      text: "But when the Philistines heard that they had anointed David king over Israel, all the Philistines came up to seek David; and David heard of it, and went down to the hold."
    },
    historianNote: {
      title: "Historian's note 📜 — The valley below the city",
      text: "The valley of Rephaim (“valley of the giants,” Joshua 15:8) is the broad upland plain running southwest from Jerusalem toward Bethlehem — grain country, whose harvest Isaiah could later use as a byword (Isaiah 28:21 remembers this very battle; 17:5 its fields). The name survives on the modern map: Emek Refaim is today a main street and neighborhood of southwest Jerusalem. A Philistine army camped there sat astride the Bethlehem road, splitting David's new capital from his own tribe of Judah. As for “the hold”: some readers take it as the just-captured stronghold of Zion itself, but many point to the cave-fortress of Adullam, since 2 Samuel 23:13–14 shows the Philistines garrisoned in Rephaim while David is “in an hold” by the cave of Adullam. The text lets both readings stand — either way, David begins his first war as high king by taking cover and asking counsel."
    }
  },

  /* ---------------- Stage 2: BAAL-PERAZIM ---------------- */
  perazim: {
    heading: "The Breach of Waters",
    intro: [
      "The Philistines flood up out of their coastal plain and fan out across the grain fields below Jerusalem. From the hold, David can count their fires.",
      "Around him stand the mighty men — Joab, Abishai, the thirty — veterans who have never lost with him. Every sword in the hold is loose in its sheath. The decision is yours."
    ],
    spread: {
      ref: "2 Samuel 5:18",
      text: "The Philistines also came and spread themselves in the valley of Rephaim."
    },
    decision: {
      prompt: "The host is in the valley. What does the king do first?",
      attack: {
        label: "⚔️ Strike now, before they entrench — the men are eager",
        correction: "The captains glance at one another — and then at you. This is the king who would not lift his hand against Saul without a word from the LORD, who enquired at Keilah and at Ziklag before ever he wore a crown. The sword stays sheathed a moment longer. First, the question that has won every battle David has ever fought:"
      },
      inquire: {
        label: "🙏 Enquire of the LORD before the sword is drawn",
        response: "The mighty men wait under arms while their king kneels. It has always been this way with David — Keilah, Ziklag, Hebron — the question comes before the charge. And the answer comes:"
      }
    },
    oracle: {
      ref: "2 Samuel 5:19",
      text: "And David enquired of the LORD, saying, Shall I go up to the Philistines? wilt thou deliver them into mine hand? And the LORD said unto David, Go up: for I will doubtless deliver the Philistines into thine hand."
    },
    attackButton: "⚔️ Go up — the LORD goes before",
    breachLine: "David's men come down on the Philistine line and it does not bend — it bursts. Like a dam giving way, like a wadi in flood taking a wall with it, the whole host tears open at the seam.",
    victory: {
      ref: "2 Samuel 5:20",
      text: "And David came to Baalperazim, and David smote them there, and said, The LORD hath broken forth upon mine enemies before me, as the breach of waters. Therefore he called the name of that place Baalperazim."
    },
    images: {
      text: "The rout is so sudden that the Philistines abandon what no army willingly abandons: the gods they carried into battle. The idols that were meant to guarantee victory are left standing in the wreck of the camp, and David's men gather them up.",
      quote: {
        ref: "2 Samuel 5:21",
        text: "And there they left their images, and David and his men burned them."
      },
      chronicles: {
        ref: "1 Chronicles 14:12",
        text: "And when they had left their gods there, David gave a commandment, and they were burned with fire."
      }
    },
    historianNote: {
      title: "Historian's note 📜 — “Lord of breakings forth”",
      text: "Baal-perazim means “lord (or possessor) of breakings-forth” — the name puns on the Hebrew root parats, to burst through, the same word behind the “breach of waters.” David names the place not for himself but for the One who did the breaking. And a small textual honesty about verse 21: the Hebrew of 2 Samuel says David and his men “took them away” (carried the idols off), while 1 Chronicles 14:12 says David commanded and “they were burned with fire.” The KJV translators rendered Samuel's verb as “burned,” harmonizing it toward Chronicles (their margin preserves “took them away”). The two accounts fit together naturally — carried off the field, then burned, exactly as Deuteronomy 7:5, 25 commands for captured gods — but the wording difference is real, and worth seeing with your own eyes."
    }
  },

  /* ---------------- Stage 3: THE MULBERRY TREES ---------------- */
  mulberry: {
    heading: "The Sound of a Going",
    intro: [
      "Philistia does not accept the verdict of one battle. The host re-forms on the coastal plain, marches back up the same roads, and spreads out across the same valley — as if Baal-perazim had never happened.",
      "Everything about this moment invites a shortcut. Same enemy. Same ground. And you hold yesterday's answer in your hand: “Go up: for I will doubtless deliver the Philistines into thine hand.” Why ask again, when the LORD has already spoken to this exact situation?"
    ],
    returnVerse: {
      ref: "2 Samuel 5:22",
      text: "And the Philistines came up yet again, and spread themselves in the valley of Rephaim."
    },
    decision: {
      prompt: "Same valley, same enemy. What does the king do?",
      repeat: {
        label: "⚔️ Run yesterday's play — charge them head-on, it is proven",
        correction: "It is the most natural thought in the world — and the most dangerous. Yesterday's answer was an answer, not a formula. The men who charge on the strength of a word given for another day charge alone. David of all men knows the difference between the LORD's guidance and the LORD's guarantee. He kneels again:"
      },
      inquire: {
        label: "🙏 Enquire of the LORD again — same valley or no",
        response: "This is the quiet greatness of the scene. Fresh from the biggest victory of his life, with a proven battle plan in hand, David treats the second battle as a new question. And the answer is nothing like yesterday's:"
      }
    },
    oracle: {
      ref: "2 Samuel 5:23",
      text: "And when David enquired of the LORD, he said, Thou shalt not go up; but fetch a compass behind them, and come upon them over against the mulberry trees."
    },
    sign: {
      ref: "2 Samuel 5:24",
      text: "And let it be, when thou hearest the sound of a going in the tops of the mulberry trees, that then thou shalt bestir thyself: for then shall the LORD go out before thee, to smite the host of the Philistines."
    },
    flankButton: "🌳 Fetch a compass behind them",
    grove: {
      instructions: "Your men crouch in the grove behind the Philistine camp, weapons drawn, close enough to smell their cook-fires. The order is strange and exact: not at dawn, not on a trumpet — when you hear the sound of a going in the tops of the trees. Watch the treetops. Wait for the sign, then bestir thyself.",
      quietLine: "The tops are still. Somewhere ahead, the Philistine camp mutters and clatters.",
      windLine: "🍃 A sound of a going runs through the tops of the trees!",
      strikeLabel: "⚔️ Bestir thyself!",
      earlyLines: [
        "A spearman half-rises — and the line holds him down. The tops are still. “Thou shalt not go up” came with a condition, and the condition has not sounded. Wait.",
        "Every instinct says the moment is now. But the sign is not your instinct — it is a sound in the trees, and the trees are silent. Wait.",
        "Yesterday you would already be charging. Yesterday's word was “go up.” Today's word is “wait for the going in the tops” — and today you serve today's word. Wait."
      ],
      hint: "The men whisper that one tree in this grove is older than the rest — old, they say, when the giants still held the valley. Perhaps it is worth a closer look.",
      routLine: "Now! The grove empties in a single breath. The sound in the treetops rolls over the Philistine camp like the front rank of an unseen army — because that is what it is: “for then shall the LORD go out before thee.” Struck from behind, from the direction of home, the host does not re-form. It runs.",
      routVerse: {
        ref: "2 Samuel 5:25",
        text: "And David did so, as the LORD had commanded him; and smote the Philistines from Geba until thou come to Gazer."
      }
    },
    historianNote: {
      title: "Historian's note 📜 — What tree is a “mulberry”?",
      text: "The Hebrew is bekha'im, and the honest answer is that nobody is certain what tree it names. The KJV's “mulberry” follows older Jewish tradition; many modern scholars argue for balsam shrubs (so most recent translations); others suggest aspens or poplars, whose leaves tremble and rustle in the lightest air — attractive for a story that turns on sound in the treetops; the ancient Greek translators ducked the question and just transliterated. The root looks like bakhah, “to weep,” so “weeper-trees” may be the idea — trees that drip sap, or trees of a valley of weeping. Whatever the species, the tactical picture is clear: a stand of trees behind the Philistine position with a canopy loud enough that marching — of whom? — could be heard moving through it."
    }
  },

  /* ---------------- Stage 4: FROM GEBA TO GAZER ---------------- */
  aftermath: {
    heading: "From Geba to Gazer",
    beats: [
      {
        title: "The pursuit",
        quote: {
          ref: "2 Samuel 5:25",
          text: "And David did so, as the LORD had commanded him; and smote the Philistines from Geba until thou come to Gazer."
        },
        text: "This is no local scuffle won and forgotten. David drives the Philistines north over the ridge and then west, down the descending corridor toward their own plain — all the way to the border city of Gezer. The Philistine bid to strangle the new kingdom in its cradle ends with Philistia swept off the central hills. They will trouble David's reign again, but never again as overlords."
      },
      {
        title: "Two battles, two answers",
        text: "Set the two days side by side. Same valley, same enemy, same praying king — and two entirely different battle plans: a frontal breach at Baal-perazim, a rear ambush timed to a sound in the trees. The variable was never David's method. It was the LORD's answer, freshly asked for each time."
      },
      {
        title: "A day worth remembering",
        quote: {
          ref: "Isaiah 28:21",
          text: "For the LORD shall rise up as in mount Perazim, he shall be wroth as in the valley of Gibeon, that he may do his work, his strange work; and bring to pass his act, his strange act."
        },
        text: "Three centuries later, Isaiah could still invoke “mount Perazim” and every hearer in Jerusalem knew the day he meant. The breach of waters became a proverb for the LORD rising up in person."
      }
    ],
    tally: {
      title: "The reckoning",
      ref: "2 Samuel 5:17–25",
      sides: [
        {
          emblem: "🌊",
          name: "First battle — Baal-perazim",
          value: "Breach",
          detail: "the line bursts like waters; the Philistine gods are abandoned, carried off, and burned"
        },
        {
          emblem: "🌳",
          name: "Second battle — the trees",
          value: "Geba → Gazer",
          detail: "struck from behind on the sign; the host driven from the hills to the edge of its own plain"
        }
      ],
      note: "Scripture gives no body count for either day. The tally it cares to record is different: two enquiries, two answers, two obediences — “And David did so, as the LORD had commanded him.”"
    },
    historianNote: {
      title: "Historian's note 📜 — Ebenezer, reversed",
      text: "Read this chapter against 1 Samuel 4 and the symmetry is unmistakable. A generation earlier, at Ebenezer, Israel hauled the ark of the covenant to the battlefield like a talisman — and lost it: “the ark of God was taken” (1 Samuel 4:11), and the Philistines paraded it through the temple of Dagon. Now the mirror image: the Philistines carry their gods to war in the valley of Rephaim, and it is their images that are captured — carried off by the victors and burned. Where Israel once treated the living God as portable luck and was corrected, Philistia's portable gods end as firewood. The narrator never spells the connection out; ancient readers did not need it spelled out. One geographical footnote: 1 Chronicles 14:16 gives the pursuit as “from Gibeon even to Gazer” where Samuel reads “from Geba” — two neighboring benchmark towns north of Jerusalem, and either way the same rout down the Aijalon road that Gezer guards."
    },
    reflection: {
      title: "Reflection — Yesterday's answer is not today's guidance",
      paragraphs: [
        "The most searching moment in this story is not the breach and not the ambush. It is the second kneeling — a king with a fresh, total, divinely-promised victory behind him treating the next identical-looking threat as a brand-new question. He was right to: the second answer was “Thou shalt not go up.”",
        "The method that God blessed yesterday can become the presumption that ruins today, if the method quietly replaces the asking. Rephaim's lesson is that guidance is a relationship, not a recipe — the same valley may require the opposite plan, and only the one who asks finds out.",
        "And note who does the real fighting. At Baal-perazim the LORD “breaks forth” before David; at the trees David may not move until he hears the LORD already marching. The king's part, both days, is to ask, to wait, and then to bestir himself — in that order."
      ]
    },
    chapterChip: { label: "📖 Read 2 Samuel 5" },
    mapChip: { label: "🗺️ See it on the map", locId: "jerusalem" }
  },

  /* ---------------- Easter egg ---------------- */
  easterEgg: {
    target: "old-tree",   // engine wires this to the elder tree in the grove
    clicksNeeded: 3,
    title: "🌳 The weeping tree",
    text: "You have found the elder of the grove. The trees of this story, the bekha'im, take their name from a root that means “to weep” — weeper-trees, perhaps for the drops of sap they shed. The same word family gives Psalm 84 its “valley of Baca,” the valley of weeping that pilgrims “passing through... make it a well” (Psalm 84:6). It is a fitting tree for this valley: Rephaim — named for the giants who once held it — becomes the place where the LORD breaks forth, and a grove of weeping becomes the sound of His going out to war. In this country, even the sad names keep turning into stories of rescue."
  }
};
