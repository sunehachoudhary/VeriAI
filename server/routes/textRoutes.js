const express = require("express");
const analyzeText = require("../services/aiAnalysis");
const TextAnalysis = require("../models/TextAnalysis");

const router = express.Router();

// Verify text
router.post("/verify", async (req, res) => {
  try {
    const { text } = req.body;

    const result = await analyzeText(text);

    const savedAnalysis = new TextAnalysis({
      text,
      trustScore: result.trustScore,
    });

    await savedAnalysis.save();

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
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
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;