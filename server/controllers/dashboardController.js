const Analysis = require("../models/Analysis");

exports.getDashboardStats = async (req, res) => {
  try {
    const analyses = await Analysis.find({
      user: req.user.id,
    });

    const totalScans = analyses.length;

    const avgTrust =
      totalScans > 0
        ? (
            analyses.reduce((sum, item) => sum + item.trustScore, 0) /
            totalScans
          ).toFixed(1)
        : 0;

    const highRisk = analyses.filter(
      (item) => item.riskLevel === "High",
    ).length;

    res.json({
      success: true,
      data: {
        totalScans,
        avgTrust,
        highRisk,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
