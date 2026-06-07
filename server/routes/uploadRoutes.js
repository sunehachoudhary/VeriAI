const express = require("express");
const multer = require("multer");
const analyzeFile = require("../services/analyze");
const router = express.Router();
const Analysis = require("../models/Analysis");
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

  async(req, res) => {

    const result = analyzeFile();

    res.json({

      message: "Analysis complete",
      filename: req.file.filename,
     trustScore: result.trustScore,
     riskLevel: result.riskLevel,

    });
    const analysis = new Analysis({
  filename: req.file.filename,
  trustScore: result.trustScore,
  riskLevel: result.riskLevel,
});

await analysis.save();

  }
);
router.get(
  "/history",
  async (req,res)=>{

    const history =
      await Analysis.find()
      .sort({createdAt:-1});

    res.json(history);

  }
);

module.exports = router;