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

//GET all cvs of one user
router.get("/my-cvs", verifyToken, async (req, res) => {
  try {
    const cvs = await CV.find({ userId: req.user.id });
    res.status(200).json(cvs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//GET CV BY ID
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const cv = await CV.findById(req.params.id);
    if (!cv) {
      return res.status(404).json({ message: "CV not found." });
    }
    if (cv.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Access denied." });
    }
    res.status(200).json(cv);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//EDIT A CV
router.put("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  try {
    const cv = await CV.findById(id);
    if (!cv) {
      return res.status(404).json({ message: "CV not found" });
    }
    if (cv.userId.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "User not authorized to update this CV" });
    }

    const updatedCV = await CV.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedCV);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//DELETE A CV
router.delete("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  try {
    const cv = await CV.findById(id);
    if (!cv) {
      return res.status(404).json({ message: "CV not found" });
    }
    if (cv.userId.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "User not authorized to delete this CV" });
    }

    await CV.findByIdAndDelete(id);
    res.status(200).json({ message: "CV deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
