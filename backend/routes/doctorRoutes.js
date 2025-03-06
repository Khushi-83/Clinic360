const express = require("express");
const protectDoctor = require("../middleware/authMiddleware")("doctor");

const router = express.Router();

router.get("/dashboard", protectDoctor, (req, res) => {
  res.json({ message: "Welcome Doctor, you have access to this page!" });
});

module.exports = router;
