const ai = require("../config/gemini");

const analyzeWithAI = async (text) => {
  const prompt = `
You are an AI Trust Verification Assistant.

Analyze the following text.

Return ONLY a valid JSON object.

The JSON format must be exactly:

{
  "trustScore": 85,
  "riskLevel": "Low",
  "confidence": 92,
  "summary": "Short summary.",
  "redFlags": [
    "flag1",
    "flag2"
  ],
  "recommendations": [
    "recommendation1",
    "recommendation2"
  ]
}

Do not add markdown.
Do not add explanations.
Do not use \`\`\`.

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

  return JSON.parse(raw);
};

module.exports = analyzeWithAI;