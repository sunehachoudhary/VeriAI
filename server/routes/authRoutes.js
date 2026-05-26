const express = require("express");

const router = express.Router();

router.post("/signup", (req, res) => {

  const { name, email, password } = req.body;

  console.log(name);
  console.log(email);
  console.log(password);

  res.json({
    message: "User registered successfully",
  });

});

module.exports = router;