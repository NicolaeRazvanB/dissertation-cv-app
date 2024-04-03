import React, { useContext, useState } from "react";
import NavbarComponent from "../components/NavbarComponent";
import PersonalInfoForm from "../components/PersonalInfoForm";
import CVNameForm from "../components/CVNameForm";
import AboutForm from "../components/AboutForm";
import EducationForm from "../components/EducationForm";
import TechnicalExperienceForm from "../components/TechnicalExperienceForm";
import PersonalProjectsForm from "../components/PersonalProjectsForm";
import CertificationsForm from "../components/CertificationsForm";
import LanguagesForm from "../components/LanguagesForm";
import SkillsForm from "../components/SkillsForm";
import { Button, Alert, ProgressBar } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { requestOptions, base_url } from "../requestOptions";
const AddCV = () => {
  const { userInfo, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const stepNames = [
    "CV Name",
    "About",
    "Personal Info",
    "Education",
    "Tech Experience",
    "Projects",
    "Skills",
    "Certifications",
    "Languages",
  ];
  const [currentStep, setCurrentStep] = useState(1);
  const [error, setError] = useState("");
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

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isLastStep = () => {
    return currentStep === 8; // Assuming there are 8 steps in total
  };

  const handleSaveCV = async () => {
    const cvData = {
      cvName,
      about,
      personalInfo,
      education,
      technicalExperience,
      personalProjects,
      skills,
      certifications,
      languages,
    };
    console.log("Saving CV:", cvData);
    const token = userInfo.token;
    try {
      let requestParams = {
        ...requestOptions,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(cvData),
      };
      const response = await fetch(base_url + "api/cv/postCV", requestParams);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // If the POST request is successful, navigate to /home
      navigate("/");
    } catch (error) {
      // Set the error state to display the error message
      setError("Failed to save CV. Please try again.");
      window.scrollTo(0, 0);
    }
  };

  return (
    <>
      <NavbarComponent />
      <div className="container mt-4">
        {error && <Alert variant="danger">{error}</Alert>}
        <div className="d-flex align-items-center justify-content-center mt-3 mb-3">
          {stepNames.map((name, index) => (
            <div key={index} className="d-flex align-items-center">
              <div
                style={{
                  height: "20px",
                  width: "20px",
                  borderRadius: "50%",
                  backgroundColor:
                    currentStep === index + 1 ? "#007bff" : "#e9ecef",
                  color: currentStep === index + 1 ? "white" : "black",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "12px",
                }}
              >
                {index + 1}
              </div>
              {index < stepNames.length - 1 && (
                <hr style={{ width: "20px", margin: "0 10px" }} />
              )}
            </div>
          ))}
          <span className="ms-2">{stepNames[currentStep - 1]}</span>
        </div>
        {/* Conditional rendering based on currentStep */}
        {currentStep === 1 && (
          <CVNameForm cvName={cvName} setCvName={setCvName} />
        )}
        {currentStep === 2 && <AboutForm about={about} setAbout={setAbout} />}
        {currentStep === 3 && (
          <PersonalInfoForm
            personalInfo={personalInfo}
            setPersonalInfo={setPersonalInfo}
          />
        )}
        {currentStep === 4 && (
          <EducationForm education={education} setEducation={setEducation} />
        )}
        {currentStep === 5 && (
          <TechnicalExperienceForm
            technicalExperience={technicalExperience}
            setTechnicalExperience={setTechnicalExperience}
          />
        )}
        {currentStep === 6 && (
          <PersonalProjectsForm
            personalProjects={personalProjects}
            setPersonalProjects={setPersonalProjects}
          />
        )}
        {currentStep === 7 && (
          <SkillsForm skills={skills} setSkills={setSkills} />
        )}
        {currentStep === 8 && (
          <CertificationsForm
            certifications={certifications}
            setCertifications={setCertifications}
          />
        )}
        {currentStep === 9 && (
          <LanguagesForm languages={languages} setLanguages={setLanguages} />
        )}

        <div className="d-flex justify-content-between align-items-center mt-3">
          {currentStep > 1 && (
            <Button variant="secondary" onClick={handlePrevStep}>
              Back
            </Button>
          )}
          {isLastStep() ? (
            <Button variant="primary" onClick={handleSaveCV}>
              Save CV
            </Button>
          ) : (
            <Button variant="primary" onClick={handleNextStep}>
              Next
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default AddCV;
