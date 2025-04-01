require("dotenv").config();

const config = {
  PORT: process.env.PORT || 3000,
  MONGODB_URI: process.env.MONGODB_URI,
  NODE_ENV: process.env.NODE_ENV || "development",
  GEMINI_API_URL: process.env.GEMINI_API_URL,
  GEMINI_API_KEY: process.env.GEMINI_API_KEY,
};

module.exports = config;
