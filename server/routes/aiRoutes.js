const express = require("express");
const analyzeWithAI = require("../services/llmAnalysis");

const router = express.Router();

router.post("/verify", async (req, res) => {
  try {

    const { text } = req.body;

    const result = await analyzeWithAI(text);

    res.json(result);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: error.message
    });

  }
});

module.exports = router;