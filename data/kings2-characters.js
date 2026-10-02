// data/kings2-characters.js — people first met in 2 Kings, appended to window.CHARACTERS.
// `kings2` refs are indexed from window.KINGS2 by data/kings2-world.js.

(function () {
  var add = [
    {
      "id": "ahaziah-israel",
      "name": "Ahaziah (King of Israel)",
      "title": "Ahab's son who sought Baal-zebub",
      "description": "The son of Ahab and Jezebel, Ahaziah reigned over Israel from Samaria for two years (c. 853–852 BC) and served Baal as his parents had (1 Kings 22:51–53). After falling through the lattice of his upper room, he sent to ask Baal-zebub of Ekron whether he would recover, and when Elijah intercepted his messengers he sent three companies of soldiers to seize the prophet — two were consumed by fire from heaven. He died on his sickbed just as Elijah said, and because he had no son the throne passed to his brother Jehoram.",
      "chapters": []
    },
    {
      "id": "jehoram-israel",
      "name": "Jehoram (Joram), King of Israel",
      "title": "Last king of Omri's dynasty",
      "description": "Another son of Ahab, Jehoram (also called Joram) reigned over Israel c. 852–841 BC; he removed his father's pillar of Baal but held fast to Jeroboam's golden calves. With Jehoshaphat of Judah and the king of Edom he marched against the rebel Mesha of Moab, and nearly perished of thirst until Elisha — who would not have looked at him but for Jehoshaphat — promised water. He appears again in Elisha's stories, and was eventually wounded at Ramoth-gilead and killed by Jehu at Jezreel in Naboth's field (2 Kings 9), fulfilling Elijah's word against Ahab's house and ending the Omride dynasty.",
      "chapters": []
    },
    {
      "id": "mesha",
      "name": "Mesha",
      "title": "King of Moab who threw off Israel's yoke",
      "description": "A sheep-breeding king of Moab who paid Israel a tribute of a hundred thousand lambs and a hundred thousand rams' wool, then rebelled after Ahab died. When Israel, Judah, and Edom invaded and besieged him in Kir-haraseth, he sacrificed his eldest son on the city wall, and the allies withdrew. His own account of throwing off Omride rule, credited to his god Chemosh, survives on the Mesha stele (Moabite Stone), discovered at Dhiban in 1868 and now in the Louvre.",
      "chapters": []
    },
    {
      "id": "gehazi",
      "name": "Gehazi",
      "title": "Elisha's servant",
      "description": "Elisha's attendant, who noticed that the Shunammite woman had no son and whose observation led to the promise of her child. When the boy died, Gehazi tried to push the grieving mother away from Elisha, and the prophet's staff he laid on the child produced no sign of life. Later his greed after Naaman's healing brought Naaman's leprosy upon him (2 Kings 5), yet he was afterward found recounting Elisha's great deeds to the king (2 Kings 8:4–5).",
      "chapters": []
    },
    {
      "id": "shunammite-woman",
      "name": "The Shunammite Woman",
      "title": "The 'great woman' of Shunem",
      "description": "A wealthy woman of Shunem who fed Elisha whenever he passed and had a small furnished room built for him on her roof. Elisha promised her a son after long childlessness, and when the boy later died in the harvest field she laid him on the prophet's bed, rode to Mount Carmel, and would not leave Elisha until he came and the Lord raised the child. Warned by Elisha, she later fled a seven-year famine to Philistine country and on her return had her house and land restored by the king (2 Kings 8:1–6).",
      "chapters": []
    },
    {
      "id": "prophets-widow",
      "name": "The Prophet's Widow",
      "title": "Widow whose oil did not stop",
      "description": "The widow of one of the sons of the prophets, a man who 'did fear the LORD,' left in debt so deep that a creditor was coming to take her two sons as slaves. At Elisha's word she borrowed empty vessels, shut the door, and poured from her one pot of oil until every vessel was full, then sold the oil to pay the debt and live on the rest. Her story echoes Elijah's widow of Zarephath; Josephus later identified her husband as Obadiah, Ahab's God-fearing steward, though the Bible does not name him.",
      "chapters": []
    },
    {
      "id": "naaman",
      "name": "Naaman",
      "title": "Syrian commander healed in the Jordan",
      "description": "Naaman was captain of the army of the king of Syria, a great and honored man through whom the Lord had given victory to Syria — but he was a leper (2 Kings 5:1). Pointed to Elisha by a captive Israelite girl, he was offended by the command to wash seven times in the Jordan, yet obeyed at his servants' urging and was made clean. He confessed that there is no God in all the earth but in Israel and took home Israelite soil to worship the Lord. Jesus cited him as proof that God's grace reaches beyond Israel (Luke 4:27).",
      "chapters": []
    },
    {
      "id": "naamans-maid",
      "name": "Naaman's Maid",
      "title": "Captive girl who pointed to the prophet",
      "description": "A little Israelite girl carried off by Syrian raiders, she served Naaman's wife in Damascus (2 Kings 5:2). Rather than bitterness, she showed concern for her master and said, 'Would God my lord were with the prophet that is in Samaria! for he would recover him of his leprosy.' Her single sentence of faith set the whole story of Naaman's healing in motion. She is never named.",
      "chapters": []
    },
    {
      "id": "hazael",
      "name": "Hazael",
      "title": "Usurper king of Aram-Damascus",
      "description": "A high official of Ben-hadad, Hazael was sent to ask Elisha whether his sick master would recover; Elisha wept, foreseeing the atrocities he would commit against Israel, and told him he would be king (2 Kings 8:7–13). The next day he smothered Ben-hadad and seized the throne, fulfilling the commission given to Elijah at Horeb (1 Kings 19:15). Shalmaneser III called him 'son of a nobody,' and he likely set up the Tel Dan stele. For decades (c. 842–800 BC) he ravaged Gilead and later pressed into Philistia and Judah (2 Kings 10:32–33; 12:17–18).",
      "chapters": []
    },
    {
      "id": "jehu",
      "name": "Jehu",
      "title": "Furious driver who ended Ahab's dynasty",
      "description": "Jehu son of Jehoshaphat son of Nimshi was an army commander anointed king at Ramoth-gilead by one of Elisha's prophets, fulfilling the Lord's word to Elijah (1 Kings 19:16; 2 Kings 9:1–13). In 841 BC he killed Joram of Israel and Ahaziah of Judah, had Jezebel thrown from her window, wiped out Ahab's house, and destroyed Baal worship in Samaria. Yet he kept Jeroboam's golden calves, and the Lord promised his line only four generations (10:30–31). He appears paying tribute on Shalmaneser III's Black Obelisk and reigned twenty-eight years (c. 841–814 BC).",
      "chapters": []
    },
    {
      "id": "jehoram-judah",
      "name": "Jehoram (King of Judah)",
      "title": "Jehoshaphat's son married to Ahab's daughter",
      "description": "The son of Jehoshaphat, Jehoram reigned eight years in Jerusalem (sole reign c. 848–841 BC) and, married to Athaliah daughter of Ahab, walked in the ways of the kings of Israel (2 Kings 8:16–18). In his days Edom and Libnah revolted from Judah. The Lord did not destroy Judah 'for David his servant's sake' (8:19). Chronicles adds that he killed his brothers and died of a painful disease, unlamented (2 Chronicles 21).",
      "chapters": []
    },
    {
      "id": "ahaziah-judah",
      "name": "Ahaziah (King of Judah)",
      "title": "Ahab's grandson who died in Jehu's coup",
      "description": "Son of Jehoram of Judah and Athaliah, Ahaziah became king at twenty-two and reigned one year (841 BC), walking in the way of the house of Ahab (2 Kings 8:25–27). He fought beside his uncle Joram of Israel against Hazael at Ramoth-gilead and was visiting him in Jezreel when Jehu struck. Wounded near Ibleam, he died at Megiddo and was buried in Jerusalem (9:27–28). His death opened the way for his mother Athaliah to seize Judah's throne (11:1).",
      "chapters": []
    },
    {
      "id": "athaliah",
      "name": "Athaliah",
      "title": "Ahab's daughter, queen mother of Judah",
      "description": "A daughter of Ahab (called 'daughter of Omri,' that is, of Omri's house, in 2 Kings 8:26), Athaliah married Jehoram of Judah and carried the Baal-worshipping ways of Ahab and Jezebel into Jerusalem. She was the mother of King Ahaziah and his counsellor in wickedness (2 Chronicles 22:3). After his death at Jehu's hand she would destroy the royal seed and rule Judah herself for six years (2 Kings 11).",
      "chapters": []
    },
    {
      "id": "jehonadab",
      "name": "Jehonadab son of Rechab",
      "title": "Austere ally who rode with Jehu",
      "description": "Jehonadab (Jonadab) son of Rechab met Jehu on the road to Samaria, gave him his hand, and rode in his chariot to witness his 'zeal for the LORD' and the destruction of Baal's worshippers (2 Kings 10:15–23). He was the founder of the Rechabites, who by his command drank no wine, built no houses, and lived in tents. Two and a half centuries later Jeremiah held up their faithfulness to his command as a rebuke to unfaithful Judah (Jeremiah 35).",
      "chapters": []
    }
  ];
  if (!Array.isArray(window.CHARACTERS)) window.CHARACTERS = [];
  Array.prototype.push.apply(window.CHARACTERS, add);
})();
