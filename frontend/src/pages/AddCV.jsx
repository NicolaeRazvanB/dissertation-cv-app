import React, { useState, useEffect } from "react";
import NavbarComponent from "../components/NavbarComponent";
import PersonalInfoForm from "../components/PersonalInfoForm";
import CVNameForm from "../components/CVNameForm";
import AboutForm from "../components/AboutForm";
import EducationForm from "../components/EducationForm";
import TechnicalExperienceForm from "../components/TechnicalExperienceForm";
import PersonalProjectsForm from "../components/PersonalProjectsForm";
import CertificationsForm from "../components/CertificationsForm";
import LanguagesForm from "../components/LanguagesForm";
import SkillsForm from "../components/SkillsForm"; // Adjust the import path as necessary
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
  const [personalProjects, setPersonalProjects] = useState([
    { name: "", description: "", projectLink: "" },
  ]);
  const [certifications, setCertifications] = useState([
    { name: "", dateObtained: "" },
  ]);
  const [languages, setLanguages] = useState([{ languageName: "", grade: "" }]);
  const [skills, setSkills] = useState([{ skillName: "", proficiency: "" }]);
  useEffect(() => {
    console.log({
      cvName,
      about,
      personalInfo,
      education,
      technicalExperience,
      personalProjects,
      certifications,
      languages,
      skills,
    });
  }, [
    cvName,
    about,
    personalInfo,
    education,
    technicalExperience,
    personalProjects,
    certifications,
    languages,
    skills,
  ]);

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
        <PersonalProjectsForm
          personalProjects={personalProjects}
          setPersonalProjects={setPersonalProjects}
        />
        <SkillsForm skills={skills} setSkills={setSkills} />
        <CertificationsForm
          certifications={certifications}
          setCertifications={setCertifications}
        />
        <LanguagesForm languages={languages} setLanguages={setLanguages} />
      </div>
    </>
  );
};

export default AddCV;
