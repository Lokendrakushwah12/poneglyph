const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const mainRouter = require("./routes/index.js");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGOURI = process.env.MONGODB_URI;

// Middleware
app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/amazon-scraper")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/api/v1", mainRouter);

app.use((req, res) => {
  res.status(404).send("Server running! But this is 404 route");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} http://localhost:${PORT}`);
});
