const { GoogleGenerativeAI } = require("@google/generative-ai");
const { GEMINI_API_KEY } = require("../config");

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const generateReviewSummary = async (reviews) => {
  try {
    if (!reviews || reviews.length === 0) return "No customer reviews available.";

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
      You are a product review analyzer. Summarize the following customer reviews into a short, informative summary that highlights the key points (pros and cons):
      
      ${reviews.join("\n\n")}
      
      Provide a concise review summary in 2-3 sentences.
    `;

    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Gemini AI Error:", error);
    return "Could not generate review summary.";
  }
};

module.exports = { generateReviewSummary };
