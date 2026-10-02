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
    },
    {
      "id": "jehoiada",
      "name": "Jehoiada",
      "title": "The priest who saved David's line",
      "description": "Jehoiada was the high priest in Jerusalem during Athaliah's usurpation, and his wife Jehosheba was the sister of King Ahaziah (2 Chronicles 22:11). He hid the infant Joash in the temple for six years, then organized the guard, crowned the boy, had Athaliah executed, and led a covenant renewal that tore down Baal's temple (2 Kings 11). He guided Joash for decades and devised the collection chest for the temple repairs (12:9); the Chronicler says he died at 130 and was buried among the kings (2 Chronicles 24:15–16).",
      "chapters": []
    },
    {
      "id": "joash-judah",
      "name": "Joash (Jehoash), King of Judah",
      "title": "The boy-king saved from Athaliah",
      "description": "The only surviving son of Ahaziah, Joash was rescued as a baby from Athaliah's massacre and crowned at seven by Jehoiada the priest (2 Kings 11). He reigned forty years (c. 835–796 BC), doing right while Jehoiada instructed him and restoring the temple through a public collection chest (12:2, 9–15). Later he stripped the temple's treasures to buy off Hazael and, according to 2 Chronicles 24, turned to idols and had Jehoiada's son Zechariah stoned; he was assassinated by his own servants (12:20–21).",
      "chapters": []
    },
    {
      "id": "jehoahaz-israel",
      "name": "Jehoahaz, King of Israel",
      "title": "Jehu's son under Aram's heel",
      "description": "Son of Jehu and the second king of his dynasty, Jehoahaz reigned seventeen years in Samaria (c. 814–798 BC) and kept Jeroboam's sins (2 Kings 13:1–2). Under him Hazael and Ben-hadad of Syria reduced Israel's army to fifty horsemen, ten chariots, and ten thousand footmen (13:7). Yet when he besought the LORD, God heard him and sent Israel a saviour (13:4–5).",
      "chapters": []
    },
    {
      "id": "joash-israel",
      "name": "Joash (Jehoash), King of Israel",
      "title": "Elisha's mourner and Amaziah's conqueror",
      "description": "Jehu's grandson, Joash reigned sixteen years in Samaria (c. 798–782 BC) and continued Jeroboam's calf worship (2 Kings 13:10–11). He wept at Elisha's deathbed, 'O my father, my father,' shot the arrow of the LORD's deliverance, but struck the ground only three times — and so defeated Ben-hadad only three times (13:14–25). He crushed Amaziah of Judah at Beth-shemesh, broke down Jerusalem's wall, and looted its temple (14:8–14); Assyrian records name him paying tribute to Adad-nirari III.",
      "chapters": []
    },
    {
      "id": "amaziah",
      "name": "Amaziah, King of Judah",
      "title": "Victor over Edom, undone by pride",
      "description": "Son of Joash of Judah, Amaziah reigned twenty-nine years (c. 796–767 BC) and did right, 'yet not like David' (2 Kings 14:3). He punished his father's murderers but spared their children according to the law of Moses, and defeated Edom in the Valley of Salt and captured Sela (14:5–7). Swollen with pride, he provoked Joash of Israel, was captured at Beth-shemesh, and saw Jerusalem plundered; he was later assassinated at Lachish (14:8–20).",
      "chapters": []
    },
    {
      "id": "jeroboam-ii",
      "name": "Jeroboam II, King of Israel",
      "title": "Israel's last prosperous king",
      "description": "Son of Joash and fourth king of Jehu's dynasty, Jeroboam II reigned forty-one years in Samaria (c. 793–753 BC, including a co-regency), the longest reign of any northern king (2 Kings 14:23). Though he kept the sins of his namesake Jeroboam son of Nebat, God used him to restore Israel's borders from Hamath to the Dead Sea, as Jonah son of Amittai had foretold (14:25–28). His prosperous era is the setting for the prophets Amos and Hosea, who condemned its luxury, injustice, and idolatry.",
      "chapters": []
    },
    {
      "id": "azariah-uzziah",
      "name": "Azariah (Uzziah), King of Judah",
      "title": "The long-reigning leper king",
      "description": "Made king at sixteen after Amaziah's murder, Azariah — also called Uzziah — reigned fifty-two years (c. 792–740 BC, including co-regencies), rebuilt Elath, and did right in the sight of the LORD (2 Kings 14:21–22; 15:1–3). The LORD struck him with leprosy, and he lived in a separate house while his son Jotham governed (15:5); 2 Chronicles 26 links this to his burning incense in the temple. Isaiah received his great vision 'in the year that king Uzziah died' (Isaiah 6:1).",
      "chapters": []
    },
    {
      "id": "zechariah-israel",
      "name": "Zechariah, King of Israel",
      "title": "The last of Jehu's line",
      "description": "Son of Jeroboam II, Zechariah reigned only six months in Samaria (c. 753 BC) and continued the sins of Jeroboam son of Nebat (2 Kings 15:8–9). Shallum son of Jabesh assassinated him in public, ending Jehu's dynasty in its fourth generation, exactly as the LORD had told Jehu (15:10–12; 10:30).",
      "chapters": []
    },
    {
      "id": "shallum",
      "name": "Shallum son of Jabesh",
      "title": "The one-month king",
      "description": "Shallum murdered Zechariah and seized Israel's throne, but reigned only one full month in Samaria (c. 752 BC) before Menahem son of Gadi came up from Tirzah and killed him (2 Kings 15:10, 13–14). His brief reign marks the start of the violent coups that filled Israel's last thirty years.",
      "chapters": []
    },
    {
      "id": "menahem",
      "name": "Menahem, King of Israel",
      "title": "The brutal king who paid off Assyria",
      "description": "Menahem son of Gadi killed Shallum, savagely sacked Tiphsah, and reigned ten years in Samaria (c. 752–742 BC) (2 Kings 15:14–18). When Pul (Tiglath-pileser III) came against the land, Menahem paid a thousand talents of silver, taxing every wealthy man fifty shekels, to secure his throne (15:19–20). Tiglath-pileser's own annals list 'Menahem of Samaria' among his tributaries.",
      "chapters": []
    },
    {
      "id": "pekahiah",
      "name": "Pekahiah, King of Israel",
      "title": "Menahem's short-lived son",
      "description": "Pekahiah succeeded his father Menahem and reigned two years in Samaria (c. 742–740 BC), continuing Jeroboam's sins (2 Kings 15:23–24). His own captain Pekah son of Remaliah, with fifty men of Gilead, assassinated him in the palace (15:25).",
      "chapters": []
    },
    {
      "id": "pekah",
      "name": "Pekah son of Remaliah",
      "title": "The anti-Assyrian usurper",
      "description": "A military captain, Pekah killed Pekahiah and ruled Israel (2 Kings 15:25–27); his twenty years are best counted from c. 752 BC, perhaps as a rival ruler in Gilead, with sole rule c. 740–732 BC. Allied with Rezin of Damascus, he attacked Judah to force it into an anti-Assyrian coalition — the Syro-Ephraimite War of Isaiah 7 (2 Kings 15:37; 16:5). Tiglath-pileser III stripped Galilee and Gilead in his reign, and Hoshea assassinated him (15:29–30); Assyrian records say the Israelites overthrew 'Paqaha' their king.",
      "chapters": []
    },
    {
      "id": "jotham",
      "name": "Jotham, King of Judah",
      "title": "Builder of the temple's high gate",
      "description": "Son of Azariah (Uzziah), Jotham governed Judah while his father was a leper and then reigned in his own right, sixteen years in all (c. 750–735 BC, counting co-regency) (2 Kings 15:5, 32–33). He did what was right, though the high places remained, and built the higher gate of the house of the LORD (15:34–35). In his days the LORD began to send Rezin and Pekah against Judah (15:37).",
      "chapters": []
    },
    {
      "id": "ahaz",
      "name": "Ahaz, King of Judah",
      "title": "The king who became Assyria's servant",
      "description": "Son of Jotham, Ahaz reigned sixteen years in Jerusalem (c. 735–715 BC) and walked in the ways of Israel's kings, even making his son pass through the fire (2 Kings 16:1–4). Attacked by Rezin and Pekah, he ignored Isaiah's call to trust the LORD (Isaiah 7) and bought Tiglath-pileser's help with temple treasure, calling himself 'thy servant and thy son' (16:7–8). He copied a Damascus altar for the temple and dismantled Solomon's bronze furnishings 'for the king of Assyria' (16:10–18); Assyrian records call him Jehoahaz of Judah.",
      "chapters": []
    },
    {
      "id": "hoshea",
      "name": "Hoshea, King of Israel",
      "title": "The last king of Israel",
      "description": "Hoshea son of Elah assassinated Pekah and became Israel's final king (c. 732–722 BC), installed with Tiglath-pileser III's backing according to Assyrian records (2 Kings 15:30). He did evil, though not as the kings before him, and became Shalmaneser's vassal, but rebelled by seeking help from So king of Egypt and withholding tribute (17:1–4). Shalmaneser imprisoned him and besieged Samaria for three years until the city fell and Israel was carried into exile (17:4–6).",
      "chapters": []
    },
    {
      "id": "rezin",
      "name": "Rezin, King of Syria",
      "title": "The last king of Aram-Damascus",
      "description": "Rezin ruled Aram from Damascus (c. 750–732 BC) and led the anti-Assyrian coalition with Pekah of Israel, besieging Jerusalem and taking Elath from Judah (2 Kings 15:37; 16:5–6). When Ahaz appealed to Assyria, Tiglath-pileser III captured Damascus, deported its people to Kir, and killed Rezin (16:9). Assyrian annals name him 'Rahianu' and describe the siege of his capital.",
      "chapters": []
    },
    {
      "id": "tiglath-pileser",
      "name": "Tiglath-pileser III (Pul)",
      "title": "Founder of Assyria's empire",
      "description": "Tiglath-pileser III (745–727 BC), called Pul in 2 Kings 15:19 after his Babylonian throne name, turned Assyria into a standing empire with professional armies and mass deportations. He took tribute from Menahem, stripped Galilee and Gilead from Pekah (15:29), captured Damascus and killed Rezin (16:9), and received Ahaz of Judah as a vassal (16:7–10). His annals and the Nimrud palace reliefs name Menahem, Pekah, Hoshea, Rezin, and Ahaz.",
      "chapters": []
    },
    {
      "id": "shalmaneser-v",
      "name": "Shalmaneser V",
      "title": "The Assyrian king who besieged Samaria",
      "description": "Son of Tiglath-pileser III, Shalmaneser V reigned 727–722 BC and made Hoshea his vassal (2 Kings 17:3). When Hoshea rebelled and turned to Egypt, Shalmaneser imprisoned him and besieged Samaria for three years (17:4–5; 18:9–10). The Babylonian Chronicle credits him with ravaging Samaria, though his successor Sargon II later claimed the conquest and carried out the deportation.",
      "chapters": []
    },
    {
      "id": "hezekiah",
      "name": "Hezekiah",
      "title": "The king who trusted the LORD",
      "description": "Son of the idolatrous Ahaz, Hezekiah reigned over Judah c. 715–686 BC (possibly as co-regent from 729), and Kings says no king before or after trusted the Lord like him (2 Kings 18:5). He removed the high places, broke up Moses' bronze serpent, rebelled against Assyria, and when Sennacherib's army surrounded Jerusalem in 701 BC he spread the Assyrian letter before the Lord and was delivered. He was healed from a mortal illness and given fifteen more years, but proudly showed his treasures to Babylonian envoys. His name survives on a royal bulla from the Ophel and in Sennacherib's annals, and his tunnel still carries water under the City of David.",
      "chapters": []
    },
    {
      "id": "isaiah",
      "name": "Isaiah son of Amoz",
      "title": "Prophet to Hezekiah",
      "description": "The great prophet of Jerusalem, whose ministry spanned the reigns of Uzziah to Hezekiah (Isaiah 1:1). In 2 Kings he assures Hezekiah that Sennacherib will not shoot an arrow into the city, delivers the oracle that God will put His hook in Assyria's nose, announces and then reverses Hezekiah's death sentence, and foretells the Babylonian exile. Chapters 36–39 of his book closely parallel 2 Kings 18–20, and a bulla reading 'Isaiah nvy[...]' found near Hezekiah's on the Ophel may bear his name.",
      "chapters": []
    },
    {
      "id": "sennacherib",
      "name": "Sennacherib",
      "title": "King of Assyria",
      "description": "Sennacherib ruled Assyria 705–681 BC and built a vast palace at Nineveh, where reliefs of his capture of Lachish lined the walls. In 701 BC he devastated Judah's fortified cities and demanded Jerusalem's surrender, but after the angel of the Lord struck his camp he returned home, his annals claiming only that he shut Hezekiah up 'like a bird in a cage.' He was assassinated by his sons while worshipping his god, and Esarhaddon succeeded him.",
      "chapters": []
    },
    {
      "id": "rabshakeh",
      "name": "The Rabshakeh",
      "title": "Sennacherib's field commander and spokesman",
      "description": "Rabshakeh is an Assyrian title, 'chief cupbearer,' for a high officer sent with the Tartan and the Rabsaris from Lachish to demand Jerusalem's surrender. Speaking Hebrew loudly so the soldiers on the wall could hear, he mocked Egypt as a bruised reed, twisted Hezekiah's reforms, and claimed no god could deliver from Assyria — words Hezekiah carried to the Lord as reproach against the living God.",
      "chapters": []
    },
    {
      "id": "merodach-baladan",
      "name": "Merodach-baladan",
      "title": "King of Babylon who courted Hezekiah",
      "description": "Marduk-apla-iddina II, a Chaldean chieftain who seized Babylon and held it against Assyria from 722 to 710 BC and again briefly around 703. He sent letters and a gift to Hezekiah after his illness, likely seeking an ally against Assyria, and Hezekiah's display of his treasures to the envoys prompted Isaiah's prophecy of exile to Babylon.",
      "chapters": []
    },
    {
      "id": "manasseh",
      "name": "Manasseh",
      "title": "Judah's longest-reigning and most wicked king",
      "description": "Hezekiah's son, Manasseh reigned fifty-five years (c. 697–642 BC, including a co-regency), undoing his father's reforms with Baal altars, star worship in the temple courts, child sacrifice, and sorcery, and filling Jerusalem with innocent blood. Kings names his sins as the reason judgment on Judah became irreversible (2 Kings 21:11–15; 23:26; 24:3–4). Assyrian inscriptions of Esarhaddon and Ashurbanipal list him as a tribute-paying vassal, and 2 Chronicles 33 records his captivity and late repentance.",
      "chapters": []
    },
    {
      "id": "amon",
      "name": "Amon",
      "title": "Manasseh's son, murdered after two years",
      "description": "Amon reigned two years (c. 642–640 BC) and walked in all the idolatry of his father Manasseh. His own servants conspired and killed him in his house, but the people of the land executed the conspirators and set his eight-year-old son Josiah on the throne.",
      "chapters": []
    },
    {
      "id": "josiah",
      "name": "Josiah",
      "title": "The reforming king named in advance",
      "description": "Josiah reigned c. 640–609 BC, a king named three centuries ahead by the man of God at Bethel (1 Kings 13:2). When the book of the law was found during temple repairs in 622 BC, he tore his clothes, renewed the covenant, purged idolatry from Jerusalem to Bethel, and kept a Passover unmatched since the judges; Kings says no king turned to the Lord with all his heart, soul, and might like him. He died at Megiddo in 609 BC trying to stop Pharaoh Neco's march to aid Assyria.",
      "chapters": []
    },
    {
      "id": "hilkiah",
      "name": "Hilkiah",
      "title": "High priest who found the book of the law",
      "description": "The high priest under Josiah, Hilkiah found the book of the law in the house of the Lord during the temple repairs of 622 BC and handed it to Shaphan the scribe. He led the delegation to Huldah the prophetess and carried out the king's orders to remove Baal's vessels from the temple.",
      "chapters": []
    },
    {
      "id": "huldah",
      "name": "Huldah",
      "title": "The prophetess Josiah consulted",
      "description": "A prophetess living in the 'second quarter' of Jerusalem, wife of Shallum the keeper of the wardrobe. When Josiah's officials brought the newly found book of the law, she confirmed that its curses would fall on Judah but told the tender-hearted king he would be gathered to his grave in peace before the disaster came.",
      "chapters": []
    },
    {
      "id": "pharaoh-neco",
      "name": "Pharaoh Neco",
      "title": "King of Egypt who killed Josiah",
      "description": "Neco II of Egypt's 26th Dynasty (610–595 BC) marched north in 609 BC to support the collapsing Assyrian remnant against Babylon and killed Josiah at Megiddo. He deposed Jehoahaz at Riblah, imposed tribute on Judah, and made Eliakim king as Jehoiakim, but after his defeat by Nebuchadnezzar at Carchemish in 605 BC Egypt came no more out of its land.",
      "chapters": []
    },
    {
      "id": "jehoahaz-judah",
      "name": "Jehoahaz (King of Judah)",
      "title": "Josiah's son, deposed after three months",
      "description": "Also called Shallum (Jeremiah 22:11), Jehoahaz was made king by the people of the land after Josiah's death in 609 BC. After only three months Pharaoh Neco put him in bands at Riblah and carried him to Egypt, where he died — the first king of Judah to die in exile.",
      "chapters": []
    },
    {
      "id": "jehoiakim",
      "name": "Jehoiakim",
      "title": "Egypt's puppet who rebelled against Babylon",
      "description": "Born Eliakim, Josiah's son was installed by Pharaoh Neco and renamed Jehoiakim, reigning 609–598 BC. He taxed the land to pay Egypt, then submitted to Nebuchadnezzar for three years before rebelling, bringing raiding bands against Judah. Jeremiah 36 records him cutting up and burning Jeremiah's scroll; he died just before Babylon's siege of 597 BC.",
      "chapters": []
    },
    {
      "id": "jehoiachin",
      "name": "Jehoiachin",
      "title": "The exiled king lifted up in Babylon",
      "description": "Jehoiakim's son, also called Jeconiah or Coniah, reigned three months before surrendering Jerusalem to Nebuchadnezzar in March 597 BC and going into exile with his mother, officials, and craftsmen. Babylonian ration tablets list oil for 'Ya'u-kinu king of Yahudu' and his sons, and in 561/560 BC Evil-merodach released him from prison and gave him a seat at his table for life. Through him the line of David continued (1 Chronicles 3:17; Matthew 1:12).",
      "chapters": []
    },
    {
      "id": "zedekiah",
      "name": "Zedekiah",
      "title": "Judah's last king",
      "description": "Born Mattaniah, Josiah's youngest son was set on the throne by Nebuchadnezzar in 597 BC and renamed Zedekiah. Wavering between Jeremiah's counsel and pro-Egyptian officials, he rebelled against Babylon, and after an eighteen-month siege Jerusalem fell in 586 BC. Captured in the plains of Jericho, he saw his sons killed at Riblah before he was blinded and taken to Babylon in chains.",
      "chapters": []
    },
    {
      "id": "nebuchadnezzar",
      "name": "Nebuchadnezzar",
      "title": "King of Babylon who destroyed Jerusalem",
      "description": "Nebuchadnezzar II ruled Babylon 605–562 BC after defeating Egypt at Carchemish. He took Jerusalem in 597 BC, deporting Jehoiachin and the city's leaders, and after Zedekiah's revolt destroyed the city and temple in 586 BC through his captain Nebuzaradan. His building inscriptions survive by the thousands on Babylon's bricks, and the Babylonian Chronicle records his campaigns against 'the city of Judah.'",
      "chapters": []
    },
    {
      "id": "gedaliah",
      "name": "Gedaliah son of Ahikam",
      "title": "Governor of Judah after the fall",
      "description": "Grandson of Shaphan the scribe and son of Ahikam, who had protected Jeremiah, Gedaliah was appointed by Nebuchadnezzar to govern the remnant from Mizpah. He urged the people to serve Babylon and live, but within months Ishmael son of Nethaniah, of the royal seed, murdered him, and the survivors fled to Egypt. A bulla from Lachish of 'Gedaliah who is over the house' may be his, though the identification is uncertain.",
      "chapters": []
    },
    {
      "id": "evil-merodach",
      "name": "Evil-merodach",
      "title": "King of Babylon who freed Jehoiachin",
      "description": "Amel-Marduk ('man of Marduk'), son of Nebuchadnezzar, reigned briefly over Babylon from 562 to 560 BC before being assassinated by his brother-in-law Neriglissar. In the year he began to reign he released Jehoiachin from prison, spoke kindly to him, and gave him a place at his table and a daily allowance — the last scene of Kings.",
      "chapters": []
    }
  ];
  if (!Array.isArray(window.CHARACTERS)) window.CHARACTERS = [];
  Array.prototype.push.apply(window.CHARACTERS, add);
})();
