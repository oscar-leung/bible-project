/* data/dialogue.js — window.DIALOGUE (Historian)
 * Spoken dialogue of 1 Samuel (chapters 1–31) plus 2 Samuel 1–3 ("2s1"–"2s3"),
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
  ],
  "2s3": [
    {
      scene: "Am I a dog's head?",
      lines: [
        { speaker: "Ish-bosheth", to: "Abner", quote: "Wherefore hast thou gone in unto my father's concubine?", ref: "2 Samuel 3:7" },
        { speaker: "Abner", to: "Ish-bosheth", quote: "Am I a dog's head, which against Judah do shew kindness this day unto the house of Saul thy father, to his brethren, and to his friends, and have not delivered thee into the hand of David, that thou chargest me to day with a fault concerning this woman?", ref: "2 Samuel 3:8" },
        { speaker: "Abner", to: "Ish-bosheth", quote: "So do God to Abner, and more also, except, as the LORD hath sworn to David, even so I do to him; to translate the kingdom from the house of Saul, and to set up the throne of David over Israel and over Judah, from Dan even to Beer-sheba.", ref: "2 Samuel 3:9–10" },
        { speaker: "The narrator", quote: "And he could not answer Abner a word again, because he feared him.", ref: "2 Samuel 3:11" }
      ],
      commentary: "The accusation about Rizpah is no bedroom quarrel: in the ancient Near East a dead king's concubine belonged to his heir, so the charge means 'you are reaching for my throne.' Abner's furious oath is the more startling for what it admits — he knows 'the LORD hath sworn to David,' and has been fighting for two years against a promise he believed all along. The puppet king cannot answer the man who made him. Whether Abner's conversion is conviction or convenience, the text leaves open; both are true of most political conversions."
    },
    {
      scene: "Michal returned, Phaltiel weeping",
      lines: [
        { speaker: "David", to: "Abner's messengers", quote: "Well; I will make a league with thee: but one thing I require of thee, that is, Thou shalt not see my face, except thou first bring Michal Saul's daughter, when thou comest to see my face.", ref: "2 Samuel 3:13" },
        { speaker: "David", to: "Ish-bosheth", quote: "Deliver me my wife Michal, which I espoused to me for an hundred foreskins of the Philistines.", ref: "2 Samuel 3:14" },
        { speaker: "Abner", to: "Phaltiel", quote: "Go, return.", ref: "2 Samuel 3:16" }
      ],
      commentary: "David's one condition is Saul's daughter — the marriage that makes any son of theirs heir to both houses, sealed years ago with the grimmest bride-price in Scripture. The politics are flawless, and the text quietly counts their cost: Phaltiel, given no words in all the Bible, walks weeping behind his wife mile after mile to Bahurim until a general's two words send him home. Of Michal — bartered from father to David to Phaltiel and back — the narrator records no feeling at all here; her silence will end in scorn at David's dancing (2 Samuel 6), and that story begins in this one."
    },
    {
      scene: "The gate of Hebron",
      lines: [
        { speaker: "Abner", to: "David", quote: "I will arise and go, and will gather all Israel unto my lord the king, that they may make a league with thee, and that thou mayest reign over all that thine heart desireth.", ref: "2 Samuel 3:21" },
        { speaker: "Joab", to: "David", quote: "What hast thou done? behold, Abner came unto thee; why is it that thou hast sent him away, and he is quite gone? Thou knowest Abner the son of Ner, that he came to deceive thee, and to know thy going out and thy coming in, and to know all that thou doest.", ref: "2 Samuel 3:24–25" },
        { speaker: "The narrator", quote: "And when Abner was returned to Hebron, Joab took him aside in the gate to speak with him quietly, and smote him there under the fifth rib, that he died, for the blood of Asahel his brother.", ref: "2 Samuel 3:27" }
      ],
      commentary: "Three times the text repeats that Abner left David 'in peace' — then Joab arrives. His stated reason is espionage; his real reasons are Asahel's blood and, surely, his own command, for a reconciled Abner would outrank him. Hebron was a city of refuge where an avenger could not lawfully strike, so Joab draws his victim just outside the gate — into the legal shadow — and kills him 'under the fifth rib,' the very wound Abner gave Asahel. But Asahel died in open battle after two warnings; this is not lawful vengeance, it is murder dressed as it."
    },
    {
      scene: "A prince and a great man fallen",
      lines: [
        { speaker: "David", quote: "I and my kingdom are guiltless before the LORD for ever from the blood of Abner the son of Ner: Let it rest on the head of Joab, and on all his father's house.", ref: "2 Samuel 3:28–29" },
        { speaker: "David", quote: "Died Abner as a fool dieth? Thy hands were not bound, nor thy feet put into fetters: as a man falleth before wicked men, so fellest thou.", ref: "2 Samuel 3:33–34" },
        { speaker: "David", to: "his servants", quote: "Know ye not that there is a prince and a great man fallen this day in Israel? And I am this day weak, though anointed king; and these men the sons of Zeruiah be too hard for me: the LORD shall reward the doer of evil according to his wickedness.", ref: "2 Samuel 3:38–39" }
      ],
      commentary: "David stages his innocence with everything he has — a curse on Joab's house, a command that the murderer himself walk mourning before the bier, the king weeping at the grave and fasting till sundown — 'and all the people took notice of it, and it pleased them.' The narrator agrees the king is guiltless, yet lets us hear the cost of that innocence: 'these men the sons of Zeruiah be too hard for me.' David cannot punish the nephew who commands his army; the reckoning is deferred to God — and, on his deathbed, to Solomon (1 Kings 2:5-6). The lament for Abner, like the Song of the Bow, is grief for an enemy sung in earnest."
    }
  ],
  "2s4": [
    {
      "scene": "The head of Ish-bosheth",
      "lines": [
        {
          "speaker": "Rechab and Baanah",
          "to": "David",
          "quote": "Behold the head of Ishbosheth the son of Saul thine enemy, which sought thy life; and the LORD hath avenged my lord the king this day of Saul, and of his seed.",
          "ref": "2 Samuel 4:8"
        },
        {
          "speaker": "David",
          "to": "Rechab and Baanah",
          "quote": "As the LORD liveth, who hath redeemed my soul out of all adversity, When one told me, saying, Behold, Saul is dead, thinking to have brought good tidings, I took hold of him, and slew him in Ziklag, who thought that I would have given him a reward for his tidings:",
          "ref": "2 Samuel 4:9–10"
        },
        {
          "speaker": "David",
          "to": "Rechab and Baanah",
          "quote": "How much more, when wicked men have slain a righteous person in his own house upon his bed? shall I not therefore now require his blood of your hand, and take you away from the earth?",
          "ref": "2 Samuel 4:11"
        }
      ],
      "commentary": "The assassins hand David a head and a theology: the LORD, they say, has done this. David will not take the throne on those terms. His oath opens with the LORD who redeemed his soul 'out of all adversity' — he needs no murderers to finish what God is working slowly and cleanly — and his precedent is exact: the Amalekite of Ziklag died merely for claiming to have killed Saul at Saul's own request. These two butchered a sleeping man in his own house. Note the word David chooses for Abner's puppet, the rival he never recognized as king: 'a righteous person.' In death Ish-bosheth receives from David a dignity he never had in life, and his head is laid in Abner's grave — the two casualties of Saul's falling house buried together at Hebron."
    }
  ],
  "2s5": [
    {
      "scene": "Thy bone and thy flesh",
      "lines": [
        {
          "speaker": "The elders of Israel",
          "to": "David",
          "quote": "Behold, we are thy bone and thy flesh. Also in time past, when Saul was king over us, thou wast he that leddest out and broughtest in Israel: and the LORD said to thee, Thou shalt feed my people Israel, and thou shalt be a captain over Israel.",
          "ref": "2 Samuel 5:1–2"
        }
      ],
      "commentary": "Seven years after Judah, all Israel finally says out loud what the whole book has been narrating: kinship ('thy bone and thy flesh'), proven service ('thou leddest out and broughtest in'), and the LORD's own word. Their verb is the telling one — not rule but feed: 'Thou shalt feed my people Israel,' the shepherd's word, spoken to the man taken from the sheepcote. The anointing at Hebron is David's third — by Samuel in secret, by Judah, now by Israel — and it is bounded by covenant 'before the LORD': this kingship is contractual, not seized. Every death that cleared the way — Saul, Jonathan, Abner, Ish-bosheth — happened without David's hand, and the narrative has labored at every step to let Israel, and the reader, believe it."
    },
    {
      "scene": "The blind and the lame, and the water shaft",
      "lines": [
        {
          "speaker": "The Jebusites",
          "to": "David",
          "quote": "Except thou take away the blind and the lame, thou shalt not come in hither: thinking, David cannot come in hither.",
          "ref": "2 Samuel 5:6"
        },
        {
          "speaker": "David",
          "quote": "Whosoever getteth up to the gutter, and smiteth the Jebusites, and the lame and the blind, that are hated of David's soul, he shall be chief and captain.",
          "ref": "2 Samuel 5:8"
        }
      ],
      "commentary": "The taunt is siege-craft as theater: our walls are so strong the disabled could man them. David's answer turns the taunt into the assault order, and the strange word tsinnor — 'gutter,' a water channel — betrays how the fortress fell: not over the wall but under it, through the shafts that connected the ridge city to its spring outside the wall. The Chronicler adds the name of the man who went up first — Joab, buying back his standing after Abner's murder. First hearers would relish the reversal: the impregnable jest becomes a proverb against the jesters, 'the blind and the lame shall not come into the house.' David has done what Joshua and four centuries could not, and he did it with his own men, for a city owing nothing to any tribe."
    },
    {
      "scene": "A going in the tops of the mulberry trees",
      "lines": [
        {
          "speaker": "David",
          "to": "the LORD",
          "quote": "Shall I go up to the Philistines? wilt thou deliver them into mine hand?",
          "ref": "2 Samuel 5:19"
        },
        {
          "speaker": "The LORD",
          "to": "David",
          "quote": "Thou shalt not go up; but fetch a compass behind them, and come upon them over against the mulberry trees. And let it be, when thou hearest the sound of a going in the tops of the mulberry trees, that then thou shalt bestir thyself: for then shall the LORD go out before thee, to smite the host of the Philistines.",
          "ref": "2 Samuel 5:23–24"
        }
      ],
      "commentary": "Twice the Philistines come up, and twice David does what Saul fatally stopped doing — he enquires of the LORD, and obeys the answer even when it changes. The first victory names a place: Baal-perazim, 'the lord of breakings forth,' for 'the LORD hath broken forth upon mine enemies before me, as the breach of waters' — and the fleeing Philistines abandon their idols, which David's men carry off, Ebenezer inverted at last: now it is the gods of Philistia that are captured. The second battle is stranger and better: wait for the sound of marching in the treetops, 'for then shall the LORD go out before thee.' The unseen army moves first; Israel's part is to listen for it. Between these two battles David the empire-builder is still, at bottom, the boy who asked leave before facing Goliath."
    }
  ],
  "2s6": [
    {
      "scene": "The breach upon Uzzah",
      "lines": [
        {
          "speaker": "The narrator",
          "quote": "And when they came to Nachon's threshingfloor, Uzzah put forth his hand to the ark of God, and took hold of it; for the oxen shook it.",
          "ref": "2 Samuel 6:6"
        },
        {
          "speaker": "David",
          "quote": "How shall the ark of the LORD come to me?",
          "ref": "2 Samuel 6:9"
        }
      ],
      "commentary": "A stumble, a reflex, a corpse beside the ark — and the music stops. Uzzah's instinct is the most natural in the world, which is exactly the problem the story poses: the ark had lived in his father's house so long it had become familiar, furniture to be steadied, and the whole procession — the new cart, the Philistine method — treats the throne of the LORD of hosts as cargo. The law had said shoulders, staves, Kohathites, and never touch (Numbers 4). David's anger flares first, then curdles into the right question, the one Beth-shemesh asked a generation before: who is able to stand before this holy LORD God? The three months at Obed-edom's house answer it gently — the ark blesses a household that simply receives it — and the second procession, six paces and a sacrifice, gets the order right."
    },
    {
      "scene": "Michal at the window",
      "lines": [
        {
          "speaker": "Michal",
          "to": "David",
          "quote": "How glorious was the king of Israel to day, who uncovered himself to day in the eyes of the handmaids of his servants, as one of the vain fellows shamelessly uncovereth himself!",
          "ref": "2 Samuel 6:20"
        },
        {
          "speaker": "David",
          "to": "Michal",
          "quote": "It was before the LORD, which chose me before thy father, and before all his house, to appoint me ruler over the people of the LORD, over Israel: therefore will I play before the LORD.",
          "ref": "2 Samuel 6:21"
        },
        {
          "speaker": "David",
          "to": "Michal",
          "quote": "And I will yet be more vile than thus, and will be base in mine own sight: and of the maidservants which thou hast spoken of, of them shall I be had in honour.",
          "ref": "2 Samuel 6:22"
        },
        {
          "speaker": "The narrator",
          "quote": "Therefore Michal the daughter of Saul had no child unto the day of her death.",
          "ref": "2 Samuel 6:23"
        }
      ],
      "commentary": "She once loved him and saved his life through a window (1 Samuel 19:12); now a window frames her contempt. The narrator pointedly calls her 'the daughter of Saul' — she speaks here for her father's whole idea of kingship, the dignity that must be kept before the people, and her sarcasm ('how glorious was the king!') defends a throne's decorum against a king in a linen ephod leaping like a commoner. David's reply is merciless in its history — 'which chose me before thy father' — and radical in its theology: before the LORD, self-abasement is glory, and the handmaids will understand what a princess cannot. The last verse is quietly final. Whether by God's judgment or David's estrangement, no child of Saul's line will sit on David's throne; the two houses, joined in this marriage, part in this quarrel."
    }
  ],
  "2s7": [
    {
      "scene": "Shalt thou build me an house?",
      "lines": [
        {
          "speaker": "David",
          "to": "Nathan",
          "quote": "See now, I dwell in an house of cedar, but the ark of God dwelleth within curtains.",
          "ref": "2 Samuel 7:2"
        },
        {
          "speaker": "Nathan",
          "to": "David",
          "quote": "Go, do all that is in thine heart; for the LORD is with thee.",
          "ref": "2 Samuel 7:3"
        },
        {
          "speaker": "The LORD",
          "to": "Nathan",
          "quote": "Go and tell my servant David, Thus saith the LORD, Shalt thou build me an house for me to dwell in?",
          "ref": "2 Samuel 7:5"
        },
        {
          "speaker": "The LORD",
          "to": "Nathan",
          "quote": "Also the LORD telleth thee that he will make thee an house. And when thy days be fulfilled, and thou shalt sleep with thy fathers, I will set up thy seed after thee, which shall proceed out of thy bowels, and I will establish his kingdom. He shall build an house for my name, and I will stablish the throne of his kingdom for ever.",
          "ref": "2 Samuel 7:11–13"
        }
      ],
      "commentary": "Nathan enters the story approving the king's plan, and that same night learns the first lesson of his office: a prophet's blessing is not the word of the LORD. The oracle's opening question drips gentle irony — has God, who walked in a tent from Egypt to this day, ever once asked for cedar? Every king in the ancient world proved himself by building his god a house; this God reverses the transaction on a pun that carries the chapter: David shall not build the LORD a bayit — a temple — but the LORD will build David a bayit, a dynasty. The promise even outruns obedience: the son who sins will be chastened 'with the rod of men,' but the mercy that departed from Saul shall not depart from him. Israel's future is anchored not in David's performance but in God's oath — and every later hope of a Messiah, son of David, is drawing on this night."
    },
    {
      "scene": "Who am I, O Lord GOD?",
      "lines": [
        {
          "speaker": "David",
          "to": "the LORD",
          "quote": "Who am I, O Lord GOD? and what is my house, that thou hast brought me hitherto?",
          "ref": "2 Samuel 7:18"
        },
        {
          "speaker": "David",
          "to": "the LORD",
          "quote": "Wherefore thou art great, O LORD God: for there is none like thee, neither is there any God beside thee, according to all that we have heard with our ears.",
          "ref": "2 Samuel 7:22"
        },
        {
          "speaker": "David",
          "to": "the LORD",
          "quote": "Therefore now let it please thee to bless the house of thy servant, that it may continue for ever before thee: for thou, O Lord GOD, hast spoken it: and with thy blessing let the house of thy servant be blessed for ever.",
          "ref": "2 Samuel 7:29"
        }
      ],
      "commentary": "David 'went in, and sat before the LORD' — before the ark in its tent, the very curtains he wanted to replace — and the posture tells everything: not standing to negotiate but sitting to receive. The prayer never once asks God to reconsider the refusal. It begins where all true prayer begins, in astonishment at grace ('Who am I?'), widens into praise of the God who redeemed a nation for Himself out of Egypt, and ends by doing the boldest thing a creature can do with a promise: handing it back. 'Thou hast spoken it' — David asks for nothing God has not already offered, and asks for all of it. A first hearer would notice that the shepherd who refused to seize Saul's kingdom now refuses, in a sense, to seize even his own: the house of David will stand because God builds it, or not at all."
    }
  ],
  "2s8": [
    {
      "scene": "The LORD preserved David whithersoever he went",
      "lines": [
        {
          "speaker": "The narrator",
          "quote": "And David smote them, and houghed all the chariot horses, but reserved of them for an hundred chariots.",
          "ref": "2 Samuel 8:4"
        },
        {
          "speaker": "The narrator",
          "quote": "Then David put garrisons in Syria of Damascus: and the Syrians became servants to David, and brought gifts. And the LORD preserved David whithersoever he went.",
          "ref": "2 Samuel 8:6"
        },
        {
          "speaker": "The narrator",
          "quote": "And David reigned over all Israel; and David executed judgment and justice unto all his people.",
          "ref": "2 Samuel 8:15"
        }
      ],
      "commentary": "No speeches survive from these campaigns; the chapter is all verbs and geography, an empire assembled in a paragraph — Philistia, Moab, Zobah, Damascus, Edom, tribute from Hamath. But the narrator plants his refrain twice, like a signature: 'the LORD preserved David whithersoever he went.' The victories are gift, not genius. Two details keep the portrait honest: the measuring line laid on Moab is warfare at its ancient harshest, reported without flinching, and the houghed chariot horses honor the old command that Israel's king trust no cavalry. Everything of gold, silver, and brass goes to the LORD — the treasury Solomon will spend on the temple David could not build. And the summary verse the whole account has been driving toward is not about conquest: David 'executed judgment and justice unto all his people.' The shepherd-king's real throne is the courtroom, not the battlefield — which makes the failure of justice in his own house, soon to come, the true tragedy of the book."
    }
  ],
  "2s9": [
    {
      "scene": "Is there yet any left of the house of Saul?",
      "lines": [
        {
          "speaker": "David",
          "quote": "Is there yet any that is left of the house of Saul, that I may shew him kindness for Jonathan's sake?",
          "ref": "2 Samuel 9:1"
        },
        {
          "speaker": "Ziba",
          "to": "David",
          "quote": "Jonathan hath yet a son, which is lame on his feet.",
          "ref": "2 Samuel 9:3"
        },
        {
          "speaker": "David",
          "to": "Ziba",
          "quote": "Where is he?",
          "ref": "2 Samuel 9:4"
        },
        {
          "speaker": "Ziba",
          "to": "David",
          "quote": "Behold, he is in the house of Machir, the son of Ammiel, in Lodebar.",
          "ref": "2 Samuel 9:4"
        }
      ],
      "commentary": "A new king asking after survivors of the old dynasty normally meant one thing, and every hearer knew it: the purge. The question's ending overturns the genre — 'that I may shew him kindness for Jonathan's sake.' The dead friend's name governs the whole chapter; the oath of 1 Samuel 20 has outlived the man who asked it. Ziba's answer carries a quiet qualification — 'lame on his feet' — as if to say: harmless, no threat to you. That a servant thinks the detail worth volunteering shows what answer he expected the king to want."
    },
    {
      "scene": "As one of the king's sons",
      "lines": [
        {
          "speaker": "David",
          "quote": "Mephibosheth.",
          "ref": "2 Samuel 9:6"
        },
        {
          "speaker": "Mephibosheth",
          "to": "David",
          "quote": "Behold thy servant!",
          "ref": "2 Samuel 9:6"
        },
        {
          "speaker": "David",
          "to": "Mephibosheth",
          "quote": "Fear not: for I will surely shew thee kindness for Jonathan thy father's sake, and will restore thee all the land of Saul thy father; and thou shalt eat bread at my table continually.",
          "ref": "2 Samuel 9:7"
        },
        {
          "speaker": "Mephibosheth",
          "to": "David",
          "quote": "What is thy servant, that thou shouldest look upon such a dead dog as I am?",
          "ref": "2 Samuel 9:8"
        }
      ],
      "commentary": "'Fear not' is the first thing said to a man lying face-down expecting execution. What follows is grace in three movements: restoration of land, provision of labor, and — beyond anything owed — a permanent place at the king's own table, 'as one of the king's sons.' Mephibosheth's 'dead dog' is the exile's self-estimate, the same phrase David once used of himself before Saul (1 Samuel 24:14): the hunted man now seats the hunted man. The chapter's last line will not let us forget the cost carried to that table — 'and was lame on both his feet' — weakness dining daily on covenant kindness."
    }
  ],
  "2s10": [
    {
      "scene": "The insult at Rabbah",
      "lines": [
        {
          "speaker": "David",
          "quote": "I will shew kindness unto Hanun the son of Nahash, as his father shewed kindness unto me.",
          "ref": "2 Samuel 10:2"
        },
        {
          "speaker": "The princes of Ammon",
          "to": "Hanun",
          "quote": "Thinkest thou that David doth honour thy father, that he hath sent comforters unto thee? hath not David rather sent his servants unto thee, to search the city, and to spy it out, and to overthrow it?",
          "ref": "2 Samuel 10:3"
        },
        {
          "speaker": "David",
          "to": "his envoys",
          "quote": "Tarry at Jericho until your beards be grown, and then return.",
          "ref": "2 Samuel 10:5"
        }
      ],
      "commentary": "The chapter opens with the same word that governed chapter 9 — kindness, hesed — offered now across a border, and suspicion strangles it in the cradle. Hanun's counselors read condolence as espionage, and the young king's response is calculated degradation: half a beard shaved, garments cut away, ambassadors sent home like stripped prisoners. In that world the outrage could not be private; it 'stank,' the text says, and Ammon knew it and armed. David's one recorded sentence is all restraint and dignity — wait at Jericho, out of sight, until the shame grows out. The war that will one day carry Uriah's name begins here, in a funeral misread."
    },
    {
      "scene": "The LORD do that which seemeth him good",
      "lines": [
        {
          "speaker": "Joab",
          "to": "Abishai",
          "quote": "If the Syrians be too strong for me, then thou shalt help me: but if the children of Ammon be too strong for thee, then I will come and help thee.",
          "ref": "2 Samuel 10:11"
        },
        {
          "speaker": "Joab",
          "to": "Abishai",
          "quote": "Be of good courage, and let us play the men for our people, and for the cities of our God: and the LORD do that which seemeth him good.",
          "ref": "2 Samuel 10:12"
        }
      ],
      "commentary": "Caught between the Ammonites at the gate and the hired Syrians in the field, Joab does the coldly correct thing — divides his force with his brother and binds each to the other's rescue — and then says the most pious sentence he will ever speak. From this ruthless man it lands with peculiar force: fight your utmost for people and for the cities of our God, and leave the verdict to the LORD. It is the soldier's whole theology in one line, with no promise of victory attached. The next chapter will show the same Joab receiving a very different kind of order outside these same walls, and obeying that one too."
    }
  ],
  "2s11": [
    {
      "scene": "The rooftop and the sentence",
      "lines": [
        {
          "speaker": "The narrator",
          "quote": "And it came to pass in an eveningtide, that David arose from off his bed, and walked upon the roof of the king's house: and from the roof he saw a woman washing herself; and the woman was very beautiful to look upon.",
          "ref": "2 Samuel 11:2"
        },
        {
          "speaker": "A servant",
          "to": "David",
          "quote": "Is not this Bathsheba, the daughter of Eliam, the wife of Uriah the Hittite?",
          "ref": "2 Samuel 11:3"
        },
        {
          "speaker": "Bathsheba",
          "to": "David",
          "quote": "I am with child.",
          "ref": "2 Samuel 11:5"
        }
      ],
      "commentary": "The narrator has already told us where the king should be — at Rabbah, where kings go forth — and shows him instead rising from his bed at evening. The servant's answer to David's inquiry is quietly a warning, framed as a question: she has a name, a father, and a husband, and the husband is one of David's own soldiers. The king 'sent, and took': the verbs of power, and against a summons from the throne a subject had little means of refusal — the text lays the weight of the act on David alone. Bathsheba's entire speech in the chapter is one sentence of three Hebrew words, and it detonates everything that follows."
    },
    {
      "scene": "Uriah will not go down to his house",
      "lines": [
        {
          "speaker": "Uriah",
          "to": "David",
          "quote": "The ark, and Israel, and Judah, abide in tents; and my lord Joab, and the servants of my lord, are encamped in the open fields; shall I then go into mine house, to eat and to drink, and to lie with my wife? as thou livest, and as thy soul liveth, I will not do this thing.",
          "ref": "2 Samuel 11:11"
        },
        {
          "speaker": "The narrator",
          "quote": "And it came to pass in the morning, that David wrote a letter to Joab, and sent it by the hand of Uriah.",
          "ref": "2 Samuel 11:14"
        },
        {
          "speaker": "David",
          "to": "Joab (by letter)",
          "quote": "Set ye Uriah in the forefront of the hottest battle, and retire ye from him, that he may be smitten, and die.",
          "ref": "2 Samuel 11:15"
        }
      ],
      "commentary": "Uriah's refusal is the moral center of the chapter, and every clause condemns the man he is speaking to. The ark in a tent, Israel in the field, Joab in the open country — how could he take his ease at home? The foreigner keeps the consecration of the camp that the king of Israel has broken in his own palace. Whether Uriah suspects anything the text never says; his integrity needs no motive. So the third scheme: a sealed death warrant carried to the executioner by its victim's own faithful hand — precisely because David knows this man will not break a seal or shirk a duty. Uriah's loyalty becomes the instrument of his murder."
    },
    {
      "scene": "The sword devoureth one as well as another",
      "lines": [
        {
          "speaker": "David",
          "to": "the messenger",
          "quote": "Thus shalt thou say unto Joab, Let not this thing displease thee, for the sword devoureth one as well as another: make thy battle more strong against the city, and overthrow it: and encourage thou him.",
          "ref": "2 Samuel 11:25"
        },
        {
          "speaker": "The narrator",
          "quote": "But the thing that David had done displeased the LORD.",
          "ref": "2 Samuel 11:27"
        }
      ],
      "commentary": "David's message to Joab is a shrug over dead men — Uriah did not fall alone; other soldiers died in the deliberately botched assault that covered his killing. 'The sword devoureth one as well as another' is the fatalism of a king covering murder with the vocabulary of chance. The narrator lets the cover-up succeed completely: the mourning ends, the wedding follows, the son is born, and no human voice in Israel says a word. Then the chapter's last line quietly turns the same verb against the king — David asked that the thing not 'displease' Joab, but the thing David had done displeased the LORD. One witness saw everything, and chapter 12 is His summons."
    }
  ],
  "2s12": [
    {
      "scene": "The ewe lamb",
      "lines": [
        {
          "speaker": "Nathan",
          "to": "David",
          "quote": "There were two men in one city; the one rich, and the other poor. The rich man had exceeding many flocks and herds: But the poor man had nothing, save one little ewe lamb, which he had bought and nourished up: and it grew up together with him, and with his children; it did eat of his own meat, and drank of his own cup, and lay in his bosom, and was unto him as a daughter.",
          "ref": "2 Samuel 12:1–3"
        },
        {
          "speaker": "Nathan",
          "to": "David",
          "quote": "And there came a traveller unto the rich man, and he spared to take of his own flock and of his own herd, to dress for the wayfaring man that was come unto him; but took the poor man's lamb, and dressed it for the man that was come to him.",
          "ref": "2 Samuel 12:4"
        },
        {
          "speaker": "David",
          "to": "Nathan",
          "quote": "As the LORD liveth, the man that hath done this thing shall surely die: And he shall restore the lamb fourfold, because he did this thing, and because he had no pity.",
          "ref": "2 Samuel 12:5–6"
        }
      ],
      "commentary": "Nathan comes to an absolute monarch whom no court can try, and brings the one weapon that can reach him: a story. It sounds like a legal case brought for royal judgment — kings heard such appeals daily — and its details are aimed with terrible precision: the lamb eats of the poor man's meat and drinks of his cup and lies in his bosom, tender domestic language for a wife, and 'as a daughter' puns in Hebrew on Bathsheba's own name (bath, daughter). David, who showed no pity, condemns the man who 'had no pity,' and even names the Torah's fourfold restitution for a stolen sheep. The shepherd-king has passed sentence; he does not yet know on whom."
    },
    {
      "scene": "Thou art the man",
      "lines": [
        {
          "speaker": "Nathan",
          "to": "David",
          "quote": "Thou art the man. Thus saith the LORD God of Israel, I anointed thee king over Israel, and I delivered thee out of the hand of Saul;",
          "ref": "2 Samuel 12:7"
        },
        {
          "speaker": "Nathan",
          "to": "David",
          "quote": "Wherefore hast thou despised the commandment of the LORD, to do evil in his sight? thou hast killed Uriah the Hittite with the sword, and hast taken his wife to be thy wife, and hast slain him with the sword of the children of Ammon. Now therefore the sword shall never depart from thine house.",
          "ref": "2 Samuel 12:9–10"
        },
        {
          "speaker": "David",
          "to": "Nathan",
          "quote": "I have sinned against the LORD.",
          "ref": "2 Samuel 12:13"
        },
        {
          "speaker": "Nathan",
          "to": "David",
          "quote": "The LORD also hath put away thy sin; thou shalt not die. Howbeit, because by this deed thou hast given great occasion to the enemies of the LORD to blaspheme, the child also that is born unto thee shall surely die.",
          "ref": "2 Samuel 12:13–14"
        }
      ],
      "commentary": "Three words in Hebrew — attah ha-ish, 'thou art the man' — and the trap closes on the judge. The oracle names the crimes without euphemism, killed and taken, and traces them not to lust first but to contempt: 'wherefore hast thou despised the commandment of the LORD?' David's confession is as short as the accusation, and it is everything — Saul, confronted by Samuel, argued and excused for a whole chapter; David says two words, chatati laYHWH, 'I have sinned against the LORD.' Psalm 51 is this moment expanded into prayer. Forgiveness is instant and real, and consequence stands untouched: the sword never departs, and the rest of 2 Samuel is that sentence executing itself."
    },
    {
      "scene": "I shall go to him",
      "lines": [
        {
          "speaker": "David's servants",
          "to": "David",
          "quote": "What thing is this that thou hast done? thou didst fast and weep for the child, while it was alive; but when the child was dead, thou didst rise and eat bread.",
          "ref": "2 Samuel 12:21"
        },
        {
          "speaker": "David",
          "to": "his servants",
          "quote": "While the child was yet alive, I fasted and wept: for I said, Who can tell whether GOD will be gracious to me, that the child may live? But now he is dead, wherefore should I fast? can I bring him back again? I shall go to him, but he shall not return to me.",
          "ref": "2 Samuel 12:22–23"
        }
      ],
      "commentary": "The servants are bewildered because David has run mourning backwards: fasting and lying on the earth belonged after a death, and here is the king rising from seven days of it to wash, worship, and eat at the news itself. His answer is one of the most quoted sentences of grief in Scripture. The fast was not mourning but petition — 'who can tell whether GOD will be gracious?' — and when the answer came, he stopped asking and worshipped. 'I shall go to him' is spare, unexplained hope on the far side of judgment. Then comfort given to Bathsheba, and a second son: Solomon, whom the LORD loved, renamed by the same prophet who said 'thou art the man' — Jedidiah, beloved of the LORD. Grace gets the last name in the chapter."
    }
  ],
  "2s13": [
    {
      "scene": "Tamar's plea",
      "lines": [
        {
          "speaker": "Tamar",
          "to": "Amnon",
          "quote": "Nay, my brother, do not force me; for no such thing ought to be done in Israel: do not thou this folly.",
          "ref": "2 Samuel 13:12"
        },
        {
          "speaker": "Tamar",
          "to": "Amnon",
          "quote": "And I, whither shall I cause my shame to go? and as for thee, thou shalt be as one of the fools in Israel. Now therefore, I pray thee, speak unto the king; for he will not withhold me from thee.",
          "ref": "2 Samuel 13:13"
        },
        {
          "speaker": "The narrator",
          "quote": "Howbeit he would not hearken unto her voice: but, being stronger than she, forced her.",
          "ref": "2 Samuel 13:14"
        }
      ],
      "commentary": "Tamar is the only person in this chapter who speaks with wisdom, and the text gives her plea in full so that no hearer can mistake what is happening. She reasons on every ground at once — the law of Israel, her own future, even Amnon's standing, offering him a way to have what he claims to want lawfully — and every word is right. 'Folly' (nebalah) is the Bible's word for outrage against the covenant community itself, the word used of the crime at Gibeah (Judges 19-20). He is stronger than she: that is the entire moral content of what follows. The narrator honors her voice precisely by recording it; the shame belongs wholly to the one who would not hearken."
    },
    {
      "scene": "A hatred greater than the love",
      "lines": [
        {
          "speaker": "Tamar",
          "to": "Amnon",
          "quote": "There is no cause: this evil in sending me away is greater than the other that thou didst unto me.",
          "ref": "2 Samuel 13:16"
        },
        {
          "speaker": "Absalom",
          "to": "Tamar",
          "quote": "Hath Amnon thy brother been with thee? but hold now thy peace, my sister: he is thy brother; regard not this thing.",
          "ref": "2 Samuel 13:20"
        },
        {
          "speaker": "The narrator",
          "quote": "So Tamar remained desolate in her brother Absalom's house.",
          "ref": "2 Samuel 13:20"
        }
      ],
      "commentary": "Amnon's 'love' is exposed as mere appetite the instant it is sated: it inverts into loathing, and he compounds the crime by casting Tamar out — under the law (Deuteronomy 22:28-29) he now owed her lifelong protection, and expulsion brands her publicly with a guilt that is his. Tamar sees this with the same clarity she showed before: the sending away is 'greater than the other.' Then the men fail her in sequence — Absalom counsels silence while nursing his own vengeance, and David, though very wroth, does nothing at all. A king who cannot judge his firstborn has abdicated exactly where Absalom will soon set up shop: at the seat of justice. 'Desolate' is the last word the Bible speaks of Tamar; Absalom named his own daughter for her (2 Samuel 14:27)."
    },
    {
      "scene": "The sheep-shearing at Baal-hazor",
      "lines": [
        {
          "speaker": "Absalom",
          "to": "his servants",
          "quote": "Mark ye now when Amnon's heart is merry with wine, and when I say unto you, Smite Amnon; then kill him, fear not: have not I commanded you? be courageous, and be valiant.",
          "ref": "2 Samuel 13:28"
        },
        {
          "speaker": "Jonadab",
          "to": "David",
          "quote": "Let not my lord suppose that they have slain all the young men the king's sons; for Amnon only is dead: for by the appointment of Absalom this hath been determined from the day that he forced his sister Tamar.",
          "ref": "2 Samuel 13:32"
        }
      ],
      "commentary": "Two full years of silence, then a feast, wine, and a single command — Absalom's revenge has the patience and stagecraft that will later mark his revolt. The first wild report says all the king's sons are dead, and it is Jonadab, of all people, who calmly corrects it: Amnon only, determined 'from the day that he forced his sister Tamar.' The schemer who set the tragedy in motion has known the whole time what was coming, and says so without a flicker of remorse. Nathan's oracle is now executing itself: the sword has entered David's house, one son dead by another's order, and the survivor fled to Geshur — beyond the king's reach, but not beyond his longing, for 'David mourned for his son every day.'"
    }
  ],
  "2s14": [
    {
      "scene": "The widow of Tekoah's parable",
      "lines": [
        {
          "speaker": "The wise woman of Tekoah",
          "to": "David",
          "quote": "And they said, Deliver him that smote his brother, that we may kill him, for the life of his brother whom he slew … and so they shall quench my coal which is left, and shall not leave to my husband neither name nor remainder upon the earth.",
          "ref": "2 Samuel 14:7"
        },
        {
          "speaker": "The wise woman of Tekoah",
          "to": "David",
          "quote": "For we must needs die, and are as water spilt on the ground, which cannot be gathered up again; neither doth God respect any person: yet doth he devise means, that his banished be not expelled from him.",
          "ref": "2 Samuel 14:14"
        },
        {
          "speaker": "David",
          "to": "the wise woman",
          "quote": "Is not the hand of Joab with thee in all this?",
          "ref": "2 Samuel 14:19"
        }
      ],
      "commentary": "Joab does to David what Nathan did: catches the king in a story and lets him convict himself. The widow's case — one son dead, the clan demanding the killer's life, her last coal about to be quenched — forces David to rank mercy above strict blood-vengeance; then she turns the ruling on him, for he keeps his own 'banished' abroad. Her word about water spilt on the ground is the most quoted line she speaks, and the most double-edged: death is irreversible, so restore the living son while you can — yet God himself 'doth devise means, that his banished be not expelled from him,' a sentence that reaches far beyond Absalom. David, once fooled by Nathan, is not fooled twice; he smells Joab immediately. But he grants the request anyway — half-heartedly, and half-measures with Absalom prove more dangerous than either firmness or grace."
    },
    {
      "scene": "The burnt field and the kiss",
      "lines": [
        {
          "speaker": "The king",
          "quote": "Let him turn to his own house, and let him not see my face.",
          "ref": "2 Samuel 14:24"
        },
        {
          "speaker": "Absalom",
          "to": "his servants",
          "quote": "See, Joab's field is near mine, and he hath barley there; go and set it on fire.",
          "ref": "2 Samuel 14:30"
        },
        {
          "speaker": "Absalom",
          "to": "Joab",
          "quote": "Wherefore am I come from Geshur? it had been good for me to have been there still: now therefore let me see the king's face; and if there be any iniquity in me, let him kill me.",
          "ref": "2 Samuel 14:32"
        },
        {
          "speaker": "The narrator",
          "quote": "And he bowed himself on his face to the ground before the king: and the king kissed Absalom.",
          "ref": "2 Samuel 14:33"
        }
      ],
      "commentary": "David's compromise — home, but banished from the royal face — is the worst of both worlds: neither the justice that would answer Amnon's blood nor the forgiveness that might win a son. Between the decree and the kiss the narrator inserts the portrait: no blemish from sole to crown, and hair cut yearly at two hundred shekels' weight — Israel is already half in love with him. Absalom's method with Joab is pure Absalom: two refusals, so burn the man's barley, and it works. Note what his demand does not contain — 'if there be any iniquity in me' is a challenge, not a confession; there is no word of Amnon, of Tamar, or of sorrow. So the kiss of restoration seals nothing. Within the year the restored son is standing in the gate, stealing the hearts of Israel."
    }
  ],
  "2s15": [
    {
      "scene": "Stealing hearts at the gate",
      "lines": [
        {
          "speaker": "Absalom",
          "to": "every man with a suit",
          "quote": "See, thy matters are good and right; but there is no man deputed of the king to hear thee.",
          "ref": "2 Samuel 15:3"
        },
        {
          "speaker": "Absalom",
          "quote": "Oh that I were made judge in the land, that every man which hath any suit or cause might come unto me, and I would do him justice!",
          "ref": "2 Samuel 15:4"
        },
        {
          "speaker": "Absalom",
          "to": "David",
          "quote": "I pray thee, let me go and pay my vow, which I have vowed unto the LORD, in Hebron.",
          "ref": "2 Samuel 15:7"
        },
        {
          "speaker": "The conspirators' cry",
          "quote": "Absalom reigneth in Hebron.",
          "ref": "2 Samuel 15:10"
        }
      ],
      "commentary": "The gate was Israel's courtroom, and Absalom's genius is to campaign exactly where David has left a vacuum — the aging king who once judged so poorly in his own house now, apparently, deputes no one to judge at all. Every element is theater: the early rising, the flattery ('thy matters are good and right'), the refusal of obeisance, the democratic handshake and kiss. He never promises anything but justice, and never delivers any. A first hearer would wince at the vow — Absalom wraps his treason in piety, invoking the LORD's name to borrow his father's blessing on the road to Hebron, the city where David was first crowned and Absalom was born. Two hundred guests go 'in their simplicity,' knowing nothing: the conspiracy hides in plain sight, inside a feast, just like the killing of Amnon."
    },
    {
      "scene": "Ittai's oath at the Kidron",
      "lines": [
        {
          "speaker": "David",
          "to": "Ittai",
          "quote": "Wherefore goest thou also with us? return to thy place, and abide with the king: for thou art a stranger, and also an exile.",
          "ref": "2 Samuel 15:19"
        },
        {
          "speaker": "Ittai",
          "to": "David",
          "quote": "As the LORD liveth, and as my lord the king liveth, surely in what place my lord the king shall be, whether in death or life, even there also will thy servant be.",
          "ref": "2 Samuel 15:21"
        }
      ],
      "commentary": "At the lowest hour of David's reign, the most ringing loyalty comes from a Philistine of Gath — Goliath's own city — who arrived only yesterday. David's offer of release is genuinely generous: go back, serve the new king, take your brethren, 'mercy and truth be with thee.' Ittai answers with a covenant oath in the LORD's name, echoing Ruth the Moabitess almost word for word — whither thou goest, in death or life. The scene quietly reverses years of history: the man who once fled to Gath from an anointed king now receives from Gath the fidelity his own son and his own counselor have abandoned. Israel's hearts have been stolen by a native prince; the foreigner's heart cannot be. David will trust Ittai with a third of his army in the decisive battle (2 Samuel 18:2)."
    },
    {
      "scene": "The ark sent back, the ascent of Olivet",
      "lines": [
        {
          "speaker": "David",
          "to": "Zadok",
          "quote": "Carry back the ark of God into the city: if I shall find favour in the eyes of the LORD, he will bring me again, and shew me both it, and his habitation: But if he thus say, I have no delight in thee; behold, here am I, let him do to me as seemeth good unto him.",
          "ref": "2 Samuel 15:25–26"
        },
        {
          "speaker": "David",
          "quote": "O LORD, I pray thee, turn the counsel of Ahithophel into foolishness.",
          "ref": "2 Samuel 15:31"
        },
        {
          "speaker": "David",
          "to": "Hushai",
          "quote": "But if thou return to the city, and say unto Absalom, I will be thy servant, O king; as I have been thy father's servant hitherto, so will I now also be thy servant: then mayest thou for me defeat the counsel of Ahithophel.",
          "ref": "2 Samuel 15:34"
        }
      ],
      "commentary": "Refusing to carry the ark is David at his spiritual best: he will not use God as a talisman, as Israel fatally did at Ebenezer (1 Samuel 4). 'Let him do to me as seemeth good unto him' — the king under judgment accepts the judgment, and that surrender is precisely what distinguishes this fleeing David from the falling Saul. The ascent of Olivet, barefoot, head covered, weeping, is Israel's king as public penitent. Then the chapter's hinge: one sentence of prayer against Ahithophel, and before David reaches the summit, Hushai appears — the answer arriving with sandals on, for God's providence in these chapters works entirely through loyal friends, staged messengers, and well-timed conversations. Sending Hushai back to speak false fealty is the prayer and the stratagem in one; chapter 17 will show which counsel prevails, and why."
    }
  ],
  "2s16": [
    {
      "scene": "Ziba's asses and Ziba's story",
      "lines": [
        {
          "speaker": "David",
          "to": "Ziba",
          "quote": "What meanest thou by these?",
          "ref": "2 Samuel 16:2"
        },
        {
          "speaker": "Ziba",
          "to": "David",
          "quote": "The asses be for the king's household to ride on; and the bread and summer fruit for the young men to eat; and the wine, that such as be faint in the wilderness may drink.",
          "ref": "2 Samuel 16:2"
        },
        {
          "speaker": "David",
          "to": "Ziba",
          "quote": "And where is thy master's son?",
          "ref": "2 Samuel 16:3"
        },
        {
          "speaker": "Ziba",
          "to": "David",
          "quote": "Behold, he abideth at Jerusalem: for he said, To day shall the house of Israel restore me the kingdom of my father.",
          "ref": "2 Samuel 16:3"
        },
        {
          "speaker": "David",
          "to": "Ziba",
          "quote": "Behold, thine are all that pertained unto Mephibosheth.",
          "ref": "2 Samuel 16:4"
        }
      ],
      "commentary": "Ziba arrives with exactly what a fleeing column needs, at exactly the right moment — provision as theater, timed like a professional's. His story is absurd on its face: no faction in Israel is dreaming of restoring Saul's crippled grandson, least of all Absalom's. But David is exhausted, betrayed by one son already, and the slander lands. Without hearing the accused, the king transfers the whole estate he had solemnly granted in chapter 9. It is the low point of David's judgment in the flight, and the narrator quietly lets it stand until Mephibosheth's unkempt face confronts it at the Jordan (19:24-30). Even generous kings can be bought with kindness when they are afraid."
    },
    {
      "scene": "Come out, thou bloody man",
      "lines": [
        {
          "speaker": "Shimei",
          "to": "David",
          "quote": "Come out, come out, thou bloody man, and thou man of Belial: The LORD hath returned upon thee all the blood of the house of Saul, in whose stead thou hast reigned; and the LORD hath delivered the kingdom into the hand of Absalom thy son: and, behold, thou art taken in thy mischief, because thou art a bloody man.",
          "ref": "2 Samuel 16:7–8"
        },
        {
          "speaker": "Abishai",
          "to": "David",
          "quote": "Why should this dead dog curse my lord the king? let me go over, I pray thee, and take off his head.",
          "ref": "2 Samuel 16:9"
        },
        {
          "speaker": "David",
          "to": "Abishai",
          "quote": "What have I to do with you, ye sons of Zeruiah? so let him curse, because the LORD hath said unto him, Curse David. Who shall then say, Wherefore hast thou done so?",
          "ref": "2 Samuel 16:10"
        },
        {
          "speaker": "David",
          "quote": "It may be that the LORD will look on mine affliction, and that the LORD will requite me good for his cursing this day.",
          "ref": "2 Samuel 16:12"
        }
      ],
      "commentary": "Shimei's theology is wrong — David is guiltless of Saul's blood, as the whole narrative has labored to show — but David does not say so. The man who once ran at Goliath now walks under a rain of stones and dust and forbids his own protection. His reasoning is the most searching in the book: my own son seeks my life; how much more this Benjamite? Perhaps the LORD bade him. Since Nathan's 'thou art the man,' David has stopped defending himself against heaven, and he receives the curse as possibly deserved even where it is factually false. Abishai's offer echoes his old offer to pin Saul with one spear-stroke (1 Samuel 26:8) — and gets the same refusal, for the same reason: vengeance belongs to the LORD."
    },
    {
      "scene": "God save the king",
      "lines": [
        {
          "speaker": "Hushai",
          "to": "Absalom",
          "quote": "God save the king, God save the king.",
          "ref": "2 Samuel 16:16"
        },
        {
          "speaker": "Absalom",
          "to": "Hushai",
          "quote": "Is this thy kindness to thy friend? why wentest thou not with thy friend?",
          "ref": "2 Samuel 16:17"
        },
        {
          "speaker": "Hushai",
          "to": "Absalom",
          "quote": "Nay; but whom the LORD, and this people, and all the men of Israel, choose, his will I be, and with him will I abide.",
          "ref": "2 Samuel 16:18"
        },
        {
          "speaker": "Ahithophel",
          "to": "Absalom",
          "quote": "Go in unto thy father's concubines, which he hath left to keep the house; and all Israel shall hear that thou art abhorred of thy father: then shall the hands of all that are with thee be strong.",
          "ref": "2 Samuel 16:21"
        }
      ],
      "commentary": "Every word Hushai speaks is a masterpiece of true-sounding falsehood: 'God save the king' — which king? — and 'whom the LORD hath chosen, his will I be' — which is exactly why he serves David. Absalom, who won the kingdom by flattery, cannot detect it aimed at himself. Then Ahithophel counsels the rooftop tent, and a first hearer feels the floor of the story open: this is Nathan's sentence executing itself — 'I will take thy wives before thine eyes... for thou didst it secretly: but I will do this thing before all Israel, and before the sun' (12:11-12) — on the same roof from which David once looked down at Bathsheba. The oracle-like counselor has become, unknowing, the instrument of an actual oracle."
    }
  ],
  "2s17": [
    {
      "scene": "Ahithophel: this night",
      "lines": [
        {
          "speaker": "Ahithophel",
          "to": "Absalom",
          "quote": "Let me now choose out twelve thousand men, and I will arise and pursue after David this night: And I will come upon him while he is weary and weak handed, and will make him afraid: and all the people that are with him shall flee; and I will smite the king only: And I will bring back all the people unto thee.",
          "ref": "2 Samuel 17:1–3"
        }
      ],
      "commentary": "Militarily, this is perfect: speed, surprise, minimum bloodshed, a single surgical death and the revolt is over by breakfast. Notice the pronouns — I will arise, I will come upon him, I will smite the king only. Ahithophel does not trust the prince with the work, and he wants David's death under his own hand; if he is indeed Bathsheba's grandfather, that insistence has a private temperature. 'I will smite the king only' is also the counsel's one honest horror: everything else is mercy arithmetic, all Israel returned like a bride, at the price of one old man in the dark. The narrator has already told us the plan 'pleased Absalom well' — David lives this night only because heaven intervenes in a committee meeting."
    },
    {
      "scene": "Hushai: as a bear robbed of her whelps",
      "lines": [
        {
          "speaker": "Hushai",
          "to": "Absalom",
          "quote": "The counsel that Ahithophel hath given is not good at this time.",
          "ref": "2 Samuel 17:7"
        },
        {
          "speaker": "Hushai",
          "to": "Absalom",
          "quote": "Thou knowest thy father and his men, that they be mighty men, and they be chafed in their minds, as a bear robbed of her whelps in the field: and thy father is a man of war, and will not lodge with the people.",
          "ref": "2 Samuel 17:8"
        },
        {
          "speaker": "Hushai",
          "to": "Absalom",
          "quote": "Therefore I counsel that all Israel be generally gathered unto thee, from Dan even to Beersheba, as the sand that is by the sea for multitude; and that thou go to battle in thine own person.",
          "ref": "2 Samuel 17:11"
        },
        {
          "speaker": "The narrator",
          "quote": "For the LORD had appointed to defeat the good counsel of Ahithophel, to the intent that the LORD might bring evil upon Absalom.",
          "ref": "2 Samuel 17:14"
        }
      ],
      "commentary": "Hushai's speech is rhetoric doing the work of an army. Where Ahithophel offered numbers and a timetable, Hushai offers pictures — the she-bear robbed of her whelps, the old campaigner hidden in a pit, hearts of lions melting — and then the intoxicating image of Absalom himself at the head of all Israel, numberless as sand, dragging cities into rivers with ropes. Every sentence buys David another hour. It works because it flatters: Ahithophel's plan needed twelve thousand men and no Absalom; Hushai's needs Absalom magnificently in person. The narrator then draws back the curtain with one of Scripture's plainest statements of providence working through ordinary means: the LORD had appointed it. No miracle, no angel — just vanity, eloquence, and a listening ear, and the revolt is already lost."
    },
    {
      "scene": "The well at Bahurim; Ahithophel goes home",
      "lines": [
        {
          "speaker": "Absalom's servants",
          "to": "the woman of Bahurim",
          "quote": "Where is Ahimaaz and Jonathan?",
          "ref": "2 Samuel 17:20"
        },
        {
          "speaker": "The woman",
          "quote": "They be gone over the brook of water.",
          "ref": "2 Samuel 17:20"
        },
        {
          "speaker": "Ahimaaz and Jonathan",
          "to": "David",
          "quote": "Arise, and pass quickly over the water: for thus hath Ahithophel counselled against you.",
          "ref": "2 Samuel 17:21"
        },
        {
          "speaker": "The narrator",
          "quote": "And when Ahithophel saw that his counsel was not followed, he saddled his ass, and arose, and gat him home to his house, to his city, and put his household in order, and hanged himself.",
          "ref": "2 Samuel 17:23"
        }
      ],
      "commentary": "The intelligence chain runs on the smallest people in the story: a maidservant carrying word to En-rogel, two young priests crouching in a well while a woman spreads corn over the mouth and tells the searchers a quiet lie — Bahurim again, the village of Shimei's curses, now the village that saves the king. By morning light not one straggler remains east of the water. And Ahithophel, the man whose word was as the oracle of God, reads the future one last time without error: the delay is fatal, the revolt is dead, and David's justice will follow. His tidy suicide — the ass saddled, the estate ordered, the family sepulchre — is the coldest scene in the book, a counselor filing his own final memorandum. Later readers heard in this betraying table-companion a shadow of another (Psalm 41:9; John 13:18)."
    }
  ],
  "2s18": [
    {
      "scene": "Deal gently — and the three darts",
      "lines": [
        {
          "speaker": "David",
          "to": "Joab, Abishai, and Ittai",
          "quote": "Deal gently for my sake with the young man, even with Absalom.",
          "ref": "2 Samuel 18:5"
        },
        {
          "speaker": "A certain man",
          "to": "Joab",
          "quote": "Behold, I saw Absalom hanged in an oak.",
          "ref": "2 Samuel 18:10"
        },
        {
          "speaker": "Joab",
          "to": "the man",
          "quote": "And why didst thou not smite him there to the ground? and I would have given thee ten shekels of silver, and a girdle.",
          "ref": "2 Samuel 18:11"
        },
        {
          "speaker": "The man",
          "to": "Joab",
          "quote": "Though I should receive a thousand shekels of silver in mine hand, yet would I not put forth mine hand against the king's son: for in our hearing the king charged thee and Abishai and Ittai, saying, Beware that none touch the young man Absalom.",
          "ref": "2 Samuel 18:12"
        },
        {
          "speaker": "Joab",
          "quote": "I may not tarry thus with thee.",
          "ref": "2 Samuel 18:14"
        }
      ],
      "commentary": "The charge is given 'in the hearing of all the people' — twenty thousand witnesses to an order the general will disobey before sundown. 'The young man,' the king calls him, as if Absalom were a boy wandered off and not a usurper who approved counsel to smite his father in the night; David the king needs Absalom dead, and David the father cannot say the words. Then the oak: Absalom hangs 'between the heaven and the earth,' caught by the head whose hair was weighed at two hundred shekels a year (14:26), while the royal mule walks out from under him. The anonymous soldier is the moral center — he will not break the king's charge for a thousand shekels, and says to Joab's face that the general would have let him hang for it. Joab does not argue; he ends the conversation and takes the guilt himself, three darts through a living heart. Murder, insubordination — and, coldly considered, the end of the war. The bill comes due under Solomon (1 Kings 2:5-6, 28-34)."
    },
    {
      "scene": "Is the young man Absalom safe?",
      "lines": [
        {
          "speaker": "David",
          "to": "Ahimaaz",
          "quote": "Is the young man Absalom safe?",
          "ref": "2 Samuel 18:29"
        },
        {
          "speaker": "Ahimaaz",
          "to": "David",
          "quote": "When Joab sent the king's servant, and me thy servant, I saw a great tumult, but I knew not what it was.",
          "ref": "2 Samuel 18:29"
        },
        {
          "speaker": "David",
          "to": "Cushi",
          "quote": "Is the young man Absalom safe?",
          "ref": "2 Samuel 18:32"
        },
        {
          "speaker": "Cushi",
          "to": "David",
          "quote": "The enemies of my lord the king, and all that rise against thee to do thee hurt, be as that young man is.",
          "ref": "2 Samuel 18:32"
        }
      ],
      "commentary": "The watchman's report builds the suspense verse by verse — one runner, then another, then 'he runneth like the running of Ahimaaz,' and David clutches at omens: 'he is a good man, and cometh with good tidings.' Ahimaaz has outrun the official messenger only to discover, face to face with the king, that he cannot say it; his sudden vagueness — 'a great tumult, but I knew not what it was' — is the kindest lie in the book. The Cushite answers in careful courtier's grammar, a victory announcement and a death notice in one sentence that never speaks the word. Twice the same question, and never 'did we win?' The kingdom has been saved and its king asks only about the man who tried to take it from him."
    },
    {
      "scene": "O my son Absalom",
      "lines": [
        {
          "speaker": "David",
          "quote": "O my son Absalom, my son, my son Absalom! would God I had died for thee, O Absalom, my son, my son!",
          "ref": "2 Samuel 18:33"
        }
      ],
      "commentary": "Eight words in Hebrew, and 'my son' five times — grief reduced to a name and a relation, said over and over as if repetition could reverse it. This is the man who wrote the Song of the Bow, and here art fails him entirely; the lament for Saul had parallelism and eagles and mountains, and this has nothing but the name. 'Would God I had died for thee' is the sentence Nathan's oracle forbids: the sword was never to depart from David's house (12:10), and a father cannot substitute himself under his own judgment — though a hearer of the whole story may catch, far off, the shape of a Son of David of whom that wish is finally true. The chamber over the gate, where the watchman stood watching for good tidings, becomes the most famous weeping-place in Scripture."
    }
  ],
  "2s19": [
    {
      "scene": "Thou lovest thine enemies, and hatest thy friends",
      "lines": [
        {
          "speaker": "Joab",
          "to": "David",
          "quote": "Thou hast shamed this day the faces of all thy servants, which this day have saved thy life... In that thou lovest thine enemies, and hatest thy friends.",
          "ref": "2 Samuel 19:5–6"
        },
        {
          "speaker": "Joab",
          "to": "David",
          "quote": "Now therefore arise, go forth, and speak comfortably unto thy servants: for I swear by the LORD, if thou go not forth, there will not tarry one with thee this night: and that will be worse unto thee than all the evil that befell thee from thy youth until now.",
          "ref": "2 Samuel 19:7"
        }
      ],
      "commentary": "The victory 'was turned into mourning unto all the people,' and soldiers who risked everything steal back into the city like deserters, because the king's grief has told them their loyalty was an offense. Joab — who put the darts in Absalom, and does not mention it — delivers the most brutal and most necessary rebuke in the book, capped with an open threat: go out, or by morning you will have no army and no throne. He is right about everything and tender about nothing; that is Joab entire. David obeys and sits in the gate, a king again with a dead face. He never forgives the man who said it — Amasa's appointment in this same chapter is the answer — and Joab never takes back a word."
    },
    {
      "scene": "Shimei pardoned, Mephibosheth vindicated",
      "lines": [
        {
          "speaker": "Shimei",
          "to": "David",
          "quote": "Let not my lord impute iniquity unto me... For thy servant doth know that I have sinned: therefore, behold, I am come the first this day of all the house of Joseph to go down to meet my lord the king.",
          "ref": "2 Samuel 19:19–20"
        },
        {
          "speaker": "Abishai",
          "quote": "Shall not Shimei be put to death for this, because he cursed the LORD's anointed?",
          "ref": "2 Samuel 19:21"
        },
        {
          "speaker": "David",
          "quote": "Shall there any man be put to death this day in Israel? for do not I know that I am this day king over Israel?",
          "ref": "2 Samuel 19:22"
        },
        {
          "speaker": "Mephibosheth",
          "to": "David",
          "quote": "My lord, O king, my servant deceived me... but my lord the king is as an angel of God: do therefore what is good in thine eyes.",
          "ref": "2 Samuel 19:26–27"
        },
        {
          "speaker": "David",
          "to": "Mephibosheth",
          "quote": "Why speakest thou any more of thy matters? I have said, Thou and Ziba divide the land.",
          "ref": "2 Samuel 19:29"
        },
        {
          "speaker": "Mephibosheth",
          "to": "David",
          "quote": "Yea, let him take all, forasmuch as my lord the king is come again in peace unto his own house.",
          "ref": "2 Samuel 19:30"
        }
      ],
      "commentary": "The crossing of the Jordan becomes a judgment seat. Shimei arrives first of all his tribe with a thousand Benjamites behind him — repentance with excellent timing — and for the third time David refuses Abishai a head; a coronation day, like the first at Gilgal long ago, is a day for amnesty, not executions. Then Mephibosheth: feet undressed, beard untrimmed since the day the king left, his body itself the alibi that Ziba's smooth story never had. David's weary 'thou and Ziba divide the land' has troubled readers ever since — a Solomon-like test, or a king too tired and too compromised to admit he judged unheard? Mephibosheth's answer, 'let him take all,' is the last word of Jonathan's line in the story, and it sounds exactly like his father: the covenant mattered; the property never did."
    },
    {
      "scene": "Barzillai at the Jordan",
      "lines": [
        {
          "speaker": "David",
          "to": "Barzillai",
          "quote": "Come thou over with me, and I will feed thee with me in Jerusalem.",
          "ref": "2 Samuel 19:33"
        },
        {
          "speaker": "Barzillai",
          "to": "David",
          "quote": "How long have I to live, that I should go up with the king unto Jerusalem? I am this day fourscore years old: and can I discern between good and evil? can thy servant taste what I eat or what I drink? can I hear any more the voice of singing men and singing women?",
          "ref": "2 Samuel 19:34–35"
        },
        {
          "speaker": "Barzillai",
          "to": "David",
          "quote": "Let thy servant, I pray thee, turn back again, that I may die in mine own city, and be buried by the grave of my father and of my mother. But behold thy servant Chimham; let him go over with my lord the king; and do to him what shall seem good unto thee.",
          "ref": "2 Samuel 19:37"
        }
      ],
      "commentary": "Amid the day's calculations — Judah wooed, Amasa promoted, Shimei banked for later — Barzillai is the one person at the Jordan who wants nothing. He fed the king when feeding the king could have cost him everything, and now declines the reward with the finest speech an old man makes in Scripture: what is a court to a man who can no longer taste, or hear the singers? Let me die in my own city, by the grave of my father and my mother. He asks only that Chimham — his son, by every likelihood — go in his place, and David kisses and blesses him. The house was not forgotten: David's deathbed charge commands kindness to 'the sons of Barzillai the Gileadite,' a place at the king's table forever (1 Kings 2:7). Loyalty given in the wilderness outlasts every politics of the riverbank — and downriver of this scene, Israel and Judah are already shouting over who owns the king (19:41-43), the quarrel that hands Sheba his trumpet."
    }
  ],
  "2s20": [
    {
      "scene": "We have no part in David",
      "lines": [
        {
          "speaker": "Sheba",
          "to": "the men of Israel",
          "quote": "We have no part in David, neither have we inheritance in the son of Jesse: every man to his tents, O Israel.",
          "ref": "2 Samuel 20:1"
        },
        {
          "speaker": "David",
          "to": "Abishai",
          "quote": "Now shall Sheba the son of Bichri do us more harm than did Absalom: take thou thy lord's servants, and pursue after him, lest he get him fenced cities, and escape us.",
          "ref": "2 Samuel 20:6"
        },
        {
          "speaker": "Joab",
          "to": "Amasa",
          "quote": "Art thou in health, my brother?",
          "ref": "2 Samuel 20:9"
        },
        {
          "speaker": "The narrator",
          "quote": "But Amasa took no heed to the sword that was in Joab's hand: so he smote him therewith in the fifth rib, and shed out his bowels to the ground, and struck him not again; and he died.",
          "ref": "2 Samuel 20:10"
        }
      ],
      "commentary": "Absalom's revolt is barely buried when a worthless man's trumpet raises the north again — the same fault line, Israel against Judah, that will one day break the kingdom in two with this very slogan. David's real problem walks beside the army: he has replaced Joab with Amasa, Absalom's old general, and at the great stone in Gibeon Joab settles the question of command exactly as he settled Abner — a kiss, a brother's greeting, one unwatched sword. 'In the fifth rib' now tolls for the third time in this book. No one arrests Joab; the pursuit simply follows him, because everyone knows who really commands, and the soldier who drags the body off the highway understands that the army must not be allowed to stop and look."
    },
    {
      "scene": "A city and a mother in Israel",
      "lines": [
        {
          "speaker": "The wise woman of Abel",
          "quote": "Hear, hear; say, I pray you, unto Joab, Come near hither, that I may speak with thee.",
          "ref": "2 Samuel 20:16"
        },
        {
          "speaker": "The wise woman of Abel",
          "to": "Joab",
          "quote": "I am one of them that are peaceable and faithful in Israel: thou seekest to destroy a city and a mother in Israel: why wilt thou swallow up the inheritance of the LORD?",
          "ref": "2 Samuel 20:19"
        },
        {
          "speaker": "Joab",
          "to": "the wise woman",
          "quote": "Far be it, far be it from me, that I should swallow up or destroy. The matter is not so: but a man of mount Ephraim, Sheba the son of Bichri by name, hath lifted up his hand against the king, even against David: deliver him only, and I will depart from the city.",
          "ref": "2 Samuel 20:20-21"
        },
        {
          "speaker": "The wise woman",
          "to": "Joab",
          "quote": "Behold, his head shall be thrown to thee over the wall.",
          "ref": "2 Samuel 20:21"
        }
      ],
      "commentary": "The battering rams are already against the rampart of Abel-beth-maachah when a woman's voice stops the siege. She speaks for a town famous for counsel — 'they shall surely ask counsel at Abel' — and her argument is Israel's oldest self-understanding: this city is a mother in Israel, part of the inheritance of the LORD, and Joab is about to swallow what God planted. Joab, murderer twice over in this book, answers almost gently; he wants one rebel, not a massacre. The bargain is grim and swift, and the head over the wall ends a civil war with a single death. A first hearer would notice who saved Israel here: not the king, not the general — a nameless wise woman, the counterpart of the one from Tekoah whom Joab himself once hired."
    }
  ],
  "2s21": [
    {
      "scene": "The Gibeonites' price",
      "lines": [
        {
          "speaker": "David",
          "to": "the Gibeonites",
          "quote": "What shall I do for you? and wherewith shall I make the atonement, that ye may bless the inheritance of the LORD?",
          "ref": "2 Samuel 21:3"
        },
        {
          "speaker": "The Gibeonites",
          "to": "David",
          "quote": "We will have no silver nor gold of Saul, nor of his house; neither for us shalt thou kill any man in Israel.",
          "ref": "2 Samuel 21:4"
        },
        {
          "speaker": "The Gibeonites",
          "to": "David",
          "quote": "Let seven men of his sons be delivered unto us, and we will hang them up unto the LORD in Gibeah of Saul, whom the LORD did choose.",
          "ref": "2 Samuel 21:6"
        },
        {
          "speaker": "David",
          "quote": "I will give them.",
          "ref": "2 Samuel 21:6"
        }
      ],
      "commentary": "Three years of famine, and the oracle points backward: Saul broke Israel's four-hundred-year-old oath to Gibeon, and the land itself keeps the account. The Gibeonites' answer is careful and chilling — no money, for blood has no price (Numbers 35:31), and no general killing; seven sons of the oath-breaker, hanged 'unto the LORD' in Saul's own town, with the barbed addition 'whom the LORD did choose.' David's three words of consent are among the heaviest he ever speaks: the king who spared Saul twice now hands over Saul's house, and the text lets us feel how neatly justice for Gibeon also prunes the rival dynasty. Only Jonathan's son is spared — 'because of the LORD's oath' — one oath honored in the shadow of another broken."
    },
    {
      "scene": "Rizpah's vigil",
      "lines": [
        {
          "speaker": "The narrator",
          "quote": "And Rizpah the daughter of Aiah took sackcloth, and spread it for her upon the rock, from the beginning of harvest until water dropped upon them out of heaven, and suffered neither the birds of the air to rest on them by day, nor the beasts of the field by night.",
          "ref": "2 Samuel 21:10"
        },
        {
          "speaker": "The narrator",
          "quote": "And it was told David what Rizpah the daughter of Aiah, the concubine of Saul, had done.",
          "ref": "2 Samuel 21:11"
        },
        {
          "speaker": "The narrator",
          "quote": "And the bones of Saul and Jonathan his son buried they in the country of Benjamin in Zelah, in the sepulchre of Kish his father: and they performed all that the king commanded. And after that God was intreated for the land.",
          "ref": "2 Samuel 21:14"
        }
      ],
      "commentary": "Rizpah never speaks in all of Scripture, and needs not to. Two of the seven are her sons, and from barley harvest — April — until the autumn rains, perhaps half a year, she lives on a rock under the bodies, fighting off vultures by day and jackals by night. Exposure was the point of the sentence; her vigil is a one-woman protest that the dead are still human, still hers. And it works: word reaches the king, and David — shamed or awakened — goes further than she could ask, fetching the bones of Saul and Jonathan from Jabesh-gilead and burying all the dead together in the family tomb at Zelah. Only then, the narrator says, was God intreated for the land: not by the executions, but after the mercy. A bereaved concubine teaches the kingdom what ends a famine."
    },
    {
      "scene": "Quench not the light of Israel",
      "lines": [
        {
          "speaker": "The narrator",
          "quote": "And David waxed faint. And Ishbi-benob, which was of the sons of the giant... thought to have slain David. But Abishai the son of Zeruiah succoured him, and smote the Philistine, and killed him.",
          "ref": "2 Samuel 21:15-17"
        },
        {
          "speaker": "The men of David",
          "to": "David",
          "quote": "Thou shalt go no more out with us to battle, that thou quench not the light of Israel.",
          "ref": "2 Samuel 21:17"
        }
      ],
      "commentary": "The boy who ran toward Goliath is now a king whose sword grows heavy in his hand, and a new giant with a new spear nearly finishes the story the old one began. Abishai's rescue is the last recorded deed of arms near David's person, and his men's oath afterward is both tender and shrewd: the king has become something more than a soldier — a lamp, and a lamp is not risked in the wind. The chapter's little catalogue of giant-slayings makes the larger point gently: Goliath's whole brood falls 'by the hand of David, and by the hand of his servants.' The champion has become a dynasty of champions; what one shepherd started, a kingdom finishes."
    }
  ],
  "2s22": [
    {
      "scene": "The LORD is my rock",
      "lines": [
        {
          "speaker": "David",
          "quote": "The LORD is my rock, and my fortress, and my deliverer; The God of my rock; in him will I trust: he is my shield, and the horn of my salvation, my high tower, and my refuge, my saviour; thou savest me from violence.",
          "ref": "2 Samuel 22:2-3"
        },
        {
          "speaker": "David",
          "quote": "When the waves of death compassed me, the floods of ungodly men made me afraid... In my distress I called upon the LORD, and cried to my God: and he did hear my voice out of his temple, and my cry did enter into his ears.",
          "ref": "2 Samuel 22:5, 7"
        },
        {
          "speaker": "David",
          "quote": "He bowed the heavens also, and came down; and darkness was under his feet. And he rode upon a cherub, and did fly: and he was seen upon the wings of the wind... He sent from above, he took me; he drew me out of many waters.",
          "ref": "2 Samuel 22:10-11, 17"
        },
        {
          "speaker": "David",
          "quote": "For thou art my lamp, O LORD: and the LORD will lighten my darkness... The LORD liveth; and blessed be my rock; and exalted be the God of the rock of my salvation.",
          "ref": "2 Samuel 22:29, 47"
        }
      ],
      "commentary": "Every image is autobiography. The rock and the fortress are En-gedi and Adullam, the actual crags where a hunted man hid; the waves of death are Gilboa's aftermath and Absalom's revolt; the drawing 'out of many waters' is every escape the two books have chronicled. But the poem's daring is its scale: when one man cries out, the whole cosmos convulses — heaven tilts, the LORD rides the storm as Canaan's poets said Baal did, earth's foundations bare themselves — all of it to reach down for a single drowning shepherd, 'because he delighted in me.' A hearer who has followed David from the sheepfold hears the strangest line of all with full weight: 'thou art my lamp, O LORD' — the light his men just swore to protect confesses it never shone with its own fire."
    }
  ],
  "2s23": [
    {
      "scene": "A morning without clouds",
      "lines": [
        {
          "speaker": "David",
          "quote": "The Spirit of the LORD spake by me, and his word was in my tongue.",
          "ref": "2 Samuel 23:2"
        },
        {
          "speaker": "David",
          "quote": "He that ruleth over men must be just, ruling in the fear of God. And he shall be as the light of the morning, when the sun riseth, even a morning without clouds; as the tender grass springing out of the earth by clear shining after rain.",
          "ref": "2 Samuel 23:3-4"
        },
        {
          "speaker": "David",
          "quote": "Although my house be not so with God; yet he hath made with me an everlasting covenant, ordered in all things, and sure: for this is all my salvation, and all my desire, although he make it not to grow.",
          "ref": "2 Samuel 23:5"
        }
      ],
      "commentary": "The sweet psalmist of Israel leaves one last oracle, and its center is not conquest but justice: a right ruler is like sunrise after rain, the light that makes grass grow — power as blessing, not as weight. Then the most honest clause any king ever spoke: 'Although my house be not so with God.' David has read his own story — Bathsheba, Amnon, Absalom — and does not pretend the morning was cloudless. His hope stands not on his record but on the covenant of 2 Samuel 7, 'ordered in all things, and sure.' A first hearer would catch the tension the whole Bible carries forward: the just ruler is described, longed for, promised — and not yet arrived. The last words of David are, in the end, about a king still to come."
    },
    {
      "scene": "The water of the well of Bethlehem",
      "lines": [
        {
          "speaker": "David",
          "quote": "Oh that one would give me drink of the water of the well of Bethlehem, which is by the gate!",
          "ref": "2 Samuel 23:15"
        },
        {
          "speaker": "The narrator",
          "quote": "And the three mighty men brake through the host of the Philistines, and drew water out of the well of Bethlehem, that was by the gate, and took it, and brought it to David: nevertheless he would not drink thereof, but poured it out unto the LORD.",
          "ref": "2 Samuel 23:16"
        },
        {
          "speaker": "David",
          "quote": "Be it far from me, O LORD, that I should do this: is not this the blood of the men that went in jeopardy of their lives?",
          "ref": "2 Samuel 23:17"
        }
      ],
      "commentary": "In the cave of Adullam, in the harvest heat, with a Philistine garrison sitting in his hometown, David thinks out loud about the water he drank as a boy — and three men take a homesick sigh as a command. They cut through an army for a skin of water. What David does next is why such men followed him: he will not drink it. Water bought at the hazard of three lives has become blood, and blood belongs only to God — so he pours the best gift he ever received out on the ground, and turns a canteen into a drink offering. It is the shepherd-king's genius in one gesture: he honors the men more by the libation than he could have by the toast, and the story was still being told when the muster-rolls were written down. Uriah the Hittite, who closes this chapter's list, deserved a king who always remembered what other men's blood was worth."
    }
  ],
  "2s24": [
    {
      "scene": "Three days, three choices",
      "lines": [
        {
          "speaker": "Joab",
          "to": "David",
          "quote": "Now the LORD thy God add unto the people, how many soever they be, an hundredfold, and that the eyes of my lord the king may see it: but why doth my lord the king delight in this thing?",
          "ref": "2 Samuel 24:3"
        },
        {
          "speaker": "David",
          "to": "the LORD",
          "quote": "I have sinned greatly in that I have done: and now, I beseech thee, O LORD, take away the iniquity of thy servant; for I have done very foolishly.",
          "ref": "2 Samuel 24:10"
        },
        {
          "speaker": "Gad",
          "to": "David",
          "quote": "Shall seven years of famine come unto thee in thy land? or wilt thou flee three months before thine enemies, while they pursue thee? or that there be three days' pestilence in thy land? now advise, and see what answer I shall return to him that sent me.",
          "ref": "2 Samuel 24:13"
        },
        {
          "speaker": "David",
          "to": "Gad",
          "quote": "I am in a great strait: let us fall now into the hand of the LORD; for his mercies are great: and let me not fall into the hand of man.",
          "ref": "2 Samuel 24:14"
        }
      ],
      "commentary": "When Joab is the voice of conscience, something is deeply wrong. The census is a soldier's inventory of other men's sons, the king counting as his own what he holds in trust from God — and David's heart smites him before any prophet arrives, as it did when he cut Saul's robe. Gad's three choices are a terrible mercy: famine and flight both put Israel in the hands of men — hoarders, invaders — but pestilence comes from God alone, and David has staked his whole life on one conviction about God: 'his mercies are great.' He chooses the punishment with no human middleman. Seventy thousand die, and the theology is left jagged on purpose; what the chapter insists on is where the plague stops — at the exact spot where sacrifice will stand."
    },
    {
      "scene": "The threshingfloor of Araunah",
      "lines": [
        {
          "speaker": "David",
          "to": "the LORD",
          "quote": "Lo, I have sinned, and I have done wickedly: but these sheep, what have they done? let thine hand, I pray thee, be against me, and against my father's house.",
          "ref": "2 Samuel 24:17"
        },
        {
          "speaker": "Araunah",
          "to": "David",
          "quote": "Let my lord the king take and offer up what seemeth good unto him: behold, here be oxen for burnt sacrifice, and threshing instruments and other instruments of the oxen for wood... The LORD thy God accept thee.",
          "ref": "2 Samuel 24:22-23"
        },
        {
          "speaker": "David",
          "to": "Araunah",
          "quote": "Nay; but I will surely buy it of thee at a price: neither will I offer burnt offerings unto the LORD my God of that which doth cost me nothing.",
          "ref": "2 Samuel 24:24"
        },
        {
          "speaker": "The narrator",
          "quote": "And David built there an altar unto the LORD, and offered burnt offerings and peace offerings. So the LORD was intreated for the land, and the plague was stayed from Israel.",
          "ref": "2 Samuel 24:25"
        }
      ],
      "commentary": "David sees the destroying angel standing over Jerusalem and steps between it and the city: strike me, not the sheep — the shepherd's answer, and the king's finest hour, offered not from strength but from guilt. Araunah, the old Jebusite lord whose people David dispossessed, gives like a king: floor, oxen, sledges, everything. David's refusal is the sentence the whole book has been building toward — worship that costs nothing is worth nothing — and fifty shekels of silver buy the most consequential real estate in the Bible. For the altar rises where the angel's hand was stayed, and 2 Chronicles 3:1 names the place: mount Moriah, the threshingfloor of Ornan, the site of Solomon's temple. The book of Samuel, which opened with a barren woman praying at Shiloh, closes on the rock where Israel will pray for a thousand years — judgment turned, at full price, into a house of mercy."
    }
  ]
};
