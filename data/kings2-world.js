// data/kings2-world.js — 2 Kings additions to the shared map, journeys and timeline.
// Appends to window.LOCATIONS / JOURNEYS / TIMELINE and indexes `kings2`
// chapter refs onto places and people from window.KINGS2 — load this file LAST
// (after kings1-world.js).

(function () {
  "use strict";

  var NEW_LOCATIONS = [
    {
      id: "jordan-crossing", name: "Elijah's Jordan crossing", modernName: "Wadi el-Kharrar / 'Bethany beyond Jordan' (traditional)",
      lat: 31.837, lon: 35.55,
      description: "Elijah struck the Jordan with his rolled-up mantle and the water parted; on the far bank a chariot of fire and horses of fire parted him from Elisha, and he went up by a whirlwind into heaven. Elisha picked up the fallen mantle and struck the water the same way (2 Kings 2:8-14). This is roughly where Joshua crossed into the land and where John later baptized."
    },
    {
      id: "wilderness-of-edom", name: "Wilderness of Edom", modernName: "the Arabah, south of the Dead Sea",
      lat: 30.9, lon: 35.42,
      description: "The long way round to Moab. Israel, Judah and Edom marched seven days through it and ran out of water, until Elisha said to dig the valley full of ditches — and water came 'by the way of Edom' with no wind and no rain (2 Kings 3:8-20)."
    },
    {
      id: "kir-hareseth", name: "Kir-hareseth", modernName: "el-Kerak, Jordan (generally identified)",
      lat: 31.18, lon: 35.70,
      description: "Mesha's fortress on its high rock above the Dead Sea. With the coalition closing in, the king of Moab offered his eldest son as a burnt offering on the wall, 'and there was great indignation against Israel,' and the armies went home (2 Kings 3:25-27)."
    },
    {
      id: "moab", name: "Moab (Dibon)", modernName: "Dhiban, Jordan — where the Mesha stele was found in 1868",
      lat: 31.50, lon: 35.78,
      description: "The plateau east of the Dead Sea. Moab paid Israel a huge tribute of lambs and wool until Ahab died, then rebelled (2 Kings 1:1; 3:4-5). Mesha's own account of throwing off 'Omri king of Israel' was found carved on a basalt stele at his capital, Dibon."
    },
    {
      id: "baal-shalisha", name: "Baal-shalisha", modernName: "Kafr Thilth area, western Samaria hills (probable)",
      lat: 32.10, lon: 35.03,
      description: "In famine, a man from here brought Elisha twenty barley loaves of firstfruits. Elisha said to feed a hundred men with them: 'They shall eat, and shall leave thereof' — and they did (2 Kings 4:42-44)."
    },
    {
      id: "dothan", name: "Dothan", modernName: "Tell Dothan, north of Samaria",
      lat: 32.41, lon: 35.24,
      description: "The hill town where Joseph's brothers sold him (Genesis 37:17). An Aramean army surrounded Elisha here by night; his servant panicked until his eyes were opened and the mountain was 'full of horses and chariots of fire round about Elisha.' The army was struck blind and led to Samaria (2 Kings 6:13-23)."
    },
    {
      id: "ibleam", name: "Ibleam", modernName: "Khirbet Bel'ameh, south of Jenin",
      lat: 32.44, lon: 35.29,
      description: "On the ascent of Gur by Ibleam, Jehu's men shot Ahaziah of Judah as he fled from Jezreel toward Beth-haggan; he reached Megiddo and died there (2 Kings 9:27). An ancient water tunnel at Bel'ameh served the town."
    },
    {
      id: "beth-eked", name: "Beth-eked (the shearing house)", modernName: "Beit Qad, east of Jenin (traditional)",
      lat: 32.475, lon: 35.36,
      description: "On the road from Jezreel to Samaria Jehu met forty-two kinsmen of Ahaziah of Judah coming to greet Ahab's family, and had them killed at the pit of the shearing house (2 Kings 10:12-14)."
    },
    {
      id: "edom-libnah", name: "Edom", modernName: "Bozrah (Buseira), Edom's capital, southern Jordan",
      lat: 30.73, lon: 35.61,
      description: "In Jehoram of Judah's days Edom revolted and made itself a king; Jehoram's night attack at Zair barely escaped, 'and Edom revolted from under the hand of Judah unto this day.' Libnah in the Shephelah revolted at the same time (2 Kings 8:20-22)."
    },
    {
      id: "sela", name: "Sela", modernName: "es-Sela' near Bozrah, or Petra's Umm el-Biyara (debated)",
      lat: 30.85, lon: 35.56,
      description: "Edom's rock fortress. Amaziah killed ten thousand Edomites in the Valley of Salt, took Sela by war, and renamed it Joktheel — then, proud of it, challenged Israel and lost (2 Kings 14:7-14)."
    },
    {
      id: "hamath", name: "Hamath", modernName: "Hama, Syria",
      lat: 35.13, lon: 36.75,
      description: "The great city on the Orontes that marked Israel's ideal northern border. Jeroboam II restored the coast 'from the entering of Hamath' (14:25); Assyria later resettled people from Hamath in Samaria (17:24, 30), and Pharaoh Neco held Jehoahaz at Riblah 'in the land of Hamath' (23:33)."
    },
    {
      id: "abel-beth-maacah", name: "Abel-beth-maacah", modernName: "Tel Abil el-Qamh",
      lat: 33.258, lon: 35.58,
      description: "Israel's northern gateway city, the first named in Tiglath-pileser III's sweep of 733 BC: 'Ijon, and Abel-beth-maachah, and Janoah, and Kedesh, and Hazor, and Gilead, and Galilee … and carried them captive to Assyria' (2 Kings 15:29)."
    },
    {
      id: "nineveh", name: "Nineveh", modernName: "Kuyunjik and Nebi Yunus, Mosul, Iraq",
      lat: 36.36, lon: 43.15,
      description: "Sennacherib's capital on the Tigris. His palace walls showed the siege of Lachish in carved relief, and his prism boasts he shut Hezekiah up in Jerusalem 'like a bird in a cage' — but never claims to take it. He was murdered there by his sons in the temple of Nisroch (2 Kings 19:36-37)."
    },
    {
      id: "lachish", name: "Lachish", modernName: "Tel Lachish (Tell ed-Duweir)",
      lat: 31.565, lon: 34.849,
      description: "Judah's second city. Sennacherib besieged and took it in 701 BC while his Rabshakeh marched on Jerusalem (2 Kings 18:14, 17); the Assyrian siege ramp still stands. In 588 BC its officers wrote the Lachish letters as Babylon closed in."
    },
    {
      id: "libnah", name: "Libnah", modernName: "Tel Burna (probable), Shephelah",
      lat: 31.63, lon: 34.87,
      description: "A Shephelah town that revolted in Jehoram's day (8:22). Sennacherib moved on to fight it after Lachish (19:8), and Hamutal, mother of Jehoahaz and Zedekiah, came from here (23:31)."
    },
    {
      id: "gaza", name: "Gaza", modernName: "Gaza",
      lat: 31.504, lon: 34.464,
      description: "The southernmost Philistine city. Hezekiah 'smote the Philistines, even unto Gaza' (2 Kings 18:8) as part of his break with Assyria."
    },
    {
      id: "babylon", name: "Babylon", modernName: "Babil, near Hillah, Iraq",
      lat: 32.536, lon: 44.421,
      description: "Merodach-baladan's envoys came from here to see Hezekiah's treasures, and Isaiah foretold it would carry them all away (20:12-18). Nebuchadnezzar took Jehoiachin there in 597 BC and the rest of Jerusalem in 586; ration tablets found in its palace name 'Ya'u-kinu, king of the land of Yahudu' (25:27-30)."
    },
    {
      id: "riblah", name: "Riblah", modernName: "Ribla, on the Orontes, Syria",
      lat: 34.48, lon: 36.55,
      description: "The field headquarters where Pharaoh Neco put Jehoahaz in chains (23:33), and where Nebuchadnezzar judged Zedekiah — slew his sons before his eyes, then put out his eyes (25:6-7, 20-21)."
    }
  ];

  var NEW_JOURNEYS = [
    {
      id: "elijah-last-walk",
      title: "Elijah's Last Walk",
      color: "#d0661e",
      book: "kings2",
      description: "Three times Elijah says 'tarry here' and three times Elisha refuses. Gilgal, Bethel, Jericho, the Jordan — and a chariot of fire on the far side. Then Elisha walks the route back with the mantle (2 Kings 2).",
      stops: [
        { loc: "gilgal", note: "'Tarry here, I pray thee' — 'I will not leave thee' (2:1-2)." },
        { loc: "bethel", note: "The sons of the prophets: 'Knowest thou that the LORD will take away thy master today?' — 'Hold ye your peace' (2:3)." },
        { loc: "jericho", note: "The same question, the same answer, the same refusal to leave (2:4-6)." },
        { loc: "jordan-crossing", note: "The mantle parts the river; 'let a double portion of thy spirit be upon me'; the whirlwind (2:7-12)." },
        { loc: "jericho", note: "Elisha heals the spring with a new bowl of salt: 'there shall not be from thence any more death' (2:19-22)." },
        { loc: "bethel", note: "The youths of Bethel jeer 'Go up, thou bald head' (2:23-24)." },
        { loc: "mount-carmel", note: "Elisha goes on to Carmel — Elijah's mountain (2:25)." },
        { loc: "samaria", note: "And returns to the capital (2:25)." }
      ],
      chapters: [2]
    },
    {
      id: "march-on-moab",
      title: "The March against Moab",
      color: "#6d5a2e",
      book: "kings2",
      description: "Jehoram of Israel, Jehoshaphat of Judah and the king of Edom go the long way round the Dead Sea to punish Mesha's revolt — and nearly die of thirst before Elisha's word fills the ditches (2 Kings 3).",
      stops: [
        { loc: "samaria", note: "Jehoram musters all Israel (3:6)." },
        { loc: "jerusalem", note: "Jehoshaphat: 'I am as thou art, my people as thy people' (3:7)." },
        { loc: "wilderness-of-edom", note: "Seven days' march, no water; Elisha calls for a minstrel and the valley fills (3:8-20)." },
        { loc: "moab", note: "Moab sees the sun on the water red as blood, charges, and is routed (3:21-25)." },
        { loc: "kir-hareseth", note: "Mesha sacrifices his eldest son on the wall; the coalition withdraws (3:25-27)." }
      ],
      chapters: [3]
    },
    {
      id: "elisha-circuit",
      title: "Elisha's Circuit of Mercy",
      color: "#2f7a6b",
      book: "kings2",
      description: "Elisha's ministry is a circuit of households: a widow's oil, a room on the wall at Shunem, a dead boy raised, poison in the pot at Gilgal, and twenty loaves that feed a hundred (2 Kings 4).",
      stops: [
        { loc: "samaria", note: "A prophet's widow is about to lose her sons to a creditor; the oil flows until the last vessel is full (4:1-7)." },
        { loc: "shunem", note: "A great woman builds him a little chamber on the wall; a son is promised and born (4:8-17)." },
        { loc: "mount-carmel", note: "The boy dies; she rides to Carmel: 'It shall be well' — and will not let go of his feet (4:18-30)." },
        { loc: "shunem", note: "Elisha stretches himself on the child, and the child sneezes seven times and opens his eyes (4:31-37)." },
        { loc: "gilgal", note: "'There is death in the pot' — a handful of meal, and no harm (4:38-41)." },
        { loc: "baal-shalisha", note: "Twenty barley loaves feed a hundred men, with some left over (4:42-44)." }
      ],
      chapters: [4]
    },
    {
      id: "naaman-journey",
      title: "Naaman Goes Down to the Jordan",
      color: "#3a7ca5",
      book: "kings2",
      description: "A captive Israelite girl points her leprous master to the prophet in Samaria. The great Aramean general brings a fortune and a royal letter, is told to wash in a muddy river, nearly storms off — and comes up with flesh like a little child's (2 Kings 5).",
      stops: [
        { loc: "damascus", note: "'Would God my lord were with the prophet that is in Samaria!' (5:1-5)." },
        { loc: "samaria", note: "The king of Israel tears his clothes; Elisha sends a messenger, not even coming out: 'Go and wash in Jordan seven times' (5:6-12)." },
        { loc: "jordan-crossing", note: "He dips seven times 'and his flesh came again like unto the flesh of a little child' (5:14)." },
        { loc: "samaria", note: "'Now I know that there is no God in all the earth, but in Israel'; Gehazi runs after the gifts (5:15-27)." },
        { loc: "damascus", note: "Home with two mules' burden of Israel's earth, to worship the LORD in Rimmon's land (5:17-19)." }
      ],
      chapters: [5]
    },
    {
      id: "blinded-army",
      title: "Horses and Chariots of Fire at Dothan",
      color: "#9c5bb5",
      book: "kings2",
      description: "Aram's king hunts the prophet who keeps telling Israel his battle plans. The army surrounds Dothan; Elisha prays his servant's eyes open and the enemy's eyes shut, and leads the blinded army straight into Samaria — where he orders a feast, not a massacre (2 Kings 6).",
      stops: [
        { loc: "damascus", note: "'Which of us is for the king of Israel?' — 'Elisha … telleth the king of Israel the words that thou speakest in thy bedchamber' (6:8-12)." },
        { loc: "dothan", note: "'They that be with us are more than they that be with them' — the mountain full of fire (6:13-18)." },
        { loc: "samaria", note: "Blind captives led into the capital; 'set bread and water before them' (6:19-23)." }
      ],
      chapters: [6]
    },
    {
      id: "jehu-ride",
      title: "Jehu Drives Furiously",
      color: "#7d1f1f",
      book: "kings2",
      description: "A young prophet anoints Jehu in an inner room at Ramoth-gilead. He drives 'furiously' to Jezreel, kills Jehoram on Naboth's plot, has Ahaziah of Judah shot near Ibleam, faces Jezebel at her window, and goes on to Samaria to end Ahab's house and Baal's temple (2 Kings 9–10).",
      stops: [
        { loc: "ramoth-gilead", note: "Anointed in secret; the captains spread their garments on the stairs: 'Jehu is king' (9:1-13)." },
        { loc: "jezreel", note: "'Is it peace?' — Jehoram falls in Naboth's field, as Elijah said (9:14-26)." },
        { loc: "ibleam", note: "Ahaziah of Judah is shot at the ascent of Gur (9:27)." },
        { loc: "megiddo", note: "Ahaziah dies at Megiddo and is carried to Jerusalem (9:27-28)." },
        { loc: "jezreel", note: "Jezebel paints her eyes and taunts 'Had Zimri peace?'; thrown down from the window (9:30-37)." },
        { loc: "beth-eked", note: "Forty-two princes of Judah killed at the shearing house (10:12-14)." },
        { loc: "samaria", note: "Seventy sons of Ahab; then the Baal worshippers in their own temple (10:1-28)." }
      ],
      chapters: [9, 10]
    },
    {
      id: "north-falls",
      title: "Assyria Takes the North",
      color: "#5e6b7a",
      book: "kings2",
      description: "Tiglath-pileser strips Galilee and Gilead; Shalmaneser besieges Samaria three years; Israel is carried to Assyria and strangers are settled in its cities (2 Kings 15–17).",
      stops: [
        { loc: "abel-beth-maacah", note: "Tiglath-pileser takes the northern towns and carries Galilee captive (15:29)." },
        { loc: "hazor", note: "Hazor falls in the same sweep (15:29)." },
        { loc: "damascus", note: "Ahaz's protector takes Damascus and kills Rezin; Ahaz copies the altar he sees there (16:9-12)." },
        { loc: "samaria", note: "Three years' siege; 'in the ninth year of Hoshea the king of Assyria took Samaria' (17:5-6)." },
        { loc: "nineveh", note: "Israel is carried away into Assyria, 'until this day' (17:6, 23)." }
      ],
      chapters: [15, 16, 17]
    },
    {
      id: "sennacherib-701",
      title: "Sennacherib's Campaign, 701 BC",
      color: "#8a4b2a",
      book: "kings2",
      description: "Assyria takes Judah's fenced cities, besieges Lachish, sends the Rabshakeh to taunt Jerusalem, and goes home without it (2 Kings 18–19).",
      stops: [
        { loc: "nineveh", note: "Sennacherib marches west against Hezekiah's revolt (18:13)." },
        { loc: "lachish", note: "The siege and the tribute Hezekiah sends there (18:14-16)." },
        { loc: "jerusalem", note: "The Rabshakeh at the conduit of the upper pool: 'Let not Hezekiah deceive you' (18:17-37)." },
        { loc: "libnah", note: "The army moves on to Libnah; Hezekiah spreads the letter before the LORD (19:8-19)." },
        { loc: "nineveh", note: "185,000 die in a night; Sennacherib goes home and is killed by his sons (19:35-37)." }
      ],
      chapters: [18, 19]
    },
    {
      id: "josiah-reform",
      title: "Josiah's Reform",
      color: "#2f6f4e",
      book: "kings2",
      description: "A lost book is found in the temple, and the young king tears his clothes, then tears down every high place from Geba to Beersheba and the altar Jeroboam built at Bethel — exactly as the man of God foretold (2 Kings 22–23).",
      stops: [
        { loc: "jerusalem", note: "Hilkiah finds the book of the law; Huldah's word; the covenant renewed (22:8-23:3)." },
        { loc: "geba", note: "High places defiled 'from Geba to Beer-sheba' (23:8)." },
        { loc: "bethel", note: "Jeroboam's altar burned with bones, 'according to the word of the LORD which the man of God proclaimed' (23:15-18; 1 Kgs 13:2)." },
        { loc: "samaria", note: "The high places of Samaria's cities removed (23:19-20)." },
        { loc: "jerusalem", note: "A Passover like none since the judges (23:21-23)." },
        { loc: "megiddo", note: "Josiah goes out against Pharaoh Neco and is killed (23:29-30)." }
      ],
      chapters: [22, 23]
    },
    {
      id: "road-to-exile",
      title: "The Road to Babylon",
      color: "#3b3b6d",
      book: "kings2",
      description: "Jehoiachin is taken in 597; Zedekiah rebels; the city falls in 586, the temple burns, the king is judged at Riblah, and the people go to Babylon — with a last flicker of grace for David's heir (2 Kings 24–25).",
      stops: [
        { loc: "jerusalem", note: "Nebuchadnezzar takes Jehoiachin and the treasures (24:10-16)." },
        { loc: "babylon", note: "Jehoiachin, the mighty men, and the craftsmen carried away (24:15-16)." },
        { loc: "jerusalem", note: "Siege and famine; the wall breached; the temple and city burned (25:1-10)." },
        { loc: "riblah", note: "Zedekiah's sons slain before him; his eyes put out (25:6-7)." },
        { loc: "mizpah", note: "Gedaliah governs the remnant and is murdered (25:22-25)." },
        { loc: "egypt", note: "The people flee to Egypt for fear of the Chaldees (25:26)." },
        { loc: "babylon", note: "Jehoiachin lifted from prison to eat at the king's table (25:27-30)." }
      ],
      chapters: [24, 25]
    }
  ];

  var NEW_TIMELINE = [
    { year: "c. 853 BC", book: "kings2", event: "After Ahab's death Moab rebels; Ahaziah falls through a lattice in Samaria and sends to Baal-zebub of Ekron — Elijah meets his messengers (2 Kings 1).", chapters: [1] },
    { year: "c. 852 BC", book: "kings2", event: "Ahaziah dies as Elijah foretold; his brother Jehoram (Joram) becomes king of Israel (2 Kings 1:17; 3:1).", chapters: [1, 3] },
    { year: "c. 850 BC", book: "kings2", event: "Elijah is taken up by a whirlwind beyond the Jordan; Elisha receives the mantle and a double portion (2 Kings 2).", chapters: [2] },
    { year: "c. 850 BC", book: "kings2", event: "Israel, Judah and Edom march against Mesha of Moab; water fills the valley; the siege of Kir-hareseth ends in retreat. Mesha's stele tells his side (2 Kings 3).", chapters: [3] },
    { year: "c. 850–845 BC", book: "kings2", event: "Elisha's miracles: the widow's oil, the Shunammite's son raised, the poisoned pot, a hundred fed (2 Kings 4).", chapters: [4] },
    { year: "c. 848 BC", book: "kings2", event: "Naaman the Aramean commander is healed in the Jordan; Gehazi takes his silver and his leprosy (2 Kings 5).", chapters: [5] },
    { year: "c. 848–842 BC", book: "kings2", event: "The floating axe head; Aram's army blinded at Dothan; Ben-hadad's siege of Samaria and its famine, broken by four lepers who find the camp empty (2 Kings 6–7).", chapters: [6, 7] },
    { year: "c. 848 BC", book: "kings2", event: "Jehoram, Jehoshaphat's son, becomes king of Judah, married to Ahab's daughter Athaliah; Edom and Libnah revolt (2 Kings 8:16-22).", chapters: [8] },
    { year: "c. 842 BC", book: "kings2", event: "Elisha weeps before Hazael, who smothers Ben-hadad and seizes the throne of Damascus (2 Kings 8:7-15).", chapters: [8] },
    { year: "841 BC", book: "kings2", event: "Jehu is anointed at Ramoth-gilead and kills Jehoram of Israel, Ahaziah of Judah, and Jezebel in one sweep (2 Kings 9).", chapters: [9] },
    { year: "841 BC", book: "kings2", event: "Jehu wipes out Ahab's house and Baal worship in Samaria — and pays tribute to Shalmaneser III, who carves him kneeling on the Black Obelisk (2 Kings 10).", chapters: [10] },
    { year: "841–835 BC", book: "kings2", event: "Athaliah seizes Judah's throne and kills the royal seed; Jehosheba hides the baby Joash in the temple for six years (2 Kings 11).", chapters: [11] },
    { year: "835 BC", book: "kings2", event: "Jehoiada crowns seven-year-old Joash; Athaliah is killed and Baal's temple torn down (2 Kings 11).", chapters: [11] },
    { year: "c. 814 BC", book: "kings2", event: "Joash repairs the temple from the chest by the altar — and later strips it to buy off Hazael (2 Kings 12).", chapters: [12] },
    { year: "c. 797 BC", book: "kings2", event: "Elisha, dying, has Joash of Israel strike the ground; a dead man revives at Elisha's bones (2 Kings 13).", chapters: [13] },
    { year: "c. 793–753 BC", book: "kings2", event: "Jeroboam II restores Israel's borders as Jonah son of Amittai foretold; Azariah (Uzziah) reigns long in Judah (2 Kings 14–15).", chapters: [14, 15] },
    { year: "753–732 BC", book: "kings2", event: "Five northern kings in twenty years; Menahem pays Pul (Tiglath-pileser) a thousand talents (2 Kings 15).", chapters: [15] },
    { year: "733–732 BC", book: "kings2", event: "Ahaz sends temple silver to Assyria; Damascus falls and Galilee goes into captivity (2 Kings 15:29; 16).", chapters: [15, 16] },
    { year: "722 BC", book: "kings2", event: "Samaria falls after a three-year siege; Israel is exiled to Assyria and foreigners resettle the land (2 Kings 17).", chapters: [17] },
    { year: "701 BC", book: "kings2", event: "Sennacherib takes Lachish and threatens Jerusalem; Hezekiah prays, and the Assyrian army is struck in the night (2 Kings 18–19).", chapters: [18, 19] },
    { year: "c. 701 BC", book: "kings2", event: "Hezekiah's illness, fifteen more years, and the Babylonian envoys (2 Kings 20).", chapters: [20] },
    { year: "697–642 BC", book: "kings2", event: "Manasseh's 55-year reign fills Jerusalem with idols and innocent blood (2 Kings 21).", chapters: [21] },
    { year: "622 BC", book: "kings2", event: "The book of the law is found in the temple; Josiah's covenant, reform, and Passover (2 Kings 22–23).", chapters: [22, 23] },
    { year: "609 BC", book: "kings2", event: "Josiah is killed by Pharaoh Neco at Megiddo (2 Kings 23:29).", chapters: [23] },
    { year: "597 BC", book: "kings2", event: "Nebuchadnezzar takes Jerusalem and carries Jehoiachin to Babylon (2 Kings 24; Babylonian Chronicle).", chapters: [24] },
    { year: "586 BC", book: "kings2", event: "Jerusalem falls; the temple is burned and the people exiled; Gedaliah is murdered at Mizpah (2 Kings 25).", chapters: [25] },
    { year: "561 BC", book: "kings2", event: "Evil-merodach releases Jehoiachin from prison to eat at the king's table — David's line still alive (2 Kings 25:27-30).", chapters: [25] }
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

  function indexRefs(globalName, field) {
    var list = window[globalName];
    var chs = window.KINGS2 && window.KINGS2.chapters;
    if (!Array.isArray(list) || !Array.isArray(chs)) return;
    var byId = {};
    for (var i = 0; i < list.length; i++) if (list[i] && list[i].id) byId[list[i].id] = list[i];
    for (var c = 0; c < chs.length; c++) {
      var ids = chs[c] && chs[c][field];
      if (!Array.isArray(ids)) continue;
      for (var k = 0; k < ids.length; k++) {
        var it = byId[ids[k]];
        if (!it) continue;
        if (!Array.isArray(it.kings2)) it.kings2 = [];
        if (it.kings2.indexOf(chs[c].num) === -1) it.kings2.push(chs[c].num);
      }
    }
  }
  indexRefs("LOCATIONS", "locations");
  indexRefs("CHARACTERS", "characters");
})();
