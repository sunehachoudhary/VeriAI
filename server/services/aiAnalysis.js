const analyzeText = (text) => {
  let trustScore = 90;

  if (text.includes("guaranteed")) {
    trustScore -= 20;
  }

  if (text.includes("100% true")) {
    trustScore -= 20;
  }

  if (text.includes("urgent")) {
    trustScore -= 15;
  }

  let category;

  if (trustScore >= 85) category = "Trusted";
  else if (trustScore >= 70) category = "Moderate";
  else category = "Risky";

  return {
    trustScore,

    category,
  };
  let explanation = "Content appears normal.";

  if (trustScore < 70) {
    explanation = "Suspicious language detected.";
  }
  return {
    trustScore,
    category,
    explanation,
  };
};

module.exports = analyzeText;
