// data/kings1-guide.js — window.KINGS1_GUIDE: the "before you read" primer for 1 Kings.
// Shown at the top of the story view when 1 Kings is the active book.
// Regnal dates follow a conservative (Thiele-style) chronology; all approximate.

window.KINGS1_GUIDE = {
  bridge: "2 Samuel closed at a threshing floor: David, having numbered the people, bought Araunah's floor and built an altar where the plague stopped. 1 Kings opens with that same David old and cold in bed, the succession unsettled, and the question hanging over the whole book: will David's sons walk the way God promised to bless in 2 Samuel 7 — and what happens to God's people when they don't? That threshing floor becomes the temple site in chapter 6.",

  shape: [
    { range: "1–2", label: "Succession", note: "Adonijah grabs; Nathan and Bathsheba act; Solomon is anointed and secures the throne." },
    { range: "3–10", label: "Solomon's glory", note: "Wisdom asked for and given, the temple built and filled with glory, wealth and fame to the ends of the earth." },
    { range: "11", label: "The turn", note: "A divided heart produces a divided kingdom. Adversaries rise; Ahijah tears the cloak." },
    { range: "12–16", label: "Two kingdoms", note: "Judah keeps David's line; Israel churns through five dynasties in fifty years, all walking in 'the sin of Jeroboam.'" },
    { range: "17–22", label: "Elijah vs. Ahab", note: "The prophet confronts Baal worship head-on: drought, fire on Carmel, a still small voice, Naboth's vineyard, Micaiah's lone 'no.'" }
  ],

  themes: [
    {
      title: "David is the measuring line",
      body: "Every king is graded against David: 'as David his father' or 'not as David.' This goes back to 2 Samuel 7 — God promised David a house and a lamp that would not go out. Even when Solomon and Abijam fail, Judah survives 'for David's sake' (11:12-13, 11:36, 15:4). Grace keeps the line alive; it doesn't excuse the king.",
      refs: "2 Sam 7:12-16 · 1 Kgs 3:3 · 11:36 · 15:4-5"
    },
    {
      title: "Wisdom is not the same as a whole heart",
      body: "Solomon is the wisest man who ever lived, and he still ends in idolatry. Deuteronomy 17 told kings not to multiply horses, wives, or gold, and not to go back to Egypt — chapter 10 and 11 read like a checklist of him doing every one. Gifts from God don't substitute for staying close to God.",
      refs: "Deut 17:16-20 · 1 Kgs 3:9-12 · 10:26-28 · 11:1-6"
    },
    {
      title: "The temple: God's presence, God's name",
      body: "The temple is where heaven touches earth — the glory-cloud fills it (8:10-11). Yet Solomon himself prays 'the heaven of heavens cannot contain thee' (8:27). The point is not a building that holds God, but a place where His people can pray and be heard, even from exile (8:46-50).",
      refs: "1 Kgs 6:11-13 · 8:27-30 · 8:46-50"
    },
    {
      title: "The sin of Jeroboam: religion reshaped for convenience",
      body: "Jeroboam doesn't invent a new god; he rebrands worship to protect his throne — new shrines, new priests, a new calendar, 'it is too much for you to go up to Jerusalem.' The phrase 'the sin of Jeroboam, who made Israel to sin' becomes the verdict on every northern king after him.",
      refs: "1 Kgs 12:26-33 · 14:16 · 15:34 · 16:26"
    },
    {
      title: "The word of the LORD always lands",
      body: "Kings plan; prophets speak; and the narrator keeps noting that it happened 'according to the word of the LORD.' Ahijah, the man of God from Judah, Jehu son of Hanani, Elijah, Micaiah — the real power in the book is not on the throne.",
      refs: "1 Kgs 12:15 · 13:2 · 15:29 · 16:34 · 22:28, 38"
    },
    {
      title: "Baal or the LORD: who sends the rain?",
      body: "Baal was the Canaanite storm god, credited with rain and harvest. Elijah's drought and the fire on Carmel strike at exactly that claim. 'How long halt ye between two opinions?' is the question of the whole second half — and the answer God gives Elijah afterwards comes not in the fire but in a still small voice.",
      refs: "1 Kgs 17:1 · 18:21, 38-39 · 19:11-12"
    },
    {
      title: "Mercy even at the edge of judgment",
      body: "Ahab is the worst king yet, and when he finally humbles himself God delays the disaster (21:27-29). The book is severe, but it keeps showing a God who is slow to anger and quick to notice a turning heart.",
      refs: "1 Kgs 8:33-36 · 21:27-29"
    }
  ],

  // The narrator's verdict on every king in 1 Kings. verdict: good | mixed | evil
  kings: [
    { name: "Solomon", realm: "united", years: "c. 970–930 BC", reign: "40 years", verdict: "mixed", note: "Loved the LORD (3:3); his wives turned his heart after other gods when he was old (11:4).", chapters: [1, 11] },
    { name: "Rehoboam", realm: "judah", years: "c. 930–913 BC", reign: "17 years", verdict: "evil", note: "Lost ten tribes with one harsh answer; Judah built high places and groves in his day (14:22-24).", chapters: [12, 14] },
    { name: "Abijam", realm: "judah", years: "c. 913–910 BC", reign: "3 years", verdict: "evil", note: "His heart was not perfect with the LORD — yet 'for David's sake' God gave him a lamp (15:3-4).", chapters: [15, 15] },
    { name: "Asa", realm: "judah", years: "c. 910–869 BC", reign: "41 years", verdict: "good", note: "Did right as David; removed idols and deposed his grandmother Maachah (15:11-13).", chapters: [15, 15] },
    { name: "Jehoshaphat", realm: "judah", years: "c. 872–848 BC", reign: "25 years", verdict: "good", note: "Walked in the ways of Asa — but joined Ahab at Ramoth-gilead (22:4, 43).", chapters: [22, 22] },
    { name: "Jeroboam", realm: "israel", years: "c. 930–909 BC", reign: "22 years", verdict: "evil", note: "Golden calves at Bethel and Dan: the pattern every northern king follows (12:28-30).", chapters: [11, 14] },
    { name: "Nadab", realm: "israel", years: "c. 909–908 BC", reign: "2 years", verdict: "evil", note: "Walked in his father's sin; murdered by Baasha at Gibbethon (15:25-28).", chapters: [15, 15] },
    { name: "Baasha", realm: "israel", years: "c. 908–886 BC", reign: "24 years", verdict: "evil", note: "Wiped out Jeroboam's house as Ahijah foretold — then did the very same sin (15:29-34).", chapters: [15, 16] },
    { name: "Elah", realm: "israel", years: "c. 886–885 BC", reign: "2 years", verdict: "evil", note: "Killed while drunk in his steward's house (16:8-10).", chapters: [16, 16] },
    { name: "Zimri", realm: "israel", years: "885 BC", reign: "7 days", verdict: "evil", note: "Burned the palace of Tirzah over himself (16:15-19).", chapters: [16, 16] },
    { name: "Omri", realm: "israel", years: "c. 885–874 BC", reign: "12 years", verdict: "evil", note: "Built Samaria; 'did worse than all that were before him' (16:24-25). Assyria called Israel 'the house of Omri' for a century.", chapters: [16, 16] },
    { name: "Ahab", realm: "israel", years: "c. 874–853 BC", reign: "22 years", verdict: "evil", note: "Married Jezebel and served Baal; 'did more to provoke the LORD… than all the kings of Israel' (16:30-33).", chapters: [16, 22] },
    { name: "Ahaziah", realm: "israel", years: "c. 853–852 BC", reign: "2 years", verdict: "evil", note: "Walked in the way of his father, his mother, and Jeroboam (22:51-53).", chapters: [22, 22] }
  ]
};
