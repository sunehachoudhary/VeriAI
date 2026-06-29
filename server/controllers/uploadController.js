const analyzeFile = require("../services/analyze");
const Analysis = require("../models/Analysis");

// =======================
// ANALYZE CONTROLLER
// =======================
exports.analyzeUpload = async (req, res) => {
  try {
    const result = analyzeFile();

    const analysis = new Analysis({
      user: req.user.id,
      filename: req.file.filename,
      trustScore: result.trustScore,
      riskLevel: result.riskLevel,
    });

    await analysis.save();

   res.status(200).json({
  success: true,
  message: "Analysis completed",
  data: {
    filename: req.file.filename,
    trustScore: result.trustScore,
    riskLevel: result.riskLevel,
  },
});

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Server Error",
    });
  }
};

// =======================
// HISTORY CONTROLLER
// =======================
exports.getHistory = async (req, res) => {
  try {
    const history = await Analysis.find({
      user: req.user.id,
    }).sort({
      createdAt: -1,
    });

    return res.json(history);

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Server Error",
    });
  }
};