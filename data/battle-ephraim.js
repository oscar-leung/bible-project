// data/battle-ephraim.js — window.BATTLE_EPHRAIM (Game Dev)
// Scene data for "The Wood of Ephraim" — an interactive retelling of 2 Samuel 18,
// with Joab's rebuke from 2 Samuel 19:5–7. Plain script global, no modules.
// All quotes KJV. Rendered by js/battle-ephraim.js.
// This battle is won — and it ends in grief. The data keeps that tone.
window.BATTLE_EPHRAIM = {
  id: "battle-ephraim",
  title: "The Wood of Ephraim",
  subtitle: "2 Samuel 18 — a battle won, a father broken",
  stages: [
    { id: "muster",  label: "The Muster at Mahanaim",     emblem: "🛡️" },
    { id: "wood",    label: "The Wood Devours",           emblem: "🌲" },
    { id: "oak",     label: "The Oak",                    emblem: "🌳" },
    { id: "runners", label: "The Two Runners",            emblem: "🏃" },
    { id: "chamber", label: "The Chamber over the Gate",  emblem: "🕯️" }
  ],

  /* ---------------- Stage 1: THE MUSTER AT MAHANAIM ---------------- */
  muster: {
    heading: "The Muster at Mahanaim",
    paragraphs: [
      "Absalom's rebellion has driven David over Jordan. The king who once fled Saul now flees his own son, and he shelters at Mahanaim — the very fortress-town where Ish-bosheth once reigned against him. There David numbers the people that are with him, and sets captains of thousands and captains of hundreds over them.",
      "He divides the host into three columns: a third under Joab, a third under Abishai the son of Zeruiah, Joab's brother, and a third under Ittai the Gittite — the foreigner who swore at the Kidron that where the king was, in death or life, there also would his servant be.",
      "David means to march out himself. The people refuse him."
    ],
    refusal: {
      ref: "2 Samuel 18:3",
      text: "Thou shalt not go forth: for if we flee away, they will not care for us; neither if half of us die, will they care for us: but now thou art worth ten thousand of us: therefore now it is better that thou succour us out of the city."
    },
    afterRefusal: "So the king stands by the gate side while the people go out by hundreds and by thousands. And before all of them — in the hearing of every soldier who will walk into that wood — he gives the captains one charge:",
    charge: {
      ref: "2 Samuel 18:5",
      text: "And the king commanded Joab and Abishai and Ittai, saying, Deal gently for my sake with the young man, even with Absalom. And all the people heard when the king gave all the captains charge concerning Absalom."
    },
    columns: [
      { emblem: "⚔️", name: "Joab",    detail: "captain of the host — the king's hard right hand" },
      { emblem: "🛡️", name: "Abishai", detail: "son of Zeruiah, Joab's brother" },
      { emblem: "🌍", name: "Ittai",   detail: "the Gittite — a foreigner, faithful past reason" }
    ],
    chargeNote: "Hold that sentence. Every man in the army heard it. One of them will stake his life on it before the day is out — and one captain will break it.",
    historianNote: {
      title: "Historian's note 📜 — Mahanaim, refuge of losing causes",
      text: "Mahanaim sits east of the Jordan in Gilead, on high defensible ground — most identifications place it near the Jabbok. It keeps sheltering the beaten: Jacob named it when he fled toward Esau (Genesis 32:2), Abner installed Ish-bosheth there against David (2 Samuel 2:8), and now David himself holds it against his own son. Gileadite loyalists like Barzillai provision his army there (17:27–29). When the battle comes, it is fought on Mahanaim's doorstep — which is why the strangely named 'wood of Ephraim' must be looked for east of the river, not in Ephraim's tribal hills."
    }
  },

  /* ---------------- Stage 2: THE WOOD DEVOURS ---------------- */
  wood: {
    heading: "The Wood Devours",
    intro: [
      "The people go out into the field against Israel, and the battle is joined in the wood of Ephraim — a broken country of scrub oak, ravines, thickets, and hidden pits.",
      "You lead a squad of David's men sweeping through the trees. Israel's line has shattered; the rout is pouring past you into the wood. Sweep the ground ahead — and count carefully who kills whom today."
    ],
    opening: {
      ref: "2 Samuel 18:6–7",
      text: "So the people went out into the field against Israel: and the battle was in the wood of Ephraim; where the people of Israel were slain before the servants of David, and there was there a great slaughter that day of twenty thousand men."
    },
    sweep: {
      instructions: "Advance tile by tile. 🌲 marks ground the wood claims; ⚔️ marks work for the sword.",
      woodLabel: "Devoured by the wood",
      swordLabel: "Devoured by the sword",
      tiles: [
        { type: "wood",  icon: "🌿", text: "A thorn-thicket has swallowed a knot of fleeing men. Their spears are still tangled in it. They are not." },
        { type: "sword", icon: "⚔️", text: "A band of Absalom's men turns at bay in a clearing. It is brief, and it goes to the servants of David." },
        { type: "wood",  icon: "🕳️", text: "A hidden pit yawns under the leaf-mould. The men who ran this way did not see it either." },
        { type: "clear", icon: "🌤️", text: "A quiet aisle of trees. Somewhere ahead you can hear the rout crashing away downhill." },
        { type: "wood",  icon: "⛰️", text: "The ground drops away into a ravine without warning. Men running headlong went over the edge in the dark of the trees." },
        { type: "sword", icon: "⚔️", text: "A short clash of spears among the trunks — over almost before it starts." },
        { type: "wood",  icon: "🌳", text: "Low oak boughs, thick and hard, sweep riders from their mounts. Riderless animals wander the trees." },
        { type: "clear", icon: "🌳", text: "You pass beneath a great grey oak, older than the kingdom. Mark it. You will see it again." },
        { type: "wood",  icon: "🪨", text: "Roots and rocks underfoot. The fleeing stumble, and the press behind tramples them." },
        { type: "sword", icon: "⚔️", text: "Stragglers throw down their arms at the sight of your squad. The fight, such as it is, ends quickly." },
        { type: "wood",  icon: "🌿", text: "Briers catch cloaks and armour and hold men fast. The wood does not let go of what it takes." },
        { type: "clear", icon: "🌤️", text: "Light through the leaves. For one breath the wood is only a wood — then the noise of the slaughter returns." }
      ],
      summary: {
        ref: "2 Samuel 18:8",
        text: "For the battle was there scattered over the face of all the country: and the wood devoured more people that day than the sword devoured."
      },
      tallyNote: "Twenty thousand fall — and the text insists on this strange arithmetic: the terrain out-killed the army. As though the land itself had taken the field against the rebellion. Your own count above tells the same story."
    },
    historianNote: {
      title: "Historian's note 📜 — Why is a wood of 'Ephraim' east of the Jordan?",
      text: "Ephraim's tribal territory lies WEST of the Jordan, but this battle is fought from Mahanaim, in Gilead, east of the river — the army marches out of the city gate and into the fight. The likeliest explanations for the name: memory of the Ephraimite disaster in these same parts, when Jephthah's Gileadites cut down 42,000 Ephraimites at the Jordan fords (Judges 12:1–6); or Ephraimite grazing- and wood-rights that spilled across the river (compare Joshua 17:14–18, where crowded Ephraim is told to go carve out forest land). Either way the terrain fits Gilead's tangled scrub-oak hill country — exactly the kind of broken ground that could devour more men than the sword."
    }
  },

  /* ---------------- Stage 3: THE OAK ---------------- */
  oak: {
    heading: "The Oak",
    intro: [
      "Absalom himself meets the servants of David in the press — and flees on his mule, the royal mount, under the boughs of the great oak."
    ],
    caught: {
      ref: "2 Samuel 18:9",
      text: "And Absalom rode upon a mule, and the mule went under the thick boughs of a great oak, and his head caught hold of the oak, and he was taken up between the heaven and the earth; and the mule that was under him went away."
    },
    muleCaption: "The mule walks out from under him — and keeps walking.",
    discovery: [
      "You are the certain man who sees it: the king's son hanging alive in the oak, between the heaven and the earth, deserted by his own mount.",
      "You bring word to Joab. The captain rounds on you:"
    ],
    joabOffer: {
      ref: "2 Samuel 18:11",
      text: "And, behold, thou sawest him, and why didst thou not smite him there to the ground? and I would have given thee ten shekels of silver, and a girdle."
    },
    choice: {
      prompt: "Ten shekels and a champion's girdle, from the captain of the host. What do you answer?",
      options: [
        {
          id: "take",
          label: "Take the silver — Joab commands here, and the man is a traitor",
          response: "Your hand will not move. You stood in the gate this morning; you heard the charge with your own ears, and so did every man beside you. There is no matter hid from the king. The man in the text answers for you:"
        },
        {
          id: "refuse",
          label: "Refuse — the king's charge binds every man who heard it",
          response: "You refuse the captain of the host to his face, and you name the price you would refuse. The text gives you the words:",
          faithful: true
        }
      ],
      landing: {
        ref: "2 Samuel 18:12–13",
        text: "Though I should receive a thousand shekels of silver in mine hand, yet would I not put forth mine hand against the king's son: for in our hearing the king charged thee and Abishai and Ittai, saying, Beware that none touch the young man Absalom. Otherwise I should have wrought falsehood against mine own life: for there is no matter hid from the king, and thou thyself wouldest have set thyself against me."
      }
    },
    darts: {
      lead: "Joab has no more time for the king's charge than for you.",
      quote: {
        ref: "2 Samuel 18:14",
        text: "Then said Joab, I may not tarry thus with thee. And he took three darts in his hand, and thrust them through the heart of Absalom, while he was yet alive in the midst of the oak."
      },
      after: "Ten young men that bear Joab's armour compass about and finish it. Then Joab blows the trumpet, and the people return from pursuing after Israel: for Joab holds back the people (18:15–16). The battle is over. What follows is burial."
    },
    burial: {
      quote: {
        ref: "2 Samuel 18:17",
        text: "And they took Absalom, and cast him into a great pit in the wood, and laid a very great heap of stones upon him: and all Israel fled every one to his tent."
      },
      pillar: {
        ref: "2 Samuel 18:18",
        text: "Now Absalom in his lifetime had taken and reared up for himself a pillar, which is in the king's dale: for he said, I have no son to keep my name in remembrance: and he called the pillar after his own name: and it is called unto this day, Absalom's place."
      },
      pillarNote: "Set the two monuments side by side: the pillar he raised for himself in the king's dale, to keep his name — and the anonymous heap of stones over a pit in the wood, which is what he got."
    },
    historianNotes: [
      {
        title: "Historian's note 📜 — The mule that walked away",
        text: "In David's Israel the mule is the royal mount: the king's sons ride mules (2 Samuel 13:29), and setting Solomon on David's own mule is what proclaims him king (1 Kings 1:33–38). So the picture in 18:9 is doing quiet, savage work: the would-be king hangs helpless in a tree while the kingship itself — the royal mule — walks out from under him and keeps going. 'Taken up between the heaven and the earth': belonging, in the end, to neither."
      },
      {
        title: "Historian's note 📜 — 'Absalom's Monument' in the Kidron",
        text: "Visitors to Jerusalem are still shown a striking rock-cut tomb in the Kidron valley called the Tomb (or Pillar) of Absalom. Its architecture — Ionic columns, a Doric frieze, a concave conical roof — dates it to the 1st century AD, roughly a thousand years after Absalom; the attribution grew up centuries later, likely because 18:18 places his pillar 'in the king's dale.' And note the tension the text itself leaves standing: 18:18 has Absalom say 'I have no son,' while 14:27 records three sons (unnamed) and a daughter. The most common reading is that the sons died young — the pillar of a man whose line had already failed. The narrator lets both verses stand without smoothing them."
      },
      {
        title: "Historian's note 📜 — The heap of stones",
        text: "A great heap of stones over a body is a marked burial in the Hebrew Bible — the burial of the accursed. Achan, who troubled Israel, lies under 'a great heap of stones unto this day' (Joshua 7:26); the king of Ai, hanged on a tree until sunset, is cast down at the city gate under the same (Joshua 8:29). Absalom — hanged in a tree, then piled under stones in a pit — is laid in that exact grammar of covenant-curse. The writer expects you to feel the echo."
      }
    ]
  },

  /* ---------------- Stage 4: THE TWO RUNNERS ---------------- */
  runners: {
    heading: "The Two Runners",
    intro: [
      "Ahimaaz the son of Zadok — a priest's son, a famous runner, a friend of the king — begs Joab: 'Let me now run, and bear the king tidings, how that the LORD hath avenged him of his enemies' (18:19).",
      "Joab knows what this news is. 'Thou shalt not bear tidings this day… because the king's son is dead' (18:20). He sends Cushi instead — a foreigner who can carry the plain truth and bear the king's grief. But Ahimaaz will not be refused, and Joab relents: 'Run.' Ahimaaz runs by the way of the plain, and overruns Cushi (18:23)."
    ],
    choicePrompt: "Two runners are on the road to Mahanaim. Whose shoulder do you look over?",
    choices: [
      {
        id: "ahimaaz",
        label: "🏃 Run with Ahimaaz — the fast road through the plain",
        response: "You fall in beside the priest's son on the smooth Jordan-plain road. He is thinking hard as he runs — faster than his feet — about what he can say to the king, and what he cannot."
      },
      {
        id: "cushi",
        label: "🏃 Run with Cushi — the messenger who carries the whole truth",
        response: "You fall in beside the Cushite on the hill road. He carries the news exactly as it is, all of it, and he does not slow down. Ahead of you both, a faster man pulls away on the plain."
      }
    ],
    watchman: {
      lead: "At Mahanaim, David sits between the two gates, waiting. The watchman goes up to the roof over the gate — and sees a man running alone. Then another behind him. The king reads the signs: a lone runner is a messenger, not a rout. Then the watchman looks harder at the first man's stride:",
      quote: {
        ref: "2 Samuel 18:27",
        text: "And the watchman said, Me thinketh the running of the foremost is like the running of Ahimaaz the son of Zadok. And the king said, He is a good man, and cometh with good tidings."
      },
      note: "Recognized by his running, at a distance, from a city wall. And hear the ache in the king's logic: a good man must be carrying good news."
    },
    arrivals: [
      {
        runner: "Ahimaaz",
        emblem: "🏃",
        text: "Ahimaaz calls 'All is well,' falls on his face, and blesses the LORD who has delivered up the men that lifted their hand against the king. Then comes the only question David has:",
        quote: {
          ref: "2 Samuel 18:29",
          text: "And the king said, Is the young man Absalom safe? And Ahimaaz answered, When Joab sent the king's servant, and me thy servant, I saw a great tumult, but I knew not what it was."
        },
        note: "He saw. He knew. The fast runner arrives first and cannot say it — call it mercy, call it flinching; the text lets it be both. 'Turn aside, and stand here.' And he stands aside."
      },
      {
        runner: "Cushi",
        emblem: "🏃",
        text: "Then Cushi comes in with the victory on his lips — and the same question meets him. He answers it the only way a plain honest messenger can, in a courtier's careful curve:",
        quote: {
          ref: "2 Samuel 18:32",
          text: "And the king said unto Cushi, Is the young man Absalom safe? And Cushi answered, The enemies of my lord the king, and all that rise against thee to do thee hurt, be as that young man is."
        },
        note: "No name, no verb of dying — and David understands instantly. Notice what the king never once asks: who won."
      }
    ]
  },

  /* ---------------- Stage 5: THE CHAMBER OVER THE GATE ---------------- */
  chamber: {
    heading: "The Chamber over the Gate",
    lead: "There is no interaction here. There is nothing to be done.",
    lament: {
      ref: "2 Samuel 18:33",
      text: "And the king was much moved, and went up to the chamber over the gate, and wept: and as he went, thus he said, O my son Absalom, my son, my son Absalom! would God I had died for thee, O Absalom, my son, my son!"
    },
    mourning: [
      "The word runs through the returning army: the king weeps for his son. And the victory that day is turned into mourning unto all the people (19:2). The men who saved the kingdom creep back into the city by stealth, 'as people being ashamed steal away when they flee in battle' (19:3) — winners slinking home like the routed, while the king cries with a loud voice behind his covered face."
    ],
    rebuke: {
      lead: "It is Joab — the man who threw the darts — who climbs to the chamber and hauls the king back to his people, with the hardest speech anyone ever makes to David:",
      quote: {
        ref: "2 Samuel 19:5–7",
        text: "Thou hast shamed this day the faces of all thy servants, which this day have saved thy life… In that thou lovest thine enemies, and hatest thy friends… for this day I perceive, that if Absalom had lived, and all we had died this day, then it had pleased thee well. Now therefore arise, go forth, and speak comfortably unto thy servants: for I swear by the LORD, if thou go not forth, there will not tarry one with thee this night."
      },
      after: "Brutal — and not wrong. The king arises and sits in the gate, and the people come before him (19:8). The father goes back to being the king, because Joab leaves him no other choice."
    },
    tally: {
      title: "The count at day's end",
      ref: "2 Samuel 18:7, 18:17, 18:33",
      sides: [
        { name: "The Kingdom", emblem: "🦁", dead: "20,000", detail: "of Israel fallen; the rebellion broken; the throne saved" },
        { name: "The Father",  emblem: "👑", dead: "1",      detail: "son, under a heap of stones in the wood" }
      ],
      note: "Both columns are true at once. That is the whole terrible point of this chapter."
    },
    reflection: {
      title: "Reflection — A victory the victor mourns",
      paragraphs: [
        "Every earlier battle in Samuel ends with a count and a direction of march. This one ends with a man climbing a staircase, saying one name over and over. The narrator gives David's lament the most repetitive verse in the book — 'my son' five times, 'Absalom' three — because grief does repeat itself, and the text refuses to tidy it.",
        "'Would God I had died for thee.' David had once been the substitute Israel wanted — the one man worth ten thousand. Today ten thousand fought so he would not die, and the one death he would have died in another's place is the one he was not allowed. Deal gently, he asked. The wood was not gentle, and neither was Joab.",
        "As you read on into chapter 19, watch how a kingdom is stitched back together by a king who no longer wholly wants it — and what it finally costs Joab to have been right."
      ]
    }
  },

  /* ---------------- Easter egg ---------------- */
  easterEgg: {
    target: "mule",       // engine wires this to the wandering mule in the Oak stage
    clicksNeeded: 3,
    title: "✂️ The weight of that hair",
    text: "You caught the mule — which is more than Absalom managed. The narrator planted his snare four chapters early: 'when he polled his head… he weighed the hair of his head at two hundred shekels after the king's weight' (2 Samuel 14:26) — roughly two kilograms, cut once a year, weighed like treasure and clearly counted as glory. Josephus and centuries of readers after him drew the line the text only dangles: the head that was Absalom's vanity is what the oak caught hold of. What he prized most held him fast between the heaven and the earth."
  }
};
