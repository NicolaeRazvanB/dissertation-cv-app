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
    photoName: {
      type: String,
    },
    personalInfo: {
      firstName: { type: String },
      lastName: { type: String },
      email: { type: String },
      phoneNumber: { type: String },
      address: { type: String },
      linkedIn: { type: String },
    },
    about: {
      type: String,
    },
    education: [
      {
        schoolName: { type: String },
        degree: { type: String },
        fieldOfStudy: { type: String },
        startDate: { type: Date },
        endDate: { type: Date },
      },
    ],
    technicalExperience: [
      {
        companyName: { type: String },
        position: { type: String },
        startDate: { type: Date },
        endDate: { type: Date },
        description: { type: String },
      },
    ],
    certifications: [
      {
        name: { type: String },
        dateObtained: { type: Date },
      },
    ],
    languages: [
      {
        languageName: { type: String },
        grade: {
          type: String,

          enum: ["", "A1", "A2", "B1", "B2", "C1", "C2"],
        },
      },
    ],
    skills: [
      {
        skillName: { type: String },
        proficiency: { type: String },
      },
    ],

    personalProjects: [
      {
        name: { type: String },
        description: { type: String },
        projectLink: { type: String },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("CV", cvSchema);
