require("dotenv").config();
const express = require("express");
const cors = require("cors");
const uploadRoutes = require("./src/routes/uploadRoute");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Base Route
app.get("/", (req, res) => {
  res.send("Insightful Backend is running!");
});

// Register Routes
app.use("/api/upload", uploadRoutes);

// Global Error Handling Middleware (Optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: "Something went wrong!" });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
