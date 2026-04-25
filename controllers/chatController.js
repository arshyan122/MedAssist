// Mock health responses for when OpenAI API key is not available
const mockResponses = [
  "Based on your symptoms, I'd recommend staying hydrated and getting plenty of rest. If symptoms persist for more than 48 hours, please consult your physician.",
  "That's a great question! Regular exercise — even 30 minutes of walking daily — can significantly improve cardiovascular health and reduce stress levels.",
  "For managing mild headaches, try staying hydrated, reducing screen time, and practicing deep breathing exercises. If headaches become frequent or severe, please see a doctor.",
  "A balanced diet rich in fruits, vegetables, lean proteins, and whole grains is essential for maintaining good health. Consider consulting a nutritionist for a personalized plan.",
  "Getting 7-9 hours of quality sleep is crucial for immune function, mental clarity, and overall wellbeing. Try maintaining a consistent sleep schedule.",
  "Stress management is key to long-term health. Techniques like meditation, deep breathing, yoga, and regular physical activity can help manage stress effectively.",
  "It's important to keep up with regular health screenings appropriate for your age and risk factors. Prevention is always better than cure!",
  "For minor cold symptoms, rest, warm fluids, and over-the-counter remedies can help. If you develop a high fever or difficulty breathing, seek medical attention immediately.",
  "Maintaining good posture, taking regular breaks from sitting, and stretching can help prevent back pain and musculoskeletal issues.",
  "Remember to stay up-to-date with vaccinations and annual health check-ups. Early detection of health issues leads to better outcomes.",
];

// @desc    Chat with AI health assistant
// @route   POST /api/chat
const chat = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ message: 'Message is required' });
    }

    // Try Gemini if API key is available
    if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'your_gemini_api_key_here') {
      const modelsToTry = ['gemini-2.0-flash-lite', 'gemini-2.0-flash', 'gemini-1.5-flash-latest'];
      for (const modelName of modelsToTry) {
        try {
          const { GoogleGenerativeAI } = require('@google/generative-ai');
          const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
          const model = genAI.getGenerativeModel({ 
            model: modelName,
            systemInstruction: 'You are MedAssist AI, a helpful assistant. While you specialize in health information, you must answer non-health questions directly and accurately based on the user\'s prompt without forcing a health connection. For medical queries, remind users to consult healthcare professionals. Keep responses concise and friendly.'
          });

          const result = await model.generateContent(message);
          const text = result.response.text();

          return res.json({
            reply: text,
            source: 'gemini',
          });
        } catch (aiError) {
          console.error(`Gemini model ${modelName} failed:`, aiError.message);
          continue; // try next model
        }
      }
      console.error('All Gemini models failed, falling back to mock.');
    }

    // Mock fallback — simulate a brief delay for realism
    await new Promise((resolve) => setTimeout(resolve, 800));

    let reply;
    const lowerMsg = message.toLowerCase();

    // Add some contextual awareness based on keywords
    if (lowerMsg.includes('headache') || lowerMsg.includes('head pain')) {
      reply = "For headaches, try resting in a dark, quiet room and staying hydrated. Over-the-counter pain relievers like acetaminophen may help. If headaches are severe, sudden, or recurring, please consult a doctor right away. 🩺";
    } else if (lowerMsg.includes('fever') || lowerMsg.includes('temperature')) {
      reply = "For fever management: stay hydrated, rest well, and monitor your temperature. You can take acetaminophen or ibuprofen as directed. If fever exceeds 103°F (39.4°C) or lasts more than 3 days, seek medical attention immediately. 🌡️";
    } else if (lowerMsg.includes('diet') || lowerMsg.includes('nutrition') || lowerMsg.includes('food')) {
      reply = "A balanced diet is the foundation of good health! Focus on whole grains, lean proteins, colorful fruits and vegetables, and healthy fats. Stay hydrated with 8+ glasses of water daily. Consider consulting a registered dietitian for personalized advice. 🥗";
    } else if (lowerMsg.includes('exercise') || lowerMsg.includes('workout') || lowerMsg.includes('fitness')) {
      reply = "The WHO recommends at least 150 minutes of moderate exercise per week. Mix cardio (walking, swimming) with strength training for best results. Start gradually and listen to your body. Even small amounts of activity provide health benefits! 💪";
    } else if (lowerMsg.includes('sleep') || lowerMsg.includes('insomnia')) {
      reply = "Quality sleep is essential! Aim for 7-9 hours nightly. Tips: maintain a consistent schedule, limit screens before bed, keep your room cool and dark, and avoid caffeine after 2 PM. If sleep issues persist, consult a sleep specialist. 😴";
    } else if (lowerMsg.includes('stress') || lowerMsg.includes('anxiety') || lowerMsg.includes('mental')) {
      reply = "Mental health is just as important as physical health. Try deep breathing exercises, meditation, or mindfulness. Regular exercise and social connections also help. Don't hesitate to reach out to a mental health professional if you're struggling. 🧠💚";
    } else if (lowerMsg.includes('stomach') || lowerMsg.includes('digestion') || lowerMsg.includes('nausea')) {
      reply = "For stomach issues, try sipping ginger tea, eating bland foods (rice, toast, bananas), and staying hydrated. Avoid spicy or greasy foods. If pain is severe or persists more than 24 hours, please see a doctor. 🏥";
    } else if (lowerMsg.includes('cold') || lowerMsg.includes('cough') || lowerMsg.includes('flu')) {
      reply = "For cold/flu symptoms: rest well, drink warm fluids, and use honey for sore throat relief. Over-the-counter decongestants may help. If you have high fever or difficulty breathing, seek medical attention immediately. 🤧";
    } else if (lowerMsg.includes('weather')) {
      reply = "I'm a health assistant, so I can't check the weather for you. Please use a weather app for that! ☀️🌧️";
    } else if (lowerMsg.includes('hi') || lowerMsg.includes('hello') || lowerMsg.includes('hey')) {
      reply = "Hello! 👋 I'm MedAssist AI. Ask me about health topics like headaches, fever, diet, exercise, sleep, stress, or stomach issues!";
    } else {
      reply = "I'm currently running in offline mode with limited responses. I can help with: headaches, fever, diet, exercise, sleep, stress, stomach issues, and cold/flu. Try asking about one of these topics! 💬";
    }

    res.json({
      reply,
      source: 'mock',
    });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ message: 'Error processing chat message' });
  }
};

module.exports = { chat };
