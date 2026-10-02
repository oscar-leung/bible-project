// data/kings1-quiz.js — one question per chapter of 1 Kings, appended to window.QUIZ.
// Same schema as data/quiz.js with book: "kings1".

(function () {
  var add = [
    {
      "q": "Where was Solomon anointed king while Adonijah held his own feast at En-rogel?",
      "choices": [
        "At Hebron",
        "At the Gihon spring",
        "At Gibeon",
        "At the threshing floor of Araunah"
      ],
      "answer": 1,
      "chapter": 1,
      "book": "kings1",
      "explain": "David ordered Solomon to ride his own mule down to Gihon, where Zadok anointed him with the horn of oil from the tabernacle (1 Kings 1:33-39)."
    },
    {
      "q": "What request led Solomon to order Adonijah's execution?",
      "choices": [
        "To be made commander of the army",
        "To keep his chariots and runners",
        "To be given Abishag the Shunammite as his wife",
        "To serve as a priest at Gibeon"
      ],
      "answer": 2,
      "chapter": 2,
      "book": "kings1",
      "explain": "Asking for the late king's attendant was a veiled claim to the throne; Solomon replied, 'ask for him the kingdom also' (1 Kings 2:22)."
    },
    {
      "q": "What did Solomon ask God for at Gibeon?",
      "choices": [
        "An understanding heart to judge God's people",
        "Long life and riches",
        "Victory over his enemies",
        "A son to succeed him"
      ],
      "answer": 0,
      "chapter": 3,
      "book": "kings1",
      "explain": "Solomon asked for 'an understanding heart to judge thy people' (1 Kings 3:9), and God gave him riches and honour besides."
    },
    {
      "q": "What phrase describes Israel's security under Solomon in 1 Kings 4:25?",
      "choices": [
        "A land flowing with milk and honey",
        "Rest from all their enemies round about",
        "Every man in his own tent",
        "Every man under his vine and under his fig tree"
      ],
      "answer": 3,
      "chapter": 4,
      "book": "kings1",
      "explain": "Judah and Israel dwelt safely, 'every man under his vine and under his fig tree, from Dan even to Beer-sheba' (1 Kings 4:25)."
    },
    {
      "q": "What did Solomon give Hiram of Tyre in exchange for cedar and fir?",
      "choices": [
        "Gold from Ophir",
        "Horses and chariots",
        "Wheat and pure oil",
        "Twelve cities in Judah"
      ],
      "answer": 2,
      "chapter": 5,
      "book": "kings1",
      "explain": "Solomon gave Hiram twenty thousand measures of wheat and twenty measures of pure oil year by year (1 Kings 5:11)."
    },
    {
      "q": "Why was no hammer, axe, or iron tool heard at the temple site?",
      "choices": [
        "The stones were prepared at the quarry before being brought",
        "The temple was built entirely of wood",
        "Iron was forbidden by the law of Moses",
        "The work was done only at night"
      ],
      "answer": 0,
      "chapter": 6,
      "book": "kings1",
      "explain": "The house 'was built of stone made ready before it was brought thither' (1 Kings 6:7)."
    },
    {
      "q": "What were the names of the two bronze pillars at the temple porch?",
      "choices": [
        "Urim and Thummim",
        "Ebenezer and Mizpah",
        "Jedidiah and Jachin",
        "Jachin and Boaz"
      ],
      "answer": 3,
      "chapter": 7,
      "book": "kings1",
      "explain": "Hiram the craftsman set up the right pillar, Jachin, and the left pillar, Boaz (1 Kings 7:21)."
    },
    {
      "q": "What happened when the priests came out after placing the ark in the temple?",
      "choices": [
        "Fire fell and consumed the sacrifice",
        "A cloud filled the house so the priests could not minister",
        "The ark's cherubim spoke",
        "An earthquake shook Jerusalem"
      ],
      "answer": 1,
      "chapter": 8,
      "book": "kings1",
      "explain": "'The cloud filled the house of the LORD... for the glory of the LORD had filled the house' (1 Kings 8:10-11)."
    },
    {
      "q": "What name did Hiram give the twenty cities Solomon gave him in Galilee?",
      "choices": [
        "Ichabod",
        "Cabul",
        "Mahanaim",
        "Hormah"
      ],
      "answer": 1,
      "chapter": 9,
      "book": "kings1",
      "explain": "Displeased with the cities, Hiram called them 'the land of Cabul' — roughly, 'good for nothing' (1 Kings 9:13)."
    },
    {
      "q": "What did the queen of Sheba say after seeing Solomon's wisdom and court?",
      "choices": [
        "'Surely the LORD is in this place'",
        "'Thy God shall be my God'",
        "'The half was not told me'",
        "'There is none like thee in all the earth'"
      ],
      "answer": 2,
      "chapter": 10,
      "book": "kings1",
      "explain": "She admitted she had not believed the reports, 'and, behold, the half was not told me' (1 Kings 10:7)."
    },
    {
      "q": "How did the prophet Ahijah show Jeroboam that he would rule ten tribes?",
      "choices": [
        "He anointed him with oil at Bethel",
        "He broke a clay jar into ten pieces",
        "He gave him ten stones from the Jordan",
        "He tore his new garment into twelve pieces and gave him ten"
      ],
      "answer": 3,
      "chapter": 11,
      "book": "kings1",
      "explain": "Ahijah tore his new garment into twelve pieces and told Jeroboam, 'Take thee ten pieces' (1 Kings 11:30-31)."
    },
    {
      "q": "Whose advice did Rehoboam follow at Shechem when the people asked him to lighten their yoke?",
      "choices": [
        "The old men who had served Solomon",
        "The young men who had grown up with him",
        "The prophet Shemaiah",
        "His mother, the queen mother"
      ],
      "answer": 1,
      "chapter": 12,
      "book": "kings1",
      "explain": "Rehoboam rejected the elders' counsel and followed the young men, threatening to punish with scorpions (12:8–14), and the ten northern tribes broke away."
    },
    {
      "q": "What happened when Jeroboam stretched out his hand against the man of God at Bethel?",
      "choices": [
        "Fire fell from heaven on the altar",
        "The man of God was arrested",
        "A lion attacked the king's guards",
        "His hand dried up so he could not pull it back"
      ],
      "answer": 3,
      "chapter": 13,
      "book": "kings1",
      "explain": "Jeroboam's hand withered and the altar split apart (13:4–5); it was restored only when the man of God prayed for him."
    },
    {
      "q": "What did Rehoboam make to replace the golden shields that Shishak of Egypt carried away?",
      "choices": [
        "Shields of bronze (brass)",
        "Shields of silver",
        "Shields of wood covered with leather",
        "He made no replacements"
      ],
      "answer": 0,
      "chapter": 14,
      "book": "kings1",
      "explain": "Rehoboam made brasen shields in their place and kept them in the guardroom, bringing them out whenever he went to the Temple (14:27–28)."
    },
    {
      "q": "Why did Asa remove Maachah from being queen mother?",
      "choices": [
        "She conspired with Baasha against him",
        "She refused to leave Jerusalem",
        "She had made an idol in a grove (an Asherah)",
        "She hid the Temple treasures"
      ],
      "answer": 2,
      "chapter": 15,
      "book": "kings1",
      "explain": "Maachah had made an idol for a grove; Asa removed her, destroyed the image, and burned it by the brook Kidron (15:13)."
    },
    {
      "q": "How long did Zimri reign as king of Israel?",
      "choices": [
        "Three months",
        "Seven days",
        "Two years",
        "Forty days"
      ],
      "answer": 1,
      "chapter": 16,
      "book": "kings1",
      "explain": "Zimri reigned seven days in Tirzah before Omri's army besieged the city and he burned the palace over himself (16:15–18)."
    },
    {
      "q": "Who fed Elijah at the brook Cherith?",
      "choices": [
        "A widow from Zarephath",
        "Obadiah's servants",
        "An angel",
        "Ravens"
      ],
      "answer": 3,
      "chapter": 17,
      "book": "kings1",
      "explain": "The ravens brought him bread and flesh in the morning and evening, and he drank from the brook until it dried up (17:6)."
    },
    {
      "q": "What did Elijah pour over his sacrifice on Mount Carmel before praying?",
      "choices": [
        "Water — twelve barrels in three rounds",
        "Oil from the widow's cruse",
        "Wine from the king's vineyards",
        "Blood from the bullock"
      ],
      "answer": 0,
      "chapter": 18,
      "book": "kings1",
      "explain": "Elijah had four barrels of water poured three times over the offering and wood, filling the trench, before the fire of the Lord fell (18:33–38)."
    },
    {
      "q": "At Horeb, in what form did the Lord come to Elijah?",
      "choices": [
        "A great and strong wind",
        "An earthquake",
        "A still small voice",
        "A fire"
      ],
      "answer": 2,
      "chapter": 19,
      "book": "kings1",
      "explain": "The Lord was not in the wind, the earthquake, or the fire, but after the fire came a still small voice (19:11–12)."
    },
    {
      "q": "Why did the Syrians choose to fight Israel in the plain at Aphek?",
      "choices": [
        "Their chariots could not climb the hills of Samaria",
        "They believed Israel's God was a god of the hills, not the valleys",
        "Ahab had challenged them to meet there",
        "A prophet of Baal told them to"
      ],
      "answer": 1,
      "chapter": 20,
      "book": "kings1",
      "explain": "Ben-hadad's servants said Israel's gods were gods of the hills; God answered by giving Israel victory in the valley so they would know He is the Lord (20:23, 28)."
    },
    {
      "q": "Why did Naboth refuse to sell his vineyard to Ahab?",
      "choices": [
        "Ahab offered too little money",
        "Jezebel had insulted his family",
        "He planned to give it to Elijah",
        "It was the inheritance of his fathers"
      ],
      "answer": 3,
      "chapter": 21,
      "book": "kings1",
      "explain": "Naboth said, 'The LORD forbid it me, that I should give the inheritance of my fathers unto thee' (21:3), honoring God's law that family land stays in the family."
    },
    {
      "q": "How was Ahab fatally wounded at Ramoth-gilead?",
      "choices": [
        "An archer drew his bow at a venture and hit him between the joints of his armor",
        "Ben-hadad killed him in single combat",
        "His own servants turned on him",
        "His chariot overturned in the river"
      ],
      "answer": 0,
      "chapter": 22,
      "book": "kings1",
      "explain": "Though Ahab disguised himself, a Syrian archer shot 'at a venture' and struck him between the joints of the harness; he died at evening (22:34–35)."
    }
  ];
  if (!Array.isArray(window.QUIZ)) window.QUIZ = [];
  Array.prototype.push.apply(window.QUIZ, add);
})();
