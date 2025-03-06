const express = require("express");
const Doctor = require("../models/User");  // Assuming Doctor is stored in User model
const router = express.Router();

// 🔍 Search Doctors by Specialty, Location, or Name
router.get("/search", async (req, res) => {
  try {
    const { specialty, location, name } = req.query;
    let filter = {};

    if (specialty) filter.speciality = specialty;
    if (location) filter.location = { $regex: location, $options: "i" };
    if (name) filter.name = { $regex: name, $options: "i" };

    const doctors = await Doctor.find(filter, "name speciality experience location availability");
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
});

// 📄 Get Single Doctor Profile
router.get("/:id", async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    res.json({
      name: doctor.name,
      speciality: doctor.speciality,
      experience: doctor.experience,
      location: doctor.location,
      availability: doctor.availability,
    });
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;
