// data/journeys.js — window.JOURNEYS (Historian)
// Ordered stops reference ids in window.LOCATIONS.

window.JOURNEYS = [
  {
    id: "ark-journey",
    title: "The Ark's Capture and Wanderings",
    color: "#b8860b",
    description: "The ark of the covenant leaves Shiloh for the battlefield, falls into Philistine hands, humbles Dagon and plagues the pentapolis, and comes home on an unmanned cart — to rest twenty years at Kiriath-jearim.",
    stops: [
      { loc: "shiloh", note: "The ark is fetched from the sanctuary to serve as a war talisman (4:3-4)." },
      { loc: "ebenezer", note: "Israel's camp; the ark arrives with a great shout — and is captured in the rout (4:5-11)." },
      { loc: "aphek", note: "The Philistine staging ground for the battle that doomed Eli's house (4:1)." },
      { loc: "ashdod", note: "Set as a trophy in Dagon's temple; the idol falls broken and plague breaks out (5:1-7)." },
      { loc: "gath", note: "Shuttled inland; the hand of the Lord strikes the city with tumors (5:8-9)." },
      { loc: "ekron", note: "The Ekronites cry out in panic; the diviners devise the guilt offering (5:10-6:9)." },
      { loc: "beth-shemesh", note: "Two milk cows pull the cart straight up the Sorek Valley to the harvesters (6:12-15)." },
      { loc: "kiriath-jearim", note: "The ark rests in Abinadab's house on the hill for some twenty years (7:1-2)." }
    ],
    chapters: [4, 5, 6, 7]
  },
  {
    id: "saul-rise",
    title: "The Rise of King Saul",
    color: "#6b3fa0",
    description: "A search for lost donkeys ends in a secret anointing; public lot-casting at Mizpah, a rescue march to Jabesh-gilead, and covenant renewal at Gilgal make the tall Benjaminite Israel's first king.",
    stops: [
      { loc: "gibeah", note: "Saul sets out from his father Kish's home in search of the donkeys (9:1-4)." },
      { loc: "ramah", note: "Samuel privately anoints Saul prince over the Lord's heritage (9:15-10:1)." },
      { loc: "mizpah", note: "The lot falls on Saul, found hiding among the baggage; 'God save the king!' (10:17-24)." },
      { loc: "jabesh-gilead", note: "Saul's night march shatters Nahash the Ammonite and saves the city (11:1-11)." },
      { loc: "gilgal", note: "The kingdom is renewed with sacrifices and joy; Samuel gives his farewell charge (11:14-12:25)." }
    ],
    chapters: [9, 10, 11, 12]
  },
  {
    id: "samuel-circuit",
    title: "Samuel's Judicial Circuit",
    color: "#1565c0",
    description: "Year by year the prophet-judge rode a circuit of the central shrines — Bethel, Gilgal, and Mizpah — judging Israel at each, and always returning home to Ramah, where he built an altar to the Lord.",
    stops: [
      { loc: "ramah", note: "Samuel's home and base; his court and altar were here (7:17)." },
      { loc: "bethel", note: "First stop of the yearly circuit at the ancient 'house of God' (7:16)." },
      { loc: "gilgal", note: "Judgment given at the old covenant camp by the Jordan (7:16)." },
      { loc: "mizpah", note: "Assembly point of the great repentance and the thunder victory (7:5-16)." }
    ],
    chapters: [7]
  },
  {
    id: "elah-campaign",
    title: "David and Goliath: the Elah Campaign",
    color: "#c0392b",
    description: "A shepherd boy carries bread and cheese from Bethlehem to the battle line — and carries back a giant's head. Israel's pursuit rolls the Philistines down the Elah Valley to the gates of their own cities.",
    stops: [
      { loc: "bethlehem", note: "Jesse sends David with provisions for his brothers at the front (17:12-20)." },
      { loc: "valley-of-elah", note: "Forty days of defiance end with one sling stone; Goliath falls (17:1-51)." },
      { loc: "gath", note: "The routed Philistines are cut down as far as Goliath's own city (17:52)." },
      { loc: "ekron", note: "The pursuit reaches the very gates of Ekron; the camp is plundered (17:52-53)." }
    ],
    chapters: [17]
  },
  {
    id: "david-flight",
    title: "David's Flight from Saul",
    color: "#2e7d32",
    description: "From a spear-shadowed court to the caves and deserts of Judah: David's fugitive years trace a great arc through Nob, Gath, Adullam, Keilah, the wildernesses of Ziph and En-gedi, and finally Philistine Ziklag.",
    stops: [
      { loc: "gibeah", note: "Michal lowers David from a window as Saul's assassins watch the house (19:11-17)." },
      { loc: "ramah", note: "Refuge with Samuel at Naioth; Saul's pursuers all end up prophesying (19:18-24)." },
      { loc: "nob", note: "Ahimelech gives David the holy bread and Goliath's sword — Doeg is watching (21:1-9)." },
      { loc: "gath", note: "Recognized in Goliath's city, David feigns madness before King Achish (21:10-15)." },
      { loc: "adullam", note: "Four hundred distressed and indebted men gather to David in the cave (22:1-2)." },
      { loc: "keilah", note: "David rescues the town from Philistine raiders, then must flee its ingratitude (23:1-13)." },
      { loc: "ziph", note: "Betrayed twice by the Ziphites; Jonathan comes to strengthen his hand in God (23:14-24)." },
      { loc: "en-gedi", note: "In a cave among the crags David cuts Saul's robe but spares his life (24:1-22)." },
      { loc: "carmel-judah", note: "The Nabal affair: Abigail's wisdom turns David from bloodguilt (25:2-42)." },
      { loc: "ziklag", note: "Given a Philistine border town, David lives sixteen months beyond Saul's reach (27:1-7)." }
    ],
    chapters: [19, 20, 21, 22, 23, 24, 25, 26, 27]
  },
  {
    id: "final-battle",
    title: "The Final Campaign: Gilboa",
    color: "#455a64",
    description: "The Philistines march up the coast and inland to the Jezreel Valley to cut Israel in two. A desperate king consults the dead at Endor by night — and by the next sunset Saul and his sons hang on the wall of Beth-shan.",
    stops: [
      { loc: "aphek", note: "The Philistine armies muster; the lords send David back south (29:1-11)." },
      { loc: "shunem", note: "The Philistine host camps in the valley at the foot of Mount Moreh (28:4)." },
      { loc: "endor", note: "Saul slips behind enemy lines by night to hear his doom from Samuel (28:7-25)." },
      { loc: "mount-gilboa", note: "Israel breaks; Jonathan and his brothers fall, and Saul dies on his own sword (31:1-6)." },
      { loc: "beth-shan", note: "The bodies of Saul and his sons are fastened to the city wall (31:8-10)." },
      { loc: "jabesh-gilead", note: "The men of Jabesh march all night to recover and bury their rescuer (31:11-13)." }
    ],
    chapters: [28, 29, 31]
  }
];
