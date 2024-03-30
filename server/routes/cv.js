const express = require("express");
const router = express.Router();
const CV = require("../models/CV"); // Correctly import your CV model here
const { verifyToken } = require("../utils");

// POST CV
router.post("/postCV", verifyToken, async (req, res) => {
  const cvData = {
    ...req.body,
    userId: req.user.id, // Assuming the user ID is stored in the JWT payload
  };

  const newCV = new CV(cvData); // Ensure 'CV' is the correct model
  try {
    const savedCV = await newCV.save();
    res.status(201).json(savedCV);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; // Don't forget to export your router
