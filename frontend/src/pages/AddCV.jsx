import React, { useState, useEffect } from "react";
import NavbarComponent from "../components/NavbarComponent";
import PersonalInfoForm from "../components/PersonalInfoForm"; // Ensure correct path
import CVNameForm from "../components/CVNameForm"; // Adjust the import path as necessary
import AboutForm from "../components/AboutForm"; // Adjust the import path as necessary

const AddCV = () => {
  // Separate state for each section of the CV
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

  // Log the entire CV state for debugging
  useEffect(() => {
    const CV = { cvName, about, personalInfo };
    console.log(CV);
  }, [cvName, about, personalInfo]);

  return (
    <>
      <NavbarComponent />
      <div className="container mt-4">
        <h2>CV Information</h2>
        <CVNameForm cvName={cvName} setCvName={setCvName} />
        <AboutForm about={about} setAbout={setAbout} />
        <PersonalInfoForm
          personalInfo={personalInfo}
          setPersonalInfo={setPersonalInfo}
        />
      </div>
    </>
  );
};

export default AddCV;
