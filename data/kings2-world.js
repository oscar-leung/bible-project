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
    { year: "841 BC", book: "kings2", event: "Jehu wipes out Ahab's house and Baal worship in Samaria — and pays tribute to Shalmaneser III, who carves him kneeling on the Black Obelisk (2 Kings 10).", chapters: [10] }
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
