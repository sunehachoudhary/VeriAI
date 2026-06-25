const analyzeText = (text) => {
  let trustScore = 90;
  const detectedFlags = [];

  if (text.includes("guaranteed")) {
    trustScore -= 20;
    detectedFlags.push("Guaranteed Claim");
  }

  if (text.includes("100% true")) {
    trustScore -= 20;
    detectedFlags.push("Absolute Certainty");
  }

  if (text.includes("urgent")) {
    trustScore -= 15;
    detectedFlags.push("Urgency Manipulation");
  }

  if (text.includes("breaking")) {
    trustScore -= 10;
    detectedFlags.push("Breaking-News Language");
  }

  let category;

  if (trustScore >= 85) {
    category = "Trusted";
  } else if (trustScore >= 70) {
    category = "Moderate";
  } else {
    category = "Risky";
  }

  const confidence = Math.min(95, trustScore + 5);

  let explanation = "Content appears normal.";

  if (trustScore < 70) {
    explanation = "Suspicious language detected.";
  }

  return {
    trustScore,
    category,
    confidence,
    explanation,
    detectedFlags,
  };
};

module.exports = analyzeText;
