# 📚 English Learning & Assessment

An interactive, web-based platform designed for adult and professional English learners. This repository contains structured learning materials and automated assessments covering core language competencies: **Grammar**, **Vocabulary**, **Reading Comprehension**, and **Listening Skills**.

Powered by a clean, responsive Tailwind CSS frontend and backed by a secure Vercel Serverless API function for scoring and access management.

---

## 🌟 Key Features

- **Comprehensive Skill Evaluation**: Evaluates learner capabilities across essential communication pillars using structured exercises.
- **Secure Backend Assessment Processing (`/api/grade`)**: Evaluation logic and scoring are handled safely on the server side via Vercel Serverless Functions.
- **Passcode-Protected Access**: Restricts assessment submissions to authorized students or classroom environments via a customizable access key.
- **Interactive Audio & Speech Integration**: Leverages the browser's native Web Speech API to provide audio for listening comprehension modules, along with a fallback transcript viewer.
- **CEFR-Aligned Proficiency Matrix**: Automatically maps evaluation scores to CEFR levels (A1–C2) and generates section-by-section breakdown reports.
- **Targeted Feedback & Progress Tracking**: Generates customized performance summaries highlighting specific areas for continued study and development.

---

## 📊 Curriculum & Skill Breakdown

The learning material and assessment modules are divided into four primary skill categories:

| Learning Module | Focus Areas | Target Proficiency Range |
| :--- | :--- | :---: |
| **Grammar** | Tense usage, subject-verb agreement, conditionals, inversions, and subjunctive mood | Beginner to Advanced |
| **Vocabulary** | Workplace terminology, corporate communication, risk management, and priority phrasing | Beginner to Advanced |
| **Reading** | Business correspondence, contextual scanning, implicit meaning, and text analysis | Beginner to Advanced |
| **Listening** | Spoken operational directives, time/date recall, tone recognition, and auditory comprehension | Beginner to Advanced |

### Proficiency Benchmark Framework

| Total Score | Assessed CEFR Level | Level Description |
| :---: | :--- | :--- |
| **0 – 19 Points** | **A1 – A2** (Beginner) | Foundational structures and basic workplace phrases |
| **20 – 35 Points** | **B1 – B2** (Intermediate) | Independent communication, professional tenses, and context understanding |
| **36 – 50 Points** | **C1 – C2** (Advanced) | Fluent language control, complex grammar, and precise auditory inference |

---

## 📁 Repository Structure

```text
English-learning-material/
├── index.html        # Interactive user interface, audio player, and quiz logic
├── api/
│   └── grade.js      # Serverless endpoint for passcode verification and submission grading
└── README.md         # Documentation and guide
