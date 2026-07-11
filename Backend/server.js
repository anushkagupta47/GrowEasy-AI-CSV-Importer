import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Load environment variables from your .env file
dotenv.config();

const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json({ limit: '50mb' })); 

// Initialize the real Gemini API using your new key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const SYSTEM_INSTRUCTION = `
You are an expert CRM Data Engineer. Your job is to map arbitrary, messy CSV rows into the strict GrowEasy CRM structured format.

Strict Rules:
1. crm_status: MUST be exactly one of: "GOOD_LEAD_FOLLOW_UP", "DID_NOT_CONNECT", "BAD_LEAD", "SALE_DONE". If ambiguous, map logically or default to "GOOD_LEAD_FOLLOW_UP".
2. data_source: MUST be exactly one of: "leads_on_demand", "meridian_tower", "eden_park", "varah_swamy", "sarjapur_plots". If none match confidently, leave it completely blank ("").
3. Date Format (created_at): Must be a valid string format that Javascript's 'new Date(created_at)' can successfully parse.
4. Contact Validation (CRITICAL): If a record contains NEITHER a valid email NOR a mobile number, you MUST set a flag "skipped": true for that record. Otherwise, "skipped": false.
5. Multi-value Handling: If multiple emails or mobile numbers exist in the row, use the first one for the main 'email' or 'mobile_without_country_code' field. Append all extra emails/numbers to the 'crm_note' field.
6. crm_note: Use this for remarks, follow-ups, and overflow contact details. Keep it clean with escaped linebreaks (\\n) if needed.

Output Format:
You must respond with a valid JSON array of objects. Do not wrap the JSON in markdown code blocks.
Each object must have this shape:
{
  "skipped": boolean,
  "data": {
    "created_at": string or null,
    "name": string or null,
    "email": string or null,
    "country_code": string or null,
    "mobile_without_country_code": string or null,
    "company": string or null,
    "city": string or null,
    "state": string or null,
    "country": string or null,
    "lead_owner": string or null,
    "crm_status": string or null,
    "crm_note": string or null,
    "data_source": string or null,
    "possession_time": string or null,
    "description": string or null
  }
}
`;

app.post('/api/import-leads', async (req, res) => {
  try {
    const { records } = req.body; 
    
    if (!records || !Array.isArray(records)) {
      return res.status(400).json({ error: 'Invalid data format. Expected an array of records.' });
    }

    // Using the dynamic model from your .env file
    const model = genAI.getGenerativeModel({ 
      model: process.env.GEMINI_MODEL || "gemini-3.5-flash",
      generationConfig: { responseMimeType: "application/json" }
    });

    const prompt = `
    System Rules: ${SYSTEM_INSTRUCTION}
    
    Analyze and map ALL of these raw input rows into the target JSON structure:
    ${JSON.stringify(records)}
    `;

    console.log(`Sending ${records.length} real rows to Gemini using ${process.env.GEMINI_MODEL}...`);
    
    // Process everything in ONE batch
    const result = await model.generateContent(prompt);
    let responseText = result.response.text();
    
    // Safety cleaner just in case the AI adds markdown ticks
    responseText = responseText.replace(/```json/gi, '').replace(/```/gi, '').trim();
    const processedRecords = JSON.parse(responseText);

    const totalImported = processedRecords.filter(r => !r.skipped).length;
    const totalSkipped = processedRecords.filter(r => r.skipped).length;

    res.json({
      success: true,
      metrics: {
        totalRecords: processedRecords.length,
        totalImported,
        totalSkipped
      },
      records: processedRecords
    });

  } catch (error) {
    console.error("Processing Error:", error);
    res.status(500).json({ error: 'Failed to process rows via AI extraction. Check backend terminal for details.' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend spinning on port ${PORT}`));