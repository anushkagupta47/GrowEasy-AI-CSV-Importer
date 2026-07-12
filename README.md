<div align="center">

# 🚀 GrowEasy AI CSV Importer

**An intelligent, AI-powered pipeline to seamlessly map, extract, and validate raw CSV data into structured CRM architectures.**

</div>

---

## 📖 Project Overview

Data ingestion is one of the most critical stages of any CRM workflow. **GrowEasy AI CSV Importer** leverages **Google Gemini AI** to intelligently understand, map, and transform unstructured CSV files into standardized CRM records with minimal manual effort.

Designed for reliability and scalability, the application combines AI-powered data extraction, strict backend validation, enterprise-grade batch processing, and a resilient frontend architecture to deliver a seamless user experience, even during API rate limits or temporary network interruptions.

---

## 📸 Application Interface

### 📤 CSV Upload & Intelligent Data Preview

*Figure 1. Upload CSV datasets through an intuitive drag-and-drop interface. The application previews raw records and prepares them for AI-powered CRM field mapping.*

<div align="center">

<img src="Result/csv-upload.jpg" alt="CSV Upload Dashboard" width="900"/>

</div>

---

### 📊 AI-Mapped CRM Results Dashboard

*Figure 2. The processed results dashboard presents AI-generated CRM records with standardized fields, automated validation, lead ownership, and structured output ready for CRM integration.*

<div align="center">

<img src="Result/crm-results.jpg" alt="AI CRM Results Dashboard" width="900"/>

</div>

---

## ✨ Key Features & Architecture

### 🧠 Contextual AI Mapping

Utilizes **Google Gemini AI** to intelligently infer data types and automatically map arbitrary CSV columns (for example, **"Contact No." → `mobile_without_country_code`**) into predefined CRM fields.

---

### ⚙️ Enterprise Batch Processing

Large CSV datasets are intelligently divided into optimized batches, preventing AI hallucinations, syntax inconsistencies, timeout issues, and API rate-limit failures while ensuring reliable and scalable processing.

---

### 🛡️ Strict Data Validation

Every extracted record passes through backend validation before being accepted into the final dataset.

Records missing critical CRM information such as:

- Name
- Email
- Phone Number

are automatically discarded to ensure high-quality CRM data.

---

### ⚡ Resilient Frontend Architecture

A built-in client-side fallback mechanism ensures uninterrupted operation. Whenever the backend or Gemini API becomes temporarily unavailable, the application gracefully switches to local processing, providing a smooth and uninterrupted user experience.

---

### 🎨 Premium User Experience

Built using **Next.js**, **TypeScript**, and **Tailwind CSS**, the application provides:

- Drag-and-drop CSV upload
- Intelligent data preview
- AI-powered CRM field mapping
- Real-time processing indicators
- Responsive data tables
- Modern user interface
- Dark mode support

---

## 🛠️ Technology Stack

| Category | Technologies |
| :-------- | :----------- |
| **Frontend** | Next.js, React, TypeScript, Tailwind CSS, PapaParse |
| **Backend** | Node.js, Express.js, CORS, Dotenv |
| **AI Engine** | Google Gemini API (`@google/generative-ai`) |
| **Deployment** | Vercel (Frontend), Render (Backend) |

---

## 🚀 Quick Start (Local Development)

### Prerequisites

- Node.js (v18 or later)
- Google Gemini API Key from Google AI Studio

---

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/anushkagupta47/GrowEasy-AI-CSV-Importer.git
cd GrowEasy-AI-CSV-Importer
```

---

### 2️⃣ Configure & Run Backend

```bash
cd Backend
npm install
```

Create a `.env` file inside the **Backend** directory.

```env
GEMINI_API_KEY=your_actual_api_key_here
PORT=5000
```

Start the backend server.

```bash
node server.js
```

---

### 3️⃣ Configure & Run Frontend

Open a new terminal.

```bash
cd frontend
npm install
npm run dev
```

Open your browser and navigate to:

```text
http://localhost:3000
```

---

## 👨‍💻 Candidate Profile

### **Anushka Gupta**

**AI & Machine Learning Engineer**

Founder & Ex-Chairperson, IEEE Student Branch, BBDU

I am an AI & Machine Learning Engineer specializing in intelligent automation, Generative AI applications, and scalable software systems. I recently graduated with a Bachelor of Engineering in Computer Science (Artificial Intelligence) with an **8.0 CGPA**.

My work focuses on building practical AI-driven solutions that improve business workflows and data automation. Beyond engineering, I have been recognized as a **Samsung Fellowship (ISWDP) Fellow** and a **National Finalist of the Gandhi Fellowship** for leadership and social impact.

- 📄 **Resume:** https://drive.google.com/file/d/17JVz2adsUNEVklx8sCxURj67Ku75vLOQ/view?usp=sharing
- 📍 **Location:** Pune, Maharashtra, India
- 📧 **Email:** anushkag472004@gmail.com
- 💼 **LinkedIn:** https://www.linkedin.com/in/anushkagupta47
- 🐙 **GitHub:** https://github.com/anushkagupta47

---

<div align="center">

### ⭐ Built with ❤️ for the GrowEasy Evaluation

</div>
