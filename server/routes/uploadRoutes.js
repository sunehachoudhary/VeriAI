const express = require("express");
const multer = require("multer");

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

(req,res)=>{

console.log(req.file);

if(!req.file){
return res.status(400).json({
message:"No file uploaded"
});
}

res.json({

message:"File uploaded successfully",

filename:req.file.filename

});

});

module.exports = router; 