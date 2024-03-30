const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      min: 2,
      max: 20,
      required: true,
    },
    lastName: {
      type: String,
      min: 2,
      max: 20,
      required: true,
    },
    email: {
      type: String,
      required: true,
      min: 5,
      max: 30,
      unique: true,
    },
    cvs: [
      {
        type: mongoose.Schema.Types.ObjectId, // Reference to CV by ID
        default: [],
        ref: "CV",
      },
    ],
    deployedCVs: [
      {
        type: mongoose.Schema.Types.ObjectId, // Reference to DeployedCV by ID
        default: [],
        ref: "DeployedCV",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
