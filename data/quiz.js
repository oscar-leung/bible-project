// data/quiz.js — window.QUIZ (Game Dev)
// Multiple-choice questions spanning 1 Samuel 1–31.
// Schema: { q, choices: [4 strings], answer: <index into choices>, chapter: <num>, explain }
window.QUIZ = [
  {
    q: "Who vowed that if the LORD gave her a son, she would give him to the LORD all the days of his life?",
    choices: ["Peninnah", "Hannah", "Abigail", "Michal"],
    answer: 1,
    chapter: 1,
    explain: "Hannah, childless and grieved, made this vow at Shiloh, and Samuel was born in answer to her prayer."
  },
  {
    q: "Eli's sons Hophni and Phinehas were notorious for what?",
    choices: ["Treating the LORD's offering with contempt", "Worshiping Dagon in secret", "Refusing to fight the Philistines", "Stealing from the king's treasury"],
    answer: 0,
    chapter: 2,
    explain: "The sons of Eli were worthless men who took the sacrificial meat by force, despising the LORD's offering."
  },
  {
    q: "When the LORD called the boy Samuel in the night, what was he finally told to answer?",
    choices: ["\"Here am I, send me.\"", "\"Speak, LORD, for your servant hears.\"", "\"What does my lord command?\"", "\"Depart from me, O LORD.\""],
    answer: 1,
    chapter: 3,
    explain: "Eli realized the LORD was calling the boy and taught Samuel to answer, \"Speak, LORD, for your servant hears.\""
  },
  {
    q: "What happened to the Ark of God at the battle of Ebenezer and Aphek?",
    choices: ["It was hidden in a cave", "It was captured by the Philistines", "It was burned with fire", "It was carried safely back to Shiloh"],
    answer: 1,
    chapter: 4,
    explain: "Israel was routed, Hophni and Phinehas were killed, and the Philistines captured the Ark of God."
  },
  {
    q: "The dying wife of Phinehas named her son Ichabod. What does the name signify?",
    choices: ["\"The LORD has heard\"", "\"The glory has departed from Israel\"", "\"A father of many nations\"", "\"God is my judge\""],
    answer: 1,
    chapter: 4,
    explain: "She named him Ichabod, saying \"The glory has departed from Israel,\" because the Ark of God had been captured."
  },
  {
    q: "What happened when the Philistines set the Ark beside their god Dagon in Ashdod?",
    choices: ["Dagon's temple collapsed in an earthquake", "The Ark vanished overnight", "Dagon fell face down, and later his head and hands were cut off", "Fire came out from the Ark"],
    answer: 2,
    chapter: 5,
    explain: "Twice Dagon fell before the Ark, and the second morning his head and hands lay broken off on the threshold."
  },
  {
    q: "How did the Philistines send the Ark back to Israel?",
    choices: ["Carried by five Philistine lords on foot", "On a new cart pulled by two milk cows, with golden tumors and mice", "By ship along the coast to Joppa", "In the hands of captured Israelite priests"],
    answer: 1,
    chapter: 6,
    explain: "They placed the Ark on a new cart with a guilt offering of golden tumors and golden mice, and the cows went straight to Beth-shemesh."
  },
  {
    q: "After the LORD routed the Philistines at Mizpah, Samuel set up a memorial stone called Ebenezer, meaning what?",
    choices: ["\"Thus far the LORD has helped us\"", "\"The LORD is my banner\"", "\"The stone of the covenant\"", "\"The LORD will provide\""],
    answer: 0,
    chapter: 7,
    explain: "Ebenezer means \"stone of help\"; Samuel said, \"Thus far the LORD has helped us.\""
  },
  {
    q: "Why did the elders of Israel demand that Samuel appoint a king?",
    choices: ["The LORD commanded it in a vision", "Samuel's sons were corrupt, and Israel wanted to be like the other nations", "The Ark had been lost again", "Samuel was too young to judge"],
    answer: 1,
    chapter: 8,
    explain: "Samuel's sons took bribes and perverted justice, so the elders demanded a king \"like all the nations\" — rejecting the LORD as king."
  },
  {
    q: "What was Saul doing when he first came to Samuel?",
    choices: ["Fighting the Ammonites", "Searching for his father's lost donkeys", "Plowing his father's field", "Offering sacrifice at Bethel"],
    answer: 1,
    chapter: 9,
    explain: "Saul, son of Kish, was searching for lost donkeys when his servant suggested consulting the seer — Samuel."
  },
  {
    q: "When Saul was chosen king by lot at Mizpah, where was he found?",
    choices: ["Standing before the altar", "Hiding among the baggage", "On his father's farm", "In the camp of the Philistines"],
    answer: 1,
    chapter: 10,
    explain: "Saul had hidden himself among the baggage, and the people ran and brought him out, a head taller than everyone."
  },
  {
    q: "Saul's first act of deliverance as king was rescuing which city from Nahash the Ammonite?",
    choices: ["Jabesh-gilead", "Beth-shemesh", "Hebron", "Jericho"],
    answer: 0,
    chapter: 11,
    explain: "Nahash threatened to gouge out the right eyes of Jabesh-gilead, and Saul mustered Israel and routed the Ammonites."
  },
  {
    q: "At Gilgal, what did Saul do that made Samuel say his kingdom would not continue?",
    choices: ["He worshiped a Philistine idol", "He offered the burnt offering himself instead of waiting for Samuel", "He refused to fight the Philistines", "He took plunder from the Amalekites"],
    answer: 1,
    chapter: 13,
    explain: "When Samuel delayed and the army scattered, Saul unlawfully offered the burnt offering himself — a foolish breach of the LORD's command."
  },
  {
    q: "Who climbed up with only his armor-bearer to attack a Philistine garrison, saying \"nothing can hinder the LORD from saving by many or by few\"?",
    choices: ["Saul", "David", "Jonathan", "Abner"],
    answer: 2,
    chapter: 14,
    explain: "Jonathan and his armor-bearer struck the garrison at Michmash, and the LORD sent a panic through the Philistine camp."
  },
  {
    q: "What did Jonathan unknowingly do that violated Saul's rash oath during the battle?",
    choices: ["He drank from a forbidden spring", "He ate wild honey", "He spared a Philistine captain", "He left the battlefield early"],
    answer: 1,
    chapter: 14,
    explain: "Jonathan, unaware of his father's oath cursing anyone who ate before evening, tasted honey — and the people ransomed him from death."
  },
  {
    q: "In the campaign against the Amalekites, whom did Saul spare against the LORD's command?",
    choices: ["Nahash the Ammonite", "Agag the king, along with the best of the flocks", "Achish king of Gath", "Doeg the Edomite"],
    answer: 1,
    chapter: 15,
    explain: "Saul spared King Agag and the best sheep and cattle, so the LORD rejected him as king."
  },
  {
    q: "Complete Samuel's rebuke to Saul: \"To obey is better than ___.\"",
    choices: ["Riches", "Wisdom", "Sacrifice", "Victory"],
    answer: 2,
    chapter: 15,
    explain: "Samuel declared, \"To obey is better than sacrifice, and to listen than the fat of rams.\""
  },
  {
    q: "When Samuel came to Bethlehem to anoint a new king, what did the LORD tell him about how He chooses?",
    choices: ["\"The LORD looks on the heart\"", "\"The eldest shall serve the youngest\"", "\"Strength belongs to the LORD\"", "\"Choose the man of war\""],
    answer: 0,
    chapter: 16,
    explain: "As Jesse's sons passed by, the LORD said man looks on the outward appearance, but the LORD looks on the heart — and chose David, the youngest."
  },
  {
    q: "In which valley did Israel face the Philistines when Goliath issued his challenge?",
    choices: ["The Valley of Jezreel", "The Valley of Elah", "The Valley of Aijalon", "The Valley of Sorek"],
    answer: 1,
    chapter: 17,
    explain: "The armies camped on opposite hills of the Valley of Elah, where Goliath of Gath defied Israel for forty days."
  },
  {
    q: "What did David take from the brook before facing Goliath?",
    choices: ["Three iron javelins", "Five smooth stones", "Seven sharpened arrows", "A single great rock"],
    answer: 1,
    chapter: 17,
    explain: "David chose five smooth stones for his shepherd's sling — and felled Goliath with the first one, striking his forehead."
  },
  {
    q: "What song of the women made Saul burn with jealousy toward David?",
    choices: ["\"The LORD has torn the kingdom from Saul\"", "\"Saul has struck down his thousands, and David his ten thousands\"", "\"David reigns over all Israel\"", "\"The shepherd has slain the giant\""],
    answer: 1,
    chapter: 18,
    explain: "The women's refrain credited David with ten thousands and Saul with only thousands, and Saul eyed David from that day on."
  },
  {
    q: "What did Jonathan give David as a sign of the covenant between them?",
    choices: ["His robe, armor, sword, bow, and belt", "A ring from the king's treasury", "Half of his inheritance", "A hundred shekels of silver"],
    answer: 0,
    chapter: 18,
    explain: "Jonathan loved David as his own soul and stripped himself of his robe, armor, sword, bow, and belt to give them to David."
  },
  {
    q: "How did Michal help David escape when Saul sent men to kill him at his house?",
    choices: ["She hid him in a well", "She let him down through a window and put an idol in his bed", "She bribed the messengers", "She disguised him as a servant"],
    answer: 1,
    chapter: 19,
    explain: "Michal lowered David through the window, then laid a household idol in the bed with goats' hair at its head to buy him time."
  },
  {
    q: "What did Ahimelech the priest at Nob give to the fleeing David?",
    choices: ["The holy bread and the sword of Goliath", "A donkey and provisions for a month", "The Ark of God", "The ephod and a company of priests"],
    answer: 0,
    chapter: 21,
    explain: "Having nothing else, Ahimelech gave David the consecrated bread of the Presence and Goliath's sword, kept behind the ephod."
  },
  {
    q: "In the cave at En-gedi, what did David do instead of killing Saul?",
    choices: ["He took Saul's crown", "He cut off a corner of Saul's robe", "He bound Saul while he slept", "He took Saul's sword and shield"],
    answer: 1,
    chapter: 24,
    explain: "David stealthily cut the corner of Saul's robe, then was conscience-stricken for even that against the LORD's anointed."
  },
  {
    q: "Whose wise intervention stopped David from taking bloody vengeance on her foolish husband Nabal?",
    choices: ["Ahinoam", "Michal", "Abigail", "Zeruiah"],
    answer: 2,
    chapter: 25,
    explain: "Abigail met David with generous provisions and wise words; when Nabal died about ten days later, David took her as his wife."
  },
  {
    q: "What did David take from beside the sleeping Saul in the camp at the hill of Hachilah, in the wilderness of Ziph?",
    choices: ["His spear and jar of water", "His crown and royal seal", "His sword and sandals", "His cloak and signet ring"],
    answer: 0,
    chapter: 26,
    explain: "David and Abishai crept into the camp and took Saul's spear and water jar, proving again that David would not harm the LORD's anointed."
  },
  {
    q: "Why did Saul seek out the medium at Endor?",
    choices: ["To curse David's army", "To inquire of the dead Samuel, since the LORD no longer answered him", "To learn where David was hiding", "To heal his tormenting spirit"],
    answer: 1,
    chapter: 28,
    explain: "With the Philistines massed and the LORD silent, a terrified Saul disguised himself and asked the medium to bring up Samuel, who foretold his doom."
  },
  {
    q: "How did Saul die on Mount Gilboa?",
    choices: ["Goliath's brother struck him down", "He fell on his own sword after being wounded by archers", "He was captured and executed by the Philistines", "Doeg the Edomite killed him"],
    answer: 1,
    chapter: 31,
    explain: "Badly wounded and refusing capture, Saul fell on his own sword when his armor-bearer would not strike him."
  },
  {
    q: "Who bravely retrieved the bodies of Saul and his sons from the wall of Beth-shan?",
    choices: ["The men of Jabesh-gilead", "David's mighty men", "The priests of Nob", "The elders of Bethlehem"],
    answer: 0,
    chapter: 31,
    explain: "Remembering Saul's rescue of their city, the valiant men of Jabesh-gilead traveled all night to recover the bodies and buried the bones under a tamarisk tree."
  }
];
