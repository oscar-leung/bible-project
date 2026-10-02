// data/locations.js — window.LOCATIONS (Historian)
// Coordinates are real-world approximations (WGS84) of the accepted or leading
// site identifications. lon range 34.0–36.0, lat range 30.8–33.0 per the map projection.

window.LOCATIONS = [
  {
    id: "ramah",
    name: "Ramah",
    modernName: "er-Ram (traditional; some scholars prefer Rentis/Ramathaim)",
    lat: 31.849, lon: 35.234,
    description: "Hometown of Elkanah and Hannah and lifelong base of Samuel, who judged Israel from here on his yearly circuit. David fled to Samuel at Ramah, and Samuel was buried here.",
    chapters: [1, 2, 7, 8, 9, 10, 15, 16, 19, 25]
  },
  {
    id: "shiloh",
    name: "Shiloh",
    modernName: "Khirbet Seilun (Tel Shiloh)",
    lat: 32.055, lon: 35.289,
    description: "Israel's central sanctuary in the days of the judges, where the tabernacle and the ark rested under Eli's priesthood. Hannah prayed here, and the boy Samuel heard God's call here. After the ark's capture the site fades from the story.",
    chapters: [1, 2, 3, 4]
  },
  {
    id: "bethel",
    name: "Bethel",
    modernName: "Beitin",
    lat: 31.930, lon: 35.239,
    description: "Ancient shrine town in the hill country of Ephraim, one of the stops on Samuel's annual circuit as judge. Its name means 'house of God,' recalling Jacob's vision there.",
    chapters: [7]
  },
  {
    id: "aphek",
    name: "Aphek",
    modernName: "Tel Afek (Antipatris), Rosh Ha'ayin",
    lat: 32.105, lon: 34.930,
    description: "Philistine staging ground at the springs of the Yarkon, on the border between the coastal plain and the hills. The Philistines mustered here before capturing the ark, and again before the final campaign against Saul.",
    chapters: [4, 29]
  },
  {
    id: "ebenezer",
    name: "Ebenezer",
    modernName: "possibly Izbet Sartah",
    lat: 32.105, lon: 34.968,
    description: "Israel's camp opposite Aphek where the ark was lost in battle. Years later Samuel raised a memorial stone he named Ebenezer, 'stone of help,' after the victory at Mizpah.",
    chapters: [4, 7]
  },
  {
    id: "ashdod",
    name: "Ashdod",
    modernName: "Tel Ashdod",
    lat: 31.756, lon: 34.655,
    description: "One of the five lordly cities of the Philistines, home of the temple of Dagon. The captured ark was brought here first, where Dagon's image fell broken before it and plague struck the city.",
    chapters: [5]
  },
  {
    id: "gath",
    name: "Gath",
    modernName: "Tell es-Safi",
    lat: 31.700, lon: 34.847,
    description: "Philistine royal city and hometown of Goliath. The ark brought plague here, and later David twice took refuge in Gath under King Achish — first feigning madness, later as a vassal commander.",
    chapters: [5, 17, 21, 27]
  },
  {
    id: "ekron",
    name: "Ekron",
    modernName: "Tel Miqne (Khirbet el-Muqanna)",
    lat: 31.779, lon: 34.851,
    description: "Northernmost city of the Philistine pentapolis. Its people cried out when the plague-bearing ark arrived, and from here it was sent home on a cart. Israel pursued the Philistines to the gates of Ekron after Goliath fell.",
    chapters: [5, 6, 17]
  },
  {
    id: "beth-shemesh",
    name: "Beth-shemesh",
    modernName: "Tel Beth-Shemesh (Tell er-Rumeileh)",
    lat: 31.752, lon: 34.976,
    description: "Israelite border town in the Sorek Valley where the ark's cart came to rest, greeted by wheat harvesters. Joy turned to mourning when some men looked into the ark and were struck down.",
    chapters: [6]
  },
  {
    id: "kiriath-jearim",
    name: "Kiriath-jearim",
    modernName: "Deir el-Azar, above Abu Ghosh",
    lat: 31.807, lon: 35.103,
    description: "Hill town on the Judah–Benjamin border where the ark rested for some twenty years in the house of Abinadab, tended by his son Eleazar, until David later brought it to Jerusalem.",
    chapters: [6, 7]
  },
  {
    id: "mizpah",
    name: "Mizpah",
    modernName: "Tell en-Nasbeh",
    lat: 31.885, lon: 35.216,
    description: "Benjaminite assembly place where Samuel gathered Israel for fasting and repentance, and where the Lord routed the Philistines with thunder. Saul was later publicly chosen king here by lot.",
    chapters: [7, 10]
  },
  {
    id: "gilgal",
    name: "Gilgal",
    modernName: "unidentified; near Khirbet el-Mefjer, east of Jericho",
    lat: 31.871, lon: 35.470,
    description: "Camp and shrine in the Jordan Valley near Jericho, rich with memories of Joshua's crossing. Saul's kingship was renewed here — and it was also here that Saul's disobedient sacrifice and the Amalek affair cost him the kingdom.",
    chapters: [7, 10, 11, 12, 13, 15]
  },
  {
    id: "gibeah",
    name: "Gibeah of Saul",
    modernName: "Tell el-Ful, north Jerusalem",
    lat: 31.824, lon: 35.231,
    description: "Saul's hometown and royal seat, a Benjaminite hilltop fortress from which he ruled. David served Saul here, married Michal here, and fled from here when Saul's spear flew.",
    chapters: [10, 11, 13, 14, 15, 16, 18, 19, 20, 22, 23, 26]
  },
  {
    id: "geba",
    name: "Geba",
    modernName: "Jaba",
    lat: 31.859, lon: 35.258,
    description: "Benjaminite town facing Michmash across the steep Wadi Suweinit. Jonathan struck the Philistine garrison here, igniting the war, and from Geba he launched his daring two-man climb against the Michmash outpost.",
    chapters: [13, 14]
  },
  {
    id: "michmash",
    name: "Michmash",
    modernName: "Mukhmas",
    lat: 31.870, lon: 35.273,
    description: "Village on the north rim of the Wadi Suweinit pass where the Philistine army camped with chariots beyond counting. Jonathan and his armor-bearer scaled the crags Bozez and Seneh here, and panic broke the Philistine host.",
    chapters: [13, 14]
  },
  {
    id: "jabesh-gilead",
    name: "Jabesh-gilead",
    modernName: "Tell el-Maqlub (or Tell Abu Kharaz), Wadi Yabis",
    lat: 32.363, lon: 35.632,
    description: "Israelite town east of the Jordan besieged by Nahash the Ammonite, rescued by Saul in his first act as king. Its grateful men later retrieved the bodies of Saul and his sons from the wall of Beth-shan — a kindness for which the newly crowned David sent them a message of blessing (2 Samuel 2:5-7).",
    chapters: [11, 31]
  },
  {
    id: "bethlehem",
    name: "Bethlehem",
    modernName: "Beit Lahm (Bethlehem)",
    lat: 31.705, lon: 35.202,
    description: "Judahite town of Jesse and his eight sons, where Samuel secretly anointed the shepherd boy David as Israel's next king. David shuttled between Bethlehem and Saul's court in his early years.",
    chapters: [16, 17, 20]
  },
  {
    id: "valley-of-elah",
    name: "Valley of Elah",
    modernName: "Wadi es-Sunt, near Tel Azekah and Khirbet Qeiyafa",
    lat: 31.690, lon: 34.963,
    description: "Broad valley in the Shephelah where the armies of Israel and Philistia faced off across the brook. Here David felled Goliath with a sling stone taken from the streambed.",
    chapters: [17]
  },
  {
    id: "nob",
    name: "Nob",
    modernName: "uncertain; vicinity of Mount Scopus / et-Tur, Jerusalem",
    lat: 31.793, lon: 35.244,
    description: "Priestly town where the tabernacle stood after Shiloh's fall. Ahimelech gave the fleeing David holy bread and Goliath's sword here — an act Doeg reported, bringing Saul's massacre upon the priests.",
    chapters: [21, 22]
  },
  {
    id: "adullam",
    name: "Cave of Adullam",
    modernName: "Khirbet esh-Sheikh Madhkur (Tel Adullam)",
    lat: 31.651, lon: 34.986,
    description: "Stronghold and cave complex in the Shephelah where David gathered his band of four hundred distressed, indebted, and discontented men — the nucleus of his future army.",
    chapters: [22]
  },
  {
    id: "keilah",
    name: "Keilah",
    modernName: "Khirbet Qila",
    lat: 31.613, lon: 35.012,
    description: "Walled Judahite town that David rescued from Philistine raiders at the threshing floors. Warned by God through the ephod that its citizens would hand him over to Saul, David slipped away.",
    chapters: [23]
  },
  {
    id: "ziph",
    name: "Wilderness of Ziph",
    modernName: "Tell Zif, southeast of Hebron",
    lat: 31.487, lon: 35.130,
    description: "Rugged desert around the town of Ziph where David hid from Saul. The Ziphites twice betrayed his position; here Jonathan came to strengthen David's hand in God, and here David spared the sleeping Saul a second time.",
    chapters: [23, 26]
  },
  {
    id: "maon",
    name: "Wilderness of Maon",
    modernName: "Khirbet Ma'in (Tel Ma'on)",
    lat: 31.417, lon: 35.128,
    description: "Desert south of Ziph where Saul nearly closed the net on David before a Philistine raid called him away. Nabal, the wealthy churl of the Abigail story, had his estate at Maon.",
    chapters: [23, 25]
  },
  {
    id: "en-gedi",
    name: "En-gedi",
    modernName: "Ein Gedi oasis, Dead Sea shore",
    lat: 31.462, lon: 35.388,
    description: "Spring-fed oasis amid sheer cliffs above the Dead Sea, the 'Rocks of the Wild Goats.' In a cave here David cut the corner of Saul's robe rather than take his life.",
    chapters: [23, 24]
  },
  {
    id: "carmel-judah",
    name: "Carmel (of Judah)",
    modernName: "Khirbet el-Kirmil, near Ma'on",
    lat: 31.424, lon: 35.135,
    description: "Judahite town where Saul set up a victory monument after the Amalekite campaign, and where Nabal sheared his three thousand sheep. Abigail of Carmel became David's wife after Nabal's death.",
    chapters: [15, 25]
  },
  {
    id: "ziklag",
    name: "Ziklag",
    modernName: "identification debated: Tel Sera, Tel Halif, or Khirbet a-Ra'i",
    lat: 31.386, lon: 34.686,
    description: "Negev border town that Achish of Gath granted to David as a base for sixteen months. Amalekite raiders burned it and carried off the families while David was away; he pursued and recovered everything. Here David received the news of Saul's death and sang the Song of the Bow (2 Samuel 1).",
    chapters: [27, 29, 30]
  },
  {
    id: "beersheba",
    name: "Beersheba",
    modernName: "Tel Beer-sheva (Tell es-Seba)",
    lat: 31.245, lon: 34.841,
    description: "Southernmost town of Israel, the traditional limit in the phrase 'from Dan to Beersheba.' Samuel's sons Joel and Abijah judged here — and their corruption helped spark the demand for a king.",
    chapters: [8]
  },
  {
    id: "endor",
    name: "Endor",
    modernName: "Khirbet Safsafeh, near the village of Endor below Mount Moreh",
    lat: 32.632, lon: 35.375,
    description: "Village on the north side of the Jezreel Valley, behind the Philistine lines. On the eve of his last battle Saul came here by night, in disguise, to consult a medium and heard his doom from Samuel.",
    chapters: [28]
  },
  {
    id: "shunem",
    name: "Shunem",
    modernName: "Sulam, at the foot of Mount Moreh",
    lat: 32.605, lon: 35.335,
    description: "Village in the Jezreel Valley where the massed Philistine army camped before the final battle, facing Saul's forces on Gilboa across the valley.",
    chapters: [28]
  },
  {
    id: "mount-gilboa",
    name: "Mount Gilboa",
    modernName: "Mount Gilboa ridge (Jebel Faquaa)",
    lat: 32.518, lon: 35.417,
    description: "Ridge overlooking the Jezreel Valley where Israel made its last stand under Saul. Here Jonathan and his brothers fell, and the wounded Saul died on his own sword rather than be taken.",
    chapters: [28, 31]
  },
  {
    id: "beth-shan",
    name: "Beth-shan",
    modernName: "Tell el-Husn, Beit She'an",
    lat: 32.503, lon: 35.500,
    description: "Strategic city guarding the junction of the Jezreel and Jordan valleys, held by the Philistines. They fastened the bodies of Saul and his sons to its wall until the men of Jabesh-gilead took them down by night.",
    chapters: [31]
  },
  // ——— 2 Samuel additions (Historian). New places below appear only in 2 Samuel,
  // so their `chapters` arrays are empty: that field drives the 1 Samuel chapter
  // filter on the map. The 2 Samuel references live in the description text.
  {
    id: "hebron",
    name: "Hebron",
    modernName: "Tell Rumeida (Jebel er-Rumeida), in modern Hebron / el-Khalil",
    lat: 31.524, lon: 35.100,
    description: "Chief city of Judah, high in the hill country, burial place of the patriarchs at the cave of Machpelah. David had courted its elders with spoil from Ziklag (1 Samuel 30:31); here the men of Judah anointed him king, and he reigned over Judah seven years and six months before taking Jerusalem (2 Samuel 2:1-4, 11).",
    chapters: []
  },
  {
    id: "mahanaim",
    name: "Mahanaim",
    modernName: "likely Tulul adh-Dhahab, on the Jabbok (Wadi az-Zarqa)",
    lat: 32.197, lon: 35.689,
    description: "Fortified town east of the Jordan on the Jabbok, where Jacob once met the angels of God ('two camps'). Safely beyond Philistine reach, it became the capital where Abner made Ish-bosheth king over Israel (2 Samuel 2:8-9) — and later David's own refuge from Absalom.",
    chapters: []
  },
  {
    id: "gibeon",
    name: "Gibeon",
    modernName: "el-Jib",
    lat: 31.847, lon: 35.184,
    description: "Benjaminite city famed for its great rock-cut pool, excavated at el-Jib along with jar handles stamped with the city's name. Beside this pool the servants of Ish-bosheth under Abner met the servants of David under Joab; twelve champions of each side fell together, and the battle of Gibeon began the long war between the two houses (2 Samuel 2:12-32).",
    chapters: []
  },
  {
    id: "bahurim",
    name: "Bahurim",
    modernName: "likely Ras et-Tmim, east of the Mount of Olives",
    lat: 31.790, lon: 35.253,
    description: "Benjaminite village on the road descending east from Jerusalem toward the Jordan. Here Abner ordered the weeping Phaltiel to turn back as Michal was escorted to David (2 Samuel 3:16); later it is Shimei's town, from whose ridge he curses the fleeing David, and the place where two of David's messengers hide in a well during Absalom's revolt.",
    chapters: []
  },
  {
    "id": "jerusalem",
    "name": "Jerusalem",
    "modernName": "the Jebusite stronghold Zion / City of David, Ophel ridge",
    "lat": 31.777,
    "lon": 35.235,
    "description": "The Jebusite ridge fortress between Judah and Benjamin, taken by David's men through the tsinnor, the water shaft, and renamed the city of David (2 Samuel 5:6-9). Belonging to no tribe, it became the capital of the united kingdom, the resting place of the ark (2 Samuel 6), and the seat of the covenant promise that David's throne would be established for ever (2 Samuel 7:16).",
    "chapters": []
  },
  {
    "id": "rabbah",
    "name": "Rabbah",
    "modernName": "Amman citadel, Jabal al-Qal'a",
    "lat": 31.951,
    "lon": 35.933,
    "description": "The royal city of the Ammonites, east of the Jordan at the headwaters of the Jabbok, besieged by Joab through the war of 2 Samuel 10-12. Uriah the Hittite fell beneath its wall (2 Samuel 11:16-17); Joab took its 'city of waters' — the lower town guarding the spring — and summoned David to take the citadel and the Ammonite crown (2 Samuel 12:26-30). The site is the fortified hill of Jabal al-Qal'a in the heart of modern Amman, Jordan, continuously occupied from the Bronze Age.",
    "chapters": []
  },
  {
    "id": "geshur",
    "name": "Geshur",
    "modernName": "Aramean kingdom east of the Sea of Galilee, et-Tell/Bethsaida region",
    "lat": 32.82,
    "lon": 35.64,
    "description": "A small Aramean kingdom east of the Sea of Galilee, ruled by Talmai, whose daughter Maacah David married at Hebron (2 Samuel 3:3) — a treaty match that made Geshur Absalom's mother's homeland and his refuge for three years after the killing of Amnon (2 Samuel 13:37-38). Excavations at et-Tell near Bethsaida have uncovered a massive Iron Age gate complex befitting the capital of such a kingdom.",
    "chapters": []
  },
  {
    "id": "baal-hazor",
    "name": "Baal-hazor",
    "modernName": "Tell 'Asur, highest peak of the central hills",
    "lat": 31.99,
    "lon": 35.27,
    "description": "The highest summit of the central hill country, rising over 1,000 meters beside Ephraim north of Bethel — identified with Tell 'Asur. Here Absalom held the sheep-shearing feast at which, at his command, Amnon was killed when his heart was merry with wine (2 Samuel 13:23-29), two years after the wrong done to Tamar.",
    "chapters": []
  }
];
