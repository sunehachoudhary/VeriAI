const ai = require("../config/gemini");

const analyzeWithAI = async (text) => {
  const prompt = `
You are an AI Trust Verification Assistant.

Analyze the following text.

Return ONLY valid JSON.

Format:

{
  "trustScore": number,
  "riskLevel": "Low" | "Medium" | "High",
  "summary": "...",
  "redFlags": [
    "...",
    "..."
  ],
  "recommendations": [
    "...",
    "..."
  ]
}

Text:
${text}
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  let raw = response.text;

  console.log("========== GEMINI RAW RESPONSE ==========");
  console.log(raw);
  console.log("=========================================");

  // Remove markdown if Gemini adds it
  raw = raw
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();

  // Extract JSON object if Gemini adds extra text
  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");

  if (start === -1 || end === -1) {
    throw new Error("Gemini did not return JSON.");
  }

  raw = raw.substring(start, end + 1);

 try {
  return JSON.parse(raw);
} catch (error) {
  console.error("JSON Parse Error:", error);
  console.error("Raw Response:", raw);

  return {
    trustScore: 0,
    riskLevel: "Unknown",
    summary: "The AI returned an unexpected response.",
    redFlags: [],
    recommendations: [
      "Please try again."
    ]
  };
}
};

module.exports = analyzeWithAI;
