// api/grade.js

// Private answer key stored securely on the server
const ANSWER_KEY = {
  1: { ans: 1, exp: "Use Present Simple 'works' for third-person singular (she/he/it) factual habits." },
  2: { ans: 1, exp: "Past simple of 'to be' for plural subjects (they) is 'were' / negative 'weren't'." },
  3: { ans: 0, exp: "Preposition 'on' is used for flat surfaces like desks or tables." },
  4: { ans: 1, exp: "Modal verb 'can' expresses general ability in present tense." },
  5: { ans: 0, exp: "Indefinite article 'a' is used before singular countable nouns starting with a consonant sound ('new')." },
  6: { ans: 1, exp: "Present Perfect Continuous ('has been working') denotes an ongoing action started in the past up to now." },
  7: { ans: 1, exp: "First Conditional structure: If + present simple, future simple (will + base verb)." },
  8: { ans: 2, exp: "Future passive voice structure: 'will be' + past participle ('signed')." },
  9: { ans: 1, exp: "The verb 'suggest' is followed by a gerund (-ing form)." },
  10: { ans: 2, exp: "Relative pronoun 'whose' indicates possession." },
  11: { ans: 2, exp: "Third conditional inversion ('Had we...'): 'would not have' + past participle." },
  12: { ans: 1, exp: "Negative adverb 'Seldom' at sentence start requires subject-auxiliary verb inversion ('have we seen')." },
  13: { ans: 1, exp: "Subjunctive mood following verbs of demand/request requires base verb ('be')." },
  14: { ans: 1, exp: "Perfect participle 'Having been' shows an action completed prior to the main clause action." },
  15: { ans: 0, exp: "Conjunctive adverb 'nevertheless' expresses formal contrast between independent clauses." },
  16: { ans: 0, exp: "'Meeting' refers to an assembly of people for discussion." },
  17: { ans: 1, exp: "'Email' is electronic correspondence used in modern workplaces." },
  18: { ans: 1, exp: "'PM' designates time from noon to midnight." },
  19: { ans: 0, exp: "Verb 'send' means transmit digitally or physically." },
  20: { ans: 0, exp: "'District' refers to a specific area/zone in a city." },
  21: { ans: 0, exp: "'Collaborate' means to work jointly with others on an activity." },
  22: { ans: 0, exp: "'Efficiency' means achieving maximum productivity with minimal wasted effort." },
  23: { ans: 0, exp: "'Objective' means a target, goal, or intended outcome." },
  24: { ans: 0, exp: "'Restrict' means to limit or keep within bounds." },
  25: { ans: 0, exp: "'Promotion' means advancement in rank, position, or job status." },
  26: { ans: 0, exp: "'Mitigate' means to make less severe, serious, or painful." },
  27: { ans: 0, exp: "'Lucrative' means producing a great deal of profit." },
  28: { ans: 0, exp: "'Consensus' refers to general agreement among a group." },
  29: { ans: 0, exp: "'Paramount' means more important than anything else; supreme." },
  30: { ans: 0, exp: "'Facilitate' means to make an action or process easy or easier." },
  31: { ans: 1, exp: "The email explicitly states: 'I am writing to outline our key priorities for the upcoming third quarter... upgrading our primary software platform.'" },
  32: { ans: 2, exp: "Text directly states: 'Please review the attached project schedule and confirm your team’s deliverables by Friday at 5:00 PM.'" },
  33: { ans: 1, exp: "Text states: 'We will host a brief sync call this Thursday at 10:00 AM...'" },
  34: { ans: 2, exp: "Text states: 'Next Monday, the engineering team will begin integration testing.'" },
  35: { ans: 1, exp: "Text states: 'Our design team has already drafted the preliminary interface updates.'" },
  36: { ans: 1, exp: "'Preliminary' means preceding or done in preparation for something fuller or main (initial/introductory)." },
  37: { ans: 1, exp: "Text explicitly states the call is 'to address any immediate concerns or resource constraints.'" },
  38: { ans: 0, exp: "The passage notes: 'Following last week’s client review, we must focus on upgrading our primary software platform...'" },
  39: { ans: 1, exp: "The tone is clear, authoritative, organized, and polite ('directive, structured, and professional')." },
  40: { ans: 0, exp: "The email emphasizes team deliverables, Thursday sync for resource constraints, and prompt cooperation for a seamless roll-out." },
  41: { ans: 1, exp: "Audio states: 'The legacy client portal will be officially shut down this Friday at midnight.'" },
  42: { ans: 0, exp: "Audio states: 'mandatory training sessions will be held in Conference Room B tomorrow at 2:00 PM.'" },
  43: { ans: 2, exp: "Audio explicitly states: 'tomorrow at 2:00 PM.'" },
  44: { ans: 1, exp: "Audio states: 'Beginning next Monday, all support agents must use the new dashboard to record client tickets.'" },
  45: { ans: 1, exp: "Audio states: 'All customer data has already been migrated to our new cloud platform.'" },
  46: { ans: 1, exp: "Audio states: 'If you experience login difficulties, contact IT support immediately at extension 404.'" },
  47: { ans: 1, exp: "The announcement outlines software migration timelines, new dashboard usage, and mandatory training." },
  48: { ans: 1, exp: "Since all support agents must use the new dashboard starting Monday, missing the training in Conference Room B directly compromises operational readiness." },
  49: { ans: 1, exp: "The speaker delivers clear, direct operational instructions in a calm, professional tone." },
  50: { ans: 2, exp: "The speaker uses past perfect phrasing: 'All customer data has already been migrated to our new cloud platform' before Friday's portal shutdown." }
};

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const { userAnswers, questionsMeta, passcode } = body || {};

    // Passcode validation
    const VALID_PASSCODE = process.env.QUIZ_PASSCODE || "TEACHER2026";
    if (passcode && passcode !== VALID_PASSCODE) {
      return res.status(401).json({ error: "Invalid access passcode. Please check with your instructor." });
    }

    if (!userAnswers || !questionsMeta) {
      return res.status(400).json({ error: "Missing required assessment data." });
    }

    let totalScore = 0;
    let scoreGrammar = 0;
    let scoreVocab = 0;
    let scoreReading = 0;
    let scoreListening = 0;

    const breakdownData = [];

    questionsMeta.forEach((qMeta, idx) => {
      const qId = qMeta.id;
      const userAns = userAnswers[idx];
      const correctInfo = ANSWER_KEY[qId] || { ans: -1, exp: "No explanation available." };

      const isCorrect = userAns === correctInfo.ans;

      if (isCorrect) {
        totalScore++;
        if (qMeta.sec === "Grammar") scoreGrammar++;
        else if (qMeta.sec === "Vocabulary") scoreVocab++;
        else if (qMeta.sec === "Reading") scoreReading++;
        else if (qMeta.sec === "Listening") scoreListening++;
      }

      breakdownData.push({
        id: qId,
        sec: qMeta.sec,
        diff: qMeta.diff,
        topic: qMeta.topic,
        q: qMeta.q,
        opts: qMeta.opts,
        userAns: userAns,
        correctAns: correctInfo.ans,
        explanation: correctInfo.exp,
        isCorrect: isCorrect
      });
    });

    let levelText = "";
    let feedbackText = "";

    if (totalScore <= 19) {
      levelText = "Beginner (CEFR A1–A2)";
      feedbackText = "Your current score indicates a foundational grasp of basic English. You understand routine workplace expressions but require structural development. Focus on mastering fundamental grammar tenses, essential vocabulary, and active listening drill practice.";
    } else if (totalScore <= 35) {
      levelText = "Intermediate (CEFR B1–B2)";
      feedbackText = "You demonstrate a good functional command of English in professional settings, showing solid understanding in spoken and written contexts. To advance further, focus on refining complex conditional grammar, expanding formal business idiom, and inferential reading skills.";
    } else {
      levelText = "Advanced (CEFR C1–C2)";
      feedbackText = "Outstanding performance! You possess an advanced mastery of English across grammar, vocabulary, reading, and auditory comprehension. Continue polishing high-level professional nuances, rhetorical structures, and executive presentation skills.";
    }

    return res.status(200).json({
      totalScore,
      scoreGrammar,
      scoreVocab,
      scoreReading,
      scoreListening,
      levelText,
      feedbackText,
      breakdownData,
      items: breakdownData
    });
  } catch (error) {
    return res.status(500).json({ error: error.message || "Internal server error" });
  }
};