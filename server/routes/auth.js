const router = require("express").Router();
const User = require("../models/User");
const CV = require("../models/CV");
const DeployedCV = require("../models/DeployedCV");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const { verifyToken } = require("../utils");
const JWT_SECRET = process.env.JWT_SECRET;
const saltRounds = 10;

//REGISTER USER
router.post("/register", async (request, response, next) => {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const cryptedPassword = await bcrypt.hash(request.body.password, salt);

    const newUser = new User({
      firstName: request.body.firstName,
      lastName: request.body.lastName,
      email: request.body.email,
      password: cryptedPassword,
    });
    const user = await newUser.save();
    response.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

//LOGIN USER
router.post("/login", async (request, response, next) => {
  try {
    const { email, password } = request.body;

    const user = await User.findOne({ email });
    if (!user) {
      return response.status(404).json({ message: "User not found" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return response.status(400).json({ message: "Wrong password" });
    }

    // Check if JWT_SECRET is correctly set
    if (!JWT_SECRET) {
      throw new Error(
        "JWT_SECRET is not defined. Check your environment variables."
      );
    }

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: "7 days",
    });

    const { password: _, ...userData } = user.toObject();
    response.status(200).json({ ...userData, token });
  } catch (error) {
    next(error);
  }
});

// GET USER
router.get("/user", verifyToken, async (req, res, next) => {
  try {
    // Assuming the user ID is attached to the request by the verifyToken middleware
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const { password, ...userDetails } = user.toObject();
    res.json(userDetails);
  } catch (error) {
    next(error);
  }
});

//UPDATE USER
router.put("/user", verifyToken, async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { $set: req.body },
      { new: true }
    );
    const { password, ...userDetails } = updatedUser.toObject();
    res.json(userDetails);
  } catch (error) {
    next(error);
  }
});

//DELETE USER
router.delete("/user", verifyToken, async (req, res, next) => {
  try {
    // Check if the user exists (optional, based on your logic in verifyToken)
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Check for existing CVs
    const cvCount = await CV.countDocuments({ userId: req.user.id });
    if (cvCount > 0) {
      await CV.deleteMany({ userId: req.user.id });
    }

    // Check for existing deployed CVs
    const deployedCvCount = await DeployedCV.countDocuments({
      userId: req.user.id,
    });
    if (deployedCvCount > 0) {
      await DeployedCV.deleteMany({ userId: req.user.id });
    }

    // Proceed to delete the user after checking/deleting CVs and deployed CVs
    await User.findByIdAndDelete(req.user.id);

    let message = "User deleted successfully.";
    if (cvCount > 0) {
      message += ` ${cvCount} CV(s) deleted.`;
    }
    if (deployedCvCount > 0) {
      message += ` ${deployedCvCount} deployed CV(s) deleted.`;
    }

    res.json({ message });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
