const { GoogleGenerativeAI } = require('@google/generative-ai');
const genAI = new GoogleGenerativeAI('AIzaSyBI7yMaOB41vm_ZkHHNZfjojoEeGyLOY1Q');

async function listModels() {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent("Hello");
    console.log(result.response.text());
  } catch (err) {
    console.error("Error with gemini-1.5-flash:", err.message);
  }

  try {
    const model2 = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result2 = await model2.generateContent("Hello");
    console.log(result2.response.text());
  } catch (err) {
    console.error("Error with gemini-pro:", err.message);
  }
}

listModels();
