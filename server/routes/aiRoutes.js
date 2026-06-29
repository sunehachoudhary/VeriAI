const express = require("express");
const router = express.Router();

const { verifyText } = require("../controllers/aiController");

router.post("/verify", verifyText);

module.exports = router;