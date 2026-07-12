<div align="center">

# 🚀 GrowEasy AI CSV Importer

### Intelligent AI-Powered CSV Mapping & CRM Data Import Pipeline

An intelligent AI-powered application that automatically maps, extracts, validates, and transforms raw CSV files into structured CRM records using **Google Gemini AI**.

</div>

---

## 📖 Project Overview

Data ingestion is one of the most challenging stages of any CRM workflow. **GrowEasy AI CSV Importer** simplifies this process by leveraging **Google Gemini AI** to intelligently understand, map, and transform unstructured CSV files into standardized CRM records with minimal manual effort.

Designed with scalability and reliability in mind, the application combines AI-powered data extraction, strict backend validation, enterprise-grade batch processing, and a resilient frontend architecture to ensure uninterrupted performance, even during API rate limits or temporary network interruptions.

---

## 📸 Application Interface

### 📤 CSV Upload & Data Preview

*Figure 1. Upload a CSV file through the drag-and-drop interface and preview the extracted records before initiating AI-powered CRM field mapping.*

<div align="center">

<img src="./Result/testing%20data%20impoted.jpg" alt="CSV Upload & Preview" width="900">

</div>

<br>

### 🤖 AI Processing Pipeline

*Figure 2. During processing, Google Gemini AI analyzes the uploaded dataset, understands the column structure, and maps records into standardized CRM fields.*

<div align="center">

<img src="./Result/testing%20data%20ai%20working.jpg" alt="AI Processing" width="900">

</div>

<br>

### 📊 Structured CRM Output

*Figure 3. The final dashboard displays validated CRM records with import status, lead classification, contact information, and AI-generated CRM metadata ready for downstream workflows.*

<div align="center">

<img src="./Result/tested%20data%20results.jpg" alt="Structured CRM Output" width="900">

</div>

---

## ✨ Key Features & Architecture

### 🧠 Intelligent AI Column Mapping

Google Gemini AI automatically identifies unknown CSV columns and accurately maps them to predefined CRM fields.

Example:

```text
Contact No.
        ↓
mobile_without_country_code
```

---

### ⚙️ Enterprise Batch Processing

Large CSV datasets are intelligently divided into optimized batches to prevent:

- AI hallucinations
- Syntax inconsistencies
- Timeout errors
- API rate-limit failures

This enables reliable and scalable processing for large datasets.

---

### 🛡️ Strict CRM Validation

Every extracted record undergoes backend validation before being accepted.

Records missing essential information such as:

- Name
- Email
- Phone Number

are automatically removed to maintain high-quality CRM data.

---

### ⚡ Resilient Frontend Architecture

A built-in fallback mechanism guarantees uninterrupted operation. If the backend or Gemini API becomes temporarily unavailable, the application gracefully switches to local processing, ensuring a seamless user experience.

---

### 🎨 Modern User Experience

Built using **Next.js**, **TypeScript**, and **Tailwind CSS**, the application offers:

- 📂 Drag-and-drop CSV upload
- 👀 Intelligent data preview
- 🤖 AI-powered CRM field mapping
- ⚡ Real-time processing indicators
- 📊 Responsive data tables
- 🌙 Dark mode support
- 💻 Clean and modern interface

---

## 🛠️ Technology Stack

| Category | Technologies |
| :-------- | :----------- |
| **Frontend** | Next.js • React • TypeScript • Tailwind CSS • PapaParse |
| **Backend** | Node.js • Express.js • CORS • Dotenv |
| **AI Engine** | Google Gemini API (`@google/generative-ai`) |
| **Deployment** | Vercel (Frontend) • Render (Backend) |

---

## 🚀 Quick Start (Local Development)

### Prerequisites

- Node.js v18 or later
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

Create a `.env` file.

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

Open another terminal.

```bash
cd frontend

npm install

npm run dev
```

Visit:

```text
http://localhost:3000
```

---

## 👨‍💻 Developer

### **Anushka Gupta**

**AI & Machine Learning Engineer**

Founder & Ex-Chairperson, IEEE Student Branch, BBDU

I am an AI & Machine Learning Engineer specializing in intelligent automation, Generative AI applications, and scalable software systems. This project demonstrates my experience in integrating Large Language Models into production-ready business workflows, building enterprise-grade validation pipelines, and designing intelligent CRM automation systems.

---

## 📬 Connect With Me

| Platform | Link |
| :-------- | :--- |
| 📄 **Resume** | https://drive.google.com/file/d/17JVz2adsUNEVklx8sCxURj67Ku75vLOQ/view?usp=sharing |
| 💼 **LinkedIn** | https://www.linkedin.com/in/anushkagupta47 |
| 🐙 **GitHub** | https://github.com/anushkagupta47 |
| 📧 **Email** | anushkag472004@gmail.com |
| 📍 **Location** | Pune, Maharashtra, India |

---

<div align="center">

### ⭐ Built with ❤️ for the GrowEasy Evaluation

</div>