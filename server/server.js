const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const mainRouter = require("./routes/index.js");
const { MONGODB_URI, PORT } = require("./config.js");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/api/v1", mainRouter);

app.use((req, res) => {
  res.status(404).send("Server running! But this is 404 route");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} http://localhost:${PORT}`);
});
