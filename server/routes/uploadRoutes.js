const express = require("express");
const multer = require("multer");
const analyzeFile = require("../services/analyze");
const router = express.Router();
const storage = multer.diskStorage({

destination:(req,file,cb)=>{
cb(null,"uploads/");
},

filename:(req,file,cb)=>{
cb(
null,
Date.now()+"-"+file.originalname
);
}

});

const upload = multer({ storage });

router.post(
  "/analyze",
  upload.single("file"),

  (req, res) => {

    const result = analyzeFile();

    res.json({

      message: "Analysis complete",

      filename: req.file.filename,

      trustScore: result.trustScore,

      riskLevel: result.riskLevel,

    });

  }
);

module.exports = router;