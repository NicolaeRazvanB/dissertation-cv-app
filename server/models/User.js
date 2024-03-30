const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      minlength: 2,
      maxlength: 20,
      required: true,
    },
    lastName: {
      type: String,
      minlength: 2,
      maxlength: 20,
      required: true,
    },
    email: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    cvs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        default: [],
        ref: "CV",
      },
    ],
    deployedCVs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        default: [],
        ref: "DeployedCV",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
