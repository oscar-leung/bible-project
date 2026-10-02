// data/kings1-world.js — 1 Kings additions to the shared map, journeys and timeline.
// Appends to window.LOCATIONS / JOURNEYS / TIMELINE (loaded after those files).
// Places outside the map frame (Tyre, Sidon's coast, Damascus, Horeb, Egypt,
// Ezion-geber, Sheba) keep real coordinates; the map pins them to the frame
// edge with an arrow pointing the way. `kings1` chapter lists on places and
// people are indexed at load time from window.KINGS1 — load this file LAST.

(function () {
  "use strict";

  var NEW_LOCATIONS = [
    {
      id: "tyre", name: "Tyre", modernName: "Sur, Lebanon (island city)",
      lat: 33.271, lon: 35.196,
      description: "The great Phoenician port of King Hiram, David's old ally. Tyre floated the cedars and cypress of Lebanon down the coast in rafts for Solomon's temple and palace, and sent its craftsmen and sailors in exchange for Israel's wheat and oil (1 Kings 5; 9:10-14)."
    },
    {
      id: "zarephath", name: "Zarephath", modernName: "Sarafand, Lebanon",
      lat: 33.458, lon: 35.297,
      description: "A Phoenician town between Tyre and Sidon — in Jezebel's own homeland — where Elijah was fed by a widow gathering sticks for her last meal. The barrel of meal did not waste, and her son was raised to life (1 Kings 17:8-24). Excavations at Sarafand found Iron Age pottery kilns and a shrine."
    },
    {
      id: "ezion-geber", name: "Ezion-geber", modernName: "Gulf of Aqaba (Tell el-Kheleifeh or Jezirat Faraun)",
      lat: 29.53, lon: 34.98,
      description: "Solomon's port on the Red Sea by Eloth, where Hiram's seamen crewed a navy that sailed to Ophir and brought back gold (1 Kings 9:26-28). Jehoshaphat later tried the same venture and his ships were broken there (22:48)."
    },
    {
      id: "sheba-kingdom", name: "Sheba", modernName: "Saba', south Arabia (Marib, Yemen)",
      lat: 15.42, lon: 45.33,
      description: "The incense kingdom of south Arabia, some 2,000 km down the caravan roads. Its queen came to Jerusalem 'to prove him with hard questions' and left breathless (1 Kings 10:1-13). Sabaean inscriptions and the great Marib dam show a wealthy, literate state in the early first millennium BC."
    },
    {
      id: "egypt", name: "Egypt", modernName: "Nile Delta — Tanis and Bubastis, the 21st–22nd dynasty capitals",
      lat: 30.97, lon: 31.88,
      description: "Solomon married Pharaoh's daughter and received Gezer as her dowry; Egypt sheltered his enemies Hadad and Jeroboam; and in Rehoboam's fifth year Pharaoh Shishak (Sheshonq I) marched on Jerusalem and carried off the temple treasures (1 Kings 3:1; 11:17-40; 14:25-26)."
    },
    {
      id: "shechem", name: "Shechem", modernName: "Tell Balata, Nablus",
      lat: 32.213, lon: 35.281,
      description: "The old covenant city between Mount Ebal and Mount Gerizim, where all Israel met to make Rehoboam king — and where, after his harsh answer, the ten tribes walked away with 'To your tents, O Israel' (1 Kings 12:1-16). Jeroboam fortified it as his first capital."
    },
    {
      id: "megiddo", name: "Megiddo", modernName: "Tel Megiddo (Armageddon)",
      lat: 32.585, lon: 35.185,
      description: "Guardian of the Jezreel Valley pass and one of the three cities Solomon fortified with the levy (1 Kings 9:15). Its six-chambered gate and palace complexes are the centerpiece of the long debate over the date of Solomon's building works."
    },
    {
      id: "hazor", name: "Hazor", modernName: "Tel Hazor",
      lat: 33.017, lon: 35.568,
      description: "The great northern city above the Huleh valley, fortified by Solomon (1 Kings 9:15). Yigael Yadin found a six-chambered gate here nearly identical to Megiddo's and Gezer's, which he connected directly to this verse."
    },
    {
      id: "gezer", name: "Gezer", modernName: "Tel Gezer",
      lat: 31.859, lon: 34.919,
      description: "A Canaanite city Pharaoh burned and handed to his daughter as a dowry when she married Solomon, who rebuilt it with the northern fortresses (1 Kings 9:15-17). Its six-chambered gate completes the famous 'Solomonic gates' trio."
    },
    {
      id: "anathoth", name: "Anathoth", modernName: "Ras el-Kharrubeh near 'Anata",
      lat: 31.822, lon: 35.268,
      description: "A priestly town an hour north-east of Jerusalem, where Solomon banished Abiathar — ending Eli's line in the priesthood exactly as foretold at Shiloh (1 Kings 2:26-27; 1 Samuel 2:31-35). Jeremiah later came from here."
    },
    {
      id: "damascus", name: "Damascus", modernName: "Damascus, Syria",
      lat: 33.513, lon: 36.292,
      description: "Capital of Aram. Rezon seized it as an adversary to Solomon (1 Kings 11:23-25); by Ahab's day its king Ben-hadad besieged Samaria, and Elijah was sent to its wilderness to anoint Hazael (19:15; 20:1)."
    },
    {
      id: "dan", name: "Dan", modernName: "Tel Dan",
      lat: 33.249, lon: 35.652,
      description: "Israel's northernmost city at the springs of the Jordan, where Jeroboam set one of his two golden calves (1 Kings 12:29). Excavators uncovered a large raised platform (bamah), an altar precinct, and the Aramaic Tel Dan stele naming 'the house of David.'"
    },
    {
      id: "penuel", name: "Penuel", modernName: "Tulul edh-Dhahab esh-Sherqiyeh, on the Jabbok",
      lat: 32.212, lon: 35.72,
      description: "The ford where Jacob wrestled with God. Jeroboam fortified it east of the Jordan to hold Gilead for the new northern kingdom (1 Kings 12:25). It stands beside its twin mound, Mahanaim."
    },
    {
      id: "tirzah", name: "Tirzah", modernName: "Tell el-Far'ah (North)",
      lat: 32.287, lon: 35.338,
      description: "Northern Israel's capital from Jeroboam's later years to Omri's sixth. Here Jeroboam's son sickened and died, Zimri burned the palace over himself after a seven-day reign, and Omri was besieged before he moved to Samaria (1 Kings 14:17; 16:8-24). Roland de Vaux excavated it 1946-60."
    },
    {
      id: "gibbethon", name: "Gibbethon", modernName: "Tel Malot (probable)",
      lat: 31.9, lon: 34.83,
      description: "A Philistine border fortress Israel besieged for a generation. Baasha killed Nadab during one siege, and during another the army proclaimed Omri king when it heard Zimri had murdered Elah (1 Kings 15:27; 16:15-17)."
    },
    {
      id: "samaria", name: "Samaria", modernName: "Sebastia",
      lat: 32.276, lon: 35.197,
      description: "The hill Omri bought from Shemer for two talents of silver and made his capital (1 Kings 16:24). Excavations revealed a fine ashlar royal enclosure and hundreds of carved ivories — Ahab's 'ivory house' (22:39). Ben-hadad besieged it; Ahab's chariot was washed in its pool."
    },
    {
      id: "jericho", name: "Jericho", modernName: "Tell es-Sultan",
      lat: 31.871, lon: 35.444,
      description: "In Ahab's days Hiel of Bethel rebuilt the ruined city, laying its foundation in the death of his firstborn and its gates in the death of his youngest — Joshua's curse fulfilled to the letter (1 Kings 16:34; Joshua 6:26)."
    },
    {
      id: "brook-cherith", name: "Brook Cherith", modernName: "Wadi el-Yabis (traditional; some prefer Wadi Qelt)",
      lat: 32.405, lon: 35.64,
      description: "The ravine 'before Jordan' where Elijah hid after announcing the drought. Ravens brought him bread and flesh morning and evening until the brook dried up (1 Kings 17:2-7)."
    },
    {
      id: "mount-carmel", name: "Mount Carmel", modernName: "el-Muhraqa ('the place of burning')",
      lat: 32.664, lon: 35.09,
      description: "The ridge above the Kishon where Elijah faced 450 prophets of Baal. The fire of the LORD fell and consumed the sacrifice, the wood, the stones, the dust, and the water in the trench; from its top Elijah saw the cloud 'like a man's hand' (1 Kings 18)."
    },
    {
      id: "jezreel", name: "Jezreel", modernName: "Tel Jezreel",
      lat: 32.557, lon: 35.328,
      description: "Ahab's winter palace facing the valley. Elijah ran before Ahab's chariot to its gate; Naboth's vineyard lay beside it until Jezebel had him stoned for it (1 Kings 18:46; 21). Excavations found a large Omride enclosure with casemate walls and a moat."
    },
    {
      id: "horeb", name: "Horeb", modernName: "Mount Sinai (traditionally Jebel Musa)",
      lat: 28.54, lon: 33.975,
      description: "The mount of God, forty days' journey south. Elijah fled here from Jezebel, lodged in 'the cave,' and heard the LORD not in the wind, earthquake, or fire but in 'a still small voice' (1 Kings 19:8-18) — Moses' mountain, Moses' cleft."
    },
    {
      id: "abel-meholah", name: "Abel-meholah", modernName: "Tell Abu Sus (probable), Jordan valley",
      lat: 32.36, lon: 35.545,
      description: "Home of Elisha son of Shaphat. Elijah found him plowing with twelve yoke of oxen and cast his mantle on him; Elisha slaughtered the oxen, fed the people, and followed (1 Kings 19:16-21)."
    },
    {
      id: "aphek-golan", name: "Aphek (in Golan)", modernName: "Fiq / 'En Gev area, east of the Sea of Galilee",
      lat: 32.78, lon: 35.70,
      description: "Not the Aphek of 1 Samuel 4. Here Ben-hadad, told the LORD was a god 'of the hills,' fought on the plain and lost; the city wall fell on 27,000 of his men, and Ahab spared him with a treaty the prophet condemned (1 Kings 20:26-43)."
    },
    {
      id: "ramoth-gilead", name: "Ramoth-gilead", modernName: "Tell er-Rumeith (probable)",
      lat: 32.53, lon: 35.99,
      description: "A fortress city in Gilead claimed by Aram. Ahab and Jehoshaphat went up to retake it against Micaiah's warning; a bow drawn 'at a venture' found the joint of Ahab's armor, and he died propped in his chariot (1 Kings 22)."
    }
  ];

  var NEW_JOURNEYS = [
    {
      id: "solomon-realm",
      title: "Solomon's Realm: Throne, Temple, Trade",
      color: "#c28a1c",
      book: "kings1",
      description: "Solomon is anointed at Gihon, asks for wisdom at Gibeon, builds with Lebanon's cedar from Tyre, fortifies Hazor, Megiddo and Gezer, and sends ships from Ezion-geber — while Sheba's queen comes up the incense road to test him (1 Kings 1–10).",
      stops: [
        { loc: "jerusalem", note: "Anointed at the Gihon spring on David's mule while Adonijah feasts at En-rogel (1:33-40)." },
        { loc: "gibeon", note: "A thousand burnt offerings on the great high place; 'Ask what I shall give thee' — and he asks for an understanding heart (3:4-15)." },
        { loc: "tyre", note: "Hiram floats cedar and fir down the coast in rafts in exchange for wheat and oil (5:1-12)." },
        { loc: "jerusalem", note: "Seven years building the house of the LORD; the glory-cloud fills it at the dedication (6–8)." },
        { loc: "hazor", note: "Fortified with the levy — the northern gate of the kingdom (9:15)." },
        { loc: "megiddo", note: "Fortified to guard the Jezreel pass (9:15)." },
        { loc: "gezer", note: "Pharaoh's dowry city, rebuilt (9:16-17)." },
        { loc: "ezion-geber", note: "Hiram's sailors and Solomon's fleet sail for the gold of Ophir (9:26-28)." },
        { loc: "sheba-kingdom", note: "The queen sets out with spices, gold, and hard questions (10:1-13)." }
      ],
      chapters: [1, 3, 5, 6, 8, 9, 10]
    },
    {
      id: "kingdom-divides",
      title: "The Kingdom Tears in Two",
      color: "#8e3b46",
      book: "kings1",
      description: "Ahijah tears his new cloak into twelve pieces; Rehoboam's harsh answer at Shechem splits the nation; Jeroboam builds Penuel and sets golden calves at Bethel and Dan so his people never go back to Jerusalem (1 Kings 11–14).",
      stops: [
        { loc: "jerusalem", note: "Outside the city Ahijah tears his garment and gives Jeroboam ten pieces (11:29-31)." },
        { loc: "egypt", note: "Jeroboam flees to Shishak until Solomon dies (11:40)." },
        { loc: "shechem", note: "'My little finger shall be thicker than my father's loins' — and Israel walks out (12:1-20)." },
        { loc: "penuel", note: "Jeroboam fortifies the Jabbok crossing to hold Gilead (12:25)." },
        { loc: "bethel", note: "A golden calf, a new priesthood, a feast of his own devising — and a man of God cries against the altar (12:28-13:5)." },
        { loc: "dan", note: "The second calf at the northern frontier (12:29-30)." },
        { loc: "shiloh", note: "Jeroboam's disguised wife visits blind Ahijah and hears the doom of the house (14:1-16)." },
        { loc: "tirzah", note: "The child dies as she crosses the threshold (14:17)." }
      ],
      chapters: [11, 12, 13, 14]
    },
    {
      id: "elijah-journeys",
      title: "The Journeys of Elijah",
      color: "#b3471d",
      book: "kings1",
      description: "From the drought word in Ahab's court to the ravens at Cherith, the widow's jar at Zarephath, fire on Carmel, the run to Jezreel, collapse under a juniper past Beersheba, the still small voice at Horeb, and the mantle cast on Elisha (1 Kings 17–19).",
      stops: [
        { loc: "samaria", note: "'There shall not be dew nor rain these years, but according to my word' (17:1)." },
        { loc: "brook-cherith", note: "Hidden by the brook; ravens bring bread and flesh (17:2-7)." },
        { loc: "zarephath", note: "The widow's meal and oil do not fail; her son lives again (17:8-24)." },
        { loc: "mount-carmel", note: "'How long halt ye between two opinions?' — the fire of the LORD falls (18:19-40)." },
        { loc: "jezreel", note: "The hand of the LORD on him, he outruns Ahab's chariot in the rain (18:45-46)." },
        { loc: "beersheba", note: "Fleeing Jezebel, he leaves his servant and asks to die under a juniper (19:3-4)." },
        { loc: "horeb", note: "Forty days on angel's bread to the mount of God; 'a still small voice' (19:8-18)." },
        { loc: "abel-meholah", note: "The mantle falls on Elisha at the plow (19:19-21)." }
      ],
      chapters: [17, 18, 19]
    },
    {
      id: "ahab-wars",
      title: "Ahab's Wars with Aram",
      color: "#4a5d8a",
      book: "kings1",
      description: "Ben-hadad besieges Samaria and loses; he tries the plain at Aphek and loses again, and Ahab lets him go. Three years later Ahab rides to Ramoth-gilead in disguise and a random arrow finds him (1 Kings 20; 22).",
      stops: [
        { loc: "damascus", note: "Ben-hadad and thirty-two kings march south (20:1)." },
        { loc: "samaria", note: "'Let not him that girdeth on his harness boast himself as he that putteth it off' (20:1-21)." },
        { loc: "aphek-golan", note: "The LORD is God of the valleys too; Ahab spares Ben-hadad by treaty (20:26-34)." },
        { loc: "ramoth-gilead", note: "Micaiah's lone warning ignored; Ahab dies at sunset (22:1-37)." },
        { loc: "samaria", note: "The dogs lick his blood as his chariot is washed in the pool (22:37-38)." }
      ],
      chapters: [20, 22]
    }
  ];

  var NEW_TIMELINE = [
    { year: "c. 970 BC", book: "kings1", event: "Adonijah claims the throne; Nathan and Bathsheba move David, and Solomon is anointed at Gihon (1 Kings 1).", chapters: [1] },
    { year: "c. 970 BC", book: "kings1", event: "David charges Solomon and dies after forty years; Solomon settles accounts with Adonijah, Abiathar, Joab, and Shimei (1 Kings 2).", chapters: [2] },
    { year: "c. 969 BC", book: "kings1", event: "At Gibeon Solomon asks for an understanding heart; the two mothers come before him (1 Kings 3).", chapters: [3] },
    { year: "c. 966 BC", book: "kings1", event: "In the 480th year after the Exodus, foundations of the temple are laid on Mount Moriah (1 Kings 6:1).", chapters: [6] },
    { year: "c. 959 BC", book: "kings1", event: "The temple is finished; the ark is brought in, the glory fills the house, and Solomon prays the dedication prayer (1 Kings 6:38; 8).", chapters: [8] },
    { year: "c. 950 BC", book: "kings1", event: "The queen of Sheba visits; Solomon's fleet sails from Ezion-geber; Hazor, Megiddo, and Gezer are fortified (1 Kings 9–10).", chapters: [9, 10] },
    { year: "c. 935 BC", book: "kings1", event: "Solomon's heart turns after his wives' gods; Ahijah tears the cloak and Jeroboam flees to Egypt (1 Kings 11).", chapters: [11] },
    { year: "c. 930 BC", book: "kings1", event: "Rehoboam's harsh answer at Shechem: the ten tribes crown Jeroboam, who sets golden calves at Bethel and Dan (1 Kings 12).", chapters: [12] },
    { year: "c. 925 BC", book: "kings1", event: "Pharaoh Shishak invades and strips the temple treasuries; Rehoboam replaces the gold shields with bronze (1 Kings 14:25-28).", chapters: [14] },
    { year: "c. 910 BC", book: "kings1", event: "Asa of Judah purges idols and deposes his grandmother Maachah; Baasha wipes out Jeroboam's house (1 Kings 15).", chapters: [15] },
    { year: "c. 885–880 BC", book: "kings1", event: "Zimri reigns seven days; Omri wins the civil war and builds Samaria (1 Kings 16).", chapters: [16] },
    { year: "c. 874 BC", book: "kings1", event: "Ahab becomes king, marries Jezebel of Sidon, and builds a temple to Baal in Samaria (1 Kings 16:29-33).", chapters: [16] },
    { year: "c. 860 BC", book: "kings1", event: "Elijah's drought; the contest on Mount Carmel; flight to Horeb and the call of Elisha (1 Kings 17–19).", chapters: [17, 18, 19] },
    { year: "c. 857 BC", book: "kings1", event: "Ahab defeats Ben-hadad at Samaria and Aphek, then spares him (1 Kings 20).", chapters: [20] },
    { year: "c. 855 BC", book: "kings1", event: "Naboth is murdered for his vineyard; Elijah meets Ahab there, and Ahab humbles himself (1 Kings 21).", chapters: [21] },
    { year: "853 BC", book: "kings1", event: "Ahab fields 2,000 chariots against Assyria at Qarqar (Kurkh monolith), then dies at Ramoth-gilead as Micaiah foretold (1 Kings 22).", chapters: [22] }
  ];

  function append(globalName, items) {
    if (!Array.isArray(window[globalName])) window[globalName] = [];
    var list = window[globalName];
    var have = {};
    for (var i = 0; i < list.length; i++) if (list[i] && list[i].id) have[list[i].id] = true;
    for (var j = 0; j < items.length; j++) {
      var it = items[j];
      if (it.id && have[it.id]) continue;
      if (!it.chapters) it.chapters = [];
      list.push(it);
    }
  }

  append("LOCATIONS", NEW_LOCATIONS);
  append("JOURNEYS", NEW_JOURNEYS);
  if (!Array.isArray(window.TIMELINE)) window.TIMELINE = [];
  Array.prototype.push.apply(window.TIMELINE, NEW_TIMELINE);

  // Index 1 Kings chapter refs onto every place and person from the chapter
  // data, so map/character chips can link straight into 1 Kings.
  function indexRefs(globalName, field) {
    var list = window[globalName];
    var chs = window.KINGS1 && window.KINGS1.chapters;
    if (!Array.isArray(list) || !Array.isArray(chs)) return;
    var byId = {};
    for (var i = 0; i < list.length; i++) if (list[i] && list[i].id) byId[list[i].id] = list[i];
    for (var c = 0; c < chs.length; c++) {
      var ids = chs[c] && chs[c][field];
      if (!Array.isArray(ids)) continue;
      for (var k = 0; k < ids.length; k++) {
        var it = byId[ids[k]];
        if (!it) continue;
        if (!Array.isArray(it.kings1)) it.kings1 = [];
        if (it.kings1.indexOf(chs[c].num) === -1) it.kings1.push(chs[c].num);
      }
    }
  }
  indexRefs("LOCATIONS", "locations");
  indexRefs("CHARACTERS", "characters");
})();
