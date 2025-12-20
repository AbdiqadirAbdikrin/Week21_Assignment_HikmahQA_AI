import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

// Import routes
import qaRoute from "./routes/questionRoute.js";

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Basic route for testing
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to HikmahQA - Islamic Q&A API",
    version: "1.0.0",
    endpoints: {
      ask: "POST /api/qa/ask",
    },
    description: "Ask Islamic questions and get answers based on Quran and Sahih Hadith",
    testing: "Use Postman to test the API endpoints",
  });
});

// Mount API routes
app.use("/api/qa", qaRoute);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong!",
    error: process.env.NODE_ENV === "development" ? err.message : {},
  });
});

// 404 handler for undefined routes
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Islamic Q&A API: POST http://localhost:${PORT}/api/qa/ask`);
});

export default app;
