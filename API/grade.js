// api/grade.js

// Answer key for all 50 questions (0 = A, 1 = B, 2 = C, 3 = D)
const ANSWER_KEY = [
  // Grammar (Q1–15)
  1, 1, 0, 1, 0, 1, 1, 2, 1, 2, 2, 1, 1, 1, 0,
  // Vocabulary (Q16–30)
  0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  // Reading (Q31–40)
  1, 2, 1, 2, 1, 1, 1, 0, 1, 0,
  // Listening (Q41–50)
  1, 0, 2, 1, 1, 1, 1, 1, 1, 2
];

const TOPICS = {
  1: "Present Simple Tenses (Subject-Verb Agreement)",
  2: "Past Tense of 'To Be' (Plural Subjects)",
  3: "Prepositions of Place (Flat Surfaces)",
  4: "Modal Verbs for Ability ('Can')",
  5: "Indefinite Articles ('a' vs 'an')",
  6: "Present Perfect Continuous Tense",
  7: "First Conditional Structures",
  8: "Future Passive Voice",
  9: "Verb Patterns (Gerunds after 'Suggest')",
  10: "Possessive Relative Pronouns ('Whose')",
  11: "Third Conditional Inversion",
  12: "Negative Adverbial Inversion ('Seldom')",
  13: "Subjunctive Mood for Requests/Mandates",
  14: "Perfect Participle Clauses ('Having been')",
  15: "Conjunctive Adverbs ('Nevertheless')",
  16: "Basic Workplace Nouns",
  17: "Digital Communication Vocabulary",
  18: "Time Designation Abbreviations",
  19: "Action Verbs for Correspondence",
  20: "Commercial Location Terminology",
  21: "Cross-Functional Collaboration Terms",
  22: "Operational Productivity Terms",
  23: "Strategic Goal Vocabulary",
  24: "Financial Constraint Verbs",
  25: "Career Advancement Terminology",
  26: "Risk Mitigation Terminology",
  27: "High-Level Financial Adjectives",
  28: "Governance & Consensus Terms",
  29: "Priority Assessment Adjectives",
  30: "Process Facilitation Verbs",
  31: "Main Idea Identification",
  32: "Deadline & Specific Fact Extraction",
  33: "Schedule Scanning & Time Recall",
  34: "Departmental Role Scanning",
  35: "Status Verification Reading",
  36: "Contextual Vocabulary Meaning ('Preliminary')",
  37: "Purpose & Objective Identification",
  38: "Business Cause-and-Effect Inference",
  39: "Author Tone & Style Analysis",
  40: "Strategic Project Inference",
  41: "Auditory Fact Recall (Systems)",
  42: "Auditory Location Recall",
  43: "Auditory Time Specifics",
  44: "Spoken Operational Directives",
  45: "Auditory Status Verification",
  46: "Numerical & Extension Detail Listening",
  47: "Gist & Purpose Auditory Comprehension",
  48: "Spoken Implication & Risk Deduction",
  49: "Speaker Demeanor & Tone Recognition",
  50: "Auditory Sequence of Events"
};

const EXPLANATIONS = {
  1: "Subject-verb agreement requires 'works' for third-person singular (she).",
  2: "Plural past tense of 'to be' with negative context requires 'weren't'.",
  3: "The preposition 'on' is used for flat surfaces like a desk.",
  4: "'Can' is the modal verb used to express ability.",
  5: "Use 'a' before words starting with a consonant sound ('new').",
  6: "'Has been working' indicates an action that started in the past and continues in the present.",
  7: "First conditional rule: If + present simple, main clause + will + base verb.",
  8: "Future passive voice structure: will + be + past participle.",
  9: "The verb 'suggest' is followed by a gerund (-ing form).",
  10: "'Whose' is the possessive relative pronoun indicating ownership.",
  11: "Third conditional inversion ('Had we...') takes 'would not have + past participle'.",
  12: "Negative adverbials at the start of a sentence require subject-auxiliary inversion ('have we seen').",
  13: "The subjunctive mood following verbs of demand/request requires the base form ('be').",
  14: "Perfect participle clause ('Having been') indicates a completed prior state.",
  15: "'Nevertheless' is a conjunctive adverb showing contrast between two independent clauses.",
  16: "A 'meeting' is a structured work discussion.",
  17: "Written digital correspondence in business is an 'email'.",
  18: "5:00 PM indicates late afternoon business hours.",
  19: "'Send' is the standard verb for transmitting digital files.",
  20: "'Business district' is the standard compound term for commercial areas.",
  21: "'Collaborate' means to work jointly with others.",
  22: "'Efficiency' refers to achieving peak productivity with minimal wasted effort.",
  23: "An 'objective' is a formal strategic goal.",
  24: "'Restrict' means to limit or bind within bounds.",
  25: "Advancement to a higher position is a 'promotion'.",
  26: "'Mitigate' means to make less severe or diminish risk.",
  27: "'Lucrative' means producing a great deal of profit.",
  28: "'Consensus' refers to general agreement among members.",
  29: "'Paramount' means more important than anything else; supreme.",
  30: "'Facilitate' means to make an action or process easy or easier.",
  31: "The text focuses on Q3 priorities, system upgrades, and project timelines.",
  32: "Paragraph 3 states: 'confirm your team's deliverables by Friday at 5:00 PM.'",
  33: "Paragraph 4 states: 'sync call this Thursday at 10:00 AM.'",
  34: "Paragraph 3 specifies: 'the engineering team will begin integration testing.'",
  35: "Paragraph 3 notes: 'design team has already drafted the preliminary interface updates.'",
  36: "'Preliminary' means occurring before or in preparation for the main event (initial/introductory).",
  37: "Paragraph 4 states the call is 'to address any immediate concerns or resource constraints.'",
  38: "The opening paragraph mentions the plan comes 'Following last week's client review.'",
  39: "The communication uses structured, direct, and professional business language.",
  40: "Success relies on multiple departments meeting specific scheduled milestones.",
  41: "The announcement states the legacy client portal will shut down Friday at midnight.",
  42: "The speaker mentions mandatory training in Conference Room B.",
  43: "The announcement specifies training will be held at 2:00 PM.",
  44: "Agents must use the new dashboard beginning next Monday.",
  45: "The speaker confirms all customer data has already been migrated.",
  46: "The speaker directs login issues to IT support at extension 404.",
  47: "The transcript focuses on software transition steps, deadlines, and required training.",
  48: "Without training on the new dashboard, agents will struggle on launch day.",
  49: "The speaker maintains a professional, clear, and instruction-oriented demeanor.",
  50: "Data migration occurred prior to this operational status announcement."
};

const QUESTIONS_TEXT = [
  "She _____ at a software technology company in London.",
  "They _____ present at the quarterly business meeting yesterday.",
  "Please place the confidential files _____ the desk.",
  "Excuse me, _____ you speak English fluently?",
  "We need to purchase _____ new printer for the office.",
  "Our team _____ on this project since last January.",
  "If we increase our market budget, sales _____ rapidly.",
  "The revised financial contract _____ by the legal director tomorrow.",
  "He suggested _____ the client presentation until next Tuesday.",
  "The manager, _____ office is on the third floor, approved the proposal.",
  "Had we conducted thorough market research, we _____ that mistake.",
  "Seldom _____ such an exceptional level of dedication from a new contractor.",
  "The CEO requested that the preliminary audit _____ completed by midnight.",
  "_____ disappointed by the initial survey results, the team reworked the strategy.",
  "The project is on schedule; _____, we must remain vigilant regarding expenditures.",
  "We need to schedule a short _____ to discuss the weekly targets.",
  "The client sent an urgent _____ regarding the invoice total.",
  "The final deadline for submitting the report is 5:00 _____ today.",
  "Could you please _____ the documents to my email inbox?",
  "Our corporate office is located in the central business _____.",
  "The two departments agreed to _____ closely on the new marketing campaign.",
  "Improving workplace automation significantly boosted overall _____",
  "The board set a clear strategic _____ to expand international sales by 15%.",
  "Due to budget constraints, management had to _____ non-essential spending.",
  "She received a major _____ after successfully leading the department merger.",
  "Risk management plans were enacted to _____ potential financial losses.",
  "The consultant offered a _____ proposal that guaranteed significant returns.",
  "After hours of deliberation, the board reached a unanimous _____.",
  "It is _____ that all executive directors attend the annual summit.",
  "The new software update aims to _____ seamless communication across branches.",
  "What is the main topic of Sarah Jenkins' email?",
  "When must team members confirm their project deliverables?",
  "When is the sync call scheduled to take place?",
  "Which team will begin integration testing next Monday?",
  "What has the design team already completed?",
  "In the text, the word 'preliminary' most closely means:",
  "What is the primary objective of the Thursday sync call?",
  "What primary operational motivation prompted this Q3 upgrade?",
  "What is the professional tone of Sarah Jenkins' email?",
  "What can be inferred about the project's success requirement?",
  "According to the audio announcement, what will be shut down this Friday at midnight?",
  "Where will the mandatory training sessions take place tomorrow?",
  "What time will the training sessions start tomorrow?",
  "What are support agents required to do starting next Monday?",
  "What has already happened to the customer data?",
  "Which phone extension should staff call if they have login issues?",
  "What is the primary objective of this spoken announcement?",
  "What can be inferred about support agents who fail to attend tomorrow's training?",
  "What is the tone of the announcement speaker?",
  "Which task was completed prior to making this announcement?"
];

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { userAnswers, passcode } = req.body;

  // Passcode verification (matches process.env.QUIZ_PASSCODE or fallback)
  const VALID_PASSCODE = process.env.QUIZ_PASSCODE || "TEACHER2026";

  if (!passcode || passcode !== VALID_PASSCODE) {
    return res.status(401).json({ error: "Invalid access passcode. Please check with your instructor." });
  }

  if (!Array.isArray(userAnswers) || userAnswers.length !== 50) {
    return res.status(400).json({ error: "Invalid answer data submitted." });
  }

  let totalScore = 0;
  let scoreGrammar = 0;
  let scoreVocab = 0;
  let scoreReading = 0;
  let scoreListening = 0;

  const OPTION_LABELS = ["A", "B", "C", "D"];

  const itemDetails = userAnswers.map((userAns, index) => {
    const qId = index + 1;
    const correctAns = ANSWER_KEY[index];
    const isCorrect = userAns === correctAns;

    if (isCorrect) {
      totalScore++;
      if (qId <= 15) scoreGrammar++;
      else if (qId <= 30) scoreVocab++;
      else if (qId <= 40) scoreReading++;
      else scoreListening++;
    }

    let section = "Grammar";
    if (qId > 15 && qId <= 30) section = "Vocabulary";
    if (qId > 30 && qId <= 40) section = "Reading";
    if (qId > 40) section = "Listening";

    let difficulty = "Beginner";
    const mod = qId <= 30 ? (qId % 15 || 15) : (qId % 10 || 10);
    if (mod > 5 && mod <= 10) difficulty = "Intermediate";
    if (mod > 10 || (qId > 30 && mod > 7)) difficulty = "Advanced";

    return {
      id: qId,
      sec: section,
      diff: difficulty,
      topic: TOPICS[qId] || "General Core Competency",
      q: QUESTIONS_TEXT[index],
      isCorrect,
      userAnsText: userAns !== null ? OPTION_LABELS[userAns] : "Not Answered",
      correctAnsText: OPTION_LABELS[correctAns],
      exp: EXPLANATIONS[qId] || "Correct selection based on standard English proficiency standards."
    };
  });

  let levelText = "Beginner (CEFR A1–A2)";
  let feedbackText = "You demonstrate a foundational understanding of basic English structure. Focus on building vocabulary and practicing past/future tenses to reach Intermediate proficiency.";

  if (totalScore >= 20 && totalScore <= 35) {
    levelText = "Intermediate (CEFR B1–B2)";
    feedbackText = "You display solid control of complex grammar rules and business vocabulary. Focus on refining advanced conditional structures and nuanced listening comprehension.";
  } else if (totalScore >= 36) {
    levelText = "Advanced (CEFR C1–C2)";
    feedbackText = "Exceptional performance! You exhibit strong mastery over complex inversion, high-level professional vocabulary, and detailed auditory/reading inference.";
  }

  return res.status(200).json({
    totalScore,
    scoreGrammar,
    scoreVocab,
    scoreReading,
    scoreListening,
    levelText,
    feedbackText,
    items: itemDetails
  });
}
