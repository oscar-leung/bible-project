// data/battle-gibeon.js — window.BATTLE_GIBEON (Game Dev)
// Scene data for "The Battle of Gibeon" — an interactive retelling of 2 Samuel 2:12–32.
// Plain script global, no modules. All quotes KJV. Rendered by js/battle.js.
window.BATTLE_GIBEON = {
  id: "battle-gibeon",
  title: "The Battle of Gibeon",
  subtitle: "2 Samuel 2:12–32 — two kingdoms meet at the pool",
  stages: [
    { id: "context",   label: "The Divided Land", emblem: "👑" },
    { id: "contest",   label: "The Contest",      emblem: "⚔️" },
    { id: "pursuit",   label: "The Pursuit",      emblem: "🏃" },
    { id: "aftermath", label: "Aftermath",        emblem: "🎇" }
  ],

  /* ---------------- Stage 1: CONTEXT ---------------- */
  context: {
    heading: "Two Kings, One Land",
    paragraphs: [
      "Saul and his sons lie dead on Mount Gilboa, and David has sung his lament over them. Now David inquires of the LORD and goes up to Hebron, where the men of Judah anoint him king over the house of Judah (2 Samuel 2:1–4).",
      "But Abner the son of Ner, captain of Saul's host, takes Ish-bosheth the son of Saul over Jordan to Mahanaim and makes him king over all Israel. Ish-bosheth reigns two years; only the house of Judah follows David (2 Samuel 2:8–10).",
      "So the land has two kings — and two armies. Abner marches out from Mahanaim with the servants of Ish-bosheth, and Joab the son of Zeruiah goes out with the servants of David. They meet at the pool of Gibeon, and sit down — “the one on the one side of the pool, and the other on the other side of the pool.”"
    ],
    keyVerse: {
      ref: "2 Samuel 2:13",
      text: "And they met together by the pool of Gibeon: and they sat down, the one on the one side of the pool, and the other on the other side of the pool."
    },
    // Mini-map: stylized inline SVG, viewBox 0 0 320 260. Not to scale — rough
    // relative geography only (Mahanaim across the Jordan, Gibeon in the hill
    // country, Hebron to the south).
    map: {
      caption: "Two forces converge on Gibeon — Abner from Mahanaim, Joab from Hebron.",
      places: [
        { id: "mahanaim", name: "Mahanaim", note: "Ish-bosheth's capital, beyond Jordan", x: 262, y: 52,  side: "israel" },
        { id: "gibeon",   name: "Gibeon",   note: "the pool — where the armies meet",  x: 138, y: 132, side: "meeting" },
        { id: "hebron",   name: "Hebron",   note: "David's royal city in Judah",           x: 118, y: 224, side: "judah" }
      ],
      routes: [
        { from: "mahanaim", to: "gibeon", label: "Abner & the servants of Ish-bosheth", side: "israel" },
        { from: "hebron",   to: "gibeon", label: "Joab & the servants of David",        side: "judah" }
      ],
      // A rough Jordan-river polyline in the same coordinate space, for flavor.
      jordan: [[236, 0], [230, 60], [224, 130], [230, 200], [226, 260]]
    },
    historianNote: {
      title: "Historian's note 📜 — The pool is real",
      text: "Gibeon is the modern village of el-Jib, about 9 km northwest of Jerusalem. Its identity was clinched when James Pritchard's excavations (beginning in 1956) turned up dozens of storage-jar handles inscribed gbʿn — “Gibeon” — in paleo-Hebrew script. The “pool of Gibeon” is almost certainly the great rock-cut shaft still open on the site: a cylinder about 11.3 m (37 ft) across and 10.8 m deep, with a spiral staircase of 79 steps winding down to a water chamber. The two armies in this chapter sat facing each other across a datable piece of Iron Age engineering that you can still climb into today."
    }
  },

  /* ---------------- Stage 2: THE CONTEST ---------------- */
  contest: {
    heading: "“Let the young men arise, and play before us”",
    intro: [
      "Neither commander wants to hurl whole armies at fellow Israelites — not yet. So Abner proposes an older custom: representative combat. Champions will fight in front of both hosts, twelve against twelve.",
      "You will field David's twelve, one at a time. Watch your man step to the pool — and when the moment comes, seize it."
    ],
    proposal: {
      ref: "2 Samuel 2:14",
      abner: "Let the young men now arise, and play before us.",
      joab: "Let them arise."
    },
    pairsCount: 12,
    // One flavor line per round; the engine cycles if fewer than pairsCount.
    rounds: [
      "A man of Benjamin steps out for Ish-bosheth. A man of Judah rises from Joab's side to meet him.",
      "The second pair circle each other on the rock lip of the pool, sandals rasping on stone.",
      "The third pair meet in silence. Both armies lean forward; no one cheers.",
      "The fourth of Benjamin is a head taller than his man. It will not matter.",
      "The fifth pair close so fast the watchers barely see the swords come out.",
      "Six now. The stone around the pool is no longer dry.",
      "The seventh of Judah looks back once at Joab. Joab does not look away.",
      "The eighth pair grip like wrestlers at a feast — but this is no feast.",
      "Nine. Someone on Abner's side calls a name. Nobody answers.",
      "The tenth pair fall so close together they seem one man.",
      "The eleventh of Benjamin hesitates a half-step. His opponent does not.",
      "The last two step out. Twenty-two lie still already. Both hosts are on their feet."
    ],
    // The text-faithful outcome of every single pairing — no champion prevails.
    grappleResult: "Each catches his fellow by the head — and thrusts his sword into his fellow's side. They fall together.",
    outcome: {
      ref: "2 Samuel 2:16",
      text: "And they caught every one his fellow by the head, and thrust his sword in his fellow's side; so they fell down together: wherefore that place was called Helkath-hazzurim, which is in Gibeon."
    },
    aetiology: {
      name: "Helkath-hazzurim",
      meaning: "“the field of sword-edges” (or “field of flints”)",
      text: "All twenty-four fall. No champion prevails; nothing is decided. The place itself takes a new name from the horror — Helkath-hazzurim, the field of the sword-edges. The contest meant to spare the armies instead ignites them: “And there was a very sore battle that day” (2:17)."
    },
    historianNote: {
      title: "Historian's note 📜 — What kind of “play”?",
      text: "The Hebrew verb here (śāḥaq, “play” / “sport”) can describe a deadly formal contest staged before onlookers — champion warfare, in which picked men fight as representatives so whole armies need not. David and Goliath is the most famous biblical example, and reliefs and texts from the wider ancient Near East show paired champions fighting exactly as described here: each seizing the other's head (or beard) with one hand, striking with the other. At Gibeon the custom fails utterly — twelve-for-twelve mutual annihilation settles nothing, and the general battle it was meant to prevent breaks out anyway."
    }
  },

  /* ---------------- Stage 3: THE PURSUIT ---------------- */
  pursuit: {
    heading: "Light of Foot as a Wild Roe",
    intro: {
      ref: "2 Samuel 2:17",
      text: "And there was a very sore battle that day; and Abner was beaten, and the men of Israel, before the servants of David."
    },
    asahel: {
      ref: "2 Samuel 2:18",
      text: "And there were three sons of Zeruiah there, Joab, and Abishai, and Asahel: and Asahel was as light of foot as a wild roe.",
      note: "Asahel is Joab's youngest brother — one of David's thirty mighty men. He picks the greatest prize on the field: Abner himself. And he is faster than anyone."
    },
    // Ordered beats; the engine renders them one at a time over a chase track.
    // gap = how close Asahel is (100 far → 0 caught), for the visual only.
    steps: [
      {
        type: "narration",
        gap: 80,
        text: "Abner's men break and run. Asahel fixes his eyes on Abner and pursues — “and in going he turned not to the right hand nor to the left from following Abner” (2:19).",
        button: "Run him down"
      },
      {
        type: "exchange",
        gap: 55,
        text: "Abner glances back at the runner closing on him.",
        quote: { ref: "2 Samuel 2:20", text: "Then Abner looked behind him, and said, Art thou Asahel? And he answered, I am." },
        button: "Keep running"
      },
      {
        type: "decision",
        id: "first-appeal",
        gap: 35,
        text: "Abner calls back over his shoulder — a way out, with honor and spoil:",
        quote: { ref: "2 Samuel 2:21", text: "Turn thee aside to thy right hand or to thy left, and lay thee hold on one of the young men, and take thee his armour." },
        prompt: "What should Asahel do?",
        choices: [
          {
            id: "turn",
            label: "Turn aside — take a young man's armour",
            response: "It would be the prudent glory — a captured panoply to lay before Joab. But the text tells us what Asahel actually did:"
          },
          {
            id: "pursue",
            label: "Stay on Abner — the commander is the prize",
            response: "Armour is for lesser men. Asahel wants the captain of Israel's host himself. And so it was:"
          }
        ],
        landing: { ref: "2 Samuel 2:21", text: "But Asahel would not turn aside from following of him." }
      },
      {
        type: "decision",
        id: "second-appeal",
        gap: 15,
        text: "The gap closes. Abner — the old commander who served beside Joab under Saul — pleads a second time, and now he names the cost plainly:",
        quote: { ref: "2 Samuel 2:22", text: "And Abner said again to Asahel, Turn thee aside from following me: wherefore should I smite thee to the ground? how then should I hold up my face to Joab thy brother?" },
        prompt: "Abner does not want this kill. Choose for Asahel:",
        choices: [
          {
            id: "turn",
            label: "Turn aside — heed Abner's plea",
            response: "Hear the mercy in it: Abner is begging not to kill him — dreading the blood-debt it would open with Joab. If Asahel had turned aside, much grief would have been spared. But Asahel would not turn aside…",
            mercy: true
          },
          {
            id: "refuse",
            label: "Refuse — never break stride",
            response: "The wild roe does not slacken. Speed has always been his gift; today it carries him past the last warning.",
            mercy: false
          }
        ],
        landing: { ref: "2 Samuel 2:23", text: "Howbeit he refused to turn aside…" }
      },
      {
        type: "outcome",
        gap: 0,
        text: "Abner does not even turn around. As Asahel closes, Abner checks his stride and drives the spear backwards — not the point, the butt — and the runner's own speed does the rest.",
        quote: {
          ref: "2 Samuel 2:23",
          text: "…wherefore Abner with the hinder end of the spear smote him under the fifth rib, that the spear came out behind him; and he fell down there, and died in the same place: and it came to pass, that as many as came to the place where Asahel fell down and died stood still."
        },
        epitaph: "The fastest man on the field lies still, and every runner who reaches the spot stops and stands.",
        button: "Stand a moment — then follow Joab"
      }
    ],
    historianNote: {
      title: "Historian's note 📜 — The butt end of the spear",
      text: "Ancient spears were double-ended. Behind the blade, the shaft usually carried a metal butt-spike (Greek soldiers later called it the saurotēr, “lizard-killer”) — used to plant the spear upright in the ground, and serviceable as a backup weapon. Bronze butt-spikes are common finds on Near Eastern sites. A veteran like Abner could stop short and thrust the spear backwards without turning — a warning shove to any ordinary pursuer. Against a sprinter at full speed, the spike ran him through. The detail rings with battlefield authenticity: Abner may well have meant the least lethal blow he had, and it killed all the same."
    }
  },

  /* ---------------- Stage 4: AFTERMATH ---------------- */
  aftermath: {
    heading: "“Shall the Sword Devour For Ever?”",
    beats: [
      {
        title: "To the hill of Ammah",
        text: "Joab and Abishai take up the pursuit of Abner, and the sun goes down on them at the hill of Ammah, that lies before Giah by the way of the wilderness of Gibeon (2:24)."
      },
      {
        title: "Benjamin rallies",
        text: "The children of Benjamin gather themselves together behind Abner, become one troop, and stand on the top of a hill (2:25). The rout has found its footing; a last stand is set."
      },
      {
        title: "Abner's appeal",
        quote: {
          ref: "2 Samuel 2:26",
          text: "Shall the sword devour for ever? knowest thou not that it will be bitterness in the latter end? how long shall it be then, ere thou bid the people return from following their brethren?"
        },
        text: "From the hilltop Abner calls down to Joab — the man whose brother he has just killed — and names the truth of civil war: it can only end in bitterness, for these armies are brethren."
      },
      {
        title: "The trumpet",
        quote: {
          ref: "2 Samuel 2:27–28",
          text: "And Joab said, As God liveth, unless thou hadst spoken, surely then in the morning the people had gone up every one from following his brother. So Joab blew a trumpet, and all the people stood still, and pursued after Israel no more, neither fought they any more."
        },
        text: "Joab blows the shophar and the day's killing stops where it stands. Abner's men march all night through the plain, over Jordan, back to Mahanaim; Joab's men march through the night to Hebron. Asahel is carried to Bethlehem and buried in his father's sepulchre (2:29–32)."
      }
    ],
    tally: {
      title: "The count at day's end",
      ref: "2 Samuel 2:30–31",
      sides: [
        { name: "Servants of David (Judah)", emblem: "🦁", dead: 20, detail: "19 men lacking — and Asahel" },
        { name: "Abner's men (Benjamin & Israel)", emblem: "🏹", dead: 360, detail: "360 men dead" }
      ],
      note: "A lopsided field — and yet the verse counts Asahel apart from the nineteen. One death at Gibeon will outweigh the other three hundred seventy-nine."
    },
    historianNote: {
      title: "Historian's note 📜 — The trumpet that stops a battle",
      text: "The shophar — a ram's-horn trumpet — was Israel's battlefield signal corps in a single instrument: it mustered armies, launched attacks, and, as here, recalled them. Joab blows it twice in this one chapter of Israel's civil war era (2:28; compare 20:22), each time to halt pursuit of fellow Israelites. That a whole army “stood still” at one horn blast shows real command discipline — and how close to the surface the reluctance to shed a brother's blood still lay."
    },
    reflection: {
      title: "Reflection — A long war begins",
      paragraphs: [
        "Nothing at Gibeon is settled: not the crown, not the border, not the blood. The very next verse tells us where this day leads — “Now there was long war between the house of Saul and the house of David: but David waxed stronger and stronger, and the house of Saul waxed weaker and weaker” (2 Samuel 3:1).",
        "And the butt end of Abner's spear casts the longest shadow of all. Abner feared he could never again “hold up his face to Joab” — he was right. When Abner later comes to Hebron in peace, Joab takes him aside quietly in the gate and smites him under the fifth rib, “for the blood of Asahel his brother” (2 Samuel 3:27). Mercy pleaded for at Gibeon is not shown at Hebron.",
        "As you read on, watch how one afternoon's chase by a pool shapes the politics of the whole kingdom — and what David says about the sons of Zeruiah being “too hard” for him (3:39)."
      ],
      continueChip: { label: "📖 Continue your study in 2 Samuel 2–3" },
      mapChip: { label: "🗺️ Find Gibeon on the map", locId: "gibeon" }
    }
  },

  /* ---------------- Easter egg ---------------- */
  easterEgg: {
    target: "pool",       // engine wires this to the pool graphic
    clicksNeeded: 3,
    title: "🌊 You have found the waters of Gibeon",
    text: "Beneath the great pool's 79 spiral steps, Gibeon's engineers also cut a separate stepped tunnel some 45 m through the rock to reach the spring outside the city wall — a water system built to survive a siege. These are the waters where army met army: centuries after Abner and Joab sat facing each other here, Jeremiah 41:12 records another armed confrontation “by the great waters that are in Gibeon.” Some places keep collecting history."
  }
};
