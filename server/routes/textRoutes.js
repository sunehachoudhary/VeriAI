const express = require("express");

const analyzeText =
require("../services/aiAnalysis");

const router =
express.Router();

router.post(
"/verify",
(req,res)=>{

const { text } =
req.body;

const result =
analyzeText(text);

res.json(result);

}
);

module.exports =
router;