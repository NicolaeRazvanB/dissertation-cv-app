const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
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

module.exports = router;
