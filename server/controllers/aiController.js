const analyzeWithAI = require("../services/llmAnalysis");

exports.verifyText = async (req, res) => {

    try {

        const { text } = req.body;

        if (!text || text.trim().length < 20) {
            return res.status(400).json({
                success: false,
                message: "Please enter at least 20 characters."
            });
        }

        const result = await analyzeWithAI(text);

        res.json({
            success: true,
            data: result
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "AI Error"
        });

    }

};
