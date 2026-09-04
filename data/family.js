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
//     }]
//   }
// Sibling links are derived by the view: people sharing a parent id are siblings.
// Key sources: Ruth 4:17–22; 1 Samuel 14:49–51; 1 Chronicles 2:13–17; 2 Samuel 2–4, 9.

window.FAMILY = {
  title: "Family Lines — the houses of David and Saul",
  source: "Ruth 4; 1 Samuel 14; 1 Chronicles 2 & 8; 2 Samuel 2–9",
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
      tags: ["couple", "messiah-line"]
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
      tags: ["messiah-line"]
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
      tags: ["messiah-line", "easter-egg"]
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
      tags: ["messiah-line"]
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
      tags: ["messiah-line"]
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
      spouses: []
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
      spouses: []
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
      spouses: []
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
      spouses: []
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
      spouses: []
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
      spouses: []
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
      spouses: ["michal", "ahinoam", "abigail-carmel", "bathsheba"],
      tags: ["messiah-line"]
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
      spouses: []
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
      spouses: ["jether"]
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
      spouses: ["abigail-sister"]
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
      tags: ["zeruiah-son"]
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
      tags: ["zeruiah-son"]
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
      tags: ["zeruiah-son"]
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
      spouses: []
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
      spouses: ["david"]
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
      spouses: ["david"]
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
      spouses: ["david"]
    },

    // --- David's sons --------------------------------------------------------
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
      tags: ["group"]
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
      tags: ["messiah-line"]
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
      spouses: []
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
      spouses: []
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
      spouses: []
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
      spouses: []
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
      spouses: []
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
      tags: ["gilboa"]
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
      tags: ["gilboa"]
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
      tags: ["gilboa"]
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
      spouses: []
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
      spouses: []
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
      spouses: ["david"],
      tags: ["bridge"]
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
      spouses: []
    }
  ]
};
