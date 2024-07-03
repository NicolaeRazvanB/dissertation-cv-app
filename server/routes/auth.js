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
    const existingUser = await User.findOne({ email: request.body.email });
    if (existingUser) {
      return response.status(409).json({ message: "Email is already in use." });
    }

    const salt = await bcrypt.genSalt(saltRounds);
    const cryptedPassword = await bcrypt.hash(request.body.password, salt);

    const newUser = new User({
      firstName: request.body.firstName,
      lastName: request.body.lastName,
      email: request.body.email,
      password: cryptedPassword,
    });

    const user = await newUser.save();

    const { password, ...userWithoutPassword } = user.toObject();
    response.status(201).json(userWithoutPassword);
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
      expiresIn: "30 days",
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
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const cryptedPassword = await bcrypt.hash(req.body.password, salt);

      req.body.password = cryptedPassword;
    }

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

router.delete("/user", verifyToken, async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const cvCount = await CV.countDocuments({ userId: req.user.id });
    if (cvCount > 0) {
      await CV.deleteMany({ userId: req.user.id });
    }

    const deployedCvCount = await DeployedCV.countDocuments({
      userId: req.user.id,
    });
    if (deployedCvCount > 0) {
      await DeployedCV.deleteMany({ userId: req.user.id });
    }

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
