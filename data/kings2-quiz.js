// data/kings2-quiz.js — three questions per chapter of 2 Kings, appended to window.QUIZ.

(function () {
  var add = [
    {
      "q": "Whom did the injured King Ahaziah send messengers to consult about his recovery?",
      "choices": [
        "The prophets of Baal at Mount Carmel",
        "Micaiah son of Imlah",
        "Baal-zebub, the god of Ekron",
        "Chemosh, the god of Moab"
      ],
      "answer": 2,
      "chapter": 1,
      "book": "kings2",
      "explain": "After falling through the lattice in his upper chamber, Ahaziah sent to 'enquire of Baal-zebub the god of Ekron' (2 Kings 1:2), prompting Elijah's question, 'Is it not because there is not a God in Israel?'"
    },
    {
      "q": "How did Ahaziah recognize that the man who met his messengers was Elijah?",
      "choices": [
        "He was a hairy man girt with a leather girdle",
        "He carried a staff that budded",
        "He arrived riding a chariot of fire",
        "He wore a torn purple robe"
      ],
      "answer": 0,
      "chapter": 1,
      "book": "kings2",
      "explain": "The messengers said he was 'an hairy man, and girt with a girdle of leather about his loins,' and the king said, 'It is Elijah the Tishbite' (2 Kings 1:8)."
    },
    {
      "q": "Why did the third captain of fifty survive when the first two were consumed by fire?",
      "choices": [
        "He brought a larger army",
        "Elisha interceded for him",
        "He fell on his knees and humbly begged for his life",
        "He arrived after Ahaziah had already died"
      ],
      "answer": 2,
      "chapter": 1,
      "book": "kings2",
      "explain": "Unlike the first two, who ordered 'Come down,' the third captain knelt and pleaded, 'let my life... be precious in thy sight' (2 Kings 1:13), and the angel told Elijah to go with him — humility, not force, met mercy."
    },
    {
      "q": "What did Elisha ask of Elijah before he was taken up?",
      "choices": [
        "His staff and his cloak",
        "A double portion of his spirit",
        "That he would anoint him king",
        "To go up with him into heaven"
      ],
      "answer": 1,
      "chapter": 2,
      "book": "kings2",
      "explain": "Elisha said, 'I pray thee, let a double portion of thy spirit be upon me' (2 Kings 2:9)."
    },
    {
      "q": "Why is Elisha's request for a 'double portion' significant?",
      "choices": [
        "It was the firstborn heir's inheritance, marking him as Elijah's successor",
        "It meant he wanted to perform exactly twice as many miracles",
        "It was the portion of meat given to priests at sacrifices",
        "It was the share of tribute paid to the king of Israel"
      ],
      "answer": 0,
      "chapter": 2,
      "book": "kings2",
      "explain": "Deuteronomy 21:17 gives the firstborn 'a double portion' of the inheritance; Elisha was asking to be Elijah's principal heir and successor in prophetic ministry."
    },
    {
      "q": "What did Elisha do first with Elijah's fallen mantle?",
      "choices": [
        "He tore it in two pieces",
        "He laid it on the altar at Bethel",
        "He struck the Jordan with it and the waters parted",
        "He cast it over Jehoram of Israel"
      ],
      "answer": 2,
      "chapter": 2,
      "book": "kings2",
      "explain": "He smote the waters asking, 'Where is the LORD God of Elijah?' and they parted so he went over (2 Kings 2:14) — proof that Elijah's God was now with him."
    },
    {
      "q": "What was Mesha king of Moab's occupation before his revolt?",
      "choices": [
        "A shipbuilder",
        "A sheepmaster (sheep-breeder)",
        "A priest of Chemosh",
        "A copper miner"
      ],
      "answer": 1,
      "chapter": 3,
      "book": "kings2",
      "explain": "Mesha 'was a sheepmaster,' paying Israel a hundred thousand lambs and a hundred thousand rams with the wool (2 Kings 3:4)."
    },
    {
      "q": "What did Elisha tell the thirsty armies to do in the dry valley?",
      "choices": [
        "Pray for rain for seven days",
        "March back to the Jordan",
        "Strike a rock with his staff",
        "Make the valley full of ditches"
      ],
      "answer": 3,
      "chapter": 3,
      "book": "kings2",
      "explain": "'Make this valley full of ditches' (2 Kings 3:16) — they were to prepare for water though they would see neither wind nor rain."
    },
    {
      "q": "Why does the Mesha stele matter for reading 2 Kings 3?",
      "choices": [
        "It is Moab's own account of throwing off Omride rule, naming Omri of Israel",
        "It records Elisha's miracle of water in the desert",
        "It was written by Jehoshaphat to celebrate the victory",
        "It proves the Moabites never paid tribute to Israel"
      ],
      "answer": 0,
      "chapter": 3,
      "book": "kings2",
      "explain": "The Moabite Stone, found at Dhiban in 1868, has Mesha himself say that Omri 'oppressed Moab many days' and that Chemosh freed the land — an outside witness to the same revolt, told from Moab's side."
    },
    {
      "q": "How did the prophet's widow pay off her creditor?",
      "choices": [
        "Elisha paid the debt himself",
        "She sold oil that kept flowing into borrowed vessels",
        "The king of Israel forgave the debt",
        "She sold her house in Shunem"
      ],
      "answer": 1,
      "chapter": 4,
      "book": "kings2",
      "explain": "The oil flowed until no vessel remained; Elisha said, 'Go, sell the oil, and pay thy debt, and live thou and thy children of the rest' (2 Kings 4:7)."
    },
    {
      "q": "What happened when Gehazi laid Elisha's staff on the Shunammite's dead son?",
      "choices": [
        "The child woke at once",
        "The staff burst into flame",
        "The child sneezed seven times",
        "There was neither voice nor hearing"
      ],
      "answer": 3,
      "chapter": 4,
      "book": "kings2",
      "explain": "Gehazi reported, 'The child is not awaked' (2 Kings 4:31); only when Elisha himself shut the door and prayed did the child revive."
    },
    {
      "q": "How do Elisha's miracles in chapter 4 connect back to 1 Kings?",
      "choices": [
        "They repeat Solomon's wisdom in judging between two mothers",
        "They mirror Elijah's miracles for the widow of Zarephath — unfailing oil and a son raised in an upper room",
        "They reverse the drought Elijah announced to Ahab",
        "They copy the miracles of Ahab's court prophets"
      ],
      "answer": 1,
      "chapter": 4,
      "book": "kings2",
      "explain": "Oil that does not fail and a dead son restored on the prophet's bed echo 1 Kings 17 — showing the 'double portion' of Elijah's spirit resting on Elisha."
    },
    {
      "q": "Who first told Naaman's household that a prophet in Samaria could heal his leprosy?",
      "choices": [
        "Naaman's armour-bearer",
        "A little captive maid from Israel",
        "The king of Israel",
        "Gehazi, Elisha's servant"
      ],
      "answer": 1,
      "chapter": 5,
      "book": "kings2",
      "explain": "A little maid taken captive from Israel, who waited on Naaman's wife, said, 'Would God my lord were with the prophet that is in Samaria! for he would recover him of his leprosy' (2 Kings 5:2–3)."
    },
    {
      "q": "Which rivers did Naaman angrily say were better than all the waters of Israel?",
      "choices": [
        "The Tigris and Euphrates",
        "The Kishon and Jabbok",
        "The Arnon and Yarmuk",
        "Abana and Pharpar, rivers of Damascus"
      ],
      "answer": 3,
      "chapter": 5,
      "book": "kings2",
      "explain": "'Are not Abana and Pharpar, rivers of Damascus, better than all the waters of Israel? may I not wash in them, and be clean?' (2 Kings 5:12). The Abana is usually identified with the Barada, which still waters Damascus."
    },
    {
      "q": "Why does Gehazi's punishment matter so much in Naaman's story?",
      "choices": [
        "By selling what God gave freely, he contradicted the lesson that grace cannot be bought",
        "It showed that Elisha disliked Syrians",
        "It proved Naaman had not really been healed",
        "It explained why Naaman went back to Rimmon"
      ],
      "answer": 0,
      "chapter": 5,
      "book": "kings2",
      "explain": "Elisha refused every gift (5:16) so Naaman would know God's healing was free. Gehazi ran after him and lied to get silver and clothing, and Naaman's leprosy clave to him (5:20–27)."
    },
    {
      "q": "What did Elisha do to recover the borrowed axe head that fell into the Jordan?",
      "choices": [
        "Struck the water with Elijah's mantle",
        "Sent the young man to dive for it",
        "Cut a stick, threw it in, and made the iron swim",
        "Prayed for the river to dry up"
      ],
      "answer": 2,
      "chapter": 6,
      "book": "kings2",
      "explain": "'He cut down a stick, and cast it in thither; and the iron did swim' (2 Kings 6:6). Iron tools were costly in the 9th century, so a lost borrowed axe head was a real debt."
    },
    {
      "q": "What did Elisha's servant see when the LORD opened his eyes at Dothan?",
      "choices": [
        "The mountain full of horses and chariots of fire round about Elisha",
        "An angel with a drawn sword",
        "The Syrian army struck dead",
        "A pillar of cloud between the armies"
      ],
      "answer": 0,
      "chapter": 6,
      "book": "kings2",
      "explain": "'Behold, the mountain was full of horses and chariots of fire round about Elisha' (2 Kings 6:17) — the same kind of heavenly host that took Elijah up (2:11)."
    },
    {
      "q": "Why is it significant that Elisha had the blinded Syrians fed rather than killed?",
      "choices": [
        "It was a trick to poison them",
        "The king of Israel had no soldiers left",
        "It was required by a treaty with Damascus",
        "Mercy to helpless enemies ended the raids for a time and showed God's power did not need bloodshed"
      ],
      "answer": 3,
      "chapter": 6,
      "book": "kings2",
      "explain": "Elisha told the king, 'Set bread and water before them' (6:22), and after the great feast 'the bands of Syria came no more into the land of Israel' (6:23) — at least for a time, until Ben-hadad's siege."
    },
    {
      "q": "What happened to the officer who scoffed at Elisha's prophecy of cheap flour?",
      "choices": [
        "He was struck with leprosy",
        "He became the richest man in Samaria",
        "He was taken captive by the Syrians",
        "He was trampled to death in the gate, seeing the plenty but not eating it"
      ],
      "answer": 3,
      "chapter": 7,
      "book": "kings2",
      "explain": "Elisha said, 'thou shalt see it with thine eyes, but shalt not eat thereof' (7:2). Set over the gate, he was trodden upon by the people and died (7:17–20)."
    },
    {
      "q": "Why did the Syrian army abandon its camp outside Samaria?",
      "choices": [
        "Their king had died in Damascus",
        "The LORD made them hear a great host and they thought Israel had hired the Hittites and Egyptians",
        "Elisha struck them with blindness",
        "Plague broke out among them"
      ],
      "answer": 1,
      "chapter": 7,
      "book": "kings2",
      "explain": "'The Lord had made the host of the Syrians to hear a noise of chariots, and a noise of horses' (7:6), and they fled in the twilight, leaving tents, horses, and food behind."
    },
    {
      "q": "What is the lesson of the lepers' words, 'this day is a day of good tidings, and we hold our peace'?",
      "choices": [
        "Lepers should never enter a city",
        "Spoil of war belongs to the king",
        "Those who find deliverance must share it, not hoard it",
        "The Syrians would soon return"
      ],
      "answer": 2,
      "chapter": 7,
      "book": "kings2",
      "explain": "After feasting and hiding treasure, the four lepers said, 'We do not well' (7:9), and went to tell the city — the outcasts became the heralds of good news to the starving."
    },
    {
      "q": "How did Hazael become king of Syria?",
      "choices": [
        "He smothered Ben-hadad with a thick wet cloth",
        "He was elected by the elders of Damascus",
        "He was Ben-hadad's eldest son",
        "Elisha anointed him with oil in Damascus"
      ],
      "answer": 0,
      "chapter": 8,
      "book": "kings2",
      "explain": "'He took a thick cloth, and dipped it in water, and spread it on his face, so that he died: and Hazael reigned in his stead' (8:15). Shalmaneser III's annals call him 'son of a nobody' — a usurper."
    },
    {
      "q": "Why did Elisha weep as he looked at Hazael?",
      "choices": [
        "He was grieving Ben-hadad's coming death",
        "Hazael had refused his blessing",
        "He foresaw the evil Hazael would do to the children of Israel",
        "He was homesick for Samaria"
      ],
      "answer": 2,
      "chapter": 8,
      "book": "kings2",
      "explain": "'I know the evil that thou wilt do unto the children of Israel' (8:12) — burned strongholds and slaughtered young men, women, and children. Hazael protested, 'Is thy servant a dog?' (8:13)."
    },
    {
      "q": "Why did the LORD not destroy Judah under the evil king Jehoram?",
      "choices": [
        "Because Jehoram repented in sackcloth",
        "For David his servant's sake, to give him always a light",
        "Because Edom paid tribute to protect it",
        "Because Elisha interceded for Jerusalem"
      ],
      "answer": 1,
      "chapter": 8,
      "book": "kings2",
      "explain": "'Yet the LORD would not destroy Judah for David his servant's sake, as he promised him to give him alway a light, and to his children' (8:19) — the covenant of 2 Samuel 7 holding even through a faithless heir."
    },
    {
      "q": "How did the watchman at Jezreel recognize Jehu from a distance?",
      "choices": [
        "By the banner of Ramoth-gilead",
        "By the sound of his trumpet",
        "His driving — 'for he driveth furiously'",
        "By the oil still on his head"
      ],
      "answer": 2,
      "chapter": 9,
      "book": "kings2",
      "explain": "'The driving is like the driving of Jehu the son of Nimshi; for he driveth furiously' (9:20)."
    },
    {
      "q": "Where was Joram's body thrown after Jehu shot him, and why does it matter?",
      "choices": [
        "Into the Jordan, recalling the Syrians' flight",
        "Into the brook Kishon, like the prophets of Baal",
        "Into the sepulchre of Ahab at Samaria",
        "Into the field of Naboth the Jezreelite, fulfilling the LORD's word about Naboth's blood"
      ],
      "answer": 3,
      "chapter": 9,
      "book": "kings2",
      "explain": "Jehu ordered him cast 'in the portion of the field of Naboth the Jezreelite' (9:25–26), recalling the LORD's word against Ahab for Naboth's murder (1 Kings 21:19)."
    },
    {
      "q": "What did Jezebel do when she heard Jehu had come to Jezreel?",
      "choices": [
        "She painted her face, tired her head, and looked out at a window",
        "She fled to her father in Sidon",
        "She gathered the prophets of Baal to curse him",
        "She hid in the house of Baal"
      ],
      "answer": 0,
      "chapter": 9,
      "book": "kings2",
      "explain": "'She painted her face, and tired her head, and looked out at a window' (9:30), taunting Jehu as a new Zimri before her eunuchs threw her down."
    },
    {
      "q": "Whom did Jehu take into his chariot, saying, 'Come with me, and see my zeal for the LORD'?",
      "choices": [
        "Elisha the prophet",
        "Jehonadab the son of Rechab",
        "Bidkar his captain",
        "Ahaziah king of Judah"
      ],
      "answer": 1,
      "chapter": 10,
      "book": "kings2",
      "explain": "Jehu met Jehonadab son of Rechab, took his hand into the chariot, and invited him to see his zeal (10:15–16). Jehonadab's Rechabites appear again in Jeremiah 35."
    },
    {
      "q": "What did Jehu make of the house of Baal in Samaria?",
      "choices": [
        "A temple of the LORD",
        "A royal storehouse",
        "A draught house (latrine)",
        "A tomb for Ahab's sons"
      ],
      "answer": 2,
      "chapter": 10,
      "book": "kings2",
      "explain": "'They brake down the image of Baal, and brake down the house of Baal, and made it a draught house unto this day' (10:27) — deliberate, permanent desecration."
    },
    {
      "q": "Why is Jehu's reign judged with a 'but' despite his destruction of Baal worship?",
      "choices": [
        "He refused to pay tribute to Assyria",
        "He spared Jezebel's family",
        "He moved the capital to Jezreel",
        "He did not walk in the LORD's law with all his heart and kept Jeroboam's golden calves"
      ],
      "answer": 3,
      "chapter": 10,
      "book": "kings2",
      "explain": "'But Jehu took no heed to walk in the law of the LORD God of Israel with all his heart: for he departed not from the sins of Jeroboam' (10:31) — the calves at Bethel and Dan remained, and Hazael began to cut Israel short (10:32)."
    },
    {
      "q": "Who rescued the infant Joash from Athaliah's massacre of the royal family?",
      "choices": [
        "Jehosheba, sister of King Ahaziah",
        "Jehonadab son of Rechab",
        "Hulda the prophetess",
        "Mattan the priest"
      ],
      "answer": 0,
      "chapter": 11,
      "book": "kings2",
      "explain": "Jehosheba, daughter of King Joram and sister of Ahaziah, 'stole him from among the king's sons which were slain' and hid him with his nurse; he was hidden in the house of the LORD six years (2 Kings 11:2–3)."
    },
    {
      "q": "What weapons did Jehoiada give the captains guarding the boy-king?",
      "choices": [
        "New swords forged by the Carites",
        "Weapons captured from the house of Baal",
        "King David's spears and shields kept in the temple",
        "Bows taken from Jehu's army"
      ],
      "answer": 2,
      "chapter": 11,
      "book": "kings2",
      "explain": "'To the captains over hundreds did the priest give king David's spears and shields, that were in the temple of the LORD' (2 Kings 11:10) — David's weapons protecting David's heir."
    },
    {
      "q": "What did Athaliah cry when she saw Joash crowned in the temple?",
      "choices": [
        "'Is it peace?'",
        "'Treason, Treason'",
        "'God save the king'",
        "'Thou art the man'"
      ],
      "answer": 1,
      "chapter": 11,
      "book": "kings2",
      "explain": "Seeing the king standing by a pillar and the people rejoicing, 'Athaliah rent her clothes, and cried, Treason, Treason' (2 Kings 11:14); she was then taken out and slain at the horse entrance to the palace."
    },
    {
      "q": "How long did Joash do what was right in the sight of the LORD?",
      "choices": [
        "His whole forty-year reign",
        "Until Hazael attacked Gath",
        "Only during his first seven years",
        "All the days Jehoiada the priest instructed him"
      ],
      "answer": 3,
      "chapter": 12,
      "book": "kings2",
      "explain": "'Jehoash did that which was right in the sight of the LORD all his days wherein Jehoiada the priest instructed him' (2 Kings 12:2) — a qualifier that hints at his later decline (2 Chronicles 24:17–22)."
    },
    {
      "q": "How did Jehoiada finally get the temple repairs funded?",
      "choices": [
        "He taxed every man fifty shekels",
        "He bored a hole in the lid of a chest and set it beside the altar",
        "He sold the hallowed things to Hazael",
        "He asked the king of Tyre for cedar and gold"
      ],
      "answer": 1,
      "chapter": 12,
      "book": "kings2",
      "explain": "After the priests failed to repair the house by the king's twenty-third year, 'Jehoiada the priest took a chest, and bored a hole in the lid of it, and set it beside the altar' (2 Kings 12:9), and the money went directly to the workmen."
    },
    {
      "q": "What did Joash do when Hazael set his face to go up against Jerusalem?",
      "choices": [
        "Sent him the temple's hallowed things and gold",
        "Called on Joash of Israel for help",
        "Fought him at Ramoth-gilead",
        "Asked Elisha to strike his army blind"
      ],
      "answer": 0,
      "chapter": 12,
      "book": "kings2",
      "explain": "Joash took all the hallowed things his fathers had dedicated and all the gold in the treasures of the temple and palace and sent them to Hazael, who then went away from Jerusalem (2 Kings 12:17–18)."
    },
    {
      "q": "To what was Israel's army reduced under Jehoahaz?",
      "choices": [
        "Two thousand chariots and seven thousand men",
        "Three hundred men with trumpets",
        "Fifty horsemen, ten chariots, and ten thousand footmen",
        "Seven thousand who had not bowed to Baal"
      ],
      "answer": 2,
      "chapter": 13,
      "book": "kings2",
      "explain": "Hazael left Jehoahaz 'but fifty horsemen, and ten chariots, and ten thousand footmen,' making them 'like the dust by threshing' (2 Kings 13:7)."
    },
    {
      "q": "Why was Elisha angry when King Joash struck the ground with the arrows?",
      "choices": [
        "He shot the arrows toward Judah instead of Syria",
        "He refused to touch the bow",
        "He struck only three times and stopped",
        "He broke the arrows in anger"
      ],
      "answer": 2,
      "chapter": 13,
      "book": "kings2",
      "explain": "'Thou shouldest have smitten five or six times; then hadst thou smitten Syria till thou hadst consumed it: whereas now thou shalt smite Syria but thrice' (2 Kings 13:19)."
    },
    {
      "q": "What happened when a dead man was thrown into Elisha's tomb?",
      "choices": [
        "The tomb was sealed by an earthquake",
        "He revived and stood up on his feet",
        "Fire came down and consumed the Moabite raiders",
        "Elisha's mantle was found on him"
      ],
      "answer": 1,
      "chapter": 13,
      "book": "kings2",
      "explain": "Fleeing a band of Moabites, the mourners cast the man into Elisha's sepulchre, 'and when the man was let down, and touched the bones of Elisha, he revived, and stood up on his feet' (2 Kings 13:21)."
    },
    {
      "q": "Why did Amaziah spare the children of his father's murderers?",
      "choices": [
        "Jehoiada had pleaded for them",
        "They fled to Edom for refuge",
        "They paid a ransom of silver",
        "The law of Moses said every man shall die for his own sin"
      ],
      "answer": 3,
      "chapter": 14,
      "book": "kings2",
      "explain": "He spared them 'according unto that which is written in the book of the law of Moses' — 'every man shall be put to death for his own sin' (2 Kings 14:6; Deuteronomy 24:16)."
    },
    {
      "q": "In Joash of Israel's fable answering Amaziah, what happened to the thistle?",
      "choices": [
        "A wild beast passed by and trod it down",
        "It was burned by fire from the bramble",
        "It grew taller than the cedar",
        "It was cut down for the temple"
      ],
      "answer": 0,
      "chapter": 14,
      "book": "kings2",
      "explain": "The thistle asked the cedar for its daughter to wife, 'and there passed by a wild beast that was in Lebanon, and trode down the thistle' (2 Kings 14:9) — a warning to Amaziah not to meddle."
    },
    {
      "q": "Which prophet foretold Jeroboam II's restoration of Israel's borders?",
      "choices": [
        "Amos of Tekoa",
        "Micaiah son of Imlah",
        "Jonah son of Amittai",
        "Ahijah the Shilonite"
      ],
      "answer": 2,
      "chapter": 14,
      "book": "kings2",
      "explain": "Jeroboam restored the coast of Israel 'according to the word of the LORD God of Israel, which he spake by the hand of his servant Jonah, the son of Amittai, the prophet, which was of Gath-hepher' (2 Kings 14:25)."
    },
    {
      "q": "The death of Zechariah son of Jeroboam fulfilled which word of the LORD?",
      "choices": [
        "That dogs would eat Jezebel by the wall of Jezreel",
        "That Jehu's sons would sit on the throne unto the fourth generation",
        "That Jericho's rebuilder would lose his firstborn",
        "That Israel would be scattered beyond the river"
      ],
      "answer": 1,
      "chapter": 15,
      "book": "kings2",
      "explain": "'This was the word of the LORD which he spake unto Jehu, saying, Thy sons shall sit on the throne of Israel unto the fourth generation. And so it came to pass' (2 Kings 15:12; compare 10:30)."
    },
    {
      "q": "How did Menahem raise a thousand talents of silver for Pul king of Assyria?",
      "choices": [
        "He stripped the gold from the calves at Bethel",
        "He sold Israelites as slaves to Tyre",
        "He looted Jerusalem's temple",
        "He exacted fifty shekels from each wealthy man"
      ],
      "answer": 3,
      "chapter": 15,
      "book": "kings2",
      "explain": "'Menahem exacted the money of Israel, even of all the mighty men of wealth, of each man fifty shekels of silver, to give to the king of Assyria' (2 Kings 15:20)."
    },
    {
      "q": "Why did Azariah (Uzziah) live in a separate house while Jotham judged the people?",
      "choices": [
        "The LORD struck him with leprosy",
        "He was imprisoned by Joash of Israel",
        "He went blind in old age",
        "He was held hostage in Damascus"
      ],
      "answer": 0,
      "chapter": 15,
      "book": "kings2",
      "explain": "'The LORD smote the king, so that he was a leper unto the day of his death, and dwelt in a several house. And Jotham the king's son was over the house, judging the people' (2 Kings 15:5)."
    },
    {
      "q": "What did Ahaz call himself in his message to Tiglath-pileser?",
      "choices": [
        "'Thy brother and thy friend'",
        "'The anointed of the LORD'",
        "'Thy servant and thy son'",
        "'A dead dog'"
      ],
      "answer": 2,
      "chapter": 16,
      "book": "kings2",
      "explain": "Ahaz sent messengers saying, 'I am thy servant and thy son: come up, and save me out of the hand of the king of Syria, and out of the hand of the king of Israel' (2 Kings 16:7) — covenant language owed to God."
    },
    {
      "q": "What did Ahaz bring back from his visit to Damascus?",
      "choices": [
        "The ark of the covenant",
        "The pattern of an altar for Urijah the priest to copy",
        "Two golden calves",
        "Rezin's crown"
      ],
      "answer": 1,
      "chapter": 16,
      "book": "kings2",
      "explain": "Ahaz 'saw an altar that was at Damascus,' sent its fashion and pattern to Urijah the priest, and had a copy built in the temple, pushing Solomon's bronze altar aside (2 Kings 16:10–15)."
    },
    {
      "q": "Which two kings besieged Ahaz in Jerusalem?",
      "choices": [
        "Rezin of Syria and Pekah of Israel",
        "Hazael and Jehu",
        "Shalmaneser and So of Egypt",
        "Mesha of Moab and the king of Edom"
      ],
      "answer": 0,
      "chapter": 16,
      "book": "kings2",
      "explain": "'Rezin king of Syria and Pekah son of Remaliah king of Israel came up to Jerusalem to war: and they besieged Ahaz, but could not overcome him' (2 Kings 16:5)."
    },
    {
      "q": "Which foreign king did Hoshea turn to when he rebelled against Assyria?",
      "choices": [
        "Hiram king of Tyre",
        "Rezin king of Syria",
        "Ben-hadad son of Hazael",
        "So king of Egypt"
      ],
      "answer": 3,
      "chapter": 17,
      "book": "kings2",
      "explain": "The king of Assyria 'found conspiracy in Hoshea: for he had sent messengers to So king of Egypt, and brought no present to the king of Assyria' (2 Kings 17:4), so Hoshea was imprisoned and Samaria besieged."
    },
    {
      "q": "How long did the Assyrian siege of Samaria last?",
      "choices": [
        "Forty days",
        "Seven months",
        "Three years",
        "Twelve years"
      ],
      "answer": 2,
      "chapter": 17,
      "book": "kings2",
      "explain": "The king of Assyria 'went up to Samaria, and besieged it three years'; in Hoshea's ninth year he took Samaria and carried Israel away into Assyria (2 Kings 17:5–6)."
    },
    {
      "q": "What did the resettled peoples in Samaria do after a priest was sent back to Bethel?",
      "choices": [
        "They destroyed all their idols",
        "They feared the LORD and served their own gods",
        "They went up to worship at Jerusalem",
        "They returned to their homelands"
      ],
      "answer": 1,
      "chapter": 17,
      "book": "kings2",
      "explain": "Lions killed some of the newcomers, so an exiled priest taught them how to fear the LORD — yet 'they feared the LORD, and served their own gods, after the manner of the nations' (2 Kings 17:25–33)."
    },
    {
      "q": "What did Hezekiah call the bronze serpent of Moses when he broke it in pieces?",
      "choices": [
        "Ichabod",
        "Nehushtan",
        "Ebenezer",
        "Rehoboth"
      ],
      "answer": 1,
      "chapter": 18,
      "book": "kings2",
      "explain": "Because the children of Israel burned incense to it, Hezekiah 'brake in pieces the brasen serpent that Moses had made... and he called it Nehushtan' (2 Kings 18:4) — a mere piece of brass."
    },
    {
      "q": "What did the Rabshakeh call Egypt when mocking Judah's hope of help?",
      "choices": [
        "A broken cistern",
        "A sleeping lion",
        "A wall of sand",
        "A bruised reed"
      ],
      "answer": 3,
      "chapter": 18,
      "book": "kings2",
      "explain": "He said Hezekiah was trusting 'upon the staff of this bruised reed, even upon Egypt, on which if a man lean, it will go into his hand, and pierce it' (2 Kings 18:21)."
    },
    {
      "q": "Why did Hezekiah's officials ask the Rabshakeh to speak in Aramaic?",
      "choices": [
        "So the people on the wall would not understand his threats",
        "Because they did not speak Hebrew",
        "Because Aramaic was the language of the temple",
        "So Sennacherib could read the record"
      ],
      "answer": 0,
      "chapter": 18,
      "book": "kings2",
      "explain": "They asked him to speak 'in the Syrian language; for we understand it: and talk not with us in the Jews' language in the ears of the people that are on the wall' (2 Kings 18:26) — Aramaic was the diplomats' language."
    },
    {
      "q": "What did Hezekiah do with Sennacherib's threatening letter?",
      "choices": [
        "Burned it on the altar",
        "Sent it to Pharaoh Tirhakah",
        "Spread it before the LORD in the temple",
        "Read it aloud to the people on the wall"
      ],
      "answer": 2,
      "chapter": 19,
      "book": "kings2",
      "explain": "'Hezekiah went up into the house of the LORD, and spread it before the LORD' (2 Kings 19:14), and then prayed that all the kingdoms of the earth would know He alone is God."
    },
    {
      "q": "How many Assyrians did the angel of the LORD strike in one night?",
      "choices": [
        "18,500",
        "85,000",
        "150,000",
        "185,000"
      ],
      "answer": 3,
      "chapter": 19,
      "book": "kings2",
      "explain": "The angel 'smote in the camp of the Assyrians an hundred fourscore and five thousand' — 185,000 (2 Kings 19:35)."
    },
    {
      "q": "For whose sake did God say He would defend Jerusalem?",
      "choices": [
        "For Hezekiah's righteousness",
        "For His own sake and for His servant David's sake",
        "For the sake of the priests in the temple",
        "For Isaiah's prayers"
      ],
      "answer": 1,
      "chapter": 19,
      "book": "kings2",
      "explain": "'For I will defend this city, to save it, for mine own sake, and for my servant David's sake' (2 Kings 19:34) — the promise of 2 Samuel 7 at work."
    },
    {
      "q": "What sign did God give Hezekiah that he would be healed?",
      "choices": [
        "The shadow went back ten degrees on the dial of Ahaz",
        "Fire fell on the altar",
        "Dew fell only on a fleece",
        "The Gihon spring overflowed"
      ],
      "answer": 0,
      "chapter": 20,
      "book": "kings2",
      "explain": "At Isaiah's prayer the Lord 'brought the shadow ten degrees backward, by which it had gone down in the dial of Ahaz' (2 Kings 20:11)."
    },
    {
      "q": "How many years did God add to Hezekiah's life?",
      "choices": [
        "Seven",
        "Ten",
        "Fifteen",
        "Forty"
      ],
      "answer": 2,
      "chapter": 20,
      "book": "kings2",
      "explain": "'I will add unto thy days fifteen years; and I will deliver thee and this city out of the hand of the king of Assyria' (2 Kings 20:6)."
    },
    {
      "q": "What did Isaiah prophesy after Hezekiah showed the Babylonian envoys all his treasures?",
      "choices": [
        "Assyria would seize them within a year",
        "Hezekiah would die that night",
        "Babylon would become Judah's ally",
        "All of it, and some of his sons, would be carried to Babylon"
      ],
      "answer": 3,
      "chapter": 20,
      "book": "kings2",
      "explain": "'All that is in thine house... shall be carried into Babylon: nothing shall be left,' and some of his sons would be eunuchs in the palace of the king of Babylon (2 Kings 20:17–18)."
    },
    {
      "q": "How long did Manasseh reign — the longest of any king of Judah?",
      "choices": [
        "Forty years",
        "Fifty-five years",
        "Thirty-one years",
        "Twenty-nine years"
      ],
      "answer": 1,
      "chapter": 21,
      "book": "kings2",
      "explain": "'Manasseh was twelve years old when he began to reign, and reigned fifty and five years in Jerusalem' (2 Kings 21:1)."
    },
    {
      "q": "What image did God use for how He would treat Jerusalem because of Manasseh's sins?",
      "choices": [
        "Wiping it as a man wipes a dish and turning it upside down",
        "Pruning it like a vine",
        "Refining it like silver in a furnace",
        "Scattering it like chaff before the wind"
      ],
      "answer": 0,
      "chapter": 21,
      "book": "kings2",
      "explain": "God said He would stretch over Jerusalem the line of Samaria and 'wipe Jerusalem as a man wipeth a dish, wiping it, and turning it upside down' (2 Kings 21:13)."
    },
    {
      "q": "What happened to Manasseh's son Amon?",
      "choices": [
        "He was taken captive to Assyria",
        "He died of plague in the temple",
        "His servants conspired and killed him in his house",
        "He reigned forty years and died in peace"
      ],
      "answer": 2,
      "chapter": 21,
      "book": "kings2",
      "explain": "After two years 'the servants of Amon conspired against him, and slew the king in his own house'; the people of the land killed the conspirators and made Josiah king (2 Kings 21:23–24)."
    },
    {
      "q": "Who found the book of the law in the house of the LORD?",
      "choices": [
        "Shaphan the scribe",
        "Huldah the prophetess",
        "Jeremiah",
        "Hilkiah the high priest"
      ],
      "answer": 3,
      "chapter": 22,
      "book": "kings2",
      "explain": "'Hilkiah the high priest said unto Shaphan the scribe, I have found the book of the law in the house of the LORD' (2 Kings 22:8)."
    },
    {
      "q": "How did Josiah respond when he heard the words of the book of the law?",
      "choices": [
        "He sealed it in the ark",
        "He rent his clothes",
        "He ordered it copied for every city",
        "He summoned Pharaoh's priests"
      ],
      "answer": 1,
      "chapter": 22,
      "book": "kings2",
      "explain": "'When the king had heard the words of the book of the law, that he rent his clothes' (2 Kings 22:11), knowing great was the wrath of the Lord against Judah."
    },
    {
      "q": "What did Huldah promise Josiah personally?",
      "choices": [
        "He would be gathered to his grave in peace before the disaster",
        "He would live to see Babylon fall",
        "His sons would reign forever",
        "Jerusalem would never be destroyed"
      ],
      "answer": 0,
      "chapter": 22,
      "book": "kings2",
      "explain": "Because his heart was tender, 'thou shalt be gathered into thy grave in peace; and thine eyes shall not see all the evil which I will bring upon this place' (2 Kings 22:20)."
    },
    {
      "q": "What did Josiah do at Bethel that fulfilled a prophecy from 1 Kings 13?",
      "choices": [
        "Rebuilt Jeroboam's altar for the Lord",
        "Took bones from the tombs and burned them on Jeroboam's altar",
        "Set up a new golden calf",
        "Anointed a new priest for Bethel"
      ],
      "answer": 1,
      "chapter": 23,
      "book": "kings2",
      "explain": "Josiah 'took the bones out of the sepulchres, and burned them upon the altar... according to the word of the LORD which the man of God proclaimed' (2 Kings 23:16; compare 1 Kings 13:2)."
    },
    {
      "q": "What feast did Josiah keep that had not been held like it since the days of the judges?",
      "choices": [
        "The Feast of Tabernacles",
        "The Day of Atonement",
        "The Passover",
        "The Feast of Trumpets"
      ],
      "answer": 2,
      "chapter": 23,
      "book": "kings2",
      "explain": "'Surely there was not holden such a passover from the days of the judges that judged Israel, nor in all the days of the kings of Israel, nor of the kings of Judah' (2 Kings 23:22)."
    },
    {
      "q": "Where was Josiah killed by Pharaoh Neco?",
      "choices": [
        "Riblah",
        "Carchemish",
        "Lachish",
        "Megiddo"
      ],
      "answer": 3,
      "chapter": 23,
      "book": "kings2",
      "explain": "'King Josiah went against him; and he slew him at Megiddo, when he had seen him' (2 Kings 23:29)."
    },
    {
      "q": "According to 2 Kings 24, whose sins were the reason the LORD removed Judah from His sight?",
      "choices": [
        "Jeroboam's",
        "Manasseh's",
        "Ahab's",
        "Solomon's"
      ],
      "answer": 1,
      "chapter": 24,
      "book": "kings2",
      "explain": "'Surely at the commandment of the LORD came this upon Judah, to remove them out of his sight, for the sins of Manasseh' (2 Kings 24:3)."
    },
    {
      "q": "How long did Jehoiachin reign before surrendering to Nebuchadnezzar?",
      "choices": [
        "Three months",
        "Three years",
        "Eleven years",
        "Seven days"
      ],
      "answer": 0,
      "chapter": 24,
      "book": "kings2",
      "explain": "'Jehoiachin was eighteen years old when he began to reign, and he reigned in Jerusalem three months' (2 Kings 24:8) before going out to the king of Babylon."
    },
    {
      "q": "What new name did Nebuchadnezzar give Mattaniah when he made him king?",
      "choices": [
        "Jehoiakim",
        "Jeconiah",
        "Zedekiah",
        "Shallum"
      ],
      "answer": 2,
      "chapter": 24,
      "book": "kings2",
      "explain": "'The king of Babylon made Mattaniah his father's brother king in his stead, and changed his name to Zedekiah' (2 Kings 24:17)."
    },
    {
      "q": "Where was Zedekiah captured as he fled Jerusalem?",
      "choices": [
        "At the brook Kidron",
        "In the plains of Jericho",
        "At Mizpah",
        "At the gates of Egypt"
      ],
      "answer": 1,
      "chapter": 25,
      "book": "kings2",
      "explain": "'The army of the Chaldees pursued after the king, and overtook him in the plains of Jericho: and all his army were scattered from him' (2 Kings 25:5)."
    },
    {
      "q": "Whom did Nebuchadnezzar appoint governor over the people left in Judah?",
      "choices": [
        "Ishmael son of Nethaniah",
        "Jeremiah the prophet",
        "Nebuzaradan",
        "Gedaliah son of Ahikam"
      ],
      "answer": 3,
      "chapter": 25,
      "book": "kings2",
      "explain": "'Over them he made Gedaliah the son of Ahikam, the son of Shaphan, ruler' (2 Kings 25:22), and Gedaliah governed from Mizpah until Ishmael murdered him."
    },
    {
      "q": "How does the book of Kings end?",
      "choices": [
        "With Jehoiachin released from prison and eating at the king of Babylon's table",
        "With the temple in ashes and no survivors",
        "With the exiles returning to Jerusalem",
        "With Zedekiah dying in Riblah"
      ],
      "answer": 0,
      "chapter": 25,
      "book": "kings2",
      "explain": "Evil-merodach lifted up Jehoiachin's head, changed his prison garments, and 'he did eat bread continually before him all the days of his life' (2 Kings 25:27–30) — David's heir at the king's table, like Mephibosheth (2 Samuel 9:13)."
    }
  ];
  if (!Array.isArray(window.QUIZ)) window.QUIZ = [];
  Array.prototype.push.apply(window.QUIZ, add);
})();
