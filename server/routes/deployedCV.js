const express = require("express");
const router = express.Router();
const DeployedCV = require("../models/DeployedCV");
const User = require("../models/User");
const CV = require("../models/CV");
const { verifyToken } = require("../utils");

//CREATE DEPLOYED CV
router.post("/deployed-cvs", verifyToken, async (req, res, next) => {
  try {
    const userExists = await User.findById(req.user.id);
    if (!userExists) {
      return res.status(404).json({ message: "User not found." });
    }

    const { cvId, themeName, siteName } = req.body;

    const cvExists = await CV.findById(cvId);
    if (!cvExists) {
      return res.status(404).json({ message: "CV not found." });
    }

    const newDeployedCV = new DeployedCV({
      userId: req.user.id,
      cvId,
      themeName,
      siteName,
    });

    const savedDeployedCV = await newDeployedCV.save();
    res.status(201).json(savedDeployedCV);
  } catch (error) {
    next(error);
  }
});

// GET ALL DEPLOYED CVS
router.get("/deployed-cvs", verifyToken, async (req, res, next) => {
  try {
    const userExists = await User.findById(req.user.id);
    if (!userExists) {
      return res.status(404).json({ message: "User not found." });
    }
    const deployedCVs = await DeployedCV.find({ userId: req.user.id });
    res.json(deployedCVs);
  } catch (error) {
    next(error);
  }
});

//GET ALL DEPLOYED CVS FROM ALL USERS
router.get("/deployed-cvs/all", async (req, res) => {
  try {
    const allDeployedCVs = await DeployedCV.find({});
    res.json(allDeployedCVs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//UPDATE DEPLOYED CV
router.put("/:id", verifyToken, async (req, res, next) => {
  try {
    const userExists = await User.findById(req.user.id);
    if (!userExists) {
      return res.status(404).json({ message: "User not found." });
    }

    const deployedCV = await DeployedCV.findById(req.params.id);
    if (!deployedCV) {
      return res.status(404).json({ message: "Deployed CV not found." });
    }

    if (deployedCV.userId.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this Deployed CV." });
    }

    if (req.body.cvId) {
      const cvExists = await CV.findById(req.body.cvId);
      if (!cvExists) {
        return res.status(404).json({ message: "CV to associate not found." });
      }
    }

    const updatedDeployedCV = await DeployedCV.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.json(updatedDeployedCV);
  } catch (error) {
    next(error);
  }
});

//DELETE DEPLOYED CV
router.delete("/:id", verifyToken, async (req, res, next) => {
  try {
    const userExists = await User.findById(req.user.id);
    if (!userExists) {
      return res.status(404).json({ message: "User not found." });
    }

    const deployedCV = await DeployedCV.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });
    if (!deployedCV) {
      return res
        .status(404)
        .json({ message: "Deployed CV not found or access denied." });
    }

    res.status(200).json({ message: "Deployed CV deleted successfully." });
  } catch (error) {
    next(error);
  }
});

//GET BY SITE NAME FROM PATH
router.get("/deployed-cvs/by-name/:siteName", async (req, res, next) => {
  try {
    const { siteName } = req.params;
    if (!siteName) {
      return res.status(400).json({ message: "Site name is required." });
    }

    const deployedCV = await DeployedCV.findOne({ siteName: siteName });
    if (!deployedCV) {
      return res.status(404).json({ message: "Deployed CV not found." });
    }

    res.json(deployedCV);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
