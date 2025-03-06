const express = require("express");
const { protectDoctor }  = require("../middlewares/authMiddleware");
const Doctor = require("../models/User");
const router = express.Router();

// Get Doctor Dashboard Data
router.get("/dashboard", protectDoctor, async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.user.id);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    res.json({
      doctor: {
        name: doctor.name,
        speciality: doctor.speciality,
        experience: doctor.experience,
      },
      locations: doctor.locations || [],
      availability: doctor.availability || [],
      appointments: [
        { patientName: "John Doe", date: "2025-03-10", time: "10:00 AM" },
        { patientName: "Jane Smith", date: "2025-03-11", time: "11:30 AM" },
      ],
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Add Consultation Location
router.post("/location", protectDoctor, async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.user.id);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    doctor.locations = [...(doctor.locations || []), req.body.location];
    await doctor.save();

    res.json({ message: "Location added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Update Availability
router.post("/availability", protectDoctor, async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.user.id);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    doctor.availability = req.body.availability;
    await doctor.save();

    res.json({ message: "Availability updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
