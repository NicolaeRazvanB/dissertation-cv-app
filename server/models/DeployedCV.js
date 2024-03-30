const mongoose = require("mongoose");

const deployedCVSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    cvId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CV",
      required: true,
    },
    themeName: {
      type: String,
      required: true,
    },
    siteName: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("DeployedCV", deployedCVSchema);
