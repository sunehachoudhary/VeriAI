const express = require("express");
const multer = require("multer");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const {
  analyzeUpload,
  getHistory,
} = require("../controllers/uploadController");

// Multer Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// =======================
// ANALYZE ROUTE
// =======================
router.post(
  "/analyze",
  authMiddleware,
  upload.single("file"),
  analyzeUpload
);

// =======================
// HISTORY ROUTE
// =======================
router.get(
  "/history",
  authMiddleware,
  getHistory
);

// =======================
// EXPORT ROUTER
// =======================
module.exports = router;