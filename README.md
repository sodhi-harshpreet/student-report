# Student Speaking Assessment Report

A simple React app to show student speaking assessment results (like IELTS/SpeechAce). You get overall and skill-wise scores, visual charts, and clear feedback.

## Features

- Animated overall and skill scores (Pronunciation, Fluency, Vocabulary, Grammar)
- Switchable bar and radar charts
- Color-coded, dynamic feedback
- Responsive, modern UI

## Getting Started

**1. Install dependencies:**
```bash
npm install
```
**2. Run locally:**
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

**3. Build for production:**
```bash
npm run build
```

## Where is the data?

Scores and student details are stored in:
```
src/data/studentData.json
```
It contains studentName, studentId, testDate, overallScore, and an array of skills (name, score, description).

You can simulate an API by editing `src/utils/api.js` (just reads from the JSON).

## Feedback Logic

Located in `src/utils/feedbackLogic.js`.

- Score **8 or higher**: "Excellent" (green), strong performance.
- Score **6 to below 8**: "Good" (blue), minor issues.
- Score **below 6**: "Needs Improvement" (amber), more practice needed.

Feedback and colors update automatically as scores change.

---

**Note:** This is a front-end prototype for demo/assignments. No login, payments, backend, or AI included.
