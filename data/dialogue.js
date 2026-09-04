/* data/dialogue.js — window.DIALOGUE (Historian)
 * Spoken dialogue of 1 Samuel (chapters 1–31) plus 2 Samuel 1–2 ("2s1", "2s2"),
 * staged as scenes with the actual KJV words (public domain) and commentary.
 * Plain script global, no modules. Consumed by js/voices.js.
 *
 * Shape: { <chapterKey>: [ { scene, lines: [{ speaker, to?, quote, ref }], commentary } ] }
 */
window.DIALOGUE = {
  1: [
    {
      scene: "A sorrowful spirit at Shiloh",
      lines: [
        { speaker: "Elkanah", to: "Hannah", quote: "Hannah, why weepest thou? and why eatest thou not? and why is thy heart grieved? am not I better to thee than ten sons?", ref: "1 Samuel 1:8" },
        { speaker: "Hannah", to: "the LORD", quote: "O LORD of hosts, if thou wilt indeed look on the affliction of thine handmaid, and remember me, and not forget thine handmaid, but wilt give unto thine handmaid a man child, then I will give him unto the LORD all the days of his life, and there shall no razor come upon his head.", ref: "1 Samuel 1:11" },
        { speaker: "Eli", to: "Hannah", quote: "How long wilt thou be drunken? put away thy wine from thee.", ref: "1 Samuel 1:14" },
        { speaker: "Hannah", to: "Eli", quote: "No, my lord, I am a woman of a sorrowful spirit: I have drunk neither wine nor strong drink, but have poured out my soul before the LORD.", ref: "1 Samuel 1:15" },
        { speaker: "Eli", to: "Hannah", quote: "Go in peace: and the God of Israel grant thee thy petition that thou hast asked of him.", ref: "1 Samuel 1:17" }
      ],
      commentary: "Feel the sting of this scene: in ancient Israel a childless wife bore public shame, and even the high priest mistakes Hannah's silent, moving lips for a drunkard's. Her prayer is a Nazirite vow — she is offering God the very thing she wants most, before she has it. Eli's blessing changes nothing outwardly, yet Hannah rises, eats, and 'her countenance was no more sad.' The whole book of Samuel opens not with kings or armies but with one woman's whispered anguish being heard."
    },
    {
      scene: "The child is lent to the LORD",
      lines: [
        { speaker: "Hannah", to: "Eli", quote: "Oh my lord, as thy soul liveth, my lord, I am the woman that stood by thee here, praying unto the LORD. For this child I prayed; and the LORD hath given me my petition which I asked of him: Therefore also I have lent him to the LORD; as long as he liveth he shall be lent to the LORD.", ref: "1 Samuel 1:26–28" }
      ],
      commentary: "Hannah returns to Shiloh with the weaned boy — perhaps three years old — and hands him over to the very priest who once accused her. The Hebrew plays on Samuel's name and the verb 'to ask': the asked-for child is given back. A hearer would catch the staggering cost — she will see him once a year, bringing a little coat. Out of this open hand comes the prophet who will anoint Israel's first two kings."
    }
  ],
  2: [
    {
      scene: "Hannah's song of reversal",
      lines: [
        { speaker: "Hannah", quote: "My heart rejoiceth in the LORD, mine horn is exalted in the LORD: my mouth is enlarged over mine enemies; because I rejoice in thy salvation. There is none holy as the LORD: for there is none beside thee: neither is there any rock like our God.", ref: "1 Samuel 2:1–2" },
        { speaker: "Hannah", quote: "The LORD killeth, and maketh alive: he bringeth down to the grave, and bringeth up. The LORD maketh poor, and maketh rich: he bringeth low, and lifteth up.", ref: "1 Samuel 2:6–7" }
      ],
      commentary: "The once-voiceless woman now sings theology that frames the whole book: God topples the mighty and raises the lowly. Her song even ends looking ahead to 'his king' and 'his anointed' — sung before Israel had any king at all. Centuries later Mary of Nazareth will echo these very cadences in the Magnificat. Hannah's private answered prayer has become a nation's prophecy."
    },
    {
      scene: "Eli confronts his sons",
      lines: [
        { speaker: "Eli", to: "Hophni and Phinehas", quote: "Why do ye such things? for I hear of your evil dealings by all this people. Nay, my sons; for it is no good report that I hear: ye make the LORD's people to transgress.", ref: "1 Samuel 2:23–24" },
        { speaker: "Man of God", to: "Eli", quote: "Wherefore kick ye at my sacrifice and at mine offering, which I have commanded in my habitation; and honourest thy sons above me? … for them that honour me I will honour, and they that despise me shall be lightly esteemed.", ref: "1 Samuel 2:29–30" }
      ],
      commentary: "Eli's sons were seizing sacrificial meat by force and lying with the women who served at the tabernacle door — clergy corruption at the nation's one sanctuary. Eli's rebuke is words without action; he never removes them. The anonymous prophet's verdict, 'them that honour me I will honour,' is the hinge of the chapter: God will not be propped up by a priesthood that despises him. Meanwhile, in a quiet refrain, 'the child Samuel grew before the LORD.'"
    }
  ],
  3: [
    {
      scene: "Speak; for thy servant heareth",
      lines: [
        { speaker: "The LORD", to: "Samuel", quote: "Samuel, Samuel.", ref: "1 Samuel 3:10" },
        { speaker: "Samuel", to: "Eli", quote: "Here am I; for thou calledst me.", ref: "1 Samuel 3:5" },
        { speaker: "Eli", to: "Samuel", quote: "Go, lie down: and it shall be, if he call thee, that thou shalt say, Speak, LORD; for thy servant heareth.", ref: "1 Samuel 3:9" },
        { speaker: "Samuel", to: "the LORD", quote: "Speak; for thy servant heareth.", ref: "1 Samuel 3:10" },
        { speaker: "Eli", to: "Samuel", quote: "What is the thing that the LORD hath said unto thee? I pray thee hide it not from me: God do so to thee, and more also, if thou hide any thing from me of all the things that he said unto thee.", ref: "1 Samuel 3:17" },
        { speaker: "Eli", quote: "It is the LORD: let him do what seemeth him good.", ref: "1 Samuel 3:18" }
      ],
      commentary: "'The word of the LORD was precious in those days; there was no open vision' — so when a voice calls in the night, neither the boy nor the old priest expects God. Three times Samuel pads to Eli's bedside before Eli perceives what is happening; there is gentle comedy here, and then dread, for the message is Eli's own doom. The boy lies awake till morning afraid to tell, and the old man's answer — 'It is the LORD' — is the most dignified moment of his life. From this night on, all Israel from Dan to Beersheba knows a prophet has been raised up."
    }
  ],
  4: [
    {
      scene: "The ark taken, the glory departed",
      lines: [
        { speaker: "Philistines", quote: "Woe unto us! who shall deliver us out of the hand of these mighty Gods? these are the Gods that smote the Egyptians with all the plagues in the wilderness. Be strong, and quit yourselves like men, O ye Philistines, that ye be not servants unto the Hebrews, as they have been to you: quit yourselves like men, and fight.", ref: "1 Samuel 4:8–9" },
        { speaker: "Messenger", to: "Eli", quote: "Israel is fled before the Philistines, and there hath been also a great slaughter among the people, and thy two sons also, Hophni and Phinehas, are dead, and the ark of God is taken.", ref: "1 Samuel 4:17" },
        { speaker: "Wife of Phinehas", quote: "The glory is departed from Israel: for the ark of God is taken.", ref: "1 Samuel 4:21–22" }
      ],
      commentary: "Israel drags the ark to battle like a talisman, and the shout that shakes the earth terrifies the Philistines — who then fight harder out of sheer desperation. The messenger's report builds to its worst word last, and it is at 'the ark of God is taken' that ninety-eight-year-old Eli falls backward and dies. A dying mother names her newborn Ichabod, 'no glory.' The chapter's terrible lesson: God will not be carried into battle as a good-luck charm by a people who ignore him."
    }
  ],
  5: [
    {
      scene: "Dagon on his face",
      lines: [
        { speaker: "Men of Ashdod", quote: "The ark of the God of Israel shall not abide with us: for his hand is sore upon us, and upon Dagon our god.", ref: "1 Samuel 5:7" },
        { speaker: "Ekronites", quote: "They have brought about the ark of the God of Israel to us, to slay us and our people.", ref: "1 Samuel 5:10" }
      ],
      commentary: "The Philistines set the captured ark in Dagon's temple as a war trophy — the standard ancient way of saying 'our god beat yours.' Twice they find Dagon prostrate before the ark, the second time with head and hands broken off on the threshold, the posture of a defeated soldier. What Israel's army could not do, the ark does alone in enemy country; the trophy has become a plague. The cry passing from city to city is almost comic: nobody wants to win this prize."
    }
  ],
  6: [
    {
      scene: "Send it not empty",
      lines: [
        { speaker: "Priests and diviners", quote: "If ye send away the ark of the God of Israel, send it not empty; but in any wise return him a trespass offering: then ye shall be healed, and it shall be known to you why his hand is not removed from you.", ref: "1 Samuel 6:3" },
        { speaker: "Priests and diviners", quote: "Wherefore then do ye harden your hearts, as the Egyptians and Pharaoh hardened their hearts? when he had wrought wonderfully among them, did they not let the people go, and they departed?", ref: "1 Samuel 6:6" },
        { speaker: "Men of Bethshemesh", quote: "Who is able to stand before this holy LORD God? and to whom shall he go up from us?", ref: "1 Samuel 6:20" }
      ],
      commentary: "Remarkably, it is pagan diviners who remember the Exodus and warn their own lords not to play Pharaoh. Their test — two milch cows, never yoked, their calves shut up at home — is designed so only a god could make them leave their calves and walk straight to Israel; the cows go 'lowing as they went,' pulled against every instinct. But the chapter ends with Israelites dying for peering into the ark, and Bethshemesh sounds exactly like the Philistines. Holiness, the narrator insists, is not a national possession; it is dangerous to everyone who treats it lightly."
    }
  ],
  7: [
    {
      scene: "Ebenezer — hitherto hath the LORD helped us",
      lines: [
        { speaker: "Samuel", to: "Israel", quote: "If ye do return unto the LORD with all your hearts, then put away the strange gods and Ashtaroth from among you, and prepare your hearts unto the LORD, and serve him only: and he will deliver you out of the hand of the Philistines.", ref: "1 Samuel 7:3" },
        { speaker: "Israel", to: "Samuel", quote: "Cease not to cry unto the LORD our God for us, that he will save us out of the hand of the Philistines.", ref: "1 Samuel 7:8" },
        { speaker: "Samuel", quote: "Hitherto hath the LORD helped us.", ref: "1 Samuel 7:12" }
      ],
      commentary: "Twenty years after the ark disaster, Samuel calls for something no army can supply: repentance. At Mizpeh the people fast and pour out water — an act of self-emptying — while the Philistines march on the defenseless assembly. This time Israel does not fetch the ark; they beg for prayer, and God answers with thunder. The stone Samuel raises, Ebenezer ('stone of help'), stands near where Israel had lost that very battle in chapter 4 — the same field, a different heart, a different outcome."
    }
  ],
  8: [
    {
      scene: "Make us a king like all the nations",
      lines: [
        { speaker: "Elders of Israel", to: "Samuel", quote: "Behold, thou art old, and thy sons walk not in thy ways: now make us a king to judge us like all the nations.", ref: "1 Samuel 8:5" },
        { speaker: "The LORD", to: "Samuel", quote: "Hearken unto the voice of the people in all that they say unto thee: for they have not rejected thee, but they have rejected me, that I should not reign over them.", ref: "1 Samuel 8:7" },
        { speaker: "Samuel", to: "the people", quote: "This will be the manner of the king that shall reign over you: He will take your sons, and appoint them for himself, for his chariots, and to be his horsemen; and some shall run before his chariots. … And ye shall cry out in that day because of your king which ye shall have chosen you; and the LORD will not hear you in that day.", ref: "1 Samuel 8:11, 18" },
        { speaker: "The people", to: "Samuel", quote: "Nay; but we will have a king over us; That we also may be like all the nations; and that our king may judge us, and go out before us, and fight our battles.", ref: "1 Samuel 8:19–20" }
      ],
      commentary: "This is the constitutional crisis of the Old Testament. Samuel's catalogue of royal 'taking' — sons, daughters, fields, tithes, servants — is a fair sketch of every Late Bronze and Iron Age Near Eastern monarchy; his hearers knew exactly what Canaanite kingship looked like. The tragedy is in the phrase 'like all the nations': Israel's entire calling was to be unlike them, with the LORD as king. God grants the request — and calls it a rejection of himself. Sometimes the sternest judgment is getting what you asked for."
    }
  ],
  9: [
    {
      scene: "The seer and the seeker of asses",
      lines: [
        { speaker: "Servant", to: "Saul", quote: "Behold now, there is in this city a man of God, and he is an honourable man; all that he saith cometh surely to pass: now let us go thither; peradventure he can shew us our way that we should go.", ref: "1 Samuel 9:6" },
        { speaker: "The LORD", to: "Samuel", quote: "Behold the man whom I spake to thee of! this same shall reign over my people.", ref: "1 Samuel 9:17" },
        { speaker: "Saul", to: "Samuel", quote: "Am not I a Benjamite, of the smallest of the tribes of Israel? and my family the least of all the families of the tribe of Benjamin? wherefore then speakest thou so to me?", ref: "1 Samuel 9:21" }
      ],
      commentary: "Israel's first king enters the story chasing runaway donkeys — a deliberate deflation of royal pretensions. Saul is head and shoulders taller than anyone, exactly the king the eye would choose, yet he cannot even find livestock without his servant's help. His protest of humility is conventional Near Eastern courtesy, but it is also true: Benjamin had been nearly annihilated in the days of the judges. The comedy conceals providence — every wrong turn on this errand was steering Saul to the seer's door."
    }
  ],
  10: [
    {
      scene: "Is Saul also among the prophets?",
      lines: [
        { speaker: "Samuel", to: "Saul", quote: "Is it not because the LORD hath anointed thee to be captain over his inheritance?", ref: "1 Samuel 10:1" },
        { speaker: "The people", quote: "Is Saul also among the prophets?", ref: "1 Samuel 10:11" },
        { speaker: "The LORD", quote: "Behold, he hath hid himself among the stuff.", ref: "1 Samuel 10:22" },
        { speaker: "Samuel", to: "all the people", quote: "See ye him whom the LORD hath chosen, that there is none like him among all the people?", ref: "1 Samuel 10:24" },
        { speaker: "All the people", quote: "God save the king.", ref: "1 Samuel 10:24" }
      ],
      commentary: "The anointing is private — a flask of oil, a kiss, a whisper — because in Israel the king is God's appointee before he is the people's choice. When the Spirit rushes on Saul and he prophesies, his neighbors coin a proverb of pure astonishment: the least religious man they know is caught up in ecstatic worship. Yet on coronation day the chosen king is found hiding in the baggage. The first 'God save the king' in the Bible is shouted over a man who did not want to be found — an omen a careful hearer would not miss."
    }
  ],
  11: [
    {
      scene: "Saul's finest hour at Jabesh",
      lines: [
        { speaker: "Nahash the Ammonite", to: "the men of Jabesh", quote: "On this condition will I make a covenant with you, that I may thrust out all your right eyes, and lay it for a reproach upon all Israel.", ref: "1 Samuel 11:2" },
        { speaker: "Saul", quote: "Whosoever cometh not forth after Saul and after Samuel, so shall it be done unto his oxen.", ref: "1 Samuel 11:7" },
        { speaker: "Saul", quote: "There shall not a man be put to death this day: for to day the LORD hath wrought salvation in Israel.", ref: "1 Samuel 11:13" }
      ],
      commentary: "Nahash's demand is calculated humiliation: a right eye gouged out ruins a man for war (the shield covered the left) and brands the whole nation. Saul, still plowing his own field like the judges of old, hears the news and the Spirit of God comes on him in anger; the hewn oxen sent through the land echo a grisly summons from Judges 19. The rescue is brilliant — a night march, three companies, victory by noon. And Saul's refusal to execute his despisers is royal mercy at its best. This is the king Saul might always have been."
    }
  ],
  12: [
    {
      scene: "Samuel's farewell and clean hands",
      lines: [
        { speaker: "Samuel", to: "all Israel", quote: "Behold, here I am: witness against me before the LORD, and before his anointed: whose ox have I taken? or whose ass have I taken? or whom have I defrauded? whom have I oppressed? or of whose hand have I received any bribe to blind mine eyes therewith? and I will restore it you.", ref: "1 Samuel 12:3" },
        { speaker: "The people", to: "Samuel", quote: "Thou hast not defrauded us, nor oppressed us, neither hast thou taken ought of any man's hand.", ref: "1 Samuel 12:4" },
        { speaker: "The people", to: "Samuel", quote: "Pray for thy servants unto the LORD thy God, that we die not: for we have added unto all our sins this evil, to ask us a king.", ref: "1 Samuel 12:19" },
        { speaker: "Samuel", to: "the people", quote: "Moreover as for me, God forbid that I should sin against the LORD in ceasing to pray for you: but I will teach you the good and the right way.", ref: "1 Samuel 12:23" }
      ],
      commentary: "Samuel's self-audit — no ox, no ass, no bribe — is the exact inverse of the 'taking' king he warned about in chapter 8; the old judge leaves office with empty hands. Then thunder and rain in wheat harvest, the dry season when storms simply do not come in Canaan, and the people finally feel the weight of what they asked. Samuel's reply is one of the great pastoral sentences of Scripture: he counts failing to pray for them as sin against God. Rejected leaders rarely love like this."
    }
  ],
  13: [
    {
      scene: "The kingdom that shall not continue",
      lines: [
        { speaker: "Samuel", to: "Saul", quote: "What hast thou done?", ref: "1 Samuel 13:11" },
        { speaker: "Saul", to: "Samuel", quote: "Because I saw that the people were scattered from me, and that thou camest not within the days appointed, and that the Philistines gathered themselves together at Michmash; … I forced myself therefore, and offered a burnt offering.", ref: "1 Samuel 13:11–12" },
        { speaker: "Samuel", to: "Saul", quote: "Thou hast done foolishly: thou hast not kept the commandment of the LORD thy God, which he commanded thee: for now would the LORD have established thy kingdom upon Israel for ever. But now thy kingdom shall not continue: the LORD hath sought him a man after his own heart.", ref: "1 Samuel 13:13–14" }
      ],
      commentary: "Saul waited seven days as told, watched his army melt from thousands to six hundred trembling men, and broke on the seventh. 'I forced myself' — his own words betray that he knew it was wrong. To a modern ear the offense seems small; to an ancient one it was the whole question of whether the king stands under God's word or above it. Samuel's sentence introduces, unnamed and unseen, the shepherd boy of Bethlehem: a man after God's own heart."
    }
  ],
  14: [
    {
      scene: "Jonathan and his armourbearer",
      lines: [
        { speaker: "Jonathan", to: "his armourbearer", quote: "Come, and let us go over unto the garrison of these uncircumcised: it may be that the LORD will work for us: for there is no restraint to the LORD to save by many or by few.", ref: "1 Samuel 14:6" },
        { speaker: "Armourbearer", to: "Jonathan", quote: "Do all that is in thine heart: turn thee; behold, I am with thee according to thy heart.", ref: "1 Samuel 14:7" },
        { speaker: "Philistines", quote: "Come up to us, and we will shew you a thing.", ref: "1 Samuel 14:12" },
        { speaker: "Jonathan", to: "his armourbearer", quote: "Come up after me: for the LORD hath delivered them into the hand of Israel.", ref: "1 Samuel 14:12" }
      ],
      commentary: "Two men climb a cliff on hands and feet to attack a garrison — because 'it may be that the LORD will work for us.' Jonathan's faith is neither presumption nor certainty; it is trust that God is not limited by arithmetic. The Philistines' mocking invitation becomes, in Jonathan's ears, God's sign to attack. An earthquake finishes what twenty slain men began. All the while, Jonathan's father sits under a pomegranate tree binding the army with a rash oath — the contrast between father and son is the engine of the rest of the book."
    },
    {
      scene: "Shall Jonathan die?",
      lines: [
        { speaker: "Jonathan", quote: "My father hath troubled the land: see, I pray you, how mine eyes have been enlightened, because I tasted a little of this honey.", ref: "1 Samuel 14:29" },
        { speaker: "Saul", quote: "God do so and more also: for thou shalt surely die, Jonathan.", ref: "1 Samuel 14:44" },
        { speaker: "The people", to: "Saul", quote: "Shall Jonathan die, who hath wrought this great salvation in Israel? God forbid: as the LORD liveth, there shall not one hair of his head fall to the ground; for he hath wrought with God this day.", ref: "1 Samuel 14:45" }
      ],
      commentary: "Saul's oath forbidding food turned victory into a famished stumble, and now it demands the life of the very son who won the day. Saul would rather kill Jonathan than admit his vow was foolish — religion as face-saving. For the only time in the book, the people overrule their king, and they do it with an oath of their own: 'as the LORD liveth.' The rescue of Jonathan by popular acclamation shows everyone, including Saul, where true kingship in Israel actually rests."
    }
  ],
  15: [
    {
      scene: "The bleating of the sheep",
      lines: [
        { speaker: "Saul", to: "Samuel", quote: "Blessed be thou of the LORD: I have performed the commandment of the LORD.", ref: "1 Samuel 15:13" },
        { speaker: "Samuel", to: "Saul", quote: "What meaneth then this bleating of the sheep in mine ears, and the lowing of the oxen which I hear?", ref: "1 Samuel 15:14" },
        { speaker: "Saul", to: "Samuel", quote: "They have brought them from the Amalekites: for the people spared the best of the sheep and of the oxen, to sacrifice unto the LORD thy God; and the rest we have utterly destroyed.", ref: "1 Samuel 15:15" },
        { speaker: "Samuel", to: "Saul", quote: "Hath the LORD as great delight in burnt offerings and sacrifices, as in obeying the voice of the LORD? Behold, to obey is better than sacrifice, and to hearken than the fat of rams. For rebellion is as the sin of witchcraft, and stubbornness is as iniquity and idolatry. Because thou hast rejected the word of the LORD, he hath also rejected thee from being king.", ref: "1 Samuel 15:22–23" }
      ],
      commentary: "Saul greets Samuel with a blessing and a boast, and the animals themselves contradict him — few lines in Scripture land as devastatingly as 'What meaneth then this bleating of the sheep in mine ears?' Notice Saul's grammar of evasion: 'they' spared, 'the LORD thy God' (not mine). Samuel's answer became the prophetic charter quoted for centuries: obedience outranks ritual. A hearer would understand that Saul kept the ritual parts of religion and discarded the part that costs the will."
    },
    {
      scene: "The torn robe",
      lines: [
        { speaker: "Saul", to: "Samuel", quote: "I have sinned: for I have transgressed the commandment of the LORD, and thy words: because I feared the people, and obeyed their voice.", ref: "1 Samuel 15:24" },
        { speaker: "Samuel", to: "Saul", quote: "The LORD hath rent the kingdom of Israel from thee this day, and hath given it to a neighbour of thine, that is better than thou. And also the Strength of Israel will not lie nor repent: for he is not a man, that he should repent.", ref: "1 Samuel 15:28–29" },
        { speaker: "Saul", to: "Samuel", quote: "I have sinned: yet honour me now, I pray thee, before the elders of my people, and before Israel.", ref: "1 Samuel 15:30" }
      ],
      commentary: "As Samuel turns to leave, Saul clutches at his mantle and it tears — and the prophet turns the accident into a verdict: so the kingdom is torn from you. Saul's two confessions expose him: the first blames the people, the second asks only to be honored in public. He fears losing face more than losing God. The chapter closes with Samuel mourning Saul as one mourns the dead, and the two men never meet again in life."
    }
  ],
  16: [
    {
      scene: "The LORD looketh on the heart",
      lines: [
        { speaker: "The LORD", to: "Samuel", quote: "How long wilt thou mourn for Saul, seeing I have rejected him from reigning over Israel? fill thine horn with oil, and go, I will send thee to Jesse the Bethlehemite: for I have provided me a king among his sons.", ref: "1 Samuel 16:1" },
        { speaker: "The LORD", to: "Samuel", quote: "Look not on his countenance, or on the height of his stature; because I have refused him: for the LORD seeth not as man seeth; for man looketh on the outward appearance, but the LORD looketh on the heart.", ref: "1 Samuel 16:7" },
        { speaker: "Samuel", to: "Jesse", quote: "Are here all thy children?", ref: "1 Samuel 16:11" },
        { speaker: "Jesse", to: "Samuel", quote: "There remaineth yet the youngest, and, behold, he keepeth the sheep.", ref: "1 Samuel 16:11" },
        { speaker: "The LORD", to: "Samuel", quote: "Arise, anoint him: for this is he.", ref: "1 Samuel 16:12" }
      ],
      commentary: "Even Samuel, who watched tall Saul fail, is dazzled by tall Eliab — and God's correction is one of the Bible's defining sentences about how heaven evaluates a person. Seven sons pass by; the eighth was not even invited to the sacrifice. In a culture where the youngest son keeping sheep was the family's least significant member, God's choice of David overturns every expectation, just as Hannah sang. The oil runs down in front of his brothers, and 'the Spirit of the LORD came upon David from that day forward.'"
    }
  ],
  17: [
    {
      scene: "The champion's defiance",
      lines: [
        { speaker: "Goliath", to: "the armies of Israel", quote: "Why are ye come out to set your battle in array? am not I a Philistine, and ye servants to Saul? choose you a man for you, and let him come down to me. … I defy the armies of Israel this day; give me a man, that we may fight together.", ref: "1 Samuel 17:8–10" },
        { speaker: "Eliab", to: "David", quote: "Why camest thou down hither? and with whom hast thou left those few sheep in the wilderness? I know thy pride, and the naughtiness of thine heart; for thou art come down that thou mightest see the battle.", ref: "1 Samuel 17:28" },
        { speaker: "David", to: "Eliab", quote: "What have I now done? Is there not a cause?", ref: "1 Samuel 17:29" }
      ],
      commentary: "Single combat between champions was a real Aegean and Philistine practice — the outcome standing for both armies — and Goliath, nearly ten feet by the traditional text, has made the offer stand for forty mornings. His taunt cuts theologically: he calls Israel 'servants to Saul,' not servants of the LORD, and no one corrects him with sword or word. Into this paralysis walks a boy delivering bread and cheese, whose own brother greets him with contempt. David is the first person in the chapter to be scandalized on God's behalf."
    },
    {
      scene: "Sword and spear against the Name",
      lines: [
        { speaker: "David", to: "Saul", quote: "Thy servant kept his father's sheep, and there came a lion, and a bear, and took a lamb out of the flock … The LORD that delivered me out of the paw of the lion, and out of the paw of the bear, he will deliver me out of the hand of this Philistine.", ref: "1 Samuel 17:34–37" },
        { speaker: "Saul", to: "David", quote: "Go, and the LORD be with thee.", ref: "1 Samuel 17:37" },
        { speaker: "Goliath", to: "David", quote: "Am I a dog, that thou comest to me with staves? … Come to me, and I will give thy flesh unto the fowls of the air, and to the beasts of the field.", ref: "1 Samuel 17:43–44" },
        { speaker: "David", to: "Goliath", quote: "Thou comest to me with a sword, and with a spear, and with a shield: but I come to thee in the name of the LORD of hosts, the God of the armies of Israel, whom thou hast defied. This day will the LORD deliver thee into mine hand … that all the earth may know that there is a God in Israel. And all this assembly shall know that the LORD saveth not with sword and spear: for the battle is the LORD's, and he will give you into our hands.", ref: "1 Samuel 17:45–47" }
      ],
      commentary: "Goliath curses David by his gods; David answers with the longest confession of faith on any Old Testament battlefield. Every clause matters: the giant has defied not Israel but 'the God of the armies of Israel,' and the duel's purpose is 'that all the earth may know.' The sling was no toy — Judges 20 records slingers accurate to a hair's breadth — but the narrator's point is that David refused Saul's armor and ran toward the champion trusting the Name. One smooth stone later, the theology is settled: the battle is the LORD's."
    }
  ],
  18: [
    {
      scene: "The song that haunted Saul",
      lines: [
        { speaker: "The women of Israel", quote: "Saul hath slain his thousands, and David his ten thousands.", ref: "1 Samuel 18:7" },
        { speaker: "Saul", quote: "They have ascribed unto David ten thousands, and to me they have ascribed but thousands: and what can he have more but the kingdom?", ref: "1 Samuel 18:8" },
        { speaker: "David", to: "Saul", quote: "Who am I? and what is my life, or my father's family in Israel, that I should be son in law to the king?", ref: "1 Samuel 18:18" }
      ],
      commentary: "Victory songs with escalating parallelism ('thousands … ten thousands') were conventional Hebrew poetry, not a ranking — but Saul hears them through the filter of Samuel's verdict, and 'Saul eyed David from that day and forward.' Twice the javelin flies; twice David slips aside. The dowry Saul then sets for his daughter, a hundred Philistine foreskins, is a murder plot dressed as an honor. The refrain of the chapter tolls like a bell: the LORD was with David, and Saul knew it — and that knowledge, unrepented, curdles into fear."
    }
  ],
  19: [
    {
      scene: "Jonathan and Michal against their father",
      lines: [
        { speaker: "Jonathan", to: "Saul", quote: "Let not the king sin against his servant, against David; because he hath not sinned against thee, and because his works have been to thee-ward very good: For he did put his life in his hand, and slew the Philistine, and the LORD wrought a great salvation for all Israel: thou sawest it, and didst rejoice: wherefore then wilt thou sin against innocent blood, to slay David without a cause?", ref: "1 Samuel 19:4–5" },
        { speaker: "Saul", quote: "As the LORD liveth, he shall not be slain.", ref: "1 Samuel 19:6" },
        { speaker: "Michal", to: "David", quote: "If thou save not thy life to night, to morrow thou shalt be slain.", ref: "1 Samuel 19:11" },
        { speaker: "Saul", to: "Michal", quote: "Why hast thou deceived me so, and sent away mine enemy, that he is escaped?", ref: "1 Samuel 19:17" }
      ],
      commentary: "Both of Saul's children choose David over their father — Jonathan with a courtroom-worthy defense, Michal with a rope out the window and an idol tucked into the bed as a decoy. Saul's oath 'he shall not be slain' lasts exactly one war and one evil spirit; his word has become worthless even to himself. When his messengers, and finally Saul in person, come to seize David at Ramah, the Spirit overwhelms them all into prophesying — God protecting David without a single sword drawn, and reducing the king to a byword a second time."
    }
  ],
  20: [
    {
      scene: "A step between me and death",
      lines: [
        { speaker: "David", to: "Jonathan", quote: "What have I done? what is mine iniquity? and what is my sin before thy father, that he seeketh my life?", ref: "1 Samuel 20:1" },
        { speaker: "David", to: "Jonathan", quote: "Truly as the LORD liveth, and as thy soul liveth, there is but a step between me and death.", ref: "1 Samuel 20:3" },
        { speaker: "Jonathan", to: "David", quote: "Whatsoever thy soul desireth, I will even do it for thee.", ref: "1 Samuel 20:4" },
        { speaker: "Saul", to: "Jonathan", quote: "Thou son of the perverse rebellious woman … For as long as the son of Jesse liveth upon the ground, thou shalt not be established, nor thy kingdom.", ref: "1 Samuel 20:30–31" },
        { speaker: "Jonathan", to: "Saul", quote: "Wherefore shall he be slain? what hath he done?", ref: "1 Samuel 20:32" }
      ],
      commentary: "The test at the new moon feast strips away all doubt: when David's seat stands empty, Saul's rage tears through his own son — and the spear he hurls at Jonathan proves David's 'one step from death' was no exaggeration. Saul says the unsayable aloud: while David lives, Jonathan will never be king. And here is Jonathan's greatness — he knows it, and defends David anyway. The crown prince has chosen covenant love over his own succession."
    },
    {
      scene: "The covenant farewell",
      lines: [
        { speaker: "Jonathan", to: "David", quote: "Go in peace, forasmuch as we have sworn both of us in the name of the LORD, saying, The LORD be between me and thee, and between my seed and thy seed for ever.", ref: "1 Samuel 20:42" }
      ],
      commentary: "After the arrows and the code words, the secrecy collapses into open weeping — 'they kissed one another, and wept one with another, until David exceeded.' In the ancient world covenant between a royal heir and a rival claimant was politically unthinkable; Jonathan makes it anyway, and extends it to their descendants. Years later David will honor it by seeking out Jonathan's lame son Mephibosheth. This field near the stone Ezel is where the deepest friendship in Scripture says goodbye; the two men meet only once more."
    }
  ],
  21: [
    {
      scene: "Holy bread and Goliath's sword",
      lines: [
        { speaker: "Ahimelech", to: "David", quote: "Why art thou alone, and no man with thee?", ref: "1 Samuel 21:1" },
        { speaker: "David", to: "Ahimelech", quote: "And is there not here under thine hand spear or sword? for I have neither brought my sword nor my weapons with me, because the king's business required haste.", ref: "1 Samuel 21:8" },
        { speaker: "Ahimelech", to: "David", quote: "The sword of Goliath the Philistine, whom thou slewest in the valley of Elah, behold, it is here wrapped in a cloth behind the ephod: if thou wilt take that, take it: for there is no other save that here.", ref: "1 Samuel 21:9" },
        { speaker: "David", quote: "There is none like that; give it me.", ref: "1 Samuel 21:9" },
        { speaker: "Achish's servants", to: "Achish", quote: "Is not this David the king of the land? did they not sing one to another of him in dances, saying, Saul hath slain his thousands, and David his ten thousands?", ref: "1 Samuel 21:11" },
        { speaker: "Achish", to: "his servants", quote: "Lo, ye see the man is mad: wherefore then have ye brought him to me? Have I need of mad men, that ye have brought this fellow to play the mad man in my presence? shall this fellow come into my house?", ref: "1 Samuel 21:14–15" }
      ],
      commentary: "A trembling priest, consecrated bread meant only for priests, and the trophy sword of Elah handed back to the man who won it — Jesus himself would later cite this scene to show mercy outranking ritual. But David's lie to Ahimelech will cost the priests of Nob their lives, a weight David later owns. Fleeing to Gath of all places, Goliath's hometown, David is recognized instantly and saves himself by scrabbling on the gate and drooling into his beard. The anointed of Israel playing the madman before a Philistine king — the low point from which Psalm 34 and Psalm 56 were sung."
    }
  ],
  22: [
    {
      scene: "The massacre of the priests of Nob",
      lines: [
        { speaker: "Doeg the Edomite", to: "Saul", quote: "I saw the son of Jesse coming to Nob, to Ahimelech the son of Ahitub. And he enquired of the LORD for him, and gave him victuals, and gave him the sword of Goliath the Philistine.", ref: "1 Samuel 22:9–10" },
        { speaker: "Ahimelech", to: "Saul", quote: "And who is so faithful among all thy servants as David, which is the king's son in law, and goeth at thy bidding, and is honourable in thine house?", ref: "1 Samuel 22:14" },
        { speaker: "Saul", quote: "Thou shalt surely die, Ahimelech, thou, and all thy father's house.", ref: "1 Samuel 22:16" },
        { speaker: "David", to: "Abiathar", quote: "I have occasioned the death of all the persons of thy father's house. Abide thou with me, fear not: for he that seeketh my life seeketh thy life: but with me thou shalt be in safeguard.", ref: "1 Samuel 22:22–23" }
      ],
      commentary: "Saul's paranoia reaches its abyss: eighty-five priests of the LORD slaughtered, and the whole town of Nob put to the sword — the herem judgment Saul refused to execute on Amalek, he now unleashes on God's own priests. His Israelite footmen refuse the order; only Doeg, an Edomite outsider, will do it. Ahimelech dies for an act of innocent kindness, fulfilling the doom pronounced on Eli's house back in chapter 2. David's confession to the lone survivor, Abiathar, is notable — he takes responsibility, and takes the refugee in."
    }
  ],
  23: [
    {
      scene: "Strengthened in God at Ziph",
      lines: [
        { speaker: "David", to: "the LORD", quote: "Shall I go and smite these Philistines?", ref: "1 Samuel 23:2" },
        { speaker: "The LORD", to: "David", quote: "Go, and smite the Philistines, and save Keilah.", ref: "1 Samuel 23:2" },
        { speaker: "The LORD", to: "David", quote: "They will deliver thee up.", ref: "1 Samuel 23:12" },
        { speaker: "Jonathan", to: "David", quote: "Fear not: for the hand of Saul my father shall not find thee; and thou shalt be king over Israel, and I shall be next unto thee; and that also Saul my father knoweth.", ref: "1 Samuel 23:17" }
      ],
      commentary: "David saves the town of Keilah from Philistine raiders — doing the king's job while the king hunts him — and God warns him that the very citizens he rescued would hand him over. Notice the contrast in intelligence-gathering: David inquires of the LORD by the ephod; Saul relies on informers from Ziph. Jonathan's last recorded words to David, spoken in a wood while the manhunt closes in, 'strengthened his hand in God.' The crown prince slips into a fugitive camp to tell its captain: the throne is yours, and my father knows it."
    }
  ],
  24: [
    {
      scene: "The skirt of the robe in the cave",
      lines: [
        { speaker: "David's men", to: "David", quote: "Behold the day of which the LORD said unto thee, Behold, I will deliver thine enemy into thine hand, that thou mayest do to him as it shall seem good unto thee.", ref: "1 Samuel 24:4" },
        { speaker: "David", to: "his men", quote: "The LORD forbid that I should do this thing unto my master, the LORD's anointed, to stretch forth mine hand against him, seeing he is the anointed of the LORD.", ref: "1 Samuel 24:6" },
        { speaker: "David", to: "Saul", quote: "Moreover, my father, see, yea, see the skirt of thy robe in my hand: for in that I cut off the skirt of thy robe, and killed thee not, know thou and see that there is neither evil nor transgression in mine hand … The LORD judge between me and thee, and the LORD avenge me of thee: but mine hand shall not be upon thee.", ref: "1 Samuel 24:11–12" },
        { speaker: "Saul", to: "David", quote: "Is this thy voice, my son David? … Thou art more righteous than I: for thou hast rewarded me good, whereas I have rewarded thee evil. … And now, behold, I know well that thou shalt surely be king.", ref: "1 Samuel 24:16–17, 20" }
      ],
      commentary: "In the pitch dark of an En-gedi cave, with Saul helpless at his feet, David faces the great temptation of his life — and even cutting the robe's hem smites his conscience, for the hem was the emblem of royal identity (remember the robe torn at Gilgal). His speech from the cliff, calling Saul 'my father' and himself 'a dead dog, a flea,' entrusts vengeance wholly to God. Saul lifts up his voice and weeps; for a moment the old man sees clearly, even confessing David's coming kingship. Ancient hearers knew what modern ones know: mercy toward a helpless enemy is the rarest kind of strength."
    }
  ],
  25: [
    {
      scene: "Nabal's insult and Abigail's wisdom",
      lines: [
        { speaker: "Nabal", to: "David's young men", quote: "Who is David? and who is the son of Jesse? there be many servants now a days that break away every man from his master. Shall I then take my bread, and my water, and my flesh that I have killed for my shearers, and give it unto men, whom I know not whence they be?", ref: "1 Samuel 25:10–11" },
        { speaker: "David", quote: "Gird ye on every man his sword.", ref: "1 Samuel 25:13" },
        { speaker: "Abigail", to: "David", quote: "Upon me, my lord, upon me let this iniquity be … Let not my lord, I pray thee, regard this man of Belial, even Nabal: for as his name is, so is he; Nabal is his name, and folly is with him. … but the soul of my lord shall be bound in the bundle of life with the LORD thy God; and the souls of thine enemies, them shall he sling out, as out of the middle of a sling.", ref: "1 Samuel 25:24–25, 29" },
        { speaker: "Abigail", to: "David", quote: "That this shall be no grief unto thee, nor offence of heart unto my lord, either that thou hast shed blood causeless, or that my lord hath avenged himself.", ref: "1 Samuel 25:31" },
        { speaker: "David", to: "Abigail", quote: "Blessed be the LORD God of Israel, which sent thee this day to meet me: And blessed be thy advice, and blessed be thou, which hast kept me this day from coming to shed blood, and from avenging myself with mine own hand.", ref: "1 Samuel 25:32–33" }
      ],
      commentary: "Sheepshearing was festival season, when generosity to those who had protected the flocks was expected custom — Nabal's sneer breaks the code of the hills, and David, fresh from sparing Saul, straps on his sword to massacre a household over an insult. Abigail intercepts him on a mountain path with laden donkeys and the finest diplomatic speech in the book: she takes the blame, names her husband a fool, alludes to David's sling, and — the masterstroke — warns him not to carry bloodguilt into his kingship. David hears God's voice in a woman's counsel and turns back. Ten days later Nabal's heart dies within him; the LORD, not David, settles the account."
    }
  ],
  26: [
    {
      scene: "The spear and the cruse of water",
      lines: [
        { speaker: "Abishai", to: "David", quote: "God hath delivered thine enemy into thine hand this day: now therefore let me smite him, I pray thee, with the spear even to the earth at once, and I will not smite him the second time.", ref: "1 Samuel 26:8" },
        { speaker: "David", to: "Abishai", quote: "Destroy him not: for who can stretch forth his hand against the LORD's anointed, and be guiltless? … As the LORD liveth, the LORD shall smite him; or his day shall come to die; or he shall descend into battle, and perish.", ref: "1 Samuel 26:9–10" },
        { speaker: "Saul", quote: "Is this thy voice, my son David?", ref: "1 Samuel 26:17" },
        { speaker: "David", to: "Saul", quote: "It is my voice, my lord, O king.", ref: "1 Samuel 26:17" },
        { speaker: "Saul", to: "David", quote: "I have sinned: return, my son David: for I will no more do thee harm, because my soul was precious in thine eyes this day: behold, I have played the fool, and have erred exceedingly.", ref: "1 Samuel 26:21" }
      ],
      commentary: "A second sparing, this time in the middle of Saul's sleeping camp — David and Abishai walk among three thousand soldiers held in 'a deep sleep from the LORD.' Abishai offers one silent spear-thrust; David's refusal names the three ways Saul may die, none of them by David's hand. Then from a far hilltop David mocks Abner for failing his watch and holds up the king's own spear and water jug as proof. Saul's 'I have played the fool' is his last recorded word to David — true, tender, and too late; the two never meet again."
    }
  ],
  27: [
    {
      scene: "Despair and the move to Ziklag",
      lines: [
        { speaker: "David", quote: "I shall now perish one day by the hand of Saul: there is nothing better for me than that I should speedily escape into the land of the Philistines; and Saul shall despair of me, to seek me any more in any coast of Israel: so shall I escape out of his hand.", ref: "1 Samuel 27:1" },
        { speaker: "Achish", to: "David", quote: "Whither have ye made a road to day?", ref: "1 Samuel 27:10" },
        { speaker: "David", to: "Achish", quote: "Against the south of Judah, and against the south of the Jerahmeelites, and against the south of the Kenites.", ref: "1 Samuel 27:10" }
      ],
      commentary: "'David said in his heart' — no inquiry of the LORD this time, only weary calculation, and it leads the anointed king into sixteen months as a Philistine vassal. Achish grants him Ziklag on the desert fringe, and David runs a dangerous double game: raiding Israel's ancient enemies while reporting to his overlord that he raids Judah. The narrator neither praises nor excuses; he simply shows a man of faith living by his wits in a far country. Ziklag will pass to the kings of Judah 'unto this day' — even David's compromises get woven into providence."
    }
  ],
  28: [
    {
      scene: "The medium of Endor",
      lines: [
        { speaker: "Saul", to: "his servants", quote: "Seek me a woman that hath a familiar spirit, that I may go to her, and enquire of her.", ref: "1 Samuel 28:7" },
        { speaker: "The woman", to: "Saul", quote: "Behold, thou knowest what Saul hath done, how he hath cut off those that have familiar spirits, and the wizards, out of the land: wherefore then layest thou a snare for my life, to cause me to die?", ref: "1 Samuel 28:9" },
        { speaker: "The woman", to: "Saul", quote: "Why hast thou deceived me? for thou art Saul.", ref: "1 Samuel 28:12" },
        { speaker: "The woman", to: "Saul", quote: "An old man cometh up; and he is covered with a mantle.", ref: "1 Samuel 28:14" }
      ],
      commentary: "God answers Saul 'neither by dreams, nor by Urim, nor by prophets' — the silence Saul himself earned by slaughtering the priests — so the king who once purged the mediums disguises himself and creeps by night to one. The irony is complete: he swears by the LORD that the woman will not be punished for the very practice the LORD forbade. When Samuel actually appears she shrieks, seemingly astonished herself, and recognizes Saul in the same breath. The mantle — the robe Saul tore at Gilgal — tells Saul before a word is spoken who has come up."
    },
    {
      scene: "Samuel's ghost speaks doom",
      lines: [
        { speaker: "Samuel", to: "Saul", quote: "Why hast thou disquieted me, to bring me up?", ref: "1 Samuel 28:15" },
        { speaker: "Saul", to: "Samuel", quote: "I am sore distressed; for the Philistines make war against me, and God is departed from me, and answereth me no more, neither by prophets, nor by dreams: therefore I have called thee, that thou mayest make known unto me what I shall do.", ref: "1 Samuel 28:15" },
        { speaker: "Samuel", to: "Saul", quote: "Wherefore then dost thou ask of me, seeing the LORD is departed from thee, and is become thine enemy? … the LORD hath rent the kingdom out of thine hand, and given it to thy neighbour, even to David … to morrow shalt thou and thy sons be with me: the LORD also shall deliver the host of Israel into the hand of the Philistines.", ref: "1 Samuel 28:16–19" }
      ],
      commentary: "This is the eeriest scene in the historical books: the dead prophet, disturbed from rest, delivers exactly the message he gave in life — no new word, only the old verdict with a date attached: 'to morrow shalt thou be with me.' Saul falls full length on the ground, fasting, spent, and terrified. Then comes an unexpected grace note: the condemned witch of Endor kills her fatted calf and bakes bread, pressing a last supper on the doomed king. Saul rises from a compassionate outlaw's table and walks into the night toward Gilboa."
    }
  ],
  29: [
    {
      scene: "What do these Hebrews here?",
      lines: [
        { speaker: "Princes of the Philistines", quote: "What do these Hebrews here?", ref: "1 Samuel 29:3" },
        { speaker: "Princes of the Philistines", to: "Achish", quote: "Make this fellow return, that he may go again to his place which thou hast appointed him, and let him not go down with us to battle, lest in the battle he be an adversary to us: for wherewith should he reconcile himself unto his master? should it not be with the heads of these men?", ref: "1 Samuel 29:4" },
        { speaker: "David", to: "Achish", quote: "But what have I done? and what hast thou found in thy servant so long as I have been with thee unto this day, that I may not go fight against the enemies of my lord the king?", ref: "1 Samuel 29:8" },
        { speaker: "Achish", to: "David", quote: "I know that thou art good in my sight, as an angel of God: notwithstanding the princes of the Philistines have said, He shall not go up with us to the battle.", ref: "1 Samuel 29:9" }
      ],
      commentary: "David marches at the rear of the Philistine army toward Gilboa — toward the battle in which Saul and Jonathan will die. The Philistine lords, remembering the victory song, refuse to trust him, and their suspicion is God's rescue: David is sent home before he must either fight Israel or betray Achish. His protest is a marvel of ambiguity — 'the enemies of my lord the king' could mean Achish's enemies or Saul's. The narrator lets us wonder what David would have done, because providence made sure he never had to choose."
    }
  ],
  30: [
    {
      scene: "Ziklag burned, and all recovered",
      lines: [
        { speaker: "David", to: "the LORD", quote: "Shall I pursue after this troop? shall I overtake them?", ref: "1 Samuel 30:8" },
        { speaker: "The LORD", to: "David", quote: "Pursue: for thou shalt surely overtake them, and without fail recover all.", ref: "1 Samuel 30:8" },
        { speaker: "Wicked men of David's band", quote: "Because they went not with us, we will not give them ought of the spoil that we have recovered, save to every man his wife and his children, that they may lead them away, and depart.", ref: "1 Samuel 30:22" },
        { speaker: "David", quote: "Ye shall not do so, my brethren, with that which the LORD hath given us … but as his part is that goeth down to the battle, so shall his part be that tarrieth by the stuff: they shall part alike.", ref: "1 Samuel 30:23–24" }
      ],
      commentary: "David returns to a smoking ruin — wives, children, everything carried off by Amalekites — and his own men speak of stoning him. Then the pivot of his whole exile: 'David encouraged himself in the LORD his God,' and for the first time since chapter 23 he inquires of the LORD before acting. An abandoned, starving Egyptian slave, fed and revived, becomes the guide to the raiders' camp. David's ruling afterward — equal shares for those who guarded the baggage — became 'a statute and an ordinance for Israel unto this day,' the shepherd-king's economics of grace in miniature."
    }
  ],
  31: [
    {
      scene: "The fall of Saul on Gilboa",
      lines: [
        { speaker: "Saul", to: "his armourbearer", quote: "Draw thy sword, and thrust me through therewith; lest these uncircumcised come and thrust me through, and abuse me.", ref: "1 Samuel 31:4" }
      ],
      commentary: "The chapter is nearly silent — one last command, refused by a terrified armourbearer, and the first king of Israel falls on his own sword. The Philistines behead him as Israel once beheaded their champion, fasten his body to the wall of Beth-shan, and hang his armor in the house of Ashtaroth: Goliath's story run in reverse. But the book refuses to end in shame. The men of Jabesh-gilead — the town Saul saved in his finest hour — march all night to take down the bodies, and fast seven days. Somebody remembered the best of Saul, and their loyalty is the last word of 1 Samuel."
    }
  ],
  "2s1": [
    {
      scene: "The Amalekite's report",
      lines: [
        { speaker: "David", to: "the Amalekite", quote: "How went the matter? I pray thee, tell me.", ref: "2 Samuel 1:4" },
        { speaker: "The Amalekite", to: "David", quote: "The people are fled from the battle, and many of the people also are fallen and dead; and Saul and Jonathan his son are dead also.", ref: "2 Samuel 1:4" },
        { speaker: "The Amalekite", to: "David", quote: "So I stood upon him, and slew him, because I was sure that he could not live after that he was fallen: and I took the crown that was upon his head, and the bracelet that was on his arm, and have brought them hither unto my lord.", ref: "2 Samuel 1:10" },
        { speaker: "David", to: "the Amalekite", quote: "How wast thou not afraid to stretch forth thine hand to destroy the LORD's anointed? … Thy blood be upon thy head; for thy mouth hath testified against thee, saying, I have slain the LORD's anointed.", ref: "2 Samuel 1:14, 16" }
      ],
      commentary: "The messenger arrives with torn clothes, earth on his head — and Saul's crown in his hand. His story contradicts 1 Samuel 31; he is almost certainly lying, embroidering a mercy-killing he never performed, gambling that the new power in Israel will reward the man who finished his rival. He has fatally misread David. The man who twice refused to touch the LORD's anointed in a cave and a sleeping camp will not celebrate regicide, and — bitter irony — the opportunist is an Amalekite, of the very nation whose spoil Saul was rejected for sparing."
    },
    {
      scene: "How are the mighty fallen",
      lines: [
        { speaker: "David", quote: "The beauty of Israel is slain upon thy high places: how are the mighty fallen! Tell it not in Gath, publish it not in the streets of Askelon; lest the daughters of the Philistines rejoice, lest the daughters of the uncircumcised triumph.", ref: "2 Samuel 1:19–20" },
        { speaker: "David", quote: "Saul and Jonathan were lovely and pleasant in their lives, and in their death they were not divided: they were swifter than eagles, they were stronger than lions.", ref: "2 Samuel 1:23" },
        { speaker: "David", quote: "I am distressed for thee, my brother Jonathan: very pleasant hast thou been unto me: thy love to me was wonderful, passing the love of women. How are the mighty fallen, and the weapons of war perished!", ref: "2 Samuel 1:26–27" }
      ],
      commentary: "The Song of the Bow is one of the oldest and finest poems in the Bible, and David ordered all Judah to learn it — a state lament for the very dynasty that hunted him. There is not one word of Saul's madness or the javelins; David eulogizes only the king's courage and bounty, and commands the mountains of Gilboa themselves to go dry in mourning. Then the poem narrows to one name, and the public dirge becomes a private wound: 'my brother Jonathan.' A hearer would understand that David's throne begins not with triumph but with grief honestly sung."
    }
  ],
  "2s2": [
    {
      scene: "Let the young men arise and play",
      lines: [
        { speaker: "Abner", to: "Joab", quote: "Let the young men now arise, and play before us.", ref: "2 Samuel 2:14" },
        { speaker: "Joab", quote: "Let them arise.", ref: "2 Samuel 2:14" }
      ],
      commentary: "Two generals meet at the pool of Gibeon — Abner propping up Saul's son Ishbosheth, Joab commanding for David — and civil war opens with chilling casualness. 'Play' is the grim soldier's euphemism for gladiatorial combat by champions, twelve a side; each man seizes his opponent's head and drives in his sword, and all twenty-four fall together at the place afterward called Helkath-hazzurim, 'the field of sharp blades.' The contest settles nothing, so 'there was a very sore battle that day.' Israel's tragedy after Gilboa is that its swords now turn inward."
    },
    {
      scene: "Abner and Asahel",
      lines: [
        { speaker: "Abner", to: "Asahel", quote: "Art thou Asahel?", ref: "2 Samuel 2:20" },
        { speaker: "Asahel", quote: "I am.", ref: "2 Samuel 2:20" },
        { speaker: "Abner", to: "Asahel", quote: "Turn thee aside to thy right hand or to thy left, and lay thee hold on one of the young men, and take thee his armour.", ref: "2 Samuel 2:21" },
        { speaker: "Abner", to: "Asahel", quote: "Turn thee aside from following me: wherefore should I smite thee to the ground? how then should I hold up my face to Joab thy brother?", ref: "2 Samuel 2:22" }
      ],
      commentary: "Asahel, 'light of foot as a wild roe,' runs down the veteran general and will not turn aside — the pursuit of glory outrunning judgment. Twice Abner pleads with him, and the second plea shows the older man thinking past this battle to the feud it will ignite: how could he face Joab? Then the terrible economy of the text: Abner stops short, and the butt of his spear passes through the young runner. Everyone who reaches the spot stands still. That spear-thrust plants the vendetta by which Joab will one day murder Abner in the gate of Hebron."
    },
    {
      scene: "Shall the sword devour for ever?",
      lines: [
        { speaker: "Abner", to: "Joab", quote: "Shall the sword devour for ever? knowest thou not that it will be bitterness in the latter end? how long shall it be then, ere thou bid the people return from following their brethren?", ref: "2 Samuel 2:26" },
        { speaker: "Joab", quote: "As God liveth, unless thou hadst spoken, surely then in the morning the people had gone up every one from following his brother.", ref: "2 Samuel 2:27" }
      ],
      commentary: "At sundown, from the top of a hill with Benjamin rallied behind him, the losing general appeals to the winning one — and his words name the whole horror of civil war: the people they are killing are 'their brethren.' Joab, no man of peace, blows the trumpet and the pursuit ends; then both armies march away all night, one across the Jordan, one back to Hebron, carrying their dead. Nineteen of David's men have fallen against three hundred and sixty of Abner's, and nobody calls it victory. 'It will be bitterness in the latter end' hangs over the long war between the two houses that follows — and over every war since."
    }
  ]
};
