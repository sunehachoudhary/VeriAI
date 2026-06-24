const mongoose = require("mongoose");

const analysisSchema = new mongoose.Schema(
  {
    user: {
      type:mongoose.Schema.Types.ObjectId,
      ref: "User",
      required:true,
    },
    filename: {
      type: String,
      required: true,
    },

    trustScore: {
      type: Number,
      required: true,
    },

    riskLevel: {
      type: String,
      required: true,
    },
    
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Analysis",
  analysisSchema
);