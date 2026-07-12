
<div align="center">
  <h1>🚀 GrowEasy AI CSV Importer</h1>
  <p><strong>An intelligent, AI-powered pipeline to seamlessly map, extract, and validate raw CSV data into structured CRM architectures.</strong></p>

---

## 📖 Project Overview

Data ingestion is often the most fragile part of a CRM system. This application solves the problem of messy, unstructured CSV uploads by leveraging **Google Gemini AI** to contextually understand and map arbitrary column headers to strict, predefined CRM fields.

Built with a focus on fault tolerance, the application features a robust validation pipeline and a resilient frontend architecture that ensures a seamless user experience even during network interruptions.

---

## 📸 Application Interface

**Raw Data Ingestion & Fallback Support**
*Figure 1: The intuitive drag-and-drop interface provides a secure preview of raw CSV data before AI processing begins, featuring a client-side failover state.*
![Data Upload Interface](screenshots/interface-upload.png)

**Structured AI Output & Validation**
*Figure 2: The processed results dashboard displays structured CRM data, featuring automated status mapping, missing data flags, and strict validation metrics.*
![CRM Results Dashboard](screenshots/interface-results.png)

---

## ✨ Key Features & Architecture

* **🧠 Contextual AI Mapping:** Utilizes Large Language Models to infer data types and map unknown columns (e.g., matching "Contact No." to `mobile_without_country_code`).
* **⚙️ Enterprise Batch Processing:** The Node.js backend handles large datasets by slicing payloads into manageable chunks, preventing LLM syntax hallucinations and rate-limiting crashes during extraction.
* **🛡️ Strict Data Validation:** Implements backend validation to filter out incomplete records, automatically dropping rows missing critical entities (Name, Email, Phone).
* **⚡ Resilient Frontend Fallback:** Engineered with a client-side mock-data failover mechanism. If the external AI API rate-limits or the backend connection drops, the UI gracefully falls back to local data processing without breaking the user experience.
* **🎨 Premium UI/UX:** Built with Next.js and Tailwind CSS, featuring drag-and-drop file ingestion, dynamic processing states, responsive data tables, and full dark-mode support.

---

## 🛠️ Technology Stack

| Category             | Technologies                                         |
| :------------------- | :--------------------------------------------------- |
| **Frontend**   | Next.js (React), TypeScript, Tailwind CSS, PapaParse |
| **Backend**    | Node.js, Express.js, CORS, Dotenv                    |
| **AI Engine**  | Google Gemini API (`@google/generative-ai`)        |
| **Deployment** | Vercel (Frontend), Render (Backend)                  |

---

## 🚀 Quick Start (Local Development)

### Prerequisites

* Node.js (v18.x or higher)
* API Key from [Google AI Studio](https://aistudio.google.com/)

### 1. Clone the Repository

\`\`\`bash
git clone https://github.com/anushkagupta47/GrowEasy-AI-CSV-Importer.git
cd GrowEasy-AI-CSV-Importer
\`\`\`

### 2. Configure & Run Backend

\`\`\`bash
cd Backend
npm install
\`\`\`
Create a `.env` file in the `/Backend` directory and add your API key:
\`\`\`env
GEMINI_API_KEY=your_actual_api_key_here
PORT=5000
\`\`\`
Start the Express server:
\`\`\`bash
node server.js
\`\`\`

### 3. Configure & Run Frontend

Open a new terminal window:
\`\`\`bash
cd frontend
npm install
npm run dev
\`\`\`
Navigate to `http://localhost:3000` to view the application.

---

## 👨‍💻 Candidate Profile

**Anushka Gupta**
*AI & Machine Learning Engineer | Founder & Ex-Chairperson @ IEEE Student Branch, BBDU*

I am an AI/ML Engineer experienced in designing predictive models, scalable GenAI applications, and intelligent automation systems. I recently graduated with a Bachelor of Engineering in Computer Science (Specialization in Artificial Intelligence) with a 7.58 CGPA. Beyond engineering, I am dedicated to driving systemic, high-impact change, recognized nationally as a Fellow for the Samsung Fellowship (ISWDP) and as a National Finalist for the Gandhi Fellowship.

* 📄 **Resume:** [View / Download My Resume](https://drive.google.com/file/d/17JVz2adsUNEVklx8sCxURj67Ku75vLOQ/view?usp=sharing)
* 📍 **Location:** Pune, India
* 📧 **Email:** [anushkag472004@gmail.com](mailto:anushkag472004@gmail.com)
* 💼 **LinkedIn:** [in/anushkagupta47](https://www.linkedin.com/in/anushkagupta47/)
* 🐙 **GitHub:** [anushkagupta47](https://github.com/anushkagupta47)

<div align="center">
  <sub>Built with ❤️ for the GrowEasy Evaluation</sub>
</div>
