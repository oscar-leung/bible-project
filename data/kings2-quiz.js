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
    }
  ];
  if (!Array.isArray(window.QUIZ)) window.QUIZ = [];
  Array.prototype.push.apply(window.QUIZ, add);
})();
