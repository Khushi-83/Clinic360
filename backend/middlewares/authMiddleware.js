const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Adjust this path based on your project structure

const protectDoctor = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Get Token from Header
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user || user.role !== "doctor") {
      return res.status(403).json({ message: "Access denied" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid Token" });
  }
};

module.exports = { protectDoctor };
