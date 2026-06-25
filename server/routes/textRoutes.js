const express = require("express");
const analyzeText = require("../services/aiAnalysis");
const TextAnalysis = require("../models/TextAnalysis");

const router = express.Router();

// Verify text
router.post("/verify", async (req, res) => {
  try {
    console.log("Verify API called");
    console.log("Request Body:", req.body);

    const { text } = req.body;

    if (!text) {
      return res.status(400).json({
        message: "Text is required",
      });
    }

    const result = await analyzeText(text);

    console.log("AI Result:", result);

    const savedAnalysis = new TextAnalysis({
      text,
      trustScore: result.trustScore,
      category: result.category,
      confidence: result.confidence,
      explanation: result.explanation,
      detectedFlags: result.detectedFlags,
    });

    await savedAnalysis.save();

    res.json(result);
  } catch (error) {
    console.error("========== VERIFY ERROR ==========");
    console.error(error);
    console.error("==================================");

    res.status(500).json({
      message: error.message,
      error:
        process.env.NODE_ENV === "development"
          ? error.stack
          : undefined,
    });
  }
});

// Get history
router.get("/history", async (req, res) => {
  try {
    const history = await TextAnalysis.find().sort({
      createdAt: -1,
    });

    res.json(history);
  } catch (error) {
    console.error("History Error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;