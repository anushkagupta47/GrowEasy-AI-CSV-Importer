import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Load environment variables from your .env file
dotenv.config();

const app = express();

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

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

    const model = genAI.getGenerativeModel({ 
      model: process.env.GEMINI_MODEL || "gemini-3.5-flash",
      generationConfig: { responseMimeType: "application/json" }
    });

    // 1. Define the Batch Size (The "Enterprise" Chunking Method)
    const BATCH_SIZE = 5;
    let finalProcessedRecords = [];

    console.log(`Starting enterprise batch processing for ${records.length} total rows...`);

    // 2. Loop through the records in manageable chunks
    for (let i = 0; i < records.length; i += BATCH_SIZE) {
      const batch = records.slice(i, i + BATCH_SIZE);
      const currentBatchNumber = Math.floor(i / BATCH_SIZE) + 1;
      const totalBatches = Math.ceil(records.length / BATCH_SIZE);
      
      console.log(`Sending batch ${currentBatchNumber} of ${totalBatches} to Gemini...`);

      const prompt = `
      System Rules: ${SYSTEM_INSTRUCTION}
      
      Analyze and map ALL of these raw input rows into the target JSON structure:
      ${JSON.stringify(batch)}
      `;

      try {
        const result = await model.generateContent(prompt);
        let responseText = result.response.text();
        
        // Safety cleaner
        responseText = responseText.replace(/```json/gi, '').replace(/```/gi, '').trim();
        const processedBatch = JSON.parse(responseText);
        
        // Stitch the successful batch into our final array
        finalProcessedRecords = finalProcessedRecords.concat(processedBatch);
        
      } catch (batchError) {
        console.error(`Syntax Error in batch ${currentBatchNumber}:`, batchError.message);
        
        // Smart Fallback: If Gemini messes up the JSON for just this batch, 
        // we safely flag these specific 5 rows as skipped rather than crashing the whole app.
        const failedBatchFallback = batch.map(row => ({
          skipped: true,
          data: { 
            name: row.name || "Unknown",
            email: row.email || "",
            mobile_without_country_code: row.phone || "",
            crm_note: "AI JSON syntax extraction failed for this specific row block.",
            crm_status: "DID_NOT_CONNECT"
          }
        }));
        
        finalProcessedRecords = finalProcessedRecords.concat(failedBatchFallback);
      }
    }

    // 3. Calculate final metrics for the frontend UI
    const totalImported = finalProcessedRecords.filter(r => !r.skipped).length;
    const totalSkipped = finalProcessedRecords.filter(r => r.skipped).length;

    console.log("Batch processing complete. Sending data to frontend.");

    // 4. Send the stitched, finalized payload back to Vercel
    res.json({
      success: true,
      metrics: {
        totalRecords: finalProcessedRecords.length,
        totalImported,
        totalSkipped
      },
      records: finalProcessedRecords
    });

  } catch (error) {
    console.error("Fatal Processing Error:", error);
    res.status(500).json({ error: 'Failed to process rows via AI extraction. Check backend terminal for details.' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend spinning on port ${PORT}`));