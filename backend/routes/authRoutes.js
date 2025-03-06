const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// ✅ Register API
router.post("/register", async (req, res) => {
  try {
    const { name, age, gender, location, email, phone, speciality, experience, password, role } = req.body;

    // 🔹 Check if all required fields are provided
    if (!name || !age || !gender || !location || !email || !phone || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 🔹 Check if the user already exists
    let existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    // 🔹 Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 🔹 Create and save the user
    const user = new User({
      name,
      age,
      gender,
      location,
      email,
      phone,
      speciality: speciality || null, // Speciality is optional for Patients
      experience: experience || null,
      password: hashedPassword, // Store hashed password
      role,
    });

    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// ✅ Login API
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // 🔹 Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // 🔹 Find the user in the database
    const user = await User.findOne({ email }).select("+password"); // Ensure password is retrieved

    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    // 🔹 Compare provided password with stored hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // 🔹 Generate JWT token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });

    // 🔹 Send user details and token
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
        speciality: user.speciality || null,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

module.exports = router;