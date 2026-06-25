const mongoose = require("mongoose");

const textAnalysisSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },

    trustScore: {
      type: Number,
      required: true,
    },

    category: {
      type: String,
    },

    confidence: {
      type: Number,
    },

    explanation: {
      type: String,
    },

    detectedFlags: [String],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("TextAnalysis", textAnalysisSchema);