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
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("TextAnalysis", textAnalysisSchema);
