// data/kings1-characters.js — people first met in 1 Kings, appended to window.CHARACTERS.
// `chapters` (1 Samuel refs) stays empty; `kings1` refs are indexed from window.KINGS1
// by data/kings1-world.js.

(function () {
  var add = [
    {
      "id": "solomon",
      "name": "Solomon",
      "title": "King of Israel, son of David",
      "description": "Son of David and Bathsheba, named Jedidiah ('beloved of the LORD') by Nathan, Solomon is anointed at Gihon while his brother Adonijah tries to seize the throne, and he secures his reign by removing Adonijah, Joab, and Shimei. At Gibeon he asks God for an understanding heart and receives wisdom, riches, and honour; he builds the temple in seven years, dedicates it with a great prayer, and presides over Israel's golden age of trade, building, and international fame. In old age his many foreign wives turn his heart to other gods, and God announces that the kingdom will be torn from his son, leaving only one tribe for David's sake.",
      "chapters": []
    },
    {
      "id": "adonijah",
      "name": "Adonijah",
      "title": "Son of David, rival claimant to the throne",
      "description": "David's fourth son, born at Hebron to Haggith, handsome and never disciplined by his father, Adonijah declares himself king as David lies dying, backed by Joab and Abiathar. When Solomon is anointed instead, he flees to the horns of the altar and is spared on condition of good behavior. His later request, through Bathsheba, to marry David's nurse Abishag is read by Solomon as a renewed claim on the throne, and Benaiah executes him.",
      "chapters": []
    },
    {
      "id": "abishag",
      "name": "Abishag the Shunammite",
      "title": "Young woman who attended the aged King David",
      "description": "A beautiful young woman from Shunem, Abishag is brought to warm and serve King David in his last days, though the king does not know her. She is present when Bathsheba pleads for Solomon's succession. After David's death Adonijah asks to marry her, a request Solomon treats as a bid for the crown, which costs Adonijah his life.",
      "chapters": []
    },
    {
      "id": "benaiah",
      "name": "Benaiah son of Jehoiada",
      "title": "Captain of David's guard, commander of Solomon's army",
      "description": "A valiant warrior from Kabzeel who commanded David's Cherethites and Pelethites, Benaiah stands with Nathan and Zadok for Solomon and escorts him to his anointing at Gihon. At Solomon's command he executes Adonijah, Joab at the altar, and finally Shimei. He is rewarded with Joab's post as commander over the host of Israel.",
      "chapters": []
    },
    {
      "id": "abiathar",
      "name": "Abiathar",
      "title": "Priest of David, last of Eli's line to serve",
      "description": "The lone survivor of Saul's massacre of the priests at Nob, Abiathar served David faithfully through his years as a fugitive and during Absalom's revolt. In David's old age he backs Adonijah's bid for the throne. Solomon spares his life for his past loyalty but banishes him to his fields at Anathoth, fulfilling the word spoken against the house of Eli at Shiloh.",
      "chapters": []
    },
    {
      "id": "hiram",
      "name": "Hiram",
      "title": "King of Tyre, ally of David and Solomon",
      "description": "The Phoenician king of Tyre who had loved David, Hiram (Hiram I in extra-biblical sources) supplies Solomon with cedar and fir from Lebanon and skilled workmen for the temple in exchange for wheat and oil. He is unimpressed by the twenty Galilean cities Solomon gives him, calling them 'Cabul.' His experienced sailors join Solomon's fleet from Ezion-geber, bringing gold from Ophir and treasures on the ships of Tarshish.",
      "chapters": []
    },
    {
      "id": "queen-of-sheba",
      "name": "The Queen of Sheba",
      "title": "Queen of a South Arabian trading kingdom",
      "description": "Hearing of Solomon's fame concerning the name of the Lord, the queen of Sheba travels to Jerusalem with a great caravan of spices, gold, and precious stones to test him with hard questions. Overwhelmed by his wisdom and the splendor of his court, she declares that 'the half was not told me' and blesses the Lord God of Israel. After exchanging lavish gifts, she returns to her own land; Jesus later holds her up as a Gentile who came from the ends of the earth to hear wisdom (Matthew 12:42).",
      "chapters": []
    },
    {
      "id": "hadad-edomite",
      "name": "Hadad the Edomite",
      "title": "Edomite prince, adversary of Solomon",
      "description": "Of the royal seed of Edom, Hadad escaped as a child to Egypt when Joab slaughtered Edom's males in David's day. Pharaoh gave him a house, land, and the sister of Queen Tahpenes as his wife, and his son Genubath was raised among Pharaoh's sons. Hearing that David and Joab were dead, he returned to become one of the adversaries God raised up against Solomon.",
      "chapters": []
    },
    {
      "id": "rezon",
      "name": "Rezon son of Eliadah",
      "title": "Aramean rebel, king in Damascus",
      "description": "Rezon fled from his master Hadadezer king of Zobah after David's victories and gathered a band of men around him. He seized Damascus and reigned there, becoming an adversary to Israel all the days of Solomon. His kingdom laid the foundation for the powerful Aramean state of Damascus that would trouble Israel for generations.",
      "chapters": []
    },
    {
      "id": "jeroboam",
      "name": "Jeroboam son of Nebat",
      "title": "Solomon's official, future first king of northern Israel",
      "description": "An Ephraimite from Zereda and a mighty man of valour, Jeroboam is appointed by Solomon over the forced labor of the house of Joseph while building the Millo. The prophet Ahijah meets him on the road, tears a new garment into twelve pieces, and gives him ten, promising him a lasting dynasty if he obeys God as David did. Solomon seeks his life, and Jeroboam flees to Shishak king of Egypt until Solomon's death, poised to lead the northern tribes away from David's house.",
      "chapters": []
    },
    {
      "id": "ahijah",
      "name": "Ahijah the Shilonite",
      "title": "Prophet of Shiloh",
      "description": "A prophet from Shiloh, the old sanctuary town of Eli and Samuel, Ahijah announces God's judgment on Solomon's idolatry through a vivid sign: he tears his new garment into twelve pieces and gives ten to Jeroboam, declaring that the Lord will give him ten tribes. He promises Jeroboam an enduring house on the condition of obedience, while one tribe remains to David's line for David's sake and for Jerusalem.",
      "chapters": []
    },
    {
      "id": "rehoboam",
      "name": "Rehoboam",
      "title": "Solomon's son, first king of Judah after the split",
      "description": "Rehoboam inherited Solomon's throne and lost ten tribes in a single meeting at Shechem by rejecting the elders' advice and threatening to make the people's yoke heavier. Prevented by the prophet Shemaiah from waging war to reclaim the north, he reigned seventeen years in Jerusalem while Judah filled with high places and idols. In his fifth year Shishak of Egypt plundered the Temple and palace, and Rehoboam replaced Solomon's golden shields with bronze — a fitting symbol of his diminished reign.",
      "chapters": []
    },
    {
      "id": "man-of-god-judah",
      "name": "The Man of God from Judah",
      "title": "Unnamed prophet who cursed the Bethel altar",
      "description": "Sent from Judah to Bethel, this unnamed prophet boldly denounced Jeroboam's altar, predicted Josiah by name, and saw his word confirmed when the altar split and the king's hand withered. He refused the king's hospitality but was deceived by an old prophet's lie into disobeying God's command not to eat or drink there. Killed by a lion on the way home, he was buried in Bethel, and three centuries later Josiah spared his tomb when he fulfilled the prophecy.",
      "chapters": []
    },
    {
      "id": "old-prophet-bethel",
      "name": "The Old Prophet of Bethel",
      "title": "Deceiver who became a mourner",
      "description": "An aged prophet living in Bethel who lied to the man of God from Judah, claiming an angel had told him to bring him home for a meal. God then spoke through him to pronounce the younger prophet's death for disobedience. After the lion killed him, the old prophet buried the man of God in his own tomb, mourned him as a brother, and asked to be laid beside him — affirming that the word against Bethel's altar would surely come to pass.",
      "chapters": []
    },
    {
      "id": "shishak",
      "name": "Shishak",
      "title": "Pharaoh of Egypt (Sheshonq I)",
      "description": "Founder of Egypt's 22nd (Libyan) Dynasty, Shishak had sheltered Jeroboam when he fled from Solomon. In Rehoboam's fifth year (c. 925 BC) he invaded Judah and Israel, carrying off the treasures of the Temple and palace, including Solomon's golden shields. His campaign is independently recorded in the list of conquered towns on the Bubastite Portal at Karnak.",
      "chapters": []
    },
    {
      "id": "abijam",
      "name": "Abijam",
      "title": "Second king of Judah after the division",
      "description": "Rehoboam's son (called Abijah in Chronicles), Abijam reigned only about three years in Jerusalem and walked in all the sins of his father. His heart was not perfect with the Lord as David's had been. Yet the narrator notes that God kept a lamp burning in Jerusalem for David's sake, passing the throne to his son Asa.",
      "chapters": []
    },
    {
      "id": "asa",
      "name": "Asa",
      "title": "Reforming king of Judah",
      "description": "Asa reigned forty-one years and did what was right like David, expelling cult prostitutes, removing idols, and deposing his own grandmother Maachah for her Asherah image. When Baasha of Israel fortified Ramah against him, Asa emptied the Temple treasury to hire Ben-hadad of Damascus, forcing Baasha to withdraw, and used Ramah's stones to fortify Geba and Mizpah. Though the high places remained and he leaned on a foreign alliance, his heart is described as perfect with the Lord all his days.",
      "chapters": []
    },
    {
      "id": "baasha",
      "name": "Baasha",
      "title": "Usurper king of Israel",
      "description": "Baasha of the tribe of Issachar assassinated Nadab at Gibbethon, seized Israel's throne, and exterminated the house of Jeroboam in fulfillment of Ahijah's prophecy. Yet he walked in Jeroboam's sins and fought Asa of Judah throughout his reign, retreating from Ramah only when Damascus attacked his northern cities. The prophet Jehu son of Hanani pronounced the same doom on his house that had fallen on Jeroboam's.",
      "chapters": []
    },
    {
      "id": "nadab",
      "name": "Nadab",
      "title": "Jeroboam's son, second king of Israel",
      "description": "Nadab succeeded his father Jeroboam and reigned barely two years, continuing his father's sins. While leading Israel's siege of the Philistine town of Gibbethon, he was assassinated by Baasha. His death ended Jeroboam's dynasty exactly as Ahijah had foretold.",
      "chapters": []
    },
    {
      "id": "elah-king",
      "name": "Elah",
      "title": "Baasha's son, king of Israel",
      "description": "Elah reigned about two years in Tirzah after his father Baasha. While he was drinking himself drunk in the house of his steward Arza, his chariot commander Zimri murdered him. Zimri then wiped out Baasha's entire family, fulfilling the word of the prophet Jehu.",
      "chapters": []
    },
    {
      "id": "zimri",
      "name": "Zimri",
      "title": "Seven-day king of Israel",
      "description": "A commander of half of Israel's chariots, Zimri assassinated King Elah and destroyed the house of Baasha. His reign lasted only seven days: the army at Gibbethon proclaimed Omri king and besieged Tirzah. Seeing the city taken, Zimri burned the royal citadel over himself, and his name became a byword for treachery (2 Kings 9:31).",
      "chapters": []
    },
    {
      "id": "omri",
      "name": "Omri",
      "title": "Army commander turned dynasty founder",
      "description": "Proclaimed king by the army at Gibbethon, Omri defeated Zimri and, after a four-year struggle, the rival claimant Tibni. He bought the hill of Samaria and built Israel's enduring capital there, and outside records — the Mesha Stele and Assyrian texts calling Israel 'the House of Omri' — show he was a major regional power. The Bible judges him worse than all before him and gives him only a few verses, but his dynasty, through Ahab, would shape Israel for forty years.",
      "chapters": []
    },
    {
      "id": "ahab",
      "name": "Ahab",
      "title": "King of Israel, son of Omri",
      "description": "Ahab reigned twenty-two years in Samaria (c. 874–853 BC), married the Sidonian princess Jezebel, and made Baal worship official, building a temple to Baal in his capital. He witnessed God's fire on Carmel and won two victories over Syria, yet spared Ben-hadad, coveted and seized Naboth's vineyard, and hated the prophets who told him the truth. Though he briefly humbled himself after Elijah's rebuke, he died at Ramoth-gilead from an arrow drawn at a venture, just as Micaiah had warned; Assyrian records show him as a major military power at Qarqar in 853 BC.",
      "chapters": []
    },
    {
      "id": "jezebel",
      "name": "Jezebel",
      "title": "Queen of Israel, daughter of the king of Sidon",
      "description": "Daughter of Ethbaal, priest-king of the Sidonians, Jezebel married Ahab and zealously promoted the worship of Baal and Asherah, feeding hundreds of their prophets and hunting down the Lord's prophets. After Carmel she vowed to kill Elijah, sending him fleeing into the wilderness. She engineered Naboth's judicial murder with forged letters sealed in Ahab's name, and Elijah prophesied that dogs would eat her by the wall of Jezreel.",
      "chapters": []
    },
    {
      "id": "elijah",
      "name": "Elijah",
      "title": "The Tishbite, prophet of fire",
      "description": "Elijah from Tishbe in Gilead burst onto the scene announcing a drought against Ahab's Baal worship, then was sustained by ravens at Cherith and by a widow's endless flour and oil in Zarephath, where he raised her son. On Mount Carmel he called down fire from heaven and brought Israel to its knees crying 'The LORD, he is the God.' Afterwards he fled Jezebel in despair, met God in a still small voice at Horeb, called Elisha as his successor, and later confronted Ahab over Naboth's murder.",
      "chapters": []
    },
    {
      "id": "widow-zarephath",
      "name": "The Widow of Zarephath",
      "title": "Phoenician widow who fed Elijah",
      "description": "A widow in Zarephath, near Sidon, who was preparing a final meal for herself and her son when Elijah asked her to feed him first. Trusting his promise, she did so, and her flour and oil never ran out through the drought. When her son died, Elijah restored him to life, and she confessed that the Lord's word in his mouth was truth; Jesus later pointed to her as an example of God's grace to outsiders (Luke 4:25–26).",
      "chapters": []
    },
    {
      "id": "obadiah",
      "name": "Obadiah",
      "title": "Ahab's palace steward",
      "description": "Obadiah, who 'feared the LORD greatly,' served as governor of Ahab's household while secretly hiding a hundred prophets in two caves and feeding them during Jezebel's purge. Sent out by Ahab to search for grass during the drought, he met Elijah and, after fearful protest, carried the message that set up the contest on Carmel. He shows faithfulness lived out quietly within a hostile royal court.",
      "chapters": []
    },
    {
      "id": "elisha",
      "name": "Elisha",
      "title": "Son of Shaphat, Elijah's successor",
      "description": "Elisha was plowing with twelve yoke of oxen at Abel-meholah when Elijah cast his mantle over him. He asked only to kiss his parents goodbye, then slaughtered his oxen, burned the plow to cook them, fed the people, and followed Elijah as his servant. His great ministry of miracles unfolds in 2 Kings.",
      "chapters": []
    },
    {
      "id": "ben-hadad",
      "name": "Ben-hadad",
      "title": "King of Aram-Damascus",
      "description": "'Ben-hadad' ('son of Hadad') names more than one Aramean king: in chapter 15, Ben-hadad son of Tabrimon took Asa's bribe and ravaged northern Israel, while the Ben-hadad of chapter 20 (often identified with Hadadezer of Assyrian records) besieged Samaria with thirty-two allied kings. Twice defeated by Ahab, at Samaria and at Aphek, he surrendered in sackcloth and was freed under a trade treaty. His release brought a prophet's sentence on Ahab, and Aram remained Israel's chief rival for decades.",
      "chapters": []
    },
    {
      "id": "naboth",
      "name": "Naboth",
      "title": "The Jezreelite who would not sell",
      "description": "Naboth owned a vineyard beside Ahab's palace in Jezreel and refused to sell or trade it, because it was the inheritance of his fathers under God's law. Jezebel arranged a false charge of blasphemy and treason, and he was stoned outside the city so Ahab could seize the land. His innocent blood brought Elijah's prophecy of doom on Ahab's house, fulfilled in 2 Kings 9.",
      "chapters": []
    },
    {
      "id": "micaiah",
      "name": "Micaiah",
      "title": "Son of Imlah, the lone true prophet",
      "description": "Micaiah was the prophet Ahab hated because he never prophesied good concerning him. Pressed to agree with four hundred court prophets, he instead described Israel scattered like sheep without a shepherd and a lying spirit sent to deceive Ahab. Struck by Zedekiah and imprisoned on bread and water, he staked his credibility on Ahab's death — which came that very day at Ramoth-gilead.",
      "chapters": []
    },
    {
      "id": "jehoshaphat",
      "name": "Jehoshaphat",
      "title": "Son of Asa, king of Judah",
      "description": "Jehoshaphat reigned twenty-five years in Jerusalem, walking in the ways of his father Asa and doing right in the Lord's sight, though the high places remained. He made peace with Israel and joined Ahab's campaign against Ramoth-gilead, but insisted on hearing a true prophet of the Lord and barely escaped death when the Syrians mistook him for Ahab. He also attempted a trading fleet to Ophir, but his ships were wrecked at Ezion-geber.",
      "chapters": []
    }
  ];
  if (!Array.isArray(window.CHARACTERS)) window.CHARACTERS = [];
  Array.prototype.push.apply(window.CHARACTERS, add);
})();
