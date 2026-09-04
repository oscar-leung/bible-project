// data/family.js — window.FAMILY ("Family Lines" genealogy data)
// Plain script global, no modules (see ARCHITECTURE.md).
//
// Schema:
//   window.FAMILY = {
//     title, source,
//     people: [{
//       id:          unique string
//       name:        display name
//       meaning:     name meaning / gloss (best scholarly guess; "?" where uncertain)
//       title:       short role line
//       description: 2–3 sentence description
//       refs:        verse references (strings). "1 Samuel N:…" refs are
//                    cross-linkable to the story view by the family tree module.
//       house:       'david' | 'saul' | 'ancestry'   (ancestry = the Ruth→Jesse chain)
//       gen:         generation number within the house (0 = oldest shown), layout hint
//       parents:     ids of parent nodes shown in the tree (may be empty)
//       spouses:     ids of spouse nodes shown in the tree (may be empty)
//       tags:        optional flags: 'couple' (node stands for a married pair),
//                    'group' (node stands for several brothers), 'gilboa' (died at
//                    Mount Gilboa), 'zeruiah-son', 'bridge' (links the two houses),
//                    'messiah-line' (on the Ruth→…→Solomon descent)
//
//       --- NEW fields (additive; current renderer ignores them) --------------
//       mentions:    "neuron map" of the person's significant appearances.
//                    [{ ref:  "2 Samuel 3:3"          (verse citation, string),
//                       when: "c. 1005 BC, Hebron years" (approximate date + setting),
//                       what: "one-sentence event",
//                       why:  "one-sentence significance / memory hook" }]
//       connections: associative links to other people (directed; ids must exist).
//                    [{ to: "<personId>", how: "one vivid sentence tying them together" }]
//       deprecated:  true on nodes kept only for the old renderer (e.g. the compact
//                    "hebron-sons" group node, now superseded by individual people)
//       note:        migration note accompanying `deprecated`
//     }]
//   }
// Sibling links are derived by the view: people sharing a parent id are siblings.
// Key sources: Ruth 4:17–22; 1 Samuel 14:49–51; 1 Chronicles 2:13–17; 1 Chronicles 3:1–3;
// 2 Samuel 2–9; 2 Samuel 13–20; 1 Kings 1–2.
//
// All dates are approximate ("c.") and follow the common conservative chronology:
// Saul's death / start of David's Hebron reign c. 1011 BC, Jerusalem c. 1004 BC,
// Solomon's accession c. 971 BC.

window.FAMILY = {
  title: "Family Lines — the houses of David and Saul",
  source: "Ruth 4; 1 Samuel 14; 1 Chronicles 2, 3 & 8; 2 Samuel 2–9",
  people: [

    // ================= ANCESTRY: Ruth & Boaz → Obed → Jesse =================
    {
      id: "salmon-rahab",
      name: "Salmon & Rahab",
      meaning: "Salmon: \"garment\" (?); Rahab: \"broad\"",
      title: "Boaz's parents — a Canaanite woman in the line",
      description: "Salmon fathered Boaz, and Matthew's genealogy names his wife as Rahab — remembered as the woman of Jericho who sheltered Israel's spies. Already at the head of this line, an outsider is grafted into Israel's royal ancestry.",
      refs: ["Ruth 4:20-21", "Matthew 1:5", "Joshua 2:1"],
      house: "ancestry",
      gen: 0,
      parents: [],
      spouses: [],
      tags: ["couple", "messiah-line"],
      mentions: [
        { ref: "Joshua 2:1-14", when: "conquest era, c. 1400 BC, Jericho", what: "Rahab hides Israel's two spies on her roof and confesses that the LORD has given Israel the land.", why: "A Canaanite prostitute's faith saves her house — and writes her into the royal family tree." },
        { ref: "Joshua 6:25", when: "conquest era, c. 1400 BC, Jericho", what: "When Jericho falls, Rahab and her family alone are spared, and she lives in Israel from then on.", why: "The scarlet cord in the window becomes a lifeline into Israel's story — and David's ancestry." },
        { ref: "Ruth 4:20-21", when: "genealogy of Ruth's closing lines", what: "Salmon is listed as the father of Boaz in the descent from Judah's son Perez.", why: "The quiet link between Jericho's wall and Bethlehem's harvest fields." },
        { ref: "Matthew 1:5", when: "Matthew's genealogy", what: "Matthew names Rahab as Boaz's mother in the line of the Messiah.", why: "The New Testament makes explicit what Ruth implies: outsiders stand at the head of the royal line." }
      ],
      connections: [
        { to: "boaz", how: "Their son Boaz grew up the child of Jericho's most unlikely survivor — perhaps why he welcomed a foreign woman gleaning in his field." },
        { to: "ruth", how: "Rahab the Canaanite and Ruth the Moabitess: mother-in-law and daughter-in-law, two foreign women grafted back-to-back into the Messiah's line." }
      ]
    },
    {
      id: "boaz",
      name: "Boaz",
      meaning: "\"In him is strength\"",
      title: "Landowner of Bethlehem, kinsman-redeemer",
      description: "A worthy man of Bethlehem who protected the Moabite widow Ruth gleaning in his fields and redeemed her late husband's line by marrying her. His generosity at the town gate quietly set up the birth of Israel's greatest king.",
      refs: ["Ruth 2:1", "Ruth 4:9-13", "Matthew 1:5"],
      house: "ancestry",
      gen: 1,
      parents: ["salmon-rahab"],
      spouses: ["ruth"],
      tags: ["messiah-line"],
      mentions: [
        { ref: "Ruth 2:1", when: "c. 1100 BC, days of the judges, Bethlehem", what: "Boaz is introduced as a worthy man of Elimelech's clan, into whose field Ruth 'happens' to glean.", why: "The narrator winks: nothing in this book happens by chance." },
        { ref: "Ruth 2:8-12", when: "c. 1100 BC, barley harvest, Bethlehem", what: "He orders his reapers to protect Ruth and blesses her for taking refuge under the LORD's wings.", why: "His own mother was a sheltered foreigner — now he shelters one." },
        { ref: "Ruth 3:7-13", when: "c. 1100 BC, the threshing floor", what: "Ruth uncovers his feet at midnight and asks him to spread his wing over her; he pledges to redeem her.", why: "He answers his own blessing from chapter 2 — becoming the LORD's 'wings' for Ruth." },
        { ref: "Ruth 4:1-10", when: "c. 1100 BC, the gate of Bethlehem", what: "Before ten elders he buys Naomi's field and acquires Ruth, when the nearer redeemer refuses.", why: "A legal transaction at a town gate quietly secures the line of Israel's kings." },
        { ref: "Ruth 4:13", when: "c. 1100 BC, Bethlehem", what: "Boaz marries Ruth, and the LORD gives her conception: Obed is born.", why: "Grandfather of Jesse, great-grandfather of David — the redeemer becomes an ancestor of the King." }
      ],
      connections: [
        { to: "ruth", how: "He met her as a destitute gleaner in his barley field and left the city gate as her redeemer and husband." },
        { to: "obed", how: "The son of his old-age marriage, laid in Naomi's lap and named by the women of Bethlehem." },
        { to: "salmon-rahab", how: "Son of Rahab of Jericho — raised by a rescued outsider, he knew exactly how to treat one." },
        { to: "david", how: "His great-grandson would be anointed king in the same town of Bethlehem where Boaz once farmed." }
      ]
    },
    {
      id: "ruth",
      name: "Ruth",
      meaning: "\"Companion, friend\" (?)",
      title: "The Moabitess — David's great-grandmother",
      description: "A widow of Moab who bound herself to Naomi and to Naomi's God: \"your people shall be my people.\" Through Boaz she became the mother of Obed and great-grandmother of David — a Moabite grandmother in the royal line that leads on to the Messiah.",
      refs: ["Ruth 1:16-17", "Ruth 4:13-17", "Matthew 1:5"],
      house: "ancestry",
      gen: 1,
      parents: [],
      spouses: ["boaz"],
      tags: ["messiah-line", "easter-egg"],
      mentions: [
        { ref: "Ruth 1:16-17", when: "c. 1100 BC, the road from Moab", what: "Widowed Ruth refuses to leave Naomi: 'your people shall be my people, and your God my God.'", why: "The most famous vow of loyalty in Scripture — sworn by a Moabite, to a bitter mother-in-law." },
        { ref: "Ruth 2:2-3", when: "c. 1100 BC, barley harvest, Bethlehem", what: "Gleaning to keep two widows alive, she 'happens' to come to the field of Boaz.", why: "One day's gleaning route redirects the entire history of Israel's monarchy." },
        { ref: "Ruth 3:9", when: "c. 1100 BC, the threshing floor", what: "At midnight she asks Boaz, 'Spread your wing over your servant, for you are a redeemer.'", why: "The foreign widow boldly proposes — and the worthy man calls it kindness greater than the first." },
        { ref: "Ruth 4:13-17", when: "c. 1100 BC, Bethlehem", what: "She bears Obed, and the women tell Naomi her daughter-in-law is 'better to you than seven sons.'", why: "The emptiness of chapter 1 is filled — and the child on Naomi's lap is David's grandfather." },
        { ref: "Matthew 1:5", when: "Matthew's genealogy", what: "Ruth the Moabitess is named in the genealogy of Jesus the Messiah.", why: "The outsider who chose Israel's God is remembered forever inside Israel's greatest promise." }
      ],
      connections: [
        { to: "boaz", how: "She asked him to spread his wing over her at the threshing floor, and he redeemed her at the gate." },
        { to: "obed", how: "Her firstborn, the child the women of Bethlehem counted worth more to Naomi than seven sons." },
        { to: "david", how: "Her great-grandson — Israel's greatest king had a Moabite great-grandmother who once gleaned for bread." }
      ]
    },
    {
      id: "obed",
      name: "Obed",
      meaning: "\"Servant, worshiper\"",
      title: "Son of Boaz and Ruth",
      description: "The child laid in Naomi's lap, whom the women of Bethlehem named Obed. He is the hinge of the book of Ruth's closing genealogy: \"Obed fathered Jesse, and Jesse fathered David.\"",
      refs: ["Ruth 4:17", "Ruth 4:21-22", "Matthew 1:5"],
      house: "ancestry",
      gen: 2,
      parents: ["boaz", "ruth"],
      spouses: [],
      tags: ["messiah-line"],
      mentions: [
        { ref: "Ruth 4:14-17", when: "c. 1090 BC, Bethlehem", what: "The neighbor women name the newborn Obed and lay him in Naomi's lap as her restorer.", why: "The only baby in Scripture named by the neighborhood — a whole town's answered prayer." },
        { ref: "Ruth 4:21-22", when: "genealogy of Ruth's closing lines", what: "The book ends: 'Obed fathered Jesse, and Jesse fathered David.'", why: "Ruth's last word is 'David' — the whole pastoral story was royal history in disguise." },
        { ref: "Matthew 1:5", when: "Matthew's genealogy", what: "Obed stands between Boaz and Jesse in the line running on to the Messiah.", why: "The 'servant' is a hinge: behind him two foreign grandmothers, ahead of him the kings." }
      ],
      connections: [
        { to: "boaz", how: "Son of Boaz's redeeming marriage — living proof that the gate transaction was really about a family line." },
        { to: "ruth", how: "The child who turned Ruth from a childless widow into the great-grandmother of kings." },
        { to: "jesse", how: "His son Jesse would host the prophet Samuel at the sacrifice where a king was found among the sheep." }
      ]
    },

    // ========================= HOUSE OF DAVID ===============================
    {
      id: "jesse",
      name: "Jesse",
      meaning: "Perhaps \"man\" or \"the LORD exists\" (?)",
      title: "The Bethlehemite, father of David",
      description: "An elder of Bethlehem and grandson of Ruth, to whose house Samuel came with a horn of oil. Seven sons passed before the prophet until the youngest was fetched from the sheep. Isaiah later makes his name a title of hope: \"a shoot from the stump of Jesse.\"",
      refs: ["1 Samuel 16:1", "1 Samuel 16:10-13", "Ruth 4:22", "Isaiah 11:1"],
      house: "david",
      gen: 0,
      parents: ["obed"],
      spouses: [],
      tags: ["messiah-line"],
      mentions: [
        { ref: "Ruth 4:22", when: "genealogy of Ruth's closing lines", what: "Jesse is named as Obed's son and David's father, closing the book of Ruth.", why: "Grandson of a Moabitess, father of a king — the hinge generation." },
        { ref: "1 Samuel 16:1", when: "c. 1025 BC, Bethlehem", what: "The LORD sends the grieving Samuel to Jesse: 'I have provided for myself a king among his sons.'", why: "While Saul still reigns, the future is already waiting in a Bethlehem farmhouse." },
        { ref: "1 Samuel 16:10-11", when: "c. 1025 BC, Bethlehem", what: "Seven sons pass before Samuel; Jesse admits there remains the youngest, out keeping the sheep.", why: "Even David's own father did not think to invite him to meet the prophet." },
        { ref: "1 Samuel 17:17-18", when: "c. 1020 BC, Bethlehem", what: "Jesse sends David to the battle lines with bread, parched grain, and ten cheeses for the commander.", why: "A father's errand of groceries delivers Goliath's slayer to the Valley of Elah." },
        { ref: "1 Samuel 22:3-4", when: "c. 1013 BC, Mizpeh of Moab", what: "Fugitive David lodges his father and mother with the king of Moab for safekeeping.", why: "In danger, the family leans on the old Moab connection — great-grandmother Ruth's homeland." },
        { ref: "Isaiah 11:1", when: "prophetic future", what: "Isaiah promises a shoot from the stump of Jesse on whom the Spirit of the LORD will rest.", why: "The farmer's name becomes a messianic title — the line is cut down but never dead." }
      ],
      connections: [
        { to: "david", how: "He forgot his own youngest son when the prophet came to dinner — the one the LORD had chosen." },
        { to: "obed", how: "Son of the child laid in Naomi's lap; he inherited the field-and-flock world of Boaz." },
        { to: "eliab", how: "His impressive firstborn, whom even Samuel mistook for the LORD's anointed at Jesse's own table." }
      ]
    },
    {
      id: "eliab",
      name: "Eliab",
      meaning: "\"God is father\"",
      title: "Jesse's firstborn",
      description: "Tall and striking, he looked every inch a king — even to Samuel — but the LORD looks on the heart. In the Valley of Elah he burned with anger at his youngest brother's questions about Goliath.",
      refs: ["1 Samuel 16:6-7", "1 Samuel 17:28", "1 Chronicles 2:13"],
      house: "david",
      gen: 1,
      parents: ["jesse"],
      spouses: [],
      mentions: [
        { ref: "1 Samuel 16:6-7", when: "c. 1025 BC, Bethlehem", what: "Samuel sees Eliab and thinks 'surely the LORD's anointed is before him' — but God refuses him: man looks on the appearance, the LORD looks on the heart.", why: "The verse everyone quotes about appearances was spoken over this specific tall brother." },
        { ref: "1 Samuel 17:13", when: "c. 1020 BC, Valley of Elah", what: "As Jesse's eldest he follows Saul to the battle lines against the Philistines.", why: "He stands in the army for forty days of Goliath's taunts — and never steps forward." },
        { ref: "1 Samuel 17:28", when: "c. 1020 BC, Valley of Elah", what: "He burns with anger at David: 'I know your presumption... you came down to see the battle.'", why: "The rejected older brother scolds the anointed younger one — sibling friction inside sacred history." },
        { ref: "1 Chronicles 2:13", when: "the Chronicler's genealogy", what: "Eliab heads the Chronicler's list of Jesse's sons.", why: "Firstborn on every list — chosen on none." }
      ],
      connections: [
        { to: "david", how: "He accused his little brother of vanity minutes before David volunteered to fight Goliath." },
        { to: "jesse", how: "The firstborn his father paraded first before Samuel — and the first the LORD passed over." },
        { to: "abinadab-jesse", how: "Together with Abinadab and Shammah he marched to Elah, three brothers who watched the fourth week of Goliath's taunting." }
      ]
    },
    {
      id: "abinadab-jesse",
      name: "Abinadab",
      meaning: "\"My father is noble / willing\"",
      title: "Jesse's second son",
      description: "The second son to pass before Samuel at Bethlehem, and one of the three eldest who followed Saul to the battle lines against the Philistines. (Distinct from Saul's son of the same name.)",
      refs: ["1 Samuel 16:8", "1 Samuel 17:13", "1 Chronicles 2:13"],
      house: "david",
      gen: 1,
      parents: ["jesse"],
      spouses: [],
      mentions: [
        { ref: "1 Samuel 16:8", when: "c. 1025 BC, Bethlehem", what: "Jesse calls Abinadab to pass before Samuel; the prophet says, 'Neither has the LORD chosen this one.'", why: "Second in line, second refusal — the pattern of the passed-over brothers begins." },
        { ref: "1 Samuel 17:13", when: "c. 1020 BC, Valley of Elah", what: "He stands with Eliab and Shammah among Saul's soldiers facing the Philistines.", why: "Three grown warrior brothers at the front — and the shepherd boy wins the battle." },
        { ref: "1 Chronicles 2:13", when: "the Chronicler's genealogy", what: "Listed second among Jesse's sons.", why: "His whole recorded life is two cameos and a list entry — obscurity next to a famous brother." }
      ],
      connections: [
        { to: "jesse", how: "Second son presented at the sacrifice in Bethlehem, second son declined." },
        { to: "eliab", how: "Marched behind his firstborn brother to Elah and shared his forty days of helpless watching." },
        { to: "david", how: "His little brother brought him bread and cheese at the front — then took the field none of the elders dared." }
      ]
    },
    {
      id: "shimea",
      name: "Shimea (Shammah)",
      meaning: "\"The LORD has heard\"",
      title: "Jesse's third son",
      description: "Called Shammah in 1 Samuel and Shimea in Chronicles, he was the third to pass before Samuel and also stood in Saul's ranks at Elah. His sons Jonadab and Jonathan appear later in David's story.",
      refs: ["1 Samuel 16:9", "1 Samuel 17:13", "1 Chronicles 2:13", "2 Samuel 13:3"],
      house: "david",
      gen: 1,
      parents: ["jesse"],
      spouses: [],
      mentions: [
        { ref: "1 Samuel 16:9", when: "c. 1025 BC, Bethlehem", what: "Shammah passes before Samuel; again the answer is 'Neither has the LORD chosen this one.'", why: "Third refusal at the sacrifice — the LORD is counting down to the sheep pasture." },
        { ref: "1 Samuel 17:13", when: "c. 1020 BC, Valley of Elah", what: "He serves with his two elder brothers in Saul's army against the Philistines.", why: "Another soldier-brother who watched Goliath strut for forty days." },
        { ref: "2 Samuel 13:3", when: "c. 990 BC, Jerusalem", what: "His son Jonadab, 'a very crafty man,' is Amnon's friend and designs the ruse that traps Tamar.", why: "The family's dark cleverness resurfaces a generation on — Shimea's son scripts the court's worst crime." },
        { ref: "2 Samuel 21:21", when: "late in David's reign, Gath", what: "His son Jonathan strikes down a taunting giant of Gath with six fingers on each hand.", why: "One son schemed in the palace; another slew a giant like his uncle David — one family, two legacies." }
      ],
      connections: [
        { to: "david", how: "Passed-over older brother whose two sons — a schemer and a giant-slayer — both orbit David's court." },
        { to: "amnon", how: "His crafty son Jonadab was Amnon's confidant and invented the fake-illness plot against Tamar." },
        { to: "jesse", how: "Third son presented, third declined, at the Bethlehem sacrifice." }
      ]
    },
    {
      id: "nethanel",
      name: "Nethanel",
      meaning: "\"God has given\"",
      title: "Jesse's fourth son",
      description: "Known only from the Chronicler's list of Jesse's sons. Like Raddai and Ozem he passed before Samuel unnamed, one of the seven the LORD had not chosen.",
      refs: ["1 Chronicles 2:14", "1 Samuel 16:10"],
      house: "david",
      gen: 1,
      parents: ["jesse"],
      spouses: [],
      mentions: [
        { ref: "1 Samuel 16:10", when: "c. 1025 BC, Bethlehem", what: "He is among the seven sons who pass before Samuel without being chosen.", why: "An unnamed extra in the scene where his baby brother becomes king." },
        { ref: "1 Chronicles 2:14", when: "the Chronicler's genealogy", what: "The Chronicler preserves his name as Jesse's fourth son.", why: "Without Chronicles we would never know he existed — a man saved from oblivion by one list." }
      ],
      connections: [
        { to: "jesse", how: "Fourth of the seven sons his father lined up for the prophet." },
        { to: "david", how: "One of the anonymous brothers standing by when the horn of oil went to the youngest." }
      ]
    },
    {
      id: "raddai",
      name: "Raddai",
      meaning: "\"Subduing\" (?)",
      title: "Jesse's fifth son",
      description: "The fifth of Jesse's sons in the Chronicler's genealogy, otherwise unmentioned in the story — one of the brothers Samuel passed over at Bethlehem.",
      refs: ["1 Chronicles 2:14", "1 Samuel 16:10"],
      house: "david",
      gen: 1,
      parents: ["jesse"],
      spouses: [],
      mentions: [
        { ref: "1 Samuel 16:10", when: "c. 1025 BC, Bethlehem", what: "He is among the seven sons Samuel reviews and the LORD declines.", why: "A silent walk across the room is his entire role in the narrative." },
        { ref: "1 Chronicles 2:14", when: "the Chronicler's genealogy", what: "Named fifth among Jesse's sons.", why: "His obscurity is the point: God's choice fell past five capable men to a shepherd boy." }
      ],
      connections: [
        { to: "jesse", how: "Fifth son in the Bethlehem lineup before Samuel." },
        { to: "david", how: "An unnoticed older brother of the most famous man in Israel's history." }
      ]
    },
    {
      id: "ozem",
      name: "Ozem",
      meaning: "\"Strength\" (?)",
      title: "Jesse's sixth son",
      description: "The sixth son in 1 Chronicles 2, known to us only by name. His obscurity underlines the story's point: the LORD chose the youngest, out keeping the sheep.",
      refs: ["1 Chronicles 2:15", "1 Samuel 16:10-11"],
      house: "david",
      gen: 1,
      parents: ["jesse"],
      spouses: [],
      mentions: [
        { ref: "1 Samuel 16:10-11", when: "c. 1025 BC, Bethlehem", what: "After seven sons pass unchosen, Samuel must ask, 'Are all your sons here?'", why: "Ozem is the last brother in the room before everyone realizes someone is missing." },
        { ref: "1 Chronicles 2:15", when: "the Chronicler's genealogy", what: "Named sixth, directly before 'David the seventh.'", why: "In Chronicles he stands one line above the king — closest brother on the page, invisible in the story." }
      ],
      connections: [
        { to: "jesse", how: "Sixth and last of the passed-over sons at the sacrifice." },
        { to: "david", how: "The brother listed immediately before David in the Chronicler's genealogy." }
      ]
    },
    {
      id: "david",
      name: "David",
      meaning: "\"Beloved\"",
      title: "Shepherd, psalmist, king of Israel",
      description: "Jesse's youngest, anointed by Samuel while his brothers looked on, slayer of Goliath, fugitive from Saul, and finally king over all Israel. Chronicles counts him Jesse's seventh son, while 1 Samuel 17:12 speaks of eight sons — either a brother died childless or the lists simply count differently; Scripture leaves the tension unresolved. Through Solomon his line runs on to the Messiah (Matthew 1).",
      refs: ["1 Samuel 16:11-13", "1 Samuel 17:12", "1 Chronicles 2:15", "2 Samuel 5:3-4", "Matthew 1:6"],
      house: "david",
      gen: 1,
      parents: ["jesse"],
      spouses: ["michal", "ahinoam", "abigail-carmel", "bathsheba", "maacah", "haggith", "abital", "eglah"],
      tags: ["messiah-line"],
      mentions: [
        { ref: "1 Samuel 16:11-13", when: "c. 1025 BC, Bethlehem", what: "Fetched from the sheep, the youngest son is anointed by Samuel, and the Spirit of the LORD rushes upon him.", why: "The kingdom's future arrives smelling of the sheepfold, while seven bigger brothers watch." },
        { ref: "1 Samuel 17:45-50", when: "c. 1020 BC, Valley of Elah", what: "With a sling and a stone, in the name of the LORD of hosts, he fells Goliath of Gath.", why: "The defining image of faith against giants — and the moment Israel learns his name." },
        { ref: "1 Samuel 18:7-9", when: "c. 1019 BC, after the Philistine victory", what: "The women sing 'Saul his thousands, David his ten thousands,' and Saul eyes David from that day on.", why: "One song turns the king's favorite into the king's obsession." },
        { ref: "1 Samuel 24:4-7; 26:9-11", when: "c. 1014-1012 BC, En-gedi and the hill of Hachilah", what: "Twice David has Saul helpless — a robe corner cut in a cave, a spear at his sleeping head — and twice refuses to strike the LORD's anointed.", why: "The fugitive proves he will not seize by murder what God promised by anointing." },
        { ref: "2 Samuel 2:4", when: "c. 1011 BC, Hebron", what: "The men of Judah anoint David king over the house of Judah at Hebron.", why: "The Hebron years begin: seven years of a divided kingdom, and six sons born to six wives (2 Sam 3:2-5)." },
        { ref: "2 Samuel 7:12-16", when: "c. 1000 BC, Jerusalem", what: "David wants to build the LORD a house; instead the LORD promises to build David a house — a throne established forever.", why: "The covenant that turns this family tree into messianic prophecy." },
        { ref: "2 Samuel 11:2-27; 12:13", when: "c. 995 BC, Jerusalem", what: "He takes Bathsheba, has Uriah killed, and when Nathan says 'You are the man,' answers, 'I have sinned against the LORD.'", why: "The kingdom's golden king falls hardest — and the sword never departs from his house (12:10)." },
        { ref: "2 Samuel 18:33", when: "c. 979 BC, Mahanaim", what: "Told of Absalom's death, David weeps: 'O my son Absalom... would I had died instead of you!'", why: "Nathan's sentence lands in full: the father's sins ripen into a dead rebel son." }
      ],
      connections: [
        { to: "saul", how: "The king who loved his harp, threw spears at his head, and hunted him a decade through the wilderness." },
        { to: "jonathan", how: "The crown prince who should have been his rival became the covenant friend who loved him as his own soul." },
        { to: "michal", how: "His first bride, won with a bride-price of Philistine dead, lost to another man, and reclaimed at Hebron by treaty." },
        { to: "bathsheba", how: "The rooftop sight that broke his integrity — and the mother of the son who inherited his throne." },
        { to: "absalom", how: "The beautiful third son he could neither discipline nor stop loving, even as Absalom drove him from Jerusalem." }
      ]
    },
    {
      id: "zeruiah",
      name: "Zeruiah",
      meaning: "Perhaps \"balsam\" (?)",
      title: "David's sister, mother of Joab, Abishai and Asahel",
      description: "One of Jesse's two daughters, named in Chronicles alongside her brothers. Unusually, her three warrior sons are always called \"sons of Zeruiah,\" not of their father — her name, not his, marks the fiercest family in David's army.",
      refs: ["1 Chronicles 2:16", "1 Samuel 26:6", "2 Samuel 2:18"],
      house: "david",
      gen: 1,
      parents: ["jesse"],
      spouses: [],
      mentions: [
        { ref: "1 Chronicles 2:16", when: "the Chronicler's genealogy", what: "Named as Jesse's daughter and mother of Abishai, Joab, and Asahel.", why: "One of the rare Israelite genealogies where sons are reckoned through their mother." },
        { ref: "1 Samuel 26:6", when: "c. 1012 BC, hill of Hachilah", what: "Her son Abishai, 'son of Zeruiah,' volunteers to enter Saul's sleeping camp with David.", why: "First appearance of the formula 'son of Zeruiah' — her name becomes the family brand." },
        { ref: "2 Samuel 2:18", when: "c. 1010 BC, Gibeon", what: "All 'three sons of Zeruiah' — Joab, Abishai, Asahel — stand together at the battle of Gibeon.", why: "The one scene with all three sons; before nightfall the youngest is dead." },
        { ref: "2 Samuel 3:39", when: "c. 1005 BC, Hebron", what: "After Abner's murder David groans, 'These men, the sons of Zeruiah, are too hard for me.'", why: "Her sons are so fierce even the king who commands armies cannot control them." }
      ],
      connections: [
        { to: "joab", how: "Her eldest-in-rank son commanded David's army and did the killings David could neither order nor undo." },
        { to: "abishai", how: "Her fierce middle son had to be repeatedly restrained from killing on David's behalf." },
        { to: "asahel", how: "Her swiftest son died young at Gibeon — and his blood set his brothers on Abner." },
        { to: "david", how: "Sister of the king; her boys were David's nephews, enforcers, and lifelong political problem." }
      ]
    },
    {
      id: "abigail-sister",
      name: "Abigail",
      meaning: "\"My father is joy\"",
      title: "David's sister, mother of Amasa",
      description: "Jesse's other daughter (2 Samuel 17:25 calls her \"daughter of Nahash,\" a puzzle the texts never explain — perhaps a scribal slip or a different father). By Jether the Ishmaelite she bore Amasa, whom Absalom would one day set over his rebel army. Not to be confused with Abigail of Carmel, David's wife.",
      refs: ["1 Chronicles 2:16-17", "2 Samuel 17:25"],
      house: "david",
      gen: 1,
      parents: ["jesse"],
      spouses: ["jether"],
      mentions: [
        { ref: "1 Chronicles 2:16-17", when: "the Chronicler's genealogy", what: "Named as Jesse's daughter, sister of Zeruiah, who bore Amasa to Jether the Ishmaelite.", why: "David's other sister — her one son will briefly command two rival armies." },
        { ref: "2 Samuel 17:25", when: "c. 979 BC, the rebellion", what: "Amasa is identified through her when Absalom appoints him over the rebel army in Joab's place.", why: "Her name resurfaces at the war's center: her son leads the revolt against her brother." }
      ],
      connections: [
        { to: "jether", how: "Her marriage to an Ishmaelite quietly widens the family — another outsider joins the line of Jesse." },
        { to: "amasa", how: "Her only recorded son, who commanded Absalom's rebellion and died under Joab's kiss." },
        { to: "david", how: "Sister of the king her son took up arms against — the rebellion was a family affair on every side." }
      ]
    },
    {
      id: "jether",
      name: "Jether (Ithra)",
      meaning: "\"Abundance\"",
      title: "The Ishmaelite, husband of David's sister Abigail",
      description: "Called Ithra the Israelite in 2 Samuel and Jether the Ishmaelite in Chronicles — likely an Ishmaelite living in Israel. He fathered Amasa, briefly commander of Absalom's rebel host and then of David's.",
      refs: ["1 Chronicles 2:17", "2 Samuel 17:25"],
      house: "david",
      gen: 1,
      parents: [],
      spouses: ["abigail-sister"],
      mentions: [
        { ref: "1 Chronicles 2:17", when: "the Chronicler's genealogy", what: "Named as the Ishmaelite father of Amasa by Abigail, David's sister.", why: "An Ishmaelite grafted into Jesse's family — the royal clan keeps absorbing outsiders." },
        { ref: "2 Samuel 17:25", when: "c. 979 BC, the rebellion", what: "Called 'Ithra the Israelite' when his son Amasa is made Absalom's general.", why: "Israelite in Samuel, Ishmaelite in Chronicles — a two-verse man with a border-crossing identity." }
      ],
      connections: [
        { to: "abigail-sister", how: "Husband of David's sister — his marriage made an Ishmaelite the king's brother-in-law." },
        { to: "amasa", how: "His son rose to command an army and died at the hands of his own cousin Joab." }
      ]
    },

    // --- the sons of Zeruiah -------------------------------------------------
    {
      id: "joab",
      name: "Joab",
      meaning: "\"The LORD is father\"",
      title: "Commander of David's army",
      description: "Eldest in rank of Zeruiah's sons and David's ruthless, indispensable general: he took Jerusalem, won David's wars, and engineered Uriah's death at the king's word. He also murdered Abner and Amasa in cold blood and killed Absalom against orders — David finally judged him \"too hard for me,\" and Solomon had him executed at the altar.",
      refs: ["1 Samuel 26:6", "2 Samuel 2:13", "2 Samuel 3:27", "2 Samuel 18:14", "2 Samuel 20:10", "1 Kings 2:28-34"],
      house: "david",
      gen: 2,
      parents: ["zeruiah"],
      spouses: [],
      tags: ["zeruiah-son"],
      mentions: [
        { ref: "2 Samuel 2:13-17", when: "c. 1010 BC, pool of Gibeon", what: "He leads David's men against Abner's; twelve pairs of champions kill each other at the pool, and a fierce battle follows.", why: "The civil war between the houses opens under Joab's command — and costs him his brother Asahel." },
        { ref: "2 Samuel 3:27", when: "c. 1005 BC, the gate of Hebron", what: "He draws Abner aside in the gate as if to speak privately and stabs him in the stomach for the blood of Asahel.", why: "A murder disguised as a conference — vengeance that nearly wrecked David's path to a united throne." },
        { ref: "1 Chronicles 11:6", when: "c. 1004 BC, Jerusalem", what: "David promises command to whoever strikes the Jebusites first; Joab goes up first and becomes chief.", why: "He earned the commander's baton by being first over the wall of the future capital." },
        { ref: "2 Samuel 11:14-17", when: "c. 995 BC, siege of Rabbah", what: "He receives David's letter and places Uriah where the fighting is fiercest until he falls.", why: "The general becomes the silent accomplice of the king's worst sin — and now knows the king's secret." },
        { ref: "2 Samuel 14:1-23", when: "c. 985 BC, Jerusalem", what: "Using a wise woman of Tekoa and a staged parable, he maneuvers David into bringing Absalom home.", why: "Joab restores the exiled prince — the same prince he will later kill with his own hand." },
        { ref: "2 Samuel 18:14", when: "c. 979 BC, forest of Ephraim", what: "Finding Absalom alive and dangling in the oak, he thrusts three javelins into his heart despite David's plain order.", why: "He ends the rebellion and breaks the king's heart in the same three strokes." },
        { ref: "2 Samuel 20:9-10", when: "c. 978 BC, the great stone at Gibeon", what: "He greets Amasa — 'Is it well with you, my brother?' — takes his beard for a kiss, and spills his entrails with one stroke.", why: "The second rival commander murdered mid-embrace; Joab simply resumes command over the corpse." },
        { ref: "1 Kings 2:28-34", when: "c. 971 BC, tent of the LORD", what: "Having backed Adonijah, he flees to the altar and grips its horns; on Solomon's order Benaiah strikes him down there.", why: "The man who killed at sanctuaries dies clutching one — Abner's and Amasa's blood finally answered." }
      ],
      connections: [
        { to: "abner", how: "Lured him into Hebron's gate for a quiet word and stabbed him in the stomach — revenge for Asahel dressed up as diplomacy." },
        { to: "asahel", how: "His little brother's death at Abner's spear-butt gave Joab a blood-debt he collected in cold blood." },
        { to: "amasa", how: "Kissed his cousin's beard at Gibeon and opened him with one stroke, taking back the command David had given away." },
        { to: "absalom", how: "He schemed the prince home from Geshur, then put three javelins through his heart in the oak." },
        { to: "adonijah", how: "After a lifetime as David's general he backed the wrong prince, and Adonijah's fall became his death warrant." }
      ]
    },
    {
      id: "abishai",
      name: "Abishai",
      meaning: "\"Father of a gift\" (?)",
      title: "Zeruiah's son, chief of David's Thirty",
      description: "The brother who crept with David into Saul's sleeping camp and begged to pin the king to the earth with one spear-thrust — and was refused. Fierce and loyal, he lifted his spear against three hundred, rescued David from the giant Ishbi-benob, and repeatedly had to be restrained from killing on David's behalf.",
      refs: ["1 Samuel 26:6-9", "2 Samuel 2:18", "2 Samuel 16:9", "2 Samuel 21:16-17", "2 Samuel 23:18"],
      house: "david",
      gen: 2,
      parents: ["zeruiah"],
      spouses: [],
      tags: ["zeruiah-son"],
      mentions: [
        { ref: "1 Samuel 26:6-9", when: "c. 1012 BC, hill of Hachilah", what: "He volunteers to slip into Saul's sleeping camp with David and begs to pin the king with one spear-thrust; David forbids it.", why: "One 'yes' from David that night and there is no house of Saul left to reconcile." },
        { ref: "2 Samuel 2:24", when: "c. 1010 BC, after the battle of Gibeon", what: "With Joab he pursues Abner until sundown after Asahel falls.", why: "The chase that turns a battle into a blood-feud — he never forgives Abner either." },
        { ref: "2 Samuel 16:9-11", when: "c. 979 BC, road to Bahurim", what: "As Shimei curses the fleeing David, Abishai asks, 'Why should this dead dog curse my lord the king? Let me take off his head.'", why: "Vintage Abishai: one sentence, one offered decapitation, one royal refusal." },
        { ref: "2 Samuel 18:2", when: "c. 979 BC, Mahanaim", what: "David sends out a third of the army under Abishai's command against Absalom's forces.", why: "Trusted with a wing of the army in the war that decides the kingdom." },
        { ref: "2 Samuel 21:16-17", when: "late in David's reign, war with the Philistines", what: "When the giant Ishbi-benob closes on the exhausted David, Abishai strikes the Philistine down and saves the king.", why: "The men then swear David must never take the field again, 'lest you quench the lamp of Israel.'" },
        { ref: "2 Samuel 23:18", when: "the roll of David's mighty men", what: "Chief of the Thirty, he once lifted his spear against three hundred and slew them.", why: "His resume in one verse — the most decorated of the sons of Zeruiah." }
      ],
      connections: [
        { to: "david", how: "Crept beside him through Saul's sleeping camp and later cut down a giant to save his life — loyalty with a drawn spear." },
        { to: "joab", how: "His brother and commanding officer; together they pursued Abner and together they answered for his murder (2 Sam 3:30)." },
        { to: "asahel", how: "He chased Abner into the dusk the day his swift young brother died at Gibeon." }
      ]
    },
    {
      id: "asahel",
      name: "Asahel",
      meaning: "\"God has made\"",
      title: "Zeruiah's son, swift as a gazelle",
      description: "The youngest brother, \"as swift of foot as a wild gazelle.\" At the battle of Gibeon he chased the fleeing Abner and would not turn aside, and Abner, warning him twice, killed him with the butt of his spear — a death Joab avenged with murder and that poisoned the peace between the houses.",
      refs: ["2 Samuel 2:18-23", "2 Samuel 2:32", "2 Samuel 3:27", "1 Chronicles 2:16"],
      house: "david",
      gen: 2,
      parents: ["zeruiah"],
      spouses: [],
      tags: ["zeruiah-son"],
      mentions: [
        { ref: "2 Samuel 2:18", when: "c. 1010 BC, Gibeon", what: "Introduced at the battle of Gibeon as 'swift of foot as a wild gazelle.'", why: "His gift is his epitaph — the speed that catches Abner is the speed that kills him." },
        { ref: "2 Samuel 2:19-23", when: "c. 1010 BC, the pursuit from Gibeon", what: "He chases Abner and refuses two warnings to turn aside; Abner kills him with the butt-end of his spear, and all who come to the place stand still.", why: "A veteran's reluctant backward thrust — the single death that poisons the whole peace between the houses." },
        { ref: "2 Samuel 2:32", when: "c. 1010 BC, Bethlehem", what: "His brothers carry him home and bury him in his father's tomb at Bethlehem, then march all night.", why: "The first grave of the civil war stands in David's own hometown." },
        { ref: "2 Samuel 3:27", when: "c. 1005 BC, the gate of Hebron", what: "Joab murders Abner 'for the blood of Asahel his brother.'", why: "Even dead, Asahel drives the plot — his name is the stated motive for the era's most infamous murder." },
        { ref: "2 Samuel 23:24", when: "the roll of David's mighty men", what: "Asahel is listed among the Thirty, David's elite warriors.", why: "Enrolled among the mighty men forever, though he fell in the story's first battle." }
      ],
      connections: [
        { to: "abner", how: "He chased the old commander from Gibeon, ignored two warnings, and died on the butt of his spear." },
        { to: "joab", how: "His blood was the debt Joab repaid at Hebron's gate — vengeance in his name, murder in fact." },
        { to: "abishai", how: "His surviving brothers pursued Abner until sundown the day he fell." }
      ]
    },
    {
      id: "amasa",
      name: "Amasa",
      meaning: "\"Burden-bearer\" (?)",
      title: "Son of David's sister Abigail; Absalom's commander",
      description: "David's nephew, whom Absalom made general of the rebellion and whom David afterward forgave and set over the army in Joab's place. Joab greeted him with a kiss at Gibeon and stabbed him in the stomach — the second cousin-commander to die by Joab's hand.",
      refs: ["2 Samuel 17:25", "2 Samuel 19:13", "2 Samuel 20:9-10", "1 Chronicles 2:17"],
      house: "david",
      gen: 2,
      parents: ["jether", "abigail-sister"],
      spouses: [],
      mentions: [
        { ref: "2 Samuel 17:25", when: "c. 979 BC, the rebellion", what: "Absalom sets Amasa over the rebel army in place of Joab — cousin against cousin.", why: "The civil war's two opposing generals are first cousins, both nephews of David." },
        { ref: "2 Samuel 19:13", when: "c. 979 BC, after Absalom's defeat", what: "David forgives him and swears to make him commander of the army in place of Joab.", why: "Amnesty as politics: David woos rebel Judah home by promoting its general — and mortally insults Joab." },
        { ref: "2 Samuel 20:4-5", when: "c. 978 BC, Jerusalem", what: "Sent to muster Judah against Sheba's revolt in three days, he delays beyond the set time.", why: "His fatal slowness hands the pursuit — and the opportunity — back to Joab." },
        { ref: "2 Samuel 20:9-12", when: "c. 978 BC, the great stone at Gibeon", what: "Joab takes his beard as if to kiss him and stabs him once; Amasa wallows in his blood in the highway until a man drags him into a field.", why: "So gruesome that the army halts to stare — the price of taking Joab's job." }
      ],
      connections: [
        { to: "absalom", how: "His cousin the rebel prince made him a general — a promotion that put him on the losing side of history." },
        { to: "joab", how: "The cousin whose command he took greeted him with a kiss and left him wallowing in the highway." },
        { to: "david", how: "The uncle he rebelled against forgave him completely — and could not protect him from Joab." },
        { to: "abigail-sister", how: "Through his mother he was Jesse's grandson, kin to everyone on both sides of the rebellion." }
      ]
    },

    // --- David's wives -------------------------------------------------------
    {
      id: "ahinoam",
      name: "Ahinoam of Jezreel",
      meaning: "\"My brother is delight\"",
      title: "David's wife, mother of Amnon",
      description: "A woman of Jezreel who married David during his fugitive years and shared his exile in Gath and Ziklag, where she was briefly carried off by Amalekite raiders. At Hebron she bore his firstborn, Amnon. (Distinct from Saul's wife Ahinoam daughter of Ahimaaz.)",
      refs: ["1 Samuel 25:43", "1 Samuel 30:5", "2 Samuel 3:2"],
      house: "david",
      gen: 1,
      parents: [],
      spouses: ["david"],
      mentions: [
        { ref: "1 Samuel 25:43", when: "c. 1013 BC, wilderness years", what: "David takes Ahinoam of Jezreel as wife, alongside Abigail.", why: "She joins David's life at its lowest — a fugitive's bride with no palace in sight." },
        { ref: "1 Samuel 27:3", when: "c. 1012 BC, Gath", what: "She lives with David among the Philistines in the court of Achish.", why: "Loyal enough to follow him into enemy territory." },
        { ref: "1 Samuel 30:5", when: "c. 1011 BC, Ziklag", what: "Amalekite raiders burn Ziklag and carry her off with Abigail; David rescues them all.", why: "For three days David's future queen is a raider's captive in the Negev." },
        { ref: "2 Samuel 2:2", when: "c. 1011 BC, going up to Hebron", what: "She goes up with David to Hebron when Judah makes him king.", why: "From fugitive camps to a royal city — her long road pays off." },
        { ref: "2 Samuel 3:2", when: "c. 1010 BC, Hebron years", what: "She bears David his firstborn son, Amnon.", why: "Mother of the crown prince — and of the son whose crime will shatter the family (2 Sam 13)." }
      ],
      connections: [
        { to: "david", how: "She married a hunted man and was carried captive from Ziklag before she ever saw him crowned." },
        { to: "amnon", how: "Her firstborn stood first in line for the throne — until his sin against Tamar cost him everything." },
        { to: "abigail-carmel", how: "Fellow bride of the wilderness years: captured together at Ziklag, rescued together, neighbors in Hebron." }
      ]
    },
    {
      id: "abigail-carmel",
      name: "Abigail of Carmel",
      meaning: "\"My father is joy\"",
      title: "Widow of Nabal, David's wife",
      description: "The discerning and beautiful wife of the fool Nabal, who rode out with gifts to turn David back from bloodguilt and became his wife when Nabal died. At Hebron she bore Chileab. She is David's wife — not to be confused with David's sister Abigail, mother of Amasa.",
      refs: ["1 Samuel 25:3", "1 Samuel 25:23-35", "1 Samuel 25:39-42", "2 Samuel 3:3"],
      house: "david",
      gen: 1,
      parents: [],
      spouses: ["david"],
      mentions: [
        { ref: "1 Samuel 25:3", when: "c. 1013 BC, Carmel of Judah", what: "Introduced as discerning and beautiful — married to Nabal, harsh and badly behaved.", why: "Scripture's sharpest odd-couple setup in a single verse." },
        { ref: "1 Samuel 25:23-31", when: "c. 1013 BC, the wilderness road", what: "She intercepts David's four hundred armed men with bread, wine, and a speech that talks him out of massacre.", why: "The only person in 1 Samuel who stops David mid-sin — with theology, tact, and donkey-loads of food." },
        { ref: "1 Samuel 25:36-38", when: "c. 1013 BC, Carmel", what: "She tells Nabal at sunrise what nearly happened; his heart dies within him, and ten days later the LORD strikes him.", why: "David learns the lesson she taught: leave vengeance to the LORD, and the LORD handles it." },
        { ref: "1 Samuel 25:39-42", when: "c. 1013 BC, Carmel", what: "David sends for her, and she rides off with five maidens to become his wife.", why: "From fool's wife to future king's bride in one chapter." },
        { ref: "1 Samuel 30:5, 18", when: "c. 1011 BC, Ziklag", what: "Carried off by Amalekite raiders, she is rescued when David overtakes them.", why: "Her second brush with armed men in the wilderness — this time as the prize, not the peacemaker." },
        { ref: "2 Samuel 3:3", when: "c. 1009 BC, Hebron years", what: "She bears David his second son, Chileab.", why: "The wise woman's son is the one prince who never grasps at the throne — and silently vanishes." }
      ],
      connections: [
        { to: "david", how: "She met him leading four hundred men to a massacre and turned him around with a speech he never forgot." },
        { to: "chileab", how: "Her only son by David — second in line, yet the one heir who never appears in the wars of succession." },
        { to: "ahinoam", how: "Sister-wife through the Gath and Ziklag years, captured and rescued at her side." }
      ]
    },
    {
      id: "maacah",
      name: "Maacah of Geshur",
      meaning: "Perhaps \"oppression\" or \"crushed\" (?)",
      title: "Daughter of Talmai king of Geshur; David's wife, mother of Absalom",
      description: "A royal princess of the small Aramean kingdom of Geshur, east of the Sea of Galilee, married to David at Hebron — almost certainly a diplomatic alliance. She bore Absalom, the most beautiful and most dangerous of David's sons; when Absalom killed Amnon, it was to her father Talmai's court that he fled for three years.",
      refs: ["2 Samuel 3:3", "1 Chronicles 3:2", "2 Samuel 13:37"],
      house: "david",
      gen: 1,
      parents: [],
      spouses: ["david"],
      mentions: [
        { ref: "2 Samuel 3:3", when: "c. 1008 BC, Hebron years", what: "Named among David's Hebron wives as 'Maacah the daughter of Talmai king of Geshur,' mother of Absalom.", why: "The only foreign princess among the Hebron wives — David's marriage-treaty with a kingdom on Israel's northeastern edge." },
        { ref: "1 Chronicles 3:2", when: "the Chronicler's genealogy", what: "The Chronicler repeats her royal pedigree in his list of David's sons born at Hebron.", why: "Both lists insist on her father's crown: Absalom is royal on both sides, and acts like it." },
        { ref: "2 Samuel 13:37-38", when: "c. 988 BC, Geshur", what: "After murdering Amnon, her son Absalom flees to Talmai king of Geshur and stays three years.", why: "The escape route only makes sense through Maacah — her son runs to his grandfather's palace." }
      ],
      connections: [
        { to: "david", how: "A treaty bride from Geshur, sealing David's alliance with a small Aramean kingdom during his Hebron reign." },
        { to: "absalom", how: "Her royal blood and her father's faraway court gave Absalom both his princely bearing and his bolt-hole." }
      ]
    },
    {
      id: "haggith",
      name: "Haggith",
      meaning: "\"Festive, born on a feast day\" (?)",
      title: "David's wife, mother of Adonijah",
      description: "One of David's wives at Hebron, known to us only as the mother of Adonijah, David's fourth son. Long after her son's birth, the narrative of 1 Kings still names him \"Adonijah son of Haggith\" as he reaches for his father's throne.",
      refs: ["2 Samuel 3:4", "1 Kings 1:5", "1 Kings 2:13"],
      house: "david",
      gen: 1,
      parents: [],
      spouses: ["david"],
      mentions: [
        { ref: "2 Samuel 3:4", when: "c. 1007 BC, Hebron years", what: "She bears David his fourth son, Adonijah, at Hebron.", why: "Fourth wife, fourth son — one step further from the throne, until deaths above him change the math." },
        { ref: "1 Kings 1:5", when: "c. 971 BC, David's last days", what: "'Adonijah the son of Haggith exalted himself, saying, I will be king.'", why: "Her name brands her son's coup — the narrator keeps calling him 'son of Haggith,' never crown prince." },
        { ref: "1 Kings 2:13", when: "c. 971 BC, Solomon's accession", what: "'Adonijah the son of Haggith came to Bathsheba' with the request that costs him his life.", why: "The final scene of her son's story is framed as Haggith's son facing Bathsheba's son." }
      ],
      connections: [
        { to: "david", how: "A Hebron wife whose son inherited David's good looks and self-confidence — but not his throne." },
        { to: "adonijah", how: "Her name is welded to her son's: every act of his failed grab for the crown is credited to 'the son of Haggith.'" }
      ]
    },
    {
      id: "abital",
      name: "Abital",
      meaning: "\"My father is dew\"",
      title: "David's wife, mother of Shephatiah",
      description: "One of David's six Hebron wives, mother of his fifth son Shephatiah. She appears only in the birth lists — one of the quiet women whose sons never contended for the throne.",
      refs: ["2 Samuel 3:4", "1 Chronicles 3:3"],
      house: "david",
      gen: 1,
      parents: [],
      spouses: ["david"],
      mentions: [
        { ref: "2 Samuel 3:4", when: "c. 1006 BC, Hebron years", what: "She bears David his fifth son, Shephatiah, at Hebron.", why: "One verse of motherhood — her son's name, 'the LORD has judged,' outtalks her whole biography." },
        { ref: "1 Chronicles 3:3", when: "the Chronicler's genealogy", what: "The Chronicler repeats her name in the list of David's Hebron sons.", why: "Two lists, one line each — yet she outlasted the ambitions of louder households." }
      ],
      connections: [
        { to: "david", how: "Fifth of the six Hebron wives in the birth list of 2 Samuel 3." },
        { to: "shephatiah", how: "Her only recorded son — one of the two Hebron princes who never made a bid for the crown." }
      ]
    },
    {
      id: "eglah",
      name: "Eglah",
      meaning: "\"Heifer, young cow\"",
      title: "David's wife, mother of Ithream",
      description: "The sixth of David's Hebron wives, mother of Ithream. Both birth lists add the note \"David's wife\" to her name — an emphasis no one can now explain, since all six women were his wives.",
      refs: ["2 Samuel 3:5", "1 Chronicles 3:3"],
      house: "david",
      gen: 1,
      parents: [],
      spouses: ["david"],
      mentions: [
        { ref: "2 Samuel 3:5", when: "c. 1005 BC, Hebron years", what: "She bears David his sixth son, Ithream; the text pointedly calls her 'Eglah, David's wife.'", why: "The odd emphasis 'David's wife' — on the sixth name only — is a small unsolved puzzle of the list." },
        { ref: "1 Chronicles 3:3", when: "the Chronicler's genealogy", what: "Chronicles repeats both her name and the note 'his wife.'", why: "Both witnesses preserve the same curious flourish — whatever it meant, it was in the record early." }
      ],
      connections: [
        { to: "david", how: "Sixth and last of the Hebron wives, the only one the list pauses to call 'David's wife.'" },
        { to: "ithream", how: "Her only recorded son, the quiet sixth prince of Hebron." }
      ]
    },
    {
      id: "bathsheba",
      name: "Bathsheba",
      meaning: "\"Daughter of the oath\"",
      title: "Wife of Uriah, then of David; mother of Solomon",
      description: "Wife of Uriah the Hittite, taken by David in the affair that drew Nathan's rebuke, \"You are the man.\" After the death of their first child she bore Solomon, whom the LORD loved, and in David's old age she secured the throne for her son.",
      refs: ["2 Samuel 11:2-5", "2 Samuel 12:24", "1 Kings 1:11-31", "Matthew 1:6"],
      house: "david",
      gen: 1,
      parents: [],
      spouses: ["david"],
      mentions: [
        { ref: "2 Samuel 11:2-5", when: "c. 995 BC, Jerusalem", what: "Seen bathing from the palace roof, she is sent for by the king; her message back is three words: 'I am pregnant.'", why: "The rooftop glance that unravels David's golden decade." },
        { ref: "2 Samuel 11:26-27", when: "c. 995 BC, Jerusalem", what: "She laments her husband Uriah, then becomes David's wife — 'but the thing that David had done displeased the LORD.'", why: "The narrator's last clause hangs over the marriage like a storm cloud." },
        { ref: "2 Samuel 12:24-25", when: "c. 991 BC, Jerusalem", what: "After their first child dies, she bears Solomon, and the LORD loves him and names him Jedidiah.", why: "Out of the story's darkest chapter comes the heir of the promise." },
        { ref: "1 Kings 1:11-31", when: "c. 971 BC, David's last days", what: "Coached by Nathan, she confronts the dying David with his oath and wins the throne for Solomon over Adonijah.", why: "The woman once summoned in silence now steers the succession of the kingdom." },
        { ref: "1 Kings 2:19", when: "c. 971 BC, Solomon's court", what: "King Solomon rises, bows to his mother, and seats her on a throne at his right hand.", why: "From rooftop victim to enthroned queen mother — the longest arc in the Davidic court." },
        { ref: "Matthew 1:6", when: "Matthew's genealogy", what: "Matthew names her — as 'the wife of Uriah' — in the line of the Messiah.", why: "Even the genealogy of Jesus refuses to airbrush the story." }
      ],
      connections: [
        { to: "david", how: "Taken by the king in the affair that cost her a husband and a firstborn — she ended as the maker of his successor." },
        { to: "solomon", how: "She fought the palace's last political battle to put her son on David's throne." },
        { to: "adonijah", how: "Her intervention dethroned his coup, and her relayed request for Abishag gave Solomon cause to execute him." }
      ]
    },

    // --- David's sons --------------------------------------------------------
    // NOTE: this compact group node is superseded by the individual people below
    // (amnon, chileab, absalom, adonijah, shephatiah, ithream). It is kept so the
    // current renderer's hand-tuned layout keeps working until it switches over.
    {
      id: "hebron-sons",
      name: "Amnon · Chileab · Absalom · Adonijah",
      meaning: "Sons born to David at Hebron",
      title: "David's early sons (2 Samuel 3:2-5)",
      description: "David's first sons, born at Hebron: Amnon by Ahinoam, Chileab by Abigail of Carmel, Absalom by Maacah daughter of the king of Geshur, and Adonijah by Haggith (Maacah and Haggith are not drawn here). Amnon's crime, Absalom's revolt and Adonijah's grasp at the throne fill the tragic middle of 2 Samuel and 1 Kings; quiet Chileab is never heard from again.",
      refs: ["2 Samuel 3:2-5", "2 Samuel 13:1", "2 Samuel 15:1-6", "1 Kings 1:5"],
      house: "david",
      gen: 2,
      parents: ["david"],
      spouses: [],
      tags: ["group"],
      deprecated: true,
      note: "Superseded by the individual person nodes amnon, chileab, absalom, adonijah, shephatiah and ithream (each parent-linked to David and his mother). Kept only for the current renderer's hand-tuned layout; remove once the tree draws the individuals.",
      mentions: [
        { ref: "2 Samuel 3:2-5", when: "c. 1010-1004 BC, Hebron years", what: "Six sons are born to David at Hebron, each to a different wife.", why: "One birth list quietly loads the whole second half of 2 Samuel: rape, revolt, and a contested succession." }
      ],
      connections: [
        { to: "amnon", how: "The firstborn of the Hebron list — see his individual entry." },
        { to: "chileab", how: "The second, silent son — see his individual entry." },
        { to: "absalom", how: "The third son, the rebel — see his individual entry." },
        { to: "adonijah", how: "The fourth son, the almost-king — see his individual entry." }
      ]
    },
    {
      id: "amnon",
      name: "Amnon",
      meaning: "\"Faithful, trustworthy\"",
      title: "David's firstborn, by Ahinoam of Jezreel",
      description: "Born first at Hebron, heir presumptive to the throne. His obsessive desire for his half-sister Tamar, fed by his cousin Jonadab's scheming, ended in rape — a crime David raged at but never punished. Two years later Absalom, Tamar's full brother, had him killed at a sheep-shearing feast.",
      refs: ["2 Samuel 3:2", "2 Samuel 13:1-14", "2 Samuel 13:28-29", "1 Chronicles 3:1"],
      house: "david",
      gen: 2,
      parents: ["david", "ahinoam"],
      spouses: [],
      mentions: [
        { ref: "2 Samuel 3:2", when: "c. 1010 BC, Hebron years", what: "Born to David and Ahinoam of Jezreel — the king's firstborn son.", why: "First in the birth list, first in line for the throne, first of the sons to die violently." },
        { ref: "2 Samuel 13:1-5", when: "c. 990 BC, Jerusalem", what: "Lovesick over his half-sister Tamar, he takes the advice of his 'very crafty' cousin Jonadab to feign illness and ask for her.", why: "The heir's appetite plus a cousin's cleverness — the palace's rot starts here." },
        { ref: "2 Samuel 13:11-14", when: "c. 990 BC, Amnon's house, Jerusalem", what: "He ignores Tamar's pleas and, being stronger, rapes her.", why: "Nathan's prophecy of trouble from David's own house (12:11) begins its terrible fulfillment." },
        { ref: "2 Samuel 13:15", when: "c. 990 BC, Jerusalem", what: "His 'love' flips instantly to loathing greater than the desire had been, and he bolts the door on her.", why: "One of Scripture's coldest verses about lust: it consumes, then discards." },
        { ref: "2 Samuel 13:23-29", when: "c. 988 BC, Baal-hazor", what: "Two years later, at Absalom's sheep-shearing feast, Absalom's servants kill Amnon when his heart is merry with wine.", why: "The firstborn dies at a party — and the succession crisis that ends in 1 Kings begins." }
      ],
      connections: [
        { to: "ahinoam", how: "Firstborn of the Jezreelite wife who had followed David through Gath and Ziklag." },
        { to: "absalom", how: "He violated Absalom's full sister Tamar, and Absalom waited two silent years before killing him for it." },
        { to: "shimea", how: "His uncle Shimea's son Jonadab, 'a very crafty man,' scripted the false-illness ruse that trapped Tamar." },
        { to: "david", how: "His father raged at the crime but never punished him — indulgence that let vengeance grow in the dark." }
      ]
    },
    {
      id: "chileab",
      name: "Chileab (Daniel)",
      meaning: "Chileab: \"like his father\" (?); Daniel: \"God is my judge\"",
      title: "David's second son, by Abigail of Carmel",
      description: "Second son born at Hebron, called Chileab in 2 Samuel and Daniel in 1 Chronicles 3:1. After his birth notice he never appears again: no crime, no rebellion, no claim on the throne. Whether he died young or simply lived quietly, his silence spared him the fate of Amnon, Absalom and Adonijah.",
      refs: ["2 Samuel 3:3", "1 Chronicles 3:1"],
      house: "david",
      gen: 2,
      parents: ["david", "abigail-carmel"],
      spouses: [],
      mentions: [
        { ref: "2 Samuel 3:3", when: "c. 1009 BC, Hebron years", what: "Born to David and Abigail, the widow of Nabal of Carmel — David's second son.", why: "Second in line after Amnon, yet he is never once mentioned in the succession struggles." },
        { ref: "1 Chronicles 3:1", when: "the Chronicler's genealogy", what: "The Chronicler lists the same son under the name Daniel.", why: "Two names, two verses, and then total silence — the loudest disappearance in David's family." },
        { ref: "1 Kings 1:5-6", when: "c. 971 BC, David's last days", what: "When Adonijah claims the throne as the eldest surviving son, Chileab is nowhere in the reckoning.", why: "His absence from the final contest is the strongest hint he was already gone — or wholly without ambition." }
      ],
      connections: [
        { to: "abigail-carmel", how: "Son of the wisest of David's wives — perhaps her discretion was his inheritance." },
        { to: "david", how: "The one Hebron son who never grieved his father: no crime, no coup, no story." },
        { to: "adonijah", how: "Had Chileab lived and pressed his claim, Adonijah could never have called himself the eldest heir." }
      ]
    },
    {
      id: "absalom",
      name: "Absalom",
      meaning: "\"My father is peace\"",
      title: "David's third son, by Maacah of Geshur — the rebel prince",
      description: "Grandson of a king on both sides, famed as the most handsome man in Israel, with hair he cut once a year. He murdered Amnon to avenge his sister Tamar, fled three years to Geshur, then stole Israel's heart and drove his father from Jerusalem. He died hanging in an oak, three of Joab's javelins in his heart, while David wept, \"O Absalom, my son, my son!\"",
      refs: ["2 Samuel 3:3", "2 Samuel 13:28-29", "2 Samuel 15:1-6", "2 Samuel 18:9-17", "2 Samuel 18:33", "1 Chronicles 3:2"],
      house: "david",
      gen: 2,
      parents: ["david", "maacah"],
      spouses: [],
      mentions: [
        { ref: "2 Samuel 3:3", when: "c. 1008 BC, Hebron years", what: "Born to David and Maacah, daughter of Talmai king of Geshur.", why: "Royal on both sides — the only Hebron son with a king for a grandfather." },
        { ref: "2 Samuel 13:20-22", when: "c. 990 BC, Jerusalem", what: "He takes his desolate sister Tamar into his house and says nothing to Amnon, good or bad.", why: "Two years of perfect silence — Absalom's hatred is patient, which makes it lethal." },
        { ref: "2 Samuel 13:28-29", when: "c. 988 BC, Baal-hazor", what: "At his sheep-shearing feast he orders his servants to strike Amnon down when the wine flows.", why: "The avenger of Tamar removes both his sister's rapist and the man ahead of him in line." },
        { ref: "2 Samuel 13:37-38", when: "c. 988-985 BC, Geshur", what: "He flees to his grandfather Talmai, king of Geshur, and stays three years.", why: "His mother's homeland is his refuge — the family tree doubles as an escape map." },
        { ref: "2 Samuel 14:25-26", when: "c. 985 BC, Jerusalem", what: "Praised as the most handsome man in Israel, without blemish head to foot; his annual haircut weighs two hundred shekels.", why: "The narrator lingers on the hair — the glory that will hold him fast in an oak." },
        { ref: "2 Samuel 15:1-6", when: "c. 980 BC, the gate of Jerusalem", what: "With chariot, horses and fifty runners, he intercepts litigants at the gate and 'steals the hearts of the men of Israel.'", why: "A four-year charm offensive — the rebellion is won in the courtroom line before a sword is drawn." },
        { ref: "2 Samuel 15:10-12", when: "c. 979 BC, Hebron", what: "He has himself proclaimed king at Hebron — the very city of his birth — and the conspiracy grows strong.", why: "He launches the coup from his father's first capital; David must flee Jerusalem barefoot and weeping." },
        { ref: "2 Samuel 18:9-17, 33", when: "c. 979 BC, forest of Ephraim", what: "His head catches in a great oak, his mule walks on, and Joab drives three javelins into his heart; David cries, 'Would I had died instead of you.'", why: "Suspended between heaven and earth, the beautiful rebel ends in a pit under a heap of stones — and his father's lament echoes forever." }
      ],
      connections: [
        { to: "maacah", how: "His mother's royal blood gave him a prince's bearing, and her father's Geshur gave him three years of asylum." },
        { to: "amnon", how: "He waited two years, then had his sister's rapist cut down over the feast wine." },
        { to: "joab", how: "Joab talked him home from exile, endured his burning barley field, and finally put three javelins through his heart." },
        { to: "david", how: "He stole the kingdom of the father who loved him — and that father's grief at his death nearly lost the kingdom again." },
        { to: "amasa", how: "He made his cousin Amasa general of the rebellion, binding another branch of the family to his doomed cause." }
      ]
    },
    {
      id: "adonijah",
      name: "Adonijah",
      meaning: "\"My Lord is the LORD\"",
      title: "David's fourth son, by Haggith — the almost-king",
      description: "Born at Hebron, handsome and never once crossed by his father. With Amnon and Absalom dead he was the eldest surviving prince, and in David's last days he claimed the throne with chariots, runners, and a feast — backed by Joab and Abiathar. Nathan and Bathsheba's counter-stroke crowned Solomon instead; Adonijah's later request for Abishag read as a fresh claim, and Solomon had him executed.",
      refs: ["2 Samuel 3:4", "1 Kings 1:5-10", "1 Kings 1:50-53", "1 Kings 2:13-25", "1 Chronicles 3:2"],
      house: "david",
      gen: 2,
      parents: ["david", "haggith"],
      spouses: [],
      mentions: [
        { ref: "2 Samuel 3:4", when: "c. 1007 BC, Hebron years", what: "Born to David and Haggith at Hebron, the king's fourth son.", why: "Fourth in line — but Amnon, Chileab and Absalom all drop away, leaving him at the front." },
        { ref: "1 Kings 1:5-6", when: "c. 971 BC, Jerusalem", what: "He exalts himself — 'I will be king' — with chariots, horsemen and fifty runners; his father had never in his life displeased him with a question.", why: "He copies Absalom's playbook exactly, and the narrator notes the same fatal parental indulgence." },
        { ref: "1 Kings 1:7-10", when: "c. 971 BC, En-rogel", what: "Joab and Abiathar the priest back him; he sacrifices at the Serpent's Stone and feasts all the princes — but does not invite Nathan, Benaiah, or Solomon.", why: "His guest list is his confession: he knows precisely who stands in his way." },
        { ref: "1 Kings 1:41-53", when: "c. 971 BC, Jerusalem", what: "Trumpets for Solomon interrupt the feast; his guests scatter, and Adonijah grips the horns of the altar until Solomon grants conditional mercy.", why: "From king-for-an-afternoon to sanctuary fugitive between courses of his own banquet." },
        { ref: "1 Kings 2:13-25", when: "c. 971 BC, Solomon's court", what: "He asks Bathsheba to get him Abishag the Shunammite as wife; Solomon reads it as a renewed claim on the throne and sends Benaiah to strike him down.", why: "In court politics, asking for the old king's concubine is asking for the old king's crown — the request is his death warrant." }
      ],
      connections: [
        { to: "haggith", how: "Forever 'the son of Haggith' in the narrative — branded by his mother's name through every scene of his failed coup." },
        { to: "joab", how: "The old general's backing made his claim credible — and dragged Joab down with him when it failed." },
        { to: "solomon", how: "His younger half-brother out-maneuvered him for the throne and later read one marriage request as treason." },
        { to: "bathsheba", how: "He sent his fatal petition for Abishag through her — the queen mother whose son he had tried to pre-empt." },
        { to: "absalom", how: "Chariots, fifty runners, self-proclamation: he reran his dead brother's rebellion, and it ran to the same end." }
      ]
    },
    {
      id: "shephatiah",
      name: "Shephatiah",
      meaning: "\"The LORD has judged\"",
      title: "David's fifth son, by Abital",
      description: "The fifth son born to David at Hebron, by his wife Abital. He appears only in the two birth lists — one of the two Hebron princes (with Ithream) who stayed entirely clear of the family's wars over the throne.",
      refs: ["2 Samuel 3:4", "1 Chronicles 3:3"],
      house: "david",
      gen: 2,
      parents: ["david", "abital"],
      spouses: [],
      mentions: [
        { ref: "2 Samuel 3:4", when: "c. 1006 BC, Hebron years", what: "Born to David and Abital at Hebron — the king's fifth son.", why: "His name, 'the LORD has judged,' hangs like a caption over the doomed brothers listed beside him." },
        { ref: "1 Chronicles 3:3", when: "the Chronicler's genealogy", what: "Listed fifth among the sons born at Hebron.", why: "Two list entries, zero scandals — in this family, obscurity was survival." }
      ],
      connections: [
        { to: "abital", how: "His mother's one recorded act is bearing him; mother and son share a quiet corner of a loud family." },
        { to: "david", how: "A son who asked nothing of his father's throne — and so appears in no tragedy." }
      ]
    },
    {
      id: "ithream",
      name: "Ithream",
      meaning: "\"Abundance of the people\" (?)",
      title: "David's sixth son, by Eglah",
      description: "The last of the six sons born to David at Hebron, by his wife Eglah. Like Shephatiah he is known only from the birth lists, untouched by the ambition and bloodshed that consumed Amnon, Absalom and Adonijah.",
      refs: ["2 Samuel 3:5", "1 Chronicles 3:3"],
      house: "david",
      gen: 2,
      parents: ["david", "eglah"],
      spouses: [],
      mentions: [
        { ref: "2 Samuel 3:5", when: "c. 1005 BC, Hebron years", what: "Born to David and Eglah at Hebron — the sixth and last son of the Hebron list.", why: "The list closes with him: six sons, six mothers, and the seeds of three tragedies." },
        { ref: "1 Chronicles 3:3", when: "the Chronicler's genealogy", what: "Listed sixth among the sons born at Hebron.", why: "Like Shephatiah, his entire story is a birth notice — and that spared him everything that followed." }
      ],
      connections: [
        { to: "eglah", how: "Son of the wife the list strangely singles out as 'David's wife' — the family's last small mystery." },
        { to: "david", how: "The quiet closing name of the Hebron birth list, never heard from again." }
      ]
    },
    {
      id: "solomon",
      name: "Solomon",
      meaning: "\"Peace\" (shalom); also Jedidiah, \"beloved of the LORD\"",
      title: "Son of David and Bathsheba; king in Jerusalem",
      description: "Born to David and Bathsheba after their first child died, and loved by the LORD, who named him Jedidiah. He inherited the throne, built the temple, and carries the royal line forward — the line Matthew 1 traces from Abraham through David and Solomon to the Messiah.",
      refs: ["2 Samuel 12:24-25", "1 Kings 1:39", "1 Kings 6:1", "Matthew 1:6-7"],
      house: "david",
      gen: 3,
      parents: ["david", "bathsheba"],
      spouses: [],
      tags: ["messiah-line"],
      mentions: [
        { ref: "2 Samuel 12:24-25", when: "c. 991 BC, Jerusalem", what: "Born to David and Bathsheba after their first child's death; the LORD loves him and names him Jedidiah through Nathan.", why: "Grace writes a new beginning into the family's darkest storyline." },
        { ref: "1 Kings 1:38-40", when: "c. 971 BC, the spring of Gihon", what: "While Adonijah feasts, Zadok anoints Solomon at Gihon; the earth splits with the people's joy.", why: "Two coronations in one afternoon — and the trumpet at Gihon settles which one counts." },
        { ref: "1 Kings 2:24-25", when: "c. 971 BC, Jerusalem", what: "Reading Adonijah's request for Abishag as a bid for the throne, he sends Benaiah to execute his half-brother.", why: "The last of the Hebron sons' rivalries is closed with a sword — the succession wars end here." },
        { ref: "1 Kings 3:5-14", when: "c. 970 BC, Gibeon", what: "Offered anything in a dream, he asks for a discerning heart to govern, and God adds riches and honor.", why: "The wisdom that defines him was a prayer request, not a birthright." },
        { ref: "1 Kings 6:1", when: "c. 967 BC, Jerusalem", what: "He begins building the house of the LORD, the temple his father was not permitted to build.", why: "The promise of 2 Samuel 7 — 'he shall build a house for my name' — comes true in cedar and stone." },
        { ref: "Matthew 1:6-7", when: "Matthew's genealogy", what: "The messianic line runs on 'David... Solomon' toward the Christ.", why: "The child of the scandalous marriage carries the covenant line forward." }
      ],
      connections: [
        { to: "david", how: "Inherited the throne, the covenant promise, and the commission to build the temple his father only planned." },
        { to: "bathsheba", how: "His mother's midnight audience with the dying king turned him from younger son into anointed heir." },
        { to: "adonijah", how: "The older half-brother whose feast his trumpets interrupted — and whose one request he answered with an executioner." },
        { to: "joab", how: "He settled his father's oldest unfinished account, having the general struck down at the altar for Abner's and Amasa's blood." }
      ]
    },

    // ========================= HOUSE OF SAUL ================================
    {
      id: "abiel",
      name: "Abiel",
      meaning: "\"God is my father\"",
      title: "Benjaminite patriarch — grandfather of Saul and Abner",
      description: "A man of Benjamin from whom both branches of Saul's house descend: 1 Samuel 14:51 makes both Kish and Ner his sons. (1 Chronicles 8:33 instead calls Ner the father of Kish — the genealogies preserve the family differently, and this tree follows 1 Samuel.)",
      refs: ["1 Samuel 9:1", "1 Samuel 14:51", "1 Chronicles 8:33"],
      house: "saul",
      gen: 0,
      parents: [],
      spouses: [],
      mentions: [
        { ref: "1 Samuel 9:1", when: "c. 1080 BC, land of Benjamin", what: "Named in the pedigree that introduces Kish, 'son of Abiel,' a Benjaminite of standing.", why: "The royal house of Saul enters Scripture through this quiet grandfather's name." },
        { ref: "1 Samuel 14:51", when: "genealogical note, Saul's reign", what: "Both Kish (Saul's father) and Ner (Abner's father) are called sons of Abiel.", why: "One verse makes king and general cousins — the whole northern command was one family." }
      ],
      connections: [
        { to: "kish", how: "Father of the man whose lost donkeys started Israel's monarchy." },
        { to: "ner", how: "His other son's line produced Abner — so both Saul's crown and Saul's army came from Abiel's house." }
      ]
    },
    {
      id: "kish",
      name: "Kish",
      meaning: "Perhaps \"bow, power\" (?)",
      title: "Father of Saul",
      description: "A Benjaminite of standing, \"a man of wealth,\" whose lost donkeys sent his tall son wandering into the path of Samuel the seer. He was buried at Zela, where Saul's and Jonathan's bones were finally laid to rest beside his.",
      refs: ["1 Samuel 9:1-3", "1 Samuel 10:21", "2 Samuel 21:14"],
      house: "saul",
      gen: 1,
      parents: ["abiel"],
      spouses: [],
      mentions: [
        { ref: "1 Samuel 9:1-3", when: "c. 1052 BC, Gibeah of Benjamin", what: "His donkeys stray, and he sends his son Saul with a servant to find them.", why: "The most consequential livestock loss in the Bible — the errand ends at Samuel's table." },
        { ref: "1 Samuel 10:21", when: "c. 1050 BC, Mizpah", what: "When lots are cast for a king, 'Saul the son of Kish' is taken — and found hiding in the baggage.", why: "His family name is read out over all Israel at the monarchy's birth." },
        { ref: "2 Samuel 21:14", when: "late in David's reign, Zela of Benjamin", what: "The bones of Saul and Jonathan are buried in the tomb of Kish his father.", why: "The story of Saul's house closes where it began — in Kish's family grave." }
      ],
      connections: [
        { to: "saul", how: "He sent his son after lost donkeys, and the boy came home anointed by a prophet." },
        { to: "abiel", how: "Son of Abiel, brother of Ner — patriarch of the crown side of Benjamin's first family." }
      ]
    },
    {
      id: "ner",
      name: "Ner",
      meaning: "\"Lamp\"",
      title: "Father of Abner",
      description: "Brother of Kish and son of Abiel in 1 Samuel 14:50-51, which makes his son Abner Saul's cousin — though the verse can also be read as calling Abner Saul's uncle, and Chronicles orders the family differently. The texts agree on what matters: Abner, son of Ner, was blood kin to the king he served.",
      refs: ["1 Samuel 14:50-51", "1 Chronicles 8:33"],
      house: "saul",
      gen: 1,
      parents: ["abiel"],
      spouses: [],
      mentions: [
        { ref: "1 Samuel 14:50-51", when: "genealogical note, Saul's reign", what: "Named as father of Abner, commander of Saul's army, and kinsman of Kish.", why: "The 'lamp' of Benjamin fathered the man who kept Saul's house burning after Gilboa." },
        { ref: "2 Samuel 2:8", when: "c. 1011 BC, Mahanaim", what: "His son is introduced anew as 'Abner the son of Ner, commander of Saul's army' as he crowns Ish-bosheth.", why: "Even in 2 Samuel, Abner never appears without his father's name attached." }
      ],
      connections: [
        { to: "abner", how: "His son commanded Saul's army and, for two years, effectively ruled the northern kingdom." },
        { to: "kish", how: "Brother (per 1 Samuel) — their two sons became king and general, the twin pillars of Benjamin's dynasty." }
      ]
    },
    {
      id: "saul",
      name: "Saul",
      meaning: "\"Asked for\"",
      title: "First king of Israel",
      description: "The tall Benjaminite anointed by Samuel when Israel demanded a king — the name itself means \"asked for.\" Victorious early, he was rejected for disobedience, tormented in spirit, and consumed by jealousy of David; he fell on his own sword on Mount Gilboa beside three of his sons.",
      refs: ["1 Samuel 9:2", "1 Samuel 10:1", "1 Samuel 15:26", "1 Samuel 18:8-9", "1 Samuel 31:4"],
      house: "saul",
      gen: 2,
      parents: ["kish"],
      spouses: [],
      mentions: [
        { ref: "1 Samuel 9:2; 10:1", when: "c. 1050 BC, Ramah", what: "Head and shoulders taller than any of the people, he goes hunting donkeys and is privately anointed prince by Samuel.", why: "Israel asked for a king who looked the part — and got exactly what it asked for." },
        { ref: "1 Samuel 11:6-11", when: "c. 1049 BC, Jabesh-gilead", what: "The Spirit rushes on him; he cuts oxen in pieces to muster Israel and shatters the Ammonites besieging Jabesh.", why: "His finest hour — and Jabesh never forgot: its men will retrieve his body from the wall of Beth-shan (31:11-13)." },
        { ref: "1 Samuel 13:8-14", when: "c. 1048 BC, Gilgal", what: "Pressed by a scattering army, he offers the burnt offering himself instead of waiting for Samuel.", why: "First fracture: 'your kingdom shall not continue' — impatience costs a dynasty." },
        { ref: "1 Samuel 15:26-28", when: "c. 1030 BC, Gilgal", what: "Having spared Agag and the best of the flocks, he is rejected as king; the torn hem of Samuel's robe becomes a sign of the torn kingdom.", why: "'To obey is better than sacrifice' — the epitaph of his reign." },
        { ref: "1 Samuel 18:8-9", when: "c. 1019 BC, after Goliath", what: "The women's song — 'David his ten thousands' — leaves Saul eyeing David from that day on.", why: "The jealousy that consumes the rest of his life begins with a lyric." },
        { ref: "1 Samuel 19:9-10", when: "c. 1018 BC, Gibeah", what: "Under a harmful spirit he hurls his spear at David as he plays the lyre.", why: "The court musician dodges the king's spear — twice — and the hunt begins." },
        { ref: "1 Samuel 28:7-19", when: "c. 1011 BC, En-dor", what: "On the eve of Gilboa, disguised at night, he asks a medium to raise Samuel, and hears his doom confirmed.", why: "The king who banished the mediums crawls to one at the end — and the dead prophet keeps his word." },
        { ref: "1 Samuel 31:4", when: "c. 1011 BC, Mount Gilboa", what: "Wounded by archers, he falls on his own sword rather than be abused by the Philistines.", why: "Israel's first king dies by his own hand, beside three of his sons." }
      ],
      connections: [
        { to: "david", how: "He loved the boy's harp, feared the man's success, and spent his last decade hunting the son-in-law who twice spared his life." },
        { to: "jonathan", how: "His heir defied him for David's sake — and still stood beside him to the last on Gilboa." },
        { to: "michal", how: "He priced his daughter at a hundred Philistine foreskins as a snare for David, then tore her from him to spite him." },
        { to: "abner", how: "His kinsman-general sat at his table, guarded his camp, and outlived him to prop up his dynasty's remnant." }
      ]
    },
    {
      id: "abner",
      name: "Abner",
      meaning: "\"Father of light\" (or \"my father is a lamp\")",
      title: "Son of Ner, commander of Saul's army",
      description: "Saul's kinsman and general, who sat at the king's table and later made Ish-bosheth king over the north. Cornered at Gibeon he killed the pursuing Asahel in self-defense; when he finally moved to bring Israel over to David, Joab murdered him in the gate of Hebron, and David wept at his grave.",
      refs: ["1 Samuel 14:50", "1 Samuel 17:55", "1 Samuel 26:14-16", "2 Samuel 2:8", "2 Samuel 2:23", "2 Samuel 3:27-34"],
      house: "saul",
      gen: 3,
      parents: ["ner"],
      spouses: [],
      mentions: [
        { ref: "1 Samuel 14:50", when: "Saul's reign, Gibeah", what: "Introduced as commander of Saul's army and the king's kinsman.", why: "The strongman behind the throne from the monarchy's first generation." },
        { ref: "1 Samuel 17:55-57", when: "c. 1020 BC, Valley of Elah", what: "Saul asks him whose son the boy with the sling is; Abner must bring David, Goliath's head in hand, before the king.", why: "The general personally escorts into court the youth who will one day inherit everything he serves." },
        { ref: "1 Samuel 26:14-16", when: "c. 1012 BC, hill of Hachilah", what: "David, holding the king's stolen spear, taunts him across the valley: 'Are you not a man?... you deserve to die, for you have not kept watch over your lord.'", why: "The great commander is publicly shamed by the fugitive he is hunting." },
        { ref: "2 Samuel 2:8-10", when: "c. 1011 BC, Mahanaim", what: "After Gilboa he takes Ish-bosheth across the Jordan and makes him king over Israel.", why: "For two years Abner's will — not Ish-bosheth's — is all that keeps Saul's dynasty alive." },
        { ref: "2 Samuel 2:19-23", when: "c. 1010 BC, the pursuit from Gibeon", what: "He twice warns the pursuing Asahel to turn aside, then kills him with the butt of his spear.", why: "A reluctant, backward-handed killing — yet it buys him a blood-feud with the sons of Zeruiah." },
        { ref: "2 Samuel 3:6-10", when: "c. 1005 BC, Mahanaim", what: "Accused by Ish-bosheth over Saul's concubine Rizpah, he erupts and vows to transfer the kingdom from Saul's house to David.", why: "One petulant accusation flips the North's real ruler — and decides the civil war." },
        { ref: "2 Samuel 3:12-21", when: "c. 1005 BC, Hebron", what: "He covenants with David, delivers Michal, rallies Israel's elders, and leaves the feast in peace.", why: "Hours from uniting the kingdom peacefully — the treaty dies with him at the gate." },
        { ref: "2 Samuel 3:27-34", when: "c. 1005 BC, the gate of Hebron", what: "Joab pulls him aside and stabs him; David walks weeping behind the bier — 'Shall Abner die as a fool dies?... a prince and a great man has fallen this day.'", why: "The king's public grief is the only thing standing between the murder and a second civil war." }
      ],
      connections: [
        { to: "saul", how: "Cousin, table-companion and sword-arm of the first king — his career was Saul's dynasty." },
        { to: "asahel", how: "The boy who wouldn't stop chasing him at Gibeon died on his spear-butt — the kill Abner never wanted." },
        { to: "joab", how: "He killed Joab's brother in battle and got a dagger in the belly at a peace conference for it." },
        { to: "ishbosheth", how: "He made the weak heir a king and unmade him with one furious vow over Rizpah." },
        { to: "michal", how: "He tore Michal from the weeping Phaltiel and delivered her to Hebron as the seal of his covenant with David." }
      ]
    },
    {
      id: "jonathan",
      name: "Jonathan",
      meaning: "\"The LORD has given\"",
      title: "Saul's firstborn, covenant friend of David",
      description: "The valiant prince who climbed the crag at Michmash with only his armor-bearer, trusting that \"nothing can hinder the LORD from saving.\" He loved David as his own soul, gave him his robe and sword, and shielded him from Saul's spear — then died beside his father on Mount Gilboa.",
      refs: ["1 Samuel 14:6-14", "1 Samuel 18:1-4", "1 Samuel 20:16-17", "1 Samuel 31:2", "2 Samuel 1:26"],
      house: "saul",
      gen: 3,
      parents: ["saul"],
      spouses: [],
      tags: ["gilboa"],
      mentions: [
        { ref: "1 Samuel 14:6-14", when: "c. 1048 BC, the pass of Michmash", what: "With only his armor-bearer he climbs the crag to the Philistine garrison — 'nothing can hinder the LORD from saving by many or by few' — and routs it.", why: "Twenty dead in half a furrow: the faith-verse of the book, lived out on a cliff face." },
        { ref: "1 Samuel 14:27-45", when: "c. 1048 BC, after the battle", what: "Unaware of Saul's rash oath, he tastes honey and is condemned to die — until the army ransoms him: 'Shall Jonathan die, who has worked this great salvation?'", why: "The people overrule the king to save the prince — the first crack between Saul and everyone else." },
        { ref: "1 Samuel 18:1-4", when: "c. 1019 BC, Gibeah", what: "His soul is knit to David's; he strips off his robe, armor, sword and bow and gives them to the shepherd.", why: "The heir apparent hands his own royal insignia to the man God chose instead — without a fight." },
        { ref: "1 Samuel 19:4-7", when: "c. 1018 BC, Gibeah", what: "He talks his father out of killing David and brings David back to court.", why: "The first of his rescues — a son lobbying the king against the king's own madness." },
        { ref: "1 Samuel 20:30-42", when: "c. 1017 BC, Gibeah", what: "Saul hurls a spear at him for defending David; by the arrow-signal in the field the friends part in tears, David weeping the most.", why: "He accepts his father's rage as the price of his friend's life." },
        { ref: "1 Samuel 23:16-18", when: "c. 1014 BC, Horesh", what: "He slips out to David in hiding and 'strengthens his hand in God': 'You shall be king over Israel, and I shall be next to you.'", why: "The prince's last recorded words renounce his own crown — a hope history never let him keep." },
        { ref: "1 Samuel 31:2", when: "c. 1011 BC, Mount Gilboa", what: "The Philistines overtake and kill him beside his brothers on Gilboa.", why: "He dies loyal to the father he defied and the friend he crowned in his heart." },
        { ref: "2 Samuel 1:25-26", when: "c. 1011 BC, Ziklag", what: "David laments him: 'your love to me was extraordinary, surpassing the love of women.'", why: "The friendship gets the most famous funeral song in Scripture." }
      ],
      connections: [
        { to: "david", how: "He loved the man who would take his throne, armed him with his own sword, and saved his life from the king." },
        { to: "saul", how: "He faced his father's spear for David's sake — and still died fighting at that father's side." },
        { to: "mephibosheth", how: "His crippled son lived to receive, at David's table, the covenant kindness Jonathan had sworn long before." },
        { to: "michal", how: "Brother and sister each saved David once — he with words in the council, she through a window in the night." }
      ]
    },
    {
      id: "abinadab-saul",
      name: "Abinadab",
      meaning: "\"My father is noble / willing\"",
      title: "Son of Saul, fell at Gilboa",
      description: "One of Saul's sons, named among the fallen when the Philistines overtook the king's household on Mount Gilboa. He may be the \"Ishvi\" of 1 Samuel 14:49 under another name. (Distinct from Jesse's son Abinadab.)",
      refs: ["1 Samuel 31:2", "1 Samuel 14:49", "1 Chronicles 8:33"],
      house: "saul",
      gen: 3,
      parents: ["saul"],
      spouses: [],
      tags: ["gilboa"],
      mentions: [
        { ref: "1 Samuel 14:49", when: "genealogical note, Saul's reign", what: "Saul's sons are listed — Jonathan, Ishvi (possibly Abinadab under another name), and Malchi-shua.", why: "A naming puzzle: the middle son goes by different names in different lists." },
        { ref: "1 Samuel 31:2", when: "c. 1011 BC, Mount Gilboa", what: "The Philistines overtake and kill Jonathan, Abinadab and Malchi-shua, the sons of Saul.", why: "Three princes fall in one verse — the dynasty is gutted in a single afternoon." },
        { ref: "1 Chronicles 10:2", when: "the Chronicler's account of Gilboa", what: "Chronicles repeats the fall of Saul's three sons before the Philistines.", why: "Both witnesses agree: the succession died on the mountain with the king." }
      ],
      connections: [
        { to: "saul", how: "He followed his father up Gilboa and fell before him there." },
        { to: "jonathan", how: "Brothers in the battle line — the famous prince and the near-anonymous one died the same hour." },
        { to: "malchishua", how: "Named and killed together in the same verse — brothers in the list, brothers in the grave." }
      ]
    },
    {
      id: "malchishua",
      name: "Malchi-shua",
      meaning: "\"My king is salvation\"",
      title: "Son of Saul, fell at Gilboa",
      description: "Named among Saul's sons in both Samuel and Chronicles, he died with Jonathan and Abinadab when the Philistines pressed hard after the house of Saul on Gilboa. His name is a small tragedy in itself: \"my king is salvation.\"",
      refs: ["1 Samuel 14:49", "1 Samuel 31:2", "1 Chronicles 10:2"],
      house: "saul",
      gen: 3,
      parents: ["saul"],
      spouses: [],
      tags: ["gilboa"],
      mentions: [
        { ref: "1 Samuel 14:49", when: "genealogical note, Saul's reign", what: "Listed among Saul's sons in the summary of the king's house.", why: "A prince known almost entirely from lists — until the last list of all." },
        { ref: "1 Samuel 31:2", when: "c. 1011 BC, Mount Gilboa", what: "He is killed with Jonathan and Abinadab as the Philistines overtake Saul's sons.", why: "'My king is salvation,' says his name — on Gilboa neither king nor name could save him." },
        { ref: "1 Chronicles 10:2", when: "the Chronicler's account of Gilboa", what: "Chronicles confirms his death among the sons of Saul.", why: "His two appearances outside the genealogies are both death notices." }
      ],
      connections: [
        { to: "saul", how: "Died on the mountain within sight of his father's last stand." },
        { to: "jonathan", how: "Fell beside his famous brother, sharing his fate if not his fame." },
        { to: "abinadab-saul", how: "The two lesser-known princes are never mentioned apart — listed together, slain together." }
      ]
    },
    {
      id: "ishbosheth",
      name: "Ish-bosheth (Eshbaal)",
      meaning: "\"Man of shame\" — his older name Eshbaal, \"man of the lord/Baal\"",
      title: "Saul's surviving son, rival king",
      description: "The son Abner set on Saul's throne at Mahanaim, reigning over the north while David reigned at Hebron. Weak without his general, he accused Abner over a concubine and lost him to David's side; two of his own captains murdered him in his bed at noon.",
      refs: ["2 Samuel 2:8-10", "2 Samuel 3:7-11", "2 Samuel 4:5-8", "1 Chronicles 8:33"],
      house: "saul",
      gen: 3,
      parents: ["saul"],
      spouses: [],
      mentions: [
        { ref: "2 Samuel 2:8-10", when: "c. 1011 BC, Mahanaim", what: "Abner takes him over the Jordan and makes him king over Israel; he reigns two years while Judah follows David.", why: "A king crowned by his general, ruling from exile across the river — the throne is his in name only." },
        { ref: "2 Samuel 3:7-11", when: "c. 1005 BC, Mahanaim", what: "He accuses Abner of going in to Saul's concubine Rizpah; Abner explodes, and Ish-bosheth 'could not answer him a word, because he feared him.'", why: "One accusation he is too weak to sustain costs him the only man holding up his kingdom." },
        { ref: "2 Samuel 3:14-15", when: "c. 1005 BC, Mahanaim", what: "At David's demand he takes Michal from her husband Paltiel and sends his own sister to Hebron.", why: "He hands David the ultimate dynastic claim — Saul's daughter — signing away his house's future." },
        { ref: "2 Samuel 4:5-8", when: "c. 1004 BC, Mahanaim", what: "Two of his own captains, Rechab and Baanah, stab him during his midday rest and carry his head to David.", why: "The rival kingship ends in a bedroom at noon — betrayed by his own officers." },
        { ref: "2 Samuel 4:12", when: "c. 1004 BC, Hebron", what: "David executes the assassins and buries Ish-bosheth's head in Abner's tomb at Hebron.", why: "King and kingmaker end in one grave — and David's hands stay publicly clean of Saul's blood." }
      ],
      connections: [
        { to: "abner", how: "His general made him king, and one quarrel over Rizpah unmade him — he never ruled a day without Abner's leave." },
        { to: "saul", how: "The son who missed Gilboa inherited the wreckage of his father's kingdom." },
        { to: "michal", how: "He surrendered his own sister to David's demand — dynastic capital he could not afford to lose." },
        { to: "david", how: "His rival across the civil war, who avenged his murder and buried his head with honor." }
      ]
    },
    {
      id: "merab",
      name: "Merab",
      meaning: "\"Increase\" (?)",
      title: "Saul's elder daughter",
      description: "Promised to David as reward for fighting the LORD's battles, but given instead to Adriel the Meholathite when the time came. Her five sons later died in the atonement for Saul's bloodguilt against the Gibeonites.",
      refs: ["1 Samuel 14:49", "1 Samuel 18:17-19", "2 Samuel 21:8-9"],
      house: "saul",
      gen: 3,
      parents: ["saul"],
      spouses: [],
      mentions: [
        { ref: "1 Samuel 14:49", when: "genealogical note, Saul's reign", what: "Named as Saul's elder daughter, alongside Michal.", why: "Two princesses — both will be used as pieces in their father's game against David." },
        { ref: "1 Samuel 18:17-19", when: "c. 1019 BC, Gibeah", what: "Saul offers her to David — hoping the Philistines will kill him — then gives her to Adriel the Meholathite instead.", why: "Promised, dangled, and withdrawn: a royal bride as bait in an assassination-by-proxy scheme." },
        { ref: "2 Samuel 21:8-9", when: "late in David's reign, Gibeah", what: "Her five sons by Adriel are handed to the Gibeonites and hanged on the mountain to atone for Saul's bloodguilt.", why: "The bill for her father's broken treaty is paid by her children — the house of Saul's grimmest footnote." }
      ],
      connections: [
        { to: "saul", how: "Her father used her betrothal as a trap for David, then broke his word when the trap failed." },
        { to: "david", how: "The wife he was promised and never given — their non-marriage was Saul's first snare." },
        { to: "michal", how: "When Merab was withheld, her younger sister — who actually loved David — became the substitute bride." }
      ]
    },
    {
      id: "michal",
      name: "Michal",
      meaning: "Perhaps \"who is like God?\"",
      title: "Saul's daughter, David's first wife — the bridge between the houses",
      description: "The princess who loved David — the only woman in Scripture said to love a man — and was married to him for a bride-price of a hundred Philistines. She let him down through a window to escape her father's assassins, was torn from him and given to Paltiel, then reclaimed; she died childless after despising David's dance before the ark. Her marriage is the one thread tying the rival houses together.",
      refs: ["1 Samuel 14:49", "1 Samuel 18:20-27", "1 Samuel 19:11-17", "2 Samuel 3:13-16", "2 Samuel 6:16-23"],
      house: "saul",
      gen: 3,
      parents: ["saul"],
      spouses: ["david", "phaltiel"],
      tags: ["bridge"],
      mentions: [
        { ref: "1 Samuel 18:20-27", when: "c. 1019 BC, Gibeah", what: "She loves David; Saul prices her at a hundred Philistine foreskins, hoping David dies earning it — he brings back two hundred.", why: "The only woman in Scripture said to love a man — and her love is immediately weaponized by her father." },
        { ref: "1 Samuel 19:11-17", when: "c. 1018 BC, Gibeah", what: "She lets David down through the window ahead of Saul's assassins and stalls them with a household idol tucked in the bed.", why: "The princess chooses her husband over her father — with teraphim, goats' hair, and nerve." },
        { ref: "1 Samuel 25:44", when: "c. 1013 BC, Gibeah", what: "With David outlawed, Saul gives her to Palti son of Laish of Gallim.", why: "Her father erases her marriage by decree — she becomes a pawn passed between houses." },
        { ref: "2 Samuel 3:13-16", when: "c. 1005 BC, Bahurim road", what: "David makes her return the condition of his covenant with Abner; she is taken from Paltiel, who follows her weeping to Bahurim.", why: "Reclaimed as a treaty clause — the text records Paltiel's tears but never hers." },
        { ref: "2 Samuel 6:16-23", when: "c. 1003 BC, Jerusalem", what: "Watching from a window as David dances before the ark, she despises him in her heart; after their bitter exchange she has no child to the day of her death.", why: "The story that began at a window in love ends at a window in contempt — and the two houses never merge." }
      ],
      connections: [
        { to: "david", how: "She loved him, saved him through a window, was traded back to him by treaty — and ended despising him from another window." },
        { to: "phaltiel", how: "The second husband who walked weeping behind her all the way to Bahurim until Abner ordered him home." },
        { to: "saul", how: "Her father sold her love as a snare, then revoked her marriage out of spite." },
        { to: "merab", how: "She became David's bride only after her elder sister was promised and withheld." }
      ]
    },
    {
      id: "phaltiel",
      name: "Phaltiel (Palti) son of Laish",
      meaning: "\"God is my deliverance\"",
      title: "Of Gallim — Michal's second husband",
      description: "The man to whom Saul gave Michal after outlawing David. Years later, when her return became the price of Abner's covenant, Phaltiel followed her weeping all the way to Bahurim until Abner turned on him: \"Go, return.\" And he returned — one of the Bible's quietest heartbreaks, caught in the gears of two dynasties.",
      refs: ["1 Samuel 25:44", "2 Samuel 3:15-16"],
      house: "saul",
      gen: 3,
      parents: [],
      spouses: ["michal"],
      mentions: [
        { ref: "1 Samuel 25:44", when: "c. 1013 BC, Gallim", what: "Saul gives Michal, David's wife, to Palti the son of Laish of Gallim.", why: "He receives a princess by royal decree — another man's wife, handed over as an insult to David." },
        { ref: "2 Samuel 3:15-16", when: "c. 1005 BC, the road to Bahurim", what: "Ish-bosheth takes Michal from him; Phaltiel walks behind her weeping all the way to Bahurim, until Abner says, 'Go, return,' and he returns.", why: "Two verses, one broken man — the human cost of the kings' bargaining, remembered forever for his tears." }
      ],
      connections: [
        { to: "michal", how: "He wept behind her the whole road to Bahurim — the only person in the transaction whose feelings the text records." },
        { to: "abner", how: "Two words from the general — 'Go, return' — ended his marriage and his part in history." },
        { to: "david", how: "The king's treaty demand for his first wife made Phaltiel's marriage the price of national unity." },
        { to: "saul", how: "Saul's spite gave him Michal in the first place — he was armed against David with another man's wife." }
      ]
    },
    {
      id: "mephibosheth",
      name: "Mephibosheth (Merib-baal)",
      meaning: "\"From the mouth of shame\" — his older name Merib-baal, \"opponent of Baal\" (?)",
      title: "Jonathan's son, lame in his feet",
      description: "Five years old when news came from Gilboa; his nurse fled with him, he fell, and he was lame in both feet ever after. For Jonathan's sake David sought him out, restored Saul's land to him, and seated him at the king's own table \"like one of the king's sons.\"",
      refs: ["2 Samuel 4:4", "2 Samuel 9:1-13", "2 Samuel 19:24-30", "1 Chronicles 8:34"],
      house: "saul",
      gen: 4,
      parents: ["jonathan"],
      spouses: [],
      mentions: [
        { ref: "2 Samuel 4:4", when: "c. 1011 BC, fleeing Gibeah", what: "At news of Gilboa his nurse flees with the five-year-old; he falls and is lame in both feet ever after.", why: "One panicked morning marks his body for life — the dynasty's last heir can no longer run." },
        { ref: "2 Samuel 9:1-13", when: "c. 995 BC, Jerusalem", what: "David asks, 'Is there still anyone left of the house of Saul, that I may show him kindness for Jonathan's sake?' — and seats Mephibosheth at the royal table for life.", why: "Where ancient kings purged rival houses, David adopts one — Jonathan's covenant outliving Jonathan." },
        { ref: "2 Samuel 16:1-4", when: "c. 979 BC, fleeing Jerusalem", what: "His servant Ziba meets David with supplies and claims Mephibosheth stayed behind dreaming of his grandfather's throne; David gives Ziba everything.", why: "Slandered in absentia — a cliffhanger of loyalty that waits until the king returns." },
        { ref: "2 Samuel 19:24-30", when: "c. 979 BC, the Jordan crossing", what: "Unwashed and unkempt since the day David left, he meets the returning king; told to split the land with Ziba he answers, 'Let him take it all, since my lord the king has come safely home.'", why: "His indifference to the property is his vindication — he wanted the king, not the estate." },
        { ref: "2 Samuel 21:7", when: "late in David's reign, Gibeah", what: "When seven of Saul's descendants are given to the Gibeonites, David spares Mephibosheth because of the oath between David and Jonathan.", why: "The covenant saves his life a second time — Jonathan's love still shielding his son decades on." }
      ],
      connections: [
        { to: "jonathan", how: "His father's covenant with David, sworn before he could walk, fed him at a king's table all his life." },
        { to: "david", how: "The king who should have feared Saul's heir called him to Jerusalem and treated him as a son." },
        { to: "saul", how: "Grandson and last public face of the fallen house — lame, landless, and yet spared every purge." }
      ]
    }
  ]
};
