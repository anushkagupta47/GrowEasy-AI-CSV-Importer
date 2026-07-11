import dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.error("ERROR: GEMINI_API_KEY is missing from your .env file!");
  process.exit(1);
}

async function checkModels() {
  try {
    console.log("Contacting Google AI Studio to check your API key...");
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
    const data = await response.json();

    if (data.error) {
      console.error("\n❌ GOOGLE API ERROR:");
      console.error(data.error.message);
      console.error("Status:", data.error.status);
    } else if (data.models) {
      console.log("\n✅ SUCCESS! Your API Key is active. You are allowed to use these Gemini models:");
      // Filter and print only the Gemini models available to this specific key
      const geminiModels = data.models
        .map(m => m.name.replace('models/', ''))
        .filter(name => name.includes('gemini'));
      console.log(geminiModels);
    } else {
      console.log("\n⚠️ Unknown response from Google:", data);
    }
  } catch (err) {
    console.error("Network error trying to reach Google:", err);
  }
}

checkModels();