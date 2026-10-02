// data/quiz.js — window.QUIZ (Game Dev)
// Multiple-choice questions spanning 1 Samuel 1–31 and 2 Samuel 1–24.
// Schema: { q, choices: [4 strings], answer: <index into choices>, chapter: <num>, explain,
//           book?: "samuel2" (absent = 1 Samuel) }
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
  },

  // ——— 2 Samuel pack (Game Dev): one question per chapter, 1–24. ———
  {
    "q": "What did the Amalekite messenger claim to have done, hoping to win David's favor?",
    "choices": [
      "Rescued Saul's body from the Philistines",
      "Fought beside Jonathan to the very end",
      "Slain Saul at Saul's own request, bringing his crown and bracelet",
      "Captured the standard of the Philistine army"
    ],
    "answer": 2,
    "book": "samuel2",
    "chapter": 1,
    "explain": "The young man said he stood upon Saul and slew him, and brought the crown and bracelet to David — who had him put to death for destroying the LORD's anointed, then lamented Saul and Jonathan with the Song of the Bow."
  },
  {
    "q": "What happened when Abner's men and Joab's men met at the pool of Gibeon?",
    "choices": [
      "Twelve young men from each side caught his fellow by the head and fell down together",
      "Abner and Joab made a covenant of peace by the water",
      "The pool was poisoned and both armies withdrew",
      "David and Ish-bosheth met face to face to divide the kingdom"
    ],
    "answer": 0,
    "book": "samuel2",
    "chapter": 2,
    "explain": "Abner said, \"Let the young men now arise, and play before us\" — twelve against twelve thrust swords into each other's sides, so the place was called Helkath-hazzurim, and a sore battle followed."
  },
  {
    "q": "Why did Joab kill Abner at the gate of Hebron?",
    "choices": [
      "Because Abner still supported the house of Ish-bosheth",
      "To avenge the blood of his brother Asahel, whom Abner had slain",
      "Because King David commanded Abner's death",
      "Because Abner had claimed the throne for himself"
    ],
    "answer": 1,
    "book": "samuel2",
    "chapter": 3,
    "explain": "Joab took Abner aside in the gate and smote him under the fifth rib \"for the blood of Asahel his brother.\" David mourned Abner publicly, saying a prince and a great man had fallen in Israel."
  },
  {
    "q": "How did David respond when Rechab and Baanah brought him the head of Ish-bosheth?",
    "choices": [
      "He rewarded them with places in his army",
      "He sent them back to Mahanaim in peace",
      "He wept and made them swear silence",
      "He had them slain, their hands and feet cut off, and hanged over the pool in Hebron"
    ],
    "answer": 3,
    "book": "samuel2",
    "chapter": 4,
    "explain": "They had murdered a righteous man upon his bed in his own house, so David required his blood of their hand — as he had done to the Amalekite who claimed to slay Saul."
  },
  {
    "q": "From whom did David take the stronghold of Zion, which became the city of David?",
    "choices": [
      "The Philistines",
      "The Ammonites",
      "The Jebusites",
      "The Amorites"
    ],
    "answer": 2,
    "book": "samuel2",
    "chapter": 5,
    "explain": "The Jebusites taunted that even the blind and the lame could keep David out, but he took the stronghold of Zion — and later smote the Philistines twice in the valley of Rephaim."
  },
  {
    "q": "Why did the LORD smite Uzzah as the ark was being carried toward Jerusalem?",
    "choices": [
      "He put forth his hand and took hold of the ark when the oxen shook it",
      "He looked inside the ark of God",
      "He refused to let the ark rest at his house",
      "He mocked David's dancing before the LORD"
    ],
    "answer": 0,
    "book": "samuel2",
    "chapter": 6,
    "explain": "When the oxen shook the cart at Nachon's threshingfloor, Uzzah took hold of the ark and God smote him there for his error. The ark then blessed the house of Obed-edom for three months."
  },
  {
    "q": "When David desired to build a house for the LORD, what did the LORD promise him through Nathan?",
    "choices": [
      "That David himself would build the temple within seven years",
      "That the LORD would make David a house, and establish his seed's throne for ever",
      "That the ark would remain in a tent until the end of days",
      "That Solomon would reign over all the nations of the earth"
    ],
    "answer": 1,
    "book": "samuel2",
    "chapter": 7,
    "explain": "The LORD turned David's offer around: David would not build the LORD a house, but the LORD would build David a house — a seed to build the temple, and a kingdom and throne established for ever."
  },
  {
    "q": "After defeating Moab, how did David decide which Moabites would live?",
    "choices": [
      "He spared all who swore loyalty to Israel",
      "He spared only the women and children",
      "He cast lots before the LORD at Hebron",
      "He measured them with a line — two lines to put to death, one full line to keep alive"
    ],
    "answer": 3,
    "book": "samuel2",
    "chapter": 8,
    "explain": "David made them lie down on the ground and measured them with a line; the Moabites became David's servants and brought gifts, as the LORD preserved David whithersoever he went."
  },
  {
    "q": "For whose sake did David show kindness to Mephibosheth, giving him a place at the king's table?",
    "choices": [
      "For Jonathan's sake",
      "For Saul's sake",
      "For Michal's sake",
      "For the sake of Ziba's faithful service"
    ],
    "answer": 0,
    "book": "samuel2",
    "chapter": 9,
    "explain": "David asked, \"Is there yet any that is left of the house of Saul, that I may shew him kindness for Jonathan's sake?\" Mephibosheth, lame on both feet, ate at the king's table continually."
  },
  {
    "q": "What did Hanun king of Ammon do to the servants David sent to comfort him?",
    "choices": [
      "He imprisoned them in Rabbah for a year",
      "He sent them home laden with insulting gifts",
      "He shaved off half their beards and cut off their garments in the middle",
      "He forced them to bow before the gods of Ammon"
    ],
    "answer": 2,
    "book": "samuel2",
    "chapter": 10,
    "explain": "Hanun's princes convinced him the envoys were spies. David told the shamed men, \"Tarry at Jericho until your beards be grown\" — and the insult brought Ammon and Syria to war and defeat."
  },
  {
    "q": "What instruction did David write in the letter he sent to Joab by the hand of Uriah himself?",
    "choices": [
      "\"Send Uriah home to his wife with honor.\"",
      "\"Set ye Uriah in the forefront of the hottest battle, and retire ye from him.\"",
      "\"Keep Uriah in the camp until the city falls.\"",
      "\"Give Uriah command over a third of the army.\""
    ],
    "answer": 1,
    "book": "samuel2",
    "chapter": 11,
    "explain": "After Bathsheba conceived and Uriah refused the comforts of home, David sent Uriah carrying his own death warrant — and Uriah the Hittite fell before Rabbah. \"But the thing that David had done displeased the LORD.\""
  },
  {
    "q": "What name did the LORD give to Solomon, sent by the hand of Nathan the prophet?",
    "choices": [
      "Adonijah",
      "Shephatiah",
      "Ithream",
      "Jedidiah"
    ],
    "answer": 3,
    "book": "samuel2",
    "chapter": 12,
    "explain": "After Nathan's parable of the ewe lamb — \"Thou art the man\" — and the death of the first child, Bathsheba bore Solomon; the LORD loved him and named him Jedidiah, \"beloved of the LORD.\""
  },
  {
    "q": "How did Absalom avenge his sister Tamar against Amnon?",
    "choices": [
      "After two full years, he had his servants kill Amnon at a sheepshearing feast when his heart was merry with wine",
      "He challenged Amnon to single combat at Hebron",
      "He accused Amnon before the king and demanded judgment",
      "He drove Amnon into exile at Geshur"
    ],
    "answer": 0,
    "book": "samuel2",
    "chapter": 13,
    "explain": "Absalom spake unto Amnon neither good nor bad for two years, then commanded his servants to strike at Baal-hazor. It was Absalom himself who then fled to Geshur, to Talmai his grandfather."
  },
  {
    "q": "Who sent the wise woman of Tekoah to the king with a feigned story, to bring Absalom home from exile?",
    "choices": [
      "Nathan the prophet",
      "Absalom himself",
      "Joab the son of Zeruiah",
      "Zadok the priest"
    ],
    "answer": 2,
    "book": "samuel2",
    "chapter": 14,
    "explain": "Joab perceived that the king's heart was toward Absalom and put the words in the woman's mouth. David saw through it — \"Is not the hand of Joab with thee in all this?\" — yet Absalom was brought back."
  },
  {
    "q": "How did Absalom win the loyalty of the people before his rebellion?",
    "choices": [
      "He distributed the spoils of war among the tribes",
      "He rose early at the gate, flattered every man's cause, and kissed those who bowed — stealing the hearts of the men of Israel",
      "He promised to abolish the king's taxes",
      "He rebuilt the altars in every city of Israel"
    ],
    "answer": 1,
    "book": "samuel2",
    "chapter": 15,
    "explain": "Absalom told every man his cause was good but no man of the king would hear it, saying \"Oh that I were made judge in the land!\" Then, under color of a vow at Hebron, he raised his conspiracy, and David fled Jerusalem weeping up the mount of Olivet."
  },
  {
    "q": "Who cursed David and cast stones at him as he fled from Jerusalem?",
    "choices": [
      "Ziba the servant of Mephibosheth",
      "Ahithophel the Gilonite",
      "Mephibosheth the son of Jonathan",
      "Shimei the son of Gera"
    ],
    "answer": 3,
    "book": "samuel2",
    "chapter": 16,
    "explain": "Shimei, of the house of Saul, cried \"Come out, come out, thou bloody man.\" David restrained Abishai, saying, \"Let him curse; for the LORD hath bidden him\" — trusting the LORD to requite good for the cursing."
  },
  {
    "q": "Why did Absalom follow the counsel of Hushai the Archite rather than that of Ahithophel?",
    "choices": [
      "The LORD had appointed to defeat Ahithophel's good counsel, to bring evil upon Absalom",
      "Ahithophel had secretly returned to David's side",
      "Hushai promised to lead the attack himself",
      "Joab persuaded Absalom that Ahithophel was a traitor"
    ],
    "answer": 0,
    "book": "samuel2",
    "chapter": 17,
    "explain": "Ahithophel's counsel to strike at once was sound, but Hushai — David's planted friend — urged delay. When his counsel was not followed, Ahithophel put his household in order and hanged himself."
  },
  {
    "q": "How did Absalom come to hang helpless in a great oak during the battle in the wood of Ephraim?",
    "choices": [
      "His chariot overturned among the trees",
      "His head caught hold of the thick boughs, and the mule under him went away",
      "He climbed the oak to escape David's servants",
      "His armor snagged on the branches as he fell"
    ],
    "answer": 1,
    "book": "samuel2",
    "chapter": 18,
    "explain": "Taken up between heaven and earth, Absalom was struck through by three darts from Joab's hand. Ahimaaz outran Cushi with the tidings, and David wept, \"O my son Absalom, would God I had died for thee.\""
  },
  {
    "q": "When David invited aged Barzillai the Gileadite to come live with him in Jerusalem, what did Barzillai ask instead?",
    "choices": [
      "A portion of land beyond Jordan for his sons",
      "Command of the king's household",
      "To turn back and die in his own city, and that Chimham go with the king in his place",
      "Silver and gold from the king's treasury"
    ],
    "answer": 2,
    "book": "samuel2",
    "chapter": 19,
    "explain": "Barzillai, fourscore years old, who had sustained David at Mahanaim, asked only to die near the grave of his father and mother — so the king took Chimham over Jordan with him and blessed Barzillai."
  },
  {
    "q": "How was the rebellion of Sheba the son of Bichri finally ended at Abel of Beth-maachah?",
    "choices": [
      "Joab breached the wall and burned the city",
      "Sheba fled to the Philistines and was never found",
      "Amasa captured Sheba and brought him to David",
      "A wise woman persuaded the city, and Sheba's head was thrown over the wall to Joab"
    ],
    "answer": 3,
    "book": "samuel2",
    "chapter": 20,
    "explain": "The wise woman asked why Joab would swallow up a mother city in Israel; the people cut off Sheba's head and cast it out, and Joab blew the trumpet and retired from the city. Earlier on this pursuit Joab had treacherously slain Amasa."
  },
  {
    "q": "What did Rizpah the daughter of Aiah do after seven descendants of Saul were hanged before the LORD?",
    "choices": [
      "She pleaded with David to bury them in Hebron",
      "She spread sackcloth upon the rock and kept the birds and beasts from the bodies from harvest until the rains came",
      "She fasted forty days at Gibeah",
      "She fled to the Gibeonites to plead for mercy"
    ],
    "answer": 1,
    "book": "samuel2",
    "chapter": 21,
    "explain": "The famine had come because Saul slew the Gibeonites. Rizpah's long vigil moved David to gather the bones of Saul and Jonathan and bury them in Zela — and after that God was intreated for the land."
  },
  {
    "q": "Complete the opening of David's song of deliverance: \"The LORD is my rock, and my fortress, and my ___.\"",
    "choices": [
      "Shield",
      "Strong tower",
      "Deliverer",
      "High tower"
    ],
    "answer": 2,
    "book": "samuel2",
    "chapter": 22,
    "explain": "David sang this song when the LORD had delivered him from all his enemies and from the hand of Saul: \"The LORD is my rock, and my fortress, and my deliverer\" — the shield and high tower follow in the next verse."
  },
  {
    "q": "When three mighty men broke through the Philistine host to bring David water from the well of Bethlehem, what did David do with it?",
    "choices": [
      "He drank it and blessed the three men",
      "He would not drink it, but poured it out unto the LORD",
      "He divided it among his thirsty soldiers",
      "He kept it as a memorial in his tent"
    ],
    "answer": 1,
    "book": "samuel2",
    "chapter": 23,
    "explain": "David said, \"Is not this the blood of the men that went in jeopardy of their lives?\" He counted the water too costly to drink — a chapter that also records his last words and the roll of his mighty men."
  },
  {
    "q": "Why did David refuse to take Araunah's threshingfloor and oxen as a free gift for the altar?",
    "choices": [
      "Araunah was a Jebusite, so the gift was unclean",
      "Gad the seer forbade him to receive gifts",
      "He would not offer burnt offerings to the LORD of that which cost him nothing",
      "The law required the king to purchase all altar sites"
    ],
    "answer": 2,
    "book": "samuel2",
    "chapter": 24,
    "explain": "After the census and the plague that stayed at Araunah's threshingfloor, David bought the floor and oxen for fifty shekels of silver, built an altar, and the LORD was intreated for the land."
  }
];
