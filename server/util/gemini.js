const axios = require("axios");
const { GEMINI_API_KEY, GEMINI_API_URL } = require("../config");

const generateReviewSummary = async (topReviews) => {
  try {
    const prompt = `Summarize the following reviews in a single paragraph:\n\n${topReviews.join(
      "\n\n"
    )}`;

    const response = await axios.post(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const summary = response.data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!summary) {
      throw new Error("No response from Gemini API");
    }

    return summary;
  } catch (error) {
    console.error("Gemini AI Error:", error.message);
    if (error.response) {
      console.error("Gemini AI Response:", JSON.stringify(error.response.data, null, 2));
    }
    throw new Error("Failed to generate review summary");
  }
};

module.exports = { generateReviewSummary };