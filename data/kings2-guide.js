// data/kings2-guide.js — window.KINGS2_GUIDE: the "before you read" primer for 2 Kings.
// Grows with the study (chapters 1–10 so far). Regnal dates conservative (Thiele-style).

window.KINGS2_GUIDE = {
  bridge: "1 Kings ended with Ahab dead at Ramoth-gilead — the dogs licking his blood in Samaria, just as Elijah said — and his son Ahaziah on the throne, 'walking in the way of his father, and in the way of his mother.' 2 Kings was never really a new book; it is the second scroll of one story. It opens by handing the prophet's mantle from Elijah to Elisha, and asks whether Israel will listen to the LORD's word now that the fire on Carmel is a memory.",

  shape: [
    { range: "1", label: "Is there no God in Israel?", note: "A king falls through a lattice and sends to Ekron's god; Elijah calls down fire one last time." },
    { range: "2", label: "The mantle passes", note: "Gilgal, Bethel, Jericho, Jordan — a chariot of fire, a double portion, a new prophet." },
    { range: "3", label: "Water in the desert", note: "Three kings, one prophet, and a war with Moab that ends in horror at Kir-hareseth." },
    { range: "4", label: "Mercy in the households", note: "Oil for a widow, a son for the Shunammite, life from death, bread for a hundred." },
    { range: "5", label: "Wash and be clean", note: "An enemy general healed by a servant girl's word and a muddy river; a prophet's servant ruined by greed." },
    { range: "6–7", label: "Open his eyes", note: "Chariots of fire at Dothan, a city starving under siege, and four lepers who find a deserted camp and good news." },
    { range: "8", label: "Seven years, two thrones", note: "The Shunammite's land restored; Elisha weeps over Hazael; Judah marries into Ahab's house." },
    { range: "9–10", label: "Jehu's purge", note: "Anointed in secret, he drives furiously — Jehoram, Ahaziah, Jezebel, Ahab's seventy sons, Baal's priests. Zealous, but not wholehearted." }
  ],

  themes: [
    {
      title: "\"Is it not because there is not a God in Israel?\"",
      body: "Ahaziah's first move when he's hurt is to ask a foreign god. Elijah's question to his messengers is the question of the whole book: when life breaks, where do you go first? Every king from here is measured by who they inquire of.",
      refs: "2 Kgs 1:3, 6, 16 · 1 Kgs 18:21"
    },
    {
      title: "The mantle, not the man",
      body: "God's work outlives God's workers. Elijah goes up; the mantle falls; Elisha strikes the water with 'Where is the LORD God of Elijah?' — not 'where is Elijah?' The double portion is the firstborn's inheritance (Deut 21:17): Elisha asks to be Elijah's true heir.",
      refs: "2 Kgs 2:9-14 · Deut 21:17 · 1 Kgs 19:19-21"
    },
    {
      title: "Elisha's miracles echo Elijah's — and point ahead",
      body: "A widow's oil that doesn't run out, a mother's dead son raised, bread that feeds a crowd with leftovers. Elijah did some of these at Zarephath; Jesus does all of them in the Gospels. The pattern says: this is what God's kingdom looks like up close.",
      refs: "2 Kgs 4 · 1 Kgs 17:8-24 · Luke 7:11-17 · John 6:9-13"
    },
    {
      title: "Grace in the small places",
      body: "After the national drama of Carmel, chapter 4 is almost all kitchens, spare rooms, and debt collectors. God cares about a single mother's creditors and a hospitable couple's empty nursery as much as about kings.",
      refs: "2 Kgs 4:1-7, 8-37"
    },
    {
      title: "Still the house of Ahab",
      body: "Jehoram removes Baal's pillar but keeps Jeroboam's calves — reform by half. Elisha will barely look at him and helps only for Jehoshaphat's sake. The judgment Elijah pronounced on Ahab's house is still coming (it lands in chapters 9–10).",
      refs: "2 Kgs 3:2-3, 13-14 · 1 Kgs 21:21-29"
    },
    {
      title: "Outsiders see what insiders miss",
      body: "A captive slave girl believes in Israel's prophet when Israel's king doesn't. A foreign general goes home worshipping the LORD while Elisha's own servant chases silver. Four starving lepers carry the good news into a besieged city. Jesus points to Naaman when his hometown rejects him.",
      refs: "2 Kgs 5:3, 15, 20-27 · 7:3-9 · Luke 4:27"
    },
    {
      title: "Every word lands — on time",
      body: "Elijah told Ahab the dogs would eat Jezebel by the wall of Jezreel and that his house would be cut off. Nearly twenty years later Jehu quotes the prophecy as he does it. Hazael and Jehu were named at Horeb in 1 Kings 19; Elisha anoints both. God's judgment can wait; it doesn't forget.",
      refs: "1 Kgs 19:15-17 · 21:19-24 · 2 Kgs 9:25-26, 36-37 · 10:10"
    },
    {
      title: "Zeal is not the same as a whole heart",
      body: "Jehu destroys Baal from Israel — and keeps Jeroboam's golden calves. God commends what he did and still says 'Jehu took no heed to walk in the law of the LORD … with all his heart.' Doing the right thing violently and selectively is not the same as loving God.",
      refs: "2 Kgs 10:28-31 · Hos 1:4"
    }
  ],

  kings: [
    { name: "Ahaziah", realm: "israel", years: "c. 853–852 BC", reign: "2 years", verdict: "evil", note: "Sought Baal-zebub of Ekron instead of the LORD; died as Elijah said (1:2-17).", chapters: [1] },
    { name: "Jehoram (Joram)", realm: "israel", years: "c. 852–841 BC", reign: "12 years", verdict: "evil", note: "Put away Baal's pillar but clung to Jeroboam's sins (3:1-3); killed by Jehu's arrow in Naboth's field (9:24).", chapters: [3, 9] },
    { name: "Jehoshaphat", realm: "judah", years: "c. 872–848 BC", reign: "25 years", verdict: "good", note: "Asks for a prophet of the LORD; Elisha helps 'for his sake' (3:11-14).", chapters: [3] },
    { name: "Mesha of Moab", realm: "moab", years: "c. 850 BC", reign: "vassal king", verdict: "evil", note: "Rebelled after Ahab died; sacrificed his son on the wall (3:4-27). Not a king of Israel — included because his own stele survives.", chapters: [3] },
    {"name": "Jehoram (Joram) of Judah", "realm": "judah", "years": "c. 848–841 BC", "reign": "8 years", "verdict": "evil", "note": "Married Ahab's daughter and walked in Ahab's ways; Edom and Libnah revolted — yet Judah was spared 'for David his servant's sake' (8:16-24).", "chapters": [8]},
    {"name": "Ahaziah of Judah", "realm": "judah", "years": "841 BC", "reign": "1 year", "verdict": "evil", "note": "Walked in the way of Ahab's house; struck down by Jehu near Ibleam and died at Megiddo (8:25-29; 9:27-28).", "chapters": [8, 9]},
    {"name": "Jehu", "realm": "israel", "years": "c. 841–814 BC", "reign": "28 years", "verdict": "mixed", "note": "Wiped out Ahab's house and Baal worship as the LORD commanded, but kept Jeroboam's calves (10:30-31). Pictured on Shalmaneser III's Black Obelisk.", "chapters": [9, 10]},
    {"name": "Hazael of Aram", "realm": "aram", "years": "c. 842–800 BC", "reign": "about 40 years", "verdict": "evil", "note": "Smothered Ben-hadad and seized Damascus (8:15); cut Israel short in Gilead (10:32-33). Not a king of Israel — included because Assyrian annals ('son of a nobody') and likely the Tel Dan stele name him.", "chapters": [8, 10]}
  ]
};
