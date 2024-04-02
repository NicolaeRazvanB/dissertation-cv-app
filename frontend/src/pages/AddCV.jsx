import React, { useState, useEffect } from "react";
import NavbarComponent from "../components/NavbarComponent";
import PersonalInfoForm from "../components/PersonalInfoForm";
import CVNameForm from "../components/CVNameForm";
import AboutForm from "../components/AboutForm";
import EducationForm from "../components/EducationForm";
import TechnicalExperienceForm from "../components/TechnicalExperienceForm";
import { Form } from "react-bootstrap";
const AddCV = () => {
  const [cvName, setCvName] = useState("");
  const [about, setAbout] = useState("");
  const [personalInfo, setPersonalInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    linkedIn: "",
  });
  const [education, setEducation] = useState([
    {
      schoolName: "",
      degree: "",
      fieldOfStudy: "",
      startDate: "",
      endDate: "",
    },
  ]);
  const [technicalExperience, setTechnicalExperience] = useState([
    {
      companyName: "",
      position: "",
      description: "",
      startDate: "",
      endDate: "",
    },
  ]);

  useEffect(() => {
    console.log({
      cvName,
      about,
      personalInfo,
      education,
      technicalExperience,
    });
  }, [cvName, about, personalInfo, education, technicalExperience]);

  return (
    <>
      <NavbarComponent />
      <div className="container mt-4">
        <Form.Label>Personal Information</Form.Label>
        <CVNameForm cvName={cvName} setCvName={setCvName} />
        <AboutForm about={about} setAbout={setAbout} />
        <PersonalInfoForm
          personalInfo={personalInfo}
          setPersonalInfo={setPersonalInfo}
        />
        <Form.Label>Education</Form.Label>
        <br></br>
        <EducationForm education={education} setEducation={setEducation} />
        <Form.Label>Technical Experience</Form.Label>
        <br></br>
        <TechnicalExperienceForm
          technicalExperience={technicalExperience}
          setTechnicalExperience={setTechnicalExperience}
        />
      </div>
    </>
  );
};

export default AddCV;
