const mongoose = require("mongoose");

const cvSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    cvName: {
      type: String,
      required: true,
    },
    personalInfo: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      email: { type: String, required: true },
      phoneNumber: { type: String },
      address: { type: String },
      linkedIn: { type: String },
    },
    about: {
      type: String,
    },
    education: [
      {
        schoolName: { type: String, required: true },
        degree: { type: String, required: true },
        fieldOfStudy: { type: String, required: true },
        startDate: { type: Date },
        endDate: { type: Date },
      },
    ],
    technicalExperience: [
      {
        companyName: { type: String, required: true },
        position: { type: String, required: true },
        startDate: { type: Date },
        endDate: { type: Date },
        description: { type: String },
      },
    ],
    certifications: [
      {
        name: { type: String, required: true },
        dateObtained: { type: Date, required: true },
      },
    ],
    languages: [
      {
        languageName: { type: String, required: true },
        grade: {
          type: String,
          required: true,
          enum: ["A1", "A2", "B1", "B2", "C1", "C2"],
        },
      },
    ],
    skills: [
      {
        skillName: { type: String, required: true },
        proficiency: { type: String },
      },
    ],
    // New field for personal projects
    personalProjects: [
      {
        name: { type: String, required: true }, // Mandatory name
        description: { type: String, required: true }, // Mandatory description
        projectLink: { type: String }, // Optional link to the project
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("CV", cvSchema);
